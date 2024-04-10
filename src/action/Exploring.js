/**
 * @mixin
 * @memberof module:GeoFlo
 * @name Exploring
 * @description A class that handles exploring functionality in a mapping context. Only enabled when the currentMode is set to 'draw'.
 * @param {Object} ctx - The GeoFlo context object
 * @param {Object} mode - The currentMode
 */
const Exploring = function (ctx, mode) {
    this.type = mode.type;

	/**
	 * @function
     * @memberof module:GeoFlo.Exploring
	 * @name activate
	 * @description Activates by setting the 'enabled' property to true and enabling the 'exploring' option.
	 * @params {void} None
	 * @returns {void}
	 */
    this.activate = function () {
        this.enabled = true;
        ctx.options['exploring'].enable = true;
    }

	/**
	 * @function
     * @memberof module:GeoFlo.Exploring
	 * @name deactivate
	 * @description This function sets the 'enabled' and 'currentMatch' properties to false, and disables the 'exploring' option in the context.
	 */
    this.deactivate = function () {
        this.enabled = false;
        this.currentMatch = false;
        ctx.options['exploring'].enable = false;
    }


	/**
	 * @function
     * @memberof module:GeoFlo.Exploring
	 * @name setFeatures
	 * @description This function sets features on the map based on the provided coordinates and options. It calculates the buffer based on the map zoom level and retrieves features within the buffer area. If routing is enabled, it calculates the route between two points.
	 * @param {Array<number>} coords - The coordinates to set features around.
	 * @param {Object} [options={}] - Additional options for setting features.
	 * @returns {boolean} Returns false if the function is not executed successfully.
	 */
    this.setFeatures = function (coords, options={}) {
        if (ctx.mapMoving || !this.enabled || ctx.currentMode.id !== 'draw') return false;
        
        if (!ctx.Routing.enabled) {
            if (ctx.hotFeature) ctx.hotFeature.geometry.coordinates.pop();
            var fromPoint = ctx.currentMode.firstClick || !ctx.hotFeature ? ctx.firstClick.coords : ctx.hotFeature.geometry.coordinates[ctx.hotFeature.geometry.coordinates.length - 1];
            var coords = [fromPoint, coords];
            if (ctx.Utilities.isPointEqual(coords[0], coords[1])) return false;
            return this.getRoute(coords, options);
        }

        if (ctx.map.getZoom() < ctx.options.exploring.minZoom) return alert(`Zoom must be lower than ${ctx.options.exploring.minZoom}`);

        var buffer = options.buffer || ((ctx.options.exploring.buffer * Math.pow(2, Math.max(1, 19 - ctx.map.getZoom()))) / 100);
        var polygon = turf.bboxPolygon([ ctx.map.getBounds().getWest(), ctx.map.getBounds().getSouth(), ctx.map.getBounds().getEast(), ctx.map.getBounds().getNorth() ]);

        if (coords) polygon = turf.polygon(turf.buffer(turf.point(coords), buffer).geometry.coordinates);

        ctx.map.getSource(ctx.statics.constants.sources['SNAP']).setData(turf.featureCollection([]));
        ctx.map.getSource(ctx.statics.constants.sources['ROUTE']).setData(turf.featureCollection([]));
        ctx.map.getSource(ctx.statics.constants.sources['VERTEX']).setData(turf.featureCollection([polygon]));

        this.getFeatures(turf.bbox(polygon)).then(features => { setFeatures(features, options); });
    }

	/**
	 * @function
     * @memberof module:GeoFlo.Exploring
	 * @name setFeature
	 * @description This function creates a line feature using the given coordinates and updates the current match based on the options. It also triggers an event and updates the source data on the map.
	 * @param {Array} coords - The coordinates to create the line feature. Default is an empty array.
	 * @param {Object} options - Additional options for setting the feature, such as the starting point. Default is an empty object.
	 * @returns {Object} The updated feature based on the provided coordinates and options.
	 */
    this.setFeature = function (coords=[], options={}) {
        if (!coords.length) return ctx.hotFeature;

        var feature = turf.lineString(coords);
        feature.geometry.coordinates[0] = options.start || feature.geometry.coordinates[0];

        if (this.currentMatch) feature = turf.lineString(ctx.Utilities.combineSameTypeFeatures([this.currentMatch, feature]));
        this.currentMatch = feature;

        ctx.map.getSource(ctx.statics.constants.sources.SNAP).setData(turf.featureCollection([]));
        ctx.fire('exploring.match', { route: this.currentMatch });
        return mode.updateHotSource(this.currentMatch);
    }


	/**
	 * @function
     * @memberof module:GeoFlo.Exploring
	 * @name getFeatures
	 * @description Retrieves features based on the provided bounds using Overpass API.
	 * @param {Array} bounds - An array containing the bounding box coordinates [minLon, minLat, maxLon, maxLat].
	 * @returns {Promise<Array>} An array of GeoJSON features within the specified bounds.
	 */
    this.getFeatures = async function (bounds) {
        if (!bounds || !bounds.length || bounds.length != 4) return false;

        var tag = `way["highway"](${bounds[1]} , ${bounds[0]} , ${bounds[3]} , ${bounds[2]});`;

        if (ctx.map.getZoom() < 12) {
            tag = `way["highway"="motorway"](${bounds[1]} , ${bounds[0]} , ${bounds[3]} , ${bounds[2]});`
            /* way["highway"="primary"](${bounds[1]} , ${bounds[0]} , ${bounds[3]} , ${bounds[2]});
            way["highway"="secondary"](${bounds[1]} , ${bounds[0]} , ${bounds[3]} , ${bounds[2]});` */
        }

        ctx.overpassDownloading = true;

        const query = '[out:json][timeout:25];(' + tag + ');out body;>;out skel qt;';
        const data = await fetch("//overpass-api.de/api/interpreter?data=" + query, { method: 'GET' } );
        const response = await data.json();
        const geojson = convertFromOverpassToGeojson(response);
        return geojson && geojson.features ? geojson.features : [];
    }

	/**
	 * @function
     * @memberof module:GeoFlo.Exploring
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

        var tolerance = ctx.options.exploring.tolerance;
        var feature = options.feature || turf.cleanCoords(turf.lineString(coords));
        feature = turf.simplify(feature, { mutate: true, tolerance: typeof tolerance === 'function' ? tolerance(ctx.map) : tolerance, highQuality: true });

        var coordinates = feature.geometry.coordinates;
        if (coordinates.length < 2) return false;

        ctx.overpassDownloading = true;

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

        ctx.overpassDownloading = false;
        if (response.code !== 'Ok') alert(`${response.code} - ${response.message}.`);
        return !options.set ? response : !response.matchings || !response.matchings.length ? feature : this.setFeature(response.matchings[0].geometry.coordinates, options);
    }

	/**
	 * @function
     * @memberof module:GeoFlo.Exploring
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
        if (!coords.length) return false;

        var feature = options.feature || turf.cleanCoords(turf.lineString(coords));
        var coordinates = feature.geometry.coordinates;
        if (coordinates.length < 2) return false;

        ctx.overpassDownloading = true;
        options.profile = options.profile || 'driving';
        coords = coordinates.join(';');

        const query = 'https://router.project-osrm.org/route/v1/' + options.profile + '/' + coords +
            '?overview=simplified' +
            '&continue_straight=true' +
            '&annotations=nodes' +
            '&geometries=geojson';

        const match = await fetch(query, { method: 'GET' } );
        const response = await match.json();

        ctx.overpassDownloading = false;
        if (response.code !== 'Ok') alert(`${response.code} - ${response.message}.`);
        return !options.set ? response : !response.routes || !response.routes.length ? feature : this.setFeature(response.routes[0].geometry.coordinates, options);
    }
    


    if (ctx.options['exploring'].enable) this.activate();



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

        return ctx.turf.featureCollection(lineStrings);
    }

    function setFeatures(features=[]) {
        ctx.overpassDownloading = false;
        if (ctx.mapMoving || !ctx.Exploring.enabled || ctx.currentMode.id !== 'draw') return ctx.updateMeshData([], true);
        ctx.map.getSource(ctx.statics.constants.sources.VERTEX).setData(turf.featureCollection([]));
        ctx.Snapping.addFeature(ctx.snapFeature);
        ctx.setMeshFeatures(features);
        ctx.currentMode.updateHotSource();
        ctx.fire('overpass.add', { features: features });
        if (!ctx.currentMode.firstClick) return features;
        var points = turf.explode(turf.featureCollection(features))
        var closestPoint = turf.nearestPoint(turf.point(ctx.currentMode.firstClick.coords), points);
        ctx.lastClick = { coords: closestPoint.geometry.coordinates };
        return features;
    }
}

export { Exploring as default }