/**
 * @mixin
 * @memberof module:geoflo
 * @name Painting
 * @description This module provides the painting functionality for the Geoflo application. It allows users to free-draw on the map.
 * @param {Object} mode - The mode object containing the type of mode.
 * @returns {Object} Returns the Painting object.
 */
const Painting = function (mode) {
    const geoflo = this.geoflo;

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
        geoflo.options['painting'].enable = true;
        geoflo.map.getSource(geoflo.statics.constants.sources.SNAP).setData(turf.featureCollection([]));
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
        geoflo.options['painting'].enable = false;
        geoflo.map.dragPan.enable();
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
        if (!geoflo.mouseIsDown) return geoflo.hotFeature;
        
        var type = this.type;
        var feature = setFeature(type, coords);

        if (!this.feature) {
            this.currentCoords = [];
            geoflo.startPoint = coords;
            geoflo.map.getSource(geoflo.statics.constants.sources.SNAP).setData(turf.featureCollection([feature]));
            geoflo.fire('painting.start', { type: type, coords: coords, feature: feature });
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
        if (!this.enabled) return geoflo.hotFeature;
        if (!this.feature) return this.setFeature(coords);

        var feature = this.feature;
        var type = this.type;

        this.currentCoords.push(coords);

        if (type === 'Rectangle') {
            updateCoordinate(feature, "0.1", coords[0], geoflo.mouseIsDown[1]);
            updateCoordinate(feature, "0.2", coords[0], coords[1]);
            updateCoordinate(feature, "0.3", geoflo.mouseIsDown[0], coords[1]);
            updateCoordinate(feature, "0.4", geoflo.mouseIsDown[0], geoflo.mouseIsDown[1] );
        } else if (type === 'Circle') {
            var center = feature.properties.center;
            if (!center || !center.length) return feature;

            const distanceInKm = turf.distance(turf.point(center), turf.point(coords), { units : 'kilometers'});
            const circleFeature = turf.circle(center, distanceInKm);

            feature.geometry.coordinates = circleFeature.geometry.coordinates;
            geoflo.Utilities.setProperty(feature, 'radiusInKm', distanceInKm);
        } else {
            feature.geometry.coordinates.push(coords);
        }

        geoflo.map.getSource(geoflo.statics.constants.sources.SNAP).setData(turf.featureCollection([this.feature]));
        geoflo.fire('painting.update', { type: type, coords: coords, feature: feature });
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

        if (geoflo.Exploring && geoflo.Exploring.enabled) this.feature = await geoflo.Exploring.getMatch(this.currentCoords, { set: true, start: geoflo.startPoint });

        feature = mode.updateHotSource(this.feature);
        feature = geoflo.Utilities.cloneDeep(feature);

        geoflo.lastClick = { coords: feature.geometry.coordinates[feature.geometry.coordinates.length - 1] };
        this.currentCoords = [];
        this.feature = feature;
        return feature;
    }



    if (geoflo.options['painting'].enable) this.activate();



    function setFeature (type, coords) {
        var feature;

        if (type === 'Rectangle') {
            feature = turf.polygon([[
                geoflo.mouseIsDown,
                coords,
                coords,
                geoflo.mouseIsDown
            ]]);
        } else if (type === 'Circle') {
            feature = turf.polygon([[
                geoflo.mouseIsDown,
                coords,
                coords,
                geoflo.mouseIsDown
            ]]);

            geoflo.Utilities.setProperty(feature, 'center', geoflo.mouseIsDown);
        } else {
            feature = turf.lineString([geoflo.mouseIsDown, coords]);
        }

        geoflo.Utilities.setProperty(feature, 'type', type);
        geoflo.Utilities.setProperty(feature, 'painting', 1);
        return feature;
    }

    function updateCoordinate (f, t, e, n) {
        var o = t.split(".")
            , r = parseInt(o[0], 10)
            , i = parseInt(o[1], 10);
        void 0 === f.geometry.coordinates[r] && (f.geometry.coordinates[r] = []),
        f.geometry.coordinates[r][i] = [e, n]
    }
};

export default Painting;