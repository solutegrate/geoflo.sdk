/**
 * @mixin
 * @memberof module:geoflo
 * @name Draw
 * @description This module provides the functionality for drawing features on the map.
 * @returns {Object} The current instance for method chaining.
 * 
 */
const Draw = function () {
    const geoflo = this.geoflo;

    this.id = 'draw';

	/**
	 * @function
     * @memberof module:geoflo.Draw
	 * @name canHandle
	 * @description Checks if the given modeName is equal to the constant mode DRAW.
	 * @param {string} modeName - The name of the mode to be checked.
	 * @returns {boolean} Returns true if the modeName is equal to DRAW, false otherwise.
	 */
    this.canHandle = function (modeName) {
        return geoflo.statics.constants.modes.DRAW === modeName;
    }

	/**
	 * @function
     * @memberof module:geoflo.Draw
	 * @name activate
	 * @description This function activates the drawing mode with the provided options. It sets up the necessary properties and event listeners for drawing features on the map.
	 * @param {Object} options - The options for activating the drawing mode.
	 * @param {Object} [options.feature] - The feature to be edited or drawn.
	 * @param {String} [options.type] - The type of feature to be drawn.
	 * @param {Object} [options.lngLat] - The longitude and latitude coordinates for drawing.
	 * @param {String} [options.id] - The unique identifier for the feature.
	 * @returns {Object} Returns the current instance for method chaining.
	 */
    this.activate = function (options={}) {
        if (this.activated) return false;
        if (geoflo.currentMode.id !== this.id) return options.mode = this.id, geoflo.setMode(options);

        this.activated = true;
        this._handleHistory = this.handleHistory.bind(this);
        this.history = [];
        this.undo = [];

        if (options.feature) options.type = editMode(options.feature);
        geoflo.drawMode = !geoflo.editMode;
        
        var lngLat = options.lngLat;
        delete options.lngLat;

        var newType = this.type = options.type;
        var properties = options.feature ? options.feature.properties : options;
        
        this.properties = Object.assign({}, properties);
        delete this.properties.mode;
        delete this.properties.location;

        const id = options.id || properties.id || URL.createObjectURL(new Blob([])).slice(-36);

        this.properties.id = id;
        this.properties.type = newType;

        geoflo.setButtons();
        geoflo.setActiveButton(newType);
        
        if (geoflo.Utilities.isPoint(geoflo.hotFeature, newType)) this.isPoint = true;

        geoflo.fire('draw.activate', {
            id: id,
            type: newType,
            activated: this.activated,
            editing: geoflo.editMode,
            feature: geoflo.hotFeature || options.feature,
            properties: this.properties
        })

        geoflo.on('source.hot', this._handleHistory);
        if (lngLat) this.handleMove({ lngLat: lngLat });
        geoflo.options.painting.enable || (geoflo.mobile && newType === 'Rectangle') ? geoflo.activatePainting() : false;

        geoflo.refreshMeshData();
        this.updateHotSource();

        setTimeout(function() { geoflo.Features.removeFeatures(id); }, 100);
        return this;
    }

	/**
	 * @function
     * @memberof module:geoflo.Draw
	 * @name deactivate
	 * @description Deactivates the draw feature by canceling the current edit, cleaning up the draw, setting buttons, and handling events.
	 * @param {boolean} cancel - Flag to determine if the edit should be canceled.
	 * @param {boolean} standby - Flag to indicate if the feature is in standby mode.
	 * @param {object} feature - The feature to be deactivated.
	 */
    this.deactivate = function (options={}) {
        if (!this.activated) return false;
        const type = options.type || this.type;
        if (options.cancel) this.cancelEdit(options.standby, options.feature);
        cleanupDraw(this);
        geoflo.setButtons();
        geoflo.off('source.hot', this._handleHistory);
        geoflo.fire('draw.deactivate', { activated: this.activated });
        setTimeout(function() { geoflo.map.getSource(geoflo.statics.constants.sources.SELECT).setData(turf.featureCollection([])); }, 300);
        !geoflo.options.repeatDraw ? geoflo.setMode() : geoflo.setMode({ mode: geoflo.statics.constants.modes.DRAW, type: type });
    }



	/**
	 * @function
     * @memberof module:geoflo.Draw
	 * @name updateHotSource
	 * @description This function updates the hot source feature with new properties and assigns it to the geoflo.hotFeature. It then updates the data of the VERTEX and HOT sources on the map with the updated feature.
	 * @param {Object} feature - The feature object to be updated.
	 * @param {Object} properties - The new properties to be assigned to the feature.
	 * @returns {Object} The updated hot source feature.
	 */
    this.updateHotSource = function (feature, properties) {
        if (feature) geoflo.hotFeature = feature;
        if (!geoflo.hotFeature || geoflo.overpassDownloading) return;
        geoflo.hotFeature.properties = geoflo.Utilities.assignDeep(geoflo.hotFeature.properties, properties || {});
        geoflo.hotFeature.properties.style = geoflo.hotFeature.properties.style || {};
        geoflo.map.getSource(geoflo.statics.constants.sources.VERTEX).setData(turf.featureCollection([geoflo.hotFeature]));
        geoflo.map.getSource(geoflo.statics.constants.sources.HOT).setData(turf.featureCollection([geoflo.hotFeature]));
        return geoflo.hotFeature;
    }

	/**
	 * @function
     * @memberof module:geoflo.Draw
	 * @name deleteVertex
	 * @description Deletes a vertex from the current feature being edited on the map.
	 * @param {number} index - The index of the vertex to be deleted.
	 * @returns {void}
	 */
    this.deleteVertex = function (index) {
        if (geoflo.hotFeature) {
            const coords = geoflo.hotFeature.geometry.coordinates;
            index = index !== undefined ? index : coords.length - 1;

            if (coords.length > 1) {
                coords.splice(index, 1);
                geoflo.lastClick = { coords: coords[coords.length - 1] };

                if (coords.length > 0) {
                    geoflo.snapFeature = turf.point(coords[coords.length - 1]);
                } else {
                    geoflo.snapFeature = null;
                }

                if (coords.length > 1) {
                    geoflo.map.getSource(geoflo.statics.constants.sources.HOT).setData(turf.featureCollection([geoflo.hotFeature]));
                } else {
                    geoflo.hotFeature = null;
                    geoflo.map.getSource(geoflo.statics.constants.sources.HOT).setData(turf.featureCollection([]));
                }

                geoflo.fire('vertex.delete', { coords: coords, index: index, feature: geoflo.hotFeature })
            }

            if (geoflo.lastMouseEvent) {
                geoflo.currentMode.handleMove ? geoflo.currentMode.handleMove(geoflo.lastMouseEvent) : false;
            }
        } else if (geoflo.snapFeature) {
            geoflo.snapFeature = null;
            geoflo.lastClick = null;
            geoflo.map.getSource(geoflo.statics.constants.sources.SNAP).setData(turf.featureCollection([]));
        }
    }

	/**
	 * @function
     * @memberof module:geoflo.Draw
	 * @name getFeature
	 * @description Retrieves the hot feature from the context.
	 * @returns {any} The hot feature stored in the context.
	 */
    this.getFeature = function () {
        return geoflo.hotFeature;
    }

	/**
	 * @function
     * @memberof module:geoflo.Draw
	 * @name selectFeature
	 * @description Selects a feature based on the provided ID.
	 * @param {string} id - The ID of the feature to be selected.
	 * @returns {boolean} Returns false if no ID is provided, otherwise returns the result of selecting the feature.
	 */
    this.selectFeature = function (id) {
        if (!id) return false;
        geoflo.setMode();
        return geoflo.currentMode.selectFeature(id);
    }

	/** 
	 * @function
     * @memberof module:geoflo.Draw
	 * @name saveEdit
	 * @description This function saves the edited feature in the map.
	 * @param {Object} feature - The feature to be saved.
	 * @returns {boolean} - Returns true if the feature is successfully saved, false otherwise.
	 */
    this.saveEdit = function (feature) {
        var hot = geoflo.hotFeature;
        if (!hot) return false;

        var type = hot.properties.type || feature.properties.type || this.type;
        feature = feature || hot;

        this.savingEdit = true;
        return finishDraw(type, feature);
    }

	/**
	 * @function
     * @memberof module:geoflo.Draw
	 * @name cancelEdit
	 * @description This function cancels the current editing operation by setting the 'cancelled' flag to true. If the 'feature' parameter is not provided or does not have a 'type' property, it sets 'geoflo.hotFeature' to null and finishes the draw process. It then sets the 'standby' property, updates 'geoflo.hotFeature', fires a 'draw.cancel' event with the feature, and returns the result of 'finishDraw()'.
	 * @param {boolean} standby - The standby value to set.
	 * @param {object} feature - The feature being edited.
	 * @returns {any} The result of the 'finishDraw()' function.
	 */
    this.cancelEdit = function (standby, feature) {
        this.cancelled = true;
        if (!feature || !feature.properties.type) return geoflo.hotFeature = null, finishDraw();
        this.standby = standby;
        geoflo.hotFeature = feature;
        geoflo.fire('draw.cancel', { feature: feature });
        return finishDraw();
    }



	/**
	 * @function
     * @memberof module:geoflo.Draw
	 * @name handleDown
	 * @description Handles the mouse or touch down event on the map. Updates the mouse/touch position, adds a vertex if allowed, and sets features for pinning.
	 * @param {Object} event - The event object containing information about the mouse or touch event.
	 * @returns {void}
	 */
    this.handleDown = function (event) {
        var point;

        geoflo.mouseIsDown = [event.lngLat.lng, event.lngLat.lat];

        if (event.touch) {
            geoflo.touchDown = true;
            point = turf.point(geoflo.mouseIsDown);
            onVertex(getVertex(point));
        }
        
        if (geoflo.canAddVertex) {
            point = addVertex(geoflo.canAddVertex, event);
            return onVertex(getVertex(point), true);
        }

        geoflo.Pinning.setFeatures(geoflo.snappedVertex);
        startIdleTime();
    }

	/**
	 * @function
     * @memberof module:geoflo.Draw
	 * @name handleUp
	 * @description This function is responsible for handling the mouse up event during drawing and editing operations on the map. It checks various conditions and triggers corresponding actions based on the context and user interactions.
	 * @param {Event} event - The mouse up event object.
	 * @returns {void}
	 */
    this.handleUp = function (event) {
        geoflo.mouseIsDown = false;
        geoflo.touchDown = false;

        if (geoflo.Painting.enabled) return geoflo.Painting.handleUp(event);
        if (geoflo.addedVertexOnLine && !geoflo.dragMoving) return;
        if (event.touch && geoflo.touchMoving) return geoflo.dragMoving = false;

        if (geoflo.Utilities.isPoint(geoflo.hotFeature) && geoflo.snappedVertex) return geoflo.editMode ? this.saveEdit() : finishDraw(this.type);

        if (geoflo.snappedVertex && geoflo.dragMoving && !geoflo.mapMoving && this.type !== 'Rectangle') {
            geoflo.gamepadDrag = event.gamepad;

            var isLastIndex = geoflo.Utilities.isLastIndex(geoflo.dragIndex, geoflo.hotFeature);
            isLastIndex = isLastIndex ? isLastIndex : geoflo.Utilities.isPolygon(geoflo.hotFeature) && geoflo.dragIndex == 0 ? true : false;
           
            var coords = geoflo.Utilities.getLastIndexCoords(geoflo.hotFeature);

            onVertex(getVertex(turf.point(geoflo.snappedVertex)));
            this.updateHotSource();
            if (isLastIndex) setTimeout(function() { geoflo.lastClick = { coords: coords } }, 100)
        }
        
        geoflo.pinableFeatures = [];
        geoflo.mouseIsIdle = false;
        addText.call(this, this.type, geoflo.snapFeature);
        geoflo.refreshMeshData();
    }

	/**
	 * @function
     * @memberof module:geoflo.Draw
	 * @name handleClick
	 * @description This function processes the click event for drawing features on the map. It determines the action based on the event type and context state, such as editing mode, touch input, vertex addition, and gamepad interaction.
	 * @param {Object} event - The event object containing information about the click event.
	 * @returns {Object} The updated event object or the result of the drawing action.
	 */
    this.handleClick = function (event) {
        if (event.finish) return geoflo.editMode ? this.saveEdit() : finishDraw(this.type);
        if (event.touch && geoflo.touchMoving) return geoflo.touchMoving = false, geoflo.Snapping.setFeature(), this.updateHotSource();
        if (event.touch) geoflo.touchClick = true;

        if (geoflo.addedVertexOnLine) {
            geoflo.Snapping.setFeature();
            this.updateHotSource();
            onVertex(getVertex(geoflo.addedVertexOnLine));
            this.handleDrag(event);
            geoflo.dragMoving = false;
            geoflo.gamepadDrag = false
            geoflo.mouseIsIdle = false;
            return event;
        }

        if (geoflo.gamepadDrag) return geoflo.gamepadDrag = false;

        if (geoflo.editMode && (this.type === 'Polygon' || this.type === 'Text')) return;

        if (!this.firstClick && !geoflo.drawStarted) {
            geoflo.drawStarted = true;
            geoflo.fire('draw.start', { type: this.type, editing: geoflo.editMode, coords: [event.lngLat.lng, event.lngLat.lat] });
        } else {
            geoflo.fire('vertex.add', { type: this.type, coords: [event.lngLat.lng, event.lngLat.lat] });
        }

        var lastPoint = geoflo.closestPoint || { coords: [event.lngLat.lng, event.lngLat.lat] };
        var point = turf.point(lastPoint.coords);

        point.properties = this.properties;
        point.source = this.source;

        geoflo.lastMove = lastPoint.coords.length > 1 ? { lat: lastPoint.coords[lastPoint.coords.length-1][1], lng: lastPoint.coords[lastPoint.coords.length-1][0] } : false;        

        if (!geoflo.startPoint) {
            if (this.type === 'Rectangle') {
                geoflo.startPoint = lastPoint.coords;

                geoflo.hotFeature = turf.polygon([[
                    geoflo.startPoint,
                    [event.lngLat.lng, event.lngLat.lat],
                    [geoflo.startPoint[0], event.lngLat.lat],
                    geoflo.startPoint
                ]]);
    
                return geoflo.Utilities.setProperty(geoflo.hotFeature, 'type', this.type);
            } else if (this.type === 'Polygon') {
                geoflo.startPoint = lastPoint.coords;
            }
        }
        
        if (!geoflo.snapFeature && lastPoint) geoflo.snapFeature = lastPoint;

        if (needsToFinish(this.type, lastPoint.coords)) return finishDraw(this.type, point);
        
        this.firstClick = geoflo.firstClick ? false : { coords: lastPoint.coords };

        geoflo.lastClick = lastPoint;
        geoflo.firstClick = geoflo.firstClick ? geoflo.firstClick : { coords: lastPoint.coords };
        geoflo.Snapping.setFeature();
        addText.call(this, this.type);
        geoflo.Exploring.setFeatures(lastPoint.coords, { set: true });
        delete geoflo.touchClick;
        return this.updateHotSource();
    }

	/**
	 * @function
     * @memberof module:geoflo.Draw
	 * @name handleMove
	 * @description This function determines the behavior based on the event type and context state. It handles various actions such as dragging, painting, snapping, routing, and snapping to points.
	 * @param {Object} event - The event object containing information about the mouse or touch event.
	 * @returns {boolean} Returns false in certain conditions to prevent default behavior.
	 */
    this.handleMove = function (event) {
        if (event.touch && geoflo.mouseIsDown) geoflo.touchMoving = true;
        if (geoflo.overpassDownloading) return false;
        if (geoflo.mouseIsDown && geoflo.canAddVertex) return false;
        if (geoflo.canDragMove && geoflo.snappedVertex && geoflo.mouseIsDown) return this.handleDrag(event);
        if (geoflo.mouseIsDown && geoflo.Painting.enabled) return this.handlePainting(event);
        if (event.touch && geoflo.touchMoving) return geoflo.snapFeature = false;

        var button = !event.originalEvent ? false : event.originalEvent.buttons !== undefined ? event.originalEvent.buttons : event.originalEvent.which;
        if (button === 1) return false;

        var calculateRoute = geoflo.Routing.enabled;
        if (event.originalEvent && event.originalEvent.altKey) calculateRoute = false;

        var snapToPoint = geoflo.Snapping.enabled;
        if (event.originalEvent && event.originalEvent.shiftKey) snapToPoint = false;

        var evtCoords = [event.lngLat.lng, event.lngLat.lat];
        var isPoint = geoflo.Utilities.isPoint(geoflo.hotFeature);
        var editPolygon = geoflo.editMode && (this.type === 'Polygon' || this.type === 'Rectangle');
        var point = turf.point(evtCoords);
        var snapFeature = null;

        if (editPolygon) {
            snapFeature = point;
        } else if (snapToPoint) {
            snapFeature = geoflo.Snapping.setClosest(evtCoords, isPoint);
        } else if (!isPoint) {
            snapFeature = geoflo.Snapping.updateFeature(evtCoords);
        } else if (isPoint) {
            snapFeature = point;
        }

        if (calculateRoute) snapFeature = geoflo.Routing.getClosest() || snapFeature;
        if (!snapFeature) snapFeature = point;

        geoflo.Snapping.addFeature(snapFeature, this.properties, editPolygon);
        onVertex(getVertex(point));
        
        if (!snapFeature && this.isPoint) delete this.isPoint;
        if (editPolygon && calculateRoute) geoflo.map.getSource(geoflo.statics.constants.sources['ROUTE']).setData(turf.featureCollection([]));

        if (this.type === 'Rectangle') return this.handleRectangle(event);
        if (this.type === 'Icon') return this.handleIcon(event, geoflo.snapFeature);
        if (this.type === 'Text') return this.handleText(event, geoflo.snapFeature);
    }

	/**
	 * @function
     * @memberof module:geoflo.Draw
	 * @name handleDrag
	 * @description This function is responsible for handling the drag event of a vertex on the map. It updates the position of the vertex based on the user's interaction and triggers various actions accordingly.
	 * @param {Object} event - The event object containing information about the drag event.
	 * @returns {boolean} Returns false if the drag index is not valid.
	 */
    this.handleDrag = function (event) {
        var validIndex = geoflo.dragIndex > -1;
        
        if (!validIndex) {
            offVertex();
            if (geoflo.mouseIsDown && geoflo.Painting.enabled) this.handlePainting(event);
            return false;
        }

        !event.gamepad ? event.originalEvent.stopPropagation() : false;

        geoflo.dragMoving = true;
        geoflo.lastDragMove = 0;
        geoflo.snappedVertex = [event.lngLat.lng, event.lngLat.lat];
        geoflo.bypassRouting = true; //!event.gamepad ? event.originalEvent.altKey : false;
        geoflo.bypassSnapping = !event.gamepad ? event.originalEvent.shiftKey : false;
        geoflo.lastIndex = geoflo.Utilities.isLastIndex(geoflo.dragIndex, geoflo.hotFeature);

        var vertex = turf.point(geoflo.snappedVertex);

        if (geoflo.lastIndex) geoflo.lastClick = { coords: geoflo.snappedVertex };

        if (this.type === 'Circle' || this.type === 'Icon' || this.type === 'Image') {
            if (!geoflo.Painting.enabled) geoflo.hotFeature.geometry.coordinates = geoflo.snappedVertex;
        } else {
            var isLastIndex = geoflo.Utilities.isLastIndex(geoflo.dragIndex, geoflo.hotFeature);
            geoflo.hotFeature.geometry.coordinates[geoflo.dragIndex] = geoflo.snappedVertex;

            if (this.type === 'Polygon') {
                if (isLastIndex) geoflo.hotFeature.geometry.coordinates[0] = geoflo.snappedVertex;
                if (geoflo.dragIndex == 0) geoflo.hotFeature.geometry.coordinates[geoflo.hotFeature.geometry.coordinates.length -1] = geoflo.snappedVertex;
            }
        }

        geoflo.Utilities.setProperty(geoflo.hotFeature, 'type', this.type);
        geoflo.Utilities.setProperty(vertex, 'type', this.type);
        geoflo.map.getSource(geoflo.statics.constants.sources.ROUTE).setData(turf.featureCollection([]));
        geoflo.map.getSource(geoflo.statics.constants.sources.SNAP).setData(turf.featureCollection([]));
        geoflo.map.getSource(geoflo.statics.constants.sources.HOT).setData(turf.featureCollection([geoflo.hotFeature]));
        geoflo.map.getSource(geoflo.statics.constants.sources.VERTEX).setData(turf.featureCollection([vertex]));
        geoflo.fire('vertex.drag', { type: this.type, coords: [event.lngLat.lng, event.lngLat.lat], feature: geoflo.hotFeature, vertex: vertex });
        geoflo.Pinning.updateFeatures();
    }

	/**
	 * @function
     * @memberof module:geoflo.Draw
	 * @name handleTouch
	 * @description This function is responsible for handling touch events and triggering corresponding actions.
	 * @param {Event} event - The touch event object.
	 * @returns {void}
	 */
    this.handleTouch = function (event) {
        event.touch = true;

        if (event.type === 'touchstart') {
            this.handleDown(event);
        } else if (event.type === 'touchend') {
            this.handleUp(event);
            this.handleClick(event);
        } else if (event.type === 'touchmove') {
            this.handleMove(event);
        }
    }

	/**
	 * @function
     * @memberof module:geoflo.Draw
	 * @name handleOffMap
	 * @description This function is triggered when an off-map event occurs and clears the data of a specific source on the map.
	 * @param {Event} event - The event object triggering the function.
	 */
    this.handleOffMap = function (event) {
        if (geoflo.map.getSource(geoflo.statics.constants.sources.SNAP)) geoflo.map.getSource(geoflo.statics.constants.sources.SNAP).setData(turf.featureCollection([]));
    }

	/**
	 * @function
     * @memberof module:geoflo.Draw
	 * @name handleOnMap
	 * @description This function updates the data of the SNAP source on the map with the snapFeature.
	 * @param {Event} event - The event triggering the function.
	 */
    this.handleOnMap = function (event) {
        if (geoflo.map.getSource(geoflo.statics.constants.sources.SNAP) && geoflo.snapFeature) geoflo.map.getSource(geoflo.statics.constants.sources.SNAP).setData(turf.featureCollection([geoflo.snapFeature]));
    }

	/**
	 * @function
     * @memberof module:geoflo.Draw
	 * @name handlePainting
	 * @description This function is triggered when painting on the map. It disables drag pan, sets the map class to 'painting', and updates the feature coordinates.
	 * @param {Object} event - The event object triggering the function.
	 * @returns {boolean} Returns false if mouse is not down or no coordinates are available, otherwise updates the feature coordinates.
	 */
    this.handlePainting = function (event) {
        if (!geoflo.mouseIsDown) return false;
        geoflo.map.dragPan.disable();
        geoflo.setMapClass('painting');

        var snapCoords = geoflo.snapFeature && !geoflo.Painting.feature;
        var coords = event.lngLat && event.lngLat.lng ? [event.lngLat.lng, event.lngLat.lat] : false;
        if (snapCoords) coords = geoflo.snapFeature.geometry.coordinates;

        if (!coords) return false;
        return geoflo.Painting.updateFeature(coords);
    }

	/**
	 * @function
     * @memberof module:geoflo.Draw
	 * @name handleRectangle
	 * @description Handles the creation and manipulation of a rectangle feature on a map.
	 * @param {Object} event - The event object triggering the function.
	 * @returns {void}
	 */
    this.handleRectangle = function (event) {
        if (geoflo.editMode && geoflo.hotFeature) geoflo.startPoint = geoflo.hotFeature.geometry.coordinates[0][0];
        if (!geoflo.startPoint) return;
        if (!geoflo.dragMoving) geoflo.Utilities.setProperty(geoflo.hotFeature, 'type', this.type);
        geoflo.dragMoving = true;

        var coords = geoflo.snapFeature ? geoflo.snapFeature.geometry.coordinates : [event.lngLat.lng, event.lngLat.lat];

        if (geoflo.dragIndex > -1) {
            var startPoint = geoflo.dragIndex == 0 || geoflo.dragIndex == 4 ? 4 : geoflo.dragIndex;
            var endPoint = startPoint == 1 ? 3 : startPoint == 2 ? 4 : startPoint == 3 ? 1 : 2;
            var leftPoint = endPoint == 1 ? 4 : endPoint == 2 ? 1 : endPoint == 3 ? 2 : 3
            var rightPoint = leftPoint == 1 ? 3 : leftPoint == 2 ? 4 : leftPoint == 3 ? 1 : 2;

            updateCoordinate(geoflo.hotFeature, "0." + startPoint, coords[0], coords[1]);
            updateCoordinate(geoflo.hotFeature, "0." + leftPoint, coords[0], geoflo.startPoint[1]);
            updateCoordinate(geoflo.hotFeature, "0." + rightPoint, geoflo.startPoint[0], coords[1]);
            updateCoordinate(geoflo.hotFeature, "0." + endPoint, geoflo.startPoint[0], geoflo.startPoint[1] );
        } else {
            updateCoordinate(geoflo.hotFeature, "0.1", coords[0], geoflo.startPoint[1]);
            updateCoordinate(geoflo.hotFeature, "0.2", coords[0], coords[1]);
            updateCoordinate(geoflo.hotFeature, "0.3", geoflo.startPoint[0], coords[1]);
            updateCoordinate(geoflo.hotFeature, "0.4", geoflo.startPoint[0], geoflo.startPoint[1] );
        }

        geoflo.map.getSource(geoflo.statics.constants.sources.HOT).setData(turf.featureCollection([geoflo.hotFeature]));
        geoflo.map.getSource(geoflo.statics.constants.sources.VERTEX).setData(turf.featureCollection([geoflo.hotFeature]));
    }

	/**
	 * @function
     * @memberof module:geoflo.Draw
	 * @name handleText
	 * @description Handles text input events and logs relevant properties.
	 * @param {Event} event - The event object triggering the function.
	 * @param {string} feature - The feature to be handled.
	 */
    this.handleText = function (event, feature) {
        console.log('handleText', this.properties, geoflo.snapFeature);
    }

	/**
	 * @function
     * @memberof module:geoflo.Draw
	 * @name handleIcon
	 * @description Handles the icon based on the event and feature provided.
	 * @param {Event} event - The event triggering the function.
	 * @param {Object} feature - The feature object to be handled.
	 */
    this.handleIcon = function (event, feature) {
        console.log('handleIcon', this.properties, geoflo.snapFeature);
    }

	/**
	 * @function
     * @memberof module:geoflo.Draw
	 * @name handleContext
	 * @description Handles the context of dragging and moving a feature vertex.
	 * @param {Event} event - The event triggering the context handling.
	 * @returns {void}
	 */
    this.handleContext = function (event) {
        if (!geoflo.canDragMove || !geoflo.snappedVertex) return;
        
        var validIndex = geoflo.dragIndex > -1;
        if (!validIndex) return;

        geoflo.hotFeature.geometry.coordinates.splice(geoflo.dragIndex, 1);

        geoflo.map.getSource(geoflo.statics.constants.sources.HOT).setData(turf.featureCollection([geoflo.hotFeature]));
        geoflo.map.getSource(geoflo.statics.constants.sources.VERTEX).setData(turf.featureCollection([geoflo.hotFeature]));
        geoflo.map.getSource(geoflo.statics.constants.sources.SNAP).setData(turf.featureCollection([]));
    }

	/**
	 * @function
     * @memberof module:geoflo.Draw
	 * @name handleHistory
	 * @description Handles the history of features in the current mode.
	 * @param {Object} event - The event triggering the history update.
	 * @returns {void}
	 */
    this.handleHistory = function handleHistory (event) {
        if (geoflo.dragMoving) return;

        var history = geoflo.currentMode.history;
        var date = new Date();
        
        var features = event.detail.data.features;
        if (!features || !features.length) return;

        var feature = geoflo.Utilities.cloneDeep(features[0]);
        feature.historyDate = date;
        history.push(feature);

        geoflo.fire('feature.history', { type: geoflo.currentMode.type, feature: feature, history: history });
    }

	/**
	 * @function
     * @memberof module:geoflo.Draw
	 * @name handleUndo
	 * @description This function is responsible for undoing the last action performed in the application. It retrieves the history and undo arrays from the current mode, pops the last feature from the history, sets the undo flag to true for the feature, updates the hotFeature, pushes the feature to the undo array, and updates the map source data with the hotFeature.
	 * @returns {void}
	 */
    this.handleUndo = function () {
        return alert("UNDER DEVELOPMENT");
        var history = geoflo.currentMode.history;
        var undo = geoflo.currentMode.undo;

        var feature = history.pop();

        feature.undo = true;
        geoflo.hotFeature = feature;

        undo.push(geoflo.hotFeature);
        geoflo.map.getSource(geoflo.statics.constants.sources.HOT).setData(turf.featureCollection([geoflo.hotFeature]));
    }

	/**
	 * @function
     * @memberof module:geoflo.Draw
	 * @name handleRedo
	 * @description Handles the redo functionality (currently under development).
	 * @returns {void}
	 */
    this.handleRedo = function () {
        return alert("UNDER DEVELOPMENT");
        var redo = false
    }






    function editMode (feature) {
        var type = geoflo.Features.getType(feature);
        if (!type) return alert('No Feature Type Found');

        const id = feature.id;
    
        geoflo.currentMode.type = type;
        geoflo.currentMode.source = feature.source;
        geoflo.editMode = true;
        geoflo.hotFeature = feature;
    
        geoflo.Utilities.setProperty(geoflo.hotFeature, 'type', type);
        geoflo.Utilities.setProperty(geoflo.hotFeature, 'edit', true);

        geoflo.map.getSource(geoflo.statics.constants.sources.SELECT).setData(turf.featureCollection([]));
    
        if (type === 'Polygon') {
            geoflo.hotFeature = turf.polygonToLine(geoflo.hotFeature);
        }
        
        if (type === 'Circle' || type === 'Icon' || type === 'Image') {
            geoflo.map.getSource(geoflo.statics.constants.sources.HOT).setData(turf.featureCollection([]));
        } else if (type === 'Text') {
            geoflo.map.getSource(geoflo.statics.constants.sources.HOTTEXT).setData(turf.featureCollection([geoflo.hotFeature]));
            addText.call(geoflo.currentMode, type, geoflo.hotFeature);
        } else {
            geoflo.map.getSource(geoflo.statics.constants.sources.HOT).setData(turf.featureCollection([geoflo.hotFeature]));
            geoflo.map.getSource(geoflo.statics.constants.sources.VERTEX).setData(turf.featureCollection([geoflo.hotFeature]));
        }

        var coords = geoflo.Utilities.isPoint(geoflo.hotFeature) ? geoflo.hotFeature.geometry.coordinates : geoflo.hotFeature.geometry.coordinates[geoflo.hotFeature.geometry.coordinates.length - 1];
        geoflo.lastClick = { coords: coords };
        geoflo.firstClick = { coords: coords };
        return geoflo.currentMode.type;
    }

    function finishDraw (type, point, text) {
        var feature;
        var cancelled = geoflo.currentMode.cancelled;

        if (geoflo.editMode && !geoflo.currentMode.savingEdit && !cancelled) return geoflo.currentMode.saveEdit(point);
    
        if (cancelled || !type) {
            finishText();

            if (geoflo.hotFeature) {
                geoflo.removeSelection();
                geoflo.removeFeature(geoflo.hotFeature.id, true);
                geoflo.addFeatures([geoflo.hotFeature], true);
            }

            geoflo.Pinning.resetFeatures();

            if (!geoflo.editMode) geoflo.fire('draw.cancel', { cancel: true, feature: geoflo.hotFeature });
            return false;
        } else if (type === 'Text' && !text) {
            return addText.call(geoflo.currentMode, type, point);
        } else if (geoflo.hotFeature) {
            if (geoflo.Utilities.isPoint(geoflo.hotFeature)) {
                var coords = Array.isArray(geoflo.hotFeature.geometry.coordinates[0]) ?
                geoflo.hotFeature.geometry.coordinates[0] :
                [geoflo.hotFeature.geometry.coordinates[0], geoflo.hotFeature.geometry.coordinates[1]]
    
                point = geoflo.Painting.enabled || geoflo.currentMode.savingEdit ? point : turf.point(coords);
                feature = point;
            } else if (geoflo.Utilities.isPolygon(geoflo.hotFeature, type)) {
                geoflo.hotFeature.geometry.type = "Polygon";

                if (type === 'Rectangle') {
                    geoflo.endPoint ? updateCoordinate(geoflo.hotFeature, "0.2", geoflo.endPoint[0], geoflo.endPoint[1]) : false;
                } else {
                    geoflo.hotFeature.geometry.coordinates.push(geoflo.hotFeature.geometry.coordinates[0]);
                    geoflo.hotFeature.geometry.coordinates = [geoflo.hotFeature.geometry.coordinates];
                }
            } else if (geoflo.Utilities.isLineString(geoflo.hotFeature, type)) {
                if (type === 'Polygon') {
                    geoflo.hotFeature.geometry.type = type;
                    geoflo.hotFeature.geometry.coordinates.push(geoflo.hotFeature.geometry.coordinates[0]);
                    geoflo.hotFeature.geometry.coordinates = [geoflo.hotFeature.geometry.coordinates];
                } else if (type === 'Rectangle') {
                    geoflo.endPoint ? updateCoordinate(geoflo.hotFeature, "0.2", geoflo.endPoint[0], geoflo.endPoint[1]) : false;
                }
            } else if (point) {
                feature = point;
            }
    
            if (geoflo.Painting.enabled) {
                var tolerance = geoflo.options.painting.tolerance;
    
                geoflo.hotFeature = type === 'Circle' ? geoflo.hotFeature : turf.simplify(geoflo.hotFeature, {
                    mutate: true,
                    tolerance: typeof tolerance === 'function' ? tolerance(geoflo.map) : tolerance,
                    highQuality: true
                });

                if (geoflo.startPoint) geoflo.hotFeature.geometry.coordinates[0] = geoflo.startPoint;
            }
        } else if (point) {
            feature = point;
        }
    
        feature = geoflo.Exploring.currentFeature || feature || geoflo.hotFeature;
        if (!feature || !geoflo.currentMode.activated) return geoflo.currentMode.deactivate();

        feature = geoflo.Features.addFeature(feature, geoflo.currentMode.source, geoflo.currentMode.properties);
        geoflo.fire('draw.finish', { feature: feature, pinned: geoflo.Pinning.getFeatures(), type: type, editing: geoflo.editMode });
        return geoflo.currentMode.deactivate();
    }

    function finishText (e, type, feature) {
        var marker = geoflo.textMarker;
        if (!marker) return false;

        var element = marker.getElement();
        var text = element.value;
    
        if (!text.length || geoflo.currentMode.cancelled) return marker.remove(), geoflo.textInput = false, addText.call(this, type, feature);
    
        var coords = [element.getAttribute('lng'), element.getAttribute('lat')];
        type = type || element.getAttribute('type');

        geoflo.currentMode.properties.text = text;
        
        var feature = {
            "type": "Feature",
            "properties": {
                type: type,
                text: text
            },
            "geometry": {
              "type": "Point",
              "coordinates": coords
            }
        }
        
        marker.remove();
        finishDraw(type, feature, text);
    }

    function cleanupDraw (mode) {
        geoflo.map.getSource(geoflo.statics.constants.sources.ROUTE).setData(turf.featureCollection([]));
        geoflo.map.getSource(geoflo.statics.constants.sources.SNAP).setData(turf.featureCollection([]));
        geoflo.map.getSource(geoflo.statics.constants.sources.HOT).setData(turf.featureCollection([]));
        geoflo.map.getSource(geoflo.statics.constants.sources.VERTEX).setData(turf.featureCollection([]));
        geoflo.map.getSource(geoflo.statics.constants.sources.HOTTEXT).setData(turf.featureCollection([]));
        geoflo.map.getSource(geoflo.statics.constants.sources.SELECT).setData(turf.featureCollection([]));
    
        geoflo.deleteMeshData();
    
        mode.history = [];
        mode.undo = [];
        mode.type = null;
        mode.cancelled = false;
        mode.activated = false;
        mode.savingEdit = false;

        geoflo.editMode = false;
        geoflo.drawMode = false;

        delete geoflo.startPoint;
        delete geoflo.lastClick;
        delete geoflo.firstClick;
        delete geoflo.endPoint;
        delete geoflo.snapFeature;
        delete geoflo.hotFeature;
        delete geoflo.drawStarted;
        delete geoflo.dragMoving;
        delete geoflo.editing;
        delete geoflo.textMarker;
        delete geoflo.textInput;
        delete geoflo.touchMoving;
        delete geoflo.touchDown;
        delete geoflo.pinningFeatures;
        delete geoflo.pinnedFeatures;
        delete geoflo.canDragMove;
        delete geoflo.canAddVertex;
        delete geoflo.dragIndex;
        delete geoflo.addedVertexOnLine;
        delete geoflo.snappedVertex;
    }

    function getVertex (point) {
        var hotFeature = geoflo.hotFeature;
        var vertex;
    
        if (geoflo.dragMoving) return false;
        if (!hotFeature) return false;
    
        var closest = geoflo.Snapping.getClosest(point.geometry.coordinates);
        var coords = closest.coords;
        var type = closest.point ? closest.point.type : false;
        
        if (!type) return false;
    
        if (!coords && type === 'linepoint' && closest.point.borders) {
            var segment = turf.lineString([closest.point.border1, closest.point.border2]);
            vertex = turf.along(segment, closest.point.distance1);
            coords = vertex.geometry.coordinates;
        }
    
        if (!coords) return false;

        point = turf.point(coords); 

        var isLineVertex = geoflo.Utilities.isLineString(hotFeature) && type === 'vertex';
        var nearestVertex = isLineVertex ? turf.nearestPointOnLine(hotFeature, point) : false;
           
        vertex = nearestVertex || point;
        vertex.properties.type = type;
    
        geoflo.fire('vertex.find', { vertex: vertex, feature: geoflo.hotFeature, closest: closest });
        return vertex;
    }
    
    function addVertex (point, event) {
        var feature;
    
        if (event && point) {
            var coords = geoflo.hotFeature.geometry.coordinates;
            var line = turf.lineString(coords);
            var start = turf.point(coords[0])
            var split = turf.lineSlice(start, point, line);
            var index = split.geometry.coordinates.length - 1;
            var vertex = split.geometry.coordinates[index];
    
            point = turf.point(vertex);
            
            line.geometry.coordinates.splice.apply(line.geometry.coordinates, [index, 0].concat([vertex]));
    
            line = turf.cleanCoords(line);
            feature = turf.truncate(line, { precision: 6, coordinates: 2, mutate: true });
            geoflo.hotFeature.geometry.coordinates = feature.geometry.coordinates;
            geoflo.hotFeature = geoflo.Utilities.cloneDeep(geoflo.hotFeature);
        } else if (point) {
            geoflo.canDragMove = true;
            geoflo.canAddVertex = point;
        }
    
        return point;
    }
    
    function onVertex (vertex, add) {
        var hotFeature = geoflo.hotFeature;
        var dragIndex = null;
    
        if (geoflo.dragMoving) return offVertex();
        if (!hotFeature || !vertex) return offVertex();
        
        geoflo.updateMeshData();
    
        var type = vertex.properties.type;
        var index = vertex.properties.index || vertex.properties.index == 0;
    
        dragIndex = index ? vertex.properties.index : geoflo.currentMode.type === 'Circle' || geoflo.currentMode.type === 'Icon' || geoflo.currentMode.type === 'Image' ? 0 : false;
    
        geoflo.map.getSource(geoflo.statics.constants.sources.SNAP).setData(turf.featureCollection([vertex]));
        geoflo.map.getSource(geoflo.statics.constants.sources.VERTEX).setData(turf.featureCollection([geoflo.hotFeature]));
    
        if (type === 'linepoint') return addVertex(vertex);
    
        geoflo.map.dragPan.disable();
        geoflo.dragIndex = dragIndex;
        geoflo.addedVertexOnLine = add ? vertex : false;
        geoflo.canAddVertex = false;
        geoflo.canDragMove = true;
        geoflo.snappedVertex = vertex.geometry.coordinates;
        geoflo.Pinning.setFeatures(geoflo.snappedVertex);
        geoflo.fire('vertex.on', { vertex: vertex, index: dragIndex, feature: geoflo.hotFeature });
    }
    
    function offVertex () {
        if (geoflo.mouseIsDown && geoflo.Painting.enabled) return false;

        if (geoflo.hotFeature && geoflo.snappedVertex) {
            geoflo.lastIndex ? geoflo.lastClick = { coords: geoflo.snappedVertex } : false;
            geoflo.fire('vertex.off', { vertex: false, index: geoflo.dragIndex, feature: geoflo.hotFeature })
        }
    
        geoflo.map.dragPan.enable();
        geoflo.dragMoving = false;
        geoflo.canDragMove = false;
        geoflo.snappedVertex = null;
        geoflo.dragIndex = -1;
        geoflo.mouseIsDown = geoflo.touchDown || false;
        geoflo.pinableFeatures = [];
        geoflo.lastIndex = false;
        geoflo.canAddVertex = false;
        geoflo.addedVertexOnLine = false
    }

    function addText (type, feature) {
        feature = feature || geoflo.hotFeature;
        if (!feature) return false;

        type = type || feature.properties.type;
        feature.properties.type = type;

        if (type !== 'Text') return //geoflo.Features.setText(feature);
        if (geoflo.textInput) return finishText(false, type, feature);
        
        var lngLat = { lng: feature.geometry.coordinates[0], lat: feature.geometry.coordinates[1] }
        var el = geoflo.textInput = document.createElement('input');

        el.value = feature.properties.text || '';
        el.className = 'text-marker';

        el.setAttribute('contenteditable', 'true');
        el.setAttribute('autocorrect', 'off');
        el.setAttribute('spellcheck', 'false');
        el.setAttribute('placeholder', 'Press Enter or Select Button When Done...');
        el.setAttribute('type', type);
        el.setAttribute('lng', lngLat.lng);
        el.setAttribute('lat', lngLat.lat);
        
        geoflo.textMarker = new mapboxgl.Marker(el).setLngLat(lngLat).addTo(geoflo.map);
        geoflo.textMarker.setOffset([0, -25])

        el.addEventListener("submit", finishText);
        el.addEventListener("keydown", inputText);
        el.addEventListener("paste", handlePaste);
        el.focus();

        geoflo.fire('text.add', { feature: feature, marker: geoflo.textMarker, type: type });
    
        function inputText (e) {
            if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
                e.stopPropagation();
            } else if(e.keyCode === 13) {
                e.preventDefault();
                finishText(e);
            }
        }

        function handlePaste (e) {
            var clipboardData, pastedData;
            e.stopImmediatePropagation();
            e.preventDefault();
            clipboardData = e.clipboardData || window.clipboardData;
            pastedData = clipboardData.getData('text/plain').slice(0, CHAR_LIMIT);
            e.target.innerText = pastedData;
        }
    }

    function updateCoordinate (f, t, e, n) {
        var o = t.split(".")
            , r = parseInt(o[0], 10)
            , i = parseInt(o[1], 10);
        void 0 === f.geometry.coordinates[r] && (f.geometry.coordinates[r] = []),
        f.geometry.coordinates[r][i] = [e, n]
    }

    function updateRectangle (event, type) {
        if (type !== 'Rectangle') return false;
        
        var geometry = geoflo.hotFeature.geometry;
        var coords = geometry.coordinates;
        const coordType = geometry.type;
        //coords = coordType === 'Linestring' ? coords : coords[0];
    
        if (geoflo.currentVertexPosition === 2) {
            const getpXY3 = calculatepXY3(geometry, event, type);
            if (getpXY3[2]) return updateCoordinate(`0.${geoflo.currentVertexPosition + 1}`, getpXY3[2][0], getpXY3[2][1]);
            return geoflo.hotFeature;
        }
    
        updateCoordinate(`0.${geoflo.currentVertexPosition}`, event.lngLat.lng, event.lngLat.lat);
        geoflo.currentVertexPosition++;
        updateCoordinate(`0.${geoflo.currentVertexPosition}`, event.lngLat.lng, event.lngLat.lat);
    
        function calculatepXY3 (geometry, event, type) {
            var coords = geometry.coordinates;
        
            const pXY0 = coords[0];
            const pXY0_3857 = geoflo.Utilities.degrees2meters(pXY0);
            const pXY1 = coords[1];
            const pXY1_3857 = geoflo.Utilities.degrees2meters(pXY1);
            let pXY2_3857 = geoflo.Utilities.degrees2meters([event.lngLat.lng, event.lngLat.lat]);
            const mouse_3857 = geoflo.Utilities.degrees2meters([event.lngLat.lng, event.lngLat.lat]);
        
            if (pXY0_3857[0] === pXY1_3857[0]) {
                pXY2_3857 = [mouse_3857[0], pXY1_3857[1]];
            } else if (pXY0_3857[1] === pXY1_3857[1]) {
                pXY2_3857 = [pXY1_3857[0], mouse_3857[1]];
            } else {
                const vector1_3857 = (pXY1_3857[1] - pXY0_3857[1]) / (pXY1_3857[0] - pXY0_3857[0]);
                const vector2_3857 = -1.0 / vector1_3857;
        
                if (Math.abs(vector2_3857) < 1) {
                    pXY2_3857[1] = vector2_3857 * (mouse_3857[0] - pXY1_3857[0]) + pXY1_3857[1];
                } else {
                    pXY2_3857[0] = pXY1_3857[0] + (pXY2_3857[1] - pXY1_3857[1]) / vector2_3857;
                }
            }
        
            const vector_3857 = [pXY1_3857[0] - pXY0_3857[0], pXY1_3857[1] - pXY0_3857[1]];
            const pXY3_3857 = [pXY2_3857[0] - vector_3857[0], pXY2_3857[1] - vector_3857[1]];
            const pXY2G = geoflo.Utilities.meters2degrees(pXY2_3857);
            const pXY3G = geoflo.Utilities.meters2degrees(pXY3_3857);
        
            return [coords, pXY2G, pXY3G];
        }
    
        return false;
    }

    function startIdleTime () {
        var ready = setInterval(function() {
            if (geoflo.mouseIsDown) {
                geoflo.lastDragMove += 1;
                checkIdleMove();
            } else {
                geoflo.lastDragMove = 0;
                geoflo.mouseIsIdle = false;
                clearInterval(ready);
            }
        }, 1);
    }
    
    function checkIdleMove () {
        if (geoflo.lastDragMove < geoflo.options.pinning.idle) return geoflo.mouseIsIdle = false, false;
        geoflo.mouseIsIdle = true;
        geoflo.Snapping.setVertex();
        geoflo.Pinning.updateFeatures();
        return true;
    }

    function needsToFinish (type, coords) {
        var types = ['Circle', 'Icon', 'Text', 'Image'];
        if (!type) return true;
        if (types.includes(type)) return true;
        if (type === 'Rectangle' && geoflo.startPoint) return geoflo.endPoint = coords, true;
        if (type === 'Polygon' && geoflo.snappedVertex && geoflo.startPoint && geoflo.Utilities.isPointEqual(geoflo.startPoint, geoflo.snappedVertex)) return true;
        if (geoflo.snappedVertex && geoflo.Utilities.isLastIndex(geoflo.dragIndex, geoflo.hotFeature)) return true
        if (geoflo.lastClick && geoflo.Utilities.isPointEqual(geoflo.lastClick.coords, coords)) return true;
        return false;
    }

    function constrainFeatureMovement (geojsonFeatures, delta) {
        // "inner edge" = a feature's latitude closest to the equator
        let northInnerEdge = geoflo.statics.constants.LAT_MIN;
        let southInnerEdge = geoflo.statics.constants.LAT_MAX;
        // "outer edge" = a feature's latitude furthest from the equator
        let northOuterEdge = geoflo.statics.constants.LAT_MIN;
        let southOuterEdge = geoflo.statics.constants.LAT_MAX;
    
        let westEdge = geoflo.statics.constants.LNG_MAX;
        let eastEdge = geoflo.statics.constants.LNG_MIN;
    
        geojsonFeatures.forEach((feature) => {
            //const bounds = extent(feature); Need to add Turf bounds here
            const featureSouthEdge = bounds[1];
            const featureNorthEdge = bounds[3];
            const featureWestEdge = bounds[0];
            const featureEastEdge = bounds[2];
            if (featureSouthEdge > northInnerEdge) northInnerEdge = featureSouthEdge;
            if (featureNorthEdge < southInnerEdge) southInnerEdge = featureNorthEdge;
            if (featureNorthEdge > northOuterEdge) northOuterEdge = featureNorthEdge;
            if (featureSouthEdge < southOuterEdge) southOuterEdge = featureSouthEdge;
            if (featureWestEdge < westEdge) westEdge = featureWestEdge;
            if (featureEastEdge > eastEdge) eastEdge = featureEastEdge;
        });
    
    
        // These changes are not mutually exclusive: we might hit the inner
        // edge but also have hit the outer edge and therefore need
        // another readjustment
        const constrainedDelta = delta;
    
        if (northInnerEdge + constrainedDelta.lat > geoflo.statics.constants.LAT_RENDERED_MAX) {
            constrainedDelta.lat = geoflo.statics.constants.LAT_RENDERED_MAX - northInnerEdge;
        }
        if (northOuterEdge + constrainedDelta.lat > geoflo.statics.constants.LAT_MAX) {
            constrainedDelta.lat = geoflo.statics.constants.LAT_MAX - northOuterEdge;
        }
        if (southInnerEdge + constrainedDelta.lat < geoflo.statics.constants.LAT_RENDERED_MIN) {
            constrainedDelta.lat = geoflo.statics.constants.LAT_RENDERED_MIN - southInnerEdge;
        }
        if (southOuterEdge + constrainedDelta.lat < geoflo.statics.constants.LAT_MIN) {
            constrainedDelta.lat = geoflo.statics.constants.LAT_MIN - southOuterEdge;
        }
        if (westEdge + constrainedDelta.lng <= geoflo.statics.constants.LNG_MIN) {
            constrainedDelta.lng += Math.ceil(Math.abs(constrainedDelta.lng) / 360) * 360;
        }
        if (eastEdge + constrainedDelta.lng >= geoflo.statics.constants.LNG_MAX) {
            constrainedDelta.lng -= Math.ceil(Math.abs(constrainedDelta.lng) / 360) * 360;
        }
    
        return constrainedDelta;
    }

    function calculateOrientedAnglePolygon (feature) {
        var geometry = feature.geometry;
        var coords = geometry.coordinates;
        const coordType = geometry.type;
        coords = coordType === 'Linestring' ? coords : coords[0];
    
        const pXY0 = coords[0];
        const pXY0_3857 = geoflo.Utilities.degrees2meters(pXY0);
        const pXY1 = coords[1];
        const pXY1_3857 = geoflo.Utilities.degrees2meters(pXY1);
        const angleStdGraus = Math.atan2(pXY1_3857[1] - pXY0_3857[1], pXY1_3857[0] - pXY0_3857[0]) * 180 / Math.PI;
    
        let angleSudGraus = -1.0 * (angleStdGraus + 90);
        const angle = angleSudGraus < 0 ? angleSudGraus + 360 : angleSudGraus;
        return parseFloat((angle).toFixed(2));
    }
};

export default Draw;