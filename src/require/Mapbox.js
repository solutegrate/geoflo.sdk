const Mapbox = (function (mapboxgl) {
    if (!mapboxgl) throw new Error('MapboxGL is required!');
    
    const DOM = {
        create: function create (tagName, className, container) {
            const el = window.document.createElement(tagName);
            if (className !== undefined) el.className = className;
            if (container) container.appendChild(el);
            return el;
        }
    }

    // Override to add a Top-Center
    mapboxgl.Map.prototype._setupContainer = function () {
        const container = this._container;
        container.classList.add('mapboxgl-map');

        const missingCSSCanary = this._missingCSSCanary = DOM.create('div', 'mapboxgl-canary', container);
        missingCSSCanary.style.visibility = 'hidden';
        this._detectMissingCSS();

        const canvasContainer = this._canvasContainer = DOM.create('div', 'mapboxgl-canvas-container', container);
        if (this._interactive) {
            canvasContainer.classList.add('mapboxgl-interactive');
        }

        this._canvas = DOM.create('canvas', 'mapboxgl-canvas', canvasContainer);
        // $FlowFixMe[method-unbinding]
        this._canvas.addEventListener('webglcontextlost', this._contextLost, false);
        // $FlowFixMe[method-unbinding]
        this._canvas.addEventListener('webglcontextrestored', this._contextRestored, false);
        this._canvas.setAttribute('tabindex', '0');
        this._canvas.setAttribute('aria-label', this._getUIString('Map.Title'));
        this._canvas.setAttribute('role', 'region');

        this._updateContainerDimensions();
        this._resizeCanvas(this._containerWidth, this._containerHeight);

        const controlContainer = this._controlContainer = DOM.create('div', 'mapboxgl-control-container', container);
        const positions = this._controlPositions = {};

        ['top-left', 'top-right', 'top-center', 'bottom-left', 'bottom-right'].forEach((positionName) => {
            positions[positionName] = DOM.create('div', `mapboxgl-ctrl-${positionName}`, controlContainer);
        });

        // $FlowFixMe[method-unbinding]
        this._container.addEventListener('scroll', this._onMapScroll, false);
    }

    return mapboxgl;
})(window.mapboxgl);

export { Mapbox as default }