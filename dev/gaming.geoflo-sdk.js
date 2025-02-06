/*!
 * /*!
 *  * GeoFlo SDK
 *  * Version 1.0.11
 *  * Generated on: 2025-02-06T00:14:21.880Z
 *  * /
 */
"use strict";
(self["webpackChunk_solutegrate_geoflo_sdk"] = self["webpackChunk_solutegrate_geoflo_sdk"] || []).push([["gaming"],{

/***/ "./src/Gaming.js":
/*!***********************!*\
  !*** ./src/Gaming.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
/**
 * @mixin
 * @memberof module:geoflo
 * @name Gaming
 * @description This module provides the gamepad functionality for the Geoflo application. It allows users to interact with the map using a gamepad controller.
 * @param {Object} gamepad - The gamepad object to be initialized.
 * @param {Object} options - The options for gamepad initialization. Comes from geoFlo.options.gamepad.
 * @returns {Object} The current object instance.
 */
var Gaming = function Gaming(gamepad) {
  var geoflo = this.geoflo;
  if (!supported()) throw new Error('Gamepads are not supported on your browser!');
  var control = this;
  this.options = geoflo.options.gamepad;
  var layout = {
    "select": 'Select',
    "start": 'Start',
    "power": 'Power',
    "button0": 'B',
    "button1": 'A',
    "button2": 'Y',
    "button3": 'X',
    "button4": 'BumpLeft',
    "button5": 'BumpRight',
    "button6": 'TrigLeft',
    "button7": 'TrigRight',
    "button8": 'Select',
    "button9": 'Start',
    "button10": 'JoyLeftClick',
    "button11": 'JoyRightClick',
    "button12": 'DpadUp',
    "button13": 'DpadDown',
    "button14": 'DpadLeft',
    "button15": 'DpadRight',
    "button16": 'Power',
    "button17": 'Misc',
    "up0": 'JoyLeftUp',
    "down0": 'JoyLeftDown',
    "right0": 'JoyLeftRight',
    "left0": 'JoyLeftLeft',
    "up1": 'JoyRightUp',
    "down1": 'JoyRightDown',
    "right1": 'JoyRightRight',
    "left1": 'JoyRightLeft',
    "l1": 'BumpLeft',
    "r1": 'BumpRight',
    "l2": 'TrigLeft',
    "r2": 'TrigRight'
  };
  function clamp(x, y) {
    var m = Math.sqrt(x * x + y * y); // Magnitude (length) of vector

    // If the length greater than 1, normalize it (set it to 1)
    if (m > 1) {
      x /= m;
      y /= m;
    }
    return [x, y];
  }
  function deadzone(x, y) {
    var deadzone = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0.2;
    var m = Math.sqrt(x * x + y * y);
    if (m < deadzone) return [0, 0];
    var over = m - deadzone; // 0 -> 1 - DEADZONE
    var nover = over / (1 - deadzone); // 0 -> 1

    var nx = x / m;
    var ny = y / m;
    return [nx * nover, ny * nover];
  }
  function request() {
    control.refresh();
    requestAnimationFrame(request);
  }
  function supported() {
    return window.navigator.getGamepads && typeof window.navigator.getGamepads === 'function' || window.navigator.getGamepads && typeof window.navigator.webkitGetGamepads === 'function' || false;
  }
  function qs(s, p) {
    if (p) {
      return p.querySelector(s);
    }
    return document.querySelector(s);
  }
  function on(eventName, callback) {
    return control.associateEvent(eventName, callback, 'action');
  }
  function after(eventName, callback) {
    return control.associateEvent(eventName, callback, 'after');
  }
  function before(eventName, callback) {
    return control.associateEvent(eventName, callback, 'before');
  }
  function addEventListeners(_this, gamepad) {
    if (!gamepad || !layout) return false;
    Object.entries(layout).forEach(function (entry) {
      var key = entry[0];
      var val = entry[1];
      before(key, function (value) {
        return _this.onEvent('press', key, val, value);
      });
      on(key, function (value) {
        return _this.onEvent('hold', key, val, value);
      });
      after(key, function (value) {
        return _this.onEvent('release', key, val, value);
      });
    });
  }
  function deepAssign(target, source) {
    var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      _ref$isMutatingOk = _ref.isMutatingOk,
      isMutatingOk = _ref$isMutatingOk === void 0 ? false : _ref$isMutatingOk,
      _ref$isStrictlySafe = _ref.isStrictlySafe,
      isStrictlySafe = _ref$isStrictlySafe === void 0 ? false : _ref$isStrictlySafe;
    target = isMutatingOk ? target : clone(target, isStrictlySafe);
    for (var _i = 0, _Object$entries = Object.entries(source); _i < _Object$entries.length; _i++) {
      var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
        key = _Object$entries$_i[0],
        val = _Object$entries$_i[1];
      if (val !== null && _typeof(val) === "object") {
        if (target[key] === undefined) {
          target[key] = {};
        }
        target[key] = deepAssign(target[key], val, {
          isMutatingOk: true,
          isStrictlySafe: isStrictlySafe
        });
      } else {
        target[key] = val;
      }
    }
    function clone(obj) {
      var isStrictlySafe = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      try {
        return JSON.parse(JSON.stringify(obj));
      } catch (err) {
        if (isStrictlySafe) {
          throw new Error();
        }
        console.warn("Unsafe clone of object", obj);
        return _objectSpread({}, obj);
      }
    }
    return target;
  }
  function calculateIntermediatePoint(point1, point2, perc) {
    var lat1 = degreesToRadians(point1[1]);
    var lng1 = degreesToRadians(point1[0]);
    var lat2 = degreesToRadians(point2[1]);
    var lng2 = degreesToRadians(point2[0]);
    var deltaLat = lat2 - lat1;
    var deltaLng = lng2 - lng1;
    var calcA = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) + Math.cos(lat1) * Math.cos(lat2) * Math.sin(deltaLng / 2) * Math.sin(deltaLng / 2);
    var calcB = 2 * Math.atan2(Math.sqrt(calcA), Math.sqrt(1 - calcA));
    var A = Math.sin((1 - perc) * calcB) / Math.sin(calcB);
    var B = Math.sin(perc * calcB) / Math.sin(calcB);
    var x = A * Math.cos(lat1) * Math.cos(lng1) + B * Math.cos(lat2) * Math.cos(lng2);
    var y = A * Math.cos(lat1) * Math.sin(lng1) + B * Math.cos(lat2) * Math.sin(lng2);
    var z = A * Math.sin(lat1) + B * Math.sin(lat2);
    var lat3 = Math.atan2(z, Math.sqrt(x * x + y * y));
    var lng3 = Math.atan2(y, x);
    return [radiansToDegrees(lng3), radiansToDegrees(lat3)];
  }
  function pointAtPercent(p0, p1, percent) {
    var x;
    if (p0.x !== p1.x) x = p0.x + percent * (p1.x - p0.x);else x = p0.x;
    var y;
    if (p0.y !== p1.y) y = p0.y + percent * (p1.y - p0.y);else y = p0.y;
    var p = {
      x: x,
      y: y
    };
    return p;
  }
  function degreesToRadians(degrees) {
    return degrees * (Math.PI / 180);
  }
  function radiansToDegrees(radians) {
    return radians * (180 / Math.PI);
  }

  /**
   * @function
      * @memberof module:geoflo.Gaming
   * @name init
   * @description This function initializes the gamepad with the specified options. It fires an event to notify the gamepad initialization, sets the gamepad, adds event listeners, and requests animation frame.
   * @param {Object} gamepad - The gamepad object to be initialized.
   * @param {Object} options - The options for gamepad initialization.
   * @returns {Object} The current object instance.
   */
  this.init = function (gamepad, options) {
    if (!gamepad) return false;
    if (!this.options.enable) return console.error('Gamepad option is not enabled!');
    geoflo.map.fire(geoflo.id + ':gamepad.init', {
      detail: {
        gamepad: gamepad
      }
    });
    this.setGamepad(gamepad);
    addEventListeners(this, this.gamepad);
    requestAnimationFrame(request);
    return this;
  };

  /**
   * @function
      * @memberof module:geoflo.Gaming
   * @name refresh
   * @description Refreshes the gamepad state by checking button presses, axes values, and triggers.
   * @params {void}
   * @returns {void}
   */
  this.refresh = function () {
    var gamepads = window.navigator.getGamepads();
    for (var i = 0; i < gamepads.length; i++) {
      var gamepad = gamepads[this.gamepad.id];
      var j;
      if (!gamepad || !gamepad.connected) {
        continue;
      }
      for (j = 0; j < gamepad.buttons.length; j++) {
        var button = gamepad.buttons[j];
        var value = button.value;
        var name = this.gamepad.layout["button".concat(j)];
        if (button.pressed) {
          if (!this.gamepad.pressed[name]) {
            this.gamepad.pressed[name] = true;
            this.gamepad.buttonActions[j].before ? this.gamepad.buttonActions[j].before(value) : false;
          }
          this.gamepad.buttonActions[j].action ? this.gamepad.buttonActions[j].action(value) : false;
        } else if (this.gamepad.pressed[name]) {
          delete this.gamepad.pressed[name];
          this.gamepad.buttonActions[j].after ? this.gamepad.buttonActions[j].after(value) : false;
        }
      }
      var axesBoxCount = (gamepad.axes.length + 1) / 2 | 0;
      for (j = 0; j < axesBoxCount; j++) {
        var valueX, valueY, value;
        var last_odd_axis = j == axesBoxCount - 1 && gamepad.axes.length % 2 == 1;
        valueX = gamepad.axes[j * 2];
        valueY = last_odd_axis ? 0 : gamepad.axes[j * 2 + 1];
        var _deadzone = deadzone(valueX, valueY);
        var _deadzone2 = _slicedToArray(_deadzone, 2);
        valueX = _deadzone2[0];
        valueY = _deadzone2[1];
        var _clamp = clamp(valueX, valueY);
        var _clamp2 = _slicedToArray(_clamp, 2);
        valueX = _clamp2[0];
        valueY = _clamp2[1];
        value = [Number(valueX.toFixed(2)), Number(valueY.toFixed(2))];
        var val = gamepad.axes[j + axesBoxCount].toFixed(4);
        var axe = Math.floor(j / 2);
        this.gamepad.axeValues[axe][j % 2] = val;
        var rightTrigger = value[0] >= this.options.joystick.min;
        var leftTrigger = value[0] <= -this.options.joystick.min;
        var upTrigger = value[1] <= -this.options.joystick.min;
        var downTrigger = value[1] >= this.options.joystick.min;
        this.trigger('right', rightTrigger, j, value);
        this.trigger('left', leftTrigger, j, value);
        this.trigger('down', downTrigger, j, value);
        this.trigger('up', upTrigger, j, value);
      }
    }
  };

  /**
   * @function
      * @memberof module:geoflo.Gaming
   * @name trigger
   * @description This function handles triggering actions based on gamepad input. It checks if a specific button or axis is triggered and performs corresponding actions.
   * @param {string} id - The identifier of the gamepad input.
   * @param {boolean} triggered - Indicates if the input is triggered.
   * @param {number} index - The index of the input.
   * @param {number[]} value - The value of the input.
   */
  this.trigger = function (id, triggered, index, value) {
    var actions = this.gamepad.axesActions;
    var name = this.gamepad.layout["".concat(id).concat(index)];
    var pressed = this.gamepad.pressed;
    if (triggered) {
      if (!pressed[name]) {
        pressed[name] = true;
        actions[index][id].before ? actions[index][id].before(value) : false;
      }
      value = [this.options.joystick.max * value[0], this.options.joystick.max * value[1]];
      actions[index][id].action ? actions[index][id].action(value) : false;
    } else if (pressed[name]) {
      delete pressed[name];
      if (!pressed['JoyLeftUp'] && !pressed['JoyLeftDown'] && !pressed['JoyLeftLeft'] && !pressed['JoyLeftRight']) {
        actions[0][id].after ? actions[0][id].after(value) : false;
      }
      if (!pressed['JoyRightUp'] && !pressed['JoyRightDown'] && !pressed['JoyRightLeft'] && !pressed['JoyRightRight']) {
        actions[1][id].after ? actions[1][id].after(value) : false;
      }
    }
  };

  /**
  * @function
   * @memberof module:geoflo.Gaming
  * @name remove
  * @description Disconnects and removes the gamepad object.
  * @param {Object} gamepad - The gamepad object to be disconnected and removed.
  * @returns {void}
  */
  this.remove = function () {
    this.gamepad.disconnect ? this.gamepad.disconnect() : false;
    this.gamepad.remove ? this.gamepad.remove() : false;
    this.gamepad = null;
  };

  /**
   * @function
      * @memberof module:geoflo.Gaming
   * @name setMap
   * @description This function updates the map properties using the handleMove function and sets the center, zoom, pitch, and bearing accordingly.
   * @param {Function} handleMove - The function used to handle map movement.
   * @returns {Object} The updated map object with new properties.
   */
  this.setMap = function (handleMove) {
    var map = geoflo.map;
    var transform = map.transform;
    this.map = this.map || {
      center: map.getCenter(),
      zoom: map.getZoom(),
      pitch: map.getPitch(),
      bearing: map.getBearing()
    };
    var center = this.map.center.x ? this.map.center : this.map.center.lat ? this.map.center : new mapboxgl.LngLat(this.map.center[0], this.map.center[1]);
    center = center.x ? transform.pointLocation(center) : center;
    transform.center = center;
    transform.bearing = this.map.bearing;
    transform.zoom = this.map.zoom;
    transform.pitch = this.map.pitch;
    map._update();
    if (this.options.crosshairs && geoflo.centerMarker) this.setMarker();
    if (handleMove) geoflo.currentMode.handleMove({
      lngLat: !this.options.camera.free ? this.map.center : map.getCenter(),
      gamepad: this
    });
    return this.map;
  };

  /**
   * @function
      * @memberof module:geoflo.Gaming
   * @name setContainer
   * @description Creates a new HTML element with the specified tag name and class name, appends it to a container if provided, and sets it as the container property of the current object.
   * @param {string} tagName - The tag name of the HTML element to create.
   * @param {string} className - The class name to assign to the created element (optional).
   * @param {HTMLElement} container - The container element to append the created element to (optional).
   * @returns {HTMLElement} The created HTML element.
   */

  this.setContainer = function (tagName, className, container) {
    var el = window.document.createElement(tagName);
    if (className !== undefined) el.className = className;
    if (container) container.appendChild(el);
    this.container = el;
    return el;
  };

  /**
   * @function
      * @memberof module:geoflo.Gaming 
   * @name setLocation
   * @description This function updates the visibility, left, and top properties of the container element based on the provided value.
   * @param {Array<number>} value - An array containing the x and y coordinates for the new location.
   * @returns {DOMRect} The bounding rectangle of the container element after the location is set.
   */
  this.setLocation = function (value) {
    this.container.style.visibility = this.options.debug ? 'visible' : 'hidden';
    this.container.style.left = (value[0] + 1) / 2 * 100 + '%';
    this.container.style.top = (value[1] + 1) / 2 * 100 + '%';
    return this.container.getBoundingClientRect();
  };

  /**
   * @function
      * @memberof module:geoflo.Gaming
   * @name setMarker
   * @description Sets a marker on the map using the center coordinates provided by the context.
   * @return {Object} Returns the marker object created on the map.
   */
  this.setMarker = function () {
    return geoflo.setCenterMarker({
      gamepad: true
    });
  };

  /**
   * @function
      * @memberof module:geoflo.Gaming
   * @name setGamepad
   * @description Initializes a gamepad object with specific properties based on the provided gamepad input.
   * @param {Object} gamepad - The gamepad object to be processed.
   * @returns {Object} - The processed gamepad object with defined properties.
   */
  this.setGamepad = function (gamepad) {
    var options = {
      type: gamepad.id,
      connected: gamepad.connected,
      id: gamepad.index,
      buttons: gamepad.buttons.length,
      layout: layout,
      axes: Math.floor(gamepad.axes.length / 2),
      axeValues: [],
      hapticActuator: null,
      vibrationMode: -1,
      vibration: false,
      mapping: gamepad.mapping,
      buttonActions: {},
      axesActions: {},
      pressed: {}
    };
    for (var x = 0; x < options.buttons; x++) {
      options.buttonActions[x] = function () {
        return {
          action: function action() {},
          after: function after() {},
          before: function before() {}
        };
      };
    }
    for (var _x = 0; _x < options.axes; _x++) {
      options.axesActions[_x] = {
        down: function down() {
          return {
            action: function action() {},
            after: function after() {},
            before: function before() {}
          };
        },
        left: function left() {
          return {
            action: function action() {},
            after: function after() {},
            before: function before() {}
          };
        },
        right: function right() {
          return {
            action: function action() {},
            after: function after() {},
            before: function before() {}
          };
        },
        up: function up() {
          return {
            action: function action() {},
            after: function after() {},
            before: function before() {}
          };
        }
      };
      options.axeValues[_x] = [0, 0];
    }
    if (gamepad.hapticActuators) {
      if (typeof gamepad.hapticActuators.pulse === 'function') {
        options.haptic = gamepad.hapticActuators;
        options.vibrationMode = 0;
        options.vibration = true;
      } else if (gamepad.hapticActuators[0] && typeof gamepad.hapticActuators[0].pulse === 'function') {
        options.haptic = gamepad.hapticActuators[0];
        options.vibrationMode = 0;
        options.vibration = true;
      }
    }
    if (gamepad.vibrationActuator) {
      if (typeof gamepad.vibrationActuator.playEffect === 'function') {
        options.haptic = gamepad.vibrationActuator;
        options.vibrationMode = 1;
        options.vibration = true;
      }
    }
    this.gamepad = options;
    this.hasJoysticks = options.axes > 0 && Object.values(this.gamepad.layout).map(function (m) {
      return m.includes('Joy');
    }).filter(function (b) {
      return b;
    }).length > 0;
    return this.gamepad;
  };

  /**
   * @function
      * @memberof module:geoflo.Gaming
   * @name setCenter
   * @description This function calculates the new center of the map based on the input values and gamepad controls. It handles both joystick and D-pad inputs to adjust the map center accordingly.
   * @param {Object} value - The value used to calculate the new center of the map.
   * @param {boolean} free - A boolean flag indicating if the map center should be set freely.
   * @param {boolean} dpad - A boolean flag indicating if the D-pad controls are used for setting the map center.
   * @returns {boolean} Returns true after setting the map center.
   */

  this.setCenter = function (value, free, dpad) {
    var center = geoflo.map.getCenter();
    var pressed = this.gamepad.pressed;
    var type = this.hasJoysticks ? 'Joy' : 'Dpad';
    var diag = Object.keys(pressed).filter(function (p) {
      return p.includes(type);
    }).length > 1;
    var start = free || dpad ? center : false;
    start = geoflo.hotFeature && !start ? geoflo.lastMove || center : false;
    start = !start ? center : start;
    var end;
    if (dpad) {
      var bearing = this.map.bearing;
      bearing = pressed['Up'] ? bearing : pressed['Down'] ? bearing + 180 : pressed['Left'] ? bearing - 90 : pressed['Right'] ? bearing + 90 : bearing;
      var dest = turf.destination(turf.point(start), distance, bearing).geometry.coordinates;
      lngLats = free ? {
        lng: dest[1],
        lat: dest[0]
      } : dest;
    } else if (value) {
      var location = this.setLocation(value);
      var coords = location && location.x ? [location.x, location.y] : false;
      end = geoflo.map.unproject(coords);
      var percent = diag ? this.options.pan.speed / 2 : this.options.pan.speed;
      var mid = calculateIntermediatePoint([start.lng, start.lat], [end.lng, end.lat], percent);
      mid = geoflo.map.getPitch() > 60 ? calculateIntermediatePoint([start.lng, start.lat], [mid[0], mid[1]], 0.4) : mid;
      end = mid;
      geoflo.lastMove = end;
    } else {
      var coords = geoflo.hotFeature ? geoflo.hotFeature.geometry.coordinates : false;
      end = free ? geoflo.map.getCenter() : coords ? {
        lat: coords[coords.length - 1][1],
        lng: coords[coords.length - 1][0]
      } : geoflo.map.getCenter();
      geoflo.lastMove = false;
      this.setLocation([0, 0]);
    }
    this.map.center = end;
    return this.setMap(true);
  };

  /**
   * @function
      * @memberof module:geoflo.Gaming
   * @name setBearing
   * @description This function updates the bearing of the map by adjusting it with the specified value and direction.
   * @param {number | Array<number>} value - The value to adjust the bearing by. If dpad is false, it should be an array of numbers, otherwise a single number.
   * @param {boolean} left - Indicates the direction of adjustment. If true, the bearing is decreased; otherwise, it is increased.
   * @param {boolean} dpad - Specifies whether the value is coming from a dpad input.
   * @returns {boolean} Returns the result of calling the setMap function after updating the bearing.
   */
  this.setBearing = function (value, left, dpad) {
    var bearing = this.map.bearing;
    var bearingMulti = !dpad ? Math.abs(value[0]) : value;
    if (left) {
      bearing = bearing - this.options.bearing.speed * bearingMulti;
    } else {
      bearing = bearing + this.options.bearing.speed * bearingMulti;
    }
    this.map.bearing = bearing;
    return this.setMap();
  };

  /**
   * @function
      * @memberof module:geoflo.Gaming
   * @name setPitch
   * @description This function adjusts the pitch of the map by a specified amount in the given direction.
   * @param {number|Array<number>} value - The value or array of values to adjust the pitch by.
   * @param {boolean} up - A boolean indicating whether the pitch should be increased (true) or decreased (false).
   * @param {boolean} dpad - A boolean flag to determine if the value is coming from a D-pad input.
   * @returns {boolean} Returns true if the map is successfully updated with the new pitch.
   */
  this.setPitch = function (value, up, dpad) {
    var pitch = this.map.pitch;
    var pitchMulti = !dpad ? Math.abs(value[1]) : value;
    if (pitch < 0) pitch = 0;
    if (pitch > this.options.pitch.max) pitch = this.options.pitch.max;
    if (up) {
      pitch = pitch + this.options.pitch.speed * pitchMulti;
    } else {
      pitch = pitch - this.options.pitch.speed * pitchMulti;
    }
    this.map.pitch = pitch;
    return this.setMap();
  };

  /**
   * @function
      * @memberof module:geoflo.Gaming
   * @name setZoom
   * @description This function adjusts the zoom level of a map based on the provided value and direction.
   * @param {number} value - The amount by which to change the zoom level.
   * @param {boolean} out - A flag indicating whether to zoom out (true) or zoom in (false).
   * @param {boolean} dpad - A flag indicating the direction of the zoom change.
   * @returns {boolean} - Returns the result of setting the map with the new zoom level.
   */
  this.setZoom = function (value, out, dpad) {
    var zoom = this.map.zoom;
    if (out) {
      zoom = zoom - this.options.zoom.speed * Math.abs(value);
    } else {
      zoom = zoom + this.options.zoom.speed * Math.abs(value);
    }
    this.map.zoom = zoom;
    return this.setMap();
  };

  /**
   * @function
      * @memberof module:geoflo.Gaming
   * @name setSpeed
   * @description This function calculates the speed of panning based on the provided value and direction. It ensures that the speed falls within the specified minimum and maximum values.
   * @param {number} value - The value that influences the speed of panning.
   * @param {boolean} down - A boolean flag indicating the direction of panning (true for down, false for up).
   * @returns {number} The updated speed of panning after applying the calculations.
   */
  this.setSpeed = function (value, down) {
    var speed = this.options.pan.speed > this.options.pan.min ? this.options.pan.speed : this.options.pan.max && this.options.pan.speed > this.options.pan.max ? this.options.pan.min : this.options.pan.min;
    speed = down ? speed - this.options.pan.min : speed + this.options.pan.min;
    speed = speed < this.options.pan.min ? this.options.pan.min : this.options.pan.max && speed > this.options.pan.max ? this.options.pan.max : speed;
    return this.options.pan.speed = speed * Math.abs(value);
  };

  /**
   * @function
      * @memberof module:geoflo.Gaming associateEvent
   * @name associateEvent
   * @description This function allows the user to associate an event with a callback function for a specific button or axis on the gamepad.
   * @param {string} eventName - The name of the event to associate with the callback function.
   * @param {function} callback - The callback function to be executed when the event occurs.
   * @param {string} type - The type of event (e.g., 'press', 'release') to associate with the callback function.
   * @returns {object} The updated gamepad object with the associated event and callback function.
   */
  this.associateEvent = function (eventName, callback, type) {
    if (eventName.match(/^button\d+$/)) {
      var buttonId = parseInt(eventName.match(/^button(\d+)$/)[1]);
      if (buttonId >= 0 && buttonId < this.gamepad.buttons) {
        this.gamepad.buttonActions[buttonId][type] = callback;
      } else {
        console.log(buttonId, 'This button is not on gamepad');
      }
    } else if (eventName === 'start') {
      this.gamepad.buttonActions[9][type] = callback;
    } else if (eventName === 'select') {
      this.gamepad.buttonActions[8][type] = callback;
    } else if (eventName === 'r1') {
      this.gamepad.buttonActions[5][type] = callback;
    } else if (eventName === 'r2') {
      this.gamepad.buttonActions[7][type] = callback;
    } else if (eventName === 'l1') {
      this.gamepad.buttonActions[4][type] = callback;
    } else if (eventName === 'l2') {
      this.gamepad.buttonActions[6][type] = callback;
    } else if (eventName === 'power') {
      if (this.gamepad.buttons >= 17) {
        this.gamepad.buttonActions[16][type] = callback;
      } else {
        error(MESSAGES.INVALID_BUTTON);
      }
    } else if (eventName.match(/^(up|down|left|right)(\d+)$/)) {
      var matches = eventName.match(/^(up|down|left|right)(\d+)$/);
      var direction = matches[1];
      var axe = parseInt(matches[2]);
      if (axe >= 0 && axe < this.gamepad.axes) {
        this.gamepad.axesActions[axe][direction][type] = callback;
      } else {
        error(MESSAGES.INVALID_BUTTON);
      }
    } else if (eventName.match(/^(up|down|left|right)$/)) {
      var _direction = eventName.match(/^(up|down|left|right)$/)[1];
      this.gamepad.axesActions[0][_direction][type] = callback;
    }
    return this.gamepad;
  };
  this.onInit = function (options) {
    this.initiated = true;
    this.setContainer('div', 'gamepad', geoflo.map.getContainer());
    this.setMarker();
    this.setMap();
  };
  this.onEvent = function (type, key, action, value) {
    var pressed = _defineProperty({}, action, true);
    var lngLat = this.options.camera.free ? geoflo.map.getCenter() : geoflo.lastMove ? geoflo.lastMove : geoflo.map.getCenter();
    var options = {
      name: action,
      type: type,
      key: key,
      value: value,
      mode: geoflo.currentMode,
      gamepad: this,
      lngLat: lngLat,
      geoflo: geoflo,
      originalEvent: {}
    };
    if (!this.initiated) this.onInit(options);
    geoflo.map.fire(geoflo.id + ':gamepad.' + type, {
      detail: options
    });
    if (pressed['JoyLeftUp'] || pressed['JoyLeftDown'] || pressed['JoyLeftLeft'] || pressed['JoyLeftRight']) this.options.mapping['JoyLeftMove'](options);
    if (pressed['JoyRightUp'] || pressed['JoyRightDown'] || pressed['JoyRightLeft'] || pressed['JoyRightRight']) this.options.mapping['JoyRightMove'](options);
    if (pressed['JoyLeftClick']) this.options.mapping['JoyLeftClick'](options);
    if (pressed['JoyRightClick']) this.options.mapping['JoyRightClick'](options);
    if (pressed['BumpLeft']) this.options.mapping['BumpLeft'](options);
    if (pressed['BumpRight']) this.options.mapping['BumpRight'](options);
    if (pressed['TrigLeft']) this.options.mapping['TrigLeft'](options);
    if (pressed['TrigRight']) this.options.mapping['TrigRight'](options);
    if (pressed['A']) this.options.mapping['A'](options);
    if (pressed['B']) this.options.mapping['B'](options);
    if (pressed['X']) this.options.mapping['X'](options);
    if (pressed['Y']) this.options.mapping['Y'](options);
    if (pressed['Start']) this.options.mapping['Start'](options);
    if (pressed['Select']) this.options.mapping['Select'](options);
    if (pressed['Power']) this.options.mapping['Power'](options);
    if (pressed['Home']) this.options.mapping['Home'](options);
    if (pressed['Misc']) this.options.mapping['Misc'](options);
    if (pressed['DpadUp']) this.options.mapping['DpadUp'](options);
    if (pressed['DpadDown']) this.options.mapping['DpadDown'](options);
    if (pressed['DpadLeft']) this.options.mapping['DpadLeft'](options);
    if (pressed['DpadRight']) this.options.mapping['DpadRight'](options);
  };
  this.onDisconnect = function (gamepad) {
    if (!gamepad || !this.gamepad) return false;
    if (this.gamepad.id !== gamepad.id) throw new Error('Gamepad id does not match!');
    this.gamepad.remove();
    this.gamepad = null;
  };
  this.init(gamepad);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Gaming);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LENBQUMsQ0FBQ3hMLE9BQU8sQ0FBQztJQUNsRSxJQUFJK0csT0FBTyxDQUFDLFdBQVcsQ0FBQyxFQUFFLElBQUksQ0FBQy9HLE9BQU8sQ0FBQ3dMLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQ3hMLE9BQU8sQ0FBQztJQUVwRSxJQUFJK0csT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQy9HLE9BQU8sQ0FBQ3dMLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQ3hMLE9BQU8sQ0FBQztJQUNwRCxJQUFJK0csT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQy9HLE9BQU8sQ0FBQ3dMLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQ3hMLE9BQU8sQ0FBQztJQUNwRCxJQUFJK0csT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQy9HLE9BQU8sQ0FBQ3dMLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQ3hMLE9BQU8sQ0FBQztJQUNwRCxJQUFJK0csT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQy9HLE9BQU8sQ0FBQ3dMLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQ3hMLE9BQU8sQ0FBQztJQUVwRCxJQUFJK0csT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFLElBQUksQ0FBQy9HLE9BQU8sQ0FBQ3dMLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQ3hMLE9BQU8sQ0FBQztJQUM1RCxJQUFJK0csT0FBTyxDQUFDLFFBQVEsQ0FBQyxFQUFFLElBQUksQ0FBQy9HLE9BQU8sQ0FBQ3dMLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQ3hMLE9BQU8sQ0FBQztJQUM5RCxJQUFJK0csT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFLElBQUksQ0FBQy9HLE9BQU8sQ0FBQ3dMLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQ3hMLE9BQU8sQ0FBQztJQUM1RCxJQUFJK0csT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLElBQUksQ0FBQy9HLE9BQU8sQ0FBQ3dMLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQ3hMLE9BQU8sQ0FBQztJQUMxRCxJQUFJK0csT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLElBQUksQ0FBQy9HLE9BQU8sQ0FBQ3dMLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQ3hMLE9BQU8sQ0FBQztJQUUxRCxJQUFJK0csT0FBTyxDQUFDLFFBQVEsQ0FBQyxFQUFFLElBQUksQ0FBQy9HLE9BQU8sQ0FBQ3dMLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQ3hMLE9BQU8sQ0FBQztJQUM5RCxJQUFJK0csT0FBTyxDQUFDLFVBQVUsQ0FBQyxFQUFFLElBQUksQ0FBQy9HLE9BQU8sQ0FBQ3dMLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQ3hMLE9BQU8sQ0FBQztJQUNsRSxJQUFJK0csT0FBTyxDQUFDLFVBQVUsQ0FBQyxFQUFFLElBQUksQ0FBQy9HLE9BQU8sQ0FBQ3dMLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQ3hMLE9BQU8sQ0FBQztJQUNsRSxJQUFJK0csT0FBTyxDQUFDLFdBQVcsQ0FBQyxFQUFFLElBQUksQ0FBQy9HLE9BQU8sQ0FBQ3dMLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQ3hMLE9BQU8sQ0FBQztFQUN4RSxDQUFDO0VBRUQsSUFBSSxDQUFDbVAsWUFBWSxHQUFHLFVBQVV4UCxPQUFPLEVBQUU7SUFDbkMsSUFBSSxDQUFDQSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUNBLE9BQU8sRUFBRSxPQUFPLEtBQUs7SUFDM0MsSUFBSSxJQUFJLENBQUNBLE9BQU8sQ0FBQ3lHLEVBQUUsS0FBS3pHLE9BQU8sQ0FBQ3lHLEVBQUUsRUFBRSxNQUFNLElBQUl0RyxLQUFLLENBQUMsNEJBQTRCLENBQUM7SUFDakYsSUFBSSxDQUFDSCxPQUFPLENBQUNpSixNQUFNLENBQUMsQ0FBQztJQUNyQixJQUFJLENBQUNqSixPQUFPLEdBQUcsSUFBSTtFQUN2QixDQUFDO0VBR0QsSUFBSSxDQUFDb0csSUFBSSxDQUFDcEcsT0FBTyxDQUFDO0FBQ3RCLENBQUM7QUFFRCxpRUFBZUQsTUFBTSIsInNvdXJjZXMiOlsid2VicGFjazovL0Bzb2x1dGVncmF0ZS9nZW9mbG8tc2RrLy4vc3JjL0dhbWluZy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBtaXhpblxuICogQG1lbWJlcm9mIG1vZHVsZTpnZW9mbG9cbiAqIEBuYW1lIEdhbWluZ1xuICogQGRlc2NyaXB0aW9uIFRoaXMgbW9kdWxlIHByb3ZpZGVzIHRoZSBnYW1lcGFkIGZ1bmN0aW9uYWxpdHkgZm9yIHRoZSBHZW9mbG8gYXBwbGljYXRpb24uIEl0IGFsbG93cyB1c2VycyB0byBpbnRlcmFjdCB3aXRoIHRoZSBtYXAgdXNpbmcgYSBnYW1lcGFkIGNvbnRyb2xsZXIuXG4gKiBAcGFyYW0ge09iamVjdH0gZ2FtZXBhZCAtIFRoZSBnYW1lcGFkIG9iamVjdCB0byBiZSBpbml0aWFsaXplZC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gVGhlIG9wdGlvbnMgZm9yIGdhbWVwYWQgaW5pdGlhbGl6YXRpb24uIENvbWVzIGZyb20gZ2VvRmxvLm9wdGlvbnMuZ2FtZXBhZC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFRoZSBjdXJyZW50IG9iamVjdCBpbnN0YW5jZS5cbiAqL1xuY29uc3QgR2FtaW5nID0gZnVuY3Rpb24gKGdhbWVwYWQpIHtcbiAgICBjb25zdCBnZW9mbG8gPSB0aGlzLmdlb2ZsbztcblxuICAgIGlmICghc3VwcG9ydGVkKCkpIHRocm93IG5ldyBFcnJvcignR2FtZXBhZHMgYXJlIG5vdCBzdXBwb3J0ZWQgb24geW91ciBicm93c2VyIScpO1xuICAgIFxuICAgIGNvbnN0IGNvbnRyb2wgPSB0aGlzO1xuXG4gICAgdGhpcy5vcHRpb25zID0gZ2VvZmxvLm9wdGlvbnMuZ2FtZXBhZDtcblxuICAgIGNvbnN0IGxheW91dCA9IHtcbiAgICAgICAgXCJzZWxlY3RcIjogJ1NlbGVjdCcsXG4gICAgICAgIFwic3RhcnRcIjogJ1N0YXJ0JyxcbiAgICAgICAgXCJwb3dlclwiOiAnUG93ZXInLFxuICAgICAgICBcImJ1dHRvbjBcIjogJ0InLFxuICAgICAgICBcImJ1dHRvbjFcIjogJ0EnLFxuICAgICAgICBcImJ1dHRvbjJcIjogJ1knLFxuICAgICAgICBcImJ1dHRvbjNcIjogJ1gnLFxuICAgICAgICBcImJ1dHRvbjRcIjogJ0J1bXBMZWZ0JyxcbiAgICAgICAgXCJidXR0b241XCI6ICdCdW1wUmlnaHQnLFxuICAgICAgICBcImJ1dHRvbjZcIjogJ1RyaWdMZWZ0JyxcbiAgICAgICAgXCJidXR0b243XCI6ICdUcmlnUmlnaHQnLFxuICAgICAgICBcImJ1dHRvbjhcIjogJ1NlbGVjdCcsXG4gICAgICAgIFwiYnV0dG9uOVwiOiAnU3RhcnQnLFxuICAgICAgICBcImJ1dHRvbjEwXCI6ICdKb3lMZWZ0Q2xpY2snLFxuICAgICAgICBcImJ1dHRvbjExXCI6ICdKb3lSaWdodENsaWNrJyxcbiAgICAgICAgXCJidXR0b24xMlwiOiAnRHBhZFVwJyxcbiAgICAgICAgXCJidXR0b24xM1wiOiAnRHBhZERvd24nLFxuICAgICAgICBcImJ1dHRvbjE0XCI6ICdEcGFkTGVmdCcsXG4gICAgICAgIFwiYnV0dG9uMTVcIjogJ0RwYWRSaWdodCcsXG4gICAgICAgIFwiYnV0dG9uMTZcIjogJ1Bvd2VyJyxcbiAgICAgICAgXCJidXR0b24xN1wiOiAnTWlzYycsXG4gICAgICAgIFwidXAwXCI6ICdKb3lMZWZ0VXAnLFxuICAgICAgICBcImRvd24wXCI6ICdKb3lMZWZ0RG93bicsXG4gICAgICAgIFwicmlnaHQwXCI6ICdKb3lMZWZ0UmlnaHQnLFxuICAgICAgICBcImxlZnQwXCI6ICdKb3lMZWZ0TGVmdCcsXG4gICAgICAgIFwidXAxXCI6ICdKb3lSaWdodFVwJyxcbiAgICAgICAgXCJkb3duMVwiOiAnSm95UmlnaHREb3duJyxcbiAgICAgICAgXCJyaWdodDFcIjogJ0pveVJpZ2h0UmlnaHQnLFxuICAgICAgICBcImxlZnQxXCI6ICdKb3lSaWdodExlZnQnLFxuICAgICAgICBcImwxXCI6ICdCdW1wTGVmdCcsXG4gICAgICAgIFwicjFcIjogJ0J1bXBSaWdodCcsXG4gICAgICAgIFwibDJcIjogJ1RyaWdMZWZ0JyxcbiAgICAgICAgXCJyMlwiOiAnVHJpZ1JpZ2h0J1xuICAgIH1cblxuXG4gICAgZnVuY3Rpb24gY2xhbXAoeCwgeSkge1xuICAgICAgICBsZXQgbSA9IE1hdGguc3FydCh4KnggKyB5KnkpOyAvLyBNYWduaXR1ZGUgKGxlbmd0aCkgb2YgdmVjdG9yXG5cbiAgICAgICAgLy8gSWYgdGhlIGxlbmd0aCBncmVhdGVyIHRoYW4gMSwgbm9ybWFsaXplIGl0IChzZXQgaXQgdG8gMSlcbiAgICAgICAgaWYgKG0gPiAxKSB7XG4gICAgICAgICAgICB4IC89IG07XG4gICAgICAgICAgICB5IC89IG07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gW3gsIHldO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRlYWR6b25lKHgsIHksIGRlYWR6b25lPTAuMikge1xuICAgICAgICBsZXQgbSA9IE1hdGguc3FydCh4KnggKyB5KnkpO1xuXG4gICAgICAgIGlmIChtIDwgZGVhZHpvbmUpXG4gICAgICAgICAgICByZXR1cm4gWzAsIDBdO1xuXG4gICAgICAgIGxldCBvdmVyID0gbSAtIGRlYWR6b25lOyAgLy8gMCAtPiAxIC0gREVBRFpPTkVcbiAgICAgICAgbGV0IG5vdmVyID0gb3ZlciAvICgxIC0gZGVhZHpvbmUpOyAgLy8gMCAtPiAxXG5cbiAgICAgICAgbGV0IG54ID0geCAvIG07XG4gICAgICAgIGxldCBueSA9IHkgLyBtO1xuXG4gICAgICAgIHJldHVybiBbbnggKiBub3ZlciwgbnkgKiBub3Zlcl07XG4gICAgICAgIFxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlcXVlc3QoKSB7XG4gICAgICAgIGNvbnRyb2wucmVmcmVzaCgpO1xuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUocmVxdWVzdCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc3VwcG9ydGVkKCkge1xuICAgICAgICByZXR1cm4gKHdpbmRvdy5uYXZpZ2F0b3IuZ2V0R2FtZXBhZHMgJiYgdHlwZW9mIHdpbmRvdy5uYXZpZ2F0b3IuZ2V0R2FtZXBhZHMgPT09ICdmdW5jdGlvbicpIHx8XG4gICAgICAgICAgICAod2luZG93Lm5hdmlnYXRvci5nZXRHYW1lcGFkcyAmJiB0eXBlb2Ygd2luZG93Lm5hdmlnYXRvci53ZWJraXRHZXRHYW1lcGFkcyA9PT0gJ2Z1bmN0aW9uJykgfHxcbiAgICAgICAgICAgIGZhbHNlO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHFzKHMsIHApIHtcbiAgICAgICAgaWYgKHApIHtcbiAgICAgICAgICAgIHJldHVybiBwLnF1ZXJ5U2VsZWN0b3Iocyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Iocyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb24oZXZlbnROYW1lLCBjYWxsYmFjaykge1xuICAgICAgICByZXR1cm4gY29udHJvbC5hc3NvY2lhdGVFdmVudChldmVudE5hbWUsIGNhbGxiYWNrLCAnYWN0aW9uJyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWZ0ZXIoZXZlbnROYW1lLCBjYWxsYmFjaykge1xuICAgICAgICByZXR1cm4gY29udHJvbC5hc3NvY2lhdGVFdmVudChldmVudE5hbWUsIGNhbGxiYWNrLCAnYWZ0ZXInKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBiZWZvcmUoZXZlbnROYW1lLCBjYWxsYmFjaykge1xuICAgICAgICByZXR1cm4gY29udHJvbC5hc3NvY2lhdGVFdmVudChldmVudE5hbWUsIGNhbGxiYWNrLCAnYmVmb3JlJyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWRkRXZlbnRMaXN0ZW5lcnMoX3RoaXMsIGdhbWVwYWQpIHtcbiAgICAgICAgaWYgKCFnYW1lcGFkIHx8ICFsYXlvdXQpIHJldHVybiBmYWxzZTtcblxuICAgICAgICBPYmplY3QuZW50cmllcyhsYXlvdXQpLmZvckVhY2goZnVuY3Rpb24gKGVudHJ5KSB7XG4gICAgICAgICAgICB2YXIga2V5ID0gZW50cnlbMF07XG4gICAgICAgICAgICB2YXIgdmFsID0gZW50cnlbMV07XG5cbiAgICAgICAgICAgIGJlZm9yZShrZXksIGZ1bmN0aW9uICh2YWx1ZSkgeyByZXR1cm4gX3RoaXMub25FdmVudCgncHJlc3MnLCBrZXksIHZhbCwgdmFsdWUpOyB9KTtcbiAgICAgICAgICAgIG9uKGtleSwgZnVuY3Rpb24gKHZhbHVlKSB7IHJldHVybiBfdGhpcy5vbkV2ZW50KCdob2xkJywga2V5LCB2YWwsIHZhbHVlKTsgfSk7XG4gICAgICAgICAgICBhZnRlcihrZXksIGZ1bmN0aW9uICh2YWx1ZSkgeyByZXR1cm4gX3RoaXMub25FdmVudCgncmVsZWFzZScsIGtleSwgdmFsLCB2YWx1ZSk7IH0pO1xuICAgICAgICB9KVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRlZXBBc3NpZ24odGFyZ2V0LCBzb3VyY2UsIHtpc011dGF0aW5nT2sgPSBmYWxzZSwgaXNTdHJpY3RseVNhZmUgPSBmYWxzZX0gPSB7fSkge1xuICAgICAgICB0YXJnZXQgPSBpc011dGF0aW5nT2sgPyB0YXJnZXQgOiBjbG9uZSh0YXJnZXQsIGlzU3RyaWN0bHlTYWZlKTtcblxuICAgICAgICBmb3IgKGNvbnN0IFtrZXksIHZhbF0gb2YgT2JqZWN0LmVudHJpZXMoc291cmNlKSkge1xuICAgICAgICAgICAgaWYgKHZhbCAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsID09PSBgb2JqZWN0YCkge1xuICAgICAgICAgICAgICAgIGlmICh0YXJnZXRba2V5XSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldFtrZXldID0ge307XG4gICAgICAgICAgICAgICAgfVxuICAgIFxuICAgICAgICAgICAgICAgIHRhcmdldFtrZXldID0gZGVlcEFzc2lnbih0YXJnZXRba2V5XSwgdmFsLCB7aXNNdXRhdGluZ09rOiB0cnVlLCBpc1N0cmljdGx5U2FmZX0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0YXJnZXRba2V5XSA9IHZhbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGNsb25lKG9iaiwgaXNTdHJpY3RseVNhZmUgPSBmYWxzZSkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShvYmopKTtcbiAgICAgICAgICAgIH0gY2F0Y2goZXJyKSB7XG4gICAgICAgICAgICAgICAgaWYgKGlzU3RyaWN0bHlTYWZlKSB7IHRocm93IG5ldyBFcnJvcigpIH1cbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oYFVuc2FmZSBjbG9uZSBvZiBvYmplY3RgLCBvYmopO1xuICAgICAgICAgICAgICAgIHJldHVybiB7Li4ub2JqfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0YXJnZXQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2FsY3VsYXRlSW50ZXJtZWRpYXRlUG9pbnQocG9pbnQxLCBwb2ludDIsIHBlcmMpIHtcbiAgICAgICAgdmFyIGxhdDEgPSBkZWdyZWVzVG9SYWRpYW5zKHBvaW50MVsxXSk7XG4gICAgICAgIHZhciBsbmcxID0gZGVncmVlc1RvUmFkaWFucyhwb2ludDFbMF0pO1xuICAgICAgICB2YXIgbGF0MiA9IGRlZ3JlZXNUb1JhZGlhbnMocG9pbnQyWzFdKTtcbiAgICAgICAgdmFyIGxuZzIgPSBkZWdyZWVzVG9SYWRpYW5zKHBvaW50MlswXSk7XG5cbiAgICAgICAgdmFyIGRlbHRhTGF0ID0gbGF0MiAtIGxhdDE7XG4gICAgICAgIHZhciBkZWx0YUxuZyA9IGxuZzIgLSBsbmcxO1xuICAgICAgICBcbiAgICAgICAgdmFyIGNhbGNBID0gTWF0aC5zaW4oZGVsdGFMYXQgLyAyKSAqIE1hdGguc2luKGRlbHRhTGF0IC8gMikgKyBNYXRoLmNvcyhsYXQxKSAqIE1hdGguY29zKGxhdDIpICogTWF0aC5zaW4oZGVsdGFMbmcgLyAyKSAqIE1hdGguc2luKGRlbHRhTG5nIC8gMik7XG4gICAgICAgIHZhciBjYWxjQiA9IDIgKiBNYXRoLmF0YW4yKE1hdGguc3FydChjYWxjQSksIE1hdGguc3FydCgxIC0gY2FsY0EpKTtcbiAgICAgICAgXG4gICAgICAgIHZhciBBID0gTWF0aC5zaW4oKDEgLSBwZXJjKSAqIGNhbGNCKSAvIE1hdGguc2luKGNhbGNCKTtcbiAgICAgICAgdmFyIEIgPSBNYXRoLnNpbihwZXJjICogY2FsY0IpIC8gTWF0aC5zaW4oY2FsY0IpO1xuICAgICAgICBcbiAgICAgICAgdmFyIHggPSBBICogTWF0aC5jb3MobGF0MSkgKiBNYXRoLmNvcyhsbmcxKSArIEIgKiBNYXRoLmNvcyhsYXQyKSAqIE1hdGguY29zKGxuZzIpO1xuICAgICAgICB2YXIgeSA9IEEgKiBNYXRoLmNvcyhsYXQxKSAqIE1hdGguc2luKGxuZzEpICsgQiAqIE1hdGguY29zKGxhdDIpICogTWF0aC5zaW4obG5nMik7XG4gICAgICAgIHZhciB6ID0gQSAqIE1hdGguc2luKGxhdDEpICsgQiAqIE1hdGguc2luKGxhdDIpO1xuICAgICAgICBcbiAgICAgICAgdmFyIGxhdDMgPSBNYXRoLmF0YW4yKHosIE1hdGguc3FydCh4ICogeCArIHkgKiB5KSk7XG4gICAgICAgIHZhciBsbmczID0gTWF0aC5hdGFuMih5LCB4KTtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBbcmFkaWFuc1RvRGVncmVlcyhsbmczKSwgcmFkaWFuc1RvRGVncmVlcyhsYXQzKV1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwb2ludEF0UGVyY2VudChwMCwgcDEsIHBlcmNlbnQpIHtcbiAgICAgICAgdmFyIHg7XG4gICAgICAgIGlmIChwMC54ICE9PSBwMS54KVxuICAgICAgICAgICAgeCA9IHAwLnggKyBwZXJjZW50ICogKHAxLnggLSBwMC54KTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgeCA9IHAwLng7XG4gICAgXG4gICAgICAgIHZhciB5O1xuICAgICAgICBpZiAocDAueSAhPT0gcDEueSlcbiAgICAgICAgICAgIHkgPSBwMC55ICsgcGVyY2VudCAqIChwMS55IC0gcDAueSk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHkgPSBwMC55O1xuICAgIFxuICAgICAgICB2YXIgcCA9IHtcbiAgICAgICAgICAgIHg6IHgsXG4gICAgICAgICAgICB5OiB5XG4gICAgICAgIH07XG4gICAgXG4gICAgICAgIHJldHVybiBwO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRlZ3JlZXNUb1JhZGlhbnMoZGVncmVlcykge1xuICAgICAgICByZXR1cm4gZGVncmVlcyAqIChNYXRoLlBJIC8gMTgwKTtcbiAgICB9XG4gICAgICAgIFxuICAgIGZ1bmN0aW9uIHJhZGlhbnNUb0RlZ3JlZXMocmFkaWFucykge1xuICAgICAgICByZXR1cm4gcmFkaWFucyAqICgxODAgLyBNYXRoLlBJICk7XG4gICAgfVxuXG4gICAgXG5cblxuXG5cblxuXHQvKipcblx0ICogQGZ1bmN0aW9uXG4gICAgICogQG1lbWJlcm9mIG1vZHVsZTpnZW9mbG8uR2FtaW5nXG5cdCAqIEBuYW1lIGluaXRcblx0ICogQGRlc2NyaXB0aW9uIFRoaXMgZnVuY3Rpb24gaW5pdGlhbGl6ZXMgdGhlIGdhbWVwYWQgd2l0aCB0aGUgc3BlY2lmaWVkIG9wdGlvbnMuIEl0IGZpcmVzIGFuIGV2ZW50IHRvIG5vdGlmeSB0aGUgZ2FtZXBhZCBpbml0aWFsaXphdGlvbiwgc2V0cyB0aGUgZ2FtZXBhZCwgYWRkcyBldmVudCBsaXN0ZW5lcnMsIGFuZCByZXF1ZXN0cyBhbmltYXRpb24gZnJhbWUuXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBnYW1lcGFkIC0gVGhlIGdhbWVwYWQgb2JqZWN0IHRvIGJlIGluaXRpYWxpemVkLlxuXHQgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIFRoZSBvcHRpb25zIGZvciBnYW1lcGFkIGluaXRpYWxpemF0aW9uLlxuXHQgKiBAcmV0dXJucyB7T2JqZWN0fSBUaGUgY3VycmVudCBvYmplY3QgaW5zdGFuY2UuXG5cdCAqL1xuICAgIHRoaXMuaW5pdCA9IGZ1bmN0aW9uIChnYW1lcGFkLCBvcHRpb25zKSB7XG4gICAgICAgIGlmICghZ2FtZXBhZCkgcmV0dXJuIGZhbHNlO1xuICAgICAgICBpZiAoIXRoaXMub3B0aW9ucy5lbmFibGUpIHJldHVybiBjb25zb2xlLmVycm9yKCdHYW1lcGFkIG9wdGlvbiBpcyBub3QgZW5hYmxlZCEnKVxuICAgICAgICBnZW9mbG8ubWFwLmZpcmUoZ2VvZmxvLmlkICsgJzpnYW1lcGFkLmluaXQnLCB7IGRldGFpbDogeyBnYW1lcGFkOiBnYW1lcGFkIH0gfSk7XG4gICAgICAgIHRoaXMuc2V0R2FtZXBhZChnYW1lcGFkKTtcbiAgICAgICAgYWRkRXZlbnRMaXN0ZW5lcnModGhpcywgdGhpcy5nYW1lcGFkKTtcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHJlcXVlc3QpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cblx0LyoqXG5cdCAqIEBmdW5jdGlvblxuICAgICAqIEBtZW1iZXJvZiBtb2R1bGU6Z2VvZmxvLkdhbWluZ1xuXHQgKiBAbmFtZSByZWZyZXNoXG5cdCAqIEBkZXNjcmlwdGlvbiBSZWZyZXNoZXMgdGhlIGdhbWVwYWQgc3RhdGUgYnkgY2hlY2tpbmcgYnV0dG9uIHByZXNzZXMsIGF4ZXMgdmFsdWVzLCBhbmQgdHJpZ2dlcnMuXG5cdCAqIEBwYXJhbXMge3ZvaWR9XG5cdCAqIEByZXR1cm5zIHt2b2lkfVxuXHQgKi9cbiAgICB0aGlzLnJlZnJlc2ggPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBnYW1lcGFkcyA9IHdpbmRvdy5uYXZpZ2F0b3IuZ2V0R2FtZXBhZHMoKTtcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGdhbWVwYWRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgZ2FtZXBhZCA9IGdhbWVwYWRzW3RoaXMuZ2FtZXBhZC5pZF07XG4gICAgICAgICAgICB2YXIgajtcblxuICAgICAgICAgICAgaWYgKCFnYW1lcGFkIHx8ICFnYW1lcGFkLmNvbm5lY3RlZCkgeyBjb250aW51ZTsgfVxuXG4gICAgICAgICAgICBmb3IgKGogPSAwOyBqIDwgZ2FtZXBhZC5idXR0b25zLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgdmFyIGJ1dHRvbiA9IGdhbWVwYWQuYnV0dG9uc1tqXTtcbiAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSBidXR0b24udmFsdWU7XG4gICAgICAgICAgICAgICAgdmFyIG5hbWUgPSB0aGlzLmdhbWVwYWQubGF5b3V0W2BidXR0b24ke2p9YF1cblxuICAgICAgICAgICAgICAgIGlmIChidXR0b24ucHJlc3NlZCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuZ2FtZXBhZC5wcmVzc2VkW25hbWVdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWVwYWQucHJlc3NlZFtuYW1lXSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWVwYWQuYnV0dG9uQWN0aW9uc1tqXS5iZWZvcmUgPyB0aGlzLmdhbWVwYWQuYnV0dG9uQWN0aW9uc1tqXS5iZWZvcmUodmFsdWUpIDogZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWVwYWQuYnV0dG9uQWN0aW9uc1tqXS5hY3Rpb24gPyB0aGlzLmdhbWVwYWQuYnV0dG9uQWN0aW9uc1tqXS5hY3Rpb24odmFsdWUpIDogZmFsc2U7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmdhbWVwYWQucHJlc3NlZFtuYW1lXSkge1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5nYW1lcGFkLnByZXNzZWRbbmFtZV07XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZXBhZC5idXR0b25BY3Rpb25zW2pdLmFmdGVyID8gdGhpcy5nYW1lcGFkLmJ1dHRvbkFjdGlvbnNbal0uYWZ0ZXIodmFsdWUpIDogZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgYXhlc0JveENvdW50ID0gKChnYW1lcGFkLmF4ZXMubGVuZ3RoICsgMSkgLyAyKXwwO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgZm9yIChqID0gMDsgaiA8IGF4ZXNCb3hDb3VudDsgaisrKSB7XG4gICAgICAgICAgICAgICAgdmFyIHZhbHVlWCwgdmFsdWVZLCB2YWx1ZTtcbiAgICAgICAgICAgICAgICB2YXIgbGFzdF9vZGRfYXhpcyA9IGogPT0gYXhlc0JveENvdW50IC0gMSAmJiBnYW1lcGFkLmF4ZXMubGVuZ3RoICUgMiA9PSAxO1xuXG4gICAgICAgICAgICAgICAgdmFsdWVYID0gZ2FtZXBhZC5heGVzW2oqMl07XG4gICAgICAgICAgICAgICAgdmFsdWVZID0gbGFzdF9vZGRfYXhpcyA/IDAgOiBnYW1lcGFkLmF4ZXNbaioyICsgMV07XG4gICAgICAgICAgICAgICAgW3ZhbHVlWCwgdmFsdWVZXSA9IGRlYWR6b25lKHZhbHVlWCwgdmFsdWVZKTsgICAgXG4gICAgICAgICAgICAgICAgW3ZhbHVlWCwgdmFsdWVZXSA9IGNsYW1wKHZhbHVlWCwgdmFsdWVZKTtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IFtOdW1iZXIodmFsdWVYLnRvRml4ZWQoMikpLCBOdW1iZXIodmFsdWVZLnRvRml4ZWQoMikpXTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IHZhbCA9IGdhbWVwYWQuYXhlc1tqICsgYXhlc0JveENvdW50XS50b0ZpeGVkKDQpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGF4ZSA9IE1hdGguZmxvb3IoaiAvIDIpO1xuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZXBhZC5heGVWYWx1ZXNbYXhlXVtqICUgMl0gPSB2YWw7XG5cbiAgICAgICAgICAgICAgICB2YXIgcmlnaHRUcmlnZ2VyID0gdmFsdWVbMF0gPj0gdGhpcy5vcHRpb25zLmpveXN0aWNrLm1pbjtcbiAgICAgICAgICAgICAgICB2YXIgbGVmdFRyaWdnZXIgPSB2YWx1ZVswXSA8PSAtdGhpcy5vcHRpb25zLmpveXN0aWNrLm1pbjtcbiAgICAgICAgICAgICAgICB2YXIgdXBUcmlnZ2VyID0gdmFsdWVbMV0gPD0gLXRoaXMub3B0aW9ucy5qb3lzdGljay5taW47XG4gICAgICAgICAgICAgICAgdmFyIGRvd25UcmlnZ2VyID0gdmFsdWVbMV0gPj0gdGhpcy5vcHRpb25zLmpveXN0aWNrLm1pbjtcblxuICAgICAgICAgICAgICAgIHRoaXMudHJpZ2dlcigncmlnaHQnLCByaWdodFRyaWdnZXIsIGosIHZhbHVlKTtcbiAgICAgICAgICAgICAgICB0aGlzLnRyaWdnZXIoJ2xlZnQnLCBsZWZ0VHJpZ2dlciwgaiwgdmFsdWUpO1xuICAgICAgICAgICAgICAgIHRoaXMudHJpZ2dlcignZG93bicsIGRvd25UcmlnZ2VyLCBqLCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgdGhpcy50cmlnZ2VyKCd1cCcsIHVwVHJpZ2dlciwgaiwgdmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG5cdC8qKlxuXHQgKiBAZnVuY3Rpb25cbiAgICAgKiBAbWVtYmVyb2YgbW9kdWxlOmdlb2Zsby5HYW1pbmdcblx0ICogQG5hbWUgdHJpZ2dlclxuXHQgKiBAZGVzY3JpcHRpb24gVGhpcyBmdW5jdGlvbiBoYW5kbGVzIHRyaWdnZXJpbmcgYWN0aW9ucyBiYXNlZCBvbiBnYW1lcGFkIGlucHV0LiBJdCBjaGVja3MgaWYgYSBzcGVjaWZpYyBidXR0b24gb3IgYXhpcyBpcyB0cmlnZ2VyZWQgYW5kIHBlcmZvcm1zIGNvcnJlc3BvbmRpbmcgYWN0aW9ucy5cblx0ICogQHBhcmFtIHtzdHJpbmd9IGlkIC0gVGhlIGlkZW50aWZpZXIgb2YgdGhlIGdhbWVwYWQgaW5wdXQuXG5cdCAqIEBwYXJhbSB7Ym9vbGVhbn0gdHJpZ2dlcmVkIC0gSW5kaWNhdGVzIGlmIHRoZSBpbnB1dCBpcyB0cmlnZ2VyZWQuXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleCAtIFRoZSBpbmRleCBvZiB0aGUgaW5wdXQuXG5cdCAqIEBwYXJhbSB7bnVtYmVyW119IHZhbHVlIC0gVGhlIHZhbHVlIG9mIHRoZSBpbnB1dC5cblx0ICovXG4gICAgdGhpcy50cmlnZ2VyID0gZnVuY3Rpb24gKGlkLCB0cmlnZ2VyZWQsIGluZGV4LCB2YWx1ZSkge1xuICAgICAgICB2YXIgYWN0aW9ucyA9IHRoaXMuZ2FtZXBhZC5heGVzQWN0aW9ucztcbiAgICAgICAgdmFyIG5hbWUgPSB0aGlzLmdhbWVwYWQubGF5b3V0W2Ake2lkfSR7aW5kZXh9YF07XG4gICAgICAgIHZhciBwcmVzc2VkID0gdGhpcy5nYW1lcGFkLnByZXNzZWRcblxuICAgICAgICBpZiAodHJpZ2dlcmVkKSB7XG4gICAgICAgICAgICBpZiAoIXByZXNzZWRbbmFtZV0pIHtcbiAgICAgICAgICAgICAgICBwcmVzc2VkW25hbWVdID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBhY3Rpb25zW2luZGV4XVtpZF0uYmVmb3JlID8gYWN0aW9uc1tpbmRleF1baWRdLmJlZm9yZSh2YWx1ZSkgOiBmYWxzZVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YWx1ZSA9IFt0aGlzLm9wdGlvbnMuam95c3RpY2subWF4ICogdmFsdWVbMF0sIHRoaXMub3B0aW9ucy5qb3lzdGljay5tYXggKiB2YWx1ZVsxXV1cbiAgICAgICAgICAgIGFjdGlvbnNbaW5kZXhdW2lkXS5hY3Rpb24gPyBhY3Rpb25zW2luZGV4XVtpZF0uYWN0aW9uKHZhbHVlKSA6IGZhbHNlO1xuICAgICAgICB9IGVsc2UgaWYgKHByZXNzZWRbbmFtZV0pIHtcbiAgICAgICAgICAgIGRlbGV0ZSBwcmVzc2VkW25hbWVdO1xuXG4gICAgICAgICAgICBpZiAoIXByZXNzZWRbJ0pveUxlZnRVcCddICYmICFwcmVzc2VkWydKb3lMZWZ0RG93biddICYmICFwcmVzc2VkWydKb3lMZWZ0TGVmdCddICYmICFwcmVzc2VkWydKb3lMZWZ0UmlnaHQnXSkge1xuICAgICAgICAgICAgICAgIGFjdGlvbnNbMF1baWRdLmFmdGVyID8gYWN0aW9uc1swXVtpZF0uYWZ0ZXIodmFsdWUpIDogZmFsc2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghcHJlc3NlZFsnSm95UmlnaHRVcCddICYmICFwcmVzc2VkWydKb3lSaWdodERvd24nXSAmJiAhcHJlc3NlZFsnSm95UmlnaHRMZWZ0J10gJiYgIXByZXNzZWRbJ0pveVJpZ2h0UmlnaHQnXSkge1xuICAgICAgICAgICAgICAgIGFjdGlvbnNbMV1baWRdLmFmdGVyID8gYWN0aW9uc1sxXVtpZF0uYWZ0ZXIodmFsdWUpIDogZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcblx0ICogQGZ1bmN0aW9uXG4gICAgICogQG1lbWJlcm9mIG1vZHVsZTpnZW9mbG8uR2FtaW5nXG5cdCAqIEBuYW1lIHJlbW92ZVxuXHQgKiBAZGVzY3JpcHRpb24gRGlzY29ubmVjdHMgYW5kIHJlbW92ZXMgdGhlIGdhbWVwYWQgb2JqZWN0LlxuXHQgKiBAcGFyYW0ge09iamVjdH0gZ2FtZXBhZCAtIFRoZSBnYW1lcGFkIG9iamVjdCB0byBiZSBkaXNjb25uZWN0ZWQgYW5kIHJlbW92ZWQuXG5cdCAqIEByZXR1cm5zIHt2b2lkfVxuXHQgKi9cbiAgICB0aGlzLnJlbW92ZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmdhbWVwYWQuZGlzY29ubmVjdCA/IHRoaXMuZ2FtZXBhZC5kaXNjb25uZWN0KCkgOiBmYWxzZTtcbiAgICAgICAgdGhpcy5nYW1lcGFkLnJlbW92ZSA/IHRoaXMuZ2FtZXBhZC5yZW1vdmUoKSA6IGZhbHNlO1xuICAgICAgICB0aGlzLmdhbWVwYWQgPSBudWxsO1xuICAgIH1cblxuXG5cblxuXHQvKipcblx0ICogQGZ1bmN0aW9uXG4gICAgICogQG1lbWJlcm9mIG1vZHVsZTpnZW9mbG8uR2FtaW5nXG5cdCAqIEBuYW1lIHNldE1hcFxuXHQgKiBAZGVzY3JpcHRpb24gVGhpcyBmdW5jdGlvbiB1cGRhdGVzIHRoZSBtYXAgcHJvcGVydGllcyB1c2luZyB0aGUgaGFuZGxlTW92ZSBmdW5jdGlvbiBhbmQgc2V0cyB0aGUgY2VudGVyLCB6b29tLCBwaXRjaCwgYW5kIGJlYXJpbmcgYWNjb3JkaW5nbHkuXG5cdCAqIEBwYXJhbSB7RnVuY3Rpb259IGhhbmRsZU1vdmUgLSBUaGUgZnVuY3Rpb24gdXNlZCB0byBoYW5kbGUgbWFwIG1vdmVtZW50LlxuXHQgKiBAcmV0dXJucyB7T2JqZWN0fSBUaGUgdXBkYXRlZCBtYXAgb2JqZWN0IHdpdGggbmV3IHByb3BlcnRpZXMuXG5cdCAqL1xuICAgIHRoaXMuc2V0TWFwID0gZnVuY3Rpb24gKGhhbmRsZU1vdmUpIHtcbiAgICAgICAgY29uc3QgbWFwID0gZ2VvZmxvLm1hcDtcbiAgICAgICAgY29uc3QgdHJhbnNmb3JtID0gbWFwLnRyYW5zZm9ybTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMubWFwID0gdGhpcy5tYXAgfHwge1xuICAgICAgICAgICAgY2VudGVyOiBtYXAuZ2V0Q2VudGVyKCksXG4gICAgICAgICAgICB6b29tOiBtYXAuZ2V0Wm9vbSgpLFxuICAgICAgICAgICAgcGl0Y2g6IG1hcC5nZXRQaXRjaCgpLFxuICAgICAgICAgICAgYmVhcmluZzogbWFwLmdldEJlYXJpbmcoKVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB2YXIgY2VudGVyID0gdGhpcy5tYXAuY2VudGVyLnggPyB0aGlzLm1hcC5jZW50ZXIgOiB0aGlzLm1hcC5jZW50ZXIubGF0ID8gdGhpcy5tYXAuY2VudGVyIDogbmV3IG1hcGJveGdsLkxuZ0xhdCh0aGlzLm1hcC5jZW50ZXJbMF0sIHRoaXMubWFwLmNlbnRlclsxXSlcbiAgICAgICAgY2VudGVyID0gY2VudGVyLnggPyB0cmFuc2Zvcm0ucG9pbnRMb2NhdGlvbihjZW50ZXIpIDogY2VudGVyO1xuXG4gICAgICAgIHRyYW5zZm9ybS5jZW50ZXIgPSBjZW50ZXI7XG4gICAgICAgIHRyYW5zZm9ybS5iZWFyaW5nID0gdGhpcy5tYXAuYmVhcmluZztcbiAgICAgICAgdHJhbnNmb3JtLnpvb20gPSB0aGlzLm1hcC56b29tO1xuICAgICAgICB0cmFuc2Zvcm0ucGl0Y2ggPSB0aGlzLm1hcC5waXRjaDtcblxuICAgICAgICBtYXAuX3VwZGF0ZSgpO1xuXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMuY3Jvc3NoYWlycyAmJiBnZW9mbG8uY2VudGVyTWFya2VyKSB0aGlzLnNldE1hcmtlcigpO1xuICAgICAgICBpZiAoaGFuZGxlTW92ZSkgZ2VvZmxvLmN1cnJlbnRNb2RlLmhhbmRsZU1vdmUoeyBsbmdMYXQ6ICF0aGlzLm9wdGlvbnMuY2FtZXJhLmZyZWUgPyB0aGlzLm1hcC5jZW50ZXIgOiBtYXAuZ2V0Q2VudGVyKCksIGdhbWVwYWQ6IHRoaXMgfSlcbiAgICAgICAgcmV0dXJuIHRoaXMubWFwO1xuICAgIH1cblxuXHQvKipcblx0ICogQGZ1bmN0aW9uXG4gICAgICogQG1lbWJlcm9mIG1vZHVsZTpnZW9mbG8uR2FtaW5nXG5cdCAqIEBuYW1lIHNldENvbnRhaW5lclxuXHQgKiBAZGVzY3JpcHRpb24gQ3JlYXRlcyBhIG5ldyBIVE1MIGVsZW1lbnQgd2l0aCB0aGUgc3BlY2lmaWVkIHRhZyBuYW1lIGFuZCBjbGFzcyBuYW1lLCBhcHBlbmRzIGl0IHRvIGEgY29udGFpbmVyIGlmIHByb3ZpZGVkLCBhbmQgc2V0cyBpdCBhcyB0aGUgY29udGFpbmVyIHByb3BlcnR5IG9mIHRoZSBjdXJyZW50IG9iamVjdC5cblx0ICogQHBhcmFtIHtzdHJpbmd9IHRhZ05hbWUgLSBUaGUgdGFnIG5hbWUgb2YgdGhlIEhUTUwgZWxlbWVudCB0byBjcmVhdGUuXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBjbGFzc05hbWUgLSBUaGUgY2xhc3MgbmFtZSB0byBhc3NpZ24gdG8gdGhlIGNyZWF0ZWQgZWxlbWVudCAob3B0aW9uYWwpLlxuXHQgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBjb250YWluZXIgLSBUaGUgY29udGFpbmVyIGVsZW1lbnQgdG8gYXBwZW5kIHRoZSBjcmVhdGVkIGVsZW1lbnQgdG8gKG9wdGlvbmFsKS5cblx0ICogQHJldHVybnMge0hUTUxFbGVtZW50fSBUaGUgY3JlYXRlZCBIVE1MIGVsZW1lbnQuXG5cdCAqL1xuXHRcbiAgICB0aGlzLnNldENvbnRhaW5lciA9IGZ1bmN0aW9uICh0YWdOYW1lLCBjbGFzc05hbWUsIGNvbnRhaW5lcikge1xuICAgICAgICBjb25zdCBlbCA9IHdpbmRvdy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZ05hbWUpO1xuICAgICAgICBpZiAoY2xhc3NOYW1lICE9PSB1bmRlZmluZWQpIGVsLmNsYXNzTmFtZSA9IGNsYXNzTmFtZTtcbiAgICAgICAgaWYgKGNvbnRhaW5lcikgY29udGFpbmVyLmFwcGVuZENoaWxkKGVsKTtcbiAgICAgICAgdGhpcy5jb250YWluZXIgPSBlbDtcbiAgICAgICAgcmV0dXJuIGVsO1xuICAgIH1cblxuXHQvKipcblx0ICogQGZ1bmN0aW9uXG4gICAgICogQG1lbWJlcm9mIG1vZHVsZTpnZW9mbG8uR2FtaW5nIFxuXHQgKiBAbmFtZSBzZXRMb2NhdGlvblxuXHQgKiBAZGVzY3JpcHRpb24gVGhpcyBmdW5jdGlvbiB1cGRhdGVzIHRoZSB2aXNpYmlsaXR5LCBsZWZ0LCBhbmQgdG9wIHByb3BlcnRpZXMgb2YgdGhlIGNvbnRhaW5lciBlbGVtZW50IGJhc2VkIG9uIHRoZSBwcm92aWRlZCB2YWx1ZS5cblx0ICogQHBhcmFtIHtBcnJheTxudW1iZXI+fSB2YWx1ZSAtIEFuIGFycmF5IGNvbnRhaW5pbmcgdGhlIHggYW5kIHkgY29vcmRpbmF0ZXMgZm9yIHRoZSBuZXcgbG9jYXRpb24uXG5cdCAqIEByZXR1cm5zIHtET01SZWN0fSBUaGUgYm91bmRpbmcgcmVjdGFuZ2xlIG9mIHRoZSBjb250YWluZXIgZWxlbWVudCBhZnRlciB0aGUgbG9jYXRpb24gaXMgc2V0LlxuXHQgKi9cbiAgICB0aGlzLnNldExvY2F0aW9uID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuY29udGFpbmVyLnN0eWxlLnZpc2liaWxpdHkgPSB0aGlzLm9wdGlvbnMuZGVidWcgPyAndmlzaWJsZScgOiAnaGlkZGVuJztcbiAgICAgICAgdGhpcy5jb250YWluZXIuc3R5bGUubGVmdCA9ICh2YWx1ZVswXSArIDEpIC8gMiAqIDEwMCArICclJztcbiAgICAgICAgdGhpcy5jb250YWluZXIuc3R5bGUudG9wID0gKHZhbHVlWzFdICsgMSkgLyAyICogMTAwICsgJyUnO1xuICAgICAgICByZXR1cm4gdGhpcy5jb250YWluZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgfVxuXG5cdC8qKlxuXHQgKiBAZnVuY3Rpb25cbiAgICAgKiBAbWVtYmVyb2YgbW9kdWxlOmdlb2Zsby5HYW1pbmdcblx0ICogQG5hbWUgc2V0TWFya2VyXG5cdCAqIEBkZXNjcmlwdGlvbiBTZXRzIGEgbWFya2VyIG9uIHRoZSBtYXAgdXNpbmcgdGhlIGNlbnRlciBjb29yZGluYXRlcyBwcm92aWRlZCBieSB0aGUgY29udGV4dC5cblx0ICogQHJldHVybiB7T2JqZWN0fSBSZXR1cm5zIHRoZSBtYXJrZXIgb2JqZWN0IGNyZWF0ZWQgb24gdGhlIG1hcC5cblx0ICovXG4gICAgdGhpcy5zZXRNYXJrZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBnZW9mbG8uc2V0Q2VudGVyTWFya2VyKHsgZ2FtZXBhZDogdHJ1ZSB9KTtcbiAgICB9XG5cblx0LyoqXG5cdCAqIEBmdW5jdGlvblxuICAgICAqIEBtZW1iZXJvZiBtb2R1bGU6Z2VvZmxvLkdhbWluZ1xuXHQgKiBAbmFtZSBzZXRHYW1lcGFkXG5cdCAqIEBkZXNjcmlwdGlvbiBJbml0aWFsaXplcyBhIGdhbWVwYWQgb2JqZWN0IHdpdGggc3BlY2lmaWMgcHJvcGVydGllcyBiYXNlZCBvbiB0aGUgcHJvdmlkZWQgZ2FtZXBhZCBpbnB1dC5cblx0ICogQHBhcmFtIHtPYmplY3R9IGdhbWVwYWQgLSBUaGUgZ2FtZXBhZCBvYmplY3QgdG8gYmUgcHJvY2Vzc2VkLlxuXHQgKiBAcmV0dXJucyB7T2JqZWN0fSAtIFRoZSBwcm9jZXNzZWQgZ2FtZXBhZCBvYmplY3Qgd2l0aCBkZWZpbmVkIHByb3BlcnRpZXMuXG5cdCAqL1xuICAgIHRoaXMuc2V0R2FtZXBhZCA9IGZ1bmN0aW9uIChnYW1lcGFkKSB7XG4gICAgICAgIHZhciBvcHRpb25zID0ge1xuICAgICAgICAgICAgdHlwZTogZ2FtZXBhZC5pZCxcbiAgICAgICAgICAgIGNvbm5lY3RlZDogZ2FtZXBhZC5jb25uZWN0ZWQsXG4gICAgICAgICAgICBpZDogZ2FtZXBhZC5pbmRleCxcbiAgICAgICAgICAgIGJ1dHRvbnM6IGdhbWVwYWQuYnV0dG9ucy5sZW5ndGgsXG4gICAgICAgICAgICBsYXlvdXQ6IGxheW91dCxcbiAgICAgICAgICAgIGF4ZXM6IE1hdGguZmxvb3IoZ2FtZXBhZC5heGVzLmxlbmd0aCAvIDIpLFxuICAgICAgICAgICAgYXhlVmFsdWVzOiBbXSxcbiAgICAgICAgICAgIGhhcHRpY0FjdHVhdG9yOiBudWxsLFxuICAgICAgICAgICAgdmlicmF0aW9uTW9kZTogLTEsXG4gICAgICAgICAgICB2aWJyYXRpb246IGZhbHNlLFxuICAgICAgICAgICAgbWFwcGluZzogZ2FtZXBhZC5tYXBwaW5nLFxuICAgICAgICAgICAgYnV0dG9uQWN0aW9uczoge30sXG4gICAgICAgICAgICBheGVzQWN0aW9uczoge30sXG4gICAgICAgICAgICBwcmVzc2VkOiB7fVxuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgeCA9IDA7IHggPCBvcHRpb25zLmJ1dHRvbnM7IHgrKykge1xuICAgICAgICAgICAgb3B0aW9ucy5idXR0b25BY3Rpb25zW3hdID0gKCkgPT4gKHsgYWN0aW9uOiAoKSA9PiB7IH0sIGFmdGVyOiAoKSA9PiB7IH0sIGJlZm9yZTogKCkgPT4geyB9IH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgeCA9IDA7IHggPCBvcHRpb25zLmF4ZXM7IHgrKykge1xuICAgICAgICAgICAgb3B0aW9ucy5heGVzQWN0aW9uc1t4XSA9IHtcbiAgICAgICAgICAgICAgICBkb3duOiAoKSA9PiAoeyBhY3Rpb246ICgpID0+IHsgfSwgYWZ0ZXI6ICgpID0+IHsgfSwgYmVmb3JlOiAoKSA9PiB7IH0gfSksXG4gICAgICAgICAgICAgICAgbGVmdDogKCkgPT4gKHsgYWN0aW9uOiAoKSA9PiB7IH0sIGFmdGVyOiAoKSA9PiB7IH0sIGJlZm9yZTogKCkgPT4geyB9IH0pLFxuICAgICAgICAgICAgICAgIHJpZ2h0OiAoKSA9PiAoeyBhY3Rpb246ICgpID0+IHsgfSwgYWZ0ZXI6ICgpID0+IHsgfSwgYmVmb3JlOiAoKSA9PiB7IH0gfSksXG4gICAgICAgICAgICAgICAgdXA6ICgpID0+ICh7IGFjdGlvbjogKCkgPT4geyB9LCBhZnRlcjogKCkgPT4geyB9LCBiZWZvcmU6ICgpID0+IHsgfSB9KVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgb3B0aW9ucy5heGVWYWx1ZXNbeF0gPSBbMCwgMF07XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZ2FtZXBhZC5oYXB0aWNBY3R1YXRvcnMpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgZ2FtZXBhZC5oYXB0aWNBY3R1YXRvcnMucHVsc2UgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICBvcHRpb25zLmhhcHRpYyA9IGdhbWVwYWQuaGFwdGljQWN0dWF0b3JzO1xuICAgICAgICAgICAgICAgIG9wdGlvbnMudmlicmF0aW9uTW9kZSA9IDA7XG4gICAgICAgICAgICAgICAgb3B0aW9ucy52aWJyYXRpb24gPSB0cnVlO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChnYW1lcGFkLmhhcHRpY0FjdHVhdG9yc1swXSAmJiB0eXBlb2YgZ2FtZXBhZC5oYXB0aWNBY3R1YXRvcnNbMF0ucHVsc2UgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICBvcHRpb25zLmhhcHRpYyA9IGdhbWVwYWQuaGFwdGljQWN0dWF0b3JzWzBdO1xuICAgICAgICAgICAgICAgIG9wdGlvbnMudmlicmF0aW9uTW9kZSA9IDA7XG4gICAgICAgICAgICAgICAgb3B0aW9ucy52aWJyYXRpb24gPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZiAoZ2FtZXBhZC52aWJyYXRpb25BY3R1YXRvcikge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBnYW1lcGFkLnZpYnJhdGlvbkFjdHVhdG9yLnBsYXlFZmZlY3QgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICBvcHRpb25zLmhhcHRpYyA9IGdhbWVwYWQudmlicmF0aW9uQWN0dWF0b3I7XG4gICAgICAgICAgICAgICAgb3B0aW9ucy52aWJyYXRpb25Nb2RlID0gMTtcbiAgICAgICAgICAgICAgICBvcHRpb25zLnZpYnJhdGlvbiA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmdhbWVwYWQgPSBvcHRpb25zO1xuICAgICAgICB0aGlzLmhhc0pveXN0aWNrcyA9IG9wdGlvbnMuYXhlcyA+IDAgJiYgT2JqZWN0LnZhbHVlcyh0aGlzLmdhbWVwYWQubGF5b3V0KS5tYXAoZnVuY3Rpb24obSkgeyByZXR1cm4gbS5pbmNsdWRlcygnSm95JykgfSkuZmlsdGVyKGZ1bmN0aW9uIChiKSB7IHJldHVybiBiIH0pLmxlbmd0aCA+IDA7XG4gICAgICAgIHJldHVybiB0aGlzLmdhbWVwYWQ7XG4gICAgfVxuXG5cdC8qKlxuXHQgKiBAZnVuY3Rpb25cbiAgICAgKiBAbWVtYmVyb2YgbW9kdWxlOmdlb2Zsby5HYW1pbmdcblx0ICogQG5hbWUgc2V0Q2VudGVyXG5cdCAqIEBkZXNjcmlwdGlvbiBUaGlzIGZ1bmN0aW9uIGNhbGN1bGF0ZXMgdGhlIG5ldyBjZW50ZXIgb2YgdGhlIG1hcCBiYXNlZCBvbiB0aGUgaW5wdXQgdmFsdWVzIGFuZCBnYW1lcGFkIGNvbnRyb2xzLiBJdCBoYW5kbGVzIGJvdGggam95c3RpY2sgYW5kIEQtcGFkIGlucHV0cyB0byBhZGp1c3QgdGhlIG1hcCBjZW50ZXIgYWNjb3JkaW5nbHkuXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSB2YWx1ZSAtIFRoZSB2YWx1ZSB1c2VkIHRvIGNhbGN1bGF0ZSB0aGUgbmV3IGNlbnRlciBvZiB0aGUgbWFwLlxuXHQgKiBAcGFyYW0ge2Jvb2xlYW59IGZyZWUgLSBBIGJvb2xlYW4gZmxhZyBpbmRpY2F0aW5nIGlmIHRoZSBtYXAgY2VudGVyIHNob3VsZCBiZSBzZXQgZnJlZWx5LlxuXHQgKiBAcGFyYW0ge2Jvb2xlYW59IGRwYWQgLSBBIGJvb2xlYW4gZmxhZyBpbmRpY2F0aW5nIGlmIHRoZSBELXBhZCBjb250cm9scyBhcmUgdXNlZCBmb3Igc2V0dGluZyB0aGUgbWFwIGNlbnRlci5cblx0ICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgdHJ1ZSBhZnRlciBzZXR0aW5nIHRoZSBtYXAgY2VudGVyLlxuXHQgKi9cblx0XG4gICAgdGhpcy5zZXRDZW50ZXIgPSBmdW5jdGlvbiAodmFsdWUsIGZyZWUsIGRwYWQpIHtcbiAgICAgICAgdmFyIGNlbnRlciA9IGdlb2Zsby5tYXAuZ2V0Q2VudGVyKCk7XG4gICAgICAgIHZhciBwcmVzc2VkID0gdGhpcy5nYW1lcGFkLnByZXNzZWQ7XG4gICAgICAgIHZhciB0eXBlID0gdGhpcy5oYXNKb3lzdGlja3MgPyAnSm95JyA6ICdEcGFkJztcbiAgICAgICAgdmFyIGRpYWcgPSBPYmplY3Qua2V5cyhwcmVzc2VkKS5maWx0ZXIoZnVuY3Rpb24ocCkgeyByZXR1cm4gcC5pbmNsdWRlcyh0eXBlKSB9KS5sZW5ndGggPiAxO1xuICAgICAgICBcbiAgICAgICAgdmFyIHN0YXJ0ID0gZnJlZSB8fCBkcGFkID8gY2VudGVyIDogZmFsc2U7XG4gICAgICAgIHN0YXJ0ID0gZ2VvZmxvLmhvdEZlYXR1cmUgJiYgIXN0YXJ0ID8gZ2VvZmxvLmxhc3RNb3ZlIHx8IGNlbnRlciA6IGZhbHNlO1xuICAgICAgICBzdGFydCA9ICFzdGFydCA/IGNlbnRlciA6IHN0YXJ0O1xuXG4gICAgICAgIHZhciBlbmQ7XG4gICAgXG4gICAgICAgIGlmIChkcGFkKSB7XG4gICAgICAgICAgICB2YXIgYmVhcmluZyA9IHRoaXMubWFwLmJlYXJpbmc7XG4gICAgICAgICAgICBiZWFyaW5nID0gcHJlc3NlZFsnVXAnXSA/IGJlYXJpbmcgOlxuICAgICAgICAgICAgcHJlc3NlZFsnRG93biddID8gYmVhcmluZyArIDE4MCA6XG4gICAgICAgICAgICBwcmVzc2VkWydMZWZ0J10gPyBiZWFyaW5nIC0gOTAgOlxuICAgICAgICAgICAgcHJlc3NlZFsnUmlnaHQnXSA/IGJlYXJpbmcgKyA5MCA6XG4gICAgICAgICAgICBiZWFyaW5nO1xuXG4gICAgICAgICAgICB2YXIgZGVzdCA9IHR1cmYuZGVzdGluYXRpb24odHVyZi5wb2ludChzdGFydCksIGRpc3RhbmNlLCBiZWFyaW5nKS5nZW9tZXRyeS5jb29yZGluYXRlcztcblxuICAgICAgICAgICAgbG5nTGF0cyA9IGZyZWUgPyB7IGxuZzogZGVzdFsxXSwgbGF0OiBkZXN0WzBdIH0gOiBkZXN0O1xuICAgICAgICB9IGVsc2UgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICB2YXIgbG9jYXRpb24gPSB0aGlzLnNldExvY2F0aW9uKHZhbHVlKTtcbiAgICAgICAgICAgIHZhciBjb29yZHMgPSBsb2NhdGlvbiAmJiBsb2NhdGlvbi54ID8gW2xvY2F0aW9uLngsIGxvY2F0aW9uLnldIDogZmFsc2U7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGVuZCA9IGdlb2Zsby5tYXAudW5wcm9qZWN0KGNvb3Jkcyk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHZhciBwZXJjZW50ID0gZGlhZyA/IHRoaXMub3B0aW9ucy5wYW4uc3BlZWQgLyAyIDogdGhpcy5vcHRpb25zLnBhbi5zcGVlZDtcbiAgICAgICAgICAgIHZhciBtaWQgPSBjYWxjdWxhdGVJbnRlcm1lZGlhdGVQb2ludChbc3RhcnQubG5nLCBzdGFydC5sYXRdLCBbZW5kLmxuZywgZW5kLmxhdF0sIHBlcmNlbnQpXG4gICAgICAgICAgICBtaWQgPSBnZW9mbG8ubWFwLmdldFBpdGNoKCkgPiA2MCA/IGNhbGN1bGF0ZUludGVybWVkaWF0ZVBvaW50KFtzdGFydC5sbmcsIHN0YXJ0LmxhdF0sIFttaWRbMF0sIG1pZFsxXV0sIDAuNCkgOiBtaWQ7XG5cbiAgICAgICAgICAgIGVuZCA9IG1pZDtcbiAgICAgICAgICAgIGdlb2Zsby5sYXN0TW92ZSA9IGVuZDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhciBjb29yZHMgPSBnZW9mbG8uaG90RmVhdHVyZSA/IGdlb2Zsby5ob3RGZWF0dXJlLmdlb21ldHJ5LmNvb3JkaW5hdGVzIDogZmFsc2U7XG4gICAgICAgICAgICBlbmQgPSBmcmVlID8gZ2VvZmxvLm1hcC5nZXRDZW50ZXIoKSA6XG4gICAgICAgICAgICBjb29yZHMgPyB7IGxhdDogY29vcmRzW2Nvb3Jkcy5sZW5ndGgtMV1bMV0sIGxuZzogY29vcmRzW2Nvb3Jkcy5sZW5ndGgtMV1bMF0gfSA6IGdlb2Zsby5tYXAuZ2V0Q2VudGVyKCk7XG4gICAgICAgICAgICBnZW9mbG8ubGFzdE1vdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuc2V0TG9jYXRpb24oWzAsIDBdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubWFwLmNlbnRlciA9IGVuZDtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2V0TWFwKHRydWUpO1xuICAgIH1cbiAgICBcblx0LyoqXG5cdCAqIEBmdW5jdGlvblxuICAgICAqIEBtZW1iZXJvZiBtb2R1bGU6Z2VvZmxvLkdhbWluZ1xuXHQgKiBAbmFtZSBzZXRCZWFyaW5nXG5cdCAqIEBkZXNjcmlwdGlvbiBUaGlzIGZ1bmN0aW9uIHVwZGF0ZXMgdGhlIGJlYXJpbmcgb2YgdGhlIG1hcCBieSBhZGp1c3RpbmcgaXQgd2l0aCB0aGUgc3BlY2lmaWVkIHZhbHVlIGFuZCBkaXJlY3Rpb24uXG5cdCAqIEBwYXJhbSB7bnVtYmVyIHwgQXJyYXk8bnVtYmVyPn0gdmFsdWUgLSBUaGUgdmFsdWUgdG8gYWRqdXN0IHRoZSBiZWFyaW5nIGJ5LiBJZiBkcGFkIGlzIGZhbHNlLCBpdCBzaG91bGQgYmUgYW4gYXJyYXkgb2YgbnVtYmVycywgb3RoZXJ3aXNlIGEgc2luZ2xlIG51bWJlci5cblx0ICogQHBhcmFtIHtib29sZWFufSBsZWZ0IC0gSW5kaWNhdGVzIHRoZSBkaXJlY3Rpb24gb2YgYWRqdXN0bWVudC4gSWYgdHJ1ZSwgdGhlIGJlYXJpbmcgaXMgZGVjcmVhc2VkOyBvdGhlcndpc2UsIGl0IGlzIGluY3JlYXNlZC5cblx0ICogQHBhcmFtIHtib29sZWFufSBkcGFkIC0gU3BlY2lmaWVzIHdoZXRoZXIgdGhlIHZhbHVlIGlzIGNvbWluZyBmcm9tIGEgZHBhZCBpbnB1dC5cblx0ICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgdGhlIHJlc3VsdCBvZiBjYWxsaW5nIHRoZSBzZXRNYXAgZnVuY3Rpb24gYWZ0ZXIgdXBkYXRpbmcgdGhlIGJlYXJpbmcuXG5cdCAqL1xuICAgIHRoaXMuc2V0QmVhcmluZyA9IGZ1bmN0aW9uICh2YWx1ZSwgbGVmdCwgZHBhZCkge1xuICAgICAgICB2YXIgYmVhcmluZyA9IHRoaXMubWFwLmJlYXJpbmc7XG4gICAgICAgIHZhciBiZWFyaW5nTXVsdGkgPSAhZHBhZCA/IE1hdGguYWJzKHZhbHVlWzBdKSA6IHZhbHVlO1xuICAgIFxuICAgICAgICBpZiAobGVmdCkge1xuICAgICAgICAgICAgYmVhcmluZyA9IGJlYXJpbmcgLSAodGhpcy5vcHRpb25zLmJlYXJpbmcuc3BlZWQgKiBiZWFyaW5nTXVsdGkpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBiZWFyaW5nID0gYmVhcmluZyArICh0aGlzLm9wdGlvbnMuYmVhcmluZy5zcGVlZCAqIGJlYXJpbmdNdWx0aSlcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubWFwLmJlYXJpbmcgPSBiZWFyaW5nO1xuICAgICAgICByZXR1cm4gdGhpcy5zZXRNYXAoKTtcbiAgICB9XG4gICAgXG5cdC8qKlxuXHQgKiBAZnVuY3Rpb25cbiAgICAgKiBAbWVtYmVyb2YgbW9kdWxlOmdlb2Zsby5HYW1pbmdcblx0ICogQG5hbWUgc2V0UGl0Y2hcblx0ICogQGRlc2NyaXB0aW9uIFRoaXMgZnVuY3Rpb24gYWRqdXN0cyB0aGUgcGl0Y2ggb2YgdGhlIG1hcCBieSBhIHNwZWNpZmllZCBhbW91bnQgaW4gdGhlIGdpdmVuIGRpcmVjdGlvbi5cblx0ICogQHBhcmFtIHtudW1iZXJ8QXJyYXk8bnVtYmVyPn0gdmFsdWUgLSBUaGUgdmFsdWUgb3IgYXJyYXkgb2YgdmFsdWVzIHRvIGFkanVzdCB0aGUgcGl0Y2ggYnkuXG5cdCAqIEBwYXJhbSB7Ym9vbGVhbn0gdXAgLSBBIGJvb2xlYW4gaW5kaWNhdGluZyB3aGV0aGVyIHRoZSBwaXRjaCBzaG91bGQgYmUgaW5jcmVhc2VkICh0cnVlKSBvciBkZWNyZWFzZWQgKGZhbHNlKS5cblx0ICogQHBhcmFtIHtib29sZWFufSBkcGFkIC0gQSBib29sZWFuIGZsYWcgdG8gZGV0ZXJtaW5lIGlmIHRoZSB2YWx1ZSBpcyBjb21pbmcgZnJvbSBhIEQtcGFkIGlucHV0LlxuXHQgKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyB0cnVlIGlmIHRoZSBtYXAgaXMgc3VjY2Vzc2Z1bGx5IHVwZGF0ZWQgd2l0aCB0aGUgbmV3IHBpdGNoLlxuXHQgKi9cbiAgICB0aGlzLnNldFBpdGNoID0gZnVuY3Rpb24gKHZhbHVlLCB1cCwgZHBhZCkge1xuICAgICAgICB2YXIgcGl0Y2ggPSB0aGlzLm1hcC5waXRjaDtcbiAgICAgICAgdmFyIHBpdGNoTXVsdGkgPSAhZHBhZCA/IE1hdGguYWJzKHZhbHVlWzFdKSA6IHZhbHVlO1xuXG4gICAgICAgIGlmIChwaXRjaCA8IDApIHBpdGNoID0gMDtcbiAgICAgICAgaWYgKHBpdGNoID4gdGhpcy5vcHRpb25zLnBpdGNoLm1heCkgcGl0Y2ggPSB0aGlzLm9wdGlvbnMucGl0Y2gubWF4O1xuICAgIFxuICAgICAgICBpZiAodXApIHtcbiAgICAgICAgICAgIHBpdGNoID0gcGl0Y2ggKyAodGhpcy5vcHRpb25zLnBpdGNoLnNwZWVkICogcGl0Y2hNdWx0aSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwaXRjaCA9IHBpdGNoIC0gKHRoaXMub3B0aW9ucy5waXRjaC5zcGVlZCAqIHBpdGNoTXVsdGkpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB0aGlzLm1hcC5waXRjaCA9IHBpdGNoO1xuICAgICAgICByZXR1cm4gdGhpcy5zZXRNYXAoKTtcbiAgICB9XG4gICAgXG5cdC8qKlxuXHQgKiBAZnVuY3Rpb25cbiAgICAgKiBAbWVtYmVyb2YgbW9kdWxlOmdlb2Zsby5HYW1pbmdcblx0ICogQG5hbWUgc2V0Wm9vbVxuXHQgKiBAZGVzY3JpcHRpb24gVGhpcyBmdW5jdGlvbiBhZGp1c3RzIHRoZSB6b29tIGxldmVsIG9mIGEgbWFwIGJhc2VkIG9uIHRoZSBwcm92aWRlZCB2YWx1ZSBhbmQgZGlyZWN0aW9uLlxuXHQgKiBAcGFyYW0ge251bWJlcn0gdmFsdWUgLSBUaGUgYW1vdW50IGJ5IHdoaWNoIHRvIGNoYW5nZSB0aGUgem9vbSBsZXZlbC5cblx0ICogQHBhcmFtIHtib29sZWFufSBvdXQgLSBBIGZsYWcgaW5kaWNhdGluZyB3aGV0aGVyIHRvIHpvb20gb3V0ICh0cnVlKSBvciB6b29tIGluIChmYWxzZSkuXG5cdCAqIEBwYXJhbSB7Ym9vbGVhbn0gZHBhZCAtIEEgZmxhZyBpbmRpY2F0aW5nIHRoZSBkaXJlY3Rpb24gb2YgdGhlIHpvb20gY2hhbmdlLlxuXHQgKiBAcmV0dXJucyB7Ym9vbGVhbn0gLSBSZXR1cm5zIHRoZSByZXN1bHQgb2Ygc2V0dGluZyB0aGUgbWFwIHdpdGggdGhlIG5ldyB6b29tIGxldmVsLlxuXHQgKi9cbiAgICB0aGlzLnNldFpvb20gPSBmdW5jdGlvbiAodmFsdWUsIG91dCwgZHBhZCkge1xuICAgICAgICB2YXIgem9vbSA9IHRoaXMubWFwLnpvb207XG4gICAgXG4gICAgICAgIGlmIChvdXQpIHtcbiAgICAgICAgICAgIHpvb20gPSB6b29tIC0gKCB0aGlzLm9wdGlvbnMuem9vbS5zcGVlZCAqIE1hdGguYWJzKHZhbHVlKSApXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB6b29tID0gem9vbSArICggdGhpcy5vcHRpb25zLnpvb20uc3BlZWQgKiBNYXRoLmFicyh2YWx1ZSkgKVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB0aGlzLm1hcC56b29tID0gem9vbTtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2V0TWFwKCk7XG4gICAgfVxuXG5cdC8qKlxuXHQgKiBAZnVuY3Rpb25cbiAgICAgKiBAbWVtYmVyb2YgbW9kdWxlOmdlb2Zsby5HYW1pbmdcblx0ICogQG5hbWUgc2V0U3BlZWRcblx0ICogQGRlc2NyaXB0aW9uIFRoaXMgZnVuY3Rpb24gY2FsY3VsYXRlcyB0aGUgc3BlZWQgb2YgcGFubmluZyBiYXNlZCBvbiB0aGUgcHJvdmlkZWQgdmFsdWUgYW5kIGRpcmVjdGlvbi4gSXQgZW5zdXJlcyB0aGF0IHRoZSBzcGVlZCBmYWxscyB3aXRoaW4gdGhlIHNwZWNpZmllZCBtaW5pbXVtIGFuZCBtYXhpbXVtIHZhbHVlcy5cblx0ICogQHBhcmFtIHtudW1iZXJ9IHZhbHVlIC0gVGhlIHZhbHVlIHRoYXQgaW5mbHVlbmNlcyB0aGUgc3BlZWQgb2YgcGFubmluZy5cblx0ICogQHBhcmFtIHtib29sZWFufSBkb3duIC0gQSBib29sZWFuIGZsYWcgaW5kaWNhdGluZyB0aGUgZGlyZWN0aW9uIG9mIHBhbm5pbmcgKHRydWUgZm9yIGRvd24sIGZhbHNlIGZvciB1cCkuXG5cdCAqIEByZXR1cm5zIHtudW1iZXJ9IFRoZSB1cGRhdGVkIHNwZWVkIG9mIHBhbm5pbmcgYWZ0ZXIgYXBwbHlpbmcgdGhlIGNhbGN1bGF0aW9ucy5cblx0ICovXG4gICAgdGhpcy5zZXRTcGVlZCA9IGZ1bmN0aW9uICh2YWx1ZSwgZG93bikge1xuICAgICAgICB2YXIgc3BlZWQgPSB0aGlzLm9wdGlvbnMucGFuLnNwZWVkID4gdGhpcy5vcHRpb25zLnBhbi5taW4gP1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zLnBhbi5zcGVlZCA6XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMucGFuLm1heCAmJiB0aGlzLm9wdGlvbnMucGFuLnNwZWVkID4gdGhpcy5vcHRpb25zLnBhbi5tYXggP1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zLnBhbi5taW4gOlxuICAgICAgICAgICAgdGhpcy5vcHRpb25zLnBhbi5taW47XG5cbiAgICAgICAgc3BlZWQgPSBkb3duID8gc3BlZWQgLSB0aGlzLm9wdGlvbnMucGFuLm1pbiA6IHNwZWVkICsgdGhpcy5vcHRpb25zLnBhbi5taW47XG5cbiAgICAgICAgc3BlZWQgPSBzcGVlZCA8IHRoaXMub3B0aW9ucy5wYW4ubWluID8gdGhpcy5vcHRpb25zLnBhbi5taW4gOlxuICAgICAgICB0aGlzLm9wdGlvbnMucGFuLm1heCAmJiBzcGVlZCA+IHRoaXMub3B0aW9ucy5wYW4ubWF4ID8gdGhpcy5vcHRpb25zLnBhbi5tYXggOlxuICAgICAgICBzcGVlZDtcblxuICAgICAgICByZXR1cm4gdGhpcy5vcHRpb25zLnBhbi5zcGVlZCA9IHNwZWVkICogTWF0aC5hYnModmFsdWUpO1xuICAgIH1cblxuXG5cdC8qKlxuXHQgKiBAZnVuY3Rpb25cbiAgICAgKiBAbWVtYmVyb2YgbW9kdWxlOmdlb2Zsby5HYW1pbmcgYXNzb2NpYXRlRXZlbnRcblx0ICogQG5hbWUgYXNzb2NpYXRlRXZlbnRcblx0ICogQGRlc2NyaXB0aW9uIFRoaXMgZnVuY3Rpb24gYWxsb3dzIHRoZSB1c2VyIHRvIGFzc29jaWF0ZSBhbiBldmVudCB3aXRoIGEgY2FsbGJhY2sgZnVuY3Rpb24gZm9yIGEgc3BlY2lmaWMgYnV0dG9uIG9yIGF4aXMgb24gdGhlIGdhbWVwYWQuXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBldmVudE5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgZXZlbnQgdG8gYXNzb2NpYXRlIHdpdGggdGhlIGNhbGxiYWNrIGZ1bmN0aW9uLlxuXHQgKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFjayAtIFRoZSBjYWxsYmFjayBmdW5jdGlvbiB0byBiZSBleGVjdXRlZCB3aGVuIHRoZSBldmVudCBvY2N1cnMuXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlIC0gVGhlIHR5cGUgb2YgZXZlbnQgKGUuZy4sICdwcmVzcycsICdyZWxlYXNlJykgdG8gYXNzb2NpYXRlIHdpdGggdGhlIGNhbGxiYWNrIGZ1bmN0aW9uLlxuXHQgKiBAcmV0dXJucyB7b2JqZWN0fSBUaGUgdXBkYXRlZCBnYW1lcGFkIG9iamVjdCB3aXRoIHRoZSBhc3NvY2lhdGVkIGV2ZW50IGFuZCBjYWxsYmFjayBmdW5jdGlvbi5cblx0ICovXG4gICAgdGhpcy5hc3NvY2lhdGVFdmVudCA9IGZ1bmN0aW9uKGV2ZW50TmFtZSwgY2FsbGJhY2ssIHR5cGUpIHtcbiAgICAgICAgaWYgKGV2ZW50TmFtZS5tYXRjaCgvXmJ1dHRvblxcZCskLykpIHtcbiAgICAgICAgICAgIGNvbnN0IGJ1dHRvbklkID0gcGFyc2VJbnQoZXZlbnROYW1lLm1hdGNoKC9eYnV0dG9uKFxcZCspJC8pWzFdKTtcblxuICAgICAgICAgICAgaWYgKGJ1dHRvbklkID49IDAgJiYgYnV0dG9uSWQgPCB0aGlzLmdhbWVwYWQuYnV0dG9ucykge1xuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZXBhZC5idXR0b25BY3Rpb25zW2J1dHRvbklkXVt0eXBlXSA9IGNhbGxiYWNrO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhidXR0b25JZCwgJ1RoaXMgYnV0dG9uIGlzIG5vdCBvbiBnYW1lcGFkJylcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9IGVsc2UgaWYgKGV2ZW50TmFtZSA9PT0gJ3N0YXJ0Jykge1xuICAgICAgICAgICAgdGhpcy5nYW1lcGFkLmJ1dHRvbkFjdGlvbnNbOV1bdHlwZV0gPSBjYWxsYmFjaztcbiAgICAgICAgfSBlbHNlIGlmIChldmVudE5hbWUgPT09ICdzZWxlY3QnKSB7XG4gICAgICAgICAgICB0aGlzLmdhbWVwYWQuYnV0dG9uQWN0aW9uc1s4XVt0eXBlXSA9IGNhbGxiYWNrO1xuICAgICAgICB9IGVsc2UgaWYgKGV2ZW50TmFtZSA9PT0gJ3IxJykge1xuICAgICAgICAgICAgdGhpcy5nYW1lcGFkLmJ1dHRvbkFjdGlvbnNbNV1bdHlwZV0gPSBjYWxsYmFjaztcbiAgICAgICAgfSBlbHNlIGlmIChldmVudE5hbWUgPT09ICdyMicpIHtcbiAgICAgICAgICAgIHRoaXMuZ2FtZXBhZC5idXR0b25BY3Rpb25zWzddW3R5cGVdID0gY2FsbGJhY2s7XG4gICAgICAgIH0gZWxzZSBpZiAoZXZlbnROYW1lID09PSAnbDEnKSB7XG4gICAgICAgICAgICB0aGlzLmdhbWVwYWQuYnV0dG9uQWN0aW9uc1s0XVt0eXBlXSA9IGNhbGxiYWNrO1xuICAgICAgICB9IGVsc2UgaWYgKGV2ZW50TmFtZSA9PT0gJ2wyJykge1xuICAgICAgICAgICAgdGhpcy5nYW1lcGFkLmJ1dHRvbkFjdGlvbnNbNl1bdHlwZV0gPSBjYWxsYmFjaztcbiAgICAgICAgfSBlbHNlIGlmIChldmVudE5hbWUgPT09ICdwb3dlcicpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmdhbWVwYWQuYnV0dG9ucyA+PSAxNykge1xuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZXBhZC5idXR0b25BY3Rpb25zWzE2XVt0eXBlXSA9IGNhbGxiYWNrO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBlcnJvcihNRVNTQUdFUy5JTlZBTElEX0JVVFRPTik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoZXZlbnROYW1lLm1hdGNoKC9eKHVwfGRvd258bGVmdHxyaWdodCkoXFxkKykkLykpIHtcbiAgICAgICAgICAgIGNvbnN0IG1hdGNoZXMgPSBldmVudE5hbWUubWF0Y2goL14odXB8ZG93bnxsZWZ0fHJpZ2h0KShcXGQrKSQvKTtcbiAgICAgICAgICAgIGNvbnN0IGRpcmVjdGlvbiA9IG1hdGNoZXNbMV07XG4gICAgICAgICAgICBjb25zdCBheGUgPSBwYXJzZUludChtYXRjaGVzWzJdKTtcblxuICAgICAgICAgICAgaWYgKGF4ZSA+PSAwICYmIGF4ZSA8IHRoaXMuZ2FtZXBhZC5heGVzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lcGFkLmF4ZXNBY3Rpb25zW2F4ZV1bZGlyZWN0aW9uXVt0eXBlXSA9IGNhbGxiYWNrO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBlcnJvcihNRVNTQUdFUy5JTlZBTElEX0JVVFRPTik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoZXZlbnROYW1lLm1hdGNoKC9eKHVwfGRvd258bGVmdHxyaWdodCkkLykpIHtcbiAgICAgICAgICAgIGNvbnN0IGRpcmVjdGlvbiA9IGV2ZW50TmFtZS5tYXRjaCgvXih1cHxkb3dufGxlZnR8cmlnaHQpJC8pWzFdO1xuICAgICAgICAgICAgdGhpcy5nYW1lcGFkLmF4ZXNBY3Rpb25zWzBdW2RpcmVjdGlvbl1bdHlwZV0gPSBjYWxsYmFjaztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLmdhbWVwYWQ7XG4gICAgfVxuXG4gICAgdGhpcy5vbkluaXQgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgICAgICB0aGlzLmluaXRpYXRlZCA9IHRydWU7XG4gICAgICAgIHRoaXMuc2V0Q29udGFpbmVyKCdkaXYnLCAnZ2FtZXBhZCcsIGdlb2Zsby5tYXAuZ2V0Q29udGFpbmVyKCkpO1xuICAgICAgICB0aGlzLnNldE1hcmtlcigpO1xuICAgICAgICB0aGlzLnNldE1hcCgpO1xuICAgIH1cblxuICAgIHRoaXMub25FdmVudCA9IGZ1bmN0aW9uICh0eXBlLCBrZXksIGFjdGlvbiwgdmFsdWUpIHtcbiAgICAgICAgdmFyIHByZXNzZWQgPSB7W2FjdGlvbl06IHRydWV9O1xuICAgICAgICB2YXIgbG5nTGF0ID0gdGhpcy5vcHRpb25zLmNhbWVyYS5mcmVlID8gZ2VvZmxvLm1hcC5nZXRDZW50ZXIoKSA6IGdlb2Zsby5sYXN0TW92ZSA/IGdlb2Zsby5sYXN0TW92ZSA6IGdlb2Zsby5tYXAuZ2V0Q2VudGVyKCk7XG5cbiAgICAgICAgdmFyIG9wdGlvbnMgPSB7XG4gICAgICAgICAgICBuYW1lOiBhY3Rpb24sXG4gICAgICAgICAgICB0eXBlOiB0eXBlLFxuICAgICAgICAgICAga2V5OiBrZXksXG4gICAgICAgICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICAgICAgICBtb2RlOiBnZW9mbG8uY3VycmVudE1vZGUsXG4gICAgICAgICAgICBnYW1lcGFkOiB0aGlzLFxuICAgICAgICAgICAgbG5nTGF0OiBsbmdMYXQsXG4gICAgICAgICAgICBnZW9mbG86IGdlb2ZsbyxcbiAgICAgICAgICAgIG9yaWdpbmFsRXZlbnQ6IHt9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRoaXMuaW5pdGlhdGVkKSB0aGlzLm9uSW5pdChvcHRpb25zKTtcblxuICAgICAgICBnZW9mbG8ubWFwLmZpcmUoZ2VvZmxvLmlkICsgJzpnYW1lcGFkLicgKyB0eXBlLCB7IGRldGFpbDogb3B0aW9ucyB9KTtcblxuICAgICAgICBpZiAocHJlc3NlZFsnSm95TGVmdFVwJ10gfHwgcHJlc3NlZFsnSm95TGVmdERvd24nXSB8fCBwcmVzc2VkWydKb3lMZWZ0TGVmdCddIHx8IHByZXNzZWRbJ0pveUxlZnRSaWdodCddKSB0aGlzLm9wdGlvbnMubWFwcGluZ1snSm95TGVmdE1vdmUnXShvcHRpb25zKTtcbiAgICAgICAgaWYgKHByZXNzZWRbJ0pveVJpZ2h0VXAnXSB8fCBwcmVzc2VkWydKb3lSaWdodERvd24nXSB8fCBwcmVzc2VkWydKb3lSaWdodExlZnQnXSB8fCBwcmVzc2VkWydKb3lSaWdodFJpZ2h0J10pIHRoaXMub3B0aW9ucy5tYXBwaW5nWydKb3lSaWdodE1vdmUnXShvcHRpb25zKTtcblxuICAgICAgICBpZiAocHJlc3NlZFsnSm95TGVmdENsaWNrJ10pIHRoaXMub3B0aW9ucy5tYXBwaW5nWydKb3lMZWZ0Q2xpY2snXShvcHRpb25zKTtcbiAgICAgICAgaWYgKHByZXNzZWRbJ0pveVJpZ2h0Q2xpY2snXSkgdGhpcy5vcHRpb25zLm1hcHBpbmdbJ0pveVJpZ2h0Q2xpY2snXShvcHRpb25zKTtcblxuICAgICAgICBpZiAocHJlc3NlZFsnQnVtcExlZnQnXSkgdGhpcy5vcHRpb25zLm1hcHBpbmdbJ0J1bXBMZWZ0J10ob3B0aW9ucyk7XG4gICAgICAgIGlmIChwcmVzc2VkWydCdW1wUmlnaHQnXSkgdGhpcy5vcHRpb25zLm1hcHBpbmdbJ0J1bXBSaWdodCddKG9wdGlvbnMpO1xuXG4gICAgICAgIGlmIChwcmVzc2VkWydUcmlnTGVmdCddKSB0aGlzLm9wdGlvbnMubWFwcGluZ1snVHJpZ0xlZnQnXShvcHRpb25zKTtcbiAgICAgICAgaWYgKHByZXNzZWRbJ1RyaWdSaWdodCddKSB0aGlzLm9wdGlvbnMubWFwcGluZ1snVHJpZ1JpZ2h0J10ob3B0aW9ucyk7XG5cbiAgICAgICAgaWYgKHByZXNzZWRbJ0EnXSkgdGhpcy5vcHRpb25zLm1hcHBpbmdbJ0EnXShvcHRpb25zKTtcbiAgICAgICAgaWYgKHByZXNzZWRbJ0InXSkgdGhpcy5vcHRpb25zLm1hcHBpbmdbJ0InXShvcHRpb25zKTtcbiAgICAgICAgaWYgKHByZXNzZWRbJ1gnXSkgdGhpcy5vcHRpb25zLm1hcHBpbmdbJ1gnXShvcHRpb25zKTtcbiAgICAgICAgaWYgKHByZXNzZWRbJ1knXSkgdGhpcy5vcHRpb25zLm1hcHBpbmdbJ1knXShvcHRpb25zKTtcblxuICAgICAgICBpZiAocHJlc3NlZFsnU3RhcnQnXSkgdGhpcy5vcHRpb25zLm1hcHBpbmdbJ1N0YXJ0J10ob3B0aW9ucyk7XG4gICAgICAgIGlmIChwcmVzc2VkWydTZWxlY3QnXSkgdGhpcy5vcHRpb25zLm1hcHBpbmdbJ1NlbGVjdCddKG9wdGlvbnMpO1xuICAgICAgICBpZiAocHJlc3NlZFsnUG93ZXInXSkgdGhpcy5vcHRpb25zLm1hcHBpbmdbJ1Bvd2VyJ10ob3B0aW9ucyk7XG4gICAgICAgIGlmIChwcmVzc2VkWydIb21lJ10pIHRoaXMub3B0aW9ucy5tYXBwaW5nWydIb21lJ10ob3B0aW9ucyk7XG4gICAgICAgIGlmIChwcmVzc2VkWydNaXNjJ10pIHRoaXMub3B0aW9ucy5tYXBwaW5nWydNaXNjJ10ob3B0aW9ucyk7XG5cbiAgICAgICAgaWYgKHByZXNzZWRbJ0RwYWRVcCddKSB0aGlzLm9wdGlvbnMubWFwcGluZ1snRHBhZFVwJ10ob3B0aW9ucyk7XG4gICAgICAgIGlmIChwcmVzc2VkWydEcGFkRG93biddKSB0aGlzLm9wdGlvbnMubWFwcGluZ1snRHBhZERvd24nXShvcHRpb25zKTtcbiAgICAgICAgaWYgKHByZXNzZWRbJ0RwYWRMZWZ0J10pIHRoaXMub3B0aW9ucy5tYXBwaW5nWydEcGFkTGVmdCddKG9wdGlvbnMpO1xuICAgICAgICBpZiAocHJlc3NlZFsnRHBhZFJpZ2h0J10pIHRoaXMub3B0aW9ucy5tYXBwaW5nWydEcGFkUmlnaHQnXShvcHRpb25zKTtcbiAgICB9XG5cbiAgICB0aGlzLm9uRGlzY29ubmVjdCA9IGZ1bmN0aW9uIChnYW1lcGFkKSB7XG4gICAgICAgIGlmICghZ2FtZXBhZCB8fCAhdGhpcy5nYW1lcGFkKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIGlmICh0aGlzLmdhbWVwYWQuaWQgIT09IGdhbWVwYWQuaWQpIHRocm93IG5ldyBFcnJvcignR2FtZXBhZCBpZCBkb2VzIG5vdCBtYXRjaCEnKTtcbiAgICAgICAgdGhpcy5nYW1lcGFkLnJlbW92ZSgpO1xuICAgICAgICB0aGlzLmdhbWVwYWQgPSBudWxsO1xuICAgIH1cblxuXG4gICAgdGhpcy5pbml0KGdhbWVwYWQpO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgR2FtaW5nOyJdLCJuYW1lcyI6WyJHYW1pbmciLCJnYW1lcGFkIiwiZ2VvZmxvIiwic3VwcG9ydGVkIiwiRXJyb3IiLCJjb250cm9sIiwib3B0aW9ucyIsImxheW91dCIsImNsYW1wIiwieCIsInkiLCJtIiwiTWF0aCIsInNxcnQiLCJkZWFkem9uZSIsImFyZ3VtZW50cyIsImxlbmd0aCIsInVuZGVmaW5lZCIsIm92ZXIiLCJub3ZlciIsIm54IiwibnkiLCJyZXF1ZXN0IiwicmVmcmVzaCIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsIndpbmRvdyIsIm5hdmlnYXRvciIsImdldEdhbWVwYWRzIiwid2Via2l0R2V0R2FtZXBhZHMiLCJxcyIsInMiLCJwIiwicXVlcnlTZWxlY3RvciIsImRvY3VtZW50Iiwib24iLCJldmVudE5hbWUiLCJjYWxsYmFjayIsImFzc29jaWF0ZUV2ZW50IiwiYWZ0ZXIiLCJiZWZvcmUiLCJhZGRFdmVudExpc3RlbmVycyIsIl90aGlzIiwiT2JqZWN0IiwiZW50cmllcyIsImZvckVhY2giLCJlbnRyeSIsImtleSIsInZhbCIsInZhbHVlIiwib25FdmVudCIsImRlZXBBc3NpZ24iLCJ0YXJnZXQiLCJzb3VyY2UiLCJfcmVmIiwiX3JlZiRpc011dGF0aW5nT2siLCJpc011dGF0aW5nT2siLCJfcmVmJGlzU3RyaWN0bHlTYWZlIiwiaXNTdHJpY3RseVNhZmUiLCJjbG9uZSIsIl9pIiwiX09iamVjdCRlbnRyaWVzIiwiX09iamVjdCRlbnRyaWVzJF9pIiwiX3NsaWNlZFRvQXJyYXkiLCJfdHlwZW9mIiwib2JqIiwiSlNPTiIsInBhcnNlIiwic3RyaW5naWZ5IiwiZXJyIiwiY29uc29sZSIsIndhcm4iLCJfb2JqZWN0U3ByZWFkIiwiY2FsY3VsYXRlSW50ZXJtZWRpYXRlUG9pbnQiLCJwb2ludDEiLCJwb2ludDIiLCJwZXJjIiwibGF0MSIsImRlZ3JlZXNUb1JhZGlhbnMiLCJsbmcxIiwibGF0MiIsImxuZzIiLCJkZWx0YUxhdCIsImRlbHRhTG5nIiwiY2FsY0EiLCJzaW4iLCJjb3MiLCJjYWxjQiIsImF0YW4yIiwiQSIsIkIiLCJ6IiwibGF0MyIsImxuZzMiLCJyYWRpYW5zVG9EZWdyZWVzIiwicG9pbnRBdFBlcmNlbnQiLCJwMCIsInAxIiwicGVyY2VudCIsImRlZ3JlZXMiLCJQSSIsInJhZGlhbnMiLCJpbml0IiwiZW5hYmxlIiwiZXJyb3IiLCJtYXAiLCJmaXJlIiwiaWQiLCJkZXRhaWwiLCJzZXRHYW1lcGFkIiwiZ2FtZXBhZHMiLCJpIiwiaiIsImNvbm5lY3RlZCIsImJ1dHRvbnMiLCJidXR0b24iLCJuYW1lIiwiY29uY2F0IiwicHJlc3NlZCIsImJ1dHRvbkFjdGlvbnMiLCJhY3Rpb24iLCJheGVzQm94Q291bnQiLCJheGVzIiwidmFsdWVYIiwidmFsdWVZIiwibGFzdF9vZGRfYXhpcyIsIl9kZWFkem9uZSIsIl9kZWFkem9uZTIiLCJfY2xhbXAiLCJfY2xhbXAyIiwiTnVtYmVyIiwidG9GaXhlZCIsImF4ZSIsImZsb29yIiwiYXhlVmFsdWVzIiwicmlnaHRUcmlnZ2VyIiwiam95c3RpY2siLCJtaW4iLCJsZWZ0VHJpZ2dlciIsInVwVHJpZ2dlciIsImRvd25UcmlnZ2VyIiwidHJpZ2dlciIsInRyaWdnZXJlZCIsImluZGV4IiwiYWN0aW9ucyIsImF4ZXNBY3Rpb25zIiwibWF4IiwicmVtb3ZlIiwiZGlzY29ubmVjdCIsInNldE1hcCIsImhhbmRsZU1vdmUiLCJ0cmFuc2Zvcm0iLCJjZW50ZXIiLCJnZXRDZW50ZXIiLCJ6b29tIiwiZ2V0Wm9vbSIsInBpdGNoIiwiZ2V0UGl0Y2giLCJiZWFyaW5nIiwiZ2V0QmVhcmluZyIsImxhdCIsIm1hcGJveGdsIiwiTG5nTGF0IiwicG9pbnRMb2NhdGlvbiIsIl91cGRhdGUiLCJjcm9zc2hhaXJzIiwiY2VudGVyTWFya2VyIiwic2V0TWFya2VyIiwiY3VycmVudE1vZGUiLCJsbmdMYXQiLCJjYW1lcmEiLCJmcmVlIiwic2V0Q29udGFpbmVyIiwidGFnTmFtZSIsImNsYXNzTmFtZSIsImNvbnRhaW5lciIsImVsIiwiY3JlYXRlRWxlbWVudCIsImFwcGVuZENoaWxkIiwic2V0TG9jYXRpb24iLCJzdHlsZSIsInZpc2liaWxpdHkiLCJkZWJ1ZyIsImxlZnQiLCJ0b3AiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJzZXRDZW50ZXJNYXJrZXIiLCJ0eXBlIiwiaGFwdGljQWN0dWF0b3IiLCJ2aWJyYXRpb25Nb2RlIiwidmlicmF0aW9uIiwibWFwcGluZyIsImRvd24iLCJyaWdodCIsInVwIiwiaGFwdGljQWN0dWF0b3JzIiwicHVsc2UiLCJoYXB0aWMiLCJ2aWJyYXRpb25BY3R1YXRvciIsInBsYXlFZmZlY3QiLCJoYXNKb3lzdGlja3MiLCJ2YWx1ZXMiLCJpbmNsdWRlcyIsImZpbHRlciIsImIiLCJzZXRDZW50ZXIiLCJkcGFkIiwiZGlhZyIsImtleXMiLCJzdGFydCIsImhvdEZlYXR1cmUiLCJsYXN0TW92ZSIsImVuZCIsImRlc3QiLCJ0dXJmIiwiZGVzdGluYXRpb24iLCJwb2ludCIsImRpc3RhbmNlIiwiZ2VvbWV0cnkiLCJjb29yZGluYXRlcyIsImxuZ0xhdHMiLCJsbmciLCJsb2NhdGlvbiIsImNvb3JkcyIsInVucHJvamVjdCIsInBhbiIsInNwZWVkIiwibWlkIiwic2V0QmVhcmluZyIsImJlYXJpbmdNdWx0aSIsImFicyIsInNldFBpdGNoIiwicGl0Y2hNdWx0aSIsInNldFpvb20iLCJvdXQiLCJzZXRTcGVlZCIsIm1hdGNoIiwiYnV0dG9uSWQiLCJwYXJzZUludCIsImxvZyIsIk1FU1NBR0VTIiwiSU5WQUxJRF9CVVRUT04iLCJtYXRjaGVzIiwiZGlyZWN0aW9uIiwib25Jbml0IiwiaW5pdGlhdGVkIiwiZ2V0Q29udGFpbmVyIiwiX2RlZmluZVByb3BlcnR5IiwibW9kZSIsIm9yaWdpbmFsRXZlbnQiLCJvbkRpc2Nvbm5lY3QiXSwic291cmNlUm9vdCI6IiJ9