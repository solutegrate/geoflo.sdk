/**
 * @mixin
 * @memberof module:geoflo
 * @name Pinning
 * @description This module provides the pinning functionality for the Geoflo application. It allows users to pin features to the map by creating a buffer around the feature and snapping to nearby features.
 * @param {Object} mode - The mode object containing the type of mode.
 * @returns {Object} Returns the Pinning object.
 */
const Pinning = function (mode) {
    const geoflo = this.geoflo;

    this.type = mode.type;
    this.coldFeatures = [];
    this.pinableFeatures = [];
    this.pinnedFeatures = [];

	/**
	 * @function
     * @memberof module:geoflo.Pinning
	 * @name activate
	 * @description Activates the feature by setting the enabled flag to true and enabling pinning in the options.
	 * @params {void} None
	 * @returns {void}
	 */
    /**
    * @function activate
    * @memberof _MEMBER_OF_
    * @description - This function activates the pinning functionality by setting the enabled flag to true and enabling pinning in the options.
    *
    * @returns {void} No return value.
    *
    */
    this.activate = function () {
        this.coldFeatures = [];
        this.pinableFeatures = [];
        this.pinnedFeatures = [];
        this.enabled = true;
        geoflo.options['pinning'].enable = true;
        geoflo.map.getSource(geoflo.statics.constants.sources.PIN).setData(turf.featureCollection([]));
    }

	/**
	 * @function
     * @memberof module:geoflo.Pinning
	 * @name deactivate
	 * @description This function deactivates pinning by setting enabled to false, disabling pinning in options, clearing buffer, pinableFeatures, and pinningFeatures, and resetting coldFeatures.
	 */
    this.deactivate = function () {
        this.enabled = false;
        geoflo.options['pinning'].enable = false;
        this.resetFeatures();
        delete this.buffer;
        this.coldFeatures = [];
        this.pinableFeatures = [];
        this.pinnedFeatures = [];
    }

	/**
	 * @function
     * @memberof module:geoflo.Pinning
	 * @name getFeatures
	 * @description Retrieves the features from the pinnedFeatures array in the context object.
	 * @returns {Array} An array of features extracted from the pinnedFeatures array.
	 */
    this.getFeatures = function () {
        return this.pinnedFeatures.map(function (feature) { return geoflo.Utilities.cloneDeep(feature) });
    }

    this.saveFeatures = function () {
        const features = this.pinnedFeatures.map(function (feature) { return geoflo.Utilities.cloneDeep(feature) });
        geoflo.addFeatures(features);
        geoflo.map.getSource(geoflo.statics.constants.sources.PIN).setData(turf.featureCollection([]));
        this.coldFeatures = [];
        this.pinableFeatures = [];
        this.pinnedFeatures = [];
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
        if (!this.enabled || !coords) return false;
        this.pinableFeatures = this.getNearByFeatures(coords);
        geoflo.fire('pinning.add', { features: this.pinableFeatures, buffer: this.buffer });
        return this.pinableFeatures;
    }

	/**
	 * @function
     * @memberof module:geoflo.Pinning
	 * @name resetFeatures
	 * @description Resets the updated features by adding them to the canvas context.
	 * @returns {boolean} Returns false if there are no updated features to reset.
	 */
    this.resetFeatures = function () {
        if (!this.coldFeatures.length) return false;
        geoflo.map.getSource(geoflo.statics.constants.sources.PIN).setData(turf.featureCollection([]));
        geoflo.addFeatures(this.coldFeatures);
    }

	/**
	 * @function
     * @memberof module:geoflo.Pinning
	 * @name updateFeatures
	 * @description This function updates the features if the pinning functionality is enabled. It updates the pinable features, pinned features, and triggers events accordingly.
	 * @returns {boolean} Returns false if the pinning functionality is not enabled, otherwise returns the updated pinning features.
	 */
    this.updateFeatures = function (point) {
        if (!this.enabled || !point || !this.pinableFeatures.length) return false;
        updateFeatures.call(this, this.pinableFeatures, point.geometry.coordinates);
        geoflo.hideFeatures(this.coldFeatures);
        geoflo.map.getSource(geoflo.statics.constants.sources.PIN).setData(turf.featureCollection(this.pinnedFeatures));
        geoflo.pinnedFeatures = geoflo.Utilities.cloneDeep(this.pinableFeatures);
        geoflo.fire('pinning.update', { feature: geoflo.hotFeature, point: point, pinned: this.pinnedFeatures });
        return this.pinnedFeatures;
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

        const hotFeatureId = geoflo.hotFeature ? geoflo.hotFeature.id : null;
        const calculatedRadius = geoflo.options.snapping.distance * Math.pow(2, Math.max(1, 19 - geoflo.map.getZoom()));
        const radiusInKm = calculatedRadius / 100000;
        const buffer = this.setBuffer(coords);

        if (!buffer) return false;

        const features = geoflo.getRenderedDrawnFeatures({ lng: coords[0], lat: coords[1] }, radiusInKm);
        const nearby = [];

        // Precompute point for faster comparisons
        const point = turf.point(coords);

        features.forEach((feature) => {
            if (hotFeatureId === feature.id) return; // Skip if it's the active feature

            // Check all coordinates in one loop instead of using `turf.coordEach`
            const coordsArray = feature.geometry.coordinates.flat(Infinity); // Flattens to avoid nested looping

            for (let index = 0; index < coordsArray.length; index += 2) {
                const coord = [coordsArray[index], coordsArray[index + 1]];

                // Fast checks for nearby conditions
                if (
                    (buffer.radius && turf.booleanWithin(turf.point(coord), buffer.radius)) ||
                    (buffer.coords && geoflo.Utilities.isPointEqual(coord, buffer.coords))
                ) {
                    nearby.push({
                        id: feature.id || feature.properties.id,
                        type: feature.properties.type,
                        index: Math.floor(index / 2), // Convert flattened index back to original index
                        feature: feature
                    });
                    break; // Stop checking once a valid nearby point is found
                }
            }
        });

        return nearby;
    };

    
    if (geoflo.options['pinning'].enable) this.activate();


    function updateFeatures(features, coords) {
        if (!features || !features.length || !coords) return false;

        const coldFeatureIds = new Set(this.coldFeatures.map(f => f.id));
        const updatedFeatureIds = new Set(this.pinnedFeatures.map(f => f.id));

        features.forEach((feature) => {
            const id = feature.id;
            const feat = feature.feature;
            const index = feature.index;

            if (!coldFeatureIds.has(id)) {
                this.coldFeatures.push(geoflo.Utilities.cloneDeep(feat));
                coldFeatureIds.add(id);
            }

            const updated = updatedFeatureIds.has(id) ? this.pinnedFeatures.find(f => f.id === id) : feat;

            if (updated.geometry.type === 'Point') {
                updated.geometry.coordinates = coords;
            } else if (updated.geometry.type === 'Polygon') {
                updated.geometry.coordinates[0][index] = coords;
            } else if (updated.geometry.type === 'LineString') {
                updated.geometry.coordinates[index] = coords;
            }

            if (!updatedFeatureIds.has(id)) {
                this.pinnedFeatures.push(geoflo.Utilities.cloneDeep(updated));
                updatedFeatureIds.add(id);
            }
        });
    }

};

export default Pinning;