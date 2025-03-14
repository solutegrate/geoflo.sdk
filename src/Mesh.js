/**
 * @mixin
 * @memberof module:geoflo
 * @name Mesh
 * @description This module provides the mesh functionality for the Geoflo application. It allows users to create a mesh of features by splitting them into segments and checking for intersections.
 * @param {Array} originalFeatures - An array of features to be added to the mesh.
 * @param {boolean} linesOnly - A flag indicating whether only lines should be added to the mesh.
 * @returns {Object} Returns the Mesh object.
 */
const Mesh = function (originalFeatures, linesOnly) {
    var segmentId = 1;
    var allSegments = [];
    var featureIndex = {};

    const geoflo = this.geoflo;

	/**
	 * @function
     * @memberof module:geoflo.Mesh
	 * @name addNewFeatures
	 * @description This function takes new features, splits them into segments, checks for intersections, and updates the existing segments accordingly.
	 * @param {Array} features - An array of new features to be added.
	 * @return {Array} Returns an array containing all mesh segments.
	 */
    this.addNewFeatures = function(features) {
        var allNewFeatures = splitAndCheckForIntersections(features);
        var newSegments = splitIntoTwoPointSegmentsAndAddIds(allNewFeatures);
        var segmentsWithCutPoints = checkForIntersections(newSegments, allSegments);
        allSegments = [].concat(geoflo.Utilities.consumableArray(cutSegments(allSegments, segmentsWithCutPoints)), geoflo.Utilities.consumableArray(cutSegments(newSegments, segmentsWithCutPoints)));
        return this.getFeatures();
    };

	/**
	 * @function
     * @memberof module:geoflo.Mesh
	 * @name getFeatures
	 * @description Returns all of the features in the mesh.
	 * @return {Array} Returns an array containing all feature segments.
	 */
    this.getFeatures = function() {
        return allSegments;
    };

	/**
	 * @function
     * @memberof module:geoflo.Mesh
	 * @name splitSegmentAtPoint
	 * @description This function takes a segment ID and coordinates of a point to split the segment. It creates two new segments by splitting the original segment at the specified point and updates the feature index.
	 * @param {string} segmentId - The ID of the segment to be split.
	 * @param {Array<number>} pointCoords - The coordinates of the point where the segment should be split.
	 */
    this.splitSegmentAtPoint = function(segmentId, pointCoords) {
        var feature = featureIndex[segmentId];
        if (feature !== undefined) {
            var pos = allSegments.indexOf(feature);
            allSegments.splice(pos, 1);
            var line1 = createLineWithLength([pointCoords, feature.geometry.coordinates[0]]);
            var line2 = createLineWithLength([pointCoords, feature.geometry.coordinates[1]]);
            addFeatureToIndex(line1);
            addFeatureToIndex(line2);
            allSegments.push(line1, line2);
        } else {
            console.error("splitSegmentAtPoint: no original feature for id ", segmentId);
        }
    };

	/**
	 * @function
     * @memberof module:geoflo.Mesh
	 * @name getFeaturesFromIndex
	 * @description This function takes an array of features and retrieves the corresponding features from an index based on their IDs.
	 * @param {Array} features - The array of features to retrieve from the index.
	 * @returns {Array} The array of features retrieved from the index.
	 */
    this.getFeaturesFromIndex = function(features) {
        var result = [];
        features.forEach(function(feature) {
            var id = feature.id || feature.properties.id;
            var originalFeature = featureIndex[id];
            if (originalFeature !== undefined) {
                result.push(originalFeature);
            }
        });
        return result;
    };

	/**
	 * @function
     * @memberof module:geoflo.Mesh
	 * @name getFeatureById
	 * @description Retrieves a feature by its ID.
	 * @param {number} id - The ID of the feature to retrieve.
	 * @returns {object} The feature object corresponding to the provided ID.
	 */
    this.getFeatureById = function(id) {
        return getFeatureById(id);
    };

	/**
	 * @function
     * @memberof module:geoflo.Mesh
	 * @name getFeaturesByParentId
	 * @description Retrieves features based on the parent ID. The parent ID is used to retrieve cold features associated with the segment.
	 * @param {number} id - The parent ID to retrieve features for.
	 * @returns {Array} - An array of features associated with the parent ID.
	 */
    this.getFeaturesByParentId = function(id) {
        return getFeaturesByParentId(id);
    };

	/**
	 * @function
     * @memberof module:geoflo.Mesh
	 * @name removeFeature
	 * @description Removes a feature with the specified ID.
	 * @param {number} id - The ID of the feature to be removed.
	 * @returns {boolean} - Returns true if the feature was successfully removed, false otherwise.
	 */
    this.removeFeature = function (id) {
        return removeFeature(id);
    };


    if (originalFeatures) allSegments = splitAndCheckForIntersections(originalFeatures);


    function addFeatureToIndex(feature, parent) {
        if (featureIndex[segmentId] || getFeatureById(segmentId)) return false;

        featureIndex[segmentId] = feature;
        feature.id = segmentId;
        feature.parent = parent;

        geoflo.Utilities.setProperty(feature, 'id', segmentId);
        geoflo.Utilities.setProperty(feature, 'parent', parent);

        segmentId++;
        return true;
    }

    function addClickSegementsToMesh() {
        if (!geoflo.options.snapping.enable) return false;
    
        var meshFeatures = [];
    
        if (geoflo.Mesh && geoflo.closestPoint && geoflo.closestPoint.borders && geoflo.closestPoint.id !== undefined) {
            geoflo.Mesh.splitSegmentAtPoint(geoflo.closestPoint.id, geoflo.closestPoint.coords);
            geoflo.updateMeshData();
        }
    
        if (geoflo.snapFeature) {
            if (geoflo.snapFeature.geometry.type === "LineString") {
                if (!geoflo.Utilities.isEmptyLineString(geoflo.snapFeature)) {
                    meshFeatures.push(geoflo.snapFeature);
                }
            } else if (geoflo.snapFeature.geometry.type === "Point") {
                geoflo.Utilities.setProperty(geoflo.snapFeature, 'startPoint', true);
                geoflo.startPoint = geoflo.Utilities.cloneDeep(geoflo.snapFeature);
                meshFeatures.push(geoflo.snapFeature);
            }
        }
    
        if (meshFeatures.length > 0) geoflo.addFeaturesToMesh(meshFeatures);
    }

    function coordinatesToLineStrings(coords, result, parent) {
        var firstPoint = turf.truncate(turf.point(coords[0]), { precision: 7, coordinates: 2, mutate: true });
        var secondPoint = null;

        for (var index = 1; index < coords.length; index++) {
            secondPoint = turf.truncate(turf.point(coords[index]), { precision: 7, coordinates: 2, mutate: true });
            
            if (!geoflo.Utilities.isPointEqual(firstPoint.geometry.coordinates, secondPoint.geometry.coordinates)) {
                var line = turf.lineString([firstPoint.geometry.coordinates, secondPoint.geometry.coordinates]);
                var added = addFeatureToIndex(line, parent);
                added ? result.push(line) : false;
            }

            firstPoint = secondPoint;
        }
    }

    function splitIntoTwoPointSegmentsAndAddIds(features) {
        var result = [];
        if (!features || !features.length) return result;

        features.forEach(function(feature) {
            var type = feature.geometry.type;
            var id = feature.parent || feature.properties.parent || feature.id || feature.properties.id;
            var added;

            if (linesOnly && type !== "LineString" && !feature.properties.unfill) {
                feature = geoflo.Utilities.cloneDeep(feature);
                added = addFeatureToIndex(feature, id);
                return added ? result.push(feature) : false;
            }

            if (type === "MultiPolygon") {
                feature.geometry.coordinates.forEach(function(coords) {
                    coords.forEach(function(subCoords) {
                        coordinatesToLineStrings(subCoords, result, id);
                    });
                });
            } else if (type === "Polygon") {
                feature.geometry.coordinates.forEach(function(coords) {
                    coordinatesToLineStrings(coords, result, id);
                });
            } else if (type === "MultiLineString") {
                feature.geometry.coordinates.forEach(function(coords) {
                    coordinatesToLineStrings(coords, result, id);
                });
            } else if (type === "LineString") {
                coordinatesToLineStrings(feature.geometry.coordinates, result, id);
            } else if (type === "Point") {
                feature = geoflo.Utilities.cloneDeep(feature);
                added = addFeatureToIndex(feature, id);
                added ? result.push(feature) : false;
            }
        });

        return result;
    }

    function appendCutFeatures(segmentsWithCutPoints, feature, cutPointFeatures) {
        var id = feature.id || feature.properties.id;
        var segCutPoints = segmentsWithCutPoints[id];
    
        if (segCutPoints === undefined) {
            segCutPoints = [];
            segmentsWithCutPoints[id] = segCutPoints;
        }
    
        cutPointFeatures.forEach(function(feature) {
            var newCutPoint = geoflo.Utilities.reducePrecision(feature.geometry.coordinates);
            var cutPoint = segCutPoints.findIndex(function(element) { return element[0] === newCutPoint[0] && element[1] === newCutPoint[1]; });
            if (cutPoint === -1) { segCutPoints.push(newCutPoint); }
        });
    };

    function checkForIntersections(knownSegments, newSegments) {
        var segmentsWithCutPoints = {};

        var processIntersectionPoint = function processIntersectionPoint(point, feature1, feature2) {
            var pointCoords = point.geometry.coordinates;
            var seg1Coords = feature1.geometry.coordinates;
            var seg2Coords = feature2.geometry.coordinates;
            var addFeature1Point = false;
            var addFeature2Point = false;
            var closestPointAdded = false;

            if (!geoflo.Utilities.isPointEqual(pointCoords, seg1Coords[0]) && !geoflo.Utilities.isPointEqual(pointCoords, seg1Coords[1])) {
                var endpoint1 = turf.point(seg1Coords[0]);
                var endpoint2 = turf.point(seg1Coords[1]);
                var distanceEndpoint1 = turf.distance(point, endpoint1);
                var distanceEndpoint2 = turf.distance(point, endpoint2);

                var closestEndpoint = distanceEndpoint1 < distanceEndpoint2 ? endpoint1 : endpoint2;

                var pointOnLine = turf.pointOnLine(feature2, closestEndpoint);
                if (pointOnLine.properties.dist < geoflo.statics.constants.MIN_DISTANCE) {
                    appendCutFeatures(segmentsWithCutPoints, feature2, [closestEndpoint]);
                    closestPointAdded = true;
                } else {
                    addFeature1Point = true;
                }
            }
            if (!geoflo.Utilities.isPointEqual(pointCoords, seg2Coords[0]) && !geoflo.Utilities.isPointEqual(pointCoords, seg2Coords[1])) {
                var _endpoint = turf.point(seg2Coords[0]);
                var _endpoint2 = turf.point(seg2Coords[1]);
                var _distanceEndpoint = turf.distance(point, _endpoint);
                var _distanceEndpoint2 = turf.distance(point, _endpoint2);

                var _closestEndpoint = _distanceEndpoint < _distanceEndpoint2 ? _endpoint : _endpoint2;

                var _pointOnLine = turf.pointOnLine(feature1, _closestEndpoint);
                if (_pointOnLine.properties.dist < geoflo.statics.constants.MIN_DISTANCE) {
                    appendCutFeatures(segmentsWithCutPoints, feature1, [_closestEndpoint]);
                    closestPointAdded = true;
                } else {
                    addFeature2Point = true;
                }
            }

            if (!closestPointAdded) {
                if (addFeature1Point) {
                    appendCutFeatures(segmentsWithCutPoints, feature1, [point]);
                }
                if (addFeature2Point) {
                    appendCutFeatures(segmentsWithCutPoints, feature2, [point]);
                }
            }
        };

        var checkIfPointInCloseRange = function checkIfPointInCloseRange(feature, coords) {
            var pointOnline = turf.pointOnLine(feature, turf.point(coords));
            if (pointOnline.properties.dist < geoflo.statics.constants.MIN_DISTANCE) {
                if (!isPointAtVertex(feature.geometry.coordinates, coords)) {
                    appendCutFeatures(segmentsWithCutPoints, feature, [pointOnline]);
                    return true;
                }
            }
            return false;
        };

        var sameSegments = knownSegments === newSegments;

        for (var knownIndex = 0; knownIndex < knownSegments.length; knownIndex++) {
            var segmentFeature1 = knownSegments[knownIndex];
            var feature1Type = segmentFeature1.geometry.type;

            for (var newIndex = sameSegments ? knownIndex + 1 : 0; newIndex < newSegments.length; newIndex++) {
                var segmentFeature2 = newSegments[newIndex];
                var feature2Type = segmentFeature2.geometry.type;
                var id = segmentFeature2.id || segmentFeature2.properties.id;

                if (feature1Type === "LineString" && feature2Type === "LineString") {
                    if (isOverlapping(segmentFeature1, segmentFeature2)) {
                        var intersectionPoints = turf.lineIntersect(segmentFeature1, segmentFeature2).features;

                        if (intersectionPoints.length > 0) {
                            if (intersectionPoints.length > 1) console.error(intersectionPoints.length + " intersection points received");
                            var point = intersectionPoints[0];
                            processIntersectionPoint(point, segmentFeature1, segmentFeature2);
                        } else {
                            var seg1Coords = segmentFeature1.geometry.coordinates;
                            var seg2Coords = segmentFeature2.geometry.coordinates;
                            checkIfPointInCloseRange(segmentFeature1, seg2Coords[0]);
                            checkIfPointInCloseRange(segmentFeature1, seg2Coords[1]);
                            checkIfPointInCloseRange(segmentFeature2, seg1Coords[0]);
                            checkIfPointInCloseRange(segmentFeature2, seg1Coords[1]);
                        }

                        if (getFeatureById(id)) {
                            console.log('Existing Line: ', segmentFeature2)
                            var pos = allSegments.indexOf(getFeatureById(id));
                            allSegments.splice(pos, 1);
                        }
                    }
                } else if (feature1Type === "Point" || feature2Type === "Point") {
                    if (feature2Type === "Point" && feature2Type === "Point") {
                        console.log("Point & Point");
                    } else {
                        console.log("Point & LineString");
                        var _point = feature1Type === "Point" ? segmentFeature1 : segmentFeature2;
                        var line = feature1Type === "LineString" ? segmentFeature1 : segmentFeature2;

                        id = _point.id || _point.properties.id;

                        if (checkIfPointInCloseRange(line, _point.geometry.coordinates)) {
                            segmentsWithCutPoints[id] = [];
                        }
                    }

                    if (getFeatureById(id)) {
                        console.log('Existing Point: ', segmentFeature2)
                        var pos = allSegments.indexOf(getFeatureById(id));
                        allSegments.splice(pos, 1);
                    }
                }
            }
        }

        return segmentsWithCutPoints;
    }

    function cutSegments(newSegments, segmentsWithCutPoints) {
        var result = [];

        newSegments.forEach(function(segment) {
            var id = segment.id || segment.properties.id;

            if (segment.geometry.type === "LineString") {
                var cutPoints = segmentsWithCutPoints[id];

                if (cutPoints !== undefined) {
                    var fc = turf.lineSplit(segment, turf.multiPoint(cutPoints));
                    turf.featureEach(fc, function(feature) {
                        var length = turf.lineDistance(feature);
                        if (length > geoflo.statics.constants.MIN_SEGMENT_LENGTH) {
                            geoflo.Utilities.setProperties(feature, { length: length });
                            addFeatureToIndex(feature);
                            result.push(feature);
                        } else {
                            console.error("0 length feature (", length, ") after line split: ", JSON.stringify(feature));
                        }
                    });
                } else {
                    var length = turf.lineDistance(segment);
                    if (length > geoflo.statics.constants.MIN_SEGMENT_LENGTH) {
                        geoflo.Utilities.setProperties(segment, { length: length });
                        result.push(segment);
                    } else {
                        console.error("0 length feature (", length, ") existing segment: ", JSON.stringify(segment));
                    }
                }
            } else {
                var _cutPoints = segmentsWithCutPoints[id];

                if (_cutPoints === undefined) {
                    result.push(segment);
                }
            }
        });

        return result;
    }

    function splitAndCheckForIntersections(newFeatures) {
        var newFeaturesSegments = splitIntoTwoPointSegmentsAndAddIds(newFeatures);
        if (linesOnly) return newFeaturesSegments;
        var newFeaturesWithCutPoints = checkForIntersections(newFeaturesSegments, newFeaturesSegments);
        return cutSegments(newFeaturesSegments, newFeaturesWithCutPoints);
    }

    function getFeatureById(id) {
        return allSegments.find(function(f) { return f.id === id || f.properties.id === id }) 
    }

    function getFeaturesByParentId(id) {
        return allSegments.filter(function(f) { return f.parent === id || f.properties.parent === id })
    }

    function removeFeature(id) {
        var features = getFeaturesByParentId(id);
        
        if (features && features.length) {
            features.forEach(function(feature) {
                var pos = allSegments.indexOf(feature);
                allSegments.splice(pos, 1);
            })
            
            geoflo.updateMeshData();
        }

        return allSegments;
    }

    function isPointAtVertex(geometryCoords, pointCoords) {
        var firstPoint = geometryCoords[0];
        var lastPoint = geometryCoords[geometryCoords.length - 1];
        return geoflo.Utilities.isPointEqual(firstPoint, pointCoords) || geoflo.Utilities.isPointEqual(lastPoint, pointCoords);
    }

    function createLineWithLength(coords) {
        var line = turf.lineString(coords);
        var length = turf.lineDistance(line);
        geoflo.Utilities.setProperties(line, { length: length });
        return line;
    }

    function isOverlapping(feature1, feature2) {
        var coords1 = feature1.geometry.coordinates;
        var coords2 = feature2.geometry.coordinates;

        if (coords1.length === 2 && coords2.length === 2) {
            var bbox1 = createBbox(coords1);
            var bbox2 = createBbox(coords2);
            if (bbox1.east < bbox2.west || bbox1.west > bbox2.east) {
                return false;
            } else if (bbox1.north < bbox2.south || bbox1.south > bbox2.north) {
                return false;
            }
            return true;
        } else {
            throw new Error("wrong number of coordinates, expected 2");
        }
    }

    function createBbox(coords) {
        var bbox1 = {};
        if (coords[0][0] < coords[1][0]) {
            bbox1.west = coords[0][0];
            bbox1.east = coords[1][0];
        } else {
            bbox1.west = coords[1][0];
            bbox1.east = coords[0][0];
        }
        if (coords[0][1] < coords[1][1]) {
            bbox1.south = coords[0][1];
            bbox1.north = coords[1][1];
        } else {
            bbox1.south = coords[1][1];
            bbox1.north = coords[0][1];
        }
        return bbox1;
    }
};

export default Mesh;