/**
 * @mixin
 * @memberof module:geoflo
 * @name Snapping
 * @description This module provides the snapping functionality for the Geoflo application. It allows users to snap features to the map by creating a buffer around the feature and snapping to nearby features.
 * @param {Object} mode - The mode object containing the type of mode.
 * @returns {Object} Returns the Snapping object.
 */
const Snapping = function (mode) {
    const geoflo = this.geoflo;
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
    }

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
    }


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
        
        features = features ? geoflo.getRenderedSnapFeatures({ lng: coords[0], lat: coords[1] }, radiusInKm) : [geoflo.hotFeature];

        var closestPoint = findClosestPoint(features, coords, radiusInKm, pixelDistance);

        var coords = !closestPoint ? false :
            pixelDistance ? closestPoint.coords :
            closestPoint.type === 'vertex' && closestPoint.dist <= radiusInKm ? closestPoint.coords :
            false;
        
        return {
            point: closestPoint,
            coords: coords
        };
    }

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
        if (!coords || isNaN(coords[0]) || isNaN(coords[1])) return false;

        var snapFeature = null;
        var calculatedRadius = geoflo.options.snapping.distance * Math.pow(2, Math.max(1, 19 - geoflo.map.getZoom()));
        var radiusInKm = calculatedRadius / 100000;
        var pixelDistance = geoflo.options.snapping.pixels ? geoflo.options.snapping.pixels * metersPerPixel(coords[1], geoflo.map.getZoom()) : false;
        var filter = false;

        if (geoflo.Pinning && geoflo.Pinning.pinnedFeatures.length) {
            filter = ['case', ['any', ...geoflo.Pinning.pinnedFeatures.map(e => ["==", ["get", "id"], e.id || e.properties.id])], false, true];
        }

        var nearFeatures = geoflo.getRenderedFeatures({ lng: coords[0], lat: coords[1] }, radiusInKm, filter);
        var closestPoint = nearFeatures && nearFeatures.length ? findClosestPoint(nearFeatures, coords, radiusInKm, pixelDistance) : false;
        var lastClickDistance, lastClickArray, lastClickEqual;

        geoflo.closestPoint = closestPoint;

        if ((!nearFeatures && !isPoint) || (!closestPoint && !isPoint)) return this.updateFeature(coords);
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

        geoflo.fire('snapping.add', { closest: closestPoint, snapped: snapFeature });
        return snapFeature;
    }


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
    }

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

        if (!snapToFeature) return false;

        const coords = geoflo.snappedVertex;
        if (!coords || isNaN(coords[0]) || isNaN(coords[1])) return false;

        geoflo.snapFeature = this.setClosest(coords, true, true);

        if (calculateRoute) geoflo.snapFeature = geoflo.Routing.getClosest() || geoflo.snapFeature;
        if (!geoflo.snapFeature) return geoflo.map.getSource(geoflo.statics.constants.sources.SNAP).setData(turf.featureCollection([]));

        geoflo.Utilities.setProperty(geoflo.snapFeature, 'type', geoflo.currentMode.type);
        geoflo.map.getSource(geoflo.statics.constants.sources[calculateRoute ? 'ROUTE' : 'SNAP']).setData(turf.featureCollection([geoflo.snapFeature]));

        geoflo.hotFeature.geometry.coordinates[geoflo.dragIndex] = geoflo.snapFeature.geometry.coordinates;
        geoflo.map.getSource(geoflo.statics.constants.sources.HOT).setData(turf.featureCollection([geoflo.hotFeature]));
        geoflo.fire('vertex.dragsnap', { feature: geoflo.hotFeature, vertex: turf.point(coords) });
    }


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
    this.addFeature = function (feature, properties={}, dontAdd) {
        geoflo.map.getSource(geoflo.statics.constants.sources['SNAP']).setData(turf.featureCollection([]));
        geoflo.map.getSource(geoflo.statics.constants.sources['ROUTE']).setData(turf.featureCollection([]));
        if (!feature || dontAdd) return false;
        if (properties) feature.properties = geoflo.Utilities.assignDeep(geoflo.Utilities.cloneDeep(properties), feature.properties);
        geoflo.snapFeature = feature;
        geoflo.map.getSource(geoflo.statics.constants.sources[feature.properties.routing ? 'ROUTE' : 'SNAP']).setData(turf.featureCollection([geoflo.snapFeature]));
    }

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
        if (geoflo.hotFeature && geoflo.hotFeature.geometry.type === 'Point') return null;

        var coords = geoflo.hotFeature ? geoflo.Utilities.getLastIndexCoords(geoflo.hotFeature) : geoflo.lastClick.coords;
        var vertex = turf.point(evtCoords);
        var hintCoords = type && type === "Polygon" && geoflo.hotFeature ? [coords, evtCoords, geoflo.firstClick.coords] : [coords, evtCoords];
        var feature = turf.lineString(hintCoords);

        feature.properties.type = type;
        feature.properties.hint = true;
        
        var unit = 'feet';
        var units = geoflo.Features.convertUnits(geoflo.hotFeature, 0, unit);
        units += geoflo.Features.convertUnits(feature, 0, unit);
        vertex = updateVertex(vertex, { units: units, unit: unit });

        return feature;
    }




    if (geoflo.options['snapping'].enable) this.activate();




    function cheapRuler (lat, units) {
        function cheapruler(lat, units) {
            return new CheapRuler(lat,units);
        }
        
        cheapruler.fromTile = function(y, z, units) {
            var n = Math.PI * (1 - 2 * (y + 0.5) / Math.pow(2, z));
            var lat = Math.atan(0.5 * (Math.exp(n) - Math.exp(-n))) * 180 / Math.PI;
            return new CheapRuler(lat,units);
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
            }
        
            if (lat === undefined)
                throw new Error('No latitude given.');
            if (units && !factors[units])
                throw new Error('Unknown unit ' + units + '. Use one of: ' + Object.keys(factors));
        
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
            equals: function (a, b) {
                return a[0] === b[0] && a[1] === b[1];
            },
      
            interpolate: function (a, b, t) {
                var dx = b[0] - a[0];
                var dy = b[1] - a[1];
                return [a[0] + dx * t, a[1] + dy * t];
            },
      
            distance: function(a, b) {
                var dx = (a[0] - b[0]) * this.kx;
                var dy = (a[1] - b[1]) * this.ky;
                return Math.sqrt(dx * dx + dy * dy);
            },
        
            bearing: function(a, b) {
                var dx = (b[0] - a[0]) * this.kx;
                var dy = (b[1] - a[1]) * this.ky;
                if (!dx && !dy)
                    return 0;
                var bearing = Math.atan2(-dy, dx) * 180 / Math.PI + 90;
                if (bearing > 180)
                    bearing -= 360;
                return bearing;
            },
        
            destination: function(p, dist, bearing) {
                var a = (90 - bearing) * Math.PI / 180;
                return this.offset(p, Math.cos(a) * dist, Math.sin(a) * dist);
            },
        
            offset: function(p, dx, dy) {
                return [p[0] + dx / this.kx, p[1] + dy / this.ky];
            },
        
            lineDistance: function(points) {
                var total = 0;
                for (var i = 0; i < points.length - 1; i++) {
                    total += this.distance(points[i], points[i + 1]);
                }
                return total;
            },
        
            area: function(polygon) {
                var sum = 0;
        
                for (var i = 0; i < polygon.length; i++) {
                    var ring = polygon[i];
        
                    for (var j = 0, len = ring.length, k = len - 1; j < len; k = j++) {
                        sum += (ring[j][0] - ring[k][0]) * (ring[j][1] + ring[k][1]) * (i ? -1 : 1);
                    }
                }
        
                return (Math.abs(sum) / 2) * this.kx * this.ky;
            },
        
            along: function(line, dist) {
                var sum = 0;
        
                if (dist <= 0)
                    return line[0];
        
                for (var i = 0; i < line.length - 1; i++) {
                    var p0 = line[i];
                    var p1 = line[i + 1];
                    var d = this.distance(p0, p1);
                    sum += d;
                    if (sum > dist)
                        return this.interpolate(p0, p1, (dist - (sum - d)) / d);
                }
        
                return line[line.length - 1];
            },
        
            pointOnLine: function(line, p) {
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
                            x += (dx / this.kx) * t;
                            y += (dy / this.ky) * t;
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
        
            lineSlice: function(start, stop, line) {
                var p1 = this.pointOnLine(line, start);
                var p2 = this.pointOnLine(line, stop);
        
                if (p1.index > p2.index || (p1.index === p2.index && p1.t > p2.t)) {
                    var tmp = p1;
                    p1 = p2;
                    p2 = tmp;
                }
        
                var slice = [p1.point];
        
                var l = p1.index + 1;
                var r = p2.index;
        
                if (!this.equals(line[l], slice[0]) && l <= r)
                    slice.push(line[l]);
        
                for (var i = l + 1; i <= r; i++) {
                    slice.push(line[i]);
                }
        
                if (!this.equals(line[r], p2.point))
                    slice.push(p2.point);
        
                return slice;
            },
        
            lineSliceAlong: function(start, stop, line) {
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
        
                    if (sum > start)
                        slice.push(p1);
                }
        
                return slice;
            },
        
            bufferPoint: function(p, buffer) {
                var v = buffer / this.ky;
                var h = buffer / this.kx;
                return [p[0] - h, p[1] - v, p[0] + h, p[1] + v];
            },
        
            bufferBBox: function(bbox, buffer) {
                var v = buffer / this.ky;
                var h = buffer / this.kx;
                return [bbox[0] - h, bbox[1] - v, bbox[2] + h, bbox[3] + v];
            },
        
            insideBBox: function(p, bbox) {
                return p[0] >= bbox[0] && p[0] <= bbox[2] && p[1] >= bbox[1] && p[1] <= bbox[3];
            }
        }
      
        return cheapruler(lat, units);
    }

    function findClosestPoint (uniqueFeatures, evtCoords, radiusInKm, pixelDistance) {
        const coords = calculatePointsOnLine(uniqueFeatures, evtCoords);
  
        let closestVertex = null;
        let closestLinepoint = null;
        let borders;
        let id = geoflo.id || 'id';
  
        coords.forEach((pointType) => {
            const dist = pointType.dist;
  
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
                            if ((pointType.distance1 <= closestLinepoint.distance1 && pointType.distance2 <= closestLinepoint.distance2) ||
                                (pointType.distance2 <= closestLinepoint.distance1 && pointType.distance1 <= closestLinepoint.distance2)) {
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
                    return Object.assign({ borders: null }, closestVertex);
                } else {
                    return Object.assign({ borders: borders }, closestLinepoint);
                }
            } else {
                return Object.assign({ borders: null }, closestVertex);
            }
        } else if (closestLinepoint !== null) {
            return Object.assign({ borders: borders }, closestLinepoint);
        } else {
            return null;
        }
    }

    function closestPoints (ruler, coordinates, evtCoords) {
        const result = [];
        const pointOnLine = ruler.pointOnLine(coordinates, evtCoords);
        const pointCoords = pointOnLine.point;
        const pointIndex = pointOnLine.index;
        const linePoint = { type: "linepoint", coords: pointCoords };
        const p1 = coordinates[pointIndex];
        const p2 = coordinates[pointIndex + 1];
        const distance1 = ruler.distance(p1, evtCoords);
        const distance2 = ruler.distance(p2, evtCoords);

        let lineEdge = false;
        let vertex = null;
    
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
        result.push({ type: "vertex", coords: vertex, lineEdge: lineEdge });
        return result;
    }

    function calculatePointsOnLine (uniqueFeatures, evtCoords) {
        const coords = [];
        const knownIds = {};
        const ruler = cheapRuler(evtCoords[1]);
    
        uniqueFeatures.forEach((feature) => {
            const id = feature.id || feature.properties.id;
            var closest = [];
    
            if (knownIds[id] === undefined) {
                knownIds[id] = true;
                const type = feature.geometry.type;
    
                if (type === "LineString") {
                    if (feature.geometry.coordinates) {
                        closest = closestPoints(ruler, feature.geometry.coordinates, evtCoords);
  
                        closest.forEach((pointType) => {
                            pointType.id = id;
                            pointType.dist = ruler.distance(pointType.coords, evtCoords);
                            coords.push(pointType);
                        });
                    } else {
                        console.log("no coordinates: ", feature);
                    }
                } else if (type === "Point") {
                    const pointType = { id: id, type: "vertex", coords: feature.geometry.coordinates, lineEdge: true };
                    pointType.dist = ruler.distance(pointType.coords, evtCoords);
                    coords.push(pointType);
                } else if (type === "Polygon") {
                    if (turf.booleanWithin(turf.point(evtCoords), feature)) return;
                    
                    feature.geometry.coordinates.forEach((featureCoords, index) => {
                        closest = closestPoints(ruler, featureCoords, evtCoords);
  
                        closest.forEach((pointType) => {
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

    function addVertex (startPoint, endPoint, length, data) {
        var startData = data[startPoint];
    
        if (!startData) {
            startData = {};
            data[startPoint] = startData;
        }
    
        if (!startData[endPoint]) {
            startData[endPoint] = length;
        }
    }

    function addVertexPointTwoWay (startCoord, endCoords, length, data) {
        var startPoint = startCoord.join("#");
        var endPoint = endCoords.join("#");
        addVertex(startPoint, endPoint, length, data);
        addVertex(endPoint, startPoint, length, data);
    }
    
    function metersPerPixel (latitude, zoomLevel) {
        return ((geoflo.statics.constants.CIRCUM * Math.cos((latitude * (Math.PI / 180)))) / Math.pow(2, zoomLevel + 8));
    }
    
    function setFeature (feature) {
        if (!feature) return geoflo.map.getSource(geoflo.statics.constants.sources.SNAP).setData(turf.featureCollection([])), geoflo.snapFeature;
        geoflo.Utilities.setProperty(feature, 'type', geoflo.currentMode.type);
        geoflo.map.getSource(geoflo.statics.constants.sources.SNAP).setData(turf.featureCollection([feature]));
        return feature;
    }

    function updateVertex (vertex, options={}) {
        var features = geoflo.map.getSource(geoflo.statics.constants.sources.HOTTEXT)._data.features;
        if (features.length && features[features.length - 1].properties.mouseLine) features.pop();

        vertex.properties.units = options.units;
        vertex.properties.unit = options.unit;
        vertex.properties.text = `${options.units} ${options.unit}`;
        vertex.properties.transform = 'uppercase';
        vertex.properties.anchor = 'top-left';
        vertex.properties.mouseLine = true;
    
        features.push(vertex);
        geoflo.map.getSource(geoflo.statics.constants.sources.HOTTEXT).setData(turf.featureCollection(features));
        return vertex;
    }
};

export default Snapping;