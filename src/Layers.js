/**
 * @mixin
 * @memberof module:geoflo
 * @name Layers
 * @description This module provides the layer functionality for the Geoflo application. It allows users to add, remove, and manipulate layers on the map.
 * @param {Object} options - The options object to configure the object.
 * @returns {Object} Returns the Layers object.
 */

const Layers = function () {
    const geoflo = this.geoflo;
    if (!geoflo.map) throw new Error('No map object provided!');

    const Layers = this;
    const map = geoflo.map;
    const id = geoflo.id;

    const layerTypes = {
        Polygon: ['-fill', '-border'],
        Polyline: ['-line', '-dash', '-buffer'],
        Point: ['-circle', '-icon', '-cluster-circle', '-cluster-icon', '-count-icon', '-count-text'],
        Image: ['-image'],
        All: ['-fill', '-border', '-line', '-dash', '-buffer', '-circle', '-icon', '-cluster-circle', '-cluster-icon', '-count-icon', '-count-text', '-image']
    }

    this.options = {};
    this.sources = [];
    this.layers = [];
    this._layers = [];
    this._sources = [];

	/** 
	 * @function
     * @memberof module:geoflo.Layers
	 * @name init
	 * @description Initializes the object with the provided options and refreshes it.
	 * @param {Object} options - The options object to configure the object.
	 * @returns {Object} The refreshed object with the updated options.
	 */
    this.init = function (options={}) {
        this.options = Object.assign(this.options, options);

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
                layout: {
                    'line-cap': 'round',
                    'line-join': 'miter'
                },
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
                filter: ['all', ['==', ['get', 'type'], 'Circle'], ["!=", ["geometry-type"], "Polygon"] ],
                type: 'circle',
                paint: {
                    'circle-radius': { 'base': 6, 'stops': [[10, 8], [14, 10]] },
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
                    'text-offset': [0,0],
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
            {
                source: geoflo.statics.constants.sources.HOT,
                id: id + '-fill-hot',
                type: 'fill',
                layout: {},
                filter: ["==", "$type", "Polygon"],
                paint: {
                    'fill-color': geoflo.options.colors.secondaryHot,
                    'fill-opacity': ['case', ["boolean", ["has", "new"], true], 0.5, 0.1],
                }
            },
            {
                'source': geoflo.statics.constants.sources.HOT,
                'id': id + '-line-hot',
                'type': 'line',
                'layout': {
                    'line-cap': 'round',
                    'line-join': 'round'
                },
                'paint': {
                    'line-color': geoflo.options.colors.primaryHot,
                    'line-width': 4,
                    'line-dasharray': [1,2],
                }
            },
            {
                'source': geoflo.statics.constants.sources.HOT,
                'id': id + '-point-hot',
                'filter': ['==', '$type', 'Point'],
                'type': 'circle',
                //'filter': ["==", 0, ['number', ['get', 'painting']]],
                'paint': {
                    'circle-radius': ["match", ["get", "type"], "Circle", 10, 4],
                    'circle-stroke-width': 2,
                    'circle-color': geoflo.options.colors.primaryHot,
                    'circle-stroke-color': geoflo.options.colors.secondaryHot
                }
            },
            {
                source: geoflo.statics.constants.sources.HOT,
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
                    'text-halo-color': geoflo.options.colors.primaryHot,
                    'text-halo-width': 0, //[ 'case', ['boolean', ['feature-state', 'hover'], false], 0.5, 0 ],
                    'text-color': geoflo.options.colors.secondaryHot
                }
            },
            {
                source: geoflo.statics.constants.sources.HOT,
                id: id + '-image-hot',
                filter: ['==', ['get', 'type'], 'Image'],
                type: 'symbol',
                layout: {
                    'visibility': 'visible',
                    'icon-image': ['get', 'primaryImage', ['get','style', ['properties']]],
                    'icon-size': ['interpolate', ['linear'], ['zoom'], 1, 0.4, 15, 1],
                    'icon-allow-overlap': true,
                    'icon-anchor': 'bottom'
                }
            },
            {
                source: geoflo.statics.constants.sources.PIN,
                id: id + '-fill-pin',
                type: 'fill',
                layout: {},
                filter: ["==", "$type", "Polygon"],
                paint: {
                    'fill-color': geoflo.options.colors.primaryHot,
                    'fill-opacity': ['case', ["boolean", ["has", "new"], true], 0.5, 0.1],
                }
            },
            {
                'source': geoflo.statics.constants.sources.PIN,
                'id': id + '-line-pin',
                'type': 'line',
                'layout': {
                    'line-cap': 'round',
                    'line-join': 'round'
                },
                'paint': {
                    'line-color': geoflo.options.colors.primaryDebug,
                    'line-width': 4,
                    'line-dasharray': [1, 2],
                }
            },
            {
                'source': geoflo.statics.constants.sources.PIN,
                'id': id + '-point-pin',
                'filter': ['==', '$type', 'Point'],
                'type': 'circle',
                //'filter': ["==", 0, ['number', ['get', 'painting']]],
                'paint': {
                    'circle-radius': ["match", ["get", "type"], "Circle", 10, 4],
                    'circle-stroke-width': 2,
                    'circle-color': geoflo.options.colors.primaryDebug,
                    'circle-stroke-color': geoflo.options.colors.primaryHot
                }
            },
            {
                source: geoflo.statics.constants.sources.PIN,
                id: id + '-icon-pin',
                filter: ['==', ['get', 'type'], 'Icon'],
                type: 'symbol',
                layout: {
                    'visibility': 'visible',
                    'icon-optional': true,
                    'text-field': ['get', 'primaryIcon', ['get', 'style', ['properties']]],
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
                    'text-halo-color': geoflo.options.colors.primaryDebug,
                    'text-halo-width': 0, //[ 'case', ['boolean', ['feature-state', 'hover'], false], 0.5, 0 ],
                    'text-color': geoflo.options.colors.primaryHot
                }
            },
            {
                source: geoflo.statics.constants.sources.PIN,
                id: id + '-image-pin',
                filter: ['==', ['get', 'type'], 'Image'],
                type: 'symbol',
                layout: {
                    'visibility': 'visible',
                    'icon-image': ['get', 'primaryImage', ['get', 'style', ['properties']]],
                    'icon-size': ['interpolate', ['linear'], ['zoom'], 1, 0.4, 15, 1],
                    'icon-allow-overlap': true,
                    'icon-anchor': 'bottom'
                }
            },
            {
                'source': geoflo.statics.constants.sources.HOTTEXT,
                'id': id + '-text-hot',
                'type': 'symbol',
                'layout': {
                    'symbol-placement': 'point',
                    'text-field': ['get', 'text'],
                    'text-font': ['Arial Unicode MS Regular', 'DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
                    'text-keep-upright': true,
                    'text-anchor': ['get','anchor'],
                    'text-size': 18,
                    'text-justify': ['get','justify'],
                    'text-letter-spacing': 0.1,
                    'text-line-height': 1.2,
                    'text-max-angle': 10,
                    'text-offset': [0, -1.5],
                    'text-padding': 2,
                    'text-rotate': 0,
                    'text-transform': ['get', 'transform']
                },
                'paint': {
                    'text-color': geoflo.options.colors.primaryText,
                    'text-halo-color': geoflo.options.colors.primaryBackground,
                    'text-halo-width': 1,
                    'text-opacity': 1,
                }
            },
            {
                'source': geoflo.statics.constants.sources.SNAP,
                'id': id + '-point-snap',
                'type': 'circle',
                'filter': ['==', '$type', 'Point'],
                'paint': {
                    'circle-radius': ["match", ["get", "type"], "Circle", 6, "Icon", 0, 6],
                    'circle-stroke-width': 2,
                    'circle-color': geoflo.options.colors.primarySnap,
                    'circle-stroke-color': geoflo.options.colors.secondarySnap
                }
            },
            {
                source: geoflo.statics.constants.sources.SNAP,
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
                    'text-halo-color': geoflo.options.colors.primarySnap,
                    'text-halo-width': 0, //[ 'case', ['boolean', ['feature-state', 'hover'], false], 0.5, 0 ],
                    'text-color': geoflo.options.colors.secondarySnap
                }
            },
            {
                source: geoflo.statics.constants.sources.SNAP,
                id: id + '-image-snap',
                filter: ['==', ['get', 'type'], 'Image'],
                type: 'symbol',
                layout: {
                    'visibility': 'visible',
                    'icon-image': ['get', 'primaryImage', ['get','style', ['properties']]],
                    'icon-size': ['interpolate', ['linear'], ['zoom'], 1, 0.4, 15, 1],
                    'icon-allow-overlap': true,
                    'icon-anchor': 'bottom'
                }
            },
            {
                'source': geoflo.statics.constants.sources.SNAP,
                'id': id + '-line-snap',
                'type': 'line',
                //'filter': ["==", "$type", "LineString"],
                'layout': {
                    'visibility': 'visible',
                    'line-cap': 'round',
                    'line-join': 'round'
                },
                'paint': {
                    'line-color': geoflo.options.colors.secondarySnap,
                    'line-width': 4,
                    'line-dasharray':[1,2]
                }
            },
            {
                'source': geoflo.statics.constants.sources.ROUTE,
                'id': id + '-line-route',
                'type': 'line',
                'filter': ["==", "$type", "LineString"],
                'layout': {
                    'visibility': 'visible',
                    'line-cap': 'round',
                    'line-join': 'round'
                },
                'paint': {
                    'line-color': geoflo.options.colors.error,
                    'line-width': 4,
                    'line-dasharray':[]
                }
            },
            {
                'source': geoflo.statics.constants.sources.VERTEX,
                'id': id + '-point-vertex',
                'type': 'circle',
                'filter': ['==', "$type", 'LineString'],
                'paint': {
                    'circle-radius': 4,
                    'circle-stroke-width': 3,
                    'circle-color': geoflo.options.colors.primaryVertex,
                    'circle-stroke-color': geoflo.options.colors.secondaryVertex
                }
            },
            {
                'source': geoflo.statics.constants.sources.GAMEPAD,
                'id': id + '-gamepad',
                'type': 'symbol',
                'layout': {
                    'visibility': 'visible',
                    'icon-image': 'gamepad',
                    'icon-size': 0.25
                }
            }
        ]
    
        this.selectLayers = [{
            'source': geoflo.statics.constants.sources.SELECT,
            'id': id + '-line-select-background',
            'type': 'line',
            'layout': {
                'visibility': 'visible',
                'line-cap': 'round',
                'line-join': 'round'
            },
            'paint': {
                'line-color': geoflo.options.colors.primarySelect,
                'line-width': 6,
                'line-opacity': 0.4
            },
            'metadata': { types: ['Polyline', 'Polygon', 'Rectangle'] }
        }, {
            'source': geoflo.statics.constants.sources.SELECT,
            'id': id + '-line-select',
            'type': 'line',
            'layout': {
                'visibility': 'visible',
                'line-cap': 'round',
                'line-join': 'round'
            },
            'paint': {
                'line-color': geoflo.options.colors.secondarySelect,
                'line-width': 6,
                'line-dasharray': [0, 4, 3]
            },
            'metadata': { types: ['Polyline', 'Polygon', 'Rectangle'] }
        },
        {
            'source': geoflo.statics.constants.sources.SELECT,
            'id': id + '-fill-select',
            'type': 'fill',
            'layout': {},
            'filter': ["==", "$type", "Polygon"],
            'paint': {
                'fill-color': geoflo.options.colors.primarySelect,
                'fill-opacity': 0.4
            },
            'metadata': { types: ['Polygon', 'Rectangle'] }
        },
        {
            'source': geoflo.statics.constants.sources.SELECT,
            'id': id + '-point-select',
            'filter': ['all', ['!=', ['get', 'type'], 'Text'], ["==", ["geometry-type"], "Point"] ],
            'type': 'circle',
            'layout': {
                'visibility': 'visible',
            },
            'paint': {
                'circle-radius': 10,
                'circle-stroke-width': 3,
                'circle-color': geoflo.options.colors.primarySelect,
                'circle-stroke-color': geoflo.options.colors.secondarySelect,
                'circle-stroke-opacity': 1,
                'circle-opacity': 0.8
            },
            'metadata': { types: ['Point', 'Circle', 'Marker', 'Icon'] }
        },
        {
            'source': geoflo.statics.constants.sources.SELECT,
            'id': id + '-symbol-select',
            'filter': ['==', ['get', 'type'], 'Icon'],
            'type': 'symbol',
            'layout': {
                'visibility': 'visible',
                'icon-optional': true,
                'symbol-placement': 'point',
                'text-rotation-alignment': 'viewport',
                'text-field': ['get', 'primaryIcon', ['get','style', ['properties']]],
                'text-rotate': ['get', 'rotate', ['get','style', ['properties']]],
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
            'paint': {
                'text-translate-anchor': 'viewport',
                'text-halo-color': geoflo.options.colors.secondarySelect,
                'text-halo-width': 2,
                'text-color': geoflo.options.colors.primaryBackground,
            },
            'metadata': { types: ['Icon'] }
        },
        {
            'source': geoflo.statics.constants.sources.SELECT,
            'id': id + '-text-point-select',
            'filter': ['==', ['get', 'type'], 'Text'],
            'type': 'circle',
            'layout': {
                'visibility': 'visible',
            },
            'paint': {
                'circle-radius': 4,
                'circle-stroke-width': 1,
                'circle-color': geoflo.options.colors.primaryColor,
                'circle-stroke-color': geoflo.options.colors.primaryBackground,
                'circle-stroke-opacity': 1,
                'circle-opacity': 1
            },
            'metadata': { types: ['Text'] }
        },
        {
            'source': geoflo.statics.constants.sources.SELECT,
            'id': id + '-text-select',
            'filter': ['==', ['get', 'type'], 'Text'],
            'type': 'symbol',
            'layout': {
                'visibility': 'visible',
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
            'paint': {
                'text-color': geoflo.options.colors.primaryColor,
                'text-halo-color': geoflo.options.colors.primaryBackground,
                'text-halo-width': 2,
                'text-opacity': 1,
            },
            'metadata': { types: ['Text'] }
        },
        {
            'source': geoflo.statics.constants.sources.SELECT,
            'id': id + '-image-select',
            'filter': ['==', ['get', 'type'], 'Image'],
            'type': 'symbol',
            'layout': {
                'visibility': 'visible',
                'icon-image': ['get', 'primaryImage', ['get','style', ['properties']]],
                'icon-size': ['interpolate', ['linear'], ['zoom'], 1, 0.4, 15, 1],
                'icon-allow-overlap': true,
                'icon-anchor': 'bottom'
            },
            'metadata': { types: ['Image'] }
        }]

        return this.refresh({ init: true });
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
        if (options.select) return geoflo.Layers.moveLayers(this.selectLayers);
        if (!options.init) return this.init(options);
        
        var layers = geoflo.Utilities.cloneDeep(this._layers);

        this._layers = [];
        this._sources = [];

        this.removeEventListeners();
        this.removeLayers(this.defaultLayers);
        this.removeLayers(this.selectLayers);
        this.removeSources(Object.values(geoflo.statics.constants.sources));

        this.addEventListeners();
        this.addSources(Object.values(geoflo.statics.constants.sources));
        this.addLayers(this.defaultLayers, this.options);
        await buildLayers.call(this, layers);
        this.addLayers(this.selectLayers, this.options);

        setTimeout(function() { geoflo.Layers.moveLayers(this.selectLayers); }, 250);
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
        type === 'Image' ? 'Image' :
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
    this.getLayer = function (id, custom) {
        if (!id) return false;
        var layers = custom ? this.getCustomLayers() : this.getLayers();
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
        var _layers = layers || this.getCustomLayers();
        return _layers.map(function (l) { return l.id });
    }

    this.getLayerType = function (id) {
        let type = '';
        const layer = this.getLayer(id, true);
        if (layer && layer.details) type = layer.details.type;
        return type;
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
        geoflo.fire('sources.add', { sources: this.getSources() });
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
        geoflo.fire('source.add', { id: id, source: this.getSource(id) })
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
        layers.forEach(function(layer, index) { this.addLayer(layer, options) }, this);
        geoflo.fire('layers.add', { layers: this.getLayers() });
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
        layer.metadata = layer.metadata || options;

        if (map.getLayer(layer.id)) {
            if (!this.layers.find(function(l) { return l.id === layer.id })) this.layers.push(layer);
            return this.getLayer(layer.id);
        }

        map.addLayer(layer);

        layer = map.getLayer(layer.id);
        if (!layer) return console.error(id, 'Layer Not Added!');

        this.layers.push(layer);
        geoflo.fire('layer.add', { id: layer.id, layer: this.getLayer(layer.id) });
        return this.getLayer(layer.id);
    }

    this.addTextLayer = function (options={}) {
        var layers = options.select ? this.getLayer(geoflo.statics.constants.sources.SELECT) : this.getCustomLayers();
        var field = options.field || 'text';

        this.removeTextLayer(options);

        layers.forEach(function(layer) {
            var id = layer.id + '-Text';

            var filter = ['all', ['==', ["geometry-type"], 'Point'], ["has", field] ];
            if (options.filter) filter = options.filter;
            if (!options.select && options.ids) filter = ['in', 'id', ...options.ids];

            var layout = Object.assign({}, {
                'visibility': 'visible',
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
                'text-max-width': 15
            }, layer.text ? layer.text.layout || {} : {}, options.layout);

            var paint = Object.assign({}, {
                'text-translate-anchor': 'viewport',
                'text-halo-color': ['get', 'primaryColor', ['get','style', ['properties']]],
                'text-halo-width': 1.2,
                'text-color': ['get', 'secondaryColor', ['get','style', ['properties']]],
                'text-opacity': ['case', ["boolean", ["feature-state", "hidden"], true], 0, ['get', 'opacity', ['get','style', ['properties']]]]
            }, layer.text ? layer.text.paint || {} : {}, options.paint);

            var style = {
                id: id,
                type: 'symbol',
                source: layer.source || layer.details.source || id,
                slot: 'top',
                filter: filter,
                layout: layout,
                paint: paint,
                metadata: { text: true, name: id }
            }
            
            if (!map.getLayer(id)) map.addLayer(style);
            this.layers.push(map.getLayer(id));
        }, this);

        this.showTextLayers = true;
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
        geoflo.fire('sources.remove', { removed: true })
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
        
        geoflo.fire('source.remove', { removed: id });
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
        this.removeTextLayer();
        ids.forEach(function(id) { this.removeLayer(id) }, this);
        geoflo.fire('layers.remove', { removed: ids });
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

        geoflo.fire('layer.remove', { removed: id });
        return id;
    }

    this.removeTextLayer = function (options={}) {
        var layers = this.getLayers();
        layers.forEach(function(layer) { if (layer.metadata.text && map.getLayer(layer.id)) map.removeLayer(layer.id) }, this);
        this.showTextLayers = false;
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
        layers = !layers ? this.defaultLayers || [] : layers;
        layers.forEach(function (layer) { if (geoflo.map.getLayer(layer.id)) geoflo.map.moveLayer(layer.id) })
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
     * @name onClusterClick
     * @memberof module:geoflo.Layers
     * @description Handles the click event on a cluster feature, expanding the cluster if applicable.
     *
     * @param {Object} feature - The cluster feature that was clicked.
     * @returns {boolean} Returns false if the feature does not have a source; otherwise, it performs an action without returning a value.
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
     * @name onLayerMouseover
     * @memberof module:geoflo.Layers
     * @description Handles the mouseover event on a layer, highlighting the features if certain conditions are met.
     *
     * @param {Object} event - The event object containing information about the mouseover event.
     * @returns {boolean} Returns false if editing, drawing, or viewing actions are active, if the layer is importing, or if there are no features; otherwise, it highlights the features.
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
     * @name onLayerMouseout
     * @memberof module:geoflo.Layers
     * @description Handles the mouseout event for a layer, removing highlights if certain conditions are met.
     *
     * @param {Object} event - The event object associated with the mouseout event.
     * @returns {boolean} Returns false if the map is in editing, drawing, or viewing mode, or if the layer is being imported; otherwise, it returns undefined.
     */
    this.onLayerMouseout = function(event) {
        return 

        var Map = app.Map;
        if (Map.getActions().editing || Map.getActions().drawing || Map.getActions().viewing) { return false };
        if (app[app.ns('layer')]._importing) { return false }
        
        Map._removeHighlight();
    }


    this.init();


    async function buildLayers (layers=[], options={}) {
        await buildText.call(this);
        if (!layers.length) return false;
        await Promise.all(layers.map(layer => buildLayer.call(this, layer, options)));
        setTimeout(function() { geoflo.Layers.moveLayers(); }, 250);
        if (this.showTextLayers) this.addTextLayer();
        return this.getLayers();
    }

    async function buildLayer (layer, opts) {
        var details = !layer.details && layer.id ? layer : layer.details || {};
        var options = layer.options || {};
        var layers = layer.layers || [];
        var features = layer.features || [];
        var hasFeatures = features && features.length;
        var style = layer.style || false;
        var error;

        if (!details.id || !details.type) error = true;

        const type = details.type === 'ALL' ? 'ALL' : this.getType(details.type);
        if (!type) error = true;

        var metadata = { type: details.type} ;
        details.default ? metadata.default = true : metadata.custom = true;
        details.name ? metadata.name = details.name : false;

        var source = details.source || details.id;
        metadata.source = source;

        if (details.style) delete details.style;

        var settings = {
            type: type,
            source: source,
            id: details.id,
            types: layerTypes[type],
            style: style || {},
            filter: layer.filter,
            images: layer.images,
            details: details,
            options: options,
            layers: layers
        }

        if (type === 'ALL') {
            const promises = Object.keys(layerTypes).filter(key => key !== 'All').map(async key => {
                const layerConfig = { ...settings, type: key, types: layerTypes[key] };

                return key === 'Image' ? buildImage.call(this, layerConfig, options) :
                       key === 'Polygon' ? buildPolygon.call(this, layerConfig, options) :
                       key === 'Polyline' ? buildPolyline.call(this, layerConfig, options) :
                       key === 'Point' ? buildPoint.call(this, layerConfig, options) : [];
            });
    
            const results = await Promise.all(promises);
            layers = results.flat();
        } else {
            layers = type === 'Image' ? await buildImage.call(this, settings, options) :
            type === 'Polygon' ? await buildPolygon.call(this, settings, options) :
            type === 'Polyline' ? await buildPolyline.call(this, settings, options) :
            type === 'Point' ? await buildPoint.call(this, settings, options) : [];
        }
        
        this.removeLayers(layers);
        this.removeSource(source);
        this.addSource(source, type, options);
        this.addLayers(layers, metadata);

        removeLayer.call(this, { layer: details.id, source: source });

        settings.metadata = metadata;

        if (metadata.custom) {
            this._layers.push(settings);
            this._sources.push({ id: source, type: type, options: options });
        }

        if (hasFeatures) geoflo.Features.addFeatures(features);
        
        return new Promise((resolve, reject) => {
            if (error) return resolve(error);

            const ready = setInterval(() => {
                const feats = geoflo.Layers.getFeatures(metadata.source);
                if (hasFeatures && !feats.length) return;
                if (!map.getSource(metadata.source)) return;
                clearInterval(ready);
                resolve({ layer: settings, features: feats });
            }, 1);
        });
    }

    async function buildText () {
        const map = geoflo.map;

        return new Promise(async function (resolve, reject) {
            const url = 'https://docs.mapbox.com/mapbox-gl-js/assets/popup.png';

            if (map.hasImage('text-marker')) return resolve(true);

            map.loadImage(url, async function(error, image) {
                if (error) return reject(error);
                if (map.hasImage('text-marker')) return resolve(image);
                
                map.addImage('text-marker', image, {
                    content: [25, 25, 115, 100],
                    stretchX: [[25, 115]],
                    stretchY: [[25, 100]],
                    pixelRatio: 2,
                    sdf: false
                });
                
                return resolve(image);
            });
        });
    }

    async function buildImage (settings={}, options={}) {
        if (!settings.source) return [];

        var layers = [];
        var source = settings.source;

        for (var i = 0; i < settings.types.length; i++) {
            var type = settings.types[i];
            var style = settings.style;
            var id = settings.id + type;
            var layout, paint;

            if (!settings.images || !settings.images.length) continue;

            for (var j = 0; j < settings.images.length; j++) {
                var image = settings.images[j];
                if (!image) continue;

                var img = await loadImage(image);
                if (!img) continue;
                
                map.hasImage(image.id) ?
                map.updateImage(image.id, img, {pixelRatio: 2}) :
                map.addImage(image.id, img, {pixelRatio: 2});
            }

            layout = Object.assign({}, {
                'visibility': options.visibility || 'visible',
                'icon-image': ['get', 'primaryImage', ['get','style', ['properties']]],
                'icon-size': ['interpolate', ['linear'], ['zoom'], 1, 0.6, 10, 0.8, 15, 1],
                'icon-allow-overlap': true,
                'icon-anchor': 'bottom'
            }, style.image ? style.image.layout || {} : {});

            paint = Object.assign({}, {
                'icon-opacity': ['case', ["boolean", ["feature-state", "hidden"], true], 0,
                    ['case', ["boolean", ["feature-state", "hidden"], true], 0,
                    ['get', 'opacity', ['get','style', ['properties']]]]]
            }, style.image ? style.image.paint || {} : {});

            style = {
                id: id,
                type: 'symbol',
                source: source,
                slot: style.slot || 'top',
                filter: settings.filter || ['==', "$type", "Point"],
                layout: layout,
                paint: paint
            }

            if (!style) continue;
            if (settings.style.minzoom) style.minzoom = settings.style.minzoom;
            if (settings.style.maxzoom) style.maxzoom = settings.style.maxzoom;
            layers.push(style)
        }

        return layers;
    }

    async function buildPolygon (settings={}, options={}) {
        if (!settings.source) return [];

        var layers = [];
        var source = settings.source;

        for (var i = 0; i < settings.types.length; i++) {
            var type = settings.types[i];
            var style = settings.style;
            var id = settings.id + type;
            var layout, paint;

            if (type.includes('border')) {
                layout = Object.assign({}, {
                    'visibility': options.visibility || 'visible',
                }, style.border ? style.border.layout || {} : {});

                paint = Object.assign({}, {
                    'line-color': ['get', 'primaryColor', ['get','style', ['properties']]],
                    'line-width': ['case', ["boolean", ['has', 'width', ['get','style', ['properties']]], true], ['get', 'width', ['get','style', ['properties']]], 2],
                    'line-opacity': ['case', ["boolean", ["feature-state", "hidden"], true], 0, 0.8]
                }, style.border ? style.border.paint || {} : {});

                style = {
                    id: id,
                    type: 'line',
                    source: source,
                    slot: style.slot || 'bottom',
                    filter: style.border ? style.border.filter || ['==', "$type", "Polygon"] : ['==', '$type', 'Polygon'],
                    layout: layout,
                    paint: paint
                }
            } else if (type.includes('fill')) {
                layout = Object.assign({}, {
                    'visibility': options.visibility || 'visible',
                }, style.fill ? style.fill.layout || {} : {});

                paint = Object.assign({}, {
                    'fill-color': ['get', 'secondaryColor', ['get','style', ['properties']]],
                    'fill-opacity': ['case', ["boolean", ["feature-state", "hidden"], true], 0, 0.5]
                }, style.fill ? style.fill.paint || {} : {});

                style = {
                    id: id,
                    type: 'fill',
                    source: source,
                    slot: style.slot || 'bottom',
                    filter: style.fill ? style.fill.filter || ['==', "$type", "Polygon"] : ['==', '$type', 'Polygon'],
                    layout: layout,
                    paint: paint
                }
            }

            if (!style) continue;
            if (settings.style.minzoom) style.minzoom = settings.style.minzoom;
            if (settings.style.maxzoom) style.maxzoom = settings.style.maxzoom;
            layers.push(style)
        }

        return layers;
    }

    async function buildPolyline (settings={}, options={}) {
        if (!settings.source) return [];

        var layers = [];
        var source = settings.source;

        for (var i = 0; i < settings.types.length; i++) {
            var type = settings.types[i];
            var style = settings.style;
            var id = settings.id + type;
            var layout, paint;

            if (type.includes('line')) {
                layout = Object.assign({}, {
                    'visibility': options.visibility || 'visible',
                    'line-miter-limit': 2,
                    'line-join': 'round',
                    'line-cap': 'round'
                }, style.line ? style.line.layout || {} : {});

                paint = Object.assign({}, {
                    'line-color': ['get', 'primaryColor', ['get','style', ['properties']]],
                    'line-width': ['case', ["boolean", ['has', 'width', ['get','style', ['properties']]], true], ['get', 'width', ['get','style', ['properties']]], 4],
                    'line-offset': ['case', ["boolean", ["has", "offset"], true], ["get", "offset"], 0],
                    'line-opacity': ['case', ["boolean", ["feature-state", "hidden"], true], 0, 1]
                }, style.line ? style.line.paint || {} : {});

                style = {
                    id: id,
                    type: 'line',
                    source: source,
                    slot: style.slot || 'middle',
                    filter: style.line ? style.line.filter || ['==', "$type", "LineString"] : ['==', '$type', 'LineString'],
                    layout: layout,
                    paint: paint
                }
            }

            if (!style) continue;
            if (settings.style.minzoom) style.minzoom = settings.style.minzoom;
            if (settings.style.maxzoom) style.maxzoom = settings.style.maxzoom;
            layers.push(style)
        }

        return layers;
    }

    async function buildPoint (settings={}, options={}) {
        if (!settings.source) return [];

        var layers = [];
        var source = settings.source;
        var dontRender = false; //map.getStyle().imports && map.getStyle().imports.length;

        for (var i = 0; i < settings.types.length; i++) {
            var type = settings.types[i];
            var style = settings.style;
            var id = settings.id + type;
            var layout, paint;

            if (type.includes('circle')) {
                if (options.noCircle) continue;

                layout = Object.assign({}, {
                    'visibility': options.visibility || 'visible',
                }, style.circle ? style.circle.layout || {} : {});

                paint = Object.assign({}, {
                    'circle-radius': 10,
                    'circle-stroke-width': 2,
                    'circle-color': ['get', 'secondaryColor', ['get','style', ['properties']]],
                    'circle-stroke-color': ['get', 'primaryColor', ['get','style', ['properties']]],
                    'circle-opacity': ['case', ["boolean", ["feature-state", "hidden"], true], 0, ['case', ["boolean", ["feature-state", "hidden"], true], 0, ['get', 'opacity', ['get','style', ['properties']]]]],
                    'circle-stroke-opacity': ['case', ["boolean", ["feature-state", "hidden"], true], 0, ['case', ["boolean", ["feature-state", "hidden"], true], 0, ['get', 'opacity', ['get','style', ['properties']]]]]
                }, style.circle ? style.circle.paint || {} : {});

                style = {
                    id: id,
                    type: 'circle',
                    source: source,
                    slot: style.slot || 'top',
                    filter: style.circle ? style.circle.filter || ['==', "$type", "Point"] : ['==', "$type", "Point"],
                    layout: layout,
                    paint: paint
                }

                if (type.includes('cluster')) {
                    if (options.noCluster) continue;
                    style.filter = ['has', 'point_count'];
                    style.paint['circle-color'] = options.secondaryColor || geoflo.options.colors.secondaryColor;
                    style.paint['circle-stroke-color'] = options.primaryColor || geoflo.options.colors.primaryColor;
                }
            } else if (type.includes('icon')) {
                if (dontRender) continue;

                layout = Object.assign({}, {
                    'visibility': options.visibility || 'visible',
                    'icon-optional': true,
                    'text-field': ['get', 'primaryIcon', ['get','style', ['properties']]],
                    'text-rotate': ['get', 'rotate', ['get','style', ['properties']]],
                    'text-rotation-alignment': 'viewport',
                    'text-size': 14,
                    'text-line-height': 1,
                    'text-padding': 0,
                    'text-offset': [0, 0.2],
                    'text-justify': 'auto',
                    'text-anchor': 'center',
                    'text-allow-overlap': true,
                    'text-font': ['Font Awesome 6 Pro Solid'],
                    'text-ignore-placement': true
                }, style.icon ? style.icon.layout || {} : {});

                paint = Object.assign({}, {
                    'text-translate-anchor': 'viewport',
                    'text-halo-color': ['get', 'primaryColor', ['get','style', ['properties']]],
                    'text-halo-width': 0,
                    'text-color': ['get', 'primaryColor', ['get','style', ['properties']]],
                    'text-opacity': ['case', ["boolean", ["feature-state", "hidden"], true], 0, ['case', ["boolean", ["feature-state", "hidden"], true], 0, ['get', 'opacity', ['get','style', ['properties']]]]]
                }, style.icon ? style.icon.paint || {} : {});

                style = {
                    id: id,
                    type: 'symbol',
                    source: source,
                    slot: style.slot || 'top',
                    filter: style.icon ? style.icon.filter || ['==', "$type", "Point"] : ['==', "$type", "Point"],
                    layout: layout,
                    paint: paint
                }

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
                        'visibility': options.visibility || 'visible',
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
                        'text-color': options.countIconColor || geoflo.options.colors.primaryText,
                        'text-opacity': ['case', ["boolean", ["feature-state", "hidden"], true], 0, ['get', 'opacity', ['get','style', ['properties']]]]
                    }
                }
            } else if (type.includes('text')) {
                if (dontRender) continue;

                if (type.includes('count')) {
                    if (options.noCluster) continue;

                    layout = Object.assign({}, {
                        'text-field': ['get', 'point_count_abbreviated'],
                        'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
                        'text-size': {
                            'base': 14,
                            'stops': [[10, 14], [14, 12]]
                        },
                        'text-offset': [0.55, -0.9],
                    }, style.text ? style.text.layout || {} : {});
    
                    paint = Object.assign({}, {
                        'text-color': options.countTextColor || geoflo.options.colors.secondaryText,
                        'text-opacity': ['case', ["boolean", ["feature-state", "hidden"], true], 0, ['get', 'opacity', ['get','style', ['properties']]]]
                    }, style.text ? style.text.paint || {} : {});
    
                    style = {
                        id: id,
                        type: 'symbol',
                        source: source,
                        slot: style.slot || 'top',
                        filter: ['has', 'point_count'],
                        layout: layout,
                        paint: paint
                    }
                }
            }

            if (!style) continue;
            if (settings.style.minzoom) style.minzoom = settings.style.minzoom;
            if (settings.style.maxzoom) style.maxzoom = settings.style.maxzoom;
            layers.push(style)
        }

        return layers;
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

    async function loadImage (options={}) {
        if (!options.url || !options.id) return false;
        return new Promise(async function (resolve, reject) {
            const url = options.url + '?' + new Date().getTime();
            map.loadImage(url, function(error, image) { return error ? reject(error) : resolve(image); });
        });
    }

    function loadImageAsDataURL(imageUrl, callback) {
        /* loadImageAsDataURL(options.url, (data) => {
            options.data = data;
            const svgMarker = createSVGMarker(options);
            svgToImage(svgMarker, (img) => resolve(img) );
        }); */
        
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

    function createSVGMarker(options={}) {
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

        img.onload = () => { URL.revokeObjectURL(url), callback(img); };
        img.src = url;
    }
};

export default Layers;