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
    'gamepad.disconnect'
]

const Events = function (ctx) {
    const mapMoveStart = function (event) {
        ctx.mapMoving = event;
        if (ctx.Locate) ctx.Locate.onMapMove(event);
        ctx.setIcon(event);
    };

    const mapMoving = function (event) {
        ctx.mapMoving = event;
        ctx.setIcon(event);
        ctx.setCenterMarker();
        ctx.Locate && ctx.Locate.following ? ctx.setMapClass('disable') : false;
    };

    const mapMoveEnd = function (event) {
        ctx.mapMoving = false;
        ctx.Map.onMapMove(event);
        if (ctx.Locate) ctx.Locate.onMapMove(event);
        ctx.setIcon(event);
    };

    const mouseMove = function (event) {
        var painting = ctx.options.painting && ctx.options.painting.enable;
        painting = painting && ctx.currentMode && ctx.currentMode.id === 'draw';
        
        ctx.Locate && ctx.Locate.following ? ctx.setMapClass('disable') :
        ctx.dragMoving ? ctx.setMapClass('grabbing') :
        ctx.addingVertexOnLine || ctx.canAddVertex ? ctx.setMapClass('pointer') :
        ctx.canDragMove ? ctx.setMapClass('grab') :
        painting? ctx.setMapClass('painting') :
        ctx.setMapClass('pointer');

        ctx.lastMouseEvent = event;
        ctx.currentMode.handleMove ? ctx.currentMode.handleMove(event) : false;
    };

    const mouseDown = function (event) {
        var painting = ctx.options.painting && ctx.options.painting.enable;
        painting = painting && ctx.currentMode && ctx.currentMode.id === 'draw';
        
        ctx.Locate && ctx.Locate.following ? ctx.setMapClass('disable') :
        painting? ctx.setMapClass('painting') :
        ctx.dragMoving ? ctx.setMapClass('grabbing') :
        ctx.addingVertexOnLine ? ctx.setMapClass('grabbing') :
        ctx.canDragMove ? ctx.setMapClass('grab') :
        ctx.lastClick ? ctx.setMapClass('grabbing') :
        ctx.setMapClass('pointer');
        
        ctx.mouseIsDown = [event.lngLat.lng, event.lngLat.lat];
        ctx.currentMode.handleDown ? ctx.currentMode.handleDown(event) : false;
    };

    const mouseUp = function (event) {
        ctx.mouseIsDown = false;
        ctx.Locate && ctx.Locate.following ? ctx.setMapClass('disable') : ctx.setMapClass('pointer');
        ctx.currentMode.handleUp ? ctx.currentMode.handleUp(event) : false;
    };

    const mouseClick = async function (event) {
        if (event.type.includes('preclick')) return ctx.currentMode.handlePreclick ? ctx.currentMode.handlePreclick(event) : false;
        ctx.currentMode.handleClick ? ctx.currentMode.handleClick(event) : false;
    };

    const mouseDrag = function (event) {
        ctx.Locate && ctx.Locate.following ? ctx.setMapClass('disable') :
        ctx.dragMoving ? ctx.setMapClass('grabbing') :
        ctx.canDragMove ? ctx.setMapClass('grab') :
        ctx.setMapClass('move');

        ctx.currentMode.handleDrag ? ctx.currentMode.handleDrag(event) : false;
    };

    const mouseleave = function (event) {
        ctx.currentMode.handleOffMap ? ctx.currentMode.handleOffMap(event) : false;
    };

    const mouseover = function (event) {
        ctx.currentMode.handleOnMap ? ctx.currentMode.handleOnMap(event) : false;
    };

    const keypress = function (event) {
        if (ctx.textMarker) return;
        
        console.log("keycode: ", event.keyCode, " =>", event.key, " | Code:", event.code, " Event:", event);
        const buttonOptions = ctx.getButtons();

        let keyHandled = false;

        Object.keys(buttonOptions).forEach((buttonId) => {
            const option = buttonOptions[buttonId];
            const key = ctx.options.keys[buttonId];

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

        if (ctx.options.commands) {
            ctx.options.commands.forEach(function (c) {
                if (c.key === event.keyCode || c.key === event.key || c.key === event.code) {
                    if (!c.command || typeof c.command !== 'function') return;
                    c.command(event, ctx, c);
                    keyHandled = true;
                }
            })
        }

        if (keyHandled) { return keyHandled }

        if (event.key.includes('Arrow')) {
            
        }

        switch (event.code) {
            case "Enter": {
                ctx.setMode();
                break;
            }
            case "NumpadEnter": {
                ctx.setMode();
                break;
            }
            case "Escape": {
                ctx.hotFeature = null;
                ctx.setMode();
                break;
            }
            case "Home": {
                ctx.moveSelectedFeatures(1);
                break;
            }
            case "End": {
                ctx.moveSelectedFeatures(-1);
                break;
            }
            case "Delete": {
                if (ctx.mode === ctx.statics.constants.modes.SELECT) {
                    if (ctx.hasSelection()) { ctx.removeSelection(); }
                } else if (ctx.mode === ctx.statics.constants.modes.DRAW) {
                    ctx.currentMode.deleteVertex();
                }
                break;
            }
        }
    };

    const touchstart = function (event) {
        ctx.currentMode.handleTouch ? ctx.currentMode.handleTouch(event) : false;
    };

    const touchend = function (event) {
        ctx.currentMode.handleTouch ? ctx.currentMode.handleTouch(event) : false;
    };

    const touchmove = function (event) {
        ctx.currentMode.handleTouch ? ctx.currentMode.handleTouch(event) : false;
    };

    const touchcancel = function (event) {
        ctx.currentMode.handleTouch ? ctx.currentMode.handleTouch(event) : false;
    };

    const gamepadconnected = function (event) {
        ctx.addGamepad(event.gamepad || event.detail.gamepad);
    };

    const gamepaddisconnected = function (event) {
        ctx.removeGamepad(event.gamepad || event.detail.gamepad);
    };

    const handleOrientation = function (event) {
        ctx.updateOrientation({
            alpha: event.alpha,
            beta: event.beta,
            gamma: event.gamma
        })
    };

    const dragStart = function (event) {
        //if (ctx.Locate && ctx.Locate.following) return event.originalEvent.preventDefault();
    };

    const rotatePitch = function (event) {
        ctx.setMapClass('grabbing');
        ctx.setIcon(event);
        ctx.setCenterMarker({ transform: true });
    };



    const fireEvent = function fireEvent (event) {
        const name = event.type.split(':')[1];
        
        const detail = {
            data: event.detail,
            type: name.split('.')[0],
            action: name.split('.')[1],
            target: ctx,
        }

        const details = { name: name, detail: detail };
        console.log(detail);
        ctx.map.fire(ctx.id, details);
    }

    const contextMenu = function (event) {
        ctx.currentMode.handleContext ? ctx.currentMode.handleContext(event) : false;
    }

    const sourceData = function (event) {
        if (!event.sourceDataType || !event.sourceDataType === 'content' || !event.sourceId) return false;
        const id = event.sourceId;

        const detail = {
            id: id,
            data: event.source.data,
            type: event.type,
            target: ctx,
        }

        id === ctx.statics.constants.sources.HOT ? ctx.fire('source.hot', detail) : false;
    }

    

    function addEventListeners () {
        ctx.map.on("movestart", mapMoveStart);
        ctx.map.on("move", mapMoving);
        ctx.map.on("moveend", mapMoveEnd);
        ctx.map.on("mousemove", mouseMove);

        ctx.map.on('preclick', mouseClick);
        ctx.map.on('click', mouseClick);
        ctx.map.on('tap', mouseClick);

        ctx.map.on('dragstart', dragStart);
        ctx.map.on('drag', mouseDrag);
        ctx.map.on('mousedown', mouseDown);
        ctx.map.on('mouseup', mouseUp);

        ctx.map.on('rotatestart', rotatePitch);
        ctx.map.on('pitchstart', rotatePitch);
        ctx.map.on('rotate', rotatePitch);
        ctx.map.on('pitch', rotatePitch);

        ctx.map.on('touchstart', touchstart);
        ctx.map.on('touchend', touchend);
        ctx.map.on('touchmove', touchmove);
        ctx.map.on('touchcancel', touchcancel);

        ctx.map.on('contextmenu', contextMenu);
        ctx.map.on('sourcedata', sourceData);

        events.forEach(function(event) { ctx.map.on(ctx.id + ':' + event, fireEvent); })

        ctx.container.addEventListener('keydown', keypress);
        ctx.container.addEventListener('mouseover', mouseover);
        ctx.container.addEventListener('mouseleave', mouseleave);

        window.addEventListener("gamepadconnected", gamepadconnected);
        window.addEventListener("gamepaddisconnected", gamepaddisconnected);
        window.addEventListener("deviceorientation", handleOrientation, true);
    }

    function removeEventListeners () {
        ctx.map.off("movestart", mapMoveStart);
        ctx.map.off("move", mapMoving);
        ctx.map.off("moveend", mapMoveEnd);
        ctx.map.off("mousemove", mouseMove);

        ctx.map.off('preclick', mouseClick);
        ctx.map.off('click', mouseClick);
        ctx.map.off('tap', mouseClick);

        ctx.map.off('dragstart', dragStart);
        ctx.map.off('drag', mouseDrag);
        ctx.map.off('mousedown', mouseDown);
        ctx.map.off('mouseup', mouseUp);

        ctx.map.off('rotatestart', rotatePitch);
        ctx.map.off('pitchstart', rotatePitch);

        ctx.map.off('touchstart', touchstart);
        ctx.map.off('touchend', touchend);
        ctx.map.off('touchmove', touchmove);
        ctx.map.off('touchcancel', touchcancel);
        
        ctx.map.off('contextmenu', contextMenu);
        ctx.map.off('sourcedata', sourceData);

        events.forEach(function(event) { ctx.map.off(ctx.id + ':' + event, fireEvent); })

        ctx.container.removeEventListener('keydown', keypress);
        ctx.container.removeEventListener('mouseover', mouseover);
        ctx.container.removeEventListener('mouseleave', mouseleave);

        window.removeEventListener("gamepadconnected", gamepadconnected);
        window.removeEventListener("gamepaddisconnected", gamepaddisconnected);
        window.removeEventListener("deviceorientation", handleOrientation, true);
    }

    return {
        addEventListeners,
        removeEventListeners
    }
}

export { Events as default }