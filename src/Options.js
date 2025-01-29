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
 * @property {string} map.style - Map style. Default is 'mapbox://styles/mapbox/dark-v11'.
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
        maxPitch: 50,
        projection: 'mercator',
        style: 'mapbox://styles/mapbox/dark-v11',
        hash: true,
        extent: [[[-127.3638459,49.6212752],[-73.7295136,49.6212752],[-73.7295136,24.7473201],[-127.3638459,24.7473201],[-127.3638459,49.6212752]]],
    },
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

        primarySelect: "#d7ef7e",
        primaryEdit: "#d7ef7e",
        primaryHot: "#242424",
        primaryCold: "#333333",
        primarySnap: "#d7ef7e",
        primaryBase: "#c5c5c5",
        primaryDebug: "#ff7676",
        primaryVertex: "#d7ef7e",

        secondarySelect: "#c5c5c5",
        secondaryEdit: "#c5c5c5",
        secondaryHot: "#333333",
        secondaryCold: "#c5c5c5",
        secondarySnap: "#c5c5c5",
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
            'Select': function (event) {
                if (event.type === 'press') {
                    
                } else if (event.type === 'hold') {
                    
                } else if (event.type === 'release') {
                    event.ctx.getButtons('clear').button.click();
                }
            },
            'Start': function (event) {
                if (event.type === 'press') {
                    
                } else if (event.type === 'hold') {
                    
                } else if (event.type === 'release') {
                    if (event.gamepad.hasJoysticks) {
                        var button = event.mode.id === 'select' ? 'edit' : 'select';
                        event.ctx.getButtons(button).button.click();
                    }
                }
            },
            'Power': function (event) {
                if (event.type === 'press') {
                    
                } else if (event.type === 'hold') {
                    
                } else if (event.type === 'release') {
                    event.ctx.getButtons('save').button.click();
                }
            },
            'Menu': function (event) {
                if (event.type === 'press') {
                    
                } else if (event.type === 'hold') {
                    
                } else if (event.type === 'release') {
                    
                }
            },
            'Misc': function (event) {
                if (event.type === 'press') {
                    
                } else if (event.type === 'hold') {
                    
                } else if (event.type === 'release') {
                    if (event.gamepad.hasJoysticks) {
                        event.ctx.getButtons('zoom').button.click();
    
                        var ready = setInterval(function() {
                            if (!ctx.mapMoving) {
                                clearInterval(ready);
                                event.gamepad.map.center = event.ctx.map.getCenter();
                                event.gamepad.map.zoom = event.ctx.map.getZoom();
                            }
                        }, 1);
                    }
                }
            },
            'A': function (event) {
                if (event.type === 'press') {
                    
                } else if (event.type === 'hold') {
                    
                } else if (event.type === 'release') {
                    if (!event.gamepad.hasJoysticks) {
                        if (!event.gamepad.pressed['BumpLeft'] && !event.gamepad.pressed['BumpRight']) {
                            return this['JoyLeftClick'](event);
                        }
                    } else {
                        event.ctx.getButtons('routing').button.click();
                    }
                }
            },
            'B': function (event) {
                if (event.type === 'press') {
                    
                } else if (event.type === 'hold') {
                    
                } else if (event.type === 'release') {
                    if (!event.gamepad.hasJoysticks) {
                        if (!event.gamepad.pressed['BumpLeft'] && !event.gamepad.pressed['BumpRight']) {
                            return this['JoyRightClick'](event);
                        }
                    } else {
                        event.ctx.getButtons('painting').button.click();
                    }
                }
            },
            'Y': function (event) {
                if (event.type === 'press') {
                    if (!event.gamepad.hasJoysticks) {
                        if ((event.gamepad.pressed['BumpLeft'] || event.gamepad.pressed['BumpRight'])) event.gamepad.setSpeed(event.value, false);
                    }
                } else if (event.type === 'hold') {
                    
                } else if (event.type === 'release') {
                    if (event.gamepad.hasJoysticks) {
                        event.ctx.getButtons('snapping').button.click();
                    }
                }
            },
            'X': function (event) {
                if (event.type === 'press') {
                    if (!event.gamepad.hasJoysticks) {
                        if ((event.gamepad.pressed['BumpLeft'] || event.gamepad.pressed['BumpRight'])) event.gamepad.setSpeed(event.value, true);
                    }
                } else if (event.type === 'hold') {
                    
                } else if (event.type === 'release') {
                    if (event.gamepad.hasJoysticks) {
                        event.ctx.getButtons('pinning').button.click();
                    }
                }
            },
            'JoyLeftMove': function (event) {
                if (event.type === 'press') {
                    
                } else if (event.type === 'hold') {
                    event.gamepad.setCenter(event.value, event.gamepad.options.camera.free) // Pan map
                } else if (event.type === 'release') {
                    event.gamepad.setCenter(false, event.gamepad.options.camera.free) // Reset map center
                }
            },
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
            'JoyLeftClick': function (event) {
                if (event.type === 'press') {
                    
                } else if (event.type === 'hold') {
                    
                } else if (event.type === 'release') {
                    if (event.mode.id === 'draw') {
                        event.mode.deleteVertex();
                    }
                }
            },
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
            'TrigLeft': function (event) {
                if (event.type === 'press') {
                    
                } else if (event.type === 'hold') {
                    event.gamepad.setZoom(event.value, true);
                } else if (event.type === 'release') {
                    
                }
            },
            'TrigRight': function (event) {
                if (event.type === 'press') {
                    
                } else if (event.type === 'hold') {
                    event.gamepad.setZoom(event.value, false);
                } else if (event.type === 'release') {
                    
                }
            },
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
                        event.ctx.getButtons('Polygon').button.click();
                    }
                }
            },
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
                        event.ctx.getButtons('Circle').button.click();
                    }
                }
            },
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
                        event.ctx.getButtons('Polyline').button.click();
                    }
                }
            },
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
                        event.ctx.getButtons('Rectangle').button.click();
                    }
                }
            }
        }
    }
}

export default Options;