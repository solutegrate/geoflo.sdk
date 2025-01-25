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
  <a style="margin:2px;color:transparent;" href="https://github.com/solutegrate/geoflo.sdk/pkgs/npm/geoflo.sdk" target="_blank" rel="noopener noreferrer">
    <img src="https://img.shields.io/github/v/release/solutegrate/geoflo.sdk?style=flat&logo=github&label=Release&color=333333" alt="GitHub Release" />
  </a>
  <a style="margin:2px;color:transparent;">
    <img src="https://img.shields.io/github/size/solutegrate/geoflo.sdk/dist%2Fgeoflo-sdk.min.js?style=flat&logo=github&label=Size&color=333333" alt="GitHub Size" />
  </a>
  <a style="margin:2px;color:transparent;" href="https://github.com/solutegrate/geoflo.sdk" target="_blank" rel="noopener noreferrer">
    <img src="https://img.shields.io/github/stars/solutegrate/geoflo.sdk?style=flat&logo=github&label=Stars&color=333333" alt="GitHub Stars" />
  </a>
  <a style="margin:2px;color:transparent;" href="https://raw.githubusercontent.com/solutegrate/geoflo.sdk/main/LICENSE" target="_blank" rel="noopener noreferrer">
    <img src="https://img.shields.io/badge/License-MIT-green.svg?style=flat&logo=github&label=License&color=333333" alt="MIT License" />
  </a>
</p>

<p style="align-items: center; display: flex; flex-direction: row; justify-content: center;">
  <a style="margin:2px;color:transparent;" href="https://docs.geoflo.pro/tutorial-demo.html" target="_blank" rel="noopener noreferrer">
    <img src="https://img.shields.io/badge/Demo-TRY_IT_OUT_!-blue.svg?color=d7ef7e&logo=github" alt="GeoFlo Demo" />
  </a>
</p>

<p style="align-items: center; display: flex; flex-direction: row; justify-content: center;">
  <a style="margin:2px;color:transparent;" href="https://www.linkedin.com/company/geoflopro/about" target="_blank" rel="noopener noreferrer">
    <img src="https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white&color=5a5a5a" alt="GeoFlo LinkedIn" />
  </a>
</p>

## 🌟 Features

- Draw, Edit, Snap, Pin, Route, Paint, Explore and more...
- Circles, Icons, Images, Polylines, Polygons, Rectangles, Text and more to come...
- Import and Export Features
- Custom Color Schema
- Embedded Overpass API and OSRM Router
- Gamepad Connectivity (XBOX, Playstation, Nintendo, iBuffalo, Logitech and more)
- User Location & Follow Mode
- Base Map Control

## ⚡ Deployment

Before you get started with GeoFlo,
you need to have a Mapbox access token and add GeoFlo to your project using either the CDN or the `geoflo-sdk` npm package.

For more information on creating and using Mapbox access tokens:
[<img width="100" alt="Mapbox logo" src="./img/mapbox-logo-blue.png">](https://docs.mapbox.com/accounts/guides/tokens/)

## 🛠️ Usage/Examples


### Module Import

```bash
  npm install @solutegrate/geoflo-sdk@latest
```

```javascript
import geoflo from "@solutegrate/geoflo-sdk";
```

### CDN Import

```javascript
  <link rel="stylesheet" href="https://sdk.geoflo.pro/geoflo-sdk.css">

  <div id="map"></div>
  
  <script type="text/javascript" src="https://sdk.geoflo.pro/geoflo-sdk.min.js"></script>
```

### Initialization

```javascript
  const options = {
      container: 'map',
      noSelect: false,
      showFeatureText: true,
      map: {
          maxPitch: 75,
          style: "Satellite",
          extent: [[
              [-126.9060439709589, 51.1952997950618],
              [-65.18429019477269, 51.1952997950618],
              [-65.18429019477269, 23.808093967213807],
              [-126.9060439709589, 23.808093967213807],
              [-126.9060439709589, 51.1952997950618]
          ]]
      }
  }

  // You can either use await or a callback function similar to onReady
  geoflo.init('YOUR_MAPBOX_TOKEN', options, onReady);

  function onReady(geoflo) {
      geoflo.styles ? geoflo.styles.hide() : false;
      geoflo.mobile && geoflo.navigation ? geoflo.navigation.hide() : false;
      geoflo.mobile && geoflo.fullscreen ? geoflo.fullscreen.hide() : false;
      geoflo.viewportHeightOffset = geoflo.mobile ? 70 : 120;
      geoflo.viewportLeft = geoflo.mobile ? '10px' : '30px';
      geoflo.viewportBottom = '8%';
      geoflo.viewportWidthOffset = geoflo.mobile ? 60 : 100;
      geoflo.map.on(geoflo.id, onGeoFloEvent.bind(geoflo));
  };

  function onGeoFloEvent(event) {
      console.log(event);
  }
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