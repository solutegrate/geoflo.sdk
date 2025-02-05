/*!
 * /*!
 *  * GeoFlo SDK
 *  * Version 1.0.11
 *  * Generated on: 2025-02-05T19:16:27.794Z
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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cmMvUm91dGluZy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBtaXhpblxuICogQG1lbWJlcm9mIG1vZHVsZTpnZW9mbG9cbiAqIEBuYW1lIFJvdXRpbmdcbiAqIEBkZXNjcmlwdGlvbiBUaGlzIG1vZHVsZSBwcm92aWRlcyB0aGUgcm91dGluZyBmdW5jdGlvbmFsaXR5IGZvciB0aGUgR2VvZmxvIGFwcGxpY2F0aW9uLiBJdCBhbGxvd3MgdXNlcnMgdG8gY2FsY3VsYXRlIHJvdXRlcyBiZXR3ZWVuIHR3byBwb2ludHMgb24gdGhlIG1hcCB1c2luZyBhIFBhdGhGaW5kZXIgb2JqZWN0LlxuICogQHBhcmFtIHtPYmplY3R9IG1vZGUgLSBUaGUgbW9kZSBvYmplY3QgY29udGFpbmluZyB0aGUgdHlwZSBvZiBtb2RlLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgUm91dGluZyBvYmplY3QuXG4gKi9cbmNvbnN0IFJvdXRpbmcgPSBmdW5jdGlvbiAobW9kZSkge1xuICAgIGNvbnN0IGdlb2ZsbyA9IHRoaXMuZ2VvZmxvO1xuXG4gICAgdGhpcy50eXBlID0gbW9kZS50eXBlO1xuICAgIHRoaXMuZ3JhcGhEYXRhID0ge307XG4gICAgdGhpcy5mZWF0dXJlcyA9IGdlb2Zsby5GZWF0dXJlcy5nZXRDb2xkRmVhdHVyZXMoKTtcblxuXHQvKipcblx0ICogQGZ1bmN0aW9uXG4gICAgICogQG1lbWJlcm9mIG1vZHVsZTpnZW9mbG8uUm91dGluZ1xuXHQgKiBAbmFtZSBhY3RpdmF0ZVxuXHQgKiBAZGVzY3JpcHRpb24gQWN0aXZhdGVzIHRoZSBmdW5jdGlvbmFsaXR5IGJ5IHNldHRpbmcgdGhlICdlbmFibGVkJyBwcm9wZXJ0eSB0byB0cnVlIGFuZCBlbmFibGluZyByb3V0aW5nIGluIHRoZSBvcHRpb25zLlxuXHQgKiBAcGFyYW1zIHt2b2lkfSBOb25lXG5cdCAqIEByZXR1cm5zIHt2b2lkfVxuXHQgKi9cbiAgICB0aGlzLmFjdGl2YXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmVuYWJsZWQgPSB0cnVlO1xuICAgICAgICBnZW9mbG8ub3B0aW9uc1sncm91dGluZyddLmVuYWJsZSA9IHRydWU7XG4gICAgfTtcblxuXHQvKipcblx0ICogQGZ1bmN0aW9uXG4gICAgICogQG1lbWJlcm9mIG1vZHVsZTpnZW9mbG8uUm91dGluZ1xuXHQgKiBAbmFtZSBkZWFjdGl2YXRlXG5cdCAqIEBkZXNjcmlwdGlvbiBUaGlzIGZ1bmN0aW9uIGRlYWN0aXZhdGVzIHRoZSByb3V0aW5nIGZlYXR1cmUgYnkgc2V0dGluZyB0aGUgZW5hYmxlZCBmbGFnIHRvIGZhbHNlLCBkaXNhYmxpbmcgcm91dGluZyBpbiB0aGUgb3B0aW9ucywgYW5kIGNsZWFyaW5nIHRoZSByb3V0ZSBkYXRhIG9uIHRoZSBtYXAuXG5cdCAqIEByZXR1cm5zIHt2b2lkfVxuXHQgKi9cbiAgICB0aGlzLmRlYWN0aXZhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuZW5hYmxlZCA9IGZhbHNlO1xuICAgICAgICBnZW9mbG8ub3B0aW9uc1sncm91dGluZyddLmVuYWJsZSA9IGZhbHNlO1xuICAgICAgICBnZW9mbG8ubWFwLmdldFNvdXJjZShnZW9mbG8uc3RhdGljcy5jb25zdGFudHMuc291cmNlc1snUk9VVEUnXSkuc2V0RGF0YSh0dXJmLmZlYXR1cmVDb2xsZWN0aW9uKFtdKSk7XG4gICAgfTtcblxuXHQvKipcblx0ICogQGZ1bmN0aW9uXG4gICAgICogQG1lbWJlcm9mIG1vZHVsZTpnZW9mbG8uUm91dGluZ1xuXHQgKiBAbmFtZSBnZXRSb3V0ZVxuXHQgKiBAZGVzY3JpcHRpb24gVGhpcyBmdW5jdGlvbiBjYWxjdWxhdGVzIGEgcm91dGUgYmV0d2VlbiB0d28gcG9pbnRzIG9uIGEgbWFwIHVzaW5nIGEgUGF0aEZpbmRlciBvYmplY3QuIEl0IGNoZWNrcyBpZiB0aGUgcm91dGluZyBmZWF0dXJlIGlzIGVuYWJsZWQgYW5kIGlmIHRoZSBtYXAgaXMgbm90IGN1cnJlbnRseSBtb3ZpbmcuIEl0IHRoZW4gY3JlYXRlcyBhIGZlYXR1cmUgY29sbGVjdGlvbiBmcm9tIHRoZSBleGlzdGluZyBmZWF0dXJlcywgaW5pdGlhbGl6ZXMgYSBQYXRoRmluZGVyIG9iamVjdCwgYW5kIGZpbmRzIGEgcGF0aCBiZXR3ZWVuIHRoZSB0d28gcG9pbnRzLiBUaGUgcGF0aCBpcyB2YWxpZGF0ZWQgYW5kIHRoZW4gYWRkZWQgdG8gdGhlIG1hcCB3aXRoIGEgJ3JvdXRpbmcuYWRkJyBldmVudC5cblx0ICogQHBhcmFtIHtPYmplY3R9IGZyb21Qb2ludCAtIFRoZSBzdGFydGluZyBwb2ludCBmb3IgdGhlIHJvdXRlLlxuXHQgKiBAcGFyYW0ge09iamVjdH0gdG9Qb2ludCAtIFRoZSBkZXN0aW5hdGlvbiBwb2ludCBmb3IgdGhlIHJvdXRlLlxuXHQgKiBAcmV0dXJucyB7QXJyYXl8Ym9vbGVhbn0gVGhlIGNhbGN1bGF0ZWQgcm91dGUgcGF0aCBhcyBhbiBhcnJheSBvZiBwb2ludHMsIG9yIGZhbHNlIGlmIHRoZSByb3V0ZSBjb3VsZCBub3QgYmUgY2FsY3VsYXRlZC5cblx0ICovXG4gICAgdGhpcy5nZXRSb3V0ZSA9IGZ1bmN0aW9uIChmcm9tUG9pbnQsIHRvUG9pbnQpIHtcbiAgICAgICAgaWYgKCF0aGlzLmVuYWJsZWQgfHwgZ2VvZmxvLm1hcE1vdmluZykgcmV0dXJuIGZhbHNlO1xuICAgICAgICB2YXIgZmVhdHVyZXMgPSB0dXJmLmZlYXR1cmVDb2xsZWN0aW9uKHRoaXMuZ2V0RmVhdHVyZXMoKSk7XG4gICAgICAgIHZhciBwYXRoZmluZGVyID0gbmV3IFBhdGhGaW5kZXIoZmVhdHVyZXMsIGdlb2Zsby5vcHRpb25zLnJvdXRpbmcpO1xuICAgICAgICB2YXIgcGF0aCA9IHBhdGhmaW5kZXIuZmluZFBhdGggPyBwYXRoZmluZGVyLmZpbmRQYXRoKGZyb21Qb2ludCwgdG9Qb2ludCkgOiBmYWxzZTtcbiAgICAgICAgcGF0aCA9IHZhbGlkYXRlUGF0aChmcm9tUG9pbnQsIHRvUG9pbnQsIHBhdGgpO1xuICAgICAgICBnZW9mbG8uZmlyZSgncm91dGluZy5hZGQnLCB7IGZyb206IGZyb21Qb2ludCwgdG86IHRvUG9pbnQsIHBhdGg6IHBhdGggfSk7XG4gICAgICAgIHJldHVybiBwYXRoO1xuICAgIH07XG5cblx0LyoqXG5cdCAqIEBmdW5jdGlvblxuICAgICAqIEBtZW1iZXJvZiBtb2R1bGU6Z2VvZmxvLlJvdXRpbmdcblx0ICogQG5hbWUgZ2V0TWF0Y2hcblx0ICogQGRlc2NyaXB0aW9uIFJldHJpZXZlcyBhIG1hdGNoIGZvciB0aGUgZ2l2ZW4gY29vcmRpbmF0ZXMgdXNpbmcgdGhlIEV4cGxvcmluZyBzZXJ2aWNlLiBTZXRzIHRoZSBtYXRjaCBhcyBhIHN0YXJ0aW5nIHBvaW50IGZvciByb3V0aW5nLlxuXHQgKiBAcGFyYW0ge09iamVjdH0gY29vcmRzIC0gVGhlIGNvb3JkaW5hdGVzIGZvciB3aGljaCB0byBmaW5kIGEgbWF0Y2guXG5cdCAqIEByZXR1cm5zIHtQcm9taXNlPE9iamVjdD59IFRoZSBtYXRjaGVkIGZlYXR1cmUgd2l0aCByb3V0aW5nIHByb3BlcnR5IHNldCB0byB0cnVlLlxuXHQgKi9cbiAgICB0aGlzLmdldE1hdGNoID0gYXN5bmMgZnVuY3Rpb24gKGNvb3Jkcykge1xuICAgICAgICBpZiAoIWdlb2Zsby5FeHBsb3JpbmcpIHJldHVybiB7fTtcbiAgICAgICAgdmFyIGZlYXR1cmUgPSBhd2FpdCBnZW9mbG8uRXhwbG9yaW5nLmdldE1hdGNoKGNvb3JkcywgeyBzZXQ6IHRydWUsIHN0YXJ0OiBnZW9mbG8uc3RhcnRQb2ludCB9KTtcbiAgICAgICAgZmVhdHVyZS5wcm9wZXJ0aWVzLnJvdXRpbmcgPSB0cnVlO1xuICAgICAgICByZXR1cm4gZmVhdHVyZTtcbiAgICB9XG5cblx0LyoqXG5cdCAqIEBmdW5jdGlvblxuICAgICAqIEBtZW1iZXJvZiBtb2R1bGU6Z2VvZmxvLlJvdXRpbmdcblx0ICogQG5hbWUgZ2V0Q2xvc2VzdFxuXHQgKiBAZGVzY3JpcHRpb24gQ2FsY3VsYXRlcyB0aGUgY2xvc2VzdCBwb2ludCBvbiBhIHJvdXRlIGJhc2VkIG9uIHRoZSBsYXN0IGNsaWNrIGFuZCB0aGUgY2xvc2VzdCBwb2ludCB0byBpdC5cblx0ICogQHJldHVybnMge09iamVjdHxib29sZWFufSBSZXR1cm5zIGEgR2VvSlNPTiBMaW5lU3RyaW5nIGZlYXR1cmUgd2l0aCByb3V0aW5nIHByb3BlcnR5IHNldCB0byB0cnVlIGlmIHN1Y2Nlc3NmdWwsIG90aGVyd2lzZSBmYWxzZS5cblx0ICovXG4gICAgdGhpcy5nZXRDbG9zZXN0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIWdlb2Zsby5jbG9zZXN0UG9pbnQgfHwgIWdlb2Zsby5sYXN0Q2xpY2spIHJldHVybiBmYWxzZTtcbiAgICAgICAgdmFyIHJvdXRlID0gdGhpcy5nZXRSb3V0ZShnZW9mbG8ubGFzdENsaWNrLCBnZW9mbG8uY2xvc2VzdFBvaW50KTtcbiAgICAgICAgaWYgKCFyb3V0ZSB8fCAhcm91dGUucGF0aCkgcmV0dXJuIGZhbHNlO1xuICAgICAgICB2YXIgZmVhdHVyZSA9IHR1cmYubGluZVN0cmluZyhyb3V0ZS5wYXRoKTtcbiAgICAgICAgZmVhdHVyZS5wcm9wZXJ0aWVzLnJvdXRpbmcgPSB0cnVlO1xuICAgICAgICByZXR1cm4gZmVhdHVyZTtcbiAgICB9O1xuXG5cdC8qKlxuXHQgKiBAZnVuY3Rpb25cbiAgICAgKiBAbWVtYmVyb2YgbW9kdWxlOmdlb2Zsby5Sb3V0aW5nXG5cdCAqIEBuYW1lIGdldEZlYXR1cmVzXG5cdCAqIEBkZXNjcmlwdGlvbiBSZXRyaWV2ZXMgZmVhdHVyZXMgb2YgdHlwZSAnTGluZVN0cmluZycgZnJvbSB0aGUgbWVzaCBpbmRleC5cblx0ICogQHJldHVybnMge0FycmF5fSBBbiBhcnJheSBvZiBmZWF0dXJlcyBvZiB0eXBlICdMaW5lU3RyaW5nJy5cblx0ICovXG4gICAgdGhpcy5nZXRGZWF0dXJlcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIG1lc2ggPSBnZW9mbG8ubWVzaEluZGV4LmdldEZlYXR1cmVzKCk7XG4gICAgICAgIHZhciBmZWF0dXJlcyA9IFttZXNoLCB0aGlzLmZlYXR1cmVzXS5mbGF0KCk7XG4gICAgICAgIHJldHVybiBmZWF0dXJlcy5maWx0ZXIoZnVuY3Rpb24oZmVhdHVyZSkgeyByZXR1cm4gZmVhdHVyZS5nZW9tZXRyeS50eXBlID09PSAnTGluZVN0cmluZycgfSk7XG4gICAgfTtcblxuICAgIFxuICAgIGlmIChnZW9mbG8ub3B0aW9uc1sncm91dGluZyddLmVuYWJsZSkgdGhpcy5hY3RpdmF0ZSgpO1xuXG5cbiAgICBmdW5jdGlvbiBQYXRoRmluZGVyKGZlYXR1cmVzLCBvcHRpb25zKSB7XG4gICAgICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgICAgICBcbiAgICAgICAgaWYgKCFmZWF0dXJlcy5jb21wYWN0ZWRWZXJ0aWNlcykgeyBmZWF0dXJlcyA9IHByZXByb2Nlc3MoZmVhdHVyZXMsIG9wdGlvbnMpOyB9XG5cbiAgICAgICAgdGhpcy5fZ3JhcGggPSBmZWF0dXJlcztcbiAgICAgICAgdGhpcy5fa2V5Rm4gPSBvcHRpb25zLmtleUZuIHx8IGZ1bmN0aW9uKGMpIHsgcmV0dXJuIGMuam9pbignLCcpOyB9O1xuICAgICAgICB0aGlzLl9wcmVjaXNpb24gPSBvcHRpb25zLnByZWNpc2lvbiB8fCAxZS01O1xuICAgICAgICB0aGlzLl9vcHRpb25zID0gb3B0aW9ucztcbiAgICBcbiAgICAgICAgaWYgKE9iamVjdC5rZXlzKHRoaXMuX2dyYXBoLmNvbXBhY3RlZFZlcnRpY2VzKS5maWx0ZXIoZnVuY3Rpb24oaykgeyByZXR1cm4gayAhPT0gJ2VkZ2VEYXRhJzsgfSkubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZmluZFBhdGggPSBmdW5jdGlvbihhLCBiKSB7XG4gICAgICAgICAgICB2YXIgc3RhcnQgPSB0aGlzLl9rZXlGbihyb3VuZENvb3JkKGEuY29vcmRzLCB0aGlzLl9wcmVjaXNpb24pKSxcbiAgICAgICAgICAgICAgICBmaW5pc2ggPSB0aGlzLl9rZXlGbihyb3VuZENvb3JkKGIuY29vcmRzLCB0aGlzLl9wcmVjaXNpb24pKTtcbiAgICBcbiAgICAgICAgICAgIGlmICghdGhpcy5fZ3JhcGgudmVydGljZXNbc3RhcnRdIHx8ICF0aGlzLl9ncmFwaC52ZXJ0aWNlc1tmaW5pc2hdKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgXG4gICAgICAgICAgICB2YXIgcGhhbnRvbVN0YXJ0ID0gdGhpcy5fY3JlYXRlUGhhbnRvbShzdGFydCk7XG4gICAgICAgICAgICB2YXIgcGhhbnRvbUVuZCA9IHRoaXMuX2NyZWF0ZVBoYW50b20oZmluaXNoKTtcbiAgICBcbiAgICAgICAgICAgIHZhciBwYXRoID0gZmluZFBhdGgodGhpcy5fZ3JhcGguY29tcGFjdGVkVmVydGljZXMsIHN0YXJ0LCBmaW5pc2gpO1xuICAgIFxuICAgICAgICAgICAgaWYgKHBhdGgpIHtcbiAgICAgICAgICAgICAgICB2YXIgd2VpZ2h0ID0gcGF0aFswXTtcbiAgICAgICAgICAgICAgICBwYXRoID0gcGF0aFsxXTtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBmdWxsUGF0aDogcGF0aCxcbiAgICAgICAgICAgICAgICAgICAgcGF0aDogcGF0aC5yZWR1Y2UoZnVuY3Rpb24gYnVpbGRQYXRoKGNzLCB2LCBpLCB2cykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGkgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3MgPSBjcy5jb25jYXQodGhpcy5fZ3JhcGguY29tcGFjdGVkQ29vcmRpbmF0ZXNbdnNbaSAtIDFdXVt2XSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY3M7XG4gICAgICAgICAgICAgICAgICAgIH0uYmluZCh0aGlzKSwgW10pLmNvbmNhdChbdGhpcy5fZ3JhcGguc291cmNlVmVydGljZXNbZmluaXNoXV0pLFxuICAgICAgICAgICAgICAgICAgICB3ZWlnaHQ6IHdlaWdodCxcbiAgICAgICAgICAgICAgICAgICAgZWRnZURhdGFzOiB0aGlzLl9ncmFwaC5jb21wYWN0ZWRFZGdlcyBcbiAgICAgICAgICAgICAgICAgICAgICAgID8gcGF0aC5yZWR1Y2UoZnVuY3Rpb24gYnVpbGRFZGdlRGF0YShlZHMsIHYsIGksIHZzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGkgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVkcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZHVjZWRFZGdlOiB0aGlzLl9ncmFwaC5jb21wYWN0ZWRFZGdlc1t2c1tpIC0gMV1dW3ZdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZWRzO1xuICAgICAgICAgICAgICAgICAgICAgICAgfS5iaW5kKHRoaXMpLCBbXSlcbiAgICAgICAgICAgICAgICAgICAgICAgIDogdW5kZWZpbmVkXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgXG4gICAgICAgICAgICB0aGlzLl9yZW1vdmVQaGFudG9tKHBoYW50b21TdGFydCk7XG4gICAgICAgICAgICB0aGlzLl9yZW1vdmVQaGFudG9tKHBoYW50b21FbmQpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZXJpYWxpemUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9ncmFwaDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2NyZWF0ZVBoYW50b20gPSBmdW5jdGlvbihuKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fZ3JhcGguY29tcGFjdGVkVmVydGljZXNbbl0pIHJldHVybiBudWxsO1xuICAgIFxuICAgICAgICAgICAgdmFyIHBoYW50b20gPSBjb21wYWN0Tm9kZShuLCB0aGlzLl9ncmFwaC52ZXJ0aWNlcywgdGhpcy5fZ3JhcGguY29tcGFjdGVkVmVydGljZXMsIHRoaXMuX2dyYXBoLnNvdXJjZVZlcnRpY2VzLCB0aGlzLl9ncmFwaC5lZGdlRGF0YSwgdHJ1ZSwgdGhpcy5fb3B0aW9ucyk7XG4gICAgICAgICAgICB0aGlzLl9ncmFwaC5jb21wYWN0ZWRWZXJ0aWNlc1tuXSA9IHBoYW50b20uZWRnZXM7XG4gICAgICAgICAgICB0aGlzLl9ncmFwaC5jb21wYWN0ZWRDb29yZGluYXRlc1tuXSA9IHBoYW50b20uY29vcmRpbmF0ZXM7XG4gICAgXG4gICAgICAgICAgICBpZiAodGhpcy5fZ3JhcGguY29tcGFjdGVkRWRnZXMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9ncmFwaC5jb21wYWN0ZWRFZGdlc1tuXSA9IHBoYW50b20ucmVkdWNlZEVkZ2VzO1xuICAgICAgICAgICAgfVxuICAgIFxuICAgICAgICAgICAgT2JqZWN0LmtleXMocGhhbnRvbS5pbmNvbWluZ0VkZ2VzKS5mb3JFYWNoKGZ1bmN0aW9uKG5laWdoYm9yKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZ3JhcGguY29tcGFjdGVkVmVydGljZXNbbmVpZ2hib3JdW25dID0gcGhhbnRvbS5pbmNvbWluZ0VkZ2VzW25laWdoYm9yXTtcbiAgICAgICAgICAgICAgICB0aGlzLl9ncmFwaC5jb21wYWN0ZWRDb29yZGluYXRlc1tuZWlnaGJvcl1bbl0gPSBbdGhpcy5fZ3JhcGguc291cmNlVmVydGljZXNbbmVpZ2hib3JdXS5jb25jYXQocGhhbnRvbS5pbmNvbWluZ0Nvb3JkaW5hdGVzW25laWdoYm9yXS5zbGljZSgwLCAtMSkpO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9ncmFwaC5jb21wYWN0ZWRFZGdlcykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9ncmFwaC5jb21wYWN0ZWRFZGdlc1tuZWlnaGJvcl1bbl0gPSBwaGFudG9tLnJlZHVjZWRFZGdlc1tuZWlnaGJvcl07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfS5iaW5kKHRoaXMpKVxuICAgIFxuICAgICAgICAgICAgcmV0dXJuIG47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9yZW1vdmVQaGFudG9tID0gZnVuY3Rpb24obikge1xuICAgICAgICAgICAgaWYgKCFuKSByZXR1cm47XG4gICAgXG4gICAgICAgICAgICBPYmplY3Qua2V5cyh0aGlzLl9ncmFwaC5jb21wYWN0ZWRWZXJ0aWNlc1tuXSkuZm9yRWFjaChmdW5jdGlvbihuZWlnaGJvcikge1xuICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9ncmFwaC5jb21wYWN0ZWRWZXJ0aWNlc1tuZWlnaGJvcl1bbl07XG4gICAgICAgICAgICB9LmJpbmQodGhpcykpO1xuICAgICAgICAgICAgT2JqZWN0LmtleXModGhpcy5fZ3JhcGguY29tcGFjdGVkQ29vcmRpbmF0ZXNbbl0pLmZvckVhY2goZnVuY3Rpb24obmVpZ2hib3IpIHtcbiAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5fZ3JhcGguY29tcGFjdGVkQ29vcmRpbmF0ZXNbbmVpZ2hib3JdW25dO1xuICAgICAgICAgICAgfS5iaW5kKHRoaXMpKTtcbiAgICAgICAgICAgIGlmICh0aGlzLl9ncmFwaC5jb21wYWN0ZWRFZGdlcykge1xuICAgICAgICAgICAgICAgIE9iamVjdC5rZXlzKHRoaXMuX2dyYXBoLmNvbXBhY3RlZEVkZ2VzW25dKS5mb3JFYWNoKGZ1bmN0aW9uKG5laWdoYm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9ncmFwaC5jb21wYWN0ZWRFZGdlc1tuZWlnaGJvcl1bbl07XG4gICAgICAgICAgICAgICAgfS5iaW5kKHRoaXMpKTtcbiAgICAgICAgICAgIH1cbiAgICBcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9ncmFwaC5jb21wYWN0ZWRWZXJ0aWNlc1tuXTtcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9ncmFwaC5jb21wYWN0ZWRDb29yZGluYXRlc1tuXTtcbiAgICBcbiAgICAgICAgICAgIGlmICh0aGlzLl9ncmFwaC5jb21wYWN0ZWRFZGdlcykge1xuICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9ncmFwaC5jb21wYWN0ZWRFZGdlc1tuXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBmdW5jdGlvbiBTaG9ydGVzdFBhdGggKCkge1xuICAgICAgICB2YXIgSU5GSU5JVFkgPSAxIC8gMDtcbiAgICAgICAgdGhpcy52ZXJ0aWNlcyA9IHt9O1xuICAgIFxuICAgICAgICB0aGlzLmFkZFZlcnRleCA9IGZ1bmN0aW9uIChuYW1lLCBlZGdlcykge1xuICAgICAgICAgICAgdGhpcy52ZXJ0aWNlc1tuYW1lXSA9IGVkZ2VzO1xuICAgICAgICB9O1xuICAgIFxuICAgICAgICB0aGlzLnNldFZlcnRpY2VzID0gZnVuY3Rpb24gKGdyYXBoKSB7XG4gICAgICAgICAgICB0aGlzLnZlcnRpY2VzID0gZ3JhcGg7XG4gICAgICAgIH07XG4gICAgXG4gICAgICAgIHRoaXMuc2hvcnRlc3RQYXRoID0gZnVuY3Rpb24gKHN0YXJ0LCBmaW5pc2gpIHtcbiAgICAgICAgICAgIHZhciBub2RlcyA9IG5ldyBQcmlvcml0eVF1ZXVlKCksXG4gICAgICAgICAgICAgICAgZGlzdGFuY2VzID0ge30sXG4gICAgICAgICAgICAgICAgcHJldmlvdXMgPSB7fSxcbiAgICAgICAgICAgICAgICBwYXRoID0gW10sXG4gICAgICAgICAgICAgICAgc21hbGxlc3QsIHZlcnRleCwgbmVpZ2hib3IsIGFsdDtcbiAgICAgICAgXG4gICAgICAgICAgICBmb3IgKHZlcnRleCBpbiB0aGlzLnZlcnRpY2VzKSB7XG4gICAgICAgICAgICAgICAgaWYgKHZlcnRleCA9PT0gc3RhcnQpIHtcbiAgICAgICAgICAgICAgICAgICAgZGlzdGFuY2VzW3ZlcnRleF0gPSAwO1xuICAgICAgICAgICAgICAgICAgICBub2Rlcy5lbnF1ZXVlKDAsIHZlcnRleCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZGlzdGFuY2VzW3ZlcnRleF0gPSBJTkZJTklUWTtcbiAgICAgICAgICAgICAgICAgICAgbm9kZXMuZW5xdWV1ZShJTkZJTklUWSwgdmVydGV4KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgICAgICAgIHByZXZpb3VzW3ZlcnRleF0gPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgICAgIHdoaWxlICghbm9kZXMuaXNFbXB0eSgpKSB7XG4gICAgICAgICAgICAgICAgc21hbGxlc3QgPSBub2Rlcy5kZXF1ZXVlKCk7XG4gICAgICAgIFxuICAgICAgICAgICAgICAgIGlmIChzbWFsbGVzdCA9PT0gZmluaXNoKSB7XG4gICAgICAgICAgICAgICAgICAgIHBhdGggPSBbXTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB3aGlsZSAocHJldmlvdXNbc21hbGxlc3RdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXRoLnB1c2goc21hbGxlc3QpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc21hbGxlc3QgPSBwcmV2aW91c1tzbWFsbGVzdF07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgICAgICAgIGlmICghc21hbGxlc3QgfHwgZGlzdGFuY2VzW3NtYWxsZXN0XSA9PT0gSU5GSU5JVFkpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgICAgICAgICBmb3IgKG5laWdoYm9yIGluIHRoaXMudmVydGljZXNbc21hbGxlc3RdKSB7XG4gICAgICAgICAgICAgICAgICAgIGFsdCA9IGRpc3RhbmNlc1tzbWFsbGVzdF0gKyB0aGlzLnZlcnRpY2VzW3NtYWxsZXN0XVtuZWlnaGJvcl07XG4gICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBpZiAoYWx0IDwgZGlzdGFuY2VzW25laWdoYm9yXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGlzdGFuY2VzW25laWdoYm9yXSA9IGFsdDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZXZpb3VzW25laWdoYm9yXSA9IHNtYWxsZXN0O1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICBub2Rlcy5lbnF1ZXVlKGFsdCwgbmVpZ2hib3IpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgICAgIHJldHVybiBwYXRoO1xuICAgICAgICB9O1xuICAgIH07XG4gICAgXG4gICAgZnVuY3Rpb24gUHJpb3JpdHlRdWV1ZSgpIHtcbiAgICAgICAgdGhpcy5fbm9kZXMgPSBbXTtcbiAgICBcbiAgICAgICAgdGhpcy5lbnF1ZXVlID0gZnVuY3Rpb24gKHByaW9yaXR5LCBrZXkpIHtcbiAgICAgICAgICAgIHRoaXMuX25vZGVzLnB1c2goe2tleToga2V5LCBwcmlvcml0eTogcHJpb3JpdHl9KTtcbiAgICAgICAgICAgIHRoaXMuc29ydCgpO1xuICAgICAgICB9O1xuICAgIFxuICAgICAgICB0aGlzLmRlcXVldWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbm9kZXMuc2hpZnQoKS5rZXk7XG4gICAgICAgIH07XG4gICAgXG4gICAgICAgIHRoaXMuc29ydCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuX25vZGVzLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYS5wcmlvcml0eSAtIGIucHJpb3JpdHk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICBcbiAgICAgICAgdGhpcy5pc0VtcHR5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuICF0aGlzLl9ub2Rlcy5sZW5ndGg7XG4gICAgICAgIH07XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIFRpbnlRdWV1ZShkYXRhLCBjb21wYXJlKSB7XG4gICAgICAgIGlmICggZGF0YSA9PT0gdm9pZCAwICkgZGF0YSA9IFtdO1xuICAgICAgICBpZiAoIGNvbXBhcmUgPT09IHZvaWQgMCApIGNvbXBhcmUgPSBmdW5jdGlvbiAoYSwgYikge1xuICAgICAgICAgICAgcmV0dXJuIGEgPCBiID8gLTEgOiBhID4gYiA/IDEgOiAwO1xuICAgICAgICB9O1xuICAgIFxuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xuICAgICAgICB0aGlzLmxlbmd0aCA9IHRoaXMuZGF0YS5sZW5ndGg7XG4gICAgICAgIHRoaXMuY29tcGFyZSA9IGNvbXBhcmU7XG4gICAgXG4gICAgICAgIGlmICh0aGlzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAodGhpcy5sZW5ndGggPj4gMSkgLSAxOyBpID49IDA7IGktLSkgeyB0aGlzLl9kb3duKGkpOyB9XG4gICAgICAgIH1cbiAgICBcbiAgICAgICAgdGhpcy5wdXNoID0gZnVuY3Rpb24gcHVzaCAoaXRlbSkge1xuICAgICAgICAgICAgdGhpcy5kYXRhLnB1c2goaXRlbSk7XG4gICAgICAgICAgICB0aGlzLmxlbmd0aCsrO1xuICAgICAgICAgICAgdGhpcy5fdXAodGhpcy5sZW5ndGggLSAxKTtcbiAgICAgICAgfTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMucG9wID0gZnVuY3Rpb24gcG9wICgpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmxlbmd0aCA9PT0gMCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9XG4gICAgICAgIFxuICAgICAgICAgICAgdmFyIHRvcCA9IHRoaXMuZGF0YVswXTtcbiAgICAgICAgICAgIHZhciBib3R0b20gPSB0aGlzLmRhdGEucG9wKCk7XG4gICAgICAgICAgICB0aGlzLmxlbmd0aC0tO1xuICAgICAgICBcbiAgICAgICAgICAgIGlmICh0aGlzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGFbMF0gPSBib3R0b207XG4gICAgICAgICAgICAgICAgdGhpcy5fZG93bigwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgICAgICByZXR1cm4gdG9wO1xuICAgICAgICB9O1xuICAgICAgICBcbiAgICAgICAgdGhpcy5wZWVrID0gZnVuY3Rpb24gcGVlayAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kYXRhWzBdO1xuICAgICAgICB9O1xuICAgICAgICBcbiAgICAgICAgdGhpcy5fdXAgPSBmdW5jdGlvbiBfdXAgKHBvcykge1xuICAgICAgICAgICAgdmFyIHJlZiA9IHRoaXM7XG4gICAgICAgICAgICAgICAgdmFyIGRhdGEgPSByZWYuZGF0YTtcbiAgICAgICAgICAgICAgICB2YXIgY29tcGFyZSA9IHJlZi5jb21wYXJlO1xuICAgICAgICAgICAgdmFyIGl0ZW0gPSBkYXRhW3Bvc107XG4gICAgICAgIFxuICAgICAgICAgICAgd2hpbGUgKHBvcyA+IDApIHtcbiAgICAgICAgICAgICAgICB2YXIgcGFyZW50ID0gKHBvcyAtIDEpID4+IDE7XG4gICAgICAgICAgICAgICAgdmFyIGN1cnJlbnQgPSBkYXRhW3BhcmVudF07XG4gICAgICAgICAgICAgICAgaWYgKGNvbXBhcmUoaXRlbSwgY3VycmVudCkgPj0gMCkgeyBicmVhazsgfVxuICAgICAgICAgICAgICAgIGRhdGFbcG9zXSA9IGN1cnJlbnQ7XG4gICAgICAgICAgICAgICAgcG9zID0gcGFyZW50O1xuICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgICAgIGRhdGFbcG9zXSA9IGl0ZW07XG4gICAgICAgIH07XG4gICAgICAgIFxuICAgICAgICB0aGlzLl9kb3duID0gZnVuY3Rpb24gX2Rvd24gKHBvcykge1xuICAgICAgICAgICAgdmFyIHJlZiA9IHRoaXM7XG4gICAgICAgICAgICAgICAgdmFyIGRhdGEgPSByZWYuZGF0YTtcbiAgICAgICAgICAgICAgICB2YXIgY29tcGFyZSA9IHJlZi5jb21wYXJlO1xuICAgICAgICAgICAgdmFyIGhhbGZMZW5ndGggPSB0aGlzLmxlbmd0aCA+PiAxO1xuICAgICAgICAgICAgdmFyIGl0ZW0gPSBkYXRhW3Bvc107XG4gICAgICAgIFxuICAgICAgICAgICAgd2hpbGUgKHBvcyA8IGhhbGZMZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB2YXIgbGVmdCA9IChwb3MgPDwgMSkgKyAxO1xuICAgICAgICAgICAgICAgIHZhciBiZXN0ID0gZGF0YVtsZWZ0XTtcbiAgICAgICAgICAgICAgICB2YXIgcmlnaHQgPSBsZWZ0ICsgMTtcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKHJpZ2h0IDwgdGhpcy5sZW5ndGggJiYgY29tcGFyZShkYXRhW3JpZ2h0XSwgYmVzdCkgPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGxlZnQgPSByaWdodDtcbiAgICAgICAgICAgICAgICAgICAgYmVzdCA9IGRhdGFbcmlnaHRdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoY29tcGFyZShiZXN0LCBpdGVtKSA+PSAwKSB7IGJyZWFrOyB9XG4gICAgICAgIFxuICAgICAgICAgICAgICAgIGRhdGFbcG9zXSA9IGJlc3Q7XG4gICAgICAgICAgICAgICAgcG9zID0gbGVmdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgICAgICBkYXRhW3Bvc10gPSBpdGVtO1xuICAgICAgICB9O1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBmaW5kTmV4dEVuZChwcmV2LCB2LCB2ZXJ0aWNlcywgZW5kcywgdmVydGV4Q29vcmRzLCBlZGdlRGF0YSwgdHJhY2tJbmNvbWluZywgb3B0aW9ucykge1xuICAgICAgICB2YXIgd2VpZ2h0ID0gdmVydGljZXNbcHJldl1bdl0sXG4gICAgICAgICAgICByZXZlcnNlV2VpZ2h0ID0gdmVydGljZXNbdl1bcHJldl0sXG4gICAgICAgICAgICBjb29yZGluYXRlcyA9IFtdLFxuICAgICAgICAgICAgcGF0aCA9IFtdLFxuICAgICAgICAgICAgcmVkdWNlZEVkZ2UgPSBvcHRpb25zLmVkZ2VEYXRhU2VlZDtcbiAgICAgICAgICAgIFxuICAgICAgICBpZiAob3B0aW9ucy5lZGdlRGF0YVJlZHVjZUZuKSB7XG4gICAgICAgICAgICByZWR1Y2VkRWRnZSA9IG9wdGlvbnMuZWRnZURhdGFSZWR1Y2VGbihyZWR1Y2VkRWRnZSwgZWRnZURhdGFbdl1bcHJldl0pO1xuICAgICAgICB9XG4gICAgXG4gICAgICAgIHdoaWxlICghZW5kc1t2XSkge1xuICAgICAgICAgICAgdmFyIGVkZ2VzID0gdmVydGljZXNbdl07XG4gICAgXG4gICAgICAgICAgICBpZiAoIWVkZ2VzKSB7IGJyZWFrOyB9XG4gICAgXG4gICAgICAgICAgICB2YXIgbmV4dCA9IE9iamVjdC5rZXlzKGVkZ2VzKS5maWx0ZXIoZnVuY3Rpb24gbm90UHJldmlvdXMoaykgeyByZXR1cm4gayAhPT0gcHJldjsgfSlbMF07XG4gICAgICAgICAgICB3ZWlnaHQgKz0gZWRnZXNbbmV4dF07XG4gICAgXG4gICAgICAgICAgICBpZiAodHJhY2tJbmNvbWluZykge1xuICAgICAgICAgICAgICAgIHJldmVyc2VXZWlnaHQgKz0gdmVydGljZXNbbmV4dF1bdl07XG4gICAgXG4gICAgICAgICAgICAgICAgaWYgKHBhdGguaW5kZXhPZih2KSA+PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGVuZHNbdl0gPSB2ZXJ0aWNlc1t2XTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHBhdGgucHVzaCh2KTtcbiAgICAgICAgICAgIH1cbiAgICBcbiAgICAgICAgICAgIGlmIChvcHRpb25zLmVkZ2VEYXRhUmVkdWNlRm4pIHtcbiAgICAgICAgICAgICAgICByZWR1Y2VkRWRnZSA9IG9wdGlvbnMuZWRnZURhdGFSZWR1Y2VGbihyZWR1Y2VkRWRnZSwgZWRnZURhdGFbdl1bbmV4dF0pO1xuICAgICAgICAgICAgfVxuICAgIFxuICAgICAgICAgICAgY29vcmRpbmF0ZXMucHVzaCh2ZXJ0ZXhDb29yZHNbdl0pO1xuICAgICAgICAgICAgcHJldiA9IHY7XG4gICAgICAgICAgICB2ID0gbmV4dDtcbiAgICAgICAgfVxuICAgIFxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdmVydGV4OiB2LFxuICAgICAgICAgICAgd2VpZ2h0OiB3ZWlnaHQsXG4gICAgICAgICAgICByZXZlcnNlV2VpZ2h0OiByZXZlcnNlV2VpZ2h0LFxuICAgICAgICAgICAgY29vcmRpbmF0ZXM6IGNvb3JkaW5hdGVzLFxuICAgICAgICAgICAgcmVkdWNlZEVkZ2U6IHJlZHVjZWRFZGdlXG4gICAgICAgIH07XG4gICAgfTtcbiAgICBcbiAgICBmdW5jdGlvbiBjb21wYWN0Tm9kZShrLCB2ZXJ0aWNlcywgZW5kcywgdmVydGV4Q29vcmRzLCBlZGdlRGF0YSwgdHJhY2tJbmNvbWluZywgb3B0aW9ucykge1xuICAgICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICAgICAgdmFyIG5laWdoYm9ycyA9IHZlcnRpY2VzW2tdO1xuICAgICAgICByZXR1cm4gT2JqZWN0LmtleXMobmVpZ2hib3JzKS5yZWR1Y2UoZnVuY3Rpb24gY29tcGFjdEVkZ2UocmVzdWx0LCBqKSB7XG4gICAgICAgICAgICB2YXIgbmVpZ2hib3IgPSBmaW5kTmV4dEVuZChrLCBqLCB2ZXJ0aWNlcywgZW5kcywgdmVydGV4Q29vcmRzLCBlZGdlRGF0YSwgdHJhY2tJbmNvbWluZywgb3B0aW9ucyk7XG4gICAgICAgICAgICB2YXIgd2VpZ2h0ID0gbmVpZ2hib3Iud2VpZ2h0O1xuICAgICAgICAgICAgdmFyIHJldmVyc2VXZWlnaHQgPSBuZWlnaGJvci5yZXZlcnNlV2VpZ2h0O1xuICAgICAgICAgICAgaWYgKG5laWdoYm9yLnZlcnRleCAhPT0gaykge1xuICAgICAgICAgICAgICAgIGlmICghcmVzdWx0LmVkZ2VzW25laWdoYm9yLnZlcnRleF0gfHwgcmVzdWx0LmVkZ2VzW25laWdoYm9yLnZlcnRleF0gPiB3ZWlnaHQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LmVkZ2VzW25laWdoYm9yLnZlcnRleF0gPSB3ZWlnaHQ7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5jb29yZGluYXRlc1tuZWlnaGJvci52ZXJ0ZXhdID0gW3ZlcnRleENvb3Jkc1trXV0uY29uY2F0KG5laWdoYm9yLmNvb3JkaW5hdGVzKTtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnJlZHVjZWRFZGdlc1tuZWlnaGJvci52ZXJ0ZXhdID0gbmVpZ2hib3IucmVkdWNlZEVkZ2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0cmFja0luY29taW5nICYmIFxuICAgICAgICAgICAgICAgICAgICAhaXNOYU4ocmV2ZXJzZVdlaWdodCkgJiYgKCFyZXN1bHQuaW5jb21pbmdFZGdlc1tuZWlnaGJvci52ZXJ0ZXhdIHx8IHJlc3VsdC5pbmNvbWluZ0VkZ2VzW25laWdoYm9yLnZlcnRleF0gPiByZXZlcnNlV2VpZ2h0KSkge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQuaW5jb21pbmdFZGdlc1tuZWlnaGJvci52ZXJ0ZXhdID0gcmV2ZXJzZVdlaWdodDtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNvb3JkaW5hdGVzID0gW3ZlcnRleENvb3Jkc1trXV0uY29uY2F0KG5laWdoYm9yLmNvb3JkaW5hdGVzKTtcbiAgICAgICAgICAgICAgICAgICAgY29vcmRpbmF0ZXMucmV2ZXJzZSgpO1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQuaW5jb21pbmdDb29yZGluYXRlc1tuZWlnaGJvci52ZXJ0ZXhdID0gY29vcmRpbmF0ZXM7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfSwge2VkZ2VzOiB7fSwgaW5jb21pbmdFZGdlczoge30sIGNvb3JkaW5hdGVzOiB7fSwgaW5jb21pbmdDb29yZGluYXRlczoge30sIHJlZHVjZWRFZGdlczoge319KTtcbiAgICB9O1xuICAgIFxuICAgIGZ1bmN0aW9uIGNvbXBhY3RHcmFwaCh2ZXJ0aWNlcywgdmVydGV4Q29vcmRzLCBlZGdlRGF0YSwgb3B0aW9ucykge1xuICAgICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICAgICAgdmFyIHByb2dyZXNzID0gb3B0aW9ucy5wcm9ncmVzcztcbiAgICAgICAgdmFyIGVuZHMgPSBPYmplY3Qua2V5cyh2ZXJ0aWNlcykucmVkdWNlKGZ1bmN0aW9uIGZpbmRFbmRzKGVzLCBrLCBpLCB2cykge1xuICAgICAgICAgICAgdmFyIHZlcnRleCA9IHZlcnRpY2VzW2tdO1xuICAgICAgICAgICAgdmFyIGVkZ2VzID0gT2JqZWN0LmtleXModmVydGV4KTtcbiAgICAgICAgICAgIHZhciBudW1iZXJFZGdlcyA9IGVkZ2VzLmxlbmd0aDtcbiAgICAgICAgICAgIHZhciByZW1vdmU7XG4gICAgXG4gICAgICAgICAgICBpZihvcHRpb25zLmNvbXBhY3QgPT09IGZhbHNlKSAge1xuICAgICAgICAgICAgICAgIHJlbW92ZSA9IGZhbHNlO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChudW1iZXJFZGdlcyA9PT0gMSkge1xuICAgICAgICAgICAgICAgIHZhciBvdGhlciA9IHZlcnRpY2VzW2VkZ2VzWzBdXTtcbiAgICAgICAgICAgICAgICByZW1vdmUgPSAhb3RoZXJba107XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG51bWJlckVkZ2VzID09PSAyKSB7XG4gICAgICAgICAgICAgICAgcmVtb3ZlID0gZWRnZXMuZmlsdGVyKGZ1bmN0aW9uKG4pIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZlcnRpY2VzW25dW2tdO1xuICAgICAgICAgICAgICAgIH0pLmxlbmd0aCA9PT0gbnVtYmVyRWRnZXM7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlbW92ZSA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAoIXJlbW92ZSkge1xuICAgICAgICAgICAgICAgIGVzW2tdID0gdmVydGV4O1xuICAgICAgICAgICAgfVxuICAgIFxuICAgICAgICAgICAgaWYgKGkgJSAxMDAwID09PSAwICYmIHByb2dyZXNzKSB7XG4gICAgICAgICAgICAgICAgcHJvZ3Jlc3MoJ2NvbXBhY3Q6ZW5kcycsIGksIHZzLmxlbmd0aCk7XG4gICAgICAgICAgICB9XG4gICAgXG4gICAgICAgICAgICByZXR1cm4gZXM7XG4gICAgICAgIH0sIHt9KTtcbiAgICBcbiAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKGVuZHMpLnJlZHVjZShmdW5jdGlvbiBjb21wYWN0RW5kKHJlc3VsdCwgaywgaSwgZXMpIHtcbiAgICAgICAgICAgIHZhciBjb21wYWN0ZWQgPSBjb21wYWN0Tm9kZShrLCB2ZXJ0aWNlcywgZW5kcywgdmVydGV4Q29vcmRzLCBlZGdlRGF0YSwgZmFsc2UsIG9wdGlvbnMpO1xuICAgICAgICAgICAgcmVzdWx0LmdyYXBoW2tdID0gY29tcGFjdGVkLmVkZ2VzO1xuICAgICAgICAgICAgcmVzdWx0LmNvb3JkaW5hdGVzW2tdID0gY29tcGFjdGVkLmNvb3JkaW5hdGVzO1xuICAgIFxuICAgICAgICAgICAgaWYgKG9wdGlvbnMuZWRnZURhdGFSZWR1Y2VGbikge1xuICAgICAgICAgICAgICAgIHJlc3VsdC5yZWR1Y2VkRWRnZXNba10gPSBjb21wYWN0ZWQucmVkdWNlZEVkZ2VzO1xuICAgICAgICAgICAgfVxuICAgIFxuICAgICAgICAgICAgaWYgKGkgJSAxMDAwID09PSAwICYmIHByb2dyZXNzKSB7XG4gICAgICAgICAgICAgICAgcHJvZ3Jlc3MoJ2NvbXBhY3Q6bm9kZXMnLCBpLCBlcy5sZW5ndGgpO1xuICAgICAgICAgICAgfVxuICAgIFxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfSwge2dyYXBoOiB7fSwgY29vcmRpbmF0ZXM6IHt9LCByZWR1Y2VkRWRnZXM6IHt9fSk7XG4gICAgfTtcbiAgICBcbiAgICBmdW5jdGlvbiBmaW5kUGF0aChncmFwaCwgc3RhcnQsIGVuZCkge1xuICAgICAgICB2YXIgY29zdHMgPSB7fTtcbiAgICAgICAgY29zdHNbc3RhcnRdID0gMDtcbiAgICAgICAgdmFyIGluaXRpYWxTdGF0ZSA9IFswLCBbc3RhcnRdLCBzdGFydF07XG4gICAgICAgIHZhciBxdWV1ZSA9IG5ldyBUaW55UXVldWUoW2luaXRpYWxTdGF0ZV0sIGZ1bmN0aW9uKGEsIGIpIHsgcmV0dXJuIGFbMF0gLSBiWzBdOyB9KTtcbiAgICAgICAgdmFyIGV4cGxvcmVkID0ge307XG4gICAgXG4gICAgICAgIHdoaWxlIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHZhciBzdGF0ZSA9IHF1ZXVlLnBvcCgpO1xuICAgICAgICAgICAgdmFyIGNvc3QgPSBzdGF0ZVswXTtcbiAgICAgICAgICAgIHZhciBub2RlID0gc3RhdGVbMl07XG4gICAgICAgICAgICBpZiAobm9kZSA9PT0gZW5kKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0YXRlLnNsaWNlKDAsIDIpO1xuICAgICAgICAgICAgfVxuICAgIFxuICAgICAgICAgICAgdmFyIG5laWdoYm91cnMgPSBncmFwaFtub2RlXTtcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKG5laWdoYm91cnMpLmZvckVhY2goZnVuY3Rpb24obikge1xuICAgICAgICAgICAgICAgIHZhciBuZXdDb3N0ID0gY29zdCArIG5laWdoYm91cnNbbl07XG4gICAgICAgICAgICAgICAgaWYgKCEobiBpbiBjb3N0cykgfHwgbmV3Q29zdCA8IGNvc3RzW25dKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvc3RzW25dID0gbmV3Q29zdDtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5ld1N0YXRlID0gW25ld0Nvc3QsIHN0YXRlWzFdLmNvbmNhdChbbl0pLCBuXTtcbiAgICAgICAgICAgICAgICAgICAgcXVldWUucHVzaChuZXdTdGF0ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICBcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfTtcbiAgICBcbiAgICBmdW5jdGlvbiBwcmVwcm9jZXNzKGdyYXBoLCBvcHRpb25zKSB7XG4gICAgICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gICAgICAgIHZhciB0b3BvO1xuXG4gICAgICAgIHZhciB3ZWlnaHRGbiA9IG9wdGlvbnMud2VpZ2h0Rm4gfHwgZnVuY3Rpb24gZGVmYXVsdFdlaWdodEZuKGEsIGIpIHtcbiAgICAgICAgICAgIHJldHVybiB0dXJmLmRpc3RhbmNlKHR1cmYucG9pbnQoYSksIHR1cmYucG9pbnQoYikpO1xuICAgICAgICB9XG4gICAgXG4gICAgICAgIGlmIChncmFwaC50eXBlID09PSAnRmVhdHVyZUNvbGxlY3Rpb24nKSB7XG4gICAgICAgICAgICAvLyBHcmFwaCBpcyBHZW9KU09OIGRhdGEsIGNyZWF0ZSBhIHRvcG9sb2d5IGZyb20gaXRcbiAgICAgICAgICAgIHRvcG8gPSB0b3BvbG9neShncmFwaCwgb3B0aW9ucyk7XG4gICAgICAgIH0gZWxzZSBpZiAoZ3JhcGguZWRnZXMpIHtcbiAgICAgICAgICAgIC8vIEdyYXBoIGlzIGEgcHJlcHJvY2Vzc2VkIHRvcG9sb2d5XG4gICAgICAgICAgICB0b3BvID0gZ3JhcGg7XG4gICAgICAgIH1cbiAgICBcbiAgICAgICAgdmFyIGdyYXBoID0gdG9wby5lZGdlcy5yZWR1Y2UoZnVuY3Rpb24gYnVpbGRHcmFwaChnLCBlZGdlLCBpLCBlcykge1xuICAgICAgICAgICAgdmFyIGEgPSBlZGdlWzBdLFxuICAgICAgICAgICAgICAgIGIgPSBlZGdlWzFdLFxuICAgICAgICAgICAgICAgIHByb3BzID0gZWRnZVsyXSxcbiAgICAgICAgICAgICAgICB3ID0gd2VpZ2h0Rm4odG9wby52ZXJ0aWNlc1thXSwgdG9wby52ZXJ0aWNlc1tiXSwgcHJvcHMpLFxuICAgICAgICAgICAgICAgIG1ha2VFZGdlTGlzdCA9IGZ1bmN0aW9uIG1ha2VFZGdlTGlzdChub2RlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghZy52ZXJ0aWNlc1tub2RlXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZy52ZXJ0aWNlc1tub2RlXSA9IHt9O1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMuZWRnZURhdGFSZWR1Y2VGbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGcuZWRnZURhdGFbbm9kZV0gPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgY29uY2F0RWRnZSA9IGZ1bmN0aW9uIGNvbmNhdEVkZ2Uoc3RhcnROb2RlLCBlbmROb2RlLCB3ZWlnaHQpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHYgPSBnLnZlcnRpY2VzW3N0YXJ0Tm9kZV07XG4gICAgICAgICAgICAgICAgICAgIHZbZW5kTm9kZV0gPSB3ZWlnaHQ7XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLmVkZ2VEYXRhUmVkdWNlRm4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGcuZWRnZURhdGFbc3RhcnROb2RlXVtlbmROb2RlXSA9IG9wdGlvbnMuZWRnZURhdGFSZWR1Y2VGbihvcHRpb25zLmVkZ2VEYXRhU2VlZCwgcHJvcHMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfTtcbiAgICBcbiAgICAgICAgICAgIGlmICh3KSB7XG4gICAgICAgICAgICAgICAgbWFrZUVkZ2VMaXN0KGEpO1xuICAgICAgICAgICAgICAgIG1ha2VFZGdlTGlzdChiKTtcbiAgICAgICAgICAgICAgICBpZiAodyBpbnN0YW5jZW9mIE9iamVjdCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAody5mb3J3YXJkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25jYXRFZGdlKGEsIGIsIHcuZm9yd2FyZCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHcuYmFja3dhcmQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbmNhdEVkZ2UoYiwgYSwgdy5iYWNrd2FyZCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjb25jYXRFZGdlKGEsIGIsIHcpO1xuICAgICAgICAgICAgICAgICAgICBjb25jYXRFZGdlKGIsIGEsIHcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICBcbiAgICAgICAgICAgIGlmIChpICUgMTAwMCA9PT0gMCAmJiBvcHRpb25zLnByb2dyZXNzKSB7XG4gICAgICAgICAgICAgICAgb3B0aW9ucy5wcm9ncmVzcygnZWRnZXdlaWdodHMnLCBpLGVzLmxlbmd0aCk7XG4gICAgICAgICAgICB9XG4gICAgXG4gICAgICAgICAgICByZXR1cm4gZztcbiAgICAgICAgfSwge2VkZ2VEYXRhOiB7fSwgdmVydGljZXM6IHt9fSk7XG4gICAgXG4gICAgICAgIHZhciBjb21wYWN0ID0gY29tcGFjdEdyYXBoKGdyYXBoLnZlcnRpY2VzLCB0b3BvLnZlcnRpY2VzLCBncmFwaC5lZGdlRGF0YSwgb3B0aW9ucyk7XG4gICAgXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB2ZXJ0aWNlczogZ3JhcGgudmVydGljZXMsXG4gICAgICAgICAgICBlZGdlRGF0YTogZ3JhcGguZWRnZURhdGEsXG4gICAgICAgICAgICBzb3VyY2VWZXJ0aWNlczogdG9wby52ZXJ0aWNlcyxcbiAgICAgICAgICAgIGNvbXBhY3RlZFZlcnRpY2VzOiBjb21wYWN0LmdyYXBoLFxuICAgICAgICAgICAgY29tcGFjdGVkQ29vcmRpbmF0ZXM6IGNvbXBhY3QuY29vcmRpbmF0ZXMsXG4gICAgICAgICAgICBjb21wYWN0ZWRFZGdlczogb3B0aW9ucy5lZGdlRGF0YVJlZHVjZUZuID8gY29tcGFjdC5yZWR1Y2VkRWRnZXMgOiBudWxsXG4gICAgICAgIH07XG4gICAgfTtcbiAgICBcbiAgICBmdW5jdGlvbiByb3VuZENvb3JkKGMsIHByZWNpc2lvbikge1xuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgTWF0aC5yb3VuZChjWzBdIC8gcHJlY2lzaW9uKSAqIHByZWNpc2lvbixcbiAgICAgICAgICAgIE1hdGgucm91bmQoY1sxXSAvIHByZWNpc2lvbikgKiBwcmVjaXNpb24sXG4gICAgICAgIF07XG4gICAgfTtcbiAgICBcbiAgICBmdW5jdGlvbiBnZW9Kc29uUmVkdWNlKGdlb2pzb24sIGZuLCBzZWVkKSB7XG4gICAgICAgIGlmIChnZW9qc29uLnR5cGUgPT09ICdGZWF0dXJlQ29sbGVjdGlvbicpIHtcbiAgICAgICAgICAgIHJldHVybiBnZW9qc29uLmZlYXR1cmVzLnJlZHVjZShmdW5jdGlvbiByZWR1Y2VGZWF0dXJlcyhhLCBmKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGdlb0pzb25SZWR1Y2UoZiwgZm4sIGEpO1xuICAgICAgICAgICAgfSwgc2VlZCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZm4oc2VlZCwgZ2VvanNvbik7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFxuICAgIGZ1bmN0aW9uIGdlb0pzb25GaWx0ZXJGZWF0dXJlcyhnZW9qc29uLCBmbikge1xuICAgICAgICB2YXIgZmVhdHVyZXMgPSBbXTtcbiAgICAgICAgaWYgKGdlb2pzb24udHlwZSA9PT0gJ0ZlYXR1cmVDb2xsZWN0aW9uJykge1xuICAgICAgICAgICAgZmVhdHVyZXMgPSBmZWF0dXJlcy5jb25jYXQoZ2VvanNvbi5mZWF0dXJlcy5maWx0ZXIoZm4pKTtcbiAgICAgICAgfVxuICAgIFxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdHlwZTogJ0ZlYXR1cmVDb2xsZWN0aW9uJyxcbiAgICAgICAgICAgIGZlYXR1cmVzOiBmZWF0dXJlc1xuICAgICAgICB9O1xuICAgIH07XG4gICAgXG4gICAgZnVuY3Rpb24gaXNMaW5lU3RyaW5nKGYpIHtcbiAgICAgICAgcmV0dXJuIGYuZ2VvbWV0cnkudHlwZSA9PT0gJ0xpbmVTdHJpbmcnO1xuICAgIH07XG4gICAgXG4gICAgZnVuY3Rpb24gdG9wb2xvZ3koZ2VvanNvbiwgb3B0aW9ucykge1xuICAgICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICAgICAgdmFyIGtleUZuID0gb3B0aW9ucy5rZXlGbiB8fCBmdW5jdGlvbiBkZWZhdWx0S2V5Rm4oYykge1xuICAgICAgICAgICAgICAgIHJldHVybiBjLmpvaW4oJywnKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBwcmVjaXNpb24gPSBvcHRpb25zLnByZWNpc2lvbiB8fCAxZS01O1xuICAgIFxuICAgICAgICB2YXIgbGluZVN0cmluZ3MgPSBnZW9Kc29uRmlsdGVyRmVhdHVyZXMoZ2VvanNvbiwgaXNMaW5lU3RyaW5nKTtcbiAgICAgICAgdmFyIGV4cGxvZGVkTGluZVN0cmluZ3MgPSB0dXJmLmV4cGxvZGUobGluZVN0cmluZ3MpO1xuICAgICAgICB2YXIgdmVydGljZXMgPSBleHBsb2RlZExpbmVTdHJpbmdzLmZlYXR1cmVzLnJlZHVjZShmdW5jdGlvbiBidWlsZFRvcG9sb2d5VmVydGljZXMoY3MsIGYsIGksIGZzKSB7XG4gICAgICAgICAgICAgICAgdmFyIHJjID0gcm91bmRDb29yZChmLmdlb21ldHJ5LmNvb3JkaW5hdGVzLCBwcmVjaXNpb24pO1xuICAgICAgICAgICAgICAgIGNzW2tleUZuKHJjKV0gPSBmLmdlb21ldHJ5LmNvb3JkaW5hdGVzO1xuICAgIFxuICAgICAgICAgICAgICAgIGlmIChpICUgMTAwMCA9PT0gMCAmJiBvcHRpb25zLnByb2dyZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnMucHJvZ3Jlc3MoJ3RvcG86dmVydGljZXMnLCBpLCBmcy5sZW5ndGgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICBcbiAgICAgICAgICAgICAgICByZXR1cm4gY3M7XG4gICAgICAgICAgICB9LCB7fSksXG4gICAgICAgICAgICBlZGdlcyA9IGdlb0pzb25SZWR1Y2UobGluZVN0cmluZ3MsIGZ1bmN0aW9uIGJ1aWxkVG9wb2xvZ3lFZGdlcyhlcywgZiwgaSwgZnMpIHtcbiAgICAgICAgICAgICAgICBmLmdlb21ldHJ5LmNvb3JkaW5hdGVzLmZvckVhY2goZnVuY3Rpb24gYnVpbGRMaW5lU3RyaW5nRWRnZXMoYywgaSwgY3MpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGkgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgazEgPSBrZXlGbihyb3VuZENvb3JkKGNzW2kgLSAxXSwgcHJlY2lzaW9uKSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgazIgPSBrZXlGbihyb3VuZENvb3JkKGMsIHByZWNpc2lvbikpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZXMucHVzaChbazEsIGsyLCBmLnByb3BlcnRpZXNdKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgIFxuICAgICAgICAgICAgICAgIGlmIChpICUgMTAwMCA9PT0gMCAmJiBvcHRpb25zLnByb2dyZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnMucHJvZ3Jlc3MoJ3RvcG86ZWRnZXMnLCBpLCBmcy5sZW5ndGgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICBcbiAgICAgICAgICAgICAgICByZXR1cm4gZXM7XG4gICAgICAgICAgICB9LCBbXSk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB2ZXJ0aWNlczogdmVydGljZXMsXG4gICAgICAgICAgICBlZGdlczogZWRnZXNcbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gdmFsaWRhdGVQYXRoKGZyb21Qb2ludCwgdG9Qb2ludCwgcGF0aCkge1xuICAgICAgICBpZiAodG9Qb2ludCAmJiB0b1BvaW50LnR5cGUgPT09ICdsaW5lcG9pbnQnKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIC8vaWYgKHByZWNpc2lvbiA+IDAuMDAwNSkgcmV0dXJuIGZhbHNlO1xuICAgICAgICBpZiAoIXBhdGggfHwgIXBhdGgucGF0aCB8fCAhcGF0aC5wYXRoLmxlbmd0aCB8fCBwYXRoLnBhdGgubGVuZ3RoIDwgMikgcmV0dXJuIGZhbHNlO1xuICAgICAgICByZXR1cm4gcGF0aDtcblxuICAgICAgICBwcmVjaXNpb24gPSBOdW1iZXIoKE51bWJlcihwcmVjaXNpb24pICsgMC4wMDAwMDIpLnRvRml4ZWQoNykpO1xuICAgICAgICB2YXIgcGF0aGZpbmRlciA9IG5ldyBQYXRoRmluZGVyKGZlYXR1cmVzLCB7IHByZWNpc2lvbjogcHJlY2lzaW9uIH0pO1xuICAgICAgICB2YXIgbmV3UGF0aCA9IHBhdGhmaW5kZXIuZmluZFBhdGgoZnJvbVBvaW50LCB0b1BvaW50KTtcbiAgICAgICAgcmV0dXJuIHZhbGlkYXRlUGF0aChmcm9tUG9pbnQsIHRvUG9pbnQsIGZlYXR1cmVzLCBuZXdQYXRoKTtcbiAgICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgUm91dGluZzsiXSwibmFtZXMiOlsiX3JlZ2VuZXJhdG9yUnVudGltZSIsImUiLCJ0IiwiciIsIk9iamVjdCIsInByb3RvdHlwZSIsIm4iLCJoYXNPd25Qcm9wZXJ0eSIsIm8iLCJkZWZpbmVQcm9wZXJ0eSIsInZhbHVlIiwiaSIsIlN5bWJvbCIsImEiLCJpdGVyYXRvciIsImMiLCJhc3luY0l0ZXJhdG9yIiwidSIsInRvU3RyaW5nVGFnIiwiZGVmaW5lIiwiZW51bWVyYWJsZSIsImNvbmZpZ3VyYWJsZSIsIndyaXRhYmxlIiwid3JhcCIsIkdlbmVyYXRvciIsImNyZWF0ZSIsIkNvbnRleHQiLCJtYWtlSW52b2tlTWV0aG9kIiwidHJ5Q2F0Y2giLCJ0eXBlIiwiYXJnIiwiY2FsbCIsImgiLCJsIiwiZiIsInMiLCJ5IiwiR2VuZXJhdG9yRnVuY3Rpb24iLCJHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSIsInAiLCJkIiwiZ2V0UHJvdG90eXBlT2YiLCJ2IiwidmFsdWVzIiwiZyIsImRlZmluZUl0ZXJhdG9yTWV0aG9kcyIsImZvckVhY2giLCJfaW52b2tlIiwiQXN5bmNJdGVyYXRvciIsImludm9rZSIsIl90eXBlb2YiLCJyZXNvbHZlIiwiX19hd2FpdCIsInRoZW4iLCJjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZyIsIkVycm9yIiwiZG9uZSIsIm1ldGhvZCIsImRlbGVnYXRlIiwibWF5YmVJbnZva2VEZWxlZ2F0ZSIsInNlbnQiLCJfc2VudCIsImRpc3BhdGNoRXhjZXB0aW9uIiwiYWJydXB0IiwiVHlwZUVycm9yIiwicmVzdWx0TmFtZSIsIm5leHQiLCJuZXh0TG9jIiwicHVzaFRyeUVudHJ5IiwidHJ5TG9jIiwiY2F0Y2hMb2MiLCJmaW5hbGx5TG9jIiwiYWZ0ZXJMb2MiLCJ0cnlFbnRyaWVzIiwicHVzaCIsInJlc2V0VHJ5RW50cnkiLCJjb21wbGV0aW9uIiwicmVzZXQiLCJpc05hTiIsImxlbmd0aCIsImRpc3BsYXlOYW1lIiwiaXNHZW5lcmF0b3JGdW5jdGlvbiIsImNvbnN0cnVjdG9yIiwibmFtZSIsIm1hcmsiLCJzZXRQcm90b3R5cGVPZiIsIl9fcHJvdG9fXyIsImF3cmFwIiwiYXN5bmMiLCJQcm9taXNlIiwia2V5cyIsInJldmVyc2UiLCJwb3AiLCJwcmV2IiwiY2hhckF0Iiwic2xpY2UiLCJzdG9wIiwicnZhbCIsImhhbmRsZSIsImNvbXBsZXRlIiwiZmluaXNoIiwiX2NhdGNoIiwiZGVsZWdhdGVZaWVsZCIsImFzeW5jR2VuZXJhdG9yU3RlcCIsIl9hc3luY1RvR2VuZXJhdG9yIiwiYXJndW1lbnRzIiwiYXBwbHkiLCJfbmV4dCIsIl90aHJvdyIsIlJvdXRpbmciLCJtb2RlIiwiZ2VvZmxvIiwiZ3JhcGhEYXRhIiwiZmVhdHVyZXMiLCJGZWF0dXJlcyIsImdldENvbGRGZWF0dXJlcyIsImFjdGl2YXRlIiwiZW5hYmxlZCIsIm9wdGlvbnMiLCJlbmFibGUiLCJkZWFjdGl2YXRlIiwibWFwIiwiZ2V0U291cmNlIiwic3RhdGljcyIsImNvbnN0YW50cyIsInNvdXJjZXMiLCJzZXREYXRhIiwidHVyZiIsImZlYXR1cmVDb2xsZWN0aW9uIiwiZ2V0Um91dGUiLCJmcm9tUG9pbnQiLCJ0b1BvaW50IiwibWFwTW92aW5nIiwiZ2V0RmVhdHVyZXMiLCJwYXRoZmluZGVyIiwiUGF0aEZpbmRlciIsInJvdXRpbmciLCJwYXRoIiwiZmluZFBhdGgiLCJ2YWxpZGF0ZVBhdGgiLCJmaXJlIiwiZnJvbSIsInRvIiwiZ2V0TWF0Y2giLCJfcmVmIiwiX2NhbGxlZSIsImNvb3JkcyIsImZlYXR1cmUiLCJfY2FsbGVlJCIsIl9jb250ZXh0IiwiRXhwbG9yaW5nIiwic2V0Iiwic3RhcnQiLCJzdGFydFBvaW50IiwicHJvcGVydGllcyIsIl94IiwiZ2V0Q2xvc2VzdCIsImNsb3Nlc3RQb2ludCIsImxhc3RDbGljayIsInJvdXRlIiwibGluZVN0cmluZyIsIm1lc2giLCJtZXNoSW5kZXgiLCJmbGF0IiwiZmlsdGVyIiwiZ2VvbWV0cnkiLCJjb21wYWN0ZWRWZXJ0aWNlcyIsInByZXByb2Nlc3MiLCJfZ3JhcGgiLCJfa2V5Rm4iLCJrZXlGbiIsImpvaW4iLCJfcHJlY2lzaW9uIiwicHJlY2lzaW9uIiwiX29wdGlvbnMiLCJrIiwiYiIsInJvdW5kQ29vcmQiLCJ2ZXJ0aWNlcyIsInBoYW50b21TdGFydCIsIl9jcmVhdGVQaGFudG9tIiwicGhhbnRvbUVuZCIsIndlaWdodCIsImZ1bGxQYXRoIiwicmVkdWNlIiwiYnVpbGRQYXRoIiwiY3MiLCJ2cyIsImNvbmNhdCIsImNvbXBhY3RlZENvb3JkaW5hdGVzIiwiYmluZCIsInNvdXJjZVZlcnRpY2VzIiwiZWRnZURhdGFzIiwiY29tcGFjdGVkRWRnZXMiLCJidWlsZEVkZ2VEYXRhIiwiZWRzIiwicmVkdWNlZEVkZ2UiLCJ1bmRlZmluZWQiLCJfcmVtb3ZlUGhhbnRvbSIsInNlcmlhbGl6ZSIsInBoYW50b20iLCJjb21wYWN0Tm9kZSIsImVkZ2VEYXRhIiwiZWRnZXMiLCJjb29yZGluYXRlcyIsInJlZHVjZWRFZGdlcyIsImluY29taW5nRWRnZXMiLCJuZWlnaGJvciIsImluY29taW5nQ29vcmRpbmF0ZXMiLCJTaG9ydGVzdFBhdGgiLCJJTkZJTklUWSIsImFkZFZlcnRleCIsInNldFZlcnRpY2VzIiwiZ3JhcGgiLCJzaG9ydGVzdFBhdGgiLCJub2RlcyIsIlByaW9yaXR5UXVldWUiLCJkaXN0YW5jZXMiLCJwcmV2aW91cyIsInNtYWxsZXN0IiwidmVydGV4IiwiYWx0IiwiZW5xdWV1ZSIsImlzRW1wdHkiLCJkZXF1ZXVlIiwiX25vZGVzIiwicHJpb3JpdHkiLCJrZXkiLCJzb3J0Iiwic2hpZnQiLCJUaW55UXVldWUiLCJkYXRhIiwiY29tcGFyZSIsIl9kb3duIiwiaXRlbSIsIl91cCIsInRvcCIsImJvdHRvbSIsInBlZWsiLCJwb3MiLCJyZWYiLCJwYXJlbnQiLCJjdXJyZW50IiwiaGFsZkxlbmd0aCIsImxlZnQiLCJiZXN0IiwicmlnaHQiLCJmaW5kTmV4dEVuZCIsImVuZHMiLCJ2ZXJ0ZXhDb29yZHMiLCJ0cmFja0luY29taW5nIiwicmV2ZXJzZVdlaWdodCIsImVkZ2VEYXRhU2VlZCIsImVkZ2VEYXRhUmVkdWNlRm4iLCJub3RQcmV2aW91cyIsImluZGV4T2YiLCJuZWlnaGJvcnMiLCJjb21wYWN0RWRnZSIsInJlc3VsdCIsImoiLCJjb21wYWN0R3JhcGgiLCJwcm9ncmVzcyIsImZpbmRFbmRzIiwiZXMiLCJudW1iZXJFZGdlcyIsInJlbW92ZSIsImNvbXBhY3QiLCJvdGhlciIsImNvbXBhY3RFbmQiLCJjb21wYWN0ZWQiLCJlbmQiLCJjb3N0cyIsImluaXRpYWxTdGF0ZSIsInF1ZXVlIiwiZXhwbG9yZWQiLCJzdGF0ZSIsImNvc3QiLCJub2RlIiwibmVpZ2hib3VycyIsIm5ld0Nvc3QiLCJuZXdTdGF0ZSIsInRvcG8iLCJ3ZWlnaHRGbiIsImRlZmF1bHRXZWlnaHRGbiIsImRpc3RhbmNlIiwicG9pbnQiLCJ0b3BvbG9neSIsImJ1aWxkR3JhcGgiLCJlZGdlIiwicHJvcHMiLCJ3IiwibWFrZUVkZ2VMaXN0IiwiY29uY2F0RWRnZSIsInN0YXJ0Tm9kZSIsImVuZE5vZGUiLCJmb3J3YXJkIiwiYmFja3dhcmQiLCJNYXRoIiwicm91bmQiLCJnZW9Kc29uUmVkdWNlIiwiZ2VvanNvbiIsImZuIiwic2VlZCIsInJlZHVjZUZlYXR1cmVzIiwiZ2VvSnNvbkZpbHRlckZlYXR1cmVzIiwiaXNMaW5lU3RyaW5nIiwiZGVmYXVsdEtleUZuIiwibGluZVN0cmluZ3MiLCJleHBsb2RlZExpbmVTdHJpbmdzIiwiZXhwbG9kZSIsImJ1aWxkVG9wb2xvZ3lWZXJ0aWNlcyIsImZzIiwicmMiLCJidWlsZFRvcG9sb2d5RWRnZXMiLCJidWlsZExpbmVTdHJpbmdFZGdlcyIsImsxIiwiazIiLCJOdW1iZXIiLCJ0b0ZpeGVkIiwibmV3UGF0aCJdLCJzb3VyY2VSb290IjoiIn0=