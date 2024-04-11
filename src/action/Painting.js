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

export { Painting as default }