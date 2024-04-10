// REQUIRE //
import Mapbox from "./src/require/Mapbox.js"
import Turf from "./src/require/Turf.js"
import Omnivore from "./src/require/Omnivore.js"


// SYSTEM //
import Statics from "./src/system/Statics.js"
import Options from "./src/system/Options.js"
import Utilities from "./src/system/Utilities.js"


// MAP //
import Map from "./src/map/Map.js"
import Layers from "./src/map/Layers.js"
import Features from "./src/map/Features.js"
import Mesh from "./src/map/Mesh.js"


// UX //
import Events from "./src/ux/Events.js"
import Controls from "./src/ux/Controls.js"
import Styles from "./src/ux/Styles.js"
import Gamepad from "./src/ux/Gamepad.js"
import Locate from "./src/ux/Locate.js"


// MODES //
import Select from "./src/mode/Select.js"
import Draw from "./src/mode/Draw.js"
import Edit from "./src/mode/Edit.js"


// ACTIONS //
import Snapping from "./src/action/Snapping.js"
import Pinning from "./src/action/Pinning.js"
import Routing from "./src/action/Routing.js"
import Painting from "./src/action/Painting.js"
import Exploring from "./src/action/Exploring.js"


const version = '1.0.0';

var selectedFeatures = [];
var hiddenFeatures = [];

/**
 * @module GeoFlo
 * @name GeoFlo
 * @description Represents the GeoFlo object that manages all modules.
 * @returns {Object} The GeoFlo object with various methods for managing the entire app.
 */
