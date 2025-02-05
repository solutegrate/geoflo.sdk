/*!
 * /*!
 *  * GeoFlo SDK
 *  * Version 1.0.11
 *  * Generated on: 2025-02-05T19:04:48.830Z
 *  * /
 */
"use strict";
(self["webpackChunk_solutegrate_geoflo_sdk"] = self["webpackChunk_solutegrate_geoflo_sdk"] || []).push([["premium-routing"],{

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
  this.features = geoflo.Features.getColdFeatures();

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
    var mesh = geoflo.meshIndex.getFeatures();
    var features = [mesh, this.features].flat();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LXNkay8uL3NyYy9Sb3V0aW5nLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQG1peGluXG4gKiBAbWVtYmVyb2YgbW9kdWxlOmdlb2Zsb1xuICogQG5hbWUgUm91dGluZ1xuICogQGRlc2NyaXB0aW9uIFRoaXMgbW9kdWxlIHByb3ZpZGVzIHRoZSByb3V0aW5nIGZ1bmN0aW9uYWxpdHkgZm9yIHRoZSBHZW9mbG8gYXBwbGljYXRpb24uIEl0IGFsbG93cyB1c2VycyB0byBjYWxjdWxhdGUgcm91dGVzIGJldHdlZW4gdHdvIHBvaW50cyBvbiB0aGUgbWFwIHVzaW5nIGEgUGF0aEZpbmRlciBvYmplY3QuXG4gKiBAcGFyYW0ge09iamVjdH0gbW9kZSAtIFRoZSBtb2RlIG9iamVjdCBjb250YWluaW5nIHRoZSB0eXBlIG9mIG1vZGUuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBSb3V0aW5nIG9iamVjdC5cbiAqL1xuY29uc3QgUm91dGluZyA9IGZ1bmN0aW9uIChtb2RlKSB7XG4gICAgY29uc3QgZ2VvZmxvID0gdGhpcy5nZW9mbG87XG5cbiAgICB0aGlzLnR5cGUgPSBtb2RlLnR5cGU7XG4gICAgdGhpcy5ncmFwaERhdGEgPSB7fTtcbiAgICB0aGlzLmZlYXR1cmVzID0gZ2VvZmxvLkZlYXR1cmVzLmdldENvbGRGZWF0dXJlcygpO1xuXG5cdC8qKlxuXHQgKiBAZnVuY3Rpb25cbiAgICAgKiBAbWVtYmVyb2YgbW9kdWxlOmdlb2Zsby5Sb3V0aW5nXG5cdCAqIEBuYW1lIGFjdGl2YXRlXG5cdCAqIEBkZXNjcmlwdGlvbiBBY3RpdmF0ZXMgdGhlIGZ1bmN0aW9uYWxpdHkgYnkgc2V0dGluZyB0aGUgJ2VuYWJsZWQnIHByb3BlcnR5IHRvIHRydWUgYW5kIGVuYWJsaW5nIHJvdXRpbmcgaW4gdGhlIG9wdGlvbnMuXG5cdCAqIEBwYXJhbXMge3ZvaWR9IE5vbmVcblx0ICogQHJldHVybnMge3ZvaWR9XG5cdCAqL1xuICAgIHRoaXMuYWN0aXZhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuZW5hYmxlZCA9IHRydWU7XG4gICAgICAgIGdlb2Zsby5vcHRpb25zWydyb3V0aW5nJ10uZW5hYmxlID0gdHJ1ZTtcbiAgICB9O1xuXG5cdC8qKlxuXHQgKiBAZnVuY3Rpb25cbiAgICAgKiBAbWVtYmVyb2YgbW9kdWxlOmdlb2Zsby5Sb3V0aW5nXG5cdCAqIEBuYW1lIGRlYWN0aXZhdGVcblx0ICogQGRlc2NyaXB0aW9uIFRoaXMgZnVuY3Rpb24gZGVhY3RpdmF0ZXMgdGhlIHJvdXRpbmcgZmVhdHVyZSBieSBzZXR0aW5nIHRoZSBlbmFibGVkIGZsYWcgdG8gZmFsc2UsIGRpc2FibGluZyByb3V0aW5nIGluIHRoZSBvcHRpb25zLCBhbmQgY2xlYXJpbmcgdGhlIHJvdXRlIGRhdGEgb24gdGhlIG1hcC5cblx0ICogQHJldHVybnMge3ZvaWR9XG5cdCAqL1xuICAgIHRoaXMuZGVhY3RpdmF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5lbmFibGVkID0gZmFsc2U7XG4gICAgICAgIGdlb2Zsby5vcHRpb25zWydyb3V0aW5nJ10uZW5hYmxlID0gZmFsc2U7XG4gICAgICAgIGdlb2Zsby5tYXAuZ2V0U291cmNlKGdlb2Zsby5zdGF0aWNzLmNvbnN0YW50cy5zb3VyY2VzWydST1VURSddKS5zZXREYXRhKHR1cmYuZmVhdHVyZUNvbGxlY3Rpb24oW10pKTtcbiAgICB9O1xuXG5cdC8qKlxuXHQgKiBAZnVuY3Rpb25cbiAgICAgKiBAbWVtYmVyb2YgbW9kdWxlOmdlb2Zsby5Sb3V0aW5nXG5cdCAqIEBuYW1lIGdldFJvdXRlXG5cdCAqIEBkZXNjcmlwdGlvbiBUaGlzIGZ1bmN0aW9uIGNhbGN1bGF0ZXMgYSByb3V0ZSBiZXR3ZWVuIHR3byBwb2ludHMgb24gYSBtYXAgdXNpbmcgYSBQYXRoRmluZGVyIG9iamVjdC4gSXQgY2hlY2tzIGlmIHRoZSByb3V0aW5nIGZlYXR1cmUgaXMgZW5hYmxlZCBhbmQgaWYgdGhlIG1hcCBpcyBub3QgY3VycmVudGx5IG1vdmluZy4gSXQgdGhlbiBjcmVhdGVzIGEgZmVhdHVyZSBjb2xsZWN0aW9uIGZyb20gdGhlIGV4aXN0aW5nIGZlYXR1cmVzLCBpbml0aWFsaXplcyBhIFBhdGhGaW5kZXIgb2JqZWN0LCBhbmQgZmluZHMgYSBwYXRoIGJldHdlZW4gdGhlIHR3byBwb2ludHMuIFRoZSBwYXRoIGlzIHZhbGlkYXRlZCBhbmQgdGhlbiBhZGRlZCB0byB0aGUgbWFwIHdpdGggYSAncm91dGluZy5hZGQnIGV2ZW50LlxuXHQgKiBAcGFyYW0ge09iamVjdH0gZnJvbVBvaW50IC0gVGhlIHN0YXJ0aW5nIHBvaW50IGZvciB0aGUgcm91dGUuXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSB0b1BvaW50IC0gVGhlIGRlc3RpbmF0aW9uIHBvaW50IGZvciB0aGUgcm91dGUuXG5cdCAqIEByZXR1cm5zIHtBcnJheXxib29sZWFufSBUaGUgY2FsY3VsYXRlZCByb3V0ZSBwYXRoIGFzIGFuIGFycmF5IG9mIHBvaW50cywgb3IgZmFsc2UgaWYgdGhlIHJvdXRlIGNvdWxkIG5vdCBiZSBjYWxjdWxhdGVkLlxuXHQgKi9cbiAgICB0aGlzLmdldFJvdXRlID0gZnVuY3Rpb24gKGZyb21Qb2ludCwgdG9Qb2ludCkge1xuICAgICAgICBpZiAoIXRoaXMuZW5hYmxlZCB8fCBnZW9mbG8ubWFwTW92aW5nKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIHZhciBmZWF0dXJlcyA9IHR1cmYuZmVhdHVyZUNvbGxlY3Rpb24odGhpcy5nZXRGZWF0dXJlcygpKTtcbiAgICAgICAgdmFyIHBhdGhmaW5kZXIgPSBuZXcgUGF0aEZpbmRlcihmZWF0dXJlcywgZ2VvZmxvLm9wdGlvbnMucm91dGluZyk7XG4gICAgICAgIHZhciBwYXRoID0gcGF0aGZpbmRlci5maW5kUGF0aCA/IHBhdGhmaW5kZXIuZmluZFBhdGgoZnJvbVBvaW50LCB0b1BvaW50KSA6IGZhbHNlO1xuICAgICAgICBwYXRoID0gdmFsaWRhdGVQYXRoKGZyb21Qb2ludCwgdG9Qb2ludCwgcGF0aCk7XG4gICAgICAgIGdlb2Zsby5maXJlKCdyb3V0aW5nLmFkZCcsIHsgZnJvbTogZnJvbVBvaW50LCB0bzogdG9Qb2ludCwgcGF0aDogcGF0aCB9KTtcbiAgICAgICAgcmV0dXJuIHBhdGg7XG4gICAgfTtcblxuXHQvKipcblx0ICogQGZ1bmN0aW9uXG4gICAgICogQG1lbWJlcm9mIG1vZHVsZTpnZW9mbG8uUm91dGluZ1xuXHQgKiBAbmFtZSBnZXRNYXRjaFxuXHQgKiBAZGVzY3JpcHRpb24gUmV0cmlldmVzIGEgbWF0Y2ggZm9yIHRoZSBnaXZlbiBjb29yZGluYXRlcyB1c2luZyB0aGUgRXhwbG9yaW5nIHNlcnZpY2UuIFNldHMgdGhlIG1hdGNoIGFzIGEgc3RhcnRpbmcgcG9pbnQgZm9yIHJvdXRpbmcuXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBjb29yZHMgLSBUaGUgY29vcmRpbmF0ZXMgZm9yIHdoaWNoIHRvIGZpbmQgYSBtYXRjaC5cblx0ICogQHJldHVybnMge1Byb21pc2U8T2JqZWN0Pn0gVGhlIG1hdGNoZWQgZmVhdHVyZSB3aXRoIHJvdXRpbmcgcHJvcGVydHkgc2V0IHRvIHRydWUuXG5cdCAqL1xuICAgIHRoaXMuZ2V0TWF0Y2ggPSBhc3luYyBmdW5jdGlvbiAoY29vcmRzKSB7XG4gICAgICAgIGlmICghZ2VvZmxvLkV4cGxvcmluZykgcmV0dXJuIHt9O1xuICAgICAgICB2YXIgZmVhdHVyZSA9IGF3YWl0IGdlb2Zsby5FeHBsb3JpbmcuZ2V0TWF0Y2goY29vcmRzLCB7IHNldDogdHJ1ZSwgc3RhcnQ6IGdlb2Zsby5zdGFydFBvaW50IH0pO1xuICAgICAgICBmZWF0dXJlLnByb3BlcnRpZXMucm91dGluZyA9IHRydWU7XG4gICAgICAgIHJldHVybiBmZWF0dXJlO1xuICAgIH1cblxuXHQvKipcblx0ICogQGZ1bmN0aW9uXG4gICAgICogQG1lbWJlcm9mIG1vZHVsZTpnZW9mbG8uUm91dGluZ1xuXHQgKiBAbmFtZSBnZXRDbG9zZXN0XG5cdCAqIEBkZXNjcmlwdGlvbiBDYWxjdWxhdGVzIHRoZSBjbG9zZXN0IHBvaW50IG9uIGEgcm91dGUgYmFzZWQgb24gdGhlIGxhc3QgY2xpY2sgYW5kIHRoZSBjbG9zZXN0IHBvaW50IHRvIGl0LlxuXHQgKiBAcmV0dXJucyB7T2JqZWN0fGJvb2xlYW59IFJldHVybnMgYSBHZW9KU09OIExpbmVTdHJpbmcgZmVhdHVyZSB3aXRoIHJvdXRpbmcgcHJvcGVydHkgc2V0IHRvIHRydWUgaWYgc3VjY2Vzc2Z1bCwgb3RoZXJ3aXNlIGZhbHNlLlxuXHQgKi9cbiAgICB0aGlzLmdldENsb3Nlc3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghZ2VvZmxvLmNsb3Nlc3RQb2ludCB8fCAhZ2VvZmxvLmxhc3RDbGljaykgcmV0dXJuIGZhbHNlO1xuICAgICAgICB2YXIgcm91dGUgPSB0aGlzLmdldFJvdXRlKGdlb2Zsby5sYXN0Q2xpY2ssIGdlb2Zsby5jbG9zZXN0UG9pbnQpO1xuICAgICAgICBpZiAoIXJvdXRlIHx8ICFyb3V0ZS5wYXRoKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIHZhciBmZWF0dXJlID0gdHVyZi5saW5lU3RyaW5nKHJvdXRlLnBhdGgpO1xuICAgICAgICBmZWF0dXJlLnByb3BlcnRpZXMucm91dGluZyA9IHRydWU7XG4gICAgICAgIHJldHVybiBmZWF0dXJlO1xuICAgIH07XG5cblx0LyoqXG5cdCAqIEBmdW5jdGlvblxuICAgICAqIEBtZW1iZXJvZiBtb2R1bGU6Z2VvZmxvLlJvdXRpbmdcblx0ICogQG5hbWUgZ2V0RmVhdHVyZXNcblx0ICogQGRlc2NyaXB0aW9uIFJldHJpZXZlcyBmZWF0dXJlcyBvZiB0eXBlICdMaW5lU3RyaW5nJyBmcm9tIHRoZSBtZXNoIGluZGV4LlxuXHQgKiBAcmV0dXJucyB7QXJyYXl9IEFuIGFycmF5IG9mIGZlYXR1cmVzIG9mIHR5cGUgJ0xpbmVTdHJpbmcnLlxuXHQgKi9cbiAgICB0aGlzLmdldEZlYXR1cmVzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgbWVzaCA9IGdlb2Zsby5tZXNoSW5kZXguZ2V0RmVhdHVyZXMoKTtcbiAgICAgICAgdmFyIGZlYXR1cmVzID0gW21lc2gsIHRoaXMuZmVhdHVyZXNdLmZsYXQoKTtcbiAgICAgICAgcmV0dXJuIGZlYXR1cmVzLmZpbHRlcihmdW5jdGlvbihmZWF0dXJlKSB7IHJldHVybiBmZWF0dXJlLmdlb21ldHJ5LnR5cGUgPT09ICdMaW5lU3RyaW5nJyB9KTtcbiAgICB9O1xuXG4gICAgXG4gICAgaWYgKGdlb2Zsby5vcHRpb25zWydyb3V0aW5nJ10uZW5hYmxlKSB0aGlzLmFjdGl2YXRlKCk7XG5cblxuICAgIGZ1bmN0aW9uIFBhdGhGaW5kZXIoZmVhdHVyZXMsIG9wdGlvbnMpIHtcbiAgICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgICAgIFxuICAgICAgICBpZiAoIWZlYXR1cmVzLmNvbXBhY3RlZFZlcnRpY2VzKSB7IGZlYXR1cmVzID0gcHJlcHJvY2VzcyhmZWF0dXJlcywgb3B0aW9ucyk7IH1cblxuICAgICAgICB0aGlzLl9ncmFwaCA9IGZlYXR1cmVzO1xuICAgICAgICB0aGlzLl9rZXlGbiA9IG9wdGlvbnMua2V5Rm4gfHwgZnVuY3Rpb24oYykgeyByZXR1cm4gYy5qb2luKCcsJyk7IH07XG4gICAgICAgIHRoaXMuX3ByZWNpc2lvbiA9IG9wdGlvbnMucHJlY2lzaW9uIHx8IDFlLTU7XG4gICAgICAgIHRoaXMuX29wdGlvbnMgPSBvcHRpb25zO1xuICAgIFxuICAgICAgICBpZiAoT2JqZWN0LmtleXModGhpcy5fZ3JhcGguY29tcGFjdGVkVmVydGljZXMpLmZpbHRlcihmdW5jdGlvbihrKSB7IHJldHVybiBrICE9PSAnZWRnZURhdGEnOyB9KS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5maW5kUGF0aCA9IGZ1bmN0aW9uKGEsIGIpIHtcbiAgICAgICAgICAgIHZhciBzdGFydCA9IHRoaXMuX2tleUZuKHJvdW5kQ29vcmQoYS5jb29yZHMsIHRoaXMuX3ByZWNpc2lvbikpLFxuICAgICAgICAgICAgICAgIGZpbmlzaCA9IHRoaXMuX2tleUZuKHJvdW5kQ29vcmQoYi5jb29yZHMsIHRoaXMuX3ByZWNpc2lvbikpO1xuICAgIFxuICAgICAgICAgICAgaWYgKCF0aGlzLl9ncmFwaC52ZXJ0aWNlc1tzdGFydF0gfHwgIXRoaXMuX2dyYXBoLnZlcnRpY2VzW2ZpbmlzaF0pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICBcbiAgICAgICAgICAgIHZhciBwaGFudG9tU3RhcnQgPSB0aGlzLl9jcmVhdGVQaGFudG9tKHN0YXJ0KTtcbiAgICAgICAgICAgIHZhciBwaGFudG9tRW5kID0gdGhpcy5fY3JlYXRlUGhhbnRvbShmaW5pc2gpO1xuICAgIFxuICAgICAgICAgICAgdmFyIHBhdGggPSBmaW5kUGF0aCh0aGlzLl9ncmFwaC5jb21wYWN0ZWRWZXJ0aWNlcywgc3RhcnQsIGZpbmlzaCk7XG4gICAgXG4gICAgICAgICAgICBpZiAocGF0aCkge1xuICAgICAgICAgICAgICAgIHZhciB3ZWlnaHQgPSBwYXRoWzBdO1xuICAgICAgICAgICAgICAgIHBhdGggPSBwYXRoWzFdO1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIGZ1bGxQYXRoOiBwYXRoLFxuICAgICAgICAgICAgICAgICAgICBwYXRoOiBwYXRoLnJlZHVjZShmdW5jdGlvbiBidWlsZFBhdGgoY3MsIHYsIGksIHZzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaSA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjcyA9IGNzLmNvbmNhdCh0aGlzLl9ncmFwaC5jb21wYWN0ZWRDb29yZGluYXRlc1t2c1tpIC0gMV1dW3ZdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjcztcbiAgICAgICAgICAgICAgICAgICAgfS5iaW5kKHRoaXMpLCBbXSkuY29uY2F0KFt0aGlzLl9ncmFwaC5zb3VyY2VWZXJ0aWNlc1tmaW5pc2hdXSksXG4gICAgICAgICAgICAgICAgICAgIHdlaWdodDogd2VpZ2h0LFxuICAgICAgICAgICAgICAgICAgICBlZGdlRGF0YXM6IHRoaXMuX2dyYXBoLmNvbXBhY3RlZEVkZ2VzIFxuICAgICAgICAgICAgICAgICAgICAgICAgPyBwYXRoLnJlZHVjZShmdW5jdGlvbiBidWlsZEVkZ2VEYXRhKGVkcywgdiwgaSwgdnMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaSA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWRzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVkdWNlZEVkZ2U6IHRoaXMuX2dyYXBoLmNvbXBhY3RlZEVkZ2VzW3ZzW2kgLSAxXV1bdl1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBlZHM7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LmJpbmQodGhpcyksIFtdKVxuICAgICAgICAgICAgICAgICAgICAgICAgOiB1bmRlZmluZWRcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICBcbiAgICAgICAgICAgIHRoaXMuX3JlbW92ZVBoYW50b20ocGhhbnRvbVN0YXJ0KTtcbiAgICAgICAgICAgIHRoaXMuX3JlbW92ZVBoYW50b20ocGhhbnRvbUVuZCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNlcmlhbGl6ZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2dyYXBoO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fY3JlYXRlUGhhbnRvbSA9IGZ1bmN0aW9uKG4pIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9ncmFwaC5jb21wYWN0ZWRWZXJ0aWNlc1tuXSkgcmV0dXJuIG51bGw7XG4gICAgXG4gICAgICAgICAgICB2YXIgcGhhbnRvbSA9IGNvbXBhY3ROb2RlKG4sIHRoaXMuX2dyYXBoLnZlcnRpY2VzLCB0aGlzLl9ncmFwaC5jb21wYWN0ZWRWZXJ0aWNlcywgdGhpcy5fZ3JhcGguc291cmNlVmVydGljZXMsIHRoaXMuX2dyYXBoLmVkZ2VEYXRhLCB0cnVlLCB0aGlzLl9vcHRpb25zKTtcbiAgICAgICAgICAgIHRoaXMuX2dyYXBoLmNvbXBhY3RlZFZlcnRpY2VzW25dID0gcGhhbnRvbS5lZGdlcztcbiAgICAgICAgICAgIHRoaXMuX2dyYXBoLmNvbXBhY3RlZENvb3JkaW5hdGVzW25dID0gcGhhbnRvbS5jb29yZGluYXRlcztcbiAgICBcbiAgICAgICAgICAgIGlmICh0aGlzLl9ncmFwaC5jb21wYWN0ZWRFZGdlcykge1xuICAgICAgICAgICAgICAgIHRoaXMuX2dyYXBoLmNvbXBhY3RlZEVkZ2VzW25dID0gcGhhbnRvbS5yZWR1Y2VkRWRnZXM7XG4gICAgICAgICAgICB9XG4gICAgXG4gICAgICAgICAgICBPYmplY3Qua2V5cyhwaGFudG9tLmluY29taW5nRWRnZXMpLmZvckVhY2goZnVuY3Rpb24obmVpZ2hib3IpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9ncmFwaC5jb21wYWN0ZWRWZXJ0aWNlc1tuZWlnaGJvcl1bbl0gPSBwaGFudG9tLmluY29taW5nRWRnZXNbbmVpZ2hib3JdO1xuICAgICAgICAgICAgICAgIHRoaXMuX2dyYXBoLmNvbXBhY3RlZENvb3JkaW5hdGVzW25laWdoYm9yXVtuXSA9IFt0aGlzLl9ncmFwaC5zb3VyY2VWZXJ0aWNlc1tuZWlnaGJvcl1dLmNvbmNhdChwaGFudG9tLmluY29taW5nQ29vcmRpbmF0ZXNbbmVpZ2hib3JdLnNsaWNlKDAsIC0xKSk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2dyYXBoLmNvbXBhY3RlZEVkZ2VzKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2dyYXBoLmNvbXBhY3RlZEVkZ2VzW25laWdoYm9yXVtuXSA9IHBoYW50b20ucmVkdWNlZEVkZ2VzW25laWdoYm9yXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LmJpbmQodGhpcykpXG4gICAgXG4gICAgICAgICAgICByZXR1cm4gbjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3JlbW92ZVBoYW50b20gPSBmdW5jdGlvbihuKSB7XG4gICAgICAgICAgICBpZiAoIW4pIHJldHVybjtcbiAgICBcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKHRoaXMuX2dyYXBoLmNvbXBhY3RlZFZlcnRpY2VzW25dKS5mb3JFYWNoKGZ1bmN0aW9uKG5laWdoYm9yKSB7XG4gICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuX2dyYXBoLmNvbXBhY3RlZFZlcnRpY2VzW25laWdoYm9yXVtuXTtcbiAgICAgICAgICAgIH0uYmluZCh0aGlzKSk7XG4gICAgICAgICAgICBPYmplY3Qua2V5cyh0aGlzLl9ncmFwaC5jb21wYWN0ZWRDb29yZGluYXRlc1tuXSkuZm9yRWFjaChmdW5jdGlvbihuZWlnaGJvcikge1xuICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9ncmFwaC5jb21wYWN0ZWRDb29yZGluYXRlc1tuZWlnaGJvcl1bbl07XG4gICAgICAgICAgICB9LmJpbmQodGhpcykpO1xuICAgICAgICAgICAgaWYgKHRoaXMuX2dyYXBoLmNvbXBhY3RlZEVkZ2VzKSB7XG4gICAgICAgICAgICAgICAgT2JqZWN0LmtleXModGhpcy5fZ3JhcGguY29tcGFjdGVkRWRnZXNbbl0pLmZvckVhY2goZnVuY3Rpb24obmVpZ2hib3IpIHtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuX2dyYXBoLmNvbXBhY3RlZEVkZ2VzW25laWdoYm9yXVtuXTtcbiAgICAgICAgICAgICAgICB9LmJpbmQodGhpcykpO1xuICAgICAgICAgICAgfVxuICAgIFxuICAgICAgICAgICAgZGVsZXRlIHRoaXMuX2dyYXBoLmNvbXBhY3RlZFZlcnRpY2VzW25dO1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMuX2dyYXBoLmNvbXBhY3RlZENvb3JkaW5hdGVzW25dO1xuICAgIFxuICAgICAgICAgICAgaWYgKHRoaXMuX2dyYXBoLmNvbXBhY3RlZEVkZ2VzKSB7XG4gICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuX2dyYXBoLmNvbXBhY3RlZEVkZ2VzW25dO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIFNob3J0ZXN0UGF0aCAoKSB7XG4gICAgICAgIHZhciBJTkZJTklUWSA9IDEgLyAwO1xuICAgICAgICB0aGlzLnZlcnRpY2VzID0ge307XG4gICAgXG4gICAgICAgIHRoaXMuYWRkVmVydGV4ID0gZnVuY3Rpb24gKG5hbWUsIGVkZ2VzKSB7XG4gICAgICAgICAgICB0aGlzLnZlcnRpY2VzW25hbWVdID0gZWRnZXM7XG4gICAgICAgIH07XG4gICAgXG4gICAgICAgIHRoaXMuc2V0VmVydGljZXMgPSBmdW5jdGlvbiAoZ3JhcGgpIHtcbiAgICAgICAgICAgIHRoaXMudmVydGljZXMgPSBncmFwaDtcbiAgICAgICAgfTtcbiAgICBcbiAgICAgICAgdGhpcy5zaG9ydGVzdFBhdGggPSBmdW5jdGlvbiAoc3RhcnQsIGZpbmlzaCkge1xuICAgICAgICAgICAgdmFyIG5vZGVzID0gbmV3IFByaW9yaXR5UXVldWUoKSxcbiAgICAgICAgICAgICAgICBkaXN0YW5jZXMgPSB7fSxcbiAgICAgICAgICAgICAgICBwcmV2aW91cyA9IHt9LFxuICAgICAgICAgICAgICAgIHBhdGggPSBbXSxcbiAgICAgICAgICAgICAgICBzbWFsbGVzdCwgdmVydGV4LCBuZWlnaGJvciwgYWx0O1xuICAgICAgICBcbiAgICAgICAgICAgIGZvciAodmVydGV4IGluIHRoaXMudmVydGljZXMpIHtcbiAgICAgICAgICAgICAgICBpZiAodmVydGV4ID09PSBzdGFydCkge1xuICAgICAgICAgICAgICAgICAgICBkaXN0YW5jZXNbdmVydGV4XSA9IDA7XG4gICAgICAgICAgICAgICAgICAgIG5vZGVzLmVucXVldWUoMCwgdmVydGV4KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBkaXN0YW5jZXNbdmVydGV4XSA9IElORklOSVRZO1xuICAgICAgICAgICAgICAgICAgICBub2Rlcy5lbnF1ZXVlKElORklOSVRZLCB2ZXJ0ZXgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgICAgICAgICAgcHJldmlvdXNbdmVydGV4XSA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgICAgd2hpbGUgKCFub2Rlcy5pc0VtcHR5KCkpIHtcbiAgICAgICAgICAgICAgICBzbWFsbGVzdCA9IG5vZGVzLmRlcXVldWUoKTtcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKHNtYWxsZXN0ID09PSBmaW5pc2gpIHtcbiAgICAgICAgICAgICAgICAgICAgcGF0aCA9IFtdO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIHdoaWxlIChwcmV2aW91c1tzbWFsbGVzdF0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhdGgucHVzaChzbWFsbGVzdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzbWFsbGVzdCA9IHByZXZpb3VzW3NtYWxsZXN0XTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKCFzbWFsbGVzdCB8fCBkaXN0YW5jZXNbc21hbGxlc3RdID09PSBJTkZJTklUWSkge1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgICAgICAgIGZvciAobmVpZ2hib3IgaW4gdGhpcy52ZXJ0aWNlc1tzbWFsbGVzdF0pIHtcbiAgICAgICAgICAgICAgICAgICAgYWx0ID0gZGlzdGFuY2VzW3NtYWxsZXN0XSArIHRoaXMudmVydGljZXNbc21hbGxlc3RdW25laWdoYm9yXTtcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGlmIChhbHQgPCBkaXN0YW5jZXNbbmVpZ2hib3JdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkaXN0YW5jZXNbbmVpZ2hib3JdID0gYWx0O1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJldmlvdXNbbmVpZ2hib3JdID0gc21hbGxlc3Q7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGVzLmVucXVldWUoYWx0LCBuZWlnaGJvcik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuIHBhdGg7XG4gICAgICAgIH07XG4gICAgfTtcbiAgICBcbiAgICBmdW5jdGlvbiBQcmlvcml0eVF1ZXVlKCkge1xuICAgICAgICB0aGlzLl9ub2RlcyA9IFtdO1xuICAgIFxuICAgICAgICB0aGlzLmVucXVldWUgPSBmdW5jdGlvbiAocHJpb3JpdHksIGtleSkge1xuICAgICAgICAgICAgdGhpcy5fbm9kZXMucHVzaCh7a2V5OiBrZXksIHByaW9yaXR5OiBwcmlvcml0eX0pO1xuICAgICAgICAgICAgdGhpcy5zb3J0KCk7XG4gICAgICAgIH07XG4gICAgXG4gICAgICAgIHRoaXMuZGVxdWV1ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9ub2Rlcy5zaGlmdCgpLmtleTtcbiAgICAgICAgfTtcbiAgICBcbiAgICAgICAgdGhpcy5zb3J0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5fbm9kZXMuc29ydCgoYSwgYikgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBhLnByaW9yaXR5IC0gYi5wcmlvcml0eTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgIFxuICAgICAgICB0aGlzLmlzRW1wdHkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gIXRoaXMuX25vZGVzLmxlbmd0aDtcbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gVGlueVF1ZXVlKGRhdGEsIGNvbXBhcmUpIHtcbiAgICAgICAgaWYgKCBkYXRhID09PSB2b2lkIDAgKSBkYXRhID0gW107XG4gICAgICAgIGlmICggY29tcGFyZSA9PT0gdm9pZCAwICkgY29tcGFyZSA9IGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgICAgICByZXR1cm4gYSA8IGIgPyAtMSA6IGEgPiBiID8gMSA6IDA7XG4gICAgICAgIH07XG4gICAgXG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XG4gICAgICAgIHRoaXMubGVuZ3RoID0gdGhpcy5kYXRhLmxlbmd0aDtcbiAgICAgICAgdGhpcy5jb21wYXJlID0gY29tcGFyZTtcbiAgICBcbiAgICAgICAgaWYgKHRoaXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9ICh0aGlzLmxlbmd0aCA+PiAxKSAtIDE7IGkgPj0gMDsgaS0tKSB7IHRoaXMuX2Rvd24oaSk7IH1cbiAgICAgICAgfVxuICAgIFxuICAgICAgICB0aGlzLnB1c2ggPSBmdW5jdGlvbiBwdXNoIChpdGVtKSB7XG4gICAgICAgICAgICB0aGlzLmRhdGEucHVzaChpdGVtKTtcbiAgICAgICAgICAgIHRoaXMubGVuZ3RoKys7XG4gICAgICAgICAgICB0aGlzLl91cCh0aGlzLmxlbmd0aCAtIDEpO1xuICAgICAgICB9O1xuICAgICAgICBcbiAgICAgICAgdGhpcy5wb3AgPSBmdW5jdGlvbiBwb3AgKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMubGVuZ3RoID09PSAwKSB7IHJldHVybiB1bmRlZmluZWQ7IH1cbiAgICAgICAgXG4gICAgICAgICAgICB2YXIgdG9wID0gdGhpcy5kYXRhWzBdO1xuICAgICAgICAgICAgdmFyIGJvdHRvbSA9IHRoaXMuZGF0YS5wb3AoKTtcbiAgICAgICAgICAgIHRoaXMubGVuZ3RoLS07XG4gICAgICAgIFxuICAgICAgICAgICAgaWYgKHRoaXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZGF0YVswXSA9IGJvdHRvbTtcbiAgICAgICAgICAgICAgICB0aGlzLl9kb3duKDApO1xuICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgICAgIHJldHVybiB0b3A7XG4gICAgICAgIH07XG4gICAgICAgIFxuICAgICAgICB0aGlzLnBlZWsgPSBmdW5jdGlvbiBwZWVrICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRhdGFbMF07XG4gICAgICAgIH07XG4gICAgICAgIFxuICAgICAgICB0aGlzLl91cCA9IGZ1bmN0aW9uIF91cCAocG9zKSB7XG4gICAgICAgICAgICB2YXIgcmVmID0gdGhpcztcbiAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IHJlZi5kYXRhO1xuICAgICAgICAgICAgICAgIHZhciBjb21wYXJlID0gcmVmLmNvbXBhcmU7XG4gICAgICAgICAgICB2YXIgaXRlbSA9IGRhdGFbcG9zXTtcbiAgICAgICAgXG4gICAgICAgICAgICB3aGlsZSAocG9zID4gMCkge1xuICAgICAgICAgICAgICAgIHZhciBwYXJlbnQgPSAocG9zIC0gMSkgPj4gMTtcbiAgICAgICAgICAgICAgICB2YXIgY3VycmVudCA9IGRhdGFbcGFyZW50XTtcbiAgICAgICAgICAgICAgICBpZiAoY29tcGFyZShpdGVtLCBjdXJyZW50KSA+PSAwKSB7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgZGF0YVtwb3NdID0gY3VycmVudDtcbiAgICAgICAgICAgICAgICBwb3MgPSBwYXJlbnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgICAgZGF0YVtwb3NdID0gaXRlbTtcbiAgICAgICAgfTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuX2Rvd24gPSBmdW5jdGlvbiBfZG93biAocG9zKSB7XG4gICAgICAgICAgICB2YXIgcmVmID0gdGhpcztcbiAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IHJlZi5kYXRhO1xuICAgICAgICAgICAgICAgIHZhciBjb21wYXJlID0gcmVmLmNvbXBhcmU7XG4gICAgICAgICAgICB2YXIgaGFsZkxlbmd0aCA9IHRoaXMubGVuZ3RoID4+IDE7XG4gICAgICAgICAgICB2YXIgaXRlbSA9IGRhdGFbcG9zXTtcbiAgICAgICAgXG4gICAgICAgICAgICB3aGlsZSAocG9zIDwgaGFsZkxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHZhciBsZWZ0ID0gKHBvcyA8PCAxKSArIDE7XG4gICAgICAgICAgICAgICAgdmFyIGJlc3QgPSBkYXRhW2xlZnRdO1xuICAgICAgICAgICAgICAgIHZhciByaWdodCA9IGxlZnQgKyAxO1xuICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiAocmlnaHQgPCB0aGlzLmxlbmd0aCAmJiBjb21wYXJlKGRhdGFbcmlnaHRdLCBiZXN0KSA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgbGVmdCA9IHJpZ2h0O1xuICAgICAgICAgICAgICAgICAgICBiZXN0ID0gZGF0YVtyaWdodF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChjb21wYXJlKGJlc3QsIGl0ZW0pID49IDApIHsgYnJlYWs7IH1cbiAgICAgICAgXG4gICAgICAgICAgICAgICAgZGF0YVtwb3NdID0gYmVzdDtcbiAgICAgICAgICAgICAgICBwb3MgPSBsZWZ0O1xuICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgICAgIGRhdGFbcG9zXSA9IGl0ZW07XG4gICAgICAgIH07XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGZpbmROZXh0RW5kKHByZXYsIHYsIHZlcnRpY2VzLCBlbmRzLCB2ZXJ0ZXhDb29yZHMsIGVkZ2VEYXRhLCB0cmFja0luY29taW5nLCBvcHRpb25zKSB7XG4gICAgICAgIHZhciB3ZWlnaHQgPSB2ZXJ0aWNlc1twcmV2XVt2XSxcbiAgICAgICAgICAgIHJldmVyc2VXZWlnaHQgPSB2ZXJ0aWNlc1t2XVtwcmV2XSxcbiAgICAgICAgICAgIGNvb3JkaW5hdGVzID0gW10sXG4gICAgICAgICAgICBwYXRoID0gW10sXG4gICAgICAgICAgICByZWR1Y2VkRWRnZSA9IG9wdGlvbnMuZWRnZURhdGFTZWVkO1xuICAgICAgICAgICAgXG4gICAgICAgIGlmIChvcHRpb25zLmVkZ2VEYXRhUmVkdWNlRm4pIHtcbiAgICAgICAgICAgIHJlZHVjZWRFZGdlID0gb3B0aW9ucy5lZGdlRGF0YVJlZHVjZUZuKHJlZHVjZWRFZGdlLCBlZGdlRGF0YVt2XVtwcmV2XSk7XG4gICAgICAgIH1cbiAgICBcbiAgICAgICAgd2hpbGUgKCFlbmRzW3ZdKSB7XG4gICAgICAgICAgICB2YXIgZWRnZXMgPSB2ZXJ0aWNlc1t2XTtcbiAgICBcbiAgICAgICAgICAgIGlmICghZWRnZXMpIHsgYnJlYWs7IH1cbiAgICBcbiAgICAgICAgICAgIHZhciBuZXh0ID0gT2JqZWN0LmtleXMoZWRnZXMpLmZpbHRlcihmdW5jdGlvbiBub3RQcmV2aW91cyhrKSB7IHJldHVybiBrICE9PSBwcmV2OyB9KVswXTtcbiAgICAgICAgICAgIHdlaWdodCArPSBlZGdlc1tuZXh0XTtcbiAgICBcbiAgICAgICAgICAgIGlmICh0cmFja0luY29taW5nKSB7XG4gICAgICAgICAgICAgICAgcmV2ZXJzZVdlaWdodCArPSB2ZXJ0aWNlc1tuZXh0XVt2XTtcbiAgICBcbiAgICAgICAgICAgICAgICBpZiAocGF0aC5pbmRleE9mKHYpID49IDApIHtcbiAgICAgICAgICAgICAgICAgICAgZW5kc1t2XSA9IHZlcnRpY2VzW3ZdO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcGF0aC5wdXNoKHYpO1xuICAgICAgICAgICAgfVxuICAgIFxuICAgICAgICAgICAgaWYgKG9wdGlvbnMuZWRnZURhdGFSZWR1Y2VGbikge1xuICAgICAgICAgICAgICAgIHJlZHVjZWRFZGdlID0gb3B0aW9ucy5lZGdlRGF0YVJlZHVjZUZuKHJlZHVjZWRFZGdlLCBlZGdlRGF0YVt2XVtuZXh0XSk7XG4gICAgICAgICAgICB9XG4gICAgXG4gICAgICAgICAgICBjb29yZGluYXRlcy5wdXNoKHZlcnRleENvb3Jkc1t2XSk7XG4gICAgICAgICAgICBwcmV2ID0gdjtcbiAgICAgICAgICAgIHYgPSBuZXh0O1xuICAgICAgICB9XG4gICAgXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB2ZXJ0ZXg6IHYsXG4gICAgICAgICAgICB3ZWlnaHQ6IHdlaWdodCxcbiAgICAgICAgICAgIHJldmVyc2VXZWlnaHQ6IHJldmVyc2VXZWlnaHQsXG4gICAgICAgICAgICBjb29yZGluYXRlczogY29vcmRpbmF0ZXMsXG4gICAgICAgICAgICByZWR1Y2VkRWRnZTogcmVkdWNlZEVkZ2VcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIFxuICAgIGZ1bmN0aW9uIGNvbXBhY3ROb2RlKGssIHZlcnRpY2VzLCBlbmRzLCB2ZXJ0ZXhDb29yZHMsIGVkZ2VEYXRhLCB0cmFja0luY29taW5nLCBvcHRpb25zKSB7XG4gICAgICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgICAgICB2YXIgbmVpZ2hib3JzID0gdmVydGljZXNba107XG4gICAgICAgIHJldHVybiBPYmplY3Qua2V5cyhuZWlnaGJvcnMpLnJlZHVjZShmdW5jdGlvbiBjb21wYWN0RWRnZShyZXN1bHQsIGopIHtcbiAgICAgICAgICAgIHZhciBuZWlnaGJvciA9IGZpbmROZXh0RW5kKGssIGosIHZlcnRpY2VzLCBlbmRzLCB2ZXJ0ZXhDb29yZHMsIGVkZ2VEYXRhLCB0cmFja0luY29taW5nLCBvcHRpb25zKTtcbiAgICAgICAgICAgIHZhciB3ZWlnaHQgPSBuZWlnaGJvci53ZWlnaHQ7XG4gICAgICAgICAgICB2YXIgcmV2ZXJzZVdlaWdodCA9IG5laWdoYm9yLnJldmVyc2VXZWlnaHQ7XG4gICAgICAgICAgICBpZiAobmVpZ2hib3IudmVydGV4ICE9PSBrKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFyZXN1bHQuZWRnZXNbbmVpZ2hib3IudmVydGV4XSB8fCByZXN1bHQuZWRnZXNbbmVpZ2hib3IudmVydGV4XSA+IHdlaWdodCkge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQuZWRnZXNbbmVpZ2hib3IudmVydGV4XSA9IHdlaWdodDtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LmNvb3JkaW5hdGVzW25laWdoYm9yLnZlcnRleF0gPSBbdmVydGV4Q29vcmRzW2tdXS5jb25jYXQobmVpZ2hib3IuY29vcmRpbmF0ZXMpO1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQucmVkdWNlZEVkZ2VzW25laWdoYm9yLnZlcnRleF0gPSBuZWlnaGJvci5yZWR1Y2VkRWRnZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHRyYWNrSW5jb21pbmcgJiYgXG4gICAgICAgICAgICAgICAgICAgICFpc05hTihyZXZlcnNlV2VpZ2h0KSAmJiAoIXJlc3VsdC5pbmNvbWluZ0VkZ2VzW25laWdoYm9yLnZlcnRleF0gfHwgcmVzdWx0LmluY29taW5nRWRnZXNbbmVpZ2hib3IudmVydGV4XSA+IHJldmVyc2VXZWlnaHQpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5pbmNvbWluZ0VkZ2VzW25laWdoYm9yLnZlcnRleF0gPSByZXZlcnNlV2VpZ2h0O1xuICAgICAgICAgICAgICAgICAgICB2YXIgY29vcmRpbmF0ZXMgPSBbdmVydGV4Q29vcmRzW2tdXS5jb25jYXQobmVpZ2hib3IuY29vcmRpbmF0ZXMpO1xuICAgICAgICAgICAgICAgICAgICBjb29yZGluYXRlcy5yZXZlcnNlKCk7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5pbmNvbWluZ0Nvb3JkaW5hdGVzW25laWdoYm9yLnZlcnRleF0gPSBjb29yZGluYXRlcztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9LCB7ZWRnZXM6IHt9LCBpbmNvbWluZ0VkZ2VzOiB7fSwgY29vcmRpbmF0ZXM6IHt9LCBpbmNvbWluZ0Nvb3JkaW5hdGVzOiB7fSwgcmVkdWNlZEVkZ2VzOiB7fX0pO1xuICAgIH07XG4gICAgXG4gICAgZnVuY3Rpb24gY29tcGFjdEdyYXBoKHZlcnRpY2VzLCB2ZXJ0ZXhDb29yZHMsIGVkZ2VEYXRhLCBvcHRpb25zKSB7XG4gICAgICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgICAgICB2YXIgcHJvZ3Jlc3MgPSBvcHRpb25zLnByb2dyZXNzO1xuICAgICAgICB2YXIgZW5kcyA9IE9iamVjdC5rZXlzKHZlcnRpY2VzKS5yZWR1Y2UoZnVuY3Rpb24gZmluZEVuZHMoZXMsIGssIGksIHZzKSB7XG4gICAgICAgICAgICB2YXIgdmVydGV4ID0gdmVydGljZXNba107XG4gICAgICAgICAgICB2YXIgZWRnZXMgPSBPYmplY3Qua2V5cyh2ZXJ0ZXgpO1xuICAgICAgICAgICAgdmFyIG51bWJlckVkZ2VzID0gZWRnZXMubGVuZ3RoO1xuICAgICAgICAgICAgdmFyIHJlbW92ZTtcbiAgICBcbiAgICAgICAgICAgIGlmKG9wdGlvbnMuY29tcGFjdCA9PT0gZmFsc2UpICB7XG4gICAgICAgICAgICAgICAgcmVtb3ZlID0gZmFsc2U7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG51bWJlckVkZ2VzID09PSAxKSB7XG4gICAgICAgICAgICAgICAgdmFyIG90aGVyID0gdmVydGljZXNbZWRnZXNbMF1dO1xuICAgICAgICAgICAgICAgIHJlbW92ZSA9ICFvdGhlcltrXTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobnVtYmVyRWRnZXMgPT09IDIpIHtcbiAgICAgICAgICAgICAgICByZW1vdmUgPSBlZGdlcy5maWx0ZXIoZnVuY3Rpb24obikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmVydGljZXNbbl1ba107XG4gICAgICAgICAgICAgICAgfSkubGVuZ3RoID09PSBudW1iZXJFZGdlcztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVtb3ZlID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmICghcmVtb3ZlKSB7XG4gICAgICAgICAgICAgICAgZXNba10gPSB2ZXJ0ZXg7XG4gICAgICAgICAgICB9XG4gICAgXG4gICAgICAgICAgICBpZiAoaSAlIDEwMDAgPT09IDAgJiYgcHJvZ3Jlc3MpIHtcbiAgICAgICAgICAgICAgICBwcm9ncmVzcygnY29tcGFjdDplbmRzJywgaSwgdnMubGVuZ3RoKTtcbiAgICAgICAgICAgIH1cbiAgICBcbiAgICAgICAgICAgIHJldHVybiBlcztcbiAgICAgICAgfSwge30pO1xuICAgIFxuICAgICAgICByZXR1cm4gT2JqZWN0LmtleXMoZW5kcykucmVkdWNlKGZ1bmN0aW9uIGNvbXBhY3RFbmQocmVzdWx0LCBrLCBpLCBlcykge1xuICAgICAgICAgICAgdmFyIGNvbXBhY3RlZCA9IGNvbXBhY3ROb2RlKGssIHZlcnRpY2VzLCBlbmRzLCB2ZXJ0ZXhDb29yZHMsIGVkZ2VEYXRhLCBmYWxzZSwgb3B0aW9ucyk7XG4gICAgICAgICAgICByZXN1bHQuZ3JhcGhba10gPSBjb21wYWN0ZWQuZWRnZXM7XG4gICAgICAgICAgICByZXN1bHQuY29vcmRpbmF0ZXNba10gPSBjb21wYWN0ZWQuY29vcmRpbmF0ZXM7XG4gICAgXG4gICAgICAgICAgICBpZiAob3B0aW9ucy5lZGdlRGF0YVJlZHVjZUZuKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnJlZHVjZWRFZGdlc1trXSA9IGNvbXBhY3RlZC5yZWR1Y2VkRWRnZXM7XG4gICAgICAgICAgICB9XG4gICAgXG4gICAgICAgICAgICBpZiAoaSAlIDEwMDAgPT09IDAgJiYgcHJvZ3Jlc3MpIHtcbiAgICAgICAgICAgICAgICBwcm9ncmVzcygnY29tcGFjdDpub2RlcycsIGksIGVzLmxlbmd0aCk7XG4gICAgICAgICAgICB9XG4gICAgXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9LCB7Z3JhcGg6IHt9LCBjb29yZGluYXRlczoge30sIHJlZHVjZWRFZGdlczoge319KTtcbiAgICB9O1xuICAgIFxuICAgIGZ1bmN0aW9uIGZpbmRQYXRoKGdyYXBoLCBzdGFydCwgZW5kKSB7XG4gICAgICAgIHZhciBjb3N0cyA9IHt9O1xuICAgICAgICBjb3N0c1tzdGFydF0gPSAwO1xuICAgICAgICB2YXIgaW5pdGlhbFN0YXRlID0gWzAsIFtzdGFydF0sIHN0YXJ0XTtcbiAgICAgICAgdmFyIHF1ZXVlID0gbmV3IFRpbnlRdWV1ZShbaW5pdGlhbFN0YXRlXSwgZnVuY3Rpb24oYSwgYikgeyByZXR1cm4gYVswXSAtIGJbMF07IH0pO1xuICAgICAgICB2YXIgZXhwbG9yZWQgPSB7fTtcbiAgICBcbiAgICAgICAgd2hpbGUgKHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICAgICAgdmFyIHN0YXRlID0gcXVldWUucG9wKCk7XG4gICAgICAgICAgICB2YXIgY29zdCA9IHN0YXRlWzBdO1xuICAgICAgICAgICAgdmFyIG5vZGUgPSBzdGF0ZVsyXTtcbiAgICAgICAgICAgIGlmIChub2RlID09PSBlbmQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3RhdGUuc2xpY2UoMCwgMik7XG4gICAgICAgICAgICB9XG4gICAgXG4gICAgICAgICAgICB2YXIgbmVpZ2hib3VycyA9IGdyYXBoW25vZGVdO1xuICAgICAgICAgICAgT2JqZWN0LmtleXMobmVpZ2hib3VycykuZm9yRWFjaChmdW5jdGlvbihuKSB7XG4gICAgICAgICAgICAgICAgdmFyIG5ld0Nvc3QgPSBjb3N0ICsgbmVpZ2hib3Vyc1tuXTtcbiAgICAgICAgICAgICAgICBpZiAoIShuIGluIGNvc3RzKSB8fCBuZXdDb3N0IDwgY29zdHNbbl0pIHtcbiAgICAgICAgICAgICAgICAgICAgY29zdHNbbl0gPSBuZXdDb3N0O1xuICAgICAgICAgICAgICAgICAgICB2YXIgbmV3U3RhdGUgPSBbbmV3Q29zdCwgc3RhdGVbMV0uY29uY2F0KFtuXSksIG5dO1xuICAgICAgICAgICAgICAgICAgICBxdWV1ZS5wdXNoKG5ld1N0YXRlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIFxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9O1xuICAgIFxuICAgIGZ1bmN0aW9uIHByZXByb2Nlc3MoZ3JhcGgsIG9wdGlvbnMpIHtcbiAgICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgICAgICAgdmFyIHRvcG87XG5cbiAgICAgICAgdmFyIHdlaWdodEZuID0gb3B0aW9ucy53ZWlnaHRGbiB8fCBmdW5jdGlvbiBkZWZhdWx0V2VpZ2h0Rm4oYSwgYikge1xuICAgICAgICAgICAgcmV0dXJuIHR1cmYuZGlzdGFuY2UodHVyZi5wb2ludChhKSwgdHVyZi5wb2ludChiKSk7XG4gICAgICAgIH1cbiAgICBcbiAgICAgICAgaWYgKGdyYXBoLnR5cGUgPT09ICdGZWF0dXJlQ29sbGVjdGlvbicpIHtcbiAgICAgICAgICAgIC8vIEdyYXBoIGlzIEdlb0pTT04gZGF0YSwgY3JlYXRlIGEgdG9wb2xvZ3kgZnJvbSBpdFxuICAgICAgICAgICAgdG9wbyA9IHRvcG9sb2d5KGdyYXBoLCBvcHRpb25zKTtcbiAgICAgICAgfSBlbHNlIGlmIChncmFwaC5lZGdlcykge1xuICAgICAgICAgICAgLy8gR3JhcGggaXMgYSBwcmVwcm9jZXNzZWQgdG9wb2xvZ3lcbiAgICAgICAgICAgIHRvcG8gPSBncmFwaDtcbiAgICAgICAgfVxuICAgIFxuICAgICAgICB2YXIgZ3JhcGggPSB0b3BvLmVkZ2VzLnJlZHVjZShmdW5jdGlvbiBidWlsZEdyYXBoKGcsIGVkZ2UsIGksIGVzKSB7XG4gICAgICAgICAgICB2YXIgYSA9IGVkZ2VbMF0sXG4gICAgICAgICAgICAgICAgYiA9IGVkZ2VbMV0sXG4gICAgICAgICAgICAgICAgcHJvcHMgPSBlZGdlWzJdLFxuICAgICAgICAgICAgICAgIHcgPSB3ZWlnaHRGbih0b3BvLnZlcnRpY2VzW2FdLCB0b3BvLnZlcnRpY2VzW2JdLCBwcm9wcyksXG4gICAgICAgICAgICAgICAgbWFrZUVkZ2VMaXN0ID0gZnVuY3Rpb24gbWFrZUVkZ2VMaXN0KG5vZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFnLnZlcnRpY2VzW25vZGVdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBnLnZlcnRpY2VzW25vZGVdID0ge307XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob3B0aW9ucy5lZGdlRGF0YVJlZHVjZUZuKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZy5lZGdlRGF0YVtub2RlXSA9IHt9O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBjb25jYXRFZGdlID0gZnVuY3Rpb24gY29uY2F0RWRnZShzdGFydE5vZGUsIGVuZE5vZGUsIHdlaWdodCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdiA9IGcudmVydGljZXNbc3RhcnROb2RlXTtcbiAgICAgICAgICAgICAgICAgICAgdltlbmROb2RlXSA9IHdlaWdodDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMuZWRnZURhdGFSZWR1Y2VGbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgZy5lZGdlRGF0YVtzdGFydE5vZGVdW2VuZE5vZGVdID0gb3B0aW9ucy5lZGdlRGF0YVJlZHVjZUZuKG9wdGlvbnMuZWRnZURhdGFTZWVkLCBwcm9wcyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9O1xuICAgIFxuICAgICAgICAgICAgaWYgKHcpIHtcbiAgICAgICAgICAgICAgICBtYWtlRWRnZUxpc3QoYSk7XG4gICAgICAgICAgICAgICAgbWFrZUVkZ2VMaXN0KGIpO1xuICAgICAgICAgICAgICAgIGlmICh3IGluc3RhbmNlb2YgT2JqZWN0KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh3LmZvcndhcmQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbmNhdEVkZ2UoYSwgYiwgdy5mb3J3YXJkKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAody5iYWNrd2FyZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uY2F0RWRnZShiLCBhLCB3LmJhY2t3YXJkKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbmNhdEVkZ2UoYSwgYiwgdyk7XG4gICAgICAgICAgICAgICAgICAgIGNvbmNhdEVkZ2UoYiwgYSwgdyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgIFxuICAgICAgICAgICAgaWYgKGkgJSAxMDAwID09PSAwICYmIG9wdGlvbnMucHJvZ3Jlc3MpIHtcbiAgICAgICAgICAgICAgICBvcHRpb25zLnByb2dyZXNzKCdlZGdld2VpZ2h0cycsIGksZXMubGVuZ3RoKTtcbiAgICAgICAgICAgIH1cbiAgICBcbiAgICAgICAgICAgIHJldHVybiBnO1xuICAgICAgICB9LCB7ZWRnZURhdGE6IHt9LCB2ZXJ0aWNlczoge319KTtcbiAgICBcbiAgICAgICAgdmFyIGNvbXBhY3QgPSBjb21wYWN0R3JhcGgoZ3JhcGgudmVydGljZXMsIHRvcG8udmVydGljZXMsIGdyYXBoLmVkZ2VEYXRhLCBvcHRpb25zKTtcbiAgICBcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHZlcnRpY2VzOiBncmFwaC52ZXJ0aWNlcyxcbiAgICAgICAgICAgIGVkZ2VEYXRhOiBncmFwaC5lZGdlRGF0YSxcbiAgICAgICAgICAgIHNvdXJjZVZlcnRpY2VzOiB0b3BvLnZlcnRpY2VzLFxuICAgICAgICAgICAgY29tcGFjdGVkVmVydGljZXM6IGNvbXBhY3QuZ3JhcGgsXG4gICAgICAgICAgICBjb21wYWN0ZWRDb29yZGluYXRlczogY29tcGFjdC5jb29yZGluYXRlcyxcbiAgICAgICAgICAgIGNvbXBhY3RlZEVkZ2VzOiBvcHRpb25zLmVkZ2VEYXRhUmVkdWNlRm4gPyBjb21wYWN0LnJlZHVjZWRFZGdlcyA6IG51bGxcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIFxuICAgIGZ1bmN0aW9uIHJvdW5kQ29vcmQoYywgcHJlY2lzaW9uKSB7XG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICBNYXRoLnJvdW5kKGNbMF0gLyBwcmVjaXNpb24pICogcHJlY2lzaW9uLFxuICAgICAgICAgICAgTWF0aC5yb3VuZChjWzFdIC8gcHJlY2lzaW9uKSAqIHByZWNpc2lvbixcbiAgICAgICAgXTtcbiAgICB9O1xuICAgIFxuICAgIGZ1bmN0aW9uIGdlb0pzb25SZWR1Y2UoZ2VvanNvbiwgZm4sIHNlZWQpIHtcbiAgICAgICAgaWYgKGdlb2pzb24udHlwZSA9PT0gJ0ZlYXR1cmVDb2xsZWN0aW9uJykge1xuICAgICAgICAgICAgcmV0dXJuIGdlb2pzb24uZmVhdHVyZXMucmVkdWNlKGZ1bmN0aW9uIHJlZHVjZUZlYXR1cmVzKGEsIGYpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZ2VvSnNvblJlZHVjZShmLCBmbiwgYSk7XG4gICAgICAgICAgICB9LCBzZWVkKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmbihzZWVkLCBnZW9qc29uKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgXG4gICAgZnVuY3Rpb24gZ2VvSnNvbkZpbHRlckZlYXR1cmVzKGdlb2pzb24sIGZuKSB7XG4gICAgICAgIHZhciBmZWF0dXJlcyA9IFtdO1xuICAgICAgICBpZiAoZ2VvanNvbi50eXBlID09PSAnRmVhdHVyZUNvbGxlY3Rpb24nKSB7XG4gICAgICAgICAgICBmZWF0dXJlcyA9IGZlYXR1cmVzLmNvbmNhdChnZW9qc29uLmZlYXR1cmVzLmZpbHRlcihmbikpO1xuICAgICAgICB9XG4gICAgXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0eXBlOiAnRmVhdHVyZUNvbGxlY3Rpb24nLFxuICAgICAgICAgICAgZmVhdHVyZXM6IGZlYXR1cmVzXG4gICAgICAgIH07XG4gICAgfTtcbiAgICBcbiAgICBmdW5jdGlvbiBpc0xpbmVTdHJpbmcoZikge1xuICAgICAgICByZXR1cm4gZi5nZW9tZXRyeS50eXBlID09PSAnTGluZVN0cmluZyc7XG4gICAgfTtcbiAgICBcbiAgICBmdW5jdGlvbiB0b3BvbG9neShnZW9qc29uLCBvcHRpb25zKSB7XG4gICAgICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgICAgICB2YXIga2V5Rm4gPSBvcHRpb25zLmtleUZuIHx8IGZ1bmN0aW9uIGRlZmF1bHRLZXlGbihjKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGMuam9pbignLCcpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHByZWNpc2lvbiA9IG9wdGlvbnMucHJlY2lzaW9uIHx8IDFlLTU7XG4gICAgXG4gICAgICAgIHZhciBsaW5lU3RyaW5ncyA9IGdlb0pzb25GaWx0ZXJGZWF0dXJlcyhnZW9qc29uLCBpc0xpbmVTdHJpbmcpO1xuICAgICAgICB2YXIgZXhwbG9kZWRMaW5lU3RyaW5ncyA9IHR1cmYuZXhwbG9kZShsaW5lU3RyaW5ncyk7XG4gICAgICAgIHZhciB2ZXJ0aWNlcyA9IGV4cGxvZGVkTGluZVN0cmluZ3MuZmVhdHVyZXMucmVkdWNlKGZ1bmN0aW9uIGJ1aWxkVG9wb2xvZ3lWZXJ0aWNlcyhjcywgZiwgaSwgZnMpIHtcbiAgICAgICAgICAgICAgICB2YXIgcmMgPSByb3VuZENvb3JkKGYuZ2VvbWV0cnkuY29vcmRpbmF0ZXMsIHByZWNpc2lvbik7XG4gICAgICAgICAgICAgICAgY3Nba2V5Rm4ocmMpXSA9IGYuZ2VvbWV0cnkuY29vcmRpbmF0ZXM7XG4gICAgXG4gICAgICAgICAgICAgICAgaWYgKGkgJSAxMDAwID09PSAwICYmIG9wdGlvbnMucHJvZ3Jlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5wcm9ncmVzcygndG9wbzp2ZXJ0aWNlcycsIGksIGZzLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgfVxuICAgIFxuICAgICAgICAgICAgICAgIHJldHVybiBjcztcbiAgICAgICAgICAgIH0sIHt9KSxcbiAgICAgICAgICAgIGVkZ2VzID0gZ2VvSnNvblJlZHVjZShsaW5lU3RyaW5ncywgZnVuY3Rpb24gYnVpbGRUb3BvbG9neUVkZ2VzKGVzLCBmLCBpLCBmcykge1xuICAgICAgICAgICAgICAgIGYuZ2VvbWV0cnkuY29vcmRpbmF0ZXMuZm9yRWFjaChmdW5jdGlvbiBidWlsZExpbmVTdHJpbmdFZGdlcyhjLCBpLCBjcykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaSA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBrMSA9IGtleUZuKHJvdW5kQ29vcmQoY3NbaSAtIDFdLCBwcmVjaXNpb24pKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrMiA9IGtleUZuKHJvdW5kQ29vcmQoYywgcHJlY2lzaW9uKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBlcy5wdXNoKFtrMSwgazIsIGYucHJvcGVydGllc10pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgXG4gICAgICAgICAgICAgICAgaWYgKGkgJSAxMDAwID09PSAwICYmIG9wdGlvbnMucHJvZ3Jlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5wcm9ncmVzcygndG9wbzplZGdlcycsIGksIGZzLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgfVxuICAgIFxuICAgICAgICAgICAgICAgIHJldHVybiBlcztcbiAgICAgICAgICAgIH0sIFtdKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHZlcnRpY2VzOiB2ZXJ0aWNlcyxcbiAgICAgICAgICAgIGVkZ2VzOiBlZGdlc1xuICAgICAgICB9O1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiB2YWxpZGF0ZVBhdGgoZnJvbVBvaW50LCB0b1BvaW50LCBwYXRoKSB7XG4gICAgICAgIGlmICh0b1BvaW50ICYmIHRvUG9pbnQudHlwZSA9PT0gJ2xpbmVwb2ludCcpIHJldHVybiBmYWxzZTtcbiAgICAgICAgLy9pZiAocHJlY2lzaW9uID4gMC4wMDA1KSByZXR1cm4gZmFsc2U7XG4gICAgICAgIGlmICghcGF0aCB8fCAhcGF0aC5wYXRoIHx8ICFwYXRoLnBhdGgubGVuZ3RoIHx8IHBhdGgucGF0aC5sZW5ndGggPCAyKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIHJldHVybiBwYXRoO1xuXG4gICAgICAgIHByZWNpc2lvbiA9IE51bWJlcigoTnVtYmVyKHByZWNpc2lvbikgKyAwLjAwMDAwMikudG9GaXhlZCg3KSk7XG4gICAgICAgIHZhciBwYXRoZmluZGVyID0gbmV3IFBhdGhGaW5kZXIoZmVhdHVyZXMsIHsgcHJlY2lzaW9uOiBwcmVjaXNpb24gfSk7XG4gICAgICAgIHZhciBuZXdQYXRoID0gcGF0aGZpbmRlci5maW5kUGF0aChmcm9tUG9pbnQsIHRvUG9pbnQpO1xuICAgICAgICByZXR1cm4gdmFsaWRhdGVQYXRoKGZyb21Qb2ludCwgdG9Qb2ludCwgZmVhdHVyZXMsIG5ld1BhdGgpO1xuICAgIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBSb3V0aW5nOyJdLCJuYW1lcyI6WyJfcmVnZW5lcmF0b3JSdW50aW1lIiwiZSIsInQiLCJyIiwiT2JqZWN0IiwicHJvdG90eXBlIiwibiIsImhhc093blByb3BlcnR5IiwibyIsImRlZmluZVByb3BlcnR5IiwidmFsdWUiLCJpIiwiU3ltYm9sIiwiYSIsIml0ZXJhdG9yIiwiYyIsImFzeW5jSXRlcmF0b3IiLCJ1IiwidG9TdHJpbmdUYWciLCJkZWZpbmUiLCJlbnVtZXJhYmxlIiwiY29uZmlndXJhYmxlIiwid3JpdGFibGUiLCJ3cmFwIiwiR2VuZXJhdG9yIiwiY3JlYXRlIiwiQ29udGV4dCIsIm1ha2VJbnZva2VNZXRob2QiLCJ0cnlDYXRjaCIsInR5cGUiLCJhcmciLCJjYWxsIiwiaCIsImwiLCJmIiwicyIsInkiLCJHZW5lcmF0b3JGdW5jdGlvbiIsIkdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlIiwicCIsImQiLCJnZXRQcm90b3R5cGVPZiIsInYiLCJ2YWx1ZXMiLCJnIiwiZGVmaW5lSXRlcmF0b3JNZXRob2RzIiwiZm9yRWFjaCIsIl9pbnZva2UiLCJBc3luY0l0ZXJhdG9yIiwiaW52b2tlIiwiX3R5cGVvZiIsInJlc29sdmUiLCJfX2F3YWl0IiwidGhlbiIsImNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnIiwiRXJyb3IiLCJkb25lIiwibWV0aG9kIiwiZGVsZWdhdGUiLCJtYXliZUludm9rZURlbGVnYXRlIiwic2VudCIsIl9zZW50IiwiZGlzcGF0Y2hFeGNlcHRpb24iLCJhYnJ1cHQiLCJUeXBlRXJyb3IiLCJyZXN1bHROYW1lIiwibmV4dCIsIm5leHRMb2MiLCJwdXNoVHJ5RW50cnkiLCJ0cnlMb2MiLCJjYXRjaExvYyIsImZpbmFsbHlMb2MiLCJhZnRlckxvYyIsInRyeUVudHJpZXMiLCJwdXNoIiwicmVzZXRUcnlFbnRyeSIsImNvbXBsZXRpb24iLCJyZXNldCIsImlzTmFOIiwibGVuZ3RoIiwiZGlzcGxheU5hbWUiLCJpc0dlbmVyYXRvckZ1bmN0aW9uIiwiY29uc3RydWN0b3IiLCJuYW1lIiwibWFyayIsInNldFByb3RvdHlwZU9mIiwiX19wcm90b19fIiwiYXdyYXAiLCJhc3luYyIsIlByb21pc2UiLCJrZXlzIiwicmV2ZXJzZSIsInBvcCIsInByZXYiLCJjaGFyQXQiLCJzbGljZSIsInN0b3AiLCJydmFsIiwiaGFuZGxlIiwiY29tcGxldGUiLCJmaW5pc2giLCJfY2F0Y2giLCJkZWxlZ2F0ZVlpZWxkIiwiYXN5bmNHZW5lcmF0b3JTdGVwIiwiX2FzeW5jVG9HZW5lcmF0b3IiLCJhcmd1bWVudHMiLCJhcHBseSIsIl9uZXh0IiwiX3Rocm93IiwiUm91dGluZyIsIm1vZGUiLCJnZW9mbG8iLCJncmFwaERhdGEiLCJmZWF0dXJlcyIsIkZlYXR1cmVzIiwiZ2V0Q29sZEZlYXR1cmVzIiwiYWN0aXZhdGUiLCJlbmFibGVkIiwib3B0aW9ucyIsImVuYWJsZSIsImRlYWN0aXZhdGUiLCJtYXAiLCJnZXRTb3VyY2UiLCJzdGF0aWNzIiwiY29uc3RhbnRzIiwic291cmNlcyIsInNldERhdGEiLCJ0dXJmIiwiZmVhdHVyZUNvbGxlY3Rpb24iLCJnZXRSb3V0ZSIsImZyb21Qb2ludCIsInRvUG9pbnQiLCJtYXBNb3ZpbmciLCJnZXRGZWF0dXJlcyIsInBhdGhmaW5kZXIiLCJQYXRoRmluZGVyIiwicm91dGluZyIsInBhdGgiLCJmaW5kUGF0aCIsInZhbGlkYXRlUGF0aCIsImZpcmUiLCJmcm9tIiwidG8iLCJnZXRNYXRjaCIsIl9yZWYiLCJfY2FsbGVlIiwiY29vcmRzIiwiZmVhdHVyZSIsIl9jYWxsZWUkIiwiX2NvbnRleHQiLCJFeHBsb3JpbmciLCJzZXQiLCJzdGFydCIsInN0YXJ0UG9pbnQiLCJwcm9wZXJ0aWVzIiwiX3giLCJnZXRDbG9zZXN0IiwiY2xvc2VzdFBvaW50IiwibGFzdENsaWNrIiwicm91dGUiLCJsaW5lU3RyaW5nIiwibWVzaCIsIm1lc2hJbmRleCIsImZsYXQiLCJmaWx0ZXIiLCJnZW9tZXRyeSIsImNvbXBhY3RlZFZlcnRpY2VzIiwicHJlcHJvY2VzcyIsIl9ncmFwaCIsIl9rZXlGbiIsImtleUZuIiwiam9pbiIsIl9wcmVjaXNpb24iLCJwcmVjaXNpb24iLCJfb3B0aW9ucyIsImsiLCJiIiwicm91bmRDb29yZCIsInZlcnRpY2VzIiwicGhhbnRvbVN0YXJ0IiwiX2NyZWF0ZVBoYW50b20iLCJwaGFudG9tRW5kIiwid2VpZ2h0IiwiZnVsbFBhdGgiLCJyZWR1Y2UiLCJidWlsZFBhdGgiLCJjcyIsInZzIiwiY29uY2F0IiwiY29tcGFjdGVkQ29vcmRpbmF0ZXMiLCJiaW5kIiwic291cmNlVmVydGljZXMiLCJlZGdlRGF0YXMiLCJjb21wYWN0ZWRFZGdlcyIsImJ1aWxkRWRnZURhdGEiLCJlZHMiLCJyZWR1Y2VkRWRnZSIsInVuZGVmaW5lZCIsIl9yZW1vdmVQaGFudG9tIiwic2VyaWFsaXplIiwicGhhbnRvbSIsImNvbXBhY3ROb2RlIiwiZWRnZURhdGEiLCJlZGdlcyIsImNvb3JkaW5hdGVzIiwicmVkdWNlZEVkZ2VzIiwiaW5jb21pbmdFZGdlcyIsIm5laWdoYm9yIiwiaW5jb21pbmdDb29yZGluYXRlcyIsIlNob3J0ZXN0UGF0aCIsIklORklOSVRZIiwiYWRkVmVydGV4Iiwic2V0VmVydGljZXMiLCJncmFwaCIsInNob3J0ZXN0UGF0aCIsIm5vZGVzIiwiUHJpb3JpdHlRdWV1ZSIsImRpc3RhbmNlcyIsInByZXZpb3VzIiwic21hbGxlc3QiLCJ2ZXJ0ZXgiLCJhbHQiLCJlbnF1ZXVlIiwiaXNFbXB0eSIsImRlcXVldWUiLCJfbm9kZXMiLCJwcmlvcml0eSIsImtleSIsInNvcnQiLCJzaGlmdCIsIlRpbnlRdWV1ZSIsImRhdGEiLCJjb21wYXJlIiwiX2Rvd24iLCJpdGVtIiwiX3VwIiwidG9wIiwiYm90dG9tIiwicGVlayIsInBvcyIsInJlZiIsInBhcmVudCIsImN1cnJlbnQiLCJoYWxmTGVuZ3RoIiwibGVmdCIsImJlc3QiLCJyaWdodCIsImZpbmROZXh0RW5kIiwiZW5kcyIsInZlcnRleENvb3JkcyIsInRyYWNrSW5jb21pbmciLCJyZXZlcnNlV2VpZ2h0IiwiZWRnZURhdGFTZWVkIiwiZWRnZURhdGFSZWR1Y2VGbiIsIm5vdFByZXZpb3VzIiwiaW5kZXhPZiIsIm5laWdoYm9ycyIsImNvbXBhY3RFZGdlIiwicmVzdWx0IiwiaiIsImNvbXBhY3RHcmFwaCIsInByb2dyZXNzIiwiZmluZEVuZHMiLCJlcyIsIm51bWJlckVkZ2VzIiwicmVtb3ZlIiwiY29tcGFjdCIsIm90aGVyIiwiY29tcGFjdEVuZCIsImNvbXBhY3RlZCIsImVuZCIsImNvc3RzIiwiaW5pdGlhbFN0YXRlIiwicXVldWUiLCJleHBsb3JlZCIsInN0YXRlIiwiY29zdCIsIm5vZGUiLCJuZWlnaGJvdXJzIiwibmV3Q29zdCIsIm5ld1N0YXRlIiwidG9wbyIsIndlaWdodEZuIiwiZGVmYXVsdFdlaWdodEZuIiwiZGlzdGFuY2UiLCJwb2ludCIsInRvcG9sb2d5IiwiYnVpbGRHcmFwaCIsImVkZ2UiLCJwcm9wcyIsInciLCJtYWtlRWRnZUxpc3QiLCJjb25jYXRFZGdlIiwic3RhcnROb2RlIiwiZW5kTm9kZSIsImZvcndhcmQiLCJiYWNrd2FyZCIsIk1hdGgiLCJyb3VuZCIsImdlb0pzb25SZWR1Y2UiLCJnZW9qc29uIiwiZm4iLCJzZWVkIiwicmVkdWNlRmVhdHVyZXMiLCJnZW9Kc29uRmlsdGVyRmVhdHVyZXMiLCJpc0xpbmVTdHJpbmciLCJkZWZhdWx0S2V5Rm4iLCJsaW5lU3RyaW5ncyIsImV4cGxvZGVkTGluZVN0cmluZ3MiLCJleHBsb2RlIiwiYnVpbGRUb3BvbG9neVZlcnRpY2VzIiwiZnMiLCJyYyIsImJ1aWxkVG9wb2xvZ3lFZGdlcyIsImJ1aWxkTGluZVN0cmluZ0VkZ2VzIiwiazEiLCJrMiIsIk51bWJlciIsInRvRml4ZWQiLCJuZXdQYXRoIl0sInNvdXJjZVJvb3QiOiIifQ==