/**
 * @mixin
 * @memberof module:geoflo
 * @name Exploring
 * @description This mixin provides the exploring functionality for the GeoFlo application. It allows users to explore features on the map by creating a buffer around the feature and snapping to nearby features.
 * @param {Object} mode - The mode object containing the type of mode.
 * @returns {Object} The Exploring object.
 */
const Exploring = function (mode) {
    const geoflo = this.geoflo;
    this.type = mode.type;

	/**
     * Activates the exploring functionality by enabling the 'exploring' option.
     * @function
     * @name activate
     * @memberof module:geoflo.Exploring
     * @description Activates by setting the 'enabled' property to true and enabling the 'exploring' option.
     * @returns {void}
     */
    this.activate = function () {
        this.enabled = true;
        geoflo.options['exploring'].enable = true;
    }

	/**
	 * @function
     * @memberof module:geoflo.Exploring
	 * @name deactivate
	 * @description This function sets the 'enabled' and 'currentMatch' properties to false, and disables the 'exploring' option in the context.
	 */
    this.deactivate = function () {
        this.enabled = false;
        this.currentMatch = false;
        geoflo.options['exploring'].enable = false;
    }


	/**
	 * @function
     * @memberof module:geoflo.Exploring
	 * @name setFeatures
	 * @description This function sets features on the map based on the provided coordinates and options. It calculates the buffer based on the map zoom level and retrieves features within the buffer area. If routing is enabled, it calculates the route between two points.
	 * @param {Array<number>} coords - The coordinates to set features around.
	 * @param {Object} [options={}] - Additional options for setting features.
	 * @returns {boolean} Returns false if the function is not executed successfully.
	 */
    this.setFeatures = function (coords, options={}) {
        if (geoflo.mapMoving || !this.enabled || geoflo.currentMode.id !== 'draw') return false;
        
        if (!geoflo.Routing.enabled) {
            if (geoflo.hotFeature) geoflo.hotFeature.geometry.coordinates.pop();
            var fromPoint = geoflo.currentMode.firstClick || !geoflo.hotFeature ? geoflo.firstClick.coords : geoflo.hotFeature.geometry.coordinates[geoflo.hotFeature.geometry.coordinates.length - 1];
            var coords = [fromPoint, coords];
            if (geoflo.Utilities.isPointEqual(coords[0], coords[1])) return false;
            return this.getRoute(coords, options);
        }

        if (geoflo.map.getZoom() < geoflo.options.exploring.minZoom) return alert(`Zoom must be lower than ${geoflo.options.exploring.minZoom}`);

        var buffer = options.buffer || ((geoflo.options.exploring.buffer * Math.pow(2, Math.max(1, 19 - geoflo.map.getZoom()))) / 100);
        var polygon = turf.bboxPolygon([ geoflo.map.getBounds().getWest(), geoflo.map.getBounds().getSouth(), geoflo.map.getBounds().getEast(), geoflo.map.getBounds().getNorth() ]);

        if (coords) polygon = turf.polygon(turf.buffer(turf.point(coords), buffer).geometry.coordinates);

        geoflo.map.getSource(geoflo.statics.constants.sources['SNAP']).setData(turf.featureCollection([]));
        geoflo.map.getSource(geoflo.statics.constants.sources['ROUTE']).setData(turf.featureCollection([]));
        geoflo.map.getSource(geoflo.statics.constants.sources['VERTEX']).setData(turf.featureCollection([polygon]));

        this.getFeatures(turf.bbox(polygon)).then(features => { setFeatures(features, options); });
    }

	/**
	 * @function
     * @memberof module:geoflo.Exploring
	 * @name setFeature
	 * @description This function creates a line feature using the given coordinates and updates the current match based on the options. It also triggers an event and updates the source data on the map.
	 * @param {Array} coords - The coordinates to create the line feature. Default is an empty array.
	 * @param {Object} options - Additional options for setting the feature, such as the starting point. Default is an empty object.
	 * @returns {Object} The updated feature based on the provided coordinates and options.
	 */
    this.setFeature = function (coords=[], options={}) {
        if (!geoflo.hotFeature) return false;
        if (!coords.length) return geoflo.hotFeature;

        var feature = turf.lineString(coords);
        feature.geometry.coordinates[0] = options.start || feature.geometry.coordinates[0];

        if (this.currentMatch) feature = turf.lineString(geoflo.Utilities.combineSameTypeFeatures([this.currentMatch, feature]));
        this.currentMatch = feature;

        geoflo.map.getSource(geoflo.statics.constants.sources.SNAP).setData(turf.featureCollection([]));
        geoflo.fire('exploring.match', { route: this.currentMatch });
        return mode.updateHotSource(this.currentMatch);
    }


	/**
	 * @function
     * @memberof module:geoflo.Exploring
	 * @name getFeatures
	 * @description Retrieves features based on the provided bounds using Overpass API.
	 * @param {Array} bounds - An array containing the bounding box coordinates [minLon, minLat, maxLon, maxLat].
	 * @returns {Promise<Array>} An array of GeoJSON features within the specified bounds.
	 */
    this.getFeatures = async function (bounds) {
        if (!bounds || !bounds.length || bounds.length != 4) return false;

        var tag = `way["highway"](${bounds[1]} , ${bounds[0]} , ${bounds[3]} , ${bounds[2]});`;

        if (geoflo.map.getZoom() < 12) {
            tag = `way["highway"="motorway"](${bounds[1]} , ${bounds[0]} , ${bounds[3]} , ${bounds[2]});`
            /* way["highway"="primary"](${bounds[1]} , ${bounds[0]} , ${bounds[3]} , ${bounds[2]});
            way["highway"="secondary"](${bounds[1]} , ${bounds[0]} , ${bounds[3]} , ${bounds[2]});` */
        }

        geoflo.overpassDownloading = true;

        const query = '[out:json][timeout:25];(' + tag + ');out body;>;out skel qt;';
        const data = await fetch("//overpass-api.de/api/interpreter?data=" + query, { method: 'GET' } );
        const response = await data.json();
        const geojson = convertFromOverpassToGeojson(response);
        return geojson && geojson.features ? geojson.features : [];
    }

	/**
	 * @function
     * @memberof module:geoflo.Exploring
	 * @name getMatch
	 * @description This function takes an array of coordinates and optional options to fetch a matched route from the OSRM API.
	 * @param {Array} coords - An array of coordinates to match the route against.
	 * @param {Object} options - Optional parameters for customization.
	 * @param {Object} options.feature - Optional feature to match against.
	 * @param {Number|Function} options.radius - Optional radius for matching or a function to calculate it.
	 * @param {String} options.profile - Optional profile for routing (default: 'driving').
	 * @param {Boolean} options.set - Optional flag to set the feature if matching is successful.
	 * @returns {Promise<Array|Boolean>} The matched route response object or false if no coordinates are provided or matching fails.
	 */
    this.getMatch = async function (coords=[], options={}) {
        if (!coords.length) return false;

        var tolerance = geoflo.options.exploring.tolerance;
        var feature = options.feature || turf.cleanCoords(turf.lineString(coords));
        feature = turf.simplify(feature, { mutate: true, tolerance: typeof tolerance === 'function' ? tolerance(geoflo.map) : tolerance, highQuality: true });

        var coordinates = feature.geometry.coordinates;
        if (coordinates.length < 2) return false;

        geoflo.overpassDownloading = true;

        options.radius = options.radius || 50;
        options.profile = options.profile || 'driving';
        coords = coordinates.join(';');

        const radiuses = coordinates.map(() => options.radius).join(';');

        const query = 'https://router.project-osrm.org/match/v1/' + options.profile + '/' + coords +
            '?overview=simplified' +
            '&radiuses=' + radiuses +
            '&generate_hints=false' +
            '&skip_waypoints=true' +
            '&gaps=ignore' +
            '&annotations=nodes' +
            '&tidy=true' +
            '&geometries=geojson';

        const match = await fetch(query, { method: 'GET' } );
        const response = await match.json();

        geoflo.overpassDownloading = false;
        if (response.code !== 'Ok') alert(`${response.code} - ${response.message}.`);
        return !options.set ? response : !response.matchings || !response.matchings.length ? feature : this.setFeature(response.matchings[0].geometry.coordinates, options);
    }

	/**
	 * @function
     * @memberof module:geoflo.Exploring
	 * @name getRoute
	 * @description Retrieves a route based on the provided coordinates using the OSRM routing service.
	 * @param {Array} coords - Array of coordinates representing the route.
	 * @param {Object} options - Additional options for the route calculation.
	 * @param {Object} options.feature - Feature object to use for the route calculation.
	 * @param {String} options.profile - Profile type for the route calculation (default: 'driving').
	 * @param {Boolean} options.set - Flag to indicate whether to set the route as a feature.
	 * @returns {Promise<Array|Boolean>} The route response object or false if no coordinates are provided or the route calculation fails.
	 */
    this.getRoute = async function (coords=[], options={}) {
        var feature = options.feature ? options.feature : !coords.length ? false : turf.cleanCoords(turf.lineString(coords));
        if (!feature) return false;
        
        var coordinates = feature.geometry.coordinates;
        if (coordinates.length < 2) return false;

        geoflo.overpassDownloading = true;
        options.profile = options.profile || 'driving';
        coords = coordinates.join(';');

        const query = 'https://router.project-osrm.org/route/v1/' + options.profile + '/' + coords +
            '?overview=simplified' +
            '&continue_straight=true' +
            '&annotations=nodes' +
            '&geometries=geojson';

        const match = await fetch(query, { method: 'GET' } );
        const response = await match.json();

        geoflo.overpassDownloading = false;
        if (response.code !== 'Ok') alert(`${response.code} - ${response.message}.`);
        return !options.set ? response : !response.routes || !response.routes.length ? feature : this.setFeature(response.routes[0].geometry.coordinates, options);
    }
    


    if (geoflo.options['exploring'].enable) this.activate();



    function convertFromOverpassToGeojson(op) {
        const elementsById = {};

        op.elements.forEach((element) => {
            const key = `${element.type}-${element.id}`;
            elementsById[key] = element;
        });

        const wayToPoints = function (way) {
            const line = [];
            way.nodes.forEach((nodeId) => {
                const key = `node-${nodeId}`;
                const nodeElement = elementsById[key];
                if (nodeElement) {
                    line.push([nodeElement.lon, nodeElement.lat]);
                } else {
                    console.error("Node ", key, " missing");
                }
            });
            return line;
        };

        const lineStrings = [];

        op.elements.forEach((element) => {
            if (element.type === "way") {
                const line = wayToPoints(element);
                if (line.length > 1) {
                    lineStrings.push(turf.lineString(line, element.tags));
                }
            } else if (element.type === "relation") {
                element.members.forEach((member) => {
                    const memberType = member.type;
                    if (memberType === "way") {
                        const key = `way-${member.ref}`;
                        const way = elementsById[key];
                        const line = wayToPoints(way);
                        if (line.length > 1) {
                            lineStrings.push(turf.lineString(line, element.tags));
                        }
                    }
                });
            }
        });

        return geoflo.turf.featureCollection(lineStrings);
    }

    function setFeatures(features=[]) {
        geoflo.overpassDownloading = false;
        if (geoflo.mapMoving || !geoflo.Exploring.enabled || geoflo.currentMode.id !== 'draw') return geoflo.updateMeshData([], true);
        geoflo.map.getSource(geoflo.statics.constants.sources.VERTEX).setData(turf.featureCollection([]));
        geoflo.Snapping.addFeature(geoflo.snapFeature);
        geoflo.setMeshFeatures(features);
        geoflo.currentMode.updateHotSource();
        geoflo.fire('overpass.add', { features: features });
        if (!geoflo.currentMode.firstClick) return features;
        var points = turf.explode(turf.featureCollection(features))
        var closestPoint = turf.nearestPoint(turf.point(geoflo.currentMode.firstClick.coords), points);
        geoflo.lastClick = { coords: closestPoint.geometry.coordinates };
        return features;
    }
};

export default Exploring;