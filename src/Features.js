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

    this.featuresMap = new Map();

    this.getFeatures = function () {
        return Array.from(this.featuresMap.values());
    };

    this.getFeatureById = function (id) {
        if (Array.isArray(id) && id.length > 1) return this.getFeaturesById(id);
        if (typeof id === 'object') id = id.parent || id.properties.parent || id.id || id.properties.id;
        return getFeatureByIdHelper.call(this, id);
    };

    this.getFeaturesById = function (ids = []) {
        const addedIds = new Set();
        const result = [];
        ids.forEach((id) => {
            const feature = this.getFeatureById(id);
            if (feature && !addedIds.has(id)) {
                addedIds.add(id);
                result.push(feature);
            }
        });
        return result;
    };

    this.getType = function (feature) {
        return getType(feature);
    };

    this.getUnit = function (feature) {
        if (!feature) return false;
        const type = feature.properties.type;
        if (!type) return false;
        if (!geoflo.options.units || !geoflo.options.units[type]) return false;
        return geoflo.options.units[type];
    };

    this.getUnits = function (feature) {
        const unit = this.getUnit(feature);
        if (!unit || !feature) return false;
        let units = 1;
        const type = feature.properties.type;
        if (type === "Polyline") {
            units = turf.length(feature, { units: 'meters' });
        } else if (type === 'Polygon' || type === 'Rectangle') {
            units = turf.area(feature);
        }
        return units;
    };

    this.getFeatureState = function (id) {
        if (!id) return false;
        const feature = this.getFeatureById(id);
        if (!feature) return false;
        const isSelected = geoflo.getSelectedFeatures().find(f => f.id === id || f.properties.id === id);
        const source = isSelected ? geoflo.statics.constants.sources.SELECT : feature.source;
        if (!source) return false;
        return geoflo.map.getFeatureState({ source: source, id: id });
    };



    this.setFeaturesState = function (features = [], state) {
        if (!state || features.length === 0) return [];
        features.forEach((feature) => {
            const id = feature.id || feature.properties.id;
            this.setFeatureState(id, state);
        });
        return features;
    };

    this.setFeatureState = function (id, state) {
        if (!state || !id) return false;
        const features = getFeaturesByParentHelper.call(this, id);
        features.forEach((feature) => {
            const fid = feature.id || feature.properties.id;
            geoflo.map.setFeatureState({ source: feature.source, id: fid }, state);
        });
        return features;
    };

    this.setText = function (features = []) {
        if (!geoflo.options.showFeatureText) return false;

        let source = geoflo.statics.constants.sources.HOTTEXT;
        let textFeaturesArr = [];

        if (features.features) features = features.features;
        if (!Array.isArray(features)) features = [features];

        features.forEach((feature) => {
            const type = feature.properties.type;
            if (!type) return;

            this.currentType = type;

            if (type === 'Polyline' && geoflo.Utilities.isValidLineString(feature) && geoflo.options.showLineUnits) {
                turf.segmentEach(feature, setLineText.bind(this));
            }
        });

        geoflo.map.getSource(source).setData(turf.featureCollection(textFeaturesArr));
        delete this.currentType;
        return true;
    };



    this.addFeature = function (feature, source, properties = {}) {
        if (!feature) return false;

        const defaultSource = geoflo.statics.constants.sources.COLD;

        feature = turf.truncate(turf.cleanCoords(feature), { precision: 6, coordinates: 3, mutate: true });
        feature.properties = geoflo.Utilities.assignDeep(properties, feature.properties || {});
        feature.source = source || feature.source || feature.properties.source || defaultSource;

        if (!this.addingFeatures) return this.addFeatures([feature])[0];

        return feature;
    };

    this.addFeatures = function (features) {
        if (!this.addingFeatures) this.addingFeatures = true;

        const sources = new Set();
        const update = !this.updatingFeatures;
        const themeColors = geoflo.getTheme().colors;
        const defaultSource = geoflo.statics.constants.sources.COLD;

        const cleanedFeatures = features.map((feature) => {
            if (!feature) return null;

            feature.id = feature.id || feature.properties?.id || crypto.randomUUID();
            feature.source = feature.source || feature.properties?.source || defaultSource;

            feature.properties = {
                ...feature.properties,
                id: feature.id,
                type: this.getType(feature),
                style: { ...themeColors, ...feature.properties?.style }
            };

            feature.geometry.unit = this.getUnit(feature);
            feature.geometry.units = this.convertUnits(feature, null, feature.properties.unit || feature.geometry.unit);

            // Remove unnecessary properties efficiently
            ['source', 'painting', 'edit', 'new', 'hidden', 'offset'].forEach(prop => delete feature.properties[prop]);

            this.featuresMap.set(feature.id, feature);
            sources.add(feature.source);

            return feature;
        }).filter(Boolean); // Remove nulls if any invalid features were skipped

        if (update) this.updateSource([...sources]);
        this.addingFeatures = false;

        return cleanedFeatures;
    };

    this.addUnits = function (feature, convertTo) {
        const unit = convertTo || this.getUnit(feature);
        if (!unit) return false;
        const units = this.convertUnits(feature, null, convertTo);
        feature.geometry.units = units;
        feature.geometry.unit = unit;
        return feature;
    };



    this.isFeatureHidden = function (id) {
        if (!id) return false;
        var state = this.getFeatureState(id);
        return state.hidden;
    }



    this.updateFeatures = function (features, options = {}) {
        features = features || [].concat(geoflo.getDrawnFeatures(), geoflo.getSelectedFeatures());
        
        const sources = new Set();
        this.updatingFeatures = true;

        features.forEach((feature) => {
            const id = feature.id || feature.properties.id;
            if (!id) return;
            const originalFeature = this.getFeatureById(id);
            if (!originalFeature) return this.addFeature(feature);
            sources.add(originalFeature.source);
            originalFeature.geometry.coordinates = feature.geometry.coordinates;
            originalFeature.properties = feature.properties;
            if (options.addUnits) this.addUnits(originalFeature);
        });

        if (sources.size > 0) requestAnimationFrame(() => { this.updateSource(Array.from(sources)); });
        this.updatingFeatures = false;
    };

    this.updateSource = function (sources = []) {
        if (this._updateSourceTimeout) clearTimeout(this._updateSourceTimeout);

        geoflo.updatingSource = true;

        const textSource = geoflo.map.getSource(geoflo.statics.constants.sources.COLDTEXT);
        const coldSource = geoflo.map.getSource(geoflo.statics.constants.sources.COLD);
        const selectedSource = geoflo.map.getSource(geoflo.statics.constants.sources.SELECT);

        this._updateSourceTimeout = setTimeout(() => {
            const sourceFeatures = {};
            const unsourceFeatures = [];

            textSource.setData(turf.featureCollection([]));
            coldSource.setData(turf.featureCollection([]));
            selectedSource.setData(turf.featureCollection([]));

            // Group features by source from the featuresMap
            Array.from(this.featuresMap.values()).forEach((feature) => {
                delete feature.properties.new;
                delete feature.properties.offset;
                const src = feature.source;
                if (sources.length && !sources.includes(src)) return;
                if (!src) return unsourceFeatures.push(feature);
                if (!sourceFeatures[src]) sourceFeatures[src] = [];
                sourceFeatures[src].push(feature);
            });

            if (this.featuresMap.size === 0) {
                geoflo.Layers.getCustomLayers().forEach((layer) => {
                    if (!layer.details || !layer.details.source) return;
                    const src = layer.details.source;
                    if (!geoflo.map.getSource(src)) return;
                    geoflo.map.getSource(src).setData(turf.featureCollection([]));
                });
            }

            Object.entries(sourceFeatures).forEach(([src, features]) => {
                if (!geoflo.map.getSource(src)) return unsourceFeatures.push(features);
                setLineOffsetHelper(features, src);
            });

            setLineOffsetHelper(unsourceFeatures.flat(), geoflo.statics.constants.sources.COLD);

            setTimeout(() => {
                this.setFeaturesState(Array.from(this.featuresMap.values()), { hidden: false });
                geoflo.fire('features.update', { features: Array.from(this.featuresMap.values()) });
                geoflo.updatingSource = false;
                clearTimeout(this._updateSourceTimeout);
            }, 100);
        }, 50);

        return Array.from(this.featuresMap.values());
    }



    this.removeFeature = function (id) {
        const removedFeatures = [];
        if (!this.featuresMap.has(id)) return removedFeatures;
        const feature = this.featuresMap.get(id);
        this.featuresMap.delete(id);
        removedFeatures.push(feature);
        this.updateSource([feature.source]);
        return removedFeatures;
    };

    this.removeLayers = function (layerSources = [], options = {}) {
        if (options.reset) return this.deleteFeatures();
        const removedFeatures = [];
        this.featuresMap.forEach((feature, fid) => {
            if (layerSources.includes(feature.source)) {
                removedFeatures.push(feature);
                this.featuresMap.delete(fid);
            }
        });
        this.updateSource(Array.from(new Set(removedFeatures.map(f => f.source))));
    };



    this.deleteFeatures = function () {
        this.featuresMap.clear();
        this.updateSource();
    };

    this.convertUnits = function (feature, units, convertTo) {
        if (!feature) return 0;
        const type = feature.properties.type;
        const unit = convertTo || this.getUnit(feature);
        units = units || this.getUnits(feature);
        if (type === "Polyline") {
            units = Math.round(turf.convertLength(units, 'meters', unit));
        } else if (type === 'Polygon' || type === 'Rectangle') {
            units = Math.round(turf.convertArea(units, 'meters', unit));
        }
        units = units ? Number(units.toFixed(2)) : 0;
        return units;
    };



    function getFeatureByIdHelper(id) {
        let feature = this.featuresMap.get(id);
        if (!feature) {
            feature = geoflo.getSelectedFeatures().find(f => f.id === id || f.properties.id === id);
        }
        return feature;
    }

    function getFeaturesByParentHelper(id) {
        const feature = (typeof id === 'object' && id.id) ? id : getFeatureByIdHelper.call(this, id);
        if (!feature || !feature.source) return [];
        const sourceData = geoflo.map.getSource(feature.source)?._data;
        if (!sourceData) return [];
        const field = geoflo.options.offsetOverlappingLines ? 'parent' : 'id';
        return sourceData.features.filter(f => f[field] === id || f.properties[field] === id);
    }

    function createTextFeatures(feature) {
        const isLine = geoflo.Utilities.isValidLineString(feature);
        const segments = [];
        if (isLine) {
            turf.segmentEach(feature, function (currentSegment) {
                const segment = geoflo.Utilities.cloneDeep(currentSegment);
                let footage = Math.round(turf.length(segment, { units: 'miles' }) * 5280);
                let mileage = Number(turf.length(segment, { units: 'miles' }).toFixed(3));
                footage = Number(footage.toFixed(2));
                mileage = Number(mileage.toFixed(2));
                segment.properties.footage = footage;
                segment.properties.mileage = mileage;
                segment.properties.text = `${mileage} miles`;
                segments.push(segment);
            });
        }
        return segments;
    }

    function setLineText(segment) {
        const seg = geoflo.Utilities.cloneDeep(segment);
        seg.properties.type = this.currentType;
        const text = turf.point(seg.geometry.coordinates[1]);
        let units = this.getUnits(seg);
        const unit = 'feet';
        units = this.convertUnits(seg, units, unit);
        text.properties.units = units;
        text.properties.unit = unit;
        text.properties.text = `${units} ${unit}`;
        text.properties.transform = 'uppercase';
        text.properties.anchor = 'bottom-left';
        this.textFeatures.push(text);
        return text;
    }

    function setLineOffsetHelper(features, src) {
        if (!features || !features.length || !src || !geoflo.map.getSource(src)) return false;
        if (!geoflo.options.offsetOverlappingLines)
            return geoflo.map.getSource(src).setData(turf.featureCollection(features));
        const mesh = new geoflo.Mesh(features, true);
        const offsetFeatures = mesh.getFeatures();
        offsetFeatures.forEach((feature) => {
            const f = features.find((fe) => fe.id === feature.parent);
            if (!f) return;
            feature.source = src;
            feature.properties.style = f.properties.style || feature.properties.style;
            setOverlapOffsetHelper(offsetFeatures, feature);
        });
        geoflo.map.getSource(src).setData(turf.featureCollection(offsetFeatures));
        geoflo.fire('features.offset', { features: features, offset: offsetFeatures, source: src });
    }

    function setOverlapOffsetHelper(features, feature) {
        if (!geoflo.options.offsetOverlappingLines) return false;
        if (!isPolylineHelper(feature)) return false;
        if (feature.properties.offset) return false;
        let offset = 6;
        const overlaps = [];
        features.forEach((f) => {
            if (!isPolylineHelper(f)) return false;
            if (f.parent === feature.parent) return false;
            if (f.properties.offset) return false;
            const overlap = turf.booleanOverlap(f, feature) || turf.booleanWithin(f, feature);
            if (!overlap) return false;
            overlaps.push(f);
        });
        overlaps.forEach((f) => {
            f.properties.offset = offset;
            offset = offset * 2;
        });
    }

    function setWithinOffsetHelper(features) {
        if (!geoflo.options.offsetOverlappingLines) return false;
        const adder = 4;
        const miles = 0.00189394; // 10 Feet
        const explode = turf.explode(turf.featureCollection(features));
        if (!explode || !explode.features.length) return;
        explode.features.forEach((feature) => {
            if (feature.properties.offset) return false;
            const buffer = turf.buffer(feature, miles, { units: 'miles' });
            const within = turf.pointsWithinPolygon(explode, buffer);
            if (!within || !within.features.length) return;
            let offset = adder;
            within.features.forEach((f) => {
                if (f.properties.id === feature.properties.id || f.properties.offset) return;
                f.properties.offset = offset;
                offset = offset + adder;
            });
        });
    }

    function isPolylineHelper(feature) {
        if (!feature) return false;
        const type = geoflo.Layers.getLayerType(feature.source);
        return turf.getType(feature) === 'LineString';
    }

    function isPolygonHelper(feature) {
        if (!feature) return false;
        const type = geoflo.Layers.getLayerType(feature.source);
        return turf.getType(feature) === 'Polygon' || feature.properties.type === 'Polygon' || type === 'Polygon';
    }

    function isRectangleHelper(feature) {
        if (!feature) return false;
        const type = geoflo.Layers.getLayerType(feature.source);
        return (turf.getType(feature) === 'Polygon' && feature.properties.type === 'Rectangle') || type === 'Rectangle';
    }

    function isPointHelper(feature) {
        if (!feature) return false;
        const type = geoflo.Layers.getLayerType(feature.source);
        if (turf.getType(feature) === 'Point' && (!feature.properties.type || feature.properties.type === 'Circle')) return true;
        if (turf.getType(feature) === 'Point' && (type === 'Point' || type === 'Circle')) return true;
        return turf.getType(feature) === 'Point' && (feature.properties.type !== 'Text' && feature.properties.type !== 'Icon' && feature.properties.type !== 'Image');
    }

    function isTextHelper(feature) {
        if (!feature) return false;
        const type = geoflo.Layers.getLayerType(feature.source);
        if (type === 'Text') return true;
        return turf.getType(feature) === 'Point' && feature.properties.type === 'Text';
    }

    function isIconHelper(feature) {
        if (!feature) return false;
        const type = geoflo.Layers.getLayerType(feature.source);
        if (type === 'Icon') return true;
        return turf.getType(feature) === 'Point' && feature.properties.type === 'Icon';
    }

    function isImageHelper(feature) {
        if (!feature) return false;
        const type = geoflo.Layers.getLayerType(feature.source);
        if (type === 'Image') return true;
        return turf.getType(feature) === 'Point' && feature.properties.type === 'Image';
    }

    function getType(feature) {
        if (!feature) return null;
        return isRectangleHelper(feature) ? 'Rectangle' :
            isPolygonHelper(feature) ? 'Polygon' :
                isPolylineHelper(feature) ? 'Polyline' :
                    isTextHelper(feature) ? 'Text' :
                        isIconHelper(feature) ? 'Icon' :
                            isImageHelper(feature) ? 'Image' :
                                isPointHelper(feature) ? 'Circle' :
                                    null;
    }
};

export default Features;