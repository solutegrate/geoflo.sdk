const events = [
    'contextmenu',
    'map.enable',
    'map.disable',
    'map.ready',
    'map.redraw',
    'map.refresh',
    'mode.change',
    'theme.change',
    'sources.add',
    'source.add',
    'source.hot',
    'layers.add',
    'layers.remove',
    'layer.add',
    'control.add',
    'control.remove',
    'features.zoom',
    'features.add',
    'features.removeAll',
    'features.remove',
    'features.update',
    'features.import',
    'features.export',
    'features.offset',
    'features.hide',
    'features.show',
    'feature.add',
    'feature.remove',
    'feature.select',
    'feature.deselect',
    'feature.update',
    'feature.history',
    'select.load',
    'select.add',
    'select.remove',
    'select.activate',
    'select.deactivate',
    'draw.activate',
    'draw.deactivate',
    'draw.start',
    'draw.finish',
    'draw.cancel',
    'mesh.load',
    'text.add',
    'icon.add',
    'vertex.find',
    'vertex.on',
    'vertex.off',
    'vertex.add',
    'vertex.drag',
    'vertex.dragsnap',
    'vertex.delete',
    'overpass.add',
    'snapping.activate',
    'snapping.deactivate',
    'snapping.add',
    'snapping.refresh',
    'snapping.delete',
    'pinning.activate',
    'pinning.deactivate',
    'pinning.add',
    'pinning.update',
    'routing.activate',
    'routing.deactivate',
    'routing.add',
    'painting.activate',
    'painting.deactivate',
    'painting.start',
    'painting.update',
    'gamepad.init',
    'gamepad.add',
    'gamepad.remove',
    'gamepad.hold',
    'gamepad.press',
    'gamepad.release',
    'gamepad.connect',
    'gamepad.disconnect',
    'locate.on',
    'locate.off',
    'locate.update'
]

/**
 * @mixin
 * @memberof module:geoflo
 * @name Events
 * @description This module handles various map and user interaction events for the geoflo application.
 * @param {Object} geoflo - The geoflo instance to which the events are bound.
 * @returns {Object} An object containing methods to add and remove event listeners.
 * @function addEventListeners - Adds event listeners to the map and other elements.
 * @function removeEventListeners - Removes event listeners from the map and other elements.
 */

