<p align="center">
  <a href="https://projects.geoflo.pro?referer=docs.geoflo.pro">
    <img width="500" alt="GeoFlo Logo" src="https://geoflo.s3.amazonaws.com/logos/logo_full_white.png" />
  </a>
</p>

<h3 align="center">
  Professional Geospatial Management Library for Mapbox GL JS
</h3>
</br>
<p style="align-items: center; display: flex; flex-direction: row; justify-content: center;">
  <a style="margin:2px;color:transparent;" href="https://sdk.geoflo.pro/license.txt" target="_blank" rel="noopener noreferrer">
      <img src="https://img.shields.io/badge/License-MPL-blue.svg?style=flat&label=License&color=333333" alt="MPL 2.0 License" />
  </a>
  <a style="margin:2px;color:transparent;" href="https://docs.geoflo.pro/tutorial-basic.html" target="_blank" rel="noopener noreferrer">
    <img src="https://img.shields.io/badge/GeoFlo-Free_Demo-blue.svg?color=6fafdb" alt="GeoFlo Demo" />
  </a>
  <a style="margin:2px;color:transparent;" href="https://sdk.geoflo.pro/geoflo.min.js" target="_blank" rel="noopener noreferrer">
    <img src="https://img.shields.io/badge/GeoFlo-SDK_Link-blue.svg?color=d7ef7e" alt="GeoFlo SDK" />
  </a>
</p>

## 📖 Introduction

GeoFlo is a comprehensive geospatial management library designed for Mapbox GL JS. It provides a wide range of features and tools to enhance your mapping applications, making it easier to work with geospatial data and create interactive maps. There is no need to install anything. Simply import the library, add your Mapbox token and start using it.

## 🚧 Contributing

GeoFlo is an open-source project, and contributions are welcome. Your feedback and contributions are valuable in making GeoFlo even better.

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

### NPM Import

```bash
  npm config set registry "https://npm.pkg.github.com"
  npm install @solutegrate/geoflo
```

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

This is my first open-source Github project. While I have looked deeply into the MapboxGL code/docs, please understand that bugs will creep their way in.
Currently, GeoFlo is in its early stages of development. The goal is to make GeoFlo a powerful and versatile tool for geospatial management, and your support and feedback are crucial in achieving this.

## 🏁 Credits

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