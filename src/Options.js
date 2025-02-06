/**
 * @mixin
 * @memberof module:geoflo
 * @name Options
 * @description Options for the Geoflo map.
 * @property {string} theme - The theme of the map. Default is 'dark'.
 * @property {boolean} showLineUnits - Show line units. Default is false.
 * @property {boolean} showFeatureText - Show feature text. Default is true.
 * @property {object} controls - Controls for the map.
 * @property {boolean} controls.options - Show options control. Default is true.
 * @property {boolean} controls.modes - Show modes control. Default is true.
 * @property {boolean} controls.utils - Show utilities control. Default is true.
 * @property {boolean} controls.types - Show types control. Default is true.
 * @property {boolean} controls.actions - Show actions control. Default is true.
 * @property {object} map - Map options.
 * @property {string} map.container - Map container. Default is 'map'.
 * @property {array} map.center - Map center. Default is [-95.52816680236892, 39.56431143986035].
 * @property {number} map.zoom - Map zoom. Default is 3.5.
 * @property {number} map.maxPitch - Maximum pitch of the map. Default is 50.
 * @property {string} map.projection - Map projection. Default is 'mercator'.
 * @property {string} map.style - Map style. Default is 'Standard'.
 * @property {number} map.opacity - Map opacity. Default is 1.
 * @property {array} map.styles - Mapbox styles with title and uri.
 * @property {boolean} map.hash - Enable map hash navigation. Default is true.
 * @property {array} map.extent - Map bounding extent.
 * @property {object} keys - Keyboard shortcuts.
 * @property {string} keys.import - Import key. Default is 'u'.
 * @property {string} keys.export - Export key. Default is 'd'.
 * @property {string} keys.delete - Delete key. Default is 'Delete'.
 * @property {string} keys.cancel - Cancel key. Default is 'Escape'.
 * @property {string} keys.select - Select key. Default is 'Escape'.
 * @property {string} keys.edit - Edit key. Default is 'Enter'.
 * @property {string} keys.refresh - Refresh key. Default is 'r'.
 * @property {string} keys.snapping - Snapping key. Default is '!'.
 * @property {string} keys.pinning - Pinning key. Default is '@'.
 * @property {string} keys.routing - Routing key. Default is '#'.
 * @property {string} keys.exploring - Exploring key. Default is '$'.
 * @property {string} keys.painting - Painting key. Default is '%'.
 * @property {string} keys.polyline - Polyline key. Default is '1'.
 * @property {string} keys.polygon - Polygon key. Default is '2'.
 * @property {string} keys.rectangle - Rectangle key. Default is '3'.
 * @property {string} keys.circle - Circle key. Default is '4'.
 * @property {string} keys.text - Text key. Default is '5'.
 * @property {object} units - Measurement units for different geometries.
 * @property {string} units.Polyline - Polyline unit. Default is 'feet'.
 * @property {string} units.Polygon - Polygon unit. Default is 'acres'.
 * @property {string} units.Rectangle - Rectangle unit. Default is 'acres'.
 * @property {string} units.Icon - Icon unit. Default is 'feature'.
 * @property {string} units.Circle - Circle unit. Default is 'feature'.
 * @property {string} units.Marker - Marker unit. Default is 'feature'.
 * @property {object} colors - Color scheme settings.
 * @property {string} colors.error - Error color. Default is '#ff7676'.
 * @property {string} colors.primaryColor - Primary color. Default is '#d7ef7e'.
 * @property {string} colors.primaryBackground - Primary background color. Default is '#5a5a5a'.
 * @property {string} colors.primaryText - Primary text color. Default is '#c5c5c5'.
 * @property {string} colors.primaryBorder - Primary border color. Default is '#6fafdb'.
 * @property {string} colors.secondaryColor - Secondary color. Default is '#6fafdb'.
 * @property {string} colors.secondaryBackground - Secondary background color. Default is '#333333'.
 * @property {string} colors.secondaryText - Secondary text color. Default is '#333333'.
 * @property {object} select - Selection options.
 * @property {boolean} select.popup - Enable selection popups. Default is false.
 * @property {boolean} select.multiple - Allow multiple selection. Default is false.
 * @property {object} snapping - Snapping settings.
 * @property {boolean} snapping.enable - Enable snapping to features. Default is false.
 * @property {boolean} snapping.pixels - Pixel-based snapping. Default is false.
 * @property {number} snapping.distance - Snapping distance in kilometers.
 * @property {number} snapping.tolerance - Snapping tolerance in kilometers.
 * @property {object} routing - Routing settings.
 * @property {boolean} routing.enable - Enable routing functionality. Default is false.
 * @property {number} routing.precision - Routing coordinate precision.
 * @property {object} pinning - Pinning settings.
 * @property {boolean} pinning.enable - Enable feature pinning. Default is false.
 * @property {number} pinning.buffer - Pinning buffer distance in kilometers.
 * @property {number} pinning.idle - Idle time before updating pinned features.
 * @property {object} exploring - Exploring settings.
 * @property {boolean} exploring.enable - Enable feature exploration. Default is false.
 * @property {number} exploring.minZoom - Minimum zoom level for exploration. Default is 9.
 * @property {number} exploring.buffer - Exploration buffer distance in kilometers.
 * @property {number} exploring.tolerance - Exploration coordinate simplification tolerance.
 * @property {object} painting - Painting settings.
 * @property {boolean} painting.enable - Enable painting mode. Default is false.
 * @property {number} painting.tolerance - Painting coordinate simplification tolerance.
 * @property {object} gamepad - Gamepad configuration settings.
 * @property {boolean} gamepad.enable - Enable gamepad support. Default is true.
 * @property {boolean} gamepad.debug - Enable gamepad debugging. Default is false.
 * @property {boolean} gamepad.crosshairs - Show crosshairs on the map. Default is true.
 * @property {object} gamepad.joystick - Joystick settings.
 * @property {number} gamepad.joystick.min - Minimum joystick threshold. Default is 0.2.
 * @property {number} gamepad.joystick.max - Maximum joystick threshold. Default is 0.7.
 * @property {object} gamepad.pan - Pan settings.
 * @property {number} gamepad.pan.speed - Pan speed. Default is 0.001.
 * @property {object} gamepad.zoom - Zoom settings.
 * @property {number} gamepad.zoom.speed - Zoom speed. Default is 0.008.
 */


