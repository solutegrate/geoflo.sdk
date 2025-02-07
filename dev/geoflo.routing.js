/*!
 * /*!
 *  * GeoFlo SDK
 *  * Version 1.1.11
 *  * Generated on: 2025-02-07T20:05:17.655Z
 *  * Copyright (c) 2022 - present | @solutegrate/geoflo
 *  * /
 */
"use strict";
(self["webpackChunk_solutegrate_geoflo"] = self["webpackChunk_solutegrate_geoflo"] || []).push([["routing"],{

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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UCxDQUFDLEVBQUUwUyxFQUFFLENBQUN0TyxNQUFNLENBQUM7UUFDaEQ7UUFFQSxPQUFPc0wsRUFBRTtNQUNiLENBQUMsRUFBRSxFQUFFLENBQUM7SUFDVixPQUFPO01BQ0hyRixRQUFRLEVBQUVBLFFBQVE7TUFDbEJ5QixLQUFLLEVBQUVBO0lBQ1gsQ0FBQztFQUNMO0VBQUM7RUFFRCxTQUFTL0QsWUFBWUEsQ0FBQ1QsU0FBUyxFQUFFQyxPQUFPLEVBQUVNLElBQUksRUFBRTtJQUM1QyxJQUFJTixPQUFPLElBQUlBLE9BQU8sQ0FBQ3JHLElBQUksS0FBSyxXQUFXLEVBQUUsT0FBTyxLQUFLO0lBQ3pEO0lBQ0EsSUFBSSxDQUFDMkcsSUFBSSxJQUFJLENBQUNBLElBQUksQ0FBQ0EsSUFBSSxJQUFJLENBQUNBLElBQUksQ0FBQ0EsSUFBSSxDQUFDekQsTUFBTSxJQUFJeUQsSUFBSSxDQUFDQSxJQUFJLENBQUN6RCxNQUFNLEdBQUcsQ0FBQyxFQUFFLE9BQU8sS0FBSztJQUNsRixPQUFPeUQsSUFBSTtJQUVYbUMsU0FBUyxHQUFHZ0osTUFBTSxDQUFDLENBQUNBLE1BQU0sQ0FBQ2hKLFNBQVMsQ0FBQyxHQUFHLFFBQVEsRUFBRWlKLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM3RCxJQUFJdkwsVUFBVSxHQUFHLElBQUlDLFVBQVUsQ0FBQ3JCLFFBQVEsRUFBRTtNQUFFMEQsU0FBUyxFQUFFQTtJQUFVLENBQUMsQ0FBQztJQUNuRSxJQUFJa0osT0FBTyxHQUFHeEwsVUFBVSxDQUFDSSxRQUFRLENBQUNSLFNBQVMsRUFBRUMsT0FBTyxDQUFDO0lBQ3JELE9BQU9RLFlBQVksQ0FBQ1QsU0FBUyxFQUFFQyxPQUFPLEVBQUVqQixRQUFRLEVBQUU0TSxPQUFPLENBQUM7RUFDOUQ7RUFBQztBQUNMLENBQUM7QUFFRCxpRUFBZWhOLE9BQU8iLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9Ac29sdXRlZ3JhdGUvZ2VvZmxvLy4vc3JjL1JvdXRpbmcuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbWl4aW5cbiAqIEBtZW1iZXJvZiBtb2R1bGU6Z2VvZmxvXG4gKiBAbmFtZSBSb3V0aW5nXG4gKiBAZGVzY3JpcHRpb24gVGhpcyBtb2R1bGUgcHJvdmlkZXMgdGhlIHJvdXRpbmcgZnVuY3Rpb25hbGl0eSBmb3IgdGhlIEdlb2ZsbyBhcHBsaWNhdGlvbi4gSXQgYWxsb3dzIHVzZXJzIHRvIGNhbGN1bGF0ZSByb3V0ZXMgYmV0d2VlbiB0d28gcG9pbnRzIG9uIHRoZSBtYXAgdXNpbmcgYSBQYXRoRmluZGVyIG9iamVjdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBtb2RlIC0gVGhlIG1vZGUgb2JqZWN0IGNvbnRhaW5pbmcgdGhlIHR5cGUgb2YgbW9kZS5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIFJvdXRpbmcgb2JqZWN0LlxuICovXG5jb25zdCBSb3V0aW5nID0gZnVuY3Rpb24gKG1vZGUpIHtcbiAgICBjb25zdCBnZW9mbG8gPSB0aGlzLmdlb2ZsbztcblxuICAgIHRoaXMudHlwZSA9IG1vZGUudHlwZTtcbiAgICB0aGlzLmdyYXBoRGF0YSA9IHt9O1xuICAgIHRoaXMuZmVhdHVyZXMgPSBnZW9mbG8uZ2V0RHJhd25GZWF0dXJlcygpO1xuXG5cdC8qKlxuXHQgKiBAZnVuY3Rpb25cbiAgICAgKiBAbWVtYmVyb2YgbW9kdWxlOmdlb2Zsby5Sb3V0aW5nXG5cdCAqIEBuYW1lIGFjdGl2YXRlXG5cdCAqIEBkZXNjcmlwdGlvbiBBY3RpdmF0ZXMgdGhlIGZ1bmN0aW9uYWxpdHkgYnkgc2V0dGluZyB0aGUgJ2VuYWJsZWQnIHByb3BlcnR5IHRvIHRydWUgYW5kIGVuYWJsaW5nIHJvdXRpbmcgaW4gdGhlIG9wdGlvbnMuXG5cdCAqIEBwYXJhbXMge3ZvaWR9IE5vbmVcblx0ICogQHJldHVybnMge3ZvaWR9XG5cdCAqL1xuICAgIHRoaXMuYWN0aXZhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuZW5hYmxlZCA9IHRydWU7XG4gICAgICAgIGdlb2Zsby5vcHRpb25zWydyb3V0aW5nJ10uZW5hYmxlID0gdHJ1ZTtcbiAgICB9O1xuXG5cdC8qKlxuXHQgKiBAZnVuY3Rpb25cbiAgICAgKiBAbWVtYmVyb2YgbW9kdWxlOmdlb2Zsby5Sb3V0aW5nXG5cdCAqIEBuYW1lIGRlYWN0aXZhdGVcblx0ICogQGRlc2NyaXB0aW9uIFRoaXMgZnVuY3Rpb24gZGVhY3RpdmF0ZXMgdGhlIHJvdXRpbmcgZmVhdHVyZSBieSBzZXR0aW5nIHRoZSBlbmFibGVkIGZsYWcgdG8gZmFsc2UsIGRpc2FibGluZyByb3V0aW5nIGluIHRoZSBvcHRpb25zLCBhbmQgY2xlYXJpbmcgdGhlIHJvdXRlIGRhdGEgb24gdGhlIG1hcC5cblx0ICogQHJldHVybnMge3ZvaWR9XG5cdCAqL1xuICAgIHRoaXMuZGVhY3RpdmF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5lbmFibGVkID0gZmFsc2U7XG4gICAgICAgIGdlb2Zsby5vcHRpb25zWydyb3V0aW5nJ10uZW5hYmxlID0gZmFsc2U7XG4gICAgICAgIGdlb2Zsby5tYXAuZ2V0U291cmNlKGdlb2Zsby5zdGF0aWNzLmNvbnN0YW50cy5zb3VyY2VzWydST1VURSddKS5zZXREYXRhKHR1cmYuZmVhdHVyZUNvbGxlY3Rpb24oW10pKTtcbiAgICB9O1xuXG5cdC8qKlxuXHQgKiBAZnVuY3Rpb25cbiAgICAgKiBAbWVtYmVyb2YgbW9kdWxlOmdlb2Zsby5Sb3V0aW5nXG5cdCAqIEBuYW1lIGdldFJvdXRlXG5cdCAqIEBkZXNjcmlwdGlvbiBUaGlzIGZ1bmN0aW9uIGNhbGN1bGF0ZXMgYSByb3V0ZSBiZXR3ZWVuIHR3byBwb2ludHMgb24gYSBtYXAgdXNpbmcgYSBQYXRoRmluZGVyIG9iamVjdC4gSXQgY2hlY2tzIGlmIHRoZSByb3V0aW5nIGZlYXR1cmUgaXMgZW5hYmxlZCBhbmQgaWYgdGhlIG1hcCBpcyBub3QgY3VycmVudGx5IG1vdmluZy4gSXQgdGhlbiBjcmVhdGVzIGEgZmVhdHVyZSBjb2xsZWN0aW9uIGZyb20gdGhlIGV4aXN0aW5nIGZlYXR1cmVzLCBpbml0aWFsaXplcyBhIFBhdGhGaW5kZXIgb2JqZWN0LCBhbmQgZmluZHMgYSBwYXRoIGJldHdlZW4gdGhlIHR3byBwb2ludHMuIFRoZSBwYXRoIGlzIHZhbGlkYXRlZCBhbmQgdGhlbiBhZGRlZCB0byB0aGUgbWFwIHdpdGggYSAncm91dGluZy5hZGQnIGV2ZW50LlxuXHQgKiBAcGFyYW0ge09iamVjdH0gZnJvbVBvaW50IC0gVGhlIHN0YXJ0aW5nIHBvaW50IGZvciB0aGUgcm91dGUuXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSB0b1BvaW50IC0gVGhlIGRlc3RpbmF0aW9uIHBvaW50IGZvciB0aGUgcm91dGUuXG5cdCAqIEByZXR1cm5zIHtBcnJheXxib29sZWFufSBUaGUgY2FsY3VsYXRlZCByb3V0ZSBwYXRoIGFzIGFuIGFycmF5IG9mIHBvaW50cywgb3IgZmFsc2UgaWYgdGhlIHJvdXRlIGNvdWxkIG5vdCBiZSBjYWxjdWxhdGVkLlxuXHQgKi9cbiAgICB0aGlzLmdldFJvdXRlID0gZnVuY3Rpb24gKGZyb21Qb2ludCwgdG9Qb2ludCkge1xuICAgICAgICBpZiAoIXRoaXMuZW5hYmxlZCB8fCBnZW9mbG8ubWFwTW92aW5nKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIHZhciBmZWF0dXJlcyA9IHR1cmYuZmVhdHVyZUNvbGxlY3Rpb24odGhpcy5nZXRGZWF0dXJlcygpKTtcbiAgICAgICAgdmFyIHBhdGhmaW5kZXIgPSBuZXcgUGF0aEZpbmRlcihmZWF0dXJlcywgZ2VvZmxvLm9wdGlvbnMucm91dGluZyk7XG4gICAgICAgIHZhciBwYXRoID0gcGF0aGZpbmRlci5maW5kUGF0aCA/IHBhdGhmaW5kZXIuZmluZFBhdGgoZnJvbVBvaW50LCB0b1BvaW50KSA6IGZhbHNlO1xuICAgICAgICBwYXRoID0gdmFsaWRhdGVQYXRoKGZyb21Qb2ludCwgdG9Qb2ludCwgcGF0aCk7XG4gICAgICAgIGdlb2Zsby5maXJlKCdyb3V0aW5nLmFkZCcsIHsgZnJvbTogZnJvbVBvaW50LCB0bzogdG9Qb2ludCwgcGF0aDogcGF0aCB9KTtcbiAgICAgICAgcmV0dXJuIHBhdGg7XG4gICAgfTtcblxuXHQvKipcblx0ICogQGZ1bmN0aW9uXG4gICAgICogQG1lbWJlcm9mIG1vZHVsZTpnZW9mbG8uUm91dGluZ1xuXHQgKiBAbmFtZSBnZXRNYXRjaFxuXHQgKiBAZGVzY3JpcHRpb24gUmV0cmlldmVzIGEgbWF0Y2ggZm9yIHRoZSBnaXZlbiBjb29yZGluYXRlcyB1c2luZyB0aGUgRXhwbG9yaW5nIHNlcnZpY2UuIFNldHMgdGhlIG1hdGNoIGFzIGEgc3RhcnRpbmcgcG9pbnQgZm9yIHJvdXRpbmcuXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBjb29yZHMgLSBUaGUgY29vcmRpbmF0ZXMgZm9yIHdoaWNoIHRvIGZpbmQgYSBtYXRjaC5cblx0ICogQHJldHVybnMge1Byb21pc2U8T2JqZWN0Pn0gVGhlIG1hdGNoZWQgZmVhdHVyZSB3aXRoIHJvdXRpbmcgcHJvcGVydHkgc2V0IHRvIHRydWUuXG5cdCAqL1xuICAgIHRoaXMuZ2V0TWF0Y2ggPSBhc3luYyBmdW5jdGlvbiAoY29vcmRzKSB7XG4gICAgICAgIGlmICghZ2VvZmxvLkV4cGxvcmluZykgcmV0dXJuIHt9O1xuICAgICAgICB2YXIgZmVhdHVyZSA9IGF3YWl0IGdlb2Zsby5FeHBsb3JpbmcuZ2V0TWF0Y2goY29vcmRzLCB7IHNldDogdHJ1ZSwgc3RhcnQ6IGdlb2Zsby5zdGFydFBvaW50IH0pO1xuICAgICAgICBmZWF0dXJlLnByb3BlcnRpZXMucm91dGluZyA9IHRydWU7XG4gICAgICAgIHJldHVybiBmZWF0dXJlO1xuICAgIH1cblxuXHQvKipcblx0ICogQGZ1bmN0aW9uXG4gICAgICogQG1lbWJlcm9mIG1vZHVsZTpnZW9mbG8uUm91dGluZ1xuXHQgKiBAbmFtZSBnZXRDbG9zZXN0XG5cdCAqIEBkZXNjcmlwdGlvbiBDYWxjdWxhdGVzIHRoZSBjbG9zZXN0IHBvaW50IG9uIGEgcm91dGUgYmFzZWQgb24gdGhlIGxhc3QgY2xpY2sgYW5kIHRoZSBjbG9zZXN0IHBvaW50IHRvIGl0LlxuXHQgKiBAcmV0dXJucyB7T2JqZWN0fGJvb2xlYW59IFJldHVybnMgYSBHZW9KU09OIExpbmVTdHJpbmcgZmVhdHVyZSB3aXRoIHJvdXRpbmcgcHJvcGVydHkgc2V0IHRvIHRydWUgaWYgc3VjY2Vzc2Z1bCwgb3RoZXJ3aXNlIGZhbHNlLlxuXHQgKi9cbiAgICB0aGlzLmdldENsb3Nlc3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghZ2VvZmxvLmNsb3Nlc3RQb2ludCB8fCAhZ2VvZmxvLmxhc3RDbGljaykgcmV0dXJuIGZhbHNlO1xuICAgICAgICB2YXIgcm91dGUgPSB0aGlzLmdldFJvdXRlKGdlb2Zsby5sYXN0Q2xpY2ssIGdlb2Zsby5jbG9zZXN0UG9pbnQpO1xuICAgICAgICBpZiAoIXJvdXRlIHx8ICFyb3V0ZS5wYXRoKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIHZhciBmZWF0dXJlID0gdHVyZi5saW5lU3RyaW5nKHJvdXRlLnBhdGgpO1xuICAgICAgICBmZWF0dXJlLnByb3BlcnRpZXMucm91dGluZyA9IHRydWU7XG4gICAgICAgIHJldHVybiBmZWF0dXJlO1xuICAgIH07XG5cblx0LyoqXG5cdCAqIEBmdW5jdGlvblxuICAgICAqIEBtZW1iZXJvZiBtb2R1bGU6Z2VvZmxvLlJvdXRpbmdcblx0ICogQG5hbWUgZ2V0RmVhdHVyZXNcblx0ICogQGRlc2NyaXB0aW9uIFJldHJpZXZlcyBmZWF0dXJlcyBvZiB0eXBlICdMaW5lU3RyaW5nJyBmcm9tIHRoZSBtZXNoIGluZGV4LlxuXHQgKiBAcmV0dXJucyB7QXJyYXl9IEFuIGFycmF5IG9mIGZlYXR1cmVzIG9mIHR5cGUgJ0xpbmVTdHJpbmcnLlxuXHQgKi9cbiAgICB0aGlzLmdldEZlYXR1cmVzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZmVhdHVyZXMgPSBbZ2VvZmxvLmdldFNuYXBGZWF0dXJlcygpLCBnZW9mbG8uZ2V0RHJhd25GZWF0dXJlcygpXS5mbGF0KCk7XG4gICAgICAgIHJldHVybiBmZWF0dXJlcy5maWx0ZXIoZnVuY3Rpb24oZmVhdHVyZSkgeyByZXR1cm4gZmVhdHVyZS5nZW9tZXRyeS50eXBlID09PSAnTGluZVN0cmluZycgfSk7XG4gICAgfTtcblxuICAgIFxuICAgIGlmIChnZW9mbG8ub3B0aW9uc1sncm91dGluZyddLmVuYWJsZSkgdGhpcy5hY3RpdmF0ZSgpO1xuXG5cbiAgICBmdW5jdGlvbiBQYXRoRmluZGVyKGZlYXR1cmVzLCBvcHRpb25zKSB7XG4gICAgICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgICAgICBcbiAgICAgICAgaWYgKCFmZWF0dXJlcy5jb21wYWN0ZWRWZXJ0aWNlcykgeyBmZWF0dXJlcyA9IHByZXByb2Nlc3MoZmVhdHVyZXMsIG9wdGlvbnMpOyB9XG5cbiAgICAgICAgdGhpcy5fZ3JhcGggPSBmZWF0dXJlcztcbiAgICAgICAgdGhpcy5fa2V5Rm4gPSBvcHRpb25zLmtleUZuIHx8IGZ1bmN0aW9uKGMpIHsgcmV0dXJuIGMuam9pbignLCcpOyB9O1xuICAgICAgICB0aGlzLl9wcmVjaXNpb24gPSBvcHRpb25zLnByZWNpc2lvbiB8fCAxZS01O1xuICAgICAgICB0aGlzLl9vcHRpb25zID0gb3B0aW9ucztcbiAgICBcbiAgICAgICAgaWYgKE9iamVjdC5rZXlzKHRoaXMuX2dyYXBoLmNvbXBhY3RlZFZlcnRpY2VzKS5maWx0ZXIoZnVuY3Rpb24oaykgeyByZXR1cm4gayAhPT0gJ2VkZ2VEYXRhJzsgfSkubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZmluZFBhdGggPSBmdW5jdGlvbihhLCBiKSB7XG4gICAgICAgICAgICB2YXIgc3RhcnQgPSB0aGlzLl9rZXlGbihyb3VuZENvb3JkKGEuY29vcmRzLCB0aGlzLl9wcmVjaXNpb24pKSxcbiAgICAgICAgICAgICAgICBmaW5pc2ggPSB0aGlzLl9rZXlGbihyb3VuZENvb3JkKGIuY29vcmRzLCB0aGlzLl9wcmVjaXNpb24pKTtcbiAgICBcbiAgICAgICAgICAgIGlmICghdGhpcy5fZ3JhcGgudmVydGljZXNbc3RhcnRdIHx8ICF0aGlzLl9ncmFwaC52ZXJ0aWNlc1tmaW5pc2hdKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgXG4gICAgICAgICAgICB2YXIgcGhhbnRvbVN0YXJ0ID0gdGhpcy5fY3JlYXRlUGhhbnRvbShzdGFydCk7XG4gICAgICAgICAgICB2YXIgcGhhbnRvbUVuZCA9IHRoaXMuX2NyZWF0ZVBoYW50b20oZmluaXNoKTtcbiAgICBcbiAgICAgICAgICAgIHZhciBwYXRoID0gZmluZFBhdGgodGhpcy5fZ3JhcGguY29tcGFjdGVkVmVydGljZXMsIHN0YXJ0LCBmaW5pc2gpO1xuICAgIFxuICAgICAgICAgICAgaWYgKHBhdGgpIHtcbiAgICAgICAgICAgICAgICB2YXIgd2VpZ2h0ID0gcGF0aFswXTtcbiAgICAgICAgICAgICAgICBwYXRoID0gcGF0aFsxXTtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBmdWxsUGF0aDogcGF0aCxcbiAgICAgICAgICAgICAgICAgICAgcGF0aDogcGF0aC5yZWR1Y2UoZnVuY3Rpb24gYnVpbGRQYXRoKGNzLCB2LCBpLCB2cykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGkgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3MgPSBjcy5jb25jYXQodGhpcy5fZ3JhcGguY29tcGFjdGVkQ29vcmRpbmF0ZXNbdnNbaSAtIDFdXVt2XSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY3M7XG4gICAgICAgICAgICAgICAgICAgIH0uYmluZCh0aGlzKSwgW10pLmNvbmNhdChbdGhpcy5fZ3JhcGguc291cmNlVmVydGljZXNbZmluaXNoXV0pLFxuICAgICAgICAgICAgICAgICAgICB3ZWlnaHQ6IHdlaWdodCxcbiAgICAgICAgICAgICAgICAgICAgZWRnZURhdGFzOiB0aGlzLl9ncmFwaC5jb21wYWN0ZWRFZGdlcyBcbiAgICAgICAgICAgICAgICAgICAgICAgID8gcGF0aC5yZWR1Y2UoZnVuY3Rpb24gYnVpbGRFZGdlRGF0YShlZHMsIHYsIGksIHZzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGkgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVkcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZHVjZWRFZGdlOiB0aGlzLl9ncmFwaC5jb21wYWN0ZWRFZGdlc1t2c1tpIC0gMV1dW3ZdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZWRzO1xuICAgICAgICAgICAgICAgICAgICAgICAgfS5iaW5kKHRoaXMpLCBbXSlcbiAgICAgICAgICAgICAgICAgICAgICAgIDogdW5kZWZpbmVkXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgXG4gICAgICAgICAgICB0aGlzLl9yZW1vdmVQaGFudG9tKHBoYW50b21TdGFydCk7XG4gICAgICAgICAgICB0aGlzLl9yZW1vdmVQaGFudG9tKHBoYW50b21FbmQpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZXJpYWxpemUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9ncmFwaDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2NyZWF0ZVBoYW50b20gPSBmdW5jdGlvbihuKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fZ3JhcGguY29tcGFjdGVkVmVydGljZXNbbl0pIHJldHVybiBudWxsO1xuICAgIFxuICAgICAgICAgICAgdmFyIHBoYW50b20gPSBjb21wYWN0Tm9kZShuLCB0aGlzLl9ncmFwaC52ZXJ0aWNlcywgdGhpcy5fZ3JhcGguY29tcGFjdGVkVmVydGljZXMsIHRoaXMuX2dyYXBoLnNvdXJjZVZlcnRpY2VzLCB0aGlzLl9ncmFwaC5lZGdlRGF0YSwgdHJ1ZSwgdGhpcy5fb3B0aW9ucyk7XG4gICAgICAgICAgICB0aGlzLl9ncmFwaC5jb21wYWN0ZWRWZXJ0aWNlc1tuXSA9IHBoYW50b20uZWRnZXM7XG4gICAgICAgICAgICB0aGlzLl9ncmFwaC5jb21wYWN0ZWRDb29yZGluYXRlc1tuXSA9IHBoYW50b20uY29vcmRpbmF0ZXM7XG4gICAgXG4gICAgICAgICAgICBpZiAodGhpcy5fZ3JhcGguY29tcGFjdGVkRWRnZXMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9ncmFwaC5jb21wYWN0ZWRFZGdlc1tuXSA9IHBoYW50b20ucmVkdWNlZEVkZ2VzO1xuICAgICAgICAgICAgfVxuICAgIFxuICAgICAgICAgICAgT2JqZWN0LmtleXMocGhhbnRvbS5pbmNvbWluZ0VkZ2VzKS5mb3JFYWNoKGZ1bmN0aW9uKG5laWdoYm9yKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZ3JhcGguY29tcGFjdGVkVmVydGljZXNbbmVpZ2hib3JdW25dID0gcGhhbnRvbS5pbmNvbWluZ0VkZ2VzW25laWdoYm9yXTtcbiAgICAgICAgICAgICAgICB0aGlzLl9ncmFwaC5jb21wYWN0ZWRDb29yZGluYXRlc1tuZWlnaGJvcl1bbl0gPSBbdGhpcy5fZ3JhcGguc291cmNlVmVydGljZXNbbmVpZ2hib3JdXS5jb25jYXQocGhhbnRvbS5pbmNvbWluZ0Nvb3JkaW5hdGVzW25laWdoYm9yXS5zbGljZSgwLCAtMSkpO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9ncmFwaC5jb21wYWN0ZWRFZGdlcykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9ncmFwaC5jb21wYWN0ZWRFZGdlc1tuZWlnaGJvcl1bbl0gPSBwaGFudG9tLnJlZHVjZWRFZGdlc1tuZWlnaGJvcl07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfS5iaW5kKHRoaXMpKVxuICAgIFxuICAgICAgICAgICAgcmV0dXJuIG47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9yZW1vdmVQaGFudG9tID0gZnVuY3Rpb24obikge1xuICAgICAgICAgICAgaWYgKCFuKSByZXR1cm47XG4gICAgXG4gICAgICAgICAgICBPYmplY3Qua2V5cyh0aGlzLl9ncmFwaC5jb21wYWN0ZWRWZXJ0aWNlc1tuXSkuZm9yRWFjaChmdW5jdGlvbihuZWlnaGJvcikge1xuICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9ncmFwaC5jb21wYWN0ZWRWZXJ0aWNlc1tuZWlnaGJvcl1bbl07XG4gICAgICAgICAgICB9LmJpbmQodGhpcykpO1xuICAgICAgICAgICAgT2JqZWN0LmtleXModGhpcy5fZ3JhcGguY29tcGFjdGVkQ29vcmRpbmF0ZXNbbl0pLmZvckVhY2goZnVuY3Rpb24obmVpZ2hib3IpIHtcbiAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5fZ3JhcGguY29tcGFjdGVkQ29vcmRpbmF0ZXNbbmVpZ2hib3JdW25dO1xuICAgICAgICAgICAgfS5iaW5kKHRoaXMpKTtcbiAgICAgICAgICAgIGlmICh0aGlzLl9ncmFwaC5jb21wYWN0ZWRFZGdlcykge1xuICAgICAgICAgICAgICAgIE9iamVjdC5rZXlzKHRoaXMuX2dyYXBoLmNvbXBhY3RlZEVkZ2VzW25dKS5mb3JFYWNoKGZ1bmN0aW9uKG5laWdoYm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9ncmFwaC5jb21wYWN0ZWRFZGdlc1tuZWlnaGJvcl1bbl07XG4gICAgICAgICAgICAgICAgfS5iaW5kKHRoaXMpKTtcbiAgICAgICAgICAgIH1cbiAgICBcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9ncmFwaC5jb21wYWN0ZWRWZXJ0aWNlc1tuXTtcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9ncmFwaC5jb21wYWN0ZWRDb29yZGluYXRlc1tuXTtcbiAgICBcbiAgICAgICAgICAgIGlmICh0aGlzLl9ncmFwaC5jb21wYWN0ZWRFZGdlcykge1xuICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9ncmFwaC5jb21wYWN0ZWRFZGdlc1tuXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBmdW5jdGlvbiBTaG9ydGVzdFBhdGggKCkge1xuICAgICAgICB2YXIgSU5GSU5JVFkgPSAxIC8gMDtcbiAgICAgICAgdGhpcy52ZXJ0aWNlcyA9IHt9O1xuICAgIFxuICAgICAgICB0aGlzLmFkZFZlcnRleCA9IGZ1bmN0aW9uIChuYW1lLCBlZGdlcykge1xuICAgICAgICAgICAgdGhpcy52ZXJ0aWNlc1tuYW1lXSA9IGVkZ2VzO1xuICAgICAgICB9O1xuICAgIFxuICAgICAgICB0aGlzLnNldFZlcnRpY2VzID0gZnVuY3Rpb24gKGdyYXBoKSB7XG4gICAgICAgICAgICB0aGlzLnZlcnRpY2VzID0gZ3JhcGg7XG4gICAgICAgIH07XG4gICAgXG4gICAgICAgIHRoaXMuc2hvcnRlc3RQYXRoID0gZnVuY3Rpb24gKHN0YXJ0LCBmaW5pc2gpIHtcbiAgICAgICAgICAgIHZhciBub2RlcyA9IG5ldyBQcmlvcml0eVF1ZXVlKCksXG4gICAgICAgICAgICAgICAgZGlzdGFuY2VzID0ge30sXG4gICAgICAgICAgICAgICAgcHJldmlvdXMgPSB7fSxcbiAgICAgICAgICAgICAgICBwYXRoID0gW10sXG4gICAgICAgICAgICAgICAgc21hbGxlc3QsIHZlcnRleCwgbmVpZ2hib3IsIGFsdDtcbiAgICAgICAgXG4gICAgICAgICAgICBmb3IgKHZlcnRleCBpbiB0aGlzLnZlcnRpY2VzKSB7XG4gICAgICAgICAgICAgICAgaWYgKHZlcnRleCA9PT0gc3RhcnQpIHtcbiAgICAgICAgICAgICAgICAgICAgZGlzdGFuY2VzW3ZlcnRleF0gPSAwO1xuICAgICAgICAgICAgICAgICAgICBub2Rlcy5lbnF1ZXVlKDAsIHZlcnRleCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZGlzdGFuY2VzW3ZlcnRleF0gPSBJTkZJTklUWTtcbiAgICAgICAgICAgICAgICAgICAgbm9kZXMuZW5xdWV1ZShJTkZJTklUWSwgdmVydGV4KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgICAgICAgIHByZXZpb3VzW3ZlcnRleF0gPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgICAgIHdoaWxlICghbm9kZXMuaXNFbXB0eSgpKSB7XG4gICAgICAgICAgICAgICAgc21hbGxlc3QgPSBub2Rlcy5kZXF1ZXVlKCk7XG4gICAgICAgIFxuICAgICAgICAgICAgICAgIGlmIChzbWFsbGVzdCA9PT0gZmluaXNoKSB7XG4gICAgICAgICAgICAgICAgICAgIHBhdGggPSBbXTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB3aGlsZSAocHJldmlvdXNbc21hbGxlc3RdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXRoLnB1c2goc21hbGxlc3QpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc21hbGxlc3QgPSBwcmV2aW91c1tzbWFsbGVzdF07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgICAgICAgIGlmICghc21hbGxlc3QgfHwgZGlzdGFuY2VzW3NtYWxsZXN0XSA9PT0gSU5GSU5JVFkpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgICAgICAgICBmb3IgKG5laWdoYm9yIGluIHRoaXMudmVydGljZXNbc21hbGxlc3RdKSB7XG4gICAgICAgICAgICAgICAgICAgIGFsdCA9IGRpc3RhbmNlc1tzbWFsbGVzdF0gKyB0aGlzLnZlcnRpY2VzW3NtYWxsZXN0XVtuZWlnaGJvcl07XG4gICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBpZiAoYWx0IDwgZGlzdGFuY2VzW25laWdoYm9yXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGlzdGFuY2VzW25laWdoYm9yXSA9IGFsdDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZXZpb3VzW25laWdoYm9yXSA9IHNtYWxsZXN0O1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICBub2Rlcy5lbnF1ZXVlKGFsdCwgbmVpZ2hib3IpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgICAgIHJldHVybiBwYXRoO1xuICAgICAgICB9O1xuICAgIH07XG4gICAgXG4gICAgZnVuY3Rpb24gUHJpb3JpdHlRdWV1ZSgpIHtcbiAgICAgICAgdGhpcy5fbm9kZXMgPSBbXTtcbiAgICBcbiAgICAgICAgdGhpcy5lbnF1ZXVlID0gZnVuY3Rpb24gKHByaW9yaXR5LCBrZXkpIHtcbiAgICAgICAgICAgIHRoaXMuX25vZGVzLnB1c2goe2tleToga2V5LCBwcmlvcml0eTogcHJpb3JpdHl9KTtcbiAgICAgICAgICAgIHRoaXMuc29ydCgpO1xuICAgICAgICB9O1xuICAgIFxuICAgICAgICB0aGlzLmRlcXVldWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbm9kZXMuc2hpZnQoKS5rZXk7XG4gICAgICAgIH07XG4gICAgXG4gICAgICAgIHRoaXMuc29ydCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuX25vZGVzLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYS5wcmlvcml0eSAtIGIucHJpb3JpdHk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICBcbiAgICAgICAgdGhpcy5pc0VtcHR5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuICF0aGlzLl9ub2Rlcy5sZW5ndGg7XG4gICAgICAgIH07XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIFRpbnlRdWV1ZShkYXRhLCBjb21wYXJlKSB7XG4gICAgICAgIGlmICggZGF0YSA9PT0gdm9pZCAwICkgZGF0YSA9IFtdO1xuICAgICAgICBpZiAoIGNvbXBhcmUgPT09IHZvaWQgMCApIGNvbXBhcmUgPSBmdW5jdGlvbiAoYSwgYikge1xuICAgICAgICAgICAgcmV0dXJuIGEgPCBiID8gLTEgOiBhID4gYiA/IDEgOiAwO1xuICAgICAgICB9O1xuICAgIFxuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xuICAgICAgICB0aGlzLmxlbmd0aCA9IHRoaXMuZGF0YS5sZW5ndGg7XG4gICAgICAgIHRoaXMuY29tcGFyZSA9IGNvbXBhcmU7XG4gICAgXG4gICAgICAgIGlmICh0aGlzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAodGhpcy5sZW5ndGggPj4gMSkgLSAxOyBpID49IDA7IGktLSkgeyB0aGlzLl9kb3duKGkpOyB9XG4gICAgICAgIH1cbiAgICBcbiAgICAgICAgdGhpcy5wdXNoID0gZnVuY3Rpb24gcHVzaCAoaXRlbSkge1xuICAgICAgICAgICAgdGhpcy5kYXRhLnB1c2goaXRlbSk7XG4gICAgICAgICAgICB0aGlzLmxlbmd0aCsrO1xuICAgICAgICAgICAgdGhpcy5fdXAodGhpcy5sZW5ndGggLSAxKTtcbiAgICAgICAgfTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMucG9wID0gZnVuY3Rpb24gcG9wICgpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmxlbmd0aCA9PT0gMCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9XG4gICAgICAgIFxuICAgICAgICAgICAgdmFyIHRvcCA9IHRoaXMuZGF0YVswXTtcbiAgICAgICAgICAgIHZhciBib3R0b20gPSB0aGlzLmRhdGEucG9wKCk7XG4gICAgICAgICAgICB0aGlzLmxlbmd0aC0tO1xuICAgICAgICBcbiAgICAgICAgICAgIGlmICh0aGlzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGFbMF0gPSBib3R0b207XG4gICAgICAgICAgICAgICAgdGhpcy5fZG93bigwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgICAgICByZXR1cm4gdG9wO1xuICAgICAgICB9O1xuICAgICAgICBcbiAgICAgICAgdGhpcy5wZWVrID0gZnVuY3Rpb24gcGVlayAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kYXRhWzBdO1xuICAgICAgICB9O1xuICAgICAgICBcbiAgICAgICAgdGhpcy5fdXAgPSBmdW5jdGlvbiBfdXAgKHBvcykge1xuICAgICAgICAgICAgdmFyIHJlZiA9IHRoaXM7XG4gICAgICAgICAgICAgICAgdmFyIGRhdGEgPSByZWYuZGF0YTtcbiAgICAgICAgICAgICAgICB2YXIgY29tcGFyZSA9IHJlZi5jb21wYXJlO1xuICAgICAgICAgICAgdmFyIGl0ZW0gPSBkYXRhW3Bvc107XG4gICAgICAgIFxuICAgICAgICAgICAgd2hpbGUgKHBvcyA+IDApIHtcbiAgICAgICAgICAgICAgICB2YXIgcGFyZW50ID0gKHBvcyAtIDEpID4+IDE7XG4gICAgICAgICAgICAgICAgdmFyIGN1cnJlbnQgPSBkYXRhW3BhcmVudF07XG4gICAgICAgICAgICAgICAgaWYgKGNvbXBhcmUoaXRlbSwgY3VycmVudCkgPj0gMCkgeyBicmVhazsgfVxuICAgICAgICAgICAgICAgIGRhdGFbcG9zXSA9IGN1cnJlbnQ7XG4gICAgICAgICAgICAgICAgcG9zID0gcGFyZW50O1xuICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgICAgIGRhdGFbcG9zXSA9IGl0ZW07XG4gICAgICAgIH07XG4gICAgICAgIFxuICAgICAgICB0aGlzLl9kb3duID0gZnVuY3Rpb24gX2Rvd24gKHBvcykge1xuICAgICAgICAgICAgdmFyIHJlZiA9IHRoaXM7XG4gICAgICAgICAgICAgICAgdmFyIGRhdGEgPSByZWYuZGF0YTtcbiAgICAgICAgICAgICAgICB2YXIgY29tcGFyZSA9IHJlZi5jb21wYXJlO1xuICAgICAgICAgICAgdmFyIGhhbGZMZW5ndGggPSB0aGlzLmxlbmd0aCA+PiAxO1xuICAgICAgICAgICAgdmFyIGl0ZW0gPSBkYXRhW3Bvc107XG4gICAgICAgIFxuICAgICAgICAgICAgd2hpbGUgKHBvcyA8IGhhbGZMZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB2YXIgbGVmdCA9IChwb3MgPDwgMSkgKyAxO1xuICAgICAgICAgICAgICAgIHZhciBiZXN0ID0gZGF0YVtsZWZ0XTtcbiAgICAgICAgICAgICAgICB2YXIgcmlnaHQgPSBsZWZ0ICsgMTtcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKHJpZ2h0IDwgdGhpcy5sZW5ndGggJiYgY29tcGFyZShkYXRhW3JpZ2h0XSwgYmVzdCkgPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGxlZnQgPSByaWdodDtcbiAgICAgICAgICAgICAgICAgICAgYmVzdCA9IGRhdGFbcmlnaHRdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoY29tcGFyZShiZXN0LCBpdGVtKSA+PSAwKSB7IGJyZWFrOyB9XG4gICAgICAgIFxuICAgICAgICAgICAgICAgIGRhdGFbcG9zXSA9IGJlc3Q7XG4gICAgICAgICAgICAgICAgcG9zID0gbGVmdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgICAgICBkYXRhW3Bvc10gPSBpdGVtO1xuICAgICAgICB9O1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBmaW5kTmV4dEVuZChwcmV2LCB2LCB2ZXJ0aWNlcywgZW5kcywgdmVydGV4Q29vcmRzLCBlZGdlRGF0YSwgdHJhY2tJbmNvbWluZywgb3B0aW9ucykge1xuICAgICAgICB2YXIgd2VpZ2h0ID0gdmVydGljZXNbcHJldl1bdl0sXG4gICAgICAgICAgICByZXZlcnNlV2VpZ2h0ID0gdmVydGljZXNbdl1bcHJldl0sXG4gICAgICAgICAgICBjb29yZGluYXRlcyA9IFtdLFxuICAgICAgICAgICAgcGF0aCA9IFtdLFxuICAgICAgICAgICAgcmVkdWNlZEVkZ2UgPSBvcHRpb25zLmVkZ2VEYXRhU2VlZDtcbiAgICAgICAgICAgIFxuICAgICAgICBpZiAob3B0aW9ucy5lZGdlRGF0YVJlZHVjZUZuKSB7XG4gICAgICAgICAgICByZWR1Y2VkRWRnZSA9IG9wdGlvbnMuZWRnZURhdGFSZWR1Y2VGbihyZWR1Y2VkRWRnZSwgZWRnZURhdGFbdl1bcHJldl0pO1xuICAgICAgICB9XG4gICAgXG4gICAgICAgIHdoaWxlICghZW5kc1t2XSkge1xuICAgICAgICAgICAgdmFyIGVkZ2VzID0gdmVydGljZXNbdl07XG4gICAgXG4gICAgICAgICAgICBpZiAoIWVkZ2VzKSB7IGJyZWFrOyB9XG4gICAgXG4gICAgICAgICAgICB2YXIgbmV4dCA9IE9iamVjdC5rZXlzKGVkZ2VzKS5maWx0ZXIoZnVuY3Rpb24gbm90UHJldmlvdXMoaykgeyByZXR1cm4gayAhPT0gcHJldjsgfSlbMF07XG4gICAgICAgICAgICB3ZWlnaHQgKz0gZWRnZXNbbmV4dF07XG4gICAgXG4gICAgICAgICAgICBpZiAodHJhY2tJbmNvbWluZykge1xuICAgICAgICAgICAgICAgIHJldmVyc2VXZWlnaHQgKz0gdmVydGljZXNbbmV4dF1bdl07XG4gICAgXG4gICAgICAgICAgICAgICAgaWYgKHBhdGguaW5kZXhPZih2KSA+PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGVuZHNbdl0gPSB2ZXJ0aWNlc1t2XTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHBhdGgucHVzaCh2KTtcbiAgICAgICAgICAgIH1cbiAgICBcbiAgICAgICAgICAgIGlmIChvcHRpb25zLmVkZ2VEYXRhUmVkdWNlRm4pIHtcbiAgICAgICAgICAgICAgICByZWR1Y2VkRWRnZSA9IG9wdGlvbnMuZWRnZURhdGFSZWR1Y2VGbihyZWR1Y2VkRWRnZSwgZWRnZURhdGFbdl1bbmV4dF0pO1xuICAgICAgICAgICAgfVxuICAgIFxuICAgICAgICAgICAgY29vcmRpbmF0ZXMucHVzaCh2ZXJ0ZXhDb29yZHNbdl0pO1xuICAgICAgICAgICAgcHJldiA9IHY7XG4gICAgICAgICAgICB2ID0gbmV4dDtcbiAgICAgICAgfVxuICAgIFxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdmVydGV4OiB2LFxuICAgICAgICAgICAgd2VpZ2h0OiB3ZWlnaHQsXG4gICAgICAgICAgICByZXZlcnNlV2VpZ2h0OiByZXZlcnNlV2VpZ2h0LFxuICAgICAgICAgICAgY29vcmRpbmF0ZXM6IGNvb3JkaW5hdGVzLFxuICAgICAgICAgICAgcmVkdWNlZEVkZ2U6IHJlZHVjZWRFZGdlXG4gICAgICAgIH07XG4gICAgfTtcbiAgICBcbiAgICBmdW5jdGlvbiBjb21wYWN0Tm9kZShrLCB2ZXJ0aWNlcywgZW5kcywgdmVydGV4Q29vcmRzLCBlZGdlRGF0YSwgdHJhY2tJbmNvbWluZywgb3B0aW9ucykge1xuICAgICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICAgICAgdmFyIG5laWdoYm9ycyA9IHZlcnRpY2VzW2tdO1xuICAgICAgICByZXR1cm4gT2JqZWN0LmtleXMobmVpZ2hib3JzKS5yZWR1Y2UoZnVuY3Rpb24gY29tcGFjdEVkZ2UocmVzdWx0LCBqKSB7XG4gICAgICAgICAgICB2YXIgbmVpZ2hib3IgPSBmaW5kTmV4dEVuZChrLCBqLCB2ZXJ0aWNlcywgZW5kcywgdmVydGV4Q29vcmRzLCBlZGdlRGF0YSwgdHJhY2tJbmNvbWluZywgb3B0aW9ucyk7XG4gICAgICAgICAgICB2YXIgd2VpZ2h0ID0gbmVpZ2hib3Iud2VpZ2h0O1xuICAgICAgICAgICAgdmFyIHJldmVyc2VXZWlnaHQgPSBuZWlnaGJvci5yZXZlcnNlV2VpZ2h0O1xuICAgICAgICAgICAgaWYgKG5laWdoYm9yLnZlcnRleCAhPT0gaykge1xuICAgICAgICAgICAgICAgIGlmICghcmVzdWx0LmVkZ2VzW25laWdoYm9yLnZlcnRleF0gfHwgcmVzdWx0LmVkZ2VzW25laWdoYm9yLnZlcnRleF0gPiB3ZWlnaHQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LmVkZ2VzW25laWdoYm9yLnZlcnRleF0gPSB3ZWlnaHQ7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5jb29yZGluYXRlc1tuZWlnaGJvci52ZXJ0ZXhdID0gW3ZlcnRleENvb3Jkc1trXV0uY29uY2F0KG5laWdoYm9yLmNvb3JkaW5hdGVzKTtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnJlZHVjZWRFZGdlc1tuZWlnaGJvci52ZXJ0ZXhdID0gbmVpZ2hib3IucmVkdWNlZEVkZ2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0cmFja0luY29taW5nICYmIFxuICAgICAgICAgICAgICAgICAgICAhaXNOYU4ocmV2ZXJzZVdlaWdodCkgJiYgKCFyZXN1bHQuaW5jb21pbmdFZGdlc1tuZWlnaGJvci52ZXJ0ZXhdIHx8IHJlc3VsdC5pbmNvbWluZ0VkZ2VzW25laWdoYm9yLnZlcnRleF0gPiByZXZlcnNlV2VpZ2h0KSkge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQuaW5jb21pbmdFZGdlc1tuZWlnaGJvci52ZXJ0ZXhdID0gcmV2ZXJzZVdlaWdodDtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNvb3JkaW5hdGVzID0gW3ZlcnRleENvb3Jkc1trXV0uY29uY2F0KG5laWdoYm9yLmNvb3JkaW5hdGVzKTtcbiAgICAgICAgICAgICAgICAgICAgY29vcmRpbmF0ZXMucmV2ZXJzZSgpO1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQuaW5jb21pbmdDb29yZGluYXRlc1tuZWlnaGJvci52ZXJ0ZXhdID0gY29vcmRpbmF0ZXM7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfSwge2VkZ2VzOiB7fSwgaW5jb21pbmdFZGdlczoge30sIGNvb3JkaW5hdGVzOiB7fSwgaW5jb21pbmdDb29yZGluYXRlczoge30sIHJlZHVjZWRFZGdlczoge319KTtcbiAgICB9O1xuICAgIFxuICAgIGZ1bmN0aW9uIGNvbXBhY3RHcmFwaCh2ZXJ0aWNlcywgdmVydGV4Q29vcmRzLCBlZGdlRGF0YSwgb3B0aW9ucykge1xuICAgICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICAgICAgdmFyIHByb2dyZXNzID0gb3B0aW9ucy5wcm9ncmVzcztcbiAgICAgICAgdmFyIGVuZHMgPSBPYmplY3Qua2V5cyh2ZXJ0aWNlcykucmVkdWNlKGZ1bmN0aW9uIGZpbmRFbmRzKGVzLCBrLCBpLCB2cykge1xuICAgICAgICAgICAgdmFyIHZlcnRleCA9IHZlcnRpY2VzW2tdO1xuICAgICAgICAgICAgdmFyIGVkZ2VzID0gT2JqZWN0LmtleXModmVydGV4KTtcbiAgICAgICAgICAgIHZhciBudW1iZXJFZGdlcyA9IGVkZ2VzLmxlbmd0aDtcbiAgICAgICAgICAgIHZhciByZW1vdmU7XG4gICAgXG4gICAgICAgICAgICBpZihvcHRpb25zLmNvbXBhY3QgPT09IGZhbHNlKSAge1xuICAgICAgICAgICAgICAgIHJlbW92ZSA9IGZhbHNlO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChudW1iZXJFZGdlcyA9PT0gMSkge1xuICAgICAgICAgICAgICAgIHZhciBvdGhlciA9IHZlcnRpY2VzW2VkZ2VzWzBdXTtcbiAgICAgICAgICAgICAgICByZW1vdmUgPSAhb3RoZXJba107XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG51bWJlckVkZ2VzID09PSAyKSB7XG4gICAgICAgICAgICAgICAgcmVtb3ZlID0gZWRnZXMuZmlsdGVyKGZ1bmN0aW9uKG4pIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZlcnRpY2VzW25dW2tdO1xuICAgICAgICAgICAgICAgIH0pLmxlbmd0aCA9PT0gbnVtYmVyRWRnZXM7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlbW92ZSA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAoIXJlbW92ZSkge1xuICAgICAgICAgICAgICAgIGVzW2tdID0gdmVydGV4O1xuICAgICAgICAgICAgfVxuICAgIFxuICAgICAgICAgICAgaWYgKGkgJSAxMDAwID09PSAwICYmIHByb2dyZXNzKSB7XG4gICAgICAgICAgICAgICAgcHJvZ3Jlc3MoJ2NvbXBhY3Q6ZW5kcycsIGksIHZzLmxlbmd0aCk7XG4gICAgICAgICAgICB9XG4gICAgXG4gICAgICAgICAgICByZXR1cm4gZXM7XG4gICAgICAgIH0sIHt9KTtcbiAgICBcbiAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKGVuZHMpLnJlZHVjZShmdW5jdGlvbiBjb21wYWN0RW5kKHJlc3VsdCwgaywgaSwgZXMpIHtcbiAgICAgICAgICAgIHZhciBjb21wYWN0ZWQgPSBjb21wYWN0Tm9kZShrLCB2ZXJ0aWNlcywgZW5kcywgdmVydGV4Q29vcmRzLCBlZGdlRGF0YSwgZmFsc2UsIG9wdGlvbnMpO1xuICAgICAgICAgICAgcmVzdWx0LmdyYXBoW2tdID0gY29tcGFjdGVkLmVkZ2VzO1xuICAgICAgICAgICAgcmVzdWx0LmNvb3JkaW5hdGVzW2tdID0gY29tcGFjdGVkLmNvb3JkaW5hdGVzO1xuICAgIFxuICAgICAgICAgICAgaWYgKG9wdGlvbnMuZWRnZURhdGFSZWR1Y2VGbikge1xuICAgICAgICAgICAgICAgIHJlc3VsdC5yZWR1Y2VkRWRnZXNba10gPSBjb21wYWN0ZWQucmVkdWNlZEVkZ2VzO1xuICAgICAgICAgICAgfVxuICAgIFxuICAgICAgICAgICAgaWYgKGkgJSAxMDAwID09PSAwICYmIHByb2dyZXNzKSB7XG4gICAgICAgICAgICAgICAgcHJvZ3Jlc3MoJ2NvbXBhY3Q6bm9kZXMnLCBpLCBlcy5sZW5ndGgpO1xuICAgICAgICAgICAgfVxuICAgIFxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfSwge2dyYXBoOiB7fSwgY29vcmRpbmF0ZXM6IHt9LCByZWR1Y2VkRWRnZXM6IHt9fSk7XG4gICAgfTtcbiAgICBcbiAgICBmdW5jdGlvbiBmaW5kUGF0aChncmFwaCwgc3RhcnQsIGVuZCkge1xuICAgICAgICB2YXIgY29zdHMgPSB7fTtcbiAgICAgICAgY29zdHNbc3RhcnRdID0gMDtcbiAgICAgICAgdmFyIGluaXRpYWxTdGF0ZSA9IFswLCBbc3RhcnRdLCBzdGFydF07XG4gICAgICAgIHZhciBxdWV1ZSA9IG5ldyBUaW55UXVldWUoW2luaXRpYWxTdGF0ZV0sIGZ1bmN0aW9uKGEsIGIpIHsgcmV0dXJuIGFbMF0gLSBiWzBdOyB9KTtcbiAgICAgICAgdmFyIGV4cGxvcmVkID0ge307XG4gICAgXG4gICAgICAgIHdoaWxlIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHZhciBzdGF0ZSA9IHF1ZXVlLnBvcCgpO1xuICAgICAgICAgICAgdmFyIGNvc3QgPSBzdGF0ZVswXTtcbiAgICAgICAgICAgIHZhciBub2RlID0gc3RhdGVbMl07XG4gICAgICAgICAgICBpZiAobm9kZSA9PT0gZW5kKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0YXRlLnNsaWNlKDAsIDIpO1xuICAgICAgICAgICAgfVxuICAgIFxuICAgICAgICAgICAgdmFyIG5laWdoYm91cnMgPSBncmFwaFtub2RlXTtcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKG5laWdoYm91cnMpLmZvckVhY2goZnVuY3Rpb24obikge1xuICAgICAgICAgICAgICAgIHZhciBuZXdDb3N0ID0gY29zdCArIG5laWdoYm91cnNbbl07XG4gICAgICAgICAgICAgICAgaWYgKCEobiBpbiBjb3N0cykgfHwgbmV3Q29zdCA8IGNvc3RzW25dKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvc3RzW25dID0gbmV3Q29zdDtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5ld1N0YXRlID0gW25ld0Nvc3QsIHN0YXRlWzFdLmNvbmNhdChbbl0pLCBuXTtcbiAgICAgICAgICAgICAgICAgICAgcXVldWUucHVzaChuZXdTdGF0ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICBcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfTtcbiAgICBcbiAgICBmdW5jdGlvbiBwcmVwcm9jZXNzKGdyYXBoLCBvcHRpb25zKSB7XG4gICAgICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gICAgICAgIHZhciB0b3BvO1xuXG4gICAgICAgIHZhciB3ZWlnaHRGbiA9IG9wdGlvbnMud2VpZ2h0Rm4gfHwgZnVuY3Rpb24gZGVmYXVsdFdlaWdodEZuKGEsIGIpIHtcbiAgICAgICAgICAgIHJldHVybiB0dXJmLmRpc3RhbmNlKHR1cmYucG9pbnQoYSksIHR1cmYucG9pbnQoYikpO1xuICAgICAgICB9XG4gICAgXG4gICAgICAgIGlmIChncmFwaC50eXBlID09PSAnRmVhdHVyZUNvbGxlY3Rpb24nKSB7XG4gICAgICAgICAgICAvLyBHcmFwaCBpcyBHZW9KU09OIGRhdGEsIGNyZWF0ZSBhIHRvcG9sb2d5IGZyb20gaXRcbiAgICAgICAgICAgIHRvcG8gPSB0b3BvbG9neShncmFwaCwgb3B0aW9ucyk7XG4gICAgICAgIH0gZWxzZSBpZiAoZ3JhcGguZWRnZXMpIHtcbiAgICAgICAgICAgIC8vIEdyYXBoIGlzIGEgcHJlcHJvY2Vzc2VkIHRvcG9sb2d5XG4gICAgICAgICAgICB0b3BvID0gZ3JhcGg7XG4gICAgICAgIH1cbiAgICBcbiAgICAgICAgdmFyIGdyYXBoID0gdG9wby5lZGdlcy5yZWR1Y2UoZnVuY3Rpb24gYnVpbGRHcmFwaChnLCBlZGdlLCBpLCBlcykge1xuICAgICAgICAgICAgdmFyIGEgPSBlZGdlWzBdLFxuICAgICAgICAgICAgICAgIGIgPSBlZGdlWzFdLFxuICAgICAgICAgICAgICAgIHByb3BzID0gZWRnZVsyXSxcbiAgICAgICAgICAgICAgICB3ID0gd2VpZ2h0Rm4odG9wby52ZXJ0aWNlc1thXSwgdG9wby52ZXJ0aWNlc1tiXSwgcHJvcHMpLFxuICAgICAgICAgICAgICAgIG1ha2VFZGdlTGlzdCA9IGZ1bmN0aW9uIG1ha2VFZGdlTGlzdChub2RlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghZy52ZXJ0aWNlc1tub2RlXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZy52ZXJ0aWNlc1tub2RlXSA9IHt9O1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMuZWRnZURhdGFSZWR1Y2VGbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGcuZWRnZURhdGFbbm9kZV0gPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgY29uY2F0RWRnZSA9IGZ1bmN0aW9uIGNvbmNhdEVkZ2Uoc3RhcnROb2RlLCBlbmROb2RlLCB3ZWlnaHQpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHYgPSBnLnZlcnRpY2VzW3N0YXJ0Tm9kZV07XG4gICAgICAgICAgICAgICAgICAgIHZbZW5kTm9kZV0gPSB3ZWlnaHQ7XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLmVkZ2VEYXRhUmVkdWNlRm4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGcuZWRnZURhdGFbc3RhcnROb2RlXVtlbmROb2RlXSA9IG9wdGlvbnMuZWRnZURhdGFSZWR1Y2VGbihvcHRpb25zLmVkZ2VEYXRhU2VlZCwgcHJvcHMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfTtcbiAgICBcbiAgICAgICAgICAgIGlmICh3KSB7XG4gICAgICAgICAgICAgICAgbWFrZUVkZ2VMaXN0KGEpO1xuICAgICAgICAgICAgICAgIG1ha2VFZGdlTGlzdChiKTtcbiAgICAgICAgICAgICAgICBpZiAodyBpbnN0YW5jZW9mIE9iamVjdCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAody5mb3J3YXJkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25jYXRFZGdlKGEsIGIsIHcuZm9yd2FyZCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHcuYmFja3dhcmQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbmNhdEVkZ2UoYiwgYSwgdy5iYWNrd2FyZCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjb25jYXRFZGdlKGEsIGIsIHcpO1xuICAgICAgICAgICAgICAgICAgICBjb25jYXRFZGdlKGIsIGEsIHcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICBcbiAgICAgICAgICAgIGlmIChpICUgMTAwMCA9PT0gMCAmJiBvcHRpb25zLnByb2dyZXNzKSB7XG4gICAgICAgICAgICAgICAgb3B0aW9ucy5wcm9ncmVzcygnZWRnZXdlaWdodHMnLCBpLGVzLmxlbmd0aCk7XG4gICAgICAgICAgICB9XG4gICAgXG4gICAgICAgICAgICByZXR1cm4gZztcbiAgICAgICAgfSwge2VkZ2VEYXRhOiB7fSwgdmVydGljZXM6IHt9fSk7XG4gICAgXG4gICAgICAgIHZhciBjb21wYWN0ID0gY29tcGFjdEdyYXBoKGdyYXBoLnZlcnRpY2VzLCB0b3BvLnZlcnRpY2VzLCBncmFwaC5lZGdlRGF0YSwgb3B0aW9ucyk7XG4gICAgXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB2ZXJ0aWNlczogZ3JhcGgudmVydGljZXMsXG4gICAgICAgICAgICBlZGdlRGF0YTogZ3JhcGguZWRnZURhdGEsXG4gICAgICAgICAgICBzb3VyY2VWZXJ0aWNlczogdG9wby52ZXJ0aWNlcyxcbiAgICAgICAgICAgIGNvbXBhY3RlZFZlcnRpY2VzOiBjb21wYWN0LmdyYXBoLFxuICAgICAgICAgICAgY29tcGFjdGVkQ29vcmRpbmF0ZXM6IGNvbXBhY3QuY29vcmRpbmF0ZXMsXG4gICAgICAgICAgICBjb21wYWN0ZWRFZGdlczogb3B0aW9ucy5lZGdlRGF0YVJlZHVjZUZuID8gY29tcGFjdC5yZWR1Y2VkRWRnZXMgOiBudWxsXG4gICAgICAgIH07XG4gICAgfTtcbiAgICBcbiAgICBmdW5jdGlvbiByb3VuZENvb3JkKGMsIHByZWNpc2lvbikge1xuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgTWF0aC5yb3VuZChjWzBdIC8gcHJlY2lzaW9uKSAqIHByZWNpc2lvbixcbiAgICAgICAgICAgIE1hdGgucm91bmQoY1sxXSAvIHByZWNpc2lvbikgKiBwcmVjaXNpb24sXG4gICAgICAgIF07XG4gICAgfTtcbiAgICBcbiAgICBmdW5jdGlvbiBnZW9Kc29uUmVkdWNlKGdlb2pzb24sIGZuLCBzZWVkKSB7XG4gICAgICAgIGlmIChnZW9qc29uLnR5cGUgPT09ICdGZWF0dXJlQ29sbGVjdGlvbicpIHtcbiAgICAgICAgICAgIHJldHVybiBnZW9qc29uLmZlYXR1cmVzLnJlZHVjZShmdW5jdGlvbiByZWR1Y2VGZWF0dXJlcyhhLCBmKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGdlb0pzb25SZWR1Y2UoZiwgZm4sIGEpO1xuICAgICAgICAgICAgfSwgc2VlZCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZm4oc2VlZCwgZ2VvanNvbik7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFxuICAgIGZ1bmN0aW9uIGdlb0pzb25GaWx0ZXJGZWF0dXJlcyhnZW9qc29uLCBmbikge1xuICAgICAgICB2YXIgZmVhdHVyZXMgPSBbXTtcbiAgICAgICAgaWYgKGdlb2pzb24udHlwZSA9PT0gJ0ZlYXR1cmVDb2xsZWN0aW9uJykge1xuICAgICAgICAgICAgZmVhdHVyZXMgPSBmZWF0dXJlcy5jb25jYXQoZ2VvanNvbi5mZWF0dXJlcy5maWx0ZXIoZm4pKTtcbiAgICAgICAgfVxuICAgIFxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdHlwZTogJ0ZlYXR1cmVDb2xsZWN0aW9uJyxcbiAgICAgICAgICAgIGZlYXR1cmVzOiBmZWF0dXJlc1xuICAgICAgICB9O1xuICAgIH07XG4gICAgXG4gICAgZnVuY3Rpb24gaXNMaW5lU3RyaW5nKGYpIHtcbiAgICAgICAgcmV0dXJuIGYuZ2VvbWV0cnkudHlwZSA9PT0gJ0xpbmVTdHJpbmcnO1xuICAgIH07XG4gICAgXG4gICAgZnVuY3Rpb24gdG9wb2xvZ3koZ2VvanNvbiwgb3B0aW9ucykge1xuICAgICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICAgICAgdmFyIGtleUZuID0gb3B0aW9ucy5rZXlGbiB8fCBmdW5jdGlvbiBkZWZhdWx0S2V5Rm4oYykge1xuICAgICAgICAgICAgICAgIHJldHVybiBjLmpvaW4oJywnKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBwcmVjaXNpb24gPSBvcHRpb25zLnByZWNpc2lvbiB8fCAxZS01O1xuICAgIFxuICAgICAgICB2YXIgbGluZVN0cmluZ3MgPSBnZW9Kc29uRmlsdGVyRmVhdHVyZXMoZ2VvanNvbiwgaXNMaW5lU3RyaW5nKTtcbiAgICAgICAgdmFyIGV4cGxvZGVkTGluZVN0cmluZ3MgPSB0dXJmLmV4cGxvZGUobGluZVN0cmluZ3MpO1xuICAgICAgICB2YXIgdmVydGljZXMgPSBleHBsb2RlZExpbmVTdHJpbmdzLmZlYXR1cmVzLnJlZHVjZShmdW5jdGlvbiBidWlsZFRvcG9sb2d5VmVydGljZXMoY3MsIGYsIGksIGZzKSB7XG4gICAgICAgICAgICAgICAgdmFyIHJjID0gcm91bmRDb29yZChmLmdlb21ldHJ5LmNvb3JkaW5hdGVzLCBwcmVjaXNpb24pO1xuICAgICAgICAgICAgICAgIGNzW2tleUZuKHJjKV0gPSBmLmdlb21ldHJ5LmNvb3JkaW5hdGVzO1xuICAgIFxuICAgICAgICAgICAgICAgIGlmIChpICUgMTAwMCA9PT0gMCAmJiBvcHRpb25zLnByb2dyZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnMucHJvZ3Jlc3MoJ3RvcG86dmVydGljZXMnLCBpLCBmcy5sZW5ndGgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICBcbiAgICAgICAgICAgICAgICByZXR1cm4gY3M7XG4gICAgICAgICAgICB9LCB7fSksXG4gICAgICAgICAgICBlZGdlcyA9IGdlb0pzb25SZWR1Y2UobGluZVN0cmluZ3MsIGZ1bmN0aW9uIGJ1aWxkVG9wb2xvZ3lFZGdlcyhlcywgZiwgaSwgZnMpIHtcbiAgICAgICAgICAgICAgICBmLmdlb21ldHJ5LmNvb3JkaW5hdGVzLmZvckVhY2goZnVuY3Rpb24gYnVpbGRMaW5lU3RyaW5nRWRnZXMoYywgaSwgY3MpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGkgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgazEgPSBrZXlGbihyb3VuZENvb3JkKGNzW2kgLSAxXSwgcHJlY2lzaW9uKSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgazIgPSBrZXlGbihyb3VuZENvb3JkKGMsIHByZWNpc2lvbikpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZXMucHVzaChbazEsIGsyLCBmLnByb3BlcnRpZXNdKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgIFxuICAgICAgICAgICAgICAgIGlmIChpICUgMTAwMCA9PT0gMCAmJiBvcHRpb25zLnByb2dyZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnMucHJvZ3Jlc3MoJ3RvcG86ZWRnZXMnLCBpLCBmcy5sZW5ndGgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICBcbiAgICAgICAgICAgICAgICByZXR1cm4gZXM7XG4gICAgICAgICAgICB9LCBbXSk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB2ZXJ0aWNlczogdmVydGljZXMsXG4gICAgICAgICAgICBlZGdlczogZWRnZXNcbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gdmFsaWRhdGVQYXRoKGZyb21Qb2ludCwgdG9Qb2ludCwgcGF0aCkge1xuICAgICAgICBpZiAodG9Qb2ludCAmJiB0b1BvaW50LnR5cGUgPT09ICdsaW5lcG9pbnQnKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIC8vaWYgKHByZWNpc2lvbiA+IDAuMDAwNSkgcmV0dXJuIGZhbHNlO1xuICAgICAgICBpZiAoIXBhdGggfHwgIXBhdGgucGF0aCB8fCAhcGF0aC5wYXRoLmxlbmd0aCB8fCBwYXRoLnBhdGgubGVuZ3RoIDwgMikgcmV0dXJuIGZhbHNlO1xuICAgICAgICByZXR1cm4gcGF0aDtcblxuICAgICAgICBwcmVjaXNpb24gPSBOdW1iZXIoKE51bWJlcihwcmVjaXNpb24pICsgMC4wMDAwMDIpLnRvRml4ZWQoNykpO1xuICAgICAgICB2YXIgcGF0aGZpbmRlciA9IG5ldyBQYXRoRmluZGVyKGZlYXR1cmVzLCB7IHByZWNpc2lvbjogcHJlY2lzaW9uIH0pO1xuICAgICAgICB2YXIgbmV3UGF0aCA9IHBhdGhmaW5kZXIuZmluZFBhdGgoZnJvbVBvaW50LCB0b1BvaW50KTtcbiAgICAgICAgcmV0dXJuIHZhbGlkYXRlUGF0aChmcm9tUG9pbnQsIHRvUG9pbnQsIGZlYXR1cmVzLCBuZXdQYXRoKTtcbiAgICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgUm91dGluZzsiXSwibmFtZXMiOlsiX3JlZ2VuZXJhdG9yUnVudGltZSIsImUiLCJ0IiwiciIsIk9iamVjdCIsInByb3RvdHlwZSIsIm4iLCJoYXNPd25Qcm9wZXJ0eSIsIm8iLCJkZWZpbmVQcm9wZXJ0eSIsInZhbHVlIiwiaSIsIlN5bWJvbCIsImEiLCJpdGVyYXRvciIsImMiLCJhc3luY0l0ZXJhdG9yIiwidSIsInRvU3RyaW5nVGFnIiwiZGVmaW5lIiwiZW51bWVyYWJsZSIsImNvbmZpZ3VyYWJsZSIsIndyaXRhYmxlIiwid3JhcCIsIkdlbmVyYXRvciIsImNyZWF0ZSIsIkNvbnRleHQiLCJtYWtlSW52b2tlTWV0aG9kIiwidHJ5Q2F0Y2giLCJ0eXBlIiwiYXJnIiwiY2FsbCIsImgiLCJsIiwiZiIsInMiLCJ5IiwiR2VuZXJhdG9yRnVuY3Rpb24iLCJHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSIsInAiLCJkIiwiZ2V0UHJvdG90eXBlT2YiLCJ2IiwidmFsdWVzIiwiZyIsImRlZmluZUl0ZXJhdG9yTWV0aG9kcyIsImZvckVhY2giLCJfaW52b2tlIiwiQXN5bmNJdGVyYXRvciIsImludm9rZSIsIl90eXBlb2YiLCJyZXNvbHZlIiwiX19hd2FpdCIsInRoZW4iLCJjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZyIsIkVycm9yIiwiZG9uZSIsIm1ldGhvZCIsImRlbGVnYXRlIiwibWF5YmVJbnZva2VEZWxlZ2F0ZSIsInNlbnQiLCJfc2VudCIsImRpc3BhdGNoRXhjZXB0aW9uIiwiYWJydXB0IiwiVHlwZUVycm9yIiwicmVzdWx0TmFtZSIsIm5leHQiLCJuZXh0TG9jIiwicHVzaFRyeUVudHJ5IiwidHJ5TG9jIiwiY2F0Y2hMb2MiLCJmaW5hbGx5TG9jIiwiYWZ0ZXJMb2MiLCJ0cnlFbnRyaWVzIiwicHVzaCIsInJlc2V0VHJ5RW50cnkiLCJjb21wbGV0aW9uIiwicmVzZXQiLCJpc05hTiIsImxlbmd0aCIsImRpc3BsYXlOYW1lIiwiaXNHZW5lcmF0b3JGdW5jdGlvbiIsImNvbnN0cnVjdG9yIiwibmFtZSIsIm1hcmsiLCJzZXRQcm90b3R5cGVPZiIsIl9fcHJvdG9fXyIsImF3cmFwIiwiYXN5bmMiLCJQcm9taXNlIiwia2V5cyIsInJldmVyc2UiLCJwb3AiLCJwcmV2IiwiY2hhckF0Iiwic2xpY2UiLCJzdG9wIiwicnZhbCIsImhhbmRsZSIsImNvbXBsZXRlIiwiZmluaXNoIiwiX2NhdGNoIiwiZGVsZWdhdGVZaWVsZCIsImFzeW5jR2VuZXJhdG9yU3RlcCIsIl9hc3luY1RvR2VuZXJhdG9yIiwiYXJndW1lbnRzIiwiYXBwbHkiLCJfbmV4dCIsIl90aHJvdyIsIlJvdXRpbmciLCJtb2RlIiwiZ2VvZmxvIiwiZ3JhcGhEYXRhIiwiZmVhdHVyZXMiLCJnZXREcmF3bkZlYXR1cmVzIiwiYWN0aXZhdGUiLCJlbmFibGVkIiwib3B0aW9ucyIsImVuYWJsZSIsImRlYWN0aXZhdGUiLCJtYXAiLCJnZXRTb3VyY2UiLCJzdGF0aWNzIiwiY29uc3RhbnRzIiwic291cmNlcyIsInNldERhdGEiLCJ0dXJmIiwiZmVhdHVyZUNvbGxlY3Rpb24iLCJnZXRSb3V0ZSIsImZyb21Qb2ludCIsInRvUG9pbnQiLCJtYXBNb3ZpbmciLCJnZXRGZWF0dXJlcyIsInBhdGhmaW5kZXIiLCJQYXRoRmluZGVyIiwicm91dGluZyIsInBhdGgiLCJmaW5kUGF0aCIsInZhbGlkYXRlUGF0aCIsImZpcmUiLCJmcm9tIiwidG8iLCJnZXRNYXRjaCIsIl9yZWYiLCJfY2FsbGVlIiwiY29vcmRzIiwiZmVhdHVyZSIsIl9jYWxsZWUkIiwiX2NvbnRleHQiLCJFeHBsb3JpbmciLCJzZXQiLCJzdGFydCIsInN0YXJ0UG9pbnQiLCJwcm9wZXJ0aWVzIiwiX3giLCJnZXRDbG9zZXN0IiwiY2xvc2VzdFBvaW50IiwibGFzdENsaWNrIiwicm91dGUiLCJsaW5lU3RyaW5nIiwiZ2V0U25hcEZlYXR1cmVzIiwiZmxhdCIsImZpbHRlciIsImdlb21ldHJ5IiwiY29tcGFjdGVkVmVydGljZXMiLCJwcmVwcm9jZXNzIiwiX2dyYXBoIiwiX2tleUZuIiwia2V5Rm4iLCJqb2luIiwiX3ByZWNpc2lvbiIsInByZWNpc2lvbiIsIl9vcHRpb25zIiwiayIsImIiLCJyb3VuZENvb3JkIiwidmVydGljZXMiLCJwaGFudG9tU3RhcnQiLCJfY3JlYXRlUGhhbnRvbSIsInBoYW50b21FbmQiLCJ3ZWlnaHQiLCJmdWxsUGF0aCIsInJlZHVjZSIsImJ1aWxkUGF0aCIsImNzIiwidnMiLCJjb25jYXQiLCJjb21wYWN0ZWRDb29yZGluYXRlcyIsImJpbmQiLCJzb3VyY2VWZXJ0aWNlcyIsImVkZ2VEYXRhcyIsImNvbXBhY3RlZEVkZ2VzIiwiYnVpbGRFZGdlRGF0YSIsImVkcyIsInJlZHVjZWRFZGdlIiwidW5kZWZpbmVkIiwiX3JlbW92ZVBoYW50b20iLCJzZXJpYWxpemUiLCJwaGFudG9tIiwiY29tcGFjdE5vZGUiLCJlZGdlRGF0YSIsImVkZ2VzIiwiY29vcmRpbmF0ZXMiLCJyZWR1Y2VkRWRnZXMiLCJpbmNvbWluZ0VkZ2VzIiwibmVpZ2hib3IiLCJpbmNvbWluZ0Nvb3JkaW5hdGVzIiwiU2hvcnRlc3RQYXRoIiwiSU5GSU5JVFkiLCJhZGRWZXJ0ZXgiLCJzZXRWZXJ0aWNlcyIsImdyYXBoIiwic2hvcnRlc3RQYXRoIiwibm9kZXMiLCJQcmlvcml0eVF1ZXVlIiwiZGlzdGFuY2VzIiwicHJldmlvdXMiLCJzbWFsbGVzdCIsInZlcnRleCIsImFsdCIsImVucXVldWUiLCJpc0VtcHR5IiwiZGVxdWV1ZSIsIl9ub2RlcyIsInByaW9yaXR5Iiwia2V5Iiwic29ydCIsInNoaWZ0IiwiVGlueVF1ZXVlIiwiZGF0YSIsImNvbXBhcmUiLCJfZG93biIsIml0ZW0iLCJfdXAiLCJ0b3AiLCJib3R0b20iLCJwZWVrIiwicG9zIiwicmVmIiwicGFyZW50IiwiY3VycmVudCIsImhhbGZMZW5ndGgiLCJsZWZ0IiwiYmVzdCIsInJpZ2h0IiwiZmluZE5leHRFbmQiLCJlbmRzIiwidmVydGV4Q29vcmRzIiwidHJhY2tJbmNvbWluZyIsInJldmVyc2VXZWlnaHQiLCJlZGdlRGF0YVNlZWQiLCJlZGdlRGF0YVJlZHVjZUZuIiwibm90UHJldmlvdXMiLCJpbmRleE9mIiwibmVpZ2hib3JzIiwiY29tcGFjdEVkZ2UiLCJyZXN1bHQiLCJqIiwiY29tcGFjdEdyYXBoIiwicHJvZ3Jlc3MiLCJmaW5kRW5kcyIsImVzIiwibnVtYmVyRWRnZXMiLCJyZW1vdmUiLCJjb21wYWN0Iiwib3RoZXIiLCJjb21wYWN0RW5kIiwiY29tcGFjdGVkIiwiZW5kIiwiY29zdHMiLCJpbml0aWFsU3RhdGUiLCJxdWV1ZSIsImV4cGxvcmVkIiwic3RhdGUiLCJjb3N0Iiwibm9kZSIsIm5laWdoYm91cnMiLCJuZXdDb3N0IiwibmV3U3RhdGUiLCJ0b3BvIiwid2VpZ2h0Rm4iLCJkZWZhdWx0V2VpZ2h0Rm4iLCJkaXN0YW5jZSIsInBvaW50IiwidG9wb2xvZ3kiLCJidWlsZEdyYXBoIiwiZWRnZSIsInByb3BzIiwidyIsIm1ha2VFZGdlTGlzdCIsImNvbmNhdEVkZ2UiLCJzdGFydE5vZGUiLCJlbmROb2RlIiwiZm9yd2FyZCIsImJhY2t3YXJkIiwiTWF0aCIsInJvdW5kIiwiZ2VvSnNvblJlZHVjZSIsImdlb2pzb24iLCJmbiIsInNlZWQiLCJyZWR1Y2VGZWF0dXJlcyIsImdlb0pzb25GaWx0ZXJGZWF0dXJlcyIsImlzTGluZVN0cmluZyIsImRlZmF1bHRLZXlGbiIsImxpbmVTdHJpbmdzIiwiZXhwbG9kZWRMaW5lU3RyaW5ncyIsImV4cGxvZGUiLCJidWlsZFRvcG9sb2d5VmVydGljZXMiLCJmcyIsInJjIiwiYnVpbGRUb3BvbG9neUVkZ2VzIiwiYnVpbGRMaW5lU3RyaW5nRWRnZXMiLCJrMSIsImsyIiwiTnVtYmVyIiwidG9GaXhlZCIsIm5ld1BhdGgiXSwic291cmNlUm9vdCI6IiJ9