const Events = function (geoflo) {
    /**
     * @function
     * @memberof module:geoflo.Events
     * @name mapMoveStart
     * @description Handles the `movestart` event on the map.
     * @param {Object} event - The event object containing map movement details.
     */
    const mapMoveStart = function (event) {
        geoflo.mapMoving = event;
        if (geoflo.settingExtent) return;
        if (geoflo.locate) geoflo.locate.onMapMove(event);
        geoflo.setIcon(event);
    };

    /**
     * @function
     * @memberof module:geoflo.Events
     * @name mapMoving
     * @description Handles the `move` event on the map, updating icons and tracking movements.
     * @param {Object} event - The event object containing map movement details.
     */
    const mapMoving = function (event) {
        geoflo.mapMoving = event;
        if (geoflo.settingExtent) return;
        geoflo.setIcon(event);
        geoflo.setCenterMarker();
        geoflo.locate && geoflo.locate.following ? geoflo.setMapClass('disable') : false;
    };

    /**
     * @function
     * @memberof module:geoflo.Events
     * @name mapMoveEnd
     * @description Handles the `moveend` event on the map, updating icons and tracking movements.
     * @param {Object} event - The event object containing map movement details.
     */
    const mapMoveEnd = function (event) {
        geoflo.mapMoving = false;
        if (geoflo.settingExtent) return;
        if (geoflo.locate) geoflo.locate.onMapMove(event);
        geoflo.setIcon(event);
    };

    /**
     * @function
     * @memberof module:geoflo.Events
     * @name mouseMove
     * @description Handles the `mousemove` event on the map, updating icons and tracking movements.
     * @param {Object} event - The event object containing mouse movement details.
     */
    const mouseMove = function (event) {
        var painting = geoflo.options.painting && geoflo.options.painting.enable;
        painting = painting && geoflo.currentMode && geoflo.currentMode.id === 'draw';
        
        geoflo.locate && geoflo.locate.following ? geoflo.setMapClass('disable') :
        geoflo.dragMoving ? geoflo.setMapClass('grabbing') :
        geoflo.addingVertexOnLine || geoflo.canAddVertex ? geoflo.setMapClass('pointer') :
        geoflo.canDragMove ? geoflo.setMapClass('grab') :
        painting? geoflo.setMapClass('painting') :
        geoflo.setMapClass('pointer');

        geoflo.lastMouseEvent = event;
        if (!geoflo.currentMode) return;
        geoflo.currentMode.handleMove ? geoflo.currentMode.handleMove(event) : false;
    };

    /**
     * @function
     * @memberof module:geoflo.Events
     * @name mouseDown
     * @description Handles the `mousedown` event on the map, updating icons and tracking movements.
     * @param {Object} event - The event object containing mouse movement details.
     */
    const mouseDown = function (event) {
        var painting = geoflo.options.painting && geoflo.options.painting.enable;
        painting = painting && geoflo.currentMode && geoflo.currentMode.id === 'draw';
        
        geoflo.locate && geoflo.locate.following ? geoflo.setMapClass('disable') :
        painting? geoflo.setMapClass('painting') :
        geoflo.dragMoving ? geoflo.setMapClass('grabbing') :
        geoflo.addingVertexOnLine ? geoflo.setMapClass('grabbing') :
        geoflo.canDragMove ? geoflo.setMapClass('grab') :
        geoflo.lastClick ? geoflo.setMapClass('grabbing') :
        geoflo.setMapClass('pointer');
        
        geoflo.mouseIsDown = [event.lngLat.lng, event.lngLat.lat];
        geoflo.currentMode.handleDown ? geoflo.currentMode.handleDown(event) : false;
    };    
    
    /**
     * @function
     * @memberof module:geoflo.Events
     * @name mouseUp
     * @description Handles the `mouseup` event on the map, updating icons and tracking movements.
     * @param {Object} event - The event object containing mouse movement details.
     */
    const mouseUp = function (event) {
        geoflo.mouseIsDown = false;
        geoflo.locate && geoflo.locate.following ? geoflo.setMapClass('disable') : geoflo.setMapClass('pointer');
        geoflo.currentMode.handleUp ? geoflo.currentMode.handleUp(event) : false;
    };

    
    /**
     * @function
     * @memberof module:geoflo.Events
     * @name mouseClick
     * @description Handles the `click` event on the map, updating icons and tracking movements.
     * @param {Object} event - The event object containing mouse movement details.
     */
    const mouseClick = async function (event) {
        if (event.type.includes('preclick')) return geoflo.currentMode.handlePreclick ? geoflo.currentMode.handlePreclick(event) : false;
        geoflo.currentMode.handleClick ? geoflo.currentMode.handleClick(event) : false;
    };

    
    /**
     * @function
     * @memberof module:geoflo.Events
     * @name mouseDrag
     * @description Handles the `drag` event on the map, updating icons and tracking movements.
     * @param {Object} event - The event object containing mouse movement details.
     */
    const mouseDrag = function (event) {
        geoflo.locate && geoflo.locate.following ? geoflo.setMapClass('disable') :
        geoflo.dragMoving ? geoflo.setMapClass('grabbing') :
        geoflo.canDragMove ? geoflo.setMapClass('grab') :
        geoflo.setMapClass('move');

        geoflo.currentMode.handleDrag ? geoflo.currentMode.handleDrag(event) : false;
    };

    /**
     * @function
     * @memberof module:geoflo.Events
     * @name mouseleave
     * @description Handles the `mouseleave` event on the map, updating icons and tracking movements.
     * @param {Object} event - The event object containing mouse movement details.
     */
    const mouseleave = function (event) {
        if (!geoflo.currentMode) return;
        geoflo.currentMode.handleOffMap ? geoflo.currentMode.handleOffMap(event) : false;
    };

    /**
     * @function
     * @memberof module:geoflo.Events
     * @name mouseover
     * @description Handles the `mouseover` event on the map, updating icons and tracking movements.
     * @param {Object} event - The event object containing mouse movement details.
     */
    const mouseover = function (event) {
        if (!geoflo.currentMode) return;
        geoflo.currentMode.handleOnMap ? geoflo.currentMode.handleOnMap(event) : false;
    };

    /**
     * @function
     * @memberof module:geoflo.Events
     * @name keypress
     * @description Handles the `keypress` event on the map, updating icons and tracking movements.
     * @param {Object} event - The event object containing keypress details.
     */
    const keypress = function (event) {
        if (geoflo.textMarker) return;
        
        console.log("keycode: ", event.keyCode, " =>", event.key, " | Code:", event.code, " Event:", event);
        const buttonOptions = geoflo.getButtons();

        let keyHandled = false;

        Object.keys(buttonOptions).forEach((buttonId) => {
            const option = buttonOptions[buttonId];
            const key = geoflo.options.keys[buttonId];

            if (key === event.key) {
                option.button.click();
                keyHandled = true;
            } else if (key === event.keyCode) {
                option.button.click();
                keyHandled = true;
            } else if (option.keycode && option.keycode === event.keyCode) {
                option.button.click();
                keyHandled = true;
            }
        });

        if (geoflo.options.commands) {
            geoflo.options.commands.forEach(function (c) {
                if (c.key === event.keyCode || c.key === event.key || c.key === event.code) {
                    if (!c.command || typeof c.command !== 'function') return;
                    c.command(event, geoflo, c);
                    keyHandled = true;
                }
            })
        }

        if (keyHandled) return keyHandled;

        if (event.key.includes('Arrow')) {}

        geoflo.currentKeyPress = event.key;

        switch (event.code) {
            case "Enter": {
                geoflo.setMode();
                break;
            }
            case "NumpadEnter": {
                geoflo.setMode();
                break;
            }
            case "Escape": {
                geoflo.hotFeature = null;
                geoflo.setMode();
                break;
            }
            case "Home": {
                geoflo.moveSelectedFeatures(1);
                break;
            }
            case "End": {
                geoflo.moveSelectedFeatures(-1);
                break;
            }
            case "Delete": {
                if (geoflo.mode === geoflo.statics.constants.modes.SELECT) {
                    if (geoflo.hasSelection()) { geoflo.removeSelection(); }
                } else if (geoflo.mode === geoflo.statics.constants.modes.DRAW) {
                    geoflo.currentMode.deleteVertex();
                }
                break;
            }
        }
    };

    /**
     * @function
     * @memberof module:geoflo.Events
     * @name keyrelease
     * @description Handles the `keyrelease` event on the map, updating icons and tracking movements.
     * @param {Object} event - The event object containing keypress details.
     */
    const keyrelease = function (event) {
        console.log("keyrelease: ", event);
        geoflo.currentKeyPress = false;
    };

    /**
     * @function
     * @memberof module:geoflo.Events
     * @name touchstart
     * @description Handles the touchstart event by delegating to the current mode's handleTouch method if it exists.
     * @param {Event} event - The touchstart event object.
     */
    const touchstart = function (event) {
        geoflo.currentMode.handleTouch ? geoflo.currentMode.handleTouch(event) : false;
    };

    /**
     * @function
     * @name touchend
     * @memberof module:geoflo.Events
     * @description Handles the touchend event by invoking the handleTouch method of the current mode if it exists.
     *
     * @param {Event} event - The touchend event object.
     * @returns {boolean} Returns false if the handleTouch method does not exist; otherwise, it returns undefined.
     */
    const touchend = function (event) {
        geoflo.currentMode.handleTouch ? geoflo.currentMode.handleTouch(event) : false;
    };
    
    /**
     * @function
     * @name touchmove
     * @memberof module:geoflo.Events
     * @description Handles the touchmove event by invoking the handleTouch method of the current mode if it exists.
     *
     * @param {Event} event - The touchmove event object.
     * @returns {boolean} Returns false if the handleTouch method does not exist.
     */
    const touchmove = function (event) {
        geoflo.currentMode.handleTouch ? geoflo.currentMode.handleTouch(event) : false;
    };

    /**
     * @function
     * @name touchcancel
     * @memberof module:geoflo.Events
     * @description Handles the touch cancel event by invoking the handleTouch method of the current mode if it exists.
     *
     * @param {Event} event - The touch cancel event object.
     * @returns {boolean} Returns false if the handleTouch method does not exist; otherwise, it returns the result of the handleTouch method.
     */
    const touchcancel = function (event) {
        geoflo.currentMode.handleTouch ? geoflo.currentMode.handleTouch(event) : false;
    };

    /**
     * @function
     * @name gamepadconnected
     * @memberof module:geoflo.Events
     * @description Handles the event when a gamepad is connected and adds it to the geoflo instance.
     *
     * @param {Event} event - The event object containing information about the connected gamepad.
     * @returns {void} This function does not return a value.
     */
    const gamepadconnected = function (event) {
        const gamepad = event.gamepad || event.detail.gamepad;
        if (!geoflo.license || !geoflo.license.enabled || !geoflo.premiumModules) throw new Error('GeoFlo Premium Required!');
        geoflo.gamepads[gamepad.index] = new geoflo.premiumModules.Gaming(gamepad);
        geoflo.fire('gamepad.add', { gamepad: gamepad });
    };

    /**
     * @function
     * @name gamepaddisconnected
     * @memberof module:geoflo.Events
     * @description Handles the event when a gamepad is disconnected and removes it from the geoflo system.
     *
     * @param {Event} event - The event object containing information about the disconnected gamepad.
     * @returns {void} This function does not return a value.
     */
    const gamepaddisconnected = function (event) {
        const gamepad = event.gamepad || event.detail.gamepad;
        if (!geoflo.gamepads[gamepad.index]) return false;
        geoflo.gamepads[gamepad.index].onDisconnect(gamepad);
        delete geoflo.gamepads[gamepad.index]
        geoflo.fire('gamepad.remove', { gamepad: gamepad });
    };

    /**
     * @function
     * @name handleOrientation
     * @memberof module:geoflo.Events
     * @description Updates the orientation of the geoflo object based on the device's orientation event.
     *
     * @param {Event} event - The orientation event containing alpha, beta, and gamma values.
     * @returns {void} This function does not return a value.
     */
    const handleOrientation = function (event) {
        geoflo.updateOrientation({
            alpha: event.alpha,
            beta: event.beta,
            gamma: event.gamma
        })
    };

    /**
     * @function
     * @name dragStart
     * @memberof module:geoflo.Events
     * @description Handles the drag start event for an element.
     *
     * @param {Event} event - The event object representing the drag start event.
     * @returns {void} This function does not return a value.
     */
    const dragStart = function (event) {
        //if (geoflo.locate && geoflo.locate.following) return event.originalEvent.preventDefault();
    };

    /**
     * @function
     * @name rotatePitch
     * @memberof module:geoflo.Events
     * @description Adjusts the map's pitch based on the provided event, setting the map class to 'grabbing', updating the icon, and repositioning the center marker.
     *
     * @param {Object} event - The event object that contains information about the interaction.
     * @returns {void} This function does not return a value.
     */
    const rotatePitch = function (event) {
        geoflo.setMapClass('grabbing');
        geoflo.setIcon(event);
        geoflo.setCenterMarker({ transform: true });
    };



    /**
     * @function
     * @name fireEvent
     * @memberof module:geoflo.Events
     * @description Triggers a custom event on the geoflo map based on the provided event object.
     *
     * @param {Object} event - The event object containing details about the event.
     * @param {string} event.type - The type of the event, which includes the action and target information.
     * @param {Object} event.detail - Additional details associated with the event.
     * @returns {void} This function does not return a value.
     */
    const fireEvent = function fireEvent (event) {
        const name = event.type.split(':')[1];
        
        const detail = {
            data: event.detail,
            type: name.split('.')[0],
            action: name.split('.')[1],
            target: geoflo,
        }

        const details = { name: name, detail: detail };
        geoflo.map.fire(geoflo.id, details);
    }

    /**
     * @function
     * @name contextMenu
     * @memberof module:geoflo.Events
     * @description Handles the context menu event by invoking the current mode's context handling function if it exists.
     *
     * @param {Event} event - The event object representing the context menu event.
     * @returns {boolean} Returns false if the current mode does not have a context handler.
     */
    const contextMenu = function (event) {
        geoflo.currentMode.handleContext ? geoflo.currentMode.handleContext(event) : false;
        geoflo.fire('contextmenu', event);
    }

    /**
     * @function
     * @name sourceData
     * @memberof module:geoflo.Events
     * @description Processes the source data from an event and triggers an action based on the source ID.
     *
     * @param {Object} event - The event object containing source data.
     * @param {string} event.sourceDataType - The type of the source data.
     * @param {string} event.sourceId - The ID of the source.
     * @param {Object} event.source - The source object containing data.
     * @param {string} event.type - The type of the event.
     * @returns {boolean} Returns false if the source data type is invalid or if the source ID is not present; otherwise, it triggers an event based on the source ID.
     */
    const sourceData = function (event) {
        if (!event.sourceDataType || !event.sourceDataType === 'content' || !event.sourceId) return false;
        const id = event.sourceId;

        const detail = {
            id: id,
            data: event.source.data,
            type: event.type,
            target: geoflo,
        }

        id === geoflo.statics.constants.sources.HOT ? geoflo.fire('source.hot', detail) : false;
    }

    

    /**
     * @function
     * @name addEventListeners
     * @memberof module:geoflo.Events
     * @description Attaches various event listeners to the map and container for handling user interactions and map events.
     *
     * @returns {void} This function does not return a value.
     */
    function addEventListeners () {
        geoflo.map.on("movestart", mapMoveStart);
        geoflo.map.on("move", mapMoving);
        geoflo.map.on("moveend", mapMoveEnd);
        geoflo.map.on("mousemove", mouseMove);

        geoflo.map.on('preclick', mouseClick);
        geoflo.map.on('click', mouseClick);
        geoflo.map.on('tap', mouseClick);

        geoflo.map.on('dragstart', dragStart);
        geoflo.map.on('drag', mouseDrag);
        geoflo.map.on('mousedown', mouseDown);
        geoflo.map.on('mouseup', mouseUp);

        geoflo.map.on('rotatestart', rotatePitch);
        geoflo.map.on('pitchstart', rotatePitch);
        geoflo.map.on('rotate', rotatePitch);
        geoflo.map.on('pitch', rotatePitch);

        geoflo.map.on('touchstart', touchstart);
        geoflo.map.on('touchend', touchend);
        geoflo.map.on('touchmove', touchmove);
        geoflo.map.on('touchcancel', touchcancel);

        geoflo.map.on('contextmenu', contextMenu);
        geoflo.map.on('sourcedata', sourceData);

        events.forEach(function(event) { geoflo.map.on(geoflo.id + ':' + event, fireEvent); })

        geoflo.container.addEventListener('keydown', keypress);
        geoflo.container.addEventListener('keyup', keyrelease);
        geoflo.container.addEventListener('mouseover', mouseover);
        geoflo.container.addEventListener('mouseleave', mouseleave);

        window.addEventListener("gamepadconnected", gamepadconnected);
        window.addEventListener("gamepaddisconnected", gamepaddisconnected);
        window.addEventListener("deviceorientation", handleOrientation, true);
    }

    /**
     * @function
     * @name removeEventListeners
     * @memberof module:geoflo.Events
     * @description Removes various event listeners from the map and container to prevent further interactions.
     *
     * @returns {void} This function does not return a value.
     */
    function removeEventListeners () {
        geoflo.map.off("movestart", mapMoveStart);
        geoflo.map.off("move", mapMoving);
        geoflo.map.off("moveend", mapMoveEnd);
        geoflo.map.off("mousemove", mouseMove);

        geoflo.map.off('preclick', mouseClick);
        geoflo.map.off('click', mouseClick);
        geoflo.map.off('tap', mouseClick);

        geoflo.map.off('dragstart', dragStart);
        geoflo.map.off('drag', mouseDrag);
        geoflo.map.off('mousedown', mouseDown);
        geoflo.map.off('mouseup', mouseUp);

        geoflo.map.off('rotatestart', rotatePitch);
        geoflo.map.off('pitchstart', rotatePitch);

        geoflo.map.off('touchstart', touchstart);
        geoflo.map.off('touchend', touchend);
        geoflo.map.off('touchmove', touchmove);
        geoflo.map.off('touchcancel', touchcancel);
        
        geoflo.map.off('contextmenu', contextMenu);
        geoflo.map.off('sourcedata', sourceData);

        events.forEach(function(event) { geoflo.map.off(geoflo.id + ':' + event, fireEvent); })

        geoflo.container.removeEventListener('keydown', keypress);
        geoflo.container.removeEventListener('mouseover', mouseover);
        geoflo.container.removeEventListener('mouseleave', mouseleave);

        window.removeEventListener("gamepadconnected", gamepadconnected);
        window.removeEventListener("gamepaddisconnected", gamepaddisconnected);
        window.removeEventListener("deviceorientation", handleOrientation, true);
    }

    return {
        addEventListeners,
        removeEventListeners
    }
}

export default Events;