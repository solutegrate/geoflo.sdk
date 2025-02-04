/**
 * @mixin
 * @memberof module:geoflo
 * @name Styles
 * @description This module provides the styling functionality for the Geoflo application. It allows users to change the map style by selecting from a list of predefined styles.
 * @param {Object} options - The options object containing the styles and selected style.
 * @returns {Object} Returns the Styles object.
 */
const Styles = function (options={}) {
    const geoflo = this.geoflo;
    this.options = Object.assign(geoflo.options.styles || {}, options);
    
    /**
	 * @function
     * @memberof module:geoflo.Styles
     * @name init
     * @description Initializes the Styles object by extending the options object with the provided options, setting the styles, defaultStyle, and event listeners.
     * @param {Object} options - The options object containing the styles and selected style.
     * @returns {Object} Returns the Styles object.
     */
    this.init = function (options={}) {
        this.options = Object.assign(this.options, options);
        this.styles = this.options.styles;
        this.selected = this.options.selected || "Standard";
        this.onDocumentClick = this.onDocumentClick.bind(this);
        this.events = this.options.eventListeners;
        return this;
    }

    /**
	 * @function
     * @memberof module:geoflo.Styles
     * @name select
     * @description Selects the style with the provided name by setting the map style to the style's uri.
     * @param {String} name - The name of the style to select.
     * @returns {void}
     */
    this.select = function (name) {
        if (!this.mapStyleContainer || !this.mapStyleContainer.checkVisibility()) {
            var style = this.styles.find(style => style.title === name);
            if (style) this.map.setStyle(style.uri), this.selected = name;
            if (this.events && this.events.onChange && this.events.onChange({ style: style }, style))
            return;
        }

        const elms = this.mapStyleContainer.getElementsByClassName(name);
        if (elms.length > 0) elms[0].click();
    }

    /**
	 * @function
     * @memberof module:geoflo.Styles
     * @name hide
     * @description Hides the style control container.
     * @returns {void}
     */
    this.hide = function () {
        if (this.controlContainer) this.controlContainer.style.display = "none";
    }

    /**
     * @function
     * @memberof module:geoflo.Styles
     * @name show
     * @description Shows the style control container.
     * @returns {void}
     */
    this.show = function () {
        if (this.controlContainer) this.controlContainer.style.display = "block";
    }

    /**
	 * @function
     * @memberof module:geoflo.Styles
     * @name getDefaultPosition
     * @description Returns the default position for the style control container.
     * @returns {String} The default position for the style control container.
     */
    this.getDefaultPosition = function () {
        const defaultPosition = "top-right";
        return defaultPosition;
    }

    /**
	 * @function
     * @memberof module:geoflo.Styles
     * @name onAdd
     * @description Adds the style control container to the map.
     * @param {Object} map - The map object to add the style control container to.
     * @returns {Object} The style control container.
     * @throws {Error} Throws an error if the map object is not provided.
     */
    this.onAdd = function (map) {
        this.map = map;
        this.controlContainer = document.createElement("div");
        this.controlContainer.classList.add("mapboxgl-ctrl");
        this.controlContainer.classList.add("mapboxgl-ctrl-group");
        this.mapStyleContainer = document.createElement("div");
        this.styleButton = document.createElement("button");
        this.styleButton.type = "button";
        this.mapStyleContainer.classList.add("mapboxgl-style-list");

        for (const style of this.styles) {
            const styleElement = document.createElement("button");

            styleElement.type = "button";
            styleElement.classList.add(style.title.replace(/[^a-z0-9-]/gi, '_'));
            styleElement.dataset.uri = JSON.stringify(style.uri);

            styleElement.addEventListener("click", event => {
                const srcElement = event.target || event.srcElement;
                this.closeModal();
                if (srcElement.classList.contains("active")) return;
                if (this.events && this.events.onOpen && this.events.onOpen(event)) return;
                const style = JSON.parse(srcElement.dataset.uri);
                this.map.setStyle(style);
                const elms = this.mapStyleContainer.getElementsByClassName("active");
                while (elms[0]) elms[0].classList.remove("active");
                srcElement.classList.add("active");
                if (this.events && this.events.onChange && this.events.onChange(event, style)) return;
            });

            if (style.title === this.selected) {
                styleElement.classList.add("active");
            }

            this.mapStyleContainer.appendChild(styleElement);
        }

        this.styleButton.classList.add("mapboxgl-ctrl-icon");
        this.styleButton.classList.add("mapboxgl-style-switcher");

        this.styleButton.addEventListener("click", event => {
            if (this.events && this.events.onSelect && this.events.onSelect(event)) return;
            this.openModal();
        });

        document.addEventListener("click", this.onDocumentClick);

        this.controlContainer.appendChild(this.styleButton);
        this.controlContainer.appendChild(this.mapStyleContainer);
        
        this.closeModal();
        return this.controlContainer;
    }

    /**
	 * @function
     * @memberof module:geoflo.Styles
     * @name onRemove
     * @description Removes the style control container from the map.
     * @returns {void}
     * @throws {Error} Throws an error if the control container, control container parent node, map, or style button is not provided.
     * @throws {Error} Throws an error if the style button event listener is not removed.
     * @throws {Error} Throws an error if the document event listener is not removed.
     */
    this.onRemove = function () {
        if (!this.controlContainer || !this.controlContainer.parentNode || !this.map || !this.styleButton) {
            return;
        }
        this.styleButton.removeEventListener("click", this.onDocumentClick);
        this.controlContainer.parentNode.removeChild(this.controlContainer);
        document.removeEventListener("click", this.onDocumentClick);
        this.map = undefined;
    }

    /**
	 * @function
     * @memberof module:geoflo.Styles
     * @name closeModal
     * @description Closes the style control container.
     * @returns {void}
     */
    this.closeModal = function () {
        if (this.mapStyleContainer && this.styleButton) {
            this.mapStyleContainer.style.display = "none";
            this.styleButton.style.display = "block";
        }
    }

    /**
     * @function
     * @memberof module:geoflo.Styles
     * @name openModal
     * @description Opens the style control container.
     * @returns {void}
     */
    this.openModal = function () {
        if (this.mapStyleContainer && this.styleButton) {
            this.mapStyleContainer.style.display = "block";
            this.styleButton.style.display = "none";
        }
    }

    this.onDocumentClick = function (event) {
        if (this.controlContainer && !this.controlContainer.contains(event.target)) this.closeModal();
    }

    this.init();
};

export default Styles;