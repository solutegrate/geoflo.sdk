/**
 * @mixin
 * @memberof module:geoflo
 * @name Features
 * @description This module provides the features functionality for the Geoflo application. It allows users to add, remove, update, and retrieve features from the map.
 * @returns {Object} Returns the Features object.
 * @throws {Error} Throws an error if no map object is provided.
 */
const Features = function () {
    const geoflo = this.geoflo;
    if (!geoflo.map) { throw new Error('No map object provided!') }

    const coldFeatures = [];
    this.offsetLines = false;

    
	/**
	 * @function
     * @memberof module:geoflo.Features
	 * @name getFeatures
	 * @description This function returns an array of cold features.
	 * @return {Array} An array of cold features.
	 */
    this.getFeatures = function () {
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

        if (!geoflo.options.units || !geoflo.options.units[type]) return false;

        return geoflo.options.units[type];
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
            if (geoflo.hotFeature && geoflo.hotFeature.id === id) return;
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
            console.log(feature, state)
            geoflo.map.setFeatureState({ source: feature.source, id: id }, state);
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
    this.setText = function (features=[]) {
        if (!geoflo.options.showFeatureText) return false;

        var source = geoflo.statics.constants.sources.HOTTEXT;

        this.textFeatures = [];

        if (features.features) features = features.features;
        if (!Array.isArray(features)) features = [features];

        features.forEach(function (feature) {
            var type = feature.properties.type;
            if (!type) return;

            this.currentType = type;

            if (type === 'Polyline' && geoflo.Utilities.isValidLineString(feature) && geoflo.options.showLineUnits) {
                turf.segmentEach(feature, setLineText.bind(this));
            } else {
                source = geoflo.statics.constants.sources.SELECT;
                var feat = geoflo.Utilities.cloneDeep(feature);
                
                feat.properties = {
                    type: 'Text',
                    text: feature.properties.text,
                    style: feature.properties.style
                }
                
                this.textFeatures.push(feat);
            }
        }, this)
        
        geoflo.map.getSource(source).setData(turf.featureCollection(this.textFeatures));

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
    this.addFeature = function (feature, source, properties={}) {
        if (!feature || !feature.properties) return false;
        
        feature = turf.cleanCoords(feature);
        feature = turf.truncate(feature, { precision: 6, coordinates: 3, mutate: true });

        feature.properties = geoflo.Utilities.assignDeep(properties, feature.properties);
        feature.source = source || feature.source || feature.properties.source || geoflo.statics.constants.sources.COLD;
        
        delete feature.properties.source;
        delete feature.properties.painting;
        delete feature.properties.edit;
        delete feature.properties.new;
        delete feature.properties._selected;
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
    this.addFeatures = function (features, unselect, id) {
        var update;
        var sources = [];

        features.forEach((feature) => {
            feature.id = feature.id || feature.properties.id || URL.createObjectURL(new Blob([])).slice(-36);
            if (id && feature.id !== id) return false;

            feature.source = feature.source || feature.properties.source || geoflo.statics.constants.sources.COLD;
            feature.properties.id = feature.id;
            feature.properties.type = this.getType(feature);

            var index = coldFeatures.findIndex(function(f) { if (f.id === feature.id || f.properties.id === feature.id) return f; });

            if (index > -1) {
                this.setFeatureState(feature.id, { hidden: !unselect });
                coldFeatures[index] = feature;
                update = !unselect;
                if (unselect) delete coldFeatures[index].properties._selected;
            } else {
                update = !this.updatingFeatures;
                coldFeatures.push(feature);
            }

            if (unselect) delete feature.properties._selected;
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
    this.updateFeatures = function(features, options={}) {
        features = features || [geoflo.getDrawnFeatures(), geoflo.getSelectedFeatures()].flat();

        var sources = [];
        var selectedFeatures = geoflo.getSelectedFeatures();
        var coords = options.coords || null;

        this.updatingFeatures = true;

        features.forEach(function(feature) {
            var id = feature.id || feature.properties.id;
            if (!id) return false;

            var originalFeature = this.getFeatureById(id);
            if (!originalFeature || originalFeature === undefined) return this.addFeature(feature);

            var selected = selectedFeatures.find((feature) => { return feature.id === id || feature.properties.id === id });

            if (selected && !geoflo.noSelect) {
                selected.geometry.coordinates = feature.geometry.coordinates;
                selected.properties = feature.properties;
                selected.properties._selected = true;
                geoflo.map.getSource(geoflo.statics.constants.sources.SELECT).setData(turf.featureCollection(selectedFeatures));
                geoflo.map.getSource(geoflo.statics.constants.sources.VERTEX).setData(turf.featureCollection(selectedFeatures));
                return true;
            } else if (!sources.includes(originalFeature.source)) {
                sources.push(originalFeature.source);
            }
            
            if (options.type === 'pinning' && coords) {
                originalFeature.geometry.type === 'Point' ? originalFeature.geometry.coordinates = coords :
                originalFeature.geometry.type === 'Polygon' && coords ? originalFeature.geometry.coordinates[0][feature.index] = coords :
                originalFeature.geometry.type === 'LineString' && coords ? originalFeature.geometry.coordinates[feature.index] = coords :
                false;
            } else {
                originalFeature.geometry.coordinates = feature.geometry.coordinates;
                originalFeature.properties = feature.properties;
            }

            options.addUnits ? this.addUnits(originalFeature) : false;
        }, this);

        this.updatingFeatures = false;

        if (!sources.length) return false;
        return this.updateSource(sources);
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
                    sources = removedFeatures.map((feature) => { return feature.source });
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
        if (!feature) return 0;
        
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
        feature = feature || geoflo.getSelectedFeatures().find((feature) => { return feature.id === id || feature.properties.id === id });
        return feature;
    };

    function getFeaturesByParent (id) {
        var feature = typeof id === 'object' && id.id ? id : getFeatureById(id);
        if (!feature || !feature.source || !geoflo.map.getSource(feature.source) || !geoflo.map.getSource(feature.source)._data) return [];
        var field = geoflo.options.offsetOverlappingLines ? 'parent' : 'id';
        var features = geoflo.map.getSource(feature.source)._data.features.filter(function(f) { return f[field] === id || f.properties[field] === id });
        return features;
    };

    function createTextFeatures (feature) {
        var isLine = geoflo.Utilities.isValidLineString(feature);
        var segments = [];

        if (isLine) {
            turf.segmentEach(feature, function (currentSegment) {
                var segment = geoflo.Utilities.cloneDeep(currentSegment);
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
        var textSource = geoflo.map.getSource(geoflo.statics.constants.sources.COLDTEXT);
        var coldSource = geoflo.map.getSource(geoflo.statics.constants.sources.COLD);

        geoflo.updatingSource = true;

        textSource ? textSource.setData(turf.featureCollection([])) : false;
        coldSource ? coldSource.setData(turf.featureCollection([])) : false;

        geoflo.map.getSource(geoflo.statics.constants.sources.SELECT).setData(turf.featureCollection([]));

        coldFeatures.forEach((feature) => {
            delete feature.properties.new;
            delete feature.properties.offset;

            var source = feature.source;
            if (sources.length && !sources.includes(source)) return;
            if (!source) return unsourceFeatures.push(feature);
            if (!sourceFeatures[source]) sourceFeatures[source] = [];
            sourceFeatures[source].push(feature);
        })

        if (!coldFeatures.length) {
            geoflo.Layers.getCustomLayers().forEach((layer) => {
                if (!layer.details || !layer.details.source) return;
                var source = layer.details.source;
                if (!geoflo.map.getSource(source)) return false;
                geoflo.map.getSource(source).setData(turf.featureCollection([]));
            })
        }

        Object.entries(sourceFeatures).forEach((entry) => {
            var source = entry[0];
            var features = entry[1];
            if (!geoflo.map.getSource(source)) return unsourceFeatures.push(features);
            setLineOffset(features, source);
        })

        setLineOffset(unsourceFeatures.flat(), geoflo.statics.constants.sources.COLD);
        setTimeout(() => {this.setFeaturesState(coldFeatures, { hidden: false }); }, 100);
        geoflo.fire('features.update', { features: coldFeatures });
        sourceFeatures = null;
        unsourceFeatures = null;
        geoflo.updatingSource = false;
        return coldFeatures;
    };

    function setLineText (segment) {
        segment = geoflo.Utilities.cloneDeep(segment);
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
        if (!features || !features.length || !source || !geoflo.map.getSource(source)) return false;
        if (!geoflo.options.offsetOverlappingLines) return geoflo.map.getSource(source).setData(turf.featureCollection(features));

        var mesh = new geoflo.Mesh(features, true);
        var offset = mesh.getFeatures();

        offset.forEach(function (feature) {
            var f = features.find(function (fe) { return fe.id === feature.parent });
            if (!f) return;
            feature.source = source;
            feature.properties.style = f.properties.style || feature.properties.style;
            setOverlapOffset(offset, feature)
        });

        geoflo.map.getSource(source).setData(turf.featureCollection(offset));
        geoflo.fire('features.offset', { features: features, offset: offset, source: source });

        mesh = null;
        offset = null;
    };

    function setOverlapOffset (features, feature) {
        if (!geoflo.options.offsetOverlappingLines) return false;
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
        if (!geoflo.options.offsetOverlappingLines) return false;

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
        let type = geoflo.Layers.getLayerType(feature.source);
        return turf.getType(feature) === 'LineString';
    };

    function isPolygon (feature) {
        if (!feature) return false;
        let type = geoflo.Layers.getLayerType(feature.source);
        return turf.getType(feature) === 'Polygon' || feature.properties.type === 'Polygon' || type === 'Polygon';
    };

    function isRectangle (feature) {
        if (!feature) return false;
        let type = geoflo.Layers.getLayerType(feature.source);
        return turf.getType(feature) === 'Polygon' && feature.properties.type === 'Rectangle' || type === 'Rectangle';
    };

    function isPoint (feature) {
        if (!feature) return false;
        let type = geoflo.Layers.getLayerType(feature.source);
        if (turf.getType(feature) === 'Point' && (!feature.properties.type || feature.properties.type === 'Circle')) return true;
        if (turf.getType(feature) === 'Point' && (type === 'Point' || type === 'Circle')) return true;
        return turf.getType(feature) === 'Point' && (feature.properties.type !== 'Text' && feature.properties.type !== 'Icon' && feature.properties.type !== 'Image');
    };

    function isText (feature) {
        if (!feature) return false;
        let type = geoflo.Layers.getLayerType(feature.source);
        if (type === 'Text') return true;
        return turf.getType(feature) === 'Point' && feature.properties.type === 'Text';
    };

    function isIcon (feature) {
        if (!feature) return false;
        let type = geoflo.Layers.getLayerType(feature.source);
        if (type === 'Icon') return true;
        return turf.getType(feature) === 'Point' && feature.properties.type === 'Icon';
    };

    function isImage (feature) {
        if (!feature) return false;
        let type = geoflo.Layers.getLayerType(feature.source);
        if (type === 'Image') return true;
        return turf.getType(feature) === 'Point' && feature.properties.type === 'Image';
    };

    function getType (feature) {
        if (!feature) return null;
        
        return isRectangle(feature) ? 'Rectangle' :
        isPolygon(feature) ? 'Polygon' :
        isPolyline(feature) ? 'Polyline' :
        isText(feature) ? 'Text' :
        isIcon(feature) ? 'Icon' :
        isImage(feature) ? 'Image' :
        isPoint(feature) ? 'Circle' :
        null;
    };
};

export default Features;