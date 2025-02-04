/**
 * @mixin
 * @memberof module:geoflo
 * @name Locate
 * @description This module provides the geolocation functionality for the Geoflo application. It allows users to locate their current position on the map and track their location.
 * @returns {Object} Returns the Locate object.
 */
const Locate = function () {
    const geoflo = this.geoflo;

	/**
	 * @function
     * @memberof module:geoflo.Locate
	 * @name init
	 * @description This function initializes the geolocation control on the map with the specified options.
	 * @param {Object} options - The options for configuring the geolocation control.
	 * @param {boolean} [options.enableHighAccuracy=true] - Whether to enable high accuracy for geolocation.
	 * @param {boolean} [options.trackUserLocation=true] - Whether to track the user's location.
	 * @param {boolean} [options.showUserHeading=true] - Whether to show the user's heading.
	 * @param {boolean} [options.showAccuracyCircle=false] - Whether to show the accuracy circle.
	 * @returns {Object} The current instance of the map with the geolocation control added.
	 */
    this.init = function (options={}) {
        this.options = geoflo.Utilities.extend({}, options);

        this.control = new mapboxgl.GeolocateControl({
            positionOptions: { enableHighAccuracy: true },
            trackUserLocation: true,
            showUserHeading: true,
            showAccuracyCircle: false
        });

        this.control.on('geolocate', this.onControlEvent.bind(this))
        geoflo.map.addControl(this.control, 'top-right');
        //this.ready();
        return this;
    }

    this.hide = function () {
        this.control._container.style.display = 'none';
    }

    this.show = function () {
        this.control._container.style.display = 'block';
    }

	/**
	 * @function
     * @memberof module:geoflo.Locate
	 * @name ready
	 * @description This function checks if the geolocate button is available in the control and then calls the build function.
	 * @params {Object} control - The control object containing the geolocate button.
	 * @returns {void}
	 */
    this.ready = function () {
        var _this = this;
        var control = this.control;

        var ready = setInterval(function() {
            if (!control._geolocateButton) return;
            _this.build();
            return clearInterval(ready);
        }, 1);
    }

	/**
	 * @function
     * @memberof module:geoflo.Locate
	 * @name build
	 * @description This function hides the user location dot marker and the associated button.
	 * @params {void} None
	 * @returns {void}
	 */
    this.build = function () {
        this.button = this.control._geolocateButton;
        this.marker = this.control._userLocationDotMarker;
        this.button.addEventListener('click', this.onControlEvent.bind(this));
        //this.getButton().style.display = 'none';
    }

	/**
	 * @function
     * @memberof module:geoflo.Locate
	 * @name update
	 * @description This function updates the map bearing and center based on the provided options.
	 * @param {Object} options - The options object.
	 * @param {number} options.alpha - The alpha value.
	 * @returns {void}
	 */
    this.update = function (options={}) {
        const alpha = options.alpha;
        const heading = this.heading();
        const bearing = this.bearing();
        const following = this.following;
        if (!heading || !following || geoflo.mapMoving) return;
        geoflo.map.setBearing(heading - 1);
        geoflo.map.setCenter(this.marker._lngLat);
    }

	/**
	 * @function
     * @memberof module:geoflo.Locate
	 * @name heading
	 * @description Retrieves the heading value from the control object.
	 * @returns {string} The heading value from the control object.
	 */
    this.heading = function () {
        return this.control._heading;
    }

	/**
	 * @function
     * @memberof module:geoflo.Locate
	 * @name bearing
	 * @description This function retrieves the current bearing of the map.
	 * @returns {number} The bearing of the map.
	 */
    this.bearing = function () {
        return geoflo.map.getBearing();
    }

	/**
	 * @function
     * @memberof module:geoflo.Locate
	 * @name locate
	 * @description Initiates the process of locating the user's current position on the map.
	 * @returns {void}
	 */
    this.locate = function () {
        this.locating = true;
        this.unlocated = false;
        this.control._follow = this.following = false;
        addClasses(this.button, ['mapboxgl-ctrl-geolocate-waiting']);
        geoflo.fire('locate.on', { state: this.state() });
        return this.control.trigger();
    }

	/**
	 * @function
     * @memberof module:geoflo.Locate
	 * @name relocate
	 * @description Relocates the geolocation control to the user's current location. If the control is set to follow the user's location, it changes the state to 'ACTIVE_LOCK'. Adds the 'mapboxgl-ctrl-geolocate-active' class to the button element. Triggers the control
	 * @params {void}
	 * @returns {void}
	 */
    this.relocate = function () {
        if (this.following) this.state('ACTIVE_LOCK');
        addClasses(this.button, ['mapboxgl-ctrl-geolocate-active']);
        return this.control.trigger();
    }

	/**
	 * @function
     * @memberof module:geoflo.Locate
	 * @name unlocate
	 * @description Sets the state to 'ACTIVE_LOCK', disables following, enables drag pan on the map, and triggers the control.
	 * @returns {Object} The result of triggering the control.
	 */
    this.unlocate = function () {
        this.state('ACTIVE_LOCK');
        this.control._follow = this.following = false;
        geoflo.map.dragPan.enable();
        this.unlocated = true;
        geoflo.fire('locate.off', { state: this.state() });
        return this.control.trigger();
    }

	/**
	 * @function
     * @memberof module:geoflo.Locate
	 * @name follow
	 * @description Enables the follow functionality for the geolocate control. When activated, adds a specific class to the button, disables drag panning on the map, and sets the follow state to true.
	 * @params {Object} geoflo - The context object containing the map and control references.
	 * @returns {boolean} - Returns true to indicate that the follow functionality has been enabled.
	 */
    this.follow = function () {
        addClasses(this.button, ['mapboxgl-ctrl-geolocate-follow']);
        geoflo.map.dragPan.disable();
        return this.control._follow = this.following = true;
    }

	/**
	 * @function
     * @memberof module:geoflo.Locate
	 * @name state
	 * @description This function is used to get or set the state of the control. If a state parameter is provided, it sets the control's watch state to that value. If no state parameter is provided, it returns the current watch state of the control.
	 * @param {boolean} state - The state to set for the control.
	 * @returns {boolean} - The current watch state of the control.
	 */
    this.state = function (state) {
        return state ? this.control._watchState = state : this.control._watchState;
    }



	/**
	 * @function
     * @memberof module:geoflo.Locate
	 * @name getButton
	 * @description Returns the geolocate button element from the control.
	 * @returns {Element} The geolocate button element.
	 */
    this.getButton = function () {
        return this.control._geolocateButton;
    }


    

	/**
	 * @function
     * @memberof module:geoflo.Locate
	 * @name removeClasses
	 * @description This function removes classes related to geolocation control from a button element.
	 * @params {Element} button - The button element from which classes will be removed.
	 */
    this.removeClasses = function () {
        var button = this.button;
        if (!button) return;
        button.classList.remove('mapboxgl-ctrl-geolocate-waiting');
        button.classList.remove('mapboxgl-ctrl-geolocate-active');
        button.classList.remove('mapboxgl-ctrl-geolocate-active-error');
        button.classList.remove('mapboxgl-ctrl-geolocate-background');
        button.classList.remove('mapboxgl-ctrl-geolocate-background-error');
        button.classList.remove('mapboxgl-ctrl-geolocate-follow');
    }



    /**
     * @function
     * @name onAdd
     * @memberof module:geoflo.Locate
     * @description Logs the event object to the console.
     *
     * @param {Event} event - The event object that is triggered when an action occurs.
     * @returns {void} This function does not return a value.
     * 
     * @author Solutegrate
     * @copyright 2025
     */
    this.onAdd = function (event) {
        console.log(event)
    }

    /**
     * @function
     * @name onControlEvent
     * @memberof module:geoflo.Locate
     * @description Handles control events, updating the marker and managing the state based on the event details.
     *
     * @param {Object} event - The event object containing details about the control event.
     * @param {Object} event.coords - The coordinates associated with the event, if available.
     * @param {HTMLElement} event.target - The target element that triggered the event.
     * @returns {void} This function does not return a value.
     * 
     * @author Solutegrate
     * @copyright 2025
     */
    this.onControlEvent = function (event) {
        //this.button = this.button || event.button;
        this.marker = this.control._userLocationDotMarker;

        this.removeClasses();

        if (event.coords) {
            this.onLocate(event)
        } else if (event.target === this.button) {
            console.error('Locate: ', this.state(), event, this.button);
            geoflo.map.dragPan.enable();
            if (this.state() === 'OFF') return this.locate();
            if (this.state() === 'BACKGROUND' && !this.following) return this.relocate();
            if (this.state() === 'ACTIVE_LOCK' && !this.following) return this.follow();
            this.unlocate();
        } 
    }

    /**
     * @function
     * @name onLocate
     * @memberof module:geoflo.Locate
     * @description Handles the location update event, updating the current location and firing an event with the new state.
     *
     * @param {Object} event - The event object containing location data.
     * @param {Object} event.coords - The coordinates of the current location.
     * @returns {void} This function does not return a value.
     * 
     * @author Solutegrate
     * @copyright 2025
     */
    this.onLocate = function (event) {
        if (this.state() === 'ACTIVE_LOCK' && this.locating) {
            this.locating = false;
            this.currentLocation = event.coords;
            addClasses(this.button, ['mapboxgl-ctrl-geolocate-active']);
        }

        geoflo.fire('locate.update', { locating: this.locating, coords: event.coords, state: this.state() });
    }

    /**
     * @function
     * @name onMapMove
     * @memberof module:geoflo.Locate
     * @description Handles the map movement event, updating the button classes based on the current state and conditions.
     *
     * @param {Object} event - The event object representing the map movement.
     * @returns {void} This function does not return a value.
     * 
     * @author Solutegrate
     * @copyright 2025
     */
    this.onMapMove = function (event) {
        if (!this.button || this.following || this.unlocated) return;
        if (this.state() === 'ACTIVE_LOCK') return addClasses(this.button, ['mapboxgl-ctrl-geolocate-active']);
        addClasses(this.button, ['mapboxgl-ctrl-geolocate-background']);
    }

    this.init();

    function addClasses (button, classes=[]) {
        if (!button) return;
        classes.forEach(function(c) { c ? button.classList.add(c) : false })
    }
}

export default Locate;