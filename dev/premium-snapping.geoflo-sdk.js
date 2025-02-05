/*!
 * /*!
 *  * GeoFlo SDK
 *  * Version 1.0.11
 *  * Generated on: 2025-02-05T18:12:16.694Z
 *  * /
 */
"use strict";
(self["webpackChunk_solutegrate_geoflo_sdk"] = self["webpackChunk_solutegrate_geoflo_sdk"] || []).push([["premium-snapping"],{

/***/ "./src/Snapping.js":
/*!*************************!*\
  !*** ./src/Snapping.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
/**
 * @mixin
 * @memberof module:geoflo
 * @name Snapping
 * @description This module provides the snapping functionality for the Geoflo application. It allows users to snap features to the map by creating a buffer around the feature and snapping to nearby features.
 * @param {Object} mode - The mode object containing the type of mode.
 * @returns {Object} Returns the Snapping object.
 */
var Snapping = function Snapping(mode) {
  var geoflo = this.geoflo;
  this.type = mode.type;

  /**
   * @function
      * @memberof module:geoflo.Snapping
   * @name activate
   * @description This function enables the object and sets the snapping option to true.
   */
  this.activate = function () {
    this.enabled = true;
    geoflo.options['snapping'].enable = true;
  };

  /**
   * @function
      * @memberof module:geoflo.Snapping
   * @name deactivate
   * @description This function sets the 'enabled' property to false, disables snapping, and updates the mesh data.
   * @returns {void}
   */
  this.deactivate = function () {
    this.enabled = false;
    geoflo.options['snapping'].enable = false;
    geoflo.updateMeshData([], true);
  };

  /**
   * @function
      * @memberof module:geoflo.Snapping
   * @name getClosest
   * @description Finds the closest point to the given coordinates within a specified radius or pixel distance.
   * @param {Array<number>} coords - The coordinates [longitude, latitude] to find the closest point to.
   * @param {Array<Object>} features - An array of features to search for the closest point within.
   * @returns {Object} An object containing the closest point and its coordinates.
   */
  this.getClosest = function (coords, features) {
    var calculatedRadius = geoflo.options.snapping.distance * Math.pow(2, Math.max(1, 19 - geoflo.map.getZoom()));
    var radiusInKm = calculatedRadius / 100000;
    var pixelDistance = geoflo.options.snapping.pixels ? geoflo.options.snapping.pixels * metersPerPixel(coords[1], geoflo.map.getZoom()) : false;
    features = features ? geoflo.getRenderedSnapFeatures({
      lng: coords[0],
      lat: coords[1]
    }, radiusInKm) : [geoflo.hotFeature];
    var closestPoint = findClosestPoint(features, coords, radiusInKm, pixelDistance);
    var coords = !closestPoint ? false : pixelDistance ? closestPoint.coords : closestPoint.type === 'vertex' && closestPoint.dist <= radiusInKm ? closestPoint.coords : false;
    return {
      point: closestPoint,
      coords: coords
    };
  };

  /**
   * @function
      * @memberof module:geoflo.Snapping
   * @name setClosest
   * @description This function calculates the closest feature to the given coordinates within a specified radius and snapping parameters. It determines if the closest feature is a point or a vertex and returns the snapped feature accordingly.
   * @param {Array<number>} coords - The coordinates [longitude, latitude] to find the closest feature to.
   * @param {boolean} isPoint - Indicates if the feature is a point.
   * @param {boolean} isVertex - Indicates if the feature is a vertex.
   * @returns {Object} The snapped feature based on the calculated closest point or line.
   */
  this.setClosest = function (coords, isPoint, isVertex) {
    var snapFeature = null;
    var calculatedRadius = geoflo.options.snapping.distance * Math.pow(2, Math.max(1, 19 - geoflo.map.getZoom()));
    var radiusInKm = calculatedRadius / 100000;
    var pixelDistance = geoflo.options.snapping.pixels ? geoflo.options.snapping.pixels * metersPerPixel(coords[1], geoflo.map.getZoom()) : false;
    var filter = geoflo.pinableFeatures && geoflo.pinableFeatures.length ? ['case', ['any'].concat(_toConsumableArray(geoflo.pinableFeatures.map(function (e) {
      return ["==", ["get", "id"], e.id || e.properties.id];
    }))), false, true] : false;
    var nearFeatures = geoflo.getRenderedFeatures({
      lng: coords[0],
      lat: coords[1]
    }, radiusInKm, filter);
    var closestPoint = nearFeatures && nearFeatures.length ? findClosestPoint(nearFeatures, coords, radiusInKm, pixelDistance) : false;
    var lastClickDistance, lastClickArray, lastClickEqual;
    geoflo.closestPoint = closestPoint;
    if (!nearFeatures && !isPoint || !closestPoint && !isPoint) return this.updateFeature(coords);
    if (!closestPoint || !closestPoint.coords) return snapFeature;
    if (isVertex || !geoflo.lastClick) {
      snapFeature = turf.point(closestPoint.coords);
    } else {
      lastClickArray = Array.isArray(geoflo.lastClick.coords) && Array.isArray(geoflo.lastClick.coords[0]);
      if (lastClickArray) geoflo.lastClick.coords = geoflo.lastClick.coords[0];
      lastClickDistance = turf.distance(turf.point(coords), turf.point(geoflo.lastClick.coords));
      lastClickEqual = geoflo.Utilities.isPointEqual(geoflo.lastClick.coords, closestPoint.coords);
      if (lastClickEqual && lastClickDistance > geoflo.options.snapping.tolerance) return this.updateFeature(coords);
      snapFeature = turf.lineString([geoflo.lastClick.coords, closestPoint.coords]);
    }
    geoflo.fire('snapping.add', {
      closest: closestPoint,
      snapped: snapFeature
    });
    return snapFeature;
  };

  /**
   * @function
      * @memberof module:geoflo.Snapping
   * @name setFeature
   * @description This function sets a feature on the map using the provided feature and coordinates. It handles different scenarios such as creating a point, line, or polygon feature based on the input parameters.
   * @param {Object} feature - The feature to be set on the map.
   * @param {Array} coords - The coordinates for the feature.
   * @returns {Object} The feature that was set on the map.
   */
  this.setFeature = function (feature, coords) {
    if (geoflo.touchClick) return null;
    feature = feature || geoflo.snapFeature;
    if (!feature && coords) return setFeature(turf.point(coords));
    if (!feature) return geoflo.map.getSource(geoflo.statics.constants.sources.SNAP).setData(turf.featureCollection([])), null;
    var snapCoords = feature.geometry.coordinates;
    var lastClick = coords || geoflo.lastClick.coords;
    var firstClick = geoflo.firstClick.coords;
    var isPolygon = this.type === 'Polygon' || feature.properties.type === 'Polygon';
    var isPolyline = feature.geometry.type === "LineString";
    if (!isPolyline || snapCoords.length < 2) {
      feature = setFeature(isPolygon ? turf.lineString([firstClick, lastClick]) : turf.point(lastClick));
    } else if (geoflo.hotFeature) {
      var hotCoords = geoflo.hotFeature.geometry.coordinates;
      if (isPolygon) snapCoords.pop();
      hotCoords.splice.apply(hotCoords, [-1, 1].concat(geoflo.Utilities.consumableArray(snapCoords)));
    } else {
      geoflo.hotFeature = turf.lineString(snapCoords);
    }
    geoflo.Utilities.setProperty(geoflo.hotFeature, 'type', this.type);
    feature = setFeature(isPolygon ? turf.lineString([firstClick, lastClick]) : turf.point(lastClick));
    geoflo.snapFeature = feature;
    return geoflo.snapFeature;
  };

  /**
   * @function
      * @memberof module:geoflo.Snapping
   * @name setVertex
   * @description This function determines the vertex based on snapping and routing settings. It sets the closest feature when snapping is enabled and calculates the route if routing is enabled. It updates the map sources accordingly and triggers events related to vertex dragging and snapping.
   * @param {Object} geoflo - The context object containing various settings and data.
   * @returns {boolean} Returns false if snapping is disabled or no snapped vertex is available.
   */
  this.setVertex = function () {
    var snapToFeature = geoflo.Snapping.enabled;
    if (geoflo.bypassSnapping) snapToFeature = false;
    var calculateRoute = geoflo.Routing && geoflo.Routing.enabled;
    if (geoflo.bypassRouting) calculateRoute = false;
    if (!snapToFeature || !geoflo.snappedVertex) return false;
    geoflo.snapFeature = this.setClosest(geoflo.snappedVertex, true, true);
    if (calculateRoute) geoflo.snapFeature = geoflo.Routing.getClosest() || geoflo.snapFeature;
    if (!geoflo.snapFeature) return geoflo.map.getSource(geoflo.statics.constants.sources.SNAP).setData(turf.featureCollection([]));
    geoflo.Utilities.setProperty(geoflo.snapFeature, 'type', geoflo.currentMode.type);
    geoflo.map.getSource(geoflo.statics.constants.sources[calculateRoute ? 'ROUTE' : 'SNAP']).setData(turf.featureCollection([geoflo.snapFeature]));
    geoflo.hotFeature.geometry.coordinates[geoflo.dragIndex] = geoflo.snapFeature.geometry.coordinates;
    geoflo.map.getSource(geoflo.statics.constants.sources.HOT).setData(turf.featureCollection([geoflo.hotFeature]));
    geoflo.fire('vertex.dragsnap', {
      feature: geoflo.hotFeature,
      vertex: turf.point(geoflo.snappedVertex)
    });
  };

  /**
   * @function
      * @memberof module:geoflo.Snapping
   * @name addFeature
   * @description This function adds a feature to the map by setting the data of the specified source with the provided feature. It also updates the properties of the feature if properties are provided.
   * @param {Object} feature - The feature to be added to the map.
   * @param {Object} [properties={}] - Additional properties to be assigned to the feature.
   * @param {boolean} [dontAdd] - Flag to prevent adding the feature if set to true.
   * @returns {boolean} Returns false if the feature is not provided or if dontAdd flag is set.
   */
  this.addFeature = function (feature) {
    var properties = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var dontAdd = arguments.length > 2 ? arguments[2] : undefined;
    geoflo.map.getSource(geoflo.statics.constants.sources['SNAP']).setData(turf.featureCollection([]));
    geoflo.map.getSource(geoflo.statics.constants.sources['ROUTE']).setData(turf.featureCollection([]));
    if (!feature || dontAdd) return false;
    if (properties) feature.properties = geoflo.Utilities.assignDeep(geoflo.Utilities.cloneDeep(properties), feature.properties);
    geoflo.snapFeature = feature;
    geoflo.map.getSource(geoflo.statics.constants.sources[feature.properties.routing ? 'ROUTE' : 'SNAP']).setData(turf.featureCollection([geoflo.snapFeature]));
  };

  /**
   * @function
      * @memberof module:geoflo.Snapping
   * @name updateFeature
   * @description This function updates a feature based on the event coordinates provided. It determines the type of feature, calculates the necessary coordinates, creates a line feature with hint properties, and converts units if needed.
   * @param {Array} evtCoords - The event coordinates to update the feature.
   * @returns {Object} The updated feature based on the event coordinates.
   */
  this.updateFeature = function (evtCoords) {
    geoflo.closestPoint = null;
    if (!geoflo.lastClick) return null;
    if (!geoflo.firstClick || geoflo.mouseIsDown) return null;
    var type = geoflo.Features.getType(geoflo.hotFeature) || geoflo.currentMode.type;
    var coords = geoflo.hotFeature ? geoflo.Utilities.getLastIndexCoords(geoflo.hotFeature) : geoflo.lastClick.coords;
    var vertex = turf.point(evtCoords);
    var hintCoords = type && type === "Polygon" && geoflo.hotFeature ? [coords, evtCoords, geoflo.firstClick.coords] : [coords, evtCoords];
    var feature = turf.lineString(hintCoords);
    feature.properties.type = type;
    feature.properties.hint = true;
    var unit = 'feet';
    var units = geoflo.Features.convertUnits(geoflo.hotFeature, 0, unit);
    units += geoflo.Features.convertUnits(feature, 0, unit);
    vertex = updateVertex(vertex, {
      units: units,
      unit: unit
    });
    return feature;
  };
  if (geoflo.options['snapping'].enable) this.activate();
  function cheapRuler(lat, units) {
    function cheapruler(lat, units) {
      return new CheapRuler(lat, units);
    }
    cheapruler.fromTile = function (y, z, units) {
      var n = Math.PI * (1 - 2 * (y + 0.5) / Math.pow(2, z));
      var lat = Math.atan(0.5 * (Math.exp(n) - Math.exp(-n))) * 180 / Math.PI;
      return new CheapRuler(lat, units);
    };
    cheapruler.units = {
      kilometers: 1,
      miles: 1000 / 1609.344,
      nauticalmiles: 1000 / 1852,
      meters: 1000,
      metres: 1000,
      yards: 1000 / 0.9144,
      feet: 1000 / 0.3048,
      inches: 1000 / 0.0254
    };
    function CheapRuler(lat, units) {
      var factors = {
        kilometers: 1,
        miles: 1000 / 1609.344,
        nauticalmiles: 1000 / 1852,
        meters: 1000,
        metres: 1000,
        yards: 1000 / 0.9144,
        feet: 1000 / 0.3048,
        inches: 1000 / 0.0254
      };
      if (lat === undefined) throw new Error('No latitude given.');
      if (units && !factors[units]) throw new Error('Unknown unit ' + units + '. Use one of: ' + Object.keys(factors));
      var m = units ? factors[units] : 1;
      var cos = Math.cos(lat * Math.PI / 180);
      var cos2 = 2 * cos * cos - 1;
      var cos3 = 2 * cos * cos2 - cos;
      var cos4 = 2 * cos * cos3 - cos2;
      var cos5 = 2 * cos * cos4 - cos3;
      this.kx = m * (111.41513 * cos - 0.09455 * cos3 + 0.00012 * cos5);
      this.ky = m * (111.13209 - 0.56605 * cos2 + 0.0012 * cos4);
    }
    CheapRuler.prototype = {
      equals: function equals(a, b) {
        return a[0] === b[0] && a[1] === b[1];
      },
      interpolate: function interpolate(a, b, t) {
        var dx = b[0] - a[0];
        var dy = b[1] - a[1];
        return [a[0] + dx * t, a[1] + dy * t];
      },
      distance: function distance(a, b) {
        var dx = (a[0] - b[0]) * this.kx;
        var dy = (a[1] - b[1]) * this.ky;
        return Math.sqrt(dx * dx + dy * dy);
      },
      bearing: function bearing(a, b) {
        var dx = (b[0] - a[0]) * this.kx;
        var dy = (b[1] - a[1]) * this.ky;
        if (!dx && !dy) return 0;
        var bearing = Math.atan2(-dy, dx) * 180 / Math.PI + 90;
        if (bearing > 180) bearing -= 360;
        return bearing;
      },
      destination: function destination(p, dist, bearing) {
        var a = (90 - bearing) * Math.PI / 180;
        return this.offset(p, Math.cos(a) * dist, Math.sin(a) * dist);
      },
      offset: function offset(p, dx, dy) {
        return [p[0] + dx / this.kx, p[1] + dy / this.ky];
      },
      lineDistance: function lineDistance(points) {
        var total = 0;
        for (var i = 0; i < points.length - 1; i++) {
          total += this.distance(points[i], points[i + 1]);
        }
        return total;
      },
      area: function area(polygon) {
        var sum = 0;
        for (var i = 0; i < polygon.length; i++) {
          var ring = polygon[i];
          for (var j = 0, len = ring.length, k = len - 1; j < len; k = j++) {
            sum += (ring[j][0] - ring[k][0]) * (ring[j][1] + ring[k][1]) * (i ? -1 : 1);
          }
        }
        return Math.abs(sum) / 2 * this.kx * this.ky;
      },
      along: function along(line, dist) {
        var sum = 0;
        if (dist <= 0) return line[0];
        for (var i = 0; i < line.length - 1; i++) {
          var p0 = line[i];
          var p1 = line[i + 1];
          var d = this.distance(p0, p1);
          sum += d;
          if (sum > dist) return this.interpolate(p0, p1, (dist - (sum - d)) / d);
        }
        return line[line.length - 1];
      },
      pointOnLine: function pointOnLine(line, p) {
        var minDist = Infinity;
        var minX, minY, minI, minT;
        for (var i = 0; i < line.length - 1; i++) {
          var x = line[i][0];
          var y = line[i][1];
          var dx = (line[i + 1][0] - x) * this.kx;
          var dy = (line[i + 1][1] - y) * this.ky;
          if (dx !== 0 || dy !== 0) {
            var t = ((p[0] - x) * this.kx * dx + (p[1] - y) * this.ky * dy) / (dx * dx + dy * dy);
            if (t > 1) {
              x = line[i + 1][0];
              y = line[i + 1][1];
            } else if (t > 0) {
              x += dx / this.kx * t;
              y += dy / this.ky * t;
            }
          }
          dx = (p[0] - x) * this.kx;
          dy = (p[1] - y) * this.ky;
          var sqDist = dx * dx + dy * dy;
          if (sqDist < minDist) {
            minDist = sqDist;
            minX = x;
            minY = y;
            minI = i;
            minT = t;
          }
        }
        return {
          point: [minX, minY],
          index: minI,
          t: minT
        };
      },
      lineSlice: function lineSlice(start, stop, line) {
        var p1 = this.pointOnLine(line, start);
        var p2 = this.pointOnLine(line, stop);
        if (p1.index > p2.index || p1.index === p2.index && p1.t > p2.t) {
          var tmp = p1;
          p1 = p2;
          p2 = tmp;
        }
        var slice = [p1.point];
        var l = p1.index + 1;
        var r = p2.index;
        if (!this.equals(line[l], slice[0]) && l <= r) slice.push(line[l]);
        for (var i = l + 1; i <= r; i++) {
          slice.push(line[i]);
        }
        if (!this.equals(line[r], p2.point)) slice.push(p2.point);
        return slice;
      },
      lineSliceAlong: function lineSliceAlong(start, stop, line) {
        var sum = 0;
        var slice = [];
        for (var i = 0; i < line.length - 1; i++) {
          var p0 = line[i];
          var p1 = line[i + 1];
          var d = this.distance(p0, p1);
          sum += d;
          if (sum > start && slice.length === 0) {
            slice.push(this.interpolate(p0, p1, (start - (sum - d)) / d));
          }
          if (sum >= stop) {
            slice.push(this.interpolate(p0, p1, (stop - (sum - d)) / d));
            return slice;
          }
          if (sum > start) slice.push(p1);
        }
        return slice;
      },
      bufferPoint: function bufferPoint(p, buffer) {
        var v = buffer / this.ky;
        var h = buffer / this.kx;
        return [p[0] - h, p[1] - v, p[0] + h, p[1] + v];
      },
      bufferBBox: function bufferBBox(bbox, buffer) {
        var v = buffer / this.ky;
        var h = buffer / this.kx;
        return [bbox[0] - h, bbox[1] - v, bbox[2] + h, bbox[3] + v];
      },
      insideBBox: function insideBBox(p, bbox) {
        return p[0] >= bbox[0] && p[0] <= bbox[2] && p[1] >= bbox[1] && p[1] <= bbox[3];
      }
    };
    return cheapruler(lat, units);
  }
  function findClosestPoint(uniqueFeatures, evtCoords, radiusInKm, pixelDistance) {
    var coords = calculatePointsOnLine(uniqueFeatures, evtCoords);
    var closestVertex = null;
    var closestLinepoint = null;
    var borders;
    var id = geoflo.id || 'id';
    coords.forEach(function (pointType) {
      var dist = pointType.dist;
      if (dist !== null) {
        if (pointType.type === "vertex") {
          if (closestVertex === null) {
            closestVertex = pointType;
          } else if (pixelDistance !== undefined) {
            if (dist * 1000 < pixelDistance) {
              if (closestVertex && closestVertex.lineEdge) {
                closestVertex = pointType;
              }
            }
          } else if (dist <= closestVertex.dist) {
            if (dist === closestVertex.dist) {
              if (closestVertex.lineEdge) {
                closestVertex = pointType;
              }
            } else {
              closestVertex = pointType;
            }
          }
        } else if (dist < radiusInKm) {
          if (closestLinepoint !== null && dist === closestLinepoint.dist && closestLinepoint[id] !== pointType[id]) {
            if (closestLinepoint.type === "linepoint") {
              if (pointType.distance1 <= closestLinepoint.distance1 && pointType.distance2 <= closestLinepoint.distance2 || pointType.distance2 <= closestLinepoint.distance1 && pointType.distance1 <= closestLinepoint.distance2) {
                console.log("switch closest points");
                closestLinepoint = pointType;
              }
            }
          }
          if (closestLinepoint === null || dist < closestLinepoint.dist) {
            closestLinepoint = pointType;
            if (pointType.border1 && pointType.border2) {
              borders = {
                border1: pointType.border1,
                border2: pointType.border2,
                distance1: pointType.distance1,
                distance2: pointType.distance2
              };
            } else {
              borders = null;
            }
          }
        }
      }
    });
    if (closestVertex !== null) {
      if (closestLinepoint !== null) {
        if (closestVertex.dist < radiusInKm) {
          return Object.assign({
            borders: null
          }, closestVertex);
        } else {
          return Object.assign({
            borders: borders
          }, closestLinepoint);
        }
      } else {
        return Object.assign({
          borders: null
        }, closestVertex);
      }
    } else if (closestLinepoint !== null) {
      return Object.assign({
        borders: borders
      }, closestLinepoint);
    } else {
      return null;
    }
  }
  function closestPoints(ruler, coordinates, evtCoords) {
    var result = [];
    var pointOnLine = ruler.pointOnLine(coordinates, evtCoords);
    var pointCoords = pointOnLine.point;
    var pointIndex = pointOnLine.index;
    var linePoint = {
      type: "linepoint",
      coords: pointCoords
    };
    var p1 = coordinates[pointIndex];
    var p2 = coordinates[pointIndex + 1];
    var distance1 = ruler.distance(p1, evtCoords);
    var distance2 = ruler.distance(p2, evtCoords);
    var lineEdge = false;
    var vertex = null;
    if (distance1 < distance2) {
      lineEdge = pointIndex === 0;
      vertex = p1;
    } else {
      lineEdge = pointIndex + 1 === coordinates.length - 1;
      vertex = p2;
    }
    linePoint.border1 = p1;
    linePoint.distance1 = distance1;
    linePoint.border2 = p2;
    linePoint.distance2 = distance2;
    result.push(linePoint);
    result.push({
      type: "vertex",
      coords: vertex,
      lineEdge: lineEdge
    });
    return result;
  }
  function calculatePointsOnLine(uniqueFeatures, evtCoords) {
    var coords = [];
    var knownIds = {};
    var ruler = cheapRuler(evtCoords[1]);
    uniqueFeatures.forEach(function (feature) {
      var id = feature.id || feature.properties.id;
      var closest = [];
      if (knownIds[id] === undefined) {
        knownIds[id] = true;
        var type = feature.geometry.type;
        if (type === "LineString") {
          if (feature.geometry.coordinates) {
            closest = closestPoints(ruler, feature.geometry.coordinates, evtCoords);
            closest.forEach(function (pointType) {
              pointType.id = id;
              pointType.dist = ruler.distance(pointType.coords, evtCoords);
              coords.push(pointType);
            });
          } else {
            console.log("no coordinates: ", feature);
          }
        } else if (type === "Point") {
          var pointType = {
            id: id,
            type: "vertex",
            coords: feature.geometry.coordinates,
            lineEdge: true
          };
          pointType.dist = ruler.distance(pointType.coords, evtCoords);
          coords.push(pointType);
        } else if (type === "Polygon") {
          if (turf.booleanWithin(turf.point(evtCoords), feature)) return;
          feature.geometry.coordinates.forEach(function (featureCoords, index) {
            closest = closestPoints(ruler, featureCoords, evtCoords);
            closest.forEach(function (pointType) {
              pointType.id = id;
              pointType.polygonCoordsArray = index;
              pointType.dist = ruler.distance(pointType.coords, evtCoords);
              coords.push(pointType);
            });
          });
        }
      }
    });
    return coords;
  }
  function addVertex(startPoint, endPoint, length, data) {
    var startData = data[startPoint];
    if (!startData) {
      startData = {};
      data[startPoint] = startData;
    }
    if (!startData[endPoint]) {
      startData[endPoint] = length;
    }
  }
  function addVertexPointTwoWay(startCoord, endCoords, length, data) {
    var startPoint = startCoord.join("#");
    var endPoint = endCoords.join("#");
    addVertex(startPoint, endPoint, length, data);
    addVertex(endPoint, startPoint, length, data);
  }
  function metersPerPixel(latitude, zoomLevel) {
    return geoflo.statics.constants.CIRCUM * Math.cos(latitude * (Math.PI / 180)) / Math.pow(2, zoomLevel + 8);
  }
  function setFeature(feature) {
    if (!feature) return geoflo.map.getSource(geoflo.statics.constants.sources.SNAP).setData(turf.featureCollection([])), geoflo.snapFeature;
    geoflo.Utilities.setProperty(feature, 'type', geoflo.currentMode.type);
    geoflo.map.getSource(geoflo.statics.constants.sources.SNAP).setData(turf.featureCollection([feature]));
    return feature;
  }
  function updateVertex(vertex) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var features = geoflo.map.getSource(geoflo.statics.constants.sources.HOTTEXT)._data.features;
    if (features.length && features[features.length - 1].properties.mouseLine) features.pop();
    vertex.properties.units = options.units;
    vertex.properties.unit = options.unit;
    vertex.properties.text = "".concat(options.units, " ").concat(options.unit);
    vertex.properties.transform = 'uppercase';
    vertex.properties.anchor = 'top-left';
    vertex.properties.mouseLine = true;
    features.push(vertex);
    geoflo.map.getSource(geoflo.statics.constants.sources.HOTTEXT).setData(turf.featureCollection(features));
    return vertex;
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Snapping);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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ck8sUUFBUSxDQUFDbUUsR0FBRyxDQUFDLENBQUM7SUFFekZlLE1BQU0sQ0FBQ2xELFVBQVUsQ0FBQ2tFLEtBQUssR0FBR3hHLE9BQU8sQ0FBQ3dHLEtBQUs7SUFDdkNoQixNQUFNLENBQUNsRCxVQUFVLENBQUNpRSxJQUFJLEdBQUd2RyxPQUFPLENBQUN1RyxJQUFJO0lBQ3JDZixNQUFNLENBQUNsRCxVQUFVLENBQUNzTSxJQUFJLE1BQUExTSxNQUFBLENBQU1sQyxPQUFPLENBQUN3RyxLQUFLLE9BQUF0RSxNQUFBLENBQUlsQyxPQUFPLENBQUN1RyxJQUFJLENBQUU7SUFDM0RmLE1BQU0sQ0FBQ2xELFVBQVUsQ0FBQ3VNLFNBQVMsR0FBRyxXQUFXO0lBQ3pDckosTUFBTSxDQUFDbEQsVUFBVSxDQUFDd00sTUFBTSxHQUFHLFVBQVU7SUFDckN0SixNQUFNLENBQUNsRCxVQUFVLENBQUNxTSxTQUFTLEdBQUcsSUFBSTtJQUVsQ3JPLFFBQVEsQ0FBQ3FMLElBQUksQ0FBQ25HLE1BQU0sQ0FBQztJQUNyQjVGLE1BQU0sQ0FBQ2lCLEdBQUcsQ0FBQzhDLFNBQVMsQ0FBQy9ELE1BQU0sQ0FBQ2dFLE9BQU8sQ0FBQ0MsU0FBUyxDQUFDQyxPQUFPLENBQUMySyxPQUFPLENBQUMsQ0FBQ3pLLE9BQU8sQ0FBQ2xCLElBQUksQ0FBQ21CLGlCQUFpQixDQUFDM0QsUUFBUSxDQUFDLENBQUM7SUFDeEcsT0FBT2tGLE1BQU07RUFDakI7QUFDSixDQUFDO0FBRUQsaUVBQWU5RixRQUFRIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vQHNvbHV0ZWdyYXRlL2dlb2Zsby1zZGsvLi9zcmMvU25hcHBpbmcuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbWl4aW5cbiAqIEBtZW1iZXJvZiBtb2R1bGU6Z2VvZmxvXG4gKiBAbmFtZSBTbmFwcGluZ1xuICogQGRlc2NyaXB0aW9uIFRoaXMgbW9kdWxlIHByb3ZpZGVzIHRoZSBzbmFwcGluZyBmdW5jdGlvbmFsaXR5IGZvciB0aGUgR2VvZmxvIGFwcGxpY2F0aW9uLiBJdCBhbGxvd3MgdXNlcnMgdG8gc25hcCBmZWF0dXJlcyB0byB0aGUgbWFwIGJ5IGNyZWF0aW5nIGEgYnVmZmVyIGFyb3VuZCB0aGUgZmVhdHVyZSBhbmQgc25hcHBpbmcgdG8gbmVhcmJ5IGZlYXR1cmVzLlxuICogQHBhcmFtIHtPYmplY3R9IG1vZGUgLSBUaGUgbW9kZSBvYmplY3QgY29udGFpbmluZyB0aGUgdHlwZSBvZiBtb2RlLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgU25hcHBpbmcgb2JqZWN0LlxuICovXG5jb25zdCBTbmFwcGluZyA9IGZ1bmN0aW9uIChtb2RlKSB7XG4gICAgY29uc3QgZ2VvZmxvID0gdGhpcy5nZW9mbG87XG4gICAgdGhpcy50eXBlID0gbW9kZS50eXBlO1xuXG5cdC8qKlxuXHQgKiBAZnVuY3Rpb25cbiAgICAgKiBAbWVtYmVyb2YgbW9kdWxlOmdlb2Zsby5TbmFwcGluZ1xuXHQgKiBAbmFtZSBhY3RpdmF0ZVxuXHQgKiBAZGVzY3JpcHRpb24gVGhpcyBmdW5jdGlvbiBlbmFibGVzIHRoZSBvYmplY3QgYW5kIHNldHMgdGhlIHNuYXBwaW5nIG9wdGlvbiB0byB0cnVlLlxuXHQgKi9cbiAgICB0aGlzLmFjdGl2YXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmVuYWJsZWQgPSB0cnVlO1xuICAgICAgICBnZW9mbG8ub3B0aW9uc1snc25hcHBpbmcnXS5lbmFibGUgPSB0cnVlO1xuICAgIH1cblxuXHQvKipcblx0ICogQGZ1bmN0aW9uXG4gICAgICogQG1lbWJlcm9mIG1vZHVsZTpnZW9mbG8uU25hcHBpbmdcblx0ICogQG5hbWUgZGVhY3RpdmF0ZVxuXHQgKiBAZGVzY3JpcHRpb24gVGhpcyBmdW5jdGlvbiBzZXRzIHRoZSAnZW5hYmxlZCcgcHJvcGVydHkgdG8gZmFsc2UsIGRpc2FibGVzIHNuYXBwaW5nLCBhbmQgdXBkYXRlcyB0aGUgbWVzaCBkYXRhLlxuXHQgKiBAcmV0dXJucyB7dm9pZH1cblx0ICovXG4gICAgdGhpcy5kZWFjdGl2YXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmVuYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgZ2VvZmxvLm9wdGlvbnNbJ3NuYXBwaW5nJ10uZW5hYmxlID0gZmFsc2U7XG4gICAgICAgIGdlb2Zsby51cGRhdGVNZXNoRGF0YShbXSwgdHJ1ZSk7XG4gICAgfVxuXG5cblx0LyoqXG5cdCAqIEBmdW5jdGlvblxuICAgICAqIEBtZW1iZXJvZiBtb2R1bGU6Z2VvZmxvLlNuYXBwaW5nXG5cdCAqIEBuYW1lIGdldENsb3Nlc3Rcblx0ICogQGRlc2NyaXB0aW9uIEZpbmRzIHRoZSBjbG9zZXN0IHBvaW50IHRvIHRoZSBnaXZlbiBjb29yZGluYXRlcyB3aXRoaW4gYSBzcGVjaWZpZWQgcmFkaXVzIG9yIHBpeGVsIGRpc3RhbmNlLlxuXHQgKiBAcGFyYW0ge0FycmF5PG51bWJlcj59IGNvb3JkcyAtIFRoZSBjb29yZGluYXRlcyBbbG9uZ2l0dWRlLCBsYXRpdHVkZV0gdG8gZmluZCB0aGUgY2xvc2VzdCBwb2ludCB0by5cblx0ICogQHBhcmFtIHtBcnJheTxPYmplY3Q+fSBmZWF0dXJlcyAtIEFuIGFycmF5IG9mIGZlYXR1cmVzIHRvIHNlYXJjaCBmb3IgdGhlIGNsb3Nlc3QgcG9pbnQgd2l0aGluLlxuXHQgKiBAcmV0dXJucyB7T2JqZWN0fSBBbiBvYmplY3QgY29udGFpbmluZyB0aGUgY2xvc2VzdCBwb2ludCBhbmQgaXRzIGNvb3JkaW5hdGVzLlxuXHQgKi9cbiAgICB0aGlzLmdldENsb3Nlc3QgPSBmdW5jdGlvbiAoY29vcmRzLCBmZWF0dXJlcykge1xuICAgICAgICB2YXIgY2FsY3VsYXRlZFJhZGl1cyA9IGdlb2Zsby5vcHRpb25zLnNuYXBwaW5nLmRpc3RhbmNlICogTWF0aC5wb3coMiwgTWF0aC5tYXgoMSwgMTkgLSBnZW9mbG8ubWFwLmdldFpvb20oKSkpO1xuICAgICAgICB2YXIgcmFkaXVzSW5LbSA9IGNhbGN1bGF0ZWRSYWRpdXMgLyAxMDAwMDA7XG4gICAgICAgIHZhciBwaXhlbERpc3RhbmNlID0gZ2VvZmxvLm9wdGlvbnMuc25hcHBpbmcucGl4ZWxzID8gZ2VvZmxvLm9wdGlvbnMuc25hcHBpbmcucGl4ZWxzICogbWV0ZXJzUGVyUGl4ZWwoY29vcmRzWzFdLCBnZW9mbG8ubWFwLmdldFpvb20oKSkgOiBmYWxzZTtcbiAgICAgICAgXG4gICAgICAgIGZlYXR1cmVzID0gZmVhdHVyZXMgPyBnZW9mbG8uZ2V0UmVuZGVyZWRTbmFwRmVhdHVyZXMoeyBsbmc6IGNvb3Jkc1swXSwgbGF0OiBjb29yZHNbMV0gfSwgcmFkaXVzSW5LbSkgOiBbZ2VvZmxvLmhvdEZlYXR1cmVdO1xuXG4gICAgICAgIHZhciBjbG9zZXN0UG9pbnQgPSBmaW5kQ2xvc2VzdFBvaW50KGZlYXR1cmVzLCBjb29yZHMsIHJhZGl1c0luS20sIHBpeGVsRGlzdGFuY2UpO1xuXG4gICAgICAgIHZhciBjb29yZHMgPSAhY2xvc2VzdFBvaW50ID8gZmFsc2UgOlxuICAgICAgICAgICAgcGl4ZWxEaXN0YW5jZSA/IGNsb3Nlc3RQb2ludC5jb29yZHMgOlxuICAgICAgICAgICAgY2xvc2VzdFBvaW50LnR5cGUgPT09ICd2ZXJ0ZXgnICYmIGNsb3Nlc3RQb2ludC5kaXN0IDw9IHJhZGl1c0luS20gPyBjbG9zZXN0UG9pbnQuY29vcmRzIDpcbiAgICAgICAgICAgIGZhbHNlO1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHBvaW50OiBjbG9zZXN0UG9pbnQsXG4gICAgICAgICAgICBjb29yZHM6IGNvb3Jkc1xuICAgICAgICB9O1xuICAgIH1cblxuXHQvKipcblx0ICogQGZ1bmN0aW9uXG4gICAgICogQG1lbWJlcm9mIG1vZHVsZTpnZW9mbG8uU25hcHBpbmdcblx0ICogQG5hbWUgc2V0Q2xvc2VzdFxuXHQgKiBAZGVzY3JpcHRpb24gVGhpcyBmdW5jdGlvbiBjYWxjdWxhdGVzIHRoZSBjbG9zZXN0IGZlYXR1cmUgdG8gdGhlIGdpdmVuIGNvb3JkaW5hdGVzIHdpdGhpbiBhIHNwZWNpZmllZCByYWRpdXMgYW5kIHNuYXBwaW5nIHBhcmFtZXRlcnMuIEl0IGRldGVybWluZXMgaWYgdGhlIGNsb3Nlc3QgZmVhdHVyZSBpcyBhIHBvaW50IG9yIGEgdmVydGV4IGFuZCByZXR1cm5zIHRoZSBzbmFwcGVkIGZlYXR1cmUgYWNjb3JkaW5nbHkuXG5cdCAqIEBwYXJhbSB7QXJyYXk8bnVtYmVyPn0gY29vcmRzIC0gVGhlIGNvb3JkaW5hdGVzIFtsb25naXR1ZGUsIGxhdGl0dWRlXSB0byBmaW5kIHRoZSBjbG9zZXN0IGZlYXR1cmUgdG8uXG5cdCAqIEBwYXJhbSB7Ym9vbGVhbn0gaXNQb2ludCAtIEluZGljYXRlcyBpZiB0aGUgZmVhdHVyZSBpcyBhIHBvaW50LlxuXHQgKiBAcGFyYW0ge2Jvb2xlYW59IGlzVmVydGV4IC0gSW5kaWNhdGVzIGlmIHRoZSBmZWF0dXJlIGlzIGEgdmVydGV4LlxuXHQgKiBAcmV0dXJucyB7T2JqZWN0fSBUaGUgc25hcHBlZCBmZWF0dXJlIGJhc2VkIG9uIHRoZSBjYWxjdWxhdGVkIGNsb3Nlc3QgcG9pbnQgb3IgbGluZS5cblx0ICovXG4gICAgdGhpcy5zZXRDbG9zZXN0ID0gZnVuY3Rpb24gKGNvb3JkcywgaXNQb2ludCwgaXNWZXJ0ZXgpIHtcbiAgICAgICAgdmFyIHNuYXBGZWF0dXJlID0gbnVsbDtcbiAgICAgICAgdmFyIGNhbGN1bGF0ZWRSYWRpdXMgPSBnZW9mbG8ub3B0aW9ucy5zbmFwcGluZy5kaXN0YW5jZSAqIE1hdGgucG93KDIsIE1hdGgubWF4KDEsIDE5IC0gZ2VvZmxvLm1hcC5nZXRab29tKCkpKTtcbiAgICAgICAgdmFyIHJhZGl1c0luS20gPSBjYWxjdWxhdGVkUmFkaXVzIC8gMTAwMDAwO1xuICAgICAgICB2YXIgcGl4ZWxEaXN0YW5jZSA9IGdlb2Zsby5vcHRpb25zLnNuYXBwaW5nLnBpeGVscyA/IGdlb2Zsby5vcHRpb25zLnNuYXBwaW5nLnBpeGVscyAqIG1ldGVyc1BlclBpeGVsKGNvb3Jkc1sxXSwgZ2VvZmxvLm1hcC5nZXRab29tKCkpIDogZmFsc2U7XG4gICAgICAgIHZhciBmaWx0ZXIgPSBnZW9mbG8ucGluYWJsZUZlYXR1cmVzICYmIGdlb2Zsby5waW5hYmxlRmVhdHVyZXMubGVuZ3RoID8gWydjYXNlJywgWydhbnknLCAuLi5nZW9mbG8ucGluYWJsZUZlYXR1cmVzLm1hcChlID0+IFtcIj09XCIsIFtcImdldFwiLCBcImlkXCJdLCBlLmlkIHx8IGUucHJvcGVydGllcy5pZF0pXSwgZmFsc2UsIHRydWVdIDogZmFsc2U7XG4gICAgICAgIHZhciBuZWFyRmVhdHVyZXMgPSBnZW9mbG8uZ2V0UmVuZGVyZWRGZWF0dXJlcyh7IGxuZzogY29vcmRzWzBdLCBsYXQ6IGNvb3Jkc1sxXSB9LCByYWRpdXNJbkttLCBmaWx0ZXIpO1xuICAgICAgICB2YXIgY2xvc2VzdFBvaW50ID0gbmVhckZlYXR1cmVzICYmIG5lYXJGZWF0dXJlcy5sZW5ndGggPyBmaW5kQ2xvc2VzdFBvaW50KG5lYXJGZWF0dXJlcywgY29vcmRzLCByYWRpdXNJbkttLCBwaXhlbERpc3RhbmNlKSA6IGZhbHNlO1xuICAgICAgICB2YXIgbGFzdENsaWNrRGlzdGFuY2UsIGxhc3RDbGlja0FycmF5LCBsYXN0Q2xpY2tFcXVhbDtcblxuICAgICAgICBnZW9mbG8uY2xvc2VzdFBvaW50ID0gY2xvc2VzdFBvaW50O1xuXG4gICAgICAgIGlmICgoIW5lYXJGZWF0dXJlcyAmJiAhaXNQb2ludCkgfHwgKCFjbG9zZXN0UG9pbnQgJiYgIWlzUG9pbnQpKSByZXR1cm4gdGhpcy51cGRhdGVGZWF0dXJlKGNvb3Jkcyk7XG4gICAgICAgIGlmICghY2xvc2VzdFBvaW50IHx8ICFjbG9zZXN0UG9pbnQuY29vcmRzKSByZXR1cm4gc25hcEZlYXR1cmU7XG5cbiAgICAgICAgaWYgKGlzVmVydGV4IHx8ICFnZW9mbG8ubGFzdENsaWNrKSB7XG4gICAgICAgICAgICBzbmFwRmVhdHVyZSA9IHR1cmYucG9pbnQoY2xvc2VzdFBvaW50LmNvb3Jkcyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsYXN0Q2xpY2tBcnJheSA9IEFycmF5LmlzQXJyYXkoZ2VvZmxvLmxhc3RDbGljay5jb29yZHMpICYmIEFycmF5LmlzQXJyYXkoZ2VvZmxvLmxhc3RDbGljay5jb29yZHNbMF0pO1xuICAgICAgICAgICAgaWYgKGxhc3RDbGlja0FycmF5KSBnZW9mbG8ubGFzdENsaWNrLmNvb3JkcyA9IGdlb2Zsby5sYXN0Q2xpY2suY29vcmRzWzBdO1xuXG4gICAgICAgICAgICBsYXN0Q2xpY2tEaXN0YW5jZSA9IHR1cmYuZGlzdGFuY2UodHVyZi5wb2ludChjb29yZHMpLCB0dXJmLnBvaW50KGdlb2Zsby5sYXN0Q2xpY2suY29vcmRzKSk7XG4gICAgICAgICAgICBsYXN0Q2xpY2tFcXVhbCA9IGdlb2Zsby5VdGlsaXRpZXMuaXNQb2ludEVxdWFsKGdlb2Zsby5sYXN0Q2xpY2suY29vcmRzLCBjbG9zZXN0UG9pbnQuY29vcmRzKTtcblxuICAgICAgICAgICAgaWYgKGxhc3RDbGlja0VxdWFsICYmIGxhc3RDbGlja0Rpc3RhbmNlID4gZ2VvZmxvLm9wdGlvbnMuc25hcHBpbmcudG9sZXJhbmNlKSByZXR1cm4gdGhpcy51cGRhdGVGZWF0dXJlKGNvb3Jkcyk7XG5cbiAgICAgICAgICAgIHNuYXBGZWF0dXJlID0gdHVyZi5saW5lU3RyaW5nKFtnZW9mbG8ubGFzdENsaWNrLmNvb3JkcywgY2xvc2VzdFBvaW50LmNvb3Jkc10pO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2VvZmxvLmZpcmUoJ3NuYXBwaW5nLmFkZCcsIHsgY2xvc2VzdDogY2xvc2VzdFBvaW50LCBzbmFwcGVkOiBzbmFwRmVhdHVyZSB9KTtcbiAgICAgICAgcmV0dXJuIHNuYXBGZWF0dXJlO1xuICAgIH1cblxuXG5cdC8qKlxuXHQgKiBAZnVuY3Rpb25cbiAgICAgKiBAbWVtYmVyb2YgbW9kdWxlOmdlb2Zsby5TbmFwcGluZ1xuXHQgKiBAbmFtZSBzZXRGZWF0dXJlXG5cdCAqIEBkZXNjcmlwdGlvbiBUaGlzIGZ1bmN0aW9uIHNldHMgYSBmZWF0dXJlIG9uIHRoZSBtYXAgdXNpbmcgdGhlIHByb3ZpZGVkIGZlYXR1cmUgYW5kIGNvb3JkaW5hdGVzLiBJdCBoYW5kbGVzIGRpZmZlcmVudCBzY2VuYXJpb3Mgc3VjaCBhcyBjcmVhdGluZyBhIHBvaW50LCBsaW5lLCBvciBwb2x5Z29uIGZlYXR1cmUgYmFzZWQgb24gdGhlIGlucHV0IHBhcmFtZXRlcnMuXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBmZWF0dXJlIC0gVGhlIGZlYXR1cmUgdG8gYmUgc2V0IG9uIHRoZSBtYXAuXG5cdCAqIEBwYXJhbSB7QXJyYXl9IGNvb3JkcyAtIFRoZSBjb29yZGluYXRlcyBmb3IgdGhlIGZlYXR1cmUuXG5cdCAqIEByZXR1cm5zIHtPYmplY3R9IFRoZSBmZWF0dXJlIHRoYXQgd2FzIHNldCBvbiB0aGUgbWFwLlxuXHQgKi9cbiAgICB0aGlzLnNldEZlYXR1cmUgPSBmdW5jdGlvbiAoZmVhdHVyZSwgY29vcmRzKSB7XG4gICAgICAgIGlmIChnZW9mbG8udG91Y2hDbGljaykgcmV0dXJuIG51bGw7XG5cbiAgICAgICAgZmVhdHVyZSA9IGZlYXR1cmUgfHwgZ2VvZmxvLnNuYXBGZWF0dXJlO1xuICAgICAgICBcbiAgICAgICAgaWYgKCFmZWF0dXJlICYmIGNvb3JkcykgcmV0dXJuIHNldEZlYXR1cmUodHVyZi5wb2ludChjb29yZHMpKTtcbiAgICAgICAgaWYgKCFmZWF0dXJlKSByZXR1cm4gZ2VvZmxvLm1hcC5nZXRTb3VyY2UoZ2VvZmxvLnN0YXRpY3MuY29uc3RhbnRzLnNvdXJjZXMuU05BUCkuc2V0RGF0YSh0dXJmLmZlYXR1cmVDb2xsZWN0aW9uKFtdKSksIG51bGw7XG5cbiAgICAgICAgdmFyIHNuYXBDb29yZHMgPSBmZWF0dXJlLmdlb21ldHJ5LmNvb3JkaW5hdGVzO1xuICAgICAgICB2YXIgbGFzdENsaWNrID0gY29vcmRzIHx8IGdlb2Zsby5sYXN0Q2xpY2suY29vcmRzO1xuICAgICAgICB2YXIgZmlyc3RDbGljayA9IGdlb2Zsby5maXJzdENsaWNrLmNvb3JkcztcbiAgICAgICAgdmFyIGlzUG9seWdvbiA9IHRoaXMudHlwZSA9PT0gJ1BvbHlnb24nIHx8IGZlYXR1cmUucHJvcGVydGllcy50eXBlID09PSAnUG9seWdvbic7XG4gICAgICAgIHZhciBpc1BvbHlsaW5lID0gZmVhdHVyZS5nZW9tZXRyeS50eXBlID09PSBcIkxpbmVTdHJpbmdcIjtcblxuICAgICAgICBpZiAoIWlzUG9seWxpbmUgfHwgc25hcENvb3Jkcy5sZW5ndGggPCAyKSB7XG4gICAgICAgICAgICBmZWF0dXJlID0gc2V0RmVhdHVyZShpc1BvbHlnb24gPyB0dXJmLmxpbmVTdHJpbmcoW2ZpcnN0Q2xpY2ssIGxhc3RDbGlja10pIDogdHVyZi5wb2ludChsYXN0Q2xpY2spKTtcbiAgICAgICAgfSBlbHNlIGlmIChnZW9mbG8uaG90RmVhdHVyZSkge1xuICAgICAgICAgICAgdmFyIGhvdENvb3JkcyA9IGdlb2Zsby5ob3RGZWF0dXJlLmdlb21ldHJ5LmNvb3JkaW5hdGVzO1xuICAgICAgICAgICAgaWYgKGlzUG9seWdvbikgc25hcENvb3Jkcy5wb3AoKTtcbiAgICAgICAgICAgIGhvdENvb3Jkcy5zcGxpY2UuYXBwbHkoaG90Q29vcmRzLCBbLTEsIDFdLmNvbmNhdChnZW9mbG8uVXRpbGl0aWVzLmNvbnN1bWFibGVBcnJheShzbmFwQ29vcmRzKSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZ2VvZmxvLmhvdEZlYXR1cmUgPSB0dXJmLmxpbmVTdHJpbmcoc25hcENvb3Jkcyk7XG4gICAgICAgIH1cblxuICAgICAgICBnZW9mbG8uVXRpbGl0aWVzLnNldFByb3BlcnR5KGdlb2Zsby5ob3RGZWF0dXJlLCAndHlwZScsIHRoaXMudHlwZSk7XG5cbiAgICAgICAgZmVhdHVyZSA9IHNldEZlYXR1cmUoaXNQb2x5Z29uID8gdHVyZi5saW5lU3RyaW5nKFtmaXJzdENsaWNrLCBsYXN0Q2xpY2tdKSA6IHR1cmYucG9pbnQobGFzdENsaWNrKSk7XG4gICAgICAgIGdlb2Zsby5zbmFwRmVhdHVyZSA9IGZlYXR1cmU7XG4gICAgICAgIHJldHVybiBnZW9mbG8uc25hcEZlYXR1cmU7XG4gICAgfVxuXG5cdC8qKlxuXHQgKiBAZnVuY3Rpb25cbiAgICAgKiBAbWVtYmVyb2YgbW9kdWxlOmdlb2Zsby5TbmFwcGluZ1xuXHQgKiBAbmFtZSBzZXRWZXJ0ZXhcblx0ICogQGRlc2NyaXB0aW9uIFRoaXMgZnVuY3Rpb24gZGV0ZXJtaW5lcyB0aGUgdmVydGV4IGJhc2VkIG9uIHNuYXBwaW5nIGFuZCByb3V0aW5nIHNldHRpbmdzLiBJdCBzZXRzIHRoZSBjbG9zZXN0IGZlYXR1cmUgd2hlbiBzbmFwcGluZyBpcyBlbmFibGVkIGFuZCBjYWxjdWxhdGVzIHRoZSByb3V0ZSBpZiByb3V0aW5nIGlzIGVuYWJsZWQuIEl0IHVwZGF0ZXMgdGhlIG1hcCBzb3VyY2VzIGFjY29yZGluZ2x5IGFuZCB0cmlnZ2VycyBldmVudHMgcmVsYXRlZCB0byB2ZXJ0ZXggZHJhZ2dpbmcgYW5kIHNuYXBwaW5nLlxuXHQgKiBAcGFyYW0ge09iamVjdH0gZ2VvZmxvIC0gVGhlIGNvbnRleHQgb2JqZWN0IGNvbnRhaW5pbmcgdmFyaW91cyBzZXR0aW5ncyBhbmQgZGF0YS5cblx0ICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgZmFsc2UgaWYgc25hcHBpbmcgaXMgZGlzYWJsZWQgb3Igbm8gc25hcHBlZCB2ZXJ0ZXggaXMgYXZhaWxhYmxlLlxuXHQgKi9cbiAgICB0aGlzLnNldFZlcnRleCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHNuYXBUb0ZlYXR1cmUgPSBnZW9mbG8uU25hcHBpbmcuZW5hYmxlZDtcbiAgICAgICAgaWYgKGdlb2Zsby5ieXBhc3NTbmFwcGluZykgc25hcFRvRmVhdHVyZSA9IGZhbHNlO1xuXG4gICAgICAgIHZhciBjYWxjdWxhdGVSb3V0ZSA9IGdlb2Zsby5Sb3V0aW5nICYmIGdlb2Zsby5Sb3V0aW5nLmVuYWJsZWQ7XG4gICAgICAgIGlmIChnZW9mbG8uYnlwYXNzUm91dGluZykgY2FsY3VsYXRlUm91dGUgPSBmYWxzZTtcblxuICAgICAgICBpZiAoIXNuYXBUb0ZlYXR1cmUgfHwgIWdlb2Zsby5zbmFwcGVkVmVydGV4KSByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgZ2VvZmxvLnNuYXBGZWF0dXJlID0gdGhpcy5zZXRDbG9zZXN0KGdlb2Zsby5zbmFwcGVkVmVydGV4LCB0cnVlLCB0cnVlKTtcblxuICAgICAgICBpZiAoY2FsY3VsYXRlUm91dGUpIGdlb2Zsby5zbmFwRmVhdHVyZSA9IGdlb2Zsby5Sb3V0aW5nLmdldENsb3Nlc3QoKSB8fCBnZW9mbG8uc25hcEZlYXR1cmU7XG4gICAgICAgIGlmICghZ2VvZmxvLnNuYXBGZWF0dXJlKSByZXR1cm4gZ2VvZmxvLm1hcC5nZXRTb3VyY2UoZ2VvZmxvLnN0YXRpY3MuY29uc3RhbnRzLnNvdXJjZXMuU05BUCkuc2V0RGF0YSh0dXJmLmZlYXR1cmVDb2xsZWN0aW9uKFtdKSk7XG5cbiAgICAgICAgZ2VvZmxvLlV0aWxpdGllcy5zZXRQcm9wZXJ0eShnZW9mbG8uc25hcEZlYXR1cmUsICd0eXBlJywgZ2VvZmxvLmN1cnJlbnRNb2RlLnR5cGUpO1xuICAgICAgICBnZW9mbG8ubWFwLmdldFNvdXJjZShnZW9mbG8uc3RhdGljcy5jb25zdGFudHMuc291cmNlc1tjYWxjdWxhdGVSb3V0ZSA/ICdST1VURScgOiAnU05BUCddKS5zZXREYXRhKHR1cmYuZmVhdHVyZUNvbGxlY3Rpb24oW2dlb2Zsby5zbmFwRmVhdHVyZV0pKTtcblxuICAgICAgICBnZW9mbG8uaG90RmVhdHVyZS5nZW9tZXRyeS5jb29yZGluYXRlc1tnZW9mbG8uZHJhZ0luZGV4XSA9IGdlb2Zsby5zbmFwRmVhdHVyZS5nZW9tZXRyeS5jb29yZGluYXRlcztcbiAgICAgICAgZ2VvZmxvLm1hcC5nZXRTb3VyY2UoZ2VvZmxvLnN0YXRpY3MuY29uc3RhbnRzLnNvdXJjZXMuSE9UKS5zZXREYXRhKHR1cmYuZmVhdHVyZUNvbGxlY3Rpb24oW2dlb2Zsby5ob3RGZWF0dXJlXSkpO1xuICAgICAgICBnZW9mbG8uZmlyZSgndmVydGV4LmRyYWdzbmFwJywgeyBmZWF0dXJlOiBnZW9mbG8uaG90RmVhdHVyZSwgdmVydGV4OiB0dXJmLnBvaW50KGdlb2Zsby5zbmFwcGVkVmVydGV4KSB9KTtcbiAgICB9XG5cblxuXHQvKipcblx0ICogQGZ1bmN0aW9uXG4gICAgICogQG1lbWJlcm9mIG1vZHVsZTpnZW9mbG8uU25hcHBpbmdcblx0ICogQG5hbWUgYWRkRmVhdHVyZVxuXHQgKiBAZGVzY3JpcHRpb24gVGhpcyBmdW5jdGlvbiBhZGRzIGEgZmVhdHVyZSB0byB0aGUgbWFwIGJ5IHNldHRpbmcgdGhlIGRhdGEgb2YgdGhlIHNwZWNpZmllZCBzb3VyY2Ugd2l0aCB0aGUgcHJvdmlkZWQgZmVhdHVyZS4gSXQgYWxzbyB1cGRhdGVzIHRoZSBwcm9wZXJ0aWVzIG9mIHRoZSBmZWF0dXJlIGlmIHByb3BlcnRpZXMgYXJlIHByb3ZpZGVkLlxuXHQgKiBAcGFyYW0ge09iamVjdH0gZmVhdHVyZSAtIFRoZSBmZWF0dXJlIHRvIGJlIGFkZGVkIHRvIHRoZSBtYXAuXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBbcHJvcGVydGllcz17fV0gLSBBZGRpdGlvbmFsIHByb3BlcnRpZXMgdG8gYmUgYXNzaWduZWQgdG8gdGhlIGZlYXR1cmUuXG5cdCAqIEBwYXJhbSB7Ym9vbGVhbn0gW2RvbnRBZGRdIC0gRmxhZyB0byBwcmV2ZW50IGFkZGluZyB0aGUgZmVhdHVyZSBpZiBzZXQgdG8gdHJ1ZS5cblx0ICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgZmFsc2UgaWYgdGhlIGZlYXR1cmUgaXMgbm90IHByb3ZpZGVkIG9yIGlmIGRvbnRBZGQgZmxhZyBpcyBzZXQuXG5cdCAqL1xuICAgIHRoaXMuYWRkRmVhdHVyZSA9IGZ1bmN0aW9uIChmZWF0dXJlLCBwcm9wZXJ0aWVzPXt9LCBkb250QWRkKSB7XG4gICAgICAgIGdlb2Zsby5tYXAuZ2V0U291cmNlKGdlb2Zsby5zdGF0aWNzLmNvbnN0YW50cy5zb3VyY2VzWydTTkFQJ10pLnNldERhdGEodHVyZi5mZWF0dXJlQ29sbGVjdGlvbihbXSkpO1xuICAgICAgICBnZW9mbG8ubWFwLmdldFNvdXJjZShnZW9mbG8uc3RhdGljcy5jb25zdGFudHMuc291cmNlc1snUk9VVEUnXSkuc2V0RGF0YSh0dXJmLmZlYXR1cmVDb2xsZWN0aW9uKFtdKSk7XG4gICAgICAgIGlmICghZmVhdHVyZSB8fCBkb250QWRkKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIGlmIChwcm9wZXJ0aWVzKSBmZWF0dXJlLnByb3BlcnRpZXMgPSBnZW9mbG8uVXRpbGl0aWVzLmFzc2lnbkRlZXAoZ2VvZmxvLlV0aWxpdGllcy5jbG9uZURlZXAocHJvcGVydGllcyksIGZlYXR1cmUucHJvcGVydGllcyk7XG4gICAgICAgIGdlb2Zsby5zbmFwRmVhdHVyZSA9IGZlYXR1cmU7XG4gICAgICAgIGdlb2Zsby5tYXAuZ2V0U291cmNlKGdlb2Zsby5zdGF0aWNzLmNvbnN0YW50cy5zb3VyY2VzW2ZlYXR1cmUucHJvcGVydGllcy5yb3V0aW5nID8gJ1JPVVRFJyA6ICdTTkFQJ10pLnNldERhdGEodHVyZi5mZWF0dXJlQ29sbGVjdGlvbihbZ2VvZmxvLnNuYXBGZWF0dXJlXSkpO1xuICAgIH1cblxuXHQvKipcblx0ICogQGZ1bmN0aW9uXG4gICAgICogQG1lbWJlcm9mIG1vZHVsZTpnZW9mbG8uU25hcHBpbmdcblx0ICogQG5hbWUgdXBkYXRlRmVhdHVyZVxuXHQgKiBAZGVzY3JpcHRpb24gVGhpcyBmdW5jdGlvbiB1cGRhdGVzIGEgZmVhdHVyZSBiYXNlZCBvbiB0aGUgZXZlbnQgY29vcmRpbmF0ZXMgcHJvdmlkZWQuIEl0IGRldGVybWluZXMgdGhlIHR5cGUgb2YgZmVhdHVyZSwgY2FsY3VsYXRlcyB0aGUgbmVjZXNzYXJ5IGNvb3JkaW5hdGVzLCBjcmVhdGVzIGEgbGluZSBmZWF0dXJlIHdpdGggaGludCBwcm9wZXJ0aWVzLCBhbmQgY29udmVydHMgdW5pdHMgaWYgbmVlZGVkLlxuXHQgKiBAcGFyYW0ge0FycmF5fSBldnRDb29yZHMgLSBUaGUgZXZlbnQgY29vcmRpbmF0ZXMgdG8gdXBkYXRlIHRoZSBmZWF0dXJlLlxuXHQgKiBAcmV0dXJucyB7T2JqZWN0fSBUaGUgdXBkYXRlZCBmZWF0dXJlIGJhc2VkIG9uIHRoZSBldmVudCBjb29yZGluYXRlcy5cblx0ICovXG4gICAgdGhpcy51cGRhdGVGZWF0dXJlID0gZnVuY3Rpb24gKGV2dENvb3Jkcykge1xuICAgICAgICBnZW9mbG8uY2xvc2VzdFBvaW50ID0gbnVsbDtcbiAgICAgICAgaWYgKCFnZW9mbG8ubGFzdENsaWNrKSByZXR1cm4gbnVsbDtcbiAgICAgICAgaWYgKCFnZW9mbG8uZmlyc3RDbGljayB8fCBnZW9mbG8ubW91c2VJc0Rvd24pIHJldHVybiBudWxsO1xuICAgIFxuICAgICAgICB2YXIgdHlwZSA9IGdlb2Zsby5GZWF0dXJlcy5nZXRUeXBlKGdlb2Zsby5ob3RGZWF0dXJlKSB8fCBnZW9mbG8uY3VycmVudE1vZGUudHlwZTtcbiAgICAgICAgdmFyIGNvb3JkcyA9IGdlb2Zsby5ob3RGZWF0dXJlID8gZ2VvZmxvLlV0aWxpdGllcy5nZXRMYXN0SW5kZXhDb29yZHMoZ2VvZmxvLmhvdEZlYXR1cmUpIDogZ2VvZmxvLmxhc3RDbGljay5jb29yZHM7XG4gICAgICAgIHZhciB2ZXJ0ZXggPSB0dXJmLnBvaW50KGV2dENvb3Jkcyk7XG4gICAgICAgIHZhciBoaW50Q29vcmRzID0gdHlwZSAmJiB0eXBlID09PSBcIlBvbHlnb25cIiAmJiBnZW9mbG8uaG90RmVhdHVyZSA/IFtjb29yZHMsIGV2dENvb3JkcywgZ2VvZmxvLmZpcnN0Q2xpY2suY29vcmRzXSA6IFtjb29yZHMsIGV2dENvb3Jkc107XG4gICAgICAgIHZhciBmZWF0dXJlID0gdHVyZi5saW5lU3RyaW5nKGhpbnRDb29yZHMpO1xuXG4gICAgICAgIGZlYXR1cmUucHJvcGVydGllcy50eXBlID0gdHlwZTtcbiAgICAgICAgZmVhdHVyZS5wcm9wZXJ0aWVzLmhpbnQgPSB0cnVlO1xuICAgICAgICBcbiAgICAgICAgdmFyIHVuaXQgPSAnZmVldCc7XG4gICAgICAgIHZhciB1bml0cyA9IGdlb2Zsby5GZWF0dXJlcy5jb252ZXJ0VW5pdHMoZ2VvZmxvLmhvdEZlYXR1cmUsIDAsIHVuaXQpO1xuICAgICAgICB1bml0cyArPSBnZW9mbG8uRmVhdHVyZXMuY29udmVydFVuaXRzKGZlYXR1cmUsIDAsIHVuaXQpO1xuICAgICAgICB2ZXJ0ZXggPSB1cGRhdGVWZXJ0ZXgodmVydGV4LCB7IHVuaXRzOiB1bml0cywgdW5pdDogdW5pdCB9KTtcblxuICAgICAgICByZXR1cm4gZmVhdHVyZTtcbiAgICB9XG5cblxuXG5cbiAgICBpZiAoZ2VvZmxvLm9wdGlvbnNbJ3NuYXBwaW5nJ10uZW5hYmxlKSB0aGlzLmFjdGl2YXRlKCk7XG5cblxuXG5cbiAgICBmdW5jdGlvbiBjaGVhcFJ1bGVyIChsYXQsIHVuaXRzKSB7XG4gICAgICAgIGZ1bmN0aW9uIGNoZWFwcnVsZXIobGF0LCB1bml0cykge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBDaGVhcFJ1bGVyKGxhdCx1bml0cyk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGNoZWFwcnVsZXIuZnJvbVRpbGUgPSBmdW5jdGlvbih5LCB6LCB1bml0cykge1xuICAgICAgICAgICAgdmFyIG4gPSBNYXRoLlBJICogKDEgLSAyICogKHkgKyAwLjUpIC8gTWF0aC5wb3coMiwgeikpO1xuICAgICAgICAgICAgdmFyIGxhdCA9IE1hdGguYXRhbigwLjUgKiAoTWF0aC5leHAobikgLSBNYXRoLmV4cCgtbikpKSAqIDE4MCAvIE1hdGguUEk7XG4gICAgICAgICAgICByZXR1cm4gbmV3IENoZWFwUnVsZXIobGF0LHVuaXRzKTtcbiAgICAgICAgfTtcbiAgICAgICAgXG4gICAgICAgIGNoZWFwcnVsZXIudW5pdHMgPSB7XG4gICAgICAgICAgICBraWxvbWV0ZXJzOiAxLFxuICAgICAgICAgICAgbWlsZXM6IDEwMDAgLyAxNjA5LjM0NCxcbiAgICAgICAgICAgIG5hdXRpY2FsbWlsZXM6IDEwMDAgLyAxODUyLFxuICAgICAgICAgICAgbWV0ZXJzOiAxMDAwLFxuICAgICAgICAgICAgbWV0cmVzOiAxMDAwLFxuICAgICAgICAgICAgeWFyZHM6IDEwMDAgLyAwLjkxNDQsXG4gICAgICAgICAgICBmZWV0OiAxMDAwIC8gMC4zMDQ4LFxuICAgICAgICAgICAgaW5jaGVzOiAxMDAwIC8gMC4wMjU0XG4gICAgICAgIH07XG4gICAgICAgIFxuICAgICAgICBmdW5jdGlvbiBDaGVhcFJ1bGVyKGxhdCwgdW5pdHMpIHtcbiAgICAgICAgICAgIHZhciBmYWN0b3JzID0ge1xuICAgICAgICAgICAgICAgIGtpbG9tZXRlcnM6IDEsXG4gICAgICAgICAgICAgICAgbWlsZXM6IDEwMDAgLyAxNjA5LjM0NCxcbiAgICAgICAgICAgICAgICBuYXV0aWNhbG1pbGVzOiAxMDAwIC8gMTg1MixcbiAgICAgICAgICAgICAgICBtZXRlcnM6IDEwMDAsXG4gICAgICAgICAgICAgICAgbWV0cmVzOiAxMDAwLFxuICAgICAgICAgICAgICAgIHlhcmRzOiAxMDAwIC8gMC45MTQ0LFxuICAgICAgICAgICAgICAgIGZlZXQ6IDEwMDAgLyAwLjMwNDgsXG4gICAgICAgICAgICAgICAgaW5jaGVzOiAxMDAwIC8gMC4wMjU0XG4gICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgICAgaWYgKGxhdCA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTm8gbGF0aXR1ZGUgZ2l2ZW4uJyk7XG4gICAgICAgICAgICBpZiAodW5pdHMgJiYgIWZhY3RvcnNbdW5pdHNdKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVW5rbm93biB1bml0ICcgKyB1bml0cyArICcuIFVzZSBvbmUgb2Y6ICcgKyBPYmplY3Qua2V5cyhmYWN0b3JzKSk7XG4gICAgICAgIFxuICAgICAgICAgICAgdmFyIG0gPSB1bml0cyA/IGZhY3RvcnNbdW5pdHNdIDogMTtcbiAgICAgICAgXG4gICAgICAgICAgICB2YXIgY29zID0gTWF0aC5jb3MobGF0ICogTWF0aC5QSSAvIDE4MCk7XG4gICAgICAgICAgICB2YXIgY29zMiA9IDIgKiBjb3MgKiBjb3MgLSAxO1xuICAgICAgICAgICAgdmFyIGNvczMgPSAyICogY29zICogY29zMiAtIGNvcztcbiAgICAgICAgICAgIHZhciBjb3M0ID0gMiAqIGNvcyAqIGNvczMgLSBjb3MyO1xuICAgICAgICAgICAgdmFyIGNvczUgPSAyICogY29zICogY29zNCAtIGNvczM7XG4gICAgICAgIFxuICAgICAgICAgICAgdGhpcy5reCA9IG0gKiAoMTExLjQxNTEzICogY29zIC0gMC4wOTQ1NSAqIGNvczMgKyAwLjAwMDEyICogY29zNSk7XG4gICAgICAgICAgICB0aGlzLmt5ID0gbSAqICgxMTEuMTMyMDkgLSAwLjU2NjA1ICogY29zMiArIDAuMDAxMiAqIGNvczQpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBDaGVhcFJ1bGVyLnByb3RvdHlwZSA9IHtcbiAgICAgICAgICAgIGVxdWFsczogZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYVswXSA9PT0gYlswXSAmJiBhWzFdID09PSBiWzFdO1xuICAgICAgICAgICAgfSxcbiAgICAgIFxuICAgICAgICAgICAgaW50ZXJwb2xhdGU6IGZ1bmN0aW9uIChhLCBiLCB0KSB7XG4gICAgICAgICAgICAgICAgdmFyIGR4ID0gYlswXSAtIGFbMF07XG4gICAgICAgICAgICAgICAgdmFyIGR5ID0gYlsxXSAtIGFbMV07XG4gICAgICAgICAgICAgICAgcmV0dXJuIFthWzBdICsgZHggKiB0LCBhWzFdICsgZHkgKiB0XTtcbiAgICAgICAgICAgIH0sXG4gICAgICBcbiAgICAgICAgICAgIGRpc3RhbmNlOiBmdW5jdGlvbihhLCBiKSB7XG4gICAgICAgICAgICAgICAgdmFyIGR4ID0gKGFbMF0gLSBiWzBdKSAqIHRoaXMua3g7XG4gICAgICAgICAgICAgICAgdmFyIGR5ID0gKGFbMV0gLSBiWzFdKSAqIHRoaXMua3k7XG4gICAgICAgICAgICAgICAgcmV0dXJuIE1hdGguc3FydChkeCAqIGR4ICsgZHkgKiBkeSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICBcbiAgICAgICAgICAgIGJlYXJpbmc6IGZ1bmN0aW9uKGEsIGIpIHtcbiAgICAgICAgICAgICAgICB2YXIgZHggPSAoYlswXSAtIGFbMF0pICogdGhpcy5reDtcbiAgICAgICAgICAgICAgICB2YXIgZHkgPSAoYlsxXSAtIGFbMV0pICogdGhpcy5reTtcbiAgICAgICAgICAgICAgICBpZiAoIWR4ICYmICFkeSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICAgICAgdmFyIGJlYXJpbmcgPSBNYXRoLmF0YW4yKC1keSwgZHgpICogMTgwIC8gTWF0aC5QSSArIDkwO1xuICAgICAgICAgICAgICAgIGlmIChiZWFyaW5nID4gMTgwKVxuICAgICAgICAgICAgICAgICAgICBiZWFyaW5nIC09IDM2MDtcbiAgICAgICAgICAgICAgICByZXR1cm4gYmVhcmluZztcbiAgICAgICAgICAgIH0sXG4gICAgICAgIFxuICAgICAgICAgICAgZGVzdGluYXRpb246IGZ1bmN0aW9uKHAsIGRpc3QsIGJlYXJpbmcpIHtcbiAgICAgICAgICAgICAgICB2YXIgYSA9ICg5MCAtIGJlYXJpbmcpICogTWF0aC5QSSAvIDE4MDtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5vZmZzZXQocCwgTWF0aC5jb3MoYSkgKiBkaXN0LCBNYXRoLnNpbihhKSAqIGRpc3QpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgXG4gICAgICAgICAgICBvZmZzZXQ6IGZ1bmN0aW9uKHAsIGR4LCBkeSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBbcFswXSArIGR4IC8gdGhpcy5reCwgcFsxXSArIGR5IC8gdGhpcy5reV07XG4gICAgICAgICAgICB9LFxuICAgICAgICBcbiAgICAgICAgICAgIGxpbmVEaXN0YW5jZTogZnVuY3Rpb24ocG9pbnRzKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRvdGFsID0gMDtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBvaW50cy5sZW5ndGggLSAxOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdG90YWwgKz0gdGhpcy5kaXN0YW5jZShwb2ludHNbaV0sIHBvaW50c1tpICsgMV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdG90YWw7XG4gICAgICAgICAgICB9LFxuICAgICAgICBcbiAgICAgICAgICAgIGFyZWE6IGZ1bmN0aW9uKHBvbHlnb24pIHtcbiAgICAgICAgICAgICAgICB2YXIgc3VtID0gMDtcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwb2x5Z29uLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciByaW5nID0gcG9seWdvbltpXTtcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwLCBsZW4gPSByaW5nLmxlbmd0aCwgayA9IGxlbiAtIDE7IGogPCBsZW47IGsgPSBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1bSArPSAocmluZ1tqXVswXSAtIHJpbmdba11bMF0pICogKHJpbmdbal1bMV0gKyByaW5nW2tdWzFdKSAqIChpID8gLTEgOiAxKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgICAgICAgICAgcmV0dXJuIChNYXRoLmFicyhzdW0pIC8gMikgKiB0aGlzLmt4ICogdGhpcy5reTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIFxuICAgICAgICAgICAgYWxvbmc6IGZ1bmN0aW9uKGxpbmUsIGRpc3QpIHtcbiAgICAgICAgICAgICAgICB2YXIgc3VtID0gMDtcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKGRpc3QgPD0gMClcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGxpbmVbMF07XG4gICAgICAgIFxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGluZS5sZW5ndGggLSAxOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHAwID0gbGluZVtpXTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHAxID0gbGluZVtpICsgMV07XG4gICAgICAgICAgICAgICAgICAgIHZhciBkID0gdGhpcy5kaXN0YW5jZShwMCwgcDEpO1xuICAgICAgICAgICAgICAgICAgICBzdW0gKz0gZDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN1bSA+IGRpc3QpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5pbnRlcnBvbGF0ZShwMCwgcDEsIChkaXN0IC0gKHN1bSAtIGQpKSAvIGQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgICAgICAgICAgcmV0dXJuIGxpbmVbbGluZS5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIFxuICAgICAgICAgICAgcG9pbnRPbkxpbmU6IGZ1bmN0aW9uKGxpbmUsIHApIHtcbiAgICAgICAgICAgICAgICB2YXIgbWluRGlzdCA9IEluZmluaXR5O1xuICAgICAgICAgICAgICAgIHZhciBtaW5YLCBtaW5ZLCBtaW5JLCBtaW5UO1xuICAgICAgICBcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxpbmUubGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB2YXIgeCA9IGxpbmVbaV1bMF07XG4gICAgICAgICAgICAgICAgICAgIHZhciB5ID0gbGluZVtpXVsxXTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGR4ID0gKGxpbmVbaSArIDFdWzBdIC0geCkgKiB0aGlzLmt4O1xuICAgICAgICAgICAgICAgICAgICB2YXIgZHkgPSAobGluZVtpICsgMV1bMV0gLSB5KSAqIHRoaXMua3k7XG4gICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBpZiAoZHggIT09IDAgfHwgZHkgIT09IDApIHtcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdCA9ICgocFswXSAtIHgpICogdGhpcy5reCAqIGR4ICsgKHBbMV0gLSB5KSAqIHRoaXMua3kgKiBkeSkgLyAoZHggKiBkeCArIGR5ICogZHkpO1xuICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0ID4gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHggPSBsaW5lW2kgKyAxXVswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB5ID0gbGluZVtpICsgMV1bMV07XG4gICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0ID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHggKz0gKGR4IC8gdGhpcy5reCkgKiB0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHkgKz0gKGR5IC8gdGhpcy5reSkgKiB0O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBkeCA9IChwWzBdIC0geCkgKiB0aGlzLmt4O1xuICAgICAgICAgICAgICAgICAgICBkeSA9IChwWzFdIC0geSkgKiB0aGlzLmt5O1xuICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNxRGlzdCA9IGR4ICogZHggKyBkeSAqIGR5O1xuICAgICAgICAgICAgICAgICAgICBpZiAoc3FEaXN0IDwgbWluRGlzdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbWluRGlzdCA9IHNxRGlzdDtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1pblggPSB4O1xuICAgICAgICAgICAgICAgICAgICAgICAgbWluWSA9IHk7XG4gICAgICAgICAgICAgICAgICAgICAgICBtaW5JID0gaTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1pblQgPSB0O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBwb2ludDogW21pblgsIG1pblldLFxuICAgICAgICAgICAgICAgICAgICBpbmRleDogbWluSSxcbiAgICAgICAgICAgICAgICAgICAgdDogbWluVFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9LFxuICAgICAgICBcbiAgICAgICAgICAgIGxpbmVTbGljZTogZnVuY3Rpb24oc3RhcnQsIHN0b3AsIGxpbmUpIHtcbiAgICAgICAgICAgICAgICB2YXIgcDEgPSB0aGlzLnBvaW50T25MaW5lKGxpbmUsIHN0YXJ0KTtcbiAgICAgICAgICAgICAgICB2YXIgcDIgPSB0aGlzLnBvaW50T25MaW5lKGxpbmUsIHN0b3ApO1xuICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiAocDEuaW5kZXggPiBwMi5pbmRleCB8fCAocDEuaW5kZXggPT09IHAyLmluZGV4ICYmIHAxLnQgPiBwMi50KSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdG1wID0gcDE7XG4gICAgICAgICAgICAgICAgICAgIHAxID0gcDI7XG4gICAgICAgICAgICAgICAgICAgIHAyID0gdG1wO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgICAgICAgICAgdmFyIHNsaWNlID0gW3AxLnBvaW50XTtcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgdmFyIGwgPSBwMS5pbmRleCArIDE7XG4gICAgICAgICAgICAgICAgdmFyIHIgPSBwMi5pbmRleDtcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmVxdWFscyhsaW5lW2xdLCBzbGljZVswXSkgJiYgbCA8PSByKVxuICAgICAgICAgICAgICAgICAgICBzbGljZS5wdXNoKGxpbmVbbF0pO1xuICAgICAgICBcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gbCArIDE7IGkgPD0gcjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHNsaWNlLnB1c2gobGluZVtpXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuZXF1YWxzKGxpbmVbcl0sIHAyLnBvaW50KSlcbiAgICAgICAgICAgICAgICAgICAgc2xpY2UucHVzaChwMi5wb2ludCk7XG4gICAgICAgIFxuICAgICAgICAgICAgICAgIHJldHVybiBzbGljZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIFxuICAgICAgICAgICAgbGluZVNsaWNlQWxvbmc6IGZ1bmN0aW9uKHN0YXJ0LCBzdG9wLCBsaW5lKSB7XG4gICAgICAgICAgICAgICAgdmFyIHN1bSA9IDA7XG4gICAgICAgICAgICAgICAgdmFyIHNsaWNlID0gW107XG4gICAgICAgIFxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGluZS5sZW5ndGggLSAxOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHAwID0gbGluZVtpXTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHAxID0gbGluZVtpICsgMV07XG4gICAgICAgICAgICAgICAgICAgIHZhciBkID0gdGhpcy5kaXN0YW5jZShwMCwgcDEpO1xuICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgc3VtICs9IGQ7XG4gICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBpZiAoc3VtID4gc3RhcnQgJiYgc2xpY2UubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzbGljZS5wdXNoKHRoaXMuaW50ZXJwb2xhdGUocDAsIHAxLCAoc3RhcnQgLSAoc3VtIC0gZCkpIC8gZCkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBpZiAoc3VtID49IHN0b3ApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWNlLnB1c2godGhpcy5pbnRlcnBvbGF0ZShwMCwgcDEsIChzdG9wIC0gKHN1bSAtIGQpKSAvIGQpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzbGljZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN1bSA+IHN0YXJ0KVxuICAgICAgICAgICAgICAgICAgICAgICAgc2xpY2UucHVzaChwMSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgICAgICAgICByZXR1cm4gc2xpY2U7XG4gICAgICAgICAgICB9LFxuICAgICAgICBcbiAgICAgICAgICAgIGJ1ZmZlclBvaW50OiBmdW5jdGlvbihwLCBidWZmZXIpIHtcbiAgICAgICAgICAgICAgICB2YXIgdiA9IGJ1ZmZlciAvIHRoaXMua3k7XG4gICAgICAgICAgICAgICAgdmFyIGggPSBidWZmZXIgLyB0aGlzLmt4O1xuICAgICAgICAgICAgICAgIHJldHVybiBbcFswXSAtIGgsIHBbMV0gLSB2LCBwWzBdICsgaCwgcFsxXSArIHZdO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgXG4gICAgICAgICAgICBidWZmZXJCQm94OiBmdW5jdGlvbihiYm94LCBidWZmZXIpIHtcbiAgICAgICAgICAgICAgICB2YXIgdiA9IGJ1ZmZlciAvIHRoaXMua3k7XG4gICAgICAgICAgICAgICAgdmFyIGggPSBidWZmZXIgLyB0aGlzLmt4O1xuICAgICAgICAgICAgICAgIHJldHVybiBbYmJveFswXSAtIGgsIGJib3hbMV0gLSB2LCBiYm94WzJdICsgaCwgYmJveFszXSArIHZdO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgXG4gICAgICAgICAgICBpbnNpZGVCQm94OiBmdW5jdGlvbihwLCBiYm94KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBbMF0gPj0gYmJveFswXSAmJiBwWzBdIDw9IGJib3hbMl0gJiYgcFsxXSA+PSBiYm94WzFdICYmIHBbMV0gPD0gYmJveFszXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgXG4gICAgICAgIHJldHVybiBjaGVhcHJ1bGVyKGxhdCwgdW5pdHMpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZpbmRDbG9zZXN0UG9pbnQgKHVuaXF1ZUZlYXR1cmVzLCBldnRDb29yZHMsIHJhZGl1c0luS20sIHBpeGVsRGlzdGFuY2UpIHtcbiAgICAgICAgY29uc3QgY29vcmRzID0gY2FsY3VsYXRlUG9pbnRzT25MaW5lKHVuaXF1ZUZlYXR1cmVzLCBldnRDb29yZHMpO1xuICBcbiAgICAgICAgbGV0IGNsb3Nlc3RWZXJ0ZXggPSBudWxsO1xuICAgICAgICBsZXQgY2xvc2VzdExpbmVwb2ludCA9IG51bGw7XG4gICAgICAgIGxldCBib3JkZXJzO1xuICAgICAgICBsZXQgaWQgPSBnZW9mbG8uaWQgfHwgJ2lkJztcbiAgXG4gICAgICAgIGNvb3Jkcy5mb3JFYWNoKChwb2ludFR5cGUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGRpc3QgPSBwb2ludFR5cGUuZGlzdDtcbiAgXG4gICAgICAgICAgICBpZiAoZGlzdCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGlmIChwb2ludFR5cGUudHlwZSA9PT0gXCJ2ZXJ0ZXhcIikge1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2xvc2VzdFZlcnRleCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2VzdFZlcnRleCA9IHBvaW50VHlwZTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChwaXhlbERpc3RhbmNlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkaXN0ICogMTAwMCA8IHBpeGVsRGlzdGFuY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2xvc2VzdFZlcnRleCAmJiBjbG9zZXN0VmVydGV4LmxpbmVFZGdlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsb3Nlc3RWZXJ0ZXggPSBwb2ludFR5cGU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRpc3QgPD0gY2xvc2VzdFZlcnRleC5kaXN0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGlzdCA9PT0gY2xvc2VzdFZlcnRleC5kaXN0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNsb3Nlc3RWZXJ0ZXgubGluZUVkZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2VzdFZlcnRleCA9IHBvaW50VHlwZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsb3Nlc3RWZXJ0ZXggPSBwb2ludFR5cGU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRpc3QgPCByYWRpdXNJbkttKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjbG9zZXN0TGluZXBvaW50ICE9PSBudWxsICYmIGRpc3QgPT09IGNsb3Nlc3RMaW5lcG9pbnQuZGlzdCAmJiBjbG9zZXN0TGluZXBvaW50W2lkXSAhPT0gcG9pbnRUeXBlW2lkXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNsb3Nlc3RMaW5lcG9pbnQudHlwZSA9PT0gXCJsaW5lcG9pbnRcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgocG9pbnRUeXBlLmRpc3RhbmNlMSA8PSBjbG9zZXN0TGluZXBvaW50LmRpc3RhbmNlMSAmJiBwb2ludFR5cGUuZGlzdGFuY2UyIDw9IGNsb3Nlc3RMaW5lcG9pbnQuZGlzdGFuY2UyKSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAocG9pbnRUeXBlLmRpc3RhbmNlMiA8PSBjbG9zZXN0TGluZXBvaW50LmRpc3RhbmNlMSAmJiBwb2ludFR5cGUuZGlzdGFuY2UxIDw9IGNsb3Nlc3RMaW5lcG9pbnQuZGlzdGFuY2UyKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInN3aXRjaCBjbG9zZXN0IHBvaW50c1wiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2VzdExpbmVwb2ludCA9IHBvaW50VHlwZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgXG4gICAgICAgICAgICAgICAgICAgIGlmIChjbG9zZXN0TGluZXBvaW50ID09PSBudWxsIHx8IGRpc3QgPCBjbG9zZXN0TGluZXBvaW50LmRpc3QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsb3Nlc3RMaW5lcG9pbnQgPSBwb2ludFR5cGU7XG4gIFxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBvaW50VHlwZS5ib3JkZXIxICYmIHBvaW50VHlwZS5ib3JkZXIyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVycyA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyMTogcG9pbnRUeXBlLmJvcmRlcjEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlcjI6IHBvaW50VHlwZS5ib3JkZXIyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXN0YW5jZTE6IHBvaW50VHlwZS5kaXN0YW5jZTEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3RhbmNlMjogcG9pbnRUeXBlLmRpc3RhbmNlMlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlcnMgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgXG4gICAgICAgIGlmIChjbG9zZXN0VmVydGV4ICE9PSBudWxsKSB7XG4gICAgICAgICAgICBpZiAoY2xvc2VzdExpbmVwb2ludCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGlmIChjbG9zZXN0VmVydGV4LmRpc3QgPCByYWRpdXNJbkttKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHsgYm9yZGVyczogbnVsbCB9LCBjbG9zZXN0VmVydGV4KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7IGJvcmRlcnM6IGJvcmRlcnMgfSwgY2xvc2VzdExpbmVwb2ludCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7IGJvcmRlcnM6IG51bGwgfSwgY2xvc2VzdFZlcnRleCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoY2xvc2VzdExpbmVwb2ludCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oeyBib3JkZXJzOiBib3JkZXJzIH0sIGNsb3Nlc3RMaW5lcG9pbnQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjbG9zZXN0UG9pbnRzIChydWxlciwgY29vcmRpbmF0ZXMsIGV2dENvb3Jkcykge1xuICAgICAgICBjb25zdCByZXN1bHQgPSBbXTtcbiAgICAgICAgY29uc3QgcG9pbnRPbkxpbmUgPSBydWxlci5wb2ludE9uTGluZShjb29yZGluYXRlcywgZXZ0Q29vcmRzKTtcbiAgICAgICAgY29uc3QgcG9pbnRDb29yZHMgPSBwb2ludE9uTGluZS5wb2ludDtcbiAgICAgICAgY29uc3QgcG9pbnRJbmRleCA9IHBvaW50T25MaW5lLmluZGV4O1xuICAgICAgICBjb25zdCBsaW5lUG9pbnQgPSB7IHR5cGU6IFwibGluZXBvaW50XCIsIGNvb3JkczogcG9pbnRDb29yZHMgfTtcbiAgICAgICAgY29uc3QgcDEgPSBjb29yZGluYXRlc1twb2ludEluZGV4XTtcbiAgICAgICAgY29uc3QgcDIgPSBjb29yZGluYXRlc1twb2ludEluZGV4ICsgMV07XG4gICAgICAgIGNvbnN0IGRpc3RhbmNlMSA9IHJ1bGVyLmRpc3RhbmNlKHAxLCBldnRDb29yZHMpO1xuICAgICAgICBjb25zdCBkaXN0YW5jZTIgPSBydWxlci5kaXN0YW5jZShwMiwgZXZ0Q29vcmRzKTtcblxuICAgICAgICBsZXQgbGluZUVkZ2UgPSBmYWxzZTtcbiAgICAgICAgbGV0IHZlcnRleCA9IG51bGw7XG4gICAgXG4gICAgICAgIGlmIChkaXN0YW5jZTEgPCBkaXN0YW5jZTIpIHtcbiAgICAgICAgICAgIGxpbmVFZGdlID0gcG9pbnRJbmRleCA9PT0gMDtcbiAgICAgICAgICAgIHZlcnRleCA9IHAxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGluZUVkZ2UgPSBwb2ludEluZGV4ICsgMSA9PT0gY29vcmRpbmF0ZXMubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgIHZlcnRleCA9IHAyO1xuICAgICAgICB9XG4gICAgXG4gICAgICAgIGxpbmVQb2ludC5ib3JkZXIxID0gcDE7XG4gICAgICAgIGxpbmVQb2ludC5kaXN0YW5jZTEgPSBkaXN0YW5jZTE7XG4gICAgICAgIGxpbmVQb2ludC5ib3JkZXIyID0gcDI7XG4gICAgICAgIGxpbmVQb2ludC5kaXN0YW5jZTIgPSBkaXN0YW5jZTI7XG4gICAgXG4gICAgICAgIHJlc3VsdC5wdXNoKGxpbmVQb2ludCk7XG4gICAgICAgIHJlc3VsdC5wdXNoKHsgdHlwZTogXCJ2ZXJ0ZXhcIiwgY29vcmRzOiB2ZXJ0ZXgsIGxpbmVFZGdlOiBsaW5lRWRnZSB9KTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjYWxjdWxhdGVQb2ludHNPbkxpbmUgKHVuaXF1ZUZlYXR1cmVzLCBldnRDb29yZHMpIHtcbiAgICAgICAgY29uc3QgY29vcmRzID0gW107XG4gICAgICAgIGNvbnN0IGtub3duSWRzID0ge307XG4gICAgICAgIGNvbnN0IHJ1bGVyID0gY2hlYXBSdWxlcihldnRDb29yZHNbMV0pO1xuICAgIFxuICAgICAgICB1bmlxdWVGZWF0dXJlcy5mb3JFYWNoKChmZWF0dXJlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBpZCA9IGZlYXR1cmUuaWQgfHwgZmVhdHVyZS5wcm9wZXJ0aWVzLmlkO1xuICAgICAgICAgICAgdmFyIGNsb3Nlc3QgPSBbXTtcbiAgICBcbiAgICAgICAgICAgIGlmIChrbm93bklkc1tpZF0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGtub3duSWRzW2lkXSA9IHRydWU7XG4gICAgICAgICAgICAgICAgY29uc3QgdHlwZSA9IGZlYXR1cmUuZ2VvbWV0cnkudHlwZTtcbiAgICBcbiAgICAgICAgICAgICAgICBpZiAodHlwZSA9PT0gXCJMaW5lU3RyaW5nXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZlYXR1cmUuZ2VvbWV0cnkuY29vcmRpbmF0ZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsb3Nlc3QgPSBjbG9zZXN0UG9pbnRzKHJ1bGVyLCBmZWF0dXJlLmdlb21ldHJ5LmNvb3JkaW5hdGVzLCBldnRDb29yZHMpO1xuICBcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsb3Nlc3QuZm9yRWFjaCgocG9pbnRUeXBlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9pbnRUeXBlLmlkID0gaWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9pbnRUeXBlLmRpc3QgPSBydWxlci5kaXN0YW5jZShwb2ludFR5cGUuY29vcmRzLCBldnRDb29yZHMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvb3Jkcy5wdXNoKHBvaW50VHlwZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibm8gY29vcmRpbmF0ZXM6IFwiLCBmZWF0dXJlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gXCJQb2ludFwiKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBvaW50VHlwZSA9IHsgaWQ6IGlkLCB0eXBlOiBcInZlcnRleFwiLCBjb29yZHM6IGZlYXR1cmUuZ2VvbWV0cnkuY29vcmRpbmF0ZXMsIGxpbmVFZGdlOiB0cnVlIH07XG4gICAgICAgICAgICAgICAgICAgIHBvaW50VHlwZS5kaXN0ID0gcnVsZXIuZGlzdGFuY2UocG9pbnRUeXBlLmNvb3JkcywgZXZ0Q29vcmRzKTtcbiAgICAgICAgICAgICAgICAgICAgY29vcmRzLnB1c2gocG9pbnRUeXBlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT09IFwiUG9seWdvblwiKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0dXJmLmJvb2xlYW5XaXRoaW4odHVyZi5wb2ludChldnRDb29yZHMpLCBmZWF0dXJlKSkgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgZmVhdHVyZS5nZW9tZXRyeS5jb29yZGluYXRlcy5mb3JFYWNoKChmZWF0dXJlQ29vcmRzLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2VzdCA9IGNsb3Nlc3RQb2ludHMocnVsZXIsIGZlYXR1cmVDb29yZHMsIGV2dENvb3Jkcyk7XG4gIFxuICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2VzdC5mb3JFYWNoKChwb2ludFR5cGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb2ludFR5cGUuaWQgPSBpZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb2ludFR5cGUucG9seWdvbkNvb3Jkc0FycmF5ID0gaW5kZXg7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9pbnRUeXBlLmRpc3QgPSBydWxlci5kaXN0YW5jZShwb2ludFR5cGUuY29vcmRzLCBldnRDb29yZHMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvb3Jkcy5wdXNoKHBvaW50VHlwZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICBcbiAgICAgICAgcmV0dXJuIGNvb3JkcztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhZGRWZXJ0ZXggKHN0YXJ0UG9pbnQsIGVuZFBvaW50LCBsZW5ndGgsIGRhdGEpIHtcbiAgICAgICAgdmFyIHN0YXJ0RGF0YSA9IGRhdGFbc3RhcnRQb2ludF07XG4gICAgXG4gICAgICAgIGlmICghc3RhcnREYXRhKSB7XG4gICAgICAgICAgICBzdGFydERhdGEgPSB7fTtcbiAgICAgICAgICAgIGRhdGFbc3RhcnRQb2ludF0gPSBzdGFydERhdGE7XG4gICAgICAgIH1cbiAgICBcbiAgICAgICAgaWYgKCFzdGFydERhdGFbZW5kUG9pbnRdKSB7XG4gICAgICAgICAgICBzdGFydERhdGFbZW5kUG9pbnRdID0gbGVuZ3RoO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWRkVmVydGV4UG9pbnRUd29XYXkgKHN0YXJ0Q29vcmQsIGVuZENvb3JkcywgbGVuZ3RoLCBkYXRhKSB7XG4gICAgICAgIHZhciBzdGFydFBvaW50ID0gc3RhcnRDb29yZC5qb2luKFwiI1wiKTtcbiAgICAgICAgdmFyIGVuZFBvaW50ID0gZW5kQ29vcmRzLmpvaW4oXCIjXCIpO1xuICAgICAgICBhZGRWZXJ0ZXgoc3RhcnRQb2ludCwgZW5kUG9pbnQsIGxlbmd0aCwgZGF0YSk7XG4gICAgICAgIGFkZFZlcnRleChlbmRQb2ludCwgc3RhcnRQb2ludCwgbGVuZ3RoLCBkYXRhKTtcbiAgICB9XG4gICAgXG4gICAgZnVuY3Rpb24gbWV0ZXJzUGVyUGl4ZWwgKGxhdGl0dWRlLCB6b29tTGV2ZWwpIHtcbiAgICAgICAgcmV0dXJuICgoZ2VvZmxvLnN0YXRpY3MuY29uc3RhbnRzLkNJUkNVTSAqIE1hdGguY29zKChsYXRpdHVkZSAqIChNYXRoLlBJIC8gMTgwKSkpKSAvIE1hdGgucG93KDIsIHpvb21MZXZlbCArIDgpKTtcbiAgICB9XG4gICAgXG4gICAgZnVuY3Rpb24gc2V0RmVhdHVyZSAoZmVhdHVyZSkge1xuICAgICAgICBpZiAoIWZlYXR1cmUpIHJldHVybiBnZW9mbG8ubWFwLmdldFNvdXJjZShnZW9mbG8uc3RhdGljcy5jb25zdGFudHMuc291cmNlcy5TTkFQKS5zZXREYXRhKHR1cmYuZmVhdHVyZUNvbGxlY3Rpb24oW10pKSwgZ2VvZmxvLnNuYXBGZWF0dXJlO1xuICAgICAgICBnZW9mbG8uVXRpbGl0aWVzLnNldFByb3BlcnR5KGZlYXR1cmUsICd0eXBlJywgZ2VvZmxvLmN1cnJlbnRNb2RlLnR5cGUpO1xuICAgICAgICBnZW9mbG8ubWFwLmdldFNvdXJjZShnZW9mbG8uc3RhdGljcy5jb25zdGFudHMuc291cmNlcy5TTkFQKS5zZXREYXRhKHR1cmYuZmVhdHVyZUNvbGxlY3Rpb24oW2ZlYXR1cmVdKSk7XG4gICAgICAgIHJldHVybiBmZWF0dXJlO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVwZGF0ZVZlcnRleCAodmVydGV4LCBvcHRpb25zPXt9KSB7XG4gICAgICAgIHZhciBmZWF0dXJlcyA9IGdlb2Zsby5tYXAuZ2V0U291cmNlKGdlb2Zsby5zdGF0aWNzLmNvbnN0YW50cy5zb3VyY2VzLkhPVFRFWFQpLl9kYXRhLmZlYXR1cmVzO1xuICAgICAgICBpZiAoZmVhdHVyZXMubGVuZ3RoICYmIGZlYXR1cmVzW2ZlYXR1cmVzLmxlbmd0aCAtIDFdLnByb3BlcnRpZXMubW91c2VMaW5lKSBmZWF0dXJlcy5wb3AoKTtcblxuICAgICAgICB2ZXJ0ZXgucHJvcGVydGllcy51bml0cyA9IG9wdGlvbnMudW5pdHM7XG4gICAgICAgIHZlcnRleC5wcm9wZXJ0aWVzLnVuaXQgPSBvcHRpb25zLnVuaXQ7XG4gICAgICAgIHZlcnRleC5wcm9wZXJ0aWVzLnRleHQgPSBgJHtvcHRpb25zLnVuaXRzfSAke29wdGlvbnMudW5pdH1gO1xuICAgICAgICB2ZXJ0ZXgucHJvcGVydGllcy50cmFuc2Zvcm0gPSAndXBwZXJjYXNlJztcbiAgICAgICAgdmVydGV4LnByb3BlcnRpZXMuYW5jaG9yID0gJ3RvcC1sZWZ0JztcbiAgICAgICAgdmVydGV4LnByb3BlcnRpZXMubW91c2VMaW5lID0gdHJ1ZTtcbiAgICBcbiAgICAgICAgZmVhdHVyZXMucHVzaCh2ZXJ0ZXgpO1xuICAgICAgICBnZW9mbG8ubWFwLmdldFNvdXJjZShnZW9mbG8uc3RhdGljcy5jb25zdGFudHMuc291cmNlcy5IT1RURVhUKS5zZXREYXRhKHR1cmYuZmVhdHVyZUNvbGxlY3Rpb24oZmVhdHVyZXMpKTtcbiAgICAgICAgcmV0dXJuIHZlcnRleDtcbiAgICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBTbmFwcGluZzsiXSwibmFtZXMiOlsiU25hcHBpbmciLCJtb2RlIiwiZ2VvZmxvIiwidHlwZSIsImFjdGl2YXRlIiwiZW5hYmxlZCIsIm9wdGlvbnMiLCJlbmFibGUiLCJkZWFjdGl2YXRlIiwidXBkYXRlTWVzaERhdGEiLCJnZXRDbG9zZXN0IiwiY29vcmRzIiwiZmVhdHVyZXMiLCJjYWxjdWxhdGVkUmFkaXVzIiwic25hcHBpbmciLCJkaXN0YW5jZSIsIk1hdGgiLCJwb3ciLCJtYXgiLCJtYXAiLCJnZXRab29tIiwicmFkaXVzSW5LbSIsInBpeGVsRGlzdGFuY2UiLCJwaXhlbHMiLCJtZXRlcnNQZXJQaXhlbCIsImdldFJlbmRlcmVkU25hcEZlYXR1cmVzIiwibG5nIiwibGF0IiwiaG90RmVhdHVyZSIsImNsb3Nlc3RQb2ludCIsImZpbmRDbG9zZXN0UG9pbnQiLCJkaXN0IiwicG9pbnQiLCJzZXRDbG9zZXN0IiwiaXNQb2ludCIsImlzVmVydGV4Iiwic25hcEZlYXR1cmUiLCJmaWx0ZXIiLCJwaW5hYmxlRmVhdHVyZXMiLCJsZW5ndGgiLCJjb25jYXQiLCJfdG9Db25zdW1hYmxlQXJyYXkiLCJlIiwiaWQiLCJwcm9wZXJ0aWVzIiwibmVhckZlYXR1cmVzIiwiZ2V0UmVuZGVyZWRGZWF0dXJlcyIsImxhc3RDbGlja0Rpc3RhbmNlIiwibGFzdENsaWNrQXJyYXkiLCJsYXN0Q2xpY2tFcXVhbCIsInVwZGF0ZUZlYXR1cmUiLCJsYXN0Q2xpY2siLCJ0dXJmIiwiQXJyYXkiLCJpc0FycmF5IiwiVXRpbGl0aWVzIiwiaXNQb2ludEVxdWFsIiwidG9sZXJhbmNlIiwibGluZVN0cmluZyIsImZpcmUiLCJjbG9zZXN0Iiwic25hcHBlZCIsInNldEZlYXR1cmUiLCJmZWF0dXJlIiwidG91Y2hDbGljayIsImdldFNvdXJjZSIsInN0YXRpY3MiLCJjb25zdGFudHMiLCJzb3VyY2VzIiwiU05BUCIsInNldERhdGEiLCJmZWF0dXJlQ29sbGVjdGlvbiIsInNuYXBDb29yZHMiLCJnZW9tZXRyeSIsImNvb3JkaW5hdGVzIiwiZmlyc3RDbGljayIsImlzUG9seWdvbiIsImlzUG9seWxpbmUiLCJob3RDb29yZHMiLCJwb3AiLCJzcGxpY2UiLCJhcHBseSIsImNvbnN1bWFibGVBcnJheSIsInNldFByb3BlcnR5Iiwic2V0VmVydGV4Iiwic25hcFRvRmVhdHVyZSIsImJ5cGFzc1NuYXBwaW5nIiwiY2FsY3VsYXRlUm91dGUiLCJSb3V0aW5nIiwiYnlwYXNzUm91dGluZyIsInNuYXBwZWRWZXJ0ZXgiLCJjdXJyZW50TW9kZSIsImRyYWdJbmRleCIsIkhPVCIsInZlcnRleCIsImFkZEZlYXR1cmUiLCJhcmd1bWVudHMiLCJ1bmRlZmluZWQiLCJkb250QWRkIiwiYXNzaWduRGVlcCIsImNsb25lRGVlcCIsInJvdXRpbmciLCJldnRDb29yZHMiLCJtb3VzZUlzRG93biIsIkZlYXR1cmVzIiwiZ2V0VHlwZSIsImdldExhc3RJbmRleENvb3JkcyIsImhpbnRDb29yZHMiLCJoaW50IiwidW5pdCIsInVuaXRzIiwiY29udmVydFVuaXRzIiwidXBkYXRlVmVydGV4IiwiY2hlYXBSdWxlciIsImNoZWFwcnVsZXIiLCJDaGVhcFJ1bGVyIiwiZnJvbVRpbGUiLCJ5IiwieiIsIm4iLCJQSSIsImF0YW4iLCJleHAiLCJraWxvbWV0ZXJzIiwibWlsZXMiLCJuYXV0aWNhbG1pbGVzIiwibWV0ZXJzIiwibWV0cmVzIiwieWFyZHMiLCJmZWV0IiwiaW5jaGVzIiwiZmFjdG9ycyIsIkVycm9yIiwiT2JqZWN0Iiwia2V5cyIsIm0iLCJjb3MiLCJjb3MyIiwiY29zMyIsImNvczQiLCJjb3M1Iiwia3giLCJreSIsInByb3RvdHlwZSIsImVxdWFscyIsImEiLCJiIiwiaW50ZXJwb2xhdGUiLCJ0IiwiZHgiLCJkeSIsInNxcnQiLCJiZWFyaW5nIiwiYXRhbjIiLCJkZXN0aW5hdGlvbiIsInAiLCJvZmZzZXQiLCJzaW4iLCJsaW5lRGlzdGFuY2UiLCJwb2ludHMiLCJ0b3RhbCIsImkiLCJhcmVhIiwicG9seWdvbiIsInN1bSIsInJpbmciLCJqIiwibGVuIiwiayIsImFicyIsImFsb25nIiwibGluZSIsInAwIiwicDEiLCJkIiwicG9pbnRPbkxpbmUiLCJtaW5EaXN0IiwiSW5maW5pdHkiLCJtaW5YIiwibWluWSIsIm1pbkkiLCJtaW5UIiwieCIsInNxRGlzdCIsImluZGV4IiwibGluZVNsaWNlIiwic3RhcnQiLCJzdG9wIiwicDIiLCJ0bXAiLCJzbGljZSIsImwiLCJyIiwicHVzaCIsImxpbmVTbGljZUFsb25nIiwiYnVmZmVyUG9pbnQiLCJidWZmZXIiLCJ2IiwiaCIsImJ1ZmZlckJCb3giLCJiYm94IiwiaW5zaWRlQkJveCIsInVuaXF1ZUZlYXR1cmVzIiwiY2FsY3VsYXRlUG9pbnRzT25MaW5lIiwiY2xvc2VzdFZlcnRleCIsImNsb3Nlc3RMaW5lcG9pbnQiLCJib3JkZXJzIiwiZm9yRWFjaCIsInBvaW50VHlwZSIsImxpbmVFZGdlIiwiZGlzdGFuY2UxIiwiZGlzdGFuY2UyIiwiY29uc29sZSIsImxvZyIsImJvcmRlcjEiLCJib3JkZXIyIiwiYXNzaWduIiwiY2xvc2VzdFBvaW50cyIsInJ1bGVyIiwicmVzdWx0IiwicG9pbnRDb29yZHMiLCJwb2ludEluZGV4IiwibGluZVBvaW50Iiwia25vd25JZHMiLCJib29sZWFuV2l0aGluIiwiZmVhdHVyZUNvb3JkcyIsInBvbHlnb25Db29yZHNBcnJheSIsImFkZFZlcnRleCIsInN0YXJ0UG9pbnQiLCJlbmRQb2ludCIsImRhdGEiLCJzdGFydERhdGEiLCJhZGRWZXJ0ZXhQb2ludFR3b1dheSIsInN0YXJ0Q29vcmQiLCJlbmRDb29yZHMiLCJqb2luIiwibGF0aXR1ZGUiLCJ6b29tTGV2ZWwiLCJDSVJDVU0iLCJIT1RURVhUIiwiX2RhdGEiLCJtb3VzZUxpbmUiLCJ0ZXh0IiwidHJhbnNmb3JtIiwiYW5jaG9yIl0sInNvdXJjZVJvb3QiOiIifQ==