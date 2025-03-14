/**
 * @mixin
 * @memberof module:geoflo
 * @name Gaming
 * @description This module provides the gamepad functionality for the Geoflo application. It allows users to interact with the map using a gamepad controller.
 * @param {Object} gamepad - The gamepad object to be initialized.
 * @param {Object} options - The options for gamepad initialization. Comes from geoFlo.options.gaming.
 * @returns {Object} The current object instance.
 */
const Gaming = function (gamepad) {
    const geoflo = this.geoflo;

    if (!supported()) throw new Error('Gamepads are not supported on your browser!');
    
    const control = this;

    this.options = geoflo.options.gaming;

    const layout = {
        "select": 'Select',
        "start": 'Start',
        "power": 'Power',
        "button0": 'B',
        "button1": 'A',
        "button2": 'Y',
        "button3": 'X',
        "button4": 'BumpLeft',
        "button5": 'BumpRight',
        "button6": 'TrigLeft',
        "button7": 'TrigRight',
        "button8": 'Select',
        "button9": 'Start',
        "button10": 'JoyLeftClick',
        "button11": 'JoyRightClick',
        "button12": 'DpadUp',
        "button13": 'DpadDown',
        "button14": 'DpadLeft',
        "button15": 'DpadRight',
        "button16": 'Power',
        "button17": 'Misc',
        "up0": 'JoyLeftUp',
        "down0": 'JoyLeftDown',
        "right0": 'JoyLeftRight',
        "left0": 'JoyLeftLeft',
        "up1": 'JoyRightUp',
        "down1": 'JoyRightDown',
        "right1": 'JoyRightRight',
        "left1": 'JoyRightLeft',
        "l1": 'BumpLeft',
        "r1": 'BumpRight',
        "l2": 'TrigLeft',
        "r2": 'TrigRight'
    }


    function clamp(x, y) {
        let m = Math.sqrt(x*x + y*y); // Magnitude (length) of vector

        // If the length greater than 1, normalize it (set it to 1)
        if (m > 1) {
            x /= m;
            y /= m;
        }

        return [x, y];
    }

    function deadzone(x, y, deadzone=0.2) {
        let m = Math.sqrt(x*x + y*y);

        if (m < deadzone)
            return [0, 0];

        let over = m - deadzone;  // 0 -> 1 - DEADZONE
        let nover = over / (1 - deadzone);  // 0 -> 1

        let nx = x / m;
        let ny = y / m;

        return [nx * nover, ny * nover];
        
    }

    function request() {
        control.refresh();
        requestAnimationFrame(request);
    }

    function supported() {
        return (window.navigator.getGamepads && typeof window.navigator.getGamepads === 'function') ||
            (window.navigator.getGamepads && typeof window.navigator.webkitGetGamepads === 'function') ||
            false;
    }

    function qs(s, p) {
        if (p) {
            return p.querySelector(s);
        }
        return document.querySelector(s);
    }

    function on(eventName, callback) {
        return control.associateEvent(eventName, callback, 'action');
    }

    function after(eventName, callback) {
        return control.associateEvent(eventName, callback, 'after');
    }

    function before(eventName, callback) {
        return control.associateEvent(eventName, callback, 'before');
    }

    function addEventListeners(_this, gamepad) {
        if (!gamepad || !layout) return false;

        Object.entries(layout).forEach(function (entry) {
            var key = entry[0];
            var val = entry[1];

            before(key, function (value) { return _this.onEvent('press', key, val, value); });
            on(key, function (value) { return _this.onEvent('hold', key, val, value); });
            after(key, function (value) { return _this.onEvent('release', key, val, value); });
        })
    }

    function deepAssign(target, source, {isMutatingOk = false, isStrictlySafe = false} = {}) {
        target = isMutatingOk ? target : clone(target, isStrictlySafe);

        for (const [key, val] of Object.entries(source)) {
            if (val !== null && typeof val === `object`) {
                if (target[key] === undefined) {
                    target[key] = {};
                }
    
                target[key] = deepAssign(target[key], val, {isMutatingOk: true, isStrictlySafe});
            } else {
                target[key] = val;
            }
        }

        function clone(obj, isStrictlySafe = false) {
            try {
                return JSON.parse(JSON.stringify(obj));
            } catch(err) {
                if (isStrictlySafe) { throw new Error() }
                console.warn(`Unsafe clone of object`, obj);
                return {...obj};
            }
        }

        return target;
    }

    function calculateIntermediatePoint(point1, point2, perc) {
        var lat1 = degreesToRadians(point1[1]);
        var lng1 = degreesToRadians(point1[0]);
        var lat2 = degreesToRadians(point2[1]);
        var lng2 = degreesToRadians(point2[0]);

        var deltaLat = lat2 - lat1;
        var deltaLng = lng2 - lng1;
        
        var calcA = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) + Math.cos(lat1) * Math.cos(lat2) * Math.sin(deltaLng / 2) * Math.sin(deltaLng / 2);
        var calcB = 2 * Math.atan2(Math.sqrt(calcA), Math.sqrt(1 - calcA));
        
        var A = Math.sin((1 - perc) * calcB) / Math.sin(calcB);
        var B = Math.sin(perc * calcB) / Math.sin(calcB);
        
        var x = A * Math.cos(lat1) * Math.cos(lng1) + B * Math.cos(lat2) * Math.cos(lng2);
        var y = A * Math.cos(lat1) * Math.sin(lng1) + B * Math.cos(lat2) * Math.sin(lng2);
        var z = A * Math.sin(lat1) + B * Math.sin(lat2);
        
        var lat3 = Math.atan2(z, Math.sqrt(x * x + y * y));
        var lng3 = Math.atan2(y, x);
        
        return [radiansToDegrees(lng3), radiansToDegrees(lat3)]
    }

    function pointAtPercent(p0, p1, percent) {
        var x;
        if (p0.x !== p1.x)
            x = p0.x + percent * (p1.x - p0.x);
        else
            x = p0.x;
    
        var y;
        if (p0.y !== p1.y)
            y = p0.y + percent * (p1.y - p0.y);
        else
            y = p0.y;
    
        var p = {
            x: x,
            y: y
        };
    
        return p;
    }

    function degreesToRadians(degrees) {
        return degrees * (Math.PI / 180);
    }
        
    function radiansToDegrees(radians) {
        return radians * (180 / Math.PI );
    }

    





	/**
	 * @function
     * @memberof module:geoflo.Gaming
	 * @name init
	 * @description This function initializes the gamepad with the specified options. It fires an event to notify the gamepad initialization, sets the gamepad, adds event listeners, and requests animation frame.
	 * @param {Object} gamepad - The gamepad object to be initialized.
	 * @param {Object} options - The options for gamepad initialization.
	 * @returns {Object} The current object instance.
	 */
    this.init = function (gamepad, options) {
        if (!gamepad) return false;
        if (!this.options.enable) return console.error('Gamepad option is not enabled!')
        geoflo.map.fire(geoflo.id + ':gamepad.init', { detail: { gamepad: gamepad } });
        this.setGamepad(gamepad);
        addEventListeners(this, this.gamepad);
        requestAnimationFrame(request);
        return this;
    }

	/**
	 * @function
     * @memberof module:geoflo.Gaming
	 * @name refresh
	 * @description Refreshes the gamepad state by checking button presses, axes values, and triggers.
	 * @params {void}
	 * @returns {void}
	 */
    this.refresh = function () {
        var gamepads = window.navigator.getGamepads();

        for (var i = 0; i < gamepads.length; i++) {
            var gamepad = gamepads[this.gamepad.id];
            var j;

            if (!gamepad || !gamepad.connected) { continue; }

            for (j = 0; j < gamepad.buttons.length; j++) {
                var button = gamepad.buttons[j];
                var value = button.value;
                var name = this.gamepad.layout[`button${j}`]

                if (button.pressed) {
                    if (!this.gamepad.pressed[name]) {
                        this.gamepad.pressed[name] = true;
                        this.gamepad.buttonActions[j].before ? this.gamepad.buttonActions[j].before(value) : false;
                    }

                    this.gamepad.buttonActions[j].action ? this.gamepad.buttonActions[j].action(value) : false;
                } else if (this.gamepad.pressed[name]) {
                    delete this.gamepad.pressed[name];
                    this.gamepad.buttonActions[j].after ? this.gamepad.buttonActions[j].after(value) : false;
                }
            }

            var axesBoxCount = ((gamepad.axes.length + 1) / 2)|0;
                
            for (j = 0; j < axesBoxCount; j++) {
                var valueX, valueY, value;
                var last_odd_axis = j == axesBoxCount - 1 && gamepad.axes.length % 2 == 1;

                valueX = gamepad.axes[j*2];
                valueY = last_odd_axis ? 0 : gamepad.axes[j*2 + 1];
                [valueX, valueY] = deadzone(valueX, valueY);    
                [valueX, valueY] = clamp(valueX, valueY);
                value = [Number(valueX.toFixed(2)), Number(valueY.toFixed(2))];

                const val = gamepad.axes[j + axesBoxCount].toFixed(4);
                const axe = Math.floor(j / 2);
                this.gamepad.axeValues[axe][j % 2] = val;

                var rightTrigger = value[0] >= this.options.joystick.min;
                var leftTrigger = value[0] <= -this.options.joystick.min;
                var upTrigger = value[1] <= -this.options.joystick.min;
                var downTrigger = value[1] >= this.options.joystick.min;

                this.trigger('right', rightTrigger, j, value);
                this.trigger('left', leftTrigger, j, value);
                this.trigger('down', downTrigger, j, value);
                this.trigger('up', upTrigger, j, value);
            }
        }
    }

	/**
	 * @function
     * @memberof module:geoflo.Gaming
	 * @name trigger
	 * @description This function handles triggering actions based on gamepad input. It checks if a specific button or axis is triggered and performs corresponding actions.
	 * @param {string} id - The identifier of the gamepad input.
	 * @param {boolean} triggered - Indicates if the input is triggered.
	 * @param {number} index - The index of the input.
	 * @param {number[]} value - The value of the input.
	 */
    this.trigger = function (id, triggered, index, value) {
        var actions = this.gamepad.axesActions;
        var name = this.gamepad.layout[`${id}${index}`];
        var pressed = this.gamepad.pressed

        if (triggered) {
            if (!pressed[name]) {
                pressed[name] = true;
                actions[index][id].before ? actions[index][id].before(value) : false
            }

            value = [this.options.joystick.max * value[0], this.options.joystick.max * value[1]]
            actions[index][id].action ? actions[index][id].action(value) : false;
        } else if (pressed[name]) {
            delete pressed[name];

            if (!pressed['JoyLeftUp'] && !pressed['JoyLeftDown'] && !pressed['JoyLeftLeft'] && !pressed['JoyLeftRight']) {
                actions[0][id].after ? actions[0][id].after(value) : false;
            }

            if (!pressed['JoyRightUp'] && !pressed['JoyRightDown'] && !pressed['JoyRightLeft'] && !pressed['JoyRightRight']) {
                actions[1][id].after ? actions[1][id].after(value) : false;
            }
        }
    }

    /**
	 * @function
     * @memberof module:geoflo.Gaming
	 * @name remove
	 * @description Disconnects and removes the gamepad object.
	 * @param {Object} gamepad - The gamepad object to be disconnected and removed.
	 * @returns {void}
	 */
    this.remove = function() {
        this.gamepad.disconnect ? this.gamepad.disconnect() : false;
        this.gamepad.remove ? this.gamepad.remove() : false;
        this.gamepad = null;
    }




	/**
	 * @function
     * @memberof module:geoflo.Gaming
	 * @name setMap
	 * @description This function updates the map properties using the handleMove function and sets the center, zoom, pitch, and bearing accordingly.
	 * @param {Function} handleMove - The function used to handle map movement.
	 * @returns {Object} The updated map object with new properties.
	 */
    this.setMap = function (handleMove) {
        const map = geoflo.map;
        const transform = map.transform;
        
        this.map = this.map || {
            center: map.getCenter(),
            zoom: map.getZoom(),
            pitch: map.getPitch(),
            bearing: map.getBearing()
        }
        
        var center = this.map.center.x ? this.map.center : this.map.center.lat ? this.map.center : new mapboxgl.LngLat(this.map.center[0], this.map.center[1])
        center = center.x ? transform.pointLocation(center) : center;

        transform.center = center;
        transform.bearing = this.map.bearing;
        transform.zoom = this.map.zoom;
        transform.pitch = this.map.pitch;

        map._update();

        if (this.options.centerMarker && geoflo.centerMarker) this.setMarker();
        if (handleMove) geoflo.currentMode.handleMove({ lngLat: !this.options.camera.free ? this.map.center : map.getCenter(), gamepad: this })
        return this.map;
    }

	/**
	 * @function
     * @memberof module:geoflo.Gaming
	 * @name setContainer
	 * @description Creates a new HTML element with the specified tag name and class name, appends it to a container if provided, and sets it as the container property of the current object.
	 * @param {string} tagName - The tag name of the HTML element to create.
	 * @param {string} className - The class name to assign to the created element (optional).
	 * @param {HTMLElement} container - The container element to append the created element to (optional).
	 * @returns {HTMLElement} The created HTML element.
	 */
	
    this.setContainer = function (tagName, className, container) {
        const el = window.document.createElement(tagName);
        if (className !== undefined) el.className = className;
        if (container) container.appendChild(el);
        this.container = el;
        return el;
    }

	/**
	 * @function
     * @memberof module:geoflo.Gaming 
	 * @name setLocation
	 * @description This function updates the visibility, left, and top properties of the container element based on the provided value.
	 * @param {Array<number>} value - An array containing the x and y coordinates for the new location.
	 * @returns {DOMRect} The bounding rectangle of the container element after the location is set.
	 */
    this.setLocation = function (value) {
        this.container.style.visibility = this.options.debug ? 'visible' : 'hidden';
        this.container.style.left = (value[0] + 1) / 2 * 100 + '%';
        this.container.style.top = (value[1] + 1) / 2 * 100 + '%';
        return this.container.getBoundingClientRect();
    }

	/**
	 * @function
     * @memberof module:geoflo.Gaming
	 * @name setMarker
	 * @description Sets a marker on the map using the center coordinates provided by the context.
	 * @return {Object} Returns the marker object created on the map.
	 */
    this.setMarker = function () {
        return geoflo.setCenterMarker({ gamepad: true });
    }

	/**
	 * @function
     * @memberof module:geoflo.Gaming
	 * @name setGamepad
	 * @description Initializes a gamepad object with specific properties based on the provided gamepad input.
	 * @param {Object} gamepad - The gamepad object to be processed.
	 * @returns {Object} - The processed gamepad object with defined properties.
	 */
    this.setGamepad = function (gamepad) {
        var options = {
            type: gamepad.id,
            connected: gamepad.connected,
            id: gamepad.index,
            buttons: gamepad.buttons.length,
            layout: layout,
            axes: Math.floor(gamepad.axes.length / 2),
            axeValues: [],
            hapticActuator: null,
            vibrationMode: -1,
            vibration: false,
            mapping: gamepad.mapping,
            buttonActions: {},
            axesActions: {},
            pressed: {}
        }

        for (let x = 0; x < options.buttons; x++) {
            options.buttonActions[x] = () => ({ action: () => { }, after: () => { }, before: () => { } });
        }

        for (let x = 0; x < options.axes; x++) {
            options.axesActions[x] = {
                down: () => ({ action: () => { }, after: () => { }, before: () => { } }),
                left: () => ({ action: () => { }, after: () => { }, before: () => { } }),
                right: () => ({ action: () => { }, after: () => { }, before: () => { } }),
                up: () => ({ action: () => { }, after: () => { }, before: () => { } })
            };

            options.axeValues[x] = [0, 0];
        }

        if (gamepad.hapticActuators) {
            if (typeof gamepad.hapticActuators.pulse === 'function') {
                options.haptic = gamepad.hapticActuators;
                options.vibrationMode = 0;
                options.vibration = true;
            } else if (gamepad.hapticActuators[0] && typeof gamepad.hapticActuators[0].pulse === 'function') {
                options.haptic = gamepad.hapticActuators[0];
                options.vibrationMode = 0;
                options.vibration = true;
            }
        }
        
        if (gamepad.vibrationActuator) {
            if (typeof gamepad.vibrationActuator.playEffect === 'function') {
                options.haptic = gamepad.vibrationActuator;
                options.vibrationMode = 1;
                options.vibration = true;
            }
        }

        this.gamepad = options;
        this.hasJoysticks = options.axes > 0 && Object.values(this.gamepad.layout).map(function(m) { return m.includes('Joy') }).filter(function (b) { return b }).length > 0;
        return this.gamepad;
    }

	/**
	 * @function
     * @memberof module:geoflo.Gaming
	 * @name setCenter
	 * @description This function calculates the new center of the map based on the input values and gamepad controls. It handles both joystick and D-pad inputs to adjust the map center accordingly.
	 * @param {Object} value - The value used to calculate the new center of the map.
	 * @param {boolean} free - A boolean flag indicating if the map center should be set freely.
	 * @param {boolean} dpad - A boolean flag indicating if the D-pad controls are used for setting the map center.
	 * @returns {boolean} Returns true after setting the map center.
	 */
	
    this.setCenter = function (value, free, dpad) {
        var center = geoflo.map.getCenter();
        var pressed = this.gamepad.pressed;
        var type = this.hasJoysticks ? 'Joy' : 'Dpad';
        var diag = Object.keys(pressed).filter(function(p) { return p.includes(type) }).length > 1;
        
        var start = free || dpad ? center : false;
        start = geoflo.hotFeature && !start ? geoflo.lastMove || center : false;
        start = !start ? center : start;

        var end;
    
        if (dpad) {
            var bearing = this.map.bearing;
            bearing = pressed['Up'] ? bearing :
            pressed['Down'] ? bearing + 180 :
            pressed['Left'] ? bearing - 90 :
            pressed['Right'] ? bearing + 90 :
            bearing;

            var dest = turf.destination(turf.point(start), distance, bearing).geometry.coordinates;

            lngLats = free ? { lng: dest[1], lat: dest[0] } : dest;
        } else if (value) {
            var location = this.setLocation(value);
            var coords = location && location.x ? [location.x, location.y] : false;
            
            end = geoflo.map.unproject(coords);
            
            var percent = diag ? this.options.pan.speed / 2 : this.options.pan.speed;
            var mid = calculateIntermediatePoint([start.lng, start.lat], [end.lng, end.lat], percent)
            mid = geoflo.map.getPitch() > 60 ? calculateIntermediatePoint([start.lng, start.lat], [mid[0], mid[1]], 0.4) : mid;

            end = mid;
            geoflo.lastMove = end;
        } else {
            var coords = geoflo.hotFeature ? geoflo.hotFeature.geometry.coordinates : false;
            end = free ? geoflo.map.getCenter() :
            coords ? { lat: coords[coords.length-1][1], lng: coords[coords.length-1][0] } : geoflo.map.getCenter();
            geoflo.lastMove = false;
            this.setLocation([0, 0]);
        }

        this.map.center = end;
        return this.setMap(true);
    }
    
	/**
	 * @function
     * @memberof module:geoflo.Gaming
	 * @name setBearing
	 * @description This function updates the bearing of the map by adjusting it with the specified value and direction.
	 * @param {number | Array<number>} value - The value to adjust the bearing by. If dpad is false, it should be an array of numbers, otherwise a single number.
	 * @param {boolean} left - Indicates the direction of adjustment. If true, the bearing is decreased; otherwise, it is increased.
	 * @param {boolean} dpad - Specifies whether the value is coming from a dpad input.
	 * @returns {boolean} Returns the result of calling the setMap function after updating the bearing.
	 */
    this.setBearing = function (value, left, dpad) {
        var bearing = this.map.bearing;
        var bearingMulti = !dpad ? Math.abs(value[0]) : value;
    
        if (left) {
            bearing = bearing - (this.options.bearing.speed * bearingMulti)
        } else {
            bearing = bearing + (this.options.bearing.speed * bearingMulti)
        }

        this.map.bearing = bearing;
        return this.setMap();
    }
    
	/**
	 * @function
     * @memberof module:geoflo.Gaming
	 * @name setPitch
	 * @description This function adjusts the pitch of the map by a specified amount in the given direction.
	 * @param {number|Array<number>} value - The value or array of values to adjust the pitch by.
	 * @param {boolean} up - A boolean indicating whether the pitch should be increased (true) or decreased (false).
	 * @param {boolean} dpad - A boolean flag to determine if the value is coming from a D-pad input.
	 * @returns {boolean} Returns true if the map is successfully updated with the new pitch.
	 */
    this.setPitch = function (value, up, dpad) {
        var pitch = this.map.pitch;
        var pitchMulti = !dpad ? Math.abs(value[1]) : value;

        if (pitch < 0) pitch = 0;
        if (pitch > this.options.pitch.max) pitch = this.options.pitch.max;
    
        if (up) {
            pitch = pitch + (this.options.pitch.speed * pitchMulti);
        } else {
            pitch = pitch - (this.options.pitch.speed * pitchMulti);
        }
        
        this.map.pitch = pitch;
        return this.setMap();
    }
    
	/**
	 * @function
     * @memberof module:geoflo.Gaming
	 * @name setZoom
	 * @description This function adjusts the zoom level of a map based on the provided value and direction.
	 * @param {number} value - The amount by which to change the zoom level.
	 * @param {boolean} out - A flag indicating whether to zoom out (true) or zoom in (false).
	 * @param {boolean} dpad - A flag indicating the direction of the zoom change.
	 * @returns {boolean} - Returns the result of setting the map with the new zoom level.
	 */
    this.setZoom = function (value, out, dpad) {
        var zoom = this.map.zoom;
    
        if (out) {
            zoom = zoom - ( this.options.zoom.speed * Math.abs(value) )
        } else {
            zoom = zoom + ( this.options.zoom.speed * Math.abs(value) )
        }
        
        this.map.zoom = zoom;
        return this.setMap();
    }

	/**
	 * @function
     * @memberof module:geoflo.Gaming
	 * @name setSpeed
	 * @description This function calculates the speed of panning based on the provided value and direction. It ensures that the speed falls within the specified minimum and maximum values.
	 * @param {number} value - The value that influences the speed of panning.
	 * @param {boolean} down - A boolean flag indicating the direction of panning (true for down, false for up).
	 * @returns {number} The updated speed of panning after applying the calculations.
	 */
    this.setSpeed = function (value, down) {
        var speed = this.options.pan.speed > this.options.pan.min ?
            this.options.pan.speed :
            this.options.pan.max && this.options.pan.speed > this.options.pan.max ?
            this.options.pan.min :
            this.options.pan.min;

        speed = down ? speed - this.options.pan.min : speed + this.options.pan.min;

        speed = speed < this.options.pan.min ? this.options.pan.min :
        this.options.pan.max && speed > this.options.pan.max ? this.options.pan.max :
        speed;

        return this.options.pan.speed = speed * Math.abs(value);
    }


	/**
	 * @function
     * @memberof module:geoflo.Gaming associateEvent
	 * @name associateEvent
	 * @description This function allows the user to associate an event with a callback function for a specific button or axis on the gamepad.
	 * @param {string} eventName - The name of the event to associate with the callback function.
	 * @param {function} callback - The callback function to be executed when the event occurs.
	 * @param {string} type - The type of event (e.g., 'press', 'release') to associate with the callback function.
	 * @returns {object} The updated gamepad object with the associated event and callback function.
	 */
    this.associateEvent = function(eventName, callback, type) {
        if (eventName.match(/^button\d+$/)) {
            const buttonId = parseInt(eventName.match(/^button(\d+)$/)[1]);

            if (buttonId >= 0 && buttonId < this.gamepad.buttons) {
                this.gamepad.buttonActions[buttonId][type] = callback;
            } else {
                console.log(buttonId, 'This button is not on gamepad')
            }

        } else if (eventName === 'start') {
            this.gamepad.buttonActions[9][type] = callback;
        } else if (eventName === 'select') {
            this.gamepad.buttonActions[8][type] = callback;
        } else if (eventName === 'r1') {
            this.gamepad.buttonActions[5][type] = callback;
        } else if (eventName === 'r2') {
            this.gamepad.buttonActions[7][type] = callback;
        } else if (eventName === 'l1') {
            this.gamepad.buttonActions[4][type] = callback;
        } else if (eventName === 'l2') {
            this.gamepad.buttonActions[6][type] = callback;
        } else if (eventName === 'power') {
            if (this.gamepad.buttons >= 17) {
                this.gamepad.buttonActions[16][type] = callback;
            } else {
                error(MESSAGES.INVALID_BUTTON);
            }
        } else if (eventName.match(/^(up|down|left|right)(\d+)$/)) {
            const matches = eventName.match(/^(up|down|left|right)(\d+)$/);
            const direction = matches[1];
            const axe = parseInt(matches[2]);

            if (axe >= 0 && axe < this.gamepad.axes) {
                this.gamepad.axesActions[axe][direction][type] = callback;
            } else {
                error(MESSAGES.INVALID_BUTTON);
            }
        } else if (eventName.match(/^(up|down|left|right)$/)) {
            const direction = eventName.match(/^(up|down|left|right)$/)[1];
            this.gamepad.axesActions[0][direction][type] = callback;
        }

        return this.gamepad;
    }

    this.onInit = function (options) {
        this.initiated = true;
        this.setContainer('div', 'gamepad', geoflo.map.getContainer());
        this.setMarker();
        this.setMap();
    }

    this.onEvent = function (type, key, action, value) {
        var pressed = {[action]: true};
        var lngLat = this.options.camera.free ? geoflo.map.getCenter() : geoflo.lastMove ? geoflo.lastMove : geoflo.map.getCenter();

        var options = {
            name: action,
            type: type,
            key: key,
            value: value,
            mode: geoflo.currentMode,
            gamepad: this,
            lngLat: lngLat,
            geoflo: geoflo,
            originalEvent: {}
        }

        if (!this.initiated) this.onInit(options);

        geoflo.map.fire(geoflo.id + ':gamepad.' + type, { detail: options });

        if (pressed['JoyLeftUp'] || pressed['JoyLeftDown'] || pressed['JoyLeftLeft'] || pressed['JoyLeftRight']) this.options.mapping['JoyLeftMove'](options);
        if (pressed['JoyRightUp'] || pressed['JoyRightDown'] || pressed['JoyRightLeft'] || pressed['JoyRightRight']) this.options.mapping['JoyRightMove'](options);

        if (pressed['JoyLeftClick']) this.options.mapping['JoyLeftClick'](options);
        if (pressed['JoyRightClick']) this.options.mapping['JoyRightClick'](options);

        if (pressed['BumpLeft']) this.options.mapping['BumpLeft'](options);
        if (pressed['BumpRight']) this.options.mapping['BumpRight'](options);

        if (pressed['TrigLeft']) this.options.mapping['TrigLeft'](options);
        if (pressed['TrigRight']) this.options.mapping['TrigRight'](options);

        if (pressed['A']) this.options.mapping['A'](options);
        if (pressed['B']) this.options.mapping['B'](options);
        if (pressed['X']) this.options.mapping['X'](options);
        if (pressed['Y']) this.options.mapping['Y'](options);

        if (pressed['Start']) this.options.mapping['Start'](options);
        if (pressed['Select']) this.options.mapping['Select'](options);
        if (pressed['Power']) this.options.mapping['Power'](options);
        if (pressed['Home']) this.options.mapping['Home'](options);
        if (pressed['Misc']) this.options.mapping['Misc'](options);

        if (pressed['DpadUp']) this.options.mapping['DpadUp'](options);
        if (pressed['DpadDown']) this.options.mapping['DpadDown'](options);
        if (pressed['DpadLeft']) this.options.mapping['DpadLeft'](options);
        if (pressed['DpadRight']) this.options.mapping['DpadRight'](options);
    }

    this.onDisconnect = function (gamepad) {
        if (!gamepad || !this.gamepad) return false;
        if (this.gamepad.id !== gamepad.id) throw new Error('Gamepad id does not match!');
        this.gamepad.remove();
        this.gamepad = null;
    }


    this.init(gamepad);
};

export default Gaming;