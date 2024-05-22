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

        setTimeout(function() { ctx.Layers.moveLayers(); }, 250);
        setTimeout(function() { ctx.zoomToFeatures(ctx.getRenderedDrawnFeatures()); }, 350);
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
        return await buildLayers.call(this, layers, options);
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
        if (type && type === 'Point' && !options.noCluster) { opts = Object.assign(opts, { cluster: true, clusterMaxZoom: options.clusterMaxZoom || 14, clusterRadius: options.clusterRadius || 50 }) }

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
        layers.forEach(function (layer) { if (ctx.map.getLayer(layer.id)) ctx.map.moveLayer(layer.id) })
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
        var layers = layer.layers || [];
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
        
        layers = layers.length ? layers :
        type === 'Polygon' ? buildPolygon.call(this, source, details, layerTypes[type], options) :
        type === 'Polyline' ? buildPolyline.call(this, source, details, layerTypes[type], options) :
        type === 'Point' ? buildPoint.call(this, source, details, layerTypes[type], options) : [];

        this.removeLayers(layers);
        this.removeSource(source);
        this.addSource(source, type, options);
        this.addLayers(layers, metadata);

        removeLayer.call(this, { layer: details.id, source: source });

        this._layers.push({ id: details.id, details: details, layers: layers, options: options });
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
                        'circle-radius': 10,
                        'circle-stroke-width': 2,
                        'circle-color': ['get', 'secondaryColor', ['get','style', ['properties']]],
                        'circle-stroke-color': ['get', 'primaryColor', ['get','style', ['properties']]],
                        'circle-opacity': ['case', ["boolean", ["feature-state", "hidden"], true], 0, 1],
                        'circle-stroke-opacity': ['case', ["boolean", ["feature-state", "hidden"], true], 0, 1]
                    }
                }

                if (type.includes('cluster') && !options.noCluster) {
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
                        'text-rotate': ['get', 'rotate', ['get','style', ['properties']]],
                        'text-rotation-alignment': 'map',
                        'text-size': 20,
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

                if (type.includes('cluster') && !options.noCluster) {
                    style.filter = ['has', 'point_count'];
                    style.layout['text-field'] = options.primaryIcon || '';
                    style.paint['text-halo-color'] = options.secondaryColor || ctx.options.colors.secondaryCold;
                    style.paint['text-color'] = options.primaryColor || ctx.options.colors.secondaryText;
                } else if (type.includes('count') && !options.noCluster) {
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
                if (type.includes('count') && !options.noCluster) {
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
};

export { Layers as default }