const Options = {
    theme: 'dark',
    showLineUnits: false,
    showFeatureText: true,
    controls: {
        options: true,
        modes: true,
        utils: true,
        types: true,
        actions: true
    },
    map: {
        container: 'map',
        center: [-95.52816680236892, 39.56431143986035],
        zoom: 3.5,
        opacity: 1,
        maxPitch: 70,
        projection: 'mercator',
        style: 'Standard',
        hash: true,
        extent: [[[-127.3638459,49.6212752],[-73.7295136,49.6212752],[-73.7295136,24.7473201],[-127.3638459,24.7473201],[-127.3638459,49.6212752]]]
    },
    styles: [
        { title: "Standard", uri: "mapbox://styles/mapbox/standard" },
        { title: "Satellite", uri: "mapbox://styles/mapbox/standard-satellite" },
        { title: "Dark", uri: "mapbox://styles/mapbox/dark-v11" },
        { title: "Light", uri: "mapbox://styles/mapbox/light-v11" },
        { title: "Outdoors", uri: "mapbox://styles/mapbox/outdoors-v12" },
        { title: "Streets", uri: "mapbox://styles/mapbox/navigation-night-v1" }
    ],
    keys: {
        import: 'u',
        export: 'd',
        delete: 'Delete',
        cancel: 'Escape',
        select: 'Escape',
        edit: 'Enter',
        refresh: 'r',
        snapping: '!',
        pinning: '@',
        routing: '#',
        exploring: '$',
        painting: '%',
        polyline: '1',
        polygon: '2',
        rectangle: '3',
        circle: '4',
        text: '5'
    },
    commands: [{
        key: '.',
        modifier: false,
        /**
         * @function
         * @name command
         * @memberof module:geoflo.Options.commands
         * @description Executes a command based on the current mode and geoflo context.
         *
         * @param {Object} event - The event object containing details about the command execution.
         * @param {Object} geoflo - The geoflo context containing map and mode information.
         * @param {string} command - The command identifier to be executed.
         * @returns {void} This function does not return a value.
         */
        command: function (event, geoflo, command) {
            var options = { lngLat: geoflo.map.getCenter() }
            
            if (geoflo.currentMode.id === 'draw') {
                geoflo.currentMode.handleUp(options); 
                geoflo.currentMode.handleClick(options);
            } else {
                geoflo.currentMode.handleClick(options);
            }
        }
    }],
    units: {
        Polyline: 'feet',
        Polygon: 'acres',
        Rectangle: 'acres',
        Icon: 'feature',
        Circle: 'feature',
        Marker: 'feature'
    },
    colors: {
        error: '#ff7676',

        primaryColor: "#d7ef7e",
        primaryBackground: "#5a5a5a",
        primaryText: "#c5c5c5",
        primaryBorder: "#6fafdb",
        
        secondaryColor: "#6fafdb",
        secondaryBackground: "#333333",
        secondaryText: "#333333",
        secondaryBorder: "#404040",

        primarySelect: "#333333",
        primaryEdit: "#d7ef7e",
        primaryHot: "#d7ef7e",
        primaryCold: "#6fafdb",
        primarySnap: "#d7ef7e",
        primaryBase: "#c5c5c5",
        primaryDebug: "#ff7676",
        primaryVertex: "#d7ef7e",

        secondarySelect: "#c5c5c5",
        secondaryEdit: "#c5c5c5",
        secondaryHot: "#242424",
        secondaryCold: "#c5c5c5",
        secondarySnap: "#6fafdb",
        secondaryBase: "#5a5a5a",
        secondaryDebug: "#d7ef7e",
        secondaryVertex: "#333333"
    },
    select: {
        popup: false,
        multiple: false
    },
    snapping: {
        enable: false, // Enables snapping to features
        pixels: false, // still working on this
        distance: 200 * 1.609344, // 200 miles to kilometers. Calculated by zoom level: (distance * Math.pow(2, Math.max(1, 19 - map.getZoom()))) / 100000
        tolerance: 0.002 // kilometers. Distance from the last click to hide/show mouse line
    },
    routing: {
        enable: false, // find shortest path
        precision: 0.0000015 // rounding coords to create topology. Higher the number will close gaps in lines and allow to find path
    },
    pinning: {
        enable: false, // Enables pinning (glueing) features together at vertices/points. When editing/dragging a point, all pinned points will move together.
        buffer: (50 / 5280) * 1.609344, // 50 feet to miles to kilometer. Pin features within a 50 foot radius. False for exact point location.
        idle: 20 // milliseconds of how long to idle after updating pinned features before checking for nearby features to snap to (helps with editing performance)
    },
    exploring: {
        enable: false,
        minZoom: 9,
        buffer: (5000 / 5280) * 1.609344, // 300 feet to miles to kilometer. Download roadways within a 300 foot radius.
        tolerance: 0.00001 // How much tolerance to simplify coordinates. Can be a function with map argument.
    },
    moving: {
        enable: false, // Enables moving feature
        distance: (3 / 5280) * 1.609344 // 3 feet to miles to kilometer. The distance in which to move the feature
    },
    painting: {
        enable: false, // Enables painting drawing for linestrings and polygons
        tolerance: 0.000005 // How much tolerance to simplify coordinates. Can be a function with map argument.
    },
    gamepad: {
        enable: true,
        debug: false,
        crosshairs: true,
        joystick: {
            min: 0.2,
            max: 0.7
        },
        camera: {
            free: true
        },
        pan: {
            speed: 0.001,
            min: 0.001,
            max: 0.05
        },
        bearing: {
            speed: 0.8
        },
        pitch: {
            speed: 1.5,
            max: 70
        },
        zoom: {
            speed: 0.008
        },
        rumble: {
            startDelay: 0,
            duration: 200,
            weakMagnitude: 1.0,
            strongMagnitude: 1.0
        },
        mapping: {
            /**
             * @function
             * @name Select
             * @memberof module:geoflo.Options.gamepad.mapping
             * @description Handles different types of events: press, hold, and release. 
             * On release, it triggers the click action for the 'clear' button.
             *
             * @param {Object} event - The event object containing details about the event.
             * @param {string} event.type - The type of the event (e.g., 'press', 'hold', 'release').
             * @param {Object} event.geoflo - The context object that contains methods related to the event.
             * @returns {void} This function does not return a value.
             * 
             * @author Solutegrate
             * @copyright 2025
             */
            'Select': function (event) {
                if (event.type === 'press') {
                    
                } else if (event.type === 'hold') {
                    
                } else if (event.type === 'release') {
                    event.geoflo.getButtons('clear').button.click();
                }
            },
            /**
             * @function
             * @name Start
             * @memberof module:geoflo.Options.gamepad.mapping
             * @description Handles different types of events such as press, hold, and release for gamepad interactions.
             *
             * @param {Object} event - The event object containing details about the input event.
             * @param {string} event.type - The type of the event (press, hold, release).
             * @param {Object} event.gamepad - The gamepad object associated with the event.
             * @param {boolean} event.gamepad.hasJoysticks - Indicates if the gamepad has joysticks.
             * @param {Object} event.mode - The current mode of the application.
             * @param {string} event.mode.id - The identifier for the current mode.
             * @param {Object} event.geoflo - The context object used to interact with the application.
             * @returns {void} This function does not return a value.
             * 
             * @author Solutegrate
             * @copyright 2025
             */
            'Start': function (event) {
                if (event.type === 'press') {
                    
                } else if (event.type === 'hold') {
                    
                } else if (event.type === 'release') {
                    if (event.gamepad.hasJoysticks) {
                        var button = event.mode.id === 'select' ? 'edit' : 'select';
                        event.geoflo.getButtons(button).button.click();
                    }
                }
            },
            /**
             * @function
             * @name Power
             * @memberof module:geoflo.Options.gamepad.mapping
             * @description Handles different types of power events such as press, hold, and release.
             *
             * @param {Object} event - The event object that contains information about the power event.
             * @param {string} event.type - The type of the event, which can be 'press', 'hold', or 'release'.
             * @param {Object} event.geoflo - The context object that provides access to UI elements.
             * @returns {void} This function does not return a value.
             * 
             * @author Solutegrate
             * @copyright 2025
             */
            'Power': function (event) {
                if (event.type === 'press') {
                    
                } else if (event.type === 'hold') {
                    
                } else if (event.type === 'release') {
                    event.geoflo.getButtons('save').button.click();
                }
            },
            /**
             * @function
             * @name Menu
             * @memberof module:geoflo.Options.gamepad.mapping
             * @description Handles different types of menu events such as press, hold, and release.
             *
             * @param {Object} event - The event object that contains information about the event.
             * @param {string} event.type - The type of the event, which can be 'press', 'hold', or 'release'.
             * @returns {void} This function does not return a value.
             * 
             * @author Solutegrate
             * @copyright 2025
             */
            'Menu': function (event) {
                if (event.type === 'press') {
                    
                } else if (event.type === 'hold') {
                    
                } else if (event.type === 'release') {
                    
                }
            },
            /**
             * @function
             * @name Misc
             * @memberof module:geoflo.Options.gamepad.mapping
             * @description Handles different types of events related to gamepad interactions, including press, hold, and release actions.
             *
             * @param {Object} event - The event object containing details about the gamepad interaction.
             * @param {string} event.type - The type of the event, which can be 'press', 'hold', or 'release'.
             * @param {Object} event.gamepad - The gamepad object associated with the event.
             * @param {boolean} event.gamepad.hasJoysticks - Indicates if the gamepad has joystick controls.
             * @param {Object} event.geoflo - The context object providing access to the map and buttons.
             * @param {Object} event.geoflo.map - The map object that contains methods for getting the center and zoom level.
             * @returns {void} This function does not return a value.
             * 
             * @author Solutegrate
             * @copyright 2025
             */
            'Misc': function (event) {
                if (event.type === 'press') {
                    
                } else if (event.type === 'hold') {
                    
                } else if (event.type === 'release') {
                    if (event.gamepad.hasJoysticks) {
                        event.geoflo.getButtons('zoom').button.click();
    
                        var ready = setInterval(function() {
                            if (!ctx.mapMoving) {
                                clearInterval(ready);
                                event.gamepad.map.center = event.geoflo.map.getCenter();
                                event.gamepad.map.zoom = event.geoflo.map.getZoom();
                            }
                        }, 1);
                    }
                }
            },
            /**
             * @function
             * @name A
             * @memberof module:geoflo.Options.gamepad.mapping
             * @description Handles different types of events such as press, hold, and release for gamepad interactions.
             *
             * @param {Object} event - The event object containing details about the gamepad interaction.
             * @param {string} event.type - The type of the event (e.g., 'press', 'hold', 'release').
             * @param {Object} event.gamepad - The gamepad object associated with the event.
             * @param {boolean} event.gamepad.hasJoysticks - Indicates if the gamepad has joysticks.
             * @param {Object} event.gamepad.pressed - An object representing the pressed buttons on the gamepad.
             * @param {Object} event.geoflo - The context object for the event.
             * @returns {Function|undefined} Returns the result of the JoyLeftClick function if certain conditions are met; otherwise, it performs a button click action or
             * returns undefined.
             * 
             * @author Solutegrate
             * @copyright 2025
             */
            'A': function (event) {
                if (event.type === 'press') {
                    
                } else if (event.type === 'hold') {
                    
                } else if (event.type === 'release') {
                    if (!event.gamepad.hasJoysticks) {
                        if (!event.gamepad.pressed['BumpLeft'] && !event.gamepad.pressed['BumpRight']) {
                            return this['JoyLeftClick'](event);
                        }
                    } else {
                        event.geoflo.getButtons('routing').button.click();
                    }
                }
            },
            /**
             * @function
             * @name B
             * @memberof module:geoflo.Options.gamepad.mapping
             * @description Handles different types of events related to a gamepad button press, hold, and release actions.
             *
             * @param {Object} event - The event object containing details about the button action.
             * @param {string} event.type - The type of the event (e.g., 'press', 'hold', 'release').
             * @param {Object} event.gamepad - The gamepad object associated with the event.
             * @param {boolean} event.gamepad.hasJoysticks - Indicates if the gamepad has joysticks.
             * @param {Object} event.gamepad.pressed - An object representing the pressed buttons on the gamepad.
             * @param {Object} event.geoflo - The context object for the event.
             * @returns {Function|undefined} Returns the result of the JoyRightClick function if certain conditions are met, otherwise returns undefined.
             * 
             * @author Solutegrate
             * @copyright 2025
             */
            'B': function (event) {
                if (event.type === 'press') {
                    
                } else if (event.type === 'hold') {
                    
                } else if (event.type === 'release') {
                    if (!event.gamepad.hasJoysticks) {
                        if (!event.gamepad.pressed['BumpLeft'] && !event.gamepad.pressed['BumpRight']) {
                            return this['JoyRightClick'](event);
                        }
                    } else {
                        event.geoflo.getButtons('painting').button.click();
                    }
                }
            },
            /**
             * @function
             * @name Y
             * @memberof module:geoflo.Options.gamepad.mapping
             * @description Handles gamepad events for pressing, holding, and releasing buttons.
             *
             * @param {Object} event - The event object containing information about the gamepad action.
             * @param {string} event.type - The type of the event (e.g., 'press', 'hold', 'release').
             * @param {Object} event.gamepad - The gamepad object that contains the state of the gamepad.
             * @param {boolean} event.gamepad.hasJoysticks - Indicates if the gamepad has joysticks.
             * @param {Object} event.gamepad.pressed - An object representing the pressed buttons on the gamepad.
             * @param {function} event.gamepad.setSpeed - A function to set the speed of the gamepad.
             * @param {Object} event.geoflo - The context object used to interact with the gamepad.
             * 
             * @author Solutegrate
             * @copyright 2025
             */
            'Y': function (event) {
                if (event.type === 'press') {
                    if (!event.gamepad.hasJoysticks) {
                        if ((event.gamepad.pressed['BumpLeft'] || event.gamepad.pressed['BumpRight'])) event.gamepad.setSpeed(event.value, false);
                    }
                } else if (event.type === 'hold') {
                    
                } else if (event.type === 'release') {
                    if (event.gamepad.hasJoysticks) {
                        event.geoflo.getButtons('snapping').button.click();
                    }
                }
            },
            /**
             * @function
             * @name X
             * @memberof module:geoflo.Options.gamepad.mapping
             * @description Handles gamepad events for press, hold, and release actions.
             *
             * @param {Object} event - The event object containing details about the gamepad action.
             * @param {string} event.type - The type of the event (e.g., 'press', 'hold', 'release').
             * @param {Object} event.gamepad - The gamepad object that contains the state of the gamepad.
             * @param {boolean} event.gamepad.hasJoysticks - Indicates if the gamepad has joysticks.
             * @param {Object} event.gamepad.pressed - An object representing the buttons that are currently pressed.
             * @param {function} event.gamepad.setSpeed - A method to set the speed of the gamepad.
             * @param {Object} event.geoflo - The context object that provides access to the gamepad's buttons.
             * @returns {void} This function does not return a value.
             * 
             * @author Solutegrate
             * @copyright 2025
             */
            'X': function (event) {
                if (event.type === 'press') {
                    if (!event.gamepad.hasJoysticks) {
                        if ((event.gamepad.pressed['BumpLeft'] || event.gamepad.pressed['BumpRight'])) event.gamepad.setSpeed(event.value, true);
                    }
                } else if (event.type === 'hold') {
                    
                } else if (event.type === 'release') {
                    if (event.gamepad.hasJoysticks) {
                        event.geoflo.getButtons('pinning').button.click();
                    }
                }
            },
            /**
             * @function
             * @name JoyLeftMove
             * @memberof module:geoflo.Options.gamepad.mapping
             * @description Handles the joystick left movement events, including press, hold, and release actions.
             *
             * @param {Object} event - The event object containing details about the joystick action.
             * @param {string} event.type - The type of the event (press, hold, or release).
             * @param {Object} event.gamepad - The gamepad object associated with the event.
             * @param {boolean} event.value - The value indicating the direction or state of the joystick.
             * @returns {void} This function does not return a value.
             * 
             * @author Solutegrate
             * @copyright 2025
             */
            'JoyLeftMove': function (event) {
                if (event.type === 'press') {
                    
                } else if (event.type === 'hold') {
                    event.gamepad.setCenter(event.value, event.gamepad.options.camera.free) // Pan map
                } else if (event.type === 'release') {
                    event.gamepad.setCenter(false, event.gamepad.options.camera.free) // Reset map center
                }
            },
            /**
             * @function
             * @name JoyRightMove
             * @memberof module:geoflo.Options.gamepad.mapping
             * @description Handles the movement of the gamepad based on the event type and name.
             *
             * @param {Object} event - The event object containing details about the input.
             * @param {string} event.type - The type of the event (e.g., 'press', 'hold', 'release').
             * @param {string} event.name - The name of the input event (e.g., 'Up', 'Down', 'Left', 'Right').
             * @param {number} event.value - The value associated with the input event.
             * @param {Object} event.gamepad - The gamepad object that handles movement.
             * @param {function} event.gamepad.setPitch - Function to set the pitch of the map.
             * @param {function} event.gamepad.setBearing - Function to set the bearing of the map.
             * @returns {void} This function does not return a value.
             * 
             * @author Solutegrate
             * @copyright 2025
             */
            'JoyRightMove': function (event) {
                if (event.type === 'press') {
                    
                } else if (event.type === 'hold') {
                    if (event.name.includes('Up') || event.name.includes('Down')) {
                        event.gamepad.setPitch(event.value, event.name.includes('Up')); // Pitch map
                    } else if (event.name.includes('Left') || event.name.includes('Right')) {
                        event.gamepad.setBearing(event.value, event.name.includes('Left')); // Rotate map
                    }
                } else if (event.type === 'release') {
                    
                }
            },
            /**
             * @function
             * @name JoyLeftClick
             * @memberof module:geoflo.Options.gamepad.mapping
             * @description Handles the left click events for drawing actions, including press, hold, and release actions.
             *
             * @param {Object} event - The event object containing details about the click action.
             * @param {string} event.type - The type of the event, which can be 'press', 'hold', or 'release'.
             * @param {Object} event.mode - The mode object associated with the event.
             * @param {string} event.mode.id - The identifier for the mode, which determines the action taken on release.
             * @returns {void} This function does not return a value.
             * 
             * @author Solutegrate
             * @copyright 2025
             */
            'JoyLeftClick': function (event) {
                if (event.type === 'press') {
                    
                } else if (event.type === 'hold') {
                    
                } else if (event.type === 'release') {
                    if (event.mode.id === 'draw') {
                        event.mode.deleteVertex();
                    }
                }
            },
            /**
             * @function
             * @name JoyRightClick
             * @memberof module:geoflo.Options.gamepad.mapping
             * @description Handles right-click events for drawing modes, processing different event types such as press, hold, and release.
             *
             * @param {Object} event - The event object containing details about the right-click action.
             * @param {string} event.type - The type of the event (e.g., 'press', 'hold', 'release').
             * @param {Object} event.mode - The current mode of the application, which includes methods for handling events.
             * @param {Object} event.lngLat - The longitude and latitude of the click location.
             * @returns {boolean} Returns false if the event does not have a valid lngLat or if the event type is not handled.
             * 
             * @author Solutegrate
             * @copyright 2025
             */
            'JoyRightClick': function (event) {
                if (event.type === 'press') {
                    if (event.mode.id === 'draw') {
                        if (!event.lngLat) return false;
                        return event.mode.handleDown(event);
                    }
                } else if (event.type === 'hold') {
                    
                } else if (event.type === 'release') {
                    if (!event.lngLat) return false;
    
                    if (event.mode.id === 'draw') {
                        event.mode.handleUp(event); 
                        event.mode.handleClick(event);
                    } else {
                        event.mode.handleClick(event);
                    }
                }
            },
            /**
             * @function
             * @name BumpLeft
             * @memberof module:geoflo.Options.gamepad.mapping
             * @description Handles the bump left action based on the event type and gamepad state.
             *
             * @param {Object} event - The event object containing information about the action.
             * @param {string} event.type - The type of the event (e.g., 'press', 'hold', 'release').
             * @param {Object} event.gamepad - The gamepad object associated with the event.
             * @param {boolean} event.gamepad.hasJoysticks - Indicates if the gamepad has joysticks.
             * @param {Object} event.gamepad.pressed - An object representing the buttons pressed on the gamepad.
             * @param {function} event.gamepad.setSpeed - A function to set the speed of the gamepad.
             * @param {number} event.value - The value to be used for setting the speed.
             * @returns {boolean|undefined} Returns false if the right bump is pressed without joysticks, otherwise returns the result of setSpeed.
             * 
             * @author Solutegrate
             * @copyright 2025
             */
            'BumpLeft': function (event) {
                if (event.type === 'press') {
                    if (!event.gamepad.hasJoysticks) {
                        if (event.gamepad.pressed['BumpRight']) return false
                    } else {
                        return event.gamepad.setSpeed(event.value, true); // Pan speed down
                    }
                } else if (event.type === 'hold') {
                    if (!event.gamepad.hasJoysticks) {
    
                    }
                } else if (event.type === 'release') {
                    
                }
            },
            /**
             * @function
             * @name BumpRight
             * @memberof module:geoflo.Options.gamepad.mapping
             * @description Handles the bump right action based on the event type and gamepad state.
             *
             * @param {Object} event - The event object containing information about the action.
             * @param {string} event.type - The type of the event (e.g., 'press', 'hold', 'release').
             * @param {Object} event.gamepad - The gamepad object associated with the event.
             * @param {boolean} event.gamepad.hasJoysticks - Indicates if the gamepad has joysticks.
             * @param {Object} event.gamepad.pressed - The current pressed buttons on the gamepad.
             * @param {function} event.gamepad.setSpeed - Function to set the speed of the gamepad.
             * @param {number} event.value - The value to set the speed to.
             * @returns {boolean} Returns false if the left bump is pressed and no joysticks are present, otherwise returns the result of setting the speed.
             * 
             * @author Solutegrate
             * @copyright 2025
             */
            'BumpRight': function (event) {
                if (event.type === 'press') {
                    if (!event.gamepad.hasJoysticks) {
                        if (event.gamepad.pressed['BumpLeft']) return false
                    } else {
                        return event.gamepad.setSpeed(event.value, false); // Pan speed down
                    }
                } else if (event.type === 'hold') {
                    
                } else if (event.type === 'release') {
                    
                }
            },
            /**
             * @function
             * @name TrigLeft
             * @memberof module:geoflo.Options.gamepad.mapping
             * @description Handles different types of events related to gamepad input, specifically press, hold, and release actions.
             *
             * @param {Object} event - The event object containing information about the gamepad input.
             * @param {string} event.type - The type of event, which can be 'press', 'hold', or 'release'.
             * @param {number} event.value - The value associated with the event, used when the event type is 'hold'.
             * @param {Object} event.gamepad - The gamepad object that provides methods for interaction.
             * @returns {void} This function does not return a value.
             * 
             * @author Solutegrate
             * @copyright 2025
             */
            'TrigLeft': function (event) {
                if (event.type === 'press') {
                    
                } else if (event.type === 'hold') {
                    event.gamepad.setZoom(event.value, true);
                } else if (event.type === 'release') {
                    
                }
            },
            /**
             * @function
             * @name TrigRight
             * @memberof module:geoflo.Options.gamepad.mapping
             * @description Handles different types of events related to gamepad interactions, including press, hold, and release actions.
             *
             * @param {Object} event - The event object containing details about the interaction.
             * @param {string} event.type - The type of the event (e.g., 'press', 'hold', 'release').
             * @param {number} event.value - The value associated with the event, used when the event type is 'hold'.
             * @param {Object} event.gamepad - The gamepad object that provides methods for interaction.
             * @returns {void} This function does not return a value.
             * 
             * @author Solutegrate
             * @copyright 2025
             */
            'TrigRight': function (event) {
                if (event.type === 'press') {
                    
                } else if (event.type === 'hold') {
                    event.gamepad.setZoom(event.value, false);
                } else if (event.type === 'release') {
                    
                }
            },
            /**
             * @function
             * @name DpadUp
             * @memberof module:geoflo.Options.gamepad.mapping
             * @description Handles the D-pad up input events for gamepad controls, managing different actions based on the event type.
             *
             * @param {Object} event - The event object containing details about the input event.
             * @param {string} event.type - The type of the event (e.g., 'press', 'hold', 'release').
             * @param {Object} event.gamepad - The gamepad object associated with the event.
             * @param {boolean} event.gamepad.hasJoysticks - Indicates if the gamepad has joysticks.
             * @param {Object} event.gamepad.pressed - An object representing the buttons currently pressed on the gamepad.
             * @param {function} event.gamepad.setPitch - Function to set the pitch based on the event value.
             * @param {function} event.gamepad.setCenter - Function to set the center based on the event value and camera options.
             * @param {Object} event.geoflo - The context object for accessing gamepad buttons.
             * @param {Object} event.geoflo.getButtons - Function to retrieve button states.
             * @param {Object} event.value - The value associated with the event.
             * @returns {void} This function does not return a value.
             * 
             * @author Solutegrate
             * @copyright 2025
             */
            'DpadUp': function (event) {
                if (event.type === 'press') {
                    
                } else if (event.type === 'hold') {
                    if (!event.gamepad.hasJoysticks) {
                        if (event.gamepad.pressed['BumpLeft'] && event.gamepad.pressed['BumpRight']) {
                            event.gamepad.setPitch(event.value, true); // Pitch map
                        } else {
                            event.gamepad.setCenter(event.value, event.gamepad.options.camera.free) // Pan map
                        }
                    }
                } else if (event.type === 'release') {
                    if (event.gamepad.hasJoysticks) {
                        event.geoflo.getButtons('Polygon').button.click();
                    }
                }
            },
            /**
             * @function
             * @name DpadDown
             * @memberof module:geoflo.Options.gamepad.mapping
             * @description Handles the D-pad down input event for gamepad controls, managing different actions based on the event type.
             *
             * @param {Object} event - The event object containing information about the input event.
             * @param {string} event.type - The type of the event (e.g., 'press', 'hold', 'release').
             * @param {Object} event.gamepad - The gamepad object that contains the state of the gamepad.
             * @param {boolean} event.gamepad.hasJoysticks - Indicates if the gamepad has joystick controls.
             * @param {Object} event.gamepad.pressed - An object representing the buttons currently pressed on the gamepad.
             * @param {Function} event.gamepad.setPitch - Function to set the pitch based on the event value.
             * @param {Function} event.gamepad.setCenter - Function to set the center based on the event value and camera options.
             * @param {Object} event.geoflo - The context object for the gamepad.
             * @param {Object} event.geoflo.getButtons - Function to retrieve button states.
             * @param {Object} event.geoflo.getButtons('Circle') - The button object for the 'Circle' button.
             * @param {Function} event.geoflo.getButtons('Circle').button.click - Function to simulate a button click.
             * @returns {void} This function does not return a value.
             * 
             * @author Solutegrate
             * @copyright 2025
             */
            'DpadDown': function (event) {
                if (event.type === 'press') {
                    
                } else if (event.type === 'hold') {
                    if (!event.gamepad.hasJoysticks) {
                        if (event.gamepad.pressed['BumpLeft'] && event.gamepad.pressed['BumpRight']) {
                            event.gamepad.setPitch(event.value, false); // Pitch map
                        } else {
                            event.gamepad.setCenter(event.value, event.gamepad.options.camera.free) // Pan map
                        }
                    }
                } else if (event.type === 'release') {
                    if (event.gamepad.hasJoysticks) {
                        event.geoflo.getButtons('Circle').button.click();
                    }
                }
            },
            /**
             * @function
             * @name DpadLeft
             * @memberof module:geoflo.Options.gamepad.mapping
             * @description Handles the D-pad left input events for a gamepad, processing press, hold, and release actions.
             *
             * @param {Object} event - The event object containing details about the input action.
             * @param {string} event.type - The type of the event (press, hold, or release).
             * @param {Object} event.gamepad - The gamepad object associated with the event.
             * @param {boolean} event.gamepad.hasJoysticks - Indicates if the gamepad has joysticks.
             * @param {Object} event.gamepad.pressed - An object representing the buttons currently pressed on the gamepad.
             * @param {Function} event.gamepad.setBearing - Function to set the bearing of the map.
             * @param {Function} event.gamepad.setCenter - Function to set the center of the map.
             * @param {Object} event.gamepad.options - Options related to the gamepad.
             * @param {Object} event.geoflo - The context object for the gamepad.
             * @returns {void} This function does not return a value.
             * 
             * @author Solutegrate
             * @copyright 2025
             */
            'DpadLeft': function (event) {
                if (event.type === 'press') {
                    
                } else if (event.type === 'hold') {
                    if (!event.gamepad.hasJoysticks) {
                        if (event.gamepad.pressed['BumpLeft'] && event.gamepad.pressed['BumpRight']) {
                            event.gamepad.setBearing(event.value, true); // Rotate map
                        } else {
                            event.gamepad.setCenter(event.value, event.gamepad.options.camera.free) // Pan map
                        }
                    }
                } else if (event.type === 'release') {
                    if (event.gamepad.hasJoysticks) {
                        event.geoflo.getButtons('Polyline').button.click();
                    }
                }
            },
            /**
             * @function
             * @name DpadRight
             * @memberof module:geoflo.Options.gamepad.mapping
             * @description Handles the D-pad right input events for gamepad controls, managing actions based on the type of event (press, hold, release).
             *
             * @param {Object} event - The event object containing details about the input event.
             * @param {string} event.type - The type of the event (press, hold, release).
             * @param {Object} event.gamepad - The gamepad object that contains the state of the gamepad.
             * @param {boolean} event.gamepad.hasJoysticks - Indicates if the gamepad has joystick controls.
             * @param {Object} event.gamepad.pressed - An object representing the buttons currently pressed on the gamepad.
             * @param {Function} event.gamepad.setBearing - Function to set the bearing of the map.
             * @param {Function} event.gamepad.setCenter - Function to set the center of the map.
             * @param {Object} event.gamepad.options - Options for the gamepad.
             * @param {Object} event.geoflo - The context object for the gamepad.
             * @returns {void} This function does not return a value.
             * 
             * @author Solutegrate
             * @copyright 2025
             */
            'DpadRight': function (event) {
                if (event.type === 'press') {
                    
                } else if (event.type === 'hold') {
                    if (!event.gamepad.hasJoysticks) {
                        if (event.gamepad.pressed['BumpLeft'] && event.gamepad.pressed['BumpRight']) {
                            event.gamepad.setBearing(event.value, false); // Rotate map
                        } else {
                            event.gamepad.setCenter(event.value, event.gamepad.options.camera.free) // Pan map
                        }
                    }
                } else if (event.type === 'release') {
                    if (event.gamepad.hasJoysticks) {
                        event.geoflo.getButtons('Rectangle').button.click();
                    }
                }
            }
        }
    }
}

export default Options;