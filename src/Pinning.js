/**
 * @module
 * @memberof module:geoflo
 * @name Pinning
 * @description This module provides the pinning functionality for the Geoflo application. It allows users to pin features to the map by creating a buffer around the feature and snapping to nearby features.
 * @param {Object} mode - The mode object containing the type of mode.
 * @returns {Object} Returns the Pinning object.
 */
const Pinning = function (mode) {
    const geoflo = this.geoflo;

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
        geoflo.options['pinning'].enable = true;
    }

	/**
	 * @function
     * @memberof module:geoflo.Pinning
	 * @name deactivate
	 * @description This function deactivates the pinning feature by setting enabled to false, disabling pinning in options, clearing buffer, pinableFeatures, and pinningFeatures, and resetting updatedFeatures.
	 */
    this.deactivate = function () {
        this.enabled = false;
        geoflo.options['pinning'].enable = false;
        this.resetFeatures();
        delete this.buffer;
        delete geoflo.pinableFeatures;
        delete geoflo.pinningFeatures;
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
        var features = geoflo.pinnedFeatures && geoflo.pinnedFeatures.length ? geoflo.pinnedFeatures.map(function (feature) { return feature.feature }) : [];
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
        if (!coords || !geoflo.options.pinning.buffer) return false;

        var buffer = turf.buffer(turf.point(coords), geoflo.options.pinning.buffer);
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
        geoflo.pinableFeatures = [];
        if (!this.enabled || !coords) return false;
        geoflo.pinableFeatures = this.getNearByFeatures(coords);
        geoflo.fire('pinning.add', { features: geoflo.pinableFeatures, buffer: this.buffer });
        return geoflo.pinableFeatures;
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
        geoflo.addFeatures(this.updatedFeatures, true);
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
        if (!geoflo.pinableFeatures || !geoflo.pinableFeatures.length) return delete geoflo.pinningFeatures, false;
        updateFeatures.call(this, geoflo.pinableFeatures);
        geoflo.Features.updateFeatures(geoflo.pinableFeatures, { type: 'pinning', coords: geoflo.snappedVertex, addUnits: true });
        geoflo.pinnedFeatures = geoflo.Utilities.cloneDeep(geoflo.pinableFeatures);
        geoflo.fire('pinning.update', { feature: geoflo.hotFeature, vertex: turf.point(geoflo.snappedVertex), features: geoflo.pinnedFeatures });
        return geoflo.pinningFeatures;
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

        var hotFeature = geoflo.hotFeature;
        var calculatedRadius = geoflo.options.snapping.distance * Math.pow(2, Math.max(1, 19 - geoflo.map.getZoom()));
        var radiusInKm = calculatedRadius / 100000;
        var buffer = this.setBuffer(coords);
        var features = geoflo.getRenderedDrawnFeatures({lng: coords[0], lat: coords[1]}, radiusInKm);
        var nearby = [];

        features.forEach(function (feature) {
            turf.coordEach(feature, function (coord, index) {
                var isNearby = false;
    
                if (buffer.radius && turf.booleanWithin(turf.point(coord), buffer.radius)) isNearby = true;
                if (!isNearby && buffer.coords && geoflo.Utilities.isPointEqual(coord, buffer.coords)) isNearby = true;
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
    
    if (geoflo.options['pinning'].enable) this.activate();


    function updateFeatures(features) {
        if (!features || !features.length) return false;

        features.forEach(function (feature) {
            var pinned = this.updatedFeatures.find(function (f) { return f.id === feature.id });
            if (pinned) return;
            this.updatedFeatures.push(geoflo.Utilities.cloneDeep(feature.feature));
        }, this);
    }
};

export default Pinning;