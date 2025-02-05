import Statics from './src/Statics.js';
import Options from './src/Options.js';
import Utilities from './src/Utilities.js';
import Styles from './src/Styles.js';
import Layers from './src/Layers.js';
import Features from './src/Features.js';
import Mesh from './src/Mesh.js';
import Events from './src/Events.js';
import Select from './src/Select.js';
import Draw from './src/Draw.js';
import Locate from './src/Locate.js';
import Control from './src/Control.js';

/**
 * @module geoflo
 * @name geoflo
 * @description Represents the GeoFlo object that manages all modules.
 * @returns {Object} The GeoFlo object with various methods for managing the entire app.
 */
const GeoFlo = function () {
    const geoflo = this;
    
    this.statics = Statics;
    this.options = Options;
    this.dev = this.statics.developer;
    this.id = this.statics.id;

    this.modes = [];
    this.plugins = {};
    this.gamepads = {};
    this.enabled = false;
    this.mobile = isMobile();

    var selectedFeatures = [];
    var hiddenFeatures = [];

    this.initialize = function () {
        if (this.initialized) return this;
        window[this.id] = this;
        this.initialized = true;
        return this;
    }
    
	/**
	 * @function
     * @memberOf module:geoflo
	 * @name init
	 * @description Initializes the map component with the provided options and a callback function when ready.
     * @param {string} accessToken - The Mapbox Access Token to be used for the map component.
	 * @param {Object} [options={}] - The options object for configuring GeoFlo. This object will be assigned to geoflo.Options
	 * @param {Function} onReady - The callback function to be executed when the map is ready.
	 * @returns {Promise<Object>} A promise that resolves to the map object after initialization.
	 */
    this.init = async function (accessToken, options={}, onReady) {
        if (!accessToken) throw new Error('No Mapbox Access Token Provided!');
        if (this.isLoaded) return this;

        var onReadyReturn;

        this.license = await loadPremiumModules(options.license);

        if (this.license && this.license.name) {
            if (this.license.name === this.statics.id) {
                const host = window.location.hostname;
                if (!host.includes('geoflo.pro')) throw new Error('Invalid License Key!');
            }
        }

        delete options.license;

        this.Utilities = new Utilities();

        const id = options.container || this.options.map.container;
        if (!id) throw new Error('Element id is required in the DOM for the map!');

        await loadStylesheet("https://api.mapbox.com/mapbox-gl-js/v3.4.0/mapbox-gl.css");
        await loadScript("https://api.mapbox.com/mapbox-gl-js/v3.4.0/mapbox-gl.js");
        await loadScript("https://unpkg.com/@turf/turf@7/turf.min.js");
        await loadScript("https://api.tiles.mapbox.com/mapbox.js/plugins/leaflet-omnivore/v0.3.1/leaflet-omnivore.min.js");
        await loadScript("https://cdn.jsdelivr.net/npm/jszip@3.10.1/dist/jszip.min.js");
        await loadScript("https://api.mapbox.com/search-js/v1.0.0-beta.18/core.js");

        this.setOptions(options);
        
        var container = await ready(id);
        var style = this.options.styles.find(style => style.title === this.options.map.style).uri;

        this.isReady = container ? true : false;
        if (!this.isReady) throw new Error('Element id is required in the DOM for the map!');

        container.classList.add(this.statics.id);

        buildMapbox.call(this);

        turf.distanceToDegrees = function distanceToDegrees(distanceInKm) { return distanceInKm / 111.32; };

        this.mapbox = new mapboxgl.Map({
            accessToken: accessToken,
            container: container,
            style: style,
            center: this.options.map.center,
            zoom: this.options.map.zoom,
            hash: true,
            projection: 'mercator',
            extent: this.options.map.extent
        });

        this.viewport = document.createElement('div');
        this.viewportHeightOffset = 110;
        this.viewportWidthOffset = 20;
        this.viewportLeft = '10px';
        this.viewportBottom = '5%';
        this.noSelect = options.noSelect || false;
        this.mapbox.on('load', function (e) { onLoad(geoflo, e) });

        await loaded(this);
        await this.redraw();

        this.setViewport();
        this.setOpacity(this.options.map.opacity);

        this.fire('sdk.ready', { enabled: this.enabled, map: this.map, ready: this.isLoaded });

        if (onReady && typeof onReady === 'function') {
            if (onReady.constructor.name === 'AsyncFunction') {
                onReadyReturn = await onReady.call(this, this);
            } else {
                onReadyReturn = onReady.call(this, this);
            }
        }

        if (onReadyReturn) {
            if (!onReadyReturn.disable) {
                this.enable();
            }
        } else {
            this.enable();
        }
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

        if (this.options.controls) {
            this.controls = [];
            this.statics.controls.forEach(function (control) { this.controls.push(new Control(control)) }, this);
        }

        this.Select = new Select(this);
        this.Draw = new Draw(this);

        this.modes = [ this.Select, this.Draw ];
        this.enabled = true;

        this.setMode({ mode: this.mode, type: this.type});
        this.fire('map.enable', { enabled: this.enabled, mode: this.mode, type: this.type });
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
        this.options = Options;
        this.doubleClickZoom.enable(this.map);
        this.Layers.removeEventListeners();
        this.Events.removeEventListeners();
        this.Layers.removeLayers();
        this.removeControls();
        this.fire('map.disable', { enabled: this.enabled, mode: this.mode });
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
        console.log(this.Layers.getSources())
        this.Events.removeEventListeners();
        this.Events.addEventListeners();
        this.Features.updateSource();
        this.doubleClickZoom.disable(this.map);
        this.setViewport();
        this.map.style.glyphManager.urls[""] = `mapbox://fonts/${this.dev}/{fontstack}/{range}.pbf`
        this.fire('map.redraw', { enabled: this.enabled, mode: this.mode })
        if (this.onReady) await this.onReady(this), delete this.onReady;
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
        this.fire('map.refresh', { enabled: this.enabled, mode: this.mode })
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
        this.options = this.Utilities.assignDeep(Options, this.options || {}, options);
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
                options.mode = this.statics.constants.modes.DRAW;
                options.type = options.type || options.feature.properties.type;
                this.editing = options.feature;
            } else {
                //this.wantingToEdit = true;
                if (this.currentMode) this.currentMode.deactivate(options);
                return this.setMode();
            }
        }

        if (this.currentMode && this.currentMode.activated) this.currentMode.deactivate(options);

        this.container.classList.forEach(function(className) {
            if (className.indexOf("mouse-") !== -1) {
                classesToRemove.push(className);
            }
        });

        if (classesToRemove.length > 0) {
            var _map$container$classL;
            (_map$container$classL = this.container.classList).remove.apply(_map$container$classL, classesToRemove);
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

        if (this.license) {
            this.Snapping = new this._Snapping(this.currentMode);
            this.Pinning = new this._Pinning(this.currentMode);
            this.Routing = new this._Routing(this.currentMode);
            this.Exploring = new this._Exploring(this.currentMode);
            this.Painting = new this._Painting(this.currentMode);
        }

        this.Layers.moveLayers();
        return this.currentMode;
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

        // Need to work on this

        if (following) {

        } else if (icon) {
        
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
        var icon = options.icon || this.statics.logo.icon;
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
        this.centerMarker = new mapboxgl.Marker(this.centerMarkerIcon);
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
    this.setTheme = function (colors={}) {
        this.Control ? this.Control.setTheme(colors) : false;
    }
	
    /**
     * @function
     * @name setLayers
     * @memberof module:geoflo
     * @description Sets custom layers and optionally resets features based on the provided options.
     *
     * @param {Array} layers - An array of layers to be set.
     * @param {Object} options - An object containing options for setting layers.
     * @param {boolean} options.reset - Indicates whether to reset features before setting layers.
     * @returns {Promise} A promise that resolves when the custom layers have been set.
     * 
     * @author Solutegrate
     * @copyright 2025
     */
    this.setLayers = async function (layers=[], options={}) {
        if (options.reset) this.removeFeatures(layers, options);
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
        if (!features.length) {
            selectedFeatures = [];
        } else {
            selectedFeatures.splice(0, selectedFeatures.length, ...features);
        }

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

        var height = this.container.getBoundingClientRect().height;
        var width = this.container.getBoundingClientRect().width;

        style.height = `${Number.parseInt(height) - this.viewportHeightOffset}px`;
        style.width = `${Number.parseInt(width) - this.viewportWidthOffset}px`;

        this.Utilities.extend(this.viewport.style, style);
        this.setPadding();
        this.map.resize();
        return this.viewport;
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
	 * @name setStyle
	 * @description Sets the style of the map and returns the updated style.
	 * @param {Object} style - The style object to be applied to the map.
	 * @returns {Object} The updated style object of the map.
	 */
    this.setStyle = function (style, options) {
        if (!style) { return false };
        this.map.setStyle(style, options);
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
        this.settingExtent = true;

        var noFeatures = !features || !features.length;
        var center = options.center;
        !center && options.isPoint ? center = true : false;

        this.setViewport();
        
        if (extent) {
            this.preventDefault = true;
            features = !this.options.map.extent ? [] : [turf.polygon(this.options.map.extent)];
        } else if (noFeatures) {
            features = this.getDrawnFeatures();
        }

        var jumpTo = {
            bearing: options.bearing || this.options.map.bearing || this.map.getBearing(),
            center: this.options.map.center || this.map.getCenter(),
            zoom: options.zoom || this.options.map.zoom || this.map.getZoom(),
            pitch: options.pitch || this.options.map.pitch || this.map.getPitch()
        }

        if (!features) return this.map.jumpTo(jumpTo);
        if (!features.length) return;

        var bbox = turf.bbox(turf.featureCollection(features))

        if (center) {
            var polygon = turf.bboxPolygon(bbox);
            var centroid = turf.centroid(polygon);
            jumpTo.center = { lat: centroid.geometry.coordinates[1], lng: centroid.geometry.coordinates[0] };
            jumpTo.zoom = options.zoom || this.map.getZoom();
            jumpTo.pitch = options.pitch || this.map.getPitch();
            jumpTo.bearing = options.bearing || this.map.getBearing();
            this.map.jumpTo(jumpTo);
        } else if (bbox) {
            var settings = {
                padding: this.map.getPadding(),
                linear: true
            }

            if (options.bearing) settings.bearing = options.bearing;
            if (options.pitch) settings.pitch = options.pitch;
            if (options.maxZoom) settings.maxZoom = options.maxZoom;
            
            this.map.fitBounds(bbox, settings);
        }

        this.fire('features.zoom', { features: features, center: this.map.getCenter(), bbox: bbox });
        this.settingExtent = false;
        return this.map;
    }

    /**
     * @memberof module:geoflo
	 * @function
	 * @name setOpacity
	 * @description This function takes a numeric value and sets the opacity of specified layers on the map to that value.
	 *
	 * @param {number} value - The opacity value to set for the layers.
	 */
    this.setOpacity = function (value) {
        var opacity = this.opacity = Number(value || 1);
        var layers = this.map.getStyle().layers;

        layers.map((layer) => {
            if (!layer.id.includes('geoflo') || layer.type === 'background') {
                if (layer.metadata && layer.metadata.custom) return;
                
                if (layer.type === 'symbol')  {
                    this.map.setPaintProperty(layer.id, `icon-opacity`, opacity);
                    this.map.setPaintProperty(layer.id, `text-opacity`, opacity);
                } else {
                    this.map.setPaintProperty(layer.id, `${layer.type}-opacity`, opacity);
                }
            }
        })
    }

    /**
     * @memberof module:geoflo
     * @function
     * @name setColors
     * @description This function sets the colors for the map based on the provided object. It merges the provided colors with the existing colors and updates the theme.
     * @param {Object} colors - The colors object to set for the map.
     * @returns {Object} The updated colors object after setting the colors.
     */
    this.setColors = async function (colors={}) {
        this.options.colors = Object.assign(this.options.colors, colors);
        this.setTheme(this.options.colors);
        await this.Layers.refresh();
        this.Features.updateSource();
        return this.getColors();
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
	 * @description This function activates snapping to nearby feature. Snapping options can be set using geoflo.options.snapping
     * Fires a custom event 'snapping.activate' with the enabled status and the snapping object.
	 * @returns {Object} The activated Snapping object.
	 */
    this.activateSnapping = function () {
        if (!this.Snapping) return false;
        var button = this.getButtons('snapping');
        if (!button) return;
        button.activate();
        this.Snapping.activate();
        this.fire('snapping.activate', { enabled: true, mesh: this.meshIndex, snapping: this.Snapping })
        return this.Snapping;
    }

	/**
	 * @function
     * @memberOf module:geoflo
	 * @name activatePinning
	 * @description This function activates pinning to snapped features. Allows moving the snapped feature with the current feature.
     * Fires a custom event 'pinning.activate' with the enabled status and the pinning object.
	 * @returns {Object} The activated pinning object.
	 */
    this.activatePinning = function () {
        if (!this.Pinning) return false;
        var button = this.getButtons('pinning');
        if (!button) return;
        button.activate();
        this.activateSnapping();
        this.Pinning.activate();
        this.fire('pinning.activate', { enabled: true, pinning: this.Pinning });
        return this.Pinning;
    }

	/**
     * @function
     * @memberOf module:geoflo
	 * @description This function activates routing along drawn lines. The router will find the shortest path from start to end.
     * Fires a custom event 'routing.activate' with the enabled status and the routing object.
	 * @name activateRouting
	 * @returns {Object} The activated Routing object.
	 */
    this.activateRouting = function () {
        if (!this.Routing) return false;
        var button = this.getButtons('routing');
        if (!button) return;
        button.activate();
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
	 * @description This function activates exploring nearby streets using the OSRM Router.
     * Fires a custom event 'exploring.activate' with the enabled status and the exploring object.
	 * @returns {Object} The activated exploring object.
	 */
    this.activateExploring = function () {
        if (!this.Exploring) return false;
        var button = this.getButtons('exploring');
        if (!button) return;
        button.activate();
        this.deactivatePainting();
        this.Exploring.activate();
        this.fire('exploring.activate', { enabled: true, exploring: this.Exploring });
        return this.Exploring;
    }

	/**
	 * @function
     * @memberOf module:geoflo
	 * @name activatePainting
	 * @description This function activates painting by free-hand drawing features.
     * Fires a custom event 'painting.activate' with the enabled status and the painting object.
	 * @returns {Object} The activated Painting object.
	 */
    this.activatePainting = function () {
        if (!this.Painting) return false;
        var button = this.getButtons('painting');
        if (!button) return;
        button.activate();
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
        if (!this.Snapping) return false;
        var button = this.getButtons('snapping');
        if (!button) return;
        button.deactivate();
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
        if (!this.Pinning) return false;
        var button = this.getButtons('pinning');
        if (!button) return;
        button.deactivate();
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
        if (!this.Routing) return false;
        var button = this.getButtons('routing');
        if (!button) return;
        button.deactivate();
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
        if (!this.Exploring) return false;
        var button = this.getButtons('exploring');
        if (!button) return;
        button.deactivate();
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
        if (!this.Painting) return false;
        var button = this.getButtons('painting');
        if (!button) return;
        if (this.mobile && !this.currentMode.finished && this.currentMode.id === 'draw' && this.currentMode.type && this.currentMode.type === 'Rectangle') return;
        button.deactivate();
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
        return this.map;
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
     * @name getHotFeature
     * @memberof module:geoflo
     * @description Retrieves the hot feature being drawn or edited.
     * @returns {Object} The hot feature object.
     */
    this.getHotFeature = function () {
        return this.hotFeature;
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
        var options = { layers: [] };

        this.Layers.getLayers().forEach(function(layer) {
            if (layer.id.includes(id) && !layer.id.includes('-cold')) return;
            if (this.map.getLayer(layer.id)) options.layers.push(layer.id);
        }, this)

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

        return features && features.length ? this.Features.getFeaturesById(ids) : [];
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
        var options = { layers: [] };

        this.Layers.getLayers().forEach(function(layer) {
            if (!layer.id.includes('-mesh-')) return;
            options.layers.push(layer.id);
        })

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
	 * @returns {object} Returns the feature object if found, otherwise an empty object.
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

        return features && features.length ? this.Features.getFeaturesById(ids) : [];
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
     * @name selectFeature
     * @memberOf module:geoflo
     * @description Selects a feature by its ID and returns the selection result.
     *
     * @param {string} id - The ID of the feature to be selected.
     * @returns {boolean|Object} Returns false if the feature is not found, otherwise returns the result of the selection.
     */
    this.selectFeature = function (id) {
        var feature = this.getFeatureById(id);
        if (!feature) return false;
        var selected = this.Features.selectFeatures([feature]);
        
        return selected;
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

        feature = this.Utilities.clone(feature);

        console.log(feature, options)

        options.mode = 'edit';
        options.id = feature.id;
        options.feature = feature;
        options.type = feature.properties.type;

        this.fire('feature.edit', { feature: feature, id: feature.id });
        this.removeSelection();
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
        feature = feature || this.editing;
        return this.currentMode.deactivate({ cancel: true, standby: standby, feature: feature });
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
	 * @param {boolean} preventZoom - Flag to indicate whether to zoom to the added features.
     * @returns {Array} Returns empty Array if no features are provided, otherwise returns the drawn features.
	 */
    this.addFeatures = function (features, preventZoom) {
        if (!features) return [];
        if (features.features) features = features.features;
        if (!Array.isArray(features)) features = [features];
        if (!features.length) return [];

        this.Features.addFeatures(features);
        !preventZoom ? this.zoomToFeatures() : false;
        return this.getDrawnFeatures();
    }

	/**
	 * @function
     * @memberOf module:geoflo
	 * @name addFeaturesToSelected
	 * @description This function adds the provided features to the selected features list, updates the map sources, sets buttons and updates the text.
	 * @param {Array} features - The features to be added to the selected features list.
     * @param {Object} options - Additional options for adding features.
     * @param {boolean} options.zoom - Flag to indicate whether to zoom to the added features.
     * @param {boolean} options.center - Flag to indicate whether to center the map on the added features.
     * @param {Object} options.text - Options for adding text to the features.
     * @param {Array} [options.text.ids="selectedFeatures"] - The IDs of the features to add text to.
     * @param {string} [options.text.field="'text'"] - The field to use for the text.
     * @param {Object} [options.text.layout] - The layout options for the text.
     * @returns {Array} Returns empty Array if no features are provided.
     * @returns {Array} The selected features list after adding the provided features.
	 */
    this.addFeaturesToSelected = function (features, options={}) {
        if (!features || !features.length) return [];

        this.getSelectedFeatures().push(...features);
        this.setViewport();
        this.setButtons();
        
        this.Layers.refresh({ select: true });
        this.Features.setText(features);
        this.updateFeatures(features);

        if (options.zoom) this.zoomToFeatures(features, { center: options.center });

        if (options.text) {
            this.Layers.addTextLayer({
                select: true,
                ids: options.text.ids || this.getSelectedFeatureIds(),
                field: options.text.field || 'text',
                layout: options.text.layout || {
                    'text-transform': 'uppercase',
                    'text-size': 10,
                    'text-offset': [0, 0.5]
                }
            });
        }

        return this.getSelectedFeatures();
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
     * @name addControls
     * @description This function is responsible for adding controls.
     * @params {none} No parameters needed.
     * @returns {boolean} Returns false if no controls are available.
     */
    this.addControls = function () {
        if (!this.controls || !this.controls.length) return false;
        this.controls.forEach(function (control) { control.enable(); });
    }



	/**
	 * @description Removes the selection of features based on the provided feature ID. If no ID is provided, all selected features are deselected.
	 * @function
     * @memberOf module:geoflo
	 * @name removeSelection
	 * @param {string} id - The ID of the feature to be deselected.
	 * @returns {number} The number of features that were deselected.
	 */
    this.removeSelection = function (id, options={}) {
        this.removePopup();
        if (!this.hasSelection()) return this.Features.setText(), this.updateFeatures();
        var features = this.Utilities.clone(this.getSelectedFeatures());
        this.Features.addFeatures(features, true, id);
        this.getSelectedFeatures().splice(0, features.length);
        this.map.getSource(this.statics.constants.sources.SELECT).setData(turf.featureCollection([]));
        this.map.getSource(this.statics.constants.sources.VERTEX).setData(turf.featureCollection([]));
        this.Features.setText();
        this.updateFeatures(features);
        this.setButtons();
        if (options.extent) this.setViewport(), this.setExtent();
        if (options.removeText) this.Layers.removeTextLayer();
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
        if (!this.controls || !this.controls.length) return false;
        this.controls.forEach(function (control) { control.disable(); });
    }

	/**
	 * @function
     * @memberOf module:geoflo
	 * @name removeFeatures
	 * @description Removes specified features from the map. If no layers are provided, all features are removed. If the layers parameter is not an array, the function returns false.
	 * @param {Array} layers - An array of layers to remove features from.
	 */
    this.removeFeatures = function (layers) {
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
	 * @returns {boolean} - Returns true if the feature was successfully removed, otherwise false.
	 */
    this.removeFeature = function (id) {
        var removed = id ? this.Features.removeFeatures(id, true) : false;
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
        if (!this.meshIndex || reset) this.meshIndex = new Mesh([]);
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
        if (!this.Locate) return false;
        this.Locate.update(options);
        return this.Locate.locate;
    }

    /**
	 * @function
     * @memberOf module:geoflo
     * @name updateFeatures
     * @description Updates the features of a layer based on the provided features.
     * @param {Array} features - An array of features to update the layer with.
     * @returns {Array} The updated features of the layer.
     */
    this.updateFeatures = function (features) {
        return this.Features.updateFeatures(features);
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

        var features = geoflo.Utilities.cloneDeep(fc.features);

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

            for (let x = 0; x < event.target.files.length; x++) { files.push(event.target.files[x]); }

            for (let x = 0; x < files.length; x++) {
                const file = files[x];
                const name = file.name;
                const ext = name.substring(name.lastIndexOf('.') + 1, name.length).toLowerCase();
                const reader = new FileReader();

                reader.onloadend = function () {
                    if (reader.readyState === FileReader.DONE) {
                        try {
                            processFiles(reader.result, name, ext);
                        } catch (e) {
                            console.log(e);
                            console.error("Invalid JSON data");
                        }
                    }
                }

                reader.readAsText(file);
            }
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
                feature.source = feature.source || feature.properties.source || geoflo.statics.constants.sources.COLD;
            })
            
            geoflo.fire('features.import', { features: features, file: file, ext: ext, name: name })
            geoflo.addFeatures(features);
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
            const camera = geoflo.map.getFreeCameraOptions();

            // set the position and altitude of the camera
            camera.position = mapboxgl.MercatorCoordinate.fromLngLat({ lng: alongCamera[0], lat: alongCamera[1] }, cameraAltitude );

            // tell the camera to look at a point along the route
            camera.lookAtPoint({
                lng: alongRoute[0],
                lat: alongRoute[1]
            });

            geoflo.map.setFreeCameraOptions(camera);

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
                this.removeSelection(id);
                this.Features.removeFeatures(id, true);
                this.meshIndex ? this.meshIndex.removeFeature(id) : false;
                this.fire('feature.delete', { features: this.Features.getColdFeatures(), id: id, feature: feature })
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
                    var coords = geoflo.Utilities.combineSameTypeFeatures(this.getSelectedFeatures());

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
	 * @returns {Array} The array of selected features after applying the handler function.
	 */
    this.forEachSelectedFeature = function (handler) {
        this.getSelectedFeatures().forEach(handler);
        return this.getSelectedFeatures();
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
        features = features || (this.hasSelection() ? this.getSelectedFeatures() : this.getDrawnFeatures());
        this.setExtent(features, false, options);
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
        if (!this.hasSelection() || this.mode !== this.statics.constants.modes.SELECT) return false;

        var allFeaturesType = this.getCommonGeometryType();
        if (allFeaturesType !== "LineString") return false;

        var coords = geoflo.Utilities.combineSameTypeFeatures(this.getSelectedFeatures());

        if (coords.length > 0) {
            if (!geoflo.Utilities.isPointEqual(coords[0], coords[coords.length - 1])) {
                coords.push(coords[0]);
            }

            this.addFeaturesToSelected([turf.polygon([coords], this.getSelectedPropertyValues())]);
            this.removeSelection();
        }
    }

    this.initialize();
};

const geoflo = new GeoFlo();

Utilities.prototype.geoflo = geoflo;
Features.prototype.geoflo = geoflo;
Layers.prototype.geoflo = geoflo;
Control.prototype.geoflo = geoflo;
Locate.prototype.geoflo = geoflo;
Mesh.prototype.geoflo = geoflo;
Draw.prototype.geoflo = geoflo;
Select.prototype.geoflo = geoflo;
Styles.prototype.geoflo = geoflo;

export { geoflo as default }




async function loadScript(url) {
    try {
        const response = await fetch(url);

        if (response.ok) {
            const scriptText = await response.text();
            const script = document.createElement('script');
            script.textContent = scriptText;
            document.head.appendChild(script);
        } else {
            console.error(`Failed to load script from ${url}. Status: ${response.status}`);
        }
    } catch (error) {
        console.error(`Error loading script: ${error.message}`);
    }
}

async function loadStylesheet(url) {
    try {
        const response = await fetch(url);

        if (response.ok) {
            const scriptText = await response.text();
            const script = document.createElement('style');
            script.textContent = scriptText;
            document.head.prepend(script);
        } else {
            console.error(`Failed to load script from ${url}. Status: ${response.status}`);
        }
    } catch (error) {
        console.error(`Error loading stylesheet: ${error.message}`);
    }
}

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

async function loaded (geoflo) {
    return new Promise(async function (resolve, reject) {
        var ready = setInterval(function() {
            if (!geoflo.isLoaded) return false;
            clearInterval(ready);
            return resolve(geoflo.isLoaded);
        }, 1);
    })
}

function onLoad(geoflo, event) {
    if (!event.target || !event.target.getContainer) throw new Error('MapboxGL map object is required!');
    
    geoflo.map = event.target;
    geoflo.container = geoflo.map._container;
    geoflo.viewport ? geoflo.container.insertBefore(geoflo.viewport, geoflo.container.firstChild) : false;

    geoflo.map.off('style.load', onStyleLoad);
    geoflo.map.on('style.load', onStyleLoad);

    if (geoflo.options.map.maxPitch) geoflo.map.setMaxPitch(geoflo.options.map.maxPitch);
    if (geoflo.options.map.maxZoom) geoflo.map.setMaxZoom(geoflo.options.map.maxZoom);
    if (geoflo.options.map.minPitch) geoflo.map.setMinPitch(geoflo.options.map.minPitch);
    if (geoflo.options.map.minZoom) geoflo.map.setMinZoom(geoflo.options.map.minZoom);

    if (!geoflo.mobile) {
        geoflo.fullscreen = new mapboxgl.FullscreenControl({ container: document.querySelector('body') });
        geoflo.fullscreen.hide = function () { geoflo._controlContainer.style.display = 'none' }.bind(geoflo.fullscreen);
        geoflo.fullscreen.show = function () { geoflo._controlContainer.style.display = 'block' }.bind(geoflo.fullscreen);
        geoflo.map.addControl(geoflo.fullscreen, 'top-right');
    }

    geoflo.styles = new Styles({ styles: geoflo.options.styles, selected: geoflo.options.map.style });
    geoflo.Layers = new Layers();
    geoflo.Features = new Features();
    geoflo.locate = new Locate();

    geoflo.navigation = new mapboxgl.NavigationControl({ visualizePitch: true, showZoom: true, showCompass: true });
    geoflo.navigation.hide = function () { geoflo._container.style.display = 'none' }.bind(geoflo.navigation);
    geoflo.navigation.show = function () { geoflo._container.style.display = 'block' }.bind(geoflo.navigation);
    geoflo.map.addControl(geoflo.navigation, 'top-right');
    geoflo.map.addControl(geoflo.styles);
    geoflo.Events = Events(geoflo);
    geoflo.Events.removeEventListeners();
    geoflo.Events.addEventListeners();
    geoflo.isLoaded = true;

    return geoflo;
}

function onStyleLoad(event) {
    setTimeout(function () { geoflo.redraw(); }, 500)
}

function buildMapbox () {
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
}

async function loadPremiumModules(key) {
    const license = await validateLicense(key);

    if (license) {
        const [Snapping, Pinning, Routing, Exploring, Painting, Gaming] = await Promise.all([
            import(/* webpackChunkName: "snapping" */ "./src/Snapping.js"),
            import(/* webpackChunkName: "pinning" */ "./src/Pinning.js"),
            import(/* webpackChunkName: "routing" */ "./src/Routing.js"),
            import(/* webpackChunkName: "exploring" */ "./src/Exploring.js"),
            import(/* webpackChunkName: "painting" */ "./src/Painting.js"),
            import(/* webpackChunkName: "gaming" */ "./src/Gaming.js"),
        ]);

        geoflo._Snapping = Snapping.default;
        geoflo._Pinning = Pinning.default;
        geoflo._Routing = Routing.default;
        geoflo._Exploring = Exploring.default;
        geoflo._Painting = Painting.default;
        geoflo._Gaming = Gaming.default;

        geoflo._Snapping.prototype.geoflo = geoflo;
        geoflo._Pinning.prototype.geoflo = geoflo;
        geoflo._Routing.prototype.geoflo = geoflo;
        geoflo._Exploring.prototype.geoflo = geoflo;
        geoflo._Painting.prototype.geoflo = geoflo;
        geoflo._Gaming.prototype.geoflo = geoflo;

        console.log("✅ Premium modules loaded successfully.");
    }

    return license;
}

async function validateLicense(key) {
    return { name: 'geoflo' };

    try {
        const response = await fetch(`https://api.geoflo.com/v1/license?key=${key}`);
        const data = await response.json();

        if (response.status === 200) {
            console.log("✅ License validated! Loading premium features...");
            return data;
        } else {
            console.warn("⚠️ License invalid. Running in basic mode.");
            return false;
        }
    } catch (error) {
        console.error("License validation failed:", error);
        return false;
    }
}