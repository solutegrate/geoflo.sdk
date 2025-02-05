/*!
 * /*!
 *  * GeoFlo SDK
 *  * Version 1.0.11
 *  * Generated on: 2025-02-05T19:22:45.422Z
 *  * /
 */
"use strict";
(self["webpackChunk_solutegrate_geoflo_sdk"] = self["webpackChunk_solutegrate_geoflo_sdk"] || []).push([["snapping"],{

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0FBQ21FLEdBQUcsQ0FBQyxDQUFDO0lBRXpGZSxNQUFNLENBQUNsRCxVQUFVLENBQUNrRSxLQUFLLEdBQUd4RyxPQUFPLENBQUN3RyxLQUFLO0lBQ3ZDaEIsTUFBTSxDQUFDbEQsVUFBVSxDQUFDaUUsSUFBSSxHQUFHdkcsT0FBTyxDQUFDdUcsSUFBSTtJQUNyQ2YsTUFBTSxDQUFDbEQsVUFBVSxDQUFDc00sSUFBSSxNQUFBMU0sTUFBQSxDQUFNbEMsT0FBTyxDQUFDd0csS0FBSyxPQUFBdEUsTUFBQSxDQUFJbEMsT0FBTyxDQUFDdUcsSUFBSSxDQUFFO0lBQzNEZixNQUFNLENBQUNsRCxVQUFVLENBQUN1TSxTQUFTLEdBQUcsV0FBVztJQUN6Q3JKLE1BQU0sQ0FBQ2xELFVBQVUsQ0FBQ3dNLE1BQU0sR0FBRyxVQUFVO0lBQ3JDdEosTUFBTSxDQUFDbEQsVUFBVSxDQUFDcU0sU0FBUyxHQUFHLElBQUk7SUFFbENyTyxRQUFRLENBQUNxTCxJQUFJLENBQUNuRyxNQUFNLENBQUM7SUFDckI1RixNQUFNLENBQUNpQixHQUFHLENBQUM4QyxTQUFTLENBQUMvRCxNQUFNLENBQUNnRSxPQUFPLENBQUNDLFNBQVMsQ0FBQ0MsT0FBTyxDQUFDMkssT0FBTyxDQUFDLENBQUN6SyxPQUFPLENBQUNsQixJQUFJLENBQUNtQixpQkFBaUIsQ0FBQzNELFFBQVEsQ0FBQyxDQUFDO0lBQ3hHLE9BQU9rRixNQUFNO0VBQ2pCO0FBQ0osQ0FBQztBQUVELGlFQUFlOUYsUUFBUSIsInNvdXJjZXMiOlsid2VicGFjazovL0Bzb2x1dGVncmF0ZS9nZW9mbG8tc2RrLy4vc3JjL1NuYXBwaW5nLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQG1peGluXG4gKiBAbWVtYmVyb2YgbW9kdWxlOmdlb2Zsb1xuICogQG5hbWUgU25hcHBpbmdcbiAqIEBkZXNjcmlwdGlvbiBUaGlzIG1vZHVsZSBwcm92aWRlcyB0aGUgc25hcHBpbmcgZnVuY3Rpb25hbGl0eSBmb3IgdGhlIEdlb2ZsbyBhcHBsaWNhdGlvbi4gSXQgYWxsb3dzIHVzZXJzIHRvIHNuYXAgZmVhdHVyZXMgdG8gdGhlIG1hcCBieSBjcmVhdGluZyBhIGJ1ZmZlciBhcm91bmQgdGhlIGZlYXR1cmUgYW5kIHNuYXBwaW5nIHRvIG5lYXJieSBmZWF0dXJlcy5cbiAqIEBwYXJhbSB7T2JqZWN0fSBtb2RlIC0gVGhlIG1vZGUgb2JqZWN0IGNvbnRhaW5pbmcgdGhlIHR5cGUgb2YgbW9kZS5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIFNuYXBwaW5nIG9iamVjdC5cbiAqL1xuY29uc3QgU25hcHBpbmcgPSBmdW5jdGlvbiAobW9kZSkge1xuICAgIGNvbnN0IGdlb2ZsbyA9IHRoaXMuZ2VvZmxvO1xuICAgIHRoaXMudHlwZSA9IG1vZGUudHlwZTtcblxuXHQvKipcblx0ICogQGZ1bmN0aW9uXG4gICAgICogQG1lbWJlcm9mIG1vZHVsZTpnZW9mbG8uU25hcHBpbmdcblx0ICogQG5hbWUgYWN0aXZhdGVcblx0ICogQGRlc2NyaXB0aW9uIFRoaXMgZnVuY3Rpb24gZW5hYmxlcyB0aGUgb2JqZWN0IGFuZCBzZXRzIHRoZSBzbmFwcGluZyBvcHRpb24gdG8gdHJ1ZS5cblx0ICovXG4gICAgdGhpcy5hY3RpdmF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5lbmFibGVkID0gdHJ1ZTtcbiAgICAgICAgZ2VvZmxvLm9wdGlvbnNbJ3NuYXBwaW5nJ10uZW5hYmxlID0gdHJ1ZTtcbiAgICB9XG5cblx0LyoqXG5cdCAqIEBmdW5jdGlvblxuICAgICAqIEBtZW1iZXJvZiBtb2R1bGU6Z2VvZmxvLlNuYXBwaW5nXG5cdCAqIEBuYW1lIGRlYWN0aXZhdGVcblx0ICogQGRlc2NyaXB0aW9uIFRoaXMgZnVuY3Rpb24gc2V0cyB0aGUgJ2VuYWJsZWQnIHByb3BlcnR5IHRvIGZhbHNlLCBkaXNhYmxlcyBzbmFwcGluZywgYW5kIHVwZGF0ZXMgdGhlIG1lc2ggZGF0YS5cblx0ICogQHJldHVybnMge3ZvaWR9XG5cdCAqL1xuICAgIHRoaXMuZGVhY3RpdmF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5lbmFibGVkID0gZmFsc2U7XG4gICAgICAgIGdlb2Zsby5vcHRpb25zWydzbmFwcGluZyddLmVuYWJsZSA9IGZhbHNlO1xuICAgICAgICBnZW9mbG8udXBkYXRlTWVzaERhdGEoW10sIHRydWUpO1xuICAgIH1cblxuXG5cdC8qKlxuXHQgKiBAZnVuY3Rpb25cbiAgICAgKiBAbWVtYmVyb2YgbW9kdWxlOmdlb2Zsby5TbmFwcGluZ1xuXHQgKiBAbmFtZSBnZXRDbG9zZXN0XG5cdCAqIEBkZXNjcmlwdGlvbiBGaW5kcyB0aGUgY2xvc2VzdCBwb2ludCB0byB0aGUgZ2l2ZW4gY29vcmRpbmF0ZXMgd2l0aGluIGEgc3BlY2lmaWVkIHJhZGl1cyBvciBwaXhlbCBkaXN0YW5jZS5cblx0ICogQHBhcmFtIHtBcnJheTxudW1iZXI+fSBjb29yZHMgLSBUaGUgY29vcmRpbmF0ZXMgW2xvbmdpdHVkZSwgbGF0aXR1ZGVdIHRvIGZpbmQgdGhlIGNsb3Nlc3QgcG9pbnQgdG8uXG5cdCAqIEBwYXJhbSB7QXJyYXk8T2JqZWN0Pn0gZmVhdHVyZXMgLSBBbiBhcnJheSBvZiBmZWF0dXJlcyB0byBzZWFyY2ggZm9yIHRoZSBjbG9zZXN0IHBvaW50IHdpdGhpbi5cblx0ICogQHJldHVybnMge09iamVjdH0gQW4gb2JqZWN0IGNvbnRhaW5pbmcgdGhlIGNsb3Nlc3QgcG9pbnQgYW5kIGl0cyBjb29yZGluYXRlcy5cblx0ICovXG4gICAgdGhpcy5nZXRDbG9zZXN0ID0gZnVuY3Rpb24gKGNvb3JkcywgZmVhdHVyZXMpIHtcbiAgICAgICAgdmFyIGNhbGN1bGF0ZWRSYWRpdXMgPSBnZW9mbG8ub3B0aW9ucy5zbmFwcGluZy5kaXN0YW5jZSAqIE1hdGgucG93KDIsIE1hdGgubWF4KDEsIDE5IC0gZ2VvZmxvLm1hcC5nZXRab29tKCkpKTtcbiAgICAgICAgdmFyIHJhZGl1c0luS20gPSBjYWxjdWxhdGVkUmFkaXVzIC8gMTAwMDAwO1xuICAgICAgICB2YXIgcGl4ZWxEaXN0YW5jZSA9IGdlb2Zsby5vcHRpb25zLnNuYXBwaW5nLnBpeGVscyA/IGdlb2Zsby5vcHRpb25zLnNuYXBwaW5nLnBpeGVscyAqIG1ldGVyc1BlclBpeGVsKGNvb3Jkc1sxXSwgZ2VvZmxvLm1hcC5nZXRab29tKCkpIDogZmFsc2U7XG4gICAgICAgIFxuICAgICAgICBmZWF0dXJlcyA9IGZlYXR1cmVzID8gZ2VvZmxvLmdldFJlbmRlcmVkU25hcEZlYXR1cmVzKHsgbG5nOiBjb29yZHNbMF0sIGxhdDogY29vcmRzWzFdIH0sIHJhZGl1c0luS20pIDogW2dlb2Zsby5ob3RGZWF0dXJlXTtcblxuICAgICAgICB2YXIgY2xvc2VzdFBvaW50ID0gZmluZENsb3Nlc3RQb2ludChmZWF0dXJlcywgY29vcmRzLCByYWRpdXNJbkttLCBwaXhlbERpc3RhbmNlKTtcblxuICAgICAgICB2YXIgY29vcmRzID0gIWNsb3Nlc3RQb2ludCA/IGZhbHNlIDpcbiAgICAgICAgICAgIHBpeGVsRGlzdGFuY2UgPyBjbG9zZXN0UG9pbnQuY29vcmRzIDpcbiAgICAgICAgICAgIGNsb3Nlc3RQb2ludC50eXBlID09PSAndmVydGV4JyAmJiBjbG9zZXN0UG9pbnQuZGlzdCA8PSByYWRpdXNJbkttID8gY2xvc2VzdFBvaW50LmNvb3JkcyA6XG4gICAgICAgICAgICBmYWxzZTtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBwb2ludDogY2xvc2VzdFBvaW50LFxuICAgICAgICAgICAgY29vcmRzOiBjb29yZHNcbiAgICAgICAgfTtcbiAgICB9XG5cblx0LyoqXG5cdCAqIEBmdW5jdGlvblxuICAgICAqIEBtZW1iZXJvZiBtb2R1bGU6Z2VvZmxvLlNuYXBwaW5nXG5cdCAqIEBuYW1lIHNldENsb3Nlc3Rcblx0ICogQGRlc2NyaXB0aW9uIFRoaXMgZnVuY3Rpb24gY2FsY3VsYXRlcyB0aGUgY2xvc2VzdCBmZWF0dXJlIHRvIHRoZSBnaXZlbiBjb29yZGluYXRlcyB3aXRoaW4gYSBzcGVjaWZpZWQgcmFkaXVzIGFuZCBzbmFwcGluZyBwYXJhbWV0ZXJzLiBJdCBkZXRlcm1pbmVzIGlmIHRoZSBjbG9zZXN0IGZlYXR1cmUgaXMgYSBwb2ludCBvciBhIHZlcnRleCBhbmQgcmV0dXJucyB0aGUgc25hcHBlZCBmZWF0dXJlIGFjY29yZGluZ2x5LlxuXHQgKiBAcGFyYW0ge0FycmF5PG51bWJlcj59IGNvb3JkcyAtIFRoZSBjb29yZGluYXRlcyBbbG9uZ2l0dWRlLCBsYXRpdHVkZV0gdG8gZmluZCB0aGUgY2xvc2VzdCBmZWF0dXJlIHRvLlxuXHQgKiBAcGFyYW0ge2Jvb2xlYW59IGlzUG9pbnQgLSBJbmRpY2F0ZXMgaWYgdGhlIGZlYXR1cmUgaXMgYSBwb2ludC5cblx0ICogQHBhcmFtIHtib29sZWFufSBpc1ZlcnRleCAtIEluZGljYXRlcyBpZiB0aGUgZmVhdHVyZSBpcyBhIHZlcnRleC5cblx0ICogQHJldHVybnMge09iamVjdH0gVGhlIHNuYXBwZWQgZmVhdHVyZSBiYXNlZCBvbiB0aGUgY2FsY3VsYXRlZCBjbG9zZXN0IHBvaW50IG9yIGxpbmUuXG5cdCAqL1xuICAgIHRoaXMuc2V0Q2xvc2VzdCA9IGZ1bmN0aW9uIChjb29yZHMsIGlzUG9pbnQsIGlzVmVydGV4KSB7XG4gICAgICAgIHZhciBzbmFwRmVhdHVyZSA9IG51bGw7XG4gICAgICAgIHZhciBjYWxjdWxhdGVkUmFkaXVzID0gZ2VvZmxvLm9wdGlvbnMuc25hcHBpbmcuZGlzdGFuY2UgKiBNYXRoLnBvdygyLCBNYXRoLm1heCgxLCAxOSAtIGdlb2Zsby5tYXAuZ2V0Wm9vbSgpKSk7XG4gICAgICAgIHZhciByYWRpdXNJbkttID0gY2FsY3VsYXRlZFJhZGl1cyAvIDEwMDAwMDtcbiAgICAgICAgdmFyIHBpeGVsRGlzdGFuY2UgPSBnZW9mbG8ub3B0aW9ucy5zbmFwcGluZy5waXhlbHMgPyBnZW9mbG8ub3B0aW9ucy5zbmFwcGluZy5waXhlbHMgKiBtZXRlcnNQZXJQaXhlbChjb29yZHNbMV0sIGdlb2Zsby5tYXAuZ2V0Wm9vbSgpKSA6IGZhbHNlO1xuICAgICAgICB2YXIgZmlsdGVyID0gZ2VvZmxvLnBpbmFibGVGZWF0dXJlcyAmJiBnZW9mbG8ucGluYWJsZUZlYXR1cmVzLmxlbmd0aCA/IFsnY2FzZScsIFsnYW55JywgLi4uZ2VvZmxvLnBpbmFibGVGZWF0dXJlcy5tYXAoZSA9PiBbXCI9PVwiLCBbXCJnZXRcIiwgXCJpZFwiXSwgZS5pZCB8fCBlLnByb3BlcnRpZXMuaWRdKV0sIGZhbHNlLCB0cnVlXSA6IGZhbHNlO1xuICAgICAgICB2YXIgbmVhckZlYXR1cmVzID0gZ2VvZmxvLmdldFJlbmRlcmVkRmVhdHVyZXMoeyBsbmc6IGNvb3Jkc1swXSwgbGF0OiBjb29yZHNbMV0gfSwgcmFkaXVzSW5LbSwgZmlsdGVyKTtcbiAgICAgICAgdmFyIGNsb3Nlc3RQb2ludCA9IG5lYXJGZWF0dXJlcyAmJiBuZWFyRmVhdHVyZXMubGVuZ3RoID8gZmluZENsb3Nlc3RQb2ludChuZWFyRmVhdHVyZXMsIGNvb3JkcywgcmFkaXVzSW5LbSwgcGl4ZWxEaXN0YW5jZSkgOiBmYWxzZTtcbiAgICAgICAgdmFyIGxhc3RDbGlja0Rpc3RhbmNlLCBsYXN0Q2xpY2tBcnJheSwgbGFzdENsaWNrRXF1YWw7XG5cbiAgICAgICAgZ2VvZmxvLmNsb3Nlc3RQb2ludCA9IGNsb3Nlc3RQb2ludDtcblxuICAgICAgICBpZiAoKCFuZWFyRmVhdHVyZXMgJiYgIWlzUG9pbnQpIHx8ICghY2xvc2VzdFBvaW50ICYmICFpc1BvaW50KSkgcmV0dXJuIHRoaXMudXBkYXRlRmVhdHVyZShjb29yZHMpO1xuICAgICAgICBpZiAoIWNsb3Nlc3RQb2ludCB8fCAhY2xvc2VzdFBvaW50LmNvb3JkcykgcmV0dXJuIHNuYXBGZWF0dXJlO1xuXG4gICAgICAgIGlmIChpc1ZlcnRleCB8fCAhZ2VvZmxvLmxhc3RDbGljaykge1xuICAgICAgICAgICAgc25hcEZlYXR1cmUgPSB0dXJmLnBvaW50KGNsb3Nlc3RQb2ludC5jb29yZHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGFzdENsaWNrQXJyYXkgPSBBcnJheS5pc0FycmF5KGdlb2Zsby5sYXN0Q2xpY2suY29vcmRzKSAmJiBBcnJheS5pc0FycmF5KGdlb2Zsby5sYXN0Q2xpY2suY29vcmRzWzBdKTtcbiAgICAgICAgICAgIGlmIChsYXN0Q2xpY2tBcnJheSkgZ2VvZmxvLmxhc3RDbGljay5jb29yZHMgPSBnZW9mbG8ubGFzdENsaWNrLmNvb3Jkc1swXTtcblxuICAgICAgICAgICAgbGFzdENsaWNrRGlzdGFuY2UgPSB0dXJmLmRpc3RhbmNlKHR1cmYucG9pbnQoY29vcmRzKSwgdHVyZi5wb2ludChnZW9mbG8ubGFzdENsaWNrLmNvb3JkcykpO1xuICAgICAgICAgICAgbGFzdENsaWNrRXF1YWwgPSBnZW9mbG8uVXRpbGl0aWVzLmlzUG9pbnRFcXVhbChnZW9mbG8ubGFzdENsaWNrLmNvb3JkcywgY2xvc2VzdFBvaW50LmNvb3Jkcyk7XG5cbiAgICAgICAgICAgIGlmIChsYXN0Q2xpY2tFcXVhbCAmJiBsYXN0Q2xpY2tEaXN0YW5jZSA+IGdlb2Zsby5vcHRpb25zLnNuYXBwaW5nLnRvbGVyYW5jZSkgcmV0dXJuIHRoaXMudXBkYXRlRmVhdHVyZShjb29yZHMpO1xuXG4gICAgICAgICAgICBzbmFwRmVhdHVyZSA9IHR1cmYubGluZVN0cmluZyhbZ2VvZmxvLmxhc3RDbGljay5jb29yZHMsIGNsb3Nlc3RQb2ludC5jb29yZHNdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGdlb2Zsby5maXJlKCdzbmFwcGluZy5hZGQnLCB7IGNsb3Nlc3Q6IGNsb3Nlc3RQb2ludCwgc25hcHBlZDogc25hcEZlYXR1cmUgfSk7XG4gICAgICAgIHJldHVybiBzbmFwRmVhdHVyZTtcbiAgICB9XG5cblxuXHQvKipcblx0ICogQGZ1bmN0aW9uXG4gICAgICogQG1lbWJlcm9mIG1vZHVsZTpnZW9mbG8uU25hcHBpbmdcblx0ICogQG5hbWUgc2V0RmVhdHVyZVxuXHQgKiBAZGVzY3JpcHRpb24gVGhpcyBmdW5jdGlvbiBzZXRzIGEgZmVhdHVyZSBvbiB0aGUgbWFwIHVzaW5nIHRoZSBwcm92aWRlZCBmZWF0dXJlIGFuZCBjb29yZGluYXRlcy4gSXQgaGFuZGxlcyBkaWZmZXJlbnQgc2NlbmFyaW9zIHN1Y2ggYXMgY3JlYXRpbmcgYSBwb2ludCwgbGluZSwgb3IgcG9seWdvbiBmZWF0dXJlIGJhc2VkIG9uIHRoZSBpbnB1dCBwYXJhbWV0ZXJzLlxuXHQgKiBAcGFyYW0ge09iamVjdH0gZmVhdHVyZSAtIFRoZSBmZWF0dXJlIHRvIGJlIHNldCBvbiB0aGUgbWFwLlxuXHQgKiBAcGFyYW0ge0FycmF5fSBjb29yZHMgLSBUaGUgY29vcmRpbmF0ZXMgZm9yIHRoZSBmZWF0dXJlLlxuXHQgKiBAcmV0dXJucyB7T2JqZWN0fSBUaGUgZmVhdHVyZSB0aGF0IHdhcyBzZXQgb24gdGhlIG1hcC5cblx0ICovXG4gICAgdGhpcy5zZXRGZWF0dXJlID0gZnVuY3Rpb24gKGZlYXR1cmUsIGNvb3Jkcykge1xuICAgICAgICBpZiAoZ2VvZmxvLnRvdWNoQ2xpY2spIHJldHVybiBudWxsO1xuXG4gICAgICAgIGZlYXR1cmUgPSBmZWF0dXJlIHx8IGdlb2Zsby5zbmFwRmVhdHVyZTtcbiAgICAgICAgXG4gICAgICAgIGlmICghZmVhdHVyZSAmJiBjb29yZHMpIHJldHVybiBzZXRGZWF0dXJlKHR1cmYucG9pbnQoY29vcmRzKSk7XG4gICAgICAgIGlmICghZmVhdHVyZSkgcmV0dXJuIGdlb2Zsby5tYXAuZ2V0U291cmNlKGdlb2Zsby5zdGF0aWNzLmNvbnN0YW50cy5zb3VyY2VzLlNOQVApLnNldERhdGEodHVyZi5mZWF0dXJlQ29sbGVjdGlvbihbXSkpLCBudWxsO1xuXG4gICAgICAgIHZhciBzbmFwQ29vcmRzID0gZmVhdHVyZS5nZW9tZXRyeS5jb29yZGluYXRlcztcbiAgICAgICAgdmFyIGxhc3RDbGljayA9IGNvb3JkcyB8fCBnZW9mbG8ubGFzdENsaWNrLmNvb3JkcztcbiAgICAgICAgdmFyIGZpcnN0Q2xpY2sgPSBnZW9mbG8uZmlyc3RDbGljay5jb29yZHM7XG4gICAgICAgIHZhciBpc1BvbHlnb24gPSB0aGlzLnR5cGUgPT09ICdQb2x5Z29uJyB8fCBmZWF0dXJlLnByb3BlcnRpZXMudHlwZSA9PT0gJ1BvbHlnb24nO1xuICAgICAgICB2YXIgaXNQb2x5bGluZSA9IGZlYXR1cmUuZ2VvbWV0cnkudHlwZSA9PT0gXCJMaW5lU3RyaW5nXCI7XG5cbiAgICAgICAgaWYgKCFpc1BvbHlsaW5lIHx8IHNuYXBDb29yZHMubGVuZ3RoIDwgMikge1xuICAgICAgICAgICAgZmVhdHVyZSA9IHNldEZlYXR1cmUoaXNQb2x5Z29uID8gdHVyZi5saW5lU3RyaW5nKFtmaXJzdENsaWNrLCBsYXN0Q2xpY2tdKSA6IHR1cmYucG9pbnQobGFzdENsaWNrKSk7XG4gICAgICAgIH0gZWxzZSBpZiAoZ2VvZmxvLmhvdEZlYXR1cmUpIHtcbiAgICAgICAgICAgIHZhciBob3RDb29yZHMgPSBnZW9mbG8uaG90RmVhdHVyZS5nZW9tZXRyeS5jb29yZGluYXRlcztcbiAgICAgICAgICAgIGlmIChpc1BvbHlnb24pIHNuYXBDb29yZHMucG9wKCk7XG4gICAgICAgICAgICBob3RDb29yZHMuc3BsaWNlLmFwcGx5KGhvdENvb3JkcywgWy0xLCAxXS5jb25jYXQoZ2VvZmxvLlV0aWxpdGllcy5jb25zdW1hYmxlQXJyYXkoc25hcENvb3JkcykpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGdlb2Zsby5ob3RGZWF0dXJlID0gdHVyZi5saW5lU3RyaW5nKHNuYXBDb29yZHMpO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2VvZmxvLlV0aWxpdGllcy5zZXRQcm9wZXJ0eShnZW9mbG8uaG90RmVhdHVyZSwgJ3R5cGUnLCB0aGlzLnR5cGUpO1xuXG4gICAgICAgIGZlYXR1cmUgPSBzZXRGZWF0dXJlKGlzUG9seWdvbiA/IHR1cmYubGluZVN0cmluZyhbZmlyc3RDbGljaywgbGFzdENsaWNrXSkgOiB0dXJmLnBvaW50KGxhc3RDbGljaykpO1xuICAgICAgICBnZW9mbG8uc25hcEZlYXR1cmUgPSBmZWF0dXJlO1xuICAgICAgICByZXR1cm4gZ2VvZmxvLnNuYXBGZWF0dXJlO1xuICAgIH1cblxuXHQvKipcblx0ICogQGZ1bmN0aW9uXG4gICAgICogQG1lbWJlcm9mIG1vZHVsZTpnZW9mbG8uU25hcHBpbmdcblx0ICogQG5hbWUgc2V0VmVydGV4XG5cdCAqIEBkZXNjcmlwdGlvbiBUaGlzIGZ1bmN0aW9uIGRldGVybWluZXMgdGhlIHZlcnRleCBiYXNlZCBvbiBzbmFwcGluZyBhbmQgcm91dGluZyBzZXR0aW5ncy4gSXQgc2V0cyB0aGUgY2xvc2VzdCBmZWF0dXJlIHdoZW4gc25hcHBpbmcgaXMgZW5hYmxlZCBhbmQgY2FsY3VsYXRlcyB0aGUgcm91dGUgaWYgcm91dGluZyBpcyBlbmFibGVkLiBJdCB1cGRhdGVzIHRoZSBtYXAgc291cmNlcyBhY2NvcmRpbmdseSBhbmQgdHJpZ2dlcnMgZXZlbnRzIHJlbGF0ZWQgdG8gdmVydGV4IGRyYWdnaW5nIGFuZCBzbmFwcGluZy5cblx0ICogQHBhcmFtIHtPYmplY3R9IGdlb2ZsbyAtIFRoZSBjb250ZXh0IG9iamVjdCBjb250YWluaW5nIHZhcmlvdXMgc2V0dGluZ3MgYW5kIGRhdGEuXG5cdCAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGZhbHNlIGlmIHNuYXBwaW5nIGlzIGRpc2FibGVkIG9yIG5vIHNuYXBwZWQgdmVydGV4IGlzIGF2YWlsYWJsZS5cblx0ICovXG4gICAgdGhpcy5zZXRWZXJ0ZXggPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBzbmFwVG9GZWF0dXJlID0gZ2VvZmxvLlNuYXBwaW5nLmVuYWJsZWQ7XG4gICAgICAgIGlmIChnZW9mbG8uYnlwYXNzU25hcHBpbmcpIHNuYXBUb0ZlYXR1cmUgPSBmYWxzZTtcblxuICAgICAgICB2YXIgY2FsY3VsYXRlUm91dGUgPSBnZW9mbG8uUm91dGluZyAmJiBnZW9mbG8uUm91dGluZy5lbmFibGVkO1xuICAgICAgICBpZiAoZ2VvZmxvLmJ5cGFzc1JvdXRpbmcpIGNhbGN1bGF0ZVJvdXRlID0gZmFsc2U7XG5cbiAgICAgICAgaWYgKCFzbmFwVG9GZWF0dXJlIHx8ICFnZW9mbG8uc25hcHBlZFZlcnRleCkgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgIGdlb2Zsby5zbmFwRmVhdHVyZSA9IHRoaXMuc2V0Q2xvc2VzdChnZW9mbG8uc25hcHBlZFZlcnRleCwgdHJ1ZSwgdHJ1ZSk7XG5cbiAgICAgICAgaWYgKGNhbGN1bGF0ZVJvdXRlKSBnZW9mbG8uc25hcEZlYXR1cmUgPSBnZW9mbG8uUm91dGluZy5nZXRDbG9zZXN0KCkgfHwgZ2VvZmxvLnNuYXBGZWF0dXJlO1xuICAgICAgICBpZiAoIWdlb2Zsby5zbmFwRmVhdHVyZSkgcmV0dXJuIGdlb2Zsby5tYXAuZ2V0U291cmNlKGdlb2Zsby5zdGF0aWNzLmNvbnN0YW50cy5zb3VyY2VzLlNOQVApLnNldERhdGEodHVyZi5mZWF0dXJlQ29sbGVjdGlvbihbXSkpO1xuXG4gICAgICAgIGdlb2Zsby5VdGlsaXRpZXMuc2V0UHJvcGVydHkoZ2VvZmxvLnNuYXBGZWF0dXJlLCAndHlwZScsIGdlb2Zsby5jdXJyZW50TW9kZS50eXBlKTtcbiAgICAgICAgZ2VvZmxvLm1hcC5nZXRTb3VyY2UoZ2VvZmxvLnN0YXRpY3MuY29uc3RhbnRzLnNvdXJjZXNbY2FsY3VsYXRlUm91dGUgPyAnUk9VVEUnIDogJ1NOQVAnXSkuc2V0RGF0YSh0dXJmLmZlYXR1cmVDb2xsZWN0aW9uKFtnZW9mbG8uc25hcEZlYXR1cmVdKSk7XG5cbiAgICAgICAgZ2VvZmxvLmhvdEZlYXR1cmUuZ2VvbWV0cnkuY29vcmRpbmF0ZXNbZ2VvZmxvLmRyYWdJbmRleF0gPSBnZW9mbG8uc25hcEZlYXR1cmUuZ2VvbWV0cnkuY29vcmRpbmF0ZXM7XG4gICAgICAgIGdlb2Zsby5tYXAuZ2V0U291cmNlKGdlb2Zsby5zdGF0aWNzLmNvbnN0YW50cy5zb3VyY2VzLkhPVCkuc2V0RGF0YSh0dXJmLmZlYXR1cmVDb2xsZWN0aW9uKFtnZW9mbG8uaG90RmVhdHVyZV0pKTtcbiAgICAgICAgZ2VvZmxvLmZpcmUoJ3ZlcnRleC5kcmFnc25hcCcsIHsgZmVhdHVyZTogZ2VvZmxvLmhvdEZlYXR1cmUsIHZlcnRleDogdHVyZi5wb2ludChnZW9mbG8uc25hcHBlZFZlcnRleCkgfSk7XG4gICAgfVxuXG5cblx0LyoqXG5cdCAqIEBmdW5jdGlvblxuICAgICAqIEBtZW1iZXJvZiBtb2R1bGU6Z2VvZmxvLlNuYXBwaW5nXG5cdCAqIEBuYW1lIGFkZEZlYXR1cmVcblx0ICogQGRlc2NyaXB0aW9uIFRoaXMgZnVuY3Rpb24gYWRkcyBhIGZlYXR1cmUgdG8gdGhlIG1hcCBieSBzZXR0aW5nIHRoZSBkYXRhIG9mIHRoZSBzcGVjaWZpZWQgc291cmNlIHdpdGggdGhlIHByb3ZpZGVkIGZlYXR1cmUuIEl0IGFsc28gdXBkYXRlcyB0aGUgcHJvcGVydGllcyBvZiB0aGUgZmVhdHVyZSBpZiBwcm9wZXJ0aWVzIGFyZSBwcm92aWRlZC5cblx0ICogQHBhcmFtIHtPYmplY3R9IGZlYXR1cmUgLSBUaGUgZmVhdHVyZSB0byBiZSBhZGRlZCB0byB0aGUgbWFwLlxuXHQgKiBAcGFyYW0ge09iamVjdH0gW3Byb3BlcnRpZXM9e31dIC0gQWRkaXRpb25hbCBwcm9wZXJ0aWVzIHRvIGJlIGFzc2lnbmVkIHRvIHRoZSBmZWF0dXJlLlxuXHQgKiBAcGFyYW0ge2Jvb2xlYW59IFtkb250QWRkXSAtIEZsYWcgdG8gcHJldmVudCBhZGRpbmcgdGhlIGZlYXR1cmUgaWYgc2V0IHRvIHRydWUuXG5cdCAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGZhbHNlIGlmIHRoZSBmZWF0dXJlIGlzIG5vdCBwcm92aWRlZCBvciBpZiBkb250QWRkIGZsYWcgaXMgc2V0LlxuXHQgKi9cbiAgICB0aGlzLmFkZEZlYXR1cmUgPSBmdW5jdGlvbiAoZmVhdHVyZSwgcHJvcGVydGllcz17fSwgZG9udEFkZCkge1xuICAgICAgICBnZW9mbG8ubWFwLmdldFNvdXJjZShnZW9mbG8uc3RhdGljcy5jb25zdGFudHMuc291cmNlc1snU05BUCddKS5zZXREYXRhKHR1cmYuZmVhdHVyZUNvbGxlY3Rpb24oW10pKTtcbiAgICAgICAgZ2VvZmxvLm1hcC5nZXRTb3VyY2UoZ2VvZmxvLnN0YXRpY3MuY29uc3RhbnRzLnNvdXJjZXNbJ1JPVVRFJ10pLnNldERhdGEodHVyZi5mZWF0dXJlQ29sbGVjdGlvbihbXSkpO1xuICAgICAgICBpZiAoIWZlYXR1cmUgfHwgZG9udEFkZCkgcmV0dXJuIGZhbHNlO1xuICAgICAgICBpZiAocHJvcGVydGllcykgZmVhdHVyZS5wcm9wZXJ0aWVzID0gZ2VvZmxvLlV0aWxpdGllcy5hc3NpZ25EZWVwKGdlb2Zsby5VdGlsaXRpZXMuY2xvbmVEZWVwKHByb3BlcnRpZXMpLCBmZWF0dXJlLnByb3BlcnRpZXMpO1xuICAgICAgICBnZW9mbG8uc25hcEZlYXR1cmUgPSBmZWF0dXJlO1xuICAgICAgICBnZW9mbG8ubWFwLmdldFNvdXJjZShnZW9mbG8uc3RhdGljcy5jb25zdGFudHMuc291cmNlc1tmZWF0dXJlLnByb3BlcnRpZXMucm91dGluZyA/ICdST1VURScgOiAnU05BUCddKS5zZXREYXRhKHR1cmYuZmVhdHVyZUNvbGxlY3Rpb24oW2dlb2Zsby5zbmFwRmVhdHVyZV0pKTtcbiAgICB9XG5cblx0LyoqXG5cdCAqIEBmdW5jdGlvblxuICAgICAqIEBtZW1iZXJvZiBtb2R1bGU6Z2VvZmxvLlNuYXBwaW5nXG5cdCAqIEBuYW1lIHVwZGF0ZUZlYXR1cmVcblx0ICogQGRlc2NyaXB0aW9uIFRoaXMgZnVuY3Rpb24gdXBkYXRlcyBhIGZlYXR1cmUgYmFzZWQgb24gdGhlIGV2ZW50IGNvb3JkaW5hdGVzIHByb3ZpZGVkLiBJdCBkZXRlcm1pbmVzIHRoZSB0eXBlIG9mIGZlYXR1cmUsIGNhbGN1bGF0ZXMgdGhlIG5lY2Vzc2FyeSBjb29yZGluYXRlcywgY3JlYXRlcyBhIGxpbmUgZmVhdHVyZSB3aXRoIGhpbnQgcHJvcGVydGllcywgYW5kIGNvbnZlcnRzIHVuaXRzIGlmIG5lZWRlZC5cblx0ICogQHBhcmFtIHtBcnJheX0gZXZ0Q29vcmRzIC0gVGhlIGV2ZW50IGNvb3JkaW5hdGVzIHRvIHVwZGF0ZSB0aGUgZmVhdHVyZS5cblx0ICogQHJldHVybnMge09iamVjdH0gVGhlIHVwZGF0ZWQgZmVhdHVyZSBiYXNlZCBvbiB0aGUgZXZlbnQgY29vcmRpbmF0ZXMuXG5cdCAqL1xuICAgIHRoaXMudXBkYXRlRmVhdHVyZSA9IGZ1bmN0aW9uIChldnRDb29yZHMpIHtcbiAgICAgICAgZ2VvZmxvLmNsb3Nlc3RQb2ludCA9IG51bGw7XG4gICAgICAgIGlmICghZ2VvZmxvLmxhc3RDbGljaykgcmV0dXJuIG51bGw7XG4gICAgICAgIGlmICghZ2VvZmxvLmZpcnN0Q2xpY2sgfHwgZ2VvZmxvLm1vdXNlSXNEb3duKSByZXR1cm4gbnVsbDtcbiAgICBcbiAgICAgICAgdmFyIHR5cGUgPSBnZW9mbG8uRmVhdHVyZXMuZ2V0VHlwZShnZW9mbG8uaG90RmVhdHVyZSkgfHwgZ2VvZmxvLmN1cnJlbnRNb2RlLnR5cGU7XG4gICAgICAgIHZhciBjb29yZHMgPSBnZW9mbG8uaG90RmVhdHVyZSA/IGdlb2Zsby5VdGlsaXRpZXMuZ2V0TGFzdEluZGV4Q29vcmRzKGdlb2Zsby5ob3RGZWF0dXJlKSA6IGdlb2Zsby5sYXN0Q2xpY2suY29vcmRzO1xuICAgICAgICB2YXIgdmVydGV4ID0gdHVyZi5wb2ludChldnRDb29yZHMpO1xuICAgICAgICB2YXIgaGludENvb3JkcyA9IHR5cGUgJiYgdHlwZSA9PT0gXCJQb2x5Z29uXCIgJiYgZ2VvZmxvLmhvdEZlYXR1cmUgPyBbY29vcmRzLCBldnRDb29yZHMsIGdlb2Zsby5maXJzdENsaWNrLmNvb3Jkc10gOiBbY29vcmRzLCBldnRDb29yZHNdO1xuICAgICAgICB2YXIgZmVhdHVyZSA9IHR1cmYubGluZVN0cmluZyhoaW50Q29vcmRzKTtcblxuICAgICAgICBmZWF0dXJlLnByb3BlcnRpZXMudHlwZSA9IHR5cGU7XG4gICAgICAgIGZlYXR1cmUucHJvcGVydGllcy5oaW50ID0gdHJ1ZTtcbiAgICAgICAgXG4gICAgICAgIHZhciB1bml0ID0gJ2ZlZXQnO1xuICAgICAgICB2YXIgdW5pdHMgPSBnZW9mbG8uRmVhdHVyZXMuY29udmVydFVuaXRzKGdlb2Zsby5ob3RGZWF0dXJlLCAwLCB1bml0KTtcbiAgICAgICAgdW5pdHMgKz0gZ2VvZmxvLkZlYXR1cmVzLmNvbnZlcnRVbml0cyhmZWF0dXJlLCAwLCB1bml0KTtcbiAgICAgICAgdmVydGV4ID0gdXBkYXRlVmVydGV4KHZlcnRleCwgeyB1bml0czogdW5pdHMsIHVuaXQ6IHVuaXQgfSk7XG5cbiAgICAgICAgcmV0dXJuIGZlYXR1cmU7XG4gICAgfVxuXG5cblxuXG4gICAgaWYgKGdlb2Zsby5vcHRpb25zWydzbmFwcGluZyddLmVuYWJsZSkgdGhpcy5hY3RpdmF0ZSgpO1xuXG5cblxuXG4gICAgZnVuY3Rpb24gY2hlYXBSdWxlciAobGF0LCB1bml0cykge1xuICAgICAgICBmdW5jdGlvbiBjaGVhcHJ1bGVyKGxhdCwgdW5pdHMpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgQ2hlYXBSdWxlcihsYXQsdW5pdHMpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBjaGVhcHJ1bGVyLmZyb21UaWxlID0gZnVuY3Rpb24oeSwgeiwgdW5pdHMpIHtcbiAgICAgICAgICAgIHZhciBuID0gTWF0aC5QSSAqICgxIC0gMiAqICh5ICsgMC41KSAvIE1hdGgucG93KDIsIHopKTtcbiAgICAgICAgICAgIHZhciBsYXQgPSBNYXRoLmF0YW4oMC41ICogKE1hdGguZXhwKG4pIC0gTWF0aC5leHAoLW4pKSkgKiAxODAgLyBNYXRoLlBJO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBDaGVhcFJ1bGVyKGxhdCx1bml0cyk7XG4gICAgICAgIH07XG4gICAgICAgIFxuICAgICAgICBjaGVhcHJ1bGVyLnVuaXRzID0ge1xuICAgICAgICAgICAga2lsb21ldGVyczogMSxcbiAgICAgICAgICAgIG1pbGVzOiAxMDAwIC8gMTYwOS4zNDQsXG4gICAgICAgICAgICBuYXV0aWNhbG1pbGVzOiAxMDAwIC8gMTg1MixcbiAgICAgICAgICAgIG1ldGVyczogMTAwMCxcbiAgICAgICAgICAgIG1ldHJlczogMTAwMCxcbiAgICAgICAgICAgIHlhcmRzOiAxMDAwIC8gMC45MTQ0LFxuICAgICAgICAgICAgZmVldDogMTAwMCAvIDAuMzA0OCxcbiAgICAgICAgICAgIGluY2hlczogMTAwMCAvIDAuMDI1NFxuICAgICAgICB9O1xuICAgICAgICBcbiAgICAgICAgZnVuY3Rpb24gQ2hlYXBSdWxlcihsYXQsIHVuaXRzKSB7XG4gICAgICAgICAgICB2YXIgZmFjdG9ycyA9IHtcbiAgICAgICAgICAgICAgICBraWxvbWV0ZXJzOiAxLFxuICAgICAgICAgICAgICAgIG1pbGVzOiAxMDAwIC8gMTYwOS4zNDQsXG4gICAgICAgICAgICAgICAgbmF1dGljYWxtaWxlczogMTAwMCAvIDE4NTIsXG4gICAgICAgICAgICAgICAgbWV0ZXJzOiAxMDAwLFxuICAgICAgICAgICAgICAgIG1ldHJlczogMTAwMCxcbiAgICAgICAgICAgICAgICB5YXJkczogMTAwMCAvIDAuOTE0NCxcbiAgICAgICAgICAgICAgICBmZWV0OiAxMDAwIC8gMC4zMDQ4LFxuICAgICAgICAgICAgICAgIGluY2hlczogMTAwMCAvIDAuMDI1NFxuICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgICAgIGlmIChsYXQgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIGxhdGl0dWRlIGdpdmVuLicpO1xuICAgICAgICAgICAgaWYgKHVuaXRzICYmICFmYWN0b3JzW3VuaXRzXSlcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vua25vd24gdW5pdCAnICsgdW5pdHMgKyAnLiBVc2Ugb25lIG9mOiAnICsgT2JqZWN0LmtleXMoZmFjdG9ycykpO1xuICAgICAgICBcbiAgICAgICAgICAgIHZhciBtID0gdW5pdHMgPyBmYWN0b3JzW3VuaXRzXSA6IDE7XG4gICAgICAgIFxuICAgICAgICAgICAgdmFyIGNvcyA9IE1hdGguY29zKGxhdCAqIE1hdGguUEkgLyAxODApO1xuICAgICAgICAgICAgdmFyIGNvczIgPSAyICogY29zICogY29zIC0gMTtcbiAgICAgICAgICAgIHZhciBjb3MzID0gMiAqIGNvcyAqIGNvczIgLSBjb3M7XG4gICAgICAgICAgICB2YXIgY29zNCA9IDIgKiBjb3MgKiBjb3MzIC0gY29zMjtcbiAgICAgICAgICAgIHZhciBjb3M1ID0gMiAqIGNvcyAqIGNvczQgLSBjb3MzO1xuICAgICAgICBcbiAgICAgICAgICAgIHRoaXMua3ggPSBtICogKDExMS40MTUxMyAqIGNvcyAtIDAuMDk0NTUgKiBjb3MzICsgMC4wMDAxMiAqIGNvczUpO1xuICAgICAgICAgICAgdGhpcy5reSA9IG0gKiAoMTExLjEzMjA5IC0gMC41NjYwNSAqIGNvczIgKyAwLjAwMTIgKiBjb3M0KTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgQ2hlYXBSdWxlci5wcm90b3R5cGUgPSB7XG4gICAgICAgICAgICBlcXVhbHM6IGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGFbMF0gPT09IGJbMF0gJiYgYVsxXSA9PT0gYlsxXTtcbiAgICAgICAgICAgIH0sXG4gICAgICBcbiAgICAgICAgICAgIGludGVycG9sYXRlOiBmdW5jdGlvbiAoYSwgYiwgdCkge1xuICAgICAgICAgICAgICAgIHZhciBkeCA9IGJbMF0gLSBhWzBdO1xuICAgICAgICAgICAgICAgIHZhciBkeSA9IGJbMV0gLSBhWzFdO1xuICAgICAgICAgICAgICAgIHJldHVybiBbYVswXSArIGR4ICogdCwgYVsxXSArIGR5ICogdF07XG4gICAgICAgICAgICB9LFxuICAgICAgXG4gICAgICAgICAgICBkaXN0YW5jZTogZnVuY3Rpb24oYSwgYikge1xuICAgICAgICAgICAgICAgIHZhciBkeCA9IChhWzBdIC0gYlswXSkgKiB0aGlzLmt4O1xuICAgICAgICAgICAgICAgIHZhciBkeSA9IChhWzFdIC0gYlsxXSkgKiB0aGlzLmt5O1xuICAgICAgICAgICAgICAgIHJldHVybiBNYXRoLnNxcnQoZHggKiBkeCArIGR5ICogZHkpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgXG4gICAgICAgICAgICBiZWFyaW5nOiBmdW5jdGlvbihhLCBiKSB7XG4gICAgICAgICAgICAgICAgdmFyIGR4ID0gKGJbMF0gLSBhWzBdKSAqIHRoaXMua3g7XG4gICAgICAgICAgICAgICAgdmFyIGR5ID0gKGJbMV0gLSBhWzFdKSAqIHRoaXMua3k7XG4gICAgICAgICAgICAgICAgaWYgKCFkeCAmJiAhZHkpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICAgICAgICAgIHZhciBiZWFyaW5nID0gTWF0aC5hdGFuMigtZHksIGR4KSAqIDE4MCAvIE1hdGguUEkgKyA5MDtcbiAgICAgICAgICAgICAgICBpZiAoYmVhcmluZyA+IDE4MClcbiAgICAgICAgICAgICAgICAgICAgYmVhcmluZyAtPSAzNjA7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGJlYXJpbmc7XG4gICAgICAgICAgICB9LFxuICAgICAgICBcbiAgICAgICAgICAgIGRlc3RpbmF0aW9uOiBmdW5jdGlvbihwLCBkaXN0LCBiZWFyaW5nKSB7XG4gICAgICAgICAgICAgICAgdmFyIGEgPSAoOTAgLSBiZWFyaW5nKSAqIE1hdGguUEkgLyAxODA7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMub2Zmc2V0KHAsIE1hdGguY29zKGEpICogZGlzdCwgTWF0aC5zaW4oYSkgKiBkaXN0KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIFxuICAgICAgICAgICAgb2Zmc2V0OiBmdW5jdGlvbihwLCBkeCwgZHkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gW3BbMF0gKyBkeCAvIHRoaXMua3gsIHBbMV0gKyBkeSAvIHRoaXMua3ldO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgXG4gICAgICAgICAgICBsaW5lRGlzdGFuY2U6IGZ1bmN0aW9uKHBvaW50cykge1xuICAgICAgICAgICAgICAgIHZhciB0b3RhbCA9IDA7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwb2ludHMubGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHRvdGFsICs9IHRoaXMuZGlzdGFuY2UocG9pbnRzW2ldLCBwb2ludHNbaSArIDFdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRvdGFsO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgXG4gICAgICAgICAgICBhcmVhOiBmdW5jdGlvbihwb2x5Z29uKSB7XG4gICAgICAgICAgICAgICAgdmFyIHN1bSA9IDA7XG4gICAgICAgIFxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcG9seWdvbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcmluZyA9IHBvbHlnb25baV07XG4gICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMCwgbGVuID0gcmluZy5sZW5ndGgsIGsgPSBsZW4gLSAxOyBqIDwgbGVuOyBrID0gaisrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdW0gKz0gKHJpbmdbal1bMF0gLSByaW5nW2tdWzBdKSAqIChyaW5nW2pdWzFdICsgcmluZ1trXVsxXSkgKiAoaSA/IC0xIDogMSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgICAgICAgIHJldHVybiAoTWF0aC5hYnMoc3VtKSAvIDIpICogdGhpcy5reCAqIHRoaXMua3k7XG4gICAgICAgICAgICB9LFxuICAgICAgICBcbiAgICAgICAgICAgIGFsb25nOiBmdW5jdGlvbihsaW5lLCBkaXN0KSB7XG4gICAgICAgICAgICAgICAgdmFyIHN1bSA9IDA7XG4gICAgICAgIFxuICAgICAgICAgICAgICAgIGlmIChkaXN0IDw9IDApXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBsaW5lWzBdO1xuICAgICAgICBcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxpbmUubGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBwMCA9IGxpbmVbaV07XG4gICAgICAgICAgICAgICAgICAgIHZhciBwMSA9IGxpbmVbaSArIDFdO1xuICAgICAgICAgICAgICAgICAgICB2YXIgZCA9IHRoaXMuZGlzdGFuY2UocDAsIHAxKTtcbiAgICAgICAgICAgICAgICAgICAgc3VtICs9IGQ7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzdW0gPiBkaXN0KVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaW50ZXJwb2xhdGUocDAsIHAxLCAoZGlzdCAtIChzdW0gLSBkKSkgLyBkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgICAgICAgIHJldHVybiBsaW5lW2xpbmUubGVuZ3RoIC0gMV07XG4gICAgICAgICAgICB9LFxuICAgICAgICBcbiAgICAgICAgICAgIHBvaW50T25MaW5lOiBmdW5jdGlvbihsaW5lLCBwKSB7XG4gICAgICAgICAgICAgICAgdmFyIG1pbkRpc3QgPSBJbmZpbml0eTtcbiAgICAgICAgICAgICAgICB2YXIgbWluWCwgbWluWSwgbWluSSwgbWluVDtcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaW5lLmxlbmd0aCAtIDE7IGkrKykge1xuICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgdmFyIHggPSBsaW5lW2ldWzBdO1xuICAgICAgICAgICAgICAgICAgICB2YXIgeSA9IGxpbmVbaV1bMV07XG4gICAgICAgICAgICAgICAgICAgIHZhciBkeCA9IChsaW5lW2kgKyAxXVswXSAtIHgpICogdGhpcy5reDtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGR5ID0gKGxpbmVbaSArIDFdWzFdIC0geSkgKiB0aGlzLmt5O1xuICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgaWYgKGR4ICE9PSAwIHx8IGR5ICE9PSAwKSB7XG4gICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHQgPSAoKHBbMF0gLSB4KSAqIHRoaXMua3ggKiBkeCArIChwWzFdIC0geSkgKiB0aGlzLmt5ICogZHkpIC8gKGR4ICogZHggKyBkeSAqIGR5KTtcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodCA+IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB4ID0gbGluZVtpICsgMV1bMF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeSA9IGxpbmVbaSArIDFdWzFdO1xuICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB4ICs9IChkeCAvIHRoaXMua3gpICogdDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB5ICs9IChkeSAvIHRoaXMua3kpICogdDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgZHggPSAocFswXSAtIHgpICogdGhpcy5reDtcbiAgICAgICAgICAgICAgICAgICAgZHkgPSAocFsxXSAtIHkpICogdGhpcy5reTtcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIHZhciBzcURpc3QgPSBkeCAqIGR4ICsgZHkgKiBkeTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNxRGlzdCA8IG1pbkRpc3QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1pbkRpc3QgPSBzcURpc3Q7XG4gICAgICAgICAgICAgICAgICAgICAgICBtaW5YID0geDtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1pblkgPSB5O1xuICAgICAgICAgICAgICAgICAgICAgICAgbWluSSA9IGk7XG4gICAgICAgICAgICAgICAgICAgICAgICBtaW5UID0gdDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgcG9pbnQ6IFttaW5YLCBtaW5ZXSxcbiAgICAgICAgICAgICAgICAgICAgaW5kZXg6IG1pbkksXG4gICAgICAgICAgICAgICAgICAgIHQ6IG1pblRcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgXG4gICAgICAgICAgICBsaW5lU2xpY2U6IGZ1bmN0aW9uKHN0YXJ0LCBzdG9wLCBsaW5lKSB7XG4gICAgICAgICAgICAgICAgdmFyIHAxID0gdGhpcy5wb2ludE9uTGluZShsaW5lLCBzdGFydCk7XG4gICAgICAgICAgICAgICAgdmFyIHAyID0gdGhpcy5wb2ludE9uTGluZShsaW5lLCBzdG9wKTtcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKHAxLmluZGV4ID4gcDIuaW5kZXggfHwgKHAxLmluZGV4ID09PSBwMi5pbmRleCAmJiBwMS50ID4gcDIudCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRtcCA9IHAxO1xuICAgICAgICAgICAgICAgICAgICBwMSA9IHAyO1xuICAgICAgICAgICAgICAgICAgICBwMiA9IHRtcDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgICAgICAgIHZhciBzbGljZSA9IFtwMS5wb2ludF07XG4gICAgICAgIFxuICAgICAgICAgICAgICAgIHZhciBsID0gcDEuaW5kZXggKyAxO1xuICAgICAgICAgICAgICAgIHZhciByID0gcDIuaW5kZXg7XG4gICAgICAgIFxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5lcXVhbHMobGluZVtsXSwgc2xpY2VbMF0pICYmIGwgPD0gcilcbiAgICAgICAgICAgICAgICAgICAgc2xpY2UucHVzaChsaW5lW2xdKTtcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IGwgKyAxOyBpIDw9IHI7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBzbGljZS5wdXNoKGxpbmVbaV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmVxdWFscyhsaW5lW3JdLCBwMi5wb2ludCkpXG4gICAgICAgICAgICAgICAgICAgIHNsaWNlLnB1c2gocDIucG9pbnQpO1xuICAgICAgICBcbiAgICAgICAgICAgICAgICByZXR1cm4gc2xpY2U7XG4gICAgICAgICAgICB9LFxuICAgICAgICBcbiAgICAgICAgICAgIGxpbmVTbGljZUFsb25nOiBmdW5jdGlvbihzdGFydCwgc3RvcCwgbGluZSkge1xuICAgICAgICAgICAgICAgIHZhciBzdW0gPSAwO1xuICAgICAgICAgICAgICAgIHZhciBzbGljZSA9IFtdO1xuICAgICAgICBcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxpbmUubGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBwMCA9IGxpbmVbaV07XG4gICAgICAgICAgICAgICAgICAgIHZhciBwMSA9IGxpbmVbaSArIDFdO1xuICAgICAgICAgICAgICAgICAgICB2YXIgZCA9IHRoaXMuZGlzdGFuY2UocDAsIHAxKTtcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIHN1bSArPSBkO1xuICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN1bSA+IHN0YXJ0ICYmIHNsaWNlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2xpY2UucHVzaCh0aGlzLmludGVycG9sYXRlKHAwLCBwMSwgKHN0YXJ0IC0gKHN1bSAtIGQpKSAvIGQpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN1bSA+PSBzdG9wKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzbGljZS5wdXNoKHRoaXMuaW50ZXJwb2xhdGUocDAsIHAxLCAoc3RvcCAtIChzdW0gLSBkKSkgLyBkKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2xpY2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGlmIChzdW0gPiBzdGFydClcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWNlLnB1c2gocDEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNsaWNlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgXG4gICAgICAgICAgICBidWZmZXJQb2ludDogZnVuY3Rpb24ocCwgYnVmZmVyKSB7XG4gICAgICAgICAgICAgICAgdmFyIHYgPSBidWZmZXIgLyB0aGlzLmt5O1xuICAgICAgICAgICAgICAgIHZhciBoID0gYnVmZmVyIC8gdGhpcy5reDtcbiAgICAgICAgICAgICAgICByZXR1cm4gW3BbMF0gLSBoLCBwWzFdIC0gdiwgcFswXSArIGgsIHBbMV0gKyB2XTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIFxuICAgICAgICAgICAgYnVmZmVyQkJveDogZnVuY3Rpb24oYmJveCwgYnVmZmVyKSB7XG4gICAgICAgICAgICAgICAgdmFyIHYgPSBidWZmZXIgLyB0aGlzLmt5O1xuICAgICAgICAgICAgICAgIHZhciBoID0gYnVmZmVyIC8gdGhpcy5reDtcbiAgICAgICAgICAgICAgICByZXR1cm4gW2Jib3hbMF0gLSBoLCBiYm94WzFdIC0gdiwgYmJveFsyXSArIGgsIGJib3hbM10gKyB2XTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIFxuICAgICAgICAgICAgaW5zaWRlQkJveDogZnVuY3Rpb24ocCwgYmJveCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBwWzBdID49IGJib3hbMF0gJiYgcFswXSA8PSBiYm94WzJdICYmIHBbMV0gPj0gYmJveFsxXSAmJiBwWzFdIDw9IGJib3hbM107XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIFxuICAgICAgICByZXR1cm4gY2hlYXBydWxlcihsYXQsIHVuaXRzKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmaW5kQ2xvc2VzdFBvaW50ICh1bmlxdWVGZWF0dXJlcywgZXZ0Q29vcmRzLCByYWRpdXNJbkttLCBwaXhlbERpc3RhbmNlKSB7XG4gICAgICAgIGNvbnN0IGNvb3JkcyA9IGNhbGN1bGF0ZVBvaW50c09uTGluZSh1bmlxdWVGZWF0dXJlcywgZXZ0Q29vcmRzKTtcbiAgXG4gICAgICAgIGxldCBjbG9zZXN0VmVydGV4ID0gbnVsbDtcbiAgICAgICAgbGV0IGNsb3Nlc3RMaW5lcG9pbnQgPSBudWxsO1xuICAgICAgICBsZXQgYm9yZGVycztcbiAgICAgICAgbGV0IGlkID0gZ2VvZmxvLmlkIHx8ICdpZCc7XG4gIFxuICAgICAgICBjb29yZHMuZm9yRWFjaCgocG9pbnRUeXBlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBkaXN0ID0gcG9pbnRUeXBlLmRpc3Q7XG4gIFxuICAgICAgICAgICAgaWYgKGRpc3QgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBpZiAocG9pbnRUeXBlLnR5cGUgPT09IFwidmVydGV4XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNsb3Nlc3RWZXJ0ZXggPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsb3Nlc3RWZXJ0ZXggPSBwb2ludFR5cGU7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocGl4ZWxEaXN0YW5jZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGlzdCAqIDEwMDAgPCBwaXhlbERpc3RhbmNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNsb3Nlc3RWZXJ0ZXggJiYgY2xvc2VzdFZlcnRleC5saW5lRWRnZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbG9zZXN0VmVydGV4ID0gcG9pbnRUeXBlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkaXN0IDw9IGNsb3Nlc3RWZXJ0ZXguZGlzdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRpc3QgPT09IGNsb3Nlc3RWZXJ0ZXguZGlzdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjbG9zZXN0VmVydGV4LmxpbmVFZGdlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsb3Nlc3RWZXJ0ZXggPSBwb2ludFR5cGU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbG9zZXN0VmVydGV4ID0gcG9pbnRUeXBlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkaXN0IDwgcmFkaXVzSW5LbSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2xvc2VzdExpbmVwb2ludCAhPT0gbnVsbCAmJiBkaXN0ID09PSBjbG9zZXN0TGluZXBvaW50LmRpc3QgJiYgY2xvc2VzdExpbmVwb2ludFtpZF0gIT09IHBvaW50VHlwZVtpZF0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjbG9zZXN0TGluZXBvaW50LnR5cGUgPT09IFwibGluZXBvaW50XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoKHBvaW50VHlwZS5kaXN0YW5jZTEgPD0gY2xvc2VzdExpbmVwb2ludC5kaXN0YW5jZTEgJiYgcG9pbnRUeXBlLmRpc3RhbmNlMiA8PSBjbG9zZXN0TGluZXBvaW50LmRpc3RhbmNlMikgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHBvaW50VHlwZS5kaXN0YW5jZTIgPD0gY2xvc2VzdExpbmVwb2ludC5kaXN0YW5jZTEgJiYgcG9pbnRUeXBlLmRpc3RhbmNlMSA8PSBjbG9zZXN0TGluZXBvaW50LmRpc3RhbmNlMikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJzd2l0Y2ggY2xvc2VzdCBwb2ludHNcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsb3Nlc3RMaW5lcG9pbnQgPSBwb2ludFR5cGU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gIFxuICAgICAgICAgICAgICAgICAgICBpZiAoY2xvc2VzdExpbmVwb2ludCA9PT0gbnVsbCB8fCBkaXN0IDwgY2xvc2VzdExpbmVwb2ludC5kaXN0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbG9zZXN0TGluZXBvaW50ID0gcG9pbnRUeXBlO1xuICBcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwb2ludFR5cGUuYm9yZGVyMSAmJiBwb2ludFR5cGUuYm9yZGVyMikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlcnMgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlcjE6IHBvaW50VHlwZS5ib3JkZXIxLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3JkZXIyOiBwb2ludFR5cGUuYm9yZGVyMixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzdGFuY2UxOiBwb2ludFR5cGUuZGlzdGFuY2UxLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXN0YW5jZTI6IHBvaW50VHlwZS5kaXN0YW5jZTJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3JkZXJzID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gIFxuICAgICAgICBpZiAoY2xvc2VzdFZlcnRleCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgaWYgKGNsb3Nlc3RMaW5lcG9pbnQgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBpZiAoY2xvc2VzdFZlcnRleC5kaXN0IDwgcmFkaXVzSW5LbSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7IGJvcmRlcnM6IG51bGwgfSwgY2xvc2VzdFZlcnRleCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oeyBib3JkZXJzOiBib3JkZXJzIH0sIGNsb3Nlc3RMaW5lcG9pbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oeyBib3JkZXJzOiBudWxsIH0sIGNsb3Nlc3RWZXJ0ZXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKGNsb3Nlc3RMaW5lcG9pbnQgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHsgYm9yZGVyczogYm9yZGVycyB9LCBjbG9zZXN0TGluZXBvaW50KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2xvc2VzdFBvaW50cyAocnVsZXIsIGNvb3JkaW5hdGVzLCBldnRDb29yZHMpIHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gW107XG4gICAgICAgIGNvbnN0IHBvaW50T25MaW5lID0gcnVsZXIucG9pbnRPbkxpbmUoY29vcmRpbmF0ZXMsIGV2dENvb3Jkcyk7XG4gICAgICAgIGNvbnN0IHBvaW50Q29vcmRzID0gcG9pbnRPbkxpbmUucG9pbnQ7XG4gICAgICAgIGNvbnN0IHBvaW50SW5kZXggPSBwb2ludE9uTGluZS5pbmRleDtcbiAgICAgICAgY29uc3QgbGluZVBvaW50ID0geyB0eXBlOiBcImxpbmVwb2ludFwiLCBjb29yZHM6IHBvaW50Q29vcmRzIH07XG4gICAgICAgIGNvbnN0IHAxID0gY29vcmRpbmF0ZXNbcG9pbnRJbmRleF07XG4gICAgICAgIGNvbnN0IHAyID0gY29vcmRpbmF0ZXNbcG9pbnRJbmRleCArIDFdO1xuICAgICAgICBjb25zdCBkaXN0YW5jZTEgPSBydWxlci5kaXN0YW5jZShwMSwgZXZ0Q29vcmRzKTtcbiAgICAgICAgY29uc3QgZGlzdGFuY2UyID0gcnVsZXIuZGlzdGFuY2UocDIsIGV2dENvb3Jkcyk7XG5cbiAgICAgICAgbGV0IGxpbmVFZGdlID0gZmFsc2U7XG4gICAgICAgIGxldCB2ZXJ0ZXggPSBudWxsO1xuICAgIFxuICAgICAgICBpZiAoZGlzdGFuY2UxIDwgZGlzdGFuY2UyKSB7XG4gICAgICAgICAgICBsaW5lRWRnZSA9IHBvaW50SW5kZXggPT09IDA7XG4gICAgICAgICAgICB2ZXJ0ZXggPSBwMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxpbmVFZGdlID0gcG9pbnRJbmRleCArIDEgPT09IGNvb3JkaW5hdGVzLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICB2ZXJ0ZXggPSBwMjtcbiAgICAgICAgfVxuICAgIFxuICAgICAgICBsaW5lUG9pbnQuYm9yZGVyMSA9IHAxO1xuICAgICAgICBsaW5lUG9pbnQuZGlzdGFuY2UxID0gZGlzdGFuY2UxO1xuICAgICAgICBsaW5lUG9pbnQuYm9yZGVyMiA9IHAyO1xuICAgICAgICBsaW5lUG9pbnQuZGlzdGFuY2UyID0gZGlzdGFuY2UyO1xuICAgIFxuICAgICAgICByZXN1bHQucHVzaChsaW5lUG9pbnQpO1xuICAgICAgICByZXN1bHQucHVzaCh7IHR5cGU6IFwidmVydGV4XCIsIGNvb3JkczogdmVydGV4LCBsaW5lRWRnZTogbGluZUVkZ2UgfSk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2FsY3VsYXRlUG9pbnRzT25MaW5lICh1bmlxdWVGZWF0dXJlcywgZXZ0Q29vcmRzKSB7XG4gICAgICAgIGNvbnN0IGNvb3JkcyA9IFtdO1xuICAgICAgICBjb25zdCBrbm93bklkcyA9IHt9O1xuICAgICAgICBjb25zdCBydWxlciA9IGNoZWFwUnVsZXIoZXZ0Q29vcmRzWzFdKTtcbiAgICBcbiAgICAgICAgdW5pcXVlRmVhdHVyZXMuZm9yRWFjaCgoZmVhdHVyZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgaWQgPSBmZWF0dXJlLmlkIHx8IGZlYXR1cmUucHJvcGVydGllcy5pZDtcbiAgICAgICAgICAgIHZhciBjbG9zZXN0ID0gW107XG4gICAgXG4gICAgICAgICAgICBpZiAoa25vd25JZHNbaWRdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBrbm93bklkc1tpZF0gPSB0cnVlO1xuICAgICAgICAgICAgICAgIGNvbnN0IHR5cGUgPSBmZWF0dXJlLmdlb21ldHJ5LnR5cGU7XG4gICAgXG4gICAgICAgICAgICAgICAgaWYgKHR5cGUgPT09IFwiTGluZVN0cmluZ1wiKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChmZWF0dXJlLmdlb21ldHJ5LmNvb3JkaW5hdGVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbG9zZXN0ID0gY2xvc2VzdFBvaW50cyhydWxlciwgZmVhdHVyZS5nZW9tZXRyeS5jb29yZGluYXRlcywgZXZ0Q29vcmRzKTtcbiAgXG4gICAgICAgICAgICAgICAgICAgICAgICBjbG9zZXN0LmZvckVhY2goKHBvaW50VHlwZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvaW50VHlwZS5pZCA9IGlkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvaW50VHlwZS5kaXN0ID0gcnVsZXIuZGlzdGFuY2UocG9pbnRUeXBlLmNvb3JkcywgZXZ0Q29vcmRzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb29yZHMucHVzaChwb2ludFR5cGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIm5vIGNvb3JkaW5hdGVzOiBcIiwgZmVhdHVyZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT09IFwiUG9pbnRcIikge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBwb2ludFR5cGUgPSB7IGlkOiBpZCwgdHlwZTogXCJ2ZXJ0ZXhcIiwgY29vcmRzOiBmZWF0dXJlLmdlb21ldHJ5LmNvb3JkaW5hdGVzLCBsaW5lRWRnZTogdHJ1ZSB9O1xuICAgICAgICAgICAgICAgICAgICBwb2ludFR5cGUuZGlzdCA9IHJ1bGVyLmRpc3RhbmNlKHBvaW50VHlwZS5jb29yZHMsIGV2dENvb3Jkcyk7XG4gICAgICAgICAgICAgICAgICAgIGNvb3Jkcy5wdXNoKHBvaW50VHlwZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlID09PSBcIlBvbHlnb25cIikge1xuICAgICAgICAgICAgICAgICAgICBpZiAodHVyZi5ib29sZWFuV2l0aGluKHR1cmYucG9pbnQoZXZ0Q29vcmRzKSwgZmVhdHVyZSkpIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGZlYXR1cmUuZ2VvbWV0cnkuY29vcmRpbmF0ZXMuZm9yRWFjaCgoZmVhdHVyZUNvb3JkcywgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsb3Nlc3QgPSBjbG9zZXN0UG9pbnRzKHJ1bGVyLCBmZWF0dXJlQ29vcmRzLCBldnRDb29yZHMpO1xuICBcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsb3Nlc3QuZm9yRWFjaCgocG9pbnRUeXBlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9pbnRUeXBlLmlkID0gaWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9pbnRUeXBlLnBvbHlnb25Db29yZHNBcnJheSA9IGluZGV4O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvaW50VHlwZS5kaXN0ID0gcnVsZXIuZGlzdGFuY2UocG9pbnRUeXBlLmNvb3JkcywgZXZ0Q29vcmRzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb29yZHMucHVzaChwb2ludFR5cGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgXG4gICAgICAgIHJldHVybiBjb29yZHM7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWRkVmVydGV4IChzdGFydFBvaW50LCBlbmRQb2ludCwgbGVuZ3RoLCBkYXRhKSB7XG4gICAgICAgIHZhciBzdGFydERhdGEgPSBkYXRhW3N0YXJ0UG9pbnRdO1xuICAgIFxuICAgICAgICBpZiAoIXN0YXJ0RGF0YSkge1xuICAgICAgICAgICAgc3RhcnREYXRhID0ge307XG4gICAgICAgICAgICBkYXRhW3N0YXJ0UG9pbnRdID0gc3RhcnREYXRhO1xuICAgICAgICB9XG4gICAgXG4gICAgICAgIGlmICghc3RhcnREYXRhW2VuZFBvaW50XSkge1xuICAgICAgICAgICAgc3RhcnREYXRhW2VuZFBvaW50XSA9IGxlbmd0aDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFkZFZlcnRleFBvaW50VHdvV2F5IChzdGFydENvb3JkLCBlbmRDb29yZHMsIGxlbmd0aCwgZGF0YSkge1xuICAgICAgICB2YXIgc3RhcnRQb2ludCA9IHN0YXJ0Q29vcmQuam9pbihcIiNcIik7XG4gICAgICAgIHZhciBlbmRQb2ludCA9IGVuZENvb3Jkcy5qb2luKFwiI1wiKTtcbiAgICAgICAgYWRkVmVydGV4KHN0YXJ0UG9pbnQsIGVuZFBvaW50LCBsZW5ndGgsIGRhdGEpO1xuICAgICAgICBhZGRWZXJ0ZXgoZW5kUG9pbnQsIHN0YXJ0UG9pbnQsIGxlbmd0aCwgZGF0YSk7XG4gICAgfVxuICAgIFxuICAgIGZ1bmN0aW9uIG1ldGVyc1BlclBpeGVsIChsYXRpdHVkZSwgem9vbUxldmVsKSB7XG4gICAgICAgIHJldHVybiAoKGdlb2Zsby5zdGF0aWNzLmNvbnN0YW50cy5DSVJDVU0gKiBNYXRoLmNvcygobGF0aXR1ZGUgKiAoTWF0aC5QSSAvIDE4MCkpKSkgLyBNYXRoLnBvdygyLCB6b29tTGV2ZWwgKyA4KSk7XG4gICAgfVxuICAgIFxuICAgIGZ1bmN0aW9uIHNldEZlYXR1cmUgKGZlYXR1cmUpIHtcbiAgICAgICAgaWYgKCFmZWF0dXJlKSByZXR1cm4gZ2VvZmxvLm1hcC5nZXRTb3VyY2UoZ2VvZmxvLnN0YXRpY3MuY29uc3RhbnRzLnNvdXJjZXMuU05BUCkuc2V0RGF0YSh0dXJmLmZlYXR1cmVDb2xsZWN0aW9uKFtdKSksIGdlb2Zsby5zbmFwRmVhdHVyZTtcbiAgICAgICAgZ2VvZmxvLlV0aWxpdGllcy5zZXRQcm9wZXJ0eShmZWF0dXJlLCAndHlwZScsIGdlb2Zsby5jdXJyZW50TW9kZS50eXBlKTtcbiAgICAgICAgZ2VvZmxvLm1hcC5nZXRTb3VyY2UoZ2VvZmxvLnN0YXRpY3MuY29uc3RhbnRzLnNvdXJjZXMuU05BUCkuc2V0RGF0YSh0dXJmLmZlYXR1cmVDb2xsZWN0aW9uKFtmZWF0dXJlXSkpO1xuICAgICAgICByZXR1cm4gZmVhdHVyZTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVWZXJ0ZXggKHZlcnRleCwgb3B0aW9ucz17fSkge1xuICAgICAgICB2YXIgZmVhdHVyZXMgPSBnZW9mbG8ubWFwLmdldFNvdXJjZShnZW9mbG8uc3RhdGljcy5jb25zdGFudHMuc291cmNlcy5IT1RURVhUKS5fZGF0YS5mZWF0dXJlcztcbiAgICAgICAgaWYgKGZlYXR1cmVzLmxlbmd0aCAmJiBmZWF0dXJlc1tmZWF0dXJlcy5sZW5ndGggLSAxXS5wcm9wZXJ0aWVzLm1vdXNlTGluZSkgZmVhdHVyZXMucG9wKCk7XG5cbiAgICAgICAgdmVydGV4LnByb3BlcnRpZXMudW5pdHMgPSBvcHRpb25zLnVuaXRzO1xuICAgICAgICB2ZXJ0ZXgucHJvcGVydGllcy51bml0ID0gb3B0aW9ucy51bml0O1xuICAgICAgICB2ZXJ0ZXgucHJvcGVydGllcy50ZXh0ID0gYCR7b3B0aW9ucy51bml0c30gJHtvcHRpb25zLnVuaXR9YDtcbiAgICAgICAgdmVydGV4LnByb3BlcnRpZXMudHJhbnNmb3JtID0gJ3VwcGVyY2FzZSc7XG4gICAgICAgIHZlcnRleC5wcm9wZXJ0aWVzLmFuY2hvciA9ICd0b3AtbGVmdCc7XG4gICAgICAgIHZlcnRleC5wcm9wZXJ0aWVzLm1vdXNlTGluZSA9IHRydWU7XG4gICAgXG4gICAgICAgIGZlYXR1cmVzLnB1c2godmVydGV4KTtcbiAgICAgICAgZ2VvZmxvLm1hcC5nZXRTb3VyY2UoZ2VvZmxvLnN0YXRpY3MuY29uc3RhbnRzLnNvdXJjZXMuSE9UVEVYVCkuc2V0RGF0YSh0dXJmLmZlYXR1cmVDb2xsZWN0aW9uKGZlYXR1cmVzKSk7XG4gICAgICAgIHJldHVybiB2ZXJ0ZXg7XG4gICAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgU25hcHBpbmc7Il0sIm5hbWVzIjpbIlNuYXBwaW5nIiwibW9kZSIsImdlb2ZsbyIsInR5cGUiLCJhY3RpdmF0ZSIsImVuYWJsZWQiLCJvcHRpb25zIiwiZW5hYmxlIiwiZGVhY3RpdmF0ZSIsInVwZGF0ZU1lc2hEYXRhIiwiZ2V0Q2xvc2VzdCIsImNvb3JkcyIsImZlYXR1cmVzIiwiY2FsY3VsYXRlZFJhZGl1cyIsInNuYXBwaW5nIiwiZGlzdGFuY2UiLCJNYXRoIiwicG93IiwibWF4IiwibWFwIiwiZ2V0Wm9vbSIsInJhZGl1c0luS20iLCJwaXhlbERpc3RhbmNlIiwicGl4ZWxzIiwibWV0ZXJzUGVyUGl4ZWwiLCJnZXRSZW5kZXJlZFNuYXBGZWF0dXJlcyIsImxuZyIsImxhdCIsImhvdEZlYXR1cmUiLCJjbG9zZXN0UG9pbnQiLCJmaW5kQ2xvc2VzdFBvaW50IiwiZGlzdCIsInBvaW50Iiwic2V0Q2xvc2VzdCIsImlzUG9pbnQiLCJpc1ZlcnRleCIsInNuYXBGZWF0dXJlIiwiZmlsdGVyIiwicGluYWJsZUZlYXR1cmVzIiwibGVuZ3RoIiwiY29uY2F0IiwiX3RvQ29uc3VtYWJsZUFycmF5IiwiZSIsImlkIiwicHJvcGVydGllcyIsIm5lYXJGZWF0dXJlcyIsImdldFJlbmRlcmVkRmVhdHVyZXMiLCJsYXN0Q2xpY2tEaXN0YW5jZSIsImxhc3RDbGlja0FycmF5IiwibGFzdENsaWNrRXF1YWwiLCJ1cGRhdGVGZWF0dXJlIiwibGFzdENsaWNrIiwidHVyZiIsIkFycmF5IiwiaXNBcnJheSIsIlV0aWxpdGllcyIsImlzUG9pbnRFcXVhbCIsInRvbGVyYW5jZSIsImxpbmVTdHJpbmciLCJmaXJlIiwiY2xvc2VzdCIsInNuYXBwZWQiLCJzZXRGZWF0dXJlIiwiZmVhdHVyZSIsInRvdWNoQ2xpY2siLCJnZXRTb3VyY2UiLCJzdGF0aWNzIiwiY29uc3RhbnRzIiwic291cmNlcyIsIlNOQVAiLCJzZXREYXRhIiwiZmVhdHVyZUNvbGxlY3Rpb24iLCJzbmFwQ29vcmRzIiwiZ2VvbWV0cnkiLCJjb29yZGluYXRlcyIsImZpcnN0Q2xpY2siLCJpc1BvbHlnb24iLCJpc1BvbHlsaW5lIiwiaG90Q29vcmRzIiwicG9wIiwic3BsaWNlIiwiYXBwbHkiLCJjb25zdW1hYmxlQXJyYXkiLCJzZXRQcm9wZXJ0eSIsInNldFZlcnRleCIsInNuYXBUb0ZlYXR1cmUiLCJieXBhc3NTbmFwcGluZyIsImNhbGN1bGF0ZVJvdXRlIiwiUm91dGluZyIsImJ5cGFzc1JvdXRpbmciLCJzbmFwcGVkVmVydGV4IiwiY3VycmVudE1vZGUiLCJkcmFnSW5kZXgiLCJIT1QiLCJ2ZXJ0ZXgiLCJhZGRGZWF0dXJlIiwiYXJndW1lbnRzIiwidW5kZWZpbmVkIiwiZG9udEFkZCIsImFzc2lnbkRlZXAiLCJjbG9uZURlZXAiLCJyb3V0aW5nIiwiZXZ0Q29vcmRzIiwibW91c2VJc0Rvd24iLCJGZWF0dXJlcyIsImdldFR5cGUiLCJnZXRMYXN0SW5kZXhDb29yZHMiLCJoaW50Q29vcmRzIiwiaGludCIsInVuaXQiLCJ1bml0cyIsImNvbnZlcnRVbml0cyIsInVwZGF0ZVZlcnRleCIsImNoZWFwUnVsZXIiLCJjaGVhcHJ1bGVyIiwiQ2hlYXBSdWxlciIsImZyb21UaWxlIiwieSIsInoiLCJuIiwiUEkiLCJhdGFuIiwiZXhwIiwia2lsb21ldGVycyIsIm1pbGVzIiwibmF1dGljYWxtaWxlcyIsIm1ldGVycyIsIm1ldHJlcyIsInlhcmRzIiwiZmVldCIsImluY2hlcyIsImZhY3RvcnMiLCJFcnJvciIsIk9iamVjdCIsImtleXMiLCJtIiwiY29zIiwiY29zMiIsImNvczMiLCJjb3M0IiwiY29zNSIsImt4Iiwia3kiLCJwcm90b3R5cGUiLCJlcXVhbHMiLCJhIiwiYiIsImludGVycG9sYXRlIiwidCIsImR4IiwiZHkiLCJzcXJ0IiwiYmVhcmluZyIsImF0YW4yIiwiZGVzdGluYXRpb24iLCJwIiwib2Zmc2V0Iiwic2luIiwibGluZURpc3RhbmNlIiwicG9pbnRzIiwidG90YWwiLCJpIiwiYXJlYSIsInBvbHlnb24iLCJzdW0iLCJyaW5nIiwiaiIsImxlbiIsImsiLCJhYnMiLCJhbG9uZyIsImxpbmUiLCJwMCIsInAxIiwiZCIsInBvaW50T25MaW5lIiwibWluRGlzdCIsIkluZmluaXR5IiwibWluWCIsIm1pblkiLCJtaW5JIiwibWluVCIsIngiLCJzcURpc3QiLCJpbmRleCIsImxpbmVTbGljZSIsInN0YXJ0Iiwic3RvcCIsInAyIiwidG1wIiwic2xpY2UiLCJsIiwiciIsInB1c2giLCJsaW5lU2xpY2VBbG9uZyIsImJ1ZmZlclBvaW50IiwiYnVmZmVyIiwidiIsImgiLCJidWZmZXJCQm94IiwiYmJveCIsImluc2lkZUJCb3giLCJ1bmlxdWVGZWF0dXJlcyIsImNhbGN1bGF0ZVBvaW50c09uTGluZSIsImNsb3Nlc3RWZXJ0ZXgiLCJjbG9zZXN0TGluZXBvaW50IiwiYm9yZGVycyIsImZvckVhY2giLCJwb2ludFR5cGUiLCJsaW5lRWRnZSIsImRpc3RhbmNlMSIsImRpc3RhbmNlMiIsImNvbnNvbGUiLCJsb2ciLCJib3JkZXIxIiwiYm9yZGVyMiIsImFzc2lnbiIsImNsb3Nlc3RQb2ludHMiLCJydWxlciIsInJlc3VsdCIsInBvaW50Q29vcmRzIiwicG9pbnRJbmRleCIsImxpbmVQb2ludCIsImtub3duSWRzIiwiYm9vbGVhbldpdGhpbiIsImZlYXR1cmVDb29yZHMiLCJwb2x5Z29uQ29vcmRzQXJyYXkiLCJhZGRWZXJ0ZXgiLCJzdGFydFBvaW50IiwiZW5kUG9pbnQiLCJkYXRhIiwic3RhcnREYXRhIiwiYWRkVmVydGV4UG9pbnRUd29XYXkiLCJzdGFydENvb3JkIiwiZW5kQ29vcmRzIiwiam9pbiIsImxhdGl0dWRlIiwiem9vbUxldmVsIiwiQ0lSQ1VNIiwiSE9UVEVYVCIsIl9kYXRhIiwibW91c2VMaW5lIiwidGV4dCIsInRyYW5zZm9ybSIsImFuY2hvciJdLCJzb3VyY2VSb290IjoiIn0=