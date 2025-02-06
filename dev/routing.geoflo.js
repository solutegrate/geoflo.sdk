/*!
 * /*!
 *  * GeoFlo SDK
 *  * Version 1.0.11
 *  * Generated on: 2025-02-06T17:54:44.516Z
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LENBQUMsRUFBRTBTLEVBQUUsQ0FBQ3RPLE1BQU0sQ0FBQztRQUNoRDtRQUVBLE9BQU9zTCxFQUFFO01BQ2IsQ0FBQyxFQUFFLEVBQUUsQ0FBQztJQUNWLE9BQU87TUFDSHJGLFFBQVEsRUFBRUEsUUFBUTtNQUNsQnlCLEtBQUssRUFBRUE7SUFDWCxDQUFDO0VBQ0w7RUFBQztFQUVELFNBQVMvRCxZQUFZQSxDQUFDVCxTQUFTLEVBQUVDLE9BQU8sRUFBRU0sSUFBSSxFQUFFO0lBQzVDLElBQUlOLE9BQU8sSUFBSUEsT0FBTyxDQUFDckcsSUFBSSxLQUFLLFdBQVcsRUFBRSxPQUFPLEtBQUs7SUFDekQ7SUFDQSxJQUFJLENBQUMyRyxJQUFJLElBQUksQ0FBQ0EsSUFBSSxDQUFDQSxJQUFJLElBQUksQ0FBQ0EsSUFBSSxDQUFDQSxJQUFJLENBQUN6RCxNQUFNLElBQUl5RCxJQUFJLENBQUNBLElBQUksQ0FBQ3pELE1BQU0sR0FBRyxDQUFDLEVBQUUsT0FBTyxLQUFLO0lBQ2xGLE9BQU95RCxJQUFJO0lBRVhtQyxTQUFTLEdBQUdnSixNQUFNLENBQUMsQ0FBQ0EsTUFBTSxDQUFDaEosU0FBUyxDQUFDLEdBQUcsUUFBUSxFQUFFaUosT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzdELElBQUl2TCxVQUFVLEdBQUcsSUFBSUMsVUFBVSxDQUFDckIsUUFBUSxFQUFFO01BQUUwRCxTQUFTLEVBQUVBO0lBQVUsQ0FBQyxDQUFDO0lBQ25FLElBQUlrSixPQUFPLEdBQUd4TCxVQUFVLENBQUNJLFFBQVEsQ0FBQ1IsU0FBUyxFQUFFQyxPQUFPLENBQUM7SUFDckQsT0FBT1EsWUFBWSxDQUFDVCxTQUFTLEVBQUVDLE9BQU8sRUFBRWpCLFFBQVEsRUFBRTRNLE9BQU8sQ0FBQztFQUM5RDtFQUFDO0FBQ0wsQ0FBQztBQUVELGlFQUFlaE4sT0FBTyIsInNvdXJjZXMiOlsid2VicGFjazovL0Bzb2x1dGVncmF0ZS9nZW9mbG8vLi9zcmMvUm91dGluZy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBtaXhpblxuICogQG1lbWJlcm9mIG1vZHVsZTpnZW9mbG9cbiAqIEBuYW1lIFJvdXRpbmdcbiAqIEBkZXNjcmlwdGlvbiBUaGlzIG1vZHVsZSBwcm92aWRlcyB0aGUgcm91dGluZyBmdW5jdGlvbmFsaXR5IGZvciB0aGUgR2VvZmxvIGFwcGxpY2F0aW9uLiBJdCBhbGxvd3MgdXNlcnMgdG8gY2FsY3VsYXRlIHJvdXRlcyBiZXR3ZWVuIHR3byBwb2ludHMgb24gdGhlIG1hcCB1c2luZyBhIFBhdGhGaW5kZXIgb2JqZWN0LlxuICogQHBhcmFtIHtPYmplY3R9IG1vZGUgLSBUaGUgbW9kZSBvYmplY3QgY29udGFpbmluZyB0aGUgdHlwZSBvZiBtb2RlLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgUm91dGluZyBvYmplY3QuXG4gKi9cbmNvbnN0IFJvdXRpbmcgPSBmdW5jdGlvbiAobW9kZSkge1xuICAgIGNvbnN0IGdlb2ZsbyA9IHRoaXMuZ2VvZmxvO1xuXG4gICAgdGhpcy50eXBlID0gbW9kZS50eXBlO1xuICAgIHRoaXMuZ3JhcGhEYXRhID0ge307XG4gICAgdGhpcy5mZWF0dXJlcyA9IGdlb2Zsby5nZXREcmF3bkZlYXR1cmVzKCk7XG5cblx0LyoqXG5cdCAqIEBmdW5jdGlvblxuICAgICAqIEBtZW1iZXJvZiBtb2R1bGU6Z2VvZmxvLlJvdXRpbmdcblx0ICogQG5hbWUgYWN0aXZhdGVcblx0ICogQGRlc2NyaXB0aW9uIEFjdGl2YXRlcyB0aGUgZnVuY3Rpb25hbGl0eSBieSBzZXR0aW5nIHRoZSAnZW5hYmxlZCcgcHJvcGVydHkgdG8gdHJ1ZSBhbmQgZW5hYmxpbmcgcm91dGluZyBpbiB0aGUgb3B0aW9ucy5cblx0ICogQHBhcmFtcyB7dm9pZH0gTm9uZVxuXHQgKiBAcmV0dXJucyB7dm9pZH1cblx0ICovXG4gICAgdGhpcy5hY3RpdmF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5lbmFibGVkID0gdHJ1ZTtcbiAgICAgICAgZ2VvZmxvLm9wdGlvbnNbJ3JvdXRpbmcnXS5lbmFibGUgPSB0cnVlO1xuICAgIH07XG5cblx0LyoqXG5cdCAqIEBmdW5jdGlvblxuICAgICAqIEBtZW1iZXJvZiBtb2R1bGU6Z2VvZmxvLlJvdXRpbmdcblx0ICogQG5hbWUgZGVhY3RpdmF0ZVxuXHQgKiBAZGVzY3JpcHRpb24gVGhpcyBmdW5jdGlvbiBkZWFjdGl2YXRlcyB0aGUgcm91dGluZyBmZWF0dXJlIGJ5IHNldHRpbmcgdGhlIGVuYWJsZWQgZmxhZyB0byBmYWxzZSwgZGlzYWJsaW5nIHJvdXRpbmcgaW4gdGhlIG9wdGlvbnMsIGFuZCBjbGVhcmluZyB0aGUgcm91dGUgZGF0YSBvbiB0aGUgbWFwLlxuXHQgKiBAcmV0dXJucyB7dm9pZH1cblx0ICovXG4gICAgdGhpcy5kZWFjdGl2YXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmVuYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgZ2VvZmxvLm9wdGlvbnNbJ3JvdXRpbmcnXS5lbmFibGUgPSBmYWxzZTtcbiAgICAgICAgZ2VvZmxvLm1hcC5nZXRTb3VyY2UoZ2VvZmxvLnN0YXRpY3MuY29uc3RhbnRzLnNvdXJjZXNbJ1JPVVRFJ10pLnNldERhdGEodHVyZi5mZWF0dXJlQ29sbGVjdGlvbihbXSkpO1xuICAgIH07XG5cblx0LyoqXG5cdCAqIEBmdW5jdGlvblxuICAgICAqIEBtZW1iZXJvZiBtb2R1bGU6Z2VvZmxvLlJvdXRpbmdcblx0ICogQG5hbWUgZ2V0Um91dGVcblx0ICogQGRlc2NyaXB0aW9uIFRoaXMgZnVuY3Rpb24gY2FsY3VsYXRlcyBhIHJvdXRlIGJldHdlZW4gdHdvIHBvaW50cyBvbiBhIG1hcCB1c2luZyBhIFBhdGhGaW5kZXIgb2JqZWN0LiBJdCBjaGVja3MgaWYgdGhlIHJvdXRpbmcgZmVhdHVyZSBpcyBlbmFibGVkIGFuZCBpZiB0aGUgbWFwIGlzIG5vdCBjdXJyZW50bHkgbW92aW5nLiBJdCB0aGVuIGNyZWF0ZXMgYSBmZWF0dXJlIGNvbGxlY3Rpb24gZnJvbSB0aGUgZXhpc3RpbmcgZmVhdHVyZXMsIGluaXRpYWxpemVzIGEgUGF0aEZpbmRlciBvYmplY3QsIGFuZCBmaW5kcyBhIHBhdGggYmV0d2VlbiB0aGUgdHdvIHBvaW50cy4gVGhlIHBhdGggaXMgdmFsaWRhdGVkIGFuZCB0aGVuIGFkZGVkIHRvIHRoZSBtYXAgd2l0aCBhICdyb3V0aW5nLmFkZCcgZXZlbnQuXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBmcm9tUG9pbnQgLSBUaGUgc3RhcnRpbmcgcG9pbnQgZm9yIHRoZSByb3V0ZS5cblx0ICogQHBhcmFtIHtPYmplY3R9IHRvUG9pbnQgLSBUaGUgZGVzdGluYXRpb24gcG9pbnQgZm9yIHRoZSByb3V0ZS5cblx0ICogQHJldHVybnMge0FycmF5fGJvb2xlYW59IFRoZSBjYWxjdWxhdGVkIHJvdXRlIHBhdGggYXMgYW4gYXJyYXkgb2YgcG9pbnRzLCBvciBmYWxzZSBpZiB0aGUgcm91dGUgY291bGQgbm90IGJlIGNhbGN1bGF0ZWQuXG5cdCAqL1xuICAgIHRoaXMuZ2V0Um91dGUgPSBmdW5jdGlvbiAoZnJvbVBvaW50LCB0b1BvaW50KSB7XG4gICAgICAgIGlmICghdGhpcy5lbmFibGVkIHx8IGdlb2Zsby5tYXBNb3ZpbmcpIHJldHVybiBmYWxzZTtcbiAgICAgICAgdmFyIGZlYXR1cmVzID0gdHVyZi5mZWF0dXJlQ29sbGVjdGlvbih0aGlzLmdldEZlYXR1cmVzKCkpO1xuICAgICAgICB2YXIgcGF0aGZpbmRlciA9IG5ldyBQYXRoRmluZGVyKGZlYXR1cmVzLCBnZW9mbG8ub3B0aW9ucy5yb3V0aW5nKTtcbiAgICAgICAgdmFyIHBhdGggPSBwYXRoZmluZGVyLmZpbmRQYXRoID8gcGF0aGZpbmRlci5maW5kUGF0aChmcm9tUG9pbnQsIHRvUG9pbnQpIDogZmFsc2U7XG4gICAgICAgIHBhdGggPSB2YWxpZGF0ZVBhdGgoZnJvbVBvaW50LCB0b1BvaW50LCBwYXRoKTtcbiAgICAgICAgZ2VvZmxvLmZpcmUoJ3JvdXRpbmcuYWRkJywgeyBmcm9tOiBmcm9tUG9pbnQsIHRvOiB0b1BvaW50LCBwYXRoOiBwYXRoIH0pO1xuICAgICAgICByZXR1cm4gcGF0aDtcbiAgICB9O1xuXG5cdC8qKlxuXHQgKiBAZnVuY3Rpb25cbiAgICAgKiBAbWVtYmVyb2YgbW9kdWxlOmdlb2Zsby5Sb3V0aW5nXG5cdCAqIEBuYW1lIGdldE1hdGNoXG5cdCAqIEBkZXNjcmlwdGlvbiBSZXRyaWV2ZXMgYSBtYXRjaCBmb3IgdGhlIGdpdmVuIGNvb3JkaW5hdGVzIHVzaW5nIHRoZSBFeHBsb3Jpbmcgc2VydmljZS4gU2V0cyB0aGUgbWF0Y2ggYXMgYSBzdGFydGluZyBwb2ludCBmb3Igcm91dGluZy5cblx0ICogQHBhcmFtIHtPYmplY3R9IGNvb3JkcyAtIFRoZSBjb29yZGluYXRlcyBmb3Igd2hpY2ggdG8gZmluZCBhIG1hdGNoLlxuXHQgKiBAcmV0dXJucyB7UHJvbWlzZTxPYmplY3Q+fSBUaGUgbWF0Y2hlZCBmZWF0dXJlIHdpdGggcm91dGluZyBwcm9wZXJ0eSBzZXQgdG8gdHJ1ZS5cblx0ICovXG4gICAgdGhpcy5nZXRNYXRjaCA9IGFzeW5jIGZ1bmN0aW9uIChjb29yZHMpIHtcbiAgICAgICAgaWYgKCFnZW9mbG8uRXhwbG9yaW5nKSByZXR1cm4ge307XG4gICAgICAgIHZhciBmZWF0dXJlID0gYXdhaXQgZ2VvZmxvLkV4cGxvcmluZy5nZXRNYXRjaChjb29yZHMsIHsgc2V0OiB0cnVlLCBzdGFydDogZ2VvZmxvLnN0YXJ0UG9pbnQgfSk7XG4gICAgICAgIGZlYXR1cmUucHJvcGVydGllcy5yb3V0aW5nID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIGZlYXR1cmU7XG4gICAgfVxuXG5cdC8qKlxuXHQgKiBAZnVuY3Rpb25cbiAgICAgKiBAbWVtYmVyb2YgbW9kdWxlOmdlb2Zsby5Sb3V0aW5nXG5cdCAqIEBuYW1lIGdldENsb3Nlc3Rcblx0ICogQGRlc2NyaXB0aW9uIENhbGN1bGF0ZXMgdGhlIGNsb3Nlc3QgcG9pbnQgb24gYSByb3V0ZSBiYXNlZCBvbiB0aGUgbGFzdCBjbGljayBhbmQgdGhlIGNsb3Nlc3QgcG9pbnQgdG8gaXQuXG5cdCAqIEByZXR1cm5zIHtPYmplY3R8Ym9vbGVhbn0gUmV0dXJucyBhIEdlb0pTT04gTGluZVN0cmluZyBmZWF0dXJlIHdpdGggcm91dGluZyBwcm9wZXJ0eSBzZXQgdG8gdHJ1ZSBpZiBzdWNjZXNzZnVsLCBvdGhlcndpc2UgZmFsc2UuXG5cdCAqL1xuICAgIHRoaXMuZ2V0Q2xvc2VzdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCFnZW9mbG8uY2xvc2VzdFBvaW50IHx8ICFnZW9mbG8ubGFzdENsaWNrKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIHZhciByb3V0ZSA9IHRoaXMuZ2V0Um91dGUoZ2VvZmxvLmxhc3RDbGljaywgZ2VvZmxvLmNsb3Nlc3RQb2ludCk7XG4gICAgICAgIGlmICghcm91dGUgfHwgIXJvdXRlLnBhdGgpIHJldHVybiBmYWxzZTtcbiAgICAgICAgdmFyIGZlYXR1cmUgPSB0dXJmLmxpbmVTdHJpbmcocm91dGUucGF0aCk7XG4gICAgICAgIGZlYXR1cmUucHJvcGVydGllcy5yb3V0aW5nID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIGZlYXR1cmU7XG4gICAgfTtcblxuXHQvKipcblx0ICogQGZ1bmN0aW9uXG4gICAgICogQG1lbWJlcm9mIG1vZHVsZTpnZW9mbG8uUm91dGluZ1xuXHQgKiBAbmFtZSBnZXRGZWF0dXJlc1xuXHQgKiBAZGVzY3JpcHRpb24gUmV0cmlldmVzIGZlYXR1cmVzIG9mIHR5cGUgJ0xpbmVTdHJpbmcnIGZyb20gdGhlIG1lc2ggaW5kZXguXG5cdCAqIEByZXR1cm5zIHtBcnJheX0gQW4gYXJyYXkgb2YgZmVhdHVyZXMgb2YgdHlwZSAnTGluZVN0cmluZycuXG5cdCAqL1xuICAgIHRoaXMuZ2V0RmVhdHVyZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBmZWF0dXJlcyA9IFtnZW9mbG8uZ2V0U25hcEZlYXR1cmVzKCksIGdlb2Zsby5nZXREcmF3bkZlYXR1cmVzKCldLmZsYXQoKTtcbiAgICAgICAgcmV0dXJuIGZlYXR1cmVzLmZpbHRlcihmdW5jdGlvbihmZWF0dXJlKSB7IHJldHVybiBmZWF0dXJlLmdlb21ldHJ5LnR5cGUgPT09ICdMaW5lU3RyaW5nJyB9KTtcbiAgICB9O1xuXG4gICAgXG4gICAgaWYgKGdlb2Zsby5vcHRpb25zWydyb3V0aW5nJ10uZW5hYmxlKSB0aGlzLmFjdGl2YXRlKCk7XG5cblxuICAgIGZ1bmN0aW9uIFBhdGhGaW5kZXIoZmVhdHVyZXMsIG9wdGlvbnMpIHtcbiAgICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgICAgIFxuICAgICAgICBpZiAoIWZlYXR1cmVzLmNvbXBhY3RlZFZlcnRpY2VzKSB7IGZlYXR1cmVzID0gcHJlcHJvY2VzcyhmZWF0dXJlcywgb3B0aW9ucyk7IH1cblxuICAgICAgICB0aGlzLl9ncmFwaCA9IGZlYXR1cmVzO1xuICAgICAgICB0aGlzLl9rZXlGbiA9IG9wdGlvbnMua2V5Rm4gfHwgZnVuY3Rpb24oYykgeyByZXR1cm4gYy5qb2luKCcsJyk7IH07XG4gICAgICAgIHRoaXMuX3ByZWNpc2lvbiA9IG9wdGlvbnMucHJlY2lzaW9uIHx8IDFlLTU7XG4gICAgICAgIHRoaXMuX29wdGlvbnMgPSBvcHRpb25zO1xuICAgIFxuICAgICAgICBpZiAoT2JqZWN0LmtleXModGhpcy5fZ3JhcGguY29tcGFjdGVkVmVydGljZXMpLmZpbHRlcihmdW5jdGlvbihrKSB7IHJldHVybiBrICE9PSAnZWRnZURhdGEnOyB9KS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5maW5kUGF0aCA9IGZ1bmN0aW9uKGEsIGIpIHtcbiAgICAgICAgICAgIHZhciBzdGFydCA9IHRoaXMuX2tleUZuKHJvdW5kQ29vcmQoYS5jb29yZHMsIHRoaXMuX3ByZWNpc2lvbikpLFxuICAgICAgICAgICAgICAgIGZpbmlzaCA9IHRoaXMuX2tleUZuKHJvdW5kQ29vcmQoYi5jb29yZHMsIHRoaXMuX3ByZWNpc2lvbikpO1xuICAgIFxuICAgICAgICAgICAgaWYgKCF0aGlzLl9ncmFwaC52ZXJ0aWNlc1tzdGFydF0gfHwgIXRoaXMuX2dyYXBoLnZlcnRpY2VzW2ZpbmlzaF0pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICBcbiAgICAgICAgICAgIHZhciBwaGFudG9tU3RhcnQgPSB0aGlzLl9jcmVhdGVQaGFudG9tKHN0YXJ0KTtcbiAgICAgICAgICAgIHZhciBwaGFudG9tRW5kID0gdGhpcy5fY3JlYXRlUGhhbnRvbShmaW5pc2gpO1xuICAgIFxuICAgICAgICAgICAgdmFyIHBhdGggPSBmaW5kUGF0aCh0aGlzLl9ncmFwaC5jb21wYWN0ZWRWZXJ0aWNlcywgc3RhcnQsIGZpbmlzaCk7XG4gICAgXG4gICAgICAgICAgICBpZiAocGF0aCkge1xuICAgICAgICAgICAgICAgIHZhciB3ZWlnaHQgPSBwYXRoWzBdO1xuICAgICAgICAgICAgICAgIHBhdGggPSBwYXRoWzFdO1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIGZ1bGxQYXRoOiBwYXRoLFxuICAgICAgICAgICAgICAgICAgICBwYXRoOiBwYXRoLnJlZHVjZShmdW5jdGlvbiBidWlsZFBhdGgoY3MsIHYsIGksIHZzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaSA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjcyA9IGNzLmNvbmNhdCh0aGlzLl9ncmFwaC5jb21wYWN0ZWRDb29yZGluYXRlc1t2c1tpIC0gMV1dW3ZdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjcztcbiAgICAgICAgICAgICAgICAgICAgfS5iaW5kKHRoaXMpLCBbXSkuY29uY2F0KFt0aGlzLl9ncmFwaC5zb3VyY2VWZXJ0aWNlc1tmaW5pc2hdXSksXG4gICAgICAgICAgICAgICAgICAgIHdlaWdodDogd2VpZ2h0LFxuICAgICAgICAgICAgICAgICAgICBlZGdlRGF0YXM6IHRoaXMuX2dyYXBoLmNvbXBhY3RlZEVkZ2VzIFxuICAgICAgICAgICAgICAgICAgICAgICAgPyBwYXRoLnJlZHVjZShmdW5jdGlvbiBidWlsZEVkZ2VEYXRhKGVkcywgdiwgaSwgdnMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaSA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWRzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVkdWNlZEVkZ2U6IHRoaXMuX2dyYXBoLmNvbXBhY3RlZEVkZ2VzW3ZzW2kgLSAxXV1bdl1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBlZHM7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LmJpbmQodGhpcyksIFtdKVxuICAgICAgICAgICAgICAgICAgICAgICAgOiB1bmRlZmluZWRcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICBcbiAgICAgICAgICAgIHRoaXMuX3JlbW92ZVBoYW50b20ocGhhbnRvbVN0YXJ0KTtcbiAgICAgICAgICAgIHRoaXMuX3JlbW92ZVBoYW50b20ocGhhbnRvbUVuZCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNlcmlhbGl6ZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2dyYXBoO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fY3JlYXRlUGhhbnRvbSA9IGZ1bmN0aW9uKG4pIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9ncmFwaC5jb21wYWN0ZWRWZXJ0aWNlc1tuXSkgcmV0dXJuIG51bGw7XG4gICAgXG4gICAgICAgICAgICB2YXIgcGhhbnRvbSA9IGNvbXBhY3ROb2RlKG4sIHRoaXMuX2dyYXBoLnZlcnRpY2VzLCB0aGlzLl9ncmFwaC5jb21wYWN0ZWRWZXJ0aWNlcywgdGhpcy5fZ3JhcGguc291cmNlVmVydGljZXMsIHRoaXMuX2dyYXBoLmVkZ2VEYXRhLCB0cnVlLCB0aGlzLl9vcHRpb25zKTtcbiAgICAgICAgICAgIHRoaXMuX2dyYXBoLmNvbXBhY3RlZFZlcnRpY2VzW25dID0gcGhhbnRvbS5lZGdlcztcbiAgICAgICAgICAgIHRoaXMuX2dyYXBoLmNvbXBhY3RlZENvb3JkaW5hdGVzW25dID0gcGhhbnRvbS5jb29yZGluYXRlcztcbiAgICBcbiAgICAgICAgICAgIGlmICh0aGlzLl9ncmFwaC5jb21wYWN0ZWRFZGdlcykge1xuICAgICAgICAgICAgICAgIHRoaXMuX2dyYXBoLmNvbXBhY3RlZEVkZ2VzW25dID0gcGhhbnRvbS5yZWR1Y2VkRWRnZXM7XG4gICAgICAgICAgICB9XG4gICAgXG4gICAgICAgICAgICBPYmplY3Qua2V5cyhwaGFudG9tLmluY29taW5nRWRnZXMpLmZvckVhY2goZnVuY3Rpb24obmVpZ2hib3IpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9ncmFwaC5jb21wYWN0ZWRWZXJ0aWNlc1tuZWlnaGJvcl1bbl0gPSBwaGFudG9tLmluY29taW5nRWRnZXNbbmVpZ2hib3JdO1xuICAgICAgICAgICAgICAgIHRoaXMuX2dyYXBoLmNvbXBhY3RlZENvb3JkaW5hdGVzW25laWdoYm9yXVtuXSA9IFt0aGlzLl9ncmFwaC5zb3VyY2VWZXJ0aWNlc1tuZWlnaGJvcl1dLmNvbmNhdChwaGFudG9tLmluY29taW5nQ29vcmRpbmF0ZXNbbmVpZ2hib3JdLnNsaWNlKDAsIC0xKSk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2dyYXBoLmNvbXBhY3RlZEVkZ2VzKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2dyYXBoLmNvbXBhY3RlZEVkZ2VzW25laWdoYm9yXVtuXSA9IHBoYW50b20ucmVkdWNlZEVkZ2VzW25laWdoYm9yXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LmJpbmQodGhpcykpXG4gICAgXG4gICAgICAgICAgICByZXR1cm4gbjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3JlbW92ZVBoYW50b20gPSBmdW5jdGlvbihuKSB7XG4gICAgICAgICAgICBpZiAoIW4pIHJldHVybjtcbiAgICBcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKHRoaXMuX2dyYXBoLmNvbXBhY3RlZFZlcnRpY2VzW25dKS5mb3JFYWNoKGZ1bmN0aW9uKG5laWdoYm9yKSB7XG4gICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuX2dyYXBoLmNvbXBhY3RlZFZlcnRpY2VzW25laWdoYm9yXVtuXTtcbiAgICAgICAgICAgIH0uYmluZCh0aGlzKSk7XG4gICAgICAgICAgICBPYmplY3Qua2V5cyh0aGlzLl9ncmFwaC5jb21wYWN0ZWRDb29yZGluYXRlc1tuXSkuZm9yRWFjaChmdW5jdGlvbihuZWlnaGJvcikge1xuICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9ncmFwaC5jb21wYWN0ZWRDb29yZGluYXRlc1tuZWlnaGJvcl1bbl07XG4gICAgICAgICAgICB9LmJpbmQodGhpcykpO1xuICAgICAgICAgICAgaWYgKHRoaXMuX2dyYXBoLmNvbXBhY3RlZEVkZ2VzKSB7XG4gICAgICAgICAgICAgICAgT2JqZWN0LmtleXModGhpcy5fZ3JhcGguY29tcGFjdGVkRWRnZXNbbl0pLmZvckVhY2goZnVuY3Rpb24obmVpZ2hib3IpIHtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuX2dyYXBoLmNvbXBhY3RlZEVkZ2VzW25laWdoYm9yXVtuXTtcbiAgICAgICAgICAgICAgICB9LmJpbmQodGhpcykpO1xuICAgICAgICAgICAgfVxuICAgIFxuICAgICAgICAgICAgZGVsZXRlIHRoaXMuX2dyYXBoLmNvbXBhY3RlZFZlcnRpY2VzW25dO1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMuX2dyYXBoLmNvbXBhY3RlZENvb3JkaW5hdGVzW25dO1xuICAgIFxuICAgICAgICAgICAgaWYgKHRoaXMuX2dyYXBoLmNvbXBhY3RlZEVkZ2VzKSB7XG4gICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuX2dyYXBoLmNvbXBhY3RlZEVkZ2VzW25dO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIFNob3J0ZXN0UGF0aCAoKSB7XG4gICAgICAgIHZhciBJTkZJTklUWSA9IDEgLyAwO1xuICAgICAgICB0aGlzLnZlcnRpY2VzID0ge307XG4gICAgXG4gICAgICAgIHRoaXMuYWRkVmVydGV4ID0gZnVuY3Rpb24gKG5hbWUsIGVkZ2VzKSB7XG4gICAgICAgICAgICB0aGlzLnZlcnRpY2VzW25hbWVdID0gZWRnZXM7XG4gICAgICAgIH07XG4gICAgXG4gICAgICAgIHRoaXMuc2V0VmVydGljZXMgPSBmdW5jdGlvbiAoZ3JhcGgpIHtcbiAgICAgICAgICAgIHRoaXMudmVydGljZXMgPSBncmFwaDtcbiAgICAgICAgfTtcbiAgICBcbiAgICAgICAgdGhpcy5zaG9ydGVzdFBhdGggPSBmdW5jdGlvbiAoc3RhcnQsIGZpbmlzaCkge1xuICAgICAgICAgICAgdmFyIG5vZGVzID0gbmV3IFByaW9yaXR5UXVldWUoKSxcbiAgICAgICAgICAgICAgICBkaXN0YW5jZXMgPSB7fSxcbiAgICAgICAgICAgICAgICBwcmV2aW91cyA9IHt9LFxuICAgICAgICAgICAgICAgIHBhdGggPSBbXSxcbiAgICAgICAgICAgICAgICBzbWFsbGVzdCwgdmVydGV4LCBuZWlnaGJvciwgYWx0O1xuICAgICAgICBcbiAgICAgICAgICAgIGZvciAodmVydGV4IGluIHRoaXMudmVydGljZXMpIHtcbiAgICAgICAgICAgICAgICBpZiAodmVydGV4ID09PSBzdGFydCkge1xuICAgICAgICAgICAgICAgICAgICBkaXN0YW5jZXNbdmVydGV4XSA9IDA7XG4gICAgICAgICAgICAgICAgICAgIG5vZGVzLmVucXVldWUoMCwgdmVydGV4KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBkaXN0YW5jZXNbdmVydGV4XSA9IElORklOSVRZO1xuICAgICAgICAgICAgICAgICAgICBub2Rlcy5lbnF1ZXVlKElORklOSVRZLCB2ZXJ0ZXgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgICAgICAgICAgcHJldmlvdXNbdmVydGV4XSA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgICAgd2hpbGUgKCFub2Rlcy5pc0VtcHR5KCkpIHtcbiAgICAgICAgICAgICAgICBzbWFsbGVzdCA9IG5vZGVzLmRlcXVldWUoKTtcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKHNtYWxsZXN0ID09PSBmaW5pc2gpIHtcbiAgICAgICAgICAgICAgICAgICAgcGF0aCA9IFtdO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIHdoaWxlIChwcmV2aW91c1tzbWFsbGVzdF0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhdGgucHVzaChzbWFsbGVzdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzbWFsbGVzdCA9IHByZXZpb3VzW3NtYWxsZXN0XTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKCFzbWFsbGVzdCB8fCBkaXN0YW5jZXNbc21hbGxlc3RdID09PSBJTkZJTklUWSkge1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgICAgICAgIGZvciAobmVpZ2hib3IgaW4gdGhpcy52ZXJ0aWNlc1tzbWFsbGVzdF0pIHtcbiAgICAgICAgICAgICAgICAgICAgYWx0ID0gZGlzdGFuY2VzW3NtYWxsZXN0XSArIHRoaXMudmVydGljZXNbc21hbGxlc3RdW25laWdoYm9yXTtcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGlmIChhbHQgPCBkaXN0YW5jZXNbbmVpZ2hib3JdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkaXN0YW5jZXNbbmVpZ2hib3JdID0gYWx0O1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJldmlvdXNbbmVpZ2hib3JdID0gc21hbGxlc3Q7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGVzLmVucXVldWUoYWx0LCBuZWlnaGJvcik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuIHBhdGg7XG4gICAgICAgIH07XG4gICAgfTtcbiAgICBcbiAgICBmdW5jdGlvbiBQcmlvcml0eVF1ZXVlKCkge1xuICAgICAgICB0aGlzLl9ub2RlcyA9IFtdO1xuICAgIFxuICAgICAgICB0aGlzLmVucXVldWUgPSBmdW5jdGlvbiAocHJpb3JpdHksIGtleSkge1xuICAgICAgICAgICAgdGhpcy5fbm9kZXMucHVzaCh7a2V5OiBrZXksIHByaW9yaXR5OiBwcmlvcml0eX0pO1xuICAgICAgICAgICAgdGhpcy5zb3J0KCk7XG4gICAgICAgIH07XG4gICAgXG4gICAgICAgIHRoaXMuZGVxdWV1ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9ub2Rlcy5zaGlmdCgpLmtleTtcbiAgICAgICAgfTtcbiAgICBcbiAgICAgICAgdGhpcy5zb3J0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5fbm9kZXMuc29ydCgoYSwgYikgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBhLnByaW9yaXR5IC0gYi5wcmlvcml0eTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgIFxuICAgICAgICB0aGlzLmlzRW1wdHkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gIXRoaXMuX25vZGVzLmxlbmd0aDtcbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gVGlueVF1ZXVlKGRhdGEsIGNvbXBhcmUpIHtcbiAgICAgICAgaWYgKCBkYXRhID09PSB2b2lkIDAgKSBkYXRhID0gW107XG4gICAgICAgIGlmICggY29tcGFyZSA9PT0gdm9pZCAwICkgY29tcGFyZSA9IGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgICAgICByZXR1cm4gYSA8IGIgPyAtMSA6IGEgPiBiID8gMSA6IDA7XG4gICAgICAgIH07XG4gICAgXG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XG4gICAgICAgIHRoaXMubGVuZ3RoID0gdGhpcy5kYXRhLmxlbmd0aDtcbiAgICAgICAgdGhpcy5jb21wYXJlID0gY29tcGFyZTtcbiAgICBcbiAgICAgICAgaWYgKHRoaXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9ICh0aGlzLmxlbmd0aCA+PiAxKSAtIDE7IGkgPj0gMDsgaS0tKSB7IHRoaXMuX2Rvd24oaSk7IH1cbiAgICAgICAgfVxuICAgIFxuICAgICAgICB0aGlzLnB1c2ggPSBmdW5jdGlvbiBwdXNoIChpdGVtKSB7XG4gICAgICAgICAgICB0aGlzLmRhdGEucHVzaChpdGVtKTtcbiAgICAgICAgICAgIHRoaXMubGVuZ3RoKys7XG4gICAgICAgICAgICB0aGlzLl91cCh0aGlzLmxlbmd0aCAtIDEpO1xuICAgICAgICB9O1xuICAgICAgICBcbiAgICAgICAgdGhpcy5wb3AgPSBmdW5jdGlvbiBwb3AgKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMubGVuZ3RoID09PSAwKSB7IHJldHVybiB1bmRlZmluZWQ7IH1cbiAgICAgICAgXG4gICAgICAgICAgICB2YXIgdG9wID0gdGhpcy5kYXRhWzBdO1xuICAgICAgICAgICAgdmFyIGJvdHRvbSA9IHRoaXMuZGF0YS5wb3AoKTtcbiAgICAgICAgICAgIHRoaXMubGVuZ3RoLS07XG4gICAgICAgIFxuICAgICAgICAgICAgaWYgKHRoaXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZGF0YVswXSA9IGJvdHRvbTtcbiAgICAgICAgICAgICAgICB0aGlzLl9kb3duKDApO1xuICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgICAgIHJldHVybiB0b3A7XG4gICAgICAgIH07XG4gICAgICAgIFxuICAgICAgICB0aGlzLnBlZWsgPSBmdW5jdGlvbiBwZWVrICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRhdGFbMF07XG4gICAgICAgIH07XG4gICAgICAgIFxuICAgICAgICB0aGlzLl91cCA9IGZ1bmN0aW9uIF91cCAocG9zKSB7XG4gICAgICAgICAgICB2YXIgcmVmID0gdGhpcztcbiAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IHJlZi5kYXRhO1xuICAgICAgICAgICAgICAgIHZhciBjb21wYXJlID0gcmVmLmNvbXBhcmU7XG4gICAgICAgICAgICB2YXIgaXRlbSA9IGRhdGFbcG9zXTtcbiAgICAgICAgXG4gICAgICAgICAgICB3aGlsZSAocG9zID4gMCkge1xuICAgICAgICAgICAgICAgIHZhciBwYXJlbnQgPSAocG9zIC0gMSkgPj4gMTtcbiAgICAgICAgICAgICAgICB2YXIgY3VycmVudCA9IGRhdGFbcGFyZW50XTtcbiAgICAgICAgICAgICAgICBpZiAoY29tcGFyZShpdGVtLCBjdXJyZW50KSA+PSAwKSB7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgZGF0YVtwb3NdID0gY3VycmVudDtcbiAgICAgICAgICAgICAgICBwb3MgPSBwYXJlbnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgICAgZGF0YVtwb3NdID0gaXRlbTtcbiAgICAgICAgfTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuX2Rvd24gPSBmdW5jdGlvbiBfZG93biAocG9zKSB7XG4gICAgICAgICAgICB2YXIgcmVmID0gdGhpcztcbiAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IHJlZi5kYXRhO1xuICAgICAgICAgICAgICAgIHZhciBjb21wYXJlID0gcmVmLmNvbXBhcmU7XG4gICAgICAgICAgICB2YXIgaGFsZkxlbmd0aCA9IHRoaXMubGVuZ3RoID4+IDE7XG4gICAgICAgICAgICB2YXIgaXRlbSA9IGRhdGFbcG9zXTtcbiAgICAgICAgXG4gICAgICAgICAgICB3aGlsZSAocG9zIDwgaGFsZkxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHZhciBsZWZ0ID0gKHBvcyA8PCAxKSArIDE7XG4gICAgICAgICAgICAgICAgdmFyIGJlc3QgPSBkYXRhW2xlZnRdO1xuICAgICAgICAgICAgICAgIHZhciByaWdodCA9IGxlZnQgKyAxO1xuICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiAocmlnaHQgPCB0aGlzLmxlbmd0aCAmJiBjb21wYXJlKGRhdGFbcmlnaHRdLCBiZXN0KSA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgbGVmdCA9IHJpZ2h0O1xuICAgICAgICAgICAgICAgICAgICBiZXN0ID0gZGF0YVtyaWdodF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChjb21wYXJlKGJlc3QsIGl0ZW0pID49IDApIHsgYnJlYWs7IH1cbiAgICAgICAgXG4gICAgICAgICAgICAgICAgZGF0YVtwb3NdID0gYmVzdDtcbiAgICAgICAgICAgICAgICBwb3MgPSBsZWZ0O1xuICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgICAgIGRhdGFbcG9zXSA9IGl0ZW07XG4gICAgICAgIH07XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGZpbmROZXh0RW5kKHByZXYsIHYsIHZlcnRpY2VzLCBlbmRzLCB2ZXJ0ZXhDb29yZHMsIGVkZ2VEYXRhLCB0cmFja0luY29taW5nLCBvcHRpb25zKSB7XG4gICAgICAgIHZhciB3ZWlnaHQgPSB2ZXJ0aWNlc1twcmV2XVt2XSxcbiAgICAgICAgICAgIHJldmVyc2VXZWlnaHQgPSB2ZXJ0aWNlc1t2XVtwcmV2XSxcbiAgICAgICAgICAgIGNvb3JkaW5hdGVzID0gW10sXG4gICAgICAgICAgICBwYXRoID0gW10sXG4gICAgICAgICAgICByZWR1Y2VkRWRnZSA9IG9wdGlvbnMuZWRnZURhdGFTZWVkO1xuICAgICAgICAgICAgXG4gICAgICAgIGlmIChvcHRpb25zLmVkZ2VEYXRhUmVkdWNlRm4pIHtcbiAgICAgICAgICAgIHJlZHVjZWRFZGdlID0gb3B0aW9ucy5lZGdlRGF0YVJlZHVjZUZuKHJlZHVjZWRFZGdlLCBlZGdlRGF0YVt2XVtwcmV2XSk7XG4gICAgICAgIH1cbiAgICBcbiAgICAgICAgd2hpbGUgKCFlbmRzW3ZdKSB7XG4gICAgICAgICAgICB2YXIgZWRnZXMgPSB2ZXJ0aWNlc1t2XTtcbiAgICBcbiAgICAgICAgICAgIGlmICghZWRnZXMpIHsgYnJlYWs7IH1cbiAgICBcbiAgICAgICAgICAgIHZhciBuZXh0ID0gT2JqZWN0LmtleXMoZWRnZXMpLmZpbHRlcihmdW5jdGlvbiBub3RQcmV2aW91cyhrKSB7IHJldHVybiBrICE9PSBwcmV2OyB9KVswXTtcbiAgICAgICAgICAgIHdlaWdodCArPSBlZGdlc1tuZXh0XTtcbiAgICBcbiAgICAgICAgICAgIGlmICh0cmFja0luY29taW5nKSB7XG4gICAgICAgICAgICAgICAgcmV2ZXJzZVdlaWdodCArPSB2ZXJ0aWNlc1tuZXh0XVt2XTtcbiAgICBcbiAgICAgICAgICAgICAgICBpZiAocGF0aC5pbmRleE9mKHYpID49IDApIHtcbiAgICAgICAgICAgICAgICAgICAgZW5kc1t2XSA9IHZlcnRpY2VzW3ZdO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcGF0aC5wdXNoKHYpO1xuICAgICAgICAgICAgfVxuICAgIFxuICAgICAgICAgICAgaWYgKG9wdGlvbnMuZWRnZURhdGFSZWR1Y2VGbikge1xuICAgICAgICAgICAgICAgIHJlZHVjZWRFZGdlID0gb3B0aW9ucy5lZGdlRGF0YVJlZHVjZUZuKHJlZHVjZWRFZGdlLCBlZGdlRGF0YVt2XVtuZXh0XSk7XG4gICAgICAgICAgICB9XG4gICAgXG4gICAgICAgICAgICBjb29yZGluYXRlcy5wdXNoKHZlcnRleENvb3Jkc1t2XSk7XG4gICAgICAgICAgICBwcmV2ID0gdjtcbiAgICAgICAgICAgIHYgPSBuZXh0O1xuICAgICAgICB9XG4gICAgXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB2ZXJ0ZXg6IHYsXG4gICAgICAgICAgICB3ZWlnaHQ6IHdlaWdodCxcbiAgICAgICAgICAgIHJldmVyc2VXZWlnaHQ6IHJldmVyc2VXZWlnaHQsXG4gICAgICAgICAgICBjb29yZGluYXRlczogY29vcmRpbmF0ZXMsXG4gICAgICAgICAgICByZWR1Y2VkRWRnZTogcmVkdWNlZEVkZ2VcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIFxuICAgIGZ1bmN0aW9uIGNvbXBhY3ROb2RlKGssIHZlcnRpY2VzLCBlbmRzLCB2ZXJ0ZXhDb29yZHMsIGVkZ2VEYXRhLCB0cmFja0luY29taW5nLCBvcHRpb25zKSB7XG4gICAgICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgICAgICB2YXIgbmVpZ2hib3JzID0gdmVydGljZXNba107XG4gICAgICAgIHJldHVybiBPYmplY3Qua2V5cyhuZWlnaGJvcnMpLnJlZHVjZShmdW5jdGlvbiBjb21wYWN0RWRnZShyZXN1bHQsIGopIHtcbiAgICAgICAgICAgIHZhciBuZWlnaGJvciA9IGZpbmROZXh0RW5kKGssIGosIHZlcnRpY2VzLCBlbmRzLCB2ZXJ0ZXhDb29yZHMsIGVkZ2VEYXRhLCB0cmFja0luY29taW5nLCBvcHRpb25zKTtcbiAgICAgICAgICAgIHZhciB3ZWlnaHQgPSBuZWlnaGJvci53ZWlnaHQ7XG4gICAgICAgICAgICB2YXIgcmV2ZXJzZVdlaWdodCA9IG5laWdoYm9yLnJldmVyc2VXZWlnaHQ7XG4gICAgICAgICAgICBpZiAobmVpZ2hib3IudmVydGV4ICE9PSBrKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFyZXN1bHQuZWRnZXNbbmVpZ2hib3IudmVydGV4XSB8fCByZXN1bHQuZWRnZXNbbmVpZ2hib3IudmVydGV4XSA+IHdlaWdodCkge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQuZWRnZXNbbmVpZ2hib3IudmVydGV4XSA9IHdlaWdodDtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LmNvb3JkaW5hdGVzW25laWdoYm9yLnZlcnRleF0gPSBbdmVydGV4Q29vcmRzW2tdXS5jb25jYXQobmVpZ2hib3IuY29vcmRpbmF0ZXMpO1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQucmVkdWNlZEVkZ2VzW25laWdoYm9yLnZlcnRleF0gPSBuZWlnaGJvci5yZWR1Y2VkRWRnZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHRyYWNrSW5jb21pbmcgJiYgXG4gICAgICAgICAgICAgICAgICAgICFpc05hTihyZXZlcnNlV2VpZ2h0KSAmJiAoIXJlc3VsdC5pbmNvbWluZ0VkZ2VzW25laWdoYm9yLnZlcnRleF0gfHwgcmVzdWx0LmluY29taW5nRWRnZXNbbmVpZ2hib3IudmVydGV4XSA+IHJldmVyc2VXZWlnaHQpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5pbmNvbWluZ0VkZ2VzW25laWdoYm9yLnZlcnRleF0gPSByZXZlcnNlV2VpZ2h0O1xuICAgICAgICAgICAgICAgICAgICB2YXIgY29vcmRpbmF0ZXMgPSBbdmVydGV4Q29vcmRzW2tdXS5jb25jYXQobmVpZ2hib3IuY29vcmRpbmF0ZXMpO1xuICAgICAgICAgICAgICAgICAgICBjb29yZGluYXRlcy5yZXZlcnNlKCk7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5pbmNvbWluZ0Nvb3JkaW5hdGVzW25laWdoYm9yLnZlcnRleF0gPSBjb29yZGluYXRlcztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9LCB7ZWRnZXM6IHt9LCBpbmNvbWluZ0VkZ2VzOiB7fSwgY29vcmRpbmF0ZXM6IHt9LCBpbmNvbWluZ0Nvb3JkaW5hdGVzOiB7fSwgcmVkdWNlZEVkZ2VzOiB7fX0pO1xuICAgIH07XG4gICAgXG4gICAgZnVuY3Rpb24gY29tcGFjdEdyYXBoKHZlcnRpY2VzLCB2ZXJ0ZXhDb29yZHMsIGVkZ2VEYXRhLCBvcHRpb25zKSB7XG4gICAgICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgICAgICB2YXIgcHJvZ3Jlc3MgPSBvcHRpb25zLnByb2dyZXNzO1xuICAgICAgICB2YXIgZW5kcyA9IE9iamVjdC5rZXlzKHZlcnRpY2VzKS5yZWR1Y2UoZnVuY3Rpb24gZmluZEVuZHMoZXMsIGssIGksIHZzKSB7XG4gICAgICAgICAgICB2YXIgdmVydGV4ID0gdmVydGljZXNba107XG4gICAgICAgICAgICB2YXIgZWRnZXMgPSBPYmplY3Qua2V5cyh2ZXJ0ZXgpO1xuICAgICAgICAgICAgdmFyIG51bWJlckVkZ2VzID0gZWRnZXMubGVuZ3RoO1xuICAgICAgICAgICAgdmFyIHJlbW92ZTtcbiAgICBcbiAgICAgICAgICAgIGlmKG9wdGlvbnMuY29tcGFjdCA9PT0gZmFsc2UpICB7XG4gICAgICAgICAgICAgICAgcmVtb3ZlID0gZmFsc2U7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG51bWJlckVkZ2VzID09PSAxKSB7XG4gICAgICAgICAgICAgICAgdmFyIG90aGVyID0gdmVydGljZXNbZWRnZXNbMF1dO1xuICAgICAgICAgICAgICAgIHJlbW92ZSA9ICFvdGhlcltrXTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobnVtYmVyRWRnZXMgPT09IDIpIHtcbiAgICAgICAgICAgICAgICByZW1vdmUgPSBlZGdlcy5maWx0ZXIoZnVuY3Rpb24obikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmVydGljZXNbbl1ba107XG4gICAgICAgICAgICAgICAgfSkubGVuZ3RoID09PSBudW1iZXJFZGdlcztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVtb3ZlID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmICghcmVtb3ZlKSB7XG4gICAgICAgICAgICAgICAgZXNba10gPSB2ZXJ0ZXg7XG4gICAgICAgICAgICB9XG4gICAgXG4gICAgICAgICAgICBpZiAoaSAlIDEwMDAgPT09IDAgJiYgcHJvZ3Jlc3MpIHtcbiAgICAgICAgICAgICAgICBwcm9ncmVzcygnY29tcGFjdDplbmRzJywgaSwgdnMubGVuZ3RoKTtcbiAgICAgICAgICAgIH1cbiAgICBcbiAgICAgICAgICAgIHJldHVybiBlcztcbiAgICAgICAgfSwge30pO1xuICAgIFxuICAgICAgICByZXR1cm4gT2JqZWN0LmtleXMoZW5kcykucmVkdWNlKGZ1bmN0aW9uIGNvbXBhY3RFbmQocmVzdWx0LCBrLCBpLCBlcykge1xuICAgICAgICAgICAgdmFyIGNvbXBhY3RlZCA9IGNvbXBhY3ROb2RlKGssIHZlcnRpY2VzLCBlbmRzLCB2ZXJ0ZXhDb29yZHMsIGVkZ2VEYXRhLCBmYWxzZSwgb3B0aW9ucyk7XG4gICAgICAgICAgICByZXN1bHQuZ3JhcGhba10gPSBjb21wYWN0ZWQuZWRnZXM7XG4gICAgICAgICAgICByZXN1bHQuY29vcmRpbmF0ZXNba10gPSBjb21wYWN0ZWQuY29vcmRpbmF0ZXM7XG4gICAgXG4gICAgICAgICAgICBpZiAob3B0aW9ucy5lZGdlRGF0YVJlZHVjZUZuKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnJlZHVjZWRFZGdlc1trXSA9IGNvbXBhY3RlZC5yZWR1Y2VkRWRnZXM7XG4gICAgICAgICAgICB9XG4gICAgXG4gICAgICAgICAgICBpZiAoaSAlIDEwMDAgPT09IDAgJiYgcHJvZ3Jlc3MpIHtcbiAgICAgICAgICAgICAgICBwcm9ncmVzcygnY29tcGFjdDpub2RlcycsIGksIGVzLmxlbmd0aCk7XG4gICAgICAgICAgICB9XG4gICAgXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9LCB7Z3JhcGg6IHt9LCBjb29yZGluYXRlczoge30sIHJlZHVjZWRFZGdlczoge319KTtcbiAgICB9O1xuICAgIFxuICAgIGZ1bmN0aW9uIGZpbmRQYXRoKGdyYXBoLCBzdGFydCwgZW5kKSB7XG4gICAgICAgIHZhciBjb3N0cyA9IHt9O1xuICAgICAgICBjb3N0c1tzdGFydF0gPSAwO1xuICAgICAgICB2YXIgaW5pdGlhbFN0YXRlID0gWzAsIFtzdGFydF0sIHN0YXJ0XTtcbiAgICAgICAgdmFyIHF1ZXVlID0gbmV3IFRpbnlRdWV1ZShbaW5pdGlhbFN0YXRlXSwgZnVuY3Rpb24oYSwgYikgeyByZXR1cm4gYVswXSAtIGJbMF07IH0pO1xuICAgICAgICB2YXIgZXhwbG9yZWQgPSB7fTtcbiAgICBcbiAgICAgICAgd2hpbGUgKHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICAgICAgdmFyIHN0YXRlID0gcXVldWUucG9wKCk7XG4gICAgICAgICAgICB2YXIgY29zdCA9IHN0YXRlWzBdO1xuICAgICAgICAgICAgdmFyIG5vZGUgPSBzdGF0ZVsyXTtcbiAgICAgICAgICAgIGlmIChub2RlID09PSBlbmQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3RhdGUuc2xpY2UoMCwgMik7XG4gICAgICAgICAgICB9XG4gICAgXG4gICAgICAgICAgICB2YXIgbmVpZ2hib3VycyA9IGdyYXBoW25vZGVdO1xuICAgICAgICAgICAgT2JqZWN0LmtleXMobmVpZ2hib3VycykuZm9yRWFjaChmdW5jdGlvbihuKSB7XG4gICAgICAgICAgICAgICAgdmFyIG5ld0Nvc3QgPSBjb3N0ICsgbmVpZ2hib3Vyc1tuXTtcbiAgICAgICAgICAgICAgICBpZiAoIShuIGluIGNvc3RzKSB8fCBuZXdDb3N0IDwgY29zdHNbbl0pIHtcbiAgICAgICAgICAgICAgICAgICAgY29zdHNbbl0gPSBuZXdDb3N0O1xuICAgICAgICAgICAgICAgICAgICB2YXIgbmV3U3RhdGUgPSBbbmV3Q29zdCwgc3RhdGVbMV0uY29uY2F0KFtuXSksIG5dO1xuICAgICAgICAgICAgICAgICAgICBxdWV1ZS5wdXNoKG5ld1N0YXRlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIFxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9O1xuICAgIFxuICAgIGZ1bmN0aW9uIHByZXByb2Nlc3MoZ3JhcGgsIG9wdGlvbnMpIHtcbiAgICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgICAgICAgdmFyIHRvcG87XG5cbiAgICAgICAgdmFyIHdlaWdodEZuID0gb3B0aW9ucy53ZWlnaHRGbiB8fCBmdW5jdGlvbiBkZWZhdWx0V2VpZ2h0Rm4oYSwgYikge1xuICAgICAgICAgICAgcmV0dXJuIHR1cmYuZGlzdGFuY2UodHVyZi5wb2ludChhKSwgdHVyZi5wb2ludChiKSk7XG4gICAgICAgIH1cbiAgICBcbiAgICAgICAgaWYgKGdyYXBoLnR5cGUgPT09ICdGZWF0dXJlQ29sbGVjdGlvbicpIHtcbiAgICAgICAgICAgIC8vIEdyYXBoIGlzIEdlb0pTT04gZGF0YSwgY3JlYXRlIGEgdG9wb2xvZ3kgZnJvbSBpdFxuICAgICAgICAgICAgdG9wbyA9IHRvcG9sb2d5KGdyYXBoLCBvcHRpb25zKTtcbiAgICAgICAgfSBlbHNlIGlmIChncmFwaC5lZGdlcykge1xuICAgICAgICAgICAgLy8gR3JhcGggaXMgYSBwcmVwcm9jZXNzZWQgdG9wb2xvZ3lcbiAgICAgICAgICAgIHRvcG8gPSBncmFwaDtcbiAgICAgICAgfVxuICAgIFxuICAgICAgICB2YXIgZ3JhcGggPSB0b3BvLmVkZ2VzLnJlZHVjZShmdW5jdGlvbiBidWlsZEdyYXBoKGcsIGVkZ2UsIGksIGVzKSB7XG4gICAgICAgICAgICB2YXIgYSA9IGVkZ2VbMF0sXG4gICAgICAgICAgICAgICAgYiA9IGVkZ2VbMV0sXG4gICAgICAgICAgICAgICAgcHJvcHMgPSBlZGdlWzJdLFxuICAgICAgICAgICAgICAgIHcgPSB3ZWlnaHRGbih0b3BvLnZlcnRpY2VzW2FdLCB0b3BvLnZlcnRpY2VzW2JdLCBwcm9wcyksXG4gICAgICAgICAgICAgICAgbWFrZUVkZ2VMaXN0ID0gZnVuY3Rpb24gbWFrZUVkZ2VMaXN0KG5vZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFnLnZlcnRpY2VzW25vZGVdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBnLnZlcnRpY2VzW25vZGVdID0ge307XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob3B0aW9ucy5lZGdlRGF0YVJlZHVjZUZuKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZy5lZGdlRGF0YVtub2RlXSA9IHt9O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBjb25jYXRFZGdlID0gZnVuY3Rpb24gY29uY2F0RWRnZShzdGFydE5vZGUsIGVuZE5vZGUsIHdlaWdodCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdiA9IGcudmVydGljZXNbc3RhcnROb2RlXTtcbiAgICAgICAgICAgICAgICAgICAgdltlbmROb2RlXSA9IHdlaWdodDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMuZWRnZURhdGFSZWR1Y2VGbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgZy5lZGdlRGF0YVtzdGFydE5vZGVdW2VuZE5vZGVdID0gb3B0aW9ucy5lZGdlRGF0YVJlZHVjZUZuKG9wdGlvbnMuZWRnZURhdGFTZWVkLCBwcm9wcyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9O1xuICAgIFxuICAgICAgICAgICAgaWYgKHcpIHtcbiAgICAgICAgICAgICAgICBtYWtlRWRnZUxpc3QoYSk7XG4gICAgICAgICAgICAgICAgbWFrZUVkZ2VMaXN0KGIpO1xuICAgICAgICAgICAgICAgIGlmICh3IGluc3RhbmNlb2YgT2JqZWN0KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh3LmZvcndhcmQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbmNhdEVkZ2UoYSwgYiwgdy5mb3J3YXJkKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAody5iYWNrd2FyZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uY2F0RWRnZShiLCBhLCB3LmJhY2t3YXJkKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbmNhdEVkZ2UoYSwgYiwgdyk7XG4gICAgICAgICAgICAgICAgICAgIGNvbmNhdEVkZ2UoYiwgYSwgdyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgIFxuICAgICAgICAgICAgaWYgKGkgJSAxMDAwID09PSAwICYmIG9wdGlvbnMucHJvZ3Jlc3MpIHtcbiAgICAgICAgICAgICAgICBvcHRpb25zLnByb2dyZXNzKCdlZGdld2VpZ2h0cycsIGksZXMubGVuZ3RoKTtcbiAgICAgICAgICAgIH1cbiAgICBcbiAgICAgICAgICAgIHJldHVybiBnO1xuICAgICAgICB9LCB7ZWRnZURhdGE6IHt9LCB2ZXJ0aWNlczoge319KTtcbiAgICBcbiAgICAgICAgdmFyIGNvbXBhY3QgPSBjb21wYWN0R3JhcGgoZ3JhcGgudmVydGljZXMsIHRvcG8udmVydGljZXMsIGdyYXBoLmVkZ2VEYXRhLCBvcHRpb25zKTtcbiAgICBcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHZlcnRpY2VzOiBncmFwaC52ZXJ0aWNlcyxcbiAgICAgICAgICAgIGVkZ2VEYXRhOiBncmFwaC5lZGdlRGF0YSxcbiAgICAgICAgICAgIHNvdXJjZVZlcnRpY2VzOiB0b3BvLnZlcnRpY2VzLFxuICAgICAgICAgICAgY29tcGFjdGVkVmVydGljZXM6IGNvbXBhY3QuZ3JhcGgsXG4gICAgICAgICAgICBjb21wYWN0ZWRDb29yZGluYXRlczogY29tcGFjdC5jb29yZGluYXRlcyxcbiAgICAgICAgICAgIGNvbXBhY3RlZEVkZ2VzOiBvcHRpb25zLmVkZ2VEYXRhUmVkdWNlRm4gPyBjb21wYWN0LnJlZHVjZWRFZGdlcyA6IG51bGxcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIFxuICAgIGZ1bmN0aW9uIHJvdW5kQ29vcmQoYywgcHJlY2lzaW9uKSB7XG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICBNYXRoLnJvdW5kKGNbMF0gLyBwcmVjaXNpb24pICogcHJlY2lzaW9uLFxuICAgICAgICAgICAgTWF0aC5yb3VuZChjWzFdIC8gcHJlY2lzaW9uKSAqIHByZWNpc2lvbixcbiAgICAgICAgXTtcbiAgICB9O1xuICAgIFxuICAgIGZ1bmN0aW9uIGdlb0pzb25SZWR1Y2UoZ2VvanNvbiwgZm4sIHNlZWQpIHtcbiAgICAgICAgaWYgKGdlb2pzb24udHlwZSA9PT0gJ0ZlYXR1cmVDb2xsZWN0aW9uJykge1xuICAgICAgICAgICAgcmV0dXJuIGdlb2pzb24uZmVhdHVyZXMucmVkdWNlKGZ1bmN0aW9uIHJlZHVjZUZlYXR1cmVzKGEsIGYpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZ2VvSnNvblJlZHVjZShmLCBmbiwgYSk7XG4gICAgICAgICAgICB9LCBzZWVkKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmbihzZWVkLCBnZW9qc29uKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgXG4gICAgZnVuY3Rpb24gZ2VvSnNvbkZpbHRlckZlYXR1cmVzKGdlb2pzb24sIGZuKSB7XG4gICAgICAgIHZhciBmZWF0dXJlcyA9IFtdO1xuICAgICAgICBpZiAoZ2VvanNvbi50eXBlID09PSAnRmVhdHVyZUNvbGxlY3Rpb24nKSB7XG4gICAgICAgICAgICBmZWF0dXJlcyA9IGZlYXR1cmVzLmNvbmNhdChnZW9qc29uLmZlYXR1cmVzLmZpbHRlcihmbikpO1xuICAgICAgICB9XG4gICAgXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0eXBlOiAnRmVhdHVyZUNvbGxlY3Rpb24nLFxuICAgICAgICAgICAgZmVhdHVyZXM6IGZlYXR1cmVzXG4gICAgICAgIH07XG4gICAgfTtcbiAgICBcbiAgICBmdW5jdGlvbiBpc0xpbmVTdHJpbmcoZikge1xuICAgICAgICByZXR1cm4gZi5nZW9tZXRyeS50eXBlID09PSAnTGluZVN0cmluZyc7XG4gICAgfTtcbiAgICBcbiAgICBmdW5jdGlvbiB0b3BvbG9neShnZW9qc29uLCBvcHRpb25zKSB7XG4gICAgICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgICAgICB2YXIga2V5Rm4gPSBvcHRpb25zLmtleUZuIHx8IGZ1bmN0aW9uIGRlZmF1bHRLZXlGbihjKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGMuam9pbignLCcpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHByZWNpc2lvbiA9IG9wdGlvbnMucHJlY2lzaW9uIHx8IDFlLTU7XG4gICAgXG4gICAgICAgIHZhciBsaW5lU3RyaW5ncyA9IGdlb0pzb25GaWx0ZXJGZWF0dXJlcyhnZW9qc29uLCBpc0xpbmVTdHJpbmcpO1xuICAgICAgICB2YXIgZXhwbG9kZWRMaW5lU3RyaW5ncyA9IHR1cmYuZXhwbG9kZShsaW5lU3RyaW5ncyk7XG4gICAgICAgIHZhciB2ZXJ0aWNlcyA9IGV4cGxvZGVkTGluZVN0cmluZ3MuZmVhdHVyZXMucmVkdWNlKGZ1bmN0aW9uIGJ1aWxkVG9wb2xvZ3lWZXJ0aWNlcyhjcywgZiwgaSwgZnMpIHtcbiAgICAgICAgICAgICAgICB2YXIgcmMgPSByb3VuZENvb3JkKGYuZ2VvbWV0cnkuY29vcmRpbmF0ZXMsIHByZWNpc2lvbik7XG4gICAgICAgICAgICAgICAgY3Nba2V5Rm4ocmMpXSA9IGYuZ2VvbWV0cnkuY29vcmRpbmF0ZXM7XG4gICAgXG4gICAgICAgICAgICAgICAgaWYgKGkgJSAxMDAwID09PSAwICYmIG9wdGlvbnMucHJvZ3Jlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5wcm9ncmVzcygndG9wbzp2ZXJ0aWNlcycsIGksIGZzLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgfVxuICAgIFxuICAgICAgICAgICAgICAgIHJldHVybiBjcztcbiAgICAgICAgICAgIH0sIHt9KSxcbiAgICAgICAgICAgIGVkZ2VzID0gZ2VvSnNvblJlZHVjZShsaW5lU3RyaW5ncywgZnVuY3Rpb24gYnVpbGRUb3BvbG9neUVkZ2VzKGVzLCBmLCBpLCBmcykge1xuICAgICAgICAgICAgICAgIGYuZ2VvbWV0cnkuY29vcmRpbmF0ZXMuZm9yRWFjaChmdW5jdGlvbiBidWlsZExpbmVTdHJpbmdFZGdlcyhjLCBpLCBjcykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaSA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBrMSA9IGtleUZuKHJvdW5kQ29vcmQoY3NbaSAtIDFdLCBwcmVjaXNpb24pKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrMiA9IGtleUZuKHJvdW5kQ29vcmQoYywgcHJlY2lzaW9uKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBlcy5wdXNoKFtrMSwgazIsIGYucHJvcGVydGllc10pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgXG4gICAgICAgICAgICAgICAgaWYgKGkgJSAxMDAwID09PSAwICYmIG9wdGlvbnMucHJvZ3Jlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5wcm9ncmVzcygndG9wbzplZGdlcycsIGksIGZzLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgfVxuICAgIFxuICAgICAgICAgICAgICAgIHJldHVybiBlcztcbiAgICAgICAgICAgIH0sIFtdKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHZlcnRpY2VzOiB2ZXJ0aWNlcyxcbiAgICAgICAgICAgIGVkZ2VzOiBlZGdlc1xuICAgICAgICB9O1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiB2YWxpZGF0ZVBhdGgoZnJvbVBvaW50LCB0b1BvaW50LCBwYXRoKSB7XG4gICAgICAgIGlmICh0b1BvaW50ICYmIHRvUG9pbnQudHlwZSA9PT0gJ2xpbmVwb2ludCcpIHJldHVybiBmYWxzZTtcbiAgICAgICAgLy9pZiAocHJlY2lzaW9uID4gMC4wMDA1KSByZXR1cm4gZmFsc2U7XG4gICAgICAgIGlmICghcGF0aCB8fCAhcGF0aC5wYXRoIHx8ICFwYXRoLnBhdGgubGVuZ3RoIHx8IHBhdGgucGF0aC5sZW5ndGggPCAyKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIHJldHVybiBwYXRoO1xuXG4gICAgICAgIHByZWNpc2lvbiA9IE51bWJlcigoTnVtYmVyKHByZWNpc2lvbikgKyAwLjAwMDAwMikudG9GaXhlZCg3KSk7XG4gICAgICAgIHZhciBwYXRoZmluZGVyID0gbmV3IFBhdGhGaW5kZXIoZmVhdHVyZXMsIHsgcHJlY2lzaW9uOiBwcmVjaXNpb24gfSk7XG4gICAgICAgIHZhciBuZXdQYXRoID0gcGF0aGZpbmRlci5maW5kUGF0aChmcm9tUG9pbnQsIHRvUG9pbnQpO1xuICAgICAgICByZXR1cm4gdmFsaWRhdGVQYXRoKGZyb21Qb2ludCwgdG9Qb2ludCwgZmVhdHVyZXMsIG5ld1BhdGgpO1xuICAgIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBSb3V0aW5nOyJdLCJuYW1lcyI6WyJfcmVnZW5lcmF0b3JSdW50aW1lIiwiZSIsInQiLCJyIiwiT2JqZWN0IiwicHJvdG90eXBlIiwibiIsImhhc093blByb3BlcnR5IiwibyIsImRlZmluZVByb3BlcnR5IiwidmFsdWUiLCJpIiwiU3ltYm9sIiwiYSIsIml0ZXJhdG9yIiwiYyIsImFzeW5jSXRlcmF0b3IiLCJ1IiwidG9TdHJpbmdUYWciLCJkZWZpbmUiLCJlbnVtZXJhYmxlIiwiY29uZmlndXJhYmxlIiwid3JpdGFibGUiLCJ3cmFwIiwiR2VuZXJhdG9yIiwiY3JlYXRlIiwiQ29udGV4dCIsIm1ha2VJbnZva2VNZXRob2QiLCJ0cnlDYXRjaCIsInR5cGUiLCJhcmciLCJjYWxsIiwiaCIsImwiLCJmIiwicyIsInkiLCJHZW5lcmF0b3JGdW5jdGlvbiIsIkdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlIiwicCIsImQiLCJnZXRQcm90b3R5cGVPZiIsInYiLCJ2YWx1ZXMiLCJnIiwiZGVmaW5lSXRlcmF0b3JNZXRob2RzIiwiZm9yRWFjaCIsIl9pbnZva2UiLCJBc3luY0l0ZXJhdG9yIiwiaW52b2tlIiwiX3R5cGVvZiIsInJlc29sdmUiLCJfX2F3YWl0IiwidGhlbiIsImNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnIiwiRXJyb3IiLCJkb25lIiwibWV0aG9kIiwiZGVsZWdhdGUiLCJtYXliZUludm9rZURlbGVnYXRlIiwic2VudCIsIl9zZW50IiwiZGlzcGF0Y2hFeGNlcHRpb24iLCJhYnJ1cHQiLCJUeXBlRXJyb3IiLCJyZXN1bHROYW1lIiwibmV4dCIsIm5leHRMb2MiLCJwdXNoVHJ5RW50cnkiLCJ0cnlMb2MiLCJjYXRjaExvYyIsImZpbmFsbHlMb2MiLCJhZnRlckxvYyIsInRyeUVudHJpZXMiLCJwdXNoIiwicmVzZXRUcnlFbnRyeSIsImNvbXBsZXRpb24iLCJyZXNldCIsImlzTmFOIiwibGVuZ3RoIiwiZGlzcGxheU5hbWUiLCJpc0dlbmVyYXRvckZ1bmN0aW9uIiwiY29uc3RydWN0b3IiLCJuYW1lIiwibWFyayIsInNldFByb3RvdHlwZU9mIiwiX19wcm90b19fIiwiYXdyYXAiLCJhc3luYyIsIlByb21pc2UiLCJrZXlzIiwicmV2ZXJzZSIsInBvcCIsInByZXYiLCJjaGFyQXQiLCJzbGljZSIsInN0b3AiLCJydmFsIiwiaGFuZGxlIiwiY29tcGxldGUiLCJmaW5pc2giLCJfY2F0Y2giLCJkZWxlZ2F0ZVlpZWxkIiwiYXN5bmNHZW5lcmF0b3JTdGVwIiwiX2FzeW5jVG9HZW5lcmF0b3IiLCJhcmd1bWVudHMiLCJhcHBseSIsIl9uZXh0IiwiX3Rocm93IiwiUm91dGluZyIsIm1vZGUiLCJnZW9mbG8iLCJncmFwaERhdGEiLCJmZWF0dXJlcyIsImdldERyYXduRmVhdHVyZXMiLCJhY3RpdmF0ZSIsImVuYWJsZWQiLCJvcHRpb25zIiwiZW5hYmxlIiwiZGVhY3RpdmF0ZSIsIm1hcCIsImdldFNvdXJjZSIsInN0YXRpY3MiLCJjb25zdGFudHMiLCJzb3VyY2VzIiwic2V0RGF0YSIsInR1cmYiLCJmZWF0dXJlQ29sbGVjdGlvbiIsImdldFJvdXRlIiwiZnJvbVBvaW50IiwidG9Qb2ludCIsIm1hcE1vdmluZyIsImdldEZlYXR1cmVzIiwicGF0aGZpbmRlciIsIlBhdGhGaW5kZXIiLCJyb3V0aW5nIiwicGF0aCIsImZpbmRQYXRoIiwidmFsaWRhdGVQYXRoIiwiZmlyZSIsImZyb20iLCJ0byIsImdldE1hdGNoIiwiX3JlZiIsIl9jYWxsZWUiLCJjb29yZHMiLCJmZWF0dXJlIiwiX2NhbGxlZSQiLCJfY29udGV4dCIsIkV4cGxvcmluZyIsInNldCIsInN0YXJ0Iiwic3RhcnRQb2ludCIsInByb3BlcnRpZXMiLCJfeCIsImdldENsb3Nlc3QiLCJjbG9zZXN0UG9pbnQiLCJsYXN0Q2xpY2siLCJyb3V0ZSIsImxpbmVTdHJpbmciLCJnZXRTbmFwRmVhdHVyZXMiLCJmbGF0IiwiZmlsdGVyIiwiZ2VvbWV0cnkiLCJjb21wYWN0ZWRWZXJ0aWNlcyIsInByZXByb2Nlc3MiLCJfZ3JhcGgiLCJfa2V5Rm4iLCJrZXlGbiIsImpvaW4iLCJfcHJlY2lzaW9uIiwicHJlY2lzaW9uIiwiX29wdGlvbnMiLCJrIiwiYiIsInJvdW5kQ29vcmQiLCJ2ZXJ0aWNlcyIsInBoYW50b21TdGFydCIsIl9jcmVhdGVQaGFudG9tIiwicGhhbnRvbUVuZCIsIndlaWdodCIsImZ1bGxQYXRoIiwicmVkdWNlIiwiYnVpbGRQYXRoIiwiY3MiLCJ2cyIsImNvbmNhdCIsImNvbXBhY3RlZENvb3JkaW5hdGVzIiwiYmluZCIsInNvdXJjZVZlcnRpY2VzIiwiZWRnZURhdGFzIiwiY29tcGFjdGVkRWRnZXMiLCJidWlsZEVkZ2VEYXRhIiwiZWRzIiwicmVkdWNlZEVkZ2UiLCJ1bmRlZmluZWQiLCJfcmVtb3ZlUGhhbnRvbSIsInNlcmlhbGl6ZSIsInBoYW50b20iLCJjb21wYWN0Tm9kZSIsImVkZ2VEYXRhIiwiZWRnZXMiLCJjb29yZGluYXRlcyIsInJlZHVjZWRFZGdlcyIsImluY29taW5nRWRnZXMiLCJuZWlnaGJvciIsImluY29taW5nQ29vcmRpbmF0ZXMiLCJTaG9ydGVzdFBhdGgiLCJJTkZJTklUWSIsImFkZFZlcnRleCIsInNldFZlcnRpY2VzIiwiZ3JhcGgiLCJzaG9ydGVzdFBhdGgiLCJub2RlcyIsIlByaW9yaXR5UXVldWUiLCJkaXN0YW5jZXMiLCJwcmV2aW91cyIsInNtYWxsZXN0IiwidmVydGV4IiwiYWx0IiwiZW5xdWV1ZSIsImlzRW1wdHkiLCJkZXF1ZXVlIiwiX25vZGVzIiwicHJpb3JpdHkiLCJrZXkiLCJzb3J0Iiwic2hpZnQiLCJUaW55UXVldWUiLCJkYXRhIiwiY29tcGFyZSIsIl9kb3duIiwiaXRlbSIsIl91cCIsInRvcCIsImJvdHRvbSIsInBlZWsiLCJwb3MiLCJyZWYiLCJwYXJlbnQiLCJjdXJyZW50IiwiaGFsZkxlbmd0aCIsImxlZnQiLCJiZXN0IiwicmlnaHQiLCJmaW5kTmV4dEVuZCIsImVuZHMiLCJ2ZXJ0ZXhDb29yZHMiLCJ0cmFja0luY29taW5nIiwicmV2ZXJzZVdlaWdodCIsImVkZ2VEYXRhU2VlZCIsImVkZ2VEYXRhUmVkdWNlRm4iLCJub3RQcmV2aW91cyIsImluZGV4T2YiLCJuZWlnaGJvcnMiLCJjb21wYWN0RWRnZSIsInJlc3VsdCIsImoiLCJjb21wYWN0R3JhcGgiLCJwcm9ncmVzcyIsImZpbmRFbmRzIiwiZXMiLCJudW1iZXJFZGdlcyIsInJlbW92ZSIsImNvbXBhY3QiLCJvdGhlciIsImNvbXBhY3RFbmQiLCJjb21wYWN0ZWQiLCJlbmQiLCJjb3N0cyIsImluaXRpYWxTdGF0ZSIsInF1ZXVlIiwiZXhwbG9yZWQiLCJzdGF0ZSIsImNvc3QiLCJub2RlIiwibmVpZ2hib3VycyIsIm5ld0Nvc3QiLCJuZXdTdGF0ZSIsInRvcG8iLCJ3ZWlnaHRGbiIsImRlZmF1bHRXZWlnaHRGbiIsImRpc3RhbmNlIiwicG9pbnQiLCJ0b3BvbG9neSIsImJ1aWxkR3JhcGgiLCJlZGdlIiwicHJvcHMiLCJ3IiwibWFrZUVkZ2VMaXN0IiwiY29uY2F0RWRnZSIsInN0YXJ0Tm9kZSIsImVuZE5vZGUiLCJmb3J3YXJkIiwiYmFja3dhcmQiLCJNYXRoIiwicm91bmQiLCJnZW9Kc29uUmVkdWNlIiwiZ2VvanNvbiIsImZuIiwic2VlZCIsInJlZHVjZUZlYXR1cmVzIiwiZ2VvSnNvbkZpbHRlckZlYXR1cmVzIiwiaXNMaW5lU3RyaW5nIiwiZGVmYXVsdEtleUZuIiwibGluZVN0cmluZ3MiLCJleHBsb2RlZExpbmVTdHJpbmdzIiwiZXhwbG9kZSIsImJ1aWxkVG9wb2xvZ3lWZXJ0aWNlcyIsImZzIiwicmMiLCJidWlsZFRvcG9sb2d5RWRnZXMiLCJidWlsZExpbmVTdHJpbmdFZGdlcyIsImsxIiwiazIiLCJOdW1iZXIiLCJ0b0ZpeGVkIiwibmV3UGF0aCJdLCJzb3VyY2VSb290IjoiIn0=