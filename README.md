<p align="center">
  <a href="https://www.geoflo.pro/">  
    <img width="500" alt="GeoFlo Logo" src="https://geoflo.s3.amazonaws.com/logos/logo_full_white.png" />  
  </a>
</p>

<h3 align="center">
  Professional Geospatial Management Library for Mapbox GL JS
</h3>

<div style="justify-content: center;align-items: center; display: flex;">
  <a style="margin:2px;color:transparent;" href="https://www.linkedin.com/company/geoflopro/about" target="_blank" rel="noopener noreferrer">
    <img src="https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white&color=242424" alt="GeoFlo LinkedIn" />
  </a>

  <p style="display:flex;margin:5px;">
    <a style="margin:2px;color:transparent;" href="https://github.com/solutegrate/mapboxgl-geoflo/pkgs/npm/mapboxgl-geoflo" target="_blank" rel="noopener noreferrer">
      <img src="https://img.shields.io/github/v/release/solutegrate/mapboxgl-geoflo?style=flat&logo=github&label=Release&color=333333" alt="GitHub Release" />
    </a>
    <a style="margin:2px;color:transparent;">
      <img src="https://img.shields.io/github/size/solutegrate/mapboxgl-geoflo/dist%2Fmapboxgl-geoflo.min.js?style=flat&logo=github&label=Size&color=333333" alt="GitHub Size" />
    </a>
    <a style="margin:2px;color:transparent;" href="https://github.com/solutegrate/mapboxgl-geoflo" target="_blank" rel="noopener noreferrer">
      <img src="https://img.shields.io/github/stars/solutegrate/mapboxgl-geoflo?style=flat&logo=github&label=Stars&color=333333" alt="GitHub Stars" />
    </a>
    <a style="margin:2px;color:transparent;" href="https://raw.githubusercontent.com/solutegrate/mapboxgl-geoflo/main/LICENSE" target="_blank" rel="noopener noreferrer">
      <img src="https://img.shields.io/badge/License-MIT-green.svg?style=flat&logo=github&label=License&color=333333" alt="MIT License" />
    </a>
  </p>

  <p style="display:flex;margin:5px;">
    <a style="margin:2px;color:transparent;" href="https://demo.geoflo.pro/" target="_blank" rel="noopener noreferrer">
      <img src="https://img.shields.io/badge/Demo-CLICK_HERE_TO_DEMO-blue.svg?color=d7ef7e&logo=github" alt="GeoFlo Demo" />
    </a>
    <a style="margin:2px;color:transparent;" href="https://docs.geoflo.pro/" target="_blank" rel="noopener noreferrer">
      <img src="https://img.shields.io/badge/Docs-CLICK_HERE_FOR_DOCS-blue.svg?color=6fafdb&logo=github" alt="GeoFlo Docs" />
    </a>
  </p>

  <a style="margin:2px;color:transparent;" href="https://github.com/solutegrate/mapboxgl-geoflo" target="_blank" rel="noopener noreferrer">
    <img src="https://img.shields.io/badge/github-0A66C2?style=for-the-badge&logo=github&logoColor=white&color=242424" alt="GeoFlo Github" />
  </a>
</div>

## 🌟 Features

- Draw, Edit, Clone, Move, Cut, Rotate, Split, Snap, Pin, Route, Paint, Explore and more...
- Circles, Icons, Polylines, Polygons, Rectangles, Text and more to come...
- Import and Export Features
- Custom Color Schema
- Offset Overlapping Lines
- Embedded Overpass API and OSRM Router
- Gamepad Connectivity (XBOX, Playstation, Nintendo, iBuffalo, Logitech and more)
- User Location Follow Mode
- Mapbox Style Switcher Control

## ⚡ Deployment

Before you get started with GeoFlo,
you need to have a Mapbox access token and add GeoFlo to your project using either the CDN or the `mapboxgl-geoflo` npm package.

For more information on creating and using Mapbox access tokens:
[<img width="100" alt="Mapbox logo" src="./assets/images/mapbox-logo-blue.png">](https://docs.mapbox.com/accounts/guides/tokens/)

## 🛠️ Usage/Examples


### Module Import

```bash
  npm install @solutegrate/mapboxgl-geoflo
```

```javascript
import geoflo from "@solutegrate/mapboxgl-geoflo";
```

### CDN Import

```javascript
  <link rel="stylesheet" href="https://api.mapbox.com/mapbox-gl-js/v3.0.0-beta.1/mapbox-gl.css">
  <link rel="stylesheet" href="https://sdk.geoflo.pro/mapboxgl-geoflo.css">

  <div id="map"></div>

  <script type="text/javascript" src="https://unpkg.com/@turf/turf@6/turf.min.js"></script>
  <script type="text/javascript" src='https://api.tiles.mapbox.com/mapbox.js/plugins/leaflet-omnivore/v0.3.1/leaflet-omnivore.min.js'></script>
  <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/jszip@3.10.1/dist/jszip.min.js"></script>
  <script type="text/javascript" src="https://api.mapbox.com/mapbox-gl-js/v3.0.0-beta.1/mapbox-gl.js"></script>
  <script type="text/javascript" src="https://sdk.geoflo.pro/mapboxgl-geoflo.min.js"></script>
```

### Initialization

```javascript
const options = { enable: true, container: "map", accessToken: "MAPBOX_TOKEN" };
const onReady = function (ctx) {
  console.log("onReady", ctx);
};

geoflo.init(options, onReady);
```

## 🗺️ Roadmap

- MongoDB Atlas/Realm Pro Version
- AWS Integration
- Project Management/Tracking
- Data Grid, Kanban, Gantt, Calendar, Pivot
- FontAwesome Pro Icons
- Advanced Network Node Optimization
- Real-Time GPS Tracking
- Actual/Forecast Analysis
- Budget/Cost Reporting
- Integrated Material Procurement
- More and more to come.......

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