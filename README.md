<p align="center">
  <a href="https://www.geoflo.pro/">  
    <img width="500" alt="GeoFlo Logo" src="https://geoflo.s3.amazonaws.com/logos/logo_full_white.png" />  
  </a>
</p>

<h3 align="center">
  Professional Geospatial Management Library for Mapbox GL JS
</h3>
</br>
<p style="align-items: center; display: flex; flex-direction: row; justify-content: center;">
  <a style="margin:2px;color:transparent;" href="https://raw.githubusercontent.com/solutegrate/geoflo.sdk/main/LICENSE" target="_blank" rel="noopener noreferrer">
    <img src="https://img.shields.io/badge/License-MPL-green.svg?style=flat&logo=github&label=License&color=333333" alt="MPL 2.0 License" />
  </a>
  <a style="margin:2px;color:transparent;" href="https://docs.geoflo.pro/" target="_blank" rel="noopener noreferrer">
    <img src="https://img.shields.io/badge/Demo-Click_Here-blue.svg?color=d7ef7e&logo=github" alt="GeoFlo SDK Latest" />
  </a>
</p>

## 🌟 Key Features

- **Advanced Editing:** Draw, edit, snap, pin, route, paint, explore and much more.
- **Versatile Features:** Work with circles, icons, images, polylines, polygons, rectangles, text, and continuously expanding element types.
- **Robust Import/Export:** Seamlessly import and export your data.
- **Customizable Color Schemes:** Tailor your map's look and feel with custom colors.
- **Integrated APIs:** Fully embedded Overpass API and OSRM Router for enhanced geospatial data and routing.
- **Comprehensive Gamepad Support:** Compatible with controllers including XBOX, PlayStation, Nintendo, iBuffalo, Logitech, and others.
- **Smart Location Services:** Enable user location tracking and follow mode for dynamic navigation.
- **Intuitive Base Map Control:** Easily manage and customize your base map settings.
- **Dynamic Layer Management:** Create, edit, and delete layers with ease.
- **Interactive Feature Management:** Select, move, rotate, scale, and delete features with simple gestures.
- **Effortless Undo/Redo:** Quickly undo and redo your actions with a single click. (In Development)


## ⚡ Deployment

Before you get started with GeoFlo, you need to have a Mapbox access token.
For more information on creating and using Mapbox access tokens:
[<img width="100" alt="Mapbox logo" src="./img/mapbox-logo-blue.png">](https://docs.mapbox.com/accounts/guides/tokens/)

## 🛠️ Usage/Examples

### CDN Import

```javascript
  <link rel="stylesheet" href="https://sdk.geoflo.pro/geoflo.css">

  <div id="map"></div>

  <script type="text/javascript" src="https://sdk.geoflo.pro/geoflo.min.js"></script>
```

### Initialization

```javascript
  (async function() {
      await geoflo.init('YOUR_MAPBOX_TOKEN', { container: 'map' });
      geoflo.map.on(geoflo.id, function onGeoFloEvent(event) { console.log(event); });
  })();
```

## 🗺️ Roadmap

- Clone
- Move
- Cut
- Rotate
- Split

## 🏁 Credits

This is my first Github Project and first MapboxGL Plugin. While I have looked deeply into the MapboxGL code/docs, please understand that bugs will creep their way in.

This project utilizes the following libraries:

- **Mapbox GL JS**: A powerful mapping platform that provides geospatial services and tools.
- **Turf.js**: A modular geospatial engine written in JavaScript and TypeScript. Turf.js offers traditional spatial operations, helper functions for creating GeoJSON data, and data classification and statistics tools.

### About Mapbox GL JS

Mapbox GL JS is a client-side JavaScript library for building web maps and web applications with Mapbox's modern mapping technology. You can use Mapbox GL JS to:

- Display Mapbox maps in a web browser or client.
- Add user interactivity to your maps.
- Customize the map experience in your application.

The "GL" in Mapbox GL JS refers to Mapbox GL, a graphics library that renders 2D and 3D Mapbox maps as dynamic visual graphics with OpenGL in any compatible web browser, without using additional plugins.

### About Turf.js

Turf.js is a JavaScript library for spatial analysis. It includes:
- Traditional spatial operations
- Helper functions for creating GeoJSON data
- Data classification and statistics tools