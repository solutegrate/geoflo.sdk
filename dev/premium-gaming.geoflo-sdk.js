/*!
 * /*!
 *  * GeoFlo SDK
 *  * Version 1.0.11
 *  * Generated on: 2025-02-05T19:04:48.830Z
 *  * /
 */
"use strict";
(self["webpackChunk_solutegrate_geoflo_sdk"] = self["webpackChunk_solutegrate_geoflo_sdk"] || []).push([["premium-gaming"],{

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDLFVBQVUsQ0FBQyxDQUFDeEwsT0FBTyxDQUFDO0lBQ2xFLElBQUkrRyxPQUFPLENBQUMsV0FBVyxDQUFDLEVBQUUsSUFBSSxDQUFDL0csT0FBTyxDQUFDd0wsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDeEwsT0FBTyxDQUFDO0lBRXBFLElBQUkrRyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDL0csT0FBTyxDQUFDd0wsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDeEwsT0FBTyxDQUFDO0lBQ3BELElBQUkrRyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDL0csT0FBTyxDQUFDd0wsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDeEwsT0FBTyxDQUFDO0lBQ3BELElBQUkrRyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDL0csT0FBTyxDQUFDd0wsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDeEwsT0FBTyxDQUFDO0lBQ3BELElBQUkrRyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDL0csT0FBTyxDQUFDd0wsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDeEwsT0FBTyxDQUFDO0lBRXBELElBQUkrRyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUUsSUFBSSxDQUFDL0csT0FBTyxDQUFDd0wsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDeEwsT0FBTyxDQUFDO0lBQzVELElBQUkrRyxPQUFPLENBQUMsUUFBUSxDQUFDLEVBQUUsSUFBSSxDQUFDL0csT0FBTyxDQUFDd0wsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDeEwsT0FBTyxDQUFDO0lBQzlELElBQUkrRyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUUsSUFBSSxDQUFDL0csT0FBTyxDQUFDd0wsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDeEwsT0FBTyxDQUFDO0lBQzVELElBQUkrRyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsSUFBSSxDQUFDL0csT0FBTyxDQUFDd0wsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDeEwsT0FBTyxDQUFDO0lBQzFELElBQUkrRyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsSUFBSSxDQUFDL0csT0FBTyxDQUFDd0wsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDeEwsT0FBTyxDQUFDO0lBRTFELElBQUkrRyxPQUFPLENBQUMsUUFBUSxDQUFDLEVBQUUsSUFBSSxDQUFDL0csT0FBTyxDQUFDd0wsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDeEwsT0FBTyxDQUFDO0lBQzlELElBQUkrRyxPQUFPLENBQUMsVUFBVSxDQUFDLEVBQUUsSUFBSSxDQUFDL0csT0FBTyxDQUFDd0wsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDeEwsT0FBTyxDQUFDO0lBQ2xFLElBQUkrRyxPQUFPLENBQUMsVUFBVSxDQUFDLEVBQUUsSUFBSSxDQUFDL0csT0FBTyxDQUFDd0wsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDeEwsT0FBTyxDQUFDO0lBQ2xFLElBQUkrRyxPQUFPLENBQUMsV0FBVyxDQUFDLEVBQUUsSUFBSSxDQUFDL0csT0FBTyxDQUFDd0wsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDeEwsT0FBTyxDQUFDO0VBQ3hFLENBQUM7RUFFRCxJQUFJLENBQUNtUCxZQUFZLEdBQUcsVUFBVXhQLE9BQU8sRUFBRTtJQUNuQyxJQUFJLENBQUNBLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQ0EsT0FBTyxFQUFFLE9BQU8sS0FBSztJQUMzQyxJQUFJLElBQUksQ0FBQ0EsT0FBTyxDQUFDeUcsRUFBRSxLQUFLekcsT0FBTyxDQUFDeUcsRUFBRSxFQUFFLE1BQU0sSUFBSXRHLEtBQUssQ0FBQyw0QkFBNEIsQ0FBQztJQUNqRixJQUFJLENBQUNILE9BQU8sQ0FBQ2lKLE1BQU0sQ0FBQyxDQUFDO0lBQ3JCLElBQUksQ0FBQ2pKLE9BQU8sR0FBRyxJQUFJO0VBQ3ZCLENBQUM7RUFHRCxJQUFJLENBQUNvRyxJQUFJLENBQUNwRyxPQUFPLENBQUM7QUFDdEIsQ0FBQztBQUVELGlFQUFlRCxNQUFNIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vQHNvbHV0ZWdyYXRlL2dlb2Zsby1zZGsvLi9zcmMvR2FtaW5nLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQG1peGluXG4gKiBAbWVtYmVyb2YgbW9kdWxlOmdlb2Zsb1xuICogQG5hbWUgR2FtaW5nXG4gKiBAZGVzY3JpcHRpb24gVGhpcyBtb2R1bGUgcHJvdmlkZXMgdGhlIGdhbWVwYWQgZnVuY3Rpb25hbGl0eSBmb3IgdGhlIEdlb2ZsbyBhcHBsaWNhdGlvbi4gSXQgYWxsb3dzIHVzZXJzIHRvIGludGVyYWN0IHdpdGggdGhlIG1hcCB1c2luZyBhIGdhbWVwYWQgY29udHJvbGxlci5cbiAqIEBwYXJhbSB7T2JqZWN0fSBnYW1lcGFkIC0gVGhlIGdhbWVwYWQgb2JqZWN0IHRvIGJlIGluaXRpYWxpemVkLlxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBUaGUgb3B0aW9ucyBmb3IgZ2FtZXBhZCBpbml0aWFsaXphdGlvbi4gQ29tZXMgZnJvbSBnZW9GbG8ub3B0aW9ucy5nYW1lcGFkLlxuICogQHJldHVybnMge09iamVjdH0gVGhlIGN1cnJlbnQgb2JqZWN0IGluc3RhbmNlLlxuICovXG5jb25zdCBHYW1pbmcgPSBmdW5jdGlvbiAoZ2FtZXBhZCkge1xuICAgIGNvbnN0IGdlb2ZsbyA9IHRoaXMuZ2VvZmxvO1xuXG4gICAgaWYgKCFzdXBwb3J0ZWQoKSkgdGhyb3cgbmV3IEVycm9yKCdHYW1lcGFkcyBhcmUgbm90IHN1cHBvcnRlZCBvbiB5b3VyIGJyb3dzZXIhJyk7XG4gICAgXG4gICAgY29uc3QgY29udHJvbCA9IHRoaXM7XG5cbiAgICB0aGlzLm9wdGlvbnMgPSBnZW9mbG8ub3B0aW9ucy5nYW1lcGFkO1xuXG4gICAgY29uc3QgbGF5b3V0ID0ge1xuICAgICAgICBcInNlbGVjdFwiOiAnU2VsZWN0JyxcbiAgICAgICAgXCJzdGFydFwiOiAnU3RhcnQnLFxuICAgICAgICBcInBvd2VyXCI6ICdQb3dlcicsXG4gICAgICAgIFwiYnV0dG9uMFwiOiAnQicsXG4gICAgICAgIFwiYnV0dG9uMVwiOiAnQScsXG4gICAgICAgIFwiYnV0dG9uMlwiOiAnWScsXG4gICAgICAgIFwiYnV0dG9uM1wiOiAnWCcsXG4gICAgICAgIFwiYnV0dG9uNFwiOiAnQnVtcExlZnQnLFxuICAgICAgICBcImJ1dHRvbjVcIjogJ0J1bXBSaWdodCcsXG4gICAgICAgIFwiYnV0dG9uNlwiOiAnVHJpZ0xlZnQnLFxuICAgICAgICBcImJ1dHRvbjdcIjogJ1RyaWdSaWdodCcsXG4gICAgICAgIFwiYnV0dG9uOFwiOiAnU2VsZWN0JyxcbiAgICAgICAgXCJidXR0b245XCI6ICdTdGFydCcsXG4gICAgICAgIFwiYnV0dG9uMTBcIjogJ0pveUxlZnRDbGljaycsXG4gICAgICAgIFwiYnV0dG9uMTFcIjogJ0pveVJpZ2h0Q2xpY2snLFxuICAgICAgICBcImJ1dHRvbjEyXCI6ICdEcGFkVXAnLFxuICAgICAgICBcImJ1dHRvbjEzXCI6ICdEcGFkRG93bicsXG4gICAgICAgIFwiYnV0dG9uMTRcIjogJ0RwYWRMZWZ0JyxcbiAgICAgICAgXCJidXR0b24xNVwiOiAnRHBhZFJpZ2h0JyxcbiAgICAgICAgXCJidXR0b24xNlwiOiAnUG93ZXInLFxuICAgICAgICBcImJ1dHRvbjE3XCI6ICdNaXNjJyxcbiAgICAgICAgXCJ1cDBcIjogJ0pveUxlZnRVcCcsXG4gICAgICAgIFwiZG93bjBcIjogJ0pveUxlZnREb3duJyxcbiAgICAgICAgXCJyaWdodDBcIjogJ0pveUxlZnRSaWdodCcsXG4gICAgICAgIFwibGVmdDBcIjogJ0pveUxlZnRMZWZ0JyxcbiAgICAgICAgXCJ1cDFcIjogJ0pveVJpZ2h0VXAnLFxuICAgICAgICBcImRvd24xXCI6ICdKb3lSaWdodERvd24nLFxuICAgICAgICBcInJpZ2h0MVwiOiAnSm95UmlnaHRSaWdodCcsXG4gICAgICAgIFwibGVmdDFcIjogJ0pveVJpZ2h0TGVmdCcsXG4gICAgICAgIFwibDFcIjogJ0J1bXBMZWZ0JyxcbiAgICAgICAgXCJyMVwiOiAnQnVtcFJpZ2h0JyxcbiAgICAgICAgXCJsMlwiOiAnVHJpZ0xlZnQnLFxuICAgICAgICBcInIyXCI6ICdUcmlnUmlnaHQnXG4gICAgfVxuXG5cbiAgICBmdW5jdGlvbiBjbGFtcCh4LCB5KSB7XG4gICAgICAgIGxldCBtID0gTWF0aC5zcXJ0KHgqeCArIHkqeSk7IC8vIE1hZ25pdHVkZSAobGVuZ3RoKSBvZiB2ZWN0b3JcblxuICAgICAgICAvLyBJZiB0aGUgbGVuZ3RoIGdyZWF0ZXIgdGhhbiAxLCBub3JtYWxpemUgaXQgKHNldCBpdCB0byAxKVxuICAgICAgICBpZiAobSA+IDEpIHtcbiAgICAgICAgICAgIHggLz0gbTtcbiAgICAgICAgICAgIHkgLz0gbTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBbeCwgeV07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZGVhZHpvbmUoeCwgeSwgZGVhZHpvbmU9MC4yKSB7XG4gICAgICAgIGxldCBtID0gTWF0aC5zcXJ0KHgqeCArIHkqeSk7XG5cbiAgICAgICAgaWYgKG0gPCBkZWFkem9uZSlcbiAgICAgICAgICAgIHJldHVybiBbMCwgMF07XG5cbiAgICAgICAgbGV0IG92ZXIgPSBtIC0gZGVhZHpvbmU7ICAvLyAwIC0+IDEgLSBERUFEWk9ORVxuICAgICAgICBsZXQgbm92ZXIgPSBvdmVyIC8gKDEgLSBkZWFkem9uZSk7ICAvLyAwIC0+IDFcblxuICAgICAgICBsZXQgbnggPSB4IC8gbTtcbiAgICAgICAgbGV0IG55ID0geSAvIG07XG5cbiAgICAgICAgcmV0dXJuIFtueCAqIG5vdmVyLCBueSAqIG5vdmVyXTtcbiAgICAgICAgXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVxdWVzdCgpIHtcbiAgICAgICAgY29udHJvbC5yZWZyZXNoKCk7XG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShyZXF1ZXN0KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzdXBwb3J0ZWQoKSB7XG4gICAgICAgIHJldHVybiAod2luZG93Lm5hdmlnYXRvci5nZXRHYW1lcGFkcyAmJiB0eXBlb2Ygd2luZG93Lm5hdmlnYXRvci5nZXRHYW1lcGFkcyA9PT0gJ2Z1bmN0aW9uJykgfHxcbiAgICAgICAgICAgICh3aW5kb3cubmF2aWdhdG9yLmdldEdhbWVwYWRzICYmIHR5cGVvZiB3aW5kb3cubmF2aWdhdG9yLndlYmtpdEdldEdhbWVwYWRzID09PSAnZnVuY3Rpb24nKSB8fFxuICAgICAgICAgICAgZmFsc2U7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcXMocywgcCkge1xuICAgICAgICBpZiAocCkge1xuICAgICAgICAgICAgcmV0dXJuIHAucXVlcnlTZWxlY3RvcihzKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbihldmVudE5hbWUsIGNhbGxiYWNrKSB7XG4gICAgICAgIHJldHVybiBjb250cm9sLmFzc29jaWF0ZUV2ZW50KGV2ZW50TmFtZSwgY2FsbGJhY2ssICdhY3Rpb24nKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhZnRlcihldmVudE5hbWUsIGNhbGxiYWNrKSB7XG4gICAgICAgIHJldHVybiBjb250cm9sLmFzc29jaWF0ZUV2ZW50KGV2ZW50TmFtZSwgY2FsbGJhY2ssICdhZnRlcicpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGJlZm9yZShldmVudE5hbWUsIGNhbGxiYWNrKSB7XG4gICAgICAgIHJldHVybiBjb250cm9sLmFzc29jaWF0ZUV2ZW50KGV2ZW50TmFtZSwgY2FsbGJhY2ssICdiZWZvcmUnKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhZGRFdmVudExpc3RlbmVycyhfdGhpcywgZ2FtZXBhZCkge1xuICAgICAgICBpZiAoIWdhbWVwYWQgfHwgIWxheW91dCkgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgIE9iamVjdC5lbnRyaWVzKGxheW91dCkuZm9yRWFjaChmdW5jdGlvbiAoZW50cnkpIHtcbiAgICAgICAgICAgIHZhciBrZXkgPSBlbnRyeVswXTtcbiAgICAgICAgICAgIHZhciB2YWwgPSBlbnRyeVsxXTtcblxuICAgICAgICAgICAgYmVmb3JlKGtleSwgZnVuY3Rpb24gKHZhbHVlKSB7IHJldHVybiBfdGhpcy5vbkV2ZW50KCdwcmVzcycsIGtleSwgdmFsLCB2YWx1ZSk7IH0pO1xuICAgICAgICAgICAgb24oa2V5LCBmdW5jdGlvbiAodmFsdWUpIHsgcmV0dXJuIF90aGlzLm9uRXZlbnQoJ2hvbGQnLCBrZXksIHZhbCwgdmFsdWUpOyB9KTtcbiAgICAgICAgICAgIGFmdGVyKGtleSwgZnVuY3Rpb24gKHZhbHVlKSB7IHJldHVybiBfdGhpcy5vbkV2ZW50KCdyZWxlYXNlJywga2V5LCB2YWwsIHZhbHVlKTsgfSk7XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZGVlcEFzc2lnbih0YXJnZXQsIHNvdXJjZSwge2lzTXV0YXRpbmdPayA9IGZhbHNlLCBpc1N0cmljdGx5U2FmZSA9IGZhbHNlfSA9IHt9KSB7XG4gICAgICAgIHRhcmdldCA9IGlzTXV0YXRpbmdPayA/IHRhcmdldCA6IGNsb25lKHRhcmdldCwgaXNTdHJpY3RseVNhZmUpO1xuXG4gICAgICAgIGZvciAoY29uc3QgW2tleSwgdmFsXSBvZiBPYmplY3QuZW50cmllcyhzb3VyY2UpKSB7XG4gICAgICAgICAgICBpZiAodmFsICE9PSBudWxsICYmIHR5cGVvZiB2YWwgPT09IGBvYmplY3RgKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRhcmdldFtrZXldID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0W2tleV0gPSB7fTtcbiAgICAgICAgICAgICAgICB9XG4gICAgXG4gICAgICAgICAgICAgICAgdGFyZ2V0W2tleV0gPSBkZWVwQXNzaWduKHRhcmdldFtrZXldLCB2YWwsIHtpc011dGF0aW5nT2s6IHRydWUsIGlzU3RyaWN0bHlTYWZlfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRhcmdldFtrZXldID0gdmFsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gY2xvbmUob2JqLCBpc1N0cmljdGx5U2FmZSA9IGZhbHNlKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHJldHVybiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KG9iaikpO1xuICAgICAgICAgICAgfSBjYXRjaChlcnIpIHtcbiAgICAgICAgICAgICAgICBpZiAoaXNTdHJpY3RseVNhZmUpIHsgdGhyb3cgbmV3IEVycm9yKCkgfVxuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihgVW5zYWZlIGNsb25lIG9mIG9iamVjdGAsIG9iaik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsuLi5vYmp9O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRhcmdldDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjYWxjdWxhdGVJbnRlcm1lZGlhdGVQb2ludChwb2ludDEsIHBvaW50MiwgcGVyYykge1xuICAgICAgICB2YXIgbGF0MSA9IGRlZ3JlZXNUb1JhZGlhbnMocG9pbnQxWzFdKTtcbiAgICAgICAgdmFyIGxuZzEgPSBkZWdyZWVzVG9SYWRpYW5zKHBvaW50MVswXSk7XG4gICAgICAgIHZhciBsYXQyID0gZGVncmVlc1RvUmFkaWFucyhwb2ludDJbMV0pO1xuICAgICAgICB2YXIgbG5nMiA9IGRlZ3JlZXNUb1JhZGlhbnMocG9pbnQyWzBdKTtcblxuICAgICAgICB2YXIgZGVsdGFMYXQgPSBsYXQyIC0gbGF0MTtcbiAgICAgICAgdmFyIGRlbHRhTG5nID0gbG5nMiAtIGxuZzE7XG4gICAgICAgIFxuICAgICAgICB2YXIgY2FsY0EgPSBNYXRoLnNpbihkZWx0YUxhdCAvIDIpICogTWF0aC5zaW4oZGVsdGFMYXQgLyAyKSArIE1hdGguY29zKGxhdDEpICogTWF0aC5jb3MobGF0MikgKiBNYXRoLnNpbihkZWx0YUxuZyAvIDIpICogTWF0aC5zaW4oZGVsdGFMbmcgLyAyKTtcbiAgICAgICAgdmFyIGNhbGNCID0gMiAqIE1hdGguYXRhbjIoTWF0aC5zcXJ0KGNhbGNBKSwgTWF0aC5zcXJ0KDEgLSBjYWxjQSkpO1xuICAgICAgICBcbiAgICAgICAgdmFyIEEgPSBNYXRoLnNpbigoMSAtIHBlcmMpICogY2FsY0IpIC8gTWF0aC5zaW4oY2FsY0IpO1xuICAgICAgICB2YXIgQiA9IE1hdGguc2luKHBlcmMgKiBjYWxjQikgLyBNYXRoLnNpbihjYWxjQik7XG4gICAgICAgIFxuICAgICAgICB2YXIgeCA9IEEgKiBNYXRoLmNvcyhsYXQxKSAqIE1hdGguY29zKGxuZzEpICsgQiAqIE1hdGguY29zKGxhdDIpICogTWF0aC5jb3MobG5nMik7XG4gICAgICAgIHZhciB5ID0gQSAqIE1hdGguY29zKGxhdDEpICogTWF0aC5zaW4obG5nMSkgKyBCICogTWF0aC5jb3MobGF0MikgKiBNYXRoLnNpbihsbmcyKTtcbiAgICAgICAgdmFyIHogPSBBICogTWF0aC5zaW4obGF0MSkgKyBCICogTWF0aC5zaW4obGF0Mik7XG4gICAgICAgIFxuICAgICAgICB2YXIgbGF0MyA9IE1hdGguYXRhbjIoeiwgTWF0aC5zcXJ0KHggKiB4ICsgeSAqIHkpKTtcbiAgICAgICAgdmFyIGxuZzMgPSBNYXRoLmF0YW4yKHksIHgpO1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIFtyYWRpYW5zVG9EZWdyZWVzKGxuZzMpLCByYWRpYW5zVG9EZWdyZWVzKGxhdDMpXVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBvaW50QXRQZXJjZW50KHAwLCBwMSwgcGVyY2VudCkge1xuICAgICAgICB2YXIgeDtcbiAgICAgICAgaWYgKHAwLnggIT09IHAxLngpXG4gICAgICAgICAgICB4ID0gcDAueCArIHBlcmNlbnQgKiAocDEueCAtIHAwLngpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICB4ID0gcDAueDtcbiAgICBcbiAgICAgICAgdmFyIHk7XG4gICAgICAgIGlmIChwMC55ICE9PSBwMS55KVxuICAgICAgICAgICAgeSA9IHAwLnkgKyBwZXJjZW50ICogKHAxLnkgLSBwMC55KTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgeSA9IHAwLnk7XG4gICAgXG4gICAgICAgIHZhciBwID0ge1xuICAgICAgICAgICAgeDogeCxcbiAgICAgICAgICAgIHk6IHlcbiAgICAgICAgfTtcbiAgICBcbiAgICAgICAgcmV0dXJuIHA7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZGVncmVlc1RvUmFkaWFucyhkZWdyZWVzKSB7XG4gICAgICAgIHJldHVybiBkZWdyZWVzICogKE1hdGguUEkgLyAxODApO1xuICAgIH1cbiAgICAgICAgXG4gICAgZnVuY3Rpb24gcmFkaWFuc1RvRGVncmVlcyhyYWRpYW5zKSB7XG4gICAgICAgIHJldHVybiByYWRpYW5zICogKDE4MCAvIE1hdGguUEkgKTtcbiAgICB9XG5cbiAgICBcblxuXG5cblxuXG5cdC8qKlxuXHQgKiBAZnVuY3Rpb25cbiAgICAgKiBAbWVtYmVyb2YgbW9kdWxlOmdlb2Zsby5HYW1pbmdcblx0ICogQG5hbWUgaW5pdFxuXHQgKiBAZGVzY3JpcHRpb24gVGhpcyBmdW5jdGlvbiBpbml0aWFsaXplcyB0aGUgZ2FtZXBhZCB3aXRoIHRoZSBzcGVjaWZpZWQgb3B0aW9ucy4gSXQgZmlyZXMgYW4gZXZlbnQgdG8gbm90aWZ5IHRoZSBnYW1lcGFkIGluaXRpYWxpemF0aW9uLCBzZXRzIHRoZSBnYW1lcGFkLCBhZGRzIGV2ZW50IGxpc3RlbmVycywgYW5kIHJlcXVlc3RzIGFuaW1hdGlvbiBmcmFtZS5cblx0ICogQHBhcmFtIHtPYmplY3R9IGdhbWVwYWQgLSBUaGUgZ2FtZXBhZCBvYmplY3QgdG8gYmUgaW5pdGlhbGl6ZWQuXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gVGhlIG9wdGlvbnMgZm9yIGdhbWVwYWQgaW5pdGlhbGl6YXRpb24uXG5cdCAqIEByZXR1cm5zIHtPYmplY3R9IFRoZSBjdXJyZW50IG9iamVjdCBpbnN0YW5jZS5cblx0ICovXG4gICAgdGhpcy5pbml0ID0gZnVuY3Rpb24gKGdhbWVwYWQsIG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKCFnYW1lcGFkKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIGlmICghdGhpcy5vcHRpb25zLmVuYWJsZSkgcmV0dXJuIGNvbnNvbGUuZXJyb3IoJ0dhbWVwYWQgb3B0aW9uIGlzIG5vdCBlbmFibGVkIScpXG4gICAgICAgIGdlb2Zsby5tYXAuZmlyZShnZW9mbG8uaWQgKyAnOmdhbWVwYWQuaW5pdCcsIHsgZGV0YWlsOiB7IGdhbWVwYWQ6IGdhbWVwYWQgfSB9KTtcbiAgICAgICAgdGhpcy5zZXRHYW1lcGFkKGdhbWVwYWQpO1xuICAgICAgICBhZGRFdmVudExpc3RlbmVycyh0aGlzLCB0aGlzLmdhbWVwYWQpO1xuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUocmVxdWVzdCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuXHQvKipcblx0ICogQGZ1bmN0aW9uXG4gICAgICogQG1lbWJlcm9mIG1vZHVsZTpnZW9mbG8uR2FtaW5nXG5cdCAqIEBuYW1lIHJlZnJlc2hcblx0ICogQGRlc2NyaXB0aW9uIFJlZnJlc2hlcyB0aGUgZ2FtZXBhZCBzdGF0ZSBieSBjaGVja2luZyBidXR0b24gcHJlc3NlcywgYXhlcyB2YWx1ZXMsIGFuZCB0cmlnZ2Vycy5cblx0ICogQHBhcmFtcyB7dm9pZH1cblx0ICogQHJldHVybnMge3ZvaWR9XG5cdCAqL1xuICAgIHRoaXMucmVmcmVzaCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGdhbWVwYWRzID0gd2luZG93Lm5hdmlnYXRvci5nZXRHYW1lcGFkcygpO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZ2FtZXBhZHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBnYW1lcGFkID0gZ2FtZXBhZHNbdGhpcy5nYW1lcGFkLmlkXTtcbiAgICAgICAgICAgIHZhciBqO1xuXG4gICAgICAgICAgICBpZiAoIWdhbWVwYWQgfHwgIWdhbWVwYWQuY29ubmVjdGVkKSB7IGNvbnRpbnVlOyB9XG5cbiAgICAgICAgICAgIGZvciAoaiA9IDA7IGogPCBnYW1lcGFkLmJ1dHRvbnMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgYnV0dG9uID0gZ2FtZXBhZC5idXR0b25zW2pdO1xuICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9IGJ1dHRvbi52YWx1ZTtcbiAgICAgICAgICAgICAgICB2YXIgbmFtZSA9IHRoaXMuZ2FtZXBhZC5sYXlvdXRbYGJ1dHRvbiR7an1gXVxuXG4gICAgICAgICAgICAgICAgaWYgKGJ1dHRvbi5wcmVzc2VkKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5nYW1lcGFkLnByZXNzZWRbbmFtZV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZXBhZC5wcmVzc2VkW25hbWVdID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZXBhZC5idXR0b25BY3Rpb25zW2pdLmJlZm9yZSA/IHRoaXMuZ2FtZXBhZC5idXR0b25BY3Rpb25zW2pdLmJlZm9yZSh2YWx1ZSkgOiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZXBhZC5idXR0b25BY3Rpb25zW2pdLmFjdGlvbiA/IHRoaXMuZ2FtZXBhZC5idXR0b25BY3Rpb25zW2pdLmFjdGlvbih2YWx1ZSkgOiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZ2FtZXBhZC5wcmVzc2VkW25hbWVdKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLmdhbWVwYWQucHJlc3NlZFtuYW1lXTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lcGFkLmJ1dHRvbkFjdGlvbnNbal0uYWZ0ZXIgPyB0aGlzLmdhbWVwYWQuYnV0dG9uQWN0aW9uc1tqXS5hZnRlcih2YWx1ZSkgOiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBheGVzQm94Q291bnQgPSAoKGdhbWVwYWQuYXhlcy5sZW5ndGggKyAxKSAvIDIpfDA7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICBmb3IgKGogPSAwOyBqIDwgYXhlc0JveENvdW50OyBqKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgdmFsdWVYLCB2YWx1ZVksIHZhbHVlO1xuICAgICAgICAgICAgICAgIHZhciBsYXN0X29kZF9heGlzID0gaiA9PSBheGVzQm94Q291bnQgLSAxICYmIGdhbWVwYWQuYXhlcy5sZW5ndGggJSAyID09IDE7XG5cbiAgICAgICAgICAgICAgICB2YWx1ZVggPSBnYW1lcGFkLmF4ZXNbaioyXTtcbiAgICAgICAgICAgICAgICB2YWx1ZVkgPSBsYXN0X29kZF9heGlzID8gMCA6IGdhbWVwYWQuYXhlc1tqKjIgKyAxXTtcbiAgICAgICAgICAgICAgICBbdmFsdWVYLCB2YWx1ZVldID0gZGVhZHpvbmUodmFsdWVYLCB2YWx1ZVkpOyAgICBcbiAgICAgICAgICAgICAgICBbdmFsdWVYLCB2YWx1ZVldID0gY2xhbXAodmFsdWVYLCB2YWx1ZVkpO1xuICAgICAgICAgICAgICAgIHZhbHVlID0gW051bWJlcih2YWx1ZVgudG9GaXhlZCgyKSksIE51bWJlcih2YWx1ZVkudG9GaXhlZCgyKSldO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgdmFsID0gZ2FtZXBhZC5heGVzW2ogKyBheGVzQm94Q291bnRdLnRvRml4ZWQoNCk7XG4gICAgICAgICAgICAgICAgY29uc3QgYXhlID0gTWF0aC5mbG9vcihqIC8gMik7XG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lcGFkLmF4ZVZhbHVlc1theGVdW2ogJSAyXSA9IHZhbDtcblxuICAgICAgICAgICAgICAgIHZhciByaWdodFRyaWdnZXIgPSB2YWx1ZVswXSA+PSB0aGlzLm9wdGlvbnMuam95c3RpY2subWluO1xuICAgICAgICAgICAgICAgIHZhciBsZWZ0VHJpZ2dlciA9IHZhbHVlWzBdIDw9IC10aGlzLm9wdGlvbnMuam95c3RpY2subWluO1xuICAgICAgICAgICAgICAgIHZhciB1cFRyaWdnZXIgPSB2YWx1ZVsxXSA8PSAtdGhpcy5vcHRpb25zLmpveXN0aWNrLm1pbjtcbiAgICAgICAgICAgICAgICB2YXIgZG93blRyaWdnZXIgPSB2YWx1ZVsxXSA+PSB0aGlzLm9wdGlvbnMuam95c3RpY2subWluO1xuXG4gICAgICAgICAgICAgICAgdGhpcy50cmlnZ2VyKCdyaWdodCcsIHJpZ2h0VHJpZ2dlciwgaiwgdmFsdWUpO1xuICAgICAgICAgICAgICAgIHRoaXMudHJpZ2dlcignbGVmdCcsIGxlZnRUcmlnZ2VyLCBqLCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgdGhpcy50cmlnZ2VyKCdkb3duJywgZG93blRyaWdnZXIsIGosIHZhbHVlKTtcbiAgICAgICAgICAgICAgICB0aGlzLnRyaWdnZXIoJ3VwJywgdXBUcmlnZ2VyLCBqLCB2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cblx0LyoqXG5cdCAqIEBmdW5jdGlvblxuICAgICAqIEBtZW1iZXJvZiBtb2R1bGU6Z2VvZmxvLkdhbWluZ1xuXHQgKiBAbmFtZSB0cmlnZ2VyXG5cdCAqIEBkZXNjcmlwdGlvbiBUaGlzIGZ1bmN0aW9uIGhhbmRsZXMgdHJpZ2dlcmluZyBhY3Rpb25zIGJhc2VkIG9uIGdhbWVwYWQgaW5wdXQuIEl0IGNoZWNrcyBpZiBhIHNwZWNpZmljIGJ1dHRvbiBvciBheGlzIGlzIHRyaWdnZXJlZCBhbmQgcGVyZm9ybXMgY29ycmVzcG9uZGluZyBhY3Rpb25zLlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gaWQgLSBUaGUgaWRlbnRpZmllciBvZiB0aGUgZ2FtZXBhZCBpbnB1dC5cblx0ICogQHBhcmFtIHtib29sZWFufSB0cmlnZ2VyZWQgLSBJbmRpY2F0ZXMgaWYgdGhlIGlucHV0IGlzIHRyaWdnZXJlZC5cblx0ICogQHBhcmFtIHtudW1iZXJ9IGluZGV4IC0gVGhlIGluZGV4IG9mIHRoZSBpbnB1dC5cblx0ICogQHBhcmFtIHtudW1iZXJbXX0gdmFsdWUgLSBUaGUgdmFsdWUgb2YgdGhlIGlucHV0LlxuXHQgKi9cbiAgICB0aGlzLnRyaWdnZXIgPSBmdW5jdGlvbiAoaWQsIHRyaWdnZXJlZCwgaW5kZXgsIHZhbHVlKSB7XG4gICAgICAgIHZhciBhY3Rpb25zID0gdGhpcy5nYW1lcGFkLmF4ZXNBY3Rpb25zO1xuICAgICAgICB2YXIgbmFtZSA9IHRoaXMuZ2FtZXBhZC5sYXlvdXRbYCR7aWR9JHtpbmRleH1gXTtcbiAgICAgICAgdmFyIHByZXNzZWQgPSB0aGlzLmdhbWVwYWQucHJlc3NlZFxuXG4gICAgICAgIGlmICh0cmlnZ2VyZWQpIHtcbiAgICAgICAgICAgIGlmICghcHJlc3NlZFtuYW1lXSkge1xuICAgICAgICAgICAgICAgIHByZXNzZWRbbmFtZV0gPSB0cnVlO1xuICAgICAgICAgICAgICAgIGFjdGlvbnNbaW5kZXhdW2lkXS5iZWZvcmUgPyBhY3Rpb25zW2luZGV4XVtpZF0uYmVmb3JlKHZhbHVlKSA6IGZhbHNlXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhbHVlID0gW3RoaXMub3B0aW9ucy5qb3lzdGljay5tYXggKiB2YWx1ZVswXSwgdGhpcy5vcHRpb25zLmpveXN0aWNrLm1heCAqIHZhbHVlWzFdXVxuICAgICAgICAgICAgYWN0aW9uc1tpbmRleF1baWRdLmFjdGlvbiA/IGFjdGlvbnNbaW5kZXhdW2lkXS5hY3Rpb24odmFsdWUpIDogZmFsc2U7XG4gICAgICAgIH0gZWxzZSBpZiAocHJlc3NlZFtuYW1lXSkge1xuICAgICAgICAgICAgZGVsZXRlIHByZXNzZWRbbmFtZV07XG5cbiAgICAgICAgICAgIGlmICghcHJlc3NlZFsnSm95TGVmdFVwJ10gJiYgIXByZXNzZWRbJ0pveUxlZnREb3duJ10gJiYgIXByZXNzZWRbJ0pveUxlZnRMZWZ0J10gJiYgIXByZXNzZWRbJ0pveUxlZnRSaWdodCddKSB7XG4gICAgICAgICAgICAgICAgYWN0aW9uc1swXVtpZF0uYWZ0ZXIgPyBhY3Rpb25zWzBdW2lkXS5hZnRlcih2YWx1ZSkgOiBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCFwcmVzc2VkWydKb3lSaWdodFVwJ10gJiYgIXByZXNzZWRbJ0pveVJpZ2h0RG93biddICYmICFwcmVzc2VkWydKb3lSaWdodExlZnQnXSAmJiAhcHJlc3NlZFsnSm95UmlnaHRSaWdodCddKSB7XG4gICAgICAgICAgICAgICAgYWN0aW9uc1sxXVtpZF0uYWZ0ZXIgPyBhY3Rpb25zWzFdW2lkXS5hZnRlcih2YWx1ZSkgOiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuXHQgKiBAZnVuY3Rpb25cbiAgICAgKiBAbWVtYmVyb2YgbW9kdWxlOmdlb2Zsby5HYW1pbmdcblx0ICogQG5hbWUgcmVtb3ZlXG5cdCAqIEBkZXNjcmlwdGlvbiBEaXNjb25uZWN0cyBhbmQgcmVtb3ZlcyB0aGUgZ2FtZXBhZCBvYmplY3QuXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBnYW1lcGFkIC0gVGhlIGdhbWVwYWQgb2JqZWN0IHRvIGJlIGRpc2Nvbm5lY3RlZCBhbmQgcmVtb3ZlZC5cblx0ICogQHJldHVybnMge3ZvaWR9XG5cdCAqL1xuICAgIHRoaXMucmVtb3ZlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuZ2FtZXBhZC5kaXNjb25uZWN0ID8gdGhpcy5nYW1lcGFkLmRpc2Nvbm5lY3QoKSA6IGZhbHNlO1xuICAgICAgICB0aGlzLmdhbWVwYWQucmVtb3ZlID8gdGhpcy5nYW1lcGFkLnJlbW92ZSgpIDogZmFsc2U7XG4gICAgICAgIHRoaXMuZ2FtZXBhZCA9IG51bGw7XG4gICAgfVxuXG5cblxuXG5cdC8qKlxuXHQgKiBAZnVuY3Rpb25cbiAgICAgKiBAbWVtYmVyb2YgbW9kdWxlOmdlb2Zsby5HYW1pbmdcblx0ICogQG5hbWUgc2V0TWFwXG5cdCAqIEBkZXNjcmlwdGlvbiBUaGlzIGZ1bmN0aW9uIHVwZGF0ZXMgdGhlIG1hcCBwcm9wZXJ0aWVzIHVzaW5nIHRoZSBoYW5kbGVNb3ZlIGZ1bmN0aW9uIGFuZCBzZXRzIHRoZSBjZW50ZXIsIHpvb20sIHBpdGNoLCBhbmQgYmVhcmluZyBhY2NvcmRpbmdseS5cblx0ICogQHBhcmFtIHtGdW5jdGlvbn0gaGFuZGxlTW92ZSAtIFRoZSBmdW5jdGlvbiB1c2VkIHRvIGhhbmRsZSBtYXAgbW92ZW1lbnQuXG5cdCAqIEByZXR1cm5zIHtPYmplY3R9IFRoZSB1cGRhdGVkIG1hcCBvYmplY3Qgd2l0aCBuZXcgcHJvcGVydGllcy5cblx0ICovXG4gICAgdGhpcy5zZXRNYXAgPSBmdW5jdGlvbiAoaGFuZGxlTW92ZSkge1xuICAgICAgICBjb25zdCBtYXAgPSBnZW9mbG8ubWFwO1xuICAgICAgICBjb25zdCB0cmFuc2Zvcm0gPSBtYXAudHJhbnNmb3JtO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5tYXAgPSB0aGlzLm1hcCB8fCB7XG4gICAgICAgICAgICBjZW50ZXI6IG1hcC5nZXRDZW50ZXIoKSxcbiAgICAgICAgICAgIHpvb206IG1hcC5nZXRab29tKCksXG4gICAgICAgICAgICBwaXRjaDogbWFwLmdldFBpdGNoKCksXG4gICAgICAgICAgICBiZWFyaW5nOiBtYXAuZ2V0QmVhcmluZygpXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHZhciBjZW50ZXIgPSB0aGlzLm1hcC5jZW50ZXIueCA/IHRoaXMubWFwLmNlbnRlciA6IHRoaXMubWFwLmNlbnRlci5sYXQgPyB0aGlzLm1hcC5jZW50ZXIgOiBuZXcgbWFwYm94Z2wuTG5nTGF0KHRoaXMubWFwLmNlbnRlclswXSwgdGhpcy5tYXAuY2VudGVyWzFdKVxuICAgICAgICBjZW50ZXIgPSBjZW50ZXIueCA/IHRyYW5zZm9ybS5wb2ludExvY2F0aW9uKGNlbnRlcikgOiBjZW50ZXI7XG5cbiAgICAgICAgdHJhbnNmb3JtLmNlbnRlciA9IGNlbnRlcjtcbiAgICAgICAgdHJhbnNmb3JtLmJlYXJpbmcgPSB0aGlzLm1hcC5iZWFyaW5nO1xuICAgICAgICB0cmFuc2Zvcm0uem9vbSA9IHRoaXMubWFwLnpvb207XG4gICAgICAgIHRyYW5zZm9ybS5waXRjaCA9IHRoaXMubWFwLnBpdGNoO1xuXG4gICAgICAgIG1hcC5fdXBkYXRlKCk7XG5cbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5jcm9zc2hhaXJzICYmIGdlb2Zsby5jZW50ZXJNYXJrZXIpIHRoaXMuc2V0TWFya2VyKCk7XG4gICAgICAgIGlmIChoYW5kbGVNb3ZlKSBnZW9mbG8uY3VycmVudE1vZGUuaGFuZGxlTW92ZSh7IGxuZ0xhdDogIXRoaXMub3B0aW9ucy5jYW1lcmEuZnJlZSA/IHRoaXMubWFwLmNlbnRlciA6IG1hcC5nZXRDZW50ZXIoKSwgZ2FtZXBhZDogdGhpcyB9KVxuICAgICAgICByZXR1cm4gdGhpcy5tYXA7XG4gICAgfVxuXG5cdC8qKlxuXHQgKiBAZnVuY3Rpb25cbiAgICAgKiBAbWVtYmVyb2YgbW9kdWxlOmdlb2Zsby5HYW1pbmdcblx0ICogQG5hbWUgc2V0Q29udGFpbmVyXG5cdCAqIEBkZXNjcmlwdGlvbiBDcmVhdGVzIGEgbmV3IEhUTUwgZWxlbWVudCB3aXRoIHRoZSBzcGVjaWZpZWQgdGFnIG5hbWUgYW5kIGNsYXNzIG5hbWUsIGFwcGVuZHMgaXQgdG8gYSBjb250YWluZXIgaWYgcHJvdmlkZWQsIGFuZCBzZXRzIGl0IGFzIHRoZSBjb250YWluZXIgcHJvcGVydHkgb2YgdGhlIGN1cnJlbnQgb2JqZWN0LlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gdGFnTmFtZSAtIFRoZSB0YWcgbmFtZSBvZiB0aGUgSFRNTCBlbGVtZW50IHRvIGNyZWF0ZS5cblx0ICogQHBhcmFtIHtzdHJpbmd9IGNsYXNzTmFtZSAtIFRoZSBjbGFzcyBuYW1lIHRvIGFzc2lnbiB0byB0aGUgY3JlYXRlZCBlbGVtZW50IChvcHRpb25hbCkuXG5cdCAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGNvbnRhaW5lciAtIFRoZSBjb250YWluZXIgZWxlbWVudCB0byBhcHBlbmQgdGhlIGNyZWF0ZWQgZWxlbWVudCB0byAob3B0aW9uYWwpLlxuXHQgKiBAcmV0dXJucyB7SFRNTEVsZW1lbnR9IFRoZSBjcmVhdGVkIEhUTUwgZWxlbWVudC5cblx0ICovXG5cdFxuICAgIHRoaXMuc2V0Q29udGFpbmVyID0gZnVuY3Rpb24gKHRhZ05hbWUsIGNsYXNzTmFtZSwgY29udGFpbmVyKSB7XG4gICAgICAgIGNvbnN0IGVsID0gd2luZG93LmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnTmFtZSk7XG4gICAgICAgIGlmIChjbGFzc05hbWUgIT09IHVuZGVmaW5lZCkgZWwuY2xhc3NOYW1lID0gY2xhc3NOYW1lO1xuICAgICAgICBpZiAoY29udGFpbmVyKSBjb250YWluZXIuYXBwZW5kQ2hpbGQoZWwpO1xuICAgICAgICB0aGlzLmNvbnRhaW5lciA9IGVsO1xuICAgICAgICByZXR1cm4gZWw7XG4gICAgfVxuXG5cdC8qKlxuXHQgKiBAZnVuY3Rpb25cbiAgICAgKiBAbWVtYmVyb2YgbW9kdWxlOmdlb2Zsby5HYW1pbmcgXG5cdCAqIEBuYW1lIHNldExvY2F0aW9uXG5cdCAqIEBkZXNjcmlwdGlvbiBUaGlzIGZ1bmN0aW9uIHVwZGF0ZXMgdGhlIHZpc2liaWxpdHksIGxlZnQsIGFuZCB0b3AgcHJvcGVydGllcyBvZiB0aGUgY29udGFpbmVyIGVsZW1lbnQgYmFzZWQgb24gdGhlIHByb3ZpZGVkIHZhbHVlLlxuXHQgKiBAcGFyYW0ge0FycmF5PG51bWJlcj59IHZhbHVlIC0gQW4gYXJyYXkgY29udGFpbmluZyB0aGUgeCBhbmQgeSBjb29yZGluYXRlcyBmb3IgdGhlIG5ldyBsb2NhdGlvbi5cblx0ICogQHJldHVybnMge0RPTVJlY3R9IFRoZSBib3VuZGluZyByZWN0YW5nbGUgb2YgdGhlIGNvbnRhaW5lciBlbGVtZW50IGFmdGVyIHRoZSBsb2NhdGlvbiBpcyBzZXQuXG5cdCAqL1xuICAgIHRoaXMuc2V0TG9jYXRpb24gPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgdGhpcy5jb250YWluZXIuc3R5bGUudmlzaWJpbGl0eSA9IHRoaXMub3B0aW9ucy5kZWJ1ZyA/ICd2aXNpYmxlJyA6ICdoaWRkZW4nO1xuICAgICAgICB0aGlzLmNvbnRhaW5lci5zdHlsZS5sZWZ0ID0gKHZhbHVlWzBdICsgMSkgLyAyICogMTAwICsgJyUnO1xuICAgICAgICB0aGlzLmNvbnRhaW5lci5zdHlsZS50b3AgPSAodmFsdWVbMV0gKyAxKSAvIDIgKiAxMDAgKyAnJSc7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRhaW5lci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICB9XG5cblx0LyoqXG5cdCAqIEBmdW5jdGlvblxuICAgICAqIEBtZW1iZXJvZiBtb2R1bGU6Z2VvZmxvLkdhbWluZ1xuXHQgKiBAbmFtZSBzZXRNYXJrZXJcblx0ICogQGRlc2NyaXB0aW9uIFNldHMgYSBtYXJrZXIgb24gdGhlIG1hcCB1c2luZyB0aGUgY2VudGVyIGNvb3JkaW5hdGVzIHByb3ZpZGVkIGJ5IHRoZSBjb250ZXh0LlxuXHQgKiBAcmV0dXJuIHtPYmplY3R9IFJldHVybnMgdGhlIG1hcmtlciBvYmplY3QgY3JlYXRlZCBvbiB0aGUgbWFwLlxuXHQgKi9cbiAgICB0aGlzLnNldE1hcmtlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGdlb2Zsby5zZXRDZW50ZXJNYXJrZXIoeyBnYW1lcGFkOiB0cnVlIH0pO1xuICAgIH1cblxuXHQvKipcblx0ICogQGZ1bmN0aW9uXG4gICAgICogQG1lbWJlcm9mIG1vZHVsZTpnZW9mbG8uR2FtaW5nXG5cdCAqIEBuYW1lIHNldEdhbWVwYWRcblx0ICogQGRlc2NyaXB0aW9uIEluaXRpYWxpemVzIGEgZ2FtZXBhZCBvYmplY3Qgd2l0aCBzcGVjaWZpYyBwcm9wZXJ0aWVzIGJhc2VkIG9uIHRoZSBwcm92aWRlZCBnYW1lcGFkIGlucHV0LlxuXHQgKiBAcGFyYW0ge09iamVjdH0gZ2FtZXBhZCAtIFRoZSBnYW1lcGFkIG9iamVjdCB0byBiZSBwcm9jZXNzZWQuXG5cdCAqIEByZXR1cm5zIHtPYmplY3R9IC0gVGhlIHByb2Nlc3NlZCBnYW1lcGFkIG9iamVjdCB3aXRoIGRlZmluZWQgcHJvcGVydGllcy5cblx0ICovXG4gICAgdGhpcy5zZXRHYW1lcGFkID0gZnVuY3Rpb24gKGdhbWVwYWQpIHtcbiAgICAgICAgdmFyIG9wdGlvbnMgPSB7XG4gICAgICAgICAgICB0eXBlOiBnYW1lcGFkLmlkLFxuICAgICAgICAgICAgY29ubmVjdGVkOiBnYW1lcGFkLmNvbm5lY3RlZCxcbiAgICAgICAgICAgIGlkOiBnYW1lcGFkLmluZGV4LFxuICAgICAgICAgICAgYnV0dG9uczogZ2FtZXBhZC5idXR0b25zLmxlbmd0aCxcbiAgICAgICAgICAgIGxheW91dDogbGF5b3V0LFxuICAgICAgICAgICAgYXhlczogTWF0aC5mbG9vcihnYW1lcGFkLmF4ZXMubGVuZ3RoIC8gMiksXG4gICAgICAgICAgICBheGVWYWx1ZXM6IFtdLFxuICAgICAgICAgICAgaGFwdGljQWN0dWF0b3I6IG51bGwsXG4gICAgICAgICAgICB2aWJyYXRpb25Nb2RlOiAtMSxcbiAgICAgICAgICAgIHZpYnJhdGlvbjogZmFsc2UsXG4gICAgICAgICAgICBtYXBwaW5nOiBnYW1lcGFkLm1hcHBpbmcsXG4gICAgICAgICAgICBidXR0b25BY3Rpb25zOiB7fSxcbiAgICAgICAgICAgIGF4ZXNBY3Rpb25zOiB7fSxcbiAgICAgICAgICAgIHByZXNzZWQ6IHt9XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCB4ID0gMDsgeCA8IG9wdGlvbnMuYnV0dG9uczsgeCsrKSB7XG4gICAgICAgICAgICBvcHRpb25zLmJ1dHRvbkFjdGlvbnNbeF0gPSAoKSA9PiAoeyBhY3Rpb246ICgpID0+IHsgfSwgYWZ0ZXI6ICgpID0+IHsgfSwgYmVmb3JlOiAoKSA9PiB7IH0gfSk7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCB4ID0gMDsgeCA8IG9wdGlvbnMuYXhlczsgeCsrKSB7XG4gICAgICAgICAgICBvcHRpb25zLmF4ZXNBY3Rpb25zW3hdID0ge1xuICAgICAgICAgICAgICAgIGRvd246ICgpID0+ICh7IGFjdGlvbjogKCkgPT4geyB9LCBhZnRlcjogKCkgPT4geyB9LCBiZWZvcmU6ICgpID0+IHsgfSB9KSxcbiAgICAgICAgICAgICAgICBsZWZ0OiAoKSA9PiAoeyBhY3Rpb246ICgpID0+IHsgfSwgYWZ0ZXI6ICgpID0+IHsgfSwgYmVmb3JlOiAoKSA9PiB7IH0gfSksXG4gICAgICAgICAgICAgICAgcmlnaHQ6ICgpID0+ICh7IGFjdGlvbjogKCkgPT4geyB9LCBhZnRlcjogKCkgPT4geyB9LCBiZWZvcmU6ICgpID0+IHsgfSB9KSxcbiAgICAgICAgICAgICAgICB1cDogKCkgPT4gKHsgYWN0aW9uOiAoKSA9PiB7IH0sIGFmdGVyOiAoKSA9PiB7IH0sIGJlZm9yZTogKCkgPT4geyB9IH0pXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBvcHRpb25zLmF4ZVZhbHVlc1t4XSA9IFswLCAwXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChnYW1lcGFkLmhhcHRpY0FjdHVhdG9ycykge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBnYW1lcGFkLmhhcHRpY0FjdHVhdG9ycy5wdWxzZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIG9wdGlvbnMuaGFwdGljID0gZ2FtZXBhZC5oYXB0aWNBY3R1YXRvcnM7XG4gICAgICAgICAgICAgICAgb3B0aW9ucy52aWJyYXRpb25Nb2RlID0gMDtcbiAgICAgICAgICAgICAgICBvcHRpb25zLnZpYnJhdGlvbiA9IHRydWU7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGdhbWVwYWQuaGFwdGljQWN0dWF0b3JzWzBdICYmIHR5cGVvZiBnYW1lcGFkLmhhcHRpY0FjdHVhdG9yc1swXS5wdWxzZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIG9wdGlvbnMuaGFwdGljID0gZ2FtZXBhZC5oYXB0aWNBY3R1YXRvcnNbMF07XG4gICAgICAgICAgICAgICAgb3B0aW9ucy52aWJyYXRpb25Nb2RlID0gMDtcbiAgICAgICAgICAgICAgICBvcHRpb25zLnZpYnJhdGlvbiA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmIChnYW1lcGFkLnZpYnJhdGlvbkFjdHVhdG9yKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGdhbWVwYWQudmlicmF0aW9uQWN0dWF0b3IucGxheUVmZmVjdCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIG9wdGlvbnMuaGFwdGljID0gZ2FtZXBhZC52aWJyYXRpb25BY3R1YXRvcjtcbiAgICAgICAgICAgICAgICBvcHRpb25zLnZpYnJhdGlvbk1vZGUgPSAxO1xuICAgICAgICAgICAgICAgIG9wdGlvbnMudmlicmF0aW9uID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZ2FtZXBhZCA9IG9wdGlvbnM7XG4gICAgICAgIHRoaXMuaGFzSm95c3RpY2tzID0gb3B0aW9ucy5heGVzID4gMCAmJiBPYmplY3QudmFsdWVzKHRoaXMuZ2FtZXBhZC5sYXlvdXQpLm1hcChmdW5jdGlvbihtKSB7IHJldHVybiBtLmluY2x1ZGVzKCdKb3knKSB9KS5maWx0ZXIoZnVuY3Rpb24gKGIpIHsgcmV0dXJuIGIgfSkubGVuZ3RoID4gMDtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2FtZXBhZDtcbiAgICB9XG5cblx0LyoqXG5cdCAqIEBmdW5jdGlvblxuICAgICAqIEBtZW1iZXJvZiBtb2R1bGU6Z2VvZmxvLkdhbWluZ1xuXHQgKiBAbmFtZSBzZXRDZW50ZXJcblx0ICogQGRlc2NyaXB0aW9uIFRoaXMgZnVuY3Rpb24gY2FsY3VsYXRlcyB0aGUgbmV3IGNlbnRlciBvZiB0aGUgbWFwIGJhc2VkIG9uIHRoZSBpbnB1dCB2YWx1ZXMgYW5kIGdhbWVwYWQgY29udHJvbHMuIEl0IGhhbmRsZXMgYm90aCBqb3lzdGljayBhbmQgRC1wYWQgaW5wdXRzIHRvIGFkanVzdCB0aGUgbWFwIGNlbnRlciBhY2NvcmRpbmdseS5cblx0ICogQHBhcmFtIHtPYmplY3R9IHZhbHVlIC0gVGhlIHZhbHVlIHVzZWQgdG8gY2FsY3VsYXRlIHRoZSBuZXcgY2VudGVyIG9mIHRoZSBtYXAuXG5cdCAqIEBwYXJhbSB7Ym9vbGVhbn0gZnJlZSAtIEEgYm9vbGVhbiBmbGFnIGluZGljYXRpbmcgaWYgdGhlIG1hcCBjZW50ZXIgc2hvdWxkIGJlIHNldCBmcmVlbHkuXG5cdCAqIEBwYXJhbSB7Ym9vbGVhbn0gZHBhZCAtIEEgYm9vbGVhbiBmbGFnIGluZGljYXRpbmcgaWYgdGhlIEQtcGFkIGNvbnRyb2xzIGFyZSB1c2VkIGZvciBzZXR0aW5nIHRoZSBtYXAgY2VudGVyLlxuXHQgKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyB0cnVlIGFmdGVyIHNldHRpbmcgdGhlIG1hcCBjZW50ZXIuXG5cdCAqL1xuXHRcbiAgICB0aGlzLnNldENlbnRlciA9IGZ1bmN0aW9uICh2YWx1ZSwgZnJlZSwgZHBhZCkge1xuICAgICAgICB2YXIgY2VudGVyID0gZ2VvZmxvLm1hcC5nZXRDZW50ZXIoKTtcbiAgICAgICAgdmFyIHByZXNzZWQgPSB0aGlzLmdhbWVwYWQucHJlc3NlZDtcbiAgICAgICAgdmFyIHR5cGUgPSB0aGlzLmhhc0pveXN0aWNrcyA/ICdKb3knIDogJ0RwYWQnO1xuICAgICAgICB2YXIgZGlhZyA9IE9iamVjdC5rZXlzKHByZXNzZWQpLmZpbHRlcihmdW5jdGlvbihwKSB7IHJldHVybiBwLmluY2x1ZGVzKHR5cGUpIH0pLmxlbmd0aCA+IDE7XG4gICAgICAgIFxuICAgICAgICB2YXIgc3RhcnQgPSBmcmVlIHx8IGRwYWQgPyBjZW50ZXIgOiBmYWxzZTtcbiAgICAgICAgc3RhcnQgPSBnZW9mbG8uaG90RmVhdHVyZSAmJiAhc3RhcnQgPyBnZW9mbG8ubGFzdE1vdmUgfHwgY2VudGVyIDogZmFsc2U7XG4gICAgICAgIHN0YXJ0ID0gIXN0YXJ0ID8gY2VudGVyIDogc3RhcnQ7XG5cbiAgICAgICAgdmFyIGVuZDtcbiAgICBcbiAgICAgICAgaWYgKGRwYWQpIHtcbiAgICAgICAgICAgIHZhciBiZWFyaW5nID0gdGhpcy5tYXAuYmVhcmluZztcbiAgICAgICAgICAgIGJlYXJpbmcgPSBwcmVzc2VkWydVcCddID8gYmVhcmluZyA6XG4gICAgICAgICAgICBwcmVzc2VkWydEb3duJ10gPyBiZWFyaW5nICsgMTgwIDpcbiAgICAgICAgICAgIHByZXNzZWRbJ0xlZnQnXSA/IGJlYXJpbmcgLSA5MCA6XG4gICAgICAgICAgICBwcmVzc2VkWydSaWdodCddID8gYmVhcmluZyArIDkwIDpcbiAgICAgICAgICAgIGJlYXJpbmc7XG5cbiAgICAgICAgICAgIHZhciBkZXN0ID0gdHVyZi5kZXN0aW5hdGlvbih0dXJmLnBvaW50KHN0YXJ0KSwgZGlzdGFuY2UsIGJlYXJpbmcpLmdlb21ldHJ5LmNvb3JkaW5hdGVzO1xuXG4gICAgICAgICAgICBsbmdMYXRzID0gZnJlZSA/IHsgbG5nOiBkZXN0WzFdLCBsYXQ6IGRlc3RbMF0gfSA6IGRlc3Q7XG4gICAgICAgIH0gZWxzZSBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgIHZhciBsb2NhdGlvbiA9IHRoaXMuc2V0TG9jYXRpb24odmFsdWUpO1xuICAgICAgICAgICAgdmFyIGNvb3JkcyA9IGxvY2F0aW9uICYmIGxvY2F0aW9uLnggPyBbbG9jYXRpb24ueCwgbG9jYXRpb24ueV0gOiBmYWxzZTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgZW5kID0gZ2VvZmxvLm1hcC51bnByb2plY3QoY29vcmRzKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdmFyIHBlcmNlbnQgPSBkaWFnID8gdGhpcy5vcHRpb25zLnBhbi5zcGVlZCAvIDIgOiB0aGlzLm9wdGlvbnMucGFuLnNwZWVkO1xuICAgICAgICAgICAgdmFyIG1pZCA9IGNhbGN1bGF0ZUludGVybWVkaWF0ZVBvaW50KFtzdGFydC5sbmcsIHN0YXJ0LmxhdF0sIFtlbmQubG5nLCBlbmQubGF0XSwgcGVyY2VudClcbiAgICAgICAgICAgIG1pZCA9IGdlb2Zsby5tYXAuZ2V0UGl0Y2goKSA+IDYwID8gY2FsY3VsYXRlSW50ZXJtZWRpYXRlUG9pbnQoW3N0YXJ0LmxuZywgc3RhcnQubGF0XSwgW21pZFswXSwgbWlkWzFdXSwgMC40KSA6IG1pZDtcblxuICAgICAgICAgICAgZW5kID0gbWlkO1xuICAgICAgICAgICAgZ2VvZmxvLmxhc3RNb3ZlID0gZW5kO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFyIGNvb3JkcyA9IGdlb2Zsby5ob3RGZWF0dXJlID8gZ2VvZmxvLmhvdEZlYXR1cmUuZ2VvbWV0cnkuY29vcmRpbmF0ZXMgOiBmYWxzZTtcbiAgICAgICAgICAgIGVuZCA9IGZyZWUgPyBnZW9mbG8ubWFwLmdldENlbnRlcigpIDpcbiAgICAgICAgICAgIGNvb3JkcyA/IHsgbGF0OiBjb29yZHNbY29vcmRzLmxlbmd0aC0xXVsxXSwgbG5nOiBjb29yZHNbY29vcmRzLmxlbmd0aC0xXVswXSB9IDogZ2VvZmxvLm1hcC5nZXRDZW50ZXIoKTtcbiAgICAgICAgICAgIGdlb2Zsby5sYXN0TW92ZSA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5zZXRMb2NhdGlvbihbMCwgMF0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5tYXAuY2VudGVyID0gZW5kO1xuICAgICAgICByZXR1cm4gdGhpcy5zZXRNYXAodHJ1ZSk7XG4gICAgfVxuICAgIFxuXHQvKipcblx0ICogQGZ1bmN0aW9uXG4gICAgICogQG1lbWJlcm9mIG1vZHVsZTpnZW9mbG8uR2FtaW5nXG5cdCAqIEBuYW1lIHNldEJlYXJpbmdcblx0ICogQGRlc2NyaXB0aW9uIFRoaXMgZnVuY3Rpb24gdXBkYXRlcyB0aGUgYmVhcmluZyBvZiB0aGUgbWFwIGJ5IGFkanVzdGluZyBpdCB3aXRoIHRoZSBzcGVjaWZpZWQgdmFsdWUgYW5kIGRpcmVjdGlvbi5cblx0ICogQHBhcmFtIHtudW1iZXIgfCBBcnJheTxudW1iZXI+fSB2YWx1ZSAtIFRoZSB2YWx1ZSB0byBhZGp1c3QgdGhlIGJlYXJpbmcgYnkuIElmIGRwYWQgaXMgZmFsc2UsIGl0IHNob3VsZCBiZSBhbiBhcnJheSBvZiBudW1iZXJzLCBvdGhlcndpc2UgYSBzaW5nbGUgbnVtYmVyLlxuXHQgKiBAcGFyYW0ge2Jvb2xlYW59IGxlZnQgLSBJbmRpY2F0ZXMgdGhlIGRpcmVjdGlvbiBvZiBhZGp1c3RtZW50LiBJZiB0cnVlLCB0aGUgYmVhcmluZyBpcyBkZWNyZWFzZWQ7IG90aGVyd2lzZSwgaXQgaXMgaW5jcmVhc2VkLlxuXHQgKiBAcGFyYW0ge2Jvb2xlYW59IGRwYWQgLSBTcGVjaWZpZXMgd2hldGhlciB0aGUgdmFsdWUgaXMgY29taW5nIGZyb20gYSBkcGFkIGlucHV0LlxuXHQgKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyB0aGUgcmVzdWx0IG9mIGNhbGxpbmcgdGhlIHNldE1hcCBmdW5jdGlvbiBhZnRlciB1cGRhdGluZyB0aGUgYmVhcmluZy5cblx0ICovXG4gICAgdGhpcy5zZXRCZWFyaW5nID0gZnVuY3Rpb24gKHZhbHVlLCBsZWZ0LCBkcGFkKSB7XG4gICAgICAgIHZhciBiZWFyaW5nID0gdGhpcy5tYXAuYmVhcmluZztcbiAgICAgICAgdmFyIGJlYXJpbmdNdWx0aSA9ICFkcGFkID8gTWF0aC5hYnModmFsdWVbMF0pIDogdmFsdWU7XG4gICAgXG4gICAgICAgIGlmIChsZWZ0KSB7XG4gICAgICAgICAgICBiZWFyaW5nID0gYmVhcmluZyAtICh0aGlzLm9wdGlvbnMuYmVhcmluZy5zcGVlZCAqIGJlYXJpbmdNdWx0aSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGJlYXJpbmcgPSBiZWFyaW5nICsgKHRoaXMub3B0aW9ucy5iZWFyaW5nLnNwZWVkICogYmVhcmluZ011bHRpKVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5tYXAuYmVhcmluZyA9IGJlYXJpbmc7XG4gICAgICAgIHJldHVybiB0aGlzLnNldE1hcCgpO1xuICAgIH1cbiAgICBcblx0LyoqXG5cdCAqIEBmdW5jdGlvblxuICAgICAqIEBtZW1iZXJvZiBtb2R1bGU6Z2VvZmxvLkdhbWluZ1xuXHQgKiBAbmFtZSBzZXRQaXRjaFxuXHQgKiBAZGVzY3JpcHRpb24gVGhpcyBmdW5jdGlvbiBhZGp1c3RzIHRoZSBwaXRjaCBvZiB0aGUgbWFwIGJ5IGEgc3BlY2lmaWVkIGFtb3VudCBpbiB0aGUgZ2l2ZW4gZGlyZWN0aW9uLlxuXHQgKiBAcGFyYW0ge251bWJlcnxBcnJheTxudW1iZXI+fSB2YWx1ZSAtIFRoZSB2YWx1ZSBvciBhcnJheSBvZiB2YWx1ZXMgdG8gYWRqdXN0IHRoZSBwaXRjaCBieS5cblx0ICogQHBhcmFtIHtib29sZWFufSB1cCAtIEEgYm9vbGVhbiBpbmRpY2F0aW5nIHdoZXRoZXIgdGhlIHBpdGNoIHNob3VsZCBiZSBpbmNyZWFzZWQgKHRydWUpIG9yIGRlY3JlYXNlZCAoZmFsc2UpLlxuXHQgKiBAcGFyYW0ge2Jvb2xlYW59IGRwYWQgLSBBIGJvb2xlYW4gZmxhZyB0byBkZXRlcm1pbmUgaWYgdGhlIHZhbHVlIGlzIGNvbWluZyBmcm9tIGEgRC1wYWQgaW5wdXQuXG5cdCAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIHRydWUgaWYgdGhlIG1hcCBpcyBzdWNjZXNzZnVsbHkgdXBkYXRlZCB3aXRoIHRoZSBuZXcgcGl0Y2guXG5cdCAqL1xuICAgIHRoaXMuc2V0UGl0Y2ggPSBmdW5jdGlvbiAodmFsdWUsIHVwLCBkcGFkKSB7XG4gICAgICAgIHZhciBwaXRjaCA9IHRoaXMubWFwLnBpdGNoO1xuICAgICAgICB2YXIgcGl0Y2hNdWx0aSA9ICFkcGFkID8gTWF0aC5hYnModmFsdWVbMV0pIDogdmFsdWU7XG5cbiAgICAgICAgaWYgKHBpdGNoIDwgMCkgcGl0Y2ggPSAwO1xuICAgICAgICBpZiAocGl0Y2ggPiB0aGlzLm9wdGlvbnMucGl0Y2gubWF4KSBwaXRjaCA9IHRoaXMub3B0aW9ucy5waXRjaC5tYXg7XG4gICAgXG4gICAgICAgIGlmICh1cCkge1xuICAgICAgICAgICAgcGl0Y2ggPSBwaXRjaCArICh0aGlzLm9wdGlvbnMucGl0Y2guc3BlZWQgKiBwaXRjaE11bHRpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHBpdGNoID0gcGl0Y2ggLSAodGhpcy5vcHRpb25zLnBpdGNoLnNwZWVkICogcGl0Y2hNdWx0aSk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHRoaXMubWFwLnBpdGNoID0gcGl0Y2g7XG4gICAgICAgIHJldHVybiB0aGlzLnNldE1hcCgpO1xuICAgIH1cbiAgICBcblx0LyoqXG5cdCAqIEBmdW5jdGlvblxuICAgICAqIEBtZW1iZXJvZiBtb2R1bGU6Z2VvZmxvLkdhbWluZ1xuXHQgKiBAbmFtZSBzZXRab29tXG5cdCAqIEBkZXNjcmlwdGlvbiBUaGlzIGZ1bmN0aW9uIGFkanVzdHMgdGhlIHpvb20gbGV2ZWwgb2YgYSBtYXAgYmFzZWQgb24gdGhlIHByb3ZpZGVkIHZhbHVlIGFuZCBkaXJlY3Rpb24uXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSB2YWx1ZSAtIFRoZSBhbW91bnQgYnkgd2hpY2ggdG8gY2hhbmdlIHRoZSB6b29tIGxldmVsLlxuXHQgKiBAcGFyYW0ge2Jvb2xlYW59IG91dCAtIEEgZmxhZyBpbmRpY2F0aW5nIHdoZXRoZXIgdG8gem9vbSBvdXQgKHRydWUpIG9yIHpvb20gaW4gKGZhbHNlKS5cblx0ICogQHBhcmFtIHtib29sZWFufSBkcGFkIC0gQSBmbGFnIGluZGljYXRpbmcgdGhlIGRpcmVjdGlvbiBvZiB0aGUgem9vbSBjaGFuZ2UuXG5cdCAqIEByZXR1cm5zIHtib29sZWFufSAtIFJldHVybnMgdGhlIHJlc3VsdCBvZiBzZXR0aW5nIHRoZSBtYXAgd2l0aCB0aGUgbmV3IHpvb20gbGV2ZWwuXG5cdCAqL1xuICAgIHRoaXMuc2V0Wm9vbSA9IGZ1bmN0aW9uICh2YWx1ZSwgb3V0LCBkcGFkKSB7XG4gICAgICAgIHZhciB6b29tID0gdGhpcy5tYXAuem9vbTtcbiAgICBcbiAgICAgICAgaWYgKG91dCkge1xuICAgICAgICAgICAgem9vbSA9IHpvb20gLSAoIHRoaXMub3B0aW9ucy56b29tLnNwZWVkICogTWF0aC5hYnModmFsdWUpIClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHpvb20gPSB6b29tICsgKCB0aGlzLm9wdGlvbnMuem9vbS5zcGVlZCAqIE1hdGguYWJzKHZhbHVlKSApXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHRoaXMubWFwLnpvb20gPSB6b29tO1xuICAgICAgICByZXR1cm4gdGhpcy5zZXRNYXAoKTtcbiAgICB9XG5cblx0LyoqXG5cdCAqIEBmdW5jdGlvblxuICAgICAqIEBtZW1iZXJvZiBtb2R1bGU6Z2VvZmxvLkdhbWluZ1xuXHQgKiBAbmFtZSBzZXRTcGVlZFxuXHQgKiBAZGVzY3JpcHRpb24gVGhpcyBmdW5jdGlvbiBjYWxjdWxhdGVzIHRoZSBzcGVlZCBvZiBwYW5uaW5nIGJhc2VkIG9uIHRoZSBwcm92aWRlZCB2YWx1ZSBhbmQgZGlyZWN0aW9uLiBJdCBlbnN1cmVzIHRoYXQgdGhlIHNwZWVkIGZhbGxzIHdpdGhpbiB0aGUgc3BlY2lmaWVkIG1pbmltdW0gYW5kIG1heGltdW0gdmFsdWVzLlxuXHQgKiBAcGFyYW0ge251bWJlcn0gdmFsdWUgLSBUaGUgdmFsdWUgdGhhdCBpbmZsdWVuY2VzIHRoZSBzcGVlZCBvZiBwYW5uaW5nLlxuXHQgKiBAcGFyYW0ge2Jvb2xlYW59IGRvd24gLSBBIGJvb2xlYW4gZmxhZyBpbmRpY2F0aW5nIHRoZSBkaXJlY3Rpb24gb2YgcGFubmluZyAodHJ1ZSBmb3IgZG93biwgZmFsc2UgZm9yIHVwKS5cblx0ICogQHJldHVybnMge251bWJlcn0gVGhlIHVwZGF0ZWQgc3BlZWQgb2YgcGFubmluZyBhZnRlciBhcHBseWluZyB0aGUgY2FsY3VsYXRpb25zLlxuXHQgKi9cbiAgICB0aGlzLnNldFNwZWVkID0gZnVuY3Rpb24gKHZhbHVlLCBkb3duKSB7XG4gICAgICAgIHZhciBzcGVlZCA9IHRoaXMub3B0aW9ucy5wYW4uc3BlZWQgPiB0aGlzLm9wdGlvbnMucGFuLm1pbiA/XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMucGFuLnNwZWVkIDpcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5wYW4ubWF4ICYmIHRoaXMub3B0aW9ucy5wYW4uc3BlZWQgPiB0aGlzLm9wdGlvbnMucGFuLm1heCA/XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMucGFuLm1pbiA6XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMucGFuLm1pbjtcblxuICAgICAgICBzcGVlZCA9IGRvd24gPyBzcGVlZCAtIHRoaXMub3B0aW9ucy5wYW4ubWluIDogc3BlZWQgKyB0aGlzLm9wdGlvbnMucGFuLm1pbjtcblxuICAgICAgICBzcGVlZCA9IHNwZWVkIDwgdGhpcy5vcHRpb25zLnBhbi5taW4gPyB0aGlzLm9wdGlvbnMucGFuLm1pbiA6XG4gICAgICAgIHRoaXMub3B0aW9ucy5wYW4ubWF4ICYmIHNwZWVkID4gdGhpcy5vcHRpb25zLnBhbi5tYXggPyB0aGlzLm9wdGlvbnMucGFuLm1heCA6XG4gICAgICAgIHNwZWVkO1xuXG4gICAgICAgIHJldHVybiB0aGlzLm9wdGlvbnMucGFuLnNwZWVkID0gc3BlZWQgKiBNYXRoLmFicyh2YWx1ZSk7XG4gICAgfVxuXG5cblx0LyoqXG5cdCAqIEBmdW5jdGlvblxuICAgICAqIEBtZW1iZXJvZiBtb2R1bGU6Z2VvZmxvLkdhbWluZyBhc3NvY2lhdGVFdmVudFxuXHQgKiBAbmFtZSBhc3NvY2lhdGVFdmVudFxuXHQgKiBAZGVzY3JpcHRpb24gVGhpcyBmdW5jdGlvbiBhbGxvd3MgdGhlIHVzZXIgdG8gYXNzb2NpYXRlIGFuIGV2ZW50IHdpdGggYSBjYWxsYmFjayBmdW5jdGlvbiBmb3IgYSBzcGVjaWZpYyBidXR0b24gb3IgYXhpcyBvbiB0aGUgZ2FtZXBhZC5cblx0ICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50TmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBldmVudCB0byBhc3NvY2lhdGUgd2l0aCB0aGUgY2FsbGJhY2sgZnVuY3Rpb24uXG5cdCAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrIC0gVGhlIGNhbGxiYWNrIGZ1bmN0aW9uIHRvIGJlIGV4ZWN1dGVkIHdoZW4gdGhlIGV2ZW50IG9jY3Vycy5cblx0ICogQHBhcmFtIHtzdHJpbmd9IHR5cGUgLSBUaGUgdHlwZSBvZiBldmVudCAoZS5nLiwgJ3ByZXNzJywgJ3JlbGVhc2UnKSB0byBhc3NvY2lhdGUgd2l0aCB0aGUgY2FsbGJhY2sgZnVuY3Rpb24uXG5cdCAqIEByZXR1cm5zIHtvYmplY3R9IFRoZSB1cGRhdGVkIGdhbWVwYWQgb2JqZWN0IHdpdGggdGhlIGFzc29jaWF0ZWQgZXZlbnQgYW5kIGNhbGxiYWNrIGZ1bmN0aW9uLlxuXHQgKi9cbiAgICB0aGlzLmFzc29jaWF0ZUV2ZW50ID0gZnVuY3Rpb24oZXZlbnROYW1lLCBjYWxsYmFjaywgdHlwZSkge1xuICAgICAgICBpZiAoZXZlbnROYW1lLm1hdGNoKC9eYnV0dG9uXFxkKyQvKSkge1xuICAgICAgICAgICAgY29uc3QgYnV0dG9uSWQgPSBwYXJzZUludChldmVudE5hbWUubWF0Y2goL15idXR0b24oXFxkKykkLylbMV0pO1xuXG4gICAgICAgICAgICBpZiAoYnV0dG9uSWQgPj0gMCAmJiBidXR0b25JZCA8IHRoaXMuZ2FtZXBhZC5idXR0b25zKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lcGFkLmJ1dHRvbkFjdGlvbnNbYnV0dG9uSWRdW3R5cGVdID0gY2FsbGJhY2s7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGJ1dHRvbklkLCAnVGhpcyBidXR0b24gaXMgbm90IG9uIGdhbWVwYWQnKVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0gZWxzZSBpZiAoZXZlbnROYW1lID09PSAnc3RhcnQnKSB7XG4gICAgICAgICAgICB0aGlzLmdhbWVwYWQuYnV0dG9uQWN0aW9uc1s5XVt0eXBlXSA9IGNhbGxiYWNrO1xuICAgICAgICB9IGVsc2UgaWYgKGV2ZW50TmFtZSA9PT0gJ3NlbGVjdCcpIHtcbiAgICAgICAgICAgIHRoaXMuZ2FtZXBhZC5idXR0b25BY3Rpb25zWzhdW3R5cGVdID0gY2FsbGJhY2s7XG4gICAgICAgIH0gZWxzZSBpZiAoZXZlbnROYW1lID09PSAncjEnKSB7XG4gICAgICAgICAgICB0aGlzLmdhbWVwYWQuYnV0dG9uQWN0aW9uc1s1XVt0eXBlXSA9IGNhbGxiYWNrO1xuICAgICAgICB9IGVsc2UgaWYgKGV2ZW50TmFtZSA9PT0gJ3IyJykge1xuICAgICAgICAgICAgdGhpcy5nYW1lcGFkLmJ1dHRvbkFjdGlvbnNbN11bdHlwZV0gPSBjYWxsYmFjaztcbiAgICAgICAgfSBlbHNlIGlmIChldmVudE5hbWUgPT09ICdsMScpIHtcbiAgICAgICAgICAgIHRoaXMuZ2FtZXBhZC5idXR0b25BY3Rpb25zWzRdW3R5cGVdID0gY2FsbGJhY2s7XG4gICAgICAgIH0gZWxzZSBpZiAoZXZlbnROYW1lID09PSAnbDInKSB7XG4gICAgICAgICAgICB0aGlzLmdhbWVwYWQuYnV0dG9uQWN0aW9uc1s2XVt0eXBlXSA9IGNhbGxiYWNrO1xuICAgICAgICB9IGVsc2UgaWYgKGV2ZW50TmFtZSA9PT0gJ3Bvd2VyJykge1xuICAgICAgICAgICAgaWYgKHRoaXMuZ2FtZXBhZC5idXR0b25zID49IDE3KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lcGFkLmJ1dHRvbkFjdGlvbnNbMTZdW3R5cGVdID0gY2FsbGJhY2s7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGVycm9yKE1FU1NBR0VTLklOVkFMSURfQlVUVE9OKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChldmVudE5hbWUubWF0Y2goL14odXB8ZG93bnxsZWZ0fHJpZ2h0KShcXGQrKSQvKSkge1xuICAgICAgICAgICAgY29uc3QgbWF0Y2hlcyA9IGV2ZW50TmFtZS5tYXRjaCgvXih1cHxkb3dufGxlZnR8cmlnaHQpKFxcZCspJC8pO1xuICAgICAgICAgICAgY29uc3QgZGlyZWN0aW9uID0gbWF0Y2hlc1sxXTtcbiAgICAgICAgICAgIGNvbnN0IGF4ZSA9IHBhcnNlSW50KG1hdGNoZXNbMl0pO1xuXG4gICAgICAgICAgICBpZiAoYXhlID49IDAgJiYgYXhlIDwgdGhpcy5nYW1lcGFkLmF4ZXMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWVwYWQuYXhlc0FjdGlvbnNbYXhlXVtkaXJlY3Rpb25dW3R5cGVdID0gY2FsbGJhY2s7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGVycm9yKE1FU1NBR0VTLklOVkFMSURfQlVUVE9OKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChldmVudE5hbWUubWF0Y2goL14odXB8ZG93bnxsZWZ0fHJpZ2h0KSQvKSkge1xuICAgICAgICAgICAgY29uc3QgZGlyZWN0aW9uID0gZXZlbnROYW1lLm1hdGNoKC9eKHVwfGRvd258bGVmdHxyaWdodCkkLylbMV07XG4gICAgICAgICAgICB0aGlzLmdhbWVwYWQuYXhlc0FjdGlvbnNbMF1bZGlyZWN0aW9uXVt0eXBlXSA9IGNhbGxiYWNrO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuZ2FtZXBhZDtcbiAgICB9XG5cbiAgICB0aGlzLm9uSW5pdCA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgICAgIHRoaXMuaW5pdGlhdGVkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5zZXRDb250YWluZXIoJ2RpdicsICdnYW1lcGFkJywgZ2VvZmxvLm1hcC5nZXRDb250YWluZXIoKSk7XG4gICAgICAgIHRoaXMuc2V0TWFya2VyKCk7XG4gICAgICAgIHRoaXMuc2V0TWFwKCk7XG4gICAgfVxuXG4gICAgdGhpcy5vbkV2ZW50ID0gZnVuY3Rpb24gKHR5cGUsIGtleSwgYWN0aW9uLCB2YWx1ZSkge1xuICAgICAgICB2YXIgcHJlc3NlZCA9IHtbYWN0aW9uXTogdHJ1ZX07XG4gICAgICAgIHZhciBsbmdMYXQgPSB0aGlzLm9wdGlvbnMuY2FtZXJhLmZyZWUgPyBnZW9mbG8ubWFwLmdldENlbnRlcigpIDogZ2VvZmxvLmxhc3RNb3ZlID8gZ2VvZmxvLmxhc3RNb3ZlIDogZ2VvZmxvLm1hcC5nZXRDZW50ZXIoKTtcblxuICAgICAgICB2YXIgb3B0aW9ucyA9IHtcbiAgICAgICAgICAgIG5hbWU6IGFjdGlvbixcbiAgICAgICAgICAgIHR5cGU6IHR5cGUsXG4gICAgICAgICAgICBrZXk6IGtleSxcbiAgICAgICAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgICAgICAgIG1vZGU6IGdlb2Zsby5jdXJyZW50TW9kZSxcbiAgICAgICAgICAgIGdhbWVwYWQ6IHRoaXMsXG4gICAgICAgICAgICBsbmdMYXQ6IGxuZ0xhdCxcbiAgICAgICAgICAgIGdlb2ZsbzogZ2VvZmxvLFxuICAgICAgICAgICAgb3JpZ2luYWxFdmVudDoge31cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGhpcy5pbml0aWF0ZWQpIHRoaXMub25Jbml0KG9wdGlvbnMpO1xuXG4gICAgICAgIGdlb2Zsby5tYXAuZmlyZShnZW9mbG8uaWQgKyAnOmdhbWVwYWQuJyArIHR5cGUsIHsgZGV0YWlsOiBvcHRpb25zIH0pO1xuXG4gICAgICAgIGlmIChwcmVzc2VkWydKb3lMZWZ0VXAnXSB8fCBwcmVzc2VkWydKb3lMZWZ0RG93biddIHx8IHByZXNzZWRbJ0pveUxlZnRMZWZ0J10gfHwgcHJlc3NlZFsnSm95TGVmdFJpZ2h0J10pIHRoaXMub3B0aW9ucy5tYXBwaW5nWydKb3lMZWZ0TW92ZSddKG9wdGlvbnMpO1xuICAgICAgICBpZiAocHJlc3NlZFsnSm95UmlnaHRVcCddIHx8IHByZXNzZWRbJ0pveVJpZ2h0RG93biddIHx8IHByZXNzZWRbJ0pveVJpZ2h0TGVmdCddIHx8IHByZXNzZWRbJ0pveVJpZ2h0UmlnaHQnXSkgdGhpcy5vcHRpb25zLm1hcHBpbmdbJ0pveVJpZ2h0TW92ZSddKG9wdGlvbnMpO1xuXG4gICAgICAgIGlmIChwcmVzc2VkWydKb3lMZWZ0Q2xpY2snXSkgdGhpcy5vcHRpb25zLm1hcHBpbmdbJ0pveUxlZnRDbGljayddKG9wdGlvbnMpO1xuICAgICAgICBpZiAocHJlc3NlZFsnSm95UmlnaHRDbGljayddKSB0aGlzLm9wdGlvbnMubWFwcGluZ1snSm95UmlnaHRDbGljayddKG9wdGlvbnMpO1xuXG4gICAgICAgIGlmIChwcmVzc2VkWydCdW1wTGVmdCddKSB0aGlzLm9wdGlvbnMubWFwcGluZ1snQnVtcExlZnQnXShvcHRpb25zKTtcbiAgICAgICAgaWYgKHByZXNzZWRbJ0J1bXBSaWdodCddKSB0aGlzLm9wdGlvbnMubWFwcGluZ1snQnVtcFJpZ2h0J10ob3B0aW9ucyk7XG5cbiAgICAgICAgaWYgKHByZXNzZWRbJ1RyaWdMZWZ0J10pIHRoaXMub3B0aW9ucy5tYXBwaW5nWydUcmlnTGVmdCddKG9wdGlvbnMpO1xuICAgICAgICBpZiAocHJlc3NlZFsnVHJpZ1JpZ2h0J10pIHRoaXMub3B0aW9ucy5tYXBwaW5nWydUcmlnUmlnaHQnXShvcHRpb25zKTtcblxuICAgICAgICBpZiAocHJlc3NlZFsnQSddKSB0aGlzLm9wdGlvbnMubWFwcGluZ1snQSddKG9wdGlvbnMpO1xuICAgICAgICBpZiAocHJlc3NlZFsnQiddKSB0aGlzLm9wdGlvbnMubWFwcGluZ1snQiddKG9wdGlvbnMpO1xuICAgICAgICBpZiAocHJlc3NlZFsnWCddKSB0aGlzLm9wdGlvbnMubWFwcGluZ1snWCddKG9wdGlvbnMpO1xuICAgICAgICBpZiAocHJlc3NlZFsnWSddKSB0aGlzLm9wdGlvbnMubWFwcGluZ1snWSddKG9wdGlvbnMpO1xuXG4gICAgICAgIGlmIChwcmVzc2VkWydTdGFydCddKSB0aGlzLm9wdGlvbnMubWFwcGluZ1snU3RhcnQnXShvcHRpb25zKTtcbiAgICAgICAgaWYgKHByZXNzZWRbJ1NlbGVjdCddKSB0aGlzLm9wdGlvbnMubWFwcGluZ1snU2VsZWN0J10ob3B0aW9ucyk7XG4gICAgICAgIGlmIChwcmVzc2VkWydQb3dlciddKSB0aGlzLm9wdGlvbnMubWFwcGluZ1snUG93ZXInXShvcHRpb25zKTtcbiAgICAgICAgaWYgKHByZXNzZWRbJ0hvbWUnXSkgdGhpcy5vcHRpb25zLm1hcHBpbmdbJ0hvbWUnXShvcHRpb25zKTtcbiAgICAgICAgaWYgKHByZXNzZWRbJ01pc2MnXSkgdGhpcy5vcHRpb25zLm1hcHBpbmdbJ01pc2MnXShvcHRpb25zKTtcblxuICAgICAgICBpZiAocHJlc3NlZFsnRHBhZFVwJ10pIHRoaXMub3B0aW9ucy5tYXBwaW5nWydEcGFkVXAnXShvcHRpb25zKTtcbiAgICAgICAgaWYgKHByZXNzZWRbJ0RwYWREb3duJ10pIHRoaXMub3B0aW9ucy5tYXBwaW5nWydEcGFkRG93biddKG9wdGlvbnMpO1xuICAgICAgICBpZiAocHJlc3NlZFsnRHBhZExlZnQnXSkgdGhpcy5vcHRpb25zLm1hcHBpbmdbJ0RwYWRMZWZ0J10ob3B0aW9ucyk7XG4gICAgICAgIGlmIChwcmVzc2VkWydEcGFkUmlnaHQnXSkgdGhpcy5vcHRpb25zLm1hcHBpbmdbJ0RwYWRSaWdodCddKG9wdGlvbnMpO1xuICAgIH1cblxuICAgIHRoaXMub25EaXNjb25uZWN0ID0gZnVuY3Rpb24gKGdhbWVwYWQpIHtcbiAgICAgICAgaWYgKCFnYW1lcGFkIHx8ICF0aGlzLmdhbWVwYWQpIHJldHVybiBmYWxzZTtcbiAgICAgICAgaWYgKHRoaXMuZ2FtZXBhZC5pZCAhPT0gZ2FtZXBhZC5pZCkgdGhyb3cgbmV3IEVycm9yKCdHYW1lcGFkIGlkIGRvZXMgbm90IG1hdGNoIScpO1xuICAgICAgICB0aGlzLmdhbWVwYWQucmVtb3ZlKCk7XG4gICAgICAgIHRoaXMuZ2FtZXBhZCA9IG51bGw7XG4gICAgfVxuXG5cbiAgICB0aGlzLmluaXQoZ2FtZXBhZCk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBHYW1pbmc7Il0sIm5hbWVzIjpbIkdhbWluZyIsImdhbWVwYWQiLCJnZW9mbG8iLCJzdXBwb3J0ZWQiLCJFcnJvciIsImNvbnRyb2wiLCJvcHRpb25zIiwibGF5b3V0IiwiY2xhbXAiLCJ4IiwieSIsIm0iLCJNYXRoIiwic3FydCIsImRlYWR6b25lIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwidW5kZWZpbmVkIiwib3ZlciIsIm5vdmVyIiwibngiLCJueSIsInJlcXVlc3QiLCJyZWZyZXNoIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwid2luZG93IiwibmF2aWdhdG9yIiwiZ2V0R2FtZXBhZHMiLCJ3ZWJraXRHZXRHYW1lcGFkcyIsInFzIiwicyIsInAiLCJxdWVyeVNlbGVjdG9yIiwiZG9jdW1lbnQiLCJvbiIsImV2ZW50TmFtZSIsImNhbGxiYWNrIiwiYXNzb2NpYXRlRXZlbnQiLCJhZnRlciIsImJlZm9yZSIsImFkZEV2ZW50TGlzdGVuZXJzIiwiX3RoaXMiLCJPYmplY3QiLCJlbnRyaWVzIiwiZm9yRWFjaCIsImVudHJ5Iiwia2V5IiwidmFsIiwidmFsdWUiLCJvbkV2ZW50IiwiZGVlcEFzc2lnbiIsInRhcmdldCIsInNvdXJjZSIsIl9yZWYiLCJfcmVmJGlzTXV0YXRpbmdPayIsImlzTXV0YXRpbmdPayIsIl9yZWYkaXNTdHJpY3RseVNhZmUiLCJpc1N0cmljdGx5U2FmZSIsImNsb25lIiwiX2kiLCJfT2JqZWN0JGVudHJpZXMiLCJfT2JqZWN0JGVudHJpZXMkX2kiLCJfc2xpY2VkVG9BcnJheSIsIl90eXBlb2YiLCJvYmoiLCJKU09OIiwicGFyc2UiLCJzdHJpbmdpZnkiLCJlcnIiLCJjb25zb2xlIiwid2FybiIsIl9vYmplY3RTcHJlYWQiLCJjYWxjdWxhdGVJbnRlcm1lZGlhdGVQb2ludCIsInBvaW50MSIsInBvaW50MiIsInBlcmMiLCJsYXQxIiwiZGVncmVlc1RvUmFkaWFucyIsImxuZzEiLCJsYXQyIiwibG5nMiIsImRlbHRhTGF0IiwiZGVsdGFMbmciLCJjYWxjQSIsInNpbiIsImNvcyIsImNhbGNCIiwiYXRhbjIiLCJBIiwiQiIsInoiLCJsYXQzIiwibG5nMyIsInJhZGlhbnNUb0RlZ3JlZXMiLCJwb2ludEF0UGVyY2VudCIsInAwIiwicDEiLCJwZXJjZW50IiwiZGVncmVlcyIsIlBJIiwicmFkaWFucyIsImluaXQiLCJlbmFibGUiLCJlcnJvciIsIm1hcCIsImZpcmUiLCJpZCIsImRldGFpbCIsInNldEdhbWVwYWQiLCJnYW1lcGFkcyIsImkiLCJqIiwiY29ubmVjdGVkIiwiYnV0dG9ucyIsImJ1dHRvbiIsIm5hbWUiLCJjb25jYXQiLCJwcmVzc2VkIiwiYnV0dG9uQWN0aW9ucyIsImFjdGlvbiIsImF4ZXNCb3hDb3VudCIsImF4ZXMiLCJ2YWx1ZVgiLCJ2YWx1ZVkiLCJsYXN0X29kZF9heGlzIiwiX2RlYWR6b25lIiwiX2RlYWR6b25lMiIsIl9jbGFtcCIsIl9jbGFtcDIiLCJOdW1iZXIiLCJ0b0ZpeGVkIiwiYXhlIiwiZmxvb3IiLCJheGVWYWx1ZXMiLCJyaWdodFRyaWdnZXIiLCJqb3lzdGljayIsIm1pbiIsImxlZnRUcmlnZ2VyIiwidXBUcmlnZ2VyIiwiZG93blRyaWdnZXIiLCJ0cmlnZ2VyIiwidHJpZ2dlcmVkIiwiaW5kZXgiLCJhY3Rpb25zIiwiYXhlc0FjdGlvbnMiLCJtYXgiLCJyZW1vdmUiLCJkaXNjb25uZWN0Iiwic2V0TWFwIiwiaGFuZGxlTW92ZSIsInRyYW5zZm9ybSIsImNlbnRlciIsImdldENlbnRlciIsInpvb20iLCJnZXRab29tIiwicGl0Y2giLCJnZXRQaXRjaCIsImJlYXJpbmciLCJnZXRCZWFyaW5nIiwibGF0IiwibWFwYm94Z2wiLCJMbmdMYXQiLCJwb2ludExvY2F0aW9uIiwiX3VwZGF0ZSIsImNyb3NzaGFpcnMiLCJjZW50ZXJNYXJrZXIiLCJzZXRNYXJrZXIiLCJjdXJyZW50TW9kZSIsImxuZ0xhdCIsImNhbWVyYSIsImZyZWUiLCJzZXRDb250YWluZXIiLCJ0YWdOYW1lIiwiY2xhc3NOYW1lIiwiY29udGFpbmVyIiwiZWwiLCJjcmVhdGVFbGVtZW50IiwiYXBwZW5kQ2hpbGQiLCJzZXRMb2NhdGlvbiIsInN0eWxlIiwidmlzaWJpbGl0eSIsImRlYnVnIiwibGVmdCIsInRvcCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsInNldENlbnRlck1hcmtlciIsInR5cGUiLCJoYXB0aWNBY3R1YXRvciIsInZpYnJhdGlvbk1vZGUiLCJ2aWJyYXRpb24iLCJtYXBwaW5nIiwiZG93biIsInJpZ2h0IiwidXAiLCJoYXB0aWNBY3R1YXRvcnMiLCJwdWxzZSIsImhhcHRpYyIsInZpYnJhdGlvbkFjdHVhdG9yIiwicGxheUVmZmVjdCIsImhhc0pveXN0aWNrcyIsInZhbHVlcyIsImluY2x1ZGVzIiwiZmlsdGVyIiwiYiIsInNldENlbnRlciIsImRwYWQiLCJkaWFnIiwia2V5cyIsInN0YXJ0IiwiaG90RmVhdHVyZSIsImxhc3RNb3ZlIiwiZW5kIiwiZGVzdCIsInR1cmYiLCJkZXN0aW5hdGlvbiIsInBvaW50IiwiZGlzdGFuY2UiLCJnZW9tZXRyeSIsImNvb3JkaW5hdGVzIiwibG5nTGF0cyIsImxuZyIsImxvY2F0aW9uIiwiY29vcmRzIiwidW5wcm9qZWN0IiwicGFuIiwic3BlZWQiLCJtaWQiLCJzZXRCZWFyaW5nIiwiYmVhcmluZ011bHRpIiwiYWJzIiwic2V0UGl0Y2giLCJwaXRjaE11bHRpIiwic2V0Wm9vbSIsIm91dCIsInNldFNwZWVkIiwibWF0Y2giLCJidXR0b25JZCIsInBhcnNlSW50IiwibG9nIiwiTUVTU0FHRVMiLCJJTlZBTElEX0JVVFRPTiIsIm1hdGNoZXMiLCJkaXJlY3Rpb24iLCJvbkluaXQiLCJpbml0aWF0ZWQiLCJnZXRDb250YWluZXIiLCJfZGVmaW5lUHJvcGVydHkiLCJtb2RlIiwib3JpZ2luYWxFdmVudCIsIm9uRGlzY29ubmVjdCJdLCJzb3VyY2VSb290IjoiIn0=