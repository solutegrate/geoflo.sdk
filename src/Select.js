/**
 * @mixin
 * @memberof module:geoflo
 * @name Select
 * @description This module provides the select functionality for the Geoflo application. It allows users to select features on the map by clicking on them.
 * @returns {Object} Returns the Select object.
 */
const Select = function () {
    const geoflo = this.geoflo;

    var lastKnownSelectIds = [];
    var removedFeatures = [];
    var nearFeatures = [];
    var clickCoords;
    var multipleSelect;
    var selectedId;

    this.id = 'select';

    /**
	 * @function
     * @memberof module:geoflo.Select
	 * @name activate
	 * @description This function activates the select feature functionality by enabling drag pan, setting buttons, and setting the active button to 'select'. It also triggers a 'select.activate' event with the provided options.
	 * @param {Object} options - The options object for activation.
	 * @param {string} [options.id] - The ID of the feature to select.
	 * @param {Object} [options.feature] - The feature object to select.
	 * @returns {boolean} Returns false if already activated.
	 */
    this.activate = function (options={}) {
        if (this.activated) return false;
        if (geoflo.currentMode.id !== this.id) return options.mode = this.id, geoflo.setMode(options);

        this.activated = true;
        geoflo.map.dragPan.enable();
        geoflo.setButtons();
        geoflo.setActiveButton('select');
        geoflo.fire('select.activate', { activated: true, options: options })
        if (this.gamepad) {}
        geoflo.map.getSource(geoflo.statics.constants.sources.SELECT).setData(turf.featureCollection([]));
        setTimeout(function(e) { e.selectFeature(options.id ? options.id : options.feature ? options.feature.id : false) }, 5, this)
    };

	/**
	 * @function
     * @memberof module:geoflo.Select
	 * @name deactivate
	 * @description This function deactivates the current feature by setting the 'activated' flag to false and triggering necessary actions.
	 * @returns {boolean} Returns false if the feature is not activated.
	 */
    this.deactivate = function () {
        if (!this.activated) return false;

        this.activated = false;
        this.deselectCurrentFeature();
        
        geoflo.setButtons();
        geoflo.fire('select.deactivate', { activated: true });
    };

	/**
	 * @function
     * @memberof module:geoflo.Select
	 * @name canHandle
	 * @description This function determines if the given mode name is equal to the SELECT mode.
	 * @param {string} modeName - The mode name to be checked.
	 * @returns {boolean} Returns true if the mode name is SELECT, false otherwise.
	 */
    this.canHandle = function (modeName) {
        return geoflo.statics.constants.modes.SELECT === modeName;
    };

	/**
	 * @function
     * @memberof module:geoflo.Select
	 * @name selectFeature
	 * @description Selects a feature by its ID, adds it to the selected features list, and optionally adds a popup.
	 * @param {string} id - The ID of the feature to be selected.
	 * @returns {Array} - An array of removed features if wantingToEdit is false, otherwise returns the removed feature.
	 */
    this.selectFeature = function (id, options={}) {
        const popup = geoflo.options.select.popup;
        
        geoflo.map.getSource(geoflo.statics.constants.sources.SELECT).setData(turf.featureCollection([]));
        
        if (!id) return false;
        if (lastKnownSelectIds.indexOf(id) === -1) lastKnownSelectIds.push(id);
        //if (geoflo.hasSelection()) geoflo.forEachSelectedFeature((feature) => { });

        removedFeatures = geoflo.Features.removeFeatures(id);
        geoflo.addFeaturesToSelected(removedFeatures, options);
        popup ? this.addPopup(removedFeatures) : false;


        geoflo.fire('feature.select', { ids: geoflo.getSelectedFeatureIds(), features: geoflo.getSelectedFeatures() });
        if (!geoflo.wantingToEdit) return removedFeatures;
        if (removedFeatures.length == 1 && id === removedFeatures[0].id) editFeature(removedFeatures[0]);
        return removedFeatures;
    };

	/**
	 * @function
     * @memberof module:geoflo.Select
	 * @name deselectCurrentFeature
	 * @description Deselects the current feature by removing its selection.
	 */
    this.deselectCurrentFeature = function () {
        const ids = geoflo.getSelectedFeatureIds();
        const features = geoflo.getSelectedFeatures();
        geoflo.removeSelection();
        geoflo.fire('feature.deselect', { ids: ids, features: features });
    };

	/**
	 * @function
     * @memberof module:geoflo.Select
	 * @name addPopup
	 * @description This function creates a popup element with the specified features and adds it to the map at the click coordinates.
	 * @param {Object} features - The features to be displayed in the popup.
	 * @param {string} features.title - The title of the popup.
	 * @param {string} features.description - The description of the popup.
	 * @param {number} features.latitude - The latitude coordinate for the popup location.
	 * @param {number} features.longitude - The longitude coordinate for the popup location.
	 */
    this.addPopup = function (features) {
        this.popupElement = buildPopup(features);

        this.popup = new mapboxgl.Popup({ closeOnClick: false })
            .setLngLat(clickCoords)
            .setDOMContent(this.popupElement)
            .addTo(geoflo.map)
            .setOffset(12);

        this.popup._container.style['margin-bottom'] = '10px'
    };

	/**
	 * @function
     * @memberof module:geoflo.Select
	 * @name removePopup
	 * @description Removes the popup element from the DOM if it exists.
	 * @return {boolean} Returns true if the popup element was successfully removed, otherwise false.
	 */
    this.removePopup = function () {
        return this.popup && this.popup.remove ? this.popup.remove() : false;
    };

	/**
	 * @function
     * @memberof module:geoflo.Select
	 * @name handleMove
	 * @description Handles the mouse move event.
	 * @param {Event} event - The event object representing the mouse move event.
	 */
    this.handleMove = function (event) {
        //geoflo.setMapClass('pointer');
    };

	/**
	 * @function
     * @memberof module:geoflo.Select
	 * @name handleClick
	 * @description Handles the click event on the map and selects features based on the event.
	 * @param {Object} event - The event object containing information about the click event.
	 * @returns {boolean} Returns false if geoflo.noSelect is true, otherwise selects features based on the event.
	 */
    this.handleClick = function (event) {
        var features = geoflo.getRenderedDrawnFeatures(event.lngLat);

        clickCoords = [event.lngLat.lng, event.lngLat.lat];
        multipleSelect = event.originalEvent && event.originalEvent.shiftKey && geoflo.options.select.multiple;

        if (features.length > 0) {
            if (!geoflo.Layers.getSelection(features, clickCoords)) return;
            selectFeature.call(this, features);
        } else if (!multipleSelect) {
            lastKnownSelectIds = [];
            nearFeatures = [];
            clickCoords = false;
            selectedId = false;
            this.deselectCurrentFeature();
        }
    };

	/**
	 * @function
     * @memberof module:geoflo.Select
	 * @name handleDrag
	 * @description Handles the drag event triggered by a user interaction. It sets the map class to 'grabbing' to indicate dragging.
	 * @param {Event} event - The event object representing the drag event.
	 */
    this.handleDrag = function (event) {
        //geoflo.setMapClass('grabbing');
    }


    function buildPopup (features) {
        const element = document.createElement('div');
        element.classList.add('popup-table-holder');

        const table = buildTable(features);

        element.appendChild(table);

        if (nearFeatures.length > 1) {
            var button = document.createElement('div');
            button.classList.add('popup-table-button');
            button.innerHTML = `<button> Next </button>`;
            button.addEventListener('click', selectFeature.bind(this));
            element.appendChild(button);
        }

        return element;
        
        /* const button = document.createElement('div');
        button.innerHTML = `<button class="btn btn-success btn-simple text-white" > Assign</button>`;
        element.appendChild(button);
        button.addEventListener('click', (e) => { console.log('Button clicked' + name); }); */
    };

    function buildTable (features) {
        var table = document.createElement('table');
        var properties = ['id', 'type'];

        table.style.width = '100%';
        table.style.height = '100%';
        table.setAttribute('border', '1');
        table.classList.add('popup-table');

        var tableBody = document.createElement('tbody');

        features.forEach(function(feature, index) {
            var type = feature.properties.type;

            properties.forEach(function(prop) {
                tableBody.appendChild(buildRow(prop, feature.properties[prop]));
            })

            tableBody.appendChild(buildRow('geometry', feature.geometry.type));

            if (feature.geometry.type === 'LineString') {
                geoflo.Features.addUnits(feature, 'feet');
                tableBody.appendChild(buildRow('unit', feature.geometry.unit));
                tableBody.appendChild(buildRow('units', feature.geometry.units));
            } else if (type === 'Text') {
                tableBody.appendChild(buildRow('content', feature.properties.text));
            } else if (feature.geometry.type === 'Polygon') {
                geoflo.Features.addUnits(feature, 'acres');
                tableBody.appendChild(buildRow('unit', feature.geometry.unit));
                tableBody.appendChild(buildRow('units', feature.geometry.units));
            }
        })

        table.appendChild(tableBody);
        return table;
    };

    function buildRow (header, data) {
        var tr = document.createElement('tr');
        tr.classList.add('popup-table-row');

        if (header) {
            var th = document.createElement('th');
            th.classList.add('popup-table-header');
            th.appendChild(document.createTextNode(header));
            tr.appendChild(th);
        }
        
        var td = document.createElement('td');
        td.classList.add('popup-table-data');
        td.classList.add(header);
        td.appendChild(document.createTextNode(data));
        tr.appendChild(td);

        return tr;
    }

    function selectFeature (features) {
        multipleSelect = geoflo.options.select.multiple;
        nearFeatures = features;
        lastKnownSelectIds = lastKnownSelectIds === undefined ? [] : lastKnownSelectIds;

        if (features.length >= lastKnownSelectIds.length) {
            lastKnownSelectIds.splice(0, features.length - lastKnownSelectIds.length + 1);
        }

        var feat = features[0];
        selectedId = feat.id || feat.properties['id'];

        if (features.length > 1) {
            features.forEach((feature) => {
                const id = feature.id || feature.properties['id'];
                if (lastKnownSelectIds.indexOf(id) === -1 && !feature.properties['_selected']) {
                    selectedId = id;
                    feat = feature;
                }
            });
        }

        if (!multipleSelect) geoflo.currentMode.deselectCurrentFeature();
        geoflo.currentMode.selectFeature(selectedId);
    }

    function editFeature (feature) {
        geoflo.wantingToEdit = false;
        geoflo.setMode('edit', feature.properties.type, feature);
    }
};

export default Select;