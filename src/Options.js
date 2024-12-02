const Options = {
    theme: 'dark',
    showLineUnits: false,
    showFeatureText: true,
    controls: {
        options: false,
        modes: false,
        utils: false,
        types: false,
        actions: false
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
        refresh: 'q',
        zoom: 'z',
        locate: 'l',
        snapping: '!',
        pinning: '@',
        routing: '#',
        exploring: '$',
        painting: '%',
        LineString: '1',
        Polygon: '2',
        Rectangle: '3',
        Circle: '4',
        Text: '5',
        Icon: '6'
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


        primarySelect: "#333333",
        primaryEdit: "#d7ef7e",
        primaryHot: "#d7ef7e",
        primaryCold: "#6fafdb",
        primarySnap: "#c5c5c5",
        primaryBase: "#c5c5c5",
        primaryDebug: "#ff7676",
        primaryVertex: "#c5c5c5",

        secondarySelect: "#d7ef7e",
        secondaryEdit: "#c5c5c5",
        secondaryHot: "#333333",
        secondaryCold: "#c5c5c5",
        secondarySnap: "#d7ef7e",
        secondaryBase: "#242424",
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
        minZoom: 12,
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