const events = [
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
    'features.delete',
    'features.update',
    'features.import',
    'features.export',
    'features.offset',
    'feature.add',
    'feature.delete',
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

const Events = function (geoflo) {
    const mapMoveStart = function (event) {
        geoflo.mapMoving = event;
        if (geoflo.settingExtent) return;
        if (geoflo.locate) geoflo.locate.onMapMove(event);
        geoflo.setIcon(event);
    };

    const mapMoving = function (event) {
        geoflo.mapMoving = event;
        if (geoflo.settingExtent) return;
        geoflo.setIcon(event);
        geoflo.setCenterMarker();
        geoflo.locate && geoflo.locate.following ? geoflo.setMapClass('disable') : false;
    };

    const mapMoveEnd = function (event) {
        geoflo.mapMoving = false;
        if (geoflo.settingExtent) return;
        geoflo.onMapMove(event);
        if (geoflo.locate) geoflo.locate.onMapMove(event);
        geoflo.setIcon(event);
    };

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

    const mouseUp = function (event) {
        geoflo.mouseIsDown = false;
        geoflo.locate && geoflo.locate.following ? geoflo.setMapClass('disable') : geoflo.setMapClass('pointer');
        geoflo.currentMode.handleUp ? geoflo.currentMode.handleUp(event) : false;
    };

    const mouseClick = async function (event) {
        if (event.type.includes('preclick')) return geoflo.currentMode.handlePreclick ? geoflo.currentMode.handlePreclick(event) : false;
        geoflo.currentMode.handleClick ? geoflo.currentMode.handleClick(event) : false;
    };

    const mouseDrag = function (event) {
        geoflo.locate && geoflo.locate.following ? geoflo.setMapClass('disable') :
        geoflo.dragMoving ? geoflo.setMapClass('grabbing') :
        geoflo.canDragMove ? geoflo.setMapClass('grab') :
        geoflo.setMapClass('move');

        geoflo.currentMode.handleDrag ? geoflo.currentMode.handleDrag(event) : false;
    };

    const mouseleave = function (event) {
        geoflo.currentMode.handleOffMap ? geoflo.currentMode.handleOffMap(event) : false;
    };

    const mouseover = function (event) {
        geoflo.currentMode.handleOnMap ? geoflo.currentMode.handleOnMap(event) : false;
    };

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

    const keyrelease = function (event) {
        console.log("keyrelease: ", event);
        geoflo.currentKeyPress = false;
    };

    const touchstart = function (event) {
        geoflo.currentMode.handleTouch ? geoflo.currentMode.handleTouch(event) : false;
    };

    const touchend = function (event) {
        geoflo.currentMode.handleTouch ? geoflo.currentMode.handleTouch(event) : false;
    };

    const touchmove = function (event) {
        geoflo.currentMode.handleTouch ? geoflo.currentMode.handleTouch(event) : false;
    };

    const touchcancel = function (event) {
        geoflo.currentMode.handleTouch ? geoflo.currentMode.handleTouch(event) : false;
    };

    const gamepadconnected = function (event) {
        geoflo.addGamepad(event.gamepad || event.detail.gamepad);
    };

    const gamepaddisconnected = function (event) {
        geoflo.removeGamepad(event.gamepad || event.detail.gamepad);
    };

    const handleOrientation = function (event) {
        geoflo.updateOrientation({
            alpha: event.alpha,
            beta: event.beta,
            gamma: event.gamma
        })
    };

    const dragStart = function (event) {
        //if (geoflo.locate && geoflo.locate.following) return event.originalEvent.preventDefault();
    };

    const rotatePitch = function (event) {
        geoflo.setMapClass('grabbing');
        geoflo.setIcon(event);
        geoflo.setCenterMarker({ transform: true });
    };



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

    const contextMenu = function (event) {
        geoflo.currentMode.handleContext ? geoflo.currentMode.handleContext(event) : false;
    }

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