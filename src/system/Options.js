const Options = {
    theme: 'dark',
    controls: {
        options: true,
        modes: true,
        utils: true,
        types: true,
        actions: true
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
        command: function (event, ctx, command) {
            var options = { lngLat: ctx.map.getCenter() }
            
            if (ctx.currentMode.id === 'draw') {
                ctx.currentMode.handleUp(options); 
                ctx.currentMode.handleClick(options);
            } else {
                ctx.currentMode.handleClick(options);
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
    }
}

export { Options as default }