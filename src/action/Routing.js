/**
 * @mixin
 * @memberof module:geoflo
 * @name Routing
 * @description A class that handles routing functionality in a mapping context. Only enabled when the currentMode is set to 'draw'.
 * @param {Object} ctx - The GeoFlo context object
 * @param {Object} mode - The currentMode
 */
const Routing = function (ctx, mode) {
    this.type = mode.type;
    this.graphData = {};
    this.features = ctx.Features.getColdFeatures();

	/**
	 * @function
     * @memberof module:geoflo.Routing
	 * @name activate
	 * @description Activates the functionality by setting the 'enabled' property to true and enabling routing in the options.
	 * @params {void} None
	 * @returns {void}
	 */
    this.activate = function () {
        this.enabled = true;
        ctx.options['routing'].enable = true;
    };

	/**
	 * @function
     * @memberof module:geoflo.Routing
	 * @name deactivate
	 * @description This function deactivates the routing feature by setting the enabled flag to false, disabling routing in the options, and clearing the route data on the map.
	 * @returns {void}
	 */
    this.deactivate = function () {
        this.enabled = false;
        ctx.options['routing'].enable = false;
        ctx.map.getSource(ctx.statics.constants.sources['ROUTE']).setData(turf.featureCollection([]));
    };

	/**
	 * @function
     * @memberof module:geoflo.Routing
	 * @name getRoute
	 * @description This function calculates a route between two points on a map using a PathFinder object. It checks if the routing feature is enabled and if the map is not currently moving. It then creates a feature collection from the existing features, initializes a PathFinder object, and finds a path between the two points. The path is validated and then added to the map with a 'routing.add' event.
	 * @param {Object} fromPoint - The starting point for the route.
	 * @param {Object} toPoint - The destination point for the route.
	 * @returns {Array|boolean} The calculated route path as an array of points, or false if the route could not be calculated.
	 */
    this.getRoute = function (fromPoint, toPoint) {
        if (!this.enabled || ctx.mapMoving) return false;
        var features = turf.featureCollection(this.getFeatures());
        var pathfinder = new PathFinder(features, ctx.options.routing);
        var path = pathfinder.findPath ? pathfinder.findPath(fromPoint, toPoint) : false;
        path = validatePath(fromPoint, toPoint, path);
        ctx.fire('routing.add', { from: fromPoint, to: toPoint, path: path });
        return path;
    };

	/**
	 * @function
     * @memberof module:geoflo.Routing
	 * @name getMatch
	 * @description Retrieves a match for the given coordinates using the Exploring service. Sets the match as a starting point for routing.
	 * @param {Object} coords - The coordinates for which to find a match.
	 * @returns {Promise<Object>} The matched feature with routing property set to true.
	 */
    this.getMatch = async function (coords) {
        var feature = await ctx.Exploring.getMatch(coords, { set: true, start: ctx.startPoint });
        feature.properties.routing = true;
        return feature;
    }

	/**
	 * @function
     * @memberof module:geoflo.Routing
	 * @name getClosest
	 * @description Calculates the closest point on a route based on the last click and the closest point to it.
	 * @returns {Object|boolean} Returns a GeoJSON LineString feature with routing property set to true if successful, otherwise false.
	 */
    this.getClosest = function () {
        if (!ctx.closestPoint || !ctx.lastClick) return false;
        var route = this.getRoute(ctx.lastClick, ctx.closestPoint);
        if (!route || !route.path) return false;
        var feature = turf.lineString(route.path);
        feature.properties.routing = true;
        return feature;
    };

	/**
	 * @function
     * @memberof module:geoflo.Routing
	 * @name getFeatures
	 * @description Retrieves features of type 'LineString' from the mesh index.
	 * @returns {Array} An array of features of type 'LineString'.
	 */
    this.getFeatures = function () {
        var mesh = ctx.meshIndex.getFeatures();
        var features = [mesh, this.features].flat();
        return features.filter(function(feature) { return feature.geometry.type === 'LineString' });
    };

    
    if (ctx.options['routing'].enable) this.activate();


    function PathFinder(features, options) {
        options = options || {};
        
        if (!features.compactedVertices) { features = preprocess(features, options); }

        this._graph = features;
        this._keyFn = options.keyFn || function(c) { return c.join(','); };
        this._precision = options.precision || 1e-5;
        this._options = options;
    
        if (Object.keys(this._graph.compactedVertices).filter(function(k) { return k !== 'edgeData'; }).length === 0) {
            return null;
        }

        this.findPath = function(a, b) {
            var start = this._keyFn(roundCoord(a.coords, this._precision)),
                finish = this._keyFn(roundCoord(b.coords, this._precision));
    
            if (!this._graph.vertices[start] || !this._graph.vertices[finish]) {
                return null;
            }
    
            var phantomStart = this._createPhantom(start);
            var phantomEnd = this._createPhantom(finish);
    
            var path = findPath(this._graph.compactedVertices, start, finish);
    
            if (path) {
                var weight = path[0];
                path = path[1];
                return {
                    fullPath: path,
                    path: path.reduce(function buildPath(cs, v, i, vs) {
                        if (i > 0) {
                            cs = cs.concat(this._graph.compactedCoordinates[vs[i - 1]][v]);
                        }
    
                        return cs;
                    }.bind(this), []).concat([this._graph.sourceVertices[finish]]),
                    weight: weight,
                    edgeDatas: this._graph.compactedEdges 
                        ? path.reduce(function buildEdgeData(eds, v, i, vs) {
                            if (i > 0) {
                                eds.push({
                                    reducedEdge: this._graph.compactedEdges[vs[i - 1]][v]
                                });
                            }
    
                            return eds;
                        }.bind(this), [])
                        : undefined
                };
            } else {
                return null;
            }
    
            this._removePhantom(phantomStart);
            this._removePhantom(phantomEnd);
        }

        this.serialize = function() {
            return this._graph;
        }

        this._createPhantom = function(n) {
            if (this._graph.compactedVertices[n]) return null;
    
            var phantom = compactNode(n, this._graph.vertices, this._graph.compactedVertices, this._graph.sourceVertices, this._graph.edgeData, true, this._options);
            this._graph.compactedVertices[n] = phantom.edges;
            this._graph.compactedCoordinates[n] = phantom.coordinates;
    
            if (this._graph.compactedEdges) {
                this._graph.compactedEdges[n] = phantom.reducedEdges;
            }
    
            Object.keys(phantom.incomingEdges).forEach(function(neighbor) {
                this._graph.compactedVertices[neighbor][n] = phantom.incomingEdges[neighbor];
                this._graph.compactedCoordinates[neighbor][n] = [this._graph.sourceVertices[neighbor]].concat(phantom.incomingCoordinates[neighbor].slice(0, -1));
                if (this._graph.compactedEdges) {
                    this._graph.compactedEdges[neighbor][n] = phantom.reducedEdges[neighbor];
                }
            }.bind(this))
    
            return n;
        }

        this._removePhantom = function(n) {
            if (!n) return;
    
            Object.keys(this._graph.compactedVertices[n]).forEach(function(neighbor) {
                delete this._graph.compactedVertices[neighbor][n];
            }.bind(this));
            Object.keys(this._graph.compactedCoordinates[n]).forEach(function(neighbor) {
                delete this._graph.compactedCoordinates[neighbor][n];
            }.bind(this));
            if (this._graph.compactedEdges) {
                Object.keys(this._graph.compactedEdges[n]).forEach(function(neighbor) {
                    delete this._graph.compactedEdges[neighbor][n];
                }.bind(this));
            }
    
            delete this._graph.compactedVertices[n];
            delete this._graph.compactedCoordinates[n];
    
            if (this._graph.compactedEdges) {
                delete this._graph.compactedEdges[n];
            }
        }
    };

    function ShortestPath () {
        var INFINITY = 1 / 0;
        this.vertices = {};
    
        this.addVertex = function (name, edges) {
            this.vertices[name] = edges;
        };
    
        this.setVertices = function (graph) {
            this.vertices = graph;
        };
    
        this.shortestPath = function (start, finish) {
            var nodes = new PriorityQueue(),
                distances = {},
                previous = {},
                path = [],
                smallest, vertex, neighbor, alt;
        
            for (vertex in this.vertices) {
                if (vertex === start) {
                    distances[vertex] = 0;
                    nodes.enqueue(0, vertex);
                } else {
                    distances[vertex] = INFINITY;
                    nodes.enqueue(INFINITY, vertex);
                }
        
                previous[vertex] = null;
            }
        
            while (!nodes.isEmpty()) {
                smallest = nodes.dequeue();
        
                if (smallest === finish) {
                    path = [];
            
                    while (previous[smallest]) {
                        path.push(smallest);
                        smallest = previous[smallest];
                    }
            
                    break;
                }
        
                if (!smallest || distances[smallest] === INFINITY) {
                    continue;
                }
        
                for (neighbor in this.vertices[smallest]) {
                    alt = distances[smallest] + this.vertices[smallest][neighbor];
        
                    if (alt < distances[neighbor]) {
                        distances[neighbor] = alt;
                        previous[neighbor] = smallest;
            
                        nodes.enqueue(alt, neighbor);
                    }
                }
            }
        
            return path;
        };
    };
    
    function PriorityQueue() {
        this._nodes = [];
    
        this.enqueue = function (priority, key) {
            this._nodes.push({key: key, priority: priority});
            this.sort();
        };
    
        this.dequeue = function () {
            return this._nodes.shift().key;
        };
    
        this.sort = function () {
            this._nodes.sort((a, b) => {
                return a.priority - b.priority;
            });
        };
    
        this.isEmpty = function () {
            return !this._nodes.length;
        };
    };

    function TinyQueue(data, compare) {
        if ( data === void 0 ) data = [];
        if ( compare === void 0 ) compare = function (a, b) {
            return a < b ? -1 : a > b ? 1 : 0;
        };
    
        this.data = data;
        this.length = this.data.length;
        this.compare = compare;
    
        if (this.length > 0) {
            for (var i = (this.length >> 1) - 1; i >= 0; i--) { this._down(i); }
        }
    
        this.push = function push (item) {
            this.data.push(item);
            this.length++;
            this._up(this.length - 1);
        };
        
        this.pop = function pop () {
            if (this.length === 0) { return undefined; }
        
            var top = this.data[0];
            var bottom = this.data.pop();
            this.length--;
        
            if (this.length > 0) {
                this.data[0] = bottom;
                this._down(0);
            }
        
            return top;
        };
        
        this.peek = function peek () {
            return this.data[0];
        };
        
        this._up = function _up (pos) {
            var ref = this;
                var data = ref.data;
                var compare = ref.compare;
            var item = data[pos];
        
            while (pos > 0) {
                var parent = (pos - 1) >> 1;
                var current = data[parent];
                if (compare(item, current) >= 0) { break; }
                data[pos] = current;
                pos = parent;
            }
        
            data[pos] = item;
        };
        
        this._down = function _down (pos) {
            var ref = this;
                var data = ref.data;
                var compare = ref.compare;
            var halfLength = this.length >> 1;
            var item = data[pos];
        
            while (pos < halfLength) {
                var left = (pos << 1) + 1;
                var best = data[left];
                var right = left + 1;
        
                if (right < this.length && compare(data[right], best) < 0) {
                    left = right;
                    best = data[right];
                }
                if (compare(best, item) >= 0) { break; }
        
                data[pos] = best;
                pos = left;
            }
        
            data[pos] = item;
        };
    };

    function findNextEnd(prev, v, vertices, ends, vertexCoords, edgeData, trackIncoming, options) {
        var weight = vertices[prev][v],
            reverseWeight = vertices[v][prev],
            coordinates = [],
            path = [],
            reducedEdge = options.edgeDataSeed;
            
        if (options.edgeDataReduceFn) {
            reducedEdge = options.edgeDataReduceFn(reducedEdge, edgeData[v][prev]);
        }
    
        while (!ends[v]) {
            var edges = vertices[v];
    
            if (!edges) { break; }
    
            var next = Object.keys(edges).filter(function notPrevious(k) { return k !== prev; })[0];
            weight += edges[next];
    
            if (trackIncoming) {
                reverseWeight += vertices[next][v];
    
                if (path.indexOf(v) >= 0) {
                    ends[v] = vertices[v];
                    break;
                }
                path.push(v);
            }
    
            if (options.edgeDataReduceFn) {
                reducedEdge = options.edgeDataReduceFn(reducedEdge, edgeData[v][next]);
            }
    
            coordinates.push(vertexCoords[v]);
            prev = v;
            v = next;
        }
    
        return {
            vertex: v,
            weight: weight,
            reverseWeight: reverseWeight,
            coordinates: coordinates,
            reducedEdge: reducedEdge
        };
    };
    
    function compactNode(k, vertices, ends, vertexCoords, edgeData, trackIncoming, options) {
        options = options || {};
        var neighbors = vertices[k];
        return Object.keys(neighbors).reduce(function compactEdge(result, j) {
            var neighbor = findNextEnd(k, j, vertices, ends, vertexCoords, edgeData, trackIncoming, options);
            var weight = neighbor.weight;
            var reverseWeight = neighbor.reverseWeight;
            if (neighbor.vertex !== k) {
                if (!result.edges[neighbor.vertex] || result.edges[neighbor.vertex] > weight) {
                    result.edges[neighbor.vertex] = weight;
                    result.coordinates[neighbor.vertex] = [vertexCoords[k]].concat(neighbor.coordinates);
                    result.reducedEdges[neighbor.vertex] = neighbor.reducedEdge;
                }
                if (trackIncoming && 
                    !isNaN(reverseWeight) && (!result.incomingEdges[neighbor.vertex] || result.incomingEdges[neighbor.vertex] > reverseWeight)) {
                    result.incomingEdges[neighbor.vertex] = reverseWeight;
                    var coordinates = [vertexCoords[k]].concat(neighbor.coordinates);
                    coordinates.reverse();
                    result.incomingCoordinates[neighbor.vertex] = coordinates;
                }
            }
            return result;
        }, {edges: {}, incomingEdges: {}, coordinates: {}, incomingCoordinates: {}, reducedEdges: {}});
    };
    
    function compactGraph(vertices, vertexCoords, edgeData, options) {
        options = options || {};
        var progress = options.progress;
        var ends = Object.keys(vertices).reduce(function findEnds(es, k, i, vs) {
            var vertex = vertices[k];
            var edges = Object.keys(vertex);
            var numberEdges = edges.length;
            var remove;
    
            if(options.compact === false)  {
                remove = false;
            } else if (numberEdges === 1) {
                var other = vertices[edges[0]];
                remove = !other[k];
            } else if (numberEdges === 2) {
                remove = edges.filter(function(n) {
                    return vertices[n][k];
                }).length === numberEdges;
            } else {
                remove = false;
            }
            
            if (!remove) {
                es[k] = vertex;
            }
    
            if (i % 1000 === 0 && progress) {
                progress('compact:ends', i, vs.length);
            }
    
            return es;
        }, {});
    
        return Object.keys(ends).reduce(function compactEnd(result, k, i, es) {
            var compacted = compactNode(k, vertices, ends, vertexCoords, edgeData, false, options);
            result.graph[k] = compacted.edges;
            result.coordinates[k] = compacted.coordinates;
    
            if (options.edgeDataReduceFn) {
                result.reducedEdges[k] = compacted.reducedEdges;
            }
    
            if (i % 1000 === 0 && progress) {
                progress('compact:nodes', i, es.length);
            }
    
            return result;
        }, {graph: {}, coordinates: {}, reducedEdges: {}});
    };
    
    function findPath(graph, start, end) {
        var costs = {};
        costs[start] = 0;
        var initialState = [0, [start], start];
        var queue = new TinyQueue([initialState], function(a, b) { return a[0] - b[0]; });
        var explored = {};
    
        while (queue.length) {
            var state = queue.pop();
            var cost = state[0];
            var node = state[2];
            if (node === end) {
                return state.slice(0, 2);
            }
    
            var neighbours = graph[node];
            Object.keys(neighbours).forEach(function(n) {
                var newCost = cost + neighbours[n];
                if (!(n in costs) || newCost < costs[n]) {
                    costs[n] = newCost;
                    var newState = [newCost, state[1].concat([n]), n];
                    queue.push(newState);
                }
            });
        }
    
        return null;
    };
    
    function preprocess(graph, options) {
        options = options || {};

        var topo;

        var weightFn = options.weightFn || function defaultWeightFn(a, b) {
            return turf.distance(turf.point(a), turf.point(b));
        }
    
        if (graph.type === 'FeatureCollection') {
            // Graph is GeoJSON data, create a topology from it
            topo = topology(graph, options);
        } else if (graph.edges) {
            // Graph is a preprocessed topology
            topo = graph;
        }
    
        var graph = topo.edges.reduce(function buildGraph(g, edge, i, es) {
            var a = edge[0],
                b = edge[1],
                props = edge[2],
                w = weightFn(topo.vertices[a], topo.vertices[b], props),
                makeEdgeList = function makeEdgeList(node) {
                    if (!g.vertices[node]) {
                        g.vertices[node] = {};
                        if (options.edgeDataReduceFn) {
                            g.edgeData[node] = {};
                        }
                    }
                },
                concatEdge = function concatEdge(startNode, endNode, weight) {
                    var v = g.vertices[startNode];
                    v[endNode] = weight;
                    if (options.edgeDataReduceFn) {
                        g.edgeData[startNode][endNode] = options.edgeDataReduceFn(options.edgeDataSeed, props);
                    }
                };
    
            if (w) {
                makeEdgeList(a);
                makeEdgeList(b);
                if (w instanceof Object) {
                    if (w.forward) {
                        concatEdge(a, b, w.forward);
                    }
                    if (w.backward) {
                        concatEdge(b, a, w.backward);
                    }
                } else {
                    concatEdge(a, b, w);
                    concatEdge(b, a, w);
                }
            }
    
            if (i % 1000 === 0 && options.progress) {
                options.progress('edgeweights', i,es.length);
            }
    
            return g;
        }, {edgeData: {}, vertices: {}});
    
        var compact = compactGraph(graph.vertices, topo.vertices, graph.edgeData, options);
    
        return {
            vertices: graph.vertices,
            edgeData: graph.edgeData,
            sourceVertices: topo.vertices,
            compactedVertices: compact.graph,
            compactedCoordinates: compact.coordinates,
            compactedEdges: options.edgeDataReduceFn ? compact.reducedEdges : null
        };
    };
    
    function roundCoord(c, precision) {
        return [
            Math.round(c[0] / precision) * precision,
            Math.round(c[1] / precision) * precision,
        ];
    };
    
    function geoJsonReduce(geojson, fn, seed) {
        if (geojson.type === 'FeatureCollection') {
            return geojson.features.reduce(function reduceFeatures(a, f) {
                return geoJsonReduce(f, fn, a);
            }, seed);
        } else {
            return fn(seed, geojson);
        }
    };
    
    function geoJsonFilterFeatures(geojson, fn) {
        var features = [];
        if (geojson.type === 'FeatureCollection') {
            features = features.concat(geojson.features.filter(fn));
        }
    
        return {
            type: 'FeatureCollection',
            features: features
        };
    };
    
    function isLineString(f) {
        return f.geometry.type === 'LineString';
    };
    
    function topology(geojson, options) {
        options = options || {};
        var keyFn = options.keyFn || function defaultKeyFn(c) {
                return c.join(',');
            },
            precision = options.precision || 1e-5;
    
        var lineStrings = geoJsonFilterFeatures(geojson, isLineString);
        var explodedLineStrings = turf.explode(lineStrings);
        var vertices = explodedLineStrings.features.reduce(function buildTopologyVertices(cs, f, i, fs) {
                var rc = roundCoord(f.geometry.coordinates, precision);
                cs[keyFn(rc)] = f.geometry.coordinates;
    
                if (i % 1000 === 0 && options.progress) {
                    options.progress('topo:vertices', i, fs.length);
                }
    
                return cs;
            }, {}),
            edges = geoJsonReduce(lineStrings, function buildTopologyEdges(es, f, i, fs) {
                f.geometry.coordinates.forEach(function buildLineStringEdges(c, i, cs) {
                    if (i > 0) {
                        var k1 = keyFn(roundCoord(cs[i - 1], precision)),
                            k2 = keyFn(roundCoord(c, precision));
                        es.push([k1, k2, f.properties]);
                    }
                });
    
                if (i % 1000 === 0 && options.progress) {
                    options.progress('topo:edges', i, fs.length);
                }
    
                return es;
            }, []);
        return {
            vertices: vertices,
            edges: edges
        };
    };

    function validatePath(fromPoint, toPoint, path) {
        if (toPoint && toPoint.type === 'linepoint') return false;
        //if (precision > 0.0005) return false;
        if (!path || !path.path || !path.path.length || path.path.length < 2) return false;
        return path;

        precision = Number((Number(precision) + 0.000002).toFixed(7));
        var pathfinder = new PathFinder(features, { precision: precision });
        var newPath = pathfinder.findPath(fromPoint, toPoint);
        return validatePath(fromPoint, toPoint, features, newPath);
    };
};

export { Routing as default }