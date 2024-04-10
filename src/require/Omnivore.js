const Omnivore = (function (omnivore) {
  if (!omnivore) throw new Error('Omnivore is required!');

  (function (f) { if (typeof exports === "object" && typeof module !== "undefined") { module.exports = f() } else if (typeof define === "function" && define.amd) { define([], f) } else { var g; if (typeof window !== "undefined") { g = window } else if (typeof global !== "undefined") { g = global } else if (typeof self !== "undefined") { g = self } else { g = this } g.togpx = f() } })(function () {
    var define, module, exports; return (function e(t, n, r) { function s(o, u) { if (!n[o]) { if (!t[o]) { var a = typeof require == "function" && require; if (!u && a) return a(o, !0); if (i) return i(o, !0); var f = new Error("Cannot find module '" + o + "'"); throw f.code = "MODULE_NOT_FOUND", f } var l = n[o] = { exports: {} }; t[o][0].call(l.exports, function (e) { var n = t[o][1][e]; return s(n ? n : e) }, l, l.exports, e, t, n, r) } return n[o].exports } var i = typeof require == "function" && require; for (var o = 0; o < r.length; o++)s(r[o]); return s })({
      1: [function (require, module, exports) {
        var JXON = require("jxon");
        JXON.config({ attrPrefix: '@' });

        function togpx(geojson, options) {
          options = (function (defaults, options) {
            for (var k in defaults) {
              if (options.hasOwnProperty(k))
                defaults[k] = options[k];
            }
            return defaults;
          })({
            creator: "togpx",
            metadata: undefined,
            featureTitle: get_feature_title,
            featureDescription: get_feature_description,
            featureLink: undefined,
            featureCoordTimes: get_feature_coord_times,
          }, options || {});

          // is featureCoordTimes is a string -> look for the specified property
          if (typeof options.featureCoordTimes === 'string') {
            var customTimesFieldKey = options.featureCoordTimes;
            options.featureCoordTimes = function (feature) {
              return feature.properties[customTimesFieldKey];
            }
          }

          function get_feature_title(props) {
            // a simple default heuristic to determine a title for a given feature
            // uses a nested `tags` object or the feature's `properties` if present
            // and then searchs for the following properties to construct a title:
            // `name`, `ref`, `id`
            if (!props) return "";
            if (typeof props.tags === "object") {
              var tags_title = get_feature_title(props.tags);
              if (tags_title !== "")
                return tags_title;
            }
            if (props.name)
              return props.name;
            if (props.ref)
              return props.ref;
            if (props.id)
              return props.id;
            return "";
          }
          function get_feature_description(props) {
            // constructs a description for a given feature
            // uses a nested `tags` object or the feature's `properties` if present
            // and then concatenates all properties to construct a description.
            if (!props) return "";
            if (typeof props.tags === "object")
              return get_feature_description(props.tags);
            var res = "";
            for (var k in props) {
              if (typeof props[k] === "object")
                continue;
              res += k + "=" + props[k] + "\n";
            }
            return res.substr(0, res.length - 1);
          }
          function get_feature_coord_times(feature) {
            if (!feature.properties) return null;
            return feature.properties.times || feature.properties.coordTimes || null;
          }
          function add_feature_link(o, f) {
            if (options.featureLink)
              o.link = { "@href": options.featureLink(f.properties) }
          }
          // make gpx object
          var gpx = {
            "gpx": {
              "@xmlns": "http://www.topografix.com/GPX/1/1",
              "@xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
              "@xsi:schemaLocation": "http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd",
              "@version": "1.1",
              "metadata": null,
              "wpt": [],
              "trk": [],
            }
          };

          if (options.creator)
            gpx.gpx["@creator"] = options.creator;
          if (options.metadata)
            gpx.gpx["metadata"] = options.metadata;
          else
            delete options.metadata;

          var features;

          if (geojson.type === "FeatureCollection")
            features = geojson.features;
          else if (geojson.type === "Feature")
            features = [geojson];
          else
            features = [{ type: "Feature", properties: {}, geometry: geojson }];

          features.forEach(function mapFeature(f) {
            var o;
            switch (f.geometry.type) {
              // POIs
              case "Point":
              case "MultiPoint":
                var coords = f.geometry.coordinates;
                if (f.geometry.type == "Point") coords = [coords];
                coords.forEach(function (coordinates) {
                  o = {
                    "@lat": coordinates[1],
                    "@lon": coordinates[0],
                    "name": options.featureTitle(f.properties),
                    "desc": options.featureDescription(f.properties)
                  };
                  if (coordinates[2] !== undefined) {
                    o.ele = coordinates[2];
                  }
                  add_feature_link(o, f);
                  gpx.gpx.wpt.push(o);
                });
                break;
              // LineStrings
              case "LineString":
              case "MultiLineString":
                var coords = f.geometry.coordinates;
                var times = options.featureCoordTimes(f);
                if (f.geometry.type == "LineString") coords = [coords];
                o = {
                  "name": options.featureTitle(f.properties),
                  "desc": options.featureDescription(f.properties)
                };
                add_feature_link(o, f);
                o.trkseg = [];
                coords.forEach(function (coordinates) {
                  var seg = { trkpt: [] };
                  coordinates.forEach(function (c, i) {
                    var o = {
                      "@lat": c[1],
                      "@lon": c[0]
                    };
                    if (c[2] !== undefined) {
                      o.ele = c[2];
                    }
                    if (times && times[i]) {
                      o.time = times[i];
                    }
                    seg.trkpt.push(o);
                  });
                  o.trkseg.push(seg);
                });
                gpx.gpx.trk.push(o);
                break;
              // Polygons / Multipolygons
              case "Polygon":
              case "MultiPolygon":
                o = {
                  "name": options.featureTitle(f.properties),
                  "desc": options.featureDescription(f.properties)
                };
                add_feature_link(o, f);
                o.trkseg = [];
                var coords = f.geometry.coordinates;
                var times = options.featureCoordTimes(f);
                if (f.geometry.type == "Polygon") coords = [coords];
                coords.forEach(function (poly) {
                  poly.forEach(function (ring) {
                    var seg = { trkpt: [] };
                    var i = 0;
                    ring.forEach(function (c) {
                      var o = {
                        "@lat": c[1],
                        "@lon": c[0]
                      };
                      if (c[2] !== undefined) {
                        o.ele = c[2];
                      }
                      if (times && times[i]) {
                        o.time = times[i];
                      }
                      i++;
                      seg.trkpt.push(o);
                    });
                    o.trkseg.push(seg);
                  });
                });
                gpx.gpx.trk.push(o);
                break;
              case "GeometryCollection":
                f.geometry.geometries.forEach(function (geometry) {
                  var pseudo_feature = {
                    "properties": f.properties,
                    "geometry": geometry
                  };
                  mapFeature(pseudo_feature);
                });
                break;
              default:
                console.log("warning: unsupported geometry type: " + f.geometry.type);
            }
          });

          return JXON.stringify(gpx);
        };

        module.exports = togpx;

      }, { "jxon": 2 }], 2: [function (require, module, exports) {
        /*
         * JXON framework - Copyleft 2011 by Mozilla Developer Network
         *
         * Revision #1 - September 5, 2014
         *
         * https://developer.mozilla.org/en-US/docs/JXON
         *
         * This framework is released under the GNU Public License, version 3 or later.
         * http://www.gnu.org/licenses/gpl-3.0-standalone.html
         *
         * small modifications performed by the iD project:
         * https://github.com/openstreetmap/iD/commits/18aa33ba97b52cacf454e95c65d154000e052a1f/js/lib/jxon.js
         *
         * small modifications performed by user @bugreport0
         * https://github.com/tyrasd/JXON/pull/2/commits
         *
         * some additions and modifications by user @igord
         * https://github.com/tyrasd/JXON/pull/5/commits
         *
         * bugfixes and code cleanup by user @laubstein
         * https://github.com/tyrasd/jxon/pull/32
         *
         * adapted for nodejs and npm by @tyrasd (Martin Raifer <tyr.asd@gmail.com>) 
         */

        (function (root, factory) {
          if (typeof define === 'function' && define.amd) {
            // AMD. Register as an anonymous module.
            define([], factory(window));
          } else if (typeof exports === 'object') {
            if (typeof window === 'object' && window.DOMImplementation && window.XMLSerializer && window.DOMParser) {
              // Browserify. hardcode usage of browser's own XMLDom implementation
              // see https://github.com/tyrasd/jxon/issues/18

              module.exports = factory(window);
            } else {
              // Node. Does not work with strict CommonJS, but
              // only CommonJS-like environments that support module.exports,
              // like Node.

              module.exports = factory(require('xmldom'), true);
            }
          } else {
            // Browser globals (root is window)

            root.JXON = factory(window);
          }
        }(this, function (xmlDom, isNodeJs) {
          var opts = {
            valueKey: '_',
            attrKey: '$',
            attrPrefix: '$',
            lowerCaseTags: false,
            trueIsEmpty: false,
            autoDate: false,
            ignorePrefixedNodes: false,
            parseValues: false
          };
          var aCache = [];
          var rIsNull = /^\s*$/;
          var rIsBool = /^(?:true|false)$/i;
          var DOMParser;

          return new (function () {

            this.config = function (cfg) {
              for (var k in cfg) {

                opts[k] = cfg[k];
              }
              if (opts.parserErrorHandler) {
                DOMParser = new xmlDom.DOMParser({
                  errorHandler: opts.parserErrorHandler,
                  locator: {}
                });
              }
            };

            function parseText(sValue) {
              if (!opts.parseValues) {
                return sValue;
              }

              if (rIsNull.test(sValue)) {
                return null;
              }

              if (rIsBool.test(sValue)) {
                return sValue.toLowerCase() === 'true';
              }

              if (isFinite(sValue)) {
                return parseFloat(sValue);
              }

              if (opts.autoDate && isFinite(Date.parse(sValue))) {
                return new Date(sValue);
              }

              return sValue;
            }
            function EmptyTree() {
            }
            EmptyTree.prototype.toString = function () {
              return 'null';
            };

            EmptyTree.prototype.valueOf = function () {
              return null;
            };

            function objectify(vValue) {
              return vValue === null ? new EmptyTree() : vValue instanceof Object ? vValue : new vValue.constructor(vValue);
            }

            function createObjTree(oParentNode, nVerb, bFreeze, bNesteAttr) {
              var CDATA = 4,
                TEXT = 3,
                ELEMENT = 1,
                nLevelStart = aCache.length,
                bChildren = oParentNode.hasChildNodes(),
                bAttributes = oParentNode.nodeType === oParentNode.ELEMENT_NODE && oParentNode.hasAttributes(),
                bHighVerb = Boolean(nVerb & 2),
                nLength = 0,
                sCollectedTxt = '',
                vResult = bHighVerb ? {} : /* put here the default value for empty nodes: */ (opts.trueIsEmpty ? true : ''),
                sProp,
                vContent;

              if (bChildren) {
                for (var oNode, nItem = 0; nItem < oParentNode.childNodes.length; nItem++) {

                  oNode = oParentNode.childNodes.item(nItem);
                  if (oNode.nodeType === CDATA) {
                    sCollectedTxt += oNode.nodeValue;
                  } /* nodeType is "CDATASection" (4) */
                  else if (oNode.nodeType === TEXT) {
                    sCollectedTxt += oNode.nodeValue.trim();
                  } /* nodeType is "Text" (3) */
                  else if (oNode.nodeType === ELEMENT && !(opts.ignorePrefixedNodes && oNode.prefix)) {
                    aCache.push(oNode);
                  }
                  /* nodeType is "Element" (1) */
                }
              }

              var nLevelEnd = aCache.length,
                vBuiltVal = parseText(sCollectedTxt);

              if (!bHighVerb && (bChildren || bAttributes)) {
                vResult = nVerb === 0 ? objectify(vBuiltVal) : {};
              }

              for (var nElId = nLevelStart; nElId < nLevelEnd; nElId++) {

                sProp = aCache[nElId].nodeName;
                if (opts.lowerCaseTags) {
                  sProp = sProp.toLowerCase();
                }

                vContent = createObjTree(aCache[nElId], nVerb, bFreeze, bNesteAttr);
                if (vResult.hasOwnProperty(sProp)) {
                  if (vResult[sProp].constructor !== Array) {
                    vResult[sProp] = [vResult[sProp]];
                  }

                  vResult[sProp].push(vContent);
                } else {
                  vResult[sProp] = vContent;

                  nLength++;
                }
              }

              if (bAttributes) {
                var nAttrLen = oParentNode.attributes.length,
                  sAPrefix = bNesteAttr ? '' : opts.attrPrefix,
                  oAttrParent = bNesteAttr ? {} : vResult;

                for (var oAttrib, oAttribName, nAttrib = 0; nAttrib < nAttrLen; nLength++, nAttrib++) {

                  oAttrib = oParentNode.attributes.item(nAttrib);

                  oAttribName = oAttrib.name;
                  if (opts.lowerCaseTags) {
                    oAttribName = oAttribName.toLowerCase();
                  }

                  oAttrParent[sAPrefix + oAttribName] = parseText(oAttrib.value.trim());
                }

                if (bNesteAttr) {
                  if (bFreeze) {
                    Object.freeze(oAttrParent);
                  }

                  vResult[opts.attrKey] = oAttrParent;

                  nLength -= nAttrLen - 1;
                }

              }

              if (nVerb === 3 || (nVerb === 2 || nVerb === 1 && nLength > 0) && sCollectedTxt) {
                vResult[opts.valueKey] = vBuiltVal;
              } else if (!bHighVerb && nLength === 0 && sCollectedTxt) {
                vResult = vBuiltVal;
              }
              if (bFreeze && (bHighVerb || nLength > 0)) {
                Object.freeze(vResult);
              }

              aCache.length = nLevelStart;

              return vResult;
            }
            function loadObjTree(oXMLDoc, oParentEl, oParentObj) {
              var vValue,
                oChild,
                elementNS;

              if (oParentObj.constructor === String || oParentObj.constructor === Number || oParentObj.constructor === Boolean) {
                oParentEl.appendChild(oXMLDoc.createTextNode(oParentObj.toString())); /* verbosity level is 0 or 1 */
                if (oParentObj === oParentObj.valueOf()) {
                  return;
                }

              } else if (oParentObj.constructor === Date) {
                oParentEl.appendChild(oXMLDoc.createTextNode(oParentObj.toISOString()));
              }
              for (var sName in oParentObj) {

                vValue = oParentObj[sName];
                if (vValue === undefined) {
                  continue;
                }
                if (vValue === null) {
                  vValue = {};
                }

                if (isFinite(sName) || vValue instanceof Function) {
                  continue;
                }

                /* verbosity level is 0 */
                if (sName === opts.valueKey) {
                  if (vValue !== null && vValue !== true) {
                    oParentEl.appendChild(oXMLDoc.createTextNode(vValue.constructor === Date ? vValue.toISOString() : String(vValue)));
                  }

                } else if (sName === opts.attrKey) { /* verbosity level is 3 */
                  for (var sAttrib in vValue) {
                    oParentEl.setAttribute(sAttrib, vValue[sAttrib]);
                  }
                } else if (sName === opts.attrPrefix + 'xmlns') {
                  if (isNodeJs) {
                    oParentEl.setAttribute(sName.slice(1), vValue);
                  }
                  // do nothing: special handling of xml namespaces is done via createElementNS()
                } else if (sName.charAt(0) === opts.attrPrefix) {
                  oParentEl.setAttribute(sName.slice(1), vValue);
                } else if (vValue.constructor === Array) {
                  for (var nItem in vValue) {
                    if (!vValue.hasOwnProperty(nItem)) continue;
                    elementNS = (vValue[nItem] && vValue[nItem][opts.attrPrefix + 'xmlns']) || oParentEl.namespaceURI;
                    if (elementNS) {
                      oChild = oXMLDoc.createElementNS(elementNS, sName);
                    } else {
                      oChild = oXMLDoc.createElement(sName);
                    }

                    loadObjTree(oXMLDoc, oChild, vValue[nItem] || {});
                    oParentEl.appendChild(oChild);
                  }
                } else {
                  elementNS = (vValue || {})[opts.attrPrefix + 'xmlns'] || oParentEl.namespaceURI;
                  if (elementNS) {
                    oChild = oXMLDoc.createElementNS(elementNS, sName);
                  } else {
                    oChild = oXMLDoc.createElement(sName);
                  }
                  if (vValue instanceof Object) {
                    loadObjTree(oXMLDoc, oChild, vValue);
                  } else if (vValue !== null && (vValue !== true || !opts.trueIsEmpty)) {
                    oChild.appendChild(oXMLDoc.createTextNode(vValue.toString()));
                  }
                  oParentEl.appendChild(oChild);
                }
              }
            }
            this.xmlToJs = this.build = function (oXMLParent, nVerbosity /* optional */, bFreeze /* optional */, bNesteAttributes /* optional */) {
              var _nVerb = arguments.length > 1 && typeof nVerbosity === 'number' ? nVerbosity & 3 : /* put here the default verbosity level: */ 1;
              return createObjTree(oXMLParent, _nVerb, bFreeze || false, arguments.length > 3 ? bNesteAttributes : _nVerb === 3);
            };

            this.jsToXml = this.unbuild = function (oObjTree, sNamespaceURI /* optional */, sQualifiedName /* optional */, oDocumentType /* optional */) {
              var documentImplementation = xmlDom.document && xmlDom.document.implementation || new xmlDom.DOMImplementation();
              var oNewDoc = documentImplementation.createDocument(sNamespaceURI || null, sQualifiedName || '', oDocumentType || null);
              loadObjTree(oNewDoc, oNewDoc.documentElement || oNewDoc, oObjTree);
              return oNewDoc;
            };

            this.stringToXml = function (xmlStr) {
              if (!DOMParser) {
                DOMParser = new xmlDom.DOMParser();
              }

              return DOMParser.parseFromString(xmlStr, 'application/xml');
            };

            this.xmlToString = function (xmlObj) {
              if (typeof xmlObj.xml !== 'undefined') {
                return xmlObj.xml;
              } else {
                return (new xmlDom.XMLSerializer()).serializeToString(xmlObj);
              }
            };

            this.stringToJs = function (str) {
              var xmlObj = this.stringToXml(str);
              return this.xmlToJs(xmlObj);
            };

            this.jsToString = this.stringify = function (oObjTree, sNamespaceURI /* optional */, sQualifiedName /* optional */, oDocumentType /* optional */) {
              return this.xmlToString(
                this.jsToXml(oObjTree, sNamespaceURI, sQualifiedName, oDocumentType)
              );
            };

            this.each = function (arr, func, thisArg) {
              if (arr instanceof Array) {
                arr.forEach(func, thisArg);
              } else {
                [arr].forEach(func, thisArg);
              }
            };
          })();

        }

        ));

      }, { "xmldom": 3 }], 3: [function (require, module, exports) {

      }, {}]
    }, {}, [1])(1)
  });

  !function (e) {
    if ("object" == typeof exports && "undefined" != typeof module)
      module.exports = e();
    else if ("function" == typeof define && define.amd)
      define([], e);
    else {
      ("undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this).tokml = e()
    }
  }(function () {
    return function e(t, r, n) {
      function o(u, a) {
        if (!r[u]) {
          if (!t[u]) {
            var c = "function" == typeof require && require;
            if (!a && c)
              return c(u, !0);
            if (i)
              return i(u, !0);
            var s = new Error("Cannot find module '" + u + "'");
            throw s.code = "MODULE_NOT_FOUND",
            s
          }
          var l = r[u] = {
            exports: {}
          };
          t[u][0].call(l.exports, function (e) {
            var r = t[u][1][e];
            return o(r || e)
          }, l, l.exports, e, t, r, n)
        }
        return r[u].exports
      }
      for (var i = "function" == typeof require && require, u = 0; u < n.length; u++)
        o(n[u]);
      return o
    }({
      1: [function (e, t, r) {
        function n(e, t) {
          return function (r) {
            if (!r.properties || !j.valid(r.geometry))
              return "";
            var n = j.any(r.geometry);
            if (!n)
              return "";
            var o = ""
              , i = "";
            if (e.simplestyle) {
              var u = h(r.style);
              u && (j.isPoint(r.geometry) && m(r.style) ? (-1 === t.indexOf(u) && (o = d(r.style, u),
                t.push(u)),
                i = S("styleUrl", "#" + u)) : (j.isPolygon(r.geometry) || j.isLine(r.geometry)) && k(r.style) && (-1 === t.indexOf(u) && (o = v(r.style, u),
                  t.push(u)),
                  i = S("styleUrl", "#" + u)))
            }
            return o + S("Placemark", a(r.properties, e) + c(r.properties, e) + f(r.properties) + s(r.properties, e) + n + i)
          }
        }
        function o(e, t) {
          if (!e.type)
            return "";
          var r = [];
          switch (e.type) {
            case "FeatureCollection":
              return e.features ? e.features.map(n(t, r)).join("") : "";
            case "Feature":
              return n(t, r)(e);
            default:
              return n(t, r)({
                type: "Feature",
                geometry: e,
                properties: {}
              })
          }
        }
        function i(e) {
          return void 0 !== e.documentName ? S("name", e.documentName) : ""
        }
        function u(e) {
          return void 0 !== e.documentDescription ? S("description", e.documentDescription) : ""
        }
        function a(e, t) {
          return e[t.name] ? S("name", L(e[t.name])) : ""
        }
        function c(e, t) {
          return e[t.description] ? S("description", L(e[t.description])) : ""
        }
        function s(e, t) {
          return e[t.timestamp] ? S("TimeStamp", S("when", L(e[t.timestamp]))) : ""
        }
        function l(e) {
          return e.map(function (e) {
            return e.join(",")
          }).join(" ")
        }
        function f(e) {
          return S("ExtendedData", w(e).map(p).join(""))
        }
        function p(e) {
          return S("Data", S("value", L(e[1])), [["name", L(e[0])]])
        }
        function m(e) {
          return !!(e["marker-size"] || e["marker-symbol"] || e["marker-color"])
        }
        function d(e, t) {
          return S("Style", S("IconStyle", S("Icon", S("href", y(e)))) + g(e), [["id", t]])
        }
        function y(e) {
          var t = e["marker-size"] || "medium"
            , r = e["marker-symbol"] ? "-" + e["marker-symbol"] : ""
            , n = (e["marker-color"] || "7e7e7e").replace("#", "");
          return "https://api.tiles.mapbox.com/v3/marker/pin-" + t.charAt(0) + r + "+" + n + ".png"
        }
        function g(e) {
          return S("hotSpot", "", [["xunits", "fraction"], ["yunits", "fraction"], ["x", .5], ["y", .5]])
        }
        function k(e) {
          for (var t in e)
            if ({
              stroke: !0,
              "stroke-opacity": !0,
              "stroke-width": !0,
              fill: !0,
              "fill-opacity": !0
            }[t])
              return !0
        }
        function v(e, t) {
          var r = S("LineStyle", [S("color", x(e.stroke, e["stroke-opacity"]) || "ff555555") + S("width", void 0 === e["stroke-width"] ? 2 : e["stroke-width"])])
            , n = "";
          return (e.fill || e["fill-opacity"]) && (n = S("PolyStyle", [S("color", x(e.fill, e["fill-opacity"]) || "88555555")])),
            S("Style", r + n, [["id", t]])
        }
        function h(e) {
          var t = "";
          return e["marker-symbol"] && (t = t + "ms" + e["marker-symbol"]),
            e["marker-color"] && (t = t + "mc" + e["marker-color"].replace("#", "")),
            e["marker-size"] && (t = t + "ms" + e["marker-size"]),
            e.stroke && (t = t + "s" + e.stroke.replace("#", "")),
            e["stroke-width"] && (t = t + "sw" + e["stroke-width"].toString().replace(".", "")),
            e["stroke-opacity"] && (t = t + "mo" + e["stroke-opacity"].toString().replace(".", "")),
            e.fill && (t = t + "f" + e.fill.replace("#", "")),
            e["fill-opacity"] && (t = t + "fo" + e["fill-opacity"].toString().replace(".", "")),
            t
        }
        function x(e, t) {
          if ("string" != typeof e)
            return "";
          if (3 === (e = e.replace("#", "").toLowerCase()).length)
            e = e[0] + e[0] + e[1] + e[1] + e[2] + e[2];
          else if (6 !== e.length)
            return "";
          var r = e[0] + e[1]
            , n = e[2] + e[3]
            , o = e[4] + e[5]
            , i = "ff";
          return "number" == typeof t && t >= 0 && t <= 1 && ((i = (255 * t).toString(16)).indexOf(".") > -1 && (i = i.substr(0, i.indexOf("."))),
            i.length < 2 && (i = "0" + i)),
            i + o + n + r
        }
        function w(e) {
          var t = [];
          for (var r in e)
            t.push([r, e[r]]);
          return t
        }

        var P = e("strxml")
          , S = P.tag
          , L = P.encode;

        t.exports = function (e, t) {
          return t = t || {
            documentName: void 0,
            documentDescription: void 0,
            name: "name",
            description: "description",
            simplestyle: !1,
            timestamp: "timestamp"
          },
            '<?xml version="1.0" encoding="UTF-8"?>' + S("kml", S("Document", i(t) + u(t) + o(e, t)), [["xmlns", "http://www.opengis.net/kml/2.2"]])
        };

        var j = {
          Point: function (e) {
            return S("Point", S("coordinates", e.coordinates.join(",")))
          },
          LineString: function (e) {
            return S("LineString", S("coordinates", l(e.coordinates)))
          },
          Polygon: function (e) {
            if (!e.coordinates.length)
              return "";
            var t = e.coordinates[0]
              , r = e.coordinates.slice(1)
              , n = S("outerBoundaryIs", S("LinearRing", S("coordinates", l(t))))
              , o = r.map(function (e) {
                return S("innerBoundaryIs", S("LinearRing", S("coordinates", l(e))))
              }).join("");
            return S("Polygon", n + o)
          },
          MultiPoint: function (e) {
            return e.coordinates.length ? S("MultiGeometry", e.coordinates.map(function (e) {
              return j.Point({
                coordinates: e
              })
            }).join("")) : ""
          },
          MultiPolygon: function (e) {
            return e.coordinates.length ? S("MultiGeometry", e.coordinates.map(function (e) {
              return j.Polygon({
                coordinates: e
              })
            }).join("")) : ""
          },
          MultiLineString: function (e) {
            return e.coordinates.length ? S("MultiGeometry", e.coordinates.map(function (e) {
              return j.LineString({
                coordinates: e
              })
            }).join("")) : ""
          },
          GeometryCollection: function (e) {
            return S("MultiGeometry", e.geometries.map(j.any).join(""))
          },
          valid: function (e) {
            return e && e.type && (e.coordinates || "GeometryCollection" === e.type && e.geometries && e.geometries.every(j.valid))
          },
          any: function (e) {
            return j[e.type] ? j[e.type](e) : ""
          },
          isPoint: function (e) {
            return "Point" === e.type || "MultiPoint" === e.type
          },
          isPolygon: function (e) {
            return "Polygon" === e.type || "MultiPolygon" === e.type
          },
          isLine: function (e) {
            return "LineString" === e.type || "MultiLineString" === e.type
          }
        }
      }, { strxml: 2 }],
      2: [function (e, t, r) {
          function n(e) {
            return e && e.length ? " " + e.map(function (e) {
              return e[0] + '="' + e[1] + '"'
            }).join(" ") : ""
          }
          t.exports.attr = n,
          t.exports.tagClose = function (e, t) {
            return "<" + e + n(t) + "/>"
          },
          t.exports.tag = function (e, t, r) {
            return "<" + e + n(r) + ">" + t + "</" + e + ">"
          },
          t.exports.encode = function (e) {
            return (null === e ? "" : e.toString()).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")
          }
      }, {}]
    }, {}, [1])(1)
  });


  omnivore.toGPX = window.togpx;
  omnivore.toKML = window.tokml;

  return omnivore;
})(window.omnivore);

export { Omnivore as default }