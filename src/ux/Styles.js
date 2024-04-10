/**
 * @mixin
 * @memberof module:GeoFlo
 * @name Styles
 * @description The Styles module provides a control to change the map style.
 * @param {Object} ctx - The GeoFlo context object
 */
const Styles = function (ctx, options={}) {
    this.options = options;
    
    this.init = function (options={}) {
        ctx.Utilities.extend(this.options, options);

        this.styles = this.options.styles || [
            { title: "Dark", uri: "mapbox://styles/mapbox/dark-v11" },
            { title: "Light", uri: "mapbox://styles/mapbox/light-v11" },
            { title: "Outdoors", uri: "mapbox://styles/mapbox/outdoors-v11" },
            { title: "Satellite", uri: "mapbox://styles/mapbox/satellite-streets-v11" },
            { title: "Streets", uri: "mapbox://styles/mapbox/streets-v11" }
        ];
    
        this.defaultStyle = this.options.style || 'Dark';
        this.onDocumentClick = this.onDocumentClick.bind(this);
        this.events = this.options.eventListeners;

        return this;
    }

    this.getDefaultPosition = function () {
        const defaultPosition = "top-right";
        return defaultPosition;
    }

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
            //styleElement.innerText = style.title;
            styleElement.classList.add(style.title.replace(/[^a-z0-9-]/gi, '_'));
            styleElement.dataset.uri = JSON.stringify(style.uri);
            styleElement.addEventListener("click", event => {
                const srcElement = event.srcElement;
                this.closeModal();
                if (srcElement.classList.contains("active")) {
                    return;
                }
                if (this.events && this.events.onOpen && this.events.onOpen(event)) {
                    return;
                }
                const style = JSON.parse(srcElement.dataset.uri);
                this.map.setStyle(style);
                const elms = this.mapStyleContainer.getElementsByClassName("active");
                while (elms[0]) {
                    elms[0].classList.remove("active");
                }
                srcElement.classList.add("active");
                if (this.events && this.events.onChange && this.events.onChange(event, style)) {
                    return;
                }
            });
            if (style.title === this.defaultStyle) {
                styleElement.classList.add("active");
            }
            this.mapStyleContainer.appendChild(styleElement);
        }

        this.styleButton.classList.add("mapboxgl-ctrl-icon");
        this.styleButton.classList.add("mapboxgl-style-switcher");

        this.styleButton.addEventListener("click", event => {
            if (this.events && this.events.onSelect && this.events.onSelect(event)) {
                return;
            }
            this.openModal();
        });

        document.addEventListener("click", this.onDocumentClick);

        this.controlContainer.appendChild(this.styleButton);
        this.controlContainer.appendChild(this.mapStyleContainer);
        
        this.closeModal();
        return this.controlContainer;
    }

    this.onRemove = function () {
        if (!this.controlContainer || !this.controlContainer.parentNode || !this.map || !this.styleButton) {
            return;
        }
        this.styleButton.removeEventListener("click", this.onDocumentClick);
        this.controlContainer.parentNode.removeChild(this.controlContainer);
        document.removeEventListener("click", this.onDocumentClick);
        this.map = undefined;
    }

    this.closeModal = function () {
        if (this.mapStyleContainer && this.styleButton) {
            this.mapStyleContainer.style.display = "none";
            this.styleButton.style.display = "block";
        }
    }

    this.openModal = function () {
        if (this.mapStyleContainer && this.styleButton) {
            this.mapStyleContainer.style.display = "block";
            this.styleButton.style.display = "none";
        }
    }

    this.onDocumentClick = function (event) {
        if (this.controlContainer && !this.controlContainer.contains(event.target)) {
            this.closeModal();
        }
    }

    this.init();
}

export { Styles as default }