/*!
 * /*!
 *  * GeoFlo SDK
 *  * Version 1.0.11
 *  * Generated on: 2025-02-06T00:09:21.028Z
 *  * /
 */
"use strict";
(self["webpackChunk_solutegrate_geoflo_sdk"] = self["webpackChunk_solutegrate_geoflo_sdk"] || []).push([["routing"],{

/***/ "./src/Routing.js":
/*!************************!*\
  !*** ./src/Routing.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
/**
 * @mixin
 * @memberof module:geoflo
 * @name Routing
 * @description This module provides the routing functionality for the Geoflo application. It allows users to calculate routes between two points on the map using a PathFinder object.
 * @param {Object} mode - The mode object containing the type of mode.
 * @returns {Object} Returns the Routing object.
 */
var Routing = function Routing(mode) {
  var geoflo = this.geoflo;
  this.type = mode.type;
  this.graphData = {};
  this.features = geoflo.getDrawnFeatures();

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
    geoflo.options['routing'].enable = true;
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
    geoflo.options['routing'].enable = false;
    geoflo.map.getSource(geoflo.statics.constants.sources['ROUTE']).setData(turf.featureCollection([]));
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
    if (!this.enabled || geoflo.mapMoving) return false;
    var features = turf.featureCollection(this.getFeatures());
    var pathfinder = new PathFinder(features, geoflo.options.routing);
    var path = pathfinder.findPath ? pathfinder.findPath(fromPoint, toPoint) : false;
    path = validatePath(fromPoint, toPoint, path);
    geoflo.fire('routing.add', {
      from: fromPoint,
      to: toPoint,
      path: path
    });
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
  this.getMatch = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(coords) {
      var feature;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            if (geoflo.Exploring) {
              _context.next = 2;
              break;
            }
            return _context.abrupt("return", {});
          case 2:
            _context.next = 4;
            return geoflo.Exploring.getMatch(coords, {
              set: true,
              start: geoflo.startPoint
            });
          case 4:
            feature = _context.sent;
            feature.properties.routing = true;
            return _context.abrupt("return", feature);
          case 7:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }();

  /**
   * @function
      * @memberof module:geoflo.Routing
   * @name getClosest
   * @description Calculates the closest point on a route based on the last click and the closest point to it.
   * @returns {Object|boolean} Returns a GeoJSON LineString feature with routing property set to true if successful, otherwise false.
   */
  this.getClosest = function () {
    if (!geoflo.closestPoint || !geoflo.lastClick) return false;
    var route = this.getRoute(geoflo.lastClick, geoflo.closestPoint);
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
    var features = [geoflo.getSnapFeatures(), geoflo.getDrawnFeatures()].flat();
    return features.filter(function (feature) {
      return feature.geometry.type === 'LineString';
    });
  };
  if (geoflo.options['routing'].enable) this.activate();
  function PathFinder(features, options) {
    options = options || {};
    if (!features.compactedVertices) {
      features = preprocess(features, options);
    }
    this._graph = features;
    this._keyFn = options.keyFn || function (c) {
      return c.join(',');
    };
    this._precision = options.precision || 1e-5;
    this._options = options;
    if (Object.keys(this._graph.compactedVertices).filter(function (k) {
      return k !== 'edgeData';
    }).length === 0) {
      return null;
    }
    this.findPath = function (a, b) {
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
          edgeDatas: this._graph.compactedEdges ? path.reduce(function buildEdgeData(eds, v, i, vs) {
            if (i > 0) {
              eds.push({
                reducedEdge: this._graph.compactedEdges[vs[i - 1]][v]
              });
            }
            return eds;
          }.bind(this), []) : undefined
        };
      } else {
        return null;
      }
      this._removePhantom(phantomStart);
      this._removePhantom(phantomEnd);
    };
    this.serialize = function () {
      return this._graph;
    };
    this._createPhantom = function (n) {
      if (this._graph.compactedVertices[n]) return null;
      var phantom = compactNode(n, this._graph.vertices, this._graph.compactedVertices, this._graph.sourceVertices, this._graph.edgeData, true, this._options);
      this._graph.compactedVertices[n] = phantom.edges;
      this._graph.compactedCoordinates[n] = phantom.coordinates;
      if (this._graph.compactedEdges) {
        this._graph.compactedEdges[n] = phantom.reducedEdges;
      }
      Object.keys(phantom.incomingEdges).forEach(function (neighbor) {
        this._graph.compactedVertices[neighbor][n] = phantom.incomingEdges[neighbor];
        this._graph.compactedCoordinates[neighbor][n] = [this._graph.sourceVertices[neighbor]].concat(phantom.incomingCoordinates[neighbor].slice(0, -1));
        if (this._graph.compactedEdges) {
          this._graph.compactedEdges[neighbor][n] = phantom.reducedEdges[neighbor];
        }
      }.bind(this));
      return n;
    };
    this._removePhantom = function (n) {
      if (!n) return;
      Object.keys(this._graph.compactedVertices[n]).forEach(function (neighbor) {
        delete this._graph.compactedVertices[neighbor][n];
      }.bind(this));
      Object.keys(this._graph.compactedCoordinates[n]).forEach(function (neighbor) {
        delete this._graph.compactedCoordinates[neighbor][n];
      }.bind(this));
      if (this._graph.compactedEdges) {
        Object.keys(this._graph.compactedEdges[n]).forEach(function (neighbor) {
          delete this._graph.compactedEdges[neighbor][n];
        }.bind(this));
      }
      delete this._graph.compactedVertices[n];
      delete this._graph.compactedCoordinates[n];
      if (this._graph.compactedEdges) {
        delete this._graph.compactedEdges[n];
      }
    };
  }
  ;
  function ShortestPath() {
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
        smallest,
        vertex,
        neighbor,
        alt;
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
  }
  ;
  function PriorityQueue() {
    this._nodes = [];
    this.enqueue = function (priority, key) {
      this._nodes.push({
        key: key,
        priority: priority
      });
      this.sort();
    };
    this.dequeue = function () {
      return this._nodes.shift().key;
    };
    this.sort = function () {
      this._nodes.sort(function (a, b) {
        return a.priority - b.priority;
      });
    };
    this.isEmpty = function () {
      return !this._nodes.length;
    };
  }
  ;
  function TinyQueue(data, compare) {
    if (data === void 0) data = [];
    if (compare === void 0) compare = function compare(a, b) {
      return a < b ? -1 : a > b ? 1 : 0;
    };
    this.data = data;
    this.length = this.data.length;
    this.compare = compare;
    if (this.length > 0) {
      for (var i = (this.length >> 1) - 1; i >= 0; i--) {
        this._down(i);
      }
    }
    this.push = function push(item) {
      this.data.push(item);
      this.length++;
      this._up(this.length - 1);
    };
    this.pop = function pop() {
      if (this.length === 0) {
        return undefined;
      }
      var top = this.data[0];
      var bottom = this.data.pop();
      this.length--;
      if (this.length > 0) {
        this.data[0] = bottom;
        this._down(0);
      }
      return top;
    };
    this.peek = function peek() {
      return this.data[0];
    };
    this._up = function _up(pos) {
      var ref = this;
      var data = ref.data;
      var compare = ref.compare;
      var item = data[pos];
      while (pos > 0) {
        var parent = pos - 1 >> 1;
        var current = data[parent];
        if (compare(item, current) >= 0) {
          break;
        }
        data[pos] = current;
        pos = parent;
      }
      data[pos] = item;
    };
    this._down = function _down(pos) {
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
        if (compare(best, item) >= 0) {
          break;
        }
        data[pos] = best;
        pos = left;
      }
      data[pos] = item;
    };
  }
  ;
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
      if (!edges) {
        break;
      }
      var next = Object.keys(edges).filter(function notPrevious(k) {
        return k !== prev;
      })[0];
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
  }
  ;
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
        if (trackIncoming && !isNaN(reverseWeight) && (!result.incomingEdges[neighbor.vertex] || result.incomingEdges[neighbor.vertex] > reverseWeight)) {
          result.incomingEdges[neighbor.vertex] = reverseWeight;
          var coordinates = [vertexCoords[k]].concat(neighbor.coordinates);
          coordinates.reverse();
          result.incomingCoordinates[neighbor.vertex] = coordinates;
        }
      }
      return result;
    }, {
      edges: {},
      incomingEdges: {},
      coordinates: {},
      incomingCoordinates: {},
      reducedEdges: {}
    });
  }
  ;
  function compactGraph(vertices, vertexCoords, edgeData, options) {
    options = options || {};
    var progress = options.progress;
    var ends = Object.keys(vertices).reduce(function findEnds(es, k, i, vs) {
      var vertex = vertices[k];
      var edges = Object.keys(vertex);
      var numberEdges = edges.length;
      var remove;
      if (options.compact === false) {
        remove = false;
      } else if (numberEdges === 1) {
        var other = vertices[edges[0]];
        remove = !other[k];
      } else if (numberEdges === 2) {
        remove = edges.filter(function (n) {
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
    }, {
      graph: {},
      coordinates: {},
      reducedEdges: {}
    });
  }
  ;
  function findPath(graph, start, end) {
    var costs = {};
    costs[start] = 0;
    var initialState = [0, [start], start];
    var queue = new TinyQueue([initialState], function (a, b) {
      return a[0] - b[0];
    });
    var explored = {};
    while (queue.length) {
      var state = queue.pop();
      var cost = state[0];
      var node = state[2];
      if (node === end) {
        return state.slice(0, 2);
      }
      var neighbours = graph[node];
      Object.keys(neighbours).forEach(function (n) {
        var newCost = cost + neighbours[n];
        if (!(n in costs) || newCost < costs[n]) {
          costs[n] = newCost;
          var newState = [newCost, state[1].concat([n]), n];
          queue.push(newState);
        }
      });
    }
    return null;
  }
  ;
  function preprocess(graph, options) {
    options = options || {};
    var topo;
    var weightFn = options.weightFn || function defaultWeightFn(a, b) {
      return turf.distance(turf.point(a), turf.point(b));
    };
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
        options.progress('edgeweights', i, es.length);
      }
      return g;
    }, {
      edgeData: {},
      vertices: {}
    });
    var compact = compactGraph(graph.vertices, topo.vertices, graph.edgeData, options);
    return {
      vertices: graph.vertices,
      edgeData: graph.edgeData,
      sourceVertices: topo.vertices,
      compactedVertices: compact.graph,
      compactedCoordinates: compact.coordinates,
      compactedEdges: options.edgeDataReduceFn ? compact.reducedEdges : null
    };
  }
  ;
  function roundCoord(c, precision) {
    return [Math.round(c[0] / precision) * precision, Math.round(c[1] / precision) * precision];
  }
  ;
  function geoJsonReduce(geojson, fn, seed) {
    if (geojson.type === 'FeatureCollection') {
      return geojson.features.reduce(function reduceFeatures(a, f) {
        return geoJsonReduce(f, fn, a);
      }, seed);
    } else {
      return fn(seed, geojson);
    }
  }
  ;
  function geoJsonFilterFeatures(geojson, fn) {
    var features = [];
    if (geojson.type === 'FeatureCollection') {
      features = features.concat(geojson.features.filter(fn));
    }
    return {
      type: 'FeatureCollection',
      features: features
    };
  }
  ;
  function isLineString(f) {
    return f.geometry.type === 'LineString';
  }
  ;
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
  }
  ;
  function validatePath(fromPoint, toPoint, path) {
    if (toPoint && toPoint.type === 'linepoint') return false;
    //if (precision > 0.0005) return false;
    if (!path || !path.path || !path.path.length || path.path.length < 2) return false;
    return path;
    precision = Number((Number(precision) + 0.000002).toFixed(7));
    var pathfinder = new PathFinder(features, {
      precision: precision
    });
    var newPath = pathfinder.findPath(fromPoint, toPoint);
    return validatePath(fromPoint, toPoint, features, newPath);
  }
  ;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Routing);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUV4UCxDQUFDLEVBQUUwUyxFQUFFLENBQUN0TyxNQUFNLENBQUM7UUFDaEQ7UUFFQSxPQUFPc0wsRUFBRTtNQUNiLENBQUMsRUFBRSxFQUFFLENBQUM7SUFDVixPQUFPO01BQ0hyRixRQUFRLEVBQUVBLFFBQVE7TUFDbEJ5QixLQUFLLEVBQUVBO0lBQ1gsQ0FBQztFQUNMO0VBQUM7RUFFRCxTQUFTL0QsWUFBWUEsQ0FBQ1QsU0FBUyxFQUFFQyxPQUFPLEVBQUVNLElBQUksRUFBRTtJQUM1QyxJQUFJTixPQUFPLElBQUlBLE9BQU8sQ0FBQ3JHLElBQUksS0FBSyxXQUFXLEVBQUUsT0FBTyxLQUFLO0lBQ3pEO0lBQ0EsSUFBSSxDQUFDMkcsSUFBSSxJQUFJLENBQUNBLElBQUksQ0FBQ0EsSUFBSSxJQUFJLENBQUNBLElBQUksQ0FBQ0EsSUFBSSxDQUFDekQsTUFBTSxJQUFJeUQsSUFBSSxDQUFDQSxJQUFJLENBQUN6RCxNQUFNLEdBQUcsQ0FBQyxFQUFFLE9BQU8sS0FBSztJQUNsRixPQUFPeUQsSUFBSTtJQUVYbUMsU0FBUyxHQUFHZ0osTUFBTSxDQUFDLENBQUNBLE1BQU0sQ0FBQ2hKLFNBQVMsQ0FBQyxHQUFHLFFBQVEsRUFBRWlKLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM3RCxJQUFJdkwsVUFBVSxHQUFHLElBQUlDLFVBQVUsQ0FBQ3JCLFFBQVEsRUFBRTtNQUFFMEQsU0FBUyxFQUFFQTtJQUFVLENBQUMsQ0FBQztJQUNuRSxJQUFJa0osT0FBTyxHQUFHeEwsVUFBVSxDQUFDSSxRQUFRLENBQUNSLFNBQVMsRUFBRUMsT0FBTyxDQUFDO0lBQ3JELE9BQU9RLFlBQVksQ0FBQ1QsU0FBUyxFQUFFQyxPQUFPLEVBQUVqQixRQUFRLEVBQUU0TSxPQUFPLENBQUM7RUFDOUQ7RUFBQztBQUNMLENBQUM7QUFFRCxpRUFBZWhOLE9BQU8iLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9Ac29sdXRlZ3JhdGUvZ2VvZmxvLXNkay8uL3NyYy9Sb3V0aW5nLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQG1peGluXG4gKiBAbWVtYmVyb2YgbW9kdWxlOmdlb2Zsb1xuICogQG5hbWUgUm91dGluZ1xuICogQGRlc2NyaXB0aW9uIFRoaXMgbW9kdWxlIHByb3ZpZGVzIHRoZSByb3V0aW5nIGZ1bmN0aW9uYWxpdHkgZm9yIHRoZSBHZW9mbG8gYXBwbGljYXRpb24uIEl0IGFsbG93cyB1c2VycyB0byBjYWxjdWxhdGUgcm91dGVzIGJldHdlZW4gdHdvIHBvaW50cyBvbiB0aGUgbWFwIHVzaW5nIGEgUGF0aEZpbmRlciBvYmplY3QuXG4gKiBAcGFyYW0ge09iamVjdH0gbW9kZSAtIFRoZSBtb2RlIG9iamVjdCBjb250YWluaW5nIHRoZSB0eXBlIG9mIG1vZGUuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBSb3V0aW5nIG9iamVjdC5cbiAqL1xuY29uc3QgUm91dGluZyA9IGZ1bmN0aW9uIChtb2RlKSB7XG4gICAgY29uc3QgZ2VvZmxvID0gdGhpcy5nZW9mbG87XG5cbiAgICB0aGlzLnR5cGUgPSBtb2RlLnR5cGU7XG4gICAgdGhpcy5ncmFwaERhdGEgPSB7fTtcbiAgICB0aGlzLmZlYXR1cmVzID0gZ2VvZmxvLmdldERyYXduRmVhdHVyZXMoKTtcblxuXHQvKipcblx0ICogQGZ1bmN0aW9uXG4gICAgICogQG1lbWJlcm9mIG1vZHVsZTpnZW9mbG8uUm91dGluZ1xuXHQgKiBAbmFtZSBhY3RpdmF0ZVxuXHQgKiBAZGVzY3JpcHRpb24gQWN0aXZhdGVzIHRoZSBmdW5jdGlvbmFsaXR5IGJ5IHNldHRpbmcgdGhlICdlbmFibGVkJyBwcm9wZXJ0eSB0byB0cnVlIGFuZCBlbmFibGluZyByb3V0aW5nIGluIHRoZSBvcHRpb25zLlxuXHQgKiBAcGFyYW1zIHt2b2lkfSBOb25lXG5cdCAqIEByZXR1cm5zIHt2b2lkfVxuXHQgKi9cbiAgICB0aGlzLmFjdGl2YXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmVuYWJsZWQgPSB0cnVlO1xuICAgICAgICBnZW9mbG8ub3B0aW9uc1sncm91dGluZyddLmVuYWJsZSA9IHRydWU7XG4gICAgfTtcblxuXHQvKipcblx0ICogQGZ1bmN0aW9uXG4gICAgICogQG1lbWJlcm9mIG1vZHVsZTpnZW9mbG8uUm91dGluZ1xuXHQgKiBAbmFtZSBkZWFjdGl2YXRlXG5cdCAqIEBkZXNjcmlwdGlvbiBUaGlzIGZ1bmN0aW9uIGRlYWN0aXZhdGVzIHRoZSByb3V0aW5nIGZlYXR1cmUgYnkgc2V0dGluZyB0aGUgZW5hYmxlZCBmbGFnIHRvIGZhbHNlLCBkaXNhYmxpbmcgcm91dGluZyBpbiB0aGUgb3B0aW9ucywgYW5kIGNsZWFyaW5nIHRoZSByb3V0ZSBkYXRhIG9uIHRoZSBtYXAuXG5cdCAqIEByZXR1cm5zIHt2b2lkfVxuXHQgKi9cbiAgICB0aGlzLmRlYWN0aXZhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuZW5hYmxlZCA9IGZhbHNlO1xuICAgICAgICBnZW9mbG8ub3B0aW9uc1sncm91dGluZyddLmVuYWJsZSA9IGZhbHNlO1xuICAgICAgICBnZW9mbG8ubWFwLmdldFNvdXJjZShnZW9mbG8uc3RhdGljcy5jb25zdGFudHMuc291cmNlc1snUk9VVEUnXSkuc2V0RGF0YSh0dXJmLmZlYXR1cmVDb2xsZWN0aW9uKFtdKSk7XG4gICAgfTtcblxuXHQvKipcblx0ICogQGZ1bmN0aW9uXG4gICAgICogQG1lbWJlcm9mIG1vZHVsZTpnZW9mbG8uUm91dGluZ1xuXHQgKiBAbmFtZSBnZXRSb3V0ZVxuXHQgKiBAZGVzY3JpcHRpb24gVGhpcyBmdW5jdGlvbiBjYWxjdWxhdGVzIGEgcm91dGUgYmV0d2VlbiB0d28gcG9pbnRzIG9uIGEgbWFwIHVzaW5nIGEgUGF0aEZpbmRlciBvYmplY3QuIEl0IGNoZWNrcyBpZiB0aGUgcm91dGluZyBmZWF0dXJlIGlzIGVuYWJsZWQgYW5kIGlmIHRoZSBtYXAgaXMgbm90IGN1cnJlbnRseSBtb3ZpbmcuIEl0IHRoZW4gY3JlYXRlcyBhIGZlYXR1cmUgY29sbGVjdGlvbiBmcm9tIHRoZSBleGlzdGluZyBmZWF0dXJlcywgaW5pdGlhbGl6ZXMgYSBQYXRoRmluZGVyIG9iamVjdCwgYW5kIGZpbmRzIGEgcGF0aCBiZXR3ZWVuIHRoZSB0d28gcG9pbnRzLiBUaGUgcGF0aCBpcyB2YWxpZGF0ZWQgYW5kIHRoZW4gYWRkZWQgdG8gdGhlIG1hcCB3aXRoIGEgJ3JvdXRpbmcuYWRkJyBldmVudC5cblx0ICogQHBhcmFtIHtPYmplY3R9IGZyb21Qb2ludCAtIFRoZSBzdGFydGluZyBwb2ludCBmb3IgdGhlIHJvdXRlLlxuXHQgKiBAcGFyYW0ge09iamVjdH0gdG9Qb2ludCAtIFRoZSBkZXN0aW5hdGlvbiBwb2ludCBmb3IgdGhlIHJvdXRlLlxuXHQgKiBAcmV0dXJucyB7QXJyYXl8Ym9vbGVhbn0gVGhlIGNhbGN1bGF0ZWQgcm91dGUgcGF0aCBhcyBhbiBhcnJheSBvZiBwb2ludHMsIG9yIGZhbHNlIGlmIHRoZSByb3V0ZSBjb3VsZCBub3QgYmUgY2FsY3VsYXRlZC5cblx0ICovXG4gICAgdGhpcy5nZXRSb3V0ZSA9IGZ1bmN0aW9uIChmcm9tUG9pbnQsIHRvUG9pbnQpIHtcbiAgICAgICAgaWYgKCF0aGlzLmVuYWJsZWQgfHwgZ2VvZmxvLm1hcE1vdmluZykgcmV0dXJuIGZhbHNlO1xuICAgICAgICB2YXIgZmVhdHVyZXMgPSB0dXJmLmZlYXR1cmVDb2xsZWN0aW9uKHRoaXMuZ2V0RmVhdHVyZXMoKSk7XG4gICAgICAgIHZhciBwYXRoZmluZGVyID0gbmV3IFBhdGhGaW5kZXIoZmVhdHVyZXMsIGdlb2Zsby5vcHRpb25zLnJvdXRpbmcpO1xuICAgICAgICB2YXIgcGF0aCA9IHBhdGhmaW5kZXIuZmluZFBhdGggPyBwYXRoZmluZGVyLmZpbmRQYXRoKGZyb21Qb2ludCwgdG9Qb2ludCkgOiBmYWxzZTtcbiAgICAgICAgcGF0aCA9IHZhbGlkYXRlUGF0aChmcm9tUG9pbnQsIHRvUG9pbnQsIHBhdGgpO1xuICAgICAgICBnZW9mbG8uZmlyZSgncm91dGluZy5hZGQnLCB7IGZyb206IGZyb21Qb2ludCwgdG86IHRvUG9pbnQsIHBhdGg6IHBhdGggfSk7XG4gICAgICAgIHJldHVybiBwYXRoO1xuICAgIH07XG5cblx0LyoqXG5cdCAqIEBmdW5jdGlvblxuICAgICAqIEBtZW1iZXJvZiBtb2R1bGU6Z2VvZmxvLlJvdXRpbmdcblx0ICogQG5hbWUgZ2V0TWF0Y2hcblx0ICogQGRlc2NyaXB0aW9uIFJldHJpZXZlcyBhIG1hdGNoIGZvciB0aGUgZ2l2ZW4gY29vcmRpbmF0ZXMgdXNpbmcgdGhlIEV4cGxvcmluZyBzZXJ2aWNlLiBTZXRzIHRoZSBtYXRjaCBhcyBhIHN0YXJ0aW5nIHBvaW50IGZvciByb3V0aW5nLlxuXHQgKiBAcGFyYW0ge09iamVjdH0gY29vcmRzIC0gVGhlIGNvb3JkaW5hdGVzIGZvciB3aGljaCB0byBmaW5kIGEgbWF0Y2guXG5cdCAqIEByZXR1cm5zIHtQcm9taXNlPE9iamVjdD59IFRoZSBtYXRjaGVkIGZlYXR1cmUgd2l0aCByb3V0aW5nIHByb3BlcnR5IHNldCB0byB0cnVlLlxuXHQgKi9cbiAgICB0aGlzLmdldE1hdGNoID0gYXN5bmMgZnVuY3Rpb24gKGNvb3Jkcykge1xuICAgICAgICBpZiAoIWdlb2Zsby5FeHBsb3JpbmcpIHJldHVybiB7fTtcbiAgICAgICAgdmFyIGZlYXR1cmUgPSBhd2FpdCBnZW9mbG8uRXhwbG9yaW5nLmdldE1hdGNoKGNvb3JkcywgeyBzZXQ6IHRydWUsIHN0YXJ0OiBnZW9mbG8uc3RhcnRQb2ludCB9KTtcbiAgICAgICAgZmVhdHVyZS5wcm9wZXJ0aWVzLnJvdXRpbmcgPSB0cnVlO1xuICAgICAgICByZXR1cm4gZmVhdHVyZTtcbiAgICB9XG5cblx0LyoqXG5cdCAqIEBmdW5jdGlvblxuICAgICAqIEBtZW1iZXJvZiBtb2R1bGU6Z2VvZmxvLlJvdXRpbmdcblx0ICogQG5hbWUgZ2V0Q2xvc2VzdFxuXHQgKiBAZGVzY3JpcHRpb24gQ2FsY3VsYXRlcyB0aGUgY2xvc2VzdCBwb2ludCBvbiBhIHJvdXRlIGJhc2VkIG9uIHRoZSBsYXN0IGNsaWNrIGFuZCB0aGUgY2xvc2VzdCBwb2ludCB0byBpdC5cblx0ICogQHJldHVybnMge09iamVjdHxib29sZWFufSBSZXR1cm5zIGEgR2VvSlNPTiBMaW5lU3RyaW5nIGZlYXR1cmUgd2l0aCByb3V0aW5nIHByb3BlcnR5IHNldCB0byB0cnVlIGlmIHN1Y2Nlc3NmdWwsIG90aGVyd2lzZSBmYWxzZS5cblx0ICovXG4gICAgdGhpcy5nZXRDbG9zZXN0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIWdlb2Zsby5jbG9zZXN0UG9pbnQgfHwgIWdlb2Zsby5sYXN0Q2xpY2spIHJldHVybiBmYWxzZTtcbiAgICAgICAgdmFyIHJvdXRlID0gdGhpcy5nZXRSb3V0ZShnZW9mbG8ubGFzdENsaWNrLCBnZW9mbG8uY2xvc2VzdFBvaW50KTtcbiAgICAgICAgaWYgKCFyb3V0ZSB8fCAhcm91dGUucGF0aCkgcmV0dXJuIGZhbHNlO1xuICAgICAgICB2YXIgZmVhdHVyZSA9IHR1cmYubGluZVN0cmluZyhyb3V0ZS5wYXRoKTtcbiAgICAgICAgZmVhdHVyZS5wcm9wZXJ0aWVzLnJvdXRpbmcgPSB0cnVlO1xuICAgICAgICByZXR1cm4gZmVhdHVyZTtcbiAgICB9O1xuXG5cdC8qKlxuXHQgKiBAZnVuY3Rpb25cbiAgICAgKiBAbWVtYmVyb2YgbW9kdWxlOmdlb2Zsby5Sb3V0aW5nXG5cdCAqIEBuYW1lIGdldEZlYXR1cmVzXG5cdCAqIEBkZXNjcmlwdGlvbiBSZXRyaWV2ZXMgZmVhdHVyZXMgb2YgdHlwZSAnTGluZVN0cmluZycgZnJvbSB0aGUgbWVzaCBpbmRleC5cblx0ICogQHJldHVybnMge0FycmF5fSBBbiBhcnJheSBvZiBmZWF0dXJlcyBvZiB0eXBlICdMaW5lU3RyaW5nJy5cblx0ICovXG4gICAgdGhpcy5nZXRGZWF0dXJlcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGZlYXR1cmVzID0gW2dlb2Zsby5nZXRTbmFwRmVhdHVyZXMoKSwgZ2VvZmxvLmdldERyYXduRmVhdHVyZXMoKV0uZmxhdCgpO1xuICAgICAgICByZXR1cm4gZmVhdHVyZXMuZmlsdGVyKGZ1bmN0aW9uKGZlYXR1cmUpIHsgcmV0dXJuIGZlYXR1cmUuZ2VvbWV0cnkudHlwZSA9PT0gJ0xpbmVTdHJpbmcnIH0pO1xuICAgIH07XG5cbiAgICBcbiAgICBpZiAoZ2VvZmxvLm9wdGlvbnNbJ3JvdXRpbmcnXS5lbmFibGUpIHRoaXMuYWN0aXZhdGUoKTtcblxuXG4gICAgZnVuY3Rpb24gUGF0aEZpbmRlcihmZWF0dXJlcywgb3B0aW9ucykge1xuICAgICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICAgICAgXG4gICAgICAgIGlmICghZmVhdHVyZXMuY29tcGFjdGVkVmVydGljZXMpIHsgZmVhdHVyZXMgPSBwcmVwcm9jZXNzKGZlYXR1cmVzLCBvcHRpb25zKTsgfVxuXG4gICAgICAgIHRoaXMuX2dyYXBoID0gZmVhdHVyZXM7XG4gICAgICAgIHRoaXMuX2tleUZuID0gb3B0aW9ucy5rZXlGbiB8fCBmdW5jdGlvbihjKSB7IHJldHVybiBjLmpvaW4oJywnKTsgfTtcbiAgICAgICAgdGhpcy5fcHJlY2lzaW9uID0gb3B0aW9ucy5wcmVjaXNpb24gfHwgMWUtNTtcbiAgICAgICAgdGhpcy5fb3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgXG4gICAgICAgIGlmIChPYmplY3Qua2V5cyh0aGlzLl9ncmFwaC5jb21wYWN0ZWRWZXJ0aWNlcykuZmlsdGVyKGZ1bmN0aW9uKGspIHsgcmV0dXJuIGsgIT09ICdlZGdlRGF0YSc7IH0pLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmZpbmRQYXRoID0gZnVuY3Rpb24oYSwgYikge1xuICAgICAgICAgICAgdmFyIHN0YXJ0ID0gdGhpcy5fa2V5Rm4ocm91bmRDb29yZChhLmNvb3JkcywgdGhpcy5fcHJlY2lzaW9uKSksXG4gICAgICAgICAgICAgICAgZmluaXNoID0gdGhpcy5fa2V5Rm4ocm91bmRDb29yZChiLmNvb3JkcywgdGhpcy5fcHJlY2lzaW9uKSk7XG4gICAgXG4gICAgICAgICAgICBpZiAoIXRoaXMuX2dyYXBoLnZlcnRpY2VzW3N0YXJ0XSB8fCAhdGhpcy5fZ3JhcGgudmVydGljZXNbZmluaXNoXSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgIFxuICAgICAgICAgICAgdmFyIHBoYW50b21TdGFydCA9IHRoaXMuX2NyZWF0ZVBoYW50b20oc3RhcnQpO1xuICAgICAgICAgICAgdmFyIHBoYW50b21FbmQgPSB0aGlzLl9jcmVhdGVQaGFudG9tKGZpbmlzaCk7XG4gICAgXG4gICAgICAgICAgICB2YXIgcGF0aCA9IGZpbmRQYXRoKHRoaXMuX2dyYXBoLmNvbXBhY3RlZFZlcnRpY2VzLCBzdGFydCwgZmluaXNoKTtcbiAgICBcbiAgICAgICAgICAgIGlmIChwYXRoKSB7XG4gICAgICAgICAgICAgICAgdmFyIHdlaWdodCA9IHBhdGhbMF07XG4gICAgICAgICAgICAgICAgcGF0aCA9IHBhdGhbMV07XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgZnVsbFBhdGg6IHBhdGgsXG4gICAgICAgICAgICAgICAgICAgIHBhdGg6IHBhdGgucmVkdWNlKGZ1bmN0aW9uIGJ1aWxkUGF0aChjcywgdiwgaSwgdnMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNzID0gY3MuY29uY2F0KHRoaXMuX2dyYXBoLmNvbXBhY3RlZENvb3JkaW5hdGVzW3ZzW2kgLSAxXV1bdl0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNzO1xuICAgICAgICAgICAgICAgICAgICB9LmJpbmQodGhpcyksIFtdKS5jb25jYXQoW3RoaXMuX2dyYXBoLnNvdXJjZVZlcnRpY2VzW2ZpbmlzaF1dKSxcbiAgICAgICAgICAgICAgICAgICAgd2VpZ2h0OiB3ZWlnaHQsXG4gICAgICAgICAgICAgICAgICAgIGVkZ2VEYXRhczogdGhpcy5fZ3JhcGguY29tcGFjdGVkRWRnZXMgXG4gICAgICAgICAgICAgICAgICAgICAgICA/IHBhdGgucmVkdWNlKGZ1bmN0aW9uIGJ1aWxkRWRnZURhdGEoZWRzLCB2LCBpLCB2cykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlZHMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWR1Y2VkRWRnZTogdGhpcy5fZ3JhcGguY29tcGFjdGVkRWRnZXNbdnNbaSAtIDFdXVt2XVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVkcztcbiAgICAgICAgICAgICAgICAgICAgICAgIH0uYmluZCh0aGlzKSwgW10pXG4gICAgICAgICAgICAgICAgICAgICAgICA6IHVuZGVmaW5lZFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgIFxuICAgICAgICAgICAgdGhpcy5fcmVtb3ZlUGhhbnRvbShwaGFudG9tU3RhcnQpO1xuICAgICAgICAgICAgdGhpcy5fcmVtb3ZlUGhhbnRvbShwaGFudG9tRW5kKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2VyaWFsaXplID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZ3JhcGg7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9jcmVhdGVQaGFudG9tID0gZnVuY3Rpb24obikge1xuICAgICAgICAgICAgaWYgKHRoaXMuX2dyYXBoLmNvbXBhY3RlZFZlcnRpY2VzW25dKSByZXR1cm4gbnVsbDtcbiAgICBcbiAgICAgICAgICAgIHZhciBwaGFudG9tID0gY29tcGFjdE5vZGUobiwgdGhpcy5fZ3JhcGgudmVydGljZXMsIHRoaXMuX2dyYXBoLmNvbXBhY3RlZFZlcnRpY2VzLCB0aGlzLl9ncmFwaC5zb3VyY2VWZXJ0aWNlcywgdGhpcy5fZ3JhcGguZWRnZURhdGEsIHRydWUsIHRoaXMuX29wdGlvbnMpO1xuICAgICAgICAgICAgdGhpcy5fZ3JhcGguY29tcGFjdGVkVmVydGljZXNbbl0gPSBwaGFudG9tLmVkZ2VzO1xuICAgICAgICAgICAgdGhpcy5fZ3JhcGguY29tcGFjdGVkQ29vcmRpbmF0ZXNbbl0gPSBwaGFudG9tLmNvb3JkaW5hdGVzO1xuICAgIFxuICAgICAgICAgICAgaWYgKHRoaXMuX2dyYXBoLmNvbXBhY3RlZEVkZ2VzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZ3JhcGguY29tcGFjdGVkRWRnZXNbbl0gPSBwaGFudG9tLnJlZHVjZWRFZGdlcztcbiAgICAgICAgICAgIH1cbiAgICBcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKHBoYW50b20uaW5jb21pbmdFZGdlcykuZm9yRWFjaChmdW5jdGlvbihuZWlnaGJvcikge1xuICAgICAgICAgICAgICAgIHRoaXMuX2dyYXBoLmNvbXBhY3RlZFZlcnRpY2VzW25laWdoYm9yXVtuXSA9IHBoYW50b20uaW5jb21pbmdFZGdlc1tuZWlnaGJvcl07XG4gICAgICAgICAgICAgICAgdGhpcy5fZ3JhcGguY29tcGFjdGVkQ29vcmRpbmF0ZXNbbmVpZ2hib3JdW25dID0gW3RoaXMuX2dyYXBoLnNvdXJjZVZlcnRpY2VzW25laWdoYm9yXV0uY29uY2F0KHBoYW50b20uaW5jb21pbmdDb29yZGluYXRlc1tuZWlnaGJvcl0uc2xpY2UoMCwgLTEpKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fZ3JhcGguY29tcGFjdGVkRWRnZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZ3JhcGguY29tcGFjdGVkRWRnZXNbbmVpZ2hib3JdW25dID0gcGhhbnRvbS5yZWR1Y2VkRWRnZXNbbmVpZ2hib3JdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0uYmluZCh0aGlzKSlcbiAgICBcbiAgICAgICAgICAgIHJldHVybiBuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fcmVtb3ZlUGhhbnRvbSA9IGZ1bmN0aW9uKG4pIHtcbiAgICAgICAgICAgIGlmICghbikgcmV0dXJuO1xuICAgIFxuICAgICAgICAgICAgT2JqZWN0LmtleXModGhpcy5fZ3JhcGguY29tcGFjdGVkVmVydGljZXNbbl0pLmZvckVhY2goZnVuY3Rpb24obmVpZ2hib3IpIHtcbiAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5fZ3JhcGguY29tcGFjdGVkVmVydGljZXNbbmVpZ2hib3JdW25dO1xuICAgICAgICAgICAgfS5iaW5kKHRoaXMpKTtcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKHRoaXMuX2dyYXBoLmNvbXBhY3RlZENvb3JkaW5hdGVzW25dKS5mb3JFYWNoKGZ1bmN0aW9uKG5laWdoYm9yKSB7XG4gICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuX2dyYXBoLmNvbXBhY3RlZENvb3JkaW5hdGVzW25laWdoYm9yXVtuXTtcbiAgICAgICAgICAgIH0uYmluZCh0aGlzKSk7XG4gICAgICAgICAgICBpZiAodGhpcy5fZ3JhcGguY29tcGFjdGVkRWRnZXMpIHtcbiAgICAgICAgICAgICAgICBPYmplY3Qua2V5cyh0aGlzLl9ncmFwaC5jb21wYWN0ZWRFZGdlc1tuXSkuZm9yRWFjaChmdW5jdGlvbihuZWlnaGJvcikge1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5fZ3JhcGguY29tcGFjdGVkRWRnZXNbbmVpZ2hib3JdW25dO1xuICAgICAgICAgICAgICAgIH0uYmluZCh0aGlzKSk7XG4gICAgICAgICAgICB9XG4gICAgXG4gICAgICAgICAgICBkZWxldGUgdGhpcy5fZ3JhcGguY29tcGFjdGVkVmVydGljZXNbbl07XG4gICAgICAgICAgICBkZWxldGUgdGhpcy5fZ3JhcGguY29tcGFjdGVkQ29vcmRpbmF0ZXNbbl07XG4gICAgXG4gICAgICAgICAgICBpZiAodGhpcy5fZ3JhcGguY29tcGFjdGVkRWRnZXMpIHtcbiAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5fZ3JhcGguY29tcGFjdGVkRWRnZXNbbl07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gU2hvcnRlc3RQYXRoICgpIHtcbiAgICAgICAgdmFyIElORklOSVRZID0gMSAvIDA7XG4gICAgICAgIHRoaXMudmVydGljZXMgPSB7fTtcbiAgICBcbiAgICAgICAgdGhpcy5hZGRWZXJ0ZXggPSBmdW5jdGlvbiAobmFtZSwgZWRnZXMpIHtcbiAgICAgICAgICAgIHRoaXMudmVydGljZXNbbmFtZV0gPSBlZGdlcztcbiAgICAgICAgfTtcbiAgICBcbiAgICAgICAgdGhpcy5zZXRWZXJ0aWNlcyA9IGZ1bmN0aW9uIChncmFwaCkge1xuICAgICAgICAgICAgdGhpcy52ZXJ0aWNlcyA9IGdyYXBoO1xuICAgICAgICB9O1xuICAgIFxuICAgICAgICB0aGlzLnNob3J0ZXN0UGF0aCA9IGZ1bmN0aW9uIChzdGFydCwgZmluaXNoKSB7XG4gICAgICAgICAgICB2YXIgbm9kZXMgPSBuZXcgUHJpb3JpdHlRdWV1ZSgpLFxuICAgICAgICAgICAgICAgIGRpc3RhbmNlcyA9IHt9LFxuICAgICAgICAgICAgICAgIHByZXZpb3VzID0ge30sXG4gICAgICAgICAgICAgICAgcGF0aCA9IFtdLFxuICAgICAgICAgICAgICAgIHNtYWxsZXN0LCB2ZXJ0ZXgsIG5laWdoYm9yLCBhbHQ7XG4gICAgICAgIFxuICAgICAgICAgICAgZm9yICh2ZXJ0ZXggaW4gdGhpcy52ZXJ0aWNlcykge1xuICAgICAgICAgICAgICAgIGlmICh2ZXJ0ZXggPT09IHN0YXJ0KSB7XG4gICAgICAgICAgICAgICAgICAgIGRpc3RhbmNlc1t2ZXJ0ZXhdID0gMDtcbiAgICAgICAgICAgICAgICAgICAgbm9kZXMuZW5xdWV1ZSgwLCB2ZXJ0ZXgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGRpc3RhbmNlc1t2ZXJ0ZXhdID0gSU5GSU5JVFk7XG4gICAgICAgICAgICAgICAgICAgIG5vZGVzLmVucXVldWUoSU5GSU5JVFksIHZlcnRleCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgICAgICAgICBwcmV2aW91c1t2ZXJ0ZXhdID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgICAgICB3aGlsZSAoIW5vZGVzLmlzRW1wdHkoKSkge1xuICAgICAgICAgICAgICAgIHNtYWxsZXN0ID0gbm9kZXMuZGVxdWV1ZSgpO1xuICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiAoc21hbGxlc3QgPT09IGZpbmlzaCkge1xuICAgICAgICAgICAgICAgICAgICBwYXRoID0gW107XG4gICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKHByZXZpb3VzW3NtYWxsZXN0XSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGF0aC5wdXNoKHNtYWxsZXN0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNtYWxsZXN0ID0gcHJldmlvdXNbc21hbGxlc3RdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiAoIXNtYWxsZXN0IHx8IGRpc3RhbmNlc1tzbWFsbGVzdF0gPT09IElORklOSVRZKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgICAgICAgICAgZm9yIChuZWlnaGJvciBpbiB0aGlzLnZlcnRpY2VzW3NtYWxsZXN0XSkge1xuICAgICAgICAgICAgICAgICAgICBhbHQgPSBkaXN0YW5jZXNbc21hbGxlc3RdICsgdGhpcy52ZXJ0aWNlc1tzbWFsbGVzdF1bbmVpZ2hib3JdO1xuICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFsdCA8IGRpc3RhbmNlc1tuZWlnaGJvcl0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3RhbmNlc1tuZWlnaGJvcl0gPSBhbHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcmV2aW91c1tuZWlnaGJvcl0gPSBzbWFsbGVzdDtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZXMuZW5xdWV1ZShhbHQsIG5laWdoYm9yKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgICAgICByZXR1cm4gcGF0aDtcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIFxuICAgIGZ1bmN0aW9uIFByaW9yaXR5UXVldWUoKSB7XG4gICAgICAgIHRoaXMuX25vZGVzID0gW107XG4gICAgXG4gICAgICAgIHRoaXMuZW5xdWV1ZSA9IGZ1bmN0aW9uIChwcmlvcml0eSwga2V5KSB7XG4gICAgICAgICAgICB0aGlzLl9ub2Rlcy5wdXNoKHtrZXk6IGtleSwgcHJpb3JpdHk6IHByaW9yaXR5fSk7XG4gICAgICAgICAgICB0aGlzLnNvcnQoKTtcbiAgICAgICAgfTtcbiAgICBcbiAgICAgICAgdGhpcy5kZXF1ZXVlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX25vZGVzLnNoaWZ0KCkua2V5O1xuICAgICAgICB9O1xuICAgIFxuICAgICAgICB0aGlzLnNvcnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLl9ub2Rlcy5zb3J0KChhLCBiKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGEucHJpb3JpdHkgLSBiLnByaW9yaXR5O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgXG4gICAgICAgIHRoaXMuaXNFbXB0eSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiAhdGhpcy5fbm9kZXMubGVuZ3RoO1xuICAgICAgICB9O1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBUaW55UXVldWUoZGF0YSwgY29tcGFyZSkge1xuICAgICAgICBpZiAoIGRhdGEgPT09IHZvaWQgMCApIGRhdGEgPSBbXTtcbiAgICAgICAgaWYgKCBjb21wYXJlID09PSB2b2lkIDAgKSBjb21wYXJlID0gZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgICAgICAgIHJldHVybiBhIDwgYiA/IC0xIDogYSA+IGIgPyAxIDogMDtcbiAgICAgICAgfTtcbiAgICBcbiAgICAgICAgdGhpcy5kYXRhID0gZGF0YTtcbiAgICAgICAgdGhpcy5sZW5ndGggPSB0aGlzLmRhdGEubGVuZ3RoO1xuICAgICAgICB0aGlzLmNvbXBhcmUgPSBjb21wYXJlO1xuICAgIFxuICAgICAgICBpZiAodGhpcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gKHRoaXMubGVuZ3RoID4+IDEpIC0gMTsgaSA+PSAwOyBpLS0pIHsgdGhpcy5fZG93bihpKTsgfVxuICAgICAgICB9XG4gICAgXG4gICAgICAgIHRoaXMucHVzaCA9IGZ1bmN0aW9uIHB1c2ggKGl0ZW0pIHtcbiAgICAgICAgICAgIHRoaXMuZGF0YS5wdXNoKGl0ZW0pO1xuICAgICAgICAgICAgdGhpcy5sZW5ndGgrKztcbiAgICAgICAgICAgIHRoaXMuX3VwKHRoaXMubGVuZ3RoIC0gMSk7XG4gICAgICAgIH07XG4gICAgICAgIFxuICAgICAgICB0aGlzLnBvcCA9IGZ1bmN0aW9uIHBvcCAoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5sZW5ndGggPT09IDApIHsgcmV0dXJuIHVuZGVmaW5lZDsgfVxuICAgICAgICBcbiAgICAgICAgICAgIHZhciB0b3AgPSB0aGlzLmRhdGFbMF07XG4gICAgICAgICAgICB2YXIgYm90dG9tID0gdGhpcy5kYXRhLnBvcCgpO1xuICAgICAgICAgICAgdGhpcy5sZW5ndGgtLTtcbiAgICAgICAgXG4gICAgICAgICAgICBpZiAodGhpcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhWzBdID0gYm90dG9tO1xuICAgICAgICAgICAgICAgIHRoaXMuX2Rvd24oMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuIHRvcDtcbiAgICAgICAgfTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMucGVlayA9IGZ1bmN0aW9uIHBlZWsgKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGF0YVswXTtcbiAgICAgICAgfTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuX3VwID0gZnVuY3Rpb24gX3VwIChwb3MpIHtcbiAgICAgICAgICAgIHZhciByZWYgPSB0aGlzO1xuICAgICAgICAgICAgICAgIHZhciBkYXRhID0gcmVmLmRhdGE7XG4gICAgICAgICAgICAgICAgdmFyIGNvbXBhcmUgPSByZWYuY29tcGFyZTtcbiAgICAgICAgICAgIHZhciBpdGVtID0gZGF0YVtwb3NdO1xuICAgICAgICBcbiAgICAgICAgICAgIHdoaWxlIChwb3MgPiAwKSB7XG4gICAgICAgICAgICAgICAgdmFyIHBhcmVudCA9IChwb3MgLSAxKSA+PiAxO1xuICAgICAgICAgICAgICAgIHZhciBjdXJyZW50ID0gZGF0YVtwYXJlbnRdO1xuICAgICAgICAgICAgICAgIGlmIChjb21wYXJlKGl0ZW0sIGN1cnJlbnQpID49IDApIHsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICBkYXRhW3Bvc10gPSBjdXJyZW50O1xuICAgICAgICAgICAgICAgIHBvcyA9IHBhcmVudDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgICAgICBkYXRhW3Bvc10gPSBpdGVtO1xuICAgICAgICB9O1xuICAgICAgICBcbiAgICAgICAgdGhpcy5fZG93biA9IGZ1bmN0aW9uIF9kb3duIChwb3MpIHtcbiAgICAgICAgICAgIHZhciByZWYgPSB0aGlzO1xuICAgICAgICAgICAgICAgIHZhciBkYXRhID0gcmVmLmRhdGE7XG4gICAgICAgICAgICAgICAgdmFyIGNvbXBhcmUgPSByZWYuY29tcGFyZTtcbiAgICAgICAgICAgIHZhciBoYWxmTGVuZ3RoID0gdGhpcy5sZW5ndGggPj4gMTtcbiAgICAgICAgICAgIHZhciBpdGVtID0gZGF0YVtwb3NdO1xuICAgICAgICBcbiAgICAgICAgICAgIHdoaWxlIChwb3MgPCBoYWxmTGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdmFyIGxlZnQgPSAocG9zIDw8IDEpICsgMTtcbiAgICAgICAgICAgICAgICB2YXIgYmVzdCA9IGRhdGFbbGVmdF07XG4gICAgICAgICAgICAgICAgdmFyIHJpZ2h0ID0gbGVmdCArIDE7XG4gICAgICAgIFxuICAgICAgICAgICAgICAgIGlmIChyaWdodCA8IHRoaXMubGVuZ3RoICYmIGNvbXBhcmUoZGF0YVtyaWdodF0sIGJlc3QpIDwgMCkge1xuICAgICAgICAgICAgICAgICAgICBsZWZ0ID0gcmlnaHQ7XG4gICAgICAgICAgICAgICAgICAgIGJlc3QgPSBkYXRhW3JpZ2h0XTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGNvbXBhcmUoYmVzdCwgaXRlbSkgPj0gMCkgeyBicmVhazsgfVxuICAgICAgICBcbiAgICAgICAgICAgICAgICBkYXRhW3Bvc10gPSBiZXN0O1xuICAgICAgICAgICAgICAgIHBvcyA9IGxlZnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgICAgZGF0YVtwb3NdID0gaXRlbTtcbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gZmluZE5leHRFbmQocHJldiwgdiwgdmVydGljZXMsIGVuZHMsIHZlcnRleENvb3JkcywgZWRnZURhdGEsIHRyYWNrSW5jb21pbmcsIG9wdGlvbnMpIHtcbiAgICAgICAgdmFyIHdlaWdodCA9IHZlcnRpY2VzW3ByZXZdW3ZdLFxuICAgICAgICAgICAgcmV2ZXJzZVdlaWdodCA9IHZlcnRpY2VzW3ZdW3ByZXZdLFxuICAgICAgICAgICAgY29vcmRpbmF0ZXMgPSBbXSxcbiAgICAgICAgICAgIHBhdGggPSBbXSxcbiAgICAgICAgICAgIHJlZHVjZWRFZGdlID0gb3B0aW9ucy5lZGdlRGF0YVNlZWQ7XG4gICAgICAgICAgICBcbiAgICAgICAgaWYgKG9wdGlvbnMuZWRnZURhdGFSZWR1Y2VGbikge1xuICAgICAgICAgICAgcmVkdWNlZEVkZ2UgPSBvcHRpb25zLmVkZ2VEYXRhUmVkdWNlRm4ocmVkdWNlZEVkZ2UsIGVkZ2VEYXRhW3ZdW3ByZXZdKTtcbiAgICAgICAgfVxuICAgIFxuICAgICAgICB3aGlsZSAoIWVuZHNbdl0pIHtcbiAgICAgICAgICAgIHZhciBlZGdlcyA9IHZlcnRpY2VzW3ZdO1xuICAgIFxuICAgICAgICAgICAgaWYgKCFlZGdlcykgeyBicmVhazsgfVxuICAgIFxuICAgICAgICAgICAgdmFyIG5leHQgPSBPYmplY3Qua2V5cyhlZGdlcykuZmlsdGVyKGZ1bmN0aW9uIG5vdFByZXZpb3VzKGspIHsgcmV0dXJuIGsgIT09IHByZXY7IH0pWzBdO1xuICAgICAgICAgICAgd2VpZ2h0ICs9IGVkZ2VzW25leHRdO1xuICAgIFxuICAgICAgICAgICAgaWYgKHRyYWNrSW5jb21pbmcpIHtcbiAgICAgICAgICAgICAgICByZXZlcnNlV2VpZ2h0ICs9IHZlcnRpY2VzW25leHRdW3ZdO1xuICAgIFxuICAgICAgICAgICAgICAgIGlmIChwYXRoLmluZGV4T2YodikgPj0gMCkge1xuICAgICAgICAgICAgICAgICAgICBlbmRzW3ZdID0gdmVydGljZXNbdl07XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBwYXRoLnB1c2godik7XG4gICAgICAgICAgICB9XG4gICAgXG4gICAgICAgICAgICBpZiAob3B0aW9ucy5lZGdlRGF0YVJlZHVjZUZuKSB7XG4gICAgICAgICAgICAgICAgcmVkdWNlZEVkZ2UgPSBvcHRpb25zLmVkZ2VEYXRhUmVkdWNlRm4ocmVkdWNlZEVkZ2UsIGVkZ2VEYXRhW3ZdW25leHRdKTtcbiAgICAgICAgICAgIH1cbiAgICBcbiAgICAgICAgICAgIGNvb3JkaW5hdGVzLnB1c2godmVydGV4Q29vcmRzW3ZdKTtcbiAgICAgICAgICAgIHByZXYgPSB2O1xuICAgICAgICAgICAgdiA9IG5leHQ7XG4gICAgICAgIH1cbiAgICBcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHZlcnRleDogdixcbiAgICAgICAgICAgIHdlaWdodDogd2VpZ2h0LFxuICAgICAgICAgICAgcmV2ZXJzZVdlaWdodDogcmV2ZXJzZVdlaWdodCxcbiAgICAgICAgICAgIGNvb3JkaW5hdGVzOiBjb29yZGluYXRlcyxcbiAgICAgICAgICAgIHJlZHVjZWRFZGdlOiByZWR1Y2VkRWRnZVxuICAgICAgICB9O1xuICAgIH07XG4gICAgXG4gICAgZnVuY3Rpb24gY29tcGFjdE5vZGUoaywgdmVydGljZXMsIGVuZHMsIHZlcnRleENvb3JkcywgZWRnZURhdGEsIHRyYWNrSW5jb21pbmcsIG9wdGlvbnMpIHtcbiAgICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgICAgIHZhciBuZWlnaGJvcnMgPSB2ZXJ0aWNlc1trXTtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKG5laWdoYm9ycykucmVkdWNlKGZ1bmN0aW9uIGNvbXBhY3RFZGdlKHJlc3VsdCwgaikge1xuICAgICAgICAgICAgdmFyIG5laWdoYm9yID0gZmluZE5leHRFbmQoaywgaiwgdmVydGljZXMsIGVuZHMsIHZlcnRleENvb3JkcywgZWRnZURhdGEsIHRyYWNrSW5jb21pbmcsIG9wdGlvbnMpO1xuICAgICAgICAgICAgdmFyIHdlaWdodCA9IG5laWdoYm9yLndlaWdodDtcbiAgICAgICAgICAgIHZhciByZXZlcnNlV2VpZ2h0ID0gbmVpZ2hib3IucmV2ZXJzZVdlaWdodDtcbiAgICAgICAgICAgIGlmIChuZWlnaGJvci52ZXJ0ZXggIT09IGspIHtcbiAgICAgICAgICAgICAgICBpZiAoIXJlc3VsdC5lZGdlc1tuZWlnaGJvci52ZXJ0ZXhdIHx8IHJlc3VsdC5lZGdlc1tuZWlnaGJvci52ZXJ0ZXhdID4gd2VpZ2h0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5lZGdlc1tuZWlnaGJvci52ZXJ0ZXhdID0gd2VpZ2h0O1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQuY29vcmRpbmF0ZXNbbmVpZ2hib3IudmVydGV4XSA9IFt2ZXJ0ZXhDb29yZHNba11dLmNvbmNhdChuZWlnaGJvci5jb29yZGluYXRlcyk7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5yZWR1Y2VkRWRnZXNbbmVpZ2hib3IudmVydGV4XSA9IG5laWdoYm9yLnJlZHVjZWRFZGdlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodHJhY2tJbmNvbWluZyAmJiBcbiAgICAgICAgICAgICAgICAgICAgIWlzTmFOKHJldmVyc2VXZWlnaHQpICYmICghcmVzdWx0LmluY29taW5nRWRnZXNbbmVpZ2hib3IudmVydGV4XSB8fCByZXN1bHQuaW5jb21pbmdFZGdlc1tuZWlnaGJvci52ZXJ0ZXhdID4gcmV2ZXJzZVdlaWdodCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LmluY29taW5nRWRnZXNbbmVpZ2hib3IudmVydGV4XSA9IHJldmVyc2VXZWlnaHQ7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjb29yZGluYXRlcyA9IFt2ZXJ0ZXhDb29yZHNba11dLmNvbmNhdChuZWlnaGJvci5jb29yZGluYXRlcyk7XG4gICAgICAgICAgICAgICAgICAgIGNvb3JkaW5hdGVzLnJldmVyc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LmluY29taW5nQ29vcmRpbmF0ZXNbbmVpZ2hib3IudmVydGV4XSA9IGNvb3JkaW5hdGVzO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH0sIHtlZGdlczoge30sIGluY29taW5nRWRnZXM6IHt9LCBjb29yZGluYXRlczoge30sIGluY29taW5nQ29vcmRpbmF0ZXM6IHt9LCByZWR1Y2VkRWRnZXM6IHt9fSk7XG4gICAgfTtcbiAgICBcbiAgICBmdW5jdGlvbiBjb21wYWN0R3JhcGgodmVydGljZXMsIHZlcnRleENvb3JkcywgZWRnZURhdGEsIG9wdGlvbnMpIHtcbiAgICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgICAgIHZhciBwcm9ncmVzcyA9IG9wdGlvbnMucHJvZ3Jlc3M7XG4gICAgICAgIHZhciBlbmRzID0gT2JqZWN0LmtleXModmVydGljZXMpLnJlZHVjZShmdW5jdGlvbiBmaW5kRW5kcyhlcywgaywgaSwgdnMpIHtcbiAgICAgICAgICAgIHZhciB2ZXJ0ZXggPSB2ZXJ0aWNlc1trXTtcbiAgICAgICAgICAgIHZhciBlZGdlcyA9IE9iamVjdC5rZXlzKHZlcnRleCk7XG4gICAgICAgICAgICB2YXIgbnVtYmVyRWRnZXMgPSBlZGdlcy5sZW5ndGg7XG4gICAgICAgICAgICB2YXIgcmVtb3ZlO1xuICAgIFxuICAgICAgICAgICAgaWYob3B0aW9ucy5jb21wYWN0ID09PSBmYWxzZSkgIHtcbiAgICAgICAgICAgICAgICByZW1vdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobnVtYmVyRWRnZXMgPT09IDEpIHtcbiAgICAgICAgICAgICAgICB2YXIgb3RoZXIgPSB2ZXJ0aWNlc1tlZGdlc1swXV07XG4gICAgICAgICAgICAgICAgcmVtb3ZlID0gIW90aGVyW2tdO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChudW1iZXJFZGdlcyA9PT0gMikge1xuICAgICAgICAgICAgICAgIHJlbW92ZSA9IGVkZ2VzLmZpbHRlcihmdW5jdGlvbihuKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB2ZXJ0aWNlc1tuXVtrXTtcbiAgICAgICAgICAgICAgICB9KS5sZW5ndGggPT09IG51bWJlckVkZ2VzO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZW1vdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKCFyZW1vdmUpIHtcbiAgICAgICAgICAgICAgICBlc1trXSA9IHZlcnRleDtcbiAgICAgICAgICAgIH1cbiAgICBcbiAgICAgICAgICAgIGlmIChpICUgMTAwMCA9PT0gMCAmJiBwcm9ncmVzcykge1xuICAgICAgICAgICAgICAgIHByb2dyZXNzKCdjb21wYWN0OmVuZHMnLCBpLCB2cy5sZW5ndGgpO1xuICAgICAgICAgICAgfVxuICAgIFxuICAgICAgICAgICAgcmV0dXJuIGVzO1xuICAgICAgICB9LCB7fSk7XG4gICAgXG4gICAgICAgIHJldHVybiBPYmplY3Qua2V5cyhlbmRzKS5yZWR1Y2UoZnVuY3Rpb24gY29tcGFjdEVuZChyZXN1bHQsIGssIGksIGVzKSB7XG4gICAgICAgICAgICB2YXIgY29tcGFjdGVkID0gY29tcGFjdE5vZGUoaywgdmVydGljZXMsIGVuZHMsIHZlcnRleENvb3JkcywgZWRnZURhdGEsIGZhbHNlLCBvcHRpb25zKTtcbiAgICAgICAgICAgIHJlc3VsdC5ncmFwaFtrXSA9IGNvbXBhY3RlZC5lZGdlcztcbiAgICAgICAgICAgIHJlc3VsdC5jb29yZGluYXRlc1trXSA9IGNvbXBhY3RlZC5jb29yZGluYXRlcztcbiAgICBcbiAgICAgICAgICAgIGlmIChvcHRpb25zLmVkZ2VEYXRhUmVkdWNlRm4pIHtcbiAgICAgICAgICAgICAgICByZXN1bHQucmVkdWNlZEVkZ2VzW2tdID0gY29tcGFjdGVkLnJlZHVjZWRFZGdlcztcbiAgICAgICAgICAgIH1cbiAgICBcbiAgICAgICAgICAgIGlmIChpICUgMTAwMCA9PT0gMCAmJiBwcm9ncmVzcykge1xuICAgICAgICAgICAgICAgIHByb2dyZXNzKCdjb21wYWN0Om5vZGVzJywgaSwgZXMubGVuZ3RoKTtcbiAgICAgICAgICAgIH1cbiAgICBcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH0sIHtncmFwaDoge30sIGNvb3JkaW5hdGVzOiB7fSwgcmVkdWNlZEVkZ2VzOiB7fX0pO1xuICAgIH07XG4gICAgXG4gICAgZnVuY3Rpb24gZmluZFBhdGgoZ3JhcGgsIHN0YXJ0LCBlbmQpIHtcbiAgICAgICAgdmFyIGNvc3RzID0ge307XG4gICAgICAgIGNvc3RzW3N0YXJ0XSA9IDA7XG4gICAgICAgIHZhciBpbml0aWFsU3RhdGUgPSBbMCwgW3N0YXJ0XSwgc3RhcnRdO1xuICAgICAgICB2YXIgcXVldWUgPSBuZXcgVGlueVF1ZXVlKFtpbml0aWFsU3RhdGVdLCBmdW5jdGlvbihhLCBiKSB7IHJldHVybiBhWzBdIC0gYlswXTsgfSk7XG4gICAgICAgIHZhciBleHBsb3JlZCA9IHt9O1xuICAgIFxuICAgICAgICB3aGlsZSAocXVldWUubGVuZ3RoKSB7XG4gICAgICAgICAgICB2YXIgc3RhdGUgPSBxdWV1ZS5wb3AoKTtcbiAgICAgICAgICAgIHZhciBjb3N0ID0gc3RhdGVbMF07XG4gICAgICAgICAgICB2YXIgbm9kZSA9IHN0YXRlWzJdO1xuICAgICAgICAgICAgaWYgKG5vZGUgPT09IGVuZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBzdGF0ZS5zbGljZSgwLCAyKTtcbiAgICAgICAgICAgIH1cbiAgICBcbiAgICAgICAgICAgIHZhciBuZWlnaGJvdXJzID0gZ3JhcGhbbm9kZV07XG4gICAgICAgICAgICBPYmplY3Qua2V5cyhuZWlnaGJvdXJzKS5mb3JFYWNoKGZ1bmN0aW9uKG4pIHtcbiAgICAgICAgICAgICAgICB2YXIgbmV3Q29zdCA9IGNvc3QgKyBuZWlnaGJvdXJzW25dO1xuICAgICAgICAgICAgICAgIGlmICghKG4gaW4gY29zdHMpIHx8IG5ld0Nvc3QgPCBjb3N0c1tuXSkge1xuICAgICAgICAgICAgICAgICAgICBjb3N0c1tuXSA9IG5ld0Nvc3Q7XG4gICAgICAgICAgICAgICAgICAgIHZhciBuZXdTdGF0ZSA9IFtuZXdDb3N0LCBzdGF0ZVsxXS5jb25jYXQoW25dKSwgbl07XG4gICAgICAgICAgICAgICAgICAgIHF1ZXVlLnB1c2gobmV3U3RhdGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH07XG4gICAgXG4gICAgZnVuY3Rpb24gcHJlcHJvY2VzcyhncmFwaCwgb3B0aW9ucykge1xuICAgICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICAgICAgICB2YXIgdG9wbztcblxuICAgICAgICB2YXIgd2VpZ2h0Rm4gPSBvcHRpb25zLndlaWdodEZuIHx8IGZ1bmN0aW9uIGRlZmF1bHRXZWlnaHRGbihhLCBiKSB7XG4gICAgICAgICAgICByZXR1cm4gdHVyZi5kaXN0YW5jZSh0dXJmLnBvaW50KGEpLCB0dXJmLnBvaW50KGIpKTtcbiAgICAgICAgfVxuICAgIFxuICAgICAgICBpZiAoZ3JhcGgudHlwZSA9PT0gJ0ZlYXR1cmVDb2xsZWN0aW9uJykge1xuICAgICAgICAgICAgLy8gR3JhcGggaXMgR2VvSlNPTiBkYXRhLCBjcmVhdGUgYSB0b3BvbG9neSBmcm9tIGl0XG4gICAgICAgICAgICB0b3BvID0gdG9wb2xvZ3koZ3JhcGgsIG9wdGlvbnMpO1xuICAgICAgICB9IGVsc2UgaWYgKGdyYXBoLmVkZ2VzKSB7XG4gICAgICAgICAgICAvLyBHcmFwaCBpcyBhIHByZXByb2Nlc3NlZCB0b3BvbG9neVxuICAgICAgICAgICAgdG9wbyA9IGdyYXBoO1xuICAgICAgICB9XG4gICAgXG4gICAgICAgIHZhciBncmFwaCA9IHRvcG8uZWRnZXMucmVkdWNlKGZ1bmN0aW9uIGJ1aWxkR3JhcGgoZywgZWRnZSwgaSwgZXMpIHtcbiAgICAgICAgICAgIHZhciBhID0gZWRnZVswXSxcbiAgICAgICAgICAgICAgICBiID0gZWRnZVsxXSxcbiAgICAgICAgICAgICAgICBwcm9wcyA9IGVkZ2VbMl0sXG4gICAgICAgICAgICAgICAgdyA9IHdlaWdodEZuKHRvcG8udmVydGljZXNbYV0sIHRvcG8udmVydGljZXNbYl0sIHByb3BzKSxcbiAgICAgICAgICAgICAgICBtYWtlRWRnZUxpc3QgPSBmdW5jdGlvbiBtYWtlRWRnZUxpc3Qobm9kZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWcudmVydGljZXNbbm9kZV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGcudmVydGljZXNbbm9kZV0gPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLmVkZ2VEYXRhUmVkdWNlRm4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnLmVkZ2VEYXRhW25vZGVdID0ge307XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGNvbmNhdEVkZ2UgPSBmdW5jdGlvbiBjb25jYXRFZGdlKHN0YXJ0Tm9kZSwgZW5kTm9kZSwgd2VpZ2h0KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB2ID0gZy52ZXJ0aWNlc1tzdGFydE5vZGVdO1xuICAgICAgICAgICAgICAgICAgICB2W2VuZE5vZGVdID0gd2VpZ2h0O1xuICAgICAgICAgICAgICAgICAgICBpZiAob3B0aW9ucy5lZGdlRGF0YVJlZHVjZUZuKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBnLmVkZ2VEYXRhW3N0YXJ0Tm9kZV1bZW5kTm9kZV0gPSBvcHRpb25zLmVkZ2VEYXRhUmVkdWNlRm4ob3B0aW9ucy5lZGdlRGF0YVNlZWQsIHByb3BzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH07XG4gICAgXG4gICAgICAgICAgICBpZiAodykge1xuICAgICAgICAgICAgICAgIG1ha2VFZGdlTGlzdChhKTtcbiAgICAgICAgICAgICAgICBtYWtlRWRnZUxpc3QoYik7XG4gICAgICAgICAgICAgICAgaWYgKHcgaW5zdGFuY2VvZiBPYmplY3QpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHcuZm9yd2FyZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uY2F0RWRnZShhLCBiLCB3LmZvcndhcmQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh3LmJhY2t3YXJkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25jYXRFZGdlKGIsIGEsIHcuYmFja3dhcmQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY29uY2F0RWRnZShhLCBiLCB3KTtcbiAgICAgICAgICAgICAgICAgICAgY29uY2F0RWRnZShiLCBhLCB3KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgXG4gICAgICAgICAgICBpZiAoaSAlIDEwMDAgPT09IDAgJiYgb3B0aW9ucy5wcm9ncmVzcykge1xuICAgICAgICAgICAgICAgIG9wdGlvbnMucHJvZ3Jlc3MoJ2VkZ2V3ZWlnaHRzJywgaSxlcy5sZW5ndGgpO1xuICAgICAgICAgICAgfVxuICAgIFxuICAgICAgICAgICAgcmV0dXJuIGc7XG4gICAgICAgIH0sIHtlZGdlRGF0YToge30sIHZlcnRpY2VzOiB7fX0pO1xuICAgIFxuICAgICAgICB2YXIgY29tcGFjdCA9IGNvbXBhY3RHcmFwaChncmFwaC52ZXJ0aWNlcywgdG9wby52ZXJ0aWNlcywgZ3JhcGguZWRnZURhdGEsIG9wdGlvbnMpO1xuICAgIFxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdmVydGljZXM6IGdyYXBoLnZlcnRpY2VzLFxuICAgICAgICAgICAgZWRnZURhdGE6IGdyYXBoLmVkZ2VEYXRhLFxuICAgICAgICAgICAgc291cmNlVmVydGljZXM6IHRvcG8udmVydGljZXMsXG4gICAgICAgICAgICBjb21wYWN0ZWRWZXJ0aWNlczogY29tcGFjdC5ncmFwaCxcbiAgICAgICAgICAgIGNvbXBhY3RlZENvb3JkaW5hdGVzOiBjb21wYWN0LmNvb3JkaW5hdGVzLFxuICAgICAgICAgICAgY29tcGFjdGVkRWRnZXM6IG9wdGlvbnMuZWRnZURhdGFSZWR1Y2VGbiA/IGNvbXBhY3QucmVkdWNlZEVkZ2VzIDogbnVsbFxuICAgICAgICB9O1xuICAgIH07XG4gICAgXG4gICAgZnVuY3Rpb24gcm91bmRDb29yZChjLCBwcmVjaXNpb24pIHtcbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgIE1hdGgucm91bmQoY1swXSAvIHByZWNpc2lvbikgKiBwcmVjaXNpb24sXG4gICAgICAgICAgICBNYXRoLnJvdW5kKGNbMV0gLyBwcmVjaXNpb24pICogcHJlY2lzaW9uLFxuICAgICAgICBdO1xuICAgIH07XG4gICAgXG4gICAgZnVuY3Rpb24gZ2VvSnNvblJlZHVjZShnZW9qc29uLCBmbiwgc2VlZCkge1xuICAgICAgICBpZiAoZ2VvanNvbi50eXBlID09PSAnRmVhdHVyZUNvbGxlY3Rpb24nKSB7XG4gICAgICAgICAgICByZXR1cm4gZ2VvanNvbi5mZWF0dXJlcy5yZWR1Y2UoZnVuY3Rpb24gcmVkdWNlRmVhdHVyZXMoYSwgZikge1xuICAgICAgICAgICAgICAgIHJldHVybiBnZW9Kc29uUmVkdWNlKGYsIGZuLCBhKTtcbiAgICAgICAgICAgIH0sIHNlZWQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZuKHNlZWQsIGdlb2pzb24pO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBcbiAgICBmdW5jdGlvbiBnZW9Kc29uRmlsdGVyRmVhdHVyZXMoZ2VvanNvbiwgZm4pIHtcbiAgICAgICAgdmFyIGZlYXR1cmVzID0gW107XG4gICAgICAgIGlmIChnZW9qc29uLnR5cGUgPT09ICdGZWF0dXJlQ29sbGVjdGlvbicpIHtcbiAgICAgICAgICAgIGZlYXR1cmVzID0gZmVhdHVyZXMuY29uY2F0KGdlb2pzb24uZmVhdHVyZXMuZmlsdGVyKGZuKSk7XG4gICAgICAgIH1cbiAgICBcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHR5cGU6ICdGZWF0dXJlQ29sbGVjdGlvbicsXG4gICAgICAgICAgICBmZWF0dXJlczogZmVhdHVyZXNcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIFxuICAgIGZ1bmN0aW9uIGlzTGluZVN0cmluZyhmKSB7XG4gICAgICAgIHJldHVybiBmLmdlb21ldHJ5LnR5cGUgPT09ICdMaW5lU3RyaW5nJztcbiAgICB9O1xuICAgIFxuICAgIGZ1bmN0aW9uIHRvcG9sb2d5KGdlb2pzb24sIG9wdGlvbnMpIHtcbiAgICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgICAgIHZhciBrZXlGbiA9IG9wdGlvbnMua2V5Rm4gfHwgZnVuY3Rpb24gZGVmYXVsdEtleUZuKGMpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYy5qb2luKCcsJyk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcHJlY2lzaW9uID0gb3B0aW9ucy5wcmVjaXNpb24gfHwgMWUtNTtcbiAgICBcbiAgICAgICAgdmFyIGxpbmVTdHJpbmdzID0gZ2VvSnNvbkZpbHRlckZlYXR1cmVzKGdlb2pzb24sIGlzTGluZVN0cmluZyk7XG4gICAgICAgIHZhciBleHBsb2RlZExpbmVTdHJpbmdzID0gdHVyZi5leHBsb2RlKGxpbmVTdHJpbmdzKTtcbiAgICAgICAgdmFyIHZlcnRpY2VzID0gZXhwbG9kZWRMaW5lU3RyaW5ncy5mZWF0dXJlcy5yZWR1Y2UoZnVuY3Rpb24gYnVpbGRUb3BvbG9neVZlcnRpY2VzKGNzLCBmLCBpLCBmcykge1xuICAgICAgICAgICAgICAgIHZhciByYyA9IHJvdW5kQ29vcmQoZi5nZW9tZXRyeS5jb29yZGluYXRlcywgcHJlY2lzaW9uKTtcbiAgICAgICAgICAgICAgICBjc1trZXlGbihyYyldID0gZi5nZW9tZXRyeS5jb29yZGluYXRlcztcbiAgICBcbiAgICAgICAgICAgICAgICBpZiAoaSAlIDEwMDAgPT09IDAgJiYgb3B0aW9ucy5wcm9ncmVzcykge1xuICAgICAgICAgICAgICAgICAgICBvcHRpb25zLnByb2dyZXNzKCd0b3BvOnZlcnRpY2VzJywgaSwgZnMubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNzO1xuICAgICAgICAgICAgfSwge30pLFxuICAgICAgICAgICAgZWRnZXMgPSBnZW9Kc29uUmVkdWNlKGxpbmVTdHJpbmdzLCBmdW5jdGlvbiBidWlsZFRvcG9sb2d5RWRnZXMoZXMsIGYsIGksIGZzKSB7XG4gICAgICAgICAgICAgICAgZi5nZW9tZXRyeS5jb29yZGluYXRlcy5mb3JFYWNoKGZ1bmN0aW9uIGJ1aWxkTGluZVN0cmluZ0VkZ2VzKGMsIGksIGNzKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGsxID0ga2V5Rm4ocm91bmRDb29yZChjc1tpIC0gMV0sIHByZWNpc2lvbikpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGsyID0ga2V5Rm4ocm91bmRDb29yZChjLCBwcmVjaXNpb24pKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVzLnB1c2goW2sxLCBrMiwgZi5wcm9wZXJ0aWVzXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICBcbiAgICAgICAgICAgICAgICBpZiAoaSAlIDEwMDAgPT09IDAgJiYgb3B0aW9ucy5wcm9ncmVzcykge1xuICAgICAgICAgICAgICAgICAgICBvcHRpb25zLnByb2dyZXNzKCd0b3BvOmVkZ2VzJywgaSwgZnMubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgXG4gICAgICAgICAgICAgICAgcmV0dXJuIGVzO1xuICAgICAgICAgICAgfSwgW10pO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdmVydGljZXM6IHZlcnRpY2VzLFxuICAgICAgICAgICAgZWRnZXM6IGVkZ2VzXG4gICAgICAgIH07XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIHZhbGlkYXRlUGF0aChmcm9tUG9pbnQsIHRvUG9pbnQsIHBhdGgpIHtcbiAgICAgICAgaWYgKHRvUG9pbnQgJiYgdG9Qb2ludC50eXBlID09PSAnbGluZXBvaW50JykgcmV0dXJuIGZhbHNlO1xuICAgICAgICAvL2lmIChwcmVjaXNpb24gPiAwLjAwMDUpIHJldHVybiBmYWxzZTtcbiAgICAgICAgaWYgKCFwYXRoIHx8ICFwYXRoLnBhdGggfHwgIXBhdGgucGF0aC5sZW5ndGggfHwgcGF0aC5wYXRoLmxlbmd0aCA8IDIpIHJldHVybiBmYWxzZTtcbiAgICAgICAgcmV0dXJuIHBhdGg7XG5cbiAgICAgICAgcHJlY2lzaW9uID0gTnVtYmVyKChOdW1iZXIocHJlY2lzaW9uKSArIDAuMDAwMDAyKS50b0ZpeGVkKDcpKTtcbiAgICAgICAgdmFyIHBhdGhmaW5kZXIgPSBuZXcgUGF0aEZpbmRlcihmZWF0dXJlcywgeyBwcmVjaXNpb246IHByZWNpc2lvbiB9KTtcbiAgICAgICAgdmFyIG5ld1BhdGggPSBwYXRoZmluZGVyLmZpbmRQYXRoKGZyb21Qb2ludCwgdG9Qb2ludCk7XG4gICAgICAgIHJldHVybiB2YWxpZGF0ZVBhdGgoZnJvbVBvaW50LCB0b1BvaW50LCBmZWF0dXJlcywgbmV3UGF0aCk7XG4gICAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFJvdXRpbmc7Il0sIm5hbWVzIjpbIl9yZWdlbmVyYXRvclJ1bnRpbWUiLCJlIiwidCIsInIiLCJPYmplY3QiLCJwcm90b3R5cGUiLCJuIiwiaGFzT3duUHJvcGVydHkiLCJvIiwiZGVmaW5lUHJvcGVydHkiLCJ2YWx1ZSIsImkiLCJTeW1ib2wiLCJhIiwiaXRlcmF0b3IiLCJjIiwiYXN5bmNJdGVyYXRvciIsInUiLCJ0b1N0cmluZ1RhZyIsImRlZmluZSIsImVudW1lcmFibGUiLCJjb25maWd1cmFibGUiLCJ3cml0YWJsZSIsIndyYXAiLCJHZW5lcmF0b3IiLCJjcmVhdGUiLCJDb250ZXh0IiwibWFrZUludm9rZU1ldGhvZCIsInRyeUNhdGNoIiwidHlwZSIsImFyZyIsImNhbGwiLCJoIiwibCIsImYiLCJzIiwieSIsIkdlbmVyYXRvckZ1bmN0aW9uIiwiR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUiLCJwIiwiZCIsImdldFByb3RvdHlwZU9mIiwidiIsInZhbHVlcyIsImciLCJkZWZpbmVJdGVyYXRvck1ldGhvZHMiLCJmb3JFYWNoIiwiX2ludm9rZSIsIkFzeW5jSXRlcmF0b3IiLCJpbnZva2UiLCJfdHlwZW9mIiwicmVzb2x2ZSIsIl9fYXdhaXQiLCJ0aGVuIiwiY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmciLCJFcnJvciIsImRvbmUiLCJtZXRob2QiLCJkZWxlZ2F0ZSIsIm1heWJlSW52b2tlRGVsZWdhdGUiLCJzZW50IiwiX3NlbnQiLCJkaXNwYXRjaEV4Y2VwdGlvbiIsImFicnVwdCIsIlR5cGVFcnJvciIsInJlc3VsdE5hbWUiLCJuZXh0IiwibmV4dExvYyIsInB1c2hUcnlFbnRyeSIsInRyeUxvYyIsImNhdGNoTG9jIiwiZmluYWxseUxvYyIsImFmdGVyTG9jIiwidHJ5RW50cmllcyIsInB1c2giLCJyZXNldFRyeUVudHJ5IiwiY29tcGxldGlvbiIsInJlc2V0IiwiaXNOYU4iLCJsZW5ndGgiLCJkaXNwbGF5TmFtZSIsImlzR2VuZXJhdG9yRnVuY3Rpb24iLCJjb25zdHJ1Y3RvciIsIm5hbWUiLCJtYXJrIiwic2V0UHJvdG90eXBlT2YiLCJfX3Byb3RvX18iLCJhd3JhcCIsImFzeW5jIiwiUHJvbWlzZSIsImtleXMiLCJyZXZlcnNlIiwicG9wIiwicHJldiIsImNoYXJBdCIsInNsaWNlIiwic3RvcCIsInJ2YWwiLCJoYW5kbGUiLCJjb21wbGV0ZSIsImZpbmlzaCIsIl9jYXRjaCIsImRlbGVnYXRlWWllbGQiLCJhc3luY0dlbmVyYXRvclN0ZXAiLCJfYXN5bmNUb0dlbmVyYXRvciIsImFyZ3VtZW50cyIsImFwcGx5IiwiX25leHQiLCJfdGhyb3ciLCJSb3V0aW5nIiwibW9kZSIsImdlb2ZsbyIsImdyYXBoRGF0YSIsImZlYXR1cmVzIiwiZ2V0RHJhd25GZWF0dXJlcyIsImFjdGl2YXRlIiwiZW5hYmxlZCIsIm9wdGlvbnMiLCJlbmFibGUiLCJkZWFjdGl2YXRlIiwibWFwIiwiZ2V0U291cmNlIiwic3RhdGljcyIsImNvbnN0YW50cyIsInNvdXJjZXMiLCJzZXREYXRhIiwidHVyZiIsImZlYXR1cmVDb2xsZWN0aW9uIiwiZ2V0Um91dGUiLCJmcm9tUG9pbnQiLCJ0b1BvaW50IiwibWFwTW92aW5nIiwiZ2V0RmVhdHVyZXMiLCJwYXRoZmluZGVyIiwiUGF0aEZpbmRlciIsInJvdXRpbmciLCJwYXRoIiwiZmluZFBhdGgiLCJ2YWxpZGF0ZVBhdGgiLCJmaXJlIiwiZnJvbSIsInRvIiwiZ2V0TWF0Y2giLCJfcmVmIiwiX2NhbGxlZSIsImNvb3JkcyIsImZlYXR1cmUiLCJfY2FsbGVlJCIsIl9jb250ZXh0IiwiRXhwbG9yaW5nIiwic2V0Iiwic3RhcnQiLCJzdGFydFBvaW50IiwicHJvcGVydGllcyIsIl94IiwiZ2V0Q2xvc2VzdCIsImNsb3Nlc3RQb2ludCIsImxhc3RDbGljayIsInJvdXRlIiwibGluZVN0cmluZyIsImdldFNuYXBGZWF0dXJlcyIsImZsYXQiLCJmaWx0ZXIiLCJnZW9tZXRyeSIsImNvbXBhY3RlZFZlcnRpY2VzIiwicHJlcHJvY2VzcyIsIl9ncmFwaCIsIl9rZXlGbiIsImtleUZuIiwiam9pbiIsIl9wcmVjaXNpb24iLCJwcmVjaXNpb24iLCJfb3B0aW9ucyIsImsiLCJiIiwicm91bmRDb29yZCIsInZlcnRpY2VzIiwicGhhbnRvbVN0YXJ0IiwiX2NyZWF0ZVBoYW50b20iLCJwaGFudG9tRW5kIiwid2VpZ2h0IiwiZnVsbFBhdGgiLCJyZWR1Y2UiLCJidWlsZFBhdGgiLCJjcyIsInZzIiwiY29uY2F0IiwiY29tcGFjdGVkQ29vcmRpbmF0ZXMiLCJiaW5kIiwic291cmNlVmVydGljZXMiLCJlZGdlRGF0YXMiLCJjb21wYWN0ZWRFZGdlcyIsImJ1aWxkRWRnZURhdGEiLCJlZHMiLCJyZWR1Y2VkRWRnZSIsInVuZGVmaW5lZCIsIl9yZW1vdmVQaGFudG9tIiwic2VyaWFsaXplIiwicGhhbnRvbSIsImNvbXBhY3ROb2RlIiwiZWRnZURhdGEiLCJlZGdlcyIsImNvb3JkaW5hdGVzIiwicmVkdWNlZEVkZ2VzIiwiaW5jb21pbmdFZGdlcyIsIm5laWdoYm9yIiwiaW5jb21pbmdDb29yZGluYXRlcyIsIlNob3J0ZXN0UGF0aCIsIklORklOSVRZIiwiYWRkVmVydGV4Iiwic2V0VmVydGljZXMiLCJncmFwaCIsInNob3J0ZXN0UGF0aCIsIm5vZGVzIiwiUHJpb3JpdHlRdWV1ZSIsImRpc3RhbmNlcyIsInByZXZpb3VzIiwic21hbGxlc3QiLCJ2ZXJ0ZXgiLCJhbHQiLCJlbnF1ZXVlIiwiaXNFbXB0eSIsImRlcXVldWUiLCJfbm9kZXMiLCJwcmlvcml0eSIsImtleSIsInNvcnQiLCJzaGlmdCIsIlRpbnlRdWV1ZSIsImRhdGEiLCJjb21wYXJlIiwiX2Rvd24iLCJpdGVtIiwiX3VwIiwidG9wIiwiYm90dG9tIiwicGVlayIsInBvcyIsInJlZiIsInBhcmVudCIsImN1cnJlbnQiLCJoYWxmTGVuZ3RoIiwibGVmdCIsImJlc3QiLCJyaWdodCIsImZpbmROZXh0RW5kIiwiZW5kcyIsInZlcnRleENvb3JkcyIsInRyYWNrSW5jb21pbmciLCJyZXZlcnNlV2VpZ2h0IiwiZWRnZURhdGFTZWVkIiwiZWRnZURhdGFSZWR1Y2VGbiIsIm5vdFByZXZpb3VzIiwiaW5kZXhPZiIsIm5laWdoYm9ycyIsImNvbXBhY3RFZGdlIiwicmVzdWx0IiwiaiIsImNvbXBhY3RHcmFwaCIsInByb2dyZXNzIiwiZmluZEVuZHMiLCJlcyIsIm51bWJlckVkZ2VzIiwicmVtb3ZlIiwiY29tcGFjdCIsIm90aGVyIiwiY29tcGFjdEVuZCIsImNvbXBhY3RlZCIsImVuZCIsImNvc3RzIiwiaW5pdGlhbFN0YXRlIiwicXVldWUiLCJleHBsb3JlZCIsInN0YXRlIiwiY29zdCIsIm5vZGUiLCJuZWlnaGJvdXJzIiwibmV3Q29zdCIsIm5ld1N0YXRlIiwidG9wbyIsIndlaWdodEZuIiwiZGVmYXVsdFdlaWdodEZuIiwiZGlzdGFuY2UiLCJwb2ludCIsInRvcG9sb2d5IiwiYnVpbGRHcmFwaCIsImVkZ2UiLCJwcm9wcyIsInciLCJtYWtlRWRnZUxpc3QiLCJjb25jYXRFZGdlIiwic3RhcnROb2RlIiwiZW5kTm9kZSIsImZvcndhcmQiLCJiYWNrd2FyZCIsIk1hdGgiLCJyb3VuZCIsImdlb0pzb25SZWR1Y2UiLCJnZW9qc29uIiwiZm4iLCJzZWVkIiwicmVkdWNlRmVhdHVyZXMiLCJnZW9Kc29uRmlsdGVyRmVhdHVyZXMiLCJpc0xpbmVTdHJpbmciLCJkZWZhdWx0S2V5Rm4iLCJsaW5lU3RyaW5ncyIsImV4cGxvZGVkTGluZVN0cmluZ3MiLCJleHBsb2RlIiwiYnVpbGRUb3BvbG9neVZlcnRpY2VzIiwiZnMiLCJyYyIsImJ1aWxkVG9wb2xvZ3lFZGdlcyIsImJ1aWxkTGluZVN0cmluZ0VkZ2VzIiwiazEiLCJrMiIsIk51bWJlciIsInRvRml4ZWQiLCJuZXdQYXRoIl0sInNvdXJjZVJvb3QiOiIifQ==