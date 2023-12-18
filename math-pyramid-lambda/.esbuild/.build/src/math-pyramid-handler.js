"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to2, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to2, key) && key !== except)
        __defProp(to2, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to2;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/math-pyramid-handler.ts
var math_pyramid_handler_exports = {};
__export(math_pyramid_handler_exports, {
  createHandler: () => createHandler
});
module.exports = __toCommonJS(math_pyramid_handler_exports);

// node_modules/vectorious/dist/index.mjs
var Xt = Object.create;
var mr = Object.defineProperty;
var Yt = Object.getOwnPropertyDescriptor;
var Zt = Object.getOwnPropertyNames;
var Kt = Object.getPrototypeOf;
var Qt = Object.prototype.hasOwnProperty;
var H = ((r) => typeof require < "u" ? require : typeof Proxy < "u" ? new Proxy(r, { get: (t, o) => (typeof require < "u" ? require : t)[o] }) : r)(function(r) {
  if (typeof require < "u")
    return require.apply(this, arguments);
  throw new Error('Dynamic require of "' + r + '" is not supported');
});
var J = (r, t) => () => (t || r((t = { exports: {} }).exports, t), t.exports);
var ro = (r, t, o, e) => {
  if (t && typeof t == "object" || typeof t == "function")
    for (let a of Zt(t))
      !Qt.call(r, a) && a !== o && mr(r, a, { get: () => t[a], enumerable: !(e = Yt(t, a)) || e.enumerable });
  return r;
};
var to = (r, t, o) => (o = r != null ? Xt(Kt(r)) : {}, ro(t || !r || !r.__esModule ? mr(o, "default", { value: r, enumerable: true }) : o, r));
var $t = J((jm, Ut) => {
  Ut.exports = function(t) {
    return t && typeof t == "object" && typeof t.copy == "function" && typeof t.fill == "function" && typeof t.readUInt8 == "function";
  };
});
var Ct = J((qm, Q) => {
  typeof Object.create == "function" ? Q.exports = function(t, o) {
    t.super_ = o, t.prototype = Object.create(o.prototype, { constructor: { value: t, enumerable: false, writable: true, configurable: true } });
  } : Q.exports = function(t, o) {
    t.super_ = o;
    var e = function() {
    };
    e.prototype = o.prototype, t.prototype = new e(), t.prototype.constructor = t;
  };
});
var Ht = J((h) => {
  var Ze = /%[sdj%]/g;
  h.format = function(r) {
    if (!B(r)) {
      for (var t = [], o = 0; o < arguments.length; o++)
        t.push(w(arguments[o]));
      return t.join(" ");
    }
    for (var o = 1, e = arguments, a = e.length, n = String(r).replace(Ze, function(m) {
      if (m === "%%")
        return "%";
      if (o >= a)
        return m;
      switch (m) {
        case "%s":
          return String(e[o++]);
        case "%d":
          return Number(e[o++]);
        case "%j":
          try {
            return JSON.stringify(e[o++]);
          } catch {
            return "[Circular]";
          }
        default:
          return m;
      }
    }), s = e[o]; o < a; s = e[++o])
      P(s) || !E(s) ? n += " " + s : n += " " + w(s);
    return n;
  };
  h.deprecate = function(r, t) {
    if (x(global.process))
      return function() {
        return h.deprecate(r, t).apply(this, arguments);
      };
    if (process.noDeprecation === true)
      return r;
    var o = false;
    function e() {
      if (!o) {
        if (process.throwDeprecation)
          throw new Error(t);
        process.traceDeprecation ? console.trace(t) : console.error(t), o = true;
      }
      return r.apply(this, arguments);
    }
    return e;
  };
  var F = {}, rr;
  h.debuglog = function(r) {
    if (x(rr) && (rr = process.env.NODE_DEBUG || ""), r = r.toUpperCase(), !F[r])
      if (new RegExp("\\b" + r + "\\b", "i").test(rr)) {
        var t = process.pid;
        F[r] = function() {
          var o = h.format.apply(h, arguments);
          console.error("%s %d: %s", r, t, o);
        };
      } else
        F[r] = function() {
        };
    return F[r];
  };
  function w(r, t) {
    var o = { seen: [], stylize: Qe };
    return arguments.length >= 3 && (o.depth = arguments[2]), arguments.length >= 4 && (o.colors = arguments[3]), ar(t) ? o.showHidden = t : t && h._extend(o, t), x(o.showHidden) && (o.showHidden = false), x(o.depth) && (o.depth = 2), x(o.colors) && (o.colors = false), x(o.customInspect) && (o.customInspect = true), o.colors && (o.stylize = Ke), R(o, r, o.depth);
  }
  h.inspect = w;
  w.colors = { bold: [1, 22], italic: [3, 23], underline: [4, 24], inverse: [7, 27], white: [37, 39], grey: [90, 39], black: [30, 39], blue: [34, 39], cyan: [36, 39], green: [32, 39], magenta: [35, 39], red: [31, 39], yellow: [33, 39] };
  w.styles = { special: "cyan", number: "yellow", boolean: "yellow", undefined: "grey", null: "bold", string: "green", date: "magenta", regexp: "red" };
  function Ke(r, t) {
    var o = w.styles[t];
    return o ? "\x1B[" + w.colors[o][0] + "m" + r + "\x1B[" + w.colors[o][1] + "m" : r;
  }
  function Qe(r, t) {
    return r;
  }
  function rn(r) {
    var t = {};
    return r.forEach(function(o, e) {
      t[o] = true;
    }), t;
  }
  function R(r, t, o) {
    if (r.customInspect && t && C(t.inspect) && t.inspect !== h.inspect && !(t.constructor && t.constructor.prototype === t)) {
      var e = t.inspect(o, r);
      return B(e) || (e = R(r, e, o)), e;
    }
    var a = tn(r, t);
    if (a)
      return a;
    var n = Object.keys(t), s = rn(n);
    if (r.showHidden && (n = Object.getOwnPropertyNames(t)), $(t) && (n.indexOf("message") >= 0 || n.indexOf("description") >= 0))
      return tr(t);
    if (n.length === 0) {
      if (C(t)) {
        var m = t.name ? ": " + t.name : "";
        return r.stylize("[Function" + m + "]", "special");
      }
      if (U(t))
        return r.stylize(RegExp.prototype.toString.call(t), "regexp");
      if (nr(t))
        return r.stylize(Date.prototype.toString.call(t), "date");
      if ($(t))
        return tr(t);
    }
    var f = "", u = false, y = ["{", "}"];
    if (Rt(t) && (u = true, y = ["[", "]"]), C(t)) {
      var c = t.name ? ": " + t.name : "";
      f = " [Function" + c + "]";
    }
    if (U(t) && (f = " " + RegExp.prototype.toString.call(t)), nr(t) && (f = " " + Date.prototype.toUTCString.call(t)), $(t) && (f = " " + tr(t)), n.length === 0 && (!u || t.length == 0))
      return y[0] + f + y[1];
    if (o < 0)
      return U(t) ? r.stylize(RegExp.prototype.toString.call(t), "regexp") : r.stylize("[Object]", "special");
    r.seen.push(t);
    var l;
    return u ? l = on(r, t, o, s, n) : l = n.map(function(d) {
      return er(r, t, o, s, d, u);
    }), r.seen.pop(), en(l, f, y);
  }
  function tn(r, t) {
    if (x(t))
      return r.stylize("undefined", "undefined");
    if (B(t)) {
      var o = "'" + JSON.stringify(t).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";
      return r.stylize(o, "string");
    }
    if (Pt(t))
      return r.stylize("" + t, "number");
    if (ar(t))
      return r.stylize("" + t, "boolean");
    if (P(t))
      return r.stylize("null", "null");
  }
  function tr(r) {
    return "[" + Error.prototype.toString.call(r) + "]";
  }
  function on(r, t, o, e, a) {
    for (var n = [], s = 0, m = t.length; s < m; ++s)
      Bt(t, String(s)) ? n.push(er(r, t, o, e, String(s), true)) : n.push("");
    return a.forEach(function(f) {
      f.match(/^\d+$/) || n.push(er(r, t, o, e, f, true));
    }), n;
  }
  function er(r, t, o, e, a, n) {
    var s, m, f;
    if (f = Object.getOwnPropertyDescriptor(t, a) || { value: t[a] }, f.get ? f.set ? m = r.stylize("[Getter/Setter]", "special") : m = r.stylize("[Getter]", "special") : f.set && (m = r.stylize("[Setter]", "special")), Bt(e, a) || (s = "[" + a + "]"), m || (r.seen.indexOf(f.value) < 0 ? (P(o) ? m = R(r, f.value, null) : m = R(r, f.value, o - 1), m.indexOf(`
`) > -1 && (n ? m = m.split(`
`).map(function(u) {
      return "  " + u;
    }).join(`
`).substr(2) : m = `
` + m.split(`
`).map(function(u) {
      return "   " + u;
    }).join(`
`))) : m = r.stylize("[Circular]", "special")), x(s)) {
      if (n && a.match(/^\d+$/))
        return m;
      s = JSON.stringify("" + a), s.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/) ? (s = s.substr(1, s.length - 2), s = r.stylize(s, "name")) : (s = s.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'"), s = r.stylize(s, "string"));
    }
    return s + ": " + m;
  }
  function en(r, t, o) {
    var e = 0, a = r.reduce(function(n, s) {
      return e++, s.indexOf(`
`) >= 0 && e++, n + s.replace(/\u001b\[\d\d?m/g, "").length + 1;
    }, 0);
    return a > 60 ? o[0] + (t === "" ? "" : t + `
 `) + " " + r.join(`,
  `) + " " + o[1] : o[0] + t + " " + r.join(", ") + " " + o[1];
  }
  function Rt(r) {
    return Array.isArray(r);
  }
  h.isArray = Rt;
  function ar(r) {
    return typeof r == "boolean";
  }
  h.isBoolean = ar;
  function P(r) {
    return r === null;
  }
  h.isNull = P;
  function nn(r) {
    return r == null;
  }
  h.isNullOrUndefined = nn;
  function Pt(r) {
    return typeof r == "number";
  }
  h.isNumber = Pt;
  function B(r) {
    return typeof r == "string";
  }
  h.isString = B;
  function an(r) {
    return typeof r == "symbol";
  }
  h.isSymbol = an;
  function x(r) {
    return r === void 0;
  }
  h.isUndefined = x;
  function U(r) {
    return E(r) && ir(r) === "[object RegExp]";
  }
  h.isRegExp = U;
  function E(r) {
    return typeof r == "object" && r !== null;
  }
  h.isObject = E;
  function nr(r) {
    return E(r) && ir(r) === "[object Date]";
  }
  h.isDate = nr;
  function $(r) {
    return E(r) && (ir(r) === "[object Error]" || r instanceof Error);
  }
  h.isError = $;
  function C(r) {
    return typeof r == "function";
  }
  h.isFunction = C;
  function sn(r) {
    return r === null || typeof r == "boolean" || typeof r == "number" || typeof r == "string" || typeof r == "symbol" || typeof r > "u";
  }
  h.isPrimitive = sn;
  h.isBuffer = $t();
  function ir(r) {
    return Object.prototype.toString.call(r);
  }
  function or(r) {
    return r < 10 ? "0" + r.toString(10) : r.toString(10);
  }
  var mn = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  function fn() {
    var r = new Date(), t = [or(r.getHours()), or(r.getMinutes()), or(r.getSeconds())].join(":");
    return [r.getDate(), mn[r.getMonth()], t].join(" ");
  }
  h.log = function() {
    console.log("%s - %s", fn(), h.format.apply(h, arguments));
  };
  h.inherits = Ct();
  h._extend = function(r, t) {
    if (!t || !E(t))
      return r;
    for (var o = Object.keys(t), e = o.length; e--; )
      r[o[e]] = t[o[e]];
    return r;
  };
  function Bt(r, t) {
    return Object.prototype.hasOwnProperty.call(r, t);
  }
});
var k = 32;
var V = (r) => r.reduce((t, o) => t.concat(Array.isArray(o) ? V(o) : o), []);
var G = (r) => ArrayBuffer.isView(r) && !(r instanceof DataView);
var S = (r) => r.reduce((t, o) => t * o, 1);
var W = (r) => Array.isArray(r) || G(r) ? [r.length].concat(W(r[0])) : [];
var I = (r) => [...r.slice(1).map((t, o) => r.slice(o + 1).reduce((e, a) => e * a, 1)), 1];
var fr = (r) => {
  let { constructor: { name: t = "Float32Array" } = {} } = r || {};
  switch (t) {
    case "Int8Array":
      return "int8";
    case "Uint8Array":
      return "uint8";
    case "Int16Array":
      return "int16";
    case "Uint16Array":
      return "uint16";
    case "Int32Array":
      return "int32";
    case "Uint32Array":
      return "uint32";
    case "Uint8ClampedArray":
      return "uint8c";
    case "Float32Array":
      return "float32";
    case "Float64Array":
      return "float64";
    default:
      return "float64";
  }
};
var g = (r) => {
  switch (r) {
    case "int8":
      return Int8Array;
    case "uint8":
      return Uint8Array;
    case "int16":
      return Int16Array;
    case "uint16":
      return Uint16Array;
    case "int32":
      return Int32Array;
    case "uint32":
      return Uint32Array;
    case "uint8c":
      return Uint8ClampedArray;
    case "float32":
      return Float32Array;
    case "float64":
      return Float64Array;
    default:
      return Float64Array;
  }
};
var i = (...r) => new A(...r);
var p = class {
  x;
  shape;
  shapem1;
  strides;
  backstrides;
  length;
  lengthm1;
  nd;
  ndm1;
  index;
  coords;
  pos;
  factors;
  constructor(t) {
    this.x = i(t);
    let { shape: o, strides: e, length: a } = this.x;
    this.length = a, this.lengthm1 = a - 1, this.nd = o.length, this.ndm1 = this.nd - 1, this.shape = Array(k).fill(0), this.strides = Array(k).fill(0), this.shapem1 = Array(k).fill(0), this.coords = Array(k).fill(0), this.backstrides = Array(k).fill(0), this.factors = Array(k).fill(0), this.nd !== 0 && (this.factors[this.nd - 1] = 1);
    let n;
    for (n = 0; n < this.nd; n += 1)
      this.shape[n] = o[n], this.shapem1[n] = o[n] - 1, this.strides[n] = e[n], this.backstrides[n] = e[n] * this.shapem1[n], this.coords[n] = 0, n > 0 && (this.factors[this.ndm1 - n] = this.factors[this.nd - n] * o[this.nd - n]);
    this.index = 0, this.pos = 0;
  }
  done() {
    return this.index > this.lengthm1;
  }
  current() {
    let t = this.done();
    return { value: t ? void 0 : this.pos, done: t };
  }
  next() {
    let t = this.current();
    if (t.done)
      return t;
    let { ndm1: o, shapem1: e, strides: a, backstrides: n } = this, s;
    for (s = o; s >= 0; s -= 1) {
      if (this.coords[s] < e[s]) {
        this.coords[s] += 1, this.pos += a[s];
        break;
      }
      this.coords[s] = 0, this.pos -= n[s];
    }
    return this.index += 1, t;
  }
  [Symbol.iterator]() {
    return this;
  }
};
var D = class {
  iters;
  shape;
  nd;
  length;
  lengthm1;
  numiter;
  index;
  pos;
  constructor(...t) {
    this.iters = t.map((f) => new p(f)), this.numiter = t.length;
    let o, e;
    for (o = 0, e = 0; o < this.numiter; o += 1)
      e = Math.max(e, this.iters[o].x.shape.length);
    this.nd = e, this.shape = Array(e).fill(0);
    let a, n, s, m;
    for (o = 0; o < e; o += 1)
      for (this.shape[o] = 1, n = 0; n < this.numiter; n += 1)
        if (a = this.iters[n], s = o + a.x.shape.length - e, s >= 0) {
          if (m = a.x.shape[s], m == 1)
            continue;
          if (this.shape[o] == 1)
            this.shape[o] = m;
          else if (this.shape[o] !== m)
            throw new Error("shape mismatch");
        }
    for (m = this.shape.reduce((f, u) => f * u, 1), this.length = m, this.lengthm1 = m - 1, o = 0; o < this.numiter; o += 1)
      for (a = this.iters[o], a.nd = this.nd, a.ndm1 = this.nd - 1, a.length = m, a.lengthm1 = m - 1, e = a.x.shape.length, e !== 0 && (a.factors[this.nd - 1] = 1), n = 0; n < this.nd; n += 1)
        a.shape[n] = this.shape[n], a.shapem1[n] = this.shape[n] - 1, s = n + e - this.nd, s < 0 || a.x.shape[s] !== this.shape[n] ? a.strides[n] = 0 : a.strides[n] = a.x.strides[s], a.backstrides[n] = a.strides[n] * a.shapem1[n], n > 0 && (a.factors[this.nd - n - 1] = a.factors[this.nd - n] * this.shape[this.nd - n]);
    this.index = 0, this.pos = Array(this.numiter).fill(0);
  }
  done() {
    return this.index > this.lengthm1;
  }
  current() {
    let t = this.done();
    return { value: t ? void 0 : this.pos, done: t };
  }
  next() {
    let t = this.current();
    if (t.done)
      return t;
    this.index += 1;
    let { numiter: o } = this, e, a;
    for (a = 0; a < o; a += 1)
      e = this.iters[a], this.pos[a] = e.pos, e.next();
    return t;
  }
  [Symbol.iterator]() {
    return this;
  }
};
var { abs: oo } = Math;
function pr() {
  let { data: r } = this, t = new p(this);
  for (let o of t)
    r[o] = oo(r[o]);
  return this;
}
var { acos: no } = Math;
function ur() {
  let { data: r } = this, t = new p(this);
  for (let o of t)
    r[o] = no(r[o]);
  return this;
}
var { acosh: io } = Math;
function cr() {
  let { data: r } = this, t = new p(this);
  for (let o of t)
    r[o] = io(r[o]);
  return this;
}
var b;
try {
  b = H("nblas");
} catch {
}
var X = b && b.NoTrans;
var Rn = b && b.Trans;
function yr(r, t, o, e, a, n, s) {
  if (e.length / a !== t || n.length / s !== t)
    throw new Error("lengths do not match");
  switch (r) {
    case "float64":
      return b.daxpy(t, o, e, a, n, s);
    case "float32":
      return b.saxpy(t, o, e, a, n, s);
    default:
      throw new Error("wrong dtype");
  }
}
function lr(r, t, o, e, a, n) {
  if (o.length / e !== t || a.length / n !== t)
    throw new Error("lengths do not match");
  switch (r) {
    case "float64":
      return b.ddot(t, o, e, a, n);
    case "float32":
      return b.sdot(t, o, e, a, n);
    default:
      throw new Error("wrong dtype");
  }
}
function hr(r, t, o, e) {
  if (o.length / e !== t)
    throw new Error("lengths do not match");
  switch (r) {
    case "float64":
      return b.idamax(t, o, e);
    case "float32":
      return b.isamax(t, o, e);
    default:
      throw new Error("wrong dtype");
  }
}
function dr(r, t, o, e, a, n, s, m, f, u, y, c, l, d) {
  let { length: v } = m, { length: q } = u, { length: _ } = l;
  if (t === b.NoTrans && v !== f * e || t === b.Trans && v !== f * n)
    throw new Error("lengths do not match");
  if (o === b.NoTrans && q !== y * n || o === b.Trans && q !== y * a)
    throw new Error("lengths do not match");
  if (_ !== d * e)
    throw new Error("lengths do not match");
  switch (r) {
    case "float64":
      return b.dgemm(t, o, e, a, n, s, m, f, u, y, c, l, d);
    case "float32":
      return b.sgemm(t, o, e, a, n, s, m, f, u, y, c, l, d);
    default:
      throw new Error("wrong dtype");
  }
}
function Ar(r, t, o, e) {
  if (o.length / e !== t)
    throw new Error("lengths do not match");
  switch (r) {
    case "float64":
      return b.dnrm2(t, o, e);
    case "float32":
      return b.snrm2(t, o, e);
    default:
      throw new Error("wrong dtype");
  }
}
function br(r, t, o, e, a) {
  if (e.length / a !== t)
    throw new Error("lengths do not match");
  switch (r) {
    case "float64":
      return b.dscal(t, o, e, a);
    case "float32":
      return b.sscal(t, o, e, a);
    default:
      throw new Error("wrong dtype");
  }
}
function Dr(r, t = 1) {
  let { data: o, length: e, strides: a, dtype: n } = this, { data: s, strides: m } = i(r);
  try {
    let f = m[m.length - 1], u = a[a.length - 1];
    if (f !== u)
      throw new Error("inc_x and inc_y must be equal");
    yr(n, e, t, s, f, o, u);
  } catch {
    let u = new D(this, r);
    for (let [y, c] of u)
      o[y] += t * s[c];
  }
  return this;
}
var { acos: fo } = Math;
function Nr(r) {
  return fo(this.dot(i(r)) / this.norm() / i(r).norm());
}
var { asin: uo } = Math;
function gr() {
  let { data: r } = this, t = new p(this);
  for (let o of t)
    r[o] = uo(r[o]);
  return this;
}
var { asinh: yo } = Math;
function xr() {
  let { data: r } = this, t = new p(this);
  for (let o of t)
    r[o] = yo(r[o]);
  return this;
}
var { atan: ho } = Math;
function wr() {
  let { data: r } = this, t = new p(this);
  for (let o of t)
    r[o] = ho(r[o]);
  return this;
}
var { atanh: bo } = Math;
function kr() {
  let { data: r } = this, t = new p(this);
  for (let o of t)
    r[o] = bo(r[o]);
  return this;
}
var N = (...r) => new A(new Float64Array(r.reduce((t, o) => t * o, 1)), { shape: r }).fill(0);
var Y = (r, t) => i(r).augment(i(t));
function Lr(r) {
  let [t, o] = this.shape, [e, a] = i(r).shape, { data: n } = this, { data: s } = i(r);
  if (e === 0 || a === 0)
    return this;
  if (t !== e)
    throw new Error("rows do not match");
  let m = N(t, o + a), { data: f } = m, u, y;
  for (u = 0; u < t; u += 1)
    for (y = 0; y < o; y += 1)
      f[u * (o + a) + y] = n[u * o + y];
  for (u = 0; u < e; u += 1)
    for (y = 0; y < a; y += 1)
      f[u * (o + a) + (y + o)] = s[u * a + y];
  return m;
}
function Ir(r, t) {
  let { data: o } = this, { data: e } = i(r), a = new D(this, r);
  for (let [n, s] of a)
    o[n] = t(o[n], e[s], n);
  return this;
}
var { cbrt: go } = Math;
function Tr() {
  let { data: r } = this, t = new p(this);
  for (let o of t)
    r[o] = go(r[o]);
  return this;
}
var { ceil: wo } = Math;
function Er() {
  let { data: r } = this, t = new p(this);
  for (let o of t)
    r[o] = wo(r[o]);
  return this;
}
function vr(...r) {
  let { shape: t, length: o } = this;
  if (r.length === 1) {
    let [e] = r;
    if (e < 0 || e > o - 1 || !Number.isFinite(e))
      throw new Error("index out of bounds");
  } else if (!t.every((e, a) => e > r[a] && Number.isFinite(r[a]) && r[a] >= 0))
    throw new Error("index out of bounds");
}
function Mr(r) {
  if (this.shape.length !== 1 && r.shape.length !== 1)
    throw new Error("combine operation not permitted for multidimensional arrays");
  let { length: t, data: o } = this, { length: e, data: a } = r;
  if (e === 0)
    return this;
  if (t === 0)
    return this.data = new (g(r.dtype))(a), this.length = e, this.dtype = r.dtype, this;
  let n = t + e, s = new (g(this.dtype))(n);
  return s.set(o), s.set(a, t), this.data = s, this.length = n, this.shape = [n], this;
}
function jr() {
  let r = N(...this.shape), { data: t } = this, { data: o } = r, e = new D(this, r);
  for (let [a, n] of e)
    o[n] = t[a];
  return r;
}
var { cos: Eo } = Math;
function qr() {
  let { data: r } = this, t = new p(this);
  for (let o of t)
    r[o] = Eo(r[o]);
  return this;
}
var { cosh: Mo } = Math;
function _r() {
  let { data: r } = this, t = new p(this);
  for (let o of t)
    r[o] = Mo(r[o]);
  return this;
}
function Sr(r) {
  let { length: t } = this, { length: o } = r;
  if (t !== 3 || o !== 3)
    throw new Error("vectors must have three components");
  let e = this.y * r.z - this.z * r.y, a = this.z * r.x - this.x * r.z, n = this.x * r.y - this.y * r.x;
  return this.x = e, this.y = a, this.z = n, this;
}
function zr() {
  this.square();
  let [r] = this.shape, [t, o] = this.copy().lu_factor(), { data: e } = t, a = 1, n = 1, s;
  for (s = 0; s < r; s += 1)
    a *= e[s * r + s], s !== o[s] - 1 && (n *= -1);
  return n * a;
}
function Or() {
  this.square();
  let { length: r } = this, [t, o] = this.shape, e = Math.min(t, o);
  return this.reshape(r).slice(0, r, e + 1);
}
function Fr(r) {
  let { data: t, length: o, strides: e, dtype: a } = this, { data: n, strides: s } = r, m = 0;
  try {
    let f = s[s.length - 1], u = e[e.length - 1];
    if (f !== u)
      throw new Error("inc_x and inc_y must be equal");
    m = lr(a, o, n, f, t, u);
  } catch {
    let u = new D(this, r);
    for (let [y, c] of u)
      m += t[y] * n[c];
  }
  return m;
}
var M = (r) => {
  let t = new A(new Float64Array(r * r), { shape: [r, r] }), { data: o } = t, e;
  for (e = 0; e < r; e += 1)
    o[e * r + e] = 1;
  return t;
};
var j;
try {
  j = H("nlapack");
} catch {
}
var z = (r, t, o, e, a, n, s) => {
  let [m] = r.shape, { data: f } = r, u = f[e * m + a], y = 1 / (t + o);
  f[e * m + a] = u - o * (f[n * m + s] + y * u), f[n * m + s] += o * (u - y * f[n * m + s]);
};
function Ur() {
  this.square();
  let [r] = this.shape;
  try {
    ["float32", "float64"].includes(this.dtype) || (this.dtype = "float32", this.data = g(this.dtype).from(this.data));
    let t = j.NoEigenvector, o = j.Eigenvector, e = N(r), a = N(r), n = N(r, r), s = N(r, r), { data: m } = this, { data: f } = e, { data: u } = a, { data: y } = n, { data: c } = s;
    return this.dtype === "float64" && j.dgeev(t, o, r, m, r, f, u, y, r, c, r), this.dtype === "float32" && j.sgeev(t, o, r, m, r, f, u, y, r, c, r), [e, s];
  } catch {
    let { data: o } = this, e = M(r), a = 0, n = 0, s = 0, m = 0, f = 0;
    do {
      for (n = 0; n < r; n += 1)
        for (s = n + 1; s < r; s += 1)
          Math.abs(o[n * r + s]) >= a && (a = Math.abs(o[n * r + s]), m = n, f = s);
      let u;
      if (Math.abs(o[m * r + f]) < Math.abs(o[f * r + f]) * 1e-36)
        u = o[m * r + f] / o[f * r + f];
      else {
        let d = o[f * r + f] / 2 * o[m * r + f];
        u = 1 / (Math.abs(d) + Math.sqrt(d * d + 1));
      }
      let y = 1 / Math.sqrt(u * u + 1), c = u * y, l = o[m * r + f];
      for (o[m * r + f] = 0, o[m * r + m] -= u * l, o[f * r + f] += u * l, n = 0; n < m; n += 1)
        z(this, y, c, n, m, n, f);
      for (n = m + 1; n < f; n += 1)
        z(this, y, c, m, n, n, f);
      for (n = f + 1; n < r; n += 1)
        z(this, y, c, m, n, f, n);
      for (n = 0; n < r; n += 1)
        z(e, y, c, n, m, n, f);
    } while (a >= 1e-9);
    return [this.diagonal(), e];
  }
}
function $r(r, t = 1e-6) {
  let { data: o } = this, { data: e } = r, a = new D(this, r);
  for (let [n, s] of a)
    if (Math.abs(o[n] - e[s]) > t)
      return false;
  return true;
}
function Cr(r) {
  let { shape: t } = this, { shape: o } = r;
  if (!t.every((e, a) => e === o[a]))
    throw new Error(`shapes ${t} and ${o} do not match`);
}
function Rr(r) {
  let { length: t } = this, { length: o } = r;
  if (t !== o)
    throw new Error(`lengths ${t} and ${o} do not match`);
}
var { exp: Co } = Math;
function Pr() {
  let { data: r } = this, t = new p(this);
  for (let o of t)
    r[o] = Co(r[o]);
  return this;
}
var { expm1: Po } = Math;
function Br() {
  let { data: r } = this, t = new p(this);
  for (let o of t)
    r[o] = Po(r[o]);
  return this;
}
function Hr(r = 0) {
  let { data: t } = this, o = new p(this);
  for (let e of o)
    t[e] = r instanceof Function ? r(e) : r;
  return this;
}
var { floor: Jo } = Math;
function Jr() {
  let { data: r } = this, t = new p(this);
  for (let o of t)
    r[o] = Jo(r[o]);
  return this;
}
function Vr(r) {
  let { data: t } = this, o = new p(this);
  for (let e of o)
    r.call(this, t[e], e, t);
}
var { fround: Wo } = Math;
function Gr() {
  let { data: r } = this, t = new p(this);
  for (let o of t)
    r[o] = Wo(r[o]);
  return this;
}
function Wr() {
  let { shape: [r, t], data: o } = this, e = 0, a, n, s, m, f;
  for (s = 0; s < r; s += 1) {
    if (t <= e)
      return this;
    for (m = s; o[m * t + e] === 0; )
      if (m += 1, r === m && (m = s, e += 1, t === e))
        return this;
    if (s !== m && this.swap(s, m), n = o[s * t + e], n !== 0)
      for (f = 0; f < t; f += 1)
        o[s * t + f] /= n;
    for (m = 0; m < r; m += 1)
      if (a = o[m * t + e], m !== s)
        for (f = 0; f < t; f += 1)
          o[m * t + f] -= o[s * t + f] * a;
    e += 1;
  }
  for (s = 0; s < r; s += 1) {
    for (n = 0, m = 0; m < t; m += 1)
      n === 0 && (n = o[s * t + m]);
    if (n !== 0)
      for (f = 0; f < t; f += 1)
        o[s * t + f] /= n;
  }
  return this;
}
function Xr(...r) {
  this.check(...r);
  let { data: t, shape: o } = this, { length: e } = o, a = r[e - 1], n, s;
  for (n = 0; n < e - 1; n += 1) {
    let m = 1;
    for (s = n + 1; s < e; s += 1)
      m *= o[s];
    a += r[n] * m;
  }
  return t[a];
}
var L;
try {
  L = H("nlapack");
} catch {
}
function O(r, t, o, e, a, n) {
  if (e.length !== t * o)
    throw new Error("lengths do not match");
  switch (r) {
    case "float64":
      return L.dgetrf(t, o, e, a, n);
    case "float32":
      return L.sgetrf(t, o, e, a, n);
    default:
      throw new Error("wrong dtype");
  }
}
function Yr(r, t, o, e, a) {
  if (o.length !== t * t)
    throw new Error("lengths do not match");
  switch (r) {
    case "float64":
      return L.dgetri(t, o, e, a);
    case "float32":
      return L.sgetri(t, o, e, a);
    default:
      throw new Error("wrong dtype");
  }
}
function Zr(r, t, o, e, a, n, s, m) {
  if (e.length !== a * t || s.length !== m * o)
    throw new Error("lengths do not match");
  switch (r) {
    case "float64":
      return L.dgesv(t, o, e, a, n, s, m);
    case "float32":
      return L.sgesv(t, o, e, a, n, s, m);
    default:
      throw new Error("wrong dtype");
  }
}
function Kr() {
  this.square();
  let { shape: [r], dtype: t } = this;
  try {
    let { data: o } = this, e = new Int32Array(r);
    return O(t, r, r, o, r, e), Yr(t, r, o, r, e), this;
  } catch {
    let e = M(r), a = Y(this, e).gauss(), n = N(r, r), s = N(r, r), { data: m } = a, { data: f } = n, { data: u } = s, y = new p(a), [c, l] = y.coords;
    for (let d of y)
      l < r ? f[c * r + l] = m[d] : u[c * r + (l - r)] = m[d], [c, l] = y.coords;
    if (!n.equals(e))
      throw new Error("matrix is not invertible");
    return s;
  }
}
var { log: Qo } = Math;
function Qr() {
  let { data: r } = this, t = new p(this);
  for (let o of t)
    r[o] = Qo(r[o]);
  return this;
}
var { log10: te } = Math;
function rt() {
  let { data: r } = this, t = new p(this);
  for (let o of t)
    r[o] = te(r[o]);
  return this;
}
var { log1p: ee } = Math;
function tt() {
  let { data: r } = this, t = new p(this);
  for (let o of t)
    r[o] = ee(r[o]);
  return this;
}
var { log2: ae } = Math;
function ot() {
  let { data: r } = this, t = new p(this);
  for (let o of t)
    r[o] = ae(r[o]);
  return this;
}
function et() {
  let [r, t] = this.copy().lu_factor(), o = r.copy(), e = r.copy(), { data: a } = o, { data: n } = e, s = new p(r), [m, f] = s.coords;
  for (let u of s)
    f < m ? n[u] = 0 : a[u] = m === f ? 1 : 0, [m, f] = s.coords;
  return [o, e, t];
}
function nt() {
  let { data: r, shape: [t], dtype: o } = this, e = new Int32Array(t);
  try {
    O(o, t, t, r, t, e);
  } catch {
    let n, s, m, f, u, y, c;
    for (c = 0; c < t; c += 1) {
      for (f = c, n = Math.abs(r[c * t + c]), y = c + 1; y < t; y += 1)
        s = Math.abs(r[y * t + c]), n < s && (n = s, f = y);
      for (e[c] = f + 1, f !== c && this.swap(c, f), m = r[c * t + c], u = c + 1; u < t; u += 1)
        r[u * t + c] /= m;
      for (u = c + 1; u < t; u += 1) {
        for (y = c + 1; y < t - 1; y += 2)
          r[u * t + y] -= r[u * t + c] * r[c * t + y], r[u * t + y + 1] -= r[u * t + c] * r[c * t + y + 1];
        y === t - 1 && (r[u * t + y] -= r[u * t + c] * r[c * t + y]);
      }
    }
  }
  return [this, e];
}
function at(r) {
  let { data: t } = this, o = new p(this), e = r.bind(this), a = this.copy(), { data: n } = a;
  for (let s of o)
    n[s] = e(t[s], s, t);
  return a;
}
function it() {
  let { data: r, length: t, strides: o, dtype: e } = this, a = Number.NEGATIVE_INFINITY;
  try {
    let n = o[o.length - 1];
    a = r[hr(e, t, r, n)];
  } catch {
    let s = new p(this);
    for (let m of s) {
      let f = r[m];
      a < f && (a = f);
    }
  }
  return a;
}
function st() {
  let { data: r, length: t } = this, o = new p(this), e = 0;
  for (let a of o)
    e += r[a];
  return e / t;
}
function mt() {
  let { data: r } = this, t = new p(this), o = Number.POSITIVE_INFINITY;
  for (let e of t) {
    let a = r[e];
    o > a && (o = a);
  }
  return o;
}
var K = (r, t) => new A(new Float64Array(r * t), { shape: [r, t] });
function ft(r) {
  let { shape: [t, o], data: e, dtype: a } = this.copy(), { shape: [n, s], data: m } = r.copy();
  if (o !== n)
    throw new Error("sizes do not match");
  let f = K(t, s), { data: u } = f;
  try {
    dr(a, X, X, t, s, o, 1, e, o, m, s, 0, u, s);
  } catch {
    let c = new p(f), l, [d, v] = c.coords;
    for (let q of c) {
      let _ = 0;
      for (l = 0; l < o; l += 1)
        _ += e[d * o + l] * m[l * s + v];
      u[q] = _, [d, v] = c.coords;
    }
  }
  return f;
}
var { sqrt: le } = Math;
function pt() {
  let { data: r, length: t, strides: o, dtype: e } = this, a = 0;
  try {
    let n = o[o.length - 1];
    a = Ar(e, t, r, n);
  } catch {
    a = le(this.dot(this));
  }
  return a;
}
function ut() {
  return this.scale(1 / this.norm());
}
var { pow: Ae } = Math;
function ct(r) {
  let { data: t } = this, o = new p(this);
  for (let e of o)
    t[e] = Ae(t[e], r);
  return this;
}
function yt() {
  let { data: r } = this, t = new p(this), o = 1;
  for (let e of t)
    o *= r[e];
  return o;
}
function lt(r) {
  let { data: t } = this, { data: o } = r, e = new D(this, r);
  for (let [a, n] of e)
    t[a] *= o[n];
  return this;
}
function ht(r) {
  return r.scale(this.dot(r) / r.dot(r));
}
function dt(r) {
  if (this.shape.length !== 1)
    throw new Error("push operation not permitted for multidimensional arrays");
  let { data: t, length: o } = this, e = o + 1, a = new (g(this.dtype))(e);
  return a.set(t), a[o] = r, this.data = a, this.length = e, this.shape = [e], this;
}
function At(r = 1e-6) {
  let { data: t } = this.copy().gauss(), o = new p(this), e = 0, [a, n] = o.coords;
  for (let s of o)
    e <= a && n >= a && Math.abs(t[s]) > r && (e += 1), [a, n] = o.coords;
  return e;
}
function bt() {
  let { data: r } = this, t = new p(this);
  for (let o of t)
    r[o] = 1 / r[o];
  return this;
}
function Dt(r, t) {
  let { data: o, length: e } = this;
  if (e === 0 && typeof t > "u")
    throw new Error("Reduce of empty array with no initial value.");
  let a = new p(this), n = r.bind(this), s;
  typeof t > "u" ? (s = o[0], a.next()) : s = t;
  for (let m of a)
    s = n(s, o[m], m, o);
  return s;
}
function Nt(...r) {
  let { length: t } = this;
  if (r.reduce((o, e) => o * e, 1) !== t)
    throw new Error(`shape ${r} does not match length ${t}`);
  return this.shape = r, this.strides = I(r), this;
}
var { round: Te } = Math;
function gt() {
  let { data: r } = this, t = new p(this);
  for (let o of t)
    r[o] = Te(r[o]);
  return this;
}
function xt(r, t, o = 1) {
  this.check(r, 0), this.check(t, 0);
  let [, e] = this.shape, { data: a } = this, n;
  for (n = 0; n < e; n += 1)
    a[r * e + n] += a[t * e + n] * o;
  return this;
}
function wt(r) {
  let { data: t, length: o, strides: e, dtype: a } = this;
  try {
    let n = e[e.length - 1];
    br(a, o, r, t, n);
  } catch {
    let s = new p(this);
    for (let m of s)
      t[m] *= r;
  }
  return this;
}
function kt(...r) {
  let t = r.slice(0, -1), o = r[r.length - 1];
  this.check(...t);
  let { shape: e } = this, a = t[t.length - 1], n;
  for (n = 0; n < t.length - 1; n += 1)
    a += t[n] * e[n + 1];
  this.data[a] = o;
}
var { sign: qe } = Math;
function Lt() {
  let { data: r } = this, t = new p(this);
  for (let o of t)
    r[o] = qe(r[o]);
  return this;
}
var { sin: Se } = Math;
function It() {
  let { data: r } = this, t = new p(this);
  for (let o of t)
    r[o] = Se(r[o]);
  return this;
}
var { sinh: Oe } = Math;
function Tt() {
  let { data: r } = this, t = new p(this);
  for (let o of t)
    r[o] = Oe(r[o]);
  return this;
}
function Et(r = 0, t = this.shape[0], o = 1) {
  let { data: e, shape: a } = this, n = a.length;
  if (r < 0 || t < 0)
    return this.slice(r < 0 ? a[a.length - 1] + r : r, t < 0 ? a[a.length - 1] + t : t);
  if (r > t)
    return this.slice(t, r, o);
  if (o <= 0)
    throw new Error("step argument has to be a positive integer");
  let s = [Math.ceil((t - r) / Math.abs(o)), ...a.slice(1)], m = S(s), f = I(s), u = n > 1 ? e.subarray(r * s[s.length - 1], t * s[s.length - 1]) : e.subarray(r, t);
  return f[0] *= o, new A(u, { shape: s, length: m, strides: f });
}
function vt(r) {
  let { data: t, dtype: o } = this, { data: e, shape: [a, n] } = r;
  try {
    let s = new Int32Array(a);
    Zr(o, a, n, t, a, s, e, n);
  } catch {
    let [m, f] = this.lu_factor(), { data: u } = m, { data: y } = r, c, l, d;
    for (c = 0; c < f.length; c += 1)
      c !== f[c] - 1 && r.swap(c, f[c] - 1);
    for (d = 0; d < n; d += 1) {
      for (c = 0; c < a; c += 1)
        for (l = 0; l < c; l += 1)
          y[c * n + d] -= u[c * a + l] * y[l * n + d];
      for (c = a - 1; c >= 0; c -= 1) {
        for (l = c + 1; l < a; l += 1)
          y[c * n + d] -= u[c * a + l] * y[l * n + d];
        y[c * n + d] /= u[c * a + c];
      }
    }
  }
  return r;
}
var { sqrt: Ce } = Math;
function Mt() {
  let { data: r } = this, t = new p(this);
  for (let o of t)
    r[o] = Ce(r[o]);
  return this;
}
function jt() {
  let { length: r } = this.shape, [t, o] = this.shape;
  if (r !== 2 || t !== o)
    throw new Error("matrix is not square");
}
function qt(r) {
  return this.add(r, -1);
}
function _t() {
  let { data: r } = this, t = new p(this), o = 0;
  for (let e of t)
    o += r[e];
  return o;
}
function St(r, t) {
  this.check(r, 0), this.check(t, 0);
  let { data: o } = this, [, e] = this.shape, a = o.slice(r * e, (r + 1) * e);
  return o.copyWithin(r * e, t * e, (t + 1) * e), o.set(a, t * e), this;
}
var { tan: Ve } = Math;
function zt() {
  let { data: r } = this, t = new p(this);
  for (let o of t)
    r[o] = Ve(r[o]);
  return this;
}
var { tanh: We } = Math;
function Ot() {
  let { data: r } = this, t = new p(this);
  for (let o of t)
    r[o] = We(r[o]);
  return this;
}
function Ft(r = 0, t = 0) {
  let { data: o, shape: e, strides: a } = this, { length: n } = e;
  if (t >= n)
    return o[r];
  let s = e[t], m = a[t], f = [];
  for (let u = 0; u < s; u++) {
    let y = this.toArray(r, t + 1);
    if (y === null)
      return null;
    f[u] = y, r += m;
  }
  return f;
}
var Jt = to(Ht());
function sr() {
  return `array(${(0, Jt.inspect)(this.toArray(), { depth: 10, breakLength: 40 })}, dtype=${this.dtype})`;
}
function Vt() {
  let [r, t] = this.shape, { data: o } = this, e = Math.min(r, t), a = 0, n;
  for (n = 0; n < e; n += 1)
    a += o[n * t + n];
  return a;
}
function Gt() {
  if (this.shape.length < 2)
    return this;
  let r = this.shape[0];
  return this.shape[0] = this.shape[1], this.shape[1] = r, r = this.strides[0], this.strides[0] = this.strides[1], this.strides[1] = r, this;
}
var { trunc: yn } = Math;
function Wt() {
  let { data: r } = this, t = new p(this);
  for (let o of t)
    r[o] = yn(r[o]);
  return this;
}
var Dn = Symbol.for("nodejs.util.inspect.custom");
var A = class {
  data = new Float64Array(0);
  dtype = "float64";
  length = 0;
  shape = [0];
  strides = [0];
  [Dn] = sr;
  abs = pr;
  acos = ur;
  acosh = cr;
  add = Dr;
  angle = Nr;
  asin = gr;
  asinh = xr;
  atan = wr;
  atanh = kr;
  augment = Lr;
  binOp = Ir;
  cbrt = Tr;
  ceil = Er;
  check = vr;
  combine = Mr;
  copy = jr;
  cos = qr;
  cosh = _r;
  cross = Sr;
  det = zr;
  diagonal = Or;
  dot = Fr;
  eig = Ur;
  equals = $r;
  equidimensional = Cr;
  equilateral = Rr;
  exp = Pr;
  expm1 = Br;
  fill = Hr;
  floor = Jr;
  forEach = Vr;
  fround = Gr;
  gauss = Wr;
  get = Xr;
  inv = Kr;
  log = Qr;
  log10 = rt;
  log1p = tt;
  log2 = ot;
  lu = et;
  lu_factor = nt;
  map = at;
  max = it;
  mean = st;
  min = mt;
  multiply = ft;
  norm = pt;
  normalize = ut;
  pow = ct;
  prod = yt;
  product = lt;
  project = ht;
  push = dt;
  rank = At;
  reciprocal = bt;
  reduce = Dt;
  reshape = Nt;
  round = gt;
  row_add = xt;
  scale = wt;
  set = kt;
  sign = Lt;
  sin = It;
  sinh = Tt;
  slice = Et;
  solve = vt;
  sqrt = Mt;
  square = jt;
  subtract = qt;
  sum = _t;
  swap = St;
  tan = zt;
  tanh = Ot;
  toArray = Ft;
  toString = sr;
  trace = Vt;
  transpose = Gt;
  trunc = Wt;
  constructor(t, o) {
    if (!t)
      return;
    if (t instanceof A)
      return t;
    if (t instanceof p) {
      if (!o || !o.dtype)
        throw new Error("dtype is missing");
      t.shape && (o.shape = t.shape);
      let m = t.length;
      t = new (g(o.dtype))(m);
    }
    let { shape: e = W(t), length: a = S(e), strides: n = I(e), dtype: s = fr(t) } = o || {};
    this.data = G(t) ? t : new (g(s))(V(t)), this.shape = e, this.length = a, this.dtype = s, this.strides = n;
  }
  get x() {
    return this.get(0);
  }
  set x(t) {
    this.set(0, t);
  }
  get y() {
    return this.get(1);
  }
  set y(t) {
    this.set(1, t);
  }
  get z() {
    return this.get(2);
  }
  set z(t) {
    this.set(2, t);
  }
  get w() {
    return this.get(3);
  }
  set w(t) {
    this.set(3, t);
  }
  get T() {
    return this.copy().transpose();
  }
};
try {
  window.v = A;
} catch {
}

// src/math-pyramid-handler.ts
var createHandler = async (event) => {
  const HEADERS = {
    "Content-Type": "application/json",
    "X-Custom-Header": "application/json",
    "Access-Control-Allow-Origin": "http://localhost:3000"
  };
  try {
    const queryParameters = getQueryParameters(event);
    const solution = createRandomSolution(
      queryParameters.get("size"),
      queryParameters.get("maxValue")
    );
    const startValues = getUniquelySolvableRandomStartValues(solution);
    console.log(`Start values: ${JSON.stringify(startValues)}`);
    console.log(`Solution values: ${JSON.stringify(solution)}`);
    return {
      statusCode: 200,
      headers: HEADERS,
      body: JSON.stringify({
        size: queryParameters.get("size"),
        startValues,
        solution
      })
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      headers: HEADERS,
      body: `{ "message": "${err}" }`
    };
  }
  function createRandomSolution(size, maxValue) {
    const maxValueInLowestRow = Math.max(2, Math.floor(maxValue / Math.pow(2, size - 1)));
    const randomSolution = new Array(size).fill(0).map(() => Math.floor(Math.random() * (maxValueInLowestRow - 1) + 1));
    let offset = 0;
    for (let i2 = 1; i2 < size; i2++) {
      for (let j2 = 0; j2 < size - i2; j2++) {
        randomSolution.push(randomSolution[offset + j2] + randomSolution[offset + j2 + 1]);
      }
      offset += size - (i2 - 1);
    }
    return randomSolution;
  }
  function getUniquelySolvableRandomStartValues(solution) {
    const size = getSizeFromNumberOfBlocks(solution.length);
    let startValues = getRandomStartValues(solution);
    let tries = 1;
    const maxIterations = 250;
    while (isNotSolvable(startValues, size) && tries <= maxIterations) {
      startValues = getRandomStartValues(solution);
      tries++;
    }
    if (tries >= maxIterations) {
      throw new Error(`Could not find a uniquely solvable solution in ${maxIterations} iterations.`);
    }
    console.log(`Needed ${tries} iterations to find suitable start values.`);
    const startValuesAsArray = new Array(solution.length).fill(null);
    startValues.forEach((value, key) => {
      startValuesAsArray[key] = value;
    });
    return startValuesAsArray;
  }
  function getRandomStartValues(solution) {
    const size = getSizeFromNumberOfBlocks(solution.length);
    const numberOfBlocks = getNumberOfBlocks(size);
    const randomStartValues = /* @__PURE__ */ new Map();
    const randomIndices = getRandomIndices(numberOfBlocks, size);
    randomIndices.forEach((randomIndex) => {
      randomStartValues.set(randomIndex, solution[randomIndex]);
    });
    return randomStartValues;
  }
  function getDifficulty(startPositions, size) {
    if (!isUniquelySolvable(startPositions, size)) {
      return null;
    }
    const calculatablePositions = new Set(startPositions);
    for (let i2 = 0; i2 < size; i2++) {
      addCurrentCalculatablePositions(calculatablePositions, size);
    }
    return calculatablePositions.size < getNumberOfBlocks(size) ? 1 : 0;
  }
  function addCurrentCalculatablePositions(calculatablePositions, size) {
    for (let row = 0; row < size - 1; row++) {
      for (let column = 0; column < size - row; column++) {
        if (column + 1 < size - row) {
          const first = getIndex(row, column, size);
          const second = getIndex(row, column + 1, size);
          if (calculatablePositions.has(first) && calculatablePositions.has(second)) {
            calculatablePositions.add(getIndex(row + 1, column, size));
          }
          const firstMinus = getIndex(row, column, size);
          const secondMinus = getIndex(row + 1, column, size);
          if (calculatablePositions.has(firstMinus) && calculatablePositions.has(secondMinus)) {
            calculatablePositions.add(getIndex(row, column + 1, size));
          }
        }
        if (column > 0) {
          const firstMinus = getIndex(row, column, size);
          const secondMinus = getIndex(row + 1, column - 1, size);
          if (calculatablePositions.has(firstMinus) && calculatablePositions.has(secondMinus)) {
            calculatablePositions.add(getIndex(row, column - 1, size));
          }
        }
      }
    }
  }
  function getIndex(rowId, colId, size) {
    checkDimensions(rowId, colId, size);
    let index = 0;
    for (let i2 = 0; i2 < rowId; i2 = i2 + 1) {
      index = index + size - i2;
    }
    return index + colId;
  }
  function checkDimensions(rowId, colId, size) {
    let message = "";
    if (rowId < 0 || rowId >= size) {
      message += `rowId ${rowId} must be non-negative and smaller than the size of the pyramid ${size}`;
    }
    if (colId < 0 || colId >= size - rowId) {
      message += `colId ${colId} must be non-negative and smaller than the size of the pyramid minus rowId ${rowId}, size ${size}`;
    }
    if (message.length > 0) {
      throw new Error(message);
    }
  }
  function isUniquelySolvable(startValues, size) {
    const columns = getNumberOfBlocks(size);
    const rows = columns - size;
    const A2 = K(rows, rows);
    const F = createMatrix(size);
    let column = 0;
    for (let i2 = 0; i2 < columns; i2++) {
      if (!startValues.has(i2)) {
        for (let j2 = 0; j2 < rows; j2++) {
          A2.set(j2, column, F.get(j2, i2));
        }
        column++;
      }
    }
    const b2 = K(rows, 1);
    try {
      A2.solve(b2);
      return true;
    } catch (e) {
      return false;
    }
  }
  function createMatrix(size) {
    const numberOfColumns = getNumberOfBlocks(size);
    const numberOfRows = numberOfColumns - size;
    const A2 = K(numberOfRows, numberOfColumns);
    for (let i2 = 0; i2 < numberOfRows; i2++) {
      A2.set(i2, i2 + size, -1);
    }
    let row = 0;
    for (let i2 = 0; i2 < size - 1; i2++) {
      for (let j2 = 0; j2 < size - 1 - i2; j2++) {
        A2.set(row + j2, row + j2 + i2, 1);
        A2.set(row + j2, row + j2 + i2 + 1, 1);
      }
      row += size - i2 - 1;
    }
    return A2;
  }
  function getRandomIndices(maxValue, numberOfIndices) {
    const givenList = Array.from({ length: maxValue }, (_, i2) => i2);
    givenList.sort(() => Math.random() - 0.5);
    return givenList.slice(0, numberOfIndices);
  }
  function getNumberOfBlocks(size) {
    return (size * size + size) / 2;
  }
  function getSizeFromNumberOfBlocks(numberOfBlocks) {
    return (Math.sqrt(1 + 8 * numberOfBlocks) - 1) / 2;
  }
  function isNotSolvable(startValues, size) {
    const difficulty = getDifficulty(new Set(startValues.keys()), size);
    return difficulty === 1 || difficulty === null;
  }
  function getQueryParameters(event2) {
    const queryParameters = /* @__PURE__ */ new Map([
      ["size", 3],
      ["maxValue", 100]
    ]);
    const size = event2.queryStringParameters?.size;
    const maxValue = event2.queryStringParameters?.maxValue;
    if (isDefined(size)) {
      if (isValidSize(size)) {
        queryParameters.set("size", Number(event2.queryStringParameters.size));
      } else {
        throw new Error(`Invalid size: size must be between 3 and 10. Current value:${size}`);
      }
    }
    if (isDefined(maxValue)) {
      if (isValidMaxValue(maxValue)) {
        queryParameters.set("maxValue", Number(event2.queryStringParameters.maxValue));
      } else {
        throw new Error(`Invalid maxValue: maxValue must be between 100 and 1000000. Current value:${maxValue}`);
      }
    }
    console.log(`Using the following values: ${[...queryParameters.entries()]}`);
    return queryParameters;
  }
  function isDefined(size) {
    return size !== null && size !== void 0;
  }
  function isValidSize(size) {
    try {
      if (size === void 0) {
        return false;
      }
      const parsedSize = parseInt(size);
      return parsedSize >= 3 && parsedSize <= 10;
    } catch (error) {
      return false;
    }
  }
  function isValidMaxValue(maxValue) {
    try {
      if (maxValue === void 0) {
        return false;
      }
      const parsedMaxValue = parseInt(maxValue);
      return parsedMaxValue >= 100 && parsedMaxValue <= 1e6;
    } catch (error) {
      return false;
    }
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createHandler
});
