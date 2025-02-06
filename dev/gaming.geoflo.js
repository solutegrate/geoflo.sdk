/*!
 * /*!
 *  * GeoFlo SDK
 *  * Version 1.0.11
 *  * Generated on: 2025-02-06T18:03:29.215Z
 *  * /
 */
"use strict";
(self["webpackChunk_solutegrate_geoflo"] = self["webpackChunk_solutegrate_geoflo"] || []).push([["gaming"],{

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QyxDQUFDeEwsT0FBTyxDQUFDO0lBQ2xFLElBQUkrRyxPQUFPLENBQUMsV0FBVyxDQUFDLEVBQUUsSUFBSSxDQUFDL0csT0FBTyxDQUFDd0wsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDeEwsT0FBTyxDQUFDO0lBRXBFLElBQUkrRyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDL0csT0FBTyxDQUFDd0wsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDeEwsT0FBTyxDQUFDO0lBQ3BELElBQUkrRyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDL0csT0FBTyxDQUFDd0wsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDeEwsT0FBTyxDQUFDO0lBQ3BELElBQUkrRyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDL0csT0FBTyxDQUFDd0wsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDeEwsT0FBTyxDQUFDO0lBQ3BELElBQUkrRyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDL0csT0FBTyxDQUFDd0wsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDeEwsT0FBTyxDQUFDO0lBRXBELElBQUkrRyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUUsSUFBSSxDQUFDL0csT0FBTyxDQUFDd0wsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDeEwsT0FBTyxDQUFDO0lBQzVELElBQUkrRyxPQUFPLENBQUMsUUFBUSxDQUFDLEVBQUUsSUFBSSxDQUFDL0csT0FBTyxDQUFDd0wsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDeEwsT0FBTyxDQUFDO0lBQzlELElBQUkrRyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUUsSUFBSSxDQUFDL0csT0FBTyxDQUFDd0wsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDeEwsT0FBTyxDQUFDO0lBQzVELElBQUkrRyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsSUFBSSxDQUFDL0csT0FBTyxDQUFDd0wsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDeEwsT0FBTyxDQUFDO0lBQzFELElBQUkrRyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsSUFBSSxDQUFDL0csT0FBTyxDQUFDd0wsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDeEwsT0FBTyxDQUFDO0lBRTFELElBQUkrRyxPQUFPLENBQUMsUUFBUSxDQUFDLEVBQUUsSUFBSSxDQUFDL0csT0FBTyxDQUFDd0wsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDeEwsT0FBTyxDQUFDO0lBQzlELElBQUkrRyxPQUFPLENBQUMsVUFBVSxDQUFDLEVBQUUsSUFBSSxDQUFDL0csT0FBTyxDQUFDd0wsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDeEwsT0FBTyxDQUFDO0lBQ2xFLElBQUkrRyxPQUFPLENBQUMsVUFBVSxDQUFDLEVBQUUsSUFBSSxDQUFDL0csT0FBTyxDQUFDd0wsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDeEwsT0FBTyxDQUFDO0lBQ2xFLElBQUkrRyxPQUFPLENBQUMsV0FBVyxDQUFDLEVBQUUsSUFBSSxDQUFDL0csT0FBTyxDQUFDd0wsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDeEwsT0FBTyxDQUFDO0VBQ3hFLENBQUM7RUFFRCxJQUFJLENBQUNtUCxZQUFZLEdBQUcsVUFBVXhQLE9BQU8sRUFBRTtJQUNuQyxJQUFJLENBQUNBLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQ0EsT0FBTyxFQUFFLE9BQU8sS0FBSztJQUMzQyxJQUFJLElBQUksQ0FBQ0EsT0FBTyxDQUFDeUcsRUFBRSxLQUFLekcsT0FBTyxDQUFDeUcsRUFBRSxFQUFFLE1BQU0sSUFBSXRHLEtBQUssQ0FBQyw0QkFBNEIsQ0FBQztJQUNqRixJQUFJLENBQUNILE9BQU8sQ0FBQ2lKLE1BQU0sQ0FBQyxDQUFDO0lBQ3JCLElBQUksQ0FBQ2pKLE9BQU8sR0FBRyxJQUFJO0VBQ3ZCLENBQUM7RUFHRCxJQUFJLENBQUNvRyxJQUFJLENBQUNwRyxPQUFPLENBQUM7QUFDdEIsQ0FBQztBQUVELGlFQUFlRCxNQUFNIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vQHNvbHV0ZWdyYXRlL2dlb2Zsby8uL3NyYy9HYW1pbmcuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbWl4aW5cbiAqIEBtZW1iZXJvZiBtb2R1bGU6Z2VvZmxvXG4gKiBAbmFtZSBHYW1pbmdcbiAqIEBkZXNjcmlwdGlvbiBUaGlzIG1vZHVsZSBwcm92aWRlcyB0aGUgZ2FtZXBhZCBmdW5jdGlvbmFsaXR5IGZvciB0aGUgR2VvZmxvIGFwcGxpY2F0aW9uLiBJdCBhbGxvd3MgdXNlcnMgdG8gaW50ZXJhY3Qgd2l0aCB0aGUgbWFwIHVzaW5nIGEgZ2FtZXBhZCBjb250cm9sbGVyLlxuICogQHBhcmFtIHtPYmplY3R9IGdhbWVwYWQgLSBUaGUgZ2FtZXBhZCBvYmplY3QgdG8gYmUgaW5pdGlhbGl6ZWQuXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIFRoZSBvcHRpb25zIGZvciBnYW1lcGFkIGluaXRpYWxpemF0aW9uLiBDb21lcyBmcm9tIGdlb0Zsby5vcHRpb25zLmdhbWVwYWQuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBUaGUgY3VycmVudCBvYmplY3QgaW5zdGFuY2UuXG4gKi9cbmNvbnN0IEdhbWluZyA9IGZ1bmN0aW9uIChnYW1lcGFkKSB7XG4gICAgY29uc3QgZ2VvZmxvID0gdGhpcy5nZW9mbG87XG5cbiAgICBpZiAoIXN1cHBvcnRlZCgpKSB0aHJvdyBuZXcgRXJyb3IoJ0dhbWVwYWRzIGFyZSBub3Qgc3VwcG9ydGVkIG9uIHlvdXIgYnJvd3NlciEnKTtcbiAgICBcbiAgICBjb25zdCBjb250cm9sID0gdGhpcztcblxuICAgIHRoaXMub3B0aW9ucyA9IGdlb2Zsby5vcHRpb25zLmdhbWVwYWQ7XG5cbiAgICBjb25zdCBsYXlvdXQgPSB7XG4gICAgICAgIFwic2VsZWN0XCI6ICdTZWxlY3QnLFxuICAgICAgICBcInN0YXJ0XCI6ICdTdGFydCcsXG4gICAgICAgIFwicG93ZXJcIjogJ1Bvd2VyJyxcbiAgICAgICAgXCJidXR0b24wXCI6ICdCJyxcbiAgICAgICAgXCJidXR0b24xXCI6ICdBJyxcbiAgICAgICAgXCJidXR0b24yXCI6ICdZJyxcbiAgICAgICAgXCJidXR0b24zXCI6ICdYJyxcbiAgICAgICAgXCJidXR0b240XCI6ICdCdW1wTGVmdCcsXG4gICAgICAgIFwiYnV0dG9uNVwiOiAnQnVtcFJpZ2h0JyxcbiAgICAgICAgXCJidXR0b242XCI6ICdUcmlnTGVmdCcsXG4gICAgICAgIFwiYnV0dG9uN1wiOiAnVHJpZ1JpZ2h0JyxcbiAgICAgICAgXCJidXR0b244XCI6ICdTZWxlY3QnLFxuICAgICAgICBcImJ1dHRvbjlcIjogJ1N0YXJ0JyxcbiAgICAgICAgXCJidXR0b24xMFwiOiAnSm95TGVmdENsaWNrJyxcbiAgICAgICAgXCJidXR0b24xMVwiOiAnSm95UmlnaHRDbGljaycsXG4gICAgICAgIFwiYnV0dG9uMTJcIjogJ0RwYWRVcCcsXG4gICAgICAgIFwiYnV0dG9uMTNcIjogJ0RwYWREb3duJyxcbiAgICAgICAgXCJidXR0b24xNFwiOiAnRHBhZExlZnQnLFxuICAgICAgICBcImJ1dHRvbjE1XCI6ICdEcGFkUmlnaHQnLFxuICAgICAgICBcImJ1dHRvbjE2XCI6ICdQb3dlcicsXG4gICAgICAgIFwiYnV0dG9uMTdcIjogJ01pc2MnLFxuICAgICAgICBcInVwMFwiOiAnSm95TGVmdFVwJyxcbiAgICAgICAgXCJkb3duMFwiOiAnSm95TGVmdERvd24nLFxuICAgICAgICBcInJpZ2h0MFwiOiAnSm95TGVmdFJpZ2h0JyxcbiAgICAgICAgXCJsZWZ0MFwiOiAnSm95TGVmdExlZnQnLFxuICAgICAgICBcInVwMVwiOiAnSm95UmlnaHRVcCcsXG4gICAgICAgIFwiZG93bjFcIjogJ0pveVJpZ2h0RG93bicsXG4gICAgICAgIFwicmlnaHQxXCI6ICdKb3lSaWdodFJpZ2h0JyxcbiAgICAgICAgXCJsZWZ0MVwiOiAnSm95UmlnaHRMZWZ0JyxcbiAgICAgICAgXCJsMVwiOiAnQnVtcExlZnQnLFxuICAgICAgICBcInIxXCI6ICdCdW1wUmlnaHQnLFxuICAgICAgICBcImwyXCI6ICdUcmlnTGVmdCcsXG4gICAgICAgIFwicjJcIjogJ1RyaWdSaWdodCdcbiAgICB9XG5cblxuICAgIGZ1bmN0aW9uIGNsYW1wKHgsIHkpIHtcbiAgICAgICAgbGV0IG0gPSBNYXRoLnNxcnQoeCp4ICsgeSp5KTsgLy8gTWFnbml0dWRlIChsZW5ndGgpIG9mIHZlY3RvclxuXG4gICAgICAgIC8vIElmIHRoZSBsZW5ndGggZ3JlYXRlciB0aGFuIDEsIG5vcm1hbGl6ZSBpdCAoc2V0IGl0IHRvIDEpXG4gICAgICAgIGlmIChtID4gMSkge1xuICAgICAgICAgICAgeCAvPSBtO1xuICAgICAgICAgICAgeSAvPSBtO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIFt4LCB5XTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkZWFkem9uZSh4LCB5LCBkZWFkem9uZT0wLjIpIHtcbiAgICAgICAgbGV0IG0gPSBNYXRoLnNxcnQoeCp4ICsgeSp5KTtcblxuICAgICAgICBpZiAobSA8IGRlYWR6b25lKVxuICAgICAgICAgICAgcmV0dXJuIFswLCAwXTtcblxuICAgICAgICBsZXQgb3ZlciA9IG0gLSBkZWFkem9uZTsgIC8vIDAgLT4gMSAtIERFQURaT05FXG4gICAgICAgIGxldCBub3ZlciA9IG92ZXIgLyAoMSAtIGRlYWR6b25lKTsgIC8vIDAgLT4gMVxuXG4gICAgICAgIGxldCBueCA9IHggLyBtO1xuICAgICAgICBsZXQgbnkgPSB5IC8gbTtcblxuICAgICAgICByZXR1cm4gW254ICogbm92ZXIsIG55ICogbm92ZXJdO1xuICAgICAgICBcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZXF1ZXN0KCkge1xuICAgICAgICBjb250cm9sLnJlZnJlc2goKTtcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHJlcXVlc3QpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHN1cHBvcnRlZCgpIHtcbiAgICAgICAgcmV0dXJuICh3aW5kb3cubmF2aWdhdG9yLmdldEdhbWVwYWRzICYmIHR5cGVvZiB3aW5kb3cubmF2aWdhdG9yLmdldEdhbWVwYWRzID09PSAnZnVuY3Rpb24nKSB8fFxuICAgICAgICAgICAgKHdpbmRvdy5uYXZpZ2F0b3IuZ2V0R2FtZXBhZHMgJiYgdHlwZW9mIHdpbmRvdy5uYXZpZ2F0b3Iud2Via2l0R2V0R2FtZXBhZHMgPT09ICdmdW5jdGlvbicpIHx8XG4gICAgICAgICAgICBmYWxzZTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBxcyhzLCBwKSB7XG4gICAgICAgIGlmIChwKSB7XG4gICAgICAgICAgICByZXR1cm4gcC5xdWVyeVNlbGVjdG9yKHMpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHMpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uKGV2ZW50TmFtZSwgY2FsbGJhY2spIHtcbiAgICAgICAgcmV0dXJuIGNvbnRyb2wuYXNzb2NpYXRlRXZlbnQoZXZlbnROYW1lLCBjYWxsYmFjaywgJ2FjdGlvbicpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFmdGVyKGV2ZW50TmFtZSwgY2FsbGJhY2spIHtcbiAgICAgICAgcmV0dXJuIGNvbnRyb2wuYXNzb2NpYXRlRXZlbnQoZXZlbnROYW1lLCBjYWxsYmFjaywgJ2FmdGVyJyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYmVmb3JlKGV2ZW50TmFtZSwgY2FsbGJhY2spIHtcbiAgICAgICAgcmV0dXJuIGNvbnRyb2wuYXNzb2NpYXRlRXZlbnQoZXZlbnROYW1lLCBjYWxsYmFjaywgJ2JlZm9yZScpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFkZEV2ZW50TGlzdGVuZXJzKF90aGlzLCBnYW1lcGFkKSB7XG4gICAgICAgIGlmICghZ2FtZXBhZCB8fCAhbGF5b3V0KSByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgT2JqZWN0LmVudHJpZXMobGF5b3V0KS5mb3JFYWNoKGZ1bmN0aW9uIChlbnRyeSkge1xuICAgICAgICAgICAgdmFyIGtleSA9IGVudHJ5WzBdO1xuICAgICAgICAgICAgdmFyIHZhbCA9IGVudHJ5WzFdO1xuXG4gICAgICAgICAgICBiZWZvcmUoa2V5LCBmdW5jdGlvbiAodmFsdWUpIHsgcmV0dXJuIF90aGlzLm9uRXZlbnQoJ3ByZXNzJywga2V5LCB2YWwsIHZhbHVlKTsgfSk7XG4gICAgICAgICAgICBvbihrZXksIGZ1bmN0aW9uICh2YWx1ZSkgeyByZXR1cm4gX3RoaXMub25FdmVudCgnaG9sZCcsIGtleSwgdmFsLCB2YWx1ZSk7IH0pO1xuICAgICAgICAgICAgYWZ0ZXIoa2V5LCBmdW5jdGlvbiAodmFsdWUpIHsgcmV0dXJuIF90aGlzLm9uRXZlbnQoJ3JlbGVhc2UnLCBrZXksIHZhbCwgdmFsdWUpOyB9KTtcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkZWVwQXNzaWduKHRhcmdldCwgc291cmNlLCB7aXNNdXRhdGluZ09rID0gZmFsc2UsIGlzU3RyaWN0bHlTYWZlID0gZmFsc2V9ID0ge30pIHtcbiAgICAgICAgdGFyZ2V0ID0gaXNNdXRhdGluZ09rID8gdGFyZ2V0IDogY2xvbmUodGFyZ2V0LCBpc1N0cmljdGx5U2FmZSk7XG5cbiAgICAgICAgZm9yIChjb25zdCBba2V5LCB2YWxdIG9mIE9iamVjdC5lbnRyaWVzKHNvdXJjZSkpIHtcbiAgICAgICAgICAgIGlmICh2YWwgIT09IG51bGwgJiYgdHlwZW9mIHZhbCA9PT0gYG9iamVjdGApIHtcbiAgICAgICAgICAgICAgICBpZiAodGFyZ2V0W2tleV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICB0YXJnZXRba2V5XSA9IHt9O1xuICAgICAgICAgICAgICAgIH1cbiAgICBcbiAgICAgICAgICAgICAgICB0YXJnZXRba2V5XSA9IGRlZXBBc3NpZ24odGFyZ2V0W2tleV0sIHZhbCwge2lzTXV0YXRpbmdPazogdHJ1ZSwgaXNTdHJpY3RseVNhZmV9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0W2tleV0gPSB2YWw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBjbG9uZShvYmosIGlzU3RyaWN0bHlTYWZlID0gZmFsc2UpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkob2JqKSk7XG4gICAgICAgICAgICB9IGNhdGNoKGVycikge1xuICAgICAgICAgICAgICAgIGlmIChpc1N0cmljdGx5U2FmZSkgeyB0aHJvdyBuZXcgRXJyb3IoKSB9XG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGBVbnNhZmUgY2xvbmUgb2Ygb2JqZWN0YCwgb2JqKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gey4uLm9ian07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGFyZ2V0O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNhbGN1bGF0ZUludGVybWVkaWF0ZVBvaW50KHBvaW50MSwgcG9pbnQyLCBwZXJjKSB7XG4gICAgICAgIHZhciBsYXQxID0gZGVncmVlc1RvUmFkaWFucyhwb2ludDFbMV0pO1xuICAgICAgICB2YXIgbG5nMSA9IGRlZ3JlZXNUb1JhZGlhbnMocG9pbnQxWzBdKTtcbiAgICAgICAgdmFyIGxhdDIgPSBkZWdyZWVzVG9SYWRpYW5zKHBvaW50MlsxXSk7XG4gICAgICAgIHZhciBsbmcyID0gZGVncmVlc1RvUmFkaWFucyhwb2ludDJbMF0pO1xuXG4gICAgICAgIHZhciBkZWx0YUxhdCA9IGxhdDIgLSBsYXQxO1xuICAgICAgICB2YXIgZGVsdGFMbmcgPSBsbmcyIC0gbG5nMTtcbiAgICAgICAgXG4gICAgICAgIHZhciBjYWxjQSA9IE1hdGguc2luKGRlbHRhTGF0IC8gMikgKiBNYXRoLnNpbihkZWx0YUxhdCAvIDIpICsgTWF0aC5jb3MobGF0MSkgKiBNYXRoLmNvcyhsYXQyKSAqIE1hdGguc2luKGRlbHRhTG5nIC8gMikgKiBNYXRoLnNpbihkZWx0YUxuZyAvIDIpO1xuICAgICAgICB2YXIgY2FsY0IgPSAyICogTWF0aC5hdGFuMihNYXRoLnNxcnQoY2FsY0EpLCBNYXRoLnNxcnQoMSAtIGNhbGNBKSk7XG4gICAgICAgIFxuICAgICAgICB2YXIgQSA9IE1hdGguc2luKCgxIC0gcGVyYykgKiBjYWxjQikgLyBNYXRoLnNpbihjYWxjQik7XG4gICAgICAgIHZhciBCID0gTWF0aC5zaW4ocGVyYyAqIGNhbGNCKSAvIE1hdGguc2luKGNhbGNCKTtcbiAgICAgICAgXG4gICAgICAgIHZhciB4ID0gQSAqIE1hdGguY29zKGxhdDEpICogTWF0aC5jb3MobG5nMSkgKyBCICogTWF0aC5jb3MobGF0MikgKiBNYXRoLmNvcyhsbmcyKTtcbiAgICAgICAgdmFyIHkgPSBBICogTWF0aC5jb3MobGF0MSkgKiBNYXRoLnNpbihsbmcxKSArIEIgKiBNYXRoLmNvcyhsYXQyKSAqIE1hdGguc2luKGxuZzIpO1xuICAgICAgICB2YXIgeiA9IEEgKiBNYXRoLnNpbihsYXQxKSArIEIgKiBNYXRoLnNpbihsYXQyKTtcbiAgICAgICAgXG4gICAgICAgIHZhciBsYXQzID0gTWF0aC5hdGFuMih6LCBNYXRoLnNxcnQoeCAqIHggKyB5ICogeSkpO1xuICAgICAgICB2YXIgbG5nMyA9IE1hdGguYXRhbjIoeSwgeCk7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gW3JhZGlhbnNUb0RlZ3JlZXMobG5nMyksIHJhZGlhbnNUb0RlZ3JlZXMobGF0MyldXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcG9pbnRBdFBlcmNlbnQocDAsIHAxLCBwZXJjZW50KSB7XG4gICAgICAgIHZhciB4O1xuICAgICAgICBpZiAocDAueCAhPT0gcDEueClcbiAgICAgICAgICAgIHggPSBwMC54ICsgcGVyY2VudCAqIChwMS54IC0gcDAueCk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHggPSBwMC54O1xuICAgIFxuICAgICAgICB2YXIgeTtcbiAgICAgICAgaWYgKHAwLnkgIT09IHAxLnkpXG4gICAgICAgICAgICB5ID0gcDAueSArIHBlcmNlbnQgKiAocDEueSAtIHAwLnkpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICB5ID0gcDAueTtcbiAgICBcbiAgICAgICAgdmFyIHAgPSB7XG4gICAgICAgICAgICB4OiB4LFxuICAgICAgICAgICAgeTogeVxuICAgICAgICB9O1xuICAgIFxuICAgICAgICByZXR1cm4gcDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkZWdyZWVzVG9SYWRpYW5zKGRlZ3JlZXMpIHtcbiAgICAgICAgcmV0dXJuIGRlZ3JlZXMgKiAoTWF0aC5QSSAvIDE4MCk7XG4gICAgfVxuICAgICAgICBcbiAgICBmdW5jdGlvbiByYWRpYW5zVG9EZWdyZWVzKHJhZGlhbnMpIHtcbiAgICAgICAgcmV0dXJuIHJhZGlhbnMgKiAoMTgwIC8gTWF0aC5QSSApO1xuICAgIH1cblxuICAgIFxuXG5cblxuXG5cblx0LyoqXG5cdCAqIEBmdW5jdGlvblxuICAgICAqIEBtZW1iZXJvZiBtb2R1bGU6Z2VvZmxvLkdhbWluZ1xuXHQgKiBAbmFtZSBpbml0XG5cdCAqIEBkZXNjcmlwdGlvbiBUaGlzIGZ1bmN0aW9uIGluaXRpYWxpemVzIHRoZSBnYW1lcGFkIHdpdGggdGhlIHNwZWNpZmllZCBvcHRpb25zLiBJdCBmaXJlcyBhbiBldmVudCB0byBub3RpZnkgdGhlIGdhbWVwYWQgaW5pdGlhbGl6YXRpb24sIHNldHMgdGhlIGdhbWVwYWQsIGFkZHMgZXZlbnQgbGlzdGVuZXJzLCBhbmQgcmVxdWVzdHMgYW5pbWF0aW9uIGZyYW1lLlxuXHQgKiBAcGFyYW0ge09iamVjdH0gZ2FtZXBhZCAtIFRoZSBnYW1lcGFkIG9iamVjdCB0byBiZSBpbml0aWFsaXplZC5cblx0ICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBUaGUgb3B0aW9ucyBmb3IgZ2FtZXBhZCBpbml0aWFsaXphdGlvbi5cblx0ICogQHJldHVybnMge09iamVjdH0gVGhlIGN1cnJlbnQgb2JqZWN0IGluc3RhbmNlLlxuXHQgKi9cbiAgICB0aGlzLmluaXQgPSBmdW5jdGlvbiAoZ2FtZXBhZCwgb3B0aW9ucykge1xuICAgICAgICBpZiAoIWdhbWVwYWQpIHJldHVybiBmYWxzZTtcbiAgICAgICAgaWYgKCF0aGlzLm9wdGlvbnMuZW5hYmxlKSByZXR1cm4gY29uc29sZS5lcnJvcignR2FtZXBhZCBvcHRpb24gaXMgbm90IGVuYWJsZWQhJylcbiAgICAgICAgZ2VvZmxvLm1hcC5maXJlKGdlb2Zsby5pZCArICc6Z2FtZXBhZC5pbml0JywgeyBkZXRhaWw6IHsgZ2FtZXBhZDogZ2FtZXBhZCB9IH0pO1xuICAgICAgICB0aGlzLnNldEdhbWVwYWQoZ2FtZXBhZCk7XG4gICAgICAgIGFkZEV2ZW50TGlzdGVuZXJzKHRoaXMsIHRoaXMuZ2FtZXBhZCk7XG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShyZXF1ZXN0KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG5cdC8qKlxuXHQgKiBAZnVuY3Rpb25cbiAgICAgKiBAbWVtYmVyb2YgbW9kdWxlOmdlb2Zsby5HYW1pbmdcblx0ICogQG5hbWUgcmVmcmVzaFxuXHQgKiBAZGVzY3JpcHRpb24gUmVmcmVzaGVzIHRoZSBnYW1lcGFkIHN0YXRlIGJ5IGNoZWNraW5nIGJ1dHRvbiBwcmVzc2VzLCBheGVzIHZhbHVlcywgYW5kIHRyaWdnZXJzLlxuXHQgKiBAcGFyYW1zIHt2b2lkfVxuXHQgKiBAcmV0dXJucyB7dm9pZH1cblx0ICovXG4gICAgdGhpcy5yZWZyZXNoID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZ2FtZXBhZHMgPSB3aW5kb3cubmF2aWdhdG9yLmdldEdhbWVwYWRzKCk7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBnYW1lcGFkcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIGdhbWVwYWQgPSBnYW1lcGFkc1t0aGlzLmdhbWVwYWQuaWRdO1xuICAgICAgICAgICAgdmFyIGo7XG5cbiAgICAgICAgICAgIGlmICghZ2FtZXBhZCB8fCAhZ2FtZXBhZC5jb25uZWN0ZWQpIHsgY29udGludWU7IH1cblxuICAgICAgICAgICAgZm9yIChqID0gMDsgaiA8IGdhbWVwYWQuYnV0dG9ucy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgIHZhciBidXR0b24gPSBnYW1lcGFkLmJ1dHRvbnNbal07XG4gICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gYnV0dG9uLnZhbHVlO1xuICAgICAgICAgICAgICAgIHZhciBuYW1lID0gdGhpcy5nYW1lcGFkLmxheW91dFtgYnV0dG9uJHtqfWBdXG5cbiAgICAgICAgICAgICAgICBpZiAoYnV0dG9uLnByZXNzZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmdhbWVwYWQucHJlc3NlZFtuYW1lXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lcGFkLnByZXNzZWRbbmFtZV0gPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lcGFkLmJ1dHRvbkFjdGlvbnNbal0uYmVmb3JlID8gdGhpcy5nYW1lcGFkLmJ1dHRvbkFjdGlvbnNbal0uYmVmb3JlKHZhbHVlKSA6IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lcGFkLmJ1dHRvbkFjdGlvbnNbal0uYWN0aW9uID8gdGhpcy5nYW1lcGFkLmJ1dHRvbkFjdGlvbnNbal0uYWN0aW9uKHZhbHVlKSA6IGZhbHNlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5nYW1lcGFkLnByZXNzZWRbbmFtZV0pIHtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuZ2FtZXBhZC5wcmVzc2VkW25hbWVdO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWVwYWQuYnV0dG9uQWN0aW9uc1tqXS5hZnRlciA/IHRoaXMuZ2FtZXBhZC5idXR0b25BY3Rpb25zW2pdLmFmdGVyKHZhbHVlKSA6IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGF4ZXNCb3hDb3VudCA9ICgoZ2FtZXBhZC5heGVzLmxlbmd0aCArIDEpIC8gMil8MDtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIGZvciAoaiA9IDA7IGogPCBheGVzQm94Q291bnQ7IGorKykge1xuICAgICAgICAgICAgICAgIHZhciB2YWx1ZVgsIHZhbHVlWSwgdmFsdWU7XG4gICAgICAgICAgICAgICAgdmFyIGxhc3Rfb2RkX2F4aXMgPSBqID09IGF4ZXNCb3hDb3VudCAtIDEgJiYgZ2FtZXBhZC5heGVzLmxlbmd0aCAlIDIgPT0gMTtcblxuICAgICAgICAgICAgICAgIHZhbHVlWCA9IGdhbWVwYWQuYXhlc1tqKjJdO1xuICAgICAgICAgICAgICAgIHZhbHVlWSA9IGxhc3Rfb2RkX2F4aXMgPyAwIDogZ2FtZXBhZC5heGVzW2oqMiArIDFdO1xuICAgICAgICAgICAgICAgIFt2YWx1ZVgsIHZhbHVlWV0gPSBkZWFkem9uZSh2YWx1ZVgsIHZhbHVlWSk7ICAgIFxuICAgICAgICAgICAgICAgIFt2YWx1ZVgsIHZhbHVlWV0gPSBjbGFtcCh2YWx1ZVgsIHZhbHVlWSk7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSBbTnVtYmVyKHZhbHVlWC50b0ZpeGVkKDIpKSwgTnVtYmVyKHZhbHVlWS50b0ZpeGVkKDIpKV07XG5cbiAgICAgICAgICAgICAgICBjb25zdCB2YWwgPSBnYW1lcGFkLmF4ZXNbaiArIGF4ZXNCb3hDb3VudF0udG9GaXhlZCg0KTtcbiAgICAgICAgICAgICAgICBjb25zdCBheGUgPSBNYXRoLmZsb29yKGogLyAyKTtcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWVwYWQuYXhlVmFsdWVzW2F4ZV1baiAlIDJdID0gdmFsO1xuXG4gICAgICAgICAgICAgICAgdmFyIHJpZ2h0VHJpZ2dlciA9IHZhbHVlWzBdID49IHRoaXMub3B0aW9ucy5qb3lzdGljay5taW47XG4gICAgICAgICAgICAgICAgdmFyIGxlZnRUcmlnZ2VyID0gdmFsdWVbMF0gPD0gLXRoaXMub3B0aW9ucy5qb3lzdGljay5taW47XG4gICAgICAgICAgICAgICAgdmFyIHVwVHJpZ2dlciA9IHZhbHVlWzFdIDw9IC10aGlzLm9wdGlvbnMuam95c3RpY2subWluO1xuICAgICAgICAgICAgICAgIHZhciBkb3duVHJpZ2dlciA9IHZhbHVlWzFdID49IHRoaXMub3B0aW9ucy5qb3lzdGljay5taW47XG5cbiAgICAgICAgICAgICAgICB0aGlzLnRyaWdnZXIoJ3JpZ2h0JywgcmlnaHRUcmlnZ2VyLCBqLCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgdGhpcy50cmlnZ2VyKCdsZWZ0JywgbGVmdFRyaWdnZXIsIGosIHZhbHVlKTtcbiAgICAgICAgICAgICAgICB0aGlzLnRyaWdnZXIoJ2Rvd24nLCBkb3duVHJpZ2dlciwgaiwgdmFsdWUpO1xuICAgICAgICAgICAgICAgIHRoaXMudHJpZ2dlcigndXAnLCB1cFRyaWdnZXIsIGosIHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuXHQvKipcblx0ICogQGZ1bmN0aW9uXG4gICAgICogQG1lbWJlcm9mIG1vZHVsZTpnZW9mbG8uR2FtaW5nXG5cdCAqIEBuYW1lIHRyaWdnZXJcblx0ICogQGRlc2NyaXB0aW9uIFRoaXMgZnVuY3Rpb24gaGFuZGxlcyB0cmlnZ2VyaW5nIGFjdGlvbnMgYmFzZWQgb24gZ2FtZXBhZCBpbnB1dC4gSXQgY2hlY2tzIGlmIGEgc3BlY2lmaWMgYnV0dG9uIG9yIGF4aXMgaXMgdHJpZ2dlcmVkIGFuZCBwZXJmb3JtcyBjb3JyZXNwb25kaW5nIGFjdGlvbnMuXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBpZCAtIFRoZSBpZGVudGlmaWVyIG9mIHRoZSBnYW1lcGFkIGlucHV0LlxuXHQgKiBAcGFyYW0ge2Jvb2xlYW59IHRyaWdnZXJlZCAtIEluZGljYXRlcyBpZiB0aGUgaW5wdXQgaXMgdHJpZ2dlcmVkLlxuXHQgKiBAcGFyYW0ge251bWJlcn0gaW5kZXggLSBUaGUgaW5kZXggb2YgdGhlIGlucHV0LlxuXHQgKiBAcGFyYW0ge251bWJlcltdfSB2YWx1ZSAtIFRoZSB2YWx1ZSBvZiB0aGUgaW5wdXQuXG5cdCAqL1xuICAgIHRoaXMudHJpZ2dlciA9IGZ1bmN0aW9uIChpZCwgdHJpZ2dlcmVkLCBpbmRleCwgdmFsdWUpIHtcbiAgICAgICAgdmFyIGFjdGlvbnMgPSB0aGlzLmdhbWVwYWQuYXhlc0FjdGlvbnM7XG4gICAgICAgIHZhciBuYW1lID0gdGhpcy5nYW1lcGFkLmxheW91dFtgJHtpZH0ke2luZGV4fWBdO1xuICAgICAgICB2YXIgcHJlc3NlZCA9IHRoaXMuZ2FtZXBhZC5wcmVzc2VkXG5cbiAgICAgICAgaWYgKHRyaWdnZXJlZCkge1xuICAgICAgICAgICAgaWYgKCFwcmVzc2VkW25hbWVdKSB7XG4gICAgICAgICAgICAgICAgcHJlc3NlZFtuYW1lXSA9IHRydWU7XG4gICAgICAgICAgICAgICAgYWN0aW9uc1tpbmRleF1baWRdLmJlZm9yZSA/IGFjdGlvbnNbaW5kZXhdW2lkXS5iZWZvcmUodmFsdWUpIDogZmFsc2VcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFsdWUgPSBbdGhpcy5vcHRpb25zLmpveXN0aWNrLm1heCAqIHZhbHVlWzBdLCB0aGlzLm9wdGlvbnMuam95c3RpY2subWF4ICogdmFsdWVbMV1dXG4gICAgICAgICAgICBhY3Rpb25zW2luZGV4XVtpZF0uYWN0aW9uID8gYWN0aW9uc1tpbmRleF1baWRdLmFjdGlvbih2YWx1ZSkgOiBmYWxzZTtcbiAgICAgICAgfSBlbHNlIGlmIChwcmVzc2VkW25hbWVdKSB7XG4gICAgICAgICAgICBkZWxldGUgcHJlc3NlZFtuYW1lXTtcblxuICAgICAgICAgICAgaWYgKCFwcmVzc2VkWydKb3lMZWZ0VXAnXSAmJiAhcHJlc3NlZFsnSm95TGVmdERvd24nXSAmJiAhcHJlc3NlZFsnSm95TGVmdExlZnQnXSAmJiAhcHJlc3NlZFsnSm95TGVmdFJpZ2h0J10pIHtcbiAgICAgICAgICAgICAgICBhY3Rpb25zWzBdW2lkXS5hZnRlciA/IGFjdGlvbnNbMF1baWRdLmFmdGVyKHZhbHVlKSA6IGZhbHNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIXByZXNzZWRbJ0pveVJpZ2h0VXAnXSAmJiAhcHJlc3NlZFsnSm95UmlnaHREb3duJ10gJiYgIXByZXNzZWRbJ0pveVJpZ2h0TGVmdCddICYmICFwcmVzc2VkWydKb3lSaWdodFJpZ2h0J10pIHtcbiAgICAgICAgICAgICAgICBhY3Rpb25zWzFdW2lkXS5hZnRlciA/IGFjdGlvbnNbMV1baWRdLmFmdGVyKHZhbHVlKSA6IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG5cdCAqIEBmdW5jdGlvblxuICAgICAqIEBtZW1iZXJvZiBtb2R1bGU6Z2VvZmxvLkdhbWluZ1xuXHQgKiBAbmFtZSByZW1vdmVcblx0ICogQGRlc2NyaXB0aW9uIERpc2Nvbm5lY3RzIGFuZCByZW1vdmVzIHRoZSBnYW1lcGFkIG9iamVjdC5cblx0ICogQHBhcmFtIHtPYmplY3R9IGdhbWVwYWQgLSBUaGUgZ2FtZXBhZCBvYmplY3QgdG8gYmUgZGlzY29ubmVjdGVkIGFuZCByZW1vdmVkLlxuXHQgKiBAcmV0dXJucyB7dm9pZH1cblx0ICovXG4gICAgdGhpcy5yZW1vdmUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5nYW1lcGFkLmRpc2Nvbm5lY3QgPyB0aGlzLmdhbWVwYWQuZGlzY29ubmVjdCgpIDogZmFsc2U7XG4gICAgICAgIHRoaXMuZ2FtZXBhZC5yZW1vdmUgPyB0aGlzLmdhbWVwYWQucmVtb3ZlKCkgOiBmYWxzZTtcbiAgICAgICAgdGhpcy5nYW1lcGFkID0gbnVsbDtcbiAgICB9XG5cblxuXG5cblx0LyoqXG5cdCAqIEBmdW5jdGlvblxuICAgICAqIEBtZW1iZXJvZiBtb2R1bGU6Z2VvZmxvLkdhbWluZ1xuXHQgKiBAbmFtZSBzZXRNYXBcblx0ICogQGRlc2NyaXB0aW9uIFRoaXMgZnVuY3Rpb24gdXBkYXRlcyB0aGUgbWFwIHByb3BlcnRpZXMgdXNpbmcgdGhlIGhhbmRsZU1vdmUgZnVuY3Rpb24gYW5kIHNldHMgdGhlIGNlbnRlciwgem9vbSwgcGl0Y2gsIGFuZCBiZWFyaW5nIGFjY29yZGluZ2x5LlxuXHQgKiBAcGFyYW0ge0Z1bmN0aW9ufSBoYW5kbGVNb3ZlIC0gVGhlIGZ1bmN0aW9uIHVzZWQgdG8gaGFuZGxlIG1hcCBtb3ZlbWVudC5cblx0ICogQHJldHVybnMge09iamVjdH0gVGhlIHVwZGF0ZWQgbWFwIG9iamVjdCB3aXRoIG5ldyBwcm9wZXJ0aWVzLlxuXHQgKi9cbiAgICB0aGlzLnNldE1hcCA9IGZ1bmN0aW9uIChoYW5kbGVNb3ZlKSB7XG4gICAgICAgIGNvbnN0IG1hcCA9IGdlb2Zsby5tYXA7XG4gICAgICAgIGNvbnN0IHRyYW5zZm9ybSA9IG1hcC50cmFuc2Zvcm07XG4gICAgICAgIFxuICAgICAgICB0aGlzLm1hcCA9IHRoaXMubWFwIHx8IHtcbiAgICAgICAgICAgIGNlbnRlcjogbWFwLmdldENlbnRlcigpLFxuICAgICAgICAgICAgem9vbTogbWFwLmdldFpvb20oKSxcbiAgICAgICAgICAgIHBpdGNoOiBtYXAuZ2V0UGl0Y2goKSxcbiAgICAgICAgICAgIGJlYXJpbmc6IG1hcC5nZXRCZWFyaW5nKClcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdmFyIGNlbnRlciA9IHRoaXMubWFwLmNlbnRlci54ID8gdGhpcy5tYXAuY2VudGVyIDogdGhpcy5tYXAuY2VudGVyLmxhdCA/IHRoaXMubWFwLmNlbnRlciA6IG5ldyBtYXBib3hnbC5MbmdMYXQodGhpcy5tYXAuY2VudGVyWzBdLCB0aGlzLm1hcC5jZW50ZXJbMV0pXG4gICAgICAgIGNlbnRlciA9IGNlbnRlci54ID8gdHJhbnNmb3JtLnBvaW50TG9jYXRpb24oY2VudGVyKSA6IGNlbnRlcjtcblxuICAgICAgICB0cmFuc2Zvcm0uY2VudGVyID0gY2VudGVyO1xuICAgICAgICB0cmFuc2Zvcm0uYmVhcmluZyA9IHRoaXMubWFwLmJlYXJpbmc7XG4gICAgICAgIHRyYW5zZm9ybS56b29tID0gdGhpcy5tYXAuem9vbTtcbiAgICAgICAgdHJhbnNmb3JtLnBpdGNoID0gdGhpcy5tYXAucGl0Y2g7XG5cbiAgICAgICAgbWFwLl91cGRhdGUoKTtcblxuICAgICAgICBpZiAodGhpcy5vcHRpb25zLmNyb3NzaGFpcnMgJiYgZ2VvZmxvLmNlbnRlck1hcmtlcikgdGhpcy5zZXRNYXJrZXIoKTtcbiAgICAgICAgaWYgKGhhbmRsZU1vdmUpIGdlb2Zsby5jdXJyZW50TW9kZS5oYW5kbGVNb3ZlKHsgbG5nTGF0OiAhdGhpcy5vcHRpb25zLmNhbWVyYS5mcmVlID8gdGhpcy5tYXAuY2VudGVyIDogbWFwLmdldENlbnRlcigpLCBnYW1lcGFkOiB0aGlzIH0pXG4gICAgICAgIHJldHVybiB0aGlzLm1hcDtcbiAgICB9XG5cblx0LyoqXG5cdCAqIEBmdW5jdGlvblxuICAgICAqIEBtZW1iZXJvZiBtb2R1bGU6Z2VvZmxvLkdhbWluZ1xuXHQgKiBAbmFtZSBzZXRDb250YWluZXJcblx0ICogQGRlc2NyaXB0aW9uIENyZWF0ZXMgYSBuZXcgSFRNTCBlbGVtZW50IHdpdGggdGhlIHNwZWNpZmllZCB0YWcgbmFtZSBhbmQgY2xhc3MgbmFtZSwgYXBwZW5kcyBpdCB0byBhIGNvbnRhaW5lciBpZiBwcm92aWRlZCwgYW5kIHNldHMgaXQgYXMgdGhlIGNvbnRhaW5lciBwcm9wZXJ0eSBvZiB0aGUgY3VycmVudCBvYmplY3QuXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSB0YWdOYW1lIC0gVGhlIHRhZyBuYW1lIG9mIHRoZSBIVE1MIGVsZW1lbnQgdG8gY3JlYXRlLlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gY2xhc3NOYW1lIC0gVGhlIGNsYXNzIG5hbWUgdG8gYXNzaWduIHRvIHRoZSBjcmVhdGVkIGVsZW1lbnQgKG9wdGlvbmFsKS5cblx0ICogQHBhcmFtIHtIVE1MRWxlbWVudH0gY29udGFpbmVyIC0gVGhlIGNvbnRhaW5lciBlbGVtZW50IHRvIGFwcGVuZCB0aGUgY3JlYXRlZCBlbGVtZW50IHRvIChvcHRpb25hbCkuXG5cdCAqIEByZXR1cm5zIHtIVE1MRWxlbWVudH0gVGhlIGNyZWF0ZWQgSFRNTCBlbGVtZW50LlxuXHQgKi9cblx0XG4gICAgdGhpcy5zZXRDb250YWluZXIgPSBmdW5jdGlvbiAodGFnTmFtZSwgY2xhc3NOYW1lLCBjb250YWluZXIpIHtcbiAgICAgICAgY29uc3QgZWwgPSB3aW5kb3cuZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWdOYW1lKTtcbiAgICAgICAgaWYgKGNsYXNzTmFtZSAhPT0gdW5kZWZpbmVkKSBlbC5jbGFzc05hbWUgPSBjbGFzc05hbWU7XG4gICAgICAgIGlmIChjb250YWluZXIpIGNvbnRhaW5lci5hcHBlbmRDaGlsZChlbCk7XG4gICAgICAgIHRoaXMuY29udGFpbmVyID0gZWw7XG4gICAgICAgIHJldHVybiBlbDtcbiAgICB9XG5cblx0LyoqXG5cdCAqIEBmdW5jdGlvblxuICAgICAqIEBtZW1iZXJvZiBtb2R1bGU6Z2VvZmxvLkdhbWluZyBcblx0ICogQG5hbWUgc2V0TG9jYXRpb25cblx0ICogQGRlc2NyaXB0aW9uIFRoaXMgZnVuY3Rpb24gdXBkYXRlcyB0aGUgdmlzaWJpbGl0eSwgbGVmdCwgYW5kIHRvcCBwcm9wZXJ0aWVzIG9mIHRoZSBjb250YWluZXIgZWxlbWVudCBiYXNlZCBvbiB0aGUgcHJvdmlkZWQgdmFsdWUuXG5cdCAqIEBwYXJhbSB7QXJyYXk8bnVtYmVyPn0gdmFsdWUgLSBBbiBhcnJheSBjb250YWluaW5nIHRoZSB4IGFuZCB5IGNvb3JkaW5hdGVzIGZvciB0aGUgbmV3IGxvY2F0aW9uLlxuXHQgKiBAcmV0dXJucyB7RE9NUmVjdH0gVGhlIGJvdW5kaW5nIHJlY3RhbmdsZSBvZiB0aGUgY29udGFpbmVyIGVsZW1lbnQgYWZ0ZXIgdGhlIGxvY2F0aW9uIGlzIHNldC5cblx0ICovXG4gICAgdGhpcy5zZXRMb2NhdGlvbiA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICB0aGlzLmNvbnRhaW5lci5zdHlsZS52aXNpYmlsaXR5ID0gdGhpcy5vcHRpb25zLmRlYnVnID8gJ3Zpc2libGUnIDogJ2hpZGRlbic7XG4gICAgICAgIHRoaXMuY29udGFpbmVyLnN0eWxlLmxlZnQgPSAodmFsdWVbMF0gKyAxKSAvIDIgKiAxMDAgKyAnJSc7XG4gICAgICAgIHRoaXMuY29udGFpbmVyLnN0eWxlLnRvcCA9ICh2YWx1ZVsxXSArIDEpIC8gMiAqIDEwMCArICclJztcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGFpbmVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIH1cblxuXHQvKipcblx0ICogQGZ1bmN0aW9uXG4gICAgICogQG1lbWJlcm9mIG1vZHVsZTpnZW9mbG8uR2FtaW5nXG5cdCAqIEBuYW1lIHNldE1hcmtlclxuXHQgKiBAZGVzY3JpcHRpb24gU2V0cyBhIG1hcmtlciBvbiB0aGUgbWFwIHVzaW5nIHRoZSBjZW50ZXIgY29vcmRpbmF0ZXMgcHJvdmlkZWQgYnkgdGhlIGNvbnRleHQuXG5cdCAqIEByZXR1cm4ge09iamVjdH0gUmV0dXJucyB0aGUgbWFya2VyIG9iamVjdCBjcmVhdGVkIG9uIHRoZSBtYXAuXG5cdCAqL1xuICAgIHRoaXMuc2V0TWFya2VyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gZ2VvZmxvLnNldENlbnRlck1hcmtlcih7IGdhbWVwYWQ6IHRydWUgfSk7XG4gICAgfVxuXG5cdC8qKlxuXHQgKiBAZnVuY3Rpb25cbiAgICAgKiBAbWVtYmVyb2YgbW9kdWxlOmdlb2Zsby5HYW1pbmdcblx0ICogQG5hbWUgc2V0R2FtZXBhZFxuXHQgKiBAZGVzY3JpcHRpb24gSW5pdGlhbGl6ZXMgYSBnYW1lcGFkIG9iamVjdCB3aXRoIHNwZWNpZmljIHByb3BlcnRpZXMgYmFzZWQgb24gdGhlIHByb3ZpZGVkIGdhbWVwYWQgaW5wdXQuXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBnYW1lcGFkIC0gVGhlIGdhbWVwYWQgb2JqZWN0IHRvIGJlIHByb2Nlc3NlZC5cblx0ICogQHJldHVybnMge09iamVjdH0gLSBUaGUgcHJvY2Vzc2VkIGdhbWVwYWQgb2JqZWN0IHdpdGggZGVmaW5lZCBwcm9wZXJ0aWVzLlxuXHQgKi9cbiAgICB0aGlzLnNldEdhbWVwYWQgPSBmdW5jdGlvbiAoZ2FtZXBhZCkge1xuICAgICAgICB2YXIgb3B0aW9ucyA9IHtcbiAgICAgICAgICAgIHR5cGU6IGdhbWVwYWQuaWQsXG4gICAgICAgICAgICBjb25uZWN0ZWQ6IGdhbWVwYWQuY29ubmVjdGVkLFxuICAgICAgICAgICAgaWQ6IGdhbWVwYWQuaW5kZXgsXG4gICAgICAgICAgICBidXR0b25zOiBnYW1lcGFkLmJ1dHRvbnMubGVuZ3RoLFxuICAgICAgICAgICAgbGF5b3V0OiBsYXlvdXQsXG4gICAgICAgICAgICBheGVzOiBNYXRoLmZsb29yKGdhbWVwYWQuYXhlcy5sZW5ndGggLyAyKSxcbiAgICAgICAgICAgIGF4ZVZhbHVlczogW10sXG4gICAgICAgICAgICBoYXB0aWNBY3R1YXRvcjogbnVsbCxcbiAgICAgICAgICAgIHZpYnJhdGlvbk1vZGU6IC0xLFxuICAgICAgICAgICAgdmlicmF0aW9uOiBmYWxzZSxcbiAgICAgICAgICAgIG1hcHBpbmc6IGdhbWVwYWQubWFwcGluZyxcbiAgICAgICAgICAgIGJ1dHRvbkFjdGlvbnM6IHt9LFxuICAgICAgICAgICAgYXhlc0FjdGlvbnM6IHt9LFxuICAgICAgICAgICAgcHJlc3NlZDoge31cbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAobGV0IHggPSAwOyB4IDwgb3B0aW9ucy5idXR0b25zOyB4KyspIHtcbiAgICAgICAgICAgIG9wdGlvbnMuYnV0dG9uQWN0aW9uc1t4XSA9ICgpID0+ICh7IGFjdGlvbjogKCkgPT4geyB9LCBhZnRlcjogKCkgPT4geyB9LCBiZWZvcmU6ICgpID0+IHsgfSB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAobGV0IHggPSAwOyB4IDwgb3B0aW9ucy5heGVzOyB4KyspIHtcbiAgICAgICAgICAgIG9wdGlvbnMuYXhlc0FjdGlvbnNbeF0gPSB7XG4gICAgICAgICAgICAgICAgZG93bjogKCkgPT4gKHsgYWN0aW9uOiAoKSA9PiB7IH0sIGFmdGVyOiAoKSA9PiB7IH0sIGJlZm9yZTogKCkgPT4geyB9IH0pLFxuICAgICAgICAgICAgICAgIGxlZnQ6ICgpID0+ICh7IGFjdGlvbjogKCkgPT4geyB9LCBhZnRlcjogKCkgPT4geyB9LCBiZWZvcmU6ICgpID0+IHsgfSB9KSxcbiAgICAgICAgICAgICAgICByaWdodDogKCkgPT4gKHsgYWN0aW9uOiAoKSA9PiB7IH0sIGFmdGVyOiAoKSA9PiB7IH0sIGJlZm9yZTogKCkgPT4geyB9IH0pLFxuICAgICAgICAgICAgICAgIHVwOiAoKSA9PiAoeyBhY3Rpb246ICgpID0+IHsgfSwgYWZ0ZXI6ICgpID0+IHsgfSwgYmVmb3JlOiAoKSA9PiB7IH0gfSlcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIG9wdGlvbnMuYXhlVmFsdWVzW3hdID0gWzAsIDBdO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGdhbWVwYWQuaGFwdGljQWN0dWF0b3JzKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGdhbWVwYWQuaGFwdGljQWN0dWF0b3JzLnB1bHNlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgb3B0aW9ucy5oYXB0aWMgPSBnYW1lcGFkLmhhcHRpY0FjdHVhdG9ycztcbiAgICAgICAgICAgICAgICBvcHRpb25zLnZpYnJhdGlvbk1vZGUgPSAwO1xuICAgICAgICAgICAgICAgIG9wdGlvbnMudmlicmF0aW9uID0gdHJ1ZTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZ2FtZXBhZC5oYXB0aWNBY3R1YXRvcnNbMF0gJiYgdHlwZW9mIGdhbWVwYWQuaGFwdGljQWN0dWF0b3JzWzBdLnB1bHNlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgb3B0aW9ucy5oYXB0aWMgPSBnYW1lcGFkLmhhcHRpY0FjdHVhdG9yc1swXTtcbiAgICAgICAgICAgICAgICBvcHRpb25zLnZpYnJhdGlvbk1vZGUgPSAwO1xuICAgICAgICAgICAgICAgIG9wdGlvbnMudmlicmF0aW9uID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYgKGdhbWVwYWQudmlicmF0aW9uQWN0dWF0b3IpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgZ2FtZXBhZC52aWJyYXRpb25BY3R1YXRvci5wbGF5RWZmZWN0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgb3B0aW9ucy5oYXB0aWMgPSBnYW1lcGFkLnZpYnJhdGlvbkFjdHVhdG9yO1xuICAgICAgICAgICAgICAgIG9wdGlvbnMudmlicmF0aW9uTW9kZSA9IDE7XG4gICAgICAgICAgICAgICAgb3B0aW9ucy52aWJyYXRpb24gPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5nYW1lcGFkID0gb3B0aW9ucztcbiAgICAgICAgdGhpcy5oYXNKb3lzdGlja3MgPSBvcHRpb25zLmF4ZXMgPiAwICYmIE9iamVjdC52YWx1ZXModGhpcy5nYW1lcGFkLmxheW91dCkubWFwKGZ1bmN0aW9uKG0pIHsgcmV0dXJuIG0uaW5jbHVkZXMoJ0pveScpIH0pLmZpbHRlcihmdW5jdGlvbiAoYikgeyByZXR1cm4gYiB9KS5sZW5ndGggPiAwO1xuICAgICAgICByZXR1cm4gdGhpcy5nYW1lcGFkO1xuICAgIH1cblxuXHQvKipcblx0ICogQGZ1bmN0aW9uXG4gICAgICogQG1lbWJlcm9mIG1vZHVsZTpnZW9mbG8uR2FtaW5nXG5cdCAqIEBuYW1lIHNldENlbnRlclxuXHQgKiBAZGVzY3JpcHRpb24gVGhpcyBmdW5jdGlvbiBjYWxjdWxhdGVzIHRoZSBuZXcgY2VudGVyIG9mIHRoZSBtYXAgYmFzZWQgb24gdGhlIGlucHV0IHZhbHVlcyBhbmQgZ2FtZXBhZCBjb250cm9scy4gSXQgaGFuZGxlcyBib3RoIGpveXN0aWNrIGFuZCBELXBhZCBpbnB1dHMgdG8gYWRqdXN0IHRoZSBtYXAgY2VudGVyIGFjY29yZGluZ2x5LlxuXHQgKiBAcGFyYW0ge09iamVjdH0gdmFsdWUgLSBUaGUgdmFsdWUgdXNlZCB0byBjYWxjdWxhdGUgdGhlIG5ldyBjZW50ZXIgb2YgdGhlIG1hcC5cblx0ICogQHBhcmFtIHtib29sZWFufSBmcmVlIC0gQSBib29sZWFuIGZsYWcgaW5kaWNhdGluZyBpZiB0aGUgbWFwIGNlbnRlciBzaG91bGQgYmUgc2V0IGZyZWVseS5cblx0ICogQHBhcmFtIHtib29sZWFufSBkcGFkIC0gQSBib29sZWFuIGZsYWcgaW5kaWNhdGluZyBpZiB0aGUgRC1wYWQgY29udHJvbHMgYXJlIHVzZWQgZm9yIHNldHRpbmcgdGhlIG1hcCBjZW50ZXIuXG5cdCAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIHRydWUgYWZ0ZXIgc2V0dGluZyB0aGUgbWFwIGNlbnRlci5cblx0ICovXG5cdFxuICAgIHRoaXMuc2V0Q2VudGVyID0gZnVuY3Rpb24gKHZhbHVlLCBmcmVlLCBkcGFkKSB7XG4gICAgICAgIHZhciBjZW50ZXIgPSBnZW9mbG8ubWFwLmdldENlbnRlcigpO1xuICAgICAgICB2YXIgcHJlc3NlZCA9IHRoaXMuZ2FtZXBhZC5wcmVzc2VkO1xuICAgICAgICB2YXIgdHlwZSA9IHRoaXMuaGFzSm95c3RpY2tzID8gJ0pveScgOiAnRHBhZCc7XG4gICAgICAgIHZhciBkaWFnID0gT2JqZWN0LmtleXMocHJlc3NlZCkuZmlsdGVyKGZ1bmN0aW9uKHApIHsgcmV0dXJuIHAuaW5jbHVkZXModHlwZSkgfSkubGVuZ3RoID4gMTtcbiAgICAgICAgXG4gICAgICAgIHZhciBzdGFydCA9IGZyZWUgfHwgZHBhZCA/IGNlbnRlciA6IGZhbHNlO1xuICAgICAgICBzdGFydCA9IGdlb2Zsby5ob3RGZWF0dXJlICYmICFzdGFydCA/IGdlb2Zsby5sYXN0TW92ZSB8fCBjZW50ZXIgOiBmYWxzZTtcbiAgICAgICAgc3RhcnQgPSAhc3RhcnQgPyBjZW50ZXIgOiBzdGFydDtcblxuICAgICAgICB2YXIgZW5kO1xuICAgIFxuICAgICAgICBpZiAoZHBhZCkge1xuICAgICAgICAgICAgdmFyIGJlYXJpbmcgPSB0aGlzLm1hcC5iZWFyaW5nO1xuICAgICAgICAgICAgYmVhcmluZyA9IHByZXNzZWRbJ1VwJ10gPyBiZWFyaW5nIDpcbiAgICAgICAgICAgIHByZXNzZWRbJ0Rvd24nXSA/IGJlYXJpbmcgKyAxODAgOlxuICAgICAgICAgICAgcHJlc3NlZFsnTGVmdCddID8gYmVhcmluZyAtIDkwIDpcbiAgICAgICAgICAgIHByZXNzZWRbJ1JpZ2h0J10gPyBiZWFyaW5nICsgOTAgOlxuICAgICAgICAgICAgYmVhcmluZztcblxuICAgICAgICAgICAgdmFyIGRlc3QgPSB0dXJmLmRlc3RpbmF0aW9uKHR1cmYucG9pbnQoc3RhcnQpLCBkaXN0YW5jZSwgYmVhcmluZykuZ2VvbWV0cnkuY29vcmRpbmF0ZXM7XG5cbiAgICAgICAgICAgIGxuZ0xhdHMgPSBmcmVlID8geyBsbmc6IGRlc3RbMV0sIGxhdDogZGVzdFswXSB9IDogZGVzdDtcbiAgICAgICAgfSBlbHNlIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgdmFyIGxvY2F0aW9uID0gdGhpcy5zZXRMb2NhdGlvbih2YWx1ZSk7XG4gICAgICAgICAgICB2YXIgY29vcmRzID0gbG9jYXRpb24gJiYgbG9jYXRpb24ueCA/IFtsb2NhdGlvbi54LCBsb2NhdGlvbi55XSA6IGZhbHNlO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBlbmQgPSBnZW9mbG8ubWFwLnVucHJvamVjdChjb29yZHMpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB2YXIgcGVyY2VudCA9IGRpYWcgPyB0aGlzLm9wdGlvbnMucGFuLnNwZWVkIC8gMiA6IHRoaXMub3B0aW9ucy5wYW4uc3BlZWQ7XG4gICAgICAgICAgICB2YXIgbWlkID0gY2FsY3VsYXRlSW50ZXJtZWRpYXRlUG9pbnQoW3N0YXJ0LmxuZywgc3RhcnQubGF0XSwgW2VuZC5sbmcsIGVuZC5sYXRdLCBwZXJjZW50KVxuICAgICAgICAgICAgbWlkID0gZ2VvZmxvLm1hcC5nZXRQaXRjaCgpID4gNjAgPyBjYWxjdWxhdGVJbnRlcm1lZGlhdGVQb2ludChbc3RhcnQubG5nLCBzdGFydC5sYXRdLCBbbWlkWzBdLCBtaWRbMV1dLCAwLjQpIDogbWlkO1xuXG4gICAgICAgICAgICBlbmQgPSBtaWQ7XG4gICAgICAgICAgICBnZW9mbG8ubGFzdE1vdmUgPSBlbmQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YXIgY29vcmRzID0gZ2VvZmxvLmhvdEZlYXR1cmUgPyBnZW9mbG8uaG90RmVhdHVyZS5nZW9tZXRyeS5jb29yZGluYXRlcyA6IGZhbHNlO1xuICAgICAgICAgICAgZW5kID0gZnJlZSA/IGdlb2Zsby5tYXAuZ2V0Q2VudGVyKCkgOlxuICAgICAgICAgICAgY29vcmRzID8geyBsYXQ6IGNvb3Jkc1tjb29yZHMubGVuZ3RoLTFdWzFdLCBsbmc6IGNvb3Jkc1tjb29yZHMubGVuZ3RoLTFdWzBdIH0gOiBnZW9mbG8ubWFwLmdldENlbnRlcigpO1xuICAgICAgICAgICAgZ2VvZmxvLmxhc3RNb3ZlID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLnNldExvY2F0aW9uKFswLCAwXSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm1hcC5jZW50ZXIgPSBlbmQ7XG4gICAgICAgIHJldHVybiB0aGlzLnNldE1hcCh0cnVlKTtcbiAgICB9XG4gICAgXG5cdC8qKlxuXHQgKiBAZnVuY3Rpb25cbiAgICAgKiBAbWVtYmVyb2YgbW9kdWxlOmdlb2Zsby5HYW1pbmdcblx0ICogQG5hbWUgc2V0QmVhcmluZ1xuXHQgKiBAZGVzY3JpcHRpb24gVGhpcyBmdW5jdGlvbiB1cGRhdGVzIHRoZSBiZWFyaW5nIG9mIHRoZSBtYXAgYnkgYWRqdXN0aW5nIGl0IHdpdGggdGhlIHNwZWNpZmllZCB2YWx1ZSBhbmQgZGlyZWN0aW9uLlxuXHQgKiBAcGFyYW0ge251bWJlciB8IEFycmF5PG51bWJlcj59IHZhbHVlIC0gVGhlIHZhbHVlIHRvIGFkanVzdCB0aGUgYmVhcmluZyBieS4gSWYgZHBhZCBpcyBmYWxzZSwgaXQgc2hvdWxkIGJlIGFuIGFycmF5IG9mIG51bWJlcnMsIG90aGVyd2lzZSBhIHNpbmdsZSBudW1iZXIuXG5cdCAqIEBwYXJhbSB7Ym9vbGVhbn0gbGVmdCAtIEluZGljYXRlcyB0aGUgZGlyZWN0aW9uIG9mIGFkanVzdG1lbnQuIElmIHRydWUsIHRoZSBiZWFyaW5nIGlzIGRlY3JlYXNlZDsgb3RoZXJ3aXNlLCBpdCBpcyBpbmNyZWFzZWQuXG5cdCAqIEBwYXJhbSB7Ym9vbGVhbn0gZHBhZCAtIFNwZWNpZmllcyB3aGV0aGVyIHRoZSB2YWx1ZSBpcyBjb21pbmcgZnJvbSBhIGRwYWQgaW5wdXQuXG5cdCAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIHRoZSByZXN1bHQgb2YgY2FsbGluZyB0aGUgc2V0TWFwIGZ1bmN0aW9uIGFmdGVyIHVwZGF0aW5nIHRoZSBiZWFyaW5nLlxuXHQgKi9cbiAgICB0aGlzLnNldEJlYXJpbmcgPSBmdW5jdGlvbiAodmFsdWUsIGxlZnQsIGRwYWQpIHtcbiAgICAgICAgdmFyIGJlYXJpbmcgPSB0aGlzLm1hcC5iZWFyaW5nO1xuICAgICAgICB2YXIgYmVhcmluZ011bHRpID0gIWRwYWQgPyBNYXRoLmFicyh2YWx1ZVswXSkgOiB2YWx1ZTtcbiAgICBcbiAgICAgICAgaWYgKGxlZnQpIHtcbiAgICAgICAgICAgIGJlYXJpbmcgPSBiZWFyaW5nIC0gKHRoaXMub3B0aW9ucy5iZWFyaW5nLnNwZWVkICogYmVhcmluZ011bHRpKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYmVhcmluZyA9IGJlYXJpbmcgKyAodGhpcy5vcHRpb25zLmJlYXJpbmcuc3BlZWQgKiBiZWFyaW5nTXVsdGkpXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm1hcC5iZWFyaW5nID0gYmVhcmluZztcbiAgICAgICAgcmV0dXJuIHRoaXMuc2V0TWFwKCk7XG4gICAgfVxuICAgIFxuXHQvKipcblx0ICogQGZ1bmN0aW9uXG4gICAgICogQG1lbWJlcm9mIG1vZHVsZTpnZW9mbG8uR2FtaW5nXG5cdCAqIEBuYW1lIHNldFBpdGNoXG5cdCAqIEBkZXNjcmlwdGlvbiBUaGlzIGZ1bmN0aW9uIGFkanVzdHMgdGhlIHBpdGNoIG9mIHRoZSBtYXAgYnkgYSBzcGVjaWZpZWQgYW1vdW50IGluIHRoZSBnaXZlbiBkaXJlY3Rpb24uXG5cdCAqIEBwYXJhbSB7bnVtYmVyfEFycmF5PG51bWJlcj59IHZhbHVlIC0gVGhlIHZhbHVlIG9yIGFycmF5IG9mIHZhbHVlcyB0byBhZGp1c3QgdGhlIHBpdGNoIGJ5LlxuXHQgKiBAcGFyYW0ge2Jvb2xlYW59IHVwIC0gQSBib29sZWFuIGluZGljYXRpbmcgd2hldGhlciB0aGUgcGl0Y2ggc2hvdWxkIGJlIGluY3JlYXNlZCAodHJ1ZSkgb3IgZGVjcmVhc2VkIChmYWxzZSkuXG5cdCAqIEBwYXJhbSB7Ym9vbGVhbn0gZHBhZCAtIEEgYm9vbGVhbiBmbGFnIHRvIGRldGVybWluZSBpZiB0aGUgdmFsdWUgaXMgY29taW5nIGZyb20gYSBELXBhZCBpbnB1dC5cblx0ICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgdHJ1ZSBpZiB0aGUgbWFwIGlzIHN1Y2Nlc3NmdWxseSB1cGRhdGVkIHdpdGggdGhlIG5ldyBwaXRjaC5cblx0ICovXG4gICAgdGhpcy5zZXRQaXRjaCA9IGZ1bmN0aW9uICh2YWx1ZSwgdXAsIGRwYWQpIHtcbiAgICAgICAgdmFyIHBpdGNoID0gdGhpcy5tYXAucGl0Y2g7XG4gICAgICAgIHZhciBwaXRjaE11bHRpID0gIWRwYWQgPyBNYXRoLmFicyh2YWx1ZVsxXSkgOiB2YWx1ZTtcblxuICAgICAgICBpZiAocGl0Y2ggPCAwKSBwaXRjaCA9IDA7XG4gICAgICAgIGlmIChwaXRjaCA+IHRoaXMub3B0aW9ucy5waXRjaC5tYXgpIHBpdGNoID0gdGhpcy5vcHRpb25zLnBpdGNoLm1heDtcbiAgICBcbiAgICAgICAgaWYgKHVwKSB7XG4gICAgICAgICAgICBwaXRjaCA9IHBpdGNoICsgKHRoaXMub3B0aW9ucy5waXRjaC5zcGVlZCAqIHBpdGNoTXVsdGkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcGl0Y2ggPSBwaXRjaCAtICh0aGlzLm9wdGlvbnMucGl0Y2guc3BlZWQgKiBwaXRjaE11bHRpKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdGhpcy5tYXAucGl0Y2ggPSBwaXRjaDtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2V0TWFwKCk7XG4gICAgfVxuICAgIFxuXHQvKipcblx0ICogQGZ1bmN0aW9uXG4gICAgICogQG1lbWJlcm9mIG1vZHVsZTpnZW9mbG8uR2FtaW5nXG5cdCAqIEBuYW1lIHNldFpvb21cblx0ICogQGRlc2NyaXB0aW9uIFRoaXMgZnVuY3Rpb24gYWRqdXN0cyB0aGUgem9vbSBsZXZlbCBvZiBhIG1hcCBiYXNlZCBvbiB0aGUgcHJvdmlkZWQgdmFsdWUgYW5kIGRpcmVjdGlvbi5cblx0ICogQHBhcmFtIHtudW1iZXJ9IHZhbHVlIC0gVGhlIGFtb3VudCBieSB3aGljaCB0byBjaGFuZ2UgdGhlIHpvb20gbGV2ZWwuXG5cdCAqIEBwYXJhbSB7Ym9vbGVhbn0gb3V0IC0gQSBmbGFnIGluZGljYXRpbmcgd2hldGhlciB0byB6b29tIG91dCAodHJ1ZSkgb3Igem9vbSBpbiAoZmFsc2UpLlxuXHQgKiBAcGFyYW0ge2Jvb2xlYW59IGRwYWQgLSBBIGZsYWcgaW5kaWNhdGluZyB0aGUgZGlyZWN0aW9uIG9mIHRoZSB6b29tIGNoYW5nZS5cblx0ICogQHJldHVybnMge2Jvb2xlYW59IC0gUmV0dXJucyB0aGUgcmVzdWx0IG9mIHNldHRpbmcgdGhlIG1hcCB3aXRoIHRoZSBuZXcgem9vbSBsZXZlbC5cblx0ICovXG4gICAgdGhpcy5zZXRab29tID0gZnVuY3Rpb24gKHZhbHVlLCBvdXQsIGRwYWQpIHtcbiAgICAgICAgdmFyIHpvb20gPSB0aGlzLm1hcC56b29tO1xuICAgIFxuICAgICAgICBpZiAob3V0KSB7XG4gICAgICAgICAgICB6b29tID0gem9vbSAtICggdGhpcy5vcHRpb25zLnpvb20uc3BlZWQgKiBNYXRoLmFicyh2YWx1ZSkgKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgem9vbSA9IHpvb20gKyAoIHRoaXMub3B0aW9ucy56b29tLnNwZWVkICogTWF0aC5hYnModmFsdWUpIClcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdGhpcy5tYXAuem9vbSA9IHpvb207XG4gICAgICAgIHJldHVybiB0aGlzLnNldE1hcCgpO1xuICAgIH1cblxuXHQvKipcblx0ICogQGZ1bmN0aW9uXG4gICAgICogQG1lbWJlcm9mIG1vZHVsZTpnZW9mbG8uR2FtaW5nXG5cdCAqIEBuYW1lIHNldFNwZWVkXG5cdCAqIEBkZXNjcmlwdGlvbiBUaGlzIGZ1bmN0aW9uIGNhbGN1bGF0ZXMgdGhlIHNwZWVkIG9mIHBhbm5pbmcgYmFzZWQgb24gdGhlIHByb3ZpZGVkIHZhbHVlIGFuZCBkaXJlY3Rpb24uIEl0IGVuc3VyZXMgdGhhdCB0aGUgc3BlZWQgZmFsbHMgd2l0aGluIHRoZSBzcGVjaWZpZWQgbWluaW11bSBhbmQgbWF4aW11bSB2YWx1ZXMuXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSB2YWx1ZSAtIFRoZSB2YWx1ZSB0aGF0IGluZmx1ZW5jZXMgdGhlIHNwZWVkIG9mIHBhbm5pbmcuXG5cdCAqIEBwYXJhbSB7Ym9vbGVhbn0gZG93biAtIEEgYm9vbGVhbiBmbGFnIGluZGljYXRpbmcgdGhlIGRpcmVjdGlvbiBvZiBwYW5uaW5nICh0cnVlIGZvciBkb3duLCBmYWxzZSBmb3IgdXApLlxuXHQgKiBAcmV0dXJucyB7bnVtYmVyfSBUaGUgdXBkYXRlZCBzcGVlZCBvZiBwYW5uaW5nIGFmdGVyIGFwcGx5aW5nIHRoZSBjYWxjdWxhdGlvbnMuXG5cdCAqL1xuICAgIHRoaXMuc2V0U3BlZWQgPSBmdW5jdGlvbiAodmFsdWUsIGRvd24pIHtcbiAgICAgICAgdmFyIHNwZWVkID0gdGhpcy5vcHRpb25zLnBhbi5zcGVlZCA+IHRoaXMub3B0aW9ucy5wYW4ubWluID9cbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5wYW4uc3BlZWQgOlxuICAgICAgICAgICAgdGhpcy5vcHRpb25zLnBhbi5tYXggJiYgdGhpcy5vcHRpb25zLnBhbi5zcGVlZCA+IHRoaXMub3B0aW9ucy5wYW4ubWF4ID9cbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5wYW4ubWluIDpcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5wYW4ubWluO1xuXG4gICAgICAgIHNwZWVkID0gZG93biA/IHNwZWVkIC0gdGhpcy5vcHRpb25zLnBhbi5taW4gOiBzcGVlZCArIHRoaXMub3B0aW9ucy5wYW4ubWluO1xuXG4gICAgICAgIHNwZWVkID0gc3BlZWQgPCB0aGlzLm9wdGlvbnMucGFuLm1pbiA/IHRoaXMub3B0aW9ucy5wYW4ubWluIDpcbiAgICAgICAgdGhpcy5vcHRpb25zLnBhbi5tYXggJiYgc3BlZWQgPiB0aGlzLm9wdGlvbnMucGFuLm1heCA/IHRoaXMub3B0aW9ucy5wYW4ubWF4IDpcbiAgICAgICAgc3BlZWQ7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMub3B0aW9ucy5wYW4uc3BlZWQgPSBzcGVlZCAqIE1hdGguYWJzKHZhbHVlKTtcbiAgICB9XG5cblxuXHQvKipcblx0ICogQGZ1bmN0aW9uXG4gICAgICogQG1lbWJlcm9mIG1vZHVsZTpnZW9mbG8uR2FtaW5nIGFzc29jaWF0ZUV2ZW50XG5cdCAqIEBuYW1lIGFzc29jaWF0ZUV2ZW50XG5cdCAqIEBkZXNjcmlwdGlvbiBUaGlzIGZ1bmN0aW9uIGFsbG93cyB0aGUgdXNlciB0byBhc3NvY2lhdGUgYW4gZXZlbnQgd2l0aCBhIGNhbGxiYWNrIGZ1bmN0aW9uIGZvciBhIHNwZWNpZmljIGJ1dHRvbiBvciBheGlzIG9uIHRoZSBnYW1lcGFkLlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gZXZlbnROYW1lIC0gVGhlIG5hbWUgb2YgdGhlIGV2ZW50IHRvIGFzc29jaWF0ZSB3aXRoIHRoZSBjYWxsYmFjayBmdW5jdGlvbi5cblx0ICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2sgLSBUaGUgY2FsbGJhY2sgZnVuY3Rpb24gdG8gYmUgZXhlY3V0ZWQgd2hlbiB0aGUgZXZlbnQgb2NjdXJzLlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gdHlwZSAtIFRoZSB0eXBlIG9mIGV2ZW50IChlLmcuLCAncHJlc3MnLCAncmVsZWFzZScpIHRvIGFzc29jaWF0ZSB3aXRoIHRoZSBjYWxsYmFjayBmdW5jdGlvbi5cblx0ICogQHJldHVybnMge29iamVjdH0gVGhlIHVwZGF0ZWQgZ2FtZXBhZCBvYmplY3Qgd2l0aCB0aGUgYXNzb2NpYXRlZCBldmVudCBhbmQgY2FsbGJhY2sgZnVuY3Rpb24uXG5cdCAqL1xuICAgIHRoaXMuYXNzb2NpYXRlRXZlbnQgPSBmdW5jdGlvbihldmVudE5hbWUsIGNhbGxiYWNrLCB0eXBlKSB7XG4gICAgICAgIGlmIChldmVudE5hbWUubWF0Y2goL15idXR0b25cXGQrJC8pKSB7XG4gICAgICAgICAgICBjb25zdCBidXR0b25JZCA9IHBhcnNlSW50KGV2ZW50TmFtZS5tYXRjaCgvXmJ1dHRvbihcXGQrKSQvKVsxXSk7XG5cbiAgICAgICAgICAgIGlmIChidXR0b25JZCA+PSAwICYmIGJ1dHRvbklkIDwgdGhpcy5nYW1lcGFkLmJ1dHRvbnMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWVwYWQuYnV0dG9uQWN0aW9uc1tidXR0b25JZF1bdHlwZV0gPSBjYWxsYmFjaztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYnV0dG9uSWQsICdUaGlzIGJ1dHRvbiBpcyBub3Qgb24gZ2FtZXBhZCcpXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlIGlmIChldmVudE5hbWUgPT09ICdzdGFydCcpIHtcbiAgICAgICAgICAgIHRoaXMuZ2FtZXBhZC5idXR0b25BY3Rpb25zWzldW3R5cGVdID0gY2FsbGJhY2s7XG4gICAgICAgIH0gZWxzZSBpZiAoZXZlbnROYW1lID09PSAnc2VsZWN0Jykge1xuICAgICAgICAgICAgdGhpcy5nYW1lcGFkLmJ1dHRvbkFjdGlvbnNbOF1bdHlwZV0gPSBjYWxsYmFjaztcbiAgICAgICAgfSBlbHNlIGlmIChldmVudE5hbWUgPT09ICdyMScpIHtcbiAgICAgICAgICAgIHRoaXMuZ2FtZXBhZC5idXR0b25BY3Rpb25zWzVdW3R5cGVdID0gY2FsbGJhY2s7XG4gICAgICAgIH0gZWxzZSBpZiAoZXZlbnROYW1lID09PSAncjInKSB7XG4gICAgICAgICAgICB0aGlzLmdhbWVwYWQuYnV0dG9uQWN0aW9uc1s3XVt0eXBlXSA9IGNhbGxiYWNrO1xuICAgICAgICB9IGVsc2UgaWYgKGV2ZW50TmFtZSA9PT0gJ2wxJykge1xuICAgICAgICAgICAgdGhpcy5nYW1lcGFkLmJ1dHRvbkFjdGlvbnNbNF1bdHlwZV0gPSBjYWxsYmFjaztcbiAgICAgICAgfSBlbHNlIGlmIChldmVudE5hbWUgPT09ICdsMicpIHtcbiAgICAgICAgICAgIHRoaXMuZ2FtZXBhZC5idXR0b25BY3Rpb25zWzZdW3R5cGVdID0gY2FsbGJhY2s7XG4gICAgICAgIH0gZWxzZSBpZiAoZXZlbnROYW1lID09PSAncG93ZXInKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5nYW1lcGFkLmJ1dHRvbnMgPj0gMTcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWVwYWQuYnV0dG9uQWN0aW9uc1sxNl1bdHlwZV0gPSBjYWxsYmFjaztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZXJyb3IoTUVTU0FHRVMuSU5WQUxJRF9CVVRUT04pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKGV2ZW50TmFtZS5tYXRjaCgvXih1cHxkb3dufGxlZnR8cmlnaHQpKFxcZCspJC8pKSB7XG4gICAgICAgICAgICBjb25zdCBtYXRjaGVzID0gZXZlbnROYW1lLm1hdGNoKC9eKHVwfGRvd258bGVmdHxyaWdodCkoXFxkKykkLyk7XG4gICAgICAgICAgICBjb25zdCBkaXJlY3Rpb24gPSBtYXRjaGVzWzFdO1xuICAgICAgICAgICAgY29uc3QgYXhlID0gcGFyc2VJbnQobWF0Y2hlc1syXSk7XG5cbiAgICAgICAgICAgIGlmIChheGUgPj0gMCAmJiBheGUgPCB0aGlzLmdhbWVwYWQuYXhlcykge1xuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZXBhZC5heGVzQWN0aW9uc1theGVdW2RpcmVjdGlvbl1bdHlwZV0gPSBjYWxsYmFjaztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZXJyb3IoTUVTU0FHRVMuSU5WQUxJRF9CVVRUT04pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKGV2ZW50TmFtZS5tYXRjaCgvXih1cHxkb3dufGxlZnR8cmlnaHQpJC8pKSB7XG4gICAgICAgICAgICBjb25zdCBkaXJlY3Rpb24gPSBldmVudE5hbWUubWF0Y2goL14odXB8ZG93bnxsZWZ0fHJpZ2h0KSQvKVsxXTtcbiAgICAgICAgICAgIHRoaXMuZ2FtZXBhZC5heGVzQWN0aW9uc1swXVtkaXJlY3Rpb25dW3R5cGVdID0gY2FsbGJhY2s7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5nYW1lcGFkO1xuICAgIH1cblxuICAgIHRoaXMub25Jbml0ID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5pbml0aWF0ZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLnNldENvbnRhaW5lcignZGl2JywgJ2dhbWVwYWQnLCBnZW9mbG8ubWFwLmdldENvbnRhaW5lcigpKTtcbiAgICAgICAgdGhpcy5zZXRNYXJrZXIoKTtcbiAgICAgICAgdGhpcy5zZXRNYXAoKTtcbiAgICB9XG5cbiAgICB0aGlzLm9uRXZlbnQgPSBmdW5jdGlvbiAodHlwZSwga2V5LCBhY3Rpb24sIHZhbHVlKSB7XG4gICAgICAgIHZhciBwcmVzc2VkID0ge1thY3Rpb25dOiB0cnVlfTtcbiAgICAgICAgdmFyIGxuZ0xhdCA9IHRoaXMub3B0aW9ucy5jYW1lcmEuZnJlZSA/IGdlb2Zsby5tYXAuZ2V0Q2VudGVyKCkgOiBnZW9mbG8ubGFzdE1vdmUgPyBnZW9mbG8ubGFzdE1vdmUgOiBnZW9mbG8ubWFwLmdldENlbnRlcigpO1xuXG4gICAgICAgIHZhciBvcHRpb25zID0ge1xuICAgICAgICAgICAgbmFtZTogYWN0aW9uLFxuICAgICAgICAgICAgdHlwZTogdHlwZSxcbiAgICAgICAgICAgIGtleToga2V5LFxuICAgICAgICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgICAgICAgbW9kZTogZ2VvZmxvLmN1cnJlbnRNb2RlLFxuICAgICAgICAgICAgZ2FtZXBhZDogdGhpcyxcbiAgICAgICAgICAgIGxuZ0xhdDogbG5nTGF0LFxuICAgICAgICAgICAgZ2VvZmxvOiBnZW9mbG8sXG4gICAgICAgICAgICBvcmlnaW5hbEV2ZW50OiB7fVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0aGlzLmluaXRpYXRlZCkgdGhpcy5vbkluaXQob3B0aW9ucyk7XG5cbiAgICAgICAgZ2VvZmxvLm1hcC5maXJlKGdlb2Zsby5pZCArICc6Z2FtZXBhZC4nICsgdHlwZSwgeyBkZXRhaWw6IG9wdGlvbnMgfSk7XG5cbiAgICAgICAgaWYgKHByZXNzZWRbJ0pveUxlZnRVcCddIHx8IHByZXNzZWRbJ0pveUxlZnREb3duJ10gfHwgcHJlc3NlZFsnSm95TGVmdExlZnQnXSB8fCBwcmVzc2VkWydKb3lMZWZ0UmlnaHQnXSkgdGhpcy5vcHRpb25zLm1hcHBpbmdbJ0pveUxlZnRNb3ZlJ10ob3B0aW9ucyk7XG4gICAgICAgIGlmIChwcmVzc2VkWydKb3lSaWdodFVwJ10gfHwgcHJlc3NlZFsnSm95UmlnaHREb3duJ10gfHwgcHJlc3NlZFsnSm95UmlnaHRMZWZ0J10gfHwgcHJlc3NlZFsnSm95UmlnaHRSaWdodCddKSB0aGlzLm9wdGlvbnMubWFwcGluZ1snSm95UmlnaHRNb3ZlJ10ob3B0aW9ucyk7XG5cbiAgICAgICAgaWYgKHByZXNzZWRbJ0pveUxlZnRDbGljayddKSB0aGlzLm9wdGlvbnMubWFwcGluZ1snSm95TGVmdENsaWNrJ10ob3B0aW9ucyk7XG4gICAgICAgIGlmIChwcmVzc2VkWydKb3lSaWdodENsaWNrJ10pIHRoaXMub3B0aW9ucy5tYXBwaW5nWydKb3lSaWdodENsaWNrJ10ob3B0aW9ucyk7XG5cbiAgICAgICAgaWYgKHByZXNzZWRbJ0J1bXBMZWZ0J10pIHRoaXMub3B0aW9ucy5tYXBwaW5nWydCdW1wTGVmdCddKG9wdGlvbnMpO1xuICAgICAgICBpZiAocHJlc3NlZFsnQnVtcFJpZ2h0J10pIHRoaXMub3B0aW9ucy5tYXBwaW5nWydCdW1wUmlnaHQnXShvcHRpb25zKTtcblxuICAgICAgICBpZiAocHJlc3NlZFsnVHJpZ0xlZnQnXSkgdGhpcy5vcHRpb25zLm1hcHBpbmdbJ1RyaWdMZWZ0J10ob3B0aW9ucyk7XG4gICAgICAgIGlmIChwcmVzc2VkWydUcmlnUmlnaHQnXSkgdGhpcy5vcHRpb25zLm1hcHBpbmdbJ1RyaWdSaWdodCddKG9wdGlvbnMpO1xuXG4gICAgICAgIGlmIChwcmVzc2VkWydBJ10pIHRoaXMub3B0aW9ucy5tYXBwaW5nWydBJ10ob3B0aW9ucyk7XG4gICAgICAgIGlmIChwcmVzc2VkWydCJ10pIHRoaXMub3B0aW9ucy5tYXBwaW5nWydCJ10ob3B0aW9ucyk7XG4gICAgICAgIGlmIChwcmVzc2VkWydYJ10pIHRoaXMub3B0aW9ucy5tYXBwaW5nWydYJ10ob3B0aW9ucyk7XG4gICAgICAgIGlmIChwcmVzc2VkWydZJ10pIHRoaXMub3B0aW9ucy5tYXBwaW5nWydZJ10ob3B0aW9ucyk7XG5cbiAgICAgICAgaWYgKHByZXNzZWRbJ1N0YXJ0J10pIHRoaXMub3B0aW9ucy5tYXBwaW5nWydTdGFydCddKG9wdGlvbnMpO1xuICAgICAgICBpZiAocHJlc3NlZFsnU2VsZWN0J10pIHRoaXMub3B0aW9ucy5tYXBwaW5nWydTZWxlY3QnXShvcHRpb25zKTtcbiAgICAgICAgaWYgKHByZXNzZWRbJ1Bvd2VyJ10pIHRoaXMub3B0aW9ucy5tYXBwaW5nWydQb3dlciddKG9wdGlvbnMpO1xuICAgICAgICBpZiAocHJlc3NlZFsnSG9tZSddKSB0aGlzLm9wdGlvbnMubWFwcGluZ1snSG9tZSddKG9wdGlvbnMpO1xuICAgICAgICBpZiAocHJlc3NlZFsnTWlzYyddKSB0aGlzLm9wdGlvbnMubWFwcGluZ1snTWlzYyddKG9wdGlvbnMpO1xuXG4gICAgICAgIGlmIChwcmVzc2VkWydEcGFkVXAnXSkgdGhpcy5vcHRpb25zLm1hcHBpbmdbJ0RwYWRVcCddKG9wdGlvbnMpO1xuICAgICAgICBpZiAocHJlc3NlZFsnRHBhZERvd24nXSkgdGhpcy5vcHRpb25zLm1hcHBpbmdbJ0RwYWREb3duJ10ob3B0aW9ucyk7XG4gICAgICAgIGlmIChwcmVzc2VkWydEcGFkTGVmdCddKSB0aGlzLm9wdGlvbnMubWFwcGluZ1snRHBhZExlZnQnXShvcHRpb25zKTtcbiAgICAgICAgaWYgKHByZXNzZWRbJ0RwYWRSaWdodCddKSB0aGlzLm9wdGlvbnMubWFwcGluZ1snRHBhZFJpZ2h0J10ob3B0aW9ucyk7XG4gICAgfVxuXG4gICAgdGhpcy5vbkRpc2Nvbm5lY3QgPSBmdW5jdGlvbiAoZ2FtZXBhZCkge1xuICAgICAgICBpZiAoIWdhbWVwYWQgfHwgIXRoaXMuZ2FtZXBhZCkgcmV0dXJuIGZhbHNlO1xuICAgICAgICBpZiAodGhpcy5nYW1lcGFkLmlkICE9PSBnYW1lcGFkLmlkKSB0aHJvdyBuZXcgRXJyb3IoJ0dhbWVwYWQgaWQgZG9lcyBub3QgbWF0Y2ghJyk7XG4gICAgICAgIHRoaXMuZ2FtZXBhZC5yZW1vdmUoKTtcbiAgICAgICAgdGhpcy5nYW1lcGFkID0gbnVsbDtcbiAgICB9XG5cblxuICAgIHRoaXMuaW5pdChnYW1lcGFkKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEdhbWluZzsiXSwibmFtZXMiOlsiR2FtaW5nIiwiZ2FtZXBhZCIsImdlb2ZsbyIsInN1cHBvcnRlZCIsIkVycm9yIiwiY29udHJvbCIsIm9wdGlvbnMiLCJsYXlvdXQiLCJjbGFtcCIsIngiLCJ5IiwibSIsIk1hdGgiLCJzcXJ0IiwiZGVhZHpvbmUiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJ1bmRlZmluZWQiLCJvdmVyIiwibm92ZXIiLCJueCIsIm55IiwicmVxdWVzdCIsInJlZnJlc2giLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJ3aW5kb3ciLCJuYXZpZ2F0b3IiLCJnZXRHYW1lcGFkcyIsIndlYmtpdEdldEdhbWVwYWRzIiwicXMiLCJzIiwicCIsInF1ZXJ5U2VsZWN0b3IiLCJkb2N1bWVudCIsIm9uIiwiZXZlbnROYW1lIiwiY2FsbGJhY2siLCJhc3NvY2lhdGVFdmVudCIsImFmdGVyIiwiYmVmb3JlIiwiYWRkRXZlbnRMaXN0ZW5lcnMiLCJfdGhpcyIsIk9iamVjdCIsImVudHJpZXMiLCJmb3JFYWNoIiwiZW50cnkiLCJrZXkiLCJ2YWwiLCJ2YWx1ZSIsIm9uRXZlbnQiLCJkZWVwQXNzaWduIiwidGFyZ2V0Iiwic291cmNlIiwiX3JlZiIsIl9yZWYkaXNNdXRhdGluZ09rIiwiaXNNdXRhdGluZ09rIiwiX3JlZiRpc1N0cmljdGx5U2FmZSIsImlzU3RyaWN0bHlTYWZlIiwiY2xvbmUiLCJfaSIsIl9PYmplY3QkZW50cmllcyIsIl9PYmplY3QkZW50cmllcyRfaSIsIl9zbGljZWRUb0FycmF5IiwiX3R5cGVvZiIsIm9iaiIsIkpTT04iLCJwYXJzZSIsInN0cmluZ2lmeSIsImVyciIsImNvbnNvbGUiLCJ3YXJuIiwiX29iamVjdFNwcmVhZCIsImNhbGN1bGF0ZUludGVybWVkaWF0ZVBvaW50IiwicG9pbnQxIiwicG9pbnQyIiwicGVyYyIsImxhdDEiLCJkZWdyZWVzVG9SYWRpYW5zIiwibG5nMSIsImxhdDIiLCJsbmcyIiwiZGVsdGFMYXQiLCJkZWx0YUxuZyIsImNhbGNBIiwic2luIiwiY29zIiwiY2FsY0IiLCJhdGFuMiIsIkEiLCJCIiwieiIsImxhdDMiLCJsbmczIiwicmFkaWFuc1RvRGVncmVlcyIsInBvaW50QXRQZXJjZW50IiwicDAiLCJwMSIsInBlcmNlbnQiLCJkZWdyZWVzIiwiUEkiLCJyYWRpYW5zIiwiaW5pdCIsImVuYWJsZSIsImVycm9yIiwibWFwIiwiZmlyZSIsImlkIiwiZGV0YWlsIiwic2V0R2FtZXBhZCIsImdhbWVwYWRzIiwiaSIsImoiLCJjb25uZWN0ZWQiLCJidXR0b25zIiwiYnV0dG9uIiwibmFtZSIsImNvbmNhdCIsInByZXNzZWQiLCJidXR0b25BY3Rpb25zIiwiYWN0aW9uIiwiYXhlc0JveENvdW50IiwiYXhlcyIsInZhbHVlWCIsInZhbHVlWSIsImxhc3Rfb2RkX2F4aXMiLCJfZGVhZHpvbmUiLCJfZGVhZHpvbmUyIiwiX2NsYW1wIiwiX2NsYW1wMiIsIk51bWJlciIsInRvRml4ZWQiLCJheGUiLCJmbG9vciIsImF4ZVZhbHVlcyIsInJpZ2h0VHJpZ2dlciIsImpveXN0aWNrIiwibWluIiwibGVmdFRyaWdnZXIiLCJ1cFRyaWdnZXIiLCJkb3duVHJpZ2dlciIsInRyaWdnZXIiLCJ0cmlnZ2VyZWQiLCJpbmRleCIsImFjdGlvbnMiLCJheGVzQWN0aW9ucyIsIm1heCIsInJlbW92ZSIsImRpc2Nvbm5lY3QiLCJzZXRNYXAiLCJoYW5kbGVNb3ZlIiwidHJhbnNmb3JtIiwiY2VudGVyIiwiZ2V0Q2VudGVyIiwiem9vbSIsImdldFpvb20iLCJwaXRjaCIsImdldFBpdGNoIiwiYmVhcmluZyIsImdldEJlYXJpbmciLCJsYXQiLCJtYXBib3hnbCIsIkxuZ0xhdCIsInBvaW50TG9jYXRpb24iLCJfdXBkYXRlIiwiY3Jvc3NoYWlycyIsImNlbnRlck1hcmtlciIsInNldE1hcmtlciIsImN1cnJlbnRNb2RlIiwibG5nTGF0IiwiY2FtZXJhIiwiZnJlZSIsInNldENvbnRhaW5lciIsInRhZ05hbWUiLCJjbGFzc05hbWUiLCJjb250YWluZXIiLCJlbCIsImNyZWF0ZUVsZW1lbnQiLCJhcHBlbmRDaGlsZCIsInNldExvY2F0aW9uIiwic3R5bGUiLCJ2aXNpYmlsaXR5IiwiZGVidWciLCJsZWZ0IiwidG9wIiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0Iiwic2V0Q2VudGVyTWFya2VyIiwidHlwZSIsImhhcHRpY0FjdHVhdG9yIiwidmlicmF0aW9uTW9kZSIsInZpYnJhdGlvbiIsIm1hcHBpbmciLCJkb3duIiwicmlnaHQiLCJ1cCIsImhhcHRpY0FjdHVhdG9ycyIsInB1bHNlIiwiaGFwdGljIiwidmlicmF0aW9uQWN0dWF0b3IiLCJwbGF5RWZmZWN0IiwiaGFzSm95c3RpY2tzIiwidmFsdWVzIiwiaW5jbHVkZXMiLCJmaWx0ZXIiLCJiIiwic2V0Q2VudGVyIiwiZHBhZCIsImRpYWciLCJrZXlzIiwic3RhcnQiLCJob3RGZWF0dXJlIiwibGFzdE1vdmUiLCJlbmQiLCJkZXN0IiwidHVyZiIsImRlc3RpbmF0aW9uIiwicG9pbnQiLCJkaXN0YW5jZSIsImdlb21ldHJ5IiwiY29vcmRpbmF0ZXMiLCJsbmdMYXRzIiwibG5nIiwibG9jYXRpb24iLCJjb29yZHMiLCJ1bnByb2plY3QiLCJwYW4iLCJzcGVlZCIsIm1pZCIsInNldEJlYXJpbmciLCJiZWFyaW5nTXVsdGkiLCJhYnMiLCJzZXRQaXRjaCIsInBpdGNoTXVsdGkiLCJzZXRab29tIiwib3V0Iiwic2V0U3BlZWQiLCJtYXRjaCIsImJ1dHRvbklkIiwicGFyc2VJbnQiLCJsb2ciLCJNRVNTQUdFUyIsIklOVkFMSURfQlVUVE9OIiwibWF0Y2hlcyIsImRpcmVjdGlvbiIsIm9uSW5pdCIsImluaXRpYXRlZCIsImdldENvbnRhaW5lciIsIl9kZWZpbmVQcm9wZXJ0eSIsIm1vZGUiLCJvcmlnaW5hbEV2ZW50Iiwib25EaXNjb25uZWN0Il0sInNvdXJjZVJvb3QiOiIifQ==