/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./index.css":
/*!*******************!*\
  !*** ./index.css ***!
  \*******************/
/***/ (() => {

throw new Error("Module parse failed: Unexpected token (1:0)\nYou may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders\n> :root {\n|     --geoflo-primary-color: #d7ef7e;\n|     --geoflo-primary-background: #5a5a5a;");

/***/ }),

/***/ "./src/action/Exploring.js":
/*!*********************************!*\
  !*** ./src/action/Exploring.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Exploring)
/* harmony export */ });
/**
 * @mixin
 * @memberof module:geoflo
 * @name Exploring
 * @description A class that handles exploring functionality in a mapping context. Only enabled when the currentMode is set to 'draw'.
 * @param {Object} ctx - The GeoFlo context object
 * @param {Object} mode - The currentMode
 */
const Exploring = function (ctx, mode) {
    this.type = mode.type;

	/**
	 * @function
     * @memberof module:geoflo.Exploring
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
     * @memberof module:geoflo.Exploring
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
     * @memberof module:geoflo.Exploring
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
     * @memberof module:geoflo.Exploring
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
     * @memberof module:geoflo.Exploring
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



/***/ }),

/***/ "./src/action/Painting.js":
/*!********************************!*\
  !*** ./src/action/Painting.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Painting)
/* harmony export */ });
/**
 * @mixin
 * @memberof module:geoflo
 * @name Painting
 * @description A class that handles painting functionality in a mapping context. Only enabled when the currentMode is set to 'draw'.
 * @param {Object} ctx - The GeoFlo context object
 * @param {Object} mode - The currentMode
 */
const Painting = function (ctx, mode) {
    this.type = mode.type;
    this.feature = false;
    this.currentCoords = [];

	/**
	 * @function
     * @memberof module:geoflo.Painting
	 * @name activate
	 * @description Activates the painting functionality by enabling painting mode and clearing the source data.
	 * @returns {void}
	 */
    this.activate = function () {
        this.deactivate();
        this.enabled = true;
        ctx.options['painting'].enable = true;
        ctx.map.getSource(ctx.statics.constants.sources.SNAP).setData(turf.featureCollection([]));
    }

	/**
	 * @function
     * @memberof module:geoflo.Painting
	 * @name deactivate
	 * @description This function deactivates the current feature by setting the 'enabled' property to false, disabling the painting tool, enabling drag pan on the map, and deleting the feature.
	 * @returns {void}
	 */
    this.deactivate = function () {
        this.enabled = false;
        ctx.options['painting'].enable = false;
        ctx.map.dragPan.enable();
        delete this.feature;
    }

	/**
	 * @function
     * @memberof module:geoflo.Painting getFeature
	 * @name getFeature
	 * @description This function retrieves the current painted feature.
	 * @returns {any} The painted feature.
	 */
    this.getFeature = function () {
        return this.feature;
    }

	/**
	 * @function
     * @memberof module:geoflo.Painting
	 * @name setFeature
	 * @description This function creates a feature based on the given type and coordinates. It updates the currentCoords array, sets the feature, and triggers a 'painting.start' event.
	 * @param {Array} coords - The coordinates to set the feature at.
	 * @returns {Object} The created feature.
	 */
    this.setFeature = function (coords) {
        if (!this.type || !coords) return false;
        if (!ctx.mouseIsDown) return ctx.hotFeature;
        
        var type = this.type;
        var feature = setFeature(type, coords);

        if (!this.feature) {
            this.currentCoords = [];
            ctx.startPoint = coords;
            ctx.map.getSource(ctx.statics.constants.sources.SNAP).setData(turf.featureCollection([feature]));
            ctx.fire('painting.start', { type: type, coords: coords, feature: feature });
        }

        this.currentCoords.push(coords);
        this.feature = feature;
        return this.feature;
    }

	/**
	 * @function
     * @memberof module:geoflo.Painting
	 * @name updateFeature
	 * @description This function updates the feature based on the provided coordinates. It handles different types of features like Rectangle, Circle, and others.
	 * @param {Array} coords - The coordinates to update the feature with.
	 * @returns {Object} The updated feature object.
	 */
    this.updateFeature = function (coords) {
        if (!this.enabled) return ctx.hotFeature;
        if (!this.feature) return this.setFeature(coords);

        var feature = this.feature;
        var type = this.type;

        this.currentCoords.push(coords);

        if (type === 'Rectangle') {
            updateCoordinate(feature, "0.1", coords[0], ctx.mouseIsDown[1]);
            updateCoordinate(feature, "0.2", coords[0], coords[1]);
            updateCoordinate(feature, "0.3", ctx.mouseIsDown[0], coords[1]);
            updateCoordinate(feature, "0.4", ctx.mouseIsDown[0], ctx.mouseIsDown[1] );
        } else if (type === 'Circle') {
            var center = feature.properties.center;
            if (!center || !center.length) return feature;

            const distanceInKm = turf.distance(turf.point(center), turf.point(coords), { units : 'kilometers'});
            const circleFeature = turf.circle(center, distanceInKm);

            feature.geometry.coordinates = circleFeature.geometry.coordinates;
            ctx.Utilities.setProperty(feature, 'radiusInKm', distanceInKm);
        } else {
            feature.geometry.coordinates.push(coords);
        }

        ctx.map.getSource(ctx.statics.constants.sources.SNAP).setData(turf.featureCollection([this.feature]));
        ctx.fire('painting.update', { type: type, coords: coords, feature: feature });
        return feature;
    }

	/**
	 * @function
     * @memberof module:geoflo.Painting
	 * @name handleUp
	 * @description This function updates the feature based on the 'mouse up' event. It retrieves the current feature, updates the hot source, clones the updated feature, and sets the last click coordinates.
	 * @param {Event} event - The event triggering the function.
	 * @returns {Promise<Object>} The updated feature object.
	 */
	
    this.handleUp = async function (event) {
        if (!this.feature) return false;

        var feature;

        if (ctx.Exploring.enabled) this.feature = await ctx.Exploring.getMatch(this.currentCoords, { set: true, start: ctx.startPoint });

        feature = mode.updateHotSource(this.feature);
        feature = ctx.Utilities.cloneDeep(feature);

        ctx.lastClick = { coords: feature.geometry.coordinates[feature.geometry.coordinates.length - 1] };
        this.currentCoords = [];
        this.feature = feature;
        return feature;
    }



    if (ctx.options['painting'].enable) this.activate();



    function setFeature (type, coords) {
        var feature;

        if (type === 'Rectangle') {
            feature = turf.polygon([[
                ctx.mouseIsDown,
                coords,
                coords,
                ctx.mouseIsDown
            ]]);
        } else if (type === 'Circle') {
            feature = turf.polygon([[
                ctx.mouseIsDown,
                coords,
                coords,
                ctx.mouseIsDown
            ]]);

            ctx.Utilities.setProperty(feature, 'center', ctx.mouseIsDown);
        } else {
            feature = turf.lineString([ctx.mouseIsDown, coords]);
        }

        ctx.Utilities.setProperty(feature, 'type', type);
        ctx.Utilities.setProperty(feature, 'painting', 1);
        return feature;
    }

    function updateCoordinate (f, t, e, n) {
        var o = t.split(".")
            , r = parseInt(o[0], 10)
            , i = parseInt(o[1], 10);
        void 0 === f.geometry.coordinates[r] && (f.geometry.coordinates[r] = []),
        f.geometry.coordinates[r][i] = [e, n]
    }
}



/***/ }),

/***/ "./src/action/Pinning.js":
/*!*******************************!*\
  !*** ./src/action/Pinning.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Pinning)
/* harmony export */ });
/**
 * @mixin
 * @memberof module:geoflo
 * @name Pinning
 * @description A class that handles pinning functionality in a mapping context. Only enabled when the currentMode is set to 'draw'.
 * @param {Object} ctx - The GeoFlo context object
 * @param {Object} mode - The currentMode
 */
const Pinning = function (ctx, mode) {
    this.type = mode.type;
    this.updatedFeatures = [];

	/**
	 * @function
     * @memberof module:geoflo.Pinning
	 * @name activate
	 * @description Activates the feature by setting the enabled flag to true and enabling pinning in the options.
	 * @params {void} None
	 * @returns {void}
	 */
    this.activate = function () {
        this.updatedFeatures = [];
        this.enabled = true;
        ctx.options['pinning'].enable = true;
    }

	/**
	 * @function
     * @memberof module:geoflo.Pinning
	 * @name deactivate
	 * @description This function deactivates the pinning feature by setting enabled to false, disabling pinning in options, clearing buffer, pinableFeatures, and pinningFeatures, and resetting updatedFeatures.
	 */
    this.deactivate = function () {
        this.enabled = false;
        ctx.options['pinning'].enable = false;
        this.resetFeatures();
        delete this.buffer;
        delete ctx.pinableFeatures;
        delete ctx.pinningFeatures;
        this.updatedFeatures = [];
    }

	/**
	 * @function
     * @memberof module:geoflo.Pinning
	 * @name getFeatures
	 * @description Retrieves the features from the pinnedFeatures array in the context object.
	 * @returns {Array} An array of features extracted from the pinnedFeatures array.
	 */
    this.getFeatures = function () {
        var features = ctx.pinnedFeatures && ctx.pinnedFeatures.length ? ctx.pinnedFeatures.map(function (feature) { return feature.feature }) : [];
        return features;
    }

	/**
	 * @function
     * @memberof module:geoflo.Pinning
	 * @name setBuffer
	 * @description This function creates a buffer around the provided coordinates based on the pinning buffer option.
	 * @param {Array<number>} coords - The coordinates [longitude, latitude] to create the buffer around.
	 * @returns {Object|boolean} Returns the buffer object containing the feature, radius, and coordinates if successful, otherwise false.
	 */
    this.setBuffer = function (coords) {
        delete this.buffer;

        if (!this.enabled) return false;
        if (!coords || !ctx.options.pinning.buffer) return false;

        var buffer = turf.buffer(turf.point(coords), ctx.options.pinning.buffer);
        var radius = turf.polygon(buffer.geometry.coordinates);

        this.buffer = {
            feature: buffer,
            radius: radius,
            coords: coords
        }

        return this.buffer;
    }

	/**
	 * @function
     * @memberof module:geoflo.Pinning
	 * @name setFeatures
	 * @description Sets the pinable features based on the provided coordinates and fires an event.
	 * @param {Object} coords - The coordinates to determine nearby features.
	 * @returns {Array} - An array of pinable features.
	 */
    this.setFeatures = function (coords) {
        ctx.pinableFeatures = [];
        if (!this.enabled || !coords) return false;
        ctx.pinableFeatures = this.getNearByFeatures(coords);
        ctx.fire('pinning.add', { features: ctx.pinableFeatures, buffer: this.buffer });
        return ctx.pinableFeatures;
    }

	/**
	 * @function
     * @memberof module:geoflo.Pinning
	 * @name resetFeatures
	 * @description Resets the updated features by adding them to the canvas context.
	 * @returns {boolean} Returns false if there are no updated features to reset.
	 */
    this.resetFeatures = function () {
        if (!this.updatedFeatures.length) return false;
        ctx.addFeatures(this.updatedFeatures, true);
    }

	/**
	 * @function
     * @memberof module:geoflo.Pinning
	 * @name updateFeatures
	 * @description This function updates the features if the pinning functionality is enabled. It updates the pinable features, pinned features, and triggers events accordingly.
	 * @returns {boolean} Returns false if the pinning functionality is not enabled, otherwise returns the updated pinning features.
	 */
    this.updateFeatures = function () {
        if (!this.enabled) return false;
        if (!ctx.pinableFeatures || !ctx.pinableFeatures.length) return delete ctx.pinningFeatures, false;
        updateFeatures.call(this, ctx.pinableFeatures);
        ctx.Features.updateFeatures(ctx.pinableFeatures, ctx.snappedVertex);
        ctx.pinnedFeatures = ctx.Utilities.cloneDeep(ctx.pinableFeatures);
        ctx.fire('pinning.update', { feature: ctx.hotFeature, vertex: turf.point(ctx.snappedVertex), features: ctx.pinnedFeatures });
        return ctx.pinningFeatures;
    }

	/**
	 * @function
     * @memberof module:geoflo.Pinning
	 * @name getNearByFeatures
	 * @description This function calculates the radius based on the map zoom level and retrieves nearby features within that radius.
	 * @param {Array<number>} coords - The coordinates [longitude, latitude] to find nearby features.
	 * @returns {Array<Object>} An array of nearby features with their IDs, types, indices, and feature objects.
	 */
    this.getNearByFeatures = function (coords) {
        if (!this.enabled || !coords) return false;

        var hotFeature = ctx.hotFeature;
        var calculatedRadius = ctx.options.snapping.distance * Math.pow(2, Math.max(1, 19 - ctx.map.getZoom()));
        var radiusInKm = calculatedRadius / 100000;
        var buffer = this.setBuffer(coords);
        var features = ctx.getRenderedDrawnFeatures({lng: coords[0], lat: coords[1]}, radiusInKm);
        var nearby = [];

        features.forEach(function (feature) {
            turf.coordEach(feature, function (coord, index) {
                var isNearby = false;
    
                if (buffer.radius && turf.booleanWithin(turf.point(coord), buffer.radius)) isNearby = true;
                if (!isNearby && buffer.coords && ctx.Utilities.isPointEqual(coord, buffer.coords)) isNearby = true;
                if (!isNearby) return;
                if (hotFeature && hotFeature.id === feature.id) return;
                    
                nearby.push({
                    id: feature.id || feature.properties.id,
                    type: feature.properties.type,
                    index: index,
                    feature: feature
                })
            });
        });

        return nearby;
    }
    
    if (ctx.options['pinning'].enable) this.activate();


    function updateFeatures(features) {
        if (!features || !features.length) return false;

        features.forEach(function (feature) {
            var pinned = this.updatedFeatures.find(function (f) { return f.id === feature.id });
            if (pinned) return;
            this.updatedFeatures.push(ctx.Utilities.cloneDeep(feature.feature));
        }, this);
    }
}



/***/ }),

/***/ "./src/action/Routing.js":
/*!*******************************!*\
  !*** ./src/action/Routing.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Routing)
/* harmony export */ });
/**
 * @mixin
 * @memberof module:geoflo
 * @name Routing
 * @description A class that handles routing functionality in a mapping context. Only enabled when the currentMode is set to 'draw'.
 * @param {Object} ctx - The GeoFlo context object
 * @param {Object} mode - The currentMode
 */
const Routing = function (ctx, mode) {
    this.type = mode.type;
    this.graphData = {};
    this.features = ctx.Features.getColdFeatures();

	/**
	 * @function
     * @memberof module:geoflo.Routing
	 * @name activate
	 * @description Activates the functionality by setting the 'enabled' property to true and enabling routing in the options.
	 * @params {void} None
	 * @returns {void}
	 */
    this.activate = function () {
        this.enabled = true;
        ctx.options['routing'].enable = true;
    };

	/**
	 * @function
     * @memberof module:geoflo.Routing
	 * @name deactivate
	 * @description This function deactivates the routing feature by setting the enabled flag to false, disabling routing in the options, and clearing the route data on the map.
	 * @returns {void}
	 */
    this.deactivate = function () {
        this.enabled = false;
        ctx.options['routing'].enable = false;
        ctx.map.getSource(ctx.statics.constants.sources['ROUTE']).setData(turf.featureCollection([]));
    };

	/**
	 * @function
     * @memberof module:geoflo.Routing
	 * @name getRoute
	 * @description This function calculates a route between two points on a map using a PathFinder object. It checks if the routing feature is enabled and if the map is not currently moving. It then creates a feature collection from the existing features, initializes a PathFinder object, and finds a path between the two points. The path is validated and then added to the map with a 'routing.add' event.
	 * @param {Object} fromPoint - The starting point for the route.
	 * @param {Object} toPoint - The destination point for the route.
	 * @returns {Array|boolean} The calculated route path as an array of points, or false if the route could not be calculated.
	 */
    this.getRoute = function (fromPoint, toPoint) {
        if (!this.enabled || ctx.mapMoving) return false;
        var features = turf.featureCollection(this.getFeatures());
        var pathfinder = new PathFinder(features, ctx.options.routing);
        var path = pathfinder.findPath ? pathfinder.findPath(fromPoint, toPoint) : false;
        path = validatePath(fromPoint, toPoint, path);
        ctx.fire('routing.add', { from: fromPoint, to: toPoint, path: path });
        return path;
    };

	/**
	 * @function
     * @memberof module:geoflo.Routing
	 * @name getMatch
	 * @description Retrieves a match for the given coordinates using the Exploring service. Sets the match as a starting point for routing.
	 * @param {Object} coords - The coordinates for which to find a match.
	 * @returns {Promise<Object>} The matched feature with routing property set to true.
	 */
    this.getMatch = async function (coords) {
        var feature = await ctx.Exploring.getMatch(coords, { set: true, start: ctx.startPoint });
        feature.properties.routing = true;
        return feature;
    }

	/**
	 * @function
     * @memberof module:geoflo.Routing
	 * @name getClosest
	 * @description Calculates the closest point on a route based on the last click and the closest point to it.
	 * @returns {Object|boolean} Returns a GeoJSON LineString feature with routing property set to true if successful, otherwise false.
	 */
    this.getClosest = function () {
        if (!ctx.closestPoint || !ctx.lastClick) return false;
        var route = this.getRoute(ctx.lastClick, ctx.closestPoint);
        if (!route || !route.path) return false;
        var feature = turf.lineString(route.path);
        feature.properties.routing = true;
        return feature;
    };

	/**
	 * @function
     * @memberof module:geoflo.Routing
	 * @name getFeatures
	 * @description Retrieves features of type 'LineString' from the mesh index.
	 * @returns {Array} An array of features of type 'LineString'.
	 */
    this.getFeatures = function () {
        var mesh = ctx.meshIndex.getFeatures();
        var features = [mesh, this.features].flat();
        return features.filter(function(feature) { return feature.geometry.type === 'LineString' });
    };

    
    if (ctx.options['routing'].enable) this.activate();


    function PathFinder(features, options) {
        options = options || {};
        
        if (!features.compactedVertices) { features = preprocess(features, options); }

        this._graph = features;
        this._keyFn = options.keyFn || function(c) { return c.join(','); };
        this._precision = options.precision || 1e-5;
        this._options = options;
    
        if (Object.keys(this._graph.compactedVertices).filter(function(k) { return k !== 'edgeData'; }).length === 0) {
            return null;
        }

        this.findPath = function(a, b) {
            var start = this._keyFn(roundCoord(a.coords, this._precision)),
                finish = this._keyFn(roundCoord(b.coords, this._precision));
    
            if (!this._graph.vertices[start] || !this._graph.vertices[finish]) {
                return null;
            }
    
            var phantomStart = this._createPhantom(start);
            var phantomEnd = this._createPhantom(finish);
    
            var path = findPath(this._graph.compactedVertices, start, finish);
    
            if (path) {
                var weight = path[0];
                path = path[1];
                return {
                    fullPath: path,
                    path: path.reduce(function buildPath(cs, v, i, vs) {
                        if (i > 0) {
                            cs = cs.concat(this._graph.compactedCoordinates[vs[i - 1]][v]);
                        }
    
                        return cs;
                    }.bind(this), []).concat([this._graph.sourceVertices[finish]]),
                    weight: weight,
                    edgeDatas: this._graph.compactedEdges 
                        ? path.reduce(function buildEdgeData(eds, v, i, vs) {
                            if (i > 0) {
                                eds.push({
                                    reducedEdge: this._graph.compactedEdges[vs[i - 1]][v]
                                });
                            }
    
                            return eds;
                        }.bind(this), [])
                        : undefined
                };
            } else {
                return null;
            }
    
            this._removePhantom(phantomStart);
            this._removePhantom(phantomEnd);
        }

        this.serialize = function() {
            return this._graph;
        }

        this._createPhantom = function(n) {
            if (this._graph.compactedVertices[n]) return null;
    
            var phantom = compactNode(n, this._graph.vertices, this._graph.compactedVertices, this._graph.sourceVertices, this._graph.edgeData, true, this._options);
            this._graph.compactedVertices[n] = phantom.edges;
            this._graph.compactedCoordinates[n] = phantom.coordinates;
    
            if (this._graph.compactedEdges) {
                this._graph.compactedEdges[n] = phantom.reducedEdges;
            }
    
            Object.keys(phantom.incomingEdges).forEach(function(neighbor) {
                this._graph.compactedVertices[neighbor][n] = phantom.incomingEdges[neighbor];
                this._graph.compactedCoordinates[neighbor][n] = [this._graph.sourceVertices[neighbor]].concat(phantom.incomingCoordinates[neighbor].slice(0, -1));
                if (this._graph.compactedEdges) {
                    this._graph.compactedEdges[neighbor][n] = phantom.reducedEdges[neighbor];
                }
            }.bind(this))
    
            return n;
        }

        this._removePhantom = function(n) {
            if (!n) return;
    
            Object.keys(this._graph.compactedVertices[n]).forEach(function(neighbor) {
                delete this._graph.compactedVertices[neighbor][n];
            }.bind(this));
            Object.keys(this._graph.compactedCoordinates[n]).forEach(function(neighbor) {
                delete this._graph.compactedCoordinates[neighbor][n];
            }.bind(this));
            if (this._graph.compactedEdges) {
                Object.keys(this._graph.compactedEdges[n]).forEach(function(neighbor) {
                    delete this._graph.compactedEdges[neighbor][n];
                }.bind(this));
            }
    
            delete this._graph.compactedVertices[n];
            delete this._graph.compactedCoordinates[n];
    
            if (this._graph.compactedEdges) {
                delete this._graph.compactedEdges[n];
            }
        }
    };

    function ShortestPath () {
        var INFINITY = 1 / 0;
        this.vertices = {};
    
        this.addVertex = function (name, edges) {
            this.vertices[name] = edges;
        };
    
        this.setVertices = function (graph) {
            this.vertices = graph;
        };
    
        this.shortestPath = function (start, finish) {
            var nodes = new PriorityQueue(),
                distances = {},
                previous = {},
                path = [],
                smallest, vertex, neighbor, alt;
        
            for (vertex in this.vertices) {
                if (vertex === start) {
                    distances[vertex] = 0;
                    nodes.enqueue(0, vertex);
                } else {
                    distances[vertex] = INFINITY;
                    nodes.enqueue(INFINITY, vertex);
                }
        
                previous[vertex] = null;
            }
        
            while (!nodes.isEmpty()) {
                smallest = nodes.dequeue();
        
                if (smallest === finish) {
                    path = [];
            
                    while (previous[smallest]) {
                        path.push(smallest);
                        smallest = previous[smallest];
                    }
            
                    break;
                }
        
                if (!smallest || distances[smallest] === INFINITY) {
                    continue;
                }
        
                for (neighbor in this.vertices[smallest]) {
                    alt = distances[smallest] + this.vertices[smallest][neighbor];
        
                    if (alt < distances[neighbor]) {
                        distances[neighbor] = alt;
                        previous[neighbor] = smallest;
            
                        nodes.enqueue(alt, neighbor);
                    }
                }
            }
        
            return path;
        };
    };
    
    function PriorityQueue() {
        this._nodes = [];
    
        this.enqueue = function (priority, key) {
            this._nodes.push({key: key, priority: priority});
            this.sort();
        };
    
        this.dequeue = function () {
            return this._nodes.shift().key;
        };
    
        this.sort = function () {
            this._nodes.sort((a, b) => {
                return a.priority - b.priority;
            });
        };
    
        this.isEmpty = function () {
            return !this._nodes.length;
        };
    };

    function TinyQueue(data, compare) {
        if ( data === void 0 ) data = [];
        if ( compare === void 0 ) compare = function (a, b) {
            return a < b ? -1 : a > b ? 1 : 0;
        };
    
        this.data = data;
        this.length = this.data.length;
        this.compare = compare;
    
        if (this.length > 0) {
            for (var i = (this.length >> 1) - 1; i >= 0; i--) { this._down(i); }
        }
    
        this.push = function push (item) {
            this.data.push(item);
            this.length++;
            this._up(this.length - 1);
        };
        
        this.pop = function pop () {
            if (this.length === 0) { return undefined; }
        
            var top = this.data[0];
            var bottom = this.data.pop();
            this.length--;
        
            if (this.length > 0) {
                this.data[0] = bottom;
                this._down(0);
            }
        
            return top;
        };
        
        this.peek = function peek () {
            return this.data[0];
        };
        
        this._up = function _up (pos) {
            var ref = this;
                var data = ref.data;
                var compare = ref.compare;
            var item = data[pos];
        
            while (pos > 0) {
                var parent = (pos - 1) >> 1;
                var current = data[parent];
                if (compare(item, current) >= 0) { break; }
                data[pos] = current;
                pos = parent;
            }
        
            data[pos] = item;
        };
        
        this._down = function _down (pos) {
            var ref = this;
                var data = ref.data;
                var compare = ref.compare;
            var halfLength = this.length >> 1;
            var item = data[pos];
        
            while (pos < halfLength) {
                var left = (pos << 1) + 1;
                var best = data[left];
                var right = left + 1;
        
                if (right < this.length && compare(data[right], best) < 0) {
                    left = right;
                    best = data[right];
                }
                if (compare(best, item) >= 0) { break; }
        
                data[pos] = best;
                pos = left;
            }
        
            data[pos] = item;
        };
    };

    function findNextEnd(prev, v, vertices, ends, vertexCoords, edgeData, trackIncoming, options) {
        var weight = vertices[prev][v],
            reverseWeight = vertices[v][prev],
            coordinates = [],
            path = [],
            reducedEdge = options.edgeDataSeed;
            
        if (options.edgeDataReduceFn) {
            reducedEdge = options.edgeDataReduceFn(reducedEdge, edgeData[v][prev]);
        }
    
        while (!ends[v]) {
            var edges = vertices[v];
    
            if (!edges) { break; }
    
            var next = Object.keys(edges).filter(function notPrevious(k) { return k !== prev; })[0];
            weight += edges[next];
    
            if (trackIncoming) {
                reverseWeight += vertices[next][v];
    
                if (path.indexOf(v) >= 0) {
                    ends[v] = vertices[v];
                    break;
                }
                path.push(v);
            }
    
            if (options.edgeDataReduceFn) {
                reducedEdge = options.edgeDataReduceFn(reducedEdge, edgeData[v][next]);
            }
    
            coordinates.push(vertexCoords[v]);
            prev = v;
            v = next;
        }
    
        return {
            vertex: v,
            weight: weight,
            reverseWeight: reverseWeight,
            coordinates: coordinates,
            reducedEdge: reducedEdge
        };
    };
    
    function compactNode(k, vertices, ends, vertexCoords, edgeData, trackIncoming, options) {
        options = options || {};
        var neighbors = vertices[k];
        return Object.keys(neighbors).reduce(function compactEdge(result, j) {
            var neighbor = findNextEnd(k, j, vertices, ends, vertexCoords, edgeData, trackIncoming, options);
            var weight = neighbor.weight;
            var reverseWeight = neighbor.reverseWeight;
            if (neighbor.vertex !== k) {
                if (!result.edges[neighbor.vertex] || result.edges[neighbor.vertex] > weight) {
                    result.edges[neighbor.vertex] = weight;
                    result.coordinates[neighbor.vertex] = [vertexCoords[k]].concat(neighbor.coordinates);
                    result.reducedEdges[neighbor.vertex] = neighbor.reducedEdge;
                }
                if (trackIncoming && 
                    !isNaN(reverseWeight) && (!result.incomingEdges[neighbor.vertex] || result.incomingEdges[neighbor.vertex] > reverseWeight)) {
                    result.incomingEdges[neighbor.vertex] = reverseWeight;
                    var coordinates = [vertexCoords[k]].concat(neighbor.coordinates);
                    coordinates.reverse();
                    result.incomingCoordinates[neighbor.vertex] = coordinates;
                }
            }
            return result;
        }, {edges: {}, incomingEdges: {}, coordinates: {}, incomingCoordinates: {}, reducedEdges: {}});
    };
    
    function compactGraph(vertices, vertexCoords, edgeData, options) {
        options = options || {};
        var progress = options.progress;
        var ends = Object.keys(vertices).reduce(function findEnds(es, k, i, vs) {
            var vertex = vertices[k];
            var edges = Object.keys(vertex);
            var numberEdges = edges.length;
            var remove;
    
            if(options.compact === false)  {
                remove = false;
            } else if (numberEdges === 1) {
                var other = vertices[edges[0]];
                remove = !other[k];
            } else if (numberEdges === 2) {
                remove = edges.filter(function(n) {
                    return vertices[n][k];
                }).length === numberEdges;
            } else {
                remove = false;
            }
            
            if (!remove) {
                es[k] = vertex;
            }
    
            if (i % 1000 === 0 && progress) {
                progress('compact:ends', i, vs.length);
            }
    
            return es;
        }, {});
    
        return Object.keys(ends).reduce(function compactEnd(result, k, i, es) {
            var compacted = compactNode(k, vertices, ends, vertexCoords, edgeData, false, options);
            result.graph[k] = compacted.edges;
            result.coordinates[k] = compacted.coordinates;
    
            if (options.edgeDataReduceFn) {
                result.reducedEdges[k] = compacted.reducedEdges;
            }
    
            if (i % 1000 === 0 && progress) {
                progress('compact:nodes', i, es.length);
            }
    
            return result;
        }, {graph: {}, coordinates: {}, reducedEdges: {}});
    };
    
    function findPath(graph, start, end) {
        var costs = {};
        costs[start] = 0;
        var initialState = [0, [start], start];
        var queue = new TinyQueue([initialState], function(a, b) { return a[0] - b[0]; });
        var explored = {};
    
        while (queue.length) {
            var state = queue.pop();
            var cost = state[0];
            var node = state[2];
            if (node === end) {
                return state.slice(0, 2);
            }
    
            var neighbours = graph[node];
            Object.keys(neighbours).forEach(function(n) {
                var newCost = cost + neighbours[n];
                if (!(n in costs) || newCost < costs[n]) {
                    costs[n] = newCost;
                    var newState = [newCost, state[1].concat([n]), n];
                    queue.push(newState);
                }
            });
        }
    
        return null;
    };
    
    function preprocess(graph, options) {
        options = options || {};

        var topo;

        var weightFn = options.weightFn || function defaultWeightFn(a, b) {
            return turf.distance(turf.point(a), turf.point(b));
        }
    
        if (graph.type === 'FeatureCollection') {
            // Graph is GeoJSON data, create a topology from it
            topo = topology(graph, options);
        } else if (graph.edges) {
            // Graph is a preprocessed topology
            topo = graph;
        }
    
        var graph = topo.edges.reduce(function buildGraph(g, edge, i, es) {
            var a = edge[0],
                b = edge[1],
                props = edge[2],
                w = weightFn(topo.vertices[a], topo.vertices[b], props),
                makeEdgeList = function makeEdgeList(node) {
                    if (!g.vertices[node]) {
                        g.vertices[node] = {};
                        if (options.edgeDataReduceFn) {
                            g.edgeData[node] = {};
                        }
                    }
                },
                concatEdge = function concatEdge(startNode, endNode, weight) {
                    var v = g.vertices[startNode];
                    v[endNode] = weight;
                    if (options.edgeDataReduceFn) {
                        g.edgeData[startNode][endNode] = options.edgeDataReduceFn(options.edgeDataSeed, props);
                    }
                };
    
            if (w) {
                makeEdgeList(a);
                makeEdgeList(b);
                if (w instanceof Object) {
                    if (w.forward) {
                        concatEdge(a, b, w.forward);
                    }
                    if (w.backward) {
                        concatEdge(b, a, w.backward);
                    }
                } else {
                    concatEdge(a, b, w);
                    concatEdge(b, a, w);
                }
            }
    
            if (i % 1000 === 0 && options.progress) {
                options.progress('edgeweights', i,es.length);
            }
    
            return g;
        }, {edgeData: {}, vertices: {}});
    
        var compact = compactGraph(graph.vertices, topo.vertices, graph.edgeData, options);
    
        return {
            vertices: graph.vertices,
            edgeData: graph.edgeData,
            sourceVertices: topo.vertices,
            compactedVertices: compact.graph,
            compactedCoordinates: compact.coordinates,
            compactedEdges: options.edgeDataReduceFn ? compact.reducedEdges : null
        };
    };
    
    function roundCoord(c, precision) {
        return [
            Math.round(c[0] / precision) * precision,
            Math.round(c[1] / precision) * precision,
        ];
    };
    
    function geoJsonReduce(geojson, fn, seed) {
        if (geojson.type === 'FeatureCollection') {
            return geojson.features.reduce(function reduceFeatures(a, f) {
                return geoJsonReduce(f, fn, a);
            }, seed);
        } else {
            return fn(seed, geojson);
        }
    };
    
    function geoJsonFilterFeatures(geojson, fn) {
        var features = [];
        if (geojson.type === 'FeatureCollection') {
            features = features.concat(geojson.features.filter(fn));
        }
    
        return {
            type: 'FeatureCollection',
            features: features
        };
    };
    
    function isLineString(f) {
        return f.geometry.type === 'LineString';
    };
    
    function topology(geojson, options) {
        options = options || {};
        var keyFn = options.keyFn || function defaultKeyFn(c) {
                return c.join(',');
            },
            precision = options.precision || 1e-5;
    
        var lineStrings = geoJsonFilterFeatures(geojson, isLineString);
        var explodedLineStrings = turf.explode(lineStrings);
        var vertices = explodedLineStrings.features.reduce(function buildTopologyVertices(cs, f, i, fs) {
                var rc = roundCoord(f.geometry.coordinates, precision);
                cs[keyFn(rc)] = f.geometry.coordinates;
    
                if (i % 1000 === 0 && options.progress) {
                    options.progress('topo:vertices', i, fs.length);
                }
    
                return cs;
            }, {}),
            edges = geoJsonReduce(lineStrings, function buildTopologyEdges(es, f, i, fs) {
                f.geometry.coordinates.forEach(function buildLineStringEdges(c, i, cs) {
                    if (i > 0) {
                        var k1 = keyFn(roundCoord(cs[i - 1], precision)),
                            k2 = keyFn(roundCoord(c, precision));
                        es.push([k1, k2, f.properties]);
                    }
                });
    
                if (i % 1000 === 0 && options.progress) {
                    options.progress('topo:edges', i, fs.length);
                }
    
                return es;
            }, []);
        return {
            vertices: vertices,
            edges: edges
        };
    };

    function validatePath(fromPoint, toPoint, path) {
        if (toPoint && toPoint.type === 'linepoint') return false;
        //if (precision > 0.0005) return false;
        if (!path || !path.path || !path.path.length || path.path.length < 2) return false;
        return path;

        precision = Number((Number(precision) + 0.000002).toFixed(7));
        var pathfinder = new PathFinder(features, { precision: precision });
        var newPath = pathfinder.findPath(fromPoint, toPoint);
        return validatePath(fromPoint, toPoint, features, newPath);
    };
};



/***/ }),

/***/ "./src/action/Snapping.js":
/*!********************************!*\
  !*** ./src/action/Snapping.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Snapping)
/* harmony export */ });
/**
 * @mixin
 * @memberof module:geoflo
 * @name Snapping
 * @description A class that handles snapping functionality in a mapping context. Only enabled when the currentMode is set to 'draw'.
 * @param {Object} ctx - The GeoFlo context object
 * @param {Object} mode - The currentMode
 */
const Snapping = function (ctx, mode) {
    this.type = mode.type;

	/**
	 * @function
     * @memberof module:geoflo.Snapping
	 * @name activate
	 * @description This function enables the object and sets the snapping option to true.
	 */
    this.activate = function () {
        this.enabled = true;
        ctx.options['snapping'].enable = true;
    }

	/**
	 * @function
     * @memberof module:geoflo.Snapping
	 * @name deactivate
	 * @description This function sets the 'enabled' property to false, disables snapping, and updates the mesh data.
	 * @returns {void}
	 */
    this.deactivate = function () {
        this.enabled = false;
        ctx.options['snapping'].enable = false;
        ctx.updateMeshData([], true);
    }


	/**
	 * @function
     * @memberof module:geoflo.Snapping
	 * @name getClosest
	 * @description Finds the closest point to the given coordinates within a specified radius or pixel distance.
	 * @param {Array<number>} coords - The coordinates [longitude, latitude] to find the closest point to.
	 * @param {Array<Object>} features - An array of features to search for the closest point within.
	 * @returns {Object} An object containing the closest point and its coordinates.
	 */
    this.getClosest = function (coords, features) {
        var calculatedRadius = ctx.options.snapping.distance * Math.pow(2, Math.max(1, 19 - ctx.map.getZoom()));
        var radiusInKm = calculatedRadius / 100000;
        var pixelDistance = ctx.options.snapping.pixels ? ctx.options.snapping.pixels * metersPerPixel(coords[1], ctx.map.getZoom()) : false;
        
        features = features ? ctx.getRenderedSnapFeatures({ lng: coords[0], lat: coords[1] }, radiusInKm) : [ctx.hotFeature];

        var closestPoint = findClosestPoint(features, coords, radiusInKm, pixelDistance);

        var coords = !closestPoint ? false :
            pixelDistance ? closestPoint.coords :
            closestPoint.type === 'vertex' && closestPoint.dist <= radiusInKm ? closestPoint.coords :
            false;
        
        return {
            point: closestPoint,
            coords: coords
        };
    }

	/**
	 * @function
     * @memberof module:geoflo.Snapping
	 * @name setClosest
	 * @description This function calculates the closest feature to the given coordinates within a specified radius and snapping parameters. It determines if the closest feature is a point or a vertex and returns the snapped feature accordingly.
	 * @param {Array<number>} coords - The coordinates [longitude, latitude] to find the closest feature to.
	 * @param {boolean} isPoint - Indicates if the feature is a point.
	 * @param {boolean} isVertex - Indicates if the feature is a vertex.
	 * @returns {Object} The snapped feature based on the calculated closest point or line.
	 */
    this.setClosest = function (coords, isPoint, isVertex) {
        var snapFeature = null;
        var calculatedRadius = ctx.options.snapping.distance * Math.pow(2, Math.max(1, 19 - ctx.map.getZoom()));
        var radiusInKm = calculatedRadius / 100000;
        var pixelDistance = ctx.options.snapping.pixels ? ctx.options.snapping.pixels * metersPerPixel(coords[1], ctx.map.getZoom()) : false;
        var filter = ctx.pinableFeatures && ctx.pinableFeatures.length ? ['case', ['any', ...ctx.pinableFeatures.map(e => ["==", ["get", "id"], e.id || e.properties.id])], false, true] : false;
        var nearFeatures = ctx.getRenderedFeatures({ lng: coords[0], lat: coords[1] }, radiusInKm, filter);
        var closestPoint = nearFeatures && nearFeatures.length ? findClosestPoint(nearFeatures, coords, radiusInKm, pixelDistance) : false;
        var lastClickDistance, lastClickArray, lastClickEqual;

        ctx.closestPoint = closestPoint;

        if ((!nearFeatures && !isPoint) || (!closestPoint && !isPoint)) return this.updateFeature(coords);
        if (!closestPoint || !closestPoint.coords) return snapFeature;

        if (isVertex || !ctx.lastClick) {
            snapFeature = turf.point(closestPoint.coords);
        } else {
            lastClickArray = Array.isArray(ctx.lastClick.coords) && Array.isArray(ctx.lastClick.coords[0]);
            if (lastClickArray) ctx.lastClick.coords = ctx.lastClick.coords[0];

            lastClickDistance = turf.distance(turf.point(coords), turf.point(ctx.lastClick.coords));
            lastClickEqual = ctx.Utilities.isPointEqual(ctx.lastClick.coords, closestPoint.coords);

            if (lastClickEqual && lastClickDistance > ctx.options.snapping.tolerance) return this.updateFeature(coords);

            snapFeature = turf.lineString([ctx.lastClick.coords, closestPoint.coords]);
        }

        ctx.fire('snapping.add', { closest: closestPoint, snapped: snapFeature });
        return snapFeature;
    }


	/**
	 * @function
     * @memberof module:geoflo.Snapping
	 * @name setFeature
	 * @description This function sets a feature on the map using the provided feature and coordinates. It handles different scenarios such as creating a point, line, or polygon feature based on the input parameters.
	 * @param {Object} feature - The feature to be set on the map.
	 * @param {Array} coords - The coordinates for the feature.
	 * @returns {Object} The feature that was set on the map.
	 */
    this.setFeature = function (feature, coords) {
        if (ctx.touchClick) return null;

        feature = feature || ctx.snapFeature;
        
        if (!feature && coords) return setFeature(turf.point(coords));
        if (!feature) return ctx.map.getSource(ctx.statics.constants.sources.SNAP).setData(turf.featureCollection([])), null;

        var snapCoords = feature.geometry.coordinates;
        var lastClick = coords || ctx.lastClick.coords;
        var firstClick = ctx.firstClick.coords;
        var isPolygon = this.type === 'Polygon';
        var isPolyline = feature.geometry.type === "LineString";

        if (!isPolyline || snapCoords.length < 2) {
            feature = setFeature(isPolygon ? turf.lineString([firstClick, lastClick]) : turf.point(lastClick));
        } else if (ctx.hotFeature) {
            var hotCoords = ctx.hotFeature.geometry.coordinates;
            if (isPolygon) snapCoords.pop();
            hotCoords.splice.apply(hotCoords, [-1, 1].concat(ctx.Utilities.consumableArray(snapCoords)));
        } else {
            ctx.hotFeature = turf.lineString(snapCoords);
        }

        ctx.Utilities.setProperty(ctx.hotFeature, 'type', this.type);
        ctx.Utilities.setProperty(ctx.hotFeature, 'style', { primaryColor: ctx.options.colors.primaryHot, secondaryColor: ctx.options.colors.secondaryHot });

        feature = setFeature(isPolygon ? turf.lineString([firstClick, lastClick]) : turf.point(lastClick));
        ctx.snapFeature = feature;
        return ctx.snapFeature;
    }

	/**
	 * @function
     * @memberof module:geoflo.Snapping
	 * @name setVertex
	 * @description This function determines the vertex based on snapping and routing settings. It sets the closest feature when snapping is enabled and calculates the route if routing is enabled. It updates the map sources accordingly and triggers events related to vertex dragging and snapping.
	 * @param {Object} ctx - The context object containing various settings and data.
	 * @returns {boolean} Returns false if snapping is disabled or no snapped vertex is available.
	 */
    this.setVertex = function () {
        var snapToFeature = ctx.Snapping.enabled;
        if (ctx.bypassSnapping) snapToFeature = false;

        var calculateRoute = ctx.Routing.enabled;
        if (ctx.bypassRouting) calculateRoute = false;

        if (!snapToFeature || !ctx.snappedVertex) return false;

        ctx.snapFeature = this.setClosest(ctx.snappedVertex, true, true);

        if (calculateRoute) ctx.snapFeature = ctx.Routing.getClosest() || ctx.snapFeature;
        if (!ctx.snapFeature) return ctx.map.getSource(ctx.statics.constants.sources.SNAP).setData(turf.featureCollection([]));

        ctx.Utilities.setProperty(ctx.snapFeature, 'type', ctx.currentMode.type);
        ctx.map.getSource(ctx.statics.constants.sources[calculateRoute ? 'ROUTE' : 'SNAP']).setData(turf.featureCollection([ctx.snapFeature]));

        ctx.hotFeature.geometry.coordinates[ctx.dragIndex] = ctx.snapFeature.geometry.coordinates;
        ctx.map.getSource(ctx.statics.constants.sources.HOT).setData(turf.featureCollection([ctx.hotFeature]));
        ctx.fire('vertex.dragsnap', { feature: ctx.hotFeature, vertex: turf.point(ctx.snappedVertex) });
    }


	/**
	 * @function
     * @memberof module:geoflo.Snapping
	 * @name addFeature
	 * @description This function adds a feature to the map by setting the data of the specified source with the provided feature. It also updates the properties of the feature if properties are provided.
	 * @param {Object} feature - The feature to be added to the map.
	 * @param {Object} [properties={}] - Additional properties to be assigned to the feature.
	 * @param {boolean} [dontAdd] - Flag to prevent adding the feature if set to true.
	 * @returns {boolean} Returns false if the feature is not provided or if dontAdd flag is set.
	 */
    this.addFeature = function (feature, properties={}, dontAdd) {
        ctx.map.getSource(ctx.statics.constants.sources['SNAP']).setData(turf.featureCollection([]));
        ctx.map.getSource(ctx.statics.constants.sources['ROUTE']).setData(turf.featureCollection([]));
        if (!feature || dontAdd) return false;
        if (properties) feature.properties = ctx.Utilities.assignDeep(ctx.Utilities.cloneDeep(properties), feature.properties);
        ctx.snapFeature = feature;
        ctx.map.getSource(ctx.statics.constants.sources[feature.properties.routing ? 'ROUTE' : 'SNAP']).setData(turf.featureCollection([ctx.snapFeature]));
    }

	/**
	 * @function
     * @memberof module:geoflo.Snapping
	 * @name updateFeature
	 * @description This function updates a feature based on the event coordinates provided. It determines the type of feature, calculates the necessary coordinates, creates a line feature with hint properties, and converts units if needed.
	 * @param {Array} evtCoords - The event coordinates to update the feature.
	 * @returns {Object} The updated feature based on the event coordinates.
	 */
    this.updateFeature = function (evtCoords) {
        ctx.closestPoint = null;
        if (!ctx.lastClick) return null;
        if (!ctx.firstClick || ctx.mouseIsDown) return null;
    
        var type = ctx.Features.getType(ctx.hotFeature) || ctx.currentMode.type;
        var coords = ctx.hotFeature ? ctx.Utilities.getLastIndexCoords(ctx.hotFeature) : ctx.lastClick.coords;
        var vertex = turf.point(evtCoords);
        var hintCoords = type && type === "Polygon" && ctx.hotFeature ? [coords, evtCoords, ctx.firstClick.coords] : [coords, evtCoords];
        var feature = turf.lineString(hintCoords);

        feature.properties.type = type;
        feature.properties.hint = true;
        feature.properties.style = {
            primaryColor: ctx.options.colors.primarySnap,
            secondaryColor: ctx.options.colors.secondarySnap
        }
        
        var unit = 'feet';
        var units = ctx.Features.getUnits(feature);

        units = ctx.Features.convertUnits(feature, units, unit);
        vertex = updateVertex(vertex, { units: units, unit: unit });
        return feature;
    }




    if (ctx.options['snapping'].enable) this.activate();




    function cheapRuler (lat, units) {
        function cheapruler(lat, units) {
            return new CheapRuler(lat,units);
        }
        
        cheapruler.fromTile = function(y, z, units) {
            var n = Math.PI * (1 - 2 * (y + 0.5) / Math.pow(2, z));
            var lat = Math.atan(0.5 * (Math.exp(n) - Math.exp(-n))) * 180 / Math.PI;
            return new CheapRuler(lat,units);
        };
        
        cheapruler.units = {
            kilometers: 1,
            miles: 1000 / 1609.344,
            nauticalmiles: 1000 / 1852,
            meters: 1000,
            metres: 1000,
            yards: 1000 / 0.9144,
            feet: 1000 / 0.3048,
            inches: 1000 / 0.0254
        };
        
        function CheapRuler(lat, units) {
            var factors = {
                kilometers: 1,
                miles: 1000 / 1609.344,
                nauticalmiles: 1000 / 1852,
                meters: 1000,
                metres: 1000,
                yards: 1000 / 0.9144,
                feet: 1000 / 0.3048,
                inches: 1000 / 0.0254
            }
        
            if (lat === undefined)
                throw new Error('No latitude given.');
            if (units && !factors[units])
                throw new Error('Unknown unit ' + units + '. Use one of: ' + Object.keys(factors));
        
            var m = units ? factors[units] : 1;
        
            var cos = Math.cos(lat * Math.PI / 180);
            var cos2 = 2 * cos * cos - 1;
            var cos3 = 2 * cos * cos2 - cos;
            var cos4 = 2 * cos * cos3 - cos2;
            var cos5 = 2 * cos * cos4 - cos3;
        
            this.kx = m * (111.41513 * cos - 0.09455 * cos3 + 0.00012 * cos5);
            this.ky = m * (111.13209 - 0.56605 * cos2 + 0.0012 * cos4);
        }
        
        CheapRuler.prototype = {
            equals: function (a, b) {
                return a[0] === b[0] && a[1] === b[1];
            },
      
            interpolate: function (a, b, t) {
                var dx = b[0] - a[0];
                var dy = b[1] - a[1];
                return [a[0] + dx * t, a[1] + dy * t];
            },
      
            distance: function(a, b) {
                var dx = (a[0] - b[0]) * this.kx;
                var dy = (a[1] - b[1]) * this.ky;
                return Math.sqrt(dx * dx + dy * dy);
            },
        
            bearing: function(a, b) {
                var dx = (b[0] - a[0]) * this.kx;
                var dy = (b[1] - a[1]) * this.ky;
                if (!dx && !dy)
                    return 0;
                var bearing = Math.atan2(-dy, dx) * 180 / Math.PI + 90;
                if (bearing > 180)
                    bearing -= 360;
                return bearing;
            },
        
            destination: function(p, dist, bearing) {
                var a = (90 - bearing) * Math.PI / 180;
                return this.offset(p, Math.cos(a) * dist, Math.sin(a) * dist);
            },
        
            offset: function(p, dx, dy) {
                return [p[0] + dx / this.kx, p[1] + dy / this.ky];
            },
        
            lineDistance: function(points) {
                var total = 0;
                for (var i = 0; i < points.length - 1; i++) {
                    total += this.distance(points[i], points[i + 1]);
                }
                return total;
            },
        
            area: function(polygon) {
                var sum = 0;
        
                for (var i = 0; i < polygon.length; i++) {
                    var ring = polygon[i];
        
                    for (var j = 0, len = ring.length, k = len - 1; j < len; k = j++) {
                        sum += (ring[j][0] - ring[k][0]) * (ring[j][1] + ring[k][1]) * (i ? -1 : 1);
                    }
                }
        
                return (Math.abs(sum) / 2) * this.kx * this.ky;
            },
        
            along: function(line, dist) {
                var sum = 0;
        
                if (dist <= 0)
                    return line[0];
        
                for (var i = 0; i < line.length - 1; i++) {
                    var p0 = line[i];
                    var p1 = line[i + 1];
                    var d = this.distance(p0, p1);
                    sum += d;
                    if (sum > dist)
                        return this.interpolate(p0, p1, (dist - (sum - d)) / d);
                }
        
                return line[line.length - 1];
            },
        
            pointOnLine: function(line, p) {
                var minDist = Infinity;
                var minX, minY, minI, minT;
        
                for (var i = 0; i < line.length - 1; i++) {
        
                    var x = line[i][0];
                    var y = line[i][1];
                    var dx = (line[i + 1][0] - x) * this.kx;
                    var dy = (line[i + 1][1] - y) * this.ky;
        
                    if (dx !== 0 || dy !== 0) {
        
                        var t = ((p[0] - x) * this.kx * dx + (p[1] - y) * this.ky * dy) / (dx * dx + dy * dy);
        
                        if (t > 1) {
                            x = line[i + 1][0];
                            y = line[i + 1][1];
        
                        } else if (t > 0) {
                            x += (dx / this.kx) * t;
                            y += (dy / this.ky) * t;
                        }
                    }
        
                    dx = (p[0] - x) * this.kx;
                    dy = (p[1] - y) * this.ky;
        
                    var sqDist = dx * dx + dy * dy;
                    if (sqDist < minDist) {
                        minDist = sqDist;
                        minX = x;
                        minY = y;
                        minI = i;
                        minT = t;
                    }
                }
        
                return {
                    point: [minX, minY],
                    index: minI,
                    t: minT
                };
            },
        
            lineSlice: function(start, stop, line) {
                var p1 = this.pointOnLine(line, start);
                var p2 = this.pointOnLine(line, stop);
        
                if (p1.index > p2.index || (p1.index === p2.index && p1.t > p2.t)) {
                    var tmp = p1;
                    p1 = p2;
                    p2 = tmp;
                }
        
                var slice = [p1.point];
        
                var l = p1.index + 1;
                var r = p2.index;
        
                if (!this.equals(line[l], slice[0]) && l <= r)
                    slice.push(line[l]);
        
                for (var i = l + 1; i <= r; i++) {
                    slice.push(line[i]);
                }
        
                if (!this.equals(line[r], p2.point))
                    slice.push(p2.point);
        
                return slice;
            },
        
            lineSliceAlong: function(start, stop, line) {
                var sum = 0;
                var slice = [];
        
                for (var i = 0; i < line.length - 1; i++) {
                    var p0 = line[i];
                    var p1 = line[i + 1];
                    var d = this.distance(p0, p1);
        
                    sum += d;
        
                    if (sum > start && slice.length === 0) {
                        slice.push(this.interpolate(p0, p1, (start - (sum - d)) / d));
                    }
        
                    if (sum >= stop) {
                        slice.push(this.interpolate(p0, p1, (stop - (sum - d)) / d));
                        return slice;
                    }
        
                    if (sum > start)
                        slice.push(p1);
                }
        
                return slice;
            },
        
            bufferPoint: function(p, buffer) {
                var v = buffer / this.ky;
                var h = buffer / this.kx;
                return [p[0] - h, p[1] - v, p[0] + h, p[1] + v];
            },
        
            bufferBBox: function(bbox, buffer) {
                var v = buffer / this.ky;
                var h = buffer / this.kx;
                return [bbox[0] - h, bbox[1] - v, bbox[2] + h, bbox[3] + v];
            },
        
            insideBBox: function(p, bbox) {
                return p[0] >= bbox[0] && p[0] <= bbox[2] && p[1] >= bbox[1] && p[1] <= bbox[3];
            }
        }
      
        return cheapruler(lat, units);
    }

    function findClosestPoint (uniqueFeatures, evtCoords, radiusInKm, pixelDistance) {
        const coords = calculatePointsOnLine(uniqueFeatures, evtCoords);
  
        let closestVertex = null;
        let closestLinepoint = null;
        let borders;
        let id = ctx.id || 'id';
  
        coords.forEach((pointType) => {
            const dist = pointType.dist;
  
            if (dist !== null) {
                if (pointType.type === "vertex") {
                    if (closestVertex === null) {
                        closestVertex = pointType;
                    } else if (pixelDistance !== undefined) {
                        if (dist * 1000 < pixelDistance) {
                            if (closestVertex && closestVertex.lineEdge) {
                                closestVertex = pointType;
                            }
                        }
                    } else if (dist <= closestVertex.dist) {
                        if (dist === closestVertex.dist) {
                            if (closestVertex.lineEdge) {
                                closestVertex = pointType;
                            }
                        } else {
                            closestVertex = pointType;
                        }
                    }
                } else if (dist < radiusInKm) {
                    if (closestLinepoint !== null && dist === closestLinepoint.dist && closestLinepoint[id] !== pointType[id]) {
                        if (closestLinepoint.type === "linepoint") {
                            if ((pointType.distance1 <= closestLinepoint.distance1 && pointType.distance2 <= closestLinepoint.distance2) ||
                                (pointType.distance2 <= closestLinepoint.distance1 && pointType.distance1 <= closestLinepoint.distance2)) {
                                console.log("switch closest points");
                                closestLinepoint = pointType;
                            }
                        }
                    }
  
                    if (closestLinepoint === null || dist < closestLinepoint.dist) {
                        closestLinepoint = pointType;
  
                        if (pointType.border1 && pointType.border2) {
                            borders = {
                                border1: pointType.border1,
                                border2: pointType.border2,
                                distance1: pointType.distance1,
                                distance2: pointType.distance2
                            };
                        } else {
                            borders = null;
                        }
                    }
                }
            }
        });
  
        if (closestVertex !== null) {
            if (closestLinepoint !== null) {
                if (closestVertex.dist < radiusInKm) {
                    return Object.assign({ borders: null }, closestVertex);
                } else {
                    return Object.assign({ borders: borders }, closestLinepoint);
                }
            } else {
                return Object.assign({ borders: null }, closestVertex);
            }
        } else if (closestLinepoint !== null) {
            return Object.assign({ borders: borders }, closestLinepoint);
        } else {
            return null;
        }
    }

    function closestPoints (ruler, coordinates, evtCoords) {
        const result = [];
        const pointOnLine = ruler.pointOnLine(coordinates, evtCoords);
        const pointCoords = pointOnLine.point;
        const pointIndex = pointOnLine.index;
        const linePoint = { type: "linepoint", coords: pointCoords };
        const p1 = coordinates[pointIndex];
        const p2 = coordinates[pointIndex + 1];
        const distance1 = ruler.distance(p1, evtCoords);
        const distance2 = ruler.distance(p2, evtCoords);

        let lineEdge = false;
        let vertex = null;
    
        if (distance1 < distance2) {
            lineEdge = pointIndex === 0;
            vertex = p1;
        } else {
            lineEdge = pointIndex + 1 === coordinates.length - 1;
            vertex = p2;
        }
    
        linePoint.border1 = p1;
        linePoint.distance1 = distance1;
        linePoint.border2 = p2;
        linePoint.distance2 = distance2;
    
        result.push(linePoint);
        result.push({ type: "vertex", coords: vertex, lineEdge: lineEdge });
        return result;
    }

    function calculatePointsOnLine (uniqueFeatures, evtCoords) {
        const coords = [];
        const knownIds = {};
        const ruler = cheapRuler(evtCoords[1]);
    
        uniqueFeatures.forEach((feature) => {
            const id = feature.id || feature.properties.id;
            var closest = [];
    
            if (knownIds[id] === undefined) {
                knownIds[id] = true;
                const type = feature.geometry.type;
    
                if (type === "LineString") {
                    if (feature.geometry.coordinates) {
                        closest = closestPoints(ruler, feature.geometry.coordinates, evtCoords);
  
                        closest.forEach((pointType) => {
                            pointType.id = id;
                            pointType.dist = ruler.distance(pointType.coords, evtCoords);
                            coords.push(pointType);
                        });
                    } else {
                        console.log("no coordinates: ", feature);
                    }
                } else if (type === "Point") {
                    const pointType = { id: id, type: "vertex", coords: feature.geometry.coordinates, lineEdge: true };
                    pointType.dist = ruler.distance(pointType.coords, evtCoords);
                    coords.push(pointType);
                } else if (type === "Polygon") {
                    if (turf.booleanWithin(turf.point(evtCoords), feature)) return;
                    
                    feature.geometry.coordinates.forEach((featureCoords, index) => {
                        closest = closestPoints(ruler, featureCoords, evtCoords);
  
                        closest.forEach((pointType) => {
                            pointType.id = id;
                            pointType.polygonCoordsArray = index;
                            pointType.dist = ruler.distance(pointType.coords, evtCoords);
                            coords.push(pointType);
                        });
                    });
                }
            }
        });
    
        return coords;
    }

    function addVertex (startPoint, endPoint, length, data) {
        var startData = data[startPoint];
    
        if (!startData) {
            startData = {};
            data[startPoint] = startData;
        }
    
        if (!startData[endPoint]) {
            startData[endPoint] = length;
        }
    }

    function addVertexPointTwoWay (startCoord, endCoords, length, data) {
        var startPoint = startCoord.join("#");
        var endPoint = endCoords.join("#");
        addVertex(startPoint, endPoint, length, data);
        addVertex(endPoint, startPoint, length, data);
    }
    
    function metersPerPixel (latitude, zoomLevel) {
        return ((ctx.statics.constants.CIRCUM * Math.cos((latitude * (Math.PI / 180)))) / Math.pow(2, zoomLevel + 8));
    }
    
    function setFeature (feature) {
        if (!feature) return ctx.map.getSource(ctx.statics.constants.sources.SNAP).setData(turf.featureCollection([])), ctx.snapFeature;
        ctx.Utilities.setProperty(feature, 'type', ctx.currentMode.type);
        ctx.Utilities.setProperty(feature, 'style', { primaryColor: ctx.options.colors.primarySnap, secondaryColor: ctx.options.colors.secondarySnap });
        ctx.map.getSource(ctx.statics.constants.sources.SNAP).setData(turf.featureCollection([feature]));
        return feature;
    }

    function updateVertex (vertex, options={}) {
        var features = ctx.map.getSource(ctx.statics.constants.sources.HOTTEXT)._data.features;
        if (features.length && features[features.length - 1].properties.mouseLine) features.pop();

        vertex.properties.units = options.units;
        vertex.properties.unit = options.unit;
        vertex.properties.text = `${options.units} ${options.unit}`;
        vertex.properties.transform = 'uppercase';
        vertex.properties.anchor = 'bottom-left';
        vertex.properties.mouseLine = true;
    
        features.push(vertex);
        ctx.map.getSource(ctx.statics.constants.sources.HOTTEXT).setData(turf.featureCollection(features));
        return vertex;
    }
};



/***/ }),

/***/ "./src/map/Features.js":
/*!*****************************!*\
  !*** ./src/map/Features.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Features)
/* harmony export */ });
/**
 * @namespace
 * @memberof module:geoflo
 * @name Features
 * @description A class that handles features functionality in a mapping context.
 * @param {Object} ctx - The GeoFlo context object
 */
const Features = function (ctx) {
    if (!ctx.map) { throw new Error('No map object provided!') }

    const coldFeatures = [];
    this.offsetLines = //;

    
	/**
	 * @function
     * @memberof module:geoflo.Features
	 * @name getColdFeatures
	 * @description This function returns an array of cold features.
	 * @return {Array} An array of cold features.
	 */
    this.getColdFeatures = function () {
        return coldFeatures;
    };

	/**
	 * @function
     * @memberof module:geoflo.Features
	 * @name getFeatureById
	 * @description Retrieves a feature by its ID from a given source. If the ID is an array with multiple IDs, it retrieves multiple features. If the ID is an object, it tries to extract the ID from the object's parent, properties, or id fields.
	 * @param {string|number|Array} id - The ID or array of IDs of the feature(s) to retrieve.
	 * @returns {Object|Array} The feature or array of features corresponding to the provided ID(s).
	 */
    this.getFeatureById = function (id) {
        if (Array.isArray(id) && id.length > 1) return this.getFeaturesById(id);
        if (typeof id === 'object') id = id.parent || id.properties.parent || id.id || id.properties.id;
        return getFeatureById(id);
    };

	/**
	 * @function
     * @memberof module:geoflo.Features
	 * @name getFeaturesById
	 * @description Retrieves features by their IDs.
	 * @param {Array} ids - An array of feature IDs to retrieve.
	 * @returns {Array} - An array of features corresponding to the provided IDs.
	 */
    this.getFeaturesById = function (ids) {
        const addedIds = [];
        const result = [];

        ids.forEach((id) => {
            const feature = this.getFeatureById(id);
            if (feature && !addedIds.includes(id)) addedIds.push(id), result.push(feature);
        }, this);

        return result;
    };

	/**
	 * @function
     * @memberof module:geoflo.Features
	 * @name getType
	 * @description This function returns the type of the input feature.
	 * @param {any} feature - The feature whose type needs to be determined.
	 * @returns {string} The type of the input feature.
	 */
    this.getType = function (feature) {
        return getType(feature);
    }

	/**
	 * @function
     * @memberof module:geoflo.Features getUnit
	 * @name getUnit
	 * @description Retrieves the unit associated with a given feature type from the context options.
	 * @param {Object} feature - The feature object for which the unit needs to be retrieved.
	 * @returns {string|boolean} The unit associated with the feature type if found, otherwise false.
	 */
    this.getUnit = function (feature) {
        if (!feature) return false;

        var type = feature.properties.type;
        if (!type) return false;

        if (!ctx.options.units || !ctx.options.units[type]) return false;

        return ctx.options.units[type];
    };

	/**
	 * @function
     * @memberof module:geoflo.Features
	 * @name getUnits
	 * @param {Object} feature - The feature for which units need to be calculated.
	 * @returns {number} - The calculated units (length or area) of the feature.
	 */
    this.getUnits = function (feature) {
        var unit = this.getUnit(feature);
        if (!unit || !feature) return false;

        var units = 1;
        var type = feature.properties.type;

        if (type === "Polyline") {
            units = turf.length(feature, { units: 'meters' });
        } else if (type === 'Polygon') {
            units = turf.area(feature);
        } else if (type === 'Rectangle') {
            units = turf.area(feature);
        }

        return units;
    };



	/**
	 * @function
     * @memberof module:geoflo.Features
	 * @name setFeaturesState
	 * @description Sets the state of multiple features in a map.
	 * @param {Array} features - An array of features to set the state for.
	 * @param {boolean} state - The state to set for the features.
	 * @returns {Array} - The updated array of features with the new state.
	 */
    this.setFeaturesState = function (features=[], state) {
        if (!state || !features.length) return [];
        
        features.forEach(function(feature) {
            var id = feature.id || feature.properties.id;
            if (ctx.hotFeature && ctx.hotFeature.id === id) return;
            this.setFeatureState(id, state);
        }, this)

        return features;
    };

	/**
	 * @function
     * @memberof module:geoflo.Features
	 * @name setFeatureState
	 * @description This function sets the state of a feature and its children in the map by updating their feature state.
	 * @param {string} id - The ID of the parent feature.
	 * @param {object} state - The state object to set for the features.
	 * @returns {array} - An array of features whose state was updated.
	 */
    this.setFeatureState = function (id, state) {
        if (!state || !id) return false;

        var features = getFeaturesByParent(id);
        
        features.forEach(function(feature) {
            var id = feature.id || feature.properties.id;
            ctx.map.setFeatureState({ source: feature.source, id: id }, state);
        })

        return features;
    };

	/**
	 * @function
     * @memberof module:geoflo.Features
	 * @name setText
	 * @description Sets text features on the map based on the provided features.
	 * @param {Object} features - The features to set text on.
	 * @returns {boolean} Returns false if no features are provided or if the features array is empty.
	 */
    this.setText = function (features) {
        var source = ctx.statics.constants.sources.HOTTEXT;

        this.textFeatures = [];

        ctx.map.getSource(source).setData(turf.featureCollection(this.textFeatures));

        if (!features) return false;
        if (features.features) features = features.features;
        if (!Array.isArray(features)) features = [features];
        if (!features.length) return false;

        features.forEach(function (feature) {
            var type = feature.properties.type;
            if (!type) return;

            this.currentType = type;
            if (type === 'Polyline' && ctx.Utilities.isValidLineString(feature)) turf.segmentEach(feature, setLineText.bind(this));
        }, this)
        
        ctx.map.getSource(source).setData(turf.featureCollection(this.textFeatures));

        delete this.textFeatures;
        delete this.currentType;
    }



	/**
	 * @function
     * @memberof module:geoflo.Features
	 * @name addFeature
	 * @description This function adds a feature to the map with the given properties. It cleans the coordinates, truncates them, assigns deep properties, sets the source, and removes unnecessary properties before adding the feature to the map.
	 * @param {Object} feature - The feature object to be added to the map.
	 * @param {Object} [properties={}] - Additional properties to be assigned to the feature.
	 * @returns {Object} The feature object that was added to the map.
	 */
    this.addFeature = function (feature, properties={}) {
        if (!feature || !feature.properties) return false;
        
        feature = turf.cleanCoords(feature);
        feature = turf.truncate(feature, { precision: 6, coordinates: 3, mutate: true });

        feature.properties = ctx.Utilities.assignDeep(properties, feature.properties);
        feature.source = feature.source || feature.properties.source || ctx.statics.constants.sources.COLD;
        
        delete feature.properties.source;
        delete feature.properties.painting;
        delete feature.properties.edit;
        delete feature.properties.new;
        delete feature.properties.selected;
        delete feature.properties.hidden;
        delete feature.properties.offset;
        
        feature.properties.style = feature.properties.style || {};

        this.addUnits(feature);
        this.addFeatures([feature]);
        return feature;
    };

	/**
	 * @function
     * @memberof module:geoflo.Features
	 * @name addFeatures
	 * @description This function takes an array of features and adds them to the map. It also updates the source if any changes are made.
	 * @param {Array} features - An array of features to be added to the map.
	 * @param {boolean} unselect - A flag indicating whether to unselect the features.
	 * @returns {Array} The array of features that were added to the map.
	 */
    this.addFeatures = function (features, unselect) {
        var update;
        var sources = [];

        features.forEach((feature) => {
            feature.id = feature.id || feature.properties.id || URL.createObjectURL(new Blob([])).slice(-36);
            feature.properties.id = feature.id;
            feature.properties.type = feature.properties.type || this.getType(feature);

            var index = coldFeatures.findIndex(function(f) { if (f.id === feature.id || f.properties.id === feature.id) return f; });

            if (index > -1) {
                this.setFeatureState(feature.id, { hidden: !unselect });
                coldFeatures[index] = feature;
                update = !unselect;
            } else {
                update = true;
                coldFeatures.push(feature);
            }

            if (update && !sources.includes(feature.source)) sources.push(feature.source);
        }, this);

        if (update) this.updateSource(sources);
        return features;
    };

	/**
	 * @function
     * @memberof module:geoflo.Features
	 * @name addUnits
	 * @description Adds units to a feature's geometry based on the specified conversion or default unit.
	 * @param {Object} feature - The feature object to which units will be added.
	 * @param {String} convertTo - The unit to which the feature's units will be converted. If not provided, the default unit will be used.
	 * @returns {Object} The feature object with added units.
	 */
    this.addUnits = function (feature, convertTo) {
        var unit = convertTo || this.getUnit(feature);
        if (!unit) return false;

        var units = this.convertUnits(feature, null, convertTo);

        feature.geometry.units = units;
        feature.geometry.unit = unit;
        return feature;
    };



	/**
	 * @function
     * @memberof module:geoflo.Features
	 * @name updateFeatures
	 * @description This function updates the coordinates of features in a map based on the provided coordinates. It iterates through the features array, retrieves the original feature by ID, and updates its geometry coordinates based on the feature type. It then adds units to the updated feature and updates the source of the map.
	 * @param {Array} features - An array of features to update.
	 * @param {Array} coords - The new coordinates to set for the features.
	 */
    this.updateFeatures = function(features, coords) {
        if (!coords) return false;

        var sources = [];

        features.forEach(function(feature) {
            var id = feature.id || feature.properties.id;
            if (!id) return false;

            var originalFeature = this.getFeatureById(id);
            if (!originalFeature || originalFeature === undefined) return false;
            if (!sources.includes(originalFeature.source)) sources.push(originalFeature.source);

            originalFeature.geometry.type === 'Point' ? originalFeature.geometry.coordinates = coords :
            originalFeature.geometry.type === 'Polygon' ? originalFeature.geometry.coordinates[0][feature.index] = coords :
            originalFeature.geometry.type === 'LineString' ? originalFeature.geometry.coordinates[feature.index] = coords :
            false;

            this.addUnits(originalFeature);
        }, this);

        this.updateSource(sources);
    };

	/**
	 * @function
     * @memberof module:geoflo.Features
	 * @name updateSource
	 * @description Updates the source of the current object with the provided sources.
	 * @param {Array} sources - An array of sources to update the current object with.
	 * @returns {any} The result of calling the updateSource function with the provided sources.
	 */
    this.updateSource = function (sources) {
        return updateSource.call(this, sources);
    };



	/**
	 * @function
     * @memberof module:geoflo.Features
	 * @name removeFeatures
	 * @description This function removes features from the map based on the provided ID or array of IDs. It updates the map source after removing the features.
	 * @param {string|string[]} id - The ID or array of IDs of the features to be removed.
	 * @param {boolean} remove - A flag indicating whether to remove the features or not.
	 * @returns {Object[]} An array containing the removed features.
	 */
    this.removeFeatures = function (id, remove) {
        const removedFeatures = [];

        var feature;
        var sources;

        if (Array.isArray(id) && remove) {
            sources = id.map(function(layer) { return layer.details ? layer.details.id : layer.id ? layer.id : layer });

            coldFeatures.forEach((feature) => {
                if (!sources.includes(feature.source)) return;
                var index = coldFeatures.findIndex((f) => { return feature.id === f.id || feature.properties.id === f.id });
                if (index > -1) removedFeatures.push(...coldFeatures.splice(index, 1));
            })

            this.updateSource(sources);
        } else {
            feature = remove ? coldFeatures.findIndex((feature) => { return feature.id === id || feature.properties.id === id }) :
            coldFeatures.find((feature) => { return feature.id === id || feature.properties.id === id });

            if (remove) {
                if (feature > -1) {
                    removedFeatures.push(...coldFeatures.splice(feature, 1));
                    sources = [removedFeatures[0].source];
                }
                
                this.updateSource(sources);
            } else {
                removedFeatures.push(feature);
                this.setFeatureState(id, { hidden: true });
            }
        }

        return removedFeatures;
    };

	/**
	 * @function
     * @memberof module:geoflo.Features
	 * @name deleteFeatures
	 * @description Deletes all features from the coldFeatures array and updates the source.
	 * @params {Array} coldFeatures - The array of features to be deleted.
	 * @returns {void}
	 */
    this.deleteFeatures = function () {
        coldFeatures.splice(0, coldFeatures.length);
        this.updateSource();
    };
    


	/**
	 * @function
     * @memberof module:geoflo.Features
	 * @name convertUnits
	 * @description Converts the given units of a feature to the specified target units based on the feature type (Polyline, Polygon, or Rectangle).
	 * @param {Object} feature - The feature object containing properties like type.
	 * @param {number} units - The units to be converted.
	 * @param {string} convertTo - The target units to convert to (optional).
	 * @returns {number} The converted units in the target unit format.
	 */
    this.convertUnits = function (feature, units, convertTo) {
        var type = feature.properties.type;
        var unit = convertTo || this.getUnit(feature);

        units = units || this.getUnits(feature);
        
        if (type === "Polyline") {
            units = Math.round(turf.convertLength(units, 'meters', unit));
        } else if (type === 'Polygon') {
            units = Math.round(turf.convertArea(units, 'meters', unit));
        } else if (type === 'Rectangle') {
            units = Math.round(turf.convertArea(units, 'meters', unit));
        }

        units = units ? Number(units.toFixed(2)) : 0;
        return units;
    };

    


    function getFeatureById(id) {
        var feature = coldFeatures.find((feature) => { return feature.id === id || feature.properties.id === id });
        feature = feature || ctx.getSelectedFeatures().find((feature) => { return feature.id === id || feature.properties.id === id });
        return feature;
    };

    function getFeaturesByParent (id) {
        var feature = typeof id === 'object' && id.id ? id : getFeatureById(id);
        if (!feature || !feature.source) return [];
        var field = ctx.options.offsetOverlappingLines ? 'parent' : 'id';
        var features = ctx.map.getSource(feature.source)._data.features.filter(function(f) { return f[field] === id || f.properties[field] === id });
        return features;
    };

    function createTextFeatures (feature) {
        var isLine = ctx.Utilities.isValidLineString(feature);
        var segments = [];

        if (isLine) {
            turf.segmentEach(feature, function (currentSegment) {
                var segment = ctx.Utilities.cloneDeep(currentSegment);
                var footage = Math.round(turf.length(segment, { units: 'miles' }) * 5280);
                var mileage = Number(turf.length(segment, { units: 'miles' }).toFixed(3));
                footage = Number(footage.toFixed(2));
                mileage = Number(mileage.toFixed(2));

                segment.properties.footage = footage;
                segment.properties.mileage = mileage;
                segment.properties.text = `${mileage} miles`;;
                segments.push(segment);
            });
        }

        return segments;
    };

    function updateSource (sources=[]) {
        var sourceFeatures = {};
        var unsourceFeatures = [];

        ctx.map.getSource(ctx.statics.constants.sources.COLDTEXT).setData(turf.featureCollection([]));
        ctx.map.getSource(ctx.statics.constants.sources.COLD).setData(turf.featureCollection([]));

        coldFeatures.forEach((feature) => {
            delete feature.properties.new;
            delete feature.properties.offset;

            var source = feature.source;
            if (sources.length && !sources.includes(source)) return;
            if (!source) return unsourceFeatures.push(feature);
            if (!sourceFeatures[source]) sourceFeatures[source] = [];
            sourceFeatures[source].push(feature);
        })


        Object.entries(sourceFeatures).forEach((entry) => {
            var source = entry[0];
            var features = entry[1];
            if (!ctx.map.getSource(source)) return unsourceFeatures.push(features);
            setLineOffset(features, source);
        })

        setLineOffset(unsourceFeatures.flat(), ctx.statics.constants.sources.COLD);
        setTimeout(() => { this.setFeaturesState(coldFeatures, { hidden: false }); }, 100);
        ctx.fire('features.update', { features: coldFeatures });
        sourceFeatures = null;
        unsourceFeatures = null;
        return coldFeatures;
    };

    function setLineText (segment) {
        segment = ctx.Utilities.cloneDeep(segment);
        segment.properties.type = this.currentType;
        
        var text = turf.point(segment.geometry.coordinates[1]);
        var units = this.getUnits(segment);
        var unit = 'feet';

        units = this.convertUnits(segment, units, unit);

        text.properties.units = units;
        text.properties.unit = unit;
        text.properties.text = `${units} ${unit}`;
        text.properties.transform = 'uppercase';
        text.properties.anchor = 'bottom-left';

        this.textFeatures.push(text);
        return text;
    }

    function setLineOffset (features, source) {
        if (!features || !features.length || !source) return false;
        if (!ctx.options.offsetOverlappingLines) return ctx.map.getSource(source).setData(turf.featureCollection(features));

        var mesh = new ctx.Mesh(features, true);
        var offset = mesh.getFeatures();

        offset.forEach(function (feature) {
            var f = features.find(function (fe) { return fe.id === feature.parent });
            if (!f) return;
            feature.source = source;
            feature.properties.style = f.properties.style || feature.properties.style;
            setOverlapOffset(offset, feature)
        });

        ctx.map.getSource(source).setData(turf.featureCollection(offset));
        ctx.fire('features.offset', { features: features, offset: offset, source: source });

        mesh = null;
        offset = null;
    };

    function setOverlapOffset (features, feature) {
        if (!ctx.options.offsetOverlappingLines) return false;
        if (!isPolyline(feature)) return false;
        if (feature.properties.offset) return false;

        var offset = 6;
        var overlaps = [];

        features.forEach(function (f) {
            if (!isPolyline(f)) return false;
            if (f.parent === feature.parent) return false;
            if (f.properties.offset) return false;

            var overlap = turf.booleanOverlap(f, feature) || turf.booleanWithin(f, feature);
            if (!overlap) return false;

            overlaps.push(f)
        }, this)

        overlaps.forEach(function (f) {
            f.properties.offset = offset;
            offset = offset * 2;
        }, this)
    };

    function setWithinOffset (features) {
        if (!ctx.options.offsetOverlappingLines) return false;

        const adder = 4;
        const miles = 0.00189394; // 10 Feet
        const explode = turf.explode(turf.featureCollection(features))
        
        if (!explode || !explode.features.length) return;

        explode.features.forEach(function(feature) {
            if (feature.properties.offset) return false;

            var buffer = turf.buffer(feature, miles, {units: 'miles'});
            var within = turf.pointsWithinPolygon(explode, buffer);

            if (!within || !within.features.length) return;

            var offset = adder;

            within.features.forEach(function (f) {
                if (f.properties.id === feature.properties.id || f.properties.offset) return;
                f.properties.offset = offset;
                offset = offset + adder;
            })            
        })
    };

    function isPolyline (feature) {
        if (!feature) return false;
        return turf.getType(feature) === 'LineString';
    };

    function isPolygon (feature) {
        if (!feature) return false;
        return turf.getType(feature) === 'Polygon' || feature.properties.type === 'Polygon';
    };

    function isRectangle (feature) {
        if (!feature) return false;
        return turf.getType(feature) === 'Polygon' && feature.properties.type === 'Rectangle';
    };

    function isPoint (feature) {
        if (!feature) return false;
        if (turf.getType(feature) === 'Point' && (!feature.properties.type || feature.properties.type === 'Circle')) return true;
        return turf.getType(feature) === 'Point' && (feature.properties.type !== 'Text' && feature.properties.type !== 'Icon');
    };

    function isText (feature) {
        if (!feature) return false;
        return turf.getType(feature) === 'Point' && feature.properties.type === 'Text';
    };

    function isIcon (feature) {
        if (!feature) return false;
        return turf.getType(feature) === 'Point' && feature.properties.type === 'Text';
    };

    function getType (feature) {
        if (!feature) return null;
        
        return isRectangle(feature) ? 'Rectangle' :
        isPolygon(feature) ? 'Polygon' :
        isPolyline(feature) ? 'Polyline' :
        isText(feature) ? 'Text' :
        isIcon(feature) ? 'Icon' :
        isPoint(feature) ? 'Circle' :
        null;
    };
};



/***/ }),

/***/ "./src/map/Layers.js":
/*!***************************!*\
  !*** ./src/map/Layers.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Layers)
/* harmony export */ });
/**
 * @namespace
 * @memberof module:geoflo
 * @name Layers
 * @description A class that handles layers functionality in a mapping context.
 * @param {Object} ctx - The GeoFlo context object
 */
const Layers = function (ctx) {
    if (!ctx.map) throw new Error('No map object provided!');

    const Layers = this;
    const map = ctx.map;
    const id = ctx.id;
    const statics = ctx.statics;
    const layerTypes = {
        Polygon: ['-fill', '-border'],
        Polyline: ['-line', '-dash', '-buffer'],
        Point: ['-circle', '-icon', '-cluster-circle', '-cluster-icon', '-count-icon', '-count-text']
    }

    this.sources = [];
    this.layers = [];
    this._layers = [];
    this._sources = [];

    this.defaultLayers = [
        {
            'source': statics.constants.sources.COLD,
            'id': id + '-fill-cold',
            'type': 'fill',
            'layout': {},
            'filter': ["==", "$type", "Polygon"],
            'paint': {
                'fill-color': ctx.options.colors.secondaryCold,
                'fill-opacity': ['case', ["boolean", ["feature-state", "hidden"], true], 0, 0.3]
            }
        },
        {
            'source': statics.constants.sources.COLD,
            'id': id + '-line-cold',
            'type': 'line',
            'layout': {
                'line-cap': 'round',
                'line-join': 'miter'
            },
            'paint': {
                'line-color': ctx.options.colors.primaryCold,
                'line-width': 4,
                'line-gap-width': ["match", ["get", "type"], "Polygon", 0, 0],
                'line-offset': ['case', ["boolean", ["has", "offset"], true], ["get", "offset"], 0],
                'line-opacity': ['case', ["boolean", ["feature-state", "hidden"], true], 0, 1]
            }
        },
        {
            'source': statics.constants.sources.COLD,
            'id': id + '-circle-cold',
            'filter': ['all', ['==', ['get', 'type'], 'Circle'], ["!=", ["geometry-type"], "Polygon"] ],
            'type': 'circle',
            'paint': {
                'circle-radius': {
                    'base': 6,
                    'stops': [[10, 6], [14, 10]]
                },
                'circle-stroke-width': 1,
                'circle-color': ctx.options.colors.primaryCold,
                'circle-stroke-color': ctx.options.colors.secondaryCold,
                'circle-opacity': ['case', ["boolean", ["feature-state", "hidden"], true], 0, 1],
                'circle-stroke-opacity': ['case', ["boolean", ["feature-state", "hidden"], true], 0, 1]
            }
        },
        {
            source: statics.constants.sources.COLD,
            id: id + '-icon-cold',
            type: 'symbol',
            filter: ['==', ['get', 'type'], 'Icon'],
            layout: {
                'visibility': 'visible',
                'icon-optional': true,
                'text-field': ['get', 'primaryIcon', ['get','style', ['properties']]],
                'text-size': {
                    'base': 16,
                    'stops': [[10, 16], [14, 12]]
                },
                'text-line-height': 1,
                'text-padding': 0,
                'text-offset': [0, 0.2],
                'text-justify': 'auto',
                'text-anchor': 'center',
                'text-allow-overlap': true,
                'text-font': ['Font Awesome 6 Pro Solid'],
                'text-ignore-placement': true
            },
            paint: {
                'text-translate-anchor': 'viewport',
                'text-halo-width': 0,
                'text-halo-color': ctx.options.colors.primaryCold,
                'text-color': ctx.options.colors.secondaryBackground,
                'text-opacity': ['case', ["boolean", ["feature-state", "hidden"], true], 0, 1]
            }
        },
        {
            'source': statics.constants.sources.COLD,
            'id': id + '-text-cold',
            'type': 'symbol',
            'filter': ["==", "$type", "Point"],
            'layout': {
                "symbol-placement": "point",
                'text-field': ['get', 'text'],
                'text-font': ['DIN Pro Regular', 'DIN Pro Italic', 'Arial Unicode MS Regular', 'DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
                'text-keep-upright': true,
                'text-size': 18,
                'text-justify': ['get', 'justify'],
                'text-letter-spacing': 0.05,
                'text-line-height': 1.2,
                'text-max-angle': 10,
                'text-offset': [0,0],
                'text-padding': 2,
                'text-rotate': 0,
                'text-transform': ['get', 'transform']
            },
            'paint': {
                'text-color': ctx.options.colors.primaryCold,
                'text-halo-color': ctx.options.colors.primaryText,
                'text-halo-width': 0.5,
                'text-opacity': 1,
                'text-opacity': ['case', ["boolean", ["feature-state", "hidden"], true], 0, 1]
            }
        },
        {
            id: statics.constants.layers.MESH + '-line',
            source: statics.constants.sources.MESH,
            type: "line",
            paint: {
                "line-color": ctx.options.colors.primaryBase,
                "line-width": 2,
                "line-opacity": 0.3
            }
        },
        {
            id: statics.constants.layers.MESH + '-circle',
            source: statics.constants.sources.MESH,
            'type': 'circle',
            'paint': {
                'circle-radius': 2,
                'circle-color': ctx.options.colors.primaryBase,
                'circle-opacity': 0.3
            }
        },
        {
            'source': statics.constants.sources.HOT,
            'id': id + '-fill-hot',
            'type': 'fill',
            'layout': {},
            'filter': ["==", "$type", "Polygon"],
            'paint': {
                'fill-color': ctx.options.colors.secondaryHot,
                'fill-opacity': ['case', ["boolean", ["has", "new"], true], 0.5, 0.1],
            }
        },
        {
            'source': statics.constants.sources.HOT,
            'id': id + '-line-hot',
            'type': 'line',
            'layout': {
                'line-cap': 'round',
                'line-join': 'round'
            },
            'paint': {
                'line-color': ctx.options.colors.primaryHot,
                'line-width': 4,
                'line-dasharray': [1,2],
            }
        },
        {
            'source': statics.constants.sources.HOT,
            'id': id + '-point-hot',
            'filter': ['==', '$type', 'Point'],
            'type': 'circle',
            //'filter': ["==", 0, ['number', ['get', 'painting']]],
            'paint': {
                'circle-radius': ["match", ["get", "type"], "Circle", 8, 4],
                'circle-stroke-width': 1,
                'circle-color': ctx.options.colors.primaryHot,
                'circle-stroke-color': ctx.options.colors.secondaryHot
            }
        },
        {
            source: statics.constants.sources.HOT,
            id: id + '-icon-hot',
            filter: ['==', ['get', 'type'], 'Icon'],
            type: 'symbol',
            layout: {
                'visibility': 'visible',
                'icon-optional': true,
                'text-field': ['get', 'primaryIcon', ['get','style', ['properties']]],
                'text-size': {
                    'base': 16,
                    'stops': [[10, 16], [14, 12]]
                },
                'text-line-height': 1,
                'text-padding': 0,
                'text-offset': [0, 0.2],
                'text-justify': 'auto',
                'text-anchor': 'center',
                'text-allow-overlap': true,
                'text-font': ['Font Awesome 6 Pro Solid'],
                'text-ignore-placement': true
            },
            paint: {
                'text-translate-anchor': 'viewport',
                'text-halo-color': ctx.options.colors.primaryHot,
                'text-halo-width': 0, //[ 'case', ['boolean', ['feature-state', 'hover'], false], 0.5, 0 ],
                'text-color': ctx.options.colors.secondaryHot
            }
        },
        {
            'source': statics.constants.sources.HOTTEXT,
            'id': id + '-text-hot',
            'type': 'symbol',
            'layout': {
                'symbol-placement': 'point',
                'text-field': ['get', 'text'],
                'text-font': ['DIN Pro Regular', 'DIN Pro Italic', 'Arial Unicode MS Regular', 'DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
                'text-keep-upright': true,
                'text-anchor': ['get', 'anchor'],
                'text-size': 14,
                'text-justify': ['get', 'justify'],
                'text-letter-spacing': 0,
                'text-line-height': 1.2,
                'text-max-angle': 10,
                'text-offset': [0,0],
                'text-padding': 2,
                'text-rotate': 0,
                'text-transform': ['get', 'transform']
            },
            'paint': {
                'text-color': ctx.options.colors.primaryText,
                'text-halo-color': ctx.options.colors.primaryBackground,
                'text-halo-width': 0,
                'text-opacity': 1,
            }
        },
        {
            'source': statics.constants.sources.SNAP,
            'id': id + '-point-snap',
            'type': 'circle',
            'filter': ['==', '$type', 'Point'],
            'paint': {
                'circle-radius': ["match", ["get", "type"], "Circle", 6, "Icon", 0, 6],
                'circle-stroke-width': 2,
                'circle-color': ctx.options.colors.primarySnap,
                'circle-stroke-color': ctx.options.colors.secondarySnap
            }
        },
        {
            source: statics.constants.sources.SNAP,
            id: id + '-icon-snap',
            type: 'symbol',
            filter: ['==', ['get', 'type'], 'Icon'],
            layout: {
                'visibility': 'visible',
                'icon-optional': true,
                'text-field': ['get', 'primaryIcon', ['get','style', ['properties']]],
                'text-size': {
                    'base': 18,
                    'stops': [[10, 18], [14, 16]]
                },
                'text-line-height': 1,
                'text-padding': 0,
                'text-offset': [0,0.2],
                'text-justify': 'auto',
                'text-anchor': 'center',
                'text-allow-overlap': true,
                'text-font': ['Font Awesome 6 Pro Solid'],
                'text-ignore-placement': true
            },
            paint: {
                'text-translate-anchor': 'viewport',
                'text-halo-color': ctx.options.colors.primarySnap,
                'text-halo-width': 0, //[ 'case', ['boolean', ['feature-state', 'hover'], false], 0.5, 0 ],
                'text-color': ctx.options.colors.secondarySnap
            }
        },
        {
            'source': statics.constants.sources.SNAP,
            'id': id + '-line-snap',
            'type': 'line',
            //'filter': ["==", "$type", "LineString"],
            'layout': {
                'line-cap': 'round',
                'line-join': 'round'
            },
            'paint': {
                'line-color': ctx.options.colors.secondarySnap,
                'line-width': 4,
                'line-dasharray':[1,2]
            }
        },
        {
            'source': statics.constants.sources.ROUTE,
            'id': id + '-line-route',
            'type': 'line',
            'filter': ["==", "$type", "LineString"],
            'layout': {
                'line-cap': 'round',
                'line-join': 'round'
            },
            'paint': {
                'line-color': ctx.options.colors.error,
                'line-width': 4,
                'line-dasharray':[]
            }
        },
        {
            'source': statics.constants.sources.SELECT,
            'id': id + '-line-select',
            'type': 'line',
            'layout': {
                'line-cap': 'round',
                'line-join': 'round'
            },
            'paint': {
                'line-color': ctx.options.colors.secondarySelect,
                'line-width': 4,
            }
        },
        {
            'source': statics.constants.sources.SELECT,
            'id': id + '-fill-select',
            'type': 'fill',
            'layout': {},
            'filter': ["==", "$type", "Polygon"],
            'paint': {
                'fill-color': ctx.options.colors.primarySelect,
                'fill-opacity': 0.4
            }
        },
        {
            'source': statics.constants.sources.SELECT,
            'id': id + '-point-select',
            'filter': ['all', ['!=', ['get', 'type'], 'Text'], ['!=', ['get', 'type'], 'Icon'], ["==", ["geometry-type"], "Point"] ],
            'type': 'circle',
            'paint': {
                'circle-radius': {
                    'base': 6,
                    'stops': [[10, 6], [14, 10]]
                },
                'circle-stroke-width': 2,
                'circle-color': ctx.options.colors.secondarySelect,
                'circle-stroke-color': ctx.options.colors.primarySelect,
            }
        },
        {
            'source': statics.constants.sources.SELECT,
            'id': id + '-symbol-select',
            'filter': ['==', ['get', 'type'], 'Icon'],
            'type': 'symbol',
            'layout': {
                'icon-optional': true,
                'text-field': ['get', 'secondaryIcon', ['get','style', ['properties']]],
                'text-size': {
                    'base': 16,
                    'stops': [[10, 16], [14, 12]]
                },
                'text-line-height': 1,
                'text-padding': 0,
                'text-offset': [0, 0.2],
                'text-justify': 'auto',
                'text-anchor': 'center',
                'text-allow-overlap': true,
                'text-font': ['Font Awesome 6 Pro Solid'],
                'text-ignore-placement': true
            },
            'paint': {
                'text-translate-anchor': 'viewport',
                'text-halo-color': ctx.options.colors.primaryBackground,
                'text-halo-width': 0,
                'text-color': ctx.options.colors.secondarySelect,
            }
        },
        {
            'source': statics.constants.sources.SELECT,
            'id': id + '-text-select',
            'filter': ['==', ['get', 'type'], 'Text'],
            'type': 'symbol',
            'layout': {
                "symbol-placement": "point",
                'text-field': ['get', 'text'],
                'text-font': ['DIN Pro Regular', 'DIN Pro Italic', 'Arial Unicode MS Regular', 'DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
                'text-keep-upright': true,
                'text-size': 18,
                'text-justify': ['get', 'justify'],
                'text-letter-spacing': 0.05,
                'text-line-height': 1.2,
                'text-max-angle': 10,
                'text-offset': [0,0],
                'text-padding': 2,
                'text-rotate': 0,
                'text-transform': ['get', 'transform']
            },
            'paint': {
                'text-color': ctx.options.colors.secondarySelect,
                'text-halo-color': ctx.options.colors.secondaryText,
                'text-halo-width': 0.5,
                'text-opacity': 1,
            }
        },
        {
            'source': statics.constants.sources.VERTEX,
            'id': id + '-point-vertex',
            'type': 'circle',
            'filter': ['==', "$type", 'LineString'],
            'paint': {
                'circle-radius': 4,
                'circle-stroke-width': 3,
                'circle-color': ctx.options.colors.primaryVertex,
                'circle-stroke-color': ctx.options.colors.secondaryVertex
            }
        },
        {
            'source': statics.constants.sources.GAMEPAD,
            'id': id + '-gamepad',
            'type': 'symbol',
            'layout': {
                'icon-image': 'gamepad',
                'icon-size': 0.25
            }
        }
    ]

	/** 
	 * @function
     * @memberof module:geoflo.Layers
	 * @name init
	 * @description Initializes the object with the provided options and refreshes it.
	 * @param {Object} options - The options object to configure the object.
	 * @returns {Object} The refreshed object with the updated options.
	 */
    this.init = function (options={}) {
        this.options = options;
        return this.refresh();
    }

	/**
	 * @function
     * @memberof module:geoflo.Layers
	 * @name refresh
	 * @description This function refreshes the map by removing existing layers and sources, adding default layers and sources, and rebuilding the layers.
	 * @param {Object} options - Optional parameter for additional options.
	 * @returns {Array} - An array of layers after the refresh operation.
	 */
    this.refresh = async function (options={}) {
        var layers = ctx.Utilities.cloneDeep(this._layers);

        this._layers = [];
        this._sources = [];

        this.removeEventListeners();
        this.removeLayers(this.defaultLayers);
        this.removeSources(Object.values(ctx.statics.constants.sources));

        this.addEventListeners();
        this.addSources(Object.values(ctx.statics.constants.sources));
        this.addLayers(this.defaultLayers, this.options);

        await buildLayers.call(this, layers);

        setTimeout(function() {
            ctx.Layers.moveLayers();
            ctx.zoomToFeatures(ctx.getRenderedDrawnFeatures());
        }, 250);
        return this.getLayers();
    }




	/**
	 * @function
     * @memberof module:geoflo.Layers
	 * @name setCustomLayers
	 * @description This function takes an array of custom layers and options, builds the layers using the buildLayers function, and returns the resulting layers.
	 * @param {Array} layers - An array of custom layers to be processed.
	 * @param {Object} options - Additional options for building the layers.
	 * @returns {Promise<Array>} The processed custom layers.
	 */
    this.setCustomLayers = async function (layers, options) {
        if (!layers) return [];
        const _layers = await buildLayers.call(this, layers, options);
        return _layers;
    }

	/**
	 * @function
     * @memberof module:geoflo.Layers
	 * @name getCustomLayers
	 * @description Retrieves the custom layers stored in the object.
	 * @returns {Array} An array containing the custom layers.
	 */
    this.getCustomLayers = function () {
        return this._layers;
    }

	/**
	 * @function
     * @memberof module:geoflo.Layers
	 * @name hasCustomLayers
	 * @description This function determines if there are any custom layers present in the application.
	 * @returns {number} The number of custom layers available.
	 */
    this.hasCustomLayers = function () {
        return this.getCustomLayers().length;
    }

    


	/**
	 * @function
     * @memberof module:geoflo.Layers
	 * @name getFeatures
	 * @description Retrieves the features from a source based on the provided ID.
	 * @param {string} id - The ID of the source to retrieve features from.
	 * @returns {Array} An array of features from the specified source, or an empty array if the source or features are not found.
	 */
    this.getFeatures = function (id) {
        var source = this.getSource(id);
        if (!source || !source._data) return [];
        return source._data.features;
    }

	/**
	 * @function
     * @memberof module:geoflo.Layers
	 * @name getSelection
	 * @description This function determines the selected feature based on the provided features array and coordinates.
	 * @param {Array} features - An array of features to select from.
	 * @param {Object} coords - The coordinates of the selected feature.
	 * @returns {boolean} Returns true if a feature is selected, false otherwise.
	 */
    this.getSelection = function (features=[], coords) {
        var feature = features && features.length ? features[0] : false;
        if (!feature) return false;
        if (feature.properties.cluster) return Layers.onClusterClick(feature, coords), false;
        return true;
    }

	/**
	 * @function
     * @memberof module:geoflo.Layers
	 * @name getType
	 * @description This function takes a geometry type as input and returns the corresponding general type (Polygon, Polyline, or Point).
	 * @param {string} type - The type of geometry to be evaluated.
	 * @returns {string|boolean} Returns the general type of the geometry (Polygon, Polyline, Point) or false if the type is not recognized.
	 */
    this.getType = function (type) {
        return type === 'Polygon' || type === 'Rectangle' ? 'Polygon' :
        type === 'Polyline' || type === 'LineString' || type === 'Line' ? 'Polyline' :
        type === 'Point' || type === 'Circle' || type === 'Marker' || type === 'Icon' || type === 'Text' ? 'Point' :
        false;
    }

	/**
	 * @function
     * @memberof module:geoflo.Layers
	 * @name getSources
	 * @description Retrieves the sources stored in the object.
	 * @returns {Array} An array containing the sources.
	 */
    this.getSources = function () {
        return this.sources;
    }

	/**
	 * @function
     * @memberof module:geoflo.Layers
	 * @name getSource
	 * @description Retrieves a specific source object by its ID from the list of sources.
	 * @param {string} id - The ID of the source to retrieve.
	 * @returns {object|boolean} The source object with the specified ID if found, otherwise false.
	 */
    this.getSource = function (id) {
        if (!id) return false;
        var sources = this.getSources();
        return sources.find(function(source) { return source.id === id })
    }

	/** 
	 * @function
     * @memberof module:geoflo.Layers
	 * @name getSourceIds
	 * @description Retrieves the IDs of all sources.
	 * @returns {Array} An array of source IDs.
	 */
    this.getSourceIds = function () {
        return this.getSources().map(function (s) { return s.id });
    }

	/**
	 * @function
     * @memberof module:geoflo.Layers
	 * @name getLayers
	 * @description Retrieves the layers array from the object.
	 * @returns {Array} The layers array.
	 */
    this.getLayers = function () {
        return this.layers;
    }

	/**
	 * @function
     * @memberof module:geoflo.Layers
	 * @name getLayer
	 * @description Retrieves a layer based on the provided ID or source ID.
	 * @param {string} id - The ID of the layer to retrieve.
	 * @returns {object|boolean} The layer object if found, or false if not found.
	 */
    this.getLayer = function (id) {
        if (!id) return false;
        var layers = this.getLayers();
        var layer = layers.find(function(layer) { return layer.id === id });
        if (!layer) layer = layers.filter(function(layer) { return layer.source === id });
        return layer;
    }

	/**
	 * @function
     * @memberof module:geoflo.Layers
	 * @name getLayerIds
	 * @description Retrieves the IDs of the layers provided or the default layers if none are provided.
	 * @param {Array} layers - An array of layer objects.
	 * @returns {Array} An array of layer IDs.
	 */
    this.getLayerIds = function (layers) {
        var _layers = layers || this.getLayers();
        return _layers.map(function (l) { return l.id });
    }



    

	/**
	 * @function
     * @memberof module:geoflo.Layers
	 * @name addSources
	 * @description Adds multiple sources to the context with the given options.
	 * @param {Array} sources - An array of sources to be added.
	 * @param {Object} options - Additional options for adding the sources.
	 * @returns {Array} - An array of all the added sources.
	 */
    this.addSources = function (sources=[], options={}) {
        sources.forEach(function(source) { this.addSource(source, false, options) }, this);
        ctx.fire('sources.add', { sources: this.getSources() });
        return this.getSources();
    }

	/**
	 * @function
     * @memberof module:geoflo.Layers
	 * @name addSource
	 * @description This function adds a new source to the map using the provided ID and type. It also accepts optional configuration options for the source.
	 * @param {string} id - The unique identifier for the source.
	 * @param {string} type - The type of the source (e.g., 'geojson', 'vector', 'raster', etc.).
	 * @param {Object} [options={}] - Additional configuration options for the source (e.g., features, promoteId, clusterMaxZoom, clusterRadius).
	 * @returns {Object} The newly added source object.
	 */
    this.addSource = function (id, type, options={}) {
        if (!id) throw new Error('No source was provided!');
        
        var opts = { type: options.type || "geojson", data: turf.featureCollection(options.features || []), promoteId: options.promoteId || 'id' };
        if (type && type === 'Point') { opts = Object.assign(opts, { cluster: true, clusterMaxZoom: options.clusterMaxZoom || 14, clusterRadius: options.clusterRadius || 50 }) }

        map.addSource(id, opts);
        this.sources.push(map.getSource(id));
        ctx.fire('source.add', { id: id, source: this.getSource(id) })
        return this.getSource(id);
    }

	/**
	 * @function
     * @memberof module:geoflo.Layers
	 * @name addLayers
	 * @description Adds multiple layers to the map.
	 * @param {Array} layers - An array of layers to be added to the map.
	 * @param {Object} options - Additional options for adding the layers.
	 * @returns {Array} - An array of layers that have been added to the map.
	 */
    this.addLayers = function (layers=[], options={}) {
        layers.forEach(function(layer) { this.addLayer(layer, options) }, this);
        ctx.fire('layers.add', { layers: this.getLayers() });
        buildEvents.call(this);
        return this.getLayers();
    }

	/**
	 * @function
     * @memberof module:geoflo.Layers
	 * @name addLayer
	 * @description This function adds a layer to the map with the provided options. It also updates the layer's metadata, adds the layer to the map, and pushes the layer to the layers array. It triggers a 'layer.add' event and returns the added layer.
	 * @param {Object} layer - The layer object to be added to the map.
	 * @param {Object} [options={}] - Additional options for the layer.
	 * @returns {Object} The added layer.
	 */
    this.addLayer = function (layer, options={}) {
        if (!layer || !layer.id) return false;
    
        layer.metadata = options;
        map.addLayer(layer);

        layer = map.getLayer(layer.id);
        if (!layer) return console.error(id, 'Layer Not Added!');

        this.layers.push(layer);
        ctx.fire('layer.add', { id: layer.id, layer: this.getLayer(layer.id) });
        return this.getLayer(layer.id);
    }





	/**
	 * @function
     * @memberof module:geoflo.Layers
	 * @name removeSources
	 * @description Removes sources from the map.
	 * @param {Array} sources - An array of source IDs to be removed. If not provided, it defaults to all source IDs.
	 * @returns {void}
	 */
    this.removeSources = function (sources) {
        sources = sources || this.getSourceIds();
        sources.forEach(function(id) { this.removeSource(id) }, this);
        ctx.fire('sources.remove', { removed: true })
    }

	/**
	 * @function
     * @memberof module:geoflo.Layers
	 * @name removeSource
	 * @description This function removes a source from the map and the internal sources array based on the provided id.
	 * @param {string} id - The id of the source to be removed.
	 * @returns {string} The id of the removed source.
	 */
    this.removeSource = function (id) {
        if (!id) return false;
        if (map.getSource(id)) map.removeSource(id);

        var index = -1;
        index = this.sources.findIndex(function(l) { return l.id === id });
        if (index > -1) this.sources.splice(index, 1);
        
        ctx.fire('source.remove', { removed: id });
        return id;
    }

	/**
	 * @function
     * @memberof module:geoflo.Layers
	 * @name removeLayers
	 * @description Removes multiple layers from the context.
	 * @param {Array} layers - An array of layer objects to be removed.
	 * @returns {Array} - An array of IDs of the removed layers.
	 */
    this.removeLayers = function (layers) {
        var ids = this.getLayerIds(layers);
        ids.forEach(function(id) { this.removeLayer(id) }, this);
        ctx.fire('layers.remove', { removed: ids });
        return ids;
    }

	/**
	 * @function
     * @memberof module:geoflo.Layers
	 * @name removeLayer
	 * @description This function removes a layer from the map and the layers array based on the provided id.
	 * @param {string} id - The id of the layer to be removed.
	 * @returns {string} The id of the removed layer.
	 */
    this.removeLayer = function (id) {
        if (!id) return false;
        if (map.getLayer(id)) map.removeLayer(id);

        var index = -1;
        index = this.layers.findIndex(function(l) { return l.id === id });
        if (index > -1) this.layers.splice(index, 1);

        ctx.fire('layer.remove', { removed: id });
        return id;
    }



	/**
	 * @function
     * @memberof module:geoflo.Layers
	 * @name moveLayers
	 * @description Moves the specified layers on the map.
	 * @param {Array} layers - An array of layer objects to be moved on the map.
	 * @returns {void}
	 */
    this.moveLayers = function (layers) {
        layers = !layers ? this.defaultLayers : layers;
        layers.forEach(function (layer) { ctx.map.moveLayer(layer.id) })
    }



	/**
	 * @function
     * @memberof module:geoflo.Layers
	 * @name addEventListeners
	 * @description Attaches event listeners based on the provided options.
	 * @param {Object} options - An object containing configuration options for event listeners.
	 * @returns {Object} - The result of the buildEvents function with the provided options.
	 */
    this.addEventListeners = function (options={}) {
        return buildEvents.call(this, { on: true })
    }

	/**
	 * @function
     * @memberof module:geoflo.Layers
	 * @name removeEventListeners
	 * @description Removes event listeners from the element.
	 * @param {Object} options - An object containing options for removing event listeners.
	 * @param {boolean} options.off - A boolean flag to indicate whether to turn off event listeners.
	 * @returns {void}
	 */
    this.removeEventListeners = function (options={}) {
        return buildEvents.call(this, { off: true })
    }

	/**
	 * @function
     * @memberof module:geoflo.Layers
	 * @name onClusterClick
	 * @description Handles the click event on a cluster feature to expand the cluster on the map.
	 * @param {Object} feature - The cluster feature that was clicked.
	 * @returns {boolean} Returns false if the feature does not have a source.
     * @event
	 */
    this.onClusterClick = function (feature) {
        if (!feature.source) return false;

        var source = map.getSource(feature.source);

        source.getClusterExpansionZoom(feature.properties.cluster_id, function(err,zoom) {
            if (!err) map.easeTo({ center: feature.geometry.coordinates, zoom: zoom + 2 });
        });
    }

	/**
	 * @function
     * @memberof module:geoflo.Layers
	 * @name onLayerMouseover
	 * @description This function is triggered when a mouseover event occurs on a layer. It checks if the map is in editing, drawing, or viewing mode, and if the layer is in the importing state. If there are no features in the event, it returns false. Otherwise, it sets the highlight on the map with the event features.
	 * @param {Object} event - The mouseover event object.
	 * @returns {boolean} Returns false if certain conditions are met, otherwise sets the highlight on the map.
     * @event
	 */
    this.onLayerMouseover = function(event) {
        return 

        var Map = app.Map;
        if (Map.getActions().editing || Map.getActions().drawing || Map.getActions().viewing) { return false };
        if (app[app.ns('layer')]._importing) { return false }
        if (!event.features.length) { return false }

        Map.setHighlight({ clear: true, features: event.features});
    }

	/**
	 * @function
     * @memberof module:geoflo.Layers
	 * @name onLayerMouseout
	 * @description Handles the mouseout event on a layer in the map.
	 * @param {Event} event - The mouseout event object.
	 * @returns {void}
     * @event
	 */
    this.onLayerMouseout = function(event) {
        return 

        var Map = app.Map;
        if (Map.getActions().editing || Map.getActions().drawing || Map.getActions().viewing) { return false };
        if (app[app.ns('layer')]._importing) { return false }
        
        Map._removeHighlight();
    }





    async function buildLayers (layers=[], options={}) {
        if (!layers.length) return false;
        for (const layer of layers) await buildLayer.call(this, layer, options);
        this.moveLayers();
        return this.getLayers();
    }

    async function buildLayer (layer, opts) {
        var details = layer.details || {};
        var options = layer.options || {};
        var features = layer.features || [];
        var hasFeatures = features && features.length;
        var error;

        if (!details.id || !details.type) error = true;

        const type = this.getType(details.type);
        if (!type) error = true;

        var metadata = {};
        details.default ? metadata.default = true : metadata.custom = true;
        details.name ? metadata.name = details.name : false;

        var source = details.source || details.id;
        metadata.source = source;
        
        var layers = type === 'Polygon' ? buildPolygon.call(this, source, details, layerTypes[type], options) :
        type === 'Polyline' ? buildPolyline.call(this, source, details, layerTypes[type], options) :
        type === 'Point' ? buildPoint.call(this, source, details, layerTypes[type], options) : [];

        this.removeLayers(layers);
        this.removeSource(source);
        this.addSource(source, type, options);
        this.addLayers(layers, metadata);

        removeLayer.call(this, { layer: details.id, source: source });

        this._layers.push({ id: details.id, details: details, options: options });
        this._sources.push({ id: source, type: type, options: options });

        if (hasFeatures) ctx.Features.addFeatures(features);
        
        return new Promise(async function (resolve, reject) {
            if (error) return resolve(error);

            var ready = setInterval(function() {
                var feats = ctx.Layers.getFeatures(source);
                if (hasFeatures && !feats.length) return; 
                clearInterval(ready);
                return resolve({ layer: layer, features: feats });
            }, 1);
        })
    }

    function buildPolygon (source, layer, types, options={}) {
        if (!source) return [];

        var _layers = [];

        types.forEach(function (type) {
            var style;
            var id = layer.id + type;

            if (type.includes('border')) {
                style = {
                    id: id,
                    type: 'line',
                    slot: options.slot || 'middle',
                    source: source,
                    filter: ['==', '$type', 'Polygon'],
                    layout: {
                        'visibility': options.visibility || 'visible'
                    },
                    paint: {
                        'line-color': ['get', 'primaryColor', ['get','style', ['properties']]],
                        'line-width': ['case', ["boolean", ['has', 'width', ['get','style', ['properties']]], true], ['get', 'width', ['get','style', ['properties']]], 2],
                        'line-opacity': ['case', ["boolean", ["feature-state", "hidden"], true], 0, 0.8]
                    }
                }
            } else if (type.includes('fill')) {
                style = {
                    id: id,
                    type: 'fill',
                    source: source,
                    filter: ['==', '$type', 'Polygon'],
                    layout: {
                        'visibility': options.visibility || 'visible'
                    },
                    paint: {
                        'fill-color': ['get', 'secondaryColor', ['get','style', ['properties']]],
                        'fill-opacity': ['case', ["boolean", ["feature-state", "hidden"], true], 0, 0.5]
                    }
                }
            }

            style ? _layers.push(style) : false;
        }, this)

        return _layers;
    }

    function buildPolyline (source, layer, types, options={}) {
        if (!source) return [];

        var _layers = [];

        types.forEach(function (type) {
            var style;
            var id = layer.id + type;

            if (type.includes('line')) {
                style = {
                    id: id,
                    type: 'line',
                    slot: options.slot || 'middle',
                    source: source,
                    filter: ['==', '$type', 'LineString'],
                    layout: {
                        'visibility': options.visibility || 'visible',
                        'line-miter-limit': 2,
                        'line-join': 'round',
                        'line-cap': 'round'
                    },
                    paint: {
                        'line-color': ['get', 'primaryColor', ['get','style', ['properties']]],
                        'line-width': ['case', ["boolean", ['has', 'width', ['get','style', ['properties']]], true], ['get', 'width', ['get','style', ['properties']]], 4],
                        'line-offset': ['case', ["boolean", ["has", "offset"], true], ["get", "offset"], 0],
                        'line-opacity': ['case', ["boolean", ["feature-state", "hidden"], true], 0, 1]
                    }
                }
            }

            style ? _layers.push(style) : false;
        }, this)

        return _layers;
    }

    function buildPoint (source, layer, types, options={}) {
        if (!source) return [];

        var _layers = [];
        var style = map.getStyle();
        var dontRender = style.imports && style.imports.length;

        types.forEach(function (type) {
            var style;
            var id = layer.id + type;

            if (type.includes('circle')) {
                style = {
                    id: id,
                    type: 'circle',
                    source: source,
                    filter: ['==', '$type', 'Point'],
                    layout: {
                        'visibility': options.visibility
                    },
                    paint: {
                        'circle-radius': {
                            'base': 12,
                            'stops': [[10, 12], [14, 10]]
                        },
                        'circle-stroke-width': 1,
                        'circle-color': ['get', 'secondaryColor', ['get','style', ['properties']]],
                        'circle-stroke-color': ['get', 'primaryColor', ['get','style', ['properties']]],
                        'circle-opacity': ['case', ["boolean", ["feature-state", "hidden"], true], 0, 0.5],
                        'circle-stroke-opacity': ['case', ["boolean", ["feature-state", "hidden"], true], 0, 1]
                    }
                }

                if (type.includes('cluster')) {
                    style.filter = ['has', 'point_count'];
                    style.paint['circle-color'] = options.secondaryColor || ctx.options.colors.secondaryColor;
                    style.paint['circle-stroke-color'] = options.primaryColor || ctx.options.colors.primaryColor;
                }
            } else if (!dontRender && type.includes('icon')) {
                style = {
                    id: id,
                    type: 'symbol',
                    source: source,
                    filter: ['==', '$type', 'Point'],
                    layout: {
                        visibility: options.visibility,
                        'icon-optional': true,
                        'text-field': ['get', 'primaryIcon', ['get','style', ['properties']]],
                        'text-size': {
                            'base': 16,
                            'stops': [[10, 16], [14, 12]]
                        },
                        'text-line-height': 1,
                        'text-padding': 0,
                        'text-offset': [0, 0.2],
                        'text-justify': 'auto',
                        'text-anchor': 'center',
                        'text-allow-overlap': true,
                        'text-font': ['Font Awesome 6 Pro Solid'],
                        'text-ignore-placement': true
                    },
                    paint: {
                        'text-translate-anchor': 'viewport',
                        'text-halo-color': ['get', 'primaryColor', ['get','style', ['properties']]],
                        'text-halo-width': 0,
                        'text-color': ctx.options.colors.secondaryText, //['get', 'primaryColor', ['get','style', ['properties']]],
                        'text-opacity': ['case', ["boolean", ["feature-state", "hidden"], true], 0, 1]
                    }
                }

                if (type.includes('cluster')) {
                    style.filter = ['has', 'point_count'];
                    style.layout['text-field'] = options.primaryIcon || '';
                    style.paint['text-halo-color'] = options.secondaryColor || ctx.options.colors.secondaryCold;
                    style.paint['text-color'] = options.primaryColor || ctx.options.colors.secondaryText;
                } else if (type.includes('count')) {
                    style.filter = ['has', 'point_count'];

                    style.layout = {
                        'visibility': options.visibility,
                        'icon-optional': true,
                        'text-field': options.countIcon || '',
                        'text-size': {
                            'base': 14,
                            'stops': [[10, 16], [14, 14]]
                        },
                        'text-line-height': 1,
                        'text-padding': 0,
                        'text-offset': [0.5, -0.6],
                        'text-justify': 'auto',
                        'text-anchor': 'center',
                        'text-allow-overlap': true,
                        'text-font': ['Font Awesome 6 Pro Solid'],
                        'text-ignore-placement': true
                    }

                    style.paint = {
                        'text-translate-anchor': 'viewport',
                        'text-color': options.countIconColor || ctx.options.colors.primaryText,
                        'text-opacity': ['case', ["boolean", ["feature-state", "hidden"], true], 0, 1]
                    }
                }
            } else if (!dontRender && type.includes('text')) {
                if (type.includes('count')) {
                    style = {
                        id: id,
                        type: 'symbol',
                        source: source,
                        filter: ['has', 'point_count'],
                        layout: {
                            'text-field': ['get', 'point_count_abbreviated'],
                            'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
                            'text-size': {
                                'base': 14,
                                'stops': [[10, 14], [14, 12]]
                            },
                            'text-offset': [0.55, -0.9],
                        },
                        paint: {
                            'text-color': options.countTextColor || ctx.options.colors.secondaryText,
                            'text-opacity': ['case', ["boolean", ["feature-state", "hidden"], true], 0, 1]
                        }
                    }
                }
            }

            style ? _layers.push(style) : false;
        }, this)

        return _layers;
    }

    function buildEvents (options={}) {
        var ids = this.getLayerIds();
        if (!ids.length) return;

        if (options.off) {
            map.off('mousemove', ids, this.onLayerMouseover);
            map.off('mouseleave', ids, this.onLayerMouseout);
        } else if (options.on) {
            map.on('mousemove', ids, this.onLayerMouseover);
            map.on('mouseleave', ids, this.onLayerMouseout);
        } else if (!options) {
            buildEvents({ off: true });
            buildEvents({ on: true })
        }
    }

    function removeLayer (options) {
        if (!options) return false;
        var layer = this._layers.findIndex((e) => { return e.id === options.layer });
        var source = this._sources.findIndex((e) => { return e.id === options.source });
        if (layer !== -1) this._layers.splice(layer, 1);
        if (source !== -1) this._sources.splice(source, 1);
    }


    this.init();
};



/***/ }),

/***/ "./src/map/Map.js":
/*!************************!*\
  !*** ./src/map/Map.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Map)
/* harmony export */ });
/**
 * @namespace
 * @memberof module:geoflo
 * @name Map
 * @description A class that handles map functionality in a mapping context.
 * @param {Object} ctx - The GeoFlo context object
 */
const Map = function (ctx, options) {


	/**
	 * @function
     * @memberof module:geoflo.Map
	 * @name init
	 * @description This function initializes the map with the given options, including setting up the Mapbox instance, SDK, and viewport.
	 * @param {Object} options - The options object for configuring the map.
	 * @returns {Object} - The current instance of the map.
	 */
    this.init = function (options={}) {
        this.options = ctx.Utilities.extend({}, options);
        this.mapbox = new ctx.Mapbox.Map(this.options);
        this.sdk = window.mapboxSdk && this.options.sdkToken ? window.mapboxSdk({ accessToken: this.options.sdkToken }) : false;
        this.viewport = document.createElement('div');
        this.viewportHeightOffset = 110;
        this.viewportWidthOffset = 20;
        this.viewportLeft = '10px';
        this.viewportBottom = '5%';
        this.mapbox.on('load', this.onLoad.bind(this));
        return this;
    }


    this.getMap = function () {
        return this.map;
    }

    this.getContainer = function () {
        return this.container;
    }

    this.getViewport = function () {
        return this.viewport;
    }


	/**
	 * @function
     * @memberof module:geoflo.Map
	 * @name setStyle
	 * @description Sets the style of the map and returns the updated style.
	 * @param {Object} style - The style object to be applied to the map.
	 * @returns {Object} The updated style object of the map.
	 */
    this.setStyle = function (style) {
        if (!style) { return false };
        this.map.setStyle(style, {});
        return this.map.getStyle();
    }

	/**
	 * @description Sets the extent of the map based on the provided features or a given extent. If no features are provided, it uses the rendered drawn features. If extent is specified, it sets the map extent to the extent polygon. If center is not specified and isPoint is true, it centers the map at the centroid of the extent. If center is false, it fits the map to the bounding box of the features. If center is true, it centers the map at the centroid of the bounding box.
	 * @function
     * @memberof module:geoflo.Map
	 * @name setExtent
	 * @param {Array} features - Array of features to set the extent based on.
	 * @param {Array} extent - Extent polygon to set the map extent to.
	 * @param {Object} options - Additional options for setting the extent (center, isPoint).
	 * @returns {Object} - The map object after setting the extent.
	 */
    this.setExtent = function (features, extent, options={}) {
        var noFeatures = !features || !features.length;
        var center = options.center;
        !center && options.isPoint ? center = true : false;
        
        if (extent) {
            this.preventDefault = true;
            features = !this.options.extent ? [] : [turf.polygon(this.options.extent)];
        } else if (noFeatures) {
            features = ctx.getRenderedDrawnFeatures();
        }

        if (!features) return this.map.jumpTo({
            bearing: this.options.bearing || this.map.getBearing(),
            center: this.options.center || this.map.getCenter(),
            zoom: this.options.zoom || this.map.getZoom(),
            pitch: this.options.pitch || this.map.getPitch()
        });

        var bbox = turf.bbox(turf.featureCollection(features));
        var polygon = turf.bboxPolygon(bbox);
        var centroid = turf.centroid(polygon);
        var jumpTo = { lat: centroid.geometry.coordinates[1], lng: centroid.geometry.coordinates[0] }

        this.setViewport();

        !center ? this.map.fitBounds(bbox) : jumpTo && jumpTo.lng ? this.map.jumpTo({ center: jumpTo }) : false;
        ctx.fire('features.zoom', { features: features, center: this.map.getCenter(), bbox: bbox });
        return this.map;
    }

	/**
	 * @function
     * @memberof module:geoflo.Map
	 * @name setViewport
	 * @description This function sets the style of the viewport based on the options provided. It resizes the map, calculates the height and width of the container, adjusts the height and width of the viewport, extends the viewport style, sets padding, and returns the updated viewport element.
	 * @param {Object} options - The options object containing style properties for the viewport.
	 * @param {string} [options.position='absolute'] - The position property for the viewport.
	 * @param {string} [options.margin='auto'] - The margin property for the viewport.
	 * @param {string} [options.top=''] - The top property for the viewport.
	 * @param {string} [options.left=this.viewportLeft] - The left property for the viewport.
	 * @param {string} [options.bottom=this.viewportBottom] - The bottom property for the viewport.
	 * @returns {Element} The updated viewport element.
	 */
    this.setViewport = function (options) {
        var style = options || {
            position: 'absolute',
            margin: 'auto',
            top: '',
            left: this.viewportLeft,
            bottom: this.viewportBottom
        };

        this.map.resize();

        var height = this.container.getBoundingClientRect().height;
        var width = this.container.getBoundingClientRect().width;

        style.height = `${Number.parseInt(height) - this.viewportHeightOffset}px`;
        style.width = `${Number.parseInt(width) - this.viewportWidthOffset}px`;

        ctx.Utilities.extend(this.viewport.style, style);

        this.setPadding();
        return this.viewport;
    }

	/**
	 * @function
     * @memberof module:geoflo.Map
	 * @name setOptions
	 * @description This function allows setting various options for the map such as maxPitch, maxZoom, minPitch, and minZoom.
	 * @param {Object} options - The options object containing the map options.
	 * @param {number} [options.maxPitch] - The maximum pitch value for the map.
	 * @param {number} [options.maxZoom] - The maximum zoom level for the map.
	 * @param {number} [options.minPitch] - The minimum pitch value for the map.
	 * @param {number} [options.minZoom] - The minimum zoom level for the map.
	 */
    this.setOptions = function (options) {
        options = options || this.options;
        if (options.maxPitch) this.map.setMaxPitch(options.maxPitch);
        if (options.maxZoom) this.map.setMaxZoom(options.maxZoom);
        if (options.minPitch) this.map.setMinPitch(options.minPitch);
        if (options.minZoom) this.map.setMinZoom(options.minZoom);
    }

	/**
	 * @function
     * @memberof module:geoflo.Map
	 * @name setPadding
	 * @description Calculates the padding values for the container by comparing its position with the viewport.
	 * @returns {Object} The padding object containing left, right, top, and bottom padding values.
	 * @params {void}
	 */
    this.setPadding = function () {
        var left = (this.container.getBoundingClientRect().left) - (this.viewport.getBoundingClientRect().left);
        var right = (this.container.getBoundingClientRect().right) - (this.viewport.getBoundingClientRect().right);
        var top = (this.container.getBoundingClientRect().top) - (this.viewport.getBoundingClientRect().top);
        var bottom = (this.container.getBoundingClientRect().bottom) - (this.viewport.getBoundingClientRect().bottom);
        var noPadding = this.container.getBoundingClientRect().width < 20;

        this.padding = {
            left: noPadding ? 0 : Math.abs(left),
            right: noPadding ? 0 : Math.abs(right),
            top: noPadding ? 0 : Math.abs(top),
            bottom: noPadding ? 0 : Math.abs(bottom)
        };

        this.map.setPadding(this.padding);    
        return this.padding;
    }


	/**
	 * @function
     * @memberof module:geoflo.Map
	 * @name onEvent
	 * @description Logs the event passed as a parameter to the console.
	 * @param {Event} event - The event object to be logged.
     * @event
	 */
    this.onEvent = function (event) {
        console.log(event)
    }
    
	/**
	 * @function
     * @memberof module:geoflo.Map
	 * @name onLoad
	 * @description This function is triggered when the map loads. It sets up the map container, inserts the viewport, sets options, and loads the map.
	 * @param {Event} event - The event object triggered when the map loads.
     * @event
	 */
    this.onLoad = function (event) {
        if (!event.target || !event.target.getContainer) throw new Error('MapboxGL map object is required!');
        this.map = event.target;
        this.container = this.map._container;
        this.container.insertBefore(this.viewport, this.container.firstChild);
        this.setOptions();
        this.map.off('style.load', this.onStyleLoad.bind(this));
        this.map.on('style.load', this.onStyleLoad.bind(this));
        return ctx.load();
    }

	/**
	 * @function
     * @memberof module:geoflo.Map
	 * @name onStyleLoad
	 * @description This function sets the URL for the glyph manager based on the provided parameters and triggers a redraw after a delay.
	 * @param {Event} event - The event object triggering the function.
     * @event
	 */
    this.onStyleLoad = function (event) {
        this.map.style && this.map.style.glyphManager ? this.map.style.glyphManager.setURL(`mapbox://fonts/${ctx.dev}/{fontstack}/{range}.pbf`, ctx.dev) : false;
        setTimeout(function() { ctx.redraw(); }, 500)
    }

	/**
	 * @function
     * @memberof module:geoflo.Map
	 * @name onMapMove
	 * @description This function is called when the map is moved. It handles the event triggered by the map movement.
	 * @param {Event} event - The event object containing information about the map movement.
	 * @returns {void}
     * @event
	 */
    this.onMapMove = function (event) {

    }

    this.init(options);
}



/***/ }),

/***/ "./src/map/Mesh.js":
/*!*************************!*\
  !*** ./src/map/Mesh.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Mesh)
/* harmony export */ });
/**
 * @class
 * @memberof module:geoflo
 * @name Mesh
 * @description A class that handles the snapping mesh index functionality in a mapping context.
 * @param {Object} originalFeatures - The original features to be meshed
 * @param {Boolean} linesOnly - A boolean value to determine if only lines are to be considered
 */
const Mesh = function (originalFeatures, linesOnly) {
    var segmentId = 1;
    var allSegments = [];
    var featureIndex = {};

    const ctx = this.geoflo;

	/**
	 * @function
     * @memberof module:geoflo.Mesh
	 * @name addNewFeatures
	 * @description This function takes new features, splits them into segments, checks for intersections, and updates the existing segments accordingly.
	 * @param {Array} features - An array of new features to be added.
	 * @return {Array} Returns an array containing all mesh segments.
	 */
    this.addNewFeatures = function(features) {
        var allNewFeatures = splitAndCheckForIntersections(features);
        var newSegments = splitIntoTwoPointSegmentsAndAddIds(allNewFeatures);
        var segmentsWithCutPoints = checkForIntersections(newSegments, allSegments);
        allSegments = [].concat(ctx.Utilities.consumableArray(cutSegments(allSegments, segmentsWithCutPoints)), ctx.Utilities.consumableArray(cutSegments(newSegments, segmentsWithCutPoints)));
        return this.getFeatures();
    };

	/**
	 * @function
     * @memberof module:geoflo.Mesh
	 * @name getFeatures
	 * @description Returns all of the features in the mesh.
	 * @return {Array} Returns an array containing all feature segments.
	 */
    this.getFeatures = function() {
        return allSegments;
    };

	/**
	 * @function
     * @memberof module:geoflo.Mesh
	 * @name splitSegmentAtPoint
	 * @description This function takes a segment ID and coordinates of a point to split the segment. It creates two new segments by splitting the original segment at the specified point and updates the feature index.
	 * @param {string} segmentId - The ID of the segment to be split.
	 * @param {Array<number>} pointCoords - The coordinates of the point where the segment should be split.
	 */
    this.splitSegmentAtPoint = function(segmentId, pointCoords) {
        var feature = featureIndex[segmentId];
        if (feature !== undefined) {
            var pos = allSegments.indexOf(feature);
            allSegments.splice(pos, 1);
            var line1 = ctx.Utilities.createLineWithLength([pointCoords, feature.geometry.coordinates[0]]);
            var line2 = ctx.Utilities.createLineWithLength([pointCoords, feature.geometry.coordinates[1]]);
            addFeatureToIndex(line1);
            addFeatureToIndex(line2);
            allSegments.push(line1, line2);
        } else {
            console.error("splitSegmentAtPoint: no original feature for id ", segmentId);
        }
    };

	/**
	 * @function
     * @memberof module:geoflo.Mesh
	 * @name getFeaturesFromIndex
	 * @description This function takes an array of features and retrieves the corresponding features from an index based on their IDs.
	 * @param {Array} features - The array of features to retrieve from the index.
	 * @returns {Array} The array of features retrieved from the index.
	 */
    this.getFeaturesFromIndex = function(features) {
        var result = [];
        features.forEach(function(feature) {
            var id = feature.id || feature.properties.id;
            var originalFeature = featureIndex[id];
            if (originalFeature !== undefined) {
                result.push(originalFeature);
            }
        });
        return result;
    };

	/**
	 * @function
     * @memberof module:geoflo.Mesh
	 * @name getFeatureById
	 * @description Retrieves a feature by its ID.
	 * @param {number} id - The ID of the feature to retrieve.
	 * @returns {object} The feature object corresponding to the provided ID.
	 */
    this.getFeatureById = function(id) {
        return getFeatureById(id);
    };

	/**
	 * @function
     * @memberof module:geoflo.Mesh
	 * @name getFeaturesByParentId
	 * @description Retrieves features based on the parent ID. The parent ID is used to retrieve cold features associated with the segment.
	 * @param {number} id - The parent ID to retrieve features for.
	 * @returns {Array} - An array of features associated with the parent ID.
	 */
    this.getFeaturesByParentId = function(id) {
        return getFeaturesByParentId(id);
    };

	/**
	 * @function
     * @memberof module:geoflo.Mesh
	 * @name removeFeature
	 * @description Removes a feature with the specified ID.
	 * @param {number} id - The ID of the feature to be removed.
	 * @returns {boolean} - Returns true if the feature was successfully removed, false otherwise.
	 */
    this.removeFeature = function (id) {
        return removeFeature(id);
    };


    if (originalFeatures) allSegments = splitAndCheckForIntersections(originalFeatures);


    function addFeatureToIndex(feature, parent) {
        if (featureIndex[segmentId] || getFeatureById(segmentId)) return false;

        featureIndex[segmentId] = feature;
        feature.id = segmentId;
        feature.parent = parent;

        ctx.Utilities.setProperty(feature, 'id', segmentId);
        ctx.Utilities.setProperty(feature, 'parent', parent);

        segmentId++;
        return true;
    }

    function addClickSegementsToMesh() {
        if (!ctx.options.snapping.enable) return false;
    
        var meshFeatures = [];
    
        if (ctx.closestPoint && ctx.closestPoint.borders && ctx.closestPoint.id !== undefined) {
            ctx.meshIndex.splitSegmentAtPoint(ctx.closestPoint.id, ctx.closestPoint.coords);
            ctx.updateMeshData();
        }
    
        if (ctx.snapFeature) {
            if (ctx.snapFeature.geometry.type === "LineString") {
                if (!ctx.Utilities.isEmptyLineString(ctx.snapFeature)) {
                    meshFeatures.push(ctx.snapFeature);
                }
            } else if (ctx.snapFeature.geometry.type === "Point") {
                ctx.Utilities.setProperty(ctx.snapFeature, 'startPoint', true);
                ctx.startPoint = ctx.Utilities.cloneDeep(ctx.snapFeature);
                meshFeatures.push(ctx.snapFeature);
            }
        }
    
        if (meshFeatures.length > 0) ctx.addFeaturesToMesh(meshFeatures);
    }

    function coordinatesToLineStrings(coords, result, parent) {
        var firstPoint = turf.truncate(turf.point(coords[0]), { precision: 7, coordinates: 2, mutate: true });
        var secondPoint = null;

        for (var index = 1; index < coords.length; index++) {
            secondPoint = turf.truncate(turf.point(coords[index]), { precision: 7, coordinates: 2, mutate: true });
            
            if (!ctx.Utilities.isPointEqual(firstPoint.geometry.coordinates, secondPoint.geometry.coordinates)) {
                var line = turf.lineString([firstPoint.geometry.coordinates, secondPoint.geometry.coordinates]);
                var added = addFeatureToIndex(line, parent);
                added ? result.push(line) : false;
            }

            firstPoint = secondPoint;
        }
    }

    function splitIntoTwoPointSegmentsAndAddIds(features) {
        var result = [];
        if (!features || !features.length) return result;

        features.forEach(function(feature) {
            var type = feature.geometry.type;
            var id = feature.parent || feature.properties.parent || feature.id || feature.properties.id;
            var added;

            if (linesOnly && type !== "LineString" && !feature.properties.unfill) {
                feature = ctx.Utilities.cloneDeep(feature);
                added = addFeatureToIndex(feature, id);
                return added ? result.push(feature) : false;
            }

            if (type === "MultiPolygon") {
                feature.geometry.coordinates.forEach(function(coords) {
                    coords.forEach(function(subCoords) {
                        coordinatesToLineStrings(subCoords, result, id);
                    });
                });
            } else if (type === "Polygon") {
                feature.geometry.coordinates.forEach(function(coords) {
                    coordinatesToLineStrings(coords, result, id);
                });
            } else if (type === "MultiLineString") {
                feature.geometry.coordinates.forEach(function(coords) {
                    coordinatesToLineStrings(coords, result, id);
                });
            } else if (type === "LineString") {
                coordinatesToLineStrings(feature.geometry.coordinates, result, id);
            } else if (type === "Point") {
                feature = ctx.Utilities.cloneDeep(feature);
                added = addFeatureToIndex(feature, id);
                added ? result.push(feature) : false;
            }
        });

        return result;
    }

    function appendCutFeatures(segmentsWithCutPoints, feature, cutPointFeatures) {
        var id = feature.id || feature.properties.id;
        var segCutPoints = segmentsWithCutPoints[id];
    
        if (segCutPoints === undefined) {
            segCutPoints = [];
            segmentsWithCutPoints[id] = segCutPoints;
        }
    
        cutPointFeatures.forEach(function(feature) {
            var newCutPoint = ctx.Utilities.reducePrecision(feature.geometry.coordinates);
            var cutPoint = segCutPoints.findIndex(function(element) { return element[0] === newCutPoint[0] && element[1] === newCutPoint[1]; });
            if (cutPoint === -1) { segCutPoints.push(newCutPoint); }
        });
    };

    function checkForIntersections(knownSegments, newSegments) {
        var segmentsWithCutPoints = {};

        var processIntersectionPoint = function processIntersectionPoint(point, feature1, feature2) {
            var pointCoords = point.geometry.coordinates;
            var seg1Coords = feature1.geometry.coordinates;
            var seg2Coords = feature2.geometry.coordinates;
            var addFeature1Point = false;
            var addFeature2Point = false;
            var closestPointAdded = false;

            if (!ctx.Utilities.isPointEqual(pointCoords, seg1Coords[0]) && !ctx.Utilities.isPointEqual(pointCoords, seg1Coords[1])) {
                var endpoint1 = turf.point(seg1Coords[0]);
                var endpoint2 = turf.point(seg1Coords[1]);
                var distanceEndpoint1 = turf.distance(point, endpoint1);
                var distanceEndpoint2 = turf.distance(point, endpoint2);

                var closestEndpoint = distanceEndpoint1 < distanceEndpoint2 ? endpoint1 : endpoint2;

                var pointOnLine = turf.pointOnLine(feature2, closestEndpoint);
                if (pointOnLine.properties.dist < ctx.statics.constants.MIN_DISTANCE) {
                    appendCutFeatures(segmentsWithCutPoints, feature2, [closestEndpoint]);
                    closestPointAdded = true;
                } else {
                    addFeature1Point = true;
                }
            }
            if (!ctx.Utilities.isPointEqual(pointCoords, seg2Coords[0]) && !ctx.Utilities.isPointEqual(pointCoords, seg2Coords[1])) {
                var _endpoint = turf.point(seg2Coords[0]);
                var _endpoint2 = turf.point(seg2Coords[1]);
                var _distanceEndpoint = turf.distance(point, _endpoint);
                var _distanceEndpoint2 = turf.distance(point, _endpoint2);

                var _closestEndpoint = _distanceEndpoint < _distanceEndpoint2 ? _endpoint : _endpoint2;

                var _pointOnLine = turf.pointOnLine(feature1, _closestEndpoint);
                if (_pointOnLine.properties.dist < ctx.statics.constants.MIN_DISTANCE) {
                    appendCutFeatures(segmentsWithCutPoints, feature1, [_closestEndpoint]);
                    closestPointAdded = true;
                } else {
                    addFeature2Point = true;
                }
            }

            if (!closestPointAdded) {
                if (addFeature1Point) {
                    appendCutFeatures(segmentsWithCutPoints, feature1, [point]);
                }
                if (addFeature2Point) {
                    appendCutFeatures(segmentsWithCutPoints, feature2, [point]);
                }
            }
        };

        var checkIfPointInCloseRange = function checkIfPointInCloseRange(feature, coords) {
            var pointOnline = turf.pointOnLine(feature, turf.point(coords));
            if (pointOnline.properties.dist < ctx.statics.constants.MIN_DISTANCE) {
                if (!ctx.Utilities.isPointAtVertex(feature.geometry.coordinates, coords)) {
                    appendCutFeatures(segmentsWithCutPoints, feature, [pointOnline]);
                    return true;
                }
            }
            return false;
        };

        var sameSegments = knownSegments === newSegments;

        for (var knownIndex = 0; knownIndex < knownSegments.length; knownIndex++) {
            var segmentFeature1 = knownSegments[knownIndex];
            var feature1Type = segmentFeature1.geometry.type;

            for (var newIndex = sameSegments ? knownIndex + 1 : 0; newIndex < newSegments.length; newIndex++) {
                var segmentFeature2 = newSegments[newIndex];
                var feature2Type = segmentFeature2.geometry.type;
                var id = segmentFeature2.id || segmentFeature2.properties.id;

                if (feature1Type === "LineString" && feature2Type === "LineString") {
                    if (ctx.Utilities.isOverlapping(segmentFeature1, segmentFeature2)) {
                        var intersectionPoints = turf.lineIntersect(segmentFeature1, segmentFeature2).features;

                        if (intersectionPoints.length > 0) {
                            if (intersectionPoints.length > 1) console.error(intersectionPoints.length + " intersection points received");
                            var point = intersectionPoints[0];
                            processIntersectionPoint(point, segmentFeature1, segmentFeature2);
                        } else {
                            var seg1Coords = segmentFeature1.geometry.coordinates;
                            var seg2Coords = segmentFeature2.geometry.coordinates;
                            checkIfPointInCloseRange(segmentFeature1, seg2Coords[0]);
                            checkIfPointInCloseRange(segmentFeature1, seg2Coords[1]);
                            checkIfPointInCloseRange(segmentFeature2, seg1Coords[0]);
                            checkIfPointInCloseRange(segmentFeature2, seg1Coords[1]);
                        }

                        if (getFeatureById(id)) {
                            console.log('Existing Line: ', segmentFeature2)
                            var pos = allSegments.indexOf(getFeatureById(id));
                            allSegments.splice(pos, 1);
                        }
                    }
                } else if (feature1Type === "Point" || feature2Type === "Point") {
                    if (feature2Type === "Point" && feature2Type === "Point") {
                        console.log("Point & Point");
                    } else {
                        console.log("Point & LineString");
                        var _point = feature1Type === "Point" ? segmentFeature1 : segmentFeature2;
                        var line = feature1Type === "LineString" ? segmentFeature1 : segmentFeature2;

                        id = _point.id || _point.properties.id;

                        if (checkIfPointInCloseRange(line, _point.geometry.coordinates)) {
                            segmentsWithCutPoints[id] = [];
                        }
                    }

                    if (getFeatureById(id)) {
                        console.log('Existing Point: ', segmentFeature2)
                        var pos = allSegments.indexOf(getFeatureById(id));
                        allSegments.splice(pos, 1);
                    }
                }
            }
        }

        return segmentsWithCutPoints;
    }

    function cutSegments(newSegments, segmentsWithCutPoints) {
        var result = [];

        newSegments.forEach(function(segment) {
            var id = segment.id || segment.properties.id;

            if (segment.geometry.type === "LineString") {
                var cutPoints = segmentsWithCutPoints[id];

                if (cutPoints !== undefined) {
                    var fc = turf.lineSplit(segment, turf.multiPoint(cutPoints));
                    turf.featureEach(fc, function(feature) {
                        var length = turf.lineDistance(feature);
                        if (length > ctx.statics.constants.MIN_SEGMENT_LENGTH) {
                            ctx.Utilities.setProperties(feature, { length: length });
                            addFeatureToIndex(feature);
                            result.push(feature);
                        } else {
                            console.error("0 length feature (", length, ") after line split: ", JSON.stringify(feature));
                        }
                    });
                } else {
                    var length = turf.lineDistance(segment);
                    if (length > ctx.statics.constants.MIN_SEGMENT_LENGTH) {
                        ctx.Utilities.setProperties(segment, { length: length });
                        result.push(segment);
                    } else {
                        console.error("0 length feature (", length, ") existing segment: ", JSON.stringify(segment));
                    }
                }
            } else {
                var _cutPoints = segmentsWithCutPoints[id];

                if (_cutPoints === undefined) {
                    result.push(segment);
                }
            }
        });

        return result;
    }

    function splitAndCheckForIntersections(newFeatures) {
        var newFeaturesSegments = splitIntoTwoPointSegmentsAndAddIds(newFeatures);
        if (linesOnly) return newFeaturesSegments;
        var newFeaturesWithCutPoints = checkForIntersections(newFeaturesSegments, newFeaturesSegments);
        return cutSegments(newFeaturesSegments, newFeaturesWithCutPoints);
    }

    function getFeatureById(id) {
        return allSegments.find(function(f) { return f.id === id || f.properties.id === id }) 
    }

    function getFeaturesByParentId(id) {
        return allSegments.filter(function(f) { return f.parent === id || f.properties.parent === id })
    }

    function removeFeature(id) {
        var features = getFeaturesByParentId(id);
        
        if (features && features.length) {
            features.forEach(function(feature) {
                var pos = allSegments.indexOf(feature);
                allSegments.splice(pos, 1);
            })
            
            ctx.updateMeshData();
        }

        return allSegments;
    }
};



/***/ }),

/***/ "./src/mode/Draw.js":
/*!**************************!*\
  !*** ./src/mode/Draw.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Draw)
/* harmony export */ });
/**
 * @mixin
 * @memberof module:geoflo
 * @name Draw
 * @description A class that handles drawing functionality in a mapping context.
 * @param {Object} ctx - The GeoFlo context object
 */
function Draw (ctx) {
    this.id = 'draw';

	/**
	 * @function
     * @memberof module:geoflo.Draw
	 * @name canHandle
	 * @description Checks if the given modeName is equal to the constant mode DRAW.
	 * @param {string} modeName - The name of the mode to be checked.
	 * @returns {boolean} Returns true if the modeName is equal to DRAW, false otherwise.
	 */
    this.canHandle = function (modeName) {
        return ctx.statics.constants.modes.DRAW === modeName;
    }

	/**
	 * @function
     * @memberof module:geoflo.Draw
	 * @name activate
	 * @description This function activates the drawing mode with the provided options. It sets up the necessary properties and event listeners for drawing features on the map.
	 * @param {Object} options - The options for activating the drawing mode.
	 * @param {Object} [options.feature] - The feature to be edited or drawn.
	 * @param {String} [options.type] - The type of feature to be drawn.
	 * @param {Object} [options.lngLat] - The longitude and latitude coordinates for drawing.
	 * @param {String} [options.id] - The unique identifier for the feature.
	 * @returns {Object} Returns the current instance for method chaining.
	 */
    this.activate = function (options={}) {
        if (this.activated) return false;
        if (ctx.currentMode.id !== this.id) return options.mode = this.id, ctx.setMode(options);

        this.activated = true;
        this._handleHistory = this.handleHistory.bind(this);
        this.history = [];
        this.undo = [];

        if (options.feature) options.type = editMode(options.feature);
        ctx.drawMode = !ctx.editMode;
        
        var lngLat = options.lngLat;
        delete options.lngLat;

        var newType = this.type = options.type;
        var properties = options.feature ? options.feature.properties : options;
        
        this.properties = ctx.Utilities.cloneDeep(properties);
        delete this.properties.mode;

        const id = options.id || properties.id || URL.createObjectURL(new Blob([])).slice(-36);

        this.properties.id = id;
        this.properties.type = newType;
        this.properties.style = {};

        ctx.setButtons();
        ctx.setActiveButton(newType);
        
        if (ctx.Utilities.isPoint(ctx.hotFeature, newType)) this.isPoint = true;

        ctx.fire('draw.activate', {
            id: id,
            type: newType,
            activated: this.activated,
            editing: ctx.editMode,
            feature: ctx.hotFeature || options.feature,
            properties: this.properties
        })

        ctx.on('source.hot', this._handleHistory);
        if (lngLat) this.handleMove({ lngLat: lngLat });
        ctx.options.painting.enable || (ctx.mobile && newType === 'Rectangle') ? ctx.activatePainting() : false;
        this.updateHotSource();
        return this;
    }

	/**
	 * @function
     * @memberof module:geoflo.Draw
	 * @name deactivate
	 * @description Deactivates the draw feature by canceling the current edit, cleaning up the draw, setting buttons, and handling events.
	 * @param {boolean} cancel - Flag to determine if the edit should be canceled.
	 * @param {boolean} standby - Flag to indicate if the feature is in standby mode.
	 * @param {object} feature - The feature to be deactivated.
	 */
    this.deactivate = function (cancel, standby, feature) {
        if (!this.activated) return false;
        if (cancel) this.cancelEdit(standby, feature);
        cleanupDraw(this);
        ctx.setButtons();
        ctx.off('source.hot', this._handleHistory);
        ctx.fire('draw.deactivate', { activated: this.activated });
        !ctx.options.repeatDraw ? ctx.setMode() : this.activate(this.properties);
    }



	/**
	 * @function
     * @memberof module:geoflo.Draw
	 * @name updateHotSource
	 * @description This function updates the hot source feature with new properties and assigns it to the ctx.hotFeature. It then updates the data of the VERTEX and HOT sources on the map with the updated feature.
	 * @param {Object} feature - The feature object to be updated.
	 * @param {Object} properties - The new properties to be assigned to the feature.
	 * @returns {Object} The updated hot source feature.
	 */
    this.updateHotSource = function (feature, properties) {
        if (feature) ctx.hotFeature = feature;
        if (!ctx.hotFeature || ctx.overpassDownloading) return;
        ctx.hotFeature.properties = ctx.Utilities.assignDeep(ctx.hotFeature.properties, properties || {});
        ctx.hotFeature.properties.style = ctx.hotFeature.properties.style || {};
        ctx.map.getSource(ctx.statics.constants.sources.VERTEX).setData(turf.featureCollection([ctx.hotFeature]));
        ctx.map.getSource(ctx.statics.constants.sources.HOT).setData(turf.featureCollection([ctx.hotFeature]));
        return ctx.hotFeature;
    }

	/**
	 * @function
     * @memberof module:geoflo.Draw
	 * @name deleteVertex
	 * @description Deletes a vertex from the current feature being edited on the map.
	 * @param {number} index - The index of the vertex to be deleted.
	 * @returns {void}
	 */
    this.deleteVertex = function (index) {
        if (ctx.hotFeature) {
            const coords = ctx.hotFeature.geometry.coordinates;
            index = index !== undefined ? index : coords.length - 1;

            if (coords.length > 1) {
                coords.splice(index, 1);
                ctx.lastClick = { coords: coords[coords.length - 1] };

                if (coords.length > 0) {
                    ctx.snapFeature = turf.point(coords[coords.length - 1]);
                } else {
                    ctx.snapFeature = null;
                }

                if (coords.length > 1) {
                    ctx.map.getSource(ctx.statics.constants.sources.HOT).setData(turf.featureCollection([ctx.hotFeature]));
                } else {
                    ctx.hotFeature = null;
                    ctx.map.getSource(ctx.statics.constants.sources.HOT).setData(turf.featureCollection([]));
                }

                ctx.fire('vertex.delete', { coords: coords, index: index, feature: ctx.hotFeature })
            }

            if (ctx.lastMouseEvent) {
                ctx.currentMode.handleMove ? ctx.currentMode.handleMove(ctx.lastMouseEvent) : false;
            }
        } else if (ctx.snapFeature) {
            ctx.snapFeature = null;
            ctx.lastClick = null;
            ctx.map.getSource(ctx.statics.constants.sources.SNAP).setData(turf.featureCollection([]));
        }
    }

	/**
	 * @function
     * @memberof module:geoflo.Draw
	 * @name getFeature
	 * @description Retrieves the hot feature from the context.
	 * @returns {any} The hot feature stored in the context.
	 */
    this.getFeature = function () {
        return ctx.hotFeature;
    }

	/**
	 * @function
     * @memberof module:geoflo.Draw
	 * @name selectFeature
	 * @description Selects a feature based on the provided ID.
	 * @param {string} id - The ID of the feature to be selected.
	 * @returns {boolean} Returns false if no ID is provided, otherwise returns the result of selecting the feature.
	 */
    this.selectFeature = function (id) {
        if (!id) return false;
        ctx.setMode();
        return ctx.currentMode.selectFeature(id);
    }

	/** 
	 * @function
     * @memberof module:geoflo.Draw
	 * @name saveEdit
	 * @description This function saves the edited feature in the map.
	 * @param {Object} feature - The feature to be saved.
	 * @returns {boolean} - Returns true if the feature is successfully saved, false otherwise.
	 */
    this.saveEdit = function (feature) {
        var hot = ctx.hotFeature;
        if (!hot) return false;

        var type = hot.properties.type || feature.properties.type || this.type;
        feature = feature || hot;

        this.savingEdit = true;
        return finishDraw(type, feature);
    }

	/**
	 * @function
     * @memberof module:geoflo.Draw
	 * @name cancelEdit
	 * @description This function cancels the current editing operation by setting the 'cancelled' flag to true. If the 'feature' parameter is not provided or does not have a 'type' property, it sets 'ctx.hotFeature' to null and finishes the draw process. It then sets the 'standby' property, updates 'ctx.hotFeature', fires a 'draw.cancel' event with the feature, and returns the result of 'finishDraw()'.
	 * @param {boolean} standby - The standby value to set.
	 * @param {object} feature - The feature being edited.
	 * @returns {any} The result of the 'finishDraw()' function.
	 */
    this.cancelEdit = function (standby, feature) {
        this.cancelled = true;
        if (!feature || !feature.properties.type) return ctx.hotFeature = null, finishDraw();
        this.standby = standby;
        ctx.hotFeature = feature;
        ctx.fire('draw.cancel', { feature: feature });
        return finishDraw();
    }



	/**
	 * @function
     * @memberof module:geoflo.Draw
	 * @name handleDown
	 * @description Handles the mouse or touch down event on the map. Updates the mouse/touch position, adds a vertex if allowed, and sets features for pinning.
	 * @param {Object} event - The event object containing information about the mouse or touch event.
	 * @returns {void}
	 */
    this.handleDown = function (event) {
        var point;

        ctx.mouseIsDown = [event.lngLat.lng, event.lngLat.lat];

        if (event.touch) {
            ctx.touchDown = true;
            point = turf.point(ctx.mouseIsDown);
            onVertex(getVertex(point));
        }
        
        if (ctx.canAddVertex) {
            point = addVertex(ctx.canAddVertex, event);
            return onVertex(getVertex(point), true);
        }

        ctx.Pinning.setFeatures(ctx.snappedVertex);
        startIdleTime();
    }

	/**
	 * @function
     * @memberof module:geoflo.Draw
	 * @name handleUp
	 * @description This function is responsible for handling the mouse up event during drawing and editing operations on the map. It checks various conditions and triggers corresponding actions based on the context and user interactions.
	 * @param {Event} event - The mouse up event object.
	 * @returns {void}
	 */
    this.handleUp = function (event) {
        ctx.mouseIsDown = false;
        ctx.touchDown = false;

        if (ctx.Painting.enabled) return ctx.Painting.handleUp(event);
        if (ctx.addedVertexOnLine && !ctx.dragMoving) return;
        if (event.touch && ctx.touchMoving) return ctx.dragMoving = false;

        if (((ctx.Utilities.isPoint(ctx.hotFeature, this.type)) && ctx.snappedVertex)) return ctx.editMode ? this.saveEdit() : finishDraw(this.type);

        if (ctx.snappedVertex && ctx.dragMoving && !ctx.mapMoving && this.type !== 'Rectangle') {
            ctx.gamepadDrag = event.gamepad;

            var isLastIndex = ctx.Utilities.isLastIndex(ctx.dragIndex, ctx.hotFeature);
            isLastIndex = isLastIndex ? isLastIndex : ctx.Utilities.isPolygon(ctx.hotFeature) && ctx.dragIndex == 0 ? true : false;
           
            var coords = ctx.Utilities.getLastIndexCoords(ctx.hotFeature);

            onVertex(getVertex(turf.point(ctx.snappedVertex)));
            this.updateHotSource();
            if (isLastIndex) setTimeout(function() { ctx.lastClick = { coords: coords } }, 100)
        }
        
        ctx.pinableFeatures = [];
        ctx.mouseIsIdle = false;
        addText.call(this, this.type);
        ctx.refreshMeshData();
    }

	/**
	 * @function
     * @memberof module:geoflo.Draw
	 * @name handleClick
	 * @description This function processes the click event for drawing features on the map. It determines the action based on the event type and context state, such as editing mode, touch input, vertex addition, and gamepad interaction.
	 * @param {Object} event - The event object containing information about the click event.
	 * @returns {Object} The updated event object or the result of the drawing action.
	 */
    this.handleClick = function (event) {
        if (event.finish) return ctx.editMode ? this.saveEdit() : finishDraw(this.type);
        if (event.touch && ctx.touchMoving) return ctx.touchMoving = false, ctx.Snapping.setFeature(), this.updateHotSource();
        if (event.touch) ctx.touchClick = true;

        if (ctx.addedVertexOnLine) {
            ctx.Snapping.setFeature();
            this.updateHotSource();
            onVertex(getVertex(ctx.addedVertexOnLine));
            this.handleDrag(event);
            ctx.dragMoving = false;
            ctx.gamepadDrag = false
            ctx.mouseIsIdle = false;
            return event;
        }

        if (ctx.gamepadDrag) return ctx.gamepadDrag = false;

        if (ctx.editMode && (this.type === 'Polygon' || this.type === 'Text')) return;

        if (!this.firstClick && !ctx.drawStarted) {
            ctx.drawStarted = true;
            ctx.fire('draw.start', { type: this.type, editing: ctx.editMode, coords: [event.lngLat.lng, event.lngLat.lat] });
        } else {
            ctx.fire('vertex.add', { type: this.type, coords: [event.lngLat.lng, event.lngLat.lat] });
        }

        var lastPoint = ctx.closestPoint || { coords: [event.lngLat.lng, event.lngLat.lat] };
        var point = turf.point(lastPoint.coords);

        point.properties = this.properties;

        ctx.lastMove = lastPoint.coords.length > 1 ? { lat: lastPoint.coords[lastPoint.coords.length-1][1], lng: lastPoint.coords[lastPoint.coords.length-1][0] } : false;        

        if (!ctx.startPoint) {
            if (this.type === 'Rectangle') {
                ctx.startPoint = lastPoint.coords;

                ctx.hotFeature = turf.polygon([[
                    ctx.startPoint,
                    [event.lngLat.lng, event.lngLat.lat],
                    [ctx.startPoint[0], event.lngLat.lat],
                    ctx.startPoint
                ]]);
    
                return ctx.Utilities.setProperty(ctx.hotFeature, 'type', this.type);
            } else if (this.type === 'Polygon') {
                ctx.startPoint = lastPoint.coords;
            }
        }
        
        if (!ctx.snapFeature && lastPoint) ctx.snapFeature = lastPoint;

        if (needsToFinish(this.type, lastPoint.coords)) return finishDraw(this.type, point);
        
        this.firstClick = ctx.firstClick ? false : { coords: lastPoint.coords };

        ctx.lastClick = lastPoint;
        ctx.firstClick = ctx.firstClick ? ctx.firstClick : { coords: lastPoint.coords };
        ctx.Snapping.setFeature();
        addText.call(this, this.type);
        ctx.Exploring.setFeatures(lastPoint.coords, { set: true });
        delete ctx.touchClick;
        return this.updateHotSource();
    }

	/**
	 * @function
     * @memberof module:geoflo.Draw
	 * @name handleMove
	 * @description This function determines the behavior based on the event type and context state. It handles various actions such as dragging, painting, snapping, routing, and snapping to points.
	 * @param {Object} event - The event object containing information about the mouse or touch event.
	 * @returns {boolean} Returns false in certain conditions to prevent default behavior.
	 */
    this.handleMove = function (event) {
        if (event.touch && ctx.mouseIsDown) ctx.touchMoving = true;
        if (ctx.overpassDownloading) return false;
        if (ctx.mouseIsDown && ctx.canAddVertex) return false;
        if (ctx.canDragMove && ctx.snappedVertex && ctx.mouseIsDown) return this.handleDrag(event);
        if (ctx.mouseIsDown && ctx.Painting.enabled) return this.handlePainting(event);
        if (event.touch && ctx.touchMoving) return ctx.snapFeature = false;

        var button = !event.originalEvent ? false : event.originalEvent.buttons !== undefined ? event.originalEvent.buttons : event.originalEvent.which;
        if (button === 1) return false;

        var calculateRoute = ctx.Routing.enabled;
        if (event.originalEvent && event.originalEvent.altKey) calculateRoute = false;

        var snapToPoint = ctx.Snapping.enabled;
        if (event.originalEvent && event.originalEvent.shiftKey) snapToPoint = false;

        var evtCoords = [event.lngLat.lng, event.lngLat.lat];
        var isPoint = ctx.Utilities.isPoint(ctx.hotFeature, this.type)
        var editPolygon = ctx.editMode && (this.type === 'Polygon' || this.type === 'Rectangle');
        var point = turf.point(evtCoords);
        var snapFeature = null;

        if (editPolygon) {
            snapFeature = point;
        } else if (snapToPoint) {
            snapFeature = ctx.Snapping.setClosest(evtCoords, isPoint);
        } else if (!isPoint) {
            snapFeature = ctx.Snapping.updateFeature(evtCoords);
        } else if (isPoint) {
            snapFeature = point;
        }

        if (calculateRoute) snapFeature = ctx.Routing.getClosest() || snapFeature;
        if (!snapFeature) snapFeature = point;

        ctx.Snapping.addFeature(snapFeature, this.properties, editPolygon);
        onVertex(getVertex(point));
        
        if (!snapFeature && this.isPoint) delete this.isPoint;
        if (editPolygon && calculateRoute) ctx.map.getSource(ctx.statics.constants.sources['ROUTE']).setData(turf.featureCollection([]));

        if (this.type === 'Rectangle') return this.handleRectangle(event);
        if (this.type === 'Icon') return this.handleIcon(event, ctx.snapFeature);
        if (this.type === 'Text') return this.handleText(event, ctx.snapFeature);
    }

	/**
	 * @function
     * @memberof module:geoflo.Draw
	 * @name handleDrag
	 * @description This function is responsible for handling the drag event of a vertex on the map. It updates the position of the vertex based on the user's interaction and triggers various actions accordingly.
	 * @param {Object} event - The event object containing information about the drag event.
	 * @returns {boolean} Returns false if the drag index is not valid.
	 */
    this.handleDrag = function (event) {
        var validIndex = ctx.dragIndex > -1;
        
        if (!validIndex) {
            offVertex();
            if (ctx.mouseIsDown && ctx.Painting.enabled) this.handlePainting(event);
            return false;
        }

        !event.gamepad ? event.originalEvent.stopPropagation() : false;

        ctx.dragMoving = true;
        ctx.lastDragMove = 0;
        ctx.snappedVertex = [event.lngLat.lng, event.lngLat.lat];
        ctx.bypassRouting = true; //!event.gamepad ? event.originalEvent.altKey : false;
        ctx.bypassSnapping = !event.gamepad ? event.originalEvent.shiftKey : false;
        ctx.lastIndex = ctx.Utilities.isLastIndex(ctx.dragIndex, ctx.hotFeature);

        var vertex = turf.point(ctx.snappedVertex);

        if (ctx.lastIndex) ctx.lastClick = { coords: ctx.snappedVertex };

        if (this.type === 'Circle' || this.type === 'Icon') {
            if (!ctx.Painting.enabled) ctx.hotFeature.geometry.coordinates = ctx.snappedVertex;
        } else {
            var isLastIndex = ctx.Utilities.isLastIndex(ctx.dragIndex, ctx.hotFeature);
            ctx.hotFeature.geometry.coordinates[ctx.dragIndex] = ctx.snappedVertex;

            if (this.type === 'Polygon') {
                if (isLastIndex) ctx.hotFeature.geometry.coordinates[0] = ctx.snappedVertex;
                if (ctx.dragIndex == 0) ctx.hotFeature.geometry.coordinates[ctx.hotFeature.geometry.coordinates.length -1] = ctx.snappedVertex;
            }
        }

        ctx.Utilities.setProperty(ctx.hotFeature, 'type', this.type);
        ctx.Utilities.setProperty(vertex, 'type', this.type);
        ctx.map.getSource(ctx.statics.constants.sources.ROUTE).setData(turf.featureCollection([]));
        ctx.map.getSource(ctx.statics.constants.sources.SNAP).setData(turf.featureCollection([]));
        ctx.map.getSource(ctx.statics.constants.sources.HOT).setData(turf.featureCollection([ctx.hotFeature]));
        ctx.map.getSource(ctx.statics.constants.sources.VERTEX).setData(turf.featureCollection([vertex]));
        ctx.fire('vertex.drag', { type: this.type, coords: [event.lngLat.lng, event.lngLat.lat], feature: ctx.hotFeature, vertex: vertex });
        ctx.Pinning.updateFeatures();
    }

	/**
	 * @function
     * @memberof module:geoflo.Draw
	 * @name handleTouch
	 * @description This function is responsible for handling touch events and triggering corresponding actions.
	 * @param {Event} event - The touch event object.
	 * @returns {void}
	 */
    this.handleTouch = function (event) {
        event.touch = true;

        if (event.type === 'touchstart') {
            this.handleDown(event);
        } else if (event.type === 'touchend') {
            this.handleUp(event);
            this.handleClick(event);
        } else if (event.type === 'touchmove') {
            this.handleMove(event);
        }
    }

	/**
	 * @function
     * @memberof module:geoflo.Draw
	 * @name handleOffMap
	 * @description This function is triggered when an off-map event occurs and clears the data of a specific source on the map.
	 * @param {Event} event - The event object triggering the function.
	 */
    this.handleOffMap = function (event) {
        if (ctx.map.getSource(ctx.statics.constants.sources.SNAP)) ctx.map.getSource(ctx.statics.constants.sources.SNAP).setData(turf.featureCollection([]));
    }

	/**
	 * @function
     * @memberof module:geoflo.Draw
	 * @name handleOnMap
	 * @description This function updates the data of the SNAP source on the map with the snapFeature.
	 * @param {Event} event - The event triggering the function.
	 */
    this.handleOnMap = function (event) {
        if (ctx.map.getSource(ctx.statics.constants.sources.SNAP) && ctx.snapFeature) ctx.map.getSource(ctx.statics.constants.sources.SNAP).setData(turf.featureCollection([ctx.snapFeature]));
    }

	/**
	 * @function
     * @memberof module:geoflo.Draw
	 * @name handlePainting
	 * @description This function is triggered when painting on the map. It disables drag pan, sets the map class to 'painting', and updates the feature coordinates.
	 * @param {Object} event - The event object triggering the function.
	 * @returns {boolean} Returns false if mouse is not down or no coordinates are available, otherwise updates the feature coordinates.
	 */
    this.handlePainting = function (event) {
        if (!ctx.mouseIsDown) return false;
        ctx.map.dragPan.disable();
        ctx.setMapClass('painting');

        var snapCoords = ctx.snapFeature && !ctx.Painting.feature;
        var coords = event.lngLat && event.lngLat.lng ? [event.lngLat.lng, event.lngLat.lat] : false;
        if (snapCoords) coords = ctx.snapFeature.geometry.coordinates;

        if (!coords) return false;
        return ctx.Painting.updateFeature(coords);
    }

	/**
	 * @function
     * @memberof module:geoflo.Draw
	 * @name handleRectangle
	 * @description Handles the creation and manipulation of a rectangle feature on a map.
	 * @param {Object} event - The event object triggering the function.
	 * @returns {void}
	 */
    this.handleRectangle = function (event) {
        if (ctx.editMode && ctx.hotFeature) ctx.startPoint = ctx.hotFeature.geometry.coordinates[0][0];
        if (!ctx.startPoint) return;
        if (!ctx.dragMoving) ctx.Utilities.setProperty(ctx.hotFeature, 'type', this.type);
        ctx.dragMoving = true;

        var coords = ctx.snapFeature ? ctx.snapFeature.geometry.coordinates : [event.lngLat.lng, event.lngLat.lat];

        if (ctx.dragIndex > -1) {
            var startPoint = ctx.dragIndex == 0 || ctx.dragIndex == 4 ? 4 : ctx.dragIndex;
            var endPoint = startPoint == 1 ? 3 : startPoint == 2 ? 4 : startPoint == 3 ? 1 : 2;
            var leftPoint = endPoint == 1 ? 4 : endPoint == 2 ? 1 : endPoint == 3 ? 2 : 3
            var rightPoint = leftPoint == 1 ? 3 : leftPoint == 2 ? 4 : leftPoint == 3 ? 1 : 2;

            updateCoordinate(ctx.hotFeature, "0." + startPoint, coords[0], coords[1]);
            updateCoordinate(ctx.hotFeature, "0." + leftPoint, coords[0], ctx.startPoint[1]);
            updateCoordinate(ctx.hotFeature, "0." + rightPoint, ctx.startPoint[0], coords[1]);
            updateCoordinate(ctx.hotFeature, "0." + endPoint, ctx.startPoint[0], ctx.startPoint[1] );
        } else {
            updateCoordinate(ctx.hotFeature, "0.1", coords[0], ctx.startPoint[1]);
            updateCoordinate(ctx.hotFeature, "0.2", coords[0], coords[1]);
            updateCoordinate(ctx.hotFeature, "0.3", ctx.startPoint[0], coords[1]);
            updateCoordinate(ctx.hotFeature, "0.4", ctx.startPoint[0], ctx.startPoint[1] );
        }

        ctx.map.getSource(ctx.statics.constants.sources.HOT).setData(turf.featureCollection([ctx.hotFeature]));
        ctx.map.getSource(ctx.statics.constants.sources.VERTEX).setData(turf.featureCollection([ctx.hotFeature]));
    }

	/**
	 * @function
     * @memberof module:geoflo.Draw
	 * @name handleText
	 * @description Handles text input events and logs relevant properties.
	 * @param {Event} event - The event object triggering the function.
	 * @param {string} feature - The feature to be handled.
	 */
    this.handleText = function (event, feature) {
        console.log('handleText', this.properties, ctx.snapFeature);
    }

	/**
	 * @function
     * @memberof module:geoflo.Draw
	 * @name handleIcon
	 * @description Handles the icon based on the event and feature provided.
	 * @param {Event} event - The event triggering the function.
	 * @param {Object} feature - The feature object to be handled.
	 */
    this.handleIcon = function (event, feature) {
        console.log('handleIcon', this.properties, ctx.snapFeature);
    }

	/**
	 * @function
     * @memberof module:geoflo.Draw
	 * @name handleContext
	 * @description Handles the context of dragging and moving a feature vertex.
	 * @param {Event} event - The event triggering the context handling.
	 * @returns {void}
	 */
    this.handleContext = function (event) {
        if (!ctx.canDragMove || !ctx.snappedVertex) return;
        
        var validIndex = ctx.dragIndex > -1;
        if (!validIndex) return;

        ctx.hotFeature.geometry.coordinates.splice(ctx.dragIndex, 1);

        ctx.map.getSource(ctx.statics.constants.sources.HOT).setData(turf.featureCollection([ctx.hotFeature]));
        ctx.map.getSource(ctx.statics.constants.sources.VERTEX).setData(turf.featureCollection([ctx.hotFeature]));
        ctx.map.getSource(ctx.statics.constants.sources.SNAP).setData(turf.featureCollection([]));
    }

	/**
	 * @function
     * @memberof module:geoflo.Draw
	 * @name handleHistory
	 * @description Handles the history of features in the current mode.
	 * @param {Object} event - The event triggering the history update.
	 * @returns {void}
	 */
    this.handleHistory = function handleHistory (event) {
        if (ctx.dragMoving) return;

        var history = ctx.currentMode.history;
        var date = new Date();
        
        var features = event.detail.data.features;
        if (!features || !features.length) return;

        var feature = ctx.Utilities.cloneDeep(features[0]);
        feature.historyDate = date;
        history.push(feature);

        ctx.fire('feature.history', { type: ctx.currentMode.type, feature: feature, history: history });
    }

	/**
	 * @function
     * @memberof module:geoflo.Draw
	 * @name handleUndo
	 * @description This function is responsible for undoing the last action performed in the application. It retrieves the history and undo arrays from the current mode, pops the last feature from the history, sets the undo flag to true for the feature, updates the hotFeature, pushes the feature to the undo array, and updates the map source data with the hotFeature.
	 * @returns {void}
	 */
    this.handleUndo = function () {
        return alert("UNDER DEVELOPMENT");
        var history = ctx.currentMode.history;
        var undo = ctx.currentMode.undo;

        var feature = history.pop();

        feature.undo = true;
        ctx.hotFeature = feature;

        undo.push(ctx.hotFeature);
        ctx.map.getSource(ctx.statics.constants.sources.HOT).setData(turf.featureCollection([ctx.hotFeature]));
    }

	/**
	 * @function
     * @memberof module:geoflo.Draw
	 * @name handleRedo
	 * @description Handles the redo functionality (currently under development).
	 * @returns {void}
	 */
    this.handleRedo = function () {
        return alert("UNDER DEVELOPMENT");
        var redo = false
    }






    function editMode (feature) {
        var type = ctx.Features.getType(feature);
        if (!type) return alert('No Feature Type Found');
    
        ctx.currentMode.type = type;
        ctx.editMode = true;
        ctx.hotFeature = feature;
    
        ctx.Utilities.setProperty(ctx.hotFeature, 'type', type);
        ctx.Utilities.setProperty(ctx.hotFeature, 'edit', true);

        ctx.map.getSource(ctx.statics.constants.sources.SELECT).setData(turf.featureCollection([]));
    
        if (type === 'Polygon') {
            ctx.hotFeature = turf.polygonToLine(ctx.hotFeature);
        } else if (type === 'Circle') {
            ctx.map.getSource(ctx.statics.constants.sources.HOT).setData(turf.featureCollection([ctx.hotFeature]));
        } else if (type === 'Text') {
            ctx.map.getSource(ctx.statics.constants.sources.HOTTEXT).setData(turf.featureCollection([ctx.hotFeature]));
            addText.call(ctx.currentMode, type, ctx.hotFeature);
        } else {
            ctx.map.getSource(ctx.statics.constants.sources.HOT).setData(turf.featureCollection([ctx.hotFeature]));
            ctx.map.getSource(ctx.statics.constants.sources.VERTEX).setData(turf.featureCollection([ctx.hotFeature]));
        }

        var coords = ctx.Utilities.isPoint(ctx.hotFeature, type) ? ctx.hotFeature.geometry.coordinates : ctx.hotFeature.geometry.coordinates[ctx.hotFeature.geometry.coordinates.length - 1];
        
        ctx.lastClick = { coords: coords };
        ctx.Features.removeFeatures(ctx.hotFeature.properties.id);
        ctx.refreshMeshData();
        
        return ctx.currentMode.type;
    }

    function finishDraw (type, point, text) {
        var feature;
        var cancelled = ctx.currentMode.cancelled;

        if (ctx.editMode && !ctx.currentMode.savingEdit && !cancelled) return ctx.currentMode.saveEdit(point);
    
        if (cancelled || !type) {
            finishText();

            if (ctx.hotFeature) {
                ctx.removeSelection();
                ctx.removeFeature(ctx.hotFeature.id, true);
                ctx.addFeatures([ctx.hotFeature], true);
            }

            ctx.Pinning.resetFeatures();

            if (!ctx.editMode) ctx.fire('draw.cancel', { cancel: true, feature: ctx.hotFeature });
            return false;
        } else if (type === 'Text' && !text) {
            return addText.call(ctx.currentMode, type, point);
        } else if (ctx.hotFeature) {
            if (ctx.Utilities.isPoint(ctx.hotFeature, type)) {
                var coords = Array.isArray(ctx.hotFeature.geometry.coordinates[0]) ?
                ctx.hotFeature.geometry.coordinates[0] :
                [ctx.hotFeature.geometry.coordinates[0], ctx.hotFeature.geometry.coordinates[1]]
    
                point = ctx.Painting.enabled || ctx.currentMode.savingEdit ? point : turf.point(coords);
                feature = point;
            } else if (ctx.Utilities.isPolygon(ctx.hotFeature, type)) {
                ctx.hotFeature.geometry.type = "Polygon";

                if (type === 'Rectangle') {
                    ctx.endPoint ? updateCoordinate(ctx.hotFeature, "0.2", ctx.endPoint[0], ctx.endPoint[1]) : false;
                } else {
                    ctx.hotFeature.geometry.coordinates.push(ctx.hotFeature.geometry.coordinates[0]);
                    ctx.hotFeature.geometry.coordinates = [ctx.hotFeature.geometry.coordinates];
                }
            } else if (ctx.Utilities.isLineString(ctx.hotFeature, type)) {
                if (type === 'Polygon') {
                    ctx.hotFeature.geometry.type = type;
                    ctx.hotFeature.geometry.coordinates.push(ctx.hotFeature.geometry.coordinates[0]);
                    ctx.hotFeature.geometry.coordinates = [ctx.hotFeature.geometry.coordinates];
                } else if (type === 'Rectangle') {
                    ctx.endPoint ? updateCoordinate(ctx.hotFeature, "0.2", ctx.endPoint[0], ctx.endPoint[1]) : false;
                }
            } else if (point) {
                feature = point;
            }
    
            if (ctx.Painting.enabled) {
                var tolerance = ctx.options.painting.tolerance;
    
                ctx.hotFeature = type === 'Circle' ? ctx.hotFeature : turf.simplify(ctx.hotFeature, {
                    mutate: true,
                    tolerance: typeof tolerance === 'function' ? tolerance(ctx.map) : tolerance,
                    highQuality: true
                });

                if (ctx.startPoint) ctx.hotFeature.geometry.coordinates[0] = ctx.startPoint;
            }
        } else if (point) {
            feature = point;
        }
    
        feature = ctx.Exploring.currentFeature || feature || ctx.hotFeature;
        if (!feature || !ctx.currentMode.activated) return ctx.currentMode.deactivate();

        feature = ctx.Features.addFeature(feature, ctx.currentMode.properties);
        ctx.fire('draw.finish', { feature: feature, pinned: ctx.Pinning.getFeatures(), type: type, editing: ctx.editMode });
        return ctx.currentMode.deactivate();
    }

    function finishText (e, type, feature) {
        var marker = ctx.textMarker;
        if (!marker) return false;

        var element = marker.getElement();
        var text = element.value;
    
        if (!text.length || ctx.currentMode.cancelled) return marker.remove(), ctx.textInput = false, addText.call(this, type, feature);
    
        var coords = [element.getAttribute('lng'), element.getAttribute('lat')];
        type = type || element.getAttribute('type');

        ctx.currentMode.properties.text = text;
        
        var feature = {
            "type": "Feature",
            "properties": {
                type: type,
                text: text
            },
            "geometry": {
              "type": "Point",
              "coordinates": coords
            }
        }
        
        marker.remove();
        finishDraw(type, feature, text);
    }

    function cleanupDraw (mode) {
        ctx.map.getSource(ctx.statics.constants.sources.ROUTE).setData(turf.featureCollection([]));
        ctx.map.getSource(ctx.statics.constants.sources.SNAP).setData(turf.featureCollection([]));
        ctx.map.getSource(ctx.statics.constants.sources.HOT).setData(turf.featureCollection([]));
        ctx.map.getSource(ctx.statics.constants.sources.VERTEX).setData(turf.featureCollection([]));
        ctx.map.getSource(ctx.statics.constants.sources.HOTTEXT).setData(turf.featureCollection([]));
    
        ctx.deleteMeshData();
    
        mode.history = [];
        mode.undo = [];
        mode.type = null;
        mode.cancelled = false;
        mode.activated = false;
        mode.savingEdit = false;

        ctx.editMode = false;
        ctx.drawMode = false;

        delete ctx.startPoint;
        delete ctx.lastClick;
        delete ctx.firstClick;
        delete ctx.endPoint;
        delete ctx.snapFeature;
        delete ctx.hotFeature;
        delete ctx.drawStarted;
        delete ctx.dragMoving;
        delete ctx.editing;
        delete ctx.textMarker;
        delete ctx.textInput;
        delete ctx.touchMoving;
        delete ctx.touchDown;
        delete ctx.pinningFeatures;
        delete ctx.pinnedFeatures;
        delete ctx.canDragMove;
        delete ctx.canAddVertex;
        delete ctx.dragIndex;
        delete ctx.addedVertexOnLine;
        delete ctx.snappedVertex;
    }

    function getVertex (point) {
        var hotFeature = ctx.hotFeature;
        var vertex;
    
        if (ctx.dragMoving) return false;
        if (!hotFeature) return false;
    
        var closest = ctx.Snapping.getClosest(point.geometry.coordinates);
        var coords = closest.coords;
        var type = closest.point ? closest.point.type : false;
        
        if (!type) return false;
    
        if (!coords && type === 'linepoint' && closest.point.borders) {
            var segment = turf.lineString([closest.point.border1, closest.point.border2]);
            vertex = turf.along(segment, closest.point.distance1);
            coords = vertex.geometry.coordinates;
        }
    
        if (!coords) return false;
    
        vertex = ctx.Utilities.isLineString(hotFeature) && type === 'vertex' ? turf.pointOnLine(hotFeature, turf.point(coords)) : turf.point(coords);
        vertex.properties.type = type;
    
        ctx.fire('vertex.find', { vertex: vertex, feature: ctx.hotFeature, closest: closest });
        return vertex;
    }
    
    function addVertex (point, event) {
        var feature;
    
        if (event && point) {
            var coords = ctx.hotFeature.geometry.coordinates;
            var line = turf.lineString(coords);
            var start = turf.point(coords[0])
            var split = turf.lineSlice(start, point, line);
            var index = split.geometry.coordinates.length - 1;
            var vertex = split.geometry.coordinates[index];
    
            point = turf.point(vertex);
            
            line.geometry.coordinates.splice.apply(line.geometry.coordinates, [index, 0].concat([vertex]));
    
            line = turf.cleanCoords(line);
            feature = turf.truncate(line, { precision: 6, coordinates: 2, mutate: true });
            ctx.hotFeature.geometry.coordinates = feature.geometry.coordinates;
            ctx.hotFeature = ctx.Utilities.cloneDeep(ctx.hotFeature);
        } else if (point) {
            ctx.canDragMove = true;
            ctx.canAddVertex = point;
        }
    
        return point;
    }
    
    function onVertex (vertex, add) {
        var hotFeature = ctx.hotFeature;
        var dragIndex = null;
    
        if (ctx.dragMoving) return offVertex();
        if (!hotFeature || !vertex) return offVertex();
        
        ctx.updateMeshData();
    
        var type = vertex.properties.type;
        var index = vertex.properties.index || vertex.properties.index == 0;
    
        dragIndex = index ? vertex.properties.index : ctx.currentMode.type === 'Circle' ? 0 : false;
    
        ctx.map.getSource(ctx.statics.constants.sources.SNAP).setData(turf.featureCollection([vertex]));
        ctx.map.getSource(ctx.statics.constants.sources.VERTEX).setData(turf.featureCollection([ctx.hotFeature]));
    
        if (type === 'linepoint') return addVertex(vertex);
    
        ctx.map.dragPan.disable();
        ctx.dragIndex = dragIndex;
        ctx.addedVertexOnLine = add ? vertex : false;
        ctx.canAddVertex = false;
        ctx.canDragMove = true;
        ctx.snappedVertex = vertex.geometry.coordinates;
        ctx.Pinning.setFeatures(ctx.snappedVertex);
        ctx.fire('vertex.on', { vertex: vertex, index: dragIndex, feature: ctx.hotFeature });
    }
    
    function offVertex () {
        if (!ctx.hotFeature) return;    
        if (ctx.mouseIsDown && ctx.Painting.enabled) return false;

        if (ctx.snappedVertex) {
            ctx.lastIndex ? ctx.lastClick = { coords: ctx.snappedVertex } : false;
            ctx.fire('vertex.off', { vertex: false, index: ctx.dragIndex, feature: ctx.hotFeature })
        }
    
        ctx.map.dragPan.enable();
        ctx.dragMoving = false;
        ctx.canDragMove = false;
        ctx.snappedVertex = null;
        ctx.dragIndex = -1;
        ctx.mouseIsDown = ctx.touchDown || false;
        ctx.pinableFeatures = [];
        ctx.lastIndex = false;
        ctx.canAddVertex = false;
        ctx.addedVertexOnLine = false
    }

    function addText (type, feature) {
        feature = feature || ctx.hotFeature;
        if (!feature) return false;

        type = type || feature.properties.type;
        feature.properties.type = type;

        if (type !== 'Text') return ctx.Features.setText(feature);
        if (ctx.textInput) return finishText(false, type, feature);
        
        var lngLat = { lng: feature.geometry.coordinates[0], lat: feature.geometry.coordinates[1] }
        var el = ctx.textInput = document.createElement('input');

        el.value = feature.properties.text || '';
        el.className = 'text-marker';

        el.setAttribute('contenteditable', 'true');
        el.setAttribute('autocorrect', 'off');
        el.setAttribute('spellcheck', 'false');
        el.setAttribute('placeholder', 'Press Enter or Select Button When Done...');
        el.setAttribute('type', type);
        el.setAttribute('lng', lngLat.lng);
        el.setAttribute('lat', lngLat.lat);
        
        ctx.textMarker = new ctx.Mapbox.Marker(el).setLngLat(lngLat).addTo(ctx.map);
        ctx.textMarker.setOffset([0, -25])

        el.addEventListener("submit", finishText);
        el.addEventListener("keydown", inputText);
        el.addEventListener("paste", handlePaste);
        el.focus();

        ctx.fire('text.add', { feature: feature, marker: ctx.textMarker, type: type });
    
        function inputText (e) {
            if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
                e.stopPropagation();
            } else if(e.keyCode === 13) {
                e.preventDefault();
                finishText(e);
            }
        }

        function handlePaste (e) {
            var clipboardData, pastedData;
            e.stopImmediatePropagation();
            e.preventDefault();
            clipboardData = e.clipboardData || window.clipboardData;
            pastedData = clipboardData.getData('text/plain').slice(0, CHAR_LIMIT);
            e.target.innerText = pastedData;
        }
    }

    function updateCoordinate (f, t, e, n) {
        var o = t.split(".")
            , r = parseInt(o[0], 10)
            , i = parseInt(o[1], 10);
        void 0 === f.geometry.coordinates[r] && (f.geometry.coordinates[r] = []),
        f.geometry.coordinates[r][i] = [e, n]
    }

    function updateRectangle (event, type) {
        if (type !== 'Rectangle') return false;
        
        var geometry = ctx.hotFeature.geometry;
        var coords = geometry.coordinates;
        const coordType = geometry.type;
        //coords = coordType === 'Linestring' ? coords : coords[0];
    
        if (ctx.currentVertexPosition === 2) {
            const getpXY3 = calculatepXY3(geometry, event, type);
            if (getpXY3[2]) return updateCoordinate(`0.${ctx.currentVertexPosition + 1}`, getpXY3[2][0], getpXY3[2][1]);
            return ctx.hotFeature;
        }
    
        updateCoordinate(`0.${ctx.currentVertexPosition}`, event.lngLat.lng, event.lngLat.lat);
        ctx.currentVertexPosition++;
        updateCoordinate(`0.${ctx.currentVertexPosition}`, event.lngLat.lng, event.lngLat.lat);
    
        function calculatepXY3 (geometry, event, type) {
            var coords = geometry.coordinates;
        
            const pXY0 = coords[0];
            const pXY0_3857 = ctx.Utilities.degrees2meters(pXY0);
            const pXY1 = coords[1];
            const pXY1_3857 = ctx.Utilities.degrees2meters(pXY1);
            let pXY2_3857 = ctx.Utilities.degrees2meters([event.lngLat.lng, event.lngLat.lat]);
            const mouse_3857 = ctx.Utilities.degrees2meters([event.lngLat.lng, event.lngLat.lat]);
        
            if (pXY0_3857[0] === pXY1_3857[0]) {
                pXY2_3857 = [mouse_3857[0], pXY1_3857[1]];
            } else if (pXY0_3857[1] === pXY1_3857[1]) {
                pXY2_3857 = [pXY1_3857[0], mouse_3857[1]];
            } else {
                const vector1_3857 = (pXY1_3857[1] - pXY0_3857[1]) / (pXY1_3857[0] - pXY0_3857[0]);
                const vector2_3857 = -1.0 / vector1_3857;
        
                if (Math.abs(vector2_3857) < 1) {
                    pXY2_3857[1] = vector2_3857 * (mouse_3857[0] - pXY1_3857[0]) + pXY1_3857[1];
                } else {
                    pXY2_3857[0] = pXY1_3857[0] + (pXY2_3857[1] - pXY1_3857[1]) / vector2_3857;
                }
            }
        
            const vector_3857 = [pXY1_3857[0] - pXY0_3857[0], pXY1_3857[1] - pXY0_3857[1]];
            const pXY3_3857 = [pXY2_3857[0] - vector_3857[0], pXY2_3857[1] - vector_3857[1]];
            const pXY2G = ctx.Utilities.meters2degrees(pXY2_3857);
            const pXY3G = ctx.Utilities.meters2degrees(pXY3_3857);
        
            return [coords, pXY2G, pXY3G];
        }
    
        return false;
    }

    function startIdleTime () {
        var ready = setInterval(function() {
            if (ctx.mouseIsDown) {
                ctx.lastDragMove += 1;
                checkIdleMove();
            } else {
                ctx.lastDragMove = 0;
                ctx.mouseIsIdle = false;
                clearInterval(ready);
            }
        }, 1);
    }
    
    function checkIdleMove () {
        if (ctx.lastDragMove < ctx.options.pinning.idle) return ctx.mouseIsIdle = false, false;
        ctx.mouseIsIdle = true;
        ctx.Snapping.setVertex();
        ctx.Pinning.updateFeatures();
        return true;
    }

    function needsToFinish (type, coords) {
        var types = ['Circle', 'Icon', 'Text'];
        if (!type) return true;
        if (types.includes(type)) return true;
        if (type === 'Rectangle' && ctx.startPoint) return ctx.endPoint = coords, true;
        if (type === 'Polygon' && ctx.snappedVertex && ctx.startPoint && ctx.Utilities.isPointEqual(ctx.startPoint, ctx.snappedVertex)) return true;
        if (ctx.snappedVertex && ctx.Utilities.isLastIndex(ctx.dragIndex, ctx.hotFeature)) return true
        if (ctx.lastClick && ctx.Utilities.isPointEqual(ctx.lastClick.coords, coords)) return true;
        return false;
    }

    function constrainFeatureMovement (geojsonFeatures, delta) {
        // "inner edge" = a feature's latitude closest to the equator
        let northInnerEdge = ctx.statics.constants.LAT_MIN;
        let southInnerEdge = ctx.statics.constants.LAT_MAX;
        // "outer edge" = a feature's latitude furthest from the equator
        let northOuterEdge = ctx.statics.constants.LAT_MIN;
        let southOuterEdge = ctx.statics.constants.LAT_MAX;
    
        let westEdge = ctx.statics.constants.LNG_MAX;
        let eastEdge = ctx.statics.constants.LNG_MIN;
    
        geojsonFeatures.forEach((feature) => {
            //const bounds = extent(feature); Need to add Turf bounds here
            const featureSouthEdge = bounds[1];
            const featureNorthEdge = bounds[3];
            const featureWestEdge = bounds[0];
            const featureEastEdge = bounds[2];
            if (featureSouthEdge > northInnerEdge) northInnerEdge = featureSouthEdge;
            if (featureNorthEdge < southInnerEdge) southInnerEdge = featureNorthEdge;
            if (featureNorthEdge > northOuterEdge) northOuterEdge = featureNorthEdge;
            if (featureSouthEdge < southOuterEdge) southOuterEdge = featureSouthEdge;
            if (featureWestEdge < westEdge) westEdge = featureWestEdge;
            if (featureEastEdge > eastEdge) eastEdge = featureEastEdge;
        });
    
    
        // These changes are not mutually exclusive: we might hit the inner
        // edge but also have hit the outer edge and therefore need
        // another readjustment
        const constrainedDelta = delta;
    
        if (northInnerEdge + constrainedDelta.lat > ctx.statics.constants.LAT_RENDERED_MAX) {
            constrainedDelta.lat = ctx.statics.constants.LAT_RENDERED_MAX - northInnerEdge;
        }
        if (northOuterEdge + constrainedDelta.lat > ctx.statics.constants.LAT_MAX) {
            constrainedDelta.lat = ctx.statics.constants.LAT_MAX - northOuterEdge;
        }
        if (southInnerEdge + constrainedDelta.lat < ctx.statics.constants.LAT_RENDERED_MIN) {
            constrainedDelta.lat = ctx.statics.constants.LAT_RENDERED_MIN - southInnerEdge;
        }
        if (southOuterEdge + constrainedDelta.lat < ctx.statics.constants.LAT_MIN) {
            constrainedDelta.lat = ctx.statics.constants.LAT_MIN - southOuterEdge;
        }
        if (westEdge + constrainedDelta.lng <= ctx.statics.constants.LNG_MIN) {
            constrainedDelta.lng += Math.ceil(Math.abs(constrainedDelta.lng) / 360) * 360;
        }
        if (eastEdge + constrainedDelta.lng >= ctx.statics.constants.LNG_MAX) {
            constrainedDelta.lng -= Math.ceil(Math.abs(constrainedDelta.lng) / 360) * 360;
        }
    
        return constrainedDelta;
    }

    function calculateOrientedAnglePolygon (feature) {
        var geometry = feature.geometry;
        var coords = geometry.coordinates;
        const coordType = geometry.type;
        coords = coordType === 'Linestring' ? coords : coords[0];
    
        const pXY0 = coords[0];
        const pXY0_3857 = ctx.Utilities.degrees2meters(pXY0);
        const pXY1 = coords[1];
        const pXY1_3857 = ctx.Utilities.degrees2meters(pXY1);
        const angleStdGraus = Math.atan2(pXY1_3857[1] - pXY0_3857[1], pXY1_3857[0] - pXY0_3857[0]) * 180 / Math.PI;
    
        let angleSudGraus = -1.0 * (angleStdGraus + 90);
        const angle = angleSudGraus < 0 ? angleSudGraus + 360 : angleSudGraus;
        return parseFloat((angle).toFixed(2));
    }
};



/***/ }),

/***/ "./src/mode/Edit.js":
/*!**************************!*\
  !*** ./src/mode/Edit.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Edit)
/* harmony export */ });
function Edit (ctx) {
    this.init = function (options) {
        console.log(options);
    }
}



/***/ }),

/***/ "./src/mode/Select.js":
/*!****************************!*\
  !*** ./src/mode/Select.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Select)
/* harmony export */ });
/**
 * @mixin
 * @memberof module:geoflo
 * @name Select
 * @description A class that handles selecting functionality in a mapping context.
 * @param {Object} ctx - The GeoFlo context object
 */
function Select (ctx) {
    var lastKnownSelectIds = [];
    var removedFeatures = [];
    var nearFeatures = [];
    var clickCoords;
    var multipleSelect;
    var selectedId;

    this.id = 'select';

    /**
	 * @function
     * @memberof module:geoflo.Select
	 * @name activate
	 * @description This function activates the select feature functionality by enabling drag pan, setting buttons, and setting the active button to 'select'. It also triggers a 'select.activate' event with the provided options.
	 * @param {Object} options - The options object for activation.
	 * @param {string} [options.id] - The ID of the feature to select.
	 * @param {Object} [options.feature] - The feature object to select.
	 * @returns {boolean} Returns false if already activated.
	 */
    this.activate = function (options={}) {
        if (this.activated) return false;
        if (ctx.currentMode.id !== this.id) return options.mode = this.id, ctx.setMode(options);

        this.activated = true;
        ctx.map.dragPan.enable();
        ctx.setButtons();
        ctx.setActiveButton('select');
        ctx.fire('select.activate', { activated: true, options: options })
        if (this.gamepad) {}
        setTimeout(function(e) { e.selectFeature(options.id ? options.id : options.feature ? options.feature.id : false) }, 5, this)
    };

	/**
	 * @function
     * @memberof module:geoflo.Select
	 * @name deactivate
	 * @description This function deactivates the current feature by setting the 'activated' flag to false and triggering necessary actions.
	 * @returns {boolean} Returns false if the feature is not activated.
	 */
    this.deactivate = function () {
        if (!this.activated) return false;

        this.activated = false;
        this.deselectCurrentFeature();
        
        ctx.setButtons();
        ctx.fire('select.deactivate', { activated: true });
    };

	/**
	 * @function
     * @memberof module:geoflo.Select
	 * @name canHandle
	 * @description This function determines if the given mode name is equal to the SELECT mode.
	 * @param {string} modeName - The mode name to be checked.
	 * @returns {boolean} Returns true if the mode name is SELECT, false otherwise.
	 */
    this.canHandle = function (modeName) {
        return ctx.statics.constants.modes.SELECT === modeName;
    };

	/**
	 * @function
     * @memberof module:geoflo.Select
	 * @name selectFeature
	 * @description Selects a feature by its ID, adds it to the selected features list, and optionally adds a popup.
	 * @param {string} id - The ID of the feature to be selected.
	 * @returns {Array} - An array of removed features if wantingToEdit is false, otherwise returns the removed feature.
	 */
    this.selectFeature = function (id) {
        const popup = ctx.options.select.popup;

        if (!id) return false;
        if (lastKnownSelectIds.indexOf(id) === -1) lastKnownSelectIds.push(id);
        if (ctx.hasSelection()) ctx.forEachSelectedFeature((feature) => { });

        removedFeatures = ctx.Features.removeFeatures(id);

        ctx.addFeaturesToSelected(removedFeatures);
        popup ? this.addPopup(removedFeatures) : false;
        
        if (!ctx.wantingToEdit) return removedFeatures;
        if (removedFeatures.length == 1 && id === removedFeatures[0].id) editFeature(removedFeatures[0]);
        return removedFeatures;
    };

	/**
	 * @function
     * @memberof module:geoflo.Select
	 * @name deselectCurrentFeature
	 * @description Deselects the current feature by removing its selection.
	 */
    this.deselectCurrentFeature = function () {
        ctx.removeSelection();
    };

	/**
	 * @function
     * @memberof module:geoflo.Select
	 * @name addPopup
	 * @description This function creates a popup element with the specified features and adds it to the map at the click coordinates.
	 * @param {Object} features - The features to be displayed in the popup.
	 * @param {string} features.title - The title of the popup.
	 * @param {string} features.description - The description of the popup.
	 * @param {number} features.latitude - The latitude coordinate for the popup location.
	 * @param {number} features.longitude - The longitude coordinate for the popup location.
	 */
    this.addPopup = function (features) {
        this.popupElement = buildPopup(features);

        this.popup = new mapboxgl.Popup({ closeOnClick: false })
            .setLngLat(clickCoords)
            .setDOMContent(this.popupElement)
            .addTo(ctx.map)
            .setOffset(12);

        this.popup._container.style['margin-bottom'] = '10px'
    };

	/**
	 * @function
     * @memberof module:geoflo.Select
	 * @name removePopup
	 * @description Removes the popup element from the DOM if it exists.
	 * @return {boolean} Returns true if the popup element was successfully removed, otherwise false.
	 */
    this.removePopup = function () {
        return this.popup && this.popup.remove ? this.popup.remove() : false;
    };

	/**
	 * @function
     * @memberof module:geoflo.Select
	 * @name handleMove
	 * @description Handles the mouse move event.
	 * @param {Event} event - The event object representing the mouse move event.
	 */
    this.handleMove = function (event) {
        //ctx.setMapClass('pointer');
    };

	/**
	 * @function
     * @memberof module:geoflo.Select
	 * @name handleClick
	 * @description Handles the click event on the map and selects features based on the event.
	 * @param {Object} event - The event object containing information about the click event.
	 * @returns {boolean} Returns false if ctx.noSelect is true, otherwise selects features based on the event.
	 */
    this.handleClick = function (event) {
        if (ctx.noSelect) return false;
        
        var features = ctx.getRenderedDrawnFeatures(event.lngLat);

        clickCoords = [event.lngLat.lng, event.lngLat.lat];
        multipleSelect = event.originalEvent && event.originalEvent.shiftKey && ctx.options.select.multiple;

        if (features.length > 0) {
            if (!ctx.Layers.getSelection(features, clickCoords)) return;
            selectFeature.call(this, features);
        } else if (!multipleSelect) {
            lastKnownSelectIds = [];
            nearFeatures = [];
            clickCoords = false;
            selectedId = false;
            this.deselectCurrentFeature();
        }
    };

	/**
	 * @function
     * @memberof module:geoflo.Select
	 * @name handleDrag
	 * @description Handles the drag event triggered by a user interaction. It sets the map class to 'grabbing' to indicate dragging.
	 * @param {Event} event - The event object representing the drag event.
	 */
    this.handleDrag = function (event) {
        //ctx.setMapClass('grabbing');
    }


    function buildPopup (features) {
        const element = document.createElement('div');
        element.classList.add('popup-table-holder');

        const table = buildTable(features);

        element.appendChild(table);

        if (nearFeatures.length > 1) {
            var button = document.createElement('div');
            button.classList.add('popup-table-button');
            button.innerHTML = `<button> Next </button>`;
            button.addEventListener('click', selectFeature.bind(this));
            element.appendChild(button);
        }

        return element;
        
        /* const button = document.createElement('div');
        button.innerHTML = `<button class="btn btn-success btn-simple text-white" > Assign</button>`;
        element.appendChild(button);
        button.addEventListener('click', (e) => { console.log('Button clicked' + name); }); */
    };

    function buildTable (features) {
        var table = document.createElement('table');
        var properties = ['id', 'type'];

        table.style.width = '100%';
        table.style.height = '100%';
        table.setAttribute('border', '1');
        table.classList.add('popup-table');

        var tableBody = document.createElement('tbody');

        features.forEach(function(feature, index) {
            var type = feature.properties.type;

            properties.forEach(function(prop) {
                tableBody.appendChild(buildRow(prop, feature.properties[prop]));
            })

            tableBody.appendChild(buildRow('geometry', feature.geometry.type));

            if (feature.geometry.type === 'LineString') {
                ctx.Features.addUnits(feature, 'feet');
                tableBody.appendChild(buildRow('unit', feature.geometry.unit));
                tableBody.appendChild(buildRow('units', feature.geometry.units));
            } else if (type === 'Text') {
                tableBody.appendChild(buildRow('content', feature.properties.text));
            } else if (feature.geometry.type === 'Polygon') {
                ctx.Features.addUnits(feature, 'acres');
                tableBody.appendChild(buildRow('unit', feature.geometry.unit));
                tableBody.appendChild(buildRow('units', feature.geometry.units));
            }
        })

        table.appendChild(tableBody);
        return table;
    };

    function buildRow (header, data) {
        var tr = document.createElement('tr');
        tr.classList.add('popup-table-row');

        if (header) {
            var th = document.createElement('th');
            th.classList.add('popup-table-header');
            th.appendChild(document.createTextNode(header));
            tr.appendChild(th);
        }
        
        var td = document.createElement('td');
        td.classList.add('popup-table-data');
        td.classList.add(header);
        td.appendChild(document.createTextNode(data));
        tr.appendChild(td);

        return tr;
    }

    function selectFeature (features) {
        nearFeatures = features;
        lastKnownSelectIds = lastKnownSelectIds === undefined ? [] : lastKnownSelectIds;

        if (features.length >= lastKnownSelectIds.length) {
            lastKnownSelectIds.splice(0, features.length - lastKnownSelectIds.length + 1);
        }

        selectedId = features[0].id || features[0].properties['id'];

        if (features.length > 1) {
            features.forEach((feature) => {
                const id = feature.id || feature.properties['id'];
                if (lastKnownSelectIds.indexOf(id) === -1) selectedId = id;
            });
        }

        if (!multipleSelect) ctx.currentMode.deselectCurrentFeature();
        ctx.currentMode.selectFeature(selectedId);
    }

    function editFeature (feature) {
        ctx.wantingToEdit = false;
        ctx.setMode('edit', feature.properties.type, feature);
    }
};



/***/ }),

/***/ "./src/require/Mapbox.js":
/*!*******************************!*\
  !*** ./src/require/Mapbox.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Mapbox)
/* harmony export */ });
const Mapbox = (function (mapboxgl) {
    if (!mapboxgl) throw new Error('MapboxGL is required!');
    
    const DOM = {
        create: function create (tagName, className, container) {
            const el = window.document.createElement(tagName);
            if (className !== undefined) el.className = className;
            if (container) container.appendChild(el);
            return el;
        }
    }

    // Override to add a Top-Center
    mapboxgl.Map.prototype._setupContainer = function () {
        const container = this._container;
        container.classList.add('mapboxgl-map');

        const missingCSSCanary = this._missingCSSCanary = DOM.create('div', 'mapboxgl-canary', container);
        missingCSSCanary.style.visibility = 'hidden';
        this._detectMissingCSS();

        const canvasContainer = this._canvasContainer = DOM.create('div', 'mapboxgl-canvas-container', container);
        if (this._interactive) {
            canvasContainer.classList.add('mapboxgl-interactive');
        }

        this._canvas = DOM.create('canvas', 'mapboxgl-canvas', canvasContainer);
        // $FlowFixMe[method-unbinding]
        this._canvas.addEventListener('webglcontextlost', this._contextLost, false);
        // $FlowFixMe[method-unbinding]
        this._canvas.addEventListener('webglcontextrestored', this._contextRestored, false);
        this._canvas.setAttribute('tabindex', '0');
        this._canvas.setAttribute('aria-label', this._getUIString('Map.Title'));
        this._canvas.setAttribute('role', 'region');

        this._updateContainerDimensions();
        this._resizeCanvas(this._containerWidth, this._containerHeight);

        const controlContainer = this._controlContainer = DOM.create('div', 'mapboxgl-control-container', container);
        const positions = this._controlPositions = {};

        ['top-left', 'top-right', 'top-center', 'bottom-left', 'bottom-right'].forEach((positionName) => {
            positions[positionName] = DOM.create('div', `mapboxgl-ctrl-${positionName}`, controlContainer);
        });

        // $FlowFixMe[method-unbinding]
        this._container.addEventListener('scroll', this._onMapScroll, false);
    }

    return mapboxgl;
})(window.mapboxgl);



/***/ }),

/***/ "./src/require/Omnivore.js":
/*!*********************************!*\
  !*** ./src/require/Omnivore.js ***!
  \*********************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Omnivore)
/* harmony export */ });
/* module decorator */ module = __webpack_require__.hmd(module);
const Omnivore = (function (omnivore) {
  if (!omnivore) throw new Error('Omnivore is required!');

  (function (f) { if (typeof exports === "object" && "object" !== "undefined") { module.exports = f() } else if (typeof define === "function" && __webpack_require__.amdO) { define([], f) } else { var g; if (typeof window !== "undefined") { g = window } else if (typeof __webpack_require__.g !== "undefined") { g = __webpack_require__.g } else if (typeof self !== "undefined") { g = self } else { g = this } g.togpx = f() } })(function () {
    var define, module, exports; return (function e(t, n, r) { function s(o, u) { if (!n[o]) { if (!t[o]) { var a = undefined; if (!u && a) return require(o, !0); if (i) return i(o, !0); var f = new Error("Cannot find module '" + o + "'"); throw f.code = "MODULE_NOT_FOUND", f } var l = n[o] = { exports: {} }; t[o][0].call(l.exports, function (e) { var n = t[o][1][e]; return s(n ? n : e) }, l, l.exports, e, t, n, r) } return n[o].exports } var i = undefined; for (var o = 0; o < r.length; o++)s(r[o]); return s })({
      1: [function (require, module, exports) {
        var JXON = require("jxon");
        JXON.config({ attrPrefix: '@' });

        function togpx(geojson, options) {
          options = (function (defaults, options) {
            for (var k in defaults) {
              if (options.hasOwnProperty(k))
                defaults[k] = options[k];
            }
            return defaults;
          })({
            creator: "togpx",
            metadata: undefined,
            featureTitle: get_feature_title,
            featureDescription: get_feature_description,
            featureLink: undefined,
            featureCoordTimes: get_feature_coord_times,
          }, options || {});

          // is featureCoordTimes is a string -> look for the specified property
          if (typeof options.featureCoordTimes === 'string') {
            var customTimesFieldKey = options.featureCoordTimes;
            options.featureCoordTimes = function (feature) {
              return feature.properties[customTimesFieldKey];
            }
          }

          function get_feature_title(props) {
            // a simple default heuristic to determine a title for a given feature
            // uses a nested `tags` object or the feature's `properties` if present
            // and then searchs for the following properties to construct a title:
            // `name`, `ref`, `id`
            if (!props) return "";
            if (typeof props.tags === "object") {
              var tags_title = get_feature_title(props.tags);
              if (tags_title !== "")
                return tags_title;
            }
            if (props.name)
              return props.name;
            if (props.ref)
              return props.ref;
            if (props.id)
              return props.id;
            return "";
          }
          function get_feature_description(props) {
            // constructs a description for a given feature
            // uses a nested `tags` object or the feature's `properties` if present
            // and then concatenates all properties to construct a description.
            if (!props) return "";
            if (typeof props.tags === "object")
              return get_feature_description(props.tags);
            var res = "";
            for (var k in props) {
              if (typeof props[k] === "object")
                continue;
              res += k + "=" + props[k] + "\n";
            }
            return res.substr(0, res.length - 1);
          }
          function get_feature_coord_times(feature) {
            if (!feature.properties) return null;
            return feature.properties.times || feature.properties.coordTimes || null;
          }
          function add_feature_link(o, f) {
            if (options.featureLink)
              o.link = { "@href": options.featureLink(f.properties) }
          }
          // make gpx object
          var gpx = {
            "gpx": {
              "@xmlns": "http://www.topografix.com/GPX/1/1",
              "@xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
              "@xsi:schemaLocation": "http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd",
              "@version": "1.1",
              "metadata": null,
              "wpt": [],
              "trk": [],
            }
          };

          if (options.creator)
            gpx.gpx["@creator"] = options.creator;
          if (options.metadata)
            gpx.gpx["metadata"] = options.metadata;
          else
            delete options.metadata;

          var features;

          if (geojson.type === "FeatureCollection")
            features = geojson.features;
          else if (geojson.type === "Feature")
            features = [geojson];
          else
            features = [{ type: "Feature", properties: {}, geometry: geojson }];

          features.forEach(function mapFeature(f) {
            var o;
            switch (f.geometry.type) {
              // POIs
              case "Point":
              case "MultiPoint":
                var coords = f.geometry.coordinates;
                if (f.geometry.type == "Point") coords = [coords];
                coords.forEach(function (coordinates) {
                  o = {
                    "@lat": coordinates[1],
                    "@lon": coordinates[0],
                    "name": options.featureTitle(f.properties),
                    "desc": options.featureDescription(f.properties)
                  };
                  if (coordinates[2] !== undefined) {
                    o.ele = coordinates[2];
                  }
                  add_feature_link(o, f);
                  gpx.gpx.wpt.push(o);
                });
                break;
              // LineStrings
              case "LineString":
              case "MultiLineString":
                var coords = f.geometry.coordinates;
                var times = options.featureCoordTimes(f);
                if (f.geometry.type == "LineString") coords = [coords];
                o = {
                  "name": options.featureTitle(f.properties),
                  "desc": options.featureDescription(f.properties)
                };
                add_feature_link(o, f);
                o.trkseg = [];
                coords.forEach(function (coordinates) {
                  var seg = { trkpt: [] };
                  coordinates.forEach(function (c, i) {
                    var o = {
                      "@lat": c[1],
                      "@lon": c[0]
                    };
                    if (c[2] !== undefined) {
                      o.ele = c[2];
                    }
                    if (times && times[i]) {
                      o.time = times[i];
                    }
                    seg.trkpt.push(o);
                  });
                  o.trkseg.push(seg);
                });
                gpx.gpx.trk.push(o);
                break;
              // Polygons / Multipolygons
              case "Polygon":
              case "MultiPolygon":
                o = {
                  "name": options.featureTitle(f.properties),
                  "desc": options.featureDescription(f.properties)
                };
                add_feature_link(o, f);
                o.trkseg = [];
                var coords = f.geometry.coordinates;
                var times = options.featureCoordTimes(f);
                if (f.geometry.type == "Polygon") coords = [coords];
                coords.forEach(function (poly) {
                  poly.forEach(function (ring) {
                    var seg = { trkpt: [] };
                    var i = 0;
                    ring.forEach(function (c) {
                      var o = {
                        "@lat": c[1],
                        "@lon": c[0]
                      };
                      if (c[2] !== undefined) {
                        o.ele = c[2];
                      }
                      if (times && times[i]) {
                        o.time = times[i];
                      }
                      i++;
                      seg.trkpt.push(o);
                    });
                    o.trkseg.push(seg);
                  });
                });
                gpx.gpx.trk.push(o);
                break;
              case "GeometryCollection":
                f.geometry.geometries.forEach(function (geometry) {
                  var pseudo_feature = {
                    "properties": f.properties,
                    "geometry": geometry
                  };
                  mapFeature(pseudo_feature);
                });
                break;
              default:
                console.log("warning: unsupported geometry type: " + f.geometry.type);
            }
          });

          return JXON.stringify(gpx);
        };

        module.exports = togpx;

      }, { "jxon": 2 }], 2: [function (require, module, exports) {
        /*
         * JXON framework - Copyleft 2011 by Mozilla Developer Network
         *
         * Revision #1 - September 5, 2014
         *
         * https://developer.mozilla.org/en-US/docs/JXON
         *
         * This framework is released under the GNU Public License, version 3 or later.
         * http://www.gnu.org/licenses/gpl-3.0-standalone.html
         *
         * small modifications performed by the iD project:
         * https://github.com/openstreetmap/iD/commits/18aa33ba97b52cacf454e95c65d154000e052a1f/js/lib/jxon.js
         *
         * small modifications performed by user @bugreport0
         * https://github.com/tyrasd/JXON/pull/2/commits
         *
         * some additions and modifications by user @igord
         * https://github.com/tyrasd/JXON/pull/5/commits
         *
         * bugfixes and code cleanup by user @laubstein
         * https://github.com/tyrasd/jxon/pull/32
         *
         * adapted for nodejs and npm by @tyrasd (Martin Raifer <tyr.asd@gmail.com>) 
         */

        (function (root, factory) {
          if (typeof define === 'function' && define.amd) {
            // AMD. Register as an anonymous module.
            define([], factory(window));
          } else if (typeof exports === 'object') {
            if (typeof window === 'object' && window.DOMImplementation && window.XMLSerializer && window.DOMParser) {
              // Browserify. hardcode usage of browser's own XMLDom implementation
              // see https://github.com/tyrasd/jxon/issues/18

              module.exports = factory(window);
            } else {
              // Node. Does not work with strict CommonJS, but
              // only CommonJS-like environments that support module.exports,
              // like Node.

              module.exports = factory(require('xmldom'), true);
            }
          } else {
            // Browser globals (root is window)

            root.JXON = factory(window);
          }
        }(this, function (xmlDom, isNodeJs) {
          var opts = {
            valueKey: '_',
            attrKey: '$',
            attrPrefix: '$',
            lowerCaseTags: false,
            trueIsEmpty: false,
            autoDate: false,
            ignorePrefixedNodes: false,
            parseValues: false
          };
          var aCache = [];
          var rIsNull = /^\s*$/;
          var rIsBool = /^(?:true|false)$/i;
          var DOMParser;

          return new (function () {

            this.config = function (cfg) {
              for (var k in cfg) {

                opts[k] = cfg[k];
              }
              if (opts.parserErrorHandler) {
                DOMParser = new xmlDom.DOMParser({
                  errorHandler: opts.parserErrorHandler,
                  locator: {}
                });
              }
            };

            function parseText(sValue) {
              if (!opts.parseValues) {
                return sValue;
              }

              if (rIsNull.test(sValue)) {
                return null;
              }

              if (rIsBool.test(sValue)) {
                return sValue.toLowerCase() === 'true';
              }

              if (isFinite(sValue)) {
                return parseFloat(sValue);
              }

              if (opts.autoDate && isFinite(Date.parse(sValue))) {
                return new Date(sValue);
              }

              return sValue;
            }
            function EmptyTree() {
            }
            EmptyTree.prototype.toString = function () {
              return 'null';
            };

            EmptyTree.prototype.valueOf = function () {
              return null;
            };

            function objectify(vValue) {
              return vValue === null ? new EmptyTree() : vValue instanceof Object ? vValue : new vValue.constructor(vValue);
            }

            function createObjTree(oParentNode, nVerb, bFreeze, bNesteAttr) {
              var CDATA = 4,
                TEXT = 3,
                ELEMENT = 1,
                nLevelStart = aCache.length,
                bChildren = oParentNode.hasChildNodes(),
                bAttributes = oParentNode.nodeType === oParentNode.ELEMENT_NODE && oParentNode.hasAttributes(),
                bHighVerb = Boolean(nVerb & 2),
                nLength = 0,
                sCollectedTxt = '',
                vResult = bHighVerb ? {} : /* put here the default value for empty nodes: */ (opts.trueIsEmpty ? true : ''),
                sProp,
                vContent;

              if (bChildren) {
                for (var oNode, nItem = 0; nItem < oParentNode.childNodes.length; nItem++) {

                  oNode = oParentNode.childNodes.item(nItem);
                  if (oNode.nodeType === CDATA) {
                    sCollectedTxt += oNode.nodeValue;
                  } /* nodeType is "CDATASection" (4) */
                  else if (oNode.nodeType === TEXT) {
                    sCollectedTxt += oNode.nodeValue.trim();
                  } /* nodeType is "Text" (3) */
                  else if (oNode.nodeType === ELEMENT && !(opts.ignorePrefixedNodes && oNode.prefix)) {
                    aCache.push(oNode);
                  }
                  /* nodeType is "Element" (1) */
                }
              }

              var nLevelEnd = aCache.length,
                vBuiltVal = parseText(sCollectedTxt);

              if (!bHighVerb && (bChildren || bAttributes)) {
                vResult = nVerb === 0 ? objectify(vBuiltVal) : {};
              }

              for (var nElId = nLevelStart; nElId < nLevelEnd; nElId++) {

                sProp = aCache[nElId].nodeName;
                if (opts.lowerCaseTags) {
                  sProp = sProp.toLowerCase();
                }

                vContent = createObjTree(aCache[nElId], nVerb, bFreeze, bNesteAttr);
                if (vResult.hasOwnProperty(sProp)) {
                  if (vResult[sProp].constructor !== Array) {
                    vResult[sProp] = [vResult[sProp]];
                  }

                  vResult[sProp].push(vContent);
                } else {
                  vResult[sProp] = vContent;

                  nLength++;
                }
              }

              if (bAttributes) {
                var nAttrLen = oParentNode.attributes.length,
                  sAPrefix = bNesteAttr ? '' : opts.attrPrefix,
                  oAttrParent = bNesteAttr ? {} : vResult;

                for (var oAttrib, oAttribName, nAttrib = 0; nAttrib < nAttrLen; nLength++, nAttrib++) {

                  oAttrib = oParentNode.attributes.item(nAttrib);

                  oAttribName = oAttrib.name;
                  if (opts.lowerCaseTags) {
                    oAttribName = oAttribName.toLowerCase();
                  }

                  oAttrParent[sAPrefix + oAttribName] = parseText(oAttrib.value.trim());
                }

                if (bNesteAttr) {
                  if (bFreeze) {
                    Object.freeze(oAttrParent);
                  }

                  vResult[opts.attrKey] = oAttrParent;

                  nLength -= nAttrLen - 1;
                }

              }

              if (nVerb === 3 || (nVerb === 2 || nVerb === 1 && nLength > 0) && sCollectedTxt) {
                vResult[opts.valueKey] = vBuiltVal;
              } else if (!bHighVerb && nLength === 0 && sCollectedTxt) {
                vResult = vBuiltVal;
              }
              if (bFreeze && (bHighVerb || nLength > 0)) {
                Object.freeze(vResult);
              }

              aCache.length = nLevelStart;

              return vResult;
            }
            function loadObjTree(oXMLDoc, oParentEl, oParentObj) {
              var vValue,
                oChild,
                elementNS;

              if (oParentObj.constructor === String || oParentObj.constructor === Number || oParentObj.constructor === Boolean) {
                oParentEl.appendChild(oXMLDoc.createTextNode(oParentObj.toString())); /* verbosity level is 0 or 1 */
                if (oParentObj === oParentObj.valueOf()) {
                  return;
                }

              } else if (oParentObj.constructor === Date) {
                oParentEl.appendChild(oXMLDoc.createTextNode(oParentObj.toISOString()));
              }
              for (var sName in oParentObj) {

                vValue = oParentObj[sName];
                if (vValue === undefined) {
                  continue;
                }
                if (vValue === null) {
                  vValue = {};
                }

                if (isFinite(sName) || vValue instanceof Function) {
                  continue;
                }

                /* verbosity level is 0 */
                if (sName === opts.valueKey) {
                  if (vValue !== null && vValue !== true) {
                    oParentEl.appendChild(oXMLDoc.createTextNode(vValue.constructor === Date ? vValue.toISOString() : String(vValue)));
                  }

                } else if (sName === opts.attrKey) { /* verbosity level is 3 */
                  for (var sAttrib in vValue) {
                    oParentEl.setAttribute(sAttrib, vValue[sAttrib]);
                  }
                } else if (sName === opts.attrPrefix + 'xmlns') {
                  if (isNodeJs) {
                    oParentEl.setAttribute(sName.slice(1), vValue);
                  }
                  // do nothing: special handling of xml namespaces is done via createElementNS()
                } else if (sName.charAt(0) === opts.attrPrefix) {
                  oParentEl.setAttribute(sName.slice(1), vValue);
                } else if (vValue.constructor === Array) {
                  for (var nItem in vValue) {
                    if (!vValue.hasOwnProperty(nItem)) continue;
                    elementNS = (vValue[nItem] && vValue[nItem][opts.attrPrefix + 'xmlns']) || oParentEl.namespaceURI;
                    if (elementNS) {
                      oChild = oXMLDoc.createElementNS(elementNS, sName);
                    } else {
                      oChild = oXMLDoc.createElement(sName);
                    }

                    loadObjTree(oXMLDoc, oChild, vValue[nItem] || {});
                    oParentEl.appendChild(oChild);
                  }
                } else {
                  elementNS = (vValue || {})[opts.attrPrefix + 'xmlns'] || oParentEl.namespaceURI;
                  if (elementNS) {
                    oChild = oXMLDoc.createElementNS(elementNS, sName);
                  } else {
                    oChild = oXMLDoc.createElement(sName);
                  }
                  if (vValue instanceof Object) {
                    loadObjTree(oXMLDoc, oChild, vValue);
                  } else if (vValue !== null && (vValue !== true || !opts.trueIsEmpty)) {
                    oChild.appendChild(oXMLDoc.createTextNode(vValue.toString()));
                  }
                  oParentEl.appendChild(oChild);
                }
              }
            }
            this.xmlToJs = this.build = function (oXMLParent, nVerbosity /* optional */, bFreeze /* optional */, bNesteAttributes /* optional */) {
              var _nVerb = arguments.length > 1 && typeof nVerbosity === 'number' ? nVerbosity & 3 : /* put here the default verbosity level: */ 1;
              return createObjTree(oXMLParent, _nVerb, bFreeze || false, arguments.length > 3 ? bNesteAttributes : _nVerb === 3);
            };

            this.jsToXml = this.unbuild = function (oObjTree, sNamespaceURI /* optional */, sQualifiedName /* optional */, oDocumentType /* optional */) {
              var documentImplementation = xmlDom.document && xmlDom.document.implementation || new xmlDom.DOMImplementation();
              var oNewDoc = documentImplementation.createDocument(sNamespaceURI || null, sQualifiedName || '', oDocumentType || null);
              loadObjTree(oNewDoc, oNewDoc.documentElement || oNewDoc, oObjTree);
              return oNewDoc;
            };

            this.stringToXml = function (xmlStr) {
              if (!DOMParser) {
                DOMParser = new xmlDom.DOMParser();
              }

              return DOMParser.parseFromString(xmlStr, 'application/xml');
            };

            this.xmlToString = function (xmlObj) {
              if (typeof xmlObj.xml !== 'undefined') {
                return xmlObj.xml;
              } else {
                return (new xmlDom.XMLSerializer()).serializeToString(xmlObj);
              }
            };

            this.stringToJs = function (str) {
              var xmlObj = this.stringToXml(str);
              return this.xmlToJs(xmlObj);
            };

            this.jsToString = this.stringify = function (oObjTree, sNamespaceURI /* optional */, sQualifiedName /* optional */, oDocumentType /* optional */) {
              return this.xmlToString(
                this.jsToXml(oObjTree, sNamespaceURI, sQualifiedName, oDocumentType)
              );
            };

            this.each = function (arr, func, thisArg) {
              if (arr instanceof Array) {
                arr.forEach(func, thisArg);
              } else {
                [arr].forEach(func, thisArg);
              }
            };
          })();

        }

        ));

      }, { "xmldom": 3 }], 3: [function (require, module, exports) {

      }, {}]
    }, {}, [1])(1)
  });

  !function (e) {
    if ("object" == typeof exports && "undefined" != "object")
      module.exports = e();
    else if ("function" == typeof define && __webpack_require__.amdO)
      define([], e);
    else {
      ("undefined" != typeof window ? window : "undefined" != typeof __webpack_require__.g ? __webpack_require__.g : "undefined" != typeof self ? self : this).tokml = e()
    }
  }(function () {
    return function e(t, r, n) {
      function o(u, a) {
        if (!r[u]) {
          if (!t[u]) {
            var c = undefined;
            if (!a && c)
              return require(u, !0);
            if (i)
              return i(u, !0);
            var s = new Error("Cannot find module '" + u + "'");
            throw s.code = "MODULE_NOT_FOUND",
            s
          }
          var l = r[u] = {
            exports: {}
          };
          t[u][0].call(l.exports, function (e) {
            var r = t[u][1][e];
            return o(r || e)
          }, l, l.exports, e, t, r, n)
        }
        return r[u].exports
      }
      for (var i = undefined, u = 0; u < n.length; u++)
        o(n[u]);
      return o
    }({
      1: [function (e, t, r) {
        function n(e, t) {
          return function (r) {
            if (!r.properties || !j.valid(r.geometry))
              return "";
            var n = j.any(r.geometry);
            if (!n)
              return "";
            var o = ""
              , i = "";
            if (e.simplestyle) {
              var u = h(r.style);
              u && (j.isPoint(r.geometry) && m(r.style) ? (-1 === t.indexOf(u) && (o = d(r.style, u),
                t.push(u)),
                i = S("styleUrl", "#" + u)) : (j.isPolygon(r.geometry) || j.isLine(r.geometry)) && k(r.style) && (-1 === t.indexOf(u) && (o = v(r.style, u),
                  t.push(u)),
                  i = S("styleUrl", "#" + u)))
            }
            return o + S("Placemark", a(r.properties, e) + c(r.properties, e) + f(r.properties) + s(r.properties, e) + n + i)
          }
        }
        function o(e, t) {
          if (!e.type)
            return "";
          var r = [];
          switch (e.type) {
            case "FeatureCollection":
              return e.features ? e.features.map(n(t, r)).join("") : "";
            case "Feature":
              return n(t, r)(e);
            default:
              return n(t, r)({
                type: "Feature",
                geometry: e,
                properties: {}
              })
          }
        }
        function i(e) {
          return void 0 !== e.documentName ? S("name", e.documentName) : ""
        }
        function u(e) {
          return void 0 !== e.documentDescription ? S("description", e.documentDescription) : ""
        }
        function a(e, t) {
          return e[t.name] ? S("name", L(e[t.name])) : ""
        }
        function c(e, t) {
          return e[t.description] ? S("description", L(e[t.description])) : ""
        }
        function s(e, t) {
          return e[t.timestamp] ? S("TimeStamp", S("when", L(e[t.timestamp]))) : ""
        }
        function l(e) {
          return e.map(function (e) {
            return e.join(",")
          }).join(" ")
        }
        function f(e) {
          return S("ExtendedData", w(e).map(p).join(""))
        }
        function p(e) {
          return S("Data", S("value", L(e[1])), [["name", L(e[0])]])
        }
        function m(e) {
          return !!(e["marker-size"] || e["marker-symbol"] || e["marker-color"])
        }
        function d(e, t) {
          return S("Style", S("IconStyle", S("Icon", S("href", y(e)))) + g(e), [["id", t]])
        }
        function y(e) {
          var t = e["marker-size"] || "medium"
            , r = e["marker-symbol"] ? "-" + e["marker-symbol"] : ""
            , n = (e["marker-color"] || "7e7e7e").replace("#", "");
          return "https://api.tiles.mapbox.com/v3/marker/pin-" + t.charAt(0) + r + "+" + n + ".png"
        }
        function g(e) {
          return S("hotSpot", "", [["xunits", "fraction"], ["yunits", "fraction"], ["x", .5], ["y", .5]])
        }
        function k(e) {
          for (var t in e)
            if ({
              stroke: !0,
              "stroke-opacity": !0,
              "stroke-width": !0,
              fill: !0,
              "fill-opacity": !0
            }[t])
              return !0
        }
        function v(e, t) {
          var r = S("LineStyle", [S("color", x(e.stroke, e["stroke-opacity"]) || "ff555555") + S("width", void 0 === e["stroke-width"] ? 2 : e["stroke-width"])])
            , n = "";
          return (e.fill || e["fill-opacity"]) && (n = S("PolyStyle", [S("color", x(e.fill, e["fill-opacity"]) || "88555555")])),
            S("Style", r + n, [["id", t]])
        }
        function h(e) {
          var t = "";
          return e["marker-symbol"] && (t = t + "ms" + e["marker-symbol"]),
            e["marker-color"] && (t = t + "mc" + e["marker-color"].replace("#", "")),
            e["marker-size"] && (t = t + "ms" + e["marker-size"]),
            e.stroke && (t = t + "s" + e.stroke.replace("#", "")),
            e["stroke-width"] && (t = t + "sw" + e["stroke-width"].toString().replace(".", "")),
            e["stroke-opacity"] && (t = t + "mo" + e["stroke-opacity"].toString().replace(".", "")),
            e.fill && (t = t + "f" + e.fill.replace("#", "")),
            e["fill-opacity"] && (t = t + "fo" + e["fill-opacity"].toString().replace(".", "")),
            t
        }
        function x(e, t) {
          if ("string" != typeof e)
            return "";
          if (3 === (e = e.replace("#", "").toLowerCase()).length)
            e = e[0] + e[0] + e[1] + e[1] + e[2] + e[2];
          else if (6 !== e.length)
            return "";
          var r = e[0] + e[1]
            , n = e[2] + e[3]
            , o = e[4] + e[5]
            , i = "ff";
          return "number" == typeof t && t >= 0 && t <= 1 && ((i = (255 * t).toString(16)).indexOf(".") > -1 && (i = i.substr(0, i.indexOf("."))),
            i.length < 2 && (i = "0" + i)),
            i + o + n + r
        }
        function w(e) {
          var t = [];
          for (var r in e)
            t.push([r, e[r]]);
          return t
        }

        var P = e("strxml")
          , S = P.tag
          , L = P.encode;

        t.exports = function (e, t) {
          return t = t || {
            documentName: void 0,
            documentDescription: void 0,
            name: "name",
            description: "description",
            simplestyle: !1,
            timestamp: "timestamp"
          },
            '<?xml version="1.0" encoding="UTF-8"?>' + S("kml", S("Document", i(t) + u(t) + o(e, t)), [["xmlns", "http://www.opengis.net/kml/2.2"]])
        };

        var j = {
          Point: function (e) {
            return S("Point", S("coordinates", e.coordinates.join(",")))
          },
          LineString: function (e) {
            return S("LineString", S("coordinates", l(e.coordinates)))
          },
          Polygon: function (e) {
            if (!e.coordinates.length)
              return "";
            var t = e.coordinates[0]
              , r = e.coordinates.slice(1)
              , n = S("outerBoundaryIs", S("LinearRing", S("coordinates", l(t))))
              , o = r.map(function (e) {
                return S("innerBoundaryIs", S("LinearRing", S("coordinates", l(e))))
              }).join("");
            return S("Polygon", n + o)
          },
          MultiPoint: function (e) {
            return e.coordinates.length ? S("MultiGeometry", e.coordinates.map(function (e) {
              return j.Point({
                coordinates: e
              })
            }).join("")) : ""
          },
          MultiPolygon: function (e) {
            return e.coordinates.length ? S("MultiGeometry", e.coordinates.map(function (e) {
              return j.Polygon({
                coordinates: e
              })
            }).join("")) : ""
          },
          MultiLineString: function (e) {
            return e.coordinates.length ? S("MultiGeometry", e.coordinates.map(function (e) {
              return j.LineString({
                coordinates: e
              })
            }).join("")) : ""
          },
          GeometryCollection: function (e) {
            return S("MultiGeometry", e.geometries.map(j.any).join(""))
          },
          valid: function (e) {
            return e && e.type && (e.coordinates || "GeometryCollection" === e.type && e.geometries && e.geometries.every(j.valid))
          },
          any: function (e) {
            return j[e.type] ? j[e.type](e) : ""
          },
          isPoint: function (e) {
            return "Point" === e.type || "MultiPoint" === e.type
          },
          isPolygon: function (e) {
            return "Polygon" === e.type || "MultiPolygon" === e.type
          },
          isLine: function (e) {
            return "LineString" === e.type || "MultiLineString" === e.type
          }
        }
      }, { strxml: 2 }],
      2: [function (e, t, r) {
          function n(e) {
            return e && e.length ? " " + e.map(function (e) {
              return e[0] + '="' + e[1] + '"'
            }).join(" ") : ""
          }
          t.exports.attr = n,
          t.exports.tagClose = function (e, t) {
            return "<" + e + n(t) + "/>"
          },
          t.exports.tag = function (e, t, r) {
            return "<" + e + n(r) + ">" + t + "</" + e + ">"
          },
          t.exports.encode = function (e) {
            return (null === e ? "" : e.toString()).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")
          }
      }, {}]
    }, {}, [1])(1)
  });


  omnivore.toGPX = window.togpx;
  omnivore.toKML = window.tokml;

  return omnivore;
})(window.omnivore);



/***/ }),

/***/ "./src/require/Turf.js":
/*!*****************************!*\
  !*** ./src/require/Turf.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Turf)
/* harmony export */ });
const Turf = (function (turf) {
    if (!turf) throw new Error('TurfJS is required!');
    return turf;
})(window.turf);



/***/ }),

/***/ "./src/system/Options.js":
/*!*******************************!*\
  !*** ./src/system/Options.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Options)
/* harmony export */ });
const Options = {
    theme: 'dark',
    controls: {
        options: true,
        modes: true,
        utils: true,
        types: true,
        actions: true
    },
    map: {
        container: 'map',
        center: [-95.52816680236892, 39.56431143986035],
        zoom: 3.5,
        maxPitch: 50,
        projection: 'mercator',
        style: 'mapbox://styles/mapbox/dark-v11',
        hash: true,
        extent: [[[-127.3638459,49.6212752],[-73.7295136,49.6212752],[-73.7295136,24.7473201],[-127.3638459,24.7473201],[-127.3638459,49.6212752]]],
    },
    keys: {
        import: 'u',
        export: 'd',
        delete: 'Delete',
        cancel: 'Escape',
        select: 'Escape',
        edit: 'Enter',
        refresh: 'q',
        zoom: 'z',
        locate: 'l',
        snapping: '!',
        pinning: '@',
        routing: '#',
        exploring: '$',
        painting: '%',
        LineString: '1',
        Polygon: '2',
        Rectangle: '3',
        Circle: '4',
        Text: '5',
        Icon: '6'
    },
    commands: [{
        key: '.',
        modifier: false,
        command: function (event, ctx, command) {
            var options = { lngLat: ctx.map.getCenter() }
            
            if (ctx.currentMode.id === 'draw') {
                ctx.currentMode.handleUp(options); 
                ctx.currentMode.handleClick(options);
            } else {
                ctx.currentMode.handleClick(options);
            }
        }
    }],
    units: {
        Polyline: 'feet',
        Polygon: 'acres',
        Rectangle: 'acres',
        Icon: 'feature',
        Circle: 'feature',
        Marker: 'feature'
    },
    colors: {
        error: '#ff7676',

        primaryColor: "#d7ef7e",
        primaryBackground: "#5a5a5a",
        primaryText: "#c5c5c5",
        primaryBorder: "#6fafdb",
        
        secondaryColor: "#6fafdb",
        secondaryBackground: "#333333",
        secondaryText: "#333333",
        secondaryBorder: "#404040",


        primarySelect: "#333333",
        primaryEdit: "#d7ef7e",
        primaryHot: "#d7ef7e",
        primaryCold: "#6fafdb",
        primarySnap: "#c5c5c5",
        primaryBase: "#c5c5c5",
        primaryDebug: "#ff7676",
        primaryVertex: "#c5c5c5",

        secondarySelect: "#d7ef7e",
        secondaryEdit: "#c5c5c5",
        secondaryHot: "#333333",
        secondaryCold: "#c5c5c5",
        secondarySnap: "#d7ef7e",
        secondaryBase: "#242424",
        secondaryDebug: "#d7ef7e",
        secondaryVertex: "#333333"
    },
    select: {
        popup: false,
        multiple: false
    },
    snapping: {
        enable: false, // Enables snapping to features
        pixels: false, // still working on this
        distance: 200 * 1.609344, // 200 miles to kilometers. Calculated by zoom level: (distance * Math.pow(2, Math.max(1, 19 - map.getZoom()))) / 100000
        tolerance: 0.002 // kilometers. Distance from the last click to hide/show mouse line
    },
    routing: {
        enable: false, // find shortest path
        precision: 0.0000015 // rounding coords to create topology. Higher the number will close gaps in lines and allow to find path
    },
    pinning: {
        enable: false, // Enables pinning (glueing) features together at vertices/points. When editing/dragging a point, all pinned points will move together.
        buffer: (50 / 5280) * 1.609344, // 50 feet to miles to kilometer. Pin features within a 50 foot radius. False for exact point location.
        idle: 20 // milliseconds of how long to idle after updating pinned features before checking for nearby features to snap to (helps with editing performance)
    },
    exploring: {
        enable: false,
        minZoom: 12,
        buffer: (5000 / 5280) * 1.609344, // 300 feet to miles to kilometer. Download roadways within a 300 foot radius.
        tolerance: 0.00001 // How much tolerance to simplify coordinates. Can be a function with map argument.
    },
    moving: {
        enable: false, // Enables moving feature
        distance: (3 / 5280) * 1.609344 // 3 feet to miles to kilometer. The distance in which to move the feature
    },
    painting: {
        enable: false, // Enables painting drawing for linestrings and polygons
        tolerance: 0.000005 // How much tolerance to simplify coordinates. Can be a function with map argument.
    }
}



/***/ }),

/***/ "./src/system/Statics.js":
/*!*******************************!*\
  !*** ./src/system/Statics.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Statics)
/* harmony export */ });
const Dev = 'solutegrate';
const Id = 'geoflo';

const Statics = {
    developer: Dev,
    id: Id,
    logo: {
        full: `https://${Id}.s3.amazonaws.com/logos/logo_full_white.png`,
        icon: `https://${Id}.s3.amazonaws.com/logos/logo_icon_white.svg`,
        fullClass: Id + '-logo',
        iconClass: Id + '-icon'
    },
    controls: [
        // TOP //
        [{
            type: 'utils',
            enable: true,
            position: 'top-center',
            group: 'action',
            divider: true,
            show: true,
            buttons: {
                zoom: true,
                refresh: true,
                locate: true
            }
        },
        {
            type: 'modes',
            enable: true,
            group: 'control',
            divider: true,
            show: true,
            buttons: {
                select: true,
                edit: true,
                save: true
            }
        },
        {
            type: 'options',
            enable: true,
            group: 'action',
            divider: false,
            show: true,
            buttons: {
                import: true,
                export: true,
                clear: true,
                undo: true,
                redo: true,
                cancel: true
            }
        }],

        // BOTTOM //
        [{
            type: 'types',
            enable: true,
            position: 'top-center',
            group: 'control',
            divider: true,
            show: true,
            buttons: {
                polyline: true,
                polygon: true,
                rectangle: true,
                circle: true,
                text: true
            }
        },
        {
            type: 'actions',
            enable: true,
            group: 'control',
            divider: false,
            show: true,
            buttons: {
                snapping: true,
                pinning: true,
                routing: true,
                exploring: true,
                painting: true
            }
        }]
    ],
    constants: {
        classes: {
            PREDEFINED_CONTROL_BASE: "mapboxgl-ctrl",
            PREDEFINED_CONTROL_GROUP: "mapboxgl-ctrl-group",
            CONTROL_PREFIX: "mapboxgl-ctrl-",
            ACTION_BUTTON: Id + "-action-btn",
            CONTROL_BUTTON: "mapbox-gl-draw_ctrl-draw-btn",
            CONTROL_BUTTON_LINE: "mapbox-gl-draw_line",
            CONTROL_BUTTON_POLYGON: "mapbox-gl-draw_polygon",
            CONTROL_BUTTON_RECTANGLE: "mapbox-gl-draw_rectangle",
            CONTROL_BUTTON_POINT: "mapbox-gl-draw_point",
            CONTROL_BUTTON_TEXT: "mapbox-gl-draw_text",
            CONTROL_BUTTON_ICON: "mapbox-gl-draw_icon",
            CONTROL_BUTTON_CLEAR: Id + "-delete-data",
            CONTROL_BUTTON_DELETE_SNAP: Id + "-delete-snap-data",
            CONTROL_BUTTON_LOCATE: Id + "-locate",
            CONTROL_BUTTON_ZOOM_IN_FEATURES: Id + "-zoom-in-features",
            CONTROL_BUTTON_HIDE_SELECTED: Id + "-hide-selected",
            CONTROL_BUTTON_ADD_FEATURE_TO_GRID: Id + "-add-feature-to-grid",
            CONTROL_BUTTON_CREATE_POLYGON: Id + "-create-polygon",
            CONTROL_BUTTON_COMBINE_FEATURES: "mapbox-gl-draw_combine",
            CONTROL_BUTTON_UNCOMBINE_FEATURES: "mapbox-gl-draw_uncombine",
            CONTROL_BUTTON_GROUP_FEATURES: Id + "-group-features",
            CONTROL_BUTTON_UNGROUP_FEATURES: Id + "-ungroup-features",
            CONTROL_BUTTON_DOWNLOAD_WAYS: Id + "-download-ways",
            CONTROL_BUTTON_DOWNLOAD_BUILDINGS: Id + "-download-buildings",
            CONTROL_BUTTON_REFRESH: Id + "-refresh",
            CONTROL_BUTTON_EDIT: Id + "-edit",
            CONTROL_BUTTON_CUT: Id + "-cut",
            CONTROL_BUTTON_SELECT: Id + "-select",
            CONTROL_BUTTON_DOWNLOAD_DATA: Id + "-download-data",
            CONTROL_BUTTON_EXPORT: Id + "-export",
            CONTROL_BUTTON_SAVE_AS_GIST: Id + "-save-as-gist",
            CONTROL_BUTTON_SAVE_AS_GEOJSON: Id + "-save-as-geojson",
            CONTROL_BUTTON_SAVE_AS_KML: Id + "-save-as-kml",
            CONTROL_BUTTON_EXPAND_EDITOR: Id + "-expand-editor",
            CONTROL_BUTTON_IMPORT: Id + "-import",
            CONTROL_BUTTON_FINSIH: Id + "-finish",
            CONTROL_BUTTON_CANCEL: Id + "-cancel",
            CONTROL_BUTTON_UNDO: Id + "-undo",
            CONTROL_BUTTON_REDO: Id + "-redo",
            CONTROL_GROUP: Id + "-ctrl-group",
            DROPDOWN_GROUP: Id + "-dropdown-group",
            DIVIDER: Id + "-divider",
            ACTION_GROUP: Id + "-action-group",
            ATTRIBUTION: "mapboxgl-ctrl-attrib",
            ACTIVE_BUTTON: "active",
            BOX_SELECT: "mapbox-gl-draw_boxselect",
        },
        sources: {
            SELECT: Id + "-select",
            SNAP: Id + "-snap",
            ROUTE: Id + "-route",
            HOT: Id + "-hot",
            COLD: Id + "-cold",
            MESH: Id + "-mesh",
            VERTEX: Id + "-vertex",
            HOTTEXT: Id + "-text",
            COLDTEXT: Id + "-coldtext",
            GAMEPAD: Id + "-gamepad"
        },
        layers: {
            MESH: Id + "-mesh"
        },
        cursors: {
            ADD: "add",
            MOVE: "move",
            DRAG: "drag",
            POINTER: "pointer",
            NONE: "none",
        },
        types: {
            POLYGON: "polygon",
            LINE: "line_string",
            POINT: "point",
        },
        geojsonTypes: {
            FEATURE: "Feature",
            POLYGON: "Polygon",
            LINE_STRING: "LineString",
            POINT: "Point",
            FEATURE_COLLECTION: "FeatureCollection",
            MULTI_PREFIX: "Multi",
            MULTI_POINT: "MultiPoint",
            MULTI_LINE_STRING: "MultiLineString",
            MULTI_POLYGON: "MultiPolygon",
        },
        modes: {
            DRAW: "draw",
            CUT: "cut",
            SELECT: "select",
            DELETE: "delete",
            EDIT: "edit"
        },
        events: {
            CREATE: "draw.create",
            DELETE: "draw.delete",
            UPDATE: "draw.update",
            SELECTION_CHANGE: "draw.selectionchange",
            MODE_CHANGE: "draw.modechange",
            ACTIONABLE: "draw.actionable",
            RENDER: "draw.render",
            COMBINE_FEATURES: "draw.combine",
            UNCOMBINE_FEATURES: "draw.uncombine",
        },
        updateActions: {
            MOVE: "move",
            CHANGE_COORDINATES: "change_coordinates",
        },
        meta: {
            FEATURE: "feature",
            MIDPOINT: "midpoint",
            VERTEX: "vertex",
        },
        activeStates: {
            ACTIVE: "true",
            INACTIVE: "false",
        },
        LAT_MIN: -90,
        LAT_RENDERED_MIN: -85,
        LAT_MAX: 90,
        LAT_RENDERED_MAX: 85,
        LNG_MIN: -270,
        LNG_MAX: 270,
        MIN_SEGMENT_LENGTH: 0.000001,
        MIN_DISTANCE: 0.00001, // 0.000001
        CIRCUM: 40075017
    }
};



/***/ }),

/***/ "./src/system/Utilities.js":
/*!*********************************!*\
  !*** ./src/system/Utilities.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Utilities)
/* harmony export */ });
/**
 * @mixin
 * @memberof module:geoflo
 * @name Utilities
 * @description This module provides utility functions for processing and manipulating GeoJSON features and geometries.
 * @param {Object} ctx - The GeoFlo context object
 */
const Utilities = function (ctx) {
	/**
	 * @function
     * @memberof module:geoflo.Utilities
	 * @name pointInCoordinates
	 * @description This function takes a line string and a point's coordinates as input and returns an array of indices where the point is found in the line string's coordinates.
	 * @param {Object} lineString - The line string object containing geometry coordinates.
	 * @param {Array} pointCoords - The coordinates of the point to search for in the line string.
	 * @returns {Array} An array containing the indices of the point in the line string's coordinates.
	 */
    this.pointInCoordinates = function (lineString, pointCoords) {
        var result = [];

        lineString.geometry.coordinates.forEach(function(coords, index) {
            if (index !== 0 && index !== lineString.geometry.coordinates.length - 1) {
                if (coords[0] === pointCoords[0] && coords[1] === pointCoords[1]) {
                    result.push(index);
                }
            }
        });

        return result;
    }

	/**
	 * @function
     * @memberof module:geoflo.Utilities
	 * @name sameBorders
	 * @description This function compares two sets of borders to determine if they are the same.
	 * @param {Object} fromBorders - The first set of borders to compare.
	 * @param {Object} toBorders - The second set of borders to compare.
	 * @returns {boolean} Returns true if the borders are the same, false otherwise.
	 */
    this.sameBorders = function (fromBorders, toBorders) {
        if (fromBorders && toBorders) {
            return fromBorders.border1[0] === toBorders.border1[0] && fromBorders.border1[1] === toBorders.border1[1] && fromBorders.border2[0] === toBorders.border2[0] && fromBorders.border2[1] === toBorders.border2[1] || fromBorders.border1[0] === toBorders.border2[0] && fromBorders.border1[1] === toBorders.border2[1] && fromBorders.border2[0] === toBorders.border1[0] && fromBorders.border2[1] === toBorders.border1[1];
        } else {
            return false;
        }
    }

	/**
	 * @function
     * @memberof module:geoflo.Utilities
	 * @name getRandomColor
	 * @description This function generates a random color by randomly selecting hexadecimal values for each digit of the color code.
	 * @returns {string} A random color in hexadecimal format.
	 */
    this.getRandomColor = function () {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

	/**
	 * @function
     * @memberof module:geoflo.Utilities
	 * @name createRandomStroke
	 * @description Generates a random stroke color for a shape.
	 * @returns {Object} An object containing the randomly generated stroke color.
	 */
    this.createRandomStroke = function () {
        return {
            stroke: this.getRandomColor()
        };
    }

	/**
	 * @function
     * @memberof module:geoflo.Utilities
	 * @name createLineAndSaveLength
	 * @description This function takes an array of line coordinates and properties, creates a line string with random stroke properties, calculates the length of the line, and saves it in the properties.
	 * @param {Array} lineCoords - Array of coordinates for the line string.
	 * @param {Object} props - Properties object for the line string.
	 * @returns {Object} - The created line string with saved length in properties.
	 */
    this.createLineAndSaveLength = function (lineCoords, props) {
        var copyProps = Object.assign({}, props, this.createRandomStroke());
        var line = turf.lineString(lineCoords, copyProps);
        copyProps.length = turf.lineDistance(line);
        return line;
    }

	/**
	 * @function
     * @memberof module:geoflo.Utilities
	 * @name lineSplit
	 * @description Splits a line string based on the provided point indexes and returns an array of split line strings.
	 * @param {Object} lineString - The line string object to split.
	 * @param {Array} pointIndexes - An array of indexes where the line string should be split.
	 * @returns {Array} - An array of split line strings.
	 */
    this.lineSplit = function (lineString, pointIndexes) {
        var props = lineString.properties;
        var lineCoords = [].concat(_toConsumableArray(lineString.geometry.coordinates));
        var result = [];
        var delta = 0;

        pointIndexes.forEach(function(pointIndex) {
            pointIndex -= delta;
            if (pointIndex < lineCoords.length - 1) {
                var secondPart = lineCoords.splice(pointIndex, lineCoords.length - pointIndex);
                
                if (lineCoords.length > 0) {
                    lineCoords.push(secondPart[0]);
                    result.push(this.createLineAndSaveLength(lineCoords, props));
                }

                lineCoords = secondPart;
                delta += pointIndex;
            }
        }, this);

        if (lineCoords.length > 0) {
            result.push(this.createLineAndSaveLength(lineCoords, props));
        }

        return result;
    }

	/**
	 * @function
     * @memberof module:geoflo.Utilities
	 * @name splitLines
	 * @description This function takes two line strings and splits them at their intersection points.
	 * @param {Object} lineString1 - The first line string object.
	 * @param {Object} lineString2 - The second line string object.
	 * @returns {Array|null} - An array containing the split line strings or null if no intersection points are found.
	 */
    this.splitLines = function (lineString1, lineString2) {
        var line1CutPoints = [];
        var line2CutPoints = [];

        lineString1.geometry.coordinates.forEach(function(coords, index) {
            var points = this.pointInCoordinates(lineString2, coords);
            if (points.length > 0) {
                line2CutPoints.push.apply(line2CutPoints, _toConsumableArray(points));
                line1CutPoints.push(index);
            }
        }, this);

        if (line1CutPoints.length === 0 && line2CutPoints.length === 0) {
            return null;
        } else {
            var result = [];
            result.push.apply(result, _toConsumableArray(this.lineSplit(lineString1, line1CutPoints)));
            result.push.apply(result, _toConsumableArray(this.lineSplit(lineString2, line2CutPoints)));
            return result;
        }
    }

	/**
	 * @function
     * @memberof module:geoflo.Utilities
	 * @name createSimpleMesh
	 * @description Creates a simple mesh by processing a list of features containing line strings.
	 * @param {Array} features - An array of line string features to be processed.
	 * @returns {Array} - An array of processed line segments forming the mesh.
	 */
    this.createSimpleMesh = function (features) {
        var result = [];

        features.forEach(function(lineString) {
            var props = lineString.properties;
            var coords = lineString.geometry.coordinates;
            var firstPoint = coords[0];
            var secondPoint = null;

            for (var index = 1; index < coords.length; index++) {
                secondPoint = coords[index];
                result.push(this.createLineAndSaveLength([firstPoint, secondPoint], props));
                firstPoint = secondPoint;
            }
        }, this);

        return result;
    }

	/**
	 * @function
     * @memberof module:geoflo.Utilities
	 * @name createMesh
	 * @description This function takes an array of line string features and splits them at intersection points to create a mesh.
	 * @param {Array} features - An array of line string features to create the mesh from.
	 * @returns {Array} - An array representing the mesh created by splitting the line strings at intersection points.
	 */
    this.createMesh = function (features) {
        var mesh = [];

        features.forEach(function(lineString1) {
            var line1CutPoints = lineString1.properties.cutPoints;

            if (!line1CutPoints) {
                line1CutPoints = [];
                lineString1.properties.cutPoints = line1CutPoints;
            }

            features.forEach(function(lineString2) {
                if (lineString1 !== lineString2) {
                    var line2CutPoints = lineString2.properties.cutPoints;

                    if (!line2CutPoints) {
                        line2CutPoints = [];
                        lineString2.properties.cutPoints = line2CutPoints;
                    }

                    lineString1.geometry.coordinates.forEach(function(coords, index) {
                        var points = this.pointInCoordinates(lineString2, coords);

                        if (points.length > 0) {
                            points.forEach(function(cutPoint) {
                                if (line2CutPoints.indexOf(cutPoint) === -1) {
                                    line2CutPoints.push(cutPoint);
                                }
                            });

                            if (index !== 0 && index !== lineString1.geometry.coordinates.length - 1) {
                                if (line1CutPoints.indexOf(index) === -1) {
                                    line1CutPoints.push(index);
                                }
                            }
                        }
                    }, this);
                }
            }, this);
        }, this);

        features.forEach(function(lineString) {
            lineString.properties.cutPoints.sort(function(a, b) { return a - b; });
            mesh.push.apply(mesh, _toConsumableArray(this.lineSplit(lineString, lineString.properties.cutPoints)));
        }, this);

        return mesh;
    }

	/**
	 * @function
     * @memberof module:geoflo.Utilities
	 * @name setProperty
	 * @description This function sets a property value for a given feature. If the feature does not have properties, it creates a new properties object. If the property name includes a dot (.), it creates nested objects to set the value.
	 * @param {Object} feature - The feature object to set the property for.
	 * @param {string} name - The name of the property to set.
	 * @param {any} value - The value to set for the property.
	 */
    this.setProperty = function (feature, name, value) {
        if (!feature) return false;
        
        var props = feature.properties;
        
        if (!props) {
            props = {};
            feature.properties = props;
        }

        if (name.includes('.')) {
            name = name.split('.');
            if (!props[name[0]]) props[name[0]] = {};
            props[name[0]][name[1]] = value;
        } else {
            props[name] = value;
        }
    }

	/**
	 * @function
     * @memberof module:geoflo.Utilities
	 * @name setProperties
	 * @description Updates the properties of a given feature object with new properties.
	 * @param {Object} feature - The feature object whose properties will be updated.
	 * @param {Object} newProps - The new properties to be merged with the existing properties of the feature.
	 */
    this.setProperties = function (feature, newProps) {
        feature.properties = Object.assign(feature.properties || {}, newProps);
    }

	/**
	 * @function
     * @memberof module:geoflo.Utilities
	 * @name findClosestFeatures
	 * @description This function takes an indexData object, a point object, and a radius value as parameters. It then retrieves the feature IDs within the specified radius from the point index in the indexData object. It ensures unique features are included in the result and returns an array of closest features.
	 * @param {Object} indexData - The index data object containing pointIndex, pointFeatureMap, and featureById.
	 * @param {Object} point - The point object with lng (longitude) and lat (latitude) properties.
	 * @param {number} radius - The radius within which to search for features.
	 * @returns {Array} An array of closest features to the given point within the specified radius.
	 */
    this.findClosestFeatures = function (indexData, point, radius) {
        var featureIdsWithin = indexData.pointIndex.within(point.lng, point.lat, radius);
        var assertUniqueFeatures = {};
        var featureResult = [];

        featureIdsWithin.forEach(function(pointId) {
            var featureId = indexData.pointFeatureMap[pointId];
            if (!assertUniqueFeatures[featureId]) {
                featureResult.push(indexData.featureById[featureId]);
                assertUniqueFeatures[featureId] = true;
            }
        });
        
        return featureResult;
    }

	/**
	 * @function
     * @memberof module:geoflo.Utilities
	 * @name isPointEqual
	 * @description Checks if two points are equal based on their coordinates.
	 * @param {Array} coords1 - The coordinates of the first point [x, y].
	 * @param {Array} coords2 - The coordinates of the second point [x, y].
	 * @returns {boolean} Returns true if the points have the same coordinates, false otherwise.
	 */
    this.isPointEqual = function (coords1, coords2) {
        return coords1[0] === coords2[0] && coords1[1] === coords2[1];
    }

	/**
	 * @function
     * @memberof module:geoflo.Utilities
	 * @name isPoint
	 * @description This function takes a feature object and determines if it represents a Point geometry.
	 * @param {Object} f - The feature object to be checked.
	 * @returns {boolean} Returns true if the feature is a Point geometry, false otherwise.
	 */
    this.isPoint = function (f) {
        return !f ? false : f.geometry.type === 'Point';
    }

	/**
	 * @function
     * @memberof module:geoflo.Utilities
	 * @name isPolygon
	 * @description This function determines if a feature represents a polygon by comparing its first and last coordinates.
	 * @param {Object} feature - The feature object to be checked.
	 * @returns {boolean} Returns true if the feature is a polygon, false otherwise.
	 */
    this.isPolygon = function (feature) {
        var coords = feature.geometry.coordinates;
        var firstCoords = coords[0];
        var lastCoords = coords[coords.length - 1];
        return this.isPointEqual(firstCoords, lastCoords);
    }

	/**
	 * @function
     * @memberof module:geoflo.Utilities
	 * @name isLineString
	 * @description This function takes a GeoJSON feature object and determines if it represents a LineString geometry.
	 * @param {Object} f - The GeoJSON feature object to be checked.
	 * @returns {boolean} Returns true if the feature is a LineString, false otherwise.
	 */
    this.isLineString = function (f) {
        return !f ? false : f.geometry.type === 'LineString';
    }

	/**
	 * @function
     * @memberof module:geoflo.Utilities
	 * @name isValidLineString
	 * @description Checks if the input feature is a valid LineString by verifying its geometry coordinates.
	 * @param {Object} f - The input feature to be validated.
	 * @returns {boolean} Returns true if the input feature is a valid LineString, false otherwise.
	 */
    this.isValidLineString = function (f) {
        if (!this.isLineString(f)) return false;
        var coords = f.geometry.coordinates;
        if (coords.length < 2) return false;
        return true;
    }

	/**
	 * @function
     * @memberof module:geoflo.Utilities
	 * @name isLastIndex
	 * @description This function determines if the provided index is the last index in the coordinates array of a feature.
	 * @param {number} i - The index to check.
	 * @param {object} f - The feature object containing the coordinates array.
	 * @returns {boolean} Returns true if the index is the last index, false otherwise.
	 */
    this.isLastIndex = function (i, f) {
        return !f ? false :
        this.isLineString(f) ? i == f.geometry.coordinates.length - 1 :
        this.isPolygon(f) ? i == f.geometry.coordinates[0].length - 1 :
        i == 0 ? true :
        false;
    }

	/**
	 * @function
     * @memberof module:geoflo.Utilities
	 * @name getLastIndexCoords
	 * @description This function returns the last coordinates of a given geometry object.
	 * @param {Object} f - The geometry object to extract the last coordinates from.
	 * @returns {Array} The last coordinates of the geometry object.
	 */
    this.getLastIndexCoords = function (f) {
        return this.isLineString(f) ? f.geometry.coordinates[f.geometry.coordinates.length - 1] :
        this.isPolygon(f) ? f.geometry.coordinates[0][f.geometry.coordinates.length - 1] :
        f.geometry.coordinates;
    }

	/**
	 * @function
     * @memberof module:geoflo.Utilities
	 * @name isEmptyLineString
	 * @description This function determines if the provided feature is a LineString with only two identical points, making it an empty LineString.
	 * @param {Object} feature - The feature object to be checked.
	 * @returns {boolean} Returns true if the feature is an empty LineString, otherwise false.
	 */
    this.isEmptyLineString = function (feature) {
        if (feature.geometry.type === "LineString") {
            var coords = feature.geometry.coordinates;

            if (coords.length === 2) {
                var firstCoords = coords[0];
                var lastCoords = coords[coords.length - 1];
                return this.isPointEqual(firstCoords, lastCoords);
            }
        }

        return false;
    }

	/**
	 * @function
     * @memberof module:geoflo.Utilities
	 * @name isPointAtVertex
	 * @description This function determines if a point is at the first or last vertex of a geometry by comparing it with the first and last coordinates.
	 * @param {Array} geometryCoords - The array of coordinates representing the geometry.
	 * @param {Array} pointCoords - The coordinates of the point to check.
	 * @returns {boolean} Returns true if the point is at the first or last vertex, false otherwise.
	 */
    this.isPointAtVertex = function (geometryCoords, pointCoords) {
        var firstPoint = geometryCoords[0];
        var lastPoint = geometryCoords[geometryCoords.length - 1];
        return this.isPointEqual(firstPoint, pointCoords) || this.isPointEqual(lastPoint, pointCoords);
    }

	/**
	 * @function
     * @memberof module:geoflo.Utilities
	 * @name isPointNotTooClose
	 * @description This function calculates the distance between two points and checks if it exceeds a minimum distance threshold.
	 * @param {Array<number>} coords1 - The coordinates of the first point [x, y].
	 * @param {Array<number>} coords2 - The coordinates of the second point [x, y].
	 * @returns {boolean} Returns true if the distance between the points is greater than or equal to the minimum distance threshold, false otherwise.
	 */
    this.isPointNotTooClose = function (coords1, coords2) {
        var line = turf.lineString([coords1, coords2]);
        var length = turf.lineDistance(line);

        if (length >= statics.constants.MIN_DISTANCE) {
            return !(coords1[0] === coords2[0] && coords1[1] === coords2[1]);
        } else {
            return false;
        }
    }

	/**
	 * @function
     * @memberof module:geoflo.Utilities
	 * @name isOverlapping
	 * @description This function takes two features and determines if they overlap by comparing their bounding boxes.
	 * @param {Object} feature1 - The first feature object with geometry.coordinates.
	 * @param {Object} feature2 - The second feature object with geometry.coordinates.
	 * @returns {boolean} Returns true if the features overlap, false otherwise.
	 */
    this.isOverlapping = function (feature1, feature2) {
        var coords1 = feature1.geometry.coordinates;
        var coords2 = feature2.geometry.coordinates;

        if (coords1.length === 2 && coords2.length === 2) {
            var bbox1 = this.createBbox(coords1);
            var bbox2 = this.createBbox(coords2);
            if (bbox1.east < bbox2.west || bbox1.west > bbox2.east) {
                return false;
            } else if (bbox1.north < bbox2.south || bbox1.south > bbox2.north) {
                return false;
            }
            return true;
        } else {
            throw new Error("wrong number of coordinates, expected 2");
        }
    }

	/**
	 * @function
     * @memberof module:geoflo.Utilities
	 * @name createLineWithLength
	 * @description This function takes an array of coordinates and creates a line string using Turf.js. It then calculates the length of the line and sets it as a property of the line.
	 * @param {Array} coords - An array of coordinates [ [x1, y1], [x2, y2], ... ].
	 * @returns {Object} - A Turf.js line string with the calculated length property.
	 */
    this.createLineWithLength = function (coords) {
        var line = turf.lineString(coords);
        var length = turf.lineDistance(line);
        this.setProperties(line, { length: length });
        return line;
    }

	/**
	 * @function
     * @memberof module:geoflo.Utilities
	 * @name reducePrecision
	 * @description This function reduces the precision of the coordinates to 7 decimal places.
	 * @param {Array} coords - An array containing the coordinates to be processed.
	 * @returns {Array} The coordinates with reduced precision to 7 decimal places.
	 */
    this.reducePrecision = function (coords) {
        coords[0] = Number(Number(coords[0]).toFixed(7));
        coords[1] = Number(Number(coords[1]).toFixed(7));
        return coords;
    }

	/**
	 * @function
     * @memberof module:geoflo.Utilities
	 * @name createBbox
	 * @description This function takes an array of two coordinates and constructs a bounding box object with west, east, south, and north properties.
	 * @param {Array} coords - An array of two coordinates in the format [[lon1, lat1], [lon2, lat2]].
	 * @returns {Object} Returns a bounding box object with west, east, south, and north properties.
	 */
    this.createBbox = function (coords) {
        var bbox1 = {};
        if (coords[0][0] < coords[1][0]) {
            bbox1.west = coords[0][0];
            bbox1.east = coords[1][0];
        } else {
            bbox1.west = coords[1][0];
            bbox1.east = coords[0][0];
        }
        if (coords[0][1] < coords[1][1]) {
            bbox1.south = coords[0][1];
            bbox1.north = coords[1][1];
        } else {
            bbox1.south = coords[1][1];
            bbox1.north = coords[0][1];
        }
        return bbox1;
    }

	/**
	 * @function
     * @memberof module:geoflo.Utilities
	 * @name stringToDOM
	 * @description Converts a string to a DOM object using DOMParser.
	 * @param {string} str - The input string to be converted to a DOM object.
	 * @returns {Document} - The DOM object created from the input string.
	 */
    this.stringToDOM = function (str) {
        var parser = new DOMParser();
        return parser.parseFromString(str, "text/xml");
    }

	/**
	 * @function
     * @memberof module:geoflo.Utilities
	 * @name processFiles
	 * @description This function reads each file in the input array, extracts the file name and extension, and then reads the file content using FileReader. The content is passed to the handler function along with the file name and extension.
	 * @param {File[]} files - An array of File objects to be processed.
	 * @param {function} handler - A function that will be called for each file with the file content, name, and extension as parameters.
	 */
    this.processFiles = function (files, handler) {
        files.forEach(function(file) {
            var name = file.name;
            var ext = name.substring(name.lastIndexOf('.') + 1, name.length).toLowerCase();
            var fileReader = new FileReader();

            fileReader.onloadend = function() {
                if (fileReader.readyState === FileReader.DONE) {
                    try {
                        handler(fileReader.result, name, ext);
                    } catch (e) {
                        console.log(e);
                        console.error("Invalid JSON data");
                    }
                }
            }
            
            fileReader.readAsText(file);
        });
    }

	/**
	 * @function
     * @memberof module:geoflo.Utilities
	 * @name combineSameTypeFeatures
	 * @description This function takes an array of line features and combines them by connecting them based on their coordinates. It checks the endpoints of each line feature and connects them accordingly to form a continuous line.
	 * @param {Array} features - An array of line features to be combined.
	 * @returns {Array} - An array of coordinates representing the combined line features.
	 */
    this.combineSameTypeFeatures = function (features) {
        var coords = [];

        features.forEach(function(lineString) {
            if (coords.length === 0) {
                coords.push.apply(coords, _toConsumableArray(lineString.geometry.coordinates));
            } else {
                var firstPoint = coords[0];
                var lastPoint = coords[coords.length - 1];
                var currentFirstPoint = lineString.geometry.coordinates[0];
                var currentLastPoint = lineString.geometry.coordinates[lineString.geometry.coordinates.length - 1];

                if (this.isPointEqual(lastPoint, currentFirstPoint)) {
                    coords.push.apply(coords, _toConsumableArray(lineString.geometry.coordinates.slice(1, lineString.geometry.coordinates.length)));
                } else if (this.isPointEqual(lastPoint, currentLastPoint)) {
                    coords.push.apply(coords, _toConsumableArray(lineString.geometry.coordinates.slice(0, lineString.geometry.coordinates.length - 1).reverse()));
                } else if (this.isPointEqual(firstPoint, currentLastPoint)) {
                    coords.splice.apply(coords, [0, 0].concat(_toConsumableArray(lineString.geometry.coordinates.slice(0, lineString.geometry.coordinates.length - 1))));
                } else if (this.isPointEqual(firstPoint, currentFirstPoint)) {
                    coords.splice.apply(coords, [0, 1].concat(_toConsumableArray(lineString.geometry.coordinates.reverse())));
                } else {
                    var distanceToFirstPoint = turf.distance(lastPoint, currentFirstPoint);
                    var distanceToLastPoint = turf.distance(lastPoint, currentLastPoint);

                    if (distanceToFirstPoint < distanceToLastPoint) {
                        coords.push.apply(coords, _toConsumableArray(lineString.geometry.coordinates));
                    } else {
                        coords.push.apply(coords, _toConsumableArray([].concat(_toConsumableArray(lineString.geometry.coordinates)).reverse()));
                    }
                }
            }
        }, this);

        return coords;
    }

	/**
	 * @function
     * @memberof module:geoflo.Utilities
	 * @name degrees2meters
	 * @description This function takes an array of latitude and longitude in degrees and converts it to meters using the Mercator projection formula.
	 * @param {Array<number>} px - An array containing latitude and longitude in degrees [longitude, latitude].
	 * @returns {Array<number>} An array containing the converted x and y coordinates in meters.
	 */
    this.degrees2meters = function (px) {
        const x = px[0] * 20037508.34 / 180;
        let y = Math.log(Math.tan((90 + px[1]) * Math.PI / 360)) / (Math.PI / 180);
        y = y * 20037508.34 / 180;
        return [x, y]
    }

	/**
	 * @function
     * @memberof module:geoflo.Utilities
	 * @name meters2degrees
	 * @description This function takes a pixel value and converts it to longitude and latitude in degrees.
	 * @param {Array} px - The pixel value to be converted, in the format [x, y].
	 * @returns {Array} An array containing the longitude and latitude in degrees, [lon, lat].
	 */
    this.meters2degrees = function (px) {
        const lon = px[0] * 180 / 20037508.34;
        const lat = Math.atan(Math.exp(px[1] * Math.PI / 20037508.34)) * 360 / Math.PI - 90;
        return [lon, lat]
    }

	/**
	 * @function
     * @memberof module:geoflo.Utilities
	 * @name extend
	 * @description Extends the properties of the first object with the properties of the subsequent objects.
	 * @param {Object} target - The object to be extended.
	 * @param {...Object} sources - The objects whose properties will be added to the target object.
	 * @return {Object} The extended object.
	 */
    this.extend = function () {
        for(var i=1; i<arguments.length; i++)
            for(var key in arguments[i])
                if(arguments[i].hasOwnProperty(key))
                    arguments[0][key] = arguments[i][key];
        return arguments[0];
    }

	/**
	 * @function
     * @memberof module:geoflo.Utilities
	 * @name clone
	 * @description This function recursively clones the input object or array, preserving the structure and types of the elements.
	 * @param {Object|Array|Date|RegExp|Function|Symbol} thing - The object or array to be cloned.
	 * @param {Object} opts - Optional settings for cloning functions and symbols.
	 * @returns {Object|Array|Date|RegExp|Function|Symbol} - A deep clone of the input object or array.
	 */
    this.clone = function(thing, opts) {
        var newObject = {};

        if (thing instanceof Array) {
            return thing.map(function (i) { return this.clone(i, opts); }, this);
        } else if (thing instanceof Date) {
            return new Date(thing);
        } else if (thing instanceof RegExp) {
            return new RegExp(thing);
        } else if (thing instanceof Function) {
            return opts && opts.newFns ?
            new Function('return ' + thing.toString())() :
            thing;
        } else if (thing instanceof Object) {
            Object.keys(thing).forEach(function (key) { newObject[key] = this.clone(thing[key], opts); }, this);
            return newObject;
        } else if ([ undefined, null ].indexOf(thing) > -1) {
            return thing;
        } else {
            if (thing.constructor.name === 'Symbol') {
                return Symbol(thing.toString().replace(/^Symbol\(/, '').slice(0, -1));
            }

            return thing.__proto__.constructor(thing);
        }
    }

	/**
	 * @function
     * @memberof module:geoflo.Utilities
	 * @name cloneDeep
	 * @description Recursively clones a value, including objects and arrays, preserving the original structure deeply.
	 * @param {any} value - The value to be cloned.
	 * @param {Function} instance - A function that can be used to clone custom instances.
	 * @returns {any} - The deeply cloned value.
	 */
    this.cloneDeep = function(value, instance) {
        var hasOwn = Object.prototype.hasOwnProperty;
        var toString = Object.prototype.toString;
    
        function _cloneDeep(val, instanceClone) {
            switch (kindOf(val)) {
            case 'object':
                return cloneObjectDeep(val, instanceClone);
            case 'array':
                return cloneArrayDeep(val, instanceClone);
            default:
                {
                    return clone(val);
                }
            }
        }
    
        function cloneObjectDeep(obj, instanceClone) {
            if (isObject(obj)) {
                var res = {};
                forOwn(obj, function(obj, key) {
                    this[key] = _cloneDeep(obj, instanceClone);
                }, res);
                return res;
            } else if (instanceClone) {
                return instanceClone(obj);
            } else {
                return obj;
            }
        }
    
        function cloneArrayDeep(arr, instanceClone) {
            var len = arr.length
            , res = [];
            var i = -1;
            while (++i < len) {
                res[i] = _cloneDeep(arr[i], instanceClone);
            }
            return res;
        }
    
        function isObject(val) {
            return val != null && typeof val === 'object' && Array.isArray(val) === false;
        }
    
        function isObjectObject(o) {
            return isObject(o) === true && Object.prototype.toString.call(o) === '[object Object]';
        }
    
        function isPlainObject(o) {
            var ctor, prot;
    
            if (isObjectObject(o) === false)
                return false;
    
            // If has modified constructor
            ctor = o.constructor;
            if (typeof ctor !== 'function')
                return false;
    
            // If has modified prototype
            prot = ctor.prototype;
            if (isObjectObject(prot) === false)
                return false;
    
            // If constructor does not have an Object-specific method
            if (prot.hasOwnProperty('isPrototypeOf') === false) {
                return false;
            }
    
            // Most likely a plain Object
            return true;
        }
    
        function forIn(obj, fn, thisArg) {
            for (var key in obj) {
                if (fn.call(thisArg, obj[key], key, obj) === false) {
                    break;
                }
            }
        }
    
        function forOwn(obj, fn, thisArg) {
            forIn(obj, function(val, key) {
                if (hasOwn.call(obj, key)) {
                    return fn.call(thisArg, obj[key], key, obj);
                }
            });
        }
    
        function kindOf(val) {
            // primitivies
            if (typeof val === 'undefined') {
                return 'undefined';
            }
            if (val === null) {
                return 'null';
            }
            if (val === true || val === false || val instanceof Boolean) {
                return 'boolean';
            }
            if (typeof val === 'string' || val instanceof String) {
                return 'string';
            }
            if (typeof val === 'number' || val instanceof Number) {
                return 'number';
            }
    
            // functions
            if (typeof val === 'function' || val instanceof Function) {
                return 'function';
            }
    
            // array
            if (typeof Array.isArray !== 'undefined' && Array.isArray(val)) {
                return 'array';
            }
    
            // check for instances of RegExp and Date before calling `toString`
            if (val instanceof RegExp) {
                return 'regexp';
            }
            if (val instanceof Date) {
                return 'date';
            }
    
            // other objects
            var type = toString.call(val);
    
            if (type === '[object RegExp]') {
                return 'regexp';
            }
            if (type === '[object Date]') {
                return 'date';
            }
            if (type === '[object Arguments]') {
                return 'arguments';
            }
            if (type === '[object Error]') {
                return 'error';
            }
    
            // buffer
            if (isBuffer(val)) {
                return 'buffer';
            }
    
            // es6: Map, WeakMap, Set, WeakSet
            if (type === '[object Set]') {
                return 'set';
            }
            if (type === '[object WeakSet]') {
                return 'weakset';
            }
            if (type === '[object Map]') {
                return 'map';
            }
            if (type === '[object WeakMap]') {
                return 'weakmap';
            }
            if (type === '[object Symbol]') {
                return 'symbol';
            }
    
            // typed arrays
            if (type === '[object Int8Array]') {
                return 'int8array';
            }
            if (type === '[object Uint8Array]') {
                return 'uint8array';
            }
            if (type === '[object Uint8ClampedArray]') {
                return 'uint8clampedarray';
            }
            if (type === '[object Int16Array]') {
                return 'int16array';
            }
            if (type === '[object Uint16Array]') {
                return 'uint16array';
            }
            if (type === '[object Int32Array]') {
                return 'int32array';
            }
            if (type === '[object Uint32Array]') {
                return 'uint32array';
            }
            if (type === '[object Float32Array]') {
                return 'float32array';
            }
            if (type === '[object Float64Array]') {
                return 'float64array';
            }
    
            // must be a plain object
            return 'object';
        }
    
        function isBuffer(obj) {
            return obj != null && (_isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
        }
    
        function _isBuffer(obj) {
            return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
        }
    
        function isSlowBuffer(obj) {
            return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
        }
    
        function isExtendable(val) {
            return typeof val !== 'undefined' && val !== null && (typeof val === 'object' || typeof val === 'function');
        }
    
        function mixin(target, objects) {
            if (!isExtendable(target)) {
                throw new TypeError('mixin-object expects the first argument to be an object.');
            }
            var len = arguments.length
            , i = 0;
            while (++i < len) {
                var obj = arguments[i];
                if (isExtendable(obj)) {
                    forIn(obj, copy, target);
                }
            }
            return target;
        }
    
        function clone(val) {
            var type = kindOf(val);
    
            if (clone.hasOwnProperty(type)) {
                return clone[type](val);
            }
            return val;
        }
    
        clone.array = function cloneArray(arr) {
            return arr.slice();
        }
    
        clone.date = function cloneDate(date) {
            return new Date(+date);
        }
    
        clone.object = function cloneObject(obj) {
            if (isExtendable(obj)) {
                return mixin({}, obj);
            } else {
                return obj;
            }
        }
    
        clone.regexp = function cloneRegExp(re) {
            var flags = '';
            flags += re.multiline ? 'm' : '';
            flags += re.global ? 'g' : '';
            flags += re.ignorecase ? 'i' : '';
            return new RegExp(re.source,flags);
        }
    
        return _cloneDeep(value, instance);
    }

	/**
	 * @function
     * @memberof module:geoflo.Utilities
	 * @name assignDeep
	 * @description Recursively assigns properties of source object to target object deeply.
	 * @param {Object} target - The target object to which properties will be assigned.
	 * @param {Object} source - The source object whose properties will be assigned to the target.
	 * @param {Object} options - Optional parameters for the assignment process.
	 * @param {boolean} [options.isMutatingOk=false] - Flag to allow mutating the target object.
	 * @param {boolean} [options.isStrictlySafe=false] - Flag to enforce strict safety checks during assignment.
	 * @returns {Object} The target object with assigned properties from the source object.
	 */
    this.assignDeep = function (target, source, {isMutatingOk = false, isStrictlySafe = false} = {}) {
        target = isMutatingOk ? target : this.cloneDeep(target);

        for (const [key, val] of Object.entries(source)) {
            if (val !== null && typeof val === `object`) {
                if (target[key] === undefined) target[key] = {};    
                target[key] = this.assignDeep(target[key], val, {isMutatingOk: true});
            } else {
                target[key] = val;
            }
        }

        return target;
    }

	/**
	 * @function
     * @memberof module:geoflo.Utilities
	 * @name compareDeep
	 * @description Recursively compares two objects deeply to check if they are equal.
	 * @param {Object} x - The first object to compare.
	 * @param {Object} y - The second object to compare.
	 * @returns {boolean} Returns true if the objects are deeply equal, false otherwise.
	 */
    this.compareDeep = function() {
        var i, l, leftChain, rightChain;
      
        function compare2Objects (x, y) {
          var p;
      
          // remember that NaN === NaN returns false
          // and isNaN(undefined) returns true
          if (isNaN(x) && isNaN(y) && typeof x === 'number' && typeof y === 'number') {
               return true;
          }
      
          // Compare primitives and functions.     
          // Check if both arguments link to the same object.
          // Especially useful on the step where we compare prototypes
          if (x === y) {
              return true;
          }
      
          // Works in case when functions are created in constructor.
          // Comparing dates is a common scenario. Another built-ins?
          // We can even handle functions passed across iframes
          if ((typeof x === 'function' && typeof y === 'function') ||
             (x instanceof Date && y instanceof Date) ||
             (x instanceof RegExp && y instanceof RegExp) ||
             (x instanceof String && y instanceof String) ||
             (x instanceof Number && y instanceof Number)) {
              return x.toString() === y.toString();
          }
      
          // At last checking prototypes as good as we can
          if (!(x instanceof Object && y instanceof Object)) {
              return false;
          }
      
          if (x.isPrototypeOf(y) || y.isPrototypeOf(x)) {
              return false;
          }
      
          if (x.constructor !== y.constructor) {
              return false;
          }
      
          if (x.prototype !== y.prototype) {
              return false;
          }
      
          // Check for infinitive linking loops
          if (leftChain.indexOf(x) > -1 || rightChain.indexOf(y) > -1) {
               return false;
          }
      
          // Quick checking of one object being a subset of another.
          // todo: cache the structure of arguments[0] for performance
          for (p in y) {
              if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
                  return false;
              }
              else if (typeof y[p] !== typeof x[p]) {
                  return false;
              }
          }
      
          for (p in x) {
              if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
                  return false;
              }
              else if (typeof y[p] !== typeof x[p]) {
                  return false;
              }
      
              switch (typeof (x[p])) {
                  case 'object':
                  case 'function':
      
                      leftChain.push(x);
                      rightChain.push(y);
      
                      if (!compare2Objects (x[p], y[p])) {
                          return false;
                      }
      
                      leftChain.pop();
                      rightChain.pop();
                      break;
      
                  default:
                      if (x[p] !== y[p]) {
                          return false;
                      }
                      break;
              }
          }
      
          return true;
        }
      
        if (arguments.length < 1) return true;
      
        for (i = 1, l = arguments.length; i < l; i++) {
      
            leftChain = []; //Todo: this can be cached
            rightChain = [];
      
            if (!compare2Objects(arguments[0], arguments[i])) return false;
        }
      
        return true;
    }

	/**
	 * @function
     * @memberof module:geoflo.Utilities
	 * @name consumableArray
	 * @description Creates a consumable copy of an array or array-like object.
	 * @param {Array|Array-like} arr - The input array or array-like object to be copied.
	 * @returns {Array} A consumable copy of the input array or array-like object.
	 */
    this.consumableArray = function (arr) {
        if (Array.isArray(arr)) {
            for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
                arr2[i] = arr[i];
            }
            return arr2;
        } else {
            return Array.from(arr);
        }
    }
}

function _toConsumableArray(arr) {
    if (Array.isArray(arr)) {
        for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
            arr2[i] = arr[i];
        }
        return arr2;
    } else {
        return Array.from(arr);
    }
}



/***/ }),

/***/ "./src/ux/Controls.js":
/*!****************************!*\
  !*** ./src/ux/Controls.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Control)
/* harmony export */ });
const Attr = function (ctx, element, control) {
    var classTypes = ['mouse'];

    var currentMapClasses = {
        mode: null,
        feature: null,
        mouse: null
    };

    var nextMapClasses = {
        mode: null,
        feature: null,
        mouse: null
    };




    const mouseleave = function (event) {
        if (!ctx.currentMode) return false;
        ctx.currentMode.handleOffMap ? ctx.currentMode.handleOffMap(event) : false;
    }

    const mouseover = function (event) {
        if (!ctx.currentMode) return false;
        ctx.currentMode.handleOnMap ? ctx.currentMode.handleOnMap(event) : false;
    }

    const click = function (event) {
        /* if (options.icon) {
            ctx.map.setPitch(0);
            ctx.map.setBearing(0);
            ctx.setIcon();
        } */
    }

    

    function queueMapClasses(options) {
        nextMapClasses = ctx.Utilities.extend(nextMapClasses, options);
    }

    function updateMapClasses() {
        if (!ctx.container)
            return;

        var classesToRemove = [];
        var classesToAdd = [];

        classTypes.forEach(function(type) {
            if (nextMapClasses[type] === currentMapClasses[type])
                return;

            classesToRemove.push(type + '-' + currentMapClasses[type]);
            if (nextMapClasses[type] !== null) {
                classesToAdd.push(type + '-' + nextMapClasses[type]);
            }
        });

        if (classesToRemove.length > 0) {
            var _ctx$container$classL;

            (_ctx$container$classL = ctx.container.classList).remove.apply(_ctx$container$classL, classesToRemove);
        }

        if (classesToAdd.length > 0) {
            var _ctx$container$classL2;

            (_ctx$container$classL2 = ctx.container.classList).add.apply(_ctx$container$classL2, classesToAdd);
        }

        currentMapClasses = ctx.Utilities.extend(currentMapClasses, nextMapClasses);
    }


    function createTitle(options) {
        return '' + options.title + (options.key ? ' (' + options.key + ')' : "");
    }

    function createAttr (element) {
        var attr = document.createElement('img');
        var icon = control.icon ? 'icon' : '';
        var rotate = control.rotate;

        attr.className = 'mapboxgl-ctrl-logo ' + ctx.id;
        icon ? attr.className += `-${icon}` : false;
       
        attr.setAttribute('target', '_blank');
        attr.setAttribute('src', control.attribution);

        if (rotate) attr.style.rotate = rotate + 'deg';
                
        element.appendChild(attr);
        element.style.display = control.show ? control.position.includes('center') ?  'flex' : 'block' : 'none';
        element.addEventListener('click', click);
        element.addEventListener('mouseover', mouseover);
        element.addEventListener('mouseleave', mouseleave);
        return element;
    }

    createAttr(element);

    return {
        queueMapClasses: queueMapClasses,
        updateMapClasses: updateMapClasses,
        position: control.position
    };
}


const Buttons = function (ctx, element, controls) {
    if (!controls || !element) return false;

    var classTypes = ['mode', 'feature', 'mouse'];
    var buttonElements = {};
    var buttonOptions = {};
    var activeButton = null;
    var currentControl;
    var position;
    

    var currentMapClasses = {
        mode: null,
        feature: null,
        mouse: null
    };

    var nextMapClasses = {
        mode: null,
        feature: null,
        mouse: null
    };



    const mouseleave = function (event) {
        if (!ctx.currentMode) return false;
        ctx.currentMode.handleOffMap ? ctx.currentMode.handleOffMap(event) : false;
    }

    const mouseover = function (event) {
        if (!ctx.currentMode) return false;
        ctx.currentMode.handleOnMap ? ctx.currentMode.handleOnMap(event) : false;
    }

    controls.forEach(function (control) {
        if (!getControlOptions(control)) control.show = false;
        setPosition(control);
        createButtons(element, control);
    })

    return {
        setActiveButton: setActiveButton,
        queueMapClasses: queueMapClasses,
        updateMapClasses: updateMapClasses,
        removeButtons: removeButtons,
        getButtonOptions: getButtonOptions,
        getButtonElements: getButtonElements,
        position: position
    };
    

    function queueMapClasses(options) {
        nextMapClasses = ctx.Utilities.extend(nextMapClasses, options);
    }

    function updateMapClasses() {
        if (!ctx.container)
            return;

        var classesToRemove = [];
        var classesToAdd = [];

        classTypes.forEach(function(type) {
            if (nextMapClasses[type] === currentMapClasses[type])
                return;

            classesToRemove.push(type + '-' + currentMapClasses[type]);
            if (nextMapClasses[type] !== null) {
                classesToAdd.push(type + '-' + nextMapClasses[type]);
            }
        });

        if (classesToRemove.length > 0) {
            var _ctx$container$classL;

            (_ctx$container$classL = ctx.container.classList).remove.apply(_ctx$container$classL, classesToRemove);
        }

        if (classesToAdd.length > 0) {
            var _ctx$container$classL2;

            (_ctx$container$classL2 = ctx.container.classList).add.apply(_ctx$container$classL2, classesToAdd);
        }

        currentMapClasses = ctx.Utilities.extend(currentMapClasses, nextMapClasses);
    }



    function createTitle(options) {
        return '' + options.title + (options.key ? ' (' + options.key + ')' : "");
    }

    function createButtons (element, control) {
        var buttons = document.createElement('div');
        var group = (control.group ? control.group.toUpperCase() : control.attribution ? 'ATTR' : 'NONE') + '_GROUP';
        
        element.appendChild(buttons);

        buttons.className = '' + ctx.statics.constants.classes[group] + ' ' + control.type;
        buttons.style.display = control.show ? position.includes('center') ?  'flex' : 'block' : 'none';

        control.show && control.divider ? element.appendChild(createDivider()) : false;

        buttons.addEventListener('mouseover', mouseover);
        buttons.addEventListener('mouseleave', mouseleave);

        addButtons(control, buttons);

        return buttons;
    }

    function createBaseButton(id, options) {
        if (!currentControl || !currentControl.buttons[id]) return false;

        var position = options.position;
        var button = options.button || document.createElement('button');

        options.key = ctx.options.keys && ctx.options.keys[id] ? ctx.options.keys[id] : options.key;

        if (options.title) { button.setAttribute('title', createTitle(options)); }
        options.container.appendChild(button);

        options["id"] = id;
        options["button"] = button;

        options.add = function (opts={}) {
            this.button.style.display = 'flex';
            this.onAdd ? this.onAdd(opts) : this;
        }

        options.remove = function (opts={}) {
            this.button.style.display = 'none';
            this.onRemove ? this.onRemove(opts) : this;
        }

        options.activate = function () {
            this.button.classList.remove(options.inactiveClass);
            this.button.classList.add(options.activeClass);
            this.button.classList.add(ctx.statics.constants.classes.ACTIVE_BUTTON);
        }

        options.deactivate = function () {
            button.classList.remove(options.activeClass);
            button.classList.remove(ctx.statics.constants.classes.ACTIVE_BUTTON);
            button.classList.add(options.inactiveClass);
        }

        options.dontShow ? button.style.display = 'none' : false;

        buttonElements[id] = button;
        buttonOptions[id] = options;

        if (position) {
            position = position.includes('right') ? 'left' :
            position.includes('left') ? 'right' :
            position.includes('bottom') ? 'top' :
            position.includes('top') ? 'bottom' :
            'absolute';
        }

        options.container.tooltipPosition = position;
        ctx.addTooltip(options.container, button, createTitle(options));
        return button;
    }

    function createControlButton(id) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        var button = createBaseButton(id, options);
        if (!button) return false;

        button.className = ctx.statics.constants.classes.CONTROL_BUTTON + ' ' + options.className;

        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();

            if (e.target === activeButton) {
                deactivateButtons();
                options.onDeactivate ? options.onDeactivate(options) : false;
            } else if (options.onActivate(options)) {
                setActiveButton(id);
            }
        }, true);

        return button;
    }

    function createOptionButton(id) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        var button = createBaseButton(id, options);
        if (!button) return false;

        button.className = '' + ctx.statics.constants.classes.CONTROL_BUTTON;

        if (ctx.options[options.name] && ctx.options[options.name].enable) {
            button.classList.add(options.activeClass);
            button.classList.add(ctx.statics.constants.classes.ACTIVE_BUTTON);
        } else {
            button.classList.add(options.inactiveClass);
        }

        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            if (!ctx.options[options.name]) { ctx.options[options.name] = {}; }

            if (ctx.options[options.name].enable) {
                if (options.onDeactivate) options.onDeactivate(options);
            } else {
                options.onActivate(options);
            }
        }, true);

        return button;
    }

    function createActionButton(id) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        var button = createBaseButton(id, options);
        if (!button) return false;

        button.className = ctx.statics.constants.classes.ACTION_BUTTON + ' ' + options.className;

        if (id === 'locate' && ctx.Locate) if (ctx.Locate.control) ctx.Locate.control._container.remove();

        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            options.onActivate(options);
        }, true);

        return button;
    }

    function createDivider() {
        var divider = document.createElement('div');
        divider.className = '' + ctx.statics.constants.classes.DIVIDER;
        return divider;
    }


    function setPosition (control) {
        if (!position) {
            if (!control.position) throw new Error('The first control needs to have a position')
            position = control.position;
        }
    }


    function deactivateButtons() {
        if (!activeButton) return;
        activeButton.classList.remove(ctx.statics.constants.classes.ACTIVE_BUTTON);
        activeButton = null;
    }

    function setActiveButton(id) {
        deactivateButtons();

        var button = !id && ctx.editMode ? buttonElements['edit'] : !id ? buttonElements['select'] : id === 'edit' ? buttonElements['select'] : buttonElements[id];
        if (!button) return;

        if (button && id !== 'trash') {
            if (button.title.includes('Draw ')) {
                if (button.title.includes(ctx.currentMode.type)) {
                    button.classList.add(ctx.statics.constants.classes.ACTIVE_BUTTON);
                    activeButton = button;
                }
            } else {
                button.classList.add(ctx.statics.constants.classes.ACTIVE_BUTTON);
            }
        }
    }


    function addButtons(control, buttons) {
        currentControl = control;

        if (control.type === 'modes') {
            createControlButton("select", {
                container: buttons,
                className: ctx.statics.constants.classes.CONTROL_BUTTON_SELECT,
                key: "s",
                title: 'Select Features',
                onAdd: function () {
                    if ((ctx.editMode || ctx.drawMode)) {
                        ctx.getButtons('edit').remove();
                        ctx.getButtons('save').add();
                    } else if (ctx.hasSelection()) {
                        ctx.getButtons('save').remove();
                        ctx.getButtons('edit').add();
                    } else {
                        ctx.getButtons('save').remove();
                        ctx.getButtons('edit').remove();

                        ctx.getButtons('undo').remove();
                        ctx.getButtons('cancel').remove();
                        ctx.getButtons('redo').remove();

                        ctx.getButtons('import').add();
                        ctx.getButtons('export').add();
                        ctx.getButtons('clear').add();
                    }
                },
                onActivate: function onActivate() {
                    ctx.noSelect = false;
                    ctx.setMode();
                    return true;
                },
                onDeactivate: function onDeactivate() {
                    ctx.noSelect = true;
                }
            });

            createControlButton("edit", {
                container: buttons,
                className: ctx.statics.constants.classes.CONTROL_BUTTON_EDIT,
                key: "Enter",
                title: 'Edit Feature',
                dontShow: true,
                onAdd: function () {
                    ctx.getButtons('select').remove();
                    this.button.classList.remove(ctx.statics.constants.classes.ACTIVE_BUTTON);
                    this.button.style.display = 'flex';
                    this.button.style['background-color'] = ctx.options.colors.secondaryBackground;
                },
                onActivate: function onActivate() {
                    ctx.editFeature();
                    ctx.getButtons('save').add();
                },
                onDeactivate: function onDeactivate() {
                    ctx.currentMode.deactivate();
                },
                onRemove: function (e) {
                    ctx.getButtons('save') ? false : createSelect(e);
                }
            });

            createControlButton("save", {
                container: buttons,
                className: ctx.statics.constants.classes.CONTROL_BUTTON_FINSIH,
                key: "Enter",
                title: 'Save Edit',
                dontShow: true,
                onAdd: function (e) {
                    ctx.getButtons('select').remove();
                    ctx.getButtons('edit').remove();

                    ctx.getButtons('import').remove();
                    ctx.getButtons('export').remove();
                    ctx.getButtons('clear').remove();

                    ctx.getButtons('undo').add();
                    ctx.getButtons('cancel').add();
                    ctx.getButtons('redo').add();

                    this.button.style['background-color'] = ctx.options.colors.secondaryColor;
                },
                onActivate: function onActivate(e) {
                    ctx.currentMode.handleClick({ finish: true })
                }
            });
        } else if (control.type === 'options') {
            createActionButton("import", {
                container: buttons,
                className: ctx.statics.constants.classes.CONTROL_BUTTON_IMPORT,
                key: "u",
                title: 'Import Features',
                onActivate: function onActivate() {
                    return ctx.loadFeatures();
                }
            });
    
            createActionButton("export", {
                container: buttons,
                className: ctx.statics.constants.classes.CONTROL_BUTTON_EXPORT,
                key: "d",
                title: 'Export Features',
                onActivate: function onActivate() {
                    return ctx.saveFeatures();
                }
            });

            createActionButton("clear", {
                container: buttons,
                className: ctx.statics.constants.classes.CONTROL_BUTTON_CLEAR,
                key: "Delete",
                title: 'Delete Selected or All Features',
                onActivate: function onActivate() {
                    ctx.deleteMeshData();
                    ctx.deleteUserData();
                    ctx.getButtons('select').add();
                    return true;
                }
            });

            createActionButton("undo", {
                container: buttons,
                className: ctx.statics.constants.classes.CONTROL_BUTTON_UNDO,
                key: "u",
                title: 'Undo Edit',
                dontShow: true,
                onActivate: function onActivate() {
                    return ctx.currentMode.handleUndo()
                }
            });
    
            createActionButton("redo", {
                container: buttons,
                className: ctx.statics.constants.classes.CONTROL_BUTTON_REDO,
                key: "r",
                title: 'Redo Edit',
                dontShow: true,
                onActivate: function onActivate() {
                    return ctx.currentMode.handleRedo()
                }
            });

            createActionButton("cancel", {
                container: buttons,
                className: ctx.statics.constants.classes.CONTROL_BUTTON_CANCEL,
                key: "Escape",
                title: 'Cancel Edit',
                dontShow: true,
                onActivate: function onActivate() {
                    return ctx.cancelEdit();
                }
            });
        } else if (control.type === 'actions') {
            createOptionButton("snapping", {
                container: buttons,
                name: "snapping",
                title: 'Enable/Disable Snapping',
                activeClass: ctx.id + '-snapping-enabled',
                inactiveClass: ctx.id + '-snapping-disabled',
                onActivate: function onActivate() {
                    return ctx.activateSnapping();
                },
                onDeactivate: function onDeactivate() {
                    return ctx.deactivateSnapping();
                }
            });
    
            createOptionButton("pinning", {
                container: buttons,
                name: "pinning",
                title: 'Enable/Disable Pinning',
                activeClass: ctx.id + '-pinning-enabled',
                inactiveClass: ctx.id + '-pinning-disabled',
                onActivate: function onActivate() {
                    return ctx.activatePinning();
                },
                onDeactivate: function onDeactivate() {
                    return ctx.deactivatePinning();
                }
            });
    
            createOptionButton("routing", {
                container: buttons,
                name: "routing",
                title: 'Enable/Disable Routing',
                activeClass: ctx.id + '-routing-enabled',
                inactiveClass: ctx.id + '-routing-disabled',
                onActivate: function onActivate() {
                    return ctx.activateRouting();
                },
                onDeactivate: function onDeactivate() {
                    return ctx.deactivateRouting();
                }
            });

            createOptionButton("exploring", {
                container: buttons,
                name: "exploring",
                title: `Enable/Disable Exploring`,
                activeClass: ctx.id + '-exploring-enabled',
                inactiveClass: ctx.id + '-exploring-disabled',
                onActivate: function onActivate() {
                    return ctx.activateExploring();
                },
                onDeactivate: function onDeactivate() {
                    return ctx.deactivateExploring();
                }
            });
    
            createOptionButton("painting", {
                container: buttons,
                name: "painting",
                title: 'Enable/Disable Painting',
                activeClass: ctx.id + '-painting-enabled',
                inactiveClass: ctx.id + '-painting-disabled',
                onActivate: function onActivate() {
                    return ctx.activatePainting();
                },
                onDeactivate: function onDeactivate() {
                    return ctx.deactivatePainting();
                }
            });
        } else if (control.type === 'types') {
            createControlButton("polyline", {
                container: buttons,
                className: ctx.statics.constants.classes.CONTROL_BUTTON_LINE,
                key: "l",
                title: 'Draw Polyline',
                onActivate: function onActivate() {
                    return ctx.setMode({
                        mode: ctx.statics.constants.modes.DRAW,
                        type: "Polyline"
                    });
                },
                onDeactivate: function onDeactivate() {
                    ctx.currentMode.deactivate();
                    ctx.setMode();
                }
            });
    
            createControlButton("polygon", {
                container: buttons,
                className: ctx.statics.constants.classes.CONTROL_BUTTON_POLYGON,
                key: "p",
                title: 'Draw Polygon',
                onActivate: function onActivate() {
                    return ctx.setMode({
                        mode: ctx.statics.constants.modes.DRAW,
                        type: "Polygon"
                    });
                },
                onDeactivate: function onDeactivate() {
                    ctx.currentMode.deactivate();
                    ctx.setMode();
                }
            });
    
            createControlButton("rectangle", {
                container: buttons,
                className: ctx.statics.constants.classes.CONTROL_BUTTON_RECTANGLE,
                key: "r",
                title: 'Draw Rectangle',
                onActivate: function onActivate() {
                    return ctx.setMode({
                        mode: ctx.statics.constants.modes.DRAW,
                        type: "Rectangle"
                    });
                },
                onDeactivate: function onDeactivate() {
                    ctx.currentMode.deactivate();
                    ctx.setMode();
                }
            });
    
            createControlButton("circle", {
                container: buttons,
                className: ctx.statics.constants.classes.CONTROL_BUTTON_POINT,
                key: "o",
                title: 'Draw Circle',
                onActivate: function onActivate() {
                    return ctx.setMode({
                        mode: ctx.statics.constants.modes.DRAW,
                        type: "Circle"
                    });
                },
                onDeactivate: function onDeactivate() {
                    ctx.currentMode.deactivate();
                    ctx.setMode();
                }
            });

            createControlButton("text", {
                container: buttons,
                className: ctx.statics.constants.classes.CONTROL_BUTTON_TEXT,
                key: "t",
                title: 'Draw Text',
                onActivate: function onActivate() {
                    return ctx.setMode({
                        mode: ctx.statics.constants.modes.DRAW,
                        type: "Text"
                    });
                },
                onDeactivate: function onDeactivate() {
                    ctx.currentMode.deactivate();
                    ctx.setMode();
                }
            });
    
            createControlButton("icon", {
                container: buttons,
                className: ctx.statics.constants.classes.CONTROL_BUTTON_ICON,
                key: "i",
                title: 'Draw Icon',
                onActivate: async function onActivate() {
                    return ctx.setMode({
                        mode: ctx.statics.constants.modes.DRAW,
                        type: "Icon"
                    });
                },
                onDeactivate: function onDeactivate() {
                    ctx.currentMode.deactivate();
                    ctx.setMode();
                }
            });
        } else if (control.type === 'utils') {
            createActionButton("zoom", {
                container: buttons,
                className: ctx.statics.constants.classes.CONTROL_BUTTON_ZOOM_IN_FEATURES,
                key: "x",
                title: 'Zoom to Extent',
                onActivate: function onActivate() {
                    return ctx.zoomToFeatures();
                }
            });

            createActionButton("locate", {
                container: buttons,
                className: ctx.statics.constants.classes.CONTROL_BUTTON_LOCATE,
                key: "u",
                title: 'Locate User',
                button: ctx.Locate.getButton(),
                onActivate: function onActivate() {
                    ctx.Locate.onControlEvent(this);
                }
            });
    
            createActionButton("refresh", {
                container: buttons,
                className: ctx.statics.constants.classes.CONTROL_BUTTON_REFRESH,
                key: "q",
                title: 'Refresh',
                onActivate: function onActivate() {
                    return ctx.refresh();
                }
            });
        }

        /* createActionButton("delete-snap", {
            container: action2Group,
            className: ctx.statics.constants.classes.CONTROL_BUTTON_DELETE_SNAP,
            title: 'Delete Snap Layer Features',
            onAction: function onAction() {
                return ctx.deleteMeshData();
            }
        }); */

        /* createControlButton("cut", {
            container: controlGroup,
            className: ctx.statics.constants.classes.CONTROL_BUTTON_CUT,
            key: "a",
            title: 'Cut Features',
            onActivate: function onActivate() {
                return ctx.setMode(ctx.statics.constants.modes.CUT);
            }
        }); */

        /* createActionButton("combine", {
            container: action2Group,
            className: ctx.statics.constants.classes.CONTROL_BUTTON_COMBINE_FEATURES,
            title: 'Combine Features',
            key: '+',
            onAction: function onAction() {
                return ctx.combineFeatures();
            }
        }); */

        /* createActionButton("group-elements", {
            container: action2Group,
            className: ctx.statics.constants.classes.CONTROL_BUTTON_GROUP_FEATURES,
            key: "g",
            title: 'Group Similar Features',
            onAction: function onAction() {
                return ctx.groupFeatures();
            }
        });

        createActionButton("ungroup-elements", {
            container: action2Group,
            className: ctx.statics.constants.classes.CONTROL_BUTTON_UNGROUP_FEATURES,
            key: "G",
            title: 'Ungroup Similar Features',
            onAction: function onAction() {
                return ctx.ungroupFeatures();
            }
        }); */

        /* createActionButton("create-polygon", {
            container: action2Group,
            className: ctx.statics.constants.classes.CONTROL_BUTTON_CREATE_POLYGON,
            key: 'p',
            title: 'Create Polygon from Selected Feature',
            onAction: function onAction() {
                return ctx.createPolygon();
            }
        }); */

        /* createActionButton("hide-selected", {
            container: action2Group,
            className: ctx.statics.constants.classes.CONTROL_BUTTON_HIDE_SELECTED,
            title: 'Hide Selected Feature',
            onAction: function onAction() {
                return ctx.hideFeatures();
            }
        }); */
    }


    function removeButtons() {
        Object.keys(buttonElements).forEach(function(buttonId) {
            var button = buttonElements[buttonId];

            if (button.parentNode) {
                button.parentNode.removeChild(button);
            } else if (button) {
                button.remove();
            }

            delete buttonElements[buttonId];
            delete buttonOptions[buttonId];
        });
    }


    function getControlOptions (control) {
        if (!control) return false;
        var controls = ctx.options.controls && typeof ctx.options.controls === 'object';
        var dontShow = controls ? !ctx.options.controls[control.type] : false
        return  dontShow || control.dontShow || !ctx.options.controls ? false : true;
    }

    function getButtonOptions() {
        return buttonOptions;
    }

    function getButtonElements() {
        return buttonElements;
    }
}


const Control = function (ctx, controls, options={}) {
    this.controls = controls;
    this.options = options;

    var rgba = function (hex, alpha) {
        hex = hex.trim();


        if (hex.includes('rgba')) {
            hex = this.hex(hex);
        } else {
            if (!hex || [4, 7].indexOf(hex.length) === -1) { return false }

            hex = hex.substr(1);

            if (hex.length === 3) {
                hex = hex.split('').map(function (el) { return el + el + ''; }).join('');
            }
        }

        var r = parseInt(hex.slice(0, 2), 16),
            g = parseInt(hex.slice(2, 4), 16),
            b = parseInt(hex.slice(4, 6), 16);
        
        return alpha !== undefined ? "rgba(" + r + " " + g + " " + b + " / " + alpha + "%)" : "rgb(" + r + " " + g + " " + b + ")";
    }

    var hex = function (rgba) {
        var a,
            rgb = rgba.replace(/\s/g, '').match(/^rgba?\((\d+),(\d+),(\d+),?([^,\s)]+)?/i),
            alpha = (rgb && rgb[4] || "").trim(),
            hex = rgb ? (rgb[1] | 1 << 8).toString(16).slice(1) + (rgb[2] | 1 << 8).toString(16).slice(1) + (rgb[3] | 1 << 8).toString(16).slice(1) : rgba;

        if (alpha !== "") {
            a = alpha;
        } else {
            a = 1;
        }

        a = ((a * 255) | 1 << 8).toString(16).slice(1)
        hex = hex + a;
        return hex;
    }



    this.enable = function (control) {
        if (!control) return null;
        this.position = control.position;
        ctx.map.addControl(this, control.position);
    }

    this.disable = function () {
        ctx.map.removeControl(this);
    }



    this.onAdd = function(map) {
        if (!this.options) return false;
        if (this.options.attribution) return this.setAttribution(map);
        this.setTheme(options.colors || ctx.options.colors);
        ctx.fire('control.add', { control: this, element: this.element });
        return this.element;
    }

    this.onRemove = function() {
        ctx.buttons.removeButtons();
        ctx.fire('control.remove', { element: this.element });
        ctx.disable();
    }



    this.setAttribution = function () {
        var attr = Attr(ctx, this.control, options);
        Object.assign(this, attr)

        this.setTheme(options.colors || ctx.options.colors);
        ctx.fire('control.add', { control: this, element: this.element });
        return this.element;
    }

    this.setMode = function (mode) {
        ctx.setActiveButton(!mode ? 'select' : mode === 'draw' ? mode : mode)
    }

    this.setTheme = function(colors) {
        if (!colors) { return console.error('Control colors not provided!') };

        colors.primaryColor ? document.documentElement.style.setProperty('--' + ctx.id + '-primary-color', rgba(colors.primaryColor)) : false;
        colors.primaryBackground ? document.documentElement.style.setProperty('--' + ctx.id + '-primary-background', rgba(colors.primaryBackground)) : false;
        colors.primaryText ? document.documentElement.style.setProperty('--' + ctx.id + '-primary-text', rgba(colors.primaryText)) : false;
        colors.primaryBorder ? document.documentElement.style.setProperty('--' + ctx.id + '-primary-border', rgba(colors.primaryBorder)) : false;

        colors.secondaryColor ? document.documentElement.style.setProperty('--' + ctx.id + '-secondary-color', rgba(colors.secondaryColor)) : false;
        colors.secondaryBackground ? document.documentElement.style.setProperty('--' + ctx.id + '-secondary-background', rgba(colors.secondaryBackground)) : false;
        colors.secondaryText ? document.documentElement.style.setProperty('--' + ctx.id + '-secondary-text', rgba(colors.secondaryText)) : false;
        colors.secondaryBorder ? document.documentElement.style.setProperty('--' + ctx.id + '-secondary-border', rgba(colors.secondaryBorder)) : false;

        ctx.fire('theme.change', { colors: colors });
        return this.getTheme();
    }

    this.setControl = function (controls) {
        if (!controls) return false;

        var buttons;

        this.element = document.createElement('div');
        this.element.className = ctx.id + '-control-wrap';

        this.control = document.createElement('div');
        this.control.className = ctx.statics.constants.classes.PREDEFINED_CONTROL_BASE + ' ' + ctx.statics.constants.classes.PREDEFINED_CONTROL_GROUP;

        this.element.appendChild(this.control);

        if (Array.isArray(controls)) {
            buttons = Buttons(ctx, this.control, controls);
            Object.assign(this, buttons);
        } else if (controls.attribution) {
            buttons = Attr(ctx, this.control, controls);
            Object.assign(this, buttons);
        }
        
        this.enable(buttons);
    }


    this.getTheme = function() {
        return ctx.options.colors;
    }

    this.getButtons = function () {
        return this._buttons;
    }

    this.getControl = function (id) {
        var nodes = this.control.childNodes;
        if (!nodes.length) return;

        var control;

        if (id) nodes.forEach(function(n) { if (n.classList.contains(id)) control = n });
        return control;
    }



    this.showControl = function (id) {
        var control = this.getControl(id);
        if (!control) return false;
        
        control.style.display = this.position.includes('center') ?  'flex' : 'block';
        return control;
    }

    this.hideControl = function (id) {
        var control = this.getControl(id);
        if (!control) return false;

        control.style.display = 'none';
        return control;
    }


    this.setControl(controls);
}



/***/ }),

/***/ "./src/ux/Events.js":
/*!**************************!*\
  !*** ./src/ux/Events.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Events)
/* harmony export */ });
const events = [
    'map.enable',
    'map.disable',
    'map.ready',
    'map.redraw',
    'map.refresh',
    'mode.change',
    'theme.change',
    'sources.add',
    'source.add',
    'source.hot',
    'layers.add',
    'layers.remove',
    'layer.add',
    'control.add',
    'control.remove',
    'features.zoom',
    'features.add',
    'features.delete',
    'features.update',
    'features.import',
    'features.export',
    'features.offset',
    'feature.add',
    'feature.delete',
    'feature.select',
    'feature.deselect',
    'feature.update',
    'feature.history',
    'select.load',
    'select.add',
    'select.remove',
    'select.activate',
    'select.deactivate',
    'draw.activate',
    'draw.deactivate',
    'draw.start',
    'draw.finish',
    'draw.cancel',
    'mesh.load',
    'text.add',
    'icon.add',
    'vertex.find',
    'vertex.on',
    'vertex.off',
    'vertex.add',
    'vertex.drag',
    'vertex.dragsnap',
    'vertex.delete',
    'overpass.add',
    'snapping.activate',
    'snapping.deactivate',
    'snapping.add',
    'snapping.refresh',
    'snapping.delete',
    'pinning.activate',
    'pinning.deactivate',
    'pinning.add',
    'pinning.update',
    'routing.activate',
    'routing.deactivate',
    'routing.add',
    'painting.activate',
    'painting.deactivate',
    'painting.start',
    'painting.update',
    'gamepad.init',
    'gamepad.add',
    'gamepad.remove',
    'gamepad.hold',
    'gamepad.press',
    'gamepad.release',
    'gamepad.connect',
    'gamepad.disconnect'
]

const Events = function (ctx) {
    const mapMoveStart = function (event) {
        ctx.mapMoving = event;
        if (ctx.Locate) ctx.Locate.onMapMove(event);
        ctx.setIcon(event);
    };

    const mapMoving = function (event) {
        ctx.mapMoving = event;
        ctx.setIcon(event);
        ctx.setCenterMarker();
        ctx.Locate && ctx.Locate.following ? ctx.setMapClass('disable') : false;
    };

    const mapMoveEnd = function (event) {
        ctx.mapMoving = false;
        ctx.Map.onMapMove(event);
        if (ctx.Locate) ctx.Locate.onMapMove(event);
        ctx.setIcon(event);
    };

    const mouseMove = function (event) {
        var painting = ctx.options.painting && ctx.options.painting.enable;
        painting = painting && ctx.currentMode && ctx.currentMode.id === 'draw';
        
        ctx.Locate && ctx.Locate.following ? ctx.setMapClass('disable') :
        ctx.dragMoving ? ctx.setMapClass('grabbing') :
        ctx.addingVertexOnLine || ctx.canAddVertex ? ctx.setMapClass('pointer') :
        ctx.canDragMove ? ctx.setMapClass('grab') :
        painting? ctx.setMapClass('painting') :
        ctx.setMapClass('pointer');

        ctx.lastMouseEvent = event;
        ctx.currentMode.handleMove ? ctx.currentMode.handleMove(event) : false;
    };

    const mouseDown = function (event) {
        var painting = ctx.options.painting && ctx.options.painting.enable;
        painting = painting && ctx.currentMode && ctx.currentMode.id === 'draw';
        
        ctx.Locate && ctx.Locate.following ? ctx.setMapClass('disable') :
        painting? ctx.setMapClass('painting') :
        ctx.dragMoving ? ctx.setMapClass('grabbing') :
        ctx.addingVertexOnLine ? ctx.setMapClass('grabbing') :
        ctx.canDragMove ? ctx.setMapClass('grab') :
        ctx.lastClick ? ctx.setMapClass('grabbing') :
        ctx.setMapClass('pointer');
        
        ctx.mouseIsDown = [event.lngLat.lng, event.lngLat.lat];
        ctx.currentMode.handleDown ? ctx.currentMode.handleDown(event) : false;
    };

    const mouseUp = function (event) {
        ctx.mouseIsDown = false;
        ctx.Locate && ctx.Locate.following ? ctx.setMapClass('disable') : ctx.setMapClass('pointer');
        ctx.currentMode.handleUp ? ctx.currentMode.handleUp(event) : false;
    };

    const mouseClick = async function (event) {
        if (event.type.includes('preclick')) return ctx.currentMode.handlePreclick ? ctx.currentMode.handlePreclick(event) : false;
        ctx.currentMode.handleClick ? ctx.currentMode.handleClick(event) : false;
    };

    const mouseDrag = function (event) {
        ctx.Locate && ctx.Locate.following ? ctx.setMapClass('disable') :
        ctx.dragMoving ? ctx.setMapClass('grabbing') :
        ctx.canDragMove ? ctx.setMapClass('grab') :
        ctx.setMapClass('move');

        ctx.currentMode.handleDrag ? ctx.currentMode.handleDrag(event) : false;
    };

    const mouseleave = function (event) {
        ctx.currentMode.handleOffMap ? ctx.currentMode.handleOffMap(event) : false;
    };

    const mouseover = function (event) {
        ctx.currentMode.handleOnMap ? ctx.currentMode.handleOnMap(event) : false;
    };

    const keypress = function (event) {
        if (ctx.textMarker) return;
        
        console.log("keycode: ", event.keyCode, " =>", event.key, " | Code:", event.code, " Event:", event);
        const buttonOptions = ctx.getButtons();

        let keyHandled = false;

        Object.keys(buttonOptions).forEach((buttonId) => {
            const option = buttonOptions[buttonId];
            const key = ctx.options.keys[buttonId];

            if (key === event.key) {
                option.button.click();
                keyHandled = true;
            } else if (key === event.keyCode) {
                option.button.click();
                keyHandled = true;
            } else if (option.keycode && option.keycode === event.keyCode) {
                option.button.click();
                keyHandled = true;
            }
        });

        if (ctx.options.commands) {
            ctx.options.commands.forEach(function (c) {
                if (c.key === event.keyCode || c.key === event.key || c.key === event.code) {
                    if (!c.command || typeof c.command !== 'function') return;
                    c.command(event, ctx, c);
                    keyHandled = true;
                }
            })
        }

        if (keyHandled) { return keyHandled }

        if (event.key.includes('Arrow')) {
            
        }

        switch (event.code) {
            case "Enter": {
                ctx.setMode();
                break;
            }
            case "NumpadEnter": {
                ctx.setMode();
                break;
            }
            case "Escape": {
                ctx.hotFeature = null;
                ctx.setMode();
                break;
            }
            case "Home": {
                ctx.moveSelectedFeatures(1);
                break;
            }
            case "End": {
                ctx.moveSelectedFeatures(-1);
                break;
            }
            case "Delete": {
                if (ctx.mode === ctx.statics.constants.modes.SELECT) {
                    if (ctx.hasSelection()) { ctx.removeSelection(); }
                } else if (ctx.mode === ctx.statics.constants.modes.DRAW) {
                    ctx.currentMode.deleteVertex();
                }
                break;
            }
        }
    };

    const touchstart = function (event) {
        ctx.currentMode.handleTouch ? ctx.currentMode.handleTouch(event) : false;
    };

    const touchend = function (event) {
        ctx.currentMode.handleTouch ? ctx.currentMode.handleTouch(event) : false;
    };

    const touchmove = function (event) {
        ctx.currentMode.handleTouch ? ctx.currentMode.handleTouch(event) : false;
    };

    const touchcancel = function (event) {
        ctx.currentMode.handleTouch ? ctx.currentMode.handleTouch(event) : false;
    };

    const gamepadconnected = function (event) {
        ctx.addGamepad(event.gamepad || event.detail.gamepad);
    };

    const gamepaddisconnected = function (event) {
        ctx.removeGamepad(event.gamepad || event.detail.gamepad);
    };

    const handleOrientation = function (event) {
        ctx.updateOrientation({
            alpha: event.alpha,
            beta: event.beta,
            gamma: event.gamma
        })
    };

    const dragStart = function (event) {
        //if (ctx.Locate && ctx.Locate.following) return event.originalEvent.preventDefault();
    };

    const rotatePitch = function (event) {
        ctx.setMapClass('grabbing');
        ctx.setIcon(event);
        ctx.setCenterMarker({ transform: true });
    };



    const fireEvent = function fireEvent (event) {
        const name = event.type.split(':')[1];
        
        const detail = {
            data: event.detail,
            type: name.split('.')[0],
            action: name.split('.')[1],
            target: ctx,
        }

        const details = { name: name, detail: detail };
        console.log(detail);
        ctx.map.fire(ctx.id, details);
    }

    const contextMenu = function (event) {
        ctx.currentMode.handleContext ? ctx.currentMode.handleContext(event) : false;
    }

    const sourceData = function (event) {
        if (!event.sourceDataType || !event.sourceDataType === 'content' || !event.sourceId) return false;
        const id = event.sourceId;

        const detail = {
            id: id,
            data: event.source.data,
            type: event.type,
            target: ctx,
        }

        id === ctx.statics.constants.sources.HOT ? ctx.fire('source.hot', detail) : false;
    }

    

    function addEventListeners () {
        ctx.map.on("movestart", mapMoveStart);
        ctx.map.on("move", mapMoving);
        ctx.map.on("moveend", mapMoveEnd);
        ctx.map.on("mousemove", mouseMove);

        ctx.map.on('preclick', mouseClick);
        ctx.map.on('click', mouseClick);
        ctx.map.on('tap', mouseClick);

        ctx.map.on('dragstart', dragStart);
        ctx.map.on('drag', mouseDrag);
        ctx.map.on('mousedown', mouseDown);
        ctx.map.on('mouseup', mouseUp);

        ctx.map.on('rotatestart', rotatePitch);
        ctx.map.on('pitchstart', rotatePitch);
        ctx.map.on('rotate', rotatePitch);
        ctx.map.on('pitch', rotatePitch);

        ctx.map.on('touchstart', touchstart);
        ctx.map.on('touchend', touchend);
        ctx.map.on('touchmove', touchmove);
        ctx.map.on('touchcancel', touchcancel);

        ctx.map.on('contextmenu', contextMenu);
        ctx.map.on('sourcedata', sourceData);

        events.forEach(function(event) { ctx.map.on(ctx.id + ':' + event, fireEvent); })

        ctx.container.addEventListener('keydown', keypress);
        ctx.container.addEventListener('mouseover', mouseover);
        ctx.container.addEventListener('mouseleave', mouseleave);

        window.addEventListener("gamepadconnected", gamepadconnected);
        window.addEventListener("gamepaddisconnected", gamepaddisconnected);
        window.addEventListener("deviceorientation", handleOrientation, true);
    }

    function removeEventListeners () {
        ctx.map.off("movestart", mapMoveStart);
        ctx.map.off("move", mapMoving);
        ctx.map.off("moveend", mapMoveEnd);
        ctx.map.off("mousemove", mouseMove);

        ctx.map.off('preclick', mouseClick);
        ctx.map.off('click', mouseClick);
        ctx.map.off('tap', mouseClick);

        ctx.map.off('dragstart', dragStart);
        ctx.map.off('drag', mouseDrag);
        ctx.map.off('mousedown', mouseDown);
        ctx.map.off('mouseup', mouseUp);

        ctx.map.off('rotatestart', rotatePitch);
        ctx.map.off('pitchstart', rotatePitch);

        ctx.map.off('touchstart', touchstart);
        ctx.map.off('touchend', touchend);
        ctx.map.off('touchmove', touchmove);
        ctx.map.off('touchcancel', touchcancel);
        
        ctx.map.off('contextmenu', contextMenu);
        ctx.map.off('sourcedata', sourceData);

        events.forEach(function(event) { ctx.map.off(ctx.id + ':' + event, fireEvent); })

        ctx.container.removeEventListener('keydown', keypress);
        ctx.container.removeEventListener('mouseover', mouseover);
        ctx.container.removeEventListener('mouseleave', mouseleave);

        window.removeEventListener("gamepadconnected", gamepadconnected);
        window.removeEventListener("gamepaddisconnected", gamepaddisconnected);
        window.removeEventListener("deviceorientation", handleOrientation, true);
    }

    return {
        addEventListeners,
        removeEventListeners
    }
}



/***/ }),

/***/ "./src/ux/Gamepad.js":
/*!***************************!*\
  !*** ./src/ux/Gamepad.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Gamepad)
/* harmony export */ });
const Options = {
    enable: true,
    debug: false,
    crosshairs: true,
    joystick: {
        min: 0.2,
        max: 0.7
    },
    camera: {
        free: true
    },
    pan: {
        speed: 0.001,
        min: 0.001,
        max: 0.05
    },
    bearing: {
        speed: 0.8
    },
    pitch: {
        speed: 1.5,
        max: 70
    },
    zoom: {
        speed: 0.008
    },
    rumble: {
        startDelay: 0,
        duration: 200,
        weakMagnitude: 1.0,
        strongMagnitude: 1.0
    },
    mapping: {
        'Select': function (event) {
            if (event.type === 'press') {
                
            } else if (event.type === 'hold') {
                
            } else if (event.type === 'release') {
                event.ctx.getButtons('clear').button.click();
            }
        },
        'Start': function (event) {
            if (event.type === 'press') {
                
            } else if (event.type === 'hold') {
                
            } else if (event.type === 'release') {
                if (event.gamepad.hasJoysticks) {
                    var button = event.mode.id === 'select' ? 'edit' : 'select';
                    event.ctx.getButtons(button).button.click();
                }
            }
        },
        'Power': function (event) {
            if (event.type === 'press') {
                
            } else if (event.type === 'hold') {
                
            } else if (event.type === 'release') {
                event.ctx.getButtons('save').button.click();
            }
        },
        'Menu': function (event) {
            if (event.type === 'press') {
                
            } else if (event.type === 'hold') {
                
            } else if (event.type === 'release') {
                
            }
        },
        'Misc': function (event) {
            if (event.type === 'press') {
                
            } else if (event.type === 'hold') {
                
            } else if (event.type === 'release') {
                if (event.gamepad.hasJoysticks) {
                    event.ctx.getButtons('zoom').button.click();

                    var ready = setInterval(function() {
                        if (!ctx.mapMoving) {
                            clearInterval(ready);
                            event.gamepad.map.center = event.ctx.map.getCenter();
                            event.gamepad.map.zoom = event.ctx.map.getZoom();
                        }
                    }, 1);
                }
            }
        },
        'A': function (event) {
            if (event.type === 'press') {
                
            } else if (event.type === 'hold') {
                
            } else if (event.type === 'release') {
                if (!event.gamepad.hasJoysticks) {
                    if (!event.gamepad.pressed['BumpLeft'] && !event.gamepad.pressed['BumpRight']) {
                        return this['JoyLeftClick'](event);
                    }
                } else {
                    event.ctx.getButtons('routing').button.click();
                }
            }
        },
        'B': function (event) {
            if (event.type === 'press') {
                
            } else if (event.type === 'hold') {
                
            } else if (event.type === 'release') {
                if (!event.gamepad.hasJoysticks) {
                    if (!event.gamepad.pressed['BumpLeft'] && !event.gamepad.pressed['BumpRight']) {
                        return this['JoyRightClick'](event);
                    }
                } else {
                    event.ctx.getButtons('painting').button.click();
                }
            }
        },
        'Y': function (event) {
            if (event.type === 'press') {
                if (!event.gamepad.hasJoysticks) {
                    if ((event.gamepad.pressed['BumpLeft'] || event.gamepad.pressed['BumpRight'])) event.gamepad.setSpeed(event.value, false);
                }
            } else if (event.type === 'hold') {
                
            } else if (event.type === 'release') {
                if (event.gamepad.hasJoysticks) {
                    event.ctx.getButtons('snapping').button.click();
                }
            }
        },
        'X': function (event) {
            if (event.type === 'press') {
                if (!event.gamepad.hasJoysticks) {
                    if ((event.gamepad.pressed['BumpLeft'] || event.gamepad.pressed['BumpRight'])) event.gamepad.setSpeed(event.value, true);
                }
            } else if (event.type === 'hold') {
                
            } else if (event.type === 'release') {
                if (event.gamepad.hasJoysticks) {
                    event.ctx.getButtons('pinning').button.click();
                }
            }
        },
        'JoyLeftMove': function (event) {
            if (event.type === 'press') {
                
            } else if (event.type === 'hold') {
                event.gamepad.setCenter(event.value, event.gamepad.options.camera.free) // Pan map
            } else if (event.type === 'release') {
                event.gamepad.setCenter(false, event.gamepad.options.camera.free) // Reset map center
            }
        },
        'JoyRightMove': function (event) {
            if (event.type === 'press') {
                
            } else if (event.type === 'hold') {
                if (event.name.includes('Up') || event.name.includes('Down')) {
                    event.gamepad.setPitch(event.value, event.name.includes('Up')); // Pitch map
                } else if (event.name.includes('Left') || event.name.includes('Right')) {
                    event.gamepad.setBearing(event.value, event.name.includes('Left')); // Rotate map
                }
            } else if (event.type === 'release') {
                
            }
        },
        'JoyLeftClick': function (event) {
            if (event.type === 'press') {
                
            } else if (event.type === 'hold') {
                
            } else if (event.type === 'release') {
                if (event.mode.id === 'draw') {
                    event.mode.deleteVertex();
                }
            }
        },
        'JoyRightClick': function (event) {
            if (event.type === 'press') {
                if (event.mode.id === 'draw') {
                    if (!event.lngLat) return false;
                    return event.mode.handleDown(event);
                }
            } else if (event.type === 'hold') {
                
            } else if (event.type === 'release') {
                if (!event.lngLat) return false;

                if (event.mode.id === 'draw') {
                    event.mode.handleUp(event); 
                    event.mode.handleClick(event);
                } else {
                    event.mode.handleClick(event);
                }
            }
        },
        'BumpLeft': function (event) {
            if (event.type === 'press') {
                if (!event.gamepad.hasJoysticks) {
                    if (event.gamepad.pressed['BumpRight']) return false
                } else {
                    return event.gamepad.setSpeed(event.value, true); // Pan speed down
                }
            } else if (event.type === 'hold') {
                if (!event.gamepad.hasJoysticks) {

                }
            } else if (event.type === 'release') {
                
            }
        },
        'BumpRight': function (event) {
            if (event.type === 'press') {
                if (!event.gamepad.hasJoysticks) {
                    if (event.gamepad.pressed['BumpLeft']) return false
                } else {
                    return event.gamepad.setSpeed(event.value, false); // Pan speed down
                }
            } else if (event.type === 'hold') {
                
            } else if (event.type === 'release') {
                
            }
        },
        'TrigLeft': function (event) {
            if (event.type === 'press') {
                
            } else if (event.type === 'hold') {
                event.gamepad.setZoom(event.value, true);
            } else if (event.type === 'release') {
                
            }
        },
        'TrigRight': function (event) {
            if (event.type === 'press') {
                
            } else if (event.type === 'hold') {
                event.gamepad.setZoom(event.value, false);
            } else if (event.type === 'release') {
                
            }
        },
        'DpadUp': function (event) {
            if (event.type === 'press') {
                
            } else if (event.type === 'hold') {
                if (!event.gamepad.hasJoysticks) {
                    if (event.gamepad.pressed['BumpLeft'] && event.gamepad.pressed['BumpRight']) {
                        event.gamepad.setPitch(event.value, true); // Pitch map
                    } else {
                        event.gamepad.setCenter(event.value, event.gamepad.options.camera.free) // Pan map
                    }
                }
            } else if (event.type === 'release') {
                if (event.gamepad.hasJoysticks) {
                    event.ctx.getButtons('Polygon').button.click();
                }
            }
        },
        'DpadDown': function (event) {
            if (event.type === 'press') {
                
            } else if (event.type === 'hold') {
                if (!event.gamepad.hasJoysticks) {
                    if (event.gamepad.pressed['BumpLeft'] && event.gamepad.pressed['BumpRight']) {
                        event.gamepad.setPitch(event.value, false); // Pitch map
                    } else {
                        event.gamepad.setCenter(event.value, event.gamepad.options.camera.free) // Pan map
                    }
                }
            } else if (event.type === 'release') {
                if (event.gamepad.hasJoysticks) {
                    event.ctx.getButtons('Circle').button.click();
                }
            }
        },
        'DpadLeft': function (event) {
            if (event.type === 'press') {
                
            } else if (event.type === 'hold') {
                if (!event.gamepad.hasJoysticks) {
                    if (event.gamepad.pressed['BumpLeft'] && event.gamepad.pressed['BumpRight']) {
                        event.gamepad.setBearing(event.value, true); // Rotate map
                    } else {
                        event.gamepad.setCenter(event.value, event.gamepad.options.camera.free) // Pan map
                    }
                }
            } else if (event.type === 'release') {
                if (event.gamepad.hasJoysticks) {
                    event.ctx.getButtons('Polyline').button.click();
                }
            }
        },
        'DpadRight': function (event) {
            if (event.type === 'press') {
                
            } else if (event.type === 'hold') {
                if (!event.gamepad.hasJoysticks) {
                    if (event.gamepad.pressed['BumpLeft'] && event.gamepad.pressed['BumpRight']) {
                        event.gamepad.setBearing(event.value, false); // Rotate map
                    } else {
                        event.gamepad.setCenter(event.value, event.gamepad.options.camera.free) // Pan map
                    }
                }
            } else if (event.type === 'release') {
                if (event.gamepad.hasJoysticks) {
                    event.ctx.getButtons('Rectangle').button.click();
                }
            }
        }
    }
}

/**
 * @mixin
 * @memberof module:geoflo
 * @name Gamepad
 * @description Gamepad class for handling gamepad events. Initiate class by calling geoflo.addGamepad(gamepad). This will automatically call when connecting a new gamepad.
 * @param {Object} ctx - The GeoFlo context object
 * @param {Object} gamepad - The gamepad object
 */
const Gamepad = function (ctx, gamepad) {
    if (!supported()) throw new Error('Gamepads are not supported on your browser!');
    
    const control = this;

    this.options = Options;

    const layout = {
        "select": 'Select',
        "start": 'Start',
        "power": 'Power',
        "button0": 'B',
        "button1": 'A',
        "button2": 'Y',
        "button3": 'X',
        "button4": 'BumpLeft',
        "button5": 'BumpRight',
        "button6": 'TrigLeft',
        "button7": 'TrigRight',
        "button8": 'Select',
        "button9": 'Start',
        "button10": 'JoyLeftClick',
        "button11": 'JoyRightClick',
        "button12": 'DpadUp',
        "button13": 'DpadDown',
        "button14": 'DpadLeft',
        "button15": 'DpadRight',
        "button16": 'Power',
        "button17": 'Misc',
        "up0": 'JoyLeftUp',
        "down0": 'JoyLeftDown',
        "right0": 'JoyLeftRight',
        "left0": 'JoyLeftLeft',
        "up1": 'JoyRightUp',
        "down1": 'JoyRightDown',
        "right1": 'JoyRightRight',
        "left1": 'JoyRightLeft',
        "l1": 'BumpLeft',
        "r1": 'BumpRight',
        "l2": 'TrigLeft',
        "r2": 'TrigRight'
    }


    function clamp(x, y) {
        let m = Math.sqrt(x*x + y*y); // Magnitude (length) of vector

        // If the length greater than 1, normalize it (set it to 1)
        if (m > 1) {
            x /= m;
            y /= m;
        }

        return [x, y];
    }

    function deadzone(x, y, deadzone=0.2) {
        let m = Math.sqrt(x*x + y*y);

        if (m < deadzone)
            return [0, 0];

        let over = m - deadzone;  // 0 -> 1 - DEADZONE
        let nover = over / (1 - deadzone);  // 0 -> 1

        let nx = x / m;
        let ny = y / m;

        return [nx * nover, ny * nover];
        
    }

    function request() {
        control.refresh();
        requestAnimationFrame(request);
    }

    function supported() {
        return (window.navigator.getGamepads && typeof window.navigator.getGamepads === 'function') ||
            (window.navigator.getGamepads && typeof window.navigator.webkitGetGamepads === 'function') ||
            false;
    }

    function qs(s, p) {
        if (p) {
            return p.querySelector(s);
        }
        return document.querySelector(s);
    }

    function on(eventName, callback) {
        return control.associateEvent(eventName, callback, 'action');
    }

    function after(eventName, callback) {
        return control.associateEvent(eventName, callback, 'after');
    }

    function before(eventName, callback) {
        return control.associateEvent(eventName, callback, 'before');
    }

    function addEventListeners(_this, gamepad) {
        if (!gamepad || !layout) return false;

        Object.entries(layout).forEach(function (entry) {
            var key = entry[0];
            var val = entry[1];

            before(key, function (value) { return _this.onEvent('press', key, val, value); });
            on(key, function (value) { return _this.onEvent('hold', key, val, value); });
            after(key, function (value) { return _this.onEvent('release', key, val, value); });
        })
    }

    function deepAssign(target, source, {isMutatingOk = false, isStrictlySafe = false} = {}) {
        target = isMutatingOk ? target : clone(target, isStrictlySafe);

        for (const [key, val] of Object.entries(source)) {
            if (val !== null && typeof val === `object`) {
                if (target[key] === undefined) {
                    target[key] = {};
                }
    
                target[key] = deepAssign(target[key], val, {isMutatingOk: true, isStrictlySafe});
            } else {
                target[key] = val;
            }
        }

        function clone(obj, isStrictlySafe = false) {
            try {
                return JSON.parse(JSON.stringify(obj));
            } catch(err) {
                if (isStrictlySafe) { throw new Error() }
                console.warn(`Unsafe clone of object`, obj);
                return {...obj};
            }
        }

        return target;
    }

    function calculateIntermediatePoint(point1, point2, perc) {
        var lat1 = degreesToRadians(point1[1]);
        var lng1 = degreesToRadians(point1[0]);
        var lat2 = degreesToRadians(point2[1]);
        var lng2 = degreesToRadians(point2[0]);

        var deltaLat = lat2 - lat1;
        var deltaLng = lng2 - lng1;
        
        var calcA = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) + Math.cos(lat1) * Math.cos(lat2) * Math.sin(deltaLng / 2) * Math.sin(deltaLng / 2);
        var calcB = 2 * Math.atan2(Math.sqrt(calcA), Math.sqrt(1 - calcA));
        
        var A = Math.sin((1 - perc) * calcB) / Math.sin(calcB);
        var B = Math.sin(perc * calcB) / Math.sin(calcB);
        
        var x = A * Math.cos(lat1) * Math.cos(lng1) + B * Math.cos(lat2) * Math.cos(lng2);
        var y = A * Math.cos(lat1) * Math.sin(lng1) + B * Math.cos(lat2) * Math.sin(lng2);
        var z = A * Math.sin(lat1) + B * Math.sin(lat2);
        
        var lat3 = Math.atan2(z, Math.sqrt(x * x + y * y));
        var lng3 = Math.atan2(y, x);
        
        return [radiansToDegrees(lng3), radiansToDegrees(lat3)]
    }

    function pointAtPercent(p0, p1, percent) {
        var x;
        if (p0.x !== p1.x)
            x = p0.x + percent * (p1.x - p0.x);
        else
            x = p0.x;
    
        var y;
        if (p0.y !== p1.y)
            y = p0.y + percent * (p1.y - p0.y);
        else
            y = p0.y;
    
        var p = {
            x: x,
            y: y
        };
    
        return p;
    }

    function degreesToRadians(degrees) {
        return degrees * (Math.PI / 180);
    }
        
    function radiansToDegrees(radians) {
        return radians * (180 / Math.PI );
    }

    





	/**
	 * @function
     * @memberof module:geoflo.Gamepad
	 * @name init
	 * @description This function initializes the gamepad with the specified options. It fires an event to notify the gamepad initialization, sets the gamepad, adds event listeners, and requests animation frame.
	 * @param {Object} gamepad - The gamepad object to be initialized.
	 * @param {Object} options - The options for gamepad initialization.
	 * @returns {Object} The current object instance.
	 */
    this.init = function (gamepad, options) {
        if (!gamepad) return false;
        if (!Options.enable) return console.error('Gamepad option is not enabled!')
        ctx.map.fire(ctx.id + ':gamepad.init', { detail: { gamepad: gamepad } });
        this.setGamepad(gamepad);
        addEventListeners(this, this.gamepad);
        requestAnimationFrame(request);
        return this;
    }

	/**
	 * @function
     * @memberof module:geoflo.Gamepad
	 * @name refresh
	 * @description Refreshes the gamepad state by checking button presses, axes values, and triggers.
	 * @params {void}
	 * @returns {void}
	 */
    this.refresh = function () {
        var gamepads = window.navigator.getGamepads();

        for (var i = 0; i < gamepads.length; i++) {
            var gamepad = gamepads[this.gamepad.id];
            var j;

            if (!gamepad || !gamepad.connected) { continue; }

            for (j = 0; j < gamepad.buttons.length; j++) {
                var button = gamepad.buttons[j];
                var value = button.value;
                var name = this.gamepad.layout[`button${j}`]

                if (button.pressed) {
                    if (!this.gamepad.pressed[name]) {
                        this.gamepad.pressed[name] = true;
                        this.gamepad.buttonActions[j].before ? this.gamepad.buttonActions[j].before(value) : false;
                    }

                    this.gamepad.buttonActions[j].action ? this.gamepad.buttonActions[j].action(value) : false;
                } else if (this.gamepad.pressed[name]) {
                    delete this.gamepad.pressed[name];
                    this.gamepad.buttonActions[j].after ? this.gamepad.buttonActions[j].after(value) : false;
                }
            }

            var axesBoxCount = ((gamepad.axes.length + 1) / 2)|0;
                
            for (j = 0; j < axesBoxCount; j++) {
                var valueX, valueY, value;
                var last_odd_axis = j == axesBoxCount - 1 && gamepad.axes.length % 2 == 1;

                valueX = gamepad.axes[j*2];
                valueY = last_odd_axis ? 0 : gamepad.axes[j*2 + 1];
                [valueX, valueY] = deadzone(valueX, valueY);    
                [valueX, valueY] = clamp(valueX, valueY);
                value = [Number(valueX.toFixed(2)), Number(valueY.toFixed(2))];

                const val = gamepad.axes[j + axesBoxCount].toFixed(4);
                const axe = Math.floor(j / 2);
                this.gamepad.axeValues[axe][j % 2] = val;

                var rightTrigger = value[0] >= Options.joystick.min;
                var leftTrigger = value[0] <= -Options.joystick.min;
                var upTrigger = value[1] <= -Options.joystick.min;
                var downTrigger = value[1] >= Options.joystick.min;

                this.trigger('right', rightTrigger, j, value);
                this.trigger('left', leftTrigger, j, value);
                this.trigger('down', downTrigger, j, value);
                this.trigger('up', upTrigger, j, value);
            }
        }
    }

	/**
	 * @function
     * @memberof module:geoflo.Gamepad
	 * @name trigger
	 * @description This function handles triggering actions based on gamepad input. It checks if a specific button or axis is triggered and performs corresponding actions.
	 * @param {string} id - The identifier of the gamepad input.
	 * @param {boolean} triggered - Indicates if the input is triggered.
	 * @param {number} index - The index of the input.
	 * @param {number[]} value - The value of the input.
	 */
    this.trigger = function (id, triggered, index, value) {
        var actions = this.gamepad.axesActions;
        var name = this.gamepad.layout[`${id}${index}`];
        var pressed = this.gamepad.pressed

        if (triggered) {
            if (!pressed[name]) {
                pressed[name] = true;
                actions[index][id].before ? actions[index][id].before(value) : false
            }

            value = [Options.joystick.max * value[0], Options.joystick.max * value[1]]
            actions[index][id].action ? actions[index][id].action(value) : false;
        } else if (pressed[name]) {
            delete pressed[name];

            if (!pressed['JoyLeftUp'] && !pressed['JoyLeftDown'] && !pressed['JoyLeftLeft'] && !pressed['JoyLeftRight']) {
                actions[0][id].after ? actions[0][id].after(value) : false;
            }

            if (!pressed['JoyRightUp'] && !pressed['JoyRightDown'] && !pressed['JoyRightLeft'] && !pressed['JoyRightRight']) {
                actions[1][id].after ? actions[1][id].after(value) : false;
            }
        }
    }

    /**
	 * @function
     * @memberof module:geoflo.Gamepad
	 * @name remove
	 * @description Disconnects and removes the gamepad object.
	 * @param {Object} gamepad - The gamepad object to be disconnected and removed.
	 * @returns {void}
	 */
    this.remove = function() {
        this.gamepad.disconnect ? this.gamepad.disconnect() : false;
        this.gamepad.remove ? this.gamepad.remove() : false;
        this.gamepad = null;
    }




	/**
	 * @function
     * @memberof module:geoflo.Gamepad
	 * @name setMap
	 * @description This function updates the map properties using the handleMove function and sets the center, zoom, pitch, and bearing accordingly.
	 * @param {Function} handleMove - The function used to handle map movement.
	 * @returns {Object} The updated map object with new properties.
	 */
    this.setMap = function (handleMove) {
        const map = ctx.map;
        const transform = map.transform;
        
        this.map = this.map || {
            center: map.getCenter(),
            zoom: map.getZoom(),
            pitch: map.getPitch(),
            bearing: map.getBearing()
        }
        
        var center = this.map.center.x ? this.map.center : this.map.center.lat ? this.map.center : new mapboxgl.LngLat(this.map.center[0], this.map.center[1])
        center = center.x ? transform.pointLocation(center) : center;

        transform.center = center;
        transform.bearing = this.map.bearing;
        transform.zoom = this.map.zoom;
        transform.pitch = this.map.pitch;

        map._update();

        if (Options.crosshairs && ctx.centerMarker) this.setMarker();
        if (handleMove) ctx.currentMode.handleMove({ lngLat: !Options.camera.free ? this.map.center : map.getCenter(), gamepad: this })
        return this.map;
    }

	/**
	 * @function
     * @memberof module:geoflo.Gamepad
	 * @name setContainer
	 * @description Creates a new HTML element with the specified tag name and class name, appends it to a container if provided, and sets it as the container property of the current object.
	 * @param {string} tagName - The tag name of the HTML element to create.
	 * @param {string} className - The class name to assign to the created element (optional).
	 * @param {HTMLElement} container - The container element to append the created element to (optional).
	 * @returns {HTMLElement} The created HTML element.
	 */
	
    this.setContainer = function (tagName, className, container) {
        const el = window.document.createElement(tagName);
        if (className !== undefined) el.className = className;
        if (container) container.appendChild(el);
        this.container = el;
        return el;
    }

	/**
	 * @function
     * @memberof module:geoflo.Gamepad 
	 * @name setLocation
	 * @description This function updates the visibility, left, and top properties of the container element based on the provided value.
	 * @param {Array<number>} value - An array containing the x and y coordinates for the new location.
	 * @returns {DOMRect} The bounding rectangle of the container element after the location is set.
	 */
    this.setLocation = function (value) {
        this.container.style.visibility = Options.debug ? 'visible' : 'hidden';
        this.container.style.left = (value[0] + 1) / 2 * 100 + '%';
        this.container.style.top = (value[1] + 1) / 2 * 100 + '%';
        return this.container.getBoundingClientRect();
    }

	/**
	 * @function
     * @memberof module:geoflo.Gamepad
	 * @name setMarker
	 * @description Sets a marker on the map using the center coordinates provided by the context.
	 * @return {Object} Returns the marker object created on the map.
	 */
    this.setMarker = function () {
        return ctx.setCenterMarker({ gamepad: true });
    }

	/**
	 * @function
     * @memberof module:geoflo.Gamepad
	 * @name setGamepad
	 * @description Initializes a gamepad object with specific properties based on the provided gamepad input.
	 * @param {Object} gamepad - The gamepad object to be processed.
	 * @returns {Object} - The processed gamepad object with defined properties.
	 */
    this.setGamepad = function (gamepad) {
        var options = {
            type: gamepad.id,
            connected: gamepad.connected,
            id: gamepad.index,
            buttons: gamepad.buttons.length,
            layout: layout,
            axes: Math.floor(gamepad.axes.length / 2),
            axeValues: [],
            hapticActuator: null,
            vibrationMode: -1,
            vibration: false,
            mapping: gamepad.mapping,
            buttonActions: {},
            axesActions: {},
            pressed: {}
        }

        for (let x = 0; x < options.buttons; x++) {
            options.buttonActions[x] = () => ({ action: () => { }, after: () => { }, before: () => { } });
        }

        for (let x = 0; x < options.axes; x++) {
            options.axesActions[x] = {
                down: () => ({ action: () => { }, after: () => { }, before: () => { } }),
                left: () => ({ action: () => { }, after: () => { }, before: () => { } }),
                right: () => ({ action: () => { }, after: () => { }, before: () => { } }),
                up: () => ({ action: () => { }, after: () => { }, before: () => { } })
            };

            options.axeValues[x] = [0, 0];
        }

        if (gamepad.hapticActuators) {
            if (typeof gamepad.hapticActuators.pulse === 'function') {
                options.haptic = gamepad.hapticActuators;
                options.vibrationMode = 0;
                options.vibration = true;
            } else if (gamepad.hapticActuators[0] && typeof gamepad.hapticActuators[0].pulse === 'function') {
                options.haptic = gamepad.hapticActuators[0];
                options.vibrationMode = 0;
                options.vibration = true;
            }
        }
        
        if (gamepad.vibrationActuator) {
            if (typeof gamepad.vibrationActuator.playEffect === 'function') {
                options.haptic = gamepad.vibrationActuator;
                options.vibrationMode = 1;
                options.vibration = true;
            }
        }

        this.gamepad = options;
        this.hasJoysticks = options.axes > 0 && Object.values(this.gamepad.layout).map(function(m) { return m.includes('Joy') }).filter(function (b) { return b }).length > 0;
        return this.gamepad;
    }

	/**
	 * @function
     * @memberof module:geoflo.Gamepad
	 * @name setCenter
	 * @description This function calculates the new center of the map based on the input values and gamepad controls. It handles both joystick and D-pad inputs to adjust the map center accordingly.
	 * @param {Object} value - The value used to calculate the new center of the map.
	 * @param {boolean} free - A boolean flag indicating if the map center should be set freely.
	 * @param {boolean} dpad - A boolean flag indicating if the D-pad controls are used for setting the map center.
	 * @returns {boolean} Returns true after setting the map center.
	 */
	
    this.setCenter = function (value, free, dpad) {
        var center = ctx.map.getCenter();
        var pressed = this.gamepad.pressed;
        var type = this.hasJoysticks ? 'Joy' : 'Dpad';
        var diag = Object.keys(pressed).filter(function(p) { return p.includes(type) }).length > 1;
        
        var start = free || dpad ? center : false;
        start = ctx.hotFeature && !start ? ctx.lastMove || center : false;
        start = !start ? center : start;

        var end;
    
        if (dpad) {
            var bearing = this.map.bearing;
            bearing = pressed['Up'] ? bearing :
            pressed['Down'] ? bearing + 180 :
            pressed['Left'] ? bearing - 90 :
            pressed['Right'] ? bearing + 90 :
            bearing;

            var dest = turf.destination(turf.point(start), distance, bearing).geometry.coordinates;

            lngLats = free ? { lng: dest[1], lat: dest[0] } : dest;
        } else if (value) {
            var location = this.setLocation(value);
            var coords = location && location.x ? [location.x, location.y] : false;
            
            end = ctx.map.unproject(coords);
            
            var percent = diag ? Options.pan.speed / 2 : Options.pan.speed;
            var mid = calculateIntermediatePoint([start.lng, start.lat], [end.lng, end.lat], percent)
            mid = ctx.map.getPitch() > 60 ? calculateIntermediatePoint([start.lng, start.lat], [mid[0], mid[1]], 0.4) : mid;

            end = mid;
            ctx.lastMove = end;
        } else {
            var coords = ctx.hotFeature ? ctx.hotFeature.geometry.coordinates : false;
            end = free ? ctx.map.getCenter() :
            coords ? { lat: coords[coords.length-1][1], lng: coords[coords.length-1][0] } : ctx.map.getCenter();
            ctx.lastMove = false;
            this.setLocation([0, 0]);
        }

        this.map.center = end;
        return this.setMap(true);
    }
    
	/**
	 * @function
     * @memberof module:geoflo.Gamepad
	 * @name setBearing
	 * @description This function updates the bearing of the map by adjusting it with the specified value and direction.
	 * @param {number | Array<number>} value - The value to adjust the bearing by. If dpad is false, it should be an array of numbers, otherwise a single number.
	 * @param {boolean} left - Indicates the direction of adjustment. If true, the bearing is decreased; otherwise, it is increased.
	 * @param {boolean} dpad - Specifies whether the value is coming from a dpad input.
	 * @returns {boolean} Returns the result of calling the setMap function after updating the bearing.
	 */
    this.setBearing = function (value, left, dpad) {
        var bearing = this.map.bearing;
        var bearingMulti = !dpad ? Math.abs(value[0]) : value;
    
        if (left) {
            bearing = bearing - (Options.bearing.speed * bearingMulti)
        } else {
            bearing = bearing + (Options.bearing.speed * bearingMulti)
        }

        this.map.bearing = bearing;
        return this.setMap();
    }
    
	/**
	 * @function
     * @memberof module:geoflo.Gamepad
	 * @name setPitch
	 * @description This function adjusts the pitch of the map by a specified amount in the given direction.
	 * @param {number|Array<number>} value - The value or array of values to adjust the pitch by.
	 * @param {boolean} up - A boolean indicating whether the pitch should be increased (true) or decreased (false).
	 * @param {boolean} dpad - A boolean flag to determine if the value is coming from a D-pad input.
	 * @returns {boolean} Returns true if the map is successfully updated with the new pitch.
	 */
    this.setPitch = function (value, up, dpad) {
        var pitch = this.map.pitch;
        var pitchMulti = !dpad ? Math.abs(value[1]) : value;

        if (pitch < 0) pitch = 0;
        if (pitch > Options.pitch.max) pitch = Options.pitch.max;
    
        if (up) {
            pitch = pitch + (Options.pitch.speed * pitchMulti);
        } else {
            pitch = pitch - (Options.pitch.speed * pitchMulti);
        }
        
        this.map.pitch = pitch;
        return this.setMap();
    }
    
	/**
	 * @function
     * @memberof module:geoflo.Gamepad
	 * @name setZoom
	 * @description This function adjusts the zoom level of a map based on the provided value and direction.
	 * @param {number} value - The amount by which to change the zoom level.
	 * @param {boolean} out - A flag indicating whether to zoom out (true) or zoom in (false).
	 * @param {boolean} dpad - A flag indicating the direction of the zoom change.
	 * @returns {boolean} - Returns the result of setting the map with the new zoom level.
	 */
    this.setZoom = function (value, out, dpad) {
        var zoom = this.map.zoom;
    
        if (out) {
            zoom = zoom - ( Options.zoom.speed * Math.abs(value) )
        } else {
            zoom = zoom + ( Options.zoom.speed * Math.abs(value) )
        }
        
        this.map.zoom = zoom;
        return this.setMap();
    }

	/**
	 * @function
     * @memberof module:geoflo.Gamepad
	 * @name setSpeed
	 * @description This function calculates the speed of panning based on the provided value and direction. It ensures that the speed falls within the specified minimum and maximum values.
	 * @param {number} value - The value that influences the speed of panning.
	 * @param {boolean} down - A boolean flag indicating the direction of panning (true for down, false for up).
	 * @returns {number} The updated speed of panning after applying the calculations.
	 */
    this.setSpeed = function (value, down) {
        var speed = Options.pan.speed > Options.pan.min ?
            Options.pan.speed :
            Options.pan.max && Options.pan.speed > Options.pan.max ?
            Options.pan.min :
            Options.pan.min;

        speed = down ? speed - Options.pan.min : speed + Options.pan.min;

        speed = speed < Options.pan.min ? Options.pan.min :
        Options.pan.max && speed > Options.pan.max ? Options.pan.max :
        speed;

        return Options.pan.speed = speed * Math.abs(value);
    }


	/**
	 * @function
     * @memberof module:geoflo.Gamepad associateEvent
	 * @name associateEvent
	 * @description This function allows the user to associate an event with a callback function for a specific button or axis on the gamepad.
	 * @param {string} eventName - The name of the event to associate with the callback function.
	 * @param {function} callback - The callback function to be executed when the event occurs.
	 * @param {string} type - The type of event (e.g., 'press', 'release') to associate with the callback function.
	 * @returns {object} The updated gamepad object with the associated event and callback function.
	 */
    this.associateEvent = function(eventName, callback, type) {
        if (eventName.match(/^button\d+$/)) {
            const buttonId = parseInt(eventName.match(/^button(\d+)$/)[1]);

            if (buttonId >= 0 && buttonId < this.gamepad.buttons) {
                this.gamepad.buttonActions[buttonId][type] = callback;
            } else {
                console.log(buttonId, 'This button is not on gamepad')
            }

        } else if (eventName === 'start') {
            this.gamepad.buttonActions[9][type] = callback;
        } else if (eventName === 'select') {
            this.gamepad.buttonActions[8][type] = callback;
        } else if (eventName === 'r1') {
            this.gamepad.buttonActions[5][type] = callback;
        } else if (eventName === 'r2') {
            this.gamepad.buttonActions[7][type] = callback;
        } else if (eventName === 'l1') {
            this.gamepad.buttonActions[4][type] = callback;
        } else if (eventName === 'l2') {
            this.gamepad.buttonActions[6][type] = callback;
        } else if (eventName === 'power') {
            if (this.gamepad.buttons >= 17) {
                this.gamepad.buttonActions[16][type] = callback;
            } else {
                error(MESSAGES.INVALID_BUTTON);
            }
        } else if (eventName.match(/^(up|down|left|right)(\d+)$/)) {
            const matches = eventName.match(/^(up|down|left|right)(\d+)$/);
            const direction = matches[1];
            const axe = parseInt(matches[2]);

            if (axe >= 0 && axe < this.gamepad.axes) {
                this.gamepad.axesActions[axe][direction][type] = callback;
            } else {
                error(MESSAGES.INVALID_BUTTON);
            }
        } else if (eventName.match(/^(up|down|left|right)$/)) {
            const direction = eventName.match(/^(up|down|left|right)$/)[1];
            this.gamepad.axesActions[0][direction][type] = callback;
        }

        return this.gamepad;
    }

	/**
	 * @event
	 * @name onInit
	 * @description This function initializes the gamepad object by setting up the container, center marker, and map.
	 * @param {Object} options - The options object for initialization.
	 * @returns {void}
	 */
    this.onInit = function (options) {
        this.initiated = true;
        this.setContainer('div', 'gamepad', ctx.map.getContainer());
        this.setCenterMarker();
        this.setMap();
    }

	/**
	 * @event
	 * @name onEvent
	 * @description This function takes in the type, key, action, and value parameters to handle gamepad events and trigger corresponding actions.
	 * @param {string} type - The type of event.
	 * @param {string} key - The key associated with the event.
	 * @param {string} action - The action triggered by the event.
	 * @param {any} value - The value associated with the event.
	 */
    this.onEvent = function (type, key, action, value) {
        var pressed = {[action]: true};
        var lngLat = Options.camera.free ? ctx.map.getCenter() : ctx.lastMove ? ctx.lastMove : ctx.map.getCenter();

        var options = {
            name: action,
            type: type,
            key: key,
            value: value,
            mode: ctx.currentMode,
            gamepad: this,
            lngLat: lngLat,
            ctx: ctx,
            originalEvent: {}
        }

        if (!this.initiated) this.onInit(options);

        ctx.map.fire(ctx.id + ':gamepad.' + type, { detail: options });

        if (pressed['JoyLeftUp'] || pressed['JoyLeftDown'] || pressed['JoyLeftLeft'] || pressed['JoyLeftRight']) Options.mapping['JoyLeftMove'](options);
        if (pressed['JoyRightUp'] || pressed['JoyRightDown'] || pressed['JoyRightLeft'] || pressed['JoyRightRight']) Options.mapping['JoyRightMove'](options);

        if (pressed['JoyLeftClick']) Options.mapping['JoyLeftClick'](options);
        if (pressed['JoyRightClick']) Options.mapping['JoyRightClick'](options);

        if (pressed['BumpLeft']) Options.mapping['BumpLeft'](options);
        if (pressed['BumpRight']) Options.mapping['BumpRight'](options);

        if (pressed['TrigLeft']) Options.mapping['TrigLeft'](options);
        if (pressed['TrigRight']) Options.mapping['TrigRight'](options);

        if (pressed['A']) Options.mapping['A'](options);
        if (pressed['B']) Options.mapping['B'](options);
        if (pressed['X']) Options.mapping['X'](options);
        if (pressed['Y']) Options.mapping['Y'](options);

        if (pressed['Start']) Options.mapping['Start'](options);
        if (pressed['Select']) Options.mapping['Select'](options);
        if (pressed['Power']) Options.mapping['Power'](options);
        if (pressed['Home']) Options.mapping['Home'](options);
        if (pressed['Misc']) Options.mapping['Misc'](options);

        if (pressed['DpadUp']) Options.mapping['DpadUp'](options);
        if (pressed['DpadDown']) Options.mapping['DpadDown'](options);
        if (pressed['DpadLeft']) Options.mapping['DpadLeft'](options);
        if (pressed['DpadRight']) Options.mapping['DpadRight'](options);
    }

	/**
	 * @event
	 * @name onDisconnect
	 * @description This function disconnects the current gamepad by removing it from the system.
	 * @param {Object} gamepad - The gamepad object to disconnect.
	 * @returns {boolean} Returns false if the gamepad parameter is missing or if there is no current gamepad.
	 */
    this.onDisconnect = function (gamepad) {
        if (!gamepad || !this.gamepad) return false;
        if (this.gamepad.id !== gamepad.id) throw new Error('Gamepad id does not match!');
        this.gamepad.remove();
        this.gamepad = null;
    }


    this.init(gamepad);
};



/***/ }),

/***/ "./src/ux/Locate.js":
/*!**************************!*\
  !*** ./src/ux/Locate.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Locate)
/* harmony export */ });
/**
 * @mixin
 * @memberof module:geoflo
 * @name Locate
 * @description The Locate module provides a user interface for locating the user's current position on the map.
 * @param {Object} ctx - The GeoFlo context object
 */
const Locate = function (ctx, options={}) {
    this.options = options;
    
	/**
	 * @function
     * @memberof module:geoflo.Locate
	 * @name init
	 * @description This function initializes the geolocation control on the map with the specified options.
	 * @param {Object} options - The options for configuring the geolocation control.
	 * @param {boolean} [options.enableHighAccuracy=true] - Whether to enable high accuracy for geolocation.
	 * @param {boolean} [options.trackUserLocation=true] - Whether to track the user's location.
	 * @param {boolean} [options.showUserHeading=true] - Whether to show the user's heading.
	 * @param {boolean} [options.showAccuracyCircle=false] - Whether to show the accuracy circle.
	 * @returns {Object} The current instance of the map with the geolocation control added.
	 */
    this.init = function (options={}) {
        ctx.Utilities.extend(this.options, options);

        this.control = new mapboxgl.GeolocateControl({
            positionOptions: {
                enableHighAccuracy: true
            },
            trackUserLocation: true,
            showUserHeading: true,
            showAccuracyCircle: false
        });

        this.control.on('geolocate', this.onControlEvent.bind(this))
        ctx.map.addControl(this.control);
        return this;
    }

	/**
	 * @function
     * @memberof module:geoflo.Locate
	 * @name ready
	 * @description This function checks if the geolocate button is available in the control and then calls the build function.
	 * @params {Object} control - The control object containing the geolocate button.
	 * @returns {void}
	 */
    this.ready = function () {
        var _this = this;
        var control = this.control;

        var ready = setInterval(function() {
            if (!control._geolocateButton) return;
            _this.build();
            return clearInterval(ready);
        }, 1);
    }

	/**
	 * @function
     * @memberof module:geoflo.Locate
	 * @name build
	 * @description This function hides the user location dot marker and the associated button.
	 * @params {void} None
	 * @returns {void}
	 */
    this.build = function () {
        this.marker = this.control._userLocationDotMarker;
        this.getButton().style.display = 'none';
    }

	/**
	 * @function
     * @memberof module:geoflo.Locate
	 * @name update
	 * @description This function updates the map bearing and center based on the provided options.
	 * @param {Object} options - The options object.
	 * @param {number} options.alpha - The alpha value.
	 * @returns {void}
	 */
    this.update = function (options={}) {
        const alpha = options.alpha;
        const heading = this.heading();
        const bearing = this.bearing();
        const following = this.following;
        if (!heading || !following || ctx.mapMoving) return;
        ctx.map.setBearing(heading - 1);
        ctx.map.setCenter(this.marker._lngLat);
    }

	/**
	 * @function
     * @memberof module:geoflo.Locate
	 * @name heading
	 * @description Retrieves the heading value from the control object.
	 * @returns {string} The heading value from the control object.
	 */
    this.heading = function () {
        return this.control._heading;
    }

	/**
	 * @function
     * @memberof module:geoflo.Locate
	 * @name bearing
	 * @description This function retrieves the current bearing of the map.
	 * @returns {number} The bearing of the map.
	 */
    this.bearing = function () {
        return ctx.map.getBearing();
    }

	/**
	 * @function
     * @memberof module:geoflo.Locate
	 * @name locate
	 * @description Initiates the process of locating the user's current position on the map.
	 * @returns {void}
	 */
    this.locate = function () {
        this.locating = true;
        this.unlocated = false;
        this.control._follow = this.following = false;
        addClasses(this.button, ['mapboxgl-ctrl-geolocate-waiting']);
        return this.control.trigger();
    }

	/**
	 * @function
     * @memberof module:geoflo.Locate
	 * @name relocate
	 * @description Relocates the geolocation control to the user's current location. If the control is set to follow the user's location, it changes the state to 'ACTIVE_LOCK'. Adds the 'mapboxgl-ctrl-geolocate-active' class to the button element. Triggers the control
	 * @params {void}
	 * @returns {void}
	 */
    this.relocate = function () {
        if (this.following) this.state('ACTIVE_LOCK');
        addClasses(this.button, ['mapboxgl-ctrl-geolocate-active']);
        return this.control.trigger();
    }

	/**
	 * @function
     * @memberof module:geoflo.Locate
	 * @name unlocate
	 * @description Sets the state to 'ACTIVE_LOCK', disables following, enables drag pan on the map, and triggers the control.
	 * @returns {Object} The result of triggering the control.
	 */
    this.unlocate = function () {
        this.state('ACTIVE_LOCK');
        this.control._follow = this.following = false;
        ctx.map.dragPan.enable();
        this.unlocated = true;
        return this.control.trigger();
    }

	/**
	 * @function
     * @memberof module:geoflo.Locate
	 * @name follow
	 * @description Enables the follow functionality for the geolocate control. When activated, adds a specific class to the button, disables drag panning on the map, and sets the follow state to true.
	 * @params {Object} ctx - The context object containing the map and control references.
	 * @returns {boolean} - Returns true to indicate that the follow functionality has been enabled.
	 */
    this.follow = function () {
        addClasses(this.button, ['mapboxgl-ctrl-geolocate-follow']);
        ctx.map.dragPan.disable();
        return this.control._follow = this.following = true;
    }

	/**
	 * @function
     * @memberof module:geoflo.Locate
	 * @name state
	 * @description This function is used to get or set the state of the control. If a state parameter is provided, it sets the control's watch state to that value. If no state parameter is provided, it returns the current watch state of the control.
	 * @param {boolean} state - The state to set for the control.
	 * @returns {boolean} - The current watch state of the control.
	 */
    this.state = function (state) {
        return state ? this.control._watchState = state : this.control._watchState;
    }



	/**
	 * @function
     * @memberof module:geoflo.Locate
	 * @name getButton
	 * @description Returns the geolocate button element from the control.
	 * @returns {Element} The geolocate button element.
	 */
    this.getButton = function () {
        return this.control._geolocateButton;
    }


    

	/**
	 * @function
     * @memberof module:geoflo.Locate
	 * @name removeClasses
	 * @description This function removes classes related to geolocation control from a button element.
	 * @params {Element} button - The button element from which classes will be removed.
	 */
    this.removeClasses = function () {
        var button = this.button;
        if (!button) return;
        button.classList.remove('mapboxgl-ctrl-geolocate-waiting');
        button.classList.remove('mapboxgl-ctrl-geolocate-active');
        button.classList.remove('mapboxgl-ctrl-geolocate-active-error');
        button.classList.remove('mapboxgl-ctrl-geolocate-background');
        button.classList.remove('mapboxgl-ctrl-geolocate-background-error');
        button.classList.remove('mapboxgl-ctrl-geolocate-follow');
    }

	/**
	 * @function
     * @memberof module:geoflo.Locate
	 * @name onAdd
	 * @description Logs the event passed as a parameter.
	 * @param {Event} event - The event object to be logged.
     * @event
	 */
    this.onAdd = function (event) {
        console.log(event)
    }

	/**
	 * @function
     * @memberof module:geoflo.Locate
	 * @name onControlEvent
	 * @description Handles events related to user location functionality initiated by the locate control button.
	 * @param {Object} event - The event object containing information about the event.
	 * @returns {void}
     * @event
	 */
    this.onControlEvent = function (event) {
        this.button = this.button || event.button;
        this.marker = this.control._userLocationDotMarker;

        this.removeClasses();
        console.log('Locate: ', this.state());

        if (event.coords) {
            this.onLocate(event)
        } else if (event.button) {
            ctx.map.dragPan.enable();
            if (this.state() === 'OFF') return this.locate();
            if (this.state() === 'BACKGROUND' && !this.following) return this.relocate();
            if (this.state() === 'ACTIVE_LOCK' && !this.following) return this.follow();
            this.unlocate();
        } 
    }

	/**
	 * @function
     * @memberof module:geoflo.Locate
	 * @name onLocate
	 * @description Handles the event when the geolocation is triggered.
	 * @param {Event} event - The event object containing the coordinates.
	 * @returns {void}
     * @event
	 */
    this.onLocate = function (event) {
        console.log(event);

        if (this.state() === 'ACTIVE_LOCK' && this.locating) {
            this.locating = false;
            this.currentLocation = event.coords;
            addClasses(this.button, ['mapboxgl-ctrl-geolocate-active']);
        } 
    }

	/**
	 * @function
     * @memberof module:geoflo.Locate
	 * @name onMapMove
	 * @description This function is triggered when a map movement event occurs. It updates the button classes based on the state of the geolocate control.
	 * @param {Event} event - The event object triggered by the map movement.
	 * @returns {void}
     * @event
	 */
    this.onMapMove = function (event) {
        if (!this.button || this.following || this.unlocated) return;
        if (this.state() === 'ACTIVE_LOCK') return addClasses(this.button, ['mapboxgl-ctrl-geolocate-active']);
        addClasses(this.button, ['mapboxgl-ctrl-geolocate-background']);
    }



    this.options.init ? this.init(this.options) : this;


    
    function addClasses (button, classes=[]) {
        if (!button) return;
        classes.forEach(function(c) { c ? button.classList.add(c) : false })
    }
}



/***/ }),

/***/ "./src/ux/Styles.js":
/*!**************************!*\
  !*** ./src/ux/Styles.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Styles)
/* harmony export */ });
/**
 * @mixin
 * @memberof module:geoflo
 * @name Styles
 * @description The Styles module provides a control to change the map style.
 * @param {Object} ctx - The GeoFlo context object
 */
const Styles = function (ctx, options={}) {
    this.options = options;
    
    this.init = function (options={}) {
        ctx.Utilities.extend(this.options, options);

        this.styles = this.options.styles || [
            { title: "Dark", uri: "mapbox://styles/mapbox/dark-v11" },
            { title: "Light", uri: "mapbox://styles/mapbox/light-v11" },
            { title: "Outdoors", uri: "mapbox://styles/mapbox/outdoors-v11" },
            { title: "Satellite", uri: "mapbox://styles/mapbox/satellite-streets-v11" },
            { title: "Streets", uri: "mapbox://styles/mapbox/streets-v11" }
        ];
    
        this.defaultStyle = this.options.style || 'Dark';
        this.onDocumentClick = this.onDocumentClick.bind(this);
        this.events = this.options.eventListeners;

        return this;
    }

    this.getDefaultPosition = function () {
        const defaultPosition = "top-right";
        return defaultPosition;
    }

    this.onAdd = function (map) {
        this.map = map;
        this.controlContainer = document.createElement("div");
        this.controlContainer.classList.add("mapboxgl-ctrl");
        this.controlContainer.classList.add("mapboxgl-ctrl-group");
        this.mapStyleContainer = document.createElement("div");
        this.styleButton = document.createElement("button");
        this.styleButton.type = "button";
        this.mapStyleContainer.classList.add("mapboxgl-style-list");

        for (const style of this.styles) {
            const styleElement = document.createElement("button");
            styleElement.type = "button";
            //styleElement.innerText = style.title;
            styleElement.classList.add(style.title.replace(/[^a-z0-9-]/gi, '_'));
            styleElement.dataset.uri = JSON.stringify(style.uri);
            styleElement.addEventListener("click", event => {
                const srcElement = event.srcElement;
                this.closeModal();
                if (srcElement.classList.contains("active")) {
                    return;
                }
                if (this.events && this.events.onOpen && this.events.onOpen(event)) {
                    return;
                }
                const style = JSON.parse(srcElement.dataset.uri);
                this.map.setStyle(style);
                const elms = this.mapStyleContainer.getElementsByClassName("active");
                while (elms[0]) {
                    elms[0].classList.remove("active");
                }
                srcElement.classList.add("active");
                if (this.events && this.events.onChange && this.events.onChange(event, style)) {
                    return;
                }
            });
            if (style.title === this.defaultStyle) {
                styleElement.classList.add("active");
            }
            this.mapStyleContainer.appendChild(styleElement);
        }

        this.styleButton.classList.add("mapboxgl-ctrl-icon");
        this.styleButton.classList.add("mapboxgl-style-switcher");

        this.styleButton.addEventListener("click", event => {
            if (this.events && this.events.onSelect && this.events.onSelect(event)) {
                return;
            }
            this.openModal();
        });

        document.addEventListener("click", this.onDocumentClick);

        this.controlContainer.appendChild(this.styleButton);
        this.controlContainer.appendChild(this.mapStyleContainer);
        
        this.closeModal();
        return this.controlContainer;
    }

    this.onRemove = function () {
        if (!this.controlContainer || !this.controlContainer.parentNode || !this.map || !this.styleButton) {
            return;
        }
        this.styleButton.removeEventListener("click", this.onDocumentClick);
        this.controlContainer.parentNode.removeChild(this.controlContainer);
        document.removeEventListener("click", this.onDocumentClick);
        this.map = undefined;
    }

    this.closeModal = function () {
        if (this.mapStyleContainer && this.styleButton) {
            this.mapStyleContainer.style.display = "none";
            this.styleButton.style.display = "block";
        }
    }

    this.openModal = function () {
        if (this.mapStyleContainer && this.styleButton) {
            this.mapStyleContainer.style.display = "block";
            this.styleButton.style.display = "none";
        }
    }

    this.onDocumentClick = function (event) {
        if (this.controlContainer && !this.controlContainer.contains(event.target)) {
            this.closeModal();
        }
    }

    this.init();
}



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/amd options */
/******/ 	(() => {
/******/ 		__webpack_require__.amdO = {};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/harmony module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.hmd = (module) => {
/******/ 			module = Object.create(module);
/******/ 			if (!module.children) module.children = [];
/******/ 			Object.defineProperty(module, 'exports', {
/******/ 				enumerable: true,
/******/ 				set: () => {
/******/ 					throw new Error('ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: ' + module.id);
/******/ 				}
/******/ 			});
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!******************!*\
  !*** ./index.js ***!
  \******************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ geoflo)
/* harmony export */ });
/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.css */ "./index.css");
/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_index_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _src_require_Mapbox_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/require/Mapbox.js */ "./src/require/Mapbox.js");
/* harmony import */ var _src_require_Turf_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./src/require/Turf.js */ "./src/require/Turf.js");
/* harmony import */ var _src_require_Omnivore_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src/require/Omnivore.js */ "./src/require/Omnivore.js");
/* harmony import */ var _src_system_Statics_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./src/system/Statics.js */ "./src/system/Statics.js");
/* harmony import */ var _src_system_Options_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./src/system/Options.js */ "./src/system/Options.js");
/* harmony import */ var _src_system_Utilities_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./src/system/Utilities.js */ "./src/system/Utilities.js");
/* harmony import */ var _src_map_Map_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./src/map/Map.js */ "./src/map/Map.js");
/* harmony import */ var _src_map_Layers_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./src/map/Layers.js */ "./src/map/Layers.js");
/* harmony import */ var _src_map_Features_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./src/map/Features.js */ "./src/map/Features.js");
/* harmony import */ var _src_map_Mesh_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./src/map/Mesh.js */ "./src/map/Mesh.js");
/* harmony import */ var _src_ux_Events_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./src/ux/Events.js */ "./src/ux/Events.js");
/* harmony import */ var _src_ux_Controls_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./src/ux/Controls.js */ "./src/ux/Controls.js");
/* harmony import */ var _src_ux_Styles_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./src/ux/Styles.js */ "./src/ux/Styles.js");
/* harmony import */ var _src_ux_Gamepad_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./src/ux/Gamepad.js */ "./src/ux/Gamepad.js");
/* harmony import */ var _src_ux_Locate_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./src/ux/Locate.js */ "./src/ux/Locate.js");
/* harmony import */ var _src_mode_Select_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./src/mode/Select.js */ "./src/mode/Select.js");
/* harmony import */ var _src_mode_Draw_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./src/mode/Draw.js */ "./src/mode/Draw.js");
/* harmony import */ var _src_mode_Edit_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./src/mode/Edit.js */ "./src/mode/Edit.js");
/* harmony import */ var _src_action_Snapping_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./src/action/Snapping.js */ "./src/action/Snapping.js");
/* harmony import */ var _src_action_Pinning_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./src/action/Pinning.js */ "./src/action/Pinning.js");
/* harmony import */ var _src_action_Routing_js__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./src/action/Routing.js */ "./src/action/Routing.js");
/* harmony import */ var _src_action_Painting_js__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./src/action/Painting.js */ "./src/action/Painting.js");
/* harmony import */ var _src_action_Exploring_js__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./src/action/Exploring.js */ "./src/action/Exploring.js");
// CSS //


// REQUIRE //





// SYSTEM //





// MAP //






// UX //







// MODES //





// ACTIONS //






const version = '1.0.0';

var selectedFeatures = [];
var hiddenFeatures = [];

/**
 * @module GeoFlo
 * @name GeoFlo
 * @description Represents the GeoFlo object that manages all modules.
 * @returns {Object} The GeoFlo object with various methods for managing the entire app.
 */
const GeoFlo = function () {
    document.adoptedStyleSheets = [(_index_css__WEBPACK_IMPORTED_MODULE_0___default())];
    
    if (!_src_require_Mapbox_js__WEBPACK_IMPORTED_MODULE_1__["default"]) throw new Error('MapboxGL script is required!')
    if (!_src_require_Turf_js__WEBPACK_IMPORTED_MODULE_2__["default"]) throw new Error('TurfJS script is required!');
    if (!_src_require_Omnivore_js__WEBPACK_IMPORTED_MODULE_3__["default"]) throw new Error('Omnivore script is required!');
    
    const ctx = this;
    const turf = this.turf = _src_require_Turf_js__WEBPACK_IMPORTED_MODULE_2__["default"];
    const omnivore = this.omnivore = _src_require_Omnivore_js__WEBPACK_IMPORTED_MODULE_3__["default"];

    this.version = version;
    this.Mapbox = _src_require_Mapbox_js__WEBPACK_IMPORTED_MODULE_1__["default"];

    this.options = _src_system_Options_js__WEBPACK_IMPORTED_MODULE_5__["default"];
    this.dev = this.statics.dev;
    this.id = this.statics.id;

    this.modes = [];
    this.plugins = {};
    this.gamepads = {};
    this.enabled = false;
    this.mobile = isMobile();

	/**
	 * @function
     * @memberOf module:geoflo
	 * @name initialize
	 * @description Initializes the object and optionally assigns it to the global window object.
	 * @returns {Object} The initialized object.
	 */
    this.initialize = function () {
        if (this.initialized) return this;
        window[this.id] = this;
        this.Utilities = new _src_system_Utilities_js__WEBPACK_IMPORTED_MODULE_6__["default"](this);
        this.initialized = true;
        return this;
    }
    
	/**
	 * @function
     * @memberOf module:geoflo
	 * @name init
	 * @description Initializes the map component with the provided options and a callback function when ready.
	 * @param {Object} [options={}] - The options object for configuring the map component.
	 * @param {Function} onReady - The callback function to be executed when the map is ready.
	 * @returns {Object} Returns the map component instance.
	 */
    this.init = function (options={}, onReady) {
        if (!options.accessToken) throw new Error('No Mapbox Access Token Provided!');

        const id = options.container || this.options.map.container;
        if (!id) throw new Error('Element id is required in the DOM for the map!');

        this.options.map.accessToken = options.accessToken;
        this.options.map.container = id;

        delete options.accessToken;
        delete options.container;

        this.setOptions(options);

        if (this.isReady) return this.build(this._container);
        this.onReady = onReady && typeof onReady === 'function' ? onReady : false;
        
        ready(this.options.map.container).then(function (res, rej) {
            if (!res || rej) throw new Error(`Element with id "${id}" is required in the DOM for the map!`)

            ctx.isReady = true;
            ctx._container = res;
            ctx._container.classList.add(ctx.statics.id);
            ctx.Map = new _src_map_Map_js__WEBPACK_IMPORTED_MODULE_7__["default"](ctx, ctx.options.map);
        })

        return this;
    }

    /**
	 * @function
     * @memberOf module:geoflo
	 * @name load
	 * @description This function loads the MapboxGL SDK with the given MapboxGL map object and sets up necessary components for interaction. Loads the User, Layers, and Features components, and initializes event listeners. Calls the onReady callback if provided.
	 * @param {Object} map - The MapboxGL map object to be used by the SDK.
	 * @returns {Object} - Returns the SDK instance after loading and initialization.
	 */
    this.load = function () {
        if (this.isLoaded || !this.isReady || !this.Map.getMap()) return this;

        this.map = this.Map.getMap();
        this.container = this.Map.getContainer();

        this.fullscreen = new _src_require_Mapbox_js__WEBPACK_IMPORTED_MODULE_1__["default"].FullscreenControl({ container: document.querySelector('body') });
        this.navigation = new _src_require_Mapbox_js__WEBPACK_IMPORTED_MODULE_1__["default"].NavigationControl({ visualizePitch: true, showZoom: !this.mobile, showCompass: true });
        this.attribution = new _src_ux_Controls_js__WEBPACK_IMPORTED_MODULE_12__["default"](this, { type: 'attribute', position: 'bottom-right', enable: true, show: true, attribution: this.statics.logo.full });
        this.map.addControl(this.navigation, this.mobile ? 'bottom-right' : 'top-right');
        
        if (!this.mobile) this.map.addControl(this.fullscreen, 'top-right');
    
        this.styles = this.map.addControl(new _src_ux_Styles_js__WEBPACK_IMPORTED_MODULE_13__["default"](this));
    
        this.Locate = new _src_ux_Locate_js__WEBPACK_IMPORTED_MODULE_15__["default"](this, { init: true });
        this.Layers = new _src_map_Layers_js__WEBPACK_IMPORTED_MODULE_8__["default"](this, { init: true });
        this.Features = new _src_map_Features_js__WEBPACK_IMPORTED_MODULE_9__["default"](this, { init: true });
        
        this.Events = (0,_src_ux_Events_js__WEBPACK_IMPORTED_MODULE_11__["default"])(this);
        this.Events.removeEventListeners();
        this.Events.addEventListeners();
    
        this.onReady ? this.onReady(this) : false;
    
        this.Map.setExtent(false, true);
        this.options.enable ? this.enable() : false;
    
        this.isLoaded = true;
        this.fire('sdk.ready', { enabled: this.enabled, map: this.map, ready: this.isLoaded });
    
        return this;
    }

	/**
	 * @function
     * @memberOf module:geoflo
	 * @name enable
	 * @description This function enables the map interaction mode based on the provided type and options. It sets the mode to 'select' or 'draw' depending on the type parameter, initializes options, controls, modes, and triggers events.
	 * @param {string} type - The type of interaction mode to enable ('select' or 'draw').
	 * @param {Object} options - Additional options for the interaction mode (default: {}).
	 * @returns {Object} - The current instance of the map with the enabled interaction mode.
	 */
    this.enable = function (type, options={}) {
        if (this.enabled) return this;
        
        this.mode = !type || type === 'select' ? 'select' : 'draw';
        this.type = type;

        this.setOptions(options);
        this.setControls();

        this.Select = new _src_mode_Select_js__WEBPACK_IMPORTED_MODULE_16__["default"](this);
        this.Draw = new _src_mode_Draw_js__WEBPACK_IMPORTED_MODULE_17__["default"](this);
        this.Edit = new _src_mode_Edit_js__WEBPACK_IMPORTED_MODULE_18__["default"](this);

        this.modes = [ this.Select, this.Draw, this.Edit ];
        this.enabled = true;

        this.fire('map.enable', { enabled: this.enabled, mode: this.mode, type: this.type });
        this.redraw();
        this.setMode({ mode: this.mode, type: this.type});
        return this;
    }

	/**
	 * @function
     * @memberOf module:geoflo
	 * @name disable
	 * @description This function disables the map by clearing modes, setting enabled to false, resetting mode to null, resetting options to default, firing a 'map.disable' event, enabling double click zoom, removing event listeners, layers, and controls.
	 * @returns {Object} Returns the current instance of the map object.
	 */
    this.disable = function () {
        if (!this.enabled) return this;

        this.modes = [];
        this.enabled = false;
        this.mode = null;
        this.options = _src_system_Options_js__WEBPACK_IMPORTED_MODULE_5__["default"];
        this.fire('map.disable', { enabled: this.enabled, mode: this.mode });
        this.doubleClickZoom.enable(this.map);
        this.Layers.removeEventListeners();
        this.Events.removeEventListeners();
        this.Layers.removeLayers();
        this.removeControls();
        return this;
    }

	/**
	 * @function
     * @memberOf module:geoflo
	 * @name redraw
	 * @description Redraws the map by refreshing layers, updating event listeners, and disabling double click zoom.
	 * @returns {Promise<boolean>} Returns a promise that resolves to true if the map is successfully redrawn, false otherwise.
	 */
    this.redraw = async function () {
        if (!this.Events) return false;

        await this.Layers.refresh();

        this.Events.removeEventListeners();
        this.Events.addEventListeners();
        this.Features.updateSource();
        this.doubleClickZoom.disable(this.map);
        this.fire('map.redraw', { enabled: this.enabled, mode: this.mode })
    }

	/**
	 * @function
     * @memberOf module:geoflo
	 * @name refresh
	 * @description Refreshes the content by redrawing it asynchronously.
	 * @returns {Promise<boolean>} Returns a Promise that resolves to a boolean value.
	 */
    this.refresh = async function () {
        if (this.noRefresh) return false;
        await this.redraw();
    }




	/**
	 * @function
     * @memberOf module:geoflo
	 * @name once
	 * @description Registers a callback function to be executed only once for a specific GeoFlo event type.
	 * @param {string} type - The type of event to listen for.
	 * @param {function} callback - The callback function to be executed when the event occurs.
	 * @returns {boolean} Returns true if the callback is successfully registered to be executed once, otherwise false.
	 */
    this.once = function (type, callback) {
        return this.map && type ? this.map.once(this.id + ':' + type, callback) : false;
    }

	/**
	 * @function
     * @memberOf module:geoflo
	 * @name on
	 * @description Registers a callback function to be executed for a specific GeoFlo event type.
	 * @param {string} type - The type of event to listen for.
	 * @param {function} callback - The callback function to be executed when the event occurs.
	 * @returns {boolean} Returns true if the event listener was successfully attached, false otherwise.
	 */
    this.on = function (type, callback) {
        if (!callback.name) throw new Error('Function must have a name!')
        return this.map && type ? this.map.on(this.id + ':' + type, callback) : false;
    }

	/**
	 * @function
     * @memberOf module:geoflo
	 * @name off
	 * @description Removes an event listener from the map based on the provided GeoFlo event type and callback. Callback function must have a name.
	 * @param {string} type - The type of event to remove the listener from.
	 * @param {function} callback - The callback function to be removed as the event listener.
	 * @returns {boolean} Returns true if the event listener was successfully removed, false otherwise.
	 */
    this.off = function (type, callback) {
        if (!callback.name) throw new Error('Function must have a name!')
        return this.map && type ? this.map.off(this.id + ':' + type, callback) : false;
    }

	/**
	 * @function
     * @memberOf module:geoflo
	 * @name fire
	 * @description Fires an event with the specified GeoFlo type and detail. Detail is an Object type.
	 * @param {string} type - The type of the event to fire.
	 * @param {any} detail - Additional details to include with the event.
	 * @returns {boolean} Returns true if the event was successfully fired, false otherwise.
	 */
    this.fire = function (type, detail) {
        return this.map && type ? this.map.fire(this.id + ':' + type, { detail: detail }) : false;
    }




	/**
	 * @function
     * @memberOf module:geoflo
	 * @name setOptions
	 * @description Sets the options for the object by merging the provided options with the existing ones.
	 * @param {Object} options - The options to be merged with the existing options.
	 * @returns {Object} The updated options object after merging.
	 */
    this.setOptions = function(options={}) {
        this.options = ctx.Utilities.assignDeep(this.options || {}, options);
        return this.options;
    }

	/**
	 * @function
     * @memberOf module:geoflo
	 * @name setMode
	 * @description This function allows the user to set the mode of the map editor with various options.
	 * @param {Object} options - The options object for setting the mode.
	 * @param {string} [options.mode='select'] - The mode to set (default: select).
	 * @param {string} [options.type='LineString'] - The type of the mode (default: LineString).
	 * @param {Object} [options.feature] - The feature to edit in the mode.
	 * @returns {Object} The current mode after setting it based on the options.
	 */
    this.setMode = function (options={}) {
        if (!options.mode) options.mode = this.statics.constants.modes.SELECT;
        if (!options.type) options.type = 'Polyline';

        var classesToRemove = [];
        var selectedMode = null;
        var editMode = options.mode === this.statics.constants.modes.EDIT;

        if (this.currentMode && options.mode === this.mode && options.type === this.currentMode.type) return this.currentMode;
        
        if (editMode) {
            if (options.feature) {
                options.feature = ctx.Utilities.cloneDeep(options.feature);
                options.mode = this.statics.constants.modes.DRAW;
                options.type = options.type || options.feature.properties.type;

                this.editing = ctx.Utilities.cloneDeep(options.feature);
                this.removeSelection();
            } else {
                //this.wantingToEdit = true;
                if (this.currentMode) this.currentMode.deactivate();
                return this.setMode();
            }
        }

        if (this.currentMode && this.currentMode.activated) this.currentMode.deactivate();

        this.container.classList.forEach(function(className) {
            if (className.indexOf("mouse-") !== -1) {
                classesToRemove.push(className);
            }
        });

        if (classesToRemove.length > 0) {
            var _ctx$container$classL;
            (_ctx$container$classL = this.container.classList).remove.apply(_ctx$container$classL, classesToRemove);
        }

        this.setMapClass('pointer');

        this.modes.forEach(function(m) { if (m.canHandle && m.canHandle(options.mode)) { selectedMode = m; } });

        if (selectedMode) {
            this.fire('mode.change', {
                old: this.mode,
                new: options.mode,
                mode: selectedMode,
                type: options.type
            })

            this.currentMode = selectedMode;
            this.mode = options.mode;
            selectedMode.activate(options);
        }

        this.Snapping = new _src_action_Snapping_js__WEBPACK_IMPORTED_MODULE_19__["default"](this, this.currentMode);
        this.Pinning = new _src_action_Pinning_js__WEBPACK_IMPORTED_MODULE_20__["default"](this, this.currentMode);
        this.Routing = new _src_action_Routing_js__WEBPACK_IMPORTED_MODULE_21__["default"](this, this.currentMode);
        this.Exploring = new _src_action_Exploring_js__WEBPACK_IMPORTED_MODULE_23__["default"](this, this.currentMode);
        this.Painting = new _src_action_Painting_js__WEBPACK_IMPORTED_MODULE_22__["default"](this, this.currentMode);
        this.Layers.moveLayers();
        return this.currentMode;
    }

	/**
	 * @function
     * @memberOf module:geoflo
	 * @name setControls
	 * @description Initializes and sets the controls for the map. Adds the fullscreen and navigation controls, and initializes the custom controls.
	 * @params {none} - No parameters needed for this function.
	 * @returns {Array} - An array of initialized controls for the map.
	 */
    this.setControls = function (controls=[]) {
        if (this.controls && this.controls.length) return this.controls;
        if (!this.options.controls) return false;
        this.controls = [];
        controls = controls.length ? controls : this.statics.controls;
        controls.forEach(function(control) { this.controls.push(new _src_ux_Controls_js__WEBPACK_IMPORTED_MODULE_12__["default"](this, control)) }, this);
        return this.controls;
    }

	/**
	 * @function
     * @memberOf module:geoflo
	 * @name setIcon
	 * @description This function determines the appropriate icon to display based on the user's following status and navigation compass icon.
     * @deprecated
	 * @param {Event} event - The event for which the icon is being set.
	 * @returns {void}
	 */
    this.setIcon = function (event) {
        var icon = this.navigation ? this.navigation._compassIcon : false;
        var following = this.Locate && this.Locate.following;

        if (following) {

        } else if (icon) {
            //control.style.transform = icon.style.transform;
        }
    }

	/**
	 * @function
     * @memberOf module:geoflo
	 * @name setCenterMarker
	 * @description This function sets a marker at the center of the map. It allows customization of the marker icon and behavior.
	 * @param {Object} options - Options object for customizing the center marker.
	 * @param {boolean} [options.remove] - If true, removes the center marker.
	 * @param {boolean} [options.transform] - If true, applies transformation to the center marker.
	 * @param {boolean} [options.gamepad] - If true, applies gamepad settings to the center marker.
	 * @param {boolean} [options.dontAdd] - If true, does not add the center marker.
	 * @param {boolean} [options.noRemove] - If true, prevents the center marker from being removed.
	 * @return {Object|boolean} Returns the center marker object if successfully added or updated, or false if not applicable.
	 */
    this.setCenterMarker = function (options={}) {
        if (!this.mobile || this.noCenterMarker) return false;
        
        var following = this.Locate && this.Locate.following;
        var icon = this.statics.logo.icon;
        var el;

        if (options.remove) {
            if (this.centerMarker && !this.centerMarker.noRemove) return this.centerMarker.remove(), delete this.centerMarker;
            return false;
        }
       
        if (this.centerMarker) {
            this.centerMarker.setLngLat(this.map.getCenter()).addTo(this.map);
            if (options.transform || options.gamepad) this.centerMarker.setPitchAlignment('map');
            return this.centerMarker;
        } else if (options.dontAdd) {
            return false;
        }

        if (!this.centerMarkerIcon) {
            el = document.createElement('div');
            el.className = this.id + '-center-marker';
            setIcon(el, icon);
        }
        
        this.centerMarkerIcon = el;
        this.centerMarker = new this.Mapbox.Marker(this.centerMarkerIcon);
        this.centerMarker.setLngLat(this.map.getCenter()).addTo(this.map).setOffset([0,0]);
        this.centerMarker.noRemove = options.noRemove;

        if (following) this.centerMarker.setOffset([0,-20]);

        function setIcon(marker, icon) {
            marker.style.backgroundImage = `url("${icon}")`;
        }

        return this.centerMarker;
    }

	/**
	 * @function
     * @memberOf module:geoflo
	 * @name setButtons
	 * @description This function resets the active buttons and activates the Select button.
	 * @return {boolean} Returns true if the Select button is successfully set, false otherwise.
	 */
    this.setButtons = function () {
        return this.getButtons('select') ? this.getButtons('select').add() : false;
    }

	/**
	 * @function
     * @memberOf module:geoflo
	 * @name setActiveButton
	 * @description Sets the active button with the specified id in the controls array.
	 * @param {string} id - The id of the button to set as active.
	 * @returns {boolean} Returns false if the controls array is empty or undefined.
	 */
    this.setActiveButton = function (id) {
        if (!this.controls || !this.controls.length) return false;
        this.controls.forEach(function(control) { control.setActiveButton(id.toLowerCase()) })
    }

	/**
	 * @function
     * @memberOf module:geoflo
	 * @name setTheme
	 * @description Sets the theme colors for the control.
	 * @param {Object} colors - An object containing the theme colors.
	 * @returns {void}
	 */
    this.setTheme = function (colors) {
        this.Control ? this.Control.setTheme(colors) : false;
    }

	/**
	 * @function
     * @memberOf module:geoflo
	 * @name setCustomLayers
	 * @description Sets custom layers on the map.
	 * @param {Array} layers - An array of custom layers to be added to the map.
	 * @param {Object} options - Additional options for setting custom layers.
	 * @returns {Promise} A promise that resolves when the custom layers are set on the map.
	 */
    this.setCustomLayers = async function (layers=[], options={}) {
        this.removeFeatures(layers, options);
        return await this.Layers.setCustomLayers(layers, options);
    }

	/**
	 * @function
     * @memberOf module:geoflo
	 * @name setSelectedFeatures
	 * @description This function updates the selected features on the map with the provided array of features.
	 * @param {Array} features - An array of features to set as selected.
	 * @returns {boolean} Returns false if the features array is empty.
	 */
    this.setSelectedFeatures = function (features=[]) {
        if (!features.length) return false;

        selectedFeatures.splice(0, selectedFeatures.length, ...features);

        this.map.getSource(this.statics.constants.sources.SELECT).setData(turf.featureCollection(this.getSelectedFeatures()));
        this.map.getSource(this.statics.constants.sources.VERTEX).setData(turf.featureCollection(this.getSelectedFeatures()));

        this.fire('select.load', {
            features: turf.featureCollection(this.getSelectedFeatures()),
            source: this.map.getSource(this.statics.constants.sources.SELECT)
        })
    }

	/**
	 * @function
     * @memberOf module:geoflo
	 * @name setMeshFeatures
	 * @description Updates the mesh data with the provided features and returns the updated mesh. Adds a mesh index if it does not exist.
	 * @param {Array} features - An array of features to update the mesh with.
	 * @returns {Object} The updated mesh after setting the features.
	 */
    this.setMeshFeatures = function (features=[]) {
        if (!features.length) return false;
        this.updateMeshData(features, true);
        return this.meshIndex.getFeatures();
    }

	/**
	 * @function
     * @memberOf module:geoflo
	 * @name setMapClass
	 * @description Sets a specific mouse class on the map container element based on the provided name. Removes any existing classes starting with "mouse-" before adding the new class.
	 * @param {string} name - The name of the class to be added (without the "mouse-" prefix).
	 * @returns {boolean} Returns false if the name is empty, otherwise adds the class and returns undefined.
	 */
    this.setMapClass = function (name) {
        this.container.classList.forEach(function(className) {
            if (className.indexOf("mouse-") !== -1) this.container.classList.remove(className)
        }, this);

        if (!name) return false;
        this.container.classList.add("mouse-" + name);
    }




	/**
	 * @function
     * @memberOf module:geoflo
	 * @name hasControls
	 * @description This function checks if the object has controls by verifying the existence and length of the controls array.
	 * @returns {boolean} Returns true if the object has controls, false otherwise.
	 */
    this.hasControls = function () {
        return this.controls && this.controls.length;
    }

	/**
	 * @function
     * @memberOf module:geoflo
	 * @name hasSelection
	 * @description This function determines whether there is a selection of features.
	 * @returns {boolean} Returns true if there is a selection of features, otherwise false.
	 */
    this.hasSelection = function () {
        return this.getSelectedFeatures().length > 0;
    }

	/**
	 * @function
     * @memberOf module:geoflo
	 * @name hasSingleSelection
	 * @description This function checks if there is only one selected feature.
	 * @returns {boolean} Returns true if there is a single selection, false otherwise.
	 */
    this.hasSingleSelection = function () {
        return this.getSelectedFeatures().length === 1;
    }




	/**
	 * @function
     * @memberOf module:geoflo
	 * @name activateSnapping
	 * @description This function activates snapping by getting the snapping buttons, activating them, and triggering the snapping activation event. Fires a custom event 'snapping.activate' with the enabled status and the snapping object.
	 * @returns {Object} The activated Snapping object.
	 */
    this.activateSnapping = function () {
        var buttons = this.getButtons('snapping');
        if (!buttons) return;
        buttons.activate();
        this.Snapping.activate();
        this.fire('snapping.activate', { enabled: true, mesh: this.meshIndex, snapping: this.Snapping })
        return this.Snapping;
    }

	/**
	 * @function
     * @memberOf module:geoflo
	 * @name activatePinning
	 * @description This function activates pinning by getting the pinning buttons, activating them, enabling snapping, activating pinning, and firing an event. Fires a custom event 'pinning.activate' with the enabled status and the pinning object.
	 * @returns {Object} The activated pinning object.
	 */
    this.activatePinning = function () {
        var buttons = this.getButtons('pinning');
        if (!buttons) return;
        buttons.activate();
        //this.deactivateRouting();
        this.activateSnapping();
        this.Pinning.activate();
        this.fire('pinning.activate', { enabled: true, pinning: this.Pinning });
        return this.Pinning;
    }

	/**
     * @function
     * @memberOf module:geoflo
	 * @description This function activates the routing feature by getting the routing buttons, activating them, enabling snapping, deactivating painting, and activating the routing itself. Fires a custom event 'routing.activate' with the enabled status and the routing object.
	 * @name activateRouting
	 * @returns {Object} The activated Routing object.
	 */
    this.activateRouting = function () {
        var buttons = this.getButtons('routing');
        if (!buttons) return;
        buttons.activate();
        this.activateSnapping();
        this.deactivatePainting();
        this.Routing.activate();
        this.fire('routing.activate', { enabled: true, routing: this.Routing })
        return this.Routing;
    }

	/**
	 * @function
     * @memberOf module:geoflo
	 * @name activateExploring
	 * @description This function activates the exploring mode by activating the exploring buttons, functionalities, and events. Fires a custom event 'exploring.activate' with the enabled status and the exploring object.
	 * @returns {Object} The activated exploring object.
	 */
    this.activateExploring = function () {
        var buttons = this.getButtons('exploring');
        if (!buttons) return;
        buttons.activate();
        this.deactivatePainting();
        this.Exploring.activate();
        this.fire('exploring.activate', { enabled: true, exploring: this.Exploring });
        return this.Exploring;
    }

	/**
	 * @function
     * @memberOf module:geoflo
	 * @name activatePainting
	 * @description Activates the painting functionality by setting the draw mode, activating the painting buttons, deactivating routing and exploring, and firing an event. Fires a custom event 'painting.activate' with the enabled status and the painting object.
	 * @returns {Object} The activated Painting object.
	 */
    this.activatePainting = function () {
        var buttons = this.getButtons('painting');
        if (!buttons) return;
        buttons.activate();
        this.deactivateRouting();
        this.deactivateExploring();
        this.Painting.activate(this.drawMode);
        this.fire('painting.activate', { enabled: true, painting: this.Painting });
        return this.Painting;
    }




	/**
	 * @function
     * @memberOf module:geoflo
	 * @name deactivateSnapping
	 * @description This function deactivates the snapping feature by performing various actions. Deletes mesh data, deactivates the snapping buttons, deactivates the Snapping object, and fires a 'snapping.deactivate' event.
	 * @returns {boolean} Returns false after deactivating the snapping feature.
	 */
    this.deactivateSnapping = function () {
        var buttons = this.getButtons('snapping');
        if (!buttons) return;
        buttons.deactivate();
        this.deleteMeshData();
        this.Snapping.deactivate();
        this.fire('snapping.deactivate', { enable: false })
        return false;
    }

	/**
	 * @function
     * @memberOf module:geoflo
	 * @name deactivatePinning
	 * @description This function deactivates the pinning feature by deactivating the pinning buttons, the Pinning object, and firing a 'pinning.deactivate' event.
	 * @returns {boolean} Returns false after deactivating pinning.
	 */
    this.deactivatePinning = function () {
        var buttons = this.getButtons('pinning');
        if (!buttons) return;
        buttons.deactivate();
        this.Pinning.deactivate();
        this.fire('pinning.deactivate', { enable: false });
        return false;
    }

	/**
	 * @description Deactivates the routing functionality by deactivating the routing buttons and the Routing module. Triggers a custom event 'routing.deactivate' with enable set to false.
	 * @function
     * @memberOf module:geoflo
	 * @name deactivateRouting
	 * @returns {boolean} Returns false after deactivating the routing functionality.
	 */
    this.deactivateRouting = function () {
        var buttons = this.getButtons('routing');
        if (!buttons) return;
        buttons.deactivate();
        this.Routing.deactivate();
        this.fire('routing.deactivate', { enable: false })
        return false;
    }

	/**
	 * @function
     * @memberOf module:geoflo
	 * @name deactivateExploring
	 * @description This function deactivates the exploring mode by deactivating buttons, deleting mesh data, deactivating the exploring mode, and firing an event. Fires a custom event 'exploring.deactivate' with the enable status set to false.
	 * @returns {boolean} Returns false after deactivating the exploring mode.
	 */
    this.deactivateExploring = function () {
        var buttons = this.getButtons('exploring');
        if (!buttons) return;
        buttons.deactivate();
        this.deleteMeshData();
        this.Exploring.deactivate();
        this.fire('exploring.deactivate', { enable: false });
        return false;
    }

	/**
	 * @function
     * @memberOf module:geoflo
	 * @name deactivatePainting
	 * @description This function deactivates the painting mode by deactivating the buttons, the painting tool, and firing an event. Fires a custom event 'painting.deactivate' with the enable status set to false.
	 * @returns {boolean} Returns false.
	 */
    this.deactivatePainting = function () {
        var buttons = this.getButtons('painting');
        if (!buttons) return;
        if (this.mobile && !this.currentMode.finished && this.currentMode.id === 'draw' && this.currentMode.type && this.currentMode.type === 'Rectangle') return;
        buttons.deactivate();
        this.Painting.deactivate();
        this.fire('painting.deactivate', { enable: false });
        return false;
    }

    


	/**
	 * @function
     * @memberOf module:geoflo
	 * @name getMap
	 * @description Retrieves the map property from the Map object.
	 * @returns {Object} The map property of the Map object.
	 */
    this.getMap = function () {
        return this.Map.map;
    }

	/**
	 * @function
     * @memberOf module:geoflo
	 * @name getModes
	 * @description Retrieves the modes based on the provided mode parameter. If a mode is specified, it returns the mode that can handle the input mode. If no mode is specified, it returns all available modes.
	 * @param {string} mode - The mode to be checked against available modes.
	 * @returns {Array|Object} - An array of all available modes if no mode is specified, or the mode object that can handle the input mode.
	 */
    this.getModes = function (mode) {
        return mode ? this.modes.find(function(m) { if (m.canHandle && m.canHandle(mode)) { return m; } }) : this.modes;
    }

	/**
	 * @function
     * @memberOf module:geoflo
	 * @name getMode
	 * @description Retrieves the current mode of the object. Either 'GeoFlo.Select' or 'GeoFlo.Draw'.
	 * @return {object} The current mode of the object.
	 */
    this.getMode = function () {
        return this.currentMode;
    }

	/**
	 * @function
     * @memberOf module:geoflo
	 * @name getColors
	 * @description This function retrieves the colors from the options object.
	 * @returns {Array} The colors array from the options object.
	 */
    this.getColors = function () {
        return this.options.colors;
    }

	/**
	 * @description Retrieves the buttons associated with a specific control or all buttons from the controls.
	 * @function
     * @memberOf module:geoflo
	 * @name getButtons
	 * @param {string} id - The ID of the button to retrieve. If not provided, retrieves all buttons.
	 * @returns {object|boolean} - Returns an object containing the buttons if found, or false if controls are not available.
	 */
    this.getButtons = function (id) {
        if (!this.hasControls()) return false;

        var buttons;

        this.controls.forEach(function (c) {
            var options = c.getButtonOptions();

            if (id) {
                if (!buttons && options[id]) buttons = options[id];
            } else {
                if (!buttons) buttons = {};

                Object.entries(options).forEach(function(entry) {
                    var key = entry[0];
                    var val = entry[1];
                    buttons[key] = val;
                })
            }
            
        })

        return buttons;
    }




	/**
	 * @function
     * @memberOf module:geoflo
	 * @name getFeatures
	 * @description This function retrieves both the drawn and selected features and returns them as a single array.
	 * @return {Array} An array containing both the drawn and selected features.
	 */
    this.getFeatures = function () {
        return [this.getDrawnFeatures(), this.getSelectedFeatures()].flat();
    }

	/**
	 * @function
     * @memberOf module:geoflo
	 * @name getDrawnFeatures
	 * @description Retrieves the drawn features from the Features object.
	 * @returns {Array} An array of drawn features.
	 */
    this.getDrawnFeatures = function () {
        return this.Features.getColdFeatures();
    }

	/**
	 * @function
     * @memberOf module:geoflo
	 * @name getRenderedFeatures
	 * @description Retrieves rendered features within a specified radius around a given longitude and latitude, based on a filter.
	 * @param {Array<number>} lngLat - An array containing the longitude and latitude coordinates.
	 * @param {number} radiusInKm - The radius in kilometers within which to search for features.
	 * @param {object} filter - An optional filter object to apply when retrieving features.
	 * @returns {Array<object>} An array of rendered features that match the criteria.
	 */
    this.getRenderedFeatures = function (lngLat, radiusInKm, filter) {
        var features = [this.getRenderedDrawnFeatures(lngLat, radiusInKm, filter), this.getRenderedSnapFeatures(lngLat, radiusInKm, filter)].flat();
        return features;
    }

	/**
	 * @function
     * @memberOf module:geoflo
	 * @name getRenderedDrawnFeatures
	 * @description This function queries the map for rendered drawn features based on the provided parameters.
	 * @param {Object} lngLat - The longitude and latitude coordinates.
	 * @param {number} radiusInKm - The radius in kilometers for the search.
	 * @param {Object} filter - Optional filter object to apply to the query.
	 * @returns {Array} An array of features within the specified radius around the given coordinates.
	 */
    this.getRenderedDrawnFeatures = function (lngLat, radiusInKm, filter) {
        var bbox;
        var id = this.id;

        var layers = [
            id + "-line-cold",
            id + "-fill-cold",
            id + "-circle-cold",
            id + "-icon-cold",
            id + "-fill-select",
            id + "-line-select",
            id + '-point-select',
            id + '-symbol-select'
        ];

        this.Layers.getLayers().forEach(function(layer) {
            if (layer.id.includes(id)) return;
            layers.push(layer.id);
        })

        var options = { layers: layers };

        if (radiusInKm) {
            var radius = turf.distanceToDegrees(radiusInKm);
            bbox = [this.map.project([lngLat.lng - radius, lngLat.lat - radius]), this.map.project([lngLat.lng + radius, lngLat.lat + radius])];
        } else {
            var point = lngLat ? this.map.project([lngLat.lng, lngLat.lat]) : null;
            bbox = point ? [[point.x - 5, point.y - 5], [point.x + 5, point.y + 5]] : null
        }

        filter ? options.filter = filter : false;
        
        var features = this.map.queryRenderedFeatures(bbox, options);
        var ids = features.map(function(feature) { return feature.parent || feature.properties.parent || feature.id || feature.properties.id; });

        return features && features.length ? this.Features.getFeaturesById(ids) : [];;
    }
    
	/**
	 * @function
     * @memberOf module:geoflo
	 * @name getRenderedSnapFeatures
	 * @description Retrieves rendered mesh index features within a specified radius around a given point on the map.
	 * @param {Object} lngLat - The longitude and latitude coordinates of the center point.
	 * @param {number} radiusInKm - The radius in kilometers within which to search for features.
	 * @param {Object} filter - Optional filter to apply to the query.
	 * @returns {Array} An array of features that fall within the specified radius around the given point.
	 */
    this.getRenderedSnapFeatures = function (lngLat, radiusInKm, filter) {
        if (!this.meshIndex) return [];

        var radius = turf.distanceToDegrees(radiusInKm);
        var bbox = [this.map.project([lngLat.lng - radius, lngLat.lat - radius]), this.map.project([lngLat.lng + radius, lngLat.lat + radius])];
        var options = { layers: [this.statics.constants.layers.MESH + '-line', this.statics.constants.layers.MESH + '-circle'] };
        filter ? options.filter = filter : false;
        var features = this.map.queryRenderedFeatures(bbox, options);
        return features && features.length ? this.meshIndex.getFeaturesFromIndex(features) : [];
    }

	/**
	 * @function
     * @memberOf module:geoflo
	 * @name getFeatureById
	 * @description Retrieves a feature by its ID from the Features object.
	 * @param {string} id - The ID of the feature to retrieve.
	 * @returns {boolean|object} Returns the feature object if found, otherwise false.
	 */
    this.getFeatureById = function (id) {
        if (!id) return false;
        return this.Features.getFeatureById(id);
    }

	/**
	 * @function
     * @memberOf module:geoflo
	 * @name getFeaturesByLayer
	 * @description This function queries the map for features within a specified radius around a given location from a specific source layer.
	 * @param {string} source - The source layer to query features from.
	 * @param {LngLat} lngLat - The longitude and latitude coordinates of the center point for the query.
	 * @param {number} radiusInKm - The radius in kilometers within which to search for features.
	 * @param {Object} filter - Optional filter object to apply to the query.
	 * @returns {Array} An array of features that match the query criteria.
	 */
    this.getFeaturesByLayer = function (source, lngLat, radiusInKm, filter) {
        var layers = [];
        var bbox;

        this.Layers.getLayers().forEach(function(layer) {
            if (!layer.id.includes(source)) return;
            layers.push(layer.id);
        })

        var options = { layers: layers };

        if (radiusInKm) {
            var radius = turf.distanceToDegrees(radiusInKm);
            bbox = [this.map.project([lngLat.lng - radius, lngLat.lat - radius]), this.map.project([lngLat.lng + radius, lngLat.lat + radius])];
        } else {
            var point = lngLat ? this.map.project([lngLat.lng, lngLat.lat]) : null;
            bbox = point ? [[point.x - 5, point.y - 5], [point.x + 5, point.y + 5]] : null
        }

        filter ? options.filter = filter : false;

        var features = this.map.queryRenderedFeatures(bbox, options);
        var ids = features.map(function(feature) { return feature.parent || feature.properties.parent || feature.id || feature.properties.id; });

        return features && features.length ? this.Features.getFeaturesById(ids) : [];;
    }




	/**
	 * @function
     * @memberOf module:geoflo
	 * @name getSelectedFeatures
	 * @description Retrieves the selected features stored in the selectedFeatures array.
	 * @returns {Array} An array containing the selected features.
	 */
    this.getSelectedFeatures = function () {
        return selectedFeatures;
    }

	/**
	 * @function
     * @memberOf module:geoflo
	 * @name getSelectedFeatureIds
	 * @description Retrieves the IDs of selected features.
	 * @returns {Array} An array of feature IDs.
	 */
    this.getSelectedFeatureIds = function () {
        return this.getSelectedFeatures().map((feature) => { return feature.parent || feature.properties.parent || feature.id || feature.properties.id; });
    }

	/**
	 * @function
     * @memberOf module:geoflo
	 * @name getSelectedFeaturesBbox
	 * @description Retrieves the bounding box of the selected features.
	 * @returns {Array<number>} The bounding box coordinates [minX, minY, maxX, maxY].
	 */
    this.getSelectedFeaturesBbox = function () {
        if (!this.hasSelection()) return null;
        return turf.bbox(turf.featureCollection(this.getSelectedFeatures()));
    }

	/**
	 * @function
     * @memberOf module:geoflo
	 * @name getSelectedPropertyNames
	 * @description Retrieves the unique property names of selected features excluding the ID property.
	 * @returns {Array} An array of unique property names.
	 */
    this.getSelectedPropertyNames = function () {
        const id = this.id;
        const names = [];

        this.getSelectedFeatures().forEach((feature) => {
            Object.keys(feature.properties).forEach((propertyName) => {
                if (names.indexOf(propertyName) === -1 && propertyName !== id) {
                    names.push(propertyName);
                }
            });
        });

        return names;
    }

	/**
	 * @function
     * @memberOf module:geoflo
	 * @name getSelectedPropertyValues
	 * @description Retrieves the properties of selected features excluding the property with the specified ID.
	 * @returns {Object} An object containing the properties of selected features.
	 */
    this.getSelectedPropertyValues = function  () {
        const id = this.id;
        var props = {};

        this.getSelectedFeatures().forEach(function (feature) { Object.assign(props, feature.properties); });
        if (props[id] !== undefined) { delete props[id]; }
        return props;
    }

	/**
	 * @description This function returns the common geometry type of the selected features. If all selected features have the same geometry type, it returns that type. If the selected features have different geometry types, it returns "illegal".
	 * @function
     * @memberOf module:geoflo
	 * @name getCommonGeometryType
	 * @returns {string|null} The common geometry type or null if different types are present.
	 */
    this.getCommonGeometryType = function () {
        let allFeaturesType = null;

        this.getSelectedFeatures().forEach((feature) => {
            if (allFeaturesType === null) {
                allFeaturesType = feature.geometry.type;
            } else if (feature.geometry.type !== allFeaturesType) {
                allFeaturesType = "illegal";
            }
        });

        if (allFeaturesType === "illegal") {
            return null;
        } else {
            return allFeaturesType;
        }
    }




	/**
	 * @function
     * @memberOf module:geoflo
	 * @name editFeature
	 * @description This function allows editing a feature by providing its ID or using the currently selected feature. It triggers a 'feature.edit' event and sets the mode to 'edit'.
	 * @param {string} id - The ID of the feature to edit.
	 * @param {Object} options - Additional options for editing the feature.
	 * @param {Object} options.feature - The feature object to edit.
	 * @returns {Object} The edited feature.
	 */
    this.editFeature = function (id, options={}) {
        var feature = options.feature || this.getFeatureById(id);
        
        if (!feature) {
            if (!this.hasSingleSelection()) return false;
            feature = this.getSelectedFeatures()[0];
        }

        options.id = feature.id;
        options.mode = 'edit';
        options.feature = feature;

        this.fire('feature.edit', { feature: feature, id: feature.id });
        this.setMode(options);
        return feature;
    }

	/**
	 * @function
     * @memberOf module:geoflo
	 * @name cancelEdit
	 * @description This function cancels the current edit mode if it is in 'draw' mode and deactivates the editing feature.
	 * @param {boolean} standby - Indicates whether the cancel operation is standby.
	 * @param {object} feature - The feature to be deactivated. If not provided, the editing feature will be used.
	 * @returns {boolean} Returns false if the current mode is not 'draw', otherwise deactivates the editing feature.
	 */
    this.cancelEdit = function (standby, feature) {
        if (this.currentMode.id !== 'draw') return false;
        return this.currentMode.deactivate(true, standby, feature || this.editing);
    }

	/**
	 * @function
     * @memberOf module:geoflo
	 * @name saveEdit
	 * @description Saves the edited feature using the currentModes saveEdit method.
	 * @return {any} The result of the saveEdit method of the current mode.
	 */
    this.saveEdit = function () {
        return this.currentMode.saveEdit();
    }





	/**
	 * @function
     * @memberOf module:geoflo
	 * @name addFeatures
	 * @description Adds features to the map and optionally zooms to them.
	 * @param {Array} features - Array of features to be added to the map.
	 * @param {boolean} noZoom - Flag to indicate whether to zoom to the added features.
	 */
    this.addFeatures = function (features, noZoom) {
        if (!features) return false;
        if (features.features) features = features.features;
        if (!Array.isArray(features)) features = [features];
        if (!features.length) return false;

        this.Features.addFeatures(features);
        !noZoom ? this.zoomToFeatures() : false;
    }

	/**
	 * @function
     * @memberOf module:geoflo
	 * @name addFeaturesToSelected
	 * @description This function adds the provided features to the selected features list, updates the map sources, sets buttons, updates the text, and triggers a 'feature.select' event.
	 * @param {Array} features - The features to be added to the selected features list.
	 */
    this.addFeaturesToSelected = function (features) {
        this.getSelectedFeatures().push(...features);
        this.setButtons();
        this.map.getSource(this.statics.constants.sources.SELECT).setData(turf.featureCollection(this.getSelectedFeatures()));
        this.map.getSource(this.statics.constants.sources.VERTEX).setData(turf.featureCollection(this.getSelectedFeatures()));
        this.Features.setText(features);
        this.fire('feature.select', { ids: this.getSelectedFeatureIds(), features: this.getSelectedFeatures() });
    }

	/**
	 * @function
     * @memberOf module:geoflo
	 * @name addFeaturesToMesh
	 * @description Adds features to the mesh index and updates its data.
	 * @param {Array} features - An array of features to be added to the mesh.
	 * @returns {Array} The array of features that were added to the mesh.
	 */
    this.addFeaturesToMesh = function (features=[]) {
        if (!features.length) return false;
        this.updateMeshData(features);
        return features;
    }

	/**
	 * @function
     * @memberOf module:geoflo
	 * @name addGamepad
	 * @description Adds a gamepad to the list of available gamepads and fires an event. Fires a custom event 'gamepad.add' with the gamepad object.
	 * @param {Object} gamepad - The gamepad object to be added.
	 * @returns {boolean} Returns false if the 'Gamepad' plugin is not available.
	 */
    this.addGamepad = function (gamepad) {
        this.gamepads[gamepad.index] = new this.Gamepad(this, gamepad);
        this.fire('gamepad.add', { gamepad: gamepad });
    }

	/**
	 * @function
     * @memberOf module:geoflo
	 * @name addTooltip
	 * @description Attaches a tooltip by calling setTooltip to a specified element within a parent element.
	 * @param {Element} parent - The parent element to which the tooltip will be attached.
	 * @param {Element} element - The element to which the tooltip will be applied.
	 * @param {Object} options - The options for customizing the tooltip.
	 * @param {Element} appendTo - The element to which the tooltip will be appended.
	 */
    this.addTooltip = function (parent, element, options, appendTo) {
        if (!this.setTooltip) return false;

        this.setTooltip(element, {
            parent: parent,
            appendTo: appendTo,
            options: options
        })
    }

	/**
	 * @function
     * @memberOf module:geoflo
	 * @name addPlugin
	 * @description Adds a plugin to the plugins object of the current instance.
	 * @param {Object} plugin - The plugin object to be added.
	 * @param {string} plugin.id - The unique identifier of the plugin.
	 * @throws {Error} If no Plugin ID is provided.
	 */
    this.addPlugin = function (plugin) {
        if (!plugin.id) throw new Error('No Plugin ID provided')
        var id = plugin.id;
        this.plugins[id] = plugin;
    }



    

	/**
	 * @description Removes the selection of features based on the provided feature ID. If no ID is provided, all selected features are deselected.
	 * @function
     * @memberOf module:geoflo
	 * @name removeSelection
	 * @param {string} id - The ID of the feature to be deselected.
	 * @returns {number} The number of features that were deselected.
	 */
    this.removeSelection = function (id) {
        this.removePopup();

        if (!this.hasSelection()) return this.Features.setText();

        var ids = ctx.Utilities.clone(this.getSelectedFeatureIds());
        var features = ctx.Utilities.clone(this.getSelectedFeatures());

        if (!id) features.forEach(function (feature) { this.Features.addFeatures([feature], true); }, this);

        this.getSelectedFeatures().splice(0, features.length);
        this.setButtons();

        this.map.getSource(this.statics.constants.sources.SELECT).setData(turf.featureCollection([]));
        this.map.getSource(this.statics.constants.sources.VERTEX).setData(turf.featureCollection([]));
        
        this.Features.setText();
        this.fire('feature.deselect', { ids: ids, features: features });
        return features.length;
    }

	/**
	 * @function
     * @memberOf module:geoflo
	 * @name removeControls
	 * @description This function is responsible for removing controls.
	 * @params {none} No parameters needed.
	 */
    this.removeControls = function () {
        console.log('NEED TO REMOVE CONTROLS')
    }

	/**
	 * @function
     * @memberOf module:geoflo
	 * @name removeGamepad
	 * @description Removes a gamepad from the list of connected gamepads and triggers the onDisconnect event. Fires a custom event 'gamepad.remove' with the gamepad object.
	 * @param {Object} gamepad - The gamepad object to be removed.
	 * @returns {boolean} Returns false if the gamepad is not found in the list.
	 */
    this.removeGamepad = function (gamepad) {
        if (!this.gamepads[gamepad.index]) return false;
        this.gamepads[gamepad.index].onDisconnect(gamepad);
        delete this.gamepads[gamepad.index]
        this.fire('gamepad.remove', { gamepad: gamepad });
    }

	/**
	 * @function
     * @memberOf module:geoflo
	 * @name removeFeatures
	 * @description Removes specified features from the map. If no layers are provided, all features are removed. If the layers parameter is not an array, the function returns false.
	 * @param {Array} layers - An array of layers to remove features from.
	 * @param {Object} options - Additional options for removing features.
	 */
    this.removeFeatures = function (layers, options) {
        if (!layers) return this.Features.deleteFeatures();
        if (!Array.isArray(layers)) return false;
        this.Features.removeFeatures(layers, true);
    }

	/**
	 * @function
     * @memberOf module:geoflo
	 * @name removeFeature
	 * @description Removes a feature from the Features collection and fires an event if edit mode is not enabled. Fires a custom event 'feature.delete' with the ID and feature object.
	 * @param {string} id - The ID of the feature to be removed.
	 * @param {boolean} edit - A flag indicating whether edit mode is enabled.
	 * @returns {boolean} - Returns true if the feature was successfully removed, otherwise false.
	 */
    this.removeFeature = function (id, edit) {
        var removed = id ? this.Features.removeFeatures(id, edit) : false;
        !edit ? this.fire('feature.delete', { id: id, feature: removed }) : false;
        return removed;
    }

	/**
	 * @function
     * @memberOf module:geoflo
	 * @name removePopup
	 * @description Removes the popup element from the DOM.
	 * @return {boolean} Returns true if the popup was successfully removed, false otherwise.
	 */
    this.removePopup = function () {
        return this.popup && this.popup.remove ? this.popup.remove() : this.currentMode.popup && this.currentMode.popup.remove ? this.currentMode.popup.remove() : false;
    }






	/**
	 * @function
     * @memberOf module:geoflo
	 * @name updateMeshData
	 * @description This function updates the mesh data on the map by adding new features to the mesh index and updating the map source with the new data. If the mesh index is not available or the reset flag is set to true, the mesh index is reset before adding new features.
	 * @param {Array} features - An array of features to be added to the mesh index.
	 * @param {boolean} reset - A flag indicating whether to reset the mesh index before adding new features.
	 * @returns {Object} The updated feature collection that was set on the map source.
	 */
    this.updateMeshData = function (features=[], reset) {
        if (!this.meshIndex || reset) this.meshIndex = new this.Mesh([]);
        this.meshIndex.addNewFeatures(features);

        var source = this.statics.constants.sources.MESH;
        var features = turf.featureCollection(this.meshIndex.getFeatures());

        this.map.getSource(source).setData(features);
        this.fire('mesh.update', { features: features });
        return features;
    }

	/**
	 * @function
     * @memberOf module:geoflo
	 * @name updateSelectedProperties
	 * @description This function updates the selected properties of features based on the new properties provided while keeping specified properties.
	 * @param {Object} newProperties - The new properties to update the features with.
	 * @param {Array} propertiesToKeep - An array of property names to keep while updating the features.
	 */
    this.updateSelectedProperties = function (newProperties, propertiesToKeep) {
        this.getSelectedFeatures().forEach((feature) => {
            const savedId = feature.parent || feature.properties.parent || feature.id || feature.properties.id;
            const baseProperties = {};

            propertiesToKeep.forEach((propertyName) => {
                if (feature.properties[propertyName]) baseProperties[propertyName] = feature.properties[propertyName];
            });

            feature.properties = Object.assign(baseProperties, newProperties, { id: savedId });
        });
    }

	/**
	 * @function
     * @memberOf module:geoflo
	 * @name updateOrientation
	 * @description Updates the orientation of the user based on the provided options.
	 * @param {Object} options - An object containing the options for updating the orientation.
	 * @returns {string} The location of the user after updating the orientation.
	 */
    this.updateOrientation = function (options) {
        this.Locate.update(options);
        return this.Locate.locate;
    }

    

	/**
	 * @function
     * @memberOf module:geoflo
	 * @name saveFeatures
	 * @description This function prepares the features of a layer for export in different formats such as KMZ, GPX, and GeoJSON. It styles the features, creates necessary metadata, and generates the export files.
	 * @param {Object} layer - The layer object containing the features to be exported.
	 * @returns {void}
	 */
    this.saveFeatures = function (layer) {
        const id = this.id;
        var fc, folderName;

        if (!layer) {
            if (this.hasSelection()) {
                folderName = 'Selected Features';
                fc = turf.featureCollection(this.getSelectedFeatures());
            } else {
                folderName = folderName = 'All Features';
                fc = turf.featureCollection(this.Features.getColdFeatures());
            }
        } else {
            if (!layer.id || !layer.name) return window.alert('Layer ID and Name are required!');
            folderName = layer.name + '-' + layer.id;
            fc = turf.featureCollection(this.Features.getFeaturesByLayer(layer));
        }

        if (!fc.features.length) return window.alert('No Features to Export!');

        var features = ctx.Utilities.cloneDeep(fc.features);

		features = features.map(function (f) {
            f.style = {};
            f.style['stroke'] = f.properties.style && f.properties.style.primaryColor ? f.properties.style.primaryColor : this.options.colors.primaryColor;
            f.style['stroke-width'] = 3;
            f.style['fill'] = f.properties.style && f.properties.style.secondaryColor ? f.properties.style.secondaryColor : this.options.colors.secondaryColor;
            f.style['fill-opacity'] = 1;
			
            f.properties.id = f.id;
            f.properties.unit = f.geometry.unit;
            f.properties.units = f.geometry.units;

            delete f.properties.style;
            delete f.geometry.unit;
            delete f.geometry.units;

			return f;
		}, this);

        fc = turf.featureCollection(features);

        var d = new Date();
        var name = id + "_export - " + (d.getMonth() + 1) + "." + d.getDate() + "." + d.getFullYear() + "_" + d.getHours() + d.getMinutes();

        const extensions = ['kmz', 'gpx', 'geojson'];
        const zip = new window.JSZip();
        const description = {
			Id: this.id,
            Version: this.version,
			Features: fc.features.length
		}

        extensions.forEach(function (t) {
            const folder = zip.folder(folderName + ' ' + t.toUpperCase());

			switch (t) {
				case 'kmz':
                    var table = document.createElement('table');
                    var tableBody = document.createElement('tbody');
                    table.appendChild(tableBody);

					Object.entries(description).forEach(function (entry) {
						var h = entry[0];
						var d = entry[1];

                        var row = document.createElement('tr');
                        var header = document.createElement('th');
                        var data = document.createElement('td');

                        header.textContent = h + ': ';
                        data.textContent = d;

                        row.appendChild(header);
                        row.appendChild(data);

						tableBody.appendChild(row);
					});

					var kml = omnivore.toKML(fc, {
						name: 'id',
                        simplestyle: true,
						description: description.Id,
						documentName: folderName,
						documentDescription: table.innerHTML
					});

					var blob = new Blob([kml], { type: "application/vnd.google-earth.kml+xml" });
					folder.file(folderName.toLowerCase() + ".kml", blob);
					break;
				case 'gpx':
					features.forEach(function (f) {
						var title = f.id;
						var feature = turf.featureCollection([f]);
						var gpx = omnivore.toGPX(feature, {
							creator: description.Id,
							featureTitle: function (p) { return p.id; }
						})

						folder.file(folderName.toLowerCase() + '_' + title + ".gpx", gpx);
					})
					break;
				case 'geojson':
					var geojson = fc;
					var blob = new Blob([JSON.stringify(geojson)], { type: "application/geojson" });
					folder.file(folderName.toLowerCase() + ".geojson", blob);
					break;
			}
		})

        zip.generateAsync({ type: "blob" }).then(function (content) {
            var blob = new Blob([content], { type: "application/zip;charset=utf-8" });

            window.geoflo.fire('features.export', { features: features, blob: blob, date: d, name: name });

            var tempLink = document.createElement("a");
            tempLink.setAttribute('href', URL.createObjectURL(blob));
            tempLink.setAttribute('download', name + ".zip");
            tempLink.click();
            URL.revokeObjectURL(tempLink.href);
        });
    }

	/**
	 * @function
     * @memberOf module:geoflo
	 * @name loadFeatures
	 * @description This function creates an input element of type file, allows multiple file selection, and triggers a file selection event. It then processes the selected files by calling the Utilities.processFiles function.
	 * @params {Event} event - The event object triggered by file selection.
	 * @returns {void}
	 */
    this.loadFeatures = function () {
        const input = document.createElement('input');
        input.type = 'file';
        input.setAttribute('multiple', 'multiple');
        input.addEventListener('change', handleSelection, false);
        input.click();

        function handleSelection(event) {
            const files = [];

            for (let x = 0; x < event.target.files.length; x++) {
                files.push(event.target.files[x]);
            }

            ctx.Utilities.processFiles(files, processFiles);
        }

        function processFiles (file, name, ext) {
            var features = [];
        
            if (ext === 'geojson' || ext === 'json') {
                features = JSON.parse(file);
            } else if (omnivore[ext]) {
                omnivore[ext].parse(file, null, { addData: function (feats) { features = feats; } });
            } else {
                return alert("File type not supported: " + ext);
            }

            if (features.features) features = features.features;
            if (!Array.isArray(features)) features = [features];

            features.forEach(function (feature) {
                feature.properties.import = true;
                feature.source = feature.source || feature.properties.source || ctx.statics.constants.sources.COLD;
            })
            
            ctx.fire('features.import', { features: features, file: file, ext: ext, name: name })
            ctx.addFeatures(features);
        }
    }


	/**
	 * @function
     * @memberOf module:geoflo
	 * @name moveMapAlongLine
	 * @description This function animates the movement of the map along a specified line. The camera follows the route, ensuring synchronized movement.
	 * @param {Array} line - The line representing the route on the map.
	 * @returns {void}
	 */
    this.moveMapAlongLine = function (line) {
        if (!line) return;

        const animationDuration = 80000;
        const cameraAltitude = 4000;
        // get the overall distance of each route so we can interpolate along them
        const routeDistance = turf.lineDistance(line);
        const cameraRouteDistance = turf.lineDistance(line);

        let start;

        console.log(line, routeDistance, cameraRouteDistance)

        function frame(time) {
            if (!start) start = time;
            // phase determines how far through the animation we are
            const phase = (time - start) / animationDuration;

            // phase is normalized between 0 and 1
            // when the animation is finished, reset start to loop the animation
            if (phase > 1) {
                // wait 1.5 seconds before looping
                setTimeout(() => {
                    start = 0.0;
                }, 1500);
            }

            // use the phase to get a point that is the appropriate distance along the route
            // this approach syncs the camera and route positions ensuring they move
            // at roughly equal rates even if they don't contain the same number of points
            const alongRoute = turf.along( turf.lineString(line), routeDistance * phase ).geometry.coordinates;
            const alongCamera = turf.along( turf.lineString(line), cameraRouteDistance * phase ).geometry.coordinates;
            const camera = ctx.map.getFreeCameraOptions();

            // set the position and altitude of the camera
            camera.position = mapboxgl.MercatorCoordinate.fromLngLat({ lng: alongCamera[0], lat: alongCamera[1] }, cameraAltitude );

            // tell the camera to look at a point along the route
            camera.lookAtPoint({
                lng: alongRoute[0],
                lat: alongRoute[1]
            });

            ctx.map.setFreeCameraOptions(camera);

            window.requestAnimationFrame(frame);
        }

        window.requestAnimationFrame(frame);
    }

	/**
	 * @function
     * @memberOf module:geoflo
	 * @name refreshMeshData
	 * @description This function refreshes the mesh data by triggering a 'snapping.refresh' event with the current mesh features.
	 * @params {void} - No parameters needed for this function.
	 */
    this.refreshMeshData = function () {
        if (!this.meshIndex) return;
        if (this.mapMoving) return;
        //this.deleteMeshData();
        //this.addFeaturesToMesh(this.getDrawnFeatures())
        this.fire('snapping.refresh', { features: this.meshIndex.getFeatures() })
    }

	/**
	 * @function
     * @memberOf module:geoflo
	 * @name deleteMeshData
	 * @description Deletes the mesh data by updating it with an empty array and triggering a 'snapping.delete' event with the features from the mesh index.
	 * @params {Array} features - The features to update the mesh data with.
	 * @params {Boolean} triggerEvent - A flag to indicate whether to trigger the 'snapping.delete' event.
	 */
    this.deleteMeshData = function () {
        this.updateMeshData([], true);
        this.fire('snapping.delete', { features: this.meshIndex.getFeatures() })
    }

	/**
	 * @function
     * @memberOf module:geoflo
	 * @name deleteUserData
	 * @description This function allows the user to delete selected features or all features based on confirmation prompts. It updates the map data and resets various properties.
	 * @params {void} - No parameters required.
	 * @returns {void} - No return value.
	 */
    this.deleteUserData = function () {
        var id

        if (this.hasSingleSelection()) {
            if (window.confirm('Delete Selected Feature?')) {
                var feature = this.getSelectedFeatures()[0];
                id = feature.parent || feature.properties.parent || feature.id || feature.properties.id;
                this.Features.removeFeatures(id, true);
                this.meshIndex ? this.meshIndex.removeFeature(id) : false;
                this.fire('feature:delete', { features: this.Features.getColdFeatures() })
            } else {
                return;
            }
        } else {
            if (window.confirm('Delete All Features?')) {
                this.Features.deleteFeatures();
                this.fire('features.delete', { features: this.Features.getColdFeatures() })
            } else {
                return;
            }
        }
        
        this.hotFeature = null;
        this.snapFeature = null;
        this.lastClick = null;
        this.firstClick = null;
        this.drawStarted = null;

        this.removeSelection(id);

        this.map.getSource(this.statics.constants.sources.SNAP).setData(turf.featureCollection([]));
        this.map.getSource(this.statics.constants.sources.HOT).setData(turf.featureCollection([]));
        this.map.getSource(this.statics.constants.sources.HOTTEXT).setData(turf.featureCollection([]));

        if (this.editMode) {
            this.editMode = false;
            this.setMode();
        }
    }

    this.doubleClickZoom = {
        enable(map) {
            setTimeout(() => {
                if (!map || !map.doubleClickZoom) return;
                map.doubleClickZoom.enable();
            }, 0);
        },
        disable(map) {
            setTimeout(() => {
                if (!map || !map.doubleClickZoom) return;
                map.doubleClickZoom.disable();
            }, 0);
        }
    };


    

	/**
	 * @function
     * @memberOf module:geoflo
	 * @name hideSelectedFeatures
	 * @description This function hides the selected features on the map by moving them to a hidden features array and updating the map sources.
	 * @params {Array} hiddenFeatures - Array to store the hidden features.
	 * @params {Array} selectedFeatures - Array of selected features on the map.
	 * @returns {void}
	 */
    this.hideSelectedFeatures = function () {
        if (hiddenFeatures.length > 0) {
            this.getSelectedFeatures().push(...hiddenFeatures);
            hiddenFeatures.splice(0, hiddenFeatures.length);
        } else if (this.hasSelection()) {
            hiddenFeatures.push(...this.getSelectedFeatures().splice(0, this.getSelectedFeatures().length));
        }

        this.map.getSource(this.statics.constants.sources.SELECT).setData(turf.featureCollection(this.getSelectedFeatures()));
        this.map.getSource(this.statics.constants.sources.VERTEX).setData(turf.featureCollection(this.getSelectedFeatures()));
    }

	/**
	 * @function
     * @memberOf module:geoflo
	 * @name combineSelectedFeatures
	 * @description Combines selected features based on their geometry type.
	 * @params {void}
	 * @returns {void}
	 */
    this.combineSelectedFeatures = function () {
        if (this.mode === this.statics.constants.modes.SELECT) {
            if (this.hasSelection()) {
                var allFeaturesType = this.getCommonGeometryType();

                if (allFeaturesType === "Polygon") {
                    var polygons = [];

                    this.forEachSelectedFeature(function(polygon) {
                        polygons.push.apply(polygons, consumableArray(polygon.geometry.coordinates));
                    });

                    if (polygons.length > 0) {
                        this.Features.addFeatures([turf.polygon(polygons, this.getSelectedPropertyValues())]);
                        this.removeSelection();
                    }
                } else if (allFeaturesType === "LineString") {
                    var coords = ctx.Utilities.combineSameTypeFeatures(this.getSelectedFeatures());

                    if (coords.length > 0) {
                        this.Features.addFeatures([turf.lineString(coords, this.getSelectedPropertyValues())]);
                        this.removeSelection();
                    }
                } else {
                    console.error("Only objects of the same type can be combined, " + "i.e. lines with lines and polygons with polygons");
                }
            }
        } else {
            console.error("Combine can only be executed in selection mode");
        }
    }

	/**
	 * @function
     * @memberOf module:geoflo
	 * @name moveSelectedFeatures
	 * @description This function checks if moving is enabled and if there are selected features of LineString type. If so, it offsets the selected LineString features by the specified distance in the provided direction.
	 * @param {number} direction - The direction in which to move the selected features (1 for forward, -1 for backward).
	 * @returns {boolean} Returns false if moving is not enabled or there are no selected LineString features.
	 */
    this.moveSelectedFeatures = function (direction) {
        if (!this.options.moving || !this.options.moving.enable) { return false }
        var distance = this.options.moving.distance;

        if (this.mode === this.statics.constants.modes.SELECT) {
            if (this.hasSelection()) {
                var allFeaturesType = this.getCommonGeometryType();

                if (allFeaturesType === "LineString") {
                    var newSelectedFeatures = [];
                    this.forEachSelectedFeature(function(feature) { newSelectedFeatures.push(turf.lineOffset(feature, distance * direction)); });
                    this.setSelectedFeatures(newSelectedFeatures);
                }
            }
        }
    }

	/**
	 * @function
     * @memberOf module:geoflo
	 * @name moveFeature
	 * @description This function calculates the new coordinates of a feature based on the direction and distance provided. NOT WORKING YET.
	 * @param {Object} feature - The feature object to be moved.
	 * @param {number} direction - The direction in which the feature should be moved (1 for forward, -1 for backward).
	 * @returns {Array} An array of new coordinates for the feature after moving.
	 */
    this.moveFeature = function (feature, direction) {
        return;
        if (!this.options.moving || !this.options.moving.enable) return false
        
        var distance = this.options.moving.distance;
        var result = [];
        var lastDestinationPoint = null;
        var coordinates = feature.geometry.coordinates;

        for (var index = 0; index < coordinates.length; index++) {
            var moveBearing = 0;
            var startPoint = null;
            var middlePoint = coordinates[index];

            if (index === 0) {
                var endPoint = coordinates[index + 1];
                var secondBearing = turf.bearing(middlePoint, endPoint);
                moveBearing = secondBearing - 90;
                
                if (moveBearing < -180) {
                    moveBearing += 180;
                }
            } else if (index === coordinates.length - 1) {
                startPoint = coordinates[index - 1];
                var firstBearing = turf.bearing(middlePoint, startPoint);
                moveBearing = firstBearing - 90;

                if (moveBearing < -180) {
                    moveBearing += 180;
                }
            } else {
                startPoint = coordinates[index - 1];
                var _endPoint = coordinates[index + 1];

                var _firstBearing = turf.bearing(middlePoint, startPoint);
                var _secondBearing = turf.bearing(middlePoint, _endPoint);

                var angle = 0;

                if (_firstBearing < 0 && _secondBearing < 0 || _firstBearing > 0 && _secondBearing > 0) {
                    angle = Math.abs(Math.abs(_firstBearing) - Math.abs(_secondBearing));
                    moveBearing = _firstBearing < 0 ? _firstBearing - angle / 2 : _firstBearing + angle / 2;
                } else {
                    angle = Math.abs(Math.abs(_firstBearing) + Math.abs(_secondBearing));
                    moveBearing = _firstBearing < 0 ? _firstBearing - angle / 2 : (angle / 2 - _firstBearing) * -1;
                }
            }

            var destinationPoint = turf.destination(middlePoint, direction * distance, moveBearing);

            if (lastDestinationPoint && startPoint) {
                var crossingLine = turf.lineString([lastDestinationPoint.geometry.coordinates, destinationPoint.geometry.coordinates]);
                var intersectFc = turf.lineIntersect(turf.lineString([startPoint, middlePoint]), crossingLine);

                if (intersectFc.features.length > 0) {
                    destinationPoint = turf.destination(middlePoint, direction * -distance, moveBearing);
                }
            }

            result.push(destinationPoint.geometry.coordinates);
            lastDestinationPoint = destinationPoint;
        }

        return result;
    }

    

	/**
	 * @function
     * @memberOf module:geoflo
	 * @name forEachSelectedFeature
	 * @description Iterates over each selected feature and applies a handler function to it.
	 * @param {Function} handler - The function to be applied to each selected feature.
	 * @returns {void}
	 */
    this.forEachSelectedFeature = function (handler) {
        this.getSelectedFeatures().forEach(handler);
    }

	/**
	 * @function
     * @memberOf module:geoflo
	 * @name zoomToFeatures
	 * @description This function zooms to the provided features on the map. If no features are provided, it zooms to the selected features, cold features, or the map extent if no other features are available.
	 * @param {Array} features - The features to zoom to on the map.
	 * @param {Object} options - Additional options for zooming (default: {}).
	 * @returns {boolean} Returns false if no features are available to zoom to.
	 */
    this.zoomToFeatures = function (features, options={}) {
        features = features || (this.hasSelection() ? this.getSelectedFeatures() : this.Features ? this.Features.getColdFeatures() : []);
        if (features.properties) features = [features];
        if (!features || !features.length) features = !this.Map.options.extent ? [] : [turf.polygon(this.Map.options.extent)];
        if (features.length < 1) return false;
        this.Map.setExtent(features, false, options);
    }

	/**
	 * @function
     * @memberOf module:geoflo
	 * @name createPolygon
	 * @description Creates a polygon from selected LineString features and adds it to the map.
	 * @params {Array} selectedFeatures - An array of selected features to be combined into a polygon.
	 * @params {Object} selectedPropertyValues - Property values of the selected features.
	 * @returns {void}
	 */
    this.createPolygon = function () {
        if (this.mode === this.statics.constants.modes.SELECT) {
            if (this.hasSelection()) {
                var allFeaturesType = this.getCommonGeometryType();

                if (allFeaturesType === "LineString") {
                    var coords = ctx.Utilities.combineSameTypeFeatures(this.getSelectedFeatures());

                    if (coords.length > 0) {
                        if (!ctx.Utilities.isPointEqual(coords[0], coords[coords.length - 1])) {
                            coords.push(coords[0]);
                        }

                        this.addFeaturesToSelected([turf.polygon([coords], this.getSelectedPropertyValues())]);
                        this.removeSelection();
                    }
                } else {
                    console.error("Only objects of type LineString can be combined into a polygon");
                }
            }
        } else {
            console.error("Create polygon can only be executed in selection mode");
        }
    }

    this.initialize();
};

GeoFlo.prototype.statics = _src_system_Statics_js__WEBPACK_IMPORTED_MODULE_4__["default"];
GeoFlo.prototype.Gamepad = _src_ux_Gamepad_js__WEBPACK_IMPORTED_MODULE_14__["default"];
GeoFlo.prototype.Mesh = _src_map_Mesh_js__WEBPACK_IMPORTED_MODULE_10__["default"];

const geoflo = new GeoFlo();

_src_map_Mesh_js__WEBPACK_IMPORTED_MODULE_10__["default"].prototype[geoflo.id] = geoflo;

function isMobile() {
    const e = /(iphone|ipod|ipad|android|iemobile|blackberry|bada)/.test(window.navigator.userAgent.toLowerCase());
    return e || (navigator.userAgent.includes("Mac") && "ontouchend"in document)
}

async function ready (id) {
    var count = 0;

    return new Promise(async function (resolve, reject) {
        var ready = setInterval(function() {
            var element = document.getElementById(id);
            
            if (count === 10000) {
                clearInterval(ready);
                return reject(false);
            }

            if (!element) return count++;

            clearInterval(ready);
            return resolve(element);
        }, 1);
    })
}


})();

/******/ })()
;
//# sourceMappingURL=mapboxgl-geoflo.js.map