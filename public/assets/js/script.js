"use strict";
( () => {
    var Gk = Object.create;
    var Ap = Object.defineProperty;
    var Zk = Object.getOwnPropertyDescriptor;
    var Yk = Object.getOwnPropertyNames;
    var $k = Object.getPrototypeOf
      , Jk = Object.prototype.hasOwnProperty;
    var C = (r, e) => () => (r && (e = r(r = 0)),
    e);
    var _e = (r, e) => () => (e || r((e = {
        exports: {}
    }).exports, e),
    e.exports)
      , ie = (r, e) => {
        for (var t in e)
            Ap(r, t, {
                get: e[t],
                enumerable: !0
            })
    }
      , Xk = (r, e, t, n) => {
        if (e && typeof e == "object" || typeof e == "function")
            for (let o of Yk(e))
                !Jk.call(r, o) && o !== t && Ap(r, o, {
                    get: () => e[o],
                    enumerable: !(n = Zk(e, o)) || n.enumerable
                });
        return r
    }
    ;
    var je = (r, e, t) => (t = r != null ? Gk($k(r)) : {},
    Xk(e || !r || !r.__esModule ? Ap(t, "default", {
        value: r,
        enumerable: !0
    }) : t, r));
    var Ip = _e(La => {
        "use strict";
        h();
        La.byteLength = eI;
        La.toByteArray = rI;
        La.fromByteArray = sI;
        var $r = []
          , Rr = []
          , Qk = typeof Uint8Array < "u" ? Uint8Array : Array
          , kp = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        for (Fo = 0,
        Gh = kp.length; Fo < Gh; ++Fo)
            $r[Fo] = kp[Fo],
            Rr[kp.charCodeAt(Fo)] = Fo;
        var Fo, Gh;
        Rr[45] = 62;
        Rr[95] = 63;
        function Zh(r) {
            var e = r.length;
            if (e % 4 > 0)
                throw new Error("Invalid string. Length must be a multiple of 4");
            var t = r.indexOf("=");
            t === -1 && (t = e);
            var n = t === e ? 0 : 4 - t % 4;
            return [t, n]
        }
        function eI(r) {
            var e = Zh(r)
              , t = e[0]
              , n = e[1];
            return (t + n) * 3 / 4 - n
        }
        function tI(r, e, t) {
            return (e + t) * 3 / 4 - t
        }
        function rI(r) {
            var e, t = Zh(r), n = t[0], o = t[1], s = new Qk(tI(r, n, o)), i = 0, u = o > 0 ? n - 4 : n, f;
            for (f = 0; f < u; f += 4)
                e = Rr[r.charCodeAt(f)] << 18 | Rr[r.charCodeAt(f + 1)] << 12 | Rr[r.charCodeAt(f + 2)] << 6 | Rr[r.charCodeAt(f + 3)],
                s[i++] = e >> 16 & 255,
                s[i++] = e >> 8 & 255,
                s[i++] = e & 255;
            return o === 2 && (e = Rr[r.charCodeAt(f)] << 2 | Rr[r.charCodeAt(f + 1)] >> 4,
            s[i++] = e & 255),
            o === 1 && (e = Rr[r.charCodeAt(f)] << 10 | Rr[r.charCodeAt(f + 1)] << 4 | Rr[r.charCodeAt(f + 2)] >> 2,
            s[i++] = e >> 8 & 255,
            s[i++] = e & 255),
            s
        }
        function nI(r) {
            return $r[r >> 18 & 63] + $r[r >> 12 & 63] + $r[r >> 6 & 63] + $r[r & 63]
        }
        function oI(r, e, t) {
            for (var n, o = [], s = e; s < t; s += 3)
                n = (r[s] << 16 & 16711680) + (r[s + 1] << 8 & 65280) + (r[s + 2] & 255),
                o.push(nI(n));
            return o.join("")
        }
        function sI(r) {
            for (var e, t = r.length, n = t % 3, o = [], s = 16383, i = 0, u = t - n; i < u; i += s)
                o.push(oI(r, i, i + s > u ? u : i + s));
            return n === 1 ? (e = r[t - 1],
            o.push($r[e >> 2] + $r[e << 4 & 63] + "==")) : n === 2 && (e = (r[t - 2] << 8) + r[t - 1],
            o.push($r[e >> 10] + $r[e >> 4 & 63] + $r[e << 2 & 63] + "=")),
            o.join("")
        }
    }
    );
    var Bp = _e(Rp => {
        h();
        Rp.read = function(r, e, t, n, o) {
            var s, i, u = o * 8 - n - 1, f = (1 << u) - 1, g = f >> 1, b = -7, E = t ? o - 1 : 0, q = t ? -1 : 1, O = r[e + E];
            for (E += q,
            s = O & (1 << -b) - 1,
            O >>= -b,
            b += u; b > 0; s = s * 256 + r[e + E],
            E += q,
            b -= 8)
                ;
            for (i = s & (1 << -b) - 1,
            s >>= -b,
            b += n; b > 0; i = i * 256 + r[e + E],
            E += q,
            b -= 8)
                ;
            if (s === 0)
                s = 1 - g;
            else {
                if (s === f)
                    return i ? NaN : (O ? -1 : 1) * (1 / 0);
                i = i + Math.pow(2, n),
                s = s - g
            }
            return (O ? -1 : 1) * i * Math.pow(2, s - n)
        }
        ;
        Rp.write = function(r, e, t, n, o, s) {
            var i, u, f, g = s * 8 - o - 1, b = (1 << g) - 1, E = b >> 1, q = o === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0, O = n ? 0 : s - 1, Z = n ? 1 : -1, ee = e < 0 || e === 0 && 1 / e < 0 ? 1 : 0;
            for (e = Math.abs(e),
            isNaN(e) || e === 1 / 0 ? (u = isNaN(e) ? 1 : 0,
            i = b) : (i = Math.floor(Math.log(e) / Math.LN2),
            e * (f = Math.pow(2, -i)) < 1 && (i--,
            f *= 2),
            i + E >= 1 ? e += q / f : e += q * Math.pow(2, 1 - E),
            e * f >= 2 && (i++,
            f /= 2),
            i + E >= b ? (u = 0,
            i = b) : i + E >= 1 ? (u = (e * f - 1) * Math.pow(2, o),
            i = i + E) : (u = e * Math.pow(2, E - 1) * Math.pow(2, o),
            i = 0)); o >= 8; r[t + O] = u & 255,
            O += Z,
            u /= 256,
            o -= 8)
                ;
            for (i = i << o | u,
            g += o; g > 0; r[t + O] = i & 255,
            O += Z,
            i /= 256,
            g -= 8)
                ;
            r[t + O - Z] |= ee * 128
        }
    }
    );
    var Ps = _e(Ts => {
        "use strict";
        h();
        var Tp = Ip()
          , Rs = Bp()
          , Yh = typeof Symbol == "function" && typeof Symbol.for == "function" ? Symbol.for("nodejs.util.inspect.custom") : null;
        Ts.Buffer = $;
        Ts.SlowBuffer = fI;
        Ts.INSPECT_MAX_BYTES = 50;
        var Na = 2147483647;
        Ts.kMaxLength = Na;
        $.TYPED_ARRAY_SUPPORT = iI();
        !$.TYPED_ARRAY_SUPPORT && typeof console < "u" && typeof console.error == "function" && console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support.");
        function iI() {
            try {
                let r = new Uint8Array(1)
                  , e = {
                    foo: function() {
                        return 42
                    }
                };
                return Object.setPrototypeOf(e, Uint8Array.prototype),
                Object.setPrototypeOf(r, e),
                r.foo() === 42
            } catch {
                return !1
            }
        }
        Object.defineProperty($.prototype, "parent", {
            enumerable: !0,
            get: function() {
                if ($.isBuffer(this))
                    return this.buffer
            }
        });
        Object.defineProperty($.prototype, "offset", {
            enumerable: !0,
            get: function() {
                if ($.isBuffer(this))
                    return this.byteOffset
            }
        });
        function xn(r) {
            if (r > Na)
                throw new RangeError('The value "' + r + '" is invalid for option "size"');
            let e = new Uint8Array(r);
            return Object.setPrototypeOf(e, $.prototype),
            e
        }
        function $(r, e, t) {
            if (typeof r == "number") {
                if (typeof e == "string")
                    throw new TypeError('The "string" argument must be of type string. Received type number');
                return Lp(r)
            }
            return Qh(r, e, t)
        }
        $.poolSize = 8192;
        function Qh(r, e, t) {
            if (typeof r == "string")
                return cI(r, e);
            if (ArrayBuffer.isView(r))
                return uI(r);
            if (r == null)
                throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof r);
            if (Jr(r, ArrayBuffer) || r && Jr(r.buffer, ArrayBuffer) || typeof SharedArrayBuffer < "u" && (Jr(r, SharedArrayBuffer) || r && Jr(r.buffer, SharedArrayBuffer)))
                return zp(r, e, t);
            if (typeof r == "number")
                throw new TypeError('The "value" argument must not be of type number. Received type number');
            let n = r.valueOf && r.valueOf();
            if (n != null && n !== r)
                return $.from(n, e, t);
            let o = pI(r);
            if (o)
                return o;
            if (typeof Symbol < "u" && Symbol.toPrimitive != null && typeof r[Symbol.toPrimitive] == "function")
                return $.from(r[Symbol.toPrimitive]("string"), e, t);
            throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof r)
        }
        $.from = function(r, e, t) {
            return Qh(r, e, t)
        }
        ;
        Object.setPrototypeOf($.prototype, Uint8Array.prototype);
        Object.setPrototypeOf($, Uint8Array);
        function ey(r) {
            if (typeof r != "number")
                throw new TypeError('"size" argument must be of type number');
            if (r < 0)
                throw new RangeError('The value "' + r + '" is invalid for option "size"')
        }
        function aI(r, e, t) {
            return ey(r),
            r <= 0 ? xn(r) : e !== void 0 ? typeof t == "string" ? xn(r).fill(e, t) : xn(r).fill(e) : xn(r)
        }
        $.alloc = function(r, e, t) {
            return aI(r, e, t)
        }
        ;
        function Lp(r) {
            return ey(r),
            xn(r < 0 ? 0 : Np(r) | 0)
        }
        $.allocUnsafe = function(r) {
            return Lp(r)
        }
        ;
        $.allocUnsafeSlow = function(r) {
            return Lp(r)
        }
        ;
        function cI(r, e) {
            if ((typeof e != "string" || e === "") && (e = "utf8"),
            !$.isEncoding(e))
                throw new TypeError("Unknown encoding: " + e);
            let t = ty(r, e) | 0
              , n = xn(t)
              , o = n.write(r, e);
            return o !== t && (n = n.slice(0, o)),
            n
        }
        function Pp(r) {
            let e = r.length < 0 ? 0 : Np(r.length) | 0
              , t = xn(e);
            for (let n = 0; n < e; n += 1)
                t[n] = r[n] & 255;
            return t
        }
        function uI(r) {
            if (Jr(r, Uint8Array)) {
                let e = new Uint8Array(r);
                return zp(e.buffer, e.byteOffset, e.byteLength)
            }
            return Pp(r)
        }
        function zp(r, e, t) {
            if (e < 0 || r.byteLength < e)
                throw new RangeError('"offset" is outside of buffer bounds');
            if (r.byteLength < e + (t || 0))
                throw new RangeError('"length" is outside of buffer bounds');
            let n;
            return e === void 0 && t === void 0 ? n = new Uint8Array(r) : t === void 0 ? n = new Uint8Array(r,e) : n = new Uint8Array(r,e,t),
            Object.setPrototypeOf(n, $.prototype),
            n
        }
        function pI(r) {
            if ($.isBuffer(r)) {
                let e = Np(r.length) | 0
                  , t = xn(e);
                return t.length === 0 || r.copy(t, 0, 0, e),
                t
            }
            if (r.length !== void 0)
                return typeof r.length != "number" || Op(r.length) ? xn(0) : Pp(r);
            if (r.type === "Buffer" && Array.isArray(r.data))
                return Pp(r.data)
        }
        function Np(r) {
            if (r >= Na)
                throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + Na.toString(16) + " bytes");
            return r | 0
        }
        function fI(r) {
            return +r != r && (r = 0),
            $.alloc(+r)
        }
        $.isBuffer = function(e) {
            return e != null && e._isBuffer === !0 && e !== $.prototype
        }
        ;
        $.compare = function(e, t) {
            if (Jr(e, Uint8Array) && (e = $.from(e, e.offset, e.byteLength)),
            Jr(t, Uint8Array) && (t = $.from(t, t.offset, t.byteLength)),
            !$.isBuffer(e) || !$.isBuffer(t))
                throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
            if (e === t)
                return 0;
            let n = e.length
              , o = t.length;
            for (let s = 0, i = Math.min(n, o); s < i; ++s)
                if (e[s] !== t[s]) {
                    n = e[s],
                    o = t[s];
                    break
                }
            return n < o ? -1 : o < n ? 1 : 0
        }
        ;
        $.isEncoding = function(e) {
            switch (String(e).toLowerCase()) {
            case "hex":
            case "utf8":
            case "utf-8":
            case "ascii":
            case "latin1":
            case "binary":
            case "base64":
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
                return !0;
            default:
                return !1
            }
        }
        ;
        $.concat = function(e, t) {
            if (!Array.isArray(e))
                throw new TypeError('"list" argument must be an Array of Buffers');
            if (e.length === 0)
                return $.alloc(0);
            let n;
            if (t === void 0)
                for (t = 0,
                n = 0; n < e.length; ++n)
                    t += e[n].length;
            let o = $.allocUnsafe(t)
              , s = 0;
            for (n = 0; n < e.length; ++n) {
                let i = e[n];
                if (Jr(i, Uint8Array))
                    s + i.length > o.length ? ($.isBuffer(i) || (i = $.from(i)),
                    i.copy(o, s)) : Uint8Array.prototype.set.call(o, i, s);
                else if ($.isBuffer(i))
                    i.copy(o, s);
                else
                    throw new TypeError('"list" argument must be an Array of Buffers');
                s += i.length
            }
            return o
        }
        ;
        function ty(r, e) {
            if ($.isBuffer(r))
                return r.length;
            if (ArrayBuffer.isView(r) || Jr(r, ArrayBuffer))
                return r.byteLength;
            if (typeof r != "string")
                throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof r);
            let t = r.length
              , n = arguments.length > 2 && arguments[2] === !0;
            if (!n && t === 0)
                return 0;
            let o = !1;
            for (; ; )
                switch (e) {
                case "ascii":
                case "latin1":
                case "binary":
                    return t;
                case "utf8":
                case "utf-8":
                    return Mp(r).length;
                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                    return t * 2;
                case "hex":
                    return t >>> 1;
                case "base64":
                    return py(r).length;
                default:
                    if (o)
                        return n ? -1 : Mp(r).length;
                    e = ("" + e).toLowerCase(),
                    o = !0
                }
        }
        $.byteLength = ty;
        function lI(r, e, t) {
            let n = !1;
            if ((e === void 0 || e < 0) && (e = 0),
            e > this.length || ((t === void 0 || t > this.length) && (t = this.length),
            t <= 0) || (t >>>= 0,
            e >>>= 0,
            t <= e))
                return "";
            for (r || (r = "utf8"); ; )
                switch (r) {
                case "hex":
                    return vI(this, e, t);
                case "utf8":
                case "utf-8":
                    return ny(this, e, t);
                case "ascii":
                    return bI(this, e, t);
                case "latin1":
                case "binary":
                    return SI(this, e, t);
                case "base64":
                    return xI(this, e, t);
                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                    return EI(this, e, t);
                default:
                    if (n)
                        throw new TypeError("Unknown encoding: " + r);
                    r = (r + "").toLowerCase(),
                    n = !0
                }
        }
        $.prototype._isBuffer = !0;
        function jo(r, e, t) {
            let n = r[e];
            r[e] = r[t],
            r[t] = n
        }
        $.prototype.swap16 = function() {
            let e = this.length;
            if (e % 2 !== 0)
                throw new RangeError("Buffer size must be a multiple of 16-bits");
            for (let t = 0; t < e; t += 2)
                jo(this, t, t + 1);
            return this
        }
        ;
        $.prototype.swap32 = function() {
            let e = this.length;
            if (e % 4 !== 0)
                throw new RangeError("Buffer size must be a multiple of 32-bits");
            for (let t = 0; t < e; t += 4)
                jo(this, t, t + 3),
                jo(this, t + 1, t + 2);
            return this
        }
        ;
        $.prototype.swap64 = function() {
            let e = this.length;
            if (e % 8 !== 0)
                throw new RangeError("Buffer size must be a multiple of 64-bits");
            for (let t = 0; t < e; t += 8)
                jo(this, t, t + 7),
                jo(this, t + 1, t + 6),
                jo(this, t + 2, t + 5),
                jo(this, t + 3, t + 4);
            return this
        }
        ;
        $.prototype.toString = function() {
            let e = this.length;
            return e === 0 ? "" : arguments.length === 0 ? ny(this, 0, e) : lI.apply(this, arguments)
        }
        ;
        $.prototype.toLocaleString = $.prototype.toString;
        $.prototype.equals = function(e) {
            if (!$.isBuffer(e))
                throw new TypeError("Argument must be a Buffer");
            return this === e ? !0 : $.compare(this, e) === 0
        }
        ;
        $.prototype.inspect = function() {
            let e = ""
              , t = Ts.INSPECT_MAX_BYTES;
            return e = this.toString("hex", 0, t).replace(/(.{2})/g, "$1 ").trim(),
            this.length > t && (e += " ... "),
            "<Buffer " + e + ">"
        }
        ;
        Yh && ($.prototype[Yh] = $.prototype.inspect);
        $.prototype.compare = function(e, t, n, o, s) {
            if (Jr(e, Uint8Array) && (e = $.from(e, e.offset, e.byteLength)),
            !$.isBuffer(e))
                throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof e);
            if (t === void 0 && (t = 0),
            n === void 0 && (n = e ? e.length : 0),
            o === void 0 && (o = 0),
            s === void 0 && (s = this.length),
            t < 0 || n > e.length || o < 0 || s > this.length)
                throw new RangeError("out of range index");
            if (o >= s && t >= n)
                return 0;
            if (o >= s)
                return -1;
            if (t >= n)
                return 1;
            if (t >>>= 0,
            n >>>= 0,
            o >>>= 0,
            s >>>= 0,
            this === e)
                return 0;
            let i = s - o
              , u = n - t
              , f = Math.min(i, u)
              , g = this.slice(o, s)
              , b = e.slice(t, n);
            for (let E = 0; E < f; ++E)
                if (g[E] !== b[E]) {
                    i = g[E],
                    u = b[E];
                    break
                }
            return i < u ? -1 : u < i ? 1 : 0
        }
        ;
        function ry(r, e, t, n, o) {
            if (r.length === 0)
                return -1;
            if (typeof t == "string" ? (n = t,
            t = 0) : t > 2147483647 ? t = 2147483647 : t < -2147483648 && (t = -2147483648),
            t = +t,
            Op(t) && (t = o ? 0 : r.length - 1),
            t < 0 && (t = r.length + t),
            t >= r.length) {
                if (o)
                    return -1;
                t = r.length - 1
            } else if (t < 0)
                if (o)
                    t = 0;
                else
                    return -1;
            if (typeof e == "string" && (e = $.from(e, n)),
            $.isBuffer(e))
                return e.length === 0 ? -1 : $h(r, e, t, n, o);
            if (typeof e == "number")
                return e = e & 255,
                typeof Uint8Array.prototype.indexOf == "function" ? o ? Uint8Array.prototype.indexOf.call(r, e, t) : Uint8Array.prototype.lastIndexOf.call(r, e, t) : $h(r, [e], t, n, o);
            throw new TypeError("val must be string, number or Buffer")
        }
        function $h(r, e, t, n, o) {
            let s = 1
              , i = r.length
              , u = e.length;
            if (n !== void 0 && (n = String(n).toLowerCase(),
            n === "ucs2" || n === "ucs-2" || n === "utf16le" || n === "utf-16le")) {
                if (r.length < 2 || e.length < 2)
                    return -1;
                s = 2,
                i /= 2,
                u /= 2,
                t /= 2
            }
            function f(b, E) {
                return s === 1 ? b[E] : b.readUInt16BE(E * s)
            }
            let g;
            if (o) {
                let b = -1;
                for (g = t; g < i; g++)
                    if (f(r, g) === f(e, b === -1 ? 0 : g - b)) {
                        if (b === -1 && (b = g),
                        g - b + 1 === u)
                            return b * s
                    } else
                        b !== -1 && (g -= g - b),
                        b = -1
            } else
                for (t + u > i && (t = i - u),
                g = t; g >= 0; g--) {
                    let b = !0;
                    for (let E = 0; E < u; E++)
                        if (f(r, g + E) !== f(e, E)) {
                            b = !1;
                            break
                        }
                    if (b)
                        return g
                }
            return -1
        }
        $.prototype.includes = function(e, t, n) {
            return this.indexOf(e, t, n) !== -1
        }
        ;
        $.prototype.indexOf = function(e, t, n) {
            return ry(this, e, t, n, !0)
        }
        ;
        $.prototype.lastIndexOf = function(e, t, n) {
            return ry(this, e, t, n, !1)
        }
        ;
        function dI(r, e, t, n) {
            t = Number(t) || 0;
            let o = r.length - t;
            n ? (n = Number(n),
            n > o && (n = o)) : n = o;
            let s = e.length;
            n > s / 2 && (n = s / 2);
            let i;
            for (i = 0; i < n; ++i) {
                let u = parseInt(e.substr(i * 2, 2), 16);
                if (Op(u))
                    return i;
                r[t + i] = u
            }
            return i
        }
        function hI(r, e, t, n) {
            return Ca(Mp(e, r.length - t), r, t, n)
        }
        function yI(r, e, t, n) {
            return Ca(II(e), r, t, n)
        }
        function mI(r, e, t, n) {
            return Ca(py(e), r, t, n)
        }
        function gI(r, e, t, n) {
            return Ca(RI(e, r.length - t), r, t, n)
        }
        $.prototype.write = function(e, t, n, o) {
            if (t === void 0)
                o = "utf8",
                n = this.length,
                t = 0;
            else if (n === void 0 && typeof t == "string")
                o = t,
                n = this.length,
                t = 0;
            else if (isFinite(t))
                t = t >>> 0,
                isFinite(n) ? (n = n >>> 0,
                o === void 0 && (o = "utf8")) : (o = n,
                n = void 0);
            else
                throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
            let s = this.length - t;
            if ((n === void 0 || n > s) && (n = s),
            e.length > 0 && (n < 0 || t < 0) || t > this.length)
                throw new RangeError("Attempt to write outside buffer bounds");
            o || (o = "utf8");
            let i = !1;
            for (; ; )
                switch (o) {
                case "hex":
                    return dI(this, e, t, n);
                case "utf8":
                case "utf-8":
                    return hI(this, e, t, n);
                case "ascii":
                case "latin1":
                case "binary":
                    return yI(this, e, t, n);
                case "base64":
                    return mI(this, e, t, n);
                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                    return gI(this, e, t, n);
                default:
                    if (i)
                        throw new TypeError("Unknown encoding: " + o);
                    o = ("" + o).toLowerCase(),
                    i = !0
                }
        }
        ;
        $.prototype.toJSON = function() {
            return {
                type: "Buffer",
                data: Array.prototype.slice.call(this._arr || this, 0)
            }
        }
        ;
        function xI(r, e, t) {
            return e === 0 && t === r.length ? Tp.fromByteArray(r) : Tp.fromByteArray(r.slice(e, t))
        }
        function ny(r, e, t) {
            t = Math.min(r.length, t);
            let n = []
              , o = e;
            for (; o < t; ) {
                let s = r[o]
                  , i = null
                  , u = s > 239 ? 4 : s > 223 ? 3 : s > 191 ? 2 : 1;
                if (o + u <= t) {
                    let f, g, b, E;
                    switch (u) {
                    case 1:
                        s < 128 && (i = s);
                        break;
                    case 2:
                        f = r[o + 1],
                        (f & 192) === 128 && (E = (s & 31) << 6 | f & 63,
                        E > 127 && (i = E));
                        break;
                    case 3:
                        f = r[o + 1],
                        g = r[o + 2],
                        (f & 192) === 128 && (g & 192) === 128 && (E = (s & 15) << 12 | (f & 63) << 6 | g & 63,
                        E > 2047 && (E < 55296 || E > 57343) && (i = E));
                        break;
                    case 4:
                        f = r[o + 1],
                        g = r[o + 2],
                        b = r[o + 3],
                        (f & 192) === 128 && (g & 192) === 128 && (b & 192) === 128 && (E = (s & 15) << 18 | (f & 63) << 12 | (g & 63) << 6 | b & 63,
                        E > 65535 && E < 1114112 && (i = E))
                    }
                }
                i === null ? (i = 65533,
                u = 1) : i > 65535 && (i -= 65536,
                n.push(i >>> 10 & 1023 | 55296),
                i = 56320 | i & 1023),
                n.push(i),
                o += u
            }
            return wI(n)
        }
        var Jh = 4096;
        function wI(r) {
            let e = r.length;
            if (e <= Jh)
                return String.fromCharCode.apply(String, r);
            let t = ""
              , n = 0;
            for (; n < e; )
                t += String.fromCharCode.apply(String, r.slice(n, n += Jh));
            return t
        }
        function bI(r, e, t) {
            let n = "";
            t = Math.min(r.length, t);
            for (let o = e; o < t; ++o)
                n += String.fromCharCode(r[o] & 127);
            return n
        }
        function SI(r, e, t) {
            let n = "";
            t = Math.min(r.length, t);
            for (let o = e; o < t; ++o)
                n += String.fromCharCode(r[o]);
            return n
        }
        function vI(r, e, t) {
            let n = r.length;
            (!e || e < 0) && (e = 0),
            (!t || t < 0 || t > n) && (t = n);
            let o = "";
            for (let s = e; s < t; ++s)
                o += BI[r[s]];
            return o
        }
        function EI(r, e, t) {
            let n = r.slice(e, t)
              , o = "";
            for (let s = 0; s < n.length - 1; s += 2)
                o += String.fromCharCode(n[s] + n[s + 1] * 256);
            return o
        }
        $.prototype.slice = function(e, t) {
            let n = this.length;
            e = ~~e,
            t = t === void 0 ? n : ~~t,
            e < 0 ? (e += n,
            e < 0 && (e = 0)) : e > n && (e = n),
            t < 0 ? (t += n,
            t < 0 && (t = 0)) : t > n && (t = n),
            t < e && (t = e);
            let o = this.subarray(e, t);
            return Object.setPrototypeOf(o, $.prototype),
            o
        }
        ;
        function Vt(r, e, t) {
            if (r % 1 !== 0 || r < 0)
                throw new RangeError("offset is not uint");
            if (r + e > t)
                throw new RangeError("Trying to access beyond buffer length")
        }
        $.prototype.readUintLE = $.prototype.readUIntLE = function(e, t, n) {
            e = e >>> 0,
            t = t >>> 0,
            n || Vt(e, t, this.length);
            let o = this[e]
              , s = 1
              , i = 0;
            for (; ++i < t && (s *= 256); )
                o += this[e + i] * s;
            return o
        }
        ;
        $.prototype.readUintBE = $.prototype.readUIntBE = function(e, t, n) {
            e = e >>> 0,
            t = t >>> 0,
            n || Vt(e, t, this.length);
            let o = this[e + --t]
              , s = 1;
            for (; t > 0 && (s *= 256); )
                o += this[e + --t] * s;
            return o
        }
        ;
        $.prototype.readUint8 = $.prototype.readUInt8 = function(e, t) {
            return e = e >>> 0,
            t || Vt(e, 1, this.length),
            this[e]
        }
        ;
        $.prototype.readUint16LE = $.prototype.readUInt16LE = function(e, t) {
            return e = e >>> 0,
            t || Vt(e, 2, this.length),
            this[e] | this[e + 1] << 8
        }
        ;
        $.prototype.readUint16BE = $.prototype.readUInt16BE = function(e, t) {
            return e = e >>> 0,
            t || Vt(e, 2, this.length),
            this[e] << 8 | this[e + 1]
        }
        ;
        $.prototype.readUint32LE = $.prototype.readUInt32LE = function(e, t) {
            return e = e >>> 0,
            t || Vt(e, 4, this.length),
            (this[e] | this[e + 1] << 8 | this[e + 2] << 16) + this[e + 3] * 16777216
        }
        ;
        $.prototype.readUint32BE = $.prototype.readUInt32BE = function(e, t) {
            return e = e >>> 0,
            t || Vt(e, 4, this.length),
            this[e] * 16777216 + (this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3])
        }
        ;
        $.prototype.readBigUInt64LE = Vn(function(e) {
            e = e >>> 0,
            Bs(e, "offset");
            let t = this[e]
              , n = this[e + 7];
            (t === void 0 || n === void 0) && Ai(e, this.length - 8);
            let o = t + this[++e] * 2 ** 8 + this[++e] * 2 ** 16 + this[++e] * 2 ** 24
              , s = this[++e] + this[++e] * 2 ** 8 + this[++e] * 2 ** 16 + n * 2 ** 24;
            return BigInt(o) + (BigInt(s) << BigInt(32))
        });
        $.prototype.readBigUInt64BE = Vn(function(e) {
            e = e >>> 0,
            Bs(e, "offset");
            let t = this[e]
              , n = this[e + 7];
            (t === void 0 || n === void 0) && Ai(e, this.length - 8);
            let o = t * 2 ** 24 + this[++e] * 2 ** 16 + this[++e] * 2 ** 8 + this[++e]
              , s = this[++e] * 2 ** 24 + this[++e] * 2 ** 16 + this[++e] * 2 ** 8 + n;
            return (BigInt(o) << BigInt(32)) + BigInt(s)
        });
        $.prototype.readIntLE = function(e, t, n) {
            e = e >>> 0,
            t = t >>> 0,
            n || Vt(e, t, this.length);
            let o = this[e]
              , s = 1
              , i = 0;
            for (; ++i < t && (s *= 256); )
                o += this[e + i] * s;
            return s *= 128,
            o >= s && (o -= Math.pow(2, 8 * t)),
            o
        }
        ;
        $.prototype.readIntBE = function(e, t, n) {
            e = e >>> 0,
            t = t >>> 0,
            n || Vt(e, t, this.length);
            let o = t
              , s = 1
              , i = this[e + --o];
            for (; o > 0 && (s *= 256); )
                i += this[e + --o] * s;
            return s *= 128,
            i >= s && (i -= Math.pow(2, 8 * t)),
            i
        }
        ;
        $.prototype.readInt8 = function(e, t) {
            return e = e >>> 0,
            t || Vt(e, 1, this.length),
            this[e] & 128 ? (255 - this[e] + 1) * -1 : this[e]
        }
        ;
        $.prototype.readInt16LE = function(e, t) {
            e = e >>> 0,
            t || Vt(e, 2, this.length);
            let n = this[e] | this[e + 1] << 8;
            return n & 32768 ? n | 4294901760 : n
        }
        ;
        $.prototype.readInt16BE = function(e, t) {
            e = e >>> 0,
            t || Vt(e, 2, this.length);
            let n = this[e + 1] | this[e] << 8;
            return n & 32768 ? n | 4294901760 : n
        }
        ;
        $.prototype.readInt32LE = function(e, t) {
            return e = e >>> 0,
            t || Vt(e, 4, this.length),
            this[e] | this[e + 1] << 8 | this[e + 2] << 16 | this[e + 3] << 24
        }
        ;
        $.prototype.readInt32BE = function(e, t) {
            return e = e >>> 0,
            t || Vt(e, 4, this.length),
            this[e] << 24 | this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3]
        }
        ;
        $.prototype.readBigInt64LE = Vn(function(e) {
            e = e >>> 0,
            Bs(e, "offset");
            let t = this[e]
              , n = this[e + 7];
            (t === void 0 || n === void 0) && Ai(e, this.length - 8);
            let o = this[e + 4] + this[e + 5] * 2 ** 8 + this[e + 6] * 2 ** 16 + (n << 24);
            return (BigInt(o) << BigInt(32)) + BigInt(t + this[++e] * 2 ** 8 + this[++e] * 2 ** 16 + this[++e] * 2 ** 24)
        });
        $.prototype.readBigInt64BE = Vn(function(e) {
            e = e >>> 0,
            Bs(e, "offset");
            let t = this[e]
              , n = this[e + 7];
            (t === void 0 || n === void 0) && Ai(e, this.length - 8);
            let o = (t << 24) + this[++e] * 2 ** 16 + this[++e] * 2 ** 8 + this[++e];
            return (BigInt(o) << BigInt(32)) + BigInt(this[++e] * 2 ** 24 + this[++e] * 2 ** 16 + this[++e] * 2 ** 8 + n)
        });
        $.prototype.readFloatLE = function(e, t) {
            return e = e >>> 0,
            t || Vt(e, 4, this.length),
            Rs.read(this, e, !0, 23, 4)
        }
        ;
        $.prototype.readFloatBE = function(e, t) {
            return e = e >>> 0,
            t || Vt(e, 4, this.length),
            Rs.read(this, e, !1, 23, 4)
        }
        ;
        $.prototype.readDoubleLE = function(e, t) {
            return e = e >>> 0,
            t || Vt(e, 8, this.length),
            Rs.read(this, e, !0, 52, 8)
        }
        ;
        $.prototype.readDoubleBE = function(e, t) {
            return e = e >>> 0,
            t || Vt(e, 8, this.length),
            Rs.read(this, e, !1, 52, 8)
        }
        ;
        function yr(r, e, t, n, o, s) {
            if (!$.isBuffer(r))
                throw new TypeError('"buffer" argument must be a Buffer instance');
            if (e > o || e < s)
                throw new RangeError('"value" argument is out of bounds');
            if (t + n > r.length)
                throw new RangeError("Index out of range")
        }
        $.prototype.writeUintLE = $.prototype.writeUIntLE = function(e, t, n, o) {
            if (e = +e,
            t = t >>> 0,
            n = n >>> 0,
            !o) {
                let u = Math.pow(2, 8 * n) - 1;
                yr(this, e, t, n, u, 0)
            }
            let s = 1
              , i = 0;
            for (this[t] = e & 255; ++i < n && (s *= 256); )
                this[t + i] = e / s & 255;
            return t + n
        }
        ;
        $.prototype.writeUintBE = $.prototype.writeUIntBE = function(e, t, n, o) {
            if (e = +e,
            t = t >>> 0,
            n = n >>> 0,
            !o) {
                let u = Math.pow(2, 8 * n) - 1;
                yr(this, e, t, n, u, 0)
            }
            let s = n - 1
              , i = 1;
            for (this[t + s] = e & 255; --s >= 0 && (i *= 256); )
                this[t + s] = e / i & 255;
            return t + n
        }
        ;
        $.prototype.writeUint8 = $.prototype.writeUInt8 = function(e, t, n) {
            return e = +e,
            t = t >>> 0,
            n || yr(this, e, t, 1, 255, 0),
            this[t] = e & 255,
            t + 1
        }
        ;
        $.prototype.writeUint16LE = $.prototype.writeUInt16LE = function(e, t, n) {
            return e = +e,
            t = t >>> 0,
            n || yr(this, e, t, 2, 65535, 0),
            this[t] = e & 255,
            this[t + 1] = e >>> 8,
            t + 2
        }
        ;
        $.prototype.writeUint16BE = $.prototype.writeUInt16BE = function(e, t, n) {
            return e = +e,
            t = t >>> 0,
            n || yr(this, e, t, 2, 65535, 0),
            this[t] = e >>> 8,
            this[t + 1] = e & 255,
            t + 2
        }
        ;
        $.prototype.writeUint32LE = $.prototype.writeUInt32LE = function(e, t, n) {
            return e = +e,
            t = t >>> 0,
            n || yr(this, e, t, 4, 4294967295, 0),
            this[t + 3] = e >>> 24,
            this[t + 2] = e >>> 16,
            this[t + 1] = e >>> 8,
            this[t] = e & 255,
            t + 4
        }
        ;
        $.prototype.writeUint32BE = $.prototype.writeUInt32BE = function(e, t, n) {
            return e = +e,
            t = t >>> 0,
            n || yr(this, e, t, 4, 4294967295, 0),
            this[t] = e >>> 24,
            this[t + 1] = e >>> 16,
            this[t + 2] = e >>> 8,
            this[t + 3] = e & 255,
            t + 4
        }
        ;
        function oy(r, e, t, n, o) {
            uy(e, n, o, r, t, 7);
            let s = Number(e & BigInt(4294967295));
            r[t++] = s,
            s = s >> 8,
            r[t++] = s,
            s = s >> 8,
            r[t++] = s,
            s = s >> 8,
            r[t++] = s;
            let i = Number(e >> BigInt(32) & BigInt(4294967295));
            return r[t++] = i,
            i = i >> 8,
            r[t++] = i,
            i = i >> 8,
            r[t++] = i,
            i = i >> 8,
            r[t++] = i,
            t
        }
        function sy(r, e, t, n, o) {
            uy(e, n, o, r, t, 7);
            let s = Number(e & BigInt(4294967295));
            r[t + 7] = s,
            s = s >> 8,
            r[t + 6] = s,
            s = s >> 8,
            r[t + 5] = s,
            s = s >> 8,
            r[t + 4] = s;
            let i = Number(e >> BigInt(32) & BigInt(4294967295));
            return r[t + 3] = i,
            i = i >> 8,
            r[t + 2] = i,
            i = i >> 8,
            r[t + 1] = i,
            i = i >> 8,
            r[t] = i,
            t + 8
        }
        $.prototype.writeBigUInt64LE = Vn(function(e, t=0) {
            return oy(this, e, t, BigInt(0), BigInt("0xffffffffffffffff"))
        });
        $.prototype.writeBigUInt64BE = Vn(function(e, t=0) {
            return sy(this, e, t, BigInt(0), BigInt("0xffffffffffffffff"))
        });
        $.prototype.writeIntLE = function(e, t, n, o) {
            if (e = +e,
            t = t >>> 0,
            !o) {
                let f = Math.pow(2, 8 * n - 1);
                yr(this, e, t, n, f - 1, -f)
            }
            let s = 0
              , i = 1
              , u = 0;
            for (this[t] = e & 255; ++s < n && (i *= 256); )
                e < 0 && u === 0 && this[t + s - 1] !== 0 && (u = 1),
                this[t + s] = (e / i >> 0) - u & 255;
            return t + n
        }
        ;
        $.prototype.writeIntBE = function(e, t, n, o) {
            if (e = +e,
            t = t >>> 0,
            !o) {
                let f = Math.pow(2, 8 * n - 1);
                yr(this, e, t, n, f - 1, -f)
            }
            let s = n - 1
              , i = 1
              , u = 0;
            for (this[t + s] = e & 255; --s >= 0 && (i *= 256); )
                e < 0 && u === 0 && this[t + s + 1] !== 0 && (u = 1),
                this[t + s] = (e / i >> 0) - u & 255;
            return t + n
        }
        ;
        $.prototype.writeInt8 = function(e, t, n) {
            return e = +e,
            t = t >>> 0,
            n || yr(this, e, t, 1, 127, -128),
            e < 0 && (e = 255 + e + 1),
            this[t] = e & 255,
            t + 1
        }
        ;
        $.prototype.writeInt16LE = function(e, t, n) {
            return e = +e,
            t = t >>> 0,
            n || yr(this, e, t, 2, 32767, -32768),
            this[t] = e & 255,
            this[t + 1] = e >>> 8,
            t + 2
        }
        ;
        $.prototype.writeInt16BE = function(e, t, n) {
            return e = +e,
            t = t >>> 0,
            n || yr(this, e, t, 2, 32767, -32768),
            this[t] = e >>> 8,
            this[t + 1] = e & 255,
            t + 2
        }
        ;
        $.prototype.writeInt32LE = function(e, t, n) {
            return e = +e,
            t = t >>> 0,
            n || yr(this, e, t, 4, 2147483647, -2147483648),
            this[t] = e & 255,
            this[t + 1] = e >>> 8,
            this[t + 2] = e >>> 16,
            this[t + 3] = e >>> 24,
            t + 4
        }
        ;
        $.prototype.writeInt32BE = function(e, t, n) {
            return e = +e,
            t = t >>> 0,
            n || yr(this, e, t, 4, 2147483647, -2147483648),
            e < 0 && (e = 4294967295 + e + 1),
            this[t] = e >>> 24,
            this[t + 1] = e >>> 16,
            this[t + 2] = e >>> 8,
            this[t + 3] = e & 255,
            t + 4
        }
        ;
        $.prototype.writeBigInt64LE = Vn(function(e, t=0) {
            return oy(this, e, t, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"))
        });
        $.prototype.writeBigInt64BE = Vn(function(e, t=0) {
            return sy(this, e, t, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"))
        });
        function iy(r, e, t, n, o, s) {
            if (t + n > r.length)
                throw new RangeError("Index out of range");
            if (t < 0)
                throw new RangeError("Index out of range")
        }
        function ay(r, e, t, n, o) {
            return e = +e,
            t = t >>> 0,
            o || iy(r, e, t, 4, 34028234663852886e22, -34028234663852886e22),
            Rs.write(r, e, t, n, 23, 4),
            t + 4
        }
        $.prototype.writeFloatLE = function(e, t, n) {
            return ay(this, e, t, !0, n)
        }
        ;
        $.prototype.writeFloatBE = function(e, t, n) {
            return ay(this, e, t, !1, n)
        }
        ;
        function cy(r, e, t, n, o) {
            return e = +e,
            t = t >>> 0,
            o || iy(r, e, t, 8, 17976931348623157e292, -17976931348623157e292),
            Rs.write(r, e, t, n, 52, 8),
            t + 8
        }
        $.prototype.writeDoubleLE = function(e, t, n) {
            return cy(this, e, t, !0, n)
        }
        ;
        $.prototype.writeDoubleBE = function(e, t, n) {
            return cy(this, e, t, !1, n)
        }
        ;
        $.prototype.copy = function(e, t, n, o) {
            if (!$.isBuffer(e))
                throw new TypeError("argument should be a Buffer");
            if (n || (n = 0),
            !o && o !== 0 && (o = this.length),
            t >= e.length && (t = e.length),
            t || (t = 0),
            o > 0 && o < n && (o = n),
            o === n || e.length === 0 || this.length === 0)
                return 0;
            if (t < 0)
                throw new RangeError("targetStart out of bounds");
            if (n < 0 || n >= this.length)
                throw new RangeError("Index out of range");
            if (o < 0)
                throw new RangeError("sourceEnd out of bounds");
            o > this.length && (o = this.length),
            e.length - t < o - n && (o = e.length - t + n);
            let s = o - n;
            return this === e && typeof Uint8Array.prototype.copyWithin == "function" ? this.copyWithin(t, n, o) : Uint8Array.prototype.set.call(e, this.subarray(n, o), t),
            s
        }
        ;
        $.prototype.fill = function(e, t, n, o) {
            if (typeof e == "string") {
                if (typeof t == "string" ? (o = t,
                t = 0,
                n = this.length) : typeof n == "string" && (o = n,
                n = this.length),
                o !== void 0 && typeof o != "string")
                    throw new TypeError("encoding must be a string");
                if (typeof o == "string" && !$.isEncoding(o))
                    throw new TypeError("Unknown encoding: " + o);
                if (e.length === 1) {
                    let i = e.charCodeAt(0);
                    (o === "utf8" && i < 128 || o === "latin1") && (e = i)
                }
            } else
                typeof e == "number" ? e = e & 255 : typeof e == "boolean" && (e = Number(e));
            if (t < 0 || this.length < t || this.length < n)
                throw new RangeError("Out of range index");
            if (n <= t)
                return this;
            t = t >>> 0,
            n = n === void 0 ? this.length : n >>> 0,
            e || (e = 0);
            let s;
            if (typeof e == "number")
                for (s = t; s < n; ++s)
                    this[s] = e;
            else {
                let i = $.isBuffer(e) ? e : $.from(e, o)
                  , u = i.length;
                if (u === 0)
                    throw new TypeError('The value "' + e + '" is invalid for argument "value"');
                for (s = 0; s < n - t; ++s)
                    this[s + t] = i[s % u]
            }
            return this
        }
        ;
        var Is = {};
        function Cp(r, e, t) {
            Is[r] = class extends t {
                constructor() {
                    super(),
                    Object.defineProperty(this, "message", {
                        value: e.apply(this, arguments),
                        writable: !0,
                        configurable: !0
                    }),
                    this.name = `${this.name} [${r}]`,
                    this.stack,
                    delete this.name
                }
                get code() {
                    return r
                }
                set code(o) {
                    Object.defineProperty(this, "code", {
                        configurable: !0,
                        enumerable: !0,
                        value: o,
                        writable: !0
                    })
                }
                toString() {
                    return `${this.name} [${r}]: ${this.message}`
                }
            }
        }
        Cp("ERR_BUFFER_OUT_OF_BOUNDS", function(r) {
            return r ? `${r} is outside of buffer bounds` : "Attempt to access memory outside buffer bounds"
        }, RangeError);
        Cp("ERR_INVALID_ARG_TYPE", function(r, e) {
            return `The "${r}" argument must be of type number. Received type ${typeof e}`
        }, TypeError);
        Cp("ERR_OUT_OF_RANGE", function(r, e, t) {
            let n = `The value of "${r}" is out of range.`
              , o = t;
            return Number.isInteger(t) && Math.abs(t) > 2 ** 32 ? o = Xh(String(t)) : typeof t == "bigint" && (o = String(t),
            (t > BigInt(2) ** BigInt(32) || t < -(BigInt(2) ** BigInt(32))) && (o = Xh(o)),
            o += "n"),
            n += ` It must be ${e}. Received ${o}`,
            n
        }, RangeError);
        function Xh(r) {
            let e = ""
              , t = r.length
              , n = r[0] === "-" ? 1 : 0;
            for (; t >= n + 4; t -= 3)
                e = `_${r.slice(t - 3, t)}${e}`;
            return `${r.slice(0, t)}${e}`
        }
        function _I(r, e, t) {
            Bs(e, "offset"),
            (r[e] === void 0 || r[e + t] === void 0) && Ai(e, r.length - (t + 1))
        }
        function uy(r, e, t, n, o, s) {
            if (r > t || r < e) {
                let i = typeof e == "bigint" ? "n" : "", u;
                throw s > 3 ? e === 0 || e === BigInt(0) ? u = `>= 0${i} and < 2${i} ** ${(s + 1) * 8}${i}` : u = `>= -(2${i} ** ${(s + 1) * 8 - 1}${i}) and < 2 ** ${(s + 1) * 8 - 1}${i}` : u = `>= ${e}${i} and <= ${t}${i}`,
                new Is.ERR_OUT_OF_RANGE("value",u,r)
            }
            _I(n, o, s)
        }
        function Bs(r, e) {
            if (typeof r != "number")
                throw new Is.ERR_INVALID_ARG_TYPE(e,"number",r)
        }
        function Ai(r, e, t) {
            throw Math.floor(r) !== r ? (Bs(r, t),
            new Is.ERR_OUT_OF_RANGE(t || "offset","an integer",r)) : e < 0 ? new Is.ERR_BUFFER_OUT_OF_BOUNDS : new Is.ERR_OUT_OF_RANGE(t || "offset",`>= ${t ? 1 : 0} and <= ${e}`,r)
        }
        var AI = /[^+/0-9A-Za-z-_]/g;
        function kI(r) {
            if (r = r.split("=")[0],
            r = r.trim().replace(AI, ""),
            r.length < 2)
                return "";
            for (; r.length % 4 !== 0; )
                r = r + "=";
            return r
        }
        function Mp(r, e) {
            e = e || 1 / 0;
            let t, n = r.length, o = null, s = [];
            for (let i = 0; i < n; ++i) {
                if (t = r.charCodeAt(i),
                t > 55295 && t < 57344) {
                    if (!o) {
                        if (t > 56319) {
                            (e -= 3) > -1 && s.push(239, 191, 189);
                            continue
                        } else if (i + 1 === n) {
                            (e -= 3) > -1 && s.push(239, 191, 189);
                            continue
                        }
                        o = t;
                        continue
                    }
                    if (t < 56320) {
                        (e -= 3) > -1 && s.push(239, 191, 189),
                        o = t;
                        continue
                    }
                    t = (o - 55296 << 10 | t - 56320) + 65536
                } else
                    o && (e -= 3) > -1 && s.push(239, 191, 189);
                if (o = null,
                t < 128) {
                    if ((e -= 1) < 0)
                        break;
                    s.push(t)
                } else if (t < 2048) {
                    if ((e -= 2) < 0)
                        break;
                    s.push(t >> 6 | 192, t & 63 | 128)
                } else if (t < 65536) {
                    if ((e -= 3) < 0)
                        break;
                    s.push(t >> 12 | 224, t >> 6 & 63 | 128, t & 63 | 128)
                } else if (t < 1114112) {
                    if ((e -= 4) < 0)
                        break;
                    s.push(t >> 18 | 240, t >> 12 & 63 | 128, t >> 6 & 63 | 128, t & 63 | 128)
                } else
                    throw new Error("Invalid code point")
            }
            return s
        }
        function II(r) {
            let e = [];
            for (let t = 0; t < r.length; ++t)
                e.push(r.charCodeAt(t) & 255);
            return e
        }
        function RI(r, e) {
            let t, n, o, s = [];
            for (let i = 0; i < r.length && !((e -= 2) < 0); ++i)
                t = r.charCodeAt(i),
                n = t >> 8,
                o = t % 256,
                s.push(o),
                s.push(n);
            return s
        }
        function py(r) {
            return Tp.toByteArray(kI(r))
        }
        function Ca(r, e, t, n) {
            let o;
            for (o = 0; o < n && !(o + t >= e.length || o >= r.length); ++o)
                e[o + t] = r[o];
            return o
        }
        function Jr(r, e) {
            return r instanceof e || r != null && r.constructor != null && r.constructor.name != null && r.constructor.name === e.name
        }
        function Op(r) {
            return r !== r
        }
        var BI = function() {
            let r = "0123456789abcdef"
              , e = new Array(256);
            for (let t = 0; t < 16; ++t) {
                let n = t * 16;
                for (let o = 0; o < 16; ++o)
                    e[n + o] = r[t] + r[o]
            }
            return e
        }();
        function Vn(r) {
            return typeof BigInt > "u" ? TI : r
        }
        function TI() {
            throw new Error("BigInt not supported")
        }
    }
    );
    var yy = _e( (Eq, hy) => {
        h();
        var Ft = hy.exports = {}, Xr, Qr;
        function qp() {
            throw new Error("setTimeout has not been defined")
        }
        function Up() {
            throw new Error("clearTimeout has not been defined")
        }
        (function() {
            try {
                typeof setTimeout == "function" ? Xr = setTimeout : Xr = qp
            } catch {
                Xr = qp
            }
            try {
                typeof clearTimeout == "function" ? Qr = clearTimeout : Qr = Up
            } catch {
                Qr = Up
            }
        }
        )();
        function fy(r) {
            if (Xr === setTimeout)
                return setTimeout(r, 0);
            if ((Xr === qp || !Xr) && setTimeout)
                return Xr = setTimeout,
                setTimeout(r, 0);
            try {
                return Xr(r, 0)
            } catch {
                try {
                    return Xr.call(null, r, 0)
                } catch {
                    return Xr.call(this, r, 0)
                }
            }
        }
        function PI(r) {
            if (Qr === clearTimeout)
                return clearTimeout(r);
            if ((Qr === Up || !Qr) && clearTimeout)
                return Qr = clearTimeout,
                clearTimeout(r);
            try {
                return Qr(r)
            } catch {
                try {
                    return Qr.call(null, r)
                } catch {
                    return Qr.call(this, r)
                }
            }
        }
        var wn = [], zs = !1, Ho, Oa = -1;
        function zI() {
            !zs || !Ho || (zs = !1,
            Ho.length ? wn = Ho.concat(wn) : Oa = -1,
            wn.length && ly())
        }
        function ly() {
            if (!zs) {
                var r = fy(zI);
                zs = !0;
                for (var e = wn.length; e; ) {
                    for (Ho = wn,
                    wn = []; ++Oa < e; )
                        Ho && Ho[Oa].run();
                    Oa = -1,
                    e = wn.length
                }
                Ho = null,
                zs = !1,
                PI(r)
            }
        }
        Ft.nextTick = function(r) {
            var e = new Array(arguments.length - 1);
            if (arguments.length > 1)
                for (var t = 1; t < arguments.length; t++)
                    e[t - 1] = arguments[t];
            wn.push(new dy(r,e)),
            wn.length === 1 && !zs && fy(ly)
        }
        ;
        function dy(r, e) {
            this.fun = r,
            this.array = e
        }
        dy.prototype.run = function() {
            this.fun.apply(null, this.array)
        }
        ;
        Ft.title = "browser";
        Ft.browser = !0;
        Ft.env = {};
        Ft.argv = [];
        Ft.version = "";
        Ft.versions = {};
        function bn() {}
        Ft.on = bn;
        Ft.addListener = bn;
        Ft.once = bn;
        Ft.off = bn;
        Ft.removeListener = bn;
        Ft.removeAllListeners = bn;
        Ft.emit = bn;
        Ft.prependListener = bn;
        Ft.prependOnceListener = bn;
        Ft.listeners = function(r) {
            return []
        }
        ;
        Ft.binding = function(r) {
            throw new Error("process.binding is not supported")
        }
        ;
        Ft.cwd = function() {
            return "/"
        }
        ;
        Ft.chdir = function(r) {
            throw new Error("process.chdir is not supported")
        }
        ;
        Ft.umask = function() {
            return 0
        }
    }
    );
    var my, gy, I, A, h = C( () => {
        "use strict";
        my = je(Ps()),
        gy = je(yy()),
        I = gy.default,
        A = my.Buffer
    }
    );
    function MI(r, e) {
        if (r.length !== e.length)
            return !1;
        for (let t = 0; t < r.length; t++)
            if (r[t] !== e[t])
                return !1;
        return !0
    }
    function xy(r, e) {
        if (r.length !== e.length)
            return !1;
        for (let t = 0; t < r.length; t++)
            if (r[t] !== e[t])
                return !1;
        return !0
    }
    var en, wy = C( () => {
        "use strict";
        h();
        en = class r {
            #e;
            #t;
            #o;
            #s;
            #r;
            #n;
            get address() {
                return this.#e
            }
            get publicKey() {
                return this.#t.slice()
            }
            get chains() {
                return this.#o.slice()
            }
            get features() {
                return this.#s.slice()
            }
            get label() {
                return this.#r
            }
            get icon() {
                return this.#n
            }
            constructor({address: e, publicKey: t, label: n, icon: o, chains: s, features: i}) {
                new.target === r && Object.freeze(this),
                this.#e = e,
                this.#t = t,
                this.#o = s,
                this.#s = i,
                this.#r = n,
                this.#n = o
            }
            equals(e) {
                return this.#e === e.address && MI(this.#t, e.publicKey) && xy(this.#o, e.chains) && xy(this.#s, e.features)
            }
        }
    }
    );
    var Ko, by = C( () => {
        "use strict";
        h();
        Ko = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTA4IiBoZWlnaHQ9IjEwOCIgdmlld0JveD0iMCAwIDEwOCAxMDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDgiIGhlaWdodD0iMTA4IiByeD0iMjYiIGZpbGw9IiNBQjlGRjIiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik00Ni41MjY3IDY5LjkyMjlDNDIuMDA1NCA3Ni44NTA5IDM0LjQyOTIgODUuNjE4MiAyNC4zNDggODUuNjE4MkMxOS41ODI0IDg1LjYxODIgMTUgODMuNjU2MyAxNSA3NS4xMzQyQzE1IDUzLjQzMDUgNDQuNjMyNiAxOS44MzI3IDcyLjEyNjggMTkuODMyN0M4Ny43NjggMTkuODMyNyA5NCAzMC42ODQ2IDk0IDQzLjAwNzlDOTQgNTguODI1OCA4My43MzU1IDc2LjkxMjIgNzMuNTMyMSA3Ni45MTIyQzcwLjI5MzkgNzYuOTEyMiA2OC43MDUzIDc1LjEzNDIgNjguNzA1MyA3Mi4zMTRDNjguNzA1MyA3MS41NzgzIDY4LjgyNzUgNzAuNzgxMiA2OS4wNzE5IDY5LjkyMjlDNjUuNTg5MyA3NS44Njk5IDU4Ljg2ODUgODEuMzg3OCA1Mi41NzU0IDgxLjM4NzhDNDcuOTkzIDgxLjM4NzggNDUuNjcxMyA3OC41MDYzIDQ1LjY3MTMgNzQuNDU5OEM0NS42NzEzIDcyLjk4ODQgNDUuOTc2OCA3MS40NTU2IDQ2LjUyNjcgNjkuOTIyOVpNODMuNjc2MSA0Mi41Nzk0QzgzLjY3NjEgNDYuMTcwNCA4MS41NTc1IDQ3Ljk2NTggNzkuMTg3NSA0Ny45NjU4Qzc2Ljc4MTYgNDcuOTY1OCA3NC42OTg5IDQ2LjE3MDQgNzQuNjk4OSA0Mi41Nzk0Qzc0LjY5ODkgMzguOTg4NSA3Ni43ODE2IDM3LjE5MzEgNzkuMTg3NSAzNy4xOTMxQzgxLjU1NzUgMzcuMTkzMSA4My42NzYxIDM4Ljk4ODUgODMuNjc2MSA0Mi41Nzk0Wk03MC4yMTAzIDQyLjU3OTVDNzAuMjEwMyA0Ni4xNzA0IDY4LjA5MTYgNDcuOTY1OCA2NS43MjE2IDQ3Ljk2NThDNjMuMzE1NyA0Ny45NjU4IDYxLjIzMyA0Ni4xNzA0IDYxLjIzMyA0Mi41Nzk1QzYxLjIzMyAzOC45ODg1IDYzLjMxNTcgMzcuMTkzMSA2NS43MjE2IDM3LjE5MzFDNjguMDkxNiAzNy4xOTMxIDcwLjIxMDMgMzguOTg4NSA3MC4yMTAzIDQyLjU3OTVaIiBmaWxsPSIjRkZGREY4Ii8+Cjwvc3ZnPgo="
    }
    );
    function Wo(r) {
        let e = ({register: t}) => t(r);
        try {
            window.dispatchEvent(new Dp(e))
        } catch (t) {
            console.error(`wallet-standard:register-wallet event could not be dispatched
`, t)
        }
        try {
            window.addEventListener("wallet-standard:app-ready", ({detail: t}) => e(t))
        } catch (t) {
            console.error(`wallet-standard:app-ready event listener could not be added
`, t)
        }
    }
    var Dp, Sy = C( () => {
        "use strict";
        h();
        Dp = class extends Event {
            #e;
            get detail() {
                return this.#e
            }
            get type() {
                return "wallet-standard:register-wallet"
            }
            constructor(e) {
                super("wallet-standard:register-wallet", {
                    bubbles: !1,
                    cancelable: !1,
                    composed: !1
                }),
                this.#e = e
            }
            preventDefault() {
                throw new Error("preventDefault cannot be called")
            }
            stopImmediatePropagation() {
                throw new Error("stopImmediatePropagation cannot be called")
            }
            stopPropagation() {
                throw new Error("stopPropagation cannot be called")
            }
        }
    }
    );
    function Fp(r) {
        return ki.includes(r)
    }
    var vy, Ey, _y, Ay, ki, ky = C( () => {
        "use strict";
        h();
        vy = "solana:mainnet",
        Ey = "solana:devnet",
        _y = "solana:testnet",
        Ay = "solana:localnet",
        ki = [vy, Ey, _y, Ay]
    }
    );
    var Iy, Ry, By, Ii, Ty = C( () => {
        "use strict";
        h();
        Iy = "bitcoin:mainnet",
        Ry = "bitcoin:testnet",
        By = "bitcoin:regtest",
        Ii = [Iy, Ry, By]
    }
    );
    function jp(r, e) {
        return Py(r, e)
    }
    function Py(r, e) {
        if (r === e)
            return !0;
        let t = r.length;
        if (t !== e.length)
            return !1;
        for (let n = 0; n < t; n++)
            if (r[n] !== e[n])
                return !1;
        return !0
    }
    var zy = C( () => {
        "use strict";
        h()
    }
    );
    var My, LI, Hp, Ly = C( () => {
        "use strict";
        h();
        My = "sui:mainnet",
        LI = "sui:testnet",
        Hp = [My, LI]
    }
    );
    var Vo = C( () => {
        "use strict";
        h();
        wy();
        by();
        Sy();
        ky();
        Ty();
        zy();
        Ly()
    }
    );
    function CI(r) {
        Oy = r
    }
    function qa() {
        return Oy
    }
    function de(r, e) {
        let t = qa()
          , n = Ua({
            issueData: e,
            data: r.data,
            path: r.path,
            errorMaps: [r.common.contextualErrorMap, r.schemaErrorMap, t, t === Ns ? void 0 : Ns].filter(o => !!o)
        });
        r.common.issues.push(n)
    }
    function Da(r, e, t, n) {
        if (t === "a" && !n)
            throw new TypeError("Private accessor was defined without a getter");
        if (typeof e == "function" ? r !== e || !n : !e.has(r))
            throw new TypeError("Cannot read private member from an object whose class did not declare it");
        return t === "m" ? n : t === "a" ? n.call(r) : n ? n.value : e.get(r)
    }
    function qy(r, e, t, n, o) {
        if (n === "m")
            throw new TypeError("Private method is not writable");
        if (n === "a" && !o)
            throw new TypeError("Private accessor was defined without a setter");
        if (typeof e == "function" ? r !== e || !o : !e.has(r))
            throw new TypeError("Cannot write private member to an object whose class did not declare it");
        return n === "a" ? o.call(r, t) : o ? o.value = t : e.set(r, t),
        t
    }
    function Ne(r) {
        if (!r)
            return {};
        let {errorMap: e, invalid_type_error: t, required_error: n, description: o} = r;
        if (e && (t || n))
            throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
        return e ? {
            errorMap: e,
            description: o
        } : {
            errorMap: (i, u) => {
                var f, g;
                let {message: b} = r;
                return i.code === "invalid_enum_value" ? {
                    message: b ?? u.defaultError
                } : typeof u.data > "u" ? {
                    message: (f = b ?? n) !== null && f !== void 0 ? f : u.defaultError
                } : i.code !== "invalid_type" ? {
                    message: u.defaultError
                } : {
                    message: (g = b ?? t) !== null && g !== void 0 ? g : u.defaultError
                }
            }
            ,
            description: o
        }
    }
    function Dy(r) {
        let e = "([01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d";
        return r.precision ? e = `${e}\\.\\d{${r.precision}}` : r.precision == null && (e = `${e}(\\.\\d+)?`),
        e
    }
    function $I(r) {
        return new RegExp(`^${Dy(r)}$`)
    }
    function Fy(r) {
        let e = `${Uy}T${Dy(r)}`
          , t = [];
        return t.push(r.local ? "Z?" : "Z"),
        r.offset && t.push("([+-]\\d{2}:?\\d{2})"),
        e = `${e}(${t.join("|")})`,
        new RegExp(`^${e}$`)
    }
    function JI(r, e) {
        return !!((e === "v4" || !e) && VI.test(r) || (e === "v6" || !e) && GI.test(r))
    }
    function XI(r, e) {
        let t = (r.toString().split(".")[1] || "").length
          , n = (e.toString().split(".")[1] || "").length
          , o = t > n ? t : n
          , s = parseInt(r.toFixed(o).replace(".", ""))
          , i = parseInt(e.toFixed(o).replace(".", ""));
        return s % i / Math.pow(10, o)
    }
    function Ms(r) {
        if (r instanceof mr) {
            let e = {};
            for (let t in r.shape) {
                let n = r.shape[t];
                e[t] = Br.create(Ms(n))
            }
            return new mr({
                ...r._def,
                shape: () => e
            })
        } else
            return r instanceof En ? new En({
                ...r._def,
                type: Ms(r.element)
            }) : r instanceof Br ? Br.create(Ms(r.unwrap())) : r instanceof rn ? rn.create(Ms(r.unwrap())) : r instanceof tn ? tn.create(r.items.map(e => Ms(e))) : r
    }
    function Zp(r, e) {
        let t = Gn(r)
          , n = Gn(e);
        if (r === e)
            return {
                valid: !0,
                data: r
            };
        if (t === he.object && n === he.object) {
            let o = He.objectKeys(e)
              , s = He.objectKeys(r).filter(u => o.indexOf(u) !== -1)
              , i = {
                ...r,
                ...e
            };
            for (let u of s) {
                let f = Zp(r[u], e[u]);
                if (!f.valid)
                    return {
                        valid: !1
                    };
                i[u] = f.data
            }
            return {
                valid: !0,
                data: i
            }
        } else if (t === he.array && n === he.array) {
            if (r.length !== e.length)
                return {
                    valid: !1
                };
            let o = [];
            for (let s = 0; s < r.length; s++) {
                let i = r[s]
                  , u = e[s]
                  , f = Zp(i, u);
                if (!f.valid)
                    return {
                        valid: !1
                    };
                o.push(f.data)
            }
            return {
                valid: !0,
                data: o
            }
        } else
            return t === he.date && n === he.date && +r == +e ? {
                valid: !0,
                data: r
            } : {
                valid: !1
            }
    }
    function jy(r, e) {
        return new ns({
            values: r,
            typeName: Ie.ZodEnum,
            ...Ne(e)
        })
    }
    function Hy(r, e={}, t) {
        return r ? Yn.create().superRefine( (n, o) => {
            var s, i;
            if (!r(n)) {
                let u = typeof e == "function" ? e(n) : typeof e == "string" ? {
                    message: e
                } : e
                  , f = (i = (s = u.fatal) !== null && s !== void 0 ? s : t) !== null && i !== void 0 ? i : !0
                  , g = typeof u == "string" ? {
                    message: u
                } : u;
                o.addIssue({
                    code: "custom",
                    ...g,
                    fatal: f
                })
            }
        }
        ) : Yn.create()
    }
    var He, Wp, he, Gn, ne, NI, jt, Ns, Oy, Ua, OI, Qt, Be, Ls, pr, Vp, Gp, Ti, Pi, Ee, Ri, Bi, Tr, Ny, Ce, qI, UI, DI, FI, jI, HI, KI, WI, Kp, VI, GI, ZI, Uy, YI, Zn, Go, Zo, Yo, $o, Cs, Jo, Xo, Yn, vn, Dr, Os, En, mr, Qo, Sn, Fa, es, tn, ja, qs, Us, Ha, ts, rs, ns, os, $n, Sr, Br, rn, ss, is, Ds, QI, zi, Mi, as, eR, Ie, tR, Ky, Wy, rR, nR, Vy, oR, sR, iR, aR, cR, uR, pR, fR, lR, dR, hR, yR, mR, gR, xR, wR, bR, SR, vR, ER, _R, AR, kR, IR, Cy, RR, BR, TR, PR, zR, MR, LR, NR, CR, a, K = C( () => {
        h();
        (function(r) {
            r.assertEqual = o => o;
            function e(o) {}
            r.assertIs = e;
            function t(o) {
                throw new Error
            }
            r.assertNever = t,
            r.arrayToEnum = o => {
                let s = {};
                for (let i of o)
                    s[i] = i;
                return s
            }
            ,
            r.getValidEnumValues = o => {
                let s = r.objectKeys(o).filter(u => typeof o[o[u]] != "number")
                  , i = {};
                for (let u of s)
                    i[u] = o[u];
                return r.objectValues(i)
            }
            ,
            r.objectValues = o => r.objectKeys(o).map(function(s) {
                return o[s]
            }),
            r.objectKeys = typeof Object.keys == "function" ? o => Object.keys(o) : o => {
                let s = [];
                for (let i in o)
                    Object.prototype.hasOwnProperty.call(o, i) && s.push(i);
                return s
            }
            ,
            r.find = (o, s) => {
                for (let i of o)
                    if (s(i))
                        return i
            }
            ,
            r.isInteger = typeof Number.isInteger == "function" ? o => Number.isInteger(o) : o => typeof o == "number" && isFinite(o) && Math.floor(o) === o;
            function n(o, s=" | ") {
                return o.map(i => typeof i == "string" ? `'${i}'` : i).join(s)
            }
            r.joinValues = n,
            r.jsonStringifyReplacer = (o, s) => typeof s == "bigint" ? s.toString() : s
        }
        )(He || (He = {}));
        (function(r) {
            r.mergeShapes = (e, t) => ({
                ...e,
                ...t
            })
        }
        )(Wp || (Wp = {}));
        he = He.arrayToEnum(["string", "nan", "number", "integer", "float", "boolean", "date", "bigint", "symbol", "function", "undefined", "null", "array", "object", "unknown", "promise", "void", "never", "map", "set"]),
        Gn = r => {
            switch (typeof r) {
            case "undefined":
                return he.undefined;
            case "string":
                return he.string;
            case "number":
                return isNaN(r) ? he.nan : he.number;
            case "boolean":
                return he.boolean;
            case "function":
                return he.function;
            case "bigint":
                return he.bigint;
            case "symbol":
                return he.symbol;
            case "object":
                return Array.isArray(r) ? he.array : r === null ? he.null : r.then && typeof r.then == "function" && r.catch && typeof r.catch == "function" ? he.promise : typeof Map < "u" && r instanceof Map ? he.map : typeof Set < "u" && r instanceof Set ? he.set : typeof Date < "u" && r instanceof Date ? he.date : he.object;
            default:
                return he.unknown
            }
        }
        ,
        ne = He.arrayToEnum(["invalid_type", "invalid_literal", "custom", "invalid_union", "invalid_union_discriminator", "invalid_enum_value", "unrecognized_keys", "invalid_arguments", "invalid_return_type", "invalid_date", "invalid_string", "too_small", "too_big", "invalid_intersection_types", "not_multiple_of", "not_finite"]),
        NI = r => JSON.stringify(r, null, 2).replace(/"([^"]+)":/g, "$1:"),
        jt = class r extends Error {
            constructor(e) {
                super(),
                this.issues = [],
                this.addIssue = n => {
                    this.issues = [...this.issues, n]
                }
                ,
                this.addIssues = (n=[]) => {
                    this.issues = [...this.issues, ...n]
                }
                ;
                let t = new.target.prototype;
                Object.setPrototypeOf ? Object.setPrototypeOf(this, t) : this.__proto__ = t,
                this.name = "ZodError",
                this.issues = e
            }
            get errors() {
                return this.issues
            }
            format(e) {
                let t = e || function(s) {
                    return s.message
                }
                  , n = {
                    _errors: []
                }
                  , o = s => {
                    for (let i of s.issues)
                        if (i.code === "invalid_union")
                            i.unionErrors.map(o);
                        else if (i.code === "invalid_return_type")
                            o(i.returnTypeError);
                        else if (i.code === "invalid_arguments")
                            o(i.argumentsError);
                        else if (i.path.length === 0)
                            n._errors.push(t(i));
                        else {
                            let u = n
                              , f = 0;
                            for (; f < i.path.length; ) {
                                let g = i.path[f];
                                f === i.path.length - 1 ? (u[g] = u[g] || {
                                    _errors: []
                                },
                                u[g]._errors.push(t(i))) : u[g] = u[g] || {
                                    _errors: []
                                },
                                u = u[g],
                                f++
                            }
                        }
                }
                ;
                return o(this),
                n
            }
            static assert(e) {
                if (!(e instanceof r))
                    throw new Error(`Not a ZodError: ${e}`)
            }
            toString() {
                return this.message
            }
            get message() {
                return JSON.stringify(this.issues, He.jsonStringifyReplacer, 2)
            }
            get isEmpty() {
                return this.issues.length === 0
            }
            flatten(e=t => t.message) {
                let t = {}
                  , n = [];
                for (let o of this.issues)
                    o.path.length > 0 ? (t[o.path[0]] = t[o.path[0]] || [],
                    t[o.path[0]].push(e(o))) : n.push(e(o));
                return {
                    formErrors: n,
                    fieldErrors: t
                }
            }
            get formErrors() {
                return this.flatten()
            }
        }
        ;
        jt.create = r => new jt(r);
        Ns = (r, e) => {
            let t;
            switch (r.code) {
            case ne.invalid_type:
                r.received === he.undefined ? t = "Required" : t = `Expected ${r.expected}, received ${r.received}`;
                break;
            case ne.invalid_literal:
                t = `Invalid literal value, expected ${JSON.stringify(r.expected, He.jsonStringifyReplacer)}`;
                break;
            case ne.unrecognized_keys:
                t = `Unrecognized key(s) in object: ${He.joinValues(r.keys, ", ")}`;
                break;
            case ne.invalid_union:
                t = "Invalid input";
                break;
            case ne.invalid_union_discriminator:
                t = `Invalid discriminator value. Expected ${He.joinValues(r.options)}`;
                break;
            case ne.invalid_enum_value:
                t = `Invalid enum value. Expected ${He.joinValues(r.options)}, received '${r.received}'`;
                break;
            case ne.invalid_arguments:
                t = "Invalid function arguments";
                break;
            case ne.invalid_return_type:
                t = "Invalid function return type";
                break;
            case ne.invalid_date:
                t = "Invalid date";
                break;
            case ne.invalid_string:
                typeof r.validation == "object" ? "includes"in r.validation ? (t = `Invalid input: must include "${r.validation.includes}"`,
                typeof r.validation.position == "number" && (t = `${t} at one or more positions greater than or equal to ${r.validation.position}`)) : "startsWith"in r.validation ? t = `Invalid input: must start with "${r.validation.startsWith}"` : "endsWith"in r.validation ? t = `Invalid input: must end with "${r.validation.endsWith}"` : He.assertNever(r.validation) : r.validation !== "regex" ? t = `Invalid ${r.validation}` : t = "Invalid";
                break;
            case ne.too_small:
                r.type === "array" ? t = `Array must contain ${r.exact ? "exactly" : r.inclusive ? "at least" : "more than"} ${r.minimum} element(s)` : r.type === "string" ? t = `String must contain ${r.exact ? "exactly" : r.inclusive ? "at least" : "over"} ${r.minimum} character(s)` : r.type === "number" ? t = `Number must be ${r.exact ? "exactly equal to " : r.inclusive ? "greater than or equal to " : "greater than "}${r.minimum}` : r.type === "date" ? t = `Date must be ${r.exact ? "exactly equal to " : r.inclusive ? "greater than or equal to " : "greater than "}${new Date(Number(r.minimum))}` : t = "Invalid input";
                break;
            case ne.too_big:
                r.type === "array" ? t = `Array must contain ${r.exact ? "exactly" : r.inclusive ? "at most" : "less than"} ${r.maximum} element(s)` : r.type === "string" ? t = `String must contain ${r.exact ? "exactly" : r.inclusive ? "at most" : "under"} ${r.maximum} character(s)` : r.type === "number" ? t = `Number must be ${r.exact ? "exactly" : r.inclusive ? "less than or equal to" : "less than"} ${r.maximum}` : r.type === "bigint" ? t = `BigInt must be ${r.exact ? "exactly" : r.inclusive ? "less than or equal to" : "less than"} ${r.maximum}` : r.type === "date" ? t = `Date must be ${r.exact ? "exactly" : r.inclusive ? "smaller than or equal to" : "smaller than"} ${new Date(Number(r.maximum))}` : t = "Invalid input";
                break;
            case ne.custom:
                t = "Invalid input";
                break;
            case ne.invalid_intersection_types:
                t = "Intersection results could not be merged";
                break;
            case ne.not_multiple_of:
                t = `Number must be a multiple of ${r.multipleOf}`;
                break;
            case ne.not_finite:
                t = "Number must be finite";
                break;
            default:
                t = e.defaultError,
                He.assertNever(r)
            }
            return {
                message: t
            }
        }
        ,
        Oy = Ns;
        Ua = r => {
            let {data: e, path: t, errorMaps: n, issueData: o} = r
              , s = [...t, ...o.path || []]
              , i = {
                ...o,
                path: s
            };
            if (o.message !== void 0)
                return {
                    ...o,
                    path: s,
                    message: o.message
                };
            let u = ""
              , f = n.filter(g => !!g).slice().reverse();
            for (let g of f)
                u = g(i, {
                    data: e,
                    defaultError: u
                }).message;
            return {
                ...o,
                path: s,
                message: u
            }
        }
        ,
        OI = [];
        Qt = class r {
            constructor() {
                this.value = "valid"
            }
            dirty() {
                this.value === "valid" && (this.value = "dirty")
            }
            abort() {
                this.value !== "aborted" && (this.value = "aborted")
            }
            static mergeArray(e, t) {
                let n = [];
                for (let o of t) {
                    if (o.status === "aborted")
                        return Be;
                    o.status === "dirty" && e.dirty(),
                    n.push(o.value)
                }
                return {
                    status: e.value,
                    value: n
                }
            }
            static async mergeObjectAsync(e, t) {
                let n = [];
                for (let o of t) {
                    let s = await o.key
                      , i = await o.value;
                    n.push({
                        key: s,
                        value: i
                    })
                }
                return r.mergeObjectSync(e, n)
            }
            static mergeObjectSync(e, t) {
                let n = {};
                for (let o of t) {
                    let {key: s, value: i} = o;
                    if (s.status === "aborted" || i.status === "aborted")
                        return Be;
                    s.status === "dirty" && e.dirty(),
                    i.status === "dirty" && e.dirty(),
                    s.value !== "__proto__" && (typeof i.value < "u" || o.alwaysSet) && (n[s.value] = i.value)
                }
                return {
                    status: e.value,
                    value: n
                }
            }
        }
        ,
        Be = Object.freeze({
            status: "aborted"
        }),
        Ls = r => ({
            status: "dirty",
            value: r
        }),
        pr = r => ({
            status: "valid",
            value: r
        }),
        Vp = r => r.status === "aborted",
        Gp = r => r.status === "dirty",
        Ti = r => r.status === "valid",
        Pi = r => typeof Promise < "u" && r instanceof Promise;
        (function(r) {
            r.errToObj = e => typeof e == "string" ? {
                message: e
            } : e || {},
            r.toString = e => typeof e == "string" ? e : e?.message
        }
        )(Ee || (Ee = {}));
        Tr = class {
            constructor(e, t, n, o) {
                this._cachedPath = [],
                this.parent = e,
                this.data = t,
                this._path = n,
                this._key = o
            }
            get path() {
                return this._cachedPath.length || (this._key instanceof Array ? this._cachedPath.push(...this._path, ...this._key) : this._cachedPath.push(...this._path, this._key)),
                this._cachedPath
            }
        }
        ,
        Ny = (r, e) => {
            if (Ti(e))
                return {
                    success: !0,
                    data: e.value
                };
            if (!r.common.issues.length)
                throw new Error("Validation failed but no issues detected.");
            return {
                success: !1,
                get error() {
                    if (this._error)
                        return this._error;
                    let t = new jt(r.common.issues);
                    return this._error = t,
                    this._error
                }
            }
        }
        ;
        Ce = class {
            constructor(e) {
                this.spa = this.safeParseAsync,
                this._def = e,
                this.parse = this.parse.bind(this),
                this.safeParse = this.safeParse.bind(this),
                this.parseAsync = this.parseAsync.bind(this),
                this.safeParseAsync = this.safeParseAsync.bind(this),
                this.spa = this.spa.bind(this),
                this.refine = this.refine.bind(this),
                this.refinement = this.refinement.bind(this),
                this.superRefine = this.superRefine.bind(this),
                this.optional = this.optional.bind(this),
                this.nullable = this.nullable.bind(this),
                this.nullish = this.nullish.bind(this),
                this.array = this.array.bind(this),
                this.promise = this.promise.bind(this),
                this.or = this.or.bind(this),
                this.and = this.and.bind(this),
                this.transform = this.transform.bind(this),
                this.brand = this.brand.bind(this),
                this.default = this.default.bind(this),
                this.catch = this.catch.bind(this),
                this.describe = this.describe.bind(this),
                this.pipe = this.pipe.bind(this),
                this.readonly = this.readonly.bind(this),
                this.isNullable = this.isNullable.bind(this),
                this.isOptional = this.isOptional.bind(this)
            }
            get description() {
                return this._def.description
            }
            _getType(e) {
                return Gn(e.data)
            }
            _getOrReturnCtx(e, t) {
                return t || {
                    common: e.parent.common,
                    data: e.data,
                    parsedType: Gn(e.data),
                    schemaErrorMap: this._def.errorMap,
                    path: e.path,
                    parent: e.parent
                }
            }
            _processInputParams(e) {
                return {
                    status: new Qt,
                    ctx: {
                        common: e.parent.common,
                        data: e.data,
                        parsedType: Gn(e.data),
                        schemaErrorMap: this._def.errorMap,
                        path: e.path,
                        parent: e.parent
                    }
                }
            }
            _parseSync(e) {
                let t = this._parse(e);
                if (Pi(t))
                    throw new Error("Synchronous parse encountered promise.");
                return t
            }
            _parseAsync(e) {
                let t = this._parse(e);
                return Promise.resolve(t)
            }
            parse(e, t) {
                let n = this.safeParse(e, t);
                if (n.success)
                    return n.data;
                throw n.error
            }
            safeParse(e, t) {
                var n;
                let o = {
                    common: {
                        issues: [],
                        async: (n = t?.async) !== null && n !== void 0 ? n : !1,
                        contextualErrorMap: t?.errorMap
                    },
                    path: t?.path || [],
                    schemaErrorMap: this._def.errorMap,
                    parent: null,
                    data: e,
                    parsedType: Gn(e)
                }
                  , s = this._parseSync({
                    data: e,
                    path: o.path,
                    parent: o
                });
                return Ny(o, s)
            }
            async parseAsync(e, t) {
                let n = await this.safeParseAsync(e, t);
                if (n.success)
                    return n.data;
                throw n.error
            }
            async safeParseAsync(e, t) {
                let n = {
                    common: {
                        issues: [],
                        contextualErrorMap: t?.errorMap,
                        async: !0
                    },
                    path: t?.path || [],
                    schemaErrorMap: this._def.errorMap,
                    parent: null,
                    data: e,
                    parsedType: Gn(e)
                }
                  , o = this._parse({
                    data: e,
                    path: n.path,
                    parent: n
                })
                  , s = await (Pi(o) ? o : Promise.resolve(o));
                return Ny(n, s)
            }
            refine(e, t) {
                let n = o => typeof t == "string" || typeof t > "u" ? {
                    message: t
                } : typeof t == "function" ? t(o) : t;
                return this._refinement( (o, s) => {
                    let i = e(o)
                      , u = () => s.addIssue({
                        code: ne.custom,
                        ...n(o)
                    });
                    return typeof Promise < "u" && i instanceof Promise ? i.then(f => f ? !0 : (u(),
                    !1)) : i ? !0 : (u(),
                    !1)
                }
                )
            }
            refinement(e, t) {
                return this._refinement( (n, o) => e(n) ? !0 : (o.addIssue(typeof t == "function" ? t(n, o) : t),
                !1))
            }
            _refinement(e) {
                return new Sr({
                    schema: this,
                    typeName: Ie.ZodEffects,
                    effect: {
                        type: "refinement",
                        refinement: e
                    }
                })
            }
            superRefine(e) {
                return this._refinement(e)
            }
            optional() {
                return Br.create(this, this._def)
            }
            nullable() {
                return rn.create(this, this._def)
            }
            nullish() {
                return this.nullable().optional()
            }
            array() {
                return En.create(this, this._def)
            }
            promise() {
                return $n.create(this, this._def)
            }
            or(e) {
                return Qo.create([this, e], this._def)
            }
            and(e) {
                return es.create(this, e, this._def)
            }
            transform(e) {
                return new Sr({
                    ...Ne(this._def),
                    schema: this,
                    typeName: Ie.ZodEffects,
                    effect: {
                        type: "transform",
                        transform: e
                    }
                })
            }
            default(e) {
                let t = typeof e == "function" ? e : () => e;
                return new ss({
                    ...Ne(this._def),
                    innerType: this,
                    defaultValue: t,
                    typeName: Ie.ZodDefault
                })
            }
            brand() {
                return new zi({
                    typeName: Ie.ZodBranded,
                    type: this,
                    ...Ne(this._def)
                })
            }
            catch(e) {
                let t = typeof e == "function" ? e : () => e;
                return new is({
                    ...Ne(this._def),
                    innerType: this,
                    catchValue: t,
                    typeName: Ie.ZodCatch
                })
            }
            describe(e) {
                let t = this.constructor;
                return new t({
                    ...this._def,
                    description: e
                })
            }
            pipe(e) {
                return Mi.create(this, e)
            }
            readonly() {
                return as.create(this)
            }
            isOptional() {
                return this.safeParse(void 0).success
            }
            isNullable() {
                return this.safeParse(null).success
            }
        }
        ,
        qI = /^c[^\s-]{8,}$/i,
        UI = /^[0-9a-z]+$/,
        DI = /^[0-9A-HJKMNP-TV-Z]{26}$/,
        FI = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i,
        jI = /^[a-z0-9_-]{21}$/i,
        HI = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/,
        KI = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i,
        WI = "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$",
        VI = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/,
        GI = /^(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))$/,
        ZI = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/,
        Uy = "((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))",
        YI = new RegExp(`^${Uy}$`);
        Zn = class r extends Ce {
            _parse(e) {
                if (this._def.coerce && (e.data = String(e.data)),
                this._getType(e) !== he.string) {
                    let s = this._getOrReturnCtx(e);
                    return de(s, {
                        code: ne.invalid_type,
                        expected: he.string,
                        received: s.parsedType
                    }),
                    Be
                }
                let n = new Qt, o;
                for (let s of this._def.checks)
                    if (s.kind === "min")
                        e.data.length < s.value && (o = this._getOrReturnCtx(e, o),
                        de(o, {
                            code: ne.too_small,
                            minimum: s.value,
                            type: "string",
                            inclusive: !0,
                            exact: !1,
                            message: s.message
                        }),
                        n.dirty());
                    else if (s.kind === "max")
                        e.data.length > s.value && (o = this._getOrReturnCtx(e, o),
                        de(o, {
                            code: ne.too_big,
                            maximum: s.value,
                            type: "string",
                            inclusive: !0,
                            exact: !1,
                            message: s.message
                        }),
                        n.dirty());
                    else if (s.kind === "length") {
                        let i = e.data.length > s.value
                          , u = e.data.length < s.value;
                        (i || u) && (o = this._getOrReturnCtx(e, o),
                        i ? de(o, {
                            code: ne.too_big,
                            maximum: s.value,
                            type: "string",
                            inclusive: !0,
                            exact: !0,
                            message: s.message
                        }) : u && de(o, {
                            code: ne.too_small,
                            minimum: s.value,
                            type: "string",
                            inclusive: !0,
                            exact: !0,
                            message: s.message
                        }),
                        n.dirty())
                    } else if (s.kind === "email")
                        KI.test(e.data) || (o = this._getOrReturnCtx(e, o),
                        de(o, {
                            validation: "email",
                            code: ne.invalid_string,
                            message: s.message
                        }),
                        n.dirty());
                    else if (s.kind === "emoji")
                        Kp || (Kp = new RegExp(WI,"u")),
                        Kp.test(e.data) || (o = this._getOrReturnCtx(e, o),
                        de(o, {
                            validation: "emoji",
                            code: ne.invalid_string,
                            message: s.message
                        }),
                        n.dirty());
                    else if (s.kind === "uuid")
                        FI.test(e.data) || (o = this._getOrReturnCtx(e, o),
                        de(o, {
                            validation: "uuid",
                            code: ne.invalid_string,
                            message: s.message
                        }),
                        n.dirty());
                    else if (s.kind === "nanoid")
                        jI.test(e.data) || (o = this._getOrReturnCtx(e, o),
                        de(o, {
                            validation: "nanoid",
                            code: ne.invalid_string,
                            message: s.message
                        }),
                        n.dirty());
                    else if (s.kind === "cuid")
                        qI.test(e.data) || (o = this._getOrReturnCtx(e, o),
                        de(o, {
                            validation: "cuid",
                            code: ne.invalid_string,
                            message: s.message
                        }),
                        n.dirty());
                    else if (s.kind === "cuid2")
                        UI.test(e.data) || (o = this._getOrReturnCtx(e, o),
                        de(o, {
                            validation: "cuid2",
                            code: ne.invalid_string,
                            message: s.message
                        }),
                        n.dirty());
                    else if (s.kind === "ulid")
                        DI.test(e.data) || (o = this._getOrReturnCtx(e, o),
                        de(o, {
                            validation: "ulid",
                            code: ne.invalid_string,
                            message: s.message
                        }),
                        n.dirty());
                    else if (s.kind === "url")
                        try {
                            new URL(e.data)
                        } catch {
                            o = this._getOrReturnCtx(e, o),
                            de(o, {
                                validation: "url",
                                code: ne.invalid_string,
                                message: s.message
                            }),
                            n.dirty()
                        }
                    else
                        s.kind === "regex" ? (s.regex.lastIndex = 0,
                        s.regex.test(e.data) || (o = this._getOrReturnCtx(e, o),
                        de(o, {
                            validation: "regex",
                            code: ne.invalid_string,
                            message: s.message
                        }),
                        n.dirty())) : s.kind === "trim" ? e.data = e.data.trim() : s.kind === "includes" ? e.data.includes(s.value, s.position) || (o = this._getOrReturnCtx(e, o),
                        de(o, {
                            code: ne.invalid_string,
                            validation: {
                                includes: s.value,
                                position: s.position
                            },
                            message: s.message
                        }),
                        n.dirty()) : s.kind === "toLowerCase" ? e.data = e.data.toLowerCase() : s.kind === "toUpperCase" ? e.data = e.data.toUpperCase() : s.kind === "startsWith" ? e.data.startsWith(s.value) || (o = this._getOrReturnCtx(e, o),
                        de(o, {
                            code: ne.invalid_string,
                            validation: {
                                startsWith: s.value
                            },
                            message: s.message
                        }),
                        n.dirty()) : s.kind === "endsWith" ? e.data.endsWith(s.value) || (o = this._getOrReturnCtx(e, o),
                        de(o, {
                            code: ne.invalid_string,
                            validation: {
                                endsWith: s.value
                            },
                            message: s.message
                        }),
                        n.dirty()) : s.kind === "datetime" ? Fy(s).test(e.data) || (o = this._getOrReturnCtx(e, o),
                        de(o, {
                            code: ne.invalid_string,
                            validation: "datetime",
                            message: s.message
                        }),
                        n.dirty()) : s.kind === "date" ? YI.test(e.data) || (o = this._getOrReturnCtx(e, o),
                        de(o, {
                            code: ne.invalid_string,
                            validation: "date",
                            message: s.message
                        }),
                        n.dirty()) : s.kind === "time" ? $I(s).test(e.data) || (o = this._getOrReturnCtx(e, o),
                        de(o, {
                            code: ne.invalid_string,
                            validation: "time",
                            message: s.message
                        }),
                        n.dirty()) : s.kind === "duration" ? HI.test(e.data) || (o = this._getOrReturnCtx(e, o),
                        de(o, {
                            validation: "duration",
                            code: ne.invalid_string,
                            message: s.message
                        }),
                        n.dirty()) : s.kind === "ip" ? JI(e.data, s.version) || (o = this._getOrReturnCtx(e, o),
                        de(o, {
                            validation: "ip",
                            code: ne.invalid_string,
                            message: s.message
                        }),
                        n.dirty()) : s.kind === "base64" ? ZI.test(e.data) || (o = this._getOrReturnCtx(e, o),
                        de(o, {
                            validation: "base64",
                            code: ne.invalid_string,
                            message: s.message
                        }),
                        n.dirty()) : He.assertNever(s);
                return {
                    status: n.value,
                    value: e.data
                }
            }
            _regex(e, t, n) {
                return this.refinement(o => e.test(o), {
                    validation: t,
                    code: ne.invalid_string,
                    ...Ee.errToObj(n)
                })
            }
            _addCheck(e) {
                return new r({
                    ...this._def,
                    checks: [...this._def.checks, e]
                })
            }
            email(e) {
                return this._addCheck({
                    kind: "email",
                    ...Ee.errToObj(e)
                })
            }
            url(e) {
                return this._addCheck({
                    kind: "url",
                    ...Ee.errToObj(e)
                })
            }
            emoji(e) {
                return this._addCheck({
                    kind: "emoji",
                    ...Ee.errToObj(e)
                })
            }
            uuid(e) {
                return this._addCheck({
                    kind: "uuid",
                    ...Ee.errToObj(e)
                })
            }
            nanoid(e) {
                return this._addCheck({
                    kind: "nanoid",
                    ...Ee.errToObj(e)
                })
            }
            cuid(e) {
                return this._addCheck({
                    kind: "cuid",
                    ...Ee.errToObj(e)
                })
            }
            cuid2(e) {
                return this._addCheck({
                    kind: "cuid2",
                    ...Ee.errToObj(e)
                })
            }
            ulid(e) {
                return this._addCheck({
                    kind: "ulid",
                    ...Ee.errToObj(e)
                })
            }
            base64(e) {
                return this._addCheck({
                    kind: "base64",
                    ...Ee.errToObj(e)
                })
            }
            ip(e) {
                return this._addCheck({
                    kind: "ip",
                    ...Ee.errToObj(e)
                })
            }
            datetime(e) {
                var t, n;
                return typeof e == "string" ? this._addCheck({
                    kind: "datetime",
                    precision: null,
                    offset: !1,
                    local: !1,
                    message: e
                }) : this._addCheck({
                    kind: "datetime",
                    precision: typeof e?.precision > "u" ? null : e?.precision,
                    offset: (t = e?.offset) !== null && t !== void 0 ? t : !1,
                    local: (n = e?.local) !== null && n !== void 0 ? n : !1,
                    ...Ee.errToObj(e?.message)
                })
            }
            date(e) {
                return this._addCheck({
                    kind: "date",
                    message: e
                })
            }
            time(e) {
                return typeof e == "string" ? this._addCheck({
                    kind: "time",
                    precision: null,
                    message: e
                }) : this._addCheck({
                    kind: "time",
                    precision: typeof e?.precision > "u" ? null : e?.precision,
                    ...Ee.errToObj(e?.message)
                })
            }
            duration(e) {
                return this._addCheck({
                    kind: "duration",
                    ...Ee.errToObj(e)
                })
            }
            regex(e, t) {
                return this._addCheck({
                    kind: "regex",
                    regex: e,
                    ...Ee.errToObj(t)
                })
            }
            includes(e, t) {
                return this._addCheck({
                    kind: "includes",
                    value: e,
                    position: t?.position,
                    ...Ee.errToObj(t?.message)
                })
            }
            startsWith(e, t) {
                return this._addCheck({
                    kind: "startsWith",
                    value: e,
                    ...Ee.errToObj(t)
                })
            }
            endsWith(e, t) {
                return this._addCheck({
                    kind: "endsWith",
                    value: e,
                    ...Ee.errToObj(t)
                })
            }
            min(e, t) {
                return this._addCheck({
                    kind: "min",
                    value: e,
                    ...Ee.errToObj(t)
                })
            }
            max(e, t) {
                return this._addCheck({
                    kind: "max",
                    value: e,
                    ...Ee.errToObj(t)
                })
            }
            length(e, t) {
                return this._addCheck({
                    kind: "length",
                    value: e,
                    ...Ee.errToObj(t)
                })
            }
            nonempty(e) {
                return this.min(1, Ee.errToObj(e))
            }
            trim() {
                return new r({
                    ...this._def,
                    checks: [...this._def.checks, {
                        kind: "trim"
                    }]
                })
            }
            toLowerCase() {
                return new r({
                    ...this._def,
                    checks: [...this._def.checks, {
                        kind: "toLowerCase"
                    }]
                })
            }
            toUpperCase() {
                return new r({
                    ...this._def,
                    checks: [...this._def.checks, {
                        kind: "toUpperCase"
                    }]
                })
            }
            get isDatetime() {
                return !!this._def.checks.find(e => e.kind === "datetime")
            }
            get isDate() {
                return !!this._def.checks.find(e => e.kind === "date")
            }
            get isTime() {
                return !!this._def.checks.find(e => e.kind === "time")
            }
            get isDuration() {
                return !!this._def.checks.find(e => e.kind === "duration")
            }
            get isEmail() {
                return !!this._def.checks.find(e => e.kind === "email")
            }
            get isURL() {
                return !!this._def.checks.find(e => e.kind === "url")
            }
            get isEmoji() {
                return !!this._def.checks.find(e => e.kind === "emoji")
            }
            get isUUID() {
                return !!this._def.checks.find(e => e.kind === "uuid")
            }
            get isNANOID() {
                return !!this._def.checks.find(e => e.kind === "nanoid")
            }
            get isCUID() {
                return !!this._def.checks.find(e => e.kind === "cuid")
            }
            get isCUID2() {
                return !!this._def.checks.find(e => e.kind === "cuid2")
            }
            get isULID() {
                return !!this._def.checks.find(e => e.kind === "ulid")
            }
            get isIP() {
                return !!this._def.checks.find(e => e.kind === "ip")
            }
            get isBase64() {
                return !!this._def.checks.find(e => e.kind === "base64")
            }
            get minLength() {
                let e = null;
                for (let t of this._def.checks)
                    t.kind === "min" && (e === null || t.value > e) && (e = t.value);
                return e
            }
            get maxLength() {
                let e = null;
                for (let t of this._def.checks)
                    t.kind === "max" && (e === null || t.value < e) && (e = t.value);
                return e
            }
        }
        ;
        Zn.create = r => {
            var e;
            return new Zn({
                checks: [],
                typeName: Ie.ZodString,
                coerce: (e = r?.coerce) !== null && e !== void 0 ? e : !1,
                ...Ne(r)
            })
        }
        ;
        Go = class r extends Ce {
            constructor() {
                super(...arguments),
                this.min = this.gte,
                this.max = this.lte,
                this.step = this.multipleOf
            }
            _parse(e) {
                if (this._def.coerce && (e.data = Number(e.data)),
                this._getType(e) !== he.number) {
                    let s = this._getOrReturnCtx(e);
                    return de(s, {
                        code: ne.invalid_type,
                        expected: he.number,
                        received: s.parsedType
                    }),
                    Be
                }
                let n, o = new Qt;
                for (let s of this._def.checks)
                    s.kind === "int" ? He.isInteger(e.data) || (n = this._getOrReturnCtx(e, n),
                    de(n, {
                        code: ne.invalid_type,
                        expected: "integer",
                        received: "float",
                        message: s.message
                    }),
                    o.dirty()) : s.kind === "min" ? (s.inclusive ? e.data < s.value : e.data <= s.value) && (n = this._getOrReturnCtx(e, n),
                    de(n, {
                        code: ne.too_small,
                        minimum: s.value,
                        type: "number",
                        inclusive: s.inclusive,
                        exact: !1,
                        message: s.message
                    }),
                    o.dirty()) : s.kind === "max" ? (s.inclusive ? e.data > s.value : e.data >= s.value) && (n = this._getOrReturnCtx(e, n),
                    de(n, {
                        code: ne.too_big,
                        maximum: s.value,
                        type: "number",
                        inclusive: s.inclusive,
                        exact: !1,
                        message: s.message
                    }),
                    o.dirty()) : s.kind === "multipleOf" ? XI(e.data, s.value) !== 0 && (n = this._getOrReturnCtx(e, n),
                    de(n, {
                        code: ne.not_multiple_of,
                        multipleOf: s.value,
                        message: s.message
                    }),
                    o.dirty()) : s.kind === "finite" ? Number.isFinite(e.data) || (n = this._getOrReturnCtx(e, n),
                    de(n, {
                        code: ne.not_finite,
                        message: s.message
                    }),
                    o.dirty()) : He.assertNever(s);
                return {
                    status: o.value,
                    value: e.data
                }
            }
            gte(e, t) {
                return this.setLimit("min", e, !0, Ee.toString(t))
            }
            gt(e, t) {
                return this.setLimit("min", e, !1, Ee.toString(t))
            }
            lte(e, t) {
                return this.setLimit("max", e, !0, Ee.toString(t))
            }
            lt(e, t) {
                return this.setLimit("max", e, !1, Ee.toString(t))
            }
            setLimit(e, t, n, o) {
                return new r({
                    ...this._def,
                    checks: [...this._def.checks, {
                        kind: e,
                        value: t,
                        inclusive: n,
                        message: Ee.toString(o)
                    }]
                })
            }
            _addCheck(e) {
                return new r({
                    ...this._def,
                    checks: [...this._def.checks, e]
                })
            }
            int(e) {
                return this._addCheck({
                    kind: "int",
                    message: Ee.toString(e)
                })
            }
            positive(e) {
                return this._addCheck({
                    kind: "min",
                    value: 0,
                    inclusive: !1,
                    message: Ee.toString(e)
                })
            }
            negative(e) {
                return this._addCheck({
                    kind: "max",
                    value: 0,
                    inclusive: !1,
                    message: Ee.toString(e)
                })
            }
            nonpositive(e) {
                return this._addCheck({
                    kind: "max",
                    value: 0,
                    inclusive: !0,
                    message: Ee.toString(e)
                })
            }
            nonnegative(e) {
                return this._addCheck({
                    kind: "min",
                    value: 0,
                    inclusive: !0,
                    message: Ee.toString(e)
                })
            }
            multipleOf(e, t) {
                return this._addCheck({
                    kind: "multipleOf",
                    value: e,
                    message: Ee.toString(t)
                })
            }
            finite(e) {
                return this._addCheck({
                    kind: "finite",
                    message: Ee.toString(e)
                })
            }
            safe(e) {
                return this._addCheck({
                    kind: "min",
                    inclusive: !0,
                    value: Number.MIN_SAFE_INTEGER,
                    message: Ee.toString(e)
                })._addCheck({
                    kind: "max",
                    inclusive: !0,
                    value: Number.MAX_SAFE_INTEGER,
                    message: Ee.toString(e)
                })
            }
            get minValue() {
                let e = null;
                for (let t of this._def.checks)
                    t.kind === "min" && (e === null || t.value > e) && (e = t.value);
                return e
            }
            get maxValue() {
                let e = null;
                for (let t of this._def.checks)
                    t.kind === "max" && (e === null || t.value < e) && (e = t.value);
                return e
            }
            get isInt() {
                return !!this._def.checks.find(e => e.kind === "int" || e.kind === "multipleOf" && He.isInteger(e.value))
            }
            get isFinite() {
                let e = null
                  , t = null;
                for (let n of this._def.checks) {
                    if (n.kind === "finite" || n.kind === "int" || n.kind === "multipleOf")
                        return !0;
                    n.kind === "min" ? (t === null || n.value > t) && (t = n.value) : n.kind === "max" && (e === null || n.value < e) && (e = n.value)
                }
                return Number.isFinite(t) && Number.isFinite(e)
            }
        }
        ;
        Go.create = r => new Go({
            checks: [],
            typeName: Ie.ZodNumber,
            coerce: r?.coerce || !1,
            ...Ne(r)
        });
        Zo = class r extends Ce {
            constructor() {
                super(...arguments),
                this.min = this.gte,
                this.max = this.lte
            }
            _parse(e) {
                if (this._def.coerce && (e.data = BigInt(e.data)),
                this._getType(e) !== he.bigint) {
                    let s = this._getOrReturnCtx(e);
                    return de(s, {
                        code: ne.invalid_type,
                        expected: he.bigint,
                        received: s.parsedType
                    }),
                    Be
                }
                let n, o = new Qt;
                for (let s of this._def.checks)
                    s.kind === "min" ? (s.inclusive ? e.data < s.value : e.data <= s.value) && (n = this._getOrReturnCtx(e, n),
                    de(n, {
                        code: ne.too_small,
                        type: "bigint",
                        minimum: s.value,
                        inclusive: s.inclusive,
                        message: s.message
                    }),
                    o.dirty()) : s.kind === "max" ? (s.inclusive ? e.data > s.value : e.data >= s.value) && (n = this._getOrReturnCtx(e, n),
                    de(n, {
                        code: ne.too_big,
                        type: "bigint",
                        maximum: s.value,
                        inclusive: s.inclusive,
                        message: s.message
                    }),
                    o.dirty()) : s.kind === "multipleOf" ? e.data % s.value !== BigInt(0) && (n = this._getOrReturnCtx(e, n),
                    de(n, {
                        code: ne.not_multiple_of,
                        multipleOf: s.value,
                        message: s.message
                    }),
                    o.dirty()) : He.assertNever(s);
                return {
                    status: o.value,
                    value: e.data
                }
            }
            gte(e, t) {
                return this.setLimit("min", e, !0, Ee.toString(t))
            }
            gt(e, t) {
                return this.setLimit("min", e, !1, Ee.toString(t))
            }
            lte(e, t) {
                return this.setLimit("max", e, !0, Ee.toString(t))
            }
            lt(e, t) {
                return this.setLimit("max", e, !1, Ee.toString(t))
            }
            setLimit(e, t, n, o) {
                return new r({
                    ...this._def,
                    checks: [...this._def.checks, {
                        kind: e,
                        value: t,
                        inclusive: n,
                        message: Ee.toString(o)
                    }]
                })
            }
            _addCheck(e) {
                return new r({
                    ...this._def,
                    checks: [...this._def.checks, e]
                })
            }
            positive(e) {
                return this._addCheck({
                    kind: "min",
                    value: BigInt(0),
                    inclusive: !1,
                    message: Ee.toString(e)
                })
            }
            negative(e) {
                return this._addCheck({
                    kind: "max",
                    value: BigInt(0),
                    inclusive: !1,
                    message: Ee.toString(e)
                })
            }
            nonpositive(e) {
                return this._addCheck({
                    kind: "max",
                    value: BigInt(0),
                    inclusive: !0,
                    message: Ee.toString(e)
                })
            }
            nonnegative(e) {
                return this._addCheck({
                    kind: "min",
                    value: BigInt(0),
                    inclusive: !0,
                    message: Ee.toString(e)
                })
            }
            multipleOf(e, t) {
                return this._addCheck({
                    kind: "multipleOf",
                    value: e,
                    message: Ee.toString(t)
                })
            }
            get minValue() {
                let e = null;
                for (let t of this._def.checks)
                    t.kind === "min" && (e === null || t.value > e) && (e = t.value);
                return e
            }
            get maxValue() {
                let e = null;
                for (let t of this._def.checks)
                    t.kind === "max" && (e === null || t.value < e) && (e = t.value);
                return e
            }
        }
        ;
        Zo.create = r => {
            var e;
            return new Zo({
                checks: [],
                typeName: Ie.ZodBigInt,
                coerce: (e = r?.coerce) !== null && e !== void 0 ? e : !1,
                ...Ne(r)
            })
        }
        ;
        Yo = class extends Ce {
            _parse(e) {
                if (this._def.coerce && (e.data = !!e.data),
                this._getType(e) !== he.boolean) {
                    let n = this._getOrReturnCtx(e);
                    return de(n, {
                        code: ne.invalid_type,
                        expected: he.boolean,
                        received: n.parsedType
                    }),
                    Be
                }
                return pr(e.data)
            }
        }
        ;
        Yo.create = r => new Yo({
            typeName: Ie.ZodBoolean,
            coerce: r?.coerce || !1,
            ...Ne(r)
        });
        $o = class r extends Ce {
            _parse(e) {
                if (this._def.coerce && (e.data = new Date(e.data)),
                this._getType(e) !== he.date) {
                    let s = this._getOrReturnCtx(e);
                    return de(s, {
                        code: ne.invalid_type,
                        expected: he.date,
                        received: s.parsedType
                    }),
                    Be
                }
                if (isNaN(e.data.getTime())) {
                    let s = this._getOrReturnCtx(e);
                    return de(s, {
                        code: ne.invalid_date
                    }),
                    Be
                }
                let n = new Qt, o;
                for (let s of this._def.checks)
                    s.kind === "min" ? e.data.getTime() < s.value && (o = this._getOrReturnCtx(e, o),
                    de(o, {
                        code: ne.too_small,
                        message: s.message,
                        inclusive: !0,
                        exact: !1,
                        minimum: s.value,
                        type: "date"
                    }),
                    n.dirty()) : s.kind === "max" ? e.data.getTime() > s.value && (o = this._getOrReturnCtx(e, o),
                    de(o, {
                        code: ne.too_big,
                        message: s.message,
                        inclusive: !0,
                        exact: !1,
                        maximum: s.value,
                        type: "date"
                    }),
                    n.dirty()) : He.assertNever(s);
                return {
                    status: n.value,
                    value: new Date(e.data.getTime())
                }
            }
            _addCheck(e) {
                return new r({
                    ...this._def,
                    checks: [...this._def.checks, e]
                })
            }
            min(e, t) {
                return this._addCheck({
                    kind: "min",
                    value: e.getTime(),
                    message: Ee.toString(t)
                })
            }
            max(e, t) {
                return this._addCheck({
                    kind: "max",
                    value: e.getTime(),
                    message: Ee.toString(t)
                })
            }
            get minDate() {
                let e = null;
                for (let t of this._def.checks)
                    t.kind === "min" && (e === null || t.value > e) && (e = t.value);
                return e != null ? new Date(e) : null
            }
            get maxDate() {
                let e = null;
                for (let t of this._def.checks)
                    t.kind === "max" && (e === null || t.value < e) && (e = t.value);
                return e != null ? new Date(e) : null
            }
        }
        ;
        $o.create = r => new $o({
            checks: [],
            coerce: r?.coerce || !1,
            typeName: Ie.ZodDate,
            ...Ne(r)
        });
        Cs = class extends Ce {
            _parse(e) {
                if (this._getType(e) !== he.symbol) {
                    let n = this._getOrReturnCtx(e);
                    return de(n, {
                        code: ne.invalid_type,
                        expected: he.symbol,
                        received: n.parsedType
                    }),
                    Be
                }
                return pr(e.data)
            }
        }
        ;
        Cs.create = r => new Cs({
            typeName: Ie.ZodSymbol,
            ...Ne(r)
        });
        Jo = class extends Ce {
            _parse(e) {
                if (this._getType(e) !== he.undefined) {
                    let n = this._getOrReturnCtx(e);
                    return de(n, {
                        code: ne.invalid_type,
                        expected: he.undefined,
                        received: n.parsedType
                    }),
                    Be
                }
                return pr(e.data)
            }
        }
        ;
        Jo.create = r => new Jo({
            typeName: Ie.ZodUndefined,
            ...Ne(r)
        });
        Xo = class extends Ce {
            _parse(e) {
                if (this._getType(e) !== he.null) {
                    let n = this._getOrReturnCtx(e);
                    return de(n, {
                        code: ne.invalid_type,
                        expected: he.null,
                        received: n.parsedType
                    }),
                    Be
                }
                return pr(e.data)
            }
        }
        ;
        Xo.create = r => new Xo({
            typeName: Ie.ZodNull,
            ...Ne(r)
        });
        Yn = class extends Ce {
            constructor() {
                super(...arguments),
                this._any = !0
            }
            _parse(e) {
                return pr(e.data)
            }
        }
        ;
        Yn.create = r => new Yn({
            typeName: Ie.ZodAny,
            ...Ne(r)
        });
        vn = class extends Ce {
            constructor() {
                super(...arguments),
                this._unknown = !0
            }
            _parse(e) {
                return pr(e.data)
            }
        }
        ;
        vn.create = r => new vn({
            typeName: Ie.ZodUnknown,
            ...Ne(r)
        });
        Dr = class extends Ce {
            _parse(e) {
                let t = this._getOrReturnCtx(e);
                return de(t, {
                    code: ne.invalid_type,
                    expected: he.never,
                    received: t.parsedType
                }),
                Be
            }
        }
        ;
        Dr.create = r => new Dr({
            typeName: Ie.ZodNever,
            ...Ne(r)
        });
        Os = class extends Ce {
            _parse(e) {
                if (this._getType(e) !== he.undefined) {
                    let n = this._getOrReturnCtx(e);
                    return de(n, {
                        code: ne.invalid_type,
                        expected: he.void,
                        received: n.parsedType
                    }),
                    Be
                }
                return pr(e.data)
            }
        }
        ;
        Os.create = r => new Os({
            typeName: Ie.ZodVoid,
            ...Ne(r)
        });
        En = class r extends Ce {
            _parse(e) {
                let {ctx: t, status: n} = this._processInputParams(e)
                  , o = this._def;
                if (t.parsedType !== he.array)
                    return de(t, {
                        code: ne.invalid_type,
                        expected: he.array,
                        received: t.parsedType
                    }),
                    Be;
                if (o.exactLength !== null) {
                    let i = t.data.length > o.exactLength.value
                      , u = t.data.length < o.exactLength.value;
                    (i || u) && (de(t, {
                        code: i ? ne.too_big : ne.too_small,
                        minimum: u ? o.exactLength.value : void 0,
                        maximum: i ? o.exactLength.value : void 0,
                        type: "array",
                        inclusive: !0,
                        exact: !0,
                        message: o.exactLength.message
                    }),
                    n.dirty())
                }
                if (o.minLength !== null && t.data.length < o.minLength.value && (de(t, {
                    code: ne.too_small,
                    minimum: o.minLength.value,
                    type: "array",
                    inclusive: !0,
                    exact: !1,
                    message: o.minLength.message
                }),
                n.dirty()),
                o.maxLength !== null && t.data.length > o.maxLength.value && (de(t, {
                    code: ne.too_big,
                    maximum: o.maxLength.value,
                    type: "array",
                    inclusive: !0,
                    exact: !1,
                    message: o.maxLength.message
                }),
                n.dirty()),
                t.common.async)
                    return Promise.all([...t.data].map( (i, u) => o.type._parseAsync(new Tr(t,i,t.path,u)))).then(i => Qt.mergeArray(n, i));
                let s = [...t.data].map( (i, u) => o.type._parseSync(new Tr(t,i,t.path,u)));
                return Qt.mergeArray(n, s)
            }
            get element() {
                return this._def.type
            }
            min(e, t) {
                return new r({
                    ...this._def,
                    minLength: {
                        value: e,
                        message: Ee.toString(t)
                    }
                })
            }
            max(e, t) {
                return new r({
                    ...this._def,
                    maxLength: {
                        value: e,
                        message: Ee.toString(t)
                    }
                })
            }
            length(e, t) {
                return new r({
                    ...this._def,
                    exactLength: {
                        value: e,
                        message: Ee.toString(t)
                    }
                })
            }
            nonempty(e) {
                return this.min(1, e)
            }
        }
        ;
        En.create = (r, e) => new En({
            type: r,
            minLength: null,
            maxLength: null,
            exactLength: null,
            typeName: Ie.ZodArray,
            ...Ne(e)
        });
        mr = class r extends Ce {
            constructor() {
                super(...arguments),
                this._cached = null,
                this.nonstrict = this.passthrough,
                this.augment = this.extend
            }
            _getCached() {
                if (this._cached !== null)
                    return this._cached;
                let e = this._def.shape()
                  , t = He.objectKeys(e);
                return this._cached = {
                    shape: e,
                    keys: t
                }
            }
            _parse(e) {
                if (this._getType(e) !== he.object) {
                    let g = this._getOrReturnCtx(e);
                    return de(g, {
                        code: ne.invalid_type,
                        expected: he.object,
                        received: g.parsedType
                    }),
                    Be
                }
                let {status: n, ctx: o} = this._processInputParams(e)
                  , {shape: s, keys: i} = this._getCached()
                  , u = [];
                if (!(this._def.catchall instanceof Dr && this._def.unknownKeys === "strip"))
                    for (let g in o.data)
                        i.includes(g) || u.push(g);
                let f = [];
                for (let g of i) {
                    let b = s[g]
                      , E = o.data[g];
                    f.push({
                        key: {
                            status: "valid",
                            value: g
                        },
                        value: b._parse(new Tr(o,E,o.path,g)),
                        alwaysSet: g in o.data
                    })
                }
                if (this._def.catchall instanceof Dr) {
                    let g = this._def.unknownKeys;
                    if (g === "passthrough")
                        for (let b of u)
                            f.push({
                                key: {
                                    status: "valid",
                                    value: b
                                },
                                value: {
                                    status: "valid",
                                    value: o.data[b]
                                }
                            });
                    else if (g === "strict")
                        u.length > 0 && (de(o, {
                            code: ne.unrecognized_keys,
                            keys: u
                        }),
                        n.dirty());
                    else if (g !== "strip")
                        throw new Error("Internal ZodObject error: invalid unknownKeys value.")
                } else {
                    let g = this._def.catchall;
                    for (let b of u) {
                        let E = o.data[b];
                        f.push({
                            key: {
                                status: "valid",
                                value: b
                            },
                            value: g._parse(new Tr(o,E,o.path,b)),
                            alwaysSet: b in o.data
                        })
                    }
                }
                return o.common.async ? Promise.resolve().then(async () => {
                    let g = [];
                    for (let b of f) {
                        let E = await b.key
                          , q = await b.value;
                        g.push({
                            key: E,
                            value: q,
                            alwaysSet: b.alwaysSet
                        })
                    }
                    return g
                }
                ).then(g => Qt.mergeObjectSync(n, g)) : Qt.mergeObjectSync(n, f)
            }
            get shape() {
                return this._def.shape()
            }
            strict(e) {
                return Ee.errToObj,
                new r({
                    ...this._def,
                    unknownKeys: "strict",
                    ...e !== void 0 ? {
                        errorMap: (t, n) => {
                            var o, s, i, u;
                            let f = (i = (s = (o = this._def).errorMap) === null || s === void 0 ? void 0 : s.call(o, t, n).message) !== null && i !== void 0 ? i : n.defaultError;
                            return t.code === "unrecognized_keys" ? {
                                message: (u = Ee.errToObj(e).message) !== null && u !== void 0 ? u : f
                            } : {
                                message: f
                            }
                        }
                    } : {}
                })
            }
            strip() {
                return new r({
                    ...this._def,
                    unknownKeys: "strip"
                })
            }
            passthrough() {
                return new r({
                    ...this._def,
                    unknownKeys: "passthrough"
                })
            }
            extend(e) {
                return new r({
                    ...this._def,
                    shape: () => ({
                        ...this._def.shape(),
                        ...e
                    })
                })
            }
            merge(e) {
                return new r({
                    unknownKeys: e._def.unknownKeys,
                    catchall: e._def.catchall,
                    shape: () => ({
                        ...this._def.shape(),
                        ...e._def.shape()
                    }),
                    typeName: Ie.ZodObject
                })
            }
            setKey(e, t) {
                return this.augment({
                    [e]: t
                })
            }
            catchall(e) {
                return new r({
                    ...this._def,
                    catchall: e
                })
            }
            pick(e) {
                let t = {};
                return He.objectKeys(e).forEach(n => {
                    e[n] && this.shape[n] && (t[n] = this.shape[n])
                }
                ),
                new r({
                    ...this._def,
                    shape: () => t
                })
            }
            omit(e) {
                let t = {};
                return He.objectKeys(this.shape).forEach(n => {
                    e[n] || (t[n] = this.shape[n])
                }
                ),
                new r({
                    ...this._def,
                    shape: () => t
                })
            }
            deepPartial() {
                return Ms(this)
            }
            partial(e) {
                let t = {};
                return He.objectKeys(this.shape).forEach(n => {
                    let o = this.shape[n];
                    e && !e[n] ? t[n] = o : t[n] = o.optional()
                }
                ),
                new r({
                    ...this._def,
                    shape: () => t
                })
            }
            required(e) {
                let t = {};
                return He.objectKeys(this.shape).forEach(n => {
                    if (e && !e[n])
                        t[n] = this.shape[n];
                    else {
                        let s = this.shape[n];
                        for (; s instanceof Br; )
                            s = s._def.innerType;
                        t[n] = s
                    }
                }
                ),
                new r({
                    ...this._def,
                    shape: () => t
                })
            }
            keyof() {
                return jy(He.objectKeys(this.shape))
            }
        }
        ;
        mr.create = (r, e) => new mr({
            shape: () => r,
            unknownKeys: "strip",
            catchall: Dr.create(),
            typeName: Ie.ZodObject,
            ...Ne(e)
        });
        mr.strictCreate = (r, e) => new mr({
            shape: () => r,
            unknownKeys: "strict",
            catchall: Dr.create(),
            typeName: Ie.ZodObject,
            ...Ne(e)
        });
        mr.lazycreate = (r, e) => new mr({
            shape: r,
            unknownKeys: "strip",
            catchall: Dr.create(),
            typeName: Ie.ZodObject,
            ...Ne(e)
        });
        Qo = class extends Ce {
            _parse(e) {
                let {ctx: t} = this._processInputParams(e)
                  , n = this._def.options;
                function o(s) {
                    for (let u of s)
                        if (u.result.status === "valid")
                            return u.result;
                    for (let u of s)
                        if (u.result.status === "dirty")
                            return t.common.issues.push(...u.ctx.common.issues),
                            u.result;
                    let i = s.map(u => new jt(u.ctx.common.issues));
                    return de(t, {
                        code: ne.invalid_union,
                        unionErrors: i
                    }),
                    Be
                }
                if (t.common.async)
                    return Promise.all(n.map(async s => {
                        let i = {
                            ...t,
                            common: {
                                ...t.common,
                                issues: []
                            },
                            parent: null
                        };
                        return {
                            result: await s._parseAsync({
                                data: t.data,
                                path: t.path,
                                parent: i
                            }),
                            ctx: i
                        }
                    }
                    )).then(o);
                {
                    let s, i = [];
                    for (let f of n) {
                        let g = {
                            ...t,
                            common: {
                                ...t.common,
                                issues: []
                            },
                            parent: null
                        }
                          , b = f._parseSync({
                            data: t.data,
                            path: t.path,
                            parent: g
                        });
                        if (b.status === "valid")
                            return b;
                        b.status === "dirty" && !s && (s = {
                            result: b,
                            ctx: g
                        }),
                        g.common.issues.length && i.push(g.common.issues)
                    }
                    if (s)
                        return t.common.issues.push(...s.ctx.common.issues),
                        s.result;
                    let u = i.map(f => new jt(f));
                    return de(t, {
                        code: ne.invalid_union,
                        unionErrors: u
                    }),
                    Be
                }
            }
            get options() {
                return this._def.options
            }
        }
        ;
        Qo.create = (r, e) => new Qo({
            options: r,
            typeName: Ie.ZodUnion,
            ...Ne(e)
        });
        Sn = r => r instanceof ts ? Sn(r.schema) : r instanceof Sr ? Sn(r.innerType()) : r instanceof rs ? [r.value] : r instanceof ns ? r.options : r instanceof os ? He.objectValues(r.enum) : r instanceof ss ? Sn(r._def.innerType) : r instanceof Jo ? [void 0] : r instanceof Xo ? [null] : r instanceof Br ? [void 0, ...Sn(r.unwrap())] : r instanceof rn ? [null, ...Sn(r.unwrap())] : r instanceof zi || r instanceof as ? Sn(r.unwrap()) : r instanceof is ? Sn(r._def.innerType) : [],
        Fa = class r extends Ce {
            _parse(e) {
                let {ctx: t} = this._processInputParams(e);
                if (t.parsedType !== he.object)
                    return de(t, {
                        code: ne.invalid_type,
                        expected: he.object,
                        received: t.parsedType
                    }),
                    Be;
                let n = this.discriminator
                  , o = t.data[n]
                  , s = this.optionsMap.get(o);
                return s ? t.common.async ? s._parseAsync({
                    data: t.data,
                    path: t.path,
                    parent: t
                }) : s._parseSync({
                    data: t.data,
                    path: t.path,
                    parent: t
                }) : (de(t, {
                    code: ne.invalid_union_discriminator,
                    options: Array.from(this.optionsMap.keys()),
                    path: [n]
                }),
                Be)
            }
            get discriminator() {
                return this._def.discriminator
            }
            get options() {
                return this._def.options
            }
            get optionsMap() {
                return this._def.optionsMap
            }
            static create(e, t, n) {
                let o = new Map;
                for (let s of t) {
                    let i = Sn(s.shape[e]);
                    if (!i.length)
                        throw new Error(`A discriminator value for key \`${e}\` could not be extracted from all schema options`);
                    for (let u of i) {
                        if (o.has(u))
                            throw new Error(`Discriminator property ${String(e)} has duplicate value ${String(u)}`);
                        o.set(u, s)
                    }
                }
                return new r({
                    typeName: Ie.ZodDiscriminatedUnion,
                    discriminator: e,
                    options: t,
                    optionsMap: o,
                    ...Ne(n)
                })
            }
        }
        ;
        es = class extends Ce {
            _parse(e) {
                let {status: t, ctx: n} = this._processInputParams(e)
                  , o = (s, i) => {
                    if (Vp(s) || Vp(i))
                        return Be;
                    let u = Zp(s.value, i.value);
                    return u.valid ? ((Gp(s) || Gp(i)) && t.dirty(),
                    {
                        status: t.value,
                        value: u.data
                    }) : (de(n, {
                        code: ne.invalid_intersection_types
                    }),
                    Be)
                }
                ;
                return n.common.async ? Promise.all([this._def.left._parseAsync({
                    data: n.data,
                    path: n.path,
                    parent: n
                }), this._def.right._parseAsync({
                    data: n.data,
                    path: n.path,
                    parent: n
                })]).then( ([s,i]) => o(s, i)) : o(this._def.left._parseSync({
                    data: n.data,
                    path: n.path,
                    parent: n
                }), this._def.right._parseSync({
                    data: n.data,
                    path: n.path,
                    parent: n
                }))
            }
        }
        ;
        es.create = (r, e, t) => new es({
            left: r,
            right: e,
            typeName: Ie.ZodIntersection,
            ...Ne(t)
        });
        tn = class r extends Ce {
            _parse(e) {
                let {status: t, ctx: n} = this._processInputParams(e);
                if (n.parsedType !== he.array)
                    return de(n, {
                        code: ne.invalid_type,
                        expected: he.array,
                        received: n.parsedType
                    }),
                    Be;
                if (n.data.length < this._def.items.length)
                    return de(n, {
                        code: ne.too_small,
                        minimum: this._def.items.length,
                        inclusive: !0,
                        exact: !1,
                        type: "array"
                    }),
                    Be;
                !this._def.rest && n.data.length > this._def.items.length && (de(n, {
                    code: ne.too_big,
                    maximum: this._def.items.length,
                    inclusive: !0,
                    exact: !1,
                    type: "array"
                }),
                t.dirty());
                let s = [...n.data].map( (i, u) => {
                    let f = this._def.items[u] || this._def.rest;
                    return f ? f._parse(new Tr(n,i,n.path,u)) : null
                }
                ).filter(i => !!i);
                return n.common.async ? Promise.all(s).then(i => Qt.mergeArray(t, i)) : Qt.mergeArray(t, s)
            }
            get items() {
                return this._def.items
            }
            rest(e) {
                return new r({
                    ...this._def,
                    rest: e
                })
            }
        }
        ;
        tn.create = (r, e) => {
            if (!Array.isArray(r))
                throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
            return new tn({
                items: r,
                typeName: Ie.ZodTuple,
                rest: null,
                ...Ne(e)
            })
        }
        ;
        ja = class r extends Ce {
            get keySchema() {
                return this._def.keyType
            }
            get valueSchema() {
                return this._def.valueType
            }
            _parse(e) {
                let {status: t, ctx: n} = this._processInputParams(e);
                if (n.parsedType !== he.object)
                    return de(n, {
                        code: ne.invalid_type,
                        expected: he.object,
                        received: n.parsedType
                    }),
                    Be;
                let o = []
                  , s = this._def.keyType
                  , i = this._def.valueType;
                for (let u in n.data)
                    o.push({
                        key: s._parse(new Tr(n,u,n.path,u)),
                        value: i._parse(new Tr(n,n.data[u],n.path,u)),
                        alwaysSet: u in n.data
                    });
                return n.common.async ? Qt.mergeObjectAsync(t, o) : Qt.mergeObjectSync(t, o)
            }
            get element() {
                return this._def.valueType
            }
            static create(e, t, n) {
                return t instanceof Ce ? new r({
                    keyType: e,
                    valueType: t,
                    typeName: Ie.ZodRecord,
                    ...Ne(n)
                }) : new r({
                    keyType: Zn.create(),
                    valueType: e,
                    typeName: Ie.ZodRecord,
                    ...Ne(t)
                })
            }
        }
        ,
        qs = class extends Ce {
            get keySchema() {
                return this._def.keyType
            }
            get valueSchema() {
                return this._def.valueType
            }
            _parse(e) {
                let {status: t, ctx: n} = this._processInputParams(e);
                if (n.parsedType !== he.map)
                    return de(n, {
                        code: ne.invalid_type,
                        expected: he.map,
                        received: n.parsedType
                    }),
                    Be;
                let o = this._def.keyType
                  , s = this._def.valueType
                  , i = [...n.data.entries()].map( ([u,f], g) => ({
                    key: o._parse(new Tr(n,u,n.path,[g, "key"])),
                    value: s._parse(new Tr(n,f,n.path,[g, "value"]))
                }));
                if (n.common.async) {
                    let u = new Map;
                    return Promise.resolve().then(async () => {
                        for (let f of i) {
                            let g = await f.key
                              , b = await f.value;
                            if (g.status === "aborted" || b.status === "aborted")
                                return Be;
                            (g.status === "dirty" || b.status === "dirty") && t.dirty(),
                            u.set(g.value, b.value)
                        }
                        return {
                            status: t.value,
                            value: u
                        }
                    }
                    )
                } else {
                    let u = new Map;
                    for (let f of i) {
                        let g = f.key
                          , b = f.value;
                        if (g.status === "aborted" || b.status === "aborted")
                            return Be;
                        (g.status === "dirty" || b.status === "dirty") && t.dirty(),
                        u.set(g.value, b.value)
                    }
                    return {
                        status: t.value,
                        value: u
                    }
                }
            }
        }
        ;
        qs.create = (r, e, t) => new qs({
            valueType: e,
            keyType: r,
            typeName: Ie.ZodMap,
            ...Ne(t)
        });
        Us = class r extends Ce {
            _parse(e) {
                let {status: t, ctx: n} = this._processInputParams(e);
                if (n.parsedType !== he.set)
                    return de(n, {
                        code: ne.invalid_type,
                        expected: he.set,
                        received: n.parsedType
                    }),
                    Be;
                let o = this._def;
                o.minSize !== null && n.data.size < o.minSize.value && (de(n, {
                    code: ne.too_small,
                    minimum: o.minSize.value,
                    type: "set",
                    inclusive: !0,
                    exact: !1,
                    message: o.minSize.message
                }),
                t.dirty()),
                o.maxSize !== null && n.data.size > o.maxSize.value && (de(n, {
                    code: ne.too_big,
                    maximum: o.maxSize.value,
                    type: "set",
                    inclusive: !0,
                    exact: !1,
                    message: o.maxSize.message
                }),
                t.dirty());
                let s = this._def.valueType;
                function i(f) {
                    let g = new Set;
                    for (let b of f) {
                        if (b.status === "aborted")
                            return Be;
                        b.status === "dirty" && t.dirty(),
                        g.add(b.value)
                    }
                    return {
                        status: t.value,
                        value: g
                    }
                }
                let u = [...n.data.values()].map( (f, g) => s._parse(new Tr(n,f,n.path,g)));
                return n.common.async ? Promise.all(u).then(f => i(f)) : i(u)
            }
            min(e, t) {
                return new r({
                    ...this._def,
                    minSize: {
                        value: e,
                        message: Ee.toString(t)
                    }
                })
            }
            max(e, t) {
                return new r({
                    ...this._def,
                    maxSize: {
                        value: e,
                        message: Ee.toString(t)
                    }
                })
            }
            size(e, t) {
                return this.min(e, t).max(e, t)
            }
            nonempty(e) {
                return this.min(1, e)
            }
        }
        ;
        Us.create = (r, e) => new Us({
            valueType: r,
            minSize: null,
            maxSize: null,
            typeName: Ie.ZodSet,
            ...Ne(e)
        });
        Ha = class r extends Ce {
            constructor() {
                super(...arguments),
                this.validate = this.implement
            }
            _parse(e) {
                let {ctx: t} = this._processInputParams(e);
                if (t.parsedType !== he.function)
                    return de(t, {
                        code: ne.invalid_type,
                        expected: he.function,
                        received: t.parsedType
                    }),
                    Be;
                function n(u, f) {
                    return Ua({
                        data: u,
                        path: t.path,
                        errorMaps: [t.common.contextualErrorMap, t.schemaErrorMap, qa(), Ns].filter(g => !!g),
                        issueData: {
                            code: ne.invalid_arguments,
                            argumentsError: f
                        }
                    })
                }
                function o(u, f) {
                    return Ua({
                        data: u,
                        path: t.path,
                        errorMaps: [t.common.contextualErrorMap, t.schemaErrorMap, qa(), Ns].filter(g => !!g),
                        issueData: {
                            code: ne.invalid_return_type,
                            returnTypeError: f
                        }
                    })
                }
                let s = {
                    errorMap: t.common.contextualErrorMap
                }
                  , i = t.data;
                if (this._def.returns instanceof $n) {
                    let u = this;
                    return pr(async function(...f) {
                        let g = new jt([])
                          , b = await u._def.args.parseAsync(f, s).catch(O => {
                            throw g.addIssue(n(f, O)),
                            g
                        }
                        )
                          , E = await Reflect.apply(i, this, b);
                        return await u._def.returns._def.type.parseAsync(E, s).catch(O => {
                            throw g.addIssue(o(E, O)),
                            g
                        }
                        )
                    })
                } else {
                    let u = this;
                    return pr(function(...f) {
                        let g = u._def.args.safeParse(f, s);
                        if (!g.success)
                            throw new jt([n(f, g.error)]);
                        let b = Reflect.apply(i, this, g.data)
                          , E = u._def.returns.safeParse(b, s);
                        if (!E.success)
                            throw new jt([o(b, E.error)]);
                        return E.data
                    })
                }
            }
            parameters() {
                return this._def.args
            }
            returnType() {
                return this._def.returns
            }
            args(...e) {
                return new r({
                    ...this._def,
                    args: tn.create(e).rest(vn.create())
                })
            }
            returns(e) {
                return new r({
                    ...this._def,
                    returns: e
                })
            }
            implement(e) {
                return this.parse(e)
            }
            strictImplement(e) {
                return this.parse(e)
            }
            static create(e, t, n) {
                return new r({
                    args: e || tn.create([]).rest(vn.create()),
                    returns: t || vn.create(),
                    typeName: Ie.ZodFunction,
                    ...Ne(n)
                })
            }
        }
        ,
        ts = class extends Ce {
            get schema() {
                return this._def.getter()
            }
            _parse(e) {
                let {ctx: t} = this._processInputParams(e);
                return this._def.getter()._parse({
                    data: t.data,
                    path: t.path,
                    parent: t
                })
            }
        }
        ;
        ts.create = (r, e) => new ts({
            getter: r,
            typeName: Ie.ZodLazy,
            ...Ne(e)
        });
        rs = class extends Ce {
            _parse(e) {
                if (e.data !== this._def.value) {
                    let t = this._getOrReturnCtx(e);
                    return de(t, {
                        received: t.data,
                        code: ne.invalid_literal,
                        expected: this._def.value
                    }),
                    Be
                }
                return {
                    status: "valid",
                    value: e.data
                }
            }
            get value() {
                return this._def.value
            }
        }
        ;
        rs.create = (r, e) => new rs({
            value: r,
            typeName: Ie.ZodLiteral,
            ...Ne(e)
        });
        ns = class r extends Ce {
            constructor() {
                super(...arguments),
                Ri.set(this, void 0)
            }
            _parse(e) {
                if (typeof e.data != "string") {
                    let t = this._getOrReturnCtx(e)
                      , n = this._def.values;
                    return de(t, {
                        expected: He.joinValues(n),
                        received: t.parsedType,
                        code: ne.invalid_type
                    }),
                    Be
                }
                if (Da(this, Ri, "f") || qy(this, Ri, new Set(this._def.values), "f"),
                !Da(this, Ri, "f").has(e.data)) {
                    let t = this._getOrReturnCtx(e)
                      , n = this._def.values;
                    return de(t, {
                        received: t.data,
                        code: ne.invalid_enum_value,
                        options: n
                    }),
                    Be
                }
                return pr(e.data)
            }
            get options() {
                return this._def.values
            }
            get enum() {
                let e = {};
                for (let t of this._def.values)
                    e[t] = t;
                return e
            }
            get Values() {
                let e = {};
                for (let t of this._def.values)
                    e[t] = t;
                return e
            }
            get Enum() {
                let e = {};
                for (let t of this._def.values)
                    e[t] = t;
                return e
            }
            extract(e, t=this._def) {
                return r.create(e, {
                    ...this._def,
                    ...t
                })
            }
            exclude(e, t=this._def) {
                return r.create(this.options.filter(n => !e.includes(n)), {
                    ...this._def,
                    ...t
                })
            }
        }
        ;
        Ri = new WeakMap;
        ns.create = jy;
        os = class extends Ce {
            constructor() {
                super(...arguments),
                Bi.set(this, void 0)
            }
            _parse(e) {
                let t = He.getValidEnumValues(this._def.values)
                  , n = this._getOrReturnCtx(e);
                if (n.parsedType !== he.string && n.parsedType !== he.number) {
                    let o = He.objectValues(t);
                    return de(n, {
                        expected: He.joinValues(o),
                        received: n.parsedType,
                        code: ne.invalid_type
                    }),
                    Be
                }
                if (Da(this, Bi, "f") || qy(this, Bi, new Set(He.getValidEnumValues(this._def.values)), "f"),
                !Da(this, Bi, "f").has(e.data)) {
                    let o = He.objectValues(t);
                    return de(n, {
                        received: n.data,
                        code: ne.invalid_enum_value,
                        options: o
                    }),
                    Be
                }
                return pr(e.data)
            }
            get enum() {
                return this._def.values
            }
        }
        ;
        Bi = new WeakMap;
        os.create = (r, e) => new os({
            values: r,
            typeName: Ie.ZodNativeEnum,
            ...Ne(e)
        });
        $n = class extends Ce {
            unwrap() {
                return this._def.type
            }
            _parse(e) {
                let {ctx: t} = this._processInputParams(e);
                if (t.parsedType !== he.promise && t.common.async === !1)
                    return de(t, {
                        code: ne.invalid_type,
                        expected: he.promise,
                        received: t.parsedType
                    }),
                    Be;
                let n = t.parsedType === he.promise ? t.data : Promise.resolve(t.data);
                return pr(n.then(o => this._def.type.parseAsync(o, {
                    path: t.path,
                    errorMap: t.common.contextualErrorMap
                })))
            }
        }
        ;
        $n.create = (r, e) => new $n({
            type: r,
            typeName: Ie.ZodPromise,
            ...Ne(e)
        });
        Sr = class extends Ce {
            innerType() {
                return this._def.schema
            }
            sourceType() {
                return this._def.schema._def.typeName === Ie.ZodEffects ? this._def.schema.sourceType() : this._def.schema
            }
            _parse(e) {
                let {status: t, ctx: n} = this._processInputParams(e)
                  , o = this._def.effect || null
                  , s = {
                    addIssue: i => {
                        de(n, i),
                        i.fatal ? t.abort() : t.dirty()
                    }
                    ,
                    get path() {
                        return n.path
                    }
                };
                if (s.addIssue = s.addIssue.bind(s),
                o.type === "preprocess") {
                    let i = o.transform(n.data, s);
                    if (n.common.async)
                        return Promise.resolve(i).then(async u => {
                            if (t.value === "aborted")
                                return Be;
                            let f = await this._def.schema._parseAsync({
                                data: u,
                                path: n.path,
                                parent: n
                            });
                            return f.status === "aborted" ? Be : f.status === "dirty" || t.value === "dirty" ? Ls(f.value) : f
                        }
                        );
                    {
                        if (t.value === "aborted")
                            return Be;
                        let u = this._def.schema._parseSync({
                            data: i,
                            path: n.path,
                            parent: n
                        });
                        return u.status === "aborted" ? Be : u.status === "dirty" || t.value === "dirty" ? Ls(u.value) : u
                    }
                }
                if (o.type === "refinement") {
                    let i = u => {
                        let f = o.refinement(u, s);
                        if (n.common.async)
                            return Promise.resolve(f);
                        if (f instanceof Promise)
                            throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
                        return u
                    }
                    ;
                    if (n.common.async === !1) {
                        let u = this._def.schema._parseSync({
                            data: n.data,
                            path: n.path,
                            parent: n
                        });
                        return u.status === "aborted" ? Be : (u.status === "dirty" && t.dirty(),
                        i(u.value),
                        {
                            status: t.value,
                            value: u.value
                        })
                    } else
                        return this._def.schema._parseAsync({
                            data: n.data,
                            path: n.path,
                            parent: n
                        }).then(u => u.status === "aborted" ? Be : (u.status === "dirty" && t.dirty(),
                        i(u.value).then( () => ({
                            status: t.value,
                            value: u.value
                        }))))
                }
                if (o.type === "transform")
                    if (n.common.async === !1) {
                        let i = this._def.schema._parseSync({
                            data: n.data,
                            path: n.path,
                            parent: n
                        });
                        if (!Ti(i))
                            return i;
                        let u = o.transform(i.value, s);
                        if (u instanceof Promise)
                            throw new Error("Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.");
                        return {
                            status: t.value,
                            value: u
                        }
                    } else
                        return this._def.schema._parseAsync({
                            data: n.data,
                            path: n.path,
                            parent: n
                        }).then(i => Ti(i) ? Promise.resolve(o.transform(i.value, s)).then(u => ({
                            status: t.value,
                            value: u
                        })) : i);
                He.assertNever(o)
            }
        }
        ;
        Sr.create = (r, e, t) => new Sr({
            schema: r,
            typeName: Ie.ZodEffects,
            effect: e,
            ...Ne(t)
        });
        Sr.createWithPreprocess = (r, e, t) => new Sr({
            schema: e,
            effect: {
                type: "preprocess",
                transform: r
            },
            typeName: Ie.ZodEffects,
            ...Ne(t)
        });
        Br = class extends Ce {
            _parse(e) {
                return this._getType(e) === he.undefined ? pr(void 0) : this._def.innerType._parse(e)
            }
            unwrap() {
                return this._def.innerType
            }
        }
        ;
        Br.create = (r, e) => new Br({
            innerType: r,
            typeName: Ie.ZodOptional,
            ...Ne(e)
        });
        rn = class extends Ce {
            _parse(e) {
                return this._getType(e) === he.null ? pr(null) : this._def.innerType._parse(e)
            }
            unwrap() {
                return this._def.innerType
            }
        }
        ;
        rn.create = (r, e) => new rn({
            innerType: r,
            typeName: Ie.ZodNullable,
            ...Ne(e)
        });
        ss = class extends Ce {
            _parse(e) {
                let {ctx: t} = this._processInputParams(e)
                  , n = t.data;
                return t.parsedType === he.undefined && (n = this._def.defaultValue()),
                this._def.innerType._parse({
                    data: n,
                    path: t.path,
                    parent: t
                })
            }
            removeDefault() {
                return this._def.innerType
            }
        }
        ;
        ss.create = (r, e) => new ss({
            innerType: r,
            typeName: Ie.ZodDefault,
            defaultValue: typeof e.default == "function" ? e.default : () => e.default,
            ...Ne(e)
        });
        is = class extends Ce {
            _parse(e) {
                let {ctx: t} = this._processInputParams(e)
                  , n = {
                    ...t,
                    common: {
                        ...t.common,
                        issues: []
                    }
                }
                  , o = this._def.innerType._parse({
                    data: n.data,
                    path: n.path,
                    parent: {
                        ...n
                    }
                });
                return Pi(o) ? o.then(s => ({
                    status: "valid",
                    value: s.status === "valid" ? s.value : this._def.catchValue({
                        get error() {
                            return new jt(n.common.issues)
                        },
                        input: n.data
                    })
                })) : {
                    status: "valid",
                    value: o.status === "valid" ? o.value : this._def.catchValue({
                        get error() {
                            return new jt(n.common.issues)
                        },
                        input: n.data
                    })
                }
            }
            removeCatch() {
                return this._def.innerType
            }
        }
        ;
        is.create = (r, e) => new is({
            innerType: r,
            typeName: Ie.ZodCatch,
            catchValue: typeof e.catch == "function" ? e.catch : () => e.catch,
            ...Ne(e)
        });
        Ds = class extends Ce {
            _parse(e) {
                if (this._getType(e) !== he.nan) {
                    let n = this._getOrReturnCtx(e);
                    return de(n, {
                        code: ne.invalid_type,
                        expected: he.nan,
                        received: n.parsedType
                    }),
                    Be
                }
                return {
                    status: "valid",
                    value: e.data
                }
            }
        }
        ;
        Ds.create = r => new Ds({
            typeName: Ie.ZodNaN,
            ...Ne(r)
        });
        QI = Symbol("zod_brand"),
        zi = class extends Ce {
            _parse(e) {
                let {ctx: t} = this._processInputParams(e)
                  , n = t.data;
                return this._def.type._parse({
                    data: n,
                    path: t.path,
                    parent: t
                })
            }
            unwrap() {
                return this._def.type
            }
        }
        ,
        Mi = class r extends Ce {
            _parse(e) {
                let {status: t, ctx: n} = this._processInputParams(e);
                if (n.common.async)
                    return (async () => {
                        let s = await this._def.in._parseAsync({
                            data: n.data,
                            path: n.path,
                            parent: n
                        });
                        return s.status === "aborted" ? Be : s.status === "dirty" ? (t.dirty(),
                        Ls(s.value)) : this._def.out._parseAsync({
                            data: s.value,
                            path: n.path,
                            parent: n
                        })
                    }
                    )();
                {
                    let o = this._def.in._parseSync({
                        data: n.data,
                        path: n.path,
                        parent: n
                    });
                    return o.status === "aborted" ? Be : o.status === "dirty" ? (t.dirty(),
                    {
                        status: "dirty",
                        value: o.value
                    }) : this._def.out._parseSync({
                        data: o.value,
                        path: n.path,
                        parent: n
                    })
                }
            }
            static create(e, t) {
                return new r({
                    in: e,
                    out: t,
                    typeName: Ie.ZodPipeline
                })
            }
        }
        ,
        as = class extends Ce {
            _parse(e) {
                let t = this._def.innerType._parse(e)
                  , n = o => (Ti(o) && (o.value = Object.freeze(o.value)),
                o);
                return Pi(t) ? t.then(o => n(o)) : n(t)
            }
            unwrap() {
                return this._def.innerType
            }
        }
        ;
        as.create = (r, e) => new as({
            innerType: r,
            typeName: Ie.ZodReadonly,
            ...Ne(e)
        });
        eR = {
            object: mr.lazycreate
        };
        (function(r) {
            r.ZodString = "ZodString",
            r.ZodNumber = "ZodNumber",
            r.ZodNaN = "ZodNaN",
            r.ZodBigInt = "ZodBigInt",
            r.ZodBoolean = "ZodBoolean",
            r.ZodDate = "ZodDate",
            r.ZodSymbol = "ZodSymbol",
            r.ZodUndefined = "ZodUndefined",
            r.ZodNull = "ZodNull",
            r.ZodAny = "ZodAny",
            r.ZodUnknown = "ZodUnknown",
            r.ZodNever = "ZodNever",
            r.ZodVoid = "ZodVoid",
            r.ZodArray = "ZodArray",
            r.ZodObject = "ZodObject",
            r.ZodUnion = "ZodUnion",
            r.ZodDiscriminatedUnion = "ZodDiscriminatedUnion",
            r.ZodIntersection = "ZodIntersection",
            r.ZodTuple = "ZodTuple",
            r.ZodRecord = "ZodRecord",
            r.ZodMap = "ZodMap",
            r.ZodSet = "ZodSet",
            r.ZodFunction = "ZodFunction",
            r.ZodLazy = "ZodLazy",
            r.ZodLiteral = "ZodLiteral",
            r.ZodEnum = "ZodEnum",
            r.ZodEffects = "ZodEffects",
            r.ZodNativeEnum = "ZodNativeEnum",
            r.ZodOptional = "ZodOptional",
            r.ZodNullable = "ZodNullable",
            r.ZodDefault = "ZodDefault",
            r.ZodCatch = "ZodCatch",
            r.ZodPromise = "ZodPromise",
            r.ZodBranded = "ZodBranded",
            r.ZodPipeline = "ZodPipeline",
            r.ZodReadonly = "ZodReadonly"
        }
        )(Ie || (Ie = {}));
        tR = (r, e={
            message: `Input not instance of ${r.name}`
        }) => Hy(t => t instanceof r, e),
        Ky = Zn.create,
        Wy = Go.create,
        rR = Ds.create,
        nR = Zo.create,
        Vy = Yo.create,
        oR = $o.create,
        sR = Cs.create,
        iR = Jo.create,
        aR = Xo.create,
        cR = Yn.create,
        uR = vn.create,
        pR = Dr.create,
        fR = Os.create,
        lR = En.create,
        dR = mr.create,
        hR = mr.strictCreate,
        yR = Qo.create,
        mR = Fa.create,
        gR = es.create,
        xR = tn.create,
        wR = ja.create,
        bR = qs.create,
        SR = Us.create,
        vR = Ha.create,
        ER = ts.create,
        _R = rs.create,
        AR = ns.create,
        kR = os.create,
        IR = $n.create,
        Cy = Sr.create,
        RR = Br.create,
        BR = rn.create,
        TR = Sr.createWithPreprocess,
        PR = Mi.create,
        zR = () => Ky().optional(),
        MR = () => Wy().optional(),
        LR = () => Vy().optional(),
        NR = {
            string: r => Zn.create({
                ...r,
                coerce: !0
            }),
            number: r => Go.create({
                ...r,
                coerce: !0
            }),
            boolean: r => Yo.create({
                ...r,
                coerce: !0
            }),
            bigint: r => Zo.create({
                ...r,
                coerce: !0
            }),
            date: r => $o.create({
                ...r,
                coerce: !0
            })
        },
        CR = Be,
        a = Object.freeze({
            __proto__: null,
            defaultErrorMap: Ns,
            setErrorMap: CI,
            getErrorMap: qa,
            makeIssue: Ua,
            EMPTY_PATH: OI,
            addIssueToContext: de,
            ParseStatus: Qt,
            INVALID: Be,
            DIRTY: Ls,
            OK: pr,
            isAborted: Vp,
            isDirty: Gp,
            isValid: Ti,
            isAsync: Pi,
            get util() {
                return He
            },
            get objectUtil() {
                return Wp
            },
            ZodParsedType: he,
            getParsedType: Gn,
            ZodType: Ce,
            datetimeRegex: Fy,
            ZodString: Zn,
            ZodNumber: Go,
            ZodBigInt: Zo,
            ZodBoolean: Yo,
            ZodDate: $o,
            ZodSymbol: Cs,
            ZodUndefined: Jo,
            ZodNull: Xo,
            ZodAny: Yn,
            ZodUnknown: vn,
            ZodNever: Dr,
            ZodVoid: Os,
            ZodArray: En,
            ZodObject: mr,
            ZodUnion: Qo,
            ZodDiscriminatedUnion: Fa,
            ZodIntersection: es,
            ZodTuple: tn,
            ZodRecord: ja,
            ZodMap: qs,
            ZodSet: Us,
            ZodFunction: Ha,
            ZodLazy: ts,
            ZodLiteral: rs,
            ZodEnum: ns,
            ZodNativeEnum: os,
            ZodPromise: $n,
            ZodEffects: Sr,
            ZodTransformer: Sr,
            ZodOptional: Br,
            ZodNullable: rn,
            ZodDefault: ss,
            ZodCatch: is,
            ZodNaN: Ds,
            BRAND: QI,
            ZodBranded: zi,
            ZodPipeline: Mi,
            ZodReadonly: as,
            custom: Hy,
            Schema: Ce,
            ZodSchema: Ce,
            late: eR,
            get ZodFirstPartyTypeKind() {
                return Ie
            },
            coerce: NR,
            any: cR,
            array: lR,
            bigint: nR,
            boolean: Vy,
            date: oR,
            discriminatedUnion: mR,
            effect: Cy,
            enum: AR,
            function: vR,
            instanceof: tR,
            intersection: gR,
            lazy: ER,
            literal: _R,
            map: bR,
            nan: rR,
            nativeEnum: kR,
            never: pR,
            null: aR,
            nullable: BR,
            number: Wy,
            object: dR,
            oboolean: LR,
            onumber: MR,
            optional: RR,
            ostring: zR,
            pipeline: PR,
            preprocess: TR,
            promise: IR,
            record: wR,
            set: SR,
            strictObject: hR,
            string: Ky,
            symbol: sR,
            transformer: Cy,
            tuple: xR,
            undefined: iR,
            union: yR,
            unknown: uR,
            void: fR,
            NEVER: CR,
            ZodIssueCode: ne,
            quotelessJson: NI,
            ZodError: jt
        })
    }
    );
    var Gy, Zy = C( () => {
        h();
        Gy = "logger/5.7.0"
    }
    );
    function OR() {
        try {
            let r = [];
            if (["NFD", "NFC", "NFKD", "NFKC"].forEach(e => {
                try {
                    if ("test".normalize(e) !== "test")
                        throw new Error("bad normalize")
                } catch {
                    r.push(e)
                }
            }
            ),
            r.length)
                throw new Error("missing " + r.join(", "));
            if ("\xE9".normalize("NFD") !== "e\u0301")
                throw new Error("broken implementation")
        } catch (r) {
            return r.message
        }
        return null
    }
    var Yy, $y, Ka, Jy, Yp, Xy, $p, Fr, Qy, nn, Wa = C( () => {
        "use strict";
        h();
        Zy();
        Yy = !1,
        $y = !1,
        Ka = {
            debug: 1,
            default: 2,
            info: 2,
            warning: 3,
            error: 4,
            off: 5
        },
        Jy = Ka.default,
        Yp = null;
        Xy = OR();
        (function(r) {
            r.DEBUG = "DEBUG",
            r.INFO = "INFO",
            r.WARNING = "WARNING",
            r.ERROR = "ERROR",
            r.OFF = "OFF"
        }
        )($p || ($p = {}));
        (function(r) {
            r.UNKNOWN_ERROR = "UNKNOWN_ERROR",
            r.NOT_IMPLEMENTED = "NOT_IMPLEMENTED",
            r.UNSUPPORTED_OPERATION = "UNSUPPORTED_OPERATION",
            r.NETWORK_ERROR = "NETWORK_ERROR",
            r.SERVER_ERROR = "SERVER_ERROR",
            r.TIMEOUT = "TIMEOUT",
            r.BUFFER_OVERRUN = "BUFFER_OVERRUN",
            r.NUMERIC_FAULT = "NUMERIC_FAULT",
            r.MISSING_NEW = "MISSING_NEW",
            r.INVALID_ARGUMENT = "INVALID_ARGUMENT",
            r.MISSING_ARGUMENT = "MISSING_ARGUMENT",
            r.UNEXPECTED_ARGUMENT = "UNEXPECTED_ARGUMENT",
            r.CALL_EXCEPTION = "CALL_EXCEPTION",
            r.INSUFFICIENT_FUNDS = "INSUFFICIENT_FUNDS",
            r.NONCE_EXPIRED = "NONCE_EXPIRED",
            r.REPLACEMENT_UNDERPRICED = "REPLACEMENT_UNDERPRICED",
            r.UNPREDICTABLE_GAS_LIMIT = "UNPREDICTABLE_GAS_LIMIT",
            r.TRANSACTION_REPLACED = "TRANSACTION_REPLACED",
            r.ACTION_REJECTED = "ACTION_REJECTED"
        }
        )(Fr || (Fr = {}));
        Qy = "0123456789abcdef",
        nn = class r {
            constructor(e) {
                Object.defineProperty(this, "version", {
                    enumerable: !0,
                    value: e,
                    writable: !1
                })
            }
            _log(e, t) {
                let n = e.toLowerCase();
                Ka[n] == null && this.throwArgumentError("invalid log level name", "logLevel", e),
                !(Jy > Ka[n]) && console.log.apply(console, t)
            }
            debug(...e) {
                this._log(r.levels.DEBUG, e)
            }
            info(...e) {
                this._log(r.levels.INFO, e)
            }
            warn(...e) {
                this._log(r.levels.WARNING, e)
            }
            makeError(e, t, n) {
                if ($y)
                    return this.makeError("censored error", t, {});
                t || (t = r.errors.UNKNOWN_ERROR),
                n || (n = {});
                let o = [];
                Object.keys(n).forEach(f => {
                    let g = n[f];
                    try {
                        if (g instanceof Uint8Array) {
                            let b = "";
                            for (let E = 0; E < g.length; E++)
                                b += Qy[g[E] >> 4],
                                b += Qy[g[E] & 15];
                            o.push(f + "=Uint8Array(0x" + b + ")")
                        } else
                            o.push(f + "=" + JSON.stringify(g))
                    } catch {
                        o.push(f + "=" + JSON.stringify(n[f].toString()))
                    }
                }
                ),
                o.push(`code=${t}`),
                o.push(`version=${this.version}`);
                let s = e
                  , i = "";
                switch (t) {
                case Fr.NUMERIC_FAULT:
                    {
                        i = "NUMERIC_FAULT";
                        let f = e;
                        switch (f) {
                        case "overflow":
                        case "underflow":
                        case "division-by-zero":
                            i += "-" + f;
                            break;
                        case "negative-power":
                        case "negative-width":
                            i += "-unsupported";
                            break;
                        case "unbound-bitwise-result":
                            i += "-unbound-result";
                            break
                        }
                        break
                    }
                case Fr.CALL_EXCEPTION:
                case Fr.INSUFFICIENT_FUNDS:
                case Fr.MISSING_NEW:
                case Fr.NONCE_EXPIRED:
                case Fr.REPLACEMENT_UNDERPRICED:
                case Fr.TRANSACTION_REPLACED:
                case Fr.UNPREDICTABLE_GAS_LIMIT:
                    i = t;
                    break
                }
                i && (e += " [ See: https://links.ethers.org/v5-errors-" + i + " ]"),
                o.length && (e += " (" + o.join(", ") + ")");
                let u = new Error(e);
                return u.reason = s,
                u.code = t,
                Object.keys(n).forEach(function(f) {
                    u[f] = n[f]
                }),
                u
            }
            throwError(e, t, n) {
                throw this.makeError(e, t, n)
            }
            throwArgumentError(e, t, n) {
                return this.throwError(e, r.errors.INVALID_ARGUMENT, {
                    argument: t,
                    value: n
                })
            }
            assert(e, t, n, o) {
                e || this.throwError(t, n, o)
            }
            assertArgument(e, t, n, o) {
                e || this.throwArgumentError(t, n, o)
            }
            checkNormalize(e) {
                e == null && (e = "platform missing String.prototype.normalize"),
                Xy && this.throwError("platform missing String.prototype.normalize", r.errors.UNSUPPORTED_OPERATION, {
                    operation: "String.prototype.normalize",
                    form: Xy
                })
            }
            checkSafeUint53(e, t) {
                typeof e == "number" && (t == null && (t = "value not safe"),
                (e < 0 || e >= 9007199254740991) && this.throwError(t, r.errors.NUMERIC_FAULT, {
                    operation: "checkSafeInteger",
                    fault: "out-of-safe-range",
                    value: e
                }),
                e % 1 && this.throwError(t, r.errors.NUMERIC_FAULT, {
                    operation: "checkSafeInteger",
                    fault: "non-integer",
                    value: e
                }))
            }
            checkArgumentCount(e, t, n) {
                n ? n = ": " + n : n = "",
                e < t && this.throwError("missing argument" + n, r.errors.MISSING_ARGUMENT, {
                    count: e,
                    expectedCount: t
                }),
                e > t && this.throwError("too many arguments" + n, r.errors.UNEXPECTED_ARGUMENT, {
                    count: e,
                    expectedCount: t
                })
            }
            checkNew(e, t) {
                (e === Object || e == null) && this.throwError("missing new", r.errors.MISSING_NEW, {
                    name: t.name
                })
            }
            checkAbstract(e, t) {
                e === t ? this.throwError("cannot instantiate abstract class " + JSON.stringify(t.name) + " directly; use a sub-class", r.errors.UNSUPPORTED_OPERATION, {
                    name: e.name,
                    operation: "new"
                }) : (e === Object || e == null) && this.throwError("missing new", r.errors.MISSING_NEW, {
                    name: t.name
                })
            }
            static globalLogger() {
                return Yp || (Yp = new r(Gy)),
                Yp
            }
            static setCensorship(e, t) {
                if (!e && t && this.globalLogger().throwError("cannot permanently disable censorship", r.errors.UNSUPPORTED_OPERATION, {
                    operation: "setCensorship"
                }),
                Yy) {
                    if (!e)
                        return;
                    this.globalLogger().throwError("error censorship permanent", r.errors.UNSUPPORTED_OPERATION, {
                        operation: "setCensorship"
                    })
                }
                $y = !!e,
                Yy = !!t
            }
            static setLogLevel(e) {
                let t = Ka[e.toLowerCase()];
                if (t == null) {
                    r.globalLogger().warn("invalid log level - " + e);
                    return
                }
                Jy = t
            }
            static from(e) {
                return new r(e)
            }
        }
        ;
        nn.errors = Fr;
        nn.levels = $p
    }
    );
    var em, tm = C( () => {
        h();
        em = "bytes/5.7.0"
    }
    );
    function qR(r) {
        return !!r.toHexString
    }
    function Va(r) {
        return r.slice || (r.slice = function() {
            let e = Array.prototype.slice.call(arguments);
            return Va(new Uint8Array(Array.prototype.slice.apply(r, e)))
        }
        ),
        r
    }
    function rm(r) {
        return typeof r == "number" && r == r && r % 1 === 0
    }
    function UR(r) {
        if (r == null)
            return !1;
        if (r.constructor === Uint8Array)
            return !0;
        if (typeof r == "string" || !rm(r.length) || r.length < 0)
            return !1;
        for (let e = 0; e < r.length; e++) {
            let t = r[e];
            if (!rm(t) || t < 0 || t >= 256)
                return !1
        }
        return !0
    }
    function Ga(r, e) {
        if (e || (e = {}),
        typeof r == "number") {
            Jp.checkSafeUint53(r, "invalid arrayify value");
            let t = [];
            for (; r; )
                t.unshift(r & 255),
                r = parseInt(String(r / 256));
            return t.length === 0 && t.push(0),
            Va(new Uint8Array(t))
        }
        if (e.allowMissingPrefix && typeof r == "string" && r.substring(0, 2) !== "0x" && (r = "0x" + r),
        qR(r) && (r = r.toHexString()),
        Xp(r)) {
            let t = r.substring(2);
            t.length % 2 && (e.hexPad === "left" ? t = "0" + t : e.hexPad === "right" ? t += "0" : Jp.throwArgumentError("hex data is odd-length", "value", r));
            let n = [];
            for (let o = 0; o < t.length; o += 2)
                n.push(parseInt(t.substring(o, o + 2), 16));
            return Va(new Uint8Array(n))
        }
        return UR(r) ? Va(new Uint8Array(r)) : Jp.throwArgumentError("invalid arrayify value", "value", r)
    }
    function Xp(r, e) {
        return !(typeof r != "string" || !r.match(/^0x[0-9A-Fa-f]*$/) || e && r.length !== 2 + 2 * e)
    }
    var Jp, Qp = C( () => {
        "use strict";
        h();
        Wa();
        tm();
        Jp = new nn(em)
    }
    );
    var nm = _e( () => {
        h()
    }
    );
    var Za = _e( (om, ef) => {
        h();
        (function(r, e) {
            "use strict";
            function t(m, c) {
                if (!m)
                    throw new Error(c || "Assertion failed")
            }
            function n(m, c) {
                m.super_ = c;
                var p = function() {};
                p.prototype = c.prototype,
                m.prototype = new p,
                m.prototype.constructor = m
            }
            function o(m, c, p) {
                if (o.isBN(m))
                    return m;
                this.negative = 0,
                this.words = null,
                this.length = 0,
                this.red = null,
                m !== null && ((c === "le" || c === "be") && (p = c,
                c = 10),
                this._init(m || 0, c || 10, p || "be"))
            }
            typeof r == "object" ? r.exports = o : e.BN = o,
            o.BN = o,
            o.wordSize = 26;
            var s;
            try {
                typeof window < "u" && typeof window.Buffer < "u" ? s = window.Buffer : s = nm().Buffer
            } catch {}
            o.isBN = function(c) {
                return c instanceof o ? !0 : c !== null && typeof c == "object" && c.constructor.wordSize === o.wordSize && Array.isArray(c.words)
            }
            ,
            o.max = function(c, p) {
                return c.cmp(p) > 0 ? c : p
            }
            ,
            o.min = function(c, p) {
                return c.cmp(p) < 0 ? c : p
            }
            ,
            o.prototype._init = function(c, p, d) {
                if (typeof c == "number")
                    return this._initNumber(c, p, d);
                if (typeof c == "object")
                    return this._initArray(c, p, d);
                p === "hex" && (p = 16),
                t(p === (p | 0) && p >= 2 && p <= 36),
                c = c.toString().replace(/\s+/g, "");
                var y = 0;
                c[0] === "-" && (y++,
                this.negative = 1),
                y < c.length && (p === 16 ? this._parseHex(c, y, d) : (this._parseBase(c, p, y),
                d === "le" && this._initArray(this.toArray(), p, d)))
            }
            ,
            o.prototype._initNumber = function(c, p, d) {
                c < 0 && (this.negative = 1,
                c = -c),
                c < 67108864 ? (this.words = [c & 67108863],
                this.length = 1) : c < 4503599627370496 ? (this.words = [c & 67108863, c / 67108864 & 67108863],
                this.length = 2) : (t(c < 9007199254740992),
                this.words = [c & 67108863, c / 67108864 & 67108863, 1],
                this.length = 3),
                d === "le" && this._initArray(this.toArray(), p, d)
            }
            ,
            o.prototype._initArray = function(c, p, d) {
                if (t(typeof c.length == "number"),
                c.length <= 0)
                    return this.words = [0],
                    this.length = 1,
                    this;
                this.length = Math.ceil(c.length / 3),
                this.words = new Array(this.length);
                for (var y = 0; y < this.length; y++)
                    this.words[y] = 0;
                var x, v, M = 0;
                if (d === "be")
                    for (y = c.length - 1,
                    x = 0; y >= 0; y -= 3)
                        v = c[y] | c[y - 1] << 8 | c[y - 2] << 16,
                        this.words[x] |= v << M & 67108863,
                        this.words[x + 1] = v >>> 26 - M & 67108863,
                        M += 24,
                        M >= 26 && (M -= 26,
                        x++);
                else if (d === "le")
                    for (y = 0,
                    x = 0; y < c.length; y += 3)
                        v = c[y] | c[y + 1] << 8 | c[y + 2] << 16,
                        this.words[x] |= v << M & 67108863,
                        this.words[x + 1] = v >>> 26 - M & 67108863,
                        M += 24,
                        M >= 26 && (M -= 26,
                        x++);
                return this._strip()
            }
            ;
            function i(m, c) {
                var p = m.charCodeAt(c);
                if (p >= 48 && p <= 57)
                    return p - 48;
                if (p >= 65 && p <= 70)
                    return p - 55;
                if (p >= 97 && p <= 102)
                    return p - 87;
                t(!1, "Invalid character in " + m)
            }
            function u(m, c, p) {
                var d = i(m, p);
                return p - 1 >= c && (d |= i(m, p - 1) << 4),
                d
            }
            o.prototype._parseHex = function(c, p, d) {
                this.length = Math.ceil((c.length - p) / 6),
                this.words = new Array(this.length);
                for (var y = 0; y < this.length; y++)
                    this.words[y] = 0;
                var x = 0, v = 0, M;
                if (d === "be")
                    for (y = c.length - 1; y >= p; y -= 2)
                        M = u(c, p, y) << x,
                        this.words[v] |= M & 67108863,
                        x >= 18 ? (x -= 18,
                        v += 1,
                        this.words[v] |= M >>> 26) : x += 8;
                else {
                    var S = c.length - p;
                    for (y = S % 2 === 0 ? p + 1 : p; y < c.length; y += 2)
                        M = u(c, p, y) << x,
                        this.words[v] |= M & 67108863,
                        x >= 18 ? (x -= 18,
                        v += 1,
                        this.words[v] |= M >>> 26) : x += 8
                }
                this._strip()
            }
            ;
            function f(m, c, p, d) {
                for (var y = 0, x = 0, v = Math.min(m.length, p), M = c; M < v; M++) {
                    var S = m.charCodeAt(M) - 48;
                    y *= d,
                    S >= 49 ? x = S - 49 + 10 : S >= 17 ? x = S - 17 + 10 : x = S,
                    t(S >= 0 && x < d, "Invalid character"),
                    y += x
                }
                return y
            }
            o.prototype._parseBase = function(c, p, d) {
                this.words = [0],
                this.length = 1;
                for (var y = 0, x = 1; x <= 67108863; x *= p)
                    y++;
                y--,
                x = x / p | 0;
                for (var v = c.length - d, M = v % y, S = Math.min(v, v - M) + d, l = 0, k = d; k < S; k += y)
                    l = f(c, k, k + y, p),
                    this.imuln(x),
                    this.words[0] + l < 67108864 ? this.words[0] += l : this._iaddn(l);
                if (M !== 0) {
                    var se = 1;
                    for (l = f(c, k, c.length, p),
                    k = 0; k < M; k++)
                        se *= p;
                    this.imuln(se),
                    this.words[0] + l < 67108864 ? this.words[0] += l : this._iaddn(l)
                }
                this._strip()
            }
            ,
            o.prototype.copy = function(c) {
                c.words = new Array(this.length);
                for (var p = 0; p < this.length; p++)
                    c.words[p] = this.words[p];
                c.length = this.length,
                c.negative = this.negative,
                c.red = this.red
            }
            ;
            function g(m, c) {
                m.words = c.words,
                m.length = c.length,
                m.negative = c.negative,
                m.red = c.red
            }
            if (o.prototype._move = function(c) {
                g(c, this)
            }
            ,
            o.prototype.clone = function() {
                var c = new o(null);
                return this.copy(c),
                c
            }
            ,
            o.prototype._expand = function(c) {
                for (; this.length < c; )
                    this.words[this.length++] = 0;
                return this
            }
            ,
            o.prototype._strip = function() {
                for (; this.length > 1 && this.words[this.length - 1] === 0; )
                    this.length--;
                return this._normSign()
            }
            ,
            o.prototype._normSign = function() {
                return this.length === 1 && this.words[0] === 0 && (this.negative = 0),
                this
            }
            ,
            typeof Symbol < "u" && typeof Symbol.for == "function")
                try {
                    o.prototype[Symbol.for("nodejs.util.inspect.custom")] = b
                } catch {
                    o.prototype.inspect = b
                }
            else
                o.prototype.inspect = b;
            function b() {
                return (this.red ? "<BN-R: " : "<BN: ") + this.toString(16) + ">"
            }
            var E = ["", "0", "00", "000", "0000", "00000", "000000", "0000000", "00000000", "000000000", "0000000000", "00000000000", "000000000000", "0000000000000", "00000000000000", "000000000000000", "0000000000000000", "00000000000000000", "000000000000000000", "0000000000000000000", "00000000000000000000", "000000000000000000000", "0000000000000000000000", "00000000000000000000000", "000000000000000000000000", "0000000000000000000000000"]
              , q = [0, 0, 25, 16, 12, 11, 10, 9, 8, 8, 7, 7, 7, 7, 6, 6, 6, 6, 6, 6, 6, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5]
              , O = [0, 0, 33554432, 43046721, 16777216, 48828125, 60466176, 40353607, 16777216, 43046721, 1e7, 19487171, 35831808, 62748517, 7529536, 11390625, 16777216, 24137569, 34012224, 47045881, 64e6, 4084101, 5153632, 6436343, 7962624, 9765625, 11881376, 14348907, 17210368, 20511149, 243e5, 28629151, 33554432, 39135393, 45435424, 52521875, 60466176];
            o.prototype.toString = function(c, p) {
                c = c || 10,
                p = p | 0 || 1;
                var d;
                if (c === 16 || c === "hex") {
                    d = "";
                    for (var y = 0, x = 0, v = 0; v < this.length; v++) {
                        var M = this.words[v]
                          , S = ((M << y | x) & 16777215).toString(16);
                        x = M >>> 24 - y & 16777215,
                        y += 2,
                        y >= 26 && (y -= 26,
                        v--),
                        x !== 0 || v !== this.length - 1 ? d = E[6 - S.length] + S + d : d = S + d
                    }
                    for (x !== 0 && (d = x.toString(16) + d); d.length % p !== 0; )
                        d = "0" + d;
                    return this.negative !== 0 && (d = "-" + d),
                    d
                }
                if (c === (c | 0) && c >= 2 && c <= 36) {
                    var l = q[c]
                      , k = O[c];
                    d = "";
                    var se = this.clone();
                    for (se.negative = 0; !se.isZero(); ) {
                        var w = se.modrn(k).toString(c);
                        se = se.idivn(k),
                        se.isZero() ? d = w + d : d = E[l - w.length] + w + d
                    }
                    for (this.isZero() && (d = "0" + d); d.length % p !== 0; )
                        d = "0" + d;
                    return this.negative !== 0 && (d = "-" + d),
                    d
                }
                t(!1, "Base should be between 2 and 36")
            }
            ,
            o.prototype.toNumber = function() {
                var c = this.words[0];
                return this.length === 2 ? c += this.words[1] * 67108864 : this.length === 3 && this.words[2] === 1 ? c += 4503599627370496 + this.words[1] * 67108864 : this.length > 2 && t(!1, "Number can only safely store up to 53 bits"),
                this.negative !== 0 ? -c : c
            }
            ,
            o.prototype.toJSON = function() {
                return this.toString(16, 2)
            }
            ,
            s && (o.prototype.toBuffer = function(c, p) {
                return this.toArrayLike(s, c, p)
            }
            ),
            o.prototype.toArray = function(c, p) {
                return this.toArrayLike(Array, c, p)
            }
            ;
            var Z = function(c, p) {
                return c.allocUnsafe ? c.allocUnsafe(p) : new c(p)
            };
            o.prototype.toArrayLike = function(c, p, d) {
                this._strip();
                var y = this.byteLength()
                  , x = d || Math.max(1, y);
                t(y <= x, "byte array longer than desired length"),
                t(x > 0, "Requested array length <= 0");
                var v = Z(c, x)
                  , M = p === "le" ? "LE" : "BE";
                return this["_toArrayLike" + M](v, y),
                v
            }
            ,
            o.prototype._toArrayLikeLE = function(c, p) {
                for (var d = 0, y = 0, x = 0, v = 0; x < this.length; x++) {
                    var M = this.words[x] << v | y;
                    c[d++] = M & 255,
                    d < c.length && (c[d++] = M >> 8 & 255),
                    d < c.length && (c[d++] = M >> 16 & 255),
                    v === 6 ? (d < c.length && (c[d++] = M >> 24 & 255),
                    y = 0,
                    v = 0) : (y = M >>> 24,
                    v += 2)
                }
                if (d < c.length)
                    for (c[d++] = y; d < c.length; )
                        c[d++] = 0
            }
            ,
            o.prototype._toArrayLikeBE = function(c, p) {
                for (var d = c.length - 1, y = 0, x = 0, v = 0; x < this.length; x++) {
                    var M = this.words[x] << v | y;
                    c[d--] = M & 255,
                    d >= 0 && (c[d--] = M >> 8 & 255),
                    d >= 0 && (c[d--] = M >> 16 & 255),
                    v === 6 ? (d >= 0 && (c[d--] = M >> 24 & 255),
                    y = 0,
                    v = 0) : (y = M >>> 24,
                    v += 2)
                }
                if (d >= 0)
                    for (c[d--] = y; d >= 0; )
                        c[d--] = 0
            }
            ,
            Math.clz32 ? o.prototype._countBits = function(c) {
                return 32 - Math.clz32(c)
            }
            : o.prototype._countBits = function(c) {
                var p = c
                  , d = 0;
                return p >= 4096 && (d += 13,
                p >>>= 13),
                p >= 64 && (d += 7,
                p >>>= 7),
                p >= 8 && (d += 4,
                p >>>= 4),
                p >= 2 && (d += 2,
                p >>>= 2),
                d + p
            }
            ,
            o.prototype._zeroBits = function(c) {
                if (c === 0)
                    return 26;
                var p = c
                  , d = 0;
                return p & 8191 || (d += 13,
                p >>>= 13),
                p & 127 || (d += 7,
                p >>>= 7),
                p & 15 || (d += 4,
                p >>>= 4),
                p & 3 || (d += 2,
                p >>>= 2),
                p & 1 || d++,
                d
            }
            ,
            o.prototype.bitLength = function() {
                var c = this.words[this.length - 1]
                  , p = this._countBits(c);
                return (this.length - 1) * 26 + p
            }
            ;
            function ee(m) {
                for (var c = new Array(m.bitLength()), p = 0; p < c.length; p++) {
                    var d = p / 26 | 0
                      , y = p % 26;
                    c[p] = m.words[d] >>> y & 1
                }
                return c
            }
            o.prototype.zeroBits = function() {
                if (this.isZero())
                    return 0;
                for (var c = 0, p = 0; p < this.length; p++) {
                    var d = this._zeroBits(this.words[p]);
                    if (c += d,
                    d !== 26)
                        break
                }
                return c
            }
            ,
            o.prototype.byteLength = function() {
                return Math.ceil(this.bitLength() / 8)
            }
            ,
            o.prototype.toTwos = function(c) {
                return this.negative !== 0 ? this.abs().inotn(c).iaddn(1) : this.clone()
            }
            ,
            o.prototype.fromTwos = function(c) {
                return this.testn(c - 1) ? this.notn(c).iaddn(1).ineg() : this.clone()
            }
            ,
            o.prototype.isNeg = function() {
                return this.negative !== 0
            }
            ,
            o.prototype.neg = function() {
                return this.clone().ineg()
            }
            ,
            o.prototype.ineg = function() {
                return this.isZero() || (this.negative ^= 1),
                this
            }
            ,
            o.prototype.iuor = function(c) {
                for (; this.length < c.length; )
                    this.words[this.length++] = 0;
                for (var p = 0; p < c.length; p++)
                    this.words[p] = this.words[p] | c.words[p];
                return this._strip()
            }
            ,
            o.prototype.ior = function(c) {
                return t((this.negative | c.negative) === 0),
                this.iuor(c)
            }
            ,
            o.prototype.or = function(c) {
                return this.length > c.length ? this.clone().ior(c) : c.clone().ior(this)
            }
            ,
            o.prototype.uor = function(c) {
                return this.length > c.length ? this.clone().iuor(c) : c.clone().iuor(this)
            }
            ,
            o.prototype.iuand = function(c) {
                var p;
                this.length > c.length ? p = c : p = this;
                for (var d = 0; d < p.length; d++)
                    this.words[d] = this.words[d] & c.words[d];
                return this.length = p.length,
                this._strip()
            }
            ,
            o.prototype.iand = function(c) {
                return t((this.negative | c.negative) === 0),
                this.iuand(c)
            }
            ,
            o.prototype.and = function(c) {
                return this.length > c.length ? this.clone().iand(c) : c.clone().iand(this)
            }
            ,
            o.prototype.uand = function(c) {
                return this.length > c.length ? this.clone().iuand(c) : c.clone().iuand(this)
            }
            ,
            o.prototype.iuxor = function(c) {
                var p, d;
                this.length > c.length ? (p = this,
                d = c) : (p = c,
                d = this);
                for (var y = 0; y < d.length; y++)
                    this.words[y] = p.words[y] ^ d.words[y];
                if (this !== p)
                    for (; y < p.length; y++)
                        this.words[y] = p.words[y];
                return this.length = p.length,
                this._strip()
            }
            ,
            o.prototype.ixor = function(c) {
                return t((this.negative | c.negative) === 0),
                this.iuxor(c)
            }
            ,
            o.prototype.xor = function(c) {
                return this.length > c.length ? this.clone().ixor(c) : c.clone().ixor(this)
            }
            ,
            o.prototype.uxor = function(c) {
                return this.length > c.length ? this.clone().iuxor(c) : c.clone().iuxor(this)
            }
            ,
            o.prototype.inotn = function(c) {
                t(typeof c == "number" && c >= 0);
                var p = Math.ceil(c / 26) | 0
                  , d = c % 26;
                this._expand(p),
                d > 0 && p--;
                for (var y = 0; y < p; y++)
                    this.words[y] = ~this.words[y] & 67108863;
                return d > 0 && (this.words[y] = ~this.words[y] & 67108863 >> 26 - d),
                this._strip()
            }
            ,
            o.prototype.notn = function(c) {
                return this.clone().inotn(c)
            }
            ,
            o.prototype.setn = function(c, p) {
                t(typeof c == "number" && c >= 0);
                var d = c / 26 | 0
                  , y = c % 26;
                return this._expand(d + 1),
                p ? this.words[d] = this.words[d] | 1 << y : this.words[d] = this.words[d] & ~(1 << y),
                this._strip()
            }
            ,
            o.prototype.iadd = function(c) {
                var p;
                if (this.negative !== 0 && c.negative === 0)
                    return this.negative = 0,
                    p = this.isub(c),
                    this.negative ^= 1,
                    this._normSign();
                if (this.negative === 0 && c.negative !== 0)
                    return c.negative = 0,
                    p = this.isub(c),
                    c.negative = 1,
                    p._normSign();
                var d, y;
                this.length > c.length ? (d = this,
                y = c) : (d = c,
                y = this);
                for (var x = 0, v = 0; v < y.length; v++)
                    p = (d.words[v] | 0) + (y.words[v] | 0) + x,
                    this.words[v] = p & 67108863,
                    x = p >>> 26;
                for (; x !== 0 && v < d.length; v++)
                    p = (d.words[v] | 0) + x,
                    this.words[v] = p & 67108863,
                    x = p >>> 26;
                if (this.length = d.length,
                x !== 0)
                    this.words[this.length] = x,
                    this.length++;
                else if (d !== this)
                    for (; v < d.length; v++)
                        this.words[v] = d.words[v];
                return this
            }
            ,
            o.prototype.add = function(c) {
                var p;
                return c.negative !== 0 && this.negative === 0 ? (c.negative = 0,
                p = this.sub(c),
                c.negative ^= 1,
                p) : c.negative === 0 && this.negative !== 0 ? (this.negative = 0,
                p = c.sub(this),
                this.negative = 1,
                p) : this.length > c.length ? this.clone().iadd(c) : c.clone().iadd(this)
            }
            ,
            o.prototype.isub = function(c) {
                if (c.negative !== 0) {
                    c.negative = 0;
                    var p = this.iadd(c);
                    return c.negative = 1,
                    p._normSign()
                } else if (this.negative !== 0)
                    return this.negative = 0,
                    this.iadd(c),
                    this.negative = 1,
                    this._normSign();
                var d = this.cmp(c);
                if (d === 0)
                    return this.negative = 0,
                    this.length = 1,
                    this.words[0] = 0,
                    this;
                var y, x;
                d > 0 ? (y = this,
                x = c) : (y = c,
                x = this);
                for (var v = 0, M = 0; M < x.length; M++)
                    p = (y.words[M] | 0) - (x.words[M] | 0) + v,
                    v = p >> 26,
                    this.words[M] = p & 67108863;
                for (; v !== 0 && M < y.length; M++)
                    p = (y.words[M] | 0) + v,
                    v = p >> 26,
                    this.words[M] = p & 67108863;
                if (v === 0 && M < y.length && y !== this)
                    for (; M < y.length; M++)
                        this.words[M] = y.words[M];
                return this.length = Math.max(this.length, M),
                y !== this && (this.negative = 1),
                this._strip()
            }
            ,
            o.prototype.sub = function(c) {
                return this.clone().isub(c)
            }
            ;
            function X(m, c, p) {
                p.negative = c.negative ^ m.negative;
                var d = m.length + c.length | 0;
                p.length = d,
                d = d - 1 | 0;
                var y = m.words[0] | 0
                  , x = c.words[0] | 0
                  , v = y * x
                  , M = v & 67108863
                  , S = v / 67108864 | 0;
                p.words[0] = M;
                for (var l = 1; l < d; l++) {
                    for (var k = S >>> 26, se = S & 67108863, w = Math.min(l, c.length - 1), U = Math.max(0, l - m.length + 1); U <= w; U++) {
                        var F = l - U | 0;
                        y = m.words[F] | 0,
                        x = c.words[U] | 0,
                        v = y * x + se,
                        k += v / 67108864 | 0,
                        se = v & 67108863
                    }
                    p.words[l] = se | 0,
                    S = k | 0
                }
                return S !== 0 ? p.words[l] = S | 0 : p.length--,
                p._strip()
            }
            var le = function(c, p, d) {
                var y = c.words, x = p.words, v = d.words, M = 0, S, l, k, se = y[0] | 0, w = se & 8191, U = se >>> 13, F = y[1] | 0, Q = F & 8191, oe = F >>> 13, we = y[2] | 0, ae = we & 8191, ce = we >>> 13, Ue = y[3] | 0, ue = Ue & 8191, me = Ue >>> 13, Ao = y[4] | 0, rt = Ao & 8191, nt = Ao >>> 13, ko = y[5] | 0, ot = ko & 8191, st = ko >>> 13, Io = y[6] | 0, it = Io & 8191, at = Io >>> 13, Ro = y[7] | 0, ct = Ro & 8191, ut = Ro >>> 13, Bo = y[8] | 0, pt = Bo & 8191, ft = Bo >>> 13, To = y[9] | 0, lt = To & 8191, dt = To >>> 13, Po = x[0] | 0, ht = Po & 8191, yt = Po >>> 13, zo = x[1] | 0, mt = zo & 8191, gt = zo >>> 13, Mo = x[2] | 0, xt = Mo & 8191, wt = Mo >>> 13, Lo = x[3] | 0, bt = Lo & 8191, St = Lo >>> 13, No = x[4] | 0, vt = No & 8191, Et = No >>> 13, Co = x[5] | 0, _t = Co & 8191, At = Co >>> 13, Oo = x[6] | 0, kt = Oo & 8191, It = Oo >>> 13, qo = x[7] | 0, Rt = qo & 8191, Bt = qo >>> 13, Uo = x[8] | 0, Tt = Uo & 8191, Pt = Uo >>> 13, Do = x[9] | 0, zt = Do & 8191, Mt = Do >>> 13;
                d.negative = c.negative ^ p.negative,
                d.length = 19,
                S = Math.imul(w, ht),
                l = Math.imul(w, yt),
                l = l + Math.imul(U, ht) | 0,
                k = Math.imul(U, yt);
                var Fn = (M + S | 0) + ((l & 8191) << 13) | 0;
                M = (k + (l >>> 13) | 0) + (Fn >>> 26) | 0,
                Fn &= 67108863,
                S = Math.imul(Q, ht),
                l = Math.imul(Q, yt),
                l = l + Math.imul(oe, ht) | 0,
                k = Math.imul(oe, yt),
                S = S + Math.imul(w, mt) | 0,
                l = l + Math.imul(w, gt) | 0,
                l = l + Math.imul(U, mt) | 0,
                k = k + Math.imul(U, gt) | 0;
                var jn = (M + S | 0) + ((l & 8191) << 13) | 0;
                M = (k + (l >>> 13) | 0) + (jn >>> 26) | 0,
                jn &= 67108863,
                S = Math.imul(ae, ht),
                l = Math.imul(ae, yt),
                l = l + Math.imul(ce, ht) | 0,
                k = Math.imul(ce, yt),
                S = S + Math.imul(Q, mt) | 0,
                l = l + Math.imul(Q, gt) | 0,
                l = l + Math.imul(oe, mt) | 0,
                k = k + Math.imul(oe, gt) | 0,
                S = S + Math.imul(w, xt) | 0,
                l = l + Math.imul(w, wt) | 0,
                l = l + Math.imul(U, xt) | 0,
                k = k + Math.imul(U, wt) | 0;
                var Hn = (M + S | 0) + ((l & 8191) << 13) | 0;
                M = (k + (l >>> 13) | 0) + (Hn >>> 26) | 0,
                Hn &= 67108863,
                S = Math.imul(ue, ht),
                l = Math.imul(ue, yt),
                l = l + Math.imul(me, ht) | 0,
                k = Math.imul(me, yt),
                S = S + Math.imul(ae, mt) | 0,
                l = l + Math.imul(ae, gt) | 0,
                l = l + Math.imul(ce, mt) | 0,
                k = k + Math.imul(ce, gt) | 0,
                S = S + Math.imul(Q, xt) | 0,
                l = l + Math.imul(Q, wt) | 0,
                l = l + Math.imul(oe, xt) | 0,
                k = k + Math.imul(oe, wt) | 0,
                S = S + Math.imul(w, bt) | 0,
                l = l + Math.imul(w, St) | 0,
                l = l + Math.imul(U, bt) | 0,
                k = k + Math.imul(U, St) | 0;
                var Kn = (M + S | 0) + ((l & 8191) << 13) | 0;
                M = (k + (l >>> 13) | 0) + (Kn >>> 26) | 0,
                Kn &= 67108863,
                S = Math.imul(rt, ht),
                l = Math.imul(rt, yt),
                l = l + Math.imul(nt, ht) | 0,
                k = Math.imul(nt, yt),
                S = S + Math.imul(ue, mt) | 0,
                l = l + Math.imul(ue, gt) | 0,
                l = l + Math.imul(me, mt) | 0,
                k = k + Math.imul(me, gt) | 0,
                S = S + Math.imul(ae, xt) | 0,
                l = l + Math.imul(ae, wt) | 0,
                l = l + Math.imul(ce, xt) | 0,
                k = k + Math.imul(ce, wt) | 0,
                S = S + Math.imul(Q, bt) | 0,
                l = l + Math.imul(Q, St) | 0,
                l = l + Math.imul(oe, bt) | 0,
                k = k + Math.imul(oe, St) | 0,
                S = S + Math.imul(w, vt) | 0,
                l = l + Math.imul(w, Et) | 0,
                l = l + Math.imul(U, vt) | 0,
                k = k + Math.imul(U, Et) | 0;
                var Wn = (M + S | 0) + ((l & 8191) << 13) | 0;
                M = (k + (l >>> 13) | 0) + (Wn >>> 26) | 0,
                Wn &= 67108863,
                S = Math.imul(ot, ht),
                l = Math.imul(ot, yt),
                l = l + Math.imul(st, ht) | 0,
                k = Math.imul(st, yt),
                S = S + Math.imul(rt, mt) | 0,
                l = l + Math.imul(rt, gt) | 0,
                l = l + Math.imul(nt, mt) | 0,
                k = k + Math.imul(nt, gt) | 0,
                S = S + Math.imul(ue, xt) | 0,
                l = l + Math.imul(ue, wt) | 0,
                l = l + Math.imul(me, xt) | 0,
                k = k + Math.imul(me, wt) | 0,
                S = S + Math.imul(ae, bt) | 0,
                l = l + Math.imul(ae, St) | 0,
                l = l + Math.imul(ce, bt) | 0,
                k = k + Math.imul(ce, St) | 0,
                S = S + Math.imul(Q, vt) | 0,
                l = l + Math.imul(Q, Et) | 0,
                l = l + Math.imul(oe, vt) | 0,
                k = k + Math.imul(oe, Et) | 0,
                S = S + Math.imul(w, _t) | 0,
                l = l + Math.imul(w, At) | 0,
                l = l + Math.imul(U, _t) | 0,
                k = k + Math.imul(U, At) | 0;
                var fp = (M + S | 0) + ((l & 8191) << 13) | 0;
                M = (k + (l >>> 13) | 0) + (fp >>> 26) | 0,
                fp &= 67108863,
                S = Math.imul(it, ht),
                l = Math.imul(it, yt),
                l = l + Math.imul(at, ht) | 0,
                k = Math.imul(at, yt),
                S = S + Math.imul(ot, mt) | 0,
                l = l + Math.imul(ot, gt) | 0,
                l = l + Math.imul(st, mt) | 0,
                k = k + Math.imul(st, gt) | 0,
                S = S + Math.imul(rt, xt) | 0,
                l = l + Math.imul(rt, wt) | 0,
                l = l + Math.imul(nt, xt) | 0,
                k = k + Math.imul(nt, wt) | 0,
                S = S + Math.imul(ue, bt) | 0,
                l = l + Math.imul(ue, St) | 0,
                l = l + Math.imul(me, bt) | 0,
                k = k + Math.imul(me, St) | 0,
                S = S + Math.imul(ae, vt) | 0,
                l = l + Math.imul(ae, Et) | 0,
                l = l + Math.imul(ce, vt) | 0,
                k = k + Math.imul(ce, Et) | 0,
                S = S + Math.imul(Q, _t) | 0,
                l = l + Math.imul(Q, At) | 0,
                l = l + Math.imul(oe, _t) | 0,
                k = k + Math.imul(oe, At) | 0,
                S = S + Math.imul(w, kt) | 0,
                l = l + Math.imul(w, It) | 0,
                l = l + Math.imul(U, kt) | 0,
                k = k + Math.imul(U, It) | 0;
                var lp = (M + S | 0) + ((l & 8191) << 13) | 0;
                M = (k + (l >>> 13) | 0) + (lp >>> 26) | 0,
                lp &= 67108863,
                S = Math.imul(ct, ht),
                l = Math.imul(ct, yt),
                l = l + Math.imul(ut, ht) | 0,
                k = Math.imul(ut, yt),
                S = S + Math.imul(it, mt) | 0,
                l = l + Math.imul(it, gt) | 0,
                l = l + Math.imul(at, mt) | 0,
                k = k + Math.imul(at, gt) | 0,
                S = S + Math.imul(ot, xt) | 0,
                l = l + Math.imul(ot, wt) | 0,
                l = l + Math.imul(st, xt) | 0,
                k = k + Math.imul(st, wt) | 0,
                S = S + Math.imul(rt, bt) | 0,
                l = l + Math.imul(rt, St) | 0,
                l = l + Math.imul(nt, bt) | 0,
                k = k + Math.imul(nt, St) | 0,
                S = S + Math.imul(ue, vt) | 0,
                l = l + Math.imul(ue, Et) | 0,
                l = l + Math.imul(me, vt) | 0,
                k = k + Math.imul(me, Et) | 0,
                S = S + Math.imul(ae, _t) | 0,
                l = l + Math.imul(ae, At) | 0,
                l = l + Math.imul(ce, _t) | 0,
                k = k + Math.imul(ce, At) | 0,
                S = S + Math.imul(Q, kt) | 0,
                l = l + Math.imul(Q, It) | 0,
                l = l + Math.imul(oe, kt) | 0,
                k = k + Math.imul(oe, It) | 0,
                S = S + Math.imul(w, Rt) | 0,
                l = l + Math.imul(w, Bt) | 0,
                l = l + Math.imul(U, Rt) | 0,
                k = k + Math.imul(U, Bt) | 0;
                var dp = (M + S | 0) + ((l & 8191) << 13) | 0;
                M = (k + (l >>> 13) | 0) + (dp >>> 26) | 0,
                dp &= 67108863,
                S = Math.imul(pt, ht),
                l = Math.imul(pt, yt),
                l = l + Math.imul(ft, ht) | 0,
                k = Math.imul(ft, yt),
                S = S + Math.imul(ct, mt) | 0,
                l = l + Math.imul(ct, gt) | 0,
                l = l + Math.imul(ut, mt) | 0,
                k = k + Math.imul(ut, gt) | 0,
                S = S + Math.imul(it, xt) | 0,
                l = l + Math.imul(it, wt) | 0,
                l = l + Math.imul(at, xt) | 0,
                k = k + Math.imul(at, wt) | 0,
                S = S + Math.imul(ot, bt) | 0,
                l = l + Math.imul(ot, St) | 0,
                l = l + Math.imul(st, bt) | 0,
                k = k + Math.imul(st, St) | 0,
                S = S + Math.imul(rt, vt) | 0,
                l = l + Math.imul(rt, Et) | 0,
                l = l + Math.imul(nt, vt) | 0,
                k = k + Math.imul(nt, Et) | 0,
                S = S + Math.imul(ue, _t) | 0,
                l = l + Math.imul(ue, At) | 0,
                l = l + Math.imul(me, _t) | 0,
                k = k + Math.imul(me, At) | 0,
                S = S + Math.imul(ae, kt) | 0,
                l = l + Math.imul(ae, It) | 0,
                l = l + Math.imul(ce, kt) | 0,
                k = k + Math.imul(ce, It) | 0,
                S = S + Math.imul(Q, Rt) | 0,
                l = l + Math.imul(Q, Bt) | 0,
                l = l + Math.imul(oe, Rt) | 0,
                k = k + Math.imul(oe, Bt) | 0,
                S = S + Math.imul(w, Tt) | 0,
                l = l + Math.imul(w, Pt) | 0,
                l = l + Math.imul(U, Tt) | 0,
                k = k + Math.imul(U, Pt) | 0;
                var hp = (M + S | 0) + ((l & 8191) << 13) | 0;
                M = (k + (l >>> 13) | 0) + (hp >>> 26) | 0,
                hp &= 67108863,
                S = Math.imul(lt, ht),
                l = Math.imul(lt, yt),
                l = l + Math.imul(dt, ht) | 0,
                k = Math.imul(dt, yt),
                S = S + Math.imul(pt, mt) | 0,
                l = l + Math.imul(pt, gt) | 0,
                l = l + Math.imul(ft, mt) | 0,
                k = k + Math.imul(ft, gt) | 0,
                S = S + Math.imul(ct, xt) | 0,
                l = l + Math.imul(ct, wt) | 0,
                l = l + Math.imul(ut, xt) | 0,
                k = k + Math.imul(ut, wt) | 0,
                S = S + Math.imul(it, bt) | 0,
                l = l + Math.imul(it, St) | 0,
                l = l + Math.imul(at, bt) | 0,
                k = k + Math.imul(at, St) | 0,
                S = S + Math.imul(ot, vt) | 0,
                l = l + Math.imul(ot, Et) | 0,
                l = l + Math.imul(st, vt) | 0,
                k = k + Math.imul(st, Et) | 0,
                S = S + Math.imul(rt, _t) | 0,
                l = l + Math.imul(rt, At) | 0,
                l = l + Math.imul(nt, _t) | 0,
                k = k + Math.imul(nt, At) | 0,
                S = S + Math.imul(ue, kt) | 0,
                l = l + Math.imul(ue, It) | 0,
                l = l + Math.imul(me, kt) | 0,
                k = k + Math.imul(me, It) | 0,
                S = S + Math.imul(ae, Rt) | 0,
                l = l + Math.imul(ae, Bt) | 0,
                l = l + Math.imul(ce, Rt) | 0,
                k = k + Math.imul(ce, Bt) | 0,
                S = S + Math.imul(Q, Tt) | 0,
                l = l + Math.imul(Q, Pt) | 0,
                l = l + Math.imul(oe, Tt) | 0,
                k = k + Math.imul(oe, Pt) | 0,
                S = S + Math.imul(w, zt) | 0,
                l = l + Math.imul(w, Mt) | 0,
                l = l + Math.imul(U, zt) | 0,
                k = k + Math.imul(U, Mt) | 0;
                var yp = (M + S | 0) + ((l & 8191) << 13) | 0;
                M = (k + (l >>> 13) | 0) + (yp >>> 26) | 0,
                yp &= 67108863,
                S = Math.imul(lt, mt),
                l = Math.imul(lt, gt),
                l = l + Math.imul(dt, mt) | 0,
                k = Math.imul(dt, gt),
                S = S + Math.imul(pt, xt) | 0,
                l = l + Math.imul(pt, wt) | 0,
                l = l + Math.imul(ft, xt) | 0,
                k = k + Math.imul(ft, wt) | 0,
                S = S + Math.imul(ct, bt) | 0,
                l = l + Math.imul(ct, St) | 0,
                l = l + Math.imul(ut, bt) | 0,
                k = k + Math.imul(ut, St) | 0,
                S = S + Math.imul(it, vt) | 0,
                l = l + Math.imul(it, Et) | 0,
                l = l + Math.imul(at, vt) | 0,
                k = k + Math.imul(at, Et) | 0,
                S = S + Math.imul(ot, _t) | 0,
                l = l + Math.imul(ot, At) | 0,
                l = l + Math.imul(st, _t) | 0,
                k = k + Math.imul(st, At) | 0,
                S = S + Math.imul(rt, kt) | 0,
                l = l + Math.imul(rt, It) | 0,
                l = l + Math.imul(nt, kt) | 0,
                k = k + Math.imul(nt, It) | 0,
                S = S + Math.imul(ue, Rt) | 0,
                l = l + Math.imul(ue, Bt) | 0,
                l = l + Math.imul(me, Rt) | 0,
                k = k + Math.imul(me, Bt) | 0,
                S = S + Math.imul(ae, Tt) | 0,
                l = l + Math.imul(ae, Pt) | 0,
                l = l + Math.imul(ce, Tt) | 0,
                k = k + Math.imul(ce, Pt) | 0,
                S = S + Math.imul(Q, zt) | 0,
                l = l + Math.imul(Q, Mt) | 0,
                l = l + Math.imul(oe, zt) | 0,
                k = k + Math.imul(oe, Mt) | 0;
                var mp = (M + S | 0) + ((l & 8191) << 13) | 0;
                M = (k + (l >>> 13) | 0) + (mp >>> 26) | 0,
                mp &= 67108863,
                S = Math.imul(lt, xt),
                l = Math.imul(lt, wt),
                l = l + Math.imul(dt, xt) | 0,
                k = Math.imul(dt, wt),
                S = S + Math.imul(pt, bt) | 0,
                l = l + Math.imul(pt, St) | 0,
                l = l + Math.imul(ft, bt) | 0,
                k = k + Math.imul(ft, St) | 0,
                S = S + Math.imul(ct, vt) | 0,
                l = l + Math.imul(ct, Et) | 0,
                l = l + Math.imul(ut, vt) | 0,
                k = k + Math.imul(ut, Et) | 0,
                S = S + Math.imul(it, _t) | 0,
                l = l + Math.imul(it, At) | 0,
                l = l + Math.imul(at, _t) | 0,
                k = k + Math.imul(at, At) | 0,
                S = S + Math.imul(ot, kt) | 0,
                l = l + Math.imul(ot, It) | 0,
                l = l + Math.imul(st, kt) | 0,
                k = k + Math.imul(st, It) | 0,
                S = S + Math.imul(rt, Rt) | 0,
                l = l + Math.imul(rt, Bt) | 0,
                l = l + Math.imul(nt, Rt) | 0,
                k = k + Math.imul(nt, Bt) | 0,
                S = S + Math.imul(ue, Tt) | 0,
                l = l + Math.imul(ue, Pt) | 0,
                l = l + Math.imul(me, Tt) | 0,
                k = k + Math.imul(me, Pt) | 0,
                S = S + Math.imul(ae, zt) | 0,
                l = l + Math.imul(ae, Mt) | 0,
                l = l + Math.imul(ce, zt) | 0,
                k = k + Math.imul(ce, Mt) | 0;
                var gp = (M + S | 0) + ((l & 8191) << 13) | 0;
                M = (k + (l >>> 13) | 0) + (gp >>> 26) | 0,
                gp &= 67108863,
                S = Math.imul(lt, bt),
                l = Math.imul(lt, St),
                l = l + Math.imul(dt, bt) | 0,
                k = Math.imul(dt, St),
                S = S + Math.imul(pt, vt) | 0,
                l = l + Math.imul(pt, Et) | 0,
                l = l + Math.imul(ft, vt) | 0,
                k = k + Math.imul(ft, Et) | 0,
                S = S + Math.imul(ct, _t) | 0,
                l = l + Math.imul(ct, At) | 0,
                l = l + Math.imul(ut, _t) | 0,
                k = k + Math.imul(ut, At) | 0,
                S = S + Math.imul(it, kt) | 0,
                l = l + Math.imul(it, It) | 0,
                l = l + Math.imul(at, kt) | 0,
                k = k + Math.imul(at, It) | 0,
                S = S + Math.imul(ot, Rt) | 0,
                l = l + Math.imul(ot, Bt) | 0,
                l = l + Math.imul(st, Rt) | 0,
                k = k + Math.imul(st, Bt) | 0,
                S = S + Math.imul(rt, Tt) | 0,
                l = l + Math.imul(rt, Pt) | 0,
                l = l + Math.imul(nt, Tt) | 0,
                k = k + Math.imul(nt, Pt) | 0,
                S = S + Math.imul(ue, zt) | 0,
                l = l + Math.imul(ue, Mt) | 0,
                l = l + Math.imul(me, zt) | 0,
                k = k + Math.imul(me, Mt) | 0;
                var xp = (M + S | 0) + ((l & 8191) << 13) | 0;
                M = (k + (l >>> 13) | 0) + (xp >>> 26) | 0,
                xp &= 67108863,
                S = Math.imul(lt, vt),
                l = Math.imul(lt, Et),
                l = l + Math.imul(dt, vt) | 0,
                k = Math.imul(dt, Et),
                S = S + Math.imul(pt, _t) | 0,
                l = l + Math.imul(pt, At) | 0,
                l = l + Math.imul(ft, _t) | 0,
                k = k + Math.imul(ft, At) | 0,
                S = S + Math.imul(ct, kt) | 0,
                l = l + Math.imul(ct, It) | 0,
                l = l + Math.imul(ut, kt) | 0,
                k = k + Math.imul(ut, It) | 0,
                S = S + Math.imul(it, Rt) | 0,
                l = l + Math.imul(it, Bt) | 0,
                l = l + Math.imul(at, Rt) | 0,
                k = k + Math.imul(at, Bt) | 0,
                S = S + Math.imul(ot, Tt) | 0,
                l = l + Math.imul(ot, Pt) | 0,
                l = l + Math.imul(st, Tt) | 0,
                k = k + Math.imul(st, Pt) | 0,
                S = S + Math.imul(rt, zt) | 0,
                l = l + Math.imul(rt, Mt) | 0,
                l = l + Math.imul(nt, zt) | 0,
                k = k + Math.imul(nt, Mt) | 0;
                var wp = (M + S | 0) + ((l & 8191) << 13) | 0;
                M = (k + (l >>> 13) | 0) + (wp >>> 26) | 0,
                wp &= 67108863,
                S = Math.imul(lt, _t),
                l = Math.imul(lt, At),
                l = l + Math.imul(dt, _t) | 0,
                k = Math.imul(dt, At),
                S = S + Math.imul(pt, kt) | 0,
                l = l + Math.imul(pt, It) | 0,
                l = l + Math.imul(ft, kt) | 0,
                k = k + Math.imul(ft, It) | 0,
                S = S + Math.imul(ct, Rt) | 0,
                l = l + Math.imul(ct, Bt) | 0,
                l = l + Math.imul(ut, Rt) | 0,
                k = k + Math.imul(ut, Bt) | 0,
                S = S + Math.imul(it, Tt) | 0,
                l = l + Math.imul(it, Pt) | 0,
                l = l + Math.imul(at, Tt) | 0,
                k = k + Math.imul(at, Pt) | 0,
                S = S + Math.imul(ot, zt) | 0,
                l = l + Math.imul(ot, Mt) | 0,
                l = l + Math.imul(st, zt) | 0,
                k = k + Math.imul(st, Mt) | 0;
                var bp = (M + S | 0) + ((l & 8191) << 13) | 0;
                M = (k + (l >>> 13) | 0) + (bp >>> 26) | 0,
                bp &= 67108863,
                S = Math.imul(lt, kt),
                l = Math.imul(lt, It),
                l = l + Math.imul(dt, kt) | 0,
                k = Math.imul(dt, It),
                S = S + Math.imul(pt, Rt) | 0,
                l = l + Math.imul(pt, Bt) | 0,
                l = l + Math.imul(ft, Rt) | 0,
                k = k + Math.imul(ft, Bt) | 0,
                S = S + Math.imul(ct, Tt) | 0,
                l = l + Math.imul(ct, Pt) | 0,
                l = l + Math.imul(ut, Tt) | 0,
                k = k + Math.imul(ut, Pt) | 0,
                S = S + Math.imul(it, zt) | 0,
                l = l + Math.imul(it, Mt) | 0,
                l = l + Math.imul(at, zt) | 0,
                k = k + Math.imul(at, Mt) | 0;
                var Sp = (M + S | 0) + ((l & 8191) << 13) | 0;
                M = (k + (l >>> 13) | 0) + (Sp >>> 26) | 0,
                Sp &= 67108863,
                S = Math.imul(lt, Rt),
                l = Math.imul(lt, Bt),
                l = l + Math.imul(dt, Rt) | 0,
                k = Math.imul(dt, Bt),
                S = S + Math.imul(pt, Tt) | 0,
                l = l + Math.imul(pt, Pt) | 0,
                l = l + Math.imul(ft, Tt) | 0,
                k = k + Math.imul(ft, Pt) | 0,
                S = S + Math.imul(ct, zt) | 0,
                l = l + Math.imul(ct, Mt) | 0,
                l = l + Math.imul(ut, zt) | 0,
                k = k + Math.imul(ut, Mt) | 0;
                var vp = (M + S | 0) + ((l & 8191) << 13) | 0;
                M = (k + (l >>> 13) | 0) + (vp >>> 26) | 0,
                vp &= 67108863,
                S = Math.imul(lt, Tt),
                l = Math.imul(lt, Pt),
                l = l + Math.imul(dt, Tt) | 0,
                k = Math.imul(dt, Pt),
                S = S + Math.imul(pt, zt) | 0,
                l = l + Math.imul(pt, Mt) | 0,
                l = l + Math.imul(ft, zt) | 0,
                k = k + Math.imul(ft, Mt) | 0;
                var Ep = (M + S | 0) + ((l & 8191) << 13) | 0;
                M = (k + (l >>> 13) | 0) + (Ep >>> 26) | 0,
                Ep &= 67108863,
                S = Math.imul(lt, zt),
                l = Math.imul(lt, Mt),
                l = l + Math.imul(dt, zt) | 0,
                k = Math.imul(dt, Mt);
                var _p = (M + S | 0) + ((l & 8191) << 13) | 0;
                return M = (k + (l >>> 13) | 0) + (_p >>> 26) | 0,
                _p &= 67108863,
                v[0] = Fn,
                v[1] = jn,
                v[2] = Hn,
                v[3] = Kn,
                v[4] = Wn,
                v[5] = fp,
                v[6] = lp,
                v[7] = dp,
                v[8] = hp,
                v[9] = yp,
                v[10] = mp,
                v[11] = gp,
                v[12] = xp,
                v[13] = wp,
                v[14] = bp,
                v[15] = Sp,
                v[16] = vp,
                v[17] = Ep,
                v[18] = _p,
                M !== 0 && (v[19] = M,
                d.length++),
                d
            };
            Math.imul || (le = X);
            function W(m, c, p) {
                p.negative = c.negative ^ m.negative,
                p.length = m.length + c.length;
                for (var d = 0, y = 0, x = 0; x < p.length - 1; x++) {
                    var v = y;
                    y = 0;
                    for (var M = d & 67108863, S = Math.min(x, c.length - 1), l = Math.max(0, x - m.length + 1); l <= S; l++) {
                        var k = x - l
                          , se = m.words[k] | 0
                          , w = c.words[l] | 0
                          , U = se * w
                          , F = U & 67108863;
                        v = v + (U / 67108864 | 0) | 0,
                        F = F + M | 0,
                        M = F & 67108863,
                        v = v + (F >>> 26) | 0,
                        y += v >>> 26,
                        v &= 67108863
                    }
                    p.words[x] = M,
                    d = v,
                    v = y
                }
                return d !== 0 ? p.words[x] = d : p.length--,
                p._strip()
            }
            function Se(m, c, p) {
                return W(m, c, p)
            }
            o.prototype.mulTo = function(c, p) {
                var d, y = this.length + c.length;
                return this.length === 10 && c.length === 10 ? d = le(this, c, p) : y < 63 ? d = X(this, c, p) : y < 1024 ? d = W(this, c, p) : d = Se(this, c, p),
                d
            }
            ;
            function ze(m, c) {
                this.x = m,
                this.y = c
            }
            ze.prototype.makeRBT = function(c) {
                for (var p = new Array(c), d = o.prototype._countBits(c) - 1, y = 0; y < c; y++)
                    p[y] = this.revBin(y, d, c);
                return p
            }
            ,
            ze.prototype.revBin = function(c, p, d) {
                if (c === 0 || c === d - 1)
                    return c;
                for (var y = 0, x = 0; x < p; x++)
                    y |= (c & 1) << p - x - 1,
                    c >>= 1;
                return y
            }
            ,
            ze.prototype.permute = function(c, p, d, y, x, v) {
                for (var M = 0; M < v; M++)
                    y[M] = p[c[M]],
                    x[M] = d[c[M]]
            }
            ,
            ze.prototype.transform = function(c, p, d, y, x, v) {
                this.permute(v, c, p, d, y, x);
                for (var M = 1; M < x; M <<= 1)
                    for (var S = M << 1, l = Math.cos(2 * Math.PI / S), k = Math.sin(2 * Math.PI / S), se = 0; se < x; se += S)
                        for (var w = l, U = k, F = 0; F < M; F++) {
                            var Q = d[se + F]
                              , oe = y[se + F]
                              , we = d[se + F + M]
                              , ae = y[se + F + M]
                              , ce = w * we - U * ae;
                            ae = w * ae + U * we,
                            we = ce,
                            d[se + F] = Q + we,
                            y[se + F] = oe + ae,
                            d[se + F + M] = Q - we,
                            y[se + F + M] = oe - ae,
                            F !== S && (ce = l * w - k * U,
                            U = l * U + k * w,
                            w = ce)
                        }
            }
            ,
            ze.prototype.guessLen13b = function(c, p) {
                var d = Math.max(p, c) | 1
                  , y = d & 1
                  , x = 0;
                for (d = d / 2 | 0; d; d = d >>> 1)
                    x++;
                return 1 << x + 1 + y
            }
            ,
            ze.prototype.conjugate = function(c, p, d) {
                if (!(d <= 1))
                    for (var y = 0; y < d / 2; y++) {
                        var x = c[y];
                        c[y] = c[d - y - 1],
                        c[d - y - 1] = x,
                        x = p[y],
                        p[y] = -p[d - y - 1],
                        p[d - y - 1] = -x
                    }
            }
            ,
            ze.prototype.normalize13b = function(c, p) {
                for (var d = 0, y = 0; y < p / 2; y++) {
                    var x = Math.round(c[2 * y + 1] / p) * 8192 + Math.round(c[2 * y] / p) + d;
                    c[y] = x & 67108863,
                    x < 67108864 ? d = 0 : d = x / 67108864 | 0
                }
                return c
            }
            ,
            ze.prototype.convert13b = function(c, p, d, y) {
                for (var x = 0, v = 0; v < p; v++)
                    x = x + (c[v] | 0),
                    d[2 * v] = x & 8191,
                    x = x >>> 13,
                    d[2 * v + 1] = x & 8191,
                    x = x >>> 13;
                for (v = 2 * p; v < y; ++v)
                    d[v] = 0;
                t(x === 0),
                t((x & -8192) === 0)
            }
            ,
            ze.prototype.stub = function(c) {
                for (var p = new Array(c), d = 0; d < c; d++)
                    p[d] = 0;
                return p
            }
            ,
            ze.prototype.mulp = function(c, p, d) {
                var y = 2 * this.guessLen13b(c.length, p.length)
                  , x = this.makeRBT(y)
                  , v = this.stub(y)
                  , M = new Array(y)
                  , S = new Array(y)
                  , l = new Array(y)
                  , k = new Array(y)
                  , se = new Array(y)
                  , w = new Array(y)
                  , U = d.words;
                U.length = y,
                this.convert13b(c.words, c.length, M, y),
                this.convert13b(p.words, p.length, k, y),
                this.transform(M, v, S, l, y, x),
                this.transform(k, v, se, w, y, x);
                for (var F = 0; F < y; F++) {
                    var Q = S[F] * se[F] - l[F] * w[F];
                    l[F] = S[F] * w[F] + l[F] * se[F],
                    S[F] = Q
                }
                return this.conjugate(S, l, y),
                this.transform(S, l, U, v, y, x),
                this.conjugate(U, v, y),
                this.normalize13b(U, y),
                d.negative = c.negative ^ p.negative,
                d.length = c.length + p.length,
                d._strip()
            }
            ,
            o.prototype.mul = function(c) {
                var p = new o(null);
                return p.words = new Array(this.length + c.length),
                this.mulTo(c, p)
            }
            ,
            o.prototype.mulf = function(c) {
                var p = new o(null);
                return p.words = new Array(this.length + c.length),
                Se(this, c, p)
            }
            ,
            o.prototype.imul = function(c) {
                return this.clone().mulTo(c, this)
            }
            ,
            o.prototype.imuln = function(c) {
                var p = c < 0;
                p && (c = -c),
                t(typeof c == "number"),
                t(c < 67108864);
                for (var d = 0, y = 0; y < this.length; y++) {
                    var x = (this.words[y] | 0) * c
                      , v = (x & 67108863) + (d & 67108863);
                    d >>= 26,
                    d += x / 67108864 | 0,
                    d += v >>> 26,
                    this.words[y] = v & 67108863
                }
                return d !== 0 && (this.words[y] = d,
                this.length++),
                p ? this.ineg() : this
            }
            ,
            o.prototype.muln = function(c) {
                return this.clone().imuln(c)
            }
            ,
            o.prototype.sqr = function() {
                return this.mul(this)
            }
            ,
            o.prototype.isqr = function() {
                return this.imul(this.clone())
            }
            ,
            o.prototype.pow = function(c) {
                var p = ee(c);
                if (p.length === 0)
                    return new o(1);
                for (var d = this, y = 0; y < p.length && p[y] === 0; y++,
                d = d.sqr())
                    ;
                if (++y < p.length)
                    for (var x = d.sqr(); y < p.length; y++,
                    x = x.sqr())
                        p[y] !== 0 && (d = d.mul(x));
                return d
            }
            ,
            o.prototype.iushln = function(c) {
                t(typeof c == "number" && c >= 0);
                var p = c % 26, d = (c - p) / 26, y = 67108863 >>> 26 - p << 26 - p, x;
                if (p !== 0) {
                    var v = 0;
                    for (x = 0; x < this.length; x++) {
                        var M = this.words[x] & y
                          , S = (this.words[x] | 0) - M << p;
                        this.words[x] = S | v,
                        v = M >>> 26 - p
                    }
                    v && (this.words[x] = v,
                    this.length++)
                }
                if (d !== 0) {
                    for (x = this.length - 1; x >= 0; x--)
                        this.words[x + d] = this.words[x];
                    for (x = 0; x < d; x++)
                        this.words[x] = 0;
                    this.length += d
                }
                return this._strip()
            }
            ,
            o.prototype.ishln = function(c) {
                return t(this.negative === 0),
                this.iushln(c)
            }
            ,
            o.prototype.iushrn = function(c, p, d) {
                t(typeof c == "number" && c >= 0);
                var y;
                p ? y = (p - p % 26) / 26 : y = 0;
                var x = c % 26
                  , v = Math.min((c - x) / 26, this.length)
                  , M = 67108863 ^ 67108863 >>> x << x
                  , S = d;
                if (y -= v,
                y = Math.max(0, y),
                S) {
                    for (var l = 0; l < v; l++)
                        S.words[l] = this.words[l];
                    S.length = v
                }
                if (v !== 0)
                    if (this.length > v)
                        for (this.length -= v,
                        l = 0; l < this.length; l++)
                            this.words[l] = this.words[l + v];
                    else
                        this.words[0] = 0,
                        this.length = 1;
                var k = 0;
                for (l = this.length - 1; l >= 0 && (k !== 0 || l >= y); l--) {
                    var se = this.words[l] | 0;
                    this.words[l] = k << 26 - x | se >>> x,
                    k = se & M
                }
                return S && k !== 0 && (S.words[S.length++] = k),
                this.length === 0 && (this.words[0] = 0,
                this.length = 1),
                this._strip()
            }
            ,
            o.prototype.ishrn = function(c, p, d) {
                return t(this.negative === 0),
                this.iushrn(c, p, d)
            }
            ,
            o.prototype.shln = function(c) {
                return this.clone().ishln(c)
            }
            ,
            o.prototype.ushln = function(c) {
                return this.clone().iushln(c)
            }
            ,
            o.prototype.shrn = function(c) {
                return this.clone().ishrn(c)
            }
            ,
            o.prototype.ushrn = function(c) {
                return this.clone().iushrn(c)
            }
            ,
            o.prototype.testn = function(c) {
                t(typeof c == "number" && c >= 0);
                var p = c % 26
                  , d = (c - p) / 26
                  , y = 1 << p;
                if (this.length <= d)
                    return !1;
                var x = this.words[d];
                return !!(x & y)
            }
            ,
            o.prototype.imaskn = function(c) {
                t(typeof c == "number" && c >= 0);
                var p = c % 26
                  , d = (c - p) / 26;
                if (t(this.negative === 0, "imaskn works only with positive numbers"),
                this.length <= d)
                    return this;
                if (p !== 0 && d++,
                this.length = Math.min(d, this.length),
                p !== 0) {
                    var y = 67108863 ^ 67108863 >>> p << p;
                    this.words[this.length - 1] &= y
                }
                return this._strip()
            }
            ,
            o.prototype.maskn = function(c) {
                return this.clone().imaskn(c)
            }
            ,
            o.prototype.iaddn = function(c) {
                return t(typeof c == "number"),
                t(c < 67108864),
                c < 0 ? this.isubn(-c) : this.negative !== 0 ? this.length === 1 && (this.words[0] | 0) <= c ? (this.words[0] = c - (this.words[0] | 0),
                this.negative = 0,
                this) : (this.negative = 0,
                this.isubn(c),
                this.negative = 1,
                this) : this._iaddn(c)
            }
            ,
            o.prototype._iaddn = function(c) {
                this.words[0] += c;
                for (var p = 0; p < this.length && this.words[p] >= 67108864; p++)
                    this.words[p] -= 67108864,
                    p === this.length - 1 ? this.words[p + 1] = 1 : this.words[p + 1]++;
                return this.length = Math.max(this.length, p + 1),
                this
            }
            ,
            o.prototype.isubn = function(c) {
                if (t(typeof c == "number"),
                t(c < 67108864),
                c < 0)
                    return this.iaddn(-c);
                if (this.negative !== 0)
                    return this.negative = 0,
                    this.iaddn(c),
                    this.negative = 1,
                    this;
                if (this.words[0] -= c,
                this.length === 1 && this.words[0] < 0)
                    this.words[0] = -this.words[0],
                    this.negative = 1;
                else
                    for (var p = 0; p < this.length && this.words[p] < 0; p++)
                        this.words[p] += 67108864,
                        this.words[p + 1] -= 1;
                return this._strip()
            }
            ,
            o.prototype.addn = function(c) {
                return this.clone().iaddn(c)
            }
            ,
            o.prototype.subn = function(c) {
                return this.clone().isubn(c)
            }
            ,
            o.prototype.iabs = function() {
                return this.negative = 0,
                this
            }
            ,
            o.prototype.abs = function() {
                return this.clone().iabs()
            }
            ,
            o.prototype._ishlnsubmul = function(c, p, d) {
                var y = c.length + d, x;
                this._expand(y);
                var v, M = 0;
                for (x = 0; x < c.length; x++) {
                    v = (this.words[x + d] | 0) + M;
                    var S = (c.words[x] | 0) * p;
                    v -= S & 67108863,
                    M = (v >> 26) - (S / 67108864 | 0),
                    this.words[x + d] = v & 67108863
                }
                for (; x < this.length - d; x++)
                    v = (this.words[x + d] | 0) + M,
                    M = v >> 26,
                    this.words[x + d] = v & 67108863;
                if (M === 0)
                    return this._strip();
                for (t(M === -1),
                M = 0,
                x = 0; x < this.length; x++)
                    v = -(this.words[x] | 0) + M,
                    M = v >> 26,
                    this.words[x] = v & 67108863;
                return this.negative = 1,
                this._strip()
            }
            ,
            o.prototype._wordDiv = function(c, p) {
                var d = this.length - c.length
                  , y = this.clone()
                  , x = c
                  , v = x.words[x.length - 1] | 0
                  , M = this._countBits(v);
                d = 26 - M,
                d !== 0 && (x = x.ushln(d),
                y.iushln(d),
                v = x.words[x.length - 1] | 0);
                var S = y.length - x.length, l;
                if (p !== "mod") {
                    l = new o(null),
                    l.length = S + 1,
                    l.words = new Array(l.length);
                    for (var k = 0; k < l.length; k++)
                        l.words[k] = 0
                }
                var se = y.clone()._ishlnsubmul(x, 1, S);
                se.negative === 0 && (y = se,
                l && (l.words[S] = 1));
                for (var w = S - 1; w >= 0; w--) {
                    var U = (y.words[x.length + w] | 0) * 67108864 + (y.words[x.length + w - 1] | 0);
                    for (U = Math.min(U / v | 0, 67108863),
                    y._ishlnsubmul(x, U, w); y.negative !== 0; )
                        U--,
                        y.negative = 0,
                        y._ishlnsubmul(x, 1, w),
                        y.isZero() || (y.negative ^= 1);
                    l && (l.words[w] = U)
                }
                return l && l._strip(),
                y._strip(),
                p !== "div" && d !== 0 && y.iushrn(d),
                {
                    div: l || null,
                    mod: y
                }
            }
            ,
            o.prototype.divmod = function(c, p, d) {
                if (t(!c.isZero()),
                this.isZero())
                    return {
                        div: new o(0),
                        mod: new o(0)
                    };
                var y, x, v;
                return this.negative !== 0 && c.negative === 0 ? (v = this.neg().divmod(c, p),
                p !== "mod" && (y = v.div.neg()),
                p !== "div" && (x = v.mod.neg(),
                d && x.negative !== 0 && x.iadd(c)),
                {
                    div: y,
                    mod: x
                }) : this.negative === 0 && c.negative !== 0 ? (v = this.divmod(c.neg(), p),
                p !== "mod" && (y = v.div.neg()),
                {
                    div: y,
                    mod: v.mod
                }) : this.negative & c.negative ? (v = this.neg().divmod(c.neg(), p),
                p !== "div" && (x = v.mod.neg(),
                d && x.negative !== 0 && x.isub(c)),
                {
                    div: v.div,
                    mod: x
                }) : c.length > this.length || this.cmp(c) < 0 ? {
                    div: new o(0),
                    mod: this
                } : c.length === 1 ? p === "div" ? {
                    div: this.divn(c.words[0]),
                    mod: null
                } : p === "mod" ? {
                    div: null,
                    mod: new o(this.modrn(c.words[0]))
                } : {
                    div: this.divn(c.words[0]),
                    mod: new o(this.modrn(c.words[0]))
                } : this._wordDiv(c, p)
            }
            ,
            o.prototype.div = function(c) {
                return this.divmod(c, "div", !1).div
            }
            ,
            o.prototype.mod = function(c) {
                return this.divmod(c, "mod", !1).mod
            }
            ,
            o.prototype.umod = function(c) {
                return this.divmod(c, "mod", !0).mod
            }
            ,
            o.prototype.divRound = function(c) {
                var p = this.divmod(c);
                if (p.mod.isZero())
                    return p.div;
                var d = p.div.negative !== 0 ? p.mod.isub(c) : p.mod
                  , y = c.ushrn(1)
                  , x = c.andln(1)
                  , v = d.cmp(y);
                return v < 0 || x === 1 && v === 0 ? p.div : p.div.negative !== 0 ? p.div.isubn(1) : p.div.iaddn(1)
            }
            ,
            o.prototype.modrn = function(c) {
                var p = c < 0;
                p && (c = -c),
                t(c <= 67108863);
                for (var d = (1 << 26) % c, y = 0, x = this.length - 1; x >= 0; x--)
                    y = (d * y + (this.words[x] | 0)) % c;
                return p ? -y : y
            }
            ,
            o.prototype.modn = function(c) {
                return this.modrn(c)
            }
            ,
            o.prototype.idivn = function(c) {
                var p = c < 0;
                p && (c = -c),
                t(c <= 67108863);
                for (var d = 0, y = this.length - 1; y >= 0; y--) {
                    var x = (this.words[y] | 0) + d * 67108864;
                    this.words[y] = x / c | 0,
                    d = x % c
                }
                return this._strip(),
                p ? this.ineg() : this
            }
            ,
            o.prototype.divn = function(c) {
                return this.clone().idivn(c)
            }
            ,
            o.prototype.egcd = function(c) {
                t(c.negative === 0),
                t(!c.isZero());
                var p = this
                  , d = c.clone();
                p.negative !== 0 ? p = p.umod(c) : p = p.clone();
                for (var y = new o(1), x = new o(0), v = new o(0), M = new o(1), S = 0; p.isEven() && d.isEven(); )
                    p.iushrn(1),
                    d.iushrn(1),
                    ++S;
                for (var l = d.clone(), k = p.clone(); !p.isZero(); ) {
                    for (var se = 0, w = 1; !(p.words[0] & w) && se < 26; ++se,
                    w <<= 1)
                        ;
                    if (se > 0)
                        for (p.iushrn(se); se-- > 0; )
                            (y.isOdd() || x.isOdd()) && (y.iadd(l),
                            x.isub(k)),
                            y.iushrn(1),
                            x.iushrn(1);
                    for (var U = 0, F = 1; !(d.words[0] & F) && U < 26; ++U,
                    F <<= 1)
                        ;
                    if (U > 0)
                        for (d.iushrn(U); U-- > 0; )
                            (v.isOdd() || M.isOdd()) && (v.iadd(l),
                            M.isub(k)),
                            v.iushrn(1),
                            M.iushrn(1);
                    p.cmp(d) >= 0 ? (p.isub(d),
                    y.isub(v),
                    x.isub(M)) : (d.isub(p),
                    v.isub(y),
                    M.isub(x))
                }
                return {
                    a: v,
                    b: M,
                    gcd: d.iushln(S)
                }
            }
            ,
            o.prototype._invmp = function(c) {
                t(c.negative === 0),
                t(!c.isZero());
                var p = this
                  , d = c.clone();
                p.negative !== 0 ? p = p.umod(c) : p = p.clone();
                for (var y = new o(1), x = new o(0), v = d.clone(); p.cmpn(1) > 0 && d.cmpn(1) > 0; ) {
                    for (var M = 0, S = 1; !(p.words[0] & S) && M < 26; ++M,
                    S <<= 1)
                        ;
                    if (M > 0)
                        for (p.iushrn(M); M-- > 0; )
                            y.isOdd() && y.iadd(v),
                            y.iushrn(1);
                    for (var l = 0, k = 1; !(d.words[0] & k) && l < 26; ++l,
                    k <<= 1)
                        ;
                    if (l > 0)
                        for (d.iushrn(l); l-- > 0; )
                            x.isOdd() && x.iadd(v),
                            x.iushrn(1);
                    p.cmp(d) >= 0 ? (p.isub(d),
                    y.isub(x)) : (d.isub(p),
                    x.isub(y))
                }
                var se;
                return p.cmpn(1) === 0 ? se = y : se = x,
                se.cmpn(0) < 0 && se.iadd(c),
                se
            }
            ,
            o.prototype.gcd = function(c) {
                if (this.isZero())
                    return c.abs();
                if (c.isZero())
                    return this.abs();
                var p = this.clone()
                  , d = c.clone();
                p.negative = 0,
                d.negative = 0;
                for (var y = 0; p.isEven() && d.isEven(); y++)
                    p.iushrn(1),
                    d.iushrn(1);
                do {
                    for (; p.isEven(); )
                        p.iushrn(1);
                    for (; d.isEven(); )
                        d.iushrn(1);
                    var x = p.cmp(d);
                    if (x < 0) {
                        var v = p;
                        p = d,
                        d = v
                    } else if (x === 0 || d.cmpn(1) === 0)
                        break;
                    p.isub(d)
                } while (!0);
                return d.iushln(y)
            }
            ,
            o.prototype.invm = function(c) {
                return this.egcd(c).a.umod(c)
            }
            ,
            o.prototype.isEven = function() {
                return (this.words[0] & 1) === 0
            }
            ,
            o.prototype.isOdd = function() {
                return (this.words[0] & 1) === 1
            }
            ,
            o.prototype.andln = function(c) {
                return this.words[0] & c
            }
            ,
            o.prototype.bincn = function(c) {
                t(typeof c == "number");
                var p = c % 26
                  , d = (c - p) / 26
                  , y = 1 << p;
                if (this.length <= d)
                    return this._expand(d + 1),
                    this.words[d] |= y,
                    this;
                for (var x = y, v = d; x !== 0 && v < this.length; v++) {
                    var M = this.words[v] | 0;
                    M += x,
                    x = M >>> 26,
                    M &= 67108863,
                    this.words[v] = M
                }
                return x !== 0 && (this.words[v] = x,
                this.length++),
                this
            }
            ,
            o.prototype.isZero = function() {
                return this.length === 1 && this.words[0] === 0
            }
            ,
            o.prototype.cmpn = function(c) {
                var p = c < 0;
                if (this.negative !== 0 && !p)
                    return -1;
                if (this.negative === 0 && p)
                    return 1;
                this._strip();
                var d;
                if (this.length > 1)
                    d = 1;
                else {
                    p && (c = -c),
                    t(c <= 67108863, "Number is too big");
                    var y = this.words[0] | 0;
                    d = y === c ? 0 : y < c ? -1 : 1
                }
                return this.negative !== 0 ? -d | 0 : d
            }
            ,
            o.prototype.cmp = function(c) {
                if (this.negative !== 0 && c.negative === 0)
                    return -1;
                if (this.negative === 0 && c.negative !== 0)
                    return 1;
                var p = this.ucmp(c);
                return this.negative !== 0 ? -p | 0 : p
            }
            ,
            o.prototype.ucmp = function(c) {
                if (this.length > c.length)
                    return 1;
                if (this.length < c.length)
                    return -1;
                for (var p = 0, d = this.length - 1; d >= 0; d--) {
                    var y = this.words[d] | 0
                      , x = c.words[d] | 0;
                    if (y !== x) {
                        y < x ? p = -1 : y > x && (p = 1);
                        break
                    }
                }
                return p
            }
            ,
            o.prototype.gtn = function(c) {
                return this.cmpn(c) === 1
            }
            ,
            o.prototype.gt = function(c) {
                return this.cmp(c) === 1
            }
            ,
            o.prototype.gten = function(c) {
                return this.cmpn(c) >= 0
            }
            ,
            o.prototype.gte = function(c) {
                return this.cmp(c) >= 0
            }
            ,
            o.prototype.ltn = function(c) {
                return this.cmpn(c) === -1
            }
            ,
            o.prototype.lt = function(c) {
                return this.cmp(c) === -1
            }
            ,
            o.prototype.lten = function(c) {
                return this.cmpn(c) <= 0
            }
            ,
            o.prototype.lte = function(c) {
                return this.cmp(c) <= 0
            }
            ,
            o.prototype.eqn = function(c) {
                return this.cmpn(c) === 0
            }
            ,
            o.prototype.eq = function(c) {
                return this.cmp(c) === 0
            }
            ,
            o.red = function(c) {
                return new D(c)
            }
            ,
            o.prototype.toRed = function(c) {
                return t(!this.red, "Already a number in reduction context"),
                t(this.negative === 0, "red works only with positives"),
                c.convertTo(this)._forceRed(c)
            }
            ,
            o.prototype.fromRed = function() {
                return t(this.red, "fromRed works only with numbers in reduction context"),
                this.red.convertFrom(this)
            }
            ,
            o.prototype._forceRed = function(c) {
                return this.red = c,
                this
            }
            ,
            o.prototype.forceRed = function(c) {
                return t(!this.red, "Already a number in reduction context"),
                this._forceRed(c)
            }
            ,
            o.prototype.redAdd = function(c) {
                return t(this.red, "redAdd works only with red numbers"),
                this.red.add(this, c)
            }
            ,
            o.prototype.redIAdd = function(c) {
                return t(this.red, "redIAdd works only with red numbers"),
                this.red.iadd(this, c)
            }
            ,
            o.prototype.redSub = function(c) {
                return t(this.red, "redSub works only with red numbers"),
                this.red.sub(this, c)
            }
            ,
            o.prototype.redISub = function(c) {
                return t(this.red, "redISub works only with red numbers"),
                this.red.isub(this, c)
            }
            ,
            o.prototype.redShl = function(c) {
                return t(this.red, "redShl works only with red numbers"),
                this.red.shl(this, c)
            }
            ,
            o.prototype.redMul = function(c) {
                return t(this.red, "redMul works only with red numbers"),
                this.red._verify2(this, c),
                this.red.mul(this, c)
            }
            ,
            o.prototype.redIMul = function(c) {
                return t(this.red, "redMul works only with red numbers"),
                this.red._verify2(this, c),
                this.red.imul(this, c)
            }
            ,
            o.prototype.redSqr = function() {
                return t(this.red, "redSqr works only with red numbers"),
                this.red._verify1(this),
                this.red.sqr(this)
            }
            ,
            o.prototype.redISqr = function() {
                return t(this.red, "redISqr works only with red numbers"),
                this.red._verify1(this),
                this.red.isqr(this)
            }
            ,
            o.prototype.redSqrt = function() {
                return t(this.red, "redSqrt works only with red numbers"),
                this.red._verify1(this),
                this.red.sqrt(this)
            }
            ,
            o.prototype.redInvm = function() {
                return t(this.red, "redInvm works only with red numbers"),
                this.red._verify1(this),
                this.red.invm(this)
            }
            ,
            o.prototype.redNeg = function() {
                return t(this.red, "redNeg works only with red numbers"),
                this.red._verify1(this),
                this.red.neg(this)
            }
            ,
            o.prototype.redPow = function(c) {
                return t(this.red && !c.red, "redPow(normalNum)"),
                this.red._verify1(this),
                this.red.pow(this, c)
            }
            ;
            var Oe = {
                k256: null,
                p224: null,
                p192: null,
                p25519: null
            };
            function Re(m, c) {
                this.name = m,
                this.p = new o(c,16),
                this.n = this.p.bitLength(),
                this.k = new o(1).iushln(this.n).isub(this.p),
                this.tmp = this._tmp()
            }
            Re.prototype._tmp = function() {
                var c = new o(null);
                return c.words = new Array(Math.ceil(this.n / 13)),
                c
            }
            ,
            Re.prototype.ireduce = function(c) {
                var p = c, d;
                do
                    this.split(p, this.tmp),
                    p = this.imulK(p),
                    p = p.iadd(this.tmp),
                    d = p.bitLength();
                while (d > this.n);
                var y = d < this.n ? -1 : p.ucmp(this.p);
                return y === 0 ? (p.words[0] = 0,
                p.length = 1) : y > 0 ? p.isub(this.p) : p.strip !== void 0 ? p.strip() : p._strip(),
                p
            }
            ,
            Re.prototype.split = function(c, p) {
                c.iushrn(this.n, 0, p)
            }
            ,
            Re.prototype.imulK = function(c) {
                return c.imul(this.k)
            }
            ;
            function Fe() {
                Re.call(this, "k256", "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f")
            }
            n(Fe, Re),
            Fe.prototype.split = function(c, p) {
                for (var d = 4194303, y = Math.min(c.length, 9), x = 0; x < y; x++)
                    p.words[x] = c.words[x];
                if (p.length = y,
                c.length <= 9) {
                    c.words[0] = 0,
                    c.length = 1;
                    return
                }
                var v = c.words[9];
                for (p.words[p.length++] = v & d,
                x = 10; x < c.length; x++) {
                    var M = c.words[x] | 0;
                    c.words[x - 10] = (M & d) << 4 | v >>> 22,
                    v = M
                }
                v >>>= 22,
                c.words[x - 10] = v,
                v === 0 && c.length > 10 ? c.length -= 10 : c.length -= 9
            }
            ,
            Fe.prototype.imulK = function(c) {
                c.words[c.length] = 0,
                c.words[c.length + 1] = 0,
                c.length += 2;
                for (var p = 0, d = 0; d < c.length; d++) {
                    var y = c.words[d] | 0;
                    p += y * 977,
                    c.words[d] = p & 67108863,
                    p = y * 64 + (p / 67108864 | 0)
                }
                return c.words[c.length - 1] === 0 && (c.length--,
                c.words[c.length - 1] === 0 && c.length--),
                c
            }
            ;
            function _() {
                Re.call(this, "p224", "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001")
            }
            n(_, Re);
            function R() {
                Re.call(this, "p192", "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff")
            }
            n(R, Re);
            function N() {
                Re.call(this, "25519", "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed")
            }
            n(N, Re),
            N.prototype.imulK = function(c) {
                for (var p = 0, d = 0; d < c.length; d++) {
                    var y = (c.words[d] | 0) * 19 + p
                      , x = y & 67108863;
                    y >>>= 26,
                    c.words[d] = x,
                    p = y
                }
                return p !== 0 && (c.words[c.length++] = p),
                c
            }
            ,
            o._prime = function(c) {
                if (Oe[c])
                    return Oe[c];
                var p;
                if (c === "k256")
                    p = new Fe;
                else if (c === "p224")
                    p = new _;
                else if (c === "p192")
                    p = new R;
                else if (c === "p25519")
                    p = new N;
                else
                    throw new Error("Unknown prime " + c);
                return Oe[c] = p,
                p
            }
            ;
            function D(m) {
                if (typeof m == "string") {
                    var c = o._prime(m);
                    this.m = c.p,
                    this.prime = c
                } else
                    t(m.gtn(1), "modulus must be greater than 1"),
                    this.m = m,
                    this.prime = null
            }
            D.prototype._verify1 = function(c) {
                t(c.negative === 0, "red works only with positives"),
                t(c.red, "red works only with red numbers")
            }
            ,
            D.prototype._verify2 = function(c, p) {
                t((c.negative | p.negative) === 0, "red works only with positives"),
                t(c.red && c.red === p.red, "red works only with red numbers")
            }
            ,
            D.prototype.imod = function(c) {
                return this.prime ? this.prime.ireduce(c)._forceRed(this) : (g(c, c.umod(this.m)._forceRed(this)),
                c)
            }
            ,
            D.prototype.neg = function(c) {
                return c.isZero() ? c.clone() : this.m.sub(c)._forceRed(this)
            }
            ,
            D.prototype.add = function(c, p) {
                this._verify2(c, p);
                var d = c.add(p);
                return d.cmp(this.m) >= 0 && d.isub(this.m),
                d._forceRed(this)
            }
            ,
            D.prototype.iadd = function(c, p) {
                this._verify2(c, p);
                var d = c.iadd(p);
                return d.cmp(this.m) >= 0 && d.isub(this.m),
                d
            }
            ,
            D.prototype.sub = function(c, p) {
                this._verify2(c, p);
                var d = c.sub(p);
                return d.cmpn(0) < 0 && d.iadd(this.m),
                d._forceRed(this)
            }
            ,
            D.prototype.isub = function(c, p) {
                this._verify2(c, p);
                var d = c.isub(p);
                return d.cmpn(0) < 0 && d.iadd(this.m),
                d
            }
            ,
            D.prototype.shl = function(c, p) {
                return this._verify1(c),
                this.imod(c.ushln(p))
            }
            ,
            D.prototype.imul = function(c, p) {
                return this._verify2(c, p),
                this.imod(c.imul(p))
            }
            ,
            D.prototype.mul = function(c, p) {
                return this._verify2(c, p),
                this.imod(c.mul(p))
            }
            ,
            D.prototype.isqr = function(c) {
                return this.imul(c, c.clone())
            }
            ,
            D.prototype.sqr = function(c) {
                return this.mul(c, c)
            }
            ,
            D.prototype.sqrt = function(c) {
                if (c.isZero())
                    return c.clone();
                var p = this.m.andln(3);
                if (t(p % 2 === 1),
                p === 3) {
                    var d = this.m.add(new o(1)).iushrn(2);
                    return this.pow(c, d)
                }
                for (var y = this.m.subn(1), x = 0; !y.isZero() && y.andln(1) === 0; )
                    x++,
                    y.iushrn(1);
                t(!y.isZero());
                var v = new o(1).toRed(this)
                  , M = v.redNeg()
                  , S = this.m.subn(1).iushrn(1)
                  , l = this.m.bitLength();
                for (l = new o(2 * l * l).toRed(this); this.pow(l, S).cmp(M) !== 0; )
                    l.redIAdd(M);
                for (var k = this.pow(l, y), se = this.pow(c, y.addn(1).iushrn(1)), w = this.pow(c, y), U = x; w.cmp(v) !== 0; ) {
                    for (var F = w, Q = 0; F.cmp(v) !== 0; Q++)
                        F = F.redSqr();
                    t(Q < U);
                    var oe = this.pow(k, new o(1).iushln(U - Q - 1));
                    se = se.redMul(oe),
                    k = oe.redSqr(),
                    w = w.redMul(k),
                    U = Q
                }
                return se
            }
            ,
            D.prototype.invm = function(c) {
                var p = c._invmp(this.m);
                return p.negative !== 0 ? (p.negative = 0,
                this.imod(p).redNeg()) : this.imod(p)
            }
            ,
            D.prototype.pow = function(c, p) {
                if (p.isZero())
                    return new o(1).toRed(this);
                if (p.cmpn(1) === 0)
                    return c.clone();
                var d = 4
                  , y = new Array(1 << d);
                y[0] = new o(1).toRed(this),
                y[1] = c;
                for (var x = 2; x < y.length; x++)
                    y[x] = this.mul(y[x - 1], c);
                var v = y[0]
                  , M = 0
                  , S = 0
                  , l = p.bitLength() % 26;
                for (l === 0 && (l = 26),
                x = p.length - 1; x >= 0; x--) {
                    for (var k = p.words[x], se = l - 1; se >= 0; se--) {
                        var w = k >> se & 1;
                        if (v !== y[0] && (v = this.sqr(v)),
                        w === 0 && M === 0) {
                            S = 0;
                            continue
                        }
                        M <<= 1,
                        M |= w,
                        S++,
                        !(S !== d && (x !== 0 || se !== 0)) && (v = this.mul(v, y[M]),
                        S = 0,
                        M = 0)
                    }
                    l = 26
                }
                return v
            }
            ,
            D.prototype.convertTo = function(c) {
                var p = c.umod(this.m);
                return p === c ? p.clone() : p
            }
            ,
            D.prototype.convertFrom = function(c) {
                var p = c.clone();
                return p.red = null,
                p
            }
            ,
            o.mont = function(c) {
                return new z(c)
            }
            ;
            function z(m) {
                D.call(this, m),
                this.shift = this.m.bitLength(),
                this.shift % 26 !== 0 && (this.shift += 26 - this.shift % 26),
                this.r = new o(1).iushln(this.shift),
                this.r2 = this.imod(this.r.sqr()),
                this.rinv = this.r._invmp(this.m),
                this.minv = this.rinv.mul(this.r).isubn(1).div(this.m),
                this.minv = this.minv.umod(this.r),
                this.minv = this.r.sub(this.minv)
            }
            n(z, D),
            z.prototype.convertTo = function(c) {
                return this.imod(c.ushln(this.shift))
            }
            ,
            z.prototype.convertFrom = function(c) {
                var p = this.imod(c.mul(this.rinv));
                return p.red = null,
                p
            }
            ,
            z.prototype.imul = function(c, p) {
                if (c.isZero() || p.isZero())
                    return c.words[0] = 0,
                    c.length = 1,
                    c;
                var d = c.imul(p)
                  , y = d.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m)
                  , x = d.isub(y).iushrn(this.shift)
                  , v = x;
                return x.cmp(this.m) >= 0 ? v = x.isub(this.m) : x.cmpn(0) < 0 && (v = x.iadd(this.m)),
                v._forceRed(this)
            }
            ,
            z.prototype.mul = function(c, p) {
                if (c.isZero() || p.isZero())
                    return new o(0)._forceRed(this);
                var d = c.mul(p)
                  , y = d.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m)
                  , x = d.isub(y).iushrn(this.shift)
                  , v = x;
                return x.cmp(this.m) >= 0 ? v = x.isub(this.m) : x.cmpn(0) < 0 && (v = x.iadd(this.m)),
                v._forceRed(this)
            }
            ,
            z.prototype.invm = function(c) {
                var p = this.imod(c._invmp(this.m).mul(this.r2));
                return p._forceRed(this)
            }
        }
        )(typeof ef > "u" || ef, om)
    }
    );
    var sm, im = C( () => {
        h();
        sm = "bignumber/5.7.0"
    }
    );
    function tf(r) {
        return new DR(r,36).toString(16)
    }
    var am, DR, vU, cm = C( () => {
        "use strict";
        h();
        am = je(Za());
        Wa();
        im();
        DR = am.default.BN,
        vU = new nn(sm)
    }
    );
    var um = C( () => {
        h();
        cm()
    }
    );
    var pm = _e( (RU, Ya) => {
        h();
        (function() {
            "use strict";
            var r = "input is invalid type"
              , e = "finalize already called"
              , t = typeof window == "object"
              , n = t ? window : {};
            n.JS_SHA3_NO_WINDOW && (t = !1);
            var o = !t && typeof self == "object"
              , s = !n.JS_SHA3_NO_NODE_JS && typeof I == "object" && I.versions && I.versions.node;
            s ? n = global : o && (n = self);
            var i = !n.JS_SHA3_NO_COMMON_JS && typeof Ya == "object" && Ya.exports
              , u = typeof define == "function" && define.amd
              , f = !n.JS_SHA3_NO_ARRAY_BUFFER && typeof ArrayBuffer < "u"
              , g = "0123456789abcdef".split("")
              , b = [31, 7936, 2031616, 520093696]
              , E = [4, 1024, 262144, 67108864]
              , q = [1, 256, 65536, 16777216]
              , O = [6, 1536, 393216, 100663296]
              , Z = [0, 8, 16, 24]
              , ee = [1, 0, 32898, 0, 32906, 2147483648, 2147516416, 2147483648, 32907, 0, 2147483649, 0, 2147516545, 2147483648, 32777, 2147483648, 138, 0, 136, 0, 2147516425, 0, 2147483658, 0, 2147516555, 0, 139, 2147483648, 32905, 2147483648, 32771, 2147483648, 32770, 2147483648, 128, 2147483648, 32778, 0, 2147483658, 2147483648, 2147516545, 2147483648, 32896, 2147483648, 2147483649, 0, 2147516424, 2147483648]
              , X = [224, 256, 384, 512]
              , le = [128, 256]
              , W = ["hex", "buffer", "arrayBuffer", "array", "digest"]
              , Se = {
                128: 168,
                256: 136
            };
            (n.JS_SHA3_NO_NODE_JS || !Array.isArray) && (Array.isArray = function(w) {
                return Object.prototype.toString.call(w) === "[object Array]"
            }
            ),
            f && (n.JS_SHA3_NO_ARRAY_BUFFER_IS_VIEW || !ArrayBuffer.isView) && (ArrayBuffer.isView = function(w) {
                return typeof w == "object" && w.buffer && w.buffer.constructor === ArrayBuffer
            }
            );
            for (var ze = function(w, U, F) {
                return function(Q) {
                    return new l(w,U,w).update(Q)[F]()
                }
            }, Oe = function(w, U, F) {
                return function(Q, oe) {
                    return new l(w,U,oe).update(Q)[F]()
                }
            }, Re = function(w, U, F) {
                return function(Q, oe, we, ae) {
                    return c["cshake" + w].update(Q, oe, we, ae)[F]()
                }
            }, Fe = function(w, U, F) {
                return function(Q, oe, we, ae) {
                    return c["kmac" + w].update(Q, oe, we, ae)[F]()
                }
            }, _ = function(w, U, F, Q) {
                for (var oe = 0; oe < W.length; ++oe) {
                    var we = W[oe];
                    w[we] = U(F, Q, we)
                }
                return w
            }, R = function(w, U) {
                var F = ze(w, U, "hex");
                return F.create = function() {
                    return new l(w,U,w)
                }
                ,
                F.update = function(Q) {
                    return F.create().update(Q)
                }
                ,
                _(F, ze, w, U)
            }, N = function(w, U) {
                var F = Oe(w, U, "hex");
                return F.create = function(Q) {
                    return new l(w,U,Q)
                }
                ,
                F.update = function(Q, oe) {
                    return F.create(oe).update(Q)
                }
                ,
                _(F, Oe, w, U)
            }, D = function(w, U) {
                var F = Se[w]
                  , Q = Re(w, U, "hex");
                return Q.create = function(oe, we, ae) {
                    return !we && !ae ? c["shake" + w].create(oe) : new l(w,U,oe).bytepad([we, ae], F)
                }
                ,
                Q.update = function(oe, we, ae, ce) {
                    return Q.create(we, ae, ce).update(oe)
                }
                ,
                _(Q, Re, w, U)
            }, z = function(w, U) {
                var F = Se[w]
                  , Q = Fe(w, U, "hex");
                return Q.create = function(oe, we, ae) {
                    return new k(w,U,we).bytepad(["KMAC", ae], F).bytepad([oe], F)
                }
                ,
                Q.update = function(oe, we, ae, ce) {
                    return Q.create(oe, ae, ce).update(we)
                }
                ,
                _(Q, Fe, w, U)
            }, m = [{
                name: "keccak",
                padding: q,
                bits: X,
                createMethod: R
            }, {
                name: "sha3",
                padding: O,
                bits: X,
                createMethod: R
            }, {
                name: "shake",
                padding: b,
                bits: le,
                createMethod: N
            }, {
                name: "cshake",
                padding: E,
                bits: le,
                createMethod: D
            }, {
                name: "kmac",
                padding: E,
                bits: le,
                createMethod: z
            }], c = {}, p = [], d = 0; d < m.length; ++d)
                for (var y = m[d], x = y.bits, v = 0; v < x.length; ++v) {
                    var M = y.name + "_" + x[v];
                    if (p.push(M),
                    c[M] = y.createMethod(x[v], y.padding),
                    y.name !== "sha3") {
                        var S = y.name + x[v];
                        p.push(S),
                        c[S] = c[M]
                    }
                }
            function l(w, U, F) {
                this.blocks = [],
                this.s = [],
                this.padding = U,
                this.outputBits = F,
                this.reset = !0,
                this.finalized = !1,
                this.block = 0,
                this.start = 0,
                this.blockCount = 1600 - (w << 1) >> 5,
                this.byteCount = this.blockCount << 2,
                this.outputBlocks = F >> 5,
                this.extraBytes = (F & 31) >> 3;
                for (var Q = 0; Q < 50; ++Q)
                    this.s[Q] = 0
            }
            l.prototype.update = function(w) {
                if (this.finalized)
                    throw new Error(e);
                var U, F = typeof w;
                if (F !== "string") {
                    if (F === "object") {
                        if (w === null)
                            throw new Error(r);
                        if (f && w.constructor === ArrayBuffer)
                            w = new Uint8Array(w);
                        else if (!Array.isArray(w) && (!f || !ArrayBuffer.isView(w)))
                            throw new Error(r)
                    } else
                        throw new Error(r);
                    U = !0
                }
                for (var Q = this.blocks, oe = this.byteCount, we = w.length, ae = this.blockCount, ce = 0, Ue = this.s, ue, me; ce < we; ) {
                    if (this.reset)
                        for (this.reset = !1,
                        Q[0] = this.block,
                        ue = 1; ue < ae + 1; ++ue)
                            Q[ue] = 0;
                    if (U)
                        for (ue = this.start; ce < we && ue < oe; ++ce)
                            Q[ue >> 2] |= w[ce] << Z[ue++ & 3];
                    else
                        for (ue = this.start; ce < we && ue < oe; ++ce)
                            me = w.charCodeAt(ce),
                            me < 128 ? Q[ue >> 2] |= me << Z[ue++ & 3] : me < 2048 ? (Q[ue >> 2] |= (192 | me >> 6) << Z[ue++ & 3],
                            Q[ue >> 2] |= (128 | me & 63) << Z[ue++ & 3]) : me < 55296 || me >= 57344 ? (Q[ue >> 2] |= (224 | me >> 12) << Z[ue++ & 3],
                            Q[ue >> 2] |= (128 | me >> 6 & 63) << Z[ue++ & 3],
                            Q[ue >> 2] |= (128 | me & 63) << Z[ue++ & 3]) : (me = 65536 + ((me & 1023) << 10 | w.charCodeAt(++ce) & 1023),
                            Q[ue >> 2] |= (240 | me >> 18) << Z[ue++ & 3],
                            Q[ue >> 2] |= (128 | me >> 12 & 63) << Z[ue++ & 3],
                            Q[ue >> 2] |= (128 | me >> 6 & 63) << Z[ue++ & 3],
                            Q[ue >> 2] |= (128 | me & 63) << Z[ue++ & 3]);
                    if (this.lastByteIndex = ue,
                    ue >= oe) {
                        for (this.start = ue - oe,
                        this.block = Q[ae],
                        ue = 0; ue < ae; ++ue)
                            Ue[ue] ^= Q[ue];
                        se(Ue),
                        this.reset = !0
                    } else
                        this.start = ue
                }
                return this
            }
            ,
            l.prototype.encode = function(w, U) {
                var F = w & 255
                  , Q = 1
                  , oe = [F];
                for (w = w >> 8,
                F = w & 255; F > 0; )
                    oe.unshift(F),
                    w = w >> 8,
                    F = w & 255,
                    ++Q;
                return U ? oe.push(Q) : oe.unshift(Q),
                this.update(oe),
                oe.length
            }
            ,
            l.prototype.encodeString = function(w) {
                var U, F = typeof w;
                if (F !== "string") {
                    if (F === "object") {
                        if (w === null)
                            throw new Error(r);
                        if (f && w.constructor === ArrayBuffer)
                            w = new Uint8Array(w);
                        else if (!Array.isArray(w) && (!f || !ArrayBuffer.isView(w)))
                            throw new Error(r)
                    } else
                        throw new Error(r);
                    U = !0
                }
                var Q = 0
                  , oe = w.length;
                if (U)
                    Q = oe;
                else
                    for (var we = 0; we < w.length; ++we) {
                        var ae = w.charCodeAt(we);
                        ae < 128 ? Q += 1 : ae < 2048 ? Q += 2 : ae < 55296 || ae >= 57344 ? Q += 3 : (ae = 65536 + ((ae & 1023) << 10 | w.charCodeAt(++we) & 1023),
                        Q += 4)
                    }
                return Q += this.encode(Q * 8),
                this.update(w),
                Q
            }
            ,
            l.prototype.bytepad = function(w, U) {
                for (var F = this.encode(U), Q = 0; Q < w.length; ++Q)
                    F += this.encodeString(w[Q]);
                var oe = U - F % U
                  , we = [];
                return we.length = oe,
                this.update(we),
                this
            }
            ,
            l.prototype.finalize = function() {
                if (!this.finalized) {
                    this.finalized = !0;
                    var w = this.blocks
                      , U = this.lastByteIndex
                      , F = this.blockCount
                      , Q = this.s;
                    if (w[U >> 2] |= this.padding[U & 3],
                    this.lastByteIndex === this.byteCount)
                        for (w[0] = w[F],
                        U = 1; U < F + 1; ++U)
                            w[U] = 0;
                    for (w[F - 1] |= 2147483648,
                    U = 0; U < F; ++U)
                        Q[U] ^= w[U];
                    se(Q)
                }
            }
            ,
            l.prototype.toString = l.prototype.hex = function() {
                this.finalize();
                for (var w = this.blockCount, U = this.s, F = this.outputBlocks, Q = this.extraBytes, oe = 0, we = 0, ae = "", ce; we < F; ) {
                    for (oe = 0; oe < w && we < F; ++oe,
                    ++we)
                        ce = U[oe],
                        ae += g[ce >> 4 & 15] + g[ce & 15] + g[ce >> 12 & 15] + g[ce >> 8 & 15] + g[ce >> 20 & 15] + g[ce >> 16 & 15] + g[ce >> 28 & 15] + g[ce >> 24 & 15];
                    we % w === 0 && (se(U),
                    oe = 0)
                }
                return Q && (ce = U[oe],
                ae += g[ce >> 4 & 15] + g[ce & 15],
                Q > 1 && (ae += g[ce >> 12 & 15] + g[ce >> 8 & 15]),
                Q > 2 && (ae += g[ce >> 20 & 15] + g[ce >> 16 & 15])),
                ae
            }
            ,
            l.prototype.arrayBuffer = function() {
                this.finalize();
                var w = this.blockCount, U = this.s, F = this.outputBlocks, Q = this.extraBytes, oe = 0, we = 0, ae = this.outputBits >> 3, ce;
                Q ? ce = new ArrayBuffer(F + 1 << 2) : ce = new ArrayBuffer(ae);
                for (var Ue = new Uint32Array(ce); we < F; ) {
                    for (oe = 0; oe < w && we < F; ++oe,
                    ++we)
                        Ue[we] = U[oe];
                    we % w === 0 && se(U)
                }
                return Q && (Ue[oe] = U[oe],
                ce = ce.slice(0, ae)),
                ce
            }
            ,
            l.prototype.buffer = l.prototype.arrayBuffer,
            l.prototype.digest = l.prototype.array = function() {
                this.finalize();
                for (var w = this.blockCount, U = this.s, F = this.outputBlocks, Q = this.extraBytes, oe = 0, we = 0, ae = [], ce, Ue; we < F; ) {
                    for (oe = 0; oe < w && we < F; ++oe,
                    ++we)
                        ce = we << 2,
                        Ue = U[oe],
                        ae[ce] = Ue & 255,
                        ae[ce + 1] = Ue >> 8 & 255,
                        ae[ce + 2] = Ue >> 16 & 255,
                        ae[ce + 3] = Ue >> 24 & 255;
                    we % w === 0 && se(U)
                }
                return Q && (ce = we << 2,
                Ue = U[oe],
                ae[ce] = Ue & 255,
                Q > 1 && (ae[ce + 1] = Ue >> 8 & 255),
                Q > 2 && (ae[ce + 2] = Ue >> 16 & 255)),
                ae
            }
            ;
            function k(w, U, F) {
                l.call(this, w, U, F)
            }
            k.prototype = new l,
            k.prototype.finalize = function() {
                return this.encode(this.outputBits, !0),
                l.prototype.finalize.call(this)
            }
            ;
            var se = function(w) {
                var U, F, Q, oe, we, ae, ce, Ue, ue, me, Ao, rt, nt, ko, ot, st, Io, it, at, Ro, ct, ut, Bo, pt, ft, To, lt, dt, Po, ht, yt, zo, mt, gt, Mo, xt, wt, Lo, bt, St, No, vt, Et, Co, _t, At, Oo, kt, It, qo, Rt, Bt, Uo, Tt, Pt, Do, zt, Mt, Fn, jn, Hn, Kn, Wn;
                for (Q = 0; Q < 48; Q += 2)
                    oe = w[0] ^ w[10] ^ w[20] ^ w[30] ^ w[40],
                    we = w[1] ^ w[11] ^ w[21] ^ w[31] ^ w[41],
                    ae = w[2] ^ w[12] ^ w[22] ^ w[32] ^ w[42],
                    ce = w[3] ^ w[13] ^ w[23] ^ w[33] ^ w[43],
                    Ue = w[4] ^ w[14] ^ w[24] ^ w[34] ^ w[44],
                    ue = w[5] ^ w[15] ^ w[25] ^ w[35] ^ w[45],
                    me = w[6] ^ w[16] ^ w[26] ^ w[36] ^ w[46],
                    Ao = w[7] ^ w[17] ^ w[27] ^ w[37] ^ w[47],
                    rt = w[8] ^ w[18] ^ w[28] ^ w[38] ^ w[48],
                    nt = w[9] ^ w[19] ^ w[29] ^ w[39] ^ w[49],
                    U = rt ^ (ae << 1 | ce >>> 31),
                    F = nt ^ (ce << 1 | ae >>> 31),
                    w[0] ^= U,
                    w[1] ^= F,
                    w[10] ^= U,
                    w[11] ^= F,
                    w[20] ^= U,
                    w[21] ^= F,
                    w[30] ^= U,
                    w[31] ^= F,
                    w[40] ^= U,
                    w[41] ^= F,
                    U = oe ^ (Ue << 1 | ue >>> 31),
                    F = we ^ (ue << 1 | Ue >>> 31),
                    w[2] ^= U,
                    w[3] ^= F,
                    w[12] ^= U,
                    w[13] ^= F,
                    w[22] ^= U,
                    w[23] ^= F,
                    w[32] ^= U,
                    w[33] ^= F,
                    w[42] ^= U,
                    w[43] ^= F,
                    U = ae ^ (me << 1 | Ao >>> 31),
                    F = ce ^ (Ao << 1 | me >>> 31),
                    w[4] ^= U,
                    w[5] ^= F,
                    w[14] ^= U,
                    w[15] ^= F,
                    w[24] ^= U,
                    w[25] ^= F,
                    w[34] ^= U,
                    w[35] ^= F,
                    w[44] ^= U,
                    w[45] ^= F,
                    U = Ue ^ (rt << 1 | nt >>> 31),
                    F = ue ^ (nt << 1 | rt >>> 31),
                    w[6] ^= U,
                    w[7] ^= F,
                    w[16] ^= U,
                    w[17] ^= F,
                    w[26] ^= U,
                    w[27] ^= F,
                    w[36] ^= U,
                    w[37] ^= F,
                    w[46] ^= U,
                    w[47] ^= F,
                    U = me ^ (oe << 1 | we >>> 31),
                    F = Ao ^ (we << 1 | oe >>> 31),
                    w[8] ^= U,
                    w[9] ^= F,
                    w[18] ^= U,
                    w[19] ^= F,
                    w[28] ^= U,
                    w[29] ^= F,
                    w[38] ^= U,
                    w[39] ^= F,
                    w[48] ^= U,
                    w[49] ^= F,
                    ko = w[0],
                    ot = w[1],
                    At = w[11] << 4 | w[10] >>> 28,
                    Oo = w[10] << 4 | w[11] >>> 28,
                    dt = w[20] << 3 | w[21] >>> 29,
                    Po = w[21] << 3 | w[20] >>> 29,
                    jn = w[31] << 9 | w[30] >>> 23,
                    Hn = w[30] << 9 | w[31] >>> 23,
                    vt = w[40] << 18 | w[41] >>> 14,
                    Et = w[41] << 18 | w[40] >>> 14,
                    gt = w[2] << 1 | w[3] >>> 31,
                    Mo = w[3] << 1 | w[2] >>> 31,
                    st = w[13] << 12 | w[12] >>> 20,
                    Io = w[12] << 12 | w[13] >>> 20,
                    kt = w[22] << 10 | w[23] >>> 22,
                    It = w[23] << 10 | w[22] >>> 22,
                    ht = w[33] << 13 | w[32] >>> 19,
                    yt = w[32] << 13 | w[33] >>> 19,
                    Kn = w[42] << 2 | w[43] >>> 30,
                    Wn = w[43] << 2 | w[42] >>> 30,
                    Tt = w[5] << 30 | w[4] >>> 2,
                    Pt = w[4] << 30 | w[5] >>> 2,
                    xt = w[14] << 6 | w[15] >>> 26,
                    wt = w[15] << 6 | w[14] >>> 26,
                    it = w[25] << 11 | w[24] >>> 21,
                    at = w[24] << 11 | w[25] >>> 21,
                    qo = w[34] << 15 | w[35] >>> 17,
                    Rt = w[35] << 15 | w[34] >>> 17,
                    zo = w[45] << 29 | w[44] >>> 3,
                    mt = w[44] << 29 | w[45] >>> 3,
                    pt = w[6] << 28 | w[7] >>> 4,
                    ft = w[7] << 28 | w[6] >>> 4,
                    Do = w[17] << 23 | w[16] >>> 9,
                    zt = w[16] << 23 | w[17] >>> 9,
                    Lo = w[26] << 25 | w[27] >>> 7,
                    bt = w[27] << 25 | w[26] >>> 7,
                    Ro = w[36] << 21 | w[37] >>> 11,
                    ct = w[37] << 21 | w[36] >>> 11,
                    Bt = w[47] << 24 | w[46] >>> 8,
                    Uo = w[46] << 24 | w[47] >>> 8,
                    Co = w[8] << 27 | w[9] >>> 5,
                    _t = w[9] << 27 | w[8] >>> 5,
                    To = w[18] << 20 | w[19] >>> 12,
                    lt = w[19] << 20 | w[18] >>> 12,
                    Mt = w[29] << 7 | w[28] >>> 25,
                    Fn = w[28] << 7 | w[29] >>> 25,
                    St = w[38] << 8 | w[39] >>> 24,
                    No = w[39] << 8 | w[38] >>> 24,
                    ut = w[48] << 14 | w[49] >>> 18,
                    Bo = w[49] << 14 | w[48] >>> 18,
                    w[0] = ko ^ ~st & it,
                    w[1] = ot ^ ~Io & at,
                    w[10] = pt ^ ~To & dt,
                    w[11] = ft ^ ~lt & Po,
                    w[20] = gt ^ ~xt & Lo,
                    w[21] = Mo ^ ~wt & bt,
                    w[30] = Co ^ ~At & kt,
                    w[31] = _t ^ ~Oo & It,
                    w[40] = Tt ^ ~Do & Mt,
                    w[41] = Pt ^ ~zt & Fn,
                    w[2] = st ^ ~it & Ro,
                    w[3] = Io ^ ~at & ct,
                    w[12] = To ^ ~dt & ht,
                    w[13] = lt ^ ~Po & yt,
                    w[22] = xt ^ ~Lo & St,
                    w[23] = wt ^ ~bt & No,
                    w[32] = At ^ ~kt & qo,
                    w[33] = Oo ^ ~It & Rt,
                    w[42] = Do ^ ~Mt & jn,
                    w[43] = zt ^ ~Fn & Hn,
                    w[4] = it ^ ~Ro & ut,
                    w[5] = at ^ ~ct & Bo,
                    w[14] = dt ^ ~ht & zo,
                    w[15] = Po ^ ~yt & mt,
                    w[24] = Lo ^ ~St & vt,
                    w[25] = bt ^ ~No & Et,
                    w[34] = kt ^ ~qo & Bt,
                    w[35] = It ^ ~Rt & Uo,
                    w[44] = Mt ^ ~jn & Kn,
                    w[45] = Fn ^ ~Hn & Wn,
                    w[6] = Ro ^ ~ut & ko,
                    w[7] = ct ^ ~Bo & ot,
                    w[16] = ht ^ ~zo & pt,
                    w[17] = yt ^ ~mt & ft,
                    w[26] = St ^ ~vt & gt,
                    w[27] = No ^ ~Et & Mo,
                    w[36] = qo ^ ~Bt & Co,
                    w[37] = Rt ^ ~Uo & _t,
                    w[46] = jn ^ ~Kn & Tt,
                    w[47] = Hn ^ ~Wn & Pt,
                    w[8] = ut ^ ~ko & st,
                    w[9] = Bo ^ ~ot & Io,
                    w[18] = zo ^ ~pt & To,
                    w[19] = mt ^ ~ft & lt,
                    w[28] = vt ^ ~gt & xt,
                    w[29] = Et ^ ~Mo & wt,
                    w[38] = Bt ^ ~Co & At,
                    w[39] = Uo ^ ~_t & Oo,
                    w[48] = Kn ^ ~Tt & Do,
                    w[49] = Wn ^ ~Pt & zt,
                    w[0] ^= ee[Q],
                    w[1] ^= ee[Q + 1]
            };
            if (i)
                Ya.exports = c;
            else {
                for (d = 0; d < p.length; ++d)
                    n[p[d]] = c[p[d]];
                u && define(function() {
                    return c
                })
            }
        }
        )()
    }
    );
    function lm(r) {
        return "0x" + fm.default.keccak_256(Ga(r))
    }
    var fm, dm = C( () => {
        "use strict";
        h();
        fm = je(pm());
        Qp()
    }
    );
    var hm, ym = C( () => {
        h();
        hm = "address/5.7.0"
    }
    );
    function mm(r) {
        Xp(r, 20) || Li.throwArgumentError("invalid address", "address", r),
        r = r.toLowerCase();
        let e = r.substring(2).split("")
          , t = new Uint8Array(40);
        for (let o = 0; o < 40; o++)
            t[o] = e[o].charCodeAt(0);
        let n = Ga(lm(t));
        for (let o = 0; o < 40; o += 2)
            n[o >> 1] >> 4 >= 8 && (e[o] = e[o].toUpperCase()),
            (n[o >> 1] & 15) >= 8 && (e[o + 1] = e[o + 1].toUpperCase());
        return "0x" + e.join("")
    }
    function HR(r) {
        return Math.log10 ? Math.log10(r) : Math.log(r) / Math.LN10
    }
    function KR(r) {
        r = r.toUpperCase(),
        r = r.substring(4) + r.substring(0, 2) + "00";
        let e = r.split("").map(n => rf[n]).join("");
        for (; e.length >= gm; ) {
            let n = e.substring(0, gm);
            e = parseInt(n, 10) % 97 + e.substring(n.length)
        }
        let t = String(98 - parseInt(e, 10) % 97);
        for (; t.length < 2; )
            t = "0" + t;
        return t
    }
    function WR(r) {
        let e = null;
        if (typeof r != "string" && Li.throwArgumentError("invalid address", "address", r),
        r.match(/^(0x)?[0-9a-fA-F]{40}$/))
            r.substring(0, 2) !== "0x" && (r = "0x" + r),
            e = mm(r),
            r.match(/([A-F].*[a-f])|([a-f].*[A-F])/) && e !== r && Li.throwArgumentError("bad address checksum", "address", r);
        else if (r.match(/^XE[0-9]{2}[0-9A-Za-z]{30,31}$/)) {
            for (r.substring(2, 4) !== KR(r) && Li.throwArgumentError("bad icap checksum", "address", r),
            e = tf(r.substring(4)); e.length < 40; )
                e = "0" + e;
            e = mm("0x" + e)
        } else
            Li.throwArgumentError("invalid address", "address", r);
        return e
    }
    function xm(r) {
        try {
            return WR(r),
            !0
        } catch {}
        return !1
    }
    var Li, jR, rf, gm, wm = C( () => {
        "use strict";
        h();
        Qp();
        um();
        dm();
        Wa();
        ym();
        Li = new nn(hm);
        jR = 9007199254740991;
        rf = {};
        for (let r = 0; r < 10; r++)
            rf[String(r)] = String(r);
        for (let r = 0; r < 26; r++)
            rf[String.fromCharCode(65 + r)] = String(10 + r);
        gm = Math.floor(HR(jR))
    }
    );
    var vm = _e( (nf, Sm) => {
        h();
        var $a = Ps()
          , on = $a.Buffer;
        function bm(r, e) {
            for (var t in r)
                e[t] = r[t]
        }
        on.from && on.alloc && on.allocUnsafe && on.allocUnsafeSlow ? Sm.exports = $a : (bm($a, nf),
        nf.Buffer = cs);
        function cs(r, e, t) {
            return on(r, e, t)
        }
        cs.prototype = Object.create(on.prototype);
        bm(on, cs);
        cs.from = function(r, e, t) {
            if (typeof r == "number")
                throw new TypeError("Argument must not be a number");
            return on(r, e, t)
        }
        ;
        cs.alloc = function(r, e, t) {
            if (typeof r != "number")
                throw new TypeError("Argument must be a number");
            var n = on(r);
            return e !== void 0 ? typeof t == "string" ? n.fill(e, t) : n.fill(e) : n.fill(0),
            n
        }
        ;
        cs.allocUnsafe = function(r) {
            if (typeof r != "number")
                throw new TypeError("Argument must be a number");
            return on(r)
        }
        ;
        cs.allocUnsafeSlow = function(r) {
            if (typeof r != "number")
                throw new TypeError("Argument must be a number");
            return $a.SlowBuffer(r)
        }
    }
    );
    var _m = _e( (ZU, Em) => {
        "use strict";
        h();
        var Ja = vm().Buffer;
        function VR(r) {
            if (r.length >= 255)
                throw new TypeError("Alphabet too long");
            for (var e = new Uint8Array(256), t = 0; t < e.length; t++)
                e[t] = 255;
            for (var n = 0; n < r.length; n++) {
                var o = r.charAt(n)
                  , s = o.charCodeAt(0);
                if (e[s] !== 255)
                    throw new TypeError(o + " is ambiguous");
                e[s] = n
            }
            var i = r.length
              , u = r.charAt(0)
              , f = Math.log(i) / Math.log(256)
              , g = Math.log(256) / Math.log(i);
            function b(O) {
                if ((Array.isArray(O) || O instanceof Uint8Array) && (O = Ja.from(O)),
                !Ja.isBuffer(O))
                    throw new TypeError("Expected Buffer");
                if (O.length === 0)
                    return "";
                for (var Z = 0, ee = 0, X = 0, le = O.length; X !== le && O[X] === 0; )
                    X++,
                    Z++;
                for (var W = (le - X) * g + 1 >>> 0, Se = new Uint8Array(W); X !== le; ) {
                    for (var ze = O[X], Oe = 0, Re = W - 1; (ze !== 0 || Oe < ee) && Re !== -1; Re--,
                    Oe++)
                        ze += 256 * Se[Re] >>> 0,
                        Se[Re] = ze % i >>> 0,
                        ze = ze / i >>> 0;
                    if (ze !== 0)
                        throw new Error("Non-zero carry");
                    ee = Oe,
                    X++
                }
                for (var Fe = W - ee; Fe !== W && Se[Fe] === 0; )
                    Fe++;
                for (var _ = u.repeat(Z); Fe < W; ++Fe)
                    _ += r.charAt(Se[Fe]);
                return _
            }
            function E(O) {
                if (typeof O != "string")
                    throw new TypeError("Expected String");
                if (O.length === 0)
                    return Ja.alloc(0);
                for (var Z = 0, ee = 0, X = 0; O[Z] === u; )
                    ee++,
                    Z++;
                for (var le = (O.length - Z) * f + 1 >>> 0, W = new Uint8Array(le); O[Z]; ) {
                    var Se = e[O.charCodeAt(Z)];
                    if (Se === 255)
                        return;
                    for (var ze = 0, Oe = le - 1; (Se !== 0 || ze < X) && Oe !== -1; Oe--,
                    ze++)
                        Se += i * W[Oe] >>> 0,
                        W[Oe] = Se % 256 >>> 0,
                        Se = Se / 256 >>> 0;
                    if (Se !== 0)
                        throw new Error("Non-zero carry");
                    X = ze,
                    Z++
                }
                for (var Re = le - X; Re !== le && W[Re] === 0; )
                    Re++;
                var Fe = Ja.allocUnsafe(ee + (le - Re));
                Fe.fill(0, 0, ee);
                for (var _ = ee; Re !== le; )
                    Fe[_++] = W[Re++];
                return Fe
            }
            function q(O) {
                var Z = E(O);
                if (Z)
                    return Z;
                throw new Error("Non-base" + i + " character")
            }
            return {
                encode: b,
                decodeUnsafe: E,
                decode: q
            }
        }
        Em.exports = VR
    }
    );
    var Jn = _e( ($U, Am) => {
        h();
        var GR = _m()
          , ZR = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
        Am.exports = GR(ZR)
    }
    );
    function JR(r) {
        return r ? $R.test(r) : !1
    }
    var km, of, Je, Y, qe, Xn, sf, af, be, ve, cf, sn, Ni, Ci, _n, Xa, Im, uf, Qa, pf, ec, Rm, Bm, Tm, Pm, zm, Mm, Lm, Nm, Cm, YR, ff, Om, An, an, lf, et, kn, Oi, qi, qm, Um, us, Dm, $R, ps, XR, fe, Ae, Fm, tc, Fs, Ui, js, rc, df, jr, fs, B, jm, nc, hf, Hs, Hm, Km, QR, e2, Wm, t2, r2, Vm, n2, o2, Gm, s2, i2, Zm, a2, c2, Ym, u2, p2, $m, f2, l2, Jm, d2, h2, y2, Xm, m2, g2, x2, Qm, w2, b2, S2, Di, oc, Ks, yf, Fi, sc, ji, ic, Pr, cn, v2, E2, e0, t0, Ws, mf, G = C( () => {
        "use strict";
        h();
        km = je(Ps());
        wm();
        of = je(Jn());
        K();
        Je = a.string().min(2, {
            message: "Must be 2 or more characters long"
        }).regex(/^0x[0-9A-Fa-f]*$/, {
            message: "String must be '0x'-prefixed and followed by valid hex characters"
        }),
        Y = a.number().transform(r => `0x${r.toString(16)}`).or(Je.min(3, {
            message: "Must be 3 or more characters long (should always have at least one digit - zero is '0x0')."
        })).refine(r => r === "0x0" ? !0 : r[2] !== "0", {
            message: "Invalid hex quantity: leading zero digits are not allowed."
        }),
        qe = Je.refine(r => r.length % 2 === 0, {
            message: "Invalid hex-encoded data: must be even number of digits"
        }),
        Xn = a.string().transform(r => {
            let e = qe.safeParse(r);
            return e.success ? e.data : `0x${km.Buffer.from(r).toString("hex")}`
        }
        ),
        sf = a.union([a.string(), a.number()]).transform( (r, e) => {
            if (typeof r == "number")
                return r;
            let t = r.startsWith("0x") ? 16 : 10
              , n = parseInt(r, t);
            return Number.isNaN(n) && e.addIssue({
                code: a.ZodIssueCode.custom,
                message: "Could not parse as LenientInteger"
            }),
            n
        }
        ),
        af = r => qe.refine(e => e.length === r * 2 + 2, {
            message: `Invalid byte length. (Expected ${r} bytes)`
        }),
        be = Je.refine(xm, {
            message: "Invalid Ethereum address."
        }),
        ve = af(32),
        cf = af(256),
        sn = a.object({
            blockHash: ve,
            address: be,
            logIndex: Y,
            data: qe,
            removed: a.boolean().optional(),
            topics: a.array(ve),
            blockNumber: Y.nullish().default(null),
            transactionIndex: Y,
            transactionHash: ve
        }),
        Ni = a.object({
            transactionHash: ve,
            transactionIndex: Y,
            blockHash: ve,
            blockNumber: Y,
            from: be,
            to: be.nullish().default(null).optional(),
            root: ve.optional(),
            status: a.literal("0x1").or(a.literal("0x0")).optional(),
            cumulativeGasUsed: Y,
            gasUsed: Y,
            contractAddress: be.nullish().default(null),
            logs: a.array(sn),
            logsBloom: cf,
            effectiveGasPrice: Y.optional(),
            type: Y.optional()
        }),
        Ci = a.object({
            from: be.optional(),
            chainId: Y.optional(),
            to: be.optional(),
            gas: Y.optional(),
            gasPrice: Y.optional(),
            value: Y.optional(),
            data: qe.optional(),
            nonce: Y.optional()
        }),
        _n = a.object({
            name: a.string(),
            type: a.string()
        }),
        Xa = a.array(_n),
        Im = a.object({
            chainId: sf.optional(),
            name: a.string(),
            verifyingContract: be,
            version: a.string().optional()
        }),
        uf = a.object({
            type: a.string(),
            name: a.string(),
            value: a.string()
        }).array(),
        Qa = a.object({
            domain: Im,
            message: a.record(a.any()),
            primaryType: a.string(),
            types: a.object({
                EIP712Domain: Xa
            }).and(a.record(_n.array()))
        }),
        pf = a.object({
            chainId: sf.optional(),
            name: a.string().optional(),
            verifyingContract: be.optional(),
            version: a.string().optional(),
            salt: a.string().optional()
        }),
        ec = a.object({
            domain: pf,
            message: a.record(a.any()),
            primaryType: a.string(),
            types: a.object({
                EIP712Domain: Xa
            }).and(a.record(_n.array()))
        }),
        Rm = a.object({
            name: a.literal("owner"),
            type: a.literal("address")
        }),
        Bm = a.object({
            name: a.literal("spender"),
            type: a.literal("address")
        }),
        Tm = a.object({
            name: a.literal("value"),
            type: a.literal("uint256")
        }),
        Pm = a.object({
            name: a.literal("value"),
            type: a.literal("uint256")
        }),
        zm = a.object({
            name: a.literal("deadline"),
            type: a.literal("uint256")
        }),
        Mm = a.tuple([_n, _n, _n, _n, _n]).refine(r => {
            let e = [Rm, Bm, Tm, Pm, zm]
              , t = new Set(["owner", "spender", "value", "nonce", "deadline"]);
            for (let n of r)
                for (let o of e) {
                    let s = o.safeParse(n);
                    s.success && t.delete(s.data.name)
                }
            return t.size === 0
        }
        ).transform( () => [{
            name: "owner",
            type: "address"
        }, {
            name: "spender",
            type: "address"
        }, {
            name: "value",
            type: "uint256"
        }, {
            name: "nonce",
            type: "uint256"
        }, {
            name: "deadline",
            type: "uint256"
        }]),
        Lm = a.literal("Permit"),
        Nm = a.object({
            EIP712Domain: Xa,
            Permit: Mm
        }),
        Cm = a.object({
            owner: be,
            spender: be,
            value: Y,
            nonce: Y,
            deadline: Y
        }),
        YR = a.object({
            domain: pf,
            primaryType: Lm,
            types: Nm,
            message: Cm
        }),
        ff = (n => (n.legacy = "0x0",
        n.eip2930 = "0x1",
        n.eip1559 = "0x2",
        n))(ff || {}),
        Om = a.tuple([be, a.array(ve)]),
        An = a.object({
            chainId: Y.optional(),
            data: qe.optional(),
            from: be,
            gas: Y.optional(),
            gasPrice: Y.optional(),
            nonce: Y.optional(),
            to: be.optional(),
            value: Y.optional(),
            type: a.nativeEnum(ff).optional(),
            accessList: a.array(Om).optional(),
            maxPriorityFeePerGas: Y.optional(),
            maxFeePerGas: Y.optional(),
            gasLimit: Y.optional()
        }).transform(r => (r.gas == null && r.gasLimit != null && (r.gas = r.gasLimit,
        delete r.gasLimit),
        r)).brand("EthUnsignedTransactionObject"),
        an = a.object({
            blockHash: ve.nullish(),
            blockNumber: Y.nullish(),
            from: be,
            gas: Y,
            gasPrice: Y.nullish(),
            hash: ve,
            input: qe,
            nonce: Y,
            to: be.nullish().default(null),
            transactionIndex: Y.nullish(),
            value: Y,
            v: Y,
            r: Y,
            s: Y
        }),
        lf = a.object({
            address: be.optional(),
            balance: Y,
            codeHash: ve,
            nonce: Y,
            storageHash: ve,
            accountProof: a.array(Je),
            storageProof: a.array(a.object({
                key: Y,
                value: Y,
                proof: a.array(Je)
            }))
        }),
        et = a.literal("latest").or(a.literal("earliest")).or(a.literal("pending")).or(a.literal("finalized")),
        kn = a.object({
            number: Y.nullish().default(null),
            hash: ve.nullish().default(null),
            parentHash: ve,
            nonce: af(8).nullish().default(null),
            sha3Uncles: ve,
            logsBloom: cf.nullish().default(null),
            transactionsRoot: ve,
            stateRoot: ve,
            receiptsRoot: ve,
            miner: be.nullish().default(null),
            mixHash: ve.optional(),
            difficulty: Y,
            totalDifficulty: Y.nullish().default(null),
            extraData: qe,
            size: Y,
            gasLimit: Y,
            gasUsed: Y,
            timestamp: Y,
            transactions: a.array(an).or(a.array(ve)),
            uncles: a.array(ve),
            baseFeePerGas: Y.optional()
        }),
        Oi = a.enum(["CONTINUE_WITH_PHANTOM", "CONTINUE_WITH_METAMASK", "ALWAYS_USE_PHANTOM", "ALWAYS_USE_METAMASK"]),
        qi = a.string().refine(r => {
            try {
                return of.default.decode(r).byteLength === 32 && r.match(/^[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]+$/)
            } catch {
                return !1
            }
        }
        , {
            message: "String must be a valid solana public key of 32 bytes"
        }),
        qm = a.union([a.literal("bip122_p2tr"), a.literal("bip122_p2wpkh"), a.literal("bip122_p2sh"), a.literal("bip122_p2pkh")]),
        Um = a.object({
            address: a.string(),
            publicKey: a.string(),
            addressType: qm
        }),
        us = Um.and(a.object({
            purpose: a.union([a.literal("payment"), a.literal("ordinals")])
        })),
        Dm = a.string().refine(r => JR(r), {
            message: "Invalid Sui address format"
        }),
        $R = /^0x[a-fA-F0-9]{64}$/;
        ps = a.object({
            address: Dm,
            publicKey: a.string()
        }),
        XR = a.string().refine(r => {
            try {
                return of.default.decode(r).byteLength === 64
            } catch {
                return !1
            }
        }
        , {
            message: "String must be a valid solana address of 64 bytes"
        }),
        fe = a.string().regex(/^[123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ]*$/),
        Ae = a.object({
            url: a.string().url(),
            icon: a.string().nullish().default(null)
        }),
        Fm = a.array(a.any()),
        tc = a.unknown().transform( (r, e) => typeof r == "object" && r !== null ? r : (e.addIssue({
            code: a.ZodIssueCode.custom,
            message: "Not an object"
        }),
        a.NEVER)),
        Fs = a.union([a.null(), a.string(), a.number(), a.boolean(), Fm, tc]),
        Ui = a.literal("2.0"),
        js = a.union([a.string(), a.number(), a.null()]),
        rc = a.object({
            jsonrpc: a.literal("2.0"),
            id: js,
            method: a.string(),
            params: Fs.optional()
        }),
        df = a.array(rc),
        jr = a.object({
            jsonrpc: a.literal("2.0"),
            method: a.string(),
            params: Fs
        }),
        fs = (X => (X[X.ParseError = -32700] = "ParseError",
        X[X.InternalError = -32603] = "InternalError",
        X[X.InvalidParams = -32602] = "InvalidParams",
        X[X.MethodNotFound = -32601] = "MethodNotFound",
        X[X.InvalidRequest = -32600] = "InvalidRequest",
        X[X.RequestCancelled = -32800] = "RequestCancelled",
        X[X.TransactionRejected = -32003] = "TransactionRejected",
        X[X.ResourceUnavailable = -32002] = "ResourceUnavailable",
        X[X.InvalidInput = -32e3] = "InvalidInput",
        X[X.UserRejectedRequest = 4001] = "UserRejectedRequest",
        X[X.Unauthorized = 4100] = "Unauthorized",
        X[X.UnsupportedMethod = 4200] = "UnsupportedMethod",
        X[X.RateLimited = 4290] = "RateLimited",
        X[X.Disconnected = 4900] = "Disconnected",
        X[X.ChainDisconnected = 4901] = "ChainDisconnected",
        X[X.ExecutionReverted = 3] = "ExecutionReverted",
        X))(fs || {}),
        B = a.object({
            code: a.nativeEnum(fs).or(a.number()),
            message: a.string()
        }),
        jm = a.object({
            error: B
        }).or(a.object({
            result: Fs
        })),
        nc = a.object({
            jsonrpc: a.literal("2.0"),
            id: js
        }).and(jm),
        hf = a.array(nc),
        Hs = a.object({
            domain: a.string().optional(),
            address: a.string().optional(),
            statement: a.string().optional(),
            uri: a.string().optional(),
            version: a.string().optional(),
            chainId: a.string().optional(),
            nonce: a.string().optional(),
            issuedAt: a.string().optional(),
            expirationTime: a.string().optional(),
            notBefore: a.string().optional(),
            requestId: a.string().optional(),
            resources: a.array(a.string()).optional()
        }),
        Hm = a.literal("mainnet"),
        Km = a.literal("testnet"),
        QR = a.literal("devnet"),
        e2 = a.literal("localnet"),
        Wm = a.enum([Hm.value, Km.value, QR.value, e2.value]),
        t2 = a.literal("1"),
        r2 = a.literal("11155111"),
        Vm = a.enum([t2.value, r2.value]),
        n2 = a.literal("0x1"),
        o2 = a.literal("0xaa36a7"),
        Gm = a.enum([n2.value, o2.value]),
        s2 = a.literal("137"),
        i2 = a.literal("80002"),
        Zm = a.enum([s2.value, i2.value]),
        a2 = a.literal("0x89"),
        c2 = a.literal("0x13882"),
        Ym = a.enum([a2.value, c2.value]),
        u2 = a.literal("8453"),
        p2 = a.literal("84532"),
        $m = a.enum([u2.value, p2.value]),
        f2 = a.literal("0x2105"),
        l2 = a.literal("0x14a34"),
        Jm = a.enum([f2.value, l2.value]),
        d2 = a.literal("143"),
        h2 = a.literal("10143"),
        y2 = a.literal("41454"),
        Xm = a.enum([d2.value, h2.value, y2.value]),
        m2 = a.literal("0x8f"),
        g2 = a.literal("0x279f"),
        x2 = a.literal("0xa1ee"),
        Qm = a.enum([m2.value, g2.value, x2.value]),
        w2 = a.literal("mainnet-beta"),
        b2 = a.literal("testnet"),
        S2 = a.literal("devnet"),
        Di = fe,
        oc = fe,
        Ks = fe,
        yf = fe,
        Fi = fe,
        sc = a.string().url(),
        ji = a.string().url(),
        ic = a.enum([w2.value, b2.value, S2.value]),
        Pr = a.object({
            dapp_encryption_public_key: Di,
            nonce: Ks,
            redirect_link: ji,
            payload: yf
        }),
        cn = a.object({
            nonce: Ks,
            data: Fi
        }),
        v2 = a.object({
            name: a.string(),
            label: a.string().optional(),
            required: a.boolean().optional()
        }),
        E2 = a.object({
            message: a.string()
        }),
        e0 = a.object({
            href: a.string(),
            label: a.string(),
            parameters: a.array(v2).optional()
        }),
        t0 = a.object({
            label: a.string(),
            url: a.string()
        }),
        Ws = a.object({
            successMessage: a.string().optional(),
            failureMessage: a.string().optional(),
            pendingMessage: a.string().optional(),
            onSuccessAction: t0.optional()
        }),
        mf = a.object({
            domain: a.string(),
            name: a.string(),
            category: a.string(),
            actionUrl: a.string(),
            icon: a.string(),
            title: a.string(),
            description: a.string(),
            label: a.string(),
            disabled: a.boolean().optional(),
            links: a.object({
                actions: a.array(e0)
            }).optional(),
            error: E2.optional(),
            postAction: Ws.optional()
        })
    }
    );
    function T(r, e) {
        return a.object({
            jsonrpc: Ui,
            id: js,
            method: r,
            params: e
        })
    }
    function P(r, e) {
        return a.object({
            jsonrpc: Ui,
            id: js
        }).and(a.object({
            result: r
        }).or(a.object({
            error: e
        })))
    }
    function vr(r, e) {
        return a.object({
            jsonrpc: Ui,
            method: r,
            params: e
        })
    }
    var V = C( () => {
        "use strict";
        h();
        K();
        G()
    }
    );
    var zr, ls = C( () => {
        "use strict";
        h();
        K();
        zr = a.object({
            blinkUrl: a.string().url(),
            blinkTitle: a.string().optional()
        })
    }
    );
    var _2, A2, k2, I2, d5, h5, r0 = C( () => {
        "use strict";
        h();
        K();
        G();
        V();
        ls();
        _2 = a.literal("eth_blink_requestAccounts"),
        A2 = a.object({
            context: zr
        }),
        k2 = a.array(be),
        I2 = B,
        d5 = T(_2, A2),
        h5 = P(k2, I2)
    }
    );
    var B2, T2, P2, z2, b5, S5, n0 = C( () => {
        "use strict";
        h();
        K();
        G();
        V();
        ls();
        B2 = a.literal("eth_blink_sendTransaction"),
        T2 = a.tuple([An, a.object({
            context: zr
        })]),
        P2 = ve,
        z2 = B,
        b5 = T(B2, T2),
        S5 = P(P2, z2)
    }
    );
    var L2, N2, C2, O2, I5, R5, o0 = C( () => {
        "use strict";
        h();
        K();
        G();
        V();
        ls();
        L2 = a.literal("eth_blink_sign"),
        N2 = a.tuple([be, Xn, a.object({
            context: zr
        })]),
        C2 = qe,
        O2 = B,
        I5 = T(L2, N2),
        R5 = P(C2, O2)
    }
    );
    var s0 = C( () => {
        "use strict";
        h();
        r0();
        n0();
        o0()
    }
    );
    var cc = {};
    ie(cc, {
        error: () => c0,
        method: () => i0,
        params: () => a0,
        request: () => D2,
        response: () => F2,
        result: () => ac
    });
    var i0, a0, ac, c0, D2, F2, gf = C( () => {
        "use strict";
        h();
        K();
        G();
        V();
        i0 = a.literal("sol_connect"),
        a0 = a.object({
            onlyIfTrusted: a.optional(a.boolean())
        }),
        ac = a.object({
            publicKey: a.string()
        }),
        c0 = B,
        D2 = T(i0, a0),
        F2 = P(ac, c0)
    }
    );
    var j2, H2, K2, W2, U5, D5, u0 = C( () => {
        "use strict";
        h();
        K();
        G();
        gf();
        V();
        ls();
        j2 = a.literal("sol_blink_connect"),
        H2 = a.object({
            context: zr
        }),
        K2 = ac,
        W2 = B,
        U5 = T(j2, H2),
        D5 = P(K2, W2)
    }
    );
    var wf = {};
    ie(wf, {
        SolanaProviderEvent: () => xf,
        SolanaSendOptions: () => In
    });
    var In, xf, H5, Vs = C( () => {
        "use strict";
        h();
        K();
        In = a.optional(a.object({
            skipPreflight: a.optional(a.boolean()),
            preflightCommitment: a.optional(a.union([a.literal("processed"), a.literal("confirmed"), a.literal("finalized"), a.literal("recent"), a.literal("single"), a.literal("singleGossip"), a.literal("root"), a.literal("max")])),
            maxRetries: a.optional(a.number()),
            minContextSlot: a.optional(a.number())
        })),
        xf = (n => (n.Connect = "connect",
        n.Disconnect = "disconnect",
        n.AccountChanged = "accountChanged",
        n))(xf || {}),
        H5 = a.nativeEnum(xf)
    }
    );
    var fc = {};
    ie(fc, {
        error: () => f0,
        method: () => p0,
        params: () => uc,
        request: () => G2,
        response: () => Z2,
        result: () => pc
    });
    var p0, uc, pc, f0, G2, Z2, bf = C( () => {
        "use strict";
        h();
        K();
        G();
        V();
        Vs();
        p0 = a.literal("sol_signAndSendAllTransactions"),
        uc = a.object({
            transactions: a.array(fe),
            options: In
        }),
        pc = a.object({
            signatures: a.array(a.union([a.string(), a.null()])),
            publicKey: a.string()
        }),
        f0 = B,
        G2 = T(p0, uc),
        Z2 = P(pc, f0)
    }
    );
    var Y2, $2, J2, X2, eD, tD, l0 = C( () => {
        "use strict";
        h();
        K();
        G();
        bf();
        V();
        ls();
        Y2 = a.literal("sol_blink_signAndSendAllTransactions"),
        $2 = uc.merge(a.object({
            context: zr
        })),
        J2 = pc,
        X2 = B,
        eD = T(Y2, $2),
        tD = P(J2, X2)
    }
    );
    var dc = {};
    ie(dc, {
        error: () => y0,
        method: () => d0,
        params: () => lc,
        request: () => eB,
        response: () => tB,
        result: () => h0
    });
    var d0, lc, h0, y0, eB, tB, Sf = C( () => {
        "use strict";
        h();
        K();
        G();
        V();
        d0 = a.literal("sol_signMessage"),
        lc = a.object({
            message: fe,
            display: a.union([a.literal("utf8"), a.literal("hex")])
        }),
        h0 = a.object({
            signature: a.string(),
            publicKey: a.string()
        }),
        y0 = B,
        eB = T(d0, lc),
        tB = P(h0, y0)
    }
    );
    var rB, nB, oB, sB, fD, lD, m0 = C( () => {
        "use strict";
        h();
        K();
        G();
        Sf();
        V();
        ls();
        rB = a.literal("sol_blink_signMessage"),
        nB = lc.merge(a.object({
            context: zr
        })),
        oB = a.object({
            signature: a.string(),
            publicKey: a.string()
        }),
        sB = B,
        fD = T(rB, nB),
        lD = P(oB, sB)
    }
    );
    var g0 = C( () => {
        "use strict";
        h();
        u0();
        l0();
        m0()
    }
    );
    var vf = {};
    ie(vf, {
        error: () => S0,
        method: () => x0,
        params: () => w0,
        request: () => cB,
        response: () => uB,
        result: () => b0
    });
    var x0, w0, b0, S0, cB, uB, v0 = C( () => {
        "use strict";
        h();
        K();
        G();
        V();
        x0 = a.literal("btc_requestAccounts"),
        w0 = a.tuple([]),
        b0 = a.array(us),
        S0 = B,
        cB = T(x0, w0),
        uB = P(b0, S0)
    }
    );
    var Ef = {};
    ie(Ef, {
        error: () => k0,
        method: () => E0,
        params: () => _0,
        request: () => pB,
        response: () => fB,
        result: () => A0
    });
    var E0, _0, A0, k0, pB, fB, I0 = C( () => {
        "use strict";
        h();
        K();
        G();
        V();
        E0 = a.literal("btc_signPSBT"),
        _0 = a.tuple([a.instanceof(Uint8Array), a.object({
            inputsToSign: a.array(a.object({
                address: a.string(),
                signingIndexes: a.array(a.number()),
                sigHash: a.number().optional()
            })),
            finalize: a.boolean()
        })]),
        A0 = a.instanceof(Uint8Array),
        k0 = B,
        pB = T(E0, _0),
        fB = P(A0, k0)
    }
    );
    var _f = {};
    ie(_f, {
        error: () => P0,
        method: () => R0,
        params: () => B0,
        request: () => lB,
        response: () => dB,
        result: () => T0
    });
    var R0, B0, T0, P0, lB, dB, z0 = C( () => {
        "use strict";
        h();
        K();
        G();
        V();
        R0 = a.literal("btc_signMessage"),
        B0 = a.object({
            address: a.string(),
            message: a.instanceof(Uint8Array)
        }),
        T0 = a.object({
            signature: a.instanceof(Uint8Array),
            signedMessage: a.instanceof(Uint8Array)
        }),
        P0 = B,
        lB = T(R0, B0),
        dB = P(T0, P0)
    }
    );
    var hc = {};
    ie(hc, {
        btc_requestAccounts: () => vf,
        btc_signMessage: () => _f,
        btc_signPSBT: () => Ef
    });
    var M0 = C( () => {
        "use strict";
        h();
        v0();
        I0();
        z0()
    }
    );
    var Af = {};
    ie(Af, {
        error: () => O0,
        method: () => L0,
        params: () => N0,
        request: () => hB,
        response: () => yB,
        result: () => C0
    });
    var L0, N0, C0, O0, hB, yB, q0 = C( () => {
        "use strict";
        h();
        K();
        G();
        V();
        L0 = a.literal("eth_accounts"),
        N0 = a.tuple([]),
        C0 = a.array(be),
        O0 = B,
        hB = T(L0, N0),
        yB = P(C0, O0)
    }
    );
    var kf = {};
    ie(kf, {
        error: () => j0,
        method: () => U0,
        params: () => D0,
        request: () => mB,
        response: () => gB,
        result: () => F0
    });
    var U0, D0, F0, j0, mB, gB, H0 = C( () => {
        "use strict";
        h();
        K();
        G();
        V();
        U0 = a.literal("eth_blockNumber"),
        D0 = a.tuple([]),
        F0 = Y,
        j0 = B,
        mB = T(U0, D0),
        gB = P(F0, j0)
    }
    );
    var If = {};
    ie(If, {
        error: () => G0,
        method: () => K0,
        params: () => W0,
        request: () => xB,
        response: () => wB,
        result: () => V0
    });
    var K0, W0, V0, G0, xB, wB, Z0 = C( () => {
        "use strict";
        h();
        K();
        G();
        V();
        K0 = a.literal("eth_call"),
        W0 = a.tuple([Ci, Y.or(et)]),
        V0 = qe,
        G0 = B,
        xB = T(K0, W0),
        wB = P(V0, G0)
    }
    );
    var Rf = {};
    ie(Rf, {
        error: () => X0,
        method: () => Y0,
        params: () => $0,
        request: () => bB,
        response: () => SB,
        result: () => J0
    });
    var Y0, $0, J0, X0, bB, SB, Q0 = C( () => {
        "use strict";
        h();
        K();
        G();
        V();
        Y0 = a.literal("eth_cancelPrivateTransaction"),
        $0 = a.tuple([a.object({
            txHash: ve
        })]),
        J0 = a.boolean(),
        X0 = B,
        bB = T(Y0, $0),
        SB = P(J0, X0)
    }
    );
    var Bf = {};
    ie(Bf, {
        error: () => ng,
        method: () => eg,
        params: () => tg,
        request: () => vB,
        response: () => EB,
        result: () => rg
    });
    var eg, tg, rg, ng, vB, EB, og = C( () => {
        "use strict";
        h();
        K();
        G();
        V();
        eg = a.literal("eth_chainId"),
        tg = a.tuple([]),
        rg = Je,
        ng = B,
        vB = T(eg, tg),
        EB = P(rg, ng)
    }
    );
    var Tf = {};
    ie(Tf, {
        error: () => cg,
        method: () => sg,
        params: () => ig,
        request: () => _B,
        response: () => AB,
        result: () => ag
    });
    var sg, ig, ag, cg, _B, AB, ug = C( () => {
        "use strict";
        h();
        K();
        G();
        V();
        sg = a.literal("eth_estimateGas"),
        ig = a.tuple([Ci]),
        ag = Y,
        cg = B,
        _B = T(sg, ig),
        AB = P(ag, cg)
    }
    );
    var Pf = {};
    ie(Pf, {
        error: () => dg,
        method: () => pg,
        params: () => fg,
        request: () => kB,
        response: () => IB,
        result: () => lg
    });
    var pg, fg, lg, dg, kB, IB, hg = C( () => {
        "use strict";
        h();
        K();
        G();
        V();
        pg = a.literal("eth_feeHistory"),
        fg = a.tuple([a.number(), Y.or(et), a.array(a.number()).optional()]),
        lg = a.object({
            oldestBlock: a.number(),
            reward: a.array(a.tuple([Y, Y])).optional(),
            baseFeePerGas: a.array(Y),
            gasUsedRatio: a.array(a.number())
        }),
        dg = B,
        kB = T(pg, fg),
        IB = P(lg, dg)
    }
    );
    var zf = {};
    ie(zf, {
        error: () => xg,
        method: () => yg,
        params: () => mg,
        request: () => RB,
        response: () => BB,
        result: () => gg
    });
    var yg, mg, gg, xg, RB, BB, wg = C( () => {
        "use strict";
        h();
        K();
        G();
        V();
        yg = a.literal("eth_gasPrice"),
        mg = a.tuple([]),
        gg = Y,
        xg = B,
        RB = T(yg, mg),
        BB = P(gg, xg)
    }
    );
    var Mf = {};
    ie(Mf, {
        error: () => Eg,
        method: () => bg,
        params: () => Sg,
        request: () => TB,
        response: () => PB,
        result: () => vg
    });
    var bg, Sg, vg, Eg, TB, PB, _g = C( () => {
        "use strict";
        h();
        K();
        G();
        V();
        bg = a.literal("eth_getBalance"),
        Sg = a.tuple([be, Y.or(et)]),
        vg = Y,
        Eg = B,
        TB = T(bg, Sg),
        PB = P(vg, Eg)
    }
    );
    var Lf = {};
    ie(Lf, {
        error: () => Rg,
        method: () => Ag,
        params: () => kg,
        request: () => zB,
        response: () => MB,
        result: () => Ig
    });
    var Ag, kg, Ig, Rg, zB, MB, Bg = C( () => {
        "use strict";
        h();
        K();
        G();
        V();
        Ag = a.literal("eth_getBlockByHash"),
        kg = a.tuple([ve, a.boolean()]),
        Ig = kn,
        Rg = B,
        zB = T(Ag, kg),
        MB = P(Ig, Rg)
    }
    );
    var Nf = {};
    ie(Nf, {
        error: () => Mg,
        method: () => Tg,
        params: () => Pg,
        request: () => LB,
        response: () => NB,
        result: () => zg
    });
    var Tg, Pg, zg, Mg, LB, NB, Lg = C( () => {
        "use strict";
        h();
        K();
        G();
        V();
        Tg = a.literal("eth_getBlockByNumber"),
        Pg = a.tuple([Y.or(et), a.boolean()]),
        zg = kn,
        Mg = B,
        LB = T(Tg, Pg),
        NB = P(zg, Mg)
    }
    );
    var Cf = {};
    ie(Cf, {
        error: () => qg,
        method: () => Ng,
        params: () => Cg,
        request: () => CB,
        response: () => OB,
        result: () => Og
    });
    var Ng, Cg, Og, qg, CB, OB, Ug = C( () => {
        "use strict";
        h();
        K();
        G();
        V();
        Ng = a.literal("eth_getBlockReceipts"),
        Cg = a.tuple([ve.or(Y).or(et)]),
        Og = a.array(Ni),
        qg = B,
        CB = T(Ng, Cg),
        OB = P(Og, qg)
    }
    );
    var Of = {};
    ie(Of, {
        error: () => Hg,
        method: () => Dg,
        params: () => Fg,
        request: () => qB,
        response: () => UB,
        result: () => jg
    });
    var Dg, Fg, jg, Hg, qB, UB, Kg = C( () => {
        "use strict";
        h();
        K();
        G();
        V();
        Dg = a.literal("eth_getBlockTransactionCountByHash"),
        Fg = a.tuple([ve]),
        jg = Y,
        Hg = B,
        qB = T(Dg, Fg),
        UB = P(jg, Hg)
    }
    );
    var qf = {};
    ie(qf, {
        error: () => Zg,
        method: () => Wg,
        params: () => Vg,
        request: () => DB,
        response: () => FB,
        result: () => Gg
    });
    var Wg, Vg, Gg, Zg, DB, FB, Yg = C( () => {
        "use strict";
        h();
        K();
        G();
        V();
        Wg = a.literal("eth_getBlockTransactionCountByNumber"),
        Vg = a.tuple([Y]),
        Gg = Y,
        Zg = B,
        DB = T(Wg, Vg),
        FB = P(Gg, Zg)
    }
    );
    var Uf = {};
    ie(Uf, {
        error: () => Qg,
        method: () => $g,
        params: () => Jg,
        request: () => jB,
        response: () => HB,
        result: () => Xg
    });
    var $g, Jg, Xg, Qg, jB, HB, ex = C( () => {
        "use strict";
        h();
        K();
        G();
        V();
        $g = a.literal("eth_getCode"),
        Jg = a.tuple([be, a.union([Y, et])]),
        Xg = qe,
        Qg = B,
        jB = T($g, Jg),
        HB = P(Xg, Qg)
    }
    );
    var Df = {};
    ie(Df, {
        error: () => ox,
        method: () => tx,
        params: () => rx,
        request: () => KB,
        response: () => WB,
        result: () => nx
    });
    var tx, rx, nx, ox, KB, WB, sx = C( () => {
        "use strict";
        h();
        K();
        G();
        V();
        tx = a.literal("eth_getFilterChanges"),
        rx = a.tuple([Y]),
        nx = a.array(sn),
        ox = B,
        KB = T(tx, rx),
        WB = P(nx, ox)
    }
    );
    var Ff = {};
    ie(Ff, {
        error: () => ux,
        method: () => ix,
        params: () => ax,
        request: () => VB,
        response: () => GB,
        result: () => cx
    });
    var ix, ax, cx, ux, VB, GB, px = C( () => {
        "use strict";
        h();
        K();
        G();
        V();
        ix = a.literal("eth_getFilterLogs"),
        ax = a.tuple([Y]),
        cx = a.array(sn),
        ux = B,
        VB = T(ix, ax),
        GB = P(cx, ux)
    }
    );
    var jf = {};
    ie(jf, {
        error: () => hx,
        method: () => fx,
        params: () => lx,
        request: () => ZB,
        response: () => YB,
        result: () => dx
    });
    var fx, lx, dx, hx, ZB, YB, yx = C( () => {
        "use strict";
        h();
        K();
        G();
        V();
        fx = a.literal("eth_getLogs"),
        lx = a.tuple([a.object({
            fromBlock: Y.or(et).optional(),
            toBlock: a.string().optional(),
            address: be.optional(),
            topics: a.array(ve).optional(),
            blockHash: ve.optional()
        })]),
        dx = a.array(sn),
        hx = B,
        ZB = T(fx, lx),
        YB = P(dx, hx)
    }
    );
    var Hf = {};
    ie(Hf, {
        error: () => wx,
        method: () => mx,
        params: () => gx,
        request: () => $B,
        response: () => JB,
        result: () => xx
    });
    var mx, gx, xx, wx, $B, JB, bx = C( () => {
        "use strict";
        h();
        K();
        G();
        V();
        mx = a.literal("eth_getProof"),
        gx = a.tuple([be, a.array(ve), Y.or(et)]),
        xx = lf,
        wx = B,
        $B = T(mx, gx),
        JB = P(xx, wx)
    }
    );
    var Kf = {};
    ie(Kf, {
        error: () => _x,
        method: () => Sx,
        params: () => vx,
        request: () => XB,
        response: () => QB,
        result: () => Ex
    });
    var Sx, vx, Ex, _x, XB, QB, Ax = C( () => {
        "use strict";
        h();
        K();
        G();
        V();
        Sx = a.literal("eth_getStorageAt"),
        vx = a.tuple([be, Y, Y.or(et)]),
        Ex = qe,
        _x = B,
        XB = T(Sx, vx),
        QB = P(Ex, _x)
    }
    );
    var Wf = {};
    ie(Wf, {
        error: () => Bx,
        method: () => kx,
        params: () => Ix,
        request: () => eT,
        response: () => tT,
        result: () => Rx
    });
    var kx, Ix, Rx, Bx, eT, tT, Tx = C( () => {
        "use strict";
        h();
        K();
        G();
        V();
        kx = a.literal("eth_getTransactionByBlockHashAndIndex"),
        Ix = a.tuple([ve, Y]),
        Rx = an.nullish().default(null),
        Bx = B,
        eT = T(kx, Ix),
        tT = P(Rx, Bx)
    }
    );
    var Vf = {};
    ie(Vf, {
        error: () => Lx,
        method: () => Px,
        params: () => zx,
        request: () => rT,
        response: () => nT,
        result: () => Mx
    });
    var Px, zx, Mx, Lx, rT, nT, Nx = C( () => {
        "use strict";
        h();
        K();
        G();
        V();
        Px = a.literal("eth_getTransactionByBlockNumberAndIndex"),
        zx = a.tuple([a.string(), Y]),
        Mx = an,
        Lx = B,
        rT = T(Px, zx),
        nT = P(Mx, Lx)
    }
    );
    var Gf = {};
    ie(Gf, {
        error: () => Ux,
        method: () => Cx,
        params: () => Ox,
        request: () => oT,
        response: () => sT,
        result: () => qx
    });
    var Cx, Ox, qx, Ux, oT, sT, Dx = C( () => {
        "use strict";
        h();
        K();
        G();
        V();
        Cx = a.literal("eth_getTransactionByHash"),
        Ox = a.tuple([ve]),
        qx = an.nullable(),
        Ux = B,
        oT = T(Cx, Ox),
        sT = P(qx, Ux)
    }
    );
    var Zf = {};
    ie(Zf, {
        error: () => Kx,
        method: () => Fx,
        params: () => jx,
        request: () => iT,
        response: () => aT,
        result: () => Hx
    });
    var Fx, jx, Hx, Kx, iT, aT, Wx = C( () => {
        "use strict";
        h();
        K();
        G();
        V();
        Fx = a.literal("eth_getTransactionCount"),
        jx = a.tuple([be, Y.or(et)]),
        Hx = Y,
        Kx = B,
        iT = T(Fx, jx),
        aT = P(Hx, Kx)
    }
    );
    var Yf = {};
    ie(Yf, {
        error: () => Yx,
        method: () => Vx,
        params: () => Gx,
        request: () => cT,
        response: () => uT,
        result: () => Zx
    });
    var Vx, Gx, Zx, Yx, cT, uT, $x = C( () => {
        "use strict";
        h();
        K();
        G();
        V();
        Vx = a.literal("eth_getTransactionReceipt"),
        Gx = a.tuple([ve]),
        Zx = Ni.nullish().default(null),
        Yx = B,
        cT = T(Vx, Gx),
        uT = P(Zx, Yx)
    }
    );
    var $f = {};
    ie($f, {
        error: () => ew,
        method: () => Jx,
        params: () => Xx,
        request: () => pT,
        response: () => fT,
        result: () => Qx
    });
    var Jx, Xx, Qx, ew, pT, fT, tw = C( () => {
        "use strict";
        h();
        K();
        G();
        V();
        Jx = a.literal("eth_getUncleByBlockHashAndIndex"),
        Xx = a.tuple([Y.or(et), Y]),
        Qx = kn,
        ew = B,
        pT = T(Jx, Xx),
        fT = P(Qx, ew)
    }
    );
    var Jf = {};
    ie(Jf, {
        error: () => sw,
        method: () => rw,
        params: () => nw,
        request: () => lT,
        response: () => dT,
        result: () => ow
    });
    var rw, nw, ow, sw, lT, dT, iw = C( () => {
        "use strict";
        h();
        K();
        G();
        V();
        rw = a.literal("eth_getUncleByBlockNumberAndIndex"),
        nw = a.tuple([Y.or(et), Y]),
        ow = kn,
        sw = B,
        lT = T(rw, nw),
        dT = P(ow, sw)
    }
    );
    var Xf = {};
    ie(Xf, {
        error: () => pw,
        method: () => aw,
        params: () => cw,
        request: () => hT,
        response: () => yT,
        result: () => uw
    });
    var aw, cw, uw, pw, hT, yT, fw = C( () => {
        "use strict";
        h();
        K();
        G();
        V();
        aw = a.literal("eth_getUncleCountByBlockHash"),
        cw = a.tuple([ve]),
        uw = Y,
        pw = B,
        hT = T(aw, cw),
        yT = P(uw, pw)
    }
    );
    var Qf = {};
    ie(Qf, {
        error: () => yw,
        method: () => lw,
        params: () => dw,
        request: () => mT,
        response: () => gT,
        result: () => hw
    });
    var lw, dw, hw, yw, mT, gT, mw = C( () => {
        "use strict";
        h();
        K();
        G();
        V();
        lw = a.literal("eth_getUncleCountByBlockNumber"),
        dw = a.tuple([Y.or(et)]),
        hw = Y,
        yw = B,
        mT = T(lw, dw),
        gT = P(hw, yw)
    }
    );
    var el = {};
    ie(el, {
        error: () => bw,
        method: () => gw,
        params: () => xw,
        request: () => xT,
        response: () => wT,
        result: () => ww
    });
    var gw, xw, ww, bw, xT, wT, Sw = C( () => {
        "use strict";
        h();
        K();
        G();
        V();
        gw = a.literal("eth_maxPriorityFeePerGas"),
        xw = a.tuple([]),
        ww = Y,
        bw = B,
        xT = T(gw, xw),
        wT = P(ww, bw)
    }
    );
    var tl = {};
    ie(tl, {
        error: () => Aw,
        method: () => vw,
        params: () => Ew,
        request: () => bT,
        response: () => ST,
        result: () => _w
    });
    var vw, Ew, _w, Aw, bT, ST, kw = C( () => {
        "use strict";
        h();
        K();
        G();
        V();
        vw = a.literal("eth_newBlockFilter"),
        Ew = a.tuple([]),
        _w = Y,
        Aw = B,
        bT = T(vw, Ew),
        ST = P(_w, Aw)
    }
    );
    var rl = {};
    ie(rl, {
        error: () => Tw,
        method: () => Iw,
        params: () => Rw,
        request: () => vT,
        response: () => ET,
        result: () => Bw
    });
    var Iw, Rw, Bw, Tw, vT, ET, Pw = C( () => {
        "use strict";
        h();
        K();
        G();
        V();
        Iw = a.literal("eth_newFilter"),
        Rw = a.tuple([a.object({
            fromBlock: Y.optional(),
            toBlock: Y.optional(),
            address: be.or(a.array(be)).optional(),
            topics: a.array(qe.nullish().default(null).or(a.array(qe.nullish().default(null)))).optional()
        })]),
        Bw = Y,
        Tw = B,
        vT = T(Iw, Rw),
        ET = P(Bw, Tw)
    }
    );
    var nl = {};
    ie(nl, {
        error: () => Nw,
        method: () => zw,
        params: () => Mw,
        request: () => _T,
        response: () => AT,
        result: () => Lw
    });
    var zw, Mw, Lw, Nw, _T, AT, Cw = C( () => {
        "use strict";
        h();
        K();
        G();
        V();
        zw = a.literal("eth_newPendingTransactionFilter"),
        Mw = a.tuple([]),
        Lw = Y,
        Nw = B,
        _T = T(zw, Mw),
        AT = P(Lw, Nw)
    }
    );
    var ol = {};
    ie(ol, {
        error: () => Dw,
        method: () => Ow,
        params: () => qw,
        request: () => kT,
        response: () => IT,
        result: () => Uw
    });
    var Ow, qw, Uw, Dw, kT, IT, Fw = C( () => {
        "use strict";
        h();
        K();
        G();
        V();
        Ow = a.literal("personal_sign"),
        qw = a.union([a.tuple([Xn, be]), a.tuple([Xn, be, a.unknown()])]),
        Uw = qe,
        Dw = B,
        kT = T(Ow, qw),
        IT = P(Uw, Dw)
    }
    );
    var sl = {};
    ie(sl, {
        error: () => Ww,
        method: () => jw,
        params: () => Hw,
        request: () => RT,
        response: () => BT,
        result: () => Kw
    });
    var jw, Hw, Kw, Ww, RT, BT, Vw = C( () => {
        "use strict";
        h();
        K();
        G();
        V();
        jw = a.literal("eth_protocolVersion"),
        Hw = a.tuple([]),
        Kw = a.string(),
        Ww = B,
        RT = T(jw, Hw),
        BT = P(Kw, Ww)
    }
    );
    var il = {};
    ie(il, {
        error: () => $w,
        method: () => Gw,
        params: () => Zw,
        request: () => TT,
        response: () => PT,
        result: () => Yw
    });
    var Gw, Zw, Yw, $w, TT, PT, Jw = C( () => {
        "use strict";
        h();
        K();
        G();
        V();
        Gw = a.literal("eth_requestAccounts"),
        Zw = a.tuple([]),
        Yw = a.array(be),
        $w = B,
        TT = T(Gw, Zw),
        PT = P(Yw, $w)
    }
    );
    var al = {};
    ie(al, {
        error: () => tb,
        method: () => Xw,
        params: () => Qw,
        request: () => zT,
        response: () => MT,
        result: () => eb
    });
    var Xw, Qw, eb, tb, zT, MT, rb = C( () => {
        "use strict";
        h();
        K();
        G();
        V();
        Xw = a.literal("eth_sendPrivateTransaction"),
        Qw = a.tuple([a.object({
            tx: ve,
            maxBlockNumber: Y.optional(),
            preferences: a.object({
                fast: a.boolean()
            }).optional()
        })]),
        eb = ve,
        tb = B,
        zT = T(Xw, Qw),
        MT = P(eb, tb)
    }
    );
    var cl = {};
    ie(cl, {
        error: () => ib,
        method: () => nb,
        params: () => ob,
        request: () => LT,
        response: () => NT,
        result: () => sb
    });
    var nb, ob, sb, ib, LT, NT, ab = C( () => {
        "use strict";
        h();
        K();
        G();
        V();
        nb = a.literal("eth_sendRawTransaction"),
        ob = a.tuple([qe]),
        sb = ve,
        ib = B,
        LT = T(nb, ob),
        NT = P(sb, ib)
    }
    );
    var ul = {};
    ie(ul, {
        error: () => fb,
        method: () => cb,
        params: () => ub,
        request: () => CT,
        response: () => OT,
        result: () => pb
    });
    var cb, ub, pb, fb, CT, OT, lb = C( () => {
        "use strict";
        h();
        K();
        G();
        V();
        cb = a.literal("eth_sendTransaction"),
        ub = a.tuple([An]),
        pb = ve,
        fb = B,
        CT = T(cb, ub),
        OT = P(pb, fb)
    }
    );
    var pl = {};
    ie(pl, {
        error: () => mb,
        method: () => db,
        params: () => hb,
        request: () => qT,
        response: () => UT,
        result: () => yb
    });
    var db, hb, yb, mb, qT, UT, gb = C( () => {
        "use strict";
        h();
        K();
        G();
        V();
        db = a.literal("eth_sign"),
        hb = a.tuple([be, Xn]),
        yb = qe,
        mb = B,
        qT = T(db, hb),
        UT = P(yb, mb)
    }
    );
    var fl = {};
    ie(fl, {
        error: () => Sb,
        method: () => xb,
        params: () => wb,
        request: () => DT,
        response: () => FT,
        result: () => bb
    });
    var xb, wb, bb, Sb, DT, FT, vb = C( () => {
        "use strict";
        h();
        K();
        G();
        V();
        xb = a.literal("eth_signTransaction"),
        wb = a.tuple([An]),
        bb = qe,
        Sb = B,
        DT = T(xb, wb),
        FT = P(bb, Sb)
    }
    );
    var ll = {};
    ie(ll, {
        error: () => kb,
        method: () => Eb,
        params: () => _b,
        request: () => jT,
        response: () => HT,
        result: () => Ab
    });
    var Eb, _b, Ab, kb, jT, HT, Ib = C( () => {
        "use strict";
        h();
        K();
        G();
        V();
        Eb = a.literal("eth_signTypedData"),
        _b = a.tuple([uf, be]),
        Ab = qe,
        kb = B,
        jT = T(Eb, _b),
        HT = P(Ab, kb)
    }
    );
    var dl = {};
    ie(dl, {
        error: () => Pb,
        method: () => Rb,
        params: () => Bb,
        request: () => KT,
        response: () => WT,
        result: () => Tb
    });
    var Rb, Bb, Tb, Pb, KT, WT, zb = C( () => {
        "use strict";
        h();
        K();
        G();
        V();
        Rb = a.literal("eth_signTypedData_v3"),
        Bb = a.tuple([be, a.string().transform( (r, e) => {
            try {
                let t = JSON.parse(r);
                return Qa.parse(t)
            } catch (t) {
                return e.addIssue({
                    code: a.ZodIssueCode.custom,
                    message: "Invalid typed data:" + t.message,
                    fatal: !0
                }),
                a.NEVER
            }
        }
        ).or(Qa)]),
        Tb = qe,
        Pb = B,
        KT = T(Rb, Bb),
        WT = P(Tb, Pb)
    }
    );
    var hl = {};
    ie(hl, {
        error: () => Cb,
        method: () => Mb,
        params: () => Lb,
        request: () => VT,
        response: () => GT,
        result: () => Nb
    });
    var Mb, Lb, Nb, Cb, VT, GT, Ob = C( () => {
        "use strict";
        h();
        K();
        G();
        V();
        Mb = a.literal("eth_signTypedData_v4"),
        Lb = a.tuple([be, a.string().transform( (r, e) => {
            try {
                let t = JSON.parse(r);
                return ec.parse(t)
            } catch (t) {
                return e.addIssue({
                    code: a.ZodIssueCode.custom,
                    message: "Invalid typed data:" + t.message,
                    fatal: !0
                }),
                a.NEVER
            }
        }
        ).or(ec)]),
        Nb = qe,
        Cb = B,
        VT = T(Mb, Lb),
        GT = P(Nb, Cb)
    }
    );
    var yl = {};
    ie(yl, {
        error: () => Fb,
        method: () => qb,
        params: () => Ub,
        request: () => ZT,
        response: () => YT,
        result: () => Db
    });
    var qb, Ub, Db, Fb, ZT, YT, jb = C( () => {
        "use strict";
        h();
        K();
        G();
        V();
        qb = a.literal("eth_subscribe"),
        Ub = a.any(),
        Db = a.union([Je, a.object({
            result: an,
            subscription: Je
        }), a.object({
            result: ve,
            subscription: Je
        }), a.object({
            result: a.object({
                difficulty: Je,
                extraData: Je,
                gasLimit: Je,
                gasUsed: Je,
                logsBloom: Je,
                miner: be,
                nonce: Je,
                number: Je,
                parentHash: ve,
                receiptRoot: ve,
                sha3Uncles: ve,
                stateRoot: ve,
                timestamp: Je,
                transactionsRoot: ve
            }),
            subscription: Je
        }), a.object({
            result: sn,
            subscription: Je
        })]),
        Fb = B,
        ZT = T(qb, Ub),
        YT = P(Db, Fb)
    }
    );
    var ml = {};
    ie(ml, {
        error: () => Vb,
        method: () => Hb,
        params: () => Kb,
        request: () => $T,
        response: () => JT,
        result: () => Wb
    });
    var Hb, Kb, Wb, Vb, $T, JT, Gb = C( () => {
        "use strict";
        h();
        K();
        G();
        V();
        Hb = a.literal("eth_syncing"),
        Kb = a.tuple([]),
        Wb = a.union([a.object({
            currentBlock: Y,
            highestBlock: Y,
            startingBlock: Y
        }), a.literal(!1)]),
        Vb = B,
        $T = T(Hb, Kb),
        JT = P(Wb, Vb)
    }
    );
    var gl = {};
    ie(gl, {
        error: () => Jb,
        method: () => Zb,
        params: () => Yb,
        request: () => XT,
        response: () => QT,
        result: () => $b
    });
    var Zb, Yb, $b, Jb, XT, QT, Xb = C( () => {
        "use strict";
        h();
        K();
        G();
        V();
        Zb = a.literal("eth_uninstallFilter"),
        Yb = a.tuple([Y]),
        $b = a.boolean(),
        Jb = B,
        XT = T(Zb, Yb),
        QT = P($b, Jb)
    }
    );
    var xl = {};
    ie(xl, {
        error: () => r1,
        method: () => Qb,
        params: () => e1,
        request: () => eP,
        response: () => tP,
        result: () => t1
    });
    var Qb, e1, t1, r1, eP, tP, n1 = C( () => {
        "use strict";
        h();
        K();
        G();
        V();
        Qb = a.literal("eth_unsubscribe"),
        e1 = a.any(),
        t1 = a.boolean(),
        r1 = B,
        eP = T(Qb, e1),
        tP = P(t1, r1)
    }
    );
    var wl = {};
    ie(wl, {
        error: () => a1,
        method: () => o1,
        params: () => s1,
        request: () => rP,
        response: () => nP,
        result: () => i1
    });
    var o1, s1, i1, a1, rP, nP, c1 = C( () => {
        "use strict";
        h();
        K();
        G();
        V();
        o1 = a.literal("net_listening"),
        s1 = a.tuple([]),
        i1 = a.boolean(),
        a1 = B,
        rP = T(o1, s1),
        nP = P(i1, a1)
    }
    );
    var bl = {};
    ie(bl, {
        error: () => l1,
        method: () => u1,
        params: () => p1,
        request: () => oP,
        response: () => sP,
        result: () => f1
    });
    var u1, p1, f1, l1, oP, sP, d1 = C( () => {
        "use strict";
        h();
        K();
        G();
        V();
        u1 = a.literal("net_version"),
        p1 = a.tuple([]),
        f1 = a.string(),
        l1 = B,
        oP = T(u1, p1),
        sP = P(f1, l1)
    }
    );
    var Sl = {};
    ie(Sl, {
        error: () => g1,
        method: () => h1,
        params: () => y1,
        request: () => iP,
        response: () => aP,
        result: () => m1
    });
    var h1, y1, m1, g1, iP, aP, x1 = C( () => {
        "use strict";
        h();
        K();
        G();
        V();
        h1 = a.literal("wallet_addEthereumChain"),
        y1 = a.tuple([a.object({
            chainId: Je,
            chainName: a.string(),
            nativeCurrency: a.object({
                name: a.string(),
                symbol: a.string().refine(r => {
                    let {length: e} = r;
                    return e >= 2 && e <= 6
                }
                , {
                    message: "Value is not a valid symbol."
                }),
                decimals: a.number()
            }),
            rpcUrls: a.array(a.string()),
            blockExplorerUrls: a.union([a.tuple([a.string()]), a.null()]).optional(),
            iconUrls: a.array(a.string()).optional()
        })]),
        m1 = a.null(),
        g1 = B,
        iP = T(h1, y1),
        aP = P(m1, g1)
    }
    );
    var vl = {};
    ie(vl, {
        error: () => v1,
        method: () => w1,
        params: () => b1,
        request: () => cP,
        response: () => uP,
        result: () => S1
    });
    var w1, b1, S1, v1, cP, uP, E1 = C( () => {
        "use strict";
        h();
        K();
        G();
        V();
        w1 = a.literal("wallet_selectEthereumProvider"),
        b1 = a.tuple([]),
        S1 = Oi,
        v1 = B,
        cP = T(w1, b1),
        uP = P(S1, v1)
    }
    );
    var El = {};
    ie(El, {
        error: () => I1,
        method: () => _1,
        params: () => A1,
        request: () => pP,
        response: () => fP,
        result: () => k1
    });
    var _1, A1, k1, I1, pP, fP, R1 = C( () => {
        "use strict";
        h();
        K();
        G();
        V();
        _1 = a.literal("wallet_switchEthereumChain"),
        A1 = a.tuple([a.object({
            chainId: Je
        })]),
        k1 = a.null(),
        I1 = B,
        pP = T(_1, A1),
        fP = P(k1, I1)
    }
    );
    var _l = {};
    ie(_l, {
        error: () => z1,
        method: () => B1,
        params: () => T1,
        request: () => lP,
        response: () => dP,
        result: () => P1
    });
    var B1, T1, P1, z1, lP, dP, M1 = C( () => {
        "use strict";
        h();
        K();
        G();
        V();
        B1 = a.literal("wallet_watchAsset"),
        T1 = a.object({
            type: a.literal("ERC20"),
            options: a.object({
                address: be,
                symbol: a.string(),
                decimals: a.number(),
                image: a.string()
            })
        }),
        P1 = a.boolean(),
        z1 = B,
        lP = T(B1, T1),
        dP = P(P1, z1)
    }
    );
    var Al = {};
    ie(Al, {
        error: () => O1,
        method: () => L1,
        params: () => N1,
        request: () => hP,
        response: () => yP,
        result: () => C1
    });
    var L1, N1, C1, O1, hP, yP, q1 = C( () => {
        "use strict";
        h();
        K();
        G();
        V();
        L1 = a.literal("web3_clientVersion"),
        N1 = a.tuple([]),
        C1 = a.string(),
        O1 = B,
        hP = T(L1, N1),
        yP = P(C1, O1)
    }
    );
    var kl = {};
    ie(kl, {
        error: () => j1,
        method: () => U1,
        params: () => D1,
        request: () => mP,
        response: () => gP,
        result: () => F1
    });
    var U1, D1, F1, j1, mP, gP, H1 = C( () => {
        "use strict";
        h();
        K();
        G();
        V();
        U1 = a.literal("web3_sha3"),
        D1 = a.tuple([qe]),
        F1 = qe,
        j1 = B,
        mP = T(U1, D1),
        gP = P(F1, j1)
    }
    );
    var Il = {};
    ie(Il, {
        error: () => G1,
        method: () => K1,
        params: () => W1,
        request: () => SP,
        response: () => vP,
        result: () => V1
    });
    var xP, wP, bP, K1, W1, V1, G1, SP, vP, Z1 = C( () => {
        "use strict";
        h();
        K();
        G();
        V();
        xP = a.record(a.string(), a.any()),
        wP = a.record(a.string(), xP),
        bP = a.object({
            parentCapability: a.string(),
            date: a.number().optional()
        }),
        K1 = a.literal("wallet_requestPermissions"),
        W1 = a.tuple([wP]),
        V1 = a.array(bP),
        G1 = B,
        SP = T(K1, W1),
        vP = P(V1, G1)
    }
    );
    var Rl = {};
    ie(Rl, {
        error: () => X1,
        method: () => Y1,
        params: () => $1,
        request: () => AP,
        response: () => kP,
        result: () => J1
    });
    var EP, _P, Y1, $1, J1, X1, AP, kP, Q1 = C( () => {
        "use strict";
        h();
        K();
        G();
        V();
        EP = a.object({
            type: a.string(),
            value: a.any()
        }),
        _P = a.object({
            invoker: a.string().url(),
            parentCapability: a.string(),
            caveats: a.array(EP)
        }),
        Y1 = a.literal("wallet_getPermissions"),
        $1 = a.tuple([]),
        J1 = a.array(_P),
        X1 = B,
        AP = T(Y1, $1),
        kP = P(J1, X1)
    }
    );
    var Gs = {};
    ie(Gs, {
        eth_accounts: () => Af,
        eth_blockNumber: () => kf,
        eth_call: () => If,
        eth_cancelPrivateTransaction: () => Rf,
        eth_chainId: () => Bf,
        eth_estimateGas: () => Tf,
        eth_feeHistory: () => Pf,
        eth_gasPrice: () => zf,
        eth_getBalance: () => Mf,
        eth_getBlockByHash: () => Lf,
        eth_getBlockByNumber: () => Nf,
        eth_getBlockReceipts: () => Cf,
        eth_getBlockTransactionCountByHash: () => Of,
        eth_getBlockTransactionCountByNumber: () => qf,
        eth_getCode: () => Uf,
        eth_getFilterChanges: () => Df,
        eth_getFilterLogs: () => Ff,
        eth_getLogs: () => jf,
        eth_getProof: () => Hf,
        eth_getStorageAt: () => Kf,
        eth_getTransactionByBlockHashAndIndex: () => Wf,
        eth_getTransactionByBlockNumberAndIndex: () => Vf,
        eth_getTransactionByHash: () => Gf,
        eth_getTransactionCount: () => Zf,
        eth_getTransactionReceipt: () => Yf,
        eth_getUncleByBlockHashAndIndex: () => $f,
        eth_getUncleByBlockNumberAndIndex: () => Jf,
        eth_getUncleCountByBlockHash: () => Xf,
        eth_getUncleCountByBlockNumber: () => Qf,
        eth_maxPriorityFeePerGas: () => el,
        eth_newBlockFilter: () => tl,
        eth_newFilter: () => rl,
        eth_newPendingTransactionFilter: () => nl,
        eth_protocolVersion: () => sl,
        eth_requestAccounts: () => il,
        eth_sendPrivateTransaction: () => al,
        eth_sendRawTransaction: () => cl,
        eth_sendTransaction: () => ul,
        eth_sign: () => pl,
        eth_signTransaction: () => fl,
        eth_signTypedData: () => ll,
        eth_signTypedData_v3: () => dl,
        eth_signTypedData_v4: () => hl,
        eth_subscribe: () => yl,
        eth_syncing: () => ml,
        eth_uninstallFilter: () => gl,
        eth_unsubscribe: () => xl,
        net_listening: () => wl,
        net_version: () => bl,
        personal_sign: () => ol,
        wallet_addEthereumChain: () => Sl,
        wallet_getPermissions: () => Rl,
        wallet_requestPermissions: () => Il,
        wallet_selectEthereumProvider: () => vl,
        wallet_switchEthereumChain: () => El,
        wallet_watchAsset: () => _l,
        web3_clientVersion: () => Al,
        web3_sha3: () => kl
    });
    var eS = C( () => {
        "use strict";
        h();
        q0();
        H0();
        Z0();
        Q0();
        og();
        ug();
        hg();
        wg();
        _g();
        Bg();
        Lg();
        Ug();
        Kg();
        Yg();
        ex();
        sx();
        px();
        yx();
        bx();
        Ax();
        Tx();
        Nx();
        Dx();
        Wx();
        $x();
        tw();
        iw();
        fw();
        mw();
        Sw();
        kw();
        Pw();
        Cw();
        Fw();
        Vw();
        Jw();
        rb();
        ab();
        lb();
        gb();
        vb();
        Ib();
        zb();
        Ob();
        jb();
        Gb();
        Xb();
        n1();
        c1();
        d1();
        x1();
        E1();
        R1();
        M1();
        q1();
        H1();
        Z1();
        Q1()
    }
    );
    var Bl = {};
    ie(Bl, {
        method: () => tS,
        notification: () => IP,
        params: () => rS
    });
    var tS, rS, IP, nS = C( () => {
        "use strict";
        h();
        K();
        G();
        V();
        tS = a.literal("phantom_accountChanged"),
        rS = a.object({
            evm: a.optional(be),
            sol: a.optional(qi),
            btc: a.array(us).optional(),
            sui: a.optional(ps)
        }).nullish().default(null),
        IP = vr(tS, rS)
    }
    );
    var Tl = {};
    ie(Tl, {
        method: () => oS,
        notification: () => RP,
        params: () => sS
    });
    var oS, sS, RP, iS = C( () => {
        "use strict";
        h();
        K();
        V();
        oS = a.literal("phantom_metaMaskOverrideSettingsChanged"),
        sS = a.null(),
        RP = vr(oS, sS)
    }
    );
    var Pl = {};
    ie(Pl, {
        method: () => aS,
        notification: () => BP,
        params: () => cS
    });
    var aS, cS, BP, uS = C( () => {
        "use strict";
        h();
        K();
        G();
        V();
        aS = a.literal("phantom_chainChanged"),
        cS = a.object({
            evm: Y
        }).nullish().default(null),
        BP = vr(aS, cS)
    }
    );
    var zl = {};
    ie(zl, {
        method: () => pS,
        notification: () => TP,
        params: () => fS
    });
    var pS, fS, TP, lS = C( () => {
        "use strict";
        h();
        K();
        V();
        pS = a.literal("phantom_dappIcon"),
        fS = a.string().nullish().default(null),
        TP = vr(pS, fS)
    }
    );
    var Ml = {};
    ie(Ml, {
        method: () => dS,
        notification: () => PP,
        params: () => hS
    });
    var dS, hS, PP, yS = C( () => {
        "use strict";
        h();
        K();
        V();
        dS = a.literal("phantom_dappMeta"),
        hS = a.object({
            title: a.string(),
            url: a.string(),
            icons: a.object({
                href: a.string(),
                size: a.object({
                    width: a.number(),
                    height: a.number()
                })
            }).array()
        }),
        PP = vr(dS, hS)
    }
    );
    var Ll = {};
    ie(Ll, {
        method: () => mS,
        notification: () => zP,
        params: () => gS
    });
    var mS, gS, zP, xS = C( () => {
        "use strict";
        h();
        K();
        G();
        V();
        mS = a.literal("phantom_trustRevoked"),
        gS = a.object({
            evm: a.optional(be),
            sol: a.optional(qi),
            btc: a.array(us).optional(),
            sui: a.optional(ps)
        }).nullish().default(null),
        zP = vr(mS, gS)
    }
    );
    var er = {};
    ie(er, {
        phantom_accountChanged: () => Bl,
        phantom_chainChanged: () => Pl,
        phantom_dappIcon: () => zl,
        phantom_dappMeta: () => Ml,
        phantom_metaMaskOverrideSettingsChanged: () => Tl,
        phantom_trustRevoked: () => Ll
    });
    var wS = C( () => {
        "use strict";
        h();
        nS();
        iS();
        uS();
        lS();
        yS();
        xS()
    }
    );
    var MP, LP, NP, CP, mH, gH, bS = C( () => {
        "use strict";
        h();
        K();
        G();
        V();
        MP = a.literal("phantom_deep_link_browse"),
        LP = a.object({
            url: a.string(),
            ref: a.string()
        }),
        NP = a.null(),
        CP = B,
        mH = T(MP, LP),
        gH = P(NP, CP)
    }
    );
    var qP, UP, DP, FP, vH, EH, SS = C( () => {
        "use strict";
        h();
        K();
        G();
        V();
        qP = a.literal("phantom_deep_link_swap"),
        UP = a.object({
            buy: a.string(),
            sell: a.string().optional(),
            amount: a.string().optional()
        }),
        DP = a.null(),
        FP = B,
        vH = T(qP, UP),
        EH = P(DP, FP)
    }
    );
    var HP, KP, WP, VP, RH, BH, vS = C( () => {
        "use strict";
        h();
        K();
        G();
        V();
        HP = a.literal("phantom_deep_link_fungible"),
        KP = a.object({
            token: a.string()
        }),
        WP = a.null(),
        VP = B,
        RH = T(HP, KP),
        BH = P(WP, VP)
    }
    );
    var ZP, YP, $P, JP, LH, NH, ES = C( () => {
        "use strict";
        h();
        K();
        G();
        V();
        ZP = a.literal("phantom_deep_link_user"),
        YP = a.object({
            username: a.string(),
            action: a.enum(["send"]).optional()
        }),
        $P = a.null(),
        JP = B,
        LH = T(ZP, YP),
        NH = P($P, JP)
    }
    );
    var QP, ez, tz, rz, DH, FH, jH, _S = C( () => {
        "use strict";
        h();
        K();
        G();
        V();
        QP = a.literal("phantom_deep_link_connect"),
        ez = a.object({
            app_url: sc,
            dapp_encryption_public_key: Di,
            redirect_link: ji,
            cluster: ic.optional()
        }),
        tz = a.object({
            phantom_encryption_public_key: oc,
            nonce: Ks,
            data: Fi
        }),
        rz = B,
        DH = T(QP, ez),
        FH = P(tz, rz),
        jH = a.object({
            public_key: fe,
            session: fe
        })
    }
    );
    var oz, sz, iz, az, GH, ZH, YH, AS = C( () => {
        "use strict";
        h();
        K();
        G();
        V();
        oz = a.literal("phantom_deep_link_disconnect"),
        sz = Pr,
        iz = a.null(),
        az = B,
        GH = T(oz, sz),
        ZH = P(iz, az),
        YH = a.object({
            session: fe
        })
    }
    );
    var uz, pz, fz, lz, eK, tK, rK, nK, kS = C( () => {
        "use strict";
        h();
        K();
        G();
        V();
        uz = a.literal("phantom_deep_link_signMessage"),
        pz = Pr,
        fz = cn,
        lz = B,
        eK = T(uz, pz),
        tK = P(fz, lz),
        rK = a.object({
            session: fe,
            message: fe,
            display: a.union([a.literal("utf8"), a.literal("hex")]).optional()
        }),
        nK = a.object({
            signature: fe,
            publicKey: fe
        })
    }
    );
    var hz, yz, mz, gz, cK, uK, pK, IS = C( () => {
        "use strict";
        h();
        K();
        G();
        V();
        hz = a.literal("phantom_deep_link_signIn"),
        yz = a.object({
            app_url: sc,
            dapp_encryption_public_key: Di,
            redirect_link: ji,
            cluster: ic.optional(),
            payload: yf
        }),
        mz = a.object({
            phantom_encryption_public_key: oc,
            nonce: Ks,
            data: Fi
        }),
        gz = B,
        cK = T(hz, yz),
        uK = P(mz, gz),
        pK = a.object({
            address: fe,
            signedMessage: fe,
            signature: fe,
            session: fe
        })
    }
    );
    var wz, bz, Sz, vz, yK, mK, gK, xK, RS = C( () => {
        "use strict";
        h();
        K();
        G();
        V();
        wz = a.literal("phantom_deep_link_signTransaction"),
        bz = Pr,
        Sz = cn,
        vz = B,
        yK = T(wz, bz),
        mK = P(Sz, vz),
        gK = a.object({
            session: fe,
            transaction: fe
        }),
        xK = a.object({
            transaction: fe
        })
    }
    );
    var _z, Az, kz, Iz, EK, _K, AK, kK, BS = C( () => {
        "use strict";
        h();
        K();
        G();
        V();
        _z = a.literal("phantom_deep_link_signAllTransactions"),
        Az = Pr,
        kz = cn,
        Iz = B,
        EK = T(_z, Az),
        _K = P(kz, Iz),
        AK = a.object({
            session: fe,
            transactions: a.array(fe)
        }),
        kK = a.object({
            transactions: a.array(fe)
        })
    }
    );
    var Bz, Tz, Pz, zz, zK, MK, LK, NK, TS = C( () => {
        "use strict";
        h();
        K();
        G();
        Vs();
        V();
        Bz = a.literal("phantom_deep_link_signAndSendTransaction"),
        Tz = Pr,
        Pz = cn,
        zz = B,
        zK = T(Bz, Tz),
        MK = P(Pz, zz),
        LK = a.object({
            session: fe,
            transaction: fe,
            sendOptions: In.optional()
        }),
        NK = a.object({
            signature: fe
        })
    }
    );
    var Lz, Nz, Cz, Oz, FK, jK, HK, KK, PS = C( () => {
        "use strict";
        h();
        K();
        G();
        Vs();
        V();
        Lz = a.literal("phantom_deep_link_signAndSendAllTransactions"),
        Nz = Pr,
        Cz = cn,
        Oz = B,
        FK = T(Lz, Nz),
        jK = P(Cz, Oz),
        HK = a.object({
            session: fe,
            transactions: a.array(fe),
            sendOptions: In.optional()
        }),
        KK = a.object({
            signatures: a.array(a.union([fe, a.null()]))
        })
    }
    );
    var Uz, Dz, Fz, jz, YK, $K, zS = C( () => {
        "use strict";
        h();
        K();
        G();
        V();
        Uz = a.literal("phantom_deep_link_tokens"),
        Dz = a.object({
            chain: a.string(),
            address: a.string().optional(),
            referralId: a.string().optional()
        }),
        Fz = a.null(),
        jz = B,
        YK = T(Uz, Dz),
        $K = P(Fz, jz)
    }
    );
    var Kz, Wz, Vz, Gz, tW, rW, MS = C( () => {
        "use strict";
        h();
        K();
        G();
        V();
        Kz = a.literal("phantom_deep_link_onboard"),
        Wz = a.object({
            value: a.string().optional(),
            accounts: a.string().optional()
        }),
        Vz = a.null(),
        Gz = B,
        tW = T(Kz, Wz),
        rW = P(Vz, Gz)
    }
    );
    var Yz, $z, Jz, Xz, aW, cW, LS = C( () => {
        "use strict";
        h();
        K();
        G();
        V();
        Yz = a.literal("phantom_deep_link_onramp"),
        $z = a.object({
            buy: a.string(),
            amount: a.number().optional(),
            redirectURL: a.string().url().optional()
        }),
        Jz = a.null(),
        Xz = B,
        aW = T(Yz, $z),
        cW = P(Jz, Xz)
    }
    );
    var eM, tM, rM, nM, dW, hW, NS = C( () => {
        "use strict";
        h();
        K();
        G();
        V();
        eM = a.literal("phantom_deep_link_navigate"),
        tM = a.object({
            route: a.string(),
            params: a.any().optional()
        }),
        rM = a.null(),
        nM = B,
        dW = T(eM, tM),
        hW = P(rM, nM)
    }
    );
    var CS = C( () => {
        "use strict";
        h();
        bS();
        SS();
        vS();
        ES();
        _S();
        AS();
        kS();
        IS();
        RS();
        BS();
        TS();
        PS();
        zS();
        MS();
        LS();
        NS()
    }
    );
    var OS, qS, US = C( () => {
        "use strict";
        h();
        K();
        OS = (u => (u.BitcoinTaproot = "bip122_p2tr",
        u.BitcoinNativeSegwit = "bip122_p2wpkh",
        u.BitcoinNestedSegwit = "bip122_p2sh",
        u.BitcoinLegacy = "bip122_p2pkh",
        u.Solana = "solana",
        u.EVM = "eip155",
        u.Sui = "sui",
        u))(OS || {}),
        qS = a.object({
            type: a.nativeEnum(OS),
            address: a.string()
        })
    }
    );
    var iM, aM, cM, uM, _W, AW, DS = C( () => {
        "use strict";
        h();
        K();
        G();
        V();
        US();
        iM = a.literal("phantom_getUser"),
        aM = a.object({}),
        cM = a.object({
            addresses: a.array(qS)
        }).nullish().default(null),
        uM = B,
        _W = T(iM, aM),
        AW = P(cM, uM)
    }
    );
    var fM, lM, dM, hM, TW, PW, FS = C( () => {
        "use strict";
        h();
        K();
        G();
        V();
        fM = a.literal("phantom_login"),
        lM = a.object({}),
        dM = a.null(),
        hM = B,
        TW = T(fM, lM),
        PW = P(dM, hM)
    }
    );
    var mM, gM, xM, wM, CW, OW, jS = C( () => {
        "use strict";
        h();
        K();
        G();
        V();
        mM = a.literal("phantom_logout"),
        gM = a.object({}),
        xM = a.null(),
        wM = B,
        CW = T(mM, gM),
        OW = P(xM, wM)
    }
    );
    var HS = C( () => {
        "use strict";
        h();
        DS();
        FS();
        jS()
    }
    );
    var Nl = {};
    ie(Nl, {
        error: () => GS,
        method: () => KS,
        params: () => WS,
        request: () => vM,
        response: () => EM,
        result: () => VS
    });
    var KS, WS, VS, GS, vM, EM, ZS = C( () => {
        "use strict";
        h();
        K();
        G();
        V();
        KS = a.literal("sol_disconnect"),
        WS = Fs.optional(),
        VS = a.null(),
        GS = B,
        vM = T(KS, WS),
        EM = P(VS, GS)
    }
    );
    var Cl = {};
    ie(Cl, {
        error: () => XS,
        method: () => YS,
        params: () => $S,
        request: () => _M,
        response: () => AM,
        result: () => JS
    });
    var YS, $S, JS, XS, _M, AM, QS = C( () => {
        "use strict";
        h();
        K();
        G();
        V();
        YS = a.literal("sol_signAllTransactions"),
        $S = a.object({
            transactions: a.array(fe)
        }),
        JS = a.array(a.object({
            signature: a.string(),
            transaction: fe,
            version: a.union([a.literal("legacy"), a.number()])
        })),
        XS = B,
        _M = T(YS, $S),
        AM = P(JS, XS)
    }
    );
    var Ol = {};
    ie(Ol, {
        error: () => nv,
        method: () => ev,
        params: () => tv,
        request: () => kM,
        response: () => IM,
        result: () => rv
    });
    var ev, tv, rv, nv, kM, IM, ov = C( () => {
        "use strict";
        h();
        K();
        G();
        V();
        Vs();
        ev = a.literal("sol_signAndSendTransaction"),
        tv = a.object({
            transaction: fe,
            options: In,
            showConfirmation: a.boolean().optional(),
            postAction: Ws.optional()
        }),
        rv = a.object({
            signature: a.string(),
            publicKey: a.string()
        }),
        nv = B,
        kM = T(ev, tv),
        IM = P(rv, nv)
    }
    );
    var ql = {};
    ie(ql, {
        error: () => cv,
        method: () => sv,
        params: () => iv,
        request: () => RM,
        response: () => BM,
        result: () => av
    });
    var sv, iv, av, cv, RM, BM, uv = C( () => {
        "use strict";
        h();
        K();
        G();
        V();
        sv = a.literal("sol_signIn"),
        iv = a.object({
            signInData: Hs
        }),
        av = a.object({
            address: a.string(),
            signedMessage: a.string(),
            signature: a.string()
        }),
        cv = B,
        RM = T(sv, iv),
        BM = P(av, cv)
    }
    );
    var Ul = {};
    ie(Ul, {
        error: () => dv,
        method: () => pv,
        params: () => fv,
        request: () => TM,
        response: () => PM,
        result: () => lv
    });
    var pv, fv, lv, dv, TM, PM, hv = C( () => {
        "use strict";
        h();
        K();
        G();
        V();
        pv = a.literal("sol_signTransaction"),
        fv = a.object({
            transaction: fe
        }),
        lv = a.object({
            signature: a.string(),
            transaction: fe,
            version: a.union([a.literal("legacy"), a.number()])
        }),
        dv = B,
        TM = T(pv, fv),
        PM = P(lv, dv)
    }
    );
    var Mr = {};
    ie(Mr, {
        common: () => wf,
        sol_connect: () => cc,
        sol_disconnect: () => Nl,
        sol_signAllTransactions: () => Cl,
        sol_signAndSendAllTransactions: () => fc,
        sol_signAndSendTransaction: () => Ol,
        sol_signIn: () => ql,
        sol_signMessage: () => dc,
        sol_signTransaction: () => Ul
    });
    var yv = C( () => {
        "use strict";
        h();
        gf();
        ZS();
        QS();
        ov();
        bf();
        Sf();
        uv();
        hv();
        Vs()
    }
    );
    var yc, zM, mc, Dl, Fl, jl, Hl, Kl, uV, Wl, Vl, Hi, Gl, MM, ds = C( () => {
        "use strict";
        h();
        K();
        yc = a.object({
            identityName: a.string().nullish(),
            identityUri: a.string().nullish(),
            iconRelativeUri: a.string().nullish()
        }),
        zM = a.object({
            identity: yc,
            authorizationScope: a.string()
        }),
        mc = a.object({
            verifiableIdentity: zM,
            publicKey: a.string(),
            payloads: a.array(a.string())
        }),
        Dl = a.object({
            identity: yc,
            cluster: a.string().optional()
        }),
        Fl = a.object({
            verifiableIdentity: yc
        }),
        jl = a.object({
            signPayloads: mc,
            minContextSlot: a.number()
        }),
        Hl = a.object({
            signPayloads: mc
        }),
        Kl = a.object({
            signPayloads: mc
        }),
        uV = a.union([Dl, Fl, jl, Hl, Kl]),
        Wl = a.union([a.object({
            type: a.literal("AUTHORIZE_SUCCESS"),
            publicKey: a.string(),
            accountLabel: a.string().optional(),
            walletUriBase: a.string().optional(),
            scope: a.string().optional()
        }), a.object({
            type: a.literal("AUTHORIZE_DECLINE")
        })]),
        Vl = a.union([a.object({
            type: a.literal("REAUTHORIZE_SUCCESS")
        }), a.object({
            type: a.literal("REAUTHORIZE_DECLINE")
        })]),
        Hi = a.union([a.object({
            type: a.literal("SIGN_PAYLOADS_SUCCESS"),
            signedPayloads: a.array(a.string())
        }), a.object({
            type: a.literal("SIGN_PAYLOADS_DECLINE")
        }), a.object({
            type: a.literal("SIGN_PAYLOADS_ERROR_INVALID_PAYLOADS"),
            valid: a.array(a.boolean())
        }), a.object({
            type: a.literal("SIGN_PAYLOADS_ERROR_AUTHORIZATION_NOT_VALID")
        }), a.object({
            type: a.literal("SIGN_PAYLOADS_ERROR_TOO_MANY_PAYLOADS")
        })]),
        Gl = a.union([a.object({
            type: a.literal("SIGN_AND_SEND_TRANSACTIONS_SUCCESS"),
            signedPayloads: a.array(a.string())
        }), a.object({
            type: a.literal("SIGN_AND_SEND_TRANSACTIONS_DECLINE")
        }), a.object({
            type: a.literal("SIGN_AND_SEND_TRANSACTIONS_ERROR_INVALID_PAYLOADS"),
            valid: a.array(a.boolean())
        }), a.object({
            type: a.literal("SIGN_AND_SEND_TRANSACTIONS_ERROR_NOT_SUBMITTED"),
            signatures: a.array(a.string())
        }), a.object({
            type: a.literal("SIGN_AND_SEND_TRANSACTIONS_ERROR_TOO_MANY_PAYLOADS")
        }), a.object({
            type: a.literal("SIGN_AND_SEND_TRANSACTIONS_ERROR_AUTHORIZATION_NOT_VALID")
        })]),
        MM = a.union([Wl, Vl, Hi, Gl])
    }
    );
    var LM, NM, CM, OM, mV, gV, mv = C( () => {
        "use strict";
        h();
        K();
        G();
        ds();
        V();
        LM = a.literal("sol_mwa_authorize"),
        NM = Dl,
        CM = Wl,
        OM = B,
        mV = T(LM, NM),
        gV = P(CM, OM)
    }
    );
    var UM, DM, FM, jM, EV, _V, gv = C( () => {
        "use strict";
        h();
        K();
        G();
        ds();
        V();
        UM = a.literal("sol_mwa_reauthorize"),
        DM = Fl,
        FM = Vl,
        jM = B,
        EV = T(UM, DM),
        _V = P(FM, jM)
    }
    );
    var KM, WM, VM, GM, TV, PV, xv = C( () => {
        "use strict";
        h();
        K();
        G();
        ds();
        V();
        KM = a.literal("sol_mwa_sign_transactions"),
        WM = Hl,
        VM = Hi,
        GM = B,
        TV = T(KM, WM),
        PV = P(VM, GM)
    }
    );
    var YM, $M, JM, XM, OV, qV, wv = C( () => {
        "use strict";
        h();
        K();
        G();
        ds();
        V();
        YM = a.literal("sol_mwa_sign_messages"),
        $M = Kl,
        JM = Hi,
        XM = B,
        OV = T(YM, $M),
        qV = P(JM, XM)
    }
    );
    var e3, t3, r3, n3, KV, WV, bv = C( () => {
        "use strict";
        h();
        K();
        G();
        ds();
        V();
        e3 = a.literal("sol_mwa_sign_and_send_transactions"),
        t3 = jl,
        r3 = Gl,
        n3 = B,
        KV = T(e3, t3),
        WV = P(r3, n3)
    }
    );
    var Sv = C( () => {
        "use strict";
        h();
        mv();
        gv();
        xv();
        wv();
        bv()
    }
    );
    function Ev(r) {
        var e, t, n, o = W.prototype = {
            constructor: W,
            toString: null,
            valueOf: null
        }, s = new W(1), i = 20, u = 4, f = -7, g = 21, b = -1e7, E = 1e7, q = !1, O = 1, Z = 0, ee = {
            prefix: "",
            groupSize: 3,
            secondaryGroupSize: 0,
            groupSeparator: ",",
            decimalSeparator: ".",
            fractionGroupSize: 0,
            fractionGroupSeparator: "\xA0",
            suffix: ""
        }, X = "0123456789abcdefghijklmnopqrstuvwxyz", le = !0;
        function W(_, R) {
            var N, D, z, m, c, p, d, y, x = this;
            if (!(x instanceof W))
                return new W(_,R);
            if (R == null) {
                if (_ && _._isBigNumber === !0) {
                    x.s = _.s,
                    !_.c || _.e > E ? x.c = x.e = null : _.e < b ? x.c = [x.e = 0] : (x.e = _.e,
                    x.c = _.c.slice());
                    return
                }
                if ((p = typeof _ == "number") && _ * 0 == 0) {
                    if (x.s = 1 / _ < 0 ? (_ = -_,
                    -1) : 1,
                    _ === ~~_) {
                        for (m = 0,
                        c = _; c >= 10; c /= 10,
                        m++)
                            ;
                        m > E ? x.c = x.e = null : (x.e = m,
                        x.c = [_]);
                        return
                    }
                    y = String(_)
                } else {
                    if (!i3.test(y = String(_)))
                        return n(x, y, p);
                    x.s = y.charCodeAt(0) == 45 ? (y = y.slice(1),
                    -1) : 1
                }
                (m = y.indexOf(".")) > -1 && (y = y.replace(".", "")),
                (c = y.search(/e/i)) > 0 ? (m < 0 && (m = c),
                m += +y.slice(c + 1),
                y = y.substring(0, c)) : m < 0 && (m = y.length)
            } else {
                if (Ut(R, 2, X.length, "Base"),
                R == 10 && le)
                    return x = new W(_),
                    Re(x, i + x.e + 1, u);
                if (y = String(_),
                p = typeof _ == "number") {
                    if (_ * 0 != 0)
                        return n(x, y, p, R);
                    if (x.s = 1 / _ < 0 ? (y = y.slice(1),
                    -1) : 1,
                    W.DEBUG && y.replace(/^0\.0*|\./, "").length > 15)
                        throw Error(vv + _)
                } else
                    x.s = y.charCodeAt(0) === 45 ? (y = y.slice(1),
                    -1) : 1;
                for (N = X.slice(0, R),
                m = c = 0,
                d = y.length; c < d; c++)
                    if (N.indexOf(D = y.charAt(c)) < 0) {
                        if (D == ".") {
                            if (c > m) {
                                m = d;
                                continue
                            }
                        } else if (!z && (y == y.toUpperCase() && (y = y.toLowerCase()) || y == y.toLowerCase() && (y = y.toUpperCase()))) {
                            z = !0,
                            c = -1,
                            m = 0;
                            continue
                        }
                        return n(x, String(_), p, R)
                    }
                p = !1,
                y = t(y, R, 10, x.s),
                (m = y.indexOf(".")) > -1 ? y = y.replace(".", "") : m = y.length
            }
            for (c = 0; y.charCodeAt(c) === 48; c++)
                ;
            for (d = y.length; y.charCodeAt(--d) === 48; )
                ;
            if (y = y.slice(c, ++d)) {
                if (d -= c,
                p && W.DEBUG && d > 15 && (_ > Yl || _ !== un(_)))
                    throw Error(vv + x.s * _);
                if ((m = m - c - 1) > E)
                    x.c = x.e = null;
                else if (m < b)
                    x.c = [x.e = 0];
                else {
                    if (x.e = m,
                    x.c = [],
                    c = (m + 1) % Le,
                    m < 0 && (c += Le),
                    c < d) {
                        for (c && x.c.push(+y.slice(0, c)),
                        d -= Le; c < d; )
                            x.c.push(+y.slice(c, c += Le));
                        c = Le - (y = y.slice(c)).length
                    } else
                        c -= d;
                    for (; c--; y += "0")
                        ;
                    x.c.push(+y)
                }
            } else
                x.c = [x.e = 0]
        }
        W.clone = Ev,
        W.ROUND_UP = 0,
        W.ROUND_DOWN = 1,
        W.ROUND_CEIL = 2,
        W.ROUND_FLOOR = 3,
        W.ROUND_HALF_UP = 4,
        W.ROUND_HALF_DOWN = 5,
        W.ROUND_HALF_EVEN = 6,
        W.ROUND_HALF_CEIL = 7,
        W.ROUND_HALF_FLOOR = 8,
        W.EUCLID = 9,
        W.config = W.set = function(_) {
            var R, N;
            if (_ != null)
                if (typeof _ == "object") {
                    if (_.hasOwnProperty(R = "DECIMAL_PLACES") && (N = _[R],
                    Ut(N, 0, Gt, R),
                    i = N),
                    _.hasOwnProperty(R = "ROUNDING_MODE") && (N = _[R],
                    Ut(N, 0, 8, R),
                    u = N),
                    _.hasOwnProperty(R = "EXPONENTIAL_AT") && (N = _[R],
                    N && N.pop ? (Ut(N[0], -Gt, 0, R),
                    Ut(N[1], 0, Gt, R),
                    f = N[0],
                    g = N[1]) : (Ut(N, -Gt, Gt, R),
                    f = -(g = N < 0 ? -N : N))),
                    _.hasOwnProperty(R = "RANGE"))
                        if (N = _[R],
                        N && N.pop)
                            Ut(N[0], -Gt, -1, R),
                            Ut(N[1], 1, Gt, R),
                            b = N[0],
                            E = N[1];
                        else if (Ut(N, -Gt, Gt, R),
                        N)
                            b = -(E = N < 0 ? -N : N);
                        else
                            throw Error(gr + R + " cannot be zero: " + N);
                    if (_.hasOwnProperty(R = "CRYPTO"))
                        if (N = _[R],
                        N === !!N)
                            if (N)
                                if (typeof crypto < "u" && crypto && (crypto.getRandomValues || crypto.randomBytes))
                                    q = N;
                                else
                                    throw q = !N,
                                    Error(gr + "crypto unavailable");
                            else
                                q = N;
                        else
                            throw Error(gr + R + " not true or false: " + N);
                    if (_.hasOwnProperty(R = "MODULO_MODE") && (N = _[R],
                    Ut(N, 0, 9, R),
                    O = N),
                    _.hasOwnProperty(R = "POW_PRECISION") && (N = _[R],
                    Ut(N, 0, Gt, R),
                    Z = N),
                    _.hasOwnProperty(R = "FORMAT"))
                        if (N = _[R],
                        typeof N == "object")
                            ee = N;
                        else
                            throw Error(gr + R + " not an object: " + N);
                    if (_.hasOwnProperty(R = "ALPHABET"))
                        if (N = _[R],
                        typeof N == "string" && !/^.?$|[+\-.\s]|(.).*\1/.test(N))
                            le = N.slice(0, 10) == "0123456789",
                            X = N;
                        else
                            throw Error(gr + R + " invalid: " + N)
                } else
                    throw Error(gr + "Object expected: " + _);
            return {
                DECIMAL_PLACES: i,
                ROUNDING_MODE: u,
                EXPONENTIAL_AT: [f, g],
                RANGE: [b, E],
                CRYPTO: q,
                MODULO_MODE: O,
                POW_PRECISION: Z,
                FORMAT: ee,
                ALPHABET: X
            }
        }
        ,
        W.isBigNumber = function(_) {
            if (!_ || _._isBigNumber !== !0)
                return !1;
            if (!W.DEBUG)
                return !0;
            var R, N, D = _.c, z = _.e, m = _.s;
            e: if ({}.toString.call(D) == "[object Array]") {
                if ((m === 1 || m === -1) && z >= -Gt && z <= Gt && z === un(z)) {
                    if (D[0] === 0) {
                        if (z === 0 && D.length === 1)
                            return !0;
                        break e
                    }
                    if (R = (z + 1) % Le,
                    R < 1 && (R += Le),
                    String(D[0]).length == R) {
                        for (R = 0; R < D.length; R++)
                            if (N = D[R],
                            N < 0 || N >= Hr || N !== un(N))
                                break e;
                        if (N !== 0)
                            return !0
                    }
                }
            } else if (D === null && z === null && (m === null || m === 1 || m === -1))
                return !0;
            throw Error(gr + "Invalid BigNumber: " + _)
        }
        ,
        W.maximum = W.max = function() {
            return ze(arguments, o.lt)
        }
        ,
        W.minimum = W.min = function() {
            return ze(arguments, o.gt)
        }
        ,
        W.random = function() {
            var _ = 9007199254740992
              , R = Math.random() * _ & 2097151 ? function() {
                return un(Math.random() * _)
            }
            : function() {
                return (Math.random() * 1073741824 | 0) * 8388608 + (Math.random() * 8388608 | 0)
            }
            ;
            return function(N) {
                var D, z, m, c, p, d = 0, y = [], x = new W(s);
                if (N == null ? N = i : Ut(N, 0, Gt),
                c = Zl(N / Le),
                q)
                    if (crypto.getRandomValues) {
                        for (D = crypto.getRandomValues(new Uint32Array(c *= 2)); d < c; )
                            p = D[d] * 131072 + (D[d + 1] >>> 11),
                            p >= 9e15 ? (z = crypto.getRandomValues(new Uint32Array(2)),
                            D[d] = z[0],
                            D[d + 1] = z[1]) : (y.push(p % 1e14),
                            d += 2);
                        d = c / 2
                    } else if (crypto.randomBytes) {
                        for (D = crypto.randomBytes(c *= 7); d < c; )
                            p = (D[d] & 31) * 281474976710656 + D[d + 1] * 1099511627776 + D[d + 2] * 4294967296 + D[d + 3] * 16777216 + (D[d + 4] << 16) + (D[d + 5] << 8) + D[d + 6],
                            p >= 9e15 ? crypto.randomBytes(7).copy(D, d) : (y.push(p % 1e14),
                            d += 7);
                        d = c / 7
                    } else
                        throw q = !1,
                        Error(gr + "crypto unavailable");
                if (!q)
                    for (; d < c; )
                        p = R(),
                        p < 9e15 && (y[d++] = p % 1e14);
                for (c = y[--d],
                N %= Le,
                c && N && (p = $l[Le - N],
                y[d] = un(c / p) * p); y[d] === 0; y.pop(),
                d--)
                    ;
                if (d < 0)
                    y = [m = 0];
                else {
                    for (m = -1; y[0] === 0; y.splice(0, 1),
                    m -= Le)
                        ;
                    for (d = 1,
                    p = y[0]; p >= 10; p /= 10,
                    d++)
                        ;
                    d < Le && (m -= Le - d)
                }
                return x.e = m,
                x.c = y,
                x
            }
        }(),
        W.sum = function() {
            for (var _ = 1, R = arguments, N = new W(R[0]); _ < R.length; )
                N = N.plus(R[_++]);
            return N
        }
        ,
        t = function() {
            var _ = "0123456789";
            function R(N, D, z, m) {
                for (var c, p = [0], d, y = 0, x = N.length; y < x; ) {
                    for (d = p.length; d--; p[d] *= D)
                        ;
                    for (p[0] += m.indexOf(N.charAt(y++)),
                    c = 0; c < p.length; c++)
                        p[c] > z - 1 && (p[c + 1] == null && (p[c + 1] = 0),
                        p[c + 1] += p[c] / z | 0,
                        p[c] %= z)
                }
                return p.reverse()
            }
            return function(N, D, z, m, c) {
                var p, d, y, x, v, M, S, l, k = N.indexOf("."), se = i, w = u;
                for (k >= 0 && (x = Z,
                Z = 0,
                N = N.replace(".", ""),
                l = new W(D),
                M = l.pow(N.length - k),
                Z = x,
                l.c = R(Rn(Lr(M.c), M.e, "0"), 10, z, _),
                l.e = l.c.length),
                S = R(N, D, z, c ? (p = X,
                _) : (p = _,
                X)),
                y = x = S.length; S[--x] == 0; S.pop())
                    ;
                if (!S[0])
                    return p.charAt(0);
                if (k < 0 ? --y : (M.c = S,
                M.e = y,
                M.s = m,
                M = e(M, l, se, w, z),
                S = M.c,
                v = M.r,
                y = M.e),
                d = y + se + 1,
                k = S[d],
                x = z / 2,
                v = v || d < 0 || S[d + 1] != null,
                v = w < 4 ? (k != null || v) && (w == 0 || w == (M.s < 0 ? 3 : 2)) : k > x || k == x && (w == 4 || v || w == 6 && S[d - 1] & 1 || w == (M.s < 0 ? 8 : 7)),
                d < 1 || !S[0])
                    N = v ? Rn(p.charAt(1), -se, p.charAt(0)) : p.charAt(0);
                else {
                    if (S.length = d,
                    v)
                        for (--z; ++S[--d] > z; )
                            S[d] = 0,
                            d || (++y,
                            S = [1].concat(S));
                    for (x = S.length; !S[--x]; )
                        ;
                    for (k = 0,
                    N = ""; k <= x; N += p.charAt(S[k++]))
                        ;
                    N = Rn(N, y, p.charAt(0))
                }
                return N
            }
        }(),
        e = function() {
            function _(D, z, m) {
                var c, p, d, y, x = 0, v = D.length, M = z % Qn, S = z / Qn | 0;
                for (D = D.slice(); v--; )
                    d = D[v] % Qn,
                    y = D[v] / Qn | 0,
                    c = S * d + y * M,
                    p = M * d + c % Qn * Qn + x,
                    x = (p / m | 0) + (c / Qn | 0) + S * y,
                    D[v] = p % m;
                return x && (D = [x].concat(D)),
                D
            }
            function R(D, z, m, c) {
                var p, d;
                if (m != c)
                    d = m > c ? 1 : -1;
                else
                    for (p = d = 0; p < m; p++)
                        if (D[p] != z[p]) {
                            d = D[p] > z[p] ? 1 : -1;
                            break
                        }
                return d
            }
            function N(D, z, m, c) {
                for (var p = 0; m--; )
                    D[m] -= p,
                    p = D[m] < z[m] ? 1 : 0,
                    D[m] = p * c + D[m] - z[m];
                for (; !D[0] && D.length > 1; D.splice(0, 1))
                    ;
            }
            return function(D, z, m, c, p) {
                var d, y, x, v, M, S, l, k, se, w, U, F, Q, oe, we, ae, ce, Ue = D.s == z.s ? 1 : -1, ue = D.c, me = z.c;
                if (!ue || !ue[0] || !me || !me[0])
                    return new W(!D.s || !z.s || (ue ? me && ue[0] == me[0] : !me) ? NaN : ue && ue[0] == 0 || !me ? Ue * 0 : Ue / 0);
                for (k = new W(Ue),
                se = k.c = [],
                y = D.e - z.e,
                Ue = m + y + 1,
                p || (p = Hr,
                y = Nr(D.e / Le) - Nr(z.e / Le),
                Ue = Ue / Le | 0),
                x = 0; me[x] == (ue[x] || 0); x++)
                    ;
                if (me[x] > (ue[x] || 0) && y--,
                Ue < 0)
                    se.push(1),
                    v = !0;
                else {
                    for (oe = ue.length,
                    ae = me.length,
                    x = 0,
                    Ue += 2,
                    M = un(p / (me[0] + 1)),
                    M > 1 && (me = _(me, M, p),
                    ue = _(ue, M, p),
                    ae = me.length,
                    oe = ue.length),
                    Q = ae,
                    w = ue.slice(0, ae),
                    U = w.length; U < ae; w[U++] = 0)
                        ;
                    ce = me.slice(),
                    ce = [0].concat(ce),
                    we = me[0],
                    me[1] >= p / 2 && we++;
                    do {
                        if (M = 0,
                        d = R(me, w, ae, U),
                        d < 0) {
                            if (F = w[0],
                            ae != U && (F = F * p + (w[1] || 0)),
                            M = un(F / we),
                            M > 1)
                                for (M >= p && (M = p - 1),
                                S = _(me, M, p),
                                l = S.length,
                                U = w.length; R(S, w, l, U) == 1; )
                                    M--,
                                    N(S, ae < l ? ce : me, l, p),
                                    l = S.length,
                                    d = 1;
                            else
                                M == 0 && (d = M = 1),
                                S = me.slice(),
                                l = S.length;
                            if (l < U && (S = [0].concat(S)),
                            N(w, S, U, p),
                            U = w.length,
                            d == -1)
                                for (; R(me, w, ae, U) < 1; )
                                    M++,
                                    N(w, ae < U ? ce : me, U, p),
                                    U = w.length
                        } else
                            d === 0 && (M++,
                            w = [0]);
                        se[x++] = M,
                        w[0] ? w[U++] = ue[Q] || 0 : (w = [ue[Q]],
                        U = 1)
                    } while ((Q++ < oe || w[0] != null) && Ue--);
                    v = w[0] != null,
                    se[0] || se.splice(0, 1)
                }
                if (p == Hr) {
                    for (x = 1,
                    Ue = se[0]; Ue >= 10; Ue /= 10,
                    x++)
                        ;
                    Re(k, m + (k.e = x + y * Le - 1) + 1, c, v)
                } else
                    k.e = y,
                    k.r = +v;
                return k
            }
        }();
        function Se(_, R, N, D) {
            var z, m, c, p, d;
            if (N == null ? N = u : Ut(N, 0, 8),
            !_.c)
                return _.toString();
            if (z = _.c[0],
            c = _.e,
            R == null)
                d = Lr(_.c),
                d = D == 1 || D == 2 && (c <= f || c >= g) ? xc(d, c) : Rn(d, c, "0");
            else if (_ = Re(new W(_), R, N),
            m = _.e,
            d = Lr(_.c),
            p = d.length,
            D == 1 || D == 2 && (R <= m || m <= f)) {
                for (; p < R; d += "0",
                p++)
                    ;
                d = xc(d, m)
            } else if (R -= c,
            d = Rn(d, m, "0"),
            m + 1 > p) {
                if (--R > 0)
                    for (d += "."; R--; d += "0")
                        ;
            } else if (R += m - p,
            R > 0)
                for (m + 1 == p && (d += "."); R--; d += "0")
                    ;
            return _.s < 0 && z ? "-" + d : d
        }
        function ze(_, R) {
            for (var N, D = 1, z = new W(_[0]); D < _.length; D++)
                if (N = new W(_[D]),
                N.s)
                    R.call(z, N) && (z = N);
                else {
                    z = N;
                    break
                }
            return z
        }
        function Oe(_, R, N) {
            for (var D = 1, z = R.length; !R[--z]; R.pop())
                ;
            for (z = R[0]; z >= 10; z /= 10,
            D++)
                ;
            return (N = D + N * Le - 1) > E ? _.c = _.e = null : N < b ? _.c = [_.e = 0] : (_.e = N,
            _.c = R),
            _
        }
        n = function() {
            var _ = /^(-?)0([xbo])(?=\w[\w.]*$)/i
              , R = /^([^.]+)\.$/
              , N = /^\.([^.]+)$/
              , D = /^-?(Infinity|NaN)$/
              , z = /^\s*\+(?=[\w.])|^\s+|\s+$/g;
            return function(m, c, p, d) {
                var y, x = p ? c : c.replace(z, "");
                if (D.test(x))
                    m.s = isNaN(x) ? null : x < 0 ? -1 : 1;
                else {
                    if (!p && (x = x.replace(_, function(v, M, S) {
                        return y = (S = S.toLowerCase()) == "x" ? 16 : S == "b" ? 2 : 8,
                        !d || d == y ? M : v
                    }),
                    d && (y = d,
                    x = x.replace(R, "$1").replace(N, "0.$1")),
                    c != x))
                        return new W(x,y);
                    if (W.DEBUG)
                        throw Error(gr + "Not a" + (d ? " base " + d : "") + " number: " + c);
                    m.s = null
                }
                m.c = m.e = null
            }
        }();
        function Re(_, R, N, D) {
            var z, m, c, p, d, y, x, v = _.c, M = $l;
            if (v) {
                e: {
                    for (z = 1,
                    p = v[0]; p >= 10; p /= 10,
                    z++)
                        ;
                    if (m = R - z,
                    m < 0)
                        m += Le,
                        c = R,
                        d = v[y = 0],
                        x = d / M[z - c - 1] % 10 | 0;
                    else if (y = Zl((m + 1) / Le),
                    y >= v.length)
                        if (D) {
                            for (; v.length <= y; v.push(0))
                                ;
                            d = x = 0,
                            z = 1,
                            m %= Le,
                            c = m - Le + 1
                        } else
                            break e;
                    else {
                        for (d = p = v[y],
                        z = 1; p >= 10; p /= 10,
                        z++)
                            ;
                        m %= Le,
                        c = m - Le + z,
                        x = c < 0 ? 0 : d / M[z - c - 1] % 10 | 0
                    }
                    if (D = D || R < 0 || v[y + 1] != null || (c < 0 ? d : d % M[z - c - 1]),
                    D = N < 4 ? (x || D) && (N == 0 || N == (_.s < 0 ? 3 : 2)) : x > 5 || x == 5 && (N == 4 || D || N == 6 && (m > 0 ? c > 0 ? d / M[z - c] : 0 : v[y - 1]) % 10 & 1 || N == (_.s < 0 ? 8 : 7)),
                    R < 1 || !v[0])
                        return v.length = 0,
                        D ? (R -= _.e + 1,
                        v[0] = M[(Le - R % Le) % Le],
                        _.e = -R || 0) : v[0] = _.e = 0,
                        _;
                    if (m == 0 ? (v.length = y,
                    p = 1,
                    y--) : (v.length = y + 1,
                    p = M[Le - m],
                    v[y] = c > 0 ? un(d / M[z - c] % M[c]) * p : 0),
                    D)
                        for (; ; )
                            if (y == 0) {
                                for (m = 1,
                                c = v[0]; c >= 10; c /= 10,
                                m++)
                                    ;
                                for (c = v[0] += p,
                                p = 1; c >= 10; c /= 10,
                                p++)
                                    ;
                                m != p && (_.e++,
                                v[0] == Hr && (v[0] = 1));
                                break
                            } else {
                                if (v[y] += p,
                                v[y] != Hr)
                                    break;
                                v[y--] = 0,
                                p = 1
                            }
                    for (m = v.length; v[--m] === 0; v.pop())
                        ;
                }
                _.e > E ? _.c = _.e = null : _.e < b && (_.c = [_.e = 0])
            }
            return _
        }
        function Fe(_) {
            var R, N = _.e;
            return N === null ? _.toString() : (R = Lr(_.c),
            R = N <= f || N >= g ? xc(R, N) : Rn(R, N, "0"),
            _.s < 0 ? "-" + R : R)
        }
        return o.absoluteValue = o.abs = function() {
            var _ = new W(this);
            return _.s < 0 && (_.s = 1),
            _
        }
        ,
        o.comparedTo = function(_, R) {
            return Zs(this, new W(_,R))
        }
        ,
        o.decimalPlaces = o.dp = function(_, R) {
            var N, D, z, m = this;
            if (_ != null)
                return Ut(_, 0, Gt),
                R == null ? R = u : Ut(R, 0, 8),
                Re(new W(m), _ + m.e + 1, R);
            if (!(N = m.c))
                return null;
            if (D = ((z = N.length - 1) - Nr(this.e / Le)) * Le,
            z = N[z])
                for (; z % 10 == 0; z /= 10,
                D--)
                    ;
            return D < 0 && (D = 0),
            D
        }
        ,
        o.dividedBy = o.div = function(_, R) {
            return e(this, new W(_,R), i, u)
        }
        ,
        o.dividedToIntegerBy = o.idiv = function(_, R) {
            return e(this, new W(_,R), 0, 1)
        }
        ,
        o.exponentiatedBy = o.pow = function(_, R) {
            var N, D, z, m, c, p, d, y, x, v = this;
            if (_ = new W(_),
            _.c && !_.isInteger())
                throw Error(gr + "Exponent not an integer: " + Fe(_));
            if (R != null && (R = new W(R)),
            p = _.e > 14,
            !v.c || !v.c[0] || v.c[0] == 1 && !v.e && v.c.length == 1 || !_.c || !_.c[0])
                return x = new W(Math.pow(+Fe(v), p ? _.s * (2 - gc(_)) : +Fe(_))),
                R ? x.mod(R) : x;
            if (d = _.s < 0,
            R) {
                if (R.c ? !R.c[0] : !R.s)
                    return new W(NaN);
                D = !d && v.isInteger() && R.isInteger(),
                D && (v = v.mod(R))
            } else {
                if (_.e > 9 && (v.e > 0 || v.e < -1 || (v.e == 0 ? v.c[0] > 1 || p && v.c[1] >= 24e7 : v.c[0] < 8e13 || p && v.c[0] <= 9999975e7)))
                    return m = v.s < 0 && gc(_) ? -0 : 0,
                    v.e > -1 && (m = 1 / m),
                    new W(d ? 1 / m : m);
                Z && (m = Zl(Z / Le + 2))
            }
            for (p ? (N = new W(.5),
            d && (_.s = 1),
            y = gc(_)) : (z = Math.abs(+Fe(_)),
            y = z % 2),
            x = new W(s); ; ) {
                if (y) {
                    if (x = x.times(v),
                    !x.c)
                        break;
                    m ? x.c.length > m && (x.c.length = m) : D && (x = x.mod(R))
                }
                if (z) {
                    if (z = un(z / 2),
                    z === 0)
                        break;
                    y = z % 2
                } else if (_ = _.times(N),
                Re(_, _.e + 1, 1),
                _.e > 14)
                    y = gc(_);
                else {
                    if (z = +Fe(_),
                    z === 0)
                        break;
                    y = z % 2
                }
                v = v.times(v),
                m ? v.c && v.c.length > m && (v.c.length = m) : D && (v = v.mod(R))
            }
            return D ? x : (d && (x = s.div(x)),
            R ? x.mod(R) : m ? Re(x, Z, u, c) : x)
        }
        ,
        o.integerValue = function(_) {
            var R = new W(this);
            return _ == null ? _ = u : Ut(_, 0, 8),
            Re(R, R.e + 1, _)
        }
        ,
        o.isEqualTo = o.eq = function(_, R) {
            return Zs(this, new W(_,R)) === 0
        }
        ,
        o.isFinite = function() {
            return !!this.c
        }
        ,
        o.isGreaterThan = o.gt = function(_, R) {
            return Zs(this, new W(_,R)) > 0
        }
        ,
        o.isGreaterThanOrEqualTo = o.gte = function(_, R) {
            return (R = Zs(this, new W(_,R))) === 1 || R === 0
        }
        ,
        o.isInteger = function() {
            return !!this.c && Nr(this.e / Le) > this.c.length - 2
        }
        ,
        o.isLessThan = o.lt = function(_, R) {
            return Zs(this, new W(_,R)) < 0
        }
        ,
        o.isLessThanOrEqualTo = o.lte = function(_, R) {
            return (R = Zs(this, new W(_,R))) === -1 || R === 0
        }
        ,
        o.isNaN = function() {
            return !this.s
        }
        ,
        o.isNegative = function() {
            return this.s < 0
        }
        ,
        o.isPositive = function() {
            return this.s > 0
        }
        ,
        o.isZero = function() {
            return !!this.c && this.c[0] == 0
        }
        ,
        o.minus = function(_, R) {
            var N, D, z, m, c = this, p = c.s;
            if (_ = new W(_,R),
            R = _.s,
            !p || !R)
                return new W(NaN);
            if (p != R)
                return _.s = -R,
                c.plus(_);
            var d = c.e / Le
              , y = _.e / Le
              , x = c.c
              , v = _.c;
            if (!d || !y) {
                if (!x || !v)
                    return x ? (_.s = -R,
                    _) : new W(v ? c : NaN);
                if (!x[0] || !v[0])
                    return v[0] ? (_.s = -R,
                    _) : new W(x[0] ? c : u == 3 ? -0 : 0)
            }
            if (d = Nr(d),
            y = Nr(y),
            x = x.slice(),
            p = d - y) {
                for ((m = p < 0) ? (p = -p,
                z = x) : (y = d,
                z = v),
                z.reverse(),
                R = p; R--; z.push(0))
                    ;
                z.reverse()
            } else
                for (D = (m = (p = x.length) < (R = v.length)) ? p : R,
                p = R = 0; R < D; R++)
                    if (x[R] != v[R]) {
                        m = x[R] < v[R];
                        break
                    }
            if (m && (z = x,
            x = v,
            v = z,
            _.s = -_.s),
            R = (D = v.length) - (N = x.length),
            R > 0)
                for (; R--; x[N++] = 0)
                    ;
            for (R = Hr - 1; D > p; ) {
                if (x[--D] < v[D]) {
                    for (N = D; N && !x[--N]; x[N] = R)
                        ;
                    --x[N],
                    x[D] += Hr
                }
                x[D] -= v[D]
            }
            for (; x[0] == 0; x.splice(0, 1),
            --y)
                ;
            return x[0] ? Oe(_, x, y) : (_.s = u == 3 ? -1 : 1,
            _.c = [_.e = 0],
            _)
        }
        ,
        o.modulo = o.mod = function(_, R) {
            var N, D, z = this;
            return _ = new W(_,R),
            !z.c || !_.s || _.c && !_.c[0] ? new W(NaN) : !_.c || z.c && !z.c[0] ? new W(z) : (O == 9 ? (D = _.s,
            _.s = 1,
            N = e(z, _, 0, 3),
            _.s = D,
            N.s *= D) : N = e(z, _, 0, O),
            _ = z.minus(N.times(_)),
            !_.c[0] && O == 1 && (_.s = z.s),
            _)
        }
        ,
        o.multipliedBy = o.times = function(_, R) {
            var N, D, z, m, c, p, d, y, x, v, M, S, l, k, se, w = this, U = w.c, F = (_ = new W(_,R)).c;
            if (!U || !F || !U[0] || !F[0])
                return !w.s || !_.s || U && !U[0] && !F || F && !F[0] && !U ? _.c = _.e = _.s = null : (_.s *= w.s,
                !U || !F ? _.c = _.e = null : (_.c = [0],
                _.e = 0)),
                _;
            for (D = Nr(w.e / Le) + Nr(_.e / Le),
            _.s *= w.s,
            d = U.length,
            v = F.length,
            d < v && (l = U,
            U = F,
            F = l,
            z = d,
            d = v,
            v = z),
            z = d + v,
            l = []; z--; l.push(0))
                ;
            for (k = Hr,
            se = Qn,
            z = v; --z >= 0; ) {
                for (N = 0,
                M = F[z] % se,
                S = F[z] / se | 0,
                c = d,
                m = z + c; m > z; )
                    y = U[--c] % se,
                    x = U[c] / se | 0,
                    p = S * y + x * M,
                    y = M * y + p % se * se + l[m] + N,
                    N = (y / k | 0) + (p / se | 0) + S * x,
                    l[m--] = y % k;
                l[m] = N
            }
            return N ? ++D : l.splice(0, 1),
            Oe(_, l, D)
        }
        ,
        o.negated = function() {
            var _ = new W(this);
            return _.s = -_.s || null,
            _
        }
        ,
        o.plus = function(_, R) {
            var N, D = this, z = D.s;
            if (_ = new W(_,R),
            R = _.s,
            !z || !R)
                return new W(NaN);
            if (z != R)
                return _.s = -R,
                D.minus(_);
            var m = D.e / Le
              , c = _.e / Le
              , p = D.c
              , d = _.c;
            if (!m || !c) {
                if (!p || !d)
                    return new W(z / 0);
                if (!p[0] || !d[0])
                    return d[0] ? _ : new W(p[0] ? D : z * 0)
            }
            if (m = Nr(m),
            c = Nr(c),
            p = p.slice(),
            z = m - c) {
                for (z > 0 ? (c = m,
                N = d) : (z = -z,
                N = p),
                N.reverse(); z--; N.push(0))
                    ;
                N.reverse()
            }
            for (z = p.length,
            R = d.length,
            z - R < 0 && (N = d,
            d = p,
            p = N,
            R = z),
            z = 0; R; )
                z = (p[--R] = p[R] + d[R] + z) / Hr | 0,
                p[R] = Hr === p[R] ? 0 : p[R] % Hr;
            return z && (p = [z].concat(p),
            ++c),
            Oe(_, p, c)
        }
        ,
        o.precision = o.sd = function(_, R) {
            var N, D, z, m = this;
            if (_ != null && _ !== !!_)
                return Ut(_, 1, Gt),
                R == null ? R = u : Ut(R, 0, 8),
                Re(new W(m), _, R);
            if (!(N = m.c))
                return null;
            if (z = N.length - 1,
            D = z * Le + 1,
            z = N[z]) {
                for (; z % 10 == 0; z /= 10,
                D--)
                    ;
                for (z = N[0]; z >= 10; z /= 10,
                D++)
                    ;
            }
            return _ && m.e + 1 > D && (D = m.e + 1),
            D
        }
        ,
        o.shiftedBy = function(_) {
            return Ut(_, -Yl, Yl),
            this.times("1e" + _)
        }
        ,
        o.squareRoot = o.sqrt = function() {
            var _, R, N, D, z, m = this, c = m.c, p = m.s, d = m.e, y = i + 4, x = new W("0.5");
            if (p !== 1 || !c || !c[0])
                return new W(!p || p < 0 && (!c || c[0]) ? NaN : c ? m : 1 / 0);
            if (p = Math.sqrt(+Fe(m)),
            p == 0 || p == 1 / 0 ? (R = Lr(c),
            (R.length + d) % 2 == 0 && (R += "0"),
            p = Math.sqrt(+R),
            d = Nr((d + 1) / 2) - (d < 0 || d % 2),
            p == 1 / 0 ? R = "5e" + d : (R = p.toExponential(),
            R = R.slice(0, R.indexOf("e") + 1) + d),
            N = new W(R)) : N = new W(p + ""),
            N.c[0]) {
                for (d = N.e,
                p = d + y,
                p < 3 && (p = 0); ; )
                    if (z = N,
                    N = x.times(z.plus(e(m, z, y, 1))),
                    Lr(z.c).slice(0, p) === (R = Lr(N.c)).slice(0, p))
                        if (N.e < d && --p,
                        R = R.slice(p - 3, p + 1),
                        R == "9999" || !D && R == "4999") {
                            if (!D && (Re(z, z.e + i + 2, 0),
                            z.times(z).eq(m))) {
                                N = z;
                                break
                            }
                            y += 4,
                            p += 4,
                            D = 1
                        } else {
                            (!+R || !+R.slice(1) && R.charAt(0) == "5") && (Re(N, N.e + i + 2, 1),
                            _ = !N.times(N).eq(m));
                            break
                        }
            }
            return Re(N, N.e + i + 1, u, _)
        }
        ,
        o.toExponential = function(_, R) {
            return _ != null && (Ut(_, 0, Gt),
            _++),
            Se(this, _, R, 1)
        }
        ,
        o.toFixed = function(_, R) {
            return _ != null && (Ut(_, 0, Gt),
            _ = _ + this.e + 1),
            Se(this, _, R)
        }
        ,
        o.toFormat = function(_, R, N) {
            var D, z = this;
            if (N == null)
                _ != null && R && typeof R == "object" ? (N = R,
                R = null) : _ && typeof _ == "object" ? (N = _,
                _ = R = null) : N = ee;
            else if (typeof N != "object")
                throw Error(gr + "Argument not an object: " + N);
            if (D = z.toFixed(_, R),
            z.c) {
                var m, c = D.split("."), p = +N.groupSize, d = +N.secondaryGroupSize, y = N.groupSeparator || "", x = c[0], v = c[1], M = z.s < 0, S = M ? x.slice(1) : x, l = S.length;
                if (d && (m = p,
                p = d,
                d = m,
                l -= m),
                p > 0 && l > 0) {
                    for (m = l % p || p,
                    x = S.substr(0, m); m < l; m += p)
                        x += y + S.substr(m, p);
                    d > 0 && (x += y + S.slice(m)),
                    M && (x = "-" + x)
                }
                D = v ? x + (N.decimalSeparator || "") + ((d = +N.fractionGroupSize) ? v.replace(new RegExp("\\d{" + d + "}\\B","g"), "$&" + (N.fractionGroupSeparator || "")) : v) : x
            }
            return (N.prefix || "") + D + (N.suffix || "")
        }
        ,
        o.toFraction = function(_) {
            var R, N, D, z, m, c, p, d, y, x, v, M, S = this, l = S.c;
            if (_ != null && (p = new W(_),
            !p.isInteger() && (p.c || p.s !== 1) || p.lt(s)))
                throw Error(gr + "Argument " + (p.isInteger() ? "out of range: " : "not an integer: ") + Fe(p));
            if (!l)
                return new W(S);
            for (R = new W(s),
            y = N = new W(s),
            D = d = new W(s),
            M = Lr(l),
            m = R.e = M.length - S.e - 1,
            R.c[0] = $l[(c = m % Le) < 0 ? Le + c : c],
            _ = !_ || p.comparedTo(R) > 0 ? m > 0 ? R : y : p,
            c = E,
            E = 1 / 0,
            p = new W(M),
            d.c[0] = 0; x = e(p, R, 0, 1),
            z = N.plus(x.times(D)),
            z.comparedTo(_) != 1; )
                N = D,
                D = z,
                y = d.plus(x.times(z = y)),
                d = z,
                R = p.minus(x.times(z = R)),
                p = z;
            return z = e(_.minus(N), D, 0, 1),
            d = d.plus(z.times(y)),
            N = N.plus(z.times(D)),
            d.s = y.s = S.s,
            m = m * 2,
            v = e(y, D, m, u).minus(S).abs().comparedTo(e(d, N, m, u).minus(S).abs()) < 1 ? [y, D] : [d, N],
            E = c,
            v
        }
        ,
        o.toNumber = function() {
            return +Fe(this)
        }
        ,
        o.toPrecision = function(_, R) {
            return _ != null && Ut(_, 1, Gt),
            Se(this, _, R, 2)
        }
        ,
        o.toString = function(_) {
            var R, N = this, D = N.s, z = N.e;
            return z === null ? D ? (R = "Infinity",
            D < 0 && (R = "-" + R)) : R = "NaN" : (_ == null ? R = z <= f || z >= g ? xc(Lr(N.c), z) : Rn(Lr(N.c), z, "0") : _ === 10 && le ? (N = Re(new W(N), i + z + 1, u),
            R = Rn(Lr(N.c), N.e, "0")) : (Ut(_, 2, X.length, "Base"),
            R = t(Rn(Lr(N.c), z, "0"), 10, _, D, !0)),
            D < 0 && N.c[0] && (R = "-" + R)),
            R
        }
        ,
        o.valueOf = o.toJSON = function() {
            return Fe(this)
        }
        ,
        o._isBigNumber = !0,
        o[Symbol.toStringTag] = "BigNumber",
        o[Symbol.for("nodejs.util.inspect.custom")] = o.valueOf,
        r != null && W.set(r),
        W
    }
    function Nr(r) {
        var e = r | 0;
        return r > 0 || r === e ? e : e - 1
    }
    function Lr(r) {
        for (var e, t, n = 1, o = r.length, s = r[0] + ""; n < o; ) {
            for (e = r[n++] + "",
            t = Le - e.length; t--; e = "0" + e)
                ;
            s += e
        }
        for (o = s.length; s.charCodeAt(--o) === 48; )
            ;
        return s.slice(0, o + 1 || 1)
    }
    function Zs(r, e) {
        var t, n, o = r.c, s = e.c, i = r.s, u = e.s, f = r.e, g = e.e;
        if (!i || !u)
            return null;
        if (t = o && !o[0],
        n = s && !s[0],
        t || n)
            return t ? n ? 0 : -u : i;
        if (i != u)
            return i;
        if (t = i < 0,
        n = f == g,
        !o || !s)
            return n ? 0 : !o ^ t ? 1 : -1;
        if (!n)
            return f > g ^ t ? 1 : -1;
        for (u = (f = o.length) < (g = s.length) ? f : g,
        i = 0; i < u; i++)
            if (o[i] != s[i])
                return o[i] > s[i] ^ t ? 1 : -1;
        return f == g ? 0 : f > g ^ t ? 1 : -1
    }
    function Ut(r, e, t, n) {
        if (r < e || r > t || r !== un(r))
            throw Error(gr + (n || "Argument") + (typeof r == "number" ? r < e || r > t ? " out of range: " : " not an integer: " : " not a primitive number: ") + String(r))
    }
    function gc(r) {
        var e = r.c.length - 1;
        return Nr(r.e / Le) == e && r.c[e] % 2 != 0
    }
    function xc(r, e) {
        return (r.length > 1 ? r.charAt(0) + "." + r.slice(1) : r) + (e < 0 ? "e" : "e+") + e
    }
    function Rn(r, e, t) {
        var n, o;
        if (e < 0) {
            for (o = t + "."; ++e; o += t)
                ;
            r = o + r
        } else if (n = r.length,
        ++e > n) {
            for (o = t,
            e -= n; --e; o += t)
                ;
            r += o
        } else
            e < n && (r = r.slice(0, e) + "." + r.slice(e));
        return r
    }
    var i3, Zl, un, gr, vv, Hr, Le, Yl, $l, Qn, Gt, wc, _v, Jl = C( () => {
        h();
        i3 = /^-?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i,
        Zl = Math.ceil,
        un = Math.floor,
        gr = "[BigNumber Error] ",
        vv = gr + "Number primitive has more than 15 significant digits: ",
        Hr = 1e14,
        Le = 14,
        Yl = 9007199254740991,
        $l = [1, 10, 100, 1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9, 1e10, 1e11, 1e12, 1e13],
        Qn = 1e7,
        Gt = 1e9;
        wc = Ev(),
        _v = wc
    }
    );
    var a3, c3, u3, p3, eG, tG, Av = C( () => {
        "use strict";
        h();
        Jl();
        K();
        G();
        V();
        a3 = a.literal("sol_pay_transfer"),
        c3 = a.object({
            amount: a.instanceof(_v).optional(),
            recipient: a.string(),
            splToken: a.string().optional(),
            reference: a.array(a.string()).optional(),
            memo: a.string().optional(),
            label: a.string().optional(),
            message: a.string().optional()
        }),
        u3 = a.null(),
        p3 = B,
        eG = T(a3, c3),
        tG = P(u3, p3)
    }
    );
    var l3, d3, h3, y3, iG, aG, kv = C( () => {
        "use strict";
        h();
        K();
        G();
        V();
        l3 = a.literal("sol_pay_transaction"),
        d3 = a.object({
            link: a.string().url()
        }),
        h3 = a.null(),
        y3 = B,
        iG = T(l3, d3),
        aG = P(h3, y3)
    }
    );
    var Iv = C( () => {
        "use strict";
        h();
        Av();
        kv()
    }
    );
    var Xl = {};
    ie(Xl, {
        error: () => Pv,
        method: () => Rv,
        params: () => Bv,
        request: () => x3,
        response: () => w3,
        result: () => Tv
    });
    var Rv, Bv, Tv, Pv, x3, w3, zv = C( () => {
        "use strict";
        h();
        K();
        G();
        V();
        Rv = a.literal("sui_requestAccounts"),
        Bv = a.tuple([]),
        Tv = ps,
        Pv = B,
        x3 = T(Rv, Bv),
        w3 = P(Tv, Pv)
    }
    );
    var Ql = {};
    ie(Ql, {
        error: () => Cv,
        method: () => Mv,
        params: () => Lv,
        request: () => b3,
        response: () => S3,
        result: () => Nv
    });
    var Mv, Lv, Nv, Cv, b3, S3, Ov = C( () => {
        "use strict";
        h();
        K();
        G();
        V();
        Mv = a.literal("sui_signTransaction"),
        Lv = a.object({
            transaction: a.string(),
            address: a.string(),
            networkID: a.string()
        }),
        Nv = a.object({
            transaction: a.string(),
            signature: a.string()
        }),
        Cv = B,
        b3 = T(Mv, Lv),
        S3 = P(Nv, Cv)
    }
    );
    var ed = {};
    ie(ed, {
        error: () => Fv,
        method: () => qv,
        params: () => Uv,
        request: () => v3,
        response: () => E3,
        result: () => Dv
    });
    var qv, Uv, Dv, Fv, v3, E3, jv = C( () => {
        "use strict";
        h();
        K();
        G();
        V();
        qv = a.literal("sui_signMessage"),
        Uv = a.object({
            message: a.instanceof(Uint8Array),
            address: a.string()
        }),
        Dv = a.object({
            message: a.string(),
            signature: a.string()
        }),
        Fv = B,
        v3 = T(qv, Uv),
        E3 = P(Dv, Fv)
    }
    );
    var td = {};
    ie(td, {
        error: () => Vv,
        method: () => Hv,
        params: () => Kv,
        request: () => _3,
        response: () => A3,
        result: () => Wv
    });
    var Hv, Kv, Wv, Vv, _3, A3, Gv = C( () => {
        "use strict";
        h();
        K();
        G();
        V();
        Hv = a.literal("sui_signAndExecuteTransaction"),
        Kv = a.object({
            transaction: a.string(),
            address: a.string(),
            networkID: a.string()
        }),
        Wv = a.object({
            transaction: a.string(),
            signature: a.string(),
            digest: a.string(),
            effects: a.string()
        }),
        Vv = B,
        _3 = T(Hv, Kv),
        A3 = P(Wv, Vv)
    }
    );
    var bc = {};
    ie(bc, {
        sui_requestAccounts: () => Xl,
        sui_signAndExecuteTransaction: () => td,
        sui_signMessage: () => ed,
        sui_signTransaction: () => Ql
    });
    var Zv = C( () => {
        "use strict";
        h();
        zv();
        Ov();
        jv();
        Gv()
    }
    );
    var k3, I3, R3, B3, TG, PG, Yv = C( () => {
        "use strict";
        h();
        K();
        G();
        V();
        k3 = a.literal("user_approveBtcRequestAccounts"),
        I3 = a.tuple([Ae]),
        R3 = a.null(),
        B3 = B,
        TG = T(k3, I3),
        PG = P(R3, B3)
    }
    );
    var P3, z3, M3, L3, CG, OG, $v = C( () => {
        "use strict";
        h();
        K();
        G();
        V();
        P3 = a.literal("user_approveBtcSignPSBT"),
        z3 = a.tuple([Ae, a.object({
            psbt: a.instanceof(Uint8Array),
            inputsToSign: a.array(a.object({
                address: a.string(),
                signingIndexes: a.array(a.number()),
                sigHash: a.number().optional()
            })),
            finalize: a.boolean()
        })]),
        M3 = a.discriminatedUnion("type", [a.object({
            type: a.literal("signAndSend")
        }), a.object({
            type: a.literal("send"),
            signature: a.instanceof(Uint8Array)
        })]),
        L3 = B,
        CG = T(P3, z3),
        OG = P(M3, L3)
    }
    );
    var C3, O3, q3, U3, jG, HG, Jv = C( () => {
        "use strict";
        h();
        K();
        G();
        V();
        C3 = a.literal("user_approveBtcSignMessage"),
        O3 = a.tuple([Ae, a.object({
            message: a.instanceof(Uint8Array)
        })]),
        q3 = a.discriminatedUnion("type", [a.object({
            type: a.literal("signAndSend")
        }), a.object({
            type: a.literal("send"),
            signature: a.instanceof(Uint8Array),
            signedMessage: a.instanceof(Uint8Array)
        })]),
        U3 = B,
        jG = T(C3, O3),
        HG = P(q3, U3)
    }
    );
    var F3, j3, H3, K3, ZG, YG, Xv = C( () => {
        "use strict";
        h();
        K();
        G();
        V();
        F3 = a.literal("user_approveEthRequestAccounts"),
        j3 = a.tuple([Ae]),
        H3 = a.null(),
        K3 = B,
        ZG = T(F3, j3),
        YG = P(H3, K3)
    }
    );
    var V3, G3, Z3, Y3, eZ, tZ, Qv = C( () => {
        "use strict";
        h();
        K();
        G();
        V();
        V3 = a.literal("user_approveWalletRequestPermissions"),
        G3 = a.tuple([Ae]),
        Z3 = a.null(),
        Y3 = B,
        eZ = T(V3, G3),
        tZ = P(Z3, Y3)
    }
    );
    var tr, Bn = C( () => {
        "use strict";
        h();
        tr = (O => (O.OK = "OK",
        O.FeatureKilled = "FEATURE_KILLED",
        O.WalletLocked = "WALLET_LOCKED",
        O.TabNotFocused = "TAB_NOT_FOCUSED",
        O.Disabled = "DISABLED",
        O.SessionExpired = "SESSION_EXPIRED",
        O.RateLimitExceeded = "RATE_LIMIT_EXCEEDED",
        O.SimulationFailed = "SIMULATION_FAILED",
        O.UnsupportedDapp = "UNSUPPORTED_DAPP",
        O.UnsupportedNetworkId = "UNSUPPORTED_NETWORK_ID",
        O.UnsupportedMethod = "UNSUPPORTED_METHOD",
        O.Unimplemented = "UNIMPLEMENTED",
        O.Unknown = "UNKNOWN",
        O))(tr || {})
    }
    );
    var J3, X3, Q3, e8, uZ, pZ, eE = C( () => {
        "use strict";
        h();
        K();
        Bn();
        G();
        V();
        J3 = a.literal("user_approveEthSendTransaction"),
        X3 = a.tuple([Ae, a.object({
            transaction: An,
            autoConfirmStatusCode: a.nativeEnum(tr)
        })]),
        Q3 = a.discriminatedUnion("type", [a.object({
            type: a.literal("signAndSend"),
            maxFeePerGas: Y,
            maxPriorityFeePerGas: Y
        }), a.object({
            type: a.literal("send"),
            signature: Je,
            maxFeePerGas: Y,
            maxPriorityFeePerGas: Y
        })]),
        e8 = B,
        uZ = T(J3, X3),
        pZ = P(Q3, e8)
    }
    );
    var r8, n8, o8, s8, mZ, gZ, tE = C( () => {
        "use strict";
        h();
        K();
        Bn();
        G();
        V();
        r8 = a.literal("user_approveEthSignMessage"),
        n8 = a.tuple([Ae, a.object({
            signer: be,
            message: qe,
            originalMethod: a.enum(["eth_sign", "personal_sign", "eth_signTypedData", "eth_signTypedData_v3", "eth_signTypedData_v4"]),
            chainId: a.string(),
            autoConfirmStatusCode: a.nativeEnum(tr)
        })]),
        o8 = a.discriminatedUnion("approvalType", [a.object({
            approvalType: a.literal("user")
        }), a.object({
            approvalType: a.literal("hardware"),
            signature: Je
        })]),
        s8 = B,
        mZ = T(r8, n8),
        gZ = P(o8, s8)
    }
    );
    var a8, c8, u8, p8, vZ, EZ, rE = C( () => {
        "use strict";
        h();
        K();
        G();
        V();
        a8 = a.literal("user_approveSolConnect"),
        c8 = a.tuple([Ae]),
        u8 = a.null(),
        p8 = B,
        vZ = T(a8, c8),
        EZ = P(u8, p8)
    }
    );
    var l8, d8, h8, y8, BZ, TZ, nE = C( () => {
        "use strict";
        h();
        K();
        Bn();
        G();
        V();
        l8 = a.literal("user_approveSolSignAllTransactions"),
        d8 = a.tuple([Ae, a.object({
            transactions: a.array(fe),
            autoConfirmStatusCode: a.nativeEnum(tr)
        })]),
        h8 = a.discriminatedUnion("type", [a.object({
            type: a.literal("signAndSend"),
            overwriteTransactions: a.array(fe).optional()
        }), a.object({
            type: a.literal("send"),
            result: a.array(a.object({
                signedTransaction: fe,
                signature: fe,
                version: a.union([a.literal("legacy"), a.number()])
            }))
        })]),
        y8 = B,
        BZ = T(l8, d8),
        TZ = P(h8, y8)
    }
    );
    var g8, x8, w8, b8, CZ, OZ, oE = C( () => {
        "use strict";
        h();
        K();
        Bn();
        G();
        V();
        g8 = a.literal("user_approveSolSignAndSendTransaction"),
        x8 = a.tuple([Ae, a.object({
            transaction: a.string(),
            autoConfirmStatusCode: a.nativeEnum(tr)
        })]),
        w8 = a.discriminatedUnion("type", [a.object({
            type: a.literal("signAndSend"),
            overwriteTransactions: a.array(fe).optional()
        }), a.object({
            type: a.literal("send"),
            signedTransaction: fe,
            signature: fe,
            version: a.union([a.literal("legacy"), a.number()])
        })]),
        b8 = B,
        CZ = T(g8, x8),
        OZ = P(w8, b8)
    }
    );
    var v8, E8, _8, A8, HZ, KZ, sE = C( () => {
        "use strict";
        h();
        K();
        Bn();
        G();
        V();
        v8 = a.literal("user_approveSolSignAndSendAllTransactions"),
        E8 = a.tuple([Ae, a.object({
            transactions: a.array(fe),
            autoConfirmStatusCode: a.nativeEnum(tr)
        })]),
        _8 = a.discriminatedUnion("type", [a.object({
            type: a.literal("signAndSend"),
            overwriteTransactions: a.array(fe).optional()
        }), a.object({
            type: a.literal("send"),
            result: a.array(a.object({
                signedTransaction: fe,
                signature: fe,
                version: a.union([a.literal("legacy"), a.number()])
            }))
        })]),
        A8 = B,
        HZ = T(v8, E8),
        KZ = P(_8, A8)
    }
    );
    var I8, R8, B8, T8, YZ, $Z, iE = C( () => {
        "use strict";
        h();
        K();
        G();
        V();
        I8 = a.literal("user_approveSolSignIn"),
        R8 = a.tuple([Ae, a.object({
            connect: a.boolean(),
            signInData: Hs,
            message: fe,
            errorDetails: a.array(a.object({
                label: a.string(),
                message: a.string()
            })).optional()
        })]),
        B8 = a.discriminatedUnion("type", [a.object({
            type: a.literal("signAndSend")
        }), a.object({
            type: a.literal("send"),
            signature: fe
        })]),
        T8 = B,
        YZ = T(I8, R8),
        $Z = P(B8, T8)
    }
    );
    var z8, M8, L8, N8, rY, nY, aE = C( () => {
        "use strict";
        h();
        K();
        Bn();
        G();
        V();
        z8 = a.literal("user_approveSolSignMessage"),
        M8 = a.tuple([Ae, a.object({
            message: fe,
            display: a.union([a.literal("utf8"), a.literal("hex")]),
            autoConfirmStatusCode: a.nativeEnum(tr)
        })]),
        L8 = a.discriminatedUnion("type", [a.object({
            type: a.literal("signAndSend")
        }), a.object({
            type: a.literal("send"),
            signature: fe
        })]),
        N8 = B,
        rY = T(z8, M8),
        nY = P(L8, N8)
    }
    );
    var O8, q8, U8, D8, uY, pY, cE = C( () => {
        "use strict";
        h();
        K();
        Bn();
        G();
        V();
        O8 = a.literal("user_approveSolSignTransaction"),
        q8 = a.tuple([Ae, a.object({
            transaction: a.string(),
            autoConfirmStatusCode: a.nativeEnum(tr)
        })]),
        U8 = a.discriminatedUnion("type", [a.object({
            type: a.literal("signAndSend"),
            overwriteTransactions: a.array(fe).optional()
        }), a.object({
            type: a.literal("send"),
            signedTransaction: fe,
            signature: fe,
            version: a.union([a.literal("legacy"), a.number()])
        })]),
        D8 = B,
        uY = T(O8, q8),
        pY = P(U8, D8)
    }
    );
    var j8, H8, K8, W8, yY, mY, uE = C( () => {
        "use strict";
        h();
        K();
        G();
        V();
        j8 = a.literal("user_confirmEIP712IncorrectChainId"),
        H8 = a.tuple([Ae, a.object({
            connectedChainId: a.string(),
            messageChainId: a.string()
        })]),
        K8 = a.null(),
        W8 = B,
        yY = T(j8, H8),
        mY = P(K8, W8)
    }
    );
    var G8, Z8, Y8, $8, SY, vY, pE = C( () => {
        "use strict";
        h();
        K();
        G();
        V();
        G8 = a.literal("user_confirmIncorrectMode"),
        Z8 = a.tuple([Ae, a.enum(["mainnet", "testnet"])]),
        Y8 = a.null(),
        $8 = B,
        SY = T(G8, Z8),
        vY = P(Y8, $8)
    }
    );
    var X8, Q8, eL, tL, IY, RY, fE = C( () => {
        "use strict";
        h();
        K();
        G();
        V();
        X8 = a.literal("user_confirmUnsupportedAccount"),
        Q8 = a.tuple([Ae, a.literal("ethereum").or(a.literal("solana"))]),
        eL = a.null(),
        tL = B,
        IY = T(X8, Q8),
        RY = P(eL, tL)
    }
    );
    var nL, oL, sL, iL, MY, LY, lE = C( () => {
        "use strict";
        h();
        K();
        G();
        V();
        nL = a.literal("user_confirmUnsupportedNetwork"),
        oL = a.tuple([Ae, a.string()]),
        sL = a.null(),
        iL = B,
        MY = T(nL, oL),
        LY = P(sL, iL)
    }
    );
    var cL, uL, pL, fL, UY, DY, dE = C( () => {
        "use strict";
        h();
        K();
        G();
        V();
        cL = a.literal("user_selectEthWallet"),
        uL = a.tuple([Ae]),
        pL = Oi,
        fL = B,
        UY = T(cL, uL),
        DY = P(pL, fL)
    }
    );
    var dL, hL, yL, mL, WY, VY, hE = C( () => {
        "use strict";
        h();
        K();
        G();
        V();
        dL = a.literal("user_approveSolPayTransaction"),
        hL = a.tuple([Ae, a.object({
            label: a.string().optional(),
            transaction: a.string()
        })]),
        yL = a.discriminatedUnion("type", [a.object({
            type: a.literal("signAndSend")
        }), a.object({
            type: a.literal("send"),
            signedTransaction: fe,
            signature: fe,
            version: a.union([a.literal("legacy"), a.number()])
        })]),
        mL = B,
        WY = T(dL, hL),
        VY = P(yL, mL)
    }
    );
    var xL, wL, bL, SL, JY, XY, yE = C( () => {
        "use strict";
        h();
        K();
        G();
        V();
        xL = a.literal("user_approveSolFeaturedAction"),
        wL = a.tuple([Ae, a.object({
            featuredTransaction: mf
        })]),
        bL = a.object({
            transaction: a.string().optional(),
            message: a.string().optional()
        }),
        SL = B,
        JY = T(xL, wL),
        XY = P(bL, SL)
    }
    );
    var EL, _L, AL, kL, n$, o$, mE = C( () => {
        "use strict";
        h();
        K();
        G();
        V();
        EL = a.literal("user_solTransactionConfirmation"),
        _L = a.tuple([Ae, a.object({
            signature: fe,
            postAction: Ws.optional()
        })]),
        AL = a.null(),
        kL = B,
        n$ = T(EL, _L),
        o$ = P(AL, kL)
    }
    );
    var RL, BL, TL, PL, u$, p$, gE = C( () => {
        "use strict";
        h();
        K();
        G();
        V();
        RL = a.literal("user_approveSuiRequestAccounts"),
        BL = a.tuple([Ae]),
        TL = a.null(),
        PL = B,
        u$ = T(RL, BL),
        p$ = P(TL, PL)
    }
    );
    var ML, LL, NL, CL, y$, m$, xE = C( () => {
        "use strict";
        h();
        K();
        G();
        V();
        ML = a.literal("user_approveSuiSignTransaction"),
        LL = a.tuple([Ae, a.object({
            transaction: a.string()
        })]),
        NL = a.object({
            transaction: a.string()
        }),
        CL = B,
        y$ = T(ML, LL),
        m$ = P(NL, CL)
    }
    );
    var qL, UL, DL, FL, S$, v$, wE = C( () => {
        "use strict";
        h();
        K();
        G();
        V();
        qL = a.literal("user_approveSuiSignMessage"),
        UL = a.tuple([Ae, a.object({
            message: a.instanceof(Uint8Array)
        })]),
        DL = a.object({
            message: a.string()
        }),
        FL = B,
        S$ = T(qL, UL),
        v$ = P(DL, FL)
    }
    );
    var bE = C( () => {
        "use strict";
        h();
        Yv();
        $v();
        Jv();
        Xv();
        Qv();
        eE();
        tE();
        rE();
        nE();
        oE();
        sE();
        iE();
        aE();
        cE();
        uE();
        pE();
        fE();
        lE();
        dE();
        hE();
        yE();
        mE();
        gE();
        xE();
        wE()
    }
    );
    var hs = C( () => {
        "use strict";
        h();
        s0();
        g0();
        M0();
        eS();
        wS();
        CS();
        HS();
        yv();
        Sv();
        Iv();
        Zv();
        bE();
        G();
        ds();
        Bn();
        V()
    }
    );
    var Xs = _e(j => {
        "use strict";
        h();
        Object.defineProperty(j, "__esModule", {
            value: !0
        });
        j.s16 = j.s8 = j.nu64be = j.u48be = j.u40be = j.u32be = j.u24be = j.u16be = j.nu64 = j.u48 = j.u40 = j.u32 = j.u24 = j.u16 = j.u8 = j.offset = j.greedy = j.Constant = j.UTF8 = j.CString = j.Blob = j.Boolean = j.BitField = j.BitStructure = j.VariantLayout = j.Union = j.UnionLayoutDiscriminator = j.UnionDiscriminator = j.Structure = j.Sequence = j.DoubleBE = j.Double = j.FloatBE = j.Float = j.NearInt64BE = j.NearInt64 = j.NearUInt64BE = j.NearUInt64 = j.IntBE = j.Int = j.UIntBE = j.UInt = j.OffsetLayout = j.GreedyCount = j.ExternalLayout = j.bindConstructorLayout = j.nameWithProperty = j.Layout = j.uint8ArrayToBuffer = j.checkUint8Array = void 0;
        j.constant = j.utf8 = j.cstr = j.blob = j.unionLayoutDiscriminator = j.union = j.seq = j.bits = j.struct = j.f64be = j.f64 = j.f32be = j.f32 = j.ns64be = j.s48be = j.s40be = j.s32be = j.s24be = j.s16be = j.ns64 = j.s48 = j.s40 = j.s32 = j.s24 = void 0;
        var nd = Ps();
        function Js(r) {
            if (!(r instanceof Uint8Array))
                throw new TypeError("b must be a Uint8Array")
        }
        j.checkUint8Array = Js;
        function Ze(r) {
            return Js(r),
            nd.Buffer.from(r.buffer, r.byteOffset, r.length)
        }
        j.uint8ArrayToBuffer = Ze;
        var $e = class {
            constructor(e, t) {
                if (!Number.isInteger(e))
                    throw new TypeError("span must be an integer");
                this.span = e,
                this.property = t
            }
            makeDestinationObject() {
                return {}
            }
            getSpan(e, t) {
                if (0 > this.span)
                    throw new RangeError("indeterminate span");
                return this.span
            }
            replicate(e) {
                let t = Object.create(this.constructor.prototype);
                return Object.assign(t, this),
                t.property = e,
                t
            }
            fromArray(e) {}
        }
        ;
        j.Layout = $e;
        function od(r, e) {
            return e.property ? r + "[" + e.property + "]" : r
        }
        j.nameWithProperty = od;
        function KL(r, e) {
            if (typeof r != "function")
                throw new TypeError("Class must be constructor");
            if (Object.prototype.hasOwnProperty.call(r, "layout_"))
                throw new Error("Class is already bound to a layout");
            if (!(e && e instanceof $e))
                throw new TypeError("layout must be a Layout");
            if (Object.prototype.hasOwnProperty.call(e, "boundConstructor_"))
                throw new Error("layout is already bound to a constructor");
            r.layout_ = e,
            e.boundConstructor_ = r,
            e.makeDestinationObject = () => new r,
            Object.defineProperty(r.prototype, "encode", {
                value(t, n) {
                    return e.encode(this, t, n)
                },
                writable: !0
            }),
            Object.defineProperty(r, "decode", {
                value(t, n) {
                    return e.decode(t, n)
                },
                writable: !0
            })
        }
        j.bindConstructorLayout = KL;
        var rr = class extends $e {
            isCount() {
                throw new Error("ExternalLayout is abstract")
            }
        }
        ;
        j.ExternalLayout = rr;
        var Sc = class extends rr {
            constructor(e=1, t) {
                if (!Number.isInteger(e) || 0 >= e)
                    throw new TypeError("elementSpan must be a (positive) integer");
                super(-1, t),
                this.elementSpan = e
            }
            isCount() {
                return !0
            }
            decode(e, t=0) {
                Js(e);
                let n = e.length - t;
                return Math.floor(n / this.elementSpan)
            }
            encode(e, t, n) {
                return 0
            }
        }
        ;
        j.GreedyCount = Sc;
        var Ki = class extends rr {
            constructor(e, t=0, n) {
                if (!(e instanceof $e))
                    throw new TypeError("layout must be a Layout");
                if (!Number.isInteger(t))
                    throw new TypeError("offset must be integer or undefined");
                super(e.span, n || e.property),
                this.layout = e,
                this.offset = t
            }
            isCount() {
                return this.layout instanceof xr || this.layout instanceof Er
            }
            decode(e, t=0) {
                return this.layout.decode(e, t + this.offset)
            }
            encode(e, t, n=0) {
                return this.layout.encode(e, t, n + this.offset)
            }
        }
        ;
        j.OffsetLayout = Ki;
        var xr = class extends $e {
            constructor(e, t) {
                if (super(e, t),
                6 < this.span)
                    throw new RangeError("span must not exceed 6 bytes")
            }
            decode(e, t=0) {
                return Ze(e).readUIntLE(t, this.span)
            }
            encode(e, t, n=0) {
                return Ze(t).writeUIntLE(e, n, this.span),
                this.span
            }
        }
        ;
        j.UInt = xr;
        var Er = class extends $e {
            constructor(e, t) {
                if (super(e, t),
                6 < this.span)
                    throw new RangeError("span must not exceed 6 bytes")
            }
            decode(e, t=0) {
                return Ze(e).readUIntBE(t, this.span)
            }
            encode(e, t, n=0) {
                return Ze(t).writeUIntBE(e, n, this.span),
                this.span
            }
        }
        ;
        j.UIntBE = Er;
        var Tn = class extends $e {
            constructor(e, t) {
                if (super(e, t),
                6 < this.span)
                    throw new RangeError("span must not exceed 6 bytes")
            }
            decode(e, t=0) {
                return Ze(e).readIntLE(t, this.span)
            }
            encode(e, t, n=0) {
                return Ze(t).writeIntLE(e, n, this.span),
                this.span
            }
        }
        ;
        j.Int = Tn;
        var eo = class extends $e {
            constructor(e, t) {
                if (super(e, t),
                6 < this.span)
                    throw new RangeError("span must not exceed 6 bytes")
            }
            decode(e, t=0) {
                return Ze(e).readIntBE(t, this.span)
            }
            encode(e, t, n=0) {
                return Ze(t).writeIntBE(e, n, this.span),
                this.span
            }
        }
        ;
        j.IntBE = eo;
        var rd = Math.pow(2, 32);
        function qc(r) {
            let e = Math.floor(r / rd)
              , t = r - e * rd;
            return {
                hi32: e,
                lo32: t
            }
        }
        function Uc(r, e) {
            return r * rd + e
        }
        var vc = class extends $e {
            constructor(e) {
                super(8, e)
            }
            decode(e, t=0) {
                let n = Ze(e)
                  , o = n.readUInt32LE(t)
                  , s = n.readUInt32LE(t + 4);
                return Uc(s, o)
            }
            encode(e, t, n=0) {
                let o = qc(e)
                  , s = Ze(t);
                return s.writeUInt32LE(o.lo32, n),
                s.writeUInt32LE(o.hi32, n + 4),
                8
            }
        }
        ;
        j.NearUInt64 = vc;
        var Ec = class extends $e {
            constructor(e) {
                super(8, e)
            }
            decode(e, t=0) {
                let n = Ze(e)
                  , o = n.readUInt32BE(t)
                  , s = n.readUInt32BE(t + 4);
                return Uc(o, s)
            }
            encode(e, t, n=0) {
                let o = qc(e)
                  , s = Ze(t);
                return s.writeUInt32BE(o.hi32, n),
                s.writeUInt32BE(o.lo32, n + 4),
                8
            }
        }
        ;
        j.NearUInt64BE = Ec;
        var _c = class extends $e {
            constructor(e) {
                super(8, e)
            }
            decode(e, t=0) {
                let n = Ze(e)
                  , o = n.readUInt32LE(t)
                  , s = n.readInt32LE(t + 4);
                return Uc(s, o)
            }
            encode(e, t, n=0) {
                let o = qc(e)
                  , s = Ze(t);
                return s.writeUInt32LE(o.lo32, n),
                s.writeInt32LE(o.hi32, n + 4),
                8
            }
        }
        ;
        j.NearInt64 = _c;
        var Ac = class extends $e {
            constructor(e) {
                super(8, e)
            }
            decode(e, t=0) {
                let n = Ze(e)
                  , o = n.readInt32BE(t)
                  , s = n.readUInt32BE(t + 4);
                return Uc(o, s)
            }
            encode(e, t, n=0) {
                let o = qc(e)
                  , s = Ze(t);
                return s.writeInt32BE(o.hi32, n),
                s.writeUInt32BE(o.lo32, n + 4),
                8
            }
        }
        ;
        j.NearInt64BE = Ac;
        var kc = class extends $e {
            constructor(e) {
                super(4, e)
            }
            decode(e, t=0) {
                return Ze(e).readFloatLE(t)
            }
            encode(e, t, n=0) {
                return Ze(t).writeFloatLE(e, n),
                4
            }
        }
        ;
        j.Float = kc;
        var Ic = class extends $e {
            constructor(e) {
                super(4, e)
            }
            decode(e, t=0) {
                return Ze(e).readFloatBE(t)
            }
            encode(e, t, n=0) {
                return Ze(t).writeFloatBE(e, n),
                4
            }
        }
        ;
        j.FloatBE = Ic;
        var Rc = class extends $e {
            constructor(e) {
                super(8, e)
            }
            decode(e, t=0) {
                return Ze(e).readDoubleLE(t)
            }
            encode(e, t, n=0) {
                return Ze(t).writeDoubleLE(e, n),
                8
            }
        }
        ;
        j.Double = Rc;
        var Bc = class extends $e {
            constructor(e) {
                super(8, e)
            }
            decode(e, t=0) {
                return Ze(e).readDoubleBE(t)
            }
            encode(e, t, n=0) {
                return Ze(t).writeDoubleBE(e, n),
                8
            }
        }
        ;
        j.DoubleBE = Bc;
        var Tc = class extends $e {
            constructor(e, t, n) {
                if (!(e instanceof $e))
                    throw new TypeError("elementLayout must be a Layout");
                if (!(t instanceof rr && t.isCount() || Number.isInteger(t) && 0 <= t))
                    throw new TypeError("count must be non-negative integer or an unsigned integer ExternalLayout");
                let o = -1;
                !(t instanceof rr) && 0 < e.span && (o = t * e.span),
                super(o, n),
                this.elementLayout = e,
                this.count = t
            }
            getSpan(e, t=0) {
                if (0 <= this.span)
                    return this.span;
                let n = 0
                  , o = this.count;
                if (o instanceof rr && (o = o.decode(e, t)),
                0 < this.elementLayout.span)
                    n = o * this.elementLayout.span;
                else {
                    let s = 0;
                    for (; s < o; )
                        n += this.elementLayout.getSpan(e, t + n),
                        ++s
                }
                return n
            }
            decode(e, t=0) {
                let n = []
                  , o = 0
                  , s = this.count;
                for (s instanceof rr && (s = s.decode(e, t)); o < s; )
                    n.push(this.elementLayout.decode(e, t)),
                    t += this.elementLayout.getSpan(e, t),
                    o += 1;
                return n
            }
            encode(e, t, n=0) {
                let o = this.elementLayout
                  , s = e.reduce( (i, u) => i + o.encode(u, t, n + i), 0);
                return this.count instanceof rr && this.count.encode(e.length, t, n),
                s
            }
        }
        ;
        j.Sequence = Tc;
        var Pc = class extends $e {
            constructor(e, t, n) {
                if (!(Array.isArray(e) && e.reduce( (s, i) => s && i instanceof $e, !0)))
                    throw new TypeError("fields must be array of Layout instances");
                typeof t == "boolean" && n === void 0 && (n = t,
                t = void 0);
                for (let s of e)
                    if (0 > s.span && s.property === void 0)
                        throw new Error("fields cannot contain unnamed variable-length layout");
                let o = -1;
                try {
                    o = e.reduce( (s, i) => s + i.getSpan(), 0)
                } catch {}
                super(o, t),
                this.fields = e,
                this.decodePrefixes = !!n
            }
            getSpan(e, t=0) {
                if (0 <= this.span)
                    return this.span;
                let n = 0;
                try {
                    n = this.fields.reduce( (o, s) => {
                        let i = s.getSpan(e, t);
                        return t += i,
                        o + i
                    }
                    , 0)
                } catch {
                    throw new RangeError("indeterminate span")
                }
                return n
            }
            decode(e, t=0) {
                Js(e);
                let n = this.makeDestinationObject();
                for (let o of this.fields)
                    if (o.property !== void 0 && (n[o.property] = o.decode(e, t)),
                    t += o.getSpan(e, t),
                    this.decodePrefixes && e.length === t)
                        break;
                return n
            }
            encode(e, t, n=0) {
                let o = n
                  , s = 0
                  , i = 0;
                for (let u of this.fields) {
                    let f = u.span;
                    if (i = 0 < f ? f : 0,
                    u.property !== void 0) {
                        let g = e[u.property];
                        g !== void 0 && (i = u.encode(g, t, n),
                        0 > f && (f = u.getSpan(t, n)))
                    }
                    s = n,
                    n += f
                }
                return s + i - o
            }
            fromArray(e) {
                let t = this.makeDestinationObject();
                for (let n of this.fields)
                    n.property !== void 0 && 0 < e.length && (t[n.property] = e.shift());
                return t
            }
            layoutFor(e) {
                if (typeof e != "string")
                    throw new TypeError("property must be string");
                for (let t of this.fields)
                    if (t.property === e)
                        return t
            }
            offsetOf(e) {
                if (typeof e != "string")
                    throw new TypeError("property must be string");
                let t = 0;
                for (let n of this.fields) {
                    if (n.property === e)
                        return t;
                    0 > n.span ? t = -1 : 0 <= t && (t += n.span)
                }
            }
        }
        ;
        j.Structure = Pc;
        var Wi = class {
            constructor(e) {
                this.property = e
            }
            decode(e, t) {
                throw new Error("UnionDiscriminator is abstract")
            }
            encode(e, t, n) {
                throw new Error("UnionDiscriminator is abstract")
            }
        }
        ;
        j.UnionDiscriminator = Wi;
        var $s = class extends Wi {
            constructor(e, t) {
                if (!(e instanceof rr && e.isCount()))
                    throw new TypeError("layout must be an unsigned integer ExternalLayout");
                super(t || e.property || "variant"),
                this.layout = e
            }
            decode(e, t) {
                return this.layout.decode(e, t)
            }
            encode(e, t, n) {
                return this.layout.encode(e, t, n)
            }
        }
        ;
        j.UnionLayoutDiscriminator = $s;
        var Vi = class extends $e {
            constructor(e, t, n) {
                let o;
                if (e instanceof xr || e instanceof Er)
                    o = new $s(new Ki(e));
                else if (e instanceof rr && e.isCount())
                    o = new $s(e);
                else if (e instanceof Wi)
                    o = e;
                else
                    throw new TypeError("discr must be a UnionDiscriminator or an unsigned integer layout");
                if (t === void 0 && (t = null),
                !(t === null || t instanceof $e))
                    throw new TypeError("defaultLayout must be null or a Layout");
                if (t !== null) {
                    if (0 > t.span)
                        throw new Error("defaultLayout must have constant span");
                    t.property === void 0 && (t = t.replicate("content"))
                }
                let s = -1;
                t && (s = t.span,
                0 <= s && (e instanceof xr || e instanceof Er) && (s += o.layout.span)),
                super(s, n),
                this.discriminator = o,
                this.usesPrefixDiscriminator = e instanceof xr || e instanceof Er,
                this.defaultLayout = t,
                this.registry = {};
                let i = this.defaultGetSourceVariant.bind(this);
                this.getSourceVariant = function(u) {
                    return i(u)
                }
                ,
                this.configGetSourceVariant = function(u) {
                    i = u.bind(this)
                }
            }
            getSpan(e, t=0) {
                if (0 <= this.span)
                    return this.span;
                let n = this.getVariant(e, t);
                if (!n)
                    throw new Error("unable to determine span for unrecognized variant");
                return n.getSpan(e, t)
            }
            defaultGetSourceVariant(e) {
                if (Object.prototype.hasOwnProperty.call(e, this.discriminator.property)) {
                    if (this.defaultLayout && this.defaultLayout.property && Object.prototype.hasOwnProperty.call(e, this.defaultLayout.property))
                        return;
                    let t = this.registry[e[this.discriminator.property]];
                    if (t && (!t.layout || t.property && Object.prototype.hasOwnProperty.call(e, t.property)))
                        return t
                } else
                    for (let t in this.registry) {
                        let n = this.registry[t];
                        if (n.property && Object.prototype.hasOwnProperty.call(e, n.property))
                            return n
                    }
                throw new Error("unable to infer src variant")
            }
            decode(e, t=0) {
                let n, o = this.discriminator, s = o.decode(e, t), i = this.registry[s];
                if (i === void 0) {
                    let u = this.defaultLayout
                      , f = 0;
                    this.usesPrefixDiscriminator && (f = o.layout.span),
                    n = this.makeDestinationObject(),
                    n[o.property] = s,
                    n[u.property] = u.decode(e, t + f)
                } else
                    n = i.decode(e, t);
                return n
            }
            encode(e, t, n=0) {
                let o = this.getSourceVariant(e);
                if (o === void 0) {
                    let s = this.discriminator
                      , i = this.defaultLayout
                      , u = 0;
                    return this.usesPrefixDiscriminator && (u = s.layout.span),
                    s.encode(e[s.property], t, n),
                    u + i.encode(e[i.property], t, n + u)
                }
                return o.encode(e, t, n)
            }
            addVariant(e, t, n) {
                let o = new zc(this,e,t,n);
                return this.registry[e] = o,
                o
            }
            getVariant(e, t=0) {
                let n;
                return e instanceof Uint8Array ? n = this.discriminator.decode(e, t) : n = e,
                this.registry[n]
            }
        }
        ;
        j.Union = Vi;
        var zc = class extends $e {
            constructor(e, t, n, o) {
                if (!(e instanceof Vi))
                    throw new TypeError("union must be a Union");
                if (!Number.isInteger(t) || 0 > t)
                    throw new TypeError("variant must be a (non-negative) integer");
                if (typeof n == "string" && o === void 0 && (o = n,
                n = null),
                n) {
                    if (!(n instanceof $e))
                        throw new TypeError("layout must be a Layout");
                    if (e.defaultLayout !== null && 0 <= n.span && n.span > e.defaultLayout.span)
                        throw new Error("variant span exceeds span of containing union");
                    if (typeof o != "string")
                        throw new TypeError("variant must have a String property")
                }
                let s = e.span;
                0 > e.span && (s = n ? n.span : 0,
                0 <= s && e.usesPrefixDiscriminator && (s += e.discriminator.layout.span)),
                super(s, o),
                this.union = e,
                this.variant = t,
                this.layout = n || null
            }
            getSpan(e, t=0) {
                if (0 <= this.span)
                    return this.span;
                let n = 0;
                this.union.usesPrefixDiscriminator && (n = this.union.discriminator.layout.span);
                let o = 0;
                return this.layout && (o = this.layout.getSpan(e, t + n)),
                n + o
            }
            decode(e, t=0) {
                let n = this.makeDestinationObject();
                if (this !== this.union.getVariant(e, t))
                    throw new Error("variant mismatch");
                let o = 0;
                return this.union.usesPrefixDiscriminator && (o = this.union.discriminator.layout.span),
                this.layout ? n[this.property] = this.layout.decode(e, t + o) : this.property ? n[this.property] = !0 : this.union.usesPrefixDiscriminator && (n[this.union.discriminator.property] = this.variant),
                n
            }
            encode(e, t, n=0) {
                let o = 0;
                if (this.union.usesPrefixDiscriminator && (o = this.union.discriminator.layout.span),
                this.layout && !Object.prototype.hasOwnProperty.call(e, this.property))
                    throw new TypeError("variant lacks property " + this.property);
                this.union.discriminator.encode(this.variant, t, n);
                let s = o;
                if (this.layout && (this.layout.encode(e[this.property], t, n + o),
                s += this.layout.getSpan(t, n + o),
                0 <= this.union.span && s > this.union.span))
                    throw new Error("encoded variant overruns containing union");
                return s
            }
            fromArray(e) {
                if (this.layout)
                    return this.layout.fromArray(e)
            }
        }
        ;
        j.VariantLayout = zc;
        function Ys(r) {
            return 0 > r && (r += 4294967296),
            r
        }
        var Gi = class extends $e {
            constructor(e, t, n) {
                if (!(e instanceof xr || e instanceof Er))
                    throw new TypeError("word must be a UInt or UIntBE layout");
                if (typeof t == "string" && n === void 0 && (n = t,
                t = !1),
                4 < e.span)
                    throw new RangeError("word cannot exceed 32 bits");
                super(e.span, n),
                this.word = e,
                this.msb = !!t,
                this.fields = [];
                let o = 0;
                this._packedSetValue = function(s) {
                    return o = Ys(s),
                    this
                }
                ,
                this._packedGetValue = function() {
                    return o
                }
            }
            decode(e, t=0) {
                let n = this.makeDestinationObject()
                  , o = this.word.decode(e, t);
                this._packedSetValue(o);
                for (let s of this.fields)
                    s.property !== void 0 && (n[s.property] = s.decode(e));
                return n
            }
            encode(e, t, n=0) {
                let o = this.word.decode(t, n);
                this._packedSetValue(o);
                for (let s of this.fields)
                    if (s.property !== void 0) {
                        let i = e[s.property];
                        i !== void 0 && s.encode(i)
                    }
                return this.word.encode(this._packedGetValue(), t, n)
            }
            addField(e, t) {
                let n = new Zi(this,e,t);
                return this.fields.push(n),
                n
            }
            addBoolean(e) {
                let t = new Mc(this,e);
                return this.fields.push(t),
                t
            }
            fieldFor(e) {
                if (typeof e != "string")
                    throw new TypeError("property must be string");
                for (let t of this.fields)
                    if (t.property === e)
                        return t
            }
        }
        ;
        j.BitStructure = Gi;
        var Zi = class {
            constructor(e, t, n) {
                if (!(e instanceof Gi))
                    throw new TypeError("container must be a BitStructure");
                if (!Number.isInteger(t) || 0 >= t)
                    throw new TypeError("bits must be positive integer");
                let o = 8 * e.span
                  , s = e.fields.reduce( (i, u) => i + u.bits, 0);
                if (t + s > o)
                    throw new Error("bits too long for span remainder (" + (o - s) + " of " + o + " remain)");
                this.container = e,
                this.bits = t,
                this.valueMask = (1 << t) - 1,
                t === 32 && (this.valueMask = 4294967295),
                this.start = s,
                this.container.msb && (this.start = o - s - t),
                this.wordMask = Ys(this.valueMask << this.start),
                this.property = n
            }
            decode(e, t) {
                let n = this.container._packedGetValue();
                return Ys(n & this.wordMask) >>> this.start
            }
            encode(e) {
                if (typeof e != "number" || !Number.isInteger(e) || e !== Ys(e & this.valueMask))
                    throw new TypeError(od("BitField.encode", this) + " value must be integer not exceeding " + this.valueMask);
                let t = this.container._packedGetValue()
                  , n = Ys(e << this.start);
                this.container._packedSetValue(Ys(t & ~this.wordMask) | n)
            }
        }
        ;
        j.BitField = Zi;
        var Mc = class extends Zi {
            constructor(e, t) {
                super(e, 1, t)
            }
            decode(e, t) {
                return !!super.decode(e, t)
            }
            encode(e) {
                typeof e == "boolean" && (e = +e),
                super.encode(e)
            }
        }
        ;
        j.Boolean = Mc;
        var Lc = class extends $e {
            constructor(e, t) {
                if (!(e instanceof rr && e.isCount() || Number.isInteger(e) && 0 <= e))
                    throw new TypeError("length must be positive integer or an unsigned integer ExternalLayout");
                let n = -1;
                e instanceof rr || (n = e),
                super(n, t),
                this.length = e
            }
            getSpan(e, t) {
                let n = this.span;
                return 0 > n && (n = this.length.decode(e, t)),
                n
            }
            decode(e, t=0) {
                let n = this.span;
                return 0 > n && (n = this.length.decode(e, t)),
                Ze(e).slice(t, t + n)
            }
            encode(e, t, n) {
                let o = this.length;
                if (this.length instanceof rr && (o = e.length),
                !(e instanceof Uint8Array && o === e.length))
                    throw new TypeError(od("Blob.encode", this) + " requires (length " + o + ") Uint8Array as src");
                if (n + o > t.length)
                    throw new RangeError("encoding overruns Uint8Array");
                let s = Ze(e);
                return Ze(t).write(s.toString("hex"), n, o, "hex"),
                this.length instanceof rr && this.length.encode(o, t, n),
                o
            }
        }
        ;
        j.Blob = Lc;
        var Nc = class extends $e {
            constructor(e) {
                super(-1, e)
            }
            getSpan(e, t=0) {
                Js(e);
                let n = t;
                for (; n < e.length && e[n] !== 0; )
                    n += 1;
                return 1 + n - t
            }
            decode(e, t=0) {
                let n = this.getSpan(e, t);
                return Ze(e).slice(t, t + n - 1).toString("utf-8")
            }
            encode(e, t, n=0) {
                typeof e != "string" && (e = String(e));
                let o = nd.Buffer.from(e, "utf8")
                  , s = o.length;
                if (n + s > t.length)
                    throw new RangeError("encoding overruns Buffer");
                let i = Ze(t);
                return o.copy(i, n),
                i[n + s] = 0,
                s + 1
            }
        }
        ;
        j.CString = Nc;
        var Cc = class extends $e {
            constructor(e, t) {
                if (typeof e == "string" && t === void 0 && (t = e,
                e = void 0),
                e === void 0)
                    e = -1;
                else if (!Number.isInteger(e))
                    throw new TypeError("maxSpan must be an integer");
                super(-1, t),
                this.maxSpan = e
            }
            getSpan(e, t=0) {
                return Js(e),
                e.length - t
            }
            decode(e, t=0) {
                let n = this.getSpan(e, t);
                if (0 <= this.maxSpan && this.maxSpan < n)
                    throw new RangeError("text length exceeds maxSpan");
                return Ze(e).slice(t, t + n).toString("utf-8")
            }
            encode(e, t, n=0) {
                typeof e != "string" && (e = String(e));
                let o = nd.Buffer.from(e, "utf8")
                  , s = o.length;
                if (0 <= this.maxSpan && this.maxSpan < s)
                    throw new RangeError("text length exceeds maxSpan");
                if (n + s > t.length)
                    throw new RangeError("encoding overruns Buffer");
                return o.copy(Ze(t), n),
                s
            }
        }
        ;
        j.UTF8 = Cc;
        var Oc = class extends $e {
            constructor(e, t) {
                super(0, t),
                this.value = e
            }
            decode(e, t) {
                return this.value
            }
            encode(e, t, n) {
                return 0
            }
        }
        ;
        j.Constant = Oc;
        j.greedy = (r, e) => new Sc(r,e);
        j.offset = (r, e, t) => new Ki(r,e,t);
        j.u8 = r => new xr(1,r);
        j.u16 = r => new xr(2,r);
        j.u24 = r => new xr(3,r);
        j.u32 = r => new xr(4,r);
        j.u40 = r => new xr(5,r);
        j.u48 = r => new xr(6,r);
        j.nu64 = r => new vc(r);
        j.u16be = r => new Er(2,r);
        j.u24be = r => new Er(3,r);
        j.u32be = r => new Er(4,r);
        j.u40be = r => new Er(5,r);
        j.u48be = r => new Er(6,r);
        j.nu64be = r => new Ec(r);
        j.s8 = r => new Tn(1,r);
        j.s16 = r => new Tn(2,r);
        j.s24 = r => new Tn(3,r);
        j.s32 = r => new Tn(4,r);
        j.s40 = r => new Tn(5,r);
        j.s48 = r => new Tn(6,r);
        j.ns64 = r => new _c(r);
        j.s16be = r => new eo(2,r);
        j.s24be = r => new eo(3,r);
        j.s32be = r => new eo(4,r);
        j.s40be = r => new eo(5,r);
        j.s48be = r => new eo(6,r);
        j.ns64be = r => new Ac(r);
        j.f32 = r => new kc(r);
        j.f32be = r => new Ic(r);
        j.f64 = r => new Rc(r);
        j.f64be = r => new Bc(r);
        j.struct = (r, e, t) => new Pc(r,e,t);
        j.bits = (r, e, t) => new Gi(r,e,t);
        j.seq = (r, e, t) => new Tc(r,e,t);
        j.union = (r, e, t) => new Vi(r,e,t);
        j.unionLayoutDiscriminator = (r, e) => new $s(r,e);
        j.blob = (r, e) => new Lc(r,e);
        j.cstr = r => new Nc(r);
        j.utf8 = (r, e) => new Cc(r,e);
        j.constant = (r, e) => new Oc(r,e)
    }
    );
    var $i = _e(ri => {
        "use strict";
        h();
        var sd = Ip()
          , ei = Bp()
          , SE = typeof Symbol == "function" && typeof Symbol.for == "function" ? Symbol.for("nodejs.util.inspect.custom") : null;
        ri.Buffer = J;
        ri.SlowBuffer = $L;
        ri.INSPECT_MAX_BYTES = 50;
        var Dc = 2147483647;
        ri.kMaxLength = Dc;
        J.TYPED_ARRAY_SUPPORT = WL();
        !J.TYPED_ARRAY_SUPPORT && typeof console < "u" && typeof console.error == "function" && console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support.");
        function WL() {
            try {
                let r = new Uint8Array(1)
                  , e = {
                    foo: function() {
                        return 42
                    }
                };
                return Object.setPrototypeOf(e, Uint8Array.prototype),
                Object.setPrototypeOf(r, e),
                r.foo() === 42
            } catch {
                return !1
            }
        }
        Object.defineProperty(J.prototype, "parent", {
            enumerable: !0,
            get: function() {
                if (J.isBuffer(this))
                    return this.buffer
            }
        });
        Object.defineProperty(J.prototype, "offset", {
            enumerable: !0,
            get: function() {
                if (J.isBuffer(this))
                    return this.byteOffset
            }
        });
        function Pn(r) {
            if (r > Dc)
                throw new RangeError('The value "' + r + '" is invalid for option "size"');
            let e = new Uint8Array(r);
            return Object.setPrototypeOf(e, J.prototype),
            e
        }
        function J(r, e, t) {
            if (typeof r == "number") {
                if (typeof e == "string")
                    throw new TypeError('The "string" argument must be of type string. Received type number');
                return ud(r)
            }
            return AE(r, e, t)
        }
        J.poolSize = 8192;
        function AE(r, e, t) {
            if (typeof r == "string")
                return GL(r, e);
            if (ArrayBuffer.isView(r))
                return ZL(r);
            if (r == null)
                throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof r);
            if (pn(r, ArrayBuffer) || r && pn(r.buffer, ArrayBuffer) || typeof SharedArrayBuffer < "u" && (pn(r, SharedArrayBuffer) || r && pn(r.buffer, SharedArrayBuffer)))
                return ad(r, e, t);
            if (typeof r == "number")
                throw new TypeError('The "value" argument must not be of type number. Received type number');
            let n = r.valueOf && r.valueOf();
            if (n != null && n !== r)
                return J.from(n, e, t);
            let o = YL(r);
            if (o)
                return o;
            if (typeof Symbol < "u" && Symbol.toPrimitive != null && typeof r[Symbol.toPrimitive] == "function")
                return J.from(r[Symbol.toPrimitive]("string"), e, t);
            throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof r)
        }
        J.from = function(r, e, t) {
            return AE(r, e, t)
        }
        ;
        Object.setPrototypeOf(J.prototype, Uint8Array.prototype);
        Object.setPrototypeOf(J, Uint8Array);
        function kE(r) {
            if (typeof r != "number")
                throw new TypeError('"size" argument must be of type number');
            if (r < 0)
                throw new RangeError('The value "' + r + '" is invalid for option "size"')
        }
        function VL(r, e, t) {
            return kE(r),
            r <= 0 ? Pn(r) : e !== void 0 ? typeof t == "string" ? Pn(r).fill(e, t) : Pn(r).fill(e) : Pn(r)
        }
        J.alloc = function(r, e, t) {
            return VL(r, e, t)
        }
        ;
        function ud(r) {
            return kE(r),
            Pn(r < 0 ? 0 : pd(r) | 0)
        }
        J.allocUnsafe = function(r) {
            return ud(r)
        }
        ;
        J.allocUnsafeSlow = function(r) {
            return ud(r)
        }
        ;
        function GL(r, e) {
            if ((typeof e != "string" || e === "") && (e = "utf8"),
            !J.isEncoding(e))
                throw new TypeError("Unknown encoding: " + e);
            let t = IE(r, e) | 0
              , n = Pn(t)
              , o = n.write(r, e);
            return o !== t && (n = n.slice(0, o)),
            n
        }
        function id(r) {
            let e = r.length < 0 ? 0 : pd(r.length) | 0
              , t = Pn(e);
            for (let n = 0; n < e; n += 1)
                t[n] = r[n] & 255;
            return t
        }
        function ZL(r) {
            if (pn(r, Uint8Array)) {
                let e = new Uint8Array(r);
                return ad(e.buffer, e.byteOffset, e.byteLength)
            }
            return id(r)
        }
        function ad(r, e, t) {
            if (e < 0 || r.byteLength < e)
                throw new RangeError('"offset" is outside of buffer bounds');
            if (r.byteLength < e + (t || 0))
                throw new RangeError('"length" is outside of buffer bounds');
            let n;
            return e === void 0 && t === void 0 ? n = new Uint8Array(r) : t === void 0 ? n = new Uint8Array(r,e) : n = new Uint8Array(r,e,t),
            Object.setPrototypeOf(n, J.prototype),
            n
        }
        function YL(r) {
            if (J.isBuffer(r)) {
                let e = pd(r.length) | 0
                  , t = Pn(e);
                return t.length === 0 || r.copy(t, 0, 0, e),
                t
            }
            if (r.length !== void 0)
                return typeof r.length != "number" || ld(r.length) ? Pn(0) : id(r);
            if (r.type === "Buffer" && Array.isArray(r.data))
                return id(r.data)
        }
        function pd(r) {
            if (r >= Dc)
                throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + Dc.toString(16) + " bytes");
            return r | 0
        }
        function $L(r) {
            return +r != r && (r = 0),
            J.alloc(+r)
        }
        J.isBuffer = function(e) {
            return e != null && e._isBuffer === !0 && e !== J.prototype
        }
        ;
        J.compare = function(e, t) {
            if (pn(e, Uint8Array) && (e = J.from(e, e.offset, e.byteLength)),
            pn(t, Uint8Array) && (t = J.from(t, t.offset, t.byteLength)),
            !J.isBuffer(e) || !J.isBuffer(t))
                throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
            if (e === t)
                return 0;
            let n = e.length
              , o = t.length;
            for (let s = 0, i = Math.min(n, o); s < i; ++s)
                if (e[s] !== t[s]) {
                    n = e[s],
                    o = t[s];
                    break
                }
            return n < o ? -1 : o < n ? 1 : 0
        }
        ;
        J.isEncoding = function(e) {
            switch (String(e).toLowerCase()) {
            case "hex":
            case "utf8":
            case "utf-8":
            case "ascii":
            case "latin1":
            case "binary":
            case "base64":
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
                return !0;
            default:
                return !1
            }
        }
        ;
        J.concat = function(e, t) {
            if (!Array.isArray(e))
                throw new TypeError('"list" argument must be an Array of Buffers');
            if (e.length === 0)
                return J.alloc(0);
            let n;
            if (t === void 0)
                for (t = 0,
                n = 0; n < e.length; ++n)
                    t += e[n].length;
            let o = J.allocUnsafe(t)
              , s = 0;
            for (n = 0; n < e.length; ++n) {
                let i = e[n];
                if (pn(i, Uint8Array))
                    s + i.length > o.length ? (J.isBuffer(i) || (i = J.from(i)),
                    i.copy(o, s)) : Uint8Array.prototype.set.call(o, i, s);
                else if (J.isBuffer(i))
                    i.copy(o, s);
                else
                    throw new TypeError('"list" argument must be an Array of Buffers');
                s += i.length
            }
            return o
        }
        ;
        function IE(r, e) {
            if (J.isBuffer(r))
                return r.length;
            if (ArrayBuffer.isView(r) || pn(r, ArrayBuffer))
                return r.byteLength;
            if (typeof r != "string")
                throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof r);
            let t = r.length
              , n = arguments.length > 2 && arguments[2] === !0;
            if (!n && t === 0)
                return 0;
            let o = !1;
            for (; ; )
                switch (e) {
                case "ascii":
                case "latin1":
                case "binary":
                    return t;
                case "utf8":
                case "utf-8":
                    return cd(r).length;
                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                    return t * 2;
                case "hex":
                    return t >>> 1;
                case "base64":
                    return CE(r).length;
                default:
                    if (o)
                        return n ? -1 : cd(r).length;
                    e = ("" + e).toLowerCase(),
                    o = !0
                }
        }
        J.byteLength = IE;
        function JL(r, e, t) {
            let n = !1;
            if ((e === void 0 || e < 0) && (e = 0),
            e > this.length || ((t === void 0 || t > this.length) && (t = this.length),
            t <= 0) || (t >>>= 0,
            e >>>= 0,
            t <= e))
                return "";
            for (r || (r = "utf8"); ; )
                switch (r) {
                case "hex":
                    return aN(this, e, t);
                case "utf8":
                case "utf-8":
                    return BE(this, e, t);
                case "ascii":
                    return sN(this, e, t);
                case "latin1":
                case "binary":
                    return iN(this, e, t);
                case "base64":
                    return nN(this, e, t);
                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                    return cN(this, e, t);
                default:
                    if (n)
                        throw new TypeError("Unknown encoding: " + r);
                    r = (r + "").toLowerCase(),
                    n = !0
                }
        }
        J.prototype._isBuffer = !0;
        function ys(r, e, t) {
            let n = r[e];
            r[e] = r[t],
            r[t] = n
        }
        J.prototype.swap16 = function() {
            let e = this.length;
            if (e % 2 !== 0)
                throw new RangeError("Buffer size must be a multiple of 16-bits");
            for (let t = 0; t < e; t += 2)
                ys(this, t, t + 1);
            return this
        }
        ;
        J.prototype.swap32 = function() {
            let e = this.length;
            if (e % 4 !== 0)
                throw new RangeError("Buffer size must be a multiple of 32-bits");
            for (let t = 0; t < e; t += 4)
                ys(this, t, t + 3),
                ys(this, t + 1, t + 2);
            return this
        }
        ;
        J.prototype.swap64 = function() {
            let e = this.length;
            if (e % 8 !== 0)
                throw new RangeError("Buffer size must be a multiple of 64-bits");
            for (let t = 0; t < e; t += 8)
                ys(this, t, t + 7),
                ys(this, t + 1, t + 6),
                ys(this, t + 2, t + 5),
                ys(this, t + 3, t + 4);
            return this
        }
        ;
        J.prototype.toString = function() {
            let e = this.length;
            return e === 0 ? "" : arguments.length === 0 ? BE(this, 0, e) : JL.apply(this, arguments)
        }
        ;
        J.prototype.toLocaleString = J.prototype.toString;
        J.prototype.equals = function(e) {
            if (!J.isBuffer(e))
                throw new TypeError("Argument must be a Buffer");
            return this === e ? !0 : J.compare(this, e) === 0
        }
        ;
        J.prototype.inspect = function() {
            let e = ""
              , t = ri.INSPECT_MAX_BYTES;
            return e = this.toString("hex", 0, t).replace(/(.{2})/g, "$1 ").trim(),
            this.length > t && (e += " ... "),
            "<Buffer " + e + ">"
        }
        ;
        SE && (J.prototype[SE] = J.prototype.inspect);
        J.prototype.compare = function(e, t, n, o, s) {
            if (pn(e, Uint8Array) && (e = J.from(e, e.offset, e.byteLength)),
            !J.isBuffer(e))
                throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof e);
            if (t === void 0 && (t = 0),
            n === void 0 && (n = e ? e.length : 0),
            o === void 0 && (o = 0),
            s === void 0 && (s = this.length),
            t < 0 || n > e.length || o < 0 || s > this.length)
                throw new RangeError("out of range index");
            if (o >= s && t >= n)
                return 0;
            if (o >= s)
                return -1;
            if (t >= n)
                return 1;
            if (t >>>= 0,
            n >>>= 0,
            o >>>= 0,
            s >>>= 0,
            this === e)
                return 0;
            let i = s - o
              , u = n - t
              , f = Math.min(i, u)
              , g = this.slice(o, s)
              , b = e.slice(t, n);
            for (let E = 0; E < f; ++E)
                if (g[E] !== b[E]) {
                    i = g[E],
                    u = b[E];
                    break
                }
            return i < u ? -1 : u < i ? 1 : 0
        }
        ;
        function RE(r, e, t, n, o) {
            if (r.length === 0)
                return -1;
            if (typeof t == "string" ? (n = t,
            t = 0) : t > 2147483647 ? t = 2147483647 : t < -2147483648 && (t = -2147483648),
            t = +t,
            ld(t) && (t = o ? 0 : r.length - 1),
            t < 0 && (t = r.length + t),
            t >= r.length) {
                if (o)
                    return -1;
                t = r.length - 1
            } else if (t < 0)
                if (o)
                    t = 0;
                else
                    return -1;
            if (typeof e == "string" && (e = J.from(e, n)),
            J.isBuffer(e))
                return e.length === 0 ? -1 : vE(r, e, t, n, o);
            if (typeof e == "number")
                return e = e & 255,
                typeof Uint8Array.prototype.indexOf == "function" ? o ? Uint8Array.prototype.indexOf.call(r, e, t) : Uint8Array.prototype.lastIndexOf.call(r, e, t) : vE(r, [e], t, n, o);
            throw new TypeError("val must be string, number or Buffer")
        }
        function vE(r, e, t, n, o) {
            let s = 1
              , i = r.length
              , u = e.length;
            if (n !== void 0 && (n = String(n).toLowerCase(),
            n === "ucs2" || n === "ucs-2" || n === "utf16le" || n === "utf-16le")) {
                if (r.length < 2 || e.length < 2)
                    return -1;
                s = 2,
                i /= 2,
                u /= 2,
                t /= 2
            }
            function f(b, E) {
                return s === 1 ? b[E] : b.readUInt16BE(E * s)
            }
            let g;
            if (o) {
                let b = -1;
                for (g = t; g < i; g++)
                    if (f(r, g) === f(e, b === -1 ? 0 : g - b)) {
                        if (b === -1 && (b = g),
                        g - b + 1 === u)
                            return b * s
                    } else
                        b !== -1 && (g -= g - b),
                        b = -1
            } else
                for (t + u > i && (t = i - u),
                g = t; g >= 0; g--) {
                    let b = !0;
                    for (let E = 0; E < u; E++)
                        if (f(r, g + E) !== f(e, E)) {
                            b = !1;
                            break
                        }
                    if (b)
                        return g
                }
            return -1
        }
        J.prototype.includes = function(e, t, n) {
            return this.indexOf(e, t, n) !== -1
        }
        ;
        J.prototype.indexOf = function(e, t, n) {
            return RE(this, e, t, n, !0)
        }
        ;
        J.prototype.lastIndexOf = function(e, t, n) {
            return RE(this, e, t, n, !1)
        }
        ;
        function XL(r, e, t, n) {
            t = Number(t) || 0;
            let o = r.length - t;
            n ? (n = Number(n),
            n > o && (n = o)) : n = o;
            let s = e.length;
            n > s / 2 && (n = s / 2);
            let i;
            for (i = 0; i < n; ++i) {
                let u = parseInt(e.substr(i * 2, 2), 16);
                if (ld(u))
                    return i;
                r[t + i] = u
            }
            return i
        }
        function QL(r, e, t, n) {
            return Fc(cd(e, r.length - t), r, t, n)
        }
        function eN(r, e, t, n) {
            return Fc(lN(e), r, t, n)
        }
        function tN(r, e, t, n) {
            return Fc(CE(e), r, t, n)
        }
        function rN(r, e, t, n) {
            return Fc(dN(e, r.length - t), r, t, n)
        }
        J.prototype.write = function(e, t, n, o) {
            if (t === void 0)
                o = "utf8",
                n = this.length,
                t = 0;
            else if (n === void 0 && typeof t == "string")
                o = t,
                n = this.length,
                t = 0;
            else if (isFinite(t))
                t = t >>> 0,
                isFinite(n) ? (n = n >>> 0,
                o === void 0 && (o = "utf8")) : (o = n,
                n = void 0);
            else
                throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
            let s = this.length - t;
            if ((n === void 0 || n > s) && (n = s),
            e.length > 0 && (n < 0 || t < 0) || t > this.length)
                throw new RangeError("Attempt to write outside buffer bounds");
            o || (o = "utf8");
            let i = !1;
            for (; ; )
                switch (o) {
                case "hex":
                    return XL(this, e, t, n);
                case "utf8":
                case "utf-8":
                    return QL(this, e, t, n);
                case "ascii":
                case "latin1":
                case "binary":
                    return eN(this, e, t, n);
                case "base64":
                    return tN(this, e, t, n);
                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                    return rN(this, e, t, n);
                default:
                    if (i)
                        throw new TypeError("Unknown encoding: " + o);
                    o = ("" + o).toLowerCase(),
                    i = !0
                }
        }
        ;
        J.prototype.toJSON = function() {
            return {
                type: "Buffer",
                data: Array.prototype.slice.call(this._arr || this, 0)
            }
        }
        ;
        function nN(r, e, t) {
            return e === 0 && t === r.length ? sd.fromByteArray(r) : sd.fromByteArray(r.slice(e, t))
        }
        function BE(r, e, t) {
            t = Math.min(r.length, t);
            let n = []
              , o = e;
            for (; o < t; ) {
                let s = r[o]
                  , i = null
                  , u = s > 239 ? 4 : s > 223 ? 3 : s > 191 ? 2 : 1;
                if (o + u <= t) {
                    let f, g, b, E;
                    switch (u) {
                    case 1:
                        s < 128 && (i = s);
                        break;
                    case 2:
                        f = r[o + 1],
                        (f & 192) === 128 && (E = (s & 31) << 6 | f & 63,
                        E > 127 && (i = E));
                        break;
                    case 3:
                        f = r[o + 1],
                        g = r[o + 2],
                        (f & 192) === 128 && (g & 192) === 128 && (E = (s & 15) << 12 | (f & 63) << 6 | g & 63,
                        E > 2047 && (E < 55296 || E > 57343) && (i = E));
                        break;
                    case 4:
                        f = r[o + 1],
                        g = r[o + 2],
                        b = r[o + 3],
                        (f & 192) === 128 && (g & 192) === 128 && (b & 192) === 128 && (E = (s & 15) << 18 | (f & 63) << 12 | (g & 63) << 6 | b & 63,
                        E > 65535 && E < 1114112 && (i = E))
                    }
                }
                i === null ? (i = 65533,
                u = 1) : i > 65535 && (i -= 65536,
                n.push(i >>> 10 & 1023 | 55296),
                i = 56320 | i & 1023),
                n.push(i),
                o += u
            }
            return oN(n)
        }
        var EE = 4096;
        function oN(r) {
            let e = r.length;
            if (e <= EE)
                return String.fromCharCode.apply(String, r);
            let t = ""
              , n = 0;
            for (; n < e; )
                t += String.fromCharCode.apply(String, r.slice(n, n += EE));
            return t
        }
        function sN(r, e, t) {
            let n = "";
            t = Math.min(r.length, t);
            for (let o = e; o < t; ++o)
                n += String.fromCharCode(r[o] & 127);
            return n
        }
        function iN(r, e, t) {
            let n = "";
            t = Math.min(r.length, t);
            for (let o = e; o < t; ++o)
                n += String.fromCharCode(r[o]);
            return n
        }
        function aN(r, e, t) {
            let n = r.length;
            (!e || e < 0) && (e = 0),
            (!t || t < 0 || t > n) && (t = n);
            let o = "";
            for (let s = e; s < t; ++s)
                o += hN[r[s]];
            return o
        }
        function cN(r, e, t) {
            let n = r.slice(e, t)
              , o = "";
            for (let s = 0; s < n.length - 1; s += 2)
                o += String.fromCharCode(n[s] + n[s + 1] * 256);
            return o
        }
        J.prototype.slice = function(e, t) {
            let n = this.length;
            e = ~~e,
            t = t === void 0 ? n : ~~t,
            e < 0 ? (e += n,
            e < 0 && (e = 0)) : e > n && (e = n),
            t < 0 ? (t += n,
            t < 0 && (t = 0)) : t > n && (t = n),
            t < e && (t = e);
            let o = this.subarray(e, t);
            return Object.setPrototypeOf(o, J.prototype),
            o
        }
        ;
        function Zt(r, e, t) {
            if (r % 1 !== 0 || r < 0)
                throw new RangeError("offset is not uint");
            if (r + e > t)
                throw new RangeError("Trying to access beyond buffer length")
        }
        J.prototype.readUintLE = J.prototype.readUIntLE = function(e, t, n) {
            e = e >>> 0,
            t = t >>> 0,
            n || Zt(e, t, this.length);
            let o = this[e]
              , s = 1
              , i = 0;
            for (; ++i < t && (s *= 256); )
                o += this[e + i] * s;
            return o
        }
        ;
        J.prototype.readUintBE = J.prototype.readUIntBE = function(e, t, n) {
            e = e >>> 0,
            t = t >>> 0,
            n || Zt(e, t, this.length);
            let o = this[e + --t]
              , s = 1;
            for (; t > 0 && (s *= 256); )
                o += this[e + --t] * s;
            return o
        }
        ;
        J.prototype.readUint8 = J.prototype.readUInt8 = function(e, t) {
            return e = e >>> 0,
            t || Zt(e, 1, this.length),
            this[e]
        }
        ;
        J.prototype.readUint16LE = J.prototype.readUInt16LE = function(e, t) {
            return e = e >>> 0,
            t || Zt(e, 2, this.length),
            this[e] | this[e + 1] << 8
        }
        ;
        J.prototype.readUint16BE = J.prototype.readUInt16BE = function(e, t) {
            return e = e >>> 0,
            t || Zt(e, 2, this.length),
            this[e] << 8 | this[e + 1]
        }
        ;
        J.prototype.readUint32LE = J.prototype.readUInt32LE = function(e, t) {
            return e = e >>> 0,
            t || Zt(e, 4, this.length),
            (this[e] | this[e + 1] << 8 | this[e + 2] << 16) + this[e + 3] * 16777216
        }
        ;
        J.prototype.readUint32BE = J.prototype.readUInt32BE = function(e, t) {
            return e = e >>> 0,
            t || Zt(e, 4, this.length),
            this[e] * 16777216 + (this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3])
        }
        ;
        J.prototype.readBigUInt64LE = to(function(e) {
            e = e >>> 0,
            ti(e, "offset");
            let t = this[e]
              , n = this[e + 7];
            (t === void 0 || n === void 0) && Yi(e, this.length - 8);
            let o = t + this[++e] * 2 ** 8 + this[++e] * 2 ** 16 + this[++e] * 2 ** 24
              , s = this[++e] + this[++e] * 2 ** 8 + this[++e] * 2 ** 16 + n * 2 ** 24;
            return BigInt(o) + (BigInt(s) << BigInt(32))
        });
        J.prototype.readBigUInt64BE = to(function(e) {
            e = e >>> 0,
            ti(e, "offset");
            let t = this[e]
              , n = this[e + 7];
            (t === void 0 || n === void 0) && Yi(e, this.length - 8);
            let o = t * 2 ** 24 + this[++e] * 2 ** 16 + this[++e] * 2 ** 8 + this[++e]
              , s = this[++e] * 2 ** 24 + this[++e] * 2 ** 16 + this[++e] * 2 ** 8 + n;
            return (BigInt(o) << BigInt(32)) + BigInt(s)
        });
        J.prototype.readIntLE = function(e, t, n) {
            e = e >>> 0,
            t = t >>> 0,
            n || Zt(e, t, this.length);
            let o = this[e]
              , s = 1
              , i = 0;
            for (; ++i < t && (s *= 256); )
                o += this[e + i] * s;
            return s *= 128,
            o >= s && (o -= Math.pow(2, 8 * t)),
            o
        }
        ;
        J.prototype.readIntBE = function(e, t, n) {
            e = e >>> 0,
            t = t >>> 0,
            n || Zt(e, t, this.length);
            let o = t
              , s = 1
              , i = this[e + --o];
            for (; o > 0 && (s *= 256); )
                i += this[e + --o] * s;
            return s *= 128,
            i >= s && (i -= Math.pow(2, 8 * t)),
            i
        }
        ;
        J.prototype.readInt8 = function(e, t) {
            return e = e >>> 0,
            t || Zt(e, 1, this.length),
            this[e] & 128 ? (255 - this[e] + 1) * -1 : this[e]
        }
        ;
        J.prototype.readInt16LE = function(e, t) {
            e = e >>> 0,
            t || Zt(e, 2, this.length);
            let n = this[e] | this[e + 1] << 8;
            return n & 32768 ? n | 4294901760 : n
        }
        ;
        J.prototype.readInt16BE = function(e, t) {
            e = e >>> 0,
            t || Zt(e, 2, this.length);
            let n = this[e + 1] | this[e] << 8;
            return n & 32768 ? n | 4294901760 : n
        }
        ;
        J.prototype.readInt32LE = function(e, t) {
            return e = e >>> 0,
            t || Zt(e, 4, this.length),
            this[e] | this[e + 1] << 8 | this[e + 2] << 16 | this[e + 3] << 24
        }
        ;
        J.prototype.readInt32BE = function(e, t) {
            return e = e >>> 0,
            t || Zt(e, 4, this.length),
            this[e] << 24 | this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3]
        }
        ;
        J.prototype.readBigInt64LE = to(function(e) {
            e = e >>> 0,
            ti(e, "offset");
            let t = this[e]
              , n = this[e + 7];
            (t === void 0 || n === void 0) && Yi(e, this.length - 8);
            let o = this[e + 4] + this[e + 5] * 2 ** 8 + this[e + 6] * 2 ** 16 + (n << 24);
            return (BigInt(o) << BigInt(32)) + BigInt(t + this[++e] * 2 ** 8 + this[++e] * 2 ** 16 + this[++e] * 2 ** 24)
        });
        J.prototype.readBigInt64BE = to(function(e) {
            e = e >>> 0,
            ti(e, "offset");
            let t = this[e]
              , n = this[e + 7];
            (t === void 0 || n === void 0) && Yi(e, this.length - 8);
            let o = (t << 24) + this[++e] * 2 ** 16 + this[++e] * 2 ** 8 + this[++e];
            return (BigInt(o) << BigInt(32)) + BigInt(this[++e] * 2 ** 24 + this[++e] * 2 ** 16 + this[++e] * 2 ** 8 + n)
        });
        J.prototype.readFloatLE = function(e, t) {
            return e = e >>> 0,
            t || Zt(e, 4, this.length),
            ei.read(this, e, !0, 23, 4)
        }
        ;
        J.prototype.readFloatBE = function(e, t) {
            return e = e >>> 0,
            t || Zt(e, 4, this.length),
            ei.read(this, e, !1, 23, 4)
        }
        ;
        J.prototype.readDoubleLE = function(e, t) {
            return e = e >>> 0,
            t || Zt(e, 8, this.length),
            ei.read(this, e, !0, 52, 8)
        }
        ;
        J.prototype.readDoubleBE = function(e, t) {
            return e = e >>> 0,
            t || Zt(e, 8, this.length),
            ei.read(this, e, !1, 52, 8)
        }
        ;
        function wr(r, e, t, n, o, s) {
            if (!J.isBuffer(r))
                throw new TypeError('"buffer" argument must be a Buffer instance');
            if (e > o || e < s)
                throw new RangeError('"value" argument is out of bounds');
            if (t + n > r.length)
                throw new RangeError("Index out of range")
        }
        J.prototype.writeUintLE = J.prototype.writeUIntLE = function(e, t, n, o) {
            if (e = +e,
            t = t >>> 0,
            n = n >>> 0,
            !o) {
                let u = Math.pow(2, 8 * n) - 1;
                wr(this, e, t, n, u, 0)
            }
            let s = 1
              , i = 0;
            for (this[t] = e & 255; ++i < n && (s *= 256); )
                this[t + i] = e / s & 255;
            return t + n
        }
        ;
        J.prototype.writeUintBE = J.prototype.writeUIntBE = function(e, t, n, o) {
            if (e = +e,
            t = t >>> 0,
            n = n >>> 0,
            !o) {
                let u = Math.pow(2, 8 * n) - 1;
                wr(this, e, t, n, u, 0)
            }
            let s = n - 1
              , i = 1;
            for (this[t + s] = e & 255; --s >= 0 && (i *= 256); )
                this[t + s] = e / i & 255;
            return t + n
        }
        ;
        J.prototype.writeUint8 = J.prototype.writeUInt8 = function(e, t, n) {
            return e = +e,
            t = t >>> 0,
            n || wr(this, e, t, 1, 255, 0),
            this[t] = e & 255,
            t + 1
        }
        ;
        J.prototype.writeUint16LE = J.prototype.writeUInt16LE = function(e, t, n) {
            return e = +e,
            t = t >>> 0,
            n || wr(this, e, t, 2, 65535, 0),
            this[t] = e & 255,
            this[t + 1] = e >>> 8,
            t + 2
        }
        ;
        J.prototype.writeUint16BE = J.prototype.writeUInt16BE = function(e, t, n) {
            return e = +e,
            t = t >>> 0,
            n || wr(this, e, t, 2, 65535, 0),
            this[t] = e >>> 8,
            this[t + 1] = e & 255,
            t + 2
        }
        ;
        J.prototype.writeUint32LE = J.prototype.writeUInt32LE = function(e, t, n) {
            return e = +e,
            t = t >>> 0,
            n || wr(this, e, t, 4, 4294967295, 0),
            this[t + 3] = e >>> 24,
            this[t + 2] = e >>> 16,
            this[t + 1] = e >>> 8,
            this[t] = e & 255,
            t + 4
        }
        ;
        J.prototype.writeUint32BE = J.prototype.writeUInt32BE = function(e, t, n) {
            return e = +e,
            t = t >>> 0,
            n || wr(this, e, t, 4, 4294967295, 0),
            this[t] = e >>> 24,
            this[t + 1] = e >>> 16,
            this[t + 2] = e >>> 8,
            this[t + 3] = e & 255,
            t + 4
        }
        ;
        function TE(r, e, t, n, o) {
            NE(e, n, o, r, t, 7);
            let s = Number(e & BigInt(4294967295));
            r[t++] = s,
            s = s >> 8,
            r[t++] = s,
            s = s >> 8,
            r[t++] = s,
            s = s >> 8,
            r[t++] = s;
            let i = Number(e >> BigInt(32) & BigInt(4294967295));
            return r[t++] = i,
            i = i >> 8,
            r[t++] = i,
            i = i >> 8,
            r[t++] = i,
            i = i >> 8,
            r[t++] = i,
            t
        }
        function PE(r, e, t, n, o) {
            NE(e, n, o, r, t, 7);
            let s = Number(e & BigInt(4294967295));
            r[t + 7] = s,
            s = s >> 8,
            r[t + 6] = s,
            s = s >> 8,
            r[t + 5] = s,
            s = s >> 8,
            r[t + 4] = s;
            let i = Number(e >> BigInt(32) & BigInt(4294967295));
            return r[t + 3] = i,
            i = i >> 8,
            r[t + 2] = i,
            i = i >> 8,
            r[t + 1] = i,
            i = i >> 8,
            r[t] = i,
            t + 8
        }
        J.prototype.writeBigUInt64LE = to(function(e, t=0) {
            return TE(this, e, t, BigInt(0), BigInt("0xffffffffffffffff"))
        });
        J.prototype.writeBigUInt64BE = to(function(e, t=0) {
            return PE(this, e, t, BigInt(0), BigInt("0xffffffffffffffff"))
        });
        J.prototype.writeIntLE = function(e, t, n, o) {
            if (e = +e,
            t = t >>> 0,
            !o) {
                let f = Math.pow(2, 8 * n - 1);
                wr(this, e, t, n, f - 1, -f)
            }
            let s = 0
              , i = 1
              , u = 0;
            for (this[t] = e & 255; ++s < n && (i *= 256); )
                e < 0 && u === 0 && this[t + s - 1] !== 0 && (u = 1),
                this[t + s] = (e / i >> 0) - u & 255;
            return t + n
        }
        ;
        J.prototype.writeIntBE = function(e, t, n, o) {
            if (e = +e,
            t = t >>> 0,
            !o) {
                let f = Math.pow(2, 8 * n - 1);
                wr(this, e, t, n, f - 1, -f)
            }
            let s = n - 1
              , i = 1
              , u = 0;
            for (this[t + s] = e & 255; --s >= 0 && (i *= 256); )
                e < 0 && u === 0 && this[t + s + 1] !== 0 && (u = 1),
                this[t + s] = (e / i >> 0) - u & 255;
            return t + n
        }
        ;
        J.prototype.writeInt8 = function(e, t, n) {
            return e = +e,
            t = t >>> 0,
            n || wr(this, e, t, 1, 127, -128),
            e < 0 && (e = 255 + e + 1),
            this[t] = e & 255,
            t + 1
        }
        ;
        J.prototype.writeInt16LE = function(e, t, n) {
            return e = +e,
            t = t >>> 0,
            n || wr(this, e, t, 2, 32767, -32768),
            this[t] = e & 255,
            this[t + 1] = e >>> 8,
            t + 2
        }
        ;
        J.prototype.writeInt16BE = function(e, t, n) {
            return e = +e,
            t = t >>> 0,
            n || wr(this, e, t, 2, 32767, -32768),
            this[t] = e >>> 8,
            this[t + 1] = e & 255,
            t + 2
        }
        ;
        J.prototype.writeInt32LE = function(e, t, n) {
            return e = +e,
            t = t >>> 0,
            n || wr(this, e, t, 4, 2147483647, -2147483648),
            this[t] = e & 255,
            this[t + 1] = e >>> 8,
            this[t + 2] = e >>> 16,
            this[t + 3] = e >>> 24,
            t + 4
        }
        ;
        J.prototype.writeInt32BE = function(e, t, n) {
            return e = +e,
            t = t >>> 0,
            n || wr(this, e, t, 4, 2147483647, -2147483648),
            e < 0 && (e = 4294967295 + e + 1),
            this[t] = e >>> 24,
            this[t + 1] = e >>> 16,
            this[t + 2] = e >>> 8,
            this[t + 3] = e & 255,
            t + 4
        }
        ;
        J.prototype.writeBigInt64LE = to(function(e, t=0) {
            return TE(this, e, t, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"))
        });
        J.prototype.writeBigInt64BE = to(function(e, t=0) {
            return PE(this, e, t, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"))
        });
        function zE(r, e, t, n, o, s) {
            if (t + n > r.length)
                throw new RangeError("Index out of range");
            if (t < 0)
                throw new RangeError("Index out of range")
        }
        function ME(r, e, t, n, o) {
            return e = +e,
            t = t >>> 0,
            o || zE(r, e, t, 4, 34028234663852886e22, -34028234663852886e22),
            ei.write(r, e, t, n, 23, 4),
            t + 4
        }
        J.prototype.writeFloatLE = function(e, t, n) {
            return ME(this, e, t, !0, n)
        }
        ;
        J.prototype.writeFloatBE = function(e, t, n) {
            return ME(this, e, t, !1, n)
        }
        ;
        function LE(r, e, t, n, o) {
            return e = +e,
            t = t >>> 0,
            o || zE(r, e, t, 8, 17976931348623157e292, -17976931348623157e292),
            ei.write(r, e, t, n, 52, 8),
            t + 8
        }
        J.prototype.writeDoubleLE = function(e, t, n) {
            return LE(this, e, t, !0, n)
        }
        ;
        J.prototype.writeDoubleBE = function(e, t, n) {
            return LE(this, e, t, !1, n)
        }
        ;
        J.prototype.copy = function(e, t, n, o) {
            if (!J.isBuffer(e))
                throw new TypeError("argument should be a Buffer");
            if (n || (n = 0),
            !o && o !== 0 && (o = this.length),
            t >= e.length && (t = e.length),
            t || (t = 0),
            o > 0 && o < n && (o = n),
            o === n || e.length === 0 || this.length === 0)
                return 0;
            if (t < 0)
                throw new RangeError("targetStart out of bounds");
            if (n < 0 || n >= this.length)
                throw new RangeError("Index out of range");
            if (o < 0)
                throw new RangeError("sourceEnd out of bounds");
            o > this.length && (o = this.length),
            e.length - t < o - n && (o = e.length - t + n);
            let s = o - n;
            return this === e && typeof Uint8Array.prototype.copyWithin == "function" ? this.copyWithin(t, n, o) : Uint8Array.prototype.set.call(e, this.subarray(n, o), t),
            s
        }
        ;
        J.prototype.fill = function(e, t, n, o) {
            if (typeof e == "string") {
                if (typeof t == "string" ? (o = t,
                t = 0,
                n = this.length) : typeof n == "string" && (o = n,
                n = this.length),
                o !== void 0 && typeof o != "string")
                    throw new TypeError("encoding must be a string");
                if (typeof o == "string" && !J.isEncoding(o))
                    throw new TypeError("Unknown encoding: " + o);
                if (e.length === 1) {
                    let i = e.charCodeAt(0);
                    (o === "utf8" && i < 128 || o === "latin1") && (e = i)
                }
            } else
                typeof e == "number" ? e = e & 255 : typeof e == "boolean" && (e = Number(e));
            if (t < 0 || this.length < t || this.length < n)
                throw new RangeError("Out of range index");
            if (n <= t)
                return this;
            t = t >>> 0,
            n = n === void 0 ? this.length : n >>> 0,
            e || (e = 0);
            let s;
            if (typeof e == "number")
                for (s = t; s < n; ++s)
                    this[s] = e;
            else {
                let i = J.isBuffer(e) ? e : J.from(e, o)
                  , u = i.length;
                if (u === 0)
                    throw new TypeError('The value "' + e + '" is invalid for argument "value"');
                for (s = 0; s < n - t; ++s)
                    this[s + t] = i[s % u]
            }
            return this
        }
        ;
        var Qs = {};
        function fd(r, e, t) {
            Qs[r] = class extends t {
                constructor() {
                    super(),
                    Object.defineProperty(this, "message", {
                        value: e.apply(this, arguments),
                        writable: !0,
                        configurable: !0
                    }),
                    this.name = `${this.name} [${r}]`,
                    this.stack,
                    delete this.name
                }
                get code() {
                    return r
                }
                set code(o) {
                    Object.defineProperty(this, "code", {
                        configurable: !0,
                        enumerable: !0,
                        value: o,
                        writable: !0
                    })
                }
                toString() {
                    return `${this.name} [${r}]: ${this.message}`
                }
            }
        }
        fd("ERR_BUFFER_OUT_OF_BOUNDS", function(r) {
            return r ? `${r} is outside of buffer bounds` : "Attempt to access memory outside buffer bounds"
        }, RangeError);
        fd("ERR_INVALID_ARG_TYPE", function(r, e) {
            return `The "${r}" argument must be of type number. Received type ${typeof e}`
        }, TypeError);
        fd("ERR_OUT_OF_RANGE", function(r, e, t) {
            let n = `The value of "${r}" is out of range.`
              , o = t;
            return Number.isInteger(t) && Math.abs(t) > 2 ** 32 ? o = _E(String(t)) : typeof t == "bigint" && (o = String(t),
            (t > BigInt(2) ** BigInt(32) || t < -(BigInt(2) ** BigInt(32))) && (o = _E(o)),
            o += "n"),
            n += ` It must be ${e}. Received ${o}`,
            n
        }, RangeError);
        function _E(r) {
            let e = ""
              , t = r.length
              , n = r[0] === "-" ? 1 : 0;
            for (; t >= n + 4; t -= 3)
                e = `_${r.slice(t - 3, t)}${e}`;
            return `${r.slice(0, t)}${e}`
        }
        function uN(r, e, t) {
            ti(e, "offset"),
            (r[e] === void 0 || r[e + t] === void 0) && Yi(e, r.length - (t + 1))
        }
        function NE(r, e, t, n, o, s) {
            if (r > t || r < e) {
                let i = typeof e == "bigint" ? "n" : "", u;
                throw s > 3 ? e === 0 || e === BigInt(0) ? u = `>= 0${i} and < 2${i} ** ${(s + 1) * 8}${i}` : u = `>= -(2${i} ** ${(s + 1) * 8 - 1}${i}) and < 2 ** ${(s + 1) * 8 - 1}${i}` : u = `>= ${e}${i} and <= ${t}${i}`,
                new Qs.ERR_OUT_OF_RANGE("value",u,r)
            }
            uN(n, o, s)
        }
        function ti(r, e) {
            if (typeof r != "number")
                throw new Qs.ERR_INVALID_ARG_TYPE(e,"number",r)
        }
        function Yi(r, e, t) {
            throw Math.floor(r) !== r ? (ti(r, t),
            new Qs.ERR_OUT_OF_RANGE(t || "offset","an integer",r)) : e < 0 ? new Qs.ERR_BUFFER_OUT_OF_BOUNDS : new Qs.ERR_OUT_OF_RANGE(t || "offset",`>= ${t ? 1 : 0} and <= ${e}`,r)
        }
        var pN = /[^+/0-9A-Za-z-_]/g;
        function fN(r) {
            if (r = r.split("=")[0],
            r = r.trim().replace(pN, ""),
            r.length < 2)
                return "";
            for (; r.length % 4 !== 0; )
                r = r + "=";
            return r
        }
        function cd(r, e) {
            e = e || 1 / 0;
            let t, n = r.length, o = null, s = [];
            for (let i = 0; i < n; ++i) {
                if (t = r.charCodeAt(i),
                t > 55295 && t < 57344) {
                    if (!o) {
                        if (t > 56319) {
                            (e -= 3) > -1 && s.push(239, 191, 189);
                            continue
                        } else if (i + 1 === n) {
                            (e -= 3) > -1 && s.push(239, 191, 189);
                            continue
                        }
                        o = t;
                        continue
                    }
                    if (t < 56320) {
                        (e -= 3) > -1 && s.push(239, 191, 189),
                        o = t;
                        continue
                    }
                    t = (o - 55296 << 10 | t - 56320) + 65536
                } else
                    o && (e -= 3) > -1 && s.push(239, 191, 189);
                if (o = null,
                t < 128) {
                    if ((e -= 1) < 0)
                        break;
                    s.push(t)
                } else if (t < 2048) {
                    if ((e -= 2) < 0)
                        break;
                    s.push(t >> 6 | 192, t & 63 | 128)
                } else if (t < 65536) {
                    if ((e -= 3) < 0)
                        break;
                    s.push(t >> 12 | 224, t >> 6 & 63 | 128, t & 63 | 128)
                } else if (t < 1114112) {
                    if ((e -= 4) < 0)
                        break;
                    s.push(t >> 18 | 240, t >> 12 & 63 | 128, t >> 6 & 63 | 128, t & 63 | 128)
                } else
                    throw new Error("Invalid code point")
            }
            return s
        }
        function lN(r) {
            let e = [];
            for (let t = 0; t < r.length; ++t)
                e.push(r.charCodeAt(t) & 255);
            return e
        }
        function dN(r, e) {
            let t, n, o, s = [];
            for (let i = 0; i < r.length && !((e -= 2) < 0); ++i)
                t = r.charCodeAt(i),
                n = t >> 8,
                o = t % 256,
                s.push(o),
                s.push(n);
            return s
        }
        function CE(r) {
            return sd.toByteArray(fN(r))
        }
        function Fc(r, e, t, n) {
            let o;
            for (o = 0; o < n && !(o + t >= e.length || o >= r.length); ++o)
                e[o + t] = r[o];
            return o
        }
        function pn(r, e) {
            return r instanceof e || r != null && r.constructor != null && r.constructor.name != null && r.constructor.name === e.name
        }
        function ld(r) {
            return r !== r
        }
        var hN = function() {
            let r = "0123456789abcdef"
              , e = new Array(256);
            for (let t = 0; t < 16; ++t) {
                let n = t * 16;
                for (let o = 0; o < 16; ++o)
                    e[n + o] = r[t] + r[o]
            }
            return e
        }();
        function to(r) {
            return typeof BigInt > "u" ? yN : r
        }
        function yN() {
            throw new Error("BigInt not supported")
        }
    }
    );
    function dd(r) {
        if (!Number.isSafeInteger(r) || r < 0)
            throw new Error(`Wrong positive integer: ${r}`)
    }
    function mN(r) {
        if (typeof r != "boolean")
            throw new Error(`Expected boolean, not ${r}`)
    }
    function OE(r, ...e) {
        if (!(r instanceof Uint8Array))
            throw new TypeError("Expected Uint8Array");
        if (e.length > 0 && !e.includes(r.length))
            throw new TypeError(`Expected Uint8Array of length ${e}, not of length=${r.length}`)
    }
    function gN(r) {
        if (typeof r != "function" || typeof r.create != "function")
            throw new Error("Hash should be wrapped by utils.wrapConstructor");
        dd(r.outputLen),
        dd(r.blockLen)
    }
    function xN(r, e=!0) {
        if (r.destroyed)
            throw new Error("Hash instance has been destroyed");
        if (e && r.finished)
            throw new Error("Hash#digest() has already been called")
    }
    function wN(r, e) {
        OE(r);
        let t = e.outputLen;
        if (r.length < t)
            throw new Error(`digestInto() expects output buffer of length at least ${t}`)
    }
    var bN, nr, jc = C( () => {
        h();
        bN = {
            number: dd,
            bool: mN,
            bytes: OE,
            hash: gN,
            exists: xN,
            output: wN
        },
        nr = bN
    }
    );
    var SN, qE = C( () => {
        h();
        SN = {
            node: void 0,
            web: typeof self == "object" && "crypto"in self ? self.crypto : void 0
        }
    }
    );
    function EN(r) {
        if (typeof r != "string")
            throw new TypeError(`utf8ToBytes expected string, got ${typeof r}`);
        return new TextEncoder().encode(r)
    }
    function no(r) {
        if (typeof r == "string" && (r = EN(r)),
        !(r instanceof Uint8Array))
            throw new TypeError(`Expected input type is Uint8Array (got ${typeof r})`);
        return r
    }
    function fn(r) {
        let e = n => r().update(no(n)).digest()
          , t = r();
        return e.outputLen = t.outputLen,
        e.blockLen = t.blockLen,
        e.create = () => r(),
        e
    }
    function DE(r) {
        let e = (n, o) => r(o).update(no(n)).digest()
          , t = r({});
        return e.outputLen = t.outputLen,
        e.blockLen = t.blockLen,
        e.create = n => r(n),
        e
    }
    var UE, Hc, Kr, vN, eJ, ro, ni = C( () => {
        h();
        qE();
        UE = r => new Uint32Array(r.buffer,r.byteOffset,Math.floor(r.byteLength / 4)),
        Hc = r => new DataView(r.buffer,r.byteOffset,r.byteLength),
        Kr = (r, e) => r << 32 - e | r >>> e,
        vN = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
        if (!vN)
            throw new Error("Non little-endian hardware is not supported");
        eJ = Array.from({
            length: 256
        }, (r, e) => e.toString(16).padStart(2, "0"));
        ro = class {
            clone() {
                return this._cloneInto()
            }
        }
    }
    );
    function _N(r, e, t, n) {
        if (typeof r.setBigUint64 == "function")
            return r.setBigUint64(e, t, n);
        let o = BigInt(32)
          , s = BigInt(4294967295)
          , i = Number(t >> o & s)
          , u = Number(t & s)
          , f = n ? 4 : 0
          , g = n ? 0 : 4;
        r.setUint32(e + f, i, n),
        r.setUint32(e + g, u, n)
    }
    var oi, hd = C( () => {
        h();
        jc();
        ni();
        oi = class extends ro {
            constructor(e, t, n, o) {
                super(),
                this.blockLen = e,
                this.outputLen = t,
                this.padOffset = n,
                this.isLE = o,
                this.finished = !1,
                this.length = 0,
                this.pos = 0,
                this.destroyed = !1,
                this.buffer = new Uint8Array(e),
                this.view = Hc(this.buffer)
            }
            update(e) {
                nr.exists(this);
                let {view: t, buffer: n, blockLen: o} = this;
                e = no(e);
                let s = e.length;
                for (let i = 0; i < s; ) {
                    let u = Math.min(o - this.pos, s - i);
                    if (u === o) {
                        let f = Hc(e);
                        for (; o <= s - i; i += o)
                            this.process(f, i);
                        continue
                    }
                    n.set(e.subarray(i, i + u), this.pos),
                    this.pos += u,
                    i += u,
                    this.pos === o && (this.process(t, 0),
                    this.pos = 0)
                }
                return this.length += e.length,
                this.roundClean(),
                this
            }
            digestInto(e) {
                nr.exists(this),
                nr.output(e, this),
                this.finished = !0;
                let {buffer: t, view: n, blockLen: o, isLE: s} = this
                  , {pos: i} = this;
                t[i++] = 128,
                this.buffer.subarray(i).fill(0),
                this.padOffset > o - i && (this.process(n, 0),
                i = 0);
                for (let E = i; E < o; E++)
                    t[E] = 0;
                _N(n, o - 8, BigInt(this.length * 8), s),
                this.process(n, 0);
                let u = Hc(e)
                  , f = this.outputLen;
                if (f % 4)
                    throw new Error("_sha2: outputLen should be aligned to 32bit");
                let g = f / 4
                  , b = this.get();
                if (g > b.length)
                    throw new Error("_sha2: outputLen bigger than state");
                for (let E = 0; E < g; E++)
                    u.setUint32(4 * E, b[E], s)
            }
            digest() {
                let {buffer: e, outputLen: t} = this;
                this.digestInto(e);
                let n = e.slice(0, t);
                return this.destroy(),
                n
            }
            _cloneInto(e) {
                e || (e = new this.constructor),
                e.set(...this.get());
                let {blockLen: t, buffer: n, length: o, finished: s, destroyed: i, pos: u} = this;
                return e.length = o,
                e.pos = u,
                e.finished = s,
                e.destroyed = i,
                o % t && e.buffer.set(n),
                e
            }
        }
    }
    );
    function FE(r, e=!1) {
        return e ? {
            h: Number(r & Kc),
            l: Number(r >> yd & Kc)
        } : {
            h: Number(r >> yd & Kc) | 0,
            l: Number(r & Kc) | 0
        }
    }
    function AN(r, e=!1) {
        let t = new Uint32Array(r.length)
          , n = new Uint32Array(r.length);
        for (let o = 0; o < r.length; o++) {
            let {h: s, l: i} = FE(r[o], e);
            [t[o],n[o]] = [s, i]
        }
        return [t, n]
    }
    function UN(r, e, t, n) {
        let o = (e >>> 0) + (n >>> 0);
        return {
            h: r + t + (o / 2 ** 32 | 0) | 0,
            l: o | 0
        }
    }
    var Kc, yd, kN, IN, RN, BN, TN, PN, zN, MN, LN, NN, CN, ON, qN, DN, FN, jN, HN, KN, WN, VN, Me, md = C( () => {
        h();
        Kc = BigInt(4294967295),
        yd = BigInt(32);
        kN = (r, e) => BigInt(r >>> 0) << yd | BigInt(e >>> 0),
        IN = (r, e, t) => r >>> t,
        RN = (r, e, t) => r << 32 - t | e >>> t,
        BN = (r, e, t) => r >>> t | e << 32 - t,
        TN = (r, e, t) => r << 32 - t | e >>> t,
        PN = (r, e, t) => r << 64 - t | e >>> t - 32,
        zN = (r, e, t) => r >>> t - 32 | e << 64 - t,
        MN = (r, e) => e,
        LN = (r, e) => r,
        NN = (r, e, t) => r << t | e >>> 32 - t,
        CN = (r, e, t) => e << t | r >>> 32 - t,
        ON = (r, e, t) => e << t - 32 | r >>> 64 - t,
        qN = (r, e, t) => r << t - 32 | e >>> 64 - t;
        DN = (r, e, t) => (r >>> 0) + (e >>> 0) + (t >>> 0),
        FN = (r, e, t, n) => e + t + n + (r / 2 ** 32 | 0) | 0,
        jN = (r, e, t, n) => (r >>> 0) + (e >>> 0) + (t >>> 0) + (n >>> 0),
        HN = (r, e, t, n, o) => e + t + n + o + (r / 2 ** 32 | 0) | 0,
        KN = (r, e, t, n, o) => (r >>> 0) + (e >>> 0) + (t >>> 0) + (n >>> 0) + (o >>> 0),
        WN = (r, e, t, n, o, s) => e + t + n + o + s + (r / 2 ** 32 | 0) | 0,
        VN = {
            fromBig: FE,
            split: AN,
            toBig: kN,
            shrSH: IN,
            shrSL: RN,
            rotrSH: BN,
            rotrSL: TN,
            rotrBH: PN,
            rotrBL: zN,
            rotr32H: MN,
            rotr32L: LN,
            rotlSH: NN,
            rotlSL: CN,
            rotlBH: ON,
            rotlBL: qN,
            add: UN,
            add3L: DN,
            add3H: FN,
            add4L: jN,
            add4H: HN,
            add5H: WN,
            add5L: KN
        },
        Me = VN
    }
    );
    var GN, ZN, oo, so, si, gd, xd, wd, jE, lJ, dJ, hJ, HE = C( () => {
        h();
        hd();
        md();
        ni();
        [GN,ZN] = Me.split(["0x428a2f98d728ae22", "0x7137449123ef65cd", "0xb5c0fbcfec4d3b2f", "0xe9b5dba58189dbbc", "0x3956c25bf348b538", "0x59f111f1b605d019", "0x923f82a4af194f9b", "0xab1c5ed5da6d8118", "0xd807aa98a3030242", "0x12835b0145706fbe", "0x243185be4ee4b28c", "0x550c7dc3d5ffb4e2", "0x72be5d74f27b896f", "0x80deb1fe3b1696b1", "0x9bdc06a725c71235", "0xc19bf174cf692694", "0xe49b69c19ef14ad2", "0xefbe4786384f25e3", "0x0fc19dc68b8cd5b5", "0x240ca1cc77ac9c65", "0x2de92c6f592b0275", "0x4a7484aa6ea6e483", "0x5cb0a9dcbd41fbd4", "0x76f988da831153b5", "0x983e5152ee66dfab", "0xa831c66d2db43210", "0xb00327c898fb213f", "0xbf597fc7beef0ee4", "0xc6e00bf33da88fc2", "0xd5a79147930aa725", "0x06ca6351e003826f", "0x142929670a0e6e70", "0x27b70a8546d22ffc", "0x2e1b21385c26c926", "0x4d2c6dfc5ac42aed", "0x53380d139d95b3df", "0x650a73548baf63de", "0x766a0abb3c77b2a8", "0x81c2c92e47edaee6", "0x92722c851482353b", "0xa2bfe8a14cf10364", "0xa81a664bbc423001", "0xc24b8b70d0f89791", "0xc76c51a30654be30", "0xd192e819d6ef5218", "0xd69906245565a910", "0xf40e35855771202a", "0x106aa07032bbd1b8", "0x19a4c116b8d2d0c8", "0x1e376c085141ab53", "0x2748774cdf8eeb99", "0x34b0bcb5e19b48a8", "0x391c0cb3c5c95a63", "0x4ed8aa4ae3418acb", "0x5b9cca4f7763e373", "0x682e6ff3d6b2b8a3", "0x748f82ee5defb2fc", "0x78a5636f43172f60", "0x84c87814a1f0ab72", "0x8cc702081a6439ec", "0x90befffa23631e28", "0xa4506cebde82bde9", "0xbef9a3f7b2c67915", "0xc67178f2e372532b", "0xca273eceea26619c", "0xd186b8c721c0c207", "0xeada7dd6cde0eb1e", "0xf57d4f7fee6ed178", "0x06f067aa72176fba", "0x0a637dc5a2c898a6", "0x113f9804bef90dae", "0x1b710b35131c471b", "0x28db77f523047d84", "0x32caab7b40c72493", "0x3c9ebe0a15c9bebc", "0x431d67c49c100d4c", "0x4cc5d4becb3e42b6", "0x597f299cfc657e2a", "0x5fcb6fab3ad6faec", "0x6c44198c4a475817"].map(r => BigInt(r))),
        oo = new Uint32Array(80),
        so = new Uint32Array(80),
        si = class extends oi {
            constructor() {
                super(128, 64, 16, !1),
                this.Ah = 1779033703,
                this.Al = -205731576,
                this.Bh = -1150833019,
                this.Bl = -2067093701,
                this.Ch = 1013904242,
                this.Cl = -23791573,
                this.Dh = -1521486534,
                this.Dl = 1595750129,
                this.Eh = 1359893119,
                this.El = -1377402159,
                this.Fh = -1694144372,
                this.Fl = 725511199,
                this.Gh = 528734635,
                this.Gl = -79577749,
                this.Hh = 1541459225,
                this.Hl = 327033209
            }
            get() {
                let {Ah: e, Al: t, Bh: n, Bl: o, Ch: s, Cl: i, Dh: u, Dl: f, Eh: g, El: b, Fh: E, Fl: q, Gh: O, Gl: Z, Hh: ee, Hl: X} = this;
                return [e, t, n, o, s, i, u, f, g, b, E, q, O, Z, ee, X]
            }
            set(e, t, n, o, s, i, u, f, g, b, E, q, O, Z, ee, X) {
                this.Ah = e | 0,
                this.Al = t | 0,
                this.Bh = n | 0,
                this.Bl = o | 0,
                this.Ch = s | 0,
                this.Cl = i | 0,
                this.Dh = u | 0,
                this.Dl = f | 0,
                this.Eh = g | 0,
                this.El = b | 0,
                this.Fh = E | 0,
                this.Fl = q | 0,
                this.Gh = O | 0,
                this.Gl = Z | 0,
                this.Hh = ee | 0,
                this.Hl = X | 0
            }
            process(e, t) {
                for (let Se = 0; Se < 16; Se++,
                t += 4)
                    oo[Se] = e.getUint32(t),
                    so[Se] = e.getUint32(t += 4);
                for (let Se = 16; Se < 80; Se++) {
                    let ze = oo[Se - 15] | 0
                      , Oe = so[Se - 15] | 0
                      , Re = Me.rotrSH(ze, Oe, 1) ^ Me.rotrSH(ze, Oe, 8) ^ Me.shrSH(ze, Oe, 7)
                      , Fe = Me.rotrSL(ze, Oe, 1) ^ Me.rotrSL(ze, Oe, 8) ^ Me.shrSL(ze, Oe, 7)
                      , _ = oo[Se - 2] | 0
                      , R = so[Se - 2] | 0
                      , N = Me.rotrSH(_, R, 19) ^ Me.rotrBH(_, R, 61) ^ Me.shrSH(_, R, 6)
                      , D = Me.rotrSL(_, R, 19) ^ Me.rotrBL(_, R, 61) ^ Me.shrSL(_, R, 6)
                      , z = Me.add4L(Fe, D, so[Se - 7], so[Se - 16])
                      , m = Me.add4H(z, Re, N, oo[Se - 7], oo[Se - 16]);
                    oo[Se] = m | 0,
                    so[Se] = z | 0
                }
                let {Ah: n, Al: o, Bh: s, Bl: i, Ch: u, Cl: f, Dh: g, Dl: b, Eh: E, El: q, Fh: O, Fl: Z, Gh: ee, Gl: X, Hh: le, Hl: W} = this;
                for (let Se = 0; Se < 80; Se++) {
                    let ze = Me.rotrSH(E, q, 14) ^ Me.rotrSH(E, q, 18) ^ Me.rotrBH(E, q, 41)
                      , Oe = Me.rotrSL(E, q, 14) ^ Me.rotrSL(E, q, 18) ^ Me.rotrBL(E, q, 41)
                      , Re = E & O ^ ~E & ee
                      , Fe = q & Z ^ ~q & X
                      , _ = Me.add5L(W, Oe, Fe, ZN[Se], so[Se])
                      , R = Me.add5H(_, le, ze, Re, GN[Se], oo[Se])
                      , N = _ | 0
                      , D = Me.rotrSH(n, o, 28) ^ Me.rotrBH(n, o, 34) ^ Me.rotrBH(n, o, 39)
                      , z = Me.rotrSL(n, o, 28) ^ Me.rotrBL(n, o, 34) ^ Me.rotrBL(n, o, 39)
                      , m = n & s ^ n & u ^ s & u
                      , c = o & i ^ o & f ^ i & f;
                    le = ee | 0,
                    W = X | 0,
                    ee = O | 0,
                    X = Z | 0,
                    O = E | 0,
                    Z = q | 0,
                    {h: E, l: q} = Me.add(g | 0, b | 0, R | 0, N | 0),
                    g = u | 0,
                    b = f | 0,
                    u = s | 0,
                    f = i | 0,
                    s = n | 0,
                    i = o | 0;
                    let p = Me.add3L(N, z, c);
                    n = Me.add3H(p, R, D, m),
                    o = p | 0
                }
                ({h: n, l: o} = Me.add(this.Ah | 0, this.Al | 0, n | 0, o | 0)),
                {h: s, l: i} = Me.add(this.Bh | 0, this.Bl | 0, s | 0, i | 0),
                {h: u, l: f} = Me.add(this.Ch | 0, this.Cl | 0, u | 0, f | 0),
                {h: g, l: b} = Me.add(this.Dh | 0, this.Dl | 0, g | 0, b | 0),
                {h: E, l: q} = Me.add(this.Eh | 0, this.El | 0, E | 0, q | 0),
                {h: O, l: Z} = Me.add(this.Fh | 0, this.Fl | 0, O | 0, Z | 0),
                {h: ee, l: X} = Me.add(this.Gh | 0, this.Gl | 0, ee | 0, X | 0),
                {h: le, l: W} = Me.add(this.Hh | 0, this.Hl | 0, le | 0, W | 0),
                this.set(n, o, s, i, u, f, g, b, E, q, O, Z, ee, X, le, W)
            }
            roundClean() {
                oo.fill(0),
                so.fill(0)
            }
            destroy() {
                this.buffer.fill(0),
                this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)
            }
        }
        ,
        gd = class extends si {
            constructor() {
                super(),
                this.Ah = -1942145080,
                this.Al = 424955298,
                this.Bh = 1944164710,
                this.Bl = -1982016298,
                this.Ch = 502970286,
                this.Cl = 855612546,
                this.Dh = 1738396948,
                this.Dl = 1479516111,
                this.Eh = 258812777,
                this.El = 2077511080,
                this.Fh = 2011393907,
                this.Fl = 79989058,
                this.Gh = 1067287976,
                this.Gl = 1780299464,
                this.Hh = 286451373,
                this.Hl = -1848208735,
                this.outputLen = 28
            }
        }
        ,
        xd = class extends si {
            constructor() {
                super(),
                this.Ah = 573645204,
                this.Al = -64227540,
                this.Bh = -1621794909,
                this.Bl = -934517566,
                this.Ch = 596883563,
                this.Cl = 1867755857,
                this.Dh = -1774684391,
                this.Dl = 1497426621,
                this.Eh = -1775747358,
                this.El = -1467023389,
                this.Fh = -1101128155,
                this.Fl = 1401305490,
                this.Gh = 721525244,
                this.Gl = 746961066,
                this.Hh = 246885852,
                this.Hl = -2117784414,
                this.outputLen = 32
            }
        }
        ,
        wd = class extends si {
            constructor() {
                super(),
                this.Ah = -876896931,
                this.Al = -1056596264,
                this.Bh = 1654270250,
                this.Bl = 914150663,
                this.Ch = -1856437926,
                this.Cl = 812702999,
                this.Dh = 355462360,
                this.Dl = -150054599,
                this.Eh = 1731405415,
                this.El = -4191439,
                this.Fh = -1900787065,
                this.Fl = 1750603025,
                this.Gh = -619958771,
                this.Gl = 1694076839,
                this.Hh = 1203062813,
                this.Hl = -1090891868,
                this.outputLen = 48
            }
        }
        ,
        jE = fn( () => new si),
        lJ = fn( () => new gd),
        dJ = fn( () => new xd),
        hJ = fn( () => new wd)
    }
    );
    var bd = _e( () => {
        h()
    }
    );
    function WE(r, e) {
        let t = e.negate();
        return r ? t : e
    }
    function VE(r) {
        if (!(r instanceof Kt))
            throw new TypeError("ExtendedPoint expected")
    }
    function Sd(r) {
        if (!(r instanceof ms))
            throw new TypeError("RistrettoPoint expected")
    }
    function vd() {
        throw new Error("Legacy method: switch to RistrettoPoint")
    }
    function GE(...r) {
        if (!r.every(n => n instanceof Uint8Array))
            throw new Error("Expected Uint8Array list");
        if (r.length === 1)
            return r[0];
        let e = r.reduce( (n, o) => n + o.length, 0)
          , t = new Uint8Array(e);
        for (let n = 0, o = 0; n < r.length; n++) {
            let s = r[n];
            t.set(s, o),
            o += s.length
        }
        return t
    }
    function ta(r) {
        if (!(r instanceof Uint8Array))
            throw new Error("Uint8Array expected");
        let e = "";
        for (let t = 0; t < r.length; t++)
            e += t4[r[t]];
        return e
    }
    function Ad(r) {
        if (typeof r != "string")
            throw new TypeError("hexToBytes: expected string, got " + typeof r);
        if (r.length % 2)
            throw new Error("hexToBytes: received invalid unpadded hex");
        let e = new Uint8Array(r.length / 2);
        for (let t = 0; t < e.length; t++) {
            let n = t * 2
              , o = r.slice(n, n + 2)
              , s = Number.parseInt(o, 16);
            if (Number.isNaN(s) || s < 0)
                throw new Error("Invalid byte sequence");
            e[t] = s
        }
        return e
    }
    function $E(r) {
        let t = r.toString(16).padStart(64, "0");
        return Ad(t)
    }
    function ea(r) {
        return $E(r).reverse()
    }
    function ao(r) {
        return (te(r) & Ke) === Ke
    }
    function ra(r) {
        if (!(r instanceof Uint8Array))
            throw new Error("Expected Uint8Array");
        return BigInt("0x" + ta(Uint8Array.from(r).reverse()))
    }
    function Ed(r) {
        return te(ra(r) & r4)
    }
    function te(r, e=Lt.P) {
        let t = r % e;
        return t >= Yt ? t : e + t
    }
    function Zc(r, e=Lt.P) {
        if (r === Yt || e <= Yt)
            throw new Error(`invert: expected positive integers, got n=${r} mod=${e}`);
        let t = te(r, e)
          , n = e
          , o = Yt
          , s = Ke
          , i = Ke
          , u = Yt;
        for (; t !== Yt; ) {
            let g = n / t
              , b = n % t
              , E = o - i * g
              , q = s - u * g;
            n = t,
            t = b,
            o = i,
            s = u,
            i = E,
            u = q
        }
        if (n !== Ke)
            throw new Error("invert: does not exist");
        return te(o, e)
    }
    function n4(r, e=Lt.P) {
        let t = new Array(r.length)
          , n = r.reduce( (s, i, u) => i === Yt ? s : (t[u] = s,
        te(s * i, e)), Ke)
          , o = Zc(n, e);
        return r.reduceRight( (s, i, u) => i === Yt ? s : (t[u] = te(s * t[u], e),
        te(s * i, e)), o),
        t
    }
    function ln(r, e) {
        let {P: t} = Lt
          , n = r;
        for (; e-- > Yt; )
            n *= n,
            n %= t;
        return n
    }
    function o4(r) {
        let {P: e} = Lt
          , t = BigInt(5)
          , n = BigInt(10)
          , o = BigInt(20)
          , s = BigInt(40)
          , i = BigInt(80)
          , f = r * r % e * r % e
          , g = ln(f, co) * f % e
          , b = ln(g, Ke) * r % e
          , E = ln(b, t) * b % e
          , q = ln(E, n) * E % e
          , O = ln(q, o) * q % e
          , Z = ln(O, s) * O % e
          , ee = ln(Z, i) * Z % e
          , X = ln(ee, i) * Z % e
          , le = ln(X, n) * E % e;
        return {
            pow_p_5_8: ln(le, co) * r % e,
            b2: f
        }
    }
    function kd(r, e) {
        let t = te(e * e * e)
          , n = te(t * t * e)
          , o = o4(r * n).pow_p_5_8
          , s = te(r * t * o)
          , i = te(e * s * s)
          , u = s
          , f = te(s * Ji)
          , g = i === r
          , b = i === te(-r)
          , E = i === te(-r * Ji);
        return g && (s = u),
        (b || E) && (s = f),
        ao(s) && (s = te(-s)),
        {
            isValid: g || b,
            value: s
        }
    }
    function ZE(r) {
        return kd(Ke, r)
    }
    function Wc(r) {
        return te(ra(r), Lt.l)
    }
    function s4(r, e) {
        if (r.length !== e.length)
            return !1;
        for (let t = 0; t < r.length; t++)
            if (r[t] !== e[t])
                return !1;
        return !0
    }
    function uo(r, e) {
        let t = r instanceof Uint8Array ? Uint8Array.from(r) : Ad(r);
        if (typeof e == "number" && t.length !== e)
            throw new Error(`Expected ${e} bytes`);
        return t
    }
    function Vc(r, e, t=!0) {
        if (!e)
            throw new TypeError("Specify max value");
        if (typeof r == "number" && Number.isSafeInteger(r) && (r = BigInt(r)),
        typeof r == "bigint" && r < e) {
            if (t) {
                if (Yt < r)
                    return r
            } else if (Yt <= r)
                return r
        }
        throw new TypeError("Expected valid scalar: 0 < scalar < max")
    }
    function i4(r) {
        return r[0] &= 248,
        r[31] &= 127,
        r[31] |= 64,
        r
    }
    function JE(r) {
        if (r = typeof r == "bigint" || typeof r == "number" ? $E(Vc(r, YE)) : uo(r),
        r.length !== 32)
            throw new Error("Expected 32 bytes");
        return r
    }
    function XE(r) {
        let e = i4(r.slice(0, 32))
          , t = r.slice(32, 64)
          , n = Wc(e)
          , o = Dt.BASE.multiply(n)
          , s = o.toRawBytes();
        return {
            head: e,
            prefix: t,
            scalar: n,
            point: o,
            pointBytes: s
        }
    }
    function Gc(...r) {
        if (typeof Xi != "function")
            throw new Error("utils.sha512Sync must be set to use sync methods");
        return Xi(...r)
    }
    async function QE(r) {
        return XE(await po.sha512(JE(r)))
    }
    function Id(r) {
        return XE(Gc(JE(r)))
    }
    function a4(r) {
        return Id(r).pointBytes
    }
    function c4(r, e) {
        r = uo(r);
        let {prefix: t, scalar: n, pointBytes: o} = Id(e)
          , s = Wc(Gc(t, r))
          , i = Dt.BASE.multiply(s)
          , u = Wc(Gc(i.toRawBytes(), o, r))
          , f = te(s + u * n, Lt.l);
        return new Qi(i,f).toRawBytes()
    }
    function u4(r, e, t) {
        e = uo(e),
        t instanceof Dt || (t = Dt.fromHex(t, !1));
        let {r: n, s: o} = r instanceof Qi ? r.assertValidity() : Qi.fromHex(r)
          , s = Kt.BASE.multiplyUnsafe(o);
        return {
            r: n,
            s: o,
            SB: s,
            pub: t,
            msg: e
        }
    }
    function p4(r, e, t, n) {
        let o = Wc(n)
          , s = Kt.fromAffine(r).multiplyUnsafe(o);
        return Kt.fromAffine(e).add(s).subtract(t).multiplyUnsafe(Lt.h).equals(Kt.ZERO)
    }
    function f4(r, e, t) {
        let {r: n, SB: o, msg: s, pub: i} = u4(r, e, t)
          , u = Gc(n.toRawBytes(), i.toRawBytes(), s);
        return p4(i, n, o, u)
    }
    var YN, Yt, Ke, co, $N, KE, Lt, YE, Ji, bJ, JN, XN, QN, e4, Kt, ms, _d, Dt, Qi, t4, r4, Xi, Yc, io, po, e_ = C( () => {
        h();
        YN = je(bd(), 1);
        Yt = BigInt(0),
        Ke = BigInt(1),
        co = BigInt(2),
        $N = BigInt(8),
        KE = BigInt("7237005577332262213973186563042994240857116359379907606001950938285454250989"),
        Lt = Object.freeze({
            a: BigInt(-1),
            d: BigInt("37095705934669439343138083508754565189542113879843219016388785533085940283555"),
            P: BigInt("57896044618658097711785492504343953926634992332820282019728792003956564819949"),
            l: KE,
            n: KE,
            h: BigInt(8),
            Gx: BigInt("15112221349535400772501151409588531511454012693041857206046113283949847762202"),
            Gy: BigInt("46316835694926478169428394003475163141307993866256225615783033603165251855960")
        }),
        YE = BigInt("0x10000000000000000000000000000000000000000000000000000000000000000"),
        Ji = BigInt("19681161376707505956807079304988542015446066515923890162744021073123829784752"),
        bJ = BigInt("6853475219497561581579357271197624642482790079785650197046958215289687604742"),
        JN = BigInt("25063068953384623474111414158702152701244531502492656460079210482610430750235"),
        XN = BigInt("54469307008909316920995813868745141605393597292927456921205312896311721017578"),
        QN = BigInt("1159843021668779879193775521855586647937357759715417654439879720876111806838"),
        e4 = BigInt("40440834346308536858101042469323190826248399146238708352240133220865137265952"),
        Kt = class r {
            constructor(e, t, n, o) {
                this.x = e,
                this.y = t,
                this.z = n,
                this.t = o
            }
            static fromAffine(e) {
                if (!(e instanceof Dt))
                    throw new TypeError("ExtendedPoint#fromAffine: expected Point");
                return e.equals(Dt.ZERO) ? r.ZERO : new r(e.x,e.y,Ke,te(e.x * e.y))
            }
            static toAffineBatch(e) {
                let t = n4(e.map(n => n.z));
                return e.map( (n, o) => n.toAffine(t[o]))
            }
            static normalizeZ(e) {
                return this.toAffineBatch(e).map(this.fromAffine)
            }
            equals(e) {
                VE(e);
                let {x: t, y: n, z: o} = this
                  , {x: s, y: i, z: u} = e
                  , f = te(t * u)
                  , g = te(s * o)
                  , b = te(n * u)
                  , E = te(i * o);
                return f === g && b === E
            }
            negate() {
                return new r(te(-this.x),this.y,this.z,te(-this.t))
            }
            double() {
                let {x: e, y: t, z: n} = this
                  , {a: o} = Lt
                  , s = te(e * e)
                  , i = te(t * t)
                  , u = te(co * te(n * n))
                  , f = te(o * s)
                  , g = e + t
                  , b = te(te(g * g) - s - i)
                  , E = f + i
                  , q = E - u
                  , O = f - i
                  , Z = te(b * q)
                  , ee = te(E * O)
                  , X = te(b * O)
                  , le = te(q * E);
                return new r(Z,ee,le,X)
            }
            add(e) {
                VE(e);
                let {x: t, y: n, z: o, t: s} = this
                  , {x: i, y: u, z: f, t: g} = e
                  , b = te((n - t) * (u + i))
                  , E = te((n + t) * (u - i))
                  , q = te(E - b);
                if (q === Yt)
                    return this.double();
                let O = te(o * co * g)
                  , Z = te(s * co * f)
                  , ee = Z + O
                  , X = E + b
                  , le = Z - O
                  , W = te(ee * q)
                  , Se = te(X * le)
                  , ze = te(ee * le)
                  , Oe = te(q * X);
                return new r(W,Se,Oe,ze)
            }
            subtract(e) {
                return this.add(e.negate())
            }
            precomputeWindow(e) {
                let t = 1 + 256 / e
                  , n = []
                  , o = this
                  , s = o;
                for (let i = 0; i < t; i++) {
                    s = o,
                    n.push(s);
                    for (let u = 1; u < 2 ** (e - 1); u++)
                        s = s.add(o),
                        n.push(s);
                    o = s.double()
                }
                return n
            }
            wNAF(e, t) {
                !t && this.equals(r.BASE) && (t = Dt.BASE);
                let n = t && t._WINDOW_SIZE || 1;
                if (256 % n)
                    throw new Error("Point#wNAF: Invalid precomputation window, must be power of 2");
                let o = t && _d.get(t);
                o || (o = this.precomputeWindow(n),
                t && n !== 1 && (o = r.normalizeZ(o),
                _d.set(t, o)));
                let s = r.ZERO
                  , i = r.BASE
                  , u = 1 + 256 / n
                  , f = 2 ** (n - 1)
                  , g = BigInt(2 ** n - 1)
                  , b = 2 ** n
                  , E = BigInt(n);
                for (let q = 0; q < u; q++) {
                    let O = q * f
                      , Z = Number(e & g);
                    e >>= E,
                    Z > f && (Z -= b,
                    e += Ke);
                    let ee = O
                      , X = O + Math.abs(Z) - 1
                      , le = q % 2 !== 0
                      , W = Z < 0;
                    Z === 0 ? i = i.add(WE(le, o[ee])) : s = s.add(WE(W, o[X]))
                }
                return r.normalizeZ([s, i])[0]
            }
            multiply(e, t) {
                return this.wNAF(Vc(e, Lt.l), t)
            }
            multiplyUnsafe(e) {
                let t = Vc(e, Lt.l, !1)
                  , n = r.BASE
                  , o = r.ZERO;
                if (t === Yt)
                    return o;
                if (this.equals(o) || t === Ke)
                    return this;
                if (this.equals(n))
                    return this.wNAF(t);
                let s = o
                  , i = this;
                for (; t > Yt; )
                    t & Ke && (s = s.add(i)),
                    i = i.double(),
                    t >>= Ke;
                return s
            }
            isSmallOrder() {
                return this.multiplyUnsafe(Lt.h).equals(r.ZERO)
            }
            isTorsionFree() {
                let e = this.multiplyUnsafe(Lt.l / co).double();
                return Lt.l % co && (e = e.add(this)),
                e.equals(r.ZERO)
            }
            toAffine(e) {
                let {x: t, y: n, z: o} = this
                  , s = this.equals(r.ZERO);
                e == null && (e = s ? $N : Zc(o));
                let i = te(t * e)
                  , u = te(n * e)
                  , f = te(o * e);
                if (s)
                    return Dt.ZERO;
                if (f !== Ke)
                    throw new Error("invZ was invalid");
                return new Dt(i,u)
            }
            fromRistrettoBytes() {
                vd()
            }
            toRistrettoBytes() {
                vd()
            }
            fromRistrettoHash() {
                vd()
            }
        }
        ;
        Kt.BASE = new Kt(Lt.Gx,Lt.Gy,Ke,te(Lt.Gx * Lt.Gy));
        Kt.ZERO = new Kt(Yt,Ke,Ke,Yt);
        ms = class r {
            constructor(e) {
                this.ep = e
            }
            static calcElligatorRistrettoMap(e) {
                let {d: t} = Lt
                  , n = te(Ji * e * e)
                  , o = te((n + Ke) * QN)
                  , s = BigInt(-1)
                  , i = te((s - t * n) * te(n + t))
                  , {isValid: u, value: f} = kd(o, i)
                  , g = te(f * e);
                ao(g) || (g = te(-g)),
                u || (f = g),
                u || (s = n);
                let b = te(s * (n - Ke) * e4 - i)
                  , E = f * f
                  , q = te((f + f) * i)
                  , O = te(b * JN)
                  , Z = te(Ke - E)
                  , ee = te(Ke + E);
                return new Kt(te(q * ee),te(Z * O),te(O * ee),te(q * Z))
            }
            static hashToCurve(e) {
                e = uo(e, 64);
                let t = Ed(e.slice(0, 32))
                  , n = this.calcElligatorRistrettoMap(t)
                  , o = Ed(e.slice(32, 64))
                  , s = this.calcElligatorRistrettoMap(o);
                return new r(n.add(s))
            }
            static fromHex(e) {
                e = uo(e, 32);
                let {a: t, d: n} = Lt
                  , o = "RistrettoPoint.fromHex: the hex is not valid encoding of RistrettoPoint"
                  , s = Ed(e);
                if (!s4(ea(s), e) || ao(s))
                    throw new Error(o);
                let i = te(s * s)
                  , u = te(Ke + t * i)
                  , f = te(Ke - t * i)
                  , g = te(u * u)
                  , b = te(f * f)
                  , E = te(t * n * g - b)
                  , {isValid: q, value: O} = ZE(te(E * b))
                  , Z = te(O * f)
                  , ee = te(O * Z * E)
                  , X = te((s + s) * Z);
                ao(X) && (X = te(-X));
                let le = te(u * ee)
                  , W = te(X * le);
                if (!q || ao(W) || le === Yt)
                    throw new Error(o);
                return new r(new Kt(X,le,Ke,W))
            }
            toRawBytes() {
                let {x: e, y: t, z: n, t: o} = this.ep, s = te(te(n + t) * te(n - t)), i = te(e * t), u = te(i * i), {value: f} = ZE(te(s * u)), g = te(f * s), b = te(f * i), E = te(g * b * o), q;
                if (ao(o * E)) {
                    let Z = te(t * Ji)
                      , ee = te(e * Ji);
                    e = Z,
                    t = ee,
                    q = te(g * XN)
                } else
                    q = b;
                ao(e * E) && (t = te(-t));
                let O = te((n - t) * q);
                return ao(O) && (O = te(-O)),
                ea(O)
            }
            toHex() {
                return ta(this.toRawBytes())
            }
            toString() {
                return this.toHex()
            }
            equals(e) {
                Sd(e);
                let t = this.ep
                  , n = e.ep
                  , o = te(t.x * n.y) === te(t.y * n.x)
                  , s = te(t.y * n.y) === te(t.x * n.x);
                return o || s
            }
            add(e) {
                return Sd(e),
                new r(this.ep.add(e.ep))
            }
            subtract(e) {
                return Sd(e),
                new r(this.ep.subtract(e.ep))
            }
            multiply(e) {
                return new r(this.ep.multiply(e))
            }
            multiplyUnsafe(e) {
                return new r(this.ep.multiplyUnsafe(e))
            }
        }
        ;
        ms.BASE = new ms(Kt.BASE);
        ms.ZERO = new ms(Kt.ZERO);
        _d = new WeakMap,
        Dt = class r {
            constructor(e, t) {
                this.x = e,
                this.y = t
            }
            _setWindowSize(e) {
                this._WINDOW_SIZE = e,
                _d.delete(this)
            }
            static fromHex(e, t=!0) {
                let {d: n, P: o} = Lt;
                e = uo(e, 32);
                let s = e.slice();
                s[31] = e[31] & -129;
                let i = ra(s);
                if (t && i >= o)
                    throw new Error("Expected 0 < hex < P");
                if (!t && i >= YE)
                    throw new Error("Expected 0 < hex < 2**256");
                let u = te(i * i)
                  , f = te(u - Ke)
                  , g = te(n * u + Ke)
                  , {isValid: b, value: E} = kd(f, g);
                if (!b)
                    throw new Error("Point.fromHex: invalid y coordinate");
                let q = (E & Ke) === Ke;
                return (e[31] & 128) !== 0 !== q && (E = te(-E)),
                new r(E,i)
            }
            static async fromPrivateKey(e) {
                return (await QE(e)).point
            }
            toRawBytes() {
                let e = ea(this.y);
                return e[31] |= this.x & Ke ? 128 : 0,
                e
            }
            toHex() {
                return ta(this.toRawBytes())
            }
            toX25519() {
                let {y: e} = this
                  , t = te((Ke + e) * Zc(Ke - e));
                return ea(t)
            }
            isTorsionFree() {
                return Kt.fromAffine(this).isTorsionFree()
            }
            equals(e) {
                return this.x === e.x && this.y === e.y
            }
            negate() {
                return new r(te(-this.x),this.y)
            }
            add(e) {
                return Kt.fromAffine(this).add(Kt.fromAffine(e)).toAffine()
            }
            subtract(e) {
                return this.add(e.negate())
            }
            multiply(e) {
                return Kt.fromAffine(this).multiply(e, this).toAffine()
            }
        }
        ;
        Dt.BASE = new Dt(Lt.Gx,Lt.Gy);
        Dt.ZERO = new Dt(Yt,Ke);
        Qi = class r {
            constructor(e, t) {
                this.r = e,
                this.s = t,
                this.assertValidity()
            }
            static fromHex(e) {
                let t = uo(e, 64)
                  , n = Dt.fromHex(t.slice(0, 32), !1)
                  , o = ra(t.slice(32, 64));
                return new r(n,o)
            }
            assertValidity() {
                let {r: e, s: t} = this;
                if (!(e instanceof Dt))
                    throw new Error("Expected Point instance");
                return Vc(t, Lt.l, !1),
                this
            }
            toRawBytes() {
                let e = new Uint8Array(64);
                return e.set(this.r.toRawBytes()),
                e.set(ea(this.s), 32),
                e
            }
            toHex() {
                return ta(this.toRawBytes())
            }
        }
        ;
        t4 = Array.from({
            length: 256
        }, (r, e) => e.toString(16).padStart(2, "0"));
        r4 = BigInt("0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");
        Yc = {
            getExtendedPublicKey: Id,
            getPublicKey: a4,
            sign: c4,
            verify: f4
        };
        Dt.BASE._setWindowSize(8);
        io = {
            node: YN,
            web: typeof self == "object" && "crypto"in self ? self.crypto : void 0
        },
        po = {
            bytesToHex: ta,
            hexToBytes: Ad,
            concatBytes: GE,
            getExtendedPublicKey: QE,
            mod: te,
            invert: Zc,
            TORSION_SUBGROUP: ["0100000000000000000000000000000000000000000000000000000000000000", "c7176a703d4dd84fba3c0b760d10670f2a2053fa2c39ccc64ec7fd7792ac037a", "0000000000000000000000000000000000000000000000000000000000000080", "26e8958fc2b227b045c3f489f2ef98f0d5dfac05d3c63339b13802886d53fc05", "ecffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff7f", "26e8958fc2b227b045c3f489f2ef98f0d5dfac05d3c63339b13802886d53fc85", "0000000000000000000000000000000000000000000000000000000000000000", "c7176a703d4dd84fba3c0b760d10670f2a2053fa2c39ccc64ec7fd7792ac03fa"],
            hashToPrivateScalar: r => {
                if (r = uo(r),
                r.length < 40 || r.length > 1024)
                    throw new Error("Expected 40-1024 bytes of private key as per FIPS 186");
                return te(ra(r), Lt.l - Ke) + Ke
            }
            ,
            randomBytes: (r=32) => {
                if (io.web)
                    return io.web.getRandomValues(new Uint8Array(r));
                if (io.node) {
                    let {randomBytes: e} = io.node;
                    return new Uint8Array(e(r).buffer)
                } else
                    throw new Error("The environment doesn't have randomBytes function")
            }
            ,
            randomPrivateKey: () => po.randomBytes(32),
            sha512: async (...r) => {
                let e = GE(...r);
                if (io.web) {
                    let t = await io.web.subtle.digest("SHA-512", e.buffer);
                    return new Uint8Array(t)
                } else {
                    if (io.node)
                        return Uint8Array.from(io.node.createHash("sha512").update(e).digest());
                    throw new Error("The environment doesn't have sha512 function")
                }
            }
            ,
            precompute(r=8, e=Dt.BASE) {
                let t = e.equals(Dt.BASE) ? e : new Dt(e.x,e.y);
                return t._setWindowSize(r),
                t.multiply(co),
                t
            },
            sha512Sync: void 0
        };
        Object.defineProperties(po, {
            sha512Sync: {
                configurable: !1,
                get() {
                    return Xi
                },
                set(r) {
                    Xi || (Xi = r)
                }
            }
        })
    }
    );
    var d4, h4, y4, fo, lo, $c, Rd, Jc, _J, t_ = C( () => {
        h();
        hd();
        ni();
        d4 = (r, e, t) => r & e ^ ~r & t,
        h4 = (r, e, t) => r & e ^ r & t ^ e & t,
        y4 = new Uint32Array([1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298]),
        fo = new Uint32Array([1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225]),
        lo = new Uint32Array(64),
        $c = class extends oi {
            constructor() {
                super(64, 32, 8, !1),
                this.A = fo[0] | 0,
                this.B = fo[1] | 0,
                this.C = fo[2] | 0,
                this.D = fo[3] | 0,
                this.E = fo[4] | 0,
                this.F = fo[5] | 0,
                this.G = fo[6] | 0,
                this.H = fo[7] | 0
            }
            get() {
                let {A: e, B: t, C: n, D: o, E: s, F: i, G: u, H: f} = this;
                return [e, t, n, o, s, i, u, f]
            }
            set(e, t, n, o, s, i, u, f) {
                this.A = e | 0,
                this.B = t | 0,
                this.C = n | 0,
                this.D = o | 0,
                this.E = s | 0,
                this.F = i | 0,
                this.G = u | 0,
                this.H = f | 0
            }
            process(e, t) {
                for (let E = 0; E < 16; E++,
                t += 4)
                    lo[E] = e.getUint32(t, !1);
                for (let E = 16; E < 64; E++) {
                    let q = lo[E - 15]
                      , O = lo[E - 2]
                      , Z = Kr(q, 7) ^ Kr(q, 18) ^ q >>> 3
                      , ee = Kr(O, 17) ^ Kr(O, 19) ^ O >>> 10;
                    lo[E] = ee + lo[E - 7] + Z + lo[E - 16] | 0
                }
                let {A: n, B: o, C: s, D: i, E: u, F: f, G: g, H: b} = this;
                for (let E = 0; E < 64; E++) {
                    let q = Kr(u, 6) ^ Kr(u, 11) ^ Kr(u, 25)
                      , O = b + q + d4(u, f, g) + y4[E] + lo[E] | 0
                      , ee = (Kr(n, 2) ^ Kr(n, 13) ^ Kr(n, 22)) + h4(n, o, s) | 0;
                    b = g,
                    g = f,
                    f = u,
                    u = i + O | 0,
                    i = s,
                    s = o,
                    o = n,
                    n = O + ee | 0
                }
                n = n + this.A | 0,
                o = o + this.B | 0,
                s = s + this.C | 0,
                i = i + this.D | 0,
                u = u + this.E | 0,
                f = f + this.F | 0,
                g = g + this.G | 0,
                b = b + this.H | 0,
                this.set(n, o, s, i, u, f, g, b)
            }
            roundClean() {
                lo.fill(0)
            }
            destroy() {
                this.set(0, 0, 0, 0, 0, 0, 0, 0),
                this.buffer.fill(0)
            }
        }
        ,
        Rd = class extends $c {
            constructor() {
                super(),
                this.A = -1056596264,
                this.B = 914150663,
                this.C = 812702999,
                this.D = -150054599,
                this.E = -4191439,
                this.F = 1750603025,
                this.G = 1694076839,
                this.H = -1090891868,
                this.outputLen = 28
            }
        }
        ,
        Jc = fn( () => new $c),
        _J = fn( () => new Rd)
    }
    );
    var r_ = _e(Pd => {
        "use strict";
        h();
        function zn(r, e, t) {
            return e <= r && r <= t
        }
        function ru(r) {
            if (r === void 0)
                return {};
            if (r === Object(r))
                return r;
            throw TypeError("Could not convert argument to dictionary")
        }
        function m4(r) {
            for (var e = String(r), t = e.length, n = 0, o = []; n < t; ) {
                var s = e.charCodeAt(n);
                if (s < 55296 || s > 57343)
                    o.push(s);
                else if (56320 <= s && s <= 57343)
                    o.push(65533);
                else if (55296 <= s && s <= 56319)
                    if (n === t - 1)
                        o.push(65533);
                    else {
                        var i = r.charCodeAt(n + 1);
                        if (56320 <= i && i <= 57343) {
                            var u = s & 1023
                              , f = i & 1023;
                            o.push(65536 + (u << 10) + f),
                            n += 1
                        } else
                            o.push(65533)
                    }
                n += 1
            }
            return o
        }
        function g4(r) {
            for (var e = "", t = 0; t < r.length; ++t) {
                var n = r[t];
                n <= 65535 ? e += String.fromCharCode(n) : (n -= 65536,
                e += String.fromCharCode((n >> 10) + 55296, (n & 1023) + 56320))
            }
            return e
        }
        var Xc = -1;
        function Td(r) {
            this.tokens = [].slice.call(r)
        }
        Td.prototype = {
            endOfStream: function() {
                return !this.tokens.length
            },
            read: function() {
                return this.tokens.length ? this.tokens.shift() : Xc
            },
            prepend: function(r) {
                if (Array.isArray(r))
                    for (var e = r; e.length; )
                        this.tokens.unshift(e.pop());
                else
                    this.tokens.unshift(r)
            },
            push: function(r) {
                if (Array.isArray(r))
                    for (var e = r; e.length; )
                        this.tokens.push(e.shift());
                else
                    this.tokens.push(r)
            }
        };
        var ii = -1;
        function Bd(r, e) {
            if (r)
                throw TypeError("Decoder error");
            return e || 65533
        }
        var Qc = "utf-8";
        function eu(r, e) {
            if (!(this instanceof eu))
                return new eu(r,e);
            if (r = r !== void 0 ? String(r).toLowerCase() : Qc,
            r !== Qc)
                throw new Error("Encoding not supported. Only utf-8 is supported");
            e = ru(e),
            this._streaming = !1,
            this._BOMseen = !1,
            this._decoder = null,
            this._fatal = !!e.fatal,
            this._ignoreBOM = !!e.ignoreBOM,
            Object.defineProperty(this, "encoding", {
                value: "utf-8"
            }),
            Object.defineProperty(this, "fatal", {
                value: this._fatal
            }),
            Object.defineProperty(this, "ignoreBOM", {
                value: this._ignoreBOM
            })
        }
        eu.prototype = {
            decode: function(e, t) {
                var n;
                typeof e == "object" && e instanceof ArrayBuffer ? n = new Uint8Array(e) : typeof e == "object" && "buffer"in e && e.buffer instanceof ArrayBuffer ? n = new Uint8Array(e.buffer,e.byteOffset,e.byteLength) : n = new Uint8Array(0),
                t = ru(t),
                this._streaming || (this._decoder = new x4({
                    fatal: this._fatal
                }),
                this._BOMseen = !1),
                this._streaming = !!t.stream;
                for (var o = new Td(n), s = [], i; !o.endOfStream() && (i = this._decoder.handler(o, o.read()),
                i !== ii); )
                    i !== null && (Array.isArray(i) ? s.push.apply(s, i) : s.push(i));
                if (!this._streaming) {
                    do {
                        if (i = this._decoder.handler(o, o.read()),
                        i === ii)
                            break;
                        i !== null && (Array.isArray(i) ? s.push.apply(s, i) : s.push(i))
                    } while (!o.endOfStream());
                    this._decoder = null
                }
                return s.length && ["utf-8"].indexOf(this.encoding) !== -1 && !this._ignoreBOM && !this._BOMseen && (s[0] === 65279 ? (this._BOMseen = !0,
                s.shift()) : this._BOMseen = !0),
                g4(s)
            }
        };
        function tu(r, e) {
            if (!(this instanceof tu))
                return new tu(r,e);
            if (r = r !== void 0 ? String(r).toLowerCase() : Qc,
            r !== Qc)
                throw new Error("Encoding not supported. Only utf-8 is supported");
            e = ru(e),
            this._streaming = !1,
            this._encoder = null,
            this._options = {
                fatal: !!e.fatal
            },
            Object.defineProperty(this, "encoding", {
                value: "utf-8"
            })
        }
        tu.prototype = {
            encode: function(e, t) {
                e = e ? String(e) : "",
                t = ru(t),
                this._streaming || (this._encoder = new w4(this._options)),
                this._streaming = !!t.stream;
                for (var n = [], o = new Td(m4(e)), s; !o.endOfStream() && (s = this._encoder.handler(o, o.read()),
                s !== ii); )
                    Array.isArray(s) ? n.push.apply(n, s) : n.push(s);
                if (!this._streaming) {
                    for (; s = this._encoder.handler(o, o.read()),
                    s !== ii; )
                        Array.isArray(s) ? n.push.apply(n, s) : n.push(s);
                    this._encoder = null
                }
                return new Uint8Array(n)
            }
        };
        function x4(r) {
            var e = r.fatal
              , t = 0
              , n = 0
              , o = 0
              , s = 128
              , i = 191;
            this.handler = function(u, f) {
                if (f === Xc && o !== 0)
                    return o = 0,
                    Bd(e);
                if (f === Xc)
                    return ii;
                if (o === 0) {
                    if (zn(f, 0, 127))
                        return f;
                    if (zn(f, 194, 223))
                        o = 1,
                        t = f - 192;
                    else if (zn(f, 224, 239))
                        f === 224 && (s = 160),
                        f === 237 && (i = 159),
                        o = 2,
                        t = f - 224;
                    else if (zn(f, 240, 244))
                        f === 240 && (s = 144),
                        f === 244 && (i = 143),
                        o = 3,
                        t = f - 240;
                    else
                        return Bd(e);
                    return t = t << 6 * o,
                    null
                }
                if (!zn(f, s, i))
                    return t = o = n = 0,
                    s = 128,
                    i = 191,
                    u.prepend(f),
                    Bd(e);
                if (s = 128,
                i = 191,
                n += 1,
                t += f - 128 << 6 * (o - n),
                n !== o)
                    return null;
                var g = t;
                return t = o = n = 0,
                g
            }
        }
        function w4(r) {
            var e = r.fatal;
            this.handler = function(t, n) {
                if (n === Xc)
                    return ii;
                if (zn(n, 0, 127))
                    return n;
                var o, s;
                zn(n, 128, 2047) ? (o = 1,
                s = 192) : zn(n, 2048, 65535) ? (o = 2,
                s = 224) : zn(n, 65536, 1114111) && (o = 3,
                s = 240);
                for (var i = [(n >> 6 * o) + s]; o > 0; ) {
                    var u = n >> 6 * (o - 1);
                    i.push(128 | u & 63),
                    o -= 1
                }
                return i
            }
        }
        Pd.TextEncoder = tu;
        Pd.TextDecoder = eu
    }
    );
    var a_ = _e(Xe => {
        "use strict";
        h();
        var b4 = Xe && Xe.__createBinding || (Object.create ? function(r, e, t, n) {
            n === void 0 && (n = t),
            Object.defineProperty(r, n, {
                enumerable: !0,
                get: function() {
                    return e[t]
                }
            })
        }
        : function(r, e, t, n) {
            n === void 0 && (n = t),
            r[n] = e[t]
        }
        )
          , S4 = Xe && Xe.__setModuleDefault || (Object.create ? function(r, e) {
            Object.defineProperty(r, "default", {
                enumerable: !0,
                value: e
            })
        }
        : function(r, e) {
            r.default = e
        }
        )
          , dn = Xe && Xe.__decorate || function(r, e, t, n) {
            var o = arguments.length, s = o < 3 ? e : n === null ? n = Object.getOwnPropertyDescriptor(e, t) : n, i;
            if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
                s = Reflect.decorate(r, e, t, n);
            else
                for (var u = r.length - 1; u >= 0; u--)
                    (i = r[u]) && (s = (o < 3 ? i(s) : o > 3 ? i(e, t, s) : i(e, t)) || s);
            return o > 3 && s && Object.defineProperty(e, t, s),
            s
        }
          , v4 = Xe && Xe.__importStar || function(r) {
            if (r && r.__esModule)
                return r;
            var e = {};
            if (r != null)
                for (var t in r)
                    t !== "default" && Object.hasOwnProperty.call(r, t) && b4(e, r, t);
            return S4(e, r),
            e
        }
          , n_ = Xe && Xe.__importDefault || function(r) {
            return r && r.__esModule ? r : {
                default: r
            }
        }
        ;
        Object.defineProperty(Xe, "__esModule", {
            value: !0
        });
        Xe.deserializeUnchecked = Xe.deserialize = Xe.serialize = Xe.BinaryReader = Xe.BinaryWriter = Xe.BorshError = Xe.baseDecode = Xe.baseEncode = void 0;
        var ho = n_(Za())
          , o_ = n_(Jn())
          , E4 = v4(r_())
          , _4 = typeof TextDecoder != "function" ? E4.TextDecoder : TextDecoder
          , A4 = new _4("utf-8",{
            fatal: !0
        });
        function k4(r) {
            return typeof r == "string" && (r = A.from(r, "utf8")),
            o_.default.encode(A.from(r))
        }
        Xe.baseEncode = k4;
        function I4(r) {
            return A.from(o_.default.decode(r))
        }
        Xe.baseDecode = I4;
        var zd = 1024
          , $t = class extends Error {
            constructor(e) {
                super(e),
                this.fieldPath = [],
                this.originalMessage = e
            }
            addToFieldPath(e) {
                this.fieldPath.splice(0, 0, e),
                this.message = this.originalMessage + ": " + this.fieldPath.join(".")
            }
        }
        ;
        Xe.BorshError = $t;
        var nu = class {
            constructor() {
                this.buf = A.alloc(zd),
                this.length = 0
            }
            maybeResize() {
                this.buf.length < 16 + this.length && (this.buf = A.concat([this.buf, A.alloc(zd)]))
            }
            writeU8(e) {
                this.maybeResize(),
                this.buf.writeUInt8(e, this.length),
                this.length += 1
            }
            writeU16(e) {
                this.maybeResize(),
                this.buf.writeUInt16LE(e, this.length),
                this.length += 2
            }
            writeU32(e) {
                this.maybeResize(),
                this.buf.writeUInt32LE(e, this.length),
                this.length += 4
            }
            writeU64(e) {
                this.maybeResize(),
                this.writeBuffer(A.from(new ho.default(e).toArray("le", 8)))
            }
            writeU128(e) {
                this.maybeResize(),
                this.writeBuffer(A.from(new ho.default(e).toArray("le", 16)))
            }
            writeU256(e) {
                this.maybeResize(),
                this.writeBuffer(A.from(new ho.default(e).toArray("le", 32)))
            }
            writeU512(e) {
                this.maybeResize(),
                this.writeBuffer(A.from(new ho.default(e).toArray("le", 64)))
            }
            writeBuffer(e) {
                this.buf = A.concat([A.from(this.buf.subarray(0, this.length)), e, A.alloc(zd)]),
                this.length += e.length
            }
            writeString(e) {
                this.maybeResize();
                let t = A.from(e, "utf8");
                this.writeU32(t.length),
                this.writeBuffer(t)
            }
            writeFixedArray(e) {
                this.writeBuffer(A.from(e))
            }
            writeArray(e, t) {
                this.maybeResize(),
                this.writeU32(e.length);
                for (let n of e)
                    this.maybeResize(),
                    t(n)
            }
            toArray() {
                return this.buf.subarray(0, this.length)
            }
        }
        ;
        Xe.BinaryWriter = nu;
        function hn(r, e, t) {
            let n = t.value;
            t.value = function(...o) {
                try {
                    return n.apply(this, o)
                } catch (s) {
                    if (s instanceof RangeError) {
                        let i = s.code;
                        if (["ERR_BUFFER_OUT_OF_BOUNDS", "ERR_OUT_OF_RANGE"].indexOf(i) >= 0)
                            throw new $t("Reached the end of buffer when deserializing")
                    }
                    throw s
                }
            }
        }
        var fr = class {
            constructor(e) {
                this.buf = e,
                this.offset = 0
            }
            readU8() {
                let e = this.buf.readUInt8(this.offset);
                return this.offset += 1,
                e
            }
            readU16() {
                let e = this.buf.readUInt16LE(this.offset);
                return this.offset += 2,
                e
            }
            readU32() {
                let e = this.buf.readUInt32LE(this.offset);
                return this.offset += 4,
                e
            }
            readU64() {
                let e = this.readBuffer(8);
                return new ho.default(e,"le")
            }
            readU128() {
                let e = this.readBuffer(16);
                return new ho.default(e,"le")
            }
            readU256() {
                let e = this.readBuffer(32);
                return new ho.default(e,"le")
            }
            readU512() {
                let e = this.readBuffer(64);
                return new ho.default(e,"le")
            }
            readBuffer(e) {
                if (this.offset + e > this.buf.length)
                    throw new $t(`Expected buffer length ${e} isn't within bounds`);
                let t = this.buf.slice(this.offset, this.offset + e);
                return this.offset += e,
                t
            }
            readString() {
                let e = this.readU32()
                  , t = this.readBuffer(e);
                try {
                    return A4.decode(t)
                } catch (n) {
                    throw new $t(`Error decoding UTF-8 string: ${n}`)
                }
            }
            readFixedArray(e) {
                return new Uint8Array(this.readBuffer(e))
            }
            readArray(e) {
                let t = this.readU32()
                  , n = Array();
                for (let o = 0; o < t; ++o)
                    n.push(e());
                return n
            }
        }
        ;
        dn([hn], fr.prototype, "readU8", null);
        dn([hn], fr.prototype, "readU16", null);
        dn([hn], fr.prototype, "readU32", null);
        dn([hn], fr.prototype, "readU64", null);
        dn([hn], fr.prototype, "readU128", null);
        dn([hn], fr.prototype, "readU256", null);
        dn([hn], fr.prototype, "readU512", null);
        dn([hn], fr.prototype, "readString", null);
        dn([hn], fr.prototype, "readFixedArray", null);
        dn([hn], fr.prototype, "readArray", null);
        Xe.BinaryReader = fr;
        function s_(r) {
            return r.charAt(0).toUpperCase() + r.slice(1)
        }
        function gs(r, e, t, n, o) {
            try {
                if (typeof n == "string")
                    o[`write${s_(n)}`](t);
                else if (n instanceof Array)
                    if (typeof n[0] == "number") {
                        if (t.length !== n[0])
                            throw new $t(`Expecting byte array of length ${n[0]}, but got ${t.length} bytes`);
                        o.writeFixedArray(t)
                    } else if (n.length === 2 && typeof n[1] == "number") {
                        if (t.length !== n[1])
                            throw new $t(`Expecting byte array of length ${n[1]}, but got ${t.length} bytes`);
                        for (let s = 0; s < n[1]; s++)
                            gs(r, null, t[s], n[0], o)
                    } else
                        o.writeArray(t, s => {
                            gs(r, e, s, n[0], o)
                        }
                        );
                else if (n.kind !== void 0)
                    switch (n.kind) {
                    case "option":
                        {
                            t == null ? o.writeU8(0) : (o.writeU8(1),
                            gs(r, e, t, n.type, o));
                            break
                        }
                    case "map":
                        {
                            o.writeU32(t.size),
                            t.forEach( (s, i) => {
                                gs(r, e, i, n.key, o),
                                gs(r, e, s, n.value, o)
                            }
                            );
                            break
                        }
                    default:
                        throw new $t(`FieldType ${n} unrecognized`)
                    }
                else
                    i_(r, t, o)
            } catch (s) {
                throw s instanceof $t && s.addToFieldPath(e),
                s
            }
        }
        function i_(r, e, t) {
            if (typeof e.borshSerialize == "function") {
                e.borshSerialize(t);
                return
            }
            let n = r.get(e.constructor);
            if (!n)
                throw new $t(`Class ${e.constructor.name} is missing in schema`);
            if (n.kind === "struct")
                n.fields.map( ([o,s]) => {
                    gs(r, o, e[o], s, t)
                }
                );
            else if (n.kind === "enum") {
                let o = e[n.field];
                for (let s = 0; s < n.values.length; ++s) {
                    let[i,u] = n.values[s];
                    if (i === o) {
                        t.writeU8(s),
                        gs(r, i, e[i], u, t);
                        break
                    }
                }
            } else
                throw new $t(`Unexpected schema kind: ${n.kind} for ${e.constructor.name}`)
        }
        function R4(r, e, t=nu) {
            let n = new t;
            return i_(r, e, n),
            n.toArray()
        }
        Xe.serialize = R4;
        function xs(r, e, t, n) {
            try {
                if (typeof t == "string")
                    return n[`read${s_(t)}`]();
                if (t instanceof Array) {
                    if (typeof t[0] == "number")
                        return n.readFixedArray(t[0]);
                    if (typeof t[1] == "number") {
                        let o = [];
                        for (let s = 0; s < t[1]; s++)
                            o.push(xs(r, null, t[0], n));
                        return o
                    } else
                        return n.readArray( () => xs(r, e, t[0], n))
                }
                if (t.kind === "option")
                    return n.readU8() ? xs(r, e, t.type, n) : void 0;
                if (t.kind === "map") {
                    let o = new Map
                      , s = n.readU32();
                    for (let i = 0; i < s; i++) {
                        let u = xs(r, e, t.key, n)
                          , f = xs(r, e, t.value, n);
                        o.set(u, f)
                    }
                    return o
                }
                return Md(r, t, n)
            } catch (o) {
                throw o instanceof $t && o.addToFieldPath(e),
                o
            }
        }
        function Md(r, e, t) {
            if (typeof e.borshDeserialize == "function")
                return e.borshDeserialize(t);
            let n = r.get(e);
            if (!n)
                throw new $t(`Class ${e.name} is missing in schema`);
            if (n.kind === "struct") {
                let o = {};
                for (let[s,i] of r.get(e).fields)
                    o[s] = xs(r, s, i, t);
                return new e(o)
            }
            if (n.kind === "enum") {
                let o = t.readU8();
                if (o >= n.values.length)
                    throw new $t(`Enum index: ${o} is out of range`);
                let[s,i] = n.values[o]
                  , u = xs(r, s, i, t);
                return new e({
                    [s]: u
                })
            }
            throw new $t(`Unexpected schema kind: ${n.kind} for ${e.constructor.name}`)
        }
        function B4(r, e, t, n=fr) {
            let o = new n(t)
              , s = Md(r, e, o);
            if (o.offset < t.length)
                throw new $t(`Unexpected ${t.length - o.offset} bytes after deserialized data`);
            return s
        }
        Xe.deserialize = B4;
        function T4(r, e, t, n=fr) {
            let o = new n(t);
            return Md(r, e, o)
        }
        Xe.deserializeUnchecked = T4
    }
    );
    var Ld = _e(ai => {
        "use strict";
        h();
        Object.defineProperty(ai, "__esModule", {
            value: !0
        });
        var ou;
        function P4(r) {
            {
                let e = A.from(r);
                e.reverse();
                let t = e.toString("hex");
                return t.length === 0 ? BigInt(0) : BigInt(`0x${t}`)
            }
            return ou.toBigInt(r, !1)
        }
        ai.toBigIntLE = P4;
        function z4(r) {
            {
                let e = r.toString("hex");
                return e.length === 0 ? BigInt(0) : BigInt(`0x${e}`)
            }
            return ou.toBigInt(r, !0)
        }
        ai.toBigIntBE = z4;
        function M4(r, e) {
            {
                let t = r.toString(16)
                  , n = A.from(t.padStart(e * 2, "0").slice(0, e * 2), "hex");
                return n.reverse(),
                n
            }
            return ou.fromBigInt(r, A.allocUnsafe(e), !1)
        }
        ai.toBufferLE = M4;
        function L4(r, e) {
            {
                let t = r.toString(16);
                return A.from(t.padStart(e * 2, "0").slice(0, e * 2), "hex")
            }
            return ou.fromBigInt(r, A.allocUnsafe(e), !0)
        }
        ai.toBufferBE = L4
    }
    );
    function N4(r) {
        return yo(r) && typeof r[Symbol.iterator] == "function"
    }
    function yo(r) {
        return typeof r == "object" && r != null
    }
    function Wr(r) {
        return typeof r == "string" ? JSON.stringify(r) : "" + r
    }
    function C4(r) {
        let {done: e, value: t} = r.next();
        return e ? void 0 : t
    }
    function O4(r, e, t, n) {
        if (r === !0)
            return;
        r === !1 ? r = {} : typeof r == "string" && (r = {
            message: r
        });
        let {path: o, branch: s} = e
          , {type: i} = t
          , {refinement: u, message: f="Expected a value of type `" + i + "`" + (u ? " with refinement `" + u + "`" : "") + ", but received: `" + Wr(n) + "`"} = r;
        return {
            value: n,
            type: i,
            refinement: u,
            key: o[o.length - 1],
            path: o,
            branch: s,
            ...r,
            message: f
        }
    }
    function *c_(r, e, t, n) {
        N4(r) || (r = [r]);
        for (let o of r) {
            let s = O4(o, e, t, n);
            s && (yield s)
        }
    }
    function *Cd(r, e, t={}) {
        let {path: n=[], branch: o=[r], coerce: s=!1, mask: i=!1} = t
          , u = {
            path: n,
            branch: o
        };
        if (s && (r = e.coercer(r, u),
        i && e.type !== "type" && yo(e.schema) && yo(r) && !Array.isArray(r)))
            for (let g in r)
                e.schema[g] === void 0 && delete r[g];
        let f = !0;
        for (let g of e.validator(r, u))
            f = !1,
            yield[g, void 0];
        for (let[g,b,E] of e.entries(r, u)) {
            let q = Cd(b, E, {
                path: g === void 0 ? n : [...n, g],
                branch: g === void 0 ? o : [...o, b],
                coerce: s,
                mask: i
            });
            for (let O of q)
                O[0] ? (f = !1,
                yield[O[0], void 0]) : s && (b = O[1],
                g === void 0 ? r = b : r instanceof Map ? r.set(g, b) : r instanceof Set ? r.add(b) : yo(r) && (r[g] = b))
        }
        if (f)
            for (let g of e.refiner(r, u))
                f = !1,
                yield[g, void 0];
        f && (yield[void 0, r])
    }
    function u_(r, e) {
        let t = na(r, e);
        if (t[0])
            throw t[0]
    }
    function ci(r, e) {
        let t = na(r, e, {
            coerce: !0
        });
        if (t[0])
            throw t[0];
        return t[1]
    }
    function q4(r, e) {
        let t = na(r, e, {
            coerce: !0,
            mask: !0
        });
        if (t[0])
            throw t[0];
        return t[1]
    }
    function p_(r, e) {
        return !na(r, e)[0]
    }
    function na(r, e, t={}) {
        let n = Cd(r, e, t)
          , o = C4(n);
        return o[0] ? [new Nd(o[0],function*() {
            for (let i of n)
                i[0] && (yield i[0])
        }
        ), void 0] : [void 0, o[1]]
    }
    function ws(r, e) {
        return new Cr({
            type: r,
            schema: null,
            validator: e
        })
    }
    function f_() {
        return ws("any", () => !0)
    }
    function xe(r) {
        return new Cr({
            type: "array",
            schema: r,
            *entries(e) {
                if (r && Array.isArray(e))
                    for (let[t,n] of e.entries())
                        yield[t, n, r]
            },
            coercer(e) {
                return Array.isArray(e) ? e.slice() : e
            },
            validator(e) {
                return Array.isArray(e) || "Expected an array value, but received: " + Wr(e)
            }
        })
    }
    function yn() {
        return ws("boolean", r => typeof r == "boolean")
    }
    function su(r) {
        return ws("instance", e => e instanceof r || "Expected a `" + r.name + "` instance, but received: " + Wr(e))
    }
    function qt(r) {
        let e = Wr(r)
          , t = typeof r;
        return new Cr({
            type: "literal",
            schema: t === "string" || t === "number" || t === "boolean" ? r : null,
            validator(n) {
                return n === r || "Expected the literal `" + e + "`, but received: " + Wr(n)
            }
        })
    }
    function U4() {
        return ws("never", () => !1)
    }
    function ye(r) {
        return new Cr({
            ...r,
            validator: (e, t) => e === null || r.validator(e, t),
            refiner: (e, t) => e === null || r.refiner(e, t)
        })
    }
    function H() {
        return ws("number", r => typeof r == "number" && !isNaN(r) || "Expected a number, but received: " + Wr(r))
    }
    function ke(r) {
        return new Cr({
            ...r,
            validator: (e, t) => e === void 0 || r.validator(e, t),
            refiner: (e, t) => e === void 0 || r.refiner(e, t)
        })
    }
    function Od(r, e) {
        return new Cr({
            type: "record",
            schema: null,
            *entries(t) {
                if (yo(t))
                    for (let n in t) {
                        let o = t[n];
                        yield[n, n, r],
                        yield[n, o, e]
                    }
            },
            validator(t) {
                return yo(t) || "Expected an object, but received: " + Wr(t)
            }
        })
    }
    function pe() {
        return ws("string", r => typeof r == "string" || "Expected a string, but received: " + Wr(r))
    }
    function iu(r) {
        let e = U4();
        return new Cr({
            type: "tuple",
            schema: null,
            *entries(t) {
                if (Array.isArray(t)) {
                    let n = Math.max(r.length, t.length);
                    for (let o = 0; o < n; o++)
                        yield[o, t[o], r[o] || e]
                }
            },
            validator(t) {
                return Array.isArray(t) || "Expected an array, but received: " + Wr(t)
            }
        })
    }
    function re(r) {
        let e = Object.keys(r);
        return new Cr({
            type: "type",
            schema: r,
            *entries(t) {
                if (yo(t))
                    for (let n of e)
                        yield[n, t[n], r[n]]
            },
            validator(t) {
                return yo(t) || "Expected an object, but received: " + Wr(t)
            }
        })
    }
    function lr(r) {
        let e = r.map(t => t.type).join(" | ");
        return new Cr({
            type: "union",
            schema: null,
            validator(t, n) {
                let o = [];
                for (let s of r) {
                    let[...i] = Cd(t, s, n)
                      , [u] = i;
                    if (u[0])
                        for (let[f] of i)
                            f && o.push(f);
                    else
                        return []
                }
                return ["Expected the value to satisfy a union of `" + e + "`, but received: " + Wr(t), ...o]
            }
        })
    }
    function ui() {
        return ws("unknown", () => !0)
    }
    function pi(r, e, t) {
        return new Cr({
            ...r,
            coercer: (n, o) => p_(n, e) ? r.coercer(t(n, o), o) : r.coercer(n, o)
        })
    }
    var Nd, Cr, l_ = C( () => {
        h();
        Nd = class extends TypeError {
            constructor(e, t) {
                let n, {message: o, ...s} = e, {path: i} = e, u = i.length === 0 ? o : "At path: " + i.join(".") + " -- " + o;
                super(u),
                Object.assign(this, s),
                this.name = this.constructor.name,
                this.failures = () => {
                    var f;
                    return (f = n) != null ? f : n = [e, ...t()]
                }
            }
        }
        ;
        Cr = class {
            constructor(e) {
                let {type: t, schema: n, validator: o, refiner: s, coercer: i=f => f, entries: u=function*() {}
                } = e;
                this.type = t,
                this.schema = n,
                this.entries = u,
                this.coercer = i,
                o ? this.validator = (f, g) => {
                    let b = o(f, g);
                    return c_(b, g, this, f)
                }
                : this.validator = () => [],
                s ? this.refiner = (f, g) => {
                    let b = s(f, g);
                    return c_(b, g, this, f)
                }
                : this.refiner = () => []
            }
            assert(e) {
                return u_(e, this)
            }
            create(e) {
                return ci(e, this)
            }
            is(e) {
                return p_(e, this)
            }
            mask(e) {
                return q4(e, this)
            }
            validate(e, t={}) {
                return na(e, this, t)
            }
        }
    }
    );
    var Ud = _e(qd => {
        "use strict";
        h();
        Object.defineProperty(qd, "__esModule", {
            value: !0
        });
        qd.default = F4;
        var au, D4 = new Uint8Array(16);
        function F4() {
            if (!au && (au = typeof crypto < "u" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto),
            !au))
                throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
            return au(D4)
        }
    }
    );
    var d_ = _e(cu => {
        "use strict";
        h();
        Object.defineProperty(cu, "__esModule", {
            value: !0
        });
        cu.default = void 0;
        var j4 = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
        cu.default = j4
    }
    );
    var oa = _e(uu => {
        "use strict";
        h();
        Object.defineProperty(uu, "__esModule", {
            value: !0
        });
        uu.default = void 0;
        var H4 = K4(d_());
        function K4(r) {
            return r && r.__esModule ? r : {
                default: r
            }
        }
        function W4(r) {
            return typeof r == "string" && H4.default.test(r)
        }
        var V4 = W4;
        uu.default = V4
    }
    );
    var ia = _e(sa => {
        "use strict";
        h();
        Object.defineProperty(sa, "__esModule", {
            value: !0
        });
        sa.default = void 0;
        sa.unsafeStringify = h_;
        var G4 = Z4(oa());
        function Z4(r) {
            return r && r.__esModule ? r : {
                default: r
            }
        }
        var Jt = [];
        for (let r = 0; r < 256; ++r)
            Jt.push((r + 256).toString(16).slice(1));
        function h_(r, e=0) {
            return Jt[r[e + 0]] + Jt[r[e + 1]] + Jt[r[e + 2]] + Jt[r[e + 3]] + "-" + Jt[r[e + 4]] + Jt[r[e + 5]] + "-" + Jt[r[e + 6]] + Jt[r[e + 7]] + "-" + Jt[r[e + 8]] + Jt[r[e + 9]] + "-" + Jt[r[e + 10]] + Jt[r[e + 11]] + Jt[r[e + 12]] + Jt[r[e + 13]] + Jt[r[e + 14]] + Jt[r[e + 15]]
        }
        function Y4(r, e=0) {
            let t = h_(r, e);
            if (!(0,
            G4.default)(t))
                throw TypeError("Stringified UUID is invalid");
            return t
        }
        var $4 = Y4;
        sa.default = $4
    }
    );
    var m_ = _e(pu => {
        "use strict";
        h();
        Object.defineProperty(pu, "__esModule", {
            value: !0
        });
        pu.default = void 0;
        var J4 = Q4(Ud())
          , X4 = ia();
        function Q4(r) {
            return r && r.__esModule ? r : {
                default: r
            }
        }
        var y_, Dd, Fd = 0, jd = 0;
        function eC(r, e, t) {
            let n = e && t || 0
              , o = e || new Array(16);
            r = r || {};
            let s = r.node || y_
              , i = r.clockseq !== void 0 ? r.clockseq : Dd;
            if (s == null || i == null) {
                let q = r.random || (r.rng || J4.default)();
                s == null && (s = y_ = [q[0] | 1, q[1], q[2], q[3], q[4], q[5]]),
                i == null && (i = Dd = (q[6] << 8 | q[7]) & 16383)
            }
            let u = r.msecs !== void 0 ? r.msecs : Date.now()
              , f = r.nsecs !== void 0 ? r.nsecs : jd + 1
              , g = u - Fd + (f - jd) / 1e4;
            if (g < 0 && r.clockseq === void 0 && (i = i + 1 & 16383),
            (g < 0 || u > Fd) && r.nsecs === void 0 && (f = 0),
            f >= 1e4)
                throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
            Fd = u,
            jd = f,
            Dd = i,
            u += 122192928e5;
            let b = ((u & 268435455) * 1e4 + f) % 4294967296;
            o[n++] = b >>> 24 & 255,
            o[n++] = b >>> 16 & 255,
            o[n++] = b >>> 8 & 255,
            o[n++] = b & 255;
            let E = u / 4294967296 * 1e4 & 268435455;
            o[n++] = E >>> 8 & 255,
            o[n++] = E & 255,
            o[n++] = E >>> 24 & 15 | 16,
            o[n++] = E >>> 16 & 255,
            o[n++] = i >>> 8 | 128,
            o[n++] = i & 255;
            for (let q = 0; q < 6; ++q)
                o[n + q] = s[q];
            return e || (0,
            X4.unsafeStringify)(o)
        }
        var tC = eC;
        pu.default = tC
    }
    );
    var Hd = _e(fu => {
        "use strict";
        h();
        Object.defineProperty(fu, "__esModule", {
            value: !0
        });
        fu.default = void 0;
        var rC = nC(oa());
        function nC(r) {
            return r && r.__esModule ? r : {
                default: r
            }
        }
        function oC(r) {
            if (!(0,
            rC.default)(r))
                throw TypeError("Invalid UUID");
            let e, t = new Uint8Array(16);
            return t[0] = (e = parseInt(r.slice(0, 8), 16)) >>> 24,
            t[1] = e >>> 16 & 255,
            t[2] = e >>> 8 & 255,
            t[3] = e & 255,
            t[4] = (e = parseInt(r.slice(9, 13), 16)) >>> 8,
            t[5] = e & 255,
            t[6] = (e = parseInt(r.slice(14, 18), 16)) >>> 8,
            t[7] = e & 255,
            t[8] = (e = parseInt(r.slice(19, 23), 16)) >>> 8,
            t[9] = e & 255,
            t[10] = (e = parseInt(r.slice(24, 36), 16)) / 1099511627776 & 255,
            t[11] = e / 4294967296 & 255,
            t[12] = e >>> 24 & 255,
            t[13] = e >>> 16 & 255,
            t[14] = e >>> 8 & 255,
            t[15] = e & 255,
            t
        }
        var sC = oC;
        fu.default = sC
    }
    );
    var Kd = _e(bs => {
        "use strict";
        h();
        Object.defineProperty(bs, "__esModule", {
            value: !0
        });
        bs.URL = bs.DNS = void 0;
        bs.default = pC;
        var iC = ia()
          , aC = cC(Hd());
        function cC(r) {
            return r && r.__esModule ? r : {
                default: r
            }
        }
        function uC(r) {
            r = unescape(encodeURIComponent(r));
            let e = [];
            for (let t = 0; t < r.length; ++t)
                e.push(r.charCodeAt(t));
            return e
        }
        var g_ = "6ba7b810-9dad-11d1-80b4-00c04fd430c8";
        bs.DNS = g_;
        var x_ = "6ba7b811-9dad-11d1-80b4-00c04fd430c8";
        bs.URL = x_;
        function pC(r, e, t) {
            function n(o, s, i, u) {
                var f;
                if (typeof o == "string" && (o = uC(o)),
                typeof s == "string" && (s = (0,
                aC.default)(s)),
                ((f = s) === null || f === void 0 ? void 0 : f.length) !== 16)
                    throw TypeError("Namespace must be array-like (16 iterable integer values, 0-255)");
                let g = new Uint8Array(16 + o.length);
                if (g.set(s),
                g.set(o, s.length),
                g = t(g),
                g[6] = g[6] & 15 | e,
                g[8] = g[8] & 63 | 128,
                i) {
                    u = u || 0;
                    for (let b = 0; b < 16; ++b)
                        i[u + b] = g[b];
                    return i
                }
                return (0,
                iC.unsafeStringify)(g)
            }
            try {
                n.name = r
            } catch {}
            return n.DNS = g_,
            n.URL = x_,
            n
        }
    }
    );
    var b_ = _e(du => {
        "use strict";
        h();
        Object.defineProperty(du, "__esModule", {
            value: !0
        });
        du.default = void 0;
        function fC(r) {
            if (typeof r == "string") {
                let e = unescape(encodeURIComponent(r));
                r = new Uint8Array(e.length);
                for (let t = 0; t < e.length; ++t)
                    r[t] = e.charCodeAt(t)
            }
            return lC(dC(hC(r), r.length * 8))
        }
        function lC(r) {
            let e = []
              , t = r.length * 32
              , n = "0123456789abcdef";
            for (let o = 0; o < t; o += 8) {
                let s = r[o >> 5] >>> o % 32 & 255
                  , i = parseInt(n.charAt(s >>> 4 & 15) + n.charAt(s & 15), 16);
                e.push(i)
            }
            return e
        }
        function w_(r) {
            return (r + 64 >>> 9 << 4) + 14 + 1
        }
        function dC(r, e) {
            r[e >> 5] |= 128 << e % 32,
            r[w_(e) - 1] = e;
            let t = 1732584193
              , n = -271733879
              , o = -1732584194
              , s = 271733878;
            for (let i = 0; i < r.length; i += 16) {
                let u = t
                  , f = n
                  , g = o
                  , b = s;
                t = or(t, n, o, s, r[i], 7, -680876936),
                s = or(s, t, n, o, r[i + 1], 12, -389564586),
                o = or(o, s, t, n, r[i + 2], 17, 606105819),
                n = or(n, o, s, t, r[i + 3], 22, -1044525330),
                t = or(t, n, o, s, r[i + 4], 7, -176418897),
                s = or(s, t, n, o, r[i + 5], 12, 1200080426),
                o = or(o, s, t, n, r[i + 6], 17, -1473231341),
                n = or(n, o, s, t, r[i + 7], 22, -45705983),
                t = or(t, n, o, s, r[i + 8], 7, 1770035416),
                s = or(s, t, n, o, r[i + 9], 12, -1958414417),
                o = or(o, s, t, n, r[i + 10], 17, -42063),
                n = or(n, o, s, t, r[i + 11], 22, -1990404162),
                t = or(t, n, o, s, r[i + 12], 7, 1804603682),
                s = or(s, t, n, o, r[i + 13], 12, -40341101),
                o = or(o, s, t, n, r[i + 14], 17, -1502002290),
                n = or(n, o, s, t, r[i + 15], 22, 1236535329),
                t = sr(t, n, o, s, r[i + 1], 5, -165796510),
                s = sr(s, t, n, o, r[i + 6], 9, -1069501632),
                o = sr(o, s, t, n, r[i + 11], 14, 643717713),
                n = sr(n, o, s, t, r[i], 20, -373897302),
                t = sr(t, n, o, s, r[i + 5], 5, -701558691),
                s = sr(s, t, n, o, r[i + 10], 9, 38016083),
                o = sr(o, s, t, n, r[i + 15], 14, -660478335),
                n = sr(n, o, s, t, r[i + 4], 20, -405537848),
                t = sr(t, n, o, s, r[i + 9], 5, 568446438),
                s = sr(s, t, n, o, r[i + 14], 9, -1019803690),
                o = sr(o, s, t, n, r[i + 3], 14, -187363961),
                n = sr(n, o, s, t, r[i + 8], 20, 1163531501),
                t = sr(t, n, o, s, r[i + 13], 5, -1444681467),
                s = sr(s, t, n, o, r[i + 2], 9, -51403784),
                o = sr(o, s, t, n, r[i + 7], 14, 1735328473),
                n = sr(n, o, s, t, r[i + 12], 20, -1926607734),
                t = ir(t, n, o, s, r[i + 5], 4, -378558),
                s = ir(s, t, n, o, r[i + 8], 11, -2022574463),
                o = ir(o, s, t, n, r[i + 11], 16, 1839030562),
                n = ir(n, o, s, t, r[i + 14], 23, -35309556),
                t = ir(t, n, o, s, r[i + 1], 4, -1530992060),
                s = ir(s, t, n, o, r[i + 4], 11, 1272893353),
                o = ir(o, s, t, n, r[i + 7], 16, -155497632),
                n = ir(n, o, s, t, r[i + 10], 23, -1094730640),
                t = ir(t, n, o, s, r[i + 13], 4, 681279174),
                s = ir(s, t, n, o, r[i], 11, -358537222),
                o = ir(o, s, t, n, r[i + 3], 16, -722521979),
                n = ir(n, o, s, t, r[i + 6], 23, 76029189),
                t = ir(t, n, o, s, r[i + 9], 4, -640364487),
                s = ir(s, t, n, o, r[i + 12], 11, -421815835),
                o = ir(o, s, t, n, r[i + 15], 16, 530742520),
                n = ir(n, o, s, t, r[i + 2], 23, -995338651),
                t = ar(t, n, o, s, r[i], 6, -198630844),
                s = ar(s, t, n, o, r[i + 7], 10, 1126891415),
                o = ar(o, s, t, n, r[i + 14], 15, -1416354905),
                n = ar(n, o, s, t, r[i + 5], 21, -57434055),
                t = ar(t, n, o, s, r[i + 12], 6, 1700485571),
                s = ar(s, t, n, o, r[i + 3], 10, -1894986606),
                o = ar(o, s, t, n, r[i + 10], 15, -1051523),
                n = ar(n, o, s, t, r[i + 1], 21, -2054922799),
                t = ar(t, n, o, s, r[i + 8], 6, 1873313359),
                s = ar(s, t, n, o, r[i + 15], 10, -30611744),
                o = ar(o, s, t, n, r[i + 6], 15, -1560198380),
                n = ar(n, o, s, t, r[i + 13], 21, 1309151649),
                t = ar(t, n, o, s, r[i + 4], 6, -145523070),
                s = ar(s, t, n, o, r[i + 11], 10, -1120210379),
                o = ar(o, s, t, n, r[i + 2], 15, 718787259),
                n = ar(n, o, s, t, r[i + 9], 21, -343485551),
                t = mo(t, u),
                n = mo(n, f),
                o = mo(o, g),
                s = mo(s, b)
            }
            return [t, n, o, s]
        }
        function hC(r) {
            if (r.length === 0)
                return [];
            let e = r.length * 8
              , t = new Uint32Array(w_(e));
            for (let n = 0; n < e; n += 8)
                t[n >> 5] |= (r[n / 8] & 255) << n % 32;
            return t
        }
        function mo(r, e) {
            let t = (r & 65535) + (e & 65535);
            return (r >> 16) + (e >> 16) + (t >> 16) << 16 | t & 65535
        }
        function yC(r, e) {
            return r << e | r >>> 32 - e
        }
        function lu(r, e, t, n, o, s) {
            return mo(yC(mo(mo(e, r), mo(n, s)), o), t)
        }
        function or(r, e, t, n, o, s, i) {
            return lu(e & t | ~e & n, r, e, o, s, i)
        }
        function sr(r, e, t, n, o, s, i) {
            return lu(e & n | t & ~n, r, e, o, s, i)
        }
        function ir(r, e, t, n, o, s, i) {
            return lu(e ^ t ^ n, r, e, o, s, i)
        }
        function ar(r, e, t, n, o, s, i) {
            return lu(t ^ (e | ~n), r, e, o, s, i)
        }
        var mC = fC;
        du.default = mC
    }
    );
    var v_ = _e(hu => {
        "use strict";
        h();
        Object.defineProperty(hu, "__esModule", {
            value: !0
        });
        hu.default = void 0;
        var gC = S_(Kd())
          , xC = S_(b_());
        function S_(r) {
            return r && r.__esModule ? r : {
                default: r
            }
        }
        var wC = (0,
        gC.default)("v3", 48, xC.default)
          , bC = wC;
        hu.default = bC
    }
    );
    var E_ = _e(yu => {
        "use strict";
        h();
        Object.defineProperty(yu, "__esModule", {
            value: !0
        });
        yu.default = void 0;
        var SC = typeof crypto < "u" && crypto.randomUUID && crypto.randomUUID.bind(crypto)
          , vC = {
            randomUUID: SC
        };
        yu.default = vC
    }
    );
    var k_ = _e(mu => {
        "use strict";
        h();
        Object.defineProperty(mu, "__esModule", {
            value: !0
        });
        mu.default = void 0;
        var __ = A_(E_())
          , EC = A_(Ud())
          , _C = ia();
        function A_(r) {
            return r && r.__esModule ? r : {
                default: r
            }
        }
        function AC(r, e, t) {
            if (__.default.randomUUID && !e && !r)
                return __.default.randomUUID();
            r = r || {};
            let n = r.random || (r.rng || EC.default)();
            if (n[6] = n[6] & 15 | 64,
            n[8] = n[8] & 63 | 128,
            e) {
                t = t || 0;
                for (let o = 0; o < 16; ++o)
                    e[t + o] = n[o];
                return e
            }
            return (0,
            _C.unsafeStringify)(n)
        }
        var kC = AC;
        mu.default = kC
    }
    );
    var I_ = _e(gu => {
        "use strict";
        h();
        Object.defineProperty(gu, "__esModule", {
            value: !0
        });
        gu.default = void 0;
        function IC(r, e, t, n) {
            switch (r) {
            case 0:
                return e & t ^ ~e & n;
            case 1:
                return e ^ t ^ n;
            case 2:
                return e & t ^ e & n ^ t & n;
            case 3:
                return e ^ t ^ n
            }
        }
        function Wd(r, e) {
            return r << e | r >>> 32 - e
        }
        function RC(r) {
            let e = [1518500249, 1859775393, 2400959708, 3395469782]
              , t = [1732584193, 4023233417, 2562383102, 271733878, 3285377520];
            if (typeof r == "string") {
                let i = unescape(encodeURIComponent(r));
                r = [];
                for (let u = 0; u < i.length; ++u)
                    r.push(i.charCodeAt(u))
            } else
                Array.isArray(r) || (r = Array.prototype.slice.call(r));
            r.push(128);
            let n = r.length / 4 + 2
              , o = Math.ceil(n / 16)
              , s = new Array(o);
            for (let i = 0; i < o; ++i) {
                let u = new Uint32Array(16);
                for (let f = 0; f < 16; ++f)
                    u[f] = r[i * 64 + f * 4] << 24 | r[i * 64 + f * 4 + 1] << 16 | r[i * 64 + f * 4 + 2] << 8 | r[i * 64 + f * 4 + 3];
                s[i] = u
            }
            s[o - 1][14] = (r.length - 1) * 8 / Math.pow(2, 32),
            s[o - 1][14] = Math.floor(s[o - 1][14]),
            s[o - 1][15] = (r.length - 1) * 8 & 4294967295;
            for (let i = 0; i < o; ++i) {
                let u = new Uint32Array(80);
                for (let O = 0; O < 16; ++O)
                    u[O] = s[i][O];
                for (let O = 16; O < 80; ++O)
                    u[O] = Wd(u[O - 3] ^ u[O - 8] ^ u[O - 14] ^ u[O - 16], 1);
                let f = t[0]
                  , g = t[1]
                  , b = t[2]
                  , E = t[3]
                  , q = t[4];
                for (let O = 0; O < 80; ++O) {
                    let Z = Math.floor(O / 20)
                      , ee = Wd(f, 5) + IC(Z, g, b, E) + q + e[Z] + u[O] >>> 0;
                    q = E,
                    E = b,
                    b = Wd(g, 30) >>> 0,
                    g = f,
                    f = ee
                }
                t[0] = t[0] + f >>> 0,
                t[1] = t[1] + g >>> 0,
                t[2] = t[2] + b >>> 0,
                t[3] = t[3] + E >>> 0,
                t[4] = t[4] + q >>> 0
            }
            return [t[0] >> 24 & 255, t[0] >> 16 & 255, t[0] >> 8 & 255, t[0] & 255, t[1] >> 24 & 255, t[1] >> 16 & 255, t[1] >> 8 & 255, t[1] & 255, t[2] >> 24 & 255, t[2] >> 16 & 255, t[2] >> 8 & 255, t[2] & 255, t[3] >> 24 & 255, t[3] >> 16 & 255, t[3] >> 8 & 255, t[3] & 255, t[4] >> 24 & 255, t[4] >> 16 & 255, t[4] >> 8 & 255, t[4] & 255]
        }
        var BC = RC;
        gu.default = BC
    }
    );
    var B_ = _e(xu => {
        "use strict";
        h();
        Object.defineProperty(xu, "__esModule", {
            value: !0
        });
        xu.default = void 0;
        var TC = R_(Kd())
          , PC = R_(I_());
        function R_(r) {
            return r && r.__esModule ? r : {
                default: r
            }
        }
        var zC = (0,
        TC.default)("v5", 80, PC.default)
          , MC = zC;
        xu.default = MC
    }
    );
    var T_ = _e(wu => {
        "use strict";
        h();
        Object.defineProperty(wu, "__esModule", {
            value: !0
        });
        wu.default = void 0;
        var LC = "00000000-0000-0000-0000-000000000000";
        wu.default = LC
    }
    );
    var P_ = _e(bu => {
        "use strict";
        h();
        Object.defineProperty(bu, "__esModule", {
            value: !0
        });
        bu.default = void 0;
        var NC = CC(oa());
        function CC(r) {
            return r && r.__esModule ? r : {
                default: r
            }
        }
        function OC(r) {
            if (!(0,
            NC.default)(r))
                throw TypeError("Invalid UUID");
            return parseInt(r.slice(14, 15), 16)
        }
        var qC = OC;
        bu.default = qC
    }
    );
    var Vd = _e(Vr => {
        "use strict";
        h();
        Object.defineProperty(Vr, "__esModule", {
            value: !0
        });
        Object.defineProperty(Vr, "NIL", {
            enumerable: !0,
            get: function() {
                return HC.default
            }
        });
        Object.defineProperty(Vr, "parse", {
            enumerable: !0,
            get: function() {
                return GC.default
            }
        });
        Object.defineProperty(Vr, "stringify", {
            enumerable: !0,
            get: function() {
                return VC.default
            }
        });
        Object.defineProperty(Vr, "v1", {
            enumerable: !0,
            get: function() {
                return UC.default
            }
        });
        Object.defineProperty(Vr, "v3", {
            enumerable: !0,
            get: function() {
                return DC.default
            }
        });
        Object.defineProperty(Vr, "v4", {
            enumerable: !0,
            get: function() {
                return FC.default
            }
        });
        Object.defineProperty(Vr, "v5", {
            enumerable: !0,
            get: function() {
                return jC.default
            }
        });
        Object.defineProperty(Vr, "validate", {
            enumerable: !0,
            get: function() {
                return WC.default
            }
        });
        Object.defineProperty(Vr, "version", {
            enumerable: !0,
            get: function() {
                return KC.default
            }
        });
        var UC = Mn(m_())
          , DC = Mn(v_())
          , FC = Mn(k_())
          , jC = Mn(B_())
          , HC = Mn(T_())
          , KC = Mn(P_())
          , WC = Mn(oa())
          , VC = Mn(ia())
          , GC = Mn(Hd());
        function Mn(r) {
            return r && r.__esModule ? r : {
                default: r
            }
        }
    }
    );
    var M_ = _e( (dX, z_) => {
        "use strict";
        h();
        var ZC = Vd().v4
          , YC = function(r, e, t, n) {
            if (typeof r != "string")
                throw new TypeError(r + " must be a string");
            n = n || {};
            let o = typeof n.version == "number" ? n.version : 2;
            if (o !== 1 && o !== 2)
                throw new TypeError(o + " must be 1 or 2");
            let s = {
                method: r
            };
            if (o === 2 && (s.jsonrpc = "2.0"),
            e) {
                if (typeof e != "object" && !Array.isArray(e))
                    throw new TypeError(e + " must be an object, array or omitted");
                s.params = e
            }
            if (typeof t > "u") {
                let i = typeof n.generator == "function" ? n.generator : function() {
                    return ZC()
                }
                ;
                s.id = i(s, n)
            } else
                o === 2 && t === null ? n.notificationIdNull && (s.id = null) : s.id = t;
            return s
        };
        z_.exports = YC
    }
    );
    var N_ = _e( (yX, L_) => {
        "use strict";
        h();
        var $C = Vd().v4
          , JC = M_()
          , aa = function(r, e) {
            if (!(this instanceof aa))
                return new aa(r,e);
            e || (e = {}),
            this.options = {
                reviver: typeof e.reviver < "u" ? e.reviver : null,
                replacer: typeof e.replacer < "u" ? e.replacer : null,
                generator: typeof e.generator < "u" ? e.generator : function() {
                    return $C()
                }
                ,
                version: typeof e.version < "u" ? e.version : 2,
                notificationIdNull: typeof e.notificationIdNull == "boolean" ? e.notificationIdNull : !1
            },
            this.callServer = r
        };
        L_.exports = aa;
        aa.prototype.request = function(r, e, t, n) {
            let o = this
              , s = null
              , i = Array.isArray(r) && typeof e == "function";
            if (this.options.version === 1 && i)
                throw new TypeError("JSON-RPC 1.0 does not support batching");
            if (i || !i && r && typeof r == "object" && typeof e == "function")
                n = e,
                s = r;
            else {
                typeof t == "function" && (n = t,
                t = void 0);
                let g = typeof n == "function";
                try {
                    s = JC(r, e, t, {
                        generator: this.options.generator,
                        version: this.options.version,
                        notificationIdNull: this.options.notificationIdNull
                    })
                } catch (b) {
                    if (g)
                        return n(b);
                    throw b
                }
                if (!g)
                    return s
            }
            let f;
            try {
                f = JSON.stringify(s, this.options.replacer)
            } catch (g) {
                return n(g)
            }
            return this.callServer(f, function(g, b) {
                o._parseResponse(g, b, n)
            }),
            s
        }
        ;
        aa.prototype._parseResponse = function(r, e, t) {
            if (r) {
                t(r);
                return
            }
            if (!e)
                return t();
            let n;
            try {
                n = JSON.parse(e, this.options.reviver)
            } catch (o) {
                return t(o)
            }
            if (t.length === 3)
                if (Array.isArray(n)) {
                    let o = function(i) {
                        return typeof i.error < "u"
                    }
                      , s = function(i) {
                        return !o(i)
                    };
                    return t(null, n.filter(o), n.filter(s))
                } else
                    return t(null, n.error, n.result);
            t(null, n)
        }
    }
    );
    var Gd = _e( (gX, ca) => {
        h();
        function XC(r) {
            return r && r.__esModule ? r : {
                default: r
            }
        }
        ca.exports = XC,
        ca.exports.__esModule = !0,
        ca.exports.default = ca.exports
    }
    );
    var fi = _e( (wX, Ln) => {
        h();
        function Zd(r) {
            "@babel/helpers - typeof";
            return Ln.exports = Zd = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
                return typeof e
            }
            : function(e) {
                return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            }
            ,
            Ln.exports.__esModule = !0,
            Ln.exports.default = Ln.exports,
            Zd(r)
        }
        Ln.exports = Zd,
        Ln.exports.__esModule = !0,
        Ln.exports.default = Ln.exports
    }
    );
    var O_ = _e( (SX, Nn) => {
        h();
        var QC = fi().default;
        function C_() {
            "use strict";
            Nn.exports = C_ = function() {
                return r
            }
            ,
            Nn.exports.__esModule = !0,
            Nn.exports.default = Nn.exports;
            var r = {}
              , e = Object.prototype
              , t = e.hasOwnProperty
              , n = Object.defineProperty || function(z, m, c) {
                z[m] = c.value
            }
              , o = typeof Symbol == "function" ? Symbol : {}
              , s = o.iterator || "@@iterator"
              , i = o.asyncIterator || "@@asyncIterator"
              , u = o.toStringTag || "@@toStringTag";
            function f(z, m, c) {
                return Object.defineProperty(z, m, {
                    value: c,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }),
                z[m]
            }
            try {
                f({}, "")
            } catch {
                f = function(c, p, d) {
                    return c[p] = d
                }
            }
            function g(z, m, c, p) {
                var d = m && m.prototype instanceof q ? m : q
                  , y = Object.create(d.prototype)
                  , x = new R(p || []);
                return n(y, "_invoke", {
                    value: Oe(z, c, x)
                }),
                y
            }
            function b(z, m, c) {
                try {
                    return {
                        type: "normal",
                        arg: z.call(m, c)
                    }
                } catch (p) {
                    return {
                        type: "throw",
                        arg: p
                    }
                }
            }
            r.wrap = g;
            var E = {};
            function q() {}
            function O() {}
            function Z() {}
            var ee = {};
            f(ee, s, function() {
                return this
            });
            var X = Object.getPrototypeOf
              , le = X && X(X(N([])));
            le && le !== e && t.call(le, s) && (ee = le);
            var W = Z.prototype = q.prototype = Object.create(ee);
            function Se(z) {
                ["next", "throw", "return"].forEach(function(m) {
                    f(z, m, function(c) {
                        return this._invoke(m, c)
                    })
                })
            }
            function ze(z, m) {
                function c(d, y, x, v) {
                    var M = b(z[d], z, y);
                    if (M.type !== "throw") {
                        var S = M.arg
                          , l = S.value;
                        return l && QC(l) == "object" && t.call(l, "__await") ? m.resolve(l.__await).then(function(k) {
                            c("next", k, x, v)
                        }, function(k) {
                            c("throw", k, x, v)
                        }) : m.resolve(l).then(function(k) {
                            S.value = k,
                            x(S)
                        }, function(k) {
                            return c("throw", k, x, v)
                        })
                    }
                    v(M.arg)
                }
                var p;
                n(this, "_invoke", {
                    value: function(y, x) {
                        function v() {
                            return new m(function(M, S) {
                                c(y, x, M, S)
                            }
                            )
                        }
                        return p = p ? p.then(v, v) : v()
                    }
                })
            }
            function Oe(z, m, c) {
                var p = "suspendedStart";
                return function(d, y) {
                    if (p === "executing")
                        throw new Error("Generator is already running");
                    if (p === "completed") {
                        if (d === "throw")
                            throw y;
                        return D()
                    }
                    for (c.method = d,
                    c.arg = y; ; ) {
                        var x = c.delegate;
                        if (x) {
                            var v = Re(x, c);
                            if (v) {
                                if (v === E)
                                    continue;
                                return v
                            }
                        }
                        if (c.method === "next")
                            c.sent = c._sent = c.arg;
                        else if (c.method === "throw") {
                            if (p === "suspendedStart")
                                throw p = "completed",
                                c.arg;
                            c.dispatchException(c.arg)
                        } else
                            c.method === "return" && c.abrupt("return", c.arg);
                        p = "executing";
                        var M = b(z, m, c);
                        if (M.type === "normal") {
                            if (p = c.done ? "completed" : "suspendedYield",
                            M.arg === E)
                                continue;
                            return {
                                value: M.arg,
                                done: c.done
                            }
                        }
                        M.type === "throw" && (p = "completed",
                        c.method = "throw",
                        c.arg = M.arg)
                    }
                }
            }
            function Re(z, m) {
                var c = m.method
                  , p = z.iterator[c];
                if (p === void 0)
                    return m.delegate = null,
                    c === "throw" && z.iterator.return && (m.method = "return",
                    m.arg = void 0,
                    Re(z, m),
                    m.method === "throw") || c !== "return" && (m.method = "throw",
                    m.arg = new TypeError("The iterator does not provide a '" + c + "' method")),
                    E;
                var d = b(p, z.iterator, m.arg);
                if (d.type === "throw")
                    return m.method = "throw",
                    m.arg = d.arg,
                    m.delegate = null,
                    E;
                var y = d.arg;
                return y ? y.done ? (m[z.resultName] = y.value,
                m.next = z.nextLoc,
                m.method !== "return" && (m.method = "next",
                m.arg = void 0),
                m.delegate = null,
                E) : y : (m.method = "throw",
                m.arg = new TypeError("iterator result is not an object"),
                m.delegate = null,
                E)
            }
            function Fe(z) {
                var m = {
                    tryLoc: z[0]
                };
                1 in z && (m.catchLoc = z[1]),
                2 in z && (m.finallyLoc = z[2],
                m.afterLoc = z[3]),
                this.tryEntries.push(m)
            }
            function _(z) {
                var m = z.completion || {};
                m.type = "normal",
                delete m.arg,
                z.completion = m
            }
            function R(z) {
                this.tryEntries = [{
                    tryLoc: "root"
                }],
                z.forEach(Fe, this),
                this.reset(!0)
            }
            function N(z) {
                if (z) {
                    var m = z[s];
                    if (m)
                        return m.call(z);
                    if (typeof z.next == "function")
                        return z;
                    if (!isNaN(z.length)) {
                        var c = -1
                          , p = function d() {
                            for (; ++c < z.length; )
                                if (t.call(z, c))
                                    return d.value = z[c],
                                    d.done = !1,
                                    d;
                            return d.value = void 0,
                            d.done = !0,
                            d
                        };
                        return p.next = p
                    }
                }
                return {
                    next: D
                }
            }
            function D() {
                return {
                    value: void 0,
                    done: !0
                }
            }
            return O.prototype = Z,
            n(W, "constructor", {
                value: Z,
                configurable: !0
            }),
            n(Z, "constructor", {
                value: O,
                configurable: !0
            }),
            O.displayName = f(Z, u, "GeneratorFunction"),
            r.isGeneratorFunction = function(z) {
                var m = typeof z == "function" && z.constructor;
                return !!m && (m === O || (m.displayName || m.name) === "GeneratorFunction")
            }
            ,
            r.mark = function(z) {
                return Object.setPrototypeOf ? Object.setPrototypeOf(z, Z) : (z.__proto__ = Z,
                f(z, u, "GeneratorFunction")),
                z.prototype = Object.create(W),
                z
            }
            ,
            r.awrap = function(z) {
                return {
                    __await: z
                }
            }
            ,
            Se(ze.prototype),
            f(ze.prototype, i, function() {
                return this
            }),
            r.AsyncIterator = ze,
            r.async = function(z, m, c, p, d) {
                d === void 0 && (d = Promise);
                var y = new ze(g(z, m, c, p),d);
                return r.isGeneratorFunction(m) ? y : y.next().then(function(x) {
                    return x.done ? x.value : y.next()
                })
            }
            ,
            Se(W),
            f(W, u, "Generator"),
            f(W, s, function() {
                return this
            }),
            f(W, "toString", function() {
                return "[object Generator]"
            }),
            r.keys = function(z) {
                var m = Object(z)
                  , c = [];
                for (var p in m)
                    c.push(p);
                return c.reverse(),
                function d() {
                    for (; c.length; ) {
                        var y = c.pop();
                        if (y in m)
                            return d.value = y,
                            d.done = !1,
                            d
                    }
                    return d.done = !0,
                    d
                }
            }
            ,
            r.values = N,
            R.prototype = {
                constructor: R,
                reset: function(m) {
                    if (this.prev = 0,
                    this.next = 0,
                    this.sent = this._sent = void 0,
                    this.done = !1,
                    this.delegate = null,
                    this.method = "next",
                    this.arg = void 0,
                    this.tryEntries.forEach(_),
                    !m)
                        for (var c in this)
                            c.charAt(0) === "t" && t.call(this, c) && !isNaN(+c.slice(1)) && (this[c] = void 0)
                },
                stop: function() {
                    this.done = !0;
                    var m = this.tryEntries[0].completion;
                    if (m.type === "throw")
                        throw m.arg;
                    return this.rval
                },
                dispatchException: function(m) {
                    if (this.done)
                        throw m;
                    var c = this;
                    function p(S, l) {
                        return x.type = "throw",
                        x.arg = m,
                        c.next = S,
                        l && (c.method = "next",
                        c.arg = void 0),
                        !!l
                    }
                    for (var d = this.tryEntries.length - 1; d >= 0; --d) {
                        var y = this.tryEntries[d]
                          , x = y.completion;
                        if (y.tryLoc === "root")
                            return p("end");
                        if (y.tryLoc <= this.prev) {
                            var v = t.call(y, "catchLoc")
                              , M = t.call(y, "finallyLoc");
                            if (v && M) {
                                if (this.prev < y.catchLoc)
                                    return p(y.catchLoc, !0);
                                if (this.prev < y.finallyLoc)
                                    return p(y.finallyLoc)
                            } else if (v) {
                                if (this.prev < y.catchLoc)
                                    return p(y.catchLoc, !0)
                            } else {
                                if (!M)
                                    throw new Error("try statement without catch or finally");
                                if (this.prev < y.finallyLoc)
                                    return p(y.finallyLoc)
                            }
                        }
                    }
                },
                abrupt: function(m, c) {
                    for (var p = this.tryEntries.length - 1; p >= 0; --p) {
                        var d = this.tryEntries[p];
                        if (d.tryLoc <= this.prev && t.call(d, "finallyLoc") && this.prev < d.finallyLoc) {
                            var y = d;
                            break
                        }
                    }
                    y && (m === "break" || m === "continue") && y.tryLoc <= c && c <= y.finallyLoc && (y = null);
                    var x = y ? y.completion : {};
                    return x.type = m,
                    x.arg = c,
                    y ? (this.method = "next",
                    this.next = y.finallyLoc,
                    E) : this.complete(x)
                },
                complete: function(m, c) {
                    if (m.type === "throw")
                        throw m.arg;
                    return m.type === "break" || m.type === "continue" ? this.next = m.arg : m.type === "return" ? (this.rval = this.arg = m.arg,
                    this.method = "return",
                    this.next = "end") : m.type === "normal" && c && (this.next = c),
                    E
                },
                finish: function(m) {
                    for (var c = this.tryEntries.length - 1; c >= 0; --c) {
                        var p = this.tryEntries[c];
                        if (p.finallyLoc === m)
                            return this.complete(p.completion, p.afterLoc),
                            _(p),
                            E
                    }
                },
                catch: function(m) {
                    for (var c = this.tryEntries.length - 1; c >= 0; --c) {
                        var p = this.tryEntries[c];
                        if (p.tryLoc === m) {
                            var d = p.completion;
                            if (d.type === "throw") {
                                var y = d.arg;
                                _(p)
                            }
                            return y
                        }
                    }
                    throw new Error("illegal catch attempt")
                },
                delegateYield: function(m, c, p) {
                    return this.delegate = {
                        iterator: N(m),
                        resultName: c,
                        nextLoc: p
                    },
                    this.method === "next" && (this.arg = void 0),
                    E
                }
            },
            r
        }
        Nn.exports = C_,
        Nn.exports.__esModule = !0,
        Nn.exports.default = Nn.exports
    }
    );
    var U_ = _e( (EX, q_) => {
        h();
        var Su = O_()();
        q_.exports = Su;
        try {
            regeneratorRuntime = Su
        } catch {
            typeof globalThis == "object" ? globalThis.regeneratorRuntime = Su : Function("r", "regeneratorRuntime = r")(Su)
        }
    }
    );
    var F_ = _e( (AX, ua) => {
        h();
        function D_(r, e, t, n, o, s, i) {
            try {
                var u = r[s](i)
                  , f = u.value
            } catch (g) {
                t(g);
                return
            }
            u.done ? e(f) : Promise.resolve(f).then(n, o)
        }
        function e6(r) {
            return function() {
                var e = this
                  , t = arguments;
                return new Promise(function(n, o) {
                    var s = r.apply(e, t);
                    function i(f) {
                        D_(s, n, o, i, u, "next", f)
                    }
                    function u(f) {
                        D_(s, n, o, i, u, "throw", f)
                    }
                    i(void 0)
                }
                )
            }
        }
        ua.exports = e6,
        ua.exports.__esModule = !0,
        ua.exports.default = ua.exports
    }
    );
    var Yd = _e( (IX, pa) => {
        h();
        function t6(r, e) {
            if (!(r instanceof e))
                throw new TypeError("Cannot call a class as a function")
        }
        pa.exports = t6,
        pa.exports.__esModule = !0,
        pa.exports.default = pa.exports
    }
    );
    var H_ = _e( (BX, fa) => {
        h();
        var j_ = fi().default;
        function r6(r, e) {
            if (j_(r) !== "object" || r === null)
                return r;
            var t = r[Symbol.toPrimitive];
            if (t !== void 0) {
                var n = t.call(r, e || "default");
                if (j_(n) !== "object")
                    return n;
                throw new TypeError("@@toPrimitive must return a primitive value.")
            }
            return (e === "string" ? String : Number)(r)
        }
        fa.exports = r6,
        fa.exports.__esModule = !0,
        fa.exports.default = fa.exports
    }
    );
    var K_ = _e( (PX, la) => {
        h();
        var n6 = fi().default
          , o6 = H_();
        function s6(r) {
            var e = o6(r, "string");
            return n6(e) === "symbol" ? e : String(e)
        }
        la.exports = s6,
        la.exports.__esModule = !0,
        la.exports.default = la.exports
    }
    );
    var $d = _e( (MX, da) => {
        h();
        var i6 = K_();
        function W_(r, e) {
            for (var t = 0; t < e.length; t++) {
                var n = e[t];
                n.enumerable = n.enumerable || !1,
                n.configurable = !0,
                "value"in n && (n.writable = !0),
                Object.defineProperty(r, i6(n.key), n)
            }
        }
        function a6(r, e, t) {
            return e && W_(r.prototype, e),
            t && W_(r, t),
            Object.defineProperty(r, "prototype", {
                writable: !1
            }),
            r
        }
        da.exports = a6,
        da.exports.__esModule = !0,
        da.exports.default = da.exports
    }
    );
    var V_ = _e( (NX, Cn) => {
        h();
        function Jd(r, e) {
            return Cn.exports = Jd = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, o) {
                return n.__proto__ = o,
                n
            }
            ,
            Cn.exports.__esModule = !0,
            Cn.exports.default = Cn.exports,
            Jd(r, e)
        }
        Cn.exports = Jd,
        Cn.exports.__esModule = !0,
        Cn.exports.default = Cn.exports
    }
    );
    var Xd = _e( (OX, ha) => {
        h();
        var c6 = V_();
        function u6(r, e) {
            if (typeof e != "function" && e !== null)
                throw new TypeError("Super expression must either be null or a function");
            r.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: r,
                    writable: !0,
                    configurable: !0
                }
            }),
            Object.defineProperty(r, "prototype", {
                writable: !1
            }),
            e && c6(r, e)
        }
        ha.exports = u6,
        ha.exports.__esModule = !0,
        ha.exports.default = ha.exports
    }
    );
    var G_ = _e( (UX, ya) => {
        h();
        function p6(r) {
            if (r === void 0)
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return r
        }
        ya.exports = p6,
        ya.exports.__esModule = !0,
        ya.exports.default = ya.exports
    }
    );
    var Qd = _e( (FX, ma) => {
        h();
        var f6 = fi().default
          , l6 = G_();
        function d6(r, e) {
            if (e && (f6(e) === "object" || typeof e == "function"))
                return e;
            if (e !== void 0)
                throw new TypeError("Derived constructors may only return object or undefined");
            return l6(r)
        }
        ma.exports = d6,
        ma.exports.__esModule = !0,
        ma.exports.default = ma.exports
    }
    );
    var th = _e( (HX, On) => {
        h();
        function eh(r) {
            return On.exports = eh = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t) {
                return t.__proto__ || Object.getPrototypeOf(t)
            }
            ,
            On.exports.__esModule = !0,
            On.exports.default = On.exports,
            eh(r)
        }
        On.exports = eh,
        On.exports.__esModule = !0,
        On.exports.default = On.exports
    }
    );
    var Ss = _e( (WX, rh) => {
        "use strict";
        h();
        var h6 = Object.prototype.hasOwnProperty
          , dr = "~";
        function ga() {}
        Object.create && (ga.prototype = Object.create(null),
        new ga().__proto__ || (dr = !1));
        function y6(r, e, t) {
            this.fn = r,
            this.context = e,
            this.once = t || !1
        }
        function Z_(r, e, t, n, o) {
            if (typeof t != "function")
                throw new TypeError("The listener must be a function");
            var s = new y6(t,n || r,o)
              , i = dr ? dr + e : e;
            return r._events[i] ? r._events[i].fn ? r._events[i] = [r._events[i], s] : r._events[i].push(s) : (r._events[i] = s,
            r._eventsCount++),
            r
        }
        function vu(r, e) {
            --r._eventsCount === 0 ? r._events = new ga : delete r._events[e]
        }
        function cr() {
            this._events = new ga,
            this._eventsCount = 0
        }
        cr.prototype.eventNames = function() {
            var e = [], t, n;
            if (this._eventsCount === 0)
                return e;
            for (n in t = this._events)
                h6.call(t, n) && e.push(dr ? n.slice(1) : n);
            return Object.getOwnPropertySymbols ? e.concat(Object.getOwnPropertySymbols(t)) : e
        }
        ;
        cr.prototype.listeners = function(e) {
            var t = dr ? dr + e : e
              , n = this._events[t];
            if (!n)
                return [];
            if (n.fn)
                return [n.fn];
            for (var o = 0, s = n.length, i = new Array(s); o < s; o++)
                i[o] = n[o].fn;
            return i
        }
        ;
        cr.prototype.listenerCount = function(e) {
            var t = dr ? dr + e : e
              , n = this._events[t];
            return n ? n.fn ? 1 : n.length : 0
        }
        ;
        cr.prototype.emit = function(e, t, n, o, s, i) {
            var u = dr ? dr + e : e;
            if (!this._events[u])
                return !1;
            var f = this._events[u], g = arguments.length, b, E;
            if (f.fn) {
                switch (f.once && this.removeListener(e, f.fn, void 0, !0),
                g) {
                case 1:
                    return f.fn.call(f.context),
                    !0;
                case 2:
                    return f.fn.call(f.context, t),
                    !0;
                case 3:
                    return f.fn.call(f.context, t, n),
                    !0;
                case 4:
                    return f.fn.call(f.context, t, n, o),
                    !0;
                case 5:
                    return f.fn.call(f.context, t, n, o, s),
                    !0;
                case 6:
                    return f.fn.call(f.context, t, n, o, s, i),
                    !0
                }
                for (E = 1,
                b = new Array(g - 1); E < g; E++)
                    b[E - 1] = arguments[E];
                f.fn.apply(f.context, b)
            } else {
                var q = f.length, O;
                for (E = 0; E < q; E++)
                    switch (f[E].once && this.removeListener(e, f[E].fn, void 0, !0),
                    g) {
                    case 1:
                        f[E].fn.call(f[E].context);
                        break;
                    case 2:
                        f[E].fn.call(f[E].context, t);
                        break;
                    case 3:
                        f[E].fn.call(f[E].context, t, n);
                        break;
                    case 4:
                        f[E].fn.call(f[E].context, t, n, o);
                        break;
                    default:
                        if (!b)
                            for (O = 1,
                            b = new Array(g - 1); O < g; O++)
                                b[O - 1] = arguments[O];
                        f[E].fn.apply(f[E].context, b)
                    }
            }
            return !0
        }
        ;
        cr.prototype.on = function(e, t, n) {
            return Z_(this, e, t, n, !1)
        }
        ;
        cr.prototype.once = function(e, t, n) {
            return Z_(this, e, t, n, !0)
        }
        ;
        cr.prototype.removeListener = function(e, t, n, o) {
            var s = dr ? dr + e : e;
            if (!this._events[s])
                return this;
            if (!t)
                return vu(this, s),
                this;
            var i = this._events[s];
            if (i.fn)
                i.fn === t && (!o || i.once) && (!n || i.context === n) && vu(this, s);
            else {
                for (var u = 0, f = [], g = i.length; u < g; u++)
                    (i[u].fn !== t || o && !i[u].once || n && i[u].context !== n) && f.push(i[u]);
                f.length ? this._events[s] = f.length === 1 ? f[0] : f : vu(this, s)
            }
            return this
        }
        ;
        cr.prototype.removeAllListeners = function(e) {
            var t;
            return e ? (t = dr ? dr + e : e,
            this._events[t] && vu(this, t)) : (this._events = new ga,
            this._eventsCount = 0),
            this
        }
        ;
        cr.prototype.off = cr.prototype.removeListener;
        cr.prototype.addListener = cr.prototype.on;
        cr.prefixed = dr;
        cr.EventEmitter = cr;
        typeof rh < "u" && (rh.exports = cr)
    }
    );
    var $_ = _e(_u => {
        "use strict";
        h();
        var xo = Gd();
        Object.defineProperty(_u, "__esModule", {
            value: !0
        });
        _u.default = void 0;
        var go = xo(U_())
          , Eu = xo(F_())
          , m6 = xo(fi())
          , g6 = xo(Yd())
          , x6 = xo($d())
          , w6 = xo(Xd())
          , b6 = xo(Qd())
          , Y_ = xo(th())
          , S6 = Ss();
        function v6(r) {
            var e = E6();
            return function() {
                var n = (0,
                Y_.default)(r), o;
                if (e) {
                    var s = (0,
                    Y_.default)(this).constructor;
                    o = Reflect.construct(n, arguments, s)
                } else
                    o = n.apply(this, arguments);
                return (0,
                b6.default)(this, o)
            }
        }
        function E6() {
            if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham)
                return !1;
            if (typeof Proxy == "function")
                return !0;
            try {
                return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {})),
                !0
            } catch {
                return !1
            }
        }
        var _6 = function(r, e) {
            var t = {};
            for (var n in r)
                Object.prototype.hasOwnProperty.call(r, n) && e.indexOf(n) < 0 && (t[n] = r[n]);
            if (r != null && typeof Object.getOwnPropertySymbols == "function")
                for (var o = 0, n = Object.getOwnPropertySymbols(r); o < n.length; o++)
                    e.indexOf(n[o]) < 0 && Object.prototype.propertyIsEnumerable.call(r, n[o]) && (t[n[o]] = r[n[o]]);
            return t
        }
          , A6 = function(r) {
            (0,
            w6.default)(t, r);
            var e = v6(t);
            function t(n) {
                var o, s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "ws://localhost:8080", i = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, u = arguments.length > 3 ? arguments[3] : void 0;
                (0,
                g6.default)(this, t);
                var f = i.autoconnect
                  , g = f === void 0 ? !0 : f
                  , b = i.reconnect
                  , E = b === void 0 ? !0 : b
                  , q = i.reconnect_interval
                  , O = q === void 0 ? 1e3 : q
                  , Z = i.max_reconnects
                  , ee = Z === void 0 ? 5 : Z
                  , X = _6(i, ["autoconnect", "reconnect", "reconnect_interval", "max_reconnects"]);
                return o = e.call(this),
                o.webSocketFactory = n,
                o.queue = {},
                o.rpc_id = 0,
                o.address = s,
                o.autoconnect = g,
                o.ready = !1,
                o.reconnect = E,
                o.reconnect_timer_id = void 0,
                o.reconnect_interval = O,
                o.max_reconnects = ee,
                o.rest_options = X,
                o.current_reconnects = 0,
                o.generate_request_id = u || function() {
                    return ++o.rpc_id
                }
                ,
                o.autoconnect && o._connect(o.address, Object.assign({
                    autoconnect: o.autoconnect,
                    reconnect: o.reconnect,
                    reconnect_interval: o.reconnect_interval,
                    max_reconnects: o.max_reconnects
                }, o.rest_options)),
                o
            }
            return (0,
            x6.default)(t, [{
                key: "connect",
                value: function() {
                    this.socket || this._connect(this.address, Object.assign({
                        autoconnect: this.autoconnect,
                        reconnect: this.reconnect,
                        reconnect_interval: this.reconnect_interval,
                        max_reconnects: this.max_reconnects
                    }, this.rest_options))
                }
            }, {
                key: "call",
                value: function(o, s, i, u) {
                    var f = this;
                    return !u && (0,
                    m6.default)(i) === "object" && (u = i,
                    i = null),
                    new Promise(function(g, b) {
                        if (!f.ready)
                            return b(new Error("socket not ready"));
                        var E = f.generate_request_id(o, s)
                          , q = {
                            jsonrpc: "2.0",
                            method: o,
                            params: s || null,
                            id: E
                        };
                        f.socket.send(JSON.stringify(q), u, function(O) {
                            if (O)
                                return b(O);
                            f.queue[E] = {
                                promise: [g, b]
                            },
                            i && (f.queue[E].timeout = setTimeout(function() {
                                delete f.queue[E],
                                b(new Error("reply timeout"))
                            }, i))
                        })
                    }
                    )
                }
            }, {
                key: "login",
                value: function() {
                    var n = (0,
                    Eu.default)(go.default.mark(function s(i) {
                        var u;
                        return go.default.wrap(function(g) {
                            for (; ; )
                                switch (g.prev = g.next) {
                                case 0:
                                    return g.next = 2,
                                    this.call("rpc.login", i);
                                case 2:
                                    if (u = g.sent,
                                    u) {
                                        g.next = 5;
                                        break
                                    }
                                    throw new Error("authentication failed");
                                case 5:
                                    return g.abrupt("return", u);
                                case 6:
                                case "end":
                                    return g.stop()
                                }
                        }, s, this)
                    }));
                    function o(s) {
                        return n.apply(this, arguments)
                    }
                    return o
                }()
            }, {
                key: "listMethods",
                value: function() {
                    var n = (0,
                    Eu.default)(go.default.mark(function s() {
                        return go.default.wrap(function(u) {
                            for (; ; )
                                switch (u.prev = u.next) {
                                case 0:
                                    return u.next = 2,
                                    this.call("__listMethods");
                                case 2:
                                    return u.abrupt("return", u.sent);
                                case 3:
                                case "end":
                                    return u.stop()
                                }
                        }, s, this)
                    }));
                    function o() {
                        return n.apply(this, arguments)
                    }
                    return o
                }()
            }, {
                key: "notify",
                value: function(o, s) {
                    var i = this;
                    return new Promise(function(u, f) {
                        if (!i.ready)
                            return f(new Error("socket not ready"));
                        var g = {
                            jsonrpc: "2.0",
                            method: o,
                            params: s || null
                        };
                        i.socket.send(JSON.stringify(g), function(b) {
                            if (b)
                                return f(b);
                            u()
                        })
                    }
                    )
                }
            }, {
                key: "subscribe",
                value: function() {
                    var n = (0,
                    Eu.default)(go.default.mark(function s(i) {
                        var u;
                        return go.default.wrap(function(g) {
                            for (; ; )
                                switch (g.prev = g.next) {
                                case 0:
                                    return typeof i == "string" && (i = [i]),
                                    g.next = 3,
                                    this.call("rpc.on", i);
                                case 3:
                                    if (u = g.sent,
                                    !(typeof i == "string" && u[i] !== "ok")) {
                                        g.next = 6;
                                        break
                                    }
                                    throw new Error("Failed subscribing to an event '" + i + "' with: " + u[i]);
                                case 6:
                                    return g.abrupt("return", u);
                                case 7:
                                case "end":
                                    return g.stop()
                                }
                        }, s, this)
                    }));
                    function o(s) {
                        return n.apply(this, arguments)
                    }
                    return o
                }()
            }, {
                key: "unsubscribe",
                value: function() {
                    var n = (0,
                    Eu.default)(go.default.mark(function s(i) {
                        var u;
                        return go.default.wrap(function(g) {
                            for (; ; )
                                switch (g.prev = g.next) {
                                case 0:
                                    return typeof i == "string" && (i = [i]),
                                    g.next = 3,
                                    this.call("rpc.off", i);
                                case 3:
                                    if (u = g.sent,
                                    !(typeof i == "string" && u[i] !== "ok")) {
                                        g.next = 6;
                                        break
                                    }
                                    throw new Error("Failed unsubscribing from an event with: " + u);
                                case 6:
                                    return g.abrupt("return", u);
                                case 7:
                                case "end":
                                    return g.stop()
                                }
                        }, s, this)
                    }));
                    function o(s) {
                        return n.apply(this, arguments)
                    }
                    return o
                }()
            }, {
                key: "close",
                value: function(o, s) {
                    this.socket.close(o || 1e3, s)
                }
            }, {
                key: "_connect",
                value: function(o, s) {
                    var i = this;
                    clearTimeout(this.reconnect_timer_id),
                    this.socket = this.webSocketFactory(o, s),
                    this.socket.addEventListener("open", function() {
                        i.ready = !0,
                        i.emit("open"),
                        i.current_reconnects = 0
                    }),
                    this.socket.addEventListener("message", function(u) {
                        var f = u.data;
                        f instanceof ArrayBuffer && (f = A.from(f).toString());
                        try {
                            f = JSON.parse(f)
                        } catch {
                            return
                        }
                        if (f.notification && i.listeners(f.notification).length) {
                            if (!Object.keys(f.params).length)
                                return i.emit(f.notification);
                            var g = [f.notification];
                            if (f.params.constructor === Object)
                                g.push(f.params);
                            else
                                for (var b = 0; b < f.params.length; b++)
                                    g.push(f.params[b]);
                            return Promise.resolve().then(function() {
                                i.emit.apply(i, g)
                            })
                        }
                        if (!i.queue[f.id])
                            return f.method && f.params ? Promise.resolve().then(function() {
                                i.emit(f.method, f.params)
                            }) : void 0;
                        "error"in f == "result"in f && i.queue[f.id].promise[1](new Error('Server response malformed. Response must include either "result" or "error", but not both.')),
                        i.queue[f.id].timeout && clearTimeout(i.queue[f.id].timeout),
                        f.error ? i.queue[f.id].promise[1](f.error) : i.queue[f.id].promise[0](f.result),
                        delete i.queue[f.id]
                    }),
                    this.socket.addEventListener("error", function(u) {
                        return i.emit("error", u)
                    }),
                    this.socket.addEventListener("close", function(u) {
                        var f = u.code
                          , g = u.reason;
                        i.ready && setTimeout(function() {
                            return i.emit("close", f, g)
                        }, 0),
                        i.ready = !1,
                        i.socket = void 0,
                        f !== 1e3 && (i.current_reconnects++,
                        i.reconnect && (i.max_reconnects > i.current_reconnects || i.max_reconnects === 0) && (i.reconnect_timer_id = setTimeout(function() {
                            return i._connect(o, s)
                        }, i.reconnect_interval)))
                    })
                }
            }]),
            t
        }(S6.EventEmitter);
        _u.default = A6
    }
    );
    var X_ = _e(nh => {
        "use strict";
        h();
        var xa = Gd();
        Object.defineProperty(nh, "__esModule", {
            value: !0
        });
        nh.default = L6;
        var k6 = xa(Yd())
          , I6 = xa($d())
          , R6 = xa(Xd())
          , B6 = xa(Qd())
          , J_ = xa(th())
          , T6 = Ss();
        function P6(r) {
            var e = z6();
            return function() {
                var n = (0,
                J_.default)(r), o;
                if (e) {
                    var s = (0,
                    J_.default)(this).constructor;
                    o = Reflect.construct(n, arguments, s)
                } else
                    o = n.apply(this, arguments);
                return (0,
                B6.default)(this, o)
            }
        }
        function z6() {
            if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham)
                return !1;
            if (typeof Proxy == "function")
                return !0;
            try {
                return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {})),
                !0
            } catch {
                return !1
            }
        }
        var M6 = function(r) {
            (0,
            R6.default)(t, r);
            var e = P6(t);
            function t(n, o, s) {
                var i;
                return (0,
                k6.default)(this, t),
                i = e.call(this),
                i.socket = new self.WebSocket(n,s),
                i.socket.onopen = function() {
                    return i.emit("open")
                }
                ,
                i.socket.onmessage = function(u) {
                    return i.emit("message", u.data)
                }
                ,
                i.socket.onerror = function(u) {
                    return i.emit("error", u)
                }
                ,
                i.socket.onclose = function(u) {
                    i.emit("close", u.code, u.reason)
                }
                ,
                i
            }
            return (0,
            I6.default)(t, [{
                key: "send",
                value: function(o, s, i) {
                    var u = i || s;
                    try {
                        this.socket.send(o),
                        u()
                    } catch (f) {
                        u(f)
                    }
                }
            }, {
                key: "close",
                value: function(o, s) {
                    this.socket.close(o, s)
                }
            }, {
                key: "addEventListener",
                value: function(o, s, i) {
                    this.socket.addEventListener(o, s, i)
                }
            }]),
            t
        }(T6.EventEmitter);
        function L6(r, e) {
            return new M6(r,e)
        }
    }
    );
    function j6(r, e=24) {
        let t = new Uint32Array(10);
        for (let n = 24 - e; n < 24; n++) {
            for (let i = 0; i < 10; i++)
                t[i] = r[i] ^ r[i + 10] ^ r[i + 20] ^ r[i + 30] ^ r[i + 40];
            for (let i = 0; i < 10; i += 2) {
                let u = (i + 8) % 10
                  , f = (i + 2) % 10
                  , g = t[f]
                  , b = t[f + 1]
                  , E = Q_(g, b, 1) ^ t[u]
                  , q = eA(g, b, 1) ^ t[u + 1];
                for (let O = 0; O < 50; O += 10)
                    r[i + O] ^= E,
                    r[i + O + 1] ^= q
            }
            let o = r[2]
              , s = r[3];
            for (let i = 0; i < 24; i++) {
                let u = rA[i]
                  , f = Q_(o, s, u)
                  , g = eA(o, s, u)
                  , b = tA[i];
                o = r[b],
                s = r[b + 1],
                r[b] = f,
                r[b + 1] = g
            }
            for (let i = 0; i < 50; i += 10) {
                for (let u = 0; u < 10; u++)
                    t[u] = r[i + u];
                for (let u = 0; u < 10; u++)
                    r[i + u] ^= ~t[(u + 2) % 10] & t[(u + 4) % 10]
            }
            r[0] ^= D6[n],
            r[1] ^= F6[n]
        }
        t.fill(0)
    }
    var tA, rA, nA, N6, wa, C6, O6, q6, U6, D6, F6, Q_, eA, Au, wo, eQ, tQ, rQ, nQ, oQ, oh, sQ, iQ, oA, aQ, cQ, sA = C( () => {
        h();
        jc();
        md();
        ni();
        [tA,rA,nA] = [[], [], []],
        N6 = BigInt(0),
        wa = BigInt(1),
        C6 = BigInt(2),
        O6 = BigInt(7),
        q6 = BigInt(256),
        U6 = BigInt(113);
        for (let r = 0, e = wa, t = 1, n = 0; r < 24; r++) {
            [t,n] = [n, (2 * t + 3 * n) % 5],
            tA.push(2 * (5 * n + t)),
            rA.push((r + 1) * (r + 2) / 2 % 64);
            let o = N6;
            for (let s = 0; s < 7; s++)
                e = (e << wa ^ (e >> O6) * U6) % q6,
                e & C6 && (o ^= wa << (wa << BigInt(s)) - wa);
            nA.push(o)
        }
        [D6,F6] = Me.split(nA, !0),
        Q_ = (r, e, t) => t > 32 ? Me.rotlBH(r, e, t) : Me.rotlSH(r, e, t),
        eA = (r, e, t) => t > 32 ? Me.rotlBL(r, e, t) : Me.rotlSL(r, e, t);
        Au = class r extends ro {
            constructor(e, t, n, o=!1, s=24) {
                if (super(),
                this.blockLen = e,
                this.suffix = t,
                this.outputLen = n,
                this.enableXOF = o,
                this.rounds = s,
                this.pos = 0,
                this.posOut = 0,
                this.finished = !1,
                this.destroyed = !1,
                nr.number(n),
                0 >= this.blockLen || this.blockLen >= 200)
                    throw new Error("Sha3 supports only keccak-f1600 function");
                this.state = new Uint8Array(200),
                this.state32 = UE(this.state)
            }
            keccak() {
                j6(this.state32, this.rounds),
                this.posOut = 0,
                this.pos = 0
            }
            update(e) {
                nr.exists(this);
                let {blockLen: t, state: n} = this;
                e = no(e);
                let o = e.length;
                for (let s = 0; s < o; ) {
                    let i = Math.min(t - this.pos, o - s);
                    for (let u = 0; u < i; u++)
                        n[this.pos++] ^= e[s++];
                    this.pos === t && this.keccak()
                }
                return this
            }
            finish() {
                if (this.finished)
                    return;
                this.finished = !0;
                let {state: e, suffix: t, pos: n, blockLen: o} = this;
                e[n] ^= t,
                t & 128 && n === o - 1 && this.keccak(),
                e[o - 1] ^= 128,
                this.keccak()
            }
            writeInto(e) {
                nr.exists(this, !1),
                nr.bytes(e),
                this.finish();
                let t = this.state
                  , {blockLen: n} = this;
                for (let o = 0, s = e.length; o < s; ) {
                    this.posOut >= n && this.keccak();
                    let i = Math.min(n - this.posOut, s - o);
                    e.set(t.subarray(this.posOut, this.posOut + i), o),
                    this.posOut += i,
                    o += i
                }
                return e
            }
            xofInto(e) {
                if (!this.enableXOF)
                    throw new Error("XOF is not possible for this instance");
                return this.writeInto(e)
            }
            xof(e) {
                return nr.number(e),
                this.xofInto(new Uint8Array(e))
            }
            digestInto(e) {
                if (nr.output(e, this),
                this.finished)
                    throw new Error("digest() was already called");
                return this.writeInto(e),
                this.destroy(),
                e
            }
            digest() {
                return this.digestInto(new Uint8Array(this.outputLen))
            }
            destroy() {
                this.destroyed = !0,
                this.state.fill(0)
            }
            _cloneInto(e) {
                let {blockLen: t, suffix: n, outputLen: o, rounds: s, enableXOF: i} = this;
                return e || (e = new r(t,n,o,i,s)),
                e.state32.set(this.state32),
                e.pos = this.pos,
                e.posOut = this.posOut,
                e.finished = this.finished,
                e.rounds = s,
                e.suffix = n,
                e.outputLen = o,
                e.enableXOF = i,
                e.destroyed = this.destroyed,
                e
            }
        }
        ,
        wo = (r, e, t) => fn( () => new Au(e,r,t)),
        eQ = wo(6, 144, 224 / 8),
        tQ = wo(6, 136, 256 / 8),
        rQ = wo(6, 104, 384 / 8),
        nQ = wo(6, 72, 512 / 8),
        oQ = wo(1, 144, 224 / 8),
        oh = wo(1, 136, 256 / 8),
        sQ = wo(1, 104, 384 / 8),
        iQ = wo(1, 72, 512 / 8),
        oA = (r, e, t) => DE( (n={}) => new Au(e,r,n.dkLen === void 0 ? t : n.dkLen,!0)),
        aQ = oA(31, 168, 128 / 8),
        cQ = oA(31, 136, 256 / 8)
    }
    );
    var ku, sh, iA = C( () => {
        h();
        jc();
        ni();
        ku = class extends ro {
            constructor(e, t) {
                super(),
                this.finished = !1,
                this.destroyed = !1,
                nr.hash(e);
                let n = no(t);
                if (this.iHash = e.create(),
                typeof this.iHash.update != "function")
                    throw new TypeError("Expected instance of class which extends utils.Hash");
                this.blockLen = this.iHash.blockLen,
                this.outputLen = this.iHash.outputLen;
                let o = this.blockLen
                  , s = new Uint8Array(o);
                s.set(n.length > o ? e.create().update(n).digest() : n);
                for (let i = 0; i < s.length; i++)
                    s[i] ^= 54;
                this.iHash.update(s),
                this.oHash = e.create();
                for (let i = 0; i < s.length; i++)
                    s[i] ^= 106;
                this.oHash.update(s),
                s.fill(0)
            }
            update(e) {
                return nr.exists(this),
                this.iHash.update(e),
                this
            }
            digestInto(e) {
                nr.exists(this),
                nr.bytes(e, this.outputLen),
                this.finished = !0,
                this.iHash.digestInto(e),
                this.oHash.update(e),
                this.oHash.digestInto(e),
                this.destroy()
            }
            digest() {
                let e = new Uint8Array(this.oHash.outputLen);
                return this.digestInto(e),
                e
            }
            _cloneInto(e) {
                e || (e = Object.create(Object.getPrototypeOf(this), {}));
                let {oHash: t, iHash: n, finished: o, destroyed: s, blockLen: i, outputLen: u} = this;
                return e = e,
                e.finished = o,
                e.destroyed = s,
                e.blockLen = i,
                e.outputLen = u,
                e.oHash = t._cloneInto(e.oHash),
                e.iHash = n._cloneInto(e.iHash),
                e
            }
            destroy() {
                this.destroyed = !0,
                this.oHash.destroy(),
                this.iHash.destroy()
            }
        }
        ,
        sh = (r, e, t) => new ku(r,e).update(t).digest();
        sh.create = (r, e) => new ku(r,e)
    }
    );
    function fA(r) {
        let {a: e, b: t} = Ht
          , n = ge(r * r)
          , o = ge(n * r);
        return ge(o + e * r + t)
    }
    function lA(r) {
        if (!(r instanceof hr))
            throw new TypeError("JacobianPoint expected")
    }
    function Bu(r, e) {
        let t = e.negate();
        return r ? t : e
    }
    function dA(r) {
        return Number.parseInt(r[0], 16) >= 8 ? "00" + r : r
    }
    function hA(r) {
        if (r.length < 2 || r[0] !== 2)
            throw new Error(`Invalid signature integer tag: ${mi(r)}`);
        let e = r[1]
          , t = r.subarray(2, e + 2);
        if (!e || t.length !== e)
            throw new Error("Invalid signature integer: wrong length");
        if (t[0] === 0 && t[1] <= 127)
            throw new Error("Invalid signature integer: trailing length");
        return {
            data: vo(t),
            left: r.subarray(e + 2)
        }
    }
    function W6(r) {
        if (r.length < 2 || r[0] != 48)
            throw new Error(`Invalid signature tag: ${mi(r)}`);
        if (r[1] !== r.length - 2)
            throw new Error("Invalid signature: incorrect length");
        let {data: e, left: t} = hA(r.subarray(2))
          , {data: n, left: o} = hA(t);
        if (o.length)
            throw new Error(`Invalid signature: left bytes after parsing: ${mi(o)}`);
        return {
            r: e,
            s: n
        }
    }
    function bo(...r) {
        if (!r.every(n => n instanceof Uint8Array))
            throw new Error("Uint8Array list expected");
        if (r.length === 1)
            return r[0];
        let e = r.reduce( (n, o) => n + o.length, 0)
          , t = new Uint8Array(e);
        for (let n = 0, o = 0; n < r.length; n++) {
            let s = r[n];
            t.set(s, o),
            o += s.length
        }
        return t
    }
    function mi(r) {
        if (!(r instanceof Uint8Array))
            throw new Error("Expected Uint8Array");
        let e = "";
        for (let t = 0; t < r.length; t++)
            e += V6[r[t]];
        return e
    }
    function di(r) {
        if (typeof r != "bigint")
            throw new Error("Expected bigint");
        if (!(We <= r && r < G6))
            throw new Error("Expected number 0 <= n < 2^256");
        return r.toString(16).padStart(64, "0")
    }
    function ch(r) {
        let e = vs(di(r));
        if (e.length !== 32)
            throw new Error("Error: expected 32 bytes");
        return e
    }
    function ba(r) {
        let e = r.toString(16);
        return e.length & 1 ? `0${e}` : e
    }
    function zu(r) {
        if (typeof r != "string")
            throw new TypeError("hexToNumber: expected string, got " + typeof r);
        return BigInt(`0x${r}`)
    }
    function vs(r) {
        if (typeof r != "string")
            throw new TypeError("hexToBytes: expected string, got " + typeof r);
        if (r.length % 2)
            throw new Error("hexToBytes: received invalid unpadded hex" + r.length);
        let e = new Uint8Array(r.length / 2);
        for (let t = 0; t < e.length; t++) {
            let n = t * 2
              , o = r.slice(n, n + 2)
              , s = Number.parseInt(o, 16);
            if (Number.isNaN(s) || s < 0)
                throw new Error("Invalid byte sequence");
            e[t] = s
        }
        return e
    }
    function vo(r) {
        return zu(mi(r))
    }
    function Ea(r) {
        return r instanceof Uint8Array ? Uint8Array.from(r) : vs(r)
    }
    function yA(r) {
        if (typeof r == "number" && Number.isSafeInteger(r) && r > 0)
            return BigInt(r);
        if (typeof r == "bigint" && _a(r))
            return r;
        throw new TypeError("Expected valid private scalar: 0 < scalar < curve.n")
    }
    function ge(r, e=Ht.P) {
        let t = r % e;
        return t >= We ? t : e + t
    }
    function Or(r, e) {
        let {P: t} = Ht
          , n = r;
        for (; e-- > We; )
            n *= n,
            n %= t;
        return n
    }
    function Z6(r) {
        let {P: e} = Ht
          , t = BigInt(6)
          , n = BigInt(11)
          , o = BigInt(22)
          , s = BigInt(23)
          , i = BigInt(44)
          , u = BigInt(88)
          , f = r * r * r % e
          , g = f * f * r % e
          , b = Or(g, Sa) * g % e
          , E = Or(b, Sa) * g % e
          , q = Or(E, So) * f % e
          , O = Or(q, n) * q % e
          , Z = Or(O, o) * O % e
          , ee = Or(Z, i) * Z % e
          , X = Or(ee, u) * ee % e
          , le = Or(X, i) * Z % e
          , W = Or(le, Sa) * g % e
          , Se = Or(W, s) * O % e
          , ze = Or(Se, t) * f % e
          , Oe = Or(ze, So);
        if (Oe * Oe % e !== r)
            throw new Error("Cannot find square root");
        return Oe
    }
    function Aa(r, e=Ht.P) {
        if (r === We || e <= We)
            throw new Error(`invert: expected positive integers, got n=${r} mod=${e}`);
        let t = ge(r, e)
          , n = e
          , o = We
          , s = Nt
          , i = Nt
          , u = We;
        for (; t !== We; ) {
            let g = n / t
              , b = n % t
              , E = o - i * g
              , q = s - u * g;
            n = t,
            t = b,
            o = i,
            s = u,
            i = E,
            u = q
        }
        if (n !== Nt)
            throw new Error("invert: does not exist");
        return ge(o, e)
    }
    function Y6(r, e=Ht.P) {
        let t = new Array(r.length)
          , n = r.reduce( (s, i, u) => i === We ? s : (t[u] = s,
        ge(s * i, e)), Nt)
          , o = Aa(n, e);
        return r.reduceRight( (s, i, u) => i === We ? s : (t[u] = ge(s * t[u], e),
        ge(s * i, e)), o),
        t
    }
    function $6(r) {
        let e = r.length * 8 - yi * 8
          , t = vo(r);
        return e > 0 ? t >> BigInt(e) : t
    }
    function mA(r, e=!1) {
        let t = $6(r);
        if (e)
            return t;
        let {n} = Ht;
        return t >= n ? t - n : t
    }
    function _a(r) {
        return We < r && r < Ht.n
    }
    function ih(r) {
        return We < r && r < Ht.P
    }
    function J6(r, e, t, n=!0) {
        let {n: o} = Ht
          , s = mA(r, !0);
        if (!_a(s))
            return;
        let i = Aa(s, o)
          , u = Xt.BASE.multiply(s)
          , f = ge(u.x, o);
        if (f === We)
            return;
        let g = ge(i * ge(e + t * f, o), o);
        if (g === We)
            return;
        let b = new li(f,g)
          , E = (u.x === b.r ? 0 : 2) | Number(u.y & Nt);
        return n && b.hasHighS() && (b = b.normalizeS(),
        E ^= 1),
        {
            sig: b,
            recovery: E
        }
    }
    function Mu(r) {
        let e;
        if (typeof r == "bigint")
            e = r;
        else if (typeof r == "number" && Number.isSafeInteger(r) && r > 0)
            e = BigInt(r);
        else if (typeof r == "string") {
            if (r.length !== 2 * yi)
                throw new Error("Expected 32 bytes of private key");
            e = zu(r)
        } else if (r instanceof Uint8Array) {
            if (r.length !== yi)
                throw new Error("Expected 32 bytes of private key");
            e = vo(r)
        } else
            throw new TypeError("Expected valid private key");
        if (!_a(e))
            throw new Error("Expected private key: 0 < key < n");
        return e
    }
    function X6(r) {
        if (r instanceof li)
            return r.assertValidity(),
            r;
        try {
            return li.fromDER(r)
        } catch {
            return li.fromCompact(r)
        }
    }
    function gA(r, e=!1) {
        return Xt.fromPrivateKey(r).toRawBytes(e)
    }
    function xA(r) {
        let e = r.length > Gr ? r.slice(0, Gr) : r;
        return vo(e)
    }
    function Q6(r) {
        let e = xA(r)
          , t = ge(e, Ht.n);
        return wA(t < We ? e : t)
    }
    function wA(r) {
        return ch(r)
    }
    function eO(r, e, t) {
        if (r == null)
            throw new Error(`sign: expected valid message hash, not "${r}"`);
        let n = Ea(r)
          , o = Mu(e)
          , s = [wA(o), Q6(n)];
        if (t != null) {
            t === !0 && (t = mn.randomBytes(Gr));
            let f = Ea(t);
            if (f.length !== Gr)
                throw new Error(`sign: Expected ${Gr} bytes of extra data`);
            s.push(f)
        }
        let i = bo(...s)
          , u = xA(n);
        return {
            seed: i,
            m: u,
            d: o
        }
    }
    function tO(r, e) {
        let {sig: t, recovery: n} = r
          , {der: o, recovered: s} = Object.assign({
            canonical: !0,
            der: !0
        }, e)
          , i = o ? t.toDERRawBytes() : t.toCompactRawBytes();
        return s ? [i, n] : i
    }
    function bA(r, e, t={}) {
        let {seed: n, m: o, d: s} = eO(r, e, t.extraEntropy)
          , i = new uh(K6,yi);
        i.reseedSync(n);
        let u;
        for (; !(u = J6(i.generateSync(), o, s, t.canonical)); )
            i.reseedSync();
        return tO(u, t)
    }
    var H6, We, Nt, So, Sa, aA, Ht, cA, Iu, Gr, yi, K6, uA, pA, Ru, Pu, hr, ah, Xt, li, V6, G6, hi, va, uh, _r, Tu, mn, SA = C( () => {
        h();
        H6 = je(bd(), 1);
        We = BigInt(0),
        Nt = BigInt(1),
        So = BigInt(2),
        Sa = BigInt(3),
        aA = BigInt(8),
        Ht = Object.freeze({
            a: We,
            b: BigInt(7),
            P: BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f"),
            n: BigInt("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141"),
            h: Nt,
            Gx: BigInt("55066263022277343669578718895168534326250603453777594175500187360389116729240"),
            Gy: BigInt("32670510020758816978083085130507043184471273380659243275938904335757337482424"),
            beta: BigInt("0x7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee")
        }),
        cA = (r, e) => (r + e / So) / e,
        Iu = {
            beta: BigInt("0x7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee"),
            splitScalar(r) {
                let {n: e} = Ht
                  , t = BigInt("0x3086d221a7d46bcde86c90e49284eb15")
                  , n = -Nt * BigInt("0xe4437ed6010e88286f547fa90abfe4c3")
                  , o = BigInt("0x114ca50f7a8e2f3f657c1108d9d44cfd8")
                  , s = t
                  , i = BigInt("0x100000000000000000000000000000000")
                  , u = cA(s * r, e)
                  , f = cA(-n * r, e)
                  , g = ge(r - u * t - f * o, e)
                  , b = ge(-u * n - f * s, e)
                  , E = g > i
                  , q = b > i;
                if (E && (g = e - g),
                q && (b = e - b),
                g > i || b > i)
                    throw new Error("splitScalarEndo: Endomorphism failed, k=" + r);
                return {
                    k1neg: E,
                    k1: g,
                    k2neg: q,
                    k2: b
                }
            }
        },
        Gr = 32,
        yi = 32,
        K6 = 32,
        uA = Gr + 1,
        pA = 2 * Gr + 1;
        Ru = Ht.a === We,
        Pu = class extends Error {
            constructor(e) {
                super(e)
            }
        }
        ;
        hr = class r {
            constructor(e, t, n) {
                this.x = e,
                this.y = t,
                this.z = n
            }
            static fromAffine(e) {
                if (!(e instanceof Xt))
                    throw new TypeError("JacobianPoint#fromAffine: expected Point");
                return e.equals(Xt.ZERO) ? r.ZERO : new r(e.x,e.y,Nt)
            }
            static toAffineBatch(e) {
                let t = Y6(e.map(n => n.z));
                return e.map( (n, o) => n.toAffine(t[o]))
            }
            static normalizeZ(e) {
                return r.toAffineBatch(e).map(r.fromAffine)
            }
            equals(e) {
                lA(e);
                let {x: t, y: n, z: o} = this
                  , {x: s, y: i, z: u} = e
                  , f = ge(o * o)
                  , g = ge(u * u)
                  , b = ge(t * g)
                  , E = ge(s * f)
                  , q = ge(ge(n * u) * g)
                  , O = ge(ge(i * o) * f);
                return b === E && q === O
            }
            negate() {
                return new r(this.x,ge(-this.y),this.z)
            }
            double() {
                let {x: e, y: t, z: n} = this
                  , o = ge(e * e)
                  , s = ge(t * t)
                  , i = ge(s * s)
                  , u = e + s
                  , f = ge(So * (ge(u * u) - o - i))
                  , g = ge(Sa * o)
                  , b = ge(g * g)
                  , E = ge(b - So * f)
                  , q = ge(g * (f - E) - aA * i)
                  , O = ge(So * t * n);
                return new r(E,q,O)
            }
            add(e) {
                lA(e);
                let {x: t, y: n, z: o} = this
                  , {x: s, y: i, z: u} = e;
                if (s === We || i === We)
                    return this;
                if (t === We || n === We)
                    return e;
                let f = ge(o * o)
                  , g = ge(u * u)
                  , b = ge(t * g)
                  , E = ge(s * f)
                  , q = ge(ge(n * u) * g)
                  , O = ge(ge(i * o) * f)
                  , Z = ge(E - b)
                  , ee = ge(O - q);
                if (Z === We)
                    return ee === We ? this.double() : r.ZERO;
                let X = ge(Z * Z)
                  , le = ge(Z * X)
                  , W = ge(b * X)
                  , Se = ge(ee * ee - le - So * W)
                  , ze = ge(ee * (W - Se) - q * le)
                  , Oe = ge(o * u * Z);
                return new r(Se,ze,Oe)
            }
            subtract(e) {
                return this.add(e.negate())
            }
            multiplyUnsafe(e) {
                let t = r.ZERO;
                if (typeof e == "bigint" && e === We)
                    return t;
                let n = yA(e);
                if (n === Nt)
                    return this;
                if (!Ru) {
                    let E = t
                      , q = this;
                    for (; n > We; )
                        n & Nt && (E = E.add(q)),
                        q = q.double(),
                        n >>= Nt;
                    return E
                }
                let {k1neg: o, k1: s, k2neg: i, k2: u} = Iu.splitScalar(n)
                  , f = t
                  , g = t
                  , b = this;
                for (; s > We || u > We; )
                    s & Nt && (f = f.add(b)),
                    u & Nt && (g = g.add(b)),
                    b = b.double(),
                    s >>= Nt,
                    u >>= Nt;
                return o && (f = f.negate()),
                i && (g = g.negate()),
                g = new r(ge(g.x * Iu.beta),g.y,g.z),
                f.add(g)
            }
            precomputeWindow(e) {
                let t = Ru ? 128 / e + 1 : 256 / e + 1
                  , n = []
                  , o = this
                  , s = o;
                for (let i = 0; i < t; i++) {
                    s = o,
                    n.push(s);
                    for (let u = 1; u < 2 ** (e - 1); u++)
                        s = s.add(o),
                        n.push(s);
                    o = s.double()
                }
                return n
            }
            wNAF(e, t) {
                !t && this.equals(r.BASE) && (t = Xt.BASE);
                let n = t && t._WINDOW_SIZE || 1;
                if (256 % n)
                    throw new Error("Point#wNAF: Invalid precomputation window, must be power of 2");
                let o = t && ah.get(t);
                o || (o = this.precomputeWindow(n),
                t && n !== 1 && (o = r.normalizeZ(o),
                ah.set(t, o)));
                let s = r.ZERO
                  , i = r.BASE
                  , u = 1 + (Ru ? 128 / n : 256 / n)
                  , f = 2 ** (n - 1)
                  , g = BigInt(2 ** n - 1)
                  , b = 2 ** n
                  , E = BigInt(n);
                for (let q = 0; q < u; q++) {
                    let O = q * f
                      , Z = Number(e & g);
                    e >>= E,
                    Z > f && (Z -= b,
                    e += Nt);
                    let ee = O
                      , X = O + Math.abs(Z) - 1
                      , le = q % 2 !== 0
                      , W = Z < 0;
                    Z === 0 ? i = i.add(Bu(le, o[ee])) : s = s.add(Bu(W, o[X]))
                }
                return {
                    p: s,
                    f: i
                }
            }
            multiply(e, t) {
                let n = yA(e), o, s;
                if (Ru) {
                    let {k1neg: i, k1: u, k2neg: f, k2: g} = Iu.splitScalar(n)
                      , {p: b, f: E} = this.wNAF(u, t)
                      , {p: q, f: O} = this.wNAF(g, t);
                    b = Bu(i, b),
                    q = Bu(f, q),
                    q = new r(ge(q.x * Iu.beta),q.y,q.z),
                    o = b.add(q),
                    s = E.add(O)
                } else {
                    let {p: i, f: u} = this.wNAF(n, t);
                    o = i,
                    s = u
                }
                return r.normalizeZ([o, s])[0]
            }
            toAffine(e) {
                let {x: t, y: n, z: o} = this
                  , s = this.equals(r.ZERO);
                e == null && (e = s ? aA : Aa(o));
                let i = e
                  , u = ge(i * i)
                  , f = ge(u * i)
                  , g = ge(t * u)
                  , b = ge(n * f)
                  , E = ge(o * i);
                if (s)
                    return Xt.ZERO;
                if (E !== Nt)
                    throw new Error("invZ was invalid");
                return new Xt(g,b)
            }
        }
        ;
        hr.BASE = new hr(Ht.Gx,Ht.Gy,Nt);
        hr.ZERO = new hr(We,Nt,We);
        ah = new WeakMap,
        Xt = class r {
            constructor(e, t) {
                this.x = e,
                this.y = t
            }
            _setWindowSize(e) {
                this._WINDOW_SIZE = e,
                ah.delete(this)
            }
            hasEvenY() {
                return this.y % So === We
            }
            static fromCompressedHex(e) {
                let t = e.length === 32
                  , n = vo(t ? e : e.subarray(1));
                if (!ih(n))
                    throw new Error("Point is not on curve");
                let o = fA(n)
                  , s = Z6(o)
                  , i = (s & Nt) === Nt;
                t ? i && (s = ge(-s)) : (e[0] & 1) === 1 !== i && (s = ge(-s));
                let u = new r(n,s);
                return u.assertValidity(),
                u
            }
            static fromUncompressedHex(e) {
                let t = vo(e.subarray(1, Gr + 1))
                  , n = vo(e.subarray(Gr + 1, Gr * 2 + 1))
                  , o = new r(t,n);
                return o.assertValidity(),
                o
            }
            static fromHex(e) {
                let t = Ea(e)
                  , n = t.length
                  , o = t[0];
                if (n === Gr)
                    return this.fromCompressedHex(t);
                if (n === uA && (o === 2 || o === 3))
                    return this.fromCompressedHex(t);
                if (n === pA && o === 4)
                    return this.fromUncompressedHex(t);
                throw new Error(`Point.fromHex: received invalid point. Expected 32-${uA} compressed bytes or ${pA} uncompressed bytes, not ${n}`)
            }
            static fromPrivateKey(e) {
                return r.BASE.multiply(Mu(e))
            }
            static fromSignature(e, t, n) {
                let {r: o, s} = X6(t);
                if (![0, 1, 2, 3].includes(n))
                    throw new Error("Cannot recover: invalid recovery bit");
                let i = mA(Ea(e))
                  , {n: u} = Ht
                  , f = n === 2 || n === 3 ? o + u : o
                  , g = Aa(f, u)
                  , b = ge(-i * g, u)
                  , E = ge(s * g, u)
                  , q = n & 1 ? "03" : "02"
                  , O = r.fromHex(q + di(f))
                  , Z = r.BASE.multiplyAndAddUnsafe(O, b, E);
                if (!Z)
                    throw new Error("Cannot recover signature: point at infinify");
                return Z.assertValidity(),
                Z
            }
            toRawBytes(e=!1) {
                return vs(this.toHex(e))
            }
            toHex(e=!1) {
                let t = di(this.x);
                return e ? `${this.hasEvenY() ? "02" : "03"}${t}` : `04${t}${di(this.y)}`
            }
            toHexX() {
                return this.toHex(!0).slice(2)
            }
            toRawX() {
                return this.toRawBytes(!0).slice(1)
            }
            assertValidity() {
                let e = "Point is not on elliptic curve"
                  , {x: t, y: n} = this;
                if (!ih(t) || !ih(n))
                    throw new Error(e);
                let o = ge(n * n)
                  , s = fA(t);
                if (ge(o - s) !== We)
                    throw new Error(e)
            }
            equals(e) {
                return this.x === e.x && this.y === e.y
            }
            negate() {
                return new r(this.x,ge(-this.y))
            }
            double() {
                return hr.fromAffine(this).double().toAffine()
            }
            add(e) {
                return hr.fromAffine(this).add(hr.fromAffine(e)).toAffine()
            }
            subtract(e) {
                return this.add(e.negate())
            }
            multiply(e) {
                return hr.fromAffine(this).multiply(e, this).toAffine()
            }
            multiplyAndAddUnsafe(e, t, n) {
                let o = hr.fromAffine(this)
                  , s = t === We || t === Nt || this !== r.BASE ? o.multiplyUnsafe(t) : o.multiply(t)
                  , i = hr.fromAffine(e).multiplyUnsafe(n)
                  , u = s.add(i);
                return u.equals(hr.ZERO) ? void 0 : u.toAffine()
            }
        }
        ;
        Xt.BASE = new Xt(Ht.Gx,Ht.Gy);
        Xt.ZERO = new Xt(We,We);
        li = class r {
            constructor(e, t) {
                this.r = e,
                this.s = t,
                this.assertValidity()
            }
            static fromCompact(e) {
                let t = e instanceof Uint8Array
                  , n = "Signature.fromCompact";
                if (typeof e != "string" && !t)
                    throw new TypeError(`${n}: Expected string or Uint8Array`);
                let o = t ? mi(e) : e;
                if (o.length !== 128)
                    throw new Error(`${n}: Expected 64-byte hex`);
                return new r(zu(o.slice(0, 64)),zu(o.slice(64, 128)))
            }
            static fromDER(e) {
                let t = e instanceof Uint8Array;
                if (typeof e != "string" && !t)
                    throw new TypeError("Signature.fromDER: Expected string or Uint8Array");
                let {r: n, s: o} = W6(t ? e : vs(e));
                return new r(n,o)
            }
            static fromHex(e) {
                return this.fromDER(e)
            }
            assertValidity() {
                let {r: e, s: t} = this;
                if (!_a(e))
                    throw new Error("Invalid Signature: r must be 0 < r < n");
                if (!_a(t))
                    throw new Error("Invalid Signature: s must be 0 < s < n")
            }
            hasHighS() {
                let e = Ht.n >> Nt;
                return this.s > e
            }
            normalizeS() {
                return this.hasHighS() ? new r(this.r,ge(-this.s, Ht.n)) : this
            }
            toDERRawBytes() {
                return vs(this.toDERHex())
            }
            toDERHex() {
                let e = dA(ba(this.s))
                  , t = dA(ba(this.r))
                  , n = e.length / 2
                  , o = t.length / 2
                  , s = ba(n)
                  , i = ba(o);
                return `30${ba(o + n + 4)}02${i}${t}02${s}${e}`
            }
            toRawBytes() {
                return this.toDERRawBytes()
            }
            toHex() {
                return this.toDERHex()
            }
            toCompactRawBytes() {
                return vs(this.toCompactHex())
            }
            toCompactHex() {
                return di(this.r) + di(this.s)
            }
        }
        ;
        V6 = Array.from({
            length: 256
        }, (r, e) => e.toString(16).padStart(2, "0"));
        G6 = BigInt("0x10000000000000000000000000000000000000000000000000000000000000000");
        uh = class {
            constructor(e, t) {
                if (this.hashLen = e,
                this.qByteLen = t,
                typeof e != "number" || e < 2)
                    throw new Error("hashLen must be a number");
                if (typeof t != "number" || t < 2)
                    throw new Error("qByteLen must be a number");
                this.v = new Uint8Array(e).fill(1),
                this.k = new Uint8Array(e).fill(0),
                this.counter = 0
            }
            hmac(...e) {
                return mn.hmacSha256(this.k, ...e)
            }
            hmacSync(...e) {
                return va(this.k, ...e)
            }
            checkSync() {
                if (typeof va != "function")
                    throw new Pu("hmacSha256Sync needs to be set")
            }
            incr() {
                if (this.counter >= 1e3)
                    throw new Error("Tried 1,000 k values for sign(), all were invalid");
                this.counter += 1
            }
            async reseed(e=new Uint8Array) {
                this.k = await this.hmac(this.v, Uint8Array.from([0]), e),
                this.v = await this.hmac(this.v),
                e.length !== 0 && (this.k = await this.hmac(this.v, Uint8Array.from([1]), e),
                this.v = await this.hmac(this.v))
            }
            reseedSync(e=new Uint8Array) {
                this.checkSync(),
                this.k = this.hmacSync(this.v, Uint8Array.from([0]), e),
                this.v = this.hmacSync(this.v),
                e.length !== 0 && (this.k = this.hmacSync(this.v, Uint8Array.from([1]), e),
                this.v = this.hmacSync(this.v))
            }
            async generate() {
                this.incr();
                let e = 0
                  , t = [];
                for (; e < this.qByteLen; ) {
                    this.v = await this.hmac(this.v);
                    let n = this.v.slice();
                    t.push(n),
                    e += this.v.length
                }
                return bo(...t)
            }
            generateSync() {
                this.checkSync(),
                this.incr();
                let e = 0
                  , t = [];
                for (; e < this.qByteLen; ) {
                    this.v = this.hmacSync(this.v);
                    let n = this.v.slice();
                    t.push(n),
                    e += this.v.length
                }
                return bo(...t)
            }
        }
        ;
        Xt.BASE._setWindowSize(8);
        _r = {
            node: H6,
            web: typeof self == "object" && "crypto"in self ? self.crypto : void 0
        },
        Tu = {},
        mn = {
            bytesToHex: mi,
            hexToBytes: vs,
            concatBytes: bo,
            mod: ge,
            invert: Aa,
            isValidPrivateKey(r) {
                try {
                    return Mu(r),
                    !0
                } catch {
                    return !1
                }
            },
            _bigintTo32Bytes: ch,
            _normalizePrivateKey: Mu,
            hashToPrivateKey: r => {
                r = Ea(r);
                let e = yi + 8;
                if (r.length < e || r.length > 1024)
                    throw new Error("Expected valid bytes of private key as per FIPS 186");
                let t = ge(vo(r), Ht.n - Nt) + Nt;
                return ch(t)
            }
            ,
            randomBytes: (r=32) => {
                if (_r.web)
                    return _r.web.getRandomValues(new Uint8Array(r));
                if (_r.node) {
                    let {randomBytes: e} = _r.node;
                    return Uint8Array.from(e(r))
                } else
                    throw new Error("The environment doesn't have randomBytes function")
            }
            ,
            randomPrivateKey: () => mn.hashToPrivateKey(mn.randomBytes(yi + 8)),
            precompute(r=8, e=Xt.BASE) {
                let t = e === Xt.BASE ? e : new Xt(e.x,e.y);
                return t._setWindowSize(r),
                t.multiply(Sa),
                t
            },
            sha256: async (...r) => {
                if (_r.web) {
                    let e = await _r.web.subtle.digest("SHA-256", bo(...r));
                    return new Uint8Array(e)
                } else if (_r.node) {
                    let {createHash: e} = _r.node
                      , t = e("sha256");
                    return r.forEach(n => t.update(n)),
                    Uint8Array.from(t.digest())
                } else
                    throw new Error("The environment doesn't have sha256 function")
            }
            ,
            hmacSha256: async (r, ...e) => {
                if (_r.web) {
                    let t = await _r.web.subtle.importKey("raw", r, {
                        name: "HMAC",
                        hash: {
                            name: "SHA-256"
                        }
                    }, !1, ["sign"])
                      , n = bo(...e)
                      , o = await _r.web.subtle.sign("HMAC", t, n);
                    return new Uint8Array(o)
                } else if (_r.node) {
                    let {createHmac: t} = _r.node
                      , n = t("sha256", r);
                    return e.forEach(o => n.update(o)),
                    Uint8Array.from(n.digest())
                } else
                    throw new Error("The environment doesn't have hmac-sha256 function")
            }
            ,
            sha256Sync: void 0,
            hmacSha256Sync: void 0,
            taggedHash: async (r, ...e) => {
                let t = Tu[r];
                if (t === void 0) {
                    let n = await mn.sha256(Uint8Array.from(r, o => o.charCodeAt(0)));
                    t = bo(n, n),
                    Tu[r] = t
                }
                return mn.sha256(t, ...e)
            }
            ,
            taggedHashSync: (r, ...e) => {
                if (typeof hi != "function")
                    throw new Pu("sha256Sync is undefined, you need to set it");
                let t = Tu[r];
                if (t === void 0) {
                    let n = hi(Uint8Array.from(r, o => o.charCodeAt(0)));
                    t = bo(n, n),
                    Tu[r] = t
                }
                return hi(t, ...e)
            }
            ,
            _JacobianPoint: hr
        };
        Object.defineProperties(mn, {
            sha256Sync: {
                configurable: !1,
                get() {
                    return hi
                },
                set(r) {
                    hi || (hi = r)
                }
            },
            hmacSha256Sync: {
                configurable: !1,
                get() {
                    return va
                },
                set(r) {
                    va || (va = r)
                }
            }
        })
    }
    );
    function EA(r) {
        try {
            return Dt.fromHex(r, !0),
            !0
        } catch {
            return !1
        }
    }
    function cO(r) {
        return r._bn !== void 0
    }
    function CA(r, e) {
        let t = o => {
            if (o.span >= 0)
                return o.span;
            if (typeof o.alloc == "function")
                return o.alloc(e[o.property]);
            if ("count"in o && "elementLayout"in o) {
                let s = e[o.property];
                if (Array.isArray(s))
                    return s.length * t(o.elementLayout)
            } else if ("fields"in o)
                return CA({
                    layout: o
                }, e[o.property]);
            return 0
        }
          , n = 0;
        return r.layout.fields.forEach(o => {
            n += t(o)
        }
        ),
        n
    }
    function Ar(r) {
        let e = 0
          , t = 0;
        for (; ; ) {
            let n = r.shift();
            if (e |= (n & 127) << t * 7,
            t += 1,
            !(n & 128))
                break
        }
        return e
    }
    function kr(r, e) {
        let t = e;
        for (; ; ) {
            let n = t & 127;
            if (t >>= 7,
            t == 0) {
                r.push(n);
                break
            } else
                n |= 128,
                r.push(n)
        }
    }
    function Ct(r, e) {
        if (!r)
            throw new Error(e || "Assertion failed")
    }
    function Un(r) {
        if (r.length === 0)
            throw new Error(OA);
        return r.shift()
    }
    function Ir(r, ...e) {
        let[t] = e;
        if (e.length === 2 ? t + (e[1] ?? 0) > r.length : t >= r.length)
            throw new Error(OA);
        return r.splice(...e)
    }
    async function lh(r, e, t, n) {
        let o = n && {
            skipPreflight: n.skipPreflight,
            preflightCommitment: n.preflightCommitment || n.commitment,
            maxRetries: n.maxRetries,
            minContextSlot: n.minContextSlot
        }, s = await r.sendTransaction(e, t, o), i;
        if (e.recentBlockhash != null && e.lastValidBlockHeight != null)
            i = (await r.confirmTransaction({
                abortSignal: n?.abortSignal,
                signature: s,
                blockhash: e.recentBlockhash,
                lastValidBlockHeight: e.lastValidBlockHeight
            }, n && n.commitment)).value;
        else if (e.minNonceContextSlot != null && e.nonceInfo != null) {
            let {nonceInstruction: u} = e.nonceInfo
              , f = u.keys[0].pubkey;
            i = (await r.confirmTransaction({
                abortSignal: n?.abortSignal,
                minContextSlot: e.minNonceContextSlot,
                nonceAccountPubkey: f,
                nonceValue: e.nonceInfo.nonce,
                signature: s
            }, n && n.commitment)).value
        } else
            n?.abortSignal != null && console.warn("sendAndConfirmTransaction(): A transaction with a deprecated confirmation strategy was supplied along with an `abortSignal`. Only transactions having `lastValidBlockHeight` or a combination of `nonceInfo` and `minNonceContextSlot` are abortable."),
            i = (await r.confirmTransaction(s, n && n.commitment)).value;
        if (i.err)
            throw new Error(`Transaction ${s} failed (${JSON.stringify(i)})`);
        return s
    }
    function yO(r) {
        return new Promise(e => setTimeout(e, r))
    }
    function Ge(r, e) {
        let t = r.layout.span >= 0 ? r.layout.span : CA(r, e)
          , n = Te.Buffer.alloc(t)
          , o = Object.assign({
            instruction: r.index
        }, e);
        return r.layout.encode(o, n),
        n
    }
    function UA(r) {
        return lr([re({
            jsonrpc: qt("2.0"),
            id: pe(),
            result: r
        }), re({
            jsonrpc: qt("2.0"),
            id: pe(),
            error: re({
                code: ui(),
                message: pe(),
                data: ke(f_())
            })
        })])
    }
    function Ot(r) {
        return pi(UA(r), _O, e => "error"in e ? e : {
            ...e,
            result: ci(e.result, r)
        })
    }
    function Yr(r) {
        return Ot(re({
            context: re({
                slot: H()
            }),
            value: r
        }))
    }
    function Ku(r) {
        return re({
            context: re({
                slot: H()
            }),
            value: r
        })
    }
    var Te, yh, ur, bi, L, LA, Ba, nO, oO, sO, SQ, vA, mh, Rh, iO, Ye, gh, Cu, NA, aO, _o, _A, Pe, vQ, Es, Bh, Ou, xh, wh, bh, xi, De, uO, gi, pO, fO, lO, dO, qu, OA, _s, Uu, Hu, AA, hO, Qe, tt, Zr, qn, EQ, _Q, ph, Ia, AQ, kQ, IQ, fh, mO, gO, kA, xO, wO, wi, qr, br, bO, Sh, RQ, BQ, SO, vO, EO, TQ, PQ, Wt, qA, Th, zQ, _O, AO, MQ, kO, IO, RO, BO, As, TO, PO, LQ, NQ, CQ, OQ, qQ, UQ, DQ, FQ, jQ, HQ, zO, KQ, WQ, vh, VQ, GQ, Ph, ZQ, MO, LO, YQ, $Q, JQ, XQ, QQ, NO, eee, CO, tee, OO, ree, nee, oee, see, IA, iee, qO, UO, aee, cee, DA, zh, FA, jA, HA, KA, DO, FO, WA, VA, Du, GA, Wu, Mh, Si, ks, uee, pee, fee, lee, dee, hee, yee, mee, gee, xee, wee, bee, jO, See, vee, Eee, _ee, HO, Aee, Eh, ka, _h, Lu, Ah, RA, BA, TA, PA, kh, KO, WO, zA, dh, MA, VO, hh, Ih, GO, Ra, Eo, kee, Fu, Nu, Iee, ju, Ree, Bee, Tee, Pee, Vu = C( () => {
        h();
        Te = je($i());
        HE();
        e_();
        yh = je(Za()),
        ur = je(Jn());
        t_();
        bi = je(a_()),
        L = je(Xs()),
        LA = je(Xs()),
        Ba = je(Ld());
        l_();
        nO = je(N_()),
        oO = je($_()),
        sO = je(X_());
        sA();
        iA();
        SA();
        po.sha512Sync = (...r) => jE(po.concatBytes(...r));
        SQ = po.randomPrivateKey,
        vA = () => {
            let r = po.randomPrivateKey()
              , e = mh(r)
              , t = new Uint8Array(64);
            return t.set(r),
            t.set(e, 32),
            {
                publicKey: e,
                secretKey: t
            }
        }
        ,
        mh = Yc.getPublicKey;
        Rh = (r, e) => Yc.sign(r, e.slice(0, 32)),
        iO = Yc.verify,
        Ye = r => Te.Buffer.isBuffer(r) ? r : r instanceof Uint8Array ? Te.Buffer.from(r.buffer, r.byteOffset, r.byteLength) : Te.Buffer.from(r),
        gh = class {
            constructor(e) {
                Object.assign(this, e)
            }
            encode() {
                return Te.Buffer.from((0,
                bi.serialize)(Cu, this))
            }
            static decode(e) {
                return (0,
                bi.deserialize)(Cu, this, e)
            }
            static decodeUnchecked(e) {
                return (0,
                bi.deserializeUnchecked)(Cu, this, e)
            }
        }
        ,
        Cu = new Map,
        aO = 32,
        _o = 32;
        _A = 1;
        NA = Symbol.toStringTag;
        Pe = class r extends gh {
            constructor(e) {
                if (super({}),
                this._bn = void 0,
                cO(e))
                    this._bn = e._bn;
                else {
                    if (typeof e == "string") {
                        let t = ur.default.decode(e);
                        if (t.length != _o)
                            throw new Error("Invalid public key input");
                        this._bn = new yh.default(t)
                    } else
                        this._bn = new yh.default(e);
                    if (this._bn.byteLength() > _o)
                        throw new Error("Invalid public key input")
                }
            }
            static unique() {
                let e = new r(_A);
                return _A += 1,
                new r(e.toBuffer())
            }
            equals(e) {
                return this._bn.eq(e._bn)
            }
            toBase58() {
                return ur.default.encode(this.toBytes())
            }
            toJSON() {
                return this.toBase58()
            }
            toBytes() {
                let e = this.toBuffer();
                return new Uint8Array(e.buffer,e.byteOffset,e.byteLength)
            }
            toBuffer() {
                let e = this._bn.toArrayLike(Te.Buffer);
                if (e.length === _o)
                    return e;
                let t = Te.Buffer.alloc(32);
                return e.copy(t, 32 - e.length),
                t
            }
            get[NA]() {
                return `PublicKey(${this.toString()})`
            }
            toString() {
                return this.toBase58()
            }
            static async createWithSeed(e, t, n) {
                let o = Te.Buffer.concat([e.toBuffer(), Te.Buffer.from(t), n.toBuffer()])
                  , s = Jc(o);
                return new r(s)
            }
            static createProgramAddressSync(e, t) {
                let n = Te.Buffer.alloc(0);
                e.forEach(function(s) {
                    if (s.length > aO)
                        throw new TypeError("Max seed length exceeded");
                    n = Te.Buffer.concat([n, Ye(s)])
                }),
                n = Te.Buffer.concat([n, t.toBuffer(), Te.Buffer.from("ProgramDerivedAddress")]);
                let o = Jc(n);
                if (EA(o))
                    throw new Error("Invalid seeds, address must fall off the curve");
                return new r(o)
            }
            static async createProgramAddress(e, t) {
                return this.createProgramAddressSync(e, t)
            }
            static findProgramAddressSync(e, t) {
                let n = 255, o;
                for (; n != 0; ) {
                    try {
                        let s = e.concat(Te.Buffer.from([n]));
                        o = this.createProgramAddressSync(s, t)
                    } catch (s) {
                        if (s instanceof TypeError)
                            throw s;
                        n--;
                        continue
                    }
                    return [o, n]
                }
                throw new Error("Unable to find a viable program address nonce")
            }
            static async findProgramAddress(e, t) {
                return this.findProgramAddressSync(e, t)
            }
            static isOnCurve(e) {
                let t = new r(e);
                return EA(t.toBytes())
            }
        }
        ;
        Pe.default = new Pe("11111111111111111111111111111111");
        Cu.set(Pe, {
            kind: "struct",
            fields: [["_bn", "u256"]]
        });
        vQ = new Pe("BPFLoader1111111111111111111111111111111111"),
        Es = 1232,
        Bh = 127,
        Ou = 64,
        xh = class extends Error {
            constructor(e) {
                super(`Signature ${e} has expired: block height exceeded.`),
                this.signature = void 0,
                this.signature = e
            }
        }
        ;
        Object.defineProperty(xh.prototype, "name", {
            value: "TransactionExpiredBlockheightExceededError"
        });
        wh = class extends Error {
            constructor(e, t) {
                super(`Transaction was not confirmed in ${t.toFixed(2)} seconds. It is unknown if it succeeded or failed. Check signature ${e} using the Solana Explorer or CLI tools.`),
                this.signature = void 0,
                this.signature = e
            }
        }
        ;
        Object.defineProperty(wh.prototype, "name", {
            value: "TransactionExpiredTimeoutError"
        });
        bh = class extends Error {
            constructor(e) {
                super(`Signature ${e} has expired: the nonce is no longer valid.`),
                this.signature = void 0,
                this.signature = e
            }
        }
        ;
        Object.defineProperty(bh.prototype, "name", {
            value: "TransactionExpiredNonceInvalidError"
        });
        xi = class {
            constructor(e, t) {
                this.staticAccountKeys = void 0,
                this.accountKeysFromLookups = void 0,
                this.staticAccountKeys = e,
                this.accountKeysFromLookups = t
            }
            keySegments() {
                let e = [this.staticAccountKeys];
                return this.accountKeysFromLookups && (e.push(this.accountKeysFromLookups.writable),
                e.push(this.accountKeysFromLookups.readonly)),
                e
            }
            get(e) {
                for (let t of this.keySegments()) {
                    if (e < t.length)
                        return t[e];
                    e -= t.length
                }
            }
            get length() {
                return this.keySegments().flat().length
            }
            compileInstructions(e) {
                if (this.length > 256)
                    throw new Error("Account index overflow encountered during compilation");
                let n = new Map;
                this.keySegments().flat().forEach( (s, i) => {
                    n.set(s.toBase58(), i)
                }
                );
                let o = s => {
                    let i = n.get(s.toBase58());
                    if (i === void 0)
                        throw new Error("Encountered an unknown instruction account key during compilation");
                    return i
                }
                ;
                return e.map(s => ({
                    programIdIndex: o(s.programId),
                    accountKeyIndexes: s.keys.map(i => o(i.pubkey)),
                    data: s.data
                }))
            }
        }
        ,
        De = (r="publicKey") => L.blob(32, r),
        uO = (r="signature") => L.blob(64, r),
        gi = (r="string") => {
            let e = L.struct([L.u32("length"), L.u32("lengthPadding"), L.blob(L.offset(L.u32(), -8), "chars")], r)
              , t = e.decode.bind(e)
              , n = e.encode.bind(e)
              , o = e;
            return o.decode = (s, i) => t(s, i).chars.toString(),
            o.encode = (s, i, u) => {
                let f = {
                    chars: Te.Buffer.from(s, "utf8")
                };
                return n(f, i, u)
            }
            ,
            o.alloc = s => L.u32().span + L.u32().span + Te.Buffer.from(s, "utf8").length,
            o
        }
        ,
        pO = (r="authorized") => L.struct([De("staker"), De("withdrawer")], r),
        fO = (r="lockup") => L.struct([L.ns64("unixTimestamp"), L.ns64("epoch"), De("custodian")], r),
        lO = (r="voteInit") => L.struct([De("nodePubkey"), De("authorizedVoter"), De("authorizedWithdrawer"), L.u8("commission")], r),
        dO = (r="voteAuthorizeWithSeedArgs") => L.struct([L.u32("voteAuthorizationType"), De("currentAuthorityDerivedKeyOwnerPubkey"), gi("currentAuthorityDerivedKeySeed"), De("newAuthorized")], r);
        qu = class r {
            constructor(e, t) {
                this.payer = void 0,
                this.keyMetaMap = void 0,
                this.payer = e,
                this.keyMetaMap = t
            }
            static compile(e, t) {
                let n = new Map
                  , o = i => {
                    let u = i.toBase58()
                      , f = n.get(u);
                    return f === void 0 && (f = {
                        isSigner: !1,
                        isWritable: !1,
                        isInvoked: !1
                    },
                    n.set(u, f)),
                    f
                }
                  , s = o(t);
                s.isSigner = !0,
                s.isWritable = !0;
                for (let i of e) {
                    o(i.programId).isInvoked = !0;
                    for (let u of i.keys) {
                        let f = o(u.pubkey);
                        f.isSigner ||= u.isSigner,
                        f.isWritable ||= u.isWritable
                    }
                }
                return new r(t,n)
            }
            getMessageComponents() {
                let e = [...this.keyMetaMap.entries()];
                Ct(e.length <= 256, "Max static account keys length exceeded");
                let t = e.filter( ([,f]) => f.isSigner && f.isWritable)
                  , n = e.filter( ([,f]) => f.isSigner && !f.isWritable)
                  , o = e.filter( ([,f]) => !f.isSigner && f.isWritable)
                  , s = e.filter( ([,f]) => !f.isSigner && !f.isWritable)
                  , i = {
                    numRequiredSignatures: t.length + n.length,
                    numReadonlySignedAccounts: n.length,
                    numReadonlyUnsignedAccounts: s.length
                };
                {
                    Ct(t.length > 0, "Expected at least one writable signer key");
                    let[f] = t[0];
                    Ct(f === this.payer.toBase58(), "Expected first writable signer key to be the fee payer")
                }
                let u = [...t.map( ([f]) => new Pe(f)), ...n.map( ([f]) => new Pe(f)), ...o.map( ([f]) => new Pe(f)), ...s.map( ([f]) => new Pe(f))];
                return [i, u]
            }
            extractTableLookup(e) {
                let[t,n] = this.drainKeysFoundInLookupTable(e.state.addresses, i => !i.isSigner && !i.isInvoked && i.isWritable)
                  , [o,s] = this.drainKeysFoundInLookupTable(e.state.addresses, i => !i.isSigner && !i.isInvoked && !i.isWritable);
                if (!(t.length === 0 && o.length === 0))
                    return [{
                        accountKey: e.key,
                        writableIndexes: t,
                        readonlyIndexes: o
                    }, {
                        writable: n,
                        readonly: s
                    }]
            }
            drainKeysFoundInLookupTable(e, t) {
                let n = new Array
                  , o = new Array;
                for (let[s,i] of this.keyMetaMap.entries())
                    if (t(i)) {
                        let u = new Pe(s)
                          , f = e.findIndex(g => g.equals(u));
                        f >= 0 && (Ct(f < 256, "Max lookup table index exceeded"),
                        n.push(f),
                        o.push(u),
                        this.keyMetaMap.delete(s))
                    }
                return [n, o]
            }
        }
        ,
        OA = "Reached end of buffer unexpectedly";
        _s = class r {
            constructor(e) {
                this.header = void 0,
                this.accountKeys = void 0,
                this.recentBlockhash = void 0,
                this.instructions = void 0,
                this.indexToProgramIds = new Map,
                this.header = e.header,
                this.accountKeys = e.accountKeys.map(t => new Pe(t)),
                this.recentBlockhash = e.recentBlockhash,
                this.instructions = e.instructions,
                this.instructions.forEach(t => this.indexToProgramIds.set(t.programIdIndex, this.accountKeys[t.programIdIndex]))
            }
            get version() {
                return "legacy"
            }
            get staticAccountKeys() {
                return this.accountKeys
            }
            get compiledInstructions() {
                return this.instructions.map(e => ({
                    programIdIndex: e.programIdIndex,
                    accountKeyIndexes: e.accounts,
                    data: ur.default.decode(e.data)
                }))
            }
            get addressTableLookups() {
                return []
            }
            getAccountKeys() {
                return new xi(this.staticAccountKeys)
            }
            static compile(e) {
                let t = qu.compile(e.instructions, e.payerKey)
                  , [n,o] = t.getMessageComponents()
                  , i = new xi(o).compileInstructions(e.instructions).map(u => ({
                    programIdIndex: u.programIdIndex,
                    accounts: u.accountKeyIndexes,
                    data: ur.default.encode(u.data)
                }));
                return new r({
                    header: n,
                    accountKeys: o,
                    recentBlockhash: e.recentBlockhash,
                    instructions: i
                })
            }
            isAccountSigner(e) {
                return e < this.header.numRequiredSignatures
            }
            isAccountWritable(e) {
                let t = this.header.numRequiredSignatures;
                if (e >= this.header.numRequiredSignatures) {
                    let n = e - t
                      , s = this.accountKeys.length - t - this.header.numReadonlyUnsignedAccounts;
                    return n < s
                } else {
                    let n = t - this.header.numReadonlySignedAccounts;
                    return e < n
                }
            }
            isProgramId(e) {
                return this.indexToProgramIds.has(e)
            }
            programIds() {
                return [...this.indexToProgramIds.values()]
            }
            nonProgramIds() {
                return this.accountKeys.filter( (e, t) => !this.isProgramId(t))
            }
            serialize() {
                let e = this.accountKeys.length
                  , t = [];
                kr(t, e);
                let n = this.instructions.map(E => {
                    let {accounts: q, programIdIndex: O} = E
                      , Z = Array.from(ur.default.decode(E.data))
                      , ee = [];
                    kr(ee, q.length);
                    let X = [];
                    return kr(X, Z.length),
                    {
                        programIdIndex: O,
                        keyIndicesCount: Te.Buffer.from(ee),
                        keyIndices: q,
                        dataLength: Te.Buffer.from(X),
                        data: Z
                    }
                }
                )
                  , o = [];
                kr(o, n.length);
                let s = Te.Buffer.alloc(Es);
                Te.Buffer.from(o).copy(s);
                let i = o.length;
                n.forEach(E => {
                    let O = L.struct([L.u8("programIdIndex"), L.blob(E.keyIndicesCount.length, "keyIndicesCount"), L.seq(L.u8("keyIndex"), E.keyIndices.length, "keyIndices"), L.blob(E.dataLength.length, "dataLength"), L.seq(L.u8("userdatum"), E.data.length, "data")]).encode(E, s, i);
                    i += O
                }
                ),
                s = s.slice(0, i);
                let u = L.struct([L.blob(1, "numRequiredSignatures"), L.blob(1, "numReadonlySignedAccounts"), L.blob(1, "numReadonlyUnsignedAccounts"), L.blob(t.length, "keyCount"), L.seq(De("key"), e, "keys"), De("recentBlockhash")])
                  , f = {
                    numRequiredSignatures: Te.Buffer.from([this.header.numRequiredSignatures]),
                    numReadonlySignedAccounts: Te.Buffer.from([this.header.numReadonlySignedAccounts]),
                    numReadonlyUnsignedAccounts: Te.Buffer.from([this.header.numReadonlyUnsignedAccounts]),
                    keyCount: Te.Buffer.from(t),
                    keys: this.accountKeys.map(E => Ye(E.toBytes())),
                    recentBlockhash: ur.default.decode(this.recentBlockhash)
                }
                  , g = Te.Buffer.alloc(2048)
                  , b = u.encode(f, g);
                return s.copy(g, b),
                g.slice(0, b + s.length)
            }
            static from(e) {
                let t = [...e]
                  , n = Un(t);
                if (n !== (n & Bh))
                    throw new Error("Versioned messages must be deserialized with VersionedMessage.deserialize()");
                let o = Un(t)
                  , s = Un(t)
                  , i = Ar(t)
                  , u = [];
                for (let q = 0; q < i; q++) {
                    let O = Ir(t, 0, _o);
                    u.push(new Pe(Te.Buffer.from(O)))
                }
                let f = Ir(t, 0, _o)
                  , g = Ar(t)
                  , b = [];
                for (let q = 0; q < g; q++) {
                    let O = Un(t)
                      , Z = Ar(t)
                      , ee = Ir(t, 0, Z)
                      , X = Ar(t)
                      , le = Ir(t, 0, X)
                      , W = ur.default.encode(Te.Buffer.from(le));
                    b.push({
                        programIdIndex: O,
                        accounts: ee,
                        data: W
                    })
                }
                let E = {
                    header: {
                        numRequiredSignatures: n,
                        numReadonlySignedAccounts: o,
                        numReadonlyUnsignedAccounts: s
                    },
                    recentBlockhash: ur.default.encode(Te.Buffer.from(f)),
                    accountKeys: u,
                    instructions: b
                };
                return new r(E)
            }
        }
        ,
        Uu = class r {
            constructor(e) {
                this.header = void 0,
                this.staticAccountKeys = void 0,
                this.recentBlockhash = void 0,
                this.compiledInstructions = void 0,
                this.addressTableLookups = void 0,
                this.header = e.header,
                this.staticAccountKeys = e.staticAccountKeys,
                this.recentBlockhash = e.recentBlockhash,
                this.compiledInstructions = e.compiledInstructions,
                this.addressTableLookups = e.addressTableLookups
            }
            get version() {
                return 0
            }
            get numAccountKeysFromLookups() {
                let e = 0;
                for (let t of this.addressTableLookups)
                    e += t.readonlyIndexes.length + t.writableIndexes.length;
                return e
            }
            getAccountKeys(e) {
                let t;
                if (e && "accountKeysFromLookups"in e && e.accountKeysFromLookups) {
                    if (this.numAccountKeysFromLookups != e.accountKeysFromLookups.writable.length + e.accountKeysFromLookups.readonly.length)
                        throw new Error("Failed to get account keys because of a mismatch in the number of account keys from lookups");
                    t = e.accountKeysFromLookups
                } else if (e && "addressLookupTableAccounts"in e && e.addressLookupTableAccounts)
                    t = this.resolveAddressTableLookups(e.addressLookupTableAccounts);
                else if (this.addressTableLookups.length > 0)
                    throw new Error("Failed to get account keys because address table lookups were not resolved");
                return new xi(this.staticAccountKeys,t)
            }
            isAccountSigner(e) {
                return e < this.header.numRequiredSignatures
            }
            isAccountWritable(e) {
                let t = this.header.numRequiredSignatures
                  , n = this.staticAccountKeys.length;
                if (e >= n) {
                    let o = e - n
                      , s = this.addressTableLookups.reduce( (i, u) => i + u.writableIndexes.length, 0);
                    return o < s
                } else if (e >= this.header.numRequiredSignatures) {
                    let o = e - t
                      , i = n - t - this.header.numReadonlyUnsignedAccounts;
                    return o < i
                } else {
                    let o = t - this.header.numReadonlySignedAccounts;
                    return e < o
                }
            }
            resolveAddressTableLookups(e) {
                let t = {
                    writable: [],
                    readonly: []
                };
                for (let n of this.addressTableLookups) {
                    let o = e.find(s => s.key.equals(n.accountKey));
                    if (!o)
                        throw new Error(`Failed to find address lookup table account for table key ${n.accountKey.toBase58()}`);
                    for (let s of n.writableIndexes)
                        if (s < o.state.addresses.length)
                            t.writable.push(o.state.addresses[s]);
                        else
                            throw new Error(`Failed to find address for index ${s} in address lookup table ${n.accountKey.toBase58()}`);
                    for (let s of n.readonlyIndexes)
                        if (s < o.state.addresses.length)
                            t.readonly.push(o.state.addresses[s]);
                        else
                            throw new Error(`Failed to find address for index ${s} in address lookup table ${n.accountKey.toBase58()}`)
                }
                return t
            }
            static compile(e) {
                let t = qu.compile(e.instructions, e.payerKey)
                  , n = new Array
                  , o = {
                    writable: new Array,
                    readonly: new Array
                }
                  , s = e.addressLookupTableAccounts || [];
                for (let b of s) {
                    let E = t.extractTableLookup(b);
                    if (E !== void 0) {
                        let[q,{writable: O, readonly: Z}] = E;
                        n.push(q),
                        o.writable.push(...O),
                        o.readonly.push(...Z)
                    }
                }
                let[i,u] = t.getMessageComponents()
                  , g = new xi(u,o).compileInstructions(e.instructions);
                return new r({
                    header: i,
                    staticAccountKeys: u,
                    recentBlockhash: e.recentBlockhash,
                    compiledInstructions: g,
                    addressTableLookups: n
                })
            }
            serialize() {
                let e = Array();
                kr(e, this.staticAccountKeys.length);
                let t = this.serializeInstructions()
                  , n = Array();
                kr(n, this.compiledInstructions.length);
                let o = this.serializeAddressTableLookups()
                  , s = Array();
                kr(s, this.addressTableLookups.length);
                let i = L.struct([L.u8("prefix"), L.struct([L.u8("numRequiredSignatures"), L.u8("numReadonlySignedAccounts"), L.u8("numReadonlyUnsignedAccounts")], "header"), L.blob(e.length, "staticAccountKeysLength"), L.seq(De(), this.staticAccountKeys.length, "staticAccountKeys"), De("recentBlockhash"), L.blob(n.length, "instructionsLength"), L.blob(t.length, "serializedInstructions"), L.blob(s.length, "addressTableLookupsLength"), L.blob(o.length, "serializedAddressTableLookups")])
                  , u = new Uint8Array(Es)
                  , g = i.encode({
                    prefix: 128,
                    header: this.header,
                    staticAccountKeysLength: new Uint8Array(e),
                    staticAccountKeys: this.staticAccountKeys.map(b => b.toBytes()),
                    recentBlockhash: ur.default.decode(this.recentBlockhash),
                    instructionsLength: new Uint8Array(n),
                    serializedInstructions: t,
                    addressTableLookupsLength: new Uint8Array(s),
                    serializedAddressTableLookups: o
                }, u);
                return u.slice(0, g)
            }
            serializeInstructions() {
                let e = 0
                  , t = new Uint8Array(Es);
                for (let n of this.compiledInstructions) {
                    let o = Array();
                    kr(o, n.accountKeyIndexes.length);
                    let s = Array();
                    kr(s, n.data.length);
                    let i = L.struct([L.u8("programIdIndex"), L.blob(o.length, "encodedAccountKeyIndexesLength"), L.seq(L.u8(), n.accountKeyIndexes.length, "accountKeyIndexes"), L.blob(s.length, "encodedDataLength"), L.blob(n.data.length, "data")]);
                    e += i.encode({
                        programIdIndex: n.programIdIndex,
                        encodedAccountKeyIndexesLength: new Uint8Array(o),
                        accountKeyIndexes: n.accountKeyIndexes,
                        encodedDataLength: new Uint8Array(s),
                        data: n.data
                    }, t, e)
                }
                return t.slice(0, e)
            }
            serializeAddressTableLookups() {
                let e = 0
                  , t = new Uint8Array(Es);
                for (let n of this.addressTableLookups) {
                    let o = Array();
                    kr(o, n.writableIndexes.length);
                    let s = Array();
                    kr(s, n.readonlyIndexes.length);
                    let i = L.struct([De("accountKey"), L.blob(o.length, "encodedWritableIndexesLength"), L.seq(L.u8(), n.writableIndexes.length, "writableIndexes"), L.blob(s.length, "encodedReadonlyIndexesLength"), L.seq(L.u8(), n.readonlyIndexes.length, "readonlyIndexes")]);
                    e += i.encode({
                        accountKey: n.accountKey.toBytes(),
                        encodedWritableIndexesLength: new Uint8Array(o),
                        writableIndexes: n.writableIndexes,
                        encodedReadonlyIndexesLength: new Uint8Array(s),
                        readonlyIndexes: n.readonlyIndexes
                    }, t, e)
                }
                return t.slice(0, e)
            }
            static deserialize(e) {
                let t = [...e]
                  , n = Un(t)
                  , o = n & Bh;
                Ct(n !== o, "Expected versioned message but received legacy message");
                let s = o;
                Ct(s === 0, `Expected versioned message with version 0 but found version ${s}`);
                let i = {
                    numRequiredSignatures: Un(t),
                    numReadonlySignedAccounts: Un(t),
                    numReadonlyUnsignedAccounts: Un(t)
                }
                  , u = []
                  , f = Ar(t);
                for (let Z = 0; Z < f; Z++)
                    u.push(new Pe(Ir(t, 0, _o)));
                let g = ur.default.encode(Ir(t, 0, _o))
                  , b = Ar(t)
                  , E = [];
                for (let Z = 0; Z < b; Z++) {
                    let ee = Un(t)
                      , X = Ar(t)
                      , le = Ir(t, 0, X)
                      , W = Ar(t)
                      , Se = new Uint8Array(Ir(t, 0, W));
                    E.push({
                        programIdIndex: ee,
                        accountKeyIndexes: le,
                        data: Se
                    })
                }
                let q = Ar(t)
                  , O = [];
                for (let Z = 0; Z < q; Z++) {
                    let ee = new Pe(Ir(t, 0, _o))
                      , X = Ar(t)
                      , le = Ir(t, 0, X)
                      , W = Ar(t)
                      , Se = Ir(t, 0, W);
                    O.push({
                        accountKey: ee,
                        writableIndexes: le,
                        readonlyIndexes: Se
                    })
                }
                return new r({
                    header: i,
                    staticAccountKeys: u,
                    recentBlockhash: g,
                    compiledInstructions: E,
                    addressTableLookups: O
                })
            }
        }
        ,
        Hu = {
            deserializeMessageVersion(r) {
                let e = r[0]
                  , t = e & Bh;
                return t === e ? "legacy" : t
            },
            deserialize: r => {
                let e = Hu.deserializeMessageVersion(r);
                if (e === "legacy")
                    return _s.from(r);
                if (e === 0)
                    return Uu.deserialize(r);
                throw new Error(`Transaction message version ${e} deserialization is not supported`)
            }
        };
        (function(r) {
            r[r.BLOCKHEIGHT_EXCEEDED = 0] = "BLOCKHEIGHT_EXCEEDED",
            r[r.PROCESSED = 1] = "PROCESSED",
            r[r.TIMED_OUT = 2] = "TIMED_OUT",
            r[r.NONCE_INVALID = 3] = "NONCE_INVALID"
        }
        )(AA || (AA = {}));
        hO = Te.Buffer.alloc(Ou).fill(0),
        Qe = class {
            constructor(e) {
                this.keys = void 0,
                this.programId = void 0,
                this.data = Te.Buffer.alloc(0),
                this.programId = e.programId,
                this.keys = e.keys,
                e.data && (this.data = e.data)
            }
            toJSON() {
                return {
                    keys: this.keys.map( ({pubkey: e, isSigner: t, isWritable: n}) => ({
                        pubkey: e.toJSON(),
                        isSigner: t,
                        isWritable: n
                    })),
                    programId: this.programId.toJSON(),
                    data: [...this.data]
                }
            }
        }
        ,
        tt = class r {
            get signature() {
                return this.signatures.length > 0 ? this.signatures[0].signature : null
            }
            constructor(e) {
                if (this.signatures = [],
                this.feePayer = void 0,
                this.instructions = [],
                this.recentBlockhash = void 0,
                this.lastValidBlockHeight = void 0,
                this.nonceInfo = void 0,
                this.minNonceContextSlot = void 0,
                this._message = void 0,
                this._json = void 0,
                !!e)
                    if (e.feePayer && (this.feePayer = e.feePayer),
                    e.signatures && (this.signatures = e.signatures),
                    Object.prototype.hasOwnProperty.call(e, "nonceInfo")) {
                        let {minContextSlot: t, nonceInfo: n} = e;
                        this.minNonceContextSlot = t,
                        this.nonceInfo = n
                    } else if (Object.prototype.hasOwnProperty.call(e, "lastValidBlockHeight")) {
                        let {blockhash: t, lastValidBlockHeight: n} = e;
                        this.recentBlockhash = t,
                        this.lastValidBlockHeight = n
                    } else {
                        let {recentBlockhash: t, nonceInfo: n} = e;
                        n && (this.nonceInfo = n),
                        this.recentBlockhash = t
                    }
            }
            toJSON() {
                return {
                    recentBlockhash: this.recentBlockhash || null,
                    feePayer: this.feePayer ? this.feePayer.toJSON() : null,
                    nonceInfo: this.nonceInfo ? {
                        nonce: this.nonceInfo.nonce,
                        nonceInstruction: this.nonceInfo.nonceInstruction.toJSON()
                    } : null,
                    instructions: this.instructions.map(e => e.toJSON()),
                    signers: this.signatures.map( ({publicKey: e}) => e.toJSON())
                }
            }
            add(...e) {
                if (e.length === 0)
                    throw new Error("No instructions");
                return e.forEach(t => {
                    "instructions"in t ? this.instructions = this.instructions.concat(t.instructions) : "data"in t && "programId"in t && "keys"in t ? this.instructions.push(t) : this.instructions.push(new Qe(t))
                }
                ),
                this
            }
            compileMessage() {
                if (this._message && JSON.stringify(this.toJSON()) === JSON.stringify(this._json))
                    return this._message;
                let e, t;
                if (this.nonceInfo ? (e = this.nonceInfo.nonce,
                this.instructions[0] != this.nonceInfo.nonceInstruction ? t = [this.nonceInfo.nonceInstruction, ...this.instructions] : t = this.instructions) : (e = this.recentBlockhash,
                t = this.instructions),
                !e)
                    throw new Error("Transaction recentBlockhash required");
                t.length < 1 && console.warn("No instructions provided");
                let n;
                if (this.feePayer)
                    n = this.feePayer;
                else if (this.signatures.length > 0 && this.signatures[0].publicKey)
                    n = this.signatures[0].publicKey;
                else
                    throw new Error("Transaction fee payer required");
                for (let ee = 0; ee < t.length; ee++)
                    if (t[ee].programId === void 0)
                        throw new Error(`Transaction instruction index ${ee} has undefined program id`);
                let o = []
                  , s = [];
                t.forEach(ee => {
                    ee.keys.forEach(le => {
                        s.push({
                            ...le
                        })
                    }
                    );
                    let X = ee.programId.toString();
                    o.includes(X) || o.push(X)
                }
                ),
                o.forEach(ee => {
                    s.push({
                        pubkey: new Pe(ee),
                        isSigner: !1,
                        isWritable: !1
                    })
                }
                );
                let i = [];
                s.forEach(ee => {
                    let X = ee.pubkey.toString()
                      , le = i.findIndex(W => W.pubkey.toString() === X);
                    le > -1 ? (i[le].isWritable = i[le].isWritable || ee.isWritable,
                    i[le].isSigner = i[le].isSigner || ee.isSigner) : i.push(ee)
                }
                ),
                i.sort(function(ee, X) {
                    return ee.isSigner !== X.isSigner ? ee.isSigner ? -1 : 1 : ee.isWritable !== X.isWritable ? ee.isWritable ? -1 : 1 : ee.pubkey.toBase58().localeCompare(X.pubkey.toBase58())
                });
                let u = i.findIndex(ee => ee.pubkey.equals(n));
                if (u > -1) {
                    let[ee] = i.splice(u, 1);
                    ee.isSigner = !0,
                    ee.isWritable = !0,
                    i.unshift(ee)
                } else
                    i.unshift({
                        pubkey: n,
                        isSigner: !0,
                        isWritable: !0
                    });
                for (let ee of this.signatures) {
                    let X = i.findIndex(le => le.pubkey.equals(ee.publicKey));
                    if (X > -1)
                        i[X].isSigner || (i[X].isSigner = !0,
                        console.warn("Transaction references a signature that is unnecessary, only the fee payer and instruction signer accounts should sign a transaction. This behavior is deprecated and will throw an error in the next major version release."));
                    else
                        throw new Error(`unknown signer: ${ee.publicKey.toString()}`)
                }
                let f = 0
                  , g = 0
                  , b = 0
                  , E = []
                  , q = [];
                i.forEach( ({pubkey: ee, isSigner: X, isWritable: le}) => {
                    X ? (E.push(ee.toString()),
                    f += 1,
                    le || (g += 1)) : (q.push(ee.toString()),
                    le || (b += 1))
                }
                );
                let O = E.concat(q)
                  , Z = t.map(ee => {
                    let {data: X, programId: le} = ee;
                    return {
                        programIdIndex: O.indexOf(le.toString()),
                        accounts: ee.keys.map(W => O.indexOf(W.pubkey.toString())),
                        data: ur.default.encode(X)
                    }
                }
                );
                return Z.forEach(ee => {
                    Ct(ee.programIdIndex >= 0),
                    ee.accounts.forEach(X => Ct(X >= 0))
                }
                ),
                new _s({
                    header: {
                        numRequiredSignatures: f,
                        numReadonlySignedAccounts: g,
                        numReadonlyUnsignedAccounts: b
                    },
                    accountKeys: O,
                    recentBlockhash: e,
                    instructions: Z
                })
            }
            _compile() {
                let e = this.compileMessage()
                  , t = e.accountKeys.slice(0, e.header.numRequiredSignatures);
                return this.signatures.length === t.length && this.signatures.every( (o, s) => t[s].equals(o.publicKey)) || (this.signatures = t.map(n => ({
                    signature: null,
                    publicKey: n
                }))),
                e
            }
            serializeMessage() {
                return this._compile().serialize()
            }
            async getEstimatedFee(e) {
                return (await e.getFeeForMessage(this.compileMessage())).value
            }
            setSigners(...e) {
                if (e.length === 0)
                    throw new Error("No signers");
                let t = new Set;
                this.signatures = e.filter(n => {
                    let o = n.toString();
                    return t.has(o) ? !1 : (t.add(o),
                    !0)
                }
                ).map(n => ({
                    signature: null,
                    publicKey: n
                }))
            }
            sign(...e) {
                if (e.length === 0)
                    throw new Error("No signers");
                let t = new Set
                  , n = [];
                for (let s of e) {
                    let i = s.publicKey.toString();
                    t.has(i) || (t.add(i),
                    n.push(s))
                }
                this.signatures = n.map(s => ({
                    signature: null,
                    publicKey: s.publicKey
                }));
                let o = this._compile();
                this._partialSign(o, ...n)
            }
            partialSign(...e) {
                if (e.length === 0)
                    throw new Error("No signers");
                let t = new Set
                  , n = [];
                for (let s of e) {
                    let i = s.publicKey.toString();
                    t.has(i) || (t.add(i),
                    n.push(s))
                }
                let o = this._compile();
                this._partialSign(o, ...n)
            }
            _partialSign(e, ...t) {
                let n = e.serialize();
                t.forEach(o => {
                    let s = Rh(n, o.secretKey);
                    this._addSignature(o.publicKey, Ye(s))
                }
                )
            }
            addSignature(e, t) {
                this._compile(),
                this._addSignature(e, t)
            }
            _addSignature(e, t) {
                Ct(t.length === 64);
                let n = this.signatures.findIndex(o => e.equals(o.publicKey));
                if (n < 0)
                    throw new Error(`unknown signer: ${e.toString()}`);
                this.signatures[n].signature = Te.Buffer.from(t)
            }
            verifySignatures(e) {
                return this._verifySignatures(this.serializeMessage(), e === void 0 ? !0 : e)
            }
            _verifySignatures(e, t) {
                for (let {signature: n, publicKey: o} of this.signatures)
                    if (n === null) {
                        if (t)
                            return !1
                    } else if (!iO(n, e, o.toBytes()))
                        return !1;
                return !0
            }
            serialize(e) {
                let {requireAllSignatures: t, verifySignatures: n} = Object.assign({
                    requireAllSignatures: !0,
                    verifySignatures: !0
                }, e)
                  , o = this.serializeMessage();
                if (n && !this._verifySignatures(o, t))
                    throw new Error("Signature verification failed");
                return this._serialize(o)
            }
            _serialize(e) {
                let {signatures: t} = this
                  , n = [];
                kr(n, t.length);
                let o = n.length + t.length * 64 + e.length
                  , s = Te.Buffer.alloc(o);
                return Ct(t.length < 256),
                Te.Buffer.from(n).copy(s, 0),
                t.forEach( ({signature: i}, u) => {
                    i !== null && (Ct(i.length === 64, "signature has invalid length"),
                    Te.Buffer.from(i).copy(s, n.length + u * 64))
                }
                ),
                e.copy(s, n.length + t.length * 64),
                Ct(s.length <= Es, `Transaction too large: ${s.length} > ${Es}`),
                s
            }
            get keys() {
                return Ct(this.instructions.length === 1),
                this.instructions[0].keys.map(e => e.pubkey)
            }
            get programId() {
                return Ct(this.instructions.length === 1),
                this.instructions[0].programId
            }
            get data() {
                return Ct(this.instructions.length === 1),
                this.instructions[0].data
            }
            static from(e) {
                let t = [...e]
                  , n = Ar(t)
                  , o = [];
                for (let s = 0; s < n; s++) {
                    let i = Ir(t, 0, Ou);
                    o.push(ur.default.encode(Te.Buffer.from(i)))
                }
                return r.populate(_s.from(t), o)
            }
            static populate(e, t=[]) {
                let n = new r;
                return n.recentBlockhash = e.recentBlockhash,
                e.header.numRequiredSignatures > 0 && (n.feePayer = e.accountKeys[0]),
                t.forEach( (o, s) => {
                    let i = {
                        signature: o == ur.default.encode(hO) ? null : ur.default.decode(o),
                        publicKey: e.accountKeys[s]
                    };
                    n.signatures.push(i)
                }
                ),
                e.instructions.forEach(o => {
                    let s = o.accounts.map(i => {
                        let u = e.accountKeys[i];
                        return {
                            pubkey: u,
                            isSigner: n.signatures.some(f => f.publicKey.toString() === u.toString()) || e.isAccountSigner(i),
                            isWritable: e.isAccountWritable(i)
                        }
                    }
                    );
                    n.instructions.push(new Qe({
                        keys: s,
                        programId: e.accountKeys[o.programIdIndex],
                        data: ur.default.decode(o.data)
                    }))
                }
                ),
                n._message = e,
                n._json = n.toJSON(),
                n
            }
        }
        ,
        Zr = class r {
            get version() {
                return this.message.version
            }
            constructor(e, t) {
                if (this.signatures = void 0,
                this.message = void 0,
                t !== void 0)
                    Ct(t.length === e.header.numRequiredSignatures, "Expected signatures length to be equal to the number of required signatures"),
                    this.signatures = t;
                else {
                    let n = [];
                    for (let o = 0; o < e.header.numRequiredSignatures; o++)
                        n.push(new Uint8Array(Ou));
                    this.signatures = n
                }
                this.message = e
            }
            serialize() {
                let e = this.message.serialize()
                  , t = Array();
                kr(t, this.signatures.length);
                let n = L.struct([L.blob(t.length, "encodedSignaturesLength"), L.seq(uO(), this.signatures.length, "signatures"), L.blob(e.length, "serializedMessage")])
                  , o = new Uint8Array(2048)
                  , s = n.encode({
                    encodedSignaturesLength: new Uint8Array(t),
                    signatures: this.signatures,
                    serializedMessage: e
                }, o);
                return o.slice(0, s)
            }
            static deserialize(e) {
                let t = [...e]
                  , n = []
                  , o = Ar(t);
                for (let i = 0; i < o; i++)
                    n.push(new Uint8Array(Ir(t, 0, Ou)));
                let s = Hu.deserialize(new Uint8Array(t));
                return new r(s,n)
            }
            sign(e) {
                let t = this.message.serialize()
                  , n = this.message.staticAccountKeys.slice(0, this.message.header.numRequiredSignatures);
                for (let o of e) {
                    let s = n.findIndex(i => i.equals(o.publicKey));
                    Ct(s >= 0, `Cannot sign with non signer key ${o.publicKey.toBase58()}`),
                    this.signatures[s] = Rh(t, o.secretKey)
                }
            }
            addSignature(e, t) {
                Ct(t.byteLength === 64, "Signature must be 64 bytes long");
                let o = this.message.staticAccountKeys.slice(0, this.message.header.numRequiredSignatures).findIndex(s => s.equals(e));
                Ct(o >= 0, `Can not add signature; \`${e.toBase58()}\` is not required to sign this transaction`),
                this.signatures[o] = t
            }
        }
        ,
        qn = new Pe("SysvarC1ock11111111111111111111111111111111"),
        EQ = new Pe("SysvarEpochSchedu1e111111111111111111111111"),
        _Q = new Pe("Sysvar1nstructions1111111111111111111111111"),
        ph = new Pe("SysvarRecentB1ockHashes11111111111111111111"),
        Ia = new Pe("SysvarRent111111111111111111111111111111111"),
        AQ = new Pe("SysvarRewards111111111111111111111111111111"),
        kQ = new Pe("SysvarS1otHashes111111111111111111111111111"),
        IQ = new Pe("SysvarS1otHistory11111111111111111111111111"),
        fh = new Pe("SysvarStakeHistory1111111111111111111111111");
        mO = L.nu64("lamportsPerSignature"),
        gO = L.struct([L.u32("version"), L.u32("state"), De("authorizedPubkey"), De("nonce"), L.struct([mO], "feeCalculator")]),
        kA = gO.span,
        xO = r => {
            let e = r.decode.bind(r)
              , t = r.encode.bind(r);
            return {
                decode: e,
                encode: t
            }
        }
        ,
        wO = r => e => {
            let t = (0,
            LA.blob)(r, e)
              , {encode: n, decode: o} = xO(t)
              , s = t;
            return s.decode = (i, u) => {
                let f = o(i, u);
                return (0,
                Ba.toBigIntLE)(Te.Buffer.from(f))
            }
            ,
            s.encode = (i, u, f) => {
                let g = (0,
                Ba.toBufferLE)(i, r);
                return n(g, u, f)
            }
            ,
            s
        }
        ,
        wi = wO(8),
        qr = Object.freeze({
            Create: {
                index: 0,
                layout: L.struct([L.u32("instruction"), L.ns64("lamports"), L.ns64("space"), De("programId")])
            },
            Assign: {
                index: 1,
                layout: L.struct([L.u32("instruction"), De("programId")])
            },
            Transfer: {
                index: 2,
                layout: L.struct([L.u32("instruction"), wi("lamports")])
            },
            CreateWithSeed: {
                index: 3,
                layout: L.struct([L.u32("instruction"), De("base"), gi("seed"), L.ns64("lamports"), L.ns64("space"), De("programId")])
            },
            AdvanceNonceAccount: {
                index: 4,
                layout: L.struct([L.u32("instruction")])
            },
            WithdrawNonceAccount: {
                index: 5,
                layout: L.struct([L.u32("instruction"), L.ns64("lamports")])
            },
            InitializeNonceAccount: {
                index: 6,
                layout: L.struct([L.u32("instruction"), De("authorized")])
            },
            AuthorizeNonceAccount: {
                index: 7,
                layout: L.struct([L.u32("instruction"), De("authorized")])
            },
            Allocate: {
                index: 8,
                layout: L.struct([L.u32("instruction"), L.ns64("space")])
            },
            AllocateWithSeed: {
                index: 9,
                layout: L.struct([L.u32("instruction"), De("base"), gi("seed"), L.ns64("space"), De("programId")])
            },
            AssignWithSeed: {
                index: 10,
                layout: L.struct([L.u32("instruction"), De("base"), gi("seed"), De("programId")])
            },
            TransferWithSeed: {
                index: 11,
                layout: L.struct([L.u32("instruction"), wi("lamports"), gi("seed"), De("programId")])
            },
            UpgradeNonceAccount: {
                index: 12,
                layout: L.struct([L.u32("instruction")])
            }
        }),
        br = class r {
            constructor() {}
            static createAccount(e) {
                let t = qr.Create
                  , n = Ge(t, {
                    lamports: e.lamports,
                    space: e.space,
                    programId: Ye(e.programId.toBuffer())
                });
                return new Qe({
                    keys: [{
                        pubkey: e.fromPubkey,
                        isSigner: !0,
                        isWritable: !0
                    }, {
                        pubkey: e.newAccountPubkey,
                        isSigner: !0,
                        isWritable: !0
                    }],
                    programId: this.programId,
                    data: n
                })
            }
            static transfer(e) {
                let t, n;
                if ("basePubkey"in e) {
                    let o = qr.TransferWithSeed;
                    t = Ge(o, {
                        lamports: BigInt(e.lamports),
                        seed: e.seed,
                        programId: Ye(e.programId.toBuffer())
                    }),
                    n = [{
                        pubkey: e.fromPubkey,
                        isSigner: !1,
                        isWritable: !0
                    }, {
                        pubkey: e.basePubkey,
                        isSigner: !0,
                        isWritable: !1
                    }, {
                        pubkey: e.toPubkey,
                        isSigner: !1,
                        isWritable: !0
                    }]
                } else {
                    let o = qr.Transfer;
                    t = Ge(o, {
                        lamports: BigInt(e.lamports)
                    }),
                    n = [{
                        pubkey: e.fromPubkey,
                        isSigner: !0,
                        isWritable: !0
                    }, {
                        pubkey: e.toPubkey,
                        isSigner: !1,
                        isWritable: !0
                    }]
                }
                return new Qe({
                    keys: n,
                    programId: this.programId,
                    data: t
                })
            }
            static assign(e) {
                let t, n;
                if ("basePubkey"in e) {
                    let o = qr.AssignWithSeed;
                    t = Ge(o, {
                        base: Ye(e.basePubkey.toBuffer()),
                        seed: e.seed,
                        programId: Ye(e.programId.toBuffer())
                    }),
                    n = [{
                        pubkey: e.accountPubkey,
                        isSigner: !1,
                        isWritable: !0
                    }, {
                        pubkey: e.basePubkey,
                        isSigner: !0,
                        isWritable: !1
                    }]
                } else {
                    let o = qr.Assign;
                    t = Ge(o, {
                        programId: Ye(e.programId.toBuffer())
                    }),
                    n = [{
                        pubkey: e.accountPubkey,
                        isSigner: !0,
                        isWritable: !0
                    }]
                }
                return new Qe({
                    keys: n,
                    programId: this.programId,
                    data: t
                })
            }
            static createAccountWithSeed(e) {
                let t = qr.CreateWithSeed
                  , n = Ge(t, {
                    base: Ye(e.basePubkey.toBuffer()),
                    seed: e.seed,
                    lamports: e.lamports,
                    space: e.space,
                    programId: Ye(e.programId.toBuffer())
                })
                  , o = [{
                    pubkey: e.fromPubkey,
                    isSigner: !0,
                    isWritable: !0
                }, {
                    pubkey: e.newAccountPubkey,
                    isSigner: !1,
                    isWritable: !0
                }];
                return e.basePubkey != e.fromPubkey && o.push({
                    pubkey: e.basePubkey,
                    isSigner: !0,
                    isWritable: !1
                }),
                new Qe({
                    keys: o,
                    programId: this.programId,
                    data: n
                })
            }
            static createNonceAccount(e) {
                let t = new tt;
                "basePubkey"in e && "seed"in e ? t.add(r.createAccountWithSeed({
                    fromPubkey: e.fromPubkey,
                    newAccountPubkey: e.noncePubkey,
                    basePubkey: e.basePubkey,
                    seed: e.seed,
                    lamports: e.lamports,
                    space: kA,
                    programId: this.programId
                })) : t.add(r.createAccount({
                    fromPubkey: e.fromPubkey,
                    newAccountPubkey: e.noncePubkey,
                    lamports: e.lamports,
                    space: kA,
                    programId: this.programId
                }));
                let n = {
                    noncePubkey: e.noncePubkey,
                    authorizedPubkey: e.authorizedPubkey
                };
                return t.add(this.nonceInitialize(n)),
                t
            }
            static nonceInitialize(e) {
                let t = qr.InitializeNonceAccount
                  , n = Ge(t, {
                    authorized: Ye(e.authorizedPubkey.toBuffer())
                })
                  , o = {
                    keys: [{
                        pubkey: e.noncePubkey,
                        isSigner: !1,
                        isWritable: !0
                    }, {
                        pubkey: ph,
                        isSigner: !1,
                        isWritable: !1
                    }, {
                        pubkey: Ia,
                        isSigner: !1,
                        isWritable: !1
                    }],
                    programId: this.programId,
                    data: n
                };
                return new Qe(o)
            }
            static nonceAdvance(e) {
                let t = qr.AdvanceNonceAccount
                  , n = Ge(t)
                  , o = {
                    keys: [{
                        pubkey: e.noncePubkey,
                        isSigner: !1,
                        isWritable: !0
                    }, {
                        pubkey: ph,
                        isSigner: !1,
                        isWritable: !1
                    }, {
                        pubkey: e.authorizedPubkey,
                        isSigner: !0,
                        isWritable: !1
                    }],
                    programId: this.programId,
                    data: n
                };
                return new Qe(o)
            }
            static nonceWithdraw(e) {
                let t = qr.WithdrawNonceAccount
                  , n = Ge(t, {
                    lamports: e.lamports
                });
                return new Qe({
                    keys: [{
                        pubkey: e.noncePubkey,
                        isSigner: !1,
                        isWritable: !0
                    }, {
                        pubkey: e.toPubkey,
                        isSigner: !1,
                        isWritable: !0
                    }, {
                        pubkey: ph,
                        isSigner: !1,
                        isWritable: !1
                    }, {
                        pubkey: Ia,
                        isSigner: !1,
                        isWritable: !1
                    }, {
                        pubkey: e.authorizedPubkey,
                        isSigner: !0,
                        isWritable: !1
                    }],
                    programId: this.programId,
                    data: n
                })
            }
            static nonceAuthorize(e) {
                let t = qr.AuthorizeNonceAccount
                  , n = Ge(t, {
                    authorized: Ye(e.newAuthorizedPubkey.toBuffer())
                });
                return new Qe({
                    keys: [{
                        pubkey: e.noncePubkey,
                        isSigner: !1,
                        isWritable: !0
                    }, {
                        pubkey: e.authorizedPubkey,
                        isSigner: !0,
                        isWritable: !1
                    }],
                    programId: this.programId,
                    data: n
                })
            }
            static allocate(e) {
                let t, n;
                if ("basePubkey"in e) {
                    let o = qr.AllocateWithSeed;
                    t = Ge(o, {
                        base: Ye(e.basePubkey.toBuffer()),
                        seed: e.seed,
                        space: e.space,
                        programId: Ye(e.programId.toBuffer())
                    }),
                    n = [{
                        pubkey: e.accountPubkey,
                        isSigner: !1,
                        isWritable: !0
                    }, {
                        pubkey: e.basePubkey,
                        isSigner: !0,
                        isWritable: !1
                    }]
                } else {
                    let o = qr.Allocate;
                    t = Ge(o, {
                        space: e.space
                    }),
                    n = [{
                        pubkey: e.accountPubkey,
                        isSigner: !0,
                        isWritable: !0
                    }]
                }
                return new Qe({
                    keys: n,
                    programId: this.programId,
                    data: t
                })
            }
        }
        ;
        br.programId = new Pe("11111111111111111111111111111111");
        bO = Es - 300,
        Sh = class r {
            constructor() {}
            static getMinNumSignatures(e) {
                return 2 * (Math.ceil(e / r.chunkSize) + 1 + 1)
            }
            static async load(e, t, n, o, s) {
                {
                    let E = await e.getMinimumBalanceForRentExemption(s.length)
                      , q = await e.getAccountInfo(n.publicKey, "confirmed")
                      , O = null;
                    if (q !== null) {
                        if (q.executable)
                            return console.error("Program load failed, account is already executable"),
                            !1;
                        q.data.length !== s.length && (O = O || new tt,
                        O.add(br.allocate({
                            accountPubkey: n.publicKey,
                            space: s.length
                        }))),
                        q.owner.equals(o) || (O = O || new tt,
                        O.add(br.assign({
                            accountPubkey: n.publicKey,
                            programId: o
                        }))),
                        q.lamports < E && (O = O || new tt,
                        O.add(br.transfer({
                            fromPubkey: t.publicKey,
                            toPubkey: n.publicKey,
                            lamports: E - q.lamports
                        })))
                    } else
                        O = new tt().add(br.createAccount({
                            fromPubkey: t.publicKey,
                            newAccountPubkey: n.publicKey,
                            lamports: E > 0 ? E : 1,
                            space: s.length,
                            programId: o
                        }));
                    O !== null && await lh(e, O, [t, n], {
                        commitment: "confirmed"
                    })
                }
                let i = L.struct([L.u32("instruction"), L.u32("offset"), L.u32("bytesLength"), L.u32("bytesLengthPadding"), L.seq(L.u8("byte"), L.offset(L.u32(), -8), "bytes")])
                  , u = r.chunkSize
                  , f = 0
                  , g = s
                  , b = [];
                for (; g.length > 0; ) {
                    let E = g.slice(0, u)
                      , q = Te.Buffer.alloc(u + 16);
                    i.encode({
                        instruction: 0,
                        offset: f,
                        bytes: E,
                        bytesLength: 0,
                        bytesLengthPadding: 0
                    }, q);
                    let O = new tt().add({
                        keys: [{
                            pubkey: n.publicKey,
                            isSigner: !0,
                            isWritable: !0
                        }],
                        programId: o,
                        data: q
                    });
                    b.push(lh(e, O, [t, n], {
                        commitment: "confirmed"
                    })),
                    e._rpcEndpoint.includes("solana.com") && await yO(1e3 / 4),
                    f += u,
                    g = g.slice(u)
                }
                await Promise.all(b);
                {
                    let E = L.struct([L.u32("instruction")])
                      , q = Te.Buffer.alloc(E.span);
                    E.encode({
                        instruction: 1
                    }, q);
                    let O = new tt().add({
                        keys: [{
                            pubkey: n.publicKey,
                            isSigner: !0,
                            isWritable: !0
                        }, {
                            pubkey: Ia,
                            isSigner: !1,
                            isWritable: !1
                        }],
                        programId: o,
                        data: q
                    });
                    await lh(e, O, [t, n], {
                        commitment: "confirmed"
                    })
                }
                return !0
            }
        }
        ;
        Sh.chunkSize = bO;
        RQ = new Pe("BPFLoader2111111111111111111111111111111111"),
        BQ = globalThis.fetch,
        SO = 160,
        vO = 64,
        EO = SO / vO,
        TQ = 1e3 / EO,
        PQ = {
            index: 1,
            layout: L.struct([L.u32("typeIndex"), wi("deactivationSlot"), L.nu64("lastExtendedSlot"), L.u8("lastExtendedStartIndex"), L.u8(), L.seq(De(), L.offset(L.u8(), -1), "authority")])
        },
        Wt = pi(su(Pe), pe(), r => new Pe(r)),
        qA = iu([pe(), qt("base64")]),
        Th = pi(su(Te.Buffer), qA, r => Te.Buffer.from(r[0], "base64")),
        zQ = 30 * 1e3;
        _O = UA(ui());
        AO = re({
            foundation: H(),
            foundationTerm: H(),
            initial: H(),
            taper: H(),
            terminal: H()
        }),
        MQ = Ot(xe(ye(re({
            epoch: H(),
            effectiveSlot: H(),
            amount: H(),
            postBalance: H(),
            commission: ke(ye(H()))
        })))),
        kO = re({
            total: H(),
            validator: H(),
            foundation: H(),
            epoch: H()
        }),
        IO = re({
            epoch: H(),
            slotIndex: H(),
            slotsInEpoch: H(),
            absoluteSlot: H(),
            blockHeight: ke(H()),
            transactionCount: ke(H())
        }),
        RO = re({
            slotsPerEpoch: H(),
            leaderScheduleSlotOffset: H(),
            warmup: yn(),
            firstNormalEpoch: H(),
            firstNormalSlot: H()
        }),
        BO = Od(pe(), xe(H())),
        As = ye(lr([re({}), pe()])),
        TO = re({
            err: As
        }),
        PO = qt("receivedSignature"),
        LQ = re({
            "solana-core": pe(),
            "feature-set": ke(H())
        }),
        NQ = Yr(re({
            err: ye(lr([re({}), pe()])),
            logs: ye(xe(pe())),
            accounts: ke(ye(xe(ye(re({
                executable: yn(),
                owner: pe(),
                lamports: H(),
                data: xe(pe()),
                rentEpoch: ke(H())
            }))))),
            unitsConsumed: ke(H()),
            returnData: ke(ye(re({
                programId: pe(),
                data: iu([pe(), qt("base64")])
            })))
        })),
        CQ = Yr(re({
            byIdentity: Od(pe(), xe(H())),
            range: re({
                firstSlot: H(),
                lastSlot: H()
            })
        })),
        OQ = Ot(AO),
        qQ = Ot(kO),
        UQ = Ot(IO),
        DQ = Ot(RO),
        FQ = Ot(BO),
        jQ = Ot(H()),
        HQ = Yr(re({
            total: H(),
            circulating: H(),
            nonCirculating: H(),
            nonCirculatingAccounts: xe(Wt)
        })),
        zO = re({
            amount: pe(),
            uiAmount: ye(H()),
            decimals: H(),
            uiAmountString: ke(pe())
        }),
        KQ = Yr(xe(re({
            address: Wt,
            amount: pe(),
            uiAmount: ye(H()),
            decimals: H(),
            uiAmountString: ke(pe())
        }))),
        WQ = Yr(xe(re({
            pubkey: Wt,
            account: re({
                executable: yn(),
                owner: Wt,
                lamports: H(),
                data: Th,
                rentEpoch: H()
            })
        }))),
        vh = re({
            program: pe(),
            parsed: ui(),
            space: H()
        }),
        VQ = Yr(xe(re({
            pubkey: Wt,
            account: re({
                executable: yn(),
                owner: Wt,
                lamports: H(),
                data: vh,
                rentEpoch: H()
            })
        }))),
        GQ = Yr(xe(re({
            lamports: H(),
            address: Wt
        }))),
        Ph = re({
            executable: yn(),
            owner: Wt,
            lamports: H(),
            data: Th,
            rentEpoch: H()
        }),
        ZQ = re({
            pubkey: Wt,
            account: Ph
        }),
        MO = pi(lr([su(Te.Buffer), vh]), lr([qA, vh]), r => Array.isArray(r) ? ci(r, Th) : r),
        LO = re({
            executable: yn(),
            owner: Wt,
            lamports: H(),
            data: MO,
            rentEpoch: H()
        }),
        YQ = re({
            pubkey: Wt,
            account: LO
        }),
        $Q = re({
            state: lr([qt("active"), qt("inactive"), qt("activating"), qt("deactivating")]),
            active: H(),
            inactive: H()
        }),
        JQ = Ot(xe(re({
            signature: pe(),
            slot: H(),
            err: As,
            memo: ye(pe()),
            blockTime: ke(ye(H()))
        }))),
        XQ = Ot(xe(re({
            signature: pe(),
            slot: H(),
            err: As,
            memo: ye(pe()),
            blockTime: ke(ye(H()))
        }))),
        QQ = re({
            subscription: H(),
            result: Ku(Ph)
        }),
        NO = re({
            pubkey: Wt,
            account: Ph
        }),
        eee = re({
            subscription: H(),
            result: Ku(NO)
        }),
        CO = re({
            parent: H(),
            slot: H(),
            root: H()
        }),
        tee = re({
            subscription: H(),
            result: CO
        }),
        OO = lr([re({
            type: lr([qt("firstShredReceived"), qt("completed"), qt("optimisticConfirmation"), qt("root")]),
            slot: H(),
            timestamp: H()
        }), re({
            type: qt("createdBank"),
            parent: H(),
            slot: H(),
            timestamp: H()
        }), re({
            type: qt("frozen"),
            slot: H(),
            timestamp: H(),
            stats: re({
                numTransactionEntries: H(),
                numSuccessfulTransactions: H(),
                numFailedTransactions: H(),
                maxTransactionsPerEntry: H()
            })
        }), re({
            type: qt("dead"),
            slot: H(),
            timestamp: H(),
            err: pe()
        })]),
        ree = re({
            subscription: H(),
            result: OO
        }),
        nee = re({
            subscription: H(),
            result: Ku(lr([TO, PO]))
        }),
        oee = re({
            subscription: H(),
            result: H()
        }),
        see = re({
            pubkey: pe(),
            gossip: ye(pe()),
            tpu: ye(pe()),
            rpc: ye(pe()),
            version: ye(pe())
        }),
        IA = re({
            votePubkey: pe(),
            nodePubkey: pe(),
            activatedStake: H(),
            epochVoteAccount: yn(),
            epochCredits: xe(iu([H(), H(), H()])),
            commission: H(),
            lastVote: H(),
            rootSlot: ye(H())
        }),
        iee = Ot(re({
            current: xe(IA),
            delinquent: xe(IA)
        })),
        qO = lr([qt("processed"), qt("confirmed"), qt("finalized")]),
        UO = re({
            slot: H(),
            confirmations: ye(H()),
            err: As,
            confirmationStatus: ke(qO)
        }),
        aee = Yr(xe(ye(UO))),
        cee = Ot(H()),
        DA = re({
            accountKey: Wt,
            writableIndexes: xe(H()),
            readonlyIndexes: xe(H())
        }),
        zh = re({
            signatures: xe(pe()),
            message: re({
                accountKeys: xe(pe()),
                header: re({
                    numRequiredSignatures: H(),
                    numReadonlySignedAccounts: H(),
                    numReadonlyUnsignedAccounts: H()
                }),
                instructions: xe(re({
                    accounts: xe(H()),
                    data: pe(),
                    programIdIndex: H()
                })),
                recentBlockhash: pe(),
                addressTableLookups: ke(xe(DA))
            })
        }),
        FA = re({
            pubkey: Wt,
            signer: yn(),
            writable: yn(),
            source: ke(lr([qt("transaction"), qt("lookupTable")]))
        }),
        jA = re({
            accountKeys: xe(FA),
            signatures: xe(pe())
        }),
        HA = re({
            parsed: ui(),
            program: pe(),
            programId: Wt
        }),
        KA = re({
            accounts: xe(Wt),
            data: pe(),
            programId: Wt
        }),
        DO = lr([KA, HA]),
        FO = lr([re({
            parsed: ui(),
            program: pe(),
            programId: pe()
        }), re({
            accounts: xe(pe()),
            data: pe(),
            programId: pe()
        })]),
        WA = pi(DO, FO, r => "accounts"in r ? ci(r, KA) : ci(r, HA)),
        VA = re({
            signatures: xe(pe()),
            message: re({
                accountKeys: xe(FA),
                instructions: xe(WA),
                recentBlockhash: pe(),
                addressTableLookups: ke(ye(xe(DA)))
            })
        }),
        Du = re({
            accountIndex: H(),
            mint: pe(),
            owner: ke(pe()),
            uiTokenAmount: zO
        }),
        GA = re({
            writable: xe(Wt),
            readonly: xe(Wt)
        }),
        Wu = re({
            err: As,
            fee: H(),
            innerInstructions: ke(ye(xe(re({
                index: H(),
                instructions: xe(re({
                    accounts: xe(H()),
                    data: pe(),
                    programIdIndex: H()
                }))
            })))),
            preBalances: xe(H()),
            postBalances: xe(H()),
            logMessages: ke(ye(xe(pe()))),
            preTokenBalances: ke(ye(xe(Du))),
            postTokenBalances: ke(ye(xe(Du))),
            loadedAddresses: ke(GA),
            computeUnitsConsumed: ke(H())
        }),
        Mh = re({
            err: As,
            fee: H(),
            innerInstructions: ke(ye(xe(re({
                index: H(),
                instructions: xe(WA)
            })))),
            preBalances: xe(H()),
            postBalances: xe(H()),
            logMessages: ke(ye(xe(pe()))),
            preTokenBalances: ke(ye(xe(Du))),
            postTokenBalances: ke(ye(xe(Du))),
            loadedAddresses: ke(GA),
            computeUnitsConsumed: ke(H())
        }),
        Si = lr([qt(0), qt("legacy")]),
        ks = re({
            pubkey: pe(),
            lamports: H(),
            postBalance: ye(H()),
            rewardType: ye(pe()),
            commission: ke(ye(H()))
        }),
        uee = Ot(ye(re({
            blockhash: pe(),
            previousBlockhash: pe(),
            parentSlot: H(),
            transactions: xe(re({
                transaction: zh,
                meta: ye(Wu),
                version: ke(Si)
            })),
            rewards: ke(xe(ks)),
            blockTime: ye(H()),
            blockHeight: ye(H())
        }))),
        pee = Ot(ye(re({
            blockhash: pe(),
            previousBlockhash: pe(),
            parentSlot: H(),
            rewards: ke(xe(ks)),
            blockTime: ye(H()),
            blockHeight: ye(H())
        }))),
        fee = Ot(ye(re({
            blockhash: pe(),
            previousBlockhash: pe(),
            parentSlot: H(),
            transactions: xe(re({
                transaction: jA,
                meta: ye(Wu),
                version: ke(Si)
            })),
            rewards: ke(xe(ks)),
            blockTime: ye(H()),
            blockHeight: ye(H())
        }))),
        lee = Ot(ye(re({
            blockhash: pe(),
            previousBlockhash: pe(),
            parentSlot: H(),
            transactions: xe(re({
                transaction: VA,
                meta: ye(Mh),
                version: ke(Si)
            })),
            rewards: ke(xe(ks)),
            blockTime: ye(H()),
            blockHeight: ye(H())
        }))),
        dee = Ot(ye(re({
            blockhash: pe(),
            previousBlockhash: pe(),
            parentSlot: H(),
            transactions: xe(re({
                transaction: jA,
                meta: ye(Mh),
                version: ke(Si)
            })),
            rewards: ke(xe(ks)),
            blockTime: ye(H()),
            blockHeight: ye(H())
        }))),
        hee = Ot(ye(re({
            blockhash: pe(),
            previousBlockhash: pe(),
            parentSlot: H(),
            rewards: ke(xe(ks)),
            blockTime: ye(H()),
            blockHeight: ye(H())
        }))),
        yee = Ot(ye(re({
            blockhash: pe(),
            previousBlockhash: pe(),
            parentSlot: H(),
            transactions: xe(re({
                transaction: zh,
                meta: ye(Wu)
            })),
            rewards: ke(xe(ks)),
            blockTime: ye(H())
        }))),
        mee = Ot(ye(re({
            blockhash: pe(),
            previousBlockhash: pe(),
            parentSlot: H(),
            signatures: xe(pe()),
            blockTime: ye(H())
        }))),
        gee = Ot(ye(re({
            slot: H(),
            meta: Wu,
            blockTime: ke(ye(H())),
            transaction: zh,
            version: ke(Si)
        }))),
        xee = Ot(ye(re({
            slot: H(),
            transaction: VA,
            meta: ye(Mh),
            blockTime: ke(ye(H())),
            version: ke(Si)
        }))),
        wee = Yr(re({
            blockhash: pe(),
            feeCalculator: re({
                lamportsPerSignature: H()
            })
        })),
        bee = Yr(re({
            blockhash: pe(),
            lastValidBlockHeight: H()
        })),
        jO = re({
            slot: H(),
            numTransactions: H(),
            numSlots: H(),
            samplePeriodSecs: H()
        }),
        See = Ot(xe(jO)),
        vee = Yr(ye(re({
            feeCalculator: re({
                lamportsPerSignature: H()
            })
        }))),
        Eee = Ot(pe()),
        _ee = Ot(pe()),
        HO = re({
            err: As,
            logs: xe(pe()),
            signature: pe()
        }),
        Aee = re({
            result: Ku(HO),
            subscription: H()
        }),
        Eh = class r {
            constructor(e) {
                this._keypair = void 0,
                this._keypair = e ?? vA()
            }
            static generate() {
                return new r(vA())
            }
            static fromSecretKey(e, t) {
                if (e.byteLength !== 64)
                    throw new Error("bad secret key size");
                let n = e.slice(32, 64);
                if (!t || !t.skipValidation) {
                    let o = e.slice(0, 32)
                      , s = mh(o);
                    for (let i = 0; i < 32; i++)
                        if (n[i] !== s[i])
                            throw new Error("provided secretKey is invalid")
                }
                return new r({
                    publicKey: n,
                    secretKey: e
                })
            }
            static fromSeed(e) {
                let t = mh(e)
                  , n = new Uint8Array(64);
                return n.set(e),
                n.set(t, 32),
                new r({
                    publicKey: t,
                    secretKey: n
                })
            }
            get publicKey() {
                return new Pe(this._keypair.publicKey)
            }
            get secretKey() {
                return new Uint8Array(this._keypair.secretKey)
            }
        }
        ,
        ka = Object.freeze({
            CreateLookupTable: {
                index: 0,
                layout: L.struct([L.u32("instruction"), wi("recentSlot"), L.u8("bumpSeed")])
            },
            FreezeLookupTable: {
                index: 1,
                layout: L.struct([L.u32("instruction")])
            },
            ExtendLookupTable: {
                index: 2,
                layout: L.struct([L.u32("instruction"), wi(), L.seq(De(), L.offset(L.u32(), -8), "addresses")])
            },
            DeactivateLookupTable: {
                index: 3,
                layout: L.struct([L.u32("instruction")])
            },
            CloseLookupTable: {
                index: 4,
                layout: L.struct([L.u32("instruction")])
            }
        }),
        _h = class {
            constructor() {}
            static createLookupTable(e) {
                let[t,n] = Pe.findProgramAddressSync([e.authority.toBuffer(), (0,
                Ba.toBufferLE)(BigInt(e.recentSlot), 8)], this.programId)
                  , o = ka.CreateLookupTable
                  , s = Ge(o, {
                    recentSlot: BigInt(e.recentSlot),
                    bumpSeed: n
                })
                  , i = [{
                    pubkey: t,
                    isSigner: !1,
                    isWritable: !0
                }, {
                    pubkey: e.authority,
                    isSigner: !0,
                    isWritable: !1
                }, {
                    pubkey: e.payer,
                    isSigner: !0,
                    isWritable: !0
                }, {
                    pubkey: br.programId,
                    isSigner: !1,
                    isWritable: !1
                }];
                return [new Qe({
                    programId: this.programId,
                    keys: i,
                    data: s
                }), t]
            }
            static freezeLookupTable(e) {
                let t = ka.FreezeLookupTable
                  , n = Ge(t)
                  , o = [{
                    pubkey: e.lookupTable,
                    isSigner: !1,
                    isWritable: !0
                }, {
                    pubkey: e.authority,
                    isSigner: !0,
                    isWritable: !1
                }];
                return new Qe({
                    programId: this.programId,
                    keys: o,
                    data: n
                })
            }
            static extendLookupTable(e) {
                let t = ka.ExtendLookupTable
                  , n = Ge(t, {
                    addresses: e.addresses.map(s => s.toBytes())
                })
                  , o = [{
                    pubkey: e.lookupTable,
                    isSigner: !1,
                    isWritable: !0
                }, {
                    pubkey: e.authority,
                    isSigner: !0,
                    isWritable: !1
                }];
                return e.payer && o.push({
                    pubkey: e.payer,
                    isSigner: !0,
                    isWritable: !0
                }, {
                    pubkey: br.programId,
                    isSigner: !1,
                    isWritable: !1
                }),
                new Qe({
                    programId: this.programId,
                    keys: o,
                    data: n
                })
            }
            static deactivateLookupTable(e) {
                let t = ka.DeactivateLookupTable
                  , n = Ge(t)
                  , o = [{
                    pubkey: e.lookupTable,
                    isSigner: !1,
                    isWritable: !0
                }, {
                    pubkey: e.authority,
                    isSigner: !0,
                    isWritable: !1
                }];
                return new Qe({
                    programId: this.programId,
                    keys: o,
                    data: n
                })
            }
            static closeLookupTable(e) {
                let t = ka.CloseLookupTable
                  , n = Ge(t)
                  , o = [{
                    pubkey: e.lookupTable,
                    isSigner: !1,
                    isWritable: !0
                }, {
                    pubkey: e.authority,
                    isSigner: !0,
                    isWritable: !1
                }, {
                    pubkey: e.recipient,
                    isSigner: !1,
                    isWritable: !0
                }];
                return new Qe({
                    programId: this.programId,
                    keys: o,
                    data: n
                })
            }
        }
        ;
        _h.programId = new Pe("AddressLookupTab1e1111111111111111111111111");
        Lu = Object.freeze({
            RequestUnits: {
                index: 0,
                layout: L.struct([L.u8("instruction"), L.u32("units"), L.u32("additionalFee")])
            },
            RequestHeapFrame: {
                index: 1,
                layout: L.struct([L.u8("instruction"), L.u32("bytes")])
            },
            SetComputeUnitLimit: {
                index: 2,
                layout: L.struct([L.u8("instruction"), L.u32("units")])
            },
            SetComputeUnitPrice: {
                index: 3,
                layout: L.struct([L.u8("instruction"), wi("microLamports")])
            }
        }),
        Ah = class {
            constructor() {}
            static requestUnits(e) {
                let t = Lu.RequestUnits
                  , n = Ge(t, e);
                return new Qe({
                    keys: [],
                    programId: this.programId,
                    data: n
                })
            }
            static requestHeapFrame(e) {
                let t = Lu.RequestHeapFrame
                  , n = Ge(t, e);
                return new Qe({
                    keys: [],
                    programId: this.programId,
                    data: n
                })
            }
            static setComputeUnitLimit(e) {
                let t = Lu.SetComputeUnitLimit
                  , n = Ge(t, e);
                return new Qe({
                    keys: [],
                    programId: this.programId,
                    data: n
                })
            }
            static setComputeUnitPrice(e) {
                let t = Lu.SetComputeUnitPrice
                  , n = Ge(t, {
                    microLamports: BigInt(e.microLamports)
                });
                return new Qe({
                    keys: [],
                    programId: this.programId,
                    data: n
                })
            }
        }
        ;
        Ah.programId = new Pe("ComputeBudget111111111111111111111111111111");
        RA = 64,
        BA = 32,
        TA = 64,
        PA = L.struct([L.u8("numSignatures"), L.u8("padding"), L.u16("signatureOffset"), L.u16("signatureInstructionIndex"), L.u16("publicKeyOffset"), L.u16("publicKeyInstructionIndex"), L.u16("messageDataOffset"), L.u16("messageDataSize"), L.u16("messageInstructionIndex")]),
        kh = class r {
            constructor() {}
            static createInstructionWithPublicKey(e) {
                let {publicKey: t, message: n, signature: o, instructionIndex: s} = e;
                Ct(t.length === BA, `Public Key must be ${BA} bytes but received ${t.length} bytes`),
                Ct(o.length === TA, `Signature must be ${TA} bytes but received ${o.length} bytes`);
                let i = PA.span
                  , u = i + t.length
                  , f = u + o.length
                  , g = 1
                  , b = Te.Buffer.alloc(f + n.length)
                  , E = s ?? 65535;
                return PA.encode({
                    numSignatures: g,
                    padding: 0,
                    signatureOffset: u,
                    signatureInstructionIndex: E,
                    publicKeyOffset: i,
                    publicKeyInstructionIndex: E,
                    messageDataOffset: f,
                    messageDataSize: n.length,
                    messageInstructionIndex: E
                }, b),
                b.fill(t, i),
                b.fill(o, u),
                b.fill(n, f),
                new Qe({
                    keys: [],
                    programId: r.programId,
                    data: b
                })
            }
            static createInstructionWithPrivateKey(e) {
                let {privateKey: t, message: n, instructionIndex: o} = e;
                Ct(t.length === RA, `Private key must be ${RA} bytes but received ${t.length} bytes`);
                try {
                    let s = Eh.fromSecretKey(t)
                      , i = s.publicKey.toBytes()
                      , u = Rh(n, s.secretKey);
                    return this.createInstructionWithPublicKey({
                        publicKey: i,
                        message: n,
                        signature: u,
                        instructionIndex: o
                    })
                } catch (s) {
                    throw new Error(`Error creating instruction; ${s}`)
                }
            }
        }
        ;
        kh.programId = new Pe("Ed25519SigVerify111111111111111111111111111");
        mn.hmacSha256Sync = (r, ...e) => {
            let t = sh.create(Jc, r);
            return e.forEach(n => t.update(n)),
            t.digest()
        }
        ;
        KO = (r, e) => bA(r, e, {
            der: !1,
            recovered: !0
        });
        mn.isValidPrivateKey;
        WO = gA,
        zA = 32,
        dh = 20,
        MA = 64,
        VO = 11,
        hh = L.struct([L.u8("numSignatures"), L.u16("signatureOffset"), L.u8("signatureInstructionIndex"), L.u16("ethAddressOffset"), L.u8("ethAddressInstructionIndex"), L.u16("messageDataOffset"), L.u16("messageDataSize"), L.u8("messageInstructionIndex"), L.blob(20, "ethAddress"), L.blob(64, "signature"), L.u8("recoveryId")]),
        Ih = class r {
            constructor() {}
            static publicKeyToEthAddress(e) {
                Ct(e.length === MA, `Public key must be ${MA} bytes but received ${e.length} bytes`);
                try {
                    return Te.Buffer.from(oh(Ye(e))).slice(-dh)
                } catch (t) {
                    throw new Error(`Error constructing Ethereum address: ${t}`)
                }
            }
            static createInstructionWithPublicKey(e) {
                let {publicKey: t, message: n, signature: o, recoveryId: s, instructionIndex: i} = e;
                return r.createInstructionWithEthAddress({
                    ethAddress: r.publicKeyToEthAddress(t),
                    message: n,
                    signature: o,
                    recoveryId: s,
                    instructionIndex: i
                })
            }
            static createInstructionWithEthAddress(e) {
                let {ethAddress: t, message: n, signature: o, recoveryId: s, instructionIndex: i=0} = e, u;
                typeof t == "string" ? t.startsWith("0x") ? u = Te.Buffer.from(t.substr(2), "hex") : u = Te.Buffer.from(t, "hex") : u = t,
                Ct(u.length === dh, `Address must be ${dh} bytes but received ${u.length} bytes`);
                let f = 1 + VO
                  , g = f
                  , b = f + u.length
                  , E = b + o.length + 1
                  , q = 1
                  , O = Te.Buffer.alloc(hh.span + n.length);
                return hh.encode({
                    numSignatures: q,
                    signatureOffset: b,
                    signatureInstructionIndex: i,
                    ethAddressOffset: g,
                    ethAddressInstructionIndex: i,
                    messageDataOffset: E,
                    messageDataSize: n.length,
                    messageInstructionIndex: i,
                    signature: Ye(o),
                    ethAddress: Ye(u),
                    recoveryId: s
                }, O),
                O.fill(Ye(n), hh.span),
                new Qe({
                    keys: [],
                    programId: r.programId,
                    data: O
                })
            }
            static createInstructionWithPrivateKey(e) {
                let {privateKey: t, message: n, instructionIndex: o} = e;
                Ct(t.length === zA, `Private key must be ${zA} bytes but received ${t.length} bytes`);
                try {
                    let s = Ye(t)
                      , i = WO(s, !1).slice(1)
                      , u = Te.Buffer.from(oh(Ye(n)))
                      , [f,g] = KO(u, s);
                    return this.createInstructionWithPublicKey({
                        publicKey: i,
                        message: n,
                        signature: f,
                        recoveryId: g,
                        instructionIndex: o
                    })
                } catch (s) {
                    throw new Error(`Error creating instruction; ${s}`)
                }
            }
        }
        ;
        Ih.programId = new Pe("KeccakSecp256k11111111111111111111111111111");
        GO = new Pe("StakeConfig11111111111111111111111111111111"),
        Ra = class {
            constructor(e, t, n) {
                this.unixTimestamp = void 0,
                this.epoch = void 0,
                this.custodian = void 0,
                this.unixTimestamp = e,
                this.epoch = t,
                this.custodian = n
            }
        }
        ;
        Ra.default = new Ra(0,0,Pe.default);
        Eo = Object.freeze({
            Initialize: {
                index: 0,
                layout: L.struct([L.u32("instruction"), pO(), fO()])
            },
            Authorize: {
                index: 1,
                layout: L.struct([L.u32("instruction"), De("newAuthorized"), L.u32("stakeAuthorizationType")])
            },
            Delegate: {
                index: 2,
                layout: L.struct([L.u32("instruction")])
            },
            Split: {
                index: 3,
                layout: L.struct([L.u32("instruction"), L.ns64("lamports")])
            },
            Withdraw: {
                index: 4,
                layout: L.struct([L.u32("instruction"), L.ns64("lamports")])
            },
            Deactivate: {
                index: 5,
                layout: L.struct([L.u32("instruction")])
            },
            Merge: {
                index: 7,
                layout: L.struct([L.u32("instruction")])
            },
            AuthorizeWithSeed: {
                index: 8,
                layout: L.struct([L.u32("instruction"), De("newAuthorized"), L.u32("stakeAuthorizationType"), gi("authoritySeed"), De("authorityOwner")])
            }
        }),
        kee = Object.freeze({
            Staker: {
                index: 0
            },
            Withdrawer: {
                index: 1
            }
        }),
        Fu = class {
            constructor() {}
            static initialize(e) {
                let {stakePubkey: t, authorized: n, lockup: o} = e
                  , s = o || Ra.default
                  , i = Eo.Initialize
                  , u = Ge(i, {
                    authorized: {
                        staker: Ye(n.staker.toBuffer()),
                        withdrawer: Ye(n.withdrawer.toBuffer())
                    },
                    lockup: {
                        unixTimestamp: s.unixTimestamp,
                        epoch: s.epoch,
                        custodian: Ye(s.custodian.toBuffer())
                    }
                })
                  , f = {
                    keys: [{
                        pubkey: t,
                        isSigner: !1,
                        isWritable: !0
                    }, {
                        pubkey: Ia,
                        isSigner: !1,
                        isWritable: !1
                    }],
                    programId: this.programId,
                    data: u
                };
                return new Qe(f)
            }
            static createAccountWithSeed(e) {
                let t = new tt;
                t.add(br.createAccountWithSeed({
                    fromPubkey: e.fromPubkey,
                    newAccountPubkey: e.stakePubkey,
                    basePubkey: e.basePubkey,
                    seed: e.seed,
                    lamports: e.lamports,
                    space: this.space,
                    programId: this.programId
                }));
                let {stakePubkey: n, authorized: o, lockup: s} = e;
                return t.add(this.initialize({
                    stakePubkey: n,
                    authorized: o,
                    lockup: s
                }))
            }
            static createAccount(e) {
                let t = new tt;
                t.add(br.createAccount({
                    fromPubkey: e.fromPubkey,
                    newAccountPubkey: e.stakePubkey,
                    lamports: e.lamports,
                    space: this.space,
                    programId: this.programId
                }));
                let {stakePubkey: n, authorized: o, lockup: s} = e;
                return t.add(this.initialize({
                    stakePubkey: n,
                    authorized: o,
                    lockup: s
                }))
            }
            static delegate(e) {
                let {stakePubkey: t, authorizedPubkey: n, votePubkey: o} = e
                  , s = Eo.Delegate
                  , i = Ge(s);
                return new tt().add({
                    keys: [{
                        pubkey: t,
                        isSigner: !1,
                        isWritable: !0
                    }, {
                        pubkey: o,
                        isSigner: !1,
                        isWritable: !1
                    }, {
                        pubkey: qn,
                        isSigner: !1,
                        isWritable: !1
                    }, {
                        pubkey: fh,
                        isSigner: !1,
                        isWritable: !1
                    }, {
                        pubkey: GO,
                        isSigner: !1,
                        isWritable: !1
                    }, {
                        pubkey: n,
                        isSigner: !0,
                        isWritable: !1
                    }],
                    programId: this.programId,
                    data: i
                })
            }
            static authorize(e) {
                let {stakePubkey: t, authorizedPubkey: n, newAuthorizedPubkey: o, stakeAuthorizationType: s, custodianPubkey: i} = e
                  , u = Eo.Authorize
                  , f = Ge(u, {
                    newAuthorized: Ye(o.toBuffer()),
                    stakeAuthorizationType: s.index
                })
                  , g = [{
                    pubkey: t,
                    isSigner: !1,
                    isWritable: !0
                }, {
                    pubkey: qn,
                    isSigner: !1,
                    isWritable: !0
                }, {
                    pubkey: n,
                    isSigner: !0,
                    isWritable: !1
                }];
                return i && g.push({
                    pubkey: i,
                    isSigner: !1,
                    isWritable: !1
                }),
                new tt().add({
                    keys: g,
                    programId: this.programId,
                    data: f
                })
            }
            static authorizeWithSeed(e) {
                let {stakePubkey: t, authorityBase: n, authoritySeed: o, authorityOwner: s, newAuthorizedPubkey: i, stakeAuthorizationType: u, custodianPubkey: f} = e
                  , g = Eo.AuthorizeWithSeed
                  , b = Ge(g, {
                    newAuthorized: Ye(i.toBuffer()),
                    stakeAuthorizationType: u.index,
                    authoritySeed: o,
                    authorityOwner: Ye(s.toBuffer())
                })
                  , E = [{
                    pubkey: t,
                    isSigner: !1,
                    isWritable: !0
                }, {
                    pubkey: n,
                    isSigner: !0,
                    isWritable: !1
                }, {
                    pubkey: qn,
                    isSigner: !1,
                    isWritable: !1
                }];
                return f && E.push({
                    pubkey: f,
                    isSigner: !1,
                    isWritable: !1
                }),
                new tt().add({
                    keys: E,
                    programId: this.programId,
                    data: b
                })
            }
            static splitInstruction(e) {
                let {stakePubkey: t, authorizedPubkey: n, splitStakePubkey: o, lamports: s} = e
                  , i = Eo.Split
                  , u = Ge(i, {
                    lamports: s
                });
                return new Qe({
                    keys: [{
                        pubkey: t,
                        isSigner: !1,
                        isWritable: !0
                    }, {
                        pubkey: o,
                        isSigner: !1,
                        isWritable: !0
                    }, {
                        pubkey: n,
                        isSigner: !0,
                        isWritable: !1
                    }],
                    programId: this.programId,
                    data: u
                })
            }
            static split(e) {
                let t = new tt;
                return t.add(br.createAccount({
                    fromPubkey: e.authorizedPubkey,
                    newAccountPubkey: e.splitStakePubkey,
                    lamports: 0,
                    space: this.space,
                    programId: this.programId
                })),
                t.add(this.splitInstruction(e))
            }
            static splitWithSeed(e) {
                let {stakePubkey: t, authorizedPubkey: n, splitStakePubkey: o, basePubkey: s, seed: i, lamports: u} = e
                  , f = new tt;
                return f.add(br.allocate({
                    accountPubkey: o,
                    basePubkey: s,
                    seed: i,
                    space: this.space,
                    programId: this.programId
                })),
                f.add(this.splitInstruction({
                    stakePubkey: t,
                    authorizedPubkey: n,
                    splitStakePubkey: o,
                    lamports: u
                }))
            }
            static merge(e) {
                let {stakePubkey: t, sourceStakePubKey: n, authorizedPubkey: o} = e
                  , s = Eo.Merge
                  , i = Ge(s);
                return new tt().add({
                    keys: [{
                        pubkey: t,
                        isSigner: !1,
                        isWritable: !0
                    }, {
                        pubkey: n,
                        isSigner: !1,
                        isWritable: !0
                    }, {
                        pubkey: qn,
                        isSigner: !1,
                        isWritable: !1
                    }, {
                        pubkey: fh,
                        isSigner: !1,
                        isWritable: !1
                    }, {
                        pubkey: o,
                        isSigner: !0,
                        isWritable: !1
                    }],
                    programId: this.programId,
                    data: i
                })
            }
            static withdraw(e) {
                let {stakePubkey: t, authorizedPubkey: n, toPubkey: o, lamports: s, custodianPubkey: i} = e
                  , u = Eo.Withdraw
                  , f = Ge(u, {
                    lamports: s
                })
                  , g = [{
                    pubkey: t,
                    isSigner: !1,
                    isWritable: !0
                }, {
                    pubkey: o,
                    isSigner: !1,
                    isWritable: !0
                }, {
                    pubkey: qn,
                    isSigner: !1,
                    isWritable: !1
                }, {
                    pubkey: fh,
                    isSigner: !1,
                    isWritable: !1
                }, {
                    pubkey: n,
                    isSigner: !0,
                    isWritable: !1
                }];
                return i && g.push({
                    pubkey: i,
                    isSigner: !1,
                    isWritable: !1
                }),
                new tt().add({
                    keys: g,
                    programId: this.programId,
                    data: f
                })
            }
            static deactivate(e) {
                let {stakePubkey: t, authorizedPubkey: n} = e
                  , o = Eo.Deactivate
                  , s = Ge(o);
                return new tt().add({
                    keys: [{
                        pubkey: t,
                        isSigner: !1,
                        isWritable: !0
                    }, {
                        pubkey: qn,
                        isSigner: !1,
                        isWritable: !1
                    }, {
                        pubkey: n,
                        isSigner: !0,
                        isWritable: !1
                    }],
                    programId: this.programId,
                    data: s
                })
            }
        }
        ;
        Fu.programId = new Pe("Stake11111111111111111111111111111111111111");
        Fu.space = 200;
        Nu = Object.freeze({
            InitializeAccount: {
                index: 0,
                layout: L.struct([L.u32("instruction"), lO()])
            },
            Authorize: {
                index: 1,
                layout: L.struct([L.u32("instruction"), De("newAuthorized"), L.u32("voteAuthorizationType")])
            },
            Withdraw: {
                index: 3,
                layout: L.struct([L.u32("instruction"), L.ns64("lamports")])
            },
            AuthorizeWithSeed: {
                index: 10,
                layout: L.struct([L.u32("instruction"), dO()])
            }
        }),
        Iee = Object.freeze({
            Voter: {
                index: 0
            },
            Withdrawer: {
                index: 1
            }
        }),
        ju = class r {
            constructor() {}
            static initializeAccount(e) {
                let {votePubkey: t, nodePubkey: n, voteInit: o} = e
                  , s = Nu.InitializeAccount
                  , i = Ge(s, {
                    voteInit: {
                        nodePubkey: Ye(o.nodePubkey.toBuffer()),
                        authorizedVoter: Ye(o.authorizedVoter.toBuffer()),
                        authorizedWithdrawer: Ye(o.authorizedWithdrawer.toBuffer()),
                        commission: o.commission
                    }
                })
                  , u = {
                    keys: [{
                        pubkey: t,
                        isSigner: !1,
                        isWritable: !0
                    }, {
                        pubkey: Ia,
                        isSigner: !1,
                        isWritable: !1
                    }, {
                        pubkey: qn,
                        isSigner: !1,
                        isWritable: !1
                    }, {
                        pubkey: n,
                        isSigner: !0,
                        isWritable: !1
                    }],
                    programId: this.programId,
                    data: i
                };
                return new Qe(u)
            }
            static createAccount(e) {
                let t = new tt;
                return t.add(br.createAccount({
                    fromPubkey: e.fromPubkey,
                    newAccountPubkey: e.votePubkey,
                    lamports: e.lamports,
                    space: this.space,
                    programId: this.programId
                })),
                t.add(this.initializeAccount({
                    votePubkey: e.votePubkey,
                    nodePubkey: e.voteInit.nodePubkey,
                    voteInit: e.voteInit
                }))
            }
            static authorize(e) {
                let {votePubkey: t, authorizedPubkey: n, newAuthorizedPubkey: o, voteAuthorizationType: s} = e
                  , i = Nu.Authorize
                  , u = Ge(i, {
                    newAuthorized: Ye(o.toBuffer()),
                    voteAuthorizationType: s.index
                })
                  , f = [{
                    pubkey: t,
                    isSigner: !1,
                    isWritable: !0
                }, {
                    pubkey: qn,
                    isSigner: !1,
                    isWritable: !1
                }, {
                    pubkey: n,
                    isSigner: !0,
                    isWritable: !1
                }];
                return new tt().add({
                    keys: f,
                    programId: this.programId,
                    data: u
                })
            }
            static authorizeWithSeed(e) {
                let {currentAuthorityDerivedKeyBasePubkey: t, currentAuthorityDerivedKeyOwnerPubkey: n, currentAuthorityDerivedKeySeed: o, newAuthorizedPubkey: s, voteAuthorizationType: i, votePubkey: u} = e
                  , f = Nu.AuthorizeWithSeed
                  , g = Ge(f, {
                    voteAuthorizeWithSeedArgs: {
                        currentAuthorityDerivedKeyOwnerPubkey: Ye(n.toBuffer()),
                        currentAuthorityDerivedKeySeed: o,
                        newAuthorized: Ye(s.toBuffer()),
                        voteAuthorizationType: i.index
                    }
                })
                  , b = [{
                    pubkey: u,
                    isSigner: !1,
                    isWritable: !0
                }, {
                    pubkey: qn,
                    isSigner: !1,
                    isWritable: !1
                }, {
                    pubkey: t,
                    isSigner: !0,
                    isWritable: !1
                }];
                return new tt().add({
                    keys: b,
                    programId: this.programId,
                    data: g
                })
            }
            static withdraw(e) {
                let {votePubkey: t, authorizedWithdrawerPubkey: n, lamports: o, toPubkey: s} = e
                  , i = Nu.Withdraw
                  , u = Ge(i, {
                    lamports: o
                })
                  , f = [{
                    pubkey: t,
                    isSigner: !1,
                    isWritable: !0
                }, {
                    pubkey: s,
                    isSigner: !1,
                    isWritable: !0
                }, {
                    pubkey: n,
                    isSigner: !0,
                    isWritable: !1
                }];
                return new tt().add({
                    keys: f,
                    programId: this.programId,
                    data: u
                })
            }
            static safeWithdraw(e, t, n) {
                if (e.lamports > t - n)
                    throw new Error("Withdraw will leave vote account with insuffcient funds.");
                return r.withdraw(e)
            }
        }
        ;
        ju.programId = new Pe("Vote111111111111111111111111111111111111111");
        ju.space = 3731;
        Ree = new Pe("Va1idator1nfo111111111111111111111111111111"),
        Bee = re({
            name: pe(),
            website: ke(pe()),
            details: ke(pe()),
            keybaseUsername: ke(pe())
        }),
        Tee = new Pe("Vote111111111111111111111111111111111111111"),
        Pee = L.struct([De("nodePubkey"), De("authorizedWithdrawer"), L.u8("commission"), L.nu64(), L.seq(L.struct([L.nu64("slot"), L.u32("confirmationCount")]), L.offset(L.u32(), -8), "votes"), L.u8("rootSlotValid"), L.nu64("rootSlot"), L.nu64(), L.seq(L.struct([L.nu64("epoch"), De("authorizedVoter")]), L.offset(L.u32(), -8), "authorizedVoters"), L.struct([L.seq(L.struct([De("authorizedPubkey"), L.nu64("epochOfLastAuthorizedSwitch"), L.nu64("targetEpoch")]), 32, "buf"), L.nu64("idx"), L.u8("isEmpty")], "priorVoters"), L.nu64(), L.seq(L.struct([L.nu64("epoch"), L.nu64("credits"), L.nu64("prevCredits")]), L.offset(L.u32(), -8), "epochCredits"), L.struct([L.nu64("slot"), L.nu64("timestamp")], "lastTimestamp")])
    }
    );
    var ZA, YA, Gu, ZO, Zu, YO, Nee, Cee, Oee, $A = C( () => {
        h();
        ZA = je($i()),
        YA = je(Xs()),
        Gu = je(Ld()),
        ZO = r => {
            let e = r.decode.bind(r)
              , t = r.encode.bind(r);
            return {
                decode: e,
                encode: t
            }
        }
        ,
        Zu = r => e => {
            let t = (0,
            YA.blob)(r, e)
              , {encode: n, decode: o} = ZO(t)
              , s = t;
            return s.decode = (i, u) => {
                let f = o(i, u);
                return (0,
                Gu.toBigIntLE)(ZA.Buffer.from(f))
            }
            ,
            s.encode = (i, u, f) => {
                let g = (0,
                Gu.toBufferLE)(i, r);
                return n(g, u, f)
            }
            ,
            s
        }
        ,
        YO = Zu(8),
        Nee = Zu(16),
        Cee = Zu(24),
        Oee = Zu(32)
    }
    );
    var $O, vi, JA = C( () => {
        h();
        $O = je($i()),
        vi = je(Xs())
    }
    );
    var XO, XA = C( () => {
        h();
        XO = je($i());
        JA()
    }
    );
    var QA = C( () => {
        "use strict";
        h();
        Jl();
        wc.config({
            EXPONENTIAL_AT: 1e3,
            DECIMAL_PLACES: 78
        })
    }
    );
    var ek = C( () => {
        "use strict";
        h()
    }
    );
    var Yu, Lh, ete, $u, tk, Ei, Ta, rk = C( () => {
        "use strict";
        h();
        Yu = je(Ps());
        Vu();
        Lh = je(Jn());
        QA();
        ek();
        ete = Yu.Buffer.alloc(64).fill(0),
        $u = r => r && "version"in r,
        tk = (r, e) => $u(r) ? Yu.Buffer.from(r.serialize()) : r.serialize(e ?? {
            requireAllSignatures: !1,
            verifySignatures: !1
        }),
        Ei = (r, e) => Lh.default.encode(tk(r, e)),
        Ta = (r, e) => {
            let t;
            if (e === "base64")
                t = Yu.Buffer.from(r, "base64");
            else if (e === "bs58")
                t = Lh.default.decode(r);
            else
                throw new Error("Unsupported encoding");
            return Zr.deserialize(t)
        }
    }
    );
    var Rte, Ju = C( () => {
        "use strict";
        h();
        Rte = je(Xs());
        Vu();
        Vu();
        $A();
        XA();
        rk()
    }
    );
    var Ve, _i = C( () => {
        "use strict";
        h();
        Ve = class extends Error {
            message;
            code;
            data;
            constructor({code: e, message: t}, n) {
                super(t),
                this.code = e,
                this.message = t,
                typeof n < "u" && (this.data = n)
            }
            toString() {
                return this.message
            }
        }
    }
    );
    var nk = C( () => {
        "use strict";
        h()
    }
    );
    var QO, eq, tq, rq, nq, Xu, ok = C( () => {
        "use strict";
        h();
        nk();
        QO = {
            canSerialize: r => typeof r == "number" && Number.isNaN(r),
            serialize: r => ({
                ["$NAN"]: 1
            }),
            deserialize: r => NaN
        },
        eq = {
            canSerialize: r => r instanceof Date,
            serialize: r => ({
                ["$DATE"]: r.valueOf()
            }),
            deserialize: r => new Date(r["$DATE"])
        },
        tq = {
            canSerialize: r => r instanceof Uint8Array,
            serialize: r => ({
                ["$UINT8ARRAY"]: Array.from(r)
            }),
            deserialize: r => Uint8Array.from(r["$UINT8ARRAY"])
        },
        rq = {
            canSerialize: r => typeof r == "bigint",
            serialize: r => ({
                ["$BIGINT"]: r.toString()
            }),
            deserialize: r => BigInt(r["$BIGINT"])
        },
        nq = {
            canSerialize: r => r instanceof URL,
            serialize: r => ({
                ["$URL"]: r.href
            }),
            deserialize: r => new URL(r["$URL"])
        },
        Xu = {
            NAN: QO,
            DATE: eq,
            UINT8ARRAY: tq,
            BIGINT: rq,
            URL: nq
        }
    }
    );
    var oq, sq, Pa, Qu, Nh = C( () => {
        "use strict";
        h();
        ok();
        oq = function(r) {
            let e = this[r];
            for (let t of Object.values(Xu))
                if (t.canSerialize(e))
                    return t.serialize(e);
            return e
        }
        ,
        sq = (r, e) => {
            if (e && typeof e == "object" && Object.keys(e)[0]) {
                let t = Object.keys(e)[0].slice(1);
                if (t in Xu)
                    return Xu[t].deserialize(e)
            }
            return e
        }
        ,
        Pa = r => JSON.stringify(r, oq),
        Qu = r => JSON.parse(r, sq)
    }
    );
    var sk = C( () => {
        "use strict";
        h();
        Nh()
    }
    );
    var ik = C( () => {
        "use strict";
        h();
        Nh();
        sk()
    }
    );
    var ak, ck = C( () => {
        "use strict";
        h();
        ak = r => {
            try {
                if (r == null)
                    throw "JSON must be set";
                if (!isNaN(parseInt(r)))
                    throw "Numbers are not valid JSON";
                return JSON.parse(r),
                !0
            } catch {
                return !1
            }
        }
    }
    );
    var Ch, gn, za = C( () => {
        "use strict";
        h();
        ik();
        hs();
        ck();
        Ch = class {
            constructor({port: e}) {
                this.#e = e,
                this.#t = !1
            }
            #e;
            #t = !1;
            get status() {
                return this.#t ? "started" : "stopped"
            }
            async start() {
                if (this.#t)
                    return;
                let e = this.#e.onClose( () => {
                    this.#t = !1,
                    e()
                }
                );
                await this.#e.start(),
                this.#t = !0
            }
            async close() {
                this.#t && (await this.#e.close(),
                this.#t = !1)
            }
            async send(e) {
                if (!this.#t)
                    throw new Error("Cannot read stream: RpcTransport has not been started");
                if (Array.isArray(e)) {
                    let t = df.parse(e)
                      , n = new Set(t.map(s => s.id))
                      , o = Pa(t);
                    this.#e.postMessage(o);
                    for await(let s of this.recv())
                        if (Array.isArray(s) && s.every(i => n.has(i.id)))
                            return s;
                    throw new Error("Failed to get response: request ids=" + n)
                } else {
                    let t = rc.parse(e)
                      , {id: n} = t
                      , o = Pa(t);
                    this.#e.postMessage(o);
                    for await(let s of this.recv())
                        if ("id"in s && s.id === n && !("method"in s))
                            return s;
                    throw new Error("Failed to get response: request id=" + n)
                }
            }
            addListener(e) {
                let t = async o => {
                    let s = this.recv()[Symbol.asyncIterator]()
                      , i = () => {}
                      , u = () => new Promise(g => i = () => g(null));
                    function f() {
                        s.return?.(),
                        i(),
                        o.signal.removeEventListener("abort", f)
                    }
                    try {
                        for (o.signal.addEventListener("abort", f); ; ) {
                            let g = await Promise.race([s.next(), u()]);
                            if (!g)
                                break;
                            try {
                                e(g.value)
                            } catch (b) {
                                console.error(b)
                            }
                        }
                        f()
                    } catch (g) {
                        throw f(),
                        g
                    }
                }
                  , n = new AbortController;
                return t(n),
                () => n.abort()
            }
            recv() {
                let e = []
                  , t = () => {}
                  , n = () => new Promise(g => t = g)
                  , o = !1
                  , s = this.#e.onClose( () => {
                    o = !0,
                    t(),
                    s()
                }
                )
                  , i = this.#e.onMessage(g => {
                    if (ak(g))
                        try {
                            let b = Qu(g);
                            if ("method"in b && "id"in b) {
                                t();
                                return
                            }
                            if (Array.isArray(b)) {
                                let E = hf.parse(b);
                                e.push(E),
                                t()
                            } else if ("id"in tc.parse(b)) {
                                let q = nc.parse(b);
                                e.push(q),
                                t()
                            } else {
                                let q = jr.parse(b);
                                e.push(q),
                                t()
                            }
                        } catch (b) {
                            console.error(b)
                        }
                }
                )
                  , u = () => {
                    s(),
                    i()
                }
                  , f = {
                    async next() {
                        for (; !o; ) {
                            let g = e.shift();
                            if (g)
                                return {
                                    done: !1,
                                    value: g
                                };
                            await n()
                        }
                        return u(),
                        {
                            done: !0,
                            value: void 0
                        }
                    },
                    async throw() {
                        return u(),
                        {
                            done: !0,
                            value: void 0
                        }
                    },
                    async return() {
                        return u(),
                        {
                            done: !0,
                            value: void 0
                        }
                    }
                };
                return {
                    [Symbol.asyncIterator]() {
                        return f
                    }
                }
            }
        }
        ,
        gn = class r extends Ch {
            static createPort() {
                let e = []
                  , t = [];
                function n(s) {
                    for (let i of e)
                        try {
                            i(s.detail)
                        } catch (u) {
                            console.error(u)
                        }
                }
                function o() {
                    for (let s of t)
                        try {
                            s()
                        } catch (i) {
                            console.error(i)
                        }
                }
                return {
                    async start() {
                        window.addEventListener("phantomRpcMessage", n)
                    },
                    async close() {
                        window.removeEventListener("phantomRpcMessage", n),
                        o()
                    },
                    postMessage(s) {
                        setTimeout( () => {
                            window.dispatchEvent(new CustomEvent("dappRpcMessage",{
                                detail: s
                            }))
                        }
                        , 0)
                    },
                    onMessage(s) {
                        return e.push(s),
                        () => {
                            e.splice(e.indexOf(s), 1)
                        }
                    },
                    onClose(s) {
                        return t.push(s),
                        () => {
                            t.splice(t.indexOf(s), 1)
                        }
                    }
                }
            }
            constructor() {
                super({
                    port: r.createPort()
                })
            }
        }
    }
    );
    var uk = C( () => {
        "use strict";
        h()
    }
    );
    function qh(r) {
        return $u(r) ? "versioned" : "legacy"
    }
    function aq(r) {
        let e = Oh.default.decode(r)
          , t = Zr.deserialize(e);
        return {
            transaction: t,
            metadata: {
                numInstructions: t.message.compiledInstructions.length,
                type: 0
            }
        }
    }
    function Uh(r) {
        let {transaction: e, type: t} = r
          , n = Oh.default.decode(e);
        if (t === "legacy") {
            let o = tt.from(n);
            return {
                transaction: o,
                metadata: {
                    numInstructions: o.instructions.length,
                    type: t
                }
            }
        } else {
            if (t === 0)
                return aq(e);
            throw new Error(`Unknown transaction type => ${t}`)
        }
    }
    function ep(r) {
        return Uint8Array.from(A.from(r, "base64"))
    }
    var Oh, pk, tp = C( () => {
        "use strict";
        h();
        hs();
        Ju();
        Oh = je(Jn());
        uk();
        pk = () => I.env.ENVIRONMENT === "e2e"
    }
    );
    var Ma, dk, cq, uq, fk, pq, Dh, rp, hk = C( () => {
        "use strict";
        h();
        hs();
        Ju();
        Ma = je(Jn()),
        dk = je(Ss());
        K();
        _i();
        za();
        tp();
        cq = new Error("Unsupported path."),
        uq = (r, e=cq) => {
            throw e
        }
        ,
        fk = r => Mr.common.SolanaSendOptions.safeParse(r).success,
        pq = 1,
        Dh = class extends dk.EventEmitter {
            _injectionEndMs = null;
            _injectionStartMs = null;
            isPhantom = !0;
            _publicKey = null;
            #e;
            constructor(e) {
                super(),
                this.#e = e,
                this.#e.start(),
                e.addListener(t => {
                    let n = jr.safeParse(t);
                    n.success && this.handleNotification(n.data)
                }
                ),
                this.#t()
            }
            #t = () => {
                this.addListener(Mr.common.SolanaProviderEvent.AccountChanged, e => {
                    e ? this._publicKey = e : (this._publicKey = null,
                    this.emit(Mr.common.SolanaProviderEvent.Disconnect))
                }
                )
            }
            ;
            #o = async e => {
                let t;
                try {
                    let {method: n} = e
                      , o = "params"in e ? e.params ?? [] : []
                      , s = Mr[n];
                    if (!s)
                        throw new Error("MethodNotFound");
                    let i = s.request.safeParse({
                        jsonrpc: "2.0",
                        id: (pq++).toString(),
                        method: n,
                        params: o
                    });
                    if (!i.success)
                        throw i.error;
                    let u = i.data;
                    if (await this.#e.start(),
                    t = s.response.parse(await this.#e.send(u)),
                    "error"in t)
                        throw new Ve(t.error);
                    try {
                        n === "sol_connect" ? (this._publicKey = new Pe(t.result.publicKey),
                        this.emit(Mr.common.SolanaProviderEvent.Connect, this._publicKey)) : n === "sol_signIn" && !this.isConnected && (this._publicKey = new Pe(t.result.address),
                        this.emit(Mr.common.SolanaProviderEvent.Connect, this._publicKey)),
                        n === "sol_disconnect" && (this._publicKey = null,
                        this.emit(Mr.common.SolanaProviderEvent.Disconnect))
                    } catch (f) {
                        console.error("event emitter error", f)
                    }
                    return t.result
                } catch (n) {
                    throw console.error("GOT ERROR", n),
                    n instanceof Ve ? n : n instanceof jt ? new Ve({
                        code: -32e3,
                        message: "Missing or invalid parameters."
                    },{
                        method: e.method
                    }) : n instanceof Error && n.message === "MethodNotFound" ? new Ve({
                        code: -32601,
                        message: `The method ${e.method} does not exist / is not available.`
                    },{
                        method: e.method
                    }) : new Ve({
                        code: -32603,
                        message: "Internal JSON-RPC error."
                    },{
                        method: e.method
                    })
                }
            }
            ;
            get publicKey() {
                return this._publicKey
            }
            get isConnected() {
                return this._publicKey !== null
            }
            connect = async e => {
                let t = await this.#o({
                    method: "sol_connect",
                    params: e?.onlyIfTrusted === void 0 ? {} : {
                        onlyIfTrusted: e?.onlyIfTrusted
                    }
                });
                return {
                    publicKey: new Pe(t.publicKey)
                }
            }
            ;
            disconnect = async () => {
                this.isConnected && await this.#o({
                    method: "sol_disconnect",
                    params: void 0
                })
            }
            ;
            signTransaction = async e => {
                if (!e)
                    throw new Ve({
                        code: -32e3,
                        message: "Missing or invalid parameters."
                    });
                let t = qh(e)
                  , n = await this.#o({
                    method: "sol_signTransaction",
                    params: {
                        transaction: Ei(e)
                    }
                });
                return Uh({
                    transaction: n.transaction,
                    type: t === "versioned" ? 0 : "legacy"
                }).transaction
            }
            ;
            signAllTransactions = async (e=[]) => {
                if (!e || e.length === 0)
                    throw new Ve({
                        code: -32e3,
                        message: "Missing or invalid parameters."
                    });
                let t = e.map(o => qh(o))
                  , n = await this.#o({
                    method: "sol_signAllTransactions",
                    params: {
                        transactions: e.map(o => Ei(o))
                    }
                });
                if (n.length !== e.length)
                    throw new Error("Invalid number of transactions returned");
                return n.map( (o, s) => {
                    let i = t[s];
                    return Uh({
                        transaction: o.transaction,
                        type: i === "versioned" ? 0 : "legacy"
                    }).transaction
                }
                )
            }
            ;
            signAndSendTransaction = async (e, t={}) => {
                if (!e)
                    throw new Ve({
                        code: -32e3,
                        message: "Missing or invalid parameters."
                    });
                let n = {};
                if (t)
                    if (fk(t))
                        n.skipPreflight = t.skipPreflight,
                        n.preflightCommitment = t.preflightCommitment;
                    else
                        throw new Ve({
                            code: -32e3,
                            message: "Missing or invalid parameters."
                        });
                return await this.#o({
                    method: "sol_signAndSendTransaction",
                    params: {
                        transaction: Ei(e),
                        options: n
                    }
                })
            }
            ;
            signAndSendAllTransactions = async (e, t={}) => {
                if (!e)
                    throw new Ve({
                        code: -32e3,
                        message: "Missing or invalid parameters."
                    });
                let n = {};
                if (t)
                    if (fk(t))
                        n.skipPreflight = t.skipPreflight,
                        n.preflightCommitment = t.preflightCommitment;
                    else
                        throw new Ve({
                            code: -32e3,
                            message: "Missing or invalid parameters."
                        });
                return await this.#o({
                    method: "sol_signAndSendAllTransactions",
                    params: {
                        transactions: e.map(s => Ei(s)),
                        options: n
                    }
                })
            }
            ;
            signMessage = async (e, t="utf8") => {
                let n = await this.#o({
                    method: "sol_signMessage",
                    params: {
                        message: Ma.default.encode(e),
                        display: t
                    }
                })
                  , o = Ma.default.decode(n.signature)
                  , s = new Pe(n.publicKey);
                return {
                    signature: o,
                    publicKey: s
                }
            }
            ;
            signIn = async e => {
                let t = await this.#o({
                    method: "sol_signIn",
                    params: {
                        signInData: e
                    }
                })
                  , n = new Pe(t.address)
                  , o = Ma.default.decode(t.signedMessage)
                  , s = Ma.default.decode(t.signature);
                return {
                    address: n,
                    signedMessage: o,
                    signature: s
                }
            }
            ;
            handleNotification = async e => {
                switch (e.method) {
                case "phantom_accountChanged":
                    {
                        let t = er.phantom_accountChanged.notification.safeParse(e);
                        if (!t.success)
                            return;
                        let n = t.data.params?.sol;
                        n !== this.publicKey?.toBase58() && this.emit(Mr.common.SolanaProviderEvent.AccountChanged, n ? new Pe(n) : null);
                        break
                    }
                case "phantom_trustRevoked":
                    {
                        let t = er.phantom_trustRevoked.notification.safeParse(e);
                        if (!t.success)
                            return;
                        t.data.params?.sol === this.publicKey?.toBase58() && this.emit(Mr.common.SolanaProviderEvent.AccountChanged, null);
                        break
                    }
                }
            }
            ;
            request = async ({method: e, params: t}) => {
                switch (e) {
                case "connect":
                    return await this.connect(t);
                case "disconnect":
                    return await this.disconnect();
                case "signMessage":
                    return await this.signMessage(t?.message, t?.display);
                case "signTransaction":
                    {
                        let n = Ta(t?.message, "bs58");
                        return await this.signTransaction(n)
                    }
                case "signAllTransactions":
                    {
                        let n = [];
                        t?.message && typeof t?.message == "string" ? n = [t?.message] : t?.message && Array.isArray(t?.message) ? n = t?.message : t?.messages && (n = t?.messages);
                        let o = n.map(s => Ta(s, "bs58"));
                        return await this.signAllTransactions(o)
                    }
                case "signAndSendTransaction":
                    {
                        let n = Ta(t?.message, "bs58");
                        return await this.signAndSendTransaction(n)
                    }
                default:
                    throw uq(e),
                    new Error("unsupported method: " + e)
                }
            }
            ;
            removeAllListeners = e => {
                try {
                    return super.removeAllListeners(e)
                } finally {
                    this.#t()
                }
            }
        }
        ,
        rp = class r extends Dh {
            static inject(e) {
                let t = window;
                t.isPhantomInstalled = !0;
                let n = new r;
                Object.defineProperty(window, "solana", {
                    value: n,
                    writable: !1
                }),
                "phantom"in window || Object.defineProperty(window, "phantom", {
                    value: {},
                    writable: !1
                }),
                Object.defineProperty(window.phantom, "solana", {
                    value: n,
                    writable: !1
                }),
                window.dispatchEvent(new Event("phantom#initialized")),
                n._injectionStartMs = e,
                n._injectionEndMs = window.performance.now()
            }
            constructor() {
                super(new gn)
            }
        }
    }
    );
    var yk, fq, np, mk = C( () => {
        "use strict";
        h();
        Ju();
        Vo();
        yk = je(Jn()),
        fq = ["solana:signAndSendTransaction", "solana:signMessage", "solana:signTransaction", "solana:signIn"],
        np = class r {
            #e = {};
            #t = "1.0.0";
            #o = "Phantom";
            #s = Ko;
            #r = null;
            #n;
            get version() {
                return this.#t
            }
            get name() {
                return this.#o
            }
            get icon() {
                return this.#s
            }
            get chains() {
                return ki.slice()
            }
            get features() {
                return {
                    "standard:connect": {
                        version: "1.0.0",
                        connect: this.#l
                    },
                    "standard:disconnect": {
                        version: "1.0.0",
                        disconnect: this.#m
                    },
                    "standard:events": {
                        version: "1.0.0",
                        on: this.#c
                    },
                    "solana:signAndSendTransaction": {
                        version: "1.0.0",
                        supportedTransactionVersions: ["legacy", 0],
                        signAndSendTransaction: this.#g
                    },
                    "solana:signTransaction": {
                        version: "1.0.0",
                        supportedTransactionVersions: ["legacy", 0],
                        signTransaction: this.#d
                    },
                    "solana:signMessage": {
                        version: "1.0.0",
                        signMessage: this.#x
                    },
                    "solana:signIn": {
                        version: "1.0.0",
                        signIn: this.#h
                    },
                    "phantom:": {
                        phantom: this.#n
                    }
                }
            }
            get accounts() {
                return this.#r ? [this.#r] : []
            }
            constructor(e) {
                new.target === r && Object.freeze(this),
                this.#n = e,
                e.on("connect", this.#a, this),
                e.on("disconnect", this.#u, this),
                e.on("accountChanged", this.#f, this),
                this.#a()
            }
            #c = (e, t) => (this.#e[e]?.push(t) || (this.#e[e] = [t]),
            () => this.#p(e, t));
            #i(e, ...t) {
                this.#e[e]?.forEach(n => n.apply(null, t))
            }
            #p(e, t) {
                this.#e[e] = this.#e[e]?.filter(n => t !== n)
            }
            #a = () => {
                let e = this.#n.publicKey?.toBase58();
                if (e) {
                    let t = this.#n.publicKey.toBytes()
                      , n = this.#r;
                    (!n || n.address !== e || !jp(n.publicKey, t)) && (this.#r = new en({
                        address: e,
                        publicKey: t,
                        chains: ki,
                        features: fq
                    }),
                    this.#i("change", {
                        accounts: this.accounts
                    }))
                }
            }
            ;
            #u = () => {
                this.#r && (this.#r = null,
                this.#i("change", {
                    accounts: this.accounts
                }))
            }
            ;
            #f = () => {
                this.#n.publicKey ? this.#a() : this.#u()
            }
            ;
            #l = async ({silent: e}={}) => (this.#r || await this.#n.connect(e ? {
                onlyIfTrusted: !0
            } : void 0),
            this.#a(),
            {
                accounts: this.accounts
            });
            #m = async () => {
                await this.#n.disconnect()
            }
            ;
            #g = async (...e) => {
                if (!this.#r)
                    throw new Error("not connected");
                let t = [];
                for (let n of e) {
                    let {transaction: o, account: s, chain: i, options: u} = n
                      , {preflightCommitment: f, skipPreflight: g, maxRetries: b} = u || {};
                    if (!this.#r.equals(s))
                        throw new Error("invalid account");
                    if (!Fp(i))
                        throw new Error("invalid chain");
                    let {signature: E} = await this.#n.signAndSendTransaction(Zr.deserialize(o), {
                        preflightCommitment: f,
                        maxRetries: b,
                        skipPreflight: g
                    });
                    t.push({
                        signature: yk.default.decode(E)
                    })
                }
                return t
            }
            ;
            #d = async (...e) => {
                if (!this.#r)
                    throw new Error("not connected");
                let t = [];
                if (e.length === 1) {
                    let n = e[0]
                      , o = Zr.deserialize(n.transaction)
                      , s = await this.#n.signTransaction(o);
                    if (!s)
                        return [];
                    t.push({
                        signedTransaction: s.serialize()
                    })
                } else if (e.length > 1) {
                    let n = new Map;
                    for (let[o,s] of e.entries()) {
                        let i = n.get(s.account);
                        i || (i = [],
                        n.set(s.account, i)),
                        i.push([o, Zr.deserialize(s.transaction)])
                    }
                    for (let[o,s] of n.entries()) {
                        let[i,u] = s.reduce( ([g,b], [E,q]) => (g.push(E),
                        b.push(q),
                        [g, b]), [[], []])
                          , f = await this.#n.signAllTransactions(u);
                        for (let[g,b] of i.entries())
                            t[b] = {
                                signedTransaction: f[g].serialize()
                            }
                    }
                }
                return t
            }
            ;
            #x = async (...e) => {
                if (!this.#r)
                    throw new Error("not connected");
                let t = [];
                for (let n of e) {
                    let {message: o, account: s} = n;
                    if (!this.#r.equals(s))
                        throw new Error("invalid account");
                    let {signature: i} = await this.#n.signMessage(o);
                    t.push({
                        signedMessage: o,
                        signature: i
                    })
                }
                return t
            }
            ;
            #h = async (...e) => {
                let t = [];
                for (let n of e) {
                    let o = {
                        ...n,
                        resources: n.resources ? Array.from(n.resources) : void 0
                    }
                      , {signedMessage: s, signature: i} = await this.#n.signIn(o);
                    t.push({
                        account: this.#r,
                        signedMessage: s,
                        signature: i
                    })
                }
                return t
            }
        }
    }
    );
    var gk, xk = C( () => {
        "use strict";
        h();
        Vo();
        hk();
        mk();
        gk = r => {
            try {
                rp.inject(r),
                Wo(new np(window.phantom.solana))
            } catch (e) {
                console.error(e)
            }
        }
    }
    );
    function bk(r, e, t) {
        for (t of r.keys())
            if (Ur(t, e))
                return t
    }
    function Ur(r, e) {
        var t, n, o;
        if (r === e)
            return !0;
        if (r && e && (t = r.constructor) === e.constructor) {
            if (t === Date)
                return r.getTime() === e.getTime();
            if (t === RegExp)
                return r.toString() === e.toString();
            if (t === Array) {
                if ((n = r.length) === e.length)
                    for (; n-- && Ur(r[n], e[n]); )
                        ;
                return n === -1
            }
            if (t === Set) {
                if (r.size !== e.size)
                    return !1;
                for (n of r)
                    if (o = n,
                    o && typeof o == "object" && (o = bk(e, o),
                    !o) || !e.has(o))
                        return !1;
                return !0
            }
            if (t === Map) {
                if (r.size !== e.size)
                    return !1;
                for (n of r)
                    if (o = n[0],
                    o && typeof o == "object" && (o = bk(e, o),
                    !o) || !Ur(n[1], e.get(o)))
                        return !1;
                return !0
            }
            if (t === ArrayBuffer)
                r = new Uint8Array(r),
                e = new Uint8Array(e);
            else if (t === DataView) {
                if ((n = r.byteLength) === e.byteLength)
                    for (; n-- && r.getInt8(n) === e.getInt8(n); )
                        ;
                return n === -1
            }
            if (ArrayBuffer.isView(r)) {
                if ((n = r.byteLength) === e.byteLength)
                    for (; n-- && r[n] === e[n]; )
                        ;
                return n === -1
            }
            if (!t || typeof r == "object") {
                n = 0;
                for (t in r)
                    if (wk.call(r, t) && ++n && !wk.call(e, t) || !(t in e) || !Ur(r[t], e[t]))
                        return !1;
                return Object.keys(e).length === n
            }
        }
        return r !== r && e !== e
    }
    var wk, op = C( () => {
        h();
        wk = Object.prototype.hasOwnProperty
    }
    );
    var Sk, lq, jh, sp, vk = C( () => {
        "use strict";
        h();
        hs();
        op();
        Sk = je(Ss());
        K();
        _i();
        za();
        lq = 1,
        jh = class extends Sk.default {
            _injectionEndMs = null;
            _injectionStartMs = null;
            isPhantom = !0;
            #e;
            #t;
            constructor(e) {
                super(),
                this.#e = e,
                this.#e.start(),
                this.#t = [],
                e.addListener(t => {
                    let n = jr.safeParse(t);
                    n.success && this.handleNotification(n.data)
                }
                ),
                this.#o()
            }
            #o() {
                this.on("accountsChanged", e => {
                    e.length === 0 ? this.#t = [] : this.#t = JSON.parse(JSON.stringify(e))
                }
                )
            }
            #s = async e => {
                let t;
                try {
                    let {method: n} = e
                      , o = "params"in e ? e.params ?? [] : []
                      , s = hc[n];
                    if (!s)
                        throw new Error("MethodNotFound");
                    let i = s.request.safeParse({
                        jsonrpc: "2.0",
                        id: (lq++).toString(),
                        method: n,
                        params: o
                    });
                    if (!i.success)
                        throw i.error;
                    let u = i.data
                      , f = await this.#e.send(u);
                    if (t = s.response.parse(f),
                    "error"in t)
                        throw new Ve(t.error);
                    return t.result
                } catch (n) {
                    throw n instanceof Ve ? n : n instanceof jt ? new Ve({
                        code: -32e3,
                        message: "Missing or invalid parameters."
                    },{
                        method: e.method
                    }) : n instanceof Error && n.message === "MethodNotFound" ? new Ve({
                        code: -32601,
                        message: `The method ${e.method} does not exist / is not available.`
                    },{
                        method: e.method
                    }) : new Ve({
                        code: -32603,
                        message: "Internal JSON-RPC error."
                    },{
                        method: e.method
                    })
                }
            }
            ;
            requestAccounts = async () => {
                let t = (await this.#s({
                    method: "btc_requestAccounts",
                    params: []
                })).map(n => ({
                    address: n.address,
                    publicKey: n.publicKey,
                    addressType: n.addressType.replace("bip122_", ""),
                    purpose: n.purpose
                }));
                return this.emit("accountsChanged", t),
                t
            }
            ;
            signPSBT = async (e, t) => (t.finalize = t.finalize ?? !1,
            await this.#s({
                method: "btc_signPSBT",
                params: [e, t]
            }));
            signMessage = async (e, t) => await this.#s({
                method: "btc_signMessage",
                params: {
                    address: e,
                    message: t
                }
            });
            handleNotification = async e => {
                switch (e.method) {
                case "phantom_accountChanged":
                    {
                        let t = er.phantom_accountChanged.notification.safeParse(e);
                        if (!t.success)
                            return;
                        let n = t.data.params?.btc?.map(o => ({
                            address: o.address,
                            publicKey: o.publicKey,
                            addressType: o.addressType.replace("bip122_", ""),
                            purpose: o.purpose
                        })) ?? [];
                        if (n.length === 0 && this.#t.length > 0) {
                            this.emit("accountsChanged", []);
                            return
                        }
                        Ur(n, this.#t) || this.emit("accountsChanged", n);
                        break
                    }
                case "phantom_trustRevoked":
                    {
                        let t = er.phantom_trustRevoked.notification.safeParse(e);
                        if (!t.success)
                            return;
                        let n = t.data.params?.btc?.map(o => ({
                            address: o.address,
                            publicKey: o.publicKey,
                            addressType: o.addressType.replace("bip122_", ""),
                            purpose: o.purpose
                        })) ?? [];
                        Ur(n, this.#t) && this.emit("accountsChanged", []);
                        break
                    }
                }
            }
            ;
            removeAllListeners = e => {
                try {
                    return super.removeAllListeners(e)
                } finally {
                    this.#o()
                }
            }
        }
        ,
        sp = class r extends jh {
            static inject(e) {
                let t = window
                  , n = new r;
                t.phantom || Object.defineProperty(window, "phantom", {
                    value: {},
                    writable: !1
                }),
                Object.defineProperty(window.phantom, "bitcoin", {
                    value: n,
                    writable: !1
                }),
                n._injectionEndMs = window.performance.now(),
                n._injectionStartMs = e
            }
            constructor() {
                super(new gn)
            }
        }
    }
    );
    function _k(r) {
        return Uint8Array.from(A.from(r, "hex"))
    }
    var Ek, dq, ip, Ak = C( () => {
        "use strict";
        h();
        Vo();
        op();
        Ek = ["bitcoin:connect", "bitcoin:signTransaction", "bitcoin:signMessage"],
        dq = {
            ALL: 1,
            NONE: 2,
            SINGLE: 3,
            "ALL|ANYONECANPAY": 129,
            "NONE|ANYONECANPAY": 130,
            "SINGLE|ANYONECANPAY": 131
        },
        ip = class r {
            #e = {};
            #t = "1.0.0";
            #o = "Phantom";
            #s = Ko;
            #r = [];
            #n;
            get version() {
                return this.#t
            }
            get name() {
                return this.#o
            }
            get icon() {
                return this.#s
            }
            get chains() {
                return Ii.slice()
            }
            get features() {
                return {
                    "standard:events": {
                        version: "1.0.0",
                        on: this.#c
                    },
                    "bitcoin:connect": {
                        version: "1.0.0",
                        connect: this.#u
                    },
                    "bitcoin:signTransaction": {
                        version: "1.0.0",
                        signTransaction: this.#f
                    },
                    "bitcoin:signMessage": {
                        version: "1.0.0",
                        signMessage: this.#l
                    }
                }
            }
            get accounts() {
                return this.#r
            }
            constructor(e) {
                new.target === r && Object.freeze(this),
                this.#n = e,
                e.on("accountsChanged", this.#a, this)
            }
            #c = (e, t) => (this.#e[e]?.push(t) || (this.#e[e] = [t]),
            () => this.#p(e, t));
            #i(e, ...t) {
                this.#e[e]?.forEach(n => n.apply(null, t))
            }
            #p(e, t) {
                this.#e[e] = this.#e[e]?.filter(n => t !== n)
            }
            #a = e => {
                if (e.length === 0 && this.#r.length > 0) {
                    this.#r = [],
                    this.#i("change", {
                        accounts: this.accounts
                    });
                    return
                }
                let t = e.map(n => new en({
                    address: n.address,
                    publicKey: _k(n.publicKey),
                    chains: Ii,
                    features: Ek
                }));
                e.length > 0 && !Ur(this.#r, t) && (this.#r = t,
                this.#i("change", {
                    accounts: this.accounts
                }))
            }
            ;
            #u = async (...e) => {
                let t = [];
                e.length > 0 && (t = [...e[0].purposes]),
                t.length == 0 && (t = ["payment", "ordinals"]),
                t.length === 1 && t[0] === "payment" && (t = ["payment", "ordinals"]),
                t.length === 1 && t[0] === "ordinals" && (t = ["ordinals", "payment"]);
                let n = await this.#n.requestAccounts();
                return n && (n.sort( (o, s) => t.indexOf(o.purpose) - t.indexOf(s.purpose)),
                this.#r = n.map(o => new en({
                    address: o.address,
                    publicKey: _k(o.publicKey),
                    chains: Ii,
                    features: Ek
                })),
                this.#i("change", {
                    accounts: this.accounts
                })),
                {
                    accounts: this.accounts
                }
            }
            ;
            #f = async (...e) => {
                let[{psbt: t, inputsToSign: n}] = e;
                return [{
                    signedPsbt: await this.#n.signPSBT(t, {
                        inputsToSign: n.map(s => ({
                            address: s.account.address,
                            signingIndexes: s.signingIndexes,
                            sigHash: s.sigHash ? dq[s.sigHash] : void 0
                        })),
                        finalize: !1
                    })
                }]
            }
            ;
            #l = async (...e) => {
                let[{message: t, account: {address: n}}] = e;
                return [await this.#n.signMessage(n, t)]
            }
        }
    }
    );
    var kk, Ik = C( () => {
        "use strict";
        h();
        Vo();
        vk();
        Ak();
        kk = r => {
            try {
                sp.inject(r),
                Wo(new ip(window.phantom.bitcoin))
            } catch (e) {
                console.error(e)
            }
        }
    }
    );
    var Rk, Bk, Hh = C( () => {
        "use strict";
        h();
        Rk = `
data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPoAAAB4CAYAAADblO/uAAAACXBIWXMAACE4AAAh OAFFljFgAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAB+OSURBVHgB7Z1r cBvXdccP+AYfEmlTkvU0pDhSYlsSJUfUw54xaCdO0jQWFduZ2E1HZOM2/ZCJyNqd Sd2ZiEymcTNtRlI/Na5bUk0bTxJ7RLmTSZzaITRjPUjFFmVJHku1Rej9DsGXBD4A 9PyXu9ICxGMfdwEQuL8ZaMHdBQQs9n/Pueeeey6RRCKRSCQSiUQikUgkkmygkCSG 8Xq91fcw58+fD5BEMoMoIIlhgsFgXSQS6d6wYYMn1bloFEgiyRJMW/T169e3fPrT n/7I7/cHKc9gS+5ftGhRIz/dyVvP4sWLj+qtO8Q9b968v+ZjL09OTrovXLhwiCR5 QV1dneLtMXT58uWs04bLzMmbNm2qC4VCR9iqbent7e2iPAQNHW926Hb5+OHnh4ev S53L5YIl7+vp6VlDkpwHAmdN4H6AAVC8OL4H+vhe6CssLNzd19fnoyygyMzJbKU8 /CXwRbz8Z14KfWxsrLO0tFQvdK/2BNdG3W4hSV4Aw8cbj34fGnzewCg2rVy50s/P 21n0Pha9nzKEqT4638Cb1aerKU/hHwuuuj/Rcb5GnYcOHfKTJOdhETdRjMjjgOMd LPp+Pr+DPYBU5zuC2WCcV9vKYFNCdpMkX9hK5mhSBb8j3YI3LHSONHtJ13rdunWr ifIQNeLuSXKKnyT5goes0cKC71Y9grRguI/O/Y7Y1gtu/E7KP5K24gUFBVnr6TS2 DVSXl094aIK4DxnxcEfj3ohLuVnxIFfEVR2hSNTn54hMIOKKqN2VSODc7/7yaGjs Wh93UfwHDhzoozyGr8E+1oWHrOHhRweL/VHuv7c73X83FHWHFeMv1B+7n2/qLQcP HsyboByuQzgcPqJG1hPRyhH3rGgAv/HyJU9BuNDLTx9lQXspYtkC3SZ44xhd3P+S 8pzviQAizPx0L4JN+Sb8Bx980Mvfv5vs4+fr1+Ck2FMKHX1xdtOnRRZV8EOvyZfg Ew+t4UfFj+vjm3wvbwO8reZtnc7j8bHQGygDwGK7S8a9bJnZ23I1xlpnUdw4/m80 ePrNeIf8/Oji67ErX+4JFnsbf9/tZB94Tc3Hjh1zxHAmFbpqyffw07okp/n5izbk +g+rxii2shezK57lUvvubRC8ej18lAYUd7x4opEt9lYWeJ1T4tYTnhilC/u20cTN K8lO0wTvoxwHgTXuc0Pwq9WhNcvwe7R98MEH7SSYuEJXrfhW/tBtKdxUPZ18bnu+ Dy2x4Nuw5evQRg7yzZevecMR2sbuuDcd4o5F78KnwMduaWu+uPWq6L00FcvxkgWc EHuU0GG1WNyb+dFkQuCx+Pi1GGLyyfFksSjWu3RyG4WpxYy4J8eG6cIHP6cb/T56 4Ms/odKqBSSCSwdeolvXjxk9Pe8MgR3R87VqZbELi/UoQue+5x4Wt9eGuBPhd7vd a3w+n5ztZYNvvDzgcUUmtrFr3mTWeo/eOEkf/uYFCg5fVP6+d923acnnvk0iMGHV Nfyq2Dspz9C5948ajdTzuU0sdiF5GYrQ2ZI38WYrR5TrRIgd0Vjk+fJTXz5F5UWj ued8PRvJArDiZ//wU8Wia8xb8SQtf6yNRGHSqmt0sgFozVcDgPFzBPAMCD7Ammw4 ceKE7W7PtD66GnRqijNunhRN3LztyocAjJPAghdEJndYFTis96nft9HgxT9MO1ZR u4LWPvMaiWLw9F6Owr9KFsiLIG4yDAoeQ29r1NRryySMuuujyJTqTXi4iTfNsk9u j6nhscnt3Gq2kEUGL77HIt9+21WPpai0ijb+xT4SBSLwZ9/+lrK1AG7iLfmeeGNg iK6Lh91sTZRKOY6OKDKLPeGH4GPtvb29bSSxjNUgmx6452fYTb/I7noqIHQIXhQW 3XcNeIIN+S529OHZTe9OZN3tBucMZcZxsA7/wbY4h7p6enrklEwboB8eikQ67GSt wXoj4IbAmxHWfP01qrx7BYnChvuukbVih2erJkRVq8lR+oYY3Y+AyHRgtu47+f3i aS2guvB+soAhoWNyfUlJSX9soI7/XirddWsoVrxkssNqP1wjXsAtFSsea6e5K75K opi8eVVx322S8SxLtbCKl6amYWPrIXP4+IGMyS473yOJ2H3swlvKujRcYSbWhVfn XTeTxDTP/vBKo6ugoMNOoguEfaq7jcfGzadaf+rhF2nBqudIJP7ffMNqPz3qbdIZ oENiWDAYbOT7GkNejYKHl23lDXCgrpPiTKDiz9lw/PhxH5nE8Ow1viA7S0tL9X11 Oe/aJHorziInq8BVP7b3rxIG3FIxcv0UiaaofB6ND54mmyDluoO3js0V0Il7661b t7zafq06kEAwctXE3V5LgmfLjeo0eBoldn4vXJ+lZBLD89HV8L5P/dMvh9DMgb64 u2TiiF1XHcBVtypyMDk+RKIpnWX63kuEd926dTtIMBg2ZtF13Lx5s19tTLyUHiD4 bnQLyCQQO93RnIZn1apVpkdlzJaS0sZljpLEMM/+6NqOUDjSLWKaKLAbSBt1xKLP JVEUFBS0qPkctoD1RjFPfqCBRR+nySU++9MIyIo7wt/JbEUawvCjOhX4NuhCI25G JjBbSsoXs5UkARHbRz7/dLedcfF4oH89e8HnyCp2vIF0AatrtVwZXldfX78d1pum KvbamlEmCv5OnWYbMHjSqPuAyL5uNyrPmvIMTQmd+zZKyxLbwkimw+6nsthDJDTm JQe4/0s/oTIbk1PGhi+RSAqKK0gwntHRUVPzvNGwsvXeAYFjBliGrHdSMO3byAIg ejCkxsLGMLY+O87UtTEldLQubre7RvbPkwMXTa084iHBYAbaBxyIA/d/+SdklZEb H5FIBETcp6G68J5U56kC71CrILVko8B1VKsxAlMg3x1BPd0uDyrcGH29qbruwOpE hF91DHv5dqhzkWt1mL+sSy12r8AeQjgS2VdCVb4tza4ZPdGBb7rt6jx+coKi0kol hx1ZcBgmw+OT/f9MZhkbEmvRnSJZFB4uOlvvbeFwONvFHQsCgy1mS44hM44j8ajV 6MXfatqsz8hrnbkbVRRxu2izi4cZInphJ/4wgQi5Ootosn1Lc82MEzzcRt5M648v e/J/SBQYPz/4H48qz+G+3720gT787Qumx9NFTlcFScpL2Sa2Yo8mcMp+650MeMdL zRpOdborSrsp35uDdTVGJrw4ssgiBP6rjiG+8yJKIMqIyMHUeZGWEBUe2dNxy0Mz BDW6C8sTN+gm0q1Fjnpl7VTUHQkzYxxYW97QZqq/jvdAAyGSyVtXySn0iVoIZqGG Ybb2wU2Axsp0kBb99RgX3tA1EGrRp9xz5Ufxkk1cmNlExQ1bmt1+ymLUslswpwkj uwse/hGV3b2SRHGaXfUL6uSVCh5qW/v115Q8d/Td9amwEDQaAExNLSqpVLdVHLF/ SOikFnB+3zYRCTMJ4Zu7WZ1J6aXcwZJVB1r/3GiWnOk+ejz2dESqJ2lkO6wxCYKt u2eSJhzNkrKLEZGDMRaASKFX1N4ZR4fA0UdHXx2ufJCj6bD4pZXzhYs5GU6KHFgJ YM0AkKWHe8dHJjGbBmtb6LDiIRrGj+Ah8Xjx/s80V/koyzAqcjA+2E8igUXWg6mp tUu9yth6BVv0sZFLdMPvo9D4MAWHLiriH71+UqkVt2rzKyQalJSSWEPtlvjIYWwJ /fWOkW0RCu+0nrVthPRcCDOYETkYvXyI5pA44I7DWuvddLjtsftiX4MAnBOMOWzN c5w63E9WR7M4OIcZd9AIprG2JgrMWRY6W9odLHKhGV8J8O7pGKhOFYXHWCqWQ+Kh Fi044XdqFhSL3FS2FYJxsHoi3fdqtt7XYyLt8UQO8S9c9RwtWPmcY678zcs9JLGM ZfcdsMix7oIHz/neP8ObtnjnWRL6LzuG2FWPNJEplOV7utD3Ri3yqEMu8mFojcfS Mc7uiX3lOCnLCnVpf+unF5I6b5if40tHvY4j4dggi6+PG4G9paWlPrsFCdVx8iYy Cay6SKHPXvjQNKHHUr3wc0pEXlR553gg2m6jusyMB/fd8PAwcVCNiouLyQrqRCcf WaM6wfMoTAsdImdRNpFJJim85tmmGj+ev94xyO7+1MR6fq+up5tmKVVqXusY8BRS QXes2AtoqryOWnceOcxmqtUqi9Jza9fElpjUaYO7rWT3ackwZIHhs+9QzfLnhKWK Vty9POExWG4IXPQQWjyGz75NuQgEPDo6SuXl5cjQi3vOxMSEInJgVeQqq8kiqBLL nw8eJnLi2xKdZ2p4zarIYbGfaZp1+66DKz5JhQPqwQZ9sE3fCGj0n3uv641ffw/C 9pI4TK0gsnHjxka+qHvIBnPWtFDV4sdJBPrEGT1w05EIk66I+7m3n0+1NNOMBUJn o6KImL1BKioqUuatT05OYt6HInRQUVGhNAg2CPT09NSQgxhOmOE++XZLIicsxxu9 Zniy/nYkOnFf4dKVE3BtvCQWLzKMkOiSKp8ax/lc28M7AydTF240ijJGPuuOSw43 HePpy3iYLV0iHzn3Ts6KHEDAEDcEPTIyQoFAgAYGBhQrrokcoBGwSbXVmXpGMSR0 RNdZgm1kERZvo/7vPR0jukBW2Ks/hoXqKL0ohQHURSymgR8Ax0VkYaG22jCLQxRa 4gvG0Fc++YqSPJNOBk6Kqw+frVRWViY9DgvPniHZZXx83EMOkrKPjlTUSZrYSfao Zref3d6CdhdFqkMU1llH1zY+5i+mYt8kTcZdlWRsfIQcRilhtG7dutWHDx9u1R9Q I+weEgRywivu2SCkrw43fdmmF9OaGKMBkeeyNdeA246H3oLrSdR/NwtWSaKpwLEj JP2UyHgL0YS52RIJYLe/0UXhI8h/j0QLBzPZOrgx6U+UWTc05FwetR5Mi2RXvl9z 5VUr30QCwVDbwCkxlhAWPBMiR6RdZDck20nmmrNASQQoJU0OklToSGuNOJPxZorB kcuURjyqK+9NtnCFHQY/2Tujs8mu9P4D5RPJphwjOp/I2pv8PzIj9F8q/WixJZCs MDR8ha5e/4TSjEetMeYhh7h6ZCdbxpnn+sJlz7dMuFRWG9F5AdxLDlKQ+IC9oSRR nLuYm3UoEZi70vsjRyqzOAXmm+eTy67BgbKkx2HRMQyXzcQVOgfHmrLBZQcf9x+g XAWW8crhmeEGo6uBQGK+AWuuueYlJSVUXV1NtbW1NGfOHKqpqaGqqiolWAehY3zd KkbXTDdCXV2dFyu16vfFjbqz+rc7O1HFGHDb/8+/n3IZpI9C7HPqWpwosCgEiPxy nvXLNeCWI7KOhBikuerBGDseZWVlSmOA/roNPNqTmHkbnjjn+vEP/7998VK6Q6GQ EkDHAhDHjh3rVD5r7EmYFhohca2LHY6ffIvygdFLh9iVf4nm1b9ERe55lE1g3P/a EbujqzMbWPFUY+U2U2CV/wYjPtpijrHzNuKBlO76+nrMIUHhSKyc5FMncu3mvzdz Y+HTzp0WTny9c6iDG6YmyjCw5r948wUaHM79sVoNLIKAajTZInaskIqVUiUzirhL QE3ro2eDyAGseT6JHCirkv7v8xnPOMM4+YV926TIZybI9OzHAhb6nVEWXa35JiRB xg6w5q/89zcpn4F1v6f+76lk1jJKFxgBQGQdAk/naEBBWTFVLJtL5Z65VHxXBZXd w66yu0TZr2diYJQmAqMUvBigscsBGu2/quyTxAczLXt7e5VCkjFCH2zjXZaSRLhf 7483lzweY2OjVFpakfDYf77+7byz5omoWvI4zV72pKOCz4TAIeKah5ZR5WcXUPlS 6+u2QejDH16gPx48JUUfB61UdpTQuX++h133RjKJKnI/GZhhBms9OHyZFi+YPncF Ike//OqNtCfIZD3u2pVUufhxYXnyANH0W9ePp1XgsNyz1yylqvsXTrPYdrnJFv76 70/Q6On0pEzPEHw9PT0NMRYdtdjNTgeNBFBUopAKu10pxt61ANvaVV+jh1Z+bdqx rt9ulyI3QMX8DVTOgi+dvdSUpYeYx4dOK9VugizwdGa4QdT3fGUtzV7rIaeB4C++ 0SstvAqsuu0qsGFyNT/bXOPn/n1AmZCaAH0U/cAffkZlJZWKVQ+OjdDH/gP0/rE3 +Ln8YYyA4Tg8AKx76exlyhb9+oKiaGuPAF94clSpRJup2WZ3Pbyc5jz2oHALngh0 Be578U/Zuh+na++coHyH++p1MUKPnDFTdIZD9s3PNM9Sa7mFeRzPFbdgItJY9761 /baQx1jcv+n+J5LYB1Y6W2u2QdgLn17P/fCFlAlquXFBN+HMv3fntXVHjYfY4TWD 82EjgTDRlqeaZ3Vqe55pnr2T97fjmHYOSkj94s0XCQ9prfOL4poKWvadL2ZM5PrP sZQ/R1WGP0emiTLfqOU2QQVHkkbPWbyTkZDirlMKMJ87R1fYkCQB4rr3Ww3KNpu4 +EYPDb7vp3yDLXpnlEVHLbcQhRvYGu+OPhWlmqlTKeTYNKvBiMiVVzk0n1uSvWSr yMGCp9anJRiYhZxJ2iGfWtE0GLCyhLG05vlHNotcIxScoLOvdlPw0gDlC6zDLY6t j44EfcqSqa6S9LD0O09Q2XxHqxYLAYG5fArQud3uGkfWR0cZJpIizytqH39gRogc wONY8FQ95QnK6kSOCF1dx1qSJ0A4GCefSWCsHeP7uY46fVXM+uh6MGneytpkkpkL +uV2mbw5Rmd/9z4NfHSeqpbMoWWNG6mo3PbCCEnBOHvgvX4KB+0Xd8xifPhHuNDj 1WWX5C7Va5faCr5B2Ke7DvL2nG7fObr2/sf00Pe+TmW1s8gpCsuK6e6HV9C1d45T LoJhNW1eunChM9tIkjfUPvYAmSV4fYguvnuCzrEFn2BLHo9bfM57//hLWvXdzYqF d4qaTcvpxv6TuWrV27Un9teS0aEG4TJeIjrbQN0xVBJFccFcAtlmNevvM/UaWOrD P3xNseThiTvlkorLy2hRwyqa/an5ND54U3Hl8bjQ/YFyvOYzi8kJCopYAqGwMhEm l1Ct+e18GKEWXQbh4oN6Y1iYD8UDUTU0V5jNbrtZIHA9EPDctffR/Efuv90nX/LE Wrbmv2KrPqj8Ddceol/+nJecAFY9l9x3vs9QR65dv0+oRV+0aBGqCDq64sRMBELX ygHjgSV+kq3+kaX4SDdkiv7tgqfXk1n8vz6suO4AAbcHnv+iYsULiu/YHAh+wSMP KBZ/8JNLyj5s8bo5a815EEaAVb/Vf02pXpMj/Linp6dLv0PY8NqmTZswc81DkmlA 1FqVULjwWHrX6JpddmqFC8TP32GffofVqjAjZ6/dfg6hJwJihwWHddcY1r1WNJX3 58ykF39vb29b7E5hQg+FQl6SJERfDhilfG/cuHF7nW2tHji2EHYwGFSO4ZyhoSHK NChcwJ8tqiRQ1f2LyCxwvyduBqdev8RYQ6G34E5G4CtslLPKJvBbxdsvso++mSQJ iVcXHILGI9lrZs+eTRmmFUM09fX1Xn13o2y++R6a3iIbFe3kzTvXx8noeyl/H8yf n8nRd26M29ll98c7JkzoqGIxA/udWYsm8lQLBzgJbhx2A3eiW8ZeSJSySy0IXe+2 uw0KHY2DPmCnAe8Agb0gB+xg9UVY+5K7Kil4ccZOdumK57JrCBF6vBtBYo9Zs2Zl VOSku3E4nhBVOciKyIEWRQdGhYk+ur4vD3FjiO4Sj8NrY/DIqBORXIMy03GEjmIs dZTdIIbSmuwEIUKPvREk0zGyxI5GRUWFsqZXBvG73e5m7Q94a/qDqLluhUldcgyS ZeYasMQIyuF1EPbV9z+JyqDTQHLNoe//TGkQ9ME7sxS4o2vaYSyaN2div382gaG0 goKChtiVWWIREozL5guRLYyNjRk6D1YcC/plEFiHhpjF+6ICcYWl1oo86gNrWuZb skg6rPepn/to/4uv0kne6kWOBBsMwblrp2IYaAxwLsbcrVJYFtWA+fnRDiFRFsP3 S3MqkQNRZmM1SRKCgJtRi57h7Dm/WvDfH7M/yle3atHnrP2U4mJ/+OpbihsPsfew JdYPo2mTW66x9R4+Oz1bLV6CDQSO1wAIHY3HCn5PO668tn7Zhg0bAjZXSXWS1oMH D3YZOVGU0GX/PAEYL0eyjFGQTJMhEokcCPPYaj6ziMX+TFTmG4QKYYN4rjmsN4QN jwCvjwUNBUSvWXP04Ue4kVj/gz+3NANOjV534jn/foFsDDJrgVKj54sSunTd4wBL EAgETPXPM3RTJRO5cGBp1//gm4owNUscT+Cw3uh3Y1gtlWCnzptLR/9lamFIeAsQ /PxHTE+6iYpec/+3L9ssuiryNjOvsS30uro6ac3jYEXkgG8sSjNJRa7WF4jaNy4g VVTLfNNbYgDrvfiJNYorr4l78qax+Aa6BmgctEajrNZcDkJBcWGfPggJ1BwCWPWs uM+tiBzYFnpZWVl1FvdhMgZErqWvIisOUXRNxHDn0QAgHTYWZMql0X23ZMlF1lqD JUaf+ypbX4hU75rrh9LWct/ebMKMufNdfXd5P9vwZvsr04JvfI0wxOalDGNV5ECE 6+4hSRRo+CButg5JJ7BA7FoarH5fmjAkcg4kBmIbHggdGWSilliqZEFWxhHlqZ93 347KGxWtlpQDb8B4/5yFXEgNnQ2tiSLsRymDQleH0Fq1uIEV0u4n5gMQdmVlJbyd pH1uDKVVV1cr4+Ya8ay8A5/Px43QGiOWvK+vL+7Nn45yyZrI3YbTZc3n0vPV8KUQ Oa6Xoci2Q/hZ6GiQO8kGGc3KkEyBcXO49fpJLk4F5fi9d7NlaCJz+CnGcwteCtha 1zwV2lRWMBVY+0TpgydDPyZv0Jrv6vx8a8pCKVhfPEP99D7+P7ccPnzYTzYRYdH9 JLENrL9WlMIpq6728ZrIPNPW5Bv+8AI5CYTq1gXTEE1PlQyDvrxGSlc/Emnt/Pzf GK6GxA3xLkovu7hBXiNqJES67lkExI6JLKLTX9WKI81WAznMvtgdKL3k5EwvCB3j 7XqxQ+ixYoe7jn093/8vpQ6dRkLX3eXyU6FrTecXXjA8Bg04VrEzHVlyan98C4tc aEk227Mmzp8/H1i4cGEL30hlJLEN+u2Ch9j8/H4b4X6SRRYvXozftil2f1FVGbkX 301OoVWaQQ05zS3XIvHYd7rrEH20+21l3/jgnZEANA6er6yL577vYpE/y/1xP5nk 8uXLQb4ObnI2KNfF3biGd9991+CqxsYR0hFcv379EcqepBkEL6qzZdwzk6A/zjdO S0zeuiXi/caYxYalkdNBPGseC4bnlvAYPLZRIocVjxC76q22gmrIGeERCFwHD4kF IyDNdhrjVAiZB8ktHeYRZoPQd3E0+VkeokID5qU8RXXV/45d9e/5/f4gCWDRokWw Zl/S7wuNBKli2dy0LKoI8cId/+OxMxSeuFNeCwk2sN6rv7tZqSJbMf+uqPpzpFnx x1ttW0nVqiP1rpEEpH2rbjrqu21hz9hPDiLEomfByqlRLSJa3pKSkv48ter+cDiM SK1Q9y+RNUPk/d7n7a/UYhRE40+8+hYLvJQWP7E2bu77FDxsFqH2zi+0+kgwarZg N1m07KrAd3FMZqcIb8sIQoSeYWHBirfFXrCNGze28A2/g/KLuNdCFKjbr97gUcz7 kzVZtI6ZcwLXg3uehdrC12O7kfNVcaPrsNtJFz0RwgZrWVh7WFiNlD4wxtia7KJx vxI3pZdyH8f7eBos9rbYmxuln+/7268Ky5SzRnoEHgusO2/QAG6GoeOtRz2ExtbP j31IoeVGoS9d1jsewoSeqLUXjVacnvs1KYdH8CNw43Mkx114R614POKJPd0u/B0y I/CZhrCiZAgmcMAGC2RvIAfQAhcItu3fv99n5DUY+luyZMkYv/ZLlGMgjRVWnBu8 fxUVcDMKX1cfB6WiAp5Tix+4lOCc47hcAb4hfkxFBVs4yPbTvp+95SdJUoTmWaoB G1h1YRF4EYELduFh/XNi8UczHo3TqG5rB38mr7ZvwVPrafZaDwlnSty7KeLqktbb PMITqu1GJDVERybr6+v3sEDSGUMQDgSezkitUfjaNvJvtQ2CR3/93ucfs1wpNhp2 yylyVIrbPo6VM7FiRVVxY1ioXXRgyQlvI410qYFHP2UxWmCqqKJs84I/2+QpX1Jr /FpPJbX4+I48SmHqoyLqSzajTGIOR+sW4YfnGxTDXI9SHIGpbihSNPeFQiFfeXm5 z0lrpQ4DdswUy45+ODnQ6KWLpu4d1TTBnp2Lqm8/NMIEYQcoRIHOL5tPSXUCtaHy zNTrnYy0FijTLiSpM94yZaHiRY2zCbWe+O5cvOEygdfrrU5lQNRRow61+msn5Rh5 u4aSms0HsXsoC8hEtlS+gBgCCxjJUz6tjLN2bN26dXWIL9DUpB0/BznNL/o+A8jr xdJUDwPWfStlCHWYbBfHD3xS4M6hjxmpXUbEgjwU3dDvEj09NFuQqyJS+gWv9r33 SeudXljs/ZTEg1Nr6PkoB5FC16ETPIKHHhKEakF8/HSf2+3ulOLODKmyN/k3Wprt IxtWkTXjdKg/chOeq303Lz/VRG9oqEgbSYBryM+P8oiDT/RMMok1gsFgXwZXwsko 0qKbAOIvLCzUhog86tavbdkVD0hrnd2kcN9bsyHj0Amk0CV5BUfgB5JMcsrZqLss DinJGzZt2lSXYiajhxuCNspBpNAleUMoFLqdko2kJI6hbEEADtF23tVKU/P6tyNo RzmGDMZJ8gkvqYsixETX8dzHj52qyD0kkUhmHhCwmjQjkUgkEolEIpFIJBKJRCKR SCTO8f8Sw1p3XxsDBAAAAABJRU5ErkJggg==
`,
        Bk = `
data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAKkElEQVR4Ae2dQW8bxxmGv9ldGmikJFQBO4bdWERiA40OkQrIl+QgGkjbS4rYaN2iJ4f9A61/gaV/kPyB0j61hY0qBYoe0oOpg32RgUg9OAGcoEycCk4MWFQsqYBJ7mTeJdehKFLcXc7sDnfmAShSFFei9nvnnW9mvh0yUsBqlRebtFci8hcY8RIjNovnOZF4jhfFfbH39eLnJTIQTrze+704D/XO89RgTDzm/g4Xz+F5j6Y3LlVYgyTDSAKdgD+96BAt+cTLpgZUNSJYdZ9oQzz8R4EKtUuVH9VpTMYSwM3q07LQ6zXxsEyW1BHBuy4c4sblyos1SkgiAdjAa0fNo0IliSPEEgCsvkW7IvD8T2TRELYs3GAl1hFRX7ha/X+pTc3bnUTOoivIE1wqXIjqBk6UF9368+4VEfxPbPD1BzFqiVj9rfrdxSivHymAW9XdP3LmX+8fulm0pigCuypytWujXnikAPALOPkfkGVC4ct/re4cma8NzQFgIVARWSYexp33f/OH6RsDfzboyW7C94m1/dzQEMPEnw1KDAd2Ad1s3wY/PxQR09Xq9qGYHhJAp9+32X7e6IwOvENJ4YEuANYvhhD/JUuOYRd6p44POIAIfpUsOYcfcIHnAujM79u5fQMod2Md8FwAjPErZDGEH1wgyAFs328eHrVnLlVmGoEDNKlZJotR+OQGawWBABxG75HFKMSwcAn3Tve7BbKYRhlfGGaHWuRuk8U4kAc4YnbItn5DaYrZQYcTL5HFSFxyFxxmBWAsvoi9EIBd9TMVXLDjiCnAWbIYi8e5dYC4FI4xcRPW+WNGx8R9odB5rpf9PU57u5yaz4gaTzjpCGdU8sgykuMnGRVnGL0849AJ8fiF6fjX0zx+xIUQfNr62g8e6wDnvOihUEDKBYI5Aq359BlGp37iiuAfbt1JgIiOn3Tp3JxL+8IZ/vfQpwef+sHjrBD9f9E6QA8I0tybnrB2OUEfBhzk3BtucHtwv00PPstOCMYLAIE+94YT3FQGfRhwhNNnHLq/2ab6Fz6ljbECQCuce9Oh0lmXsgbvZfFtT9y3AyGkiccMKwDVKfD9zM279MIU0b276YgA+Z8xDgB7n5t3gn5XZ0JhpiUCIwSA/h2tK4s+PgkQwf4epdId5FoAyOrnF71gwmbSgGAfPxJzBt+oHR1Eujx80kBLnz/v0tIvChMZ/JDzIjHEjKNKcicABPzn73ra9/VRCOcLVJIrAaCvf+fdQqKpWl2BAFS6QC4EAMuH3c+fz19Kg+CrdIGJF0Bo+Uj48ooVwBBKrzui5Xu5svxBwAWOv6Lmf5xYAWCYtBhkyWasZZ46oyZUEymAxbfdQAAmcfpVNaGaqKwJrf2tcr77+2Ggm8NN9rLxxDhAJ9PPNvjNZzwo78J9XBC4pMeGnFCQB0yEA0D55QyTPQRu817rQCkXhHj+rdHvaZxj+1Hx/2vvAFkHHy137ePWoTo+fP/vfzaPLPgcdWxcOzdOAFkHH9REAIfZNip+N9dbiY9dvzP82EFMTRkkgDDhyzL4aN2jWilW6wa5AFp5lGPjuMDUNElHWwEg4ct6Ja+xHS04g17X2I5W3/et4uXeUWgpACzl6rCMG7V1DnodLD7psWminQAwwaPLUq7qtfi4fyP3SWBYuqULU9PRTg+uGuonarDiJHYq3EIbAcDydVvOxQJMlBY6qLuKOnWb9aymFgJAa0HGrxtR1uLhWoNae5Rj4xaqPouYV8RBCwFkPdw7CgRx2FJsUHR6hGshwIO6B4Cl7LjdXVOBADJvdsFJ0rhwEy156ZcFqn/epq2vO3P5aLWl15yRS7Q49p1fHTx2Sgh99jU3kfXv7cnPATIVQHAx5oQs66JWv3SWEjHOsb3kKgmE5WNBxBId7C8gm8wEgOvz8l7KJRtcLSSbTASABEjHizN1RtVWM6kLILg617ByLhmo2mcodQFY609G1MWluKQqAATeWn8yth7mQAAo7rAkQ9XOYqkJAImftf5kbD1Ut2ScmgBs4pecra/UbRSRigBs6x8PlVVDqQjAtv7kwP5VVg0pF4Bt/eNR/zxe5XBclAvAtv7koOWrTACBUgEcT7ixsqVDGruEKRXAuZ/a1p8UzP2nUTKuTABo+aquaTcB7CaeRsm4sgideMVaf1JQOZTWnsHKBHA2B9u0ZUWanyOgRACw/0neoDFLEHgIIC2UCMDaf3Jg/eNsIhEXJQI49apN/pKAD4xI+0MjlETKxD18xgXWn/aHRQDpAkDfb8rWbTLZWG9ncqWwdAHgEy90II2Tub/LpfTXaPmqKn5GocAB9Oj/v32k/oSivx7X7R582s7E+kPkC2Ame/vHSVVRQ9+LjISt/kWbNtezCz6QLoCs+3/YMk6qSiHKSNgQ/Ht3sg0+kF6lmcauGsNAf4yduTrvQ40Awr8R5hjhxaJxgENl3fJDpDvAsQwFsH5HbSaNYK/1BB/E6QZw/N3bLW2CD3JTp92fSXeyc3kuEAa//wod/F3sBnJU3QOOxfQubmnO8kUhFwIYlEnLvJYeLf5urTXw8iys2//r782g9G32dTf43OHwebz+8TdIFrl2gQ+RLgD802lWAQ3LpLe+8qXsNob/B8Ef1bVkMY0rA+kCULGLxTCOyqSxCyeuphlnWrrjLPrZtkykJ4E7T9I5WVGGUet3W4mSQghn7eNm4Cx5Dj6Q7gAoZVoktaC/jzIOR/AxZIu64TQCf/8/LWXX4emIJ/7VusxPEEfyM671Dv/dPBjqxZk3hwjCJO1UN1sPh6rPuonazrbeiZoqRITqSkYB9zdbtHSyQDKBqJJaOpjUJE01SlZukIDJWuBAq0RfjD45642V84iyeYBQAEmvDNJ58iRPeIxYg0jNCYYIYLvYDi5KTtD5UCYx/PqsHVi+DbxaOAtyAN4ghXQ+N6fZrRTGcrFIxHp2yN4X8wa4IRlrPLEBTxsI4EuZc+bDgBD2d9VudmCJB+d8x5bvmk0dAqiTxUiE7zccTqxOFiNxROydAjkbZDESHwIQg686WYzEo9aGc6ky0+A2DzAOTryO2AejAEZ8jSymsYkvgQBEIlgji2Gwj/A1EECB2h+RxSja1K7hPhAA+gJxVyOLEYjx//XfV2bqeNwzE8hWyGIEosu/ET5+LoDLlRdrZF0g/zCqdWMd0LcWYF0g77R4u9L7/QEBQBliSPghWXIKXwn7/pBDq4Eu+cuYJCBLrkBML1deXu5//pAAMCJok38BK0VkyQk8iOmgnwysB4BN+ERXyZILxKJPpd/6Q4YWhPy28tJ1oRwrgomHr/yu8tLQib6RtWA3qzvL4mXXyDKB8Kui3//gqFdEKga8Vf3uoririlXDIlkmAC5W+djVXwcufjSRq0H/Ut0uueTcZsRKZNEWZPtI+Ib1+f3ELge2XYK+iOB/WBDD+O7aTiQS1YPDDTzmVsVfLJMle8T0LnG20jvFG/3QMbhZfVoWg4z3xa+5Qpb0GSPwP/wKCXTyA7fsMHrP53zB5glqQP/uMFbzOa2hhiOO1Q9DySVBq9XtYou8BfGGS2JtoYTRg3jjs+EognNeOvgmWIkMpH/KnTHMvrIG69ZoivP0Zads39koULMuI+D9fA+fpXSL3JH8YAAAAABJRU5ErkJggg==
`
    }
    );
    var ap, Tk = C( () => {
        "use strict";
        h();
        Hh();
        tp();
        ap = class r {
            static hasBeenShown = !1;
            shouldShowPopup() {
                return window._phantomShowMetamaskExplainer && !r.hasBeenShown && !this.hasBeenDismissed() && !pk()
            }
            hasBeenDismissed() {
                return window.localStorage.getItem("phantomwallet-metamask-explainer-dismissed") === "true"
            }
            setHasBeenDismissed() {
                window.localStorage.setItem("phantomwallet-metamask-explainer-dismissed", "true")
            }
            findFaviconUrl() {
                let e = document.querySelectorAll('link[rel="icon"], link[rel="shortcut icon"], link[rel="apple-touch-icon"]');
                return e.length > 0 ? e[0].href : ""
            }
            showPopup = () => {
                let e = document.createElement("link");
                e.href = "https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap",
                e.rel = "stylesheet",
                document.head.appendChild(e);
                let t = document.createElement("div");
                t.style.fontFamily = "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif",
                t.id = "metamask-explainer",
                t.style.transform = "scale(0.9125) translateY(15px)",
                t.style.willChange = "transform",
                t.style.opacity = "0",
                t.style.transition = "all 300ms cubic-bezier(0.16, 1, 0.3, 1)",
                t.style.width = "262px",
                t.style.position = "fixed",
                t.style.top = "20px",
                t.style.right = "20px",
                t.style.zIndex = "99999",
                t.style.background = "#222",
                t.style.backgroundClip = "border-box",
                t.style.border = "1px solid rgba(80, 80, 80, 0.2)",
                t.style.borderRadius = "4px",
                t.style.fontSize = "13px",
                t.style.padding = "1.5em",
                t.style.boxShadow = "0px 54px 22px rgba(24, 24, 27, 0.02), 0px 31px 18px rgba(24, 24, 27, 0.07), 0px 14px 14px rgba(24, 24, 27, 0.12), 0px 3px 7px rgba(24, 24, 27, 0.14), rgba(24, 24, 27, 0.3) 0px 0px 2px 0px",
                t.style.userSelect = "none",
                t.style["-webkit-font-smoothing"] = "antialiased",
                t.style.MozUserSelect = "none",
                t.style.msUserSelect = "none";
                let n = document.createElement("div");
                n.style.display = "flex",
                n.style.flexDirection = "column",
                n.style.justifyContent = "center",
                n.style.gap = "1em",
                n.style.marginBottom = "1em",
                t.appendChild(n);
                let o = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                o.setAttribute("width", "8"),
                o.setAttribute("height", "8"),
                o.setAttribute("viewBox", "0 0 8 8"),
                o.setAttribute("fill", "none"),
                o.style.width = "0.8em",
                o.style.height = "0.8em",
                o.style.display = "flex",
                o.innerHTML = `
    <path d="M1 1L7 7M7 1L1 7" stroke="currentColor" stroke-linecap="round"></path>
    `;
                let s = document.createElement("div");
                s.id = "metamask-explainer__close-button",
                s.style.position = "absolute",
                s.style.top = "0.5em",
                s.style.right = "0.5em",
                s.style.padding = "0.5em",
                s.style.cursor = "pointer",
                s.style.color = "rgb(153, 153, 153)",
                s.style.borderRadius = "6px",
                s.style.transition = "all 300ms cubic-bezier(0.16, 1, 0.3, 1)",
                s.tabIndex = 1,
                s.addEventListener("mouseover", () => {
                    s.style.color = "#fff",
                    s.style.background = "#333"
                }
                ),
                s.addEventListener("mouseout", () => {
                    s.style.color = "rgb(153, 153, 153)",
                    s.style.background = "none"
                }
                ),
                s.addEventListener("click", () => {
                    t.style.opacity = "0",
                    t.style.transform = "scale(0.96) translateY(10px)",
                    setTimeout( () => t.remove(), 300)
                }
                ),
                s.appendChild(o),
                t.appendChild(s);
                let i = document.createElement("div");
                i.id = "logo-container",
                i.style.display = "flex",
                i.style.flexDirection = "row";
                let u = document.createElement("img");
                u.src = Rk,
                u.style.height = "2.7em",
                u.style.position = "relative",
                u.style.outline = "2px solid #222",
                u.style.background = "#222",
                i.appendChild(u),
                n.appendChild(i);
                let f = document.createElement("div");
                f.style.display = "flex",
                f.style.flexDirection = "column",
                f.style.gap = "0.25em",
                f.style.lineHeight = "1.2",
                n.appendChild(f);
                let g = document.createElement("div");
                g.id = "metamask-explainer__header",
                g.textContent = "Phantom now supports Ethereum & Polygon!",
                g.style.color = "#ffffff",
                g.style.fontSize = "1.125em",
                g.style.fontWeight = "600",
                g.style.fontFamily = "Inter",
                f.appendChild(g);
                let b = document.createElement("div");
                b.style.display = "flex",
                b.style.flexDirection = "column",
                b.style.gap = "1em",
                b.style.alignItems = "flex-start",
                t.appendChild(b);
                let E = document.createElement("div");
                E.id = "metamask-explainer__body",
                E.textContent = "Connecting with MetaMask will give you the option to use Phantom.",
                E.style.color = "#ffffff",
                E.style.fontSize = "1em",
                E.style.fontWeight = "400",
                E.style.lineHeight = "1.4",
                E.style.fontFamily = "Inter",
                b.appendChild(E);
                let q = document.createElement("div");
                q.id = "metamask-explainer__dont-show-again-button",
                q.textContent = "Don't show again",
                q.style.cursor = "pointer",
                q.style.color = "#AB9FF2",
                q.style.fontSize = "1em",
                q.style.fontWeight = "400",
                q.style.lineHeight = "1.2",
                q.style.transition = "color 300ms cubic-bezier(0.16, 1, 0.3, 1)",
                q.tabIndex = 1,
                q.addEventListener("mouseover", ({target: O}) => {
                    O.style.color = "#ffffff"
                }
                ),
                q.addEventListener("mouseout", ({target: O}) => {
                    O.style.color = "#AB9FF2"
                }
                ),
                q.addEventListener("click", () => {
                    t.style.opacity = "0",
                    t.style.transform = "scale(0.96) translateY(10px)",
                    setTimeout( () => t.remove(), 300),
                    this.setHasBeenDismissed()
                }
                ),
                b.appendChild(q),
                document.body.appendChild(t),
                setTimeout( () => {
                    t.style.transform = "none",
                    t.style.opacity = "1"
                }
                , 0),
                r.hasBeenShown = !0
            }
        }
    }
    );
    function Pk(r, e) {
        window.dispatchEvent(new CustomEvent("eip6963:announceProvider",{
            detail: Object.freeze({
                info: r,
                provider: e
            })
        }))
    }
    var zk, Mk, Kh, Dn, Wh = C( () => {
        "use strict";
        h();
        hs();
        zk = je(Ss());
        K();
        Tk();
        Hh();
        _i();
        za();
        Mk = 1,
        Kh = class extends zk.EventEmitter {
            _injectionEndMs = null;
            _injectionStartMs = null;
            isPhantom = !0;
            isMetaMask = !0;
            #e;
            constructor(e) {
                super(),
                this.#e = e,
                this.#e.start(),
                this.selectedAddress = null,
                this.chainId = "0x1",
                this.networkVersion = "1",
                this.request = this.request.bind(this),
                e.addListener(t => {
                    let n = jr.safeParse(t);
                    n.success && this.handleNotification(n.data)
                }
                ),
                this.#t(),
                this.emit("connect", {
                    chainId: this.chainId
                })
            }
            #t = () => {
                this.addListener("accountsChanged", e => {
                    let[t] = e;
                    t ? (this.selectedAddress = t.toLowerCase(),
                    this.request({
                        method: "eth_chainId",
                        params: []
                    })) : this.selectedAddress = null
                }
                )
            }
            ;
            isConnected() {
                return navigator.onLine
            }
            request = async e => {
                let t;
                try {
                    let {method: n} = e
                      , o = "params"in e ? e.params ?? [] : []
                      , s = Gs[n];
                    if (!s)
                        throw new Error("MethodNotFound");
                    let i = s.request.safeParse({
                        jsonrpc: "2.0",
                        id: (Mk++).toString(),
                        method: n,
                        params: o
                    });
                    if (!i.success) {
                        if (n === "personal_sign") {
                            let f = Gs.eth_sign.params.safeParse(o);
                            if (f.success) {
                                let[g,b] = f.data;
                                return this.request({
                                    method: "personal_sign",
                                    params: [b, g]
                                })
                            }
                        }
                        if (n === "eth_signTypedData") {
                            let f = Gs.eth_signTypedData_v4.params.safeParse(o);
                            if (f.success)
                                return this.request({
                                    method: "eth_signTypedData_v4",
                                    params: f.data
                                })
                        }
                        throw i.error
                    }
                    let u = i.data;
                    if (t = s.response.parse(await this.#e.send(u)),
                    "error"in t)
                        throw new Ve(t.error);
                    try {
                        if (n === "eth_requestAccounts") {
                            let f = t.result?.[0].toLowerCase();
                            f !== this.selectedAddress && this.emit("accountsChanged", [f])
                        }
                        if (n === "eth_accounts") {
                            let f = t.result?.[0]?.toLowerCase();
                            f && f !== this.selectedAddress && (this.selectedAddress = f)
                        }
                        if (n === "eth_chainId") {
                            let f = t.result;
                            f !== this.chainId && (this.chainId = f,
                            this.networkVersion = parseInt(f.substring(2), 16).toString(),
                            this.emit("chainChanged", this.chainId))
                        }
                        if (n === "wallet_addEthereumChain") {
                            let f = u.params[0].chainId;
                            f !== this.chainId && (this.chainId = f,
                            this.networkVersion = parseInt(f.substring(2), 16).toString(),
                            this.emit("chainChanged", this.chainId))
                        }
                        if (n === "wallet_switchEthereumChain") {
                            let f = u.params[0].chainId;
                            f !== this.chainId && (this.chainId = f,
                            this.networkVersion = parseInt(f.substring(2), 16).toString(),
                            this.emit("chainChanged", this.chainId))
                        }
                    } catch (f) {
                        console.error("event emitter error", f)
                    }
                    return t.result
                } catch (n) {
                    throw n instanceof Ve ? n : n instanceof jt ? new Ve({
                        code: -32e3,
                        message: "Missing or invalid parameters."
                    },{
                        method: e.method
                    }) : n instanceof Error && n.message === "MethodNotFound" ? new Ve({
                        code: -32601,
                        message: `The method ${e.method} does not exist / is not available.`
                    },{
                        method: e.method
                    }) : new Ve({
                        code: -32603,
                        message: "Internal JSON-RPC error."
                    },{
                        method: e.method
                    })
                }
            }
            ;
            selectedAddress;
            chainId;
            networkVersion;
            enable() {
                return this.request({
                    method: "eth_requestAccounts",
                    params: []
                })
            }
            sendAsync(e, t) {
                let n = "id"in e && typeof e.id < "u" ? e.id : null;
                this.request(e).then(o => t(null, {
                    jsonrpc: "2.0",
                    id: n,
                    result: o
                })).catch(o => t(o, null))
            }
            send(e, t) {
                return typeof e != "string" ? this.sendAsync(e, t) : this.request({
                    method: e,
                    params: t
                })
            }
            _metamask = {
                isUnlocked: () => !!this.selectedAddress
            };
            handleNotification = async e => {
                switch (e.method) {
                case "phantom_accountChanged":
                    {
                        let t = er.phantom_accountChanged.notification.safeParse(e);
                        if (!t.success)
                            return;
                        let n = t.data.params?.evm?.toLowerCase() ?? null;
                        n !== this.selectedAddress && this.emit("accountsChanged", n ? [n] : []);
                        break
                    }
                case "phantom_trustRevoked":
                    {
                        let t = er.phantom_trustRevoked.notification.safeParse(e);
                        if (!t.success)
                            return;
                        t.data.params?.evm?.toLowerCase() === this.selectedAddress && this.emit("accountsChanged", []);
                        break
                    }
                case "phantom_chainChanged":
                    {
                        let t = er.phantom_chainChanged.notification.safeParse(e);
                        if (!t.success)
                            return;
                        let n = t.data.params?.evm?.toLowerCase() ?? null;
                        n && n !== this.chainId && (this.chainId = n,
                        this.networkVersion = parseInt(n.substring(2), 16).toString(),
                        this.emit("chainChanged", n));
                        break
                    }
                }
            }
            ;
            removeAllListeners = e => {
                try {
                    return super.removeAllListeners(e)
                } finally {
                    this.#t()
                }
            }
        }
        ,
        Dn = class r extends Kh {
            #e;
            isMetamaskExplainerEnabled = !1;
            static inject(e, t) {
                let n = window;
                n.isPhantomInstalled = !0;
                try {
                    delete window.web3
                } catch {}
                let o = new r;
                if (e) {
                    try {
                        Object.defineProperty(window, "ethereum", {
                            get() {
                                return o
                            },
                            set(i) {},
                            configurable: !1
                        })
                    } catch {
                        console.error("Error redefining provider into window.ethereum")
                    }
                    window.dispatchEvent(new Event("ethereum#initialized"))
                }
                window.phantom || Object.defineProperty(window, "phantom", {
                    value: {},
                    writable: !1
                }),
                Object.defineProperty(window.phantom, "ethereum", {
                    value: o,
                    writable: !1
                }),
                window.dispatchEvent(new Event("phantom#initialized")),
                o._injectionEndMs = window.performance.now(),
                o._injectionStartMs = t;
                let s = {
                    uuid: (Mk++).toString(),
                    name: "Phantom",
                    icon: Bk,
                    rdns: "app.phantom"
                };
                try {
                    window.addEventListener("eip6963:requestProvider", () => {
                        Pk(s, o)
                    }
                    ),
                    Pk(s, o)
                } catch {
                    console.error("PHANTOM error announcing multi-injection provider")
                }
            }
            initializeMetamaskExplainer = async () => {
                this.#e || (this.#e = new ap),
                this.#e.shouldShowPopup() && this.#e.showPopup()
            }
            ;
            constructor() {
                super(new gn),
                document.addEventListener("DOMContentLoaded", () => {
                    this.initializeMetamaskExplainer()
                }
                )
            }
        }
    }
    );
    var cp, Lk = C( () => {
        "use strict";
        h();
        Wh();
        _i();
        cp = class r {
            w = window;
            _injectionEndMs = null;
            _injectionStartMs = null;
            static inject(e) {
                let t = window;
                t.isPhantomInstalled = !0,
                Dn.inject(!1, e);
                let n = new r;
                for (let s of t.providers ?? [])
                    n.addProvider(s);
                t.ethereum && n.addProvider(t.ethereum);
                let o = new Proxy(n,{
                    get(s, i, u) {
                        return Reflect.get(s, i, u)
                    }
                });
                Object.defineProperty(window, "ethereum", {
                    get() {
                        return o
                    },
                    set(s) {
                        s && n.addProvider(s)
                    },
                    configurable: !0
                })
            }
            initCallbacks = [];
            targetProvider;
            detected = [];
            #e = e => {
                this.initCallbacks.push(e)
            }
            ;
            setProvider = e => {
                if (!this.targetProvider && e !== this) {
                    this.isSelectingExtension = !1,
                    this.targetProvider = e;
                    for (let t of this.initCallbacks)
                        t(this.targetProvider);
                    this.initCallbacks = []
                }
            }
            ;
            addProvider = e => {
                this.detected.push(e)
            }
            ;
            isMetaMask = !0;
            get providers() {
                if (!this.w._phantomHideProvidersArray)
                    return this.detected
            }
            get isPhantom() {
                return this.targetProvider?.isPhantom
            }
            get selectedAddress() {
                return this.targetProvider?.selectedAddress ?? null
            }
            get chainId() {
                return this.targetProvider?.chainId ?? "0x1"
            }
            get networkVersion() {
                return this.targetProvider?.networkVersion ?? "0x1"
            }
            isSelectingExtension = !1;
            selectExtension = async () => {
                if (!this.targetProvider && !this.isSelectingExtension) {
                    this.isSelectingExtension = !0;
                    try {
                        let e = this.w.phantom?.ethereum;
                        if (e) {
                            if (!this.detected.length) {
                                this.setProvider(e),
                                window.dispatchEvent(new Event("ethereum#initialized"));
                                return
                            }
                            switch (await e.request({
                                method: "wallet_selectEthereumProvider",
                                params: []
                            })) {
                            case "ALWAYS_USE_PHANTOM":
                            case "CONTINUE_WITH_PHANTOM":
                                {
                                    this.setProvider(e);
                                    break
                                }
                            case "CONTINUE_WITH_METAMASK":
                            case "ALWAYS_USE_METAMASK":
                                {
                                    let[n] = this.detected;
                                    for (let o of this.detected)
                                        o.isMetaMask && this.setProvider(o);
                                    !this.targetProvider && n && this.setProvider(n);
                                    break
                                }
                            }
                        }
                    } catch (e) {
                        console.error(e)
                    } finally {
                        this.isSelectingExtension = !1
                    }
                }
            }
            ;
            request = async (...e) => {
                if (this.targetProvider)
                    return this.targetProvider.request(...e);
                let t = !0
                  , n = new Promise( (o, s) => {
                    try {
                        this.#e(i => {
                            if (!i) {
                                let u = new Ve({
                                    code: -326034,
                                    message: "Internal JSON-RPC error in the EthProviderPrxy."
                                });
                                return s(u)
                            }
                            !this.selectedAddress && e[0].method === "eth_accounts" ? i.request({
                                method: "eth_requestAccounts",
                                params: []
                            }).then(o).catch(s) : i.request(...e).then(o).catch(s)
                        }
                        )
                    } catch (i) {
                        throw console.error(i),
                        i
                    } finally {
                        t = !1
                    }
                }
                );
                for (; t; )
                    await new Promise(o => setTimeout(o, 0));
                return this.selectExtension(),
                n
            }
            ;
            sendAsync = (...e) => {
                if (this.targetProvider) {
                    this.targetProvider.sendAsync(...e);
                    return
                }
                this.#e(t => {
                    t && t.sendAsync(...e)
                }
                )
            }
            ;
            send = (e, t) => typeof e == "string" ? this.request({
                method: e,
                params: t
            }) : this.sendAsync(e, t);
            isConnected() {
                return this.targetProvider?.isConnected?.() ?? !0
            }
            enable() {
                return this.request({
                    method: "eth_requestAccounts",
                    params: []
                })
            }
            _metamask = {
                isUnlocked: () => !!this.selectedAddress
            };
            eventNames = () => this.targetProvider?.eventNames() ?? [];
            listenerCount = e => this.targetProvider?.listenerCount(e) ?? 0;
            listeners = e => this.targetProvider?.listeners(e) ?? [];
            emit = (e, ...t) => this.targetProvider?.emit(e, ...t) ?? !1;
            once = (...e) => (this.targetProvider ? this.targetProvider.once(...e) : this.#e(t => {
                t && t.once(...e)
            }
            ),
            this);
            on = (...e) => {
                if (this.targetProvider) {
                    if (!this.targetProvider.on)
                        return this.targetProvider.addListener(...e);
                    this.targetProvider.on(...e)
                } else
                    this.#e(t => {
                        if (t) {
                            if (!t.on)
                                return t.addListener(...e);
                            t.on(...e)
                        }
                    }
                    );
                return this
            }
            ;
            off = (...e) => {
                if (this.targetProvider) {
                    if (!this.targetProvider.off)
                        return this.targetProvider.removeListener(...e);
                    this.targetProvider.off(...e)
                } else
                    this.#e(t => {
                        if (t) {
                            if (!t.off)
                                return t.removeListener(...e);
                            t.off(...e)
                        }
                    }
                    );
                return this
            }
            ;
            addListener = (...e) => (this.targetProvider ? this.targetProvider.addListener(...e) : this.#e(t => {
                t && t.addListener(...e)
            }
            ),
            this);
            removeListener = (...e) => (this.targetProvider ? this.targetProvider.removeListener(...e) : this.#e(t => {
                t && t.removeListener(...e)
            }
            ),
            this);
            removeAllListeners = (...e) => (this.targetProvider ? this.targetProvider.removeAllListeners(...e) : this.#e(t => {
                t && t.removeAllListeners(...e)
            }
            ),
            this);
            get host() {
                return this.targetProvider ? this.targetProvider.host : void 0
            }
            get path() {
                return this.targetProvider ? this.targetProvider.path : void 0
            }
        }
    }
    );
    var Nk, Ck, Ok, qk = C( () => {
        "use strict";
        h();
        Lk();
        Wh();
        Nk = r => {
            try {
                window.addEventListener("phantom#provider_injection_options", e => {
                    let {hideProvidersArray: t, showMetamaskExplainer: n, dontOverrideWindowEthereum: o} = JSON.parse(e.detail);
                    window._phantomHideProvidersArray = t,
                    window._phantomShowMetamaskExplainer = n,
                    o ? Dn.inject(!1, r) : cp.inject(r)
                }
                , {
                    once: !0
                }),
                window.dispatchEvent(new CustomEvent("phantom#get_provider_injection_options"))
            } catch (e) {
                console.error(e)
            }
        }
        ,
        Ck = r => {
            try {
                window.addEventListener("phantom#provider_injection_options", e => {
                    let {hideProvidersArray: t, showMetamaskExplainer: n, dontOverrideWindowEthereum: o} = JSON.parse(e.detail);
                    window._phantomHideProvidersArray = t,
                    window._phantomShowMetamaskExplainer = n,
                    o ? Dn.inject(!1, r) : Dn.inject(!0, r)
                }
                , {
                    once: !0
                }),
                window.dispatchEvent(new CustomEvent("phantom#get_provider_injection_options"))
            } catch (e) {
                console.error(e)
            }
        }
        ,
        Ok = r => {
            try {
                try {
                    window.addEventListener("phantom#provider_injection_options", e => {
                        let {hideProvidersArray: t, showMetamaskExplainer: n} = JSON.parse(e.detail);
                        window._phantomHideProvidersArray = t,
                        window._phantomShowMetamaskExplainer = n,
                        Dn.inject(!1, r)
                    }
                    , {
                        once: !0
                    }),
                    window.dispatchEvent(new CustomEvent("phantom#get_provider_injection_options"))
                } catch (e) {
                    console.error(e)
                }
            } catch (e) {
                console.error(e)
            }
        }
    }
    );
    var Uk, hq, Vh, up, Dk = C( () => {
        "use strict";
        h();
        hs();
        op();
        Uk = je(Ss());
        K();
        _i();
        za();
        tp();
        hq = 1,
        Vh = class extends Uk.default {
            _injectionEndMs = null;
            _injectionStartMs = null;
            isPhantom = !0;
            #e;
            #t;
            constructor(e) {
                super(),
                this.#e = e,
                this.#e.start(),
                this.#t = null,
                e.addListener(t => {
                    let n = jr.safeParse(t);
                    n.success && this.handleNotification(n.data)
                }
                ),
                this.on("accountChanged", t => {
                    t ? this.#t = t : (this.#t = null,
                    this.emit("disconnect"))
                }
                )
            }
            requestAccount = async () => {
                let e = await this.#o({
                    method: "sui_requestAccounts",
                    params: []
                })
                  , t = {
                    address: e.address,
                    publicKey: ep(e.publicKey)
                };
                return this.emit("accountChanged", t),
                t
            }
            ;
            signMessage = async (e, t) => await this.#o({
                method: "sui_signMessage",
                params: {
                    message: e,
                    address: t
                }
            });
            signTransaction = async e => {
                let {networkID: t, transaction: n, address: o} = e;
                return await this.#o({
                    method: "sui_signTransaction",
                    params: {
                        transaction: n,
                        address: o,
                        networkID: t
                    }
                })
            }
            ;
            signAndExecuteTransaction = async e => {
                let {networkID: t, transaction: n, address: o} = e;
                return await this.#o({
                    method: "sui_signAndExecuteTransaction",
                    params: {
                        transaction: n,
                        address: o,
                        networkID: t
                    }
                })
            }
            ;
            handleNotification = async e => {
                switch (e.method) {
                case "phantom_accountChanged":
                    {
                        let t = er.phantom_accountChanged.notification.safeParse(e);
                        if (!t.success)
                            return;
                        let n = t.data.params?.sui;
                        if (!n) {
                            this.emit("accountChanged", null);
                            return
                        }
                        let o = {
                            address: n.address,
                            publicKey: ep(n.publicKey)
                        };
                        Ur(o, this.#t) || this.emit("accountChanged", o);
                        break
                    }
                case "phantom_trustRevoked":
                    {
                        let t = er.phantom_trustRevoked.notification.safeParse(e);
                        if (!t.success)
                            return;
                        let n = t.data.params?.sui;
                        if (!n) {
                            this.emit("accountChanged", null);
                            return
                        }
                        let o = {
                            address: n.address,
                            publicKey: ep(n.publicKey)
                        };
                        Ur(o, this.#t) && this.emit("accountChanged", null);
                        break
                    }
                }
            }
            ;
            #o = async e => {
                let t;
                try {
                    let {method: n} = e
                      , o = "params"in e ? e.params ?? [] : []
                      , s = bc[n];
                    if (!s)
                        throw new Error("MethodNotFound");
                    let i = s.request.safeParse({
                        jsonrpc: "2.0",
                        id: (hq++).toString(),
                        method: n,
                        params: o
                    });
                    if (!i.success)
                        throw i.error;
                    let u = i.data
                      , f = await this.#e.send(u);
                    if (t = s.response.parse(f),
                    "error"in t)
                        throw new Ve(t.error);
                    return t.result
                } catch (n) {
                    throw n instanceof Ve ? n : n instanceof jt ? new Ve({
                        code: -32e3,
                        message: "Missing or invalid parameters."
                    },{
                        method: e.method
                    }) : n instanceof Error && n.message === "MethodNotFound" ? new Ve({
                        code: -32601,
                        message: `The method ${e.method} does not exist / is not available.`
                    },{
                        method: e.method
                    }) : new Ve({
                        code: -32603,
                        message: "Internal JSON-RPC error."
                    },{
                        method: e.method
                    })
                }
            }
        }
        ,
        up = class r extends Vh {
            static inject(e) {
                let t = window
                  , n = new r;
                t.phantom || Object.defineProperty(window, "phantom", {
                    value: {},
                    writable: !1
                }),
                Object.defineProperty(window.phantom, "sui", {
                    value: n,
                    writable: !1
                }),
                n._injectionEndMs = window.performance.now(),
                n._injectionStartMs = e
            }
            constructor() {
                super(new gn)
            }
        }
    }
    );
    var Fk, pp, jk = C( () => {
        "use strict";
        h();
        Vo();
        Fk = (g => (g.STANDARD__CONNECT = "standard:connect",
        g.STANDARD__DISCONNECT = "standard:disconnect",
        g.STANDARD__EVENTS = "standard:events",
        g.SUI__SIGN_AND_EXECUTE_TRANSACTION = "sui:signAndExecuteTransaction",
        g.SUI__SIGN_TRANSACTION = "sui:signTransaction",
        g.SUI__SIGN_PERSONAL_MESSAGE = "sui:signPersonalMessage",
        g.SUI__REPORT_TRANSACTION_EFFECTS = "sui:reportTransactionEffects",
        g.SUI__SIGN_AND_EXECUTE_TRANSACTION_BLOCK = "sui:signAndExecuteTransactionBlock",
        g.SUI__SIGN_TRANSACTION_BLOCK = "sui:signTransactionBlock",
        g))(Fk || {}),
        pp = class r {
            #e = {};
            #t = "1.0.0";
            #o = "Phantom";
            #s = Ko;
            #r;
            #n = null;
            constructor(e) {
                new.target === r && Object.freeze(this),
                this.#r = e,
                e.on("accountChanged", this.#h, this),
                e.on("disconnect", this.#i, this)
            }
            get version() {
                return this.#t
            }
            get name() {
                return this.#o
            }
            get icon() {
                return this.#s
            }
            get chains() {
                return Hp
            }
            get accounts() {
                return this.#n ? [this.#n] : []
            }
            get features() {
                return {
                    "standard:connect": {
                        version: "1.0.0",
                        connect: this.#c
                    },
                    "standard:disconnect": {
                        version: "1.0.0",
                        disconnect: this.#i
                    },
                    "standard:events": {
                        version: "1.0.0",
                        on: this.#g
                    },
                    "sui:signPersonalMessage": {
                        version: "1.0.0",
                        signPersonalMessage: this.#p
                    },
                    "sui:signTransaction": {
                        version: "2.0.0",
                        signTransaction: this.#a
                    },
                    "sui:signAndExecuteTransaction": {
                        version: "2.0.0",
                        signAndExecuteTransaction: this.#u
                    },
                    "sui:reportTransactionEffects": {
                        version: "1.0.0",
                        reportTransactionEffects: this.#f
                    },
                    "sui:signAndExecuteTransactionBlock": {
                        version: "1.0.0",
                        signAndExecuteTransactionBlock: this.#m
                    },
                    "sui:signTransactionBlock": {
                        version: "1.0.0",
                        signTransactionBlock: this.#l
                    }
                }
            }
            #c = async e => {
                let t = await this.#r.requestAccount();
                return this.#h(t)
            }
            ;
            #i = async () => {
                this.#n && (this.#n = null,
                this.#d("change", {
                    accounts: this.accounts
                }))
            }
            ;
            #p = async e => {
                let {account: t, message: n} = e;
                if (!t || !n)
                    throw new Error("Invalid input");
                await this.#w();
                let {signature: o, message: s} = await this.#r.signMessage(n, t.address);
                return {
                    signature: o,
                    bytes: s
                }
            }
            ;
            #a = async e => {
                let t = await this.#y(e)
                  , {signature: n, transaction: o} = await this.#r.signTransaction(t);
                return {
                    signature: n,
                    bytes: o
                }
            }
            ;
            #u = async e => {
                let t = await this.#y(e)
                  , {signature: n, transaction: o, digest: s, effects: i} = await this.#r.signAndExecuteTransaction(t);
                return {
                    signature: n,
                    bytes: o,
                    digest: s,
                    effects: i
                }
            }
            ;
            #f = async e => {}
            ;
            #l = async e => {
                let {account: t, transactionBlock: n, chain: o} = e
                  , s = await this.#y({
                    account: t,
                    transaction: n,
                    chain: o
                })
                  , {signature: i, transaction: u} = await this.#r.signTransaction(s);
                return {
                    signature: i,
                    transactionBlockBytes: u
                }
            }
            ;
            #m = async e => {
                let {account: t, transactionBlock: n, chain: o} = e
                  , s = await this.#y({
                    account: t,
                    transaction: n,
                    chain: o
                })
                  , {digest: i} = await this.#r.signAndExecuteTransaction(s);
                return {
                    digest: i
                }
            }
            ;
            #g = (e, t) => (this.#e[e]?.push(t) || (this.#e[e] = [t]),
            () => this.#x(e, t));
            #d(e, ...t) {
                this.#e[e]?.forEach(n => n.apply(null, t))
            }
            #x(e, t) {
                this.#e[e] = this.#e[e]?.filter(n => t !== n)
            }
            #h = e => (e && (this.#n = new en({
                address: e.address,
                publicKey: e.publicKey,
                chains: this.chains,
                features: Object.values(Fk)
            }),
            this.#d("change", {
                accounts: this.accounts
            })),
            {
                accounts: this.accounts
            });
            #y = async e => {
                let {account: t, transaction: n, chain: o} = e;
                if (!t || !n || !o)
                    throw new Error("Missing required fields: account, transaction, or chain");
                let s = await this.#b(n);
                return await this.#w(),
                {
                    transaction: s,
                    address: t.address,
                    networkID: o
                }
            }
            ;
            #b = async e => {
                if (!e || typeof e != "object")
                    throw new Error("Invalid transaction object");
                if ("toJSON"in e && typeof e.toJSON == "function") {
                    let t = await e.toJSON();
                    if (!t)
                        throw new Error("Transaction serialization failed");
                    return t
                }
                if ("serialize"in e && typeof e.serialize == "function") {
                    let t = e.serialize();
                    if (!t)
                        throw new Error("Transaction serialization failed");
                    return t
                }
                throw new Error("Transaction must implement toJSON() or serialize()")
            }
            ;
            #w = async () => {
                if ((!this.#r || !this.#n) && (await this.#c(),
                !this.#r || !this.#n))
                    throw new Error("Failed to establish wallet connection")
            }
        }
    }
    );
    var Hk, Kk = C( () => {
        "use strict";
        h();
        Vo();
        Dk();
        jk();
        Hk = r => {
            try {
                up.inject(r),
                Wo(new pp(window.phantom.sui))
            } catch (e) {
                console.error(e)
            }
        }
    }
    );
    var Wk = {};
    ie(Wk, {
        injectInPageBtc: () => kk,
        injectInPageEvmAsk: () => Nk,
        injectInPageEvmMetamask: () => Ok,
        injectInPageEvmPhantom: () => Ck,
        injectInPageSol: () => gk,
        injectInPageSui: () => Hk
    });
    var Vk = C( () => {
        "use strict";
        h();
        xk();
        Ik();
        qk();
        Kk()
    }
    );
    h();
    (async () => {
        let r = window.performance.now()
          , {injectInPageSol: e} = await Promise.resolve().then( () => (Vk(),
        Wk));
        e(r)
    }
    )();
}
)();
/*! Bundled license information:

ieee754/index.js:
  (*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> *)

buffer/index.js:
  (*!
   * The buffer module from node.js, for the browser.
   *
   * @author   Feross Aboukhadijeh <https://feross.org>
   * @license  MIT
   *)

js-sha3/src/sha3.js:
  (**
   * [js-sha3]{@link https://github.com/emn178/js-sha3}
   *
   * @version 0.8.0
   * @author Chen, Yi-Cyuan [emn178@gmail.com]
   * @copyright Chen, Yi-Cyuan 2015-2018
   * @license MIT
   *)

safe-buffer/index.js:
  (*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> *)

@solana/buffer-layout/lib/Layout.js:
  (**
   * Support for translating between Uint8Array instances and JavaScript
   * native types.
   *
   * {@link module:Layout~Layout|Layout} is the basis of a class
   * hierarchy that associates property names with sequences of encoded
   * bytes.
   *
   * Layouts are supported for these scalar (numeric) types:
   * * {@link module:Layout~UInt|Unsigned integers in little-endian
   *   format} with {@link module:Layout.u8|8-bit}, {@link
   *   module:Layout.u16|16-bit}, {@link module:Layout.u24|24-bit},
   *   {@link module:Layout.u32|32-bit}, {@link
   *   module:Layout.u40|40-bit}, and {@link module:Layout.u48|48-bit}
   *   representation ranges;
   * * {@link module:Layout~UIntBE|Unsigned integers in big-endian
   *   format} with {@link module:Layout.u16be|16-bit}, {@link
   *   module:Layout.u24be|24-bit}, {@link module:Layout.u32be|32-bit},
   *   {@link module:Layout.u40be|40-bit}, and {@link
   *   module:Layout.u48be|48-bit} representation ranges;
   * * {@link module:Layout~Int|Signed integers in little-endian
   *   format} with {@link module:Layout.s8|8-bit}, {@link
   *   module:Layout.s16|16-bit}, {@link module:Layout.s24|24-bit},
   *   {@link module:Layout.s32|32-bit}, {@link
   *   module:Layout.s40|40-bit}, and {@link module:Layout.s48|48-bit}
   *   representation ranges;
   * * {@link module:Layout~IntBE|Signed integers in big-endian format}
   *   with {@link module:Layout.s16be|16-bit}, {@link
   *   module:Layout.s24be|24-bit}, {@link module:Layout.s32be|32-bit},
   *   {@link module:Layout.s40be|40-bit}, and {@link
   *   module:Layout.s48be|48-bit} representation ranges;
   * * 64-bit integral values that decode to an exact (if magnitude is
   *   less than 2^53) or nearby integral Number in {@link
   *   module:Layout.nu64|unsigned little-endian}, {@link
   *   module:Layout.nu64be|unsigned big-endian}, {@link
   *   module:Layout.ns64|signed little-endian}, and {@link
   *   module:Layout.ns64be|unsigned big-endian} encodings;
   * * 32-bit floating point values with {@link
   *   module:Layout.f32|little-endian} and {@link
   *   module:Layout.f32be|big-endian} representations;
   * * 64-bit floating point values with {@link
   *   module:Layout.f64|little-endian} and {@link
   *   module:Layout.f64be|big-endian} representations;
   * * {@link module:Layout.const|Constants} that take no space in the
   *   encoded expression.
   *
   * and for these aggregate types:
   * * {@link module:Layout.seq|Sequence}s of instances of a {@link
   *   module:Layout~Layout|Layout}, with JavaScript representation as
   *   an Array and constant or data-dependent {@link
   *   module:Layout~Sequence#count|length};
   * * {@link module:Layout.struct|Structure}s that aggregate a
   *   heterogeneous sequence of {@link module:Layout~Layout|Layout}
   *   instances, with JavaScript representation as an Object;
   * * {@link module:Layout.union|Union}s that support multiple {@link
   *   module:Layout~VariantLayout|variant layouts} over a fixed
   *   (padded) or variable (not padded) span of bytes, using an
   *   unsigned integer at the start of the data or a separate {@link
   *   module:Layout.unionLayoutDiscriminator|layout element} to
   *   determine which layout to use when interpreting the buffer
   *   contents;
   * * {@link module:Layout.bits|BitStructure}s that contain a sequence
   *   of individual {@link
   *   module:Layout~BitStructure#addField|BitField}s packed into an 8,
   *   16, 24, or 32-bit unsigned integer starting at the least- or
   *   most-significant bit;
   * * {@link module:Layout.cstr|C strings} of varying length;
   * * {@link module:Layout.blob|Blobs} of fixed- or variable-{@link
   *   module:Layout~Blob#length|length} raw data.
   *
   * All {@link module:Layout~Layout|Layout} instances are immutable
   * after construction, to prevent internal state from becoming
   * inconsistent.
   *
   * @local Layout
   * @local ExternalLayout
   * @local GreedyCount
   * @local OffsetLayout
   * @local UInt
   * @local UIntBE
   * @local Int
   * @local IntBE
   * @local NearUInt64
   * @local NearUInt64BE
   * @local NearInt64
   * @local NearInt64BE
   * @local Float
   * @local FloatBE
   * @local Double
   * @local DoubleBE
   * @local Sequence
   * @local Structure
   * @local UnionDiscriminator
   * @local UnionLayoutDiscriminator
   * @local Union
   * @local VariantLayout
   * @local BitStructure
   * @local BitField
   * @local Boolean
   * @local Blob
   * @local CString
   * @local Constant
   * @local bindConstructorLayout
   * @module Layout
   * @license MIT
   * @author Peter A. Bigot
   * @see {@link https://github.com/pabigot/buffer-layout|buffer-layout on GitHub}
   *)

buffer/index.js:
  (*!
   * The buffer module from node.js, for the browser.
   *
   * @author   Feross Aboukhadijeh <https://feross.org>
   * @license  MIT
   *)

@noble/hashes/esm/utils.js:
  (*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@noble/ed25519/lib/esm/index.js:
  (*! noble-ed25519 - MIT License (c) 2019 Paul Miller (paulmillr.com) *)

@babel/runtime/helpers/regeneratorRuntime.js:
  (*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE *)

@noble/secp256k1/lib/esm/index.js:
  (*! noble-secp256k1 - MIT License (c) 2019 Paul Miller (paulmillr.com) *)
*/
