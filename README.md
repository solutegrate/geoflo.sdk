
[<img width="500" alt="GeoFlo logo" src="https://geoflo.s3.amazonaws.com/logos/logo_full_white.png">](https://www.geoflo.pro/)  

[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/company/geoflopro/about)

# MapboxGL-GeoFlo
### *Professional Geospatial Management Library for Mapbox GL JS*

[![GitHub Release](https://img.shields.io/github/v/release/solutegrate/mapboxgl-geoflo?style=social)](https://github.com/solutegrate/mapboxgl-geoflo/pkgs/npm/mapboxgl-geoflo)

[![GitHub Repo stars](https://img.shields.io/github/stars/solutegrate/mapboxgl-geoflo)](https://github.com/solutegrate/mapboxgl-geoflo)

![GitHub File size](https://img.shields.io/github/size/solutegrate/mapboxgl-geoflo/dist%2Fmapboxgl-geoflo.min.js?style=flat&logo=github&label=Size&color=333333)

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg?color=6fafdb&logo=github)](https://raw.githubusercontent.com/solutegrate/mapboxgl-geoflo/main/LICENSE)

[![Demo](https://img.shields.io/badge/Demo-CLICK_HERE_TO_DEMO-blue.svg?color=d7ef7e&logo=github)](https://demo.geoflo.pro/)

[![Docs](https://img.shields.io/badge/Docs-CLICK_HERE_FOR_DOCS-blue.svg?color=d7ef7e&logo=github)](https://docs.geoflo.pro/)

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


```bash
  npm install @solutegrate/mapboxgl-geoflo
```  
## 🛠️ Usage/Examples

### Module Import
~~~javascript  
  import geoflo from '@solutegrate/mapboxgl-geoflo'
~~~  

### CDN Import

~~~javascript  
  <link rel="stylesheet" href="https://api.mapbox.com/mapbox-gl-js/v3.0.0-beta.1/mapbox-gl.css">
  <link rel="stylesheet" href="https://sdk.geoflo.pro/mapboxgl-geoflo.css">

  <div id="map"></div>

  <script type="text/javascript" src="https://unpkg.com/@turf/turf@6/turf.min.js"></script>
  <script type="text/javascript" src='https://api.tiles.mapbox.com/mapbox.js/plugins/leaflet-omnivore/v0.3.1/leaflet-omnivore.min.js'></script>
  <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/jszip@3.10.1/dist/jszip.min.js"></script>
  <script type="text/javascript" src="https://api.mapbox.com/mapbox-gl-js/v3.0.0-beta.1/mapbox-gl.js"></script>
  <script type="text/javascript" src="https://sdk.geoflo.pro/mapboxgl-geoflo.min.js"></script>
~~~  

### Initialization
~~~javascript  
  const options = { enable: true, container: 'map', accessToken: 'MAPBOX_TOKEN' }
  const onReady = function (ctx) { console.log('onReady', ctx) }
  
  geoflo.init(options, onReady);
~~~  


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