(function (global, factory) {
typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
typeof define === 'function' && define.amd ? define(factory) :
(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.CheapRuler = factory());
})(this, (function () { 'use strict';

var factors = {
    kilometers: 1,
    miles: 1000 / 1609.344,
    nauticalmiles: 1000 / 1852,
    meters: 1000,
    metres: 1000,
    yards: 1000 / 0.9144,
    feet: 1000 / 0.3048,
    inches: 1000 / 0.0254
};

// Values that define WGS84 ellipsoid model of the Earth
var RE = 6378.137; // equatorial radius
var FE = 1 / 298.257223563; // flattening

var E2 = FE * (2 - FE);
var RAD = Math.PI / 180;

/**
 * A collection of very fast approximations to common geodesic measurements. Useful for performance-sensitive code that measures things on a city scale.
 *
 * @param {number} lat latitude
 * @param {string} [units='kilometers']
 * @returns {CheapRuler}
 * @example
 * const ruler = cheapRuler(35.05, 'miles');
 * //=ruler
 */
var CheapRuler = function CheapRuler(lat, units) {
    if (lat === undefined) { throw new Error('No latitude given.'); }
    if (units && !factors[units]) { throw new Error(("Unknown unit " + units + ". Use one of: " + (Object.keys(factors).join(', ')))); }

    // Curvature formulas from https://en.wikipedia.org/wiki/Earth_radius#Meridional
    var m = RAD * RE * (units ? factors[units] : 1);
    var coslat = Math.cos(lat * RAD);
    var w2 = 1 / (1 - E2 * (1 - coslat * coslat));
    var w = Math.sqrt(w2);

    // multipliers for converting longitude and latitude degrees into distance
    this.kx = m * w * coslat;    // based on normal radius of curvature
    this.ky = m * w * w2 * (1 - E2); // based on meridonal radius of curvature
};

var staticAccessors = { units: { configurable: true } };

/**
 * Given two points of the form [longitude, latitude], returns the distance.
 *
 * @param {Array<number>} a point [longitude, latitude]
 * @param {Array<number>} b point [longitude, latitude]
 * @returns {number} distance
 * @example
 * const distance = ruler.distance([30.5, 50.5], [30.51, 50.49]);
 * //=distance
 */
CheapRuler.fromTile = function fromTile (y, z, units) {
    var n = Math.PI * (1 - 2 * (y + 0.5) / Math.pow(2, z));
    var lat = Math.atan(0.5 * (Math.exp(n) - Math.exp(-n))) / RAD;
    return new CheapRuler(lat, units);
};

/**
 * Multipliers for converting between units.
 *
 * @example
 * // convert 50 meters to yards
 * 50 * CheapRuler.units.yards / CheapRuler.units.meters;
 */
staticAccessors.units.get = function () {
    return factors;
};

CheapRuler.prototype.distance = function distance (a, b) {
    var dx = wrap(a[0] - b[0]) * this.kx;
    var dy = (a[1] - b[1]) * this.ky;
    return Math.sqrt(dx * dx + dy * dy);
};

/**
 * Returns the bearing between two points in angles.
 *
 * @param {Array<number>} a point [longitude, latitude]
 * @param {Array<number>} b point [longitude, latitude]
 * @returns {number} bearing
 * @example
 * const bearing = ruler.bearing([30.5, 50.5], [30.51, 50.49]);
 * //=bearing
 */
CheapRuler.prototype.bearing = function bearing (a, b) {
    var dx = wrap(b[0] - a[0]) * this.kx;
    var dy = (b[1] - a[1]) * this.ky;
    return Math.atan2(dx, dy) / RAD;
};

/**
 * Returns a new point given distance and bearing from the starting point.
 *
 * @param {Array<number>} p point [longitude, latitude]
 * @param {number} dist distance
 * @param {number} bearing
 * @returns {Array<number>} point [longitude, latitude]
 * @example
 * const point = ruler.destination([30.5, 50.5], 0.1, 90);
 * //=point
 */
CheapRuler.prototype.destination = function destination (p, dist, bearing) {
    var a = bearing * RAD;
    return this.offset(p,
        Math.sin(a) * dist,
        Math.cos(a) * dist);
};

/**
 * Returns a new point given easting and northing offsets (in ruler units) from the starting point.
 *
 * @param {Array<number>} p point [longitude, latitude]
 * @param {number} dx easting
 * @param {number} dy northing
 * @returns {Array<number>} point [longitude, latitude]
 * @example
 * const point = ruler.offset([30.5, 50.5], 10, 10);
 * //=point
 */
CheapRuler.prototype.offset = function offset (p, dx, dy) {
    return [
        p[0] + dx / this.kx,
        p[1] + dy / this.ky
    ];
};

/**
 * Given a line (an array of points), returns the total line distance.
 *
 * @param {Array<Array<number>>} points [longitude, latitude]
 * @returns {number} total line distance
 * @example
 * const length = ruler.lineDistance([
 * [-67.031, 50.458], [-67.031, 50.534],
 * [-66.929, 50.534], [-66.929, 50.458]
 * ]);
 * //=length
 */
CheapRuler.prototype.lineDistance = function lineDistance (points) {
    var total = 0;
    for (var i = 0; i < points.length - 1; i++) {
        total += this.distance(points[i], points[i + 1]);
    }
    return total;
};

/**
 * Given a polygon (an array of rings, where each ring is an array of points), returns the area.
 *
 * @param {Array<Array<Array<number>>>} polygon
 * @returns {number} area value in the specified units (square kilometers by default)
 * @example
 * const area = ruler.area([[
 * [-67.031, 50.458], [-67.031, 50.534], [-66.929, 50.534],
 * [-66.929, 50.458], [-67.031, 50.458]
 * ]]);
 * //=area
 */
CheapRuler.prototype.area = function area (polygon) {
    var sum = 0;

    for (var i = 0; i < polygon.length; i++) {
        var ring = polygon[i];

        for (var j = 0, len = ring.length, k = len - 1; j < len; k = j++) {
            sum += wrap(ring[j][0] - ring[k][0]) * (ring[j][1] + ring[k][1]) * (i ? -1 : 1);
        }
    }

    return (Math.abs(sum) / 2) * this.kx * this.ky;
};

/**
 * Returns the point at a specified distance along the line.
 *
 * @param {Array<Array<number>>} line
 * @param {number} dist distance
 * @returns {Array<number>} point [longitude, latitude]
 * @example
 * const point = ruler.along(line, 2.5);
 * //=point
 */
CheapRuler.prototype.along = function along (line, dist) {
    var sum = 0;

    if (dist <= 0) { return line[0]; }

    for (var i = 0; i < line.length - 1; i++) {
        var p0 = line[i];
        var p1 = line[i + 1];
        var d = this.distance(p0, p1);
        sum += d;
        if (sum > dist) { return interpolate(p0, p1, (dist - (sum - d)) / d); }
    }

    return line[line.length - 1];
};

/**
 * Returns the distance from a point `p` to a line segment `a` to `b`.
 *
 * @pointToSegmentDistance
 * @param {Array<number>} p point [longitude, latitude]
 * @param {Array<number>} p1 segment point 1 [longitude, latitude]
 * @param {Array<number>} p2 segment point 2 [longitude, latitude]
 * @returns {number} distance
 * @example
 * const distance = ruler.pointToSegmentDistance([-67.04, 50.5], [-67.05, 50.57], [-67.03, 50.54]);
 * //=distance
 */
CheapRuler.prototype.pointToSegmentDistance = function pointToSegmentDistance (p, a, b) {
    var x = a[0];
        var y = a[1];
    var dx = wrap(b[0] - x) * this.kx;
    var dy = (b[1] - y) * this.ky;
    var t = 0;

    if (dx !== 0 || dy !== 0) {
        t = (wrap(p[0] - x) * this.kx * dx + (p[1] - y) * this.ky * dy) / (dx * dx + dy * dy);

        if (t > 1) {
            x = b[0];
            y = b[1];

        } else if (t > 0) {
            x += (dx / this.kx) * t;
            y += (dy / this.ky) * t;
        }
    }

    dx = wrap(p[0] - x) * this.kx;
    dy = (p[1] - y) * this.ky;

    return Math.sqrt(dx * dx + dy * dy);
};

/**
 * Returns an object of the form {point, index, t}, where point is closest point on the line
 * from the given point, index is the start index of the segment with the closest point,
 * and t is a parameter from 0 to 1 that indicates where the closest point is on that segment.
 *
 * @param {Array<Array<number>>} line
 * @param {Array<number>} p point [longitude, latitude]
 * @returns {Object} {point, index, t}
 * @example
 * const point = ruler.pointOnLine(line, [-67.04, 50.5]).point;
 * //=point
 */
CheapRuler.prototype.pointOnLine = function pointOnLine (line, p) {
    var minDist = Infinity;
    var minX, minY, minI, minT;

    for (var i = 0; i < line.length - 1; i++) {

        var x = line[i][0];
        var y = line[i][1];
        var dx = wrap(line[i + 1][0] - x) * this.kx;
        var dy = (line[i + 1][1] - y) * this.ky;
        var t = 0;

        if (dx !== 0 || dy !== 0) {
            t = (wrap(p[0] - x) * this.kx * dx + (p[1] - y) * this.ky * dy) / (dx * dx + dy * dy);

            if (t > 1) {
                x = line[i + 1][0];
                y = line[i + 1][1];

            } else if (t > 0) {
                x += (dx / this.kx) * t;
                y += (dy / this.ky) * t;
            }
        }

        dx = wrap(p[0] - x) * this.kx;
        dy = (p[1] - y) * this.ky;

        var sqDist = dx * dx + dy * dy;
        if (sqDist < minDist) {
            minDist = sqDist;
            minX = x;
            minY = y;
            minI = i;
            minT = t;
        }
    }

    return {
        point: [minX, minY],
        index: minI,
        t: Math.max(0, Math.min(1, minT))
    };
};

/**
 * Returns a part of the given line between the start and the stop points (or their closest points on the line).
 *
 * @param {Array<number>} start point [longitude, latitude]
 * @param {Array<number>} stop point [longitude, latitude]
 * @param {Array<Array<number>>} line
 * @returns {Array<Array<number>>} line part of a line
 * @example
 * const line2 = ruler.lineSlice([-67.04, 50.5], [-67.05, 50.56], line1);
 * //=line2
 */
CheapRuler.prototype.lineSlice = function lineSlice (start, stop, line) {
    var p1 = this.pointOnLine(line, start);
    var p2 = this.pointOnLine(line, stop);

    if (p1.index > p2.index || (p1.index === p2.index && p1.t > p2.t)) {
        var tmp = p1;
        p1 = p2;
        p2 = tmp;
    }

    var slice = [p1.point];

    var l = p1.index + 1;
    var r = p2.index;

    if (!equals(line[l], slice[0]) && l <= r)
        { slice.push(line[l]); }

    for (var i = l + 1; i <= r; i++) {
        slice.push(line[i]);
    }

    if (!equals(line[r], p2.point))
        { slice.push(p2.point); }

    return slice;
};

/**
 * Returns a part of the given line between the start and the stop points indicated by distance along the line.
 *
 * @param {number} start distance
 * @param {number} stop distance
 * @param {Array<Array<number>>} line
 * @returns {Array<Array<number>>} line part of a line
 * @example
 * const line2 = ruler.lineSliceAlong(10, 20, line1);
 * //=line2
 */
CheapRuler.prototype.lineSliceAlong = function lineSliceAlong (start, stop, line) {
    var sum = 0;
    var slice = [];

    for (var i = 0; i < line.length - 1; i++) {
        var p0 = line[i];
        var p1 = line[i + 1];
        var d = this.distance(p0, p1);

        sum += d;

        if (sum > start && slice.length === 0) {
            slice.push(interpolate(p0, p1, (start - (sum - d)) / d));
        }

        if (sum >= stop) {
            slice.push(interpolate(p0, p1, (stop - (sum - d)) / d));
            return slice;
        }

        if (sum > start) { slice.push(p1); }
    }

    return slice;
};

/**
 * Given a point, returns a bounding box object ([w, s, e, n]) created from the given point buffered by a given distance.
 *
 * @param {Array<number>} p point [longitude, latitude]
 * @param {number} buffer
 * @returns {Array<number>} box object ([w, s, e, n])
 * @example
 * const bbox = ruler.bufferPoint([30.5, 50.5], 0.01);
 * //=bbox
 */
CheapRuler.prototype.bufferPoint = function bufferPoint (p, buffer) {
    var v = buffer / this.ky;
    var h = buffer / this.kx;
    return [
        p[0] - h,
        p[1] - v,
        p[0] + h,
        p[1] + v
    ];
};

/**
 * Given a bounding box, returns the box buffered by a given distance.
 *
 * @param {Array<number>} box object ([w, s, e, n])
 * @param {number} buffer
 * @returns {Array<number>} box object ([w, s, e, n])
 * @example
 * const bbox = ruler.bufferBBox([30.5, 50.5, 31, 51], 0.2);
 * //=bbox
 */
CheapRuler.prototype.bufferBBox = function bufferBBox (bbox, buffer) {
    var v = buffer / this.ky;
    var h = buffer / this.kx;
    return [
        bbox[0] - h,
        bbox[1] - v,
        bbox[2] + h,
        bbox[3] + v
    ];
};

/**
 * Returns true if the given point is inside in the given bounding box, otherwise false.
 *
 * @param {Array<number>} p point [longitude, latitude]
 * @param {Array<number>} box object ([w, s, e, n])
 * @returns {boolean}
 * @example
 * const inside = ruler.insideBBox([30.5, 50.5], [30, 50, 31, 51]);
 * //=inside
 */
CheapRuler.prototype.insideBBox = function insideBBox (p, bbox) {
    return wrap(p[0] - bbox[0]) >= 0 &&
           wrap(p[0] - bbox[2]) <= 0 &&
           p[1] >= bbox[1] &&
           p[1] <= bbox[3];
};

Object.defineProperties( CheapRuler, staticAccessors );

function equals(a, b) {
    return a[0] === b[0] && a[1] === b[1];
}

function interpolate(a, b, t) {
    var dx = wrap(b[0] - a[0]);
    var dy = b[1] - a[1];
    return [
        a[0] + dx * t,
        a[1] + dy * t
    ];
}

// normalize a degree value into [-180..180] range
function wrap(deg) {
    while (deg < -180) { deg += 360; }
    while (deg > 180) { deg -= 360; }
    return deg;
}

return CheapRuler;

}));