const GeoFlo = function () {
    if (!Mapbox) throw new Error('MapboxGL script is required!')
    if (!Turf) throw new Error('TurfJS script is required!');
    if (!Omnivore) throw new Error('Omnivore script is required!');
    
    const ctx = this;
    const turf = this.turf = Turf;
    const omnivore = this.omnivore = Omnivore;

    this.version = version;
    this.Mapbox = Mapbox;

    this.options = Options;
    this.dev = this.statics.dev;
    this.id = this.statics.id;

    this.modes = [];
    this.plugins = {};
    this.gamepads = {};
    this.enabled = false;
    this.mobile = isMobile();

	/**
	 * @function
     * @memberOf module:GeoFlo
	 * @name initialize
	 * @description Initializes the object and optionally assigns it to the global window object.
	 * @returns {Object} The initialized object.
	 */
    this.initialize = function () {
        if (this.initialized) return this;
        window[this.id] = this;
        this.Utilities = new Utilities(this);
        this.initialized = true;
        return this;
    }
    
	/**
	 * @function
     * @memberOf module:GeoFlo
	 * @name init
	 * @description Initializes the map component with the provided options and a callback function when ready.
	 * @param {Object} [options={}] - The options object for configuring the map component.
	 * @param {Function} onReady - The callback function to be executed when the map is ready.
	 * @returns {Object} Returns the map component instance.
	 */
    this.init = function (options={}, onReady) {
        if (!options.accessToken) throw new Error('No Mapbox Access Token Provided!');

        const id = options.container || this.options.map.container;

        this.options.map.accessToken = options.accessToken;
        this.options.map.container = id;

        delete options.accessToken;
        delete options.container;

        this.setOptions(options);

        if (this.isReady) return this.build(this._container);
        this.onReady = onReady && typeof onReady === 'function' ? onReady : false;
        
        ready().then(function (res, rej) {
            if (!res || rej) throw new Error(`Element with id "${id}" is required in the DOM for the map!`)

            ctx.isReady = true;
            ctx._container = element;
            ctx._container.classList.add(ctx.statics.id);
            ctx.Map = new Map(ctx, ctx.options.map);
        })

        return this;
    }

    /**
	 * @function
     * @memberOf module:GeoFlo
	 * @name load
	 * @description This function loads the MapboxGL SDK with the given MapboxGL map object and sets up necessary components for interaction. Loads the User, Layers, and Features components, and initializes event listeners. Calls the onReady callback if provided.
	 * @param {Object} map - The MapboxGL map object to be used by the SDK.
	 * @returns {Object} - Returns the SDK instance after loading and initialization.
	 */
    this.load = function () {
        if (this.isLoaded || !this.isReady || !this.Map.getMap()) return this;

        this.map = this.Map.getMap();
        this.container = this.Map.getContainer();

        this.fullscreen = new Mapbox.FullscreenControl({ container: document.querySelector('body') });
        this.navigation = new Mapbox.NavigationControl({ visualizePitch: true, showZoom: !this.mobile, showCompass: true });
        this.attribution = new Controls(this, { type: 'attribute', position: 'bottom-right', enable: true, show: true, attribution: this.statics.logo.full });
        this.map.addControl(this.navigation, this.mobile ? 'bottom-right' : 'top-right');
        
        if (!this.mobile) this.map.addControl(this.fullscreen, 'top-right');
    
        this.styles = this.map.addControl(new Styles(this));
    
        this.Locate = new Locate(this, { init: true });
        this.Layers = new Layers(this, { init: true });
        this.Features = new Features(this, { init: true });
        
        this.Events = Events(this);
        this.Events.removeEventListeners();
        this.Events.addEventListeners();
    
        this.onReady ? this.onReady(this) : false;
    
        this.Map.setExtent(false, true);
        this.options.enable ? this.enable() : false;
    
        this.isLoaded = true;
        this.fire('sdk.ready', { enabled: this.enabled, map: this.map, ready: this.isLoaded });
    
        return this;
    }

	/**
	 * @function
     * @memberOf module:GeoFlo
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
        this.setControls();

        this.Select = new Select(this);
        this.Draw = new Draw(this);
        this.Edit = new Edit(this);

        this.modes = [ this.Select, this.Draw, this.Edit ];
        this.enabled = true;

        this.fire('map.enable', { enabled: this.enabled, mode: this.mode, type: this.type });
        this.redraw();
        this.setMode({ mode: this.mode, type: this.type});
        return this;
    }

	/**
	 * @function
     * @memberOf module:GeoFlo
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
        this.fire('map.disable', { enabled: this.enabled, mode: this.mode });
        this.doubleClickZoom.enable(this.map);
        this.Layers.removeEventListeners();
        this.Events.removeEventListeners();
        this.Layers.removeLayers();
        this.removeControls();
        return this;
    }

	/**
	 * @function
     * @memberOf module:GeoFlo
	 * @name redraw
	 * @description Redraws the map by refreshing layers, updating event listeners, and disabling double click zoom.
	 * @returns {Promise<boolean>} Returns a promise that resolves to true if the map is successfully redrawn, false otherwise.
	 */
    this.redraw = async function () {
        if (!this.Events) return false;

        await this.Layers.refresh();

        this.Events.removeEventListeners();
        this.Events.addEventListeners();
        this.Features.updateSource();
        this.doubleClickZoom.disable(this.map);
        this.fire('map.redraw', { enabled: this.enabled, mode: this.mode })
    }

	/**
	 * @function
     * @memberOf module:GeoFlo
	 * @name refresh
	 * @description Refreshes the content by redrawing it asynchronously.
	 * @returns {Promise<boolean>} Returns a Promise that resolves to a boolean value.
	 */
    this.refresh = async function () {
        if (this.noRefresh) return false;
        await this.redraw();
    }




	/**
	 * @function
     * @memberOf module:GeoFlo
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
     * @memberOf module:GeoFlo
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
     * @memberOf module:GeoFlo
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
     * @memberOf module:GeoFlo
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
     * @memberOf module:GeoFlo
	 * @name setOptions
	 * @description Sets the options for the object by merging the provided options with the existing ones.
	 * @param {Object} options - The options to be merged with the existing options.
	 * @returns {Object} The updated options object after merging.
	 */
    this.setOptions = function(options={}) {
        this.options = ctx.Utilities.assignDeep(this.options || {}, options);
        return this.options;
    }

	/**
	 * @function
     * @memberOf module:GeoFlo
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
                options.feature = ctx.Utilities.cloneDeep(options.feature);
                options.mode = this.statics.constants.modes.DRAW;
                options.type = options.type || options.feature.properties.type;

                this.editing = ctx.Utilities.cloneDeep(options.feature);
                this.removeSelection();
            } else {
                //this.wantingToEdit = true;
                if (this.currentMode) this.currentMode.deactivate();
                return this.setMode();
            }
        }

        if (this.currentMode && this.currentMode.activated) this.currentMode.deactivate();

        this.container.classList.forEach(function(className) {
            if (className.indexOf("mouse-") !== -1) {
                classesToRemove.push(className);
            }
        });

        if (classesToRemove.length > 0) {
            var _ctx$container$classL;
            (_ctx$container$classL = this.container.classList).remove.apply(_ctx$container$classL, classesToRemove);
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

        this.Snapping = new Snapping(this, this.currentMode);
        this.Pinning = new Pinning(this, this.currentMode);
        this.Routing = new Routing(this, this.currentMode);
        this.Exploring = new Exploring(this, this.currentMode);
        this.Painting = new Painting(this, this.currentMode);
        this.Layers.moveLayers();
        return this.currentMode;
    }

	/**
	 * @function
     * @memberOf module:GeoFlo
	 * @name setControls
	 * @description Initializes and sets the controls for the map. Adds the fullscreen and navigation controls, and initializes the custom controls.
	 * @params {none} - No parameters needed for this function.
	 * @returns {Array} - An array of initialized controls for the map.
	 */
    this.setControls = function (controls=[]) {
        if (this.controls && this.controls.length) return this.controls;
        if (!this.options.controls) return false;
        this.controls = [];
        controls = controls.length ? controls : this.statics.controls;
        controls.forEach(function(control) { this.controls.push(new Controls(this, control)) }, this);
        return this.controls;
    }

	/**
	 * @function
     * @memberOf module:GeoFlo
	 * @name setIcon
	 * @description This function determines the appropriate icon to display based on the user's following status and navigation compass icon.
     * @deprecated
	 * @param {Event} event - The event for which the icon is being set.
	 * @returns {void}
	 */
    this.setIcon = function (event) {
        var icon = this.navigation ? this.navigation._compassIcon : false;
        var following = this.Locate && this.Locate.following;

        if (following) {

        } else if (icon) {
            //control.style.transform = icon.style.transform;
        }
    }

	/**
	 * @function
     * @memberOf module:GeoFlo
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
        var icon = this.statics.logo.icon;
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
        this.centerMarker = new this.Mapbox.Marker(this.centerMarkerIcon);
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
     * @memberOf module:GeoFlo
	 * @name setButtons
	 * @description This function resets the active buttons and activates the Select button.
	 * @return {boolean} Returns true if the Select button is successfully set, false otherwise.
	 */
    this.setButtons = function () {
        return this.getButtons('select') ? this.getButtons('select').add() : false;
    }

	/**
	 * @function
     * @memberOf module:GeoFlo
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
     * @memberOf module:GeoFlo
	 * @name setTheme
	 * @description Sets the theme colors for the control.
	 * @param {Object} colors - An object containing the theme colors.
	 * @returns {void}
	 */
    this.setTheme = function (colors) {
        this.Control ? this.Control.setTheme(colors) : false;
    }

	/**
	 * @function
     * @memberOf module:GeoFlo
	 * @name setCustomLayers
	 * @description Sets custom layers on the map.
	 * @param {Array} layers - An array of custom layers to be added to the map.
	 * @param {Object} options - Additional options for setting custom layers.
	 * @returns {Promise} A promise that resolves when the custom layers are set on the map.
	 */
    this.setCustomLayers = async function (layers=[], options={}) {
        this.removeFeatures(layers, options);
        return await this.Layers.setCustomLayers(layers, options);
    }

	/**
	 * @function
     * @memberOf module:GeoFlo
	 * @name setSelectedFeatures
	 * @description This function updates the selected features on the map with the provided array of features.
	 * @param {Array} features - An array of features to set as selected.
	 * @returns {boolean} Returns false if the features array is empty.
	 */
    this.setSelectedFeatures = function (features=[]) {
        if (!features.length) return false;

        selectedFeatures.splice(0, selectedFeatures.length, ...features);

        this.map.getSource(this.statics.constants.sources.SELECT).setData(turf.featureCollection(this.getSelectedFeatures()));
        this.map.getSource(this.statics.constants.sources.VERTEX).setData(turf.featureCollection(this.getSelectedFeatures()));

        this.fire('select.load', {
            features: turf.featureCollection(this.getSelectedFeatures()),
            source: this.map.getSource(this.statics.constants.sources.SELECT)
        })
    }

	/**
	 * @function
     * @memberOf module:GeoFlo
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
     * @memberOf module:GeoFlo
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
     * @memberOf module:GeoFlo
	 * @name hasControls
	 * @description This function checks if the object has controls by verifying the existence and length of the controls array.
	 * @returns {boolean} Returns true if the object has controls, false otherwise.
	 */
    this.hasControls = function () {
        return this.controls && this.controls.length;
    }

	/**
	 * @function
     * @memberOf module:GeoFlo
	 * @name hasSelection
	 * @description This function determines whether there is a selection of features.
	 * @returns {boolean} Returns true if there is a selection of features, otherwise false.
	 */
    this.hasSelection = function () {
        return this.getSelectedFeatures().length > 0;
    }

	/**
	 * @function
     * @memberOf module:GeoFlo
	 * @name hasSingleSelection
	 * @description This function checks if there is only one selected feature.
	 * @returns {boolean} Returns true if there is a single selection, false otherwise.
	 */
    this.hasSingleSelection = function () {
        return this.getSelectedFeatures().length === 1;
    }




	/**
	 * @function
     * @memberOf module:GeoFlo
	 * @name activateSnapping
	 * @description This function activates snapping by getting the snapping buttons, activating them, and triggering the snapping activation event. Fires a custom event 'snapping.activate' with the enabled status and the snapping object.
	 * @returns {Object} The activated Snapping object.
	 */
    this.activateSnapping = function () {
        var buttons = this.getButtons('snapping');
        if (!buttons) return;
        buttons.activate();
        this.Snapping.activate();
        this.fire('snapping.activate', { enabled: true, mesh: this.meshIndex, snapping: this.Snapping })
        return this.Snapping;
    }

	/**
	 * @function
     * @memberOf module:GeoFlo
	 * @name activatePinning
	 * @description This function activates pinning by getting the pinning buttons, activating them, enabling snapping, activating pinning, and firing an event. Fires a custom event 'pinning.activate' with the enabled status and the pinning object.
	 * @returns {Object} The activated pinning object.
	 */
    this.activatePinning = function () {
        var buttons = this.getButtons('pinning');
        if (!buttons) return;
        buttons.activate();
        //this.deactivateRouting();
        this.activateSnapping();
        this.Pinning.activate();
        this.fire('pinning.activate', { enabled: true, pinning: this.Pinning });
        return this.Pinning;
    }

	/**
     * @function
     * @memberOf module:GeoFlo
	 * @description This function activates the routing feature by getting the routing buttons, activating them, enabling snapping, deactivating painting, and activating the routing itself. Fires a custom event 'routing.activate' with the enabled status and the routing object.
	 * @name activateRouting
	 * @returns {Object} The activated Routing object.
	 */
    this.activateRouting = function () {
        var buttons = this.getButtons('routing');
        if (!buttons) return;
        buttons.activate();
        this.activateSnapping();
        this.deactivatePainting();
        this.Routing.activate();
        this.fire('routing.activate', { enabled: true, routing: this.Routing })
        return this.Routing;
    }

	/**
	 * @function
     * @memberOf module:GeoFlo
	 * @name activateExploring
	 * @description This function activates the exploring mode by activating the exploring buttons, functionalities, and events. Fires a custom event 'exploring.activate' with the enabled status and the exploring object.
	 * @returns {Object} The activated exploring object.
	 */
    this.activateExploring = function () {
        var buttons = this.getButtons('exploring');
        if (!buttons) return;
        buttons.activate();
        this.deactivatePainting();
        this.Exploring.activate();
        this.fire('exploring.activate', { enabled: true, exploring: this.Exploring });
        return this.Exploring;
    }

	/**
	 * @function
     * @memberOf module:GeoFlo
	 * @name activatePainting
	 * @description Activates the painting functionality by setting the draw mode, activating the painting buttons, deactivating routing and exploring, and firing an event. Fires a custom event 'painting.activate' with the enabled status and the painting object.
	 * @returns {Object} The activated Painting object.
	 */
    this.activatePainting = function () {
        var buttons = this.getButtons('painting');
        if (!buttons) return;
        buttons.activate();
        this.deactivateRouting();
        this.deactivateExploring();
        this.Painting.activate(this.drawMode);
        this.fire('painting.activate', { enabled: true, painting: this.Painting });
        return this.Painting;
    }




	/**
	 * @function
     * @memberOf module:GeoFlo
	 * @name deactivateSnapping
	 * @description This function deactivates the snapping feature by performing various actions. Deletes mesh data, deactivates the snapping buttons, deactivates the Snapping object, and fires a 'snapping.deactivate' event.
	 * @returns {boolean} Returns false after deactivating the snapping feature.
	 */
    this.deactivateSnapping = function () {
        var buttons = this.getButtons('snapping');
        if (!buttons) return;
        buttons.deactivate();
        this.deleteMeshData();
        this.Snapping.deactivate();
        this.fire('snapping.deactivate', { enable: false })
        return false;
    }

	/**
	 * @function
     * @memberOf module:GeoFlo
	 * @name deactivatePinning
	 * @description This function deactivates the pinning feature by deactivating the pinning buttons, the Pinning object, and firing a 'pinning.deactivate' event.
	 * @returns {boolean} Returns false after deactivating pinning.
	 */
    this.deactivatePinning = function () {
        var buttons = this.getButtons('pinning');
        if (!buttons) return;
        buttons.deactivate();
        this.Pinning.deactivate();
        this.fire('pinning.deactivate', { enable: false });
        return false;
    }

	/**
	 * @description Deactivates the routing functionality by deactivating the routing buttons and the Routing module. Triggers a custom event 'routing.deactivate' with enable set to false.
	 * @function
     * @memberOf module:GeoFlo
	 * @name deactivateRouting
	 * @returns {boolean} Returns false after deactivating the routing functionality.
	 */
    this.deactivateRouting = function () {
        var buttons = this.getButtons('routing');
        if (!buttons) return;
        buttons.deactivate();
        this.Routing.deactivate();
        this.fire('routing.deactivate', { enable: false })
        return false;
    }

	/**
	 * @function
     * @memberOf module:GeoFlo
	 * @name deactivateExploring
	 * @description This function deactivates the exploring mode by deactivating buttons, deleting mesh data, deactivating the exploring mode, and firing an event. Fires a custom event 'exploring.deactivate' with the enable status set to false.
	 * @returns {boolean} Returns false after deactivating the exploring mode.
	 */
    this.deactivateExploring = function () {
        var buttons = this.getButtons('exploring');
        if (!buttons) return;
        buttons.deactivate();
        this.deleteMeshData();
        this.Exploring.deactivate();
        this.fire('exploring.deactivate', { enable: false });
        return false;
    }

	/**
	 * @function
     * @memberOf module:GeoFlo
	 * @name deactivatePainting
	 * @description This function deactivates the painting mode by deactivating the buttons, the painting tool, and firing an event. Fires a custom event 'painting.deactivate' with the enable status set to false.
	 * @returns {boolean} Returns false.
	 */
    this.deactivatePainting = function () {
        var buttons = this.getButtons('painting');
        if (!buttons) return;
        if (this.mobile && !this.currentMode.finished && this.currentMode.id === 'draw' && this.currentMode.type && this.currentMode.type === 'Rectangle') return;
        buttons.deactivate();
        this.Painting.deactivate();
        this.fire('painting.deactivate', { enable: false });
        return false;
    }

    


	/**
	 * @function
     * @memberOf module:GeoFlo
	 * @name getMap
	 * @description Retrieves the map property from the Map object.
	 * @returns {Object} The map property of the Map object.
	 */
    this.getMap = function () {
        return this.Map.map;
    }

	/**
	 * @function
     * @memberOf module:GeoFlo
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
     * @memberOf module:GeoFlo
	 * @name getMode
	 * @description Retrieves the current mode of the object. Either 'GeoFlo.Select' or 'GeoFlo.Draw'.
	 * @return {object} The current mode of the object.
	 */
    this.getMode = function () {
        return this.currentMode;
    }

	/**
	 * @function
     * @memberOf module:GeoFlo
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
     * @memberOf module:GeoFlo
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
     * @memberOf module:GeoFlo
	 * @name getFeatures
	 * @description This function retrieves both the drawn and selected features and returns them as a single array.
	 * @return {Array} An array containing both the drawn and selected features.
	 */
    this.getFeatures = function () {
        return [this.getDrawnFeatures(), this.getSelectedFeatures()].flat();
    }

	/**
	 * @function
     * @memberOf module:GeoFlo
	 * @name getDrawnFeatures
	 * @description Retrieves the drawn features from the Features object.
	 * @returns {Array} An array of drawn features.
	 */
    this.getDrawnFeatures = function () {
        return this.Features.getColdFeatures();
    }

	/**
	 * @function
     * @memberOf module:GeoFlo
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
     * @memberOf module:GeoFlo
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

        var layers = [
            id + "-line-cold",
            id + "-fill-cold",
            id + "-circle-cold",
            id + "-icon-cold",
            id + "-fill-select",
            id + "-line-select",
            id + '-point-select',
            id + '-symbol-select'
        ];

        this.Layers.getLayers().forEach(function(layer) {
            if (layer.id.includes(id)) return;
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

        return features && features.length ? this.Features.getFeaturesById(ids) : [];;
    }
    
	/**
	 * @function
     * @memberOf module:GeoFlo
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
        var options = { layers: [this.statics.constants.layers.MESH + '-line', this.statics.constants.layers.MESH + '-circle'] };
        filter ? options.filter = filter : false;
        var features = this.map.queryRenderedFeatures(bbox, options);
        return features && features.length ? this.meshIndex.getFeaturesFromIndex(features) : [];
    }

	/**
	 * @function
     * @memberOf module:GeoFlo
	 * @name getFeatureById
	 * @description Retrieves a feature by its ID from the Features object.
	 * @param {string} id - The ID of the feature to retrieve.
	 * @returns {boolean|object} Returns the feature object if found, otherwise false.
	 */
    this.getFeatureById = function (id) {
        if (!id) return false;
        return this.Features.getFeatureById(id);
    }

	/**
	 * @function
     * @memberOf module:GeoFlo
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

        return features && features.length ? this.Features.getFeaturesById(ids) : [];;
    }




	/**
	 * @function
     * @memberOf module:GeoFlo
	 * @name getSelectedFeatures
	 * @description Retrieves the selected features stored in the selectedFeatures array.
	 * @returns {Array} An array containing the selected features.
	 */
    this.getSelectedFeatures = function () {
        return selectedFeatures;
    }

	/**
	 * @function
     * @memberOf module:GeoFlo
	 * @name getSelectedFeatureIds
	 * @description Retrieves the IDs of selected features.
	 * @returns {Array} An array of feature IDs.
	 */
    this.getSelectedFeatureIds = function () {
        return this.getSelectedFeatures().map((feature) => { return feature.parent || feature.properties.parent || feature.id || feature.properties.id; });
    }

	/**
	 * @function
     * @memberOf module:GeoFlo
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
     * @memberOf module:GeoFlo
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
     * @memberOf module:GeoFlo
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
     * @memberOf module:GeoFlo
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
     * @memberOf module:GeoFlo
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

        options.id = feature.id;
        options.mode = 'edit';
        options.feature = feature;

        this.fire('feature.edit', { feature: feature, id: feature.id });
        this.setMode(options);
        return feature;
    }

	/**
	 * @function
     * @memberOf module:GeoFlo
	 * @name cancelEdit
	 * @description This function cancels the current edit mode if it is in 'draw' mode and deactivates the editing feature.
	 * @param {boolean} standby - Indicates whether the cancel operation is standby.
	 * @param {object} feature - The feature to be deactivated. If not provided, the editing feature will be used.
	 * @returns {boolean} Returns false if the current mode is not 'draw', otherwise deactivates the editing feature.
	 */
    this.cancelEdit = function (standby, feature) {
        if (this.currentMode.id !== 'draw') return false;
        return this.currentMode.deactivate(true, standby, feature || this.editing);
    }

	/**
	 * @function
     * @memberOf module:GeoFlo
	 * @name saveEdit
	 * @description Saves the edited feature using the currentModes saveEdit method.
	 * @return {any} The result of the saveEdit method of the current mode.
	 */
    this.saveEdit = function () {
        return this.currentMode.saveEdit();
    }





	/**
	 * @function
     * @memberOf module:GeoFlo
	 * @name addFeatures
	 * @description Adds features to the map and optionally zooms to them.
	 * @param {Array} features - Array of features to be added to the map.
	 * @param {boolean} noZoom - Flag to indicate whether to zoom to the added features.
	 */
    this.addFeatures = function (features, noZoom) {
        if (!features) return false;
        if (features.features) features = features.features;
        if (!Array.isArray(features)) features = [features];
        if (!features.length) return false;

        this.Features.addFeatures(features);
        !noZoom ? this.zoomToFeatures() : false;
    }

	/**
	 * @function
     * @memberOf module:GeoFlo
	 * @name addFeaturesToSelected
	 * @description This function adds the provided features to the selected features list, updates the map sources, sets buttons, updates the text, and triggers a 'feature.select' event.
	 * @param {Array} features - The features to be added to the selected features list.
	 */
    this.addFeaturesToSelected = function (features) {
        this.getSelectedFeatures().push(...features);
        this.setButtons();
        this.map.getSource(this.statics.constants.sources.SELECT).setData(turf.featureCollection(this.getSelectedFeatures()));
        this.map.getSource(this.statics.constants.sources.VERTEX).setData(turf.featureCollection(this.getSelectedFeatures()));
        this.Features.setText(features);
        this.fire('feature.select', { ids: this.getSelectedFeatureIds(), features: this.getSelectedFeatures() });
    }

	/**
	 * @function
     * @memberOf module:GeoFlo
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
     * @memberOf module:GeoFlo
	 * @name addGamepad
	 * @description Adds a gamepad to the list of available gamepads and fires an event. Fires a custom event 'gamepad.add' with the gamepad object.
	 * @param {Object} gamepad - The gamepad object to be added.
	 * @returns {boolean} Returns false if the 'Gamepad' plugin is not available.
	 */
    this.addGamepad = function (gamepad) {
        this.gamepads[gamepad.index] = new this.Gamepad(this, gamepad);
        this.fire('gamepad.add', { gamepad: gamepad });
    }

	/**
	 * @function
     * @memberOf module:GeoFlo
	 * @name addTooltip
	 * @description Attaches a tooltip by calling setTooltip to a specified element within a parent element.
	 * @param {Element} parent - The parent element to which the tooltip will be attached.
	 * @param {Element} element - The element to which the tooltip will be applied.
	 * @param {Object} options - The options for customizing the tooltip.
	 * @param {Element} appendTo - The element to which the tooltip will be appended.
	 */
    this.addTooltip = function (parent, element, options, appendTo) {
        if (!this.setTooltip) return false;

        this.setTooltip(element, {
            parent: parent,
            appendTo: appendTo,
            options: options
        })
    }

	/**
	 * @function
     * @memberOf module:GeoFlo
	 * @name addPlugin
	 * @description Adds a plugin to the plugins object of the current instance.
	 * @param {Object} plugin - The plugin object to be added.
	 * @param {string} plugin.id - The unique identifier of the plugin.
	 * @throws {Error} If no Plugin ID is provided.
	 */
    this.addPlugin = function (plugin) {
        if (!plugin.id) throw new Error('No Plugin ID provided')
        var id = plugin.id;
        this.plugins[id] = plugin;
    }



    

	/**
	 * @description Removes the selection of features based on the provided feature ID. If no ID is provided, all selected features are deselected.
	 * @function
     * @memberOf module:GeoFlo
	 * @name removeSelection
	 * @param {string} id - The ID of the feature to be deselected.
	 * @returns {number} The number of features that were deselected.
	 */
    this.removeSelection = function (id) {
        this.removePopup();

        if (!this.hasSelection()) return this.Features.setText();

        var ids = ctx.Utilities.clone(this.getSelectedFeatureIds());
        var features = ctx.Utilities.clone(this.getSelectedFeatures());

        if (!id) features.forEach(function (feature) { this.Features.addFeatures([feature], true); }, this);

        this.getSelectedFeatures().splice(0, features.length);
        this.setButtons();

        this.map.getSource(this.statics.constants.sources.SELECT).setData(turf.featureCollection([]));
        this.map.getSource(this.statics.constants.sources.VERTEX).setData(turf.featureCollection([]));
        
        this.Features.setText();
        this.fire('feature.deselect', { ids: ids, features: features });
        return features.length;
    }

	/**
	 * @function
     * @memberOf module:GeoFlo
	 * @name removeControls
	 * @description This function is responsible for removing controls.
	 * @params {none} No parameters needed.
	 */
    this.removeControls = function () {
        console.log('NEED TO REMOVE CONTROLS')
    }

	/**
	 * @function
     * @memberOf module:GeoFlo
	 * @name removeGamepad
	 * @description Removes a gamepad from the list of connected gamepads and triggers the onDisconnect event. Fires a custom event 'gamepad.remove' with the gamepad object.
	 * @param {Object} gamepad - The gamepad object to be removed.
	 * @returns {boolean} Returns false if the gamepad is not found in the list.
	 */
    this.removeGamepad = function (gamepad) {
        if (!this.gamepads[gamepad.index]) return false;
        this.gamepads[gamepad.index].onDisconnect(gamepad);
        delete this.gamepads[gamepad.index]
        this.fire('gamepad.remove', { gamepad: gamepad });
    }

	/**
	 * @function
     * @memberOf module:GeoFlo
	 * @name removeFeatures
	 * @description Removes specified features from the map. If no layers are provided, all features are removed. If the layers parameter is not an array, the function returns false.
	 * @param {Array} layers - An array of layers to remove features from.
	 * @param {Object} options - Additional options for removing features.
	 */
    this.removeFeatures = function (layers, options) {
        if (!layers) return this.Features.deleteFeatures();
        if (!Array.isArray(layers)) return false;
        this.Features.removeFeatures(layers, true);
    }

	/**
	 * @function
     * @memberOf module:GeoFlo
	 * @name removeFeature
	 * @description Removes a feature from the Features collection and fires an event if edit mode is not enabled. Fires a custom event 'feature.delete' with the ID and feature object.
	 * @param {string} id - The ID of the feature to be removed.
	 * @param {boolean} edit - A flag indicating whether edit mode is enabled.
	 * @returns {boolean} - Returns true if the feature was successfully removed, otherwise false.
	 */
    this.removeFeature = function (id, edit) {
        var removed = id ? this.Features.removeFeatures(id, edit) : false;
        !edit ? this.fire('feature.delete', { id: id, feature: removed }) : false;
        return removed;
    }

	/**
	 * @function
     * @memberOf module:GeoFlo
	 * @name removePopup
	 * @description Removes the popup element from the DOM.
	 * @return {boolean} Returns true if the popup was successfully removed, false otherwise.
	 */
    this.removePopup = function () {
        return this.popup && this.popup.remove ? this.popup.remove() : this.currentMode.popup && this.currentMode.popup.remove ? this.currentMode.popup.remove() : false;
    }






	/**
	 * @function
     * @memberOf module:GeoFlo
	 * @name updateMeshData
	 * @description This function updates the mesh data on the map by adding new features to the mesh index and updating the map source with the new data. If the mesh index is not available or the reset flag is set to true, the mesh index is reset before adding new features.
	 * @param {Array} features - An array of features to be added to the mesh index.
	 * @param {boolean} reset - A flag indicating whether to reset the mesh index before adding new features.
	 * @returns {Object} The updated feature collection that was set on the map source.
	 */
    this.updateMeshData = function (features=[], reset) {
        if (!this.meshIndex || reset) this.meshIndex = new this.Mesh([]);
        this.meshIndex.addNewFeatures(features);

        var source = this.statics.constants.sources.MESH;
        var features = turf.featureCollection(this.meshIndex.getFeatures());

        this.map.getSource(source).setData(features);
        this.fire('mesh.update', { features: features });
        return features;
    }

	/**
	 * @function
     * @memberOf module:GeoFlo
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
     * @memberOf module:GeoFlo
	 * @name updateOrientation
	 * @description Updates the orientation of the user based on the provided options.
	 * @param {Object} options - An object containing the options for updating the orientation.
	 * @returns {string} The location of the user after updating the orientation.
	 */
    this.updateOrientation = function (options) {
        this.Locate.update(options);
        return this.Locate.locate;
    }

    

	/**
	 * @function
     * @memberOf module:GeoFlo
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

        var features = ctx.Utilities.cloneDeep(fc.features);

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
     * @memberOf module:GeoFlo
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

            for (let x = 0; x < event.target.files.length; x++) {
                files.push(event.target.files[x]);
            }

            ctx.Utilities.processFiles(files, processFiles);
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
                feature.source = feature.source || feature.properties.source || ctx.statics.constants.sources.COLD;
            })
            
            ctx.fire('features.import', { features: features, file: file, ext: ext, name: name })
            ctx.addFeatures(features);
        }
    }


	/**
	 * @function
     * @memberOf module:GeoFlo
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
            const camera = ctx.map.getFreeCameraOptions();

            // set the position and altitude of the camera
            camera.position = mapboxgl.MercatorCoordinate.fromLngLat({ lng: alongCamera[0], lat: alongCamera[1] }, cameraAltitude );

            // tell the camera to look at a point along the route
            camera.lookAtPoint({
                lng: alongRoute[0],
                lat: alongRoute[1]
            });

            ctx.map.setFreeCameraOptions(camera);

            window.requestAnimationFrame(frame);
        }

        window.requestAnimationFrame(frame);
    }

	/**
	 * @function
     * @memberOf module:GeoFlo
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
     * @memberOf module:GeoFlo
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
     * @memberOf module:GeoFlo
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
                this.Features.removeFeatures(id, true);
                this.meshIndex ? this.meshIndex.removeFeature(id) : false;
                this.fire('feature:delete', { features: this.Features.getColdFeatures() })
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

        this.removeSelection(id);

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
     * @memberOf module:GeoFlo
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
     * @memberOf module:GeoFlo
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
                    var coords = ctx.Utilities.combineSameTypeFeatures(this.getSelectedFeatures());

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
     * @memberOf module:GeoFlo
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
     * @memberOf module:GeoFlo
	 * @name moveFeature
	 * @description This function calculates the new coordinates of a feature based on the direction and distance provided. NOT WORKING YET.
	 * @param {Object} feature - The feature object to be moved.
	 * @param {number} direction - The direction in which the feature should be moved (1 for forward, -1 for backward).
	 * @returns {Array} An array of new coordinates for the feature after moving.
	 */
    this.moveFeature = function (feature, direction) {
        return;
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
     * @memberOf module:GeoFlo
	 * @name forEachSelectedFeature
	 * @description Iterates over each selected feature and applies a handler function to it.
	 * @param {Function} handler - The function to be applied to each selected feature.
	 * @returns {void}
	 */
    this.forEachSelectedFeature = function (handler) {
        this.getSelectedFeatures().forEach(handler);
    }

	/**
	 * @function
     * @memberOf module:GeoFlo
	 * @name zoomToFeatures
	 * @description This function zooms to the provided features on the map. If no features are provided, it zooms to the selected features, cold features, or the map extent if no other features are available.
	 * @param {Array} features - The features to zoom to on the map.
	 * @param {Object} options - Additional options for zooming (default: {}).
	 * @returns {boolean} Returns false if no features are available to zoom to.
	 */
    this.zoomToFeatures = function (features, options={}) {
        features = features || (this.hasSelection() ? this.getSelectedFeatures() : this.Features ? this.Features.getColdFeatures() : []);
        if (features.properties) features = [features];
        if (!features || !features.length) features = !this.Map.options.extent ? [] : [turf.polygon(this.Map.options.extent)];
        if (features.length < 1) return false;
        this.Map.setExtent(features, false, options);
    }

	/**
	 * @function
     * @memberOf module:GeoFlo
	 * @name createPolygon
	 * @description Creates a polygon from selected LineString features and adds it to the map.
	 * @params {Array} selectedFeatures - An array of selected features to be combined into a polygon.
	 * @params {Object} selectedPropertyValues - Property values of the selected features.
	 * @returns {void}
	 */
    this.createPolygon = function () {
        if (this.mode === this.statics.constants.modes.SELECT) {
            if (this.hasSelection()) {
                var allFeaturesType = this.getCommonGeometryType();

                if (allFeaturesType === "LineString") {
                    var coords = ctx.Utilities.combineSameTypeFeatures(this.getSelectedFeatures());

                    if (coords.length > 0) {
                        if (!ctx.Utilities.isPointEqual(coords[0], coords[coords.length - 1])) {
                            coords.push(coords[0]);
                        }

                        this.addFeaturesToSelected([turf.polygon([coords], this.getSelectedPropertyValues())]);
                        this.removeSelection();
                    }
                } else {
                    console.error("Only objects of type LineString can be combined into a polygon");
                }
            }
        } else {
            console.error("Create polygon can only be executed in selection mode");
        }
    }

    this.initialize();
};

GeoFlo.prototype.statics = Statics;
GeoFlo.prototype.Gamepad = Gamepad;
GeoFlo.prototype.Mesh = Mesh;

const geoflo = new GeoFlo();

Mesh.prototype[geoflo.id] = geoflo;

function isMobile() {
    const e = /(iphone|ipod|ipad|android|iemobile|blackberry|bada)/.test(window.navigator.userAgent.toLowerCase());
    return e || (navigator.userAgent.includes("Mac") && "ontouchend"in document)
}

async function ready (id) {
    var count = 0;

    return new Promise(async function (resolve, reject) {
        var ready = setInterval(function() {
            var map = document.getElementById(id);
            
            if (count === 10000) {
                clearInterval(ready);
                return reject(false);
            }

            if (!map) return count++;

            clearInterval(ready);
            return resolve(map);
        }, 1);
    })
}