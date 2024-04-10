/**
 * @namespace
 * @memberof module:GeoFlo
 * @name Map
 * @description A class that handles map functionality in a mapping context.
 * @param {Object} ctx - The GeoFlo context object
 */
const Map = function (ctx, options) {


	/**
	 * @function
     * @memberof module:GeoFlo.Map
	 * @name init
	 * @description This function initializes the map with the given options, including setting up the Mapbox instance, SDK, and viewport.
	 * @param {Object} options - The options object for configuring the map.
	 * @returns {Object} - The current instance of the map.
	 */
    this.init = function (options={}) {
        this.options = ctx.Utilities.extend({}, options);
        this.mapbox = new ctx.Mapbox.Map(this.options);
        this.sdk = window.mapboxSdk && this.options.sdkToken ? window.mapboxSdk({ accessToken: this.options.sdkToken }) : false;
        this.viewport = document.createElement('div');
        this.viewportHeightOffset = 110;
        this.viewportWidthOffset = 20;
        this.viewportLeft = '10px';
        this.viewportBottom = '5%';
        this.mapbox.on('load', this.onLoad.bind(this));
        return this;
    }


    this.getMap = function () {
        return this.map;
    }

    this.getContainer = function () {
        return this.container;
    }

    this.getViewport = function () {
        return this.viewport;
    }


	/**
	 * @function
     * @memberof module:GeoFlo.Map
	 * @name setStyle
	 * @description Sets the style of the map and returns the updated style.
	 * @param {Object} style - The style object to be applied to the map.
	 * @returns {Object} The updated style object of the map.
	 */
    this.setStyle = function (style) {
        if (!style) { return false };
        this.map.setStyle(style, {});
        return this.map.getStyle();
    }

	/**
	 * @description Sets the extent of the map based on the provided features or a given extent. If no features are provided, it uses the rendered drawn features. If extent is specified, it sets the map extent to the extent polygon. If center is not specified and isPoint is true, it centers the map at the centroid of the extent. If center is false, it fits the map to the bounding box of the features. If center is true, it centers the map at the centroid of the bounding box.
	 * @function
     * @memberof module:GeoFlo.Map
	 * @name setExtent
	 * @param {Array} features - Array of features to set the extent based on.
	 * @param {Array} extent - Extent polygon to set the map extent to.
	 * @param {Object} options - Additional options for setting the extent (center, isPoint).
	 * @returns {Object} - The map object after setting the extent.
	 */
    this.setExtent = function (features, extent, options={}) {
        var noFeatures = !features || !features.length;
        var center = options.center;
        !center && options.isPoint ? center = true : false;
        
        if (extent) {
            this.preventDefault = true;
            features = !this.options.extent ? [] : [turf.polygon(this.options.extent)];
        } else if (noFeatures) {
            features = ctx.getRenderedDrawnFeatures();
        }

        if (!features) return this.map.jumpTo({
            bearing: this.options.bearing || this.map.getBearing(),
            center: this.options.center || this.map.getCenter(),
            zoom: this.options.zoom || this.map.getZoom(),
            pitch: this.options.pitch || this.map.getPitch()
        });

        var bbox = turf.bbox(turf.featureCollection(features));
        var polygon = turf.bboxPolygon(bbox);
        var centroid = turf.centroid(polygon);
        var jumpTo = { lat: centroid.geometry.coordinates[1], lng: centroid.geometry.coordinates[0] }

        this.setViewport();

        !center ? this.map.fitBounds(bbox) : jumpTo && jumpTo.lng ? this.map.jumpTo({ center: jumpTo }) : false;
        ctx.fire('features.zoom', { features: features, center: this.map.getCenter(), bbox: bbox });
        return this.map;
    }

	/**
	 * @function
     * @memberof module:GeoFlo.Map
	 * @name setViewport
	 * @description This function sets the style of the viewport based on the options provided. It resizes the map, calculates the height and width of the container, adjusts the height and width of the viewport, extends the viewport style, sets padding, and returns the updated viewport element.
	 * @param {Object} options - The options object containing style properties for the viewport.
	 * @param {string} [options.position='absolute'] - The position property for the viewport.
	 * @param {string} [options.margin='auto'] - The margin property for the viewport.
	 * @param {string} [options.top=''] - The top property for the viewport.
	 * @param {string} [options.left=this.viewportLeft] - The left property for the viewport.
	 * @param {string} [options.bottom=this.viewportBottom] - The bottom property for the viewport.
	 * @returns {Element} The updated viewport element.
	 */
    this.setViewport = function (options) {
        var style = options || {
            position: 'absolute',
            margin: 'auto',
            top: '',
            left: this.viewportLeft,
            bottom: this.viewportBottom
        };

        this.map.resize();

        var height = this.container.getBoundingClientRect().height;
        var width = this.container.getBoundingClientRect().width;

        style.height = `${Number.parseInt(height) - this.viewportHeightOffset}px`;
        style.width = `${Number.parseInt(width) - this.viewportWidthOffset}px`;

        ctx.Utilities.extend(this.viewport.style, style);

        this.setPadding();
        return this.viewport;
    }

	/**
	 * @function
     * @memberof module:GeoFlo.Map
	 * @name setOptions
	 * @description This function allows setting various options for the map such as maxPitch, maxZoom, minPitch, and minZoom.
	 * @param {Object} options - The options object containing the map options.
	 * @param {number} [options.maxPitch] - The maximum pitch value for the map.
	 * @param {number} [options.maxZoom] - The maximum zoom level for the map.
	 * @param {number} [options.minPitch] - The minimum pitch value for the map.
	 * @param {number} [options.minZoom] - The minimum zoom level for the map.
	 */
    this.setOptions = function (options) {
        options = options || this.options;
        if (options.maxPitch) this.map.setMaxPitch(options.maxPitch);
        if (options.maxZoom) this.map.setMaxZoom(options.maxZoom);
        if (options.minPitch) this.map.setMinPitch(options.minPitch);
        if (options.minZoom) this.map.setMinZoom(options.minZoom);
    }

	/**
	 * @function
     * @memberof module:GeoFlo.Map
	 * @name setPadding
	 * @description Calculates the padding values for the container by comparing its position with the viewport.
	 * @returns {Object} The padding object containing left, right, top, and bottom padding values.
	 * @params {void}
	 */
    this.setPadding = function () {
        var left = (this.container.getBoundingClientRect().left) - (this.viewport.getBoundingClientRect().left);
        var right = (this.container.getBoundingClientRect().right) - (this.viewport.getBoundingClientRect().right);
        var top = (this.container.getBoundingClientRect().top) - (this.viewport.getBoundingClientRect().top);
        var bottom = (this.container.getBoundingClientRect().bottom) - (this.viewport.getBoundingClientRect().bottom);
        var noPadding = this.container.getBoundingClientRect().width < 20;

        this.padding = {
            left: noPadding ? 0 : Math.abs(left),
            right: noPadding ? 0 : Math.abs(right),
            top: noPadding ? 0 : Math.abs(top),
            bottom: noPadding ? 0 : Math.abs(bottom)
        };

        this.map.setPadding(this.padding);    
        return this.padding;
    }


	/**
	 * @function
     * @memberof module:GeoFlo.Map
	 * @name onEvent
	 * @description Logs the event passed as a parameter to the console.
	 * @param {Event} event - The event object to be logged.
     * @event
	 */
    this.onEvent = function (event) {
        console.log(event)
    }
    
	/**
	 * @function
     * @memberof module:GeoFlo.Map
	 * @name onLoad
	 * @description This function is triggered when the map loads. It sets up the map container, inserts the viewport, sets options, and loads the map.
	 * @param {Event} event - The event object triggered when the map loads.
     * @event
	 */
    this.onLoad = function (event) {
        if (!event.target || !event.target.getContainer) throw new Error('MapboxGL map object is required!');
        this.map = event.target;
        this.container = this.map._container;
        this.container.insertBefore(this.viewport, this.container.firstChild);
        this.setOptions();
        this.map.off('style.load', this.onStyleLoad.bind(this));
        this.map.on('style.load', this.onStyleLoad.bind(this));
        return ctx.load();
    }

	/**
	 * @function
     * @memberof module:GeoFlo.Map
	 * @name onStyleLoad
	 * @description This function sets the URL for the glyph manager based on the provided parameters and triggers a redraw after a delay.
	 * @param {Event} event - The event object triggering the function.
     * @event
	 */
    this.onStyleLoad = function (event) {
        this.map.style && this.map.style.glyphManager ? this.map.style.glyphManager.setURL(`mapbox://fonts/${ctx.dev}/{fontstack}/{range}.pbf`, ctx.dev) : false;
        setTimeout(function() { ctx.redraw(); }, 500)
    }

	/**
	 * @function
     * @memberof module:GeoFlo.Map
	 * @name onMapMove
	 * @description This function is called when the map is moved. It handles the event triggered by the map movement.
	 * @param {Event} event - The event object containing information about the map movement.
	 * @returns {void}
     * @event
	 */
    this.onMapMove = function (event) {

    }

    this.init(options);
}

export { Map as default };