<a name="module_geoflo"></a>

## geoflo ⇒ <code>Object</code>
Represents the GeoFlo object that manages all modules.

**Returns**: <code>Object</code> - The GeoFlo object with various methods for managing the entire app.  

* [geoflo](#module_geoflo) ⇒ <code>Object</code>
    * [.initialize()](#module_geoflo.initialize) ⇒ <code>Object</code>
    * [.init([options], onReady)](#module_geoflo.init) ⇒ <code>Object</code>
    * [.load(map)](#module_geoflo.load) ⇒ <code>Object</code>
    * [.enable(type, options)](#module_geoflo.enable) ⇒ <code>Object</code>
    * [.disable()](#module_geoflo.disable) ⇒ <code>Object</code>
    * [.redraw()](#module_geoflo.redraw) ⇒ <code>Promise.&lt;boolean&gt;</code>
    * [.refresh()](#module_geoflo.refresh) ⇒ <code>Promise.&lt;boolean&gt;</code>
    * [.once(type, callback)](#module_geoflo.once) ⇒ <code>boolean</code>
    * [.on(type, callback)](#module_geoflo.on) ⇒ <code>boolean</code>
    * [.off(type, callback)](#module_geoflo.off) ⇒ <code>boolean</code>
    * [.fire(type, detail)](#module_geoflo.fire) ⇒ <code>boolean</code>
    * [.setOptions(options)](#module_geoflo.setOptions) ⇒ <code>Object</code>
    * [.setMode(options)](#module_geoflo.setMode) ⇒ <code>Object</code>
    * [.setControls()](#module_geoflo.setControls) ⇒ <code>Array</code>
    * ~~[.setIcon(event)](#module_geoflo.setIcon) ⇒ <code>void</code>~~
    * [.setCenterMarker(options)](#module_geoflo.setCenterMarker) ⇒ <code>Object</code> \| <code>boolean</code>
    * [.setButtons()](#module_geoflo.setButtons) ⇒ <code>boolean</code>
    * [.setActiveButton(id)](#module_geoflo.setActiveButton) ⇒ <code>boolean</code>
    * [.setTheme(colors)](#module_geoflo.setTheme) ⇒ <code>void</code>
    * [.setLayers(layers, options)](#module_geoflo.setLayers) ⇒ <code>Promise</code>
    * [.setSelectedFeatures(features)](#module_geoflo.setSelectedFeatures) ⇒ <code>boolean</code>
    * [.setMeshFeatures(features)](#module_geoflo.setMeshFeatures) ⇒ <code>Object</code>
    * [.setMapClass(name)](#module_geoflo.setMapClass) ⇒ <code>boolean</code>
    * [.setOpacity(value)](#module_geoflo.setOpacity)
    * [.hasControls()](#module_geoflo.hasControls) ⇒ <code>boolean</code>
    * [.hasSelection()](#module_geoflo.hasSelection) ⇒ <code>boolean</code>
    * [.hasSingleSelection()](#module_geoflo.hasSingleSelection) ⇒ <code>boolean</code>
    * [.activateSnapping()](#module_geoflo.activateSnapping) ⇒ <code>Object</code>
    * [.activatePinning()](#module_geoflo.activatePinning) ⇒ <code>Object</code>
    * [.activateRouting()](#module_geoflo.activateRouting) ⇒ <code>Object</code>
    * [.activateExploring()](#module_geoflo.activateExploring) ⇒ <code>Object</code>
    * [.activatePainting()](#module_geoflo.activatePainting) ⇒ <code>Object</code>
    * [.deactivateSnapping()](#module_geoflo.deactivateSnapping) ⇒ <code>boolean</code>
    * [.deactivatePinning()](#module_geoflo.deactivatePinning) ⇒ <code>boolean</code>
    * [.deactivateRouting()](#module_geoflo.deactivateRouting) ⇒ <code>boolean</code>
    * [.deactivateExploring()](#module_geoflo.deactivateExploring) ⇒ <code>boolean</code>
    * [.deactivatePainting()](#module_geoflo.deactivatePainting) ⇒ <code>boolean</code>
    * [.getMap()](#module_geoflo.getMap) ⇒ <code>Object</code>
    * [.getModes(mode)](#module_geoflo.getModes) ⇒ <code>Array</code> \| <code>Object</code>
    * [.getMode()](#module_geoflo.getMode) ⇒ <code>object</code>
    * [.getColors()](#module_geoflo.getColors) ⇒ <code>Array</code>
    * [.getButtons(id)](#module_geoflo.getButtons) ⇒ <code>object</code> \| <code>boolean</code>
    * [.getFeatures()](#module_geoflo.getFeatures) ⇒ <code>Array</code>
    * [.getDrawnFeatures()](#module_geoflo.getDrawnFeatures) ⇒ <code>Array</code>
    * [.getRenderedFeatures(lngLat, radiusInKm, filter)](#module_geoflo.getRenderedFeatures) ⇒ <code>Array.&lt;object&gt;</code>
    * [.getRenderedDrawnFeatures(lngLat, radiusInKm, filter)](#module_geoflo.getRenderedDrawnFeatures) ⇒ <code>Array</code>
    * [.getRenderedSnapFeatures(lngLat, radiusInKm, filter)](#module_geoflo.getRenderedSnapFeatures) ⇒ <code>Array</code>
    * [.getFeatureById(id)](#module_geoflo.getFeatureById) ⇒ <code>boolean</code> \| <code>object</code>
    * [.getFeaturesByLayer(source, lngLat, radiusInKm, filter)](#module_geoflo.getFeaturesByLayer) ⇒ <code>Array</code>
    * [.getSelectedFeatures()](#module_geoflo.getSelectedFeatures) ⇒ <code>Array</code>
    * [.getSelectedFeatureIds()](#module_geoflo.getSelectedFeatureIds) ⇒ <code>Array</code>
    * [.getSelectedFeaturesBbox()](#module_geoflo.getSelectedFeaturesBbox) ⇒ <code>Array.&lt;number&gt;</code>
    * [.getSelectedPropertyNames()](#module_geoflo.getSelectedPropertyNames) ⇒ <code>Array</code>
    * [.getSelectedPropertyValues()](#module_geoflo.getSelectedPropertyValues) ⇒ <code>Object</code>
    * [.getCommonGeometryType()](#module_geoflo.getCommonGeometryType) ⇒ <code>string</code> \| <code>null</code>
    * [.editFeature(id, options)](#module_geoflo.editFeature) ⇒ <code>Object</code>
    * [.cancelEdit(standby, feature)](#module_geoflo.cancelEdit) ⇒ <code>boolean</code>
    * [.saveEdit()](#module_geoflo.saveEdit) ⇒ <code>any</code>
    * [.addFeatures(features, noZoom)](#module_geoflo.addFeatures)
    * [.addFeaturesToSelected(features)](#module_geoflo.addFeaturesToSelected)
    * [.addFeaturesToMesh(features)](#module_geoflo.addFeaturesToMesh) ⇒ <code>Array</code>
    * [.addGamepad(gamepad)](#module_geoflo.addGamepad) ⇒ <code>boolean</code>
    * [.addTooltip(parent, element, options, appendTo)](#module_geoflo.addTooltip)
    * [.addPlugin(plugin)](#module_geoflo.addPlugin)
    * [.removeSelection(id)](#module_geoflo.removeSelection) ⇒ <code>number</code>
    * [.removeControls()](#module_geoflo.removeControls)
    * [.removeGamepad(gamepad)](#module_geoflo.removeGamepad) ⇒ <code>boolean</code>
    * [.removeFeatures(layers, options)](#module_geoflo.removeFeatures)
    * [.removeFeature(id, edit)](#module_geoflo.removeFeature) ⇒ <code>boolean</code>
    * [.removePopup()](#module_geoflo.removePopup) ⇒ <code>boolean</code>
    * [.updateMeshData(features, reset)](#module_geoflo.updateMeshData) ⇒ <code>Object</code>
    * [.updateSelectedProperties(newProperties, propertiesToKeep)](#module_geoflo.updateSelectedProperties)
    * [.updateOrientation(options)](#module_geoflo.updateOrientation) ⇒ <code>string</code>
    * [.updateFeatures(features)](#module_geoflo.updateFeatures) ⇒ <code>Array</code>
    * [.saveFeatures(layer)](#module_geoflo.saveFeatures) ⇒ <code>void</code>
    * [.loadFeatures()](#module_geoflo.loadFeatures) ⇒ <code>void</code>
    * [.moveMapAlongLine(line)](#module_geoflo.moveMapAlongLine) ⇒ <code>void</code>
    * [.refreshMeshData()](#module_geoflo.refreshMeshData)
    * [.deleteMeshData()](#module_geoflo.deleteMeshData)
    * [.deleteUserData()](#module_geoflo.deleteUserData) ⇒ <code>void</code>
    * [.hideSelectedFeatures()](#module_geoflo.hideSelectedFeatures) ⇒ <code>void</code>
    * [.combineSelectedFeatures()](#module_geoflo.combineSelectedFeatures) ⇒ <code>void</code>
    * [.moveSelectedFeatures(direction)](#module_geoflo.moveSelectedFeatures) ⇒ <code>boolean</code>
    * [.moveFeature(feature, direction)](#module_geoflo.moveFeature) ⇒ <code>Array</code>
    * [.forEachSelectedFeature(handler)](#module_geoflo.forEachSelectedFeature) ⇒ <code>void</code>
    * [.zoomToFeatures(features, options)](#module_geoflo.zoomToFeatures) ⇒ <code>boolean</code>
    * [.createPolygon()](#module_geoflo.createPolygon) ⇒ <code>void</code>

<a name="module_geoflo.initialize"></a>

### geoflo.initialize() ⇒ <code>Object</code>
Initializes the object and optionally assigns it to the global window object.

**Kind**: static method of [<code>geoflo</code>](#module_geoflo)  
**Returns**: <code>Object</code> - The initialized object.  
<a name="module_geoflo.init"></a>

### geoflo.init([options], onReady) ⇒ <code>Object</code>
Initializes the map component with the provided options and a callback function when ready.

**Kind**: static method of [<code>geoflo</code>](#module_geoflo)  
**Returns**: <code>Object</code> - Returns the map component instance.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> | <code>{}</code> | The options object for configuring the map component. |
| onReady | <code>function</code> |  | The callback function to be executed when the map is ready. |

<a name="module_geoflo.load"></a>

### geoflo.load(map) ⇒ <code>Object</code>
This function loads the MapboxGL SDK with the given MapboxGL map object and sets up necessary components for interaction. Loads the User, Layers, and Features components, and initializes event listeners. Calls the onReady callback if provided.

**Kind**: static method of [<code>geoflo</code>](#module_geoflo)  
**Returns**: <code>Object</code> - - Returns the SDK instance after loading and initialization.  

| Param | Type | Description |
| --- | --- | --- |
| map | <code>Object</code> | The MapboxGL map object to be used by the SDK. |

<a name="module_geoflo.enable"></a>

### geoflo.enable(type, options) ⇒ <code>Object</code>
This function enables the map interaction mode based on the provided type and options. It sets the mode to 'select' or 'draw' depending on the type parameter, initializes options, controls, modes, and triggers events.

**Kind**: static method of [<code>geoflo</code>](#module_geoflo)  
**Returns**: <code>Object</code> - - The current instance of the map with the enabled interaction mode.  

| Param | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | The type of interaction mode to enable ('select' or 'draw'). |
| options | <code>Object</code> | Additional options for the interaction mode (default: {}). |

<a name="module_geoflo.disable"></a>

### geoflo.disable() ⇒ <code>Object</code>
This function disables the map by clearing modes, setting enabled to false, resetting mode to null, resetting options to default, firing a 'map.disable' event, enabling double click zoom, removing event listeners, layers, and controls.

**Kind**: static method of [<code>geoflo</code>](#module_geoflo)  
**Returns**: <code>Object</code> - Returns the current instance of the map object.  
<a name="module_geoflo.redraw"></a>

### geoflo.redraw() ⇒ <code>Promise.&lt;boolean&gt;</code>
Redraws the map by refreshing layers, updating event listeners, and disabling double click zoom.

**Kind**: static method of [<code>geoflo</code>](#module_geoflo)  
**Returns**: <code>Promise.&lt;boolean&gt;</code> - Returns a promise that resolves to true if the map is successfully redrawn, false otherwise.  
<a name="module_geoflo.refresh"></a>

### geoflo.refresh() ⇒ <code>Promise.&lt;boolean&gt;</code>
Refreshes the content by redrawing it asynchronously.

**Kind**: static method of [<code>geoflo</code>](#module_geoflo)  
**Returns**: <code>Promise.&lt;boolean&gt;</code> - Returns a Promise that resolves to a boolean value.  
<a name="module_geoflo.once"></a>

### geoflo.once(type, callback) ⇒ <code>boolean</code>
Registers a callback function to be executed only once for a specific GeoFlo event type.

**Kind**: static method of [<code>geoflo</code>](#module_geoflo)  
**Returns**: <code>boolean</code> - Returns true if the callback is successfully registered to be executed once, otherwise false.  

| Param | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | The type of event to listen for. |
| callback | <code>function</code> | The callback function to be executed when the event occurs. |

<a name="module_geoflo.on"></a>

### geoflo.on(type, callback) ⇒ <code>boolean</code>
Registers a callback function to be executed for a specific GeoFlo event type.

**Kind**: static method of [<code>geoflo</code>](#module_geoflo)  
**Returns**: <code>boolean</code> - Returns true if the event listener was successfully attached, false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | The type of event to listen for. |
| callback | <code>function</code> | The callback function to be executed when the event occurs. |

<a name="module_geoflo.off"></a>

### geoflo.off(type, callback) ⇒ <code>boolean</code>
Removes an event listener from the map based on the provided GeoFlo event type and callback. Callback function must have a name.

**Kind**: static method of [<code>geoflo</code>](#module_geoflo)  
**Returns**: <code>boolean</code> - Returns true if the event listener was successfully removed, false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | The type of event to remove the listener from. |
| callback | <code>function</code> | The callback function to be removed as the event listener. |

<a name="module_geoflo.fire"></a>

### geoflo.fire(type, detail) ⇒ <code>boolean</code>
Fires an event with the specified GeoFlo type and detail. Detail is an Object type.

**Kind**: static method of [<code>geoflo</code>](#module_geoflo)  
**Returns**: <code>boolean</code> - Returns true if the event was successfully fired, false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | The type of the event to fire. |
| detail | <code>any</code> | Additional details to include with the event. |

<a name="module_geoflo.setOptions"></a>

### geoflo.setOptions(options) ⇒ <code>Object</code>
Sets the options for the object by merging the provided options with the existing ones.

**Kind**: static method of [<code>geoflo</code>](#module_geoflo)  
**Returns**: <code>Object</code> - The updated options object after merging.  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | The options to be merged with the existing options. |

<a name="module_geoflo.setMode"></a>

### geoflo.setMode(options) ⇒ <code>Object</code>
This function allows the user to set the mode of the map editor with various options.

**Kind**: static method of [<code>geoflo</code>](#module_geoflo)  
**Returns**: <code>Object</code> - The current mode after setting it based on the options.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>Object</code> |  | The options object for setting the mode. |
| [options.mode] | <code>string</code> | <code>&quot;&#x27;select&#x27;&quot;</code> | The mode to set (default: select). |
| [options.type] | <code>string</code> | <code>&quot;&#x27;LineString&#x27;&quot;</code> | The type of the mode (default: LineString). |
| [options.feature] | <code>Object</code> |  | The feature to edit in the mode. |

<a name="module_geoflo.setControls"></a>

### geoflo.setControls() ⇒ <code>Array</code>
Initializes and sets the controls for the map. Adds the fullscreen and navigation controls, and initializes the custom controls.

**Kind**: static method of [<code>geoflo</code>](#module_geoflo)  
**Returns**: <code>Array</code> - - An array of initialized controls for the map.  
**Params**: <code>none</code> - No parameters needed for this function.  
<a name="module_geoflo.setIcon"></a>

### ~~geoflo.setIcon(event) ⇒ <code>void</code>~~
***Deprecated***

This function determines the appropriate icon to display based on the user's following status and navigation compass icon.

**Kind**: static method of [<code>geoflo</code>](#module_geoflo)  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>Event</code> | The event for which the icon is being set. |

<a name="module_geoflo.setCenterMarker"></a>

### geoflo.setCenterMarker(options) ⇒ <code>Object</code> \| <code>boolean</code>
This function sets a marker at the center of the map. It allows customization of the marker icon and behavior.

**Kind**: static method of [<code>geoflo</code>](#module_geoflo)  
**Returns**: <code>Object</code> \| <code>boolean</code> - Returns the center marker object if successfully added or updated, or false if not applicable.  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | Options object for customizing the center marker. |
| [options.remove] | <code>boolean</code> | If true, removes the center marker. |
| [options.transform] | <code>boolean</code> | If true, applies transformation to the center marker. |
| [options.gamepad] | <code>boolean</code> | If true, applies gamepad settings to the center marker. |
| [options.dontAdd] | <code>boolean</code> | If true, does not add the center marker. |
| [options.noRemove] | <code>boolean</code> | If true, prevents the center marker from being removed. |

<a name="module_geoflo.setButtons"></a>

### geoflo.setButtons() ⇒ <code>boolean</code>
This function resets the active buttons and activates the Select button.

**Kind**: static method of [<code>geoflo</code>](#module_geoflo)  
**Returns**: <code>boolean</code> - Returns true if the Select button is successfully set, false otherwise.  
<a name="module_geoflo.setActiveButton"></a>

### geoflo.setActiveButton(id) ⇒ <code>boolean</code>
Sets the active button with the specified id in the controls array.

**Kind**: static method of [<code>geoflo</code>](#module_geoflo)  
**Returns**: <code>boolean</code> - Returns false if the controls array is empty or undefined.  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | The id of the button to set as active. |

<a name="module_geoflo.setTheme"></a>

### geoflo.setTheme(colors) ⇒ <code>void</code>
Sets the theme colors for the control.

**Kind**: static method of [<code>geoflo</code>](#module_geoflo)  

| Param | Type | Description |
| --- | --- | --- |
| colors | <code>Object</code> | An object containing the theme colors. |

<a name="module_geoflo.setLayers"></a>

### geoflo.setLayers(layers, options) ⇒ <code>Promise</code>
Sets custom layers on the map.

**Kind**: static method of [<code>geoflo</code>](#module_geoflo)  
**Returns**: <code>Promise</code> - A promise that resolves when the custom layers are set on the map.  

| Param | Type | Description |
| --- | --- | --- |
| layers | <code>Array</code> | An array of custom layers to be added to the map. |
| options | <code>Object</code> | Additional options for setting custom layers. |

<a name="module_geoflo.setSelectedFeatures"></a>

### geoflo.setSelectedFeatures(features) ⇒ <code>boolean</code>
This function updates the selected features on the map with the provided array of features.

**Kind**: static method of [<code>geoflo</code>](#module_geoflo)  
**Returns**: <code>boolean</code> - Returns false if the features array is empty.  

| Param | Type | Description |
| --- | --- | --- |
| features | <code>Array</code> | An array of features to set as selected. |

<a name="module_geoflo.setMeshFeatures"></a>

### geoflo.setMeshFeatures(features) ⇒ <code>Object</code>
Updates the mesh data with the provided features and returns the updated mesh. Adds a mesh index if it does not exist.

**Kind**: static method of [<code>geoflo</code>](#module_geoflo)  
**Returns**: <code>Object</code> - The updated mesh after setting the features.  

| Param | Type | Description |
| --- | --- | --- |
| features | <code>Array</code> | An array of features to update the mesh with. |

<a name="module_geoflo.setMapClass"></a>

### geoflo.setMapClass(name) ⇒ <code>boolean</code>
Sets a specific mouse class on the map container element based on the provided name. Removes any existing classes starting with "mouse-" before adding the new class.

**Kind**: static method of [<code>geoflo</code>](#module_geoflo)  
**Returns**: <code>boolean</code> - Returns false if the name is empty, otherwise adds the class and returns undefined.  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name of the class to be added (without the "mouse-" prefix). |

<a name="module_geoflo.setOpacity"></a>

### geoflo.setOpacity(value)
This function takes a numeric value and sets the opacity of specified layers on the map to that value.

**Kind**: static method of [<code>geoflo</code>](#module_geoflo)  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>number</code> | The opacity value to set for the layers. |

<a name="module_geoflo.hasControls"></a>

### geoflo.hasControls() ⇒ <code>boolean</code>
This function checks if the object has controls by verifying the existence and length of the controls array.

**Kind**: static method of [<code>geoflo</code>](#module_geoflo)  
**Returns**: <code>boolean</code> - Returns true if the object has controls, false otherwise.  
<a name="module_geoflo.hasSelection"></a>

### geoflo.hasSelection() ⇒ <code>boolean</code>
This function determines whether there is a selection of features.

**Kind**: static method of [<code>geoflo</code>](#module_geoflo)  
**Returns**: <code>boolean</code> - Returns true if there is a selection of features, otherwise false.  
<a name="module_geoflo.hasSingleSelection"></a>

### geoflo.hasSingleSelection() ⇒ <code>boolean</code>
This function checks if there is only one selected feature.

**Kind**: static method of [<code>geoflo</code>](#module_geoflo)  
**Returns**: <code>boolean</code> - Returns true if there is a single selection, false otherwise.  
<a name="module_geoflo.activateSnapping"></a>

### geoflo.activateSnapping() ⇒ <code>Object</code>
This function activates snapping by getting the snapping buttons, activating them, and triggering the snapping activation event. Fires a custom event 'snapping.activate' with the enabled status and the snapping object.

**Kind**: static method of [<code>geoflo</code>](#module_geoflo)  
**Returns**: <code>Object</code> - The activated Snapping object.  
<a name="module_geoflo.activatePinning"></a>

### geoflo.activatePinning() ⇒ <code>Object</code>
This function activates pinning by getting the pinning buttons, activating them, enabling snapping, activating pinning, and firing an event. Fires a custom event 'pinning.activate' with the enabled status and the pinning object.

**Kind**: static method of [<code>geoflo</code>](#module_geoflo)  
**Returns**: <code>Object</code> - The activated pinning object.  
<a name="module_geoflo.activateRouting"></a>

### geoflo.activateRouting() ⇒ <code>Object</code>
This function activates the routing feature by getting the routing buttons, activating them, enabling snapping, deactivating painting, and activating the routing itself. Fires a custom event 'routing.activate' with the enabled status and the routing object.

**Kind**: static method of [<code>geoflo</code>](#module_geoflo)  
**Returns**: <code>Object</code> - The activated Routing object.  
<a name="module_geoflo.activateExploring"></a>

### geoflo.activateExploring() ⇒ <code>Object</code>
This function activates the exploring mode by activating the exploring buttons, functionalities, and events. Fires a custom event 'exploring.activate' with the enabled status and the exploring object.

**Kind**: static method of [<code>geoflo</code>](#module_geoflo)  
**Returns**: <code>Object</code> - The activated exploring object.  
<a name="module_geoflo.activatePainting"></a>

### geoflo.activatePainting() ⇒ <code>Object</code>
Activates the painting functionality by setting the draw mode, activating the painting buttons, deactivating routing and exploring, and firing an event. Fires a custom event 'painting.activate' with the enabled status and the painting object.

**Kind**: static method of [<code>geoflo</code>](#module_geoflo)  
**Returns**: <code>Object</code> - The activated Painting object.  
<a name="module_geoflo.deactivateSnapping"></a>

### geoflo.deactivateSnapping() ⇒ <code>boolean</code>
This function deactivates the snapping feature by performing various actions. Deletes mesh data, deactivates the snapping buttons, deactivates the Snapping object, and fires a 'snapping.deactivate' event.

**Kind**: static method of [<code>geoflo</code>](#module_geoflo)  
**Returns**: <code>boolean</code> - Returns false after deactivating the snapping feature.  
<a name="module_geoflo.deactivatePinning"></a>

### geoflo.deactivatePinning() ⇒ <code>boolean</code>
This function deactivates the pinning feature by deactivating the pinning buttons, the Pinning object, and firing a 'pinning.deactivate' event.

**Kind**: static method of [<code>geoflo</code>](#module_geoflo)  
**Returns**: <code>boolean</code> - Returns false after deactivating pinning.  
<a name="module_geoflo.deactivateRouting"></a>

### geoflo.deactivateRouting() ⇒ <code>boolean</code>
Deactivates the routing functionality by deactivating the routing buttons and the Routing module. Triggers a custom event 'routing.deactivate' with enable set to false.

**Kind**: static method of [<code>geoflo</code>](#module_geoflo)  
**Returns**: <code>boolean</code> - Returns false after deactivating the routing functionality.  
<a name="module_geoflo.deactivateExploring"></a>

### geoflo.deactivateExploring() ⇒ <code>boolean</code>
This function deactivates the exploring mode by deactivating buttons, deleting mesh data, deactivating the exploring mode, and firing an event. Fires a custom event 'exploring.deactivate' with the enable status set to false.

**Kind**: static method of [<code>geoflo</code>](#module_geoflo)  
**Returns**: <code>boolean</code> - Returns false after deactivating the exploring mode.  
<a name="module_geoflo.deactivatePainting"></a>

### geoflo.deactivatePainting() ⇒ <code>boolean</code>
This function deactivates the painting mode by deactivating the buttons, the painting tool, and firing an event. Fires a custom event 'painting.deactivate' with the enable status set to false.

**Kind**: static method of [<code>geoflo</code>](#module_geoflo)  
**Returns**: <code>boolean</code> - Returns false.  
<a name="module_geoflo.getMap"></a>

### geoflo.getMap() ⇒ <code>Object</code>
Retrieves the map property from the Map object.

**Kind**: static method of [<code>geoflo</code>](#module_geoflo)  
**Returns**: <code>Object</code> - The map property of the Map object.  
<a name="module_geoflo.getModes"></a>

### geoflo.getModes(mode) ⇒ <code>Array</code> \| <code>Object</code>
Retrieves the modes based on the provided mode parameter. If a mode is specified, it returns the mode that can handle the input mode. If no mode is specified, it returns all available modes.

**Kind**: static method of [<code>geoflo</code>](#module_geoflo)  
**Returns**: <code>Array</code> \| <code>Object</code> - - An array of all available modes if no mode is specified, or the mode object that can handle the input mode.  

| Param | Type | Description |
| --- | --- | --- |
| mode | <code>string</code> | The mode to be checked against available modes. |

<a name="module_geoflo.getMode"></a>

### geoflo.getMode() ⇒ <code>object</code>
Retrieves the current mode of the object. Either 'GeoFlo.Select' or 'GeoFlo.Draw'.

**Kind**: static method of [<code>geoflo</code>](#module_geoflo)  
**Returns**: <code>object</code> - The current mode of the object.  
<a name="module_geoflo.getColors"></a>

### geoflo.getColors() ⇒ <code>Array</code>
This function retrieves the colors from the options object.

**Kind**: static method of [<code>geoflo</code>](#module_geoflo)  
**Returns**: <code>Array</code> - The colors array from the options object.  
<a name="module_geoflo.getButtons"></a>

### geoflo.getButtons(id) ⇒ <code>object</code> \| <code>boolean</code>
Retrieves the buttons associated with a specific control or all buttons from the controls.

**Kind**: static method of [<code>geoflo</code>](#module_geoflo)  
**Returns**: <code>object</code> \| <code>boolean</code> - - Returns an object containing the buttons if found, or false if controls are not available.  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | The ID of the button to retrieve. If not provided, retrieves all buttons. |

<a name="module_geoflo.getFeatures"></a>

### geoflo.getFeatures() ⇒ <code>Array</code>
This function retrieves both the drawn and selected features and returns them as a single array.

**Kind**: static method of [<code>geoflo</code>](#module_geoflo)  
**Returns**: <code>Array</code> - An array containing both the drawn and selected features.  
<a name="module_geoflo.getDrawnFeatures"></a>

### geoflo.getDrawnFeatures() ⇒ <code>Array</code>
Retrieves the drawn features from the Features object.

**Kind**: static method of [<code>geoflo</code>](#module_geoflo)  
**Returns**: <code>Array</code> - An array of drawn features.  
<a name="module_geoflo.getRenderedFeatures"></a>

### geoflo.getRenderedFeatures(lngLat, radiusInKm, filter) ⇒ <code>Array.&lt;object&gt;</code>
Retrieves rendered features within a specified radius around a given longitude and latitude, based on a filter.

**Kind**: static method of [<code>geoflo</code>](#module_geoflo)  
**Returns**: <code>Array.&lt;object&gt;</code> - An array of rendered features that match the criteria.  

| Param | Type | Description |
| --- | --- | --- |
| lngLat | <code>Array.&lt;number&gt;</code> | An array containing the longitude and latitude coordinates. |
| radiusInKm | <code>number</code> | The radius in kilometers within which to search for features. |
| filter | <code>object</code> | An optional filter object to apply when retrieving features. |

<a name="module_geoflo.getRenderedDrawnFeatures"></a>

### geoflo.getRenderedDrawnFeatures(lngLat, radiusInKm, filter) ⇒ <code>Array</code>
This function queries the map for rendered drawn features based on the provided parameters.

**Kind**: static method of [<code>geoflo</code>](#module_geoflo)  
**Returns**: <code>Array</code> - An array of features within the specified radius around the given coordinates.  

| Param | Type | Description |
| --- | --- | --- |
| lngLat | <code>Object</code> | The longitude and latitude coordinates. |
| radiusInKm | <code>number</code> | The radius in kilometers for the search. |
| filter | <code>Object</code> | Optional filter object to apply to the query. |

<a name="module_geoflo.getRenderedSnapFeatures"></a>

### geoflo.getRenderedSnapFeatures(lngLat, radiusInKm, filter) ⇒ <code>Array</code>
Retrieves rendered mesh index features within a specified radius around a given point on the map.

**Kind**: static method of [<code>geoflo</code>](#module_geoflo)  
**Returns**: <code>Array</code> - An array of features that fall within the specified radius around the given point.  

| Param | Type | Description |
| --- | --- | --- |
| lngLat | <code>Object</code> | The longitude and latitude coordinates of the center point. |
| radiusInKm | <code>number</code> | The radius in kilometers within which to search for features. |
| filter | <code>Object</code> | Optional filter to apply to the query. |

<a name="module_geoflo.getFeatureById"></a>

### geoflo.getFeatureById(id) ⇒ <code>boolean</code> \| <code>object</code>
Retrieves a feature by its ID from the Features object.

**Kind**: static method of [<code>geoflo</code>](#module_geoflo)  
**Returns**: <code>boolean</code> \| <code>object</code> - Returns the feature object if found, otherwise false.  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | The ID of the feature to retrieve. |

<a name="module_geoflo.getFeaturesByLayer"></a>

### geoflo.getFeaturesByLayer(source, lngLat, radiusInKm, filter) ⇒ <code>Array</code>
This function queries the map for features within a specified radius around a given location from a specific source layer.

**Kind**: static method of [<code>geoflo</code>](#module_geoflo)  
**Returns**: <code>Array</code> - An array of features that match the query criteria.  

| Param | Type | Description |
| --- | --- | --- |
| source | <code>string</code> | The source layer to query features from. |
| lngLat | <code>LngLat</code> | The longitude and latitude coordinates of the center point for the query. |
| radiusInKm | <code>number</code> | The radius in kilometers within which to search for features. |
| filter | <code>Object</code> | Optional filter object to apply to the query. |

<a name="module_geoflo.getSelectedFeatures"></a>

### geoflo.getSelectedFeatures() ⇒ <code>Array</code>
Retrieves the selected features stored in the selectedFeatures array.

**Kind**: static method of [<code>geoflo</code>](#module_geoflo)  
**Returns**: <code>Array</code> - An array containing the selected features.  
<a name="module_geoflo.getSelectedFeatureIds"></a>

### geoflo.getSelectedFeatureIds() ⇒ <code>Array</code>
Retrieves the IDs of selected features.

**Kind**: static method of [<code>geoflo</code>](#module_geoflo)  
**Returns**: <code>Array</code> - An array of feature IDs.  
<a name="module_geoflo.getSelectedFeaturesBbox"></a>

### geoflo.getSelectedFeaturesBbox() ⇒ <code>Array.&lt;number&gt;</code>
Retrieves the bounding box of the selected features.

**Kind**: static method of [<code>geoflo</code>](#module_geoflo)  
**Returns**: <code>Array.&lt;number&gt;</code> - The bounding box coordinates [minX, minY, maxX, maxY].  
<a name="module_geoflo.getSelectedPropertyNames"></a>

### geoflo.getSelectedPropertyNames() ⇒ <code>Array</code>
Retrieves the unique property names of selected features excluding the ID property.

**Kind**: static method of [<code>geoflo</code>](#module_geoflo)  
**Returns**: <code>Array</code> - An array of unique property names.  
<a name="module_geoflo.getSelectedPropertyValues"></a>

### geoflo.getSelectedPropertyValues() ⇒ <code>Object</code>
Retrieves the properties of selected features excluding the property with the specified ID.

**Kind**: static method of [<code>geoflo</code>](#module_geoflo)  
**Returns**: <code>Object</code> - An object containing the properties of selected features.  
<a name="module_geoflo.getCommonGeometryType"></a>

### geoflo.getCommonGeometryType() ⇒ <code>string</code> \| <code>null</code>
This function returns the common geometry type of the selected features. If all selected features have the same geometry type, it returns that type. If the selected features have different geometry types, it returns "illegal".

**Kind**: static method of [<code>geoflo</code>](#module_geoflo)  
**Returns**: <code>string</code> \| <code>null</code> - The common geometry type or null if different types are present.  
<a name="module_geoflo.editFeature"></a>

### geoflo.editFeature(id, options) ⇒ <code>Object</code>
This function allows editing a feature by providing its ID or using the currently selected feature. It triggers a 'feature.edit' event and sets the mode to 'edit'.

**Kind**: static method of [<code>geoflo</code>](#module_geoflo)  
**Returns**: <code>Object</code> - The edited feature.  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | The ID of the feature to edit. |
| options | <code>Object</code> | Additional options for editing the feature. |
| options.feature | <code>Object</code> | The feature object to edit. |

<a name="module_geoflo.cancelEdit"></a>

### geoflo.cancelEdit(standby, feature) ⇒ <code>boolean</code>
This function cancels the current edit mode if it is in 'draw' mode and deactivates the editing feature.

**Kind**: static method of [<code>geoflo</code>](#module_geoflo)  
**Returns**: <code>boolean</code> - Returns false if the current mode is not 'draw', otherwise deactivates the editing feature.  

| Param | Type | Description |
| --- | --- | --- |
| standby | <code>boolean</code> | Indicates whether the cancel operation is standby. |
| feature | <code>object</code> | The feature to be deactivated. If not provided, the editing feature will be used. |

<a name="module_geoflo.saveEdit"></a>

### geoflo.saveEdit() ⇒ <code>any</code>
Saves the edited feature using the currentModes saveEdit method.

**Kind**: static method of [<code>geoflo</code>](#module_geoflo)  
**Returns**: <code>any</code> - The result of the saveEdit method of the current mode.  
<a name="module_geoflo.addFeatures"></a>

### geoflo.addFeatures(features, noZoom)
Adds features to the map and optionally zooms to them.

**Kind**: static method of [<code>geoflo</code>](#module_geoflo)  

| Param | Type | Description |
| --- | --- | --- |
| features | <code>Array</code> | Array of features to be added to the map. |
| noZoom | <code>boolean</code> | Flag to indicate whether to zoom to the added features. |

<a name="module_geoflo.addFeaturesToSelected"></a>

### geoflo.addFeaturesToSelected(features)
This function adds the provided features to the selected features list, updates the map sources, sets buttons and updates the text.

**Kind**: static method of [<code>geoflo</code>](#module_geoflo)  

| Param | Type | Description |
| --- | --- | --- |
| features | <code>Array</code> | The features to be added to the selected features list. |

<a name="module_geoflo.addFeaturesToMesh"></a>

### geoflo.addFeaturesToMesh(features) ⇒ <code>Array</code>
Adds features to the mesh index and updates its data.

**Kind**: static method of [<code>geoflo</code>](#module_geoflo)  
**Returns**: <code>Array</code> - The array of features that were added to the mesh.  

| Param | Type | Description |
| --- | --- | --- |
| features | <code>Array</code> | An array of features to be added to the mesh. |

<a name="module_geoflo.addGamepad"></a>

### geoflo.addGamepad(gamepad) ⇒ <code>boolean</code>
Adds a gamepad to the list of available gamepads and fires an event. Fires a custom event 'gamepad.add' with the gamepad object.

**Kind**: static method of [<code>geoflo</code>](#module_geoflo)  
**Returns**: <code>boolean</code> - Returns false if the 'Gamepad' plugin is not available.  

| Param | Type | Description |
| --- | --- | --- |
| gamepad | <code>Object</code> | The gamepad object to be added. |

<a name="module_geoflo.addTooltip"></a>

### geoflo.addTooltip(parent, element, options, appendTo)
Attaches a tooltip by calling setTooltip to a specified element within a parent element.

**Kind**: static method of [<code>geoflo</code>](#module_geoflo)  

| Param | Type | Description |
| --- | --- | --- |
| parent | <code>Element</code> | The parent element to which the tooltip will be attached. |
| element | <code>Element</code> | The element to which the tooltip will be applied. |
| options | <code>Object</code> | The options for customizing the tooltip. |
| appendTo | <code>Element</code> | The element to which the tooltip will be appended. |

<a name="module_geoflo.addPlugin"></a>

### geoflo.addPlugin(plugin)
Adds a plugin to the plugins object of the current instance.

**Kind**: static method of [<code>geoflo</code>](#module_geoflo)  
**Throws**:

- <code>Error</code> If no Plugin ID is provided.


| Param | Type | Description |
| --- | --- | --- |
| plugin | <code>Object</code> | The plugin object to be added. |
| plugin.id | <code>string</code> | The unique identifier of the plugin. |

<a name="module_geoflo.removeSelection"></a>

### geoflo.removeSelection(id) ⇒ <code>number</code>
Removes the selection of features based on the provided feature ID. If no ID is provided, all selected features are deselected.

**Kind**: static method of [<code>geoflo</code>](#module_geoflo)  
**Returns**: <code>number</code> - The number of features that were deselected.  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | The ID of the feature to be deselected. |

<a name="module_geoflo.removeControls"></a>

### geoflo.removeControls()
This function is responsible for removing controls.

**Kind**: static method of [<code>geoflo</code>](#module_geoflo)  
**Params**: <code>none</code> No parameters needed.  
<a name="module_geoflo.removeGamepad"></a>

### geoflo.removeGamepad(gamepad) ⇒ <code>boolean</code>
Removes a gamepad from the list of connected gamepads and triggers the onDisconnect event. Fires a custom event 'gamepad.remove' with the gamepad object.

**Kind**: static method of [<code>geoflo</code>](#module_geoflo)  
**Returns**: <code>boolean</code> - Returns false if the gamepad is not found in the list.  

| Param | Type | Description |
| --- | --- | --- |
| gamepad | <code>Object</code> | The gamepad object to be removed. |

<a name="module_geoflo.removeFeatures"></a>

### geoflo.removeFeatures(layers, options)
Removes specified features from the map. If no layers are provided, all features are removed. If the layers parameter is not an array, the function returns false.

**Kind**: static method of [<code>geoflo</code>](#module_geoflo)  

| Param | Type | Description |
| --- | --- | --- |
| layers | <code>Array</code> | An array of layers to remove features from. |
| options | <code>Object</code> | Additional options for removing features. |

<a name="module_geoflo.removeFeature"></a>

### geoflo.removeFeature(id, edit) ⇒ <code>boolean</code>
Removes a feature from the Features collection and fires an event if edit mode is not enabled. Fires a custom event 'feature.delete' with the ID and feature object.

**Kind**: static method of [<code>geoflo</code>](#module_geoflo)  
**Returns**: <code>boolean</code> - - Returns true if the feature was successfully removed, otherwise false.  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | The ID of the feature to be removed. |
| edit | <code>boolean</code> | A flag indicating whether edit mode is enabled. |

<a name="module_geoflo.removePopup"></a>

### geoflo.removePopup() ⇒ <code>boolean</code>
Removes the popup element from the DOM.

**Kind**: static method of [<code>geoflo</code>](#module_geoflo)  
**Returns**: <code>boolean</code> - Returns true if the popup was successfully removed, false otherwise.  
<a name="module_geoflo.updateMeshData"></a>

### geoflo.updateMeshData(features, reset) ⇒ <code>Object</code>
This function updates the mesh data on the map by adding new features to the mesh index and updating the map source with the new data. If the mesh index is not available or the reset flag is set to true, the mesh index is reset before adding new features.

**Kind**: static method of [<code>geoflo</code>](#module_geoflo)  
**Returns**: <code>Object</code> - The updated feature collection that was set on the map source.  

| Param | Type | Description |
| --- | --- | --- |
| features | <code>Array</code> | An array of features to be added to the mesh index. |
| reset | <code>boolean</code> | A flag indicating whether to reset the mesh index before adding new features. |

<a name="module_geoflo.updateSelectedProperties"></a>

### geoflo.updateSelectedProperties(newProperties, propertiesToKeep)
This function updates the selected properties of features based on the new properties provided while keeping specified properties.

**Kind**: static method of [<code>geoflo</code>](#module_geoflo)  

| Param | Type | Description |
| --- | --- | --- |
| newProperties | <code>Object</code> | The new properties to update the features with. |
| propertiesToKeep | <code>Array</code> | An array of property names to keep while updating the features. |

<a name="module_geoflo.updateOrientation"></a>

### geoflo.updateOrientation(options) ⇒ <code>string</code>
Updates the orientation of the user based on the provided options.

**Kind**: static method of [<code>geoflo</code>](#module_geoflo)  
**Returns**: <code>string</code> - The location of the user after updating the orientation.  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | An object containing the options for updating the orientation. |

<a name="module_geoflo.updateFeatures"></a>

### geoflo.updateFeatures(features) ⇒ <code>Array</code>
Updates the features of a layer based on the provided features.

**Kind**: static method of [<code>geoflo</code>](#module_geoflo)  
**Returns**: <code>Array</code> - The updated features of the layer.  

| Param | Type | Description |
| --- | --- | --- |
| features | <code>Array</code> | An array of features to update the layer with. |

<a name="module_geoflo.saveFeatures"></a>

### geoflo.saveFeatures(layer) ⇒ <code>void</code>
This function prepares the features of a layer for export in different formats such as KMZ, GPX, and GeoJSON. It styles the features, creates necessary metadata, and generates the export files.

**Kind**: static method of [<code>geoflo</code>](#module_geoflo)  

| Param | Type | Description |
| --- | --- | --- |
| layer | <code>Object</code> | The layer object containing the features to be exported. |

<a name="module_geoflo.loadFeatures"></a>

### geoflo.loadFeatures() ⇒ <code>void</code>
This function creates an input element of type file, allows multiple file selection, and triggers a file selection event. It then processes the selected files by calling the Utilities.processFiles function.

**Kind**: static method of [<code>geoflo</code>](#module_geoflo)  
**Params**: <code>Event</code> event - The event object triggered by file selection.  
<a name="module_geoflo.moveMapAlongLine"></a>

### geoflo.moveMapAlongLine(line) ⇒ <code>void</code>
This function animates the movement of the map along a specified line. The camera follows the route, ensuring synchronized movement.

**Kind**: static method of [<code>geoflo</code>](#module_geoflo)  

| Param | Type | Description |
| --- | --- | --- |
| line | <code>Array</code> | The line representing the route on the map. |

<a name="module_geoflo.refreshMeshData"></a>

### geoflo.refreshMeshData()
This function refreshes the mesh data by triggering a 'snapping.refresh' event with the current mesh features.

**Kind**: static method of [<code>geoflo</code>](#module_geoflo)  
**Params**: <code>void</code> - No parameters needed for this function.  
<a name="module_geoflo.deleteMeshData"></a>

### geoflo.deleteMeshData()
Deletes the mesh data by updating it with an empty array and triggering a 'snapping.delete' event with the features from the mesh index.

**Kind**: static method of [<code>geoflo</code>](#module_geoflo)  
**Params**: <code>Array</code> features - The features to update the mesh data with.  
**Params**: <code>Boolean</code> triggerEvent - A flag to indicate whether to trigger the 'snapping.delete' event.  
<a name="module_geoflo.deleteUserData"></a>

### geoflo.deleteUserData() ⇒ <code>void</code>
This function allows the user to delete selected features or all features based on confirmation prompts. It updates the map data and resets various properties.

**Kind**: static method of [<code>geoflo</code>](#module_geoflo)  
**Returns**: <code>void</code> - - No return value.  
**Params**: <code>void</code> - No parameters required.  
<a name="module_geoflo.hideSelectedFeatures"></a>

### geoflo.hideSelectedFeatures() ⇒ <code>void</code>
This function hides the selected features on the map by moving them to a hidden features array and updating the map sources.

**Kind**: static method of [<code>geoflo</code>](#module_geoflo)  
**Params**: <code>Array</code> hiddenFeatures - Array to store the hidden features.  
**Params**: <code>Array</code> selectedFeatures - Array of selected features on the map.  
<a name="module_geoflo.combineSelectedFeatures"></a>

### geoflo.combineSelectedFeatures() ⇒ <code>void</code>
Combines selected features based on their geometry type.

**Kind**: static method of [<code>geoflo</code>](#module_geoflo)  
**Params**: <code>void</code>  
<a name="module_geoflo.moveSelectedFeatures"></a>

### geoflo.moveSelectedFeatures(direction) ⇒ <code>boolean</code>
This function checks if moving is enabled and if there are selected features of LineString type. If so, it offsets the selected LineString features by the specified distance in the provided direction.

**Kind**: static method of [<code>geoflo</code>](#module_geoflo)  
**Returns**: <code>boolean</code> - Returns false if moving is not enabled or there are no selected LineString features.  

| Param | Type | Description |
| --- | --- | --- |
| direction | <code>number</code> | The direction in which to move the selected features (1 for forward, -1 for backward). |

<a name="module_geoflo.moveFeature"></a>

### geoflo.moveFeature(feature, direction) ⇒ <code>Array</code>
This function calculates the new coordinates of a feature based on the direction and distance provided. NOT WORKING YET.

**Kind**: static method of [<code>geoflo</code>](#module_geoflo)  
**Returns**: <code>Array</code> - An array of new coordinates for the feature after moving.  

| Param | Type | Description |
| --- | --- | --- |
| feature | <code>Object</code> | The feature object to be moved. |
| direction | <code>number</code> | The direction in which the feature should be moved (1 for forward, -1 for backward). |

<a name="module_geoflo.forEachSelectedFeature"></a>

### geoflo.forEachSelectedFeature(handler) ⇒ <code>void</code>
Iterates over each selected feature and applies a handler function to it.

**Kind**: static method of [<code>geoflo</code>](#module_geoflo)  

| Param | Type | Description |
| --- | --- | --- |
| handler | <code>function</code> | The function to be applied to each selected feature. |

<a name="module_geoflo.zoomToFeatures"></a>

### geoflo.zoomToFeatures(features, options) ⇒ <code>boolean</code>
This function zooms to the provided features on the map. If no features are provided, it zooms to the selected features, cold features, or the map extent if no other features are available.

**Kind**: static method of [<code>geoflo</code>](#module_geoflo)  
**Returns**: <code>boolean</code> - Returns false if no features are available to zoom to.  

| Param | Type | Description |
| --- | --- | --- |
| features | <code>Array</code> | The features to zoom to on the map. |
| options | <code>Object</code> | Additional options for zooming (default: {}). |

<a name="module_geoflo.createPolygon"></a>

### geoflo.createPolygon() ⇒ <code>void</code>
Creates a polygon from selected LineString features and adds it to the map.

**Kind**: static method of [<code>geoflo</code>](#module_geoflo)  
**Params**: <code>Array</code> selectedFeatures - An array of selected features to be combined into a polygon.  
**Params**: <code>Object</code> selectedPropertyValues - Property values of the selected features.  
