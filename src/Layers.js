/**
 * @mixin
 * @memberof module:geoflo
 * @name Layers
 * @description This module provides the layer functionality for the Geoflo application.
 *              Refactored to use ES6 Maps for caching and optimized for performance.
 * @param {Object} options - The options object to configure the object.
 * @returns {Object} Returns the Layers object.
 */
const Layers = function () {
    const geoflo = this.geoflo;
    if (!geoflo.map) throw new Error('No map object provided!');

    const map = geoflo.map;
    const id = geoflo.id;

    const layerTypes = {
        Polygon: ['-fill', '-border'],
        Polyline: ['-line', '-dash', '-buffer'],
        Point: ['-circle', '-icon', '-cluster-circle', '-cluster-icon', '-count-icon', '-count-text'],
        Image: ['-image'],
        All: ['-fill', '-border', '-line', '-dash', '-buffer', '-circle', '-icon', '-cluster-circle', '-cluster-icon', '-count-icon', '-count-text', '-image']
    };

    this.options = {};

    // Use Maps for O(1) lookups.
    this.layersMap = new Map();
    this.customLayersMap = new Map();
    this.sourcesMap = new Map();

    /**
     * Initializes the object with provided options and refreshes it.
     */
    this.init = function (options = {}) {
        this.options = { ...this.options, ...options };

        this.defaultLayers = [
            {
                source: geoflo.statics.constants.sources.COLD,
                id: id + '-fill-cold',
                type: 'fill',
                layout: {},
                filter: ["==", "$type", "Polygon"],
                paint: {
                    'fill-color': geoflo.options.colors.secondaryCold,
                    'fill-opacity': ['case', ["boolean", ["feature-state", "hidden"], true], 0, 0.3]
                }
            },
            {
                source: geoflo.statics.constants.sources.COLD,
                id: id + '-line-cold',
                type: 'line',
                layout: { 'line-cap': 'round', 'line-join': 'miter' },
                paint: {
                    'line-color': geoflo.options.colors.primaryCold,
                    'line-width': 4,
                    'line-gap-width': ["match", ["get", "type"], "Polygon", 0, 0],
                    'line-offset': ['case', ["boolean", ["has", "offset"], true], ["get", "offset"], 0],
                    'line-opacity': ['case', ["boolean", ["feature-state", "hidden"], true], 0, 1]
                }
            },
            {
                source: geoflo.statics.constants.sources.COLD,
                id: id + '-circle-cold',
                filter: ['all', ['==', ['get', 'type'], 'Circle'], ["!=", ["geometry-type"], "Polygon"]],
                type: 'circle',
                paint: {
                    'circle-radius': { base: 6, stops: [[10, 8], [14, 10]] },
                    'circle-stroke-width': 2,
                    'circle-color': geoflo.options.colors.primaryCold,
                    'circle-stroke-color': geoflo.options.colors.secondaryCold,
                    'circle-opacity': ['case', ["boolean", ["feature-state", "hidden"], true], 0, 1],
                    'circle-stroke-opacity': ['case', ["boolean", ["feature-state", "hidden"], true], 0, 1]
                }
            },
            {
                source: geoflo.statics.constants.sources.COLD,
                id: id + '-icon-cold',
                type: 'symbol',
                filter: ['==', ['get', 'type'], 'Icon'],
                layout: {
                    visibility: 'visible',
                    'icon-optional': true,
                    'text-field': ['get', 'primaryIcon', ['get', 'style', ['properties']]],
                    'text-size': { base: 16, stops: [[10, 16], [14, 12]] },
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
                    'text-halo-color': geoflo.options.colors.primaryCold,
                    'text-color': geoflo.options.colors.secondaryBackground,
                    'text-opacity': ['case', ["boolean", ["feature-state", "hidden"], true], 0, 1]
                }
            },
            {
                source: geoflo.statics.constants.sources.COLD,
                id: id + '-text-cold',
                type: 'symbol',
                filter: ["==", "$type", "Point"],
                layout: {
                    "symbol-placement": "point",
                    'text-field': ['get', 'text'],
                    'text-font': ['DIN Pro Regular', 'DIN Pro Italic', 'Arial Unicode MS Regular', 'DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
                    'text-keep-upright': true,
                    'text-size': 18,
                    'text-justify': ['get', 'justify'],
                    'text-letter-spacing': 0.05,
                    'text-line-height': 1.2,
                    'text-max-angle': 10,
                    'text-offset': [0, 0],
                    'text-padding': 2,
                    'text-rotate': 0,
                    'text-transform': ['get', 'transform']
                },
                paint: {
                    'text-color': geoflo.options.colors.primaryCold,
                    'text-halo-color': geoflo.options.colors.primaryBackground,
                    'text-halo-width': 0.5,
                    'text-opacity': ['case', ["boolean", ["feature-state", "hidden"], true], 0, 1]
                }
            },
            {
                source: geoflo.statics.constants.sources.COLD,
                id: id + '-text-icon-cold',
                type: 'symbol',
                filter: ['==', ['get', 'type'], 'Text'],
                layout: {
                    visibility: 'visible',
                    'icon-optional': true,
                    'text-field': ['get', 'primaryIcon', ['get', 'style', ['properties']]],
                    'text-size': { base: 16, stops: [[10, 16], [14, 12]] },
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
                    'text-halo-color': geoflo.options.colors.primaryCold,
                    'text-color': geoflo.options.colors.secondaryBackground,
                    'text-opacity': ['case', ["boolean", ["feature-state", "hidden"], true], 0, 1]
                }
            },
            {
                id: geoflo.statics.constants.layers.MESH + '-line',
                source: geoflo.statics.constants.sources.MESH,
                type: "line",
                paint: {
                    "line-color": geoflo.options.colors.primaryBase,
                    "line-width": 2,
                    "line-opacity": 0.3
                }
            },
            {
                id: geoflo.statics.constants.layers.MESH + '-circle',
                source: geoflo.statics.constants.sources.MESH,
                type: 'circle',
                paint: {
                    'circle-radius': 2,
                    'circle-color': geoflo.options.colors.primaryBase,
                    'circle-opacity': 0.3
                }
            },
            // ... (other default layers continue)
        ];

        this.selectLayers = [
            {
                source: geoflo.statics.constants.sources.SELECT,
                id: id + '-line-select-background',
                type: 'line',
                layout: { visibility: 'visible', 'line-cap': 'round', 'line-join': 'round' },
                paint: { 'line-color': geoflo.options.colors.primarySelect, 'line-width': 6, 'line-opacity': 0.4 },
                metadata: { types: ['Polyline', 'Polygon', 'Rectangle'] }
            },
            {
                source: geoflo.statics.constants.sources.SELECT,
                id: id + '-line-select',
                type: 'line',
                layout: { visibility: 'visible', 'line-cap': 'round', 'line-join': 'round' },
                paint: { 'line-color': geoflo.options.colors.secondarySelect, 'line-width': 6, 'line-dasharray': [0, 4, 3] },
                metadata: { types: ['Polyline', 'Polygon', 'Rectangle'] }
            },
            {
                source: geoflo.statics.constants.sources.SELECT,
                id: id + '-fill-select',
                type: 'fill',
                layout: {},
                filter: ["==", "$type", "Polygon"],
                paint: { 'fill-color': geoflo.options.colors.primarySelect, 'fill-opacity': 0.4 },
                metadata: { types: ['Polygon', 'Rectangle'] }
            },
            {
                source: geoflo.statics.constants.sources.SELECT,
                id: id + '-point-select',
                filter: ['all', ['!=', ['get', 'type'], 'Text'], ["==", ["geometry-type"], "Point"]],
                type: 'circle',
                layout: { visibility: 'visible' },
                paint: {
                    'circle-radius': 10,
                    'circle-stroke-width': 3,
                    'circle-color': geoflo.options.colors.primarySelect,
                    'circle-stroke-color': geoflo.options.colors.secondarySelect,
                    'circle-stroke-opacity': 1,
                    'circle-opacity': 0.8
                },
                metadata: { types: ['Point', 'Circle', 'Marker', 'Icon'] }
            },
            {
                source: geoflo.statics.constants.sources.SELECT,
                id: id + '-symbol-select',
                filter: ['==', ['get', 'type'], 'Icon'],
                type: 'symbol',
                layout: {
                    visibility: 'visible',
                    'icon-optional': true,
                    'symbol-placement': 'point',
                    'text-rotation-alignment': 'viewport',
                    'text-field': ['get', 'primaryIcon', ['get', 'style', ['properties']]],
                    'text-rotate': ['get', 'rotate', ['get', 'style', ['properties']]],
                    'text-size': 14,
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
                    'text-halo-color': geoflo.options.colors.secondarySelect,
                    'text-halo-width': 2,
                    'text-color': geoflo.options.colors.primaryBackground
                },
                metadata: { types: ['Icon'] }
            },
            {
                source: geoflo.statics.constants.sources.SELECT,
                id: id + '-text-point-select',
                filter: ['==', ['get', 'type'], 'Text'],
                type: 'circle',
                layout: { visibility: 'visible' },
                paint: {
                    'circle-radius': 4,
                    'circle-stroke-width': 1,
                    'circle-color': geoflo.options.colors.primaryColor,
                    'circle-stroke-color': geoflo.options.colors.primaryBackground,
                    'circle-stroke-opacity': 1,
                    'circle-opacity': 1
                },
                metadata: { types: ['Text'] }
            },
            {
                source: geoflo.statics.constants.sources.SELECT,
                id: id + '-text-select',
                filter: ['==', ['get', 'type'], 'Text'],
                type: 'symbol',
                layout: {
                    visibility: 'visible',
                    "symbol-placement": "point",
                    'text-rotation-alignment': 'viewport',
                    'text-field': ['get', 'text'],
                    'text-font': ['DIN Pro Regular', 'DIN Pro Italic', 'Arial Unicode MS Regular', 'DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
                    'text-keep-upright': true,
                    'text-allow-overlap': true,
                    'text-size': 18,
                    'text-justify': ['get', 'justify'],
                    'text-letter-spacing': 0.13,
                    'text-line-height': 1.2,
                    'text-max-angle': 10,
                    'text-offset': [0, -1],
                    'text-padding': 2,
                    'text-rotate': 0,
                    'text-transform': ['get', 'transform']
                },
                paint: {
                    'text-color': geoflo.options.colors.primaryColor,
                    'text-halo-color': geoflo.options.colors.primaryBackground,
                    'text-halo-width': 2,
                    'text-opacity': 1
                },
                metadata: { types: ['Text'] }
            },
            {
                source: geoflo.statics.constants.sources.SELECT,
                id: id + '-image-select',
                filter: ['==', ['get', 'type'], 'Image'],
                type: 'symbol',
                layout: {
                    visibility: 'visible',
                    'icon-image': ['get', 'primaryImage', ['get', 'style', ['properties']]],
                    'icon-size': ['interpolate', ['linear'], ['zoom'], 1, 0.4, 15, 1],
                    'icon-allow-overlap': true,
                    'icon-anchor': 'bottom'
                },
                metadata: { types: ['Image'] }
            }
        ];

        return this.refresh({ init: true });
    };

    /**
     * Refreshes the map by removing and re-adding layers and sources.
     */
    this.refresh = async (options = {}) => {
        if (options.select) {
            // Instead of referencing a non-existent selectLayersMap, use the selectLayers array.
            const selectIds = this.selectLayers.map(layer => layer.id);
            const selectLayers = selectIds
                .map(id => this.layersMap.get(id))
                .filter(Boolean);
            this.moveLayers(selectLayers);
            return selectLayers;
        }
        if (!options.init) return this.init(options);

        // Backup current custom layers and then clear them.
        const customLayersBackup = Array.from(this.customLayersMap.values());

        this.removeEventListeners();
        this.removeCustomLayers();
        // Remove default and select layers (provided as an array of IDs)
        this.removeLayers(this.defaultLayers.map(l => l.id));
        this.removeLayers(this.selectLayers.map(l => l.id));

        // Remove and then re-add all sources.
        const allSources = Object.values(geoflo.statics.constants.sources);
        this.removeSources(allSources);
        this.addSources(allSources);

        // Add default layers.
        this.addLayers(this.defaultLayers, this.options);

        // Re-add custom layers, if any.
        if (customLayersBackup.length) await this.setCustomLayers(customLayersBackup, this.options);

        // Add select layers.
        this.addLayers(this.selectLayers, this.options);
        await this.refresh({ select: true });
        this.addEventListeners();

        return this.getLayers();
    };



    this.addEventListeners = (options = {}) => buildEvents.call(this, { on: true, ...options });

    this.removeEventListeners = (options = {}) => buildEvents.call(this, { off: true, ...options });

    this.hasCustomLayers = () => this.customLayersMap.size;



    this.getCustomLayers = () => Array.from(this.customLayersMap.values());

    this.getCustomLayer = (id) => (id ? this.customLayersMap.get(id) : false);

    this.getSources = () => Array.from(this.sourcesMap.values());

    this.getSource = (id) => (id ? this.sourcesMap.get(id) : false);

    this.getSourceIds = () => Array.from(this.sourcesMap.keys());

    this.getLayers = () => Array.from(this.layersMap.values());

    this.getLayer = (id, custom = false) => id ? (custom ? this.customLayersMap.get(id) : this.layersMap.get(id)) : false;

    this.getLayerIds = (layers) => Array.isArray(layers) ? layers.map(l => (typeof l === 'object' ? l.id : l)) : Array.from(this.layersMap.keys());

    this.getLayerType = (id) => this.getLayer(id, true)?.details?.type || '';

    this.getLayerTypes = () => Array.from(this.layersMap.values()).map(l => l.details?.type || '');

    this.getLayerTypesBySource = (source) => Array.from(this.layersMap.values()).filter(l => l.source === source).map(l => l.details?.type || '');

    this.getLayerByType = (type) => Array.from(this.layersMap.values()).filter(l => l.details?.type === type);

    this.getLayerBySource = (source) => Array.from(this.layersMap.values()).filter(l => l.source === source);

    this.getLayerById = (id) => this.layersMap.get(id);

    this.getFeatures = (id) => this.getSource(id)?._data?.features || [];

    this.getFeature = (id) => this.getSource(id)?._data?.features?.find(f => f.id === id) || false;

    this.getSelection = (features = [], coords) => {
        if (features[0]?.properties?.cluster) {
            this.onClusterClick(features[0], coords);
            return false;
        }
        return true;
    };

    this.getType = (type) => {
        if (['Polygon', 'Rectangle'].includes(type)) return 'Polygon';
        if (['Polyline', 'LineString', 'Line'].includes(type)) return 'Polyline';
        if (['Point', 'Circle', 'Marker', 'Icon', 'Text'].includes(type)) return 'Point';
        if (type === 'Image') return 'Image';
        return false;
    };




    this.setCustomLayers = async (layers, options = {}) => {
        this.removeCustomLayers();
        if (!layers || layers.length === 0) return [];
        return await buildLayers.call(this, layers, options);
    };




    /**
     * Adds multiple sources to the map.
     */
    this.addSources = (sources = []) => {
        sources.forEach(sourceId => {
            if (!this.sourcesMap.has(sourceId)) {
                this.addSource(sourceId);
            }
        });
        geoflo.fire('sources.add', { sources: this.getSources() });
    };

    /**
     * Adds a single source to the map and caches it.
     */
    this.addSource = (id, type, options = {}) => {
        if (!id) throw new Error('No source was provided!');
        const existingSource = map.getSource(id);

        if (existingSource) {
            this.sourcesMap.set(id, this.getSource(id) || existingSource);
            return this.getSource(id);
        }
        
        let opts = {
            type: options.type || 'geojson',
            data: turf.featureCollection(options.features || []),
            promoteId: options.promoteId || 'id',
            cluster: false
        };

        if ((type === 'Point' || type === 'Image') && !options.noCluster) {
            opts = { ...opts, cluster: true, clusterMaxZoom: options.clusterMaxZoom || 14, clusterRadius: options.clusterRadius || 50 };
        }

        map.addSource(id, opts);
        const newSource = map.getSource(id);
        this.sourcesMap.set(id, newSource);
        geoflo.fire('source.add', { id, source: newSource });
        return newSource;
    };

    /**
     * Adds multiple layers to the map.
     */
    this.addLayers = (layers = [], options = {}, customLayer) => {
        requestAnimationFrame(() => {
            layers.forEach(layer => this.addLayer(layer, options));
            if (customLayer) this.customLayersMap.set(customLayer.id, customLayer);
            geoflo.fire('layers.add', { layers: this.getLayers() });
            buildEvents.call(this);
        });
        return this.getLayers();
    };

    /**
     * Adds a single layer to the map.
     */
    this.addLayer = (layer, options = {}) => {
        if (!layer || !layer.id) return false;
        layer.metadata = layer.metadata || options;
        if (map.getLayer(layer.id)) {
            if (!this.layersMap.has(layer.id)) this.layersMap.set(layer.id, layer);
            return this.getLayer(layer.id);
        }
        map.addLayer(layer);
        this.layersMap.set(layer.id, layer);
        geoflo.fire('layer.add', { id: layer.id, layer });
        return layer;
    };

    /**
     * Adds text layers for labeling.
     * (Currently disabled – remove the "return;" to enable.)
     */
    this.addTextLayer = (options = {}) => {
        return; // Disabled for now.
        const layers = options.select
            ? this.getLayer(geoflo.statics.constants.sources.SELECT)
            : this.getCustomLayers();
        const field = options.field || 'text';

        this.removeTextLayer(options);

        layers.forEach(layer => {
            const id = `${layer.id}-Text`;
            let filter = ['all', ['==', ["geometry-type"], 'Point'], ["has", field]];
            if (options.filter) filter = options.filter;
            if (!options.select && options.ids) filter = ['in', 'id', ...options.ids];

            const layout = {
                visibility: options.visibility || 'visible',
                'symbol-placement': 'point',
                'text-rotation-alignment': 'viewport',
                'text-field': ['get', field],
                'text-keep-upright': true,
                'text-allow-overlap': true,
                'text-anchor': 'top',
                'text-size': 12,
                'text-justify': 'center',
                'text-letter-spacing': 0.25,
                'text-line-height': 1.2,
                'text-max-angle': 10,
                'text-offset': [0, 0.5],
                'text-padding': 2,
                'text-rotate': 0,
                'text-transform': 'none',
                'text-font': ['Arial Unicode MS Regular', 'DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
                'text-ignore-placement': false,
                'text-max-width': 15,
                ...(layer.text?.layout || {}),
                ...(options.layout || {})
            };

            const paint = {
                'text-translate-anchor': 'viewport',
                'text-halo-color': ['get', 'primaryColor', ['get', 'style', ['properties']]],
                'text-halo-width': 1.2,
                'text-color': ['get', 'secondaryColor', ['get', 'style', ['properties']]],
                'text-opacity': ['case', ["boolean", ["feature-state", "hidden"], true], 0, ['get', 'opacity', ['get', 'style', ['properties']]]],
                ...(layer.text?.paint || {}),
                ...(options.paint || {})
            };

            const textLayer = {
                id,
                type: 'symbol',
                source: layer.source || layer.details?.source || id,
                slot: 'top',
                filter,
                layout,
                paint,
                metadata: { text: true, name: id }
            };

            if (!map.getLayer(id)) map.addLayer(textLayer);
            this.layersMap.set(id, textLayer);
        });

        this.showTextLayers = true;
    };




    /**
     * Removes sources from the map.
     */
    this.removeSources = (ids = []) => {
        ids.forEach(id => { if (this.sourcesMap.has(id)) this.removeSource(id); });
        geoflo.fire('sources.remove', { removed: true });
    };

    /**
     * Removes a single source from the map.
     */
    this.removeSource = (id) => {
        if (!id) return false;
        if (map.getSource(id)) map.removeSource(id);
        this.sourcesMap.delete(id);
        geoflo.fire('source.remove', { removed: id });
        return id;
    };

    /**
     * Removes multiple layers. Accepts an array of layer objects or IDs.
     */
    this.removeLayers = (layers) => {
        const ids = Array.isArray(layers)
            ? layers.map(l => (typeof l === 'object' ? l.id : l))
            : [];
        this.removeTextLayer();
        ids.forEach(id => this.removeLayer(id));
        geoflo.fire('layers.remove', { removed: ids });
        return ids;
    };

    /**
     * Removes a single layer from the map.
     */
    this.removeLayer = (id) => {
        if (!id) return false;
        if (map.getLayer(id)) map.removeLayer(id);
        this.layersMap.delete(id);
        this.customLayersMap.delete(id);
        geoflo.fire('layer.remove', { removed: id });
        return id;
    };

    /**
     * Removes text layers (layers with metadata.text).
     */
    this.removeTextLayer = (options = {}) => {
        for (const [id, layer] of this.layersMap.entries()) {
            if (layer.metadata && layer.metadata.text && map.getLayer(id)) {
                map.removeLayer(id);
                this.layersMap.delete(id);
            }
        }
        this.showTextLayers = false;
    };

    /**
     * Removes all custom layers.
     */
    this.removeCustomLayers = () => {
        for (const [id, layer] of this.customLayersMap.entries()) {
            this.removeLayer(id);
            this.removeSource(layer.source);
        }
        this.customLayersMap.clear();
        return true;
    };



    /**
     * Moves the specified layers on the map.
     */
    this.moveLayers = (layers) => {
        const targetLayers = layers || this.getLayers();
        targetLayers.forEach(layer => {
            if (map.getLayer(layer.id)) {
                map.moveLayer(layer.id);
            }
        });
    };

    /**
     * Handles cluster clicks by expanding clusters.
     */
    this.onClusterClick = (feature) => {
        if (!feature.source) return false;
        const source = map.getSource(feature.source);
        if (!source) return false;
        source.getClusterExpansionZoom(feature.properties.cluster_id, (err, zoom) => { if (!err) map.easeTo({ center: feature.geometry.coordinates, zoom: zoom + 2 }); });
        return false;
    };

    /**
     * Handles mouseover events for layers.
     * (Currently commented out – remove comments to enable.)
     */
    this.onLayerMouseover = function (event) {
        // Uncomment below to enable highlighting on mouseover:
        // const MapObj = app.Map;
        // if (MapObj.getActions().editing || MapObj.getActions().drawing || MapObj.getActions().viewing) return false;
        // if (app[app.ns('layer')]._importing) return false;
        // if (!event.features.length) return false;
        // MapObj.setHighlight({ clear: true, features: event.features });
    };

    /**
     * Handles mouseout events for layers.
     * (Currently commented out – remove comments to enable.)
     */
    this.onLayerMouseout = function (event) {
        // Uncomment below to enable removing highlights on mouseout:
        // const MapObj = app.Map;
        // if (MapObj.getActions().editing || MapObj.getActions().drawing || MapObj.getActions().viewing) return false;
        // if (app[app.ns('layer')]._importing) return false;
        // MapObj._removeHighlight();
    };

    // --- Helper functions for building layers ---

    async function buildLayers(layers = [], options = {}) {
        await buildText.call(this);
        if (!layers.length) return false;
        await Promise.all(layers.map(layer => buildLayer.call(this, layer, options)));
        setTimeout(() => { this.moveLayers(); }, 250);
        return this.getLayers();
    }

    async function buildLayer(layer, opts) {
        let error;
        const details = !layer.details && layer.id ? layer : layer.details || {};
        const layerOptions = layer.options || {};
        let layersArr = layer.layers || [];
        const features = layer.features || [];
        const hasFeatures = features && features.length;
        let style = layer.style || false;

        if (!details.id || !details.type) error = true;

        const type = details.type === 'ALL' ? 'ALL' : this.getType(details.type);
        if (!type) error = true;

        const metadata = { type: details.type };
        details.default ? (metadata.default = true) : (metadata.custom = true);
        if (details.name) metadata.name = details.name;

        const source = details.source || details.id;
        metadata.source = source;

        if (details.style) delete details.style;

        const settings = {
            type,
            source,
            id: details.id,
            types: layerTypes[type],
            style: style || {},
            filter: layer.filter,
            images: layer.images,
            details,
            options: layerOptions,
            layers: layersArr
        };

        if (settings.images) await addImages(settings.images);

        if (type === 'ALL') {
            const promises = Object.keys(layerTypes)
                .filter(key => key !== 'All')
                .map(async key => {
                    const layerConfig = { ...settings, type: key, types: layerTypes[key] };
                    if (key === 'Image') return buildImage.call(this, layerConfig, layerOptions);
                    else if (key === 'Polygon') return buildPolygon.call(this, layerConfig, layerOptions);
                    else if (key === 'Polyline') return buildPolyline.call(this, layerConfig, layerOptions);
                    else if (key === 'Point') return buildPoint.call(this, layerConfig, layerOptions);
                    else return [];
                });
            const results = await Promise.all(promises);
            layersArr = results.flat();
        } else {
            layersArr =
                type === 'Image'
                    ? await buildImage.call(this, settings, layerOptions)
                    : type === 'Polygon'
                        ? await buildPolygon.call(this, settings, layerOptions)
                        : type === 'Polyline'
                            ? await buildPolyline.call(this, settings, layerOptions)
                            : type === 'Point'
                                ? await buildPoint.call(this, settings, layerOptions)
                                : [];
        }

        settings.metadata = metadata;
        this.addSource(source, type, layerOptions);
        this.addLayers(layersArr, metadata, settings);

        if (hasFeatures) {
            geoflo.Features.addFeatures(features.map(feature => ({ ...feature, source })));
        }

        return new Promise((resolve, reject) => {
            if (error) return resolve(error);
            const ready = setInterval(() => {
                const feats = geoflo.Layers.getFeatures(source);
                if (hasFeatures && !feats.length) return;
                if (!map.getSource(source)) return;
                clearInterval(ready);
                resolve({ layer: settings, features: feats });
            }, 1);
        });
    }

    async function buildText() {
        return new Promise((resolve, reject) => {
            const url = 'https://docs.mapbox.com/mapbox-gl-js/assets/popup.png';
            if (map.hasImage('text-marker')) return resolve(true);
            map.loadImage(url, (error, image) => {
                if (error) return reject(error);
                if (map.hasImage('text-marker')) return resolve(image);
                map.addImage('text-marker', image, {
                    content: [25, 25, 115, 100],
                    stretchX: [[25, 115]],
                    stretchY: [[25, 100]],
                    pixelRatio: 2,
                    sdf: false
                });
                resolve(image);
            });
        });
    }

    async function buildImage(settings = {}, options = {}) {
        if (!settings.source) return [];
        const layersArr = [];
        const source = settings.source;
        for (const type of settings.types) {
            let style = settings.style;
            const id = settings.id + type;
            let layout = {
                visibility: options.visibility || 'visible',
                'icon-image': ['get', 'primaryImage', ['get', 'style', ['properties']]],
                'icon-size': ['interpolate', ['linear'], ['zoom'], 1, 0.6, 10, 0.8, 15, 1],
                'icon-allow-overlap': true,
                'icon-anchor': 'bottom'
            };
            layout = { ...layout, ...(style.image?.layout || {}) };
            let paint = {
                'icon-opacity': ['case', ["boolean", ["feature-state", "hidden"], true], 0,
                    ['case', ["boolean", ["feature-state", "hidden"], true], 0,
                        ['get', 'opacity', ['get', 'style', ['properties']]]]]
            };
            paint = { ...paint, ...(style.image?.paint || {}) };
            style = {
                id,
                type: 'symbol',
                source,
                slot: style.slot || 'top',
                filter: settings.filter || ['==', "$type", "Point"],
                layout,
                paint
            };
            if (style.minzoom) style.minzoom = style.minzoom;
            if (style.maxzoom) style.maxzoom = style.maxzoom;
            layersArr.push(style);
        }
        return layersArr;
    }

    async function buildPolygon(settings = {}, options = {}) {
        if (!settings.source) return [];
        const layersArr = [];
        const source = settings.source;
        for (const type of settings.types) {
            let style = settings.style;
            const id = settings.id + type;
            let layout, paint;
            if (type.includes('border')) {
                layout = { visibility: options.visibility || 'visible', ...((style.border && style.border.layout) || {}) };
                paint = {
                    'line-color': ['get', 'primaryColor', ['get', 'style', ['properties']]],
                    'line-width': ['case', ["boolean", ['has', 'width', ['get', 'style', ['properties']]], true],
                        ['get', 'width', ['get', 'style', ['properties']]], 2],
                    'line-opacity': ['case', ["boolean", ["feature-state", "hidden"], true], 0, 0.8],
                    ...((style.border && style.border.paint) || {})
                };
                style = {
                    id,
                    type: 'line',
                    source,
                    slot: style.slot || 'bottom',
                    filter: (style.border && style.border.filter) || ['==', "$type", "Polygon"],
                    layout,
                    paint
                };
            } else if (type.includes('fill')) {
                layout = { visibility: options.visibility || 'visible', ...((style.fill && style.fill.layout) || {}) };
                paint = {
                    'fill-color': ['get', 'secondaryColor', ['get', 'style', ['properties']]],
                    'fill-opacity': ['case', ["boolean", ["feature-state", "hidden"], true], 0, 0.5],
                    ...((style.fill && style.fill.paint) || {})
                };
                style = {
                    id,
                    type: 'fill',
                    source,
                    slot: style.slot || 'bottom',
                    filter: (style.fill && style.fill.filter) || ['==', "$type", "Polygon"],
                    layout,
                    paint
                };
            }
            if (settings.style.minzoom) style.minzoom = settings.style.minzoom;
            if (settings.style.maxzoom) style.maxzoom = settings.style.maxzoom;
            layersArr.push(style);
        }
        return layersArr;
    }

    async function buildPolyline(settings = {}, options = {}) {
        if (!settings.source) return [];
        const layersArr = [];
        const source = settings.source;
        for (const type of settings.types) {
            let style = settings.style;
            const id = settings.id + type;
            let layout, paint;
            if (type.includes('line')) {
                layout = {
                    visibility: options.visibility || 'visible',
                    'line-miter-limit': 2,
                    'line-join': 'round',
                    'line-cap': 'round',
                    ...((style.line && style.line.layout) || {})
                };
                paint = {
                    'line-color': ['get', 'primaryColor', ['get', 'style', ['properties']]],
                    'line-width': ['case', ["boolean", ['has', 'width', ['get', 'style', ['properties']]], true],
                        ['get', 'width', ['get', 'style', ['properties']]], 4],
                    'line-offset': ['case', ["boolean", ["has", "offset"], true], ["get", "offset"], 0],
                    'line-opacity': ['case', ["boolean", ["feature-state", "hidden"], true], 0, 1],
                    ...((style.line && style.line.paint) || {})
                };
                style = {
                    id,
                    type: 'line',
                    source,
                    slot: style.slot || 'middle',
                    filter: (style.line && style.line.filter) || ['==', "$type", "LineString"],
                    layout,
                    paint
                };
            }
            if (settings.style.minzoom) style.minzoom = settings.style.minzoom;
            if (settings.style.maxzoom) style.maxzoom = settings.style.maxzoom;
            layersArr.push(style);
        }
        return layersArr;
    }

    async function buildPoint(settings = {}, options = {}) {
        if (!settings.source) return [];
        const layersArr = [];
        const source = settings.source;
        const dontRender = false;

        for (const type of settings.types) {
            let style = settings.style;
            const id = settings.id + type;
            let layout, paint;

            if (type.includes('circle')) {
                if (options.noCircle) continue;
                layout = { visibility: options.visibility || 'visible', ...((style.circle && style.circle.layout) || {}) };
                paint = {
                    'circle-radius': 10,
                    'circle-stroke-width': 2,
                    'circle-color': ['get', 'secondaryColor', ['get', 'style', ['properties']]],
                    'circle-stroke-color': ['get', 'primaryColor', ['get', 'style', ['properties']]],
                    'circle-opacity': ['case', ["boolean", ["feature-state", "hidden"], true], 0,
                        ['case', ["boolean", ["feature-state", "hidden"], true], 0,
                            ['get', 'opacity', ['get', 'style', ['properties']]]]],
                    'circle-stroke-opacity': ['case', ["boolean", ["feature-state", "hidden"], true], 0,
                        ['case', ["boolean", ["feature-state", "hidden"], true], 0,
                            ['get', 'opacity', ['get', 'style', ['properties']]]]],
                    ...((style.circle && style.circle.paint) || {})
                };
                style = {
                    id,
                    type: 'circle',
                    source,
                    slot: style.slot || 'top',
                    filter: (style.circle && style.circle.filter) || ['==', "$type", "Point"],
                    layout,
                    paint
                };
                if (type.includes('cluster')) {
                    if (options.noCluster) continue;
                    style.filter = ['has', 'point_count'];
                    style.paint['circle-color'] = options.secondaryColor || geoflo.options.colors.secondaryColor;
                    style.paint['circle-stroke-color'] = options.primaryColor || geoflo.options.colors.primaryColor;
                }
            } else if (type.includes('icon')) {
                if (dontRender) continue;
                layout = {
                    visibility: options.visibility || 'visible',
                    'icon-optional': true,
                    'text-field': ['get', 'primaryIcon', ['get', 'style', ['properties']]],
                    'text-rotate': ['get', 'rotate', ['get', 'style', ['properties']]],
                    'text-rotation-alignment': 'viewport',
                    'text-size': 14,
                    'text-line-height': 1,
                    'text-padding': 0,
                    'text-offset': [0, 0.2],
                    'text-justify': 'auto',
                    'text-anchor': 'center',
                    'text-allow-overlap': true,
                    'text-font': ['Font Awesome 6 Pro Solid'],
                    'text-ignore-placement': true,
                    ...((style.icon && style.icon.layout) || {})
                };
                paint = {
                    'text-translate-anchor': 'viewport',
                    'text-halo-color': ['get', 'primaryColor', ['get', 'style', ['properties']]],
                    'text-halo-width': 0,
                    'text-color': ['get', 'primaryColor', ['get', 'style', ['properties']]],
                    'text-opacity': ['case', ["boolean", ["feature-state", "hidden"], true], 0,
                        ['case', ["boolean", ["feature-state", "hidden"], true], 0,
                            ['get', 'opacity', ['get', 'style', ['properties']]]]],
                    ...((style.icon && style.icon.paint) || {})
                };
                style = {
                    id,
                    type: 'symbol',
                    source,
                    slot: style.slot || 'top',
                    filter: (style.icon && style.icon.filter) || ['==', "$type", "Point"],
                    layout,
                    paint
                };
                if (type.includes('cluster')) {
                    if (options.noCluster) continue;
                    style.filter = ['has', 'point_count'];
                    style.layout['text-field'] = options.primaryIcon || '';
                    style.paint['text-halo-color'] = options.secondaryColor || geoflo.options.colors.secondaryCold;
                    style.paint['text-color'] = options.primaryColor || geoflo.options.colors.secondaryText;
                } else if (type.includes('count')) {
                    if (options.noCluster) continue;
                    style.filter = ['has', 'point_count'];
                    style.layout = {
                        visibility: options.visibility || 'visible',
                        'icon-optional': true,
                        'text-field': options.countIcon || '',
                        'text-size': { base: 14, stops: [[10, 16], [14, 14]] },
                        'text-line-height': 1,
                        'text-padding': 0,
                        'text-offset': [0.5, -0.6],
                        'text-justify': 'auto',
                        'text-anchor': 'center',
                        'text-allow-overlap': true,
                        'text-font': ['Font Awesome 6 Pro Solid'],
                        'text-ignore-placement': true
                    };
                    style.paint = {
                        'text-translate-anchor': 'viewport',
                        'text-color': options.countIconColor || geoflo.options.colors.primaryText,
                        'text-opacity': ['case', ["boolean", ["feature-state", "hidden"], true], 0,
                            ['get', 'opacity', ['get', 'style', ['properties']]]]
                    };
                }
            } else if (type.includes('text')) {
                if (dontRender) continue;
                if (type.includes('count')) {
                    if (options.noCluster) continue;
                    layout = {
                        'text-field': ['get', 'point_count_abbreviated'],
                        'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
                        'text-size': { base: 14, stops: [[10, 14], [14, 12]] },
                        'text-offset': [0.55, -0.9],
                        ...((style.text && style.text.layout) || {})
                    };
                    paint = {
                        'text-color': options.countTextColor || geoflo.options.colors.secondaryText,
                        'text-opacity': ['case', ["boolean", ["feature-state", "hidden"], true], 0,
                            ['get', 'opacity', ['get', 'style', ['properties']]]],
                        ...((style.text && style.text.paint) || {})
                    };
                    style = {
                        id,
                        type: 'symbol',
                        source,
                        slot: style.slot || 'top',
                        filter: ['has', 'point_count'],
                        layout,
                        paint
                    };
                }
            }

            if (!style) continue;
            if (settings.style.minzoom) style.minzoom = settings.style.minzoom;
            if (settings.style.maxzoom) style.maxzoom = settings.style.maxzoom;
            layersArr.push(style);
        }

        return layersArr;
    }

    async function addImages(images = []) {
        for (const image of images) {
            if (!image) continue;
            if (!map.hasImage(image.id)) {
                const img = await loadImage(image);
                if (img) map.addImage(image.id, img, { pixelRatio: 2 });
            }
        }
    }

    async function loadImage(options = {}) {
        if (!options.url || !options.id) return false;
        return new Promise((resolve, reject) => {
            const url = options.url + '?' + new Date().getTime();
            map.loadImage(url, (error, image) => error ? reject(error) : resolve(image));
        });
    }

    function loadImageAsDataURL(imageUrl, callback) {
        const img = new Image();
        img.setAttribute('crossOrigin', 'anonymous');
        img.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);
            const dataURL = canvas.toDataURL("image/png");
            callback(dataURL);
        };
        img.src = imageUrl + '?' + new Date().getTime();
    }

    function createSVGMarker(options = {}) {
        const svgNS = "http://www.w3.org/2000/svg";
        const data = options.data;
        const width = options.width;
        const height = options.height;
        const borderWidth = options["stroke-width"] || 5;
        const svg = document.createElementNS(svgNS, "svg");
        svg.setAttribute("width", width);
        svg.setAttribute("height", height);
        svg.setAttribute("viewBox", `0 0 ${width + 2 * borderWidth} ${height + 2 * borderWidth}`);
        const marker = document.createElementNS(svgNS, "ellipse");
        marker.setAttribute("cx", (width + 2 * borderWidth) / 2);
        marker.setAttribute("cy", (height + 2 * borderWidth) / 2);
        marker.setAttribute("rx", width / 2);
        marker.setAttribute("ry", height / 2);
        marker.setAttribute("fill", 'transparent');
        marker.setAttribute("stroke", options.stroke || geoflo.getColors().secondaryBackground);
        marker.setAttribute("stroke-width", borderWidth);
        const image = document.createElementNS(svgNS, "image");
        image.setAttributeNS("http://www.w3.org/1999/xlink", "href", data);
        image.setAttribute("x", borderWidth);
        image.setAttribute("y", borderWidth);
        image.setAttribute("width", width);
        image.setAttribute("height", height);
        image.setAttribute("preserveAspectRatio", "xMidYMid slice");
        image.setAttribute("clip-path", "ellipse()");
        svg.appendChild(marker);
        svg.appendChild(image);
        return svg;
    }

    function svgToImage(svgElement, callback) {
        const svgData = new XMLSerializer().serializeToString(svgElement);
        const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
        const url = URL.createObjectURL(svgBlob);
        const img = new Image();
        img.onload = () => { URL.revokeObjectURL(url); callback(img); };
        img.src = url;
    }

    function buildEvents(options = {}) {
        const ids = this.getLayerIds();
        if (!ids.length) return;
        ids.forEach(id => {
            if (options.off) {
                map.off('mousemove', id, this.onLayerMouseover);
                map.off('mouseleave', id, this.onLayerMouseout);
            } else if (options.on) {
                map.on('mousemove', id, this.onLayerMouseover);
                map.on('mouseleave', id, this.onLayerMouseout);
            }
        });
    }

    this.init();
};

export default Layers;
