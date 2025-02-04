/**
 * @mixin
 * @memberof module:geoflo
 * @name Utilities
 * @description This module provides utility functions for the Geoflo application.
 * @returns {Object} Returns the Utilities object.
 */
const Utilities = function () {
    const geoflo = this.geoflo;

	/**
	 * @function
     * @memberof module:geoflo.Utilities
	 * @name getRandomColor
	 * @description This function generates a random color by randomly selecting hexadecimal values for each digit of the color code.
	 * @returns {string} A random color in hexadecimal format.
	 */
    this.getRandomColor = function () {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

	/**
	 * @function
     * @memberof module:geoflo.Utilities
	 * @name setProperty
	 * @description This function sets a property value for a given feature. If the feature does not have properties, it creates a new properties object. If the property name includes a dot (.), it creates nested objects to set the value.
	 * @param {Object} feature - The feature object to set the property for.
	 * @param {string} name - The name of the property to set.
	 * @param {any} value - The value to set for the property.
	 */
    this.setProperty = function (feature, name, value) {
        if (!feature) return false;
        
        var props = feature.properties;
        
        if (!props) {
            props = {};
            feature.properties = props;
        }

        if (name.includes('.')) {
            name = name.split('.');
            if (!props[name[0]]) props[name[0]] = {};
            props[name[0]][name[1]] = value;
        } else {
            props[name] = value;
        }
    }

	/**
	 * @function
     * @memberof module:geoflo.Utilities
	 * @name setProperties
	 * @description Updates the properties of a given feature object with new properties.
	 * @param {Object} feature - The feature object whose properties will be updated.
	 * @param {Object} newProps - The new properties to be merged with the existing properties of the feature.
	 */
    this.setProperties = function (feature, newProps) {
        feature.properties = Object.assign(feature.properties || {}, newProps);
    }

	/**
	 * @function
     * @memberof module:geoflo.Utilities
	 * @name isPointEqual
	 * @description Checks if two points are equal based on their coordinates.
	 * @param {Array} coords1 - The coordinates of the first point [x, y].
	 * @param {Array} coords2 - The coordinates of the second point [x, y].
	 * @returns {boolean} Returns true if the points have the same coordinates, false otherwise.
	 */
    this.isPointEqual = function (coords1, coords2) {
        return coords1[0] === coords2[0] && coords1[1] === coords2[1];
    }

	/**
	 * @function
     * @memberof module:geoflo.Utilities
	 * @name isPoint
	 * @description This function takes a feature object and determines if it represents a Point geometry.
	 * @param {Object} f - The feature object to be checked.
	 * @returns {boolean} Returns true if the feature is a Point geometry, false otherwise.
	 */
    this.isPoint = function (f) {
        return !f ? false : f.geometry.type === 'Point';
    }

	/**
	 * @function
     * @memberof module:geoflo.Utilities
	 * @name isPolygon
	 * @description This function determines if a feature represents a polygon by comparing its first and last coordinates.
	 * @param {Object} feature - The feature object to be checked.
	 * @returns {boolean} Returns true if the feature is a polygon, false otherwise.
	 */
    this.isPolygon = function (feature) {
        var coords = feature.geometry.coordinates;
        var firstCoords = coords[0];
        var lastCoords = coords[coords.length - 1];
        return this.isPointEqual(firstCoords, lastCoords);
    }

	/**
	 * @function
     * @memberof module:geoflo.Utilities
	 * @name isLineString
	 * @description This function takes a GeoJSON feature object and determines if it represents a LineString geometry.
	 * @param {Object} f - The GeoJSON feature object to be checked.
	 * @returns {boolean} Returns true if the feature is a LineString, false otherwise.
	 */
    this.isLineString = function (f) {
        return !f ? false : f.geometry.type === 'LineString';
    }

	/**
	 * @function
     * @memberof module:geoflo.Utilities
	 * @name isValidLineString
	 * @description Checks if the input feature is a valid LineString by verifying its geometry coordinates.
	 * @param {Object} f - The input feature to be validated.
	 * @returns {boolean} Returns true if the input feature is a valid LineString, false otherwise.
	 */
    this.isValidLineString = function (f) {
        if (!this.isLineString(f)) return false;
        var coords = f.geometry.coordinates;
        if (coords.length < 2) return false;
        return true;
    }

	/**
	 * @function
     * @memberof module:geoflo.Utilities
	 * @name isLastIndex
	 * @description This function determines if the provided index is the last index in the coordinates array of a feature.
	 * @param {number} i - The index to check.
	 * @param {object} f - The feature object containing the coordinates array.
	 * @returns {boolean} Returns true if the index is the last index, false otherwise.
	 */
    this.isLastIndex = function (i, f) {
        return !f ? false :
        this.isLineString(f) ? i == f.geometry.coordinates.length - 1 :
        this.isPolygon(f) ? i == f.geometry.coordinates[0].length - 1 :
        i == 0 ? true :
        false;
    }

	/**
	 * @function
     * @memberof module:geoflo.Utilities
	 * @name getLastIndexCoords
	 * @description This function returns the last coordinates of a given geometry object.
	 * @param {Object} f - The geometry object to extract the last coordinates from.
	 * @returns {Array} The last coordinates of the geometry object.
	 */
    this.getLastIndexCoords = function (f) {
        return this.isLineString(f) ? f.geometry.coordinates[f.geometry.coordinates.length - 1] :
        this.isPolygon(f) ? f.geometry.coordinates[0][f.geometry.coordinates.length - 1] :
        f.geometry.coordinates;
    }

	/**
	 * @function
     * @memberof module:geoflo.Utilities
	 * @name isEmptyLineString
	 * @description This function determines if the provided feature is a LineString with only two identical points, making it an empty LineString.
	 * @param {Object} feature - The feature object to be checked.
	 * @returns {boolean} Returns true if the feature is an empty LineString, otherwise false.
	 */
    this.isEmptyLineString = function (feature) {
        if (feature.geometry.type === "LineString") {
            var coords = feature.geometry.coordinates;

            if (coords.length === 2) {
                var firstCoords = coords[0];
                var lastCoords = coords[coords.length - 1];
                return this.isPointEqual(firstCoords, lastCoords);
            }
        }

        return false;
    }

	/**
	 * @function
     * @memberof module:geoflo.Utilities
	 * @name reducePrecision
	 * @description This function reduces the precision of the coordinates to 7 decimal places.
	 * @param {Array} coords - An array containing the coordinates to be processed.
	 * @returns {Array} The coordinates with reduced precision to 7 decimal places.
	 */
    this.reducePrecision = function (coords) {
        coords[0] = Number(Number(coords[0]).toFixed(7));
        coords[1] = Number(Number(coords[1]).toFixed(7));
        return coords;
    }

	/**
	 * @function
     * @memberof module:geoflo.Utilities
	 * @name stringToDOM
	 * @description Converts a string to a DOM object using DOMParser.
	 * @param {string} str - The input string to be converted to a DOM object.
	 * @returns {Document} - The DOM object created from the input string.
	 */
    this.stringToDOM = function (str) {
        var parser = new DOMParser();
        return parser.parseFromString(str, "text/xml");
    }

	/**
	 * @function
     * @memberof module:geoflo.Utilities
	 * @name combineSameTypeFeatures
	 * @description This function takes an array of line features and combines them by connecting them based on their coordinates. It checks the endpoints of each line feature and connects them accordingly to form a continuous line.
	 * @param {Array} features - An array of line features to be combined.
	 * @returns {Array} - An array of coordinates representing the combined line features.
	 */
    this.combineSameTypeFeatures = function (features) {
        var coords = [];

        features.forEach(function(lineString) {
            if (coords.length === 0) {
                coords.push.apply(coords, _toConsumableArray(lineString.geometry.coordinates));
            } else {
                var firstPoint = coords[0];
                var lastPoint = coords[coords.length - 1];
                var currentFirstPoint = lineString.geometry.coordinates[0];
                var currentLastPoint = lineString.geometry.coordinates[lineString.geometry.coordinates.length - 1];

                if (this.isPointEqual(lastPoint, currentFirstPoint)) {
                    coords.push.apply(coords, _toConsumableArray(lineString.geometry.coordinates.slice(1, lineString.geometry.coordinates.length)));
                } else if (this.isPointEqual(lastPoint, currentLastPoint)) {
                    coords.push.apply(coords, _toConsumableArray(lineString.geometry.coordinates.slice(0, lineString.geometry.coordinates.length - 1).reverse()));
                } else if (this.isPointEqual(firstPoint, currentLastPoint)) {
                    coords.splice.apply(coords, [0, 0].concat(_toConsumableArray(lineString.geometry.coordinates.slice(0, lineString.geometry.coordinates.length - 1))));
                } else if (this.isPointEqual(firstPoint, currentFirstPoint)) {
                    coords.splice.apply(coords, [0, 1].concat(_toConsumableArray(lineString.geometry.coordinates.reverse())));
                } else {
                    var distanceToFirstPoint = turf.distance(lastPoint, currentFirstPoint);
                    var distanceToLastPoint = turf.distance(lastPoint, currentLastPoint);

                    if (distanceToFirstPoint < distanceToLastPoint) {
                        coords.push.apply(coords, _toConsumableArray(lineString.geometry.coordinates));
                    } else {
                        coords.push.apply(coords, _toConsumableArray([].concat(_toConsumableArray(lineString.geometry.coordinates)).reverse()));
                    }
                }
            }
        }, this);

        return coords;
    }

	/**
	 * @function
     * @memberof module:geoflo.Utilities
	 * @name degrees2meters
	 * @description This function takes an array of latitude and longitude in degrees and converts it to meters using the Mercator projection formula.
	 * @param {Array<number>} px - An array containing latitude and longitude in degrees [longitude, latitude].
	 * @returns {Array<number>} An array containing the converted x and y coordinates in meters.
	 */
    this.degrees2meters = function (px) {
        const x = px[0] * 20037508.34 / 180;
        let y = Math.log(Math.tan((90 + px[1]) * Math.PI / 360)) / (Math.PI / 180);
        y = y * 20037508.34 / 180;
        return [x, y]
    }

	/**
	 * @function
     * @memberof module:geoflo.Utilities
	 * @name meters2degrees
	 * @description This function takes a pixel value and converts it to longitude and latitude in degrees.
	 * @param {Array} px - The pixel value to be converted, in the format [x, y].
	 * @returns {Array} An array containing the longitude and latitude in degrees, [lon, lat].
	 */
    this.meters2degrees = function (px) {
        const lon = px[0] * 180 / 20037508.34;
        const lat = Math.atan(Math.exp(px[1] * Math.PI / 20037508.34)) * 360 / Math.PI - 90;
        return [lon, lat]
    }

	/**
	 * @function
     * @memberof module:geoflo.Utilities
	 * @name extend
	 * @description Extends the properties of the first object with the properties of the subsequent objects.
	 * @param {Object} target - The object to be extended.
	 * @param {...Object} sources - The objects whose properties will be added to the target object.
	 * @return {Object} The extended object.
	 */
    this.extend = function () {
        for(var i=1; i<arguments.length; i++)
            for(var key in arguments[i])
                if(arguments[i].hasOwnProperty(key))
                    arguments[0][key] = arguments[i][key];
        return arguments[0];
    }

	/**
	 * @function
     * @memberof module:geoflo.Utilities
	 * @name clone
	 * @description This function recursively clones the input object or array, preserving the structure and types of the elements.
	 * @param {Object|Array|Date|RegExp|Function|Symbol} thing - The object or array to be cloned.
	 * @param {Object} opts - Optional settings for cloning functions and symbols.
	 * @returns {Object|Array|Date|RegExp|Function|Symbol} - A deep clone of the input object or array.
	 */
    this.clone = function(thing, opts) {
        var newObject = {};

        if (thing instanceof Array) {
            return thing.map(function (i) { return this.clone(i, opts); }, this);
        } else if (thing instanceof Date) {
            return new Date(thing);
        } else if (thing instanceof RegExp) {
            return new RegExp(thing);
        } else if (thing instanceof Function) {
            return opts && opts.newFns ?
            new Function('return ' + thing.toString())() :
            thing;
        } else if (thing instanceof Object) {
            Object.keys(thing).forEach(function (key) { newObject[key] = this.clone(thing[key], opts); }, this);
            return newObject;
        } else if ([ undefined, null ].indexOf(thing) > -1) {
            return thing;
        } else {
            if (thing.constructor.name === 'Symbol') {
                return Symbol(thing.toString().replace(/^Symbol\(/, '').slice(0, -1));
            }

            return thing.__proto__.constructor(thing);
        }
    }

	/**
	 * @function
     * @memberof module:geoflo.Utilities
	 * @name cloneDeep
	 * @description Recursively clones a value, including objects and arrays, preserving the original structure deeply.
	 * @param {any} value - The value to be cloned.
	 * @param {Function} instance - A function that can be used to clone custom instances.
	 * @returns {any} - The deeply cloned value.
	 */
    this.cloneDeep = function(value, instance) {
        var hasOwn = Object.prototype.hasOwnProperty;
        var toString = Object.prototype.toString;
    
        function _cloneDeep(val, instanceClone) {
            switch (kindOf(val)) {
            case 'object':
                return cloneObjectDeep(val, instanceClone);
            case 'array':
                return cloneArrayDeep(val, instanceClone);
            default:
                {
                    return clone(val);
                }
            }
        }
    
        function cloneObjectDeep(obj, instanceClone) {
            if (isObject(obj)) {
                var res = {};
                forOwn(obj, function(obj, key) {
                    this[key] = _cloneDeep(obj, instanceClone);
                }, res);
                return res;
            } else if (instanceClone) {
                return instanceClone(obj);
            } else {
                return obj;
            }
        }
    
        function cloneArrayDeep(arr, instanceClone) {
            var len = arr.length
            , res = [];
            var i = -1;
            while (++i < len) {
                res[i] = _cloneDeep(arr[i], instanceClone);
            }
            return res;
        }
    
        function isObject(val) {
            return val != null && typeof val === 'object' && Array.isArray(val) === false;
        }
    
        function isObjectObject(o) {
            return isObject(o) === true && Object.prototype.toString.call(o) === '[object Object]';
        }
    
        function isPlainObject(o) {
            var ctor, prot;
    
            if (isObjectObject(o) === false)
                return false;
    
            // If has modified constructor
            ctor = o.constructor;
            if (typeof ctor !== 'function')
                return false;
    
            // If has modified prototype
            prot = ctor.prototype;
            if (isObjectObject(prot) === false)
                return false;
    
            // If constructor does not have an Object-specific method
            if (prot.hasOwnProperty('isPrototypeOf') === false) {
                return false;
            }
    
            // Most likely a plain Object
            return true;
        }
    
        function forIn(obj, fn, thisArg) {
            for (var key in obj) {
                if (fn.call(thisArg, obj[key], key, obj) === false) {
                    break;
                }
            }
        }
    
        function forOwn(obj, fn, thisArg) {
            forIn(obj, function(val, key) {
                if (hasOwn.call(obj, key)) {
                    return fn.call(thisArg, obj[key], key, obj);
                }
            });
        }
    
        function kindOf(val) {
            // primitivies
            if (typeof val === 'undefined') {
                return 'undefined';
            }
            if (val === null) {
                return 'null';
            }
            if (val === true || val === false || val instanceof Boolean) {
                return 'boolean';
            }
            if (typeof val === 'string' || val instanceof String) {
                return 'string';
            }
            if (typeof val === 'number' || val instanceof Number) {
                return 'number';
            }
    
            // functions
            if (typeof val === 'function' || val instanceof Function) {
                return 'function';
            }
    
            // array
            if (typeof Array.isArray !== 'undefined' && Array.isArray(val)) {
                return 'array';
            }
    
            // check for instances of RegExp and Date before calling `toString`
            if (val instanceof RegExp) {
                return 'regexp';
            }
            if (val instanceof Date) {
                return 'date';
            }
    
            // other objects
            var type = toString.call(val);
    
            if (type === '[object RegExp]') {
                return 'regexp';
            }
            if (type === '[object Date]') {
                return 'date';
            }
            if (type === '[object Arguments]') {
                return 'arguments';
            }
            if (type === '[object Error]') {
                return 'error';
            }
    
            // buffer
            if (isBuffer(val)) {
                return 'buffer';
            }
    
            // es6: Map, WeakMap, Set, WeakSet
            if (type === '[object Set]') {
                return 'set';
            }
            if (type === '[object WeakSet]') {
                return 'weakset';
            }
            if (type === '[object Map]') {
                return 'map';
            }
            if (type === '[object WeakMap]') {
                return 'weakmap';
            }
            if (type === '[object Symbol]') {
                return 'symbol';
            }
    
            // typed arrays
            if (type === '[object Int8Array]') {
                return 'int8array';
            }
            if (type === '[object Uint8Array]') {
                return 'uint8array';
            }
            if (type === '[object Uint8ClampedArray]') {
                return 'uint8clampedarray';
            }
            if (type === '[object Int16Array]') {
                return 'int16array';
            }
            if (type === '[object Uint16Array]') {
                return 'uint16array';
            }
            if (type === '[object Int32Array]') {
                return 'int32array';
            }
            if (type === '[object Uint32Array]') {
                return 'uint32array';
            }
            if (type === '[object Float32Array]') {
                return 'float32array';
            }
            if (type === '[object Float64Array]') {
                return 'float64array';
            }
    
            // must be a plain object
            return 'object';
        }
    
        function isBuffer(obj) {
            return obj != null && (_isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
        }
    
        function _isBuffer(obj) {
            return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
        }
    
        function isSlowBuffer(obj) {
            return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
        }
    
        function isExtendable(val) {
            return typeof val !== 'undefined' && val !== null && (typeof val === 'object' || typeof val === 'function');
        }
    
        function mixin(target, objects) {
            if (!isExtendable(target)) {
                throw new TypeError('mixin-object expects the first argument to be an object.');
            }
            var len = arguments.length
            , i = 0;
            while (++i < len) {
                var obj = arguments[i];
                if (isExtendable(obj)) {
                    forIn(obj, copy, target);
                }
            }
            return target;
        }
    
        function clone(val) {
            var type = kindOf(val);
    
            if (clone.hasOwnProperty(type)) {
                return clone[type](val);
            }
            return val;
        }
    
        clone.array = function cloneArray(arr) {
            return arr.slice();
        }
    
        clone.date = function cloneDate(date) {
            return new Date(+date);
        }
    
        clone.object = function cloneObject(obj) {
            if (isExtendable(obj)) {
                return mixin({}, obj);
            } else {
                return obj;
            }
        }
    
        clone.regexp = function cloneRegExp(re) {
            var flags = '';
            flags += re.multiline ? 'm' : '';
            flags += re.global ? 'g' : '';
            flags += re.ignorecase ? 'i' : '';
            return new RegExp(re.source,flags);
        }
    
        return _cloneDeep(value, instance);
    }

	/**
	 * @function
     * @memberof module:geoflo.Utilities
	 * @name assignDeep
	 * @description Recursively assigns properties of source object to target object deeply.
	 * @param {Object} target - The target object to which properties will be assigned.
	 * @param {Object} source - The source object whose properties will be assigned to the target.
	 * @param {Object} options - Optional parameters for the assignment process.
	 * @param {boolean} [options.isMutatingOk=false] - Flag to allow mutating the target object.
	 * @param {boolean} [options.isStrictlySafe=false] - Flag to enforce strict safety checks during assignment.
	 * @returns {Object} The target object with assigned properties from the source object.
	 */
    this.assignDeep = function (target, source, {isMutatingOk = false, isStrictlySafe = false} = {}) {
        target = isMutatingOk ? target : this.cloneDeep(target);

        for (const [key, val] of Object.entries(source)) {
            if (val !== null && typeof val === `object`) {
                if (target[key] === undefined) target[key] = {};    
                target[key] = this.assignDeep(target[key], val, {isMutatingOk: true});
            } else {
                target[key] = val;
            }
        }

        return target;
    }

	/**
	 * @function
     * @memberof module:geoflo.Utilities
	 * @name compareDeep
	 * @description Recursively compares two objects deeply to check if they are equal.
	 * @param {Object} x - The first object to compare.
	 * @param {Object} y - The second object to compare.
	 * @returns {boolean} Returns true if the objects are deeply equal, false otherwise.
	 */
    this.compareDeep = function() {
        var i, l, leftChain, rightChain;
      
        function compare2Objects (x, y) {
          var p;
      
          // remember that NaN === NaN returns false
          // and isNaN(undefined) returns true
          if (isNaN(x) && isNaN(y) && typeof x === 'number' && typeof y === 'number') {
               return true;
          }
      
          // Compare primitives and functions.     
          // Check if both arguments link to the same object.
          // Especially useful on the step where we compare prototypes
          if (x === y) {
              return true;
          }
      
          // Works in case when functions are created in constructor.
          // Comparing dates is a common scenario. Another built-ins?
          // We can even handle functions passed across iframes
          if ((typeof x === 'function' && typeof y === 'function') ||
             (x instanceof Date && y instanceof Date) ||
             (x instanceof RegExp && y instanceof RegExp) ||
             (x instanceof String && y instanceof String) ||
             (x instanceof Number && y instanceof Number)) {
              return x.toString() === y.toString();
          }
      
          // At last checking prototypes as good as we can
          if (!(x instanceof Object && y instanceof Object)) {
              return false;
          }
      
          if (x.isPrototypeOf(y) || y.isPrototypeOf(x)) {
              return false;
          }
      
          if (x.constructor !== y.constructor) {
              return false;
          }
      
          if (x.prototype !== y.prototype) {
              return false;
          }
      
          // Check for infinitive linking loops
          if (leftChain.indexOf(x) > -1 || rightChain.indexOf(y) > -1) {
               return false;
          }
      
          // Quick checking of one object being a subset of another.
          // todo: cache the structure of arguments[0] for performance
          for (p in y) {
              if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
                  return false;
              }
              else if (typeof y[p] !== typeof x[p]) {
                  return false;
              }
          }
      
          for (p in x) {
              if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
                  return false;
              }
              else if (typeof y[p] !== typeof x[p]) {
                  return false;
              }
      
              switch (typeof (x[p])) {
                  case 'object':
                  case 'function':
      
                      leftChain.push(x);
                      rightChain.push(y);
      
                      if (!compare2Objects (x[p], y[p])) {
                          return false;
                      }
      
                      leftChain.pop();
                      rightChain.pop();
                      break;
      
                  default:
                      if (x[p] !== y[p]) {
                          return false;
                      }
                      break;
              }
          }
      
          return true;
        }
      
        if (arguments.length < 1) return true;
      
        for (i = 1, l = arguments.length; i < l; i++) {
      
            leftChain = []; //Todo: this can be cached
            rightChain = [];
      
            if (!compare2Objects(arguments[0], arguments[i])) return false;
        }
      
        return true;
    }

	/**
	 * @function
     * @memberof module:geoflo.Utilities
	 * @name consumableArray
	 * @description Creates a consumable copy of an array or array-like object.
	 * @param {Array|Array-like} arr - The input array or array-like object to be copied.
	 * @returns {Array} A consumable copy of the input array or array-like object.
	 */
    this.consumableArray = function (arr) {
        if (Array.isArray(arr)) {
            for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
                arr2[i] = arr[i];
            }
            return arr2;
        } else {
            return Array.from(arr);
        }
    }
}

function _toConsumableArray(arr) {
    if (Array.isArray(arr)) {
        for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
            arr2[i] = arr[i];
        }
        return arr2;
    } else {
        return Array.from(arr);
    }
}

export default Utilities;