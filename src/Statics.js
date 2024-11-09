const Dev = 'solutegrate';
const Id = 'geoflo';

const Statics = {
    developer: Dev,
    id: Id,
    logo: {
        full: `https://${Id}.s3.amazonaws.com/logos/logo_full_white.png`,
        icon: `https://${Id}.s3.amazonaws.com/logos/logo_icon_white.svg`,
        fullClass: Id + '-logo',
        iconClass: Id + '-icon'
    },
    controls: [
        // TOP //
        [{
            type: 'utils',
            enable: true,
            position: 'top-center',
            group: 'action',
            divider: true,
            show: true,
            buttons: {
                zoom: true,
                refresh: true,
                locate: true
            }
        },
        {
            type: 'modes',
            enable: true,
            group: 'control',
            divider: true,
            show: true,
            buttons: {
                select: true,
                edit: true,
                save: true
            }
        },
        {
            type: 'options',
            enable: true,
            group: 'action',
            divider: false,
            show: true,
            buttons: {
                import: true,
                export: true,
                clear: true,
                undo: true,
                redo: true,
                cancel: true
            }
        }],

        // BOTTOM //
        [{
            type: 'types',
            enable: true,
            position: 'top-center',
            group: 'control',
            divider: true,
            show: true,
            buttons: {
                polyline: true,
                polygon: true,
                rectangle: true,
                circle: true,
                text: true
            }
        },
        {
            type: 'actions',
            enable: true,
            group: 'control',
            divider: false,
            show: true,
            buttons: {
                snapping: true,
                pinning: true,
                routing: true,
                exploring: true,
                painting: true
            }
        }]
    ],
    constants: {
        classes: {
            PREDEFINED_CONTROL_BASE: "mapboxgl-ctrl",
            PREDEFINED_CONTROL_GROUP: "mapboxgl-ctrl-group",
            CONTROL_PREFIX: "mapboxgl-ctrl-",
            ACTION_BUTTON: Id + "-action-btn",
            CONTROL_BUTTON: "mapbox-gl-draw_ctrl-draw-btn",
            CONTROL_BUTTON_LINE: "mapbox-gl-draw_line",
            CONTROL_BUTTON_POLYGON: "mapbox-gl-draw_polygon",
            CONTROL_BUTTON_RECTANGLE: "mapbox-gl-draw_rectangle",
            CONTROL_BUTTON_POINT: "mapbox-gl-draw_point",
            CONTROL_BUTTON_TEXT: "mapbox-gl-draw_text",
            CONTROL_BUTTON_ICON: "mapbox-gl-draw_icon",
            CONTROL_BUTTON_CLEAR: Id + "-delete-data",
            CONTROL_BUTTON_DELETE_SNAP: Id + "-delete-snap-data",
            CONTROL_BUTTON_LOCATE: Id + "-locate",
            CONTROL_BUTTON_ZOOM_IN_FEATURES: Id + "-zoom-in-features",
            CONTROL_BUTTON_HIDE_SELECTED: Id + "-hide-selected",
            CONTROL_BUTTON_ADD_FEATURE_TO_GRID: Id + "-add-feature-to-grid",
            CONTROL_BUTTON_CREATE_POLYGON: Id + "-create-polygon",
            CONTROL_BUTTON_COMBINE_FEATURES: "mapbox-gl-draw_combine",
            CONTROL_BUTTON_UNCOMBINE_FEATURES: "mapbox-gl-draw_uncombine",
            CONTROL_BUTTON_GROUP_FEATURES: Id + "-group-features",
            CONTROL_BUTTON_UNGROUP_FEATURES: Id + "-ungroup-features",
            CONTROL_BUTTON_DOWNLOAD_WAYS: Id + "-download-ways",
            CONTROL_BUTTON_DOWNLOAD_BUILDINGS: Id + "-download-buildings",
            CONTROL_BUTTON_REFRESH: Id + "-refresh",
            CONTROL_BUTTON_EDIT: Id + "-edit",
            CONTROL_BUTTON_CUT: Id + "-cut",
            CONTROL_BUTTON_SELECT: Id + "-select",
            CONTROL_BUTTON_DOWNLOAD_DATA: Id + "-download-data",
            CONTROL_BUTTON_EXPORT: Id + "-export",
            CONTROL_BUTTON_SAVE_AS_GIST: Id + "-save-as-gist",
            CONTROL_BUTTON_SAVE_AS_GEOJSON: Id + "-save-as-geojson",
            CONTROL_BUTTON_SAVE_AS_KML: Id + "-save-as-kml",
            CONTROL_BUTTON_EXPAND_EDITOR: Id + "-expand-editor",
            CONTROL_BUTTON_IMPORT: Id + "-import",
            CONTROL_BUTTON_FINSIH: Id + "-finish",
            CONTROL_BUTTON_CANCEL: Id + "-cancel",
            CONTROL_BUTTON_UNDO: Id + "-undo",
            CONTROL_BUTTON_REDO: Id + "-redo",
            CONTROL_GROUP: Id + "-ctrl-group",
            DROPDOWN_GROUP: Id + "-dropdown-group",
            DIVIDER: Id + "-divider",
            ACTION_GROUP: Id + "-action-group",
            ATTRIBUTION: "mapboxgl-ctrl-attrib",
            ACTIVE_BUTTON: "active",
            BOX_SELECT: "mapbox-gl-draw_boxselect",
        },
        sources: {
            SELECT: Id + "-select",
            SNAP: Id + "-snap",
            ROUTE: Id + "-route",
            HOT: Id + "-hot",
            COLD: Id + "-cold",
            MESH: Id + "-mesh",
            VERTEX: Id + "-vertex",
            HOTTEXT: Id + "-text",
            COLDTEXT: Id + "-coldtext",
            GAMEPAD: Id + "-gamepad"
        },
        layers: {
            MESH: Id + "-mesh"
        },
        cursors: {
            ADD: "add",
            MOVE: "move",
            DRAG: "drag",
            POINTER: "pointer",
            NONE: "none",
        },
        types: {
            POLYGON: "polygon",
            LINE: "line_string",
            POINT: "point",
        },
        geojsonTypes: {
            FEATURE: "Feature",
            POLYGON: "Polygon",
            LINE_STRING: "LineString",
            POINT: "Point",
            FEATURE_COLLECTION: "FeatureCollection",
            MULTI_PREFIX: "Multi",
            MULTI_POINT: "MultiPoint",
            MULTI_LINE_STRING: "MultiLineString",
            MULTI_POLYGON: "MultiPolygon",
        },
        modes: {
            DRAW: "draw",
            CUT: "cut",
            SELECT: "select",
            DELETE: "delete",
            EDIT: "edit"
        },
        events: {
            CREATE: "draw.create",
            DELETE: "draw.delete",
            UPDATE: "draw.update",
            SELECTION_CHANGE: "draw.selectionchange",
            MODE_CHANGE: "draw.modechange",
            ACTIONABLE: "draw.actionable",
            RENDER: "draw.render",
            COMBINE_FEATURES: "draw.combine",
            UNCOMBINE_FEATURES: "draw.uncombine",
        },
        updateActions: {
            MOVE: "move",
            CHANGE_COORDINATES: "change_coordinates",
        },
        meta: {
            FEATURE: "feature",
            MIDPOINT: "midpoint",
            VERTEX: "vertex",
        },
        activeStates: {
            ACTIVE: "true",
            INACTIVE: "false",
        },
        LAT_MIN: -90,
        LAT_RENDERED_MIN: -85,
        LAT_MAX: 90,
        LAT_RENDERED_MAX: 85,
        LNG_MIN: -270,
        LNG_MAX: 270,
        MIN_SEGMENT_LENGTH: 0.000001,
        MIN_DISTANCE: 0.00001, // 0.000001
        CIRCUM: 40075017
    }
};

export default Statics;