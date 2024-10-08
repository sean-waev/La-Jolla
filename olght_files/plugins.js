/* Popper.js */
(function (e, t) {
  "object" == typeof exports && "undefined" != typeof module
    ? (module.exports = t())
    : "function" == typeof define && define.amd
    ? define(t)
    : (e.Popper = t());
})(this, function () {
  "use strict";
  function e(e) {
    return e && "[object Function]" === {}.toString.call(e);
  }
  function t(e, t) {
    if (1 !== e.nodeType) return [];
    var o = getComputedStyle(e, null);
    return t ? o[t] : o;
  }
  function o(e) {
    return "HTML" === e.nodeName ? e : e.parentNode || e.host;
  }
  function n(e) {
    if (!e) return document.body;
    switch (e.nodeName) {
      case "HTML":
      case "BODY":
        return e.ownerDocument.body;
      case "#document":
        return e.body;
    }
    var i = t(e),
      r = i.overflow,
      p = i.overflowX,
      s = i.overflowY;
    return /(auto|scroll)/.test(r + s + p) ? e : n(o(e));
  }
  function r(e) {
    var o = e && e.offsetParent,
      i = o && o.nodeName;
    return i && "BODY" !== i && "HTML" !== i
      ? -1 !== ["TD", "TABLE"].indexOf(o.nodeName) &&
        "static" === t(o, "position")
        ? r(o)
        : o
      : e
      ? e.ownerDocument.documentElement
      : document.documentElement;
  }
  function p(e) {
    var t = e.nodeName;
    return "BODY" !== t && ("HTML" === t || r(e.firstElementChild) === e);
  }
  function s(e) {
    return null === e.parentNode ? e : s(e.parentNode);
  }
  function d(e, t) {
    if (!e || !e.nodeType || !t || !t.nodeType) return document.documentElement;
    var o = e.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_FOLLOWING,
      i = o ? e : t,
      n = o ? t : e,
      a = document.createRange();
    a.setStart(i, 0), a.setEnd(n, 0);
    var l = a.commonAncestorContainer;
    if ((e !== l && t !== l) || i.contains(n)) return p(l) ? l : r(l);
    var f = s(e);
    return f.host ? d(f.host, t) : d(e, s(t).host);
  }
  function a(e) {
    var t =
        1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "top",
      o = "top" === t ? "scrollTop" : "scrollLeft",
      i = e.nodeName;
    if ("BODY" === i || "HTML" === i) {
      var n = e.ownerDocument.documentElement,
        r = e.ownerDocument.scrollingElement || n;
      return r[o];
    }
    return e[o];
  }
  function l(e, t) {
    var o = 2 < arguments.length && void 0 !== arguments[2] && arguments[2],
      i = a(t, "top"),
      n = a(t, "left"),
      r = o ? -1 : 1;
    return (
      (e.top += i * r),
      (e.bottom += i * r),
      (e.left += n * r),
      (e.right += n * r),
      e
    );
  }
  function f(e, t) {
    var o = "x" === t ? "Left" : "Top",
      i = "Left" == o ? "Right" : "Bottom";
    return (
      parseFloat(e["border" + o + "Width"], 10) +
      parseFloat(e["border" + i + "Width"], 10)
    );
  }
  function m(e, t, o, i) {
    return J(
      t["offset" + e],
      t["scroll" + e],
      o["client" + e],
      o["offset" + e],
      o["scroll" + e],
      ie()
        ? o["offset" + e] +
            i["margin" + ("Height" === e ? "Top" : "Left")] +
            i["margin" + ("Height" === e ? "Bottom" : "Right")]
        : 0
    );
  }
  function h() {
    var e = document.body,
      t = document.documentElement,
      o = ie() && getComputedStyle(t);
    return { height: m("Height", e, t, o), width: m("Width", e, t, o) };
  }
  function c(e) {
    return se({}, e, { right: e.left + e.width, bottom: e.top + e.height });
  }
  function g(e) {
    var o = {};
    if (ie())
      try {
        o = e.getBoundingClientRect();
        var i = a(e, "top"),
          n = a(e, "left");
        (o.top += i), (o.left += n), (o.bottom += i), (o.right += n);
      } catch (e) {}
    else o = e.getBoundingClientRect();
    var r = {
        left: o.left,
        top: o.top,
        width: o.right - o.left,
        height: o.bottom - o.top,
      },
      p = "HTML" === e.nodeName ? h() : {},
      s = p.width || e.clientWidth || r.right - r.left,
      d = p.height || e.clientHeight || r.bottom - r.top,
      l = e.offsetWidth - s,
      m = e.offsetHeight - d;
    if (l || m) {
      var g = t(e);
      (l -= f(g, "x")), (m -= f(g, "y")), (r.width -= l), (r.height -= m);
    }
    return c(r);
  }
  function u(e, o) {
    var i = ie(),
      r = "HTML" === o.nodeName,
      p = g(e),
      s = g(o),
      d = n(e),
      a = t(o),
      f = parseFloat(a.borderTopWidth, 10),
      m = parseFloat(a.borderLeftWidth, 10),
      h = c({
        top: p.top - s.top - f,
        left: p.left - s.left - m,
        width: p.width,
        height: p.height,
      });
    if (((h.marginTop = 0), (h.marginLeft = 0), !i && r)) {
      var u = parseFloat(a.marginTop, 10),
        b = parseFloat(a.marginLeft, 10);
      (h.top -= f - u),
        (h.bottom -= f - u),
        (h.left -= m - b),
        (h.right -= m - b),
        (h.marginTop = u),
        (h.marginLeft = b);
    }
    return (
      (i ? o.contains(d) : o === d && "BODY" !== d.nodeName) && (h = l(h, o)), h
    );
  }
  function b(e) {
    var t = e.ownerDocument.documentElement,
      o = u(e, t),
      i = J(t.clientWidth, window.innerWidth || 0),
      n = J(t.clientHeight, window.innerHeight || 0),
      r = a(t),
      p = a(t, "left"),
      s = {
        top: r - o.top + o.marginTop,
        left: p - o.left + o.marginLeft,
        width: i,
        height: n,
      };
    return c(s);
  }
  function w(e) {
    var i = e.nodeName;
    return "BODY" === i || "HTML" === i
      ? !1
      : "fixed" === t(e, "position") || w(o(e));
  }
  function y(e, t, i, r) {
    var p = { top: 0, left: 0 },
      s = d(e, t);
    if ("viewport" === r) p = b(s);
    else {
      var a;
      "scrollParent" === r
        ? ((a = n(o(t))),
          "BODY" === a.nodeName && (a = e.ownerDocument.documentElement))
        : "window" === r
        ? (a = e.ownerDocument.documentElement)
        : (a = r);
      var l = u(a, s);
      if ("HTML" === a.nodeName && !w(s)) {
        var f = h(),
          m = f.height,
          c = f.width;
        (p.top += l.top - l.marginTop),
          (p.bottom = m + l.top),
          (p.left += l.left - l.marginLeft),
          (p.right = c + l.left);
      } else p = l;
    }
    return (p.left += i), (p.top += i), (p.right -= i), (p.bottom -= i), p;
  }
  function E(e) {
    var t = e.width,
      o = e.height;
    return t * o;
  }
  function v(e, t, o, i, n) {
    var r = 5 < arguments.length && void 0 !== arguments[5] ? arguments[5] : 0;
    if (-1 === e.indexOf("auto")) return e;
    var p = y(o, i, r, n),
      s = {
        top: { width: p.width, height: t.top - p.top },
        right: { width: p.right - t.right, height: p.height },
        bottom: { width: p.width, height: p.bottom - t.bottom },
        left: { width: t.left - p.left, height: p.height },
      },
      d = Object.keys(s)
        .map(function (e) {
          return se({ key: e }, s[e], { area: E(s[e]) });
        })
        .sort(function (e, t) {
          return t.area - e.area;
        }),
      a = d.filter(function (e) {
        var t = e.width,
          i = e.height;
        return t >= o.clientWidth && i >= o.clientHeight;
      }),
      l = 0 < a.length ? a[0].key : d[0].key,
      f = e.split("-")[1];
    return l + (f ? "-" + f : "");
  }
  function O(e, t, o) {
    var i = d(t, o);
    return u(o, i);
  }
  function L(e) {
    var t = getComputedStyle(e),
      o = parseFloat(t.marginTop) + parseFloat(t.marginBottom),
      i = parseFloat(t.marginLeft) + parseFloat(t.marginRight),
      n = { width: e.offsetWidth + i, height: e.offsetHeight + o };
    return n;
  }
  function x(e) {
    var t = { left: "right", right: "left", bottom: "top", top: "bottom" };
    return e.replace(/left|right|bottom|top/g, function (e) {
      return t[e];
    });
  }
  function S(e, t, o) {
    o = o.split("-")[0];
    var i = L(e),
      n = { width: i.width, height: i.height },
      r = -1 !== ["right", "left"].indexOf(o),
      p = r ? "top" : "left",
      s = r ? "left" : "top",
      d = r ? "height" : "width",
      a = r ? "width" : "height";
    return (
      (n[p] = t[p] + t[d] / 2 - i[d] / 2),
      (n[s] = o === s ? t[s] - i[a] : t[x(s)]),
      n
    );
  }
  function T(e, t) {
    return Array.prototype.find ? e.find(t) : e.filter(t)[0];
  }
  function D(e, t, o) {
    if (Array.prototype.findIndex)
      return e.findIndex(function (e) {
        return e[t] === o;
      });
    var i = T(e, function (e) {
      return e[t] === o;
    });
    return e.indexOf(i);
  }
  function C(t, o, i) {
    var n = void 0 === i ? t : t.slice(0, D(t, "name", i));
    return (
      n.forEach(function (t) {
        t["function"] &&
          console.warn("`modifier.function` is deprecated, use `modifier.fn`!");
        var i = t["function"] || t.fn;
        t.enabled &&
          e(i) &&
          ((o.offsets.popper = c(o.offsets.popper)),
          (o.offsets.reference = c(o.offsets.reference)),
          (o = i(o, t)));
      }),
      o
    );
  }
  function N() {
    if (!this.state.isDestroyed) {
      var e = {
        instance: this,
        styles: {},
        arrowStyles: {},
        attributes: {},
        flipped: !1,
        offsets: {},
      };
      (e.offsets.reference = O(this.state, this.popper, this.reference)),
        (e.placement = v(
          this.options.placement,
          e.offsets.reference,
          this.popper,
          this.reference,
          this.options.modifiers.flip.boundariesElement,
          this.options.modifiers.flip.padding
        )),
        (e.originalPlacement = e.placement),
        (e.offsets.popper = S(this.popper, e.offsets.reference, e.placement)),
        (e.offsets.popper.position = "absolute"),
        (e = C(this.modifiers, e)),
        this.state.isCreated
          ? this.options.onUpdate(e)
          : ((this.state.isCreated = !0), this.options.onCreate(e));
    }
  }
  function k(e, t) {
    return e.some(function (e) {
      var o = e.name,
        i = e.enabled;
      return i && o === t;
    });
  }
  function W(e) {
    for (
      var t = [!1, "ms", "Webkit", "Moz", "O"],
        o = e.charAt(0).toUpperCase() + e.slice(1),
        n = 0;
      n < t.length - 1;
      n++
    ) {
      var i = t[n],
        r = i ? "" + i + o : e;
      if ("undefined" != typeof document.body.style[r]) return r;
    }
    return null;
  }
  function P() {
    return (
      (this.state.isDestroyed = !0),
      k(this.modifiers, "applyStyle") &&
        (this.popper.removeAttribute("x-placement"),
        (this.popper.style.left = ""),
        (this.popper.style.position = ""),
        (this.popper.style.top = ""),
        (this.popper.style[W("transform")] = "")),
      this.disableEventListeners(),
      this.options.removeOnDestroy &&
        this.popper.parentNode.removeChild(this.popper),
      this
    );
  }
  function B(e) {
    var t = e.ownerDocument;
    return t ? t.defaultView : window;
  }
  function H(e, t, o, i) {
    var r = "BODY" === e.nodeName,
      p = r ? e.ownerDocument.defaultView : e;
    p.addEventListener(t, o, { passive: !0 }),
      r || H(n(p.parentNode), t, o, i),
      i.push(p);
  }
  function A(e, t, o, i) {
    (o.updateBound = i),
      B(e).addEventListener("resize", o.updateBound, { passive: !0 });
    var r = n(e);
    return (
      H(r, "scroll", o.updateBound, o.scrollParents),
      (o.scrollElement = r),
      (o.eventsEnabled = !0),
      o
    );
  }
  function I() {
    this.state.eventsEnabled ||
      (this.state = A(
        this.reference,
        this.options,
        this.state,
        this.scheduleUpdate
      ));
  }
  function M(e, t) {
    return (
      B(e).removeEventListener("resize", t.updateBound),
      t.scrollParents.forEach(function (e) {
        e.removeEventListener("scroll", t.updateBound);
      }),
      (t.updateBound = null),
      (t.scrollParents = []),
      (t.scrollElement = null),
      (t.eventsEnabled = !1),
      t
    );
  }
  function R() {
    this.state.eventsEnabled &&
      (cancelAnimationFrame(this.scheduleUpdate),
      (this.state = M(this.reference, this.state)));
  }
  function U(e) {
    return "" !== e && !isNaN(parseFloat(e)) && isFinite(e);
  }
  function Y(e, t) {
    Object.keys(t).forEach(function (o) {
      var i = "";
      -1 !== ["width", "height", "top", "right", "bottom", "left"].indexOf(o) &&
        U(t[o]) &&
        (i = "px"),
        (e.style[o] = t[o] + i);
    });
  }
  function j(e, t) {
    Object.keys(t).forEach(function (o) {
      var i = t[o];
      !1 === i ? e.removeAttribute(o) : e.setAttribute(o, t[o]);
    });
  }
  function F(e, t, o) {
    var i = T(e, function (e) {
        var o = e.name;
        return o === t;
      }),
      n =
        !!i &&
        e.some(function (e) {
          return e.name === o && e.enabled && e.order < i.order;
        });
    if (!n) {
      var r = "`" + t + "`";
      console.warn(
        "`" +
          o +
          "`" +
          " modifier is required by " +
          r +
          " modifier in order to work, be sure to include it before " +
          r +
          "!"
      );
    }
    return n;
  }
  function K(e) {
    return "end" === e ? "start" : "start" === e ? "end" : e;
  }
  function q(e) {
    var t = 1 < arguments.length && void 0 !== arguments[1] && arguments[1],
      o = ae.indexOf(e),
      i = ae.slice(o + 1).concat(ae.slice(0, o));
    return t ? i.reverse() : i;
  }
  function V(e, t, o, i) {
    var n = e.match(/((?:\-|\+)?\d*\.?\d*)(.*)/),
      r = +n[1],
      p = n[2];
    if (!r) return e;
    if (0 === p.indexOf("%")) {
      var s;
      switch (p) {
        case "%p":
          s = o;
          break;
        case "%":
        case "%r":
        default:
          s = i;
      }
      var d = c(s);
      return (d[t] / 100) * r;
    }
    if ("vh" === p || "vw" === p) {
      var a;
      return (
        (a =
          "vh" === p
            ? J(document.documentElement.clientHeight, window.innerHeight || 0)
            : J(document.documentElement.clientWidth, window.innerWidth || 0)),
        (a / 100) * r
      );
    }
    return r;
  }
  function z(e, t, o, i) {
    var n = [0, 0],
      r = -1 !== ["right", "left"].indexOf(i),
      p = e.split(/(\+|\-)/).map(function (e) {
        return e.trim();
      }),
      s = p.indexOf(
        T(p, function (e) {
          return -1 !== e.search(/,|\s/);
        })
      );
    p[s] &&
      -1 === p[s].indexOf(",") &&
      console.warn(
        "Offsets separated by white space(s) are deprecated, use a comma (,) instead."
      );
    var d = /\s*,\s*|\s+/,
      a =
        -1 === s
          ? [p]
          : [
              p.slice(0, s).concat([p[s].split(d)[0]]),
              [p[s].split(d)[1]].concat(p.slice(s + 1)),
            ];
    return (
      (a = a.map(function (e, i) {
        var n = (1 === i ? !r : r) ? "height" : "width",
          p = !1;
        return e
          .reduce(function (e, t) {
            return "" === e[e.length - 1] && -1 !== ["+", "-"].indexOf(t)
              ? ((e[e.length - 1] = t), (p = !0), e)
              : p
              ? ((e[e.length - 1] += t), (p = !1), e)
              : e.concat(t);
          }, [])
          .map(function (e) {
            return V(e, n, t, o);
          });
      })),
      a.forEach(function (e, t) {
        e.forEach(function (o, i) {
          U(o) && (n[t] += o * ("-" === e[i - 1] ? -1 : 1));
        });
      }),
      n
    );
  }
  function G(e, t) {
    var o,
      i = t.offset,
      n = e.placement,
      r = e.offsets,
      p = r.popper,
      s = r.reference,
      d = n.split("-")[0];
    return (
      (o = U(+i) ? [+i, 0] : z(i, p, s, d)),
      "left" === d
        ? ((p.top += o[0]), (p.left -= o[1]))
        : "right" === d
        ? ((p.top += o[0]), (p.left += o[1]))
        : "top" === d
        ? ((p.left += o[0]), (p.top -= o[1]))
        : "bottom" === d && ((p.left += o[0]), (p.top += o[1])),
      (e.popper = p),
      e
    );
  }
  for (
    var _ = Math.min,
      X = Math.floor,
      J = Math.max,
      Q = "undefined" != typeof window && "undefined" != typeof document,
      Z = ["Edge", "Trident", "Firefox"],
      $ = 0,
      ee = 0;
    ee < Z.length;
    ee += 1
  )
    if (Q && 0 <= navigator.userAgent.indexOf(Z[ee])) {
      $ = 1;
      break;
    }
  var i,
    te = Q && window.Promise,
    oe = te
      ? function (e) {
          var t = !1;
          return function () {
            t ||
              ((t = !0),
              window.Promise.resolve().then(function () {
                (t = !1), e();
              }));
          };
        }
      : function (e) {
          var t = !1;
          return function () {
            t ||
              ((t = !0),
              setTimeout(function () {
                (t = !1), e();
              }, $));
          };
        },
    ie = function () {
      return (
        void 0 == i && (i = -1 !== navigator.appVersion.indexOf("MSIE 10")), i
      );
    },
    ne = function (e, t) {
      if (!(e instanceof t))
        throw new TypeError("Cannot call a class as a function");
    },
    re = (function () {
      function e(e, t) {
        for (var o, n = 0; n < t.length; n++)
          (o = t[n]),
            (o.enumerable = o.enumerable || !1),
            (o.configurable = !0),
            "value" in o && (o.writable = !0),
            Object.defineProperty(e, o.key, o);
      }
      return function (t, o, i) {
        return o && e(t.prototype, o), i && e(t, i), t;
      };
    })(),
    pe = function (e, t, o) {
      return (
        t in e
          ? Object.defineProperty(e, t, {
              value: o,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            })
          : (e[t] = o),
        e
      );
    },
    se =
      Object.assign ||
      function (e) {
        for (var t, o = 1; o < arguments.length; o++)
          for (var i in ((t = arguments[o]), t))
            Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
        return e;
      },
    de = [
      "auto-start",
      "auto",
      "auto-end",
      "top-start",
      "top",
      "top-end",
      "right-start",
      "right",
      "right-end",
      "bottom-end",
      "bottom",
      "bottom-start",
      "left-end",
      "left",
      "left-start",
    ],
    ae = de.slice(3),
    le = {
      FLIP: "flip",
      CLOCKWISE: "clockwise",
      COUNTERCLOCKWISE: "counterclockwise",
    },
    fe = (function () {
      function t(o, i) {
        var n = this,
          r =
            2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {};
        ne(this, t),
          (this.scheduleUpdate = function () {
            return requestAnimationFrame(n.update);
          }),
          (this.update = oe(this.update.bind(this))),
          (this.options = se({}, t.Defaults, r)),
          (this.state = { isDestroyed: !1, isCreated: !1, scrollParents: [] }),
          (this.reference = o && o.jquery ? o[0] : o),
          (this.popper = i && i.jquery ? i[0] : i),
          (this.options.modifiers = {}),
          Object.keys(se({}, t.Defaults.modifiers, r.modifiers)).forEach(
            function (e) {
              n.options.modifiers[e] = se(
                {},
                t.Defaults.modifiers[e] || {},
                r.modifiers ? r.modifiers[e] : {}
              );
            }
          ),
          (this.modifiers = Object.keys(this.options.modifiers)
            .map(function (e) {
              return se({ name: e }, n.options.modifiers[e]);
            })
            .sort(function (e, t) {
              return e.order - t.order;
            })),
          this.modifiers.forEach(function (t) {
            t.enabled &&
              e(t.onLoad) &&
              t.onLoad(n.reference, n.popper, n.options, t, n.state);
          }),
          this.update();
        var p = this.options.eventsEnabled;
        p && this.enableEventListeners(), (this.state.eventsEnabled = p);
      }
      return (
        re(t, [
          {
            key: "update",
            value: function () {
              return N.call(this);
            },
          },
          {
            key: "destroy",
            value: function () {
              return P.call(this);
            },
          },
          {
            key: "enableEventListeners",
            value: function () {
              return I.call(this);
            },
          },
          {
            key: "disableEventListeners",
            value: function () {
              return R.call(this);
            },
          },
        ]),
        t
      );
    })();
  return (
    (fe.Utils = ("undefined" == typeof window ? global : window).PopperUtils),
    (fe.placements = de),
    (fe.Defaults = {
      placement: "bottom",
      eventsEnabled: !0,
      removeOnDestroy: !1,
      onCreate: function () {},
      onUpdate: function () {},
      modifiers: {
        shift: {
          order: 100,
          enabled: !0,
          fn: function (e) {
            var t = e.placement,
              o = t.split("-")[0],
              i = t.split("-")[1];
            if (i) {
              var n = e.offsets,
                r = n.reference,
                p = n.popper,
                s = -1 !== ["bottom", "top"].indexOf(o),
                d = s ? "left" : "top",
                a = s ? "width" : "height",
                l = {
                  start: pe({}, d, r[d]),
                  end: pe({}, d, r[d] + r[a] - p[a]),
                };
              e.offsets.popper = se({}, p, l[i]);
            }
            return e;
          },
        },
        offset: { order: 200, enabled: !0, fn: G, offset: 0 },
        preventOverflow: {
          order: 300,
          enabled: !0,
          fn: function (e, t) {
            var o = t.boundariesElement || r(e.instance.popper);
            e.instance.reference === o && (o = r(o));
            var i = y(e.instance.popper, e.instance.reference, t.padding, o);
            t.boundaries = i;
            var n = t.priority,
              p = e.offsets.popper,
              s = {
                primary: function (e) {
                  var o = p[e];
                  return (
                    p[e] < i[e] &&
                      !t.escapeWithReference &&
                      (o = J(p[e], i[e])),
                    pe({}, e, o)
                  );
                },
                secondary: function (e) {
                  var o = "right" === e ? "left" : "top",
                    n = p[o];
                  return (
                    p[e] > i[e] &&
                      !t.escapeWithReference &&
                      (n = _(
                        p[o],
                        i[e] - ("right" === e ? p.width : p.height)
                      )),
                    pe({}, o, n)
                  );
                },
              };
            return (
              n.forEach(function (e) {
                var t =
                  -1 === ["left", "top"].indexOf(e) ? "secondary" : "primary";
                p = se({}, p, s[t](e));
              }),
              (e.offsets.popper = p),
              e
            );
          },
          priority: ["left", "right", "top", "bottom"],
          padding: 5,
          boundariesElement: "scrollParent",
        },
        keepTogether: {
          order: 400,
          enabled: !0,
          fn: function (e) {
            var t = e.offsets,
              o = t.popper,
              i = t.reference,
              n = e.placement.split("-")[0],
              r = X,
              p = -1 !== ["top", "bottom"].indexOf(n),
              s = p ? "right" : "bottom",
              d = p ? "left" : "top",
              a = p ? "width" : "height";
            return (
              o[s] < r(i[d]) && (e.offsets.popper[d] = r(i[d]) - o[a]),
              o[d] > r(i[s]) && (e.offsets.popper[d] = r(i[s])),
              e
            );
          },
        },
        arrow: {
          order: 500,
          enabled: !0,
          fn: function (e, o) {
            var i;
            if (!F(e.instance.modifiers, "arrow", "keepTogether")) return e;
            var n = o.element;
            if ("string" == typeof n) {
              if (((n = e.instance.popper.querySelector(n)), !n)) return e;
            } else if (!e.instance.popper.contains(n))
              return (
                console.warn(
                  "WARNING: `arrow.element` must be child of its popper element!"
                ),
                e
              );
            var r = e.placement.split("-")[0],
              p = e.offsets,
              s = p.popper,
              d = p.reference,
              a = -1 !== ["left", "right"].indexOf(r),
              l = a ? "height" : "width",
              f = a ? "Top" : "Left",
              m = f.toLowerCase(),
              h = a ? "left" : "top",
              g = a ? "bottom" : "right",
              u = L(n)[l];
            d[g] - u < s[m] && (e.offsets.popper[m] -= s[m] - (d[g] - u)),
              d[m] + u > s[g] && (e.offsets.popper[m] += d[m] + u - s[g]),
              (e.offsets.popper = c(e.offsets.popper));
            var b = d[m] + d[l] / 2 - u / 2,
              w = t(e.instance.popper),
              y = parseFloat(w["margin" + f], 10),
              E = parseFloat(w["border" + f + "Width"], 10),
              v = b - e.offsets.popper[m] - y - E;
            return (
              (v = J(_(s[l] - u, v), 0)),
              (e.arrowElement = n),
              (e.offsets.arrow =
                ((i = {}), pe(i, m, Math.round(v)), pe(i, h, ""), i)),
              e
            );
          },
          element: "[x-arrow]",
        },
        flip: {
          order: 600,
          enabled: !0,
          fn: function (e, t) {
            if (k(e.instance.modifiers, "inner")) return e;
            if (e.flipped && e.placement === e.originalPlacement) return e;
            var o = y(
                e.instance.popper,
                e.instance.reference,
                t.padding,
                t.boundariesElement
              ),
              i = e.placement.split("-")[0],
              n = x(i),
              r = e.placement.split("-")[1] || "",
              p = [];
            switch (t.behavior) {
              case le.FLIP:
                p = [i, n];
                break;
              case le.CLOCKWISE:
                p = q(i);
                break;
              case le.COUNTERCLOCKWISE:
                p = q(i, !0);
                break;
              default:
                p = t.behavior;
            }
            return (
              p.forEach(function (s, d) {
                if (i !== s || p.length === d + 1) return e;
                (i = e.placement.split("-")[0]), (n = x(i));
                var a = e.offsets.popper,
                  l = e.offsets.reference,
                  f = X,
                  m =
                    ("left" === i && f(a.right) > f(l.left)) ||
                    ("right" === i && f(a.left) < f(l.right)) ||
                    ("top" === i && f(a.bottom) > f(l.top)) ||
                    ("bottom" === i && f(a.top) < f(l.bottom)),
                  h = f(a.left) < f(o.left),
                  c = f(a.right) > f(o.right),
                  g = f(a.top) < f(o.top),
                  u = f(a.bottom) > f(o.bottom),
                  b =
                    ("left" === i && h) ||
                    ("right" === i && c) ||
                    ("top" === i && g) ||
                    ("bottom" === i && u),
                  w = -1 !== ["top", "bottom"].indexOf(i),
                  y =
                    !!t.flipVariations &&
                    ((w && "start" === r && h) ||
                      (w && "end" === r && c) ||
                      (!w && "start" === r && g) ||
                      (!w && "end" === r && u));
                (m || b || y) &&
                  ((e.flipped = !0),
                  (m || b) && (i = p[d + 1]),
                  y && (r = K(r)),
                  (e.placement = i + (r ? "-" + r : "")),
                  (e.offsets.popper = se(
                    {},
                    e.offsets.popper,
                    S(e.instance.popper, e.offsets.reference, e.placement)
                  )),
                  (e = C(e.instance.modifiers, e, "flip")));
              }),
              e
            );
          },
          behavior: "flip",
          padding: 5,
          boundariesElement: "viewport",
        },
        inner: {
          order: 700,
          enabled: !1,
          fn: function (e) {
            var t = e.placement,
              o = t.split("-")[0],
              i = e.offsets,
              n = i.popper,
              r = i.reference,
              p = -1 !== ["left", "right"].indexOf(o),
              s = -1 === ["top", "left"].indexOf(o);
            return (
              (n[p ? "left" : "top"] =
                r[o] - (s ? n[p ? "width" : "height"] : 0)),
              (e.placement = x(t)),
              (e.offsets.popper = c(n)),
              e
            );
          },
        },
        hide: {
          order: 800,
          enabled: !0,
          fn: function (e) {
            if (!F(e.instance.modifiers, "hide", "preventOverflow")) return e;
            var t = e.offsets.reference,
              o = T(e.instance.modifiers, function (e) {
                return "preventOverflow" === e.name;
              }).boundaries;
            if (
              t.bottom < o.top ||
              t.left > o.right ||
              t.top > o.bottom ||
              t.right < o.left
            ) {
              if (!0 === e.hide) return e;
              (e.hide = !0), (e.attributes["x-out-of-boundaries"] = "");
            } else {
              if (!1 === e.hide) return e;
              (e.hide = !1), (e.attributes["x-out-of-boundaries"] = !1);
            }
            return e;
          },
        },
        computeStyle: {
          order: 850,
          enabled: !0,
          fn: function (e, t) {
            var o = t.x,
              i = t.y,
              n = e.offsets.popper,
              p = T(e.instance.modifiers, function (e) {
                return "applyStyle" === e.name;
              }).gpuAcceleration;
            void 0 !== p &&
              console.warn(
                "WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!"
              );
            var s,
              d,
              a = void 0 === p ? t.gpuAcceleration : p,
              l = r(e.instance.popper),
              f = g(l),
              m = { position: n.position },
              h = {
                left: X(n.left),
                top: X(n.top),
                bottom: X(n.bottom),
                right: X(n.right),
              },
              c = "bottom" === o ? "top" : "bottom",
              u = "right" === i ? "left" : "right",
              b = W("transform");
            if (
              ((d = "bottom" == c ? -f.height + h.bottom : h.top),
              (s = "right" == u ? -f.width + h.right : h.left),
              a && b)
            )
              (m[b] = "translate3d(" + s + "px, " + d + "px, 0)"),
                (m[c] = 0),
                (m[u] = 0),
                (m.willChange = "transform");
            else {
              var w = "bottom" == c ? -1 : 1,
                y = "right" == u ? -1 : 1;
              (m[c] = d * w), (m[u] = s * y), (m.willChange = c + ", " + u);
            }
            var E = { "x-placement": e.placement };
            return (
              (e.attributes = se({}, E, e.attributes)),
              (e.styles = se({}, m, e.styles)),
              (e.arrowStyles = se({}, e.offsets.arrow, e.arrowStyles)),
              e
            );
          },
          gpuAcceleration: !0,
          x: "bottom",
          y: "right",
        },
        applyStyle: {
          order: 900,
          enabled: !0,
          fn: function (e) {
            return (
              Y(e.instance.popper, e.styles),
              j(e.instance.popper, e.attributes),
              e.arrowElement &&
                Object.keys(e.arrowStyles).length &&
                Y(e.arrowElement, e.arrowStyles),
              e
            );
          },
          onLoad: function (e, t, o, i, n) {
            var r = O(n, t, e),
              p = v(
                o.placement,
                r,
                t,
                e,
                o.modifiers.flip.boundariesElement,
                o.modifiers.flip.padding
              );
            return (
              t.setAttribute("x-placement", p),
              Y(t, { position: "absolute" }),
              o
            );
          },
          gpuAcceleration: void 0,
        },
      },
    }),
    fe
  );
});
/** Bootstrap v4.4.1*/
!(function (t, e) {
  "object" == typeof exports && "undefined" != typeof module
    ? e(exports, require("jquery"), require("popper.js"))
    : "function" == typeof define && define.amd
    ? define(["exports", "jquery", "popper.js"], e)
    : e(((t = t || self).bootstrap = {}), t.jQuery, t.Popper);
})(this, function (t, g, u) {
  "use strict";
  function i(t, e) {
    for (var n = 0; n < e.length; n++) {
      var i = e[n];
      (i.enumerable = i.enumerable || !1),
        (i.configurable = !0),
        "value" in i && (i.writable = !0),
        Object.defineProperty(t, i.key, i);
    }
  }
  function s(t, e, n) {
    return e && i(t.prototype, e), n && i(t, n), t;
  }
  function e(e, t) {
    var n = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var i = Object.getOwnPropertySymbols(e);
      t &&
        (i = i.filter(function (t) {
          return Object.getOwnPropertyDescriptor(e, t).enumerable;
        })),
        n.push.apply(n, i);
    }
    return n;
  }
  function l(o) {
    for (var t = 1; t < arguments.length; t++) {
      var r = null != arguments[t] ? arguments[t] : {};
      t % 2
        ? e(Object(r), !0).forEach(function (t) {
            var e, n, i;
            (e = o),
              (i = r[(n = t)]),
              n in e
                ? Object.defineProperty(e, n, {
                    value: i,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                  })
                : (e[n] = i);
          })
        : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(o, Object.getOwnPropertyDescriptors(r))
        : e(Object(r)).forEach(function (t) {
            Object.defineProperty(o, t, Object.getOwnPropertyDescriptor(r, t));
          });
    }
    return o;
  }
  (g = g && g.hasOwnProperty("default") ? g.default : g),
    (u = u && u.hasOwnProperty("default") ? u.default : u);
  var n = "transitionend";
  function o(t) {
    var e = this,
      n = !1;
    return (
      g(this).one(_.TRANSITION_END, function () {
        n = !0;
      }),
      setTimeout(function () {
        n || _.triggerTransitionEnd(e);
      }, t),
      this
    );
  }
  var _ = {
    TRANSITION_END: "bsTransitionEnd",
    getUID: function (t) {
      for (; (t += ~~(1e6 * Math.random())), document.getElementById(t); );
      return t;
    },
    getSelectorFromElement: function (t) {
      var e = t.getAttribute("data-target");
      if (!e || "#" === e) {
        var n = t.getAttribute("href");
        e = n && "#" !== n ? n.trim() : "";
      }
      try {
        return document.querySelector(e) ? e : null;
      } catch (t) {
        return null;
      }
    },
    getTransitionDurationFromElement: function (t) {
      if (!t) return 0;
      var e = g(t).css("transition-duration"),
        n = g(t).css("transition-delay"),
        i = parseFloat(e),
        o = parseFloat(n);
      return i || o
        ? ((e = e.split(",")[0]),
          (n = n.split(",")[0]),
          1e3 * (parseFloat(e) + parseFloat(n)))
        : 0;
    },
    reflow: function (t) {
      return t.offsetHeight;
    },
    triggerTransitionEnd: function (t) {
      g(t).trigger(n);
    },
    supportsTransitionEnd: function () {
      return Boolean(n);
    },
    isElement: function (t) {
      return (t[0] || t).nodeType;
    },
    typeCheckConfig: function (t, e, n) {
      for (var i in n)
        if (Object.prototype.hasOwnProperty.call(n, i)) {
          var o = n[i],
            r = e[i],
            s =
              r && _.isElement(r)
                ? "element"
                : ((a = r),
                  {}.toString
                    .call(a)
                    .match(/\s([a-z]+)/i)[1]
                    .toLowerCase());
          if (!new RegExp(o).test(s))
            throw new Error(
              t.toUpperCase() +
                ': Option "' +
                i +
                '" provided type "' +
                s +
                '" but expected type "' +
                o +
                '".'
            );
        }
      var a;
    },
    findShadowRoot: function (t) {
      if (!document.documentElement.attachShadow) return null;
      if ("function" != typeof t.getRootNode)
        return t instanceof ShadowRoot
          ? t
          : t.parentNode
          ? _.findShadowRoot(t.parentNode)
          : null;
      var e = t.getRootNode();
      return e instanceof ShadowRoot ? e : null;
    },
    jQueryDetection: function () {
      if ("undefined" == typeof g)
        throw new TypeError(
          "Bootstrap's JavaScript requires jQuery. jQuery must be included before Bootstrap's JavaScript."
        );
      var t = g.fn.jquery.split(" ")[0].split(".");
      if (
        (t[0] < 2 && t[1] < 9) ||
        (1 === t[0] && 9 === t[1] && t[2] < 1) ||
        4 <= t[0]
      )
        throw new Error(
          "Bootstrap's JavaScript requires at least jQuery v1.9.1 but less than v4.0.0"
        );
    },
  };
  _.jQueryDetection(),
    (g.fn.emulateTransitionEnd = o),
    (g.event.special[_.TRANSITION_END] = {
      bindType: n,
      delegateType: n,
      handle: function (t) {
        if (g(t.target).is(this))
          return t.handleObj.handler.apply(this, arguments);
      },
    });
  var r = "alert",
    a = "bs.alert",
    c = "." + a,
    h = g.fn[r],
    f = {
      CLOSE: "close" + c,
      CLOSED: "closed" + c,
      CLICK_DATA_API: "click" + c + ".data-api",
    },
    d = "alert",
    m = "fade",
    p = "show",
    v = (function () {
      function i(t) {
        this._element = t;
      }
      var t = i.prototype;
      return (
        (t.close = function (t) {
          var e = this._element;
          t && (e = this._getRootElement(t)),
            this._triggerCloseEvent(e).isDefaultPrevented() ||
              this._removeElement(e);
        }),
        (t.dispose = function () {
          g.removeData(this._element, a), (this._element = null);
        }),
        (t._getRootElement = function (t) {
          var e = _.getSelectorFromElement(t),
            n = !1;
          return (
            e && (n = document.querySelector(e)),
            (n = n || g(t).closest("." + d)[0])
          );
        }),
        (t._triggerCloseEvent = function (t) {
          var e = g.Event(f.CLOSE);
          return g(t).trigger(e), e;
        }),
        (t._removeElement = function (e) {
          var n = this;
          if ((g(e).removeClass(p), g(e).hasClass(m))) {
            var t = _.getTransitionDurationFromElement(e);
            g(e)
              .one(_.TRANSITION_END, function (t) {
                return n._destroyElement(e, t);
              })
              .emulateTransitionEnd(t);
          } else this._destroyElement(e);
        }),
        (t._destroyElement = function (t) {
          g(t).detach().trigger(f.CLOSED).remove();
        }),
        (i._jQueryInterface = function (n) {
          return this.each(function () {
            var t = g(this),
              e = t.data(a);
            e || ((e = new i(this)), t.data(a, e)), "close" === n && e[n](this);
          });
        }),
        (i._handleDismiss = function (e) {
          return function (t) {
            t && t.preventDefault(), e.close(this);
          };
        }),
        s(i, null, [
          {
            key: "VERSION",
            get: function () {
              return "4.4.1";
            },
          },
        ]),
        i
      );
    })();
  g(document).on(
    f.CLICK_DATA_API,
    '[data-dismiss="alert"]',
    v._handleDismiss(new v())
  ),
    (g.fn[r] = v._jQueryInterface),
    (g.fn[r].Constructor = v),
    (g.fn[r].noConflict = function () {
      return (g.fn[r] = h), v._jQueryInterface;
    });
  var y = "button",
    E = "bs.button",
    C = "." + E,
    T = ".data-api",
    b = g.fn[y],
    S = "active",
    D = "btn",
    I = "focus",
    w = '[data-toggle^="button"]',
    A = '[data-toggle="buttons"]',
    N = '[data-toggle="button"]',
    O = '[data-toggle="buttons"] .btn',
    k = 'input:not([type="hidden"])',
    P = ".active",
    L = ".btn",
    j = {
      CLICK_DATA_API: "click" + C + T,
      FOCUS_BLUR_DATA_API: "focus" + C + T + " blur" + C + T,
      LOAD_DATA_API: "load" + C + T,
    },
    H = (function () {
      function n(t) {
        this._element = t;
      }
      var t = n.prototype;
      return (
        (t.toggle = function () {
          var t = !0,
            e = !0,
            n = g(this._element).closest(A)[0];
          if (n) {
            var i = this._element.querySelector(k);
            if (i) {
              if ("radio" === i.type)
                if (i.checked && this._element.classList.contains(S)) t = !1;
                else {
                  var o = n.querySelector(P);
                  o && g(o).removeClass(S);
                }
              else
                "checkbox" === i.type
                  ? "LABEL" === this._element.tagName &&
                    i.checked === this._element.classList.contains(S) &&
                    (t = !1)
                  : (t = !1);
              t &&
                ((i.checked = !this._element.classList.contains(S)),
                g(i).trigger("change")),
                i.focus(),
                (e = !1);
            }
          }
          this._element.hasAttribute("disabled") ||
            this._element.classList.contains("disabled") ||
            (e &&
              this._element.setAttribute(
                "aria-pressed",
                !this._element.classList.contains(S)
              ),
            t && g(this._element).toggleClass(S));
        }),
        (t.dispose = function () {
          g.removeData(this._element, E), (this._element = null);
        }),
        (n._jQueryInterface = function (e) {
          return this.each(function () {
            var t = g(this).data(E);
            t || ((t = new n(this)), g(this).data(E, t)),
              "toggle" === e && t[e]();
          });
        }),
        s(n, null, [
          {
            key: "VERSION",
            get: function () {
              return "4.4.1";
            },
          },
        ]),
        n
      );
    })();
  g(document)
    .on(j.CLICK_DATA_API, w, function (t) {
      var e = t.target;
      if (
        (g(e).hasClass(D) || (e = g(e).closest(L)[0]),
        !e || e.hasAttribute("disabled") || e.classList.contains("disabled"))
      )
        t.preventDefault();
      else {
        var n = e.querySelector(k);
        if (
          n &&
          (n.hasAttribute("disabled") || n.classList.contains("disabled"))
        )
          return void t.preventDefault();
        H._jQueryInterface.call(g(e), "toggle");
      }
    })
    .on(j.FOCUS_BLUR_DATA_API, w, function (t) {
      var e = g(t.target).closest(L)[0];
      g(e).toggleClass(I, /^focus(in)?$/.test(t.type));
    }),
    g(window).on(j.LOAD_DATA_API, function () {
      for (
        var t = [].slice.call(document.querySelectorAll(O)),
          e = 0,
          n = t.length;
        e < n;
        e++
      ) {
        var i = t[e],
          o = i.querySelector(k);
        o.checked || o.hasAttribute("checked")
          ? i.classList.add(S)
          : i.classList.remove(S);
      }
      for (
        var r = 0, s = (t = [].slice.call(document.querySelectorAll(N))).length;
        r < s;
        r++
      ) {
        var a = t[r];
        "true" === a.getAttribute("aria-pressed")
          ? a.classList.add(S)
          : a.classList.remove(S);
      }
    }),
    (g.fn[y] = H._jQueryInterface),
    (g.fn[y].Constructor = H),
    (g.fn[y].noConflict = function () {
      return (g.fn[y] = b), H._jQueryInterface;
    });
  var R = "carousel",
    x = "bs.carousel",
    F = "." + x,
    U = ".data-api",
    W = g.fn[R],
    q = {
      interval: 5e3,
      keyboard: !0,
      slide: !1,
      pause: "hover",
      wrap: !0,
      touch: !0,
    },
    M = {
      interval: "(number|boolean)",
      keyboard: "boolean",
      slide: "(boolean|string)",
      pause: "(string|boolean)",
      wrap: "boolean",
      touch: "boolean",
    },
    K = "next",
    Q = "prev",
    B = "left",
    V = "right",
    Y = {
      SLIDE: "slide" + F,
      SLID: "slid" + F,
      KEYDOWN: "keydown" + F,
      MOUSEENTER: "mouseenter" + F,
      MOUSELEAVE: "mouseleave" + F,
      TOUCHSTART: "touchstart" + F,
      TOUCHMOVE: "touchmove" + F,
      TOUCHEND: "touchend" + F,
      POINTERDOWN: "pointerdown" + F,
      POINTERUP: "pointerup" + F,
      DRAG_START: "dragstart" + F,
      LOAD_DATA_API: "load" + F + U,
      CLICK_DATA_API: "click" + F + U,
    },
    z = "carousel",
    X = "active",
    $ = "slide",
    G = "carousel-item-right",
    J = "carousel-item-left",
    Z = "carousel-item-next",
    tt = "carousel-item-prev",
    et = "pointer-event",
    nt = ".active",
    it = ".active.carousel-item",
    ot = ".carousel-item",
    rt = ".carousel-item img",
    st = ".carousel-item-next, .carousel-item-prev",
    at = ".carousel-indicators",
    lt = "[data-slide], [data-slide-to]",
    ct = '[data-ride="carousel"]',
    ht = { TOUCH: "touch", PEN: "pen" },
    ut = (function () {
      function r(t, e) {
        (this._items = null),
          (this._interval = null),
          (this._activeElement = null),
          (this._isPaused = !1),
          (this._isSliding = !1),
          (this.touchTimeout = null),
          (this.touchStartX = 0),
          (this.touchDeltaX = 0),
          (this._config = this._getConfig(e)),
          (this._element = t),
          (this._indicatorsElement = this._element.querySelector(at)),
          (this._touchSupported =
            "ontouchstart" in document.documentElement ||
            0 < navigator.maxTouchPoints),
          (this._pointerEvent = Boolean(
            window.PointerEvent || window.MSPointerEvent
          )),
          this._addEventListeners();
      }
      var t = r.prototype;
      return (
        (t.next = function () {
          this._isSliding || this._slide(K);
        }),
        (t.nextWhenVisible = function () {
          !document.hidden &&
            g(this._element).is(":visible") &&
            "hidden" !== g(this._element).css("visibility") &&
            this.next();
        }),
        (t.prev = function () {
          this._isSliding || this._slide(Q);
        }),
        (t.pause = function (t) {
          t || (this._isPaused = !0),
            this._element.querySelector(st) &&
              (_.triggerTransitionEnd(this._element), this.cycle(!0)),
            clearInterval(this._interval),
            (this._interval = null);
        }),
        (t.cycle = function (t) {
          t || (this._isPaused = !1),
            this._interval &&
              (clearInterval(this._interval), (this._interval = null)),
            this._config.interval &&
              !this._isPaused &&
              (this._interval = setInterval(
                (document.visibilityState
                  ? this.nextWhenVisible
                  : this.next
                ).bind(this),
                this._config.interval
              ));
        }),
        (t.to = function (t) {
          var e = this;
          this._activeElement = this._element.querySelector(it);
          var n = this._getItemIndex(this._activeElement);
          if (!(t > this._items.length - 1 || t < 0))
            if (this._isSliding)
              g(this._element).one(Y.SLID, function () {
                return e.to(t);
              });
            else {
              if (n === t) return this.pause(), void this.cycle();
              var i = n < t ? K : Q;
              this._slide(i, this._items[t]);
            }
        }),
        (t.dispose = function () {
          g(this._element).off(F),
            g.removeData(this._element, x),
            (this._items = null),
            (this._config = null),
            (this._element = null),
            (this._interval = null),
            (this._isPaused = null),
            (this._isSliding = null),
            (this._activeElement = null),
            (this._indicatorsElement = null);
        }),
        (t._getConfig = function (t) {
          return (t = l({}, q, {}, t)), _.typeCheckConfig(R, t, M), t;
        }),
        (t._handleSwipe = function () {
          var t = Math.abs(this.touchDeltaX);
          if (!(t <= 40)) {
            var e = t / this.touchDeltaX;
            (this.touchDeltaX = 0) < e && this.prev(), e < 0 && this.next();
          }
        }),
        (t._addEventListeners = function () {
          var e = this;
          this._config.keyboard &&
            g(this._element).on(Y.KEYDOWN, function (t) {
              return e._keydown(t);
            }),
            "hover" === this._config.pause &&
              g(this._element)
                .on(Y.MOUSEENTER, function (t) {
                  return e.pause(t);
                })
                .on(Y.MOUSELEAVE, function (t) {
                  return e.cycle(t);
                }),
            this._config.touch && this._addTouchEventListeners();
        }),
        (t._addTouchEventListeners = function () {
          var e = this;
          if (this._touchSupported) {
            var n = function (t) {
                e._pointerEvent && ht[t.originalEvent.pointerType.toUpperCase()]
                  ? (e.touchStartX = t.originalEvent.clientX)
                  : e._pointerEvent ||
                    (e.touchStartX = t.originalEvent.touches[0].clientX);
              },
              i = function (t) {
                e._pointerEvent &&
                  ht[t.originalEvent.pointerType.toUpperCase()] &&
                  (e.touchDeltaX = t.originalEvent.clientX - e.touchStartX),
                  e._handleSwipe(),
                  "hover" === e._config.pause &&
                    (e.pause(),
                    e.touchTimeout && clearTimeout(e.touchTimeout),
                    (e.touchTimeout = setTimeout(function (t) {
                      return e.cycle(t);
                    }, 500 + e._config.interval)));
              };
            g(this._element.querySelectorAll(rt)).on(
              Y.DRAG_START,
              function (t) {
                return t.preventDefault();
              }
            ),
              this._pointerEvent
                ? (g(this._element).on(Y.POINTERDOWN, function (t) {
                    return n(t);
                  }),
                  g(this._element).on(Y.POINTERUP, function (t) {
                    return i(t);
                  }),
                  this._element.classList.add(et))
                : (g(this._element).on(Y.TOUCHSTART, function (t) {
                    return n(t);
                  }),
                  g(this._element).on(Y.TOUCHMOVE, function (t) {
                    return (function (t) {
                      t.originalEvent.touches &&
                      1 < t.originalEvent.touches.length
                        ? (e.touchDeltaX = 0)
                        : (e.touchDeltaX =
                            t.originalEvent.touches[0].clientX - e.touchStartX);
                    })(t);
                  }),
                  g(this._element).on(Y.TOUCHEND, function (t) {
                    return i(t);
                  }));
          }
        }),
        (t._keydown = function (t) {
          if (!/input|textarea/i.test(t.target.tagName))
            switch (t.which) {
              case 37:
                t.preventDefault(), this.prev();
                break;
              case 39:
                t.preventDefault(), this.next();
            }
        }),
        (t._getItemIndex = function (t) {
          return (
            (this._items =
              t && t.parentNode
                ? [].slice.call(t.parentNode.querySelectorAll(ot))
                : []),
            this._items.indexOf(t)
          );
        }),
        (t._getItemByDirection = function (t, e) {
          var n = t === K,
            i = t === Q,
            o = this._getItemIndex(e),
            r = this._items.length - 1;
          if (((i && 0 === o) || (n && o === r)) && !this._config.wrap)
            return e;
          var s = (o + (t === Q ? -1 : 1)) % this._items.length;
          return -1 == s ? this._items[this._items.length - 1] : this._items[s];
        }),
        (t._triggerSlideEvent = function (t, e) {
          var n = this._getItemIndex(t),
            i = this._getItemIndex(this._element.querySelector(it)),
            o = g.Event(Y.SLIDE, {
              relatedTarget: t,
              direction: e,
              from: i,
              to: n,
            });
          return g(this._element).trigger(o), o;
        }),
        (t._setActiveIndicatorElement = function (t) {
          if (this._indicatorsElement) {
            var e = [].slice.call(this._indicatorsElement.querySelectorAll(nt));
            g(e).removeClass(X);
            var n = this._indicatorsElement.children[this._getItemIndex(t)];
            n && g(n).addClass(X);
          }
        }),
        (t._slide = function (t, e) {
          var n,
            i,
            o,
            r = this,
            s = this._element.querySelector(it),
            a = this._getItemIndex(s),
            l = e || (s && this._getItemByDirection(t, s)),
            c = this._getItemIndex(l),
            h = Boolean(this._interval);
          if (
            ((o = t === K ? ((n = J), (i = Z), B) : ((n = G), (i = tt), V)),
            l && g(l).hasClass(X))
          )
            this._isSliding = !1;
          else if (
            !this._triggerSlideEvent(l, o).isDefaultPrevented() &&
            s &&
            l
          ) {
            (this._isSliding = !0),
              h && this.pause(),
              this._setActiveIndicatorElement(l);
            var u = g.Event(Y.SLID, {
              relatedTarget: l,
              direction: o,
              from: a,
              to: c,
            });
            if (g(this._element).hasClass($)) {
              g(l).addClass(i), _.reflow(l), g(s).addClass(n), g(l).addClass(n);
              var f = parseInt(l.getAttribute("data-interval"), 10);
              f
                ? ((this._config.defaultInterval =
                    this._config.defaultInterval || this._config.interval),
                  (this._config.interval = f))
                : (this._config.interval =
                    this._config.defaultInterval || this._config.interval);
              var d = _.getTransitionDurationFromElement(s);
              g(s)
                .one(_.TRANSITION_END, function () {
                  g(l)
                    .removeClass(n + " " + i)
                    .addClass(X),
                    g(s).removeClass(X + " " + i + " " + n),
                    (r._isSliding = !1),
                    setTimeout(function () {
                      return g(r._element).trigger(u);
                    }, 0);
                })
                .emulateTransitionEnd(d);
            } else
              g(s).removeClass(X),
                g(l).addClass(X),
                (this._isSliding = !1),
                g(this._element).trigger(u);
            h && this.cycle();
          }
        }),
        (r._jQueryInterface = function (i) {
          return this.each(function () {
            var t = g(this).data(x),
              e = l({}, q, {}, g(this).data());
            "object" == typeof i && (e = l({}, e, {}, i));
            var n = "string" == typeof i ? i : e.slide;
            if (
              (t || ((t = new r(this, e)), g(this).data(x, t)),
              "number" == typeof i)
            )
              t.to(i);
            else if ("string" == typeof n) {
              if ("undefined" == typeof t[n])
                throw new TypeError('No method named "' + n + '"');
              t[n]();
            } else e.interval && e.ride && (t.pause(), t.cycle());
          });
        }),
        (r._dataApiClickHandler = function (t) {
          var e = _.getSelectorFromElement(this);
          if (e) {
            var n = g(e)[0];
            if (n && g(n).hasClass(z)) {
              var i = l({}, g(n).data(), {}, g(this).data()),
                o = this.getAttribute("data-slide-to");
              o && (i.interval = !1),
                r._jQueryInterface.call(g(n), i),
                o && g(n).data(x).to(o),
                t.preventDefault();
            }
          }
        }),
        s(r, null, [
          {
            key: "VERSION",
            get: function () {
              return "4.4.1";
            },
          },
          {
            key: "Default",
            get: function () {
              return q;
            },
          },
        ]),
        r
      );
    })();
  g(document).on(Y.CLICK_DATA_API, lt, ut._dataApiClickHandler),
    g(window).on(Y.LOAD_DATA_API, function () {
      for (
        var t = [].slice.call(document.querySelectorAll(ct)),
          e = 0,
          n = t.length;
        e < n;
        e++
      ) {
        var i = g(t[e]);
        ut._jQueryInterface.call(i, i.data());
      }
    }),
    (g.fn[R] = ut._jQueryInterface),
    (g.fn[R].Constructor = ut),
    (g.fn[R].noConflict = function () {
      return (g.fn[R] = W), ut._jQueryInterface;
    });
  var ft = "collapse",
    dt = "bs.collapse",
    gt = "." + dt,
    _t = g.fn[ft],
    mt = { toggle: !0, parent: "" },
    pt = { toggle: "boolean", parent: "(string|element)" },
    vt = {
      SHOW: "show" + gt,
      SHOWN: "shown" + gt,
      HIDE: "hide" + gt,
      HIDDEN: "hidden" + gt,
      CLICK_DATA_API: "click" + gt + ".data-api",
    },
    yt = "show",
    Et = "collapse",
    Ct = "collapsing",
    Tt = "collapsed",
    bt = "width",
    St = "height",
    Dt = ".show, .collapsing",
    It = '[data-toggle="collapse"]',
    wt = (function () {
      function a(e, t) {
        (this._isTransitioning = !1),
          (this._element = e),
          (this._config = this._getConfig(t)),
          (this._triggerArray = [].slice.call(
            document.querySelectorAll(
              '[data-toggle="collapse"][href="#' +
                e.id +
                '"],[data-toggle="collapse"][data-target="#' +
                e.id +
                '"]'
            )
          ));
        for (
          var n = [].slice.call(document.querySelectorAll(It)),
            i = 0,
            o = n.length;
          i < o;
          i++
        ) {
          var r = n[i],
            s = _.getSelectorFromElement(r),
            a = [].slice
              .call(document.querySelectorAll(s))
              .filter(function (t) {
                return t === e;
              });
          null !== s &&
            0 < a.length &&
            ((this._selector = s), this._triggerArray.push(r));
        }
        (this._parent = this._config.parent ? this._getParent() : null),
          this._config.parent ||
            this._addAriaAndCollapsedClass(this._element, this._triggerArray),
          this._config.toggle && this.toggle();
      }
      var t = a.prototype;
      return (
        (t.toggle = function () {
          g(this._element).hasClass(yt) ? this.hide() : this.show();
        }),
        (t.show = function () {
          var t,
            e,
            n = this;
          if (
            !this._isTransitioning &&
            !g(this._element).hasClass(yt) &&
            (this._parent &&
              0 ===
                (t = [].slice
                  .call(this._parent.querySelectorAll(Dt))
                  .filter(function (t) {
                    return "string" == typeof n._config.parent
                      ? t.getAttribute("data-parent") === n._config.parent
                      : t.classList.contains(Et);
                  })).length &&
              (t = null),
            !(
              t &&
              (e = g(t).not(this._selector).data(dt)) &&
              e._isTransitioning
            ))
          ) {
            var i = g.Event(vt.SHOW);
            if ((g(this._element).trigger(i), !i.isDefaultPrevented())) {
              t &&
                (a._jQueryInterface.call(g(t).not(this._selector), "hide"),
                e || g(t).data(dt, null));
              var o = this._getDimension();
              g(this._element).removeClass(Et).addClass(Ct),
                (this._element.style[o] = 0),
                this._triggerArray.length &&
                  g(this._triggerArray)
                    .removeClass(Tt)
                    .attr("aria-expanded", !0),
                this.setTransitioning(!0);
              var r = "scroll" + (o[0].toUpperCase() + o.slice(1)),
                s = _.getTransitionDurationFromElement(this._element);
              g(this._element)
                .one(_.TRANSITION_END, function () {
                  g(n._element).removeClass(Ct).addClass(Et).addClass(yt),
                    (n._element.style[o] = ""),
                    n.setTransitioning(!1),
                    g(n._element).trigger(vt.SHOWN);
                })
                .emulateTransitionEnd(s),
                (this._element.style[o] = this._element[r] + "px");
            }
          }
        }),
        (t.hide = function () {
          var t = this;
          if (!this._isTransitioning && g(this._element).hasClass(yt)) {
            var e = g.Event(vt.HIDE);
            if ((g(this._element).trigger(e), !e.isDefaultPrevented())) {
              var n = this._getDimension();
              (this._element.style[n] =
                this._element.getBoundingClientRect()[n] + "px"),
                _.reflow(this._element),
                g(this._element).addClass(Ct).removeClass(Et).removeClass(yt);
              var i = this._triggerArray.length;
              if (0 < i)
                for (var o = 0; o < i; o++) {
                  var r = this._triggerArray[o],
                    s = _.getSelectorFromElement(r);
                  if (null !== s)
                    g([].slice.call(document.querySelectorAll(s))).hasClass(
                      yt
                    ) || g(r).addClass(Tt).attr("aria-expanded", !1);
                }
              this.setTransitioning(!0);
              this._element.style[n] = "";
              var a = _.getTransitionDurationFromElement(this._element);
              g(this._element)
                .one(_.TRANSITION_END, function () {
                  t.setTransitioning(!1),
                    g(t._element)
                      .removeClass(Ct)
                      .addClass(Et)
                      .trigger(vt.HIDDEN);
                })
                .emulateTransitionEnd(a);
            }
          }
        }),
        (t.setTransitioning = function (t) {
          this._isTransitioning = t;
        }),
        (t.dispose = function () {
          g.removeData(this._element, dt),
            (this._config = null),
            (this._parent = null),
            (this._element = null),
            (this._triggerArray = null),
            (this._isTransitioning = null);
        }),
        (t._getConfig = function (t) {
          return (
            ((t = l({}, mt, {}, t)).toggle = Boolean(t.toggle)),
            _.typeCheckConfig(ft, t, pt),
            t
          );
        }),
        (t._getDimension = function () {
          return g(this._element).hasClass(bt) ? bt : St;
        }),
        (t._getParent = function () {
          var t,
            n = this;
          _.isElement(this._config.parent)
            ? ((t = this._config.parent),
              "undefined" != typeof this._config.parent.jquery &&
                (t = this._config.parent[0]))
            : (t = document.querySelector(this._config.parent));
          var e =
              '[data-toggle="collapse"][data-parent="' +
              this._config.parent +
              '"]',
            i = [].slice.call(t.querySelectorAll(e));
          return (
            g(i).each(function (t, e) {
              n._addAriaAndCollapsedClass(a._getTargetFromElement(e), [e]);
            }),
            t
          );
        }),
        (t._addAriaAndCollapsedClass = function (t, e) {
          var n = g(t).hasClass(yt);
          e.length && g(e).toggleClass(Tt, !n).attr("aria-expanded", n);
        }),
        (a._getTargetFromElement = function (t) {
          var e = _.getSelectorFromElement(t);
          return e ? document.querySelector(e) : null;
        }),
        (a._jQueryInterface = function (i) {
          return this.each(function () {
            var t = g(this),
              e = t.data(dt),
              n = l(
                {},
                mt,
                {},
                t.data(),
                {},
                "object" == typeof i && i ? i : {}
              );
            if (
              (!e && n.toggle && /show|hide/.test(i) && (n.toggle = !1),
              e || ((e = new a(this, n)), t.data(dt, e)),
              "string" == typeof i)
            ) {
              if ("undefined" == typeof e[i])
                throw new TypeError('No method named "' + i + '"');
              e[i]();
            }
          });
        }),
        s(a, null, [
          {
            key: "VERSION",
            get: function () {
              return "4.4.1";
            },
          },
          {
            key: "Default",
            get: function () {
              return mt;
            },
          },
        ]),
        a
      );
    })();
  g(document).on(vt.CLICK_DATA_API, It, function (t) {
    "A" === t.currentTarget.tagName && t.preventDefault();
    var n = g(this),
      e = _.getSelectorFromElement(this),
      i = [].slice.call(document.querySelectorAll(e));
    g(i).each(function () {
      var t = g(this),
        e = t.data(dt) ? "toggle" : n.data();
      wt._jQueryInterface.call(t, e);
    });
  }),
    (g.fn[ft] = wt._jQueryInterface),
    (g.fn[ft].Constructor = wt),
    (g.fn[ft].noConflict = function () {
      return (g.fn[ft] = _t), wt._jQueryInterface;
    });
  var At = "dropdown",
    Nt = "bs.dropdown",
    Ot = "." + Nt,
    kt = ".data-api",
    Pt = g.fn[At],
    Lt = new RegExp("38|40|27"),
    jt = {
      HIDE: "hide" + Ot,
      HIDDEN: "hidden" + Ot,
      SHOW: "show" + Ot,
      SHOWN: "shown" + Ot,
      CLICK: "click" + Ot,
      CLICK_DATA_API: "click" + Ot + kt,
      KEYDOWN_DATA_API: "keydown" + Ot + kt,
      KEYUP_DATA_API: "keyup" + Ot + kt,
    },
    Ht = "disabled",
    Rt = "show",
    xt = "dropup",
    Ft = "dropright",
    Ut = "dropleft",
    Wt = "dropdown-menu-right",
    qt = "position-static",
    Mt = '[data-toggle="dropdown"]',
    Kt = ".dropdown form",
    Qt = ".dropdown-menu",
    Bt = ".navbar-nav",
    Vt = ".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)",
    Yt = "top-start",
    zt = "top-end",
    Xt = "bottom-start",
    $t = "bottom-end",
    Gt = "right-start",
    Jt = "left-start",
    Zt = {
      offset: 0,
      flip: !0,
      boundary: "scrollParent",
      reference: "toggle",
      display: "dynamic",
      popperConfig: null,
    },
    te = {
      offset: "(number|string|function)",
      flip: "boolean",
      boundary: "(string|element)",
      reference: "(string|element)",
      display: "string",
      popperConfig: "(null|object)",
    },
    ee = (function () {
      function c(t, e) {
        (this._element = t),
          (this._popper = null),
          (this._config = this._getConfig(e)),
          (this._menu = this._getMenuElement()),
          (this._inNavbar = this._detectNavbar()),
          this._addEventListeners();
      }
      var t = c.prototype;
      return (
        (t.toggle = function () {
          if (!this._element.disabled && !g(this._element).hasClass(Ht)) {
            var t = g(this._menu).hasClass(Rt);
            c._clearMenus(), t || this.show(!0);
          }
        }),
        (t.show = function (t) {
          if (
            (void 0 === t && (t = !1),
            !(
              this._element.disabled ||
              g(this._element).hasClass(Ht) ||
              g(this._menu).hasClass(Rt)
            ))
          ) {
            var e = { relatedTarget: this._element },
              n = g.Event(jt.SHOW, e),
              i = c._getParentFromElement(this._element);
            if ((g(i).trigger(n), !n.isDefaultPrevented())) {
              if (!this._inNavbar && t) {
                if ("undefined" == typeof u)
                  throw new TypeError(
                    "Bootstrap's dropdowns require Popper.js (https://popper.js.org/)"
                  );
                var o = this._element;
                "parent" === this._config.reference
                  ? (o = i)
                  : _.isElement(this._config.reference) &&
                    ((o = this._config.reference),
                    "undefined" != typeof this._config.reference.jquery &&
                      (o = this._config.reference[0])),
                  "scrollParent" !== this._config.boundary && g(i).addClass(qt),
                  (this._popper = new u(
                    o,
                    this._menu,
                    this._getPopperConfig()
                  ));
              }
              "ontouchstart" in document.documentElement &&
                0 === g(i).closest(Bt).length &&
                g(document.body).children().on("mouseover", null, g.noop),
                this._element.focus(),
                this._element.setAttribute("aria-expanded", !0),
                g(this._menu).toggleClass(Rt),
                g(i).toggleClass(Rt).trigger(g.Event(jt.SHOWN, e));
            }
          }
        }),
        (t.hide = function () {
          if (
            !this._element.disabled &&
            !g(this._element).hasClass(Ht) &&
            g(this._menu).hasClass(Rt)
          ) {
            var t = { relatedTarget: this._element },
              e = g.Event(jt.HIDE, t),
              n = c._getParentFromElement(this._element);
            g(n).trigger(e),
              e.isDefaultPrevented() ||
                (this._popper && this._popper.destroy(),
                g(this._menu).toggleClass(Rt),
                g(n).toggleClass(Rt).trigger(g.Event(jt.HIDDEN, t)));
          }
        }),
        (t.dispose = function () {
          g.removeData(this._element, Nt),
            g(this._element).off(Ot),
            (this._element = null),
            (this._menu = null) !== this._popper &&
              (this._popper.destroy(), (this._popper = null));
        }),
        (t.update = function () {
          (this._inNavbar = this._detectNavbar()),
            null !== this._popper && this._popper.scheduleUpdate();
        }),
        (t._addEventListeners = function () {
          var e = this;
          g(this._element).on(jt.CLICK, function (t) {
            t.preventDefault(), t.stopPropagation(), e.toggle();
          });
        }),
        (t._getConfig = function (t) {
          return (
            (t = l(
              {},
              this.constructor.Default,
              {},
              g(this._element).data(),
              {},
              t
            )),
            _.typeCheckConfig(At, t, this.constructor.DefaultType),
            t
          );
        }),
        (t._getMenuElement = function () {
          if (!this._menu) {
            var t = c._getParentFromElement(this._element);
            t && (this._menu = t.querySelector(Qt));
          }
          return this._menu;
        }),
        (t._getPlacement = function () {
          var t = g(this._element.parentNode),
            e = Xt;
          return (
            t.hasClass(xt)
              ? ((e = Yt), g(this._menu).hasClass(Wt) && (e = zt))
              : t.hasClass(Ft)
              ? (e = Gt)
              : t.hasClass(Ut)
              ? (e = Jt)
              : g(this._menu).hasClass(Wt) && (e = $t),
            e
          );
        }),
        (t._detectNavbar = function () {
          return 0 < g(this._element).closest(".navbar").length;
        }),
        (t._getOffset = function () {
          var e = this,
            t = {};
          return (
            "function" == typeof this._config.offset
              ? (t.fn = function (t) {
                  return (
                    (t.offsets = l(
                      {},
                      t.offsets,
                      {},
                      e._config.offset(t.offsets, e._element) || {}
                    )),
                    t
                  );
                })
              : (t.offset = this._config.offset),
            t
          );
        }),
        (t._getPopperConfig = function () {
          var t = {
            placement: this._getPlacement(),
            modifiers: {
              offset: this._getOffset(),
              flip: { enabled: this._config.flip },
              preventOverflow: { boundariesElement: this._config.boundary },
            },
          };
          return (
            "static" === this._config.display &&
              (t.modifiers.applyStyle = { enabled: !1 }),
            l({}, t, {}, this._config.popperConfig)
          );
        }),
        (c._jQueryInterface = function (e) {
          return this.each(function () {
            var t = g(this).data(Nt);
            if (
              (t ||
                ((t = new c(this, "object" == typeof e ? e : null)),
                g(this).data(Nt, t)),
              "string" == typeof e)
            ) {
              if ("undefined" == typeof t[e])
                throw new TypeError('No method named "' + e + '"');
              t[e]();
            }
          });
        }),
        (c._clearMenus = function (t) {
          if (!t || (3 !== t.which && ("keyup" !== t.type || 9 === t.which)))
            for (
              var e = [].slice.call(document.querySelectorAll(Mt)),
                n = 0,
                i = e.length;
              n < i;
              n++
            ) {
              var o = c._getParentFromElement(e[n]),
                r = g(e[n]).data(Nt),
                s = { relatedTarget: e[n] };
              if ((t && "click" === t.type && (s.clickEvent = t), r)) {
                var a = r._menu;
                if (
                  g(o).hasClass(Rt) &&
                  !(
                    t &&
                    (("click" === t.type &&
                      /input|textarea/i.test(t.target.tagName)) ||
                      ("keyup" === t.type && 9 === t.which)) &&
                    g.contains(o, t.target)
                  )
                ) {
                  var l = g.Event(jt.HIDE, s);
                  g(o).trigger(l),
                    l.isDefaultPrevented() ||
                      ("ontouchstart" in document.documentElement &&
                        g(document.body)
                          .children()
                          .off("mouseover", null, g.noop),
                      e[n].setAttribute("aria-expanded", "false"),
                      r._popper && r._popper.destroy(),
                      g(a).removeClass(Rt),
                      g(o).removeClass(Rt).trigger(g.Event(jt.HIDDEN, s)));
                }
              }
            }
        }),
        (c._getParentFromElement = function (t) {
          var e,
            n = _.getSelectorFromElement(t);
          return n && (e = document.querySelector(n)), e || t.parentNode;
        }),
        (c._dataApiKeydownHandler = function (t) {
          if (
            (/input|textarea/i.test(t.target.tagName)
              ? !(
                  32 === t.which ||
                  (27 !== t.which &&
                    ((40 !== t.which && 38 !== t.which) ||
                      g(t.target).closest(Qt).length))
                )
              : Lt.test(t.which)) &&
            (t.preventDefault(),
            t.stopPropagation(),
            !this.disabled && !g(this).hasClass(Ht))
          ) {
            var e = c._getParentFromElement(this),
              n = g(e).hasClass(Rt);
            if (n || 27 !== t.which)
              if (n && (!n || (27 !== t.which && 32 !== t.which))) {
                var i = [].slice
                  .call(e.querySelectorAll(Vt))
                  .filter(function (t) {
                    return g(t).is(":visible");
                  });
                if (0 !== i.length) {
                  var o = i.indexOf(t.target);
                  38 === t.which && 0 < o && o--,
                    40 === t.which && o < i.length - 1 && o++,
                    o < 0 && (o = 0),
                    i[o].focus();
                }
              } else {
                if (27 === t.which) {
                  var r = e.querySelector(Mt);
                  g(r).trigger("focus");
                }
                g(this).trigger("click");
              }
          }
        }),
        s(c, null, [
          {
            key: "VERSION",
            get: function () {
              return "4.4.1";
            },
          },
          {
            key: "Default",
            get: function () {
              return Zt;
            },
          },
          {
            key: "DefaultType",
            get: function () {
              return te;
            },
          },
        ]),
        c
      );
    })();
  g(document)
    .on(jt.KEYDOWN_DATA_API, Mt, ee._dataApiKeydownHandler)
    .on(jt.KEYDOWN_DATA_API, Qt, ee._dataApiKeydownHandler)
    .on(jt.CLICK_DATA_API + " " + jt.KEYUP_DATA_API, ee._clearMenus)
    .on(jt.CLICK_DATA_API, Mt, function (t) {
      t.preventDefault(),
        t.stopPropagation(),
        ee._jQueryInterface.call(g(this), "toggle");
    })
    .on(jt.CLICK_DATA_API, Kt, function (t) {
      t.stopPropagation();
    }),
    (g.fn[At] = ee._jQueryInterface),
    (g.fn[At].Constructor = ee),
    (g.fn[At].noConflict = function () {
      return (g.fn[At] = Pt), ee._jQueryInterface;
    });
  var ne = "modal",
    ie = "bs.modal",
    oe = "." + ie,
    re = g.fn[ne],
    se = { backdrop: !0, keyboard: !0, focus: !0, show: !0 },
    ae = {
      backdrop: "(boolean|string)",
      keyboard: "boolean",
      focus: "boolean",
      show: "boolean",
    },
    le = {
      HIDE: "hide" + oe,
      HIDE_PREVENTED: "hidePrevented" + oe,
      HIDDEN: "hidden" + oe,
      SHOW: "show" + oe,
      SHOWN: "shown" + oe,
      FOCUSIN: "focusin" + oe,
      RESIZE: "resize" + oe,
      CLICK_DISMISS: "click.dismiss" + oe,
      KEYDOWN_DISMISS: "keydown.dismiss" + oe,
      MOUSEUP_DISMISS: "mouseup.dismiss" + oe,
      MOUSEDOWN_DISMISS: "mousedown.dismiss" + oe,
      CLICK_DATA_API: "click" + oe + ".data-api",
    },
    ce = "modal-dialog-scrollable",
    he = "modal-scrollbar-measure",
    ue = "modal-backdrop",
    fe = "modal-open",
    de = "fade",
    ge = "show",
    _e = "modal-static",
    me = ".modal-dialog",
    pe = ".modal-body",
    ve = '[data-toggle="modal"]',
    ye = '[data-dismiss="modal"]',
    Ee = ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",
    Ce = ".sticky-top",
    Te = (function () {
      function o(t, e) {
        (this._config = this._getConfig(e)),
          (this._element = t),
          (this._dialog = t.querySelector(me)),
          (this._backdrop = null),
          (this._isShown = !1),
          (this._isBodyOverflowing = !1),
          (this._ignoreBackdropClick = !1),
          (this._isTransitioning = !1),
          (this._scrollbarWidth = 0);
      }
      var t = o.prototype;
      return (
        (t.toggle = function (t) {
          return this._isShown ? this.hide() : this.show(t);
        }),
        (t.show = function (t) {
          var e = this;
          if (!this._isShown && !this._isTransitioning) {
            g(this._element).hasClass(de) && (this._isTransitioning = !0);
            var n = g.Event(le.SHOW, { relatedTarget: t });
            g(this._element).trigger(n),
              this._isShown ||
                n.isDefaultPrevented() ||
                ((this._isShown = !0),
                this._checkScrollbar(),
                this._setScrollbar(),
                this._adjustDialog(),
                this._setEscapeEvent(),
                this._setResizeEvent(),
                g(this._element).on(le.CLICK_DISMISS, ye, function (t) {
                  return e.hide(t);
                }),
                g(this._dialog).on(le.MOUSEDOWN_DISMISS, function () {
                  g(e._element).one(le.MOUSEUP_DISMISS, function (t) {
                    g(t.target).is(e._element) && (e._ignoreBackdropClick = !0);
                  });
                }),
                this._showBackdrop(function () {
                  return e._showElement(t);
                }));
          }
        }),
        (t.hide = function (t) {
          var e = this;
          if (
            (t && t.preventDefault(), this._isShown && !this._isTransitioning)
          ) {
            var n = g.Event(le.HIDE);
            if (
              (g(this._element).trigger(n),
              this._isShown && !n.isDefaultPrevented())
            ) {
              this._isShown = !1;
              var i = g(this._element).hasClass(de);
              if (
                (i && (this._isTransitioning = !0),
                this._setEscapeEvent(),
                this._setResizeEvent(),
                g(document).off(le.FOCUSIN),
                g(this._element).removeClass(ge),
                g(this._element).off(le.CLICK_DISMISS),
                g(this._dialog).off(le.MOUSEDOWN_DISMISS),
                i)
              ) {
                var o = _.getTransitionDurationFromElement(this._element);
                g(this._element)
                  .one(_.TRANSITION_END, function (t) {
                    return e._hideModal(t);
                  })
                  .emulateTransitionEnd(o);
              } else this._hideModal();
            }
          }
        }),
        (t.dispose = function () {
          [window, this._element, this._dialog].forEach(function (t) {
            return g(t).off(oe);
          }),
            g(document).off(le.FOCUSIN),
            g.removeData(this._element, ie),
            (this._config = null),
            (this._element = null),
            (this._dialog = null),
            (this._backdrop = null),
            (this._isShown = null),
            (this._isBodyOverflowing = null),
            (this._ignoreBackdropClick = null),
            (this._isTransitioning = null),
            (this._scrollbarWidth = null);
        }),
        (t.handleUpdate = function () {
          this._adjustDialog();
        }),
        (t._getConfig = function (t) {
          return (t = l({}, se, {}, t)), _.typeCheckConfig(ne, t, ae), t;
        }),
        (t._triggerBackdropTransition = function () {
          var t = this;
          if ("static" === this._config.backdrop) {
            var e = g.Event(le.HIDE_PREVENTED);
            if ((g(this._element).trigger(e), e.defaultPrevented)) return;
            this._element.classList.add(_e);
            var n = _.getTransitionDurationFromElement(this._element);
            g(this._element)
              .one(_.TRANSITION_END, function () {
                t._element.classList.remove(_e);
              })
              .emulateTransitionEnd(n),
              this._element.focus();
          } else this.hide();
        }),
        (t._showElement = function (t) {
          var e = this,
            n = g(this._element).hasClass(de),
            i = this._dialog ? this._dialog.querySelector(pe) : null;
          (this._element.parentNode &&
            this._element.parentNode.nodeType === Node.ELEMENT_NODE) ||
            document.body.appendChild(this._element),
            (this._element.style.display = "block"),
            this._element.removeAttribute("aria-hidden"),
            this._element.setAttribute("aria-modal", !0),
            g(this._dialog).hasClass(ce) && i
              ? (i.scrollTop = 0)
              : (this._element.scrollTop = 0),
            n && _.reflow(this._element),
            g(this._element).addClass(ge),
            this._config.focus && this._enforceFocus();
          function o() {
            e._config.focus && e._element.focus(),
              (e._isTransitioning = !1),
              g(e._element).trigger(r);
          }
          var r = g.Event(le.SHOWN, { relatedTarget: t });
          if (n) {
            var s = _.getTransitionDurationFromElement(this._dialog);
            g(this._dialog).one(_.TRANSITION_END, o).emulateTransitionEnd(s);
          } else o();
        }),
        (t._enforceFocus = function () {
          var e = this;
          g(document)
            .off(le.FOCUSIN)
            .on(le.FOCUSIN, function (t) {
              document !== t.target &&
                e._element !== t.target &&
                0 === g(e._element).has(t.target).length &&
                e._element.focus();
            });
        }),
        (t._setEscapeEvent = function () {
          var e = this;
          this._isShown && this._config.keyboard
            ? g(this._element).on(le.KEYDOWN_DISMISS, function (t) {
                27 === t.which && e._triggerBackdropTransition();
              })
            : this._isShown || g(this._element).off(le.KEYDOWN_DISMISS);
        }),
        (t._setResizeEvent = function () {
          var e = this;
          this._isShown
            ? g(window).on(le.RESIZE, function (t) {
                return e.handleUpdate(t);
              })
            : g(window).off(le.RESIZE);
        }),
        (t._hideModal = function () {
          var t = this;
          (this._element.style.display = "none"),
            this._element.setAttribute("aria-hidden", !0),
            this._element.removeAttribute("aria-modal"),
            (this._isTransitioning = !1),
            this._showBackdrop(function () {
              g(document.body).removeClass(fe),
                t._resetAdjustments(),
                t._resetScrollbar(),
                g(t._element).trigger(le.HIDDEN);
            });
        }),
        (t._removeBackdrop = function () {
          this._backdrop &&
            (g(this._backdrop).remove(), (this._backdrop = null));
        }),
        (t._showBackdrop = function (t) {
          var e = this,
            n = g(this._element).hasClass(de) ? de : "";
          if (this._isShown && this._config.backdrop) {
            if (
              ((this._backdrop = document.createElement("div")),
              (this._backdrop.className = ue),
              n && this._backdrop.classList.add(n),
              g(this._backdrop).appendTo(document.body),
              g(this._element).on(le.CLICK_DISMISS, function (t) {
                e._ignoreBackdropClick
                  ? (e._ignoreBackdropClick = !1)
                  : t.target === t.currentTarget &&
                    e._triggerBackdropTransition();
              }),
              n && _.reflow(this._backdrop),
              g(this._backdrop).addClass(ge),
              !t)
            )
              return;
            if (!n) return void t();
            var i = _.getTransitionDurationFromElement(this._backdrop);
            g(this._backdrop).one(_.TRANSITION_END, t).emulateTransitionEnd(i);
          } else if (!this._isShown && this._backdrop) {
            g(this._backdrop).removeClass(ge);
            var o = function () {
              e._removeBackdrop(), t && t();
            };
            if (g(this._element).hasClass(de)) {
              var r = _.getTransitionDurationFromElement(this._backdrop);
              g(this._backdrop)
                .one(_.TRANSITION_END, o)
                .emulateTransitionEnd(r);
            } else o();
          } else t && t();
        }),
        (t._adjustDialog = function () {
          var t =
            this._element.scrollHeight > document.documentElement.clientHeight;
          !this._isBodyOverflowing &&
            t &&
            (this._element.style.paddingLeft = this._scrollbarWidth + "px"),
            this._isBodyOverflowing &&
              !t &&
              (this._element.style.paddingRight = this._scrollbarWidth + "px");
        }),
        (t._resetAdjustments = function () {
          (this._element.style.paddingLeft = ""),
            (this._element.style.paddingRight = "");
        }),
        (t._checkScrollbar = function () {
          var t = document.body.getBoundingClientRect();
          (this._isBodyOverflowing = t.left + t.right < window.innerWidth),
            (this._scrollbarWidth = this._getScrollbarWidth());
        }),
        (t._setScrollbar = function () {
          var o = this;
          if (this._isBodyOverflowing) {
            var t = [].slice.call(document.querySelectorAll(Ee)),
              e = [].slice.call(document.querySelectorAll(Ce));
            g(t).each(function (t, e) {
              var n = e.style.paddingRight,
                i = g(e).css("padding-right");
              g(e)
                .data("padding-right", n)
                .css("padding-right", parseFloat(i) + o._scrollbarWidth + "px");
            }),
              g(e).each(function (t, e) {
                var n = e.style.marginRight,
                  i = g(e).css("margin-right");
                g(e)
                  .data("margin-right", n)
                  .css(
                    "margin-right",
                    parseFloat(i) - o._scrollbarWidth + "px"
                  );
              });
            var n = document.body.style.paddingRight,
              i = g(document.body).css("padding-right");
            g(document.body)
              .data("padding-right", n)
              .css(
                "padding-right",
                parseFloat(i) + this._scrollbarWidth + "px"
              );
          }
          g(document.body).addClass(fe);
        }),
        (t._resetScrollbar = function () {
          var t = [].slice.call(document.querySelectorAll(Ee));
          g(t).each(function (t, e) {
            var n = g(e).data("padding-right");
            g(e).removeData("padding-right"), (e.style.paddingRight = n || "");
          });
          var e = [].slice.call(document.querySelectorAll("" + Ce));
          g(e).each(function (t, e) {
            var n = g(e).data("margin-right");
            "undefined" != typeof n &&
              g(e).css("margin-right", n).removeData("margin-right");
          });
          var n = g(document.body).data("padding-right");
          g(document.body).removeData("padding-right"),
            (document.body.style.paddingRight = n || "");
        }),
        (t._getScrollbarWidth = function () {
          var t = document.createElement("div");
          (t.className = he), document.body.appendChild(t);
          var e = t.getBoundingClientRect().width - t.clientWidth;
          return document.body.removeChild(t), e;
        }),
        (o._jQueryInterface = function (n, i) {
          return this.each(function () {
            var t = g(this).data(ie),
              e = l(
                {},
                se,
                {},
                g(this).data(),
                {},
                "object" == typeof n && n ? n : {}
              );
            if (
              (t || ((t = new o(this, e)), g(this).data(ie, t)),
              "string" == typeof n)
            ) {
              if ("undefined" == typeof t[n])
                throw new TypeError('No method named "' + n + '"');
              t[n](i);
            } else e.show && t.show(i);
          });
        }),
        s(o, null, [
          {
            key: "VERSION",
            get: function () {
              return "4.4.1";
            },
          },
          {
            key: "Default",
            get: function () {
              return se;
            },
          },
        ]),
        o
      );
    })();
  g(document).on(le.CLICK_DATA_API, ve, function (t) {
    var e,
      n = this,
      i = _.getSelectorFromElement(this);
    i && (e = document.querySelector(i));
    var o = g(e).data(ie) ? "toggle" : l({}, g(e).data(), {}, g(this).data());
    ("A" !== this.tagName && "AREA" !== this.tagName) || t.preventDefault();
    var r = g(e).one(le.SHOW, function (t) {
      t.isDefaultPrevented() ||
        r.one(le.HIDDEN, function () {
          g(n).is(":visible") && n.focus();
        });
    });
    Te._jQueryInterface.call(g(e), o, this);
  }),
    (g.fn[ne] = Te._jQueryInterface),
    (g.fn[ne].Constructor = Te),
    (g.fn[ne].noConflict = function () {
      return (g.fn[ne] = re), Te._jQueryInterface;
    });
  var be = [
      "background",
      "cite",
      "href",
      "itemtype",
      "longdesc",
      "poster",
      "src",
      "xlink:href",
    ],
    Se = {
      "*": ["class", "dir", "id", "lang", "role", /^aria-[\w-]*$/i],
      a: ["target", "href", "title", "rel"],
      area: [],
      b: [],
      br: [],
      col: [],
      code: [],
      div: [],
      em: [],
      hr: [],
      h1: [],
      h2: [],
      h3: [],
      h4: [],
      h5: [],
      h6: [],
      i: [],
      img: ["src", "alt", "title", "width", "height"],
      li: [],
      ol: [],
      p: [],
      pre: [],
      s: [],
      small: [],
      span: [],
      sub: [],
      sup: [],
      strong: [],
      u: [],
      ul: [],
    },
    De = /^(?:(?:https?|mailto|ftp|tel|file):|[^&:/?#]*(?:[/?#]|$))/gi,
    Ie =
      /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+/]+=*$/i;
  function we(t, r, e) {
    if (0 === t.length) return t;
    if (e && "function" == typeof e) return e(t);
    for (
      var n = new window.DOMParser().parseFromString(t, "text/html"),
        s = Object.keys(r),
        a = [].slice.call(n.body.querySelectorAll("*")),
        i = function (t) {
          var e = a[t],
            n = e.nodeName.toLowerCase();
          if (-1 === s.indexOf(e.nodeName.toLowerCase()))
            return e.parentNode.removeChild(e), "continue";
          var i = [].slice.call(e.attributes),
            o = [].concat(r["*"] || [], r[n] || []);
          i.forEach(function (t) {
            !(function (t, e) {
              var n = t.nodeName.toLowerCase();
              if (-1 !== e.indexOf(n))
                return (
                  -1 === be.indexOf(n) ||
                  Boolean(t.nodeValue.match(De) || t.nodeValue.match(Ie))
                );
              for (
                var i = e.filter(function (t) {
                    return t instanceof RegExp;
                  }),
                  o = 0,
                  r = i.length;
                o < r;
                o++
              )
                if (n.match(i[o])) return !0;
              return !1;
            })(t, o) && e.removeAttribute(t.nodeName);
          });
        },
        o = 0,
        l = a.length;
      o < l;
      o++
    )
      i(o);
    return n.body.innerHTML;
  }
  var Ae = "tooltip",
    Ne = "bs.tooltip",
    Oe = "." + Ne,
    ke = g.fn[Ae],
    Pe = "bs-tooltip",
    Le = new RegExp("(^|\\s)" + Pe + "\\S+", "g"),
    je = ["sanitize", "whiteList", "sanitizeFn"],
    He = {
      animation: "boolean",
      template: "string",
      title: "(string|element|function)",
      trigger: "string",
      delay: "(number|object)",
      html: "boolean",
      selector: "(string|boolean)",
      placement: "(string|function)",
      offset: "(number|string|function)",
      container: "(string|element|boolean)",
      fallbackPlacement: "(string|array)",
      boundary: "(string|element)",
      sanitize: "boolean",
      sanitizeFn: "(null|function)",
      whiteList: "object",
      popperConfig: "(null|object)",
    },
    Re = {
      AUTO: "auto",
      TOP: "top",
      RIGHT: "right",
      BOTTOM: "bottom",
      LEFT: "left",
    },
    xe = {
      animation: !0,
      template:
        '<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>',
      trigger: "hover focus",
      title: "",
      delay: 0,
      html: !1,
      selector: !1,
      placement: "top",
      offset: 0,
      container: !1,
      fallbackPlacement: "flip",
      boundary: "scrollParent",
      sanitize: !0,
      sanitizeFn: null,
      whiteList: Se,
      popperConfig: null,
    },
    Fe = "show",
    Ue = "out",
    We = {
      HIDE: "hide" + Oe,
      HIDDEN: "hidden" + Oe,
      SHOW: "show" + Oe,
      SHOWN: "shown" + Oe,
      INSERTED: "inserted" + Oe,
      CLICK: "click" + Oe,
      FOCUSIN: "focusin" + Oe,
      FOCUSOUT: "focusout" + Oe,
      MOUSEENTER: "mouseenter" + Oe,
      MOUSELEAVE: "mouseleave" + Oe,
    },
    qe = "fade",
    Me = "show",
    Ke = ".tooltip-inner",
    Qe = ".arrow",
    Be = "hover",
    Ve = "focus",
    Ye = "click",
    ze = "manual",
    Xe = (function () {
      function i(t, e) {
        if ("undefined" == typeof u)
          throw new TypeError(
            "Bootstrap's tooltips require Popper.js (https://popper.js.org/)"
          );
        (this._isEnabled = !0),
          (this._timeout = 0),
          (this._hoverState = ""),
          (this._activeTrigger = {}),
          (this._popper = null),
          (this.element = t),
          (this.config = this._getConfig(e)),
          (this.tip = null),
          this._setListeners();
      }
      var t = i.prototype;
      return (
        (t.enable = function () {
          this._isEnabled = !0;
        }),
        (t.disable = function () {
          this._isEnabled = !1;
        }),
        (t.toggleEnabled = function () {
          this._isEnabled = !this._isEnabled;
        }),
        (t.toggle = function (t) {
          if (this._isEnabled)
            if (t) {
              var e = this.constructor.DATA_KEY,
                n = g(t.currentTarget).data(e);
              n ||
                ((n = new this.constructor(
                  t.currentTarget,
                  this._getDelegateConfig()
                )),
                g(t.currentTarget).data(e, n)),
                (n._activeTrigger.click = !n._activeTrigger.click),
                n._isWithActiveTrigger()
                  ? n._enter(null, n)
                  : n._leave(null, n);
            } else {
              if (g(this.getTipElement()).hasClass(Me))
                return void this._leave(null, this);
              this._enter(null, this);
            }
        }),
        (t.dispose = function () {
          clearTimeout(this._timeout),
            g.removeData(this.element, this.constructor.DATA_KEY),
            g(this.element).off(this.constructor.EVENT_KEY),
            g(this.element)
              .closest(".modal")
              .off("hide.bs.modal", this._hideModalHandler),
            this.tip && g(this.tip).remove(),
            (this._isEnabled = null),
            (this._timeout = null),
            (this._hoverState = null),
            (this._activeTrigger = null),
            this._popper && this._popper.destroy(),
            (this._popper = null),
            (this.element = null),
            (this.config = null),
            (this.tip = null);
        }),
        (t.show = function () {
          var e = this;
          if ("none" === g(this.element).css("display"))
            throw new Error("Please use show on visible elements");
          var t = g.Event(this.constructor.Event.SHOW);
          if (this.isWithContent() && this._isEnabled) {
            g(this.element).trigger(t);
            var n = _.findShadowRoot(this.element),
              i = g.contains(
                null !== n ? n : this.element.ownerDocument.documentElement,
                this.element
              );
            if (t.isDefaultPrevented() || !i) return;
            var o = this.getTipElement(),
              r = _.getUID(this.constructor.NAME);
            o.setAttribute("id", r),
              this.element.setAttribute("aria-describedby", r),
              this.setContent(),
              this.config.animation && g(o).addClass(qe);
            var s =
                "function" == typeof this.config.placement
                  ? this.config.placement.call(this, o, this.element)
                  : this.config.placement,
              a = this._getAttachment(s);
            this.addAttachmentClass(a);
            var l = this._getContainer();
            g(o).data(this.constructor.DATA_KEY, this),
              g.contains(
                this.element.ownerDocument.documentElement,
                this.tip
              ) || g(o).appendTo(l),
              g(this.element).trigger(this.constructor.Event.INSERTED),
              (this._popper = new u(this.element, o, this._getPopperConfig(a))),
              g(o).addClass(Me),
              "ontouchstart" in document.documentElement &&
                g(document.body).children().on("mouseover", null, g.noop);
            var c = function () {
              e.config.animation && e._fixTransition();
              var t = e._hoverState;
              (e._hoverState = null),
                g(e.element).trigger(e.constructor.Event.SHOWN),
                t === Ue && e._leave(null, e);
            };
            if (g(this.tip).hasClass(qe)) {
              var h = _.getTransitionDurationFromElement(this.tip);
              g(this.tip).one(_.TRANSITION_END, c).emulateTransitionEnd(h);
            } else c();
          }
        }),
        (t.hide = function (t) {
          function e() {
            n._hoverState !== Fe && i.parentNode && i.parentNode.removeChild(i),
              n._cleanTipClass(),
              n.element.removeAttribute("aria-describedby"),
              g(n.element).trigger(n.constructor.Event.HIDDEN),
              null !== n._popper && n._popper.destroy(),
              t && t();
          }
          var n = this,
            i = this.getTipElement(),
            o = g.Event(this.constructor.Event.HIDE);
          if ((g(this.element).trigger(o), !o.isDefaultPrevented())) {
            if (
              (g(i).removeClass(Me),
              "ontouchstart" in document.documentElement &&
                g(document.body).children().off("mouseover", null, g.noop),
              (this._activeTrigger[Ye] = !1),
              (this._activeTrigger[Ve] = !1),
              (this._activeTrigger[Be] = !1),
              g(this.tip).hasClass(qe))
            ) {
              var r = _.getTransitionDurationFromElement(i);
              g(i).one(_.TRANSITION_END, e).emulateTransitionEnd(r);
            } else e();
            this._hoverState = "";
          }
        }),
        (t.update = function () {
          null !== this._popper && this._popper.scheduleUpdate();
        }),
        (t.isWithContent = function () {
          return Boolean(this.getTitle());
        }),
        (t.addAttachmentClass = function (t) {
          g(this.getTipElement()).addClass(Pe + "-" + t);
        }),
        (t.getTipElement = function () {
          return (this.tip = this.tip || g(this.config.template)[0]), this.tip;
        }),
        (t.setContent = function () {
          var t = this.getTipElement();
          this.setElementContent(g(t.querySelectorAll(Ke)), this.getTitle()),
            g(t).removeClass(qe + " " + Me);
        }),
        (t.setElementContent = function (t, e) {
          "object" != typeof e || (!e.nodeType && !e.jquery)
            ? this.config.html
              ? (this.config.sanitize &&
                  (e = we(e, this.config.whiteList, this.config.sanitizeFn)),
                t.html(e))
              : t.text(e)
            : this.config.html
            ? g(e).parent().is(t) || t.empty().append(e)
            : t.text(g(e).text());
        }),
        (t.getTitle = function () {
          var t = this.element.getAttribute("data-original-title");
          return (t =
            t ||
            ("function" == typeof this.config.title
              ? this.config.title.call(this.element)
              : this.config.title));
        }),
        (t._getPopperConfig = function (t) {
          var e = this;
          return l(
            {},
            {
              placement: t,
              modifiers: {
                offset: this._getOffset(),
                flip: { behavior: this.config.fallbackPlacement },
                arrow: { element: Qe },
                preventOverflow: { boundariesElement: this.config.boundary },
              },
              onCreate: function (t) {
                t.originalPlacement !== t.placement &&
                  e._handlePopperPlacementChange(t);
              },
              onUpdate: function (t) {
                return e._handlePopperPlacementChange(t);
              },
            },
            {},
            this.config.popperConfig
          );
        }),
        (t._getOffset = function () {
          var e = this,
            t = {};
          return (
            "function" == typeof this.config.offset
              ? (t.fn = function (t) {
                  return (
                    (t.offsets = l(
                      {},
                      t.offsets,
                      {},
                      e.config.offset(t.offsets, e.element) || {}
                    )),
                    t
                  );
                })
              : (t.offset = this.config.offset),
            t
          );
        }),
        (t._getContainer = function () {
          return !1 === this.config.container
            ? document.body
            : _.isElement(this.config.container)
            ? g(this.config.container)
            : g(document).find(this.config.container);
        }),
        (t._getAttachment = function (t) {
          return Re[t.toUpperCase()];
        }),
        (t._setListeners = function () {
          var i = this;
          this.config.trigger.split(" ").forEach(function (t) {
            if ("click" === t)
              g(i.element).on(
                i.constructor.Event.CLICK,
                i.config.selector,
                function (t) {
                  return i.toggle(t);
                }
              );
            else if (t !== ze) {
              var e =
                  t === Be
                    ? i.constructor.Event.MOUSEENTER
                    : i.constructor.Event.FOCUSIN,
                n =
                  t === Be
                    ? i.constructor.Event.MOUSELEAVE
                    : i.constructor.Event.FOCUSOUT;
              g(i.element)
                .on(e, i.config.selector, function (t) {
                  return i._enter(t);
                })
                .on(n, i.config.selector, function (t) {
                  return i._leave(t);
                });
            }
          }),
            (this._hideModalHandler = function () {
              i.element && i.hide();
            }),
            g(this.element)
              .closest(".modal")
              .on("hide.bs.modal", this._hideModalHandler),
            this.config.selector
              ? (this.config = l({}, this.config, {
                  trigger: "manual",
                  selector: "",
                }))
              : this._fixTitle();
        }),
        (t._fixTitle = function () {
          var t = typeof this.element.getAttribute("data-original-title");
          (!this.element.getAttribute("title") && "string" == t) ||
            (this.element.setAttribute(
              "data-original-title",
              this.element.getAttribute("title") || ""
            ),
            this.element.setAttribute("title", ""));
        }),
        (t._enter = function (t, e) {
          var n = this.constructor.DATA_KEY;
          (e = e || g(t.currentTarget).data(n)) ||
            ((e = new this.constructor(
              t.currentTarget,
              this._getDelegateConfig()
            )),
            g(t.currentTarget).data(n, e)),
            t && (e._activeTrigger["focusin" === t.type ? Ve : Be] = !0),
            g(e.getTipElement()).hasClass(Me) || e._hoverState === Fe
              ? (e._hoverState = Fe)
              : (clearTimeout(e._timeout),
                (e._hoverState = Fe),
                e.config.delay && e.config.delay.show
                  ? (e._timeout = setTimeout(function () {
                      e._hoverState === Fe && e.show();
                    }, e.config.delay.show))
                  : e.show());
        }),
        (t._leave = function (t, e) {
          var n = this.constructor.DATA_KEY;
          (e = e || g(t.currentTarget).data(n)) ||
            ((e = new this.constructor(
              t.currentTarget,
              this._getDelegateConfig()
            )),
            g(t.currentTarget).data(n, e)),
            t && (e._activeTrigger["focusout" === t.type ? Ve : Be] = !1),
            e._isWithActiveTrigger() ||
              (clearTimeout(e._timeout),
              (e._hoverState = Ue),
              e.config.delay && e.config.delay.hide
                ? (e._timeout = setTimeout(function () {
                    e._hoverState === Ue && e.hide();
                  }, e.config.delay.hide))
                : e.hide());
        }),
        (t._isWithActiveTrigger = function () {
          for (var t in this._activeTrigger)
            if (this._activeTrigger[t]) return !0;
          return !1;
        }),
        (t._getConfig = function (t) {
          var e = g(this.element).data();
          return (
            Object.keys(e).forEach(function (t) {
              -1 !== je.indexOf(t) && delete e[t];
            }),
            "number" ==
              typeof (t = l(
                {},
                this.constructor.Default,
                {},
                e,
                {},
                "object" == typeof t && t ? t : {}
              )).delay && (t.delay = { show: t.delay, hide: t.delay }),
            "number" == typeof t.title && (t.title = t.title.toString()),
            "number" == typeof t.content && (t.content = t.content.toString()),
            _.typeCheckConfig(Ae, t, this.constructor.DefaultType),
            t.sanitize &&
              (t.template = we(t.template, t.whiteList, t.sanitizeFn)),
            t
          );
        }),
        (t._getDelegateConfig = function () {
          var t = {};
          if (this.config)
            for (var e in this.config)
              this.constructor.Default[e] !== this.config[e] &&
                (t[e] = this.config[e]);
          return t;
        }),
        (t._cleanTipClass = function () {
          var t = g(this.getTipElement()),
            e = t.attr("class").match(Le);
          null !== e && e.length && t.removeClass(e.join(""));
        }),
        (t._handlePopperPlacementChange = function (t) {
          var e = t.instance;
          (this.tip = e.popper),
            this._cleanTipClass(),
            this.addAttachmentClass(this._getAttachment(t.placement));
        }),
        (t._fixTransition = function () {
          var t = this.getTipElement(),
            e = this.config.animation;
          null === t.getAttribute("x-placement") &&
            (g(t).removeClass(qe),
            (this.config.animation = !1),
            this.hide(),
            this.show(),
            (this.config.animation = e));
        }),
        (i._jQueryInterface = function (n) {
          return this.each(function () {
            var t = g(this).data(Ne),
              e = "object" == typeof n && n;
            if (
              (t || !/dispose|hide/.test(n)) &&
              (t || ((t = new i(this, e)), g(this).data(Ne, t)),
              "string" == typeof n)
            ) {
              if ("undefined" == typeof t[n])
                throw new TypeError('No method named "' + n + '"');
              t[n]();
            }
          });
        }),
        s(i, null, [
          {
            key: "VERSION",
            get: function () {
              return "4.4.1";
            },
          },
          {
            key: "Default",
            get: function () {
              return xe;
            },
          },
          {
            key: "NAME",
            get: function () {
              return Ae;
            },
          },
          {
            key: "DATA_KEY",
            get: function () {
              return Ne;
            },
          },
          {
            key: "Event",
            get: function () {
              return We;
            },
          },
          {
            key: "EVENT_KEY",
            get: function () {
              return Oe;
            },
          },
          {
            key: "DefaultType",
            get: function () {
              return He;
            },
          },
        ]),
        i
      );
    })();
  (g.fn[Ae] = Xe._jQueryInterface),
    (g.fn[Ae].Constructor = Xe),
    (g.fn[Ae].noConflict = function () {
      return (g.fn[Ae] = ke), Xe._jQueryInterface;
    });
  var $e = "popover",
    Ge = "bs.popover",
    Je = "." + Ge,
    Ze = g.fn[$e],
    tn = "bs-popover",
    en = new RegExp("(^|\\s)" + tn + "\\S+", "g"),
    nn = l({}, Xe.Default, {
      placement: "right",
      trigger: "click",
      content: "",
      template:
        '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>',
    }),
    on = l({}, Xe.DefaultType, { content: "(string|element|function)" }),
    rn = "fade",
    sn = "show",
    an = ".popover-header",
    ln = ".popover-body",
    cn = {
      HIDE: "hide" + Je,
      HIDDEN: "hidden" + Je,
      SHOW: "show" + Je,
      SHOWN: "shown" + Je,
      INSERTED: "inserted" + Je,
      CLICK: "click" + Je,
      FOCUSIN: "focusin" + Je,
      FOCUSOUT: "focusout" + Je,
      MOUSEENTER: "mouseenter" + Je,
      MOUSELEAVE: "mouseleave" + Je,
    },
    hn = (function (t) {
      function i() {
        return t.apply(this, arguments) || this;
      }
      !(function (t, e) {
        (t.prototype = Object.create(e.prototype)),
          ((t.prototype.constructor = t).__proto__ = e);
      })(i, t);
      var e = i.prototype;
      return (
        (e.isWithContent = function () {
          return this.getTitle() || this._getContent();
        }),
        (e.addAttachmentClass = function (t) {
          g(this.getTipElement()).addClass(tn + "-" + t);
        }),
        (e.getTipElement = function () {
          return (this.tip = this.tip || g(this.config.template)[0]), this.tip;
        }),
        (e.setContent = function () {
          var t = g(this.getTipElement());
          this.setElementContent(t.find(an), this.getTitle());
          var e = this._getContent();
          "function" == typeof e && (e = e.call(this.element)),
            this.setElementContent(t.find(ln), e),
            t.removeClass(rn + " " + sn);
        }),
        (e._getContent = function () {
          return (
            this.element.getAttribute("data-content") || this.config.content
          );
        }),
        (e._cleanTipClass = function () {
          var t = g(this.getTipElement()),
            e = t.attr("class").match(en);
          null !== e && 0 < e.length && t.removeClass(e.join(""));
        }),
        (i._jQueryInterface = function (n) {
          return this.each(function () {
            var t = g(this).data(Ge),
              e = "object" == typeof n ? n : null;
            if (
              (t || !/dispose|hide/.test(n)) &&
              (t || ((t = new i(this, e)), g(this).data(Ge, t)),
              "string" == typeof n)
            ) {
              if ("undefined" == typeof t[n])
                throw new TypeError('No method named "' + n + '"');
              t[n]();
            }
          });
        }),
        s(i, null, [
          {
            key: "VERSION",
            get: function () {
              return "4.4.1";
            },
          },
          {
            key: "Default",
            get: function () {
              return nn;
            },
          },
          {
            key: "NAME",
            get: function () {
              return $e;
            },
          },
          {
            key: "DATA_KEY",
            get: function () {
              return Ge;
            },
          },
          {
            key: "Event",
            get: function () {
              return cn;
            },
          },
          {
            key: "EVENT_KEY",
            get: function () {
              return Je;
            },
          },
          {
            key: "DefaultType",
            get: function () {
              return on;
            },
          },
        ]),
        i
      );
    })(Xe);
  (g.fn[$e] = hn._jQueryInterface),
    (g.fn[$e].Constructor = hn),
    (g.fn[$e].noConflict = function () {
      return (g.fn[$e] = Ze), hn._jQueryInterface;
    });
  var un = "scrollspy",
    fn = "bs.scrollspy",
    dn = "." + fn,
    gn = g.fn[un],
    _n = { offset: 10, method: "auto", target: "" },
    mn = { offset: "number", method: "string", target: "(string|element)" },
    pn = {
      ACTIVATE: "activate" + dn,
      SCROLL: "scroll" + dn,
      LOAD_DATA_API: "load" + dn + ".data-api",
    },
    vn = "dropdown-item",
    yn = "active",
    En = '[data-spy="scroll"]',
    Cn = ".nav, .list-group",
    Tn = ".nav-link",
    bn = ".nav-item",
    Sn = ".list-group-item",
    Dn = ".dropdown",
    In = ".dropdown-item",
    wn = ".dropdown-toggle",
    An = "offset",
    Nn = "position",
    On = (function () {
      function n(t, e) {
        var n = this;
        (this._element = t),
          (this._scrollElement = "BODY" === t.tagName ? window : t),
          (this._config = this._getConfig(e)),
          (this._selector =
            this._config.target +
            " " +
            Tn +
            "," +
            this._config.target +
            " " +
            Sn +
            "," +
            this._config.target +
            " " +
            In),
          (this._offsets = []),
          (this._targets = []),
          (this._activeTarget = null),
          (this._scrollHeight = 0),
          g(this._scrollElement).on(pn.SCROLL, function (t) {
            return n._process(t);
          }),
          this.refresh(),
          this._process();
      }
      var t = n.prototype;
      return (
        (t.refresh = function () {
          var e = this,
            t = this._scrollElement === this._scrollElement.window ? An : Nn,
            o = "auto" === this._config.method ? t : this._config.method,
            r = o === Nn ? this._getScrollTop() : 0;
          (this._offsets = []),
            (this._targets = []),
            (this._scrollHeight = this._getScrollHeight()),
            [].slice
              .call(document.querySelectorAll(this._selector))
              .map(function (t) {
                var e,
                  n = _.getSelectorFromElement(t);
                if ((n && (e = document.querySelector(n)), e)) {
                  var i = e.getBoundingClientRect();
                  if (i.width || i.height) return [g(e)[o]().top + r, n];
                }
                return null;
              })
              .filter(function (t) {
                return t;
              })
              .sort(function (t, e) {
                return t[0] - e[0];
              })
              .forEach(function (t) {
                e._offsets.push(t[0]), e._targets.push(t[1]);
              });
        }),
        (t.dispose = function () {
          g.removeData(this._element, fn),
            g(this._scrollElement).off(dn),
            (this._element = null),
            (this._scrollElement = null),
            (this._config = null),
            (this._selector = null),
            (this._offsets = null),
            (this._targets = null),
            (this._activeTarget = null),
            (this._scrollHeight = null);
        }),
        (t._getConfig = function (t) {
          if (
            "string" !=
            typeof (t = l({}, _n, {}, "object" == typeof t && t ? t : {}))
              .target
          ) {
            var e = g(t.target).attr("id");
            e || ((e = _.getUID(un)), g(t.target).attr("id", e)),
              (t.target = "#" + e);
          }
          return _.typeCheckConfig(un, t, mn), t;
        }),
        (t._getScrollTop = function () {
          return this._scrollElement === window
            ? this._scrollElement.pageYOffset
            : this._scrollElement.scrollTop;
        }),
        (t._getScrollHeight = function () {
          return (
            this._scrollElement.scrollHeight ||
            Math.max(
              document.body.scrollHeight,
              document.documentElement.scrollHeight
            )
          );
        }),
        (t._getOffsetHeight = function () {
          return this._scrollElement === window
            ? window.innerHeight
            : this._scrollElement.getBoundingClientRect().height;
        }),
        (t._process = function () {
          var t = this._getScrollTop() + this._config.offset,
            e = this._getScrollHeight(),
            n = this._config.offset + e - this._getOffsetHeight();
          if ((this._scrollHeight !== e && this.refresh(), n <= t)) {
            var i = this._targets[this._targets.length - 1];
            this._activeTarget !== i && this._activate(i);
          } else {
            if (
              this._activeTarget &&
              t < this._offsets[0] &&
              0 < this._offsets[0]
            )
              return (this._activeTarget = null), void this._clear();
            for (var o = this._offsets.length; o--; ) {
              this._activeTarget !== this._targets[o] &&
                t >= this._offsets[o] &&
                ("undefined" == typeof this._offsets[o + 1] ||
                  t < this._offsets[o + 1]) &&
                this._activate(this._targets[o]);
            }
          }
        }),
        (t._activate = function (e) {
          (this._activeTarget = e), this._clear();
          var t = this._selector.split(",").map(function (t) {
              return (
                t + '[data-target="' + e + '"],' + t + '[href="' + e + '"]'
              );
            }),
            n = g([].slice.call(document.querySelectorAll(t.join(","))));
          n.hasClass(vn)
            ? (n.closest(Dn).find(wn).addClass(yn), n.addClass(yn))
            : (n.addClass(yn),
              n
                .parents(Cn)
                .prev(Tn + ", " + Sn)
                .addClass(yn),
              n.parents(Cn).prev(bn).children(Tn).addClass(yn)),
            g(this._scrollElement).trigger(pn.ACTIVATE, { relatedTarget: e });
        }),
        (t._clear = function () {
          [].slice
            .call(document.querySelectorAll(this._selector))
            .filter(function (t) {
              return t.classList.contains(yn);
            })
            .forEach(function (t) {
              return t.classList.remove(yn);
            });
        }),
        (n._jQueryInterface = function (e) {
          return this.each(function () {
            var t = g(this).data(fn);
            if (
              (t ||
                ((t = new n(this, "object" == typeof e && e)),
                g(this).data(fn, t)),
              "string" == typeof e)
            ) {
              if ("undefined" == typeof t[e])
                throw new TypeError('No method named "' + e + '"');
              t[e]();
            }
          });
        }),
        s(n, null, [
          {
            key: "VERSION",
            get: function () {
              return "4.4.1";
            },
          },
          {
            key: "Default",
            get: function () {
              return _n;
            },
          },
        ]),
        n
      );
    })();
  g(window).on(pn.LOAD_DATA_API, function () {
    for (
      var t = [].slice.call(document.querySelectorAll(En)), e = t.length;
      e--;

    ) {
      var n = g(t[e]);
      On._jQueryInterface.call(n, n.data());
    }
  }),
    (g.fn[un] = On._jQueryInterface),
    (g.fn[un].Constructor = On),
    (g.fn[un].noConflict = function () {
      return (g.fn[un] = gn), On._jQueryInterface;
    });
  var kn = "bs.tab",
    Pn = "." + kn,
    Ln = g.fn.tab,
    jn = {
      HIDE: "hide" + Pn,
      HIDDEN: "hidden" + Pn,
      SHOW: "show" + Pn,
      SHOWN: "shown" + Pn,
      CLICK_DATA_API: "click" + Pn + ".data-api",
    },
    Hn = "dropdown-menu",
    Rn = "active",
    xn = "disabled",
    Fn = "fade",
    Un = "show",
    Wn = ".dropdown",
    qn = ".nav, .list-group",
    Mn = ".active",
    Kn = "> li > .active",
    Qn = '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]',
    Bn = ".dropdown-toggle",
    Vn = "> .dropdown-menu .active",
    Yn = (function () {
      function i(t) {
        this._element = t;
      }
      var t = i.prototype;
      return (
        (t.show = function () {
          var n = this;
          if (
            !(
              (this._element.parentNode &&
                this._element.parentNode.nodeType === Node.ELEMENT_NODE &&
                g(this._element).hasClass(Rn)) ||
              g(this._element).hasClass(xn)
            )
          ) {
            var t,
              i,
              e = g(this._element).closest(qn)[0],
              o = _.getSelectorFromElement(this._element);
            if (e) {
              var r = "UL" === e.nodeName || "OL" === e.nodeName ? Kn : Mn;
              i = (i = g.makeArray(g(e).find(r)))[i.length - 1];
            }
            var s = g.Event(jn.HIDE, { relatedTarget: this._element }),
              a = g.Event(jn.SHOW, { relatedTarget: i });
            if (
              (i && g(i).trigger(s),
              g(this._element).trigger(a),
              !a.isDefaultPrevented() && !s.isDefaultPrevented())
            ) {
              o && (t = document.querySelector(o)),
                this._activate(this._element, e);
              var l = function () {
                var t = g.Event(jn.HIDDEN, { relatedTarget: n._element }),
                  e = g.Event(jn.SHOWN, { relatedTarget: i });
                g(i).trigger(t), g(n._element).trigger(e);
              };
              t ? this._activate(t, t.parentNode, l) : l();
            }
          }
        }),
        (t.dispose = function () {
          g.removeData(this._element, kn), (this._element = null);
        }),
        (t._activate = function (t, e, n) {
          function i() {
            return o._transitionComplete(t, r, n);
          }
          var o = this,
            r = (
              !e || ("UL" !== e.nodeName && "OL" !== e.nodeName)
                ? g(e).children(Mn)
                : g(e).find(Kn)
            )[0],
            s = n && r && g(r).hasClass(Fn);
          if (r && s) {
            var a = _.getTransitionDurationFromElement(r);
            g(r)
              .removeClass(Un)
              .one(_.TRANSITION_END, i)
              .emulateTransitionEnd(a);
          } else i();
        }),
        (t._transitionComplete = function (t, e, n) {
          if (e) {
            g(e).removeClass(Rn);
            var i = g(e.parentNode).find(Vn)[0];
            i && g(i).removeClass(Rn),
              "tab" === e.getAttribute("role") &&
                e.setAttribute("aria-selected", !1);
          }
          if (
            (g(t).addClass(Rn),
            "tab" === t.getAttribute("role") &&
              t.setAttribute("aria-selected", !0),
            _.reflow(t),
            t.classList.contains(Fn) && t.classList.add(Un),
            t.parentNode && g(t.parentNode).hasClass(Hn))
          ) {
            var o = g(t).closest(Wn)[0];
            if (o) {
              var r = [].slice.call(o.querySelectorAll(Bn));
              g(r).addClass(Rn);
            }
            t.setAttribute("aria-expanded", !0);
          }
          n && n();
        }),
        (i._jQueryInterface = function (n) {
          return this.each(function () {
            var t = g(this),
              e = t.data(kn);
            if (
              (e || ((e = new i(this)), t.data(kn, e)), "string" == typeof n)
            ) {
              if ("undefined" == typeof e[n])
                throw new TypeError('No method named "' + n + '"');
              e[n]();
            }
          });
        }),
        s(i, null, [
          {
            key: "VERSION",
            get: function () {
              return "4.4.1";
            },
          },
        ]),
        i
      );
    })();
  g(document).on(jn.CLICK_DATA_API, Qn, function (t) {
    t.preventDefault(), Yn._jQueryInterface.call(g(this), "show");
  }),
    (g.fn.tab = Yn._jQueryInterface),
    (g.fn.tab.Constructor = Yn),
    (g.fn.tab.noConflict = function () {
      return (g.fn.tab = Ln), Yn._jQueryInterface;
    });
  var zn = "toast",
    Xn = "bs.toast",
    $n = "." + Xn,
    Gn = g.fn[zn],
    Jn = {
      CLICK_DISMISS: "click.dismiss" + $n,
      HIDE: "hide" + $n,
      HIDDEN: "hidden" + $n,
      SHOW: "show" + $n,
      SHOWN: "shown" + $n,
    },
    Zn = "fade",
    ti = "hide",
    ei = "show",
    ni = "showing",
    ii = { animation: "boolean", autohide: "boolean", delay: "number" },
    oi = { animation: !0, autohide: !0, delay: 500 },
    ri = '[data-dismiss="toast"]',
    si = (function () {
      function i(t, e) {
        (this._element = t),
          (this._config = this._getConfig(e)),
          (this._timeout = null),
          this._setListeners();
      }
      var t = i.prototype;
      return (
        (t.show = function () {
          var t = this,
            e = g.Event(Jn.SHOW);
          if ((g(this._element).trigger(e), !e.isDefaultPrevented())) {
            this._config.animation && this._element.classList.add(Zn);
            var n = function () {
              t._element.classList.remove(ni),
                t._element.classList.add(ei),
                g(t._element).trigger(Jn.SHOWN),
                t._config.autohide &&
                  (t._timeout = setTimeout(function () {
                    t.hide();
                  }, t._config.delay));
            };
            if (
              (this._element.classList.remove(ti),
              _.reflow(this._element),
              this._element.classList.add(ni),
              this._config.animation)
            ) {
              var i = _.getTransitionDurationFromElement(this._element);
              g(this._element).one(_.TRANSITION_END, n).emulateTransitionEnd(i);
            } else n();
          }
        }),
        (t.hide = function () {
          if (this._element.classList.contains(ei)) {
            var t = g.Event(Jn.HIDE);
            g(this._element).trigger(t),
              t.isDefaultPrevented() || this._close();
          }
        }),
        (t.dispose = function () {
          clearTimeout(this._timeout),
            (this._timeout = null),
            this._element.classList.contains(ei) &&
              this._element.classList.remove(ei),
            g(this._element).off(Jn.CLICK_DISMISS),
            g.removeData(this._element, Xn),
            (this._element = null),
            (this._config = null);
        }),
        (t._getConfig = function (t) {
          return (
            (t = l(
              {},
              oi,
              {},
              g(this._element).data(),
              {},
              "object" == typeof t && t ? t : {}
            )),
            _.typeCheckConfig(zn, t, this.constructor.DefaultType),
            t
          );
        }),
        (t._setListeners = function () {
          var t = this;
          g(this._element).on(Jn.CLICK_DISMISS, ri, function () {
            return t.hide();
          });
        }),
        (t._close = function () {
          function t() {
            e._element.classList.add(ti), g(e._element).trigger(Jn.HIDDEN);
          }
          var e = this;
          if ((this._element.classList.remove(ei), this._config.animation)) {
            var n = _.getTransitionDurationFromElement(this._element);
            g(this._element).one(_.TRANSITION_END, t).emulateTransitionEnd(n);
          } else t();
        }),
        (i._jQueryInterface = function (n) {
          return this.each(function () {
            var t = g(this),
              e = t.data(Xn);
            if (
              (e ||
                ((e = new i(this, "object" == typeof n && n)), t.data(Xn, e)),
              "string" == typeof n)
            ) {
              if ("undefined" == typeof e[n])
                throw new TypeError('No method named "' + n + '"');
              e[n](this);
            }
          });
        }),
        s(i, null, [
          {
            key: "VERSION",
            get: function () {
              return "4.4.1";
            },
          },
          {
            key: "DefaultType",
            get: function () {
              return ii;
            },
          },
          {
            key: "Default",
            get: function () {
              return oi;
            },
          },
        ]),
        i
      );
    })();
  (g.fn[zn] = si._jQueryInterface),
    (g.fn[zn].Constructor = si),
    (g.fn[zn].noConflict = function () {
      return (g.fn[zn] = Gn), si._jQueryInterface;
    }),
    (t.Alert = v),
    (t.Button = H),
    (t.Carousel = ut),
    (t.Collapse = wt),
    (t.Dropdown = ee),
    (t.Modal = Te),
    (t.Popover = hn),
    (t.Scrollspy = On),
    (t.Tab = Yn),
    (t.Toast = si),
    (t.Tooltip = Xe),
    (t.Util = _),
    Object.defineProperty(t, "__esModule", { value: !0 });
});
/*** sidr - v2.2.1 */
!(function () {
  "use strict";
  function a(a, b, c) {
    var d = new o(b);
    switch (a) {
      case "open":
        d.open(c);
        break;
      case "close":
        d.close(c);
        break;
      case "toggle":
        d.toggle(c);
        break;
      default:
        p.error("Method " + a + " does not exist on jQuery.sidr");
    }
  }
  function b(a) {
    return "status" === a
      ? h
      : s[a]
      ? s[a].apply(this, Array.prototype.slice.call(arguments, 1))
      : "function" != typeof a && "string" != typeof a && a
      ? void q.error("Method " + a + " does not exist on jQuery.sidr")
      : s.toggle.apply(this, arguments);
  }
  function c(a, b) {
    if ("function" == typeof b.source) {
      var c = b.source(name);
      a.html(c);
    } else if ("string" == typeof b.source && i.isUrl(b.source))
      u.get(b.source, function (b) {
        a.html(b);
      });
    else if ("string" == typeof b.source) {
      var d = "",
        e = b.source.split(",");
      if (
        (u.each(e, function (a, b) {
          d += '<div class="sidr-inner">' + u(b).html() + "</div>";
        }),
        b.renaming)
      ) {
        var f = u("<div />").html(d);
        f.find("*").each(function (a, b) {
          var c = u(b);
          i.addPrefixes(c);
        }),
          (d = f.html());
      }
      a.html(d);
    } else null !== b.source && u.error("Invalid Sidr Source");
    return a;
  }
  function d(a) {
    var d = i.transitions,
      e = u.extend(
        {
          name: "sidr",
          speed: 200,
          side: "left",
          source: null,
          renaming: !0,
          body: "body",
          displace: !0,
          timing: "ease",
          method: "toggle",
          bind: "touchstart click",
          onOpen: function () {},
          onClose: function () {},
          onOpenEnd: function () {},
          onCloseEnd: function () {},
        },
        a
      ),
      f = e.name,
      g = u("#" + f);
    return (
      0 === g.length && (g = u("<div />").attr("id", f).appendTo(u("body"))),
      d.supported &&
        g.css(d.property, e.side + " " + e.speed / 1e3 + "s " + e.timing),
      g
        .addClass("sidr")
        .addClass(e.side)
        .data({
          speed: e.speed,
          side: e.side,
          body: e.body,
          displace: e.displace,
          timing: e.timing,
          method: e.method,
          onOpen: e.onOpen,
          onClose: e.onClose,
          onOpenEnd: e.onOpenEnd,
          onCloseEnd: e.onCloseEnd,
        }),
      (g = c(g, e)),
      this.each(function () {
        var a = u(this),
          c = a.data("sidr"),
          d = !1;
        c ||
          ((h.moving = !1),
          (h.opened = !1),
          a.data("sidr", f),
          a.bind(e.bind, function (a) {
            a.preventDefault(),
              d ||
                ((d = !0),
                b(e.method, f),
                setTimeout(function () {
                  d = !1;
                }, 100));
          }));
      })
    );
  }
  var e = {};
  (e.classCallCheck = function (a, b) {
    if (!(a instanceof b))
      throw new TypeError("Cannot call a class as a function");
  }),
    (e.createClass = (function () {
      function a(a, b) {
        for (var c = 0; c < b.length; c++) {
          var d = b[c];
          (d.enumerable = d.enumerable || !1),
            (d.configurable = !0),
            "value" in d && (d.writable = !0),
            Object.defineProperty(a, d.key, d);
        }
      }
      return function (b, c, d) {
        return c && a(b.prototype, c), d && a(b, d), b;
      };
    })());
  var f,
    g,
    h = { moving: !1, opened: !1 },
    i = {
      isUrl: function (a) {
        var b = new RegExp(
          "^(https?:\\/\\/)?((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\d%_.~+=-]*)?(\\#[-a-z\\d_]*)?$",
          "i"
        );
        return b.test(a) ? !0 : !1;
      },
      addPrefixes: function (a) {
        this.addPrefix(a, "id"),
          this.addPrefix(a, "class"),
          a.removeAttr("style");
      },
      addPrefix: function (a, b) {
        var c = a.attr(b);
        "string" == typeof c &&
          "" !== c &&
          "sidr-inner" !== c &&
          a.attr(b, c.replace(/([A-Za-z0-9_.\-]+)/g, "sidr-" + b + "-$1"));
      },
      transitions: (function () {
        var a = document.body || document.documentElement,
          b = a.style,
          c = !1,
          d = "transition";
        return (
          d in b
            ? (c = !0)
            : !(function () {
                var a = ["moz", "webkit", "o", "ms"],
                  e = void 0,
                  f = void 0;
                (d = d.charAt(0).toUpperCase() + d.substr(1)),
                  (c = (function () {
                    for (f = 0; f < a.length; f++)
                      if (((e = a[f]), e + d in b)) return !0;
                    return !1;
                  })()),
                  (d = c
                    ? "-" + e.toLowerCase() + "-" + d.toLowerCase()
                    : null);
              })(),
          { supported: c, property: d }
        );
      })(),
    },
    j = jQuery,
    k = "sidr-animating",
    l = "open",
    m = "close",
    n =
      "webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",
    o = (function () {
      function a(b) {
        e.classCallCheck(this, a),
          (this.name = b),
          (this.item = j("#" + b)),
          (this.openClass =
            "sidr" === b ? "sidr-open" : "sidr-open " + b + "-open"),
          (this.menuWidth = this.item.outerWidth(!0)),
          (this.speed = this.item.data("speed")),
          (this.side = this.item.data("side")),
          (this.displace = this.item.data("displace")),
          (this.timing = this.item.data("timing")),
          (this.method = this.item.data("method")),
          (this.onOpenCallback = this.item.data("onOpen")),
          (this.onCloseCallback = this.item.data("onClose")),
          (this.onOpenEndCallback = this.item.data("onOpenEnd")),
          (this.onCloseEndCallback = this.item.data("onCloseEnd")),
          (this.body = j(this.item.data("body")));
      }
      return (
        e.createClass(a, [
          {
            key: "getAnimation",
            value: function (a, b) {
              var c = {},
                d = this.side;
              return (
                "open" === a && "body" === b
                  ? (c[d] = this.menuWidth + "px")
                  : "close" === a && "menu" === b
                  ? (c[d] = "-" + this.menuWidth + "px")
                  : (c[d] = 0),
                c
              );
            },
          },
          {
            key: "prepareBody",
            value: function (a) {
              var b = "open" === a ? "hidden" : "";
              if (this.body.is("body")) {
                var c = j("html"),
                  d = c.scrollTop();
                c.css("overflow-x", b).scrollTop(d);
              }
            },
          },
          {
            key: "openBody",
            value: function () {
              if (this.displace) {
                var a = i.transitions,
                  b = this.body;
                if (a.supported)
                  b
                    .css(
                      a.property,
                      this.side + " " + this.speed / 1e3 + "s " + this.timing
                    )
                    .css(this.side, 0)
                    .css({ width: b.width(), position: "absolute" }),
                    b.css(this.side, this.menuWidth + "px");
                else {
                  var c = this.getAnimation(l, "body");
                  b.css({ width: b.width(), position: "absolute" }).animate(c, {
                    queue: !1,
                    duration: this.speed,
                  });
                }
              }
            },
          },
          {
            key: "onCloseBody",
            value: function () {
              var a = i.transitions,
                b = { width: "", position: "", right: "", left: "" };
              a.supported && (b[a.property] = ""), this.body.css(b).unbind(n);
            },
          },
          {
            key: "closeBody",
            value: function () {
              var a = this;
              if (this.displace)
                if (i.transitions.supported)
                  this.body.css(this.side, 0).one(n, function () {
                    a.onCloseBody();
                  });
                else {
                  var b = this.getAnimation(m, "body");
                  this.body.animate(b, {
                    queue: !1,
                    duration: this.speed,
                    complete: function () {
                      a.onCloseBody();
                    },
                  });
                }
            },
          },
          {
            key: "moveBody",
            value: function (a) {
              a === l ? this.openBody() : this.closeBody();
            },
          },
          {
            key: "onOpenMenu",
            value: function (a) {
              var b = this.name;
              (h.moving = !1),
                (h.opened = b),
                this.item.unbind(n),
                this.body.removeClass(k).addClass(this.openClass),
                this.onOpenEndCallback(),
                "function" == typeof a && a(b);
            },
          },
          {
            key: "openMenu",
            value: function (a) {
              var b = this,
                c = this.item;
              if (i.transitions.supported)
                c.css(this.side, 0).one(n, function () {
                  b.onOpenMenu(a);
                });
              else {
                var d = this.getAnimation(l, "menu");
                c.css("display", "block").animate(d, {
                  queue: !1,
                  duration: this.speed,
                  complete: function () {
                    b.onOpenMenu(a);
                  },
                });
              }
            },
          },
          {
            key: "onCloseMenu",
            value: function (a) {
              this.item.css({ left: "", right: "" }).unbind(n),
                j("html").css("overflow-x", ""),
                (h.moving = !1),
                (h.opened = !1),
                this.body.removeClass(k).removeClass(this.openClass),
                this.onCloseEndCallback(),
                "function" == typeof a && a(name);
            },
          },
          {
            key: "closeMenu",
            value: function (a) {
              var b = this,
                c = this.item;
              if (i.transitions.supported)
                c.css(this.side, "").one(n, function () {
                  b.onCloseMenu(a);
                });
              else {
                var d = this.getAnimation(m, "menu");
                c.animate(d, {
                  queue: !1,
                  duration: this.speed,
                  complete: function () {
                    b.onCloseMenu();
                  },
                });
              }
            },
          },
          {
            key: "moveMenu",
            value: function (a, b) {
              this.body.addClass(k),
                a === l ? this.openMenu(b) : this.closeMenu(b);
            },
          },
          {
            key: "move",
            value: function (a, b) {
              (h.moving = !0),
                this.prepareBody(a),
                this.moveBody(a),
                this.moveMenu(a, b);
            },
          },
          {
            key: "open",
            value: function (b) {
              var c = this;
              if (h.opened !== this.name && !h.moving) {
                if (h.opened !== !1) {
                  var d = new a(h.opened);
                  return void d.close(function () {
                    c.open(b);
                  });
                }
                this.move("open", b), this.onOpenCallback();
              }
            },
          },
          {
            key: "close",
            value: function (a) {
              h.opened !== this.name ||
                h.moving ||
                (this.move("close", a), this.onCloseCallback());
            },
          },
          {
            key: "toggle",
            value: function (a) {
              h.opened === this.name ? this.close(a) : this.open(a);
            },
          },
        ]),
        a
      );
    })(),
    p = jQuery,
    q = jQuery,
    r = ["open", "close", "toggle"],
    s = {},
    t = function (b) {
      return function (c, d) {
        "function" == typeof c ? ((d = c), (c = "sidr")) : c || (c = "sidr"),
          a(b, c, d);
      };
    };
  for (f = 0; f < r.length; f++) (g = r[f]), (s[g] = t(g));
  var u = jQuery;
  (jQuery.sidr = b), (jQuery.fn.sidr = d);
})();
/*** Sticky-kit v1.1.2 | WTFPL | Leaf Corcoran 2015 | http://leafo.net */
(function () {
  var t, i;
  (t = this.jQuery || window.jQuery),
    (i = t(window)),
    (t.fn.stick_in_parent = function (o) {
      var s, e, n, r, c, l, a, f, p, u, d;
      for (
        null == o && (o = {}),
          d = o.sticky_class,
          c = o.inner_scrolling,
          u = o.recalc_every,
          p = o.parent,
          f = o.offset_top,
          a = o.spacer,
          e = o.bottoming,
          null == f && (f = 0),
          null == p && (p = void 0),
          null == c && (c = !0),
          null == d && (d = "is_stuck"),
          s = t(document),
          null == e && (e = !0),
          n = function (o, n, r, l, h, g, k, m) {
            var v, y, _, b, w, x, z, C, I, A, j, M;
            if (!o.data("sticky_kit")) {
              if (
                (o.data("sticky_kit", !0),
                (w = s.height()),
                (z = o.parent()),
                null != p && (z = z.closest(p)),
                !z.length)
              )
                throw "failed to find stick parent";
              if (
                ((v = _ = !1),
                (j = null != a ? a && o.closest(a) : t("<div />")) &&
                  j.css("position", o.css("position")),
                (C = function () {
                  var t, i, e;
                  if (
                    !m &&
                    ((w = s.height()),
                    (t = parseInt(z.css("border-top-width"), 10)),
                    (i = parseInt(z.css("padding-top"), 10)),
                    (n = parseInt(z.css("padding-bottom"), 10)),
                    (r = z.offset().top + t + i),
                    (l = z.height()),
                    _ &&
                      ((v = _ = !1),
                      null == a && (o.insertAfter(j), j.detach()),
                      o
                        .css({ position: "", top: "", width: "", bottom: "" })
                        .removeClass(d),
                      (e = !0)),
                    (h =
                      o.offset().top -
                      (parseInt(o.css("margin-top"), 10) || 0) -
                      f),
                    (g = o.outerHeight(!0)),
                    (k = o.css("float")),
                    j &&
                      j.css({
                        width: o.outerWidth(!0),
                        height: g,
                        display: o.css("display"),
                        "vertical-align": o.css("vertical-align"),
                        float: k,
                        "z-index": "-1",
                      }),
                    e)
                  )
                    return M();
                })(),
                g !== l)
              )
                return (
                  (b = void 0),
                  (x = f),
                  (A = u),
                  (M = function () {
                    var t, p, y, I;
                    if (
                      !m &&
                      ((y = !1),
                      null != A && 0 >= --A && ((A = u), C(), (y = !0)),
                      y || s.height() === w || C(),
                      (y = i.scrollTop()),
                      null != b && (p = y - b),
                      (b = y),
                      _
                        ? (e &&
                            ((I = y + g + x > l + r),
                            v &&
                              !I &&
                              ((v = !1),
                              o
                                .css({ position: "fixed", bottom: "", top: x })
                                .trigger("sticky_kit:unbottom"))),
                          y < h &&
                            ((_ = !1),
                            (x = f),
                            null == a &&
                              (("left" !== k && "right" !== k) ||
                                o.insertAfter(j),
                              j.detach()),
                            (t = { position: "", width: "", top: "" }),
                            o
                              .css(t)
                              .removeClass(d)
                              .trigger("sticky_kit:unstick")),
                          c &&
                            ((t = i.height()),
                            g + f > t &&
                              !v &&
                              ((x -= p),
                              (x = Math.max(t - g, x)),
                              (x = Math.min(f, x)),
                              _ && o.css({ top: x + "px" }))))
                        : y > h &&
                          ((_ = !0),
                          ((t = { position: "fixed", top: x }).width =
                            "border-box" === o.css("box-sizing")
                              ? o.outerWidth() + "px"
                              : o.width() + "px"),
                          o.css(t).addClass(d),
                          null == a &&
                            (o.after(j),
                            ("left" !== k && "right" !== k) || j.append(o)),
                          o.trigger("sticky_kit:stick")),
                      _ && e && (null == I && (I = y + g + x > l + r), !v && I))
                    )
                      return (
                        (v = !0),
                        "static" === z.css("position") &&
                          z.css({ position: "relative" }),
                        o
                          .css({ position: "absolute", bottom: n, top: "auto" })
                          .trigger("sticky_kit:bottom")
                      );
                  }),
                  (I = function () {
                    return C(), M();
                  }),
                  (y = function () {
                    if (
                      ((m = !0),
                      i.off("touchmove", M),
                      i.off("scroll", M),
                      i.off("resize", I),
                      t(document.body).off("sticky_kit:recalc", I),
                      o.off("sticky_kit:detach", y),
                      o.removeData("sticky_kit"),
                      o.css({ position: "", bottom: "", top: "", width: "" }),
                      z.position("position", ""),
                      _)
                    )
                      return (
                        null == a &&
                          (("left" !== k && "right" !== k) || o.insertAfter(j),
                          j.remove()),
                        o.removeClass(d)
                      );
                  }),
                  i.on("touchmove", M),
                  i.on("scroll", M),
                  i.on("resize", I),
                  t(document.body).on("sticky_kit:recalc", I),
                  o.on("sticky_kit:detach", y),
                  setTimeout(M, 0)
                );
            }
          },
          r = 0,
          l = this.length;
        r < l;
        r++
      )
        (o = this[r]), n(t(o));
      return this;
    });
}).call(this);
/*** Rellax */
(function (q, g) {
  "function" === typeof define && define.amd
    ? define([], g)
    : "object" === typeof module && module.exports
    ? (module.exports = g())
    : (q.Rellax = g());
})("undefined" !== typeof window ? window : global, function () {
  var q = function (g, u) {
    function C() {
      if (
        3 === a.options.breakpoints.length &&
        Array.isArray(a.options.breakpoints)
      ) {
        var f = !0,
          c = !0,
          b;
        a.options.breakpoints.forEach(function (a) {
          "number" !== typeof a && (c = !1);
          null !== b && a < b && (f = !1);
          b = a;
        });
        if (f && c) return;
      }
      a.options.breakpoints = [576, 768, 1201];
      console.warn(
        "Rellax: You must pass an array of 3 numbers in ascending order to the breakpoints option. Defaults reverted"
      );
    }
    var a = Object.create(q.prototype),
      l = 0,
      v = 0,
      m = 0,
      n = 0,
      d = [],
      w = !0,
      A =
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        function (a) {
          return setTimeout(a, 1e3 / 60);
        },
      p = null,
      x = !1;
    try {
      var k = Object.defineProperty({}, "passive", {
        get: function () {
          x = !0;
        },
      });
      window.addEventListener("testPassive", null, k);
      window.removeEventListener("testPassive", null, k);
    } catch (f) {}
    var D =
        window.cancelAnimationFrame ||
        window.mozCancelAnimationFrame ||
        clearTimeout,
      E =
        window.transformProp ||
        (function () {
          var a = document.createElement("div");
          if (null === a.style.transform) {
            var c = ["Webkit", "Moz", "ms"],
              b;
            for (b in c)
              if (void 0 !== a.style[c[b] + "Transform"])
                return c[b] + "Transform";
          }
          return "transform";
        })();
    a.options = {
      speed: -2,
      verticalSpeed: null,
      horizontalSpeed: null,
      breakpoints: [576, 768, 1201],
      center: !1,
      wrapper: null,
      relativeToWrapper: !1,
      round: !0,
      vertical: !0,
      horizontal: !1,
      verticalScrollAxis: "y",
      horizontalScrollAxis: "x",
      callback: function () {},
    };
    u &&
      Object.keys(u).forEach(function (d) {
        a.options[d] = u[d];
      });
    u && u.breakpoints && C();
    g || (g = ".rellax");
    k = "string" === typeof g ? document.querySelectorAll(g) : [g];
    if (0 < k.length) {
      a.elems = k;
      if (a.options.wrapper && !a.options.wrapper.nodeType)
        if ((k = document.querySelector(a.options.wrapper)))
          a.options.wrapper = k;
        else {
          console.warn(
            "Rellax: The wrapper you're trying to use doesn't exist."
          );
          return;
        }
      var F,
        B = function () {
          for (var f = 0; f < d.length; f++)
            a.elems[f].style.cssText = d[f].style;
          d = [];
          v = window.innerHeight;
          n = window.innerWidth;
          f = a.options.breakpoints;
          F =
            n < f[0]
              ? "xs"
              : n >= f[0] && n < f[1]
              ? "sm"
              : n >= f[1] && n < f[2]
              ? "md"
              : "lg";
          H();
          for (f = 0; f < a.elems.length; f++) {
            var c = void 0,
              b = a.elems[f],
              e = b.getAttribute("data-rellax-percentage"),
              y = b.getAttribute("data-rellax-speed"),
              t = b.getAttribute("data-rellax-xs-speed"),
              g = b.getAttribute("data-rellax-mobile-speed"),
              h = b.getAttribute("data-rellax-tablet-speed"),
              k = b.getAttribute("data-rellax-desktop-speed"),
              l = b.getAttribute("data-rellax-vertical-speed"),
              m = b.getAttribute("data-rellax-horizontal-speed"),
              p = b.getAttribute("data-rellax-vertical-scroll-axis"),
              q = b.getAttribute("data-rellax-horizontal-scroll-axis"),
              u = b.getAttribute("data-rellax-zindex") || 0,
              x = b.getAttribute("data-rellax-min"),
              A = b.getAttribute("data-rellax-max"),
              C = b.getAttribute("data-rellax-min-x"),
              D = b.getAttribute("data-rellax-max-x"),
              E = b.getAttribute("data-rellax-min-y"),
              L = b.getAttribute("data-rellax-max-y"),
              r = !0;
            t || g || h || k ? (c = { xs: t, sm: g, md: h, lg: k }) : (r = !1);
            t = a.options.wrapper
              ? a.options.wrapper.scrollTop
              : window.pageYOffset ||
                document.documentElement.scrollTop ||
                document.body.scrollTop;
            a.options.relativeToWrapper &&
              (t =
                (window.pageYOffset ||
                  document.documentElement.scrollTop ||
                  document.body.scrollTop) - a.options.wrapper.offsetTop);
            var z = a.options.vertical ? (e || a.options.center ? t : 0) : 0,
              I = a.options.horizontal
                ? e || a.options.center
                  ? a.options.wrapper
                    ? a.options.wrapper.scrollLeft
                    : window.pageXOffset ||
                      document.documentElement.scrollLeft ||
                      document.body.scrollLeft
                  : 0
                : 0;
            t = z + b.getBoundingClientRect().top;
            g = b.clientHeight || b.offsetHeight || b.scrollHeight;
            h = I + b.getBoundingClientRect().left;
            k = b.clientWidth || b.offsetWidth || b.scrollWidth;
            z = e ? e : (z - t + v) / (g + v);
            e = e ? e : (I - h + n) / (k + n);
            a.options.center && (z = e = 0.5);
            c = r && null !== c[F] ? Number(c[F]) : y ? y : a.options.speed;
            l = l ? l : a.options.verticalSpeed;
            m = m ? m : a.options.horizontalSpeed;
            p = p ? p : a.options.verticalScrollAxis;
            q = q ? q : a.options.horizontalScrollAxis;
            y = J(e, z, c, l, m);
            b = b.style.cssText;
            r = "";
            if ((e = /transform\s*:/i.exec(b)))
              (r = b.slice(e.index)),
                (r = (e = r.indexOf(";"))
                  ? " " + r.slice(11, e).replace(/\s/g, "")
                  : " " + r.slice(11).replace(/\s/g, ""));
            d.push({
              baseX: y.x,
              baseY: y.y,
              top: t,
              left: h,
              height: g,
              width: k,
              speed: c,
              verticalSpeed: l,
              horizontalSpeed: m,
              verticalScrollAxis: p,
              horizontalScrollAxis: q,
              style: b,
              transform: r,
              zindex: u,
              min: x,
              max: A,
              minX: C,
              maxX: D,
              minY: E,
              maxY: L,
            });
          }
          K();
          w && (window.addEventListener("resize", B), (w = !1), G());
        },
        H = function () {
          var d = l,
            c = m;
          l = a.options.wrapper
            ? a.options.wrapper.scrollTop
            : (
                document.documentElement ||
                document.body.parentNode ||
                document.body
              ).scrollTop || window.pageYOffset;
          m = a.options.wrapper
            ? a.options.wrapper.scrollLeft
            : (
                document.documentElement ||
                document.body.parentNode ||
                document.body
              ).scrollLeft || window.pageXOffset;
          a.options.relativeToWrapper &&
            (l =
              ((
                document.documentElement ||
                document.body.parentNode ||
                document.body
              ).scrollTop || window.pageYOffset) - a.options.wrapper.offsetTop);
          return (d != l && a.options.vertical) ||
            (c != m && a.options.horizontal)
            ? !0
            : !1;
        },
        J = function (d, c, b, e, g) {
          var f = {};
          d = 100 * (g ? g : b) * (1 - d);
          c = 100 * (e ? e : b) * (1 - c);
          f.x = a.options.round ? Math.round(d) : Math.round(100 * d) / 100;
          f.y = a.options.round ? Math.round(c) : Math.round(100 * c) / 100;
          return f;
        },
        h = function () {
          window.removeEventListener("resize", h);
          window.removeEventListener("orientationchange", h);
          (a.options.wrapper ? a.options.wrapper : window).removeEventListener(
            "scroll",
            h
          );
          (a.options.wrapper
            ? a.options.wrapper
            : document
          ).removeEventListener("touchmove", h);
          p = A(G);
        },
        G = function () {
          H() && !1 === w
            ? (K(), (p = A(G)))
            : ((p = null),
              window.addEventListener("resize", h),
              window.addEventListener("orientationchange", h),
              (a.options.wrapper ? a.options.wrapper : window).addEventListener(
                "scroll",
                h,
                x ? { passive: !0 } : !1
              ),
              (a.options.wrapper
                ? a.options.wrapper
                : document
              ).addEventListener("touchmove", h, x ? { passive: !0 } : !1));
        },
        K = function () {
          for (var f, c = 0; c < a.elems.length; c++) {
            var b = d[c].verticalScrollAxis.toLowerCase(),
              e = d[c].horizontalScrollAxis.toLowerCase();
            f = -1 != b.indexOf("x") ? l : 0;
            b = -1 != b.indexOf("y") ? l : 0;
            var g = -1 != e.indexOf("x") ? m : 0;
            e = -1 != e.indexOf("y") ? m : 0;
            f = J(
              (f + g - d[c].left + n) / (d[c].width + n),
              (b + e - d[c].top + v) / (d[c].height + v),
              d[c].speed,
              d[c].verticalSpeed,
              d[c].horizontalSpeed
            );
            e = f.y - d[c].baseY;
            b = f.x - d[c].baseX;
            null !== d[c].min &&
              (a.options.vertical &&
                !a.options.horizontal &&
                (e = e <= d[c].min ? d[c].min : e),
              a.options.horizontal &&
                !a.options.vertical &&
                (b = b <= d[c].min ? d[c].min : b));
            null != d[c].minY && (e = e <= d[c].minY ? d[c].minY : e);
            null != d[c].minX && (b = b <= d[c].minX ? d[c].minX : b);
            null !== d[c].max &&
              (a.options.vertical &&
                !a.options.horizontal &&
                (e = e >= d[c].max ? d[c].max : e),
              a.options.horizontal &&
                !a.options.vertical &&
                (b = b >= d[c].max ? d[c].max : b));
            null != d[c].maxY && (e = e >= d[c].maxY ? d[c].maxY : e);
            null != d[c].maxX && (b = b >= d[c].maxX ? d[c].maxX : b);
            a.elems[c].style[E] =
              "translate3d(" +
              (a.options.horizontal ? b : "0") +
              "px," +
              (a.options.vertical ? e : "0") +
              "px," +
              d[c].zindex +
              "px) " +
              d[c].transform;
          }
          a.options.callback(f);
        };
      a.destroy = function () {
        for (var f = 0; f < a.elems.length; f++)
          a.elems[f].style.cssText = d[f].style;
        w || (window.removeEventListener("resize", B), (w = !0));
        D(p);
        p = null;
      };
      B();
      a.refresh = B;
      return a;
    }
    console.warn("Rellax: The elements you're trying to select don't exist.");
  };
  return q;
});
/*** jQuery easing */
(function (factory) {
  if (typeof define === "function" && define.amd) {
    define(["jquery"], function ($) {
      return factory($);
    });
  } else if (typeof module === "object" && typeof module.exports === "object") {
    exports = factory(require("jquery"));
  } else {
    factory(jQuery);
  }
})(function ($) {
  $.easing.jswing = $.easing.swing;
  var pow = Math.pow,
    sqrt = Math.sqrt,
    sin = Math.sin,
    cos = Math.cos,
    PI = Math.PI,
    c1 = 1.70158,
    c2 = c1 * 1.525,
    c3 = c1 + 1,
    c4 = (2 * PI) / 3,
    c5 = (2 * PI) / 4.5;
  function bounceOut(x) {
    var n1 = 7.5625,
      d1 = 2.75;
    if (x < 1 / d1) {
      return n1 * x * x;
    } else if (x < 2 / d1) {
      return n1 * (x -= 1.5 / d1) * x + 0.75;
    } else if (x < 2.5 / d1) {
      return n1 * (x -= 2.25 / d1) * x + 0.9375;
    } else {
      return n1 * (x -= 2.625 / d1) * x + 0.984375;
    }
  }
  $.extend($.easing, {
    def: "easeOutQuad",
    swing: function (x) {
      return $.easing[$.easing.def](x);
    },
    easeInQuad: function (x) {
      return x * x;
    },
    easeOutQuad: function (x) {
      return 1 - (1 - x) * (1 - x);
    },
    easeInOutQuad: function (x) {
      return x < 0.5 ? 2 * x * x : 1 - pow(-2 * x + 2, 2) / 2;
    },
    easeInCubic: function (x) {
      return x * x * x;
    },
    easeOutCubic: function (x) {
      return 1 - pow(1 - x, 3);
    },
    easeInOutCubic: function (x) {
      return x < 0.5 ? 4 * x * x * x : 1 - pow(-2 * x + 2, 3) / 2;
    },
    easeInQuart: function (x) {
      return x * x * x * x;
    },
    easeOutQuart: function (x) {
      return 1 - pow(1 - x, 4);
    },
    easeInOutQuart: function (x) {
      return x < 0.5 ? 8 * x * x * x * x : 1 - pow(-2 * x + 2, 4) / 2;
    },
    easeInQuint: function (x) {
      return x * x * x * x * x;
    },
    easeOutQuint: function (x) {
      return 1 - pow(1 - x, 5);
    },
    easeInOutQuint: function (x) {
      return x < 0.5 ? 16 * x * x * x * x * x : 1 - pow(-2 * x + 2, 5) / 2;
    },
    easeInSine: function (x) {
      return 1 - cos((x * PI) / 2);
    },
    easeOutSine: function (x) {
      return sin((x * PI) / 2);
    },
    easeInOutSine: function (x) {
      return -(cos(PI * x) - 1) / 2;
    },
    easeInExpo: function (x) {
      return x === 0 ? 0 : pow(2, 10 * x - 10);
    },
    easeOutExpo: function (x) {
      return x === 1 ? 1 : 1 - pow(2, -10 * x);
    },
    easeInOutExpo: function (x) {
      return x === 0
        ? 0
        : x === 1
        ? 1
        : x < 0.5
        ? pow(2, 20 * x - 10) / 2
        : (2 - pow(2, -20 * x + 10)) / 2;
    },
    easeInCirc: function (x) {
      return 1 - sqrt(1 - pow(x, 2));
    },
    easeOutCirc: function (x) {
      return sqrt(1 - pow(x - 1, 2));
    },
    easeInOutCirc: function (x) {
      return x < 0.5
        ? (1 - sqrt(1 - pow(2 * x, 2))) / 2
        : (sqrt(1 - pow(-2 * x + 2, 2)) + 1) / 2;
    },
    easeInElastic: function (x) {
      return x === 0
        ? 0
        : x === 1
        ? 1
        : -pow(2, 10 * x - 10) * sin((x * 10 - 10.75) * c4);
    },
    easeOutElastic: function (x) {
      return x === 0
        ? 0
        : x === 1
        ? 1
        : pow(2, -10 * x) * sin((x * 10 - 0.75) * c4) + 1;
    },
    easeInOutElastic: function (x) {
      return x === 0
        ? 0
        : x === 1
        ? 1
        : x < 0.5
        ? -(pow(2, 20 * x - 10) * sin((20 * x - 11.125) * c5)) / 2
        : (pow(2, -20 * x + 10) * sin((20 * x - 11.125) * c5)) / 2 + 1;
    },
    easeInBack: function (x) {
      return c3 * x * x * x - c1 * x * x;
    },
    easeOutBack: function (x) {
      return 1 + c3 * pow(x - 1, 3) + c1 * pow(x - 1, 2);
    },
    easeInOutBack: function (x) {
      return x < 0.5
        ? (pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2)) / 2
        : (pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2;
    },
    easeInBounce: function (x) {
      return 1 - bounceOut(1 - x);
    },
    easeOutBounce: bounceOut,
    easeInOutBounce: function (x) {
      return x < 0.5
        ? (1 - bounceOut(1 - 2 * x)) / 2
        : (1 + bounceOut(2 * x - 1)) / 2;
    },
  });
});
/*** LoadingOverlay - A flexible loading overlay jQuery plugin - Author : Gaspare Sganga - Version : 2.1.7 */
!(function (e) {
  "function" == typeof define && define.amd
    ? define(["jquery"], e)
    : "object" == typeof module && module.exports
    ? e(require("jquery"))
    : e(jQuery);
})(function (g, a) {
  "use strict";
  var t = {
      background: "rgba(255, 255, 255, 0.8)",
      backgroundClass: "",
      image:
        "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1000 1000'><circle r='80' cx='500' cy='90'/><circle r='80' cx='500' cy='910'/><circle r='80' cx='90' cy='500'/><circle r='80' cx='910' cy='500'/><circle r='80' cx='212' cy='212'/><circle r='80' cx='788' cy='212'/><circle r='80' cx='212' cy='788'/><circle r='80' cx='788' cy='788'/></svg>",
      imageAnimation: "2000ms rotate_right",
      imageAutoResize: !0,
      imageResizeFactor: 1,
      imageColor: "#202020",
      imageClass: "",
      imageOrder: 1,
      fontawesome: "",
      fontawesomeAnimation: "",
      fontawesomeAutoResize: !0,
      fontawesomeResizeFactor: 1,
      fontawesomeColor: "#202020",
      fontawesomeOrder: 2,
      custom: "",
      customAnimation: "",
      customAutoResize: !0,
      customResizeFactor: 1,
      customOrder: 3,
      text: "",
      textAnimation: "",
      textAutoResize: !0,
      textResizeFactor: 0.5,
      textColor: "#202020",
      textClass: "",
      textOrder: 4,
      progress: !1,
      progressAutoResize: !0,
      progressResizeFactor: 0.25,
      progressColor: "#a0a0a0",
      progressClass: "",
      progressOrder: 5,
      progressFixedPosition: "",
      progressSpeed: 200,
      progressMin: 0,
      progressMax: 100,
      size: 50,
      maxSize: 120,
      minSize: 20,
      direction: "column",
      fade: !0,
      resizeInterval: 50,
      zIndex: 2147483647,
    },
    c = {
      overlay: {
        "box-sizing": "border-box",
        position: "relative",
        display: "flex",
        "flex-wrap": "nowrap",
        "align-items": "center",
        "justify-content": "space-around",
      },
      element: {
        "box-sizing": "border-box",
        overflow: "visible",
        flex: "0 0 auto",
        display: "flex",
        "justify-content": "center",
        "align-items": "center",
      },
      element_svg: { width: "100%", height: "100%" },
      progress_fixed: { position: "absolute", left: "0", width: "100%" },
      progress_wrapper: {
        position: "absolute",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
      },
      progress_bar: { position: "absolute", left: "0" },
    },
    n = {
      count: 0,
      container: a,
      settings: a,
      wholePage: a,
      resizeIntervalId: a,
      text: a,
      progress: a,
    },
    s = {
      animations: ["rotate_right", "rotate_left", "fadein", "pulse"],
      progressPosition: ["top", "bottom"],
    },
    d = {
      animations: { name: "rotate_right", time: "2000ms" },
      fade: [400, 200],
    };
  function o(e, s) {
    (e = g(e)),
      (s.size = w(s.size)),
      (s.maxSize = parseInt(s.maxSize, 10) || 0),
      (s.minSize = parseInt(s.minSize, 10) || 0),
      (s.resizeInterval = parseInt(s.resizeInterval, 10) || 0);
    var t = p(e),
      a = u(e);
    if (!1 === a) {
      if (
        (((a = g.extend({}, n)).container = e),
        (a.wholePage = e.is("body")),
        (t = g("<div>", { class: "loadingoverlay" })
          .css(c.overlay)
          .css(
            "flex-direction",
            "row" === s.direction.toLowerCase() ? "row" : "column"
          )),
        s.backgroundClass
          ? t.addClass(s.backgroundClass)
          : t.css("background", s.background),
        a.wholePage &&
          t.css({
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }),
        void 0 !== s.zIndex && t.css("z-index", s.zIndex),
        s.image)
      ) {
        g.isArray(s.imageColor)
          ? 0 === s.imageColor.length
            ? (s.imageColor = !1)
            : 1 === s.imageColor.length
            ? (s.imageColor = { fill: s.imageColor[0] })
            : (s.imageColor = {
                fill: s.imageColor[0],
                stroke: s.imageColor[1],
              })
          : s.imageColor && (s.imageColor = { fill: s.imageColor });
        var o = v(
          t,
          s.imageOrder,
          s.imageAutoResize,
          s.imageResizeFactor,
          s.imageAnimation
        );
        "<svg" === s.image.slice(0, 4).toLowerCase() &&
        "</svg>" === s.image.slice(-6).toLowerCase()
          ? (o.append(s.image),
            o.children().css(c.element_svg),
            !s.imageClass && s.imageColor && o.find("*").css(s.imageColor))
          : ".svg" === s.image.slice(-4).toLowerCase() ||
            "data:image/svg" === s.image.slice(0, 14).toLowerCase()
          ? g
              .ajax({ url: s.image, type: "GET", dataType: "html", global: !1 })
              .done(function (e) {
                o.html(e),
                  o.children().css(c.element_svg),
                  !s.imageClass &&
                    s.imageColor &&
                    o.find("*").css(s.imageColor);
              })
          : o.css({
              "background-image": "url(" + s.image + ")",
              "background-position": "center",
              "background-repeat": "no-repeat",
              "background-size": "cover",
            }),
          s.imageClass && o.addClass(s.imageClass);
      }
      if (s.fontawesome) {
        o = v(
          t,
          s.fontawesomeOrder,
          s.fontawesomeAutoResize,
          s.fontawesomeResizeFactor,
          s.fontawesomeAnimation
        ).addClass("loadingoverlay_fa");
        g("<div>", { class: s.fontawesome }).appendTo(o),
          s.fontawesomeColor && o.css("color", s.fontawesomeColor);
      }
      if (s.custom)
        o = v(
          t,
          s.customOrder,
          s.customAutoResize,
          s.customResizeFactor,
          s.customAnimation
        ).append(s.custom);
      if (
        (s.text &&
          ((a.text = v(
            t,
            s.textOrder,
            s.textAutoResize,
            s.textResizeFactor,
            s.textAnimation
          )
            .addClass("loadingoverlay_text")
            .text(s.text)),
          s.textClass
            ? a.text.addClass(s.textClass)
            : s.textColor && a.text.css("color", s.textColor)),
        s.progress)
      ) {
        o = v(
          t,
          s.progressOrder,
          s.progressAutoResize,
          s.progressResizeFactor,
          !1
        ).addClass("loadingoverlay_progress");
        var r = g("<div>").css(c.progress_wrapper).appendTo(o);
        a.progress = {
          bar: g("<div>").css(c.progress_bar).appendTo(r),
          fixed: !1,
          margin: 0,
          min: parseFloat(s.progressMin),
          max: parseFloat(s.progressMax),
          speed: parseInt(s.progressSpeed, 10),
        };
        var i = (s.progressFixedPosition + "")
          .replace(/\s\s+/g, " ")
          .toLowerCase()
          .split(" ");
        2 === i.length && y(i[0])
          ? ((a.progress.fixed = i[0]), (a.progress.margin = w(i[1])))
          : 2 === i.length && y(i[1])
          ? ((a.progress.fixed = i[1]), (a.progress.margin = w(i[0])))
          : 1 === i.length &&
            y(i[0]) &&
            ((a.progress.fixed = i[0]), (a.progress.margin = 0)),
          "top" === a.progress.fixed
            ? o
                .css(c.progress_fixed)
                .css(
                  "top",
                  a.progress.margin
                    ? a.progress.margin.value +
                        (a.progress.margin.fixed
                          ? a.progress.margin.units
                          : "%")
                    : 0
                )
            : "bottom" === a.progress.fixed &&
              o.css(c.progress_fixed).css("top", "auto"),
          s.progressClass
            ? a.progress.bar.addClass(s.progressClass)
            : s.progressColor &&
              a.progress.bar.css("background", s.progressColor);
      }
      s.fade
        ? !0 === s.fade
          ? (s.fade = d.fade)
          : "string" == typeof s.fade || "number" == typeof s.fade
          ? (s.fade = [s.fade, s.fade])
          : g.isArray(s.fade) &&
            s.fade.length < 2 &&
            (s.fade = [s.fade[0], s.fade[0]])
        : (s.fade = [0, 0]),
        (s.fade = [parseInt(s.fade[0], 10), parseInt(s.fade[1], 10)]),
        (a.settings = s),
        t.data("loadingoverlay_data", a),
        e.data("loadingoverlay", t),
        t.fadeTo(0, 0.01).appendTo("body"),
        f(e, !0),
        0 < s.resizeInterval &&
          (a.resizeIntervalId = setInterval(function () {
            f(e, !1);
          }, s.resizeInterval)),
        t.fadeTo(s.fade[0], 1);
    }
    a.count++;
  }
  function r(e, s) {
    var t = p((e = g(e))),
      a = u(e);
    !1 !== a &&
      (a.count--,
      (s || a.count <= 0) &&
        t.animate({ opacity: 0 }, a.settings.fade[1], function () {
          a.resizeIntervalId && clearInterval(a.resizeIntervalId),
            g(this).remove(),
            e.removeData("loadingoverlay");
        }));
  }
  function i(e) {
    f(g(e), !0);
  }
  function l(e, s) {
    var t = u((e = g(e)));
    !1 !== t && t.text && (!1 === s ? t.text.hide() : t.text.show().text(s));
  }
  function m(e, s) {
    var t = u((e = g(e)));
    if (!1 !== t && t.progress)
      if (!1 === s) t.progress.bar.hide();
      else {
        var a =
          (100 * ((parseFloat(s) || 0) - t.progress.min)) /
          (t.progress.max - t.progress.min);
        a < 0 && (a = 0),
          100 < a && (a = 100),
          t.progress.bar.show().animate({ width: a + "%" }, t.progress.speed);
      }
  }
  function f(e, t) {
    var s = p(e),
      a = u(e);
    if (!1 !== a) {
      if (!a.wholePage) {
        var o = "fixed" === e.css("position"),
          r = o ? e[0].getBoundingClientRect() : e.offset();
        s.css({
          position: o ? "fixed" : "absolute",
          top: r.top + parseInt(e.css("border-top-width"), 10),
          left: r.left + parseInt(e.css("border-left-width"), 10),
          width: e.innerWidth(),
          height: e.innerHeight(),
        });
      }
      if (a.settings.size) {
        var i = a.wholePage ? g(window) : e,
          n = a.settings.size.value;
        a.settings.size.fixed ||
          ((n = (Math.min(i.innerWidth(), i.innerHeight()) * n) / 100),
          a.settings.maxSize &&
            n > a.settings.maxSize &&
            (n = a.settings.maxSize),
          a.settings.minSize &&
            n < a.settings.minSize &&
            (n = a.settings.minSize)),
          s.children(".loadingoverlay_element").each(function () {
            var e = g(this);
            if (t || e.data("loadingoverlay_autoresize")) {
              var s = e.data("loadingoverlay_resizefactor");
              e.hasClass("loadingoverlay_fa") ||
              e.hasClass("loadingoverlay_text")
                ? e.css("font-size", n * s + a.settings.size.units)
                : e.hasClass("loadingoverlay_progress")
                ? (a.progress.bar.css("height", n * s + a.settings.size.units),
                  a.progress.fixed
                    ? "bottom" === a.progress.fixed &&
                      e
                        .css(
                          "bottom",
                          a.progress.margin
                            ? a.progress.margin.value +
                                (a.progress.margin.fixed
                                  ? a.progress.margin.units
                                  : "%")
                            : 0
                        )
                        .css("bottom", "+=" + n * s + a.settings.size.units)
                    : a.progress.bar
                        .css("top", e.position().top)
                        .css("top", "-=" + n * s * 0.5 + a.settings.size.units))
                : e.css({
                    width: n * s + a.settings.size.units,
                    height: n * s + a.settings.size.units,
                  });
            }
          });
      }
    }
  }
  function p(e) {
    return e.data("loadingoverlay");
  }
  function u(e) {
    var s = p(e),
      t = void 0 === s ? a : s.data("loadingoverlay_data");
    return void 0 === t
      ? (g(".loadingoverlay").each(function () {
          var e = g(this),
            s = e.data("loadingoverlay_data");
          document.body.contains(s.container[0]) ||
            (s.resizeIntervalId && clearInterval(s.resizeIntervalId),
            e.remove());
        }),
        !1)
      : (s.toggle(e.is(":visible")), t);
  }
  function v(e, s, t, a, o) {
    var r = g("<div>", { class: "loadingoverlay_element", css: { order: s } })
      .css(c.element)
      .data({ loadingoverlay_autoresize: t, loadingoverlay_resizefactor: a })
      .appendTo(e);
    if (
      (!0 === o && (o = d.animations.time + " " + d.animations.name),
      "string" == typeof o)
    ) {
      var i,
        n,
        l = o.replace(/\s\s+/g, " ").toLowerCase().split(" ");
      2 === l.length && x(l[0]) && h(l[1])
        ? ((i = l[1]), (n = l[0]))
        : 2 === l.length && x(l[1]) && h(l[0])
        ? ((i = l[0]), (n = l[1]))
        : 1 === l.length && x(l[0])
        ? ((i = d.animations.name), (n = l[0]))
        : 1 === l.length && h(l[0]) && ((i = l[0]), (n = d.animations.time)),
        r.css({
          "animation-name": "loadingoverlay_animation__" + i,
          "animation-duration": n,
          "animation-timing-function": "linear",
          "animation-iteration-count": "infinite",
        });
    }
    return r;
  }
  function x(e) {
    return (
      !isNaN(parseFloat(e)) && ("s" === e.slice(-1) || "ms" === e.slice(-2))
    );
  }
  function h(e) {
    return -1 < s.animations.indexOf(e);
  }
  function y(e) {
    return -1 < s.progressPosition.indexOf(e);
  }
  function w(e) {
    return (
      !(!e || e < 0) &&
      ("string" == typeof e && -1 < ["vmin", "vmax"].indexOf(e.slice(-4))
        ? { fixed: !0, units: e.slice(-4), value: e.slice(0, -4) }
        : "string" == typeof e && -1 < ["rem"].indexOf(e.slice(-3))
        ? { fixed: !0, units: e.slice(-3), value: e.slice(0, -3) }
        : "string" == typeof e &&
          -1 <
            ["px", "em", "cm", "mm", "in", "pt", "pc", "vh", "vw"].indexOf(
              e.slice(-2)
            )
        ? { fixed: !0, units: e.slice(-2), value: e.slice(0, -2) }
        : { fixed: !1, units: "px", value: parseFloat(e) })
    );
  }
  (g.LoadingOverlaySetup = function (e) {
    g.extend(!0, t, e);
  }),
    (g.LoadingOverlay = function (e, s) {
      switch (e.toLowerCase()) {
        case "show":
          o("body", g.extend(!0, {}, t, s));
          break;
        case "hide":
          r("body", s);
          break;
        case "resize":
          i("body");
          break;
        case "text":
          l("body", s);
          break;
        case "progress":
          m("body", s);
      }
    }),
    (g.fn.LoadingOverlay = function (e, s) {
      switch (e.toLowerCase()) {
        case "show":
          return this.each(function () {
            o(this, g.extend(!0, {}, t, s));
          });
        case "hide":
          return this.each(function () {
            r(this, s);
          });
        case "resize":
          return this.each(function () {
            i(this);
          });
        case "text":
          return this.each(function () {
            l(this, s);
          });
        case "progress":
          return this.each(function () {
            m(this, s);
          });
      }
    }),
    g(function () {
      g("head").append(
        [
          "<style>",
          "@-webkit-keyframes loadingoverlay_animation__rotate_right {",
          "to {",
          "-webkit-transform : rotate(360deg);",
          "transform : rotate(360deg);",
          "}",
          "}",
          "@keyframes loadingoverlay_animation__rotate_right {",
          "to {",
          "-webkit-transform : rotate(360deg);",
          "transform : rotate(360deg);",
          "}",
          "}",
          "@-webkit-keyframes loadingoverlay_animation__rotate_left {",
          "to {",
          "-webkit-transform : rotate(-360deg);",
          "transform : rotate(-360deg);",
          "}",
          "}",
          "@keyframes loadingoverlay_animation__rotate_left {",
          "to {",
          "-webkit-transform : rotate(-360deg);",
          "transform : rotate(-360deg);",
          "}",
          "}",
          "@-webkit-keyframes loadingoverlay_animation__fadein {",
          "0% {",
          "opacity   : 0;",
          "-webkit-transform : scale(0.1, 0.1);",
          "transform : scale(0.1, 0.1);",
          "}",
          "50% {",
          "opacity   : 1;",
          "}",
          "100% {",
          "opacity   : 0;",
          "-webkit-transform : scale(1, 1);",
          "transform : scale(1, 1);",
          "}",
          "}",
          "@keyframes loadingoverlay_animation__fadein {",
          "0% {",
          "opacity   : 0;",
          "-webkit-transform : scale(0.1, 0.1);",
          "transform : scale(0.1, 0.1);",
          "}",
          "50% {",
          "opacity   : 1;",
          "}",
          "100% {",
          "opacity   : 0;",
          "-webkit-transform : scale(1, 1);",
          "transform : scale(1, 1);",
          "}",
          "}",
          "@-webkit-keyframes loadingoverlay_animation__pulse {",
          "0% {",
          "-webkit-transform : scale(0, 0);",
          "transform : scale(0, 0);",
          "}",
          "50% {",
          "-webkit-transform : scale(1, 1);",
          "transform : scale(1, 1);",
          "}",
          "100% {",
          "-webkit-transform : scale(0, 0);",
          "transform : scale(0, 0);",
          "}",
          "}",
          "@keyframes loadingoverlay_animation__pulse {",
          "0% {",
          "-webkit-transform : scale(0, 0);",
          "transform : scale(0, 0);",
          "}",
          "50% {",
          "-webkit-transform : scale(1, 1);",
          "transform : scale(1, 1);",
          "}",
          "100% {",
          "-webkit-transform : scale(0, 0);",
          "transform : scale(0, 0);",
          "}",
          "}",
          "</style>",
        ].join(" ")
      );
    });
});
