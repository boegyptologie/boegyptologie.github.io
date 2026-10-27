var __defProp = Object.defineProperty;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// node_modules/onnxruntime-web/dist/ort.webgpu.bundle.min.mjs
var ort_webgpu_bundle_min_exports = {};
__export(ort_webgpu_bundle_min_exports, {
  InferenceSession: () => bc,
  TRACE: () => Qa,
  TRACE_EVENT_BEGIN: () => $e,
  TRACE_EVENT_END: () => ze,
  TRACE_FUNC_BEGIN: () => ot,
  TRACE_FUNC_END: () => at,
  Tensor: () => Le,
  default: () => $l,
  env: () => ee,
  registerBackend: () => rt
});
var Jr = Object.defineProperty;
var dc = Object.getOwnPropertyDescriptor;
var lc = Object.getOwnPropertyNames;
var pc = Object.prototype.hasOwnProperty;
var Xr = ((a) => typeof __require < "u" ? __require : typeof Proxy < "u" ? new Proxy(a, { get: (r, s) => (typeof __require < "u" ? __require : r)[s] }) : a)(function(a) {
  if (typeof __require < "u") return __require.apply(this, arguments);
  throw Error('Dynamic require of "' + a + '" is not supported');
});
var G = (a, r, s) => () => {
  if (s) throw s[0];
  try {
    return a && (r = a(a = 0)), r;
  } catch (f) {
    throw s = [f], f;
  }
};
var At = (a, r) => {
  for (var s in r) Jr(a, s, { get: r[s], enumerable: true });
};
var mc = (a, r, s, f) => {
  if (r && typeof r == "object" || typeof r == "function") for (let i of lc(r)) !pc.call(a, i) && i !== s && Jr(a, i, { get: () => r[i], enumerable: !(f = dc(r, i)) || f.enumerable });
  return a;
};
var Ht = (a) => mc(Jr({}, "__esModule", { value: true }), a);
var qt;
var tt;
var rt;
var hc;
var Da;
var Zr = G(() => {
  "use strict";
  qt = /* @__PURE__ */ new Map(), tt = [], rt = (a, r, s) => {
    if (r && typeof r.init == "function" && typeof r.createInferenceSessionHandler == "function") {
      let f = qt.get(a);
      if (f === void 0) qt.set(a, { backend: r, priority: s });
      else {
        if (f.priority > s) return;
        if (f.priority === s && f.backend !== r) throw new Error(`cannot register backend "${a}" using priority ${s}`);
      }
      if (s >= 0) {
        let i = tt.indexOf(a);
        i !== -1 && tt.splice(i, 1);
        for (let p = 0; p < tt.length; p++) if (qt.get(tt[p]).priority <= s) {
          tt.splice(p, 0, a);
          return;
        }
        tt.push(a);
      }
      return;
    }
    throw new TypeError("not a valid backend");
  }, hc = async (a) => {
    let r = qt.get(a);
    if (!r) return "backend not found.";
    if (r.initialized) return r.backend;
    if (r.aborted) return r.error;
    {
      let s = !!r.initPromise;
      try {
        return s || (r.initPromise = r.backend.init(a)), await r.initPromise, r.initialized = true, r.backend;
      } catch (f) {
        return s || (r.error = `${f}`, r.aborted = true), r.error;
      } finally {
        delete r.initPromise;
      }
    }
  }, Da = async (a) => {
    let r = a.executionProviders || [], s = r.map((g) => typeof g == "string" ? g : g.name), f = s.length === 0 ? tt : s, i, p = [], l = /* @__PURE__ */ new Set();
    for (let g of f) {
      let w = await hc(g);
      typeof w == "string" ? p.push({ name: g, err: w }) : (i || (i = w), i === w && l.add(g));
    }
    if (!i) throw new Error(`no available backend found. ERR: ${p.map((g) => `[${g.name}] ${g.err}`).join(", ")}`);
    for (let { name: g, err: w } of p) s.includes(g) && console.warn(`removing requested execution provider "${g}" from session options because it is not available: ${w}`);
    let b = r.filter((g) => l.has(typeof g == "string" ? g : g.name));
    return [i, new Proxy(a, { get: (g, w) => w === "executionProviders" ? b : Reflect.get(g, w) })];
  };
});
var Pa = G(() => {
  "use strict";
  Zr();
});
var Ua;
var _a = G(() => {
  "use strict";
  Ua = "1.31.0-dev.20260911-2a43ec07e";
});
var Ra;
var ie;
var Kr = G(() => {
  "use strict";
  _a();
  Ra = "warning", ie = { wasm: {}, webgl: {}, webgpu: {}, versions: { common: Ua }, set logLevel(a) {
    if (a !== void 0) {
      if (typeof a != "string" || ["verbose", "info", "warning", "error", "fatal"].indexOf(a) === -1) throw new Error(`Unsupported logging level: ${a}`);
      Ra = a;
    }
  }, get logLevel() {
    return Ra;
  } };
  Object.defineProperty(ie, "logLevel", { enumerable: true });
});
var ee;
var Na = G(() => {
  "use strict";
  Kr();
  ee = ie;
});
var Wa;
var ka;
var Fa = G(() => {
  "use strict";
  Wa = (a, r) => {
    let s = typeof document < "u" ? document.createElement("canvas") : new OffscreenCanvas(1, 1);
    s.width = a.dims[3], s.height = a.dims[2];
    let f = s.getContext("2d");
    if (f != null) {
      let i, p;
      r?.tensorLayout !== void 0 && r.tensorLayout === "NHWC" ? (i = a.dims[2], p = a.dims[3]) : (i = a.dims[3], p = a.dims[2]);
      let l = r?.format !== void 0 ? r.format : "RGB", b = r?.norm, g, w;
      b === void 0 || b.mean === void 0 ? g = [255, 255, 255, 255] : typeof b.mean == "number" ? g = [b.mean, b.mean, b.mean, b.mean] : (g = [b.mean[0], b.mean[1], b.mean[2], 0], b.mean[3] !== void 0 && (g[3] = b.mean[3])), b === void 0 || b.bias === void 0 ? w = [0, 0, 0, 0] : typeof b.bias == "number" ? w = [b.bias, b.bias, b.bias, b.bias] : (w = [b.bias[0], b.bias[1], b.bias[2], 0], b.bias[3] !== void 0 && (w[3] = b.bias[3]));
      let S2 = p * i, v = 0, T = S2, A = S2 * 2, C = -1;
      l === "RGBA" ? (v = 0, T = S2, A = S2 * 2, C = S2 * 3) : l === "RGB" ? (v = 0, T = S2, A = S2 * 2) : l === "RBG" && (v = 0, A = S2, T = S2 * 2);
      for (let _ = 0; _ < p; _++) for (let k = 0; k < i; k++) {
        let U2 = (a.data[v++] - w[0]) * g[0], M = (a.data[T++] - w[1]) * g[1], Y2 = (a.data[A++] - w[2]) * g[2], O = C === -1 ? 255 : (a.data[C++] - w[3]) * g[3];
        f.fillStyle = "rgba(" + U2 + "," + M + "," + Y2 + "," + O + ")", f.fillRect(k, _, 1, 1);
      }
      if ("toDataURL" in s) return s.toDataURL();
      throw new Error("toDataURL is not supported");
    } else throw new Error("Can not access image data");
  }, ka = (a, r) => {
    let s = typeof document < "u" ? document.createElement("canvas").getContext("2d") : new OffscreenCanvas(1, 1).getContext("2d"), f;
    if (s != null) {
      let i, p, l;
      r?.tensorLayout !== void 0 && r.tensorLayout === "NHWC" ? (i = a.dims[2], p = a.dims[1], l = a.dims[3]) : (i = a.dims[3], p = a.dims[2], l = a.dims[1]);
      let b = r !== void 0 && r.format !== void 0 ? r.format : "RGB", g = r?.norm, w, S2;
      g === void 0 || g.mean === void 0 ? w = [255, 255, 255, 255] : typeof g.mean == "number" ? w = [g.mean, g.mean, g.mean, g.mean] : (w = [g.mean[0], g.mean[1], g.mean[2], 255], g.mean[3] !== void 0 && (w[3] = g.mean[3])), g === void 0 || g.bias === void 0 ? S2 = [0, 0, 0, 0] : typeof g.bias == "number" ? S2 = [g.bias, g.bias, g.bias, g.bias] : (S2 = [g.bias[0], g.bias[1], g.bias[2], 0], g.bias[3] !== void 0 && (S2[3] = g.bias[3]));
      let v = p * i;
      if (r !== void 0 && (r.format !== void 0 && l === 4 && r.format !== "RGBA" || l === 3 && r.format !== "RGB" && r.format !== "BGR")) throw new Error("Tensor format doesn't match input tensor dims");
      let T = 4, A = 0, C = 1, _ = 2, k = 3, U2 = 0, M = v, Y2 = v * 2, O = -1;
      b === "RGBA" ? (U2 = 0, M = v, Y2 = v * 2, O = v * 3) : b === "RGB" ? (U2 = 0, M = v, Y2 = v * 2) : b === "RBG" && (U2 = 0, Y2 = v, M = v * 2), f = s.createImageData(i, p);
      for (let $ = 0; $ < p * i; A += T, C += T, _ += T, k += T, $++) f.data[A] = (a.data[U2++] - S2[0]) * w[0], f.data[C] = (a.data[M++] - S2[1]) * w[1], f.data[_] = (a.data[Y2++] - S2[2]) * w[2], f.data[k] = O === -1 ? 255 : (a.data[O++] - S2[3]) * w[3];
    } else throw new Error("Can not access image data");
    return f;
  };
});
var Qr;
var Ga;
var $a;
var za;
var Va;
var ja;
var Ha = G(() => {
  "use strict";
  Yt();
  Qr = (a, r) => {
    if (a === void 0) throw new Error("Image buffer must be defined");
    if (r.height === void 0 || r.width === void 0) throw new Error("Image height and width must be defined");
    if (r.tensorLayout === "NHWC") throw new Error("NHWC Tensor layout is not supported yet");
    let { height: s, width: f } = r, i = r.norm ?? { mean: 255, bias: 0 }, p, l;
    typeof i.mean == "number" ? p = [i.mean, i.mean, i.mean, i.mean] : p = [i.mean[0], i.mean[1], i.mean[2], i.mean[3] ?? 255], typeof i.bias == "number" ? l = [i.bias, i.bias, i.bias, i.bias] : l = [i.bias[0], i.bias[1], i.bias[2], i.bias[3] ?? 0];
    let b = r.format !== void 0 ? r.format : "RGBA", g = r.tensorFormat !== void 0 && r.tensorFormat !== void 0 ? r.tensorFormat : "RGB", w = s * f, S2 = g === "RGBA" ? new Float32Array(w * 4) : new Float32Array(w * 3), v = 4, T = 0, A = 1, C = 2, _ = 3, k = 0, U2 = w, M = w * 2, Y2 = -1;
    b === "RGB" && (v = 3, T = 0, A = 1, C = 2, _ = -1), g === "RGBA" ? Y2 = w * 3 : g === "RBG" ? (k = 0, M = w, U2 = w * 2) : g === "BGR" && (M = 0, U2 = w, k = w * 2);
    for (let $ = 0; $ < w; $++, T += v, C += v, A += v, _ += v) S2[k++] = (a[T] + l[0]) / p[0], S2[U2++] = (a[A] + l[1]) / p[1], S2[M++] = (a[C] + l[2]) / p[2], Y2 !== -1 && _ !== -1 && (S2[Y2++] = (a[_] + l[3]) / p[3]);
    return g === "RGBA" ? new ce("float32", S2, [1, 4, s, f]) : new ce("float32", S2, [1, 3, s, f]);
  }, Ga = async (a, r) => {
    let s = typeof HTMLImageElement < "u" && a instanceof HTMLImageElement, f = typeof ImageData < "u" && a instanceof ImageData, i = typeof ImageBitmap < "u" && a instanceof ImageBitmap, p = typeof a == "string", l, b = r ?? {}, g = () => {
      if (typeof document < "u") return document.createElement("canvas");
      if (typeof OffscreenCanvas < "u") return new OffscreenCanvas(1, 1);
      throw new Error("Canvas is not supported");
    }, w = (S2) => typeof HTMLCanvasElement < "u" && S2 instanceof HTMLCanvasElement || S2 instanceof OffscreenCanvas ? S2.getContext("2d") : null;
    if (s) {
      let S2 = g();
      S2.width = a.width, S2.height = a.height;
      let v = w(S2);
      if (v != null) {
        let T = a.height, A = a.width;
        if (r !== void 0 && r.resizedHeight !== void 0 && r.resizedWidth !== void 0 && (T = r.resizedHeight, A = r.resizedWidth), r !== void 0) {
          if (b = r, r.tensorFormat !== void 0) throw new Error("Image input config format must be RGBA for HTMLImageElement");
          b.tensorFormat = "RGBA", b.height = T, b.width = A;
        } else b.tensorFormat = "RGBA", b.height = T, b.width = A;
        v.drawImage(a, 0, 0), l = v.getImageData(0, 0, A, T).data;
      } else throw new Error("Can not access image data");
    } else if (f) {
      let S2, v;
      if (r !== void 0 && r.resizedWidth !== void 0 && r.resizedHeight !== void 0 ? (S2 = r.resizedHeight, v = r.resizedWidth) : (S2 = a.height, v = a.width), r !== void 0 && (b = r), b.format = "RGBA", b.height = S2, b.width = v, r !== void 0) {
        let T = g();
        T.width = v, T.height = S2;
        let A = w(T);
        if (A != null) A.putImageData(a, 0, 0), l = A.getImageData(0, 0, v, S2).data;
        else throw new Error("Can not access image data");
      } else l = a.data;
    } else if (i) {
      if (r === void 0) throw new Error("Please provide image config with format for Imagebitmap");
      let S2 = g();
      S2.width = a.width, S2.height = a.height;
      let v = w(S2);
      if (v != null) {
        let T = a.height, A = a.width;
        return v.drawImage(a, 0, 0, A, T), l = v.getImageData(0, 0, A, T).data, b.height = T, b.width = A, Qr(l, b);
      } else throw new Error("Can not access image data");
    } else {
      if (p) return new Promise((S2, v) => {
        let T = g(), A = w(T);
        if (!a || !A) return v();
        let C = new Image();
        C.crossOrigin = "Anonymous", C.src = a, C.onload = () => {
          T.width = C.width, T.height = C.height, A.drawImage(C, 0, 0, T.width, T.height);
          let _ = A.getImageData(0, 0, T.width, T.height);
          b.height = T.height, b.width = T.width, S2(Qr(_.data, b));
        };
      });
      throw new Error("Input data provided is not supported - aborted tensor creation");
    }
    if (l !== void 0) return Qr(l, b);
    throw new Error("Input data provided is not supported - aborted tensor creation");
  }, $a = (a, r) => {
    let { width: s, height: f, download: i, dispose: p } = r, l = [1, f, s, 4];
    return new ce({ location: "texture", type: "float32", texture: a, dims: l, download: i, dispose: p });
  }, za = (a, r) => {
    let { dataType: s, dims: f, download: i, dispose: p } = r;
    return new ce({ location: "gpu-buffer", type: s ?? "float32", gpuBuffer: a, dims: f, download: i, dispose: p });
  }, Va = (a, r) => {
    let { dataType: s, dims: f, download: i, dispose: p } = r;
    return new ce({ location: "ml-tensor", type: s ?? "float32", mlTensor: a, dims: f, download: i, dispose: p });
  }, ja = (a, r, s) => new ce({ location: "cpu-pinned", type: a, data: r, dims: s ?? [r.length] });
});
var nt;
var It;
var qa;
var Ya;
var Ja = G(() => {
  "use strict";
  nt = /* @__PURE__ */ new Map([["float32", Float32Array], ["uint8", Uint8Array], ["int8", Int8Array], ["uint16", Uint16Array], ["int16", Int16Array], ["int32", Int32Array], ["bool", Uint8Array], ["float64", Float64Array], ["uint32", Uint32Array], ["int4", Uint8Array], ["uint4", Uint8Array]]), It = /* @__PURE__ */ new Map([[Float32Array, "float32"], [Uint8Array, "uint8"], [Int8Array, "int8"], [Uint16Array, "uint16"], [Int16Array, "int16"], [Int32Array, "int32"], [Float64Array, "float64"], [Uint32Array, "uint32"]]), qa = false, Ya = () => {
    if (!qa) {
      qa = true;
      let a = typeof BigInt64Array < "u" && BigInt64Array.from, r = typeof BigUint64Array < "u" && BigUint64Array.from, s = globalThis.Float16Array, f = typeof s < "u" && s.from;
      a && (nt.set("int64", BigInt64Array), It.set(BigInt64Array, "int64")), r && (nt.set("uint64", BigUint64Array), It.set(BigUint64Array, "uint64")), f ? (nt.set("float16", s), It.set(s, "float16")) : nt.set("float16", Uint16Array);
    }
  };
});
var Xa;
var Za;
var Ka = G(() => {
  "use strict";
  Yt();
  Xa = (a) => {
    let r = 1;
    for (let s = 0; s < a.length; s++) {
      let f = a[s];
      if (typeof f != "number" || !Number.isSafeInteger(f)) throw new TypeError(`dims[${s}] must be an integer, got: ${f}`);
      if (f < 0) throw new RangeError(`dims[${s}] must be a non-negative integer, got: ${f}`);
      r *= f;
    }
    return r;
  }, Za = (a, r) => {
    switch (a.location) {
      case "cpu":
        return new ce(a.type, a.data, r);
      case "cpu-pinned":
        return new ce({ location: "cpu-pinned", data: a.data, type: a.type, dims: r });
      case "texture":
        return new ce({ location: "texture", texture: a.texture, type: a.type, dims: r });
      case "gpu-buffer":
        return new ce({ location: "gpu-buffer", gpuBuffer: a.gpuBuffer, type: a.type, dims: r });
      case "ml-tensor":
        return new ce({ location: "ml-tensor", mlTensor: a.mlTensor, type: a.type, dims: r });
      default:
        throw new Error(`tensorReshape: tensor location ${a.location} is not supported`);
    }
  };
});
var ce;
var Yt = G(() => {
  "use strict";
  Fa();
  Ha();
  Ja();
  Ka();
  ce = class {
    constructor(r, s, f) {
      Ya();
      let i, p;
      if (typeof r == "object" && "location" in r) switch (this.dataLocation = r.location, i = r.type, p = r.dims, r.location) {
        case "cpu-pinned": {
          let b = nt.get(i);
          if (!b) throw new TypeError(`unsupported type "${i}" to create tensor from pinned buffer`);
          if (!(r.data instanceof b)) throw new TypeError(`buffer should be of type ${b.name}`);
          this.cpuData = r.data;
          break;
        }
        case "texture": {
          if (i !== "float32") throw new TypeError(`unsupported type "${i}" to create tensor from texture`);
          this.gpuTextureData = r.texture, this.downloader = r.download, this.disposer = r.dispose;
          break;
        }
        case "gpu-buffer": {
          if (i !== "float32" && i !== "float16" && i !== "int32" && i !== "int64" && i !== "uint32" && i !== "uint8" && i !== "bool" && i !== "uint4" && i !== "int4") throw new TypeError(`unsupported type "${i}" to create tensor from gpu buffer`);
          this.gpuBufferData = r.gpuBuffer, this.downloader = r.download, this.disposer = r.dispose;
          break;
        }
        case "ml-tensor": {
          if (i !== "float32" && i !== "float16" && i !== "int32" && i !== "int64" && i !== "uint32" && i !== "uint64" && i !== "int8" && i !== "uint8" && i !== "bool" && i !== "uint4" && i !== "int4") throw new TypeError(`unsupported type "${i}" to create tensor from MLTensor`);
          this.mlTensorData = r.mlTensor, this.downloader = r.download, this.disposer = r.dispose;
          break;
        }
        default:
          throw new Error(`Tensor constructor: unsupported location '${this.dataLocation}'`);
      }
      else {
        let b, g;
        if (typeof r == "string") if (i = r, g = f, r === "string") {
          if (!Array.isArray(s)) throw new TypeError("A string tensor's data must be a string array.");
          b = s;
        } else {
          let w = nt.get(r);
          if (w === void 0) throw new TypeError(`Unsupported tensor type: ${r}.`);
          if (Array.isArray(s)) {
            if (r === "float16" && w === Uint16Array || r === "uint4" || r === "int4") throw new TypeError(`Creating a ${r} tensor from number array is not supported. Please use ${w.name} as data.`);
            r === "uint64" || r === "int64" ? b = w.from(s, BigInt) : b = w.from(s);
          } else if (s instanceof w) b = s;
          else if (s instanceof Uint8ClampedArray) if (r === "uint8") b = Uint8Array.from(s);
          else throw new TypeError("A Uint8ClampedArray tensor's data must be type of uint8");
          else if (r === "float16" && s instanceof Uint16Array && w !== Uint16Array) b = new globalThis.Float16Array(s.buffer, s.byteOffset, s.length);
          else throw new TypeError(`A ${i} tensor's data must be type of ${w}`);
        }
        else if (g = s, Array.isArray(r)) {
          if (r.length === 0) throw new TypeError("Tensor type cannot be inferred from an empty array.");
          let w = typeof r[0];
          if (w === "string") i = "string", b = r;
          else if (w === "boolean") i = "bool", b = Uint8Array.from(r);
          else throw new TypeError(`Invalid element type of data array: ${w}.`);
        } else if (r instanceof Uint8ClampedArray) i = "uint8", b = Uint8Array.from(r);
        else {
          let w = It.get(r.constructor);
          if (w === void 0) throw new TypeError(`Unsupported type for tensor data: ${r.constructor}.`);
          i = w, b = r;
        }
        if (g === void 0) g = [b.length];
        else if (!Array.isArray(g)) throw new TypeError("A tensor's dims must be a number array");
        p = g, this.cpuData = b, this.dataLocation = "cpu";
      }
      let l = Xa(p);
      if (this.cpuData && l !== this.cpuData.length && !((i === "uint4" || i === "int4") && Math.ceil(l / 2) === this.cpuData.length)) throw new Error(`Tensor's size(${l}) does not match data length(${this.cpuData.length}).`);
      this.type = i, this.dims = p, this.size = l;
    }
    static async fromImage(r, s) {
      return Ga(r, s);
    }
    static fromTexture(r, s) {
      return $a(r, s);
    }
    static fromGpuBuffer(r, s) {
      return za(r, s);
    }
    static fromMLTensor(r, s) {
      return Va(r, s);
    }
    static fromPinnedBuffer(r, s, f) {
      return ja(r, s, f);
    }
    toDataURL(r) {
      return Wa(this, r);
    }
    toImageData(r) {
      return ka(this, r);
    }
    get data() {
      if (this.ensureValid(), !this.cpuData) throw new Error("The data is not on CPU. Use `getData()` to download GPU data to CPU, or use `texture` or `gpuBuffer` property to access the GPU data directly.");
      return this.cpuData;
    }
    get location() {
      return this.dataLocation;
    }
    get texture() {
      if (this.ensureValid(), !this.gpuTextureData) throw new Error("The data is not stored as a WebGL texture.");
      return this.gpuTextureData;
    }
    get gpuBuffer() {
      if (this.ensureValid(), !this.gpuBufferData) throw new Error("The data is not stored as a WebGPU buffer.");
      return this.gpuBufferData;
    }
    get mlTensor() {
      if (this.ensureValid(), !this.mlTensorData) throw new Error("The data is not stored as a WebNN MLTensor.");
      return this.mlTensorData;
    }
    async getData(r) {
      switch (this.ensureValid(), this.dataLocation) {
        case "cpu":
        case "cpu-pinned":
          return this.data;
        case "texture":
        case "gpu-buffer":
        case "ml-tensor": {
          if (!this.downloader) throw new Error("The current tensor is not created with a specified data downloader.");
          if (this.isDownloading) throw new Error("The current tensor is being downloaded.");
          try {
            this.isDownloading = true;
            let s = await this.downloader();
            return this.downloader = void 0, this.dataLocation = "cpu", this.cpuData = s, r && this.disposer && (this.disposer(), this.disposer = void 0), s;
          } finally {
            this.isDownloading = false;
          }
        }
        default:
          throw new Error(`cannot get data from location: ${this.dataLocation}`);
      }
    }
    dispose() {
      if (this.isDownloading) throw new Error("The current tensor is being downloaded.");
      this.disposer && (this.disposer(), this.disposer = void 0), this.cpuData = void 0, this.gpuTextureData = void 0, this.gpuBufferData = void 0, this.mlTensorData = void 0, this.downloader = void 0, this.isDownloading = void 0, this.dataLocation = "none";
    }
    ensureValid() {
      if (this.dataLocation === "none") throw new Error("The tensor is disposed.");
    }
    reshape(r) {
      if (this.ensureValid(), this.downloader || this.disposer) throw new Error("Cannot reshape a tensor that owns GPU resource.");
      return Za(this, r);
    }
  };
});
var Le;
var en = G(() => {
  "use strict";
  Yt();
  Le = ce;
});
var Qa;
var es;
var ot;
var at;
var $e;
var ze;
var tn = G(() => {
  "use strict";
  Kr();
  Qa = (a, r) => {
    (typeof ie.trace > "u" ? !ie.wasm.trace : !ie.trace) || console.timeStamp(`${a}::ORT::${r}`);
  }, es = (a, r) => {
    let s = new Error().stack?.split(/\r\n|\r|\n/g) || [], f = false;
    for (let i = 0; i < s.length; i++) {
      if (f && !s[i].includes("TRACE_FUNC")) {
        let p = `FUNC_${a}::${s[i].trim().split(" ")[1]}`;
        r && (p += `::${r}`), Qa("CPU", p);
        return;
      }
      s[i].includes("TRACE_FUNC") && (f = true);
    }
  }, ot = (a) => {
    (typeof ie.trace > "u" ? !ie.wasm.trace : !ie.trace) || es("BEGIN", a);
  }, at = (a) => {
    (typeof ie.trace > "u" ? !ie.wasm.trace : !ie.trace) || es("END", a);
  }, $e = (a) => {
    (typeof ie.trace > "u" ? !ie.wasm.trace : !ie.trace) || console.time(`ORT::${a}`);
  }, ze = (a) => {
    (typeof ie.trace > "u" ? !ie.wasm.trace : !ie.trace) || console.timeEnd(`ORT::${a}`);
  };
});
var Jt;
var ts = G(() => {
  "use strict";
  Zr();
  en();
  tn();
  Jt = class a {
    constructor(r) {
      this.handler = r;
    }
    async run(r, s, f) {
      ot(), $e("InferenceSession.run");
      let i = {}, p = {};
      if (typeof r != "object" || r === null || r instanceof Le || Array.isArray(r)) throw new TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");
      let l = true;
      if (typeof s == "object") {
        if (s === null) throw new TypeError("Unexpected argument[1]: cannot be null.");
        if (s instanceof Le) throw new TypeError("'fetches' cannot be a Tensor");
        if (Array.isArray(s)) {
          if (s.length === 0) throw new TypeError("'fetches' cannot be an empty array.");
          l = false;
          for (let w of s) {
            if (typeof w != "string") throw new TypeError("'fetches' must be a string array or an object.");
            if (this.outputNames.indexOf(w) === -1) throw new RangeError(`'fetches' contains invalid output name: ${w}.`);
            i[w] = null;
          }
          if (typeof f == "object" && f !== null) p = f;
          else if (typeof f < "u") throw new TypeError("'options' must be an object.");
        } else {
          let w = false, S2 = Object.getOwnPropertyNames(s);
          for (let v of this.outputNames) if (S2.indexOf(v) !== -1) {
            let T = s[v];
            (T === null || T instanceof Le) && (w = true, l = false, i[v] = T);
          }
          if (w) {
            if (typeof f == "object" && f !== null) p = f;
            else if (typeof f < "u") throw new TypeError("'options' must be an object.");
          } else p = s;
        }
      } else if (typeof s < "u") throw new TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");
      for (let w of this.inputNames) if (typeof r[w] > "u") throw new Error(`input '${w}' is missing in 'feeds'.`);
      if (l) for (let w of this.outputNames) i[w] = null;
      let b = await this.handler.run(r, i, p), g = {};
      for (let w in b) if (Object.hasOwnProperty.call(b, w)) {
        let S2 = b[w];
        S2 instanceof Le ? g[w] = S2 : g[w] = new Le(S2.type, S2.data, S2.dims);
      }
      return ze("InferenceSession.run"), at(), g;
    }
    async release() {
      return this.handler.dispose();
    }
    static async create(r, s, f, i) {
      ot(), $e("InferenceSession.create");
      let p, l = {};
      if (typeof r == "string") {
        if (p = r, typeof s == "object" && s !== null) l = s;
        else if (typeof s < "u") throw new TypeError("'options' must be an object.");
      } else if (r instanceof Uint8Array) {
        if (p = r, typeof s == "object" && s !== null) l = s;
        else if (typeof s < "u") throw new TypeError("'options' must be an object.");
      } else if (r instanceof ArrayBuffer || typeof SharedArrayBuffer < "u" && r instanceof SharedArrayBuffer) {
        let S2 = r, v = 0, T = r.byteLength;
        if (typeof s == "object" && s !== null) l = s;
        else if (typeof s == "number") {
          if (v = s, !Number.isSafeInteger(v)) throw new RangeError("'byteOffset' must be an integer.");
          if (v < 0 || v >= S2.byteLength) throw new RangeError(`'byteOffset' is out of range [0, ${S2.byteLength}).`);
          if (T = r.byteLength - v, typeof f == "number") {
            if (T = f, !Number.isSafeInteger(T)) throw new RangeError("'byteLength' must be an integer.");
            if (T <= 0 || v + T > S2.byteLength) throw new RangeError(`'byteLength' is out of range (0, ${S2.byteLength - v}].`);
            if (typeof i == "object" && i !== null) l = i;
            else if (typeof i < "u") throw new TypeError("'options' must be an object.");
          } else if (typeof f < "u") throw new TypeError("'byteLength' must be a number.");
        } else if (typeof s < "u") throw new TypeError("'options' must be an object.");
        p = new Uint8Array(S2, v, T);
      } else throw new TypeError("Unexpected argument[0]: must be 'path' or 'buffer'.");
      let [b, g] = await Da(l), w = await b.createInferenceSessionHandler(p, g);
      return ze("InferenceSession.create"), at(), new a(w);
    }
    startProfiling() {
      this.handler.startProfiling();
    }
    endProfiling() {
      this.handler.endProfiling();
    }
    get inputNames() {
      return this.handler.inputNames;
    }
    get outputNames() {
      return this.handler.outputNames;
    }
    get inputMetadata() {
      return this.handler.inputMetadata;
    }
    get outputMetadata() {
      return this.handler.outputMetadata;
    }
  };
});
var bc;
var rs = G(() => {
  "use strict";
  ts();
  bc = Jt;
});
var ns = G(() => {
  "use strict";
});
var os = G(() => {
  "use strict";
});
var as = G(() => {
  "use strict";
});
var ss = G(() => {
  "use strict";
});
var rn = {};
At(rn, { InferenceSession: () => bc, TRACE: () => Qa, TRACE_EVENT_BEGIN: () => $e, TRACE_EVENT_END: () => ze, TRACE_FUNC_BEGIN: () => ot, TRACE_FUNC_END: () => at, Tensor: () => Le, env: () => ee, registerBackend: () => rt });
var Ve = G(() => {
  "use strict";
  Pa();
  Na();
  rs();
  en();
  ns();
  os();
  tn();
  as();
  ss();
});
var Xt = G(() => {
  "use strict";
});
var cs = {};
At(cs, { default: () => gc });
var us;
var fs;
var gc;
var ds = G(() => {
  "use strict";
  nn();
  je();
  Zt();
  us = "ort-wasm-proxy-worker", fs = globalThis.self?.name === us;
  fs && (self.onmessage = (a) => {
    let { type: r, in: s } = a.data;
    try {
      switch (r) {
        case "init-wasm":
          Kt(s.wasm).then(() => {
            Qt(s).then(() => {
              postMessage({ type: r });
            }, (f) => {
              postMessage({ type: r, err: f });
            });
          }, (f) => {
            postMessage({ type: r, err: f });
          });
          break;
        case "init-ep": {
          let { epName: f, env: i } = s;
          er(i, f).then(() => {
            postMessage({ type: r });
          }, (p) => {
            postMessage({ type: r, err: p });
          });
          break;
        }
        case "copy-from": {
          let { buffer: f } = s, i = Lt(f);
          postMessage({ type: r, out: i });
          break;
        }
        case "create": {
          let { model: f, options: i } = s;
          tr(f, i).then((p) => {
            postMessage({ type: r, out: p });
          }, (p) => {
            postMessage({ type: r, err: p });
          });
          break;
        }
        case "release":
          rr(s), postMessage({ type: r });
          break;
        case "run": {
          let { sessionId: f, inputIndices: i, inputs: p, outputIndices: l, options: b } = s;
          nr(f, i, p, l, new Array(l.length).fill(null), b).then((g) => {
            g.some((w) => w[3] !== "cpu") ? postMessage({ type: r, err: "Proxy does not support non-cpu tensor location." }) : postMessage({ type: r, out: g }, ar([...p, ...g]));
          }, (g) => {
            postMessage({ type: r, err: g });
          });
          break;
        }
        case "end-profiling":
          or(s), postMessage({ type: r });
          break;
        default:
      }
    } catch (f) {
      postMessage({ type: r, err: f });
    }
  });
  gc = fs ? null : (a) => new Worker(a ?? ye, { type: "module", name: us });
});
var ps = {};
At(ps, { default: () => yc });
async function ls(a = {}) {
  var r = a, s = !!globalThis.window, f = !!globalThis.WorkerGlobalScope, i = f && self.name?.startsWith("em-pthread");
  r.mountExternalData = (e, t6) => {
    e.startsWith("./") && (e = e.substring(2)), (r.ed || (r.ed = /* @__PURE__ */ new Map())).set(e, t6);
  }, r.unmountExternalData = () => {
    delete r.ed, delete r.Te, delete r.Se, delete r.Ue;
  }, globalThis.SharedArrayBuffer ?? new WebAssembly.Memory({ initial: 0, maximum: 0, shared: true }).buffer.constructor;
  let p = () => {
    let e = (t6) => (...n) => {
      let o = Me2;
      return n = t6(...n), Me2 != o ? new Promise((u, c) => {
        Cr2 = { resolve: u, reject: c };
      }) : n;
    };
    (() => {
      for (let t6 of ["_OrtAppendExecutionProvider", "_OrtCreateSession", "_OrtRun", "_OrtRunWithBinding", "_OrtBindInput"]) r[t6] = e(r[t6]);
    })(), typeof jsepRunAsync < "u" && (r._OrtRun = jsepRunAsync(r._OrtRun), r._OrtRunWithBinding = jsepRunAsync(r._OrtRunWithBinding)), p = void 0;
  };
  r.asyncInit = () => {
    p?.();
  };
  var l, b, g = (e, t6) => {
    throw t6;
  }, w = import.meta.url, S2 = "";
  if (s || f) {
    try {
      S2 = new URL(".", w).href;
    } catch {
    }
    f && (b = (e) => {
      var t6 = new XMLHttpRequest();
      return t6.open("GET", e, false), t6.responseType = "arraybuffer", t6.send(null), new Uint8Array(t6.response);
    }), l = async (e) => {
      if (oe(e)) return new Promise((n, o) => {
        var u = new XMLHttpRequest();
        u.open("GET", e, true), u.responseType = "arraybuffer", u.onload = () => {
          u.status == 200 || u.status == 0 && u.response ? n(u.response) : o(u.status);
        }, u.onerror = o, u.send(null);
      });
      var t6 = await fetch(e, { credentials: "same-origin" });
      if (t6.ok) return t6.arrayBuffer();
      throw Error(t6.status + " : " + t6.url);
    };
  }
  var v, T, A, C, _, k, U2 = console.log.bind(console), M = console.error.bind(console), Y2 = U2, O = M, $ = false, oe = (e) => e.startsWith("file://");
  function d() {
    Fe2.buffer != Z.buffer && se2();
  }
  if (i) {
    let e = function(t6) {
      try {
        var n = t6.data, o = n.$c;
        if (o === "load") {
          let u = [];
          self.onmessage = (c) => u.push(c), k = () => {
            postMessage({ $c: "loaded" });
            for (let c of u) e(c);
            self.onmessage = e;
          };
          for (let c of n.ue) r[c] && !r[c].proxy || (r[c] = (...h2) => {
            postMessage({ $c: "callHandler", te: c, args: h2 });
          }, c == "print" && (Y2 = r[c]), c == "printErr" && (O = r[c]));
          Fe2 = n.Me, se2(), T = n.Ne, wt2(), jt2();
        } else if (o === "run") {
          (function(u) {
            var c = (d(), E2)[u + 52 >>> 2 >>> 0];
            u = (d(), E2)[u + 56 >>> 2 >>> 0], Fo2(c, c - u), D(c);
          })(n.Xc), zr2(n.Xc, 0, 0, 1, 0, 0), wn2(), Br(n.Xc), te2 || (vo2(), te2 = true);
          try {
            ei2(n.ze, n.kd);
          } catch (u) {
            if (u != "unwind") throw u;
          }
        } else n.target !== "setimmediate" && (o === "checkMailbox" ? te2 && _t2() : o && (O(`worker: received unknown command ${o}`), O(n)));
      } catch (u) {
        throw _o2(), u;
      }
    };
    var Vc2 = e, te2 = false;
    self.onunhandledrejection = (t6) => {
      throw t6.reason || t6;
    }, self.onmessage = e;
  }
  var Z, X2, De2, K2, I, E2, R3, ae2, pe2, J2, ge2, ne2 = false;
  function se2() {
    var e = Fe2.buffer;
    r.HEAP8 = Z = new Int8Array(e), De2 = new Int16Array(e), r.HEAPU8 = X2 = new Uint8Array(e), K2 = new Uint16Array(e), r.HEAP32 = I = new Int32Array(e), r.HEAPU32 = E2 = new Uint32Array(e), R3 = new Float32Array(e), ae2 = new Float64Array(e), pe2 = new BigInt64Array(e), J2 = new BigUint64Array(e);
  }
  function wr2() {
    ne2 = true, i ? k() : Ne2.hc();
  }
  function we2(e) {
    throw O(e = "Aborted(" + e + ")"), $ = true, e = new WebAssembly.RuntimeError(e + ". Build with -sASSERTIONS for more info."), _?.(e), e;
  }
  function qe2() {
    return { a: { qa: Af2, f: ti2, K: ri2, k: ni2, p: oi2, l: ai2, fa: si2, b: ii2, da: ui2, gc: An2, q: fi2, ea: On2, Ua: Mn2, cc: Cn2, ec: Dn2, Va: Pn2, Sa: Un2, La: _n2, Ra: Rn2, oa: Nn2, dc: Wn2, ac: kn2, Ta: Fn2, bc: Gn2, _a: ci2, Ba: li2, Xb: pi2, Vb: hi2, Aa: gi2, O: yi2, J: wi2, Wb: Ti2, ka: Li2, Yb: Bi2, Oa: Oi2, _b: Ci2, Ea: Di2, Tb: Pi2, Ca: Ui2, Na: Br, Xa: _i2, U: ki2, n: Vi2, c: Ir2, qb: ji2, w: Hi2, N: qi2, A: Yi2, j: Ji2, o: Jn2, rb: Xi2, H: Zi2, T: Ki2, g: Qi2, u: eu2, m: tu2, i: ru2, Ia: nu2, Ja: ou2, Ka: au2, Ga: Qn2, Ha: eo2, Ub: to2, ab: iu2, Za: cu2, Z: du2, pb: lu2, Da: pu2, Ya: uu2, X: mu2, Wa: hu2, $b: bu2, G: su2, db: gu2, _: yu2, pa: Ft2, Zb: Tu2, cb: wu2, bb: vu2, lb: Uu2, z: _u2, sa: Ru2, ra: Nu2, nb: Wu2, Y: ku2, v: Fu2, kb: Gu2, jb: $u2, ib: zu2, mb: Vu2, gb: ju2, fb: Hu2, eb: qu2, Pa: po2, Qa: mo2, fc: vr2, W: ho2, Fa: bo2, ma: go2, Ma: yo2, la: wo2, Fb: fc2, va: nc2, Gb: uc2, wa: rc2, E: zf2, e: Of2, r: Lf2, x: If2, C: kf2, Ib: Qf2, ca: Kf2, D: Df2, xa: ec2, aa: oc2, ha: Zf2, Jb: Xf2, Kb: Jf2, za: jf2, Lb: qf2, ya: Yf2, Mb: Hf2, ua: ic2, ba: tc2, d: Bf2, B: Cf2, s: Mf2, Eb: cc2, t: Uf2, y: Gf2, F: Pf2, I: _f2, L: $f2, Nb: Vf2, R: ac2, ia: Wf2, $: sc2, Pb: Nf2, Rb: Rf2, Ob: Ff2, h: Ju2, a: Fe2, $a: Ye2, Hb: Xu2, V: Zu2, M: Ku2, na: Qu2, Db: ef2, ja: tf2, S: rf2, Ab: nf2, Bb: of2, vb: af2, wb: sf2, P: uf2, xb: ff2, yb: cf2, ta: df2, Sb: lf2, ob: pf2, Q: mf2, hb: hf2, Cb: bf2, sb: gf2, tb: wf2, ub: Tf2, ga: vf2, zb: Ef2, Qb: Sf2 } };
  }
  async function wt2() {
    function e(o, u) {
      var c = Ne2 = o.exports;
      o = {};
      for (let [h2, m] of Object.entries(c)) typeof m == "function" ? (c = Ri2(m), o[h2] = c) : o[h2] = m;
      return Ne2 = o, Ne2 = (function() {
        var h2 = Ne2, m = (x) => (N2) => x(N2) >>> 0, y = (x) => () => x() >>> 0;
        return (h2 = Object.assign({}, h2)).ic = m(h2.ic), h2.Nc = y(h2.Nc), h2.Pc = m(h2.Pc), h2.Bd = /* @__PURE__ */ ((x) => (N2, F3) => x(N2, F3) >>> 0)(h2.Bd), h2.Gd = m(h2.Gd), h2.Hd = y(h2.Hd), h2.Ld = m(h2.Ld), h2;
      })(), gn2.push(Ne2.sd), To2 = (o = Ne2).ic, vo2 = o.jc, r._OrtInit = o.kc, r._OrtGetLastError = o.lc, r._OrtCreateSessionOptions = o.mc, r._OrtAppendExecutionProvider = o.nc, r._OrtAddFreeDimensionOverride = o.oc, r._OrtAddSessionConfigEntry = o.pc, r._OrtReleaseSessionOptions = o.qc, r._OrtCreateSession = o.rc, r._OrtReleaseSession = o.sc, r._OrtGetInputOutputCount = o.tc, r._OrtGetInputOutputMetadata = o.uc, r._OrtFree = o.vc, r._OrtCreateTensor = o.wc, r._OrtGetTensorData = o.xc, r._OrtReleaseTensor = o.yc, r._OrtCreateRunOptions = o.zc, r._OrtAddRunConfigEntry = o.Ac, r._OrtReleaseRunOptions = o.Bc, r._OrtCreateBinding = o.Cc, r._OrtBindInput = o.Dc, r._OrtBindOutput = o.Ec, r._OrtClearBoundOutputs = o.Fc, r._OrtReleaseBinding = o.Gc, r._OrtRunWithBinding = o.Hc, r._OrtRun = o.Ic, r._OrtEndProfiling = o.Jc, Eo2 = r._OrtCreateWebGpuInstance = o.Kc, r._wgpuCreateInstance = o.Lc, Nr2 = r._OrtGetWebGpuDevice = o.Mc, zt2 = o.Nc, ve2 = r._free = o.Oc, Ke = r._malloc = o.Pc, So2 = r._wgpuBufferRelease = o.Qc, xo2 = o.Rc, Ao2 = o.Sc, Io2 = o.Tc, Lo2 = o.Uc, Bo2 = o.Vc, Oo2 = o.Yc, Mo2 = o.Zc, Co2 = o.hd, Do2 = o.id, Po2 = o.jd, Wr2 = o.ld, kr2 = o.md, Fr2 = o.nd, Gr2 = o.od, St2 = o.pd, $r2 = o.qd, Uo2 = o.rd, zr2 = o.ud, _o2 = o.vd, Ro2 = o.wd, No2 = o.xd, Vr2 = o.yd, Wo2 = o.zd, ko2 = o.Ad, jr2 = o.Bd, W = o.Cd, xt2 = o.Dd, Fo2 = o.Ed, D = o.Fd, Vt2 = o.Gd, P2 = o.Hd, Go2 = o.Id, Hr2 = o.Jd, $o2 = o.Kd, zo2 = o.Ld, Vo2 = o.Md, qr2 = o.Nd, jo2 = o.Od, Ho2 = o.Pd, qo2 = o.Qd, Yo2 = o.Rd, Jo2 = o.Sd, Xo2 = o.Td, Zo2 = o.Ud, Ko2 = o.Vd, Qo2 = o.Wd, ea2 = o.Xd, ta2 = o.Yd, ra2 = o.Zd, na2 = o._d, oa2 = o.$d, aa2 = o.ae, sa2 = o.be, ia2 = o.ce, ua2 = o.de, fa2 = o.fe, ca2 = o.ge, da2 = o.he, la2 = o.ie, pa2 = o.je, ma2 = o.ke, ha2 = o.le, ba2 = o.me, ga2 = o.Ae, ya2 = o.Be, wa2 = o.Ce, Ta2 = o.De, va2 = o.Ee, Ea2 = o.Fe, Sa2 = o.Ge, xa2 = o.He, Aa2 = o.Ie, Ia2 = o.Je, La2 = o.Ke, Ba2 = o.nf, Oa2 = o.of, Ma2 = o.pf, Ca2 = o.qf, T = u, Ne2;
    }
    var t6, n = qe2();
    return r.instantiateWasm ? new Promise((o) => {
      r.instantiateWasm(n, (u, c) => {
        o(e(u, c));
      });
    }) : i ? e(new WebAssembly.Instance(T, qe2()), T) : (ge2 ??= r.locateFile ? r.locateFile ? r.locateFile("ort-wasm-simd-threaded.asyncify.wasm", S2) : S2 + "ort-wasm-simd-threaded.asyncify.wasm" : new URL("ort-wasm-simd-threaded.asyncify.wasm", import.meta.url).href, t6 = await (async function(o) {
      var u = ge2;
      if (!v && !oe(u)) try {
        var c = fetch(u, { credentials: "same-origin" });
        return await WebAssembly.instantiateStreaming(c, o);
      } catch (h2) {
        O(`wasm streaming compile failed: ${h2}`), O("falling back to ArrayBuffer instantiation");
      }
      return (async function(h2, m) {
        try {
          var y = await (async function(x) {
            if (!v) try {
              var N2 = await l(x);
              return new Uint8Array(N2);
            } catch {
            }
            if (x == ge2 && v) x = new Uint8Array(v);
            else {
              if (!b) throw "both async and sync fetching of the wasm failed";
              x = b(x);
            }
            return x;
          })(h2);
          return await WebAssembly.instantiate(y, m);
        } catch (x) {
          O(`failed to asynchronously prepare wasm: ${x}`), we2(x);
        }
      })(u, o);
    })(n), e(t6.instance, t6.module));
  }
  class Tt2 {
    name = "ExitStatus";
    constructor(t6) {
      this.message = `Program terminated with exit(${t6})`, this.status = t6;
    }
  }
  var Se2 = (e) => {
    e.terminate(), e.onmessage = () => {
    };
  }, xe2 = [], Be2 = 0, re2 = null, Q2 = (e) => {
    ke2.length == 0 && (vn2(), Tn2(ke2[0]));
    var t6 = ke2.pop();
    if (!t6) return 6;
    vt2.push(t6), Je2[e.Xc] = t6, t6.Xc = e.Xc;
    var n = { $c: "run", ze: e.ye, kd: e.kd, Xc: e.Xc };
    return t6.postMessage(n, e.oe), 0;
  }, z2 = 0, H2 = (e, t6, ...n) => {
    var o, u = 16 * n.length, c = P2(), h2 = Vt2(u), m = h2 >>> 3;
    for (o of n) typeof o == "bigint" ? ((d(), pe2)[m++ >>> 0] = 1n, (d(), pe2)[m++ >>> 0] = o) : ((d(), pe2)[m++ >>> 0] = 0n, (d(), ae2)[m++ >>> 0] = o);
    return e = Ro2(e, 0, u, h2, t6), D(c), e;
  };
  function Ye2(e) {
    if (i) return H2(0, 1, e);
    if (A = e, !(0 < z2)) {
      for (var t6 of vt2) Se2(t6);
      for (t6 of ke2) Se2(t6);
      ke2 = [], vt2 = [], Je2 = {}, $ = true;
    }
    g(0, new Tt2(e));
  }
  function Tr2(e) {
    if (i) return H2(1, 0, e);
    vr2(e);
  }
  var vr2 = (e) => {
    if (A = e, i) throw Tr2(e), "unwind";
    Ye2(e);
  }, ke2 = [], vt2 = [], gn2 = [], Je2 = {}, yn2 = (e) => {
    var t6 = e.Xc;
    delete Je2[t6], ke2.push(e), vt2.splice(vt2.indexOf(e), 1), e.Xc = 0, No2(t6);
  };
  function wn2() {
    gn2.forEach((e) => e());
  }
  var Tn2 = (e) => new Promise((t6) => {
    e.onmessage = (u) => {
      var c = u.data;
      if (u = c.$c, c.gd && c.gd != zt2()) {
        var h2 = Je2[c.gd];
        h2 ? h2.postMessage(c, c.oe) : O(`Internal error! Worker sent a message "${u}" to target pthread ${c.gd}, but that thread no longer exists!`);
      } else u === "checkMailbox" ? _t2() : u === "spawnThread" ? Q2(c) : u === "cleanupThread" ? me2(() => {
        yn2(Je2[c.Le]);
      }) : u === "loaded" ? (e.loaded = true, t6(e)) : c.target === "setimmediate" ? e.postMessage(c) : u === "uncaughtException" ? e.onerror(c.error) : u === "callHandler" ? r[c.te](...c.args) : u && O(`worker sent an unknown command ${u}`);
    }, e.onerror = (u) => {
      throw O(`worker sent an error! ${u.filename}:${u.lineno}: ${u.message}`), u;
    };
    var n, o = [];
    for (n of []) r.propertyIsEnumerable(n) && o.push(n);
    e.postMessage({ $c: "load", ue: o, Me: Fe2, Ne: T });
  });
  function vn2() {
    var e = new Worker((() => {
      let t6 = URL;
      return import.meta.url > "file:" && import.meta.url < "file;" ? new t6("ort.webgpu.bundle.min.mjs", import.meta.url) : new URL(import.meta.url);
    })(), { type: "module", workerData: "em-pthread", name: "em-pthread" });
    ke2.push(e);
  }
  var Fe2, ei2 = (e, t6) => {
    z2 = 0, e = qr2(e, t6), 0 < z2 ? A = e : Vr2(e);
  }, Pt2 = [], Ut2 = 0, ue = (e) => -9007199254740992 > e || 9007199254740992 < e ? NaN : Number(e);
  function ti2(e) {
    var t6 = new Er2(e >>>= 0);
    return (d(), Z)[t6.ad + 12 >>> 0] == 0 && (En2(t6, true), Ut2--), Sn2(t6, false), Pt2.push(t6), zo2(e);
  }
  var dt2 = 0, ri2 = () => {
    W(0, 0);
    var e = Pt2.pop();
    Go2(e.td), dt2 = 0;
  };
  function En2(e, t6) {
    t6 = t6 ? 1 : 0, (d(), Z)[e.ad + 12 >>> 0] = t6;
  }
  function Sn2(e, t6) {
    t6 = t6 ? 1 : 0, (d(), Z)[e.ad + 13 >>> 0] = t6;
  }
  class Er2 {
    constructor(t6) {
      this.td = t6, this.ad = t6 - 24;
    }
  }
  var Sr2 = (e) => {
    var t6 = dt2;
    if (!t6) return xt2(0), 0;
    var n = new Er2(t6);
    (d(), E2)[n.ad + 16 >>> 2 >>> 0] = t6;
    var o = (d(), E2)[n.ad + 4 >>> 2 >>> 0];
    if (!o) return xt2(0), t6;
    for (var u of e) {
      if (u === 0 || u === o) break;
      if ($o2(u, o, n.ad + 16)) return xt2(u), t6;
    }
    return xt2(o), t6;
  };
  function ni2() {
    return Sr2([]);
  }
  function oi2(e) {
    return Sr2([e >>> 0]);
  }
  function ai2(e, t6, n, o) {
    return Sr2([e >>> 0, t6 >>> 0, n >>> 0, o >>> 0]);
  }
  var si2 = () => {
    var e = Pt2.pop();
    e || we2("no exception to throw");
    var t6 = e.td;
    throw (d(), Z)[e.ad + 13 >>> 0] == 0 && (Pt2.push(e), Sn2(e, true), En2(e, false), Ut2++), Hr2(t6), dt2 = t6;
  };
  function ii2(e, t6, n) {
    var o = new Er2(e >>>= 0);
    throw t6 >>>= 0, n >>>= 0, (d(), E2)[o.ad + 16 >>> 2 >>> 0] = 0, (d(), E2)[o.ad + 4 >>> 2 >>> 0] = t6, (d(), E2)[o.ad + 8 >>> 2 >>> 0] = n, Hr2(e), Ut2++, dt2 = e;
  }
  var ui2 = () => Ut2;
  function xn2(e, t6, n, o) {
    return i ? H2(2, 1, e, t6, n, o) : An2(e, t6, n, o);
  }
  function An2(e, t6, n, o) {
    if (e >>>= 0, t6 >>>= 0, n >>>= 0, o >>>= 0, !globalThis.SharedArrayBuffer) return 6;
    var u = [];
    return i && u.length === 0 ? xn2(e, t6, n, o) : (e = { ye: n, Xc: e, kd: o, oe: u }, i ? (e.$c = "spawnThread", postMessage(e, u), 0) : Q2(e));
  }
  function fi2(e) {
    throw dt2 ||= e >>> 0, dt2;
  }
  var In2 = globalThis.TextDecoder && new TextDecoder(), Ln2 = (e, t6, n, o) => {
    if (n = t6 + n, o) return n;
    for (; e[t6] && !(t6 >= n); ) ++t6;
    return t6;
  }, Bn2 = (e, t6 = 0, n, o) => {
    if (16 < (n = Ln2(e, t6 >>>= 0, n, o)) - t6 && e.buffer && In2) return In2.decode(e.buffer instanceof ArrayBuffer ? e.subarray(t6, n) : e.slice(t6, n));
    for (o = ""; t6 < n; ) {
      var u = e[t6++];
      if (128 & u) {
        var c = 63 & e[t6++];
        if ((224 & u) == 192) o += String.fromCharCode((31 & u) << 6 | c);
        else {
          var h2 = 63 & e[t6++];
          65536 > (u = (240 & u) == 224 ? (15 & u) << 12 | c << 6 | h2 : (7 & u) << 18 | c << 12 | h2 << 6 | 63 & e[t6++]) ? o += String.fromCharCode(u) : (u -= 65536, o += String.fromCharCode(55296 | u >> 10, 56320 | 1023 & u));
        }
      } else o += String.fromCharCode(u);
    }
    return o;
  }, lt2 = (e, t6, n) => (e >>>= 0) ? Bn2((d(), X2), e, t6, n) : "";
  function On2(e, t6, n) {
    return i ? H2(3, 1, e, t6, n) : 0;
  }
  function Mn2(e, t6) {
    if (i) return H2(4, 1, e, t6);
  }
  function Cn2(e, t6) {
    if (i) return H2(5, 1, e, t6);
  }
  function Dn2(e, t6, n) {
    if (i) return H2(6, 1, e, t6, n);
  }
  function Pn2(e, t6, n) {
    return i ? H2(7, 1, e, t6, n) : 0;
  }
  function Un2(e, t6) {
    if (i) return H2(8, 1, e, t6);
  }
  function _n2(e, t6, n) {
    if (i) return H2(9, 1, e, t6, n);
  }
  function Rn2(e, t6, n, o) {
    if (i) return H2(10, 1, e, t6, n, o);
  }
  function Nn2(e, t6, n, o) {
    if (i) return H2(11, 1, e, t6, n, o);
  }
  function Wn2(e, t6, n, o) {
    if (i) return H2(12, 1, e, t6, n, o);
  }
  function kn2(e) {
    if (i) return H2(13, 1, e);
  }
  function Fn2(e, t6) {
    if (i) return H2(14, 1, e, t6);
  }
  function Gn2(e, t6, n) {
    if (i) return H2(15, 1, e, t6, n);
  }
  var ci2 = () => we2(""), Oe2 = (e) => {
    e >>>= 0;
    for (var t6 = ""; ; ) {
      var n = (d(), X2)[e++ >>> 0];
      if (!n) return t6;
      t6 += String.fromCharCode(n);
    }
  }, xr2 = {}, Ar2 = {}, di2 = {}, pt2 = class extends Error {
    constructor(e) {
      super(e), this.name = "BindingError";
    }
  };
  function Pe2(e, t6, n = {}) {
    return (function(o, u, c = {}) {
      var h2 = u.name;
      if (!o) throw new pt2(`type "${h2}" must have a positive integer typeid pointer`);
      if (Ar2.hasOwnProperty(o)) {
        if (c.ve) return;
        throw new pt2(`Cannot register type '${h2}' twice`);
      }
      Ar2[o] = u, delete di2[o], xr2.hasOwnProperty(o) && (u = xr2[o], delete xr2[o], u.forEach((m) => m()));
    })(e, t6, n);
  }
  var $n2 = (e, t6, n) => {
    switch (t6) {
      case 1:
        return n ? (o) => (d(), Z)[o >>> 0] : (o) => (d(), X2)[o >>> 0];
      case 2:
        return n ? (o) => (d(), De2)[o >>> 1 >>> 0] : (o) => (d(), K2)[o >>> 1 >>> 0];
      case 4:
        return n ? (o) => (d(), I)[o >>> 2 >>> 0] : (o) => (d(), E2)[o >>> 2 >>> 0];
      case 8:
        return n ? (o) => (d(), pe2)[o >>> 3 >>> 0] : (o) => (d(), J2)[o >>> 3 >>> 0];
      default:
        throw new TypeError(`invalid integer width (${t6}): ${e}`);
    }
  };
  function li2(e, t6, n, o, u) {
    e >>>= 0, n >>>= 0, t6 = Oe2(t6 >>> 0);
    let c = (h2) => h2;
    if (o = o === 0n) {
      let h2 = 8 * n;
      c = (m) => BigInt.asUintN(h2, m), u = c(u);
    }
    Pe2(e, { name: t6, Wc: c, cd: (h2, m) => (typeof m == "number" && (m = BigInt(m)), m), bd: $n2(t6, n, !o), dd: null });
  }
  function pi2(e, t6, n, o) {
    Pe2(e >>>= 0, { name: t6 = Oe2(t6 >>> 0), Wc: function(u) {
      return !!u;
    }, cd: function(u, c) {
      return c ? n : o;
    }, bd: function(u) {
      return this.Wc((d(), X2)[u >>> 0]);
    }, dd: null });
  }
  var zn2 = [], Xe2 = [0, 1, , 1, null, 1, true, 1, false, 1];
  function Ir2(e) {
    9 < (e >>>= 0) && --Xe2[e + 1] === 0 && (Xe2[e] = void 0, zn2.push(e));
  }
  var Te2 = (e) => {
    if (!e) throw new pt2(`Cannot use deleted val. handle = ${e}`);
    return Xe2[e];
  }, Ae2 = (e) => {
    switch (e) {
      case void 0:
        return 2;
      case null:
        return 4;
      case true:
        return 6;
      case false:
        return 8;
      default:
        let t6 = zn2.pop() || Xe2.length;
        return Xe2[t6] = e, Xe2[t6 + 1] = 1, t6;
    }
  };
  function Lr2(e) {
    return this.Wc((d(), E2)[e >>> 2 >>> 0]);
  }
  var mi2 = { name: "emscripten::val", Wc: (e) => {
    var t6 = Te2(e);
    return Ir2(e), t6;
  }, cd: (e, t6) => Ae2(t6), bd: Lr2, dd: null };
  function hi2(e) {
    return Pe2(e >>> 0, mi2);
  }
  var bi2 = (e, t6) => {
    switch (t6) {
      case 4:
        return function(n) {
          return this.Wc((d(), R3)[n >>> 2 >>> 0]);
        };
      case 8:
        return function(n) {
          return this.Wc((d(), ae2)[n >>> 3 >>> 0]);
        };
      default:
        throw new TypeError(`invalid float width (${t6}): ${e}`);
    }
  };
  function gi2(e, t6, n) {
    n >>>= 0, Pe2(e >>>= 0, { name: t6 = Oe2(t6 >>> 0), Wc: (o) => o, cd: (o, u) => u, bd: bi2(t6, n), dd: null });
  }
  function yi2(e, t6, n, o, u) {
    e >>>= 0, n >>>= 0, t6 = Oe2(t6 >>> 0);
    let c = (m) => m;
    if (o === 0) {
      var h2 = 32 - 8 * n;
      c = (m) => m << h2 >>> h2, u = c(u);
    }
    Pe2(e, { name: t6, Wc: c, cd: (m, y) => y, bd: $n2(t6, n, o !== 0), dd: null });
  }
  function wi2(e, t6, n) {
    function o(c) {
      var h2 = (d(), E2)[c >>> 2 >>> 0];
      return c = (d(), E2)[c + 4 >>> 2 >>> 0], new u((d(), Z).buffer, c, h2);
    }
    var u = [Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array, BigInt64Array, BigUint64Array][t6];
    Pe2(e >>>= 0, { name: n = Oe2(n >>> 0), Wc: o, bd: o }, { ve: true });
  }
  var Ue2 = (e, t6, n) => {
    var o = (d(), X2);
    if (t6 >>>= 0, 0 < n) {
      var u = t6;
      n = t6 + n - 1;
      for (var c = 0; c < e.length; ++c) {
        var h2 = e.codePointAt(c);
        if (127 >= h2) {
          if (t6 >= n) break;
          o[t6++ >>> 0] = h2;
        } else if (2047 >= h2) {
          if (t6 + 1 >= n) break;
          o[t6++ >>> 0] = 192 | h2 >> 6, o[t6++ >>> 0] = 128 | 63 & h2;
        } else if (65535 >= h2) {
          if (t6 + 2 >= n) break;
          o[t6++ >>> 0] = 224 | h2 >> 12, o[t6++ >>> 0] = 128 | h2 >> 6 & 63, o[t6++ >>> 0] = 128 | 63 & h2;
        } else {
          if (t6 + 3 >= n) break;
          o[t6++ >>> 0] = 240 | h2 >> 18, o[t6++ >>> 0] = 128 | h2 >> 12 & 63, o[t6++ >>> 0] = 128 | h2 >> 6 & 63, o[t6++ >>> 0] = 128 | 63 & h2, c++;
        }
      }
      o[t6 >>> 0] = 0, e = t6 - u;
    } else e = 0;
    return e;
  }, _e = (e) => {
    for (var t6 = 0, n = 0; n < e.length; ++n) {
      var o = e.charCodeAt(n);
      127 >= o ? t6++ : 2047 >= o ? t6 += 2 : 55296 <= o && 57343 >= o ? (t6 += 4, ++n) : t6 += 3;
    }
    return t6;
  };
  function Ti2(e, t6) {
    Pe2(e >>>= 0, { name: t6 = Oe2(t6 >>> 0), Wc(n) {
      var o = (d(), E2)[n >>> 2 >>> 0];
      return o = lt2(n + 4, o, true), ve2(n), o;
    }, cd(n, o) {
      o instanceof ArrayBuffer && (o = new Uint8Array(o));
      var u = typeof o == "string";
      if (!(u || ArrayBuffer.isView(o) && o.BYTES_PER_ELEMENT == 1)) throw new pt2("Cannot pass non-string to std::string");
      var c = u ? _e(o) : o.length, h2 = Ke(4 + c + 1), m = h2 + 4;
      return (d(), E2)[h2 >>> 2 >>> 0] = c, u ? Ue2(o, m, c + 1) : (d(), X2).set(o, m >>> 0), n !== null && n.push(ve2, h2), h2;
    }, bd: Lr2, dd(n) {
      ve2(n);
    } });
  }
  var Vn2 = globalThis.TextDecoder ? new TextDecoder("utf-16le") : void 0, vi2 = (e, t6, n) => {
    if (e >>>= 1, 16 < (t6 = Ln2((d(), K2), e, t6 / 2, n)) - e && Vn2) return Vn2.decode((d(), K2).slice(e, t6));
    for (n = ""; e < t6; ++e) {
      var o = (d(), K2)[e >>> 0];
      n += String.fromCharCode(o);
    }
    return n;
  }, Ei2 = (e, t6, n) => {
    if (n ??= 2147483647, 2 > n) return 0;
    var o = t6;
    n = (n -= 2) < 2 * e.length ? n / 2 : e.length;
    for (var u = 0; u < n; ++u) {
      var c = e.charCodeAt(u);
      (d(), De2)[t6 >>> 1 >>> 0] = c, t6 += 2;
    }
    return (d(), De2)[t6 >>> 1 >>> 0] = 0, t6 - o;
  }, Si2 = (e) => 2 * e.length, xi2 = (e, t6, n) => {
    var o = "";
    e >>>= 2;
    for (var u = 0; !(u >= t6 / 4); u++) {
      var c = (d(), E2)[e + u >>> 0];
      if (!c && !n) break;
      o += String.fromCodePoint(c);
    }
    return o;
  }, Ai2 = (e, t6, n) => {
    if (t6 >>>= 0, n ??= 2147483647, 4 > n) return 0;
    var o = t6;
    n = o + n - 4;
    for (var u = 0; u < e.length; ++u) {
      var c = e.codePointAt(u);
      if (65535 < c && u++, (d(), I)[t6 >>> 2 >>> 0] = c, (t6 += 4) + 4 > n) break;
    }
    return (d(), I)[t6 >>> 2 >>> 0] = 0, t6 - o;
  }, Ii2 = (e) => {
    for (var t6 = 0, n = 0; n < e.length; ++n) 65535 < e.codePointAt(n) && n++, t6 += 4;
    return t6;
  };
  function Li2(e, t6, n) {
    if (e >>>= 0, t6 >>>= 0, n = Oe2(n >>>= 0), t6 === 2) var o = vi2, u = Ei2, c = Si2;
    else o = xi2, u = Ai2, c = Ii2;
    Pe2(e, { name: n, Wc: (h2) => {
      var m = (d(), E2)[h2 >>> 2 >>> 0];
      return m = o(h2 + 4, m * t6, true), ve2(h2), m;
    }, cd: (h2, m) => {
      if (typeof m != "string") throw new pt2(`Cannot pass non-string to C++ string type ${n}`);
      var y = c(m), x = Ke(4 + y + t6);
      return (d(), E2)[x >>> 2 >>> 0] = y / t6, u(m, x + 4, y + t6), h2 !== null && h2.push(ve2, x), x;
    }, bd: Lr2, dd(h2) {
      ve2(h2);
    } });
  }
  function Bi2(e, t6) {
    Pe2(e >>>= 0, { we: true, name: t6 = Oe2(t6 >>> 0), Wc: () => {
    }, cd: () => {
    } });
  }
  function Oi2(e) {
    zr2(e >>> 0, !f, 1, !s, 131072, false), wn2();
  }
  var me2 = (e) => {
    if (!$) try {
      if (e(), !(0 < z2)) try {
        i ? zt2() && Vr2(A) : vr2(A);
      } catch (t6) {
        t6 instanceof Tt2 || t6 == "unwind" || g(0, t6);
      }
    } catch (t6) {
      t6 instanceof Tt2 || t6 == "unwind" || g(0, t6);
    }
  }, Mi2 = !Atomics.waitAsync || globalThis.navigator?.userAgent && 91 > Number((navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./) || [])[2]);
  function Br(e) {
    e >>>= 0, Mi2 || (Atomics.waitAsync((d(), I), e >>> 2, e).value.then(_t2), e += 128, Atomics.store((d(), I), e >>> 2, 1));
  }
  var _t2 = () => me2(() => {
    var e = zt2();
    e && (Br(e), ko2());
  });
  function Ci2(e, t6) {
    (e >>>= 0) == t6 >>> 0 ? setTimeout(_t2) : i ? postMessage({ gd: e, $c: "checkMailbox" }) : (e = Je2[e]) && e.postMessage({ $c: "checkMailbox" });
  }
  var Or2 = [];
  function Di2(e, t6, n, o, u) {
    for (t6 >>>= 0, u >>>= 0, Or2.length = 0, n = u >>> 3, o = u + o >>> 3; n < o; ) {
      var c;
      c = (d(), pe2)[n++ >>> 0] ? (d(), pe2)[n++ >>> 0] : (d(), ae2)[n++ >>> 0], Or2.push(c);
    }
    return (t6 ? Yr2[t6] : xf2[e])(...Or2);
  }
  var Pi2 = () => {
    z2 = 0;
  };
  function Ui2(e) {
    e >>>= 0, i ? postMessage({ $c: "cleanupThread", Le: e }) : yn2(Je2[e]);
  }
  function _i2(e) {
  }
  var Rt2 = (e) => {
    try {
      e();
    } catch (t6) {
      we2(t6);
    }
  };
  function Ri2(e) {
    var t6 = (...n) => {
      Nt2.push(e);
      try {
        return e(...n);
      } finally {
        $ || (Nt2.pop(), Me2 && Ge2 === 1 && Nt2.length === 0 && (Ge2 = 0, z2 += 1, Rt2(Oa2), typeof Fibers < "u" && Fibers.We()));
      }
    };
    return qn2.set(e, t6), t6;
  }
  var Ge2 = 0, Me2 = null, jn2 = 0, Nt2 = [], Mr2 = /* @__PURE__ */ new Map(), Hn2 = /* @__PURE__ */ new Map(), qn2 = /* @__PURE__ */ new Map(), Ni2 = 0, Cr2 = null, Wi2 = [], Yn2 = (e) => (function(t6) {
    if (!$) {
      if (Ge2 === 0) {
        var n = false, o = false;
        t6((u = 0) => {
          if (!$ && (jn2 = u, n = true, o)) {
            Ge2 = 2, Rt2(() => Ma2(Me2)), typeof MainLoop < "u" && MainLoop.se && MainLoop.resume(), u = false;
            try {
              var c = (function() {
                var y = (d(), I)[Me2 + 8 >>> 2 >>> 0];
                return y = Hn2.get(y), y = qn2.get(y), --z2, y();
              })();
            } catch (y) {
              c = y, u = true;
            }
            var h2 = false;
            if (!Me2) {
              var m = Cr2;
              m && (Cr2 = null, (u ? m.reject : m.resolve)(c), h2 = true);
            }
            if (u && !h2) throw c;
          }
        }), o = true, n || (Ge2 = 1, Me2 = (function() {
          var u = Ke(65548), c = u + 12;
          if ((d(), E2)[u >>> 2 >>> 0] = c, (d(), E2)[u + 4 >>> 2 >>> 0] = c + 65536, c = Nt2[0], !Mr2.has(c)) {
            var h2 = Ni2++;
            Mr2.set(c, h2), Hn2.set(h2, c);
          }
          return c = Mr2.get(c), (d(), I)[u + 8 >>> 2 >>> 0] = c, u;
        })(), typeof MainLoop < "u" && MainLoop.se && MainLoop.pause(), Rt2(() => Ba2(Me2)));
      } else Ge2 === 2 ? (Ge2 = 0, Rt2(Ca2), ve2(Me2), Me2 = null, Wi2.forEach(me2)) : we2(`invalid state: ${Ge2}`);
      return jn2;
    }
  })((t6) => {
    e().then(t6);
  });
  function ki2(e) {
    return e >>>= 0, Yn2(async () => {
      var t6 = await Te2(e);
      return Ae2(t6);
    });
  }
  var Dr = [], Fi2 = (e) => {
    var t6 = Dr.length;
    return Dr.push(e), t6;
  }, Gi2 = (e, t6) => {
    for (var n = Array(e), o = 0; o < e; ++o) {
      var u = o, c = (d(), E2)[t6 + 4 * o >>> 2 >>> 0], h2 = Ar2[c];
      if (h2 === void 0) throw e = `parameter ${o}`, c = To2(c), t6 = Oe2(c), ve2(c), new pt2(`${e} has unknown type ${t6}`);
      n[u] = h2;
    }
    return n;
  }, $i2 = (e, t6, n) => {
    var o = [];
    return e = e(o, n), o.length && ((d(), E2)[t6 >>> 2 >>> 0] = Ae2(o)), e;
  }, zi2 = {}, Wt2 = (e) => {
    var t6 = zi2[e];
    return t6 === void 0 ? Oe2(e) : t6;
  };
  function Vi2(e, t6, n) {
    var [o, ...u] = Gi2(e, t6 >>> 0);
    t6 = o.cd.bind(o);
    var c = u.map((y) => y.bd.bind(y));
    e--;
    var h2 = { toValue: Te2 };
    switch (e = c.map((y, x) => {
      var N2 = `argFromPtr${x}`;
      return h2[N2] = y, `${N2}(args${x ? "+" + 8 * x : ""})`;
    }), n) {
      case 0:
        var m = "toValue(handle)";
        break;
      case 2:
        m = "new (toValue(handle))";
        break;
      case 3:
        m = "";
        break;
      case 1:
        h2.getStringOrSymbol = Wt2, m = "toValue(handle)[getStringOrSymbol(methodName)]";
    }
    return m += `(${e})`, o.we || (h2.toReturnWire = t6, h2.emval_returnValue = $i2, m = `return emval_returnValue(toReturnWire, destructorsRef, ${m})`), m = `return function (handle, methodName, destructorsRef, args) {
  ${m}
  }`, n = new Function(Object.keys(h2), m)(...Object.values(h2)), m = `methodCaller<(${u.map((y) => y.name)}) => ${o.name}>`, Fi2(Object.defineProperty(n, "name", { value: m }));
  }
  function ji2(e, t6) {
    return t6 >>>= 0, (e = Te2(e >>> 0)) == Te2(t6);
  }
  function Hi2(e) {
    return (e >>>= 0) ? (e = Wt2(e), Ae2(globalThis[e])) : Ae2(globalThis);
  }
  function qi2(e) {
    return e = Wt2(e >>> 0), Ae2(r[e]);
  }
  function Yi2(e, t6) {
    return t6 >>>= 0, e = Te2(e >>> 0), t6 = Te2(t6), Ae2(e[t6]);
  }
  function Ji2(e) {
    9 < (e >>>= 0) && (Xe2[e + 1] += 1);
  }
  function Jn2(e, t6, n, o, u) {
    return Dr[e >>> 0](t6 >>> 0, n >>> 0, o >>> 0, u >>> 0);
  }
  function Xi2(e, t6, n, o, u) {
    return Jn2(e >>> 0, t6 >>> 0, n >>> 0, o >>> 0, u >>> 0);
  }
  function Zi2() {
    return Ae2([]);
  }
  function Ki2(e) {
    e = Te2(e >>> 0);
    for (var t6 = Array(e.length), n = 0; n < e.length; n++) t6[n] = e[n];
    return Ae2(t6);
  }
  function Qi2(e) {
    return Ae2(Wt2(e >>> 0));
  }
  function eu2() {
    return Ae2({});
  }
  function tu2(e) {
    for (var t6 = Te2(e >>>= 0); t6.length; ) {
      var n = t6.pop();
      t6.pop()(n);
    }
    Ir2(e);
  }
  function ru2(e, t6, n) {
    t6 >>>= 0, n >>>= 0, e = Te2(e >>> 0), t6 = Te2(t6), n = Te2(n), e[t6] = n;
  }
  function nu2(e, t6) {
    e = ue(e), t6 >>>= 0, e = new Date(1e3 * e), (d(), I)[t6 >>> 2 >>> 0] = e.getUTCSeconds(), (d(), I)[t6 + 4 >>> 2 >>> 0] = e.getUTCMinutes(), (d(), I)[t6 + 8 >>> 2 >>> 0] = e.getUTCHours(), (d(), I)[t6 + 12 >>> 2 >>> 0] = e.getUTCDate(), (d(), I)[t6 + 16 >>> 2 >>> 0] = e.getUTCMonth(), (d(), I)[t6 + 20 >>> 2 >>> 0] = e.getUTCFullYear() - 1900, (d(), I)[t6 + 24 >>> 2 >>> 0] = e.getUTCDay(), e = (e.getTime() - Date.UTC(e.getUTCFullYear(), 0, 1, 0, 0, 0, 0)) / 864e5 | 0, (d(), I)[t6 + 28 >>> 2 >>> 0] = e;
  }
  var Xn2 = (e) => e % 4 == 0 && (e % 100 != 0 || e % 400 == 0), Zn2 = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335], Kn2 = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
  function ou2(e, t6) {
    e = ue(e), t6 >>>= 0, e = new Date(1e3 * e), (d(), I)[t6 >>> 2 >>> 0] = e.getSeconds(), (d(), I)[t6 + 4 >>> 2 >>> 0] = e.getMinutes(), (d(), I)[t6 + 8 >>> 2 >>> 0] = e.getHours(), (d(), I)[t6 + 12 >>> 2 >>> 0] = e.getDate(), (d(), I)[t6 + 16 >>> 2 >>> 0] = e.getMonth(), (d(), I)[t6 + 20 >>> 2 >>> 0] = e.getFullYear() - 1900, (d(), I)[t6 + 24 >>> 2 >>> 0] = e.getDay();
    var n = (Xn2(e.getFullYear()) ? Zn2 : Kn2)[e.getMonth()] + e.getDate() - 1 | 0;
    (d(), I)[t6 + 28 >>> 2 >>> 0] = n, (d(), I)[t6 + 36 >>> 2 >>> 0] = -60 * e.getTimezoneOffset(), n = new Date(e.getFullYear(), 6, 1).getTimezoneOffset();
    var o = new Date(e.getFullYear(), 0, 1).getTimezoneOffset();
    e = 0 | (n != o && e.getTimezoneOffset() == Math.min(o, n)), (d(), I)[t6 + 32 >>> 2 >>> 0] = e;
  }
  function au2(e) {
    e >>>= 0;
    var t6 = new Date((d(), I)[e + 20 >>> 2 >>> 0] + 1900, (d(), I)[e + 16 >>> 2 >>> 0], (d(), I)[e + 12 >>> 2 >>> 0], (d(), I)[e + 8 >>> 2 >>> 0], (d(), I)[e + 4 >>> 2 >>> 0], (d(), I)[e >>> 2 >>> 0], 0), n = (d(), I)[e + 32 >>> 2 >>> 0], o = t6.getTimezoneOffset(), u = new Date(t6.getFullYear(), 6, 1).getTimezoneOffset(), c = new Date(t6.getFullYear(), 0, 1).getTimezoneOffset(), h2 = Math.min(c, u);
    return 0 > n ? (d(), I)[e + 32 >>> 2 >>> 0] = +(u != c && h2 == o) : 0 < n != (h2 == o) && (u = Math.max(c, u), t6.setTime(t6.getTime() + 6e4 * ((0 < n ? h2 : u) - o))), (d(), I)[e + 24 >>> 2 >>> 0] = t6.getDay(), n = (Xn2(t6.getFullYear()) ? Zn2 : Kn2)[t6.getMonth()] + t6.getDate() - 1 | 0, (d(), I)[e + 28 >>> 2 >>> 0] = n, (d(), I)[e >>> 2 >>> 0] = t6.getSeconds(), (d(), I)[e + 4 >>> 2 >>> 0] = t6.getMinutes(), (d(), I)[e + 8 >>> 2 >>> 0] = t6.getHours(), (d(), I)[e + 12 >>> 2 >>> 0] = t6.getDate(), (d(), I)[e + 16 >>> 2 >>> 0] = t6.getMonth(), (d(), I)[e + 20 >>> 2 >>> 0] = t6.getYear(), e = t6.getTime(), BigInt(isNaN(e) ? -1 : e / 1e3);
  }
  function Qn2(e, t6, n, o, u, c, h2) {
    return i ? H2(16, 1, e, t6, n, o, u, c, h2) : -52;
  }
  function eo2(e, t6, n, o, u, c) {
    if (i) return H2(17, 1, e, t6, n, o, u, c);
  }
  var Et2 = {}, su2 = () => performance.timeOrigin + performance.now();
  function to2(e, t6) {
    if (i) return H2(18, 1, e, t6);
    if (Et2[e] && (clearTimeout(Et2[e].id), delete Et2[e]), !t6) return 0;
    var n = setTimeout(() => {
      delete Et2[e], me2(() => Wo2(e, performance.timeOrigin + performance.now()));
    }, t6);
    return Et2[e] = { id: n, Ve: t6 }, 0;
  }
  function iu2(e, t6, n, o) {
    e >>>= 0, t6 >>>= 0, n >>>= 0, o >>>= 0;
    var u = (/* @__PURE__ */ new Date()).getFullYear(), c = new Date(u, 0, 1).getTimezoneOffset();
    u = new Date(u, 6, 1).getTimezoneOffset();
    var h2 = Math.max(c, u);
    (d(), E2)[e >>> 2 >>> 0] = 60 * h2, (d(), I)[t6 >>> 2 >>> 0] = +(c != u), e = (t6 = (m) => {
      var y = Math.abs(m);
      return `UTC${0 <= m ? "-" : "+"}${String(Math.floor(y / 60)).padStart(2, "0")}${String(y % 60).padStart(2, "0")}`;
    })(c), t6 = t6(u), u < c ? (Ue2(e, n, 17), Ue2(t6, o, 17)) : (Ue2(e, o, 17), Ue2(t6, n, 17));
  }
  var uu2 = () => Date.now(), fu2 = 1;
  function cu2(e, t6, n) {
    if (n >>>= 0, !(0 <= e && 3 >= e)) return 28;
    if (e === 0) e = Date.now();
    else {
      if (!fu2) return 52;
      e = performance.timeOrigin + performance.now();
    }
    return e = Math.round(1e6 * e), (d(), pe2)[n >>> 3 >>> 0] = BigInt(e), 0;
  }
  var Pr2 = [], ro2 = (e, t6) => {
    Pr2.length = 0;
    for (var n; n = (d(), X2)[e++ >>> 0]; ) {
      var o = n != 105;
      t6 += (o &= n != 112) && t6 % 8 ? 4 : 0, Pr2.push(n == 112 ? (d(), E2)[t6 >>> 2 >>> 0] : n == 106 ? (d(), pe2)[t6 >>> 3 >>> 0] : n == 105 ? (d(), I)[t6 >>> 2 >>> 0] : (d(), ae2)[t6 >>> 3 >>> 0]), t6 += o ? 8 : 4;
    }
    return Pr2;
  };
  function du2(e, t6, n) {
    return e >>>= 0, t6 = ro2(t6 >>> 0, n >>> 0), Yr2[e](...t6);
  }
  function lu2(e, t6, n) {
    return e >>>= 0, t6 = ro2(t6 >>> 0, n >>> 0), Yr2[e](...t6);
  }
  var pu2 = () => {
  };
  function mu2(e, t6) {
    return O(lt2(e >>> 0, t6 >>> 0));
  }
  var hu2 = () => {
    throw z2 += 1, "unwind";
  };
  function bu2() {
    return 4294901760;
  }
  var gu2 = () => 1, yu2 = () => navigator.hardwareConcurrency, Ze2 = {}, no2 = (e) => {
    var t6 = _e(e) + 1, n = Ke(t6);
    return n && Ue2(e, n, t6), n;
  }, kt2 = (e) => {
    var t6;
    return (t6 = /\bwasm-function\[\d+\]:(0x[0-9a-f]+)/.exec(e)) ? +t6[1] : (t6 = /:(\d+):\d+(?:\)|$)/.exec(e)) ? 2147483648 | +t6[1] : 0;
  }, oo2 = (e) => {
    for (var t6 of e) (e = kt2(t6)) && (Ze2[e] = t6);
  };
  function wu2() {
    var e = Error().stack.toString().split(`
`);
    return e[0] == "Error" && e.shift(), oo2(e), Ze2.ee = kt2(e[3]), Ze2.xe = e, Ze2.ee;
  }
  function Ft2(e) {
    if (!(e = Ze2[e >>> 0])) return 0;
    var t6;
    if (t6 = /^\s+at .*\.wasm\.(.*) \(.*\)$/.exec(e)) e = t6[1];
    else if (t6 = /^\s+at (.*) \(.*\)$/.exec(e)) e = t6[1];
    else {
      if (!(t6 = /^(.+?)@/.exec(e))) return 0;
      e = t6[1];
    }
    return ve2(Ft2.ne ?? 0), Ft2.ne = no2(e), Ft2.ne;
  }
  function Tu2(e) {
    e >>>= 0;
    var t6 = (d(), X2).length;
    if (e <= t6 || 4294901760 < e) return false;
    for (var n = 1; 4 >= n; n *= 2) {
      var o = t6 * (1 + 0.2 / n);
      o = Math.min(o, e + 100663296);
      e: {
        o = (Math.min(4294901760, 65536 * Math.ceil(Math.max(e, o) / 65536)) - Fe2.buffer.byteLength + 65535) / 65536 | 0;
        try {
          Fe2.grow(o), se2();
          var u = 1;
          break e;
        } catch {
        }
        u = void 0;
      }
      if (u) return true;
    }
    return false;
  }
  function vu2(e, t6, n) {
    if (e >>>= 0, t6 >>>= 0, Ze2.ee == e) var o = Ze2.xe;
    else (o = Error().stack.toString().split(`
`))[0] == "Error" && o.shift(), oo2(o);
    for (var u = 3; o[u] && kt2(o[u]) != e; ) ++u;
    for (e = 0; e < n && o[e + u]; ++e) (d(), I)[t6 + 4 * e >>> 2 >>> 0] = kt2(o[e + u]);
    return e;
  }
  var Ce2 = (e) => {
    var t6 = _e(e) + 1, n = Vt2(t6);
    return Ue2(e, n, t6), n;
  }, mt2 = (e) => (d(), E2)[e >>> 2 >>> 0] + 4294967296 * (d(), I)[e + 4 >>> 2 >>> 0], fe2 = [], ao2 = (e, t6) => {
    fe2[e >>> 0] = t6;
  }, Re = [], Gt2 = [], ht2 = (e, t6) => {
    Gt2[e] = new Promise((n) => t6.finally(() => n(e)));
  }, B = (e) => {
    if (e) return fe2[e >>> 0];
  }, Ur2 = (e, t6) => {
    for (e = (d(), E2)[e >>> 2 >>> 0]; e; e = (d(), E2)[e >>> 2 >>> 0]) t6[(d(), I)[e + 4 >>> 2 >>> 0]](e);
  }, $t2 = (e, t6, n) => {
    (d(), E2)[e >>> 2 >>> 0] = t6, (d(), E2)[e + 4 >>> 2 >>> 0] = n;
  }, so2 = (e) => {
    var t6 = (d(), E2)[e >>> 2 >>> 0];
    return e = (d(), E2)[e + 4 >>> 2 >>> 0], lt2(t6, e);
  }, Ie2 = (e) => {
    var t6 = (d(), E2)[e >>> 2 >>> 0];
    return e = (d(), E2)[e + 4 >>> 2 >>> 0], t6 ? lt2(t6, e) : e === 0 ? "" : void 0;
  }, Eu2 = (e) => {
    var t6 = Ie2(e + 4), n = (n = (d(), E2)[e + 12 >>> 2 >>> 0]) ? B(n) : "auto";
    if (e += 16) {
      var o = B((d(), E2)[e + 4 >>> 2 >>> 0]), u = (d(), E2)[e + 16 >>> 2 >>> 0], c = (d(), E2)[e + 20 >>> 2 >>> 0];
      if (u) {
        for (var h2 = {}, m = 0; m < u; ++m) {
          var y = c + 24 * m;
          h2[so2(y + 4)] = (d(), ae2)[y + 16 >>> 3 >>> 0];
        }
        u = h2;
      } else u = void 0;
      e = { module: o, constants: u, entryPoint: Ie2(e + 8) };
    } else e = void 0;
    return { label: t6, layout: n, compute: e };
  }, io2 = (e, t6) => {
    function n(c, h2, m, y = 0) {
      c = e[c] ?? y, (d(), E2)[h2 + m >>> 2 >>> 0] = c;
    }
    function o(c, h2, m, y = 0) {
      h2 += m, c = e[c] ?? y, (d(), E2)[h2 >>> 2 >>> 0] = c, y = (d(), E2)[h2 >>> 2 >>> 0], (d(), E2)[h2 + 4 >>> 2 >>> 0] = (c - y) / 4294967296;
    }
    var u = (d(), E2)[t6 >>> 2 >>> 0];
    n("maxTextureDimension1D", t6, 4), n("maxTextureDimension2D", t6, 8), n("maxTextureDimension3D", t6, 12), n("maxTextureArrayLayers", t6, 16), n("maxBindGroups", t6, 20), n("maxBindGroupsPlusVertexBuffers", t6, 24), n("maxBindingsPerBindGroup", t6, 28), n("maxDynamicUniformBuffersPerPipelineLayout", t6, 32), n("maxDynamicStorageBuffersPerPipelineLayout", t6, 36), n("maxSampledTexturesPerShaderStage", t6, 40), n("maxSamplersPerShaderStage", t6, 44), n("maxStorageBuffersPerShaderStage", t6, 48), n("maxStorageTexturesPerShaderStage", t6, 52), n("maxUniformBuffersPerShaderStage", t6, 56), n("minUniformBufferOffsetAlignment", t6, 80), n("minStorageBufferOffsetAlignment", t6, 84), o("maxUniformBufferBindingSize", t6, 64), o("maxStorageBufferBindingSize", t6, 72), n("maxVertexBuffers", t6, 88), o("maxBufferSize", t6, 96), n("maxVertexAttributes", t6, 104), n("maxVertexBufferArrayStride", t6, 108), n("maxInterStageShaderVariables", t6, 112), n("maxColorAttachments", t6, 116), n("maxColorAttachmentBytesPerSample", t6, 120), n("maxComputeWorkgroupStorageSize", t6, 124), n("maxComputeInvocationsPerWorkgroup", t6, 128), n("maxComputeWorkgroupSizeX", t6, 132), n("maxComputeWorkgroupSizeY", t6, 136), n("maxComputeWorkgroupSizeZ", t6, 140), n("maxComputeWorkgroupsPerDimension", t6, 144), n("maxImmediateSize", t6, 148), u !== 0 && (d(), n("maxStorageBuffersInVertexStage", u, 8, e.maxStorageBuffersPerShaderStage), n("maxStorageBuffersInFragmentStage", u, 16, e.maxStorageBuffersPerShaderStage), n("maxStorageTexturesInVertexStage", u, 12, e.maxStorageTexturesPerShaderStage), n("maxStorageTexturesInFragmentStage", u, 20, e.maxStorageTexturesPerShaderStage));
  }, Su2 = (e, t6) => {
    (d(), E2)[t6 + 52 >>> 2 >>> 0] = e.subgroupMinSize, (d(), E2)[t6 + 56 >>> 2 >>> 0] = e.subgroupMaxSize;
    var n = no2(e.vendor + e.architecture + e.device + e.description), o = _e(e.vendor);
    $t2(t6 + 4, n, o), n += o, o = _e(e.architecture), $t2(t6 + 12, n, o), n += o, o = _e(e.device), $t2(t6 + 20, n, o), n += o, o = _e(e.description), $t2(t6 + 28, n, o), n += o, (d(), I)[t6 + 36 >>> 2 >>> 0] = 2, n = e.isFallbackAdapter ? 3 : 4, (d(), I)[t6 + 40 >>> 2 >>> 0] = n, (d(), E2)[t6 + 44 >>> 2 >>> 0] = 0, (d(), E2)[t6 + 48 >>> 2 >>> 0] = 0, Ur2(t6, { 327739: (u) => {
      let c = 0, h2 = 0;
      if (e.subgroupMatrixConfigs) {
        c = e.subgroupMatrixConfigs.length, h2 = Ke(20 * c);
        for (let [m, y] of e.subgroupMatrixConfigs.entries()) {
          let x = h2 + 20 * m, N2 = fo2.indexOf(y.componentType), F3 = fo2.indexOf(y.resultComponentType);
          (d(), I)[x >>> 2 >>> 0] = N2, (d(), I)[x + 4 >>> 2 >>> 0] = F3, (d(), E2)[x + 8 >>> 2 >>> 0] = y.M, (d(), E2)[x + 12 >>> 2 >>> 0] = y.N, (d(), E2)[x + 16 >>> 2 >>> 0] = y.K;
        }
      }
      (d(), E2)[u + 12 >>> 2 >>> 0] = h2, (d(), E2)[u + 8 >>> 2 >>> 0] = c;
    } });
  }, xu2 = [, , "uniform", "storage", "read-only-storage"], Au2 = [, "validation", "out-of-memory", "internal"], Iu2 = [, "compatibility", "core"], uo2 = { 1: "core-features-and-limits", 2: "depth-clip-control", 3: "depth32float-stencil8", 4: "texture-compression-bc", 5: "texture-compression-bc-sliced-3d", 6: "texture-compression-etc2", 7: "texture-compression-astc", 8: "texture-compression-astc-sliced-3d", 9: "timestamp-query", 10: "indirect-first-instance", 11: "shader-f16", 12: "rg11b10ufloat-renderable", 13: "bgra8unorm-storage", 14: "float32-filterable", 15: "float32-blendable", 16: "clip-distances", 17: "dual-source-blending", 18: "subgroups", 19: "texture-formats-tier1", 20: "texture-formats-tier2", 21: "primitive-index", 22: "texture-component-swizzle", 23: "subgroup-size-control", 327692: "chromium-experimental-unorm16-texture-formats", 327729: "chromium-experimental-multi-draw-indirect", 327732: "chromium-experimental-subgroup-matrix" }, Lu2 = [, "low-power", "high-performance"], Bu2 = [, "occlusion", "timestamp"], Ou2 = [, , "filtering", "non-filtering", "comparison"], Mu2 = [, , "write-only", "read-only", "read-write"], fo2 = [, "f32", "f16", "u32", "i32", "u8", "i8"], Cu2 = [, "r8unorm", "r8snorm", "r8uint", "r8sint", "r16unorm", "r16snorm", "r16uint", "r16sint", "r16float", "rg8unorm", "rg8snorm", "rg8uint", "rg8sint", "r32float", "r32uint", "r32sint", "rg16unorm", "rg16snorm", "rg16uint", "rg16sint", "rg16float", "rgba8unorm", "rgba8unorm-srgb", "rgba8snorm", "rgba8uint", "rgba8sint", "bgra8unorm", "bgra8unorm-srgb", "rgb10a2uint", "rgb10a2unorm", "rg11b10ufloat", "rgb9e5ufloat", "rg32float", "rg32uint", "rg32sint", "rgba16unorm", "rgba16snorm", "rgba16uint", "rgba16sint", "rgba16float", "rgba32float", "rgba32uint", "rgba32sint", "stencil8", "depth16unorm", "depth24plus", "depth24plus-stencil8", "depth32float", "depth32float-stencil8", "bc1-rgba-unorm", "bc1-rgba-unorm-srgb", "bc2-rgba-unorm", "bc2-rgba-unorm-srgb", "bc3-rgba-unorm", "bc3-rgba-unorm-srgb", "bc4-r-unorm", "bc4-r-snorm", "bc5-rg-unorm", "bc5-rg-snorm", "bc6h-rgb-ufloat", "bc6h-rgb-float", "bc7-rgba-unorm", "bc7-rgba-unorm-srgb", "etc2-rgb8unorm", "etc2-rgb8unorm-srgb", "etc2-rgb8a1unorm", "etc2-rgb8a1unorm-srgb", "etc2-rgba8unorm", "etc2-rgba8unorm-srgb", "eac-r11unorm", "eac-r11snorm", "eac-rg11unorm", "eac-rg11snorm", "astc-4x4-unorm", "astc-4x4-unorm-srgb", "astc-5x4-unorm", "astc-5x4-unorm-srgb", "astc-5x5-unorm", "astc-5x5-unorm-srgb", "astc-6x5-unorm", "astc-6x5-unorm-srgb", "astc-6x6-unorm", "astc-6x6-unorm-srgb", "astc-8x5-unorm", "astc-8x5-unorm-srgb", "astc-8x6-unorm", "astc-8x6-unorm-srgb", "astc-8x8-unorm", "astc-8x8-unorm-srgb", "astc-10x5-unorm", "astc-10x5-unorm-srgb", "astc-10x6-unorm", "astc-10x6-unorm-srgb", "astc-10x8-unorm", "astc-10x8-unorm-srgb", "astc-10x10-unorm", "astc-10x10-unorm-srgb", "astc-12x10-unorm", "astc-12x10-unorm-srgb", "astc-12x12-unorm", "astc-12x12-unorm-srgb"], Du2 = [, , "float", "unfilterable-float", "depth", "sint", "uint"], co2 = [, "1d", "2d", "2d-array", "cube", "cube-array", "3d"], Pu2 = { undefined: 1, unknown: 1, destroyed: 2 };
  function Uu2(e, t6, n, o, u, c) {
    t6 = ue(t6), n = ue(n), o >>>= 0, u >>>= 0, c >>>= 0;
    var h2 = B(e >>> 0);
    if (e = {}, c) {
      var m = (d(), E2)[c + 12 >>> 2 >>> 0];
      if (m) {
        var y = (d(), E2)[c + 16 >>> 2 >>> 0];
        e.requiredFeatures = Array.from((d(), E2).subarray(y >>> 2 >>> 0, y + 4 * m >>> 2 >>> 0), (L2) => uo2[L2]);
      }
      if (m = (d(), E2)[c + 20 >>> 2 >>> 0]) {
        let L2 = function(he2, de2, Qe2, et2 = false) {
          de2 += Qe2, (de2 = (d(), E2)[de2 >>> 2 >>> 0]) == 4294967295 || et2 && de2 == 0 || (x[he2] = de2);
        }, q = function(he2, de2, Qe2) {
          de2 += Qe2, Qe2 = (d(), E2)[de2 >>> 2 >>> 0];
          var et2 = (d(), E2)[de2 + 4 >>> 2 >>> 0];
          Qe2 == 4294967295 && et2 == 4294967295 || (x[he2] = mt2(de2));
        };
        var N2 = L2, F3 = q;
        y = (d(), E2)[m >>> 2 >>> 0];
        var x = {};
        L2("maxTextureDimension1D", m, 4), L2("maxTextureDimension2D", m, 8), L2("maxTextureDimension3D", m, 12), L2("maxTextureArrayLayers", m, 16), L2("maxBindGroups", m, 20), L2("maxBindGroupsPlusVertexBuffers", m, 24), L2("maxBindingsPerBindGroup", m, 28), L2("maxDynamicUniformBuffersPerPipelineLayout", m, 32), L2("maxDynamicStorageBuffersPerPipelineLayout", m, 36), L2("maxSampledTexturesPerShaderStage", m, 40), L2("maxSamplersPerShaderStage", m, 44), L2("maxStorageBuffersPerShaderStage", m, 48), L2("maxStorageTexturesPerShaderStage", m, 52), L2("maxUniformBuffersPerShaderStage", m, 56), L2("minUniformBufferOffsetAlignment", m, 80), L2("minStorageBufferOffsetAlignment", m, 84), q("maxUniformBufferBindingSize", m, 64), q("maxStorageBufferBindingSize", m, 72), L2("maxVertexBuffers", m, 88), q("maxBufferSize", m, 96), L2("maxVertexAttributes", m, 104), L2("maxVertexBufferArrayStride", m, 108), L2("maxInterStageShaderVariables", m, 112), L2("maxColorAttachments", m, 116), L2("maxColorAttachmentBytesPerSample", m, 120), L2("maxComputeWorkgroupStorageSize", m, 124), L2("maxComputeInvocationsPerWorkgroup", m, 128), L2("maxComputeWorkgroupSizeX", m, 132), L2("maxComputeWorkgroupSizeY", m, 136), L2("maxComputeWorkgroupSizeZ", m, 140), L2("maxComputeWorkgroupsPerDimension", m, 144), L2("maxImmediateSize", m, 148, true), y !== 0 && (d(), "maxStorageBuffersInVertexStage" in GPUSupportedLimits.prototype && (L2("maxStorageBuffersInVertexStage", y, 8), L2("maxStorageTexturesInVertexStage", y, 12), L2("maxStorageBuffersInFragmentStage", y, 16), L2("maxStorageTexturesInFragmentStage", y, 20))), e.requiredLimits = x;
      }
      (m = (d(), E2)[c + 24 >>> 2 >>> 0]) && (m = { label: Ie2(m + 4) }, e.defaultQueue = m), e.label = Ie2(c + 4);
    }
    z2 += 1, ht2(t6, h2.requestDevice(e).then((L2) => {
      --z2, me2(() => {
        fe2[u >>> 0] = L2.queue, fe2[o >>> 0] = L2, z2 += 1, ht2(n, L2.lost.then((q) => {
          me2(() => {
            L2.onuncapturederror = () => {
            };
            var he2 = P2(), de2 = Ce2(q.message);
            kr2(n, Pu2[q.reason], de2), D(he2);
          }), --z2;
        })), L2.onuncapturederror = (q) => {
          var he2 = 5;
          q.error instanceof GPUValidationError ? he2 = 2 : q.error instanceof GPUOutOfMemoryError ? he2 = 3 : q.error instanceof GPUInternalError && (he2 = 4);
          var de2 = P2();
          q = Ce2(q.error.message), Uo2(o, he2, q), D(de2);
        }, "adapterInfo" in L2 || (L2.adapterInfo = h2.info), $r2(t6, 1, o, 0);
      });
    }, (L2) => {
      --z2, me2(() => {
        var q = P2(), he2 = Ce2(L2.message);
        $r2(t6, 3, o, he2), n && kr2(n, 4, he2), D(q);
      });
    }));
  }
  function _u2(e) {
    var t6 = B(e >>>= 0), n = Re[e];
    if (n) {
      for (var o = 0; o < n.length; ++o) n[o]();
      delete Re[e];
    }
    t6.destroy();
  }
  function Ru2(e, t6, n) {
    n >>>= 0;
    var o = B(e >>>= 0);
    n == 4294967295 && (n = void 0);
    try {
      var u = o.getMappedRange(t6 >>> 0, n);
    } catch {
      return 0;
    }
    var c = jr2(16, u.byteLength);
    return (d(), X2).set(new Uint8Array(u), c >>> 0), Re[e].push(() => ve2(c)), c;
  }
  function Nu2(e, t6, n) {
    n >>>= 0;
    var o = B(e >>>= 0);
    n == 4294967295 && (n = void 0);
    try {
      var u = o.getMappedRange(t6 >>> 0, n);
    } catch {
      return 0;
    }
    var c = jr2(16, u.byteLength);
    return (d(), X2).fill(0, c, u.byteLength), Re[e].push(() => {
      new Uint8Array(u).set((d(), X2).subarray(c >>> 0, c + u.byteLength >>> 0)), ve2(c);
    }), c;
  }
  function Wu2(e, t6, n, o, u) {
    e >>>= 0, t6 = ue(t6), n = ue(n), u >>>= 0;
    var c = B(e);
    Re[e] = [], u == 4294967295 && (u = void 0), z2 += 1, ht2(t6, c.mapAsync(n, o >>> 0, u).then(() => {
      --z2, me2(() => {
        Fr2(t6, 1, 0);
      });
    }, (h2) => {
      --z2, me2(() => {
        P2();
        var m = Ce2(h2.message);
        Fr2(t6, h2.name === "AbortError" ? 4 : h2.name === "OperationError" ? 3 : 0, m), delete Re[e];
      });
    }));
  }
  function ku2(e) {
    var t6 = B(e >>>= 0), n = Re[e];
    if (n) {
      for (var o = 0; o < n.length; ++o) n[o]();
      delete Re[e], t6.unmap();
    }
  }
  function Fu2(e) {
    delete fe2[e >>> 0];
  }
  function Gu2(e, t6, n) {
    e >>>= 0, t6 >>>= 0, n >>>= 0;
    var o = !!(d(), E2)[t6 + 32 >>> 2 >>> 0];
    t6 = { label: Ie2(t6 + 4), usage: (d(), E2)[t6 + 16 >>> 2 >>> 0], size: mt2(t6 + 24), mappedAtCreation: o }, e = B(e);
    try {
      var u = e.createBuffer(t6);
    } catch {
      return false;
    }
    return fe2[n >>> 0] = u, o && (Re[n] = []), true;
  }
  function $u2(e, t6, n, o) {
    e >>>= 0, t6 = ue(t6), o >>>= 0, n = Eu2(n >>> 0), e = B(e), z2 += 1, ht2(t6, e.createComputePipelineAsync(n).then((u) => {
      --z2, me2(() => {
        fe2[o >>> 0] = u, Wr2(t6, 1, o, 0);
      });
    }, (u) => {
      --z2, me2(() => {
        var c = P2(), h2 = Ce2(u.message);
        Wr2(t6, u.reason === "validation" ? 3 : u.reason === "internal" ? 4 : 0, o, h2), D(c);
      });
    }));
  }
  function zu2(e, t6, n) {
    e >>>= 0, t6 >>>= 0, n >>>= 0;
    var o = (d(), E2)[t6 >>> 2 >>> 0], u = (d(), I)[o + 4 >>> 2 >>> 0];
    t6 = { label: Ie2(t6 + 4), code: "" }, u === 2 && (t6.code = so2(o + 8)), e = B(e).createShaderModule(t6), fe2[n >>> 0] = e;
  }
  var Vu2 = (e) => {
    (e = B(e)).onuncapturederror = null, e.destroy();
  };
  function ju2(e, t6) {
    t6 = ue(t6), e = B(e >>> 0), z2 += 1, ht2(t6, e.popErrorScope().then((n) => {
      --z2, me2(() => {
        var o = 5;
        n ? n instanceof GPUValidationError ? o = 2 : n instanceof GPUOutOfMemoryError ? o = 3 : n instanceof GPUInternalError && (o = 4) : o = 1;
        var u = P2(), c = n ? Ce2(n.message) : 0;
        Gr2(t6, 1, o, c), D(u);
      });
    }, (n) => {
      --z2, me2(() => {
        var o = P2(), u = Ce2(n.message);
        Gr2(t6, 1, 5, u), D(o);
      });
    }));
  }
  function Hu2(e, t6, n, o) {
    if (t6 = ue(t6), o >>>= 0, n >>>= 0) {
      var u = { featureLevel: Iu2[(d(), I)[n + 4 >>> 2 >>> 0]], powerPreference: Lu2[(d(), I)[n + 8 >>> 2 >>> 0]], forceFallbackAdapter: !!(d(), E2)[n + 12 >>> 2 >>> 0] };
      (e = (d(), E2)[n >>> 2 >>> 0]) !== 0 && (d(), u.Ye = !!(d(), E2)[e + 8 >>> 2 >>> 0]);
    }
    "gpu" in navigator ? (z2 += 1, ht2(t6, navigator.gpu.requestAdapter(u).then((c) => {
      --z2, me2(() => {
        if (c) fe2[o >>> 0] = c, St2(t6, 1, o, 0);
        else {
          var h2 = P2(), m = Ce2("WebGPU not available on this browser (requestAdapter returned null)");
          St2(t6, 3, o, m), D(h2);
        }
      });
    }, (c) => {
      --z2, me2(() => {
        var h2 = P2(), m = Ce2(c.message);
        St2(t6, 4, o, m), D(h2);
      });
    }))) : (u = P2(), e = Ce2("WebGPU not available on this browser (navigator.gpu is not available)"), St2(t6, 3, o, e), D(u));
  }
  function qu2(e, t6, n) {
    return e >>>= 0, t6 >>>= 0, n >>>= 0, Yn2(async () => {
      var o = [];
      if (n) {
        var u = (d(), I)[n >>> 2 >>> 0];
        o.length = t6 + 1, o[t6] = new Promise((m) => setTimeout(m, u, 0));
      } else o.length = t6;
      for (var c = 0; c < t6; ++c) {
        var h2 = mt2(e + 8 * c);
        if (!(h2 in Gt2)) return h2;
        o[c] = Gt2[h2];
      }
      return o = await Promise.race(o), delete Gt2[o], o;
    });
  }
  var _r2, Rr2 = {}, lo2 = () => {
    if (!_r2) {
      var e, t6 = { USER: "web_user", LOGNAME: "web_user", PATH: "/", PWD: "/", HOME: "/home/web_user", LANG: (globalThis.navigator?.language ?? "C").replace("-", "_") + ".UTF-8", _: "./this.program" };
      for (e in Rr2) Rr2[e] === void 0 ? delete t6[e] : t6[e] = Rr2[e];
      var n = [];
      for (e in t6) n.push(`${e}=${t6[e]}`);
      _r2 = n;
    }
    return _r2;
  };
  function po2(e, t6) {
    if (i) return H2(19, 1, e, t6);
    e >>>= 0, t6 >>>= 0;
    var n, o = 0, u = 0;
    for (n of lo2()) {
      var c = t6 + o;
      (d(), E2)[e + u >>> 2 >>> 0] = c, o += Ue2(n, c, 1 / 0) + 1, u += 4;
    }
    return 0;
  }
  function mo2(e, t6) {
    if (i) return H2(20, 1, e, t6);
    e >>>= 0, t6 >>>= 0;
    var n = lo2();
    for (var o of ((d(), E2)[e >>> 2 >>> 0] = n.length, e = 0, n)) e += _e(o) + 1;
    return (d(), E2)[t6 >>> 2 >>> 0] = e, 0;
  }
  function ho2(e) {
    return i ? H2(21, 1, e) : 52;
  }
  function bo2(e, t6, n, o, u) {
    return i ? H2(22, 1, e, t6, n, o, u) : 52;
  }
  function go2(e, t6, n, o) {
    return i ? H2(23, 1, e, t6, n, o) : 52;
  }
  function yo2(e, t6, n, o) {
    return i ? H2(24, 1, e, t6, n, o) : 70;
  }
  var Yu2 = [null, [], []];
  function wo2(e, t6, n, o) {
    if (i) return H2(25, 1, e, t6, n, o);
    t6 >>>= 0, n >>>= 0, o >>>= 0;
    for (var u = 0, c = 0; c < n; c++) {
      var h2 = (d(), E2)[t6 >>> 2 >>> 0], m = (d(), E2)[t6 + 4 >>> 2 >>> 0];
      t6 += 8;
      for (var y = 0; y < m; y++) {
        var x = e, N2 = (d(), X2)[h2 + y >>> 0], F3 = Yu2[x];
        N2 === 0 || N2 === 10 ? ((x === 1 ? Y2 : O)(Bn2(F3)), F3.length = 0) : F3.push(N2);
      }
      u += m;
    }
    return (d(), E2)[o >>> 2 >>> 0] = u, 0;
  }
  function Ju2(e) {
    return e >>> 0;
  }
  function Xu2(e, t6) {
    return io2(B(e >>> 0).limits, t6 >>> 0), 1;
  }
  function Zu2(e, t6) {
    return B(e >>> 0).features.has(uo2[t6]);
  }
  function Ku2(e) {
    return BigInt(B(e >>> 0).size);
  }
  function Qu2(e) {
    return BigInt(B(e >>> 0).usage);
  }
  function ef2(e, t6) {
    if (e >>>= 0, t6 >>>= 0) {
      var n = Ie2(t6 + 4);
      n = { label: n, timestampWrites: t6 = (t6 = (d(), E2)[t6 + 12 >>> 2 >>> 0]) !== 0 ? { querySet: B((d(), E2)[t6 + 4 >>> 2 >>> 0]), beginningOfPassWriteIndex: (d(), E2)[t6 + 8 >>> 2 >>> 0], endOfPassWriteIndex: (d(), E2)[t6 + 12 >>> 2 >>> 0] } : void 0 };
    }
    return t6 = B(e), e = Bo2(0), n = t6.beginComputePass(n), fe2[e >>> 0] = n, e;
  }
  function tf2(e, t6, n, o) {
    n = ue(n), (o = ue(o)) == -1 && (o = void 0), (e = B(e >>> 0)).clearBuffer(B(t6 >>> 0), n, o);
  }
  function rf2(e, t6, n, o, u, c) {
    n = ue(n), u = ue(u), c = ue(c), B(e >>> 0).copyBufferToBuffer(B(t6 >>> 0), n, B(o >>> 0), u, c);
  }
  function nf2(e) {
    var t6 = B(e >>> 0);
    return e = Io2(0), t6 = t6.finish(), fe2[e >>> 0] = t6, e;
  }
  function of2(e, t6, n, o, u, c) {
    c = ue(c), B(e >>> 0).resolveQuerySet(B(t6 >>> 0), n, o, B(u >>> 0), c);
  }
  function af2(e, t6, n, o) {
    B(e >>> 0).dispatchWorkgroups(t6, n, o);
  }
  function sf2(e, t6, n) {
    n = ue(n), B(e >>> 0).dispatchWorkgroupsIndirect(B(t6 >>> 0), n);
  }
  function uf2(e) {
    B(e >>> 0).end();
  }
  function ff2(e, t6, n, o, u) {
    o >>>= 0, u >>>= 0, e = B(e >>> 0), n = B(n >>> 0), o == 0 ? e.setBindGroup(t6, n) : e.setBindGroup(t6, n, (d(), E2), u >>> 2, o);
  }
  function cf2(e, t6) {
    B(e >>> 0).setPipeline(B(t6 >>> 0));
  }
  function df2(e, t6, n) {
    B(e >>> 0).Xe(B(t6 >>> 0), n);
  }
  function lf2(e, t6) {
    function n(u) {
      var c = (d(), E2)[u + 8 >>> 2 >>> 0], h2 = (d(), E2)[u + 32 >>> 2 >>> 0], m = (d(), E2)[u + 36 >>> 2 >>> 0], y = 0;
      return Ur2(u, { 14: (x) => {
        y = (d(), E2)[x + 8 >>> 2 >>> 0];
      } }), c ? ((h2 = mt2(u + 24)) == -1 && (h2 = void 0), c = { buffer: B(c), offset: mt2(u + 16), size: h2 }) : c = B(h2 || m || y), { binding: (d(), E2)[u + 4 >>> 2 >>> 0], resource: c };
    }
    e >>>= 0, t6 = { label: Ie2((t6 >>>= 0) + 4), layout: B((d(), E2)[t6 + 12 >>> 2 >>> 0]), entries: (function(u, c) {
      for (var h2 = [], m = 0; m < u; ++m) h2.push(n(c + 40 * m));
      return h2;
    })((d(), E2)[t6 + 16 >>> 2 >>> 0], (d(), E2)[t6 + 20 >>> 2 >>> 0]) }, e = B(e);
    var o = xo2(0);
    return ao2(o, e.createBindGroup(t6)), o;
  }
  function pf2(e, t6) {
    function n(y) {
      var x = (d(), E2)[y + 4 >>> 2 >>> 0];
      if (x) return { type: xu2[x], hasDynamicOffset: !!(d(), E2)[y + 8 >>> 2 >>> 0], minBindingSize: mt2(y + 16) };
    }
    function o(y) {
      if (y = (d(), E2)[y + 4 >>> 2 >>> 0]) return { type: Ou2[y] };
    }
    function u(y) {
      var x = (d(), E2)[y + 4 >>> 2 >>> 0];
      if (x) return { sampleType: Du2[x], viewDimension: co2[(d(), I)[y + 8 >>> 2 >>> 0]], multisampled: !!(d(), E2)[y + 12 >>> 2 >>> 0] };
    }
    function c(y) {
      var x = (d(), E2)[y + 4 >>> 2 >>> 0];
      if (x) return { access: Mu2[x], format: Cu2[(d(), I)[y + 8 >>> 2 >>> 0]], viewDimension: co2[(d(), I)[y + 12 >>> 2 >>> 0]] };
    }
    function h2(y) {
      var x = { binding: (d(), E2)[y + 4 >>> 2 >>> 0], visibility: (d(), E2)[y + 8 >>> 2 >>> 0], buffer: n(y + 24), sampler: o(y + 48), texture: u(y + 56), storageTexture: c(y + 72) };
      return Ur2(y, { 13: () => {
        x.externalTexture = {};
      } }), x;
    }
    e >>>= 0, t6 = { label: Ie2((t6 >>>= 0) + 4), entries: (function(y, x) {
      for (var N2 = [], F3 = 0; F3 < y; ++F3) N2.push(h2(x + 88 * F3));
      return N2;
    })((d(), E2)[t6 + 12 >>> 2 >>> 0], (d(), E2)[t6 + 16 >>> 2 >>> 0]) }, e = B(e);
    var m = Ao2(0);
    return ao2(m, e.createBindGroupLayout(t6)), m;
  }
  function mf2(e, t6) {
    var n;
    return e >>>= 0, (t6 >>>= 0) && (n = { label: Ie2(t6 + 4) }), t6 = B(e), e = Lo2(0), n = t6.createCommandEncoder(n), fe2[e >>> 0] = n, e;
  }
  function hf2(e, t6) {
    e >>>= 0, t6 >>>= 0;
    for (var n = (d(), E2)[t6 + 12 >>> 2 >>> 0], o = (d(), E2)[t6 + 16 >>> 2 >>> 0], u = [], c = 0; c < n; ++c) u.push(B((d(), E2)[o + 4 * c >>> 2 >>> 0]));
    return t6 = { label: Ie2(t6 + 4), bindGroupLayouts: u, immediateSize: (d(), E2)[t6 + 20 >>> 2 >>> 0] }, n = B(e), e = Oo2(0), t6 = n.createPipelineLayout(t6), fe2[e >>> 0] = t6, e;
  }
  function bf2(e, t6) {
    e >>>= 0, t6 >>>= 0, t6 = { type: Bu2[(d(), I)[t6 + 12 >>> 2 >>> 0]], count: (d(), E2)[t6 + 16 >>> 2 >>> 0] };
    var n = B(e);
    return e = Mo2(0), t6 = n.createQuerySet(t6), fe2[e >>> 0] = t6, e;
  }
  function gf2(e, t6) {
    return Su2(B(e >>> 0).adapterInfo, t6 >>> 0), 1;
  }
  var yf2 = { "core-features-and-limits": 1, "depth-clip-control": 2, "depth32float-stencil8": 3, "texture-compression-bc": 4, "texture-compression-bc-sliced-3d": 5, "texture-compression-etc2": 6, "texture-compression-astc": 7, "texture-compression-astc-sliced-3d": 8, "timestamp-query": 9, "indirect-first-instance": 10, "shader-f16": 11, "rg11b10ufloat-renderable": 12, "bgra8unorm-storage": 13, "float32-filterable": 14, "float32-blendable": 15, "clip-distances": 16, "dual-source-blending": 17, subgroups: 18, "texture-formats-tier1": 19, "texture-formats-tier2": 20, "primitive-index": 21, "texture-component-swizzle": 22, "subgroup-size-control": 23, "chromium-experimental-unorm16-texture-formats": 327692, "chromium-experimental-multi-draw-indirect": 327729, "chromium-experimental-subgroup-matrix": 327732 };
  function wf2(e, t6) {
    t6 >>>= 0;
    var n = B(e >>> 0);
    e = Ke(4 * n.features.size);
    var o = 0, u = 0;
    for (let c of n.features) 0 <= (n = yf2[c]) && ((d(), I)[e + o >>> 2 >>> 0] = n, o += 4, u++);
    (d(), E2)[t6 + 4 >>> 2 >>> 0] = e, (d(), E2)[t6 >>> 2 >>> 0] = u;
  }
  function Tf2(e, t6) {
    return io2(B(e >>> 0).limits, t6 >>> 0), 1;
  }
  function vf2(e, t6) {
    B(e >>> 0).pushErrorScope(Au2[t6]);
  }
  function Ef2(e, t6, n) {
    t6 >>>= 0, n >>>= 0, e = B(e >>> 0), t6 = Array.from((d(), I).subarray(n >>> 2 >>> 0, n + 4 * t6 >>> 2 >>> 0), (o) => B(o)), e.submit(t6);
  }
  function Sf2(e, t6, n, o, u) {
    n = ue(n), o >>>= 0, u >>>= 0, e = B(e >>> 0), t6 = B(t6 >>> 0), o = (d(), X2).subarray(o >>> 0, o + u >>> 0), e.writeBuffer(t6, n, o, 0, u);
  }
  i || (function() {
    for (var e = r.numThreads - 1; e--; ) vn2();
    xe2.push(async () => {
      var t6 = (async function() {
        if (!i) return Promise.all(ke2.map(Tn2));
      })();
      Be2++, await t6, --Be2 == 0 && re2 && (t6 = re2, re2 = null, t6());
    });
  })(), i || (Fe2 = new WebAssembly.Memory({ initial: 256, maximum: 65536, shared: true }), se2()), r.wasmBinary && (v = r.wasmBinary), r.stackSave = () => P2(), r.stackRestore = (e) => D(e), r.stackAlloc = (e) => Vt2(e), r.setValue = function(e, t6, n = "i8") {
    switch (n.endsWith("*") && (n = "*"), n) {
      case "i1":
      case "i8":
        (d(), Z)[e >>> 0] = t6;
        break;
      case "i16":
        (d(), De2)[e >>> 1 >>> 0] = t6;
        break;
      case "i32":
        (d(), I)[e >>> 2 >>> 0] = t6;
        break;
      case "i64":
        (d(), pe2)[e >>> 3 >>> 0] = BigInt(t6);
        break;
      case "float":
        (d(), R3)[e >>> 2 >>> 0] = t6;
        break;
      case "double":
        (d(), ae2)[e >>> 3 >>> 0] = t6;
        break;
      case "*":
        (d(), E2)[e >>> 2 >>> 0] = t6;
        break;
      default:
        we2(`invalid type for setValue: ${n}`);
    }
  }, r.getValue = function(e, t6 = "i8") {
    switch (t6.endsWith("*") && (t6 = "*"), t6) {
      case "i1":
      case "i8":
        return (d(), Z)[e >>> 0];
      case "i16":
        return (d(), De2)[e >>> 1 >>> 0];
      case "i32":
        return (d(), I)[e >>> 2 >>> 0];
      case "i64":
        return (d(), pe2)[e >>> 3 >>> 0];
      case "float":
        return (d(), R3)[e >>> 2 >>> 0];
      case "double":
        return (d(), ae2)[e >>> 3 >>> 0];
      case "*":
        return (d(), E2)[e >>> 2 >>> 0];
      default:
        we2(`invalid type for getValue: ${t6}`);
    }
  }, r.UTF8ToString = lt2, r.stringToUTF8 = Ue2, r.lengthBytesUTF8 = _e;
  var To2, vo2, Eo2, Nr2, zt2, ve2, Ke, So2, xo2, Ao2, Io2, Lo2, Bo2, Oo2, Mo2, Co2, Do2, Po2, Wr2, kr2, Fr2, Gr2, St2, $r2, Uo2, zr2, _o2, Ro2, No2, Vr2, Wo2, ko2, jr2, W, xt2, Fo2, D, Vt2, P2, Go2, Hr2, $o2, zo2, Vo2, qr2, jo2, Ho2, qo2, Yo2, Jo2, Xo2, Zo2, Ko2, Qo2, ea2, ta2, ra2, na2, oa2, aa2, sa2, ia2, ua2, fa2, ca2, da2, la2, pa2, ma2, ha2, ba2, ga2, ya2, wa2, Ta2, va2, Ea2, Sa2, xa2, Aa2, Ia2, La2, Ba2, Oa2, Ma2, Ca2, Ne2, xf2 = [Ye2, Tr2, xn2, On2, Mn2, Cn2, Dn2, Pn2, Un2, _n2, Rn2, Nn2, Wn2, kn2, Fn2, Gn2, Qn2, eo2, to2, po2, mo2, ho2, bo2, go2, yo2, wo2], Yr2 = { 1280444: (e, t6, n, o, u) => {
    if (r === void 0 || !r.ed) return 1;
    if ((e = lt2(Number(e >>> 0))).startsWith("./") && (e = e.substring(2)), !(e = r.ed.get(e))) return 2;
    if (t6 = Number(t6 >>> 0), n = Number(n >>> 0), o = Number(o >>> 0), t6 + n > e.byteLength) return 3;
    try {
      let c = e.subarray(t6, t6 + n);
      switch (u) {
        case 0:
          (d(), X2).set(c, o >>> 0);
          break;
        case 1:
          r.pe ? r.pe(o, c) : r.Re(o, c);
          break;
        default:
          return 4;
      }
      return 0;
    } catch {
      return 4;
    }
  }, 1281268: (e, t6, n) => {
    r.re(e, (d(), X2).subarray(t6 >>> 0, t6 + n >>> 0));
  }, 1281332: () => r.Pe(), 1281374: (e) => {
    r.qe(e);
  }, 1281411: () => typeof wasmOffsetConverter < "u" };
  function Af2() {
    return typeof wasmOffsetConverter < "u";
  }
  function If2(e, t6, n, o) {
    var u = P2();
    try {
      return Ko2(e, t6, n, o);
    } catch (c) {
      if (D(u), c !== c + 0) throw c;
      W(1, 0);
    }
  }
  function Lf2(e, t6, n) {
    var o = P2();
    try {
      return Jo2(e, t6, n);
    } catch (u) {
      if (D(o), u !== u + 0) throw u;
      W(1, 0);
    }
  }
  function Bf2(e) {
    var t6 = P2();
    try {
      jo2(e);
    } catch (n) {
      if (D(t6), n !== n + 0) throw n;
      W(1, 0);
    }
  }
  function Of2(e, t6) {
    var n = P2();
    try {
      return qr2(e, t6);
    } catch (o) {
      if (D(n), o !== o + 0) throw o;
      W(1, 0);
    }
  }
  function Mf2(e, t6, n) {
    var o = P2();
    try {
      Vo2(e, t6, n);
    } catch (u) {
      if (D(o), u !== u + 0) throw u;
      W(1, 0);
    }
  }
  function Cf2(e, t6) {
    var n = P2();
    try {
      Qo2(e, t6);
    } catch (o) {
      if (D(n), o !== o + 0) throw o;
      W(1, 0);
    }
  }
  function Df2(e, t6, n, o, u, c, h2) {
    var m = P2();
    try {
      return Yo2(e, t6, n, o, u, c, h2);
    } catch (y) {
      if (D(m), y !== y + 0) throw y;
      W(1, 0);
    }
  }
  function Pf2(e, t6, n, o, u, c) {
    var h2 = P2();
    try {
      Ho2(e, t6, n, o, u, c);
    } catch (m) {
      if (D(h2), m !== m + 0) throw m;
      W(1, 0);
    }
  }
  function Uf2(e, t6, n, o) {
    var u = P2();
    try {
      Zo2(e, t6, n, o);
    } catch (c) {
      if (D(u), c !== c + 0) throw c;
      W(1, 0);
    }
  }
  function _f2(e, t6, n, o, u, c, h2) {
    var m = P2();
    try {
      ta2(e, t6, n, o, u, c, h2);
    } catch (y) {
      if (D(m), y !== y + 0) throw y;
      W(1, 0);
    }
  }
  function Rf2(e, t6, n, o, u, c, h2) {
    var m = P2();
    try {
      ra2(e, t6, n, o, u, c, h2);
    } catch (y) {
      if (D(m), y !== y + 0) throw y;
      W(1, 0);
    }
  }
  function Nf2(e, t6, n, o, u, c, h2, m) {
    var y = P2();
    try {
      la2(e, t6, n, o, u, c, h2, m);
    } catch (x) {
      if (D(y), x !== x + 0) throw x;
      W(1, 0);
    }
  }
  function Wf2(e, t6, n, o, u, c, h2, m, y, x, N2, F3) {
    var L2 = P2();
    try {
      na2(e, t6, n, o, u, c, h2, m, y, x, N2, F3);
    } catch (q) {
      if (D(L2), q !== q + 0) throw q;
      W(1, 0);
    }
  }
  function kf2(e, t6, n, o, u) {
    var c = P2();
    try {
      return ea2(e, t6, n, o, u);
    } catch (h2) {
      if (D(c), h2 !== h2 + 0) throw h2;
      W(1, 0);
    }
  }
  function Ff2(e, t6, n, o, u, c) {
    var h2 = P2();
    try {
      pa2(e, t6, n, o, u, c);
    } catch (m) {
      if (D(h2), m !== m + 0) throw m;
      W(1, 0);
    }
  }
  function Gf2(e, t6, n, o, u) {
    var c = P2();
    try {
      qo2(e, t6, n, o, u);
    } catch (h2) {
      if (D(c), h2 !== h2 + 0) throw h2;
      W(1, 0);
    }
  }
  function $f2(e, t6, n, o, u, c, h2, m) {
    var y = P2();
    try {
      Xo2(e, t6, n, o, u, c, h2, m);
    } catch (x) {
      if (D(y), x !== x + 0) throw x;
      W(1, 0);
    }
  }
  function zf2(e) {
    var t6 = P2();
    try {
      return ma2(e);
    } catch (n) {
      if (D(t6), n !== n + 0) throw n;
      W(1, 0);
    }
  }
  function Vf2(e, t6, n, o, u, c, h2, m, y) {
    var x = P2();
    try {
      aa2(e, t6, n, o, u, c, h2, m, y);
    } catch (N2) {
      if (D(x), N2 !== N2 + 0) throw N2;
      W(1, 0);
    }
  }
  function jf2(e, t6, n) {
    var o = P2();
    try {
      return ha2(e, t6, n);
    } catch (u) {
      if (D(o), u !== u + 0) throw u;
      W(1, 0);
    }
  }
  function Hf2(e, t6) {
    var n = P2();
    try {
      return La2(e, t6);
    } catch (o) {
      if (D(n), o !== o + 0) throw o;
      return W(1, 0), 0n;
    }
  }
  function qf2(e, t6, n, o) {
    var u = P2();
    try {
      return ba2(e, t6, n, o);
    } catch (c) {
      if (D(u), c !== c + 0) throw c;
      W(1, 0);
    }
  }
  function Yf2(e) {
    var t6 = P2();
    try {
      return oa2(e);
    } catch (n) {
      if (D(t6), n !== n + 0) throw n;
      return W(1, 0), 0n;
    }
  }
  function Jf2(e, t6, n, o) {
    var u = P2();
    try {
      return ga2(e, t6, n, o);
    } catch (c) {
      if (D(u), c !== c + 0) throw c;
      W(1, 0);
    }
  }
  function Xf2(e, t6, n, o, u) {
    var c = P2();
    try {
      return ya2(e, t6, n, o, u);
    } catch (h2) {
      if (D(c), h2 !== h2 + 0) throw h2;
      W(1, 0);
    }
  }
  function Zf2(e, t6, n, o, u, c) {
    var h2 = P2();
    try {
      return wa2(e, t6, n, o, u, c);
    } catch (m) {
      if (D(h2), m !== m + 0) throw m;
      W(1, 0);
    }
  }
  function Kf2(e, t6, n, o, u, c) {
    var h2 = P2();
    try {
      return ca2(e, t6, n, o, u, c);
    } catch (m) {
      if (D(h2), m !== m + 0) throw m;
      W(1, 0);
    }
  }
  function Qf2(e, t6, n, o, u, c) {
    var h2 = P2();
    try {
      return Ta2(e, t6, n, o, u, c);
    } catch (m) {
      if (D(h2), m !== m + 0) throw m;
      W(1, 0);
    }
  }
  function ec2(e, t6, n, o, u, c, h2, m) {
    var y = P2();
    try {
      return da2(e, t6, n, o, u, c, h2, m);
    } catch (x) {
      if (D(y), x !== x + 0) throw x;
      W(1, 0);
    }
  }
  function tc2(e, t6, n, o, u) {
    var c = P2();
    try {
      return va2(e, t6, n, o, u);
    } catch (h2) {
      if (D(c), h2 !== h2 + 0) throw h2;
      return W(1, 0), 0n;
    }
  }
  function rc2(e, t6, n, o) {
    var u = P2();
    try {
      return Ea2(e, t6, n, o);
    } catch (c) {
      if (D(u), c !== c + 0) throw c;
      W(1, 0);
    }
  }
  function nc2(e, t6, n, o) {
    var u = P2();
    try {
      return Sa2(e, t6, n, o);
    } catch (c) {
      if (D(u), c !== c + 0) throw c;
      W(1, 0);
    }
  }
  function oc2(e, t6, n, o, u, c, h2, m, y, x, N2, F3) {
    var L2 = P2();
    try {
      return xa2(e, t6, n, o, u, c, h2, m, y, x, N2, F3);
    } catch (q) {
      if (D(L2), q !== q + 0) throw q;
      W(1, 0);
    }
  }
  function ac2(e, t6, n, o, u, c, h2, m, y, x, N2) {
    var F3 = P2();
    try {
      Aa2(e, t6, n, o, u, c, h2, m, y, x, N2);
    } catch (L2) {
      if (D(F3), L2 !== L2 + 0) throw L2;
      W(1, 0);
    }
  }
  function sc2(e, t6, n, o, u, c, h2, m, y, x, N2, F3, L2, q, he2, de2) {
    var Qe2 = P2();
    try {
      Ia2(e, t6, n, o, u, c, h2, m, y, x, N2, F3, L2, q, he2, de2);
    } catch (et2) {
      if (D(Qe2), et2 !== et2 + 0) throw et2;
      W(1, 0);
    }
  }
  function ic2(e, t6, n) {
    var o = P2();
    try {
      return ia2(e, t6, n);
    } catch (u) {
      if (D(o), u !== u + 0) throw u;
      return W(1, 0), 0n;
    }
  }
  function uc2(e, t6, n) {
    var o = P2();
    try {
      return sa2(e, t6, n);
    } catch (u) {
      if (D(o), u !== u + 0) throw u;
      W(1, 0);
    }
  }
  function fc2(e, t6, n) {
    var o = P2();
    try {
      return ua2(e, t6, n);
    } catch (u) {
      if (D(o), u !== u + 0) throw u;
      W(1, 0);
    }
  }
  function cc2(e, t6, n, o) {
    var u = P2();
    try {
      fa2(e, t6, n, o);
    } catch (c) {
      if (D(u), c !== c + 0) throw c;
      W(1, 0);
    }
  }
  function jt2() {
    if (0 < Be2) re2 = jt2;
    else if (i) C?.(r), wr2();
    else {
      for (var e = xe2; 0 < e.length; ) e.shift()(r);
      0 < Be2 ? re2 = jt2 : (r.calledRun = true, $ || (wr2(), C?.(r)));
    }
  }
  return i || (Ne2 = await wt2(), jt2()), r.PTR_SIZE = 4, r.webgpuInit = (e) => {
    let t6 = /* @__PURE__ */ new WeakMap(), n, o, u = 1;
    r.webgpuRegisterDevice = (m) => {
      if (o !== void 0) throw Error("another WebGPU EP inference session is being created.");
      if (m) {
        var y = t6.get(m);
        if (!y) {
          let x = ((N2, F3 = 0) => {
            var L2 = Po2(F3);
            return F3 = Do2(F3, L2), fe2[L2 >>> 0] = N2.queue, fe2[F3 >>> 0] = N2, F3;
          })(m, y = Eo2());
          y = [u++, y, x], t6.set(m, y);
        }
        return n = m, o = y[0], y;
      }
      n = void 0, o = 0;
    };
    let c = /* @__PURE__ */ new Map();
    r.webgpuOnCreateSession = (m) => {
      if (o !== void 0) {
        var y = o;
        if (o = void 0, m) {
          let x = Nr2(y);
          c.set(m, x), y === 0 && e(n ?? B(x));
        }
        n = void 0;
      }
    }, r.webgpuOnReleaseSession = (m) => {
      c.delete(m);
    };
    let h2 = /* @__PURE__ */ Symbol("gpuBufferMetadata");
    r.webgpuRegisterBuffer = (m, y, x) => {
      if (x) return m[h2] = [x, NaN], x;
      if (x = m[h2]) return x[1]++, x[0];
      if ((y = c.get(y)) === void 0) throw Error("Invalid session handle passed to webgpuRegisterBuffer");
      return y = ((N2, F3 = 0) => (N2.mapState === "unmapped" || we2(), F3 = Co2(F3), fe2[F3 >>> 0] = N2, F3))(m, y), m[h2] = [y, 1], y;
    }, r.webgpuUnregisterBuffer = (m) => {
      let y = m[h2];
      if (!y) throw Error("Buffer is not registered");
      y[1]--, y[1] === 0 && (So2(y[0]), delete m[h2]);
    }, r.webgpuGetBuffer = (m) => B(m), r.webgpuCreateDownloader = (m, y, x) => {
      if ((x = c.get(x)) === void 0) throw Error("Invalid session handle passed to webgpuRegisterBuffer");
      let N2 = B(x), F3 = 16 * Math.ceil(Number(y) / 16);
      return async () => {
        let L2 = N2.createBuffer({ size: F3, usage: 9 });
        try {
          let q = N2.createCommandEncoder();
          return q.copyBufferToBuffer(m, 0, L2, 0, F3), N2.queue.submit([q.finish()]), await L2.mapAsync(GPUMapMode.READ), L2.getMappedRange().slice(0, y);
        } finally {
          L2.destroy();
        }
      };
    }, r.pe = (m, y) => {
      var x = y.buffer;
      let N2 = y.byteOffset, F3 = y.byteLength;
      if (y = 16 * Math.ceil(Number(F3) / 16), m = B(m), !n) {
        var L2 = Nr2(o);
        n = B(L2);
      }
      let q = (L2 = n.createBuffer({ mappedAtCreation: true, size: y, usage: 6 })).getMappedRange();
      new Uint8Array(q).set(new Uint8Array(x, N2, F3)), L2.unmap(), (x = n.createCommandEncoder()).copyBufferToBuffer(L2, 0, m, 0, y), n.queue.submit([x.finish()]), L2.destroy();
    };
  }, r.webnnInit = (e) => {
    let t6 = e[0];
    [r.Pe, r.qe, r.webnnEnsureTensor, r.re, r.webnnDownloadTensor, r.Oe, r.webnnEnableTraceEvent] = e.slice(1), r.webnnReleaseTensorId = r.qe, r.webnnUploadTensor = r.re, r.webnnRegisterMLContext = r.Oe, r.webnnOnRunStart = (n) => t6.onRunStart(n), r.webnnOnRunEnd = t6.onRunEnd.bind(t6), r.webnnOnReleaseSession = (n) => {
      t6.onReleaseSession(n);
    }, r.webnnCreateMLTensorDownloader = (n, o) => t6.createMLTensorDownloader(n, o), r.webnnRegisterMLTensor = (n, o, u, c) => t6.registerMLTensor(n, o, u, c), r.webnnCreateMLContext = (n) => t6.createMLContext(n), r.webnnRegisterGraphInput = t6.registerGraphInput.bind(t6), r.webnnIsGraphInput = t6.isGraphInput.bind(t6), r.webnnRegisterGraphOutput = t6.registerGraphOutput.bind(t6), r.webnnIsGraphOutput = t6.isGraphOutput.bind(t6), r.webnnCreateTemporaryTensor = t6.createTemporaryTensor.bind(t6), r.webnnIsGraphInputOutputTypeSupported = t6.isGraphInputOutputTypeSupported.bind(t6);
  }, ne2 ? r : new Promise((e, t6) => {
    C = e, _ = t6;
  });
}
var yc;
var wc;
var ms = G(() => {
  "use strict";
  yc = ls, wc = globalThis.self?.name?.startsWith("em-pthread");
  wc && ls();
});
var gs;
var an;
var Tc;
var ye;
var ys;
var on;
var vc;
var Ec;
var ws;
var Sc;
var hs;
var Ts;
var bs;
var vs;
var Zt = G(() => {
  "use strict";
  Xt();
  gs = typeof location > "u" ? void 0 : location.origin, an = import.meta.url > "file:" && import.meta.url < "file;", Tc = () => {
    if (true) {
      if (an) {
        let a = URL;
        return new URL(new a("ort.webgpu.bundle.min.mjs", import.meta.url).href, gs).href;
      }
      return import.meta.url;
    }
  }, ye = Tc(), ys = () => {
    if (ye && !ye.startsWith("blob:")) return ye.substring(0, ye.lastIndexOf("/") + 1);
  }, on = (a, r) => {
    try {
      let s = r ?? ye;
      return (s ? new URL(a, s) : new URL(a)).origin === gs;
    } catch {
      return false;
    }
  }, vc = (a, r) => {
    let s = r ?? ye;
    try {
      return (s ? new URL(a, s) : new URL(a)).href;
    } catch {
      return;
    }
  }, Ec = (a, r) => `${r ?? "./"}${a}`, ws = async (a) => {
    let s = await (await fetch(a, { credentials: "same-origin" })).blob();
    return URL.createObjectURL(s);
  }, Sc = async (a) => (await import(
    /*webpackIgnore:true*/
    /*@vite-ignore*/
    a
  )).default, hs = (ds(), Ht(cs)).default, Ts = async () => {
    if (!ye) throw new Error("Failed to load proxy worker: cannot determine the script source URL.");
    if (on(ye)) return [void 0, hs()];
    let a = await ws(ye);
    return [a, hs(a)];
  }, bs = (ms(), Ht(ps)).default, vs = async (a, r, s, f) => {
    let i = bs && !(a || r);
    if (i) if (ye) i = on(ye) || f && !s;
    else if (f && !s) i = true;
    else throw new Error("cannot determine the script source URL.");
    if (i) return [void 0, bs];
    {
      let p = "ort-wasm-simd-threaded.asyncify.mjs", l = a ?? vc(p, r), b = s && l && !on(l, r), g = b ? await ws(l) : l ?? Ec(p, r);
      return [b ? g : void 0, await Sc(g)];
    }
  };
});
var sn;
var un;
var sr;
var Es;
var xc;
var Ac;
var Ic;
var Kt;
var j;
var je = G(() => {
  "use strict";
  Zt();
  un = false, sr = false, Es = false, xc = () => {
    if (typeof SharedArrayBuffer > "u") return false;
    try {
      return typeof MessageChannel < "u" && new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)), WebAssembly.validate(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 4, 1, 96, 0, 0, 3, 2, 1, 0, 5, 4, 1, 3, 1, 1, 10, 11, 1, 9, 0, 65, 0, 254, 16, 2, 0, 26, 11]));
    } catch {
      return false;
    }
  }, Ac = () => {
    try {
      return WebAssembly.validate(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 4, 1, 96, 0, 0, 3, 2, 1, 0, 10, 30, 1, 28, 0, 65, 0, 253, 15, 253, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 253, 186, 1, 26, 11]));
    } catch {
      return false;
    }
  }, Ic = () => {
    try {
      return WebAssembly.validate(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 5, 1, 96, 0, 1, 123, 3, 2, 1, 0, 10, 19, 1, 17, 0, 65, 1, 253, 15, 65, 2, 253, 15, 65, 3, 253, 15, 253, 147, 2, 11]));
    } catch {
      return false;
    }
  }, Kt = async (a) => {
    if (un) return Promise.resolve();
    if (sr) throw new Error("multiple calls to 'initializeWebAssembly()' detected.");
    if (Es) throw new Error("previous call to 'initializeWebAssembly()' failed.");
    sr = true;
    let r = a.initTimeout, s = a.numThreads;
    if (a.simd !== false) {
      if (a.simd === "relaxed") {
        if (!Ic()) throw new Error("Relaxed WebAssembly SIMD is not supported in the current environment.");
      } else if (!Ac()) throw new Error("WebAssembly SIMD is not supported in the current environment.");
    }
    let f = xc();
    s > 1 && !f && (typeof self < "u" && !self.crossOriginIsolated && console.warn("env.wasm.numThreads is set to " + s + ", but this will not work unless you enable crossOriginIsolated mode. See https://web.dev/cross-origin-isolation-guide/ for more info."), console.warn("WebAssembly multi-threading is not supported in the current environment. Falling back to single-threading."), a.numThreads = s = 1);
    let i = a.wasmPaths, p = typeof i == "string" ? i : void 0, l = i?.mjs, b = l?.href ?? l, g = i?.wasm, w = g?.href ?? g, S2 = a.wasmBinary, [v, T] = await vs(b, p, s > 1, !!S2 || !!w), A = false, C = [];
    if (r > 0 && C.push(new Promise((_) => {
      setTimeout(() => {
        A = true, _();
      }, r);
    })), C.push(new Promise((_, k) => {
      let U2 = { numThreads: s };
      if (S2) U2.wasmBinary = S2, U2.locateFile = (M) => M;
      else if (w || p) U2.locateFile = (M) => w ?? p + M;
      else if (b && b.indexOf("blob:") !== 0) U2.locateFile = (M) => new URL(M, b).href;
      else if (v) {
        let M = ys();
        M && (U2.locateFile = (Y2) => M + Y2);
      }
      T(U2).then((M) => {
        sr = false, un = true, sn = M, _(), v && URL.revokeObjectURL(v);
      }, (M) => {
        sr = false, Es = true, k(M);
      });
    })), await Promise.race(C), A) throw new Error(`WebAssembly backend initializing failed due to timeout: ${r}ms`);
  }, j = () => {
    if (un && sn) return sn;
    throw new Error("WebAssembly is not initialized yet.");
  };
});
var be;
var Bt;
var V;
var ir = G(() => {
  "use strict";
  je();
  be = (a, r) => {
    let s = j(), f = s.lengthBytesUTF8(a) + 1, i = s._malloc(f);
    return s.stringToUTF8(a, i, f), r.push(i), i;
  }, Bt = (a, r, s, f) => {
    if (typeof a == "object" && a !== null) {
      if (s.has(a)) throw new Error("Circular reference in options");
      s.add(a);
    }
    Object.entries(a).forEach(([i, p]) => {
      let l = r ? r + i : i;
      if (typeof p == "object") Bt(p, l + ".", s, f);
      else if (typeof p == "string" || typeof p == "number") f(l, p.toString());
      else if (typeof p == "boolean") f(l, p ? "1" : "0");
      else throw new Error(`Can't handle extra config type: ${typeof p}`);
    });
  }, V = (a) => {
    let r = j(), s = r.stackSave();
    try {
      let f = r.PTR_SIZE, i = r.stackAlloc(2 * f);
      r._OrtGetLastError(i, i + f);
      let p = Number(r.getValue(i, f === 4 ? "i32" : "i64")), l = r.getValue(i + f, "*"), b = l ? r.UTF8ToString(l) : "";
      throw new Error(`${a} ERROR_CODE: ${p}, ERROR_MESSAGE: ${b}`);
    } finally {
      r.stackRestore(s);
    }
  };
});
var Ss;
var xs = G(() => {
  "use strict";
  je();
  ir();
  Ss = (a) => {
    let r = j(), s = 0, f = [], i = a || {};
    try {
      if (a?.logSeverityLevel === void 0) i.logSeverityLevel = 2;
      else if (typeof a.logSeverityLevel != "number" || !Number.isInteger(a.logSeverityLevel) || a.logSeverityLevel < 0 || a.logSeverityLevel > 4) throw new Error(`log severity level is not valid: ${a.logSeverityLevel}`);
      if (a?.logVerbosityLevel === void 0) i.logVerbosityLevel = 0;
      else if (typeof a.logVerbosityLevel != "number" || !Number.isInteger(a.logVerbosityLevel)) throw new Error(`log verbosity level is not valid: ${a.logVerbosityLevel}`);
      a?.terminate === void 0 && (i.terminate = false);
      let p = 0;
      return a?.tag !== void 0 && (p = be(a.tag, f)), s = r._OrtCreateRunOptions(i.logSeverityLevel, i.logVerbosityLevel, !!i.terminate, p), s === 0 && V("Can't create run options."), a?.extra !== void 0 && Bt(a.extra, "", /* @__PURE__ */ new WeakSet(), (l, b) => {
        let g = be(l, f), w = be(b, f);
        r._OrtAddRunConfigEntry(s, g, w) !== 0 && V(`Can't set a run config entry: ${l} - ${b}.`);
      }), [s, f];
    } catch (p) {
      throw s !== 0 && r._OrtReleaseRunOptions(s), f.forEach((l) => r._free(l)), p;
    }
  };
});
var Lc;
var Bc;
var Oc;
var Ot;
var We;
var Mc;
var As;
var Is = G(() => {
  "use strict";
  je();
  ir();
  Lc = (a) => {
    switch (a) {
      case "disabled":
        return 0;
      case "basic":
        return 1;
      case "extended":
        return 2;
      case "layout":
        return 3;
      case "all":
        return 99;
      default:
        throw new Error(`unsupported graph optimization level: ${a}`);
    }
  }, Bc = (a) => {
    switch (a) {
      case "sequential":
        return 0;
      case "parallel":
        return 1;
      default:
        throw new Error(`unsupported execution mode: ${a}`);
    }
  }, Oc = (a) => {
    a.extra || (a.extra = {}), a.extra.session || (a.extra.session = {});
    let r = a.extra.session;
    r.use_ort_model_bytes_directly || (r.use_ort_model_bytes_directly = "1"), a.executionProviders && a.executionProviders.some((s) => (typeof s == "string" ? s : s.name) === "webgpu") && (a.enableMemPattern = false);
  }, Ot = (a, r, s, f) => {
    let i = be(r, f), p = be(s, f);
    j()._OrtAddSessionConfigEntry(a, i, p) !== 0 && V(`Can't set a session config entry: ${r} - ${s}.`);
  }, We = (a, r, s, f) => {
    let i = be(r, f), p = be(s, f);
    a.push([i, p]);
  }, Mc = async (a, r, s) => {
    let f = r.executionProviders;
    for (let i of f) {
      let p = typeof i == "string" ? i : i.name, l = [];
      switch (p) {
        case "webnn":
          if (p = "WEBNN", Ot(a, "session.disable_quant_qdq", "1", s), Ot(a, "session.disable_qdq_constant_folding", "1", s), typeof i != "string") {
            let T = i?.deviceType;
            T && Ot(a, "deviceType", T, s);
          }
          break;
        case "webgpu":
          {
            p = "WebGPU";
            let v;
            if (typeof i != "string") {
              let A = i;
              if (A.device) if (typeof GPUDevice < "u" && A.device instanceof GPUDevice) v = A.device;
              else throw new Error("Invalid GPU device set in WebGPU EP options.");
              let { enableGraphCapture: C } = r;
              if (typeof C == "boolean" && C && We(l, "enableGraphCapture", "1", s), typeof A.preferredLayout == "string" && We(l, "preferredLayout", A.preferredLayout, s), A.forceCpuNodeNames) {
                let _ = Array.isArray(A.forceCpuNodeNames) ? A.forceCpuNodeNames : [A.forceCpuNodeNames];
                We(l, "forceCpuNodeNames", _.join(`
`), s);
              }
              A.validationMode && We(l, "validationMode", A.validationMode, s), typeof A.enableMatmulFp32Accumulation == "boolean" && We(l, "enableMatmulFp32Accumulation", A.enableMatmulFp32Accumulation ? "1" : "0", s);
              for (let _ of ["storageBufferCacheMode", "uniformBufferCacheMode", "queryResolveBufferCacheMode", "defaultBufferCacheMode"]) {
                let k = A[_];
                if (k) {
                  if (k !== "disabled" && k !== "lazyRelease" && k !== "simple" && k !== "bucket") throw new Error(`${_} must be one of 'disabled', 'lazyRelease', 'simple' or 'bucket': ${k}`);
                  We(l, _, k, s);
                }
              }
            }
            let T = j().webgpuRegisterDevice(v);
            if (T) {
              let [A, C, _] = T;
              We(l, "deviceId", A.toString(), s), We(l, "webgpuInstance", C.toString(), s), We(l, "webgpuDevice", _.toString(), s);
            }
          }
          break;
        case "wasm":
        case "cpu":
          continue;
        default:
          throw new Error(`not supported execution provider: ${p}`);
      }
      let b = be(p, s), g = l.length, w = 0, S2 = 0;
      if (g > 0) {
        w = j()._malloc(g * j().PTR_SIZE), s.push(w), S2 = j()._malloc(g * j().PTR_SIZE), s.push(S2);
        for (let v = 0; v < g; v++) j().setValue(w + v * j().PTR_SIZE, l[v][0], "*"), j().setValue(S2 + v * j().PTR_SIZE, l[v][1], "*");
      }
      await j()._OrtAppendExecutionProvider(a, b, w, S2, g) !== 0 && V(`Can't append execution provider: ${p}.`);
    }
  }, As = async (a) => {
    let r = j(), s = 0, f = [], i = a || {};
    Oc(i);
    try {
      let p = Lc(i.graphOptimizationLevel ?? "all"), l = Bc(i.executionMode ?? "sequential"), b = typeof i.logId == "string" ? be(i.logId, f) : 0, g = i.logSeverityLevel ?? 2;
      if (!Number.isInteger(g) || g < 0 || g > 4) throw new Error(`log severity level is not valid: ${g}`);
      let w = i.logVerbosityLevel ?? 0;
      if (!Number.isInteger(w) || w < 0 || w > 4) throw new Error(`log verbosity level is not valid: ${w}`);
      let S2 = typeof i.optimizedModelFilePath == "string" ? be(i.optimizedModelFilePath, f) : 0;
      if (s = r._OrtCreateSessionOptions(p, !!i.enableCpuMemArena, !!i.enableMemPattern, l, !!i.enableProfiling, 0, b, g, w, S2), s === 0 && V("Can't create session options."), i.executionProviders && await Mc(s, i, f), i.enableGraphCapture !== void 0) {
        if (typeof i.enableGraphCapture != "boolean") throw new Error(`enableGraphCapture must be a boolean value: ${i.enableGraphCapture}`);
        Ot(s, "enableGraphCapture", i.enableGraphCapture.toString(), f);
      }
      if (i.freeDimensionOverrides) for (let [v, T] of Object.entries(i.freeDimensionOverrides)) {
        if (typeof v != "string") throw new Error(`free dimension override name must be a string: ${v}`);
        if (typeof T != "number" || !Number.isInteger(T) || T < 0) throw new Error(`free dimension override value must be a non-negative integer: ${T}`);
        let A = be(v, f);
        r._OrtAddFreeDimensionOverride(s, A, T) !== 0 && V(`Can't set a free dimension override: ${v} - ${T}.`);
      }
      return i.extra !== void 0 && Bt(i.extra, "", /* @__PURE__ */ new WeakSet(), (v, T) => {
        Ot(s, v, T, f);
      }), [s, f];
    } catch (p) {
      throw s !== 0 && r._OrtReleaseSessionOptions(s) !== 0 && V("Can't release session options."), f.forEach((l) => r._free(l)), p;
    }
  };
});
var He;
var ur;
var bt;
var it;
var Mt;
var fr;
var cr;
var fn;
var ut = G(() => {
  "use strict";
  He = (a) => {
    switch (a) {
      case "int8":
        return 3;
      case "uint8":
        return 2;
      case "bool":
        return 9;
      case "int16":
        return 5;
      case "uint16":
        return 4;
      case "int32":
        return 6;
      case "uint32":
        return 12;
      case "float16":
        return 10;
      case "float32":
        return 1;
      case "float64":
        return 11;
      case "string":
        return 8;
      case "int64":
        return 7;
      case "uint64":
        return 13;
      case "int4":
        return 22;
      case "uint4":
        return 21;
      default:
        throw new Error(`unsupported data type: ${a}`);
    }
  }, ur = (a) => {
    switch (a) {
      case 3:
        return "int8";
      case 2:
        return "uint8";
      case 9:
        return "bool";
      case 5:
        return "int16";
      case 4:
        return "uint16";
      case 6:
        return "int32";
      case 12:
        return "uint32";
      case 10:
        return "float16";
      case 1:
        return "float32";
      case 11:
        return "float64";
      case 8:
        return "string";
      case 7:
        return "int64";
      case 13:
        return "uint64";
      case 22:
        return "int4";
      case 21:
        return "uint4";
      default:
        throw new Error(`unsupported data type: ${a}`);
    }
  }, bt = (a, r) => {
    let s = [-1, 4, 1, 1, 2, 2, 4, 8, -1, 1, 2, 8, 4, 8, -1, -1, -1, -1, -1, -1, -1, 0.5, 0.5][a], f = typeof r == "number" ? r : r.reduce((i, p) => i * p, 1);
    return s > 0 ? Math.ceil(f * s) : void 0;
  }, it = (a) => {
    switch (a) {
      case "float16":
        return typeof Float16Array < "u" ? Float16Array : Uint16Array;
      case "float32":
        return Float32Array;
      case "uint8":
        return Uint8Array;
      case "int8":
        return Int8Array;
      case "uint16":
        return Uint16Array;
      case "int16":
        return Int16Array;
      case "int32":
        return Int32Array;
      case "bool":
        return Uint8Array;
      case "float64":
        return Float64Array;
      case "uint32":
        return Uint32Array;
      case "int64":
        return BigInt64Array;
      case "uint64":
        return BigUint64Array;
      default:
        throw new Error(`unsupported type: ${a}`);
    }
  }, Mt = (a) => {
    switch (a) {
      case "verbose":
        return 0;
      case "info":
        return 1;
      case "warning":
        return 2;
      case "error":
        return 3;
      case "fatal":
        return 4;
      default:
        throw new Error(`unsupported logging level: ${a}`);
    }
  }, fr = (a) => a === "float32" || a === "float16" || a === "int32" || a === "int64" || a === "uint32" || a === "uint8" || a === "bool" || a === "uint4" || a === "int4", cr = (a) => a === "float32" || a === "float16" || a === "int32" || a === "int64" || a === "uint32" || a === "uint64" || a === "int8" || a === "uint8" || a === "bool" || a === "uint4" || a === "int4", fn = (a) => {
    switch (a) {
      case "none":
        return 0;
      case "cpu":
        return 1;
      case "cpu-pinned":
        return 2;
      case "texture":
        return 3;
      case "gpu-buffer":
        return 4;
      case "ml-tensor":
        return 5;
      default:
        throw new Error(`unsupported data location: ${a}`);
    }
  };
});
var Ct;
var cn = G(() => {
  "use strict";
  Xt();
  Ct = async (a) => {
    if (typeof a == "string") if (false) try {
      let { readFile: r } = Xr("node:fs/promises");
      return new Uint8Array(await r(a));
    } catch (r) {
      if (r.code === "ERR_FS_FILE_TOO_LARGE") {
        let { createReadStream: s } = Xr("node:fs"), f = s(a), i = [];
        for await (let p of f) i.push(p);
        return new Uint8Array(Buffer.concat(i));
      }
      throw r;
    }
    else {
      let r = await fetch(a);
      if (!r.ok) throw new Error(`failed to load external data file: ${a}`);
      let s = r.headers.get("Content-Length"), f = s ? parseInt(s, 10) : 0;
      if (f < 1073741824) return new Uint8Array(await r.arrayBuffer());
      {
        if (!r.body) throw new Error(`failed to load external data file: ${a}, no response body.`);
        let i = r.body.getReader(), p;
        try {
          p = new ArrayBuffer(f);
        } catch (b) {
          if (b instanceof RangeError) {
            let g = Math.ceil(f / 65536);
            p = new WebAssembly.Memory({ initial: g, maximum: g }).buffer;
          } else throw b;
        }
        let l = 0;
        for (; ; ) {
          let { done: b, value: g } = await i.read();
          if (b) break;
          let w = g.byteLength;
          new Uint8Array(p, l, w).set(g), l += w;
        }
        return new Uint8Array(p, 0, f);
      }
    }
    else return a instanceof Blob ? new Uint8Array(await a.arrayBuffer()) : a instanceof Uint8Array ? a : new Uint8Array(a);
  };
});
var Ls;
var Bs = G(() => {
  "use strict";
  ut();
  Ls = (a, r) => new (it(r))(a);
});
var Cc;
var Dc;
var Os;
var Ms;
var Cs;
var Pc;
var le;
var dn = G(() => {
  "use strict";
  ut();
  Cc = ["V", "I", "W", "E", "F"], Dc = (a, r) => {
    console.log(`[${Cc[a]},${(/* @__PURE__ */ new Date()).toISOString()}]${r}`);
  }, Cs = (a, r) => {
    Os = a, Ms = r;
  }, Pc = (a, r) => {
    let s = Mt(a), f = Mt(Os);
    s >= f && Dc(s, typeof r == "function" ? r() : r);
  }, le = (...a) => {
    Ms && Pc(...a);
  };
});
var Ps;
var Uc;
var Us;
var _c;
var Ds;
var Rc;
var _s;
var dr;
var lr;
var ln;
var Rs;
var Ns = G(() => {
  "use strict";
  ut();
  dn();
  Ps = /* @__PURE__ */ new Map([["float32", 32], ["float16", 16], ["int32", 32], ["uint32", 32], ["int64", 64], ["uint64", 64], ["int8", 8], ["uint8", 8], ["int4", 4], ["uint4", 4]]), Uc = (a, r) => {
    if (r === "int32") return a;
    let s = Ps.get(r);
    if (!s) throw new Error(`WebNN backend does not support data type: ${r}`);
    let f = s / 8;
    if (a.byteLength % f !== 0) throw new Error(`Invalid Uint8Array length - must be a multiple of ${f}.`);
    let i = a.byteLength / f, p = new (it(r))(a.buffer, a.byteOffset, i);
    switch (r) {
      case "int64":
      case "uint64": {
        let l = new Int32Array(i);
        for (let b = 0; b < i; b++) {
          let g = p[b];
          if (g > 2147483647n || g < -2147483648n) throw new Error("Can not convert int64 data to int32 - value out of range.");
          l[b] = Number(g);
        }
        return new Uint8Array(l.buffer);
      }
      case "int8":
      case "uint8":
      case "uint32": {
        if (r === "uint32" && p.some((b) => b > 2147483647)) throw new Error("Can not convert uint32 data to int32 - value out of range.");
        let l = Int32Array.from(p, Number);
        return new Uint8Array(l.buffer);
      }
      default:
        throw new Error(`Unsupported data conversion from ${r} to 'int32'`);
    }
  }, Us = (a, r) => {
    if (r === "int32") return a;
    if (a.byteLength % 4 !== 0) throw new Error("Invalid Uint8Array length - must be a multiple of 4 (int32).");
    let s = a.byteLength / 4, f = new Int32Array(a.buffer, a.byteOffset, s);
    switch (r) {
      case "int64": {
        let i = BigInt64Array.from(f, BigInt);
        return new Uint8Array(i.buffer);
      }
      case "uint64": {
        if (f.some((p) => p < 0)) throw new Error("Can not convert int32 data to uin64 - negative value found.");
        let i = BigUint64Array.from(f, BigInt);
        return new Uint8Array(i.buffer);
      }
      case "int8": {
        if (f.some((p) => p < -128 || p > 127)) throw new Error("Can not convert int32 data to int8 - value out of range.");
        let i = Int8Array.from(f, Number);
        return new Uint8Array(i.buffer);
      }
      case "uint8": {
        if (f.some((i) => i < 0 || i > 255)) throw new Error("Can not convert int32 data to uint8 - value out of range.");
        return Uint8Array.from(f, Number);
      }
      case "uint32": {
        if (f.some((p) => p < 0)) throw new Error("Can not convert int32 data to uint32 - negative value found.");
        let i = Uint32Array.from(f, Number);
        return new Uint8Array(i.buffer);
      }
      default:
        throw new Error(`Unsupported data conversion from 'int32' to ${r}`);
    }
  }, _c = 1, Ds = () => _c++, Rc = /* @__PURE__ */ new Map([["int8", "int32"], ["uint8", "int32"], ["uint32", "int32"], ["int64", "int32"]]), _s = (a, r) => {
    let s = Ps.get(a);
    if (!s) throw new Error(`WebNN backend does not support data type: ${a}`);
    return r.length > 0 ? Math.ceil(r.reduce((f, i) => f * i) * s / 8) : 0;
  }, dr = class {
    constructor(r) {
      this.isDataConverted = false;
      let { sessionId: s, context: f, tensor: i, dataType: p, shape: l, fallbackDataType: b } = r;
      this.sessionId = s, this.mlContext = f, this.mlTensor = i, this.dataType = p, this.tensorShape = l, this.fallbackDataType = b;
    }
    get tensor() {
      return this.mlTensor;
    }
    get type() {
      return this.dataType;
    }
    get fallbackType() {
      return this.fallbackDataType;
    }
    get shape() {
      return this.tensorShape;
    }
    get byteLength() {
      return _s(this.dataType, this.tensorShape);
    }
    destroy() {
      le("verbose", () => "[WebNN] TensorWrapper.destroy"), this.mlTensor.destroy();
    }
    write(r) {
      this.mlContext.writeTensor(this.mlTensor, r);
    }
    async read(r) {
      if (this.fallbackDataType) {
        let s = await this.mlContext.readTensor(this.mlTensor), f = Us(new Uint8Array(s), this.dataType);
        if (r) {
          (r instanceof ArrayBuffer ? new Uint8Array(r) : new Uint8Array(r.buffer, r.byteOffset, r.byteLength)).set(f);
          return;
        } else return new Uint8Array(f).buffer;
      } else return r ? this.mlContext.readTensor(this.mlTensor, r) : this.mlContext.readTensor(this.mlTensor);
    }
    canReuseTensor(r, s, f) {
      return this.mlContext === r && this.dataType === s && this.tensorShape.length === f.length && this.tensorShape.every((i, p) => i === f[p]);
    }
    setIsDataConverted(r) {
      this.isDataConverted = r;
    }
  }, lr = class {
    constructor(r, s) {
      this.tensorManager = r;
      this.wrapper = s;
    }
    get tensorWrapper() {
      return this.wrapper;
    }
    releaseTensor() {
      this.tensorWrapper && (this.tensorManager.releaseTensor(this.tensorWrapper), this.wrapper = void 0);
    }
    async ensureTensor(r, s, f, i) {
      let p = this.tensorManager.getMLContext(r), l = this.tensorManager.getMLOpSupportLimits(r), b;
      if (!l?.input.dataTypes.includes(s)) {
        if (b = Rc.get(s), !b || !l?.input.dataTypes.includes(b)) throw new Error(`WebNN backend does not support data type: ${s}`);
        le("verbose", () => `[WebNN] TensorIdTracker.ensureTensor: fallback dataType from ${s} to ${b}`);
      }
      if (this.wrapper) {
        if (this.wrapper.canReuseTensor(p, s, f)) return this.wrapper.tensor;
        if (i) {
          if (this.wrapper.byteLength !== _s(s, f)) throw new Error("Unable to copy data to tensor with different size.");
          this.activeUpload = new Uint8Array(await this.wrapper.read());
        }
        this.tensorManager.releaseTensor(this.wrapper);
      }
      let g = typeof MLTensorUsage > "u" ? void 0 : MLTensorUsage.READ | MLTensorUsage.WRITE;
      return this.wrapper = await this.tensorManager.getCachedTensor(r, s, f, g, true, true, b), i && this.activeUpload && (this.wrapper.write(this.activeUpload), this.activeUpload = void 0), this.wrapper.tensor;
    }
    upload(r) {
      let s = r;
      if (this.wrapper) {
        if (this.wrapper.fallbackType) if (this.wrapper.fallbackType === "int32") s = Uc(r, this.wrapper.type), this.wrapper.setIsDataConverted(true);
        else throw new Error(`Unsupported fallback data type: ${this.wrapper.fallbackType}`);
        if (r.byteLength === this.wrapper.byteLength) {
          this.wrapper.write(s);
          return;
        } else le("verbose", () => "Data size does not match tensor size. Releasing tensor."), this.releaseTensor();
      }
      this.activeUpload ? this.activeUpload.set(s) : this.activeUpload = new Uint8Array(s);
    }
    async download(r) {
      if (this.activeUpload) {
        let s = this.wrapper?.isDataConverted ? Us(this.activeUpload, this.wrapper?.type) : this.activeUpload;
        if (r) {
          r instanceof ArrayBuffer ? new Uint8Array(r).set(s) : new Uint8Array(r.buffer, r.byteOffset, r.byteLength).set(s);
          return;
        } else return s.buffer;
      }
      if (!this.wrapper) throw new Error("Tensor has not been created.");
      return r ? this.wrapper.read(r) : this.wrapper.read();
    }
  }, ln = class {
    constructor(r) {
      this.backend = r;
      this.tensorTrackersById = /* @__PURE__ */ new Map();
      this.freeTensors = [];
      this.externalTensors = /* @__PURE__ */ new Set();
    }
    getMLContext(r) {
      let s = this.backend.getMLContext(r);
      if (!s) throw new Error("MLContext not found for session.");
      return s;
    }
    getMLOpSupportLimits(r) {
      return this.backend.getMLOpSupportLimits(r);
    }
    reserveTensorId() {
      let r = Ds();
      return this.tensorTrackersById.set(r, new lr(this)), r;
    }
    releaseTensorId(r) {
      let s = this.tensorTrackersById.get(r);
      s && (this.tensorTrackersById.delete(r), s.tensorWrapper && this.releaseTensor(s.tensorWrapper));
    }
    async ensureTensor(r, s, f, i, p) {
      le("verbose", () => `[WebNN] TensorManager.ensureTensor {tensorId: ${s}, dataType: ${f}, shape: ${i}, copyOld: ${p}}`);
      let l = this.tensorTrackersById.get(s);
      if (!l) throw new Error("Tensor not found.");
      return l.ensureTensor(r, f, i, p);
    }
    upload(r, s) {
      let f = this.tensorTrackersById.get(r);
      if (!f) throw new Error("Tensor not found.");
      f.upload(s);
    }
    async download(r, s) {
      le("verbose", () => `[WebNN] TensorManager.download {tensorId: ${r}, dstBuffer: ${s?.byteLength}}`);
      let f = this.tensorTrackersById.get(r);
      if (!f) throw new Error("Tensor not found.");
      return f.download(s);
    }
    releaseTensorsForSession(r) {
      for (let s of this.freeTensors) s.sessionId === r && s.destroy();
      this.freeTensors = this.freeTensors.filter((s) => s.sessionId !== r);
    }
    registerTensor(r, s, f, i) {
      let p = this.getMLContext(r), l = Ds(), b = new dr({ sessionId: r, context: p, tensor: s, dataType: f, shape: i });
      return this.tensorTrackersById.set(l, new lr(this, b)), this.externalTensors.add(b), l;
    }
    async getCachedTensor(r, s, f, i, p, l, b) {
      let g = this.getMLContext(r);
      for (let [S2, v] of this.freeTensors.entries()) if (v.canReuseTensor(g, s, f)) {
        le("verbose", () => `[WebNN] Reusing tensor {dataType: ${s}, ${b ? `fallbackDataType: ${b},` : ""} shape: ${f}`);
        let T = this.freeTensors.splice(S2, 1)[0];
        return T.sessionId = r, T;
      }
      le("verbose", () => `[WebNN] MLContext.createTensor {dataType: ${s}, ${b ? `fallbackDataType: ${b},` : ""} shape: ${f}}`);
      let w = await g.createTensor({ dataType: b ?? s, shape: f, dimensions: f, usage: i, writable: p, readable: l });
      return new dr({ sessionId: r, context: g, tensor: w, dataType: s, shape: f, fallbackDataType: b });
    }
    releaseTensor(r) {
      this.externalTensors.has(r) && this.externalTensors.delete(r), this.freeTensors.push(r);
    }
  }, Rs = (...a) => new ln(...a);
});
var Ws = {};
At(Ws, { WebNNBackend: () => pn });
var pr;
var Nc;
var pn;
var ks = G(() => {
  "use strict";
  ut();
  je();
  Bs();
  Ns();
  dn();
  pr = /* @__PURE__ */ new Map([[1, "float32"], [10, "float16"], [6, "int32"], [12, "uint32"], [7, "int64"], [13, "uint64"], [22, "int4"], [21, "uint4"], [3, "int8"], [2, "uint8"], [9, "uint8"]]), Nc = (a, r) => {
    if (a === r) return true;
    if (a === void 0 || r === void 0) return false;
    let s = Object.keys(a).sort(), f = Object.keys(r).sort();
    return s.length === f.length && s.every((i, p) => i === f[p] && a[i] === r[i]);
  }, pn = class {
    constructor(r) {
      this.tensorManager = Rs(this);
      this.mlContextBySessionId = /* @__PURE__ */ new Map();
      this.sessionIdsByMLContext = /* @__PURE__ */ new Map();
      this.mlContextCache = [];
      this.sessionGraphInputs = /* @__PURE__ */ new Map();
      this.sessionGraphOutputs = /* @__PURE__ */ new Map();
      this.temporaryGraphInputs = [];
      this.temporaryGraphOutputs = [];
      this.temporarySessionTensorIds = /* @__PURE__ */ new Map();
      this.mlOpSupportLimitsBySessionId = /* @__PURE__ */ new Map();
      Cs(r.logLevel, !!r.debug);
    }
    get currentSessionId() {
      if (this.activeSessionId === void 0) throw new Error("No active session");
      return this.activeSessionId;
    }
    onRunStart(r) {
      le("verbose", () => `[WebNN] onRunStart {sessionId: ${r}}`), this.activeSessionId = r;
    }
    onRunEnd(r) {
      le("verbose", () => `[WebNN] onRunEnd {sessionId: ${r}}`);
      let s = this.temporarySessionTensorIds.get(r);
      if (s) {
        for (let f of s) le("verbose", () => `[WebNN] releasing temporary tensor {tensorId: ${f}}`), this.tensorManager.releaseTensorId(f);
        this.temporarySessionTensorIds.delete(r), this.activeSessionId = void 0;
      }
    }
    async createMLContext(r) {
      if (r instanceof GPUDevice) {
        let f = this.mlContextCache.findIndex((i) => i.gpuDevice === r);
        if (f !== -1) return this.mlContextCache[f].mlContext;
        {
          let i = await navigator.ml.createContext(r);
          return this.mlContextCache.push({ gpuDevice: r, mlContext: i }), i;
        }
      } else if (r === void 0) {
        let f = this.mlContextCache.findIndex((i) => i.options === void 0 && i.gpuDevice === void 0);
        if (f !== -1) return this.mlContextCache[f].mlContext;
        {
          let i = await navigator.ml.createContext();
          return this.mlContextCache.push({ mlContext: i }), i;
        }
      }
      let s = this.mlContextCache.findIndex((f) => Nc(f.options, r));
      if (s !== -1) return this.mlContextCache[s].mlContext;
      {
        let f = await navigator.ml.createContext(r);
        return this.mlContextCache.push({ options: r, mlContext: f }), f;
      }
    }
    registerMLContext(r, s) {
      this.mlContextBySessionId.set(r, s);
      let f = this.sessionIdsByMLContext.get(s);
      f || (f = /* @__PURE__ */ new Set(), this.sessionIdsByMLContext.set(s, f)), f.add(r), this.mlOpSupportLimitsBySessionId.has(r) || this.mlOpSupportLimitsBySessionId.set(r, s.opSupportLimits()), this.temporaryGraphInputs.length > 0 && (this.sessionGraphInputs.set(r, this.temporaryGraphInputs), this.temporaryGraphInputs = []), this.temporaryGraphOutputs.length > 0 && (this.sessionGraphOutputs.set(r, this.temporaryGraphOutputs), this.temporaryGraphOutputs = []);
    }
    onReleaseSession(r) {
      this.sessionGraphInputs.delete(r), this.sessionGraphOutputs.delete(r);
      let s = this.mlContextBySessionId.get(r);
      if (!s) return;
      this.tensorManager.releaseTensorsForSession(r), this.mlContextBySessionId.delete(r), this.mlOpSupportLimitsBySessionId.delete(r);
      let f = this.sessionIdsByMLContext.get(s);
      if (f.delete(r), f.size === 0) {
        this.sessionIdsByMLContext.delete(s);
        let i = this.mlContextCache.findIndex((p) => p.mlContext === s);
        i !== -1 && this.mlContextCache.splice(i, 1);
      }
    }
    getMLContext(r) {
      return this.mlContextBySessionId.get(r);
    }
    getMLOpSupportLimits(r) {
      return this.mlOpSupportLimitsBySessionId.get(r);
    }
    reserveTensorId() {
      return this.tensorManager.reserveTensorId();
    }
    releaseTensorId(r) {
      le("verbose", () => `[WebNN] releaseTensorId {tensorId: ${r}}`), this.tensorManager.releaseTensorId(r);
    }
    async ensureTensor(r, s, f, i, p) {
      let l = pr.get(f);
      if (!l) throw new Error(`Unsupported ONNX data type: ${f}`);
      return this.tensorManager.ensureTensor(r ?? this.currentSessionId, s, l, i, p);
    }
    async createTemporaryTensor(r, s, f) {
      le("verbose", () => `[WebNN] createTemporaryTensor {onnxDataType: ${s}, shape: ${f}}`);
      let i = pr.get(s);
      if (!i) throw new Error(`Unsupported ONNX data type: ${s}`);
      let p = this.tensorManager.reserveTensorId();
      await this.tensorManager.ensureTensor(r, p, i, f, false);
      let l = this.temporarySessionTensorIds.get(r);
      return l ? l.push(p) : this.temporarySessionTensorIds.set(r, [p]), p;
    }
    uploadTensor(r, s) {
      if (!j().shouldTransferToMLTensor) throw new Error("Trying to upload to a MLTensor while shouldTransferToMLTensor is false");
      le("verbose", () => `[WebNN] uploadTensor {tensorId: ${r}, data: ${s.byteLength}}`), this.tensorManager.upload(r, s);
    }
    async downloadTensor(r, s) {
      return this.tensorManager.download(r, s);
    }
    createMLTensorDownloader(r, s) {
      return async () => {
        let f = await this.tensorManager.download(r);
        return Ls(f, s);
      };
    }
    registerMLTensor(r, s, f, i) {
      let p = pr.get(f);
      if (!p) throw new Error(`Unsupported ONNX data type: ${f}`);
      let l = this.tensorManager.registerTensor(r, s, p, i);
      return le("verbose", () => `[WebNN] registerMLTensor {tensor: ${s}, dataType: ${p}, dimensions: ${i}} -> {tensorId: ${l}}`), l;
    }
    registerGraphInput(r) {
      this.temporaryGraphInputs.push(r);
    }
    registerGraphOutput(r) {
      this.temporaryGraphOutputs.push(r);
    }
    isGraphInput(r, s) {
      let f = this.sessionGraphInputs.get(r);
      return f ? f.includes(s) : false;
    }
    isGraphOutput(r, s) {
      let f = this.sessionGraphOutputs.get(r);
      return f ? f.includes(s) : false;
    }
    isGraphInputOutputTypeSupported(r, s, f = true) {
      let i = pr.get(He(s)), p = this.mlOpSupportLimitsBySessionId.get(r);
      return typeof i > "u" ? false : f ? !!p?.input.dataTypes.includes(i) : !!p?.output.dataTypes.includes(i);
    }
    flush() {
    }
  };
});
var Wc;
var Qt;
var er;
var ft;
var kc;
var Fs;
var Lt;
var tr;
var rr;
var Gs;
var nr;
var or;
var ar;
var nn = G(() => {
  "use strict";
  Ve();
  xs();
  Is();
  ut();
  je();
  ir();
  cn();
  Wc = (a, r) => {
    j()._OrtInit(a, r) !== 0 && V("Can't initialize onnxruntime.");
  }, Qt = async (a) => {
    Wc(a.wasm.numThreads, Mt(a.logLevel));
  }, er = async (a, r) => {
    j().asyncInit?.();
    let s = a.webgpu.adapter;
    if (r === "webgpu") {
      if (typeof navigator > "u" || !navigator.gpu) throw new Error("WebGPU is not supported in current environment");
      if (s) {
        if (typeof s.limits != "object" || typeof s.features != "object" || typeof s.requestDevice != "function") throw new Error("Invalid GPU adapter set in `env.webgpu.adapter`. It must be a GPUAdapter object.");
      } else {
        let f = a.webgpu.powerPreference;
        if (f !== void 0 && f !== "low-power" && f !== "high-performance") throw new Error(`Invalid powerPreference setting: "${f}"`);
        let i = a.webgpu.forceFallbackAdapter;
        if (i !== void 0 && typeof i != "boolean") throw new Error(`Invalid forceFallbackAdapter setting: "${i}"`);
        if (s = await navigator.gpu.requestAdapter({ powerPreference: f, forceFallbackAdapter: i }), !s) throw new Error('Failed to get GPU adapter. You may need to enable flag "--enable-unsafe-webgpu" if you are using Chrome.');
      }
    }
    if (r === "webnn" && (typeof navigator > "u" || !navigator.ml)) throw new Error("WebNN is not supported in current environment");
    if (r === "webgpu" && j().webgpuInit((f) => {
      a.webgpu.device = f;
    }), r === "webnn") {
      let f = new (ks(), Ht(Ws)).WebNNBackend(a);
      j().webnnInit([f, () => f.reserveTensorId(), (i) => f.releaseTensorId(i), async (i, p, l, b, g) => f.ensureTensor(i, p, l, b, g), (i, p) => {
        f.uploadTensor(i, p);
      }, async (i, p) => f.downloadTensor(i, p), (i, p) => f.registerMLContext(i, p), !!a.trace]);
    }
  }, ft = /* @__PURE__ */ new Map(), kc = (a) => {
    let r = j(), s = r.stackSave();
    try {
      let f = r.PTR_SIZE, i = r.stackAlloc(2 * f);
      r._OrtGetInputOutputCount(a, i, i + f) !== 0 && V("Can't get session input/output count.");
      let l = f === 4 ? "i32" : "i64";
      return [Number(r.getValue(i, l)), Number(r.getValue(i + f, l))];
    } finally {
      r.stackRestore(s);
    }
  }, Fs = (a, r) => {
    let s = j(), f = s.stackSave(), i = 0;
    try {
      let p = s.PTR_SIZE, l = s.stackAlloc(2 * p);
      s._OrtGetInputOutputMetadata(a, r, l, l + p) !== 0 && V("Can't get session input/output metadata.");
      let g = Number(s.getValue(l, "*"));
      i = Number(s.getValue(l + p, "*"));
      let w = s.HEAP32[i / 4];
      if (w === 0) return [g, 0];
      let S2 = s.HEAPU32[i / 4 + 1], v = [];
      for (let T = 0; T < S2; T++) {
        let A = Number(s.getValue(i + 8 + T * p, "*"));
        v.push(A !== 0 ? s.UTF8ToString(A) : Number(s.getValue(i + 8 + (T + S2) * p, "*")));
      }
      return [g, w, v];
    } finally {
      s.stackRestore(f), i !== 0 && s._OrtFree(i);
    }
  }, Lt = (a) => {
    let r = j(), s = r._malloc(a.byteLength);
    if (s === 0) throw new Error(`Can't create a session. failed to allocate a buffer of size ${a.byteLength}.`);
    return r.HEAPU8.set(a, s), [s, a.byteLength];
  }, tr = async (a, r) => {
    let s, f, i = j();
    Array.isArray(a) ? [s, f] = a : a.buffer === i.HEAPU8.buffer ? [s, f] = [a.byteOffset, a.byteLength] : [s, f] = Lt(a);
    let p = 0, l = 0, b = 0, g = [], w = [], S2 = [];
    try {
      if ([l, g] = await As(r), r?.externalData && i.mountExternalData) {
        let O = [];
        for (let $ of r.externalData) {
          let oe = typeof $ == "string" ? $ : $.path, d = typeof $ == "string" ? $ : $.data;
          O.push(Ct(d).then((te2) => {
            i.mountExternalData(oe, te2);
          }));
        }
        await Promise.all(O);
      }
      for (let O of r?.executionProviders ?? []) if ((typeof O == "string" ? O : O.name) === "webnn") {
        if (i.shouldTransferToMLTensor = false, typeof O != "string") {
          let oe = O, d = oe?.context, te2 = oe?.gpuDevice, Z = oe?.deviceType, X2 = oe?.powerPreference;
          d ? i.currentContext = d : te2 ? i.currentContext = await i.webnnCreateMLContext(te2) : i.currentContext = await i.webnnCreateMLContext({ deviceType: Z, powerPreference: X2 });
        } else i.currentContext = await i.webnnCreateMLContext();
        break;
      }
      p = await i._OrtCreateSession(s, f, l), i.webgpuOnCreateSession?.(p), p === 0 && V("Can't create a session."), i.jsepOnCreateSession?.(), i.currentContext && (i.webnnRegisterMLContext(p, i.currentContext), i.currentContext = void 0, i.shouldTransferToMLTensor = true);
      let [v, T] = kc(p), A = !!r?.enableGraphCapture, C = [], _ = [], k = [], U2 = [], M = [];
      for (let O = 0; O < v; O++) {
        let [$, oe, d] = Fs(p, O);
        $ === 0 && V("Can't get an input name."), w.push($);
        let te2 = i.UTF8ToString($);
        C.push(te2), k.push(oe === 0 ? { name: te2, isTensor: false } : { name: te2, isTensor: true, type: ur(oe), shape: d });
      }
      for (let O = 0; O < T; O++) {
        let [$, oe, d] = Fs(p, O + v);
        $ === 0 && V("Can't get an output name."), S2.push($);
        let te2 = i.UTF8ToString($);
        _.push(te2), U2.push(oe === 0 ? { name: te2, isTensor: false } : { name: te2, isTensor: true, type: ur(oe), shape: d });
        {
          if (A && r?.preferredOutputLocation === void 0) {
            M.push("gpu-buffer");
            continue;
          }
          let Z = typeof r?.preferredOutputLocation == "string" ? r.preferredOutputLocation : r?.preferredOutputLocation?.[te2] ?? "cpu", X2 = i.webnnIsGraphOutput;
          if (Z === "cpu" && X2 && X2(p, te2)) {
            M.push("ml-tensor-cpu-output");
            continue;
          }
          if (Z !== "cpu" && Z !== "cpu-pinned" && Z !== "gpu-buffer" && Z !== "ml-tensor") throw new Error(`Not supported preferred output location: ${Z}.`);
          if (A && Z !== "gpu-buffer") throw new Error(`Not supported preferred output location: ${Z}. Only 'gpu-buffer' location is supported when enableGraphCapture is true.`);
          M.push(Z);
        }
      }
      let Y2 = null;
      return M.some((O) => O === "gpu-buffer" || O === "ml-tensor" || O === "ml-tensor-cpu-output") && (b = i._OrtCreateBinding(p), b === 0 && V("Can't create IO binding."), Y2 = { handle: b, outputPreferredLocations: M, outputPreferredLocationsEncoded: M.map((O) => O === "ml-tensor-cpu-output" ? "ml-tensor" : O).map((O) => fn(O)) }), ft.set(p, [p, w, S2, Y2, A, false]), [p, C, _, k, U2];
    } catch (v) {
      throw w.forEach((T) => i._OrtFree(T)), S2.forEach((T) => i._OrtFree(T)), b !== 0 && i._OrtReleaseBinding(b) !== 0 && V("Can't release IO binding."), p !== 0 && i._OrtReleaseSession(p) !== 0 && V("Can't release session."), v;
    } finally {
      i._free(s), l !== 0 && i._OrtReleaseSessionOptions(l) !== 0 && V("Can't release session options."), g.forEach((v) => i._free(v)), i.unmountExternalData?.();
    }
  }, rr = (a) => {
    let r = j(), s = ft.get(a);
    if (!s) throw new Error(`cannot release session. invalid session id: ${a}`);
    let [f, i, p, l, b] = s;
    l && (b && r._OrtClearBoundOutputs(l.handle) !== 0 && V("Can't clear bound outputs."), r._OrtReleaseBinding(l.handle) !== 0 && V("Can't release IO binding.")), r.jsepOnReleaseSession?.(a), r.webnnOnReleaseSession?.(a), r.webgpuOnReleaseSession?.(a), i.forEach((g) => r._OrtFree(g)), p.forEach((g) => r._OrtFree(g)), r._OrtReleaseSession(f) !== 0 && V("Can't release session."), ft.delete(a);
  }, Gs = async (a, r, s, f, i, p, l = false) => {
    if (!a) {
      r.push(0);
      return;
    }
    let b = j(), g = b.PTR_SIZE, w = a[0], S2 = a[1], v = a[3], T = v, A, C;
    if (w === "string" && (v === "gpu-buffer" || v === "ml-tensor")) throw new Error("String tensor is not supported on GPU.");
    if (l && v !== "gpu-buffer") throw new Error(`External buffer must be provided for input/output index ${p} when enableGraphCapture is true.`);
    if (v === "gpu-buffer") {
      let U2 = a[2].gpuBuffer;
      C = bt(He(w), S2);
      {
        let M = b.webgpuRegisterBuffer;
        if (!M) throw new Error('Tensor location "gpu-buffer" is not supported without using WebGPU.');
        A = M(U2, f);
      }
    } else if (v === "ml-tensor") {
      let U2 = a[2].mlTensor;
      C = bt(He(w), S2);
      let M = b.webnnRegisterMLTensor;
      if (!M) throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');
      A = M(f, U2, He(w), S2);
    } else {
      let U2 = a[2];
      if (Array.isArray(U2)) {
        C = g * U2.length, A = b._malloc(C), s.push(A);
        for (let M = 0; M < U2.length; M++) {
          if (typeof U2[M] != "string") throw new TypeError(`tensor data at index ${M} is not a string`);
          b.setValue(A + M * g, be(U2[M], s), "*");
        }
      } else {
        let M = b.webnnIsGraphInput, Y2 = b.webnnIsGraphOutput;
        if (w !== "string" && M && Y2) {
          let O = b.UTF8ToString(i);
          if (M(f, O) || Y2(f, O)) {
            let $ = He(w);
            C = bt($, S2), T = "ml-tensor";
            let oe = b.webnnCreateTemporaryTensor, d = b.webnnUploadTensor;
            if (!oe || !d) throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');
            let te2 = await oe(f, $, S2);
            d(te2, new Uint8Array(U2.buffer, U2.byteOffset, U2.byteLength)), A = te2;
          } else C = U2.byteLength, A = b._malloc(C), s.push(A), b.HEAPU8.set(new Uint8Array(U2.buffer, U2.byteOffset, C), A);
        } else C = U2.byteLength, A = b._malloc(C), s.push(A), b.HEAPU8.set(new Uint8Array(U2.buffer, U2.byteOffset, C), A);
      }
    }
    let _ = b.stackSave(), k = b.stackAlloc(4 * S2.length);
    try {
      S2.forEach((M, Y2) => b.setValue(k + Y2 * g, M, g === 4 ? "i32" : "i64"));
      let U2 = b._OrtCreateTensor(He(w), A, C, k, S2.length, fn(T));
      U2 === 0 && V(`Can't create tensor for input/output. session=${f}, index=${p}.`), r.push(U2);
    } finally {
      b.stackRestore(_);
    }
  }, nr = async (a, r, s, f, i, p) => {
    let l = j(), b = l.PTR_SIZE, g = ft.get(a);
    if (!g) throw new Error(`cannot run inference. invalid session id: ${a}`);
    let w = g[0], S2 = g[1], v = g[2], T = g[3], A = g[4], C = g[5], _ = r.length, k = f.length, U2 = 0, M = [], Y2 = [], O = [], $ = [], oe = [], d = l.stackSave(), te2 = l.stackAlloc(_ * b), Z = l.stackAlloc(_ * b), X2 = l.stackAlloc(k * b), De2 = l.stackAlloc(k * b);
    try {
      [U2, M] = Ss(p), $e("wasm prepareInputOutputTensor");
      for (let R3 = 0; R3 < _; R3++) await Gs(s[R3], Y2, $, a, S2[r[R3]], r[R3], A);
      for (let R3 = 0; R3 < k; R3++) await Gs(i[R3], O, $, a, v[f[R3]], _ + f[R3], A);
      ze("wasm prepareInputOutputTensor");
      for (let R3 = 0; R3 < _; R3++) l.setValue(te2 + R3 * b, Y2[R3], "*"), l.setValue(Z + R3 * b, S2[r[R3]], "*");
      for (let R3 = 0; R3 < k; R3++) l.setValue(X2 + R3 * b, O[R3], "*"), l.setValue(De2 + R3 * b, v[f[R3]], "*");
      if (T && !C) {
        let { handle: R3, outputPreferredLocations: ae2, outputPreferredLocationsEncoded: pe2 } = T;
        if (S2.length !== _) throw new Error(`input count from feeds (${_}) is expected to be always equal to model's input count (${S2.length}).`);
        $e("wasm bindInputsOutputs");
        for (let J2 = 0; J2 < _; J2++) {
          let ge2 = r[J2];
          await l._OrtBindInput(R3, S2[ge2], Y2[J2]) !== 0 && V(`Can't bind input[${J2}] for session=${a}.`);
        }
        for (let J2 = 0; J2 < k; J2++) {
          let ge2 = f[J2];
          i[J2]?.[3] ? (oe.push(O[J2]), l._OrtBindOutput(R3, v[ge2], O[J2], 0) !== 0 && V(`Can't bind pre-allocated output[${J2}] for session=${a}.`)) : l._OrtBindOutput(R3, v[ge2], 0, pe2[ge2]) !== 0 && V(`Can't bind output[${J2}] to ${ae2[J2]} for session=${a}.`);
        }
        ze("wasm bindInputsOutputs"), ft.set(a, [w, S2, v, T, A, true]);
      }
      l.jsepOnRunStart?.(w), l.webnnOnRunStart?.(w);
      let K2;
      T ? K2 = await l._OrtRunWithBinding(w, T.handle, k, X2, U2) : K2 = await l._OrtRun(w, Z, te2, _, De2, k, X2, U2), K2 !== 0 && V("failed to call OrtRun().");
      let I = [], E2 = [];
      $e("wasm ProcessOutputTensor");
      for (let R3 = 0; R3 < k; R3++) {
        let ae2 = Number(l.getValue(X2 + R3 * b, "*"));
        if (ae2 === O[R3] || oe.includes(O[R3])) {
          I.push(i[R3]), ae2 !== O[R3] && l._OrtReleaseTensor(ae2) !== 0 && V("Can't release tensor.");
          continue;
        }
        let pe2 = l.stackSave(), J2 = l.stackAlloc(4 * b), ge2 = false, ne2, se2 = 0;
        try {
          l._OrtGetTensorData(ae2, J2, J2 + b, J2 + 2 * b, J2 + 3 * b) !== 0 && V(`Can't access output tensor data on index ${R3}.`);
          let we2 = b === 4 ? "i32" : "i64", qe2 = Number(l.getValue(J2, we2));
          se2 = l.getValue(J2 + b, "*");
          let wt2 = l.getValue(J2 + b * 2, "*"), Tt2 = Number(l.getValue(J2 + b * 3, we2)), Se2 = [];
          for (let re2 = 0; re2 < Tt2; re2++) Se2.push(Number(l.getValue(wt2 + re2 * b, we2)));
          l._OrtFree(wt2) !== 0 && V("Can't free memory for tensor dims.");
          let xe2 = Se2.reduce((re2, Q2) => re2 * Q2, 1);
          ne2 = ur(qe2);
          let Be2 = T?.outputPreferredLocations[f[R3]];
          if (ne2 === "string") {
            if (Be2 === "gpu-buffer" || Be2 === "ml-tensor") throw new Error("String tensor is not supported on GPU.");
            let re2 = [];
            for (let Q2 = 0; Q2 < xe2; Q2++) {
              let z2 = l.getValue(se2 + Q2 * b, "*"), H2 = l.getValue(se2 + (Q2 + 1) * b, "*"), Ye2 = Q2 === xe2 - 1 ? void 0 : H2 - z2;
              re2.push(l.UTF8ToString(z2, Ye2));
            }
            I.push([ne2, Se2, re2, "cpu"]);
          } else if (Be2 === "gpu-buffer" && xe2 > 0) {
            let re2 = l.webgpuGetBuffer;
            if (!re2) throw new Error('preferredLocation "gpu-buffer" is not supported without using WebGPU.');
            let Q2 = re2(se2), z2 = bt(qe2, xe2);
            if (z2 === void 0 || !fr(ne2)) throw new Error(`Unsupported data type: ${ne2}`);
            ge2 = true;
            {
              l.webgpuRegisterBuffer(Q2, a, se2);
              let H2 = l.webgpuCreateDownloader(Q2, z2, a);
              I.push([ne2, Se2, { gpuBuffer: Q2, download: async () => {
                let Ye2 = await H2();
                return new (it(ne2))(Ye2);
              }, dispose: () => {
                l._OrtReleaseTensor(ae2) !== 0 && V("Can't release tensor.");
              } }, "gpu-buffer"]);
            }
          } else if (Be2 === "ml-tensor" && xe2 > 0) {
            let re2 = l.webnnEnsureTensor, Q2 = l.webnnIsGraphInputOutputTypeSupported;
            if (!re2 || !Q2) throw new Error('preferredLocation "ml-tensor" is not supported without using WebNN.');
            if (bt(qe2, xe2) === void 0 || !cr(ne2)) throw new Error(`Unsupported data type: ${ne2}`);
            if (!Q2(a, ne2, false)) throw new Error(`preferredLocation "ml-tensor" for ${ne2} output is not supported by current WebNN Context.`);
            let H2 = await re2(a, se2, qe2, Se2, false);
            ge2 = true, I.push([ne2, Se2, { mlTensor: H2, download: l.webnnCreateMLTensorDownloader(se2, ne2), dispose: () => {
              l.webnnReleaseTensorId(se2), l._OrtReleaseTensor(ae2);
            } }, "ml-tensor"]);
          } else if (Be2 === "ml-tensor-cpu-output" && xe2 > 0) {
            let re2 = l.webnnCreateMLTensorDownloader(se2, ne2)(), Q2 = I.length;
            ge2 = true, E2.push((async () => {
              let z2 = [Q2, await re2];
              return l.webnnReleaseTensorId(se2), l._OrtReleaseTensor(ae2), z2;
            })()), I.push([ne2, Se2, [], "cpu"]);
          } else {
            let re2 = it(ne2), Q2 = new re2(xe2);
            new Uint8Array(Q2.buffer, Q2.byteOffset, Q2.byteLength).set(l.HEAPU8.subarray(se2, se2 + Q2.byteLength)), I.push([ne2, Se2, Q2, "cpu"]);
          }
        } finally {
          l.stackRestore(pe2), ne2 === "string" && se2 && l._free(se2), ge2 || l._OrtReleaseTensor(ae2);
        }
      }
      T && !A && (l._OrtClearBoundOutputs(T.handle) !== 0 && V("Can't clear bound outputs."), ft.set(a, [w, S2, v, T, A, false]));
      for (let [R3, ae2] of await Promise.all(E2)) I[R3][2] = ae2;
      return ze("wasm ProcessOutputTensor"), I;
    } finally {
      l.webnnOnRunEnd?.(w), l.stackRestore(d), s.forEach((K2) => {
        K2 && K2[3] === "gpu-buffer" && l.webgpuUnregisterBuffer(K2[2].gpuBuffer);
      }), i.forEach((K2) => {
        K2 && K2[3] === "gpu-buffer" && l.webgpuUnregisterBuffer(K2[2].gpuBuffer);
      }), Y2.forEach((K2) => l._OrtReleaseTensor(K2)), O.forEach((K2) => l._OrtReleaseTensor(K2)), $.forEach((K2) => l._free(K2)), U2 !== 0 && l._OrtReleaseRunOptions(U2), M.forEach((K2) => l._free(K2));
    }
  }, or = (a) => {
    let r = j(), s = ft.get(a);
    if (!s) throw new Error("invalid session id");
    let f = s[0], i = r._OrtEndProfiling(f);
    i === 0 && V("Can't get an profile file name."), r._OrtFree(i);
  }, ar = (a) => {
    let r = [];
    for (let s of a) {
      let f = s[2];
      !Array.isArray(f) && "buffer" in f && r.push(f.buffer);
    }
    return r;
  };
});
var ct;
var Ee;
var Dt;
var hr;
var br;
var mr;
var mn;
var hn;
var gt;
var yt;
var Gc;
var $s;
var zs;
var Vs;
var js;
var Hs;
var qs;
var Ys;
var bn = G(() => {
  "use strict";
  Ve();
  nn();
  je();
  Zt();
  ct = () => !!ee.wasm.proxy && typeof document < "u", Dt = false, hr = false, br = false, hn = /* @__PURE__ */ new Map(), gt = (a, r) => {
    let s = hn.get(a);
    s ? s.push(r) : hn.set(a, [r]);
  }, yt = () => {
    if (Dt || !hr || br || !Ee) throw new Error("worker not ready");
  }, Gc = (a) => {
    switch (a.data.type) {
      case "init-wasm":
        Dt = false, a.data.err ? (br = true, mn[1](a.data.err)) : (hr = true, mn[0]()), mr && (URL.revokeObjectURL(mr), mr = void 0);
        break;
      case "init-ep":
      case "copy-from":
      case "create":
      case "release":
      case "run":
      case "end-profiling": {
        let r = hn.get(a.data.type);
        a.data.err ? r.shift()[1](a.data.err) : r.shift()[0](a.data.out);
        break;
      }
      default:
    }
  }, $s = async () => {
    if (!hr) {
      if (Dt) throw new Error("multiple calls to 'initWasm()' detected.");
      if (br) throw new Error("previous call to 'initWasm()' failed.");
      if (Dt = true, ct()) return new Promise((a, r) => {
        Ee?.terminate(), Ts().then(([s, f]) => {
          try {
            Ee = f, Ee.onerror = (p) => r(p), Ee.onmessage = Gc, mn = [a, r];
            let i = { type: "init-wasm", in: ee };
            !i.in.wasm.wasmPaths && (s || an) && (i.in.wasm.wasmPaths = { wasm: new URL("ort-wasm-simd-threaded.asyncify.wasm", import.meta.url).href }), Ee.postMessage(i), mr = s;
          } catch (i) {
            r(i);
          }
        }, r);
      });
      try {
        await Kt(ee.wasm), await Qt(ee), hr = true;
      } catch (a) {
        throw br = true, a;
      } finally {
        Dt = false;
      }
    }
  }, zs = async (a) => {
    if (ct()) return yt(), new Promise((r, s) => {
      gt("init-ep", [r, s]);
      let f = { type: "init-ep", in: { epName: a, env: ee } };
      Ee.postMessage(f);
    });
    await er(ee, a);
  }, Vs = async (a) => ct() ? (yt(), new Promise((r, s) => {
    gt("copy-from", [r, s]);
    let f = { type: "copy-from", in: { buffer: a } };
    Ee.postMessage(f, [a.buffer]);
  })) : Lt(a), js = async (a, r) => {
    if (ct()) {
      if (r?.preferredOutputLocation) throw new Error('session option "preferredOutputLocation" is not supported for proxy.');
      return yt(), new Promise((s, f) => {
        gt("create", [s, f]);
        let i = { type: "create", in: { model: a, options: { ...r } } }, p = [];
        a instanceof Uint8Array && p.push(a.buffer), Ee.postMessage(i, p);
      });
    } else return tr(a, r);
  }, Hs = async (a) => {
    if (ct()) return yt(), new Promise((r, s) => {
      gt("release", [r, s]);
      let f = { type: "release", in: a };
      Ee.postMessage(f);
    });
    rr(a);
  }, qs = async (a, r, s, f, i, p) => {
    if (ct()) {
      if (s.some((l) => l[3] !== "cpu")) throw new Error("input tensor on GPU is not supported for proxy.");
      if (i.some((l) => l)) throw new Error("pre-allocated output tensor is not supported for proxy.");
      return yt(), new Promise((l, b) => {
        gt("run", [l, b]);
        let g = s, w = { type: "run", in: { sessionId: a, inputIndices: r, inputs: g, outputIndices: f, options: p } };
        Ee.postMessage(w, ar(g));
      });
    } else return nr(a, r, s, f, i, p);
  }, Ys = async (a) => {
    if (ct()) return yt(), new Promise((r, s) => {
      gt("end-profiling", [r, s]);
      let f = { type: "end-profiling", in: a };
      Ee.postMessage(f);
    });
    or(a);
  };
});
var Js;
var $c;
var gr;
var Xs = G(() => {
  "use strict";
  Ve();
  bn();
  ut();
  Xt();
  cn();
  Js = (a, r) => {
    switch (a.location) {
      case "cpu":
        return [a.type, a.dims, a.data, "cpu"];
      case "gpu-buffer":
        return [a.type, a.dims, { gpuBuffer: a.gpuBuffer }, "gpu-buffer"];
      case "ml-tensor":
        return [a.type, a.dims, { mlTensor: a.mlTensor }, "ml-tensor"];
      default:
        throw new Error(`invalid data location: ${a.location} for ${r()}`);
    }
  }, $c = (a) => {
    switch (a[3]) {
      case "cpu":
        return new Le(a[0], a[2], a[1]);
      case "gpu-buffer": {
        let r = a[0];
        if (!fr(r)) throw new Error(`not supported data type: ${r} for deserializing GPU tensor`);
        let { gpuBuffer: s, download: f, dispose: i } = a[2];
        return Le.fromGpuBuffer(s, { dataType: r, dims: a[1], download: f, dispose: i });
      }
      case "ml-tensor": {
        let r = a[0];
        if (!cr(r)) throw new Error(`not supported data type: ${r} for deserializing MLTensor tensor`);
        let { mlTensor: s, download: f, dispose: i } = a[2];
        return Le.fromMLTensor(s, { dataType: r, dims: a[1], download: f, dispose: i });
      }
      default:
        throw new Error(`invalid data location: ${a[3]}`);
    }
  }, gr = class {
    async fetchModelAndCopyToWasmMemory(r) {
      return Vs(await Ct(r));
    }
    async loadModel(r, s) {
      ot();
      let f;
      typeof r == "string" ? f = await this.fetchModelAndCopyToWasmMemory(r) : f = r, [this.sessionId, this.inputNames, this.outputNames, this.inputMetadata, this.outputMetadata] = await js(f, s), at();
    }
    async dispose() {
      return Hs(this.sessionId);
    }
    async run(r, s, f) {
      ot();
      let i = [], p = [];
      Object.entries(r).forEach((T) => {
        let A = T[0], C = T[1], _ = this.inputNames.indexOf(A);
        if (_ === -1) throw new Error(`invalid input '${A}'`);
        i.push(C), p.push(_);
      });
      let l = [], b = [];
      Object.entries(s).forEach((T) => {
        let A = T[0], C = T[1], _ = this.outputNames.indexOf(A);
        if (_ === -1) throw new Error(`invalid output '${A}'`);
        l.push(C), b.push(_);
      });
      let g = i.map((T, A) => Js(T, () => `input "${this.inputNames[p[A]]}"`)), w = l.map((T, A) => T ? Js(T, () => `output "${this.outputNames[b[A]]}"`) : null), S2 = await qs(this.sessionId, p, g, b, w, f), v = {};
      for (let T = 0; T < S2.length; T++) v[this.outputNames[b[T]]] = l[T] ?? $c(S2[T]);
      return at(), v;
    }
    startProfiling() {
    }
    endProfiling() {
      Ys(this.sessionId);
    }
  };
});
var Ks = {};
At(Ks, { OnnxruntimeWebAssemblyBackend: () => yr, initializeFlags: () => Zs, wasmBackend: () => zc });
var Zs;
var yr;
var zc;
var Qs = G(() => {
  "use strict";
  Ve();
  bn();
  Xs();
  Zs = () => {
    (typeof ee.wasm.initTimeout != "number" || ee.wasm.initTimeout < 0) && (ee.wasm.initTimeout = 0);
    let a = ee.wasm.simd;
    if (typeof a != "boolean" && a !== void 0 && a !== "fixed" && a !== "relaxed" && (console.warn(`Property "env.wasm.simd" is set to unknown value "${a}". Reset it to \`false\` and ignore SIMD feature checking.`), ee.wasm.simd = false), typeof ee.wasm.proxy != "boolean" && (ee.wasm.proxy = false), typeof ee.wasm.trace != "boolean" && (ee.wasm.trace = false), typeof ee.wasm.numThreads != "number" || !Number.isInteger(ee.wasm.numThreads) || ee.wasm.numThreads <= 0) if (typeof self < "u" && !self.crossOriginIsolated) ee.wasm.numThreads = 1;
    else {
      let r = typeof navigator > "u" ? Xr("node:os").cpus().length : navigator.hardwareConcurrency;
      ee.wasm.numThreads = Math.min(4, Math.ceil((r || 1) / 2));
    }
  }, yr = class {
    async init(r) {
      Zs(), await $s(), await zs(r);
    }
    async createInferenceSessionHandler(r, s) {
      let f = new gr();
      return await f.loadModel(r, s), f;
    }
  }, zc = new yr();
});
Ve();
Ve();
Ve();
var is = "1.31.0-dev.20260914-8d85527a0";
var $l = rn;
{
  let a = (Qs(), Ht(Ks)).wasmBackend;
  rt("webgpu", a, 5), rt("webnn", a, 5), rt("cpu", a, 10), rt("wasm", a, 10);
}
Object.defineProperty(ee.versions, "web", { value: is, enumerable: true });

// node_modules/onnxruntime-common/dist/esm/version.js
var version = "1.30.0";

// node_modules/onnxruntime-common/dist/esm/env-impl.js
var logLevelValue = "warning";
var env = {
  wasm: {},
  webgl: {},
  webgpu: {},
  versions: { common: version },
  set logLevel(value) {
    if (value === void 0) {
      return;
    }
    if (typeof value !== "string" || ["verbose", "info", "warning", "error", "fatal"].indexOf(value) === -1) {
      throw new Error(`Unsupported logging level: ${value}`);
    }
    logLevelValue = value;
  },
  get logLevel() {
    return logLevelValue;
  }
};
Object.defineProperty(env, "logLevel", { enumerable: true });

// node_modules/onnxruntime-common/dist/esm/tensor-conversion-impl.js
var tensorToDataURL = (tensor, options) => {
  const canvas = typeof document !== "undefined" ? document.createElement("canvas") : new OffscreenCanvas(1, 1);
  canvas.width = tensor.dims[3];
  canvas.height = tensor.dims[2];
  const pixels2DContext = canvas.getContext("2d");
  if (pixels2DContext != null) {
    let width;
    let height;
    if (options?.tensorLayout !== void 0 && options.tensorLayout === "NHWC") {
      width = tensor.dims[2];
      height = tensor.dims[3];
    } else {
      width = tensor.dims[3];
      height = tensor.dims[2];
    }
    const inputformat = options?.format !== void 0 ? options.format : "RGB";
    const norm = options?.norm;
    let normMean;
    let normBias;
    if (norm === void 0 || norm.mean === void 0) {
      normMean = [255, 255, 255, 255];
    } else {
      if (typeof norm.mean === "number") {
        normMean = [norm.mean, norm.mean, norm.mean, norm.mean];
      } else {
        normMean = [norm.mean[0], norm.mean[1], norm.mean[2], 0];
        if (norm.mean[3] !== void 0) {
          normMean[3] = norm.mean[3];
        }
      }
    }
    if (norm === void 0 || norm.bias === void 0) {
      normBias = [0, 0, 0, 0];
    } else {
      if (typeof norm.bias === "number") {
        normBias = [norm.bias, norm.bias, norm.bias, norm.bias];
      } else {
        normBias = [norm.bias[0], norm.bias[1], norm.bias[2], 0];
        if (norm.bias[3] !== void 0) {
          normBias[3] = norm.bias[3];
        }
      }
    }
    const stride = height * width;
    let rTensorPointer = 0, gTensorPointer = stride, bTensorPointer = stride * 2, aTensorPointer = -1;
    if (inputformat === "RGBA") {
      rTensorPointer = 0;
      gTensorPointer = stride;
      bTensorPointer = stride * 2;
      aTensorPointer = stride * 3;
    } else if (inputformat === "RGB") {
      rTensorPointer = 0;
      gTensorPointer = stride;
      bTensorPointer = stride * 2;
    } else if (inputformat === "RBG") {
      rTensorPointer = 0;
      bTensorPointer = stride;
      gTensorPointer = stride * 2;
    }
    for (let i = 0; i < height; i++) {
      for (let j2 = 0; j2 < width; j2++) {
        const R3 = (tensor.data[rTensorPointer++] - normBias[0]) * normMean[0];
        const G3 = (tensor.data[gTensorPointer++] - normBias[1]) * normMean[1];
        const B = (tensor.data[bTensorPointer++] - normBias[2]) * normMean[2];
        const A = aTensorPointer === -1 ? 255 : (tensor.data[aTensorPointer++] - normBias[3]) * normMean[3];
        pixels2DContext.fillStyle = "rgba(" + R3 + "," + G3 + "," + B + "," + A + ")";
        pixels2DContext.fillRect(j2, i, 1, 1);
      }
    }
    if ("toDataURL" in canvas) {
      return canvas.toDataURL();
    } else {
      throw new Error("toDataURL is not supported");
    }
  } else {
    throw new Error("Can not access image data");
  }
};
var tensorToImageData = (tensor, options) => {
  const pixels2DContext = typeof document !== "undefined" ? document.createElement("canvas").getContext("2d") : new OffscreenCanvas(1, 1).getContext("2d");
  let image;
  if (pixels2DContext != null) {
    let width;
    let height;
    let channels;
    if (options?.tensorLayout !== void 0 && options.tensorLayout === "NHWC") {
      width = tensor.dims[2];
      height = tensor.dims[1];
      channels = tensor.dims[3];
    } else {
      width = tensor.dims[3];
      height = tensor.dims[2];
      channels = tensor.dims[1];
    }
    const inputformat = options !== void 0 ? options.format !== void 0 ? options.format : "RGB" : "RGB";
    const norm = options?.norm;
    let normMean;
    let normBias;
    if (norm === void 0 || norm.mean === void 0) {
      normMean = [255, 255, 255, 255];
    } else {
      if (typeof norm.mean === "number") {
        normMean = [norm.mean, norm.mean, norm.mean, norm.mean];
      } else {
        normMean = [norm.mean[0], norm.mean[1], norm.mean[2], 255];
        if (norm.mean[3] !== void 0) {
          normMean[3] = norm.mean[3];
        }
      }
    }
    if (norm === void 0 || norm.bias === void 0) {
      normBias = [0, 0, 0, 0];
    } else {
      if (typeof norm.bias === "number") {
        normBias = [norm.bias, norm.bias, norm.bias, norm.bias];
      } else {
        normBias = [norm.bias[0], norm.bias[1], norm.bias[2], 0];
        if (norm.bias[3] !== void 0) {
          normBias[3] = norm.bias[3];
        }
      }
    }
    const stride = height * width;
    if (options !== void 0) {
      if (options.format !== void 0 && channels === 4 && options.format !== "RGBA" || channels === 3 && options.format !== "RGB" && options.format !== "BGR") {
        throw new Error("Tensor format doesn't match input tensor dims");
      }
    }
    const step = 4;
    let rImagePointer = 0, gImagePointer = 1, bImagePointer = 2, aImagePointer = 3;
    let rTensorPointer = 0, gTensorPointer = stride, bTensorPointer = stride * 2, aTensorPointer = -1;
    if (inputformat === "RGBA") {
      rTensorPointer = 0;
      gTensorPointer = stride;
      bTensorPointer = stride * 2;
      aTensorPointer = stride * 3;
    } else if (inputformat === "RGB") {
      rTensorPointer = 0;
      gTensorPointer = stride;
      bTensorPointer = stride * 2;
    } else if (inputformat === "RBG") {
      rTensorPointer = 0;
      bTensorPointer = stride;
      gTensorPointer = stride * 2;
    }
    image = pixels2DContext.createImageData(width, height);
    for (let i = 0; i < height * width; rImagePointer += step, gImagePointer += step, bImagePointer += step, aImagePointer += step, i++) {
      image.data[rImagePointer] = (tensor.data[rTensorPointer++] - normBias[0]) * normMean[0];
      image.data[gImagePointer] = (tensor.data[gTensorPointer++] - normBias[1]) * normMean[1];
      image.data[bImagePointer] = (tensor.data[bTensorPointer++] - normBias[2]) * normMean[2];
      image.data[aImagePointer] = aTensorPointer === -1 ? 255 : (tensor.data[aTensorPointer++] - normBias[3]) * normMean[3];
    }
  } else {
    throw new Error("Can not access image data");
  }
  return image;
};

// node_modules/onnxruntime-common/dist/esm/tensor-factory-impl.js
var bufferToTensor = (buffer, options) => {
  if (buffer === void 0) {
    throw new Error("Image buffer must be defined");
  }
  if (options.height === void 0 || options.width === void 0) {
    throw new Error("Image height and width must be defined");
  }
  if (options.tensorLayout === "NHWC") {
    throw new Error("NHWC Tensor layout is not supported yet");
  }
  const { height, width } = options;
  const norm = options.norm ?? { mean: 255, bias: 0 };
  let normMean;
  let normBias;
  if (typeof norm.mean === "number") {
    normMean = [norm.mean, norm.mean, norm.mean, norm.mean];
  } else {
    normMean = [norm.mean[0], norm.mean[1], norm.mean[2], norm.mean[3] ?? 255];
  }
  if (typeof norm.bias === "number") {
    normBias = [norm.bias, norm.bias, norm.bias, norm.bias];
  } else {
    normBias = [norm.bias[0], norm.bias[1], norm.bias[2], norm.bias[3] ?? 0];
  }
  const inputformat = options.format !== void 0 ? options.format : "RGBA";
  const outputformat = options.tensorFormat !== void 0 ? options.tensorFormat !== void 0 ? options.tensorFormat : "RGB" : "RGB";
  const stride = height * width;
  const float32Data = outputformat === "RGBA" ? new Float32Array(stride * 4) : new Float32Array(stride * 3);
  let step = 4, rImagePointer = 0, gImagePointer = 1, bImagePointer = 2, aImagePointer = 3;
  let rTensorPointer = 0, gTensorPointer = stride, bTensorPointer = stride * 2, aTensorPointer = -1;
  if (inputformat === "RGB") {
    step = 3;
    rImagePointer = 0;
    gImagePointer = 1;
    bImagePointer = 2;
    aImagePointer = -1;
  }
  if (outputformat === "RGBA") {
    aTensorPointer = stride * 3;
  } else if (outputformat === "RBG") {
    rTensorPointer = 0;
    bTensorPointer = stride;
    gTensorPointer = stride * 2;
  } else if (outputformat === "BGR") {
    bTensorPointer = 0;
    gTensorPointer = stride;
    rTensorPointer = stride * 2;
  }
  for (let i = 0; i < stride; i++, rImagePointer += step, bImagePointer += step, gImagePointer += step, aImagePointer += step) {
    float32Data[rTensorPointer++] = (buffer[rImagePointer] + normBias[0]) / normMean[0];
    float32Data[gTensorPointer++] = (buffer[gImagePointer] + normBias[1]) / normMean[1];
    float32Data[bTensorPointer++] = (buffer[bImagePointer] + normBias[2]) / normMean[2];
    if (aTensorPointer !== -1 && aImagePointer !== -1) {
      float32Data[aTensorPointer++] = (buffer[aImagePointer] + normBias[3]) / normMean[3];
    }
  }
  const outputTensor = outputformat === "RGBA" ? new Tensor("float32", float32Data, [1, 4, height, width]) : new Tensor("float32", float32Data, [1, 3, height, width]);
  return outputTensor;
};
var tensorFromImage = async (image, options) => {
  const isHTMLImageEle = typeof HTMLImageElement !== "undefined" && image instanceof HTMLImageElement;
  const isImageDataEle = typeof ImageData !== "undefined" && image instanceof ImageData;
  const isImageBitmap = typeof ImageBitmap !== "undefined" && image instanceof ImageBitmap;
  const isString = typeof image === "string";
  let data;
  let bufferToTensorOptions = options ?? {};
  const createCanvas = () => {
    if (typeof document !== "undefined") {
      return document.createElement("canvas");
    } else if (typeof OffscreenCanvas !== "undefined") {
      return new OffscreenCanvas(1, 1);
    } else {
      throw new Error("Canvas is not supported");
    }
  };
  const createCanvasContext = (canvas) => {
    if (typeof HTMLCanvasElement !== "undefined" && canvas instanceof HTMLCanvasElement) {
      return canvas.getContext("2d");
    } else if (canvas instanceof OffscreenCanvas) {
      return canvas.getContext("2d");
    } else {
      return null;
    }
  };
  if (isHTMLImageEle) {
    const canvas = createCanvas();
    canvas.width = image.width;
    canvas.height = image.height;
    const pixels2DContext = createCanvasContext(canvas);
    if (pixels2DContext != null) {
      let height = image.height;
      let width = image.width;
      if (options !== void 0 && options.resizedHeight !== void 0 && options.resizedWidth !== void 0) {
        height = options.resizedHeight;
        width = options.resizedWidth;
      }
      if (options !== void 0) {
        bufferToTensorOptions = options;
        if (options.tensorFormat !== void 0) {
          throw new Error("Image input config format must be RGBA for HTMLImageElement");
        } else {
          bufferToTensorOptions.tensorFormat = "RGBA";
        }
        bufferToTensorOptions.height = height;
        bufferToTensorOptions.width = width;
      } else {
        bufferToTensorOptions.tensorFormat = "RGBA";
        bufferToTensorOptions.height = height;
        bufferToTensorOptions.width = width;
      }
      pixels2DContext.drawImage(image, 0, 0);
      data = pixels2DContext.getImageData(0, 0, width, height).data;
    } else {
      throw new Error("Can not access image data");
    }
  } else if (isImageDataEle) {
    let height;
    let width;
    if (options !== void 0 && options.resizedWidth !== void 0 && options.resizedHeight !== void 0) {
      height = options.resizedHeight;
      width = options.resizedWidth;
    } else {
      height = image.height;
      width = image.width;
    }
    if (options !== void 0) {
      bufferToTensorOptions = options;
    }
    bufferToTensorOptions.format = "RGBA";
    bufferToTensorOptions.height = height;
    bufferToTensorOptions.width = width;
    if (options !== void 0) {
      const tempCanvas = createCanvas();
      tempCanvas.width = width;
      tempCanvas.height = height;
      const pixels2DContext = createCanvasContext(tempCanvas);
      if (pixels2DContext != null) {
        pixels2DContext.putImageData(image, 0, 0);
        data = pixels2DContext.getImageData(0, 0, width, height).data;
      } else {
        throw new Error("Can not access image data");
      }
    } else {
      data = image.data;
    }
  } else if (isImageBitmap) {
    if (options === void 0) {
      throw new Error("Please provide image config with format for Imagebitmap");
    }
    const canvas = createCanvas();
    canvas.width = image.width;
    canvas.height = image.height;
    const pixels2DContext = createCanvasContext(canvas);
    if (pixels2DContext != null) {
      const height = image.height;
      const width = image.width;
      pixels2DContext.drawImage(image, 0, 0, width, height);
      data = pixels2DContext.getImageData(0, 0, width, height).data;
      bufferToTensorOptions.height = height;
      bufferToTensorOptions.width = width;
      return bufferToTensor(data, bufferToTensorOptions);
    } else {
      throw new Error("Can not access image data");
    }
  } else if (isString) {
    return new Promise((resolve, reject) => {
      const canvas = createCanvas();
      const context = createCanvasContext(canvas);
      if (!image || !context) {
        return reject();
      }
      const newImage = new Image();
      newImage.crossOrigin = "Anonymous";
      newImage.src = image;
      newImage.onload = () => {
        canvas.width = newImage.width;
        canvas.height = newImage.height;
        context.drawImage(newImage, 0, 0, canvas.width, canvas.height);
        const img = context.getImageData(0, 0, canvas.width, canvas.height);
        bufferToTensorOptions.height = canvas.height;
        bufferToTensorOptions.width = canvas.width;
        resolve(bufferToTensor(img.data, bufferToTensorOptions));
      };
    });
  } else {
    throw new Error("Input data provided is not supported - aborted tensor creation");
  }
  if (data !== void 0) {
    return bufferToTensor(data, bufferToTensorOptions);
  } else {
    throw new Error("Input data provided is not supported - aborted tensor creation");
  }
};
var tensorFromTexture = (texture, options) => {
  const { width, height, download, dispose } = options;
  const dims = [1, height, width, 4];
  return new Tensor({ location: "texture", type: "float32", texture, dims, download, dispose });
};
var tensorFromGpuBuffer = (gpuBuffer, options) => {
  const { dataType, dims, download, dispose } = options;
  return new Tensor({ location: "gpu-buffer", type: dataType ?? "float32", gpuBuffer, dims, download, dispose });
};
var tensorFromMLTensor = (mlTensor, options) => {
  const { dataType, dims, download, dispose } = options;
  return new Tensor({ location: "ml-tensor", type: dataType ?? "float32", mlTensor, dims, download, dispose });
};
var tensorFromPinnedBuffer = (type, buffer, dims) => new Tensor({ location: "cpu-pinned", type, data: buffer, dims: dims ?? [buffer.length] });

// node_modules/onnxruntime-common/dist/esm/tensor-impl-type-mapping.js
var NUMERIC_TENSOR_TYPE_TO_TYPEDARRAY_MAP = /* @__PURE__ */ new Map([
  ["float32", Float32Array],
  ["uint8", Uint8Array],
  ["int8", Int8Array],
  ["uint16", Uint16Array],
  ["int16", Int16Array],
  ["int32", Int32Array],
  ["bool", Uint8Array],
  ["float64", Float64Array],
  ["uint32", Uint32Array],
  ["int4", Uint8Array],
  ["uint4", Uint8Array]
]);
var NUMERIC_TENSOR_TYPEDARRAY_TO_TYPE_MAP = /* @__PURE__ */ new Map([
  [Float32Array, "float32"],
  [Uint8Array, "uint8"],
  [Int8Array, "int8"],
  [Uint16Array, "uint16"],
  [Int16Array, "int16"],
  [Int32Array, "int32"],
  [Float64Array, "float64"],
  [Uint32Array, "uint32"]
]);
var isTypedArrayChecked = false;
var checkTypedArray = () => {
  if (!isTypedArrayChecked) {
    isTypedArrayChecked = true;
    const isBigInt64ArrayAvailable = typeof BigInt64Array !== "undefined" && BigInt64Array.from;
    const isBigUint64ArrayAvailable = typeof BigUint64Array !== "undefined" && BigUint64Array.from;
    const Float16Array2 = globalThis.Float16Array;
    const isFloat16ArrayAvailable = typeof Float16Array2 !== "undefined" && Float16Array2.from;
    if (isBigInt64ArrayAvailable) {
      NUMERIC_TENSOR_TYPE_TO_TYPEDARRAY_MAP.set("int64", BigInt64Array);
      NUMERIC_TENSOR_TYPEDARRAY_TO_TYPE_MAP.set(BigInt64Array, "int64");
    }
    if (isBigUint64ArrayAvailable) {
      NUMERIC_TENSOR_TYPE_TO_TYPEDARRAY_MAP.set("uint64", BigUint64Array);
      NUMERIC_TENSOR_TYPEDARRAY_TO_TYPE_MAP.set(BigUint64Array, "uint64");
    }
    if (isFloat16ArrayAvailable) {
      NUMERIC_TENSOR_TYPE_TO_TYPEDARRAY_MAP.set("float16", Float16Array2);
      NUMERIC_TENSOR_TYPEDARRAY_TO_TYPE_MAP.set(Float16Array2, "float16");
    } else {
      NUMERIC_TENSOR_TYPE_TO_TYPEDARRAY_MAP.set("float16", Uint16Array);
    }
  }
};

// node_modules/onnxruntime-common/dist/esm/tensor-utils-impl.js
var calculateSize = (dims) => {
  let size = 1;
  for (let i = 0; i < dims.length; i++) {
    const dim = dims[i];
    if (typeof dim !== "number" || !Number.isSafeInteger(dim)) {
      throw new TypeError(`dims[${i}] must be an integer, got: ${dim}`);
    }
    if (dim < 0) {
      throw new RangeError(`dims[${i}] must be a non-negative integer, got: ${dim}`);
    }
    size *= dim;
  }
  return size;
};
var tensorReshape = (tensor, dims) => {
  switch (tensor.location) {
    case "cpu":
      return new Tensor(tensor.type, tensor.data, dims);
    case "cpu-pinned":
      return new Tensor({
        location: "cpu-pinned",
        data: tensor.data,
        type: tensor.type,
        dims
      });
    case "texture":
      return new Tensor({
        location: "texture",
        texture: tensor.texture,
        type: tensor.type,
        dims
      });
    case "gpu-buffer":
      return new Tensor({
        location: "gpu-buffer",
        gpuBuffer: tensor.gpuBuffer,
        type: tensor.type,
        dims
      });
    case "ml-tensor":
      return new Tensor({
        location: "ml-tensor",
        mlTensor: tensor.mlTensor,
        type: tensor.type,
        dims
      });
    default:
      throw new Error(`tensorReshape: tensor location ${tensor.location} is not supported`);
  }
};

// node_modules/onnxruntime-common/dist/esm/tensor-impl.js
var Tensor = class {
  /**
   * implementation.
   */
  constructor(arg0, arg1, arg2) {
    checkTypedArray();
    let type;
    let dims;
    if (typeof arg0 === "object" && "location" in arg0) {
      this.dataLocation = arg0.location;
      type = arg0.type;
      dims = arg0.dims;
      switch (arg0.location) {
        case "cpu-pinned": {
          const expectedTypedArrayConstructor = NUMERIC_TENSOR_TYPE_TO_TYPEDARRAY_MAP.get(type);
          if (!expectedTypedArrayConstructor) {
            throw new TypeError(`unsupported type "${type}" to create tensor from pinned buffer`);
          }
          if (!(arg0.data instanceof expectedTypedArrayConstructor)) {
            throw new TypeError(`buffer should be of type ${expectedTypedArrayConstructor.name}`);
          }
          this.cpuData = arg0.data;
          break;
        }
        case "texture": {
          if (type !== "float32") {
            throw new TypeError(`unsupported type "${type}" to create tensor from texture`);
          }
          this.gpuTextureData = arg0.texture;
          this.downloader = arg0.download;
          this.disposer = arg0.dispose;
          break;
        }
        case "gpu-buffer": {
          if (type !== "float32" && type !== "float16" && type !== "int32" && type !== "int64" && type !== "uint32" && type !== "uint8" && type !== "bool" && type !== "uint4" && type !== "int4") {
            throw new TypeError(`unsupported type "${type}" to create tensor from gpu buffer`);
          }
          this.gpuBufferData = arg0.gpuBuffer;
          this.downloader = arg0.download;
          this.disposer = arg0.dispose;
          break;
        }
        case "ml-tensor": {
          if (type !== "float32" && type !== "float16" && type !== "int32" && type !== "int64" && type !== "uint32" && type !== "uint64" && type !== "int8" && type !== "uint8" && type !== "bool" && type !== "uint4" && type !== "int4") {
            throw new TypeError(`unsupported type "${type}" to create tensor from MLTensor`);
          }
          this.mlTensorData = arg0.mlTensor;
          this.downloader = arg0.download;
          this.disposer = arg0.dispose;
          break;
        }
        default:
          throw new Error(`Tensor constructor: unsupported location '${this.dataLocation}'`);
      }
    } else {
      let data;
      let maybeDims;
      if (typeof arg0 === "string") {
        type = arg0;
        maybeDims = arg2;
        if (arg0 === "string") {
          if (!Array.isArray(arg1)) {
            throw new TypeError("A string tensor's data must be a string array.");
          }
          data = arg1;
        } else {
          const typedArrayConstructor = NUMERIC_TENSOR_TYPE_TO_TYPEDARRAY_MAP.get(arg0);
          if (typedArrayConstructor === void 0) {
            throw new TypeError(`Unsupported tensor type: ${arg0}.`);
          }
          if (Array.isArray(arg1)) {
            if (arg0 === "float16" && typedArrayConstructor === Uint16Array || arg0 === "uint4" || arg0 === "int4") {
              throw new TypeError(`Creating a ${arg0} tensor from number array is not supported. Please use ${typedArrayConstructor.name} as data.`);
            } else if (arg0 === "uint64" || arg0 === "int64") {
              data = typedArrayConstructor.from(arg1, BigInt);
            } else {
              data = typedArrayConstructor.from(arg1);
            }
          } else if (arg1 instanceof typedArrayConstructor) {
            data = arg1;
          } else if (arg1 instanceof Uint8ClampedArray) {
            if (arg0 === "uint8") {
              data = Uint8Array.from(arg1);
            } else {
              throw new TypeError(`A Uint8ClampedArray tensor's data must be type of uint8`);
            }
          } else if (arg0 === "float16" && arg1 instanceof Uint16Array && typedArrayConstructor !== Uint16Array) {
            data = new globalThis.Float16Array(arg1.buffer, arg1.byteOffset, arg1.length);
          } else {
            throw new TypeError(`A ${type} tensor's data must be type of ${typedArrayConstructor}`);
          }
        }
      } else {
        maybeDims = arg1;
        if (Array.isArray(arg0)) {
          if (arg0.length === 0) {
            throw new TypeError("Tensor type cannot be inferred from an empty array.");
          }
          const firstElementType = typeof arg0[0];
          if (firstElementType === "string") {
            type = "string";
            data = arg0;
          } else if (firstElementType === "boolean") {
            type = "bool";
            data = Uint8Array.from(arg0);
          } else {
            throw new TypeError(`Invalid element type of data array: ${firstElementType}.`);
          }
        } else if (arg0 instanceof Uint8ClampedArray) {
          type = "uint8";
          data = Uint8Array.from(arg0);
        } else {
          const mappedType = NUMERIC_TENSOR_TYPEDARRAY_TO_TYPE_MAP.get(arg0.constructor);
          if (mappedType === void 0) {
            throw new TypeError(`Unsupported type for tensor data: ${arg0.constructor}.`);
          }
          type = mappedType;
          data = arg0;
        }
      }
      if (maybeDims === void 0) {
        maybeDims = [data.length];
      } else if (!Array.isArray(maybeDims)) {
        throw new TypeError("A tensor's dims must be a number array");
      }
      dims = maybeDims;
      this.cpuData = data;
      this.dataLocation = "cpu";
    }
    const size = calculateSize(dims);
    if (this.cpuData && size !== this.cpuData.length) {
      if ((type === "uint4" || type === "int4") && Math.ceil(size / 2) === this.cpuData.length) {
      } else {
        throw new Error(`Tensor's size(${size}) does not match data length(${this.cpuData.length}).`);
      }
    }
    this.type = type;
    this.dims = dims;
    this.size = size;
  }
  // #endregion
  // #region factory
  static async fromImage(image, options) {
    return tensorFromImage(image, options);
  }
  static fromTexture(texture, options) {
    return tensorFromTexture(texture, options);
  }
  static fromGpuBuffer(gpuBuffer, options) {
    return tensorFromGpuBuffer(gpuBuffer, options);
  }
  static fromMLTensor(mlTensor, options) {
    return tensorFromMLTensor(mlTensor, options);
  }
  static fromPinnedBuffer(type, buffer, dims) {
    return tensorFromPinnedBuffer(type, buffer, dims);
  }
  // #endregion
  // #region conversions
  toDataURL(options) {
    return tensorToDataURL(this, options);
  }
  toImageData(options) {
    return tensorToImageData(this, options);
  }
  // #endregion
  // #region properties
  get data() {
    this.ensureValid();
    if (!this.cpuData) {
      throw new Error("The data is not on CPU. Use `getData()` to download GPU data to CPU, or use `texture` or `gpuBuffer` property to access the GPU data directly.");
    }
    return this.cpuData;
  }
  get location() {
    return this.dataLocation;
  }
  get texture() {
    this.ensureValid();
    if (!this.gpuTextureData) {
      throw new Error("The data is not stored as a WebGL texture.");
    }
    return this.gpuTextureData;
  }
  get gpuBuffer() {
    this.ensureValid();
    if (!this.gpuBufferData) {
      throw new Error("The data is not stored as a WebGPU buffer.");
    }
    return this.gpuBufferData;
  }
  get mlTensor() {
    this.ensureValid();
    if (!this.mlTensorData) {
      throw new Error("The data is not stored as a WebNN MLTensor.");
    }
    return this.mlTensorData;
  }
  // #endregion
  // #region methods
  async getData(releaseData) {
    this.ensureValid();
    switch (this.dataLocation) {
      case "cpu":
      case "cpu-pinned":
        return this.data;
      case "texture":
      case "gpu-buffer":
      case "ml-tensor": {
        if (!this.downloader) {
          throw new Error("The current tensor is not created with a specified data downloader.");
        }
        if (this.isDownloading) {
          throw new Error("The current tensor is being downloaded.");
        }
        try {
          this.isDownloading = true;
          const data = await this.downloader();
          this.downloader = void 0;
          this.dataLocation = "cpu";
          this.cpuData = data;
          if (releaseData && this.disposer) {
            this.disposer();
            this.disposer = void 0;
          }
          return data;
        } finally {
          this.isDownloading = false;
        }
      }
      default:
        throw new Error(`cannot get data from location: ${this.dataLocation}`);
    }
  }
  dispose() {
    if (this.isDownloading) {
      throw new Error("The current tensor is being downloaded.");
    }
    if (this.disposer) {
      this.disposer();
      this.disposer = void 0;
    }
    this.cpuData = void 0;
    this.gpuTextureData = void 0;
    this.gpuBufferData = void 0;
    this.mlTensorData = void 0;
    this.downloader = void 0;
    this.isDownloading = void 0;
    this.dataLocation = "none";
  }
  // #endregion
  // #region tensor utilities
  ensureValid() {
    if (this.dataLocation === "none") {
      throw new Error("The tensor is disposed.");
    }
  }
  reshape(dims) {
    this.ensureValid();
    if (this.downloader || this.disposer) {
      throw new Error("Cannot reshape a tensor that owns GPU resource.");
    }
    return tensorReshape(this, dims);
  }
};

// node_modules/onnxruntime-common/dist/esm/tensor.js
var Tensor2 = Tensor;

// node_modules/@huggingface/transformers/dist/transformers.web.min.js
var G1 = Object.defineProperty;
var qr = (t6, e) => {
  for (var s in e) G1(t6, s, { get: e[s], enumerable: true });
};
var qe = {};
var tt2 = {};
var S0 = {};
var W1 = "4.3.1";
var gp = typeof self < "u";
var qs2 = !P0(qe);
var T0 = !P0(tt2);
var ki = gp && "caches" in self;
var V1 = typeof globalThis.Deno < "u";
var gO = typeof globalThis.Bun < "u";
var Ei = V1 && ki && !qs2;
var z0 = typeof process < "u";
var C0 = z0 && process?.release?.name === "node" && !Ei;
var xp = typeof window < "u" && typeof window.document < "u";
var wp = gp && ["DedicatedWorkerGlobalScope", "ServiceWorkerGlobalScope", "SharedWorkerGlobalScope"].includes(self.constructor?.name);
var H1 = xp || wp || Ei;
var K1 = C0 || typeof navigator < "u" && "gpu" in navigator;
var X1 = typeof navigator < "u" && "ml" in navigator;
var Q1 = typeof crypto < "u" && typeof crypto.getRandomValues == "function";
var Y1 = typeof chrome < "u" && typeof chrome.runtime < "u" && typeof chrome.runtime.id == "string";
var J1 = typeof ServiceWorkerGlobalScope < "u" && gp && self instanceof ServiceWorkerGlobalScope;
var Z1 = () => {
  if (typeof navigator > "u") return false;
  let t6 = navigator.userAgent;
  if (!((navigator.vendor || "").indexOf("Apple") > -1 && !t6.match(/CriOS|FxiOS|EdgiOS|OPiOS|mercury|brave/i) && !t6.includes("Chrome") && !t6.includes("Android"))) return false;
  let s = t6.match(/Version\/(\d+)/);
  return s ? parseInt(s[1], 10) < 26 : false;
};
var ev = Z1();
var H = Object.freeze({ IS_BROWSER_ENV: xp, IS_WEBWORKER_ENV: wp, IS_WEB_ENV: H1, IS_SERVICE_WORKER_ENV: J1, IS_DENO_WEB_RUNTIME: Ei, IS_WEB_CACHE_AVAILABLE: ki, IS_WEBGPU_AVAILABLE: K1, IS_WEBNN_AVAILABLE: X1, IS_SAFARI_BELOW_26: ev, IS_PROCESS_AVAILABLE: z0, IS_NODE_ENV: C0, IS_FS_AVAILABLE: qs2, IS_PATH_AVAILABLE: T0, IS_CRYPTO_AVAILABLE: Q1, IS_CHROME_AVAILABLE: Y1 });
var yp = qs2 && T0;
var vi = "./";
if (yp) {
  let t6 = import.meta.url;
  t6 ? vi = tt2.dirname(tt2.dirname(S0.fileURLToPath(t6))) : typeof __dirname < "u" && (vi = tt2.dirname(__dirname));
}
var tv = yp ? tt2.join(vi, "/.cache/") : null;
var O0 = "/models/";
var sv = yp ? tt2.join(vi, O0) : O0;
var rv = typeof globalThis.fetch == "function" ? globalThis.fetch.bind(globalThis) : void 0;
var Xe = Object.freeze({ DEBUG: 10, INFO: 20, WARNING: 30, ERROR: 40, NONE: 50 });
var I0 = Xe.WARNING;
var J = { version: W1, backends: { onnx: {} }, get logLevel() {
  return I0;
}, set logLevel(t6) {
  I0 = t6, J.backends.onnx?.setLogLevel?.(t6);
}, allowRemoteModels: true, remoteHost: "https://huggingface.co/", remotePathTemplate: "{model}/resolve/{revision}/", allowLocalModels: !(xp || wp || Ei), localModelPath: sv, useFS: qs2, useBrowserCache: ki, useFSCache: qs2, cacheDir: tv, useCustomCache: false, customCache: null, useWasmCache: ki || qs2, cacheKey: "transformers-cache", experimental_useCrossOriginStorage: false, fetch: rv };
function P0(t6) {
  return Object.keys(t6).length === 0;
}
var xe = class {
  constructor() {
    let t6 = function(...e) {
      return t6._call(...e);
    };
    return Object.setPrototypeOf(t6, new.target.prototype);
  }
  _call(...t6) {
    throw Error("Must implement _call method in subclass");
  }
};
function xt(t6, e) {
  t6 && t6(e);
}
var At2 = class extends xe {
  constructor(e, s) {
    super(), this.callback = e, this.files_loading = s, this.loads = /* @__PURE__ */ new Map();
  }
  _call(e) {
    if (e.status === "progress") {
      this.files_loading[e.file] = { loaded: e.loaded, total: e.total };
      let s = Object.values(this.files_loading).reduce((o, a) => o + a.loaded, 0), r = Object.values(this.files_loading).reduce((o, a) => o + a.total, 0), n = r > 0 ? s / r * 100 : 0;
      this.callback({ status: "progress_total", name: e.name, progress: n, loaded: s, total: r, files: structuredClone(this.files_loading) });
    }
    this.callback(e);
  }
};
function N0(t6) {
  return Number.isInteger(t6) || typeof t6 == "bigint";
}
function bp(t6) {
  return t6 == null || t6 === -1;
}
function kp(t6) {
  let e = [], s = t6;
  for (; Array.isArray(s); ) e.push(s.length), s = s[0];
  return e;
}
function Ue(...t6) {
  return Array.prototype.concat.apply([], t6);
}
function L0(...t6) {
  return t6.reduce((e, s) => e.flatMap((r) => s.map((n) => [r, n])));
}
function Us2(t6, e) {
  return Math.abs((t6 + e) % (2 * e) - e);
}
function ye2(t6, e) {
  return Object.assign({}, ...e.map((s) => {
    if (t6[s] !== void 0) return { [s]: t6[s] };
  }));
}
function $0(t6, e) {
  let s = 0;
  for (let r of t6) r === e && ++s;
  return s;
}
var R = { error(...t6) {
  J.logLevel <= Xe.ERROR && console.error(...t6);
}, warn(...t6) {
  J.logLevel <= Xe.WARNING && console.warn(...t6);
}, info(...t6) {
  J.logLevel <= Xe.INFO && console.log(...t6);
}, debug(...t6) {
  J.logLevel <= Xe.DEBUG && console.log(...t6);
}, log(...t6) {
  this.info(...t6);
} };
var nv = class {
  constructor(t6) {
    this.trie = this._build_trie(t6);
  }
  _build_trie(t6) {
    let e = /* @__PURE__ */ Object.create(null);
    for (let s of t6) {
      let r = e;
      for (let n = 0; n < s.length; ++n) {
        let o = s[n];
        r = r[o] ??= /* @__PURE__ */ Object.create(null);
      }
      r.end = s;
    }
    return e;
  }
  split(t6) {
    let e = [], s = t6.length, r = 0, n = 0;
    for (; n < s; ) {
      let o = this.trie, a = null, i = n;
      for (; i < s && (o = o[t6[i]]); ) o.end && (a = o.end), ++i;
      a ? (n > r && e.push(t6.slice(r, n)), e.push(a), n += a.length, r = n) : ++n;
    }
    return r < s && e.push(t6.slice(r)), e;
  }
};
var R0 = nv;
var ov = class {
  constructor(t6) {
    this.content = t6.content, this.id = t6.id, this.single_word = t6.single_word ?? false, this.lstrip = t6.lstrip ?? false, this.rstrip = t6.rstrip ?? false, this.special = t6.special ?? false, this.normalized = t6.normalized ?? !this.special;
  }
};
var av = ov;
var H0 = (t6, e) => {
  try {
    return new RegExp(t6, e);
  } catch (s) {
    if (!(s instanceof SyntaxError)) throw s;
    let r = /* @__PURE__ */ new Map(), n = t6.replace(/(\\[pP])\{([^}=]+)\}/g, (o, a, i, l) => {
      let c = 0;
      for (let u = l - 1; u >= 0 && t6[u] === "\\"; --u) ++c;
      if (c % 2 === 1) return o;
      let p = r.get(i);
      if (p === void 0) {
        try {
          new RegExp(`\\p{${i}}`, "u"), p = i;
        } catch {
          p = `Script=${i}`;
        }
        r.set(i, p);
      }
      return `${a}{${p}}`;
    });
    if (n === t6) throw s;
    try {
      return new RegExp(n, e);
    } catch {
      throw s;
    }
  }
};
var Ep = (t6) => t6.replace(/ \./g, ".").replace(/ \?/g, "?").replace(/ \!/g, "!").replace(/ ,/g, ",").replace(/ \' /g, "'").replace(/ n't/g, "n't").replace(/ 'm/g, "'m").replace(/ 's/g, "'s").replace(/ 've/g, "'ve").replace(/ 're/g, "'re");
var Oi = (t6, e = true) => {
  if (t6.Regex !== void 0) {
    let s = vv(yv(t6.Regex));
    return H0(s, "gu");
  } else if (t6.String !== void 0) {
    let s = Ev(t6.String);
    return new RegExp(e ? s : `(${s})`, "gu");
  } else return console.warn("Unknown pattern type:", t6), null;
};
var js2 = "\\p{Alphabetic}\\p{M}\\p{Nd}\\p{Pc}";
var K0 = `${js2}\\u00B2\\u00B3\\u00B9\\u00BC-\\u00BE`;
var wt = `[${K0}]`;
var X0 = `[^${K0}]`;
var iv = `(?:(?<!${wt})(?=${wt})|(?<=${wt})(?!${wt}))`;
var lv = `(?:(?<!${wt})(?!${wt})|(?<=${wt})(?=${wt}))`;
var cv = "(?:(?<![\\s\\S])|(?<=\\n))";
var pv = "(?:(?=\\n)|(?![\\s\\S]))";
var Ur = "0-9A-Fa-f";
var uv = /* @__PURE__ */ new Map([["A", "(?<![\\s\\S])"], ["z", "(?![\\s\\S])"], ["Z", "(?=\\n?(?![\\s\\S]))"], ["h", `[${Ur}]`], ["H", `[^${Ur}]`], ["w", wt], ["W", X0], ["d", "\\p{Nd}"], ["D", "\\P{Nd}"], ["s", "\\p{White_Space}"], ["S", "\\P{White_Space}"], ["b", iv], ["B", lv], ["a", "\\x07"], ["e", "\\x1B"]]);
var _v = /* @__PURE__ */ new Map([["h", Ur], ["w", js2], ["d", "\\p{Nd}"], ["D", "\\P{Nd}"], ["s", "\\p{White_Space}"], ["S", "\\P{White_Space}"], ["a", "\\x07"], ["e", "\\x1B"]]);
var dv = /* @__PURE__ */ new Map([["W", `[^${js2}]`], ["H", `[^${Ur}]`]]);
var Q0 = /* @__PURE__ */ new Map([[`
`, "\\n"], ["\r", "\\r"], ["	", "\\t"], ["\f", "\\f"], ["\v", "\\v"]]);
var fv = /* @__PURE__ */ new Map([["alpha", "\\p{Alphabetic}"], ["alnum", "\\p{Alphabetic}\\p{Nd}"], ["digit", "\\p{Nd}"], ["lower", "\\p{Lowercase}"], ["upper", "\\p{Uppercase}"], ["space", "\\p{White_Space}"], ["blank", "\\t\\p{Zs}"], ["punct", "\\p{P}\\p{S}"], ["cntrl", "\\p{Cc}"], ["word", js2], ["xdigit", Ur]]);
var Y0 = "^$\\.*+?()[]{}|/";
var mv = /^\(\?(?:<[=!]|<[A-Za-z_][A-Za-z0-9_]*>|[:=!>])/;
var J0 = /^\\([pPxu])\{([^}]*)\}/;
var hv = /^\{(\d+(?:,\d*)?|,\d+)\}/;
var gv = /^\[:(\^?)(\p{Alphabetic}+):\]/u;
var xv = /^\[:\^:\]/;
var wv = /^\[(?:\.[^\]]*\.\]|=[^\]]*=\])/;
var Z0 = /^(?:\\x[0-9A-Fa-f]{2}|\\u[0-9A-Fa-f]{4}|\\c[A-Za-z])/;
var eb = (t6) => t6 >= "A" && t6 <= "Z" || t6 >= "a" && t6 <= "z";
var Ai = (t6, e) => String.fromCodePoint(t6.codePointAt(e));
var F0 = (t6) => {
  if (!/^[0-9A-Fa-f]{1,8}$/.test(t6)) return null;
  let e = Number.parseInt(t6, 16);
  if (e > 127) return null;
  let s = String.fromCharCode(e);
  return eb(s) ? `[${s.toLowerCase()}${s.toUpperCase()}]` : null;
};
var yv = (t6) => t6.replace(/\[\^\(\\s\|\[([^\]]+)\]\)\]/g, "[^()|\\s$1]");
var tb = "[\\s\\S]";
var D0 = 256;
var B0 = () => ({ fragment: "", alternatives: [], tail: null, contains_complex_set: false });
var Ap = (t6) => {
  throw new SyntaxError(`Unsupported range with a set-valued character-class operand at index ${t6}`);
};
var Mi = (t6, e, s, r = true) => {
  t6.tail === "range" && Ap(s), t6.alternatives.push(e), t6.tail = "set", t6.contains_complex_set = t6.contains_complex_set || r;
};
var Nt = (t6, e, s = false, r = -1) => {
  if (s && t6.tail === "range" && Ap(r), t6.tail === "range") {
    t6.fragment += e, t6.tail = "complete_range";
    return;
  }
  t6.fragment += e, t6.tail = s ? "set" : "scalar", t6.contains_complex_set = t6.contains_complex_set || s;
};
var bv = (t6, e, s) => {
  let r = J0.exec(t6.slice(e));
  if (r) {
    let [_, d, f] = r;
    if (d === "P" && f === "Word") Mi(s, `[^${js2}]`, e);
    else {
      let m = d === "x" ? `\\u{${f}}` : d === "p" && f === "Word" ? js2 : _;
      Nt(s, m, d === "p" || d === "P", e);
    }
    return e + _.length;
  }
  let n = Z0.exec(t6.slice(e));
  if (n) return Nt(s, n[0]), e + n[0].length;
  if (e + 1 >= t6.length) throw new SyntaxError(`Unterminated escape in character class at index ${e}`);
  let o = Ai(t6, e + 1), a = e + 1 + o.length, i = Q0.get(o);
  if (i !== void 0) return Nt(s, i), a;
  let l = dv.get(o);
  if (l !== void 0) return Mi(s, l, e), a;
  let c = _v.get(o), p, u = false;
  return c !== void 0 ? (p = c, u = o !== "a" && o !== "e") : /[A-Za-z0-9]/.test(o) ? p = `\\${o}` : Y0.includes(o) || o === "-" ? p = `\\${o}` : p = o, Nt(s, p, u, e), a;
};
var sb = (t6) => t6.length === 1 ? t6[0] : `(?:(?=(?:${t6.join("|")}))${tb})`;
var q0 = (t6) => {
  let e = t6.fragment.length === 0 ? t6.alternatives : [`[${t6.fragment}]`, ...t6.alternatives];
  return sb(e);
};
var kv = (t6) => {
  let e = H0(`^(?:${t6})$`, "u"), s = "";
  for (let r = 0; r < 26; ++r) {
    let n = String.fromCharCode(65 + r), o = String.fromCharCode(97 + r), a = e.test(n), i = e.test(o);
    a !== i && (s += a ? o : n);
  }
  return s;
};
var rb = (t6, e, s, r = true, n = 1) => {
  if (n > D0) throw new SyntaxError(`Maximum character-class nesting depth of ${D0} exceeded at index ${e}`);
  let o = e + 1, a = t6[o] === "^";
  a && ++o;
  let i = o, l = [B0()], c = l[0], p = false;
  for (; o < t6.length; ) {
    let u = Ai(t6, o);
    if (u === "\\") {
      o = bv(t6, o, c);
      continue;
    }
    if (u === "]") {
      if (o === i) {
        Nt(c, "\\]"), ++o;
        continue;
      }
      if (c.tail === null) throw l.length > 1 ? new SyntaxError(`Malformed character-class intersection with an empty operand at index ${o}`) : new SyntaxError(`Empty character class at index ${e}`);
      let _ = l.some((x) => x.contains_complex_set);
      if (a && l.length > 1 && p) throw new SyntaxError(`Unsupported outer-negated character-class intersection with a nested negated class containing a Unicode property, POSIX class, or shorthand at index ${e}`);
      let d = q0(l[0]), f = d;
      if (l.length > 1) {
        let x = "";
        for (let y = 1; y < l.length; ++y) x += `(?=${q0(l[y])})`;
        f = `(?:${x}${d})`;
      }
      let m = l.length === 1 && c.alternatives.length === 0, g = c.fragment;
      if (s && r) {
        let x = kv(f);
        x.length > 0 && (m ? (g += x, f = `[${g}]`) : f = sb([f, `[${x}]`]));
      }
      return { atom: a ? m ? `[^${g}]` : `(?:(?!${f})${tb})` : f, end: o + 1, negated: a, contains_complex_set: _, contains_nested_negated_complex_set: p };
    }
    if (t6.startsWith("&&", o)) {
      if (c.tail === null) throw new SyntaxError(`Malformed character-class intersection with an empty operand at index ${o}`);
      c = B0(), l.push(c), o += 2;
      continue;
    }
    if (u === "[") {
      let _ = t6.slice(o);
      if (xv.test(_)) throw new SyntaxError(`Malformed empty negated POSIX character class at index ${o}`);
      let d = gv.exec(_);
      if (d) {
        let [, m, g] = d, w = fv.get(g);
        if (w === void 0) throw new SyntaxError(`Unsupported POSIX character class "${g}" at index ${o}`);
        if (s && m && (g === "lower" || g === "upper")) throw new SyntaxError(`Unsupported negated POSIX ${g} class inside an inline case-insensitive group`);
        m ? Mi(c, `[^${w}]`, o) : Nt(c, w, true, o), o += d[0].length;
        continue;
      }
      if (wv.test(_)) throw new SyntaxError(`Unsupported POSIX collating or equivalence bracket expression at index ${o}`);
      let f = rb(t6, o, s, false, n + 1);
      Mi(c, f.atom, o, f.contains_complex_set), p ||= f.contains_nested_negated_complex_set || f.negated && f.contains_complex_set, o = f.end;
      continue;
    }
    if (u === "-") {
      let _ = t6[o + 1] === "]" || t6.startsWith("&&", o + 1);
      c.tail === "set" && !_ && Ap(o), c.tail === null || c.tail === "range" || c.tail === "complete_range" || _ ? Nt(c, "\\-") : (c.fragment += "-", c.tail = "range"), ++o;
      continue;
    }
    Nt(c, u === "^" && c.fragment.length === 0 ? "\\^" : u), o += u.length;
  }
  throw new SyntaxError(`${l.length > 1 ? "Unterminated character-class intersection" : "Unterminated character class"} at index ${e}`);
};
var vv = (t6) => {
  let e = "", s = -1, r = false, n = false, o = [], a = (i) => {
    s = e.length, e += i, r = false;
  };
  for (let i = 0; i < t6.length; ) {
    let l = Ai(t6, i);
    if (l === "\\") {
      let c = J0.exec(t6.slice(i));
      if (c) {
        let [m, g, w] = c, x = m;
        if (g === "x") {
          let y = `\\u{${w}}`;
          x = n ? F0(w) ?? y : y;
        } else w === "Word" && (x = g === "p" ? wt : X0);
        a(x), i += m.length;
        continue;
      }
      let p = Z0.exec(t6.slice(i));
      if (p) {
        let m = p[0], g = n && m[1] !== "c" ? F0(m.slice(2)) ?? m : m;
        a(g), i += m.length;
        continue;
      }
      if (i + 1 >= t6.length) {
        e += l;
        break;
      }
      let u = Ai(t6, i + 1);
      if (i += 1 + u.length, u === "G") continue;
      let _ = Q0.get(u);
      if (_ !== void 0) {
        a(_);
        continue;
      }
      let d = uv.get(u), f;
      d !== void 0 ? f = d : /[A-Za-z0-9]/.test(u) ? f = `\\${u}` : Y0.includes(u) ? f = `\\${u}` : f = u, a(f);
      continue;
    }
    switch (l) {
      case "[": {
        let c = rb(t6, i, n);
        a(c.atom), i = c.end;
        continue;
      }
      case "]":
        a("\\]"), ++i;
        continue;
      case ".":
        a("[^\\n]"), ++i;
        continue;
      case "^":
        a(cv), ++i;
        continue;
      case "$":
        a(pv), ++i;
        continue;
      case "(": {
        let c = t6.startsWith("(?i:", i), p = c ? "(?i:" : mv.exec(t6.slice(i))?.[0] ?? "(", u = c || p === "(?>" ? "(?:" : p;
        o.push([e.length, n]), c && (n = true), e += u, r = false, i += p.length;
        continue;
      }
      case ")":
        e += l, [s, n] = o.pop() ?? [-1, false], r = false, ++i;
        continue;
      case "|":
        e += l, s = -1, r = false, ++i;
        continue;
      case "{": {
        let c = hv.exec(t6.slice(i));
        if (!c || s < 0) {
          a("\\{"), ++i;
          continue;
        }
        let p = c[1].startsWith(",") ? `0${c[1]}` : c[1];
        i += c[0].length;
        let u = t6[i];
        u === "+" || u === "*" ? (e = `${e.slice(0, s)}(?:${e.slice(s)}{${p}})${u}`, ++i) : e += `{${p}}`, r = true;
        continue;
      }
      case "}":
        a("\\}"), ++i;
        continue;
      case "+":
        if (r) {
          ++i;
          continue;
        }
        e += l, r = true, ++i;
        continue;
      case "*":
      case "?":
        e += l, r = true, ++i;
        continue;
      default:
        a(n && eb(l) ? `[${l.toLowerCase()}${l.toUpperCase()}]` : l), i += l.length;
        continue;
    }
  }
  return e;
};
var Ev = (t6) => t6.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
var Av = (t6, e, s) => {
  let r = [], n = 0;
  for (; n < t6.length; ) {
    if (r.push(t6[n]), (e.get(t6[n]) ?? s) !== s) {
      ++n;
      continue;
    }
    for (; ++n < t6.length && (e.get(t6[n]) ?? s) === s; ) e.get(r.at(-1)) !== s && (r[r.length - 1] += t6[n]);
  }
  return r;
};
var Mv = (t6) => t6 >= 19968 && t6 <= 40959 || t6 >= 13312 && t6 <= 19903 || t6 >= 131072 && t6 <= 173791 || t6 >= 173824 && t6 <= 177983 || t6 >= 177984 && t6 <= 178207 || t6 >= 178208 && t6 <= 183983 || t6 >= 63744 && t6 <= 64255 || t6 >= 194560 && t6 <= 195103;
var Sv = (t6) => Number.isInteger(t6) || typeof t6 == "bigint";
var Ov = (t6) => {
  let e = 0;
  for (let s of t6) ++e;
  return e;
};
var Iv = (t6) => nb(t6.toLowerCase());
var lt = (...t6) => Array.prototype.concat.apply([], t6);
var Mp = (t6) => new Map(Object.entries(t6));
var Tv = (t6, e) => {
  let s = [], r = 0;
  for (let n of t6.matchAll(e)) {
    let o = n[0];
    r < n.index && s.push(t6.slice(r, n.index)), o.length > 0 && s.push(o), r = n.index + o.length;
  }
  return r < t6.length && s.push(t6.slice(r)), s;
};
var nb = (t6) => t6.replace(/\p{M}/gu, "");
var U0 = (t6, e, s = []) => {
  if (!t6 || Array.isArray(t6) || typeof t6 != "object") return `${e} must be a valid object`;
  for (let r of s) if (!(r in t6)) return `${e} must contain a "${r}" property`;
  return null;
};
var zv = (t6) => t6.match(/\S+/g) || [];
var Cv = class {
  constructor() {
    let t6 = function(...e) {
      return t6._call(...e);
    };
    return Object.setPrototypeOf(t6, new.target.prototype);
  }
};
var jr = Cv;
var Pv = class extends jr {
  constructor(t6) {
    super(), this.config = t6;
  }
  _call(t6) {
    return this.normalize(t6);
  }
};
var Mt2 = Pv;
var Nv = class extends Mt2 {
  tokenize_chinese_chars(t6) {
    let e = [];
    for (let s = 0; s < t6.length; ++s) {
      let r = t6[s], n = r.charCodeAt(0);
      Mv(n) ? (e.push(" "), e.push(r), e.push(" ")) : e.push(r);
    }
    return e.join("");
  }
  strip_accents(t6) {
    return t6.normalize("NFD").replace(/\p{Mn}/gu, "");
  }
  is_control(t6) {
    switch (t6) {
      case "	":
      case `
`:
      case "\r":
        return false;
      default:
        return /^\p{Cc}|\p{Cf}|\p{Co}|\p{Cs}$/u.test(t6);
    }
  }
  clean_text(t6) {
    let e = [];
    for (let s of t6) {
      let r = s.charCodeAt(0);
      r === 0 || r === 65533 || this.is_control(s) || (/^\s$/.test(s) ? e.push(" ") : e.push(s));
    }
    return e.join("");
  }
  normalize(t6) {
    return this.config.clean_text && (t6 = this.clean_text(t6)), this.config.handle_chinese_chars && (t6 = this.tokenize_chinese_chars(t6)), this.config.lowercase ? (t6 = t6.toLowerCase(), this.config.strip_accents !== false && (t6 = this.strip_accents(t6))) : this.config.strip_accents && (t6 = this.strip_accents(t6)), t6;
  }
};
var Lv = Nv;
var $v = class extends Mt2 {
  constructor(t6) {
    super(t6), this.charsmap = t6.precompiled_charsmap ?? null;
  }
  normalize(t6) {
    return t6 = t6.replace(/[\u0001-\u0008\u000B\u000E-\u001F\u007F\u008F\u009F]/gm, ""), t6 = t6.replace(/[\u0009\u000A\u000C\u000D\u00A0\u1680\u2000-\u200F\u2028\u2029\u202F\u205F\u2581\u3000\uFEFF\uFFFD]/gm, " "), t6.includes("\uFF5E") ? t6 = t6.split("\uFF5E").map((s) => s.normalize("NFKC")).join("\uFF5E") : t6 = t6.normalize("NFKC"), t6;
  }
};
var Rv = $v;
var Fv = class extends Mt2 {
  constructor(t6) {
    super(t6), this.normalizers = (t6.normalizers ?? []).map((e) => ob(e));
  }
  normalize(t6) {
    return this.normalizers.reduce((e, s) => s ? s.normalize(e) : e, t6);
  }
};
var Dv = Fv;
var Bv = class extends Mt2 {
  constructor(t6) {
    super(t6), this.pattern = Oi(this.config.pattern ?? {});
  }
  normalize(t6) {
    return this.pattern === null ? t6 : t6.replaceAll(this.pattern, this.config.content ?? "");
  }
};
var qv = Bv;
var Uv = class extends Mt2 {
  constructor() {
    super(...arguments), this.form = "NFC";
  }
  normalize(t6) {
    return t6 = t6.normalize(this.form), t6;
  }
};
var Ii = Uv;
var jv = class extends Ii {
  constructor() {
    super(...arguments), this.form = "NFC";
  }
};
var Gv = jv;
var Wv = class extends Ii {
  constructor() {
    super(...arguments), this.form = "NFD";
  }
};
var Vv = Wv;
var Hv = class extends Ii {
  constructor() {
    super(...arguments), this.form = "NFKC";
  }
};
var Kv = Hv;
var Xv = class extends Ii {
  constructor() {
    super(...arguments), this.form = "NFKD";
  }
};
var Qv = Xv;
var Yv = class extends Mt2 {
  normalize(t6) {
    return this.config.strip_left && this.config.strip_right ? t6 = t6.trim() : (this.config.strip_left && (t6 = t6.trimStart()), this.config.strip_right && (t6 = t6.trimEnd())), t6;
  }
};
var Jv = Yv;
var Zv = class extends Mt2 {
  normalize(t6) {
    return nb(t6);
  }
};
var eE = Zv;
var tE = class extends Mt2 {
  normalize(t6) {
    return t6.toLowerCase();
  }
};
var sE = tE;
var rE = class extends Mt2 {
  normalize(t6) {
    return t6 = this.config.prepend + t6, t6;
  }
};
var nE = rE;
function oE(t6) {
  if (t6 === null) return null;
  switch (t6.type) {
    case "BertNormalizer":
      return new Lv(t6);
    case "Precompiled":
      return new Rv(t6);
    case "Sequence":
      return new Dv(t6);
    case "Replace":
      return new qv(t6);
    case "NFC":
      return new Gv(t6);
    case "NFD":
      return new Vv(t6);
    case "NFKC":
      return new Kv(t6);
    case "NFKD":
      return new Qv(t6);
    case "Strip":
      return new Jv(t6);
    case "StripAccents":
      return new eE(t6);
    case "Lowercase":
      return new sE(t6);
    case "Prepend":
      return new nE(t6);
    default:
      throw new Error(`Unknown Normalizer type: ${t6.type}`);
  }
}
var ob = oE;
var aE = class extends jr {
  pre_tokenize(t6, e) {
    return (Array.isArray(t6) ? t6.map((s) => this.pre_tokenize_text(s, e)) : this.pre_tokenize_text(t6, e)).flat();
  }
  _call(t6, e) {
    return this.pre_tokenize(t6, e);
  }
};
var ct2 = aE;
var ab = (() => {
  let t6 = [...Array.from({ length: 94 }, (n, o) => o + 33), ...Array.from({ length: 12 }, (n, o) => o + 161), ...Array.from({ length: 82 }, (n, o) => o + 174)], e = t6.slice(), s = 0;
  for (let n = 0; n < 256; ++n) t6.includes(n) || (t6.push(n), e.push(256 + s), s += 1);
  let r = e.map((n) => String.fromCharCode(n));
  return Object.fromEntries(t6.map((n, o) => [n, r[o]]));
})();
var iE = (t6) => Object.fromEntries(Object.entries(t6).map(([e, s]) => [s, e]));
var lE = iE(ab);
var Si = "\\p{P}\\u0021-\\u002F\\u003A-\\u0040\\u005B-\\u0060\\u007B-\\u007E";
var cE = class extends ct2 {
  constructor(t6) {
    super(), this.config = t6, this.add_prefix_space = this.config.add_prefix_space ?? false, this.trim_offsets = this.config.trim_offsets ?? false, this.use_regex = this.config.use_regex ?? true, this.pattern = /'s|'t|'re|'ve|'m|'ll|'d| ?\p{L}+| ?\p{N}+| ?[^\s\p{L}\p{N}]+|\s+(?!\S)|\s+/gu, this.byte_encoder = ab, this.text_encoder = new TextEncoder();
  }
  pre_tokenize_text(t6, e) {
    return this.add_prefix_space && !t6.startsWith(" ") && (t6 = " " + t6), (this.use_regex ? t6.match(this.pattern) || [] : [t6]).map((r) => Array.from(this.text_encoder.encode(r), (n) => this.byte_encoder[n]).join(""));
  }
};
var pE = cE;
var uE = class extends ct2 {
  pre_tokenize_text(t6, e) {
    return t6.match(/\w+|[^\w\s]+/g) || [];
  }
};
var _E = uE;
var dE = class extends ct2 {
  constructor(t6) {
    super(), this.replacement = t6.replacement ?? "\u2581", this.str_rep = t6.str_rep || this.replacement, this.prepend_scheme = t6.prepend_scheme ?? "always";
  }
  pre_tokenize_text(t6, e) {
    let { section_index: s = void 0 } = e ?? {}, r = t6.replaceAll(" ", this.str_rep);
    return !r.startsWith(this.replacement) && (this.prepend_scheme === "always" || this.prepend_scheme === "first" && s === 0) && (r = this.str_rep + r), [r];
  }
};
var fE = dE;
var mE = class extends ct2 {
  constructor(t6) {
    super(), this.config = t6, this.pattern = Oi(this.config.pattern ?? {}, this.config.invert ?? true);
  }
  pre_tokenize_text(t6) {
    return this.pattern === null ? [] : this.config.invert ? (t6.match(this.pattern) || []).filter((e) => e) : this.config.behavior?.toLowerCase() === "removed" ? t6.split(this.pattern).filter((e) => e) : Tv(t6, this.pattern);
  }
};
var hE = mE;
var gE = class extends ct2 {
  constructor(t6) {
    super(), this.config = t6, this.pattern = new RegExp(`[^${Si}]+|[${Si}]+`, "gu");
  }
  pre_tokenize_text(t6) {
    return t6.match(this.pattern) || [];
  }
};
var xE = gE;
var wE = class extends ct2 {
  constructor(t6) {
    super(), this.config = t6;
    let e = `[^\\d]+|\\d${this.config.individual_digits ? "" : "+"}`;
    this.pattern = new RegExp(e, "gu");
  }
  pre_tokenize_text(t6) {
    return t6.match(this.pattern) || [];
  }
};
var yE = wE;
var bE = class extends ct2 {
  constructor() {
    super(), this.pattern = new RegExp(`[^\\s${Si}]+|[${Si}]`, "gu");
  }
  pre_tokenize_text(t6, e) {
    return t6.trim().match(this.pattern) || [];
  }
};
var kE = bE;
var vE = class extends ct2 {
  constructor(t6) {
    super(), this.config = t6, this.pattern = Oi(this.config.pattern ?? {}), this.content = this.config.content ?? "";
  }
  pre_tokenize_text(t6) {
    return this.pattern === null ? [t6] : [t6.replaceAll(this.pattern, this.config.content ?? "")];
  }
};
var EE = vE;
var AE = class extends ct2 {
  constructor(t6) {
    super(), this.tokenizers = (t6.pretokenizers ?? []).map((e) => ib(e));
  }
  pre_tokenize_text(t6, e) {
    return this.tokenizers.reduce((s, r) => r ? r.pre_tokenize(s, e) : s, [t6]);
  }
};
var ME = AE;
var SE = class extends ct2 {
  pre_tokenize_text(t6) {
    return zv(t6);
  }
};
var OE = SE;
var IE = class extends ct2 {
  constructor(t6) {
    super(), this.config = t6, this._length = t6.length;
  }
  pre_tokenize_text(t6) {
    let e = [];
    for (let s = 0; s < t6.length; s += this._length) e.push(t6.slice(s, s + this._length));
    return e;
  }
};
var TE = IE;
function zE(t6) {
  if (t6 === null) return null;
  switch (t6.type) {
    case "BertPreTokenizer":
      return new kE();
    case "Sequence":
      return new ME(t6);
    case "Whitespace":
      return new _E();
    case "WhitespaceSplit":
      return new OE();
    case "Metaspace":
      return new fE(t6);
    case "ByteLevel":
      return new pE(t6);
    case "Split":
      return new hE(t6);
    case "Punctuation":
      return new xE(t6);
    case "Digits":
      return new yE(t6);
    case "Replace":
      return new EE(t6);
    case "FixedLength":
      return new TE(t6);
    default:
      throw new Error(`Unknown PreTokenizer type: ${t6.type}`);
  }
}
var ib = zE;
var CE = class extends jr {
  constructor(t6) {
    super(), this.config = t6, this.vocab = [], this.tokens_to_ids = /* @__PURE__ */ new Map(), this.unk_token_id = void 0, this.unk_token = void 0, this.end_of_word_suffix = void 0, this.fuse_unk = this.config.fuse_unk ?? false;
  }
  _call(t6) {
    let e = this.encode(t6);
    return this.fuse_unk && (e = Av(e, this.tokens_to_ids, this.unk_token_id)), e;
  }
};
var Ti = CE;
var PE = class extends Ti {
  constructor(t6) {
    super(t6), this.max_input_chars_per_word = 100, this.tokens_to_ids = Mp(t6.vocab), this.unk_token_id = this.tokens_to_ids.get(t6.unk_token), this.unk_token = t6.unk_token, this.max_input_chars_per_word = t6.max_input_chars_per_word ?? 100, this.vocab = new Array(this.tokens_to_ids.size);
    for (let [e, s] of this.tokens_to_ids) this.vocab[s] = e;
  }
  encode(t6) {
    let e = [];
    for (let s of t6) {
      let r = [...s];
      if (r.length > this.max_input_chars_per_word) {
        e.push(this.unk_token);
        continue;
      }
      let n = false, o = 0, a = [];
      for (; o < r.length; ) {
        let i = r.length, l = null;
        for (; o < i; ) {
          let c = r.slice(o, i).join("");
          if (o > 0 && (c = this.config.continuing_subword_prefix + c), this.tokens_to_ids.has(c)) {
            l = c;
            break;
          }
          --i;
        }
        if (l === null) {
          n = true;
          break;
        }
        a.push(l), o = i;
      }
      n ? e.push(this.unk_token) : e.push(...a);
    }
    return e;
  }
};
var j0 = PE;
var G0 = class lb {
  constructor(e, s) {
    this.is_leaf = e, this.children = s;
  }
  static default() {
    return new lb(false, /* @__PURE__ */ new Map());
  }
};
var NE = class {
  constructor() {
    this.root = G0.default();
  }
  extend(t6) {
    for (let e of t6) this.push(e);
  }
  push(t6) {
    let e = this.root;
    for (let s of t6) {
      let r = e.children.get(s);
      r === void 0 && (r = G0.default(), e.children.set(s, r)), e = r;
    }
    e.is_leaf = true;
  }
  *common_prefix_search(t6, e = 0) {
    let s = this.root;
    if (s === void 0) return;
    let r = "";
    for (let n = e; n < t6.length; ++n) {
      let o = t6[n];
      if (r += o, s = s.children.get(o), s === void 0) return;
      s.is_leaf && (yield r);
    }
  }
};
var LE = NE;
var vp = class cb {
  constructor(e, s, r, n, o) {
    this.token_id = e, this.node_id = s, this.pos = r, this.length = n, this.score = o, this.prev = null, this.backtrace_score = 0;
  }
  clone() {
    let e = new cb(this.token_id, this.node_id, this.pos, this.length, this.score);
    return e.prev = this.prev, e.backtrace_score = this.backtrace_score, e;
  }
};
var $E = class {
  constructor(t6, e, s) {
    this.chars = Array.from(t6), this.len = this.chars.length, this.bos_token_id = e, this.eos_token_id = s, this.nodes = [], this.begin_nodes = Array.from({ length: this.len + 1 }, () => []), this.end_nodes = Array.from({ length: this.len + 1 }, () => []);
    let r = new vp(this.bos_token_id ?? 0, 0, 0, 0, 0), n = new vp(this.eos_token_id ?? 0, 1, this.len, 0, 0);
    this.nodes.push(r.clone()), this.nodes.push(n.clone()), this.begin_nodes[this.len].push(n), this.end_nodes[0].push(r);
  }
  insert(t6, e, s, r) {
    let n = this.nodes.length, o = new vp(r, n, t6, e, s);
    this.begin_nodes[t6].push(o), this.end_nodes[t6 + e].push(o), this.nodes.push(o);
  }
  viterbi() {
    let t6 = this.len, e = 0;
    for (; e <= t6; ) {
      if (this.begin_nodes[e].length == 0) return [];
      for (let a of this.begin_nodes[e]) {
        a.prev = null;
        let i = 0, l = null;
        for (let c of this.end_nodes[e]) {
          let p = c.backtrace_score + a.score;
          (l === null || p > i) && (l = c.clone(), i = p);
        }
        if (l !== null) a.prev = l, a.backtrace_score = i;
        else return [];
      }
      ++e;
    }
    let s = [], n = this.begin_nodes[t6][0].prev;
    if (n === null) return [];
    let o = n.clone();
    for (; o.prev !== null; ) s.push(o.clone()), o = o.clone().prev.clone();
    return s.reverse(), s;
  }
  piece(t6) {
    return this.chars.slice(t6.pos, t6.pos + t6.length).join("");
  }
  tokens() {
    return this.viterbi().map((e) => this.piece(e));
  }
  token_ids() {
    return this.viterbi().map((e) => e.token_id);
  }
};
var RE = $E;
function FE(t6) {
  if (t6.length === 0) throw new Error("Array must not be empty");
  let e = t6[0], s = 0;
  for (let r = 1; r < t6.length; ++r) t6[r] < e && (e = t6[r], s = r);
  return [e, s];
}
var DE = class extends Ti {
  constructor(t6, e) {
    super(t6);
    let s = t6.vocab.length;
    this.vocab = new Array(s), this.scores = new Array(s);
    for (let r = 0; r < s; ++r) [this.vocab[r], this.scores[r]] = t6.vocab[r];
    this.unk_token_id = t6.unk_id, this.unk_token = this.vocab[t6.unk_id], this.tokens_to_ids = new Map(this.vocab.map((r, n) => [r, n])), this.bos_token = " ", this.bos_token_id = this.tokens_to_ids.get(this.bos_token), this.eos_token = e, this.eos_token_id = this.tokens_to_ids.get(this.eos_token), this.unk_token = this.vocab[this.unk_token_id], this.min_score = FE(this.scores)[0], this.unk_score = this.min_score - 10, this.scores[this.unk_token_id] = this.unk_score, this.trie = new LE(), this.trie.extend(this.vocab), this.fuse_unk = true;
  }
  populate_nodes(t6) {
    let e = t6.chars, s = 1, r = 0;
    for (; r < e.length; ) {
      let n = false, o = this.trie.common_prefix_search(e, r);
      for (let a of o) {
        let i = this.tokens_to_ids.get(a), l = this.scores[i], c = Ov(a);
        t6.insert(r, c, l, i), !n && c === s && (n = true);
      }
      n || t6.insert(r, s, this.unk_score, this.unk_token_id), r += s;
    }
  }
  tokenize(t6) {
    let e = new RE(t6, this.bos_token_id, this.eos_token_id);
    return this.populate_nodes(e), e.tokens();
  }
  encode(t6) {
    let e = [];
    for (let s of t6) {
      let r = this.tokenize(s);
      e.push(...r);
    }
    return e;
  }
};
var W0 = DE;
var BE = class {
  constructor(t6 = (s, r) => s > r, e = 1 / 0) {
    this._heap = [], this._comparator = t6, this._max_size = e;
  }
  get size() {
    return this._heap.length;
  }
  is_empty() {
    return this.size === 0;
  }
  peek() {
    return this._heap[0];
  }
  push(...t6) {
    return this.extend(t6);
  }
  extend(t6) {
    for (let e of t6) if (this.size < this._max_size) this._heap.push(e), this._sift_up();
    else {
      let s = this._smallest();
      this._comparator(e, this._heap[s]) && (this._heap[s] = e, this._sift_up_from(s));
    }
    return this.size;
  }
  pop() {
    let t6 = this.peek(), e = this.size - 1;
    return e > 0 && this._swap(0, e), this._heap.pop(), this._sift_down(), t6;
  }
  replace(t6) {
    let e = this.peek();
    return this._heap[0] = t6, this._sift_down(), e;
  }
  _parent(t6) {
    return (t6 + 1 >>> 1) - 1;
  }
  _left(t6) {
    return (t6 << 1) + 1;
  }
  _right(t6) {
    return t6 + 1 << 1;
  }
  _greater(t6, e) {
    return this._comparator(this._heap[t6], this._heap[e]);
  }
  _swap(t6, e) {
    let s = this._heap[t6];
    this._heap[t6] = this._heap[e], this._heap[e] = s;
  }
  _sift_up() {
    this._sift_up_from(this.size - 1);
  }
  _sift_up_from(t6) {
    for (; t6 > 0 && this._greater(t6, this._parent(t6)); ) this._swap(t6, this._parent(t6)), t6 = this._parent(t6);
  }
  _sift_down() {
    let t6 = 0;
    for (; this._left(t6) < this.size && this._greater(this._left(t6), t6) || this._right(t6) < this.size && this._greater(this._right(t6), t6); ) {
      let e = this._right(t6) < this.size && this._greater(this._right(t6), this._left(t6)) ? this._right(t6) : this._left(t6);
      this._swap(t6, e), t6 = e;
    }
  }
  _smallest() {
    return 2 ** Math.floor(Math.log2(this.size)) - 1;
  }
};
var qE = BE;
var UE = class {
  constructor(t6) {
    this.capacity = t6, this.cache = /* @__PURE__ */ new Map();
  }
  get(t6) {
    if (!this.cache.has(t6)) return;
    let e = this.cache.get(t6);
    return this.cache.delete(t6), this.cache.set(t6, e), e;
  }
  put(t6, e) {
    this.cache.has(t6) && this.cache.delete(t6), this.cache.set(t6, e), this.cache.size > this.capacity && this.cache.delete(this.cache.keys().next().value);
  }
  clear() {
    this.cache.clear();
  }
};
var jE = UE;
var GE = class extends Ti {
  constructor(t6) {
    super(t6), this.tokens_to_ids = Mp(t6.vocab), this.unk_token_id = this.tokens_to_ids.get(t6.unk_token), this.unk_token = t6.unk_token, this.vocab = new Array(this.tokens_to_ids.size);
    for (let [s, r] of this.tokens_to_ids) this.vocab[r] = s;
    let e = Array.isArray(t6.merges[0]);
    this.merges = e ? t6.merges : t6.merges.map((s) => s.split(" ", 2)), this.bpe_ranks = new Map(this.merges.map((s, r) => [JSON.stringify(s), r])), this.end_of_word_suffix = t6.end_of_word_suffix, this.continuing_subword_suffix = t6.continuing_subword_suffix ?? null, this.byte_fallback = this.config.byte_fallback ?? false, this.byte_fallback && (this.text_encoder = new TextEncoder()), this.ignore_merges = this.config.ignore_merges ?? false, this.max_length_to_cache = 256, this.cache_capacity = 1e4, this.cache = new jE(this.cache_capacity);
  }
  clear_cache() {
    this.cache.clear();
  }
  bpe(t6) {
    if (t6.length === 0) return [];
    let e = this.cache.get(t6);
    if (e !== void 0) return e;
    let s = Array.from(t6);
    this.end_of_word_suffix && (s[s.length - 1] += this.end_of_word_suffix);
    let r = [];
    if (s.length > 1) {
      let n = new qE((i, l) => i.score < l.score), o = { token: s[0], bias: 0, prev: null, next: null }, a = o;
      for (let i = 1; i < s.length; ++i) {
        let l = { bias: i / s.length, token: s[i], prev: a, next: null };
        a.next = l, this.add_node(n, a), a = l;
      }
      for (; !n.is_empty(); ) {
        let i = n.pop();
        if (i.deleted || !i.next || i.next.deleted) continue;
        if (i.deleted = true, i.next.deleted = true, i.prev) {
          let c = { ...i.prev };
          i.prev.deleted = true, i.prev = c, c.prev ? c.prev.next = c : o = c;
        }
        let l = { token: i.token + i.next.token, bias: i.bias, prev: i.prev, next: i.next.next };
        l.prev ? (l.prev.next = l, this.add_node(n, l.prev)) : o = l, l.next && (l.next.prev = l, this.add_node(n, l));
      }
      for (let i = o; i !== null; i = i.next) r.push(i.token);
    } else r = s;
    if (this.continuing_subword_suffix) for (let n = 0; n < r.length - 1; ++n) r[n] += this.continuing_subword_suffix;
    return t6.length < this.max_length_to_cache && this.cache.put(t6, r), r;
  }
  add_node(t6, e) {
    let s = this.bpe_ranks.get(JSON.stringify([e.token, e.next.token]));
    s !== void 0 && (e.score = s + e.bias, t6.push(e));
  }
  encode(t6) {
    let e = [];
    for (let s of t6) {
      if (this.ignore_merges && this.tokens_to_ids.has(s)) {
        e.push(s);
        continue;
      }
      let r = this.bpe(s);
      for (let n of r) if (this.tokens_to_ids.has(n)) e.push(n);
      else if (this.byte_fallback) {
        let o = Array.from(this.text_encoder.encode(n)).map((a) => `<0x${a.toString(16).toUpperCase().padStart(2, "0")}>`);
        o.every((a) => this.tokens_to_ids.has(a)) ? e.push(...o) : this.unk_token != null && e.push(this.unk_token);
      } else this.unk_token != null && e.push(this.unk_token);
    }
    return e;
  }
};
var V0 = GE;
var WE = class extends Ti {
  constructor(t6, e) {
    super(t6);
    let s = t6.vocab;
    this.tokens_to_ids = Mp(e.target_lang ? s[e.target_lang] : s), this.bos_token = e.bos_token, this.bos_token_id = this.tokens_to_ids.get(this.bos_token), this.eos_token = e.eos_token, this.eos_token_id = this.tokens_to_ids.get(this.eos_token), this.pad_token = e.pad_token, this.pad_token_id = this.tokens_to_ids.get(this.pad_token), this.unk_token = e.unk_token, this.unk_token_id = this.tokens_to_ids.get(this.unk_token), this.vocab = new Array(this.tokens_to_ids.size);
    for (let [r, n] of this.tokens_to_ids) this.vocab[n] = r;
  }
  encode(t6) {
    return t6;
  }
};
var VE = WE;
function HE(t6, e) {
  switch (t6.type) {
    case "WordPiece":
      return new j0(t6);
    case "Unigram":
      return new W0(t6, e.eos_token);
    case "BPE":
      return new V0(t6);
    default:
      if (t6.vocab) return Array.isArray(t6.vocab) ? new W0(t6, e.eos_token) : Object.hasOwn(t6, "continuing_subword_prefix") && Object.hasOwn(t6, "unk_token") ? Object.hasOwn(t6, "merges") ? new V0(t6) : new j0(t6) : new VE(t6, { target_lang: e.target_lang, bos_token: e.bos_token, eos_token: e.eos_token, pad_token: e.pad_token, unk_token: e.unk_token });
      throw new Error(`Unknown TokenizerModel type: ${t6?.type}`);
  }
}
var KE = HE;
var XE = class extends jr {
  constructor(t6) {
    super(), this.config = t6;
  }
  _call(t6, ...e) {
    return this.post_process(t6, ...e);
  }
};
var Gr = XE;
var QE = class extends Gr {
  post_process(t6, e = null, s = true) {
    let r = e === null ? this.config.single : this.config.pair, n = [], o = [];
    for (let a of r) "SpecialToken" in a ? s && (n.push(a.SpecialToken.id), o.push(a.SpecialToken.type_id)) : "Sequence" in a && (a.Sequence.id === "A" ? (n = lt(n, t6), o = lt(o, new Array(t6.length).fill(a.Sequence.type_id))) : a.Sequence.id === "B" && (n = lt(n, e), o = lt(o, new Array(e.length).fill(a.Sequence.type_id))));
    return { tokens: n, token_type_ids: o };
  }
};
var YE = QE;
var JE = class extends Gr {
  post_process(t6, e = null) {
    return { tokens: t6, tokens_pair: e };
  }
};
var ZE = JE;
var eA = class extends Gr {
  constructor(t6) {
    super(t6), this.sep = t6.sep, this.cls = t6.cls;
  }
  post_process(t6, e = null, s = true) {
    s && (t6 = lt([this.cls[0]], t6, [this.sep[0]]));
    let r = new Array(t6.length).fill(0);
    if (e) {
      let n = [], o = s ? [this.sep[0]] : [];
      t6 = lt(t6, n, e, o), r = lt(r, new Array(e.length + n.length + o.length).fill(1));
    }
    return { tokens: t6, token_type_ids: r };
  }
};
var tA = eA;
var sA = class extends Gr {
  constructor(t6) {
    super(t6), this.sep = t6.sep, this.cls = t6.cls;
  }
  post_process(t6, e, s = true) {
    s && (t6 = lt([this.cls[0]], t6, [this.sep[0]]));
    let r = new Array(t6.length).fill(0);
    if (e) {
      let n = s ? [this.sep[0]] : [], o = s ? [this.sep[0]] : [];
      t6 = lt(t6, n, e, o), r = lt(r, new Array(e.length + n.length + o.length).fill(1));
    }
    return { tokens: t6, token_type_ids: r };
  }
};
var rA = sA;
var nA = class extends Gr {
  constructor(t6) {
    super(t6), this.processors = (t6.processors ?? []).map((e) => pb(e));
  }
  post_process(t6, e = null, s = true) {
    let r = { tokens: t6, tokens_pair: e };
    for (let n of this.processors) r = n.post_process(r.tokens, r.tokens_pair, s);
    return r;
  }
};
var oA = nA;
function aA(t6) {
  if (t6 === null) return null;
  switch (t6.type) {
    case "TemplateProcessing":
      return new YE(t6);
    case "ByteLevel":
      return new ZE(t6);
    case "BertProcessing":
      return new tA(t6);
    case "RobertaProcessing":
      return new rA(t6);
    case "Sequence":
      return new oA(t6);
    default:
      throw new Error(`Unknown PostProcessor type: ${t6.type}`);
  }
}
var pb = aA;
var iA = class extends jr {
  constructor(t6) {
    super(), this.config = t6, this.added_tokens = [], this.end_of_word_suffix = null, this.trim_offsets = "trim_offsets" in t6 ? t6.trim_offsets : false;
  }
  _call(t6) {
    return this.decode(t6);
  }
  decode(t6) {
    return this.decode_chain(t6).join("");
  }
};
var st = iA;
var lA = class extends st {
  constructor(t6) {
    super(t6), this.byte_decoder = lE, this.text_decoder = new TextDecoder("utf-8", { fatal: false, ignoreBOM: true }), this.end_of_word_suffix = null;
  }
  convert_tokens_to_string(t6) {
    let e = t6.join(""), s = new Uint8Array([...e].map((r) => this.byte_decoder[r]));
    return this.text_decoder.decode(s);
  }
  decode_chain(t6) {
    let e = [], s = [];
    for (let r of t6) this.added_tokens.find((n) => n.content === r) !== void 0 ? (s.length > 0 && (e.push(this.convert_tokens_to_string(s)), s = []), e.push(r)) : s.push(r);
    return s.length > 0 && e.push(this.convert_tokens_to_string(s)), e;
  }
};
var cA = lA;
var pA = class extends st {
  constructor(t6) {
    super(t6), this.cleanup = t6.cleanup;
  }
  decode_chain(t6) {
    return t6.map((e, s) => {
      if (s !== 0) {
        let r = this.config.prefix;
        r && e.startsWith(r) ? e = e.replace(r, "") : e = " " + e;
      }
      return this.cleanup && (e = Ep(e)), e;
    });
  }
};
var uA = pA;
var _A = class extends st {
  constructor(t6) {
    super(t6), this.replacement = t6.replacement ?? "\u2581";
  }
  decode_chain(t6) {
    let e = [];
    for (let s = 0; s < t6.length; ++s) {
      let r = t6[s].replaceAll(this.replacement, " ");
      s == 0 && r.startsWith(" ") && (r = r.substring(1)), e.push(r);
    }
    return e;
  }
};
var dA = _A;
var fA = class extends st {
  constructor(t6) {
    super(t6), this.suffix = t6.suffix ?? "";
  }
  decode_chain(t6) {
    return t6.map((e, s) => e.replaceAll(this.suffix, s === t6.length - 1 ? "" : " "));
  }
};
var mA = fA;
var hA = class extends st {
  constructor(t6) {
    super(t6), this.pad_token = t6.pad_token ?? "", this.word_delimiter_token = t6.word_delimiter_token ?? "", this.cleanup = t6.cleanup;
  }
  convert_tokens_to_string(t6) {
    if (t6.length === 0) return "";
    let e = [t6[0]];
    for (let n = 1; n < t6.length; ++n) t6[n] !== e.at(-1) && e.push(t6[n]);
    let r = e.filter((n) => n !== this.pad_token).join("");
    return this.cleanup && (r = Ep(r).replaceAll(this.word_delimiter_token, " ").trim()), r;
  }
  decode_chain(t6) {
    return [this.convert_tokens_to_string(t6)];
  }
};
var gA = hA;
var xA = class extends st {
  constructor(t6) {
    super(t6), this.decoders = (t6.decoders ?? []).map((e) => ub(e));
  }
  decode_chain(t6) {
    return this.decoders.reduce((e, s) => s.decode_chain(e), t6);
  }
};
var wA = xA;
var yA = class extends st {
  constructor(t6) {
    super(t6), this.pattern = Oi(this.config.pattern);
  }
  decode_chain(t6) {
    let e = this.config.content ?? "", s = this.pattern;
    return s === null ? t6 : t6.map((r) => r.replaceAll(s, e));
  }
};
var bA = yA;
var kA = class extends st {
  decode_chain(t6) {
    return [t6.join("")];
  }
};
var vA = kA;
var EA = class extends st {
  constructor(t6) {
    super(t6), this.content = t6.content ?? "", this.start = t6.start ?? 0, this.stop = t6.stop ?? 0;
  }
  decode_chain(t6) {
    return t6.map((e) => {
      let s = 0;
      for (let n = 0; n < this.start && e[n] === this.content; ++n) {
        s = n + 1;
        continue;
      }
      let r = e.length;
      for (let n = 0; n < this.stop; ++n) {
        let o = e.length - n - 1;
        if (e[o] === this.content) {
          r = o;
          continue;
        } else break;
      }
      return e.slice(s, r);
    });
  }
};
var AA = EA;
var MA = class extends st {
  constructor(t6) {
    super(t6), this.text_decoder = new TextDecoder();
  }
  decode_chain(t6) {
    let e = [], s = [];
    for (let r of t6) {
      let n = null;
      if (r.length === 6 && r.startsWith("<0x") && r.endsWith(">")) {
        let o = parseInt(r.slice(3, 5), 16);
        isNaN(o) || (n = o);
      }
      if (n !== null) s.push(n);
      else {
        if (s.length > 0) {
          let o = this.text_decoder.decode(Uint8Array.from(s));
          e.push(o), s = [];
        }
        e.push(r);
      }
    }
    if (s.length > 0) {
      let r = this.text_decoder.decode(Uint8Array.from(s));
      e.push(r), s = [];
    }
    return e;
  }
};
var SA = MA;
function OA(t6) {
  if (t6 === null) return null;
  switch (t6.type) {
    case "ByteLevel":
      return new cA(t6);
    case "WordPiece":
      return new uA(t6);
    case "Metaspace":
      return new dA(t6);
    case "BPEDecoder":
      return new mA(t6);
    case "CTC":
      return new gA(t6);
    case "Sequence":
      return new wA(t6);
    case "Replace":
      return new bA(t6);
    case "Fuse":
      return new vA(t6);
    case "Strip":
      return new AA(t6);
    case "ByteFallback":
      return new SA(t6);
    default:
      throw new Error(`Unknown Decoder type: ${t6.type}`);
  }
}
var ub = OA;
var IA = class {
  constructor(t6, e) {
    let s = U0(t6, "Tokenizer", ["model", "decoder", "post_processor", "pre_tokenizer", "normalizer"]);
    if (s) throw new Error(s);
    let r = U0(e, "Config");
    if (r) throw new Error(r);
    this.tokenizer = t6, this.config = e, this.normalizer = ob(this.tokenizer.normalizer), this.pre_tokenizer = ib(this.tokenizer.pre_tokenizer), this.model = KE(this.tokenizer.model, this.config), this.post_processor = pb(this.tokenizer.post_processor), this.decoder = ub(this.tokenizer.decoder), this.special_tokens = [], this.all_special_ids = [], this.added_tokens = [];
    let n = [], o = [];
    this.added_tokens_map = /* @__PURE__ */ new Map();
    for (let a of this.tokenizer.added_tokens) {
      let i = new av(a);
      if (this.added_tokens.push(i), this.model.tokens_to_ids.set(i.content, i.id), this.model.vocab[i.id] = i.content, i.special && (this.special_tokens.push(i.content), this.all_special_ids.push(i.id)), this.added_tokens_map.set(i.content, i), i.normalized && this.normalizer !== null) {
        let l = this.normalizer(i.content);
        o.push(l), this.added_tokens_map.set(l, i);
      } else n.push(i.content);
    }
    (this.config.additional_special_tokens ?? []).forEach((a) => {
      this.special_tokens.includes(a) || this.special_tokens.push(a);
    }), this.decoder && (this.decoder.added_tokens = this.added_tokens, this.decoder.end_of_word_suffix = this.model.end_of_word_suffix), this.splitter_unnormalized = new R0(n), this.splitter_normalized = new R0(o), this.remove_space = this.config.remove_space, this.clean_up_tokenization_spaces = this.config.clean_up_tokenization_spaces ?? true, this.do_lowercase_and_remove_accent = this.config.do_lowercase_and_remove_accent ?? false;
  }
  encode(t6, { text_pair: e = null, add_special_tokens: s = true, return_token_type_ids: r = null } = {}) {
    let { tokens: n, token_type_ids: o } = this.tokenize_helper(t6, { text_pair: e, add_special_tokens: s }), a = n.map((l) => this.added_tokens_map.get(l)?.id ?? this.model.tokens_to_ids.get(l) ?? this.model.unk_token_id), i = { ids: a, tokens: n, attention_mask: new Array(a.length).fill(1) };
    return r && o && (i.token_type_ids = o), i;
  }
  decode(t6, e = {}) {
    if (!Array.isArray(t6) || t6.length === 0 || !Sv(t6[0])) throw Error("token_ids must be a non-empty array of integers.");
    let s = t6.map((n) => this.model.vocab[Number(n)] ?? this.model.unk_token);
    e.skip_special_tokens && (s = s.filter((n) => !this.special_tokens.includes(n)));
    let r = this.decoder ? this.decoder(s) : s.join(" ");
    return this.decoder && this.decoder.end_of_word_suffix && (r = r.replaceAll(this.decoder.end_of_word_suffix, " "), e.skip_special_tokens && (r = r.trim())), (e.clean_up_tokenization_spaces ?? this.clean_up_tokenization_spaces) && (r = Ep(r)), r;
  }
  tokenize(t6, { text_pair: e = null, add_special_tokens: s = false } = {}) {
    return this.tokenize_helper(t6, { text_pair: e, add_special_tokens: s }).tokens;
  }
  encode_text(t6) {
    if (t6 === null) return null;
    let e = this.splitter_unnormalized.split(t6);
    return e.forEach((s, r) => {
      let n = this.added_tokens_map.get(s);
      n && (n.lstrip && r > 0 && (e[r - 1] = e[r - 1].trimEnd()), n.rstrip && r < e.length - 1 && (e[r + 1] = e[r + 1].trimStart()));
    }), e.flatMap((s, r) => {
      if (s.length === 0) return [];
      if (this.added_tokens_map.has(s)) return [s];
      if (this.remove_space === true && (s = s.trim().split(/\s+/).join(" ")), this.do_lowercase_and_remove_accent && (s = Iv(s)), this.normalizer !== null && (s = this.normalizer(s)), s.length === 0) return [];
      let n = this.splitter_normalized.split(s);
      return n.forEach((o, a) => {
        let i = this.added_tokens_map.get(o);
        i && (i.lstrip && a > 0 && (n[a - 1] = n[a - 1].trimEnd()), i.rstrip && a < n.length - 1 && (n[a + 1] = n[a + 1].trimStart()));
      }), n.flatMap((o) => {
        if (o.length === 0) return [];
        if (this.added_tokens_map.has(o)) return [o];
        let a = this.pre_tokenizer !== null ? this.pre_tokenizer(o, { section_index: r }) : [o];
        return this.model(a);
      });
    });
  }
  tokenize_helper(t6, { text_pair: e = null, add_special_tokens: s = true }) {
    let r = this.encode_text(t6), n = this.encode_text(e || null);
    return this.post_processor ? this.post_processor(r, n, s) : { tokens: lt(r ?? [], n ?? []) };
  }
  token_to_id(t6) {
    return this.model.tokens_to_ids.get(t6);
  }
  id_to_token(t6) {
    return this.model.vocab[t6];
  }
  get_added_tokens_decoder() {
    let t6 = /* @__PURE__ */ new Map();
    for (let e of this.added_tokens) t6.set(e.id, e);
    return t6;
  }
  get_vocab(t6 = true) {
    let e = /* @__PURE__ */ new Map();
    for (let s = 0; s < this.model.vocab.length; ++s) {
      let r = this.model.vocab[s];
      (t6 || !this.added_tokens_map.has(r)) && e.set(r, s);
    }
    return e;
  }
};
var _b = IA;
var TA = Object.defineProperty;
var zA = (t6, e, s) => e in t6 ? TA(t6, e, { enumerable: true, configurable: true, writable: true, value: s }) : t6[e] = s;
var CA = (t6, e, s) => (zA(t6, typeof e != "symbol" ? e + "" : e, s), s);
var S = Object.freeze({ Text: "Text", NumericLiteral: "NumericLiteral", StringLiteral: "StringLiteral", Identifier: "Identifier", Equals: "Equals", OpenParen: "OpenParen", CloseParen: "CloseParen", OpenStatement: "OpenStatement", CloseStatement: "CloseStatement", OpenExpression: "OpenExpression", CloseExpression: "CloseExpression", OpenSquareBracket: "OpenSquareBracket", CloseSquareBracket: "CloseSquareBracket", OpenCurlyBracket: "OpenCurlyBracket", CloseCurlyBracket: "CloseCurlyBracket", Comma: "Comma", Dot: "Dot", Colon: "Colon", Pipe: "Pipe", CallOperator: "CallOperator", AdditiveBinaryOperator: "AdditiveBinaryOperator", MultiplicativeBinaryOperator: "MultiplicativeBinaryOperator", ExponentiationBinaryOperator: "ExponentiationBinaryOperator", ComparisonBinaryOperator: "ComparisonBinaryOperator", UnaryOperator: "UnaryOperator", Comment: "Comment" });
var rt2 = class {
  constructor(t6, e) {
    this.value = t6, this.type = e;
  }
};
function db(t6) {
  return /\w/.test(t6);
}
function _s2(t6) {
  return /[0-9]/.test(t6);
}
function fb(t6) {
  return /\s/.test(t6);
}
var PA = [["{%", S.OpenStatement], ["%}", S.CloseStatement], ["{{", S.OpenExpression], ["}}", S.CloseExpression], ["(", S.OpenParen], [")", S.CloseParen], ["{", S.OpenCurlyBracket], ["}", S.CloseCurlyBracket], ["[", S.OpenSquareBracket], ["]", S.CloseSquareBracket], [",", S.Comma], [".", S.Dot], [":", S.Colon], ["|", S.Pipe], ["<=", S.ComparisonBinaryOperator], [">=", S.ComparisonBinaryOperator], ["==", S.ComparisonBinaryOperator], ["!=", S.ComparisonBinaryOperator], ["<", S.ComparisonBinaryOperator], [">", S.ComparisonBinaryOperator], ["+", S.AdditiveBinaryOperator], ["-", S.AdditiveBinaryOperator], ["~", S.AdditiveBinaryOperator], ["**", S.ExponentiationBinaryOperator], ["*", S.MultiplicativeBinaryOperator], ["//", S.MultiplicativeBinaryOperator], ["/", S.MultiplicativeBinaryOperator], ["%", S.MultiplicativeBinaryOperator], ["=", S.Equals]];
var NA = /* @__PURE__ */ new Map([["n", `
`], ["t", "	"], ["r", "\r"], ["b", "\b"], ["f", "\f"], ["v", "\v"], ["'", "'"], ['"', '"'], ["\\", "\\"]]);
function LA(t6, e = {}) {
  return t6.endsWith(`
`) && (t6 = t6.slice(0, -1)), e.lstrip_blocks && (t6 = t6.replace(/^[ \t]*({[#%-])/gm, "$1")), e.trim_blocks && (t6 = t6.replace(/([#%-]})\n/g, "$1")), t6.replace(/(\s*){%(-?)\s*(?:end)?generation\s*(-?)%}(\s*)/gs, (s, r, n, o, a) => (n ? "" : r) + (o ? "" : a));
}
function $A(t6, e = {}) {
  let s = [], r = LA(t6, e), n = 0, o = 0, a = (c) => {
    let p = "";
    for (; c(r[n]); ) {
      if (r[n] === "\\") {
        if (++n, n >= r.length) throw new SyntaxError("Unexpected end of input");
        let u = r[n++], _ = NA.get(u);
        if (_ === void 0) throw new SyntaxError(`Unexpected escaped character: ${u}`);
        p += _;
        continue;
      }
      if (p += r[n++], n >= r.length) throw new SyntaxError("Unexpected end of input");
    }
    return p;
  }, i = () => {
    let c = s.at(-1);
    c && c.type === S.Text && (c.value = c.value.trimEnd(), c.value === "" && s.pop());
  }, l = () => {
    for (; n < r.length && fb(r[n]); ) ++n;
  };
  e: for (; n < r.length; ) {
    let c = s.at(-1)?.type;
    if (c === void 0 || c === S.CloseStatement || c === S.CloseExpression || c === S.Comment) {
      let u = "";
      for (; n < r.length && !(r[n] === "{" && (r[n + 1] === "%" || r[n + 1] === "{" || r[n + 1] === "#")); ) u += r[n++];
      if (u.length > 0) {
        s.push(new rt2(u, S.Text));
        continue;
      }
    }
    if (r[n] === "{" && r[n + 1] === "#") {
      n += 2;
      let u = r[n] === "-";
      u && ++n;
      let _ = "";
      for (; r[n] !== "#" || r[n + 1] !== "}"; ) {
        if (n + 2 >= r.length) throw new SyntaxError("Missing end of comment tag");
        _ += r[n++];
      }
      let d = _.endsWith("-");
      d && (_ = _.slice(0, -1)), u && i(), s.push(new rt2(_, S.Comment)), n += 2, d && l();
      continue;
    }
    if (r.slice(n, n + 3) === "{%-") {
      i(), s.push(new rt2("{%", S.OpenStatement)), n += 3;
      continue;
    }
    if (r.slice(n, n + 3) === "{{-") {
      i(), s.push(new rt2("{{", S.OpenExpression)), o = 0, n += 3;
      continue;
    }
    if (a(fb), r.slice(n, n + 3) === "-%}") {
      s.push(new rt2("%}", S.CloseStatement)), n += 3, l();
      continue;
    }
    if (r.slice(n, n + 3) === "-}}") {
      s.push(new rt2("}}", S.CloseExpression)), n += 3, l();
      continue;
    }
    let p = r[n];
    if (p === "-" || p === "+") {
      let u = s.at(-1)?.type;
      if (u === S.Text || u === void 0) throw new SyntaxError(`Unexpected character: ${p}`);
      switch (u) {
        case S.Identifier:
        case S.NumericLiteral:
        case S.StringLiteral:
        case S.CloseParen:
        case S.CloseSquareBracket:
          break;
        default: {
          ++n;
          let _ = a(_s2);
          if (_.length > 0 && r[n] === "." && _s2(r[n + 1])) {
            ++n;
            let d = a(_s2);
            _ = `${_}.${d}`;
          }
          s.push(new rt2(`${p}${_}`, _.length > 0 ? S.NumericLiteral : S.UnaryOperator));
          continue;
        }
      }
    }
    for (let [u, _] of PA) {
      if (u === "}}" && o > 0) continue;
      if (r.slice(n, n + u.length) === u) {
        s.push(new rt2(u, _)), _ === S.OpenExpression ? o = 0 : _ === S.OpenCurlyBracket ? ++o : _ === S.CloseCurlyBracket && --o, n += u.length;
        continue e;
      }
    }
    if (p === "'" || p === '"') {
      ++n;
      let u = a((_) => _ !== p);
      s.push(new rt2(u, S.StringLiteral)), ++n;
      continue;
    }
    if (_s2(p)) {
      let u = a(_s2);
      if (s.at(-1)?.type !== S.Dot && r[n] === "." && _s2(r[n + 1])) {
        ++n;
        let _ = a(_s2);
        u = `${u}.${_}`;
      }
      s.push(new rt2(u, S.NumericLiteral));
      continue;
    }
    if (db(p)) {
      let u = a(db);
      s.push(new rt2(u, S.Identifier));
      continue;
    }
    throw new SyntaxError(`Unexpected character: ${p}`);
  }
  return s;
}
var nt2 = class {
  type = "Statement";
};
var RA = class extends nt2 {
  constructor(t6) {
    super(), this.body = t6;
  }
  type = "Program";
};
var FA = class extends nt2 {
  constructor(t6, e, s) {
    super(), this.test = t6, this.body = e, this.alternate = s;
  }
  type = "If";
};
var DA = class extends nt2 {
  constructor(t6, e, s, r) {
    super(), this.loopvar = t6, this.iterable = e, this.body = s, this.defaultBlock = r;
  }
  type = "For";
};
var BA = class extends nt2 {
  type = "Break";
};
var qA = class extends nt2 {
  type = "Continue";
};
var UA = class extends nt2 {
  constructor(t6, e, s) {
    super(), this.assignee = t6, this.value = e, this.body = s;
  }
  type = "Set";
};
var jA = class extends nt2 {
  constructor(t6, e, s) {
    super(), this.name = t6, this.args = e, this.body = s;
  }
  type = "Macro";
};
var GA = class extends nt2 {
  constructor(t6) {
    super(), this.value = t6;
  }
  type = "Comment";
};
var Qe = class extends nt2 {
  type = "Expression";
};
var WA = class extends Qe {
  constructor(t6, e, s) {
    super(), this.object = t6, this.property = e, this.computed = s;
  }
  type = "MemberExpression";
};
var mb = class extends Qe {
  constructor(t6, e) {
    super(), this.callee = t6, this.args = e;
  }
  type = "CallExpression";
};
var Lt2 = class extends Qe {
  constructor(t6) {
    super(), this.value = t6;
  }
  type = "Identifier";
};
var Ws2 = class extends Qe {
  constructor(t6) {
    super(), this.value = t6;
  }
  type = "Literal";
};
var VA = class extends Ws2 {
  type = "IntegerLiteral";
};
var HA = class extends Ws2 {
  type = "FloatLiteral";
};
var hb = class extends Ws2 {
  type = "StringLiteral";
};
var KA = class extends Ws2 {
  type = "ArrayLiteral";
};
var gb = class extends Ws2 {
  type = "TupleLiteral";
};
var XA = class extends Ws2 {
  type = "ObjectLiteral";
};
var Gs2 = class extends Qe {
  constructor(t6, e, s) {
    super(), this.operator = t6, this.left = e, this.right = s;
  }
  type = "BinaryExpression";
};
var QA = class extends Qe {
  constructor(t6, e) {
    super(), this.operand = t6, this.filter = e;
  }
  type = "FilterExpression";
};
var YA = class extends nt2 {
  constructor(t6, e) {
    super(), this.filter = t6, this.body = e;
  }
  type = "FilterStatement";
};
var JA = class extends Qe {
  constructor(t6, e) {
    super(), this.lhs = t6, this.test = e;
  }
  type = "SelectExpression";
};
var ZA = class extends Qe {
  constructor(t6, e, s) {
    super(), this.operand = t6, this.negate = e, this.test = s;
  }
  type = "TestExpression";
};
var xb = class extends Qe {
  constructor(t6, e) {
    super(), this.operator = t6, this.argument = e;
  }
  type = "UnaryExpression";
};
var eM = class extends Qe {
  constructor(t6 = void 0, e = void 0, s = void 0) {
    super(), this.start = t6, this.stop = e, this.step = s;
  }
  type = "SliceExpression";
};
var Sp = class extends Qe {
  constructor(t6, e) {
    super(), this.key = t6, this.value = e;
  }
  type = "KeywordArgumentExpression";
};
var tM = class extends Qe {
  constructor(t6) {
    super(), this.argument = t6;
  }
  type = "SpreadExpression";
};
var sM = class extends Qe {
  constructor(t6) {
    super(), this.argument = t6;
  }
  type = "KeywordSpreadExpression";
};
var rM = class extends nt2 {
  constructor(t6, e, s) {
    super(), this.call = t6, this.callerArgs = e, this.body = s;
  }
  type = "CallStatement";
};
var nM = class extends Qe {
  constructor(t6, e, s) {
    super(), this.condition = t6, this.trueExpr = e, this.falseExpr = s;
  }
  type = "Ternary";
};
function oM(t6) {
  let e = new RA([]), s = 0;
  function r(A, M) {
    let I = t6[s++];
    if (!I || I.type !== A) throw new Error(`Parser Error: ${M}. ${I.type} !== ${A}.`);
    return I;
  }
  function n(A) {
    if (!l(A)) throw new SyntaxError(`Expected ${A}`);
    ++s;
  }
  function o() {
    switch (t6[s].type) {
      case S.Comment:
        return new GA(t6[s++].value);
      case S.Text:
        return c();
      case S.OpenStatement:
        return p();
      case S.OpenExpression:
        return u();
      default:
        throw new SyntaxError(`Unexpected token type: ${t6[s].type}`);
    }
  }
  function a(...A) {
    return s + A.length <= t6.length && A.every((M, I) => M === t6[s + I].type);
  }
  function i(...A) {
    return t6[s]?.type === S.OpenStatement && t6[s + 1]?.type === S.Identifier && A.includes(t6[s + 1]?.value);
  }
  function l(...A) {
    return s + A.length <= t6.length && A.every((M, I) => t6[s + I].type === "Identifier" && M === t6[s + I].value);
  }
  function c() {
    return new hb(r(S.Text, "Expected text token").value);
  }
  function p() {
    if (r(S.OpenStatement, "Expected opening statement token"), t6[s].type !== S.Identifier) throw new SyntaxError(`Unknown statement, got ${t6[s].type}`);
    let A = t6[s].value, M;
    switch (A) {
      case "set":
        ++s, M = _();
        break;
      case "if":
        ++s, M = d(), r(S.OpenStatement, "Expected {% token"), n("endif"), r(S.CloseStatement, "Expected %} token");
        break;
      case "macro":
        ++s, M = f(), r(S.OpenStatement, "Expected {% token"), n("endmacro"), r(S.CloseStatement, "Expected %} token");
        break;
      case "for":
        ++s, M = g(), r(S.OpenStatement, "Expected {% token"), n("endfor"), r(S.CloseStatement, "Expected %} token");
        break;
      case "call": {
        ++s;
        let I = null;
        a(S.OpenParen) && (I = C("parameters"));
        let oe = _e();
        if (oe.type !== "Identifier") throw new SyntaxError("Expected identifier following call statement");
        let ee2 = C("call");
        r(S.CloseStatement, "Expected closing statement token");
        let We2 = [];
        for (; !i("endcall"); ) We2.push(o());
        r(S.OpenStatement, "Expected '{%'"), n("endcall"), r(S.CloseStatement, "Expected closing statement token");
        let $e2 = new mb(oe, ee2);
        M = new rM($e2, I, We2);
        break;
      }
      case "break":
        ++s, r(S.CloseStatement, "Expected closing statement token"), M = new BA();
        break;
      case "continue":
        ++s, r(S.CloseStatement, "Expected closing statement token"), M = new qA();
        break;
      case "filter": {
        ++s;
        let I = _e();
        I instanceof Lt2 && a(S.OpenParen) && (I = $(I)), r(S.CloseStatement, "Expected closing statement token");
        let oe = [];
        for (; !i("endfilter"); ) oe.push(o());
        r(S.OpenStatement, "Expected '{%'"), n("endfilter"), r(S.CloseStatement, "Expected '%}'"), M = new YA(I, oe);
        break;
      }
      default:
        throw new SyntaxError(`Unknown statement type: ${A}`);
    }
    return M;
  }
  function u() {
    r(S.OpenExpression, "Expected opening expression token");
    let A = w();
    return r(S.CloseExpression, "Expected closing expression token"), A;
  }
  function _() {
    let A = m(), M = null, I = [];
    if (a(S.Equals)) ++s, M = m();
    else {
      for (r(S.CloseStatement, "Expected %} token"); !i("endset"); ) I.push(o());
      r(S.OpenStatement, "Expected {% token"), n("endset");
    }
    return r(S.CloseStatement, "Expected closing statement token"), new UA(A, M, I);
  }
  function d() {
    let A = w();
    r(S.CloseStatement, "Expected closing statement token");
    let M = [], I = [];
    for (; !i("elif", "else", "endif"); ) M.push(o());
    if (i("elif")) {
      ++s, ++s;
      let oe = d();
      I.push(oe);
    } else if (i("else")) for (++s, ++s, r(S.CloseStatement, "Expected closing statement token"); !i("endif"); ) I.push(o());
    return new FA(A, M, I);
  }
  function f() {
    let A = _e();
    if (A.type !== "Identifier") throw new SyntaxError("Expected identifier following macro statement");
    let M = C("parameters");
    r(S.CloseStatement, "Expected closing statement token");
    let I = [];
    for (; !i("endmacro"); ) I.push(o());
    return new jA(A, M, I);
  }
  function m(A = false) {
    let M = A ? _e : w, I = [M()], oe = a(S.Comma);
    for (; oe && (++s, I.push(M()), !!a(S.Comma)); ) ;
    return oe ? new gb(I) : I[0];
  }
  function g() {
    let A = m(true);
    if (!(A instanceof Lt2 || A instanceof gb)) throw new SyntaxError(`Expected identifier/tuple for the loop variable, got ${A.type} instead`);
    if (!l("in")) throw new SyntaxError("Expected `in` keyword following loop variable");
    ++s;
    let M = w();
    r(S.CloseStatement, "Expected closing statement token");
    let I = [];
    for (; !i("endfor", "else"); ) I.push(o());
    let oe = [];
    if (i("else")) for (++s, ++s, r(S.CloseStatement, "Expected closing statement token"); !i("endfor"); ) oe.push(o());
    return new DA(A, M, I, oe);
  }
  function w() {
    return x();
  }
  function x() {
    let A = y();
    if (l("if")) {
      ++s;
      let M = y();
      if (l("else")) {
        ++s;
        let I = x();
        return new nM(M, A, I);
      } else return new JA(A, M);
    }
    return A;
  }
  function y() {
    let A = b();
    for (; l("or"); ) {
      let M = t6[s];
      ++s;
      let I = b();
      A = new Gs2(M, A, I);
    }
    return A;
  }
  function b() {
    let A = v();
    for (; l("and"); ) {
      let M = t6[s];
      ++s;
      let I = v();
      A = new Gs2(M, A, I);
    }
    return A;
  }
  function v() {
    let A;
    for (; l("not"); ) {
      let M = t6[s];
      ++s;
      let I = v();
      A = new xb(M, I);
    }
    return A ?? k();
  }
  function k() {
    let A = O();
    for (; ; ) {
      let M;
      if (l("not", "in")) M = new rt2("not in", S.Identifier), s += 2;
      else if (l("in")) M = t6[s++];
      else if (a(S.ComparisonBinaryOperator)) M = t6[s++];
      else break;
      let I = O();
      A = new Gs2(M, A, I);
    }
    return A;
  }
  function O() {
    let A = B();
    for (; a(S.AdditiveBinaryOperator); ) {
      let M = t6[s];
      ++s;
      let I = B();
      A = new Gs2(M, A, I);
    }
    return A;
  }
  function T() {
    let A = V2(_e());
    return a(S.OpenParen) ? $(A) : A;
  }
  function $(A) {
    let M = new mb(A, C("call"));
    return M = V2(M), a(S.OpenParen) && (M = $(M)), M;
  }
  function C(A) {
    r(S.OpenParen, "Expected opening parenthesis for arguments list");
    let M = D(A);
    return r(S.CloseParen, "Expected closing parenthesis for arguments list"), M;
  }
  function D(A) {
    let M = [], I = /* @__PURE__ */ new Set(), oe = false, ee2 = false;
    for (; !a(S.CloseParen); ) {
      let We2 = a(S.ExponentiationBinaryOperator), $e2 = a(S.MultiplicativeBinaryOperator) && t6[s].value === "*";
      if (A === "parameters" && (We2 || $e2)) throw new SyntaxError("Argument unpacking is not allowed in parameter declarations");
      if (We2) {
        if (++s, M.push(new sM(w())), a(S.Comma) && ++s, !a(S.CloseParen)) throw new SyntaxError("Expected closing parenthesis: `**` must be applied to the final argument");
        break;
      }
      let Re;
      if ($e2) {
        if (ee2) throw new SyntaxError("Only one `*` argument unpacking is allowed");
        ee2 = true, ++s;
        let Ke = w();
        Re = new tM(Ke);
      } else {
        if (Re = w(), a(S.Equals)) {
          if (++s, !(Re instanceof Lt2)) throw new SyntaxError(A === "parameters" ? "Expected identifier for parameter declaration" : "Expected identifier for keyword argument");
          let Ke = w();
          Re = new Sp(Re, Ke);
        }
        if (A === "parameters") {
          if (!(Re instanceof Lt2 || Re instanceof Sp)) throw new SyntaxError("Expected identifier for parameter declaration");
          let Ke = Re instanceof Lt2 ? Re.value : Re.key.value;
          if (I.has(Ke)) throw new SyntaxError(`Duplicate parameter name: ${Ke}`);
          I.add(Ke);
        }
        if (Re instanceof Sp) oe = true;
        else {
          if (oe) throw new SyntaxError(A === "call" ? "Positional arguments must come before keyword arguments" : "Non-default argument follows default argument");
          if (ee2) throw new SyntaxError("Positional arguments must not follow `*` argument unpacking");
        }
      }
      M.push(Re), a(S.Comma) && ++s;
    }
    return M;
  }
  function W() {
    let A = [], M = false;
    for (; !a(S.CloseSquareBracket); ) a(S.Colon) ? (A.push(void 0), ++s, M = true) : (A.push(w()), a(S.Colon) && (++s, M = true));
    if (A.length === 0) throw new SyntaxError("Expected at least one argument for member/slice expression");
    if (M) {
      if (A.length > 3) throw new SyntaxError("Expected 0-3 arguments for slice expression");
      return new eM(...A);
    }
    return A[0];
  }
  function V2(A) {
    for (; a(S.Dot) || a(S.OpenSquareBracket); ) {
      let M = t6[s];
      ++s;
      let I, oe = M.type === S.OpenSquareBracket;
      if (oe) I = W(), r(S.CloseSquareBracket, "Expected closing square bracket");
      else if (I = _e(), I.type !== "Identifier" && I.type !== "IntegerLiteral") throw new SyntaxError("Expected identifier or integer following dot operator");
      A = new WA(A, I, oe);
    }
    return A;
  }
  function B() {
    let A = q();
    for (; a(S.MultiplicativeBinaryOperator); ) {
      let M = t6[s++], I = q();
      A = new Gs2(M, A, I);
    }
    return A;
  }
  function q() {
    let A = Z();
    for (; a(S.ExponentiationBinaryOperator); ) {
      let M = t6[s++], I = Z();
      A = new Gs2(M, A, I);
    }
    return A;
  }
  function Z() {
    let A = j2();
    for (; l("is"); ) {
      ++s;
      let M = l("not");
      M && ++s;
      let I = _e();
      if (!(I instanceof Lt2)) throw new SyntaxError("Expected identifier for the test");
      A = new ZA(A, M, I);
    }
    return A;
  }
  function j2() {
    let A = ue();
    for (; a(S.Pipe); ) {
      ++s;
      let M = _e();
      if (!(M instanceof Lt2)) throw new SyntaxError("Expected identifier for the filter");
      a(S.OpenParen) && (M = $(M)), A = new QA(A, M);
    }
    return A;
  }
  function ue() {
    let A = t6[s];
    if (A && (A.type === S.UnaryOperator || A.type === S.AdditiveBinaryOperator) && (A.value === "-" || A.value === "+")) {
      let M = t6[s++], I = ue();
      return new xb(M, I);
    }
    return T();
  }
  function _e() {
    let A = t6[s++];
    switch (A.type) {
      case S.NumericLiteral: {
        let M = A.value;
        return M.includes(".") ? new HA(Number(M)) : new VA(Number(M));
      }
      case S.StringLiteral: {
        let M = A.value;
        for (; a(S.StringLiteral); ) M += t6[s++].value;
        return new hb(M);
      }
      case S.Identifier:
        return new Lt2(A.value);
      case S.OpenParen: {
        let M = m();
        return r(S.CloseParen, "Expected closing parenthesis, got ${tokens[current].type} instead."), M;
      }
      case S.OpenSquareBracket: {
        let M = [];
        for (; !a(S.CloseSquareBracket); ) M.push(w()), a(S.Comma) && ++s;
        return ++s, new KA(M);
      }
      case S.OpenCurlyBracket: {
        let M = /* @__PURE__ */ new Map();
        for (; !a(S.CloseCurlyBracket); ) {
          let I = w();
          r(S.Colon, "Expected colon between key and value in object literal");
          let oe = w();
          M.set(I, oe), a(S.Comma) && ++s;
        }
        return ++s, new XA(M);
      }
      default:
        throw new SyntaxError(`Unexpected token: ${A.type}`);
    }
  }
  for (; s < t6.length; ) e.body.push(o());
  return e;
}
function aM(t6, e, s = 1) {
  if (e === void 0 && (e = t6, t6 = 0), s === 0) throw new Error("range() step must not be zero");
  let r = [];
  if (s > 0) for (let n = t6; n < e; n += s) r.push(n);
  else for (let n = t6; n > e; n += s) r.push(n);
  return r;
}
function wb(t6, e, s, r = 1) {
  let n = Math.sign(r);
  n >= 0 ? (e = (e ??= 0) < 0 ? Math.max(t6.length + e, 0) : Math.min(e, t6.length), s = (s ??= t6.length) < 0 ? Math.max(t6.length + s, 0) : Math.min(s, t6.length)) : (e = (e ??= t6.length - 1) < 0 ? Math.max(t6.length + e, -1) : Math.min(e, t6.length - 1), s = (s ??= -1) < -1 ? Math.max(t6.length + s, -1) : Math.min(s, t6.length - 1));
  let o = [];
  for (let a = e; n * a < n * s; a += r) o.push(t6[a]);
  return o;
}
function iM(t6) {
  return t6.replace(/\b\w/g, (e) => e.toUpperCase());
}
function lM(t6) {
  return cM(/* @__PURE__ */ new Date(), t6);
}
function cM(t6, e) {
  let s = new Intl.DateTimeFormat(void 0, { month: "long" }), r = new Intl.DateTimeFormat(void 0, { month: "short" }), n = (o) => o < 10 ? "0" + o : o.toString();
  return e.replace(/%[YmdbBHM%]/g, (o) => {
    switch (o) {
      case "%Y":
        return t6.getFullYear().toString();
      case "%m":
        return n(t6.getMonth() + 1);
      case "%d":
        return n(t6.getDate());
      case "%b":
        return r.format(t6);
      case "%B":
        return s.format(t6);
      case "%H":
        return n(t6.getHours());
      case "%M":
        return n(t6.getMinutes());
      case "%%":
        return "%";
      default:
        return o;
    }
  });
}
function pM(t6) {
  return t6.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function uM(t6, e, s, r) {
  if (r === 0) return t6;
  let n = r == null || r < 0 ? 1 / 0 : r, o = e.length === 0 ? new RegExp("(?=)", "gu") : new RegExp(pM(e), "gu");
  return t6.replaceAll(o, (a) => n > 0 ? (--n, s) : a);
}
var yb = class extends Error {
};
var bb = class extends Error {
};
var _M = /* @__PURE__ */ new Map();
var _t = class {
  type = "RuntimeValue";
  value;
  get builtins() {
    return _M;
  }
  constructor(t6 = void 0) {
    this.value = t6;
  }
  __bool__() {
    return new X(!!this.value);
  }
  toString() {
    return String(this.value);
  }
};
var Q = class extends _t {
  type = "IntegerValue";
};
var he = class extends _t {
  type = "FloatValue";
  toString() {
    return Object.is(this.value, -0) ? "-0.0" : this.value % 1 === 0 ? this.value.toFixed(1) : this.value.toString();
  }
};
var F = class extends _t {
  type = "StringValue";
  _builtins;
  get builtins() {
    return this._builtins ??= /* @__PURE__ */ new Map([["upper", new ke(() => new F(this.value.toUpperCase()))], ["lower", new ke(() => new F(this.value.toLowerCase()))], ["strip", new ke(() => new F(this.value.trim()))], ["title", new ke(() => new F(iM(this.value)))], ["capitalize", new ke(() => new F(this.value.charAt(0).toUpperCase() + this.value.slice(1)))], ["length", new Q(this.value.length)], ["rstrip", new ke(() => new F(this.value.trimEnd()))], ["lstrip", new ke(() => new F(this.value.trimStart()))], ["startswith", new ke((t6) => {
      if (t6.length === 0) throw new Error("startswith() requires at least one argument");
      let e = t6[0];
      if (e instanceof F) return new X(this.value.startsWith(e.value));
      if (e instanceof re) {
        for (let s of e.value) {
          if (!(s instanceof F)) throw new Error("startswith() tuple elements must be strings");
          if (this.value.startsWith(s.value)) return new X(true);
        }
        return new X(false);
      }
      throw new Error("startswith() argument must be a string or tuple of strings");
    })], ["endswith", new ke((t6) => {
      if (t6.length === 0) throw new Error("endswith() requires at least one argument");
      let e = t6[0];
      if (e instanceof F) return new X(this.value.endsWith(e.value));
      if (e instanceof re) {
        for (let s of e.value) {
          if (!(s instanceof F)) throw new Error("endswith() tuple elements must be strings");
          if (this.value.endsWith(s.value)) return new X(true);
        }
        return new X(false);
      }
      throw new Error("endswith() argument must be a string or tuple of strings");
    })], ["split", new ke((t6) => {
      let e = t6[0] ?? new ve();
      if (!(e instanceof F || e instanceof ve)) throw new Error("sep argument must be a string or null");
      let s = t6[1] ?? new Q(-1);
      if (!(s instanceof Q)) throw new Error("maxsplit argument must be a number");
      let r = [];
      if (e instanceof ve) {
        let n = this.value.trimStart();
        for (let { 0: o, index: a } of n.matchAll(/\S+/g)) {
          if (s.value !== -1 && r.length >= s.value && a !== void 0) {
            r.push(o + n.slice(a + o.length));
            break;
          }
          r.push(o);
        }
      } else {
        if (e.value === "") throw new Error("empty separator");
        r = this.value.split(e.value), s.value !== -1 && r.length > s.value && r.push(r.splice(s.value).join(e.value));
      }
      return new re(r.map((n) => new F(n)));
    })], ["replace", new ke((t6) => {
      if (t6.length < 2) throw new Error("replace() requires at least two arguments");
      let e = t6[0], s = t6[1];
      if (!(e instanceof F && s instanceof F)) throw new Error("replace() arguments must be strings");
      let r;
      if (t6.length > 2 ? t6[2].type === "KeywordArgumentsValue" ? r = t6[2].value.get("count") ?? new ve() : r = t6[2] : r = new ve(), !(r instanceof Q || r instanceof ve)) throw new Error("replace() count argument must be a number or null");
      return new F(uM(this.value, e.value, s.value, r.value));
    })]]);
  }
};
var X = class extends _t {
  type = "BooleanValue";
};
var dM = /[\x7f-\uffff]/g;
function kb(t6) {
  return t6.replace(dM, (e) => "\\u" + e.charCodeAt(0).toString(16).padStart(4, "0"));
}
function Rt(t6, e = {}, s = 0, r = true) {
  let { indent: n = null, ensureAscii: o = false, separators: a = null, sortKeys: i = false } = e, l, c;
  switch (a ? [l, c] = a : n ? (l = ",", c = ": ") : (l = ", ", c = ": "), t6.type) {
    case "NullValue":
      return "null";
    case "UndefinedValue":
      return r ? "null" : "undefined";
    case "IntegerValue":
    case "FloatValue":
    case "BooleanValue":
      return JSON.stringify(t6.value);
    case "StringValue": {
      let p = JSON.stringify(t6.value);
      return o && (p = kb(p)), p;
    }
    case "ArrayValue":
    case "NamespaceValue":
    case "ObjectValue": {
      let p = n ? " ".repeat(n) : "", u = `
` + p.repeat(s), _ = u + p;
      if (t6.type === "ArrayValue") {
        let d = t6.value.map((f) => Rt(f, e, s + 1, r));
        return n ? `[${_}${d.join(`${l}${_}`)}${u}]` : `[${d.join(l)}]`;
      } else {
        let d = Array.from(t6.value.entries());
        i && (d = d.sort(([m], [g]) => m.localeCompare(g)));
        let f = d.map(([m, g]) => {
          let w = JSON.stringify(m);
          o && (w = kb(w));
          let x = `${w}${c}${Rt(g, e, s + 1, r)}`;
          return n ? `${_}${x}` : x;
        });
        return n ? `{${f.join(l)}${u}}` : `{${f.join(l)}}`;
      }
    }
    default:
      throw new Error(`Cannot convert to JSON: ${t6.type}`);
  }
}
var Ve2 = class extends _t {
  type = "ObjectValue";
  _builtins;
  __bool__() {
    return new X(this.value.size > 0);
  }
  get builtins() {
    return this._builtins ??= /* @__PURE__ */ new Map([["get", new ke(([t6, e]) => {
      if (!(t6 instanceof F)) throw new Error(`Object key must be a string: got ${t6.type}`);
      return this.value.get(t6.value) ?? e ?? new ve();
    })], ["items", new ke(() => this.items())], ["keys", new ke(() => this.keys())], ["values", new ke(() => this.values())], ["dictsort", new ke((t6) => {
      let e = /* @__PURE__ */ new Map(), s = t6.filter((i) => i instanceof ds2 ? (e = i.value, false) : true), r = s.at(0) ?? e.get("case_sensitive") ?? new X(false);
      if (!(r instanceof X)) throw new Error("case_sensitive must be a boolean");
      let n = s.at(1) ?? e.get("by") ?? new F("key");
      if (!(n instanceof F)) throw new Error("by must be a string");
      if (!["key", "value"].includes(n.value)) throw new Error("by must be either 'key' or 'value'");
      let o = s.at(2) ?? e.get("reverse") ?? new X(false);
      if (!(o instanceof X)) throw new Error("reverse must be a boolean");
      let a = Array.from(this.value.entries()).map(([i, l]) => new re([new F(i), l])).sort((i, l) => {
        let c = n.value === "key" ? 0 : 1, p = i.value[c], u = l.value[c], _ = Op(p, u, r.value);
        return o.value ? -_ : _;
      });
      return new re(a);
    })]]);
  }
  items() {
    return new re(Array.from(this.value.entries()).map(([t6, e]) => new re([new F(t6), e])));
  }
  keys() {
    return new re(Array.from(this.value.keys()).map((t6) => new F(t6)));
  }
  values() {
    return new re(Array.from(this.value.values()));
  }
  toString() {
    return Rt(this, {}, 0, false);
  }
};
var ds2 = class extends Ve2 {
  type = "KeywordArgumentsValue";
};
var Tp = class extends _t {
  type = "NamespaceValue";
  toString() {
    return Rt(this, {}, 0, false);
  }
};
var re = class extends _t {
  type = "ArrayValue";
  _builtins;
  get builtins() {
    return this._builtins ??= /* @__PURE__ */ new Map([["length", new Q(this.value.length)]]);
  }
  __bool__() {
    return new X(this.value.length > 0);
  }
  toString() {
    return Rt(this, {}, 0, false);
  }
};
var vb = class extends re {
  type = "TupleValue";
};
var ke = class extends _t {
  type = "FunctionValue";
};
var ve = class extends _t {
  type = "NullValue";
};
var be2 = class extends _t {
  type = "UndefinedValue";
};
function fM(t6) {
  let e;
  if (t6 instanceof re ? e = t6.value : t6 instanceof F && (e = Array.from(t6.value, (n) => new F(n))), !e || e.length !== 2) throw new Error("namespace expected an object or an iterable of [key, value] pairs");
  let [s, r] = e;
  if (!(s instanceof F)) throw new Error("namespace keys must be strings");
  return [s, r];
}
var Sb = class {
  constructor(t6) {
    this.parent = t6;
  }
  variables = /* @__PURE__ */ new Map([["namespace", new ke((t6) => {
    let e = t6.slice(), s;
    if (e.at(-1) instanceof ds2 && (s = e.pop()), e.length > 1) throw new Error(`namespace expected at most 1 argument, got ${e.length}`);
    let r = /* @__PURE__ */ new Map();
    if (e.length === 1) {
      let n = e[0];
      if (n instanceof Ve2) for (let [o, a] of n.value) r.set(o, a);
      else if (n instanceof re) for (let o of n.value) {
        let [a, i] = fM(o);
        r.set(a.value, i);
      }
      else throw new Error(`'${n.type}' object is not iterable`);
    }
    if (s) for (let [n, o] of s.value) r.set(n, o);
    return new Tp(r);
  })]]);
  tests = Sb.TESTS;
  set(t6, e) {
    return this.declareVariable(t6, Ci(e));
  }
  declareVariable(t6, e) {
    if (this.variables.has(t6)) throw new SyntaxError(`Variable already declared: ${t6}`);
    return this.variables.set(t6, e), e;
  }
  setVariable(t6, e) {
    return this.variables.set(t6, e), e;
  }
  resolve(t6) {
    if (this.variables.has(t6)) return this;
    if (this.parent) return this.parent.resolve(t6);
    throw new Error(`Unknown variable: ${t6}`);
  }
  lookupVariable(t6) {
    try {
      return this.resolve(t6).variables.get(t6) ?? new be2();
    } catch {
      return new be2();
    }
  }
};
var $t = Sb;
CA($t, "TESTS", /* @__PURE__ */ new Map([["boolean", (t6) => t6.type === "BooleanValue"], ["callable", (t6) => t6 instanceof ke], ["odd", (t6) => {
  if (!(t6 instanceof Q)) throw new Error(`cannot odd on ${t6.type}`);
  return t6.value % 2 !== 0;
}], ["even", (t6) => {
  if (!(t6 instanceof Q)) throw new Error(`cannot even on ${t6.type}`);
  return t6.value % 2 === 0;
}], ["false", (t6) => t6.type === "BooleanValue" && !t6.value], ["true", (t6) => t6.type === "BooleanValue" && t6.value], ["none", (t6) => t6.type === "NullValue"], ["string", (t6) => t6.type === "StringValue"], ["number", (t6) => t6 instanceof Q || t6 instanceof he], ["integer", (t6) => t6 instanceof Q], ["iterable", (t6) => t6.type === "ArrayValue" || t6.type === "StringValue"], ["mapping", (t6) => t6 instanceof Ve2], ["sequence", (t6) => t6 instanceof re || t6 instanceof Ve2 || t6 instanceof F], ["lower", (t6) => {
  let e = t6.value;
  return t6.type === "StringValue" && e === e.toLowerCase();
}], ["upper", (t6) => {
  let e = t6.value;
  return t6.type === "StringValue" && e === e.toUpperCase();
}], ["none", (t6) => t6.type === "NullValue"], ["defined", (t6) => t6.type !== "UndefinedValue"], ["undefined", (t6) => t6.type === "UndefinedValue"], ["equalto", (t6, e) => t6.value === e.value], ["eq", (t6, e) => t6.value === e.value]]));
function mM(t6) {
  t6.set("false", false), t6.set("true", true), t6.set("none", null), t6.set("raise_exception", (e) => {
    throw new Error(e);
  }), t6.set("range", aM), t6.set("strftime_now", lM), t6.set("True", true), t6.set("False", false), t6.set("None", null);
}
function zi(t6) {
  return t6 instanceof Ve2 || t6 instanceof Tp;
}
function Pi(t6) {
  return t6 instanceof Q || t6 instanceof he || t6 instanceof X;
}
function Ni(t6) {
  return t6 instanceof X ? Number(t6.value) : t6.value;
}
function Eb(t6, e) {
  let s = e.split("."), r = t6;
  for (let n of s) if (zi(r)) r = r.value.get(n) ?? new be2();
  else if (r instanceof re) {
    let o = parseInt(n, 10);
    if (!isNaN(o) && o >= 0 && o < r.value.length) r = r.value[o];
    else return new be2();
  } else return new be2();
  return r;
}
function Op(t6, e, s = false) {
  if (t6 instanceof ve && e instanceof ve) return 0;
  if (t6 instanceof ve || e instanceof ve) throw new Error(`Cannot compare ${t6.type} with ${e.type}`);
  if (t6 instanceof be2 && e instanceof be2) return 0;
  if (t6 instanceof be2 || e instanceof be2) throw new Error(`Cannot compare ${t6.type} with ${e.type}`);
  if (Pi(t6) && Pi(e)) {
    let r = Ni(t6), n = Ni(e);
    return r < n ? -1 : r > n ? 1 : 0;
  }
  if (t6.type !== e.type) throw new Error(`Cannot compare different types: ${t6.type} and ${e.type}`);
  if (t6.type === "StringValue") {
    let r = t6.value, n = e.value;
    return s || (r = r.toLowerCase(), n = n.toLowerCase()), r < n ? -1 : r > n ? 1 : 0;
  } else throw new Error(`Cannot compare type: ${t6.type}`);
}
function Ip(t6) {
  if (t6.type === "Identifier") return { name: t6.value };
  let e = t6;
  return { name: e.key.value, defaultValue: e.value };
}
function Ab(t6) {
  return t6 === "kwargs" || t6 === "varargs";
}
function Mb(t6, e) {
  let s = /* @__PURE__ */ new Set(), r = /* @__PURE__ */ new Set(), n = (p) => {
    Ab(p) && s.add(p);
  }, o = (p) => {
    if (p.type === "Identifier") n(p.value);
    else if (p.type === "TupleLiteral") for (let u of p.value) o(u);
  }, a = (p) => {
    n(Ip(p).name);
  }, i = (p) => {
    for (let u of p) {
      let _ = Ip(u);
      _.defaultValue && c(_.defaultValue);
    }
  }, l = (p) => {
    p.type === "CallExpression" && c(p.args);
  }, c = (p) => {
    if (Array.isArray(p)) {
      for (let u of p) c(u);
      return;
    }
    if (p instanceof Map) {
      for (let [u, _] of p) c(u), c(_);
      return;
    }
    if (p instanceof nt2) switch (p.type) {
      case "For": {
        let u = p;
        if (o(u.loopvar), u.iterable.type === "SelectExpression") {
          let _ = u.iterable;
          c(_.lhs), c(u.body), c(u.defaultBlock), c(_.test);
          return;
        }
        c(u.iterable), c(u.body), c(u.defaultBlock);
        return;
      }
      case "Set": {
        let u = p;
        o(u.assignee), c(u.value), c(u.body);
        return;
      }
      case "Macro": {
        let u = p;
        for (let _ of u.args) a(_);
        i(u.args), c(u.body);
        return;
      }
      case "CallStatement": {
        let u = p;
        c(u.call);
        for (let _ of u.callerArgs ?? []) a(_);
        i(u.callerArgs ?? []), c(u.body);
        return;
      }
      case "FilterStatement": {
        let u = p;
        c(u.body), l(u.filter);
        return;
      }
      case "Identifier": {
        let u = p.value;
        Ab(u) && !s.has(u) && r.add(u);
        return;
      }
      case "MemberExpression": {
        let u = p;
        c(u.object), u.computed && c(u.property);
        return;
      }
      case "FilterExpression": {
        let u = p;
        c(u.operand), l(u.filter);
        return;
      }
      case "TestExpression":
        c(p.operand);
        return;
      case "SelectExpression": {
        let u = p;
        c(u.test), c(u.lhs);
        return;
      }
      case "KeywordArgumentExpression":
        c(p.value);
        return;
      default:
        for (let u of Object.values(p)) c(u);
    }
  };
  for (let p of t6) a(p);
  return c(e), r;
}
var hM = class {
  global;
  constructor(t6) {
    this.global = t6 ?? new $t();
  }
  run(t6) {
    return this.evaluate(t6, this.global);
  }
  evaluateBinaryExpression(t6, e) {
    let s = this.evaluate(t6.left, e);
    switch (t6.operator.value) {
      case "and":
        return s.__bool__().value ? this.evaluate(t6.right, e) : s;
      case "or":
        return s.__bool__().value ? s : this.evaluate(t6.right, e);
    }
    let r = this.evaluate(t6.right, e);
    switch (t6.operator.value) {
      case "==":
        return new X(s.value == r.value);
      case "!=":
        return new X(s.value != r.value);
    }
    if (s instanceof be2 || r instanceof be2) {
      if (r instanceof be2 && ["in", "not in"].includes(t6.operator.value)) return new X(t6.operator.value === "not in");
      throw new Error(`Cannot perform operation ${t6.operator.value} on undefined values`);
    } else {
      if (s instanceof ve || r instanceof ve) throw new Error("Cannot perform operation on null values");
      if (t6.operator.value === "~") return new F(s.value.toString() + r.value.toString());
      if (t6.operator.value === "**" && Pi(s) && Pi(r)) {
        let n = Ni(s), o = Ni(r);
        if (n === 0 && o < 0) throw new Error("0.0 cannot be raised to a negative power");
        let a = n ** o;
        if (!Number.isFinite(a)) throw new Error("Exponentiation result is not a finite real number");
        return s instanceof he || r instanceof he || o < 0 ? new he(a) : new Q(a);
      } else if ((s instanceof Q || s instanceof he) && (r instanceof Q || r instanceof he)) {
        let n = s.value, o = r.value;
        switch (t6.operator.value) {
          case "+":
          case "-":
          case "*": {
            let a = t6.operator.value === "+" ? n + o : t6.operator.value === "-" ? n - o : n * o;
            return s instanceof he || r instanceof he ? new he(a) : new Q(a);
          }
          case "/":
            return new he(n / o);
          case "//": {
            let a = Math.floor(n / o);
            return s instanceof he || r instanceof he ? new he(a) : new Q(a);
          }
          case "%": {
            let a = n % o;
            return s instanceof he || r instanceof he ? new he(a) : new Q(a);
          }
          case "<":
            return new X(n < o);
          case ">":
            return new X(n > o);
          case ">=":
            return new X(n >= o);
          case "<=":
            return new X(n <= o);
        }
      } else if (s instanceof re && r instanceof re) {
        if (t6.operator.value === "+") return new re(s.value.concat(r.value));
      } else if (r instanceof re) {
        let n = r.value.find((o) => o.value === s.value) !== void 0;
        switch (t6.operator.value) {
          case "in":
            return new X(n);
          case "not in":
            return new X(!n);
        }
      }
    }
    if ((s instanceof F || r instanceof F) && t6.operator.value === "+") return new F(s.value.toString() + r.value.toString());
    if (s instanceof F && r instanceof F) switch (t6.operator.value) {
      case "in":
        return new X(r.value.includes(s.value));
      case "not in":
        return new X(!r.value.includes(s.value));
    }
    if (s instanceof F && r instanceof Ve2) switch (t6.operator.value) {
      case "in":
        return new X(r.value.has(s.value));
      case "not in":
        return new X(!r.value.has(s.value));
    }
    throw new SyntaxError(`Unknown operator "${t6.operator.value}" between ${s.type} and ${r.type}`);
  }
  evaluateArguments(t6, e) {
    let s = [], r = /* @__PURE__ */ new Map(), n = (o, a) => {
      if (r.has(o)) throw new Error(`Got multiple values for keyword argument '${o}'`);
      r.set(o, a);
    };
    for (let o of t6) if (o.type === "SpreadExpression") {
      let a = o, i = this.evaluate(a.argument, e);
      if (!(i instanceof re)) throw new Error(`Cannot unpack non-iterable type: ${i.type}`);
      for (let l of i.value) s.push(l);
    } else o.type !== "KeywordArgumentExpression" && o.type !== "KeywordSpreadExpression" && s.push(this.evaluate(o, e));
    for (let o of t6) if (o.type === "KeywordArgumentExpression") {
      let a = o;
      n(a.key.value, this.evaluate(a.value, e));
    } else if (o.type === "KeywordSpreadExpression") {
      let a = o, i = this.evaluate(a.argument, e);
      if (!(i instanceof Ve2)) throw new Error(`Argument after ** must be a mapping, not ${i.type}`);
      for (let [l, c] of i.value) n(l, c);
    }
    return [s, r];
  }
  applyFilter(t6, e, s) {
    if (e.type === "Identifier") {
      let r = e;
      if (r.value === "safe") return t6;
      if (r.value === "tojson") return new F(Rt(t6, {}));
      if (t6 instanceof re) switch (r.value) {
        case "list":
          return t6;
        case "first":
          return t6.value[0];
        case "last":
          return t6.value[t6.value.length - 1];
        case "length":
          return new Q(t6.value.length);
        case "reverse":
          return new re(t6.value.slice().reverse());
        case "sort":
          return new re(t6.value.slice().sort((n, o) => Op(n, o, false)));
        case "join":
          return new F(t6.value.map((n) => n.value).join(""));
        case "string":
          return new F(Rt(t6, {}, 0, false));
        case "unique": {
          let n = /* @__PURE__ */ new Set(), o = [];
          for (let a of t6.value) n.has(a.value) || (n.add(a.value), o.push(a));
          return new re(o);
        }
        default:
          throw new Error(`Unknown ArrayValue filter: ${r.value}`);
      }
      else if (t6 instanceof F) switch (r.value) {
        case "length":
        case "upper":
        case "lower":
        case "title":
        case "capitalize": {
          let n = t6.builtins.get(r.value);
          if (n instanceof ke) return n.value([], s);
          if (n instanceof Q) return n;
          throw new Error(`Unknown StringValue filter: ${r.value}`);
        }
        case "trim":
          return new F(t6.value.trim());
        case "indent":
          return new F(t6.value.split(`
`).map((n, o) => o === 0 || n.length === 0 ? n : "    " + n).join(`
`));
        case "join":
        case "string":
          return t6;
        case "int": {
          let n = parseInt(t6.value, 10);
          return new Q(isNaN(n) ? 0 : n);
        }
        case "float": {
          let n = parseFloat(t6.value);
          return new he(isNaN(n) ? 0 : n);
        }
        default:
          throw new Error(`Unknown StringValue filter: ${r.value}`);
      }
      else if (t6 instanceof Q || t6 instanceof he) switch (r.value) {
        case "abs":
          return t6 instanceof Q ? new Q(Math.abs(t6.value)) : new he(Math.abs(t6.value));
        case "int":
          return new Q(Math.floor(t6.value));
        case "float":
          return new he(t6.value);
        case "string":
          return new F(t6.toString());
        default:
          throw new Error(`Unknown NumericValue filter: ${r.value}`);
      }
      else if (t6 instanceof Ve2) switch (r.value) {
        case "items":
          return new re(Array.from(t6.value.entries()).map(([n, o]) => new re([new F(n), o])));
        case "length":
          return new Q(t6.value.size);
        default: {
          let n = t6.builtins.get(r.value);
          if (n) return n instanceof ke ? n.value([], s) : n;
          throw new Error(`Unknown ObjectValue filter: ${r.value}`);
        }
      }
      else if (t6 instanceof X) switch (r.value) {
        case "bool":
          return new X(t6.value);
        case "int":
          return new Q(t6.value ? 1 : 0);
        case "float":
          return new he(t6.value ? 1 : 0);
        case "string":
          return new F(t6.value ? "true" : "false");
        default:
          throw new Error(`Unknown BooleanValue filter: ${r.value}`);
      }
      throw new Error(`Cannot apply filter "${r.value}" to type: ${t6.type}`);
    } else if (e.type === "CallExpression") {
      let r = e;
      if (r.callee.type !== "Identifier") throw new Error(`Unknown filter: ${r.callee.type}`);
      let n = r.callee.value;
      if (n === "tojson") {
        let [, o] = this.evaluateArguments(r.args, s), a = o.get("indent") ?? new ve();
        if (!(a instanceof Q || a instanceof ve)) throw new Error("If set, indent must be a number");
        let i = o.get("ensure_ascii") ?? new X(false);
        if (!(i instanceof X)) throw new Error("If set, ensure_ascii must be a boolean");
        let l = o.get("sort_keys") ?? new X(false);
        if (!(l instanceof X)) throw new Error("If set, sort_keys must be a boolean");
        let c = o.get("separators") ?? new ve(), p = null;
        if (c instanceof re || c instanceof vb) {
          if (c.value.length !== 2) throw new Error("separators must be a tuple of two strings");
          let [u, _] = c.value;
          if (!(u instanceof F) || !(_ instanceof F)) throw new Error("separators must be a tuple of two strings");
          p = [u.value, _.value];
        } else if (!(c instanceof ve)) throw new Error("If set, separators must be a tuple of two strings");
        return new F(Rt(t6, { indent: a.value, ensureAscii: i.value, sortKeys: l.value, separators: p }));
      } else if (n === "join") {
        let o;
        if (t6 instanceof F) o = Array.from(t6.value);
        else if (t6 instanceof re) o = t6.value.map((c) => c.value);
        else throw new Error(`Cannot apply filter "${n}" to type: ${t6.type}`);
        let [a, i] = this.evaluateArguments(r.args, s), l = a.at(0) ?? i.get("separator") ?? new F("");
        if (!(l instanceof F)) throw new Error("separator must be a string");
        return new F(o.join(l.value));
      } else if (n === "int" || n === "float") {
        let [o, a] = this.evaluateArguments(r.args, s), i = o.at(0) ?? a.get("default") ?? (n === "int" ? new Q(0) : new he(0));
        if (t6 instanceof F) {
          let l = n === "int" ? parseInt(t6.value, 10) : parseFloat(t6.value);
          return isNaN(l) ? i : n === "int" ? new Q(l) : new he(l);
        } else {
          if (t6 instanceof Q || t6 instanceof he) return t6;
          if (t6 instanceof X) return n === "int" ? new Q(t6.value ? 1 : 0) : new he(t6.value ? 1 : 0);
          throw new Error(`Cannot apply filter "${n}" to type: ${t6.type}`);
        }
      } else if (n === "default") {
        let [o, a] = this.evaluateArguments(r.args, s), i = o[0] ?? new F(""), l = o[1] ?? a.get("boolean") ?? new X(false);
        if (!(l instanceof X)) throw new Error("`default` filter flag must be a boolean");
        return t6 instanceof be2 || l.value && !t6.__bool__().value ? i : t6;
      }
      if (t6 instanceof re) {
        switch (n) {
          case "sort": {
            let [o, a] = this.evaluateArguments(r.args, s), i = o.at(0) ?? a.get("reverse") ?? new X(false);
            if (!(i instanceof X)) throw new Error("reverse must be a boolean");
            let l = o.at(1) ?? a.get("case_sensitive") ?? new X(false);
            if (!(l instanceof X)) throw new Error("case_sensitive must be a boolean");
            let c = o.at(2) ?? a.get("attribute") ?? new ve();
            if (!(c instanceof F || c instanceof Q || c instanceof ve)) throw new Error("attribute must be a string, integer, or null");
            let p = (u) => {
              if (c instanceof ve) return u;
              let _ = c instanceof Q ? String(c.value) : c.value;
              return Eb(u, _);
            };
            return new re(t6.value.slice().sort((u, _) => {
              let d = p(u), f = p(_), m = Op(d, f, l.value);
              return i.value ? -m : m;
            }));
          }
          case "selectattr":
          case "rejectattr": {
            let o = n === "selectattr";
            if (t6.value.some((u) => !zi(u))) throw new Error(`\`${n}\` can only be applied to array of objects`);
            if (r.args.some((u) => u.type !== "StringLiteral")) throw new Error(`arguments of \`${n}\` must be strings`);
            let [a, i, l] = r.args.map((u) => this.evaluate(u, s)), c;
            if (i) {
              let u = s.tests.get(i.value);
              if (!u) throw new Error(`Unknown test: ${i.value}`);
              c = u;
            } else c = (...u) => u[0].__bool__().value;
            let p = t6.value.filter((u) => {
              let _ = u.value.get(a.value), d = _ ? c(_, l) : false;
              return o ? d : !d;
            });
            return new re(p);
          }
          case "map": {
            let [, o] = this.evaluateArguments(r.args, s);
            if (o.has("attribute")) {
              let a = o.get("attribute");
              if (!(a instanceof F)) throw new Error("attribute must be a string");
              let i = o.get("default"), l = t6.value.map((c) => {
                if (!zi(c)) throw new Error("items in map must be an object");
                let p = Eb(c, a.value);
                return p instanceof be2 ? i ?? new be2() : p;
              });
              return new re(l);
            } else throw new Error("`map` expressions without `attribute` set are not currently supported.");
          }
        }
        throw new Error(`Unknown ArrayValue filter: ${n}`);
      } else if (t6 instanceof F) {
        switch (n) {
          case "indent": {
            let [o, a] = this.evaluateArguments(r.args, s), i = o.at(0) ?? a.get("width") ?? new Q(4);
            if (!(i instanceof Q)) throw new Error("width must be a number");
            let l = o.at(1) ?? a.get("first") ?? new X(false), c = o.at(2) ?? a.get("blank") ?? new X(false), p = t6.value.split(`
`), u = " ".repeat(i.value), _ = p.map((d, f) => !l.value && f === 0 || !c.value && d.length === 0 ? d : u + d);
            return new F(_.join(`
`));
          }
          case "replace": {
            let o = t6.builtins.get("replace");
            if (!(o instanceof ke)) throw new Error("replace filter not available");
            let [a, i] = this.evaluateArguments(r.args, s);
            return o.value([...a, new ds2(i)], s);
          }
        }
        throw new Error(`Unknown StringValue filter: ${n}`);
      } else if (t6 instanceof Ve2) {
        let o = t6.builtins.get(n);
        if (o && o instanceof ke) {
          let [a, i] = this.evaluateArguments(r.args, s);
          return i.size > 0 && a.push(new ds2(i)), o.value(a, s);
        }
        throw new Error(`Unknown ObjectValue filter: ${n}`);
      } else throw new Error(`Cannot apply filter "${n}" to type: ${t6.type}`);
    }
    throw new Error(`Unknown filter: ${e.type}`);
  }
  evaluateFilterExpression(t6, e) {
    let s = this.evaluate(t6.operand, e);
    return this.applyFilter(s, t6.filter, e);
  }
  evaluateTestExpression(t6, e) {
    let s = this.evaluate(t6.operand, e), r = e.tests.get(t6.test.value);
    if (!r) throw new Error(`Unknown test: ${t6.test.value}`);
    let n = r(s);
    return new X(t6.negate ? !n : n);
  }
  evaluateSelectExpression(t6, e) {
    return this.evaluate(t6.test, e).__bool__().value ? this.evaluate(t6.lhs, e) : new be2();
  }
  evaluateUnaryExpression(t6, e) {
    let s = this.evaluate(t6.argument, e);
    switch (t6.operator.value) {
      case "not":
        return new X(!s.value);
      case "+":
      case "-": {
        let r = t6.operator.value === "-" ? -1 : 1;
        if (s instanceof Q || s instanceof he || s instanceof X) {
          let n = s instanceof X ? s.value ? 1 : 0 : s.value, o = r * n;
          return s instanceof he ? new he(o) : new Q(o);
        }
        throw new SyntaxError(`Unknown operator "${t6.operator.value}" for ${s.type}`);
      }
      default:
        throw new SyntaxError(`Unknown operator: ${t6.operator.value}`);
    }
  }
  evaluateTernaryExpression(t6, e) {
    return this.evaluate(t6.condition, e).__bool__().value ? this.evaluate(t6.trueExpr, e) : this.evaluate(t6.falseExpr, e);
  }
  evalProgram(t6, e) {
    return this.evaluateBlock(t6.body, e);
  }
  evaluateBlock(t6, e) {
    let s = "";
    for (let r of t6) {
      let n = this.evaluate(r, e);
      n.type !== "NullValue" && n.type !== "UndefinedValue" && (s += n.toString());
    }
    return new F(s);
  }
  evaluateIdentifier(t6, e) {
    return e.lookupVariable(t6.value);
  }
  evaluateCallExpression(t6, e) {
    let [s, r] = this.evaluateArguments(t6.args, e);
    r.size > 0 && s.push(new ds2(r));
    let n = this.evaluate(t6.callee, e);
    if (n.type !== "FunctionValue") throw new Error(`Cannot call something that is not a function: got ${n.type}`);
    return n.value(s, e);
  }
  evaluateSliceExpression(t6, e, s) {
    if (!(t6 instanceof re || t6 instanceof F)) throw new Error("Slice object must be an array or string");
    let r = this.evaluate(e.start, s), n = this.evaluate(e.stop, s), o = this.evaluate(e.step, s);
    if (!(r instanceof Q || r instanceof be2)) throw new Error("Slice start must be numeric or undefined");
    if (!(n instanceof Q || n instanceof be2)) throw new Error("Slice stop must be numeric or undefined");
    if (!(o instanceof Q || o instanceof be2)) throw new Error("Slice step must be numeric or undefined");
    return t6 instanceof re ? new re(wb(t6.value, r.value, n.value, o.value)) : new F(wb(Array.from(t6.value), r.value, n.value, o.value).join(""));
  }
  evaluateMemberExpression(t6, e) {
    let s = this.evaluate(t6.object, e), r;
    if (t6.computed) {
      if (t6.property.type === "SliceExpression") return this.evaluateSliceExpression(s, t6.property, e);
      r = this.evaluate(t6.property, e);
    } else t6.property.type === "IntegerLiteral" ? r = new Q(t6.property.value) : r = new F(t6.property.value);
    let n;
    if (zi(s)) {
      if (!(r instanceof F)) throw new Error(`Cannot access property with non-string: got ${r.type}`);
      n = s.value.get(r.value) ?? (s instanceof Ve2 ? s.builtins.get(r.value) : void 0);
    } else if (s instanceof re || s instanceof F) if (r instanceof Q) n = s.value.at(r.value), s instanceof F && (n = new F(s.value.at(r.value)));
    else if (r instanceof F) n = s.builtins.get(r.value);
    else throw new Error(`Cannot access property with non-string/non-number: got ${r.type}`);
    else {
      if (!(r instanceof F)) throw new Error(`Cannot access property with non-string: got ${r.type}`);
      n = s.builtins.get(r.value);
    }
    return n instanceof _t ? n : new be2();
  }
  evaluateSet(t6, e) {
    let s = t6.value ? this.evaluate(t6.value, e) : this.evaluateBlock(t6.body, e);
    if (t6.assignee.type === "Identifier") {
      let r = t6.assignee.value;
      e.setVariable(r, s);
    } else if (t6.assignee.type === "TupleLiteral") {
      let r = t6.assignee;
      if (!(s instanceof re)) throw new Error(`Cannot unpack non-iterable type in set: ${s.type}`);
      let n = s.value;
      if (n.length !== r.value.length) throw new Error(`Too ${r.value.length > n.length ? "few" : "many"} items to unpack in set`);
      for (let o = 0; o < r.value.length; ++o) {
        let a = r.value[o];
        if (a.type !== "Identifier") throw new Error(`Cannot unpack to non-identifier in set: ${a.type}`);
        e.setVariable(a.value, n[o]);
      }
    } else if (t6.assignee.type === "MemberExpression") {
      let r = t6.assignee, n = this.evaluate(r.object, e);
      if (!(n instanceof Tp)) throw new Error("cannot assign attribute on non-namespace object");
      if (r.property.type !== "Identifier") throw new Error("Cannot assign to member with non-identifier property");
      n.value.set(r.property.value, s);
    } else throw new Error(`Invalid LHS inside assignment expression: ${JSON.stringify(t6.assignee)}`);
    return new ve();
  }
  evaluateIf(t6, e) {
    let s = this.evaluate(t6.test, e);
    return this.evaluateBlock(s.__bool__().value ? t6.body : t6.alternate, e);
  }
  evaluateFor(t6, e) {
    let s = new $t(e), r, n;
    if (t6.iterable.type === "SelectExpression") {
      let c = t6.iterable;
      n = this.evaluate(c.lhs, s), r = c.test;
    } else n = this.evaluate(t6.iterable, s);
    if (!(n instanceof re || n instanceof Ve2)) throw new Error(`Expected iterable or object type in for loop: got ${n.type}`);
    n instanceof Ve2 && (n = n.keys());
    let o = [], a = [];
    for (let c = 0; c < n.value.length; ++c) {
      let p = new $t(s), u = n.value[c], _;
      if (t6.loopvar.type === "Identifier") _ = (d) => d.setVariable(t6.loopvar.value, u);
      else if (t6.loopvar.type === "TupleLiteral") {
        let d = t6.loopvar;
        if (u.type !== "ArrayValue") throw new Error(`Cannot unpack non-iterable type: ${u.type}`);
        let f = u;
        if (d.value.length !== f.value.length) throw new Error(`Too ${d.value.length > f.value.length ? "few" : "many"} items to unpack`);
        _ = (m) => {
          for (let g = 0; g < d.value.length; ++g) {
            if (d.value[g].type !== "Identifier") throw new Error(`Cannot unpack non-identifier type: ${d.value[g].type}`);
            m.setVariable(d.value[g].value, f.value[g]);
          }
        };
      } else throw new Error(`Invalid loop variable(s): ${t6.loopvar.type}`);
      r && (_(p), !this.evaluate(r, p).__bool__().value) || (o.push(u), a.push(_));
    }
    let i = "", l = true;
    for (let c = 0; c < o.length; ++c) {
      let p = /* @__PURE__ */ new Map([["index", new Q(c + 1)], ["index0", new Q(c)], ["revindex", new Q(o.length - c)], ["revindex0", new Q(o.length - c - 1)], ["first", new X(c === 0)], ["last", new X(c === o.length - 1)], ["length", new Q(o.length)], ["previtem", c > 0 ? o[c - 1] : new be2()], ["nextitem", c < o.length - 1 ? o[c + 1] : new be2()]]);
      s.setVariable("loop", new Ve2(p)), a[c](s);
      try {
        let u = this.evaluateBlock(t6.body, s);
        i += u.value;
      } catch (u) {
        if (u instanceof bb) continue;
        if (u instanceof yb) break;
        throw u;
      }
      l = false;
    }
    if (l) {
      let c = this.evaluateBlock(t6.defaultBlock, s);
      i += c.value;
    }
    return new F(i);
  }
  bindMacroArguments(t6, e, s, r, n) {
    let o = r.slice(), a = /* @__PURE__ */ new Map();
    o.at(-1) instanceof ds2 && (a = new Map(o.pop().value));
    let i = [];
    for (let l = 0; l < e.length; ++l) {
      let { name: c, defaultValue: p } = Ip(e[l]), u = o[l];
      u === void 0 && a.has(c) && (u = a.get(c), a.delete(c)), u === void 0 && p !== void 0 && i.push([c, p]), n.setVariable(c, u ?? new be2());
    }
    if (s.has("kwargs")) n.setVariable("kwargs", new Ve2(a));
    else if (a.size > 0) throw new Error(`macro ${t6} takes no keyword argument '${a.keys().next().value}'`);
    if (s.has("varargs")) n.setVariable("varargs", new re(o.slice(e.length)));
    else if (o.length > e.length) throw new Error(`macro ${t6} takes not more than ${e.length} argument(s)`);
    for (let [l, c] of i) n.setVariable(l, this.evaluate(c, n));
  }
  evaluateMacro(t6, e) {
    let s = Mb(t6.args, t6.body);
    return e.setVariable(t6.name.value, new ke((r, n) => {
      let o = new $t(n);
      return this.bindMacroArguments(`'${t6.name.value}'`, t6.args, s, r, o), this.evaluateBlock(t6.body, o);
    })), new ve();
  }
  evaluateCallStatement(t6, e) {
    let s = t6.callerArgs ?? [], r = Mb(s, t6.body), n = new ke((c) => {
      let p = new $t(e);
      return this.bindMacroArguments("None", s, r, c, p), this.evaluateBlock(t6.body, p);
    }), [o, a] = this.evaluateArguments(t6.call.args, e);
    o.push(new ds2(a));
    let i = this.evaluate(t6.call.callee, e);
    if (i.type !== "FunctionValue") throw new Error(`Cannot call something that is not a function: got ${i.type}`);
    let l = new $t(e);
    return l.setVariable("caller", n), i.value(o, l);
  }
  evaluateFilterStatement(t6, e) {
    let s = this.evaluateBlock(t6.body, e);
    return this.applyFilter(s, t6.filter, e);
  }
  evaluate(t6, e) {
    if (!t6) return new be2();
    switch (t6.type) {
      case "Program":
        return this.evalProgram(t6, e);
      case "Set":
        return this.evaluateSet(t6, e);
      case "If":
        return this.evaluateIf(t6, e);
      case "For":
        return this.evaluateFor(t6, e);
      case "Macro":
        return this.evaluateMacro(t6, e);
      case "CallStatement":
        return this.evaluateCallStatement(t6, e);
      case "Break":
        throw new yb();
      case "Continue":
        throw new bb();
      case "IntegerLiteral":
        return new Q(t6.value);
      case "FloatLiteral":
        return new he(t6.value);
      case "StringLiteral":
        return new F(t6.value);
      case "ArrayLiteral":
        return new re(t6.value.map((s) => this.evaluate(s, e)));
      case "TupleLiteral":
        return new vb(t6.value.map((s) => this.evaluate(s, e)));
      case "ObjectLiteral": {
        let s = /* @__PURE__ */ new Map();
        for (let [r, n] of t6.value) {
          let o = this.evaluate(r, e);
          if (!(o instanceof F)) throw new Error(`Object keys must be strings: got ${o.type}`);
          s.set(o.value, this.evaluate(n, e));
        }
        return new Ve2(s);
      }
      case "Identifier":
        return this.evaluateIdentifier(t6, e);
      case "CallExpression":
        return this.evaluateCallExpression(t6, e);
      case "MemberExpression":
        return this.evaluateMemberExpression(t6, e);
      case "UnaryExpression":
        return this.evaluateUnaryExpression(t6, e);
      case "BinaryExpression":
        return this.evaluateBinaryExpression(t6, e);
      case "FilterExpression":
        return this.evaluateFilterExpression(t6, e);
      case "FilterStatement":
        return this.evaluateFilterStatement(t6, e);
      case "TestExpression":
        return this.evaluateTestExpression(t6, e);
      case "SelectExpression":
        return this.evaluateSelectExpression(t6, e);
      case "Ternary":
        return this.evaluateTernaryExpression(t6, e);
      case "Comment":
        return new ve();
      default:
        throw new SyntaxError(`Unknown node type: ${t6.type}`);
    }
  }
};
function Ci(t6) {
  switch (typeof t6) {
    case "number":
      return Number.isInteger(t6) ? new Q(t6) : new he(t6);
    case "string":
      return new F(t6);
    case "boolean":
      return new X(t6);
    case "undefined":
      return new be2();
    case "object":
      return t6 === null ? new ve() : Array.isArray(t6) ? new re(t6.map(Ci)) : new Ve2(new Map(Object.entries(t6).map(([e, s]) => [e, Ci(s)])));
    case "function":
      return new ke((e, s) => {
        let r = t6(...e.map((n) => n.value)) ?? null;
        return Ci(r);
      });
    default:
      throw new Error(`Cannot convert to runtime value: ${t6}`);
  }
}
var Pe = `
`;
var gM = "{%- ";
var xM = " -%}";
var Me = Object.freeze({ CONDITIONAL: 0, LOGICAL_OR: 1, LOGICAL_AND: 2, LOGICAL_NOT: 3, COMPARISON: 4, ADDITIVE: 5, MULTIPLICATIVE: 6, EXPONENTIATION: 7, TEST: 8, FILTER: 9, UNARY_SIGN: 10, ATOM: 11 });
function Ob(t6) {
  switch (t6.operator.type) {
    case "ExponentiationBinaryOperator":
      return Me.EXPONENTIATION;
    case "MultiplicativeBinaryOperator":
      return Me.MULTIPLICATIVE;
    case "AdditiveBinaryOperator":
      return Me.ADDITIVE;
    case "ComparisonBinaryOperator":
      return Me.COMPARISON;
    case "Identifier":
      return t6.operator.value === "and" ? Me.LOGICAL_AND : t6.operator.value === "in" || t6.operator.value === "not in" ? Me.COMPARISON : Me.LOGICAL_OR;
  }
  return Me.LOGICAL_OR;
}
function Ib(t6) {
  switch (t6.type) {
    case "SelectExpression":
    case "Ternary":
      return Me.CONDITIONAL;
    case "BinaryExpression":
      return Ob(t6);
    case "UnaryExpression":
      return t6.operator.value === "not" ? Me.LOGICAL_NOT : Me.UNARY_SIGN;
    case "TestExpression":
      return Me.TEST;
    case "FilterExpression":
      return Me.FILTER;
    default:
      return Me.ATOM;
  }
}
function pt(t6, e) {
  let s = Ee2(t6);
  return Ib(t6) < e ? `(${s})` : s;
}
function wM(t6, e = "	") {
  let s = typeof e == "number" ? " ".repeat(e) : e;
  return ut2(t6.body, 0, s).replace(/\n$/, "");
}
function je2(...t6) {
  return gM + t6.join(" ") + xM;
}
function ut2(t6, e, s) {
  return t6.map((r) => yM(r, e, s)).join(Pe);
}
function Li(t6) {
  return t6.map((e) => Ee2(e)).join(", ");
}
function yM(t6, e, s) {
  let r = s.repeat(e);
  switch (t6.type) {
    case "Program":
      return ut2(t6.body, e, s);
    case "If":
      return bM(t6, e, s);
    case "For":
      return kM(t6, e, s);
    case "Set":
      return vM(t6, e, s);
    case "Macro":
      return EM(t6, e, s);
    case "Break":
      return r + je2("break");
    case "Continue":
      return r + je2("continue");
    case "CallStatement":
      return AM(t6, e, s);
    case "FilterStatement":
      return MM(t6, e, s);
    case "Comment":
      return r + "{# " + t6.value + " #}";
    default:
      return r + "{{- " + Ee2(t6) + " -}}";
  }
}
function bM(t6, e, s) {
  let r = s.repeat(e), n = [], o = t6;
  for (; o && (n.push({ test: o.test, body: o.body }), o.alternate.length === 1 && o.alternate[0].type === "If"); ) o = o.alternate[0];
  let a = r + je2("if", Ee2(n[0].test)) + Pe + ut2(n[0].body, e + 1, s);
  for (let i = 1; i < n.length; ++i) a += Pe + r + je2("elif", Ee2(n[i].test)) + Pe + ut2(n[i].body, e + 1, s);
  return o && o.alternate.length > 0 && (a += Pe + r + je2("else") + Pe + ut2(o.alternate, e + 1, s)), a += Pe + r + je2("endif"), a;
}
function kM(t6, e, s) {
  let r = s.repeat(e), n = "";
  if (t6.iterable.type === "SelectExpression") {
    let a = t6.iterable;
    n = `${Ee2(a.lhs)} if ${Ee2(a.test)}`;
  } else n = Ee2(t6.iterable);
  let o = r + je2("for", Ee2(t6.loopvar), "in", n) + Pe + ut2(t6.body, e + 1, s);
  return t6.defaultBlock.length > 0 && (o += Pe + r + je2("else") + Pe + ut2(t6.defaultBlock, e + 1, s)), o += Pe + r + je2("endfor"), o;
}
function vM(t6, e, s) {
  let r = s.repeat(e), n = Ee2(t6.assignee), o = t6.value ? Ee2(t6.value) : "", a = r + je2("set", `${n}${t6.value ? " = " + o : ""}`);
  return t6.body.length === 0 ? a : a + Pe + ut2(t6.body, e + 1, s) + Pe + r + je2("endset");
}
function EM(t6, e, s) {
  let r = s.repeat(e), n = Li(t6.args);
  return r + je2("macro", `${t6.name.value}(${n})`) + Pe + ut2(t6.body, e + 1, s) + Pe + r + je2("endmacro");
}
function AM(t6, e, s) {
  let r = s.repeat(e), n = t6.callerArgs && t6.callerArgs.length > 0 ? `(${Li(t6.callerArgs)})` : "", o = Ee2(t6.call), a = r + je2(`call${n}`, o) + Pe;
  return a += ut2(t6.body, e + 1, s) + Pe, a += r + je2("endcall"), a;
}
function MM(t6, e, s) {
  let r = s.repeat(e), n = t6.filter.type === "Identifier" ? t6.filter.value : Ee2(t6.filter), o = r + je2("filter", n) + Pe;
  return o += ut2(t6.body, e + 1, s) + Pe, o += r + je2("endfilter"), o;
}
function Ee2(t6) {
  switch (t6.type) {
    case "SpreadExpression":
      return `*${Ee2(t6.argument)}`;
    case "KeywordSpreadExpression":
      return `**${Ee2(t6.argument)}`;
    case "Identifier":
      return t6.value;
    case "IntegerLiteral":
      return `${t6.value}`;
    case "FloatLiteral": {
      let e = t6.value;
      return Object.is(e, -0) ? "-0.0" : e % 1 === 0 ? e.toFixed(1) : e.toString();
    }
    case "StringLiteral":
      return JSON.stringify(t6.value);
    case "BinaryExpression": {
      let e = t6, s = Ob(e), r = pt(e.left, s), n = pt(e.right, s + 1);
      return `${r} ${e.operator.value} ${n}`;
    }
    case "UnaryExpression": {
      let e = t6, s = e.argument.type === "UnaryExpression" ? Ib(e) : Me.ATOM;
      return e.operator.value + (e.operator.value === "not" ? " " : "") + pt(e.argument, s);
    }
    case "CallExpression": {
      let e = t6, s = Li(e.args);
      return `${Ee2(e.callee)}(${s})`;
    }
    case "MemberExpression": {
      let e = t6, s = pt(e.object, Me.ATOM), r = Ee2(e.property);
      return !e.computed && e.property.type !== "Identifier" && e.property.type !== "IntegerLiteral" && (r = `(${r})`), e.computed ? `${s}[${r}]` : `${s}.${r}`;
    }
    case "FilterExpression": {
      let e = t6, s = pt(e.operand, Me.FILTER);
      return e.filter.type === "CallExpression" ? `${s} | ${Ee2(e.filter)}` : `${s} | ${e.filter.value}`;
    }
    case "SelectExpression": {
      let e = t6;
      return `${pt(e.lhs, Me.LOGICAL_OR)} if ${pt(e.test, Me.LOGICAL_OR)}`;
    }
    case "TestExpression": {
      let e = t6;
      return `${pt(e.operand, Me.TEST)} is${e.negate ? " not" : ""} ${e.test.value}`;
    }
    case "ArrayLiteral":
    case "TupleLiteral": {
      let e = Li(t6.value), s = t6.type === "ArrayLiteral" ? "[]" : "()";
      return `${s[0]}${e}${s[1]}`;
    }
    case "ObjectLiteral":
      return `{${Array.from(t6.value.entries()).map(([s, r]) => `${Ee2(s)}: ${Ee2(r)}`).join(", ")}}`;
    case "SliceExpression": {
      let e = t6, s = e.start ? Ee2(e.start) : "", r = e.stop ? Ee2(e.stop) : "", n = e.step ? `:${Ee2(e.step)}` : "";
      return `${s}:${r}${n}`;
    }
    case "KeywordArgumentExpression": {
      let e = t6;
      return `${e.key.value}=${Ee2(e.value)}`;
    }
    case "Ternary": {
      let e = t6;
      return `${pt(e.trueExpr, Me.LOGICAL_OR)} if ${pt(e.condition, Me.LOGICAL_OR)} else ${pt(e.falseExpr, Me.CONDITIONAL)}`;
    }
    default:
      throw new Error(`Unknown expression type: ${t6.type}`);
  }
}
var Tb = class {
  parsed;
  constructor(t6) {
    let e = $A(t6, { lstrip_blocks: true, trim_blocks: true });
    this.parsed = oM(e);
  }
  render(t6) {
    let e = new $t();
    if (mM(e), t6) for (let [n, o] of Object.entries(t6)) e.set(n, o);
    return new hM(e).run(this.parsed).value;
  }
  format(t6) {
    return wM(this.parsed, t6?.indent || "	");
  }
};
var SM = { txt: "text/plain", html: "text/html", css: "text/css", js: "text/javascript", json: "application/json", png: "image/png", jpg: "image/jpeg", jpeg: "image/jpeg", gif: "image/gif" };
var Ft = class t {
  constructor(e) {
    if (this.filePath = e, this.headers = new Headers(), this.exists = qe.existsSync(e), this.exists) {
      this.status = 200, this.statusText = "OK";
      let s = qe.statSync(e);
      this.headers.set("content-length", s.size.toString()), this.updateContentType();
      let r = qe.createReadStream(e);
      this.body = new ReadableStream({ start(n) {
        r.on("data", (o) => n.enqueue(o)), r.on("end", () => n.close()), r.on("error", (o) => n.error(o));
      }, cancel() {
        r.destroy();
      } });
    } else this.status = 404, this.statusText = "Not Found", this.body = null;
  }
  updateContentType() {
    let e = this.filePath.toString().split(".").pop().toLowerCase();
    this.headers.set("content-type", SM[e] ?? "application/octet-stream");
  }
  clone() {
    let e = new t(this.filePath);
    return e.exists = this.exists, e.status = this.status, e.statusText = this.statusText, e.headers = new Headers(this.headers), e;
  }
  async arrayBuffer() {
    return (await qe.promises.readFile(this.filePath)).buffer;
  }
  async blob() {
    let e = await qe.promises.readFile(this.filePath);
    return new Blob([e], { type: this.headers.get("content-type") });
  }
  async text() {
    return await qe.promises.readFile(this.filePath, "utf8");
  }
  async json() {
    return JSON.parse(await this.text());
  }
};
var Dt2 = class {
  constructor(e) {
    this._mt = new Uint32Array(624), this._idx = 625, this._gauss_next = null, this._random_fn = this.random.bind(this), this.seed(e);
  }
  seed(e) {
    if (e == null) if (H.IS_CRYPTO_AVAILABLE) {
      let i = new Uint32Array(1);
      crypto.getRandomValues(i), e = i[0];
    } else e = Date.now() >>> 0;
    let s = this._mt, r = (i, l) => Math.imul(i, l) >>> 0, n = [];
    for (let i = e || 0; i > 0; i = Math.floor(i / 4294967296)) n.push(i & 4294967295);
    n.length || n.push(0), s[0] = 19650218;
    for (let i = 1; i < 624; ++i) s[i] = r(1812433253, s[i - 1] ^ s[i - 1] >>> 30) + i >>> 0;
    let o = 1, a = 0;
    for (let i = Math.max(624, n.length); i > 0; --i, ++o, ++a) o >= 624 && (s[0] = s[623], o = 1), a >= n.length && (a = 0), s[o] = (s[o] ^ r(s[o - 1] ^ s[o - 1] >>> 30, 1664525)) + n[a] + a >>> 0;
    for (let i = 623; i > 0; --i, ++o) o >= 624 && (s[0] = s[623], o = 1), s[o] = (s[o] ^ r(s[o - 1] ^ s[o - 1] >>> 30, 1566083941)) - o >>> 0;
    s[0] = 2147483648, this._idx = 624, this._gauss_next = null;
  }
  _int32() {
    let e = this._mt;
    if (this._idx >= 624) {
      for (let r = 0; r < 624; ++r) {
        let n = e[r] & 2147483648 | e[(r + 1) % 624] & 2147483647;
        e[r] = (e[(r + 397) % 624] ^ n >>> 1 ^ (n & 1 ? 2567483615 : 0)) >>> 0;
      }
      this._idx = 0;
    }
    let s = e[this._idx++];
    return s ^= s >>> 11, s ^= s << 7 & 2636928640, s ^= s << 15 & 4022730752, s ^= s >>> 18, s >>> 0;
  }
  random() {
    return ((this._int32() >>> 5) * 67108864 + (this._int32() >>> 6)) / 9007199254740992;
  }
  gauss(e = 0, s = 1) {
    let r = this._gauss_next;
    if (this._gauss_next = null, r === null) {
      let n = this.random() * 2 * Math.PI, o = Math.sqrt(-2 * Math.log(1 - this.random()));
      r = Math.cos(n) * o, this._gauss_next = Math.sin(n) * o;
    }
    return e + r * s;
  }
  shuffle(e) {
    for (let s = e.length - 1; s > 0; --s) {
      let r = 32 - Math.clz32(s + 1), n = this._int32() >>> 32 - r;
      for (; n > s; ) n = this._int32() >>> 32 - r;
      let o = e[s];
      e[s] = e[n], e[n] = o;
    }
  }
  choices(e, s) {
    return e[zb(this._random_fn, s)];
  }
};
function zb(t6, e) {
  let s = 0;
  for (let n = 0; n < e.length; ++n) s += e[n];
  let r = t6() * s;
  for (let n = 0; n < e.length; ++n) if (r -= e[n], r < 0) return n;
  return e.length - 1;
}
var yt2 = new Dt2();
var fs2 = Object.freeze({ Random: Dt2, seed: yt2.seed.bind(yt2), random: yt2.random.bind(yt2), gauss: yt2.gauss.bind(yt2), shuffle: yt2.shuffle.bind(yt2), choices: yt2.choices.bind(yt2) });
var Cb = (t6) => zb(fs2.random, t6);
var OM = new Dt2();
var Vs2 = class {
  constructor(e) {
    this.path = e;
  }
  async match(e) {
    let s = tt2.join(this.path, e), r = new Ft(s);
    if (r.exists) return r;
  }
  async put(e, s, r = void 0) {
    let n = tt2.join(this.path, e), o = H.IS_PROCESS_AVAILABLE ? process.pid : Date.now(), a = OM._int32().toString(36), i = n + `.tmp.${o}.${a}`;
    try {
      let l = s.headers.get("Content-Length"), c = parseInt(l ?? "0"), p = 0;
      await qe.promises.mkdir(tt2.dirname(n), { recursive: true });
      let u = qe.createWriteStream(i), _ = s.body.getReader();
      for (; ; ) {
        let { done: d, value: f } = await _.read();
        if (d) break;
        await new Promise((g, w) => {
          u.write(f, (x) => {
            if (x) {
              w(x);
              return;
            }
            g();
          });
        }), p += f.length;
        let m = c ? p / c * 100 : 0;
        r?.({ progress: m, loaded: p, total: c });
      }
      await new Promise((d, f) => {
        u.close((m) => m ? f(m) : d());
      }), await qe.promises.rename(i, n);
    } catch (l) {
      try {
        await qe.promises.unlink(i);
      } catch {
      }
      throw l;
    }
  }
  async delete(e) {
    let s = tt2.join(this.path, e);
    try {
      return await qe.promises.unlink(s), true;
    } catch {
      return false;
    }
  }
};
var Pb = { 400: "Bad request error occurred while trying to load file", 401: "Unauthorized access to file", 403: "Forbidden access to file", 404: "Could not locate file", 408: "Request timeout error occurred while trying to load file", 500: "Internal server error error occurred while trying to load file", 502: "Bad gateway error occurred while trying to load file", 503: "Service unavailable error occurred while trying to load file", 504: "Gateway timeout error occurred while trying to load file" };
var $i = 100;
var Nb = /^(\b[\w\-.]+\b\/)?\b[\w\-.]{1,96}\b$/;
function Wr(...t6) {
  return t6 = t6.map((e, s) => (s && (e = e.replace(new RegExp("^/"), "")), s !== t6.length - 1 && (e = e.replace(new RegExp("/$"), "")), e)), t6.join("/");
}
function St(t6, e = null, s = null) {
  let r;
  try {
    r = new URL(t6);
  } catch {
    return false;
  }
  return !(e && !e.includes(r.protocol) || s && !s.includes(r.hostname));
}
function Lb(t6) {
  return !(!Nb.test(t6) || t6.includes("..") || t6.includes("--") || t6.endsWith(".git") || t6.endsWith(".ipynb"));
}
function Hs2(t6, e = {}, ...s) {
  return JSON.stringify([t6, e.revision ?? "main", e.cache_dir ?? null, e.local_files_only ?? false, ...s]);
}
var ms2 = class extends Error {
  constructor(e, { status: s = null } = {}) {
    super(e), this.name = "ModelFileNotFoundError", this.status = s;
  }
};
var IM = /* @__PURE__ */ new Set([401, 403, 404]);
function Ri(t6, e, s) {
  if (!s) return null;
  let n = `${Pb[t6] ?? `Error (${t6}) occurred while trying to load file`}: "${e}".`;
  throw IM.has(t6) ? new ms2(n, { status: t6 }) : Error(n);
}
async function $b(t6, e, s) {
  let r = t6.headers.get("Content-Length"), n = r ? parseInt(r, 10) : s ?? 0;
  r === null && !s && R.warn("Unable to determine content-length from response headers. Will expand buffer when needed.");
  let o = new Uint8Array(n), a = 0, i = t6.body.getReader();
  async function l() {
    let { done: c, value: p } = await i.read();
    if (c) return;
    let u = a + p.length;
    if (u > n) {
      n = u;
      let d = new Uint8Array(n);
      d.set(o), o = d;
    }
    o.set(p, a), a = u;
    let _ = a / n * 100;
    return e({ progress: _, loaded: a, total: n }), l();
  }
  return await l(), o;
}
function zp(t6) {
  return St(t6, ["blob:"]);
}
function Vr(t6, { allowUnresolved: e = false } = {}) {
  let s;
  if (typeof location < "u" && location.href) s = location.href;
  else if (typeof import.meta < "u" && import.meta.url) s = import.meta.url;
  else return t6;
  try {
    return new URL(t6, s).href;
  } catch (r) {
    if (!e) throw r;
    return t6;
  }
}
var Fb = "SHA-256";
var TM = "experimental_transformers-hash-cache";
var Rb = (t6) => ({ algorithm: Fb, value: t6 });
var Hr = class {
  #t = null;
  _getHashCache = () => (this.#t ??= caches.open(TM), this.#t);
  static isAvailable = () => typeof navigator < "u" && "crossOriginStorage" in navigator;
  match = async (e) => {
    let s = await this._getFileHash(e);
    if (s) try {
      let n = await (await navigator.crossOriginStorage.requestFileHandle(Rb(s))).getFile();
      return new Response(n, { headers: { "Content-Length": String(n.size) } });
    } catch {
      return;
    }
  };
  put = async (e, s) => {
    let r = await this._getFileHash(e);
    if (r) {
      let n = await s.blob();
      await this._storeBlobInCOS(n, r);
    } else this._processAndStore(e, s.body);
  };
  _storeBlobInCOS = async (e, s) => {
    let n = await (await navigator.crossOriginStorage.requestFileHandle(Rb(s), { create: true, origins: "*" })).createWritable();
    await n.write(e), await n.close();
  };
  _processAndStore = async (e, s) => {
    try {
      let r = [];
      for await (let a of s) r.push(a);
      let n = new Blob(r), o = await this._getBlobHash(n);
      await this._storeBlobInCOS(n, o);
      try {
        await (await this._getHashCache()).put(e, new Response(o));
      } catch {
      }
    } catch {
    }
  };
  delete = async (e) => {
    try {
      return await (await this._getHashCache()).delete(e);
    } catch {
      return false;
    }
  };
  _getFileHash = async (e) => {
    try {
      let s = await this._getHashCache(), r = await s.match(e);
      if (r) return r.text();
      let n = await this._getLfsFileHash(e);
      return n ? (await s.put(e, new Response(n)), n) : null;
    } catch {
      return null;
    }
  };
  _getLfsFileHash = async (e) => {
    if (!e.includes("/resolve/")) return null;
    let s = e.replace("/resolve/", "/raw/");
    try {
      let n = (await fetch(s).then((o) => o.text())).match(/^oid sha256:([0-9a-f]+)$/m);
      return n ? n[1] : null;
    } catch {
      return null;
    }
  };
  _getBlobHash = async (e) => {
    let s = await e.arrayBuffer(), r = await crypto.subtle.digest(Fb, s);
    return Array.from(new Uint8Array(r)).map((o) => o.toString(16).padStart(2, "0")).join("");
  };
};
async function dt(t6 = null) {
  let e = null;
  if (J.useCustomCache) {
    if (!J.customCache) throw Error("`env.useCustomCache=true`, but `env.customCache` is not defined.");
    if (!J.customCache.match || !J.customCache.put) throw new Error("`env.customCache` must be an object which implements the `match` and `put` functions of the Web Cache API. For more information, see https://developer.mozilla.org/en-US/docs/Web/API/Cache");
    e = J.customCache;
  }
  if (!e && J.experimental_useCrossOriginStorage && Hr.isAvailable() && (e = new Hr()), !e && J.useBrowserCache) {
    if (typeof caches > "u") throw Error("Browser cache is not available in this environment.");
    try {
      e = await caches.open(J.cacheKey);
    } catch (s) {
      R.warn("An error occurred while opening the browser cache:", s);
    }
  }
  if (!e && J.useFSCache) {
    if (!H.IS_FS_AVAILABLE) throw Error("File System Cache is not available in this environment.");
    e = new Vs2(t6 ?? J.cacheDir);
  }
  return e;
}
async function Db(t6, ...e) {
  for (let s of e) try {
    let r = await t6.match(s);
    if (r) return r;
  } catch {
    continue;
  }
}
var Fi = class {
  #t;
  #e;
  constructor(e) {
    this.#t = e, this.#e = /* @__PURE__ */ new Map();
  }
  get(e) {
    if (!this.#e.has(e)) return;
    let s = this.#e.get(e);
    return this.#e.delete(e), this.#e.set(e, s), s;
  }
  put(e, s) {
    this.#e.has(e) && this.#e.delete(e), this.#e.set(e, s), this.#e.size > this.#t && this.#e.delete(this.#e.keys().next().value);
  }
  delete(e) {
    return this.#e.delete(e);
  }
  clear() {
    this.#e.clear();
  }
};
var zM = 100;
var Cp = new Fi(zM);
function Di(t6, e) {
  let s = Cp.get(t6);
  if (s !== void 0) return s;
  let r = e().then((n) => n, (n) => (Cp.delete(t6), Promise.reject(n)));
  return Cp.put(t6, r), r;
}
async function CM(t6) {
  if (!St(t6, ["http:", "https:"])) return null;
  let e = Pp(t6);
  return e.set("Range", "bytes=0-0"), J.fetch(t6, { method: "GET", headers: e, cache: "no-store" });
}
function Ye(t6, e, s = {}) {
  let r = Hs2(t6, s, e);
  return Di(r, () => PM(t6, e, s));
}
async function PM(t6, e, s) {
  let r = await dt(s?.cache_dir), { localPath: n, remoteURL: o, proposedCacheKey: a, validModelId: i } = qt2(t6, e, s, r), l = await Ut(r, n, a);
  if (l !== void 0 && typeof l != "string") {
    let c = l.headers.get("content-length"), p = l.headers.get("content-type");
    return { exists: true, size: c ? parseInt(c, 10) : void 0, contentType: p || void 0, fromCache: true };
  }
  if (J.allowLocalModels && !St(n, ["http:", "https:"])) try {
    let p = await Bt2(n);
    if (typeof p != "string" && p.status !== 404) {
      let u = p.headers.get("content-length"), _ = p.headers.get("content-type");
      return { exists: true, size: u ? parseInt(u, 10) : void 0, contentType: _ || void 0, fromCache: false };
    }
  } catch {
  }
  if (J.allowRemoteModels && !s.local_files_only && i) {
    let c = await CM(o);
    if (c && c.status >= 200 && c.status < 300) {
      let p, u = c.headers.get("content-type");
      if (c.status === 206) {
        let _ = c.headers.get("content-range");
        if (_) {
          let d = _.match(/bytes \d+-\d+\/(\d+)/);
          d && (p = parseInt(d[1], 10));
        }
      } else if (c.status === 200) try {
        await c.body?.cancel();
      } catch {
      }
      if (p === void 0) {
        let _ = c.headers.get("content-length");
        p = _ ? parseInt(_, 10) : void 0;
      }
      return { exists: true, size: p, contentType: u || void 0, fromCache: false };
    }
    c && c.status !== 404 && c.status !== 416 && Ri(c.status, o, true);
  }
  return { exists: false, fromCache: false };
}
async function Bt2(t6) {
  return J.useFS && !St(t6, ["http:", "https:", "blob:"]) ? new Ft(t6 instanceof URL ? t6.protocol === "file:" ? t6.pathname : t6.toString() : t6) : J.fetch(t6, { headers: Pp(t6) });
}
function Pp(t6) {
  let e = typeof process < "u" && process?.release?.name === "node", s = new Headers();
  if (e) {
    let r = !!process.env?.TESTING_REMOTELY, n = J.version;
    if (s.set("User-Agent", `transformers.js/${n}; is_ci/${r};`), St(t6, ["http:", "https:"], ["huggingface.co", "hf.co"])) {
      let a = process.env?.HF_TOKEN ?? process.env?.HF_ACCESS_TOKEN;
      a && s.set("Authorization", `Bearer ${a}`);
    }
  }
  return s;
}
function qt2(t6, e, s = {}, r = null) {
  let n = s.revision ?? "main", o = Wr(t6, e), a = Lb(t6), i = a ? Wr(J.localModelPath, o) : o, l = Wr(J.remoteHost, J.remotePathTemplate.replaceAll("{model}", t6).replaceAll("{revision}", encodeURIComponent(n)), e), c = r instanceof Vs2 ? n === "main" ? o : Wr(t6, n, e) : l;
  return { requestURL: o, localPath: i, remoteURL: l, proposedCacheKey: c, validModelId: a };
}
async function Ut(t6, e, s) {
  if (t6) return await Db(t6, e, s);
}
async function NM(t6, e, s, r, n, o, a = {}) {
  if (await s.match(r) === void 0 && !(typeof Cache < "u" && s instanceof Cache && !St(Vr(r, { allowUnresolved: true }), ["http:", "https:"]))) if (o) {
    if (typeof n != "string") {
      let i = new Headers(n.headers);
      i.set("content-length", o.byteLength.toString()), await s.put(r, new Response(o, { headers: i })).catch((l) => {
        R.warn(`Unable to add response to browser cache: ${l}.`);
      });
    }
  } else {
    let i = a.progress_callback ? (l) => xt(a.progress_callback, { status: "progress", name: t6, file: e, ...l }) : void 0;
    await s.put(r, n, i);
  }
}
async function LM(t6, e, s = true, r = {}, n = false, o = null) {
  let { requestURL: a, localPath: i, remoteURL: l, proposedCacheKey: c, validModelId: p } = qt2(t6, e, r, o), u, _ = false, d;
  d = await Ut(o, i, c);
  let f = d !== void 0;
  if (f) u = c;
  else {
    if (J.allowLocalModels) if (St(a, ["http:", "https:"])) {
      if (r.local_files_only) throw new Error(`\`local_files_only=true\`, but attempted to load a remote file from: ${a}.`);
      if (!J.allowRemoteModels) throw new Error(`\`env.allowRemoteModels=false\`, but attempted to load a remote file from: ${a}.`);
    } else try {
      d = await Bt2(i), u = i;
    } catch (x) {
      R.warn(`Unable to load from local path "${i}": "${x}"`);
    }
    if (d === void 0 || typeof d != "string" && d.status === 404) {
      if (r.local_files_only || !J.allowRemoteModels) {
        if (s) throw new ms2(`\`local_files_only=true\` or \`env.allowRemoteModels=false\` and file was not found locally at "${i}".`);
        return null;
      }
      if (!p) throw new ms2(`Local file missing at "${i}" and download aborted due to invalid model ID "${t6}".`);
      if (d = await Bt2(l), d.status !== 200) return Ri(d.status, l, s);
      u = c;
    }
    _ = o && typeof Response < "u" && d instanceof Response && d.status === 200;
  }
  xt(r.progress_callback, { status: "download", name: t6, file: e });
  let m;
  if (!(H.IS_NODE_ENV && n)) {
    let w;
    if (typeof d != "string") if (!r.progress_callback) w = new Uint8Array(await d.arrayBuffer());
    else if (f && typeof navigator < "u" && /firefox/i.test(navigator.userAgent)) w = new Uint8Array(await d.arrayBuffer()), xt(r.progress_callback, { status: "progress", name: t6, file: e, progress: 100, loaded: w.length, total: w.length });
    else {
      let x, y = d.headers.get("content-length");
      if (y) x = parseInt(y, 10);
      else try {
        let b = await Ye(t6, e, r);
        b.size && (x = b.size);
      } catch {
      }
      w = await $b(d, (b) => {
        xt(r.progress_callback, { status: "progress", name: t6, file: e, ...b });
      }, x);
    }
    m = w;
  }
  if (_ && u && typeof d != "string" && await NM(t6, e, o, u, d, m, r), H.IS_NODE_ENV && n && r.progress_callback && typeof d != "string") {
    let w = parseInt(d.headers.get("content-length"), 10) || 0;
    xt(r.progress_callback, { status: "progress", name: t6, file: e, progress: 100, loaded: w, total: w });
  }
  if (xt(r.progress_callback, { status: "done", name: t6, file: e }), m) {
    if (!H.IS_NODE_ENV && n) throw new Error("Cannot return path in a browser environment.");
    return m;
  }
  if (d instanceof Ft) return d.filePath;
  let g = await o?.match(u);
  if (g instanceof Ft) return g.filePath;
  if (g instanceof Response) return new Uint8Array(await g.arrayBuffer());
  if (typeof g == "string") return g;
  throw new Error("Unable to get model file path or buffer.");
}
var Np = /* @__PURE__ */ new Map();
async function Kr2(t6, e, s = true, r = {}, n = false) {
  if (!J.allowLocalModels) {
    if (r.local_files_only) throw Error("Invalid configuration detected: local models are disabled (`env.allowLocalModels=false`) but you have requested to only use local models (`local_files_only=true`).");
    if (!J.allowRemoteModels) throw Error("Invalid configuration detected: both local and remote models are disabled. Fix by setting `env.allowLocalModels` or `env.allowRemoteModels` to `true`.");
  }
  let o = Hs2(t6, r, e, s, n), { progress_callback: a } = r, i = a instanceof At2 ? a.loads : Np, l = i.get(o);
  return l || (xt(a, { status: "initiate", name: t6, file: e }), l = dt(r.cache_dir).then((c) => LM(t6, e, s, r, n, c)), i === Np && (l = l.finally(() => Np.delete(o))), i.set(o, l)), await l;
}
async function Xr2(t6, e, s = true, r = {}) {
  let n = await Kr2(t6, e, s, r, false);
  return n === null ? null : new TextDecoder("utf-8").decode(n);
}
async function ze2(t6, e, s = true, r = {}) {
  let n = await Xr2(t6, e, s, r);
  return n === null ? {} : JSON.parse(n);
}
function qb(t6, [e, s, r], [n, o], a = "bilinear", i = false) {
  let l = o / r, c = n / s, p = new t6.constructor(n * o * e), u = s * r, _ = n * o;
  for (let d = 0; d < n; ++d) for (let f = 0; f < o; ++f) {
    let m = d * o + f, g = (f + 0.5) / l - 0.5, w = (d + 0.5) / c - 0.5, x = Math.floor(g), y = Math.floor(w), b = Math.min(x + 1, r - 1), v = Math.min(y + 1, s - 1);
    x = Math.max(x, 0), y = Math.max(y, 0);
    let k = g - x, O = w - y, T = (1 - k) * (1 - O), $ = k * (1 - O), C = (1 - k) * O, D = k * O, W = y * r, V2 = v * r, B = W + x, q = W + b, Z = V2 + x, j2 = V2 + b;
    for (let ue = 0; ue < e; ++ue) {
      let _e = ue * u;
      p[ue * _ + m] = T * t6[_e + B] + $ * t6[_e + q] + C * t6[_e + Z] + D * t6[_e + j2];
    }
  }
  return p;
}
function Ub(t6, e, s) {
  let r = new Array(s.length), n = new Array(s.length);
  for (let i = s.length - 1, l = 1; i >= 0; --i) n[i] = l, r[i] = e[s[i]], l *= r[i];
  let o = s.map((i, l) => n[s.indexOf(l)]), a = new t6.constructor(t6.length);
  for (let i = 0; i < t6.length; ++i) {
    let l = 0;
    for (let c = e.length - 1, p = i; c >= 0; --c) l += p % e[c] * o[c], p = Math.floor(p / e[c]);
    a[l] = t6[i];
  }
  return [a, r];
}
function ge(t6) {
  let e = fe(t6)[0], s = t6.map((o) => Math.exp(o - e)), r = s.reduce((o, a) => o + a, 0);
  return s.map((o) => o / r);
}
function $p(t6) {
  let e = fe(t6)[0], s = 0;
  for (let o = 0; o < t6.length; ++o) s += Math.exp(t6[o] - e);
  let r = Math.log(s);
  return t6.map((o) => o - e - r);
}
function jb(t6, e) {
  let s = 0;
  for (let r = 0; r < t6.length; ++r) s += t6[r] * e[r];
  return s;
}
function $M(t6, e) {
  let s = jb(t6, e), r = Bb(t6), n = Bb(e);
  return s / (r * n);
}
function Bb(t6) {
  return Math.sqrt(t6.reduce((e, s) => e + s * s, 0));
}
function Qr2(t6) {
  if (t6.length === 0) throw Error("Array must not be empty");
  let e = t6[0], s = 0;
  for (let r = 1; r < t6.length; ++r) t6[r] < e && (e = t6[r], s = r);
  return [e, s];
}
function fe(t6) {
  if (t6.length === 0) throw Error("Array must not be empty");
  let e = t6[0], s = 0;
  for (let r = 1; r < t6.length; ++r) t6[r] > e && (e = t6[r], s = r);
  return [e, s];
}
function Gb(t6) {
  return t6 > 0 && (t6 & t6 - 1) === 0;
}
var Bi = class {
  constructor(e) {
    if (this.size = e | 0, this.size <= 1 || !Gb(this.size)) throw new Error("FFT size must be a power of two larger than 1");
    this._csize = e << 1, this.table = new Float64Array(this.size * 2);
    for (let r = 0; r < this.table.length; r += 2) {
      let n = Math.PI * r / this.size;
      this.table[r] = Math.cos(n), this.table[r + 1] = -Math.sin(n);
    }
    let s = 0;
    for (let r = 1; this.size > r; r <<= 1) ++s;
    this._width = s % 2 === 0 ? s - 1 : s, this._bitrev = new Int32Array(1 << this._width);
    for (let r = 0; r < this._bitrev.length; ++r) {
      this._bitrev[r] = 0;
      for (let n = 0; n < this._width; n += 2) {
        let o = this._width - n - 2;
        this._bitrev[r] |= (r >>> n & 3) << o;
      }
    }
  }
  createComplexArray() {
    return new Float64Array(this._csize);
  }
  fromComplexArray(e, s) {
    let r = s || new Array(e.length >>> 1);
    for (let n = 0; n < e.length; n += 2) r[n >>> 1] = e[n];
    return r;
  }
  toComplexArray(e, s) {
    let r = s || this.createComplexArray();
    for (let n = 0; n < r.length; n += 2) r[n] = e[n >>> 1], r[n + 1] = 0;
    return r;
  }
  transform(e, s) {
    if (e === s) throw new Error("Input and output buffers must be different");
    this._transform4(e, s, 1);
  }
  realTransform(e, s) {
    if (e === s) throw new Error("Input and output buffers must be different");
    this._realTransform4(e, s, 1);
  }
  inverseTransform(e, s) {
    if (e === s) throw new Error("Input and output buffers must be different");
    this._transform4(e, s, -1);
    for (let r = 0; r < e.length; ++r) e[r] /= this.size;
  }
  _transform4(e, s, r) {
    let n = this._csize, a = 1 << this._width, i = n / a << 1, l, c, p = this._bitrev;
    if (i === 4) for (l = 0, c = 0; l < n; l += i, ++c) {
      let _ = p[c];
      this._singleTransform2(s, e, l, _, a);
    }
    else for (l = 0, c = 0; l < n; l += i, ++c) {
      let _ = p[c];
      this._singleTransform4(s, e, l, _, a, r);
    }
    let u = this.table;
    for (a >>= 2; a >= 2; a >>= 2) {
      i = n / a << 1;
      let _ = i >>> 2;
      for (l = 0; l < n; l += i) {
        let d = l + _ - 1;
        for (let f = l, m = 0; f < d; f += 2, m += a) {
          let g = f, w = g + _, x = w + _, y = x + _, b = e[g], v = e[g + 1], k = e[w], O = e[w + 1], T = e[x], $ = e[x + 1], C = e[y], D = e[y + 1], W = u[m], V2 = r * u[m + 1], B = k * W - O * V2, q = k * V2 + O * W, Z = u[2 * m], j2 = r * u[2 * m + 1], ue = T * Z - $ * j2, _e = T * j2 + $ * Z, A = u[3 * m], M = r * u[3 * m + 1], I = C * A - D * M, oe = C * M + D * A, ee2 = b + ue, We2 = v + _e, $e2 = b - ue, Re = v - _e, Ke = B + I, Bs2 = q + oe, Dr = r * (B - I), Br = r * (q - oe);
          e[g] = ee2 + Ke, e[g + 1] = We2 + Bs2, e[w] = $e2 + Br, e[w + 1] = Re - Dr, e[x] = ee2 - Ke, e[x + 1] = We2 - Bs2, e[y] = $e2 - Br, e[y + 1] = Re + Dr;
        }
      }
    }
  }
  _singleTransform2(e, s, r, n, o) {
    let a = e[n], i = e[n + 1], l = e[n + o], c = e[n + o + 1];
    s[r] = a + l, s[r + 1] = i + c, s[r + 2] = a - l, s[r + 3] = i - c;
  }
  _singleTransform4(e, s, r, n, o, a) {
    let i = o * 2, l = o * 3, c = e[n], p = e[n + 1], u = e[n + o], _ = e[n + o + 1], d = e[n + i], f = e[n + i + 1], m = e[n + l], g = e[n + l + 1], w = c + d, x = p + f, y = c - d, b = p - f, v = u + m, k = _ + g, O = a * (u - m), T = a * (_ - g);
    s[r] = w + v, s[r + 1] = x + k, s[r + 2] = y + T, s[r + 3] = b - O, s[r + 4] = w - v, s[r + 5] = x - k, s[r + 6] = y - T, s[r + 7] = b + O;
  }
  _realTransform4(e, s, r) {
    let n = this._csize, a = 1 << this._width, i = n / a << 1, l, c, p = this._bitrev;
    if (i === 4) for (l = 0, c = 0; l < n; l += i, ++c) {
      let d = p[c];
      this._singleRealTransform2(s, e, l, d >>> 1, a >>> 1);
    }
    else for (l = 0, c = 0; l < n; l += i, ++c) {
      let d = p[c];
      this._singleRealTransform4(s, e, l, d >>> 1, a >>> 1, r);
    }
    let u = this.table;
    for (a >>= 2; a >= 2; a >>= 2) {
      i = n / a << 1;
      let d = i >>> 1, f = d >>> 1, m = f >>> 1;
      for (l = 0; l < n; l += i) for (let g = 0, w = 0; g <= m; g += 2, w += a) {
        let x = l + g, y = x + f, b = y + f, v = b + f, k = e[x], O = e[x + 1], T = e[y], $ = e[y + 1], C = e[b], D = e[b + 1], W = e[v], V2 = e[v + 1], B = k, q = O, Z = u[w], j2 = r * u[w + 1], ue = T * Z - $ * j2, _e = T * j2 + $ * Z, A = u[2 * w], M = r * u[2 * w + 1], I = C * A - D * M, oe = C * M + D * A, ee2 = u[3 * w], We2 = r * u[3 * w + 1], $e2 = W * ee2 - V2 * We2, Re = W * We2 + V2 * ee2, Ke = B + I, Bs2 = q + oe, Dr = B - I, Br = q - oe, mp = ue + $e2, hp = _e + Re, v0 = r * (ue - $e2), E0 = r * (_e - Re);
        if (e[x] = Ke + mp, e[x + 1] = Bs2 + hp, e[y] = Dr + E0, e[y + 1] = Br - v0, g === 0) {
          e[b] = Ke - mp, e[b + 1] = Bs2 - hp;
          continue;
        }
        if (g === m) continue;
        let A0 = l + f - g, M0 = l + d - g;
        e[A0] = Dr - r * E0, e[A0 + 1] = -Br - r * v0, e[M0] = Ke - r * mp, e[M0 + 1] = -Bs2 + r * hp;
      }
    }
    let _ = n >>> 1;
    for (let d = 2; d < _; d += 2) e[n - d] = e[d], e[n - d + 1] = -e[d + 1];
  }
  _singleRealTransform2(e, s, r, n, o) {
    let a = e[n], i = e[n + o];
    s[r] = a + i, s[r + 1] = 0, s[r + 2] = a - i, s[r + 3] = 0;
  }
  _singleRealTransform4(e, s, r, n, o, a) {
    let i = o * 2, l = o * 3, c = e[n], p = e[n + o], u = e[n + i], _ = e[n + l], d = c + u, f = c - u, m = p + _, g = a * (p - _);
    s[r] = d + m, s[r + 1] = 0, s[r + 2] = f, s[r + 3] = -g, s[r + 4] = d - m, s[r + 5] = 0, s[r + 6] = f, s[r + 7] = g;
  }
};
var Lp = class {
  constructor(e) {
    let s = 2 * (e - 1), r = 2 * (2 * e - 1), n = 2 ** Math.ceil(Math.log2(r));
    this.bufferSize = n, this._a = s;
    let o = new Float64Array(r), a = new Float64Array(n);
    this._chirpBuffer = new Float64Array(n), this._buffer1 = new Float64Array(n), this._buffer2 = new Float64Array(n), this._outBuffer1 = new Float64Array(n), this._outBuffer2 = new Float64Array(n);
    let i = -2 * Math.PI / e, l = Math.cos(i), c = Math.sin(i);
    for (let p = 0; p < r >> 1; ++p) {
      let u = (p + 1 - e) ** 2 / 2, _ = Math.sqrt(l ** 2 + c ** 2) ** u, d = u * Math.atan2(c, l), f = 2 * p;
      o[f] = _ * Math.cos(d), o[f + 1] = _ * Math.sin(d), a[f] = o[f], a[f + 1] = -o[f + 1];
    }
    this._slicedChirpBuffer = o.subarray(s, r), this._f = new Bi(n >> 1), this._f.transform(this._chirpBuffer, a);
  }
  _transform(e, s, r) {
    let n = this._buffer1, o = this._buffer2, a = this._outBuffer1, i = this._outBuffer2, l = this._chirpBuffer, c = this._slicedChirpBuffer, p = this._a;
    if (r) for (let u = 0; u < c.length; u += 2) {
      let _ = u + 1, d = u >> 1, f = s[d];
      n[u] = f * c[u], n[_] = f * c[_];
    }
    else for (let u = 0; u < c.length; u += 2) {
      let _ = u + 1;
      n[u] = s[u] * c[u] - s[_] * c[_], n[_] = s[u] * c[_] + s[_] * c[u];
    }
    this._f.transform(a, n);
    for (let u = 0; u < l.length; u += 2) {
      let _ = u + 1;
      o[u] = a[u] * l[u] - a[_] * l[_], o[_] = a[u] * l[_] + a[_] * l[u];
    }
    this._f.inverseTransform(i, o);
    for (let u = 0; u < i.length; u += 2) {
      let _ = i[u + p], d = i[u + p + 1], f = c[u], m = c[u + 1];
      e[u] = _ * f - d * m, e[u + 1] = _ * m + d * f;
    }
  }
  transform(e, s) {
    this._transform(e, s, false);
  }
  realTransform(e, s) {
    this._transform(e, s, true);
  }
};
var qi = class {
  constructor(e) {
    this.fft_length = e, this.isPowerOfTwo = Gb(e), this.isPowerOfTwo ? (this.fft = new Bi(e), this.outputBufferSize = 2 * e) : (this.fft = new Lp(e), this.outputBufferSize = this.fft.bufferSize);
  }
  realTransform(e, s) {
    this.fft.realTransform(e, s);
  }
  transform(e, s) {
    this.fft.transform(e, s);
  }
};
function Wb(t6, e) {
  if (e % 2 === 0 || e <= 0) throw new Error("Window size must be a positive odd number");
  let s = new t6.constructor(t6.length), r = new t6.constructor(e), n = Math.floor(e / 2);
  for (let o = 0; o < t6.length; ++o) {
    let a = 0;
    for (let i = -n; i <= n; ++i) {
      let l = o + i;
      l < 0 ? l = Math.abs(l) : l >= t6.length && (l = 2 * (t6.length - 1) - l), r[a++] = t6[l];
    }
    r.sort(), s[o] = r[n];
  }
  return s;
}
function hs2(t6, e) {
  let s = Math.pow(10, e);
  return Math.round(t6 * s) / s;
}
function Vb(t6) {
  let e = Math.round(t6);
  return Math.abs(t6) % 1 === 0.5 ? e % 2 === 0 ? e : e - 1 : e;
}
function Hb(t6) {
  let e = t6.length, s = t6[0].length, r = [e + 1, s + 1], n = Array.from({ length: r[0] }, () => Array(r[1]).fill(1 / 0));
  n[0][0] = 0;
  let o = Array.from({ length: r[0] }, () => Array(r[1]).fill(-1));
  for (let p = 1; p < r[1]; ++p) for (let u = 1; u < r[0]; ++u) {
    let _ = n[u - 1][p - 1], d = n[u - 1][p], f = n[u][p - 1], m, g;
    _ < d && _ < f ? (m = _, g = 0) : d < _ && d < f ? (m = d, g = 1) : (m = f, g = 2), n[u][p] = t6[u - 1][p - 1] + m, o[u][p] = g;
  }
  for (let p = 0; p < r[1]; ++p) o[0][p] = 2;
  for (let p = 0; p < r[0]; ++p) o[p][0] = 1;
  let a = e, i = s, l = [], c = [];
  for (; a > 0 || i > 0; ) switch (l.push(a - 1), c.push(i - 1), o[a][i]) {
    case 0:
      --a, --i;
      break;
    case 1:
      --a;
      break;
    case 2:
      --i;
      break;
    default:
      throw new Error(`Internal error in dynamic time warping. Unexpected trace[${a}, ${i}]. Please file a bug report.`);
  }
  return l.reverse(), c.reverse(), [l, c];
}
var Kb = /* @__PURE__ */ (function() {
  let t6 = null;
  return function(e) {
    if (!t6) {
      t6 = new Float32Array(65536);
      let o = new ArrayBuffer(4), a = new Uint32Array(o), i = new Float32Array(o);
      for (let l = 0; l < t6.length; ++l) {
        let c = 0, p = (l & 32768) << 16, u = (l & 31744) >> 10, _ = l & 1023;
        if (u === 31) c = p | 2139095040 | _ << 13;
        else if (u === 0) if (_ === 0) c = p;
        else {
          let d = 113;
          for (; (_ & 1024) === 0; ) _ <<= 1, --d;
          _ &= -1025, c = p | d << 23 | _ << 13;
        }
        else c = p | u + 112 << 23 | _ << 13;
        a[0] = c, t6[l] = i[0];
      }
    }
    let s = e.length, r = t6, n = new Float32Array(s);
    for (let o = 0; o < s; ++o) n[o] = r[e[o]];
    return n;
  };
})();
var Xb = {};
async function Qb(t6) {
  let e = t6.split("/").pop(), s;
  try {
    if (s = await dt(), s) {
      let n = await s.match(t6);
      if (n) return n;
    }
  } catch (n) {
    R.warn(`Failed to load ${e} from cache:`, n);
  }
  let r = await J.fetch(t6);
  if (!r.ok) throw new Error(`Failed to fetch ${e}: ${r.status} ${r.statusText}`);
  if (s) try {
    await s.put(t6, r.clone());
  } catch (n) {
    R.warn(`Failed to cache ${e}:`, n);
  }
  return r;
}
async function Yb(t6) {
  let e = await Qb(t6);
  if (!e || typeof e == "string") return null;
  try {
    return await e.arrayBuffer();
  } catch (s) {
    return R.warn("Failed to read WASM binary:", s), null;
  }
}
async function Jb(t6) {
  if (H.IS_SERVICE_WORKER_ENV || H.IS_CHROME_AVAILABLE) return t6;
  let e = await Qb(t6);
  if (!e || typeof e == "string") return null;
  try {
    let s = await e.text();
    s = s.replaceAll("globalThis.process?.versions?.node", "false");
    let r = new Blob([s], { type: "text/javascript" });
    return URL.createObjectURL(r);
  } catch (s) {
    return R.warn("Failed to read WASM factory:", s), null;
  }
}
var FM = Object.freeze({ auto: null, gpu: null, cpu: "cpu", wasm: "wasm", webgpu: "webgpu", cuda: "cuda", dml: "dml", coreml: "coreml", webnn: { name: "webnn", deviceType: "cpu" }, "webnn-npu": { name: "webnn", deviceType: "npu" }, "webnn-gpu": { name: "webnn", deviceType: "gpu" }, "webnn-cpu": { name: "webnn", deviceType: "cpu" } });
function sk(t6) {
  return t6 <= Xe.DEBUG ? 0 : t6 <= Xe.INFO ? 2 : t6 <= Xe.WARNING || t6 <= Xe.ERROR ? 3 : 4;
}
var DM = { 0: "verbose", 1: "info", 2: "warning", 3: "error", 4: "fatal" };
var ot2 = [];
var Rp;
var Xs2;
var Zb = /* @__PURE__ */ Symbol.for("onnxruntime");
if (Zb in globalThis) Xs2 = globalThis[Zb];
else if (H.IS_NODE_ENV) {
  switch (Xs2 = Xb, process.platform) {
    case "win32":
      ot2.push("dml");
      break;
    case "linux":
      process.arch === "x64" && ot2.push("cuda");
      break;
    case "darwin":
      ot2.push("coreml");
      break;
  }
  ot2.push("webgpu"), ot2.push("cpu"), Rp = ["cpu"];
} else Xs2 = ort_webgpu_bundle_min_exports, H.IS_WEBNN_AVAILABLE && ot2.push("webnn-npu", "webnn-gpu", "webnn-cpu", "webnn"), H.IS_WEBGPU_AVAILABLE && ot2.push("webgpu"), ot2.push("wasm"), Rp = ["wasm"];
var BM = Xs2.InferenceSession;
function rk(t6 = null) {
  if (!t6) return Rp;
  switch (t6) {
    case "auto":
      return ot2;
    case "gpu":
      return ot2.filter((e) => ["webgpu", "cuda", "dml", "webnn-gpu"].includes(e));
  }
  if (ot2.includes(t6)) return [FM[t6] ?? t6];
  throw new Error(`Unsupported device: "${t6}". Should be one of: ${ot2.join(", ")}.`);
}
var ek = Promise.resolve();
var Ks2 = null;
async function qM() {
  if (Ks2) return Ks2;
  if (!(J.useWasmCache && typeof Ne?.wasm?.wasmPaths == "object" && Ne?.wasm?.wasmPaths?.wasm && Ne?.wasm?.wasmPaths?.mjs)) {
    if (H.IS_DENO_WEB_RUNTIME) throw new Error("env.useWasmCache=false is not supported in Deno's web runtime. Remove the useWasmCache override.");
    return Ks2 = Promise.resolve(), Ks2;
  }
  return Ks2 = (async () => {
    let e = Ne.wasm.wasmPaths, s = false;
    await Promise.all([e.wasm && !zp(e.wasm) ? (async () => {
      try {
        let r = await Yb(Vr(e.wasm));
        r && (Ne.wasm.wasmBinary = r, s = true);
      } catch (r) {
        R.warn("Failed to pre-load WASM binary:", r);
      }
    })() : Promise.resolve(), e.mjs && !zp(e.mjs) ? (async () => {
      try {
        let r = await Jb(Vr(e.mjs));
        r && (Ne.wasm.wasmPaths.mjs = r);
      } catch (r) {
        R.warn("Failed to pre-load WASM factory:", r);
      }
    })() : Promise.resolve()]), s || (Ne.wasm.wasmPaths.mjs = e.mjs);
  })(), Ks2;
}
async function Ui(t6, e, s) {
  await qM();
  let r = sk(J.logLevel ?? Xe.WARNING), n = () => BM.create(t6, { logSeverityLevel: r, ...e }), o = await (H.IS_WEB_ENV ? ek = ek.then(n) : n());
  return o.config = s, o;
}
var tk = Promise.resolve();
async function ji(t6, e) {
  let s = () => t6.run(e);
  return H.IS_WEB_ENV ? tk = tk.then(s) : s();
}
function Gi(t6) {
  return t6 instanceof Xs2.Tensor;
}
var Ne = Xs2?.env;
function Yr() {
  return Ne?.wasm?.proxy;
}
if (Ne) {
  let t6 = function(e) {
    let s = sk(e);
    Ne.logLevel = DM[s];
  };
  if (Ne.wasm) {
    if (!(typeof ServiceWorkerGlobalScope < "u" && self instanceof ServiceWorkerGlobalScope) && Ne.versions?.web && !Ne.wasm.wasmPaths) {
      let e = `https://cdn.jsdelivr.net/npm/onnxruntime-web@${Ne.versions.web}/dist/`, s = ".asyncify";
      H.IS_SAFARI_BELOW_26 && !H.IS_WEBGPU_AVAILABLE && (s = ""), Ne.wasm.wasmPaths = { mjs: `${e}ort-wasm-simd-threaded${s}.mjs`, wasm: `${e}ort-wasm-simd-threaded${s}.wasm` };
    }
    Ne.wasm.proxy = false;
  }
  Ne.webgpu && (Ne.webgpu.powerPreference = "high-performance"), t6(J.logLevel ?? Xe.WARNING), J.backends.onnx = { ...Ne, setLogLevel: t6 };
}
var jt = async (t6, e, s) => {
  let r = await Ui(new Uint8Array(t6), e);
  return (async (n) => {
    let o = Yr(), a = Object.fromEntries(Object.entries(n).map(([l, c]) => [l, (o ? c.clone() : c).ort_tensor])), i = await ji(r, a);
    return Array.isArray(s) ? s.map((l) => new E(i[l])) : new E(i[s]);
  });
};
var bt2 = class {
  static session_options = {};
  static get nearest_interpolate_4d() {
    return this._nearest_interpolate_4d || (this._nearest_interpolate_4d = jt([8, 10, 18, 0, 58, 129, 1, 10, 41, 10, 1, 120, 10, 0, 10, 0, 10, 1, 115, 18, 1, 121, 34, 6, 82, 101, 115, 105, 122, 101, 42, 18, 10, 4, 109, 111, 100, 101, 34, 7, 110, 101, 97, 114, 101, 115, 116, 160, 1, 3, 18, 1, 114, 90, 31, 10, 1, 120, 18, 26, 10, 24, 8, 1, 18, 20, 10, 3, 18, 1, 98, 10, 3, 18, 1, 99, 10, 3, 18, 1, 104, 10, 3, 18, 1, 119, 90, 15, 10, 1, 115, 18, 10, 10, 8, 8, 7, 18, 4, 10, 2, 8, 4, 98, 31, 10, 1, 121, 18, 26, 10, 24, 8, 1, 18, 20, 10, 3, 18, 1, 98, 10, 3, 18, 1, 99, 10, 3, 18, 1, 104, 10, 3, 18, 1, 119, 66, 2, 16, 21], this.session_options, "y")), this._nearest_interpolate_4d;
  }
  static get bilinear_interpolate_4d() {
    return this._bilinear_interpolate_4d || (this._bilinear_interpolate_4d = jt([8, 9, 18, 0, 58, 128, 1, 10, 40, 10, 1, 120, 10, 0, 10, 0, 10, 1, 115, 18, 1, 121, 34, 6, 82, 101, 115, 105, 122, 101, 42, 17, 10, 4, 109, 111, 100, 101, 34, 6, 108, 105, 110, 101, 97, 114, 160, 1, 3, 18, 1, 114, 90, 31, 10, 1, 120, 18, 26, 10, 24, 8, 1, 18, 20, 10, 3, 18, 1, 98, 10, 3, 18, 1, 99, 10, 3, 18, 1, 104, 10, 3, 18, 1, 119, 90, 15, 10, 1, 115, 18, 10, 10, 8, 8, 7, 18, 4, 10, 2, 8, 4, 98, 31, 10, 1, 121, 18, 26, 10, 24, 8, 1, 18, 20, 10, 3, 18, 1, 98, 10, 3, 18, 1, 99, 10, 3, 18, 1, 104, 10, 3, 18, 1, 119, 66, 2, 16, 20], this.session_options, "y")), this._bilinear_interpolate_4d;
  }
  static get bicubic_interpolate_4d() {
    return this._bicubic_interpolate_4d || (this._bicubic_interpolate_4d = jt([8, 9, 18, 0, 58, 127, 10, 39, 10, 1, 120, 10, 0, 10, 0, 10, 1, 115, 18, 1, 121, 34, 6, 82, 101, 115, 105, 122, 101, 42, 16, 10, 4, 109, 111, 100, 101, 34, 5, 99, 117, 98, 105, 99, 160, 1, 3, 18, 1, 114, 90, 31, 10, 1, 120, 18, 26, 10, 24, 8, 1, 18, 20, 10, 3, 18, 1, 98, 10, 3, 18, 1, 99, 10, 3, 18, 1, 104, 10, 3, 18, 1, 119, 90, 15, 10, 1, 115, 18, 10, 10, 8, 8, 7, 18, 4, 10, 2, 8, 4, 98, 31, 10, 1, 121, 18, 26, 10, 24, 8, 1, 18, 20, 10, 3, 18, 1, 98, 10, 3, 18, 1, 99, 10, 3, 18, 1, 104, 10, 3, 18, 1, 119, 66, 2, 16, 20], this.session_options, "y")), this._bicubic_interpolate_4d;
  }
  static get matmul() {
    return this._matmul || (this._matmul = jt([8, 9, 18, 0, 58, 55, 10, 17, 10, 1, 97, 10, 1, 98, 18, 1, 99, 34, 6, 77, 97, 116, 77, 117, 108, 18, 1, 114, 90, 9, 10, 1, 97, 18, 4, 10, 2, 8, 1, 90, 9, 10, 1, 98, 18, 4, 10, 2, 8, 1, 98, 9, 10, 1, 99, 18, 4, 10, 2, 8, 1, 66, 2, 16, 20], this.session_options, "c")), this._matmul;
  }
  static get stft() {
    return this._stft || (this._stft = jt([8, 7, 18, 0, 58, 148, 1, 10, 38, 10, 1, 115, 10, 1, 106, 10, 1, 119, 10, 1, 108, 18, 1, 111, 34, 4, 83, 84, 70, 84, 42, 15, 10, 8, 111, 110, 101, 115, 105, 100, 101, 100, 24, 1, 160, 1, 2, 18, 1, 115, 90, 26, 10, 1, 115, 18, 21, 10, 19, 8, 1, 18, 15, 10, 3, 18, 1, 98, 10, 3, 18, 1, 115, 10, 3, 18, 1, 99, 90, 11, 10, 1, 106, 18, 6, 10, 4, 8, 7, 18, 0, 90, 16, 10, 1, 119, 18, 11, 10, 9, 8, 1, 18, 5, 10, 3, 18, 1, 119, 90, 11, 10, 1, 108, 18, 6, 10, 4, 8, 7, 18, 0, 98, 31, 10, 1, 111, 18, 26, 10, 24, 8, 1, 18, 20, 10, 3, 18, 1, 98, 10, 3, 18, 1, 102, 10, 3, 18, 1, 100, 10, 3, 18, 1, 99, 66, 2, 16, 17], this.session_options, "o")), this._stft;
  }
  static get rfft() {
    return this._rfft || (this._rfft = jt([8, 9, 58, 93, 10, 33, 10, 1, 120, 10, 0, 10, 1, 97, 18, 1, 121, 34, 3, 68, 70, 84, 42, 15, 10, 8, 111, 110, 101, 115, 105, 100, 101, 100, 24, 1, 160, 1, 2, 18, 1, 100, 90, 19, 10, 1, 120, 18, 14, 10, 12, 8, 1, 18, 8, 10, 0, 10, 0, 10, 2, 8, 1, 90, 11, 10, 1, 97, 18, 6, 10, 4, 8, 7, 18, 0, 98, 19, 10, 1, 121, 18, 14, 10, 12, 8, 1, 18, 8, 10, 0, 10, 0, 10, 2, 8, 2, 66, 2, 16, 20], this.session_options, "y")), this._rfft;
  }
  static get top_k() {
    return this._top_k || (this._top_k = jt([8, 10, 18, 0, 58, 73, 10, 18, 10, 1, 120, 10, 1, 107, 18, 1, 118, 18, 1, 105, 34, 4, 84, 111, 112, 75, 18, 1, 116, 90, 9, 10, 1, 120, 18, 4, 10, 2, 8, 1, 90, 15, 10, 1, 107, 18, 10, 10, 8, 8, 7, 18, 4, 10, 2, 8, 1, 98, 9, 10, 1, 118, 18, 4, 10, 2, 8, 1, 98, 9, 10, 1, 105, 18, 4, 10, 2, 8, 7, 66, 2, 16, 21], this.session_options, ["v", "i"])), this._top_k;
  }
  static get slice() {
    return this._slice || (this._slice = jt([8, 7, 18, 0, 58, 96, 10, 25, 10, 1, 120, 10, 1, 115, 10, 1, 101, 10, 1, 97, 10, 1, 116, 18, 1, 121, 34, 5, 83, 108, 105, 99, 101, 18, 1, 114, 90, 9, 10, 1, 120, 18, 4, 10, 2, 8, 1, 90, 9, 10, 1, 115, 18, 4, 10, 2, 8, 7, 90, 9, 10, 1, 101, 18, 4, 10, 2, 8, 7, 90, 9, 10, 1, 97, 18, 4, 10, 2, 8, 7, 90, 9, 10, 1, 116, 18, 4, 10, 2, 8, 7, 98, 9, 10, 1, 121, 18, 4, 10, 2, 8, 1, 66, 2, 16, 13], this.session_options, "y")), this._slice;
  }
};
var ok = Object.freeze({ auto: "auto", gpu: "gpu", cpu: "cpu", wasm: "wasm", webgpu: "webgpu", cuda: "cuda", dml: "dml", coreml: "coreml", webnn: "webnn", "webnn-npu": "webnn-npu", "webnn-gpu": "webnn-gpu", "webnn-cpu": "webnn-cpu" });
var Fp = H.IS_NODE_ENV ? "cpu" : "wasm";
function Wi(t6, e, { warn: s } = {}) {
  return t6 ? typeof t6 == "string" ? t6 : t6.hasOwnProperty(e) ? t6[e] : (s && s(`device not specified for "${e}". Using the default device (${Fp}).`), Fp) : Fp;
}
var lk = /* @__PURE__ */ (function() {
  let t6;
  return async function() {
    if (t6 === void 0) if (!H.IS_WEBGPU_AVAILABLE) t6 = false;
    else try {
      t6 = (await navigator.gpu.requestAdapter()).features.has("shader-f16");
    } catch {
      t6 = false;
    }
    return t6;
  };
})();
var Te = Object.freeze({ auto: "auto", fp32: "fp32", fp16: "fp16", q8: "q8", int8: "int8", uint8: "uint8", q4: "q4", bnb4: "bnb4", q4f16: "q4f16", q2: "q2", q2f16: "q2f16", q1: "q1", q1f16: "q1f16" });
var ak = Te.fp32;
var ik = Object.freeze({ [ok.wasm]: Te.q8 });
var Gt = Object.freeze({ [Te.fp32]: "", [Te.fp16]: "_fp16", [Te.int8]: "_int8", [Te.uint8]: "_uint8", [Te.q8]: "_quantized", [Te.q4]: "_q4", [Te.q2]: "_q2", [Te.q1]: "_q1", [Te.q4f16]: "_q4f16", [Te.q2f16]: "_q2f16", [Te.q1f16]: "_q1f16", [Te.bnb4]: "_bnb4" });
function Vi(t6, e, s, { configDtype: r = null, warn: n } = {}) {
  let o, a = false;
  t6 && typeof t6 != "string" ? t6.hasOwnProperty(e) ? o = t6[e] : (o = null, a = true) : o = t6;
  let i;
  if (o === Te.auto) {
    if (r) {
      let l = typeof r == "string" ? r : r?.[e];
      if (l && l !== Te.auto && Te.hasOwnProperty(l)) return l;
    }
    i = ik[s] ?? ak;
  } else o && Te.hasOwnProperty(o) ? i = o : i = ik[s] ?? ak;
  return a && n && n(`dtype not specified for "${e}". Using the default dtype (${i}) for this device (${s}).`), i;
}
var Wt = Object.freeze({ float32: Float32Array, float16: typeof Float16Array < "u" ? Float16Array : Uint16Array, float64: Float64Array, string: Array, int8: Int8Array, uint8: Uint8Array, int16: Int16Array, uint16: Uint16Array, int32: Int32Array, uint32: Uint32Array, int64: BigInt64Array, uint64: BigUint64Array, bool: Uint8Array, uint4: Uint8Array, int4: Int8Array });
var E = class t2 {
  get dims() {
    return this.ort_tensor.dims;
  }
  set dims(e) {
    this.ort_tensor.dims = e;
  }
  get type() {
    return this.ort_tensor.type;
  }
  get data() {
    return this.ort_tensor.data;
  }
  get size() {
    return this.ort_tensor.size;
  }
  get location() {
    return this.ort_tensor.location;
  }
  ort_tensor;
  constructor(...e) {
    return Gi(e[0]) ? this.ort_tensor = e[0] : this.ort_tensor = new Tensor2(e[0], e[1], e[2]), new Proxy(this, { get: (s, r) => {
      if (typeof r == "string") {
        let n = Number(r);
        if (Number.isInteger(n)) return s._getitem(n);
      }
      return s[r];
    }, set: (s, r, n) => s[r] = n });
  }
  dispose() {
    this.ort_tensor.dispose();
  }
  *[Symbol.iterator]() {
    let [e, ...s] = this.dims;
    if (s.length > 0) {
      let r = s.reduce((n, o) => n * o);
      for (let n = 0; n < e; ++n) yield this._subarray(n, r, s);
    } else yield* this.data;
  }
  _getitem(e) {
    let [s, ...r] = this.dims;
    if (e = ft2(e, s), r.length > 0) {
      let n = r.reduce((o, a) => o * a);
      return this._subarray(e, n, r);
    } else return new t2(this.type, [this.data[e]], r);
  }
  _subarray(e, s, r) {
    let n = e * s, o = (e + 1) * s, a = "subarray" in this.data ? this.data.subarray(n, o) : this.data.slice(n, o);
    return new t2(this.type, a, r);
  }
  item() {
    let e = this.data;
    if (e.length !== 1) throw new Error(`a Tensor with ${e.length} elements cannot be converted to Scalar`);
    return e[0];
  }
  tolist() {
    return UM(this.data, this.dims);
  }
  sigmoid() {
    return this.clone().sigmoid_();
  }
  sigmoid_() {
    let e = this.data;
    for (let s = 0; s < e.length; ++s) e[s] = 1 / (1 + Math.exp(-e[s]));
    return this;
  }
  map(e) {
    return this.clone().map_(e);
  }
  map_(e) {
    let s = this.data;
    for (let r = 0; r < s.length; ++r) s[r] = e(s[r], r, s);
    return this;
  }
  mul(e) {
    return this.clone().mul_(e);
  }
  mul_(e) {
    let s = this.data;
    for (let r = 0; r < s.length; ++r) s[r] *= e;
    return this;
  }
  div(e) {
    return this.clone().div_(e);
  }
  div_(e) {
    let s = this.data;
    for (let r = 0; r < s.length; ++r) s[r] /= e;
    return this;
  }
  add(e) {
    return this.clone().add_(e);
  }
  add_(e) {
    let s = this.data;
    for (let r = 0; r < s.length; ++r) s[r] += e;
    return this;
  }
  sub(e) {
    return this.clone().sub_(e);
  }
  sub_(e) {
    let s = this.data;
    for (let r = 0; r < s.length; ++r) s[r] -= e;
    return this;
  }
  remainder(e) {
    return this.clone().remainder_(e);
  }
  remainder_(e) {
    let s = this.data, n = s instanceof BigInt64Array || s instanceof BigUint64Array ? BigInt(e) : Number(e);
    if ((n === 0 || n === 0n) && (this.type.includes("int") || this.type === "bool")) throw new RangeError("Division by zero");
    if (n < 0 && (this.type.startsWith("uint") || this.type === "bool")) throw new RangeError("Negative divisors are not supported for unsigned or boolean tensors");
    for (let o = 0; o < s.length; ++o) {
      let a = s[o] % n, i = a < 0 && n > 0 || a > 0 && n < 0;
      s[o] = i ? a + n : a;
    }
    return this;
  }
  clone() {
    return new t2(this.type, this.data.slice(), this.dims.slice());
  }
  slice(...e) {
    let s = [], r = [];
    for (let p = 0; p < this.dims.length; ++p) {
      let u = e[p];
      if (u == null) r.push([0, this.dims[p]]), s.push(this.dims[p]);
      else if (typeof u == "number") u = ft2(u, this.dims[p], p), r.push([u, u + 1]);
      else if (Array.isArray(u) && u.length === 2) {
        let [_, d] = u;
        if (_ = _ === null ? 0 : ft2(_, this.dims[p], p, false), d = d === null ? this.dims[p] : ft2(d, this.dims[p], p, false), _ > d) throw new Error(`Invalid slice: ${u}`);
        let f = [Math.max(_, 0), Math.min(d, this.dims[p])];
        r.push(f), s.push(f[1] - f[0]);
      } else throw new Error(`Invalid slice: ${u}`);
    }
    let n = r.map(([p, u]) => u - p), o = n.reduce((p, u) => p * u), a = this.data, i = new a.constructor(o), l = this.stride(), c = true;
    for (let p = 1; p < n.length; ++p) if (r[p][0] !== 0 || r[p][1] !== this.dims[p]) {
      c = false;
      break;
    }
    if (c) {
      let p = r[0][0] * l[0], u = r[0][1] * l[0];
      if (ArrayBuffer.isView(a)) i.set(a.subarray(p, u));
      else if (Array.isArray(a)) {
        let _ = a.slice(p, u);
        for (let d = 0; d < _.length; ++d) i[d] = _[d];
      } else throw new Error("Unsupported data type for slicing");
    } else for (let p = 0; p < o; ++p) {
      let u = 0;
      for (let _ = n.length - 1, d = p; _ >= 0; --_) {
        let f = n[_];
        u += (d % f + r[_][0]) * l[_], d = Math.floor(d / f);
      }
      i[p] = a[u];
    }
    return new t2(this.type, i, s);
  }
  permute(...e) {
    return jM(this, e);
  }
  transpose(...e) {
    return this.permute(...e);
  }
  sum(e = null, s = false) {
    return this.norm(1, e, s);
  }
  norm(e = "fro", s = null, r = false) {
    if (e === "fro") e = 2;
    else if (typeof e == "string") throw Error(`Unsupported norm: ${e}`);
    let n = this.data, o = n instanceof BigInt64Array || n instanceof BigUint64Array;
    if (o && e !== 1) throw Error(`Expected a floating point tensor as input. Got ${this.type}`);
    let a, i;
    if (o ? (a = (u, _) => u + _, i = 0n) : (a = (u, _) => u + _ ** e, i = 0), s === null) {
      let u = n.reduce(a, i);
      return e !== 1 && (u = u ** (1 / e)), new t2(this.type, [u], []);
    }
    let [l, c, p] = Jr2(a, this, s, r);
    if (e !== 1) for (let u = 0; u < c.length; ++u) c[u] = c[u] ** (1 / e);
    return new t2(l, c, p);
  }
  normalize_(e = 2, s = 1) {
    s = ft2(s, this.dims.length);
    let r = this.norm(e, s, true), n = this.data, o = r.data;
    for (let a = 0; a < n.length; ++a) {
      let i = 0;
      for (let l = this.dims.length - 1, c = a, p = 1; l >= 0; --l) {
        let u = this.dims[l];
        if (l !== s) {
          let _ = c % u;
          i += _ * p, p *= this.dims[l];
        }
        c = Math.floor(c / u);
      }
      n[a] /= o[i];
    }
    return this;
  }
  normalize(e = 2, s = 1) {
    return this.clone().normalize_(e, s);
  }
  stride() {
    return Dp(this.dims);
  }
  squeeze(e = null) {
    return new t2(this.type, this.data, ck(this.dims, e));
  }
  squeeze_(e = null) {
    return this.dims = ck(this.dims, e), this;
  }
  unsqueeze(e) {
    return new t2(this.type, this.data, pk(this.dims, e));
  }
  unsqueeze_(e) {
    return this.dims = pk(this.dims, e), this;
  }
  flatten_(e = 0, s = -1) {
    s = (s + this.dims.length) % this.dims.length;
    let r = this.dims.slice(0, e), n = this.dims.slice(e, s + 1), o = this.dims.slice(s + 1);
    return this.dims = [...r, n.reduce((a, i) => a * i, 1), ...o], this;
  }
  flatten(e = 0, s = -1) {
    return this.clone().flatten_(e, s);
  }
  view(...e) {
    let s = -1;
    for (let n = 0; n < e.length; ++n) if (e[n] === -1) {
      if (s !== -1) throw new Error("Only one dimension can be inferred");
      s = n;
    }
    let r = this.data;
    if (s !== -1) {
      let n = e.reduce((o, a, i) => i !== s ? o * a : o, 1);
      e[s] = r.length / n;
    }
    return new t2(this.type, r, e);
  }
  neg_() {
    let e = this.data;
    for (let s = 0; s < e.length; ++s) e[s] = -e[s];
    return this;
  }
  neg() {
    return this.clone().neg_();
  }
  gt(e) {
    let s = new Uint8Array(this.data.length), r = this.data;
    for (let n = 0; n < r.length; ++n) s[n] = r[n] > e ? 1 : 0;
    return new t2("bool", s, this.dims);
  }
  lt(e) {
    let s = new Uint8Array(this.data.length), r = this.data;
    for (let n = 0; n < r.length; ++n) s[n] = r[n] < e ? 1 : 0;
    return new t2("bool", s, this.dims);
  }
  clamp_(e, s) {
    let r = this.data;
    for (let n = 0; n < r.length; ++n) r[n] = Math.min(Math.max(r[n], e), s);
    return this;
  }
  clamp(e, s) {
    return this.clone().clamp_(e, s);
  }
  round_() {
    let e = this.data;
    for (let s = 0; s < e.length; ++s) e[s] = Math.round(e[s]);
    return this;
  }
  round() {
    return this.clone().round_();
  }
  mean(e = null, s = false) {
    return Xi(this, e, s);
  }
  min(e = null, s = false) {
    if (e === null) {
      let a = Qr2(this.data)[0];
      return new t2(this.type, [a], []);
    }
    let [r, n, o] = Jr2((a, i) => Math.min(a, i), this, e, s, 1 / 0);
    return new t2(r, n, o);
  }
  max(e = null, s = false) {
    if (e === null) {
      let a = fe(this.data)[0];
      return new t2(this.type, [a], []);
    }
    let [r, n, o] = Jr2((a, i) => Math.max(a, i), this, e, s, -1 / 0);
    return new t2(r, n, o);
  }
  argmin(e = null, s = false) {
    if (e !== null) throw new Error("`dim !== null` not yet implemented.");
    let r = Qr2(this.data)[1];
    return new t2("int64", [BigInt(r)], []);
  }
  argmax(e = null, s = false) {
    if (e !== null) throw new Error("`dim !== null` not yet implemented.");
    let r = fe(this.data)[1];
    return new t2("int64", [BigInt(r)], []);
  }
  repeat(...e) {
    if (e.length < this.dims.length) throw new Error(`Number of dimensions of repeat dims (${e.length}) cannot be smaller than number of dimensions of tensor (${this.dims.length})`);
    if (e.every((p) => p === 1)) {
      if (e.length === this.dims.length) return this.clone();
      let p = e.length - this.dims.length, u = Array(p).fill(1).concat(this.dims);
      return new t2(this.type, this.data.slice(), u);
    }
    let s = e.length - this.dims.length, r = Array(s).fill(1).concat(this.dims), n = r.map((p, u) => p * e[u]), o = n.reduce((p, u) => p * u, 1), a = this.data, i = new a.constructor(o), l = Dp(r), c = Dp(n);
    for (let p = 0; p < o; ++p) {
      let u = p, _ = 0;
      for (let d = 0; d < n.length; ++d) {
        let f = Math.floor(u / c[d]);
        u = u % c[d];
        let m = f % r[d];
        _ += m * l[d];
      }
      i[p] = a[_];
    }
    return new t2(this.type, i, n);
  }
  tile(...e) {
    if (e.length < this.dims.length) {
      let s = this.dims.length - e.length;
      e = Array(s).fill(1).concat(e);
    }
    return this.repeat(...e);
  }
  to(e) {
    if (this.type === e) return this;
    if (!Wt.hasOwnProperty(e)) throw new Error(`Unsupported type: ${e}`);
    let s, r = ["int64", "uint64"].includes(this.type), n = ["int64", "uint64"].includes(e);
    if (r && !n) s = Number;
    else if (!r && n) ["float16", "float32", "float64"].includes(this.type) ? s = (o) => BigInt(Math.floor(o)) : s = BigInt;
    else if (this.type === "float16" && e == "float32" && this.data instanceof Uint16Array) return new t2(e, Kb(this.data), this.dims);
    return new t2(e, Wt[e].from(this.data, s), this.dims);
  }
};
function UM(t6, e) {
  let s = t6.length, r = e.length === 0 ? 1 : e.reduce((o, a) => o * a);
  if (s !== r) throw Error(`cannot reshape array of size ${s} into shape (${e})`);
  let n = t6;
  for (let o = e.length - 1; o >= 0; o--) n = n.reduce((a, i) => {
    let l = a[a.length - 1];
    return l.length < e[o] ? l.push(i) : a.push([i]), a;
  }, [[]]);
  return n[0];
}
function jM(t6, e) {
  let [s, r] = Ub(t6.data, t6.dims, e);
  return new E(t6.type, s, r);
}
function Bp(t6, [e, s], r = "bilinear", n = false) {
  let o = t6.dims.at(-3) ?? 1, a = t6.dims.at(-2), i = t6.dims.at(-1), l = qb(t6.data, [o, a, i], [e, s], r, n);
  return new E(t6.type, l, [o, e, s]);
}
async function He2(t6, { size: e = null, mode: s = "bilinear" } = {}) {
  if (t6.dims.length !== 4) throw new Error("`interpolate_4d` currently only supports 4D input.");
  if (!e) throw new Error("`interpolate_4d` requires a `size` argument.");
  let r;
  if (e.length === 2) r = [...t6.dims.slice(0, 2), ...e];
  else if (e.length === 3) r = [t6.dims[0], ...e];
  else if (e.length === 4) r = e;
  else throw new Error("`size` must be of length 2, 3, or 4.");
  let n;
  if (s === "nearest") n = await bt2.nearest_interpolate_4d;
  else if (s === "bilinear") n = await bt2.bilinear_interpolate_4d;
  else if (s === "bicubic") n = await bt2.bicubic_interpolate_4d;
  else throw new Error(`Unsupported mode: ${s}`);
  let o = new E("int64", new BigInt64Array(r.map(BigInt)), [r.length]);
  return await n({ x: t6, s: o });
}
async function uk(t6, e) {
  return await (await bt2.matmul)({ a: t6, b: e });
}
async function R2(t6, e) {
  let s = ft2(Number(e.item()), t6.dims.length);
  return await (await bt2.rfft)({ x: t6.unsqueeze(-1), a: new E("int64", [BigInt(s)], []) });
}
async function mt(t6, e) {
  let s = await bt2.top_k;
  return e == null ? e = t6.dims.at(-1) : e = Math.min(e, t6.dims.at(-1)), await s({ x: t6, k: new E("int64", [BigInt(e)], [1]) });
}
var Hi = (t6) => new E("int64", t6, [t6.length]);
async function Ki(t6, e, s, r, n) {
  return await (await bt2.slice)({ x: t6, s: Hi(e), e: Hi(s), a: Hi(r), t: Hi(n ?? new Array(r.length).fill(1)) });
}
function _k(t6, e) {
  let s = t6.data, r = e.data, n = [t6.dims[0], t6.dims[2]], o = new s.constructor(n[0] * n[1]), [a, i, l] = t6.dims, c = 0;
  for (let p = 0; p < a; ++p) {
    let u = p * l * i;
    for (let _ = 0; _ < l; ++_) {
      let d = 0, f = 0, m = p * i, g = u + _;
      for (let x = 0; x < i; ++x) {
        let y = Number(r[m + x]);
        f += y, d += s[g + x * l] * y;
      }
      let w = d / f;
      o[c++] = w;
    }
  }
  return new E(t6.type, o, n);
}
function F2(t6, e, { eps: s = 1e-5 } = {}) {
  if (t6.dims.length !== 2) throw new Error("`layer_norm` currently only supports 2D input.");
  let [r, n] = t6.dims;
  if (e.length !== 1 && e[0] !== n) throw new Error("`normalized_shape` must be a 1D array with shape `[input.dims[1]]`.");
  let [o, a] = qp(t6, 1, 0, true), i = o.data, l = a.data, c = t6.data, p = new c.constructor(c.length);
  for (let u = 0; u < r; ++u) {
    let _ = u * n;
    for (let d = 0; d < n; ++d) {
      let f = _ + d;
      p[f] = (c[f] - l[u]) / (i[u] + s);
    }
  }
  return new E(t6.type, p, t6.dims);
}
function ck(t6, e) {
  return t6 = t6.slice(), e === null ? t6 = t6.filter((s) => s !== 1) : typeof e == "number" ? t6[e] === 1 && t6.splice(e, 1) : Array.isArray(e) && (t6 = t6.filter((s, r) => s !== 1 || !e.includes(r))), t6;
}
function pk(t6, e) {
  return e = ft2(e, t6.length + 1), t6 = t6.slice(), t6.splice(e, 0, 1), t6;
}
function ft2(t6, e, s = null, r = true) {
  if (t6 < -e || t6 >= e) {
    if (r) throw new Error(`IndexError: index ${t6} is out of bounds for dimension${s === null ? "" : " " + s} with size ${e}`);
    return t6 < -e ? 0 : e;
  }
  return t6 < 0 && (t6 = (t6 % e + e) % e), t6;
}
function ne(t6, e = 0) {
  e = ft2(e, t6[0].dims.length);
  let s = t6[0].dims.slice();
  s[e] = t6.reduce((a, i) => a + i.dims[e], 0);
  let r = s.reduce((a, i) => a * i, 1), n = new t6[0].data.constructor(r), o = t6[0].type;
  if (e === 0) {
    let a = 0;
    for (let i of t6) {
      let l = i.data;
      n.set(l, a), a += l.length;
    }
  } else {
    let a = 0;
    for (let i = 0; i < t6.length; ++i) {
      let { data: l, dims: c } = t6[i];
      for (let p = 0; p < l.length; ++p) {
        let u = 0;
        for (let _ = c.length - 1, d = p, f = 1; _ >= 0; --_) {
          let m = c[_], g = d % m;
          _ === e && (g += a), u += g * f, f *= s[_], d = Math.floor(d / m);
        }
        n[u] = l[p];
      }
      a += c[e];
    }
  }
  return new E(o, n, s);
}
function Ge(t6, e = 0) {
  return ne(t6.map((s) => s.unsqueeze(e)), e);
}
function Jr2(t6, e, s, r = false, n = null) {
  let o = e.data, a = e.dims;
  s = ft2(s, a.length);
  let i = a.slice();
  i[s] = 1;
  let l = new o.constructor(o.length / a[s]);
  n !== null && l.fill(n);
  for (let c = 0; c < o.length; ++c) {
    let p = 0;
    for (let u = a.length - 1, _ = c, d = 1; u >= 0; --u) {
      let f = a[u];
      if (u !== s) {
        let m = _ % f;
        p += m * d, d *= i[u];
      }
      _ = Math.floor(_ / f);
    }
    l[p] = t6(l[p], o[c], c, p);
  }
  return r || i.splice(s, 1), [e.type, l, i];
}
function qp(t6, e = null, s = 1, r = false) {
  let n = t6.data, o = t6.dims;
  if (e === null) {
    let d = n.reduce((w, x) => w + x, 0) / n.length, f = Math.sqrt(n.reduce((w, x) => w + (x - d) ** 2, 0) / (n.length - s)), m = new E(t6.type, [d], []);
    return [new E(t6.type, [f], []), m];
  }
  e = ft2(e, o.length);
  let a = Xi(t6, e, r), i = a.data, [l, c, p] = Jr2((_, d, f, m) => _ + (d - i[m]) ** 2, t6, e, r);
  for (let _ = 0; _ < c.length; ++_) c[_] = Math.sqrt(c[_] / (o[e] - s));
  return [new E(l, c, p), a];
}
function Xi(t6, e = null, s = false) {
  let r = t6.dims, n = t6.data;
  if (e === null) {
    let l = n.reduce((c, p) => c + p, 0);
    return new E(t6.type, [l / n.length], []);
  }
  e = ft2(e, r.length);
  let [o, a, i] = Jr2((l, c) => l + c, t6, e, s);
  if (r[e] !== 1) for (let l = 0; l < a.length; ++l) a[l] /= r[e];
  return new E(o, a, i);
}
function Dp(t6) {
  let e = new Array(t6.length);
  for (let s = t6.length - 1, r = 1; s >= 0; --s) e[s] = r, r *= t6[s];
  return e;
}
function Up(t6, e, s, r) {
  let n = t6.reduce((o, a) => o * a, 1);
  return new E(s, new r(n).fill(e), t6);
}
function Ae(t6, e) {
  let s, r;
  if (typeof e == "number") s = "float32", r = Float32Array;
  else if (typeof e == "bigint") s = "int64", r = BigInt64Array;
  else if (typeof e == "boolean") s = "bool", r = Uint8Array;
  else throw new Error(`Unsupported data type: ${typeof e}`);
  return Up(t6, e, s, r);
}
function Zr2(t6, e) {
  return Ae(t6.dims, e);
}
function Oe(t6) {
  return Up(t6, 1n, "int64", BigInt64Array);
}
function Qs2(t6) {
  return Oe(t6.dims);
}
function jp(t6) {
  return Up(t6, 0n, "int64", BigInt64Array);
}
function en2(t6) {
  return jp(t6.dims);
}
function D2(t6) {
  let e = t6.reduce((s, r) => s * r, 1);
  return new E("float32", Float32Array.from({ length: e }, () => fs2.random()), t6);
}
function dk(t6) {
  let e = t6.reduce((s, r) => s * r, 1);
  return new E("float32", Float32Array.from({ length: e }, () => fs2.gauss()), t6);
}
function fk(t6, e) {
  if (t6.dims.length !== 2) throw new Error("The tensor must have 2 dimensions");
  if (t6.dims.at(-1) % 8 !== 0) throw new Error("The last dimension of the tensor must be a multiple of 8");
  if (!["binary", "ubinary"].includes(e)) throw new Error("The precision must be either 'binary' or 'ubinary'");
  let s = e === "binary", r = s ? "int8" : "uint8", n = s ? Int8Array : Uint8Array, o = t6.data, a = new n(o.length / 8);
  for (let i = 0; i < o.length; ++i) {
    let l = o[i] > 0 ? 1 : 0, c = Math.floor(i / 8), p = i % 8;
    a[c] |= l << 7 - p, s && p === 0 && (a[c] -= 128);
  }
  return new E(r, a, [t6.dims[0], t6.dims[1] / 8]);
}
async function Ys2(t6) {
  if (!t6) throw new Error("modelId is required for get_tokenizer_files");
  return (await Ye(t6, "tokenizer_config.json", {})).exists ? ["tokenizer.json", "tokenizer_config.json"] : [];
}
async function Gp(t6, e) {
  let s = await Ys2(t6);
  return await Promise.all(s.map((r) => ze2(t6, r, true, e)));
}
function tn2(t6) {
  let e = t6.dims;
  switch (e.length) {
    case 1:
      return t6.tolist();
    case 2:
      if (e[0] !== 1) throw new Error("Unable to decode tensor with `batch size !== 1`. Use `tokenizer.batch_decode(...)` for batched inputs.");
      return t6.tolist()[0];
    default:
      throw new Error(`Expected tensor to have 1-2 dimensions, got ${e.length}.`);
  }
}
var GM = ["bos_token", "eos_token", "unk_token", "sep_token", "pad_token", "cls_token", "mask_token"];
function WM(t6, e, s, r) {
  for (let n of Object.keys(t6)) {
    let o = e - t6[n].length, a = s(n), i = new Array(o).fill(a);
    t6[n] = r === "right" ? Ue(t6[n], i) : Ue(i, t6[n]);
  }
}
function VM(t6, e) {
  for (let s of Object.keys(t6)) t6[s].length = e;
}
function gs2(t6, ...e) {
  for (let s of e) {
    if (!Object.hasOwn(t6, s)) continue;
    let r = t6[s];
    if (r) if (typeof r == "object") {
      if (r.__type === "AddedToken") return r.content;
      throw Error(`Unknown token: ${r}`);
    } else return r;
  }
  return null;
}
function HM(t6) {
  let e = [];
  for (let s of t6.get_added_tokens_decoder().values()) s.special && e.push(s);
  return e;
}
var N = class extends xe {
  return_token_type_ids = false;
  padding_side = "right";
  constructor(e, s) {
    if (super(), this._tokenizerJSON = e, this._tokenizerConfig = s, this._tokenizer = new _b(e, s), this.config = s, this.padding_side = s.padding_side ?? this.padding_side, this.mask_token = gs2(s, "mask_token"), this.mask_token_id = this._tokenizer.token_to_id(this.mask_token), this.pad_token = gs2(s, "pad_token", "eos_token"), this.pad_token_id = this._tokenizer.token_to_id(this.pad_token), this.sep_token = gs2(s, "sep_token"), this.sep_token_id = this._tokenizer.token_to_id(this.sep_token), this.unk_token = gs2(s, "unk_token"), this.unk_token_id = this._tokenizer.token_to_id(this.unk_token), this.bos_token = gs2(s, "bos_token"), this.bos_token_id = this._tokenizer.token_to_id(this.bos_token), this.eos_token = gs2(s, "eos_token"), this.eos_token_id = this._tokenizer.token_to_id(this.eos_token), this.chat_template = s.chat_template ?? null, Array.isArray(this.chat_template)) {
      let n = /* @__PURE__ */ Object.create(null);
      for (let { name: o, template: a } of this.chat_template) {
        if (typeof o != "string" || typeof a != "string") throw new Error('Chat template must be a list of objects with "name" and "template" properties');
        n[o] = a;
      }
      this.chat_template = n;
    }
    this._compiled_template_cache = /* @__PURE__ */ new Map();
    let r = HM(this._tokenizer);
    this.all_special_ids = r.map((n) => n.id), this.all_special_tokens = r.map((n) => n.content);
  }
  static async from_pretrained(e, { progress_callback: s = null, config: r = null, cache_dir: n = null, local_files_only: o = false, revision: a = "main" } = {}) {
    let i = await Gp(e, { progress_callback: s, config: r, cache_dir: n, local_files_only: o, revision: a });
    return new this(...i);
  }
  get_vocab() {
    return this._tokenizer.get_vocab();
  }
  get model_max_length() {
    return this._tokenizerConfig.model_max_length ?? 1 / 0;
  }
  get add_eos_token() {
    return this._tokenizerConfig.add_eos_token;
  }
  get add_bos_token() {
    return this._tokenizerConfig.add_bos_token;
  }
  convert_tokens_to_ids(e) {
    return typeof e == "string" ? this._tokenizer.token_to_id(e) : e.map((s) => this._tokenizer.token_to_id(s));
  }
  _call(e, s = {}) {
    let { text_pair: r = null, add_special_tokens: n = true, padding: o = false, return_token_type_ids: a = null } = s, { truncation: i = null, max_length: l = null } = s, c = s.return_tensor ?? true, p = Array.isArray(e), u;
    if (p) {
      if (e.length === 0) throw Error("text array must be non-empty");
      if (r !== null) {
        if (Array.isArray(r)) {
          if (e.length !== r.length) throw Error("text and text_pair must have the same length");
        } else throw Error("text_pair must also be an array");
        u = e.map((d, f) => this._encode_plus(d, { text_pair: r[f], add_special_tokens: n, return_token_type_ids: a }));
      } else u = e.map((d) => this._encode_plus(d, { add_special_tokens: n, return_token_type_ids: a }));
    } else {
      if (e == null) throw Error("text may not be null or undefined");
      if (Array.isArray(r)) throw Error("When specifying `text_pair`, since `text` is a string, `text_pair` must also be a string (i.e., not an array).");
      u = [this._encode_plus(e, { text_pair: r, add_special_tokens: n, return_token_type_ids: a })];
    }
    if (l === null ? l = this.model_max_length : i === null && (o === true ? (R.warn("`max_length` is ignored when `padding: true` and there is no truncation strategy. To pad to max length, use `padding: 'max_length'`."), l = this.model_max_length) : o === false && (R.warn("Truncation was not explicitly activated but `max_length` is provided a specific value, please use `truncation: true` to explicitly truncate examples to max length."), i = true)), o === true && (l = Math.min(fe(u.map((d) => d.input_ids.length))[0], l ?? 1 / 0)), l = Math.min(l, this.model_max_length ?? 1 / 0), o || i) for (let d = 0; d < u.length; ++d) u[d].input_ids.length !== l && (u[d].input_ids.length > l ? i && VM(u[d], l) : o && WM(u[d], l, (f) => f === "input_ids" ? this.pad_token_id : 0, this.padding_side));
    let _ = {};
    if (c) {
      if (!(o && i) && u.some((f) => {
        for (let m of Object.keys(f)) if (f[m].length !== u[0][m]?.length) return true;
        return false;
      })) throw Error("Unable to create tensor, you should probably activate truncation and/or padding with 'padding=true' and 'truncation=true' to have batched tensors with the same length.");
      let d = [u.length, u[0].input_ids.length];
      for (let f of Object.keys(u[0])) _[f] = new E("int64", BigInt64Array.from(u.flatMap((m) => m[f]).map(BigInt)), d);
    } else {
      for (let d of Object.keys(u[0])) _[d] = u.map((f) => f[d]);
      if (!p) for (let d of Object.keys(_)) _[d] = _[d][0];
    }
    return _;
  }
  _encode_text(e) {
    return e === null ? null : this._tokenizer.encode(e).tokens;
  }
  _encode_plus(e, { text_pair: s = null, add_special_tokens: r = true, return_token_type_ids: n = null } = {}) {
    let { ids: o, attention_mask: a, token_type_ids: i } = this._tokenizer.encode(e, { text_pair: s, add_special_tokens: r, return_token_type_ids: n ?? this.return_token_type_ids });
    return { input_ids: o, attention_mask: a, ...i ? { token_type_ids: i } : {} };
  }
  tokenize(e, { pair: s = null, add_special_tokens: r = false } = {}) {
    return this._tokenizer.tokenize(e, { text_pair: s, add_special_tokens: r });
  }
  encode(e, { text_pair: s = null, add_special_tokens: r = true, return_token_type_ids: n = null } = {}) {
    return this._tokenizer.encode(e, { text_pair: s, add_special_tokens: r, return_token_type_ids: n }).ids;
  }
  batch_decode(e, s = {}) {
    return e instanceof E && (e = e.tolist()), e.map((r) => this.decode(r, s));
  }
  decode(e, s = {}) {
    if (e instanceof E && (e = tn2(e)), !Array.isArray(e) || e.length === 0 || !N0(e[0])) throw Error("token_ids must be a non-empty array of integers.");
    return this.decode_single(e, s);
  }
  decode_single(e, { skip_special_tokens: s = false, clean_up_tokenization_spaces: r = null }) {
    return this._tokenizer.decode(e, { skip_special_tokens: s, clean_up_tokenization_spaces: r });
  }
  get_chat_template({ chat_template: e = null, tools: s = null } = {}) {
    if (this.chat_template && typeof this.chat_template == "object") {
      let r = this.chat_template;
      if (e !== null && Object.hasOwn(r, e)) e = r[e];
      else if (e === null) if (s !== null && "tool_use" in r) e = r.tool_use;
      else if ("default" in r) e = r.default;
      else throw Error(`This model has multiple chat templates with no default specified! Please either pass a chat template or the name of the template you wish to use to the 'chat_template' argument. Available template names are ${Object.keys(r).sort()}.`);
    } else if (e === null) if (this.chat_template) e = this.chat_template;
    else throw Error("Cannot use apply_chat_template() because tokenizer.chat_template is not set and no template argument was passed! For information about writing templates and setting the tokenizer.chat_template attribute, please see the documentation at https://huggingface.co/docs/transformers/main/en/chat_templating");
    return e;
  }
  apply_chat_template(e, s = {}) {
    let { tools: r = null, documents: n = null, chat_template: o = null, add_generation_prompt: a = false, tokenize: i = true, padding: l = false, truncation: c = false, max_length: p = null, return_tensor: u = true, return_dict: _ = true, tokenizer_kwargs: d = {}, ...f } = s;
    if (o = this.get_chat_template({ chat_template: o, tools: r }), typeof o != "string") throw Error(`chat_template must be a string, but got ${typeof o}`);
    let m = this._compiled_template_cache.get(o);
    m === void 0 && (m = new Tb(o), this._compiled_template_cache.set(o, m));
    let g = /* @__PURE__ */ Object.create(null);
    for (let x of GM) {
      let y = gs2(this.config, x);
      y && (g[x] = y);
    }
    let w = m.render({ messages: e, add_generation_prompt: a, tools: r, documents: n, ...g, ...f });
    if (i) {
      let x = this._call(w, { add_special_tokens: false, padding: l, truncation: c, max_length: p, return_tensor: u, ...d });
      return _ ? x : x.input_ids;
    }
    return w;
  }
};
function Js2(t6, e, s, r) {
  if (!("language_codes" in t6) || !Array.isArray(t6.language_codes)) throw new Error("Tokenizer must have `language_codes` attribute set and it should be an array of language ids.");
  if (!("languageRegex" in t6) || !(t6.languageRegex instanceof RegExp)) throw new Error("Tokenizer must have `languageRegex` attribute set and it should be a regular expression.");
  if (!("lang_to_token" in t6) || typeof t6.lang_to_token != "function") throw new Error("Tokenizer must have `lang_to_token` attribute set and it should be a function.");
  let n = r.src_lang, o = r.tgt_lang;
  if (!t6.language_codes.includes(o)) throw new Error(`Target language code "${o}" is not valid. Must be one of: {${t6.language_codes.join(", ")}}`);
  if (n !== void 0) {
    if (!t6.language_codes.includes(n)) throw new Error(`Source language code "${n}" is not valid. Must be one of: {${t6.language_codes.join(", ")}}`);
    let a = t6._tokenizer.post_processor?.config;
    if (a && "single" in a) {
      for (let i of a.single) if ("SpecialToken" in i && t6.languageRegex.test(i.SpecialToken.id)) {
        i.SpecialToken.id = t6.lang_to_token(n);
        break;
      }
    }
  }
  return r.forced_bos_token_id = t6._tokenizer.token_to_id(t6.lang_to_token(o)), t6._call(e, s);
}
var $u = {};
qr($u, { AlbertTokenizer: () => Wp, AutoTokenizer: () => G2, BartTokenizer: () => Vp, BertTokenizer: () => Hp, BlenderbotSmallTokenizer: () => Kp, BlenderbotTokenizer: () => Xp, BloomTokenizer: () => Qp, CLIPTokenizer: () => Jp, CamembertTokenizer: () => Yp, CodeGenTokenizer: () => eu, CodeLlamaTokenizer: () => Zp, CohereAsrTokenizer: () => su, CohereTokenizer: () => tu, ConvBertTokenizer: () => ru, DebertaTokenizer: () => ou, DebertaV2Tokenizer: () => nu, DistilBertTokenizer: () => au, ElectraTokenizer: () => iu, EsmTokenizer: () => lu, FalconTokenizer: () => cu, GPT2Tokenizer: () => _u, GPTNeoXTokenizer: () => uu, GemmaTokenizer: () => pu, HerbertTokenizer: () => du, LlamaTokenizer: () => fu, M2M100Tokenizer: () => mu, MBart50Tokenizer: () => gu, MBartTokenizer: () => sn2, MPNetTokenizer: () => yu, MarianTokenizer: () => hu, MgpstrTokenizer: () => xu, MobileBertTokenizer: () => wu, NllbTokenizer: () => bu, NougatTokenizer: () => ku, PreTrainedTokenizer: () => N, Qwen2Tokenizer: () => vu, RoFormerTokenizer: () => Au, RobertaTokenizer: () => Eu, SiglipTokenizer: () => Mu, SpeechT5Tokenizer: () => Su, SqueezeBertTokenizer: () => Ou, T5Tokenizer: () => Iu, TokenizersBackend: () => N, VitsTokenizer: () => zu, Wav2Vec2CTCTokenizer: () => Cu, WhisperTokenizer: () => Pu, XLMRobertaTokenizer: () => Nu, XLMTokenizer: () => Lu });
var Wp = class extends N {
  return_token_type_ids = true;
};
var Vp = class extends N {
};
var Hp = class extends N {
  return_token_type_ids = true;
};
var Kp = class extends N {
};
var Xp = class extends N {
};
var Qp = class extends N {
};
var Yp = class extends N {
};
var Jp = class extends N {
};
var Zp = class extends N {
};
var eu = class extends N {
};
var tu = class extends N {
};
var su = class extends N {
};
var ru = class extends N {
  return_token_type_ids = true;
};
var nu = class extends N {
  return_token_type_ids = true;
};
var ou = class extends N {
  return_token_type_ids = true;
};
var au = class extends N {
};
var iu = class extends N {
  return_token_type_ids = true;
};
var lu = class extends N {
};
var cu = class extends N {
};
var pu = class extends N {
};
var uu = class extends N {
};
var _u = class extends N {
};
var du = class extends N {
  return_token_type_ids = true;
};
var fu = class extends N {
  padding_side = "left";
};
var mu = class extends N {
  constructor(e, s) {
    super(e, s), this.languageRegex = /^__[a-z]{2,3}__$/, this.language_codes = this.all_special_tokens.filter((r) => this.languageRegex.test(r)).map((r) => r.slice(2, -2)), this.lang_to_token = (r) => `__${r}__`;
  }
  _build_translation_inputs(e, s, r) {
    return Js2(this, e, s, r);
  }
};
var hu = class extends N {
  constructor(e, s) {
    super(e, s), this.languageRegex = /^(>>\w+<<)\s*/g, this.supported_language_codes = Array.from(this.get_vocab().keys()).filter((r) => this.languageRegex.test(r)), R.warn('WARNING: `MarianTokenizer` is not yet supported by Hugging Face\'s "fast" tokenizers library. Therefore, you may experience slightly inaccurate results.');
  }
  _encode_text(e) {
    if (e === null) return null;
    let [s, ...r] = e.trim().split(this.languageRegex);
    if (r.length === 0) return super._encode_text(s);
    if (r.length === 2) {
      let [n, o] = r;
      return this.supported_language_codes.includes(n) || R.warn(`Unsupported language code "${n}" detected, which may lead to unexpected behavior. Should be one of: ${JSON.stringify(this.supported_language_codes)}`), Ue([n], super._encode_text(o));
    }
  }
};
var sn2 = class extends N {
  constructor(e, s) {
    super(e, s), this.languageRegex = /^[a-z]{2}_[A-Z]{2}$/, this.language_codes = this.all_special_tokens.filter((r) => this.languageRegex.test(r)).map((r) => r), this.lang_to_token = (r) => r;
  }
  _build_translation_inputs(e, s, r) {
    return Js2(this, e, s, r);
  }
};
var gu = class extends sn2 {
};
var xu = class extends N {
};
var wu = class extends N {
  return_token_type_ids = true;
};
var yu = class extends N {
};
var bu = class extends N {
  constructor(e, s) {
    super(e, s), this.languageRegex = /^[a-z]{3}_[A-Z][a-z]{3}$/, this.language_codes = this.all_special_tokens.filter((r) => this.languageRegex.test(r)), this.lang_to_token = (r) => r;
  }
  _build_translation_inputs(e, s, r) {
    return Js2(this, e, s, r);
  }
};
var ku = class extends N {
};
var vu = class extends N {
};
var Eu = class extends N {
};
var Au = class extends N {
  return_token_type_ids = true;
};
var Mu = class extends N {
};
var Su = class extends N {
};
var Ou = class extends N {
  return_token_type_ids = true;
};
var Iu = class extends N {
};
var Tu = class extends st {
  decode_chain(e) {
    let s = "";
    for (let r = 1; r < e.length; r += 2) s += e[r];
    return [s];
  }
};
var zu = class extends N {
  constructor(e, s) {
    super(e, s), this._tokenizer.decoder = new Tu({ type: "VitsDecoder" });
  }
};
var Cu = class extends N {
};
var mk = [["en", "english"], ["zh", "chinese"], ["de", "german"], ["es", "spanish"], ["ru", "russian"], ["ko", "korean"], ["fr", "french"], ["ja", "japanese"], ["pt", "portuguese"], ["tr", "turkish"], ["pl", "polish"], ["ca", "catalan"], ["nl", "dutch"], ["ar", "arabic"], ["sv", "swedish"], ["it", "italian"], ["id", "indonesian"], ["hi", "hindi"], ["fi", "finnish"], ["vi", "vietnamese"], ["he", "hebrew"], ["uk", "ukrainian"], ["el", "greek"], ["ms", "malay"], ["cs", "czech"], ["ro", "romanian"], ["da", "danish"], ["hu", "hungarian"], ["ta", "tamil"], ["no", "norwegian"], ["th", "thai"], ["ur", "urdu"], ["hr", "croatian"], ["bg", "bulgarian"], ["lt", "lithuanian"], ["la", "latin"], ["mi", "maori"], ["ml", "malayalam"], ["cy", "welsh"], ["sk", "slovak"], ["te", "telugu"], ["fa", "persian"], ["lv", "latvian"], ["bn", "bengali"], ["sr", "serbian"], ["az", "azerbaijani"], ["sl", "slovenian"], ["kn", "kannada"], ["et", "estonian"], ["mk", "macedonian"], ["br", "breton"], ["eu", "basque"], ["is", "icelandic"], ["hy", "armenian"], ["ne", "nepali"], ["mn", "mongolian"], ["bs", "bosnian"], ["kk", "kazakh"], ["sq", "albanian"], ["sw", "swahili"], ["gl", "galician"], ["mr", "marathi"], ["pa", "punjabi"], ["si", "sinhala"], ["km", "khmer"], ["sn", "shona"], ["yo", "yoruba"], ["so", "somali"], ["af", "afrikaans"], ["oc", "occitan"], ["ka", "georgian"], ["be", "belarusian"], ["tg", "tajik"], ["sd", "sindhi"], ["gu", "gujarati"], ["am", "amharic"], ["yi", "yiddish"], ["lo", "lao"], ["uz", "uzbek"], ["fo", "faroese"], ["ht", "haitian creole"], ["ps", "pashto"], ["tk", "turkmen"], ["nn", "nynorsk"], ["mt", "maltese"], ["sa", "sanskrit"], ["lb", "luxembourgish"], ["my", "myanmar"], ["bo", "tibetan"], ["tl", "tagalog"], ["mg", "malagasy"], ["as", "assamese"], ["tt", "tatar"], ["haw", "hawaiian"], ["ln", "lingala"], ["ha", "hausa"], ["ba", "bashkir"], ["jw", "javanese"], ["su", "sundanese"]];
var rn2 = new Map(mk);
var KM = new Map([...mk.map(([t6, e]) => [e, t6]), ["burmese", "my"], ["valencian", "ca"], ["flemish", "nl"], ["haitian", "ht"], ["letzeburgesch", "lb"], ["pushto", "ps"], ["panjabi", "pa"], ["moldavian", "ro"], ["moldovan", "ro"], ["sinhalese", "si"], ["castilian", "es"]]);
function hk(t6) {
  t6 = t6.toLowerCase();
  let e = KM.get(t6);
  if (e === void 0) {
    let s = t6.match(/^<\|([a-z]{2})\|>$/);
    if (s && (t6 = s[1]), rn2.has(t6)) e = t6;
    else {
      let n = t6.length === 2 ? rn2.keys() : rn2.values();
      throw new Error(`Language "${t6}" is not supported. Must be one of: ${JSON.stringify(Array.from(n))}`);
    }
  }
  return e;
}
var XM = "\\p{P}\\u0021-\\u002F\\u003A-\\u0040\\u005B-\\u0060\\u007B-\\u007E";
var gk = new RegExp(`^[${XM}]+$`, "gu");
var QM = 0.1;
var Pu = class extends N {
  get timestamp_begin() {
    return this._tokenizer.token_to_id("<|notimestamps|>") + 1;
  }
  _decode_asr(e, { return_timestamps: s = false, return_language: r = false, time_precision: n = null, force_full_sequences: o = true } = {}) {
    if (n === null) throw Error("Must specify time_precision");
    let a = null, i = s === "word";
    function l() {
      return { language: a, timestamp: [null, null], text: "" };
    }
    let c = [], p = l(), u = 0, _ = this.timestamp_begin, f = _ + 1500, m = [], g = [], w = false, x = null, y = new Set(this.all_special_ids);
    for (let k of e) {
      let O = k.tokens, T = i ? k.token_timestamps : null, $ = null, C = _;
      if ("stride" in k) {
        let [V2, B, q] = k.stride;
        if (u -= B, x = V2 - q, B && (C = B / n + _), q) for (let Z = O.length - 1; Z >= 0; --Z) {
          let j2 = Number(O[Z]);
          if (j2 >= _) {
            if ($ !== null && (j2 - _) * n < x) break;
            $ = j2;
          }
        }
      }
      let D = [], W = [];
      for (let V2 = 0; V2 < O.length; ++V2) {
        let B = Number(O[V2]);
        if (y.has(B)) {
          let q = this.decode([B]), Z = rn2.get(q.slice(2, -2));
          if (Z !== void 0) {
            if (a !== null && Z !== a && !s) {
              m.push(D);
              let j2 = this.findLongestCommonSequence(m)[0], ue = this.decode(j2);
              p.text = ue, c.push(p), m = [], D = [], p = l();
            }
            a = p.language = Z;
          }
        } else if (B >= _ && B <= f) {
          let q = (B - _) * n + u, Z = hs2(q, 2);
          if ($ !== null && B >= $) w = true;
          else if (w || m.length > 0 && B < C) w = false;
          else if (p.timestamp[0] === null) p.timestamp[0] = Z;
          else if (Z !== p.timestamp[0]) {
            p.timestamp[1] = Z, m.push(D), i && g.push(W);
            let [j2, ue] = this.findLongestCommonSequence(m, g), _e = this.decode(j2);
            if (p.text = _e, i && (p.words = this.collateWordTimestamps(j2, ue, a), p.words.length > 0 && p.timestamp[1] !== null)) for (let A of p.words) A.timestamp[1] > p.timestamp[1] && p.timestamp[1] >= A.timestamp[0] && (A.timestamp[1] = p.timestamp[1]);
            c.push(p), m = [], D = [], g = [], W = [], p = l();
          }
        } else if (D.push(B), i) {
          let q = hs2(T[V2] + u, 2), Z;
          if (V2 + 1 < T.length) {
            Z = hs2(T[V2 + 1] + u, 2);
            let j2 = this.decode([B]);
            gk.test(j2) && (Z = hs2(Math.min(q + n, Z), 2));
          } else Z = null;
          W.push([q, Z]);
        }
      }
      if ("stride" in k) {
        let [V2, B, q] = k.stride;
        u += V2 - q;
      }
      D.length > 0 ? (m.push(D), i && g.push(W)) : m.every((V2) => V2.length === 0) && (p = l(), m = [], D = [], g = [], W = []);
    }
    if (m.length > 0) {
      if (o && s) throw new Error("Whisper did not predict an ending timestamp, which can happen if audio is cut off in the middle of a word. Also make sure WhisperTimeStampLogitsProcessor was used during generation.");
      let [k, O] = this.findLongestCommonSequence(m, g), T = this.decode(k);
      p.text = T, i && (p.words = this.collateWordTimestamps(k, O, a)), c.push(p);
    }
    let b = /* @__PURE__ */ Object.create(null), v = c.map((k) => k.text).join("");
    if (s || r) {
      for (let k = 0; k < c.length; ++k) {
        let O = c[k];
        s || delete O.timestamp, r || delete O.language;
      }
      if (i) {
        let k = [];
        for (let O of c) for (let T of O.words) k.push(T);
        b = { chunks: k };
      } else b = { chunks: c };
    }
    return [v, b];
  }
  findLongestCommonSequence(e, s = null) {
    let r = e[0], n = r.length, o = [], a = Array.isArray(s) && s.length > 0, i = a ? [] : null, l = a ? s[0] : null;
    for (let c = 1; c < e.length; ++c) {
      let p = e[c], u = 0, _ = [n, n, 0, 0], d = p.length;
      for (let b = 1; b < n + d; ++b) {
        let v = Math.max(0, n - b), k = Math.min(n, n + d - b), O = r.slice(v, k), T = Math.max(0, b - n), $ = Math.min(d, b), C = p.slice(T, $);
        if (O.length !== C.length) throw new Error("There is a bug within whisper `decode_asr` function, please report it. Dropping to prevent bad inference.");
        let D;
        a ? D = O.filter((B, q) => B === C[q] && l[v + q][0] - QM <= s[c][T + q][0]).length : D = O.filter((B, q) => B === C[q]).length;
        let W = b / 1e4, V2 = D / b + W;
        D > 1 && V2 > u && (u = V2, _ = [v, k, T, $]);
      }
      let [f, m, g, w] = _, x = Math.floor((m + f) / 2), y = Math.floor((w + g) / 2);
      if (a && u === 0 && n > 0) {
        let b = l[n - 1][0], v = s[c].findIndex((k) => k[0] >= b);
        y = v === -1 ? p.length : v;
      }
      o.push(...r.slice(0, x)), r = p.slice(y), n = r.length, a && (i.push(...l.slice(0, x)), l = s[c].slice(y));
    }
    return o.push(...r), a ? (i.push(...l), [o, i]) : [o, []];
  }
  collateWordTimestamps(e, s, r) {
    let [n, o, a] = this.combineTokensIntoWords(e, r), i = [];
    for (let l = 0; l < n.length; ++l) {
      let c = a[l];
      i.push({ text: n[l], timestamp: [s[c.at(0)][0], s[c.at(-1)][1]] });
    }
    return i;
  }
  combineTokensIntoWords(e, s, r = `"'\u201C\xA1\xBF([{-`, n = `"'.\u3002,\uFF0C!\uFF01?\uFF1F:\uFF1A\u201D)]}\u3001`) {
    s = s ?? "english";
    let o, a, i;
    return ["chinese", "japanese", "thai", "lao", "myanmar"].includes(s) ? [o, a, i] = this.splitTokensOnUnicode(e) : [o, a, i] = this.splitTokensOnSpaces(e), this.mergePunctuations(o, a, i, r, n);
  }
  decode(e, s) {
    let r;
    return s?.decode_with_timestamps ? (e instanceof E && (e = tn2(e)), r = this.decodeWithTimestamps(e, s)) : r = super.decode(e, s), r;
  }
  decodeWithTimestamps(e, s) {
    let r = s?.time_precision ?? 0.02, n = this.all_special_ids.at(-1) + 1, o = [[]];
    for (let a of e) if (a = Number(a), a >= n) {
      let i = ((a - n) * r).toFixed(2);
      o.push(`<|${i}|>`), o.push([]);
    } else o[o.length - 1].push(a);
    return o = o.map((a) => typeof a == "string" ? a : super.decode(a, s)), o.join("");
  }
  splitTokensOnUnicode(e) {
    let s = this.decode(e, { decode_with_timestamps: true }), r = "\uFFFD", n = [], o = [], a = [], i = [], l = [], c = 0;
    for (let p = 0; p < e.length; ++p) {
      let u = e[p];
      i.push(u), l.push(p);
      let _ = this.decode(i, { decode_with_timestamps: true });
      (!_.includes(r) || s[c + _.indexOf(r)] === r) && (n.push(_), o.push(i), a.push(l), i = [], l = [], c += _.length);
    }
    return [n, o, a];
  }
  splitTokensOnSpaces(e) {
    let [s, r, n] = this.splitTokensOnUnicode(e), o = [], a = [], i = [];
    for (let l = 0; l < s.length; ++l) {
      let c = s[l], p = r[l], u = n[l], _ = p[0] >= this._tokenizer.token_to_id("<|endoftext|>"), d = c.startsWith(" "), f = c.trim(), m = gk.test(f);
      if (_ || d || m || o.length === 0) o.push(c), a.push(p), i.push(u);
      else {
        let g = o.length - 1;
        o[g] += c, a[g].push(...p), i[g].push(...u);
      }
    }
    return [o, a, i];
  }
  mergePunctuations(e, s, r, n, o) {
    let a = structuredClone(e), i = structuredClone(s), l = structuredClone(r), c = a.length - 2, p = a.length - 1;
    for (; c >= 0; ) a[c].startsWith(" ") && n.includes(a[c].trim()) ? (a[p] = a[c] + a[p], i[p] = Ue(i[c], i[p]), l[p] = Ue(l[c], l[p]), a[c] = "", i[c] = [], l[c] = []) : p = c, --c;
    for (c = 0, p = 1; p < a.length; ) !a[c].endsWith(" ") && o.includes(a[p]) ? (a[c] += a[p], i[c] = Ue(i[c], i[p]), l[c] = Ue(l[c], l[p]), a[p] = "", i[p] = [], l[p] = []) : c = p, ++p;
    return [a.filter((u) => u), i.filter((u) => u.length > 0), l.filter((u) => u.length > 0)];
  }
};
var Nu = class extends N {
};
var Lu = class extends N {
  return_token_type_ids = true;
  constructor(e, s) {
    super(e, s), R.warn('WARNING: `XLMTokenizer` is not yet supported by Hugging Face\'s "fast" tokenizers library. Therefore, you may experience slightly inaccurate results.');
  }
};
var G2 = class {
  static async from_pretrained(e, { progress_callback: s = null, config: r = null, cache_dir: n = null, local_files_only: o = false, revision: a = "main" } = {}) {
    let [i, l] = await Gp(e, { progress_callback: s, config: r, cache_dir: n, local_files_only: o, revision: a }), c = l.tokenizer_class?.replace(/Fast$/, "") ?? "PreTrainedTokenizer", p = $u[c];
    return p || (R.warn(`Unknown tokenizer class "${c}", attempting to construct from base class.`), p = N), new p(i, l);
  }
};
var Vt = "https://github.com/huggingface/transformers.js/issues/new/choose";
var Qi = "preprocessor_config.json";
var Ot2 = "preprocessor_config.json";
var Yi = "processor_config.json";
var Ji = "chat_template.jinja";
var U = class extends xe {
  static classes = ["image_processor_class", "tokenizer_class", "feature_extractor_class"];
  static uses_processor_config = false;
  static uses_chat_template_file = false;
  constructor(e, s, r) {
    super(), this.config = e, this.components = s, this.chat_template = r;
  }
  get image_processor() {
    return this.components.image_processor;
  }
  get tokenizer() {
    return this.components.tokenizer;
  }
  get feature_extractor() {
    return this.components.feature_extractor;
  }
  apply_chat_template(e, s = {}) {
    if (!this.tokenizer) throw new Error("Unable to apply chat template without a tokenizer.");
    return this.tokenizer.apply_chat_template(e, { tokenize: false, chat_template: this.chat_template ?? void 0, ...s });
  }
  batch_decode(...e) {
    if (!this.tokenizer) throw new Error("Unable to decode without a tokenizer.");
    return this.tokenizer.batch_decode(...e);
  }
  decode(...e) {
    if (!this.tokenizer) throw new Error("Unable to decode without a tokenizer.");
    return this.tokenizer.decode(...e);
  }
  async _call(e, ...s) {
    for (let r of [this.image_processor, this.feature_extractor, this.tokenizer]) if (r) return r(e, ...s);
    throw new Error("No image processor, feature extractor, or tokenizer found.");
  }
  static async from_pretrained(e, s = {}) {
    let [r, n, o] = await Promise.all([this.uses_processor_config ? ze2(e, Yi, true, s) : {}, Promise.all(this.classes.filter((a) => a in this).map(async (a) => {
      let i = await this[a].from_pretrained(e, s);
      return [a.replace(/_class$/, ""), i];
    })).then(Object.fromEntries), this.uses_chat_template_file ? Xr2(e, Ji, true, s) : null]);
    return new this(r, n, o);
  }
};
var El = {};
qr(El, { ChatterboxProcessor: () => Ju, CohereAsrProcessor: () => Zu, EmbeddingGemma2Processor: () => t_, EmbeddingGemma2VideoProcessor: () => fn2, Florence2Processor: () => H_, Gemma3Processor: () => K_, Gemma3nProcessor: () => X_, Gemma4Processor: () => dn2, Glm46VProcessor: () => Q_, GraniteSpeechProcessor: () => Y_, GroundingDinoProcessor: () => J_, Idefics3Processor: () => yl, JinaCLIPProcessor: () => ed, Lfm2VlProcessor: () => td, LlavaProcessor: () => sd, MgpstrProcessor: () => rd, MoonshineProcessor: () => nd, OwlViTProcessor: () => od, PaliGemmaProcessor: () => ad, Phi3VProcessor: () => id, PixtralProcessor: () => ld, Processor: () => U, PyAnnoteProcessor: () => cd, Qwen2VLProcessor: () => ys2, Qwen2_5_VLProcessor: () => gn, Qwen3VLProcessor: () => pd, Sam2Processor: () => bl, Sam2VideoProcessor: () => ud, SamProcessor: () => xn, SmolVLMProcessor: () => yl, SpeechT5Processor: () => _d, UltravoxProcessor: () => dd, VLChatProcessor: () => Z_, VoxtralProcessor: () => fd, VoxtralRealtimeProcessor: () => hd, Wav2Vec2Processor: () => gd, Wav2Vec2ProcessorWithLM: () => xd, WhisperProcessor: () => wd });
var le2 = class extends xe {
  constructor(e) {
    super(), this.config = e;
  }
  static async from_pretrained(e, s = {}) {
    let r = await ze2(e, Qi, true, s);
    return new this(r);
  }
};
function ce2(t6, e) {
  if (!(t6 instanceof Float32Array || t6 instanceof Float64Array)) throw new Error(`${e} expects input to be a Float32Array or a Float64Array, but got ${t6?.constructor?.name ?? typeof t6} instead. If using the feature extractor directly, remember to use \`load_audio(url, sampling_rate)\` to obtain the raw audio data of the file/url.`);
}
var _n = {};
qr(_n, { ASTFeatureExtractor: () => Du, ChatterboxFeatureExtractor: () => Bu, ClapFeatureExtractor: () => qu, CohereAsrFeatureExtractor: () => Uu, DacFeatureExtractor: () => ln2, EncodecFeatureExtractor: () => on2, FeatureExtractor: () => le2, Gemma3nAudioFeatureExtractor: () => cn2, Gemma4AudioFeatureExtractor: () => pn2, GraniteSpeechFeatureExtractor: () => ju, MoonshineFeatureExtractor: () => Gu, ParakeetFeatureExtractor: () => an2, PyAnnoteFeatureExtractor: () => un2, SeamlessM4TFeatureExtractor: () => Wu, SnacFeatureExtractor: () => Vu, SpeechT5FeatureExtractor: () => Hu, VoxtralRealtimeFeatureExtractor: () => Qu, Wav2Vec2FeatureExtractor: () => Ku, WeSpeakerFeatureExtractor: () => Xu, WhisperFeatureExtractor: () => Yu });
var YM = () => {
};
var xk = { fromWeb: YM };
var JM = () => {
};
var wk = JM;
async function Zi(t6, e) {
  if (H.IS_BROWSER_ENV) {
    if (H.IS_WEBWORKER_ENV) throw new Error("Unable to save a file from a Web Worker.");
    let s = URL.createObjectURL(e), r = document.createElement("a");
    r.href = s, r.download = t6, r.click(), r.remove(), URL.revokeObjectURL(s);
  } else if (H.IS_FS_AVAILABLE) {
    let s = e.stream(), r = xk.fromWeb(s), n = qe.createWriteStream(t6);
    await wk(r, n);
  } else throw new Error("Unable to save because filesystem is disabled in this environment.");
}
async function kk(t6, e) {
  if (typeof AudioContext > "u") throw Error("Unable to load audio from path/URL since `AudioContext` is not available in your environment. Instead, audio data should be passed directly to the pipeline/processor. For more information and some example code, see https://huggingface.co/docs/transformers.js/guides/node-audio-processing.");
  let s = await (await Bt2(t6)).arrayBuffer(), r = new AudioContext({ sampleRate: e });
  typeof e > "u" && R.warn(`No sampling rate provided, using default of ${r.sampleRate}Hz.`);
  let n = await r.decodeAudioData(s), o;
  if (n.numberOfChannels === 2) {
    let a = Math.sqrt(2), i = n.getChannelData(0), l = n.getChannelData(1);
    o = new Float32Array(i.length);
    for (let c = 0; c < n.length; ++c) o[c] = a * (i[c] + l[c]) / 2;
  } else o = n.getChannelData(0);
  return o;
}
async function Fu(t6, e) {
  return await kk(t6, e);
}
function vk(t6, e) {
  if (t6 < 1) return new Float64Array();
  if (t6 === 1) return new Float64Array([1]);
  let s = 1 - e, r = 2 * Math.PI / (t6 - 1), n = new Float64Array(t6);
  for (let o = 0; o < t6; ++o) n[o] = e - s * Math.cos(o * r);
  return n;
}
function yk(t6) {
  return vk(t6, 0.5);
}
function ZM(t6) {
  return vk(t6, 0.54);
}
var eS = { htk: (t6) => 2595 * Math.log10(1 + t6 / 700), kaldi: (t6) => 1127 * Math.log(1 + t6 / 700), slaney: (t6, e = 1e3, s = 15, r = 27 / Math.log(6.4)) => t6 >= e ? s + Math.log(t6 / e) * r : 3 * t6 / 200 };
function Ru(t6, e = "htk") {
  let s = eS[e];
  if (!s) throw new Error('mel_scale should be one of "htk", "slaney" or "kaldi".');
  return typeof t6 == "number" ? s(t6) : t6.map((r) => s(r));
}
var tS = { htk: (t6) => 700 * (10 ** (t6 / 2595) - 1), kaldi: (t6) => 700 * (Math.exp(t6 / 1127) - 1), slaney: (t6, e = 1e3, s = 15, r = Math.log(6.4) / 27) => t6 >= s ? e * Math.exp(r * (t6 - s)) : 200 * t6 / 3 };
function sS(t6, e = "htk") {
  let s = tS[e];
  if (!s) throw new Error('mel_scale should be one of "htk", "slaney" or "kaldi".');
  return typeof t6 == "number" ? s(t6) : t6.map((r) => s(r));
}
function rS(t6, e) {
  let s = Float64Array.from({ length: e.length - 1 }, (a, i) => e[i + 1] - e[i]), r = Array.from({ length: t6.length }, () => new Array(e.length));
  for (let a = 0; a < t6.length; ++a) {
    let i = r[a];
    for (let l = 0; l < e.length; ++l) i[l] = e[l] - t6[a];
  }
  let n = e.length - 2, o = Array.from({ length: n }, () => new Array(t6.length));
  for (let a = 0; a < t6.length; ++a) {
    let i = r[a];
    for (let l = 0; l < n; ++l) {
      let c = -i[l] / s[l], p = i[l + 2] / s[l + 1];
      o[l][a] = Math.max(0, Math.min(c, p));
    }
  }
  return o;
}
function bk(t6, e, s) {
  let r = (e - t6) / (s - 1);
  return Float64Array.from({ length: s }, (n, o) => t6 + r * o);
}
function Le2(t6, e, s, r, n, o = null, a = "htk", i = false) {
  if (o !== null && o !== "slaney") throw new Error('norm must be one of null or "slaney"');
  if (t6 < 2) throw new Error(`Require num_frequency_bins: ${t6} >= 2`);
  if (s > r) throw new Error(`Require min_frequency: ${s} <= max_frequency: ${r}`);
  let l = Ru(s, a), c = Ru(r, a), p = bk(l, c, e + 2), u = sS(p, a), _;
  if (i) {
    let f = n / ((t6 - 1) * 2);
    _ = Ru(Float64Array.from({ length: t6 }, (m, g) => g * f), a), u = p;
  } else _ = bk(0, Math.floor(n / 2), t6);
  let d = rS(_, u);
  if (o !== null && o === "slaney") for (let f = 0; f < e; ++f) {
    let m = d[f], g = 2 / (u[f + 2] - u[f]);
    for (let w = 0; w < t6; ++w) m[w] *= g;
  }
  return d;
}
function nS(t6, e, s) {
  let r = new t6.constructor(t6.length + e + s), n = t6.length - 1;
  for (let o = 0; o < t6.length; ++o) r[e + o] = t6[o];
  for (let o = 1; o <= e; ++o) r[e - o] = t6[Us2(o, n)];
  for (let o = 1; o <= s; ++o) r[n + e + o] = t6[Us2(n - o, n)];
  return r;
}
function Ek(t6, e, s, r, n) {
  if (s <= 0) throw new Error("reference must be greater than zero");
  if (r <= 0) throw new Error("min_value must be greater than zero");
  s = Math.max(r, s);
  let o = Math.log10(s);
  for (let a = 0; a < t6.length; ++a) t6[a] = e * Math.log10(Math.max(r, t6[a]) - o);
  if (n !== null) {
    if (n <= 0) throw new Error("db_range must be greater than zero");
    let a = fe(t6)[0] - n;
    for (let i = 0; i < t6.length; ++i) t6[i] = Math.max(t6[i], a);
  }
  return t6;
}
function oS(t6, e = 1, s = 1e-5, r = null) {
  return Ek(t6, 20, e, s, r);
}
function aS(t6, e = 1, s = 1e-10, r = null) {
  return Ek(t6, 10, e, s, r);
}
async function Ce(t6, e, s, r, { fft_length: n = null, power: o = 1, center: a = true, pad_mode: i = "reflect", onesided: l = true, preemphasis: c = null, preemphasis_htk_flavor: p = true, mel_filters: u = null, mel_floor: _ = 1e-10, log_mel: d = null, max_log_mel: f = null, reference: m = 1, min_value: g = 1e-10, db_range: w = null, remove_dc_offset: x = null, min_num_frames: y = null, max_num_frames: b = null, do_pad: v = true, transpose: k = false, mel_offset: O = 0, mel_floor_mode: T = "clamp" } = {}) {
  let $ = e.length;
  if (n === null && (n = s), s > n) throw Error(`frame_length (${s}) may not be larger than fft_length (${n})`);
  if ($ !== s) throw new Error(`Length of the window (${$}) must equal frame_length (${s})`);
  if (r <= 0) throw new Error("hop_length must be greater than zero");
  if (o === null && u !== null) throw new Error("You have provided `mel_filters` but `power` is `None`. Mel spectrogram computation is not yet supported for complex-valued spectrogram. Specify `power` to fix this issue.");
  if (!p) throw new Error("`preemphasis_htk_flavor=false` is not currently supported.");
  if (a) {
    let M = Math.floor(s / 2);
    switch (i) {
      case "reflect": {
        t6 = nS(t6, M, M);
        break;
      }
      case "constant": {
        let I = new t6.constructor(t6.length + 2 * M);
        I.set(t6, M), t6 = I;
        break;
      }
      case "semicausal": {
        let I = new t6.constructor(t6.length + M);
        I.set(t6, M), t6 = I;
        break;
      }
      default:
        throw new Error(`pad_mode="${i}" not implemented yet.`);
    }
  }
  let C = Math.floor(1 + Math.floor((t6.length - s) / r));
  y !== null && C < y && (C = y);
  let D = l ? Math.floor(n / 2) + 1 : n, W = C, V2 = C;
  b !== null && (b > C ? v && (V2 = b) : V2 = W = b);
  let B = new qi(n), q = new Float64Array(n), Z = new Float64Array(B.outputBufferSize), j2 = new Float32Array(D * V2);
  for (let M = 0; M < W; ++M) {
    let I = M * r, oe = Math.min(t6.length - I, s);
    oe !== s && q.fill(0, 0, s);
    for (let ee2 = 0; ee2 < oe; ++ee2) q[ee2] = t6[I + ee2];
    if (x) {
      let ee2 = 0;
      for (let $e2 = 0; $e2 < oe; ++$e2) ee2 += q[$e2];
      let We2 = ee2 / oe;
      for (let $e2 = 0; $e2 < oe; ++$e2) q[$e2] -= We2;
    }
    if (c !== null) {
      for (let ee2 = oe - 1; ee2 >= 1; --ee2) q[ee2] -= c * q[ee2 - 1];
      q[0] *= 1 - c;
    }
    for (let ee2 = 0; ee2 < e.length; ++ee2) q[ee2] *= e[ee2];
    B.realTransform(Z, q);
    for (let ee2 = 0; ee2 < D; ++ee2) {
      let We2 = ee2 << 1;
      j2[ee2 * V2 + M] = Z[We2] ** 2 + Z[We2 + 1] ** 2;
    }
  }
  if (o !== null && o !== 2) {
    let M = o / 2;
    for (let I = 0; I < j2.length; ++I) j2[I] **= M;
  }
  let ue = u.length, _e = await uk(new E("float32", u.flat(), [ue, D]), new E("float32", j2, [D, V2]));
  k && (_e = _e.transpose(1, 0));
  let A = _e.data;
  if (T === "add") for (let M = 0; M < A.length; ++M) A[M] = O + A[M] + _;
  else for (let M = 0; M < A.length; ++M) A[M] = O + Math.max(_, A[M]);
  if (o !== null && d !== null) {
    let M = Math.min(A.length, W * ue);
    switch (d) {
      case "log":
        for (let I = 0; I < M; ++I) A[I] = Math.log(A[I]);
        break;
      case "log10":
        for (let I = 0; I < M; ++I) A[I] = Math.log10(A[I]);
        break;
      case "log10_max_norm": {
        for (let ee2 = 0; ee2 < M; ++ee2) A[ee2] = Math.log10(A[ee2]);
        let oe = (f ?? fe(A)[0]) - 8;
        for (let ee2 = 0; ee2 < M; ++ee2) A[ee2] = (Math.max(A[ee2], oe) + 4) / 4;
        break;
      }
      case "dB":
        if (o === 1) oS(A, m, g, w);
        else if (o === 2) aS(A, m, g, w);
        else throw new Error(`Cannot use log_mel option '${d}' with power ${o}`);
        break;
      default:
        throw new Error(`log_mel must be one of null, 'log', 'log10', 'log10_max_norm', or 'dB'. Got '${d}'`);
    }
  }
  return _e;
}
function Fe(t6, e, { periodic: s = true, frame_length: r = null, center: n = true } = {}) {
  let o = s ? t6 + 1 : t6, a;
  switch (e) {
    case "boxcar":
      a = new Float64Array(o).fill(1);
      break;
    case "hann":
    case "hann_window":
      a = yk(o);
      break;
    case "hamming":
      a = ZM(o);
      break;
    case "povey":
      a = yk(o).map((c) => Math.pow(c, 0.85));
      break;
    default:
      throw new Error(`Unknown window type ${e}.`);
  }
  if (s && (a = a.subarray(0, t6)), r === null || t6 === r) return a;
  if (t6 > r) throw new Error(`Length of the window (${t6}) may not be larger than frame_length (${r})`);
  let i = new Float64Array(r), l = n ? Math.floor((r - t6) / 2) : 0;
  return i.set(a, l), i;
}
function iS(t6, e) {
  let s = t6.reduce((o, a) => o + a.length, 0), r = new ArrayBuffer(44), n = new DataView(r);
  return el(n, 0, "RIFF"), n.setUint32(4, 36 + s * 4, true), el(n, 8, "WAVE"), el(n, 12, "fmt "), n.setUint32(16, 16, true), n.setUint16(20, 3, true), n.setUint16(22, 1, true), n.setUint32(24, e, true), n.setUint32(28, e * 4, true), n.setUint16(32, 4, true), n.setUint16(34, 32, true), el(n, 36, "data"), n.setUint32(40, s * 4, true), new Blob([r, ...t6.map((o) => o.buffer instanceof ArrayBuffer ? new Uint8Array(o.buffer, o.byteOffset, o.byteLength) : o.slice())], { type: "audio/wav" });
}
function el(t6, e, s) {
  for (let r = 0; r < s.length; ++r) t6.setUint8(e + r, s.charCodeAt(r));
}
var nn2 = class {
  constructor(e, s) {
    this.audio = e, this.sampling_rate = s;
  }
  get data() {
    if (Array.isArray(this.audio)) {
      if (this.audio.length === 0) return new Float32Array(0);
      if (this.audio.length === 1) return this.audio[0];
      let e = this.audio.reduce((n, o) => n + o.length, 0), s = new Float32Array(e), r = 0;
      for (let n of this.audio) s.set(n, r), r += n.length;
      return s;
    } else return this.audio;
  }
  toBlob() {
    let e = this.audio;
    return e instanceof Float32Array && (e = [e]), iS(e, this.sampling_rate);
  }
  async save(e) {
    return Zi(e, this.toBlob());
  }
};
var Du = class extends le2 {
  constructor(e) {
    super(e);
    let s = this.config.sampling_rate, r = Le2(257, this.config.num_mel_bins, 20, Math.floor(s / 2), s, null, "kaldi", true);
    this.mel_filters = r, this.window = Fe(400, "hann", { periodic: false }), this.mean = this.config.mean, this.std = this.config.std;
  }
  async _extract_fbank_features(e, s) {
    return Ce(e, this.window, 400, 160, { fft_length: 512, power: 2, center: false, preemphasis: 0.97, mel_filters: this.mel_filters, log_mel: "log", mel_floor: 1192092955078125e-22, remove_dc_offset: true, max_num_frames: s, transpose: true });
  }
  async _call(e) {
    ce2(e, "ASTFeatureExtractor");
    let s = await this._extract_fbank_features(e, this.config.max_length);
    if (this.config.do_normalize) {
      let r = this.std * 2, n = s.data;
      for (let o = 0; o < n.length; ++o) n[o] = (n[o] - this.mean) / r;
    }
    return { input_values: s.unsqueeze_(0) };
  }
};
var on2 = class extends le2 {
  async _call(e) {
    ce2(e, "EncodecFeatureExtractor"), e instanceof Float64Array && (e = new Float32Array(e));
    let s = this.config.feature_size;
    if (e.length % s !== 0) throw new Error(`The length of the audio data must be a multiple of the number of channels (${s}).`);
    let r = [1, s, e.length / s];
    return { input_values: new E("float32", e, r) };
  }
};
var Bu = class extends le2 {
  async _call(e) {
    ce2(e, "ChatterboxFeatureExtractor"), e instanceof Float64Array && (e = new Float32Array(e));
    let s = [1, e.length];
    return { input_values: new E("float32", e, s) };
  }
};
var qu = class extends le2 {
  constructor(e) {
    super(e), this.mel_filters = Le2(this.config.nb_frequency_bins, this.config.feature_size, this.config.frequency_min, this.config.frequency_max, this.config.sampling_rate, null, "htk"), this.mel_filters_slaney = Le2(this.config.nb_frequency_bins, this.config.feature_size, this.config.frequency_min, this.config.frequency_max, this.config.sampling_rate, "slaney", "slaney"), this.window = Fe(this.config.fft_window_size, "hann");
  }
  async _get_input_mel(e, s, r, n) {
    let o, a = false, i = e.length - s;
    if (i > 0) if (r === "rand_trunc") {
      a = true;
      let l = Math.floor(fs2.random() * (i + 1));
      e = e.subarray(l, l + s), o = await this._extract_fbank_features(e, this.mel_filters_slaney, this.config.nb_max_samples);
    } else throw new Error(`Truncation strategy "${r}" not implemented`);
    else {
      if (i < 0) {
        let l = new Float64Array(s);
        if (l.set(e), n === "repeat") for (let c = e.length; c < s; c += e.length) l.set(e.subarray(0, Math.min(e.length, s - c)), c);
        else if (n === "repeatpad") for (let c = e.length; c < -i; c += e.length) l.set(e, c);
        e = l;
      }
      if (r === "fusion") throw new Error(`Truncation strategy "${r}" not implemented`);
      o = await this._extract_fbank_features(e, this.mel_filters_slaney, this.config.nb_max_samples);
    }
    return o.unsqueeze_(0);
  }
  async _extract_fbank_features(e, s, r = null) {
    return Ce(e, this.window, this.config.fft_window_size, this.config.hop_length, { power: 2, mel_filters: s, log_mel: "dB", max_num_frames: r, do_pad: false, transpose: true });
  }
  async _call(e, { max_length: s = null } = {}) {
    return ce2(e, "ClapFeatureExtractor"), { input_features: (await this._get_input_mel(e, s ?? this.config.nb_max_samples, this.config.truncation, this.config.padding)).unsqueeze_(0) };
  }
};
var lS = 1e-5;
var an2 = class extends le2 {
  constructor(e) {
    super(e), this.config.mel_filters ??= Le2(Math.floor(1 + this.config.n_fft / 2), this.config.feature_size, 0, this.config.sampling_rate / 2, this.config.sampling_rate, "slaney", "slaney");
    let s = Fe(this.config.win_length, "hann", { periodic: false });
    this.window = new Float64Array(this.config.n_fft);
    let r = Math.floor((this.config.n_fft - this.config.win_length) / 2);
    this.window.set(s, r);
  }
  async _extract_fbank_features(e) {
    let s = this.config.preemphasis;
    e = new Float64Array(e);
    for (let n = e.length - 1; n >= 1; --n) e[n] -= s * e[n - 1];
    return await Ce(e, this.window, this.window.length, this.config.hop_length, { fft_length: this.config.n_fft, power: 2, mel_filters: this.config.mel_filters, log_mel: "log", mel_floor: -1 / 0, pad_mode: "constant", center: true, transpose: true, mel_offset: 2 ** -24 });
  }
  async _call(e) {
    ce2(e, "ParakeetFeatureExtractor");
    let s = await this._extract_fbank_features(e), r = Math.floor((e.length + Math.floor(this.config.n_fft / 2) * 2 - this.config.n_fft) / this.config.hop_length), n = s.data;
    n.fill(0, r * s.dims[1]);
    let [o, a] = s.dims, i = new Float64Array(a), l = new Float64Array(a);
    for (let u = 0; u < r; ++u) {
      let _ = u * a;
      for (let d = 0; d < a; ++d) {
        let f = n[_ + d];
        i[d] += f, l[d] += f * f;
      }
    }
    let c = r > 1 ? r - 1 : 1;
    for (let u = 0; u < a; ++u) {
      let _ = i[u] / r, d = (l[u] - r * _ * _) / c, m = 1 / (Math.sqrt(d) + lS);
      for (let g = 0; g < r; ++g) {
        let w = g * a + u;
        n[w] = (n[w] - _) * m;
      }
    }
    let p = new BigInt64Array(o);
    return p.fill(1n, 0, r), { input_features: s.unsqueeze_(0), attention_mask: new E("int64", p, [1, o]) };
  }
};
var Uu = class extends an2 {
  _apply_dither(e) {
    let s = this.config.dither ?? 0;
    if (s <= 0) return e;
    let r = new Dt2(e.length);
    for (let n = 0; n < e.length; ++n) e[n] += s * r.gauss();
    return e;
  }
  split_audio(e) {
    let s = this.config.max_audio_clip_s ?? 35, r = this.config.overlap_chunk_second ?? 5, n = this.config.min_energy_window_samples ?? 1600, o = this.config.sampling_rate, a = Math.max(1, Math.round(s * o)), i = Math.max(1, Math.round(r * o));
    if (e.length <= a) return [e];
    let l = [], c = 0, p = e.length;
    for (; c < p; ) {
      if (c + a >= p) {
        l.push(e.slice(c, p));
        break;
      }
      let u = Math.max(c, c + a - i), _ = Math.min(c + a, p), d;
      _ <= u ? d = c + a : d = this._find_split_point_energy(e, u, _, n), d = Math.max(c + 1, Math.min(d, p)), l.push(e.slice(c, d)), c = d;
    }
    return l;
  }
  _find_split_point_energy(e, s, r, n) {
    let o = r - s;
    if (o <= n) return Math.floor((s + r) / 2);
    let a = 1 / 0, i = s, l = o - n;
    for (let c = 0; c <= l; c += n) {
      let p = 0;
      for (let u = 0; u < n; ++u) {
        let _ = e[s + c + u];
        p += _ * _;
      }
      p = Math.sqrt(p / n), p < a && (a = p, i = s + c);
    }
    return i;
  }
  async _call(e) {
    ce2(e, "CohereAsrFeatureExtractor");
    let s = new Float64Array(e);
    return this._apply_dither(s), super._call(s);
  }
};
var ln2 = class extends on2 {
};
var cn2 = class extends le2 {
  constructor(e) {
    super(e);
    let { fft_length: s, feature_size: r, min_frequency: n, max_frequency: o, sampling_rate: a, frame_length: i } = this.config, l = Le2(Math.floor(1 + s / 2), r, n, o, a, null, "htk", false);
    this.mel_filters = l, this.window = Fe(i, "hann");
  }
  async _extract_fbank_features(e, s) {
    return Ce(e, this.window, this.config.frame_length, this.config.hop_length, { fft_length: this.config.fft_length, center: false, onesided: true, preemphasis: this.config.preemphasis, preemphasis_htk_flavor: this.config.preemphasis_htk_flavor, mel_filters: this.mel_filters, log_mel: "log", mel_floor: this.config.mel_floor, remove_dc_offset: false, transpose: true });
  }
  async _call(e, { max_length: s = 48e4, truncation: r = true, padding: n = true, pad_to_multiple_of: o = 128 } = {}) {
    if (ce2(e, "Gemma3nAudioFeatureExtractor"), r && e.length > s && (e = e.slice(0, s)), n && e.length % o !== 0) {
      let l = o - e.length % o, c = new Float64Array(e.length + l);
      c.set(e), this.config.padding_value !== 0 && c.fill(this.config.padding_value, e.length), e = c;
    }
    let a = await this._extract_fbank_features(e, this.config.max_length), i = Ae([1, a.dims[0]], true);
    return { input_features: a.unsqueeze_(0), input_features_mask: i };
  }
};
var pn2 = class extends cn2 {
  async _extract_fbank_features(e, s) {
    let { frame_length: r, hop_length: n, fft_length: o } = this.config, a = Math.floor(r / 2), i = Math.floor((e.length + a - (r + 1)) / n) + 1;
    return Ce(e, this.window, r, n, { fft_length: o, center: true, pad_mode: "semicausal", onesided: true, preemphasis: this.config.preemphasis, preemphasis_htk_flavor: this.config.preemphasis_htk_flavor, mel_filters: this.mel_filters, log_mel: "log", mel_floor: this.config.mel_floor, mel_floor_mode: "add", remove_dc_offset: false, transpose: true, max_num_frames: i });
  }
  async _call(e, s = {}) {
    ce2(e, "Gemma4AudioFeatureExtractor");
    let r = e.length, n = await super._call(e, s), { input_features: o } = n, [, a, i] = o.dims, { frame_length: l, hop_length: c } = this.config, p = Math.floor(l / 2), u = l + 1, _ = new Uint8Array(r + p + (s.pad_to_multiple_of ?? 128));
    _.fill(1, p, p + r);
    let d = new Uint8Array(a);
    for (let m = 0; m < a; ++m) d[m] = _[m * c + u - 1] ? 1 : 0;
    let f = o.data;
    for (let m = 0; m < a; ++m) d[m] || f.fill(0, m * i, (m + 1) * i);
    return n.input_features_mask = new E("bool", d, [1, a]), n;
  }
};
var ju = class extends le2 {
  constructor(e) {
    super(e);
    let { n_fft: s, win_length: r, n_mels: n, sample_rate: o } = e.melspec_kwargs;
    this.mel_filters = Le2(Math.floor(1 + s / 2), n, 0, o / 2, o, null, "htk");
    let a = Fe(r, "hann");
    this.window = new Float64Array(s);
    let i = Math.floor((s - r) / 2);
    this.window.set(a, i);
  }
  async _call(e) {
    ce2(e, "GraniteSpeechFeatureExtractor");
    let { n_fft: s, hop_length: r, n_mels: n } = this.config.melspec_kwargs, o = Math.floor(e.length / r) + 1, a = o - o % 2;
    return { input_features: (await Ce(e, this.window, s, r, { power: 2, mel_filters: this.mel_filters, log_mel: "log10_max_norm", transpose: true, max_num_frames: a, do_pad: false })).view(-1, 2 * n).unsqueeze_(0) };
  }
};
var Gu = class extends le2 {
  async _call(e) {
    ce2(e, "MoonshineFeatureExtractor"), e instanceof Float64Array && (e = new Float32Array(e));
    let s = [1, e.length];
    return { input_values: new E("float32", e, s) };
  }
};
var un2 = class extends le2 {
  async _call(e) {
    ce2(e, "PyAnnoteFeatureExtractor"), e instanceof Float64Array && (e = new Float32Array(e));
    let s = [1, 1, e.length];
    return { input_values: new E("float32", e, s) };
  }
  samples_to_frames(e) {
    return (e - this.config.offset) / this.config.step;
  }
  post_process_speaker_diarization(e, s) {
    let r = s / this.samples_to_frames(s) / this.config.sampling_rate, n = [];
    for (let o of e.tolist()) {
      let a = [], i = -1;
      for (let l = 0; l < o.length; ++l) {
        let c = ge(o[l]), [p, u] = fe(c), [_, d] = [l, l + 1];
        u !== i ? (i = u, a.push({ id: u, start: _, end: d, score: p })) : (a.at(-1).end = d, a.at(-1).score += p);
      }
      n.push(a.map(({ id: l, start: c, end: p, score: u }) => ({ id: l, start: c * r, end: p * r, confidence: u / (p - c) })));
    }
    return n;
  }
};
var Wu = class extends le2 {
  constructor(e) {
    super(e);
    let s = this.config.sampling_rate, r = Le2(257, this.config.num_mel_bins, 20, Math.floor(s / 2), s, null, "kaldi", true);
    this.mel_filters = r, this.window = Fe(400, "povey", { periodic: false });
  }
  async _extract_fbank_features(e, s) {
    return e = e.map((r) => r * 32768), Ce(e, this.window, 400, 160, { fft_length: 512, power: 2, center: false, preemphasis: 0.97, mel_filters: this.mel_filters, log_mel: "log", mel_floor: 1192092955078125e-22, remove_dc_offset: true, max_num_frames: s, transpose: true });
  }
  async _call(e, { padding: s = true, pad_to_multiple_of: r = 2, do_normalize_per_mel_bins: n = true, return_attention_mask: o = true } = {}) {
    ce2(e, "SeamlessM4TFeatureExtractor");
    let a = await this._extract_fbank_features(e, this.config.max_length);
    if (n) {
      let [f, m] = a.dims, g = a.data;
      for (let w = 0; w < m; ++w) {
        let x = 0;
        for (let k = 0; k < f; ++k) x += g[k * m + w];
        let y = x / f, b = 0;
        for (let k = 0; k < f; ++k) b += (g[k * m + w] - y) ** 2;
        b /= f - 1;
        let v = Math.sqrt(b + 1e-7);
        for (let k = 0; k < f; ++k) {
          let O = k * m + w;
          g[O] = (g[O] - y) / v;
        }
      }
    }
    let i;
    if (s) {
      let [f, m] = a.dims, g = a.data, w = f % r;
      if (w > 0) {
        let x = new Float32Array(m * (f + w));
        x.set(g), x.fill(this.config.padding_value, g.length);
        let y = f + w;
        a = new E(a.type, x, [y, m]), o && (i = new E("int64", new BigInt64Array(y), [1, y]), i.data.fill(1n, 0, f));
      }
    }
    let [l, c] = a.dims, p = this.config.stride;
    if (l % p !== 0) throw new Error(`The number of frames (${l}) must be a multiple of the stride (${p}).`);
    let _ = a.view(1, Math.floor(l / p), c * p), d = { input_features: _ };
    if (o) {
      let f = _.dims[1], m = new BigInt64Array(f);
      if (i) {
        let g = i.data;
        for (let w = 1, x = 0; w < l; w += p, ++x) m[x] = g[w];
      } else m.fill(1n);
      d.attention_mask = new E("int64", m, [1, f]);
    }
    return d;
  }
};
var Vu = class extends ln2 {
};
var Hu = class extends le2 {
};
var Ku = class extends le2 {
  _zero_mean_unit_var_norm(e) {
    let r = e.reduce((o, a) => o + a, 0) / e.length, n = e.reduce((o, a) => o + (a - r) ** 2, 0) / e.length;
    return e.map((o) => (o - r) / Math.sqrt(n + 1e-7));
  }
  async _call(e) {
    ce2(e, "Wav2Vec2FeatureExtractor"), e instanceof Float64Array && (e = new Float32Array(e));
    let s = e;
    this.config.do_normalize && (s = this._zero_mean_unit_var_norm(s));
    let r = [1, s.length];
    return { input_values: new E("float32", s, r), attention_mask: new E("int64", new BigInt64Array(s.length).fill(1n), r) };
  }
};
var Xu = class extends le2 {
  constructor(e) {
    super(e);
    let s = this.config.sampling_rate, r = Le2(257, this.config.num_mel_bins, 20, Math.floor(s / 2), s, null, "kaldi", true);
    this.mel_filters = r, this.window = Fe(400, "hamming", { periodic: false }), this.min_num_frames = this.config.min_num_frames;
  }
  async _extract_fbank_features(e) {
    return e = e.map((s) => s * 32768), Ce(e, this.window, 400, 160, { fft_length: 512, power: 2, center: false, preemphasis: 0.97, mel_filters: this.mel_filters, log_mel: "log", mel_floor: 1192092955078125e-22, remove_dc_offset: true, transpose: true, min_num_frames: this.min_num_frames });
  }
  async _call(e) {
    ce2(e, "WeSpeakerFeatureExtractor");
    let s = (await this._extract_fbank_features(e)).unsqueeze_(0);
    if (this.config.fbank_centering_span === null) {
      let r = s.mean(1).data, n = s.data, [o, a, i] = s.dims;
      for (let l = 0; l < o; ++l) {
        let c = l * a * i, p = l * i;
        for (let u = 0; u < a; ++u) {
          let _ = c + u * i;
          for (let d = 0; d < i; ++d) n[_ + d] -= r[p + d];
        }
      }
    }
    return { input_features: s };
  }
};
var Qu = class extends le2 {
  constructor(e) {
    super(e), this.config.mel_filters ??= Le2(Math.floor(1 + this.config.n_fft / 2), this.config.feature_size, 0, 8e3, this.config.sampling_rate, "slaney", "slaney"), this.window = Fe(this.config.n_fft, "hann");
  }
  async _extract_fbank_features(e, { center: s = true } = {}) {
    let { n_fft: r, hop_length: n, mel_filters: o, global_log_mel_max: a } = this.config, i = Math.floor(s ? e.length / n : (e.length - r) / n);
    return await Ce(e, this.window, r, n, { power: 2, mel_filters: o, log_mel: "log10_max_norm", max_log_mel: a, center: s, max_num_frames: i, do_pad: false });
  }
  async _call(e, { center: s = true } = {}) {
    return ce2(e, "VoxtralRealtimeFeatureExtractor"), { input_features: (await this._extract_fbank_features(e, { center: s })).unsqueeze_(0) };
  }
};
var Yu = class extends le2 {
  constructor(e) {
    super(e), this.config.mel_filters ??= Le2(Math.floor(1 + this.config.n_fft / 2), this.config.feature_size, 0, 8e3, this.config.sampling_rate, "slaney", "slaney"), this.window = Fe(this.config.n_fft, "hann");
  }
  async _extract_fbank_features(e) {
    return await Ce(e, this.window, this.config.n_fft, this.config.hop_length, { power: 2, mel_filters: this.config.mel_filters, log_mel: "log10_max_norm", max_num_frames: Math.min(Math.floor(e.length / this.config.hop_length), this.config.nb_max_frames) });
  }
  async _call(e, { max_length: s = null } = {}) {
    ce2(e, "WhisperFeatureExtractor");
    let r, n = s ?? this.config.n_samples;
    return e.length > n ? (e.length > this.config.n_samples && R.warn("Attempting to extract features for audio longer than 30 seconds. If using a pipeline to extract transcript from a long audio clip, remember to specify `chunk_length_s` and/or `stride_length_s`."), r = e.slice(0, n)) : (r = new Float32Array(n), r.set(e)), { input_features: (await this._extract_fbank_features(r)).unsqueeze_(0) };
  }
};
var we = class {
  static async from_pretrained(e, s = {}) {
    let r = await ze2(e, Qi, true, s), n = r.feature_extractor_type, o = _n[n];
    if (!o) throw new Error(`Unknown feature_extractor_type: '${n}'. Please report this at ${Vt}.`);
    return new o(r);
  }
};
var Ju = class extends U {
  static tokenizer_class = G2;
  static feature_extractor_class = we;
  async _call(e, s = null) {
    let r = this.tokenizer(e), n = s ? await this.feature_extractor(s) : {};
    return { ...r, ...n };
  }
};
var cS = /* @__PURE__ */ new Set(["ja", "zh"]);
var Zu = class extends U {
  static tokenizer_class = G2;
  static feature_extractor_class = we;
  static uses_processor_config = true;
  get_decoder_prompt_ids(e = "en") {
    let s = ["\u2581", "<|startofcontext|>", "<|startoftranscript|>", "<|emo:undefined|>", `<|${e}|>`, `<|${e}|>`, "<|pnc|>", "<|noitn|>", "<|notimestamp|>", "<|nodiarize|>"];
    return this.tokenizer.convert_tokens_to_ids(s);
  }
  static join_chunks(e, s = "en") {
    let r = e.filter((a) => a && a.trim());
    if (r.length === 0) return "";
    let n = cS.has(s) ? "" : " ";
    return [r[0].trimEnd(), ...r.slice(1).map((a) => a.trim())].join(n);
  }
  async _call(e) {
    return await this.feature_extractor(e);
  }
};
var tl = {};
var xs2;
var Ak;
var Ht2;
if (H.IS_WEB_ENV) xs2 = (t6, e) => {
  if (!self.OffscreenCanvas) throw new Error("OffscreenCanvas not supported by this environment.");
  return new self.OffscreenCanvas(t6, e);
}, Ht2 = self.createImageBitmap, Ak = self.ImageData;
else if (tl) Ht2 = async (t6) => {
  let s = (await t6.metadata()).channels, { data: r, info: n } = await t6.rotate().raw().toBuffer({ resolveWithObject: true }), o = new Se(new Uint8ClampedArray(r), n.width, n.height, n.channels);
  return s !== void 0 && s !== n.channels && o.convert(s), o;
};
else throw new Error("Unable to load image processing library.");
var pS = { 0: "nearest", 1: "lanczos", 2: "bilinear", 3: "bicubic", 4: "box", 5: "hamming" };
var uS = /* @__PURE__ */ new Map([["png", "image/png"], ["jpg", "image/jpeg"], ["jpeg", "image/jpeg"], ["gif", "image/gif"]]);
var Se = class t3 {
  constructor(e, s, r, n) {
    this.data = e, this.width = s, this.height = r, this.channels = n;
  }
  get size() {
    return [this.width, this.height];
  }
  static async read(e) {
    if (e instanceof t3) return e;
    if (typeof e == "string" || e instanceof URL) return await this.fromURL(e);
    if (e instanceof Blob) return await this.fromBlob(e);
    if (typeof HTMLCanvasElement < "u" && e instanceof HTMLCanvasElement || typeof OffscreenCanvas < "u" && e instanceof OffscreenCanvas) return this.fromCanvas(e);
    throw new Error(`Unsupported input type: ${typeof e}`);
  }
  static fromCanvas(e) {
    if (!H.IS_WEB_ENV) throw new Error("fromCanvas() is only supported in browser environments.");
    let r = e.getContext("2d").getImageData(0, 0, e.width, e.height).data;
    return new t3(r, e.width, e.height, 4);
  }
  static async fromURL(e) {
    let s = await Bt2(e);
    if (s.status !== 200) throw new Error(`Unable to read image from "${e}" (${s.status} ${s.statusText})`);
    let r = await s.blob();
    return this.fromBlob(r);
  }
  static async fromBlob(e) {
    if (H.IS_WEB_ENV) {
      let s = await Ht2(e), r = xs2(s.width, s.height).getContext("2d");
      return r.drawImage(s, 0, 0), new this(r.getImageData(0, 0, s.width, s.height).data, s.width, s.height, 4);
    } else {
      let s = tl(await e.arrayBuffer());
      return await Ht2(s);
    }
  }
  static fromTensor(e, s = "CHW") {
    if (e.dims.length !== 3) throw new Error(`Tensor should have 3 dimensions, but has ${e.dims.length} dimensions.`);
    if (s === "CHW") e = e.permute(1, 2, 0);
    else if (s !== "HWC") throw new Error(`Unsupported channel format: ${s}`);
    if (!(e.data instanceof Uint8ClampedArray || e.data instanceof Uint8Array)) throw new Error(`Unsupported tensor type: ${e.type}`);
    switch (e.dims[2]) {
      case 1:
      case 2:
      case 3:
      case 4:
        return new t3(e.data, e.dims[1], e.dims[0], e.dims[2]);
      default:
        throw new Error(`Unsupported number of channels: ${e.dims[2]}`);
    }
  }
  grayscale() {
    if (this.channels === 1) return this;
    let e = new Uint8ClampedArray(this.width * this.height * 1);
    switch (this.channels) {
      case 3:
      case 4:
        for (let s = 0, r = 0; s < this.data.length; s += this.channels) {
          let n = this.data[s], o = this.data[s + 1], a = this.data[s + 2];
          e[r++] = Math.round(0.2989 * n + 0.587 * o + 0.114 * a);
        }
        break;
      default:
        throw new Error(`Conversion failed due to unsupported number of channels: ${this.channels}`);
    }
    return this._update(e, this.width, this.height, 1);
  }
  rgb() {
    if (this.channels === 3) return this;
    let e = new Uint8ClampedArray(this.width * this.height * 3);
    switch (this.channels) {
      case 1:
        for (let s = 0, r = 0; s < this.data.length; ++s) e[r++] = this.data[s], e[r++] = this.data[s], e[r++] = this.data[s];
        break;
      case 4:
        for (let s = 0, r = 0; s < this.data.length; s += 4) e[r++] = this.data[s], e[r++] = this.data[s + 1], e[r++] = this.data[s + 2];
        break;
      default:
        throw new Error(`Conversion failed due to unsupported number of channels: ${this.channels}`);
    }
    return this._update(e, this.width, this.height, 3);
  }
  rgba() {
    if (this.channels === 4) return this;
    let e = new Uint8ClampedArray(this.width * this.height * 4);
    switch (this.channels) {
      case 1:
        for (let s = 0, r = 0; s < this.data.length; ++s) e[r++] = this.data[s], e[r++] = this.data[s], e[r++] = this.data[s], e[r++] = 255;
        break;
      case 3:
        for (let s = 0, r = 0; s < this.data.length; s += 3) e[r++] = this.data[s], e[r++] = this.data[s + 1], e[r++] = this.data[s + 2], e[r++] = 255;
        break;
      default:
        throw new Error(`Conversion failed due to unsupported number of channels: ${this.channels}`);
    }
    return this._update(e, this.width, this.height, 4);
  }
  putAlpha(e) {
    if (e.width !== this.width || e.height !== this.height) throw new Error(`Expected mask size to be ${this.width}x${this.height}, but got ${e.width}x${e.height}`);
    if (e.channels !== 1) throw new Error(`Expected mask to have 1 channel, but got ${e.channels}`);
    let s = this.data, r = e.data, n = this.width * this.height;
    if (this.channels === 3) {
      let o = new Uint8ClampedArray(n * 4);
      for (let a = 0, i = 0, l = 0; a < n; ++a) o[l++] = s[i++], o[l++] = s[i++], o[l++] = s[i++], o[l++] = r[a];
      return this._update(o, this.width, this.height, 4);
    } else if (this.channels === 4) {
      for (let o = 0; o < n; ++o) s[4 * o + 3] = r[o];
      return this;
    }
    throw new Error(`Expected image to have 3 or 4 channels, but got ${this.channels}`);
  }
  async resize(e, s, { resample: r = 2 } = {}) {
    if (this.width === e && this.height === s) return this;
    let n = pS[r] ?? r, o = bp(e), a = bp(s);
    if (o && a) return this;
    if (o ? e = s / this.height * this.width : a && (s = e / this.width * this.height), H.IS_WEB_ENV) {
      let i = this.channels, l = this.toCanvas(), c = xs2(e, s).getContext("2d");
      return c.drawImage(l, 0, 0, e, s), new t3(c.getImageData(0, 0, e, s).data, e, s, 4).convert(i);
    } else {
      let i = this.toSharp();
      switch (n) {
        case "box":
        case "hamming":
          (n === "box" || n === "hamming") && (R.warn(`Resampling method ${n} is not yet supported. Using bilinear instead.`), n = "bilinear");
        case "nearest":
        case "bilinear":
        case "bicubic":
          i = i.affine([e / this.width, 0, 0, s / this.height], { interpolator: n });
          break;
        case "lanczos":
          i = i.resize({ width: e, height: s, fit: "fill", kernel: "lanczos3" });
          break;
        default:
          throw new Error(`Resampling method ${n} is not supported.`);
      }
      return await Ht2(i);
    }
  }
  async pad([e, s, r, n]) {
    if (e = Math.max(e, 0), s = Math.max(s, 0), r = Math.max(r, 0), n = Math.max(n, 0), e === 0 && s === 0 && r === 0 && n === 0) return this;
    if (H.IS_WEB_ENV) {
      let o = this.channels, a = this.toCanvas(), i = this.width + e + s, l = this.height + r + n, c = xs2(i, l).getContext("2d");
      return c.drawImage(a, 0, 0, this.width, this.height, e, r, this.width, this.height), new t3(c.getImageData(0, 0, i, l).data, i, l, 4).convert(o);
    } else {
      let o = this.toSharp().extend({ left: e, right: s, top: r, bottom: n });
      return await Ht2(o);
    }
  }
  async crop([e, s, r, n]) {
    if (e = Math.max(e, 0), s = Math.max(s, 0), r = Math.min(r, this.width - 1), n = Math.min(n, this.height - 1), e === 0 && s === 0 && r === this.width - 1 && n === this.height - 1) return this;
    let o = r - e + 1, a = n - s + 1;
    if (H.IS_WEB_ENV) {
      let i = this.channels, l = this.toCanvas(), c = xs2(o, a).getContext("2d");
      return c.drawImage(l, e, s, o, a, 0, 0, o, a), new t3(c.getImageData(0, 0, o, a).data, o, a, 4).convert(i);
    } else {
      let i = this.toSharp().extract({ left: e, top: s, width: o, height: a });
      return await Ht2(i);
    }
  }
  async center_crop(e, s) {
    if (this.width === e && this.height === s) return this;
    let r = (this.width - e) / 2, n = (this.height - s) / 2;
    if (H.IS_WEB_ENV) {
      let o = this.channels, a = this.toCanvas(), i = xs2(e, s).getContext("2d"), l = 0, c = 0, p = 0, u = 0;
      return r >= 0 ? l = r : p = -r, n >= 0 ? c = n : u = -n, i.drawImage(a, l, c, e, s, p, u, e, s), new t3(i.getImageData(0, 0, e, s).data, e, s, 4).convert(o);
    } else {
      let o = this.toSharp();
      if (r >= 0 && n >= 0) o = o.extract({ left: Math.floor(r), top: Math.floor(n), width: e, height: s });
      else if (r <= 0 && n <= 0) {
        let a = Math.floor(-n), i = Math.floor(-r);
        o = o.extend({ top: a, left: i, right: e - this.width - i, bottom: s - this.height - a });
      } else {
        let a = [0, 0], i = 0;
        n < 0 ? (a[0] = Math.floor(-n), a[1] = s - this.height - a[0]) : i = Math.floor(n);
        let l = [0, 0], c = 0;
        r < 0 ? (l[0] = Math.floor(-r), l[1] = e - this.width - l[0]) : c = Math.floor(r), o = o.extend({ top: a[0], bottom: a[1], left: l[0], right: l[1] }).extract({ left: c, top: i, width: e, height: s });
      }
      return await Ht2(o);
    }
  }
  async toBlob(e = "image/png", s = 1) {
    if (!H.IS_WEB_ENV) throw new Error("toBlob() is only supported in browser environments.");
    return await this.toCanvas().convertToBlob({ type: e, quality: s });
  }
  toTensor(e = "CHW") {
    let s = new E("uint8", new Uint8Array(this.data), [this.height, this.width, this.channels]);
    if (e !== "HWC") if (e === "CHW") s = s.permute(2, 0, 1);
    else throw new Error(`Unsupported channel format: ${e}`);
    return s;
  }
  toCanvas() {
    if (!H.IS_WEB_ENV) throw new Error("toCanvas() is only supported in browser environments.");
    let e = this.clone().rgba(), s = xs2(e.width, e.height), r = new Ak(e.data, e.width, e.height);
    return s.getContext("2d").putImageData(r, 0, 0), s;
  }
  split() {
    let { data: e, width: s, height: r, channels: n } = this, o = e.constructor, a = e.length / n, i = Array.from({ length: n }, () => new o(a));
    for (let l = 0; l < a; ++l) {
      let c = n * l;
      for (let p = 0; p < n; ++p) i[p][l] = e[c + p];
    }
    return i.map((l) => new t3(l, s, r, 1));
  }
  _update(e, s, r, n = null) {
    return this.data = e, this.width = s, this.height = r, n !== null && (this.channels = n), this;
  }
  clone() {
    return new t3(this.data.slice(), this.width, this.height, this.channels);
  }
  convert(e) {
    if (this.channels === e) return this;
    switch (e) {
      case 1:
        this.grayscale();
        break;
      case 3:
        this.rgb();
        break;
      case 4:
        this.rgba();
        break;
      default:
        throw new Error(`Conversion failed due to unsupported number of channels: ${this.channels}`);
    }
    return this;
  }
  async save(e) {
    if (H.IS_WEB_ENV) {
      if (H.IS_WEBWORKER_ENV) throw new Error("Unable to save an image from a Web Worker.");
      let s = e.split(".").pop().toLowerCase(), r = uS.get(s) ?? "image/png", n = await this.toBlob(r);
      return Zi(e, n);
    } else if (H.IS_FS_AVAILABLE) await this.toSharp().toFile(e);
    else throw new Error("Unable to save the image because filesystem is disabled in this environment.");
  }
  toSharp() {
    if (H.IS_WEB_ENV) throw new Error("toSharp() is only supported in server-side environments.");
    return tl(this.data, { raw: { width: this.width, height: this.height, channels: this.channels } });
  }
};
var _S = Se.read.bind(Se);
function dS(t6, e, s, r, n) {
  let o = r * s ** 2, a = Math.sqrt(o / (t6 * e)), i = n * s, l = Math.floor(a * t6 / i) * i, c = Math.floor(a * e / i) * i;
  if (l === 0 && c === 0) throw new Error(`Attempting to resize to a 0 x 0 image. Resized height should be divisible by \`pooling_kernel_size * patch_size\`=${i}.`);
  let p = Math.floor(r / n ** 2) * i;
  return l === 0 ? (l = i, c = Math.min(Math.floor(e / t6) * i, p)) : c === 0 && (c = i, l = Math.min(Math.floor(t6 / e) * i, p)), [l, c];
}
function fS(t6, e, s, r, n, o, a) {
  let i = Math.floor(e / n), l = Math.floor(s / n), c = i * l, p = n * n * r, u = new Float32Array(o * p), _ = 0;
  for (let m = 0; m < i; ++m) for (let g = 0; g < l; ++g) for (let w = 0; w < n; ++w) {
    let x = (m * n + w) * s * r + g * n * r;
    for (let y = 0; y < n; ++y) {
      let b = x + y * r;
      for (let v = 0; v < r; ++v) u[_++] = t6[b + v];
    }
  }
  let d = new BigInt64Array(o * 2).fill(-1n), f = 0;
  for (let m = 0; m < i; ++m) for (let g = 0; g < l; ++g) d[f++] = BigInt(g), d[f++] = BigInt(m);
  return { patches: new E("float32", u, [o, p]), positions: new E("int64", d, [o, 2]), num_soft_tokens: Math.floor(c / a ** 2) };
}
var ws2 = class extends xe {
  constructor(e) {
    super(), this.config = e, this.patch_size = e.patch_size ?? 16, this.max_soft_tokens = e.max_soft_tokens ?? 280, this.pooling_kernel_size = e.pooling_kernel_size ?? 3, this.resample = e.resample ?? 3, this.rescale_factor = e.rescale_factor ?? 1 / 255, this.do_rescale = e.do_rescale ?? true, this.do_resize = e.do_resize ?? true, this.do_convert_rgb = e.do_convert_rgb ?? true;
  }
  async _call(e) {
    Array.isArray(e) || (e = [e]);
    let { patch_size: s, pooling_kernel_size: r } = this, n = this.max_soft_tokens * r ** 2, o = [], a = [], i = [];
    for (let l of e) {
      if (this.do_convert_rgb && (l = l.rgb()), this.do_resize) {
        let [d, f] = dS(l.height, l.width, s, n, r);
        (d !== l.height || f !== l.width) && (l = await l.resize(f, d, { resample: this.resample }));
      }
      let c = Float32Array.from(l.data);
      if (this.do_rescale) for (let d = 0; d < c.length; ++d) c[d] *= this.rescale_factor;
      let { patches: p, positions: u, num_soft_tokens: _ } = fS(c, l.height, l.width, l.channels, s, n, r);
      o.push(p), a.push(u), i.push(_);
    }
    return { pixel_values: Ge(o, 0), image_position_ids: Ge(a, 0), num_soft_tokens_per_image: i };
  }
};
var dn2 = class extends U {
  static uses_processor_config = true;
  static uses_chat_template_file = true;
  constructor(e, s, r) {
    super(e, s, r), this.audio_ms_per_token = this.config.audio_ms_per_token ?? 40, this.audio_seq_length = this.config.audio_seq_length ?? 750, this.image_seq_length = this.config.image_seq_length ?? 280;
    let { audio_token: n, boa_token: o, eoa_token: a, image_token: i, boi_token: l, eoi_token: c } = this.tokenizer.config;
    this.audio_token = n, this.boa_token = o, this.eoa_token = a, this.image_token = i, this.boi_token = l, this.eoi_token = c;
  }
  static async from_pretrained(e, s = {}) {
    let [r, n, o] = await Promise.all([ze2(e, Yi, true, s), G2.from_pretrained(e, s), Xr2(e, Ji, false, s)]), a = { tokenizer: n };
    return r.image_processor && (a.image_processor = new ws2(r.image_processor)), r.feature_extractor && (a.feature_extractor = new pn2(r.feature_extractor)), new this(r, a, o);
  }
  _compute_audio_num_tokens(e, s) {
    let r = Math.round(s * 20 / 1e3), n = Math.round(s * 10 / 1e3), o = Math.floor(r / 2), a = Math.floor((e + o - r - 1) / n) + 1;
    if (a <= 0) return 0;
    for (let i = 0; i < 2; ++i) a = Math.floor((a - 1) / 2) + 1;
    return Math.min(a, this.audio_seq_length);
  }
  async _call(e, s = null, r = null, n = {}) {
    typeof e == "string" && (e = [e]);
    let o;
    if (s) {
      o = await this.image_processor(s, n);
      let i = o.num_soft_tokens_per_image, l = 0;
      e = e.map((c) => c.replaceAll(this.image_token, () => `

${this.boi_token}${this.image_token.repeat(i[l++])}${this.eoi_token}

`));
    }
    let a;
    if (r) {
      let i = Array.isArray(r) ? r : [r];
      a = await this.feature_extractor(i[0], n);
      let l = this.feature_extractor.config.sampling_rate ?? 16e3, c = 0;
      e = e.map((p) => p.replaceAll(this.audio_token, () => `

${this.boa_token}${this.audio_token.repeat(this._compute_audio_num_tokens(i[c++].length, l))}${this.eoa_token}

`));
    }
    return { ...this.tokenizer(e, n), ...o, ...a };
  }
};
var fn2 = class extends xe {
  constructor(e) {
    super(), this.config = e, this.frame_processor = new ws2(e), this.max_frames = e.max_frames ?? 32, this.overflow_strategy = e.overflow_strategy ?? "uniform";
  }
  sample_frames(e) {
    let s = e.length, { max_frames: r } = this;
    if (s <= r) return e;
    if (this.overflow_strategy === "truncate") return e.slice(0, r);
    let n = r > 1 ? (s - 1) / (r - 1) : 0;
    return Array.from({ length: r }, (o, a) => e[a > 0 && a === r - 1 ? s - 1 : Math.floor(a * n)]);
  }
  async _call(e) {
    Array.isArray(e) || (e = [e]);
    let s = e.map((i) => this.sample_frames(i.frames.map((l) => l.image))), { pixel_values: r, image_position_ids: n, num_soft_tokens_per_image: o } = await this.frame_processor(s.flat()), a = 0;
    return { pixel_values_videos: r, video_position_ids: n, num_frames_per_video: s.map((i) => i.length), num_soft_tokens_per_video: s.map((i) => o[(a += i.length) - 1]) };
  }
};
function e_(t6, e) {
  return Array.isArray(t6) ? t6.every((s) => Array.isArray(s)) ? t6 : e ? [t6] : t6.map((s) => [s]) : [[t6]];
}
function mS(t6, e, s) {
  let r = 0;
  if (t6 = t6.map((n) => n.replaceAll(e, () => s[r++] ?? "")), r !== s.length) throw new Error(`Found ${r} ${e} tokens in the text, but ${s.length} inputs were passed.`);
  return t6;
}
var t_ = class extends dn2 {
  constructor(e, s, r) {
    super(e, s, r), this.video_token = this.tokenizer.config.video_token, this.video_processor = e.video_processor && new fn2(e.video_processor);
  }
  async _call(e, s = null, r = null, n = null, o = {}) {
    let a = [[this.image_token, s && e_(s, true)], [this.video_token, n && e_(n, false)], [this.audio_token, r && e_(r, false)]];
    if (e == null) {
      let v = a.filter(([, O]) => O), k = v[0]?.[1].length;
      if (v.some(([, O]) => O.length !== k)) throw new Error("Received a different number of samples per modality.");
      e = Array.from({ length: k }, (O, T) => v.flatMap(([$, C]) => Array(C[T].length).fill($)).join(" "));
    } else typeof e == "string" && (e = [e]);
    let [i, l, c] = a.map(([, v]) => v?.flat()), p = i && await this.image_processor(i), u = l && await this.video_processor(l), _ = c && await this._process_audio(c), { image_token: d, video_token: f, audio_token: m, boi_token: g, eoi_token: w, boa_token: x, eoa_token: y } = this, b = { [d]: p?.num_soft_tokens_per_image.map((v) => g + d.repeat(v) + w), [f]: u?.num_soft_tokens_per_video.map((v, k) => (g + f.repeat(v) + w).repeat(u.num_frames_per_video[k])), [m]: _?.num_soft_tokens_per_audio.map((v) => x + m.repeat(v) + y) };
    for (let [v, k] of Object.entries(b)) e = mS(e, v, k ?? []);
    return { ...this.tokenizer(e, { padding: true, ...o }), ...p, ...u, ..._ };
  }
  async _process_audio(e) {
    let s = [];
    for (let i of e) s.push(await this.feature_extractor(i));
    let r = Math.max(...s.map((i) => i.input_features.dims[1])), n = s[0].input_features.dims[2], o = new Float32Array(e.length * r * n), a = new Uint8Array(e.length * r);
    return s.forEach((i, l) => {
      o.set(i.input_features.data, l * r * n), a.set(i.input_features_mask.data, l * r);
    }), { input_features: new E("float32", o, [e.length, r, n]), input_features_mask: new E("bool", a, [e.length, r]), num_soft_tokens_per_audio: s.map(({ input_features_mask: { data: i } }) => {
      let l = 0;
      for (let c = 0; c < i.length; c += 4) l += Number(i[c]);
      return l;
    }) };
  }
};
function Mk(t6, e, s = 0, r = null) {
  let n = t6 / e, o = Vb(n) * e;
  return r !== null && o > r && (o = Math.floor(n) * e), o < s && (o = Math.ceil(n) * e), o;
}
function Sk([t6, e], s) {
  return [Math.max(Math.floor(t6 / s), 1) * s, Math.max(Math.floor(e / s), 1) * s];
}
function s_([t6, e, s, r]) {
  return [t6 - s / 2, e - r / 2, t6 + s / 2, e + r / 2];
}
function Kt2(t6, e = 0.5, s = null, r = false) {
  let n = t6.logits, o = t6.pred_boxes, [a, i, l] = n.dims;
  if (s !== null && s.length !== a) throw Error("Make sure that you pass in as many target sizes as the batch dimension of the logits");
  let c = [];
  for (let p = 0; p < a; ++p) {
    let u = s !== null ? s[p] : null, _ = { boxes: [], classes: [], scores: [] }, d = n[p], f = o[p];
    for (let m = 0; m < i; ++m) {
      let g = d[m], w = [], x;
      if (r) {
        x = g.sigmoid().data;
        for (let y = 0; y < x.length; ++y) x[y] > e && w.push(y);
      } else {
        let y = fe(g.data)[1];
        if (y === l - 1 || (x = ge(g.data), x[y] < e)) continue;
        w.push(y);
      }
      for (let y of w) {
        let b = f[m].data;
        b = s_(b), u !== null && (b = b.map((v, k) => v * u[(k + 1) % 2])), _.boxes.push(b), _.classes.push(y), _.scores.push(x[y]);
      }
    }
    c.push(_);
  }
  return c;
}
function sl(t6, e = null) {
  let s = t6.logits, r = s.dims[0];
  if (e !== null && e.length !== r) throw Error("Make sure that you pass in as many target sizes as the batch dimension of the logits");
  let n = [];
  for (let o = 0; o < r; ++o) {
    let a = e !== null ? e[o] : null, i = s[o];
    a !== null && (i = Bp(i, a, "bilinear", false));
    let [l, c] = a ?? i.dims.slice(-2), p = new E("int32", new Int32Array(l * c), [l, c]), u = i[0].data, _ = p.data;
    for (let m = 1; m < i.dims[0]; ++m) {
      let g = i[m].data;
      for (let w = 0; w < g.length; ++w) g[w] > u[w] && (u[w] = g[w], _[w] = m);
    }
    let d = new Array(i.dims[0]);
    for (let m = 0; m < _.length; ++m) {
      let g = _[m];
      d[g] = g;
    }
    let f = d.filter((m) => m !== void 0);
    n.push({ segmentation: p, labels: f });
  }
  return n;
}
function hS(t6, e, s, r) {
  let n = [], o = [], a = [];
  for (let i = 0; i < t6.dims[0]; ++i) {
    let l = t6[i], c = e[i], p = fe(l.data)[1];
    if (p === r) continue;
    let _ = ge(l.data)[p];
    _ > s && (n.push(c), o.push(_), a.push(p));
  }
  return [n, o, a];
}
function gS(t6, e, s, r = 0.5, n = 0.8) {
  let o = [], a = 0, i = 0, l = e[s].data;
  for (let p = 0; p < t6.length; ++p) t6[p] === s && (o.push(p), ++a), l[p] >= r && ++i;
  let c = a > 0 && i > 0;
  return c && (c = a / i > n), [c, o];
}
function xS(t6, e, s, r, n, o = null, a = null) {
  let [i, l] = a ?? t6[0].dims, c = new E("int32", new Int32Array(i * l), [i, l]), p = [];
  if (a !== null) for (let m = 0; m < t6.length; ++m) t6[m] = Bp(t6[m], a, "bilinear", false);
  let u = new Int32Array(t6[0].data.length), _ = new Float32Array(t6[0].data.length);
  for (let m = 0; m < t6.length; ++m) {
    let g = e[m], w = t6[m].data;
    for (let x = 0; x < w.length; ++x) w[x] *= g, w[x] > _[x] && (u[x] = m, _[x] = w[x]);
  }
  let d = 0, f = c.data;
  for (let m = 0; m < s.length; ++m) {
    let g = s[m], [w, x] = gS(u, t6, m, r, n);
    if (w) {
      ++d;
      for (let y of x) f[y] = d;
      p.push({ id: d, label_id: g, score: e[m] });
    }
  }
  return [c, p];
}
function Zs2(t6, e, s = 28, r = 3136, n = 784 * 1280, o = 1) {
  if (t6 < s || e < s) {
    let l = Math.max(s / t6, s / e);
    t6 = Math.round(t6 * l), e = Math.round(e * l);
  }
  if (Math.max(t6, e) / Math.min(t6, e) > 200) throw new Error(`absolute aspect ratio must be smaller than 200, got ${Math.max(t6, e) / Math.min(t6, e)}`);
  let a = Math.round(t6 / s) * s, i = Math.round(e / s) * s;
  if (o * a * i > n) {
    let l = Math.sqrt(o * t6 * e / n);
    a = Math.max(s, Math.floor(t6 / l / s) * s), i = Math.max(s, Math.floor(e / l / s) * s);
  } else if (o * a * i < r) {
    let l = Math.sqrt(r / (o * t6 * e));
    a = Math.ceil(t6 * l / s) * s, i = Math.ceil(e * l / s) * s;
  }
  return [i, a];
}
function rl(t6, e = 0.5, s = 0.5, r = 0.8, n = null, o = null) {
  n === null && (R.warn("`label_ids_to_fuse` unset. No instance will be fused."), n = /* @__PURE__ */ new Set());
  let a = t6.class_queries_logits ?? t6.logits, l = (t6.masks_queries_logits ?? t6.pred_masks).sigmoid(), [c, p, u] = a.dims;
  if (u -= 1, o !== null && o.length !== c) throw Error("Make sure that you pass in as many target sizes as the batch dimension of the logits");
  let _ = [];
  for (let d = 0; d < c; ++d) {
    let f = o !== null ? o[d] : null, m = a[d], g = l[d], [w, x, y] = hS(m, g, e, u);
    if (y.length === 0) {
      let [k, O] = f ?? g.dims.slice(-2), T = new E("int32", new Int32Array(k * O).fill(-1), [k, O]);
      _.push({ segmentation: T, segments_info: [] });
      continue;
    }
    let [b, v] = xS(w, x, y, s, r, n, f);
    _.push({ segmentation: b, segments_info: v });
  }
  return _;
}
function nl(t6, e = 0.5, s = null) {
  throw new Error("`post_process_instance_segmentation` is not yet implemented.");
}
var L = class extends xe {
  constructor(e) {
    super(), this.image_mean = e.image_mean ?? e.mean, this.image_std = e.image_std ?? e.std, this.resample = e.resample ?? 2, this.do_rescale = e.do_rescale ?? true, this.rescale_factor = e.rescale_factor ?? 1 / 255, this.do_normalize = e.do_normalize, this.do_thumbnail = e.do_thumbnail, this.size = e.size ?? e.image_size, this.do_resize = e.do_resize ?? this.size !== void 0, this.size_divisibility = e.size_divisibility ?? e.size_divisor, this.do_center_crop = e.do_center_crop, this.crop_size = e.crop_size, this.do_convert_rgb = e.do_convert_rgb ?? true, this.do_crop_margin = e.do_crop_margin, this.pad_size = e.pad_size, this.do_pad = e.do_pad, this.min_pixels = e.min_pixels, this.max_pixels = e.max_pixels, this.do_pad && !this.pad_size && !this.size_divisibility && this.size && this.size.width !== void 0 && this.size.height !== void 0 && (this.pad_size = this.size), this.do_flip_channel_order = e.do_flip_channel_order ?? false, this.config = e;
  }
  async thumbnail(e, s, r = 2) {
    let n = e.height, o = e.width, a = s.height, i = s.width, l = Math.min(n, a), c = Math.min(o, i);
    return l === n && c === o ? e : (n > o ? c = Math.floor(o * l / n) : o > n && (l = Math.floor(n * c / o)), await e.resize(c, l, { resample: r }));
  }
  async crop_margin(e, s = 200) {
    let r = e.clone().grayscale(), n = Qr2(r.data)[0], a = fe(r.data)[0] - n;
    if (a === 0) return e;
    let i = s / 255, l = r.width, c = r.height, p = 0, u = 0, _ = r.data;
    for (let d = 0; d < r.height; ++d) {
      let f = d * r.width;
      for (let m = 0; m < r.width; ++m) (_[f + m] - n) / a < i && (l = Math.min(l, m), c = Math.min(c, d), p = Math.max(p, m), u = Math.max(u, d));
    }
    return e = await e.crop([l, c, p, u]), e;
  }
  pad_image(e, s, r, { mode: n = "constant", center: o = false, constant_values: a = 0 } = {}) {
    let [i, l, c] = s, p, u;
    if (typeof r == "number" ? (p = r, u = r) : r === "square" ? p = u = Math.max(i, l) : (p = r.width, u = r.height), p !== l || u !== i) {
      let _ = new Float32Array(p * u * c);
      if (Array.isArray(a)) for (let m = 0; m < _.length; ++m) _[m] = a[m % c];
      else a !== 0 && _.fill(a);
      let [d, f] = o ? [Math.floor((p - l) / 2), Math.floor((u - i) / 2)] : [0, 0];
      for (let m = 0; m < i; ++m) {
        let g = (m + f) * p, w = m * l;
        for (let x = 0; x < l; ++x) {
          let y = (g + x + d) * c, b = (w + x) * c;
          for (let v = 0; v < c; ++v) _[y + v] = e[b + v];
        }
      }
      if (n === "symmetric") {
        if (o) throw new Error("`center` padding is not supported when `mode` is set to `symmetric`.");
        let m = i - 1, g = l - 1;
        for (let w = 0; w < u; ++w) {
          let x = w * p, y = Us2(w, m) * l;
          for (let b = 0; b < p; ++b) {
            if (w < i && b < l) continue;
            let v = (x + b) * c, k = (y + Us2(b, g)) * c;
            for (let O = 0; O < c; ++O) _[v + O] = e[k + O];
          }
        }
      }
      e = _, s = [u, p, c];
    }
    return [e, s];
  }
  rescale(e) {
    for (let s = 0; s < e.length; ++s) e[s] = this.rescale_factor * e[s];
  }
  get_resize_output_image_size(e, s) {
    let [r, n] = e.size, o, a;
    if (this.do_thumbnail) {
      let { height: i, width: l } = s;
      o = Math.min(i, l);
    } else Number.isInteger(s) ? (o = s, a = this.config.max_size ?? o) : s !== void 0 && (o = s.shortest_edge, a = s.longest_edge);
    if (o !== void 0 || a !== void 0) {
      let i = o === void 0 ? 1 : Math.max(o / r, o / n), l = r * i, c = n * i, p = a === void 0 ? 1 : Math.min(a / l, a / c), u = Math.floor(Number((l * p).toFixed(2))), _ = Math.floor(Number((c * p).toFixed(2)));
      return this.size_divisibility !== void 0 && ([u, _] = Sk([u, _], this.size_divisibility)), [u, _];
    } else if (s !== void 0 && s.width !== void 0 && s.height !== void 0) {
      let i = s.width, l = s.height;
      if (this.config.keep_aspect_ratio && this.config.ensure_multiple_of) {
        let c = l / n, p = i / r;
        Math.abs(1 - p) < Math.abs(1 - c) ? c = p : p = c, l = Mk(c * n, this.config.ensure_multiple_of), i = Mk(p * r, this.config.ensure_multiple_of);
      }
      return [i, l];
    } else {
      if (this.size_divisibility !== void 0) return Sk([r, n], this.size_divisibility);
      throw new Error(`Could not resize image due to unsupported \`this.size\` option in config: ${JSON.stringify(s)}`);
    }
  }
  async resize(e) {
    let [s, r] = this.get_resize_output_image_size(e, this.size);
    return await e.resize(s, r, { resample: this.resample });
  }
  async preprocess(e, { do_normalize: s = null, do_pad: r = null, do_convert_rgb: n = null, do_convert_grayscale: o = null, do_flip_channel_order: a = null } = {}) {
    this.do_crop_margin && (e = await this.crop_margin(e));
    let [i, l] = e.size;
    if (n ?? this.do_convert_rgb ? e = e.rgb() : o && (e = e.grayscale()), this.do_resize && (e = await this.resize(e)), this.do_thumbnail && (e = await this.thumbnail(e, this.size, this.resample)), this.do_center_crop) {
      let d, f;
      Number.isInteger(this.crop_size) ? (d = this.crop_size, f = this.crop_size) : (d = this.crop_size.width, f = this.crop_size.height), e = await e.center_crop(d, f);
    }
    let c = [e.height, e.width], p = Float32Array.from(e.data), u = [e.height, e.width, e.channels];
    if (this.do_rescale && this.rescale(p), s ?? this.do_normalize) {
      let d = this.image_mean;
      Array.isArray(this.image_mean) || (d = new Array(e.channels).fill(d));
      let f = this.image_std;
      if (Array.isArray(this.image_std) || (f = new Array(e.channels).fill(f)), d.length !== e.channels || f.length !== e.channels) throw new Error(`When set to arrays, the length of \`image_mean\` (${d.length}) and \`image_std\` (${f.length}) must match the number of channels in the image (${e.channels}).`);
      for (let m = 0; m < p.length; m += e.channels) for (let g = 0; g < e.channels; ++g) p[m + g] = (p[m + g] - d[g]) / f[g];
    }
    if (r ?? this.do_pad) {
      if (this.pad_size) [p, u] = this.pad_image(p, [e.height, e.width, e.channels], this.pad_size);
      else if (this.size_divisibility) {
        let d = Math.ceil(u[1] / this.size_divisibility) * this.size_divisibility, f = Math.ceil(u[0] / this.size_divisibility) * this.size_divisibility;
        [p, u] = this.pad_image(p, u, { width: d, height: f });
      }
    }
    if (a ?? this.do_flip_channel_order) {
      if (u[2] !== 3) throw new Error("Flipping channel order is only supported for RGB images.");
      for (let d = 0; d < p.length; d += 3) {
        let f = p[d];
        p[d] = p[d + 2], p[d + 2] = f;
      }
    }
    let _ = new E("float32", p, u).permute(2, 0, 1);
    return { original_size: [l, i], reshaped_input_size: c, pixel_values: _ };
  }
  async _call(e, ...s) {
    Array.isArray(e) || (e = [e]);
    let r = await Promise.all(e.map((o) => this.preprocess(o)));
    return { pixel_values: Ge(r.map((o) => o.pixel_values), 0), original_sizes: r.map((o) => o.original_size), reshaped_input_sizes: r.map((o) => o.reshaped_input_size) };
  }
  static async from_pretrained(e, s = {}) {
    let r = await ze2(e, Ot2, true, s);
    return new this(r);
  }
};
var nr2 = {};
qr(nr2, { BeitFeatureExtractor: () => r_, BitImageProcessor: () => n_, CHMv2ImageProcessor: () => a_, CLIPFeatureExtractor: () => i_, CLIPImageProcessor: () => ol, ChineseCLIPFeatureExtractor: () => o_, ConvNextFeatureExtractor: () => l_, ConvNextImageProcessor: () => al, DINOv3ViTImageProcessor: () => u_, DPTFeatureExtractor: () => d_, DPTImageProcessor: () => cl, DeiTFeatureExtractor: () => c_, DeiTImageProcessor: () => il, DetrFeatureExtractor: () => p_, DetrImageProcessor: () => ll, DonutFeatureExtractor: () => __, DonutImageProcessor: () => er2, EfficientNetImageProcessor: () => f_, GLPNFeatureExtractor: () => g_, Gemma3ImageProcessor: () => m_, Gemma4ImageProcessor: () => ws2, Glm46VImageProcessor: () => h_, GroundingDinoImageProcessor: () => x_, Idefics3ImageProcessor: () => pl, ImageFeatureExtractor: () => L, ImageProcessor: () => L, JinaCLIPImageProcessor: () => y_, Lfm2VlImageProcessor: () => b_, LlavaOnevisionImageProcessor: () => k_, Mask2FormerImageProcessor: () => E_, MaskFormerFeatureExtractor: () => v_, MaskFormerImageProcessor: () => tr2, MobileNetV1FeatureExtractor: () => A_, MobileNetV1ImageProcessor: () => ul, MobileNetV2FeatureExtractor: () => M_, MobileNetV2ImageProcessor: () => _l, MobileNetV3FeatureExtractor: () => S_, MobileNetV3ImageProcessor: () => dl, MobileNetV4FeatureExtractor: () => O_, MobileNetV4ImageProcessor: () => fl, MobileViTFeatureExtractor: () => I_, MobileViTImageProcessor: () => ml, NougatImageProcessor: () => T_, OwlViTFeatureExtractor: () => z_, OwlViTImageProcessor: () => sr2, Owlv2ImageProcessor: () => C_, Phi3VImageProcessor: () => L_, PixtralImageProcessor: () => $_, PvtImageProcessor: () => R_, Qwen2VLImageProcessor: () => mn2, RTDetrImageProcessor: () => F_, Sam2ImageProcessor: () => hn2, Sam3ImageProcessor: () => hn2, SamImageProcessor: () => hn2, SapiensFeatureExtractor: () => D_, SapiensImageProcessor: () => hl, SegformerFeatureExtractor: () => B_, SegformerImageProcessor: () => gl, SiglipImageProcessor: () => q_, SmolVLMImageProcessor: () => pl, Swin2SRImageProcessor: () => U_, VLMImageProcessor: () => w_, ViTFeatureExtractor: () => j_, ViTImageProcessor: () => xl, VitMatteImageProcessor: () => G_, VitPoseImageProcessor: () => W_, YolosFeatureExtractor: () => V_, YolosImageProcessor: () => wl });
var r_ = class extends L {
};
var n_ = class extends L {
};
var o_ = class extends L {
};
var a_ = class extends L {
};
var ol = class extends L {
};
var i_ = class extends ol {
};
var al = class extends L {
  constructor(e) {
    super(e), this.crop_pct = this.config.crop_pct ?? 224 / 256;
  }
  async resize(e) {
    let s = this.size?.shortest_edge;
    if (s === void 0) throw new Error("Size dictionary must contain 'shortest_edge' key.");
    if (s < 384) {
      let r = Math.floor(s / this.crop_pct), [n, o] = this.get_resize_output_image_size(e, { shortest_edge: r });
      e = await e.resize(n, o, { resample: this.resample }), e = await e.center_crop(s, s);
    } else e = await e.resize(s, s, { resample: this.resample });
    return e;
  }
};
var l_ = class extends al {
};
var il = class extends L {
};
var c_ = class extends il {
};
var ll = class extends L {
  async _call(e) {
    let s = await super._call(e), r = [s.pixel_values.dims[0], 64, 64], n = Ae(r, 1n);
    return { ...s, pixel_mask: n };
  }
  post_process_object_detection(...e) {
    return Kt2(...e);
  }
  post_process_panoptic_segmentation(...e) {
    return rl(...e);
  }
  post_process_instance_segmentation(...e) {
    return nl(...e);
  }
};
var p_ = class extends ll {
};
var u_ = class extends L {
};
var er2 = class extends L {
  pad_image(e, s, r, n = {}) {
    let [o, a, i] = s, l = this.image_mean;
    Array.isArray(this.image_mean) || (l = new Array(i).fill(l));
    let c = this.image_std;
    Array.isArray(c) || (c = new Array(i).fill(l));
    let p = l.map((u, _) => -u / c[_]);
    return super.pad_image(e, s, r, { center: true, constant_values: p, ...n });
  }
};
var __ = class extends er2 {
};
var cl = class extends L {
};
var d_ = class extends cl {
};
var f_ = class extends L {
  constructor(e) {
    super(e), this.include_top = this.config.include_top ?? true, this.include_top && (this.image_std = this.image_std.map((s) => s * s));
  }
};
var m_ = class extends L {
};
var mn2 = class extends L {
  constructor(e) {
    super(e), this.min_pixels = e.min_pixels ?? e.size?.shortest_edge, this.max_pixels = e.max_pixels ?? e.size?.longest_edge, this.patch_size = e.patch_size, this.merge_size = e.merge_size;
  }
  get_resize_output_image_size(e, s) {
    let r = this.patch_size * this.merge_size;
    return Zs2(e.height, e.width, r, this.min_pixels, this.max_pixels);
  }
  async _call(e, ...s) {
    let { pixel_values: r, original_sizes: n, reshaped_input_sizes: o } = await super._call(e, ...s), a = r, { temporal_patch_size: i, merge_size: l, patch_size: c } = this.config;
    a.dims[0] === 1 && (a = ne(Array.from({ length: i }, () => a), 0));
    let p = a.dims[0] / i, u = a.dims[1], _ = Math.floor(a.dims[2] / c), d = Math.floor(a.dims[3] / c), f = a.view(p, i, u, Math.floor(_ / l), l, c, Math.floor(d / l), l, c).permute(0, 3, 6, 4, 7, 2, 1, 5, 8).view(p * _ * d, u * i * c * c), m = new E("int64", [p, _, d], [1, 3]);
    return { pixel_values: f, image_grid_thw: m, original_sizes: n, reshaped_input_sizes: o };
  }
};
var h_ = class extends mn2 {
  get_resize_output_image_size(e, s) {
    let r = this.patch_size * this.merge_size, n = this.config.temporal_patch_size ?? 2;
    return Zs2(e.height, e.width, r, this.min_pixels, this.max_pixels, n);
  }
};
var g_ = class extends L {
};
var x_ = class extends L {
  async _call(e) {
    let s = await super._call(e), r = s.pixel_values.dims, n = Oe([r[0], r[2], r[3]]);
    return { ...s, pixel_mask: n };
  }
};
var pl = class extends L {
  constructor(e) {
    super(e), this.do_image_splitting = e.do_image_splitting ?? true, this.max_image_size = e.max_image_size;
  }
  get_resize_for_vision_encoder(e, s) {
    let [r, n] = e.dims.slice(-2), o = n / r;
    return n >= r ? (n = Math.ceil(n / s) * s, r = Math.floor(n / o), r = Math.ceil(r / s) * s) : (r = Math.ceil(r / s) * s, n = Math.floor(r * o), n = Math.ceil(n / s) * s), { height: r, width: n };
  }
  async _call(e, { do_image_splitting: s = null, return_row_col_info: r = false } = {}) {
    let n;
    if (!Array.isArray(e)) n = [[e]];
    else {
      if (e.length === 0 || !e[0]) throw new Error("No images provided.");
      Array.isArray(e[0]) ? n = e : n = [e];
    }
    let o = [], a = [], i = [], l = [], c = [];
    for (let w of n) {
      let x = await Promise.all(w.map((v) => this.preprocess(v)));
      l.push(...x.map((v) => v.original_size)), c.push(...x.map((v) => v.reshaped_input_size)), x.forEach((v) => v.pixel_values.unsqueeze_(0));
      let { longest_edge: y } = this.max_image_size, b;
      if (s ?? this.do_image_splitting) {
        let v = new Array(x.length), k = new Array(x.length);
        b = await Promise.all(x.map(async (O, T) => {
          let $ = this.get_resize_for_vision_encoder(O.pixel_values, y), C = await He2(O.pixel_values, { size: [$.height, $.width] }), { frames: D, num_splits_h: W, num_splits_w: V2 } = await this.split_image(C, this.max_image_size);
          return v[T] = W, k[T] = V2, ne(D, 0);
        })), a.push(v), i.push(k);
      } else {
        let v = [y, y];
        b = await Promise.all(x.map((k) => He2(k.pixel_values, { size: v }))), a.push(new Array(x.length).fill(0)), i.push(new Array(x.length).fill(0));
      }
      o.push(ne(b, 0));
    }
    let p = o.length, [u, _, d, f] = o[0].dims, m, g;
    if (p === 1) m = o[0].unsqueeze_(0), g = Ae([p, u, d, f], true);
    else {
      let w = Math.max(...o.map((b) => b.dims.at(0)));
      g = Ae([p, w, d, f], true);
      let x = g.data, y = w * d * f;
      for (let b = 0; b < p; ++b) {
        let v = o[b].dims[0];
        if (v < w) {
          o[b] = ne([o[b], Ae([w - v, _, d, f], 0)], 0);
          let k = b * y + v * d * f, O = (b + 1) * y;
          x.fill(false, k, O);
        }
      }
      m = Ge(o, 0);
    }
    return { pixel_values: m, pixel_attention_mask: g, original_sizes: l, reshaped_input_sizes: c, ...r ? { rows: a, cols: i } : {} };
  }
  async split_image(e, { longest_edge: s }) {
    let r = s, n = s, o = [], [a, i] = e.dims.slice(-2), l = 0, c = 0;
    if (a > r || i > n) {
      l = Math.ceil(a / r), c = Math.ceil(i / n);
      let p = Math.ceil(a / l), u = Math.ceil(i / c);
      for (let f = 0; f < l; ++f) for (let m = 0; m < c; ++m) {
        let g, w, x, y;
        f === l - 1 ? (w = a - p, y = a) : (w = f * p, y = (f + 1) * p), m === c - 1 ? (g = i - u, x = i) : (g = m * u, x = (m + 1) * u);
        let k = await Ki(e, [w, g], [y, x], [2, 3]);
        o.push(k);
      }
      let _ = r, d = n;
      (a !== _ || i !== d) && (e = await He2(e, { size: [_, d] }));
    }
    return o.push(e), { frames: o, num_splits_h: l, num_splits_w: c };
  }
};
var w_ = class extends L {
  constructor(e) {
    super({ do_pad: true, pad_size: { width: e.image_size, height: e.image_size }, ...e }), this.constant_values = this.config.background_color.map((s) => s * this.rescale_factor);
  }
  pad_image(e, s, r, n) {
    return super.pad_image(e, s, r, { constant_values: this.constant_values, center: true, ...n });
  }
};
var y_ = class extends L {
  constructor(e) {
    let { resize_mode: s, fill_color: r, interpolation: n, size: o, ...a } = e, i = s === "squash" ? { width: o, height: o } : s === "shortest" ? { shortest_edge: o } : { longest_edge: o }, l = n === "bicubic" ? 3 : 2;
    super({ ...a, size: i, resample: l, do_center_crop: true, crop_size: o, do_normalize: true });
  }
};
function Ok(t6, e) {
  return Math.round(t6 / e) * e;
}
function wS(t6, e, s, r, n) {
  let o = 1 / 0, a = [1, 1], i = s * r;
  for (let l of e) {
    let c = Math.abs(t6 - l[0] / l[1]);
    c < o ? (o = c, a = l) : c === o && i > 0.5 * n * n * l[0] * l[1] && (a = l);
  }
  return a;
}
function yS(t6, e) {
  let s = [], r = /* @__PURE__ */ new Set();
  for (let n = t6; n <= e; ++n) for (let o = 1; o <= n; ++o) for (let a = 1; a <= n; ++a) {
    let i = o * a;
    if (i >= t6 && i <= e) {
      let l = o << 16 | a;
      r.has(l) || (r.add(l), s.push([o, a]));
    }
  }
  return s.sort((n, o) => n[0] * n[1] - o[0] * o[1]);
}
function bS(t6, e) {
  let [s, r, n, o] = t6.dims, a = Math.floor(n / e), i = Math.floor(o / e), l = e * e * r, c = t6.data, p = new Float32Array(s * a * i * l), u = n * o;
  for (let _ = 0; _ < s; ++_) {
    let d = _ * r * u, f = _ * a * i * l;
    for (let m = 0; m < a; ++m) for (let g = 0; g < i; ++g) {
      let w = f + (m * i + g) * l;
      for (let x = 0; x < e; ++x) {
        let y = (m * e + x) * o + g * e;
        for (let b = 0; b < e; ++b) {
          let v = y + b;
          for (let k = 0; k < r; ++k) p[w++] = c[d + k * u + v];
        }
      }
    }
  }
  return new E("float32", p, [s, a * i, l]);
}
function kS(t6, e) {
  let [, s, r] = t6.dims, n = new BigInt64Array(e);
  n.fill(1n, 0, s);
  let o = t6;
  if (s < e) {
    let a = new Float32Array(e * r);
    a.set(t6.data), o = new E("float32", a, [1, e, r]);
  }
  return { padded: o, mask: new E("int64", n, [e]) };
}
var b_ = class extends L {
  constructor(e) {
    super(e), this.downsample_factor = e.downsample_factor ?? 2, this.do_image_splitting = e.do_image_splitting ?? true, this.min_tiles = e.min_tiles ?? 2, this.max_tiles = e.max_tiles ?? 10, this.use_thumbnail = e.use_thumbnail ?? true, this.min_image_tokens = e.min_image_tokens ?? 64, this.max_image_tokens = e.max_image_tokens ?? 256, this.encoder_patch_size = e.encoder_patch_size ?? e.patch_size ?? 16, this.tile_size = e.tile_size ?? 512, this.max_pixels_tolerance = e.max_pixels_tolerance ?? 2, this.return_row_col_info = e.return_row_col_info ?? false;
    let s = this.max_image_tokens * this.downsample_factor ** 2, r = this.do_image_splitting ? (this.tile_size / this.encoder_patch_size) ** 2 : 0;
    this.max_num_patches = Math.max(s, r);
  }
  _is_image_too_large(e, s) {
    let r = this.encoder_patch_size * this.downsample_factor, n = Math.max(this.encoder_patch_size, Ok(e, r)), o = Math.max(this.encoder_patch_size, Ok(s, r));
    return n * o > this.max_image_tokens * (this.encoder_patch_size * this.downsample_factor) ** 2 * this.max_pixels_tolerance;
  }
  _get_grid_layout(e, s) {
    let r = yS(this.min_tiles, this.max_tiles), [n, o] = wS(s / e, r, s, e, this.tile_size);
    return { grid_width: n, grid_height: o, target_width: this.tile_size * n, target_height: this.tile_size * o };
  }
  async _call(e, { return_row_col_info: s = null } = {}) {
    let r;
    Array.isArray(e) ? Array.isArray(e[0]) ? r = e : r = [e] : r = [[e]];
    let n = [], o = [], a = [], i = [], l = [], c = [];
    for (let u of r) {
      let _ = await Promise.all(u.map((d) => this.preprocess(d, { do_pad: false })));
      for (let { pixel_values: d } of _) {
        let [, f, m] = d.dims, g = d.unsqueeze_(0), w = this.encoder_patch_size * this.downsample_factor, x = w ** 2, [y, b] = Zs2(Math.max(w, f), Math.max(w, m), w, this.min_image_tokens * x, this.max_image_tokens * x).map((C) => Math.max(w, C)), v, k = 1, O = 1, T = this._is_image_too_large(f, m), $ = this.do_image_splitting && !(this.min_tiles === 1 && this.max_tiles === 1);
        if (T && $) {
          let { grid_width: C, grid_height: D, target_width: W, target_height: V2 } = this._get_grid_layout(f, m);
          k = D, O = C;
          let B = await He2(g, { size: [V2, W] });
          v = [];
          for (let q = 0; q < D; ++q) for (let Z = 0; Z < C; ++Z) {
            let j2 = q * this.tile_size, ue = Z * this.tile_size;
            v.push(B.slice(null, null, [j2, j2 + this.tile_size], [ue, ue + this.tile_size]));
          }
          this.use_thumbnail && C * D !== 1 && v.push(await He2(g, { size: [b, y] }));
        } else v = [await He2(g, { size: [b, y] })];
        for (let C of v) {
          let [, , D, W] = C.dims, V2 = bS(C, this.encoder_patch_size), { padded: B, mask: q } = kS(V2, this.max_num_patches);
          n.push(B), o.push(q), a.push([Math.floor(D / this.encoder_patch_size), Math.floor(W / this.encoder_patch_size)]);
        }
        i.push(k), l.push(O), c.push([b, y]);
      }
    }
    let p = { pixel_values: ne(n, 0), pixel_attention_mask: Ge(o, 0), spatial_shapes: new E("int64", BigInt64Array.from(a.flat(), BigInt), [a.length, 2]) };
    return (s ?? this.return_row_col_info) && (p.image_rows = i, p.image_cols = l, p.image_sizes = c), p;
  }
};
var k_ = class extends L {
};
var tr2 = class extends L {
  post_process_panoptic_segmentation(...e) {
    return rl(...e);
  }
  post_process_instance_segmentation(...e) {
    return nl(...e);
  }
};
var v_ = class extends tr2 {
};
var E_ = class extends tr2 {
};
var ul = class extends L {
};
var A_ = class extends ul {
};
var _l = class extends L {
};
var M_ = class extends _l {
};
var dl = class extends L {
};
var S_ = class extends dl {
};
var fl = class extends L {
};
var O_ = class extends fl {
};
var ml = class extends L {
};
var I_ = class extends ml {
};
var T_ = class extends er2 {
};
var sr2 = class extends L {
  post_process_object_detection(...e) {
    return Kt2(...e);
  }
};
var z_ = class extends sr2 {
};
var C_ = class extends sr2 {
};
var Ze = 336;
var vS = [2, 3];
var { ceil: P_, floor: rr2, sqrt: N_ } = Math;
var L_ = class extends L {
  constructor(e) {
    super({ ...e, do_normalize: true, do_pad: true, pad_size: "custom", do_convert_rgb: true, do_resize: true }), this._num_crops = e.num_crops;
  }
  calc_num_image_tokens_from_image_size(e, s) {
    let { num_img_tokens: r } = this.config;
    return rr2((rr2(s / Ze) * rr2(e / Ze) + 1) * r + 1 + (rr2(s / Ze) + 1) * N_(r));
  }
  get_resize_output_image_size(e, s) {
    let r = this._num_crops, [n, o] = e.size, a = n / o, i = 1;
    for (; i * Math.ceil(i / a) <= r; ) i += 1;
    i -= 1;
    let l = Math.floor(i * 336), c = Math.floor(l / a);
    return [l, c];
  }
  pad_image(e, s, r, n = {}) {
    let [o, a] = s, i = Ze * P_(o / Ze), l = Ze * P_(a / Ze), c = [1, 1, 1].map((p, u) => (p - this.image_mean[u]) / this.image_std[u]);
    return super.pad_image(e, s, { width: l, height: i }, { center: true, constant_values: c, ...n });
  }
  async _call(e, { num_crops: s = null } = {}) {
    if (this._num_crops = s ??= this.config.num_crops, s < 4 || N_(s) % 1 !== 0) throw new Error("num_crops must be a square number >= 4");
    Array.isArray(e) || (e = [e]);
    let r = e.length, n = await Promise.all(e.map((_) => this.preprocess(_))), o = n.map((_) => _.original_size), a = n.map((_) => _.reshaped_input_size), i = [];
    for (let { pixel_values: _ } of n) {
      _.unsqueeze_(0);
      let [d, f] = _.dims.slice(-2), m = await He2(_, { size: [Ze, Ze], mode: "bicubic" });
      if (s > 0) {
        let g = [], w = N_(s), x = rr2(f / w), y = rr2(d / w);
        for (let v = 0; v < w; ++v) for (let k = 0; k < w; ++k) {
          let O, T, $, C;
          v === w - 1 ? (T = d - y, C = d) : (T = v * y, C = (v + 1) * y), k === w - 1 ? (O = f - x, $ = f) : (O = k * x, $ = (k + 1) * x);
          let V2 = await Ki(_, [T, O], [C, $], vS);
          g.push(V2);
        }
        let b = await He2(ne(g, 0), { size: [Ze, Ze], mode: "bicubic" });
        i.push(ne([m, b], 0));
      } else i.push(m);
    }
    let l = Ge(i, 0), c = a.map((_) => _.map((d) => Ze * P_(d / Ze))), p = new E("int64", c.flat(), [r, 2]), u = c.map(([_, d]) => this.calc_num_image_tokens_from_image_size(d, _));
    return { pixel_values: l, original_sizes: o, reshaped_input_sizes: a, image_sizes: p, num_img_tokens: u };
  }
};
var $_ = class extends L {
  get_resize_output_image_size(e, s) {
    let { longest_edge: r } = s;
    if (r === void 0) throw new Error("size must contain 'longest_edge'");
    let [n, o] = e.size, a = Math.max(n, o) / r, i = n, l = o;
    a > 1 && (i = Math.floor(n / a), l = Math.floor(o / a));
    let { patch_size: c, spatial_merge_size: p } = this.config;
    if (!p) throw new Error("config must contain 'spatial_merge_size'");
    let u = c * p, _ = Math.floor((i - 1) / u) + 1, d = Math.floor((l - 1) / u) + 1;
    return [_ * u, d * u];
  }
};
var R_ = class extends L {
};
var F_ = class extends L {
  post_process_object_detection(...e) {
    return Kt2(...e);
  }
};
var hn2 = class extends L {
  reshape_input_points(e, s, r, n = false) {
    e = structuredClone(e);
    let o = kp(e);
    if (o.length === 3) n || (o = [1, ...o]), e = [e];
    else if (o.length !== 4) throw Error("The input_points must be a 4D tensor of shape `batch_size`, `point_batch_size`, `nb_points_per_image`, `2`.");
    for (let a = 0; a < e.length; ++a) {
      let [i, l] = s[a], [c, p] = r[a], u = [p / l, c / i];
      for (let _ = 0; _ < e[a].length; ++_) for (let d = 0; d < e[a][_].length; ++d) for (let f = 0; f < e[a][_][d].length; ++f) e[a][_][d][f] *= u[f % 2];
    }
    return new E("float32", Float32Array.from(e.flat(1 / 0)), o);
  }
  add_input_labels(e, s) {
    let r = kp(e);
    if (r.length === 2) r = [1, ...r], e = [e];
    else if (r.length !== 3) throw Error("The input_points must be a 4D tensor of shape `batch_size`, `point_batch_size`, `nb_points_per_image`, `2`.");
    if (r.some((n, o) => n !== s.dims[o])) throw Error(`The first ${r.length} dimensions of 'input_points' and 'input_labels' must be the same.`);
    return new E("int64", e.flat(1 / 0).map(BigInt), r);
  }
  async _call(e, { input_points: s = null, input_labels: r = null, input_boxes: n = null } = {}) {
    let o = await super._call(e);
    if (s && (o.input_points = this.reshape_input_points(s, o.original_sizes, o.reshaped_input_sizes)), r) {
      if (!o.input_points) throw Error("`input_points` must be provided if `input_labels` are provided.");
      o.input_labels = this.add_input_labels(r, o.input_points);
    }
    return n && (o.input_boxes = this.reshape_input_points(n, o.original_sizes, o.reshaped_input_sizes, true)), o;
  }
  async post_process_masks(e, s, r, { mask_threshold: n = 0, binarize: o = true, pad_size: a = null } = {}) {
    let i = [];
    a = a ?? this.pad_size ?? this.size;
    let l = [a.height, a.width];
    for (let c = 0; c < s.length; ++c) {
      let p = s[c], u = r[c], _ = await He2(e[c], { mode: "bilinear", size: l });
      if (_ = _.slice(null, null, [0, u[0]], [0, u[1]]), _ = await He2(_, { mode: "bilinear", size: p }), o) {
        let d = _.data, f = new Uint8Array(d.length);
        for (let m = 0; m < d.length; ++m) d[m] > n && (f[m] = 1);
        _ = new E("bool", f, _.dims);
      }
      i.push(_);
    }
    return i;
  }
  generate_crop_boxes(e, s, { crop_n_layers: r = 0, overlap_ratio: n = 512 / 1500, points_per_crop: o = 32, crop_n_points_downscale_factor: a = 1 } = {}) {
  }
};
var hl = class extends L {
  post_process_semantic_segmentation(...e) {
    return sl(...e);
  }
};
var D_ = class extends hl {
};
var gl = class extends L {
  post_process_semantic_segmentation(...e) {
    return sl(...e);
  }
};
var B_ = class extends gl {
};
var q_ = class extends L {
};
var U_ = class extends L {
  pad_image(e, s, r, n = {}) {
    let [o, a, i] = s;
    return super.pad_image(e, s, { width: a + (r - a % r) % r, height: o + (r - o % r) % r }, { mode: "symmetric", center: false, constant_values: -1, ...n });
  }
};
var xl = class extends L {
};
var j_ = class extends xl {
};
var G_ = class extends L {
  async _call(e, s) {
    Array.isArray(e) || (e = [e]), Array.isArray(s) || (s = [s]);
    let r = await Promise.all(e.map((a) => this.preprocess(a))), n = await Promise.all(s.map((a) => this.preprocess(a, { do_normalize: false, do_convert_rgb: false, do_convert_grayscale: true })));
    return { pixel_values: Ge(r.map((a, i) => ne([a.pixel_values, n[i].pixel_values], 0)), 0), original_sizes: r.map((a) => a.original_size), reshaped_input_sizes: r.map((a) => a.reshaped_input_size) };
  }
};
var W_ = class extends L {
  post_process_pose_estimation(e, s, { threshold: r = null } = {}) {
    let n = e.tolist(), [o, a, i, l] = e.dims, c = [];
    for (let p = 0; p < o; ++p) {
      let u = n[p], _ = s[p], d = [];
      for (let f = 0; f < _.length; ++f) {
        let m = _[f], g = [], w = [], x = [], y = m.at(-2) / l, b = m.at(-1) / i;
        for (let v = 0; v < u.length; ++v) {
          let [k, O] = [0, 0], T = 0, $ = -1 / 0, C = u[v];
          for (let W = 0; W < C.length; ++W) {
            let V2 = C[W];
            for (let B = 0; B < V2.length; ++B) {
              let q = V2[B];
              T += q, $ = Math.max($, q), k += (B + 0.5) * q, O += W * q;
            }
          }
          if (r != null && $ < r) continue;
          let D = [y * k / T, b * O / T];
          g.push(D), x.push(v), w.push($);
        }
        d.push({ bbox: m, scores: w, labels: x, keypoints: g });
      }
      c.push(d);
    }
    return c;
  }
};
var wl = class extends L {
  post_process_object_detection(...e) {
    return Kt2(...e);
  }
};
var V_ = class extends wl {
};
var pe = class {
  static async from_pretrained(e, s = {}) {
    let r = await ze2(e, Ot2, true, s), n = r.image_processor_type ?? r.feature_extractor_type, o = nr2[n?.replace(/Fast$/, "")];
    return o || (n !== void 0 && R.warn(`Image processor type '${n}' not found, assuming base ImageProcessor. Please report this at ${Vt}.`), o = L), new o(r);
  }
};
var H_ = class extends U {
  static tokenizer_class = G2;
  static image_processor_class = pe;
  constructor(e, s, r) {
    super(e, s, r);
    let { tasks_answer_post_processing_type: n, task_prompts_without_inputs: o, task_prompts_with_input: a } = this.image_processor.config;
    this.tasks_answer_post_processing_type = new Map(Object.entries(n ?? {})), this.task_prompts_without_inputs = new Map(Object.entries(o ?? {})), this.task_prompts_with_input = new Map(Object.entries(a ?? {})), this.regexes = { quad_boxes: /(.+?)<loc_(\d+)><loc_(\d+)><loc_(\d+)><loc_(\d+)><loc_(\d+)><loc_(\d+)><loc_(\d+)><loc_(\d+)>/gm, bboxes: /([^<]+)?<loc_(\d+)><loc_(\d+)><loc_(\d+)><loc_(\d+)>/gm }, this.size_per_bin = 1e3;
  }
  construct_prompts(e) {
    typeof e == "string" && (e = [e]);
    let s = [];
    for (let r of e) if (this.task_prompts_without_inputs.has(r)) s.push(this.task_prompts_without_inputs.get(r));
    else {
      for (let [n, o] of this.task_prompts_with_input) if (r.includes(n)) {
        s.push(o.replaceAll("{input}", r).replaceAll(n, ""));
        break;
      }
      s.length !== e.length && s.push(r);
    }
    return s;
  }
  post_process_generation(e, s, r) {
    let n = this.tasks_answer_post_processing_type.get(s) ?? "pure_text";
    e = e.replaceAll("<s>", "").replaceAll("</s>", "");
    let o;
    switch (n) {
      case "pure_text":
        o = e;
        break;
      case "description_with_bboxes":
      case "bboxes":
      case "phrase_grounding":
      case "ocr":
        let a = n === "ocr" ? "quad_boxes" : "bboxes", i = e.matchAll(this.regexes[a]), l = [], c = [];
        for (let [p, u, ..._] of i) l.push(u ? u.trim() : l.at(-1) ?? ""), c.push(_.map((d, f) => (Number(d) + 0.5) / this.size_per_bin * r[f % 2]));
        o = { labels: l, [a]: c };
        break;
      default:
        throw new Error(`Task "${s}" (of type "${n}") not yet implemented.`);
    }
    return { [s]: o };
  }
  async _call(e, s = null, r = {}) {
    if (!e && !s) throw new Error("Either text or images must be provided");
    let n = await this.image_processor(e, r), o = s ? this.tokenizer(this.construct_prompts(s), r) : {};
    return { ...n, ...o };
  }
};
var K_ = class extends U {
  static tokenizer_class = G2;
  static image_processor_class = pe;
  static uses_processor_config = true;
  static uses_chat_template_file = true;
  constructor(e, s, r) {
    super(e, s, r), this.image_seq_length = this.config.image_seq_length;
    let { boi_token: n, image_token: o, eoi_token: a } = this.tokenizer.config;
    this.boi_token = n, this.image_token = o, this.eoi_token = a;
    let i = o.repeat(this.image_seq_length);
    this.full_image_sequence = `

${n}${i}${a}

`;
  }
  async _call(e, s = null, r = {}) {
    typeof e == "string" && (e = [e]);
    let n;
    return s && (n = await this.image_processor(s, r), e = e.map((a) => a.replaceAll(this.boi_token, this.full_image_sequence))), { ...this.tokenizer(e, r), ...n };
  }
};
var X_ = class extends U {
  static image_processor_class = pe;
  static feature_extractor_class = we;
  static tokenizer_class = G2;
  static uses_processor_config = true;
  static uses_chat_template_file = true;
  constructor(e, s, r) {
    super(e, s, r), this.audio_seq_length = this.config.audio_seq_length, this.image_seq_length = this.config.image_seq_length;
    let { audio_token_id: n, boa_token: o, audio_token: a, eoa_token: i, image_token_id: l, boi_token: c, image_token: p, eoi_token: u } = this.tokenizer.config;
    this.audio_token_id = n, this.boa_token = o, this.audio_token = a;
    let _ = a.repeat(this.audio_seq_length);
    this.full_audio_sequence = `

${o}${_}${i}

`, this.image_token_id = l, this.boi_token = c, this.image_token = p;
    let d = p.repeat(this.image_seq_length);
    this.full_image_sequence = `

${c}${d}${u}

`;
  }
  async _call(e, s = null, r = null, n = {}) {
    typeof e == "string" && (e = [e]);
    let o;
    r && (o = await this.feature_extractor(r, n), e = e.map((l) => l.replaceAll(this.audio_token, this.full_audio_sequence)));
    let a;
    return s && (a = await this.image_processor(s, n), e = e.map((l) => l.replaceAll(this.image_token, this.full_image_sequence))), { ...this.tokenizer(e, n), ...a, ...o };
  }
};
var ys2 = class extends U {
  static image_processor_class = pe;
  static tokenizer_class = G2;
  static image_token = "<|image_pad|>";
  async _call(e, s = null, ...r) {
    Array.isArray(e) || (e = [e]);
    let n, o;
    if (s && (n = await this.image_processor(s), o = n.image_grid_thw), o) {
      let i = this.image_processor.config.merge_size ** 2, l = 0, c = this.constructor.image_token, p = o.tolist();
      e = e.map((u) => {
        for (; u.includes(c); ) {
          let _ = Number(p[l++].reduce((d, f) => d * f, 1n));
          u = u.replace(c, "<|placeholder|>".repeat(Math.floor(_ / i)));
        }
        return u.replaceAll("<|placeholder|>", c);
      });
    }
    return { ...this.tokenizer(e), ...n };
  }
};
var Q_ = class extends ys2 {
  static image_token = "<|image|>";
};
var Y_ = class extends U {
  static tokenizer_class = G2;
  static feature_extractor_class = we;
  static uses_processor_config = true;
  _get_num_audio_features(e) {
    let { hop_length: s } = this.feature_extractor.config.melspec_kwargs, { projector_window_size: r, projector_downsample_rate: n } = this.feature_extractor.config, o = Math.floor(r / n), a = Math.floor(e / s) + 1, i = Math.floor(a / 2);
    return Math.ceil(i / r) * o;
  }
  async _call(e, s = null, r = {}) {
    if (Array.isArray(e)) throw new Error("Batched inputs are not supported yet.");
    let n = {};
    if (s) {
      let { input_features: a } = await this.feature_extractor(s);
      n.input_features = a;
      let i = this._get_num_audio_features(s.length), l = new Uint8Array(i).fill(1);
      n.input_features_mask = new E("bool", l, [1, i]);
      let c = this.config.audio_token ?? "<|audio|>";
      if (!e.includes(c)) throw new Error(`The input text does not contain the audio token ${c}.`);
      e = e.replaceAll(c, c.repeat(i));
    }
    return { ...this.tokenizer(e, { add_special_tokens: false, ...r }), ...n };
  }
};
function ES(t6, e) {
  let r = t6.dims.at(-1) - 1, n = t6.tolist();
  n.fill(false, 0, 1), n.fill(false, r);
  let o = e.tolist();
  return n.map((a, i) => a ? i : null).filter((a) => a !== null).map((a) => o[a]);
}
var J_ = class extends U {
  static tokenizer_class = G2;
  static image_processor_class = pe;
  async _call(e, s, r = {}) {
    let n = e ? await this.image_processor(e, r) : {};
    return { ...s ? this.tokenizer(s, r) : {}, ...n };
  }
  post_process_grounded_object_detection(e, s, { box_threshold: r = 0.25, text_threshold: n = 0.25, target_sizes: o = null } = {}) {
    let { logits: a, pred_boxes: i } = e, l = a.dims[0];
    if (o !== null && o.length !== l) throw Error("Make sure that you pass in as many target sizes as the batch dimension of the logits");
    let c = a.dims.at(1), p = a.sigmoid(), u = p.max(-1).tolist(), _ = i.tolist().map((f) => f.map((m) => s_(m))), d = [];
    for (let f = 0; f < l; ++f) {
      let m = o !== null ? o[f] : null;
      m !== null && (_[f] = _[f].map((b) => b.map((v, k) => v * m[(k + 1) % 2])));
      let g = u[f], w = [], x = [], y = [];
      for (let b = 0; b < c; ++b) {
        let v = g[b];
        if (v <= r) continue;
        let k = _[f][b], O = p[f][b];
        w.push(v), y.push(k);
        let T = ES(O.gt(n), s[f]);
        x.push(T);
      }
      d.push({ scores: w, boxes: y, labels: this.batch_decode(x) });
    }
    return d;
  }
};
function AS(t6, e, s, r, n, o) {
  let a = "";
  for (let i = 0; i < e; ++i) {
    for (let l = 0; l < s; ++l) a += r + `<row_${i + 1}_col_${l + 1}>` + n.repeat(t6);
    a += `
`;
  }
  return a += `
${r}${o}` + n.repeat(t6) + `${r}`, a;
}
function MS(t6, e, s, r) {
  return `${e}${r}` + s.repeat(t6) + `${e}`;
}
function SS(t6, e, s, r, n, o) {
  return t6 === 0 && e === 0 ? MS(s, r, n, o) : AS(s, t6, e, r, n, o);
}
var yl = class extends U {
  static image_processor_class = pe;
  static tokenizer_class = G2;
  static uses_processor_config = true;
  fake_image_token = "<fake_token_around_image>";
  image_token = "<image>";
  global_img_token = "<global-img>";
  async _call(e, s = null, r = {}) {
    r.return_row_col_info ??= true;
    let n;
    s && (n = await this.image_processor(s, r)), Array.isArray(e) || (e = [e]);
    let o = n.rows ?? [new Array(e.length).fill(0)], a = n.cols ?? [new Array(e.length).fill(0)], i = this.config.image_seq_len, l = [], c = [];
    for (let u = 0; u < e.length; ++u) {
      let _ = e[u], d = o[u], f = a[u];
      l.push($0(_, this.image_token));
      let m = d.map((x, y) => SS(x, f[y], i, this.fake_image_token, this.image_token, this.global_img_token)), g = _.split(this.image_token);
      if (g.length === 0) throw new Error("The image token should be present in the text.");
      let w = g[0];
      for (let x = 0; x < m.length; ++x) w += m[x] + g[x + 1];
      c.push(w);
    }
    return { ...this.tokenizer(c), ...n };
  }
};
var Z_ = class extends U {
  static image_processor_class = pe;
  static tokenizer_class = G2;
  static uses_processor_config = true;
  constructor(e, s, r) {
    super(e, s, r), this.image_tag = this.config.image_tag, this.image_start_tag = this.config.image_start_tag, this.image_end_tag = this.config.image_end_tag, this.num_image_tokens = this.config.num_image_tokens;
  }
  async _call(e, { images: s = null, chat_template: r = "default" } = {}) {
    s ? Array.isArray(s) || (s = [s]) : s = await Promise.all(e.filter((g) => g.images).flatMap((g) => g.images).map((g) => Se.read(g)));
    let n = this.tokenizer, o = n.apply_chat_template(e, { tokenize: false, add_generation_prompt: true, chat_template: r }), a = (g) => n.encode(g, { add_special_tokens: false }), i = o.split(this.image_tag), l = i.length - 1;
    if (s.length !== l) throw new Error(`Number of images provided (${s.length}) does not match number of "${this.image_tag}" image tags (${l})`);
    let [c, p, u] = n.convert_tokens_to_ids([this.image_tag, this.image_start_tag, this.image_end_tag]), _ = a(i[0]), d = new Array(_.length).fill(false);
    for (let g = 1; g < i.length; ++g) {
      let w = new Array(this.num_image_tokens).fill(c), x = a(i[g]);
      _ = Ue(_, [p], w, [u], x);
      let y = new Array(this.num_image_tokens).fill(true);
      d = Ue(d, [false], y, [false], new Array(x.length).fill(false));
    }
    let f = [1, _.length], m = { input_ids: new E("int64", _, f), attention_mask: new E("int64", new Array(_.length).fill(1), f), images_seq_mask: new E("bool", d, f), images_emb_mask: new E("bool", new Array(l * this.num_image_tokens).fill(true), [1, l, this.num_image_tokens]) };
    if (s && s.length > 0) {
      let g = await this.image_processor(s);
      return g.pixel_values.unsqueeze_(0), { ...m, ...g };
    }
    return m;
  }
};
var ed = class extends U {
  static tokenizer_class = G2;
  static image_processor_class = pe;
  async _call(e = null, s = null, r = {}) {
    if (!e && !s) throw new Error("Either text or images must be provided");
    let n = e ? this.tokenizer(e, r) : {}, o = s ? await this.image_processor(s, r) : {};
    return { ...n, ...o };
  }
};
var td = class extends U {
  static tokenizer_class = G2;
  static image_processor_class = pe;
  async _call(e, s = null, r = {}) {
    let { image_rows: n, image_cols: o, image_sizes: a, ...i } = await this.image_processor(e, { ...r, return_row_col_info: true });
    if (s) {
      let l = this.config.image_token ?? "<image>", { tile_size: c = 512, downsample_factor: p = 2, encoder_patch_size: u = 16, use_thumbnail: _ = true } = this.image_processor.config, d = (y) => Math.ceil(Math.floor(y / u) / p), f = d(c) ** 2, m = this.config.image_start_token ?? "<|image_start|>", g = this.config.image_end_token ?? "<|image_end|>", w = this.config.image_thumbnail ?? "<|img_thumbnail|>";
      Array.isArray(s) || (s = [s]);
      let x = 0;
      s = s.map((y) => {
        let b = y.split(l);
        return b[0] + b.slice(1).map((v) => {
          let k = x++, [O, T] = a[k], $ = n[k], C = o[k], D = d(O) * d(T), W = m;
          if ($ > 1 || C > 1) {
            let V2 = l.repeat(f);
            for (let B = 0; B < $; ++B) for (let q = 0; q < C; ++q) W += `<|img_row_${B + 1}_col_${q + 1}|>` + V2;
            _ && (W += w + l.repeat(D));
          } else W += l.repeat(D);
          return W + g + v;
        }).join("");
      });
    }
    return { ...i, ...s ? this.tokenizer(s, r) : {} };
  }
};
var sd = class extends U {
  static tokenizer_class = G2;
  static image_processor_class = pe;
  static uses_processor_config = true;
  async _call(e, s = null, r = {}) {
    let n = await this.image_processor(e, r);
    if (s) {
      let [a, i] = n.pixel_values.dims.slice(-2), { image_token: l, patch_size: c, num_additional_image_tokens: p } = this.config, u = Math.floor(a / c) * Math.floor(i / c) + p;
      s = structuredClone(s), Array.isArray(s) || (s = [s]);
      for (let _ = 0; _ < s.length; ++_) s[_] = s[_].replace(l, l.repeat(u));
    }
    let o = s ? this.tokenizer(s, r) : {};
    return { ...n, ...o };
  }
};
var Ik = { char: ["char_decode", 1], bpe: ["bpe_decode", 2], wp: ["wp_decode", 102] };
var rd = class extends U {
  static tokenizer_class = G2;
  static image_processor_class = pe;
  get char_tokenizer() {
    return this.components.char_tokenizer;
  }
  get bpe_tokenizer() {
    return this.components.bpe_tokenizer;
  }
  get wp_tokenizer() {
    return this.components.wp_tokenizer;
  }
  _decode_helper(e, s) {
    if (!Ik.hasOwnProperty(s)) throw new Error(`Format ${s} is not supported.`);
    let [r, n] = Ik[s], o = this[r].bind(this), [a, i] = e.dims, l = [], c = [], p = e.tolist();
    for (let _ = 0; _ < a; ++_) {
      let d = p[_], f = [], m = [];
      for (let w = 1; w < i; ++w) {
        let [x, y] = fe(ge(d[w]));
        if (m.push(x), y == n) break;
        f.push(y);
      }
      let g = m.length > 0 ? m.reduce((w, x) => w * x, 1) : 0;
      c.push(f), l.push(g);
    }
    return [o(c), l];
  }
  char_decode(e) {
    return this.char_tokenizer.batch_decode(e).map((s) => s.replaceAll(" ", ""));
  }
  bpe_decode(e) {
    return this.bpe_tokenizer.batch_decode(e);
  }
  wp_decode(e) {
    return this.wp_tokenizer.batch_decode(e).map((s) => s.replaceAll(" ", ""));
  }
  batch_decode([e, s, r]) {
    let [n, o] = this._decode_helper(e, "char"), [a, i] = this._decode_helper(s, "bpe"), [l, c] = this._decode_helper(r, "wp"), p = [], u = [];
    for (let _ = 0; _ < n.length; ++_) {
      let [d, f] = fe([o[_], i[_], c[_]]);
      p.push([n[_], a[_], l[_]][f]), u.push(d);
    }
    return { generated_text: p, scores: u, char_preds: n, bpe_preds: a, wp_preds: l };
  }
  static async from_pretrained(...e) {
    let s = await super.from_pretrained(...e), r = await G2.from_pretrained("Xenova/gpt2"), n = await G2.from_pretrained("Xenova/bert-base-uncased");
    return s.components = { image_processor: s.image_processor, char_tokenizer: s.tokenizer, bpe_tokenizer: r, wp_tokenizer: n }, s;
  }
  async _call(e, s = null) {
    let r = await this.image_processor(e);
    return s && (r.labels = this.tokenizer(s).input_ids), r;
  }
};
var nd = class extends U {
  static tokenizer_class = G2;
  static feature_extractor_class = we;
  async _call(e) {
    return await this.feature_extractor(e);
  }
};
var od = class extends U {
  static tokenizer_class = G2;
  static image_processor_class = pe;
};
var or2 = "<image>";
function OS(t6, e, s, r, n) {
  return `${r.repeat(s * n)}${e}${t6}
`;
}
var ad = class extends U {
  static tokenizer_class = G2;
  static image_processor_class = pe;
  static uses_processor_config = false;
  async _call(e, s = null, r = {}) {
    s || (R.warn("You are using PaliGemma without a text prefix. It will perform as a picture-captioning model."), s = ""), Array.isArray(e) || (e = [e]), Array.isArray(s) || (s = [s]);
    let n = this.tokenizer.bos_token, o = this.image_processor.config.image_seq_length, a;
    s.some((c) => c.includes(or2)) ? a = s.map((c) => {
      let p = c.replaceAll(or2, or2.repeat(o)), u = p.lastIndexOf(or2), _ = u === -1 ? 0 : u + or2.length;
      return p.slice(0, _) + n + p.slice(_) + `
`;
    }) : (R.warn("You are passing both `text` and `images` to `PaliGemmaProcessor`. The processor expects special image tokens in the text, as many tokens as there are images per each text. It is recommended to add `<image>` tokens in the very beginning of your text. For this call, we will infer how many images each text has and add special tokens."), a = s.map((c) => OS(c, n, o, or2, e.length)));
    let i = this.tokenizer(a, r);
    return { ...await this.image_processor(e, r), ...i };
  }
};
var Tk = "<|image|>";
var IS = /<\|image_\d+\|>/g;
var id = class extends U {
  static image_processor_class = pe;
  static tokenizer_class = G2;
  async _call(e, s = null, { padding: r = true, truncation: n = true, num_crops: o = null } = {}) {
    Array.isArray(e) || (e = [e]);
    let a, i;
    if (s) {
      i = await this.image_processor(s, { num_crops: o });
      let { num_img_tokens: l } = i, c = e.map((u, _) => u.split(IS).join(Tk.repeat(l[_])));
      a = this.tokenizer(c, { padding: r, truncation: n });
      let p = this.tokenizer._tokenizer.token_to_id(Tk);
      a.input_ids.map_((u) => u == p ? -u : u);
    } else a = this.tokenizer(e);
    return { ...a, ...i };
  }
};
var ld = class extends U {
  static tokenizer_class = G2;
  static image_processor_class = pe;
  static uses_processor_config = true;
  async _call(e, s = null, r = {}) {
    let n = await this.image_processor(e, r);
    if (s) {
      let [a, i] = n.pixel_values.dims.slice(-2), { image_token: l, image_break_token: c, image_end_token: p, patch_size: u, spatial_merge_size: _ } = this.config, d = u * _, f = Math.floor(a / d), m = Math.floor(i / d);
      s = structuredClone(s), Array.isArray(s) || (s = [s]);
      for (let g = 0; g < s.length; ++g) {
        let w = l.repeat(m), x = w + c, y = w + p, b = x.repeat(f - 1) + y;
        s[g] = s[g].replace(l, b);
      }
    }
    let o = s ? this.tokenizer(s, r) : {};
    return { ...n, ...o };
  }
};
var cd = class extends U {
  static feature_extractor_class = un2;
  async _call(e) {
    return await this.feature_extractor(e);
  }
  post_process_speaker_diarization(...e) {
    return this.feature_extractor.post_process_speaker_diarization(...e);
  }
  get sampling_rate() {
    return this.feature_extractor.config.sampling_rate;
  }
};
var gn = class extends ys2 {
};
var pd = class extends gn {
};
var xn = class extends U {
  static image_processor_class = pe;
  async _call(...e) {
    return await this.image_processor(...e);
  }
  post_process_masks(...e) {
    return this.image_processor.post_process_masks(...e);
  }
  reshape_input_points(...e) {
    return this.image_processor.reshape_input_points(...e);
  }
};
var bl = class extends xn {
};
var ud = class extends bl {
};
var _d = class extends U {
  static tokenizer_class = G2;
  static feature_extractor_class = we;
  async _call(e) {
    return await this.feature_extractor(e);
  }
};
var dd = class extends U {
  static tokenizer_class = G2;
  static feature_extractor_class = we;
  static uses_processor_config = true;
  async _call(e, s = null, r = {}) {
    if (Array.isArray(e)) throw new Error("Batched inputs are not supported yet.");
    let n = {};
    if (s) {
      let a = s.length, { input_features: i } = await this.feature_extractor(s, { ...r, max_length: a }), l = Math.round(a / this.config.encoder_ds_factor + 1e-4), c = 1 + Math.ceil(l / this.config.stack_factor);
      n.audio_token_len = [c], n.audio_values = i;
      let p = this.config.audio_placeholder;
      if (!e.includes(p)) throw new Error(`The input text does not contain the image token ${p}.`);
      e = e.replaceAll(p, p.repeat(c));
    }
    return { ...this.tokenizer(e, { add_special_tokens: false, ...r }), ...n };
  }
};
var kl = "[AUDIO]";
var TS = "[BEGIN_AUDIO]";
var zS = 375;
function CS(t6, e) {
  let s = [];
  for (let r = 0; r < t6.length; r += e) s.push(t6.subarray(r, Math.min(r + e, t6.length)));
  return s;
}
var fd = class extends U {
  static tokenizer_class = G2;
  static feature_extractor_class = we;
  static uses_processor_config = false;
  async _call(e, s = null, r = {}) {
    if (Array.isArray(e)) throw new Error("Batched inputs are not supported yet.");
    let n = {};
    if (s) {
      if (!e.includes(kl)) throw new Error(`The input text does not contain the audio token ${kl}.`);
      Array.isArray(s) || (s = [s]);
      let a = e.split(kl), i = a.length - 1;
      if (i !== s.length) throw new Error(`The number of audio inputs (${s.length}) does not match the number of audio tokens in the text (${i}).`);
      let l = this.feature_extractor.config.n_samples, c = s.map((f) => CS(f, l)), p = c.map((f) => f.length), u = c.flat(), _ = (await Promise.all(u.map((f) => this.feature_extractor(f, r)))).map((f) => f.input_features);
      n.audio_values = _.length > 1 ? ne(_, 0) : _[0];
      let d = a[0];
      for (let f = 0; f < p.length; ++f) {
        d += TS;
        for (let m = 0; m < p[f]; ++m) d += kl.repeat(zS);
        d += a[f + 1];
      }
      e = d;
    }
    return { ...this.tokenizer(e, { add_special_tokens: false, ...r }), ...n };
  }
};
var zk = 32;
var md = 6;
var vl = 8;
var PS = 10;
var NS = 32;
var hd = class extends U {
  static tokenizer_class = G2;
  static feature_extractor_class = we;
  static uses_processor_config = false;
  get num_mel_frames_first_audio_chunk() {
    return (md + 1) * vl;
  }
  get num_samples_first_audio_chunk() {
    let { hop_length: e, n_fft: s } = this.feature_extractor.config;
    return (this.num_mel_frames_first_audio_chunk - 1) * e + Math.floor(s / 2);
  }
  get num_samples_per_audio_chunk() {
    let { hop_length: e, n_fft: s } = this.feature_extractor.config;
    return vl * e + s;
  }
  get num_right_pad_tokens() {
    return md + 1 + PS;
  }
  get audio_length_per_tok() {
    return vl;
  }
  get raw_audio_length_per_tok() {
    return vl * this.feature_extractor.config.hop_length;
  }
  async _call(e, { is_streaming: s = false, is_first_audio_chunk: r = true } = {}) {
    if (ce2(e, "VoxtralRealtimeProcessor"), !s && !r) throw new Error("In non-streaming mode (`is_streaming=false`), `is_first_audio_chunk` must be `true`.");
    if (r) if (s) {
      let n = zk * this.raw_audio_length_per_tok, o = new Float32Array(n + e.length);
      o.set(e, n);
      let a = await this.feature_extractor(o, { center: true }), l = 1 + (zk + md), c = new BigInt64Array(l).fill(BigInt(NS));
      return c[0] = 1n, { input_ids: new E("int64", c, [1, l]), ...a };
    } else {
      let n = this.num_right_pad_tokens * this.raw_audio_length_per_tok, o = new Float32Array(e.length + n);
      return o.set(e), await this.feature_extractor(o, { center: true });
    }
    else return await this.feature_extractor(e, { center: false });
  }
};
var gd = class extends U {
  static tokenizer_class = G2;
  static feature_extractor_class = we;
  async _call(e) {
    return await this.feature_extractor(e);
  }
};
var xd = class extends U {
  static tokenizer_class = G2;
  static feature_extractor_class = we;
  async _call(e) {
    return await this.feature_extractor(e);
  }
};
var wd = class extends U {
  static tokenizer_class = G2;
  static feature_extractor_class = we;
  async _call(e) {
    return await this.feature_extractor(e);
  }
};
var Al = class {
  static async from_pretrained(e, s = {}) {
    let r = await ze2(e, Ot2, true, s), { image_processor_type: n, feature_extractor_type: o, processor_class: a } = r;
    if (a && El[a]) return El[a].from_pretrained(e, s);
    if (!n && !o) throw new Error("No `image_processor_type` or `feature_extractor_type` found in the config.");
    let i = {};
    if (n) {
      let c = nr2[n.replace(/Fast$/, "")];
      if (!c) throw new Error(`Unknown image_processor_type: '${n}'.`);
      i.image_processor = new c(r);
    }
    if (o) {
      let c = nr2[o];
      if (c) i.image_processor = new c(r);
      else {
        let p = _n[o];
        if (!p) throw new Error(`Unknown feature_extractor_type: '${o}'.`);
        i.feature_extractor = new p(r);
      }
    }
    let l = {};
    return new U(l, i, null);
  }
};
async function LS(t6, e) {
  return await ze2(t6, "config.json", true, e);
}
function ar2(t6) {
  let e = {}, s = {};
  switch (t6.model_type) {
    case "llava":
    case "paligemma":
    case "gemma3":
    case "florence2":
    case "llava_onevision":
    case "idefics3":
    case "granite_speech":
    case "ultravox":
    case "voxtral":
    case "voxtral_realtime":
    case "smolvlm":
    case "gemma3n":
    case "gemma4":
    case "lfm2_vl":
    case "chatterbox":
    case "lighton_ocr":
    case "glm_ocr":
    case "mistral3":
    case "qwen2_5_vl":
    case "qwen3_vl":
    case "qwen3_vl_moe":
      s = ar2(t6.text_config);
      break;
    case "moondream1":
      s = ar2(t6.phi_config);
      break;
    case "musicgen":
      s = ar2(t6.decoder);
      break;
    case "multi_modality":
      s = ar2(t6.language_config);
      break;
    case "gpt2":
    case "gptj":
    case "jais":
    case "codegen":
    case "gpt_bigcode":
      e.num_heads = "n_head", e.num_layers = "n_layer", e.hidden_size = "n_embd";
      break;
    case "gpt_neox":
    case "stablelm":
    case "opt":
    case "falcon":
    case "modernbert-decoder":
      e.num_heads = "num_attention_heads", e.num_layers = "num_hidden_layers", e.hidden_size = "hidden_size";
      break;
    case "gpt_oss":
    case "llama":
    case "llama4_text":
    case "nanochat":
    case "apertus":
    case "arcee":
    case "afmoe":
    case "lfm2":
    case "lfm2_moe":
    case "smollm3":
    case "olmo":
    case "olmo2":
    case "olmo3":
    case "mobilellm":
    case "granite":
    case "granitemoehybrid":
    case "cohere":
    case "cohere2":
    case "mistral":
    case "voxtral_realtime_text":
    case "voxtral_realtime_encoder":
    case "starcoder2":
    case "qwen2":
    case "qwen2_moe":
    case "qwen2_vl":
    case "qwen2_vl_text":
    case "qwen2_5_vl_text":
    case "qwen3_moe":
    case "qwen3_vl_text":
    case "qwen3_vl_moe_text":
    case "phi":
    case "phi3":
    case "phi3_v":
    case "llava_qwen2":
      e.num_heads = "num_key_value_heads", e.num_layers = "num_hidden_layers", e.hidden_size = "hidden_size", e.num_attention_heads = "num_attention_heads", e.dim_kv = "head_dim";
      break;
    case "qwen3":
    case "solar_open":
    case "glm_ocr_text":
    case "gemma":
    case "gemma2":
    case "vaultgemma":
    case "gemma3_text":
    case "gemma3n_text":
    case "gemma4_text":
    case "glm":
    case "helium":
    case "ernie4_5":
    case "hunyuan_v1_dense":
    case "falcon_h1":
    case "nemotron_h":
    case "ministral":
    case "ministral3":
      e.num_heads = "num_key_value_heads", e.num_layers = "num_hidden_layers", e.dim_kv = "head_dim";
      break;
    case "openelm":
      e.num_heads = "num_kv_heads", e.num_layers = "num_transformer_layers", e.dim_kv = "head_dim";
      break;
    case "gpt_neo":
    case "donut-swin":
      e.num_heads = "num_heads", e.num_layers = "num_layers", e.hidden_size = "hidden_size";
      break;
    case "bloom":
      e.num_heads = "n_head", e.num_layers = "n_layer", e.hidden_size = "hidden_size";
      break;
    case "mpt":
      e.num_heads = "n_heads", e.num_layers = "n_layers", e.hidden_size = "d_model";
      break;
    case "exaone":
      e.num_heads = "num_key_value_heads", e.num_layers = "num_layers", e.dim_kv = "head_dim", e.num_attention_heads = "num_attention_heads";
      break;
    case "youtu":
    case "deepseek_v3":
    case "deepseek_v4":
    case "glm_moe_dsa":
    case "mistral4":
      e.num_heads = "num_key_value_heads", e.num_layers = "num_hidden_layers", e.dim_kv = t6.model_type === "deepseek_v4" ? "head_dim" : "qk_head_dim", e.num_attention_heads = "num_attention_heads";
      break;
    case "zaya":
      e.num_heads = "num_key_value_heads", e.num_layers = "num_hidden_layers", e.hidden_size = "hidden_size", e.dim_kv = "head_dim", e.num_attention_heads = "num_attention_heads";
      break;
    case "hrm_text":
      e.num_heads = "num_key_value_heads", e.num_layers = "num_hidden_layers", e.hidden_size = "hidden_size", e.dim_kv = "head_dim", e.num_attention_heads = "num_attention_heads";
      break;
    case "t5":
    case "mt5":
    case "longt5":
      e.num_decoder_layers = "num_decoder_layers", e.num_decoder_heads = "num_heads", e.decoder_dim_kv = "d_kv", e.num_encoder_layers = "num_layers", e.num_encoder_heads = "num_heads", e.encoder_dim_kv = "d_kv";
      break;
    case "bart":
    case "mbart":
    case "marian":
    case "whisper":
    case "lite-whisper":
    case "m2m_100":
    case "blenderbot":
    case "blenderbot-small":
    case "florence2_language":
      e.num_decoder_layers = "decoder_layers", e.num_decoder_heads = "decoder_attention_heads", e.decoder_hidden_size = "d_model", e.num_encoder_layers = "encoder_layers", e.num_encoder_heads = "encoder_attention_heads", e.encoder_hidden_size = "d_model";
      break;
    case "speecht5":
      e.num_decoder_layers = "decoder_layers", e.num_decoder_heads = "decoder_attention_heads", e.decoder_hidden_size = "hidden_size", e.num_encoder_layers = "encoder_layers", e.num_encoder_heads = "encoder_attention_heads", e.encoder_hidden_size = "hidden_size";
      break;
    case "trocr":
      e.num_encoder_layers = e.num_decoder_layers = "decoder_layers", e.num_encoder_heads = e.num_decoder_heads = "decoder_attention_heads", e.encoder_hidden_size = e.decoder_hidden_size = "d_model";
      break;
    case "musicgen_decoder":
      e.num_encoder_layers = e.num_decoder_layers = "num_hidden_layers", e.num_encoder_heads = e.num_decoder_heads = "num_attention_heads", e.encoder_hidden_size = e.decoder_hidden_size = "hidden_size";
      break;
    case "moonshine":
      e.num_decoder_layers = "decoder_num_hidden_layers", e.num_decoder_heads = "decoder_num_key_value_heads", e.num_encoder_layers = "encoder_num_hidden_layers", e.num_encoder_heads = "encoder_num_key_value_heads", e.encoder_hidden_size = e.decoder_hidden_size = "hidden_size";
      break;
    case "cohere_asr":
      e.num_decoder_layers = "num_hidden_layers", e.num_decoder_heads = "num_key_value_heads", e.decoder_hidden_size = "hidden_size", e.decoder_dim_kv = "head_dim";
      let { num_hidden_layers: n, num_attention_heads: o, hidden_size: a } = t6.encoder_config;
      s = { num_encoder_layers: n, num_encoder_heads: o, encoder_hidden_size: a, encoder_dim_kv: t6.head_dim };
      break;
    case "vision-encoder-decoder":
      let i = ar2(t6.decoder), l = "num_decoder_layers" in i, c = ye2(t6, ["model_type", "is_encoder_decoder"]);
      return l ? (c.num_decoder_layers = i.num_decoder_layers, c.num_decoder_heads = i.num_decoder_heads, c.decoder_hidden_size = i.decoder_hidden_size, c.num_encoder_layers = i.num_encoder_layers, c.num_encoder_heads = i.num_encoder_heads, c.encoder_hidden_size = i.encoder_hidden_size) : (c.num_layers = i.num_layers, c.num_heads = i.num_heads, c.hidden_size = i.hidden_size), c;
  }
  let r = { ...s, ...ye2(t6, ["model_type", "multi_query", "is_encoder_decoder"]) };
  for (let n in e) r[n] = t6[e[n]];
  return r;
}
function bs2(t6, e) {
  t6 instanceof ir2 || (t6 = new ir2(t6));
  let s = e?.prefix ?? "past_key_values", r = s === "present" ? "present" : "past", n = /* @__PURE__ */ new Set();
  if (["lfm2", "lfm2_moe"].includes(t6.model_type)) {
    let { layer_types: o } = t6;
    for (let a = 0; a < o.length; ++a) if (o[a] === "full_attention") n.add(`${s}.${a}.key`), n.add(`${s}.${a}.value`);
    else if (o[a] === "conv") n.add(`${r}_conv.${a}`);
    else throw new Error(`Unsupported layer type: ${o[a]}`);
    return n;
  } else if (["granitemoehybrid", "falcon_h1", "nemotron_h"].includes(t6.model_type)) {
    let o = t6, a = o.layer_types ?? o.layers_block_type, i = o.num_hidden_layers ?? a?.length;
    for (let l = 0; l < i; ++l) (!a || a[l] === "mamba") && (n.add(`${r}_conv.${l}`), n.add(`${r}_ssm.${l}`)), (!a || a[l] === "attention") && (n.add(`${s}.${l}.key`), n.add(`${s}.${l}.value`));
    return n;
  } else if (["qwen3_next", "qwen3_5_text", "qwen3_5_moe_text", "olmo_hybrid"].includes(t6.model_type)) {
    let { layer_types: o } = t6;
    for (let a = 0; a < o.length; ++a) if (o[a] === "full_attention") n.add(`${s}.${a}.key`), n.add(`${s}.${a}.value`);
    else if (o[a] === "linear_attention") t6.model_type === "olmo_hybrid" ? (n.add(`${r}_conv.${a}.key`), n.add(`${r}_conv.${a}.value`), n.add(`${r}_conv.${a}.query`)) : n.add(`${r}_conv.${a}`), n.add(`${r}_recurrent.${a}`);
    else throw new Error(`Unsupported layer type: ${o[a]}`);
    return n;
  } else if (["gemma4", "gemma4_text"].includes(t6.model_type)) {
    let o = t6.model_type === "gemma4" ? t6.text_config : t6, a = o.num_hidden_layers, i = o.num_kv_shared_layers ?? 0, l = a - i;
    for (let c = 0; c < l; ++c) n.add(`${s}.${c}.key`), n.add(`${s}.${c}.value`);
    return n;
  } else if (t6.model_type === "deepseek_v4") {
    let { layer_types: o, num_hidden_layers: a } = t6;
    for (let i = 0; i < a; ++i) {
      n.add(`${s}.${i}.key`), n.add(`${s}.${i}.value`);
      let l = o[i];
      if (l === "compressed_sparse_attention") n.add(`${r}_compressor.${i}.kv`), n.add(`${r}_compressor.${i}.gate`), n.add(`${r}_indexer.${i}.kv`), n.add(`${r}_indexer.${i}.gate`);
      else if (l === "heavily_compressed_attention") n.add(`${r}_compressor.${i}.kv`), n.add(`${r}_compressor.${i}.gate`);
      else if (l && l !== "sliding_attention") throw new Error(`Unsupported layer type: ${l}`);
    }
    return n;
  } else if (t6.model_type === "zaya") {
    let { num_hidden_layers: o, cca_time1: a } = t6, i = a ?? 1;
    for (let l = 0; l < o; l += i) n.add(`${s}.${l}.key`), n.add(`${s}.${l}.value`), n.add(`${s}.${l}.conv_state`), n.add(`${s}.${l}.shift_state`);
    return n;
  } else if (["lfm2_vl", "qwen3_5", "qwen3_5_moe", "voxtral_realtime"].includes(t6.model_type)) {
    let o;
    return t6.model_type === "voxtral_realtime" && e?.session_name === "audio_encoder" ? o = t6.audio_config : o = t6.text_config, bs2(o, e);
  }
  return $S(t6, { prefix: s });
}
function $S(t6, { prefix: e = "past_key_values" } = {}) {
  let s = /* @__PURE__ */ new Set(), r = t6.normalized_config;
  if (r.is_encoder_decoder && "num_encoder_heads" in r && "num_decoder_heads" in r) for (let n = 0; n < r.num_decoder_layers; ++n) s.add(`${e}.${n}.encoder.key`), s.add(`${e}.${n}.encoder.value`), s.add(`${e}.${n}.decoder.key`), s.add(`${e}.${n}.decoder.value`);
  else if (r.multi_query) for (let n = 0; n < r.num_layers; ++n) s.add(`${e}.${n}.key_value`);
  else for (let n = 0; n < r.num_layers; ++n) s.add(`${e}.${n}.key`), s.add(`${e}.${n}.value`);
  return s;
}
var ir2 = class t4 {
  model_type = null;
  is_encoder_decoder = false;
  max_position_embeddings;
  "transformers.js_config";
  constructor(e) {
    Object.assign(this, e), this.normalized_config = ar2(this);
  }
  static async from_pretrained(e, { progress_callback: s = null, config: r = null, cache_dir: n = null, local_files_only: o = false, revision: a = "main" } = {}) {
    r && !(r instanceof t4) && (r = new t4(r));
    let i = r ?? await LS(e, { progress_callback: s, config: r, cache_dir: n, local_files_only: o, revision: a });
    return new this(i);
  }
};
var at2 = class {
  static async from_pretrained(...e) {
    return ir2.from_pretrained(...e);
  }
};
function yd(t6, e, s) {
  return t6 ? typeof t6 == "object" && t6 !== null ? t6.hasOwnProperty(e) ? +t6[e] : t6.hasOwnProperty(s) ? +t6[s] : 0 : +t6 : 0;
}
function bd(t6, e) {
  let s = [];
  for (let r = 0; r < e; ++r) s.push(`${t6}_data${r === 0 ? "" : "_" + r}`);
  return s;
}
async function Ck(t6, e, s, r) {
  let n = `${e}${r}.onnx`, o = `${s.subfolder ?? ""}/${n}`;
  return await Kr2(t6, o, true, s, H.IS_NODE_ENV);
}
async function Pk(t6, e, s, r, n, o = {}) {
  let a = `${e}${s}.onnx`, i = H.IS_NODE_ENV, l = [], c = yd(n, a, e);
  if (c > 0) {
    if (c > $i) throw new Error(`The number of external data chunks (${c}) exceeds the maximum allowed value (${$i}).`);
    let p = bd(a, c);
    for (let u of p) {
      let _ = `${r.subfolder ?? ""}/${u}`;
      l.push(new Promise(async (d, f) => {
        let m = await Kr2(t6, _, true, r, i);
        d(m instanceof Uint8Array ? { path: u, data: m } : u);
      }));
    }
  } else o.externalData !== void 0 && (l = o.externalData.map(async (p) => {
    if (typeof p.data == "string") {
      let u = await Kr2(t6, p.data, true, r);
      return { ...p, data: u };
    }
    return p;
  }));
  return Promise.all(l);
}
async function RS(t6, e, s, r = false, n = void 0) {
  let o = s.config?.["transformers.js_config"] ?? {}, a = Wi(s.device ?? o.device, e, { warn: (x) => R.info(x) }), i = rk(a), l = o.device_config ?? {};
  l.hasOwnProperty(a) && (o = { ...o, ...l[a] });
  let c = Vi(s.dtype ?? o.dtype, e, a, { configDtype: o.dtype, warn: (x) => R.info(x) });
  if (Gt.hasOwnProperty(c)) {
    if (a === "webgpu" && !H.IS_NODE_ENV && c === Te.fp16 && !await lk()) throw new Error(`The device (${a}) does not support fp16.`);
  } else throw new Error(`Invalid dtype: ${c}. Should be one of: ${Object.keys(Te).join(", ")}`);
  let p = Gt[c], u = { ...s.session_options };
  u.executionProviders ??= i;
  let _ = o.free_dimension_overrides;
  _ ? u.freeDimensionOverrides ??= _ : a.startsWith("webnn") && !u.freeDimensionOverrides && R.warn(`WebNN does not currently support dynamic shapes and requires 'free_dimension_overrides' to be set in config.json, preferably as a field within config["transformers.js_config"]["device_config"]["${a}"]. When 'free_dimension_overrides' is not set, you may experience significant performance degradation.`);
  let d = Ck(t6, e, s, p), f = s.use_external_data_format ?? o.use_external_data_format, m = await Pk(t6, e, p, s, f, u);
  if (m.length > 0 && (!H.IS_NODE_ENV || m.some((x) => typeof x != "string")) && (u.externalData = m), r && a === "webgpu") {
    let x = bs2(s.config, { prefix: "present", session_name: n });
    if (x.size > 0 && !Yr()) {
      let y = {};
      for (let b of x) y[b] = "gpu-buffer";
      u.preferredOutputLocation = y;
    }
  }
  return { buffer_or_path: await d, session_options: u, session_config: { dtype: c, device: a } };
}
async function Nk(t6, e, s, r = void 0) {
  return Object.fromEntries(await Promise.all(Object.keys(e).map(async (n) => {
    let o = r?.[n] ?? false, { buffer_or_path: a, session_options: i, session_config: l } = await RS(t6, e[n], s, o, n), c = await Ui(a, i, l);
    return [n, c];
  })));
}
function Lk(t6) {
  for (let e in t6) Gi(t6[e]) ? t6[e] = new E(t6[e]) : typeof t6[e] == "object" && Lk(t6[e]);
  return t6;
}
async function K(t6, e) {
  let s = FS(t6, e);
  try {
    let r = Object.fromEntries(Object.entries(s).map(([o, a]) => {
      let i = a.ort_tensor;
      return H.IS_NODE_ENV && typeof Float16Array < "u" && i.cpuData instanceof Float16Array && (i.cpuData = new Uint16Array(i.cpuData.buffer)), [o, i];
    })), n = await ji(t6, r);
    return Lk(n);
  } catch (r) {
    let n = Object.fromEntries(Object.entries(s).map(([o, a]) => {
      let i = { type: a.type, dims: a.dims, location: a.location };
      return i.location !== "gpu-buffer" && (i.data = a.data), [o, i];
    }));
    throw R.error(`An error occurred during model execution: "${r}".`), R.error("Inputs given to model:", n), r;
  }
}
function FS(t6, e) {
  let s = /* @__PURE__ */ Object.create(null), r = [];
  for (let a of t6.inputNames) {
    let i = e[a];
    if (!(i instanceof E)) {
      r.push(a);
      continue;
    }
    s[a] = Yr() ? i.clone() : i;
  }
  if (r.length > 0) throw new Error(`An error occurred during model execution: "Missing the following inputs: ${r.join(", ")}.`);
  let n = Object.keys(e).length, o = t6.inputNames.length;
  if (n > o) {
    let a = Object.keys(e).filter((i) => !t6.inputNames.includes(i));
    R.warn(`WARNING: Too many inputs were provided (${n} > ${o}). The following inputs will be ignored: "${a.join(", ")}".`);
  }
  return s;
}
var ae = class {
};
var Ml = class extends ae {
  constructor({ last_hidden_state: e, hidden_states: s = null, attentions: r = null }) {
    super(), this.last_hidden_state = e, this.hidden_states = s, this.attentions = r;
  }
};
var z = class extends ae {
  constructor({ logits: e, ...s }) {
    super(), this.logits = e;
    let r = Object.values(s);
    r.length > 0 && (this.attentions = r);
  }
};
var te = class extends ae {
  constructor({ logits: e }) {
    super(), this.logits = e;
  }
};
var se = class extends ae {
  constructor({ logits: e }) {
    super(), this.logits = e;
  }
};
var ie2 = class extends ae {
  constructor({ start_logits: e, end_logits: s }) {
    super(), this.start_logits = e, this.end_logits = s;
  }
};
var De = class extends ae {
  constructor({ logits: e }) {
    super(), this.logits = e;
  }
};
var Sl = class extends ae {
  constructor({ logits: e, past_key_values: s }) {
    super(), this.logits = e, this.past_key_values = s;
  }
};
var Ol = class extends ae {
  constructor({ logits: e, past_key_values: s, encoder_outputs: r, decoder_attentions: n = null, cross_attentions: o = null }) {
    super(), this.logits = e, this.past_key_values = s, this.encoder_outputs = r, this.decoder_attentions = n, this.cross_attentions = o;
  }
};
var lr2 = class extends ae {
  constructor({ alphas: e }) {
    super(), this.alphas = e;
  }
};
var et = class extends xe {
  _call(e, s) {
    throw Error("`_call` should be implemented in a subclass");
  }
};
var wn = class extends xe {
  _call(e, s) {
    throw Error("`_call` should be implemented in a subclass");
  }
};
var ks2 = class extends xe {
  constructor() {
    super(), this.processors = [];
  }
  push(e) {
    this.processors.push(e);
  }
  extend(e) {
    this.processors.push(...e);
  }
  _call(e, s) {
    let r = s;
    for (let n of this.processors) r = n(e, r);
    return r;
  }
  [Symbol.iterator]() {
    return this.processors.values();
  }
};
var Il = class extends et {
  constructor(e) {
    super(), this.bos_token_id = e;
  }
  _call(e, s) {
    for (let r = 0; r < e.length; ++r) if (e[r].length === 1) {
      let n = s[r].data;
      n.fill(-1 / 0), n[this.bos_token_id] = 0;
    }
    return s;
  }
};
var Tl = class extends et {
  constructor(e, s) {
    super(), this.max_length = e, this.eos_token_id = Array.isArray(s) ? s : [s];
  }
  _call(e, s) {
    for (let r = 0; r < e.length; ++r) if (e[r].length === this.max_length - 1) {
      let n = s[r].data;
      n.fill(-1 / 0);
      for (let o of this.eos_token_id) n[o] = 0;
    }
    return s;
  }
};
var zl = class extends et {
  constructor(e) {
    super(), this.suppress_tokens = e;
  }
  _call(e, s) {
    for (let r = 0; r < e.length; ++r) {
      let n = s[r].data;
      for (let o of this.suppress_tokens) n[o] = -1 / 0;
    }
    return s;
  }
};
var cr2 = class extends et {
  constructor(e, s) {
    super(), this.begin_suppress_tokens = e, this.begin_index = s;
  }
  _call(e, s) {
    for (let r = 0; r < e.length; ++r) if (e[r].length === this.begin_index) {
      let n = s[r].data;
      for (let o of this.begin_suppress_tokens) n[o] = -1 / 0;
    }
    return s;
  }
};
var Cl = class extends et {
  constructor(e, s) {
    super(), this.eos_token_id = Array.isArray(e.eos_token_id) ? e.eos_token_id[0] : e.eos_token_id, this.no_timestamps_token_id = e.no_timestamps_token_id, this.timestamp_begin = this.no_timestamps_token_id + 1, this.begin_index = s.length, s.at(-1) === this.no_timestamps_token_id && (this.begin_index -= 1), this.max_initial_timestamp_index = e.max_initial_timestamp_index;
  }
  _call(e, s) {
    for (let r = 0; r < e.length; ++r) {
      let n = s[r].data;
      if (n[this.no_timestamps_token_id] = -1 / 0, e[r].length === this.begin_index) {
        n.subarray(0, this.timestamp_begin).fill(-1 / 0);
        continue;
      }
      let o = e[r].slice(this.begin_index), a = o.length >= 1 && o[o.length - 1] >= this.timestamp_begin, i = o.length < 2 || o[o.length - 2] >= this.timestamp_begin;
      if (a && (i ? n.subarray(this.timestamp_begin).fill(-1 / 0) : n.subarray(0, this.eos_token_id).fill(-1 / 0)), e[r].length === this.begin_index && this.max_initial_timestamp_index !== null) {
        let u = this.timestamp_begin + this.max_initial_timestamp_index;
        n.subarray(u + 1).fill(-1 / 0);
      }
      let l = $p(n), c = Math.log(l.subarray(this.timestamp_begin).map(Math.exp).reduce((u, _) => u + _)), p = fe(l.subarray(0, this.timestamp_begin))[0];
      c > p && n.subarray(0, this.timestamp_begin).fill(-1 / 0);
    }
    return s;
  }
};
var Pl = class extends et {
  constructor(e) {
    super(), this.no_repeat_ngram_size = e;
  }
  getNgrams(e) {
    let s = e.length, r = [];
    for (let o = 0; o < s + 1 - this.no_repeat_ngram_size; ++o) {
      let a = [];
      for (let i = 0; i < this.no_repeat_ngram_size; ++i) a.push(e[o + i]);
      r.push(a.map(Number));
    }
    let n = /* @__PURE__ */ new Map();
    for (let o of r) {
      let a = o.slice(0, o.length - 1), i = JSON.stringify(a), l = n.get(i) ?? [];
      l.push(o[o.length - 1]), n.set(i, l);
    }
    return n;
  }
  getGeneratedNgrams(e, s) {
    let r = s.slice(s.length + 1 - this.no_repeat_ngram_size, s.length);
    return e.get(JSON.stringify(r.map(Number))) ?? [];
  }
  calcBannedNgramTokens(e) {
    let s = [];
    if (e.length + 1 < this.no_repeat_ngram_size) return s;
    {
      let r = this.getNgrams(e);
      return this.getGeneratedNgrams(r, e);
    }
  }
  _call(e, s) {
    for (let r = 0; r < e.length; ++r) {
      let n = s[r].data, o = this.calcBannedNgramTokens(e[r]);
      for (let a of o) n[a] = -1 / 0;
    }
    return s;
  }
};
var Nl = class extends et {
  constructor(e) {
    super(), this.penalty = e;
  }
  _call(e, s) {
    for (let r = 0; r < e.length; ++r) {
      let n = s[r].data;
      for (let o of new Set(e[r])) {
        let a = Number(o);
        n[a] < 0 ? n[a] *= this.penalty : n[a] /= this.penalty;
      }
    }
    return s;
  }
};
var Ll = class extends et {
  constructor(e, s) {
    super(), this.min_length = e, this.eos_token_id = Array.isArray(s) ? s : [s];
  }
  _call(e, s) {
    for (let r = 0; r < e.length; ++r) if (e[r].length < this.min_length) {
      let n = s[r].data;
      for (let o of this.eos_token_id) n[o] = -1 / 0;
    }
    return s;
  }
};
var $l2 = class extends et {
  constructor(e, s, r) {
    super(), this.prompt_length_to_skip = e, this.min_new_tokens = s, this.eos_token_id = Array.isArray(r) ? r : [r];
  }
  _call(e, s) {
    for (let r = 0; r < e.length; ++r) if (e[r].length - this.prompt_length_to_skip < this.min_new_tokens) {
      let o = s[r].data;
      for (let a of this.eos_token_id) o[a] = -1 / 0;
    }
    return s;
  }
};
var Rl = class extends et {
  constructor(e, s) {
    super(), this.bad_words_ids = e, this.eos_token_id = Array.isArray(s) ? s : [s];
  }
  _call(e, s) {
    for (let r = 0; r < e.length; ++r) {
      let n = s[r].data, o = e[r];
      for (let a of this.bad_words_ids) {
        if (o.length < a.length - 1) continue;
        let i = true;
        for (let l = 1; l <= a.length - 1; ++l) if (a.at(-l - 1) != o.at(-l)) {
          i = false;
          break;
        }
        i && (n[a.at(-1)] = -1 / 0);
      }
    }
    return s;
  }
};
var Fl = class extends et {
  constructor(e) {
    if (super(), e <= 1) throw new Error(`Require guidance scale >1 to use the classifier-free guidance processor, got guidance scale ${e}.`);
    this.guidance_scale = e;
  }
  _call(e, s) {
    if (s.dims[0] !== 2 * e.length) throw new Error(`Logits should have twice the batch size of the input ids, the first half of batches corresponding to the conditional inputs, and the second half of batches corresponding to the unconditional inputs. Got batch size ${s.dims[0]} for the logits and ${e.length} for the input ids.`);
    let r = e.length, n = s.slice([0, r], null), o = s.slice([r, s.dims[0]], null);
    for (let a = 0; a < o.data.length; ++a) o.data[a] += (n.data[a] - o.data[a]) * this.guidance_scale;
    return o;
  }
};
var Dl = class extends wn {
  constructor(e) {
    if (super(), typeof e != "number" || e <= 0) {
      let s = `\`temperature\` (=${e}) must be a strictly positive float, otherwise your next token scores will be invalid.`;
      e === 0 && (s += " If you're looking for greedy decoding strategies, set `do_sample=false`.");
    }
    this.temperature = e;
  }
  _call(e, s) {
    let r = s.data;
    for (let n = 0; n < r.length; ++n) r[n] /= this.temperature;
    return s;
  }
};
var $k = class extends wn {
  constructor(e, { filter_value: s = -1 / 0, min_tokens_to_keep: r = 1 } = {}) {
    if (super(), e < 0 || e > 1) throw new Error(`\`top_p\` must be a float > 0 and < 1, but is ${e}`);
    if (!Number.isInteger(r) || r < 1) throw new Error(`\`min_tokens_to_keep\` must be a positive integer, but is ${r}`);
    this.top_p = e, this.filter_value = s, this.min_tokens_to_keep = r;
  }
};
var Rk = class extends wn {
  constructor(e, { filter_value: s = -1 / 0, min_tokens_to_keep: r = 1 } = {}) {
    if (super(), !Number.isInteger(e) || e < 0) throw new Error(`\`top_k\` must be a positive integer, but is ${e}`);
    this.top_k = Math.max(e, r), this.filter_value = s;
  }
};
var vs2 = class {
  max_length = 20;
  max_new_tokens = null;
  min_length = 0;
  min_new_tokens = null;
  early_stopping = false;
  max_time = null;
  do_sample = false;
  num_beams = 1;
  num_beam_groups = 1;
  penalty_alpha = null;
  use_cache = true;
  temperature = 1;
  top_k = 50;
  top_p = 1;
  typical_p = 1;
  epsilon_cutoff = 0;
  eta_cutoff = 0;
  diversity_penalty = 0;
  repetition_penalty = 1;
  encoder_repetition_penalty = 1;
  length_penalty = 1;
  no_repeat_ngram_size = 0;
  bad_words_ids = null;
  force_words_ids = null;
  renormalize_logits = false;
  constraints = null;
  forced_bos_token_id = null;
  forced_eos_token_id = null;
  remove_invalid_values = false;
  exponential_decay_length_penalty = null;
  suppress_tokens = null;
  streamer = null;
  begin_suppress_tokens = null;
  forced_decoder_ids = null;
  guidance_scale = null;
  num_return_sequences = 1;
  output_attentions = false;
  output_hidden_states = false;
  output_scores = false;
  return_dict_in_generate = false;
  pad_token_id = null;
  bos_token_id = null;
  eos_token_id = null;
  encoder_no_repeat_ngram_size = 0;
  decoder_start_token_id = null;
  generation_kwargs = {};
  constructor(e) {
    Object.assign(this, ye2(e, Object.getOwnPropertyNames(this)));
  }
};
var Xt2 = class extends xe {
  _call(e, s) {
    throw Error("StoppingCriteria needs to be subclassed");
  }
};
var pr2 = class t5 extends xe {
  constructor() {
    super(), this.criteria = [];
  }
  push(e) {
    this.criteria.push(e);
  }
  extend(e) {
    e instanceof t5 ? e = e.criteria : e instanceof Xt2 && (e = [e]), this.criteria.push(...e);
  }
  _call(e, s) {
    let r = new Array(e.length).fill(false);
    for (let n of this.criteria) {
      let o = n(e, s);
      for (let a = 0; a < r.length; ++a) r[a] ||= o[a];
    }
    return r;
  }
  [Symbol.iterator]() {
    return this.criteria.values();
  }
};
var Bl = class extends Xt2 {
  constructor(e, s = null) {
    super(), this.max_length = e, this.max_position_embeddings = s;
  }
  _call(e) {
    return e.map((s) => s.length >= this.max_length);
  }
};
var ql = class extends Xt2 {
  constructor(e) {
    super(), Array.isArray(e) || (e = [e]), this.eos_token_id = e;
  }
  _call(e, s) {
    return e.map((r) => {
      let n = r.at(-1);
      return this.eos_token_id.some((o) => n == o);
    });
  }
};
var Fk = class extends Xt2 {
  constructor() {
    super(), this.interrupted = false;
  }
  interrupt() {
    this.interrupted = true;
  }
  reset() {
    this.interrupted = false;
  }
  _call(e, s) {
    return new Array(e.length).fill(this.interrupted);
  }
};
var Es2 = class extends xe {
  constructor(e) {
    super(), this.generation_config = e;
  }
  async _call(e) {
    return this.sample(e);
  }
  async sample(e) {
    throw Error("sample should be implemented in subclasses.");
  }
  getLogits(e, s) {
    let r = e.dims.at(-1), n = e.data;
    if (s === -1) n = n.slice(-r);
    else {
      let o = s * r;
      n = n.slice(o, o + r);
    }
    return n;
  }
  randomSelect(e) {
    return Cb(e);
  }
  static getSampler(e) {
    if (e.do_sample) return new vd(e);
    if (e.num_beams > 1) return new Ed(e);
    if (e.num_return_sequences > 1) throw Error(`num_return_sequences has to be 1 when doing greedy search, but is ${e.num_return_sequences}.`);
    return new kd(e);
  }
};
var kd = class extends Es2 {
  async sample(e) {
    let s = fe(e.data)[1];
    return [[BigInt(s), 0]];
  }
};
var vd = class extends Es2 {
  async sample(e) {
    let s = e.dims.at(-1);
    this.generation_config.top_k > 0 && (s = Math.min(this.generation_config.top_k, s));
    let [r, n] = await mt(e, s), o = ge(r.data);
    return Array.from({ length: this.generation_config.num_beams }, () => {
      let a = this.randomSelect(o);
      return [n.data[a], Math.log(o[a])];
    });
  }
};
var Ed = class extends Es2 {
  async sample(e) {
    let s = e.dims.at(-1);
    this.generation_config.top_k > 0 && (s = Math.min(this.generation_config.top_k, s));
    let [r, n] = await mt(e, s), o = ge(r.data);
    return Array.from({ length: this.generation_config.num_beams }, (a, i) => [n.data[i], Math.log(o[i])]);
  }
};
var Ad = class {
  constructor(e) {
    if (e) for (let s in e) {
      if (s in this) throw new TypeError(`Key "${s}" conflicts with an existing property on DynamicCache`);
      let r = e[s];
      if (!(r instanceof E)) throw new TypeError(`Expected a Tensor for key "${s}", got ${typeof r}`);
      this[s] = r;
    }
  }
  get_seq_length() {
    let e = this;
    if (Object.keys(e).length === 0) return 0;
    for (let s in e) if (s.startsWith("past_key_values.")) return e[s].dims.at(-2);
    throw new Error("Unable to determine sequence length from the cache.");
  }
  update(e) {
    for (let s in e) {
      let r = this[s], n = e[s];
      r && r !== n && r.location === "gpu-buffer" && r.dispose(), this[s] = n;
    }
  }
  async dispose() {
    let e = [];
    for (let s of Object.values(this)) s.location === "gpu-buffer" && e.push(s.dispose());
    await Promise.all(e);
  }
};
var ur2 = Ad;
var P = { EncoderOnly: 0, EncoderDecoder: 1, Seq2Seq: 2, Vision2Seq: 3, DecoderOnly: 4, DecoderOnlyWithoutHead: 5, MaskGeneration: 6, ImageTextToText: 7, Musicgen: 8, MultiModality: 9, Phi3V: 10, AudioTextToText: 11, AutoEncoder: 12, ImageAudioTextToText: 13, Supertonic: 14, Chatterbox: 15, VoxtralRealtime: 16, MultimodalEncoder: 17 };
var kt = { [P.DecoderOnly]: { sessions: (t6, e) => ({ model: e.model_file_name ?? "model" }), cache_sessions: { model: true }, optional_configs: { generation_config: "generation_config.json" } }, [P.DecoderOnlyWithoutHead]: { sessions: (t6, e) => ({ model: e.model_file_name ?? "model" }) }, [P.Seq2Seq]: { sessions: () => ({ model: "encoder_model", decoder_model_merged: "decoder_model_merged" }), cache_sessions: { decoder_model_merged: true }, optional_configs: { generation_config: "generation_config.json" } }, [P.Vision2Seq]: { sessions: () => ({ model: "encoder_model", decoder_model_merged: "decoder_model_merged" }), cache_sessions: { decoder_model_merged: true }, optional_configs: { generation_config: "generation_config.json" } }, [P.Musicgen]: { sessions: () => ({ model: "text_encoder", decoder_model_merged: "decoder_model_merged", encodec_decode: "encodec_decode" }), cache_sessions: { decoder_model_merged: true }, optional_configs: { generation_config: "generation_config.json" } }, [P.EncoderDecoder]: { sessions: () => ({ model: "encoder_model", decoder_model_merged: "decoder_model_merged" }), cache_sessions: { decoder_model_merged: true } }, [P.MaskGeneration]: { sessions: () => ({ model: "vision_encoder", prompt_encoder_mask_decoder: "prompt_encoder_mask_decoder" }) }, [P.ImageTextToText]: { text_only_sessions: { embed_tokens: "embed_tokens", decoder_model_merged: "decoder_model_merged" }, sessions: (t6, e, s) => {
  let r = { ...kt[P.ImageTextToText].text_only_sessions };
  return s || (r.vision_encoder = "vision_encoder"), t6.is_encoder_decoder && (r.model = "encoder_model"), r;
}, cache_sessions: { decoder_model_merged: true }, optional_configs: { generation_config: "generation_config.json" } }, [P.AudioTextToText]: { text_only_sessions: { embed_tokens: "embed_tokens", decoder_model_merged: "decoder_model_merged" }, sessions: (t6, e, s) => {
  let r = { ...kt[P.AudioTextToText].text_only_sessions };
  return s || (r.audio_encoder = "audio_encoder"), r;
}, cache_sessions: { decoder_model_merged: true }, optional_configs: { generation_config: "generation_config.json" } }, [P.ImageAudioTextToText]: { text_only_sessions: { embed_tokens: "embed_tokens", decoder_model_merged: "decoder_model_merged" }, sessions: (t6, e, s) => {
  let r = { ...kt[P.ImageAudioTextToText].text_only_sessions };
  return s || (r.audio_encoder = "audio_encoder", r.vision_encoder = "vision_encoder"), r;
}, cache_sessions: { decoder_model_merged: true }, optional_configs: { generation_config: "generation_config.json" } }, [P.Phi3V]: { sessions: () => ({ prepare_inputs_embeds: "prepare_inputs_embeds", model: "model", vision_encoder: "vision_encoder" }), cache_sessions: { model: true }, optional_configs: { generation_config: "generation_config.json" } }, [P.MultiModality]: { sessions: () => ({ prepare_inputs_embeds: "prepare_inputs_embeds", model: "language_model", lm_head: "lm_head", gen_head: "gen_head", gen_img_embeds: "gen_img_embeds", image_decode: "image_decode" }), cache_sessions: { model: true }, optional_configs: { generation_config: "generation_config.json" } }, [P.AutoEncoder]: { sessions: () => ({ encoder_model: "encoder_model", decoder_model: "decoder_model" }) }, [P.Supertonic]: { sessions: () => ({ text_encoder: "text_encoder", latent_denoiser: "latent_denoiser", voice_decoder: "voice_decoder" }) }, [P.Chatterbox]: { sessions: () => ({ embed_tokens: "embed_tokens", speech_encoder: "speech_encoder", model: "language_model", conditional_decoder: "conditional_decoder" }), cache_sessions: { model: true }, optional_configs: { generation_config: "generation_config.json" } }, [P.VoxtralRealtime]: { text_only_sessions: { embed_tokens: "embed_tokens", decoder_model_merged: "decoder_model_merged" }, sessions: (t6, e, s) => {
  let r = { ...kt[P.VoxtralRealtime].text_only_sessions };
  return s || (r.audio_encoder = "audio_encoder"), r;
}, cache_sessions: { decoder_model_merged: true, audio_encoder: true }, optional_configs: { generation_config: "generation_config.json" } }, [P.MultimodalEncoder]: { sessions: (t6, e) => ({ model: e.model_file_name ?? "model", ...t6.vision_config && { vision_encoder: "vision_encoder" }, ...t6.audio_config && { audio_encoder: "audio_encoder" } }) }, default: { sessions: (t6, e) => ({ model: e.model_file_name ?? "model" }) } };
function Dk(t6) {
  return kt[t6]?.text_only_sessions ?? null;
}
function Ul(t6, e, s = {}) {
  let r = kt[t6] ?? kt.default;
  return { sessions: r.sessions(e, s, s.textOnly ?? false), cache_sessions: r.cache_sessions, optional_configs: r.optional_configs };
}
function _r(t6, { warn: e = true } = {}) {
  let s = t6.architectures || [];
  for (let r of s) {
    let n = ht.get(r);
    if (n !== void 0) return n;
  }
  if (t6.model_type) {
    let r = ht.get(t6.model_type);
    if (r !== void 0) return r;
    for (let n of Object.values(As2)) if (n.has(t6.model_type)) {
      let o = ht.get(n.get(t6.model_type));
      if (o !== void 0) return o;
    }
  }
  if (e) {
    let r = s.length > 0 ? s.join(", ") : "(none)";
    R.warn(`[resolve_model_type] Architecture(s) not found in MODEL_TYPE_MAPPING: [${r}] for model type '${t6.model_type}'. Falling back to EncoderOnly (single model.onnx file). If you encounter issues, please report at: ${Vt}`);
  }
  return P.EncoderOnly;
}
function yn(t6, { config: e = null, cache_dir: s = null, local_files_only: r = false, revision: n = "main" } = {}) {
  if (e !== null) return at2.from_pretrained(t6, { config: e, cache_dir: s, local_files_only: r, revision: n });
  let o = Hs2(t6, { cache_dir: s, local_files_only: r, revision: n });
  return Di(o, () => at2.from_pretrained(t6, { config: e, cache_dir: s, local_files_only: r, revision: n }));
}
async function dr2(t6, { config: e = null, dtype: s = null, device: r = null, model_file_name: n = null } = {}) {
  e = await yn(t6, { config: e });
  let o = ["config.json"], a = e["transformers.js_config"] ?? {}, i = a.use_external_data_format, l = "onnx", c = r ?? a.device, p = s ?? a.dtype, u = _r(e), _ = (m, g = null) => {
    g = g ?? m;
    let w = Wi(c, m), x = Vi(p, m, w), y = Gt[x] ?? "", b = `${g}${y}.onnx`, v = l ? `${l}/${b}` : b;
    o.push(v);
    let k = yd(i, b, m);
    for (let O of bd(b, k)) {
      let T = l ? `${l}/${O}` : O;
      o.push(T);
    }
  }, { sessions: d, optional_configs: f } = Ul(u, e, { model_file_name: n });
  for (let [m, g] of Object.entries(d)) _(m, g);
  if (f) for (let m of Object.values(f)) o.push(m);
  return o;
}
var As2 = null;
function Uk(t6) {
  As2 = t6;
}
function Md(t6) {
  if (t6 instanceof E) return t6;
  if (t6.length === 0) throw Error("items must be non-empty");
  if (Array.isArray(t6[0])) {
    if (t6.some((e) => e.length !== t6[0].length)) throw Error("Unable to create tensor, you should probably activate truncation and/or padding with 'padding=True' and/or 'truncation=True' to have batched tensors with the same length.");
    return new E("int64", BigInt64Array.from(t6.flat().map((e) => BigInt(e))), [t6.length, t6[0].length]);
  } else return new E("int64", BigInt64Array.from(t6.map((e) => BigInt(e))), [1, t6.length]);
}
function Sd(t6) {
  return new E("bool", [t6], [1]);
}
var Bk = { [P.DecoderOnly]: { can_generate: true, forward: Je, prepare_inputs: Qt2 }, [P.DecoderOnlyWithoutHead]: { can_generate: false, forward: Je, prepare_inputs: Qt2 }, [P.Seq2Seq]: { can_generate: true, forward: jl, prepare_inputs: bn2 }, [P.Vision2Seq]: { can_generate: true, forward: jl, prepare_inputs: bn2 }, [P.Musicgen]: { can_generate: true, forward: jl }, [P.EncoderDecoder]: { can_generate: false, forward: jl }, [P.ImageTextToText]: { can_generate: true, forward: US, prepare_inputs: Gl }, [P.AudioTextToText]: { can_generate: true, forward: qS, prepare_inputs: Gl }, [P.ImageAudioTextToText]: { can_generate: true, prepare_inputs: Gl }, [P.Phi3V]: { can_generate: true, prepare_inputs: Gl }, [P.MultiModality]: { can_generate: true }, [P.AutoEncoder]: { can_generate: false, forward: DS }, [P.Chatterbox]: { can_generate: true, forward: it2 }, [P.VoxtralRealtime]: { can_generate: true, prepare_inputs: Qt2 }, default: { can_generate: false, forward: it2 } };
function qk(t6, e) {
  let s = ht.get(t6), r = false, n = e?.architectures?.[0];
  if (n && n !== t6 && t6?.endsWith("ForCausalLM") && n.endsWith("ForConditionalGeneration")) {
    let i = ht.get(n);
    i !== void 0 && (s = i, r = true);
  }
  let o = Bk[s] ?? Bk.default, a = kt[s] ?? kt.default;
  return { typeConfig: { ...o, ...a }, textOnly: r, modelType: s };
}
var ht = /* @__PURE__ */ new Map();
var Vl = /* @__PURE__ */ new Map();
var Ms2 = /* @__PURE__ */ new Map();
var h = class extends xe {
  main_input_name = "input_ids";
  forward_params = ["input_ids", "attention_mask"];
  _return_dict_in_generate_keys = null;
  constructor(e, s, r) {
    super(), this.config = e, this.sessions = s, this.configs = r;
    let n = Ms2.get(this.constructor), { typeConfig: o } = qk(n, e);
    this.can_generate = o.can_generate, this._forward = o.forward, this._prepare_inputs_for_generation = o.prepare_inputs, this.can_generate && this.forward_params.push("past_key_values"), this.custom_config = this.config["transformers.js_config"] ?? {};
  }
  async dispose() {
    let e = [];
    for (let s of Object.values(this.sessions)) e.push(s.release?.());
    return await Promise.all(e);
  }
  static async from_pretrained(e, { progress_callback: s = null, config: r = null, cache_dir: n = null, local_files_only: o = false, revision: a = "main", model_file_name: i = null, subfolder: l = "onnx", device: c = null, dtype: p = null, use_external_data_format: u = null, session_options: _ = {} } = {}) {
    let d = { progress_callback: s, config: r, cache_dir: n, local_files_only: o, revision: a, model_file_name: i, subfolder: l, device: c, dtype: p, use_external_data_format: u, session_options: _ }, f = Ms2.get(this);
    r = d.config = await at2.from_pretrained(e, d);
    let { typeConfig: m, textOnly: g, modelType: w } = qk(f, r);
    if (w === void 0) {
      let v = f ?? r?.model_type;
      v !== "custom" && R.warn(`Model type for '${v}' not found, assuming encoder-only architecture. Please report this at ${Vt}.`);
    }
    if (s && !(s instanceof At2)) {
      let v = {};
      try {
        let k = await dr2(e, { config: r, dtype: p, device: c, model_file_name: i });
        (await Promise.all(k.map((T) => Ye(e, T, d)))).forEach((T, $) => {
          if (T.exists) {
            let C = k[$] === "config.json";
            v[k[$]] = { loaded: C ? T.size ?? 0 : 0, total: T.size ?? 0 };
          }
        });
      } catch (k) {
        R.warn(`Unable to fetch model file metadata for total progress tracking: ${k}`);
      }
      Object.keys(v).length > 0 && (d.progress_callback = new At2(s, v));
    }
    let x = m.sessions(r, d, g), y = [Nk(e, x, d, m.cache_sessions)];
    m.optional_configs && y.push(GS(e, m.optional_configs, d));
    let b = await Promise.all(y);
    return new this(r, ...b);
  }
  async _call(e) {
    return await this.forward(e);
  }
  async forward(e) {
    return await this._forward(this, e);
  }
  get generation_config() {
    return this.configs?.generation_config ?? null;
  }
  _get_logits_processor(e, s, r = null) {
    let n = new ks2();
    if (e.repetition_penalty !== null && e.repetition_penalty !== 1 && n.push(new Nl(e.repetition_penalty)), e.no_repeat_ngram_size !== null && e.no_repeat_ngram_size > 0 && n.push(new Pl(e.no_repeat_ngram_size)), e.bad_words_ids !== null && n.push(new Rl(e.bad_words_ids, e.eos_token_id)), e.min_length !== null && e.eos_token_id !== null && e.min_length > 0 && n.push(new Ll(e.min_length, e.eos_token_id)), e.min_new_tokens !== null && e.eos_token_id !== null && e.min_new_tokens > 0 && n.push(new $l2(s, e.min_new_tokens, e.eos_token_id)), e.forced_bos_token_id !== null && n.push(new Il(e.forced_bos_token_id)), e.forced_eos_token_id !== null && n.push(new Tl(e.max_length, e.forced_eos_token_id)), e.suppress_tokens !== null && n.push(new zl(e.suppress_tokens)), e.begin_suppress_tokens !== null) {
      let o = s > 1 || e.forced_bos_token_id === null ? s : s + 1;
      n.push(new cr2(e.begin_suppress_tokens, o));
    }
    return e.guidance_scale !== null && e.guidance_scale > 1 && n.push(new Fl(e.guidance_scale)), e.temperature === 0 && e.do_sample && (R.warn("`do_sample` changed to false because `temperature: 0` implies greedy sampling (always selecting the most likely token), which is incompatible with `do_sample: true`."), e.do_sample = false), e.do_sample && e.temperature !== null && e.temperature !== 1 && n.push(new Dl(e.temperature)), r !== null && n.extend(r), n;
  }
  _prepare_generation_config(e, s, r = vs2) {
    let n = { ...this.config };
    for (let a of ["decoder", "generator", "text_config"]) a in n && Object.assign(n, n[a]);
    let o = new r(n);
    return Object.assign(o, this.generation_config ?? {}), e && Object.assign(o, e), s && Object.assign(o, ye2(s, Object.getOwnPropertyNames(o))), o;
  }
  _get_stopping_criteria(e, s = null) {
    let r = new pr2();
    return e.max_length !== null && r.push(new Bl(e.max_length, this.config.max_position_embeddings ?? null)), e.eos_token_id !== null && r.push(new ql(e.eos_token_id)), s && r.extend(s), r;
  }
  _validate_model_class() {
    if (!this.can_generate) {
      let e = [As2.MODEL_FOR_CAUSAL_LM_MAPPING_NAMES, As2.MODEL_FOR_VISION_2_SEQ_MAPPING_NAMES, As2.MODEL_FOR_SEQ_TO_SEQ_CAUSAL_LM_MAPPING_NAMES, As2.MODEL_FOR_SPEECH_SEQ_2_SEQ_MAPPING_NAMES].filter(Boolean), s = Ms2.get(this.constructor), r = /* @__PURE__ */ new Set(), n = this.config.model_type;
      for (let a of e) {
        let i = a?.get(n);
        i && r.add(i);
      }
      let o = `The current model class (${s}) is not compatible with \`.generate()\`, as it doesn't have a language model head.`;
      throw r.size > 0 && (o += ` Please use the following class instead: ${[...r].join(", ")}`), Error(o);
    }
  }
  prepare_inputs_for_generation(...e) {
    if (!this._prepare_inputs_for_generation) throw new Error("prepare_inputs_for_generation is not implemented for this model.");
    return this._prepare_inputs_for_generation(this, ...e);
  }
  _update_model_kwargs_for_generation({ generated_input_ids: e, outputs: s, model_inputs: r, is_encoder_decoder: n }) {
    return r.past_key_values = Wl(s, r.past_key_values), r.input_ids = new E("int64", e.flat(), [e.length, 1]), n ? "decoder_attention_mask" in r && (r.decoder_attention_mask = ne([r.decoder_attention_mask, Oe([r.decoder_attention_mask.dims[0], 1])], 1)) : r.attention_mask = ne([r.attention_mask, Oe([r.attention_mask.dims[0], 1])], 1), r.position_ids = null, r;
  }
  _prepare_model_inputs({ inputs: e, bos_token_id: s, model_kwargs: r }) {
    let n = ye2(r, this.forward_params), o = this.main_input_name;
    if (o in n) {
      if (e) throw new Error("`inputs`: {inputs}` were passed alongside {input_name} which is not allowed. Make sure to either pass {inputs} or {input_name}=...");
    } else n[o] = e;
    return { inputs_tensor: n[o], model_inputs: n, model_input_name: o };
  }
  async _prepare_encoder_decoder_kwargs_for_generation({ inputs_tensor: e, model_inputs: s, model_input_name: r, generation_config: n }) {
    if (this.sessions.model.inputNames.includes("inputs_embeds") && !s.inputs_embeds && "_prepare_inputs_embeds" in this) {
      let { input_ids: a, pixel_values: i, attention_mask: l, ...c } = s, p = await this._prepare_inputs_embeds(s);
      s = { ...c, ...ye2(p, ["inputs_embeds", "attention_mask"]) };
    }
    let { last_hidden_state: o } = await it2(this, s);
    if (n.guidance_scale !== null && n.guidance_scale > 1) o = ne([o, Zr2(o, 0)], 0), "attention_mask" in s && (s.attention_mask = ne([s.attention_mask, en2(s.attention_mask)], 0));
    else if (s.decoder_input_ids) {
      let a = Md(s.decoder_input_ids).dims[0];
      if (a !== o.dims[0]) {
        if (o.dims[0] !== 1) throw new Error(`The encoder outputs have a different batch size (${o.dims[0]}) than the decoder inputs (${a}).`);
        o = ne(Array.from({ length: a }, () => o), 0);
      }
    }
    return s.encoder_outputs = o, s;
  }
  _prepare_decoder_input_ids_for_generation({ batch_size: e, model_input_name: s, model_kwargs: r, decoder_start_token_id: n, bos_token_id: o, generation_config: a }) {
    let { decoder_input_ids: i, ...l } = r;
    if (!(i instanceof E)) {
      if (i) Array.isArray(i[0]) || (i = Array.from({ length: e }, () => i));
      else if (n ??= o, this.config.model_type === "musicgen") i = Array.from({ length: e * this.config.decoder.num_codebooks }, () => [n]);
      else if (Array.isArray(n)) {
        if (n.length !== e) throw new Error(`\`decoder_start_token_id\` expected to have length ${e} but got ${n.length}`);
        i = n;
      } else i = Array.from({ length: e }, () => [n]);
      i = Md(i);
    }
    return l.decoder_attention_mask = Qs2(i), { input_ids: i, model_inputs: l };
  }
  async generate({ inputs: e = null, generation_config: s = null, logits_processor: r = null, stopping_criteria: n = null, streamer: o = null, ...a }) {
    this._validate_model_class(), s = this._prepare_generation_config(s, a);
    let { inputs_tensor: i, model_inputs: l, model_input_name: c } = this._prepare_model_inputs({ inputs: e, model_kwargs: a }), p = this.config.is_encoder_decoder;
    p && ("encoder_outputs" in l || (l = await this._prepare_encoder_decoder_kwargs_for_generation({ inputs_tensor: i, model_inputs: l, model_input_name: c, generation_config: s })));
    let u;
    p ? { input_ids: u, model_inputs: l } = this._prepare_decoder_input_ids_for_generation({ batch_size: l[c].dims.at(0), model_input_name: c, model_kwargs: l, decoder_start_token_id: s.decoder_start_token_id, bos_token_id: s.bos_token_id, generation_config: s }) : u = l[c];
    let _ = u.dims.at(-1);
    s.max_new_tokens !== null && (s.max_length = _ + s.max_new_tokens);
    let d = this._get_logits_processor(s, _, r), f = this._get_stopping_criteria(s, n), m = l[c].dims.at(0), g = Es2.getSampler(s), w = new Array(m).fill(0), x = u.tolist();
    o && o.put(x);
    let y, b = {}, v = {};
    for (; ; ) {
      if (l = this.prepare_inputs_for_generation(x, l, s), y = await this.forward(l), s.return_dict_in_generate) if (s.output_attentions) {
        let B = BS(y);
        for (let q in B) q in b || (b[q] = []), b[q].push(B[q]);
      } else this._return_dict_in_generate_keys && Object.assign(v, ye2(y, this._return_dict_in_generate_keys));
      let C = y.logits.slice(null, -1, null).to("float32"), D = d(x, C), W = [];
      for (let B = 0; B < D.dims.at(0); ++B) {
        let q = D[B], Z = await g(q);
        for (let [j2, ue] of Z) {
          let _e = BigInt(j2);
          w[B] += ue, x[B].push(_e), W.push([_e]);
          break;
        }
      }
      if (o && o.put(W), f(x).every((B) => B)) break;
      l = this._update_model_kwargs_for_generation({ generated_input_ids: W, outputs: y, model_inputs: l, is_encoder_decoder: p });
    }
    o && o.end();
    let k = new E("int64", x.flat(), [x.length, x[0].length]), O = Wl(y, l.past_key_values), T = new Set(Object.values(O));
    for (let C of Object.values(y)) C.location === "gpu-buffer" && !T.has(C) && C.dispose();
    return "past_key_values" in a || s.return_dict_in_generate || await O.dispose(), s.return_dict_in_generate ? { sequences: k, past_key_values: O, ...b, ...v } : k;
  }
  async _encode_input(e, s, r) {
    if (!Object.hasOwn(this.sessions, e)) throw new Error(`Model does not have a ${e} session.`);
    let n = this.sessions[e];
    return (await K(n, ye2(s, n.inputNames)))[r];
  }
  async encode_image(e) {
    return this._encode_input("vision_encoder", e, "image_features");
  }
  async encode_text(e) {
    return this._encode_input("embed_tokens", e, "inputs_embeds");
  }
  async encode_audio(e) {
    return this._encode_input("audio_encoder", e, "audio_features");
  }
};
async function jl(t6, e) {
  let { encoder_outputs: s, input_ids: r, decoder_input_ids: n, decoder_attention_mask: o, ...a } = e;
  if (!s) {
    let i = ye2(e, t6.sessions.model.inputNames);
    s = (await it2(t6, i)).last_hidden_state;
  }
  return a.input_ids = n, a.encoder_hidden_states = s, t6.sessions.decoder_model_merged.inputNames.includes("encoder_attention_mask") && (a.encoder_attention_mask = e.attention_mask), o && !a.attention_mask && (a.attention_mask = o), await Je(t6, a, true);
}
async function it2(t6, e) {
  let s = t6.sessions.model, r = ye2(e, s.inputNames);
  if (s.inputNames.includes("inputs_embeds") && !r.inputs_embeds) {
    if (!e.input_ids) throw new Error("Both `input_ids` and `inputs_embeds` are missing in the model inputs.");
    r.inputs_embeds = await t6.encode_text({ input_ids: e.input_ids });
  }
  if (s.inputNames.includes("token_type_ids") && !r.token_type_ids) {
    if (!r.input_ids) throw new Error("Both `input_ids` and `token_type_ids` are missing in the model inputs.");
    r.token_type_ids = en2(r.input_ids);
  }
  if (s.inputNames.includes("pixel_mask") && !r.pixel_mask) {
    if (!r.pixel_values) throw new Error("Both `pixel_values` and `pixel_mask` are missing in the model inputs.");
    let n = r.pixel_values.dims;
    r.pixel_mask = Oe([n[0], n[2], n[3]]);
  }
  return await K(s, r);
}
async function DS(t6, e) {
  let s = await t6.encode(e);
  return await t6.decode(s);
}
function Wl(t6, e) {
  let s = /* @__PURE__ */ Object.create(null);
  for (let r in t6) if (r.startsWith("present")) {
    let n = r.replace("present_ssm", "past_ssm").replace("present_conv", "past_conv").replace("present_recurrent", "past_recurrent").replace("present_compressor", "past_compressor").replace("present_indexer", "past_indexer").replace("present", "past_key_values");
    r.includes("encoder") && e ? s[n] = e[n] : s[n] = t6[r];
  }
  return e ? (e.update(s), e) : new ur2(s);
}
function BS(t6) {
  let e = {};
  for (let s of ["cross_attentions", "encoder_attentions", "decoder_attentions"]) for (let r in t6) r.startsWith(s) && (s in e || (e[s] = []), e[s].push(t6[r]));
  return e;
}
function Od(t6, e) {
  return t6.map((s) => typeof s == "number" ? s : e[s] ?? 0);
}
function kn(t6, e, s) {
  if (s && Object.keys(s).length > 0) return Object.assign(e, s), s;
  let r = t6.sessions.decoder_model_merged ?? t6.sessions.model, n = (e[t6.main_input_name] ?? e.attention_mask)?.dims?.[0] ?? 1, o = bs2(t6.config), a = t6.config?.normalized_config?.num_heads, i = { batch_size: n };
  typeof a == "number" && (i["batch_size x num_heads"] = n * a);
  let l = /* @__PURE__ */ Object.create(null);
  for (let c of r.inputMetadata) {
    if (!o.has(c.name)) continue;
    let p = Od(c.shape, i), u = p.reduce((f, m) => f * m, 1), _ = Wt[c.type], d = new E(c.type, new _(u), p);
    e[c.name] = d, l[c.name] = d;
  }
  return s ? (s.update(l), s) : new ur2(l);
}
function Ss2(t6, e, s) {
  if (e.num_logits_to_keep) return;
  (t6.sessions.decoder_model_merged ?? t6.sessions.model)?.inputNames.includes("num_logits_to_keep") && (e.num_logits_to_keep = new E("int64", [s], []));
}
async function Je(t6, e, s = false) {
  let r = t6.sessions[s ? "decoder_model_merged" : "model"], { past_key_values: n, ...o } = e;
  if (r.inputNames.includes("use_cache_branch") && (o.use_cache_branch = Sd(n != null && Object.keys(n).length > 0)), r.inputNames.includes("position_ids") && o.attention_mask && !o.position_ids) {
    let i = ["paligemma", "gemma3_text", "gemma3"].includes(t6.config.model_type) ? 1 : 0;
    o.position_ids = jS(o, n, i);
  }
  Ss2(t6, o, 0n), kn(t6, o, n);
  let a = ye2(o, r.inputNames);
  return await K(r, a);
}
async function jk(t6, { encode_function: e, merge_function: s, modality_input_names: r, modality_output_name: n, input_ids: o = null, attention_mask: a = null, position_ids: i = null, inputs_embeds: l = null, past_key_values: c = null, generation_config: p = null, logits_processor: u = null, num_logits_to_keep: _ = null, ...d }) {
  if (!l) {
    l = await t6.encode_text({ input_ids: o, ...d });
    let m = ye2(d, r);
    if (Object.keys(m).length > 0) {
      if (o.dims[1] !== 1) {
        let g = await e({ ...m, ...d });
        ({ inputs_embeds: l, attention_mask: a } = s({ [n]: g, inputs_embeds: l, input_ids: o, attention_mask: a }));
      } else if (c && o.dims[1] === 1) {
        let g = o.dims[1], w = c.get_seq_length();
        a = ne([Oe([o.dims[0], w]), a.slice(null, [a.dims[1] - g, a.dims[1]])], 1);
      }
    }
  }
  if (!i && ["qwen2_vl", "qwen2_vl_text", "qwen2_5_vl", "qwen2_5_vl_text", "qwen3_vl", "qwen3_vl_text", "qwen3_vl_moe", "qwen3_vl_moe_text", "qwen3_5", "qwen3_5_text", "qwen3_5_moe", "qwen3_5_moe_text", "glm_ocr", "glm_ocr_text"].includes(t6.config.model_type)) {
    let { image_grid_thw: m, video_grid_thw: g } = d;
    [i] = t6.get_rope_index(o, m, g, a);
  }
  return await Je(t6, { inputs_embeds: l, past_key_values: c, attention_mask: a, position_ids: i, generation_config: p, logits_processor: u, num_logits_to_keep: _ }, true);
}
async function qS(t6, e) {
  return await jk(t6, { ...e, modality_input_names: ["audio_values", "input_features"], modality_output_name: "audio_features", encode_function: t6.encode_audio.bind(t6), merge_function: t6._merge_input_ids_with_audio_features.bind(t6) });
}
async function US(t6, e) {
  return await jk(t6, { ...e, modality_input_names: ["pixel_values"], modality_output_name: "image_features", encode_function: t6.encode_image.bind(t6), merge_function: t6._merge_input_ids_with_image_features.bind(t6) });
}
function Id(t6, e = 0) {
  let [s, r] = t6.dims, n = t6.data, o = new BigInt64Array(n.length);
  for (let a = 0; a < s; ++a) {
    let i = a * r, l = BigInt(e);
    for (let c = 0; c < r; ++c) {
      let p = i + c;
      n[p] === 0n ? o[p] = BigInt(1) : (o[p] = l, l += n[p]);
    }
  }
  return { data: o, dims: t6.dims };
}
function jS(t6, e = null, s = 0) {
  let { input_ids: r, inputs_embeds: n, attention_mask: o } = t6, { data: a, dims: i } = Id(o, s), l = new E("int64", a, i);
  if (e) {
    let c = -(r ?? n).dims.at(1);
    l = l.slice(null, [c, null]);
  }
  return l;
}
function Qt2(t6, e, s, r) {
  let n = s.past_key_values ? s.past_key_values.get_seq_length() : 0;
  if (Ss2(t6, s, 1n), !s.attention_mask) {
    let o;
    for (let a of ["input_ids", "inputs_embeds", "position_ids"]) if (s[a]) {
      o = s[a].dims;
      break;
    }
    if (!o) throw new Error("attention_mask is not provided, and unable to infer its shape from model inputs.");
    s.attention_mask = Oe([o[0], n + o[1]]);
  }
  if (s.past_key_values) {
    let { input_ids: o, attention_mask: a } = s;
    a && a.dims[1] > o.dims[1] || n < o.dims[1] && (s.input_ids = o.slice(null, [n, null]));
  }
  return s;
}
function bn2(t6, e, s, r) {
  return s.past_key_values && (e = e.map((n) => [n.at(-1)])), Ss2(t6, s, 1n), { ...s, decoder_input_ids: Md(e) };
}
function Gl(t6, ...e) {
  return t6.config.is_encoder_decoder ? bn2(t6, ...e) : Qt2(t6, ...e);
}
function Gk({ modality_token_id: t6, inputs_embeds: e, modality_features: s, input_ids: r, attention_mask: n }) {
  let o = r.tolist().map((c) => c.reduce((p, u, _) => (u == t6 && p.push(_), p), [])), a = o.reduce((c, p) => c + p.length, 0), i = s.dims[0];
  if (a !== i) throw new Error(`Number of tokens and features do not match: tokens: ${a}, features ${i}`);
  let l = 0;
  for (let c = 0; c < o.length; ++c) {
    let p = o[c], u = e[c];
    for (let _ = 0; _ < p.length; ++_) u[p[_]].data.set(s[l++].data);
  }
  return { inputs_embeds: e, attention_mask: n };
}
function fr2({ image_token_id: t6, inputs_embeds: e, image_features: s, input_ids: r, attention_mask: n }) {
  return Gk({ modality_token_id: t6, inputs_embeds: e, modality_features: s, input_ids: r, attention_mask: n });
}
function Hl({ audio_token_id: t6, inputs_embeds: e, audio_features: s, input_ids: r, attention_mask: n }) {
  return Gk({ modality_token_id: t6, inputs_embeds: e, modality_features: s, input_ids: r, attention_mask: n });
}
async function GS(t6, e, s) {
  return Object.fromEntries(await Promise.all(Object.keys(e).map(async (r) => {
    let n = await ze2(t6, e[r], false, s);
    return [r, n];
  })));
}
var Va2 = {};
qr(Va2, { ASTForAudioClassification: () => qd, ASTModel: () => Bd, ASTPreTrainedModel: () => Mn, AfmoeForCausalLM: () => Rd, AfmoeModel: () => $d, AfmoePreTrainedModel: () => En, AlbertForMaskedLM: () => Pd, AlbertForQuestionAnswering: () => Cd, AlbertForSequenceClassification: () => zd, AlbertModel: () => Td, AlbertPreTrainedModel: () => Os2, ApertusForCausalLM: () => Ld, ApertusModel: () => Nd, ApertusPreTrainedModel: () => vn, ArceeForCausalLM: () => Dd, ArceeModel: () => Fd, ArceePreTrainedModel: () => An, BartForConditionalGeneration: () => jd, BartForSequenceClassification: () => Gd, BartModel: () => Ud, BartPretrainedModel: () => mr2, BaseModelOutput: () => Ml, BeitForImageClassification: () => Vd, BeitModel: () => Wd, BeitPreTrainedModel: () => Sn, BertForMaskedLM: () => Kd, BertForQuestionAnswering: () => Yd, BertForSequenceClassification: () => Xd, BertForTokenClassification: () => Qd, BertModel: () => Hd, BertPreTrainedModel: () => Yt2, BlenderbotForConditionalGeneration: () => Zd, BlenderbotModel: () => Jd, BlenderbotPreTrainedModel: () => On, BlenderbotSmallForConditionalGeneration: () => tf, BlenderbotSmallModel: () => ef, BlenderbotSmallPreTrainedModel: () => In, BloomForCausalLM: () => rf, BloomModel: () => sf, BloomPreTrainedModel: () => Tn, CHMv2ForDepthEstimation: () => uf, CHMv2PreTrainedModel: () => Ql, CLIPModel: () => df, CLIPPreTrainedModel: () => vt, CLIPSegForImageSegmentation: () => xf, CLIPSegModel: () => gf, CLIPSegPreTrainedModel: () => Ln, CLIPTextModel: () => ff, CLIPTextModelWithProjection: () => Nn, CLIPVisionModel: () => mf, CLIPVisionModelWithProjection: () => hf, CamembertForMaskedLM: () => of, CamembertForQuestionAnswering: () => cf, CamembertForSequenceClassification: () => af, CamembertForTokenClassification: () => lf, CamembertModel: () => nf, CamembertPreTrainedModel: () => Jt2, CausalLMOutput: () => De, CausalLMOutputWithPast: () => Sl, ChatterboxModel: () => zn, ChatterboxPreTrainedModel: () => Kl, ChineseCLIPModel: () => pf, ChineseCLIPPreTrainedModel: () => Xl, ClapAudioModelWithProjection: () => Pn, ClapModel: () => _f, ClapPreTrainedModel: () => hr2, ClapTextModelWithProjection: () => Cn, CodeGenForCausalLM: () => yf, CodeGenModel: () => wf, CodeGenPreTrainedModel: () => $n, Cohere2ForCausalLM: () => Ef, Cohere2Model: () => vf, Cohere2PreTrainedModel: () => Fn, CohereAsrForConditionalGeneration: () => Mf, CohereAsrModel: () => Af, CohereAsrPreTrainedModel: () => Dn, CohereForCausalLM: () => kf, CohereModel: () => bf, CoherePreTrainedModel: () => Rn, ConvBertForMaskedLM: () => Of, ConvBertForQuestionAnswering: () => zf, ConvBertForSequenceClassification: () => If, ConvBertForTokenClassification: () => Tf, ConvBertModel: () => Sf, ConvBertPreTrainedModel: () => Zt2, ConvNextForImageClassification: () => Pf, ConvNextModel: () => Cf, ConvNextPreTrainedModel: () => Bn, ConvNextV2ForImageClassification: () => Lf, ConvNextV2Model: () => Nf, ConvNextV2PreTrainedModel: () => qn, DFineForObjectDetection: () => Df, DFineModel: () => Ff, DFinePreTrainedModel: () => jn, DINOv3ConvNextModel: () => dm, DINOv3ConvNextPreTrainedModel: () => rc, DINOv3ViTModel: () => fm, DINOv3ViTPreTrainedModel: () => nc, DPTForDepthEstimation: () => km, DPTModel: () => bm, DPTPreTrainedModel: () => Yn, DacDecoderModel: () => Wn, DacDecoderOutput: () => Jl, DacEncoderModel: () => Gn, DacEncoderOutput: () => Yl, DacModel: () => Bf, DacPreTrainedModel: () => gr2, DebertaForMaskedLM: () => Uf, DebertaForQuestionAnswering: () => Wf, DebertaForSequenceClassification: () => jf, DebertaForTokenClassification: () => Gf, DebertaModel: () => qf, DebertaPreTrainedModel: () => es2, DebertaV2ForMaskedLM: () => Yf, DebertaV2ForQuestionAnswering: () => em, DebertaV2ForSequenceClassification: () => Jf, DebertaV2ForTokenClassification: () => Zf, DebertaV2Model: () => Qf, DebertaV2PreTrainedModel: () => ts2, DecisionTransformerModel: () => tm, DecisionTransformerPreTrainedModel: () => Zl, DeepseekV3ForCausalLM: () => Hf, DeepseekV3Model: () => Vf, DeepseekV3PreTrainedModel: () => Vn, DeepseekV4ForCausalLM: () => Xf, DeepseekV4Model: () => Kf, DeepseekV4PreTrainedModel: () => Hn, DeiTForImageClassification: () => rm, DeiTModel: () => sm, DeiTPreTrainedModel: () => Kn, DepthAnythingForDepthEstimation: () => nm, DepthAnythingPreTrainedModel: () => ec, DepthProForDepthEstimation: () => om, DepthProPreTrainedModel: () => tc, DetrForObjectDetection: () => im, DetrForSegmentation: () => lm, DetrModel: () => am, DetrObjectDetectionOutput: () => wr, DetrPreTrainedModel: () => xr, DetrSegmentationOutput: () => sc, Dinov2ForImageClassification: () => pm, Dinov2Model: () => cm, Dinov2PreTrainedModel: () => Xn, Dinov2WithRegistersForImageClassification: () => _m, Dinov2WithRegistersModel: () => um, Dinov2WithRegistersPreTrainedModel: () => Qn, DistilBertForMaskedLM: () => wm, DistilBertForQuestionAnswering: () => xm, DistilBertForSequenceClassification: () => hm, DistilBertForTokenClassification: () => gm, DistilBertModel: () => mm, DistilBertPreTrainedModel: () => ss2, DonutSwinModel: () => ym, DonutSwinPreTrainedModel: () => oc, EdgeTamModel: () => Bw, EfficientNetForImageClassification: () => Em, EfficientNetModel: () => vm, EfficientNetPreTrainedModel: () => Jn, ElectraForMaskedLM: () => Mm, ElectraForQuestionAnswering: () => Im, ElectraForSequenceClassification: () => Sm, ElectraForTokenClassification: () => Om, ElectraModel: () => Am, ElectraPreTrainedModel: () => rs2, EmbeddingGemma2Model: () => Zn, EmbeddingGemma2PreTrainedModel: () => ac, Ernie4_5ForCausalLM: () => zm, Ernie4_5Model: () => Tm, Ernie4_5PretrainedModel: () => eo, EsmForMaskedLM: () => Pm, EsmForSequenceClassification: () => Nm, EsmForTokenClassification: () => Lm, EsmModel: () => Cm, EsmPreTrainedModel: () => Is2, EuroBertForMaskedLM: () => Rm, EuroBertForSequenceClassification: () => Fm, EuroBertForTokenClassification: () => Dm, EuroBertModel: () => $m, EuroBertPreTrainedModel: () => Ts2, ExaoneForCausalLM: () => qm, ExaoneModel: () => Bm, ExaonePreTrainedModel: () => to, FalconForCausalLM: () => jm, FalconH1ForCausalLM: () => Wm, FalconH1Model: () => Gm, FalconH1PreTrainedModel: () => ro, FalconModel: () => Um, FalconPreTrainedModel: () => so, FastViTForImageClassification: () => Hm, FastViTModel: () => Vm, FastViTPreTrainedModel: () => no, Florence2ForConditionalGeneration: () => Km, Florence2PreTrainedModel: () => ic, GLPNForDepthEstimation: () => uh, GLPNModel: () => ph, GLPNPreTrainedModel: () => uo, GPT2LMHeadModel: () => bh, GPT2Model: () => yh, GPT2PreTrainedModel: () => go, GPTBigCodeForCausalLM: () => dh, GPTBigCodeModel: () => _h, GPTBigCodePreTrainedModel: () => _o, GPTJForCausalLM: () => vh, GPTJModel: () => kh, GPTJPreTrainedModel: () => xo, GPTNeoForCausalLM: () => mh, GPTNeoModel: () => fh, GPTNeoPreTrainedModel: () => fo, GPTNeoXForCausalLM: () => gh, GPTNeoXModel: () => hh, GPTNeoXPreTrainedModel: () => mo, Gemma2ForCausalLM: () => Jm, Gemma2Model: () => Ym, Gemma2PreTrainedModel: () => ao, Gemma3ForCausalLM: () => sh, Gemma3ForConditionalGeneration: () => pc2, Gemma3Model: () => th, Gemma3PreTrainedModel: () => cc, Gemma3nForCausalLM: () => rh, Gemma3nForConditionalGeneration: () => ns2, Gemma3nPreTrainedModel: () => uc, Gemma4ForCausalLM: () => nh, Gemma4ForConditionalGeneration: () => yr2, GemmaForCausalLM: () => Qm, GemmaModel: () => Xm, GemmaPreTrainedModel: () => oo, GlmForCausalLM: () => ah, GlmModel: () => oh, GlmMoeDsaForCausalLM: () => lh, GlmMoeDsaModel: () => ih, GlmMoeDsaPreTrainedModel: () => lo, GlmOcrForConditionalGeneration: () => ch, GlmPreTrainedModel: () => io, GptOssForCausalLM: () => wh, GptOssModel: () => xh, GptOssPreTrainedModel: () => ho, GraniteForCausalLM: () => Ah, GraniteModel: () => Eh, GraniteMoeHybridForCausalLM: () => Sh, GraniteMoeHybridModel: () => Mh, GraniteMoeHybridPreTrainedModel: () => yo, GranitePreTrainedModel: () => wo, GraniteSpeechForConditionalGeneration: () => Oh, GroundingDinoForObjectDetection: () => Ih, GroundingDinoPreTrainedModel: () => fc, GroupViTModel: () => Th, GroupViTPreTrainedModel: () => mc2, HeliumForCausalLM: () => Ch, HeliumModel: () => zh, HeliumPreTrainedModel: () => bo, HieraForImageClassification: () => Nh, HieraModel: () => Ph, HieraPreTrainedModel: () => ko, HrmTextForCausalLM: () => $h, HrmTextModel: () => Lh, HrmTextPreTrainedModel: () => vo, HubertForCTC: () => jh, HubertForSequenceClassification: () => Gh, HubertModel: () => Uh, HubertPreTrainedModel: () => qh, HunYuanDenseV1ForCausalLM: () => Vh, HunYuanDenseV1Model: () => Wh, HunYuanDenseV1PreTrainedModel: () => Eo, IJepaForImageClassification: () => Kh, IJepaModel: () => Hh, IJepaPreTrainedModel: () => Mo, Idefics3ForConditionalGeneration: () => Ao, ImageMattingOutput: () => lr2, JAISLMHeadModel: () => Qh, JAISModel: () => Xh, JAISPreTrainedModel: () => So, JinaCLIPModel: () => Yh, JinaCLIPPreTrainedModel: () => kr, JinaCLIPTextModel: () => Oo, JinaCLIPVisionModel: () => Jh, Lfm2ForCausalLM: () => eg, Lfm2Model: () => Zh, Lfm2MoeForCausalLM: () => rg, Lfm2MoeModel: () => sg, Lfm2MoePreTrainedModel: () => To, Lfm2PreTrainedModel: () => Io, Lfm2VlForConditionalGeneration: () => ng, LightOnOcrForConditionalGeneration: () => tg, LiteWhisperForConditionalGeneration: () => s0, Llama4ForCausalLM: () => ig, Llama4PreTrainedModel: () => hc2, LlamaForCausalLM: () => ag, LlamaModel: () => og, LlamaPreTrainedModel: () => zo, LlavaForConditionalGeneration: () => Be, LlavaOnevisionForConditionalGeneration: () => Be, LlavaPreTrainedModel: () => lc2, LlavaQwen2ForCausalLM: () => eh, LongT5ForConditionalGeneration: () => cg, LongT5Model: () => lg, LongT5PreTrainedModel: () => Co, M2M100ForConditionalGeneration: () => ug, M2M100Model: () => pg, M2M100PreTrainedModel: () => Po, MBartForCausalLM: () => wg, MBartForConditionalGeneration: () => gg, MBartForSequenceClassification: () => xg, MBartModel: () => hg, MBartPreTrainedModel: () => Ps2, MPNetForMaskedLM: () => px, MPNetForQuestionAnswering: () => dx, MPNetForSequenceClassification: () => ux, MPNetForTokenClassification: () => _x, MPNetModel: () => cx, MPNetPreTrainedModel: () => os2, MT5ForConditionalGeneration: () => gx, MT5Model: () => hx, MT5PreTrainedModel: () => Ko, MarianMTModel: () => dg, MarianModel: () => _g, MarianPreTrainedModel: () => No, MaskFormerForInstanceSegmentation: () => mg, MaskFormerModel: () => fg, MaskFormerPreTrainedModel: () => Lo, MaskedLMOutput: () => se, Metric3DForDepthEstimation: () => yg, Metric3DPreTrainedModel: () => gc2, Metric3Dv2ForDepthEstimation: () => bg, Metric3Dv2PreTrainedModel: () => xc2, MgpstrForSceneTextRecognition: () => kg, MgpstrModelOutput: () => wc2, MgpstrPreTrainedModel: () => yc2, MimiDecoderModel: () => Ro, MimiDecoderOutput: () => kc2, MimiEncoderModel: () => $o, MimiEncoderOutput: () => bc2, MimiModel: () => vg, MimiPreTrainedModel: () => vr, Ministral3ForCausalLM: () => Sg, Ministral3Model: () => Mg, Ministral3PreTrainedModel: () => Do, MinistralForCausalLM: () => Ag, MinistralModel: () => Eg, MinistralPreTrainedModel: () => Fo, Mistral3ForConditionalGeneration: () => Tg, Mistral4ForCausalLM: () => Cg, Mistral4Model: () => zg, Mistral4PreTrainedModel: () => qo, MistralForCausalLM: () => Ig, MistralModel: () => Og, MistralPreTrainedModel: () => Bo, MobileBertForMaskedLM: () => Ng, MobileBertForQuestionAnswering: () => $g, MobileBertForSequenceClassification: () => Lg, MobileBertModel: () => Pg, MobileBertPreTrainedModel: () => Ns2, MobileLLMForCausalLM: () => Fg, MobileLLMModel: () => Rg, MobileLLMPreTrainedModel: () => Uo, MobileNetV1ForImageClassification: () => Bg, MobileNetV1ForSemanticSegmentation: () => qg, MobileNetV1Model: () => Dg, MobileNetV1PreTrainedModel: () => Er, MobileNetV2ForImageClassification: () => jg, MobileNetV2ForSemanticSegmentation: () => Gg, MobileNetV2Model: () => Ug, MobileNetV2PreTrainedModel: () => Ar, MobileNetV3ForImageClassification: () => Vg, MobileNetV3ForSemanticSegmentation: () => Hg, MobileNetV3Model: () => Wg, MobileNetV3PreTrainedModel: () => Mr, MobileNetV4ForImageClassification: () => Xg, MobileNetV4ForSemanticSegmentation: () => Qg, MobileNetV4Model: () => Kg, MobileNetV4PreTrainedModel: () => Sr, MobileViTForImageClassification: () => Jg, MobileViTModel: () => Yg, MobileViTPreTrainedModel: () => jo, MobileViTV2ForImageClassification: () => ex, MobileViTV2Model: () => Zg, MobileViTV2PreTrainedModel: () => Go, ModelOutput: () => ae, ModernBertDecoderForCausalLM: () => ax, ModernBertDecoderModel: () => ox, ModernBertDecoderPreTrainedModel: () => Wo, ModernBertForMaskedLM: () => sx, ModernBertForSequenceClassification: () => rx, ModernBertForTokenClassification: () => nx, ModernBertModel: () => tx, ModernBertPreTrainedModel: () => Ls2, Moondream1ForConditionalGeneration: () => Zm, MoonshineForConditionalGeneration: () => lx, MoonshineModel: () => ix, MoonshinePreTrainedModel: () => Vo, MptForCausalLM: () => mx, MptModel: () => fx, MptPreTrainedModel: () => Ho, MultiModalityCausalLM: () => xx, MultiModalityPreTrainedModel: () => vc2, MusicgenForCausalLM: () => yx, MusicgenForConditionalGeneration: () => Qo, MusicgenModel: () => wx, MusicgenPreTrainedModel: () => Xo, NanoChatForCausalLM: () => kx, NanoChatModel: () => bx, NanoChatPreTrainedModel: () => Yo, NemotronHForCausalLM: () => Ex, NemotronHModel: () => vx, NemotronHPreTrainedModel: () => Jo, NeoBertForMaskedLM: () => Mx, NeoBertForQuestionAnswering: () => Ix, NeoBertForSequenceClassification: () => Sx, NeoBertForTokenClassification: () => Ox, NeoBertModel: () => Ax, NeoBertPreTrainedModel: () => as2, NomicBertModel: () => Tx, NomicBertPreTrainedModel: () => Ec2, OPTForCausalLM: () => Gx, OPTModel: () => jx, OPTPreTrainedModel: () => oa, Olmo2ForCausalLM: () => Nx, Olmo2Model: () => Px, Olmo2PreTrainedModel: () => ea, Olmo3ForCausalLM: () => $x, Olmo3Model: () => Lx, Olmo3PreTrainedModel: () => ta, OlmoForCausalLM: () => Cx, OlmoHybridForCausalLM: () => Fx, OlmoHybridModel: () => Rx, OlmoHybridPreTrainedModel: () => sa, OlmoModel: () => zx, OlmoPreTrainedModel: () => Zo, OpenAIPrivacyFilterForTokenClassification: () => Bx, OpenAIPrivacyFilterModel: () => Dx, OpenAIPrivacyFilterPreTrainedModel: () => ra, OpenELMForCausalLM: () => Ux, OpenELMModel: () => qx, OpenELMPreTrainedModel: () => na, OwlViTForObjectDetection: () => Kx, OwlViTModel: () => Hx, OwlViTPreTrainedModel: () => ia, Owlv2ForObjectDetection: () => Vx, Owlv2Model: () => Wx, Owlv2PreTrainedModel: () => aa, PaliGemmaForConditionalGeneration: () => Xx, ParakeetForCTC: () => Qx, ParakeetPreTrainedModel: () => Ac2, PatchTSMixerForPrediction: () => Jx, PatchTSMixerModel: () => Yx, PatchTSMixerPreTrainedModel: () => la, PatchTSTForPrediction: () => ew, PatchTSTModel: () => Zx, PatchTSTPreTrainedModel: () => ca, Phi3ForCausalLM: () => nw, Phi3Model: () => rw, Phi3PreTrainedModel: () => ua, Phi3VForCausalLM: () => _a2, Phi3VPreTrainedModel: () => Mc2, PhiForCausalLM: () => sw, PhiModel: () => tw, PhiPreTrainedModel: () => pa, PreTrainedModel: () => h, PvtForImageClassification: () => aw, PvtModel: () => ow, PvtPreTrainedModel: () => da, PyAnnoteForAudioFrameClassification: () => lw, PyAnnoteModel: () => iw, PyAnnotePreTrainedModel: () => fa, QuestionAnsweringModelOutput: () => ie2, Qwen2ForCausalLM: () => pw, Qwen2Model: () => cw, Qwen2MoeForCausalLM: () => _w, Qwen2MoeModel: () => uw, Qwen2MoePreTrainedModel: () => ha, Qwen2PreTrainedModel: () => ma, Qwen2VLForCausalLM: () => co, Qwen2VLForConditionalGeneration: () => br2, Qwen2VLPreTrainedModel: () => _c2, Qwen2_5_VLForCausalLM: () => po, Qwen2_5_VLForConditionalGeneration: () => zs2, Qwen3ForCausalLM: () => fw, Qwen3Model: () => dw, Qwen3MoeForCausalLM: () => hw, Qwen3MoeModel: () => mw, Qwen3MoePreTrainedModel: () => xa, Qwen3NextForCausalLM: () => xw, Qwen3NextModel: () => gw, Qwen3NextPreTrainedModel: () => wa, Qwen3PreTrainedModel: () => ga, Qwen3VLForCausalLM: () => ya, Qwen3VLForConditionalGeneration: () => $s2, Qwen3VLMoeForCausalLM: () => yw, Qwen3VLMoeForConditionalGeneration: () => ww, Qwen3_5ForCausalLM: () => ba, Qwen3_5ForConditionalGeneration: () => Or, Qwen3_5MoeForCausalLM: () => kw, Qwen3_5MoeForConditionalGeneration: () => bw, RFDetrForObjectDetection: () => Mw, RFDetrModel: () => Aw, RFDetrObjectDetectionOutput: () => Sc2, RFDetrPreTrainedModel: () => va, RTDetrForObjectDetection: () => Rf, RTDetrModel: () => $f, RTDetrObjectDetectionOutput: () => Et, RTDetrPreTrainedModel: () => Un, RTDetrV2ForObjectDetection: () => Fw, RTDetrV2Model: () => Rw, RTDetrV2ObjectDetectionOutput: () => Oc2, RTDetrV2PreTrainedModel: () => Ea, ResNetForImageClassification: () => Ew, ResNetModel: () => vw, ResNetPreTrainedModel: () => ka2, RoFormerForMaskedLM: () => Pw, RoFormerForQuestionAnswering: () => $w, RoFormerForSequenceClassification: () => Nw, RoFormerForTokenClassification: () => Lw, RoFormerModel: () => Cw, RoFormerPreTrainedModel: () => ls2, RobertaForMaskedLM: () => Ow, RobertaForQuestionAnswering: () => zw, RobertaForSequenceClassification: () => Iw, RobertaForTokenClassification: () => Tw, RobertaModel: () => Sw, RobertaPreTrainedModel: () => is2, Sam2ImageSegmentationOutput: () => zc2, Sam2Model: () => Aa, Sam2PreTrainedModel: () => Cc2, Sam3TrackerModel: () => qw, SamImageSegmentationOutput: () => Ic2, SamModel: () => Dw, SamPreTrainedModel: () => Tc2, SapiensForDepthEstimation: () => jw, SapiensForNormalEstimation: () => Gw, SapiensForSemanticSegmentation: () => Uw, SapiensPreTrainedModel: () => Ir, SegformerForImageClassification: () => Vw, SegformerForSemanticSegmentation: () => Hw, SegformerModel: () => Ww, SegformerPreTrainedModel: () => Tr, Seq2SeqLMOutput: () => Ol, SequenceClassifierOutput: () => z, SiglipModel: () => Kw, SiglipPreTrainedModel: () => Ma, SiglipTextModel: () => Sa, SiglipVisionModel: () => Xw, SmolLM3ForCausalLM: () => Yw, SmolLM3Model: () => Qw, SmolLM3PreTrainedModel: () => Oa, SmolVLMForConditionalGeneration: () => Jw, SnacDecoderModel: () => Ta, SnacEncoderModel: () => Ia, SnacModel: () => Zw, SnacPreTrainedModel: () => zr, SolarOpenForCausalLM: () => ty, SolarOpenModel: () => ey, SolarOpenPreTrainedModel: () => za2, SpeechT5ForSpeechToText: () => ry, SpeechT5ForTextToSpeech: () => ny, SpeechT5HifiGan: () => oy, SpeechT5Model: () => sy, SpeechT5PreTrainedModel: () => Cr, SqueezeBertForMaskedLM: () => iy, SqueezeBertForQuestionAnswering: () => cy, SqueezeBertForSequenceClassification: () => ly, SqueezeBertModel: () => ay, SqueezeBertPreTrainedModel: () => Rs2, StableLmForCausalLM: () => uy, StableLmModel: () => py, StableLmPreTrainedModel: () => Ca, Starcoder2ForCausalLM: () => dy, Starcoder2Model: () => _y, Starcoder2PreTrainedModel: () => Pa2, StyleTextToSpeech2Model: () => fy, StyleTextToSpeech2PreTrainedModel: () => Pc2, SupertonicForConditionalGeneration: () => Na2, SupertonicPreTrainedModel: () => Nc2, Swin2SRForImageSuperResolution: () => wy, Swin2SRModel: () => xy, Swin2SRPreTrainedModel: () => La, SwinForImageClassification: () => hy, SwinForSemanticSegmentation: () => gy, SwinModel: () => my, SwinPreTrainedModel: () => Pr, T5ForConditionalGeneration: () => by, T5Model: () => yy, T5PreTrainedModel: () => $a2, TableTransformerForObjectDetection: () => vy, TableTransformerModel: () => ky, TableTransformerObjectDetectionOutput: () => Lc2, TableTransformerPreTrainedModel: () => Ra2, TokenClassifierOutput: () => te, TrOCRForCausalLM: () => Ey, TrOCRPreTrainedModel: () => $c2, UltravoxModel: () => Cs2, UltravoxPreTrainedModel: () => dc2, UniSpeechForCTC: () => My, UniSpeechForSequenceClassification: () => Sy, UniSpeechModel: () => Ay, UniSpeechPreTrainedModel: () => Nr, UniSpeechSatForAudioFrameClassification: () => zy, UniSpeechSatForCTC: () => Iy, UniSpeechSatForSequenceClassification: () => Ty, UniSpeechSatModel: () => Oy, UniSpeechSatPreTrainedModel: () => Fs2, VaultGemmaForCausalLM: () => Py, VaultGemmaModel: () => Cy, VaultGemmaPreTrainedModel: () => Fa2, ViTForImageClassification: () => $y, ViTMAEModel: () => Ry, ViTMAEPreTrainedModel: () => Rc2, ViTMSNForImageClassification: () => Dy, ViTMSNModel: () => Fy, ViTMSNPreTrainedModel: () => Ba, ViTModel: () => Ly, ViTPreTrainedModel: () => Da2, VisionEncoderDecoderModel: () => Ny, VitMatteForImageMatting: () => By, VitMattePreTrainedModel: () => Fc, VitPoseForPoseEstimation: () => qy, VitPosePreTrainedModel: () => Dc2, VitsModel: () => Uy, VitsModelOutput: () => Bc2, VitsPreTrainedModel: () => qc, VoxtralForConditionalGeneration: () => jy, VoxtralRealtimeForConditionalGeneration: () => qa2, VoxtralRealtimePreTrainedModel: () => Uc2, Wav2Vec2BertForCTC: () => Hy, Wav2Vec2BertForSequenceClassification: () => Ky, Wav2Vec2BertModel: () => Vy, Wav2Vec2BertPreTrainedModel: () => Lr, Wav2Vec2ForAudioFrameClassification: () => Bh, Wav2Vec2ForCTC: () => Fh, Wav2Vec2ForSequenceClassification: () => Dh, Wav2Vec2Model: () => Rh, Wav2Vec2PreTrainedModel: () => gt2, WavLMForAudioFrameClassification: () => Zy, WavLMForCTC: () => Qy, WavLMForSequenceClassification: () => Yy, WavLMForXVector: () => Jy, WavLMModel: () => Xy, WavLMPreTrainedModel: () => cs2, WeSpeakerResNetModel: () => e0, WeSpeakerResNetPreTrainedModel: () => Gc2, WhisperForConditionalGeneration: () => Vc, WhisperModel: () => t0, WhisperPreTrainedModel: () => Ua2, XLMForQuestionAnswering: () => i0, XLMForSequenceClassification: () => o0, XLMForTokenClassification: () => a0, XLMModel: () => r0, XLMPreTrainedModel: () => ps2, XLMRobertaForMaskedLM: () => c0, XLMRobertaForQuestionAnswering: () => _0, XLMRobertaForSequenceClassification: () => p0, XLMRobertaForTokenClassification: () => u0, XLMRobertaModel: () => l0, XLMRobertaPreTrainedModel: () => us2, XLMWithLMHeadModel: () => n0, XVectorOutput: () => jc, YolosForObjectDetection: () => f0, YolosModel: () => d0, YolosObjectDetectionOutput: () => Hc, YolosPreTrainedModel: () => ja2, YoutuForCausalLM: () => h0, YoutuModel: () => m0, YoutuPreTrainedModel: () => Ga2, ZayaForCausalLM: () => x0, ZayaModel: () => g0, ZayaPreTrainedModel: () => Wa2 });
var Os2 = class extends h {
};
var Td = class extends Os2 {
};
var zd = class extends Os2 {
  async _call(e) {
    return new z(await super._call(e));
  }
};
var Cd = class extends Os2 {
  async _call(e) {
    return new ie2(await super._call(e));
  }
};
var Pd = class extends Os2 {
  async _call(e) {
    return new se(await super._call(e));
  }
};
var vn = class extends h {
};
var Nd = class extends vn {
};
var Ld = class extends vn {
};
var En = class extends h {
};
var $d = class extends En {
};
var Rd = class extends En {
};
var An = class extends h {
};
var Fd = class extends An {
};
var Dd = class extends An {
};
var Mn = class extends h {
};
var Bd = class extends Mn {
};
var qd = class extends Mn {
};
var mr2 = class extends h {
};
var Ud = class extends mr2 {
};
var jd = class extends mr2 {
};
var Gd = class extends mr2 {
  async _call(e) {
    return new z(await super._call(e));
  }
};
var Sn = class extends h {
};
var Wd = class extends Sn {
};
var Vd = class extends Sn {
  async _call(e) {
    return new z(await super._call(e));
  }
};
var Yt2 = class extends h {
};
var Hd = class extends Yt2 {
};
var Kd = class extends Yt2 {
  async _call(e) {
    return new se(await super._call(e));
  }
};
var Xd = class extends Yt2 {
  async _call(e) {
    return new z(await super._call(e));
  }
};
var Qd = class extends Yt2 {
  async _call(e) {
    return new te(await super._call(e));
  }
};
var Yd = class extends Yt2 {
  async _call(e) {
    return new ie2(await super._call(e));
  }
};
var On = class extends h {
};
var Jd = class extends On {
};
var Zd = class extends On {
};
var In = class extends h {
};
var ef = class extends In {
};
var tf = class extends In {
};
var Tn = class extends h {
};
var sf = class extends Tn {
};
var rf = class extends Tn {
};
var Jt2 = class extends h {
};
var nf = class extends Jt2 {
};
var of = class extends Jt2 {
  async _call(e) {
    return new se(await super._call(e));
  }
};
var af = class extends Jt2 {
  async _call(e) {
    return new z(await super._call(e));
  }
};
var lf = class extends Jt2 {
  async _call(e) {
    return new te(await super._call(e));
  }
};
var cf = class extends Jt2 {
  async _call(e) {
    return new ie2(await super._call(e));
  }
};
var WS = 4299n;
var Wk = 6561n;
var Kl = class extends h {
  forward_params = ["input_ids", "inputs_embeds", "attention_mask", "position_ids", "audio_values", "exaggeration", "audio_features", "audio_tokens", "speaker_embeddings", "speaker_features", "past_key_values"];
  main_input_name = "input_ids";
  _return_dict_in_generate_keys = ["audio_tokens", "speaker_embeddings", "speaker_features"];
};
var zn = class extends Kl {
  async encode_speech(e) {
    return K(this.sessions.speech_encoder, { audio_values: e });
  }
  async forward({ input_ids: e = null, attention_mask: s = null, audio_values: r = null, exaggeration: n = null, position_ids: o = null, inputs_embeds: a = null, past_key_values: i = null, generation_config: l = null, logits_processor: c = null, num_logits_to_keep: p = null, audio_features: u = null, audio_tokens: _ = null, speaker_embeddings: d = null, speaker_features: f = null, ...m }) {
    let g;
    if (!a) {
      let x = this.sessions.embed_tokens.inputNames, y = { input_ids: e };
      if (x.includes("exaggeration")) {
        if (!(n instanceof E)) {
          let b = e.dims[0];
          if (n == null) n = Ae([b], 0.5);
          else if (typeof n == "number") n = Ae([b], n);
          else if (Array.isArray(n)) n = new E("float32", n, [b]);
          else throw new Error("Unsupported type for `exaggeration` input");
        }
        y.exaggeration = n;
      }
      if (x.includes("position_ids") && (y.position_ids = o), { inputs_embeds: a } = await K(this.sessions.embed_tokens, y), u && _ && d && f && (g = { audio_features: u, audio_tokens: _, speaker_embeddings: d, speaker_features: f }), g || r) g ??= await this.encode_speech(r), a = ne([g.audio_features, a], 1), s = Oe([a.dims[0], a.dims[1]]);
      else {
        let b = a.dims[1];
        if (!i || b !== 1) throw new Error("Incorrect state encountered during generation.");
        let v = i.get_seq_length();
        s = Oe([a.dims[0], v + b]);
      }
    }
    return { ...await Je(this, { inputs_embeds: a, past_key_values: i, attention_mask: s, generation_config: l, logits_processor: c, num_logits_to_keep: p }, false), ...g };
  }
  prepare_inputs_for_generation(e, s, r) {
    if (!s.position_ids && this.sessions.embed_tokens.inputNames.includes("position_ids")) if (s.input_ids.dims[1] === 1) {
      let n = Array.from({ length: e.length }, (o, a) => e[a].length - e[a].findLastIndex((i) => i == Wk) - 1);
      s.position_ids = new E("int64", n, [e.length, 1]);
    } else {
      let o = s.input_ids.tolist().map((a) => {
        let i = 0;
        return a.map((l) => l >= Wk ? 0 : i++);
      });
      s.position_ids = new E("int64", o.flat(), s.input_ids.dims);
    }
    return s.input_ids.dims[1] === 1 && (delete s.audio_values, delete s.audio_features, delete s.audio_tokens, delete s.speaker_embeddings, delete s.speaker_features), Qt2(this, e, s, r);
  }
  async generate(e) {
    let s = e.past_key_values, { sequences: r, audio_tokens: n, speaker_embeddings: o, speaker_features: a, past_key_values: i } = await super.generate({ ...e, return_dict_in_generate: true });
    try {
      let l = r.slice(null, [e.input_ids.dims[1], -1]), c = Ae([l.dims[0], 3], WS), p = ne([n, l, c], 1), { waveform: u } = await K(this.sessions.conditional_decoder, { speech_tokens: p, speaker_features: a, speaker_embeddings: o });
      return u;
    } finally {
      i !== s && await i?.dispose();
    }
  }
};
var Xl = class extends h {
};
var pf = class extends Xl {
};
var Ql = class extends h {
};
var uf = class extends Ql {
};
var hr2 = class extends h {
};
var _f = class extends hr2 {
};
var Cn = class extends hr2 {
  static async from_pretrained(e, s = {}) {
    return super.from_pretrained(e, { ...s, model_file_name: s.model_file_name ?? "text_model" });
  }
};
var Pn = class extends hr2 {
  static async from_pretrained(e, s = {}) {
    return super.from_pretrained(e, { ...s, model_file_name: s.model_file_name ?? "audio_model" });
  }
};
var vt = class extends h {
};
var df = class extends vt {
};
var ff = class extends vt {
  static async from_pretrained(e, s = {}) {
    return super.from_pretrained(e, { ...s, model_file_name: s.model_file_name ?? "text_model" });
  }
};
var Nn = class extends vt {
  static async from_pretrained(e, s = {}) {
    return super.from_pretrained(e, { ...s, model_file_name: s.model_file_name ?? "text_model" });
  }
};
var mf = class extends vt {
  static async from_pretrained(e, s = {}) {
    return super.from_pretrained(e, { ...s, model_file_name: s.model_file_name ?? "vision_model" });
  }
};
var hf = class extends vt {
  static async from_pretrained(e, s = {}) {
    return super.from_pretrained(e, { ...s, model_file_name: s.model_file_name ?? "vision_model" });
  }
};
var Ln = class extends h {
};
var gf = class extends Ln {
};
var xf = class extends Ln {
};
var $n = class extends h {
};
var wf = class extends $n {
};
var yf = class extends $n {
};
var Rn = class extends h {
};
var bf = class extends Rn {
};
var kf = class extends Rn {
};
var Fn = class extends h {
};
var vf = class extends Fn {
};
var Ef = class extends Fn {
};
var Dn = class extends h {
  requires_attention_mask = false;
  main_input_name = "input_features";
  forward_params = ["input_features", "decoder_input_ids", "decoder_attention_mask", "past_key_values"];
};
var Af = class extends Dn {
};
var Mf = class extends Dn {
};
var Zt2 = class extends h {
};
var Sf = class extends Zt2 {
};
var Of = class extends Zt2 {
  async _call(e) {
    return new se(await super._call(e));
  }
};
var If = class extends Zt2 {
  async _call(e) {
    return new z(await super._call(e));
  }
};
var Tf = class extends Zt2 {
  async _call(e) {
    return new te(await super._call(e));
  }
};
var zf = class extends Zt2 {
  async _call(e) {
    return new ie2(await super._call(e));
  }
};
var Bn = class extends h {
};
var Cf = class extends Bn {
};
var Pf = class extends Bn {
  async _call(e) {
    return new z(await super._call(e));
  }
};
var qn = class extends h {
};
var Nf = class extends qn {
};
var Lf = class extends qn {
  async _call(e) {
    return new z(await super._call(e));
  }
};
var Un = class extends h {
};
var $f = class extends Un {
};
var Rf = class extends Un {
  async _call(e) {
    return new Et(await super._call(e));
  }
};
var Et = class extends ae {
  constructor({ logits: e, pred_boxes: s }) {
    super(), this.logits = e, this.pred_boxes = s;
  }
};
var jn = class extends h {
};
var Ff = class extends jn {
};
var Df = class extends jn {
  async _call(e) {
    return new Et(await super._call(e));
  }
};
var Yl = class extends ae {
  constructor({ audio_codes: e }) {
    super(), this.audio_codes = e;
  }
};
var Jl = class extends ae {
  constructor({ audio_values: e }) {
    super(), this.audio_values = e;
  }
};
var gr2 = class extends h {
  main_input_name = "input_values";
  forward_params = ["input_values"];
};
var Bf = class extends gr2 {
  async encode(e) {
    return new Yl(await K(this.sessions.encoder_model, e));
  }
  async decode(e) {
    return new Jl(await K(this.sessions.decoder_model, e));
  }
};
var Gn = class extends gr2 {
  static async from_pretrained(e, s = {}) {
    return super.from_pretrained(e, { ...s, model_file_name: s.model_file_name ?? "encoder_model" });
  }
};
var Wn = class extends gr2 {
  static async from_pretrained(e, s = {}) {
    return super.from_pretrained(e, { ...s, model_file_name: s.model_file_name ?? "decoder_model" });
  }
};
var es2 = class extends h {
};
var qf = class extends es2 {
};
var Uf = class extends es2 {
  async _call(e) {
    return new se(await super._call(e));
  }
};
var jf = class extends es2 {
  async _call(e) {
    return new z(await super._call(e));
  }
};
var Gf = class extends es2 {
  async _call(e) {
    return new te(await super._call(e));
  }
};
var Wf = class extends es2 {
  async _call(e) {
    return new ie2(await super._call(e));
  }
};
var Vn = class extends h {
};
var Vf = class extends Vn {
};
var Hf = class extends Vn {
};
var Hn = class extends h {
};
var Kf = class extends Hn {
};
var Xf = class extends Hn {
};
var ts2 = class extends h {
};
var Qf = class extends ts2 {
};
var Yf = class extends ts2 {
  async _call(e) {
    return new se(await super._call(e));
  }
};
var Jf = class extends ts2 {
  async _call(e) {
    return new z(await super._call(e));
  }
};
var Zf = class extends ts2 {
  async _call(e) {
    return new te(await super._call(e));
  }
};
var em = class extends ts2 {
  async _call(e) {
    return new ie2(await super._call(e));
  }
};
var Zl = class extends h {
};
var tm = class extends Zl {
};
var Kn = class extends h {
};
var sm = class extends Kn {
};
var rm = class extends Kn {
  async _call(e) {
    return new z(await super._call(e));
  }
};
var ec = class extends h {
};
var nm = class extends ec {
};
var tc = class extends h {
};
var om = class extends tc {
};
var xr = class extends h {
};
var am = class extends xr {
};
var im = class extends xr {
  async _call(e) {
    return new wr(await super._call(e));
  }
};
var lm = class extends xr {
  async _call(e) {
    return new sc(await super._call(e));
  }
};
var wr = class extends ae {
  constructor({ logits: e, pred_boxes: s }) {
    super(), this.logits = e, this.pred_boxes = s;
  }
};
var sc = class extends ae {
  constructor({ logits: e, pred_boxes: s, pred_masks: r }) {
    super(), this.logits = e, this.pred_boxes = s, this.pred_masks = r;
  }
};
var Xn = class extends h {
};
var cm = class extends Xn {
};
var pm = class extends Xn {
  async _call(e) {
    return new z(await super._call(e));
  }
};
var Qn = class extends h {
};
var um = class extends Qn {
};
var _m = class extends Qn {
  async _call(e) {
    return new z(await super._call(e));
  }
};
var rc = class extends h {
};
var dm = class extends rc {
};
var nc = class extends h {
};
var fm = class extends nc {
};
var ss2 = class extends h {
};
var mm = class extends ss2 {
};
var hm = class extends ss2 {
  async _call(e) {
    return new z(await super._call(e));
  }
};
var gm = class extends ss2 {
  async _call(e) {
    return new te(await super._call(e));
  }
};
var xm = class extends ss2 {
  async _call(e) {
    return new ie2(await super._call(e));
  }
};
var wm = class extends ss2 {
  async _call(e) {
    return new se(await super._call(e));
  }
};
var oc = class extends h {
};
var ym = class extends oc {
};
var Yn = class extends h {
};
var bm = class extends Yn {
};
var km = class extends Yn {
};
var Jn = class extends h {
};
var vm = class extends Jn {
};
var Em = class extends Jn {
  async _call(e) {
    return new z(await super._call(e));
  }
};
var rs2 = class extends h {
};
var Am = class extends rs2 {
};
var Mm = class extends rs2 {
  async _call(e) {
    return new se(await super._call(e));
  }
};
var Sm = class extends rs2 {
  async _call(e) {
    return new z(await super._call(e));
  }
};
var Om = class extends rs2 {
  async _call(e) {
    return new te(await super._call(e));
  }
};
var Im = class extends rs2 {
  async _call(e) {
    return new ie2(await super._call(e));
  }
};
var ac = class extends h {
};
var Zn = class extends ac {
  async forward({ input_ids: e, attention_mask: s, pixel_values: r = null, image_position_ids: n = null, pixel_values_videos: o = null, video_position_ids: a = null, input_features: i = null, input_features_mask: l = null }) {
    let c = { image_features: r && await this.encode_image({ pixel_values: r, pixel_position_ids: n }), video_features: o && await this.encode_image({ pixel_values: o, pixel_position_ids: a }), audio_features: i && await this.encode_audio({ input_features: i, input_features_mask: l }) }, { image_token_id: p, video_token_id: u, audio_token_id: _, text_config: d } = this.config, f = { image: p, video: u, audio: _ };
    for (let [m, g] of Object.entries(f)) {
      let w = `${m}_features`;
      c[w] ??= new E("float32", new Float32Array(0), [0, d.hidden_size]);
      let x = 0;
      for (let y of e.data) Number(y) === g && ++x;
      if (x !== c[w].dims[0]) throw new Error(`The number of ${m} tokens (${x}) and ${m} features (${c[w].dims[0]}) do not match.`);
    }
    return await K(this.sessions.model, { input_ids: e, attention_mask: s, ...c });
  }
};
var eo = class extends h {
};
var Tm = class extends eo {
};
var zm = class extends eo {
};
var Is2 = class extends h {
};
var Cm = class extends Is2 {
};
var Pm = class extends Is2 {
  async _call(e) {
    return new se(await super._call(e));
  }
};
var Nm = class extends Is2 {
  async _call(e) {
    return new z(await super._call(e));
  }
};
var Lm = class extends Is2 {
  async _call(e) {
    return new te(await super._call(e));
  }
};
var Ts2 = class extends h {
};
var $m = class extends Ts2 {
};
var Rm = class extends Ts2 {
  async _call(e) {
    return new se(await super._call(e));
  }
};
var Fm = class extends Ts2 {
  async _call(e) {
    return new z(await super._call(e));
  }
};
var Dm = class extends Ts2 {
  async _call(e) {
    return new te(await super._call(e));
  }
};
var to = class extends h {
};
var Bm = class extends to {
};
var qm = class extends to {
};
var so = class extends h {
};
var Um = class extends so {
};
var jm = class extends so {
};
var ro = class extends h {
};
var Gm = class extends ro {
};
var Wm = class extends ro {
};
var no = class extends h {
};
var Vm = class extends no {
};
var Hm = class extends no {
  async _call(e) {
    return new z(await super._call(e));
  }
};
var ic = class extends h {
  forward_params = ["input_ids", "inputs_embeds", "attention_mask", "pixel_values", "encoder_outputs", "decoder_input_ids", "decoder_inputs_embeds", "decoder_attention_mask", "past_key_values"];
  main_input_name = "inputs_embeds";
};
var Km = class extends ic {
  _merge_input_ids_with_image_features({ inputs_embeds: e, image_features: s, input_ids: r, attention_mask: n }) {
    return { inputs_embeds: ne([s, e], 1), attention_mask: ne([Oe(s.dims.slice(0, 2)), n], 1) };
  }
  async _prepare_inputs_embeds({ input_ids: e, pixel_values: s, inputs_embeds: r, attention_mask: n }) {
    if (!e && !s) throw new Error("Either `input_ids` or `pixel_values` should be provided.");
    let o, a;
    return e && (o = await this.encode_text({ input_ids: e })), s && (a = await this.encode_image({ pixel_values: s })), o && a ? { inputs_embeds: r, attention_mask: n } = this._merge_input_ids_with_image_features({ inputs_embeds: o, image_features: a, input_ids: e, attention_mask: n }) : r = o || a, { inputs_embeds: r, attention_mask: n };
  }
  async forward({ input_ids: e, pixel_values: s, attention_mask: r, decoder_input_ids: n, decoder_attention_mask: o, encoder_outputs: a, past_key_values: i, inputs_embeds: l, decoder_inputs_embeds: c, num_logits_to_keep: p = null }) {
    if (l || ({ inputs_embeds: l, attention_mask: r } = await this._prepare_inputs_embeds({ input_ids: e, pixel_values: s, inputs_embeds: l, attention_mask: r })), !a) {
      let { last_hidden_state: _ } = await it2(this, { inputs_embeds: l, attention_mask: r });
      a = _;
    }
    if (!c) {
      if (!n) throw new Error("Either `decoder_input_ids` or `decoder_inputs_embeds` should be provided.");
      c = await this.encode_text({ input_ids: n });
    }
    return await Je(this, { inputs_embeds: c, attention_mask: o, encoder_attention_mask: r, encoder_hidden_states: a, past_key_values: i, num_logits_to_keep: p }, true);
  }
};
var oo = class extends h {
};
var Xm = class extends oo {
};
var Qm = class extends oo {
};
var ao = class extends h {
};
var Ym = class extends ao {
};
var Jm = class extends ao {
};
var lc2 = class extends h {
  forward_params = ["input_ids", "attention_mask", "pixel_values", "position_ids", "past_key_values"];
};
var Be = class extends lc2 {
  _merge_input_ids_with_image_features(e) {
    let s = e.image_features.dims.at(-1), r = e.image_features.view(-1, s);
    return fr2({ image_token_id: this.config.image_token_index ?? this.config.image_token_id, ...e, image_features: r });
  }
};
var Zm = class extends Be {
};
var eh = class extends Be {
};
var cc = class extends h {
};
var th = class extends cc {
};
var pc2 = class extends Be {
};
var sh = class extends pc2 {
};
var uc = class extends h {
  forward_params = ["input_ids", "attention_mask", "inputs_embeds", "per_layer_inputs", "position_ids", "pixel_values", "input_features", "input_features_mask", "past_key_values"];
};
var ns2 = class extends uc {
  async forward({ input_ids: e = null, attention_mask: s = null, pixel_values: r = null, input_features: n = null, input_features_mask: o = null, position_ids: a = null, inputs_embeds: i = null, per_layer_inputs: l = null, past_key_values: c = null, generation_config: p = null, logits_processor: u = null, num_logits_to_keep: _ = null, ...d }) {
    if ((!i || !l) && ({ inputs_embeds: i, per_layer_inputs: l } = await K(this.sessions.embed_tokens, { input_ids: e }), e.dims[1] !== 1)) {
      if (r) {
        let { image_features: m } = await this._encode_vision({ pixel_values: r, ...d });
        ({ inputs_embeds: i, attention_mask: s } = this._merge_input_ids_with_image_features({ image_features: m, inputs_embeds: i, input_ids: e, attention_mask: s }));
      }
      if (n) {
        let { audio_features: m } = await K(this.sessions.audio_encoder, { input_features: n, input_features_mask: o });
        ({ inputs_embeds: i, attention_mask: s } = this._merge_input_ids_with_audio_features({ audio_features: m, inputs_embeds: i, input_ids: e, attention_mask: s }));
      }
    }
    return await Je(this, { inputs_embeds: i, per_layer_inputs: l, past_key_values: c, attention_mask: s, position_ids: a, generation_config: p, logits_processor: u, num_logits_to_keep: _ }, true);
  }
  _encode_vision(e) {
    return K(this.sessions.vision_encoder, { pixel_values: e.pixel_values });
  }
  _merge_input_ids_with_image_features(e) {
    let s = e.image_features.dims.at(-1), r = e.image_features.view(-1, s);
    return fr2({ image_token_id: this.config.image_token_id, ...e, image_features: r });
  }
  _merge_input_ids_with_audio_features(e) {
    let s = e.audio_features.dims.at(-1), r = e.audio_features.view(-1, s);
    return Hl({ audio_token_id: this.config.audio_token_id, ...e, audio_features: r });
  }
};
var rh = class extends ns2 {
};
var yr2 = class extends ns2 {
  forward_params = ["input_ids", "attention_mask", "inputs_embeds", "per_layer_inputs", "position_ids", "pixel_values", "image_position_ids", "input_features", "input_features_mask", "past_key_values"];
  _encode_vision(e) {
    return K(this.sessions.vision_encoder, { pixel_values: e.pixel_values, pixel_position_ids: e.image_position_ids });
  }
};
var nh = class extends yr2 {
};
var io = class extends h {
};
var oh = class extends io {
};
var ah = class extends io {
};
var lo = class extends h {
};
var ih = class extends lo {
};
var lh = class extends lo {
};
var _c2 = class extends h {
  forward_params = ["input_ids", "attention_mask", "position_ids", "past_key_values", "pixel_values", "image_grid_thw"];
};
var br2 = class extends _c2 {
  image_grid_thw_name = "grid_thw";
  _get_text_only_rope_index(e, s) {
    if (s) {
      let { data: r, dims: n } = Id(s), o = BigInt64Array.from({ length: 3 * r.length }, (i, l) => r[l % r.length]), a = Array.from({ length: n[0] }, (i, l) => fe(r.subarray(n[1] * l, n[1] * (l + 1)))[0] + 1n + BigInt(n[1]));
      return [new E("int64", o, [3, ...n]), new E("int64", a, [a.length, 1])];
    } else {
      let [r, n] = e.dims, o = BigInt64Array.from({ length: 3 * r * n }, (a, i) => BigInt(Math.floor(i % n / r)));
      return [new E("int64", o, [3, ...e.dims]), jp([r, 1])];
    }
  }
  _reorder_and_write_positions(e, s, r, n) {
    let o = e.reduce((c, p) => c + p.length, 0), a = new Array(o), i = 0;
    for (let c = 0; c < 3; ++c) for (let p of e) {
      let u = p.length / 3;
      for (let _ = c * u; _ < (c + 1) * u; ++_) a[i++] = p[_];
    }
    let l = 0;
    for (let c = 0; c < s.length; ++c) if (s[c] == 1) {
      for (let p = 0; p < 3; ++p) r[p][n][c] = a[p * o / 3 + l];
      ++l;
    }
    return a;
  }
  _get_multimodal_rope_positions({ filtered_ids: e, image_grid_thw_list: s, video_grid_thw_list: r, spatial_merge_size: n, state: o }) {
    let { image_token_id: a, video_token_id: i, vision_start_token_id: l } = this.config, c = e, u = c.reduce((x, y, b) => (y == l && x.push(b), x), []).map((x) => c[x + 1]), _ = u.filter((x) => x == a).length, d = u.filter((x) => x == i).length, f = [], m = 0, g = _, w = d;
    for (let x = 0; x < u.length; ++x) {
      let y = c.findIndex((M, I) => I > m && M == a), b = c.findIndex((M, I) => I > m && M == i), v = g > 0 && y !== -1 ? y : c.length + 1, k = w > 0 && b !== -1 ? b : c.length + 1, O, T, $, C;
      v < k ? ([T, $, C] = s[o.image_index], ++o.image_index, --g, O = v) : ([T, $, C] = r[o.video_index], ++o.video_index, --w, O = k);
      let [D, W, V2] = [Number(T), Math.floor(Number($) / n), Math.floor(Number(C) / n)], B = O - m, q = f.length > 0 ? fe(f.at(-1))[0] + 1 : 0;
      f.push(Array.from({ length: 3 * B }, (M, I) => q + I % B));
      let Z = B + q, j2 = D * W * V2, ue = Array.from({ length: j2 }, (M, I) => Z + Math.floor(I / (W * V2))), _e = Array.from({ length: j2 }, (M, I) => Z + Math.floor(I / V2) % W), A = Array.from({ length: j2 }, (M, I) => Z + I % V2);
      f.push([ue, _e, A].flat()), m = O + j2;
    }
    if (m < c.length) {
      let x = f.length > 0 ? fe(f.at(-1))[0] + 1 : 0, y = c.length - m;
      f.push(Array.from({ length: 3 * y }, (b, v) => x + v % y));
    }
    return f;
  }
  get_rope_index(e, s, r, n) {
    let { vision_config: o } = this.config, a = o.spatial_merge_size ?? 2;
    if (s || r) {
      let i = e.tolist();
      n || (n = Qs2(e));
      let l = n.tolist(), c = Array.from({ length: 3 }, () => Array.from({ length: e.dims[0] }, () => Array.from({ length: e.dims[1] }, () => 0))), p = s ? s.tolist() : [], u = r ? r.tolist() : [], _ = { image_index: 0, video_index: 0 }, d = [];
      for (let f = 0; f < i.length; ++f) {
        let m = i[f].filter((x, y) => l[f][y] == 1), g = this._get_multimodal_rope_positions({ filtered_ids: m, image_grid_thw_list: p, video_grid_thw_list: u, spatial_merge_size: a, state: _ }), w = this._reorder_and_write_positions(g, l[f], c, f);
        d.push(fe(w)[0] + 1 - i[f].length);
      }
      return [new E("int64", c.flat(1 / 0), [3, e.dims[0], e.dims[1]]), new E("int64", d, [d.length, 1])];
    } else return this._get_text_only_rope_index(e, n);
  }
  async encode_image({ pixel_values: e, image_grid_thw: s }) {
    return (await K(this.sessions.vision_encoder, { pixel_values: e, [this.image_grid_thw_name]: s })).image_features;
  }
  _merge_input_ids_with_image_features(e) {
    return fr2({ image_token_id: this.config.image_token_id, ...e });
  }
  prepare_inputs_for_generation(e, s, r) {
    if (Ss2(this, s, 1n), !s.attention_mask || s.position_ids || !(this.sessions.decoder_model_merged ?? this.sessions.model).inputNames.includes("position_ids")) return s;
    if (!s.past_key_values) [s.position_ids, s.rope_deltas] = this.get_rope_index(s.input_ids, s.image_grid_thw, s.video_grid_thw, s.attention_mask);
    else {
      s.pixel_values = null;
      let o = s.past_key_values.get_seq_length();
      if (o < s.input_ids.dims[1]) {
        let [a, i] = this.get_rope_index(s.input_ids, s.image_grid_thw, s.video_grid_thw, s.attention_mask);
        s.rope_deltas = i, s.position_ids = a.slice(null, null, [o, null]), s.input_ids = s.input_ids.slice(null, [o, null]);
      } else {
        s.rope_deltas || ([, s.rope_deltas] = this.get_rope_index(s.input_ids, s.image_grid_thw, s.video_grid_thw, s.attention_mask));
        let a = BigInt(o), i = s.rope_deltas.map((l) => a + l);
        s.position_ids = Ge([i, i, i], 0);
      }
    }
    return s;
  }
};
var co = class extends br2 {
};
var zs2 = class extends br2 {
  image_grid_thw_name = "image_grid_thw";
};
var po = class extends co {
  image_grid_thw_name = "image_grid_thw";
};
var ch = class extends zs2 {
  get_vision_position_ids(e, s, r, n) {
    let o = Math.floor(s[0] / r), a = Math.floor(s[1] / n), i = Math.floor(s[2] / n), l = a * i * o, c = Array.from({ length: l }, () => e), p = Array.from({ length: l }, (_, d) => e + Math.floor(d / (i * o))), u = Array.from({ length: l }, (_, d) => e + d % i);
    return [...c, ...p, ...u];
  }
  _get_multimodal_rope_positions({ filtered_ids: e, image_grid_thw_list: s, video_grid_thw_list: r, spatial_merge_size: n, state: o }) {
    let { image_token_id: a } = this.config, i = [], l = 0, c = e[0] == a ? 1 : 0;
    for (let _ = 1; _ <= e.length; ++_) {
      let d = _ < e.length ? e[_] == a ? 1 : 0 : -1;
      d !== c && (i.push([c, l, _]), l = _, c = d);
    }
    let p = 0, u = [];
    for (let [_, d, f] of i) if (_ === 0) {
      let m = f - d;
      u.push(Array.from({ length: 3 * m }, (g, w) => p + w % m)), p += m;
    } else {
      let m = s[o.image_index++].map(Number), g = m[0];
      u.push(this.get_vision_position_ids(p, m, g, n)), p += Math.max(m[1], m[2]) / n;
    }
    return u;
  }
};
var uo = class extends h {
};
var ph = class extends uo {
};
var uh = class extends uo {
};
var _o = class extends h {
};
var _h = class extends _o {
};
var dh = class extends _o {
};
var fo = class extends h {
};
var fh = class extends fo {
};
var mh = class extends fo {
};
var mo = class extends h {
};
var hh = class extends mo {
};
var gh = class extends mo {
};
var ho = class extends h {
};
var xh = class extends ho {
};
var wh = class extends ho {
};
var go = class extends h {
};
var yh = class extends go {
};
var bh = class extends go {
};
var xo = class extends h {
};
var kh = class extends xo {
};
var vh = class extends xo {
};
var wo = class extends h {
};
var Eh = class extends wo {
};
var Ah = class extends wo {
};
var yo = class extends h {
};
var Mh = class extends yo {
};
var Sh = class extends yo {
};
var dc2 = class extends h {
  forward_params = ["input_ids", "attention_mask", "position_ids", "audio_values", "past_key_values"];
};
var Cs2 = class extends dc2 {
  _merge_input_ids_with_audio_features(e) {
    let s = e.audio_features.dims.at(-1), r = e.audio_features.view(-1, s);
    return Hl({ audio_token_id: this.config.ignore_index ?? this.config.audio_token_id ?? this.config.audio_token_index, ...e, audio_features: r });
  }
};
var Oh = class extends Cs2 {
  forward_params = ["input_ids", "attention_mask", "input_features", "past_key_values"];
};
var fc = class extends h {
};
var Ih = class extends fc {
};
var mc2 = class extends h {
};
var Th = class extends mc2 {
};
var bo = class extends h {
};
var zh = class extends bo {
};
var Ch = class extends bo {
};
var ko = class extends h {
};
var Ph = class extends ko {
};
var Nh = class extends ko {
  async _call(e) {
    return new z(await super._call(e));
  }
};
var vo = class extends h {
};
var Lh = class extends vo {
};
var $h = class extends vo {
  forward_params = ["input_ids", "attention_mask", "token_type_ids", "past_key_values"];
  prepare_inputs_for_generation(e, s, r) {
    let n = Qt2(this, e, s, r);
    return n.token_type_ids = (n.past_key_values ? en2 : Qs2)(n.input_ids), n;
  }
};
var gt2 = class extends h {
};
var Rh = class extends gt2 {
};
var Fh = class extends gt2 {
  async _call(e) {
    return new De(await super._call(e));
  }
};
var Dh = class extends gt2 {
  async _call(e) {
    return new z(await super._call(e));
  }
};
var Bh = class extends gt2 {
  async _call(e) {
    return new te(await super._call(e));
  }
};
var qh = class extends h {
};
var Uh = class extends gt2 {
};
var jh = class extends gt2 {
  async _call(e) {
    return new De(await super._call(e));
  }
};
var Gh = class extends gt2 {
  async _call(e) {
    return new z(await super._call(e));
  }
};
var Eo = class extends h {
};
var Wh = class extends Eo {
};
var Vh = class extends Eo {
};
var Ao = class extends Be {
  forward_params = ["input_ids", "attention_mask", "pixel_values", "pixel_attention_mask", "position_ids", "past_key_values"];
};
var Mo = class extends h {
};
var Hh = class extends Mo {
};
var Kh = class extends Mo {
  async _call(e) {
    return new z(await super._call(e));
  }
};
var So = class extends h {
};
var Xh = class extends So {
};
var Qh = class extends So {
};
var kr = class extends h {
};
var Yh = class extends kr {
  async forward(e) {
    let s = !e.input_ids, r = !e.pixel_values;
    if (s && r) throw new Error("Either `input_ids` or `pixel_values` should be provided.");
    if (s && (e.input_ids = Oe([e.pixel_values.dims[0], 1])), r) {
      let { image_size: c } = this.config.vision_config;
      e.pixel_values = Ae([0, 3, c, c], 0);
    }
    let { text_embeddings: n, image_embeddings: o, l2norm_text_embeddings: a, l2norm_image_embeddings: i } = await super.forward(e), l = {};
    return s || (l.text_embeddings = n, l.l2norm_text_embeddings = a), r || (l.image_embeddings = o, l.l2norm_image_embeddings = i), l;
  }
};
var Oo = class extends kr {
  static async from_pretrained(e, s = {}) {
    return super.from_pretrained(e, { ...s, model_file_name: s.model_file_name ?? "text_model" });
  }
};
var Jh = class extends kr {
  static async from_pretrained(e, s = {}) {
    return super.from_pretrained(e, { ...s, model_file_name: s.model_file_name ?? "vision_model" });
  }
};
var Io = class extends h {
};
var Zh = class extends Io {
};
var eg = class extends Io {
};
var tg = class extends Be {
};
var To = class extends h {
};
var sg = class extends To {
};
var rg = class extends To {
};
var ng = class extends Be {
  forward_params = ["input_ids", "attention_mask", "pixel_values", "pixel_attention_mask", "spatial_shapes", "position_ids", "past_key_values"];
};
var zo = class extends h {
};
var og = class extends zo {
};
var ag = class extends zo {
};
var hc2 = class extends h {
};
var ig = class extends hc2 {
};
var Co = class extends h {
};
var lg = class extends Co {
};
var cg = class extends Co {
};
var Po = class extends h {
};
var pg = class extends Po {
};
var ug = class extends Po {
};
var No = class extends h {
};
var _g = class extends No {
};
var dg = class extends No {
};
var Lo = class extends h {
};
var fg = class extends Lo {
};
var mg = class extends Lo {
};
var Ps2 = class extends h {
};
var hg = class extends Ps2 {
};
var gg = class extends Ps2 {
};
var xg = class extends Ps2 {
  async _call(e) {
    return new z(await super._call(e));
  }
};
var wg = class extends Ps2 {
};
var gc2 = class extends h {
};
var yg = class extends gc2 {
};
var xc2 = class extends h {
};
var bg = class extends xc2 {
};
var wc2 = class extends ae {
  constructor({ char_logits: e, bpe_logits: s, wp_logits: r }) {
    super(), this.char_logits = e, this.bpe_logits = s, this.wp_logits = r;
  }
  get logits() {
    return [this.char_logits, this.bpe_logits, this.wp_logits];
  }
};
var yc2 = class extends h {
};
var kg = class extends yc2 {
  async _call(e) {
    return new wc2(await super._call(e));
  }
};
var bc2 = class extends ae {
  constructor({ audio_codes: e }) {
    super(), this.audio_codes = e;
  }
};
var kc2 = class extends ae {
  constructor({ audio_values: e }) {
    super(), this.audio_values = e;
  }
};
var vr = class extends h {
  main_input_name = "input_values";
  forward_params = ["input_values"];
};
var vg = class extends vr {
  async encode(e) {
    return new bc2(await K(this.sessions.encoder_model, e));
  }
  async decode(e) {
    return new kc2(await K(this.sessions.decoder_model, e));
  }
};
var $o = class extends vr {
  static async from_pretrained(e, s = {}) {
    return super.from_pretrained(e, { ...s, model_file_name: s.model_file_name ?? "encoder_model" });
  }
};
var Ro = class extends vr {
  static async from_pretrained(e, s = {}) {
    return super.from_pretrained(e, { ...s, model_file_name: s.model_file_name ?? "decoder_model" });
  }
};
var Fo = class extends h {
};
var Eg = class extends Fo {
};
var Ag = class extends Fo {
};
var Do = class extends h {
};
var Mg = class extends Do {
};
var Sg = class extends Do {
};
var Bo = class extends h {
};
var Og = class extends Bo {
};
var Ig = class extends Bo {
};
var Tg = class extends Be {
};
var qo = class extends h {
};
var zg = class extends qo {
};
var Cg = class extends qo {
};
var Ns2 = class extends h {
};
var Pg = class extends Ns2 {
};
var Ng = class extends Ns2 {
  async _call(e) {
    return new se(await super._call(e));
  }
};
var Lg = class extends Ns2 {
  async _call(e) {
    return new z(await super._call(e));
  }
};
var $g = class extends Ns2 {
  async _call(e) {
    return new ie2(await super._call(e));
  }
};
var Uo = class extends h {
};
var Rg = class extends Uo {
};
var Fg = class extends Uo {
};
var Er = class extends h {
};
var Dg = class extends Er {
};
var Bg = class extends Er {
  async _call(e) {
    return new z(await super._call(e));
  }
};
var qg = class extends Er {
};
var Ar = class extends h {
};
var Ug = class extends Ar {
};
var jg = class extends Ar {
  async _call(e) {
    return new z(await super._call(e));
  }
};
var Gg = class extends Ar {
};
var Mr = class extends h {
};
var Wg = class extends Mr {
};
var Vg = class extends Mr {
  async _call(e) {
    return new z(await super._call(e));
  }
};
var Hg = class extends Mr {
};
var Sr = class extends h {
};
var Kg = class extends Sr {
};
var Xg = class extends Sr {
  async _call(e) {
    return new z(await super._call(e));
  }
};
var Qg = class extends Sr {
};
var jo = class extends h {
};
var Yg = class extends jo {
};
var Jg = class extends jo {
  async _call(e) {
    return new z(await super._call(e));
  }
};
var Go = class extends h {
};
var Zg = class extends Go {
};
var ex = class extends Go {
  async _call(e) {
    return new z(await super._call(e));
  }
};
var Ls2 = class extends h {
};
var tx = class extends Ls2 {
};
var sx = class extends Ls2 {
  async _call(e) {
    return new se(await super._call(e));
  }
};
var rx = class extends Ls2 {
  async _call(e) {
    return new z(await super._call(e));
  }
};
var nx = class extends Ls2 {
  async _call(e) {
    return new te(await super._call(e));
  }
};
var Wo = class extends h {
};
var ox = class extends Wo {
};
var ax = class extends Wo {
};
var Vo = class extends h {
  requires_attention_mask = false;
  main_input_name = "input_values";
  forward_params = ["input_values", "decoder_input_ids", "past_key_values"];
};
var ix = class extends Vo {
};
var lx = class extends Vo {
};
var os2 = class extends h {
};
var cx = class extends os2 {
};
var px = class extends os2 {
  async _call(e) {
    return new se(await super._call(e));
  }
};
var ux = class extends os2 {
  async _call(e) {
    return new z(await super._call(e));
  }
};
var _x = class extends os2 {
  async _call(e) {
    return new te(await super._call(e));
  }
};
var dx = class extends os2 {
  async _call(e) {
    return new ie2(await super._call(e));
  }
};
var Ho = class extends h {
};
var fx = class extends Ho {
};
var mx = class extends Ho {
};
var Ko = class extends h {
};
var hx = class extends Ko {
};
var gx = class extends Ko {
};
var vc2 = class extends h {
};
var xx = class extends vc2 {
  forward_params = ["input_ids", "pixel_values", "images_seq_mask", "images_emb_mask", "attention_mask", "position_ids", "past_key_values"];
  constructor(...e) {
    super(...e), this._generation_mode = "text";
  }
  async forward(e) {
    let s = this._generation_mode ?? "text", r;
    if (s === "text" || !e.past_key_values) {
      let l = this.sessions.prepare_inputs_embeds, c = ye2(e, l.inputNames);
      r = await K(l, c);
    } else {
      let l = this.sessions.gen_img_embeds, c = ye2({ image_ids: e.input_ids }, l.inputNames);
      r = await K(l, c);
    }
    let n = { ...e, ...r }, o = await Je(this, n), a = this.sessions[s === "text" ? "lm_head" : "gen_head"];
    if (!a) throw new Error(`Unable to find "${a}" generation head`);
    let i = await K(a, ye2(o, a.inputNames));
    return { ...r, ...o, ...i };
  }
  prepare_inputs_for_generation(e, s, r) {
    let n = !!s.past_key_values;
    return Ss2(this, s, 1n), r.guidance_scale !== null && r.guidance_scale > 1 && (n ? s.input_ids = ne([s.input_ids, s.input_ids], 0) : (s.input_ids = ne([s.input_ids, Zr2(s.input_ids, BigInt(r.pad_token_id))], 0), s.attention_mask = ne([s.attention_mask, Zr2(s.attention_mask, 0n)], 0))), (n || !s.pixel_values) && (s.pixel_values = Ae([0, 0, 3, 384, 384], 1)), n && (s.images_seq_mask = new E("bool", new Array(1).fill(true).fill(false, 0, 1), [1, 1]), s.images_emb_mask = new E("bool", new Array(0).fill(false), [1, 1, 0])), s;
  }
  async generate(e) {
    return this._generation_mode = "text", super.generate(e);
  }
  async generate_images(e) {
    this._generation_mode = "image";
    let s = (e.inputs ?? e[this.main_input_name]).dims[1], n = (await super.generate(e)).slice(null, [s, null]), o = this.sessions.image_decode, { decoded_image: a } = await K(o, { generated_tokens: n }), i = a.add_(1).mul_(255 / 2).clamp_(0, 255).to("uint8"), l = [];
    for (let c of i) {
      let p = Se.fromTensor(c);
      l.push(p);
    }
    return l;
  }
};
var Xo = class extends h {
};
var wx = class extends Xo {
};
var yx = class extends Xo {
};
var Qo = class extends h {
  forward_params = ["input_ids", "attention_mask", "encoder_outputs", "decoder_input_ids", "decoder_attention_mask", "past_key_values"];
  _apply_and_filter_by_delay_pattern_mask(e) {
    let [s, r] = e.dims, n = this.config.decoder.num_codebooks, o = r - n, a = 0;
    for (let c = 0; c < e.size; ++c) {
      if (e.data[c] == this.config.decoder.pad_token_id) continue;
      let p = c % r, u = Math.floor(c / r) % n, _ = p - u;
      _ > 0 && _ <= o && (e.data[a++] = e.data[c]);
    }
    let i = Math.floor(s / n), l = a / (i * n);
    return new E(e.type, e.data.slice(0, a), [i, n, l]);
  }
  prepare_inputs_for_generation(e, s, r) {
    let n = BigInt(this.config.decoder.pad_token_id), o = structuredClone(e);
    for (let a = 0; a < o.length; ++a) for (let i = 0; i < o[a].length; ++i) a % this.config.decoder.num_codebooks >= i && (o[a][i] = n);
    return r.guidance_scale !== null && r.guidance_scale > 1 && (o = o.concat(o)), bn2(this, o, s, r);
  }
  async generate(e) {
    let s = await super.generate(e), r = this._apply_and_filter_by_delay_pattern_mask(s).unsqueeze_(0), { audio_values: n } = await K(this.sessions.encodec_decode, { audio_codes: r });
    return n;
  }
};
var Yo = class extends h {
};
var bx = class extends Yo {
};
var kx = class extends Yo {
};
var Jo = class extends h {
};
var vx = class extends Jo {
};
var Ex = class extends Jo {
};
var as2 = class extends h {
};
var Ax = class extends as2 {
};
var Mx = class extends as2 {
  async _call(e) {
    return new se(await super._call(e));
  }
};
var Sx = class extends as2 {
  async _call(e) {
    return new z(await super._call(e));
  }
};
var Ox = class extends as2 {
  async _call(e) {
    return new te(await super._call(e));
  }
};
var Ix = class extends as2 {
  async _call(e) {
    return new ie2(await super._call(e));
  }
};
var Ec2 = class extends h {
};
var Tx = class extends Ec2 {
};
var Zo = class extends h {
};
var zx = class extends Zo {
};
var Cx = class extends Zo {
};
var ea = class extends h {
};
var Px = class extends ea {
};
var Nx = class extends ea {
};
var ta = class extends h {
};
var Lx = class extends ta {
};
var $x = class extends ta {
};
var sa = class extends h {
};
var Rx = class extends sa {
};
var Fx = class extends sa {
};
var ra = class extends h {
};
var Dx = class extends ra {
};
var Bx = class extends ra {
  async _call(e) {
    return new z(await super._call(e));
  }
};
var na = class extends h {
};
var qx = class extends na {
};
var Ux = class extends na {
};
var oa = class extends h {
};
var jx = class extends oa {
};
var Gx = class extends oa {
};
var aa = class extends h {
};
var Wx = class extends aa {
};
var Vx = class extends aa {
};
var ia = class extends h {
};
var Hx = class extends ia {
};
var Kx = class extends ia {
};
var Xx = class extends Be {
};
var Ac2 = class extends h {
};
var Qx = class extends Ac2 {
  async _call(e) {
    return new De(await super._call(e));
  }
};
var la = class extends h {
};
var Yx = class extends la {
};
var Jx = class extends la {
};
var ca = class extends h {
};
var Zx = class extends ca {
};
var ew = class extends ca {
};
var pa = class extends h {
};
var tw = class extends pa {
};
var sw = class extends pa {
};
var ua = class extends h {
};
var rw = class extends ua {
};
var nw = class extends ua {
};
var Mc2 = class extends h {
  forward_params = ["input_ids", "inputs_embeds", "attention_mask", "position_ids", "pixel_values", "image_sizes", "past_key_values"];
};
var _a2 = class extends Mc2 {
  async forward({ input_ids: e = null, attention_mask: s = null, pixel_values: r = null, image_sizes: n = null, position_ids: o = null, inputs_embeds: a = null, past_key_values: i = null, generation_config: l = null, logits_processor: c = null, num_logits_to_keep: p = null, ...u }) {
    if (!a) {
      let d;
      if (r && e.dims[1] !== 1) {
        if (!n) throw new Error("`image_sizes` must be provided when `pixel_values` is provided.");
        ({ image_features: d } = await K(this.sessions.vision_encoder, { pixel_values: r, image_sizes: n }));
      } else {
        let f = this.config.normalized_config.hidden_size;
        d = new E("float32", [], [0, f]);
      }
      ({ inputs_embeds: a } = await K(this.sessions.prepare_inputs_embeds, { input_ids: e, image_features: d }));
    }
    return await Je(this, { inputs_embeds: a, past_key_values: i, attention_mask: s, position_ids: o, generation_config: l, logits_processor: c, num_logits_to_keep: p }, false);
  }
};
var da = class extends h {
};
var ow = class extends da {
};
var aw = class extends da {
  async _call(e) {
    return new z(await super._call(e));
  }
};
var fa = class extends h {
};
var iw = class extends fa {
};
var lw = class extends fa {
  async _call(e) {
    return new te(await super._call(e));
  }
};
var ma = class extends h {
};
var cw = class extends ma {
};
var pw = class extends ma {
};
var ha = class extends h {
};
var uw = class extends ha {
};
var _w = class extends ha {
};
var ga = class extends h {
};
var dw = class extends ga {
};
var fw = class extends ga {
};
var xa = class extends h {
};
var mw = class extends xa {
};
var hw = class extends xa {
};
var wa = class extends h {
};
var gw = class extends wa {
};
var xw = class extends wa {
};
var $s2 = class extends zs2 {
};
var ya = class extends po {
};
var ww = class extends $s2 {
};
var yw = class extends ya {
};
var Or = class extends $s2 {
};
var ba = class extends Or {
};
var bw = class extends Or {
};
var kw = class extends ba {
};
var ka2 = class extends h {
};
var vw = class extends ka2 {
};
var Ew = class extends ka2 {
  async _call(e) {
    return new z(await super._call(e));
  }
};
var va = class extends h {
};
var Aw = class extends va {
};
var Mw = class extends va {
  async _call(e) {
    return new Sc2(await super._call(e));
  }
};
var Sc2 = class extends Et {
};
var is2 = class extends h {
};
var Sw = class extends is2 {
};
var Ow = class extends is2 {
  async _call(e) {
    return new se(await super._call(e));
  }
};
var Iw = class extends is2 {
  async _call(e) {
    return new z(await super._call(e));
  }
};
var Tw = class extends is2 {
  async _call(e) {
    return new te(await super._call(e));
  }
};
var zw = class extends is2 {
  async _call(e) {
    return new ie2(await super._call(e));
  }
};
var ls2 = class extends h {
};
var Cw = class extends ls2 {
};
var Pw = class extends ls2 {
  async _call(e) {
    return new se(await super._call(e));
  }
};
var Nw = class extends ls2 {
  async _call(e) {
    return new z(await super._call(e));
  }
};
var Lw = class extends ls2 {
  async _call(e) {
    return new te(await super._call(e));
  }
};
var $w = class extends ls2 {
  async _call(e) {
    return new ie2(await super._call(e));
  }
};
var Ea = class extends h {
};
var Rw = class extends Ea {
};
var Fw = class extends Ea {
  async _call(e) {
    return new Oc2(await super._call(e));
  }
};
var Oc2 = class extends Et {
};
var Ic2 = class extends ae {
  constructor({ iou_scores: e, pred_masks: s }) {
    super(), this.iou_scores = e, this.pred_masks = s;
  }
};
var Tc2 = class extends h {
};
var Dw = class extends Tc2 {
  async get_image_embeddings({ pixel_values: e }) {
    return await it2(this, { pixel_values: e });
  }
  async forward(e) {
    !e.image_embeddings || !e.image_positional_embeddings ? e = { ...e, ...await this.get_image_embeddings(e) } : e = { ...e }, e.input_labels ??= Oe(e.input_points.dims.slice(0, -1));
    let s = { image_embeddings: e.image_embeddings, image_positional_embeddings: e.image_positional_embeddings };
    return e.input_points && (s.input_points = e.input_points), e.input_labels && (s.input_labels = e.input_labels), e.input_boxes && (s.input_boxes = e.input_boxes), await K(this.sessions.prompt_encoder_mask_decoder, s);
  }
  async _call(e) {
    return new Ic2(await super._call(e));
  }
};
var zc2 = class extends ae {
  constructor({ iou_scores: e, pred_masks: s, object_score_logits: r }) {
    super(), this.iou_scores = e, this.pred_masks = s, this.object_score_logits = r;
  }
};
var Cc2 = class extends h {
};
var Aa = class extends Cc2 {
  async get_image_embeddings({ pixel_values: e }) {
    return await it2(this, { pixel_values: e });
  }
  async forward(e) {
    let { num_feature_levels: s } = this.config.vision_config;
    if (Array.from({ length: s }, (a, i) => `image_embeddings.${i}`).some((a) => !e[a]) ? e = { ...e, ...await this.get_image_embeddings(e) } : e = { ...e }, e.input_points) {
      if (e.input_boxes && e.input_boxes.dims[1] !== 1) throw new Error("When both `input_points` and `input_boxes` are provided, the number of boxes per image must be 1.");
      let a = e.input_points.dims;
      e.input_labels ??= Oe(a.slice(0, -1)), e.input_boxes ??= Ae([a[0], 0, 4], 0);
    } else if (e.input_boxes) {
      let a = e.input_boxes.dims;
      e.input_labels = Ae([a[0], a[1], 0], -1n), e.input_points = Ae([a[0], 1, 0, 2], 0);
    } else throw new Error("At least one of `input_points` or `input_boxes` must be provided.");
    let n = this.sessions.prompt_encoder_mask_decoder, o = ye2(e, n.inputNames);
    return await K(n, o);
  }
  async _call(e) {
    return new zc2(await super._call(e));
  }
};
var Bw = class extends Aa {
};
var qw = class extends Aa {
};
var Ir = class extends h {
};
var Uw = class extends Ir {
};
var jw = class extends Ir {
};
var Gw = class extends Ir {
};
var Tr = class extends h {
};
var Ww = class extends Tr {
};
var Vw = class extends Tr {
};
var Hw = class extends Tr {
};
var Ma = class extends h {
};
var Kw = class extends Ma {
};
var Sa = class extends Ma {
  static async from_pretrained(e, s = {}) {
    return super.from_pretrained(e, { ...s, model_file_name: s.model_file_name ?? "text_model" });
  }
};
var Xw = class extends vt {
  static async from_pretrained(e, s = {}) {
    return super.from_pretrained(e, { ...s, model_file_name: s.model_file_name ?? "vision_model" });
  }
};
var Oa = class extends h {
};
var Qw = class extends Oa {
};
var Yw = class extends Oa {
};
var Jw = class extends Ao {
};
var zr = class extends h {
  main_input_name = "input_values";
  forward_params = ["input_values"];
};
var Zw = class extends zr {
  async encode(e) {
    return await K(this.sessions.encoder_model, e);
  }
  async decode(e) {
    return await K(this.sessions.decoder_model, e);
  }
};
var Ia = class extends zr {
  static async from_pretrained(e, s = {}) {
    return super.from_pretrained(e, { ...s, model_file_name: s.model_file_name ?? "encoder_model" });
  }
};
var Ta = class extends zr {
  static async from_pretrained(e, s = {}) {
    return super.from_pretrained(e, { ...s, model_file_name: s.model_file_name ?? "decoder_model" });
  }
};
var za2 = class extends h {
};
var ey = class extends za2 {
};
var ty = class extends za2 {
};
var Cr = class extends h {
};
var sy = class extends Cr {
};
var ry = class extends Cr {
};
var ny = class extends Cr {
  async generate_speech(e, s, { threshold: r = 0.5, minlenratio: n = 0, maxlenratio: o = 20, vocoder: a = null } = {}) {
    let i = { input_ids: e }, { encoder_outputs: l, encoder_attention_mask: c } = await it2(this, i), p = l.dims[1] / this.config.reduction_factor, u = Math.floor(p * o), _ = Math.floor(p * n), d = this.config.num_mel_bins, f = [], m = null, g = null, w = 0;
    for (; ; ) {
      ++w;
      let b = Sd(!!g), v;
      g ? v = g.output_sequence_out : v = new E("float32", new Float32Array(d), [1, 1, d]);
      let k = { use_cache_branch: b, output_sequence: v, encoder_attention_mask: c, speaker_embeddings: s, encoder_hidden_states: l };
      kn(this, k, m), g = await K(this.sessions.decoder_model_merged, k), m = Wl(g, m);
      let { prob: O, spectrum: T } = g;
      if (f.push(T), w >= _ && (Array.from(O.data).filter(($) => $ >= r).length > 0 || w >= u)) break;
    }
    let x = ne(f), { waveform: y } = await K(a.sessions.model, { spectrogram: x });
    return { spectrogram: x, waveform: y };
  }
};
var oy = class extends h {
  main_input_name = "spectrogram";
};
var Rs2 = class extends h {
};
var ay = class extends Rs2 {
};
var iy = class extends Rs2 {
  async _call(e) {
    return new se(await super._call(e));
  }
};
var ly = class extends Rs2 {
  async _call(e) {
    return new z(await super._call(e));
  }
};
var cy = class extends Rs2 {
  async _call(e) {
    return new ie2(await super._call(e));
  }
};
var Ca = class extends h {
};
var py = class extends Ca {
};
var uy = class extends Ca {
};
var Pa2 = class extends h {
};
var _y = class extends Pa2 {
};
var dy = class extends Pa2 {
};
var Pc2 = class extends h {
};
var fy = class extends Pc2 {
};
var Nc2 = class extends h {
};
var Na2 = class extends Nc2 {
  async generate_speech({ input_ids: e, attention_mask: s, style: r, num_inference_steps: n = 5, speed: o = 1.05 }) {
    let { sampling_rate: a, chunk_compress_factor: i, base_chunk_size: l, latent_dim: c } = this.config, { last_hidden_state: p, durations: u } = await K(this.sessions.text_encoder, { input_ids: e, attention_mask: s, style: r }), _ = u.div(o).mul_(a), d = l * i, f = _.data, m = Int32Array.from(f, (C) => Math.ceil(C / d)), g = Math.max(...m), w = e.dims[0], x = new BigInt64Array(w * g);
    for (let C = 0; C < w; ++C) x.fill(1n, C * g, C * g + m[C]);
    let y = new E("int64", x, [w, g]), b = c * i, v = b * g, k = dk([w, b, g]), O = k.data;
    for (let C = 0; C < w; ++C) if (m[C] !== g) for (let D = 0; D < b; ++D) O.fill(0, C * v + D * g + m[C], C * v + (D + 1) * g);
    let T = Ae([w], n);
    for (let C = 0; C < n; ++C) {
      let D = Ae([w], C);
      ({ denoised_latents: k } = await K(this.sessions.latent_denoiser, { style: r, noisy_latents: k, latent_mask: y, encoder_outputs: p, attention_mask: s, timestep: D, num_inference_steps: T }));
    }
    let { waveform: $ } = await K(this.sessions.voice_decoder, { latents: k });
    return { waveform: $, durations: _ };
  }
};
var Pr = class extends h {
};
var my = class extends Pr {
};
var hy = class extends Pr {
  async _call(e) {
    return new z(await super._call(e));
  }
};
var gy = class extends Pr {
};
var La = class extends h {
};
var xy = class extends La {
};
var wy = class extends La {
};
var $a2 = class extends h {
  forward_params = ["input_ids", "attention_mask", "encoder_outputs", "decoder_input_ids", "decoder_attention_mask", "past_key_values"];
};
var yy = class extends $a2 {
};
var by = class extends $a2 {
};
var Ra2 = class extends h {
};
var ky = class extends Ra2 {
};
var vy = class extends Ra2 {
  async _call(e) {
    return new Lc2(await super._call(e));
  }
};
var Lc2 = class extends wr {
};
var $c2 = class extends h {
};
var Ey = class extends $c2 {
};
var Nr = class extends h {
};
var Ay = class extends Nr {
};
var My = class extends Nr {
  async _call(e) {
    return new De(await super._call(e));
  }
};
var Sy = class extends Nr {
  async _call(e) {
    return new z(await super._call(e));
  }
};
var Fs2 = class extends h {
};
var Oy = class extends Fs2 {
};
var Iy = class extends Fs2 {
  async _call(e) {
    return new De(await super._call(e));
  }
};
var Ty = class extends Fs2 {
  async _call(e) {
    return new z(await super._call(e));
  }
};
var zy = class extends Fs2 {
  async _call(e) {
    return new te(await super._call(e));
  }
};
var Fa2 = class extends h {
};
var Cy = class extends Fa2 {
};
var Py = class extends Fa2 {
};
var Ny = class extends h {
  main_input_name = "pixel_values";
  forward_params = ["pixel_values", "decoder_input_ids", "encoder_hidden_states", "past_key_values"];
};
var Da2 = class extends h {
};
var Ly = class extends Da2 {
};
var $y = class extends Da2 {
  async _call(e) {
    return new z(await super._call(e));
  }
};
var Rc2 = class extends h {
};
var Ry = class extends Rc2 {
};
var Ba = class extends h {
};
var Fy = class extends Ba {
};
var Dy = class extends Ba {
  async _call(e) {
    return new z(await super._call(e));
  }
};
var Fc = class extends h {
};
var By = class extends Fc {
  async _call(e) {
    return new lr2(await super._call(e));
  }
};
var Dc2 = class extends h {
};
var qy = class extends Dc2 {
};
var Bc2 = class extends ae {
  constructor({ waveform: e, spectrogram: s }) {
    super(), this.waveform = e, this.spectrogram = s;
  }
};
var qc = class extends h {
};
var Uy = class extends qc {
  async _call(e) {
    return new Bc2(await super._call(e));
  }
};
var jy = class extends Cs2 {
};
var Vk = 2;
var VS = 1;
var Gy = /* @__PURE__ */ new WeakMap();
function HS(t6, e) {
  let { text_config: s, audio_config: r } = t6.config, n = t6.sessions.audio_encoder, { num_mel_bins: o, hidden_size: a } = r, i = o + a, l = new ur2(), c = bs2(r), p = { batch_size: 1 }, u = "float32";
  for (let m of n.inputMetadata) {
    if (m.name === "past_padding_cache") {
      u = m.type;
      continue;
    }
    if (!c.has(m.name)) continue;
    let g = Od(m.shape, p), w = g.reduce((y, b) => y * b, 1), x = Wt[m.type];
    l[m.name] = new E(m.type, new x(w), g);
  }
  let _ = Wt[u], d = new E(u, new _(i * Vk), [1, i, Vk]), f = e[Symbol.asyncIterator]?.() ?? e[Symbol.iterator]?.();
  if (!f) throw new Error("input_features must be iterable or async iterable");
  return { encoder_session: n, enc_kv_cache: l, enc_padding_cache: d, enc_past_seq_len: 0, audio_embed_queue: [], audio_embed_total_tokens: 0, audio_queue_offset: 0, audio_consumed: 0, stream_exhausted: false, chunks_iter: f, text_hidden_size: s.hidden_size };
}
async function KS(t6, e) {
  let s = e.dims[2], r = Math.floor((VS + s - 3) / 2) + 1, n = new E("int64", BigInt64Array.from({ length: r }, (p, u) => BigInt(t6.enc_past_seq_len + u)), [1, r]), o = t6.enc_past_seq_len + r, a = Oe([1, o]), { audio_embeds: i, present_padding_cache: l, ...c } = await K(t6.encoder_session, { input_features: e, attention_mask: a, position_ids: n, past_padding_cache: t6.enc_padding_cache, ...t6.enc_kv_cache });
  t6.enc_padding_cache.location === "gpu-buffer" && t6.enc_padding_cache.dispose(), t6.enc_padding_cache = l;
  for (let p in c) if (p.startsWith("present.")) {
    let u = p.replace("present", "past_key_values"), _ = t6.enc_kv_cache[u];
    _?.location === "gpu-buffer" && _.dispose(), t6.enc_kv_cache[u] = c[p];
  }
  return t6.enc_past_seq_len = o, i;
}
async function XS(t6, e) {
  for (; t6.audio_embed_total_tokens < e && !t6.stream_exhausted; ) {
    let s = await t6.chunks_iter.next();
    if (s.done) {
      t6.stream_exhausted = true;
      break;
    }
    let r = await KS(t6, s.value);
    t6.audio_embed_queue.push({ data: r.data, tokens: r.dims[1] }), t6.audio_embed_total_tokens += r.dims[1];
  }
}
function QS(t6, e, s) {
  if (t6.audio_embed_queue.length === 0) return;
  let r = e.data, n = 0, o = s;
  for (; o > 0 && t6.audio_embed_queue.length > 0; ) {
    let a = t6.audio_embed_queue[0], i = a.tokens - t6.audio_queue_offset, l = Math.min(o, i), c = t6.audio_queue_offset * t6.text_hidden_size;
    for (let p = 0; p < l * t6.text_hidden_size; ++p) r[n * t6.text_hidden_size + p] += a.data[c + p];
    n += l, o -= l, t6.audio_queue_offset += l, t6.audio_queue_offset >= a.tokens && (t6.audio_embed_queue.shift(), t6.audio_queue_offset = 0);
  }
  t6.audio_consumed += s - o;
}
var Wy = class extends Xt2 {
  constructor(e) {
    super(), this._s = e;
  }
  _call(e) {
    let s = this._s.stream_exhausted && this._s.audio_embed_queue.length === 0;
    return e.map(() => s);
  }
};
var Uc2 = class extends h {
  forward_params = ["input_ids", "attention_mask", "position_ids", "past_key_values"];
};
var qa2 = class extends Uc2 {
  async forward({ input_ids: e, past_key_values: s, ...r }) {
    let n = e.dims[1], o = Gy.get(this);
    o && await XS(o, o.audio_consumed + n);
    let { inputs_embeds: a } = await K(this.sessions.embed_tokens, { input_ids: e });
    o && QS(o, a, n);
    let i = { inputs_embeds: a, ...r };
    kn(this, i, s);
    let l = this.sessions.decoder_model_merged, c = ye2(i, l.inputNames);
    return await K(l, c);
  }
  async generate({ input_features: e, stopping_criteria: s, ...r }) {
    if (!e) throw new Error("input_features (generator/iterable) must be provided");
    let n = HS(this, e);
    Gy.set(this, n);
    let o = new pr2();
    o.push(new Wy(n)), s && o.extend(s);
    try {
      return await super.generate({ ...r, stopping_criteria: o });
    } finally {
      n.enc_kv_cache.dispose(), Gy.delete(this);
    }
  }
};
var Lr = class extends h {
};
var Vy = class extends Lr {
};
var Hy = class extends Lr {
  async _call(e) {
    return new De(await super._call(e));
  }
};
var Ky = class extends Lr {
  async _call(e) {
    return new z(await super._call(e));
  }
};
var jc = class extends ae {
  constructor({ logits: e, embeddings: s }) {
    super(), this.logits = e, this.embeddings = s;
  }
};
var cs2 = class extends h {
};
var Xy = class extends cs2 {
};
var Qy = class extends cs2 {
  async _call(e) {
    return new De(await super._call(e));
  }
};
var Yy = class extends cs2 {
  async _call(e) {
    return new z(await super._call(e));
  }
};
var Jy = class extends cs2 {
  async _call(e) {
    return new jc(await super._call(e));
  }
};
var Zy = class extends cs2 {
  async _call(e) {
    return new te(await super._call(e));
  }
};
var Gc2 = class extends h {
};
var e0 = class extends Gc2 {
};
var Wc2 = class extends vs2 {
  return_timestamps = null;
  return_token_timestamps = null;
  num_frames = null;
  alignment_heads = null;
  task = null;
  language = null;
  no_timestamps_token_id = null;
  prompt_ids = null;
  is_multilingual = null;
  lang_to_id = null;
  task_to_id = null;
  max_initial_timestamp_index = 1;
};
var Ua2 = class extends h {
  requires_attention_mask = false;
  main_input_name = "input_features";
  forward_params = ["input_features", "attention_mask", "decoder_input_ids", "decoder_attention_mask", "past_key_values"];
};
var t0 = class extends Ua2 {
};
var Vc = class extends Ua2 {
  _prepare_generation_config(e, s) {
    return super._prepare_generation_config(e, s, Wc2);
  }
  _retrieve_init_tokens(e) {
    let s = [e.decoder_start_token_id], r = e.language, n = e.task;
    if (e.is_multilingual) {
      r || (R.warn("No language specified - defaulting to English (en)."), r = "en");
      let a = `<|${hk(r)}|>`;
      s.push(e.lang_to_id[a]), s.push(e.task_to_id[n ?? "transcribe"]);
    } else if (r || n) throw new Error("Cannot specify `task` or `language` for an English-only model. If the model is intended to be multilingual, pass `is_multilingual=true` to generate, or update the generation config.");
    return !e.return_timestamps && e.no_timestamps_token_id && s.at(-1) !== e.no_timestamps_token_id ? s.push(e.no_timestamps_token_id) : e.return_timestamps && s.at(-1) === e.no_timestamps_token_id && (R.warn("<|notimestamps|> prompt token is removed from generation_config since `return_timestamps` is set to `true`."), s.pop()), s.filter((o) => o != null);
  }
  async generate({ inputs: e = null, generation_config: s = null, logits_processor: r = null, stopping_criteria: n = null, ...o }) {
    s = this._prepare_generation_config(s, o);
    let a = o.decoder_input_ids instanceof E ? tn2(o.decoder_input_ids) : o.decoder_input_ids ?? this._retrieve_init_tokens(s);
    if (s.return_timestamps && (r ??= new ks2(), r.push(new Cl(s, a))), s.begin_suppress_tokens && (r ??= new ks2(), r.push(new cr2(s.begin_suppress_tokens, a.length))), s.return_token_timestamps) {
      if (!s.alignment_heads) throw new Error("Model generation config has no `alignment_heads`, token-level timestamps not available. See https://gist.github.com/hollance/42e32852f24243b748ae6bc1f985b13a on how to add this property to the generation config.");
      s.task === "translate" && R.warn("Token-level timestamps may not be reliable for task 'translate'."), s.output_attentions = true, s.return_dict_in_generate = true;
    }
    if (s.return_timestamps && !o.max_new_tokens) return this._generate_with_seek({ inputs: e, generation_config: s, logits_processor: r, init_tokens: a, kwargs: o });
    let i = await super.generate({ inputs: e, generation_config: s, logits_processor: r, decoder_input_ids: a, ...o });
    return s.return_token_timestamps && (i.token_timestamps = this._extract_token_timestamps(i, s.alignment_heads, s.num_frames, 0.02, a.length)), i;
  }
  async _generate_with_seek({ inputs: e, generation_config: s, logits_processor: r, init_tokens: n, kwargs: o }) {
    let a = s.no_timestamps_token_id + 1, i = Array.isArray(s.eos_token_id) ? s.eos_token_id[0] : s.eos_token_id, l = s.return_token_timestamps, c = e, p = c.dims[2], u = 2, _ = this.config.max_source_positions, d = u * _, f = 0, m = [], g = [];
    for (; f < p; ) {
      let x = Math.min(f + d, p), y = c.slice(null, null, [f, x]), b, v = y.dims[2];
      if (v < d) {
        let j2 = c.dims[1], ue = new Float32Array(j2 * d), _e = y.data;
        for (let A = 0; A < j2; ++A) ue.set(_e.subarray(A * v, (A + 1) * v), A * d);
        b = new E("float32", ue, [1, j2, d]);
      } else b = y;
      if (r) for (let j2 of r) "begin_index" in j2 && (j2.begin_index = n.length);
      let k = await super.generate({ inputs: b, generation_config: s, logits_processor: r, decoder_input_ids: n, ...o }), T = (l ? k.sequences : k)[0].tolist().map(Number).slice(n.length), $;
      if (l) {
        k.token_timestamps = this._extract_token_timestamps(k, s.alignment_heads, Math.floor((x - f) / u), 0.02, n.length);
        let j2 = f / u * 0.02;
        $ = k.token_timestamps[0].tolist().slice(n.length).map((ue) => ue + j2);
      }
      if (T.length > 0 && T.at(-1) === i && T.pop(), T.length === 0) break;
      let C = T.map((j2) => j2 >= a), D = T.length >= 2 && C[T.length - 1] && !C[T.length - 2], W = [];
      for (let j2 = 0; j2 < T.length - 1; ++j2) C[j2] && C[j2 + 1] && W.push(j2 + 1);
      let V2, B = T.length;
      if (W.length > 0) if (D) V2 = x - f;
      else {
        let j2 = W.at(-1);
        V2 = (T[j2 - 1] - a) * u, B = j2;
      }
      else V2 = x - f;
      let q = Math.floor(f / u), Z = a + 1500;
      for (let j2 = 0; j2 < B; ++j2) T[j2] >= a && (T[j2] = Math.min(T[j2] + q, Z));
      m.push(...T.slice(0, B)), $ && g.push(...$.slice(0, B)), f += V2;
    }
    m.push(i);
    let w = [...n, ...m];
    if (l) {
      let x = new E("int64", w.map(BigInt), [1, w.length]), y = [...new Array(n.length).fill(0), ...g, 0], b = new E("float32", new Float32Array(y), [1, y.length]);
      return { sequences: x, token_timestamps: b };
    }
    return new E("int64", w.map(BigInt), [1, w.length]);
  }
  _extract_token_timestamps(e, s, r = null, n = 0.02, o = 0) {
    if (!e.cross_attentions) throw new Error("Model outputs must contain cross attentions to extract timestamps. This is most likely because the model was not exported with `output_attentions=True`.");
    r == null && R.warn("`num_frames` has not been set, meaning the entire audio will be analyzed. This may lead to inaccurate token-level timestamps for short audios (< 30 seconds).");
    let a = this.config.median_filter_width;
    a === void 0 && (R.warn("Model config has no `median_filter_width`, using default value of 7."), a = 7);
    let i = e.cross_attentions, l = Array.from({ length: this.config.decoder_layers }, (w, x) => ne(i.map((y) => y[x]), 2)), c = Ge(s.map(([w, x]) => {
      if (w >= l.length) throw new Error(`Layer index ${w} is out of bounds for cross attentions (length ${l.length}).`);
      return r ? l[w].slice(null, x, null, [0, r]) : l[w].slice(null, x);
    })).permute(1, 0, 2, 3), [p, u] = qp(c, -2, 0, true), _ = c.clone();
    for (let w = 0; w < _.dims[0]; ++w) {
      let x = _[w];
      for (let y = 0; y < x.dims[0]; ++y) {
        let b = x[y], v = p[w][y][0].data, k = u[w][y][0].data;
        for (let O = 0; O < b.dims[0]; ++O) {
          let T = b[O].data;
          for (let $ = 0; $ < T.length; ++$) T[$] = (T[$] - k[$]) / v[$];
          T.set(Wb(T, a));
        }
      }
    }
    let d = o > 0 ? _.slice(null, null, [o, _.dims[2]], null) : _, f = [Xi(d, 1)], m = e.sequences.dims, g = new E("float32", new Float32Array(m[0] * m[1]), m);
    for (let w = 0; w < m[0]; ++w) {
      let x = f[w].neg().squeeze_(0), [y, b] = Hb(x.tolist()), v = Array.from({ length: y.length - 1 }, ($, C) => y[C + 1] - y[C]), k = Ue([1], v).map(($) => !!$), O = [];
      for (let $ = 0; $ < k.length; ++$) k[$] && O.push(b[$] * n);
      let T = new Array(o).fill(0);
      T.push(...O), O.length > 0 && T.push(O.at(-1)), g[w].data.set(T);
    }
    return g;
  }
};
var s0 = class extends Vc {
};
var ps2 = class extends h {
};
var r0 = class extends ps2 {
};
var n0 = class extends ps2 {
  async _call(e) {
    return new se(await super._call(e));
  }
};
var o0 = class extends ps2 {
  async _call(e) {
    return new z(await super._call(e));
  }
};
var a0 = class extends ps2 {
  async _call(e) {
    return new te(await super._call(e));
  }
};
var i0 = class extends ps2 {
  async _call(e) {
    return new ie2(await super._call(e));
  }
};
var us2 = class extends h {
};
var l0 = class extends us2 {
};
var c0 = class extends us2 {
  async _call(e) {
    return new se(await super._call(e));
  }
};
var p0 = class extends us2 {
  async _call(e) {
    return new z(await super._call(e));
  }
};
var u0 = class extends us2 {
  async _call(e) {
    return new te(await super._call(e));
  }
};
var _0 = class extends us2 {
  async _call(e) {
    return new ie2(await super._call(e));
  }
};
var ja2 = class extends h {
};
var d0 = class extends ja2 {
};
var f0 = class extends ja2 {
  async _call(e) {
    return new Hc(await super._call(e));
  }
};
var Hc = class extends ae {
  constructor({ logits: e, pred_boxes: s }) {
    super(), this.logits = e, this.pred_boxes = s;
  }
};
var Ga2 = class extends h {
};
var m0 = class extends Ga2 {
};
var h0 = class extends Ga2 {
};
var Wa2 = class extends h {
};
var g0 = class extends Wa2 {
};
var x0 = class extends Wa2 {
};
var YS = /* @__PURE__ */ new Map([["bert", "BertModel"], ["eurobert", "EuroBertModel"], ["neobert", "NeoBertModel"], ["modernbert", "ModernBertModel"], ["nomic_bert", "NomicBertModel"], ["roformer", "RoFormerModel"], ["electra", "ElectraModel"], ["esm", "EsmModel"], ["convbert", "ConvBertModel"], ["camembert", "CamembertModel"], ["deberta", "DebertaModel"], ["deberta-v2", "DebertaV2Model"], ["mpnet", "MPNetModel"], ["albert", "AlbertModel"], ["distilbert", "DistilBertModel"], ["roberta", "RobertaModel"], ["xlm", "XLMModel"], ["xlm-roberta", "XLMRobertaModel"], ["clap", "ClapModel"], ["clip", "CLIPModel"], ["clipseg", "CLIPSegModel"], ["chinese_clip", "ChineseCLIPModel"], ["siglip", "SiglipModel"], ["jina_clip", "JinaCLIPModel"], ["mobilebert", "MobileBertModel"], ["squeezebert", "SqueezeBertModel"], ["wav2vec2", "Wav2Vec2Model"], ["wav2vec2-bert", "Wav2Vec2BertModel"], ["unispeech", "UniSpeechModel"], ["unispeech-sat", "UniSpeechSatModel"], ["hubert", "HubertModel"], ["wavlm", "WavLMModel"], ["audio-spectrogram-transformer", "ASTModel"], ["vits", "VitsModel"], ["pyannote", "PyAnnoteModel"], ["wespeaker-resnet", "WeSpeakerResNetModel"], ["detr", "DetrModel"], ["rt_detr", "RTDetrModel"], ["rt_detr_v2", "RTDetrV2Model"], ["rf_detr", "RFDetrModel"], ["d_fine", "DFineModel"], ["table-transformer", "TableTransformerModel"], ["vit", "ViTModel"], ["ijepa", "IJepaModel"], ["pvt", "PvtModel"], ["vit_msn", "ViTMSNModel"], ["vit_mae", "ViTMAEModel"], ["groupvit", "GroupViTModel"], ["fastvit", "FastViTModel"], ["mobilevit", "MobileViTModel"], ["mobilevitv2", "MobileViTV2Model"], ["owlvit", "OwlViTModel"], ["owlv2", "Owlv2Model"], ["beit", "BeitModel"], ["deit", "DeiTModel"], ["hiera", "HieraModel"], ["convnext", "ConvNextModel"], ["convnextv2", "ConvNextV2Model"], ["dinov2", "Dinov2Model"], ["dinov2_with_registers", "Dinov2WithRegistersModel"], ["dinov3_vit", "DINOv3ViTModel"], ["dinov3_convnext", "DINOv3ConvNextModel"], ["resnet", "ResNetModel"], ["swin", "SwinModel"], ["swin2sr", "Swin2SRModel"], ["donut-swin", "DonutSwinModel"], ["yolos", "YolosModel"], ["dpt", "DPTModel"], ["glpn", "GLPNModel"], ["hifigan", "SpeechT5HifiGan"], ["efficientnet", "EfficientNetModel"], ["decision_transformer", "DecisionTransformerModel"], ["patchtst", "PatchTSTModel"], ["patchtsmixer", "PatchTSMixerModel"], ["mobilenet_v1", "MobileNetV1Model"], ["mobilenet_v2", "MobileNetV2Model"], ["mobilenet_v3", "MobileNetV3Model"], ["mobilenet_v4", "MobileNetV4Model"], ["maskformer", "MaskFormerModel"], ["mgp-str", "MgpstrForSceneTextRecognition"], ["style_text_to_speech_2", "StyleTextToSpeech2Model"], ["openai_privacy_filter", "OpenAIPrivacyFilterModel"], ["embedding_gemma2", "EmbeddingGemma2Model"]]);
var JS = /* @__PURE__ */ new Map([["t5", "T5Model"], ["longt5", "LongT5Model"], ["mt5", "MT5Model"], ["bart", "BartModel"], ["mbart", "MBartModel"], ["marian", "MarianModel"], ["whisper", "WhisperModel"], ["cohere_asr", "CohereAsrModel"], ["m2m_100", "M2M100Model"], ["blenderbot", "BlenderbotModel"], ["blenderbot-small", "BlenderbotSmallModel"]]);
var ZS = /* @__PURE__ */ new Map([["mimi", "MimiModel"], ["dac", "DacModel"], ["snac", "SnacModel"]]);
var eO = /* @__PURE__ */ new Map([["bloom", "BloomModel"], ["jais", "JAISModel"], ["gpt2", "GPT2Model"], ["gpt_oss", "GptOssModel"], ["gptj", "GPTJModel"], ["gpt_bigcode", "GPTBigCodeModel"], ["gpt_neo", "GPTNeoModel"], ["gpt_neox", "GPTNeoXModel"], ["codegen", "CodeGenModel"], ["llama", "LlamaModel"], ["apertus", "ApertusModel"], ["nanochat", "NanoChatModel"], ["arcee", "ArceeModel"], ["afmoe", "AfmoeModel"], ["lfm2", "Lfm2Model"], ["lfm2_moe", "Lfm2MoeModel"], ["smollm3", "SmolLM3Model"], ["exaone", "ExaoneModel"], ["olmo", "OlmoModel"], ["olmo2", "Olmo2Model"], ["olmo3", "Olmo3Model"], ["olmo_hybrid", "OlmoHybridModel"], ["mobilellm", "MobileLLMModel"], ["granite", "GraniteModel"], ["granitemoehybrid", "GraniteMoeHybridModel"], ["cohere", "CohereModel"], ["cohere2", "Cohere2Model"], ["gemma", "GemmaModel"], ["gemma2", "Gemma2Model"], ["vaultgemma", "VaultGemmaModel"], ["gemma3_text", "Gemma3Model"], ["helium", "HeliumModel"], ["glm", "GlmModel"], ["glm_moe_dsa", "GlmMoeDsaModel"], ["openelm", "OpenELMModel"], ["qwen2", "Qwen2Model"], ["qwen2_moe", "Qwen2MoeModel"], ["qwen3", "Qwen3Model"], ["qwen3_moe", "Qwen3MoeModel"], ["qwen3_next", "Qwen3NextModel"], ["phi", "PhiModel"], ["phi3", "Phi3Model"], ["mpt", "MptModel"], ["opt", "OPTModel"], ["mistral", "MistralModel"], ["mistral4", "Mistral4Model"], ["ministral", "MinistralModel"], ["ministral3", "Ministral3Model"], ["ernie4_5", "Ernie4_5ForCausalLM"], ["starcoder2", "Starcoder2Model"], ["deepseek_v3", "DeepseekV3Model"], ["deepseek_v4", "DeepseekV4Model"], ["falcon", "FalconModel"], ["falcon_h1", "FalconH1Model"], ["nemotron_h", "NemotronHModel"], ["solar_open", "SolarOpenModel"], ["stablelm", "StableLmModel"], ["modernbert-decoder", "ModernBertDecoderModel"], ["hunyuan_v1_dense", "HunYuanDenseV1Model"], ["youtu", "YoutuModel"], ["zaya", "ZayaModel"], ["hrm_text", "HrmTextModel"]]);
var Hk = /* @__PURE__ */ new Map([["speecht5", "SpeechT5ForSpeechToText"], ["whisper", "WhisperForConditionalGeneration"], ["lite-whisper", "LiteWhisperForConditionalGeneration"], ["moonshine", "MoonshineForConditionalGeneration"], ["cohere_asr", "CohereAsrForConditionalGeneration"]]);
var Kk = /* @__PURE__ */ new Map([["speecht5", "SpeechT5ForTextToSpeech"]]);
var Xk = /* @__PURE__ */ new Map([["vits", "VitsModel"], ["musicgen", "MusicgenForConditionalGeneration"], ["supertonic", "SupertonicForConditionalGeneration"]]);
var Qk = /* @__PURE__ */ new Map([["bert", "BertForSequenceClassification"], ["eurobert", "EuroBertForSequenceClassification"], ["neobert", "NeoBertForSequenceClassification"], ["modernbert", "ModernBertForSequenceClassification"], ["roformer", "RoFormerForSequenceClassification"], ["electra", "ElectraForSequenceClassification"], ["esm", "EsmForSequenceClassification"], ["convbert", "ConvBertForSequenceClassification"], ["camembert", "CamembertForSequenceClassification"], ["deberta", "DebertaForSequenceClassification"], ["deberta-v2", "DebertaV2ForSequenceClassification"], ["mpnet", "MPNetForSequenceClassification"], ["albert", "AlbertForSequenceClassification"], ["distilbert", "DistilBertForSequenceClassification"], ["roberta", "RobertaForSequenceClassification"], ["xlm", "XLMForSequenceClassification"], ["xlm-roberta", "XLMRobertaForSequenceClassification"], ["bart", "BartForSequenceClassification"], ["mbart", "MBartForSequenceClassification"], ["mobilebert", "MobileBertForSequenceClassification"], ["squeezebert", "SqueezeBertForSequenceClassification"]]);
var Yk = /* @__PURE__ */ new Map([["bert", "BertForTokenClassification"], ["eurobert", "EuroBertForTokenClassification"], ["neobert", "NeoBertForTokenClassification"], ["modernbert", "ModernBertForTokenClassification"], ["roformer", "RoFormerForTokenClassification"], ["electra", "ElectraForTokenClassification"], ["esm", "EsmForTokenClassification"], ["convbert", "ConvBertForTokenClassification"], ["camembert", "CamembertForTokenClassification"], ["deberta", "DebertaForTokenClassification"], ["deberta-v2", "DebertaV2ForTokenClassification"], ["mpnet", "MPNetForTokenClassification"], ["distilbert", "DistilBertForTokenClassification"], ["roberta", "RobertaForTokenClassification"], ["xlm", "XLMForTokenClassification"], ["xlm-roberta", "XLMRobertaForTokenClassification"], ["openai_privacy_filter", "OpenAIPrivacyFilterForTokenClassification"]]);
var Jk = /* @__PURE__ */ new Map([["t5", "T5ForConditionalGeneration"], ["longt5", "LongT5ForConditionalGeneration"], ["mt5", "MT5ForConditionalGeneration"], ["bart", "BartForConditionalGeneration"], ["mbart", "MBartForConditionalGeneration"], ["marian", "MarianMTModel"], ["m2m_100", "M2M100ForConditionalGeneration"], ["blenderbot", "BlenderbotForConditionalGeneration"], ["blenderbot-small", "BlenderbotSmallForConditionalGeneration"]]);
var Zk = /* @__PURE__ */ new Map([["bloom", "BloomForCausalLM"], ["gpt2", "GPT2LMHeadModel"], ["gpt_oss", "GptOssForCausalLM"], ["jais", "JAISLMHeadModel"], ["gptj", "GPTJForCausalLM"], ["gpt_bigcode", "GPTBigCodeForCausalLM"], ["gpt_neo", "GPTNeoForCausalLM"], ["gpt_neox", "GPTNeoXForCausalLM"], ["codegen", "CodeGenForCausalLM"], ["llama", "LlamaForCausalLM"], ["nanochat", "NanoChatForCausalLM"], ["apertus", "ApertusForCausalLM"], ["llama4_text", "Llama4ForCausalLM"], ["arcee", "ArceeForCausalLM"], ["afmoe", "AfmoeForCausalLM"], ["lfm2", "Lfm2ForCausalLM"], ["lfm2_moe", "Lfm2MoeForCausalLM"], ["smollm3", "SmolLM3ForCausalLM"], ["exaone", "ExaoneForCausalLM"], ["olmo", "OlmoForCausalLM"], ["olmo2", "Olmo2ForCausalLM"], ["olmo3", "Olmo3ForCausalLM"], ["olmo_hybrid", "OlmoHybridForCausalLM"], ["mobilellm", "MobileLLMForCausalLM"], ["granite", "GraniteForCausalLM"], ["granitemoehybrid", "GraniteMoeHybridForCausalLM"], ["cohere", "CohereForCausalLM"], ["cohere2", "Cohere2ForCausalLM"], ["gemma", "GemmaForCausalLM"], ["gemma2", "Gemma2ForCausalLM"], ["vaultgemma", "VaultGemmaForCausalLM"], ["gemma3_text", "Gemma3ForCausalLM"], ["gemma3", "Gemma3ForCausalLM"], ["helium", "HeliumForCausalLM"], ["glm", "GlmForCausalLM"], ["glm_moe_dsa", "GlmMoeDsaForCausalLM"], ["openelm", "OpenELMForCausalLM"], ["qwen2", "Qwen2ForCausalLM"], ["qwen2_moe", "Qwen2MoeForCausalLM"], ["qwen3", "Qwen3ForCausalLM"], ["qwen3_moe", "Qwen3MoeForCausalLM"], ["qwen3_next", "Qwen3NextForCausalLM"], ["qwen2_vl", "Qwen2VLForCausalLM"], ["qwen2_5_vl", "Qwen2_5_VLForCausalLM"], ["qwen3_vl", "Qwen3VLForCausalLM"], ["qwen3_vl_moe", "Qwen3VLMoeForCausalLM"], ["qwen3_5", "Qwen3_5ForCausalLM"], ["qwen3_5_text", "Qwen3_5ForCausalLM"], ["qwen3_5_moe", "Qwen3_5MoeForCausalLM"], ["gemma3n", "Gemma3nForCausalLM"], ["gemma4", "Gemma4ForCausalLM"], ["phi", "PhiForCausalLM"], ["phi3", "Phi3ForCausalLM"], ["mpt", "MptForCausalLM"], ["opt", "OPTForCausalLM"], ["mbart", "MBartForCausalLM"], ["mistral", "MistralForCausalLM"], ["mistral4", "Mistral4ForCausalLM"], ["ministral", "MinistralForCausalLM"], ["ministral3", "Ministral3ForCausalLM"], ["ernie4_5", "Ernie4_5ForCausalLM"], ["starcoder2", "Starcoder2ForCausalLM"], ["deepseek_v3", "DeepseekV3ForCausalLM"], ["deepseek_v4", "DeepseekV4ForCausalLM"], ["falcon", "FalconForCausalLM"], ["falcon_h1", "FalconH1ForCausalLM"], ["nemotron_h", "NemotronHForCausalLM"], ["trocr", "TrOCRForCausalLM"], ["solar_open", "SolarOpenForCausalLM"], ["stablelm", "StableLmForCausalLM"], ["modernbert-decoder", "ModernBertDecoderForCausalLM"], ["hunyuan_v1_dense", "HunYuanDenseV1ForCausalLM"], ["youtu", "YoutuForCausalLM"], ["zaya", "ZayaForCausalLM"], ["hrm_text", "HrmTextForCausalLM"], ["phi3_v", "Phi3VForCausalLM"]]);
var tO = /* @__PURE__ */ new Map([["multi_modality", "MultiModalityCausalLM"]]);
var e1 = /* @__PURE__ */ new Map([["bert", "BertForMaskedLM"], ["eurobert", "EuroBertForMaskedLM"], ["neobert", "NeoBertForMaskedLM"], ["modernbert", "ModernBertForMaskedLM"], ["roformer", "RoFormerForMaskedLM"], ["electra", "ElectraForMaskedLM"], ["esm", "EsmForMaskedLM"], ["convbert", "ConvBertForMaskedLM"], ["camembert", "CamembertForMaskedLM"], ["deberta", "DebertaForMaskedLM"], ["deberta-v2", "DebertaV2ForMaskedLM"], ["mpnet", "MPNetForMaskedLM"], ["albert", "AlbertForMaskedLM"], ["distilbert", "DistilBertForMaskedLM"], ["roberta", "RobertaForMaskedLM"], ["xlm", "XLMWithLMHeadModel"], ["xlm-roberta", "XLMRobertaForMaskedLM"], ["mobilebert", "MobileBertForMaskedLM"], ["squeezebert", "SqueezeBertForMaskedLM"]]);
var t1 = /* @__PURE__ */ new Map([["bert", "BertForQuestionAnswering"], ["neobert", "NeoBertForQuestionAnswering"], ["roformer", "RoFormerForQuestionAnswering"], ["electra", "ElectraForQuestionAnswering"], ["convbert", "ConvBertForQuestionAnswering"], ["camembert", "CamembertForQuestionAnswering"], ["deberta", "DebertaForQuestionAnswering"], ["deberta-v2", "DebertaV2ForQuestionAnswering"], ["mpnet", "MPNetForQuestionAnswering"], ["albert", "AlbertForQuestionAnswering"], ["distilbert", "DistilBertForQuestionAnswering"], ["roberta", "RobertaForQuestionAnswering"], ["xlm", "XLMForQuestionAnswering"], ["xlm-roberta", "XLMRobertaForQuestionAnswering"], ["mobilebert", "MobileBertForQuestionAnswering"], ["squeezebert", "SqueezeBertForQuestionAnswering"]]);
var s1 = /* @__PURE__ */ new Map([["vision-encoder-decoder", "VisionEncoderDecoderModel"], ["idefics3", "Idefics3ForConditionalGeneration"], ["smolvlm", "SmolVLMForConditionalGeneration"]]);
var r1 = /* @__PURE__ */ new Map([["llava", "LlavaForConditionalGeneration"], ["llava_onevision", "LlavaOnevisionForConditionalGeneration"], ["moondream1", "Moondream1ForConditionalGeneration"], ["florence2", "Florence2ForConditionalGeneration"], ["qwen2_vl", "Qwen2VLForConditionalGeneration"], ["qwen2_5_vl", "Qwen2_5_VLForConditionalGeneration"], ["qwen3_vl", "Qwen3VLForConditionalGeneration"], ["qwen3_vl_moe", "Qwen3VLMoeForConditionalGeneration"], ["qwen3_5", "Qwen3_5ForConditionalGeneration"], ["qwen3_5_moe", "Qwen3_5MoeForConditionalGeneration"], ["lfm2_vl", "Lfm2VlForConditionalGeneration"], ["idefics3", "Idefics3ForConditionalGeneration"], ["smolvlm", "SmolVLMForConditionalGeneration"], ["paligemma", "PaliGemmaForConditionalGeneration"], ["llava_qwen2", "LlavaQwen2ForCausalLM"], ["gemma3", "Gemma3ForConditionalGeneration"], ["gemma3n", "Gemma3nForConditionalGeneration"], ["gemma4", "Gemma4ForConditionalGeneration"], ["mistral3", "Mistral3ForConditionalGeneration"], ["lighton_ocr", "LightOnOcrForConditionalGeneration"], ["glm_ocr", "GlmOcrForConditionalGeneration"]]);
var n1 = /* @__PURE__ */ new Map([["granite_speech", "GraniteSpeechForConditionalGeneration"], ["ultravox", "UltravoxModel"], ["voxtral", "VoxtralForConditionalGeneration"], ["voxtral_realtime", "VoxtralRealtimeForConditionalGeneration"]]);
var sO = /* @__PURE__ */ new Map([["vision-encoder-decoder", "VisionEncoderDecoderModel"]]);
var o1 = /* @__PURE__ */ new Map([["vit", "ViTForImageClassification"], ["ijepa", "IJepaForImageClassification"], ["pvt", "PvtForImageClassification"], ["vit_msn", "ViTMSNForImageClassification"], ["fastvit", "FastViTForImageClassification"], ["mobilevit", "MobileViTForImageClassification"], ["mobilevitv2", "MobileViTV2ForImageClassification"], ["beit", "BeitForImageClassification"], ["deit", "DeiTForImageClassification"], ["hiera", "HieraForImageClassification"], ["convnext", "ConvNextForImageClassification"], ["convnextv2", "ConvNextV2ForImageClassification"], ["dinov2", "Dinov2ForImageClassification"], ["dinov2_with_registers", "Dinov2WithRegistersForImageClassification"], ["resnet", "ResNetForImageClassification"], ["swin", "SwinForImageClassification"], ["segformer", "SegformerForImageClassification"], ["efficientnet", "EfficientNetForImageClassification"], ["mobilenet_v1", "MobileNetV1ForImageClassification"], ["mobilenet_v2", "MobileNetV2ForImageClassification"], ["mobilenet_v3", "MobileNetV3ForImageClassification"], ["mobilenet_v4", "MobileNetV4ForImageClassification"]]);
var a1 = /* @__PURE__ */ new Map([["detr", "DetrForObjectDetection"], ["rt_detr", "RTDetrForObjectDetection"], ["rt_detr_v2", "RTDetrV2ForObjectDetection"], ["rf_detr", "RFDetrForObjectDetection"], ["d_fine", "DFineForObjectDetection"], ["table-transformer", "TableTransformerForObjectDetection"], ["yolos", "YolosForObjectDetection"]]);
var i1 = /* @__PURE__ */ new Map([["owlvit", "OwlViTForObjectDetection"], ["owlv2", "Owlv2ForObjectDetection"], ["grounding-dino", "GroundingDinoForObjectDetection"]]);
var $r = /* @__PURE__ */ new Map([["detr", "DetrForSegmentation"], ["clipseg", "CLIPSegForImageSegmentation"]]);
var l1 = /* @__PURE__ */ new Map([["segformer", "SegformerForSemanticSegmentation"], ["sapiens", "SapiensForSemanticSegmentation"], ["swin", "SwinForSemanticSegmentation"], ["mobilenet_v1", "MobileNetV1ForSemanticSegmentation"], ["mobilenet_v2", "MobileNetV2ForSemanticSegmentation"], ["mobilenet_v3", "MobileNetV3ForSemanticSegmentation"], ["mobilenet_v4", "MobileNetV4ForSemanticSegmentation"]]);
var c1 = /* @__PURE__ */ new Map([["detr", "DetrForSegmentation"], ["maskformer", "MaskFormerForInstanceSegmentation"]]);
var p1 = /* @__PURE__ */ new Map([["sam", "SamModel"], ["sam2", "Sam2Model"], ["edgetam", "EdgeTamModel"], ["sam3_tracker", "Sam3TrackerModel"]]);
var u1 = /* @__PURE__ */ new Map([["wav2vec2", "Wav2Vec2ForCTC"], ["wav2vec2-bert", "Wav2Vec2BertForCTC"], ["unispeech", "UniSpeechForCTC"], ["unispeech-sat", "UniSpeechSatForCTC"], ["wavlm", "WavLMForCTC"], ["hubert", "HubertForCTC"], ["parakeet_ctc", "ParakeetForCTC"]]);
var _1 = /* @__PURE__ */ new Map([["wav2vec2", "Wav2Vec2ForSequenceClassification"], ["wav2vec2-bert", "Wav2Vec2BertForSequenceClassification"], ["unispeech", "UniSpeechForSequenceClassification"], ["unispeech-sat", "UniSpeechSatForSequenceClassification"], ["wavlm", "WavLMForSequenceClassification"], ["hubert", "HubertForSequenceClassification"], ["audio-spectrogram-transformer", "ASTForAudioClassification"]]);
var d1 = /* @__PURE__ */ new Map([["wavlm", "WavLMForXVector"]]);
var f1 = /* @__PURE__ */ new Map([["unispeech-sat", "UniSpeechSatForAudioFrameClassification"], ["wavlm", "WavLMForAudioFrameClassification"], ["wav2vec2", "Wav2Vec2ForAudioFrameClassification"], ["pyannote", "PyAnnoteForAudioFrameClassification"]]);
var m1 = /* @__PURE__ */ new Map([["vitmatte", "VitMatteForImageMatting"]]);
var rO = /* @__PURE__ */ new Map([["patchtst", "PatchTSTForPrediction"], ["patchtsmixer", "PatchTSMixerForPrediction"]]);
var h1 = /* @__PURE__ */ new Map([["swin2sr", "Swin2SRForImageSuperResolution"]]);
var g1 = /* @__PURE__ */ new Map([["chmv2", "CHMv2ForDepthEstimation"], ["dpt", "DPTForDepthEstimation"], ["depth_anything", "DepthAnythingForDepthEstimation"], ["glpn", "GLPNForDepthEstimation"], ["sapiens", "SapiensForDepthEstimation"], ["depth_pro", "DepthProForDepthEstimation"], ["metric3d", "Metric3DForDepthEstimation"], ["metric3dv2", "Metric3Dv2ForDepthEstimation"]]);
var x1 = /* @__PURE__ */ new Map([["sapiens", "SapiensForNormalEstimation"]]);
var w1 = /* @__PURE__ */ new Map([["vitpose", "VitPoseForPoseEstimation"]]);
var y1 = /* @__PURE__ */ new Map([["clip", "CLIPVisionModelWithProjection"], ["siglip", "SiglipVisionModel"], ["jina_clip", "JinaCLIPVisionModel"]]);
var w0 = [[YS, P.EncoderOnly], [JS, P.EncoderDecoder], [eO, P.DecoderOnlyWithoutHead], [ZS, P.AutoEncoder], [Qk, P.EncoderOnly], [Yk, P.EncoderOnly], [Jk, P.Seq2Seq], [Hk, P.Seq2Seq], [Zk, P.DecoderOnly], [tO, P.MultiModality], [e1, P.EncoderOnly], [t1, P.EncoderOnly], [s1, P.Vision2Seq], [r1, P.ImageTextToText], [n1, P.AudioTextToText], [o1, P.EncoderOnly], [$r, P.EncoderOnly], [c1, P.EncoderOnly], [l1, P.EncoderOnly], [m1, P.EncoderOnly], [rO, P.EncoderOnly], [h1, P.EncoderOnly], [g1, P.EncoderOnly], [x1, P.EncoderOnly], [w1, P.EncoderOnly], [a1, P.EncoderOnly], [i1, P.EncoderOnly], [p1, P.MaskGeneration], [u1, P.EncoderOnly], [_1, P.EncoderOnly], [Kk, P.Seq2Seq], [Xk, P.EncoderOnly], [d1, P.EncoderOnly], [f1, P.EncoderOnly], [y1, P.EncoderOnly]];
for (let [t6, e] of w0) for (let s of t6.values()) {
  ht.set(s, e);
  let r = Va2[s];
  Ms2.set(r, s), Vl.set(s, r);
}
var nO = [["MusicgenForConditionalGeneration", Qo, P.Musicgen], ["Phi3VForCausalLM", _a2, P.Phi3V], ["CLIPTextModelWithProjection", Nn, P.EncoderOnly], ["SiglipTextModel", Sa, P.EncoderOnly], ["JinaCLIPTextModel", Oo, P.EncoderOnly], ["ClapTextModelWithProjection", Cn, P.EncoderOnly], ["ClapAudioModelWithProjection", Pn, P.EncoderOnly], ["DacEncoderModel", Gn, P.EncoderOnly], ["DacDecoderModel", Wn, P.EncoderOnly], ["MimiEncoderModel", $o, P.EncoderOnly], ["MimiDecoderModel", Ro, P.EncoderOnly], ["SnacEncoderModel", Ia, P.EncoderOnly], ["SnacDecoderModel", Ta, P.EncoderOnly], ["Gemma3nForConditionalGeneration", ns2, P.ImageAudioTextToText], ["Gemma4ForConditionalGeneration", yr2, P.ImageAudioTextToText], ["SupertonicForConditionalGeneration", Na2, P.Supertonic], ["ChatterboxModel", zn, P.Chatterbox], ["EmbeddingGemma2Model", Zn, P.MultimodalEncoder], ["VoxtralRealtimeForConditionalGeneration", qa2, P.VoxtralRealtime]];
for (let [t6, e, s] of nO) ht.set(t6, s), Ms2.set(e, t6), Vl.set(t6, e);
var b1 = /* @__PURE__ */ new Map([["modnet", $r], ["birefnet", $r], ["isnet", $r], ["ben", $r]]);
for (let [t6, e] of b1.entries()) e.set(t6, "PreTrainedModel"), ht.set(t6, P.EncoderOnly), Vl.set(t6, h);
var k1 = new Set(b1.keys());
ht.set("PreTrainedModel", P.EncoderOnly);
Ms2.set(h, "PreTrainedModel");
var me = { MODEL_FOR_SEQUENCE_CLASSIFICATION_MAPPING_NAMES: Qk, MODEL_FOR_TOKEN_CLASSIFICATION_MAPPING_NAMES: Yk, MODEL_FOR_TEXT_TO_SPECTROGRAM_MAPPING_NAMES: Kk, MODEL_FOR_TEXT_TO_WAVEFORM_MAPPING_NAMES: Xk, MODEL_FOR_MASKED_LM_MAPPING_NAMES: e1, MODEL_FOR_QUESTION_ANSWERING_MAPPING_NAMES: t1, MODEL_FOR_IMAGE_CLASSIFICATION_MAPPING_NAMES: o1, MODEL_FOR_IMAGE_SEGMENTATION_MAPPING_NAMES: $r, MODEL_FOR_SEMANTIC_SEGMENTATION_MAPPING_NAMES: l1, MODEL_FOR_UNIVERSAL_SEGMENTATION_MAPPING_NAMES: c1, MODEL_FOR_OBJECT_DETECTION_MAPPING_NAMES: a1, MODEL_FOR_ZERO_SHOT_OBJECT_DETECTION_MAPPING_NAMES: i1, MODEL_FOR_MASK_GENERATION_MAPPING_NAMES: p1, MODEL_FOR_CTC_MAPPING_NAMES: u1, MODEL_FOR_AUDIO_CLASSIFICATION_MAPPING_NAMES: _1, MODEL_FOR_AUDIO_XVECTOR_MAPPING_NAMES: d1, MODEL_FOR_AUDIO_FRAME_CLASSIFICATION_MAPPING_NAMES: f1, MODEL_FOR_DOCUMENT_QUESTION_ANSWERING_MAPPING_NAMES: sO, MODEL_FOR_IMAGE_MATTING_MAPPING_NAMES: m1, MODEL_FOR_IMAGE_TO_IMAGE_MAPPING_NAMES: h1, MODEL_FOR_DEPTH_ESTIMATION_MAPPING_NAMES: g1, MODEL_FOR_NORMAL_ESTIMATION_MAPPING_NAMES: x1, MODEL_FOR_POSE_ESTIMATION_MAPPING_NAMES: w1, MODEL_FOR_IMAGE_FEATURE_EXTRACTION_MAPPING_NAMES: y1, MODEL_FOR_IMAGE_TEXT_TO_TEXT_MAPPING_NAMES: r1, MODEL_FOR_AUDIO_TEXT_TO_TEXT_MAPPING_NAMES: n1, MODEL_FOR_SEQ_TO_SEQ_CAUSAL_LM_MAPPING_NAMES: Jk, MODEL_FOR_SPEECH_SEQ_2_SEQ_MAPPING_NAMES: Hk, MODEL_FOR_CAUSAL_LM_MAPPING_NAMES: Zk, MODEL_FOR_VISION_2_SEQ_MAPPING_NAMES: s1 };
Uk(me);
var de = class {
  static MODEL_CLASS_MAPPINGS = null;
  static BASE_IF_FAIL = false;
  static supports(e) {
    if (!this.MODEL_CLASS_MAPPINGS) return false;
    for (let s of this.MODEL_CLASS_MAPPINGS) if (s.has(e)) return true;
    return this.BASE_IF_FAIL;
  }
  static async from_pretrained(e, { progress_callback: s = null, config: r = null, cache_dir: n = null, local_files_only: o = false, revision: a = "main", model_file_name: i = null, subfolder: l = "onnx", device: c = null, dtype: p = null, use_external_data_format: u = null, session_options: _ = {} } = {}) {
    let d = { progress_callback: s, config: r, cache_dir: n, local_files_only: o, revision: a, model_file_name: i, subfolder: l, device: c, dtype: p, use_external_data_format: u, session_options: _ };
    if (d.config = await at2.from_pretrained(e, d), !this.MODEL_CLASS_MAPPINGS) throw new Error("`MODEL_CLASS_MAPPINGS` not implemented for this type of `AutoClass`: " + this.name);
    let { model_type: f } = d.config;
    for (let m of this.MODEL_CLASS_MAPPINGS) {
      let g = m.get(f);
      if (!g) {
        for (let w of m.values()) if (w[0] === f) {
          g = w;
          break;
        }
        if (!g) continue;
      }
      return await Va2[g].from_pretrained(e, d);
    }
    if (this.BASE_IF_FAIL) return k1.has(f) || R.warn(`Unknown model class "${f}", attempting to construct from base class.`), await h.from_pretrained(e, d);
    throw Error(`Unsupported model type: ${f}`);
  }
};
var It2 = class extends de {
  static MODEL_CLASS_MAPPINGS = w0.map((e) => e[0]);
  static BASE_IF_FAIL = true;
};
var Ha2 = class extends de {
  static MODEL_CLASS_MAPPINGS = [me.MODEL_FOR_SEQUENCE_CLASSIFICATION_MAPPING_NAMES];
};
var Kc = class extends de {
  static MODEL_CLASS_MAPPINGS = [me.MODEL_FOR_TOKEN_CLASSIFICATION_MAPPING_NAMES];
};
var Rr = class extends de {
  static MODEL_CLASS_MAPPINGS = [me.MODEL_FOR_SEQ_TO_SEQ_CAUSAL_LM_MAPPING_NAMES];
};
var Xc = class extends de {
  static MODEL_CLASS_MAPPINGS = [me.MODEL_FOR_SPEECH_SEQ_2_SEQ_MAPPING_NAMES];
};
var Qc = class extends de {
  static MODEL_CLASS_MAPPINGS = [me.MODEL_FOR_TEXT_TO_SPECTROGRAM_MAPPING_NAMES];
};
var Yc = class extends de {
  static MODEL_CLASS_MAPPINGS = [me.MODEL_FOR_TEXT_TO_WAVEFORM_MAPPING_NAMES];
};
var Jc = class extends de {
  static MODEL_CLASS_MAPPINGS = [me.MODEL_FOR_CAUSAL_LM_MAPPING_NAMES];
};
var Zc = class extends de {
  static MODEL_CLASS_MAPPINGS = [me.MODEL_FOR_MASKED_LM_MAPPING_NAMES];
};
var ep = class extends de {
  static MODEL_CLASS_MAPPINGS = [me.MODEL_FOR_QUESTION_ANSWERING_MAPPING_NAMES];
};
var tp = class extends de {
  static MODEL_CLASS_MAPPINGS = [me.MODEL_FOR_VISION_2_SEQ_MAPPING_NAMES];
};
var sp = class extends de {
  static MODEL_CLASS_MAPPINGS = [me.MODEL_FOR_IMAGE_CLASSIFICATION_MAPPING_NAMES];
};
var Ka2 = class extends de {
  static MODEL_CLASS_MAPPINGS = [me.MODEL_FOR_IMAGE_SEGMENTATION_MAPPING_NAMES];
};
var Xa2 = class extends de {
  static MODEL_CLASS_MAPPINGS = [me.MODEL_FOR_SEMANTIC_SEGMENTATION_MAPPING_NAMES];
};
var Qa2 = class extends de {
  static MODEL_CLASS_MAPPINGS = [me.MODEL_FOR_UNIVERSAL_SEGMENTATION_MAPPING_NAMES];
};
var rp = class extends de {
  static MODEL_CLASS_MAPPINGS = [me.MODEL_FOR_OBJECT_DETECTION_MAPPING_NAMES];
};
var np = class extends de {
  static MODEL_CLASS_MAPPINGS = [me.MODEL_FOR_ZERO_SHOT_OBJECT_DETECTION_MAPPING_NAMES];
};
var v1 = class extends de {
  static MODEL_CLASS_MAPPINGS = [me.MODEL_FOR_MASK_GENERATION_MAPPING_NAMES];
};
var op = class extends de {
  static MODEL_CLASS_MAPPINGS = [me.MODEL_FOR_CTC_MAPPING_NAMES];
};
var ap = class extends de {
  static MODEL_CLASS_MAPPINGS = [me.MODEL_FOR_AUDIO_CLASSIFICATION_MAPPING_NAMES];
};
var E1 = class extends de {
  static MODEL_CLASS_MAPPINGS = [me.MODEL_FOR_AUDIO_XVECTOR_MAPPING_NAMES];
};
var A1 = class extends de {
  static MODEL_CLASS_MAPPINGS = [me.MODEL_FOR_AUDIO_FRAME_CLASSIFICATION_MAPPING_NAMES];
};
var ip = class extends de {
  static MODEL_CLASS_MAPPINGS = [me.MODEL_FOR_DOCUMENT_QUESTION_ANSWERING_MAPPING_NAMES];
};
var M1 = class extends de {
  static MODEL_CLASS_MAPPINGS = [me.MODEL_FOR_IMAGE_MATTING_MAPPING_NAMES];
};
var lp = class extends de {
  static MODEL_CLASS_MAPPINGS = [me.MODEL_FOR_IMAGE_TO_IMAGE_MAPPING_NAMES];
};
var cp = class extends de {
  static MODEL_CLASS_MAPPINGS = [me.MODEL_FOR_DEPTH_ESTIMATION_MAPPING_NAMES];
};
var S1 = class extends de {
  static MODEL_CLASS_MAPPINGS = [me.MODEL_FOR_NORMAL_ESTIMATION_MAPPING_NAMES];
};
var O1 = class extends de {
  static MODEL_CLASS_MAPPINGS = [me.MODEL_FOR_POSE_ESTIMATION_MAPPING_NAMES];
};
var pp = class extends de {
  static MODEL_CLASS_MAPPINGS = [me.MODEL_FOR_IMAGE_FEATURE_EXTRACTION_MAPPING_NAMES];
};
var I1 = class extends de {
  static MODEL_CLASS_MAPPINGS = [me.MODEL_FOR_IMAGE_TEXT_TO_TEXT_MAPPING_NAMES];
};
var T1 = class extends de {
  static MODEL_CLASS_MAPPINGS = [me.MODEL_FOR_AUDIO_TEXT_TO_TEXT_MAPPING_NAMES];
};
async function Ie(t6) {
  return Array.isArray(t6) || (t6 = [t6]), await Promise.all(t6.map((e) => Se.read(e)));
}
async function Tt(t6, e) {
  return Array.isArray(t6) || (t6 = [t6]), await Promise.all(t6.map((s) => typeof s == "string" || s instanceof URL ? Fu(s, e) : s instanceof Float64Array ? new Float32Array(s) : s));
}
function Ya2(t6, e) {
  e && (t6 = t6.map((a) => a | 0));
  let [s, r, n, o] = t6;
  return { xmin: s, ymin: r, xmax: n, ymax: o };
}
var Y = class extends xe {
  constructor({ task: e, model: s, tokenizer: r = null, processor: n = null }) {
    super(), this.task = e, this.model = s, this.tokenizer = r, this.processor = n;
  }
  async dispose() {
    await this.model.dispose();
  }
};
var Ja2 = class extends Y {
  async _call(e, { top_k: s = 1 } = {}) {
    let r = this.tokenizer(e, { padding: true, truncation: true }), n = await this.model(r), { problem_type: o, id2label: a } = this.model.config, i = o === "multi_label_classification" ? (c) => c.sigmoid() : (c) => new E("float32", ge(c.data), c.dims), l = [];
    for (let c of n.logits) {
      let p = i(c), u = await mt(p, s), _ = u[0].tolist(), f = u[1].tolist().map((m, g) => ({ label: a ? a[m] : `LABEL_${m}`, score: _[g] }));
      s === 1 ? l.push(...f) : l.push(f);
    }
    return Array.isArray(e) || s === 1 ? l : l[0];
  }
};
var Za2 = class extends Y {
  async _call(e, { ignore_labels: s = ["O"], aggregation_strategy: r = "none" } = {}) {
    if (r !== "none" && r !== "simple") throw new Error(`Invalid aggregation_strategy: "${r}". Must be one of "none" or "simple".`);
    let n = Array.isArray(e), o = this.tokenizer(n ? e : [e], { padding: true, truncation: true }), i = (await this.model(o)).logits, l = this.model.config.id2label, c = [];
    for (let p = 0; p < i.dims[0]; ++p) {
      let u = o.input_ids[p].tolist(), _ = i[p], d = [];
      for (let f = 0; f < _.dims[0]; ++f) {
        let m = _[f], g = fe(m.data)[1], w = l ? l[g] : `LABEL_${g}`;
        if (s.includes(w)) continue;
        let x = this.tokenizer.decode([u[f]], { skip_special_tokens: true });
        if (x === "") continue;
        let y = ge(m.data);
        d.push({ entity: w, score: y[g], index: f, word: x });
      }
      c.push(r === "simple" ? aO(d, u, this.tokenizer) : d);
    }
    return n ? c : c[0];
  }
};
function oO(t6) {
  let e = t6[0];
  return t6[1] === "-" && (e === "B" || e === "I" || e === "E" || e === "S") ? [e, t6.slice(2)] : ["I", t6];
}
function aO(t6, e, s) {
  let r = [], n = null;
  for (let o = 0; o < t6.length; ++o) {
    let [a, i] = oO(t6[o].entity);
    n === i && a !== "B" && a !== "S" ? (r[r.length - 1].end = o + 1, a === "E" && (n = null)) : (r.push({ tag: i, start: o, end: o + 1 }), n = a === "S" ? null : i);
  }
  return r.map(({ tag: o, start: a, end: i }) => {
    let l = 0, c = [];
    for (let p = a; p < i; ++p) l += t6[p].score, c.push(e[t6[p].index]);
    return { entity_group: o, score: l / (i - a), word: s.decode(c, { skip_special_tokens: true }) };
  });
}
var ei = class extends Y {
  async _call(e, s, { top_k: r = 1 } = {}) {
    let n = this.tokenizer(e, { text_pair: s, padding: true, truncation: true }), o = Array.isArray(e), { start_logits: a, end_logits: i } = await this.model(n), l = n.input_ids.tolist(), c = n.attention_mask.tolist(), { all_special_ids: p, sep_token_id: u } = this.tokenizer, _ = [];
    for (let d = 0; d < a.dims[0]; ++d) {
      let f = l[d], m = f.findIndex((k) => k == u), g = a[d].tolist(), w = i[d].tolist();
      for (let k = 1; k < g.length; ++k) (c[d] == 0 || k <= m || p.findIndex((O) => O == f[k]) !== -1) && (g[k] = -1 / 0, w[k] = -1 / 0);
      let x = ge(g).map((k, O) => [k, O]), y = ge(w).map((k, O) => [k, O]);
      x[0][0] = 0, y[0][0] = 0;
      let b = L0(x, y).filter((k) => k[0][1] <= k[1][1]).map((k) => [k[0][1], k[1][1], k[0][0] * k[1][0]]).sort((k, O) => O[2] - k[2]), v = [];
      for (let k = 0; k < Math.min(b.length, r); ++k) {
        let [O, T, $] = b[k], C = f.slice(O, T + 1), D = this.tokenizer.decode(C, { skip_special_tokens: true });
        v.push({ answer: D, score: $ });
      }
      r === 1 ? _.push(...v) : _.push(v);
    }
    return o ? _ : _[0];
  }
};
var ti = class extends Y {
  async _call(e, { top_k: s = 5 } = {}) {
    let { mask_token_id: r, mask_token: n } = this.tokenizer, o = this.tokenizer(e, { padding: true, truncation: true }), { logits: a } = await this.model(o), i = [], l = o.input_ids.tolist();
    for (let c = 0; c < l.length; ++c) {
      let p = l[c], u = p.findIndex((g) => g == r);
      if (u === -1) throw Error(`Mask token (${n}) not found in text.`);
      let _ = a[c][u], d = await mt(new E("float32", ge(_.data), _.dims), s), f = d[0].tolist(), m = d[1].tolist();
      i.push(m.map((g, w) => {
        let x = p.slice();
        return x[u] = g, { score: f[w], token: Number(g), token_str: this.tokenizer.decode([g]), sequence: this.tokenizer.decode(x, { skip_special_tokens: true }) };
      }));
    }
    return Array.isArray(e) ? i : i[0];
  }
};
var zt = class extends Y {
  _default_generation_config = { max_new_tokens: 256 };
  _key = "generated_text";
  async _call(e, s = {}) {
    Array.isArray(e) || (e = [e]), this.model.config.prefix && (e = e.map((l) => this.model.config.prefix + l));
    let r = this.model.config.task_specific_params;
    r && r[this.task] && r[this.task].prefix && (e = e.map((l) => r[this.task].prefix + l));
    let n = this.tokenizer, o = { padding: true, truncation: true }, a;
    this.task === "translation" && "_build_translation_inputs" in n ? a = n._build_translation_inputs(e, o, s) : a = n(e, o);
    let i = await this.model.generate({ ...a, ...this._default_generation_config, ...s });
    return n.batch_decode(i, { skip_special_tokens: true }).map((l) => ({ [this._key]: l }));
  }
};
var si = class extends zt {
  _key = "summary_text";
};
var ri = class extends zt {
  _key = "translation_text";
};
function z1(t6) {
  return Array.isArray(t6) && t6.every((e) => "role" in e && "content" in e);
}
var ni = class extends Y {
  _default_generation_config = { max_new_tokens: 256 };
  async _call(e, s = {}) {
    let { add_special_tokens: r, return_full_text: n, tools: o, documents: a, chat_template: i, tokenizer_encode_kwargs: l, ...c } = s, p = false, u = false, _ = r ?? (this.tokenizer.add_bos_token || this.tokenizer.add_eos_token) ?? false, d = l, f;
    if (typeof e == "string") f = e = [e];
    else if (Array.isArray(e) && e.every((v) => typeof v == "string")) p = true, f = e;
    else {
      if (z1(e)) e = [e];
      else if (Array.isArray(e) && e.every(z1)) p = true;
      else throw new Error("Input must be a string, an array of strings, a Chat, or an array of Chats");
      u = true;
      let v = { tokenize: false, add_generation_prompt: true, ...ye2({ tools: o, documents: a, chat_template: i }, ["tools", "documents", "chat_template"]), ...d };
      f = e.map((k) => this.tokenizer.apply_chat_template(k, v)), _ = false, d = void 0;
    }
    let m = u ? false : n ?? true;
    this.tokenizer.padding_side = "left";
    let g = this.tokenizer(f, { add_special_tokens: _, padding: true, truncation: true, ...d }), w = await this.model.generate({ ...g, ...this._default_generation_config, ...c }), x = this.tokenizer.batch_decode(w, { skip_special_tokens: true }), y;
    !m && g.input_ids.dims.at(-1) > 0 && (y = this.tokenizer.batch_decode(g.input_ids, { skip_special_tokens: true }).map((v) => v.length));
    let b = Array.from({ length: e.length }, (v) => []);
    for (let v = 0; v < x.length; ++v) {
      let k = Math.floor(v / w.dims[0] * e.length);
      y && (x[v] = x[v].slice(y[k])), b[k].push({ generated_text: u ? [...e[k], { role: "assistant", content: x[v] }] : x[v] });
    }
    return !p && b.length === 1 ? b[0] : b;
  }
};
var oi = class extends Y {
  constructor(e) {
    super(e), this.label2id = Object.fromEntries(Object.entries(this.model.config.label2id).map(([s, r]) => [s.toLowerCase(), r])), this.entailment_id = this.label2id.entailment, this.entailment_id === void 0 && (R.warn("Could not find 'entailment' in label2id mapping. Using 2 as entailment_id."), this.entailment_id = 2), this.contradiction_id = this.label2id.contradiction ?? this.label2id.not_entailment, this.contradiction_id === void 0 && (R.warn("Could not find 'contradiction' in label2id mapping. Using 0 as contradiction_id."), this.contradiction_id = 0);
  }
  async _call(e, s, { hypothesis_template: r = "This example is {}.", multi_label: n = false } = {}) {
    let o = Array.isArray(e);
    o || (e = [e]), Array.isArray(s) || (s = [s]);
    let a = s.map((c) => r.replace("{}", c)), i = n || s.length === 1, l = [];
    for (let c of e) {
      let p = [];
      for (let d of a) {
        let f = this.tokenizer(c, { text_pair: d, padding: true, truncation: true }), m = await this.model(f);
        i ? p.push([m.logits.data[this.contradiction_id], m.logits.data[this.entailment_id]]) : p.push(m.logits.data[this.entailment_id]);
      }
      let _ = (i ? p.map((d) => ge(d)[1]) : ge(p)).map((d, f) => [d, f]).sort((d, f) => f[0] - d[0]);
      l.push({ sequence: c, labels: _.map((d) => s[d[1]]), scores: _.map((d) => d[0]) });
    }
    return o ? l : l[0];
  }
};
var ai = class extends Y {
  async _call(e, { top_k: s = 5 } = {}) {
    let r = this.processor.feature_extractor.config.sampling_rate, n = await Tt(e, r), o = this.model.config.id2label, a = [];
    for (let i of n) {
      let l = await this.processor(i), p = (await this.model(l)).logits[0], u = await mt(new E("float32", ge(p.data), p.dims), s), _ = u[0].tolist(), f = u[1].tolist().map((m, g) => ({ label: o ? o[m] : `LABEL_${m}`, score: _[g] }));
      a.push(f);
    }
    return Array.isArray(e) ? a : a[0];
  }
};
var ii = class extends Y {
  async _call(e, s, { hypothesis_template: r = "This is a sound of {}." } = {}) {
    let n = !Array.isArray(e);
    n && (e = [e]);
    let o = s.map((p) => r.replace("{}", p)), a = this.tokenizer(o, { padding: true, truncation: true }), i = this.processor.feature_extractor.config.sampling_rate, l = await Tt(e, i), c = [];
    for (let p of l) {
      let u = await this.processor(p), _ = await this.model({ ...a, ...u }), d = ge(_.logits_per_audio.data);
      c.push([...d].map((f, m) => ({ score: f, label: s[m] })));
    }
    return n ? c[0] : c;
  }
};
var li = class extends Y {
  _default_generation_config = {};
  async _call(e, s = {}) {
    switch (s = { ...this._default_generation_config, ...s }, this.model.config.model_type) {
      case "whisper":
      case "lite-whisper":
        return this._call_whisper(e, s);
      case "wav2vec2":
      case "wav2vec2-bert":
      case "unispeech":
      case "unispeech-sat":
      case "hubert":
      case "parakeet_ctc":
        return this._call_wav2vec2(e, s);
      case "moonshine":
        return this._call_moonshine(e, s);
      case "cohere_asr":
        return this._call_cohere_asr(e, s);
      default:
        throw new Error(`AutomaticSpeechRecognitionPipeline does not support model type '${this.model.config.model_type}'.`);
    }
  }
  async _call_wav2vec2(e, s) {
    s.language && R.warn('`language` parameter is not yet supported for `wav2vec2` models, defaulting to "English".'), s.task && R.warn('`task` parameter is not yet supported for `wav2vec2` models, defaulting to "transcribe".');
    let r = !Array.isArray(e), n = r ? [e] : e, o = this.processor.feature_extractor.config.sampling_rate, a = await Tt(n, o), i = [];
    for (let l of a) {
      let c = await this.processor(l), u = (await this.model(c)).logits[0], _ = [];
      for (let f of u) _.push(fe(f.data)[1]);
      let d = this.tokenizer.decode(_, { skip_special_tokens: true }).trim();
      i.push({ text: d });
    }
    return r ? i[0] : i;
  }
  async _call_whisper(e, s) {
    let r = s.return_timestamps ?? false, n = s.chunk_length_s ?? 0, o = s.force_full_sequences ?? false, a = s.stride_length_s ?? null, i = { ...s };
    r === "word" && (i.return_token_timestamps = true, i.return_timestamps = true);
    let l = !Array.isArray(e), c = l ? [e] : e, p = this.processor.feature_extractor.config, u = p.chunk_length / this.model.config.max_source_positions, _ = p.hop_length, d = p.sampling_rate, f = await Tt(c, d), m = [];
    for (let g of f) {
      let w = [];
      if (n > 0) {
        if (a === null) a = n / 6;
        else if (n <= a) throw Error("`chunk_length_s` must be larger than `stride_length_s`.");
        let b = d * n, v = d * a, k = b - 2 * v, O = 0;
        for (; ; ) {
          let T = O + b, $ = g.subarray(O, T), C = await this.processor($), D = O === 0, W = T >= g.length;
          if (w.push({ stride: [$.length, D ? 0 : v, W ? 0 : v], input_features: C.input_features, is_last: W }), W) break;
          O += k;
        }
      } else w = [{ stride: [g.length, 0, 0], input_features: (await this.processor(g)).input_features, is_last: true }];
      for (let b of w) {
        i.num_frames = Math.floor(b.stride[0] / _);
        let v = await this.model.generate({ inputs: b.input_features, ...i });
        if (r === "word") {
          let k = v.sequences.tolist()[0], O = v.token_timestamps.tolist()[0], T = this.tokenizer.timestamp_begin, $ = Math.max(k.findIndex((C) => Number(C) >= T), 0);
          b.tokens = k.slice($), b.token_timestamps = O.slice($).map((C) => hs2(C, 2));
        } else b.tokens = v[0].tolist();
        b.stride = b.stride.map((k) => k / d);
      }
      let [x, y] = this.tokenizer._decode_asr(w, { time_precision: u, return_timestamps: r, force_full_sequences: o });
      m.push({ text: x, ...y });
    }
    return l ? m[0] : m;
  }
  async _call_moonshine(e, s) {
    let r = !Array.isArray(e), n = r ? [e] : e, o = this.processor.feature_extractor.config.sampling_rate, a = await Tt(n, o), i = [];
    for (let l of a) {
      let c = await this.processor(l), p = Math.floor(l.length / o) * 6, u = await this.model.generate({ max_new_tokens: p, ...s, ...c }), _ = this.tokenizer.batch_decode(u, { skip_special_tokens: true })[0];
      i.push({ text: _ });
    }
    return r ? i[0] : i;
  }
  async _call_cohere_asr(e, s) {
    let r = !Array.isArray(e), n = r ? [e] : e, o = this.processor.feature_extractor, a = o.config.sampling_rate, i = await Tt(n, a), l = s.language ?? "en", c = this.processor.get_decoder_prompt_ids(l), p = [];
    for (let u of i) {
      let _ = o.split_audio(u), d = [];
      for (let m of _) {
        let g = await this.processor(m), w = await this.model.generate({ ...g, decoder_input_ids: c, ...s }), x = this.tokenizer.decode(w[0].tolist(), { skip_special_tokens: true }).trim();
        d.push(x);
      }
      let f = this.processor.constructor.join_chunks(d, l);
      p.push({ text: f });
    }
    return r ? p[0] : p;
  }
};
var ci = class extends Y {
  DEFAULT_VOCODER_ID = "Xenova/speecht5_hifigan";
  constructor(e) {
    super(e), this.vocoder = e.vocoder ?? null;
  }
  async _prepare_speaker_embeddings(e, s) {
    if ((typeof e == "string" || e instanceof URL) && (e = new Float32Array(await (await J.fetch(e)).arrayBuffer())), e instanceof Float32Array) e = new E("float32", e, [e.length]);
    else if (!(e instanceof E)) throw new Error("Speaker embeddings must be a `Tensor`, `Float32Array`, `string`, or `URL`.");
    if (s > 1) {
      if (e.dims[0] === 1) e = e.repeat(s, 1);
      else if (e.dims[0] !== s) throw new Error(`Expected speaker embeddings batch size to be 1 or ${s}, but got ${e.dims[0]}.`);
    }
    return e;
  }
  _postprocess_waveform(e, s, r, n = null) {
    let o = s.data, [a, i] = s.dims, l = n ? n.data : null, c = [];
    for (let p = 0; p < a; ++p) {
      let u = l ? Math.min(Math.ceil(l[p]), i) : i, _ = p * i;
      c.push(new nn2(o.slice(_, _ + u), r));
    }
    return Array.isArray(e) ? c : c[0];
  }
  async _call(e, s) {
    return this.processor ? this._call_text_to_spectrogram(e, s) : this.model.config.model_type === "supertonic" ? this._call_supertonic(e, s) : this._call_text_to_waveform(e);
  }
  async _call_supertonic(e, { speaker_embeddings: s, num_inference_steps: r, speed: n }) {
    if (!s) throw new Error("Speaker embeddings must be provided for Supertonic models.");
    let { sampling_rate: o, style_dim: a } = this.model.config, i = this.tokenizer(e, { padding: true, truncation: true }), l = i.input_ids.dims[0];
    s = await this._prepare_speaker_embeddings(s, l), s = s.view(l, -1, a);
    let { waveform: c, durations: p } = await this.model.generate_speech({ ...i, style: s, num_inference_steps: r, speed: n });
    return this._postprocess_waveform(e, c, o, p);
  }
  async _call_text_to_waveform(e) {
    let s = this.tokenizer(e, { padding: true, truncation: true }), { waveform: r } = await this.model(s), n = this.model.config.sampling_rate;
    return this._postprocess_waveform(e, r, n);
  }
  async _call_text_to_spectrogram(e, { speaker_embeddings: s }) {
    this.vocoder || (R.info("No vocoder specified, using default HifiGan vocoder."), this.vocoder = await It2.from_pretrained(this.DEFAULT_VOCODER_ID, { dtype: "fp32" }));
    let { input_ids: r } = this.tokenizer(e, { padding: true, truncation: true }), n = r.dims[0];
    s = await this._prepare_speaker_embeddings(s, n), s = s.view(n, -1);
    let { waveform: o } = await this.model.generate_speech(r, s, { vocoder: this.vocoder }), a = this.processor.feature_extractor.config.sampling_rate;
    return this._postprocess_waveform(e, o, a);
  }
};
var pi = class extends Y {
  async _call(e, s = {}) {
    let r = Array.isArray(e), n = await Ie(e), { pixel_values: o } = await this.processor(n), a = [];
    for (let i of o) {
      i.dims = [1, ...i.dims];
      let l = await this.model.generate({ inputs: i, ...s }), c = this.tokenizer.batch_decode(l, { skip_special_tokens: true }).map((p) => ({ generated_text: p.trim() }));
      a.push(c);
    }
    return r ? a : a[0];
  }
};
var ui = class extends Y {
  async _call(e, { top_k: s = 5 } = {}) {
    let r = await Ie(e), { pixel_values: n } = await this.processor(r), o = await this.model({ pixel_values: n }), { id2label: a } = this.model.config, i = [];
    for (let l of o.logits) {
      let c = await mt(new E("float32", ge(l.data), l.dims), s), p = c[0].tolist(), _ = c[1].tolist().map((d, f) => ({ label: a ? a[d] : `LABEL_${d}`, score: p[f] }));
      i.push(_);
    }
    return Array.isArray(e) ? i : i[0];
  }
};
var C1 = { panoptic: "post_process_panoptic_segmentation", instance: "post_process_instance_segmentation", semantic: "post_process_semantic_segmentation" };
var Ds2 = class extends Y {
  async _call(e, { threshold: s = 0.5, mask_threshold: r = 0.5, overlap_mask_area_threshold: n = 0.8, label_ids_to_fuse: o = null, target_sizes: a = null, subtask: i = null } = {}) {
    if (Array.isArray(e) && e.length !== 1) throw Error("Image segmentation pipeline currently only supports a batch size of 1.");
    let c = await Ie(e), p = c.map((x) => [x.height, x.width]), u = await this.processor(c), { inputNames: _, outputNames: d } = this.model.sessions.model;
    if (!_.includes("pixel_values")) {
      if (_.length !== 1) throw Error(`Expected a single input name, but got ${_.length} inputs: ${_}.`);
      let x = _[0];
      if (x in u) throw Error(`Input name ${x} already exists in the inputs.`);
      u[x] = u.pixel_values;
    }
    let f = await this.model(u), m = null;
    if (i !== null) m = C1[i];
    else if (this.processor.image_processor) {
      for (let [x, y] of Object.entries(C1)) if (y in this.processor.image_processor) {
        m = this.processor.image_processor[y].bind(this.processor.image_processor), i = x;
        break;
      }
    }
    let g = this.model.config.id2label, w = [];
    if (i) if (i === "panoptic" || i === "instance") {
      let x = m(f, s, r, n, o, a ?? p)[0], y = x.segmentation;
      for (let b of x.segments_info) {
        let v = new Uint8ClampedArray(y.data.length);
        for (let O = 0; O < y.data.length; ++O) y.data[O] === b.id && (v[O] = 255);
        let k = new Se(v, y.dims[1], y.dims[0], 1);
        w.push({ score: b.score, label: g[b.label_id], mask: k });
      }
    } else if (i === "semantic") {
      let { segmentation: x, labels: y } = m(f, a ?? p)[0];
      for (let b of y) {
        let v = new Uint8ClampedArray(x.data.length);
        for (let O = 0; O < x.data.length; ++O) x.data[O] === b && (v[O] = 255);
        let k = new Se(v, x.dims[1], x.dims[0], 1);
        w.push({ score: null, label: g[b], mask: k });
      }
    } else throw Error(`Subtask ${i} not supported.`);
    else {
      let y = f[d[0]];
      for (let b = 0; b < p.length; ++b) {
        let v = p[b], k = y[b];
        k.data.some((T) => T < -1e-5 || T > 1 + 1e-5) && k.sigmoid_();
        let O = await Se.fromTensor(k.mul_(255).to("uint8")).resize(v[1], v[0]);
        w.push({ label: null, score: null, mask: O });
      }
    }
    return w;
  }
};
var _i = class extends Ds2 {
  async _call(e, s = {}) {
    let r = await Ie(e), n = await super._call(e, s), o = r.map((a, i) => {
      let l = a.clone();
      return l.putAlpha(n[i].mask), l;
    });
    return Array.isArray(e) ? o : o[0];
  }
};
var di = class extends Y {
  async _call(e, s, { hypothesis_template: r = "This is a photo of {}" } = {}) {
    let n = Array.isArray(e), o = await Ie(e), a = s.map((_) => r.replace("{}", _)), i = this.tokenizer(a, { padding: this.model.config.model_type === "siglip" ? "max_length" : true, truncation: true }), { pixel_values: l } = await this.processor(o), c = await this.model({ ...i, pixel_values: l }), p = this.model.config.model_type === "siglip" ? (_) => _.sigmoid().data : (_) => ge(_.data), u = [];
    for (let _ of c.logits_per_image) {
      let f = [...p(_)].map((m, g) => ({ score: m, label: s[g] }));
      f.sort((m, g) => g.score - m.score), u.push(f);
    }
    return n ? u : u[0];
  }
};
var fi = class extends Y {
  async _call(e, { threshold: s = 0.9, percentage: r = false } = {}) {
    let n = Array.isArray(e);
    if (n && e.length !== 1) throw Error("Object detection pipeline currently only supports a batch size of 1.");
    let o = await Ie(e), a = r ? null : o.map((d) => [d.height, d.width]), { pixel_values: i, pixel_mask: l } = await this.processor(o), c = await this.model({ pixel_values: i, pixel_mask: l }), p = this.processor.image_processor.post_process_object_detection(c, s, a), { id2label: u } = this.model.config, _ = p.map((d) => d.boxes.map((f, m) => ({ score: d.scores[m], label: u[d.classes[m]], box: Ya2(f, !r) })));
    return n ? _ : _[0];
  }
};
var mi = class extends Y {
  async _call(e, s, { threshold: r = 0.1, top_k: n = null, percentage: o = false } = {}) {
    let a = Array.isArray(e), i = await Ie(e), l = this.tokenizer(s, { padding: true, truncation: true }), c = await this.processor(i), p = [];
    for (let u = 0; u < i.length; ++u) {
      let _ = i[u], d = o ? null : [[_.height, _.width]], f = c.pixel_values[u].unsqueeze_(0), m = await this.model({ ...l, pixel_values: f }), g;
      if ("post_process_grounded_object_detection" in this.processor) {
        let w = this.processor.post_process_grounded_object_detection(m, l.input_ids, { box_threshold: r, text_threshold: r, target_sizes: d })[0];
        g = w.boxes.map((x, y) => ({ score: w.scores[y], label: w.labels[y], box: Ya2(x, !o) }));
      } else {
        let w = this.processor.image_processor.post_process_object_detection(m, r, d, true)[0];
        g = w.boxes.map((x, y) => ({ score: w.scores[y], label: s[w.classes[y]], box: Ya2(x, !o) }));
      }
      g.sort((w, x) => x.score - w.score), n !== null && (g = g.slice(0, n)), p.push(g);
    }
    return a ? p : p[0];
  }
};
var hi = class extends Y {
  _default_generation_config = { max_new_tokens: 256 };
  async _call(e, s, r = {}) {
    if (Array.isArray(e)) {
      if (e.length !== 1) throw Error("Document Question Answering pipeline currently only supports a batch size of 1.");
      e = e[0];
    }
    let n = (await Ie(e))[0], { pixel_values: o } = await this.processor(n), a = `<s_docvqa><s_question>${s}</s_question><s_answer>`, i = this.tokenizer(a, { add_special_tokens: false, padding: true, truncation: true }).input_ids, l = await this.model.generate({ inputs: o, max_length: this.model.config.decoder.max_position_embeddings, decoder_input_ids: i, ...this._default_generation_config, ...r }), p = this.tokenizer.batch_decode(l)[0].match(/<s_answer>(.*?)<\/s_answer>/), u = null;
    return p && p.length >= 2 && (u = p[1].trim()), [{ answer: u }];
  }
};
var gi = class extends Y {
  async _call(e) {
    let s = await Ie(e), r = await this.processor(s), n = await this.model(r), o = [];
    for (let a of n.reconstruction) {
      let i = a.squeeze().clamp_(0, 1).mul_(255).round_().to("uint8");
      o.push(Se.fromTensor(i));
    }
    return Array.isArray(e) ? o : o[0];
  }
};
var xi = class extends Y {
  async _call(e) {
    let s = await Ie(e), r = await this.processor(s), { predicted_depth: n } = await this.model(r), o = [];
    for (let a = 0; a < s.length; ++a) {
      let i = n[a], [l, c] = i.dims.slice(-2), [p, u] = s[a].size, _ = (await He2(i.view(1, 1, l, c), { size: [u, p], mode: "bilinear" })).view(u, p), d = _.min().item(), f = _.max().item(), m = _.sub(d).div_(f - d).mul_(255).to("uint8").unsqueeze(0), g = Se.fromTensor(m);
      o.push({ predicted_depth: _, depth: g });
    }
    return Array.isArray(e) ? o : o[0];
  }
};
var wi = class extends Y {
  async _call(e, { pooling: s = "none", normalize: r = false, quantize: n = false, precision: o = "binary" } = {}) {
    let a = this.tokenizer(e, { padding: true, truncation: true }), i = await this.model(a), l = i.last_hidden_state ?? i.logits ?? i.token_embeddings;
    switch (s) {
      case "none":
        break;
      case "mean":
        l = _k(l, a.attention_mask);
        break;
      case "first_token":
      case "cls":
        l = l.slice(null, 0);
        break;
      case "last_token":
      case "eos":
        l = l.slice(null, -1);
        break;
      default:
        throw Error(`Pooling method '${s}' not supported.`);
    }
    return r && (l = l.normalize(2, -1)), n && (l = fk(l, o)), l;
  }
};
var yi = class extends Y {
  async _call(e, { pool: s = null } = {}) {
    let r = await Ie(e), { pixel_values: n } = await this.processor(r), o = await this.model({ pixel_values: n }), a;
    if (s) {
      if (!("pooler_output" in o)) throw Error("No pooled output was returned. Make sure the model has a 'pooler' layer when using the 'pool' option.");
      a = o.pooler_output;
    } else a = o.last_hidden_state ?? o.logits ?? o.image_embeds;
    return a;
  }
};
var Fr = Object.freeze({ "text-classification": { pipeline: Ja2, model: Ha2, default: { model: "Xenova/distilbert-base-uncased-finetuned-sst-2-english" }, type: "text" }, "token-classification": { pipeline: Za2, model: Kc, default: { model: "Xenova/bert-base-multilingual-cased-ner-hrl" }, type: "text" }, "question-answering": { pipeline: ei, model: ep, default: { model: "Xenova/distilbert-base-cased-distilled-squad" }, type: "text" }, "fill-mask": { pipeline: ti, model: Zc, default: { model: "onnx-community/ettin-encoder-32m-ONNX", dtype: "fp32" }, type: "text" }, summarization: { pipeline: si, model: Rr, default: { model: "Xenova/distilbart-cnn-6-6" }, type: "text" }, translation: { pipeline: ri, model: Rr, default: { model: "Xenova/t5-small" }, type: "text" }, "text2text-generation": { pipeline: zt, model: Rr, default: { model: "Xenova/flan-t5-small" }, type: "text" }, "text-generation": { pipeline: ni, model: Jc, default: { model: "onnx-community/Qwen3-0.6B-ONNX", dtype: "q4" }, type: "text" }, "zero-shot-classification": { pipeline: oi, model: Ha2, default: { model: "Xenova/distilbert-base-uncased-mnli" }, type: "text" }, "audio-classification": { pipeline: ai, model: ap, default: { model: "Xenova/wav2vec2-base-superb-ks" }, type: "audio" }, "zero-shot-audio-classification": { pipeline: ii, model: It2, default: { model: "Xenova/clap-htsat-unfused" }, type: "multimodal" }, "automatic-speech-recognition": { pipeline: li, model: [Xc, op], default: { model: "Xenova/whisper-tiny.en" }, type: "multimodal" }, "text-to-audio": { pipeline: ci, model: [Yc, Qc], default: { model: "onnx-community/Supertonic-TTS-ONNX", dtype: "fp32" }, type: "text" }, "image-to-text": { pipeline: pi, model: tp, default: { model: "Xenova/vit-gpt2-image-captioning" }, type: "multimodal" }, "image-classification": { pipeline: ui, model: sp, default: { model: "Xenova/vit-base-patch16-224" }, type: "multimodal" }, "image-segmentation": { pipeline: Ds2, model: [Ka2, Xa2, Qa2], default: { model: "Xenova/detr-resnet-50-panoptic" }, type: "multimodal" }, "background-removal": { pipeline: _i, model: [Ka2, Xa2, Qa2], default: { model: "Xenova/modnet" }, type: "image" }, "zero-shot-image-classification": { pipeline: di, model: It2, default: { model: "Xenova/clip-vit-base-patch32" }, type: "multimodal" }, "object-detection": { pipeline: fi, model: rp, default: { model: "Xenova/detr-resnet-50" }, type: "multimodal" }, "zero-shot-object-detection": { pipeline: mi, model: np, default: { model: "Xenova/owlvit-base-patch32" }, type: "multimodal" }, "document-question-answering": { pipeline: hi, model: ip, default: { model: "Xenova/donut-base-finetuned-docvqa" }, type: "multimodal" }, "image-to-image": { pipeline: gi, model: lp, default: { model: "Xenova/swin2SR-classical-sr-x2-64" }, type: "image" }, "depth-estimation": { pipeline: xi, model: cp, default: { model: "onnx-community/depth-anything-v2-small" }, type: "image" }, "feature-extraction": { pipeline: wi, model: It2, default: { model: "onnx-community/all-MiniLM-L6-v2-ONNX", dtype: "fp32" }, type: "text" }, "image-feature-extraction": { pipeline: yi, model: [pp, It2], default: { model: "onnx-community/dinov3-vits16-pretrain-lvd1689m-ONNX", dtype: "fp32" }, type: "image" } });
var up = Object.freeze({ "sentiment-analysis": "text-classification", ner: "token-classification", asr: "automatic-speech-recognition", "text-to-speech": "text-to-audio", embeddings: "feature-extraction" });
async function _p(t6) {
  if (!t6) throw new Error("modelId is required");
  return (await Ye(t6, Ot2, {})).exists ? [Ot2] : [];
}
async function Ct2(t6, { config: e = null, dtype: s = null, device: r = null, model_file_name: n = null, include_tokenizer: o = true, include_processor: a = true } = {}) {
  let i = await dr2(t6, { config: e, dtype: s, device: r, model_file_name: n });
  if (o) {
    let l = await Ys2(t6);
    i.push(...l);
  }
  if (a) {
    let l = await _p(t6);
    i.push(...l);
  }
  return i;
}
async function Pt(t6, e, s = {}) {
  t6 = up[t6] ?? t6;
  let r = Fr[t6];
  if (!r) throw new Error(`Unsupported pipeline task: ${t6}. Must be one of [${Object.keys(Fr).join(", ")}]`);
  let { type: n } = r, i = await Ct2(e, { ...s, include_tokenizer: n !== "audio" && n !== "image", include_processor: n !== "text" });
  if (t6 === "text-generation") {
    let l = await yn(e, s), c = _r(l), p = Dk(c);
    if (p) {
      let u = Object.values(p).map((_) => `onnx/${_}`);
      return i.filter((_) => !_.startsWith("onnx/") || u.some((d) => _.startsWith(d)));
    }
  }
  return i;
}
async function Mee(t6, e = null, { progress_callback: s = null, config: r = null, cache_dir: n = null, local_files_only: o = false, revision: a = "main", device: i = null, dtype: l = null, subfolder: c = "onnx", use_external_data_format: p = null, model_file_name: u = null, session_options: _ = {} } = {}) {
  t6 = up[t6] ?? t6;
  let d = Fr[t6.split("_", 1)[0]];
  if (!d) throw Error(`Unsupported pipeline: ${t6}. Must be one of [${Object.keys(Fr)}]`);
  e || (e = d.default.model, R.info(`No model specified. Using default model: "${e}".`), !l && d.default.dtype && (l = d.default.dtype));
  let f = await Pt(t6, e, { device: i, dtype: l }), m = {};
  if (s) try {
    (await Promise.all(f.map(async (D) => Ye(e, D)))).forEach((D, W) => {
      D.exists && (m[f[W]] = { loaded: 0, total: D.size ?? 0 });
    });
  } catch (C) {
    R.warn(`Unable to fetch model file metadata for total progress tracking: ${C}`);
  }
  let g = { progress_callback: s ? new At2(s, m) : void 0, config: r, cache_dir: n, local_files_only: o, revision: a, device: i, dtype: l, subfolder: c, use_external_data_format: p, model_file_name: u, session_options: _ }, w = f.includes("tokenizer.json"), x = f.includes("preprocessor_config.json"), y = d.model, b;
  if (Array.isArray(y)) {
    let C = r ?? await at2.from_pretrained(e, g), { model_type: D } = C, W = y.find((V2) => V2.supports(D));
    if (!W) throw Error(`Unsupported model type "${D}" for task "${t6}". None of the candidate model classes support this type.`);
    b = W.from_pretrained(e, { ...g, config: C });
  } else b = y.from_pretrained(e, g);
  let [v, k, O] = await Promise.all([w ? G2.from_pretrained(e, g) : null, x ? Al.from_pretrained(e, g) : null, b]), T = { task: t6, model: O };
  v && (T.tokenizer = v), k && (T.processor = k), xt(s, { status: "ready", task: t6, model: e });
  let $ = d.pipeline;
  return new $(T);
}
var iO = (t6) => t6 >= 19968 && t6 <= 40959 || t6 >= 13312 && t6 <= 19903 || t6 >= 131072 && t6 <= 173791 || t6 >= 173824 && t6 <= 177983 || t6 >= 177984 && t6 <= 178207 || t6 >= 178208 && t6 <= 183983 || t6 >= 63744 && t6 <= 64255 || t6 >= 194560 && t6 <= 195103;
var y0 = class {
  put(e) {
    throw Error("Not implemented");
  }
  end() {
    throw Error("Not implemented");
  }
};
var P1 = H.IS_PROCESS_AVAILABLE ? (t6) => process.stdout.write(t6) : (t6) => console.log(t6);
var b0 = class extends y0 {
  constructor(e, { skip_prompt: s = false, callback_function: r = null, token_callback_function: n = null, skip_special_tokens: o = true, decode_kwargs: a = {}, ...i } = {}) {
    super(), this.tokenizer = e, this.skip_prompt = s, this.callback_function = r ?? P1, this.token_callback_function = n, this.decode_kwargs = { skip_special_tokens: o, ...a, ...i }, this.token_cache = [], this.print_len = 0, this.next_tokens_are_prompt = true, this.special_ids = new Set(this.tokenizer.all_special_ids.map(BigInt));
  }
  put(e) {
    if (e.length > 1) throw Error("TextStreamer only supports batch size of 1");
    let s = this.next_tokens_are_prompt;
    if (s && (this.next_tokens_are_prompt = false, this.skip_prompt)) return;
    let r = e[0];
    if (this.token_callback_function?.(r), r.length === 1 && this.special_ids.has(r[0])) {
      if (this.decode_kwargs.skip_special_tokens) return;
      if (this.token_cache.length > 0) {
        let l = this.tokenizer.decode(this.token_cache, this.decode_kwargs).slice(this.print_len);
        this.on_finalized_text(l, false), this.token_cache = [], this.print_len = 0;
      }
      let a = this.tokenizer.decode(r, this.decode_kwargs);
      this.on_finalized_text(a, false);
      return;
    }
    this.token_cache = Ue(this.token_cache, r);
    let n = this.tokenizer.decode(this.token_cache, this.decode_kwargs), o;
    s || n.endsWith(`
`) ? (o = n.slice(this.print_len), this.token_cache = [], this.print_len = 0) : n.length > 0 && iO(n.charCodeAt(n.length - 1)) ? (o = n.slice(this.print_len), this.print_len += o.length) : (o = n.slice(this.print_len, n.lastIndexOf(" ") + 1), this.print_len += o.length), this.on_finalized_text(o, false);
  }
  end() {
    let e;
    this.token_cache.length > 0 ? (e = this.tokenizer.decode(this.token_cache, this.decode_kwargs).slice(this.print_len), this.token_cache = [], this.print_len = 0) : e = "", this.next_tokens_are_prompt = true, this.on_finalized_text(e, true);
  }
  on_finalized_text(e, s) {
    e.length > 0 && this.callback_function?.(e), s && this.callback_function === P1 && H.IS_PROCESS_AVAILABLE && this.callback_function?.(`
`);
  }
};
var N1 = class extends b0 {
  constructor(e, { skip_prompt: s = false, callback_function: r = null, token_callback_function: n = null, on_chunk_start: o = null, on_chunk_end: a = null, on_finalize: i = null, time_precision: l = 0.02, skip_special_tokens: c = true, decode_kwargs: p = {} } = {}) {
    super(e, { skip_prompt: s, skip_special_tokens: c, callback_function: r, token_callback_function: n, decode_kwargs: p }), this.timestamp_begin = e.timestamp_begin, this.on_chunk_start = o, this.on_chunk_end = a, this.on_finalize = i, this.time_precision = l, this.waiting_for_timestamp = false;
  }
  put(e) {
    if (e.length > 1) throw Error("WhisperTextStreamer only supports batch size of 1");
    let s = e[0];
    if (s.length === 1) {
      let r = Number(s[0]) - this.timestamp_begin;
      if (r >= 0) {
        let n = r * this.time_precision;
        this.waiting_for_timestamp ? this.on_chunk_end?.(n) : this.on_chunk_start?.(n), this.waiting_for_timestamp = !this.waiting_for_timestamp, this.token_callback_function?.(s);
        return;
      }
    }
    return super.put(e);
  }
  end() {
    super.end(), this.on_finalize?.();
  }
};
var bi = class {
  constructor(e, s) {
    this.image = e, this.timestamp = s;
  }
};
var dp = class {
  constructor(e, s) {
    e.length > 0 && e[0] instanceof Se && (e = e.map((r, n) => new bi(r, (n + 1) / (e.length + 1) * s))), this.frames = e, this.duration = s;
  }
  get width() {
    return this.frames[0].image.width;
  }
  get height() {
    return this.frames[0].image.height;
  }
  get fps() {
    return this.frames.length / this.duration;
  }
};
async function lO(t6, { num_frames: e = null, fps: s = null } = {}) {
  if (!H.IS_BROWSER_ENV) throw new Error("`load_video` is currently only supported in browser environments.");
  if (e == null && s == null) throw new Error("Either num_frames or fps must be provided.");
  let r = [], n = document.createElement("video");
  if (n.crossOrigin = "anonymous", n.muted = true, typeof t6 == "string") n.src = t6;
  else if (t6 instanceof Blob) n.src = URL.createObjectURL(t6);
  else if (t6 instanceof HTMLVideoElement) n.src = t6.src;
  else throw new Error("Invalid URL or video element provided.");
  if (await new Promise((u) => n.onloadedmetadata = u), n.seekable.start(0) === n.seekable.end(0)) {
    let _ = await (await J.fetch(n.src)).blob();
    n.src = URL.createObjectURL(_), await new Promise((d) => n.onloadedmetadata = d);
  }
  let o = n.duration, a, i;
  e != null ? (a = e, i = e === 1 ? 0 : o / (e - 1)) : (i = 1 / s, a = Math.floor(o / i));
  let l = [];
  for (let u = 0; u < a; ++u) l.push(e === 1 ? o / 2 : u * i);
  let c = document.createElement("canvas");
  c.width = n.videoWidth, c.height = n.videoHeight;
  let p = c.getContext("2d", { willReadFrequently: true });
  for (let u of l) {
    n.currentTime = u, await new Promise((m) => {
      n.onseeked = m;
    }), p.drawImage(n, 0, 0, c.width, c.height);
    let _ = p.getImageData(0, 0, c.width, c.height), d = new Se(_.data, c.width, c.height, 4), f = new bi(d, u);
    r.push(f);
  }
  return n.remove(), new dp(r, o);
}
async function fp(t6, e, s = {}) {
  let r = await dt(s?.cache_dir);
  if (!r) return { allCached: false, files: e.map((a) => ({ file: a, cached: false })) };
  let n = await Promise.all(e.map(async (o) => {
    let { localPath: a, proposedCacheKey: i } = qt2(t6, o, s, r), l = await Ut(r, a, i);
    return { file: o, cached: !!l };
  }));
  return { allCached: n.every((o) => o.cached), files: n };
}
async function L1(t6, e, s = {}) {
  let r = await dt(s?.cache_dir);
  if (!r) return false;
  let { localPath: n, proposedCacheKey: o } = qt2(t6, e, s, r);
  return !!await Ut(r, n, o);
}
async function $1(t6, e = {}) {
  if (!t6) throw new Error("modelId is required");
  if (!await L1(t6, "config.json", e)) return false;
  let s = await Ct2(t6, e);
  return (await fp(t6, s, e)).allCached;
}
async function R1(t6, e = {}) {
  if (!t6) throw new Error("modelId is required");
  let s = await Ct2(t6, e);
  return await fp(t6, s, e);
}
async function F1(t6, e, s = {}) {
  if (!t6) throw new Error("task is required");
  if (!e) throw new Error("modelId is required");
  if (!await L1(e, "config.json", s)) return false;
  let r = await Pt(t6, e, s);
  return (await fp(e, r, s)).allCached;
}
async function D1(t6, e, s = {}) {
  if (!t6) throw new Error("task is required");
  if (!e) throw new Error("modelId is required");
  let r = await Pt(t6, e, s);
  return await fp(e, r, s);
}
async function B1(t6, e, s = {}) {
  let r = await dt(s?.cache_dir);
  if (!r) return { filesDeleted: 0, filesCached: 0, files: e.map((o) => ({ file: o, deleted: false, wasCached: false })) };
  if (!r.delete) throw new Error("Cache does not support delete operation");
  let n = await Promise.all(e.map(async (o) => {
    let { localPath: a, proposedCacheKey: i } = qt2(t6, o, s, r), c = !!await Ut(r, a, i), p = false;
    if (c) {
      let u = await r.delete(i), _ = !u && i !== a ? await r.delete(a) : false;
      p = u || _;
    }
    return { file: o, deleted: p, wasCached: c };
  }));
  return { filesDeleted: n.filter((o) => o.deleted).length, filesCached: n.filter((o) => o.wasCached).length, files: n };
}
async function q1(t6, e = {}) {
  if (!t6) throw new Error("modelId is required");
  let s = await Ct2(t6, e);
  return await B1(t6, s, e);
}
async function U1(t6, e, s = {}) {
  if (!t6) throw new Error("task is required");
  if (!e) throw new Error("modelId is required");
  let r = await Pt(t6, e, s);
  return await B1(e, r, s);
}
var cO = Object.keys(Gt);
async function j1(t6, { config: e = null, model_file_name: s = null, revision: r = "main", cache_dir: n = null, local_files_only: o = false } = {}) {
  e = await yn(t6, { config: e, cache_dir: n, local_files_only: o, revision: r });
  let a = "onnx", i = _r(e), { sessions: l } = Ul(i, e, { model_file_name: s }), c = Object.values(l), p = { revision: r, cache_dir: n, local_files_only: o };
  return (await Promise.all(cO.map(async (_) => {
    let d = Gt[_] ?? "", f = await Promise.all(c.map(async (m) => {
      let g = `${a}/${m}${d}.onnx`;
      return (await Ye(t6, g, p)).exists;
    }));
    return { dtype: _, available: f.every(Boolean) };
  }))).filter((_) => _.available).map((_) => _.dtype);
}
var k0 = class {
  static async get_files(e, s = {}) {
    return Ct2(e, s);
  }
  static async get_pipeline_files(e, s, r = {}) {
    return Pt(e, s, r);
  }
  static async get_model_files(e, s = {}) {
    return dr2(e, s);
  }
  static async get_tokenizer_files(e) {
    return Ys2(e);
  }
  static async get_processor_files(e) {
    return _p(e);
  }
  static async get_available_dtypes(e, s = {}) {
    return j1(e, s);
  }
  static async is_cached(e, s = {}) {
    return $1(e, s);
  }
  static async is_cached_files(e, s = {}) {
    return R1(e, s);
  }
  static async is_pipeline_cached(e, s, r = {}) {
    return F1(e, s, r);
  }
  static async is_pipeline_cached_files(e, s, r = {}) {
    return D1(e, s, r);
  }
  static async get_file_metadata(e, s, r = {}) {
    return Ye(e, s, r);
  }
  static async clear_cache(e, s = {}) {
    return q1(e, s);
  }
  static async clear_pipeline_cache(e, s, r = {}) {
    return U1(e, s, r);
  }
};
export {
  Du as ASTFeatureExtractor,
  qd as ASTForAudioClassification,
  Bd as ASTModel,
  Mn as ASTPreTrainedModel,
  Rd as AfmoeForCausalLM,
  $d as AfmoeModel,
  En as AfmoePreTrainedModel,
  Pd as AlbertForMaskedLM,
  Cd as AlbertForQuestionAnswering,
  zd as AlbertForSequenceClassification,
  Td as AlbertModel,
  Os2 as AlbertPreTrainedModel,
  Wp as AlbertTokenizer,
  Ld as ApertusForCausalLM,
  Nd as ApertusModel,
  vn as ApertusPreTrainedModel,
  Dd as ArceeForCausalLM,
  Fd as ArceeModel,
  An as ArceePreTrainedModel,
  ai as AudioClassificationPipeline,
  at2 as AutoConfig,
  we as AutoFeatureExtractor,
  pe as AutoImageProcessor,
  It2 as AutoModel,
  ap as AutoModelForAudioClassification,
  A1 as AutoModelForAudioFrameClassification,
  T1 as AutoModelForAudioTextToText,
  op as AutoModelForCTC,
  Jc as AutoModelForCausalLM,
  cp as AutoModelForDepthEstimation,
  ip as AutoModelForDocumentQuestionAnswering,
  sp as AutoModelForImageClassification,
  pp as AutoModelForImageFeatureExtraction,
  M1 as AutoModelForImageMatting,
  Ka2 as AutoModelForImageSegmentation,
  I1 as AutoModelForImageTextToText,
  lp as AutoModelForImageToImage,
  v1 as AutoModelForMaskGeneration,
  Zc as AutoModelForMaskedLM,
  S1 as AutoModelForNormalEstimation,
  rp as AutoModelForObjectDetection,
  O1 as AutoModelForPoseEstimation,
  ep as AutoModelForQuestionAnswering,
  Xa2 as AutoModelForSemanticSegmentation,
  Rr as AutoModelForSeq2SeqLM,
  Ha2 as AutoModelForSequenceClassification,
  Xc as AutoModelForSpeechSeq2Seq,
  Qc as AutoModelForTextToSpectrogram,
  Yc as AutoModelForTextToWaveform,
  Kc as AutoModelForTokenClassification,
  Qa2 as AutoModelForUniversalSegmentation,
  tp as AutoModelForVision2Seq,
  E1 as AutoModelForXVector,
  np as AutoModelForZeroShotObjectDetection,
  Al as AutoProcessor,
  G2 as AutoTokenizer,
  li as AutomaticSpeechRecognitionPipeline,
  _i as BackgroundRemovalPipeline,
  jd as BartForConditionalGeneration,
  Gd as BartForSequenceClassification,
  Ud as BartModel,
  mr2 as BartPretrainedModel,
  Vp as BartTokenizer,
  Ml as BaseModelOutput,
  y0 as BaseStreamer,
  r_ as BeitFeatureExtractor,
  Vd as BeitForImageClassification,
  Wd as BeitModel,
  Sn as BeitPreTrainedModel,
  Kd as BertForMaskedLM,
  Yd as BertForQuestionAnswering,
  Xd as BertForSequenceClassification,
  Qd as BertForTokenClassification,
  Hd as BertModel,
  Yt2 as BertPreTrainedModel,
  Hp as BertTokenizer,
  n_ as BitImageProcessor,
  Zd as BlenderbotForConditionalGeneration,
  Jd as BlenderbotModel,
  On as BlenderbotPreTrainedModel,
  tf as BlenderbotSmallForConditionalGeneration,
  ef as BlenderbotSmallModel,
  In as BlenderbotSmallPreTrainedModel,
  Kp as BlenderbotSmallTokenizer,
  Xp as BlenderbotTokenizer,
  rf as BloomForCausalLM,
  sf as BloomModel,
  Tn as BloomPreTrainedModel,
  Qp as BloomTokenizer,
  uf as CHMv2ForDepthEstimation,
  a_ as CHMv2ImageProcessor,
  Ql as CHMv2PreTrainedModel,
  i_ as CLIPFeatureExtractor,
  ol as CLIPImageProcessor,
  df as CLIPModel,
  vt as CLIPPreTrainedModel,
  xf as CLIPSegForImageSegmentation,
  gf as CLIPSegModel,
  Ln as CLIPSegPreTrainedModel,
  ff as CLIPTextModel,
  Nn as CLIPTextModelWithProjection,
  Jp as CLIPTokenizer,
  mf as CLIPVisionModel,
  hf as CLIPVisionModelWithProjection,
  of as CamembertForMaskedLM,
  cf as CamembertForQuestionAnswering,
  af as CamembertForSequenceClassification,
  lf as CamembertForTokenClassification,
  nf as CamembertModel,
  Jt2 as CamembertPreTrainedModel,
  Yp as CamembertTokenizer,
  De as CausalLMOutput,
  Sl as CausalLMOutputWithPast,
  Bu as ChatterboxFeatureExtractor,
  zn as ChatterboxModel,
  Kl as ChatterboxPreTrainedModel,
  Ju as ChatterboxProcessor,
  o_ as ChineseCLIPFeatureExtractor,
  pf as ChineseCLIPModel,
  Xl as ChineseCLIPPreTrainedModel,
  Pn as ClapAudioModelWithProjection,
  qu as ClapFeatureExtractor,
  _f as ClapModel,
  hr2 as ClapPreTrainedModel,
  Cn as ClapTextModelWithProjection,
  Fl as ClassifierFreeGuidanceLogitsProcessor,
  yf as CodeGenForCausalLM,
  wf as CodeGenModel,
  $n as CodeGenPreTrainedModel,
  eu as CodeGenTokenizer,
  Zp as CodeLlamaTokenizer,
  Ef as Cohere2ForCausalLM,
  vf as Cohere2Model,
  Fn as Cohere2PreTrainedModel,
  Uu as CohereAsrFeatureExtractor,
  Mf as CohereAsrForConditionalGeneration,
  Af as CohereAsrModel,
  Dn as CohereAsrPreTrainedModel,
  Zu as CohereAsrProcessor,
  su as CohereAsrTokenizer,
  kf as CohereForCausalLM,
  bf as CohereModel,
  Rn as CoherePreTrainedModel,
  tu as CohereTokenizer,
  Of as ConvBertForMaskedLM,
  zf as ConvBertForQuestionAnswering,
  If as ConvBertForSequenceClassification,
  Tf as ConvBertForTokenClassification,
  Sf as ConvBertModel,
  Zt2 as ConvBertPreTrainedModel,
  ru as ConvBertTokenizer,
  l_ as ConvNextFeatureExtractor,
  Pf as ConvNextForImageClassification,
  al as ConvNextImageProcessor,
  Cf as ConvNextModel,
  Bn as ConvNextPreTrainedModel,
  Lf as ConvNextV2ForImageClassification,
  Nf as ConvNextV2Model,
  qn as ConvNextV2PreTrainedModel,
  Df as DFineForObjectDetection,
  Ff as DFineModel,
  jn as DFinePreTrainedModel,
  dm as DINOv3ConvNextModel,
  rc as DINOv3ConvNextPreTrainedModel,
  u_ as DINOv3ViTImageProcessor,
  fm as DINOv3ViTModel,
  nc as DINOv3ViTPreTrainedModel,
  d_ as DPTFeatureExtractor,
  km as DPTForDepthEstimation,
  cl as DPTImageProcessor,
  bm as DPTModel,
  Yn as DPTPreTrainedModel,
  Wn as DacDecoderModel,
  Jl as DacDecoderOutput,
  Gn as DacEncoderModel,
  Yl as DacEncoderOutput,
  ln2 as DacFeatureExtractor,
  Bf as DacModel,
  gr2 as DacPreTrainedModel,
  Uf as DebertaForMaskedLM,
  Wf as DebertaForQuestionAnswering,
  jf as DebertaForSequenceClassification,
  Gf as DebertaForTokenClassification,
  qf as DebertaModel,
  es2 as DebertaPreTrainedModel,
  ou as DebertaTokenizer,
  Yf as DebertaV2ForMaskedLM,
  em as DebertaV2ForQuestionAnswering,
  Jf as DebertaV2ForSequenceClassification,
  Zf as DebertaV2ForTokenClassification,
  Qf as DebertaV2Model,
  ts2 as DebertaV2PreTrainedModel,
  nu as DebertaV2Tokenizer,
  tm as DecisionTransformerModel,
  Zl as DecisionTransformerPreTrainedModel,
  Hf as DeepseekV3ForCausalLM,
  Vf as DeepseekV3Model,
  Vn as DeepseekV3PreTrainedModel,
  Xf as DeepseekV4ForCausalLM,
  Kf as DeepseekV4Model,
  Hn as DeepseekV4PreTrainedModel,
  c_ as DeiTFeatureExtractor,
  rm as DeiTForImageClassification,
  il as DeiTImageProcessor,
  sm as DeiTModel,
  Kn as DeiTPreTrainedModel,
  nm as DepthAnythingForDepthEstimation,
  ec as DepthAnythingPreTrainedModel,
  xi as DepthEstimationPipeline,
  om as DepthProForDepthEstimation,
  tc as DepthProPreTrainedModel,
  p_ as DetrFeatureExtractor,
  im as DetrForObjectDetection,
  lm as DetrForSegmentation,
  ll as DetrImageProcessor,
  am as DetrModel,
  wr as DetrObjectDetectionOutput,
  xr as DetrPreTrainedModel,
  sc as DetrSegmentationOutput,
  pm as Dinov2ForImageClassification,
  cm as Dinov2Model,
  Xn as Dinov2PreTrainedModel,
  _m as Dinov2WithRegistersForImageClassification,
  um as Dinov2WithRegistersModel,
  Qn as Dinov2WithRegistersPreTrainedModel,
  wm as DistilBertForMaskedLM,
  xm as DistilBertForQuestionAnswering,
  hm as DistilBertForSequenceClassification,
  gm as DistilBertForTokenClassification,
  mm as DistilBertModel,
  ss2 as DistilBertPreTrainedModel,
  au as DistilBertTokenizer,
  hi as DocumentQuestionAnsweringPipeline,
  __ as DonutFeatureExtractor,
  er2 as DonutImageProcessor,
  ym as DonutSwinModel,
  oc as DonutSwinPreTrainedModel,
  ur2 as DynamicCache,
  Bw as EdgeTamModel,
  Em as EfficientNetForImageClassification,
  f_ as EfficientNetImageProcessor,
  vm as EfficientNetModel,
  Jn as EfficientNetPreTrainedModel,
  Mm as ElectraForMaskedLM,
  Im as ElectraForQuestionAnswering,
  Sm as ElectraForSequenceClassification,
  Om as ElectraForTokenClassification,
  Am as ElectraModel,
  rs2 as ElectraPreTrainedModel,
  iu as ElectraTokenizer,
  Zn as EmbeddingGemma2Model,
  ac as EmbeddingGemma2PreTrainedModel,
  t_ as EmbeddingGemma2Processor,
  fn2 as EmbeddingGemma2VideoProcessor,
  on2 as EncodecFeatureExtractor,
  ql as EosTokenCriteria,
  zm as Ernie4_5ForCausalLM,
  Tm as Ernie4_5Model,
  eo as Ernie4_5PretrainedModel,
  Pm as EsmForMaskedLM,
  Nm as EsmForSequenceClassification,
  Lm as EsmForTokenClassification,
  Cm as EsmModel,
  Is2 as EsmPreTrainedModel,
  lu as EsmTokenizer,
  Rm as EuroBertForMaskedLM,
  Fm as EuroBertForSequenceClassification,
  Dm as EuroBertForTokenClassification,
  $m as EuroBertModel,
  Ts2 as EuroBertPreTrainedModel,
  qm as ExaoneForCausalLM,
  Bm as ExaoneModel,
  to as ExaonePreTrainedModel,
  jm as FalconForCausalLM,
  Wm as FalconH1ForCausalLM,
  Gm as FalconH1Model,
  ro as FalconH1PreTrainedModel,
  Um as FalconModel,
  so as FalconPreTrainedModel,
  cu as FalconTokenizer,
  Hm as FastViTForImageClassification,
  Vm as FastViTModel,
  no as FastViTPreTrainedModel,
  wi as FeatureExtractionPipeline,
  le2 as FeatureExtractor,
  ti as FillMaskPipeline,
  Km as Florence2ForConditionalGeneration,
  ic as Florence2PreTrainedModel,
  H_ as Florence2Processor,
  Il as ForcedBOSTokenLogitsProcessor,
  Tl as ForcedEOSTokenLogitsProcessor,
  g_ as GLPNFeatureExtractor,
  uh as GLPNForDepthEstimation,
  ph as GLPNModel,
  uo as GLPNPreTrainedModel,
  bh as GPT2LMHeadModel,
  yh as GPT2Model,
  go as GPT2PreTrainedModel,
  _u as GPT2Tokenizer,
  dh as GPTBigCodeForCausalLM,
  _h as GPTBigCodeModel,
  _o as GPTBigCodePreTrainedModel,
  vh as GPTJForCausalLM,
  kh as GPTJModel,
  xo as GPTJPreTrainedModel,
  mh as GPTNeoForCausalLM,
  fh as GPTNeoModel,
  fo as GPTNeoPreTrainedModel,
  gh as GPTNeoXForCausalLM,
  hh as GPTNeoXModel,
  mo as GPTNeoXPreTrainedModel,
  uu as GPTNeoXTokenizer,
  Jm as Gemma2ForCausalLM,
  Ym as Gemma2Model,
  ao as Gemma2PreTrainedModel,
  sh as Gemma3ForCausalLM,
  pc2 as Gemma3ForConditionalGeneration,
  m_ as Gemma3ImageProcessor,
  th as Gemma3Model,
  cc as Gemma3PreTrainedModel,
  K_ as Gemma3Processor,
  cn2 as Gemma3nAudioFeatureExtractor,
  rh as Gemma3nForCausalLM,
  ns2 as Gemma3nForConditionalGeneration,
  uc as Gemma3nPreTrainedModel,
  X_ as Gemma3nProcessor,
  pn2 as Gemma4AudioFeatureExtractor,
  nh as Gemma4ForCausalLM,
  yr2 as Gemma4ForConditionalGeneration,
  ws2 as Gemma4ImageProcessor,
  dn2 as Gemma4Processor,
  Qm as GemmaForCausalLM,
  Xm as GemmaModel,
  oo as GemmaPreTrainedModel,
  pu as GemmaTokenizer,
  vs2 as GenerationConfig,
  h_ as Glm46VImageProcessor,
  Q_ as Glm46VProcessor,
  ah as GlmForCausalLM,
  oh as GlmModel,
  lh as GlmMoeDsaForCausalLM,
  ih as GlmMoeDsaModel,
  lo as GlmMoeDsaPreTrainedModel,
  ch as GlmOcrForConditionalGeneration,
  io as GlmPreTrainedModel,
  wh as GptOssForCausalLM,
  xh as GptOssModel,
  ho as GptOssPreTrainedModel,
  Ah as GraniteForCausalLM,
  Eh as GraniteModel,
  Sh as GraniteMoeHybridForCausalLM,
  Mh as GraniteMoeHybridModel,
  yo as GraniteMoeHybridPreTrainedModel,
  wo as GranitePreTrainedModel,
  ju as GraniteSpeechFeatureExtractor,
  Oh as GraniteSpeechForConditionalGeneration,
  Y_ as GraniteSpeechProcessor,
  Ih as GroundingDinoForObjectDetection,
  x_ as GroundingDinoImageProcessor,
  fc as GroundingDinoPreTrainedModel,
  J_ as GroundingDinoProcessor,
  Th as GroupViTModel,
  mc2 as GroupViTPreTrainedModel,
  Ch as HeliumForCausalLM,
  zh as HeliumModel,
  bo as HeliumPreTrainedModel,
  du as HerbertTokenizer,
  Nh as HieraForImageClassification,
  Ph as HieraModel,
  ko as HieraPreTrainedModel,
  $h as HrmTextForCausalLM,
  Lh as HrmTextModel,
  vo as HrmTextPreTrainedModel,
  jh as HubertForCTC,
  Gh as HubertForSequenceClassification,
  Uh as HubertModel,
  qh as HubertPreTrainedModel,
  Vh as HunYuanDenseV1ForCausalLM,
  Wh as HunYuanDenseV1Model,
  Eo as HunYuanDenseV1PreTrainedModel,
  Kh as IJepaForImageClassification,
  Hh as IJepaModel,
  Mo as IJepaPreTrainedModel,
  Ao as Idefics3ForConditionalGeneration,
  pl as Idefics3ImageProcessor,
  yl as Idefics3Processor,
  ui as ImageClassificationPipeline,
  yi as ImageFeatureExtractionPipeline,
  L as ImageFeatureExtractor,
  lr2 as ImageMattingOutput,
  L as ImageProcessor,
  Ds2 as ImageSegmentationPipeline,
  gi as ImageToImagePipeline,
  pi as ImageToTextPipeline,
  Fk as InterruptableStoppingCriteria,
  Qh as JAISLMHeadModel,
  Xh as JAISModel,
  So as JAISPreTrainedModel,
  y_ as JinaCLIPImageProcessor,
  Yh as JinaCLIPModel,
  kr as JinaCLIPPreTrainedModel,
  ed as JinaCLIPProcessor,
  Oo as JinaCLIPTextModel,
  Jh as JinaCLIPVisionModel,
  eg as Lfm2ForCausalLM,
  Zh as Lfm2Model,
  rg as Lfm2MoeForCausalLM,
  sg as Lfm2MoeModel,
  To as Lfm2MoePreTrainedModel,
  Io as Lfm2PreTrainedModel,
  ng as Lfm2VlForConditionalGeneration,
  b_ as Lfm2VlImageProcessor,
  td as Lfm2VlProcessor,
  tg as LightOnOcrForConditionalGeneration,
  s0 as LiteWhisperForConditionalGeneration,
  ig as Llama4ForCausalLM,
  hc2 as Llama4PreTrainedModel,
  ag as LlamaForCausalLM,
  og as LlamaModel,
  zo as LlamaPreTrainedModel,
  fu as LlamaTokenizer,
  Be as LlavaForConditionalGeneration,
  Be as LlavaOnevisionForConditionalGeneration,
  k_ as LlavaOnevisionImageProcessor,
  lc2 as LlavaPreTrainedModel,
  sd as LlavaProcessor,
  eh as LlavaQwen2ForCausalLM,
  Xe as LogLevel,
  et as LogitsProcessor,
  ks2 as LogitsProcessorList,
  wn as LogitsWarper,
  cg as LongT5ForConditionalGeneration,
  lg as LongT5Model,
  Co as LongT5PreTrainedModel,
  ug as M2M100ForConditionalGeneration,
  pg as M2M100Model,
  Po as M2M100PreTrainedModel,
  mu as M2M100Tokenizer,
  gu as MBart50Tokenizer,
  wg as MBartForCausalLM,
  gg as MBartForConditionalGeneration,
  xg as MBartForSequenceClassification,
  hg as MBartModel,
  Ps2 as MBartPreTrainedModel,
  sn2 as MBartTokenizer,
  px as MPNetForMaskedLM,
  dx as MPNetForQuestionAnswering,
  ux as MPNetForSequenceClassification,
  _x as MPNetForTokenClassification,
  cx as MPNetModel,
  os2 as MPNetPreTrainedModel,
  yu as MPNetTokenizer,
  gx as MT5ForConditionalGeneration,
  hx as MT5Model,
  Ko as MT5PreTrainedModel,
  dg as MarianMTModel,
  _g as MarianModel,
  No as MarianPreTrainedModel,
  hu as MarianTokenizer,
  E_ as Mask2FormerImageProcessor,
  v_ as MaskFormerFeatureExtractor,
  mg as MaskFormerForInstanceSegmentation,
  tr2 as MaskFormerImageProcessor,
  fg as MaskFormerModel,
  Lo as MaskFormerPreTrainedModel,
  se as MaskedLMOutput,
  Bl as MaxLengthCriteria,
  yg as Metric3DForDepthEstimation,
  gc2 as Metric3DPreTrainedModel,
  bg as Metric3Dv2ForDepthEstimation,
  xc2 as Metric3Dv2PreTrainedModel,
  kg as MgpstrForSceneTextRecognition,
  wc2 as MgpstrModelOutput,
  yc2 as MgpstrPreTrainedModel,
  rd as MgpstrProcessor,
  xu as MgpstrTokenizer,
  Ro as MimiDecoderModel,
  kc2 as MimiDecoderOutput,
  $o as MimiEncoderModel,
  bc2 as MimiEncoderOutput,
  vg as MimiModel,
  vr as MimiPreTrainedModel,
  Ll as MinLengthLogitsProcessor,
  $l2 as MinNewTokensLengthLogitsProcessor,
  Sg as Ministral3ForCausalLM,
  Mg as Ministral3Model,
  Do as Ministral3PreTrainedModel,
  Ag as MinistralForCausalLM,
  Eg as MinistralModel,
  Fo as MinistralPreTrainedModel,
  Tg as Mistral3ForConditionalGeneration,
  Cg as Mistral4ForCausalLM,
  zg as Mistral4Model,
  qo as Mistral4PreTrainedModel,
  Ig as MistralForCausalLM,
  Og as MistralModel,
  Bo as MistralPreTrainedModel,
  Ng as MobileBertForMaskedLM,
  $g as MobileBertForQuestionAnswering,
  Lg as MobileBertForSequenceClassification,
  Pg as MobileBertModel,
  Ns2 as MobileBertPreTrainedModel,
  wu as MobileBertTokenizer,
  Fg as MobileLLMForCausalLM,
  Rg as MobileLLMModel,
  Uo as MobileLLMPreTrainedModel,
  A_ as MobileNetV1FeatureExtractor,
  Bg as MobileNetV1ForImageClassification,
  qg as MobileNetV1ForSemanticSegmentation,
  ul as MobileNetV1ImageProcessor,
  Dg as MobileNetV1Model,
  Er as MobileNetV1PreTrainedModel,
  M_ as MobileNetV2FeatureExtractor,
  jg as MobileNetV2ForImageClassification,
  Gg as MobileNetV2ForSemanticSegmentation,
  _l as MobileNetV2ImageProcessor,
  Ug as MobileNetV2Model,
  Ar as MobileNetV2PreTrainedModel,
  S_ as MobileNetV3FeatureExtractor,
  Vg as MobileNetV3ForImageClassification,
  Hg as MobileNetV3ForSemanticSegmentation,
  dl as MobileNetV3ImageProcessor,
  Wg as MobileNetV3Model,
  Mr as MobileNetV3PreTrainedModel,
  O_ as MobileNetV4FeatureExtractor,
  Xg as MobileNetV4ForImageClassification,
  Qg as MobileNetV4ForSemanticSegmentation,
  fl as MobileNetV4ImageProcessor,
  Kg as MobileNetV4Model,
  Sr as MobileNetV4PreTrainedModel,
  I_ as MobileViTFeatureExtractor,
  Jg as MobileViTForImageClassification,
  ml as MobileViTImageProcessor,
  Yg as MobileViTModel,
  jo as MobileViTPreTrainedModel,
  ex as MobileViTV2ForImageClassification,
  Zg as MobileViTV2Model,
  Go as MobileViTV2PreTrainedModel,
  ms2 as ModelFileNotFoundError,
  ae as ModelOutput,
  k0 as ModelRegistry,
  ax as ModernBertDecoderForCausalLM,
  ox as ModernBertDecoderModel,
  Wo as ModernBertDecoderPreTrainedModel,
  sx as ModernBertForMaskedLM,
  rx as ModernBertForSequenceClassification,
  nx as ModernBertForTokenClassification,
  tx as ModernBertModel,
  Ls2 as ModernBertPreTrainedModel,
  Zm as Moondream1ForConditionalGeneration,
  Gu as MoonshineFeatureExtractor,
  lx as MoonshineForConditionalGeneration,
  ix as MoonshineModel,
  Vo as MoonshinePreTrainedModel,
  nd as MoonshineProcessor,
  mx as MptForCausalLM,
  fx as MptModel,
  Ho as MptPreTrainedModel,
  xx as MultiModalityCausalLM,
  vc2 as MultiModalityPreTrainedModel,
  yx as MusicgenForCausalLM,
  Qo as MusicgenForConditionalGeneration,
  wx as MusicgenModel,
  Xo as MusicgenPreTrainedModel,
  kx as NanoChatForCausalLM,
  bx as NanoChatModel,
  Yo as NanoChatPreTrainedModel,
  Ex as NemotronHForCausalLM,
  vx as NemotronHModel,
  Jo as NemotronHPreTrainedModel,
  Mx as NeoBertForMaskedLM,
  Ix as NeoBertForQuestionAnswering,
  Sx as NeoBertForSequenceClassification,
  Ox as NeoBertForTokenClassification,
  Ax as NeoBertModel,
  as2 as NeoBertPreTrainedModel,
  bu as NllbTokenizer,
  Rl as NoBadWordsLogitsProcessor,
  Pl as NoRepeatNGramLogitsProcessor,
  Tx as NomicBertModel,
  Ec2 as NomicBertPreTrainedModel,
  T_ as NougatImageProcessor,
  ku as NougatTokenizer,
  Gx as OPTForCausalLM,
  jx as OPTModel,
  oa as OPTPreTrainedModel,
  fi as ObjectDetectionPipeline,
  Nx as Olmo2ForCausalLM,
  Px as Olmo2Model,
  ea as Olmo2PreTrainedModel,
  $x as Olmo3ForCausalLM,
  Lx as Olmo3Model,
  ta as Olmo3PreTrainedModel,
  Cx as OlmoForCausalLM,
  Fx as OlmoHybridForCausalLM,
  Rx as OlmoHybridModel,
  sa as OlmoHybridPreTrainedModel,
  zx as OlmoModel,
  Zo as OlmoPreTrainedModel,
  Bx as OpenAIPrivacyFilterForTokenClassification,
  Dx as OpenAIPrivacyFilterModel,
  ra as OpenAIPrivacyFilterPreTrainedModel,
  Ux as OpenELMForCausalLM,
  qx as OpenELMModel,
  na as OpenELMPreTrainedModel,
  z_ as OwlViTFeatureExtractor,
  Kx as OwlViTForObjectDetection,
  sr2 as OwlViTImageProcessor,
  Hx as OwlViTModel,
  ia as OwlViTPreTrainedModel,
  od as OwlViTProcessor,
  Vx as Owlv2ForObjectDetection,
  C_ as Owlv2ImageProcessor,
  Wx as Owlv2Model,
  aa as Owlv2PreTrainedModel,
  Xx as PaliGemmaForConditionalGeneration,
  ad as PaliGemmaProcessor,
  an2 as ParakeetFeatureExtractor,
  Qx as ParakeetForCTC,
  Ac2 as ParakeetPreTrainedModel,
  Jx as PatchTSMixerForPrediction,
  Yx as PatchTSMixerModel,
  la as PatchTSMixerPreTrainedModel,
  ew as PatchTSTForPrediction,
  Zx as PatchTSTModel,
  ca as PatchTSTPreTrainedModel,
  nw as Phi3ForCausalLM,
  rw as Phi3Model,
  ua as Phi3PreTrainedModel,
  _a2 as Phi3VForCausalLM,
  L_ as Phi3VImageProcessor,
  Mc2 as Phi3VPreTrainedModel,
  id as Phi3VProcessor,
  sw as PhiForCausalLM,
  tw as PhiModel,
  pa as PhiPreTrainedModel,
  $_ as PixtralImageProcessor,
  ld as PixtralProcessor,
  h as PreTrainedModel,
  N as PreTrainedTokenizer,
  ir2 as PretrainedConfig,
  U as Processor,
  aw as PvtForImageClassification,
  R_ as PvtImageProcessor,
  ow as PvtModel,
  da as PvtPreTrainedModel,
  un2 as PyAnnoteFeatureExtractor,
  lw as PyAnnoteForAudioFrameClassification,
  iw as PyAnnoteModel,
  fa as PyAnnotePreTrainedModel,
  cd as PyAnnoteProcessor,
  ie2 as QuestionAnsweringModelOutput,
  ei as QuestionAnsweringPipeline,
  pw as Qwen2ForCausalLM,
  cw as Qwen2Model,
  _w as Qwen2MoeForCausalLM,
  uw as Qwen2MoeModel,
  ha as Qwen2MoePreTrainedModel,
  ma as Qwen2PreTrainedModel,
  vu as Qwen2Tokenizer,
  co as Qwen2VLForCausalLM,
  br2 as Qwen2VLForConditionalGeneration,
  mn2 as Qwen2VLImageProcessor,
  _c2 as Qwen2VLPreTrainedModel,
  ys2 as Qwen2VLProcessor,
  po as Qwen2_5_VLForCausalLM,
  zs2 as Qwen2_5_VLForConditionalGeneration,
  gn as Qwen2_5_VLProcessor,
  fw as Qwen3ForCausalLM,
  dw as Qwen3Model,
  hw as Qwen3MoeForCausalLM,
  mw as Qwen3MoeModel,
  xa as Qwen3MoePreTrainedModel,
  xw as Qwen3NextForCausalLM,
  gw as Qwen3NextModel,
  wa as Qwen3NextPreTrainedModel,
  ga as Qwen3PreTrainedModel,
  ya as Qwen3VLForCausalLM,
  $s2 as Qwen3VLForConditionalGeneration,
  yw as Qwen3VLMoeForCausalLM,
  ww as Qwen3VLMoeForConditionalGeneration,
  pd as Qwen3VLProcessor,
  ba as Qwen3_5ForCausalLM,
  Or as Qwen3_5ForConditionalGeneration,
  kw as Qwen3_5MoeForCausalLM,
  bw as Qwen3_5MoeForConditionalGeneration,
  Mw as RFDetrForObjectDetection,
  Aw as RFDetrModel,
  Sc2 as RFDetrObjectDetectionOutput,
  va as RFDetrPreTrainedModel,
  Rf as RTDetrForObjectDetection,
  F_ as RTDetrImageProcessor,
  $f as RTDetrModel,
  Et as RTDetrObjectDetectionOutput,
  Un as RTDetrPreTrainedModel,
  Fw as RTDetrV2ForObjectDetection,
  Rw as RTDetrV2Model,
  Oc2 as RTDetrV2ObjectDetectionOutput,
  Ea as RTDetrV2PreTrainedModel,
  nn2 as RawAudio,
  Se as RawImage,
  dp as RawVideo,
  bi as RawVideoFrame,
  Nl as RepetitionPenaltyLogitsProcessor,
  Ew as ResNetForImageClassification,
  vw as ResNetModel,
  ka2 as ResNetPreTrainedModel,
  Pw as RoFormerForMaskedLM,
  $w as RoFormerForQuestionAnswering,
  Nw as RoFormerForSequenceClassification,
  Lw as RoFormerForTokenClassification,
  Cw as RoFormerModel,
  ls2 as RoFormerPreTrainedModel,
  Au as RoFormerTokenizer,
  Ow as RobertaForMaskedLM,
  zw as RobertaForQuestionAnswering,
  Iw as RobertaForSequenceClassification,
  Tw as RobertaForTokenClassification,
  Sw as RobertaModel,
  is2 as RobertaPreTrainedModel,
  Eu as RobertaTokenizer,
  hn2 as Sam2ImageProcessor,
  zc2 as Sam2ImageSegmentationOutput,
  Aa as Sam2Model,
  Cc2 as Sam2PreTrainedModel,
  bl as Sam2Processor,
  ud as Sam2VideoProcessor,
  hn2 as Sam3ImageProcessor,
  qw as Sam3TrackerModel,
  hn2 as SamImageProcessor,
  Ic2 as SamImageSegmentationOutput,
  Dw as SamModel,
  Tc2 as SamPreTrainedModel,
  xn as SamProcessor,
  D_ as SapiensFeatureExtractor,
  jw as SapiensForDepthEstimation,
  Gw as SapiensForNormalEstimation,
  Uw as SapiensForSemanticSegmentation,
  hl as SapiensImageProcessor,
  Ir as SapiensPreTrainedModel,
  Wu as SeamlessM4TFeatureExtractor,
  B_ as SegformerFeatureExtractor,
  Vw as SegformerForImageClassification,
  Hw as SegformerForSemanticSegmentation,
  gl as SegformerImageProcessor,
  Ww as SegformerModel,
  Tr as SegformerPreTrainedModel,
  Ol as Seq2SeqLMOutput,
  z as SequenceClassifierOutput,
  q_ as SiglipImageProcessor,
  Kw as SiglipModel,
  Ma as SiglipPreTrainedModel,
  Sa as SiglipTextModel,
  Mu as SiglipTokenizer,
  Xw as SiglipVisionModel,
  Yw as SmolLM3ForCausalLM,
  Qw as SmolLM3Model,
  Oa as SmolLM3PreTrainedModel,
  Jw as SmolVLMForConditionalGeneration,
  pl as SmolVLMImageProcessor,
  yl as SmolVLMProcessor,
  Ta as SnacDecoderModel,
  Ia as SnacEncoderModel,
  Vu as SnacFeatureExtractor,
  Zw as SnacModel,
  zr as SnacPreTrainedModel,
  ty as SolarOpenForCausalLM,
  ey as SolarOpenModel,
  za2 as SolarOpenPreTrainedModel,
  Hu as SpeechT5FeatureExtractor,
  ry as SpeechT5ForSpeechToText,
  ny as SpeechT5ForTextToSpeech,
  oy as SpeechT5HifiGan,
  sy as SpeechT5Model,
  Cr as SpeechT5PreTrainedModel,
  _d as SpeechT5Processor,
  Su as SpeechT5Tokenizer,
  iy as SqueezeBertForMaskedLM,
  cy as SqueezeBertForQuestionAnswering,
  ly as SqueezeBertForSequenceClassification,
  ay as SqueezeBertModel,
  Rs2 as SqueezeBertPreTrainedModel,
  Ou as SqueezeBertTokenizer,
  uy as StableLmForCausalLM,
  py as StableLmModel,
  Ca as StableLmPreTrainedModel,
  dy as Starcoder2ForCausalLM,
  _y as Starcoder2Model,
  Pa2 as Starcoder2PreTrainedModel,
  Xt2 as StoppingCriteria,
  pr2 as StoppingCriteriaList,
  fy as StyleTextToSpeech2Model,
  Pc2 as StyleTextToSpeech2PreTrainedModel,
  si as SummarizationPipeline,
  Na2 as SupertonicForConditionalGeneration,
  Nc2 as SupertonicPreTrainedModel,
  cr2 as SuppressTokensAtBeginLogitsProcessor,
  zl as SuppressTokensLogitsProcessor,
  wy as Swin2SRForImageSuperResolution,
  U_ as Swin2SRImageProcessor,
  xy as Swin2SRModel,
  La as Swin2SRPreTrainedModel,
  hy as SwinForImageClassification,
  gy as SwinForSemanticSegmentation,
  my as SwinModel,
  Pr as SwinPreTrainedModel,
  by as T5ForConditionalGeneration,
  yy as T5Model,
  $a2 as T5PreTrainedModel,
  Iu as T5Tokenizer,
  vy as TableTransformerForObjectDetection,
  ky as TableTransformerModel,
  Lc2 as TableTransformerObjectDetectionOutput,
  Ra2 as TableTransformerPreTrainedModel,
  Dl as TemperatureLogitsWarper,
  E as Tensor,
  zt as Text2TextGenerationPipeline,
  Ja2 as TextClassificationPipeline,
  ni as TextGenerationPipeline,
  b0 as TextStreamer,
  ci as TextToAudioPipeline,
  Za2 as TokenClassificationPipeline,
  te as TokenClassifierOutput,
  N as TokenizersBackend,
  Rk as TopKLogitsWarper,
  $k as TopPLogitsWarper,
  Ey as TrOCRForCausalLM,
  $c2 as TrOCRPreTrainedModel,
  ri as TranslationPipeline,
  Cs2 as UltravoxModel,
  dc2 as UltravoxPreTrainedModel,
  dd as UltravoxProcessor,
  My as UniSpeechForCTC,
  Sy as UniSpeechForSequenceClassification,
  Ay as UniSpeechModel,
  Nr as UniSpeechPreTrainedModel,
  zy as UniSpeechSatForAudioFrameClassification,
  Iy as UniSpeechSatForCTC,
  Ty as UniSpeechSatForSequenceClassification,
  Oy as UniSpeechSatModel,
  Fs2 as UniSpeechSatPreTrainedModel,
  Z_ as VLChatProcessor,
  w_ as VLMImageProcessor,
  Py as VaultGemmaForCausalLM,
  Cy as VaultGemmaModel,
  Fa2 as VaultGemmaPreTrainedModel,
  j_ as ViTFeatureExtractor,
  $y as ViTForImageClassification,
  xl as ViTImageProcessor,
  Ry as ViTMAEModel,
  Rc2 as ViTMAEPreTrainedModel,
  Dy as ViTMSNForImageClassification,
  Fy as ViTMSNModel,
  Ba as ViTMSNPreTrainedModel,
  Ly as ViTModel,
  Da2 as ViTPreTrainedModel,
  Ny as VisionEncoderDecoderModel,
  By as VitMatteForImageMatting,
  G_ as VitMatteImageProcessor,
  Fc as VitMattePreTrainedModel,
  qy as VitPoseForPoseEstimation,
  W_ as VitPoseImageProcessor,
  Dc2 as VitPosePreTrainedModel,
  Uy as VitsModel,
  Bc2 as VitsModelOutput,
  qc as VitsPreTrainedModel,
  zu as VitsTokenizer,
  jy as VoxtralForConditionalGeneration,
  fd as VoxtralProcessor,
  Qu as VoxtralRealtimeFeatureExtractor,
  qa2 as VoxtralRealtimeForConditionalGeneration,
  Uc2 as VoxtralRealtimePreTrainedModel,
  hd as VoxtralRealtimeProcessor,
  Hy as Wav2Vec2BertForCTC,
  Ky as Wav2Vec2BertForSequenceClassification,
  Vy as Wav2Vec2BertModel,
  Lr as Wav2Vec2BertPreTrainedModel,
  Cu as Wav2Vec2CTCTokenizer,
  Ku as Wav2Vec2FeatureExtractor,
  Bh as Wav2Vec2ForAudioFrameClassification,
  Fh as Wav2Vec2ForCTC,
  Dh as Wav2Vec2ForSequenceClassification,
  Rh as Wav2Vec2Model,
  gt2 as Wav2Vec2PreTrainedModel,
  gd as Wav2Vec2Processor,
  xd as Wav2Vec2ProcessorWithLM,
  Zy as WavLMForAudioFrameClassification,
  Qy as WavLMForCTC,
  Yy as WavLMForSequenceClassification,
  Jy as WavLMForXVector,
  Xy as WavLMModel,
  cs2 as WavLMPreTrainedModel,
  Xu as WeSpeakerFeatureExtractor,
  e0 as WeSpeakerResNetModel,
  Gc2 as WeSpeakerResNetPreTrainedModel,
  Yu as WhisperFeatureExtractor,
  Vc as WhisperForConditionalGeneration,
  t0 as WhisperModel,
  Ua2 as WhisperPreTrainedModel,
  wd as WhisperProcessor,
  N1 as WhisperTextStreamer,
  Cl as WhisperTimeStampLogitsProcessor,
  Pu as WhisperTokenizer,
  i0 as XLMForQuestionAnswering,
  o0 as XLMForSequenceClassification,
  a0 as XLMForTokenClassification,
  r0 as XLMModel,
  ps2 as XLMPreTrainedModel,
  c0 as XLMRobertaForMaskedLM,
  _0 as XLMRobertaForQuestionAnswering,
  p0 as XLMRobertaForSequenceClassification,
  u0 as XLMRobertaForTokenClassification,
  l0 as XLMRobertaModel,
  us2 as XLMRobertaPreTrainedModel,
  Nu as XLMRobertaTokenizer,
  Lu as XLMTokenizer,
  n0 as XLMWithLMHeadModel,
  jc as XVectorOutput,
  V_ as YolosFeatureExtractor,
  f0 as YolosForObjectDetection,
  wl as YolosImageProcessor,
  d0 as YolosModel,
  Hc as YolosObjectDetectionOutput,
  ja2 as YolosPreTrainedModel,
  h0 as YoutuForCausalLM,
  m0 as YoutuModel,
  Ga2 as YoutuPreTrainedModel,
  x0 as ZayaForCausalLM,
  g0 as ZayaModel,
  Wa2 as ZayaPreTrainedModel,
  ii as ZeroShotAudioClassificationPipeline,
  oi as ZeroShotClassificationPipeline,
  di as ZeroShotImageClassificationPipeline,
  mi as ZeroShotObjectDetectionPipeline,
  ne as cat,
  $M as cos_sim,
  jb as dot,
  J as env,
  Ae as full,
  Zr2 as full_like,
  Bp as interpolate,
  He2 as interpolate_4d,
  F2 as layer_norm,
  kk as load_audio,
  _S as load_image,
  lO as load_video,
  $p as log_softmax,
  uk as matmul,
  Xi as mean,
  _k as mean_pooling,
  Oe as ones,
  Qs2 as ones_like,
  jM as permute,
  Mee as pipeline,
  fk as quantize_embeddings,
  D2 as rand,
  dk as randn,
  fs2 as random,
  Fu as read_audio,
  R2 as rfft,
  Ki as slice,
  ge as softmax,
  Ge as stack,
  qp as std_mean,
  mt as topk,
  jp as zeros,
  en2 as zeros_like
};
/*! Bundled license information:

onnxruntime-web/dist/ort.webgpu.bundle.min.mjs:
  (*!
   * ONNX Runtime Web v1.31.0-dev.20260914-8d85527a0
   * Copyright (c) Microsoft Corporation. All rights reserved.
   * Licensed under the MIT License.
   *)
*/
