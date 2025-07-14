"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
        if (__hasOwnProp.call(b, prop))
            __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
        for (var prop of __getOwnPropSymbols(b)) {
            if (__propIsEnum.call(b, prop))
                __defNormalProp(a, prop, b[prop]);
        }
    return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __objRest = (source, exclude) => {
    var target = {};
    for (var prop in source)
        if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
            target[prop] = source[prop];
    if (source != null && __getOwnPropSymbols)
        for (var prop of __getOwnPropSymbols(source)) {
            if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
                target[prop] = source[prop];
        }
    return target;
};
var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
    for (var name in all)
        __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))
            if (!__hasOwnProp.call(to, key) && key !== except)
                __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __async = (__this, __arguments, generator) => {
    return new Promise((resolve, reject) => {
        var fulfilled = (value) => {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        };
        var rejected = (value) => {
            try {
                step(generator.throw(value));
            } catch (e) {
                reject(e);
            }
        };
        var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
        step((generator = generator.apply(__this, __arguments)).next());
    });
};

// node_modules/@swc/helpers/cjs/_interop_require_default.cjs
var require_interop_require_default = __commonJS({
    "node_modules/@swc/helpers/cjs/_interop_require_default.cjs" (exports2) {
        "use strict";

        function _interop_require_default(obj) {
            return obj && obj.__esModule ? obj : { default: obj };
        }
        exports2._ = _interop_require_default;
    }
});

// node_modules/next/dist/shared/lib/utils/warn-once.js
var require_warn_once = __commonJS({
    "node_modules/next/dist/shared/lib/utils/warn-once.js" (exports2) {
        "use strict";
        Object.defineProperty(exports2, "__esModule", {
            value: true
        });
        Object.defineProperty(exports2, "warnOnce", {
            enumerable: true,
            get: function() {
                return warnOnce;
            }
        });
        var warnOnce = (_) => {};
        if (process.env.NODE_ENV !== "production") {
            const warnings = /* @__PURE__ */ new Set();
            warnOnce = (msg) => {
                if (!warnings.has(msg)) {
                    console.warn(msg);
                }
                warnings.add(msg);
            };
        }
    }
});

// node_modules/next/dist/shared/lib/image-blur-svg.js
var require_image_blur_svg = __commonJS({
    "node_modules/next/dist/shared/lib/image-blur-svg.js" (exports2) {
        "use strict";
        Object.defineProperty(exports2, "__esModule", {
            value: true
        });
        Object.defineProperty(exports2, "getImageBlurSvg", {
            enumerable: true,
            get: function() {
                return getImageBlurSvg;
            }
        });

        function getImageBlurSvg(param) {
            let { widthInt, heightInt, blurWidth, blurHeight, blurDataURL, objectFit } = param;
            const std = 20;
            const svgWidth = blurWidth ? blurWidth * 40 : widthInt;
            const svgHeight = blurHeight ? blurHeight * 40 : heightInt;
            const viewBox = svgWidth && svgHeight ? "viewBox='0 0 " + svgWidth + " " + svgHeight + "'" : "";
            const preserveAspectRatio = viewBox ? "none" : objectFit === "contain" ? "xMidYMid" : objectFit === "cover" ? "xMidYMid slice" : "none";
            return "%3Csvg xmlns='http://www.w3.org/2000/svg' " + viewBox + "%3E%3Cfilter id='b' color-interpolation-filters='sRGB'%3E%3CfeGaussianBlur stdDeviation='" + std + "'/%3E%3CfeColorMatrix values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 100 -1' result='s'/%3E%3CfeFlood x='0' y='0' width='100%25' height='100%25'/%3E%3CfeComposite operator='out' in='s'/%3E%3CfeComposite in2='SourceGraphic'/%3E%3CfeGaussianBlur stdDeviation='" + std + "'/%3E%3C/filter%3E%3Cimage width='100%25' height='100%25' x='0' y='0' preserveAspectRatio='" + preserveAspectRatio + "' style='filter: url(%23b);' href='" + blurDataURL + "'/%3E%3C/svg%3E";
        }
    }
});

// node_modules/next/dist/shared/lib/image-config.js
var require_image_config = __commonJS({
    "node_modules/next/dist/shared/lib/image-config.js" (exports2) {
        "use strict";
        Object.defineProperty(exports2, "__esModule", {
            value: true
        });

        function _export(target, all) {
            for (var name in all) Object.defineProperty(target, name, {
                enumerable: true,
                get: all[name]
            });
        }
        _export(exports2, {
            VALID_LOADERS: function() {
                return VALID_LOADERS;
            },
            imageConfigDefault: function() {
                return imageConfigDefault;
            }
        });
        var VALID_LOADERS = [
            "default",
            "imgix",
            "cloudinary",
            "akamai",
            "custom"
        ];
        var imageConfigDefault = {
            deviceSizes: [
                640,
                750,
                828,
                1080,
                1200,
                1920,
                2048,
                3840
            ],
            imageSizes: [
                16,
                32,
                48,
                64,
                96,
                128,
                256,
                384
            ],
            path: "/_next/image",
            loader: "default",
            loaderFile: "",
            domains: [],
            disableStaticImages: false,
            minimumCacheTTL: 60,
            formats: [
                "image/webp"
            ],
            dangerouslyAllowSVG: false,
            contentSecurityPolicy: "script-src 'none'; frame-src 'none'; sandbox;",
            contentDispositionType: "attachment",
            localPatterns: void 0,
            remotePatterns: [],
            qualities: void 0,
            unoptimized: false
        };
    }
});

// node_modules/next/dist/shared/lib/get-img-props.js
var require_get_img_props = __commonJS({
    "node_modules/next/dist/shared/lib/get-img-props.js" (exports2) {
        "use strict";
        Object.defineProperty(exports2, "__esModule", {
            value: true
        });
        Object.defineProperty(exports2, "getImgProps", {
            enumerable: true,
            get: function() {
                return getImgProps;
            }
        });
        var _warnonce = require_warn_once();
        var _imageblursvg = require_image_blur_svg();
        var _imageconfig = require_image_config();
        var VALID_LOADING_VALUES = [
            "lazy",
            "eager",
            void 0
        ];
        var INVALID_BACKGROUND_SIZE_VALUES = [
            "-moz-initial",
            "fill",
            "none",
            "scale-down",
            void 0
        ];

        function isStaticRequire(src) {
            return src.default !== void 0;
        }

        function isStaticImageData(src) {
            return src.src !== void 0;
        }

        function isStaticImport(src) {
            return !!src && typeof src === "object" && (isStaticRequire(src) || isStaticImageData(src));
        }
        var allImgs = /* @__PURE__ */ new Map();
        var perfObserver;

        function getInt(x) {
            if (typeof x === "undefined") {
                return x;
            }
            if (typeof x === "number") {
                return Number.isFinite(x) ? x : NaN;
            }
            if (typeof x === "string" && /^[0-9]+$/.test(x)) {
                return parseInt(x, 10);
            }
            return NaN;
        }

        function getWidths(param, width, sizes) {
            let { deviceSizes, allSizes } = param;
            if (sizes) {
                const viewportWidthRe = /(^|\s)(1?\d?\d)vw/g;
                const percentSizes = [];
                for (let match; match = viewportWidthRe.exec(sizes); match) {
                    percentSizes.push(parseInt(match[2]));
                }
                if (percentSizes.length) {
                    const smallestRatio = Math.min(...percentSizes) * 0.01;
                    return {
                        widths: allSizes.filter((s) => s >= deviceSizes[0] * smallestRatio),
                        kind: "w"
                    };
                }
                return {
                    widths: allSizes,
                    kind: "w"
                };
            }
            if (typeof width !== "number") {
                return {
                    widths: deviceSizes,
                    kind: "w"
                };
            }
            const widths = [
                ...new Set(
                    // > This means that most OLED screens that say they are 3x resolution,
                    // > are actually 3x in the green color, but only 1.5x in the red and
                    // > blue colors. Showing a 3x resolution image in the app vs a 2x
                    // > resolution image will be visually the same, though the 3x image
                    // > takes significantly more data. Even true 3x resolution screens are
                    // > wasteful as the human eye cannot see that level of detail without
                    // > something like a magnifying glass.
                    // https://blog.twitter.com/engineering/en_us/topics/infrastructure/2019/capping-image-fidelity-on-ultra-high-resolution-devices.html
                    [
                        width,
                        width * 2
                        /*, width * 3*/
                    ].map((w) => allSizes.find((p) => p >= w) || allSizes[allSizes.length - 1])
                )
            ];
            return {
                widths,
                kind: "x"
            };
        }

        function generateImgAttrs(param) {
            let { config, src, unoptimized, width, quality, sizes, loader } = param;
            if (unoptimized) {
                return {
                    src,
                    srcSet: void 0,
                    sizes: void 0
                };
            }
            const { widths, kind } = getWidths(config, width, sizes);
            const last = widths.length - 1;
            return {
                sizes: !sizes && kind === "w" ? "100vw" : sizes,
                srcSet: widths.map((w, i) => loader({
                    config,
                    src,
                    quality,
                    width: w
                }) + " " + (kind === "w" ? w : i + 1) + kind).join(", "),
                // It's intended to keep `src` the last attribute because React updates
                // attributes in order. If we keep `src` the first one, Safari will
                // immediately start to fetch `src`, before `sizes` and `srcSet` are even
                // updated by React. That causes multiple unnecessary requests if `srcSet`
                // and `sizes` are defined.
                // This bug cannot be reproduced in Chrome or Firefox.
                src: loader({
                    config,
                    src,
                    quality,
                    width: widths[last]
                })
            };
        }

        function getImgProps(param, _state) {
            let _a = param,
                { src, sizes, unoptimized = false, priority = false, loading, className, quality, width, height, fill = false, style, overrideSrc, onLoad, onLoadingComplete, placeholder = "empty", blurDataURL, fetchPriority, decoding = "async", layout, objectFit, objectPosition, lazyBoundary, lazyRoot } = _a,
                rest = __objRest(_a, ["src", "sizes", "unoptimized", "priority", "loading", "className", "quality", "width", "height", "fill", "style", "overrideSrc", "onLoad", "onLoadingComplete", "placeholder", "blurDataURL", "fetchPriority", "decoding", "layout", "objectFit", "objectPosition", "lazyBoundary", "lazyRoot"]);
            const { imgConf, showAltText, blurComplete, defaultLoader } = _state;
            let config;
            let c = imgConf || _imageconfig.imageConfigDefault;
            if ("allSizes" in c) {
                config = c;
            } else {
                var _c_qualities;
                const allSizes = [
                    ...c.deviceSizes,
                    ...c.imageSizes
                ].sort((a, b) => a - b);
                const deviceSizes = c.deviceSizes.sort((a, b) => a - b);
                const qualities = (_c_qualities = c.qualities) == null ? void 0 : _c_qualities.sort((a, b) => a - b);
                config = __spreadProps(__spreadValues({}, c), {
                    allSizes,
                    deviceSizes,
                    qualities
                });
            }
            if (typeof defaultLoader === "undefined") {
                throw Object.defineProperty(new Error("images.loaderFile detected but the file is missing default export.\nRead more: https://nextjs.org/docs/messages/invalid-images-config"), "__NEXT_ERROR_CODE", {
                    value: "E163",
                    enumerable: false,
                    configurable: true
                });
            }
            let loader = rest.loader || defaultLoader;
            delete rest.loader;
            delete rest.srcSet;
            const isDefaultLoader = "__next_img_default" in loader;
            if (isDefaultLoader) {
                if (config.loader === "custom") {
                    throw Object.defineProperty(new Error('Image with src "' + src + '" is missing "loader" prop.\nRead more: https://nextjs.org/docs/messages/next-image-missing-loader'), "__NEXT_ERROR_CODE", {
                        value: "E252",
                        enumerable: false,
                        configurable: true
                    });
                }
            } else {
                const customImageLoader = loader;
                loader = (obj) => {
                    const _a2 = obj,
                        { config: _ } = _a2,
                        opts = __objRest(_a2, ["config"]);
                    return customImageLoader(opts);
                };
            }
            if (layout) {
                if (layout === "fill") {
                    fill = true;
                }
                const layoutToStyle = {
                    intrinsic: {
                        maxWidth: "100%",
                        height: "auto"
                    },
                    responsive: {
                        width: "100%",
                        height: "auto"
                    }
                };
                const layoutToSizes = {
                    responsive: "100vw",
                    fill: "100vw"
                };
                const layoutStyle = layoutToStyle[layout];
                if (layoutStyle) {
                    style = __spreadValues(__spreadValues({}, style), layoutStyle);
                }
                const layoutSizes = layoutToSizes[layout];
                if (layoutSizes && !sizes) {
                    sizes = layoutSizes;
                }
            }
            let staticSrc = "";
            let widthInt = getInt(width);
            let heightInt = getInt(height);
            let blurWidth;
            let blurHeight;
            if (isStaticImport(src)) {
                const staticImageData = isStaticRequire(src) ? src.default : src;
                if (!staticImageData.src) {
                    throw Object.defineProperty(new Error("An object should only be passed to the image component src parameter if it comes from a static image import. It must include src. Received " + JSON.stringify(staticImageData)), "__NEXT_ERROR_CODE", {
                        value: "E460",
                        enumerable: false,
                        configurable: true
                    });
                }
                if (!staticImageData.height || !staticImageData.width) {
                    throw Object.defineProperty(new Error("An object should only be passed to the image component src parameter if it comes from a static image import. It must include height and width. Received " + JSON.stringify(staticImageData)), "__NEXT_ERROR_CODE", {
                        value: "E48",
                        enumerable: false,
                        configurable: true
                    });
                }
                blurWidth = staticImageData.blurWidth;
                blurHeight = staticImageData.blurHeight;
                blurDataURL = blurDataURL || staticImageData.blurDataURL;
                staticSrc = staticImageData.src;
                if (!fill) {
                    if (!widthInt && !heightInt) {
                        widthInt = staticImageData.width;
                        heightInt = staticImageData.height;
                    } else if (widthInt && !heightInt) {
                        const ratio = widthInt / staticImageData.width;
                        heightInt = Math.round(staticImageData.height * ratio);
                    } else if (!widthInt && heightInt) {
                        const ratio = heightInt / staticImageData.height;
                        widthInt = Math.round(staticImageData.width * ratio);
                    }
                }
            }
            src = typeof src === "string" ? src : staticSrc;
            let isLazy = !priority && (loading === "lazy" || typeof loading === "undefined");
            if (!src || src.startsWith("data:") || src.startsWith("blob:")) {
                unoptimized = true;
                isLazy = false;
            }
            if (config.unoptimized) {
                unoptimized = true;
            }
            if (isDefaultLoader && !config.dangerouslyAllowSVG && src.split("?", 1)[0].endsWith(".svg")) {
                unoptimized = true;
            }
            const qualityInt = getInt(quality);
            if (process.env.NODE_ENV !== "production") {
                if (config.output === "export" && isDefaultLoader && !unoptimized) {
                    throw Object.defineProperty(new Error("Image Optimization using the default loader is not compatible with `{ output: 'export' }`.\n  Possible solutions:\n    - Remove `{ output: 'export' }` and run \"next start\" to run server mode including the Image Optimization API.\n    - Configure `{ images: { unoptimized: true } }` in `next.config.js` to disable the Image Optimization API.\n  Read more: https://nextjs.org/docs/messages/export-image-api"), "__NEXT_ERROR_CODE", {
                        value: "E500",
                        enumerable: false,
                        configurable: true
                    });
                }
                if (!src) {
                    unoptimized = true;
                } else {
                    if (fill) {
                        if (width) {
                            throw Object.defineProperty(new Error('Image with src "' + src + '" has both "width" and "fill" properties. Only one should be used.'), "__NEXT_ERROR_CODE", {
                                value: "E96",
                                enumerable: false,
                                configurable: true
                            });
                        }
                        if (height) {
                            throw Object.defineProperty(new Error('Image with src "' + src + '" has both "height" and "fill" properties. Only one should be used.'), "__NEXT_ERROR_CODE", {
                                value: "E115",
                                enumerable: false,
                                configurable: true
                            });
                        }
                        if ((style == null ? void 0 : style.position) && style.position !== "absolute") {
                            throw Object.defineProperty(new Error('Image with src "' + src + '" has both "fill" and "style.position" properties. Images with "fill" always use position absolute - it cannot be modified.'), "__NEXT_ERROR_CODE", {
                                value: "E216",
                                enumerable: false,
                                configurable: true
                            });
                        }
                        if ((style == null ? void 0 : style.width) && style.width !== "100%") {
                            throw Object.defineProperty(new Error('Image with src "' + src + '" has both "fill" and "style.width" properties. Images with "fill" always use width 100% - it cannot be modified.'), "__NEXT_ERROR_CODE", {
                                value: "E73",
                                enumerable: false,
                                configurable: true
                            });
                        }
                        if ((style == null ? void 0 : style.height) && style.height !== "100%") {
                            throw Object.defineProperty(new Error('Image with src "' + src + '" has both "fill" and "style.height" properties. Images with "fill" always use height 100% - it cannot be modified.'), "__NEXT_ERROR_CODE", {
                                value: "E404",
                                enumerable: false,
                                configurable: true
                            });
                        }
                    } else {
                        if (typeof widthInt === "undefined") {
                            throw Object.defineProperty(new Error('Image with src "' + src + '" is missing required "width" property.'), "__NEXT_ERROR_CODE", {
                                value: "E451",
                                enumerable: false,
                                configurable: true
                            });
                        } else if (isNaN(widthInt)) {
                            throw Object.defineProperty(new Error('Image with src "' + src + '" has invalid "width" property. Expected a numeric value in pixels but received "' + width + '".'), "__NEXT_ERROR_CODE", {
                                value: "E66",
                                enumerable: false,
                                configurable: true
                            });
                        }
                        if (typeof heightInt === "undefined") {
                            throw Object.defineProperty(new Error('Image with src "' + src + '" is missing required "height" property.'), "__NEXT_ERROR_CODE", {
                                value: "E397",
                                enumerable: false,
                                configurable: true
                            });
                        } else if (isNaN(heightInt)) {
                            throw Object.defineProperty(new Error('Image with src "' + src + '" has invalid "height" property. Expected a numeric value in pixels but received "' + height + '".'), "__NEXT_ERROR_CODE", {
                                value: "E444",
                                enumerable: false,
                                configurable: true
                            });
                        }
                        if (/^[\x00-\x20]/.test(src)) {
                            throw Object.defineProperty(new Error('Image with src "' + src + '" cannot start with a space or control character. Use src.trimStart() to remove it or encodeURIComponent(src) to keep it.'), "__NEXT_ERROR_CODE", {
                                value: "E176",
                                enumerable: false,
                                configurable: true
                            });
                        }
                        if (/[\x00-\x20]$/.test(src)) {
                            throw Object.defineProperty(new Error('Image with src "' + src + '" cannot end with a space or control character. Use src.trimEnd() to remove it or encodeURIComponent(src) to keep it.'), "__NEXT_ERROR_CODE", {
                                value: "E21",
                                enumerable: false,
                                configurable: true
                            });
                        }
                    }
                }
                if (!VALID_LOADING_VALUES.includes(loading)) {
                    throw Object.defineProperty(new Error('Image with src "' + src + '" has invalid "loading" property. Provided "' + loading + '" should be one of ' + VALID_LOADING_VALUES.map(String).join(",") + "."), "__NEXT_ERROR_CODE", {
                        value: "E357",
                        enumerable: false,
                        configurable: true
                    });
                }
                if (priority && loading === "lazy") {
                    throw Object.defineProperty(new Error('Image with src "' + src + `" has both "priority" and "loading='lazy'" properties. Only one should be used.`), "__NEXT_ERROR_CODE", {
                        value: "E218",
                        enumerable: false,
                        configurable: true
                    });
                }
                if (placeholder !== "empty" && placeholder !== "blur" && !placeholder.startsWith("data:image/")) {
                    throw Object.defineProperty(new Error('Image with src "' + src + '" has invalid "placeholder" property "' + placeholder + '".'), "__NEXT_ERROR_CODE", {
                        value: "E431",
                        enumerable: false,
                        configurable: true
                    });
                }
                if (placeholder !== "empty") {
                    if (widthInt && heightInt && widthInt * heightInt < 1600) {
                        (0, _warnonce.warnOnce)('Image with src "' + src + '" is smaller than 40x40. Consider removing the "placeholder" property to improve performance.');
                    }
                }
                if (placeholder === "blur" && !blurDataURL) {
                    const VALID_BLUR_EXT = [
                        "jpeg",
                        "png",
                        "webp",
                        "avif"
                    ];
                    throw Object.defineProperty(new Error('Image with src "' + src + `" has "placeholder='blur'" property but is missing the "blurDataURL" property.
        Possible solutions:
          - Add a "blurDataURL" property, the contents should be a small Data URL to represent the image
          - Change the "src" property to a static import with one of the supported file types: ` + VALID_BLUR_EXT.join(",") + ' (animated images not supported)\n          - Remove the "placeholder" property, effectively no blur effect\n        Read more: https://nextjs.org/docs/messages/placeholder-blur-data-url'), "__NEXT_ERROR_CODE", {
                        value: "E371",
                        enumerable: false,
                        configurable: true
                    });
                }
                if ("ref" in rest) {
                    (0, _warnonce.warnOnce)('Image with src "' + src + '" is using unsupported "ref" property. Consider using the "onLoad" property instead.');
                }
                if (!unoptimized && !isDefaultLoader) {
                    const urlStr = loader({
                        config,
                        src,
                        width: widthInt || 400,
                        quality: qualityInt || 75
                    });
                    let url;
                    try {
                        url = new URL(urlStr);
                    } catch (err) {}
                    if (urlStr === src || url && url.pathname === src && !url.search) {
                        (0, _warnonce.warnOnce)('Image with src "' + src + '" has a "loader" property that does not implement width. Please implement it or use the "unoptimized" property instead.\nRead more: https://nextjs.org/docs/messages/next-image-missing-loader-width');
                    }
                }
                if (onLoadingComplete) {
                    (0, _warnonce.warnOnce)('Image with src "' + src + '" is using deprecated "onLoadingComplete" property. Please use the "onLoad" property instead.');
                }
                for (const [legacyKey, legacyValue] of Object.entries({
                        layout,
                        objectFit,
                        objectPosition,
                        lazyBoundary,
                        lazyRoot
                    })) {
                    if (legacyValue) {
                        (0, _warnonce.warnOnce)('Image with src "' + src + '" has legacy prop "' + legacyKey + '". Did you forget to run the codemod?\nRead more: https://nextjs.org/docs/messages/next-image-upgrade-to-13');
                    }
                }
                if (typeof window !== "undefined" && !perfObserver && window.PerformanceObserver) {
                    perfObserver = new PerformanceObserver((entryList) => {
                        for (const entry of entryList.getEntries()) {
                            var _entry_element;
                            const imgSrc = (entry == null ? void 0 : (_entry_element = entry.element) == null ? void 0 : _entry_element.src) || "";
                            const lcpImage = allImgs.get(imgSrc);
                            if (lcpImage && !lcpImage.priority && lcpImage.placeholder === "empty" && !lcpImage.src.startsWith("data:") && !lcpImage.src.startsWith("blob:")) {
                                (0, _warnonce.warnOnce)('Image with src "' + lcpImage.src + '" was detected as the Largest Contentful Paint (LCP). Please add the "priority" property if this image is above the fold.\nRead more: https://nextjs.org/docs/api-reference/next/image#priority');
                            }
                        }
                    });
                    try {
                        perfObserver.observe({
                            type: "largest-contentful-paint",
                            buffered: true
                        });
                    } catch (err) {
                        console.error(err);
                    }
                }
            }
            const imgStyle = Object.assign(fill ? {
                position: "absolute",
                height: "100%",
                width: "100%",
                left: 0,
                top: 0,
                right: 0,
                bottom: 0,
                objectFit,
                objectPosition
            } : {}, showAltText ? {} : {
                color: "transparent"
            }, style);
            const backgroundImage = !blurComplete && placeholder !== "empty" ? placeholder === "blur" ? 'url("data:image/svg+xml;charset=utf-8,' + (0, _imageblursvg.getImageBlurSvg)({
                widthInt,
                heightInt,
                blurWidth,
                blurHeight,
                blurDataURL: blurDataURL || "",
                objectFit: imgStyle.objectFit
            }) + '")' : 'url("' + placeholder + '")' : null;
            const backgroundSize = !INVALID_BACKGROUND_SIZE_VALUES.includes(imgStyle.objectFit) ? imgStyle.objectFit : imgStyle.objectFit === "fill" ? "100% 100%" : "cover";
            let placeholderStyle = backgroundImage ? {
                backgroundSize,
                backgroundPosition: imgStyle.objectPosition || "50% 50%",
                backgroundRepeat: "no-repeat",
                backgroundImage
            } : {};
            if (process.env.NODE_ENV === "development") {
                if (placeholderStyle.backgroundImage && placeholder === "blur" && (blurDataURL == null ? void 0 : blurDataURL.startsWith("/"))) {
                    placeholderStyle.backgroundImage = 'url("' + blurDataURL + '")';
                }
            }
            const imgAttributes = generateImgAttrs({
                config,
                src,
                unoptimized,
                width: widthInt,
                quality: qualityInt,
                sizes,
                loader
            });
            if (process.env.NODE_ENV !== "production") {
                if (typeof window !== "undefined") {
                    let fullUrl;
                    try {
                        fullUrl = new URL(imgAttributes.src);
                    } catch (e) {
                        fullUrl = new URL(imgAttributes.src, window.location.href);
                    }
                    allImgs.set(fullUrl.href, {
                        src,
                        priority,
                        placeholder
                    });
                }
            }
            const props = __spreadProps(__spreadValues({}, rest), {
                loading: isLazy ? "lazy" : loading,
                fetchPriority,
                width: widthInt,
                height: heightInt,
                decoding,
                className,
                style: __spreadValues(__spreadValues({}, imgStyle), placeholderStyle),
                sizes: imgAttributes.sizes,
                srcSet: imgAttributes.srcSet,
                src: overrideSrc || imgAttributes.src
            });
            const meta = {
                unoptimized,
                priority,
                placeholder,
                fill
            };
            return {
                props,
                meta
            };
        }
    }
});

// node_modules/@swc/helpers/cjs/_interop_require_wildcard.cjs
var require_interop_require_wildcard = __commonJS({
    "node_modules/@swc/helpers/cjs/_interop_require_wildcard.cjs" (exports2) {
        "use strict";

        function _getRequireWildcardCache(nodeInterop) {
            if (typeof WeakMap !== "function") return null;
            var cacheBabelInterop = /* @__PURE__ */ new WeakMap();
            var cacheNodeInterop = /* @__PURE__ */ new WeakMap();
            return (_getRequireWildcardCache = function(nodeInterop2) {
                return nodeInterop2 ? cacheNodeInterop : cacheBabelInterop;
            })(nodeInterop);
        }

        function _interop_require_wildcard(obj, nodeInterop) {
            if (!nodeInterop && obj && obj.__esModule) return obj;
            if (obj === null || typeof obj !== "object" && typeof obj !== "function") return { default: obj };
            var cache = _getRequireWildcardCache(nodeInterop);
            if (cache && cache.has(obj)) return cache.get(obj);
            var newObj = { __proto__: null };
            var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
            for (var key in obj) {
                if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
                    var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
                    if (desc && (desc.get || desc.set)) Object.defineProperty(newObj, key, desc);
                    else newObj[key] = obj[key];
                }
            }
            newObj.default = obj;
            if (cache) cache.set(obj, newObj);
            return newObj;
        }
        exports2._ = _interop_require_wildcard;
    }
});

// node_modules/next/dist/shared/lib/side-effect.js
var require_side_effect = __commonJS({
    "node_modules/next/dist/shared/lib/side-effect.js" (exports2) {
        "use strict";
        Object.defineProperty(exports2, "__esModule", {
            value: true
        });
        Object.defineProperty(exports2, "default", {
            enumerable: true,
            get: function() {
                return SideEffect;
            }
        });
        var _react = require("react");
        var isServer = typeof window === "undefined";
        var useClientOnlyLayoutEffect = isServer ? () => {} : _react.useLayoutEffect;
        var useClientOnlyEffect = isServer ? () => {} : _react.useEffect;

        function SideEffect(props) {
            const { headManager, reduceComponentsToState } = props;

            function emitChange() {
                if (headManager && headManager.mountedInstances) {
                    const headElements = _react.Children.toArray(Array.from(headManager.mountedInstances).filter(Boolean));
                    headManager.updateHead(reduceComponentsToState(headElements, props));
                }
            }
            if (isServer) {
                var _headManager_mountedInstances;
                headManager == null ? void 0 : (_headManager_mountedInstances = headManager.mountedInstances) == null ? void 0 : _headManager_mountedInstances.add(props.children);
                emitChange();
            }
            useClientOnlyLayoutEffect(() => {
                var _headManager_mountedInstances2;
                headManager == null ? void 0 : (_headManager_mountedInstances2 = headManager.mountedInstances) == null ? void 0 : _headManager_mountedInstances2.add(props.children);
                return () => {
                    var _headManager_mountedInstances3;
                    headManager == null ? void 0 : (_headManager_mountedInstances3 = headManager.mountedInstances) == null ? void 0 : _headManager_mountedInstances3.delete(props.children);
                };
            });
            useClientOnlyLayoutEffect(() => {
                if (headManager) {
                    headManager._pendingUpdate = emitChange;
                }
                return () => {
                    if (headManager) {
                        headManager._pendingUpdate = emitChange;
                    }
                };
            });
            useClientOnlyEffect(() => {
                if (headManager && headManager._pendingUpdate) {
                    headManager._pendingUpdate();
                    headManager._pendingUpdate = null;
                }
                return () => {
                    if (headManager && headManager._pendingUpdate) {
                        headManager._pendingUpdate();
                        headManager._pendingUpdate = null;
                    }
                };
            });
            return null;
        }
    }
});

// node_modules/next/dist/shared/lib/amp-context.shared-runtime.js
var require_amp_context_shared_runtime = __commonJS({
    "node_modules/next/dist/shared/lib/amp-context.shared-runtime.js" (exports2) {
        "use strict";
        Object.defineProperty(exports2, "__esModule", {
            value: true
        });
        Object.defineProperty(exports2, "AmpStateContext", {
            enumerable: true,
            get: function() {
                return AmpStateContext;
            }
        });
        var _interop_require_default = require_interop_require_default();
        var _react = /* @__PURE__ */ _interop_require_default._(require("react"));
        var AmpStateContext = _react.default.createContext({});
        if (process.env.NODE_ENV !== "production") {
            AmpStateContext.displayName = "AmpStateContext";
        }
    }
});

// node_modules/next/dist/shared/lib/head-manager-context.shared-runtime.js
var require_head_manager_context_shared_runtime = __commonJS({
    "node_modules/next/dist/shared/lib/head-manager-context.shared-runtime.js" (exports2) {
        "use strict";
        Object.defineProperty(exports2, "__esModule", {
            value: true
        });
        Object.defineProperty(exports2, "HeadManagerContext", {
            enumerable: true,
            get: function() {
                return HeadManagerContext;
            }
        });
        var _interop_require_default = require_interop_require_default();
        var _react = /* @__PURE__ */ _interop_require_default._(require("react"));
        var HeadManagerContext = _react.default.createContext({});
        if (process.env.NODE_ENV !== "production") {
            HeadManagerContext.displayName = "HeadManagerContext";
        }
    }
});

// node_modules/next/dist/shared/lib/amp-mode.js
var require_amp_mode = __commonJS({
    "node_modules/next/dist/shared/lib/amp-mode.js" (exports2) {
        "use strict";
        Object.defineProperty(exports2, "__esModule", {
            value: true
        });
        Object.defineProperty(exports2, "isInAmpMode", {
            enumerable: true,
            get: function() {
                return isInAmpMode;
            }
        });

        function isInAmpMode(param) {
            let { ampFirst = false, hybrid = false, hasQuery = false } = param === void 0 ? {} : param;
            return ampFirst || hybrid && hasQuery;
        }
    }
});

// node_modules/next/dist/shared/lib/head.js
var require_head = __commonJS({
    "node_modules/next/dist/shared/lib/head.js" (exports2, module2) {
        "use strict";
        "use client";
        Object.defineProperty(exports2, "__esModule", {
            value: true
        });

        function _export(target, all) {
            for (var name in all) Object.defineProperty(target, name, {
                enumerable: true,
                get: all[name]
            });
        }
        _export(exports2, {
            default: function() {
                return _default;
            },
            defaultHead: function() {
                return defaultHead;
            }
        });
        var _interop_require_default = require_interop_require_default();
        var _interop_require_wildcard = require_interop_require_wildcard();
        var _jsxruntime = require("react/jsx-runtime");
        var _react = /* @__PURE__ */ _interop_require_wildcard._(require("react"));
        var _sideeffect = /* @__PURE__ */ _interop_require_default._(require_side_effect());
        var _ampcontextsharedruntime = require_amp_context_shared_runtime();
        var _headmanagercontextsharedruntime = require_head_manager_context_shared_runtime();
        var _ampmode = require_amp_mode();
        var _warnonce = require_warn_once();

        function defaultHead(inAmpMode) {
            if (inAmpMode === void 0) inAmpMode = false;
            const head = [
                /* @__PURE__ */
                (0, _jsxruntime.jsx)("meta", {
                    charSet: "utf-8"
                }, "charset")
            ];
            if (!inAmpMode) {
                head.push( /* @__PURE__ */ (0, _jsxruntime.jsx)("meta", {
                    name: "viewport",
                    content: "width=device-width"
                }, "viewport"));
            }
            return head;
        }

        function onlyReactElement(list, child) {
            if (typeof child === "string" || typeof child === "number") {
                return list;
            }
            if (child.type === _react.default.Fragment) {
                return list.concat(
                    // @ts-expect-error @types/react does not remove fragments but this could also return ReactPortal[]
                    _react.default.Children.toArray(child.props.children).reduce(
                        // @ts-expect-error @types/react does not remove fragments but this could also return ReactPortal[]
                        (fragmentList, fragmentChild) => {
                            if (typeof fragmentChild === "string" || typeof fragmentChild === "number") {
                                return fragmentList;
                            }
                            return fragmentList.concat(fragmentChild);
                        }, []
                    )
                );
            }
            return list.concat(child);
        }
        var METATYPES = [
            "name",
            "httpEquiv",
            "charSet",
            "itemProp"
        ];

        function unique() {
            const keys = /* @__PURE__ */ new Set();
            const tags = /* @__PURE__ */ new Set();
            const metaTypes = /* @__PURE__ */ new Set();
            const metaCategories = {};
            return (h) => {
                let isUnique = true;
                let hasKey = false;
                if (h.key && typeof h.key !== "number" && h.key.indexOf("$") > 0) {
                    hasKey = true;
                    const key = h.key.slice(h.key.indexOf("$") + 1);
                    if (keys.has(key)) {
                        isUnique = false;
                    } else {
                        keys.add(key);
                    }
                }
                switch (h.type) {
                    case "title":
                    case "base":
                        if (tags.has(h.type)) {
                            isUnique = false;
                        } else {
                            tags.add(h.type);
                        }
                        break;
                    case "meta":
                        for (let i = 0, len = METATYPES.length; i < len; i++) {
                            const metatype = METATYPES[i];
                            if (!h.props.hasOwnProperty(metatype)) continue;
                            if (metatype === "charSet") {
                                if (metaTypes.has(metatype)) {
                                    isUnique = false;
                                } else {
                                    metaTypes.add(metatype);
                                }
                            } else {
                                const category = h.props[metatype];
                                const categories = metaCategories[metatype] || /* @__PURE__ */ new Set();
                                if ((metatype !== "name" || !hasKey) && categories.has(category)) {
                                    isUnique = false;
                                } else {
                                    categories.add(category);
                                    metaCategories[metatype] = categories;
                                }
                            }
                        }
                        break;
                }
                return isUnique;
            };
        }

        function reduceComponents(headChildrenElements, props) {
            const { inAmpMode } = props;
            return headChildrenElements.reduce(onlyReactElement, []).reverse().concat(defaultHead(inAmpMode).reverse()).filter(unique()).reverse().map((c, i) => {
                const key = c.key || i;
                if (process.env.NODE_ENV !== "development" && process.env.__NEXT_OPTIMIZE_FONTS && !inAmpMode) {
                    if (c.type === "link" && c.props["href"] && // TODO(prateekbh@): Replace this with const from `constants` when the tree shaking works.
                        [
                            "https://fonts.googleapis.com/css",
                            "https://use.typekit.net/"
                        ].some((url) => c.props["href"].startsWith(url))) {
                        const newProps = __spreadValues({}, c.props || {});
                        newProps["data-href"] = newProps["href"];
                        newProps["href"] = void 0;
                        newProps["data-optimized-fonts"] = true;
                        return /* @__PURE__ */ _react.default.cloneElement(c, newProps);
                    }
                }
                if (process.env.NODE_ENV === "development") {
                    if (c.type === "script" && c.props["type"] !== "application/ld+json") {
                        const srcMessage = c.props["src"] ? '<script> tag with src="' + c.props["src"] + '"' : "inline <script>";
                        (0, _warnonce.warnOnce)("Do not add <script> tags using next/head (see " + srcMessage + "). Use next/script instead. \nSee more info here: https://nextjs.org/docs/messages/no-script-tags-in-head-component");
                    } else if (c.type === "link" && c.props["rel"] === "stylesheet") {
                        (0, _warnonce.warnOnce)('Do not add stylesheets using next/head (see <link rel="stylesheet"> tag with href="' + c.props["href"] + '"). Use Document instead. \nSee more info here: https://nextjs.org/docs/messages/no-stylesheets-in-head-component');
                    }
                }
                return /* @__PURE__ */ _react.default.cloneElement(c, {
                    key
                });
            });
        }

        function Head(param) {
            let { children } = param;
            const ampState = (0, _react.useContext)(_ampcontextsharedruntime.AmpStateContext);
            const headManager = (0, _react.useContext)(_headmanagercontextsharedruntime.HeadManagerContext);
            return /* @__PURE__ */ (0, _jsxruntime.jsx)(_sideeffect.default, {
                reduceComponentsToState: reduceComponents,
                headManager,
                inAmpMode: (0, _ampmode.isInAmpMode)(ampState),
                children
            });
        }
        var _default = Head;
        if ((typeof exports2.default === "function" || typeof exports2.default === "object" && exports2.default !== null) && typeof exports2.default.__esModule === "undefined") {
            Object.defineProperty(exports2.default, "__esModule", { value: true });
            Object.assign(exports2.default, exports2);
            module2.exports = exports2.default;
        }
    }
});

// node_modules/next/dist/shared/lib/image-config-context.shared-runtime.js
var require_image_config_context_shared_runtime = __commonJS({
    "node_modules/next/dist/shared/lib/image-config-context.shared-runtime.js" (exports2) {
        "use strict";
        Object.defineProperty(exports2, "__esModule", {
            value: true
        });
        Object.defineProperty(exports2, "ImageConfigContext", {
            enumerable: true,
            get: function() {
                return ImageConfigContext;
            }
        });
        var _interop_require_default = require_interop_require_default();
        var _react = /* @__PURE__ */ _interop_require_default._(require("react"));
        var _imageconfig = require_image_config();
        var ImageConfigContext = _react.default.createContext(_imageconfig.imageConfigDefault);
        if (process.env.NODE_ENV !== "production") {
            ImageConfigContext.displayName = "ImageConfigContext";
        }
    }
});

// node_modules/next/dist/shared/lib/router-context.shared-runtime.js
var require_router_context_shared_runtime = __commonJS({
    "node_modules/next/dist/shared/lib/router-context.shared-runtime.js" (exports2) {
        "use strict";
        Object.defineProperty(exports2, "__esModule", {
            value: true
        });
        Object.defineProperty(exports2, "RouterContext", {
            enumerable: true,
            get: function() {
                return RouterContext;
            }
        });
        var _interop_require_default = require_interop_require_default();
        var _react = /* @__PURE__ */ _interop_require_default._(require("react"));
        var RouterContext = _react.default.createContext(null);
        if (process.env.NODE_ENV !== "production") {
            RouterContext.displayName = "RouterContext";
        }
    }
});

// node_modules/next/dist/compiled/picomatch/index.js
var require_picomatch = __commonJS({
    "node_modules/next/dist/compiled/picomatch/index.js" (exports2, module2) {
        "use strict";
        (() => {
            "use strict";
            var t = {
                170: (t2, e2, u2) => {
                    const n = u2(510);
                    const isWindows = () => {
                        if (typeof navigator !== "undefined" && navigator.platform) {
                            const t3 = navigator.platform.toLowerCase();
                            return t3 === "win32" || t3 === "windows";
                        }
                        if (typeof process !== "undefined" && process.platform) {
                            return process.platform === "win32";
                        }
                        return false;
                    };

                    function picomatch(t3, e3, u3 = false) {
                        if (e3 && (e3.windows === null || e3.windows === void 0)) {
                            e3 = __spreadProps(__spreadValues({}, e3), { windows: isWindows() });
                        }
                        return n(t3, e3, u3);
                    }
                    Object.assign(picomatch, n);
                    t2.exports = picomatch;
                },
                154: (t2) => {
                    const e2 = "\\\\/";
                    const u2 = `[^${e2}]`;
                    const n = "\\.";
                    const o = "\\+";
                    const s = "\\?";
                    const r2 = "\\/";
                    const a = "(?=.)";
                    const i = "[^/]";
                    const c = `(?:${r2}|$)`;
                    const p = `(?:^|${r2})`;
                    const l = `${n}{1,2}${c}`;
                    const f = `(?!${n})`;
                    const A = `(?!${p}${l})`;
                    const _ = `(?!${n}{0,1}${c})`;
                    const R = `(?!${l})`;
                    const E = `[^.${r2}]`;
                    const h = `${i}*?`;
                    const g = "/";
                    const b = { DOT_LITERAL: n, PLUS_LITERAL: o, QMARK_LITERAL: s, SLASH_LITERAL: r2, ONE_CHAR: a, QMARK: i, END_ANCHOR: c, DOTS_SLASH: l, NO_DOT: f, NO_DOTS: A, NO_DOT_SLASH: _, NO_DOTS_SLASH: R, QMARK_NO_DOT: E, STAR: h, START_ANCHOR: p, SEP: g };
                    const C = __spreadProps(__spreadValues({}, b), { SLASH_LITERAL: `[${e2}]`, QMARK: u2, STAR: `${u2}*?`, DOTS_SLASH: `${n}{1,2}(?:[${e2}]|$)`, NO_DOT: `(?!${n})`, NO_DOTS: `(?!(?:^|[${e2}])${n}{1,2}(?:[${e2}]|$))`, NO_DOT_SLASH: `(?!${n}{0,1}(?:[${e2}]|$))`, NO_DOTS_SLASH: `(?!${n}{1,2}(?:[${e2}]|$))`, QMARK_NO_DOT: `[^.${e2}]`, START_ANCHOR: `(?:^|[${e2}])`, END_ANCHOR: `(?:[${e2}]|$)`, SEP: "\\" });
                    const y = { alnum: "a-zA-Z0-9", alpha: "a-zA-Z", ascii: "\\x00-\\x7F", blank: " \\t", cntrl: "\\x00-\\x1F\\x7F", digit: "0-9", graph: "\\x21-\\x7E", lower: "a-z", print: "\\x20-\\x7E ", punct: "\\-!\"#$%&'()\\*+,./:;<=>?@[\\]^_`{|}~", space: " \\t\\r\\n\\v\\f", upper: "A-Z", word: "A-Za-z0-9_", xdigit: "A-Fa-f0-9" };
                    t2.exports = {
                        MAX_LENGTH: 1024 * 64,
                        POSIX_REGEX_SOURCE: y,
                        REGEX_BACKSLASH: /\\(?![*+?^${}(|)[\]])/g,
                        REGEX_NON_SPECIAL_CHARS: /^[^@![\].,$*+?^{}()|\\/]+/,
                        REGEX_SPECIAL_CHARS: /[-*+?.^${}(|)[\]]/,
                        REGEX_SPECIAL_CHARS_BACKREF: /(\\?)((\W)(\3*))/g,
                        REGEX_SPECIAL_CHARS_GLOBAL: /([-*+?.^${}(|)[\]])/g,
                        REGEX_REMOVE_BACKSLASH: /(?:\[.*?[^\\]\]|\\(?=.))/g,
                        REPLACEMENTS: { "***": "*", "**/**": "**", "**/**/**": "**" },
                        CHAR_0: 48,
                        CHAR_9: 57,
                        CHAR_UPPERCASE_A: 65,
                        CHAR_LOWERCASE_A: 97,
                        CHAR_UPPERCASE_Z: 90,
                        CHAR_LOWERCASE_Z: 122,
                        CHAR_LEFT_PARENTHESES: 40,
                        CHAR_RIGHT_PARENTHESES: 41,
                        CHAR_ASTERISK: 42,
                        CHAR_AMPERSAND: 38,
                        CHAR_AT: 64,
                        CHAR_BACKWARD_SLASH: 92,
                        CHAR_CARRIAGE_RETURN: 13,
                        CHAR_CIRCUMFLEX_ACCENT: 94,
                        CHAR_COLON: 58,
                        CHAR_COMMA: 44,
                        CHAR_DOT: 46,
                        CHAR_DOUBLE_QUOTE: 34,
                        CHAR_EQUAL: 61,
                        CHAR_EXCLAMATION_MARK: 33,
                        CHAR_FORM_FEED: 12,
                        CHAR_FORWARD_SLASH: 47,
                        CHAR_GRAVE_ACCENT: 96,
                        CHAR_HASH: 35,
                        CHAR_HYPHEN_MINUS: 45,
                        CHAR_LEFT_ANGLE_BRACKET: 60,
                        CHAR_LEFT_CURLY_BRACE: 123,
                        CHAR_LEFT_SQUARE_BRACKET: 91,
                        CHAR_LINE_FEED: 10,
                        CHAR_NO_BREAK_SPACE: 160,
                        CHAR_PERCENT: 37,
                        CHAR_PLUS: 43,
                        CHAR_QUESTION_MARK: 63,
                        CHAR_RIGHT_ANGLE_BRACKET: 62,
                        CHAR_RIGHT_CURLY_BRACE: 125,
                        CHAR_RIGHT_SQUARE_BRACKET: 93,
                        CHAR_SEMICOLON: 59,
                        CHAR_SINGLE_QUOTE: 39,
                        CHAR_SPACE: 32,
                        CHAR_TAB: 9,
                        CHAR_UNDERSCORE: 95,
                        CHAR_VERTICAL_LINE: 124,
                        CHAR_ZERO_WIDTH_NOBREAK_SPACE: 65279,
                        extglobChars(t3) {
                            return { "!": { type: "negate", open: "(?:(?!(?:", close: `))${t3.STAR})` }, "?": { type: "qmark", open: "(?:", close: ")?" }, "+": { type: "plus", open: "(?:", close: ")+" }, "*": { type: "star", open: "(?:", close: ")*" }, "@": { type: "at", open: "(?:", close: ")" } };
                        },
                        globChars(t3) {
                            return t3 === true ? C : b;
                        }
                    };
                },
                697: (t2, e2, u2) => {
                    const n = u2(154);
                    const o = u2(96);
                    const { MAX_LENGTH: s, POSIX_REGEX_SOURCE: r2, REGEX_NON_SPECIAL_CHARS: a, REGEX_SPECIAL_CHARS_BACKREF: i, REPLACEMENTS: c } = n;
                    const expandRange = (t3, e3) => {
                        if (typeof e3.expandRange === "function") {
                            return e3.expandRange(...t3, e3);
                        }
                        t3.sort();
                        const u3 = `[${t3.join("-")}]`;
                        try {
                            new RegExp(u3);
                        } catch (e4) {
                            return t3.map((t4) => o.escapeRegex(t4)).join("..");
                        }
                        return u3;
                    };
                    const syntaxError = (t3, e3) => `Missing ${t3}: "${e3}" - use "\\\\${e3}" to match literal characters`;
                    const parse2 = (t3, e3) => {
                        if (typeof t3 !== "string") {
                            throw new TypeError("Expected a string");
                        }
                        t3 = c[t3] || t3;
                        const u3 = __spreadValues({}, e3);
                        const p = typeof u3.maxLength === "number" ? Math.min(s, u3.maxLength) : s;
                        let l = t3.length;
                        if (l > p) {
                            throw new SyntaxError(`Input length: ${l}, exceeds maximum allowed length: ${p}`);
                        }
                        const f = { type: "bos", value: "", output: u3.prepend || "" };
                        const A = [f];
                        const _ = u3.capture ? "" : "?:";
                        const R = n.globChars(u3.windows);
                        const E = n.extglobChars(R);
                        const { DOT_LITERAL: h, PLUS_LITERAL: g, SLASH_LITERAL: b, ONE_CHAR: C, DOTS_SLASH: y, NO_DOT: $, NO_DOT_SLASH: x, NO_DOTS_SLASH: S, QMARK: H, QMARK_NO_DOT: v, STAR: d, START_ANCHOR: L } = R;
                        const globstar = (t4) => `(${_}(?:(?!${L}${t4.dot ? y : h}).)*?)`;
                        const T = u3.dot ? "" : $;
                        const O = u3.dot ? H : v;
                        let k = u3.bash === true ? globstar(u3) : d;
                        if (u3.capture) {
                            k = `(${k})`;
                        }
                        if (typeof u3.noext === "boolean") {
                            u3.noextglob = u3.noext;
                        }
                        const m = { input: t3, index: -1, start: 0, dot: u3.dot === true, consumed: "", output: "", prefix: "", backtrack: false, negated: false, brackets: 0, braces: 0, parens: 0, quotes: 0, globstar: false, tokens: A };
                        t3 = o.removePrefix(t3, m);
                        l = t3.length;
                        const w = [];
                        const N = [];
                        const I = [];
                        let B = f;
                        let G;
                        const eos = () => m.index === l - 1;
                        const D = m.peek = (e4 = 1) => t3[m.index + e4];
                        const M = m.advance = () => t3[++m.index] || "";
                        const remaining = () => t3.slice(m.index + 1);
                        const consume = (t4 = "", e4 = 0) => {
                            m.consumed += t4;
                            m.index += e4;
                        };
                        const append = (t4) => {
                            m.output += t4.output != null ? t4.output : t4.value;
                            consume(t4.value);
                        };
                        const negate = () => {
                            let t4 = 1;
                            while (D() === "!" && (D(2) !== "(" || D(3) === "?")) {
                                M();
                                m.start++;
                                t4++;
                            }
                            if (t4 % 2 === 0) {
                                return false;
                            }
                            m.negated = true;
                            m.start++;
                            return true;
                        };
                        const increment = (t4) => {
                            m[t4]++;
                            I.push(t4);
                        };
                        const decrement = (t4) => {
                            m[t4]--;
                            I.pop();
                        };
                        const push = (t4) => {
                            if (B.type === "globstar") {
                                const e4 = m.braces > 0 && (t4.type === "comma" || t4.type === "brace");
                                const u4 = t4.extglob === true || w.length && (t4.type === "pipe" || t4.type === "paren");
                                if (t4.type !== "slash" && t4.type !== "paren" && !e4 && !u4) {
                                    m.output = m.output.slice(0, -B.output.length);
                                    B.type = "star";
                                    B.value = "*";
                                    B.output = k;
                                    m.output += B.output;
                                }
                            }
                            if (w.length && t4.type !== "paren") {
                                w[w.length - 1].inner += t4.value;
                            }
                            if (t4.value || t4.output) append(t4);
                            if (B && B.type === "text" && t4.type === "text") {
                                B.output = (B.output || B.value) + t4.value;
                                B.value += t4.value;
                                return;
                            }
                            t4.prev = B;
                            A.push(t4);
                            B = t4;
                        };
                        const extglobOpen = (t4, e4) => {
                            const n2 = __spreadProps(__spreadValues({}, E[e4]), { conditions: 1, inner: "" });
                            n2.prev = B;
                            n2.parens = m.parens;
                            n2.output = m.output;
                            const o2 = (u3.capture ? "(" : "") + n2.open;
                            increment("parens");
                            push({ type: t4, value: e4, output: m.output ? "" : C });
                            push({ type: "paren", extglob: true, value: M(), output: o2 });
                            w.push(n2);
                        };
                        const extglobClose = (t4) => {
                            let n2 = t4.close + (u3.capture ? ")" : "");
                            let o2;
                            if (t4.type === "negate") {
                                let s2 = k;
                                if (t4.inner && t4.inner.length > 1 && t4.inner.includes("/")) {
                                    s2 = globstar(u3);
                                }
                                if (s2 !== k || eos() || /^\)+$/.test(remaining())) {
                                    n2 = t4.close = `)$))${s2}`;
                                }
                                if (t4.inner.includes("*") && (o2 = remaining()) && /^\.[^\\/.]+$/.test(o2)) {
                                    const u4 = parse2(o2, __spreadProps(__spreadValues({}, e3), { fastpaths: false })).output;
                                    n2 = t4.close = `)${u4})${s2})`;
                                }
                                if (t4.prev.type === "bos") {
                                    m.negatedExtglob = true;
                                }
                            }
                            push({ type: "paren", extglob: true, value: G, output: n2 });
                            decrement("parens");
                        };
                        if (u3.fastpaths !== false && !/(^[*!]|[/()[\]{}"])/.test(t3)) {
                            let n2 = false;
                            let s2 = t3.replace(i, (t4, e4, u4, o2, s3, r3) => {
                                if (o2 === "\\") {
                                    n2 = true;
                                    return t4;
                                }
                                if (o2 === "?") {
                                    if (e4) {
                                        return e4 + o2 + (s3 ? H.repeat(s3.length) : "");
                                    }
                                    if (r3 === 0) {
                                        return O + (s3 ? H.repeat(s3.length) : "");
                                    }
                                    return H.repeat(u4.length);
                                }
                                if (o2 === ".") {
                                    return h.repeat(u4.length);
                                }
                                if (o2 === "*") {
                                    if (e4) {
                                        return e4 + o2 + (s3 ? k : "");
                                    }
                                    return k;
                                }
                                return e4 ? t4 : `\\${t4}`;
                            });
                            if (n2 === true) {
                                if (u3.unescape === true) {
                                    s2 = s2.replace(/\\/g, "");
                                } else {
                                    s2 = s2.replace(/\\+/g, (t4) => t4.length % 2 === 0 ? "\\\\" : t4 ? "\\" : "");
                                }
                            }
                            if (s2 === t3 && u3.contains === true) {
                                m.output = t3;
                                return m;
                            }
                            m.output = o.wrapOutput(s2, m, e3);
                            return m;
                        }
                        while (!eos()) {
                            G = M();
                            if (G === "\0") {
                                continue;
                            }
                            if (G === "\\") {
                                const t4 = D();
                                if (t4 === "/" && u3.bash !== true) {
                                    continue;
                                }
                                if (t4 === "." || t4 === ";") {
                                    continue;
                                }
                                if (!t4) {
                                    G += "\\";
                                    push({ type: "text", value: G });
                                    continue;
                                }
                                const e5 = /^\\+/.exec(remaining());
                                let n3 = 0;
                                if (e5 && e5[0].length > 2) {
                                    n3 = e5[0].length;
                                    m.index += n3;
                                    if (n3 % 2 !== 0) {
                                        G += "\\";
                                    }
                                }
                                if (u3.unescape === true) {
                                    G = M();
                                } else {
                                    G += M();
                                }
                                if (m.brackets === 0) {
                                    push({ type: "text", value: G });
                                    continue;
                                }
                            }
                            if (m.brackets > 0 && (G !== "]" || B.value === "[" || B.value === "[^")) {
                                if (u3.posix !== false && G === ":") {
                                    const t4 = B.value.slice(1);
                                    if (t4.includes("[")) {
                                        B.posix = true;
                                        if (t4.includes(":")) {
                                            const t5 = B.value.lastIndexOf("[");
                                            const e5 = B.value.slice(0, t5);
                                            const u4 = B.value.slice(t5 + 2);
                                            const n3 = r2[u4];
                                            if (n3) {
                                                B.value = e5 + n3;
                                                m.backtrack = true;
                                                M();
                                                if (!f.output && A.indexOf(B) === 1) {
                                                    f.output = C;
                                                }
                                                continue;
                                            }
                                        }
                                    }
                                }
                                if (G === "[" && D() !== ":" || G === "-" && D() === "]") {
                                    G = `\\${G}`;
                                }
                                if (G === "]" && (B.value === "[" || B.value === "[^")) {
                                    G = `\\${G}`;
                                }
                                if (u3.posix === true && G === "!" && B.value === "[") {
                                    G = "^";
                                }
                                B.value += G;
                                append({ value: G });
                                continue;
                            }
                            if (m.quotes === 1 && G !== '"') {
                                G = o.escapeRegex(G);
                                B.value += G;
                                append({ value: G });
                                continue;
                            }
                            if (G === '"') {
                                m.quotes = m.quotes === 1 ? 0 : 1;
                                if (u3.keepQuotes === true) {
                                    push({ type: "text", value: G });
                                }
                                continue;
                            }
                            if (G === "(") {
                                increment("parens");
                                push({ type: "paren", value: G });
                                continue;
                            }
                            if (G === ")") {
                                if (m.parens === 0 && u3.strictBrackets === true) {
                                    throw new SyntaxError(syntaxError("opening", "("));
                                }
                                const t4 = w[w.length - 1];
                                if (t4 && m.parens === t4.parens + 1) {
                                    extglobClose(w.pop());
                                    continue;
                                }
                                push({ type: "paren", value: G, output: m.parens ? ")" : "\\)" });
                                decrement("parens");
                                continue;
                            }
                            if (G === "[") {
                                if (u3.nobracket === true || !remaining().includes("]")) {
                                    if (u3.nobracket !== true && u3.strictBrackets === true) {
                                        throw new SyntaxError(syntaxError("closing", "]"));
                                    }
                                    G = `\\${G}`;
                                } else {
                                    increment("brackets");
                                }
                                push({ type: "bracket", value: G });
                                continue;
                            }
                            if (G === "]") {
                                if (u3.nobracket === true || B && B.type === "bracket" && B.value.length === 1) {
                                    push({ type: "text", value: G, output: `\\${G}` });
                                    continue;
                                }
                                if (m.brackets === 0) {
                                    if (u3.strictBrackets === true) {
                                        throw new SyntaxError(syntaxError("opening", "["));
                                    }
                                    push({ type: "text", value: G, output: `\\${G}` });
                                    continue;
                                }
                                decrement("brackets");
                                const t4 = B.value.slice(1);
                                if (B.posix !== true && t4[0] === "^" && !t4.includes("/")) {
                                    G = `/${G}`;
                                }
                                B.value += G;
                                append({ value: G });
                                if (u3.literalBrackets === false || o.hasRegexChars(t4)) {
                                    continue;
                                }
                                const e5 = o.escapeRegex(B.value);
                                m.output = m.output.slice(0, -B.value.length);
                                if (u3.literalBrackets === true) {
                                    m.output += e5;
                                    B.value = e5;
                                    continue;
                                }
                                B.value = `(${_}${e5}|${B.value})`;
                                m.output += B.value;
                                continue;
                            }
                            if (G === "{" && u3.nobrace !== true) {
                                increment("braces");
                                const t4 = { type: "brace", value: G, output: "(", outputIndex: m.output.length, tokensIndex: m.tokens.length };
                                N.push(t4);
                                push(t4);
                                continue;
                            }
                            if (G === "}") {
                                const t4 = N[N.length - 1];
                                if (u3.nobrace === true || !t4) {
                                    push({ type: "text", value: G, output: G });
                                    continue;
                                }
                                let e5 = ")";
                                if (t4.dots === true) {
                                    const t5 = A.slice();
                                    const n3 = [];
                                    for (let e6 = t5.length - 1; e6 >= 0; e6--) {
                                        A.pop();
                                        if (t5[e6].type === "brace") {
                                            break;
                                        }
                                        if (t5[e6].type !== "dots") {
                                            n3.unshift(t5[e6].value);
                                        }
                                    }
                                    e5 = expandRange(n3, u3);
                                    m.backtrack = true;
                                }
                                if (t4.comma !== true && t4.dots !== true) {
                                    const u4 = m.output.slice(0, t4.outputIndex);
                                    const n3 = m.tokens.slice(t4.tokensIndex);
                                    t4.value = t4.output = "\\{";
                                    G = e5 = "\\}";
                                    m.output = u4;
                                    for (const t5 of n3) {
                                        m.output += t5.output || t5.value;
                                    }
                                }
                                push({ type: "brace", value: G, output: e5 });
                                decrement("braces");
                                N.pop();
                                continue;
                            }
                            if (G === "|") {
                                if (w.length > 0) {
                                    w[w.length - 1].conditions++;
                                }
                                push({ type: "text", value: G });
                                continue;
                            }
                            if (G === ",") {
                                let t4 = G;
                                const e5 = N[N.length - 1];
                                if (e5 && I[I.length - 1] === "braces") {
                                    e5.comma = true;
                                    t4 = "|";
                                }
                                push({ type: "comma", value: G, output: t4 });
                                continue;
                            }
                            if (G === "/") {
                                if (B.type === "dot" && m.index === m.start + 1) {
                                    m.start = m.index + 1;
                                    m.consumed = "";
                                    m.output = "";
                                    A.pop();
                                    B = f;
                                    continue;
                                }
                                push({ type: "slash", value: G, output: b });
                                continue;
                            }
                            if (G === ".") {
                                if (m.braces > 0 && B.type === "dot") {
                                    if (B.value === ".") B.output = h;
                                    const t4 = N[N.length - 1];
                                    B.type = "dots";
                                    B.output += G;
                                    B.value += G;
                                    t4.dots = true;
                                    continue;
                                }
                                if (m.braces + m.parens === 0 && B.type !== "bos" && B.type !== "slash") {
                                    push({ type: "text", value: G, output: h });
                                    continue;
                                }
                                push({ type: "dot", value: G, output: h });
                                continue;
                            }
                            if (G === "?") {
                                const t4 = B && B.value === "(";
                                if (!t4 && u3.noextglob !== true && D() === "(" && D(2) !== "?") {
                                    extglobOpen("qmark", G);
                                    continue;
                                }
                                if (B && B.type === "paren") {
                                    const t5 = D();
                                    let e5 = G;
                                    if (B.value === "(" && !/[!=<:]/.test(t5) || t5 === "<" && !/<([!=]|\w+>)/.test(remaining())) {
                                        e5 = `\\${G}`;
                                    }
                                    push({ type: "text", value: G, output: e5 });
                                    continue;
                                }
                                if (u3.dot !== true && (B.type === "slash" || B.type === "bos")) {
                                    push({ type: "qmark", value: G, output: v });
                                    continue;
                                }
                                push({ type: "qmark", value: G, output: H });
                                continue;
                            }
                            if (G === "!") {
                                if (u3.noextglob !== true && D() === "(") {
                                    if (D(2) !== "?" || !/[!=<:]/.test(D(3))) {
                                        extglobOpen("negate", G);
                                        continue;
                                    }
                                }
                                if (u3.nonegate !== true && m.index === 0) {
                                    negate();
                                    continue;
                                }
                            }
                            if (G === "+") {
                                if (u3.noextglob !== true && D() === "(" && D(2) !== "?") {
                                    extglobOpen("plus", G);
                                    continue;
                                }
                                if (B && B.value === "(" || u3.regex === false) {
                                    push({ type: "plus", value: G, output: g });
                                    continue;
                                }
                                if (B && (B.type === "bracket" || B.type === "paren" || B.type === "brace") || m.parens > 0) {
                                    push({ type: "plus", value: G });
                                    continue;
                                }
                                push({ type: "plus", value: g });
                                continue;
                            }
                            if (G === "@") {
                                if (u3.noextglob !== true && D() === "(" && D(2) !== "?") {
                                    push({ type: "at", extglob: true, value: G, output: "" });
                                    continue;
                                }
                                push({ type: "text", value: G });
                                continue;
                            }
                            if (G !== "*") {
                                if (G === "$" || G === "^") {
                                    G = `\\${G}`;
                                }
                                const t4 = a.exec(remaining());
                                if (t4) {
                                    G += t4[0];
                                    m.index += t4[0].length;
                                }
                                push({ type: "text", value: G });
                                continue;
                            }
                            if (B && (B.type === "globstar" || B.star === true)) {
                                B.type = "star";
                                B.star = true;
                                B.value += G;
                                B.output = k;
                                m.backtrack = true;
                                m.globstar = true;
                                consume(G);
                                continue;
                            }
                            let e4 = remaining();
                            if (u3.noextglob !== true && /^\([^?]/.test(e4)) {
                                extglobOpen("star", G);
                                continue;
                            }
                            if (B.type === "star") {
                                if (u3.noglobstar === true) {
                                    consume(G);
                                    continue;
                                }
                                const n3 = B.prev;
                                const o2 = n3.prev;
                                const s2 = n3.type === "slash" || n3.type === "bos";
                                const r3 = o2 && (o2.type === "star" || o2.type === "globstar");
                                if (u3.bash === true && (!s2 || e4[0] && e4[0] !== "/")) {
                                    push({ type: "star", value: G, output: "" });
                                    continue;
                                }
                                const a2 = m.braces > 0 && (n3.type === "comma" || n3.type === "brace");
                                const i2 = w.length && (n3.type === "pipe" || n3.type === "paren");
                                if (!s2 && n3.type !== "paren" && !a2 && !i2) {
                                    push({ type: "star", value: G, output: "" });
                                    continue;
                                }
                                while (e4.slice(0, 3) === "/**") {
                                    const u4 = t3[m.index + 4];
                                    if (u4 && u4 !== "/") {
                                        break;
                                    }
                                    e4 = e4.slice(3);
                                    consume("/**", 3);
                                }
                                if (n3.type === "bos" && eos()) {
                                    B.type = "globstar";
                                    B.value += G;
                                    B.output = globstar(u3);
                                    m.output = B.output;
                                    m.globstar = true;
                                    consume(G);
                                    continue;
                                }
                                if (n3.type === "slash" && n3.prev.type !== "bos" && !r3 && eos()) {
                                    m.output = m.output.slice(0, -(n3.output + B.output).length);
                                    n3.output = `(?:${n3.output}`;
                                    B.type = "globstar";
                                    B.output = globstar(u3) + (u3.strictSlashes ? ")" : "|$)");
                                    B.value += G;
                                    m.globstar = true;
                                    m.output += n3.output + B.output;
                                    consume(G);
                                    continue;
                                }
                                if (n3.type === "slash" && n3.prev.type !== "bos" && e4[0] === "/") {
                                    const t4 = e4[1] !== void 0 ? "|$" : "";
                                    m.output = m.output.slice(0, -(n3.output + B.output).length);
                                    n3.output = `(?:${n3.output}`;
                                    B.type = "globstar";
                                    B.output = `${globstar(u3)}${b}|${b}${t4})`;
                                    B.value += G;
                                    m.output += n3.output + B.output;
                                    m.globstar = true;
                                    consume(G + M());
                                    push({ type: "slash", value: "/", output: "" });
                                    continue;
                                }
                                if (n3.type === "bos" && e4[0] === "/") {
                                    B.type = "globstar";
                                    B.value += G;
                                    B.output = `(?:^|${b}|${globstar(u3)}${b})`;
                                    m.output = B.output;
                                    m.globstar = true;
                                    consume(G + M());
                                    push({ type: "slash", value: "/", output: "" });
                                    continue;
                                }
                                m.output = m.output.slice(0, -B.output.length);
                                B.type = "globstar";
                                B.output = globstar(u3);
                                B.value += G;
                                m.output += B.output;
                                m.globstar = true;
                                consume(G);
                                continue;
                            }
                            const n2 = { type: "star", value: G, output: k };
                            if (u3.bash === true) {
                                n2.output = ".*?";
                                if (B.type === "bos" || B.type === "slash") {
                                    n2.output = T + n2.output;
                                }
                                push(n2);
                                continue;
                            }
                            if (B && (B.type === "bracket" || B.type === "paren") && u3.regex === true) {
                                n2.output = G;
                                push(n2);
                                continue;
                            }
                            if (m.index === m.start || B.type === "slash" || B.type === "dot") {
                                if (B.type === "dot") {
                                    m.output += x;
                                    B.output += x;
                                } else if (u3.dot === true) {
                                    m.output += S;
                                    B.output += S;
                                } else {
                                    m.output += T;
                                    B.output += T;
                                }
                                if (D() !== "*") {
                                    m.output += C;
                                    B.output += C;
                                }
                            }
                            push(n2);
                        }
                        while (m.brackets > 0) {
                            if (u3.strictBrackets === true) throw new SyntaxError(syntaxError("closing", "]"));
                            m.output = o.escapeLast(m.output, "[");
                            decrement("brackets");
                        }
                        while (m.parens > 0) {
                            if (u3.strictBrackets === true) throw new SyntaxError(syntaxError("closing", ")"));
                            m.output = o.escapeLast(m.output, "(");
                            decrement("parens");
                        }
                        while (m.braces > 0) {
                            if (u3.strictBrackets === true) throw new SyntaxError(syntaxError("closing", "}"));
                            m.output = o.escapeLast(m.output, "{");
                            decrement("braces");
                        }
                        if (u3.strictSlashes !== true && (B.type === "star" || B.type === "bracket")) {
                            push({ type: "maybe_slash", value: "", output: `${b}?` });
                        }
                        if (m.backtrack === true) {
                            m.output = "";
                            for (const t4 of m.tokens) {
                                m.output += t4.output != null ? t4.output : t4.value;
                                if (t4.suffix) {
                                    m.output += t4.suffix;
                                }
                            }
                        }
                        return m;
                    };
                    parse2.fastpaths = (t3, e3) => {
                        const u3 = __spreadValues({}, e3);
                        const r3 = typeof u3.maxLength === "number" ? Math.min(s, u3.maxLength) : s;
                        const a2 = t3.length;
                        if (a2 > r3) {
                            throw new SyntaxError(`Input length: ${a2}, exceeds maximum allowed length: ${r3}`);
                        }
                        t3 = c[t3] || t3;
                        const { DOT_LITERAL: i2, SLASH_LITERAL: p, ONE_CHAR: l, DOTS_SLASH: f, NO_DOT: A, NO_DOTS: _, NO_DOTS_SLASH: R, STAR: E, START_ANCHOR: h } = n.globChars(u3.windows);
                        const g = u3.dot ? _ : A;
                        const b = u3.dot ? R : A;
                        const C = u3.capture ? "" : "?:";
                        const y = { negated: false, prefix: "" };
                        let $ = u3.bash === true ? ".*?" : E;
                        if (u3.capture) {
                            $ = `(${$})`;
                        }
                        const globstar = (t4) => {
                            if (t4.noglobstar === true) return $;
                            return `(${C}(?:(?!${h}${t4.dot ? f : i2}).)*?)`;
                        };
                        const create = (t4) => {
                            switch (t4) {
                                case "*":
                                    return `${g}${l}${$}`;
                                case ".*":
                                    return `${i2}${l}${$}`;
                                case "*.*":
                                    return `${g}${$}${i2}${l}${$}`;
                                case "*/*":
                                    return `${g}${$}${p}${l}${b}${$}`;
                                case "**":
                                    return g + globstar(u3);
                                case "**/*":
                                    return `(?:${g}${globstar(u3)}${p})?${b}${l}${$}`;
                                case "**/*.*":
                                    return `(?:${g}${globstar(u3)}${p})?${b}${$}${i2}${l}${$}`;
                                case "**/.*":
                                    return `(?:${g}${globstar(u3)}${p})?${i2}${l}${$}`;
                                default:
                                    {
                                        const e4 = /^(.*?)\.(\w+)$/.exec(t4);
                                        if (!e4) return;
                                        const u4 = create(e4[1]);
                                        if (!u4) return;
                                        return u4 + i2 + e4[2];
                                    }
                            }
                        };
                        const x = o.removePrefix(t3, y);
                        let S = create(x);
                        if (S && u3.strictSlashes !== true) {
                            S += `${p}?`;
                        }
                        return S;
                    };
                    t2.exports = parse2;
                },
                510: (t2, e2, u2) => {
                    const n = u2(716);
                    const o = u2(697);
                    const s = u2(96);
                    const r2 = u2(154);
                    const isObject = (t3) => t3 && typeof t3 === "object" && !Array.isArray(t3);
                    const picomatch = (t3, e3, u3 = false) => {
                        if (Array.isArray(t3)) {
                            const n3 = t3.map((t4) => picomatch(t4, e3, u3));
                            const arrayMatcher = (t4) => {
                                for (const e4 of n3) {
                                    const u4 = e4(t4);
                                    if (u4) return u4;
                                }
                                return false;
                            };
                            return arrayMatcher;
                        }
                        const n2 = isObject(t3) && t3.tokens && t3.input;
                        if (t3 === "" || typeof t3 !== "string" && !n2) {
                            throw new TypeError("Expected pattern to be a non-empty string");
                        }
                        const o2 = e3 || {};
                        const s2 = o2.windows;
                        const r3 = n2 ? picomatch.compileRe(t3, e3) : picomatch.makeRe(t3, e3, false, true);
                        const a = r3.state;
                        delete r3.state;
                        let isIgnored = () => false;
                        if (o2.ignore) {
                            const t4 = __spreadProps(__spreadValues({}, e3), { ignore: null, onMatch: null, onResult: null });
                            isIgnored = picomatch(o2.ignore, t4, u3);
                        }
                        const matcher = (u4, n3 = false) => {
                            const { isMatch: i, match: c, output: p } = picomatch.test(u4, r3, e3, { glob: t3, posix: s2 });
                            const l = { glob: t3, state: a, regex: r3, posix: s2, input: u4, output: p, match: c, isMatch: i };
                            if (typeof o2.onResult === "function") {
                                o2.onResult(l);
                            }
                            if (i === false) {
                                l.isMatch = false;
                                return n3 ? l : false;
                            }
                            if (isIgnored(u4)) {
                                if (typeof o2.onIgnore === "function") {
                                    o2.onIgnore(l);
                                }
                                l.isMatch = false;
                                return n3 ? l : false;
                            }
                            if (typeof o2.onMatch === "function") {
                                o2.onMatch(l);
                            }
                            return n3 ? l : true;
                        };
                        if (u3) {
                            matcher.state = a;
                        }
                        return matcher;
                    };
                    picomatch.test = (t3, e3, u3, { glob: n2, posix: o2 } = {}) => {
                        if (typeof t3 !== "string") {
                            throw new TypeError("Expected input to be a string");
                        }
                        if (t3 === "") {
                            return { isMatch: false, output: "" };
                        }
                        const r3 = u3 || {};
                        const a = r3.format || (o2 ? s.toPosixSlashes : null);
                        let i = t3 === n2;
                        let c = i && a ? a(t3) : t3;
                        if (i === false) {
                            c = a ? a(t3) : t3;
                            i = c === n2;
                        }
                        if (i === false || r3.capture === true) {
                            if (r3.matchBase === true || r3.basename === true) {
                                i = picomatch.matchBase(t3, e3, u3, o2);
                            } else {
                                i = e3.exec(c);
                            }
                        }
                        return { isMatch: Boolean(i), match: i, output: c };
                    };
                    picomatch.matchBase = (t3, e3, u3) => {
                        const n2 = e3 instanceof RegExp ? e3 : picomatch.makeRe(e3, u3);
                        return n2.test(s.basename(t3));
                    };
                    picomatch.isMatch = (t3, e3, u3) => picomatch(e3, u3)(t3);
                    picomatch.parse = (t3, e3) => {
                        if (Array.isArray(t3)) return t3.map((t4) => picomatch.parse(t4, e3));
                        return o(t3, __spreadProps(__spreadValues({}, e3), { fastpaths: false }));
                    };
                    picomatch.scan = (t3, e3) => n(t3, e3);
                    picomatch.compileRe = (t3, e3, u3 = false, n2 = false) => {
                        if (u3 === true) {
                            return t3.output;
                        }
                        const o2 = e3 || {};
                        const s2 = o2.contains ? "" : "^";
                        const r3 = o2.contains ? "" : "$";
                        let a = `${s2}(?:${t3.output})${r3}`;
                        if (t3 && t3.negated === true) {
                            a = `^(?!${a}).*$`;
                        }
                        const i = picomatch.toRegex(a, e3);
                        if (n2 === true) {
                            i.state = t3;
                        }
                        return i;
                    };
                    picomatch.makeRe = (t3, e3 = {}, u3 = false, n2 = false) => {
                        if (!t3 || typeof t3 !== "string") {
                            throw new TypeError("Expected a non-empty string");
                        }
                        let s2 = { negated: false, fastpaths: true };
                        if (e3.fastpaths !== false && (t3[0] === "." || t3[0] === "*")) {
                            s2.output = o.fastpaths(t3, e3);
                        }
                        if (!s2.output) {
                            s2 = o(t3, e3);
                        }
                        return picomatch.compileRe(s2, e3, u3, n2);
                    };
                    picomatch.toRegex = (t3, e3) => {
                        try {
                            const u3 = e3 || {};
                            return new RegExp(t3, u3.flags || (u3.nocase ? "i" : ""));
                        } catch (t4) {
                            if (e3 && e3.debug === true) throw t4;
                            return /$^/;
                        }
                    };
                    picomatch.constants = r2;
                    t2.exports = picomatch;
                },
                716: (t2, e2, u2) => {
                    const n = u2(96);
                    const { CHAR_ASTERISK: o, CHAR_AT: s, CHAR_BACKWARD_SLASH: r2, CHAR_COMMA: a, CHAR_DOT: i, CHAR_EXCLAMATION_MARK: c, CHAR_FORWARD_SLASH: p, CHAR_LEFT_CURLY_BRACE: l, CHAR_LEFT_PARENTHESES: f, CHAR_LEFT_SQUARE_BRACKET: A, CHAR_PLUS: _, CHAR_QUESTION_MARK: R, CHAR_RIGHT_CURLY_BRACE: E, CHAR_RIGHT_PARENTHESES: h, CHAR_RIGHT_SQUARE_BRACKET: g } = u2(154);
                    const isPathSeparator = (t3) => t3 === p || t3 === r2;
                    const depth = (t3) => {
                        if (t3.isPrefix !== true) {
                            t3.depth = t3.isGlobstar ? Infinity : 1;
                        }
                    };
                    const scan = (t3, e3) => {
                        const u3 = e3 || {};
                        const b = t3.length - 1;
                        const C = u3.parts === true || u3.scanToEnd === true;
                        const y = [];
                        const $ = [];
                        const x = [];
                        let S = t3;
                        let H = -1;
                        let v = 0;
                        let d = 0;
                        let L = false;
                        let T = false;
                        let O = false;
                        let k = false;
                        let m = false;
                        let w = false;
                        let N = false;
                        let I = false;
                        let B = false;
                        let G = false;
                        let D = 0;
                        let M;
                        let P;
                        let K = { value: "", depth: 0, isGlob: false };
                        const eos = () => H >= b;
                        const peek = () => S.charCodeAt(H + 1);
                        const advance = () => {
                            M = P;
                            return S.charCodeAt(++H);
                        };
                        while (H < b) {
                            P = advance();
                            let t4;
                            if (P === r2) {
                                N = K.backslashes = true;
                                P = advance();
                                if (P === l) {
                                    w = true;
                                }
                                continue;
                            }
                            if (w === true || P === l) {
                                D++;
                                while (eos() !== true && (P = advance())) {
                                    if (P === r2) {
                                        N = K.backslashes = true;
                                        advance();
                                        continue;
                                    }
                                    if (P === l) {
                                        D++;
                                        continue;
                                    }
                                    if (w !== true && P === i && (P = advance()) === i) {
                                        L = K.isBrace = true;
                                        O = K.isGlob = true;
                                        G = true;
                                        if (C === true) {
                                            continue;
                                        }
                                        break;
                                    }
                                    if (w !== true && P === a) {
                                        L = K.isBrace = true;
                                        O = K.isGlob = true;
                                        G = true;
                                        if (C === true) {
                                            continue;
                                        }
                                        break;
                                    }
                                    if (P === E) {
                                        D--;
                                        if (D === 0) {
                                            w = false;
                                            L = K.isBrace = true;
                                            G = true;
                                            break;
                                        }
                                    }
                                }
                                if (C === true) {
                                    continue;
                                }
                                break;
                            }
                            if (P === p) {
                                y.push(H);
                                $.push(K);
                                K = { value: "", depth: 0, isGlob: false };
                                if (G === true) continue;
                                if (M === i && H === v + 1) {
                                    v += 2;
                                    continue;
                                }
                                d = H + 1;
                                continue;
                            }
                            if (u3.noext !== true) {
                                const t5 = P === _ || P === s || P === o || P === R || P === c;
                                if (t5 === true && peek() === f) {
                                    O = K.isGlob = true;
                                    k = K.isExtglob = true;
                                    G = true;
                                    if (P === c && H === v) {
                                        B = true;
                                    }
                                    if (C === true) {
                                        while (eos() !== true && (P = advance())) {
                                            if (P === r2) {
                                                N = K.backslashes = true;
                                                P = advance();
                                                continue;
                                            }
                                            if (P === h) {
                                                O = K.isGlob = true;
                                                G = true;
                                                break;
                                            }
                                        }
                                        continue;
                                    }
                                    break;
                                }
                            }
                            if (P === o) {
                                if (M === o) m = K.isGlobstar = true;
                                O = K.isGlob = true;
                                G = true;
                                if (C === true) {
                                    continue;
                                }
                                break;
                            }
                            if (P === R) {
                                O = K.isGlob = true;
                                G = true;
                                if (C === true) {
                                    continue;
                                }
                                break;
                            }
                            if (P === A) {
                                while (eos() !== true && (t4 = advance())) {
                                    if (t4 === r2) {
                                        N = K.backslashes = true;
                                        advance();
                                        continue;
                                    }
                                    if (t4 === g) {
                                        T = K.isBracket = true;
                                        O = K.isGlob = true;
                                        G = true;
                                        break;
                                    }
                                }
                                if (C === true) {
                                    continue;
                                }
                                break;
                            }
                            if (u3.nonegate !== true && P === c && H === v) {
                                I = K.negated = true;
                                v++;
                                continue;
                            }
                            if (u3.noparen !== true && P === f) {
                                O = K.isGlob = true;
                                if (C === true) {
                                    while (eos() !== true && (P = advance())) {
                                        if (P === f) {
                                            N = K.backslashes = true;
                                            P = advance();
                                            continue;
                                        }
                                        if (P === h) {
                                            G = true;
                                            break;
                                        }
                                    }
                                    continue;
                                }
                                break;
                            }
                            if (O === true) {
                                G = true;
                                if (C === true) {
                                    continue;
                                }
                                break;
                            }
                        }
                        if (u3.noext === true) {
                            k = false;
                            O = false;
                        }
                        let U = S;
                        let X = "";
                        let F = "";
                        if (v > 0) {
                            X = S.slice(0, v);
                            S = S.slice(v);
                            d -= v;
                        }
                        if (U && O === true && d > 0) {
                            U = S.slice(0, d);
                            F = S.slice(d);
                        } else if (O === true) {
                            U = "";
                            F = S;
                        } else {
                            U = S;
                        }
                        if (U && U !== "" && U !== "/" && U !== S) {
                            if (isPathSeparator(U.charCodeAt(U.length - 1))) {
                                U = U.slice(0, -1);
                            }
                        }
                        if (u3.unescape === true) {
                            if (F) F = n.removeBackslashes(F);
                            if (U && N === true) {
                                U = n.removeBackslashes(U);
                            }
                        }
                        const Q = { prefix: X, input: t3, start: v, base: U, glob: F, isBrace: L, isBracket: T, isGlob: O, isExtglob: k, isGlobstar: m, negated: I, negatedExtglob: B };
                        if (u3.tokens === true) {
                            Q.maxDepth = 0;
                            if (!isPathSeparator(P)) {
                                $.push(K);
                            }
                            Q.tokens = $;
                        }
                        if (u3.parts === true || u3.tokens === true) {
                            let e4;
                            for (let n2 = 0; n2 < y.length; n2++) {
                                const o2 = e4 ? e4 + 1 : v;
                                const s2 = y[n2];
                                const r3 = t3.slice(o2, s2);
                                if (u3.tokens) {
                                    if (n2 === 0 && v !== 0) {
                                        $[n2].isPrefix = true;
                                        $[n2].value = X;
                                    } else {
                                        $[n2].value = r3;
                                    }
                                    depth($[n2]);
                                    Q.maxDepth += $[n2].depth;
                                }
                                if (n2 !== 0 || r3 !== "") {
                                    x.push(r3);
                                }
                                e4 = s2;
                            }
                            if (e4 && e4 + 1 < t3.length) {
                                const n2 = t3.slice(e4 + 1);
                                x.push(n2);
                                if (u3.tokens) {
                                    $[$.length - 1].value = n2;
                                    depth($[$.length - 1]);
                                    Q.maxDepth += $[$.length - 1].depth;
                                }
                            }
                            Q.slashes = y;
                            Q.parts = x;
                        }
                        return Q;
                    };
                    t2.exports = scan;
                },
                96: (t2, e2, u2) => {
                    const { REGEX_BACKSLASH: n, REGEX_REMOVE_BACKSLASH: o, REGEX_SPECIAL_CHARS: s, REGEX_SPECIAL_CHARS_GLOBAL: r2 } = u2(154);
                    e2.isObject = (t3) => t3 !== null && typeof t3 === "object" && !Array.isArray(t3);
                    e2.hasRegexChars = (t3) => s.test(t3);
                    e2.isRegexChar = (t3) => t3.length === 1 && e2.hasRegexChars(t3);
                    e2.escapeRegex = (t3) => t3.replace(r2, "\\$1");
                    e2.toPosixSlashes = (t3) => t3.replace(n, "/");
                    e2.removeBackslashes = (t3) => t3.replace(o, (t4) => t4 === "\\" ? "" : t4);
                    e2.escapeLast = (t3, u3, n2) => {
                        const o2 = t3.lastIndexOf(u3, n2);
                        if (o2 === -1) return t3;
                        if (t3[o2 - 1] === "\\") return e2.escapeLast(t3, u3, o2 - 1);
                        return `${t3.slice(0, o2)}\\${t3.slice(o2)}`;
                    };
                    e2.removePrefix = (t3, e3 = {}) => {
                        let u3 = t3;
                        if (u3.startsWith("./")) {
                            u3 = u3.slice(2);
                            e3.prefix = "./";
                        }
                        return u3;
                    };
                    e2.wrapOutput = (t3, e3 = {}, u3 = {}) => {
                        const n2 = u3.contains ? "" : "^";
                        const o2 = u3.contains ? "" : "$";
                        let s2 = `${n2}(?:${t3})${o2}`;
                        if (e3.negated === true) {
                            s2 = `(?:^(?!${s2}).*$)`;
                        }
                        return s2;
                    };
                    e2.basename = (t3, { windows: e3 } = {}) => {
                        const u3 = t3.split(e3 ? /[\\/]/ : "/");
                        const n2 = u3[u3.length - 1];
                        if (n2 === "") {
                            return u3[u3.length - 2];
                        }
                        return n2;
                    };
                }
            };
            var e = {};

            function __nccwpck_require__(u2) {
                var n = e[u2];
                if (n !== void 0) {
                    return n.exports;
                }
                var o = e[u2] = { exports: {} };
                var s = true;
                try {
                    t[u2](o, o.exports, __nccwpck_require__);
                    s = false;
                } finally {
                    if (s) delete e[u2];
                }
                return o.exports;
            }
            if (typeof __nccwpck_require__ !== "undefined") __nccwpck_require__.ab = __dirname + "/";
            var u = __nccwpck_require__(170);
            module2.exports = u;
        })();
    }
});

// node_modules/next/dist/shared/lib/match-local-pattern.js
var require_match_local_pattern = __commonJS({
    "node_modules/next/dist/shared/lib/match-local-pattern.js" (exports2) {
        "use strict";
        Object.defineProperty(exports2, "__esModule", {
            value: true
        });

        function _export(target, all) {
            for (var name in all) Object.defineProperty(target, name, {
                enumerable: true,
                get: all[name]
            });
        }
        _export(exports2, {
            hasLocalMatch: function() {
                return hasLocalMatch;
            },
            matchLocalPattern: function() {
                return matchLocalPattern;
            }
        });
        var _picomatch = require_picomatch();

        function matchLocalPattern(pattern, url) {
            if (pattern.search !== void 0) {
                if (pattern.search !== url.search) {
                    return false;
                }
            }
            var _pattern_pathname;
            if (!(0, _picomatch.makeRe)((_pattern_pathname = pattern.pathname) != null ? _pattern_pathname : "**", {
                    dot: true
                }).test(url.pathname)) {
                return false;
            }
            return true;
        }

        function hasLocalMatch(localPatterns, urlPathAndQuery) {
            if (!localPatterns) {
                return true;
            }
            const url = new URL(urlPathAndQuery, "http://n");
            return localPatterns.some((p) => matchLocalPattern(p, url));
        }
    }
});

// node_modules/next/dist/shared/lib/match-remote-pattern.js
var require_match_remote_pattern = __commonJS({
    "node_modules/next/dist/shared/lib/match-remote-pattern.js" (exports2) {
        "use strict";
        Object.defineProperty(exports2, "__esModule", {
            value: true
        });

        function _export(target, all) {
            for (var name in all) Object.defineProperty(target, name, {
                enumerable: true,
                get: all[name]
            });
        }
        _export(exports2, {
            hasRemoteMatch: function() {
                return hasRemoteMatch;
            },
            matchRemotePattern: function() {
                return matchRemotePattern;
            }
        });
        var _picomatch = require_picomatch();

        function matchRemotePattern(pattern, url) {
            if (pattern.protocol !== void 0) {
                if (pattern.protocol.replace(/:$/, "") !== url.protocol.replace(/:$/, "")) {
                    return false;
                }
            }
            if (pattern.port !== void 0) {
                if (pattern.port !== url.port) {
                    return false;
                }
            }
            if (pattern.hostname === void 0) {
                throw Object.defineProperty(new Error("Pattern should define hostname but found\n" + JSON.stringify(pattern)), "__NEXT_ERROR_CODE", {
                    value: "E410",
                    enumerable: false,
                    configurable: true
                });
            } else {
                if (!(0, _picomatch.makeRe)(pattern.hostname).test(url.hostname)) {
                    return false;
                }
            }
            if (pattern.search !== void 0) {
                if (pattern.search !== url.search) {
                    return false;
                }
            }
            var _pattern_pathname;
            if (!(0, _picomatch.makeRe)((_pattern_pathname = pattern.pathname) != null ? _pattern_pathname : "**", {
                    dot: true
                }).test(url.pathname)) {
                return false;
            }
            return true;
        }

        function hasRemoteMatch(domains, remotePatterns, url) {
            return domains.some((domain) => url.hostname === domain) || remotePatterns.some((p) => matchRemotePattern(p, url));
        }
    }
});

// node_modules/next/dist/shared/lib/image-loader.js
var require_image_loader = __commonJS({
    "node_modules/next/dist/shared/lib/image-loader.js" (exports2) {
        "use strict";
        Object.defineProperty(exports2, "__esModule", {
            value: true
        });
        Object.defineProperty(exports2, "default", {
            enumerable: true,
            get: function() {
                return _default;
            }
        });
        var DEFAULT_Q = 75;

        function defaultLoader(param) {
            let { config, src, width, quality } = param;
            var _config_qualities;
            if (process.env.NODE_ENV !== "production") {
                const missingValues = [];
                if (!src) missingValues.push("src");
                if (!width) missingValues.push("width");
                if (missingValues.length > 0) {
                    throw Object.defineProperty(new Error("Next Image Optimization requires " + missingValues.join(", ") + " to be provided. Make sure you pass them as props to the `next/image` component. Received: " + JSON.stringify({
                        src,
                        width,
                        quality
                    })), "__NEXT_ERROR_CODE", {
                        value: "E188",
                        enumerable: false,
                        configurable: true
                    });
                }
                if (src.startsWith("//")) {
                    throw Object.defineProperty(new Error('Failed to parse src "' + src + '" on `next/image`, protocol-relative URL (//) must be changed to an absolute URL (http:// or https://)'), "__NEXT_ERROR_CODE", {
                        value: "E360",
                        enumerable: false,
                        configurable: true
                    });
                }
                if (src.startsWith("/") && config.localPatterns) {
                    if (process.env.NODE_ENV !== "test" && // micromatch isn't compatible with edge runtime
                        process.env.NEXT_RUNTIME !== "edge") {
                        const { hasLocalMatch } = require_match_local_pattern();
                        if (!hasLocalMatch(config.localPatterns, src)) {
                            throw Object.defineProperty(new Error("Invalid src prop (" + src + ") on `next/image` does not match `images.localPatterns` configured in your `next.config.js`\nSee more info: https://nextjs.org/docs/messages/next-image-unconfigured-localpatterns"), "__NEXT_ERROR_CODE", {
                                value: "E426",
                                enumerable: false,
                                configurable: true
                            });
                        }
                    }
                }
                if (!src.startsWith("/") && (config.domains || config.remotePatterns)) {
                    let parsedSrc;
                    try {
                        parsedSrc = new URL(src);
                    } catch (err) {
                        console.error(err);
                        throw Object.defineProperty(new Error('Failed to parse src "' + src + '" on `next/image`, if using relative image it must start with a leading slash "/" or be an absolute URL (http:// or https://)'), "__NEXT_ERROR_CODE", {
                            value: "E63",
                            enumerable: false,
                            configurable: true
                        });
                    }
                    if (process.env.NODE_ENV !== "test" && // micromatch isn't compatible with edge runtime
                        process.env.NEXT_RUNTIME !== "edge") {
                        const { hasRemoteMatch } = require_match_remote_pattern();
                        if (!hasRemoteMatch(config.domains, config.remotePatterns, parsedSrc)) {
                            throw Object.defineProperty(new Error("Invalid src prop (" + src + ') on `next/image`, hostname "' + parsedSrc.hostname + '" is not configured under images in your `next.config.js`\nSee more info: https://nextjs.org/docs/messages/next-image-unconfigured-host'), "__NEXT_ERROR_CODE", {
                                value: "E231",
                                enumerable: false,
                                configurable: true
                            });
                        }
                    }
                }
                if (quality && config.qualities && !config.qualities.includes(quality)) {
                    throw Object.defineProperty(new Error("Invalid quality prop (" + quality + ") on `next/image` does not match `images.qualities` configured in your `next.config.js`\nSee more info: https://nextjs.org/docs/messages/next-image-unconfigured-qualities"), "__NEXT_ERROR_CODE", {
                        value: "E623",
                        enumerable: false,
                        configurable: true
                    });
                }
            }
            const q = quality || ((_config_qualities = config.qualities) == null ? void 0 : _config_qualities.reduce((prev, cur) => Math.abs(cur - DEFAULT_Q) < Math.abs(prev - DEFAULT_Q) ? cur : prev)) || DEFAULT_Q;
            return config.path + "?url=" + encodeURIComponent(src) + "&w=" + width + "&q=" + q + (src.startsWith("/_next/static/media/") && process.env.NEXT_DEPLOYMENT_ID ? "&dpl=" + process.env.NEXT_DEPLOYMENT_ID : "");
        }
        defaultLoader.__next_img_default = true;
        var _default = defaultLoader;
    }
});

// node_modules/next/dist/client/use-merged-ref.js
var require_use_merged_ref = __commonJS({
    "node_modules/next/dist/client/use-merged-ref.js" (exports2, module2) {
        "use strict";
        Object.defineProperty(exports2, "__esModule", {
            value: true
        });
        Object.defineProperty(exports2, "useMergedRef", {
            enumerable: true,
            get: function() {
                return useMergedRef;
            }
        });
        var _react = require("react");

        function useMergedRef(refA, refB) {
            const cleanupA = (0, _react.useRef)(null);
            const cleanupB = (0, _react.useRef)(null);
            return (0, _react.useCallback)((current) => {
                if (current === null) {
                    const cleanupFnA = cleanupA.current;
                    if (cleanupFnA) {
                        cleanupA.current = null;
                        cleanupFnA();
                    }
                    const cleanupFnB = cleanupB.current;
                    if (cleanupFnB) {
                        cleanupB.current = null;
                        cleanupFnB();
                    }
                } else {
                    if (refA) {
                        cleanupA.current = applyRef(refA, current);
                    }
                    if (refB) {
                        cleanupB.current = applyRef(refB, current);
                    }
                }
            }, [
                refA,
                refB
            ]);
        }

        function applyRef(refA, current) {
            if (typeof refA === "function") {
                const cleanup = refA(current);
                if (typeof cleanup === "function") {
                    return cleanup;
                } else {
                    return () => refA(null);
                }
            } else {
                refA.current = current;
                return () => {
                    refA.current = null;
                };
            }
        }
        if ((typeof exports2.default === "function" || typeof exports2.default === "object" && exports2.default !== null) && typeof exports2.default.__esModule === "undefined") {
            Object.defineProperty(exports2.default, "__esModule", { value: true });
            Object.assign(exports2.default, exports2);
            module2.exports = exports2.default;
        }
    }
});

// node_modules/next/dist/client/image-component.js
var require_image_component = __commonJS({
    "node_modules/next/dist/client/image-component.js" (exports2, module2) {
        "use strict";
        "use client";
        Object.defineProperty(exports2, "__esModule", {
            value: true
        });
        Object.defineProperty(exports2, "Image", {
            enumerable: true,
            get: function() { <<
                << << < HEAD
                return Image2; ===
                === =
                return Image3; >>>
                >>> > fc2972cdfea83c8168f72c39dcaf168d2d56269f
            }
        });
        var _interop_require_default = require_interop_require_default();
        var _interop_require_wildcard = require_interop_require_wildcard();
        var _jsxruntime = require("react/jsx-runtime");
        var _react = /* @__PURE__ */ _interop_require_wildcard._(require("react"));
        var _reactdom = /* @__PURE__ */ _interop_require_default._(require("react-dom"));
        var _head = /* @__PURE__ */ _interop_require_default._(require_head());
        var _getimgprops = require_get_img_props();
        var _imageconfig = require_image_config();
        var _imageconfigcontextsharedruntime = require_image_config_context_shared_runtime();
        var _warnonce = require_warn_once();
        var _routercontextsharedruntime = require_router_context_shared_runtime();
        var _imageloader = /* @__PURE__ */ _interop_require_default._(require_image_loader());
        var _usemergedref = require_use_merged_ref();
        var configEnv = process.env.__NEXT_IMAGE_OPTS;
        if (typeof window === "undefined") {;
            globalThis.__NEXT_IMAGE_IMPORTED = true;
        }

        function handleLoading(img, placeholder, onLoadRef, onLoadingCompleteRef, setBlurComplete, unoptimized, sizesInput) {
            const src = img == null ? void 0 : img.src;
            if (!img || img["data-loaded-src"] === src) {
                return;
            }
            img["data-loaded-src"] = src;
            const p = "decode" in img ? img.decode() : Promise.resolve();
            p.catch(() => {}).then(() => {
                if (!img.parentElement || !img.isConnected) {
                    return;
                }
                if (placeholder !== "empty") {
                    setBlurComplete(true);
                }
                if (onLoadRef == null ? void 0 : onLoadRef.current) {
                    const event = new Event("load");
                    Object.defineProperty(event, "target", {
                        writable: false,
                        value: img
                    });
                    let prevented = false;
                    let stopped = false;
                    onLoadRef.current(__spreadProps(__spreadValues({}, event), {
                        nativeEvent: event,
                        currentTarget: img,
                        target: img,
                        isDefaultPrevented: () => prevented,
                        isPropagationStopped: () => stopped,
                        persist: () => {},
                        preventDefault: () => {
                            prevented = true;
                            event.preventDefault();
                        },
                        stopPropagation: () => {
                            stopped = true;
                            event.stopPropagation();
                        }
                    }));
                }
                if (onLoadingCompleteRef == null ? void 0 : onLoadingCompleteRef.current) {
                    onLoadingCompleteRef.current(img);
                }
                if (process.env.NODE_ENV !== "production") {
                    const origSrc = new URL(src, "http://n").searchParams.get("url") || src;
                    if (img.getAttribute("data-nimg") === "fill") {
                        if (!unoptimized && (!sizesInput || sizesInput === "100vw")) {
                            let widthViewportRatio = img.getBoundingClientRect().width / window.innerWidth;
                            if (widthViewportRatio < 0.6) {
                                if (sizesInput === "100vw") {
                                    (0, _warnonce.warnOnce)('Image with src "' + origSrc + '" has "fill" prop and "sizes" prop of "100vw", but image is not rendered at full viewport width. Please adjust "sizes" to improve page performance. Read more: https://nextjs.org/docs/api-reference/next/image#sizes');
                                } else {
                                    (0, _warnonce.warnOnce)('Image with src "' + origSrc + '" has "fill" but is missing "sizes" prop. Please add it to improve page performance. Read more: https://nextjs.org/docs/api-reference/next/image#sizes');
                                }
                            }
                        }
                        if (img.parentElement) {
                            const { position } = window.getComputedStyle(img.parentElement);
                            const valid = [
                                "absolute",
                                "fixed",
                                "relative"
                            ];
                            if (!valid.includes(position)) {
                                (0, _warnonce.warnOnce)('Image with src "' + origSrc + '" has "fill" and parent element with invalid "position". Provided "' + position + '" should be one of ' + valid.map(String).join(",") + ".");
                            }
                        }
                        if (img.height === 0) {
                            (0, _warnonce.warnOnce)('Image with src "' + origSrc + '" has "fill" and a height value of 0. This is likely because the parent element of the image has not been styled to have a set height.');
                        }
                    }
                    const heightModified = img.height.toString() !== img.getAttribute("height");
                    const widthModified = img.width.toString() !== img.getAttribute("width");
                    if (heightModified && !widthModified || !heightModified && widthModified) {
                        (0, _warnonce.warnOnce)('Image with src "' + origSrc + `" has either width or height modified, but not the other. If you use CSS to change the size of your image, also include the styles 'width: "auto"' or 'height: "auto"' to maintain the aspect ratio.`);
                    }
                }
            });
        }

        function getDynamicProps(fetchPriority) {
            if (Boolean(_react.use)) {
                return {
                    fetchPriority
                };
            }
            return {
                fetchpriority: fetchPriority
            };
        }
        var ImageElement = /* @__PURE__ */ (0, _react.forwardRef)((param, forwardedRef) => {
            let _a = param,
                { src, srcSet, sizes, height, width, decoding, className, style, fetchPriority, placeholder, loading, unoptimized, fill, onLoadRef, onLoadingCompleteRef, setBlurComplete, setShowAltText, sizesInput, onLoad, onError } = _a,
                rest = __objRest(_a, ["src", "srcSet", "sizes", "height", "width", "decoding", "className", "style", "fetchPriority", "placeholder", "loading", "unoptimized", "fill", "onLoadRef", "onLoadingCompleteRef", "setBlurComplete", "setShowAltText", "sizesInput", "onLoad", "onError"]);
            const ownRef = (0, _react.useCallback)((img) => {
                if (!img) {
                    return;
                }
                if (onError) {
                    img.src = img.src;
                }
                if (process.env.NODE_ENV !== "production") {
                    if (!src) {
                        console.error('Image is missing required "src" property:', img);
                    }
                    if (img.getAttribute("alt") === null) {
                        console.error('Image is missing required "alt" property. Please add Alternative Text to describe the image for screen readers and search engines.');
                    }
                }
                if (img.complete) {
                    handleLoading(img, placeholder, onLoadRef, onLoadingCompleteRef, setBlurComplete, unoptimized, sizesInput);
                }
            }, [
                src,
                placeholder,
                onLoadRef,
                onLoadingCompleteRef,
                setBlurComplete,
                onError,
                unoptimized,
                sizesInput
            ]);
            const ref = (0, _usemergedref.useMergedRef)(forwardedRef, ownRef);
            return /* @__PURE__ */ (0, _jsxruntime.jsx)("img", __spreadProps(__spreadValues(__spreadValues({}, rest), getDynamicProps(fetchPriority)), {
                // It's intended to keep `loading` before `src` because React updates
                // props in order which causes Safari/Firefox to not lazy load properly.
                // See https://github.com/facebook/react/issues/25883
                loading,
                width,
                height,
                decoding,
                "data-nimg": fill ? "fill" : "1",
                className,
                style,
                // It's intended to keep `src` the last attribute because React updates
                // attributes in order. If we keep `src` the first one, Safari will
                // immediately start to fetch `src`, before `sizes` and `srcSet` are even
                // updated by React. That causes multiple unnecessary requests if `srcSet`
                // and `sizes` are defined.
                // This bug cannot be reproduced in Chrome or Firefox.
                sizes,
                srcSet,
                src,
                ref,
                onLoad: (event) => {
                    const img = event.currentTarget;
                    handleLoading(img, placeholder, onLoadRef, onLoadingCompleteRef, setBlurComplete, unoptimized, sizesInput);
                },
                onError: (event) => {
                    setShowAltText(true);
                    if (placeholder !== "empty") {
                        setBlurComplete(true);
                    }
                    if (onError) {
                        onError(event);
                    }
                }
            }));
        });

        function ImagePreload(param) {
            let { isAppRouter, imgAttributes } = param;
            const opts = __spreadValues({
                as: "image",
                imageSrcSet: imgAttributes.srcSet,
                imageSizes: imgAttributes.sizes,
                crossOrigin: imgAttributes.crossOrigin,
                referrerPolicy: imgAttributes.referrerPolicy
            }, getDynamicProps(imgAttributes.fetchPriority));
            if (isAppRouter && _reactdom.default.preload) {
                _reactdom.default.preload(
                    imgAttributes.src,
                    // @ts-expect-error TODO: upgrade to `@types/react-dom@18.3.x`
                    opts
                );
                return null;
            }
            return /* @__PURE__ */ (0, _jsxruntime.jsx)(_head.default, {
                children: /* @__PURE__ */ (0, _jsxruntime.jsx)("link", __spreadValues({
                    rel: "preload",
                    // Note how we omit the `href` attribute, as it would only be relevant
                    // for browsers that do not support `imagesrcset`, and in those cases
                    // it would cause the incorrect image to be preloaded.
                    //
                    // https://html.spec.whatwg.org/multipage/semantics.html#attr-link-imagesrcset
                    href: imgAttributes.srcSet ? void 0 : imgAttributes.src
                }, opts), "__nimg-" + imgAttributes.src + imgAttributes.srcSet + imgAttributes.sizes)
            });
        } <<
        << << < HEAD
        var Image2 = /* @__PURE__ */ (0, _react.forwardRef)((props, forwardedRef) => { ===
                === =
                var Image3 = /* @__PURE__ */ (0, _react.forwardRef)((props, forwardedRef) => { >>>
                    >>> > fc2972cdfea83c8168f72c39dcaf168d2d56269f
                    const pagesRouter = (0, _react.useContext)(_routercontextsharedruntime.RouterContext);
                    const isAppRouter = !pagesRouter;
                    const configContext = (0, _react.useContext)(_imageconfigcontextsharedruntime.ImageConfigContext);
                    const config = (0, _react.useMemo)(() => {
                        var _c_qualities;
                        const c = configEnv || configContext || _imageconfig.imageConfigDefault;
                        const allSizes = [
                            ...c.deviceSizes,
                            ...c.imageSizes
                        ].sort((a, b) => a - b);
                        const deviceSizes = c.deviceSizes.sort((a, b) => a - b);
                        const qualities = (_c_qualities = c.qualities) == null ? void 0 : _c_qualities.sort((a, b) => a - b);
                        return __spreadProps(__spreadValues({}, c), {
                            allSizes,
                            deviceSizes,
                            qualities
                        });
                    }, [
                        configContext
                    ]);
                    const { onLoad, onLoadingComplete } = props;
                    const onLoadRef = (0, _react.useRef)(onLoad);
                    (0, _react.useEffect)(() => {
                        onLoadRef.current = onLoad;
                    }, [
                        onLoad
                    ]);
                    const onLoadingCompleteRef = (0, _react.useRef)(onLoadingComplete);
                    (0, _react.useEffect)(() => {
                        onLoadingCompleteRef.current = onLoadingComplete;
                    }, [
                        onLoadingComplete
                    ]);
                    const [blurComplete, setBlurComplete] = (0, _react.useState)(false);
                    const [showAltText, setShowAltText] = (0, _react.useState)(false);
                    const { props: imgAttributes, meta: imgMeta } = (0, _getimgprops.getImgProps)(props, {
                        defaultLoader: _imageloader.default,
                        imgConf: config,
                        blurComplete,
                        showAltText
                    });
                    return /* @__PURE__ */ (0, _jsxruntime.jsxs)(_jsxruntime.Fragment, {
                        children: [
                            /* @__PURE__ */
                            (0, _jsxruntime.jsx)(ImageElement, __spreadProps(__spreadValues({}, imgAttributes), {
                                unoptimized: imgMeta.unoptimized,
                                placeholder: imgMeta.placeholder,
                                fill: imgMeta.fill,
                                onLoadRef,
                                onLoadingCompleteRef,
                                setBlurComplete,
                                setShowAltText,
                                sizesInput: props.sizes,
                                ref: forwardedRef
                            })),
                            imgMeta.priority ? /* @__PURE__ */ (0, _jsxruntime.jsx)(ImagePreload, {
                                isAppRouter,
                                imgAttributes
                            }) : null
                        ]
                    });
                });
                if ((typeof exports2.default === "function" || typeof exports2.default === "object" && exports2.default !== null) && typeof exports2.default.__esModule === "undefined") {
                    Object.defineProperty(exports2.default, "__esModule", { value: true });
                    Object.assign(exports2.default, exports2);
                    module2.exports = exports2.default;
                }
            }
        });

    // node_modules/next/dist/shared/lib/image-external.js
    var require_image_external = __commonJS({
        "node_modules/next/dist/shared/lib/image-external.js" (exports2) {
            "use strict";
            Object.defineProperty(exports2, "__esModule", {
                value: true
            });

            function _export(target, all) {
                for (var name in all) Object.defineProperty(target, name, {
                    enumerable: true,
                    get: all[name]
                });
            }
            _export(exports2, {
                default: function() {
                    return _default;
                },
                getImageProps: function() {
                    return getImageProps;
                }
            });
            var _interop_require_default = require_interop_require_default();
            var _getimgprops = require_get_img_props();
            var _imagecomponent = require_image_component();
            var _imageloader = /* @__PURE__ */ _interop_require_default._(require_image_loader());

            function getImageProps(imgProps) {
                const { props } = (0, _getimgprops.getImgProps)(imgProps, {
                    defaultLoader: _imageloader.default,
                    // This is replaced by webpack define plugin
                    imgConf: process.env.__NEXT_IMAGE_OPTS
                });
                for (const [key, value] of Object.entries(props)) {
                    if (value === void 0) {
                        delete props[key];
                    }
                }
                return {
                    props
                };
            }
            var _default = _imagecomponent.Image;
        }
    });

    // node_modules/next/image.js
    var require_image = __commonJS({
        "node_modules/next/image.js" (exports2, module2) {
            "use strict";
            module2.exports = require_image_external();
        }
    });

    // node_modules/next/dist/shared/lib/router/utils/querystring.js
    var require_querystring = __commonJS({
        "node_modules/next/dist/shared/lib/router/utils/querystring.js" (exports2) {
            "use strict";
            Object.defineProperty(exports2, "__esModule", {
                value: true
            });

            function _export(target, all) {
                for (var name in all) Object.defineProperty(target, name, {
                    enumerable: true,
                    get: all[name]
                });
            }
            _export(exports2, {
                assign: function() {
                    return assign;
                },
                searchParamsToUrlQuery: function() {
                    return searchParamsToUrlQuery;
                },
                urlQueryToSearchParams: function() {
                    return urlQueryToSearchParams;
                }
            });

            function searchParamsToUrlQuery(searchParams) {
                const query = {};
                for (const [key, value] of searchParams.entries()) {
                    const existing = query[key];
                    if (typeof existing === "undefined") {
                        query[key] = value;
                    } else if (Array.isArray(existing)) {
                        existing.push(value);
                    } else {
                        query[key] = [
                            existing,
                            value
                        ];
                    }
                }
                return query;
            }

            function stringifyUrlQueryParam(param) {
                if (typeof param === "string") {
                    return param;
                }
                if (typeof param === "number" && !isNaN(param) || typeof param === "boolean") {
                    return String(param);
                } else {
                    return "";
                }
            }

            function urlQueryToSearchParams(query) {
                const searchParams = new URLSearchParams();
                for (const [key, value] of Object.entries(query)) {
                    if (Array.isArray(value)) {
                        for (const item of value) {
                            searchParams.append(key, stringifyUrlQueryParam(item));
                        }
                    } else {
                        searchParams.set(key, stringifyUrlQueryParam(value));
                    }
                }
                return searchParams;
            }

            function assign(target) {
                for (var _len = arguments.length, searchParamsList = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                    searchParamsList[_key - 1] = arguments[_key];
                }
                for (const searchParams of searchParamsList) {
                    for (const key of searchParams.keys()) {
                        target.delete(key);
                    }
                    for (const [key, value] of searchParams.entries()) {
                        target.append(key, value);
                    }
                }
                return target;
            }
        }
    });

    // node_modules/next/dist/shared/lib/router/utils/format-url.js
    var require_format_url = __commonJS({
        "node_modules/next/dist/shared/lib/router/utils/format-url.js" (exports2) {
            "use strict";
            Object.defineProperty(exports2, "__esModule", {
                value: true
            });

            function _export(target, all) {
                for (var name in all) Object.defineProperty(target, name, {
                    enumerable: true,
                    get: all[name]
                });
            }
            _export(exports2, {
                formatUrl: function() {
                    return formatUrl;
                },
                formatWithValidation: function() {
                    return formatWithValidation;
                },
                urlObjectKeys: function() {
                    return urlObjectKeys;
                }
            });
            var _interop_require_wildcard = require_interop_require_wildcard();
            var _querystring = /* @__PURE__ */ _interop_require_wildcard._(require_querystring());
            var slashedProtocols = /https?|ftp|gopher|file/;

            function formatUrl(urlObj) {
                let { auth, hostname } = urlObj;
                let protocol = urlObj.protocol || "";
                let pathname = urlObj.pathname || "";
                let hash = urlObj.hash || "";
                let query = urlObj.query || "";
                let host = false;
                auth = auth ? encodeURIComponent(auth).replace(/%3A/i, ":") + "@" : "";
                if (urlObj.host) {
                    host = auth + urlObj.host;
                } else if (hostname) {
                    host = auth + (~hostname.indexOf(":") ? "[" + hostname + "]" : hostname);
                    if (urlObj.port) {
                        host += ":" + urlObj.port;
                    }
                }
                if (query && typeof query === "object") {
                    query = String(_querystring.urlQueryToSearchParams(query));
                }
                let search = urlObj.search || query && "?" + query || "";
                if (protocol && !protocol.endsWith(":")) protocol += ":";
                if (urlObj.slashes || (!protocol || slashedProtocols.test(protocol)) && host !== false) {
                    host = "//" + (host || "");
                    if (pathname && pathname[0] !== "/") pathname = "/" + pathname;
                } else if (!host) {
                    host = "";
                }
                if (hash && hash[0] !== "#") hash = "#" + hash;
                if (search && search[0] !== "?") search = "?" + search;
                pathname = pathname.replace(/[?#]/g, encodeURIComponent);
                search = search.replace("#", "%23");
                return "" + protocol + host + pathname + search + hash;
            }
            var urlObjectKeys = [
                "auth",
                "hash",
                "host",
                "hostname",
                "href",
                "path",
                "pathname",
                "port",
                "protocol",
                "query",
                "search",
                "slashes"
            ];

            function formatWithValidation(url) {
                if (process.env.NODE_ENV === "development") {
                    if (url !== null && typeof url === "object") {
                        Object.keys(url).forEach((key) => {
                            if (!urlObjectKeys.includes(key)) {
                                console.warn("Unknown key passed via urlObject into url.format: " + key);
                            }
                        });
                    }
                }
                return formatUrl(url);
            }
        }
    });

    // node_modules/next/dist/shared/lib/router/utils/omit.js
    var require_omit = __commonJS({
        "node_modules/next/dist/shared/lib/router/utils/omit.js" (exports2) {
            "use strict";
            Object.defineProperty(exports2, "__esModule", {
                value: true
            });
            Object.defineProperty(exports2, "omit", {
                enumerable: true,
                get: function() {
                    return omit;
                }
            });

            function omit(object, keys) {
                const omitted = {};
                Object.keys(object).forEach((key) => {
                    if (!keys.includes(key)) {
                        omitted[key] = object[key];
                    }
                });
                return omitted;
            }
        }
    });

    // node_modules/next/dist/shared/lib/utils.js
    var require_utils = __commonJS({
        "node_modules/next/dist/shared/lib/utils.js" (exports2) {
            "use strict";
            Object.defineProperty(exports2, "__esModule", {
                value: true
            });

            function _export(target, all) {
                for (var name in all) Object.defineProperty(target, name, {
                    enumerable: true,
                    get: all[name]
                });
            }
            _export(exports2, {
                DecodeError: function() {
                    return DecodeError;
                },
                MiddlewareNotFoundError: function() {
                    return MiddlewareNotFoundError;
                },
                MissingStaticPage: function() {
                    return MissingStaticPage;
                },
                NormalizeError: function() {
                    return NormalizeError;
                },
                PageNotFoundError: function() {
                    return PageNotFoundError;
                },
                SP: function() {
                    return SP;
                },
                ST: function() {
                    return ST;
                },
                WEB_VITALS: function() {
                    return WEB_VITALS;
                },
                execOnce: function() {
                    return execOnce;
                },
                getDisplayName: function() {
                    return getDisplayName;
                },
                getLocationOrigin: function() {
                    return getLocationOrigin;
                },
                getURL: function() {
                    return getURL;
                },
                isAbsoluteUrl: function() {
                    return isAbsoluteUrl;
                },
                isResSent: function() {
                    return isResSent;
                },
                loadGetInitialProps: function() {
                    return loadGetInitialProps;
                },
                normalizeRepeatedSlashes: function() {
                    return normalizeRepeatedSlashes;
                },
                stringifyError: function() {
                    return stringifyError;
                }
            });
            var WEB_VITALS = [
                "CLS",
                "FCP",
                "FID",
                "INP",
                "LCP",
                "TTFB"
            ];

            function execOnce(fn) {
                let used = false;
                let result;
                return function() {
                    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                        args[_key] = arguments[_key];
                    }
                    if (!used) {
                        used = true;
                        result = fn(...args);
                    }
                    return result;
                };
            }
            var ABSOLUTE_URL_REGEX = /^[a-zA-Z][a-zA-Z\d+\-.]*?:/;
            var isAbsoluteUrl = (url) => ABSOLUTE_URL_REGEX.test(url);

            function getLocationOrigin() {
                const { protocol, hostname, port } = window.location;
                return protocol + "//" + hostname + (port ? ":" + port : "");
            }

            function getURL() {
                const { href } = window.location;
                const origin = getLocationOrigin();
                return href.substring(origin.length);
            }

            function getDisplayName(Component) {
                return typeof Component === "string" ? Component : Component.displayName || Component.name || "Unknown";
            }

            function isResSent(res) {
                return res.finished || res.headersSent;
            }

            function normalizeRepeatedSlashes(url) {
                const urlParts = url.split("?");
                const urlNoQuery = urlParts[0];
                return urlNoQuery.replace(/\\/g, "/").replace(/\/\/+/g, "/") + (urlParts[1] ? "?" + urlParts.slice(1).join("?") : "");
            }

            function loadGetInitialProps(App, ctx) {
                return __async(this, null, function*() {
                    if (process.env.NODE_ENV !== "production") {
                        var _App_prototype;
                        if ((_App_prototype = App.prototype) == null ? void 0 : _App_prototype.getInitialProps) {
                            const message = '"' + getDisplayName(App) + '.getInitialProps()" is defined as an instance method - visit https://nextjs.org/docs/messages/get-initial-props-as-an-instance-method for more information.';
                            throw Object.defineProperty(new Error(message), "__NEXT_ERROR_CODE", {
                                value: "E394",
                                enumerable: false,
                                configurable: true
                            });
                        }
                    }
                    const res = ctx.res || ctx.ctx && ctx.ctx.res;
                    if (!App.getInitialProps) {
                        if (ctx.ctx && ctx.Component) {
                            return {
                                pageProps: yield loadGetInitialProps(ctx.Component, ctx.ctx)
                            };
                        }
                        return {};
                    }
                    const props = yield App.getInitialProps(ctx);
                    if (res && isResSent(res)) {
                        return props;
                    }
                    if (!props) {
                        const message = '"' + getDisplayName(App) + '.getInitialProps()" should resolve to an object. But found "' + props + '" instead.';
                        throw Object.defineProperty(new Error(message), "__NEXT_ERROR_CODE", {
                            value: "E394",
                            enumerable: false,
                            configurable: true
                        });
                    }
                    if (process.env.NODE_ENV !== "production") {
                        if (Object.keys(props).length === 0 && !ctx.ctx) {
                            console.warn("" + getDisplayName(App) + " returned an empty object from `getInitialProps`. This de-optimizes and prevents automatic static optimization. https://nextjs.org/docs/messages/empty-object-getInitialProps");
                        }
                    }
                    return props;
                });
            }
            var SP = typeof performance !== "undefined";
            var ST = SP && [
                "mark",
                "measure",
                "getEntriesByName"
            ].every((method) => typeof performance[method] === "function");
            var DecodeError = class extends Error {};
            var NormalizeError = class extends Error {};
            var PageNotFoundError = class extends Error {
                constructor(page) {
                    super();
                    this.code = "ENOENT";
                    this.name = "PageNotFoundError";
                    this.message = "Cannot find module for page: " + page;
                }
            };
            var MissingStaticPage = class extends Error {
                constructor(page, message) {
                    super();
                    this.message = "Failed to load static file for page: " + page + " " + message;
                }
            };
            var MiddlewareNotFoundError = class extends Error {
                constructor() {
                    super();
                    this.code = "ENOENT";
                    this.message = "Cannot find the middleware module";
                }
            };

            function stringifyError(error) {
                return JSON.stringify({
                    message: error.message,
                    stack: error.stack
                });
            }
        }
    });

    // node_modules/next/dist/shared/lib/router/utils/remove-trailing-slash.js
    var require_remove_trailing_slash = __commonJS({
        "node_modules/next/dist/shared/lib/router/utils/remove-trailing-slash.js" (exports2) {
            "use strict";
            Object.defineProperty(exports2, "__esModule", {
                value: true
            });
            Object.defineProperty(exports2, "removeTrailingSlash", {
                enumerable: true,
                get: function() {
                    return removeTrailingSlash;
                }
            });

            function removeTrailingSlash(route) {
                return route.replace(/\/$/, "") || "/";
            }
        }
    });

    // node_modules/next/dist/shared/lib/router/utils/parse-path.js
    var require_parse_path = __commonJS({
        "node_modules/next/dist/shared/lib/router/utils/parse-path.js" (exports2) {
            "use strict";
            Object.defineProperty(exports2, "__esModule", {
                value: true
            });
            Object.defineProperty(exports2, "parsePath", {
                enumerable: true,
                get: function() {
                    return parsePath;
                }
            });

            function parsePath(path) {
                const hashIndex = path.indexOf("#");
                const queryIndex = path.indexOf("?");
                const hasQuery = queryIndex > -1 && (hashIndex < 0 || queryIndex < hashIndex);
                if (hasQuery || hashIndex > -1) {
                    return {
                        pathname: path.substring(0, hasQuery ? queryIndex : hashIndex),
                        query: hasQuery ? path.substring(queryIndex, hashIndex > -1 ? hashIndex : void 0) : "",
                        hash: hashIndex > -1 ? path.slice(hashIndex) : ""
                    };
                }
                return {
                    pathname: path,
                    query: "",
                    hash: ""
                };
            }
        }
    });

    // node_modules/next/dist/client/normalize-trailing-slash.js
    var require_normalize_trailing_slash = __commonJS({
        "node_modules/next/dist/client/normalize-trailing-slash.js" (exports2, module2) {
            "use strict";
            Object.defineProperty(exports2, "__esModule", {
                value: true
            });
            Object.defineProperty(exports2, "normalizePathTrailingSlash", {
                enumerable: true,
                get: function() {
                    return normalizePathTrailingSlash;
                }
            });
            var _removetrailingslash = require_remove_trailing_slash();
            var _parsepath = require_parse_path();
            var normalizePathTrailingSlash = (path) => {
                if (!path.startsWith("/") || process.env.__NEXT_MANUAL_TRAILING_SLASH) {
                    return path;
                }
                const { pathname, query, hash } = (0, _parsepath.parsePath)(path);
                if (process.env.__NEXT_TRAILING_SLASH) {
                    if (/\.[^/]+\/?$/.test(pathname)) {
                        return "" + (0, _removetrailingslash.removeTrailingSlash)(pathname) + query + hash;
                    } else if (pathname.endsWith("/")) {
                        return "" + pathname + query + hash;
                    } else {
                        return pathname + "/" + query + hash;
                    }
                }
                return "" + (0, _removetrailingslash.removeTrailingSlash)(pathname) + query + hash;
            };
            if ((typeof exports2.default === "function" || typeof exports2.default === "object" && exports2.default !== null) && typeof exports2.default.__esModule === "undefined") {
                Object.defineProperty(exports2.default, "__esModule", { value: true });
                Object.assign(exports2.default, exports2);
                module2.exports = exports2.default;
            }
        }
    });

    // node_modules/next/dist/shared/lib/router/utils/path-has-prefix.js
    var require_path_has_prefix = __commonJS({
        "node_modules/next/dist/shared/lib/router/utils/path-has-prefix.js" (exports2) {
            "use strict";
            Object.defineProperty(exports2, "__esModule", {
                value: true
            });
            Object.defineProperty(exports2, "pathHasPrefix", {
                enumerable: true,
                get: function() {
                    return pathHasPrefix;
                }
            });
            var _parsepath = require_parse_path();

            function pathHasPrefix(path, prefix) {
                if (typeof path !== "string") {
                    return false;
                }
                const { pathname } = (0, _parsepath.parsePath)(path);
                return pathname === prefix || pathname.startsWith(prefix + "/");
            }
        }
    });

    // node_modules/next/dist/client/has-base-path.js
    var require_has_base_path = __commonJS({
        "node_modules/next/dist/client/has-base-path.js" (exports2, module2) {
            "use strict";
            Object.defineProperty(exports2, "__esModule", {
                value: true
            });
            Object.defineProperty(exports2, "hasBasePath", {
                enumerable: true,
                get: function() {
                    return hasBasePath;
                }
            });
            var _pathhasprefix = require_path_has_prefix();
            var basePath = process.env.__NEXT_ROUTER_BASEPATH || "";

            function hasBasePath(path) {
                return (0, _pathhasprefix.pathHasPrefix)(path, basePath);
            }
            if ((typeof exports2.default === "function" || typeof exports2.default === "object" && exports2.default !== null) && typeof exports2.default.__esModule === "undefined") {
                Object.defineProperty(exports2.default, "__esModule", { value: true });
                Object.assign(exports2.default, exports2);
                module2.exports = exports2.default;
            }
        }
    });

    // node_modules/next/dist/shared/lib/router/utils/is-local-url.js
    var require_is_local_url = __commonJS({
        "node_modules/next/dist/shared/lib/router/utils/is-local-url.js" (exports2) {
            "use strict";
            Object.defineProperty(exports2, "__esModule", {
                value: true
            });
            Object.defineProperty(exports2, "isLocalURL", {
                enumerable: true,
                get: function() {
                    return isLocalURL;
                }
            });
            var _utils = require_utils();
            var _hasbasepath = require_has_base_path();

            function isLocalURL(url) {
                if (!(0, _utils.isAbsoluteUrl)(url)) return true;
                try {
                    const locationOrigin = (0, _utils.getLocationOrigin)();
                    const resolved = new URL(url, locationOrigin);
                    return resolved.origin === locationOrigin && (0, _hasbasepath.hasBasePath)(resolved.pathname);
                } catch (_) {
                    return false;
                }
            }
        }
    });

    // node_modules/next/dist/shared/lib/router/utils/sorted-routes.js
    var require_sorted_routes = __commonJS({
        "node_modules/next/dist/shared/lib/router/utils/sorted-routes.js" (exports2) {
            "use strict";
            Object.defineProperty(exports2, "__esModule", {
                value: true
            });

            function _export(target, all) {
                for (var name in all) Object.defineProperty(target, name, {
                    enumerable: true,
                    get: all[name]
                });
            }
            _export(exports2, {
                getSortedRouteObjects: function() {
                    return getSortedRouteObjects;
                },
                getSortedRoutes: function() {
                    return getSortedRoutes;
                }
            });
            var UrlNode = class _UrlNode {
                insert(urlPath) {
                    this._insert(urlPath.split("/").filter(Boolean), [], false);
                }
                smoosh() {
                    return this._smoosh();
                }
                _smoosh(prefix) {
                    if (prefix === void 0) prefix = "/";
                    const childrenPaths = [
                        ...this.children.keys()
                    ].sort();
                    if (this.slugName !== null) {
                        childrenPaths.splice(childrenPaths.indexOf("[]"), 1);
                    }
                    if (this.restSlugName !== null) {
                        childrenPaths.splice(childrenPaths.indexOf("[...]"), 1);
                    }
                    if (this.optionalRestSlugName !== null) {
                        childrenPaths.splice(childrenPaths.indexOf("[[...]]"), 1);
                    }
                    const routes = childrenPaths.map((c) => this.children.get(c)._smoosh("" + prefix + c + "/")).reduce((prev, curr) => [
                        ...prev,
                        ...curr
                    ], []);
                    if (this.slugName !== null) {
                        routes.push(...this.children.get("[]")._smoosh(prefix + "[" + this.slugName + "]/"));
                    }
                    if (!this.placeholder) {
                        const r2 = prefix === "/" ? "/" : prefix.slice(0, -1);
                        if (this.optionalRestSlugName != null) {
                            throw Object.defineProperty(new Error('You cannot define a route with the same specificity as a optional catch-all route ("' + r2 + '" and "' + r2 + "[[..." + this.optionalRestSlugName + ']]").'), "__NEXT_ERROR_CODE", {
                                value: "E458",
                                enumerable: false,
                                configurable: true
                            });
                        }
                        routes.unshift(r2);
                    }
                    if (this.restSlugName !== null) {
                        routes.push(...this.children.get("[...]")._smoosh(prefix + "[..." + this.restSlugName + "]/"));
                    }
                    if (this.optionalRestSlugName !== null) {
                        routes.push(...this.children.get("[[...]]")._smoosh(prefix + "[[..." + this.optionalRestSlugName + "]]/"));
                    }
                    return routes;
                }
                _insert(urlPaths, slugNames, isCatchAll) {
                    if (urlPaths.length === 0) {
                        this.placeholder = false;
                        return;
                    }
                    if (isCatchAll) {
                        throw Object.defineProperty(new Error("Catch-all must be the last part of the URL."), "__NEXT_ERROR_CODE", {
                            value: "E392",
                            enumerable: false,
                            configurable: true
                        });
                    }
                    let nextSegment = urlPaths[0];
                    if (nextSegment.startsWith("[") && nextSegment.endsWith("]")) {
                        let handleSlug = function(previousSlug, nextSlug) {
                            if (previousSlug !== null) {
                                if (previousSlug !== nextSlug) {
                                    throw Object.defineProperty(new Error("You cannot use different slug names for the same dynamic path ('" + previousSlug + "' !== '" + nextSlug + "')."), "__NEXT_ERROR_CODE", {
                                        value: "E337",
                                        enumerable: false,
                                        configurable: true
                                    });
                                }
                            }
                            slugNames.forEach((slug) => {
                                if (slug === nextSlug) {
                                    throw Object.defineProperty(new Error('You cannot have the same slug name "' + nextSlug + '" repeat within a single dynamic path'), "__NEXT_ERROR_CODE", {
                                        value: "E247",
                                        enumerable: false,
                                        configurable: true
                                    });
                                }
                                if (slug.replace(/\W/g, "") === nextSegment.replace(/\W/g, "")) {
                                    throw Object.defineProperty(new Error('You cannot have the slug names "' + slug + '" and "' + nextSlug + '" differ only by non-word symbols within a single dynamic path'), "__NEXT_ERROR_CODE", {
                                        value: "E499",
                                        enumerable: false,
                                        configurable: true
                                    });
                                }
                            });
                            slugNames.push(nextSlug);
                        };
                        let segmentName = nextSegment.slice(1, -1);
                        let isOptional = false;
                        if (segmentName.startsWith("[") && segmentName.endsWith("]")) {
                            segmentName = segmentName.slice(1, -1);
                            isOptional = true;
                        }
                        if (segmentName.startsWith("\u2026")) {
                            throw Object.defineProperty(new Error("Detected a three-dot character ('\u2026') at ('" + segmentName + "'). Did you mean ('...')?"), "__NEXT_ERROR_CODE", {
                                value: "E147",
                                enumerable: false,
                                configurable: true
                            });
                        }
                        if (segmentName.startsWith("...")) {
                            segmentName = segmentName.substring(3);
                            isCatchAll = true;
                        }
                        if (segmentName.startsWith("[") || segmentName.endsWith("]")) {
                            throw Object.defineProperty(new Error("Segment names may not start or end with extra brackets ('" + segmentName + "')."), "__NEXT_ERROR_CODE", {
                                value: "E421",
                                enumerable: false,
                                configurable: true
                            });
                        }
                        if (segmentName.startsWith(".")) {
                            throw Object.defineProperty(new Error("Segment names may not start with erroneous periods ('" + segmentName + "')."), "__NEXT_ERROR_CODE", {
                                value: "E288",
                                enumerable: false,
                                configurable: true
                            });
                        }
                        if (isCatchAll) {
                            if (isOptional) {
                                if (this.restSlugName != null) {
                                    throw Object.defineProperty(new Error('You cannot use both an required and optional catch-all route at the same level ("[...' + this.restSlugName + ']" and "' + urlPaths[0] + '" ).'), "__NEXT_ERROR_CODE", {
                                        value: "E299",
                                        enumerable: false,
                                        configurable: true
                                    });
                                }
                                handleSlug(this.optionalRestSlugName, segmentName);
                                this.optionalRestSlugName = segmentName;
                                nextSegment = "[[...]]";
                            } else {
                                if (this.optionalRestSlugName != null) {
                                    throw Object.defineProperty(new Error('You cannot use both an optional and required catch-all route at the same level ("[[...' + this.optionalRestSlugName + ']]" and "' + urlPaths[0] + '").'), "__NEXT_ERROR_CODE", {
                                        value: "E300",
                                        enumerable: false,
                                        configurable: true
                                    });
                                }
                                handleSlug(this.restSlugName, segmentName);
                                this.restSlugName = segmentName;
                                nextSegment = "[...]";
                            }
                        } else {
                            if (isOptional) {
                                throw Object.defineProperty(new Error('Optional route parameters are not yet supported ("' + urlPaths[0] + '").'), "__NEXT_ERROR_CODE", {
                                    value: "E435",
                                    enumerable: false,
                                    configurable: true
                                });
                            }
                            handleSlug(this.slugName, segmentName);
                            this.slugName = segmentName;
                            nextSegment = "[]";
                        }
                    }
                    if (!this.children.has(nextSegment)) {
                        this.children.set(nextSegment, new _UrlNode());
                    }
                    this.children.get(nextSegment)._insert(urlPaths.slice(1), slugNames, isCatchAll);
                }
                constructor() {
                    this.placeholder = true;
                    this.children = /* @__PURE__ */ new Map();
                    this.slugName = null;
                    this.restSlugName = null;
                    this.optionalRestSlugName = null;
                }
            };

            function getSortedRoutes(normalizedPages) {
                const root = new UrlNode();
                normalizedPages.forEach((pagePath) => root.insert(pagePath));
                return root.smoosh();
            }

            function getSortedRouteObjects(objects, getter) {
                const indexes = {};
                const pathnames = [];
                for (let i = 0; i < objects.length; i++) {
                    const pathname = getter(objects[i]);
                    indexes[pathname] = i;
                    pathnames[i] = pathname;
                }
                const sorted = getSortedRoutes(pathnames);
                return sorted.map((pathname) => objects[indexes[pathname]]);
            }
        }
    });

    // node_modules/next/dist/shared/lib/page-path/ensure-leading-slash.js
    var require_ensure_leading_slash = __commonJS({
        "node_modules/next/dist/shared/lib/page-path/ensure-leading-slash.js" (exports2) {
            "use strict";
            Object.defineProperty(exports2, "__esModule", {
                value: true
            });
            Object.defineProperty(exports2, "ensureLeadingSlash", {
                enumerable: true,
                get: function() {
                    return ensureLeadingSlash;
                }
            });

            function ensureLeadingSlash(path) {
                return path.startsWith("/") ? path : "/" + path;
            }
        }
    });

    // node_modules/next/dist/shared/lib/segment.js
    var require_segment = __commonJS({
        "node_modules/next/dist/shared/lib/segment.js" (exports2) {
            "use strict";
            Object.defineProperty(exports2, "__esModule", {
                value: true
            });

            function _export(target, all) {
                for (var name in all) Object.defineProperty(target, name, {
                    enumerable: true,
                    get: all[name]
                });
            }
            _export(exports2, {
                DEFAULT_SEGMENT_KEY: function() {
                    return DEFAULT_SEGMENT_KEY;
                },
                PAGE_SEGMENT_KEY: function() {
                    return PAGE_SEGMENT_KEY;
                },
                addSearchParamsIfPageSegment: function() {
                    return addSearchParamsIfPageSegment;
                },
                isGroupSegment: function() {
                    return isGroupSegment;
                },
                isParallelRouteSegment: function() {
                    return isParallelRouteSegment;
                }
            });

            function isGroupSegment(segment) {
                return segment[0] === "(" && segment.endsWith(")");
            }

            function isParallelRouteSegment(segment) {
                return segment.startsWith("@") && segment !== "@children";
            }

            function addSearchParamsIfPageSegment(segment, searchParams) {
                const isPageSegment = segment.includes(PAGE_SEGMENT_KEY);
                if (isPageSegment) {
                    const stringifiedQuery = JSON.stringify(searchParams);
                    return stringifiedQuery !== "{}" ? PAGE_SEGMENT_KEY + "?" + stringifiedQuery : PAGE_SEGMENT_KEY;
                }
                return segment;
            }
            var PAGE_SEGMENT_KEY = "__PAGE__";
            var DEFAULT_SEGMENT_KEY = "__DEFAULT__";
        }
    });

    // node_modules/next/dist/shared/lib/router/utils/app-paths.js
    var require_app_paths = __commonJS({
        "node_modules/next/dist/shared/lib/router/utils/app-paths.js" (exports2) {
            "use strict";
            Object.defineProperty(exports2, "__esModule", {
                value: true
            });

            function _export(target, all) {
                for (var name in all) Object.defineProperty(target, name, {
                    enumerable: true,
                    get: all[name]
                });
            }
            _export(exports2, {
                normalizeAppPath: function() {
                    return normalizeAppPath;
                },
                normalizeRscURL: function() {
                    return normalizeRscURL;
                }
            });
            var _ensureleadingslash = require_ensure_leading_slash();
            var _segment = require_segment();

            function normalizeAppPath(route) {
                return (0, _ensureleadingslash.ensureLeadingSlash)(route.split("/").reduce((pathname, segment, index2, segments) => {
                    if (!segment) {
                        return pathname;
                    }
                    if ((0, _segment.isGroupSegment)(segment)) {
                        return pathname;
                    }
                    if (segment[0] === "@") {
                        return pathname;
                    }
                    if ((segment === "page" || segment === "route") && index2 === segments.length - 1) {
                        return pathname;
                    }
                    return pathname + "/" + segment;
                }, ""));
            }

            function normalizeRscURL(url) {
                return url.replace(
                    /\.rsc($|\?)/,
                    // $1 ensures `?` is preserved
                    "$1"
                );
            }
        }
    });

    // node_modules/next/dist/shared/lib/router/utils/interception-routes.js
    var require_interception_routes = __commonJS({
        "node_modules/next/dist/shared/lib/router/utils/interception-routes.js" (exports2) {
            "use strict";
            Object.defineProperty(exports2, "__esModule", {
                value: true
            });

            function _export(target, all) {
                for (var name in all) Object.defineProperty(target, name, {
                    enumerable: true,
                    get: all[name]
                });
            }
            _export(exports2, {
                INTERCEPTION_ROUTE_MARKERS: function() {
                    return INTERCEPTION_ROUTE_MARKERS;
                },
                extractInterceptionRouteInformation: function() {
                    return extractInterceptionRouteInformation;
                },
                isInterceptionRouteAppPath: function() {
                    return isInterceptionRouteAppPath;
                }
            });
            var _apppaths = require_app_paths();
            var INTERCEPTION_ROUTE_MARKERS = [
                "(..)(..)",
                "(.)",
                "(..)",
                "(...)"
            ];

            function isInterceptionRouteAppPath(path) {
                return path.split("/").find((segment) => INTERCEPTION_ROUTE_MARKERS.find((m) => segment.startsWith(m))) !== void 0;
            }

            function extractInterceptionRouteInformation(path) {
                let interceptingRoute, marker, interceptedRoute;
                for (const segment of path.split("/")) {
                    marker = INTERCEPTION_ROUTE_MARKERS.find((m) => segment.startsWith(m));
                    if (marker) {;
                        [interceptingRoute, interceptedRoute] = path.split(marker, 2);
                        break;
                    }
                }
                if (!interceptingRoute || !marker || !interceptedRoute) {
                    throw Object.defineProperty(new Error("Invalid interception route: " + path + ". Must be in the format /<intercepting route>/(..|...|..)(..)/<intercepted route>"), "__NEXT_ERROR_CODE", {
                        value: "E269",
                        enumerable: false,
                        configurable: true
                    });
                }
                interceptingRoute = (0, _apppaths.normalizeAppPath)(interceptingRoute);
                switch (marker) {
                    case "(.)":
                        if (interceptingRoute === "/") {
                            interceptedRoute = "/" + interceptedRoute;
                        } else {
                            interceptedRoute = interceptingRoute + "/" + interceptedRoute;
                        }
                        break;
                    case "(..)":
                        if (interceptingRoute === "/") {
                            throw Object.defineProperty(new Error("Invalid interception route: " + path + ". Cannot use (..) marker at the root level, use (.) instead."), "__NEXT_ERROR_CODE", {
                                value: "E207",
                                enumerable: false,
                                configurable: true
                            });
                        }
                        interceptedRoute = interceptingRoute.split("/").slice(0, -1).concat(interceptedRoute).join("/");
                        break;
                    case "(...)":
                        interceptedRoute = "/" + interceptedRoute;
                        break;
                    case "(..)(..)":
                        const splitInterceptingRoute = interceptingRoute.split("/");
                        if (splitInterceptingRoute.length <= 2) {
                            throw Object.defineProperty(new Error("Invalid interception route: " + path + ". Cannot use (..)(..) marker at the root level or one level up."), "__NEXT_ERROR_CODE", {
                                value: "E486",
                                enumerable: false,
                                configurable: true
                            });
                        }
                        interceptedRoute = splitInterceptingRoute.slice(0, -2).concat(interceptedRoute).join("/");
                        break;
                    default:
                        throw Object.defineProperty(new Error("Invariant: unexpected marker"), "__NEXT_ERROR_CODE", {
                            value: "E112",
                            enumerable: false,
                            configurable: true
                        });
                }
                return {
                    interceptingRoute,
                    interceptedRoute
                };
            }
        }
    });

    // node_modules/next/dist/shared/lib/router/utils/is-dynamic.js
    var require_is_dynamic = __commonJS({
        "node_modules/next/dist/shared/lib/router/utils/is-dynamic.js" (exports2) {
            "use strict";
            Object.defineProperty(exports2, "__esModule", {
                value: true
            });
            Object.defineProperty(exports2, "isDynamicRoute", {
                enumerable: true,
                get: function() {
                    return isDynamicRoute;
                }
            });
            var _interceptionroutes = require_interception_routes();
            var TEST_ROUTE = /\/[^/]*\[[^/]+\][^/]*(?=\/|$)/;
            var TEST_STRICT_ROUTE = /\/\[[^/]+\](?=\/|$)/;

            function isDynamicRoute(route, strict) {
                if (strict === void 0) strict = true;
                if ((0, _interceptionroutes.isInterceptionRouteAppPath)(route)) {
                    route = (0, _interceptionroutes.extractInterceptionRouteInformation)(route).interceptedRoute;
                }
                if (strict) {
                    return TEST_STRICT_ROUTE.test(route);
                }
                return TEST_ROUTE.test(route);
            }
        }
    });

    // node_modules/next/dist/shared/lib/router/utils/index.js
    var require_utils2 = __commonJS({
        "node_modules/next/dist/shared/lib/router/utils/index.js" (exports2) {
            "use strict";
            Object.defineProperty(exports2, "__esModule", {
                value: true
            });

            function _export(target, all) {
                for (var name in all) Object.defineProperty(target, name, {
                    enumerable: true,
                    get: all[name]
                });
            }
            _export(exports2, {
                getSortedRouteObjects: function() {
                    return _sortedroutes.getSortedRouteObjects;
                },
                getSortedRoutes: function() {
                    return _sortedroutes.getSortedRoutes;
                },
                isDynamicRoute: function() {
                    return _isdynamic.isDynamicRoute;
                }
            });
            var _sortedroutes = require_sorted_routes();
            var _isdynamic = require_is_dynamic();
        }
    });

    // node_modules/next/dist/shared/lib/router/utils/route-matcher.js
    var require_route_matcher = __commonJS({
        "node_modules/next/dist/shared/lib/router/utils/route-matcher.js" (exports2) {
            "use strict";
            Object.defineProperty(exports2, "__esModule", {
                value: true
            });
            Object.defineProperty(exports2, "getRouteMatcher", {
                enumerable: true,
                get: function() {
                    return getRouteMatcher;
                }
            });
            var _utils = require_utils();

            function getRouteMatcher(param) {
                let { re, groups } = param;
                return (pathname) => {
                    const routeMatch = re.exec(pathname);
                    if (!routeMatch) return false;
                    const decode = (param2) => {
                        try {
                            return decodeURIComponent(param2);
                        } catch (e) {
                            throw Object.defineProperty(new _utils.DecodeError("failed to decode param"), "__NEXT_ERROR_CODE", {
                                value: "E528",
                                enumerable: false,
                                configurable: true
                            });
                        }
                    };
                    const params = {};
                    for (const [key, group] of Object.entries(groups)) {
                        const match = routeMatch[group.pos];
                        if (match !== void 0) {
                            if (group.repeat) {
                                params[key] = match.split("/").map((entry) => decode(entry));
                            } else {
                                params[key] = decode(match);
                            }
                        }
                    }
                    return params;
                };
            }
        }
    });

    // node_modules/next/dist/lib/constants.js
    var require_constants = __commonJS({
        "node_modules/next/dist/lib/constants.js" (exports2) {
            "use strict";
            Object.defineProperty(exports2, "__esModule", {
                value: true
            });

            function _export(target, all) {
                for (var name in all) Object.defineProperty(target, name, {
                    enumerable: true,
                    get: all[name]
                });
            }
            _export(exports2, {
                ACTION_SUFFIX: function() {
                    return ACTION_SUFFIX;
                },
                APP_DIR_ALIAS: function() {
                    return APP_DIR_ALIAS;
                },
                CACHE_ONE_YEAR: function() {
                    return CACHE_ONE_YEAR;
                },
                DOT_NEXT_ALIAS: function() {
                    return DOT_NEXT_ALIAS;
                },
                ESLINT_DEFAULT_DIRS: function() {
                    return ESLINT_DEFAULT_DIRS;
                },
                GSP_NO_RETURNED_VALUE: function() {
                    return GSP_NO_RETURNED_VALUE;
                },
                GSSP_COMPONENT_MEMBER_ERROR: function() {
                    return GSSP_COMPONENT_MEMBER_ERROR;
                },
                GSSP_NO_RETURNED_VALUE: function() {
                    return GSSP_NO_RETURNED_VALUE;
                },
                INFINITE_CACHE: function() {
                    return INFINITE_CACHE;
                },
                INSTRUMENTATION_HOOK_FILENAME: function() {
                    return INSTRUMENTATION_HOOK_FILENAME;
                },
                MATCHED_PATH_HEADER: function() {
                    return MATCHED_PATH_HEADER;
                },
                MIDDLEWARE_FILENAME: function() {
                    return MIDDLEWARE_FILENAME;
                },
                MIDDLEWARE_LOCATION_REGEXP: function() {
                    return MIDDLEWARE_LOCATION_REGEXP;
                },
                NEXT_BODY_SUFFIX: function() {
                    return NEXT_BODY_SUFFIX;
                },
                NEXT_CACHE_IMPLICIT_TAG_ID: function() {
                    return NEXT_CACHE_IMPLICIT_TAG_ID;
                },
                NEXT_CACHE_REVALIDATED_TAGS_HEADER: function() {
                    return NEXT_CACHE_REVALIDATED_TAGS_HEADER;
                },
                NEXT_CACHE_REVALIDATE_TAG_TOKEN_HEADER: function() {
                    return NEXT_CACHE_REVALIDATE_TAG_TOKEN_HEADER;
                },
                NEXT_CACHE_SOFT_TAG_MAX_LENGTH: function() {
                    return NEXT_CACHE_SOFT_TAG_MAX_LENGTH;
                },
                NEXT_CACHE_TAGS_HEADER: function() {
                    return NEXT_CACHE_TAGS_HEADER;
                },
                NEXT_CACHE_TAG_MAX_ITEMS: function() {
                    return NEXT_CACHE_TAG_MAX_ITEMS;
                },
                NEXT_CACHE_TAG_MAX_LENGTH: function() {
                    return NEXT_CACHE_TAG_MAX_LENGTH;
                },
                NEXT_DATA_SUFFIX: function() {
                    return NEXT_DATA_SUFFIX;
                },
                NEXT_INTERCEPTION_MARKER_PREFIX: function() {
                    return NEXT_INTERCEPTION_MARKER_PREFIX;
                },
                NEXT_META_SUFFIX: function() {
                    return NEXT_META_SUFFIX;
                },
                NEXT_QUERY_PARAM_PREFIX: function() {
                    return NEXT_QUERY_PARAM_PREFIX;
                },
                NEXT_RESUME_HEADER: function() {
                    return NEXT_RESUME_HEADER;
                },
                NON_STANDARD_NODE_ENV: function() {
                    return NON_STANDARD_NODE_ENV;
                },
                PAGES_DIR_ALIAS: function() {
                    return PAGES_DIR_ALIAS;
                },
                PRERENDER_REVALIDATE_HEADER: function() {
                    return PRERENDER_REVALIDATE_HEADER;
                },
                PRERENDER_REVALIDATE_ONLY_GENERATED_HEADER: function() {
                    return PRERENDER_REVALIDATE_ONLY_GENERATED_HEADER;
                },
                PUBLIC_DIR_MIDDLEWARE_CONFLICT: function() {
                    return PUBLIC_DIR_MIDDLEWARE_CONFLICT;
                },
                ROOT_DIR_ALIAS: function() {
                    return ROOT_DIR_ALIAS;
                },
                RSC_ACTION_CLIENT_WRAPPER_ALIAS: function() {
                    return RSC_ACTION_CLIENT_WRAPPER_ALIAS;
                },
                RSC_ACTION_ENCRYPTION_ALIAS: function() {
                    return RSC_ACTION_ENCRYPTION_ALIAS;
                },
                RSC_ACTION_PROXY_ALIAS: function() {
                    return RSC_ACTION_PROXY_ALIAS;
                },
                RSC_ACTION_VALIDATE_ALIAS: function() {
                    return RSC_ACTION_VALIDATE_ALIAS;
                },
                RSC_CACHE_WRAPPER_ALIAS: function() {
                    return RSC_CACHE_WRAPPER_ALIAS;
                },
                RSC_MOD_REF_PROXY_ALIAS: function() {
                    return RSC_MOD_REF_PROXY_ALIAS;
                },
                RSC_PREFETCH_SUFFIX: function() {
                    return RSC_PREFETCH_SUFFIX;
                },
                RSC_SEGMENTS_DIR_SUFFIX: function() {
                    return RSC_SEGMENTS_DIR_SUFFIX;
                },
                RSC_SEGMENT_SUFFIX: function() {
                    return RSC_SEGMENT_SUFFIX;
                },
                RSC_SUFFIX: function() {
                    return RSC_SUFFIX;
                },
                SERVER_PROPS_EXPORT_ERROR: function() {
                    return SERVER_PROPS_EXPORT_ERROR;
                },
                SERVER_PROPS_GET_INIT_PROPS_CONFLICT: function() {
                    return SERVER_PROPS_GET_INIT_PROPS_CONFLICT;
                },
                SERVER_PROPS_SSG_CONFLICT: function() {
                    return SERVER_PROPS_SSG_CONFLICT;
                },
                SERVER_RUNTIME: function() {
                    return SERVER_RUNTIME;
                },
                SSG_FALLBACK_EXPORT_ERROR: function() {
                    return SSG_FALLBACK_EXPORT_ERROR;
                },
                SSG_GET_INITIAL_PROPS_CONFLICT: function() {
                    return SSG_GET_INITIAL_PROPS_CONFLICT;
                },
                STATIC_STATUS_PAGE_GET_INITIAL_PROPS_ERROR: function() {
                    return STATIC_STATUS_PAGE_GET_INITIAL_PROPS_ERROR;
                },
                UNSTABLE_REVALIDATE_RENAME_ERROR: function() {
                    return UNSTABLE_REVALIDATE_RENAME_ERROR;
                },
                WEBPACK_LAYERS: function() {
                    return WEBPACK_LAYERS;
                },
                WEBPACK_RESOURCE_QUERIES: function() {
                    return WEBPACK_RESOURCE_QUERIES;
                }
            });
            var NEXT_QUERY_PARAM_PREFIX = "nxtP";
            var NEXT_INTERCEPTION_MARKER_PREFIX = "nxtI";
            var MATCHED_PATH_HEADER = "x-matched-path";
            var PRERENDER_REVALIDATE_HEADER = "x-prerender-revalidate";
            var PRERENDER_REVALIDATE_ONLY_GENERATED_HEADER = "x-prerender-revalidate-if-generated";
            var RSC_PREFETCH_SUFFIX = ".prefetch.rsc";
            var RSC_SEGMENTS_DIR_SUFFIX = ".segments";
            var RSC_SEGMENT_SUFFIX = ".segment.rsc";
            var RSC_SUFFIX = ".rsc";
            var ACTION_SUFFIX = ".action";
            var NEXT_DATA_SUFFIX = ".json";
            var NEXT_META_SUFFIX = ".meta";
            var NEXT_BODY_SUFFIX = ".body";
            var NEXT_CACHE_TAGS_HEADER = "x-next-cache-tags";
            var NEXT_CACHE_REVALIDATED_TAGS_HEADER = "x-next-revalidated-tags";
            var NEXT_CACHE_REVALIDATE_TAG_TOKEN_HEADER = "x-next-revalidate-tag-token";
            var NEXT_RESUME_HEADER = "next-resume";
            var NEXT_CACHE_TAG_MAX_ITEMS = 128;
            var NEXT_CACHE_TAG_MAX_LENGTH = 256;
            var NEXT_CACHE_SOFT_TAG_MAX_LENGTH = 1024;
            var NEXT_CACHE_IMPLICIT_TAG_ID = "_N_T_";
            var CACHE_ONE_YEAR = 31536e3;
            var INFINITE_CACHE = 4294967294;
            var MIDDLEWARE_FILENAME = "middleware";
            var MIDDLEWARE_LOCATION_REGEXP = `(?:src/)?${MIDDLEWARE_FILENAME}`;
            var INSTRUMENTATION_HOOK_FILENAME = "instrumentation";
            var PAGES_DIR_ALIAS = "private-next-pages";
            var DOT_NEXT_ALIAS = "private-dot-next";
            var ROOT_DIR_ALIAS = "private-next-root-dir";
            var APP_DIR_ALIAS = "private-next-app-dir";
            var RSC_MOD_REF_PROXY_ALIAS = "private-next-rsc-mod-ref-proxy";
            var RSC_ACTION_VALIDATE_ALIAS = "private-next-rsc-action-validate";
            var RSC_ACTION_PROXY_ALIAS = "private-next-rsc-server-reference";
            var RSC_CACHE_WRAPPER_ALIAS = "private-next-rsc-cache-wrapper";
            var RSC_ACTION_ENCRYPTION_ALIAS = "private-next-rsc-action-encryption";
            var RSC_ACTION_CLIENT_WRAPPER_ALIAS = "private-next-rsc-action-client-wrapper";
            var PUBLIC_DIR_MIDDLEWARE_CONFLICT = `You can not have a '_next' folder inside of your public folder. This conflicts with the internal '/_next' route. https://nextjs.org/docs/messages/public-next-folder-conflict`;
            var SSG_GET_INITIAL_PROPS_CONFLICT = `You can not use getInitialProps with getStaticProps. To use SSG, please remove your getInitialProps`;
            var SERVER_PROPS_GET_INIT_PROPS_CONFLICT = `You can not use getInitialProps with getServerSideProps. Please remove getInitialProps.`;
            var SERVER_PROPS_SSG_CONFLICT = `You can not use getStaticProps or getStaticPaths with getServerSideProps. To use SSG, please remove getServerSideProps`;
            var STATIC_STATUS_PAGE_GET_INITIAL_PROPS_ERROR = `can not have getInitialProps/getServerSideProps, https://nextjs.org/docs/messages/404-get-initial-props`;
            var SERVER_PROPS_EXPORT_ERROR = `pages with \`getServerSideProps\` can not be exported. See more info here: https://nextjs.org/docs/messages/gssp-export`;
            var GSP_NO_RETURNED_VALUE = "Your `getStaticProps` function did not return an object. Did you forget to add a `return`?";
            var GSSP_NO_RETURNED_VALUE = "Your `getServerSideProps` function did not return an object. Did you forget to add a `return`?";
            var UNSTABLE_REVALIDATE_RENAME_ERROR = "The `unstable_revalidate` property is available for general use.\nPlease use `revalidate` instead.";
            var GSSP_COMPONENT_MEMBER_ERROR = `can not be attached to a page's component and must be exported from the page. See more info here: https://nextjs.org/docs/messages/gssp-component-member`;
            var NON_STANDARD_NODE_ENV = `You are using a non-standard "NODE_ENV" value in your environment. This creates inconsistencies in the project and is strongly advised against. Read more: https://nextjs.org/docs/messages/non-standard-node-env`;
            var SSG_FALLBACK_EXPORT_ERROR = `Pages with \`fallback\` enabled in \`getStaticPaths\` can not be exported. See more info here: https://nextjs.org/docs/messages/ssg-fallback-true-export`;
            var ESLINT_DEFAULT_DIRS = [
                "app",
                "pages",
                "components",
                "lib",
                "src"
            ];
            var SERVER_RUNTIME = {
                edge: "edge",
                experimentalEdge: "experimental-edge",
                nodejs: "nodejs"
            };
            var WEBPACK_LAYERS_NAMES = {
                /**
                 * The layer for the shared code between the client and server bundles.
                 */
                shared: "shared",
                /**
                 * The layer for server-only runtime and picking up `react-server` export conditions.
                 * Including app router RSC pages and app router custom routes and metadata routes.
                 */
                reactServerComponents: "rsc",
                /**
                 * Server Side Rendering layer for app (ssr).
                 */
                serverSideRendering: "ssr",
                /**
                 * The browser client bundle layer for actions.
                 */
                actionBrowser: "action-browser",
                /**
                 * The Node.js bundle layer for the API routes.
                 */
                apiNode: "api-node",
                /**
                 * The Edge Lite bundle layer for the API routes.
                 */
                apiEdge: "api-edge",
                /**
                 * The layer for the middleware code.
                 */
                middleware: "middleware",
                /**
                 * The layer for the instrumentation hooks.
                 */
                instrument: "instrument",
                /**
                 * The layer for assets on the edge.
                 */
                edgeAsset: "edge-asset",
                /**
                 * The browser client bundle layer for App directory.
                 */
                appPagesBrowser: "app-pages-browser",
                /**
                 * The browser client bundle layer for Pages directory.
                 */
                pagesDirBrowser: "pages-dir-browser",
                /**
                 * The Edge Lite bundle layer for Pages directory.
                 */
                pagesDirEdge: "pages-dir-edge",
                /**
                 * The Node.js bundle layer for Pages directory.
                 */
                pagesDirNode: "pages-dir-node"
            };
            var WEBPACK_LAYERS = __spreadProps(__spreadValues({}, WEBPACK_LAYERS_NAMES), {
                GROUP: {
                    builtinReact: [
                        WEBPACK_LAYERS_NAMES.reactServerComponents,
                        WEBPACK_LAYERS_NAMES.actionBrowser
                    ],
                    serverOnly: [
                        WEBPACK_LAYERS_NAMES.reactServerComponents,
                        WEBPACK_LAYERS_NAMES.actionBrowser,
                        WEBPACK_LAYERS_NAMES.instrument,
                        WEBPACK_LAYERS_NAMES.middleware
                    ],
                    neutralTarget: [
                        // pages api
                        WEBPACK_LAYERS_NAMES.apiNode,
                        WEBPACK_LAYERS_NAMES.apiEdge
                    ],
                    clientOnly: [
                        WEBPACK_LAYERS_NAMES.serverSideRendering,
                        WEBPACK_LAYERS_NAMES.appPagesBrowser
                    ],
                    bundled: [
                        WEBPACK_LAYERS_NAMES.reactServerComponents,
                        WEBPACK_LAYERS_NAMES.actionBrowser,
                        WEBPACK_LAYERS_NAMES.serverSideRendering,
                        WEBPACK_LAYERS_NAMES.appPagesBrowser,
                        WEBPACK_LAYERS_NAMES.shared,
                        WEBPACK_LAYERS_NAMES.instrument,
                        WEBPACK_LAYERS_NAMES.middleware
                    ],
                    appPages: [
                        // app router pages and layouts
                        WEBPACK_LAYERS_NAMES.reactServerComponents,
                        WEBPACK_LAYERS_NAMES.serverSideRendering,
                        WEBPACK_LAYERS_NAMES.appPagesBrowser,
                        WEBPACK_LAYERS_NAMES.actionBrowser
                    ]
                }
            });
            var WEBPACK_RESOURCE_QUERIES = {
                edgeSSREntry: "__next_edge_ssr_entry__",
                metadata: "__next_metadata__",
                metadataRoute: "__next_metadata_route__",
                metadataImageMeta: "__next_metadata_image_meta__"
            };
        }
    });

    // node_modules/next/dist/shared/lib/escape-regexp.js
    var require_escape_regexp = __commonJS({
        "node_modules/next/dist/shared/lib/escape-regexp.js" (exports2) {
            "use strict";
            Object.defineProperty(exports2, "__esModule", {
                value: true
            });
            Object.defineProperty(exports2, "escapeStringRegexp", {
                enumerable: true,
                get: function() {
                    return escapeStringRegexp;
                }
            });
            var reHasRegExp = /[|\\{}()[\]^$+*?.-]/;
            var reReplaceRegExp = /[|\\{}()[\]^$+*?.-]/g;

            function escapeStringRegexp(str) {
                if (reHasRegExp.test(str)) {
                    return str.replace(reReplaceRegExp, "\\$&");
                }
                return str;
            }
        }
    });

    // node_modules/next/dist/shared/lib/router/utils/route-regex.js
    var require_route_regex = __commonJS({
        "node_modules/next/dist/shared/lib/router/utils/route-regex.js" (exports2) {
            "use strict";
            Object.defineProperty(exports2, "__esModule", {
                value: true
            });

            function _export(target, all) {
                for (var name in all) Object.defineProperty(target, name, {
                    enumerable: true,
                    get: all[name]
                });
            }
            _export(exports2, {
                getNamedMiddlewareRegex: function() {
                    return getNamedMiddlewareRegex;
                },
                getNamedRouteRegex: function() {
                    return getNamedRouteRegex;
                },
                getRouteRegex: function() {
                    return getRouteRegex;
                },
                parseParameter: function() {
                    return parseParameter;
                }
            });
            var _constants = require_constants();
            var _interceptionroutes = require_interception_routes();
            var _escaperegexp = require_escape_regexp();
            var _removetrailingslash = require_remove_trailing_slash();
            var PARAMETER_PATTERN = /^([^[]*)\[((?:\[[^\]]*\])|[^\]]+)\](.*)$/;

            function parseParameter(param) {
                const match = param.match(PARAMETER_PATTERN);
                if (!match) {
                    return parseMatchedParameter(param);
                }
                return parseMatchedParameter(match[2]);
            }

            function parseMatchedParameter(param) {
                const optional = param.startsWith("[") && param.endsWith("]");
                if (optional) {
                    param = param.slice(1, -1);
                }
                const repeat = param.startsWith("...");
                if (repeat) {
                    param = param.slice(3);
                }
                return {
                    key: param,
                    repeat,
                    optional
                };
            }

            function getParametrizedRoute(route, includeSuffix, includePrefix) {
                const groups = {};
                let groupIndex = 1;
                const segments = [];
                for (const segment of(0, _removetrailingslash.removeTrailingSlash)(route).slice(1).split("/")) {
                    const markerMatch = _interceptionroutes.INTERCEPTION_ROUTE_MARKERS.find((m) => segment.startsWith(m));
                    const paramMatches = segment.match(PARAMETER_PATTERN);
                    if (markerMatch && paramMatches && paramMatches[2]) {
                        const { key, optional, repeat } = parseMatchedParameter(paramMatches[2]);
                        groups[key] = {
                            pos: groupIndex++,
                            repeat,
                            optional
                        };
                        segments.push("/" + (0, _escaperegexp.escapeStringRegexp)(markerMatch) + "([^/]+?)");
                    } else if (paramMatches && paramMatches[2]) {
                        const { key, repeat, optional } = parseMatchedParameter(paramMatches[2]);
                        groups[key] = {
                            pos: groupIndex++,
                            repeat,
                            optional
                        };
                        if (includePrefix && paramMatches[1]) {
                            segments.push("/" + (0, _escaperegexp.escapeStringRegexp)(paramMatches[1]));
                        }
                        let s = repeat ? optional ? "(?:/(.+?))?" : "/(.+?)" : "/([^/]+?)";
                        if (includePrefix && paramMatches[1]) {
                            s = s.substring(1);
                        }
                        segments.push(s);
                    } else {
                        segments.push("/" + (0, _escaperegexp.escapeStringRegexp)(segment));
                    }
                    if (includeSuffix && paramMatches && paramMatches[3]) {
                        segments.push((0, _escaperegexp.escapeStringRegexp)(paramMatches[3]));
                    }
                }
                return {
                    parameterizedRoute: segments.join(""),
                    groups
                };
            }

            function getRouteRegex(normalizedRoute, param) {
                let { includeSuffix = false, includePrefix = false, excludeOptionalTrailingSlash = false } = param === void 0 ? {} : param;
                const { parameterizedRoute, groups } = getParametrizedRoute(normalizedRoute, includeSuffix, includePrefix);
                let re = parameterizedRoute;
                if (!excludeOptionalTrailingSlash) {
                    re += "(?:/)?";
                }
                return {
                    re: new RegExp("^" + re + "$"),
                    groups
                };
            }

            function buildGetSafeRouteKey() {
                let i = 0;
                return () => {
                    let routeKey = "";
                    let j = ++i;
                    while (j > 0) {
                        routeKey += String.fromCharCode(97 + (j - 1) % 26);
                        j = Math.floor((j - 1) / 26);
                    }
                    return routeKey;
                };
            }

            function getSafeKeyFromSegment(param) {
                let { interceptionMarker, getSafeRouteKey, segment, routeKeys, keyPrefix, backreferenceDuplicateKeys } = param;
                const { key, optional, repeat } = parseMatchedParameter(segment);
                let cleanedKey = key.replace(/\W/g, "");
                if (keyPrefix) {
                    cleanedKey = "" + keyPrefix + cleanedKey;
                }
                let invalidKey = false;
                if (cleanedKey.length === 0 || cleanedKey.length > 30) {
                    invalidKey = true;
                }
                if (!isNaN(parseInt(cleanedKey.slice(0, 1)))) {
                    invalidKey = true;
                }
                if (invalidKey) {
                    cleanedKey = getSafeRouteKey();
                }
                const duplicateKey = cleanedKey in routeKeys;
                if (keyPrefix) {
                    routeKeys[cleanedKey] = "" + keyPrefix + key;
                } else {
                    routeKeys[cleanedKey] = key;
                }
                const interceptionPrefix = interceptionMarker ? (0, _escaperegexp.escapeStringRegexp)(interceptionMarker) : "";
                let pattern;
                if (duplicateKey && backreferenceDuplicateKeys) {
                    pattern = "\\k<" + cleanedKey + ">";
                } else if (repeat) {
                    pattern = "(?<" + cleanedKey + ">.+?)";
                } else {
                    pattern = "(?<" + cleanedKey + ">[^/]+?)";
                }
                return optional ? "(?:/" + interceptionPrefix + pattern + ")?" : "/" + interceptionPrefix + pattern;
            }

            function getNamedParametrizedRoute(route, prefixRouteKeys, includeSuffix, includePrefix, backreferenceDuplicateKeys) {
                const getSafeRouteKey = buildGetSafeRouteKey();
                const routeKeys = {};
                const segments = [];
                for (const segment of(0, _removetrailingslash.removeTrailingSlash)(route).slice(1).split("/")) {
                    const hasInterceptionMarker = _interceptionroutes.INTERCEPTION_ROUTE_MARKERS.some((m) => segment.startsWith(m));
                    const paramMatches = segment.match(PARAMETER_PATTERN);
                    if (hasInterceptionMarker && paramMatches && paramMatches[2]) {
                        segments.push(getSafeKeyFromSegment({
                            getSafeRouteKey,
                            interceptionMarker: paramMatches[1],
                            segment: paramMatches[2],
                            routeKeys,
                            keyPrefix: prefixRouteKeys ? _constants.NEXT_INTERCEPTION_MARKER_PREFIX : void 0,
                            backreferenceDuplicateKeys
                        }));
                    } else if (paramMatches && paramMatches[2]) {
                        if (includePrefix && paramMatches[1]) {
                            segments.push("/" + (0, _escaperegexp.escapeStringRegexp)(paramMatches[1]));
                        }
                        let s = getSafeKeyFromSegment({
                            getSafeRouteKey,
                            segment: paramMatches[2],
                            routeKeys,
                            keyPrefix: prefixRouteKeys ? _constants.NEXT_QUERY_PARAM_PREFIX : void 0,
                            backreferenceDuplicateKeys
                        });
                        if (includePrefix && paramMatches[1]) {
                            s = s.substring(1);
                        }
                        segments.push(s);
                    } else {
                        segments.push("/" + (0, _escaperegexp.escapeStringRegexp)(segment));
                    }
                    if (includeSuffix && paramMatches && paramMatches[3]) {
                        segments.push((0, _escaperegexp.escapeStringRegexp)(paramMatches[3]));
                    }
                }
                return {
                    namedParameterizedRoute: segments.join(""),
                    routeKeys
                };
            }

            function getNamedRouteRegex(normalizedRoute, options) {
                var _options_includeSuffix, _options_includePrefix, _options_backreferenceDuplicateKeys;
                const result = getNamedParametrizedRoute(normalizedRoute, options.prefixRouteKeys, (_options_includeSuffix = options.includeSuffix) != null ? _options_includeSuffix : false, (_options_includePrefix = options.includePrefix) != null ? _options_includePrefix : false, (_options_backreferenceDuplicateKeys = options.backreferenceDuplicateKeys) != null ? _options_backreferenceDuplicateKeys : false);
                let namedRegex = result.namedParameterizedRoute;
                if (!options.excludeOptionalTrailingSlash) {
                    namedRegex += "(?:/)?";
                }
                return __spreadProps(__spreadValues({}, getRouteRegex(normalizedRoute, options)), {
                    namedRegex: "^" + namedRegex + "$",
                    routeKeys: result.routeKeys
                });
            }

            function getNamedMiddlewareRegex(normalizedRoute, options) {
                const { parameterizedRoute } = getParametrizedRoute(normalizedRoute, false, false);
                const { catchAll = true } = options;
                if (parameterizedRoute === "/") {
                    let catchAllRegex = catchAll ? ".*" : "";
                    return {
                        namedRegex: "^/" + catchAllRegex + "$"
                    };
                }
                const { namedParameterizedRoute } = getNamedParametrizedRoute(normalizedRoute, false, false, false, false);
                let catchAllGroupedRegex = catchAll ? "(?:(/.*)?)" : "";
                return {
                    namedRegex: "^" + namedParameterizedRoute + catchAllGroupedRegex + "$"
                };
            }
        }
    });

    // node_modules/next/dist/shared/lib/router/utils/interpolate-as.js
    var require_interpolate_as = __commonJS({
        "node_modules/next/dist/shared/lib/router/utils/interpolate-as.js" (exports2) {
            "use strict";
            Object.defineProperty(exports2, "__esModule", {
                value: true
            });
            Object.defineProperty(exports2, "interpolateAs", {
                enumerable: true,
                get: function() {
                    return interpolateAs;
                }
            });
            var _routematcher = require_route_matcher();
            var _routeregex = require_route_regex();

            function interpolateAs(route, asPathname, query) {
                let interpolatedRoute = "";
                const dynamicRegex = (0, _routeregex.getRouteRegex)(route);
                const dynamicGroups = dynamicRegex.groups;
                const dynamicMatches = (
                    // Try to match the dynamic route against the asPath
                    (asPathname !== route ? (0, _routematcher.getRouteMatcher)(dynamicRegex)(asPathname) : "") || // Fall back to reading the values from the href
                    // TODO: should this take priority; also need to change in the router.
                    query
                );
                interpolatedRoute = route;
                const params = Object.keys(dynamicGroups);
                if (!params.every((param) => {
                        let value = dynamicMatches[param] || "";
                        const { repeat, optional } = dynamicGroups[param];
                        let replaced = "[" + (repeat ? "..." : "") + param + "]";
                        if (optional) {
                            replaced = (!value ? "/" : "") + "[" + replaced + "]";
                        }
                        if (repeat && !Array.isArray(value)) value = [
                            value
                        ];
                        return (optional || param in dynamicMatches) && // Interpolate group into data URL if present
                            (interpolatedRoute = interpolatedRoute.replace(replaced, repeat ? value.map(
                                // these values should be fully encoded instead of just
                                // path delimiter escaped since they are being inserted
                                // into the URL and we expect URL encoded segments
                                // when parsing dynamic route params
                                (segment) => encodeURIComponent(segment)
                            ).join("/") : encodeURIComponent(value)) || "/");
                    })) {
                    interpolatedRoute = "";
                }
                return {
                    params,
                    result: interpolatedRoute
                };
            }
        }
    });

    // node_modules/next/dist/client/resolve-href.js
    var require_resolve_href = __commonJS({
        "node_modules/next/dist/client/resolve-href.js" (exports2, module2) {
            "use strict";
            Object.defineProperty(exports2, "__esModule", {
                value: true
            });
            Object.defineProperty(exports2, "resolveHref", {
                enumerable: true,
                get: function() {
                    return resolveHref;
                }
            });
            var _querystring = require_querystring();
            var _formaturl = require_format_url();
            var _omit = require_omit();
            var _utils = require_utils();
            var _normalizetrailingslash = require_normalize_trailing_slash();
            var _islocalurl = require_is_local_url();
            var _utils1 = require_utils2();
            var _interpolateas = require_interpolate_as();

            function resolveHref(router, href, resolveAs) {
                let base;
                let urlAsString = typeof href === "string" ? href : (0, _formaturl.formatWithValidation)(href);
                const urlProtoMatch = urlAsString.match(/^[a-zA-Z]{1,}:\/\//);
                const urlAsStringNoProto = urlProtoMatch ? urlAsString.slice(urlProtoMatch[0].length) : urlAsString;
                const urlParts = urlAsStringNoProto.split("?", 1);
                if ((urlParts[0] || "").match(/(\/\/|\\)/)) {
                    console.error("Invalid href '" + urlAsString + "' passed to next/router in page: '" + router.pathname + "'. Repeated forward-slashes (//) or backslashes \\ are not valid in the href.");
                    const normalizedUrl = (0, _utils.normalizeRepeatedSlashes)(urlAsStringNoProto);
                    urlAsString = (urlProtoMatch ? urlProtoMatch[0] : "") + normalizedUrl;
                }
                if (!(0, _islocalurl.isLocalURL)(urlAsString)) {
                    return resolveAs ? [
                        urlAsString
                    ] : urlAsString;
                }
                try {
                    base = new URL(urlAsString.startsWith("#") ? router.asPath : router.pathname, "http://n");
                } catch (_) {
                    base = new URL("/", "http://n");
                }
                try {
                    const finalUrl = new URL(urlAsString, base);
                    finalUrl.pathname = (0, _normalizetrailingslash.normalizePathTrailingSlash)(finalUrl.pathname);
                    let interpolatedAs = "";
                    if ((0, _utils1.isDynamicRoute)(finalUrl.pathname) && finalUrl.searchParams && resolveAs) {
                        const query = (0, _querystring.searchParamsToUrlQuery)(finalUrl.searchParams);
                        const { result, params } = (0, _interpolateas.interpolateAs)(finalUrl.pathname, finalUrl.pathname, query);
                        if (result) {
                            interpolatedAs = (0, _formaturl.formatWithValidation)({
                                pathname: result,
                                hash: finalUrl.hash,
                                query: (0, _omit.omit)(query, params)
                            });
                        }
                    }
                    const resolvedHref = finalUrl.origin === base.origin ? finalUrl.href.slice(finalUrl.origin.length) : finalUrl.href;
                    return resolveAs ? [
                        resolvedHref,
                        interpolatedAs || resolvedHref
                    ] : resolvedHref;
                } catch (_) {
                    return resolveAs ? [
                        urlAsString
                    ] : urlAsString;
                }
            }
            if ((typeof exports2.default === "function" || typeof exports2.default === "object" && exports2.default !== null) && typeof exports2.default.__esModule === "undefined") {
                Object.defineProperty(exports2.default, "__esModule", { value: true });
                Object.assign(exports2.default, exports2);
                module2.exports = exports2.default;
            }
        }
    });

    // node_modules/next/dist/shared/lib/router/utils/add-path-prefix.js
    var require_add_path_prefix = __commonJS({
        "node_modules/next/dist/shared/lib/router/utils/add-path-prefix.js" (exports2) {
            "use strict";
            Object.defineProperty(exports2, "__esModule", {
                value: true
            });
            Object.defineProperty(exports2, "addPathPrefix", {
                enumerable: true,
                get: function() {
                    return addPathPrefix;
                }
            });
            var _parsepath = require_parse_path();

            function addPathPrefix(path, prefix) {
                if (!path.startsWith("/") || !prefix) {
                    return path;
                }
                const { pathname, query, hash } = (0, _parsepath.parsePath)(path);
                return "" + prefix + pathname + query + hash;
            }
        }
    });

    // node_modules/next/dist/shared/lib/router/utils/add-locale.js
    var require_add_locale = __commonJS({
        "node_modules/next/dist/shared/lib/router/utils/add-locale.js" (exports2) {
            "use strict";
            Object.defineProperty(exports2, "__esModule", {
                value: true
            });
            Object.defineProperty(exports2, "addLocale", {
                enumerable: true,
                get: function() {
                    return addLocale;
                }
            });
            var _addpathprefix = require_add_path_prefix();
            var _pathhasprefix = require_path_has_prefix();

            function addLocale(path, locale, defaultLocale, ignorePrefix) {
                if (!locale || locale === defaultLocale) return path;
                const lower = path.toLowerCase();
                if (!ignorePrefix) {
                    if ((0, _pathhasprefix.pathHasPrefix)(lower, "/api")) return path;
                    if ((0, _pathhasprefix.pathHasPrefix)(lower, "/" + locale.toLowerCase())) return path;
                }
                return (0, _addpathprefix.addPathPrefix)(path, "/" + locale);
            }
        }
    });

    // node_modules/next/dist/client/add-locale.js
    var require_add_locale2 = __commonJS({
        "node_modules/next/dist/client/add-locale.js" (exports2, module2) {
            "use strict";
            Object.defineProperty(exports2, "__esModule", {
                value: true
            });
            Object.defineProperty(exports2, "addLocale", {
                enumerable: true,
                get: function() {
                    return addLocale;
                }
            });
            var _normalizetrailingslash = require_normalize_trailing_slash();
            var addLocale = function(path) {
                for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                    args[_key - 1] = arguments[_key];
                }
                if (process.env.__NEXT_I18N_SUPPORT) {
                    return (0, _normalizetrailingslash.normalizePathTrailingSlash)(require_add_locale().addLocale(path, ...args));
                }
                return path;
            };
            if ((typeof exports2.default === "function" || typeof exports2.default === "object" && exports2.default !== null) && typeof exports2.default.__esModule === "undefined") {
                Object.defineProperty(exports2.default, "__esModule", { value: true });
                Object.assign(exports2.default, exports2);
                module2.exports = exports2.default;
            }
        }
    });

    // node_modules/next/dist/client/request-idle-callback.js
    var require_request_idle_callback = __commonJS({
        "node_modules/next/dist/client/request-idle-callback.js" (exports2, module2) {
            "use strict";
            Object.defineProperty(exports2, "__esModule", {
                value: true
            });

            function _export(target, all) {
                for (var name in all) Object.defineProperty(target, name, {
                    enumerable: true,
                    get: all[name]
                });
            }
            _export(exports2, {
                cancelIdleCallback: function() {
                    return cancelIdleCallback;
                },
                requestIdleCallback: function() {
                    return requestIdleCallback;
                }
            });
            var requestIdleCallback = typeof self !== "undefined" && self.requestIdleCallback && self.requestIdleCallback.bind(window) || function(cb) {
                let start = Date.now();
                return self.setTimeout(function() {
                    cb({
                        didTimeout: false,
                        timeRemaining: function() {
                            return Math.max(0, 50 - (Date.now() - start));
                        }
                    });
                }, 1);
            };
            var cancelIdleCallback = typeof self !== "undefined" && self.cancelIdleCallback && self.cancelIdleCallback.bind(window) || function(id) {
                return clearTimeout(id);
            };
            if ((typeof exports2.default === "function" || typeof exports2.default === "object" && exports2.default !== null) && typeof exports2.default.__esModule === "undefined") {
                Object.defineProperty(exports2.default, "__esModule", { value: true });
                Object.assign(exports2.default, exports2);
                module2.exports = exports2.default;
            }
        }
    });

    // node_modules/next/dist/client/use-intersection.js
    var require_use_intersection = __commonJS({
        "node_modules/next/dist/client/use-intersection.js" (exports2, module2) {
            "use strict";
            Object.defineProperty(exports2, "__esModule", {
                value: true
            });
            Object.defineProperty(exports2, "useIntersection", {
                enumerable: true,
                get: function() {
                    return useIntersection;
                }
            });
            var _react = require("react");
            var _requestidlecallback = require_request_idle_callback();
            var hasIntersectionObserver = typeof IntersectionObserver === "function";
            var observers = /* @__PURE__ */ new Map();
            var idList = [];

            function createObserver(options) {
                const id = {
                    root: options.root || null,
                    margin: options.rootMargin || ""
                };
                const existing = idList.find((obj) => obj.root === id.root && obj.margin === id.margin);
                let instance;
                if (existing) {
                    instance = observers.get(existing);
                    if (instance) {
                        return instance;
                    }
                }
                const elements = /* @__PURE__ */ new Map();
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach((entry) => {
                        const callback = elements.get(entry.target);
                        const isVisible = entry.isIntersecting || entry.intersectionRatio > 0;
                        if (callback && isVisible) {
                            callback(isVisible);
                        }
                    });
                }, options);
                instance = {
                    id,
                    observer,
                    elements
                };
                idList.push(id);
                observers.set(id, instance);
                return instance;
            }

            function observe(element, callback, options) {
                const { id, observer, elements } = createObserver(options);
                elements.set(element, callback);
                observer.observe(element);
                return function unobserve() {
                    elements.delete(element);
                    observer.unobserve(element);
                    if (elements.size === 0) {
                        observer.disconnect();
                        observers.delete(id);
                        const index2 = idList.findIndex((obj) => obj.root === id.root && obj.margin === id.margin);
                        if (index2 > -1) {
                            idList.splice(index2, 1);
                        }
                    }
                };
            }

            function useIntersection(param) {
                let { rootRef, rootMargin, disabled } = param;
                const isDisabled = disabled || !hasIntersectionObserver;
                const [visible, setVisible] = (0, _react.useState)(false);
                const elementRef = (0, _react.useRef)(null);
                const setElement = (0, _react.useCallback)((element) => {
                    elementRef.current = element;
                }, []);
                (0, _react.useEffect)(() => {
                    if (hasIntersectionObserver) {
                        if (isDisabled || visible) return;
                        const element = elementRef.current;
                        if (element && element.tagName) {
                            const unobserve = observe(element, (isVisible) => isVisible && setVisible(isVisible), {
                                root: rootRef == null ? void 0 : rootRef.current,
                                rootMargin
                            });
                            return unobserve;
                        }
                    } else {
                        if (!visible) {
                            const idleCallback = (0, _requestidlecallback.requestIdleCallback)(() => setVisible(true));
                            return () => (0, _requestidlecallback.cancelIdleCallback)(idleCallback);
                        }
                    }
                }, [
                    isDisabled,
                    rootMargin,
                    rootRef,
                    visible,
                    elementRef.current
                ]);
                const resetVisible = (0, _react.useCallback)(() => {
                    setVisible(false);
                }, []);
                return [
                    setElement,
                    visible,
                    resetVisible
                ];
            }
            if ((typeof exports2.default === "function" || typeof exports2.default === "object" && exports2.default !== null) && typeof exports2.default.__esModule === "undefined") {
                Object.defineProperty(exports2.default, "__esModule", { value: true });
                Object.assign(exports2.default, exports2);
                module2.exports = exports2.default;
            }
        }
    });

    // node_modules/next/dist/shared/lib/i18n/normalize-locale-path.js
    var require_normalize_locale_path = __commonJS({
        "node_modules/next/dist/shared/lib/i18n/normalize-locale-path.js" (exports2) {
            "use strict";
            Object.defineProperty(exports2, "__esModule", {
                value: true
            });
            Object.defineProperty(exports2, "normalizeLocalePath", {
                enumerable: true,
                get: function() {
                    return normalizeLocalePath;
                }
            });
            var cache = /* @__PURE__ */ new WeakMap();

            function normalizeLocalePath(pathname, locales) {
                if (!locales) return {
                    pathname
                };
                let lowercasedLocales = cache.get(locales);
                if (!lowercasedLocales) {
                    lowercasedLocales = locales.map((locale) => locale.toLowerCase());
                    cache.set(locales, lowercasedLocales);
                }
                let detectedLocale;
                const segments = pathname.split("/", 2);
                if (!segments[1]) return {
                    pathname
                };
                const segment = segments[1].toLowerCase();
                const index2 = lowercasedLocales.indexOf(segment);
                if (index2 < 0) return {
                    pathname
                };
                detectedLocale = locales[index2];
                pathname = pathname.slice(detectedLocale.length + 1) || "/";
                return {
                    pathname,
                    detectedLocale
                };
            }
        }
    });

    // node_modules/next/dist/client/normalize-locale-path.js
    var require_normalize_locale_path2 = __commonJS({
        "node_modules/next/dist/client/normalize-locale-path.js" (exports2, module2) {
            "use strict";
            Object.defineProperty(exports2, "__esModule", {
                value: true
            });
            Object.defineProperty(exports2, "normalizeLocalePath", {
                enumerable: true,
                get: function() {
                    return normalizeLocalePath;
                }
            });
            var normalizeLocalePath = (pathname, locales) => {
                if (process.env.__NEXT_I18N_SUPPORT) {
                    return require_normalize_locale_path().normalizeLocalePath(pathname, locales);
                }
                return {
                    pathname,
                    detectedLocale: void 0
                };
            };
            if ((typeof exports2.default === "function" || typeof exports2.default === "object" && exports2.default !== null) && typeof exports2.default.__esModule === "undefined") {
                Object.defineProperty(exports2.default, "__esModule", { value: true });
                Object.assign(exports2.default, exports2);
                module2.exports = exports2.default;
            }
        }
    });

    // node_modules/next/dist/shared/lib/i18n/detect-domain-locale.js
    var require_detect_domain_locale = __commonJS({
        "node_modules/next/dist/shared/lib/i18n/detect-domain-locale.js" (exports2) {
            "use strict";
            Object.defineProperty(exports2, "__esModule", {
                value: true
            });
            Object.defineProperty(exports2, "detectDomainLocale", {
                enumerable: true,
                get: function() {
                    return detectDomainLocale;
                }
            });

            function detectDomainLocale(domainItems, hostname, detectedLocale) {
                if (!domainItems) return;
                if (detectedLocale) {
                    detectedLocale = detectedLocale.toLowerCase();
                }
                for (const item of domainItems) {
                    var _item_domain, _item_locales;
                    const domainHostname = (_item_domain = item.domain) == null ? void 0 : _item_domain.split(":", 1)[0].toLowerCase();
                    if (hostname === domainHostname || detectedLocale === item.defaultLocale.toLowerCase() || ((_item_locales = item.locales) == null ? void 0 : _item_locales.some((locale) => locale.toLowerCase() === detectedLocale))) {
                        return item;
                    }
                }
            }
        }
    });

    // node_modules/next/dist/client/detect-domain-locale.js
    var require_detect_domain_locale2 = __commonJS({
        "node_modules/next/dist/client/detect-domain-locale.js" (exports2, module2) {
            "use strict";
            Object.defineProperty(exports2, "__esModule", {
                value: true
            });
            Object.defineProperty(exports2, "detectDomainLocale", {
                enumerable: true,
                get: function() {
                    return detectDomainLocale;
                }
            });
            var detectDomainLocale = function() {
                for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                    args[_key] = arguments[_key];
                }
                if (process.env.__NEXT_I18N_SUPPORT) {
                    return require_detect_domain_locale().detectDomainLocale(...args);
                }
            };
            if ((typeof exports2.default === "function" || typeof exports2.default === "object" && exports2.default !== null) && typeof exports2.default.__esModule === "undefined") {
                Object.defineProperty(exports2.default, "__esModule", { value: true });
                Object.assign(exports2.default, exports2);
                module2.exports = exports2.default;
            }
        }
    });

    // node_modules/next/dist/client/get-domain-locale.js
    var require_get_domain_locale = __commonJS({
        "node_modules/next/dist/client/get-domain-locale.js" (exports2, module2) {
            "use strict";
            Object.defineProperty(exports2, "__esModule", {
                value: true
            });
            Object.defineProperty(exports2, "getDomainLocale", {
                enumerable: true,
                get: function() {
                    return getDomainLocale;
                }
            });
            var _normalizetrailingslash = require_normalize_trailing_slash();
            var basePath = process.env.__NEXT_ROUTER_BASEPATH || "";

            function getDomainLocale(path, locale, locales, domainLocales) {
                if (process.env.__NEXT_I18N_SUPPORT) {
                    const normalizeLocalePath = require_normalize_locale_path2().normalizeLocalePath;
                    const detectDomainLocale = require_detect_domain_locale2().detectDomainLocale;
                    const target = locale || normalizeLocalePath(path, locales).detectedLocale;
                    const domain = detectDomainLocale(domainLocales, void 0, target);
                    if (domain) {
                        const proto = "http" + (domain.http ? "" : "s") + "://";
                        const finalLocale = target === domain.defaultLocale ? "" : "/" + target;
                        return "" + proto + domain.domain + (0, _normalizetrailingslash.normalizePathTrailingSlash)("" + basePath + finalLocale + path);
                    }
                    return false;
                } else {
                    return false;
                }
            }
            if ((typeof exports2.default === "function" || typeof exports2.default === "object" && exports2.default !== null) && typeof exports2.default.__esModule === "undefined") {
                Object.defineProperty(exports2.default, "__esModule", { value: true });
                Object.assign(exports2.default, exports2);
                module2.exports = exports2.default;
            }
        }
    });

    // node_modules/next/dist/client/add-base-path.js
    var require_add_base_path = __commonJS({
        "node_modules/next/dist/client/add-base-path.js" (exports2, module2) {
            "use strict";
            Object.defineProperty(exports2, "__esModule", {
                value: true
            });
            Object.defineProperty(exports2, "addBasePath", {
                enumerable: true,
                get: function() {
                    return addBasePath;
                }
            });
            var _addpathprefix = require_add_path_prefix();
            var _normalizetrailingslash = require_normalize_trailing_slash();
            var basePath = process.env.__NEXT_ROUTER_BASEPATH || "";

            function addBasePath(path, required) {
                return (0, _normalizetrailingslash.normalizePathTrailingSlash)(process.env.__NEXT_MANUAL_CLIENT_BASE_PATH && !required ? path : (0, _addpathprefix.addPathPrefix)(path, basePath));
            }
            if ((typeof exports2.default === "function" || typeof exports2.default === "object" && exports2.default !== null) && typeof exports2.default.__esModule === "undefined") {
                Object.defineProperty(exports2.default, "__esModule", { value: true });
                Object.assign(exports2.default, exports2);
                module2.exports = exports2.default;
            }
        }
    });

    // node_modules/next/dist/shared/lib/utils/error-once.js
    var require_error_once = __commonJS({
        "node_modules/next/dist/shared/lib/utils/error-once.js" (exports2) {
            "use strict";
            Object.defineProperty(exports2, "__esModule", {
                value: true
            });
            Object.defineProperty(exports2, "errorOnce", {
                enumerable: true,
                get: function() {
                    return errorOnce;
                }
            });
            var errorOnce = (_) => {};
            if (process.env.NODE_ENV !== "production") {
                const errors = /* @__PURE__ */ new Set();
                errorOnce = (msg) => {
                    if (!errors.has(msg)) {
                        console.error(msg);
                    }
                    errors.add(msg);
                };
            }
        }
    });

    // node_modules/next/dist/client/link.js
    var require_link = __commonJS({
        "node_modules/next/dist/client/link.js" (exports2, module2) {
            "use strict";
            "use client";
            Object.defineProperty(exports2, "__esModule", {
                value: true
            });

            function _export(target, all) {
                for (var name in all) Object.defineProperty(target, name, {
                    enumerable: true,
                    get: all[name]
                });
            }
            _export(exports2, {
                default: function() {
                    return _default;
                },
                useLinkStatus: function() {
                    return useLinkStatus;
                }
            });
            var _interop_require_wildcard = require_interop_require_wildcard();
            var _jsxruntime = require("react/jsx-runtime");
            var _react = /* @__PURE__ */ _interop_require_wildcard._(require("react"));
            var _resolvehref = require_resolve_href();
            var _islocalurl = require_is_local_url();
            var _formaturl = require_format_url();
            var _utils = require_utils();
            var _addlocale = require_add_locale2();
            var _routercontextsharedruntime = require_router_context_shared_runtime();
            var _useintersection = require_use_intersection();
            var _getdomainlocale = require_get_domain_locale();
            var _addbasepath = require_add_base_path();
            var _usemergedref = require_use_merged_ref();
            var _erroronce = require_error_once();
            var prefetched = /* @__PURE__ */ new Set();

            function prefetch(router, href, as, options) {
                if (typeof window === "undefined") {
                    return;
                }
                if (!(0, _islocalurl.isLocalURL)(href)) {
                    return;
                }
                if (!options.bypassPrefetchedCheck) {
                    const locale = (
                        // Let the link's locale prop override the default router locale.
                        typeof options.locale !== "undefined" ? options.locale : "locale" in router ? router.locale : void 0
                    );
                    const prefetchedKey = href + "%" + as + "%" + locale;
                    if (prefetched.has(prefetchedKey)) {
                        return;
                    }
                    prefetched.add(prefetchedKey);
                }
                router.prefetch(href, as, options).catch((err) => {
                    if (process.env.NODE_ENV !== "production") {
                        throw err;
                    }
                });
            }

            function isModifiedEvent(event) {
                const eventTarget = event.currentTarget;
                const target = eventTarget.getAttribute("target");
                return target && target !== "_self" || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || // triggers resource download
                    event.nativeEvent && event.nativeEvent.which === 2;
            }

            function linkClicked(e, router, href, as, replace, shallow, scroll, locale, onNavigate) {
                const { nodeName } = e.currentTarget;
                const isAnchorNodeName = nodeName.toUpperCase() === "A";
                if (isAnchorNodeName && isModifiedEvent(e) || e.currentTarget.hasAttribute("download")) {
                    return;
                }
                if (!(0, _islocalurl.isLocalURL)(href)) {
                    if (replace) {
                        e.preventDefault();
                        location.replace(href);
                    }
                    return;
                }
                e.preventDefault();
                const navigate = () => {
                    if (onNavigate) {
                        let isDefaultPrevented = false;
                        onNavigate({
                            preventDefault: () => {
                                isDefaultPrevented = true;
                            }
                        });
                        if (isDefaultPrevented) {
                            return;
                        }
                    }
                    const routerScroll = scroll != null ? scroll : true;
                    if ("beforePopState" in router) {
                        router[replace ? "replace" : "push"](href, as, {
                            shallow,
                            locale,
                            scroll: routerScroll
                        });
                    } else {
                        router[replace ? "replace" : "push"](as || href, {
                            scroll: routerScroll
                        });
                    }
                };
                navigate();
            }

            function formatStringOrUrl(urlObjOrString) {
                if (typeof urlObjOrString === "string") {
                    return urlObjOrString;
                }
                return (0, _formaturl.formatUrl)(urlObjOrString);
            }
            var Link2 = /* @__PURE__ */ _react.default.forwardRef(function LinkComponent(props, forwardedRef) {
                let children;
                const _a = props,
                    { href: hrefProp, as: asProp, children: childrenProp, prefetch: prefetchProp = null, passHref, replace, shallow, scroll, locale, onClick, onNavigate, onMouseEnter: onMouseEnterProp, onTouchStart: onTouchStartProp, legacyBehavior = false } = _a,
                    restProps = __objRest(_a, ["href", "as", "children", "prefetch", "passHref", "replace", "shallow", "scroll", "locale", "onClick", "onNavigate", "onMouseEnter", "onTouchStart", "legacyBehavior"]);
                children = childrenProp;
                if (legacyBehavior && (typeof children === "string" || typeof children === "number")) {
                    children = /* @__PURE__ */ (0, _jsxruntime.jsx)("a", {
                        children
                    });
                }
                const router = _react.default.useContext(_routercontextsharedruntime.RouterContext);
                const prefetchEnabled = prefetchProp !== false;
                if (process.env.NODE_ENV !== "production") {
                    let createPropError = function(args) {
                        return Object.defineProperty(new Error("Failed prop type: The prop `" + args.key + "` expects a " + args.expected + " in `<Link>`, but got `" + args.actual + "` instead." + (typeof window !== "undefined" ? "\nOpen your browser's console to view the Component stack trace." : "")), "__NEXT_ERROR_CODE", {
                            value: "E319",
                            enumerable: false,
                            configurable: true
                        });
                    };
                    const requiredPropsGuard = {
                        href: true
                    };
                    const requiredProps = Object.keys(requiredPropsGuard);
                    requiredProps.forEach((key) => {
                        if (key === "href") {
                            if (props[key] == null || typeof props[key] !== "string" && typeof props[key] !== "object") {
                                throw createPropError({
                                    key,
                                    expected: "`string` or `object`",
                                    actual: props[key] === null ? "null" : typeof props[key]
                                });
                            }
                        } else {
                            const _ = key;
                        }
                    });
                    const optionalPropsGuard = {
                        as: true,
                        replace: true,
                        scroll: true,
                        shallow: true,
                        passHref: true,
                        prefetch: true,
                        locale: true,
                        onClick: true,
                        onMouseEnter: true,
                        onTouchStart: true,
                        legacyBehavior: true,
                        onNavigate: true
                    };
                    const optionalProps = Object.keys(optionalPropsGuard);
                    optionalProps.forEach((key) => {
                        const valType = typeof props[key];
                        if (key === "as") {
                            if (props[key] && valType !== "string" && valType !== "object") {
                                throw createPropError({
                                    key,
                                    expected: "`string` or `object`",
                                    actual: valType
                                });
                            }
                        } else if (key === "locale") {
                            if (props[key] && valType !== "string") {
                                throw createPropError({
                                    key,
                                    expected: "`string`",
                                    actual: valType
                                });
                            }
                        } else if (key === "onClick" || key === "onMouseEnter" || key === "onTouchStart" || key === "onNavigate") {
                            if (props[key] && valType !== "function") {
                                throw createPropError({
                                    key,
                                    expected: "`function`",
                                    actual: valType
                                });
                            }
                        } else if (key === "replace" || key === "scroll" || key === "shallow" || key === "passHref" || key === "prefetch" || key === "legacyBehavior") {
                            if (props[key] != null && valType !== "boolean") {
                                throw createPropError({
                                    key,
                                    expected: "`boolean`",
                                    actual: valType
                                });
                            }
                        } else {
                            const _ = key;
                        }
                    });
                }
                const { href, as } = _react.default.useMemo(() => {
                    if (!router) {
                        const resolvedHref2 = formatStringOrUrl(hrefProp);
                        return {
                            href: resolvedHref2,
                            as: asProp ? formatStringOrUrl(asProp) : resolvedHref2
                        };
                    }
                    const [resolvedHref, resolvedAs] = (0, _resolvehref.resolveHref)(router, hrefProp, true);
                    return {
                        href: resolvedHref,
                        as: asProp ? (0, _resolvehref.resolveHref)(router, asProp) : resolvedAs || resolvedHref
                    };
                }, [
                    router,
                    hrefProp,
                    asProp
                ]);
                const previousHref = _react.default.useRef(href);
                const previousAs = _react.default.useRef(as);
                let child;
                if (legacyBehavior) {
                    if (process.env.NODE_ENV === "development") {
                        if (onClick) {
                            console.warn('"onClick" was passed to <Link> with `href` of `' + hrefProp + '` but "legacyBehavior" was set. The legacy behavior requires onClick be set on the child of next/link');
                        }
                        if (onMouseEnterProp) {
                            console.warn('"onMouseEnter" was passed to <Link> with `href` of `' + hrefProp + '` but "legacyBehavior" was set. The legacy behavior requires onMouseEnter be set on the child of next/link');
                        }
                        try {
                            child = _react.default.Children.only(children);
                        } catch (err) {
                            if (!children) {
                                throw Object.defineProperty(new Error("No children were passed to <Link> with `href` of `" + hrefProp + "` but one child is required https://nextjs.org/docs/messages/link-no-children"), "__NEXT_ERROR_CODE", {
                                    value: "E320",
                                    enumerable: false,
                                    configurable: true
                                });
                            }
                            throw Object.defineProperty(new Error("Multiple children were passed to <Link> with `href` of `" + hrefProp + "` but only one child is supported https://nextjs.org/docs/messages/link-multiple-children" + (typeof window !== "undefined" ? " \nOpen your browser's console to view the Component stack trace." : "")), "__NEXT_ERROR_CODE", {
                                value: "E266",
                                enumerable: false,
                                configurable: true
                            });
                        }
                    } else {
                        child = _react.default.Children.only(children);
                    }
                } else {
                    if (process.env.NODE_ENV === "development") {
                        if ((children == null ? void 0 : children.type) === "a") {
                            throw Object.defineProperty(new Error("Invalid <Link> with <a> child. Please remove <a> or use <Link legacyBehavior>.\nLearn more: https://nextjs.org/docs/messages/invalid-new-link-with-extra-anchor"), "__NEXT_ERROR_CODE", {
                                value: "E209",
                                enumerable: false,
                                configurable: true
                            });
                        }
                    }
                }
                const childRef = legacyBehavior ? child && typeof child === "object" && child.ref : forwardedRef;
                const [setIntersectionRef, isVisible, resetVisible] = (0, _useintersection.useIntersection)({
                    rootMargin: "200px"
                });
                const setIntersectionWithResetRef = _react.default.useCallback((el) => {
                    if (previousAs.current !== as || previousHref.current !== href) {
                        resetVisible();
                        previousAs.current = as;
                        previousHref.current = href;
                    }
                    setIntersectionRef(el);
                }, [
                    as,
                    href,
                    resetVisible,
                    setIntersectionRef
                ]);
                const setRef2 = (0, _usemergedref.useMergedRef)(setIntersectionWithResetRef, childRef);
                _react.default.useEffect(() => {
                    if (process.env.NODE_ENV !== "production") {
                        return;
                    }
                    if (!router) {
                        return;
                    }
                    if (!isVisible || !prefetchEnabled) {
                        return;
                    }
                    prefetch(router, href, as, {
                        locale
                    });
                }, [
                    as,
                    href,
                    isVisible,
                    locale,
                    prefetchEnabled,
                    router == null ? void 0 : router.locale,
                    router
                ]);
                const childProps = {
                    ref: setRef2,
                    onClick(e) {
                        if (process.env.NODE_ENV !== "production") {
                            if (!e) {
                                throw Object.defineProperty(new Error('Component rendered inside next/link has to pass click event to "onClick" prop.'), "__NEXT_ERROR_CODE", {
                                    value: "E312",
                                    enumerable: false,
                                    configurable: true
                                });
                            }
                        }
                        if (!legacyBehavior && typeof onClick === "function") {
                            onClick(e);
                        }
                        if (legacyBehavior && child.props && typeof child.props.onClick === "function") {
                            child.props.onClick(e);
                        }
                        if (!router) {
                            return;
                        }
                        if (e.defaultPrevented) {
                            return;
                        }
                        linkClicked(e, router, href, as, replace, shallow, scroll, locale, onNavigate);
                    },
                    onMouseEnter(e) {
                        if (!legacyBehavior && typeof onMouseEnterProp === "function") {
                            onMouseEnterProp(e);
                        }
                        if (legacyBehavior && child.props && typeof child.props.onMouseEnter === "function") {
                            child.props.onMouseEnter(e);
                        }
                        if (!router) {
                            return;
                        }
                        prefetch(router, href, as, {
                            locale,
                            priority: true,
                            // @see {https://github.com/vercel/next.js/discussions/40268?sort=top#discussioncomment-3572642}
                            bypassPrefetchedCheck: true
                        });
                    },
                    onTouchStart: process.env.__NEXT_LINK_NO_TOUCH_START ? void 0 : function onTouchStart(e) {
                        if (!legacyBehavior && typeof onTouchStartProp === "function") {
                            onTouchStartProp(e);
                        }
                        if (legacyBehavior && child.props && typeof child.props.onTouchStart === "function") {
                            child.props.onTouchStart(e);
                        }
                        if (!router) {
                            return;
                        }
                        prefetch(router, href, as, {
                            locale,
                            priority: true,
                            // @see {https://github.com/vercel/next.js/discussions/40268?sort=top#discussioncomment-3572642}
                            bypassPrefetchedCheck: true
                        });
                    }
                };
                if ((0, _utils.isAbsoluteUrl)(as)) {
                    childProps.href = as;
                } else if (!legacyBehavior || passHref || child.type === "a" && !("href" in child.props)) {
                    const curLocale = typeof locale !== "undefined" ? locale : router == null ? void 0 : router.locale;
                    const localeDomain = (router == null ? void 0 : router.isLocaleDomain) && (0, _getdomainlocale.getDomainLocale)(as, curLocale, router == null ? void 0 : router.locales, router == null ? void 0 : router.domainLocales);
                    childProps.href = localeDomain || (0, _addbasepath.addBasePath)((0, _addlocale.addLocale)(as, curLocale, router == null ? void 0 : router.defaultLocale));
                }
                if (legacyBehavior) {
                    if (process.env.NODE_ENV === "development") {
                        (0, _erroronce.errorOnce)("`legacyBehavior` is deprecated and will be removed in a future release. A codemod is available to upgrade your components:\n\nnpx @next/codemod@latest new-link .\n\nLearn more: https://nextjs.org/docs/app/building-your-application/upgrading/codemods#remove-a-tags-from-link-components");
                    }
                    return /* @__PURE__ */ _react.default.cloneElement(child, childProps);
                }
                return /* @__PURE__ */ (0, _jsxruntime.jsx)("a", __spreadProps(__spreadValues(__spreadValues({}, restProps), childProps), {
                    children
                }));
            });
            var LinkStatusContext = /* @__PURE__ */ (0, _react.createContext)({
                // We do not support link status in the Pages Router, so we always return false
                pending: false
            });
            var useLinkStatus = () => {
                return (0, _react.useContext)(LinkStatusContext);
            };
            var _default = Link2;
            if ((typeof exports2.default === "function" || typeof exports2.default === "object" && exports2.default !== null) && typeof exports2.default.__esModule === "undefined") {
                Object.defineProperty(exports2.default, "__esModule", { value: true });
                Object.assign(exports2.default, exports2);
                module2.exports = exports2.default;
            }
        }
    });

    // node_modules/next/link.js
    var require_link2 = __commonJS({
        "node_modules/next/link.js" (exports2, module2) {
            "use strict";
            module2.exports = require_link();
        }
    });

    // node_modules/use-sync-external-store/cjs/use-sync-external-store-shim.production.js
    var require_use_sync_external_store_shim_production = __commonJS({
        "node_modules/use-sync-external-store/cjs/use-sync-external-store-shim.production.js" (exports2) {
            "use strict";
            var React38 = require("react");

            function is(x, y) {
                return x === y && (0 !== x || 1 / x === 1 / y) || x !== x && y !== y;
            }
            var objectIs = "function" === typeof Object.is ? Object.is : is;
            var useState17 = React38.useState;
            var useEffect17 = React38.useEffect;
            var useLayoutEffect5 = React38.useLayoutEffect;
            var useDebugValue = React38.useDebugValue;

            function useSyncExternalStore$2(subscribe2, getSnapshot) {
                var value = getSnapshot(),
                    _useState = useState17({ inst: { value, getSnapshot } }),
                    inst = _useState[0].inst,
                    forceUpdate = _useState[1];
                useLayoutEffect5(
                    function() {
                        inst.value = value;
                        inst.getSnapshot = getSnapshot;
                        checkIfSnapshotChanged(inst) && forceUpdate({ inst });
                    }, [subscribe2, value, getSnapshot]
                );
                useEffect17(
                    function() {
                        checkIfSnapshotChanged(inst) && forceUpdate({ inst });
                        return subscribe2(function() {
                            checkIfSnapshotChanged(inst) && forceUpdate({ inst });
                        });
                    }, [subscribe2]
                );
                useDebugValue(value);
                return value;
            }

            function checkIfSnapshotChanged(inst) {
                var latestGetSnapshot = inst.getSnapshot;
                inst = inst.value;
                try {
                    var nextValue = latestGetSnapshot();
                    return !objectIs(inst, nextValue);
                } catch (error) {
                    return true;
                }
            }

            function useSyncExternalStore$1(subscribe2, getSnapshot) {
                return getSnapshot();
            }
            var shim = "undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement ? useSyncExternalStore$1 : useSyncExternalStore$2;
            exports2.useSyncExternalStore = void 0 !== React38.useSyncExternalStore ? React38.useSyncExternalStore : shim;
        }
    });

    // node_modules/use-sync-external-store/cjs/use-sync-external-store-shim.development.js
    var require_use_sync_external_store_shim_development = __commonJS({
        "node_modules/use-sync-external-store/cjs/use-sync-external-store-shim.development.js" (exports2) {
            "use strict";
            "production" !== process.env.NODE_ENV && function() {
                function is(x, y) {
                    return x === y && (0 !== x || 1 / x === 1 / y) || x !== x && y !== y;
                }

                function useSyncExternalStore$2(subscribe2, getSnapshot) {
                    didWarnOld18Alpha || void 0 === React38.startTransition || (didWarnOld18Alpha = true, console.error(
                        "You are using an outdated, pre-release alpha of React 18 that does not support useSyncExternalStore. The use-sync-external-store shim will not work correctly. Upgrade to a newer pre-release."
                    ));
                    var value = getSnapshot();
                    if (!didWarnUncachedGetSnapshot) {
                        var cachedValue = getSnapshot();
                        objectIs(value, cachedValue) || (console.error(
                            "The result of getSnapshot should be cached to avoid an infinite loop"
                        ), didWarnUncachedGetSnapshot = true);
                    }
                    cachedValue = useState17({
                        inst: { value, getSnapshot }
                    });
                    var inst = cachedValue[0].inst,
                        forceUpdate = cachedValue[1];
                    useLayoutEffect5(
                        function() {
                            inst.value = value;
                            inst.getSnapshot = getSnapshot;
                            checkIfSnapshotChanged(inst) && forceUpdate({ inst });
                        }, [subscribe2, value, getSnapshot]
                    );
                    useEffect17(
                        function() {
                            checkIfSnapshotChanged(inst) && forceUpdate({ inst });
                            return subscribe2(function() {
                                checkIfSnapshotChanged(inst) && forceUpdate({ inst });
                            });
                        }, [subscribe2]
                    );
                    useDebugValue(value);
                    return value;
                }

                function checkIfSnapshotChanged(inst) {
                    var latestGetSnapshot = inst.getSnapshot;
                    inst = inst.value;
                    try {
                        var nextValue = latestGetSnapshot();
                        return !objectIs(inst, nextValue);
                    } catch (error) {
                        return true;
                    }
                }

                function useSyncExternalStore$1(subscribe2, getSnapshot) {
                    return getSnapshot();
                }
                "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
                var React38 = require("react"),
                    objectIs = "function" === typeof Object.is ? Object.is : is,
                    useState17 = React38.useState,
                    useEffect17 = React38.useEffect,
                    useLayoutEffect5 = React38.useLayoutEffect,
                    useDebugValue = React38.useDebugValue,
                    didWarnOld18Alpha = false,
                    didWarnUncachedGetSnapshot = false,
                    shim = "undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement ? useSyncExternalStore$1 : useSyncExternalStore$2;
                exports2.useSyncExternalStore = void 0 !== React38.useSyncExternalStore ? React38.useSyncExternalStore : shim;
                "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
            }();
        }
    });

    // node_modules/use-sync-external-store/shim/index.js
    var require_shim = __commonJS({
        "node_modules/use-sync-external-store/shim/index.js" (exports2, module2) {
            "use strict";
            if (process.env.NODE_ENV === "production") {
                module2.exports = require_use_sync_external_store_shim_production();
            } else {
                module2.exports = require_use_sync_external_store_shim_development();
            }
        }
    });

    // src/index.ts
    var index_exports = {};
    __export(index_exports, {
        ProductSwitcher: () => ProductSwitcher
    });
    module.exports = __toCommonJS(index_exports);

    // src/components/ui/dropdown-menu.tsx
    var React34 = __toESM(require("react"));

    // node_modules/@radix-ui/react-dropdown-menu/dist/index.mjs
    var React33 = __toESM(require("react"), 1);

    // node_modules/@radix-ui/primitive/dist/index.mjs
    function composeEventHandlers(originalEventHandler, ourEventHandler, { checkForDefaultPrevented = true } = {}) {
        return function handleEvent(event) {
            originalEventHandler == null ? void 0 : originalEventHandler(event);
            if (checkForDefaultPrevented === false || !event.defaultPrevented) {
                return ourEventHandler == null ? void 0 : ourEventHandler(event);
            }
        };
    }

    // node_modules/@radix-ui/react-compose-refs/dist/index.mjs
    var React = __toESM(require("react"), 1);

    function setRef(ref, value) {
        if (typeof ref === "function") {
            return ref(value);
        } else if (ref !== null && ref !== void 0) {
            ref.current = value;
        }
    }

    function composeRefs(...refs) {
        return (node) => {
            let hasCleanup = false;
            const cleanups = refs.map((ref) => {
                const cleanup = setRef(ref, node);
                if (!hasCleanup && typeof cleanup == "function") {
                    hasCleanup = true;
                }
                return cleanup;
            });
            if (hasCleanup) {
                return () => {
                    for (let i = 0; i < cleanups.length; i++) {
                        const cleanup = cleanups[i];
                        if (typeof cleanup == "function") {
                            cleanup();
                        } else {
                            setRef(refs[i], null);
                        }
                    }
                };
            }
        };
    }

    function useComposedRefs(...refs) {
        return React.useCallback(composeRefs(...refs), refs);
    }

    // node_modules/@radix-ui/react-context/dist/index.mjs
    var React2 = __toESM(require("react"), 1);
    var import_jsx_runtime = require("react/jsx-runtime");

    function createContextScope(scopeName, createContextScopeDeps = []) {
        let defaultContexts = [];

        function createContext32(rootComponentName, defaultContext) {
            const BaseContext = React2.createContext(defaultContext);
            const index2 = defaultContexts.length;
            defaultContexts = [...defaultContexts, defaultContext];
            const Provider = (props) => {
                var _b;
                const _a = props,
                    { scope, children } = _a,
                    context = __objRest(_a, ["scope", "children"]);
                const Context = ((_b = scope == null ? void 0 : scope[scopeName]) == null ? void 0 : _b[index2]) || BaseContext;
                const value = React2.useMemo(() => context, Object.values(context));
                return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Context.Provider, { value, children });
            };
            Provider.displayName = rootComponentName + "Provider";

            function useContext22(consumerName, scope) {
                var _a;
                const Context = ((_a = scope == null ? void 0 : scope[scopeName]) == null ? void 0 : _a[index2]) || BaseContext;
                const context = React2.useContext(Context);
                if (context) return context;
                if (defaultContext !== void 0) return defaultContext;
                throw new Error(`\`${consumerName}\` must be used within \`${rootComponentName}\``);
            }
            return [Provider, useContext22];
        }
        const createScope = () => {
            const scopeContexts = defaultContexts.map((defaultContext) => {
                return React2.createContext(defaultContext);
            });
            return function useScope(scope) {
                const contexts = (scope == null ? void 0 : scope[scopeName]) || scopeContexts;
                return React2.useMemo(
                    () => ({
                        [`__scope${scopeName}`]: __spreadProps(__spreadValues({}, scope), {
                            [scopeName]: contexts }) }), [scope, contexts]
                );
            };
        };
        createScope.scopeName = scopeName;
        return [createContext32, composeContextScopes(createScope, ...createContextScopeDeps)];
    }

    function composeContextScopes(...scopes) {
        const baseScope = scopes[0];
        if (scopes.length === 1) return baseScope;
        const createScope = () => {
            const scopeHooks = scopes.map((createScope2) => ({
                useScope: createScope2(),
                scopeName: createScope2.scopeName
            }));
            return function useComposedScopes(overrideScopes) {
                const nextScopes = scopeHooks.reduce((nextScopes2, { useScope, scopeName }) => {
                    const scopeProps = useScope(overrideScopes);
                    const currentScope = scopeProps[`__scope${scopeName}`];
                    return __spreadValues(__spreadValues({}, nextScopes2), currentScope);
                }, {});
                return React2.useMemo(() => ({
                    [`__scope${baseScope.scopeName}`]: nextScopes }), [nextScopes]);
            };
        };
        createScope.scopeName = baseScope.scopeName;
        return createScope;
    }

    // node_modules/@radix-ui/react-use-controllable-state/dist/index.mjs
    var React4 = __toESM(require("react"), 1);

    // node_modules/@radix-ui/react-use-layout-effect/dist/index.mjs
    var React3 = __toESM(require("react"), 1);
    var useLayoutEffect2 = (globalThis == null ? void 0 : globalThis.document) ? React3.useLayoutEffect : () => {};

    // node_modules/@radix-ui/react-use-controllable-state/dist/index.mjs
    var React22 = __toESM(require("react"), 1);
    var useInsertionEffect = React4[" useInsertionEffect ".trim().toString()] || useLayoutEffect2;

    function useControllableState({
        prop,
        defaultProp,
        onChange = () => {},
        caller
    }) {
        const [uncontrolledProp, setUncontrolledProp, onChangeRef] = useUncontrolledState({
            defaultProp,
            onChange
        });
        const isControlled = prop !== void 0;
        const value = isControlled ? prop : uncontrolledProp;
        if (true) {
            const isControlledRef = React4.useRef(prop !== void 0);
            React4.useEffect(() => {
                const wasControlled = isControlledRef.current;
                if (wasControlled !== isControlled) {
                    const from = wasControlled ? "controlled" : "uncontrolled";
                    const to = isControlled ? "controlled" : "uncontrolled";
                    console.warn(
                        `${caller} is changing from ${from} to ${to}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`
                    );
                }
                isControlledRef.current = isControlled;
            }, [isControlled, caller]);
        }
        const setValue = React4.useCallback(
            (nextValue) => {
                var _a;
                if (isControlled) {
                    const value2 = isFunction(nextValue) ? nextValue(prop) : nextValue;
                    if (value2 !== prop) {
                        (_a = onChangeRef.current) == null ? void 0 : _a.call(onChangeRef, value2);
                    }
                } else {
                    setUncontrolledProp(nextValue);
                }
            }, [isControlled, prop, setUncontrolledProp, onChangeRef]
        );
        return [value, setValue];
    }

    function useUncontrolledState({
        defaultProp,
        onChange
    }) {
        const [value, setValue] = React4.useState(defaultProp);
        const prevValueRef = React4.useRef(value);
        const onChangeRef = React4.useRef(onChange);
        useInsertionEffect(() => {
            onChangeRef.current = onChange;
        }, [onChange]);
        React4.useEffect(() => {
            var _a;
            if (prevValueRef.current !== value) {
                (_a = onChangeRef.current) == null ? void 0 : _a.call(onChangeRef, value);
                prevValueRef.current = value;
            }
        }, [value, prevValueRef]);
        return [value, setValue, onChangeRef];
    }

    function isFunction(value) {
        return typeof value === "function";
    }
    var SYNC_STATE = Symbol("RADIX:SYNC_STATE");

    // node_modules/@radix-ui/react-primitive/dist/index.mjs
    var React6 = __toESM(require("react"), 1);
    var ReactDOM = __toESM(require("react-dom"), 1);

    // node_modules/@radix-ui/react-slot/dist/index.mjs
    var React5 = __toESM(require("react"), 1);
    var import_jsx_runtime2 = require("react/jsx-runtime");
    // @__NO_SIDE_EFFECTS__
    function createSlot(ownerName) {
        const SlotClone = /* @__PURE__ */ createSlotClone(ownerName);
        const Slot22 = React5.forwardRef((props, forwardedRef) => {
            const _a = props,
                { children } = _a,
                slotProps = __objRest(_a, ["children"]);
            const childrenArray = React5.Children.toArray(children);
            const slottable = childrenArray.find(isSlottable);
            if (slottable) {
                const newElement = slottable.props.children;
                const newChildren = childrenArray.map((child) => {
                    if (child === slottable) {
                        if (React5.Children.count(newElement) > 1) return React5.Children.only(null);
                        return React5.isValidElement(newElement) ? newElement.props.children : null;
                    } else {
                        return child;
                    }
                });
                return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(SlotClone, __spreadProps(__spreadValues({}, slotProps), { ref: forwardedRef, children: React5.isValidElement(newElement) ? React5.cloneElement(newElement, void 0, newChildren) : null }));
            }
            return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(SlotClone, __spreadProps(__spreadValues({}, slotProps), { ref: forwardedRef, children }));
        });
        Slot22.displayName = `${ownerName}.Slot`;
        return Slot22;
    }
    var Slot = /* @__PURE__ */ createSlot("Slot");
    // @__NO_SIDE_EFFECTS__
    function createSlotClone(ownerName) {
        const SlotClone = React5.forwardRef((props, forwardedRef) => {
            const _a = props,
                { children } = _a,
                slotProps = __objRest(_a, ["children"]);
            if (React5.isValidElement(children)) {
                const childrenRef = getElementRef(children);
                const props2 = mergeProps(slotProps, children.props);
                if (children.type !== React5.Fragment) {
                    props2.ref = forwardedRef ? composeRefs(forwardedRef, childrenRef) : childrenRef;
                }
                return React5.cloneElement(children, props2);
            }
            return React5.Children.count(children) > 1 ? React5.Children.only(null) : null;
        });
        SlotClone.displayName = `${ownerName}.SlotClone`;
        return SlotClone;
    }
    var SLOTTABLE_IDENTIFIER = Symbol("radix.slottable");

    function isSlottable(child) {
        return React5.isValidElement(child) && typeof child.type === "function" && "__radixId" in child.type && child.type.__radixId === SLOTTABLE_IDENTIFIER;
    }

    function mergeProps(slotProps, childProps) {
        const overrideProps = __spreadValues({}, childProps);
        for (const propName in childProps) {
            const slotPropValue = slotProps[propName];
            const childPropValue = childProps[propName];
            const isHandler = /^on[A-Z]/.test(propName);
            if (isHandler) {
                if (slotPropValue && childPropValue) {
                    overrideProps[propName] = (...args) => {
                        const result = childPropValue(...args);
                        slotPropValue(...args);
                        return result;
                    };
                } else if (slotPropValue) {
                    overrideProps[propName] = slotPropValue;
                }
            } else if (propName === "style") {
                overrideProps[propName] = __spreadValues(__spreadValues({}, slotPropValue), childPropValue);
            } else if (propName === "className") {
                overrideProps[propName] = [slotPropValue, childPropValue].filter(Boolean).join(" ");
            }
        }
        return __spreadValues(__spreadValues({}, slotProps), overrideProps);
    }

    function getElementRef(element) {
        var _a, _b;
        let getter = (_a = Object.getOwnPropertyDescriptor(element.props, "ref")) == null ? void 0 : _a.get;
        let mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
        if (mayWarn) {
            return element.ref;
        }
        getter = (_b = Object.getOwnPropertyDescriptor(element, "ref")) == null ? void 0 : _b.get;
        mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
        if (mayWarn) {
            return element.props.ref;
        }
        return element.props.ref || element.ref;
    }

    // node_modules/@radix-ui/react-primitive/dist/index.mjs
    var import_jsx_runtime3 = require("react/jsx-runtime");
    var NODES = [
        "a",
        "button",
        "div",
        "form",
        "h2",
        "h3",
        "img",
        "input",
        "label",
        "li",
        "nav",
        "ol",
        "p",
        "select",
        "span",
        "svg",
        "ul"
    ];
    var Primitive = NODES.reduce((primitive, node) => {
        const Slot3 = createSlot(`Primitive.${node}`);
        const Node2 = React6.forwardRef((props, forwardedRef) => {
            const _a = props,
                { asChild } = _a,
                primitiveProps = __objRest(_a, ["asChild"]);
            const Comp = asChild ? Slot3 : node;
            if (typeof window !== "undefined") {
                window[Symbol.for("radix-ui")] = true;
            }
            return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Comp, __spreadProps(__spreadValues({}, primitiveProps), { ref: forwardedRef }));
        });
        Node2.displayName = `Primitive.${node}`;
        return __spreadProps(__spreadValues({}, primitive), {
            [node]: Node2 });
    }, {});

    function dispatchDiscreteCustomEvent(target, event) {
        if (target) ReactDOM.flushSync(() => target.dispatchEvent(event));
    }

    // node_modules/@radix-ui/react-menu/dist/index.mjs
    var React32 = __toESM(require("react"), 1);

    // node_modules/@radix-ui/react-collection/dist/index.mjs
    var import_react = __toESM(require("react"), 1);
    var import_jsx_runtime4 = require("react/jsx-runtime");
    var import_react2 = __toESM(require("react"), 1);
    var import_jsx_runtime5 = require("react/jsx-runtime");

    function createCollection(name) {
        const PROVIDER_NAME = name + "CollectionProvider";
        const [createCollectionContext, createCollectionScope3] = createContextScope(PROVIDER_NAME);
        const [CollectionProviderImpl, useCollectionContext] = createCollectionContext(
            PROVIDER_NAME, { collectionRef: { current: null }, itemMap: /* @__PURE__ */ new Map() }
        );
        const CollectionProvider = (props) => {
            const { scope, children } = props;
            const ref = import_react.default.useRef(null);
            const itemMap = import_react.default.useRef( /* @__PURE__ */ new Map()).current;
            return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(CollectionProviderImpl, { scope, itemMap, collectionRef: ref, children });
        };
        CollectionProvider.displayName = PROVIDER_NAME;
        const COLLECTION_SLOT_NAME = name + "CollectionSlot";
        const CollectionSlotImpl = createSlot(COLLECTION_SLOT_NAME);
        const CollectionSlot = import_react.default.forwardRef(
            (props, forwardedRef) => {
                const { scope, children } = props;
                const context = useCollectionContext(COLLECTION_SLOT_NAME, scope);
                const composedRefs = useComposedRefs(forwardedRef, context.collectionRef);
                return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(CollectionSlotImpl, { ref: composedRefs, children });
            }
        );
        CollectionSlot.displayName = COLLECTION_SLOT_NAME;
        const ITEM_SLOT_NAME = name + "CollectionItemSlot";
        const ITEM_DATA_ATTR = "data-radix-collection-item";
        const CollectionItemSlotImpl = createSlot(ITEM_SLOT_NAME);
        const CollectionItemSlot = import_react.default.forwardRef(
            (props, forwardedRef) => {
                const _a = props,
                    { scope, children } = _a,
                    itemData = __objRest(_a, ["scope", "children"]);
                const ref = import_react.default.useRef(null);
                const composedRefs = useComposedRefs(forwardedRef, ref);
                const context = useCollectionContext(ITEM_SLOT_NAME, scope);
                import_react.default.useEffect(() => {
                    context.itemMap.set(ref, __spreadValues({ ref }, itemData));
                    return () => void context.itemMap.delete(ref);
                });
                return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(CollectionItemSlotImpl, __spreadProps(__spreadValues({}, {
                    [ITEM_DATA_ATTR]: "" }), { ref: composedRefs, children }));
            }
        );
        CollectionItemSlot.displayName = ITEM_SLOT_NAME;

        function useCollection3(scope) {
            const context = useCollectionContext(name + "CollectionConsumer", scope);
            const getItems = import_react.default.useCallback(() => {
                const collectionNode = context.collectionRef.current;
                if (!collectionNode) return [];
                const orderedNodes = Array.from(collectionNode.querySelectorAll(`[${ITEM_DATA_ATTR}]`));
                const items = Array.from(context.itemMap.values());
                const orderedItems = items.sort(
                    (a, b) => orderedNodes.indexOf(a.ref.current) - orderedNodes.indexOf(b.ref.current)
                );
                return orderedItems;
            }, [context.collectionRef, context.itemMap]);
            return getItems;
        }
        return [
            { Provider: CollectionProvider, Slot: CollectionSlot, ItemSlot: CollectionItemSlot },
            useCollection3,
            createCollectionScope3
        ];
    }

    // node_modules/@radix-ui/react-direction/dist/index.mjs
    var React8 = __toESM(require("react"), 1);
    var import_jsx_runtime6 = require("react/jsx-runtime");
    var DirectionContext = React8.createContext(void 0);

    function useDirection(localDir) {
        const globalDir = React8.useContext(DirectionContext);
        return localDir || globalDir || "ltr";
    }

    // node_modules/@radix-ui/react-dismissable-layer/dist/index.mjs
    var React11 = __toESM(require("react"), 1);

    // node_modules/@radix-ui/react-use-callback-ref/dist/index.mjs
    var React9 = __toESM(require("react"), 1);

    function useCallbackRef(callback) {
        const callbackRef = React9.useRef(callback);
        React9.useEffect(() => {
            callbackRef.current = callback;
        });
        return React9.useMemo(() => (...args) => {
            var _a;
            return (_a = callbackRef.current) == null ? void 0 : _a.call(callbackRef, ...args);
        }, []);
    }

    // node_modules/@radix-ui/react-use-escape-keydown/dist/index.mjs
    var React10 = __toESM(require("react"), 1);

    function useEscapeKeydown(onEscapeKeyDownProp, ownerDocument = globalThis == null ? void 0 : globalThis.document) {
        const onEscapeKeyDown = useCallbackRef(onEscapeKeyDownProp);
        React10.useEffect(() => {
            const handleKeyDown = (event) => {
                if (event.key === "Escape") {
                    onEscapeKeyDown(event);
                }
            };
            ownerDocument.addEventListener("keydown", handleKeyDown, { capture: true });
            return () => ownerDocument.removeEventListener("keydown", handleKeyDown, { capture: true });
        }, [onEscapeKeyDown, ownerDocument]);
    }

    // node_modules/@radix-ui/react-dismissable-layer/dist/index.mjs
    var import_jsx_runtime7 = require("react/jsx-runtime");
    var DISMISSABLE_LAYER_NAME = "DismissableLayer";
    var CONTEXT_UPDATE = "dismissableLayer.update";
    var POINTER_DOWN_OUTSIDE = "dismissableLayer.pointerDownOutside";
    var FOCUS_OUTSIDE = "dismissableLayer.focusOutside";
    var originalBodyPointerEvents;
    var DismissableLayerContext = React11.createContext({
        layers: /* @__PURE__ */ new Set(),
        layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
        branches: /* @__PURE__ */ new Set()
    });
    var DismissableLayer = React11.forwardRef(
        (props, forwardedRef) => {
            var _b;
            const _a = props,
                {
                    disableOutsidePointerEvents = false,
                    onEscapeKeyDown,
                    onPointerDownOutside,
                    onFocusOutside,
                    onInteractOutside,
                    onDismiss
                } = _a,
                layerProps = __objRest(_a, [
                    "disableOutsidePointerEvents",
                    "onEscapeKeyDown",
                    "onPointerDownOutside",
                    "onFocusOutside",
                    "onInteractOutside",
                    "onDismiss"
                ]);
            const context = React11.useContext(DismissableLayerContext);
            const [node, setNode] = React11.useState(null);
            const ownerDocument = (_b = node == null ? void 0 : node.ownerDocument) != null ? _b : globalThis == null ? void 0 : globalThis.document;
            const [, force] = React11.useState({});
            const composedRefs = useComposedRefs(forwardedRef, (node2) => setNode(node2));
            const layers = Array.from(context.layers);
            const [highestLayerWithOutsidePointerEventsDisabled] = [...context.layersWithOutsidePointerEventsDisabled].slice(-1);
            const highestLayerWithOutsidePointerEventsDisabledIndex = layers.indexOf(highestLayerWithOutsidePointerEventsDisabled);
            const index2 = node ? layers.indexOf(node) : -1;
            const isBodyPointerEventsDisabled = context.layersWithOutsidePointerEventsDisabled.size > 0;
            const isPointerEventsEnabled = index2 >= highestLayerWithOutsidePointerEventsDisabledIndex;
            const pointerDownOutside = usePointerDownOutside((event) => {
                const target = event.target;
                const isPointerDownOnBranch = [...context.branches].some((branch) => branch.contains(target));
                if (!isPointerEventsEnabled || isPointerDownOnBranch) return;
                onPointerDownOutside == null ? void 0 : onPointerDownOutside(event);
                onInteractOutside == null ? void 0 : onInteractOutside(event);
                if (!event.defaultPrevented) onDismiss == null ? void 0 : onDismiss();
            }, ownerDocument);
            const focusOutside = useFocusOutside((event) => {
                const target = event.target;
                const isFocusInBranch = [...context.branches].some((branch) => branch.contains(target));
                if (isFocusInBranch) return;
                onFocusOutside == null ? void 0 : onFocusOutside(event);
                onInteractOutside == null ? void 0 : onInteractOutside(event);
                if (!event.defaultPrevented) onDismiss == null ? void 0 : onDismiss();
            }, ownerDocument);
            useEscapeKeydown((event) => {
                const isHighestLayer = index2 === context.layers.size - 1;
                if (!isHighestLayer) return;
                onEscapeKeyDown == null ? void 0 : onEscapeKeyDown(event);
                if (!event.defaultPrevented && onDismiss) {
                    event.preventDefault();
                    onDismiss();
                }
            }, ownerDocument);
            React11.useEffect(() => {
                if (!node) return;
                if (disableOutsidePointerEvents) {
                    if (context.layersWithOutsidePointerEventsDisabled.size === 0) {
                        originalBodyPointerEvents = ownerDocument.body.style.pointerEvents;
                        ownerDocument.body.style.pointerEvents = "none";
                    }
                    context.layersWithOutsidePointerEventsDisabled.add(node);
                }
                context.layers.add(node);
                dispatchUpdate();
                return () => {
                    if (disableOutsidePointerEvents && context.layersWithOutsidePointerEventsDisabled.size === 1) {
                        ownerDocument.body.style.pointerEvents = originalBodyPointerEvents;
                    }
                };
            }, [node, ownerDocument, disableOutsidePointerEvents, context]);
            React11.useEffect(() => {
                return () => {
                    if (!node) return;
                    context.layers.delete(node);
                    context.layersWithOutsidePointerEventsDisabled.delete(node);
                    dispatchUpdate();
                };
            }, [node, context]);
            React11.useEffect(() => {
                const handleUpdate = () => force({});
                document.addEventListener(CONTEXT_UPDATE, handleUpdate);
                return () => document.removeEventListener(CONTEXT_UPDATE, handleUpdate);
            }, []);
            return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
                Primitive.div,
                __spreadProps(__spreadValues({}, layerProps), {
                    ref: composedRefs,
                    style: __spreadValues({
                        pointerEvents: isBodyPointerEventsDisabled ? isPointerEventsEnabled ? "auto" : "none" : void 0
                    }, props.style),
                    onFocusCapture: composeEventHandlers(props.onFocusCapture, focusOutside.onFocusCapture),
                    onBlurCapture: composeEventHandlers(props.onBlurCapture, focusOutside.onBlurCapture),
                    onPointerDownCapture: composeEventHandlers(
                        props.onPointerDownCapture,
                        pointerDownOutside.onPointerDownCapture
                    )
                })
            );
        }
    );
    DismissableLayer.displayName = DISMISSABLE_LAYER_NAME;
    var BRANCH_NAME = "DismissableLayerBranch";
    var DismissableLayerBranch = React11.forwardRef((props, forwardedRef) => {
        const context = React11.useContext(DismissableLayerContext);
        const ref = React11.useRef(null);
        const composedRefs = useComposedRefs(forwardedRef, ref);
        React11.useEffect(() => {
            const node = ref.current;
            if (node) {
                context.branches.add(node);
                return () => {
                    context.branches.delete(node);
                };
            }
        }, [context.branches]);
        return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(Primitive.div, __spreadProps(__spreadValues({}, props), { ref: composedRefs }));
    });
    DismissableLayerBranch.displayName = BRANCH_NAME;

    function usePointerDownOutside(onPointerDownOutside, ownerDocument = globalThis == null ? void 0 : globalThis.document) {
        const handlePointerDownOutside = useCallbackRef(onPointerDownOutside);
        const isPointerInsideReactTreeRef = React11.useRef(false);
        const handleClickRef = React11.useRef(() => {});
        React11.useEffect(() => {
            const handlePointerDown = (event) => {
                if (event.target && !isPointerInsideReactTreeRef.current) {
                    let handleAndDispatchPointerDownOutsideEvent2 = function() {
                        handleAndDispatchCustomEvent(
                            POINTER_DOWN_OUTSIDE,
                            handlePointerDownOutside,
                            eventDetail, { discrete: true }
                        );
                    };
                    var handleAndDispatchPointerDownOutsideEvent = handleAndDispatchPointerDownOutsideEvent2;
                    const eventDetail = { originalEvent: event };
                    if (event.pointerType === "touch") {
                        ownerDocument.removeEventListener("click", handleClickRef.current);
                        handleClickRef.current = handleAndDispatchPointerDownOutsideEvent2;
                        ownerDocument.addEventListener("click", handleClickRef.current, { once: true });
                    } else {
                        handleAndDispatchPointerDownOutsideEvent2();
                    }
                } else {
                    ownerDocument.removeEventListener("click", handleClickRef.current);
                }
                isPointerInsideReactTreeRef.current = false;
            };
            const timerId = window.setTimeout(() => {
                ownerDocument.addEventListener("pointerdown", handlePointerDown);
            }, 0);
            return () => {
                window.clearTimeout(timerId);
                ownerDocument.removeEventListener("pointerdown", handlePointerDown);
                ownerDocument.removeEventListener("click", handleClickRef.current);
            };
        }, [ownerDocument, handlePointerDownOutside]);
        return {
            // ensures we check React component tree (not just DOM tree)
            onPointerDownCapture: () => isPointerInsideReactTreeRef.current = true
        };
    }

    function useFocusOutside(onFocusOutside, ownerDocument = globalThis == null ? void 0 : globalThis.document) {
        const handleFocusOutside = useCallbackRef(onFocusOutside);
        const isFocusInsideReactTreeRef = React11.useRef(false);
        React11.useEffect(() => {
            const handleFocus = (event) => {
                if (event.target && !isFocusInsideReactTreeRef.current) {
                    const eventDetail = { originalEvent: event };
                    handleAndDispatchCustomEvent(FOCUS_OUTSIDE, handleFocusOutside, eventDetail, {
                        discrete: false
                    });
                }
            };
            ownerDocument.addEventListener("focusin", handleFocus);
            return () => ownerDocument.removeEventListener("focusin", handleFocus);
        }, [ownerDocument, handleFocusOutside]);
        return {
            onFocusCapture: () => isFocusInsideReactTreeRef.current = true,
            onBlurCapture: () => isFocusInsideReactTreeRef.current = false
        };
    }

    function dispatchUpdate() {
        const event = new CustomEvent(CONTEXT_UPDATE);
        document.dispatchEvent(event);
    }

    function handleAndDispatchCustomEvent(name, handler, detail, { discrete }) {
        const target = detail.originalEvent.target;
        const event = new CustomEvent(name, { bubbles: false, cancelable: true, detail });
        if (handler) target.addEventListener(name, handler, { once: true });
        if (discrete) {
            dispatchDiscreteCustomEvent(target, event);
        } else {
            target.dispatchEvent(event);
        }
    }

    // node_modules/@radix-ui/react-focus-guards/dist/index.mjs
    var React12 = __toESM(require("react"), 1);
    var count = 0;

    function useFocusGuards() {
        React12.useEffect(() => {
            var _a, _b;
            const edgeGuards = document.querySelectorAll("[data-radix-focus-guard]");
            document.body.insertAdjacentElement("afterbegin", (_a = edgeGuards[0]) != null ? _a : createFocusGuard());
            document.body.insertAdjacentElement("beforeend", (_b = edgeGuards[1]) != null ? _b : createFocusGuard());
            count++;
            return () => {
                if (count === 1) {
                    document.querySelectorAll("[data-radix-focus-guard]").forEach((node) => node.remove());
                }
                count--;
            };
        }, []);
    }

    function createFocusGuard() {
        const element = document.createElement("span");
        element.setAttribute("data-radix-focus-guard", "");
        element.tabIndex = 0;
        element.style.outline = "none";
        element.style.opacity = "0";
        element.style.position = "fixed";
        element.style.pointerEvents = "none";
        return element;
    }

    // node_modules/@radix-ui/react-focus-scope/dist/index.mjs
    var React13 = __toESM(require("react"), 1);
    var import_jsx_runtime8 = require("react/jsx-runtime");
    var AUTOFOCUS_ON_MOUNT = "focusScope.autoFocusOnMount";
    var AUTOFOCUS_ON_UNMOUNT = "focusScope.autoFocusOnUnmount";
    var EVENT_OPTIONS = { bubbles: false, cancelable: true };
    var FOCUS_SCOPE_NAME = "FocusScope";
    var FocusScope = React13.forwardRef((props, forwardedRef) => {
        const _a = props,
            {
                loop = false,
                trapped = false,
                onMountAutoFocus: onMountAutoFocusProp,
                onUnmountAutoFocus: onUnmountAutoFocusProp
            } = _a,
            scopeProps = __objRest(_a, [
                "loop",
                "trapped",
                "onMountAutoFocus",
                "onUnmountAutoFocus"
            ]);
        const [container, setContainer] = React13.useState(null);
        const onMountAutoFocus = useCallbackRef(onMountAutoFocusProp);
        const onUnmountAutoFocus = useCallbackRef(onUnmountAutoFocusProp);
        const lastFocusedElementRef = React13.useRef(null);
        const composedRefs = useComposedRefs(forwardedRef, (node) => setContainer(node));
        const focusScope = React13.useRef({
            paused: false,
            pause() {
                this.paused = true;
            },
            resume() {
                this.paused = false;
            }
        }).current;
        React13.useEffect(() => {
            if (trapped) {
                let handleFocusIn2 = function(event) {
                        if (focusScope.paused || !container) return;
                        const target = event.target;
                        if (container.contains(target)) {
                            lastFocusedElementRef.current = target;
                        } else {
                            focus(lastFocusedElementRef.current, { select: true });
                        }
                    },
                    handleFocusOut2 = function(event) {
                        if (focusScope.paused || !container) return;
                        const relatedTarget = event.relatedTarget;
                        if (relatedTarget === null) return;
                        if (!container.contains(relatedTarget)) {
                            focus(lastFocusedElementRef.current, { select: true });
                        }
                    },
                    handleMutations2 = function(mutations) {
                        const focusedElement = document.activeElement;
                        if (focusedElement !== document.body) return;
                        for (const mutation of mutations) {
                            if (mutation.removedNodes.length > 0) focus(container);
                        }
                    };
                var handleFocusIn = handleFocusIn2,
                    handleFocusOut = handleFocusOut2,
                    handleMutations = handleMutations2;
                document.addEventListener("focusin", handleFocusIn2);
                document.addEventListener("focusout", handleFocusOut2);
                const mutationObserver = new MutationObserver(handleMutations2);
                if (container) mutationObserver.observe(container, { childList: true, subtree: true });
                return () => {
                    document.removeEventListener("focusin", handleFocusIn2);
                    document.removeEventListener("focusout", handleFocusOut2);
                    mutationObserver.disconnect();
                };
            }
        }, [trapped, container, focusScope.paused]);
        React13.useEffect(() => {
            if (container) {
                focusScopesStack.add(focusScope);
                const previouslyFocusedElement = document.activeElement;
                const hasFocusedCandidate = container.contains(previouslyFocusedElement);
                if (!hasFocusedCandidate) {
                    const mountEvent = new CustomEvent(AUTOFOCUS_ON_MOUNT, EVENT_OPTIONS);
                    container.addEventListener(AUTOFOCUS_ON_MOUNT, onMountAutoFocus);
                    container.dispatchEvent(mountEvent);
                    if (!mountEvent.defaultPrevented) {
                        focusFirst(removeLinks(getTabbableCandidates(container)), { select: true });
                        if (document.activeElement === previouslyFocusedElement) {
                            focus(container);
                        }
                    }
                }
                return () => {
                    container.removeEventListener(AUTOFOCUS_ON_MOUNT, onMountAutoFocus);
                    setTimeout(() => {
                        const unmountEvent = new CustomEvent(AUTOFOCUS_ON_UNMOUNT, EVENT_OPTIONS);
                        container.addEventListener(AUTOFOCUS_ON_UNMOUNT, onUnmountAutoFocus);
                        container.dispatchEvent(unmountEvent);
                        if (!unmountEvent.defaultPrevented) {
                            focus(previouslyFocusedElement != null ? previouslyFocusedElement : document.body, { select: true });
                        }
                        container.removeEventListener(AUTOFOCUS_ON_UNMOUNT, onUnmountAutoFocus);
                        focusScopesStack.remove(focusScope);
                    }, 0);
                };
            }
        }, [container, onMountAutoFocus, onUnmountAutoFocus, focusScope]);
        const handleKeyDown = React13.useCallback(
            (event) => {
                if (!loop && !trapped) return;
                if (focusScope.paused) return;
                const isTabKey = event.key === "Tab" && !event.altKey && !event.ctrlKey && !event.metaKey;
                const focusedElement = document.activeElement;
                if (isTabKey && focusedElement) {
                    const container2 = event.currentTarget;
                    const [first, last] = getTabbableEdges(container2);
                    const hasTabbableElementsInside = first && last;
                    if (!hasTabbableElementsInside) {
                        if (focusedElement === container2) event.preventDefault();
                    } else {
                        if (!event.shiftKey && focusedElement === last) {
                            event.preventDefault();
                            if (loop) focus(first, { select: true });
                        } else if (event.shiftKey && focusedElement === first) {
                            event.preventDefault();
                            if (loop) focus(last, { select: true });
                        }
                    }
                }
            }, [loop, trapped, focusScope.paused]
        );
        return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(Primitive.div, __spreadProps(__spreadValues({ tabIndex: -1 }, scopeProps), { ref: composedRefs, onKeyDown: handleKeyDown }));
    });
    FocusScope.displayName = FOCUS_SCOPE_NAME;

    function focusFirst(candidates, { select = false } = {}) {
        const previouslyFocusedElement = document.activeElement;
        for (const candidate of candidates) {
            focus(candidate, { select });
            if (document.activeElement !== previouslyFocusedElement) return;
        }
    }

    function getTabbableEdges(container) {
        const candidates = getTabbableCandidates(container);
        const first = findVisible(candidates, container);
        const last = findVisible(candidates.reverse(), container);
        return [first, last];
    }

    function getTabbableCandidates(container) {
        const nodes = [];
        const walker = document.createTreeWalker(container, NodeFilter.SHOW_ELEMENT, {
            acceptNode: (node) => {
                const isHiddenInput = node.tagName === "INPUT" && node.type === "hidden";
                if (node.disabled || node.hidden || isHiddenInput) return NodeFilter.FILTER_SKIP;
                return node.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
            }
        });
        while (walker.nextNode()) nodes.push(walker.currentNode);
        return nodes;
    }

    function findVisible(elements, container) {
        for (const element of elements) {
            if (!isHidden(element, { upTo: container })) return element;
        }
    }

    function isHidden(node, { upTo }) {
        if (getComputedStyle(node).visibility === "hidden") return true;
        while (node) {
            if (upTo !== void 0 && node === upTo) return false;
            if (getComputedStyle(node).display === "none") return true;
            node = node.parentElement;
        }
        return false;
    }

    function isSelectableInput(element) {
        return element instanceof HTMLInputElement && "select" in element;
    }

    function focus(element, { select = false } = {}) {
        if (element && element.focus) {
            const previouslyFocusedElement = document.activeElement;
            element.focus({ preventScroll: true });
            if (element !== previouslyFocusedElement && isSelectableInput(element) && select)
                element.select();
        }
    }
    var focusScopesStack = createFocusScopesStack();

    function createFocusScopesStack() {
        let stack = [];
        return {
            add(focusScope) {
                const activeFocusScope = stack[0];
                if (focusScope !== activeFocusScope) {
                    activeFocusScope == null ? void 0 : activeFocusScope.pause();
                }
                stack = arrayRemove(stack, focusScope);
                stack.unshift(focusScope);
            },
            remove(focusScope) {
                var _a;
                stack = arrayRemove(stack, focusScope);
                (_a = stack[0]) == null ? void 0 : _a.resume();
            }
        };
    }

    function arrayRemove(array, item) {
        const updatedArray = [...array];
        const index2 = updatedArray.indexOf(item);
        if (index2 !== -1) {
            updatedArray.splice(index2, 1);
        }
        return updatedArray;
    }

    function removeLinks(items) {
        return items.filter((item) => item.tagName !== "A");
    }

    // node_modules/@radix-ui/react-id/dist/index.mjs
    var React14 = __toESM(require("react"), 1);
    var useReactId = React14[" useId ".trim().toString()] || (() => void 0);
    var count2 = 0;

    function useId(deterministicId) {
        const [id, setId] = React14.useState(useReactId());
        useLayoutEffect2(() => {
            if (!deterministicId) setId((reactId) => reactId != null ? reactId : String(count2++));
        }, [deterministicId]);
        return deterministicId || (id ? `radix-${id}` : "");
    }

    // node_modules/@radix-ui/react-popper/dist/index.mjs
    var React18 = __toESM(require("react"), 1);

    // node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs
    var sides = ["top", "right", "bottom", "left"];
    var min = Math.min;
    var max = Math.max;
    var round = Math.round;
    var floor = Math.floor;
    var createCoords = (v) => ({
        x: v,
        y: v
    });
    var oppositeSideMap = {
        left: "right",
        right: "left",
        bottom: "top",
        top: "bottom"
    };
    var oppositeAlignmentMap = {
        start: "end",
        end: "start"
    };

    function clamp(start, value, end) {
        return max(start, min(value, end));
    }

    function evaluate(value, param) {
        return typeof value === "function" ? value(param) : value;
    }

    function getSide(placement) {
        return placement.split("-")[0];
    }

    function getAlignment(placement) {
        return placement.split("-")[1];
    }

    function getOppositeAxis(axis) {
        return axis === "x" ? "y" : "x";
    }

    function getAxisLength(axis) {
        return axis === "y" ? "height" : "width";
    }
    var yAxisSides = /* @__PURE__ */ new Set(["top", "bottom"]);

    function getSideAxis(placement) {
        return yAxisSides.has(getSide(placement)) ? "y" : "x";
    }

    function getAlignmentAxis(placement) {
        return getOppositeAxis(getSideAxis(placement));
    }

    function getAlignmentSides(placement, rects, rtl) {
        if (rtl === void 0) {
            rtl = false;
        }
        const alignment = getAlignment(placement);
        const alignmentAxis = getAlignmentAxis(placement);
        const length = getAxisLength(alignmentAxis);
        let mainAlignmentSide = alignmentAxis === "x" ? alignment === (rtl ? "end" : "start") ? "right" : "left" : alignment === "start" ? "bottom" : "top";
        if (rects.reference[length] > rects.floating[length]) {
            mainAlignmentSide = getOppositePlacement(mainAlignmentSide);
        }
        return [mainAlignmentSide, getOppositePlacement(mainAlignmentSide)];
    }

    function getExpandedPlacements(placement) {
        const oppositePlacement = getOppositePlacement(placement);
        return [getOppositeAlignmentPlacement(placement), oppositePlacement, getOppositeAlignmentPlacement(oppositePlacement)];
    }

    function getOppositeAlignmentPlacement(placement) {
        return placement.replace(/start|end/g, (alignment) => oppositeAlignmentMap[alignment]);
    }
    var lrPlacement = ["left", "right"];
    var rlPlacement = ["right", "left"];
    var tbPlacement = ["top", "bottom"];
    var btPlacement = ["bottom", "top"];

    function getSideList(side, isStart, rtl) {
        switch (side) {
            case "top":
            case "bottom":
                if (rtl) return isStart ? rlPlacement : lrPlacement;
                return isStart ? lrPlacement : rlPlacement;
            case "left":
            case "right":
                return isStart ? tbPlacement : btPlacement;
            default:
                return [];
        }
    }

    function getOppositeAxisPlacements(placement, flipAlignment, direction, rtl) {
        const alignment = getAlignment(placement);
        let list = getSideList(getSide(placement), direction === "start", rtl);
        if (alignment) {
            list = list.map((side) => side + "-" + alignment);
            if (flipAlignment) {
                list = list.concat(list.map(getOppositeAlignmentPlacement));
            }
        }
        return list;
    }

    function getOppositePlacement(placement) {
        return placement.replace(/left|right|bottom|top/g, (side) => oppositeSideMap[side]);
    }

    function expandPaddingObject(padding) {
        return __spreadValues({
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        }, padding);
    }

    function getPaddingObject(padding) {
        return typeof padding !== "number" ? expandPaddingObject(padding) : {
            top: padding,
            right: padding,
            bottom: padding,
            left: padding
        };
    }

    function rectToClientRect(rect) {
        const {
            x,
            y,
            width,
            height
        } = rect;
        return {
            width,
            height,
            top: y,
            left: x,
            right: x + width,
            bottom: y + height,
            x,
            y
        };
    }

    // node_modules/@floating-ui/core/dist/floating-ui.core.mjs
    function computeCoordsFromPlacement(_ref, placement, rtl) {
        let {
            reference,
            floating
        } = _ref;
        const sideAxis = getSideAxis(placement);
        const alignmentAxis = getAlignmentAxis(placement);
        const alignLength = getAxisLength(alignmentAxis);
        const side = getSide(placement);
        const isVertical = sideAxis === "y";
        const commonX = reference.x + reference.width / 2 - floating.width / 2;
        const commonY = reference.y + reference.height / 2 - floating.height / 2;
        const commonAlign = reference[alignLength] / 2 - floating[alignLength] / 2;
        let coords;
        switch (side) {
            case "top":
                coords = {
                    x: commonX,
                    y: reference.y - floating.height
                };
                break;
            case "bottom":
                coords = {
                    x: commonX,
                    y: reference.y + reference.height
                };
                break;
            case "right":
                coords = {
                    x: reference.x + reference.width,
                    y: commonY
                };
                break;
            case "left":
                coords = {
                    x: reference.x - floating.width,
                    y: commonY
                };
                break;
            default:
                coords = {
                    x: reference.x,
                    y: reference.y
                };
        }
        switch (getAlignment(placement)) {
            case "start":
                coords[alignmentAxis] -= commonAlign * (rtl && isVertical ? -1 : 1);
                break;
            case "end":
                coords[alignmentAxis] += commonAlign * (rtl && isVertical ? -1 : 1);
                break;
        }
        return coords;
    }
    var computePosition = (reference, floating, config) => __async(null, null, function*() {
        const {
            placement = "bottom",
                strategy = "absolute",
                middleware = [],
                platform: platform2
        } = config;
        const validMiddleware = middleware.filter(Boolean);
        const rtl = yield platform2.isRTL == null ? void 0 : platform2.isRTL(floating);
        let rects = yield platform2.getElementRects({
            reference,
            floating,
            strategy
        });
        let {
            x,
            y
        } = computeCoordsFromPlacement(rects, placement, rtl);
        let statefulPlacement = placement;
        let middlewareData = {};
        let resetCount = 0;
        for (let i = 0; i < validMiddleware.length; i++) {
            const {
                name,
                fn
            } = validMiddleware[i];
            const {
                x: nextX,
                y: nextY,
                data,
                reset
            } = yield fn({
                x,
                y,
                initialPlacement: placement,
                placement: statefulPlacement,
                strategy,
                middlewareData,
                rects,
                platform: platform2,
                elements: {
                    reference,
                    floating
                }
            });
            x = nextX != null ? nextX : x;
            y = nextY != null ? nextY : y;
            middlewareData = __spreadProps(__spreadValues({}, middlewareData), {
                [name]: __spreadValues(__spreadValues({}, middlewareData[name]), data)
            });
            if (reset && resetCount <= 50) {
                resetCount++;
                if (typeof reset === "object") {
                    if (reset.placement) {
                        statefulPlacement = reset.placement;
                    }
                    if (reset.rects) {
                        rects = reset.rects === true ? yield platform2.getElementRects({
                            reference,
                            floating,
                            strategy
                        }) : reset.rects;
                    }
                    ({
                        x,
                        y
                    } = computeCoordsFromPlacement(rects, statefulPlacement, rtl));
                }
                i = -1;
            }
        }
        return {
            x,
            y,
            placement: statefulPlacement,
            strategy,
            middlewareData
        };
    });

    function detectOverflow(state, options) {
        return __async(this, null, function*() {
            var _await$platform$isEle;
            if (options === void 0) {
                options = {};
            }
            const {
                x,
                y,
                platform: platform2,
                rects,
                elements,
                strategy
            } = state;
            const {
                boundary = "clippingAncestors",
                    rootBoundary = "viewport",
                    elementContext = "floating",
                    altBoundary = false,
                    padding = 0
            } = evaluate(options, state);
            const paddingObject = getPaddingObject(padding);
            const altContext = elementContext === "floating" ? "reference" : "floating";
            const element = elements[altBoundary ? altContext : elementContext];
            const clippingClientRect = rectToClientRect(yield platform2.getClippingRect({
                element: ((_await$platform$isEle = yield platform2.isElement == null ? void 0 : platform2.isElement(element)) != null ? _await$platform$isEle : true) ? element : element.contextElement || (yield platform2.getDocumentElement == null ? void 0 : platform2.getDocumentElement(elements.floating)),
                boundary,
                rootBoundary,
                strategy
            }));
            const rect = elementContext === "floating" ? {
                x,
                y,
                width: rects.floating.width,
                height: rects.floating.height
            } : rects.reference;
            const offsetParent = yield platform2.getOffsetParent == null ? void 0 : platform2.getOffsetParent(elements.floating);
            const offsetScale = (yield platform2.isElement == null ? void 0 : platform2.isElement(offsetParent)) ? (yield platform2.getScale == null ? void 0 : platform2.getScale(offsetParent)) || {
                x: 1,
                y: 1
            } : {
                x: 1,
                y: 1
            };
            const elementClientRect = rectToClientRect(platform2.convertOffsetParentRelativeRectToViewportRelativeRect ? yield platform2.convertOffsetParentRelativeRectToViewportRelativeRect({
                elements,
                rect,
                offsetParent,
                strategy
            }) : rect);
            return {
                top: (clippingClientRect.top - elementClientRect.top + paddingObject.top) / offsetScale.y,
                bottom: (elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom) / offsetScale.y,
                left: (clippingClientRect.left - elementClientRect.left + paddingObject.left) / offsetScale.x,
                right: (elementClientRect.right - clippingClientRect.right + paddingObject.right) / offsetScale.x
            };
        });
    }
    var arrow = (options) => ({
        name: "arrow",
        options,
        fn(state) {
            return __async(this, null, function*() {
                const {
                    x,
                    y,
                    placement,
                    rects,
                    platform: platform2,
                    elements,
                    middlewareData
                } = state;
                const {
                    element,
                    padding = 0
                } = evaluate(options, state) || {};
                if (element == null) {
                    return {};
                }
                const paddingObject = getPaddingObject(padding);
                const coords = {
                    x,
                    y
                };
                const axis = getAlignmentAxis(placement);
                const length = getAxisLength(axis);
                const arrowDimensions = yield platform2.getDimensions(element);
                const isYAxis = axis === "y";
                const minProp = isYAxis ? "top" : "left";
                const maxProp = isYAxis ? "bottom" : "right";
                const clientProp = isYAxis ? "clientHeight" : "clientWidth";
                const endDiff = rects.reference[length] + rects.reference[axis] - coords[axis] - rects.floating[length];
                const startDiff = coords[axis] - rects.reference[axis];
                const arrowOffsetParent = yield platform2.getOffsetParent == null ? void 0 : platform2.getOffsetParent(element);
                let clientSize = arrowOffsetParent ? arrowOffsetParent[clientProp] : 0;
                if (!clientSize || !(yield platform2.isElement == null ? void 0 : platform2.isElement(arrowOffsetParent))) {
                    clientSize = elements.floating[clientProp] || rects.floating[length];
                }
                const centerToReference = endDiff / 2 - startDiff / 2;
                const largestPossiblePadding = clientSize / 2 - arrowDimensions[length] / 2 - 1;
                const minPadding = min(paddingObject[minProp], largestPossiblePadding);
                const maxPadding = min(paddingObject[maxProp], largestPossiblePadding);
                const min$1 = minPadding;
                const max2 = clientSize - arrowDimensions[length] - maxPadding;
                const center = clientSize / 2 - arrowDimensions[length] / 2 + centerToReference;
                const offset4 = clamp(min$1, center, max2);
                const shouldAddOffset = !middlewareData.arrow && getAlignment(placement) != null && center !== offset4 && rects.reference[length] / 2 - (center < min$1 ? minPadding : maxPadding) - arrowDimensions[length] / 2 < 0;
                const alignmentOffset = shouldAddOffset ? center < min$1 ? center - min$1 : center - max2 : 0;
                return {
                    [axis]: coords[axis] + alignmentOffset,
                    data: __spreadValues({
                        [axis]: offset4,
                        centerOffset: center - offset4 - alignmentOffset
                    }, shouldAddOffset && {
                        alignmentOffset
                    }),
                    reset: shouldAddOffset
                };
            });
        }
    });
    var flip = function(options) {
        if (options === void 0) {
            options = {};
        }
        return {
            name: "flip",
            options,
            fn(state) {
                return __async(this, null, function*() {
                    var _middlewareData$arrow, _middlewareData$flip;
                    const {
                        placement,
                        middlewareData,
                        rects,
                        initialPlacement,
                        platform: platform2,
                        elements
                    } = state;
                    const _a2 = evaluate(options, state),
                        {
                            mainAxis: checkMainAxis = true,
                            crossAxis: checkCrossAxis = true,
                            fallbackPlacements: specifiedFallbackPlacements,
                            fallbackStrategy = "bestFit",
                            fallbackAxisSideDirection = "none",
                            flipAlignment = true
                        } = _a2,
                        detectOverflowOptions = __objRest(_a2, [
                            "mainAxis",
                            "crossAxis",
                            "fallbackPlacements",
                            "fallbackStrategy",
                            "fallbackAxisSideDirection",
                            "flipAlignment"
                        ]);
                    if ((_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
                        return {};
                    }
                    const side = getSide(placement);
                    const initialSideAxis = getSideAxis(initialPlacement);
                    const isBasePlacement = getSide(initialPlacement) === initialPlacement;
                    const rtl = yield platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating);
                    const fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipAlignment ? [getOppositePlacement(initialPlacement)] : getExpandedPlacements(initialPlacement));
                    const hasFallbackAxisSideDirection = fallbackAxisSideDirection !== "none";
                    if (!specifiedFallbackPlacements && hasFallbackAxisSideDirection) {
                        fallbackPlacements.push(...getOppositeAxisPlacements(initialPlacement, flipAlignment, fallbackAxisSideDirection, rtl));
                    }
                    const placements2 = [initialPlacement, ...fallbackPlacements];
                    const overflow = yield detectOverflow(state, detectOverflowOptions);
                    const overflows = [];
                    let overflowsData = ((_middlewareData$flip = middlewareData.flip) == null ? void 0 : _middlewareData$flip.overflows) || [];
                    if (checkMainAxis) {
                        overflows.push(overflow[side]);
                    }
                    if (checkCrossAxis) {
                        const sides2 = getAlignmentSides(placement, rects, rtl);
                        overflows.push(overflow[sides2[0]], overflow[sides2[1]]);
                    }
                    overflowsData = [...overflowsData, {
                        placement,
                        overflows
                    }];
                    if (!overflows.every((side2) => side2 <= 0)) {
                        var _middlewareData$flip2, _overflowsData$filter;
                        const nextIndex = (((_middlewareData$flip2 = middlewareData.flip) == null ? void 0 : _middlewareData$flip2.index) || 0) + 1;
                        const nextPlacement = placements2[nextIndex];
                        if (nextPlacement) {
                            const ignoreCrossAxisOverflow = checkCrossAxis === "alignment" ? initialSideAxis !== getSideAxis(nextPlacement) : false;
                            if (!ignoreCrossAxisOverflow || // We leave the current main axis only if every placement on that axis
                                // overflows the main axis.
                                overflowsData.every((d) => d.overflows[0] > 0 && getSideAxis(d.placement) === initialSideAxis)) {
                                return {
                                    data: {
                                        index: nextIndex,
                                        overflows: overflowsData
                                    },
                                    reset: {
                                        placement: nextPlacement
                                    }
                                };
                            }
                        }
                        let resetPlacement = (_overflowsData$filter = overflowsData.filter((d) => d.overflows[0] <= 0).sort((a, b) => a.overflows[1] - b.overflows[1])[0]) == null ? void 0 : _overflowsData$filter.placement;
                        if (!resetPlacement) {
                            switch (fallbackStrategy) {
                                case "bestFit":
                                    {
                                        var _overflowsData$filter2;
                                        const placement2 = (_overflowsData$filter2 = overflowsData.filter((d) => {
                                            if (hasFallbackAxisSideDirection) {
                                                const currentSideAxis = getSideAxis(d.placement);
                                                return currentSideAxis === initialSideAxis || // Create a bias to the `y` side axis due to horizontal
                                                    // reading directions favoring greater width.
                                                    currentSideAxis === "y";
                                            }
                                            return true;
                                        }).map((d) => [d.placement, d.overflows.filter((overflow2) => overflow2 > 0).reduce((acc, overflow2) => acc + overflow2, 0)]).sort((a, b) => a[1] - b[1])[0]) == null ? void 0 : _overflowsData$filter2[0];
                                        if (placement2) {
                                            resetPlacement = placement2;
                                        }
                                        break;
                                    }
                                case "initialPlacement":
                                    resetPlacement = initialPlacement;
                                    break;
                            }
                        }
                        if (placement !== resetPlacement) {
                            return {
                                reset: {
                                    placement: resetPlacement
                                }
                            };
                        }
                    }
                    return {};
                });
            }
        };
    };

    function getSideOffsets(overflow, rect) {
        return {
            top: overflow.top - rect.height,
            right: overflow.right - rect.width,
            bottom: overflow.bottom - rect.height,
            left: overflow.left - rect.width
        };
    }

    function isAnySideFullyClipped(overflow) {
        return sides.some((side) => overflow[side] >= 0);
    }
    var hide = function(options) {
        if (options === void 0) {
            options = {};
        }
        return {
            name: "hide",
            options,
            fn(state) {
                return __async(this, null, function*() {
                    const {
                        rects
                    } = state;
                    const _a2 = evaluate(options, state),
                        {
                            strategy = "referenceHidden"
                        } = _a2,
                        detectOverflowOptions = __objRest(_a2, [
                            "strategy"
                        ]);
                    switch (strategy) {
                        case "referenceHidden":
                            {
                                const overflow = yield detectOverflow(state, __spreadProps(__spreadValues({}, detectOverflowOptions), {
                                    elementContext: "reference"
                                }));
                                const offsets = getSideOffsets(overflow, rects.reference);
                                return {
                                    data: {
                                        referenceHiddenOffsets: offsets,
                                        referenceHidden: isAnySideFullyClipped(offsets)
                                    }
                                };
                            }
                        case "escaped":
                            {
                                const overflow = yield detectOverflow(state, __spreadProps(__spreadValues({}, detectOverflowOptions), {
                                    altBoundary: true
                                }));
                                const offsets = getSideOffsets(overflow, rects.floating);
                                return {
                                    data: {
                                        escapedOffsets: offsets,
                                        escaped: isAnySideFullyClipped(offsets)
                                    }
                                };
                            }
                        default:
                            {
                                return {};
                            }
                    }
                });
            }
        };
    };
    var originSides = /* @__PURE__ */ new Set(["left", "top"]);

    function convertValueToCoords(state, options) {
        return __async(this, null, function*() {
            const {
                placement,
                platform: platform2,
                elements
            } = state;
            const rtl = yield platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating);
            const side = getSide(placement);
            const alignment = getAlignment(placement);
            const isVertical = getSideAxis(placement) === "y";
            const mainAxisMulti = originSides.has(side) ? -1 : 1;
            const crossAxisMulti = rtl && isVertical ? -1 : 1;
            const rawValue = evaluate(options, state);
            let {
                mainAxis,
                crossAxis,
                alignmentAxis
            } = typeof rawValue === "number" ? {
                mainAxis: rawValue,
                crossAxis: 0,
                alignmentAxis: null
            } : {
                mainAxis: rawValue.mainAxis || 0,
                crossAxis: rawValue.crossAxis || 0,
                alignmentAxis: rawValue.alignmentAxis
            };
            if (alignment && typeof alignmentAxis === "number") {
                crossAxis = alignment === "end" ? alignmentAxis * -1 : alignmentAxis;
            }
            return isVertical ? {
                x: crossAxis * crossAxisMulti,
                y: mainAxis * mainAxisMulti
            } : {
                x: mainAxis * mainAxisMulti,
                y: crossAxis * crossAxisMulti
            };
        });
    }
    var offset = function(options) {
        if (options === void 0) {
            options = 0;
        }
        return {
            name: "offset",
            options,
            fn(state) {
                return __async(this, null, function*() {
                    var _middlewareData$offse, _middlewareData$arrow;
                    const {
                        x,
                        y,
                        placement,
                        middlewareData
                    } = state;
                    const diffCoords = yield convertValueToCoords(state, options);
                    if (placement === ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse.placement) && (_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
                        return {};
                    }
                    return {
                        x: x + diffCoords.x,
                        y: y + diffCoords.y,
                        data: __spreadProps(__spreadValues({}, diffCoords), {
                            placement
                        })
                    };
                });
            }
        };
    };
    var shift = function(options) {
        if (options === void 0) {
            options = {};
        }
        return {
            name: "shift",
            options,
            fn(state) {
                return __async(this, null, function*() {
                    const {
                        x,
                        y,
                        placement
                    } = state;
                    const _a2 = evaluate(options, state),
                        {
                            mainAxis: checkMainAxis = true,
                            crossAxis: checkCrossAxis = false,
                            limiter = {
                                fn: (_ref) => {
                                    let {
                                        x: x2,
                                        y: y2
                                    } = _ref;
                                    return {
                                        x: x2,
                                        y: y2
                                    };
                                }
                            }
                        } = _a2,
                        detectOverflowOptions = __objRest(_a2, [
                            "mainAxis",
                            "crossAxis",
                            "limiter"
                        ]);
                    const coords = {
                        x,
                        y
                    };
                    const overflow = yield detectOverflow(state, detectOverflowOptions);
                    const crossAxis = getSideAxis(getSide(placement));
                    const mainAxis = getOppositeAxis(crossAxis);
                    let mainAxisCoord = coords[mainAxis];
                    let crossAxisCoord = coords[crossAxis];
                    if (checkMainAxis) {
                        const minSide = mainAxis === "y" ? "top" : "left";
                        const maxSide = mainAxis === "y" ? "bottom" : "right";
                        const min2 = mainAxisCoord + overflow[minSide];
                        const max2 = mainAxisCoord - overflow[maxSide];
                        mainAxisCoord = clamp(min2, mainAxisCoord, max2);
                    }
                    if (checkCrossAxis) {
                        const minSide = crossAxis === "y" ? "top" : "left";
                        const maxSide = crossAxis === "y" ? "bottom" : "right";
                        const min2 = crossAxisCoord + overflow[minSide];
                        const max2 = crossAxisCoord - overflow[maxSide];
                        crossAxisCoord = clamp(min2, crossAxisCoord, max2);
                    }
                    const limitedCoords = limiter.fn(__spreadProps(__spreadValues({}, state), {
                        [mainAxis]: mainAxisCoord,
                        [crossAxis]: crossAxisCoord
                    }));
                    return __spreadProps(__spreadValues({}, limitedCoords), {
                        data: {
                            x: limitedCoords.x - x,
                            y: limitedCoords.y - y,
                            enabled: {
                                [mainAxis]: checkMainAxis,
                                [crossAxis]: checkCrossAxis
                            }
                        }
                    });
                });
            }
        };
    };
    var limitShift = function(options) {
        if (options === void 0) {
            options = {};
        }
        return {
            options,
            fn(state) {
                const {
                    x,
                    y,
                    placement,
                    rects,
                    middlewareData
                } = state;
                const {
                    offset: offset4 = 0,
                    mainAxis: checkMainAxis = true,
                    crossAxis: checkCrossAxis = true
                } = evaluate(options, state);
                const coords = {
                    x,
                    y
                };
                const crossAxis = getSideAxis(placement);
                const mainAxis = getOppositeAxis(crossAxis);
                let mainAxisCoord = coords[mainAxis];
                let crossAxisCoord = coords[crossAxis];
                const rawOffset = evaluate(offset4, state);
                const computedOffset = typeof rawOffset === "number" ? {
                    mainAxis: rawOffset,
                    crossAxis: 0
                } : __spreadValues({
                    mainAxis: 0,
                    crossAxis: 0
                }, rawOffset);
                if (checkMainAxis) {
                    const len = mainAxis === "y" ? "height" : "width";
                    const limitMin = rects.reference[mainAxis] - rects.floating[len] + computedOffset.mainAxis;
                    const limitMax = rects.reference[mainAxis] + rects.reference[len] - computedOffset.mainAxis;
                    if (mainAxisCoord < limitMin) {
                        mainAxisCoord = limitMin;
                    } else if (mainAxisCoord > limitMax) {
                        mainAxisCoord = limitMax;
                    }
                }
                if (checkCrossAxis) {
                    var _middlewareData$offse, _middlewareData$offse2;
                    const len = mainAxis === "y" ? "width" : "height";
                    const isOriginSide = originSides.has(getSide(placement));
                    const limitMin = rects.reference[crossAxis] - rects.floating[len] + (isOriginSide ? ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse[crossAxis]) || 0 : 0) + (isOriginSide ? 0 : computedOffset.crossAxis);
                    const limitMax = rects.reference[crossAxis] + rects.reference[len] + (isOriginSide ? 0 : ((_middlewareData$offse2 = middlewareData.offset) == null ? void 0 : _middlewareData$offse2[crossAxis]) || 0) - (isOriginSide ? computedOffset.crossAxis : 0);
                    if (crossAxisCoord < limitMin) {
                        crossAxisCoord = limitMin;
                    } else if (crossAxisCoord > limitMax) {
                        crossAxisCoord = limitMax;
                    }
                }
                return {
                    [mainAxis]: mainAxisCoord,
                    [crossAxis]: crossAxisCoord
                };
            }
        };
    };
    var size = function(options) {
        if (options === void 0) {
            options = {};
        }
        return {
            name: "size",
            options,
            fn(state) {
                return __async(this, null, function*() {
                    var _state$middlewareData, _state$middlewareData2;
                    const {
                        placement,
                        rects,
                        platform: platform2,
                        elements
                    } = state;
                    const _a2 = evaluate(options, state),
                        {
                            apply = () => {}
                        } = _a2,
                        detectOverflowOptions = __objRest(_a2, [
                            "apply"
                        ]);
                    const overflow = yield detectOverflow(state, detectOverflowOptions);
                    const side = getSide(placement);
                    const alignment = getAlignment(placement);
                    const isYAxis = getSideAxis(placement) === "y";
                    const {
                        width,
                        height
                    } = rects.floating;
                    let heightSide;
                    let widthSide;
                    if (side === "top" || side === "bottom") {
                        heightSide = side;
                        widthSide = alignment === ((yield platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating)) ? "start" : "end") ? "left" : "right";
                    } else {
                        widthSide = side;
                        heightSide = alignment === "end" ? "top" : "bottom";
                    }
                    const maximumClippingHeight = height - overflow.top - overflow.bottom;
                    const maximumClippingWidth = width - overflow.left - overflow.right;
                    const overflowAvailableHeight = min(height - overflow[heightSide], maximumClippingHeight);
                    const overflowAvailableWidth = min(width - overflow[widthSide], maximumClippingWidth);
                    const noShift = !state.middlewareData.shift;
                    let availableHeight = overflowAvailableHeight;
                    let availableWidth = overflowAvailableWidth;
                    if ((_state$middlewareData = state.middlewareData.shift) != null && _state$middlewareData.enabled.x) {
                        availableWidth = maximumClippingWidth;
                    }
                    if ((_state$middlewareData2 = state.middlewareData.shift) != null && _state$middlewareData2.enabled.y) {
                        availableHeight = maximumClippingHeight;
                    }
                    if (noShift && !alignment) {
                        const xMin = max(overflow.left, 0);
                        const xMax = max(overflow.right, 0);
                        const yMin = max(overflow.top, 0);
                        const yMax = max(overflow.bottom, 0);
                        if (isYAxis) {
                            availableWidth = width - 2 * (xMin !== 0 || xMax !== 0 ? xMin + xMax : max(overflow.left, overflow.right));
                        } else {
                            availableHeight = height - 2 * (yMin !== 0 || yMax !== 0 ? yMin + yMax : max(overflow.top, overflow.bottom));
                        }
                    }
                    yield apply(__spreadProps(__spreadValues({}, state), {
                        availableWidth,
                        availableHeight
                    }));
                    const nextDimensions = yield platform2.getDimensions(elements.floating);
                    if (width !== nextDimensions.width || height !== nextDimensions.height) {
                        return {
                            reset: {
                                rects: true
                            }
                        };
                    }
                    return {};
                });
            }
        };
    };

    // node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs
    function hasWindow() {
        return typeof window !== "undefined";
    }

    function getNodeName(node) {
        if (isNode(node)) {
            return (node.nodeName || "").toLowerCase();
        }
        return "#document";
    }

    function getWindow(node) {
        var _node$ownerDocument;
        return (node == null || (_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.defaultView) || window;
    }

    function getDocumentElement(node) {
        var _ref;
        return (_ref = (isNode(node) ? node.ownerDocument : node.document) || window.document) == null ? void 0 : _ref.documentElement;
    }

    function isNode(value) {
        if (!hasWindow()) {
            return false;
        }
        return value instanceof Node || value instanceof getWindow(value).Node;
    }

    function isElement(value) {
        if (!hasWindow()) {
            return false;
        }
        return value instanceof Element || value instanceof getWindow(value).Element;
    }

    function isHTMLElement(value) {
        if (!hasWindow()) {
            return false;
        }
        return value instanceof HTMLElement || value instanceof getWindow(value).HTMLElement;
    }

    function isShadowRoot(value) {
        if (!hasWindow() || typeof ShadowRoot === "undefined") {
            return false;
        }
        return value instanceof ShadowRoot || value instanceof getWindow(value).ShadowRoot;
    }
    var invalidOverflowDisplayValues = /* @__PURE__ */ new Set(["inline", "contents"]);

    function isOverflowElement(element) {
        const {
            overflow,
            overflowX,
            overflowY,
            display
        } = getComputedStyle2(element);
        return /auto|scroll|overlay|hidden|clip/.test(overflow + overflowY + overflowX) && !invalidOverflowDisplayValues.has(display);
    }
    var tableElements = /* @__PURE__ */ new Set(["table", "td", "th"]);

    function isTableElement(element) {
        return tableElements.has(getNodeName(element));
    }
    var topLayerSelectors = [":popover-open", ":modal"];

    function isTopLayer(element) {
        return topLayerSelectors.some((selector) => {
            try {
                return element.matches(selector);
            } catch (_e) {
                return false;
            }
        });
    }
    var transformProperties = ["transform", "translate", "scale", "rotate", "perspective"];
    var willChangeValues = ["transform", "translate", "scale", "rotate", "perspective", "filter"];
    var containValues = ["paint", "layout", "strict", "content"];

    function isContainingBlock(elementOrCss) {
        const webkit = isWebKit();
        const css = isElement(elementOrCss) ? getComputedStyle2(elementOrCss) : elementOrCss;
        return transformProperties.some((value) => css[value] ? css[value] !== "none" : false) || (css.containerType ? css.containerType !== "normal" : false) || !webkit && (css.backdropFilter ? css.backdropFilter !== "none" : false) || !webkit && (css.filter ? css.filter !== "none" : false) || willChangeValues.some((value) => (css.willChange || "").includes(value)) || containValues.some((value) => (css.contain || "").includes(value));
    }

    function getContainingBlock(element) {
        let currentNode = getParentNode(element);
        while (isHTMLElement(currentNode) && !isLastTraversableNode(currentNode)) {
            if (isContainingBlock(currentNode)) {
                return currentNode;
            } else if (isTopLayer(currentNode)) {
                return null;
            }
            currentNode = getParentNode(currentNode);
        }
        return null;
    }

    function isWebKit() {
        if (typeof CSS === "undefined" || !CSS.supports) return false;
        return CSS.supports("-webkit-backdrop-filter", "none");
    }
    var lastTraversableNodeNames = /* @__PURE__ */ new Set(["html", "body", "#document"]);

    function isLastTraversableNode(node) {
        return lastTraversableNodeNames.has(getNodeName(node));
    }

    function getComputedStyle2(element) {
        return getWindow(element).getComputedStyle(element);
    }

    function getNodeScroll(element) {
        if (isElement(element)) {
            return {
                scrollLeft: element.scrollLeft,
                scrollTop: element.scrollTop
            };
        }
        return {
            scrollLeft: element.scrollX,
            scrollTop: element.scrollY
        };
    }

    function getParentNode(node) {
        if (getNodeName(node) === "html") {
            return node;
        }
        const result = (
            // Step into the shadow DOM of the parent of a slotted node.
            node.assignedSlot || // DOM Element detected.
            node.parentNode || // ShadowRoot detected.
            isShadowRoot(node) && node.host || // Fallback.
            getDocumentElement(node)
        );
        return isShadowRoot(result) ? result.host : result;
    }

    function getNearestOverflowAncestor(node) {
        const parentNode = getParentNode(node);
        if (isLastTraversableNode(parentNode)) {
            return node.ownerDocument ? node.ownerDocument.body : node.body;
        }
        if (isHTMLElement(parentNode) && isOverflowElement(parentNode)) {
            return parentNode;
        }
        return getNearestOverflowAncestor(parentNode);
    }

    function getOverflowAncestors(node, list, traverseIframes) {
        var _node$ownerDocument2;
        if (list === void 0) {
            list = [];
        }
        if (traverseIframes === void 0) {
            traverseIframes = true;
        }
        const scrollableAncestor = getNearestOverflowAncestor(node);
        const isBody = scrollableAncestor === ((_node$ownerDocument2 = node.ownerDocument) == null ? void 0 : _node$ownerDocument2.body);
        const win = getWindow(scrollableAncestor);
        if (isBody) {
            const frameElement = getFrameElement(win);
            return list.concat(win, win.visualViewport || [], isOverflowElement(scrollableAncestor) ? scrollableAncestor : [], frameElement && traverseIframes ? getOverflowAncestors(frameElement) : []);
        }
        return list.concat(scrollableAncestor, getOverflowAncestors(scrollableAncestor, [], traverseIframes));
    }

    function getFrameElement(win) {
        return win.parent && Object.getPrototypeOf(win.parent) ? win.frameElement : null;
    }

    // node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs
    function getCssDimensions(element) {
        const css = getComputedStyle2(element);
        let width = parseFloat(css.width) || 0;
        let height = parseFloat(css.height) || 0;
        const hasOffset = isHTMLElement(element);
        const offsetWidth = hasOffset ? element.offsetWidth : width;
        const offsetHeight = hasOffset ? element.offsetHeight : height;
        const shouldFallback = round(width) !== offsetWidth || round(height) !== offsetHeight;
        if (shouldFallback) {
            width = offsetWidth;
            height = offsetHeight;
        }
        return {
            width,
            height,
            $: shouldFallback
        };
    }

    function unwrapElement(element) {
        return !isElement(element) ? element.contextElement : element;
    }

    function getScale(element) {
        const domElement = unwrapElement(element);
        if (!isHTMLElement(domElement)) {
            return createCoords(1);
        }
        const rect = domElement.getBoundingClientRect();
        const {
            width,
            height,
            $
        } = getCssDimensions(domElement);
        let x = ($ ? round(rect.width) : rect.width) / width;
        let y = ($ ? round(rect.height) : rect.height) / height;
        if (!x || !Number.isFinite(x)) {
            x = 1;
        }
        if (!y || !Number.isFinite(y)) {
            y = 1;
        }
        return {
            x,
            y
        };
    }
    var noOffsets = /* @__PURE__ */ createCoords(0);

    function getVisualOffsets(element) {
        const win = getWindow(element);
        if (!isWebKit() || !win.visualViewport) {
            return noOffsets;
        }
        return {
            x: win.visualViewport.offsetLeft,
            y: win.visualViewport.offsetTop
        };
    }

    function shouldAddVisualOffsets(element, isFixed, floatingOffsetParent) {
        if (isFixed === void 0) {
            isFixed = false;
        }
        if (!floatingOffsetParent || isFixed && floatingOffsetParent !== getWindow(element)) {
            return false;
        }
        return isFixed;
    }

    function getBoundingClientRect(element, includeScale, isFixedStrategy, offsetParent) {
        if (includeScale === void 0) {
            includeScale = false;
        }
        if (isFixedStrategy === void 0) {
            isFixedStrategy = false;
        }
        const clientRect = element.getBoundingClientRect();
        const domElement = unwrapElement(element);
        let scale = createCoords(1);
        if (includeScale) {
            if (offsetParent) {
                if (isElement(offsetParent)) {
                    scale = getScale(offsetParent);
                }
            } else {
                scale = getScale(element);
            }
        }
        const visualOffsets = shouldAddVisualOffsets(domElement, isFixedStrategy, offsetParent) ? getVisualOffsets(domElement) : createCoords(0);
        let x = (clientRect.left + visualOffsets.x) / scale.x;
        let y = (clientRect.top + visualOffsets.y) / scale.y;
        let width = clientRect.width / scale.x;
        let height = clientRect.height / scale.y;
        if (domElement) {
            const win = getWindow(domElement);
            const offsetWin = offsetParent && isElement(offsetParent) ? getWindow(offsetParent) : offsetParent;
            let currentWin = win;
            let currentIFrame = getFrameElement(currentWin);
            while (currentIFrame && offsetParent && offsetWin !== currentWin) {
                const iframeScale = getScale(currentIFrame);
                const iframeRect = currentIFrame.getBoundingClientRect();
                const css = getComputedStyle2(currentIFrame);
                const left = iframeRect.left + (currentIFrame.clientLeft + parseFloat(css.paddingLeft)) * iframeScale.x;
                const top = iframeRect.top + (currentIFrame.clientTop + parseFloat(css.paddingTop)) * iframeScale.y;
                x *= iframeScale.x;
                y *= iframeScale.y;
                width *= iframeScale.x;
                height *= iframeScale.y;
                x += left;
                y += top;
                currentWin = getWindow(currentIFrame);
                currentIFrame = getFrameElement(currentWin);
            }
        }
        return rectToClientRect({
            width,
            height,
            x,
            y
        });
    }

    function getWindowScrollBarX(element, rect) {
        const leftScroll = getNodeScroll(element).scrollLeft;
        if (!rect) {
            return getBoundingClientRect(getDocumentElement(element)).left + leftScroll;
        }
        return rect.left + leftScroll;
    }

    function getHTMLOffset(documentElement, scroll, ignoreScrollbarX) {
        if (ignoreScrollbarX === void 0) {
            ignoreScrollbarX = false;
        }
        const htmlRect = documentElement.getBoundingClientRect();
        const x = htmlRect.left + scroll.scrollLeft - (ignoreScrollbarX ? 0 : (
            // RTL <body> scrollbar.
            getWindowScrollBarX(documentElement, htmlRect)
        ));
        const y = htmlRect.top + scroll.scrollTop;
        return {
            x,
            y
        };
    }

    function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
        let {
            elements,
            rect,
            offsetParent,
            strategy
        } = _ref;
        const isFixed = strategy === "fixed";
        const documentElement = getDocumentElement(offsetParent);
        const topLayer = elements ? isTopLayer(elements.floating) : false;
        if (offsetParent === documentElement || topLayer && isFixed) {
            return rect;
        }
        let scroll = {
            scrollLeft: 0,
            scrollTop: 0
        };
        let scale = createCoords(1);
        const offsets = createCoords(0);
        const isOffsetParentAnElement = isHTMLElement(offsetParent);
        if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
            if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
                scroll = getNodeScroll(offsetParent);
            }
            if (isHTMLElement(offsetParent)) {
                const offsetRect = getBoundingClientRect(offsetParent);
                scale = getScale(offsetParent);
                offsets.x = offsetRect.x + offsetParent.clientLeft;
                offsets.y = offsetRect.y + offsetParent.clientTop;
            }
        }
        const htmlOffset = documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll, true) : createCoords(0);
        return {
            width: rect.width * scale.x,
            height: rect.height * scale.y,
            x: rect.x * scale.x - scroll.scrollLeft * scale.x + offsets.x + htmlOffset.x,
            y: rect.y * scale.y - scroll.scrollTop * scale.y + offsets.y + htmlOffset.y
        };
    }

    function getClientRects(element) {
        return Array.from(element.getClientRects());
    }

    function getDocumentRect(element) {
        const html = getDocumentElement(element);
        const scroll = getNodeScroll(element);
        const body = element.ownerDocument.body;
        const width = max(html.scrollWidth, html.clientWidth, body.scrollWidth, body.clientWidth);
        const height = max(html.scrollHeight, html.clientHeight, body.scrollHeight, body.clientHeight);
        let x = -scroll.scrollLeft + getWindowScrollBarX(element);
        const y = -scroll.scrollTop;
        if (getComputedStyle2(body).direction === "rtl") {
            x += max(html.clientWidth, body.clientWidth) - width;
        }
        return {
            width,
            height,
            x,
            y
        };
    }

    function getViewportRect(element, strategy) {
        const win = getWindow(element);
        const html = getDocumentElement(element);
        const visualViewport = win.visualViewport;
        let width = html.clientWidth;
        let height = html.clientHeight;
        let x = 0;
        let y = 0;
        if (visualViewport) {
            width = visualViewport.width;
            height = visualViewport.height;
            const visualViewportBased = isWebKit();
            if (!visualViewportBased || visualViewportBased && strategy === "fixed") {
                x = visualViewport.offsetLeft;
                y = visualViewport.offsetTop;
            }
        }
        return {
            width,
            height,
            x,
            y
        };
    }
    var absoluteOrFixed = /* @__PURE__ */ new Set(["absolute", "fixed"]);

    function getInnerBoundingClientRect(element, strategy) {
        const clientRect = getBoundingClientRect(element, true, strategy === "fixed");
        const top = clientRect.top + element.clientTop;
        const left = clientRect.left + element.clientLeft;
        const scale = isHTMLElement(element) ? getScale(element) : createCoords(1);
        const width = element.clientWidth * scale.x;
        const height = element.clientHeight * scale.y;
        const x = left * scale.x;
        const y = top * scale.y;
        return {
            width,
            height,
            x,
            y
        };
    }

    function getClientRectFromClippingAncestor(element, clippingAncestor, strategy) {
        let rect;
        if (clippingAncestor === "viewport") {
            rect = getViewportRect(element, strategy);
        } else if (clippingAncestor === "document") {
            rect = getDocumentRect(getDocumentElement(element));
        } else if (isElement(clippingAncestor)) {
            rect = getInnerBoundingClientRect(clippingAncestor, strategy);
        } else {
            const visualOffsets = getVisualOffsets(element);
            rect = {
                x: clippingAncestor.x - visualOffsets.x,
                y: clippingAncestor.y - visualOffsets.y,
                width: clippingAncestor.width,
                height: clippingAncestor.height
            };
        }
        return rectToClientRect(rect);
    }

    function hasFixedPositionAncestor(element, stopNode) {
        const parentNode = getParentNode(element);
        if (parentNode === stopNode || !isElement(parentNode) || isLastTraversableNode(parentNode)) {
            return false;
        }
        return getComputedStyle2(parentNode).position === "fixed" || hasFixedPositionAncestor(parentNode, stopNode);
    }

    function getClippingElementAncestors(element, cache) {
        const cachedResult = cache.get(element);
        if (cachedResult) {
            return cachedResult;
        }
        let result = getOverflowAncestors(element, [], false).filter((el) => isElement(el) && getNodeName(el) !== "body");
        let currentContainingBlockComputedStyle = null;
        const elementIsFixed = getComputedStyle2(element).position === "fixed";
        let currentNode = elementIsFixed ? getParentNode(element) : element;
        while (isElement(currentNode) && !isLastTraversableNode(currentNode)) {
            const computedStyle = getComputedStyle2(currentNode);
            const currentNodeIsContaining = isContainingBlock(currentNode);
            if (!currentNodeIsContaining && computedStyle.position === "fixed") {
                currentContainingBlockComputedStyle = null;
            }
            const shouldDropCurrentNode = elementIsFixed ? !currentNodeIsContaining && !currentContainingBlockComputedStyle : !currentNodeIsContaining && computedStyle.position === "static" && !!currentContainingBlockComputedStyle && absoluteOrFixed.has(currentContainingBlockComputedStyle.position) || isOverflowElement(currentNode) && !currentNodeIsContaining && hasFixedPositionAncestor(element, currentNode);
            if (shouldDropCurrentNode) {
                result = result.filter((ancestor) => ancestor !== currentNode);
            } else {
                currentContainingBlockComputedStyle = computedStyle;
            }
            currentNode = getParentNode(currentNode);
        }
        cache.set(element, result);
        return result;
    }

    function getClippingRect(_ref) {
        let {
            element,
            boundary,
            rootBoundary,
            strategy
        } = _ref;
        const elementClippingAncestors = boundary === "clippingAncestors" ? isTopLayer(element) ? [] : getClippingElementAncestors(element, this._c) : [].concat(boundary);
        const clippingAncestors = [...elementClippingAncestors, rootBoundary];
        const firstClippingAncestor = clippingAncestors[0];
        const clippingRect = clippingAncestors.reduce((accRect, clippingAncestor) => {
            const rect = getClientRectFromClippingAncestor(element, clippingAncestor, strategy);
            accRect.top = max(rect.top, accRect.top);
            accRect.right = min(rect.right, accRect.right);
            accRect.bottom = min(rect.bottom, accRect.bottom);
            accRect.left = max(rect.left, accRect.left);
            return accRect;
        }, getClientRectFromClippingAncestor(element, firstClippingAncestor, strategy));
        return {
            width: clippingRect.right - clippingRect.left,
            height: clippingRect.bottom - clippingRect.top,
            x: clippingRect.left,
            y: clippingRect.top
        };
    }

    function getDimensions(element) {
        const {
            width,
            height
        } = getCssDimensions(element);
        return {
            width,
            height
        };
    }

    function getRectRelativeToOffsetParent(element, offsetParent, strategy) {
        const isOffsetParentAnElement = isHTMLElement(offsetParent);
        const documentElement = getDocumentElement(offsetParent);
        const isFixed = strategy === "fixed";
        const rect = getBoundingClientRect(element, true, isFixed, offsetParent);
        let scroll = {
            scrollLeft: 0,
            scrollTop: 0
        };
        const offsets = createCoords(0);

        function setLeftRTLScrollbarOffset() {
            offsets.x = getWindowScrollBarX(documentElement);
        }
        if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
            if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
                scroll = getNodeScroll(offsetParent);
            }
            if (isOffsetParentAnElement) {
                const offsetRect = getBoundingClientRect(offsetParent, true, isFixed, offsetParent);
                offsets.x = offsetRect.x + offsetParent.clientLeft;
                offsets.y = offsetRect.y + offsetParent.clientTop;
            } else if (documentElement) {
                setLeftRTLScrollbarOffset();
            }
        }
        if (isFixed && !isOffsetParentAnElement && documentElement) {
            setLeftRTLScrollbarOffset();
        }
        const htmlOffset = documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll) : createCoords(0);
        const x = rect.left + scroll.scrollLeft - offsets.x - htmlOffset.x;
        const y = rect.top + scroll.scrollTop - offsets.y - htmlOffset.y;
        return {
            x,
            y,
            width: rect.width,
            height: rect.height
        };
    }

    function isStaticPositioned(element) {
        return getComputedStyle2(element).position === "static";
    }

    function getTrueOffsetParent(element, polyfill) {
        if (!isHTMLElement(element) || getComputedStyle2(element).position === "fixed") {
            return null;
        }
        if (polyfill) {
            return polyfill(element);
        }
        let rawOffsetParent = element.offsetParent;
        if (getDocumentElement(element) === rawOffsetParent) {
            rawOffsetParent = rawOffsetParent.ownerDocument.body;
        }
        return rawOffsetParent;
    }

    function getOffsetParent(element, polyfill) {
        const win = getWindow(element);
        if (isTopLayer(element)) {
            return win;
        }
        if (!isHTMLElement(element)) {
            let svgOffsetParent = getParentNode(element);
            while (svgOffsetParent && !isLastTraversableNode(svgOffsetParent)) {
                if (isElement(svgOffsetParent) && !isStaticPositioned(svgOffsetParent)) {
                    return svgOffsetParent;
                }
                svgOffsetParent = getParentNode(svgOffsetParent);
            }
            return win;
        }
        let offsetParent = getTrueOffsetParent(element, polyfill);
        while (offsetParent && isTableElement(offsetParent) && isStaticPositioned(offsetParent)) {
            offsetParent = getTrueOffsetParent(offsetParent, polyfill);
        }
        if (offsetParent && isLastTraversableNode(offsetParent) && isStaticPositioned(offsetParent) && !isContainingBlock(offsetParent)) {
            return win;
        }
        return offsetParent || getContainingBlock(element) || win;
    }
    var getElementRects = function(data) {
        return __async(this, null, function*() {
            const getOffsetParentFn = this.getOffsetParent || getOffsetParent;
            const getDimensionsFn = this.getDimensions;
            const floatingDimensions = yield getDimensionsFn(data.floating);
            return {
                reference: getRectRelativeToOffsetParent(data.reference, yield getOffsetParentFn(data.floating), data.strategy),
                floating: {
                    x: 0,
                    y: 0,
                    width: floatingDimensions.width,
                    height: floatingDimensions.height
                }
            };
        });
    };

    function isRTL(element) {
        return getComputedStyle2(element).direction === "rtl";
    }
    var platform = {
        convertOffsetParentRelativeRectToViewportRelativeRect,
        getDocumentElement,
        getClippingRect,
        getOffsetParent,
        getElementRects,
        getClientRects,
        getDimensions,
        getScale,
        isElement,
        isRTL
    };

    function rectsAreEqual(a, b) {
        return a.x === b.x && a.y === b.y && a.width === b.width && a.height === b.height;
    }

    function observeMove(element, onMove) {
        let io = null;
        let timeoutId;
        const root = getDocumentElement(element);

        function cleanup() {
            var _io;
            clearTimeout(timeoutId);
            (_io = io) == null || _io.disconnect();
            io = null;
        }

        function refresh(skip, threshold) {
            if (skip === void 0) {
                skip = false;
            }
            if (threshold === void 0) {
                threshold = 1;
            }
            cleanup();
            const elementRectForRootMargin = element.getBoundingClientRect();
            const {
                left,
                top,
                width,
                height
            } = elementRectForRootMargin;
            if (!skip) {
                onMove();
            }
            if (!width || !height) {
                return;
            }
            const insetTop = floor(top);
            const insetRight = floor(root.clientWidth - (left + width));
            const insetBottom = floor(root.clientHeight - (top + height));
            const insetLeft = floor(left);
            const rootMargin = -insetTop + "px " + -insetRight + "px " + -insetBottom + "px " + -insetLeft + "px";
            const options = {
                rootMargin,
                threshold: max(0, min(1, threshold)) || 1
            };
            let isFirstUpdate = true;

            function handleObserve(entries) {
                const ratio = entries[0].intersectionRatio;
                if (ratio !== threshold) {
                    if (!isFirstUpdate) {
                        return refresh();
                    }
                    if (!ratio) {
                        timeoutId = setTimeout(() => {
                            refresh(false, 1e-7);
                        }, 1e3);
                    } else {
                        refresh(false, ratio);
                    }
                }
                if (ratio === 1 && !rectsAreEqual(elementRectForRootMargin, element.getBoundingClientRect())) {
                    refresh();
                }
                isFirstUpdate = false;
            }
            try {
                io = new IntersectionObserver(handleObserve, __spreadProps(__spreadValues({}, options), {
                    // Handle <iframe>s
                    root: root.ownerDocument
                }));
            } catch (_e) {
                io = new IntersectionObserver(handleObserve, options);
            }
            io.observe(element);
        }
        refresh(true);
        return cleanup;
    }

    function autoUpdate(reference, floating, update, options) {
        if (options === void 0) {
            options = {};
        }
        const {
            ancestorScroll = true,
                ancestorResize = true,
                elementResize = typeof ResizeObserver === "function",
                layoutShift = typeof IntersectionObserver === "function",
                animationFrame = false
        } = options;
        const referenceEl = unwrapElement(reference);
        const ancestors = ancestorScroll || ancestorResize ? [...referenceEl ? getOverflowAncestors(referenceEl) : [], ...getOverflowAncestors(floating)] : [];
        ancestors.forEach((ancestor) => {
            ancestorScroll && ancestor.addEventListener("scroll", update, {
                passive: true
            });
            ancestorResize && ancestor.addEventListener("resize", update);
        });
        const cleanupIo = referenceEl && layoutShift ? observeMove(referenceEl, update) : null;
        let reobserveFrame = -1;
        let resizeObserver = null;
        if (elementResize) {
            resizeObserver = new ResizeObserver((_ref) => {
                let [firstEntry] = _ref;
                if (firstEntry && firstEntry.target === referenceEl && resizeObserver) {
                    resizeObserver.unobserve(floating);
                    cancelAnimationFrame(reobserveFrame);
                    reobserveFrame = requestAnimationFrame(() => {
                        var _resizeObserver;
                        (_resizeObserver = resizeObserver) == null || _resizeObserver.observe(floating);
                    });
                }
                update();
            });
            if (referenceEl && !animationFrame) {
                resizeObserver.observe(referenceEl);
            }
            resizeObserver.observe(floating);
        }
        let frameId;
        let prevRefRect = animationFrame ? getBoundingClientRect(reference) : null;
        if (animationFrame) {
            frameLoop();
        }

        function frameLoop() {
            const nextRefRect = getBoundingClientRect(reference);
            if (prevRefRect && !rectsAreEqual(prevRefRect, nextRefRect)) {
                update();
            }
            prevRefRect = nextRefRect;
            frameId = requestAnimationFrame(frameLoop);
        }
        update();
        return () => {
            var _resizeObserver2;
            ancestors.forEach((ancestor) => {
                ancestorScroll && ancestor.removeEventListener("scroll", update);
                ancestorResize && ancestor.removeEventListener("resize", update);
            });
            cleanupIo == null || cleanupIo();
            (_resizeObserver2 = resizeObserver) == null || _resizeObserver2.disconnect();
            resizeObserver = null;
            if (animationFrame) {
                cancelAnimationFrame(frameId);
            }
        };
    }
    var offset2 = offset;
    var shift2 = shift;
    var flip2 = flip;
    var size2 = size;
    var hide2 = hide;
    var arrow2 = arrow;
    var limitShift2 = limitShift;
    var computePosition2 = (reference, floating, options) => {
        const cache = /* @__PURE__ */ new Map();
        const mergedOptions = __spreadValues({
            platform
        }, options);
        const platformWithCache = __spreadProps(__spreadValues({}, mergedOptions.platform), {
            _c: cache
        });
        return computePosition(reference, floating, __spreadProps(__spreadValues({}, mergedOptions), {
            platform: platformWithCache
        }));
    };

    // node_modules/@floating-ui/react-dom/dist/floating-ui.react-dom.mjs
    var React15 = __toESM(require("react"), 1);
    var import_react3 = require("react");
    var ReactDOM2 = __toESM(require("react-dom"), 1);
    var isClient = typeof document !== "undefined";
    var noop = function noop2() {};
    var index = isClient ? import_react3.useLayoutEffect : noop;

    function deepEqual(a, b) {
        if (a === b) {
            return true;
        }
        if (typeof a !== typeof b) {
            return false;
        }
        if (typeof a === "function" && a.toString() === b.toString()) {
            return true;
        }
        let length;
        let i;
        let keys;
        if (a && b && typeof a === "object") {
            if (Array.isArray(a)) {
                length = a.length;
                if (length !== b.length) return false;
                for (i = length; i-- !== 0;) {
                    if (!deepEqual(a[i], b[i])) {
                        return false;
                    }
                }
                return true;
            }
            keys = Object.keys(a);
            length = keys.length;
            if (length !== Object.keys(b).length) {
                return false;
            }
            for (i = length; i-- !== 0;) {
                if (!{}.hasOwnProperty.call(b, keys[i])) {
                    return false;
                }
            }
            for (i = length; i-- !== 0;) {
                const key = keys[i];
                if (key === "_owner" && a.$$typeof) {
                    continue;
                }
                if (!deepEqual(a[key], b[key])) {
                    return false;
                }
            }
            return true;
        }
        return a !== a && b !== b;
    }

    function getDPR(element) {
        if (typeof window === "undefined") {
            return 1;
        }
        const win = element.ownerDocument.defaultView || window;
        return win.devicePixelRatio || 1;
    }

    function roundByDPR(element, value) {
        const dpr = getDPR(element);
        return Math.round(value * dpr) / dpr;
    }

    function useLatestRef(value) {
        const ref = React15.useRef(value);
        index(() => {
            ref.current = value;
        });
        return ref;
    }

    function useFloating(options) {
        if (options === void 0) {
            options = {};
        }
        const {
            placement = "bottom",
                strategy = "absolute",
                middleware = [],
                platform: platform2,
                elements: {
                    reference: externalReference,
                    floating: externalFloating
                } = {},
                transform = true,
                whileElementsMounted,
                open
        } = options;
        const [data, setData] = React15.useState({
            x: 0,
            y: 0,
            strategy,
            placement,
            middlewareData: {},
            isPositioned: false
        });
        const [latestMiddleware, setLatestMiddleware] = React15.useState(middleware);
        if (!deepEqual(latestMiddleware, middleware)) {
            setLatestMiddleware(middleware);
        }
        const [_reference, _setReference] = React15.useState(null);
        const [_floating, _setFloating] = React15.useState(null);
        const setReference = React15.useCallback((node) => {
            if (node !== referenceRef.current) {
                referenceRef.current = node;
                _setReference(node);
            }
        }, []);
        const setFloating = React15.useCallback((node) => {
            if (node !== floatingRef.current) {
                floatingRef.current = node;
                _setFloating(node);
            }
        }, []);
        const referenceEl = externalReference || _reference;
        const floatingEl = externalFloating || _floating;
        const referenceRef = React15.useRef(null);
        const floatingRef = React15.useRef(null);
        const dataRef = React15.useRef(data);
        const hasWhileElementsMounted = whileElementsMounted != null;
        const whileElementsMountedRef = useLatestRef(whileElementsMounted);
        const platformRef = useLatestRef(platform2);
        const openRef = useLatestRef(open);
        const update = React15.useCallback(() => {
            if (!referenceRef.current || !floatingRef.current) {
                return;
            }
            const config = {
                placement,
                strategy,
                middleware: latestMiddleware
            };
            if (platformRef.current) {
                config.platform = platformRef.current;
            }
            computePosition2(referenceRef.current, floatingRef.current, config).then((data2) => {
                const fullData = __spreadProps(__spreadValues({}, data2), {
                    // The floating element's position may be recomputed while it's closed
                    // but still mounted (such as when transitioning out). To ensure
                    // `isPositioned` will be `false` initially on the next open, avoid
                    // setting it to `true` when `open === false` (must be specified).
                    isPositioned: openRef.current !== false
                });
                if (isMountedRef.current && !deepEqual(dataRef.current, fullData)) {
                    dataRef.current = fullData;
                    ReactDOM2.flushSync(() => {
                        setData(fullData);
                    });
                }
            });
        }, [latestMiddleware, placement, strategy, platformRef, openRef]);
        index(() => {
            if (open === false && dataRef.current.isPositioned) {
                dataRef.current.isPositioned = false;
                setData((data2) => __spreadProps(__spreadValues({}, data2), {
                    isPositioned: false
                }));
            }
        }, [open]);
        const isMountedRef = React15.useRef(false);
        index(() => {
            isMountedRef.current = true;
            return () => {
                isMountedRef.current = false;
            };
        }, []);
        index(() => {
            if (referenceEl) referenceRef.current = referenceEl;
            if (floatingEl) floatingRef.current = floatingEl;
            if (referenceEl && floatingEl) {
                if (whileElementsMountedRef.current) {
                    return whileElementsMountedRef.current(referenceEl, floatingEl, update);
                }
                update();
            }
        }, [referenceEl, floatingEl, update, whileElementsMountedRef, hasWhileElementsMounted]);
        const refs = React15.useMemo(() => ({
            reference: referenceRef,
            floating: floatingRef,
            setReference,
            setFloating
        }), [setReference, setFloating]);
        const elements = React15.useMemo(() => ({
            reference: referenceEl,
            floating: floatingEl
        }), [referenceEl, floatingEl]);
        const floatingStyles = React15.useMemo(() => {
            const initialStyles = {
                position: strategy,
                left: 0,
                top: 0
            };
            if (!elements.floating) {
                return initialStyles;
            }
            const x = roundByDPR(elements.floating, data.x);
            const y = roundByDPR(elements.floating, data.y);
            if (transform) {
                return __spreadValues(__spreadProps(__spreadValues({}, initialStyles), {
                    transform: "translate(" + x + "px, " + y + "px)"
                }), getDPR(elements.floating) >= 1.5 && {
                    willChange: "transform"
                });
            }
            return {
                position: strategy,
                left: x,
                top: y
            };
        }, [strategy, transform, elements.floating, data.x, data.y]);
        return React15.useMemo(() => __spreadProps(__spreadValues({}, data), {
            update,
            refs,
            elements,
            floatingStyles
        }), [data, update, refs, elements, floatingStyles]);
    }
    var arrow$1 = (options) => {
        function isRef(value) {
            return {}.hasOwnProperty.call(value, "current");
        }
        return {
            name: "arrow",
            options,
            fn(state) {
                const {
                    element,
                    padding
                } = typeof options === "function" ? options(state) : options;
                if (element && isRef(element)) {
                    if (element.current != null) {
                        return arrow2({
                            element: element.current,
                            padding
                        }).fn(state);
                    }
                    return {};
                }
                if (element) {
                    return arrow2({
                        element,
                        padding
                    }).fn(state);
                }
                return {};
            }
        };
    };
    var offset3 = (options, deps) => __spreadProps(__spreadValues({}, offset2(options)), {
        options: [options, deps]
    });
    var shift3 = (options, deps) => __spreadProps(__spreadValues({}, shift2(options)), {
        options: [options, deps]
    });
    var limitShift3 = (options, deps) => __spreadProps(__spreadValues({}, limitShift2(options)), {
        options: [options, deps]
    });
    var flip3 = (options, deps) => __spreadProps(__spreadValues({}, flip2(options)), {
        options: [options, deps]
    });
    var size3 = (options, deps) => __spreadProps(__spreadValues({}, size2(options)), {
        options: [options, deps]
    });
    var hide3 = (options, deps) => __spreadProps(__spreadValues({}, hide2(options)), {
        options: [options, deps]
    });
    var arrow3 = (options, deps) => __spreadProps(__spreadValues({}, arrow$1(options)), {
        options: [options, deps]
    });

    // node_modules/@radix-ui/react-arrow/dist/index.mjs
    var React16 = __toESM(require("react"), 1);
    var import_jsx_runtime9 = require("react/jsx-runtime");
    var NAME = "Arrow";
    var Arrow = React16.forwardRef((props, forwardedRef) => {
        const _a = props,
            { children, width = 10, height = 5 } = _a,
            arrowProps = __objRest(_a, ["children", "width", "height"]);
        return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
            Primitive.svg,
            __spreadProps(__spreadValues({}, arrowProps), {
                ref: forwardedRef,
                width,
                height,
                viewBox: "0 0 30 10",
                preserveAspectRatio: "none",
                children: props.asChild ? children : /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("polygon", { points: "0,0 30,0 15,10" })
            })
        );
    });
    Arrow.displayName = NAME;
    var Root = Arrow;

    // node_modules/@radix-ui/react-use-size/dist/index.mjs
    var React17 = __toESM(require("react"), 1);

    function useSize(element) {
        const [size4, setSize] = React17.useState(void 0);
        useLayoutEffect2(() => {
            if (element) {
                setSize({ width: element.offsetWidth, height: element.offsetHeight });
                const resizeObserver = new ResizeObserver((entries) => {
                    if (!Array.isArray(entries)) {
                        return;
                    }
                    if (!entries.length) {
                        return;
                    }
                    const entry = entries[0];
                    let width;
                    let height;
                    if ("borderBoxSize" in entry) {
                        const borderSizeEntry = entry["borderBoxSize"];
                        const borderSize = Array.isArray(borderSizeEntry) ? borderSizeEntry[0] : borderSizeEntry;
                        width = borderSize["inlineSize"];
                        height = borderSize["blockSize"];
                    } else {
                        width = element.offsetWidth;
                        height = element.offsetHeight;
                    }
                    setSize({ width, height });
                });
                resizeObserver.observe(element, { box: "border-box" });
                return () => resizeObserver.unobserve(element);
            } else {
                setSize(void 0);
            }
        }, [element]);
        return size4;
    }

    // node_modules/@radix-ui/react-popper/dist/index.mjs
    var import_jsx_runtime10 = require("react/jsx-runtime");
    var POPPER_NAME = "Popper";
    var [createPopperContext, createPopperScope] = createContextScope(POPPER_NAME);
    var [PopperProvider, usePopperContext] = createPopperContext(POPPER_NAME);
    var Popper = (props) => {
        const { __scopePopper, children } = props;
        const [anchor, setAnchor] = React18.useState(null);
        return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(PopperProvider, { scope: __scopePopper, anchor, onAnchorChange: setAnchor, children });
    };
    Popper.displayName = POPPER_NAME;
    var ANCHOR_NAME = "PopperAnchor";
    var PopperAnchor = React18.forwardRef(
        (props, forwardedRef) => {
            const _a = props,
                { __scopePopper, virtualRef } = _a,
                anchorProps = __objRest(_a, ["__scopePopper", "virtualRef"]);
            const context = usePopperContext(ANCHOR_NAME, __scopePopper);
            const ref = React18.useRef(null);
            const composedRefs = useComposedRefs(forwardedRef, ref);
            React18.useEffect(() => {
                context.onAnchorChange((virtualRef == null ? void 0 : virtualRef.current) || ref.current);
            });
            return virtualRef ? null : /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(Primitive.div, __spreadProps(__spreadValues({}, anchorProps), { ref: composedRefs }));
        }
    );
    PopperAnchor.displayName = ANCHOR_NAME;
    var CONTENT_NAME = "PopperContent";
    var [PopperContentProvider, useContentContext] = createPopperContext(CONTENT_NAME);
    var PopperContent = React18.forwardRef(
        (props, forwardedRef) => {
            var _b, _c, _d, _e, _f, _g, _h, _i;
            const _a = props,
                {
                    __scopePopper,
                    side = "bottom",
                    sideOffset = 0,
                    align = "center",
                    alignOffset = 0,
                    arrowPadding = 0,
                    avoidCollisions = true,
                    collisionBoundary = [],
                    collisionPadding: collisionPaddingProp = 0,
                    sticky = "partial",
                    hideWhenDetached = false,
                    updatePositionStrategy = "optimized",
                    onPlaced
                } = _a,
                contentProps = __objRest(_a, [
                    "__scopePopper",
                    "side",
                    "sideOffset",
                    "align",
                    "alignOffset",
                    "arrowPadding",
                    "avoidCollisions",
                    "collisionBoundary",
                    "collisionPadding",
                    "sticky",
                    "hideWhenDetached",
                    "updatePositionStrategy",
                    "onPlaced"
                ]);
            const context = usePopperContext(CONTENT_NAME, __scopePopper);
            const [content, setContent] = React18.useState(null);
            const composedRefs = useComposedRefs(forwardedRef, (node) => setContent(node));
            const [arrow4, setArrow] = React18.useState(null);
            const arrowSize = useSize(arrow4);
            const arrowWidth = (_b = arrowSize == null ? void 0 : arrowSize.width) != null ? _b : 0;
            const arrowHeight = (_c = arrowSize == null ? void 0 : arrowSize.height) != null ? _c : 0;
            const desiredPlacement = side + (align !== "center" ? "-" + align : "");
            const collisionPadding = typeof collisionPaddingProp === "number" ? collisionPaddingProp : __spreadValues({ top: 0, right: 0, bottom: 0, left: 0 }, collisionPaddingProp);
            const boundary = Array.isArray(collisionBoundary) ? collisionBoundary : [collisionBoundary];
            const hasExplicitBoundaries = boundary.length > 0;
            const detectOverflowOptions = {
                padding: collisionPadding,
                boundary: boundary.filter(isNotNull),
                // with `strategy: 'fixed'`, this is the only way to get it to respect boundaries
                altBoundary: hasExplicitBoundaries
            };
            const { refs, floatingStyles, placement, isPositioned, middlewareData } = useFloating({
                // default to `fixed` strategy so users don't have to pick and we also avoid focus scroll issues
                strategy: "fixed",
                placement: desiredPlacement,
                whileElementsMounted: (...args) => {
                    const cleanup = autoUpdate(...args, {
                        animationFrame: updatePositionStrategy === "always"
                    });
                    return cleanup;
                },
                elements: {
                    reference: context.anchor
                },
                middleware: [
                    offset3({ mainAxis: sideOffset + arrowHeight, alignmentAxis: alignOffset }),
                    avoidCollisions && shift3(__spreadValues({
                        mainAxis: true,
                        crossAxis: false,
                        limiter: sticky === "partial" ? limitShift3() : void 0
                    }, detectOverflowOptions)),
                    avoidCollisions && flip3(__spreadValues({}, detectOverflowOptions)),
                    size3(__spreadProps(__spreadValues({}, detectOverflowOptions), {
                        apply: ({ elements, rects, availableWidth, availableHeight }) => {
                            const { width: anchorWidth, height: anchorHeight } = rects.reference;
                            const contentStyle = elements.floating.style;
                            contentStyle.setProperty("--radix-popper-available-width", `${availableWidth}px`);
                            contentStyle.setProperty("--radix-popper-available-height", `${availableHeight}px`);
                            contentStyle.setProperty("--radix-popper-anchor-width", `${anchorWidth}px`);
                            contentStyle.setProperty("--radix-popper-anchor-height", `${anchorHeight}px`);
                        }
                    })),
                    arrow4 && arrow3({ element: arrow4, padding: arrowPadding }),
                    transformOrigin({ arrowWidth, arrowHeight }),
                    hideWhenDetached && hide3(__spreadValues({ strategy: "referenceHidden" }, detectOverflowOptions))
                ]
            });
            const [placedSide, placedAlign] = getSideAndAlignFromPlacement(placement);
            const handlePlaced = useCallbackRef(onPlaced);
            useLayoutEffect2(() => {
                if (isPositioned) {
                    handlePlaced == null ? void 0 : handlePlaced();
                }
            }, [isPositioned, handlePlaced]);
            const arrowX = (_d = middlewareData.arrow) == null ? void 0 : _d.x;
            const arrowY = (_e = middlewareData.arrow) == null ? void 0 : _e.y;
            const cannotCenterArrow = ((_f = middlewareData.arrow) == null ? void 0 : _f.centerOffset) !== 0;
            const [contentZIndex, setContentZIndex] = React18.useState();
            useLayoutEffect2(() => {
                if (content) setContentZIndex(window.getComputedStyle(content).zIndex);
            }, [content]);
            return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
                "div", {
                    ref: refs.setFloating,
                    "data-radix-popper-content-wrapper": "",
                    style: __spreadValues(__spreadProps(__spreadValues({}, floatingStyles), {
                        transform: isPositioned ? floatingStyles.transform : "translate(0, -200%)",
                        // keep off the page when measuring
                        minWidth: "max-content",
                        zIndex: contentZIndex,
                        ["--radix-popper-transform-origin"]: [
                            (_g = middlewareData.transformOrigin) == null ? void 0 : _g.x,
                            (_h = middlewareData.transformOrigin) == null ? void 0 : _h.y
                        ].join(" ")
                    }), ((_i = middlewareData.hide) == null ? void 0 : _i.referenceHidden) && {
                        visibility: "hidden",
                        pointerEvents: "none"
                    }),
                    dir: props.dir,
                    children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
                        PopperContentProvider, {
                            scope: __scopePopper,
                            placedSide,
                            onArrowChange: setArrow,
                            arrowX,
                            arrowY,
                            shouldHideArrow: cannotCenterArrow,
                            children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
                                Primitive.div,
                                __spreadProps(__spreadValues({
                                    "data-side": placedSide,
                                    "data-align": placedAlign
                                }, contentProps), {
                                    ref: composedRefs,
                                    style: __spreadProps(__spreadValues({}, contentProps.style), {
                                        // if the PopperContent hasn't been placed yet (not all measurements done)
                                        // we prevent animations so that users's animation don't kick in too early referring wrong sides
                                        animation: !isPositioned ? "none" : void 0
                                    })
                                })
                            )
                        }
                    )
                }
            );
        }
    );
    PopperContent.displayName = CONTENT_NAME;
    var ARROW_NAME = "PopperArrow";
    var OPPOSITE_SIDE = {
        top: "bottom",
        right: "left",
        bottom: "top",
        left: "right"
    };
    var PopperArrow = React18.forwardRef(function PopperArrow2(props, forwardedRef) {
        const _a = props,
            { __scopePopper } = _a,
            arrowProps = __objRest(_a, ["__scopePopper"]);
        const contentContext = useContentContext(ARROW_NAME, __scopePopper);
        const baseSide = OPPOSITE_SIDE[contentContext.placedSide];
        return (
            // we have to use an extra wrapper because `ResizeObserver` (used by `useSize`)
            // doesn't report size as we'd expect on SVG elements.
            // it reports their bounding box which is effectively the largest path inside the SVG.
            /* @__PURE__ */
            (0, import_jsx_runtime10.jsx)(
                "span", {
                    ref: contentContext.onArrowChange,
                    style: {
                        position: "absolute",
                        left: contentContext.arrowX,
                        top: contentContext.arrowY,
                        [baseSide]: 0,
                        transformOrigin: {
                            top: "",
                            right: "0 0",
                            bottom: "center 0",
                            left: "100% 0"
                        }[contentContext.placedSide],
                        transform: {
                            top: "translateY(100%)",
                            right: "translateY(50%) rotate(90deg) translateX(-50%)",
                            bottom: `rotate(180deg)`,
                            left: "translateY(50%) rotate(-90deg) translateX(50%)"
                        }[contentContext.placedSide],
                        visibility: contentContext.shouldHideArrow ? "hidden" : void 0
                    },
                    children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
                        Root,
                        __spreadProps(__spreadValues({}, arrowProps), {
                            ref: forwardedRef,
                            style: __spreadProps(__spreadValues({}, arrowProps.style), {
                                // ensures the element can be measured correctly (mostly for if SVG)
                                display: "block"
                            })
                        })
                    )
                }
            )
        );
    });
    PopperArrow.displayName = ARROW_NAME;

    function isNotNull(value) {
        return value !== null;
    }
    var transformOrigin = (options) => ({
        name: "transformOrigin",
        options,
        fn(data) {
            var _a, _b, _c, _d, _e;
            const { placement, rects, middlewareData } = data;
            const cannotCenterArrow = ((_a = middlewareData.arrow) == null ? void 0 : _a.centerOffset) !== 0;
            const isArrowHidden = cannotCenterArrow;
            const arrowWidth = isArrowHidden ? 0 : options.arrowWidth;
            const arrowHeight = isArrowHidden ? 0 : options.arrowHeight;
            const [placedSide, placedAlign] = getSideAndAlignFromPlacement(placement);
            const noArrowAlign = { start: "0%", center: "50%", end: "100%" }[placedAlign];
            const arrowXCenter = ((_c = (_b = middlewareData.arrow) == null ? void 0 : _b.x) != null ? _c : 0) + arrowWidth / 2;
            const arrowYCenter = ((_e = (_d = middlewareData.arrow) == null ? void 0 : _d.y) != null ? _e : 0) + arrowHeight / 2;
            let x = "";
            let y = "";
            if (placedSide === "bottom") {
                x = isArrowHidden ? noArrowAlign : `${arrowXCenter}px`;
                y = `${-arrowHeight}px`;
            } else if (placedSide === "top") {
                x = isArrowHidden ? noArrowAlign : `${arrowXCenter}px`;
                y = `${rects.floating.height + arrowHeight}px`;
            } else if (placedSide === "right") {
                x = `${-arrowHeight}px`;
                y = isArrowHidden ? noArrowAlign : `${arrowYCenter}px`;
            } else if (placedSide === "left") {
                x = `${rects.floating.width + arrowHeight}px`;
                y = isArrowHidden ? noArrowAlign : `${arrowYCenter}px`;
            }
            return { data: { x, y } };
        }
    });

    function getSideAndAlignFromPlacement(placement) {
        const [side, align = "center"] = placement.split("-");
        return [side, align];
    }
    var Root2 = Popper;
    var Anchor = PopperAnchor;
    var Content = PopperContent;
    var Arrow2 = PopperArrow;

    // node_modules/@radix-ui/react-portal/dist/index.mjs
    var React19 = __toESM(require("react"), 1);
    var import_react_dom2 = __toESM(require("react-dom"), 1);
    var import_jsx_runtime11 = require("react/jsx-runtime");
    var PORTAL_NAME = "Portal";
    var Portal = React19.forwardRef((props, forwardedRef) => {
        var _b;
        const _a = props,
            { container: containerProp } = _a,
            portalProps = __objRest(_a, ["container"]);
        const [mounted, setMounted] = React19.useState(false);
        useLayoutEffect2(() => setMounted(true), []);
        const container = containerProp || mounted && ((_b = globalThis == null ? void 0 : globalThis.document) == null ? void 0 : _b.body);
        return container ? import_react_dom2.default.createPortal( /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(Primitive.div, __spreadProps(__spreadValues({}, portalProps), { ref: forwardedRef })), container) : null;
    });
    Portal.displayName = PORTAL_NAME;

    // node_modules/@radix-ui/react-presence/dist/index.mjs
    var React24 = __toESM(require("react"), 1);
    var React20 = __toESM(require("react"), 1);

    function useStateMachine(initialState, machine) {
        return React20.useReducer((state, event) => {
            const nextState = machine[state][event];
            return nextState != null ? nextState : state;
        }, initialState);
    }
    var Presence = (props) => {
        const { present, children } = props;
        const presence = usePresence(present);
        const child = typeof children === "function" ? children({ present: presence.isPresent }) : React24.Children.only(children);
        const ref = useComposedRefs(presence.ref, getElementRef2(child));
        const forceMount = typeof children === "function";
        return forceMount || presence.isPresent ? React24.cloneElement(child, { ref }) : null;
    };
    Presence.displayName = "Presence";

    function usePresence(present) {
        const [node, setNode] = React24.useState();
        const stylesRef = React24.useRef(null);
        const prevPresentRef = React24.useRef(present);
        const prevAnimationNameRef = React24.useRef("none");
        const initialState = present ? "mounted" : "unmounted";
        const [state, send] = useStateMachine(initialState, {
            mounted: {
                UNMOUNT: "unmounted",
                ANIMATION_OUT: "unmountSuspended"
            },
            unmountSuspended: {
                MOUNT: "mounted",
                ANIMATION_END: "unmounted"
            },
            unmounted: {
                MOUNT: "mounted"
            }
        });
        React24.useEffect(() => {
            const currentAnimationName = getAnimationName(stylesRef.current);
            prevAnimationNameRef.current = state === "mounted" ? currentAnimationName : "none";
        }, [state]);
        useLayoutEffect2(() => {
            const styles = stylesRef.current;
            const wasPresent = prevPresentRef.current;
            const hasPresentChanged = wasPresent !== present;
            if (hasPresentChanged) {
                const prevAnimationName = prevAnimationNameRef.current;
                const currentAnimationName = getAnimationName(styles);
                if (present) {
                    send("MOUNT");
                } else if (currentAnimationName === "none" || (styles == null ? void 0 : styles.display) === "none") {
                    send("UNMOUNT");
                } else {
                    const isAnimating = prevAnimationName !== currentAnimationName;
                    if (wasPresent && isAnimating) {
                        send("ANIMATION_OUT");
                    } else {
                        send("UNMOUNT");
                    }
                }
                prevPresentRef.current = present;
            }
        }, [present, send]);
        useLayoutEffect2(() => {
            var _a;
            if (node) {
                let timeoutId;
                const ownerWindow = (_a = node.ownerDocument.defaultView) != null ? _a : window;
                const handleAnimationEnd = (event) => {
                    const currentAnimationName = getAnimationName(stylesRef.current);
                    const isCurrentAnimation = currentAnimationName.includes(event.animationName);
                    if (event.target === node && isCurrentAnimation) {
                        send("ANIMATION_END");
                        if (!prevPresentRef.current) {
                            const currentFillMode = node.style.animationFillMode;
                            node.style.animationFillMode = "forwards";
                            timeoutId = ownerWindow.setTimeout(() => {
                                if (node.style.animationFillMode === "forwards") {
                                    node.style.animationFillMode = currentFillMode;
                                }
                            });
                        }
                    }
                };
                const handleAnimationStart = (event) => {
                    if (event.target === node) {
                        prevAnimationNameRef.current = getAnimationName(stylesRef.current);
                    }
                };
                node.addEventListener("animationstart", handleAnimationStart);
                node.addEventListener("animationcancel", handleAnimationEnd);
                node.addEventListener("animationend", handleAnimationEnd);
                return () => {
                    ownerWindow.clearTimeout(timeoutId);
                    node.removeEventListener("animationstart", handleAnimationStart);
                    node.removeEventListener("animationcancel", handleAnimationEnd);
                    node.removeEventListener("animationend", handleAnimationEnd);
                };
            } else {
                send("ANIMATION_END");
            }
        }, [node, send]);
        return {
            isPresent: ["mounted", "unmountSuspended"].includes(state),
            ref: React24.useCallback((node2) => {
                stylesRef.current = node2 ? getComputedStyle(node2) : null;
                setNode(node2);
            }, [])
        };
    }

    function getAnimationName(styles) {
        return (styles == null ? void 0 : styles.animationName) || "none";
    }

    function getElementRef2(element) {
        var _a, _b;
        let getter = (_a = Object.getOwnPropertyDescriptor(element.props, "ref")) == null ? void 0 : _a.get;
        let mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
        if (mayWarn) {
            return element.ref;
        }
        getter = (_b = Object.getOwnPropertyDescriptor(element, "ref")) == null ? void 0 : _b.get;
        mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
        if (mayWarn) {
            return element.props.ref;
        }
        return element.props.ref || element.ref;
    }

    // node_modules/@radix-ui/react-roving-focus/dist/index.mjs
    var React21 = __toESM(require("react"), 1);
    var import_jsx_runtime12 = require("react/jsx-runtime");
    var ENTRY_FOCUS = "rovingFocusGroup.onEntryFocus";
    var EVENT_OPTIONS2 = { bubbles: false, cancelable: true };
    var GROUP_NAME = "RovingFocusGroup";
    var [Collection, useCollection, createCollectionScope] = createCollection(GROUP_NAME);
    var [createRovingFocusGroupContext, createRovingFocusGroupScope] = createContextScope(
        GROUP_NAME, [createCollectionScope]
    );
    var [RovingFocusProvider, useRovingFocusContext] = createRovingFocusGroupContext(GROUP_NAME);
    var RovingFocusGroup = React21.forwardRef(
        (props, forwardedRef) => {
            return /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(Collection.Provider, { scope: props.__scopeRovingFocusGroup, children: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(Collection.Slot, { scope: props.__scopeRovingFocusGroup, children: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(RovingFocusGroupImpl, __spreadProps(__spreadValues({}, props), { ref: forwardedRef })) }) });
        }
    );
    RovingFocusGroup.displayName = GROUP_NAME;
    var RovingFocusGroupImpl = React21.forwardRef((props, forwardedRef) => {
        const _a = props,
            {
                __scopeRovingFocusGroup,
                orientation,
                loop = false,
                dir,
                currentTabStopId: currentTabStopIdProp,
                defaultCurrentTabStopId,
                onCurrentTabStopIdChange,
                onEntryFocus,
                preventScrollOnEntryFocus = false
            } = _a,
            groupProps = __objRest(_a, [
                "__scopeRovingFocusGroup",
                "orientation",
                "loop",
                "dir",
                "currentTabStopId",
                "defaultCurrentTabStopId",
                "onCurrentTabStopIdChange",
                "onEntryFocus",
                "preventScrollOnEntryFocus"
            ]);
        const ref = React21.useRef(null);
        const composedRefs = useComposedRefs(forwardedRef, ref);
        const direction = useDirection(dir);
        const [currentTabStopId, setCurrentTabStopId] = useControllableState({
            prop: currentTabStopIdProp,
            defaultProp: defaultCurrentTabStopId != null ? defaultCurrentTabStopId : null,
            onChange: onCurrentTabStopIdChange,
            caller: GROUP_NAME
        });
        const [isTabbingBackOut, setIsTabbingBackOut] = React21.useState(false);
        const handleEntryFocus = useCallbackRef(onEntryFocus);
        const getItems = useCollection(__scopeRovingFocusGroup);
        const isClickFocusRef = React21.useRef(false);
        const [focusableItemsCount, setFocusableItemsCount] = React21.useState(0);
        React21.useEffect(() => {
            const node = ref.current;
            if (node) {
                node.addEventListener(ENTRY_FOCUS, handleEntryFocus);
                return () => node.removeEventListener(ENTRY_FOCUS, handleEntryFocus);
            }
        }, [handleEntryFocus]);
        return /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
            RovingFocusProvider, {
                scope: __scopeRovingFocusGroup,
                orientation,
                dir: direction,
                loop,
                currentTabStopId,
                onItemFocus: React21.useCallback(
                    (tabStopId) => setCurrentTabStopId(tabStopId), [setCurrentTabStopId]
                ),
                onItemShiftTab: React21.useCallback(() => setIsTabbingBackOut(true), []),
                onFocusableItemAdd: React21.useCallback(
                    () => setFocusableItemsCount((prevCount) => prevCount + 1), []
                ),
                onFocusableItemRemove: React21.useCallback(
                    () => setFocusableItemsCount((prevCount) => prevCount - 1), []
                ),
                children: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
                    Primitive.div,
                    __spreadProps(__spreadValues({
                        tabIndex: isTabbingBackOut || focusableItemsCount === 0 ? -1 : 0,
                        "data-orientation": orientation
                    }, groupProps), {
                        ref: composedRefs,
                        style: __spreadValues({ outline: "none" }, props.style),
                        onMouseDown: composeEventHandlers(props.onMouseDown, () => {
                            isClickFocusRef.current = true;
                        }),
                        onFocus: composeEventHandlers(props.onFocus, (event) => {
                            const isKeyboardFocus = !isClickFocusRef.current;
                            if (event.target === event.currentTarget && isKeyboardFocus && !isTabbingBackOut) {
                                const entryFocusEvent = new CustomEvent(ENTRY_FOCUS, EVENT_OPTIONS2);
                                event.currentTarget.dispatchEvent(entryFocusEvent);
                                if (!entryFocusEvent.defaultPrevented) {
                                    const items = getItems().filter((item) => item.focusable);
                                    const activeItem = items.find((item) => item.active);
                                    const currentItem = items.find((item) => item.id === currentTabStopId);
                                    const candidateItems = [activeItem, currentItem, ...items].filter(
                                        Boolean
                                    );
                                    const candidateNodes = candidateItems.map((item) => item.ref.current);
                                    focusFirst2(candidateNodes, preventScrollOnEntryFocus);
                                }
                            }
                            isClickFocusRef.current = false;
                        }),
                        onBlur: composeEventHandlers(props.onBlur, () => setIsTabbingBackOut(false))
                    })
                )
            }
        );
    });
    var ITEM_NAME = "RovingFocusGroupItem";
    var RovingFocusGroupItem = React21.forwardRef(
        (props, forwardedRef) => {
            const _a = props,
                {
                    __scopeRovingFocusGroup,
                    focusable = true,
                    active = false,
                    tabStopId,
                    children
                } = _a,
                itemProps = __objRest(_a, [
                    "__scopeRovingFocusGroup",
                    "focusable",
                    "active",
                    "tabStopId",
                    "children"
                ]);
            const autoId = useId();
            const id = tabStopId || autoId;
            const context = useRovingFocusContext(ITEM_NAME, __scopeRovingFocusGroup);
            const isCurrentTabStop = context.currentTabStopId === id;
            const getItems = useCollection(__scopeRovingFocusGroup);
            const { onFocusableItemAdd, onFocusableItemRemove, currentTabStopId } = context;
            React21.useEffect(() => {
                if (focusable) {
                    onFocusableItemAdd();
                    return () => onFocusableItemRemove();
                }
            }, [focusable, onFocusableItemAdd, onFocusableItemRemove]);
            return /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
                Collection.ItemSlot, {
                    scope: __scopeRovingFocusGroup,
                    id,
                    focusable,
                    active,
                    children: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
                        Primitive.span,
                        __spreadProps(__spreadValues({
                            tabIndex: isCurrentTabStop ? 0 : -1,
                            "data-orientation": context.orientation
                        }, itemProps), {
                            ref: forwardedRef,
                            onMouseDown: composeEventHandlers(props.onMouseDown, (event) => {
                                if (!focusable) event.preventDefault();
                                else context.onItemFocus(id);
                            }),
                            onFocus: composeEventHandlers(props.onFocus, () => context.onItemFocus(id)),
                            onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
                                if (event.key === "Tab" && event.shiftKey) {
                                    context.onItemShiftTab();
                                    return;
                                }
                                if (event.target !== event.currentTarget) return;
                                const focusIntent = getFocusIntent(event, context.orientation, context.dir);
                                if (focusIntent !== void 0) {
                                    if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
                                    event.preventDefault();
                                    const items = getItems().filter((item) => item.focusable);
                                    let candidateNodes = items.map((item) => item.ref.current);
                                    if (focusIntent === "last") candidateNodes.reverse();
                                    else if (focusIntent === "prev" || focusIntent === "next") {
                                        if (focusIntent === "prev") candidateNodes.reverse();
                                        const currentIndex = candidateNodes.indexOf(event.currentTarget);
                                        candidateNodes = context.loop ? wrapArray(candidateNodes, currentIndex + 1) : candidateNodes.slice(currentIndex + 1);
                                    }
                                    setTimeout(() => focusFirst2(candidateNodes));
                                }
                            }),
                            children: typeof children === "function" ? children({ isCurrentTabStop, hasTabStop: currentTabStopId != null }) : children
                        })
                    )
                }
            );
        }
    );
    RovingFocusGroupItem.displayName = ITEM_NAME;
    var MAP_KEY_TO_FOCUS_INTENT = {
        ArrowLeft: "prev",
        ArrowUp: "prev",
        ArrowRight: "next",
        ArrowDown: "next",
        PageUp: "first",
        Home: "first",
        PageDown: "last",
        End: "last"
    };

    function getDirectionAwareKey(key, dir) {
        if (dir !== "rtl") return key;
        return key === "ArrowLeft" ? "ArrowRight" : key === "ArrowRight" ? "ArrowLeft" : key;
    }

    function getFocusIntent(event, orientation, dir) {
        const key = getDirectionAwareKey(event.key, dir);
        if (orientation === "vertical" && ["ArrowLeft", "ArrowRight"].includes(key)) return void 0;
        if (orientation === "horizontal" && ["ArrowUp", "ArrowDown"].includes(key)) return void 0;
        return MAP_KEY_TO_FOCUS_INTENT[key];
    }

    function focusFirst2(candidates, preventScroll = false) {
        const PREVIOUSLY_FOCUSED_ELEMENT = document.activeElement;
        for (const candidate of candidates) {
            if (candidate === PREVIOUSLY_FOCUSED_ELEMENT) return;
            candidate.focus({ preventScroll });
            if (document.activeElement !== PREVIOUSLY_FOCUSED_ELEMENT) return;
        }
    }

    function wrapArray(array, startIndex) {
        return array.map((_, index2) => array[(startIndex + index2) % array.length]);
    }
    var Root3 = RovingFocusGroup;
    var Item = RovingFocusGroupItem;

    // node_modules/aria-hidden/dist/es2015/index.js
    var getDefaultParent = function(originalTarget) {
        if (typeof document === "undefined") {
            return null;
        }
        var sampleTarget = Array.isArray(originalTarget) ? originalTarget[0] : originalTarget;
        return sampleTarget.ownerDocument.body;
    };
    var counterMap = /* @__PURE__ */ new WeakMap();
    var uncontrolledNodes = /* @__PURE__ */ new WeakMap();
    var markerMap = {};
    var lockCount = 0;
    var unwrapHost = function(node) {
        return node && (node.host || unwrapHost(node.parentNode));
    };
    var correctTargets = function(parent, targets) {
        return targets.map(function(target) {
            if (parent.contains(target)) {
                return target;
            }
            var correctedTarget = unwrapHost(target);
            if (correctedTarget && parent.contains(correctedTarget)) {
                return correctedTarget;
            }
            console.error("aria-hidden", target, "in not contained inside", parent, ". Doing nothing");
            return null;
        }).filter(function(x) {
            return Boolean(x);
        });
    };
    var applyAttributeToOthers = function(originalTarget, parentNode, markerName, controlAttribute) {
        var targets = correctTargets(parentNode, Array.isArray(originalTarget) ? originalTarget : [originalTarget]);
        if (!markerMap[markerName]) {
            markerMap[markerName] = /* @__PURE__ */ new WeakMap();
        }
        var markerCounter = markerMap[markerName];
        var hiddenNodes = [];
        var elementsToKeep = /* @__PURE__ */ new Set();
        var elementsToStop = new Set(targets);
        var keep = function(el) {
            if (!el || elementsToKeep.has(el)) {
                return;
            }
            elementsToKeep.add(el);
            keep(el.parentNode);
        };
        targets.forEach(keep);
        var deep = function(parent) {
            if (!parent || elementsToStop.has(parent)) {
                return;
            }
            Array.prototype.forEach.call(parent.children, function(node) {
                if (elementsToKeep.has(node)) {
                    deep(node);
                } else {
                    try {
                        var attr = node.getAttribute(controlAttribute);
                        var alreadyHidden = attr !== null && attr !== "false";
                        var counterValue = (counterMap.get(node) || 0) + 1;
                        var markerValue = (markerCounter.get(node) || 0) + 1;
                        counterMap.set(node, counterValue);
                        markerCounter.set(node, markerValue);
                        hiddenNodes.push(node);
                        if (counterValue === 1 && alreadyHidden) {
                            uncontrolledNodes.set(node, true);
                        }
                        if (markerValue === 1) {
                            node.setAttribute(markerName, "true");
                        }
                        if (!alreadyHidden) {
                            node.setAttribute(controlAttribute, "true");
                        }
                    } catch (e) {
                        console.error("aria-hidden: cannot operate on ", node, e);
                    }
                }
            });
        };
        deep(parentNode);
        elementsToKeep.clear();
        lockCount++;
        return function() {
            hiddenNodes.forEach(function(node) {
                var counterValue = counterMap.get(node) - 1;
                var markerValue = markerCounter.get(node) - 1;
                counterMap.set(node, counterValue);
                markerCounter.set(node, markerValue);
                if (!counterValue) {
                    if (!uncontrolledNodes.has(node)) {
                        node.removeAttribute(controlAttribute);
                    }
                    uncontrolledNodes.delete(node);
                }
                if (!markerValue) {
                    node.removeAttribute(markerName);
                }
            });
            lockCount--;
            if (!lockCount) {
                counterMap = /* @__PURE__ */ new WeakMap();
                counterMap = /* @__PURE__ */ new WeakMap();
                uncontrolledNodes = /* @__PURE__ */ new WeakMap();
                markerMap = {};
            }
        };
    };
    var hideOthers = function(originalTarget, parentNode, markerName) {
        if (markerName === void 0) {
            markerName = "data-aria-hidden";
        }
        var targets = Array.from(Array.isArray(originalTarget) ? originalTarget : [originalTarget]);
        var activeParentNode = parentNode || getDefaultParent(originalTarget);
        if (!activeParentNode) {
            return function() {
                return null;
            };
        }
        targets.push.apply(targets, Array.from(activeParentNode.querySelectorAll("[aria-live], script")));
        return applyAttributeToOthers(targets, activeParentNode, markerName, "aria-hidden");
    };

    // node_modules/tslib/tslib.es6.mjs
    var __assign = function() {
        __assign = Object.assign || function __assign2(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __rest(s, e) {
        var t = {};
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
                t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }

    function __spreadArray(to, from, pack) {
        if (pack || arguments.length === 2)
            for (var i = 0, l = from.length, ar; i < l; i++) {
                if (ar || !(i in from)) {
                    if (!ar) ar = Array.prototype.slice.call(from, 0, i);
                    ar[i] = from[i];
                }
            }
        return to.concat(ar || Array.prototype.slice.call(from));
    }

    // node_modules/react-remove-scroll/dist/es2015/Combination.js
    var React31 = __toESM(require("react"));

    // node_modules/react-remove-scroll/dist/es2015/UI.js
    var React27 = __toESM(require("react"));

    // node_modules/react-remove-scroll-bar/dist/es2015/constants.js
    var zeroRightClassName = "right-scroll-bar-position";
    var fullWidthClassName = "width-before-scroll-bar";
    var noScrollbarsClassName = "with-scroll-bars-hidden";
    var removedBarSizeVariable = "--removed-body-scroll-bar-size";

    // node_modules/use-callback-ref/dist/es2015/assignRef.js
    function assignRef(ref, value) {
        if (typeof ref === "function") {
            ref(value);
        } else if (ref) {
            ref.current = value;
        }
        return ref;
    }

    // node_modules/use-callback-ref/dist/es2015/useRef.js
    var import_react4 = require("react");

    function useCallbackRef2(initialValue, callback) {
        var ref = (0, import_react4.useState)(function() {
            return {
                // value
                value: initialValue,
                // last callback
                callback,
                // "memoized" public interface
                facade: {
                    get current() {
                        return ref.value;
                    },
                    set current(value) {
                        var last = ref.value;
                        if (last !== value) {
                            ref.value = value;
                            ref.callback(value, last);
                        }
                    }
                }
            };
        })[0];
        ref.callback = callback;
        return ref.facade;
    }

    // node_modules/use-callback-ref/dist/es2015/useMergeRef.js
    var React25 = __toESM(require("react"));
    var useIsomorphicLayoutEffect = typeof window !== "undefined" ? React25.useLayoutEffect : React25.useEffect;
    var currentValues = /* @__PURE__ */ new WeakMap();

    function useMergeRefs(refs, defaultValue) {
        var callbackRef = useCallbackRef2(defaultValue || null, function(newValue) {
            return refs.forEach(function(ref) {
                return assignRef(ref, newValue);
            });
        });
        useIsomorphicLayoutEffect(function() {
            var oldValue = currentValues.get(callbackRef);
            if (oldValue) {
                var prevRefs_1 = new Set(oldValue);
                var nextRefs_1 = new Set(refs);
                var current_1 = callbackRef.current;
                prevRefs_1.forEach(function(ref) {
                    if (!nextRefs_1.has(ref)) {
                        assignRef(ref, null);
                    }
                });
                nextRefs_1.forEach(function(ref) {
                    if (!prevRefs_1.has(ref)) {
                        assignRef(ref, current_1);
                    }
                });
            }
            currentValues.set(callbackRef, refs);
        }, [refs]);
        return callbackRef;
    }

    // node_modules/use-sidecar/dist/es2015/medium.js
    function ItoI(a) {
        return a;
    }

    function innerCreateMedium(defaults, middleware) {
        if (middleware === void 0) {
            middleware = ItoI;
        }
        var buffer = [];
        var assigned = false;
        var medium = {
            read: function() {
                if (assigned) {
                    throw new Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");
                }
                if (buffer.length) {
                    return buffer[buffer.length - 1];
                }
                return defaults;
            },
            useMedium: function(data) {
                var item = middleware(data, assigned);
                buffer.push(item);
                return function() {
                    buffer = buffer.filter(function(x) {
                        return x !== item;
                    });
                };
            },
            assignSyncMedium: function(cb) {
                assigned = true;
                while (buffer.length) {
                    var cbs = buffer;
                    buffer = [];
                    cbs.forEach(cb);
                }
                buffer = {
                    push: function(x) {
                        return cb(x);
                    },
                    filter: function() {
                        return buffer;
                    }
                };
            },
            assignMedium: function(cb) {
                assigned = true;
                var pendingQueue = [];
                if (buffer.length) {
                    var cbs = buffer;
                    buffer = [];
                    cbs.forEach(cb);
                    pendingQueue = buffer;
                }
                var executeQueue = function() {
                    var cbs2 = pendingQueue;
                    pendingQueue = [];
                    cbs2.forEach(cb);
                };
                var cycle = function() {
                    return Promise.resolve().then(executeQueue);
                };
                cycle();
                buffer = {
                    push: function(x) {
                        pendingQueue.push(x);
                        cycle();
                    },
                    filter: function(filter) {
                        pendingQueue = pendingQueue.filter(filter);
                        return buffer;
                    }
                };
            }
        };
        return medium;
    }

    function createSidecarMedium(options) {
        if (options === void 0) {
            options = {};
        }
        var medium = innerCreateMedium(null);
        medium.options = __assign({ async: true, ssr: false }, options);
        return medium;
    }

    // node_modules/use-sidecar/dist/es2015/exports.js
    var React26 = __toESM(require("react"));
    var SideCar = function(_a) {
        var sideCar = _a.sideCar,
            rest = __rest(_a, ["sideCar"]);
        if (!sideCar) {
            throw new Error("Sidecar: please provide `sideCar` property to import the right car");
        }
        var Target = sideCar.read();
        if (!Target) {
            throw new Error("Sidecar medium not found");
        }
        return React26.createElement(Target, __assign({}, rest));
    };
    SideCar.isSideCarExport = true;

    function exportSidecar(medium, exported) {
        medium.useMedium(exported);
        return SideCar;
    }

    // node_modules/react-remove-scroll/dist/es2015/medium.js
    var effectCar = createSidecarMedium();

    // node_modules/react-remove-scroll/dist/es2015/UI.js
    var nothing = function() {
        return;
    };
    var RemoveScroll = React27.forwardRef(function(props, parentRef) {
        var ref = React27.useRef(null);
        var _a = React27.useState({
                onScrollCapture: nothing,
                onWheelCapture: nothing,
                onTouchMoveCapture: nothing
            }),
            callbacks = _a[0],
            setCallbacks = _a[1];
        var forwardProps = props.forwardProps,
            children = props.children,
            className = props.className,
            removeScrollBar = props.removeScrollBar,
            enabled = props.enabled,
            shards = props.shards,
            sideCar = props.sideCar,
            noRelative = props.noRelative,
            noIsolation = props.noIsolation,
            inert = props.inert,
            allowPinchZoom = props.allowPinchZoom,
            _b = props.as,
            Container = _b === void 0 ? "div" : _b,
            gapMode = props.gapMode,
            rest = __rest(props, ["forwardProps", "children", "className", "removeScrollBar", "enabled", "shards", "sideCar", "noRelative", "noIsolation", "inert", "allowPinchZoom", "as", "gapMode"]);
        var SideCar2 = sideCar;
        var containerRef = useMergeRefs([ref, parentRef]);
        var containerProps = __assign(__assign({}, rest), callbacks);
        return React27.createElement(
            React27.Fragment,
            null,
            enabled && React27.createElement(SideCar2, { sideCar: effectCar, removeScrollBar, shards, noRelative, noIsolation, inert, setCallbacks, allowPinchZoom: !!allowPinchZoom, lockRef: ref, gapMode }),
            forwardProps ? React27.cloneElement(React27.Children.only(children), __assign(__assign({}, containerProps), { ref: containerRef })) : React27.createElement(Container, __assign({}, containerProps, { className, ref: containerRef }), children)
        );
    });
    RemoveScroll.defaultProps = {
        enabled: true,
        removeScrollBar: true,
        inert: false
    };
    RemoveScroll.classNames = {
        fullWidth: fullWidthClassName,
        zeroRight: zeroRightClassName
    };

    // node_modules/react-remove-scroll/dist/es2015/SideEffect.js
    var React30 = __toESM(require("react"));

    // node_modules/react-remove-scroll-bar/dist/es2015/component.js
    var React29 = __toESM(require("react"));

    // node_modules/react-style-singleton/dist/es2015/hook.js
    var React28 = __toESM(require("react"));

    // node_modules/get-nonce/dist/es2015/index.js
    var currentNonce;
    var getNonce = function() {
        if (currentNonce) {
            return currentNonce;
        }
        if (typeof __webpack_nonce__ !== "undefined") {
            return __webpack_nonce__;
        }
        return void 0;
    };

    // node_modules/react-style-singleton/dist/es2015/singleton.js
    function makeStyleTag() {
        if (!document)
            return null;
        var tag = document.createElement("style");
        tag.type = "text/css";
        var nonce = getNonce();
        if (nonce) {
            tag.setAttribute("nonce", nonce);
        }
        return tag;
    }

    function injectStyles(tag, css) {
        if (tag.styleSheet) {
            tag.styleSheet.cssText = css;
        } else {
            tag.appendChild(document.createTextNode(css));
        }
    }

    function insertStyleTag(tag) {
        var head = document.head || document.getElementsByTagName("head")[0];
        head.appendChild(tag);
    }
    var stylesheetSingleton = function() {
        var counter = 0;
        var stylesheet = null;
        return {
            add: function(style) {
                if (counter == 0) {
                    if (stylesheet = makeStyleTag()) {
                        injectStyles(stylesheet, style);
                        insertStyleTag(stylesheet);
                    }
                }
                counter++;
            },
            remove: function() {
                counter--;
                if (!counter && stylesheet) {
                    stylesheet.parentNode && stylesheet.parentNode.removeChild(stylesheet);
                    stylesheet = null;
                }
            }
        };
    };

    // node_modules/react-style-singleton/dist/es2015/hook.js
    var styleHookSingleton = function() {
        var sheet = stylesheetSingleton();
        return function(styles, isDynamic) {
            React28.useEffect(function() {
                sheet.add(styles);
                return function() {
                    sheet.remove();
                };
            }, [styles && isDynamic]);
        };
    };

    // node_modules/react-style-singleton/dist/es2015/component.js
    var styleSingleton = function() {
        var useStyle = styleHookSingleton();
        var Sheet = function(_a) {
            var styles = _a.styles,
                dynamic = _a.dynamic;
            useStyle(styles, dynamic);
            return null;
        };
        return Sheet;
    };

    // node_modules/react-remove-scroll-bar/dist/es2015/utils.js
    var zeroGap = {
        left: 0,
        top: 0,
        right: 0,
        gap: 0
    };
    var parse = function(x) {
        return parseInt(x || "", 10) || 0;
    };
    var getOffset = function(gapMode) {
        var cs = window.getComputedStyle(document.body);
        var left = cs[gapMode === "padding" ? "paddingLeft" : "marginLeft"];
        var top = cs[gapMode === "padding" ? "paddingTop" : "marginTop"];
        var right = cs[gapMode === "padding" ? "paddingRight" : "marginRight"];
        return [parse(left), parse(top), parse(right)];
    };
    var getGapWidth = function(gapMode) {
        if (gapMode === void 0) {
            gapMode = "margin";
        }
        if (typeof window === "undefined") {
            return zeroGap;
        }
        var offsets = getOffset(gapMode);
        var documentWidth = document.documentElement.clientWidth;
        var windowWidth = window.innerWidth;
        return {
            left: offsets[0],
            top: offsets[1],
            right: offsets[2],
            gap: Math.max(0, windowWidth - documentWidth + offsets[2] - offsets[0])
        };
    };

    // node_modules/react-remove-scroll-bar/dist/es2015/component.js
    var Style = styleSingleton();
    var lockAttribute = "data-scroll-locked";
    var getStyles = function(_a, allowRelative, gapMode, important) {
        var left = _a.left,
            top = _a.top,
            right = _a.right,
            gap = _a.gap;
        if (gapMode === void 0) {
            gapMode = "margin";
        }
        return "\n  .".concat(noScrollbarsClassName, " {\n   overflow: hidden ").concat(important, ";\n   padding-right: ").concat(gap, "px ").concat(important, ";\n  }\n  body[").concat(lockAttribute, "] {\n    overflow: hidden ").concat(important, ";\n    overscroll-behavior: contain;\n    ").concat([
            allowRelative && "position: relative ".concat(important, ";"),
            gapMode === "margin" && "\n    padding-left: ".concat(left, "px;\n    padding-top: ").concat(top, "px;\n    padding-right: ").concat(right, "px;\n    margin-left:0;\n    margin-top:0;\n    margin-right: ").concat(gap, "px ").concat(important, ";\n    "),
            gapMode === "padding" && "padding-right: ".concat(gap, "px ").concat(important, ";")
        ].filter(Boolean).join(""), "\n  }\n  \n  .").concat(zeroRightClassName, " {\n    right: ").concat(gap, "px ").concat(important, ";\n  }\n  \n  .").concat(fullWidthClassName, " {\n    margin-right: ").concat(gap, "px ").concat(important, ";\n  }\n  \n  .").concat(zeroRightClassName, " .").concat(zeroRightClassName, " {\n    right: 0 ").concat(important, ";\n  }\n  \n  .").concat(fullWidthClassName, " .").concat(fullWidthClassName, " {\n    margin-right: 0 ").concat(important, ";\n  }\n  \n  body[").concat(lockAttribute, "] {\n    ").concat(removedBarSizeVariable, ": ").concat(gap, "px;\n  }\n");
    };
    var getCurrentUseCounter = function() {
        var counter = parseInt(document.body.getAttribute(lockAttribute) || "0", 10);
        return isFinite(counter) ? counter : 0;
    };
    var useLockAttribute = function() {
        React29.useEffect(function() {
            document.body.setAttribute(lockAttribute, (getCurrentUseCounter() + 1).toString());
            return function() {
                var newCounter = getCurrentUseCounter() - 1;
                if (newCounter <= 0) {
                    document.body.removeAttribute(lockAttribute);
                } else {
                    document.body.setAttribute(lockAttribute, newCounter.toString());
                }
            };
        }, []);
    };
    var RemoveScrollBar = function(_a) {
        var noRelative = _a.noRelative,
            noImportant = _a.noImportant,
            _b = _a.gapMode,
            gapMode = _b === void 0 ? "margin" : _b;
        useLockAttribute();
        var gap = React29.useMemo(function() {
            return getGapWidth(gapMode);
        }, [gapMode]);
        return React29.createElement(Style, { styles: getStyles(gap, !noRelative, gapMode, !noImportant ? "!important" : "") });
    };

    // node_modules/react-remove-scroll/dist/es2015/aggresiveCapture.js
    var passiveSupported = false;
    if (typeof window !== "undefined") {
        try {
            options = Object.defineProperty({}, "passive", {
                get: function() {
                    passiveSupported = true;
                    return true;
                }
            });
            window.addEventListener("test", options, options);
            window.removeEventListener("test", options, options);
        } catch (err) {
            passiveSupported = false;
        }
    }
    var options;
    var nonPassive = passiveSupported ? { passive: false } : false;

    // node_modules/react-remove-scroll/dist/es2015/handleScroll.js
    var alwaysContainsScroll = function(node) {
        return node.tagName === "TEXTAREA";
    };
    var elementCanBeScrolled = function(node, overflow) {
        if (!(node instanceof Element)) {
            return false;
        }
        var styles = window.getComputedStyle(node);
        return (
            // not-not-scrollable
            styles[overflow] !== "hidden" && // contains scroll inside self
            !(styles.overflowY === styles.overflowX && !alwaysContainsScroll(node) && styles[overflow] === "visible")
        );
    };
    var elementCouldBeVScrolled = function(node) {
        return elementCanBeScrolled(node, "overflowY");
    };
    var elementCouldBeHScrolled = function(node) {
        return elementCanBeScrolled(node, "overflowX");
    };
    var locationCouldBeScrolled = function(axis, node) {
        var ownerDocument = node.ownerDocument;
        var current = node;
        do {
            if (typeof ShadowRoot !== "undefined" && current instanceof ShadowRoot) {
                current = current.host;
            }
            var isScrollable = elementCouldBeScrolled(axis, current);
            if (isScrollable) {
                var _a = getScrollVariables(axis, current),
                    scrollHeight = _a[1],
                    clientHeight = _a[2];
                if (scrollHeight > clientHeight) {
                    return true;
                }
            }
            current = current.parentNode;
        } while (current && current !== ownerDocument.body);
        return false;
    };
    var getVScrollVariables = function(_a) {
        var scrollTop = _a.scrollTop,
            scrollHeight = _a.scrollHeight,
            clientHeight = _a.clientHeight;
        return [
            scrollTop,
            scrollHeight,
            clientHeight
        ];
    };
    var getHScrollVariables = function(_a) {
        var scrollLeft = _a.scrollLeft,
            scrollWidth = _a.scrollWidth,
            clientWidth = _a.clientWidth;
        return [
            scrollLeft,
            scrollWidth,
            clientWidth
        ];
    };
    var elementCouldBeScrolled = function(axis, node) {
        return axis === "v" ? elementCouldBeVScrolled(node) : elementCouldBeHScrolled(node);
    };
    var getScrollVariables = function(axis, node) {
        return axis === "v" ? getVScrollVariables(node) : getHScrollVariables(node);
    };
    var getDirectionFactor = function(axis, direction) {
        return axis === "h" && direction === "rtl" ? -1 : 1;
    };
    var handleScroll = function(axis, endTarget, event, sourceDelta, noOverscroll) {
        var directionFactor = getDirectionFactor(axis, window.getComputedStyle(endTarget).direction);
        var delta = directionFactor * sourceDelta;
        var target = event.target;
        var targetInLock = endTarget.contains(target);
        var shouldCancelScroll = false;
        var isDeltaPositive = delta > 0;
        var availableScroll = 0;
        var availableScrollTop = 0;
        do {
            if (!target) {
                break;
            }
            var _a = getScrollVariables(axis, target),
                position = _a[0],
                scroll_1 = _a[1],
                capacity = _a[2];
            var elementScroll = scroll_1 - capacity - directionFactor * position;
            if (position || elementScroll) {
                if (elementCouldBeScrolled(axis, target)) {
                    availableScroll += elementScroll;
                    availableScrollTop += position;
                }
            }
            var parent_1 = target.parentNode;
            target = parent_1 && parent_1.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? parent_1.host : parent_1;
        } while (
            // portaled content
            !targetInLock && target !== document.body || // self content
            targetInLock && (endTarget.contains(target) || endTarget === target)
        );
        if (isDeltaPositive && (noOverscroll && Math.abs(availableScroll) < 1 || !noOverscroll && delta > availableScroll)) {
            shouldCancelScroll = true;
        } else if (!isDeltaPositive && (noOverscroll && Math.abs(availableScrollTop) < 1 || !noOverscroll && -delta > availableScrollTop)) {
            shouldCancelScroll = true;
        }
        return shouldCancelScroll;
    };

    // node_modules/react-remove-scroll/dist/es2015/SideEffect.js
    var getTouchXY = function(event) {
        return "changedTouches" in event ? [event.changedTouches[0].clientX, event.changedTouches[0].clientY] : [0, 0];
    };
    var getDeltaXY = function(event) {
        return [event.deltaX, event.deltaY];
    };
    var extractRef = function(ref) {
        return ref && "current" in ref ? ref.current : ref;
    };
    var deltaCompare = function(x, y) {
        return x[0] === y[0] && x[1] === y[1];
    };
    var generateStyle = function(id) {
        return "\n  .block-interactivity-".concat(id, " {pointer-events: none;}\n  .allow-interactivity-").concat(id, " {pointer-events: all;}\n");
    };
    var idCounter = 0;
    var lockStack = [];

    function RemoveScrollSideCar(props) {
        var shouldPreventQueue = React30.useRef([]);
        var touchStartRef = React30.useRef([0, 0]);
        var activeAxis = React30.useRef();
        var id = React30.useState(idCounter++)[0];
        var Style2 = React30.useState(styleSingleton)[0];
        var lastProps = React30.useRef(props);
        React30.useEffect(function() {
            lastProps.current = props;
        }, [props]);
        React30.useEffect(function() {
            if (props.inert) {
                document.body.classList.add("block-interactivity-".concat(id));
                var allow_1 = __spreadArray([props.lockRef.current], (props.shards || []).map(extractRef), true).filter(Boolean);
                allow_1.forEach(function(el) {
                    return el.classList.add("allow-interactivity-".concat(id));
                });
                return function() {
                    document.body.classList.remove("block-interactivity-".concat(id));
                    allow_1.forEach(function(el) {
                        return el.classList.remove("allow-interactivity-".concat(id));
                    });
                };
            }
            return;
        }, [props.inert, props.lockRef.current, props.shards]);
        var shouldCancelEvent = React30.useCallback(function(event, parent) {
            if ("touches" in event && event.touches.length === 2 || event.type === "wheel" && event.ctrlKey) {
                return !lastProps.current.allowPinchZoom;
            }
            var touch = getTouchXY(event);
            var touchStart = touchStartRef.current;
            var deltaX = "deltaX" in event ? event.deltaX : touchStart[0] - touch[0];
            var deltaY = "deltaY" in event ? event.deltaY : touchStart[1] - touch[1];
            var currentAxis;
            var target = event.target;
            var moveDirection = Math.abs(deltaX) > Math.abs(deltaY) ? "h" : "v";
            if ("touches" in event && moveDirection === "h" && target.type === "range") {
                return false;
            }
            var canBeScrolledInMainDirection = locationCouldBeScrolled(moveDirection, target);
            if (!canBeScrolledInMainDirection) {
                return true;
            }
            if (canBeScrolledInMainDirection) {
                currentAxis = moveDirection;
            } else {
                currentAxis = moveDirection === "v" ? "h" : "v";
                canBeScrolledInMainDirection = locationCouldBeScrolled(moveDirection, target);
            }
            if (!canBeScrolledInMainDirection) {
                return false;
            }
            if (!activeAxis.current && "changedTouches" in event && (deltaX || deltaY)) {
                activeAxis.current = currentAxis;
            }
            if (!currentAxis) {
                return true;
            }
            var cancelingAxis = activeAxis.current || currentAxis;
            return handleScroll(cancelingAxis, parent, event, cancelingAxis === "h" ? deltaX : deltaY, true);
        }, []);
        var shouldPrevent = React30.useCallback(function(_event) {
            var event = _event;
            if (!lockStack.length || lockStack[lockStack.length - 1] !== Style2) {
                return;
            }
            var delta = "deltaY" in event ? getDeltaXY(event) : getTouchXY(event);
            var sourceEvent = shouldPreventQueue.current.filter(function(e) {
                return e.name === event.type && (e.target === event.target || event.target === e.shadowParent) && deltaCompare(e.delta, delta);
            })[0];
            if (sourceEvent && sourceEvent.should) {
                if (event.cancelable) {
                    event.preventDefault();
                }
                return;
            }
            if (!sourceEvent) {
                var shardNodes = (lastProps.current.shards || []).map(extractRef).filter(Boolean).filter(function(node) {
                    return node.contains(event.target);
                });
                var shouldStop = shardNodes.length > 0 ? shouldCancelEvent(event, shardNodes[0]) : !lastProps.current.noIsolation;
                if (shouldStop) {
                    if (event.cancelable) {
                        event.preventDefault();
                    }
                }
            }
        }, []);
        var shouldCancel = React30.useCallback(function(name, delta, target, should) {
            var event = { name, delta, target, should, shadowParent: getOutermostShadowParent(target) };
            shouldPreventQueue.current.push(event);
            setTimeout(function() {
                shouldPreventQueue.current = shouldPreventQueue.current.filter(function(e) {
                    return e !== event;
                });
            }, 1);
        }, []);
        var scrollTouchStart = React30.useCallback(function(event) {
            touchStartRef.current = getTouchXY(event);
            activeAxis.current = void 0;
        }, []);
        var scrollWheel = React30.useCallback(function(event) {
            shouldCancel(event.type, getDeltaXY(event), event.target, shouldCancelEvent(event, props.lockRef.current));
        }, []);
        var scrollTouchMove = React30.useCallback(function(event) {
            shouldCancel(event.type, getTouchXY(event), event.target, shouldCancelEvent(event, props.lockRef.current));
        }, []);
        React30.useEffect(function() {
            lockStack.push(Style2);
            props.setCallbacks({
                onScrollCapture: scrollWheel,
                onWheelCapture: scrollWheel,
                onTouchMoveCapture: scrollTouchMove
            });
            document.addEventListener("wheel", shouldPrevent, nonPassive);
            document.addEventListener("touchmove", shouldPrevent, nonPassive);
            document.addEventListener("touchstart", scrollTouchStart, nonPassive);
            return function() {
                lockStack = lockStack.filter(function(inst) {
                    return inst !== Style2;
                });
                document.removeEventListener("wheel", shouldPrevent, nonPassive);
                document.removeEventListener("touchmove", shouldPrevent, nonPassive);
                document.removeEventListener("touchstart", scrollTouchStart, nonPassive);
            };
        }, []);
        var removeScrollBar = props.removeScrollBar,
            inert = props.inert;
        return React30.createElement(
            React30.Fragment,
            null,
            inert ? React30.createElement(Style2, { styles: generateStyle(id) }) : null,
            removeScrollBar ? React30.createElement(RemoveScrollBar, { noRelative: props.noRelative, gapMode: props.gapMode }) : null
        );
    }

    function getOutermostShadowParent(node) {
        var shadowParent = null;
        while (node !== null) {
            if (node instanceof ShadowRoot) {
                shadowParent = node.host;
                node = node.host;
            }
            node = node.parentNode;
        }
        return shadowParent;
    }

    // node_modules/react-remove-scroll/dist/es2015/sidecar.js
    var sidecar_default = exportSidecar(effectCar, RemoveScrollSideCar);

    // node_modules/react-remove-scroll/dist/es2015/Combination.js
    var ReactRemoveScroll = React31.forwardRef(function(props, ref) {
        return React31.createElement(RemoveScroll, __assign({}, props, { ref, sideCar: sidecar_default }));
    });
    ReactRemoveScroll.classNames = RemoveScroll.classNames;
    var Combination_default = ReactRemoveScroll;

    // node_modules/@radix-ui/react-menu/dist/index.mjs
    var import_jsx_runtime13 = require("react/jsx-runtime");
    var SELECTION_KEYS = ["Enter", " "];
    var FIRST_KEYS = ["ArrowDown", "PageUp", "Home"];
    var LAST_KEYS = ["ArrowUp", "PageDown", "End"];
    var FIRST_LAST_KEYS = [...FIRST_KEYS, ...LAST_KEYS];
    var SUB_OPEN_KEYS = {
        ltr: [...SELECTION_KEYS, "ArrowRight"],
        rtl: [...SELECTION_KEYS, "ArrowLeft"]
    };
    var SUB_CLOSE_KEYS = {
        ltr: ["ArrowLeft"],
        rtl: ["ArrowRight"]
    };
    var MENU_NAME = "Menu";
    var [Collection2, useCollection2, createCollectionScope2] = createCollection(MENU_NAME);
    var [createMenuContext, createMenuScope] = createContextScope(MENU_NAME, [
        createCollectionScope2,
        createPopperScope,
        createRovingFocusGroupScope
    ]);
    var usePopperScope = createPopperScope();
    var useRovingFocusGroupScope = createRovingFocusGroupScope();
    var [MenuProvider, useMenuContext] = createMenuContext(MENU_NAME);
    var [MenuRootProvider, useMenuRootContext] = createMenuContext(MENU_NAME);
    var Menu = (props) => {
        const { __scopeMenu, open = false, children, dir, onOpenChange, modal = true } = props;
        const popperScope = usePopperScope(__scopeMenu);
        const [content, setContent] = React32.useState(null);
        const isUsingKeyboardRef = React32.useRef(false);
        const handleOpenChange = useCallbackRef(onOpenChange);
        const direction = useDirection(dir);
        React32.useEffect(() => {
            const handleKeyDown = () => {
                isUsingKeyboardRef.current = true;
                document.addEventListener("pointerdown", handlePointer, { capture: true, once: true });
                document.addEventListener("pointermove", handlePointer, { capture: true, once: true });
            };
            const handlePointer = () => isUsingKeyboardRef.current = false;
            document.addEventListener("keydown", handleKeyDown, { capture: true });
            return () => {
                document.removeEventListener("keydown", handleKeyDown, { capture: true });
                document.removeEventListener("pointerdown", handlePointer, { capture: true });
                document.removeEventListener("pointermove", handlePointer, { capture: true });
            };
        }, []);
        return /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(Root2, __spreadProps(__spreadValues({}, popperScope), {
            children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
                MenuProvider, {
                    scope: __scopeMenu,
                    open,
                    onOpenChange: handleOpenChange,
                    content,
                    onContentChange: setContent,
                    children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
                        MenuRootProvider, {
                            scope: __scopeMenu,
                            onClose: React32.useCallback(() => handleOpenChange(false), [handleOpenChange]),
                            isUsingKeyboardRef,
                            dir: direction,
                            modal,
                            children
                        }
                    )
                }
            )
        }));
    };
    Menu.displayName = MENU_NAME;
    var ANCHOR_NAME2 = "MenuAnchor";
    var MenuAnchor = React32.forwardRef(
        (props, forwardedRef) => {
            const _a = props,
                { __scopeMenu } = _a,
                anchorProps = __objRest(_a, ["__scopeMenu"]);
            const popperScope = usePopperScope(__scopeMenu);
            return /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(Anchor, __spreadProps(__spreadValues(__spreadValues({}, popperScope), anchorProps), { ref: forwardedRef }));
        }
    );
    MenuAnchor.displayName = ANCHOR_NAME2;
    var PORTAL_NAME2 = "MenuPortal";
    var [PortalProvider, usePortalContext] = createMenuContext(PORTAL_NAME2, {
        forceMount: void 0
    });
    var MenuPortal = (props) => {
        const { __scopeMenu, forceMount, children, container } = props;
        const context = useMenuContext(PORTAL_NAME2, __scopeMenu);
        return /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(PortalProvider, { scope: __scopeMenu, forceMount, children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(Presence, { present: forceMount || context.open, children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(Portal, { asChild: true, container, children }) }) });
    };
    MenuPortal.displayName = PORTAL_NAME2;
    var CONTENT_NAME2 = "MenuContent";
    var [MenuContentProvider, useMenuContentContext] = createMenuContext(CONTENT_NAME2);
    var MenuContent = React32.forwardRef(
        (props, forwardedRef) => {
            const portalContext = usePortalContext(CONTENT_NAME2, props.__scopeMenu);
            const _a = props,
                { forceMount = portalContext.forceMount } = _a,
                contentProps = __objRest(_a, ["forceMount"]);
            const context = useMenuContext(CONTENT_NAME2, props.__scopeMenu);
            const rootContext = useMenuRootContext(CONTENT_NAME2, props.__scopeMenu);
            return /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(Collection2.Provider, { scope: props.__scopeMenu, children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(Presence, { present: forceMount || context.open, children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(Collection2.Slot, { scope: props.__scopeMenu, children: rootContext.modal ? /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(MenuRootContentModal, __spreadProps(__spreadValues({}, contentProps), { ref: forwardedRef })) : /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(MenuRootContentNonModal, __spreadProps(__spreadValues({}, contentProps), { ref: forwardedRef })) }) }) });
        }
    );
    var MenuRootContentModal = React32.forwardRef(
        (props, forwardedRef) => {
            const context = useMenuContext(CONTENT_NAME2, props.__scopeMenu);
            const ref = React32.useRef(null);
            const composedRefs = useComposedRefs(forwardedRef, ref);
            React32.useEffect(() => {
                const content = ref.current;
                if (content) return hideOthers(content);
            }, []);
            return /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
                MenuContentImpl,
                __spreadProps(__spreadValues({}, props), {
                    ref: composedRefs,
                    trapFocus: context.open,
                    disableOutsidePointerEvents: context.open,
                    disableOutsideScroll: true,
                    onFocusOutside: composeEventHandlers(
                        props.onFocusOutside,
                        (event) => event.preventDefault(), { checkForDefaultPrevented: false }
                    ),
                    onDismiss: () => context.onOpenChange(false)
                })
            );
        }
    );
    var MenuRootContentNonModal = React32.forwardRef((props, forwardedRef) => {
        const context = useMenuContext(CONTENT_NAME2, props.__scopeMenu);
        return /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
            MenuContentImpl,
            __spreadProps(__spreadValues({}, props), {
                ref: forwardedRef,
                trapFocus: false,
                disableOutsidePointerEvents: false,
                disableOutsideScroll: false,
                onDismiss: () => context.onOpenChange(false)
            })
        );
    });
    var Slot2 = createSlot("MenuContent.ScrollLock");
    var MenuContentImpl = React32.forwardRef(
        (props, forwardedRef) => {
            const _a = props,
                {
                    __scopeMenu,
                    loop = false,
                    trapFocus,
                    onOpenAutoFocus,
                    onCloseAutoFocus,
                    disableOutsidePointerEvents,
                    onEntryFocus,
                    onEscapeKeyDown,
                    onPointerDownOutside,
                    onFocusOutside,
                    onInteractOutside,
                    onDismiss,
                    disableOutsideScroll
                } = _a,
                contentProps = __objRest(_a, [
                    "__scopeMenu",
                    "loop",
                    "trapFocus",
                    "onOpenAutoFocus",
                    "onCloseAutoFocus",
                    "disableOutsidePointerEvents",
                    "onEntryFocus",
                    "onEscapeKeyDown",
                    "onPointerDownOutside",
                    "onFocusOutside",
                    "onInteractOutside",
                    "onDismiss",
                    "disableOutsideScroll"
                ]);
            const context = useMenuContext(CONTENT_NAME2, __scopeMenu);
            const rootContext = useMenuRootContext(CONTENT_NAME2, __scopeMenu);
            const popperScope = usePopperScope(__scopeMenu);
            const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeMenu);
            const getItems = useCollection2(__scopeMenu);
            const [currentItemId, setCurrentItemId] = React32.useState(null);
            const contentRef = React32.useRef(null);
            const composedRefs = useComposedRefs(forwardedRef, contentRef, context.onContentChange);
            const timerRef = React32.useRef(0);
            const searchRef = React32.useRef("");
            const pointerGraceTimerRef = React32.useRef(0);
            const pointerGraceIntentRef = React32.useRef(null);
            const pointerDirRef = React32.useRef("right");
            const lastPointerXRef = React32.useRef(0);
            const ScrollLockWrapper = disableOutsideScroll ? Combination_default : React32.Fragment;
            const scrollLockWrapperProps = disableOutsideScroll ? { as: Slot2, allowPinchZoom: true } : void 0;
            const handleTypeaheadSearch = (key) => {
                var _a2, _b;
                const search = searchRef.current + key;
                const items = getItems().filter((item) => !item.disabled);
                const currentItem = document.activeElement;
                const currentMatch = (_a2 = items.find((item) => item.ref.current === currentItem)) == null ? void 0 : _a2.textValue;
                const values = items.map((item) => item.textValue);
                const nextMatch = getNextMatch(values, search, currentMatch);
                const newItem = (_b = items.find((item) => item.textValue === nextMatch)) == null ? void 0 : _b.ref.current;
                (function updateSearch(value) {
                    searchRef.current = value;
                    window.clearTimeout(timerRef.current);
                    if (value !== "") timerRef.current = window.setTimeout(() => updateSearch(""), 1e3);
                })(search);
                if (newItem) {
                    setTimeout(() => newItem.focus());
                }
            };
            React32.useEffect(() => {
                return () => window.clearTimeout(timerRef.current);
            }, []);
            useFocusGuards();
            const isPointerMovingToSubmenu = React32.useCallback((event) => {
                var _a2, _b;
                const isMovingTowards = pointerDirRef.current === ((_a2 = pointerGraceIntentRef.current) == null ? void 0 : _a2.side);
                return isMovingTowards && isPointerInGraceArea(event, (_b = pointerGraceIntentRef.current) == null ? void 0 : _b.area);
            }, []);
            return /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
                MenuContentProvider, {
                    scope: __scopeMenu,
                    searchRef,
                    onItemEnter: React32.useCallback(
                        (event) => {
                            if (isPointerMovingToSubmenu(event)) event.preventDefault();
                        }, [isPointerMovingToSubmenu]
                    ),
                    onItemLeave: React32.useCallback(
                        (event) => {
                            var _a2;
                            if (isPointerMovingToSubmenu(event)) return;
                            (_a2 = contentRef.current) == null ? void 0 : _a2.focus();
                            setCurrentItemId(null);
                        }, [isPointerMovingToSubmenu]
                    ),
                    onTriggerLeave: React32.useCallback(
                        (event) => {
                            if (isPointerMovingToSubmenu(event)) event.preventDefault();
                        }, [isPointerMovingToSubmenu]
                    ),
                    pointerGraceTimerRef,
                    onPointerGraceIntentChange: React32.useCallback((intent) => {
                        pointerGraceIntentRef.current = intent;
                    }, []),
                    children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(ScrollLockWrapper, __spreadProps(__spreadValues({}, scrollLockWrapperProps), {
                        children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
                            FocusScope, {
                                asChild: true,
                                trapped: trapFocus,
                                onMountAutoFocus: composeEventHandlers(onOpenAutoFocus, (event) => {
                                    var _a2;
                                    event.preventDefault();
                                    (_a2 = contentRef.current) == null ? void 0 : _a2.focus({ preventScroll: true });
                                }),
                                onUnmountAutoFocus: onCloseAutoFocus,
                                children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
                                    DismissableLayer, {
                                        asChild: true,
                                        disableOutsidePointerEvents,
                                        onEscapeKeyDown,
                                        onPointerDownOutside,
                                        onFocusOutside,
                                        onInteractOutside,
                                        onDismiss,
                                        children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
                                            Root3,
                                            __spreadProps(__spreadValues({
                                                asChild: true
                                            }, rovingFocusGroupScope), {
                                                dir: rootContext.dir,
                                                orientation: "vertical",
                                                loop,
                                                currentTabStopId: currentItemId,
                                                onCurrentTabStopIdChange: setCurrentItemId,
                                                onEntryFocus: composeEventHandlers(onEntryFocus, (event) => {
                                                    if (!rootContext.isUsingKeyboardRef.current) event.preventDefault();
                                                }),
                                                preventScrollOnEntryFocus: true,
                                                children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
                                                    Content,
                                                    __spreadProps(__spreadValues(__spreadValues({
                                                        role: "menu",
                                                        "aria-orientation": "vertical",
                                                        "data-state": getOpenState(context.open),
                                                        "data-radix-menu-content": "",
                                                        dir: rootContext.dir
                                                    }, popperScope), contentProps), {
                                                        ref: composedRefs,
                                                        style: __spreadValues({ outline: "none" }, contentProps.style),
                                                        onKeyDown: composeEventHandlers(contentProps.onKeyDown, (event) => {
                                                            const target = event.target;
                                                            const isKeyDownInside = target.closest("[data-radix-menu-content]") === event.currentTarget;
                                                            const isModifierKey = event.ctrlKey || event.altKey || event.metaKey;
                                                            const isCharacterKey = event.key.length === 1;
                                                            if (isKeyDownInside) {
                                                                if (event.key === "Tab") event.preventDefault();
                                                                if (!isModifierKey && isCharacterKey) handleTypeaheadSearch(event.key);
                                                            }
                                                            const content = contentRef.current;
                                                            if (event.target !== content) return;
                                                            if (!FIRST_LAST_KEYS.includes(event.key)) return;
                                                            event.preventDefault();
                                                            const items = getItems().filter((item) => !item.disabled);
                                                            const candidateNodes = items.map((item) => item.ref.current);
                                                            if (LAST_KEYS.includes(event.key)) candidateNodes.reverse();
                                                            focusFirst3(candidateNodes);
                                                        }),
                                                        onBlur: composeEventHandlers(props.onBlur, (event) => {
                                                            if (!event.currentTarget.contains(event.target)) {
                                                                window.clearTimeout(timerRef.current);
                                                                searchRef.current = "";
                                                            }
                                                        }),
                                                        onPointerMove: composeEventHandlers(
                                                            props.onPointerMove,
                                                            whenMouse((event) => {
                                                                const target = event.target;
                                                                const pointerXHasChanged = lastPointerXRef.current !== event.clientX;
                                                                if (event.currentTarget.contains(target) && pointerXHasChanged) {
                                                                    const newDir = event.clientX > lastPointerXRef.current ? "right" : "left";
                                                                    pointerDirRef.current = newDir;
                                                                    lastPointerXRef.current = event.clientX;
                                                                }
                                                            })
                                                        )
                                                    })
                                                )
                                            })
                                        )
                                    }
                                )
                            }
                        )
                    }))
                }
            );
        }
    );
    MenuContent.displayName = CONTENT_NAME2;
    var GROUP_NAME2 = "MenuGroup";
    var MenuGroup = React32.forwardRef(
        (props, forwardedRef) => {
            const _a = props,
                { __scopeMenu } = _a,
                groupProps = __objRest(_a, ["__scopeMenu"]);
            return /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(Primitive.div, __spreadProps(__spreadValues({ role: "group" }, groupProps), { ref: forwardedRef }));
        }
    );
    MenuGroup.displayName = GROUP_NAME2;
    var LABEL_NAME = "MenuLabel";
    var MenuLabel = React32.forwardRef(
        (props, forwardedRef) => {
            const _a = props,
                { __scopeMenu } = _a,
                labelProps = __objRest(_a, ["__scopeMenu"]);
            return /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(Primitive.div, __spreadProps(__spreadValues({}, labelProps), { ref: forwardedRef }));
        }
    );
    MenuLabel.displayName = LABEL_NAME;
    var ITEM_NAME2 = "MenuItem";
    var ITEM_SELECT = "menu.itemSelect";
    var MenuItem = React32.forwardRef(
        (props, forwardedRef) => {
            const _a = props,
                { disabled = false, onSelect } = _a,
                itemProps = __objRest(_a, ["disabled", "onSelect"]);
            const ref = React32.useRef(null);
            const rootContext = useMenuRootContext(ITEM_NAME2, props.__scopeMenu);
            const contentContext = useMenuContentContext(ITEM_NAME2, props.__scopeMenu);
            const composedRefs = useComposedRefs(forwardedRef, ref);
            const isPointerDownRef = React32.useRef(false);
            const handleSelect = () => {
                const menuItem = ref.current;
                if (!disabled && menuItem) {
                    const itemSelectEvent = new CustomEvent(ITEM_SELECT, { bubbles: true, cancelable: true });
                    menuItem.addEventListener(ITEM_SELECT, (event) => onSelect == null ? void 0 : onSelect(event), { once: true });
                    dispatchDiscreteCustomEvent(menuItem, itemSelectEvent);
                    if (itemSelectEvent.defaultPrevented) {
                        isPointerDownRef.current = false;
                    } else {
                        rootContext.onClose();
                    }
                }
            };
            return /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
                MenuItemImpl,
                __spreadProps(__spreadValues({}, itemProps), {
                    ref: composedRefs,
                    disabled,
                    onClick: composeEventHandlers(props.onClick, handleSelect),
                    onPointerDown: (event) => {
                        var _a2;
                        (_a2 = props.onPointerDown) == null ? void 0 : _a2.call(props, event);
                        isPointerDownRef.current = true;
                    },
                    onPointerUp: composeEventHandlers(props.onPointerUp, (event) => {
                        var _a2;
                        if (!isPointerDownRef.current)(_a2 = event.currentTarget) == null ? void 0 : _a2.click();
                    }),
                    onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
                        const isTypingAhead = contentContext.searchRef.current !== "";
                        if (disabled || isTypingAhead && event.key === " ") return;
                        if (SELECTION_KEYS.includes(event.key)) {
                            event.currentTarget.click();
                            event.preventDefault();
                        }
                    })
                })
            );
        }
    );
    MenuItem.displayName = ITEM_NAME2;
    var MenuItemImpl = React32.forwardRef(
        (props, forwardedRef) => {
            const _a = props,
                { __scopeMenu, disabled = false, textValue } = _a,
                itemProps = __objRest(_a, ["__scopeMenu", "disabled", "textValue"]);
            const contentContext = useMenuContentContext(ITEM_NAME2, __scopeMenu);
            const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeMenu);
            const ref = React32.useRef(null);
            const composedRefs = useComposedRefs(forwardedRef, ref);
            const [isFocused, setIsFocused] = React32.useState(false);
            const [textContent, setTextContent] = React32.useState("");
            React32.useEffect(() => {
                var _a2;
                const menuItem = ref.current;
                if (menuItem) {
                    setTextContent(((_a2 = menuItem.textContent) != null ? _a2 : "").trim());
                }
            }, [itemProps.children]);
            return /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
                Collection2.ItemSlot, {
                    scope: __scopeMenu,
                    disabled,
                    textValue: textValue != null ? textValue : textContent,
                    children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(Item, __spreadProps(__spreadValues({ asChild: true }, rovingFocusGroupScope), {
                        focusable: !disabled,
                        children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
                            Primitive.div,
                            __spreadProps(__spreadValues({
                                role: "menuitem",
                                "data-highlighted": isFocused ? "" : void 0,
                                "aria-disabled": disabled || void 0,
                                "data-disabled": disabled ? "" : void 0
                            }, itemProps), {
                                ref: composedRefs,
                                onPointerMove: composeEventHandlers(
                                    props.onPointerMove,
                                    whenMouse((event) => {
                                        if (disabled) {
                                            contentContext.onItemLeave(event);
                                        } else {
                                            contentContext.onItemEnter(event);
                                            if (!event.defaultPrevented) {
                                                const item = event.currentTarget;
                                                item.focus({ preventScroll: true });
                                            }
                                        }
                                    })
                                ),
                                onPointerLeave: composeEventHandlers(
                                    props.onPointerLeave,
                                    whenMouse((event) => contentContext.onItemLeave(event))
                                ),
                                onFocus: composeEventHandlers(props.onFocus, () => setIsFocused(true)),
                                onBlur: composeEventHandlers(props.onBlur, () => setIsFocused(false))
                            })
                        )
                    }))
                }
            );
        }
    );
    var CHECKBOX_ITEM_NAME = "MenuCheckboxItem";
    var MenuCheckboxItem = React32.forwardRef(
        (props, forwardedRef) => {
            const _a = props,
                { checked = false, onCheckedChange } = _a,
                checkboxItemProps = __objRest(_a, ["checked", "onCheckedChange"]);
            return /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(ItemIndicatorProvider, {
                scope: props.__scopeMenu,
                checked,
                children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
                    MenuItem,
                    __spreadProps(__spreadValues({
                        role: "menuitemcheckbox",
                        "aria-checked": isIndeterminate(checked) ? "mixed" : checked
                    }, checkboxItemProps), {
                        ref: forwardedRef,
                        "data-state": getCheckedState(checked),
                        onSelect: composeEventHandlers(
                            checkboxItemProps.onSelect,
                            () => onCheckedChange == null ? void 0 : onCheckedChange(isIndeterminate(checked) ? true : !checked), { checkForDefaultPrevented: false }
                        )
                    })
                )
            });
        }
    );
    MenuCheckboxItem.displayName = CHECKBOX_ITEM_NAME;
    var RADIO_GROUP_NAME = "MenuRadioGroup";
    var [RadioGroupProvider, useRadioGroupContext] = createMenuContext(
        RADIO_GROUP_NAME, {
            value: void 0,
            onValueChange: () => {}
        }
    );
    var MenuRadioGroup = React32.forwardRef(
        (props, forwardedRef) => {
            const _a = props,
                { value, onValueChange } = _a,
                groupProps = __objRest(_a, ["value", "onValueChange"]);
            const handleValueChange = useCallbackRef(onValueChange);
            return /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(RadioGroupProvider, { scope: props.__scopeMenu, value, onValueChange: handleValueChange, children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(MenuGroup, __spreadProps(__spreadValues({}, groupProps), { ref: forwardedRef })) });
        }
    );
    MenuRadioGroup.displayName = RADIO_GROUP_NAME;
    var RADIO_ITEM_NAME = "MenuRadioItem";
    var MenuRadioItem = React32.forwardRef(
        (props, forwardedRef) => {
            const _a = props,
                { value } = _a,
                radioItemProps = __objRest(_a, ["value"]);
            const context = useRadioGroupContext(RADIO_ITEM_NAME, props.__scopeMenu);
            const checked = value === context.value;
            return /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(ItemIndicatorProvider, {
                scope: props.__scopeMenu,
                checked,
                children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
                    MenuItem,
                    __spreadProps(__spreadValues({
                        role: "menuitemradio",
                        "aria-checked": checked
                    }, radioItemProps), {
                        ref: forwardedRef,
                        "data-state": getCheckedState(checked),
                        onSelect: composeEventHandlers(
                            radioItemProps.onSelect,
                            () => {
                                var _a2;
                                return (_a2 = context.onValueChange) == null ? void 0 : _a2.call(context, value);
                            }, { checkForDefaultPrevented: false }
                        )
                    })
                )
            });
        }
    );
    MenuRadioItem.displayName = RADIO_ITEM_NAME;
    var ITEM_INDICATOR_NAME = "MenuItemIndicator";
    var [ItemIndicatorProvider, useItemIndicatorContext] = createMenuContext(
        ITEM_INDICATOR_NAME, { checked: false }
    );
    var MenuItemIndicator = React32.forwardRef(
        (props, forwardedRef) => {
            const _a = props,
                { __scopeMenu, forceMount } = _a,
                itemIndicatorProps = __objRest(_a, ["__scopeMenu", "forceMount"]);
            const indicatorContext = useItemIndicatorContext(ITEM_INDICATOR_NAME, __scopeMenu);
            return /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
                Presence, {
                    present: forceMount || isIndeterminate(indicatorContext.checked) || indicatorContext.checked === true,
                    children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
                        Primitive.span,
                        __spreadProps(__spreadValues({}, itemIndicatorProps), {
                            ref: forwardedRef,
                            "data-state": getCheckedState(indicatorContext.checked)
                        })
                    )
                }
            );
        }
    );
    MenuItemIndicator.displayName = ITEM_INDICATOR_NAME;
    var SEPARATOR_NAME = "MenuSeparator";
    var MenuSeparator = React32.forwardRef(
        (props, forwardedRef) => {
            const _a = props,
                { __scopeMenu } = _a,
                separatorProps = __objRest(_a, ["__scopeMenu"]);
            return /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
                Primitive.div,
                __spreadProps(__spreadValues({
                    role: "separator",
                    "aria-orientation": "horizontal"
                }, separatorProps), {
                    ref: forwardedRef
                })
            );
        }
    );
    MenuSeparator.displayName = SEPARATOR_NAME;
    var ARROW_NAME2 = "MenuArrow";
    var MenuArrow = React32.forwardRef(
        (props, forwardedRef) => {
            const _a = props,
                { __scopeMenu } = _a,
                arrowProps = __objRest(_a, ["__scopeMenu"]);
            const popperScope = usePopperScope(__scopeMenu);
            return /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(Arrow2, __spreadProps(__spreadValues(__spreadValues({}, popperScope), arrowProps), { ref: forwardedRef }));
        }
    );
    MenuArrow.displayName = ARROW_NAME2;
    var SUB_NAME = "MenuSub";
    var [MenuSubProvider, useMenuSubContext] = createMenuContext(SUB_NAME);
    var MenuSub = (props) => {
        const { __scopeMenu, children, open = false, onOpenChange } = props;
        const parentMenuContext = useMenuContext(SUB_NAME, __scopeMenu);
        const popperScope = usePopperScope(__scopeMenu);
        const [trigger, setTrigger] = React32.useState(null);
        const [content, setContent] = React32.useState(null);
        const handleOpenChange = useCallbackRef(onOpenChange);
        React32.useEffect(() => {
            if (parentMenuContext.open === false) handleOpenChange(false);
            return () => handleOpenChange(false);
        }, [parentMenuContext.open, handleOpenChange]);
        return /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(Root2, __spreadProps(__spreadValues({}, popperScope), {
            children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
                MenuProvider, {
                    scope: __scopeMenu,
                    open,
                    onOpenChange: handleOpenChange,
                    content,
                    onContentChange: setContent,
                    children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
                        MenuSubProvider, {
                            scope: __scopeMenu,
                            contentId: useId(),
                            triggerId: useId(),
                            trigger,
                            onTriggerChange: setTrigger,
                            children
                        }
                    )
                }
            )
        }));
    };
    MenuSub.displayName = SUB_NAME;
    var SUB_TRIGGER_NAME = "MenuSubTrigger";
    var MenuSubTrigger = React32.forwardRef(
        (props, forwardedRef) => {
            const context = useMenuContext(SUB_TRIGGER_NAME, props.__scopeMenu);
            const rootContext = useMenuRootContext(SUB_TRIGGER_NAME, props.__scopeMenu);
            const subContext = useMenuSubContext(SUB_TRIGGER_NAME, props.__scopeMenu);
            const contentContext = useMenuContentContext(SUB_TRIGGER_NAME, props.__scopeMenu);
            const openTimerRef = React32.useRef(null);
            const { pointerGraceTimerRef, onPointerGraceIntentChange } = contentContext;
            const scope = { __scopeMenu: props.__scopeMenu };
            const clearOpenTimer = React32.useCallback(() => {
                if (openTimerRef.current) window.clearTimeout(openTimerRef.current);
                openTimerRef.current = null;
            }, []);
            React32.useEffect(() => clearOpenTimer, [clearOpenTimer]);
            React32.useEffect(() => {
                const pointerGraceTimer = pointerGraceTimerRef.current;
                return () => {
                    window.clearTimeout(pointerGraceTimer);
                    onPointerGraceIntentChange(null);
                };
            }, [pointerGraceTimerRef, onPointerGraceIntentChange]);
            return /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(MenuAnchor, __spreadProps(__spreadValues({ asChild: true }, scope), {
                children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
                    MenuItemImpl,
                    __spreadProps(__spreadValues({
                        id: subContext.triggerId,
                        "aria-haspopup": "menu",
                        "aria-expanded": context.open,
                        "aria-controls": subContext.contentId,
                        "data-state": getOpenState(context.open)
                    }, props), {
                        ref: composeRefs(forwardedRef, subContext.onTriggerChange),
                        onClick: (event) => {
                            var _a;
                            (_a = props.onClick) == null ? void 0 : _a.call(props, event);
                            if (props.disabled || event.defaultPrevented) return;
                            event.currentTarget.focus();
                            if (!context.open) context.onOpenChange(true);
                        },
                        onPointerMove: composeEventHandlers(
                            props.onPointerMove,
                            whenMouse((event) => {
                                contentContext.onItemEnter(event);
                                if (event.defaultPrevented) return;
                                if (!props.disabled && !context.open && !openTimerRef.current) {
                                    contentContext.onPointerGraceIntentChange(null);
                                    openTimerRef.current = window.setTimeout(() => {
                                        context.onOpenChange(true);
                                        clearOpenTimer();
                                    }, 100);
                                }
                            })
                        ),
                        onPointerLeave: composeEventHandlers(
                            props.onPointerLeave,
                            whenMouse((event) => {
                                var _a, _b;
                                clearOpenTimer();
                                const contentRect = (_a = context.content) == null ? void 0 : _a.getBoundingClientRect();
                                if (contentRect) {
                                    const side = (_b = context.content) == null ? void 0 : _b.dataset.side;
                                    const rightSide = side === "right";
                                    const bleed = rightSide ? -5 : 5;
                                    const contentNearEdge = contentRect[rightSide ? "left" : "right"];
                                    const contentFarEdge = contentRect[rightSide ? "right" : "left"];
                                    contentContext.onPointerGraceIntentChange({
                                        area: [
                                            // Apply a bleed on clientX to ensure that our exit point is
                                            // consistently within polygon bounds
                                            { x: event.clientX + bleed, y: event.clientY },
                                            { x: contentNearEdge, y: contentRect.top },
                                            { x: contentFarEdge, y: contentRect.top },
                                            { x: contentFarEdge, y: contentRect.bottom },
                                            { x: contentNearEdge, y: contentRect.bottom }
                                        ],
                                        side
                                    });
                                    window.clearTimeout(pointerGraceTimerRef.current);
                                    pointerGraceTimerRef.current = window.setTimeout(
                                        () => contentContext.onPointerGraceIntentChange(null),
                                        300
                                    );
                                } else {
                                    contentContext.onTriggerLeave(event);
                                    if (event.defaultPrevented) return;
                                    contentContext.onPointerGraceIntentChange(null);
                                }
                            })
                        ),
                        onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
                            var _a;
                            const isTypingAhead = contentContext.searchRef.current !== "";
                            if (props.disabled || isTypingAhead && event.key === " ") return;
                            if (SUB_OPEN_KEYS[rootContext.dir].includes(event.key)) {
                                context.onOpenChange(true);
                                (_a = context.content) == null ? void 0 : _a.focus();
                                event.preventDefault();
                            }
                        })
                    })
                )
            }));
        }
    );
    MenuSubTrigger.displayName = SUB_TRIGGER_NAME;
    var SUB_CONTENT_NAME = "MenuSubContent";
    var MenuSubContent = React32.forwardRef(
        (props, forwardedRef) => {
            const portalContext = usePortalContext(CONTENT_NAME2, props.__scopeMenu);
            const _a = props,
                { forceMount = portalContext.forceMount } = _a,
                subContentProps = __objRest(_a, ["forceMount"]);
            const context = useMenuContext(CONTENT_NAME2, props.__scopeMenu);
            const rootContext = useMenuRootContext(CONTENT_NAME2, props.__scopeMenu);
            const subContext = useMenuSubContext(SUB_CONTENT_NAME, props.__scopeMenu);
            const ref = React32.useRef(null);
            const composedRefs = useComposedRefs(forwardedRef, ref);
            return /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(Collection2.Provider, {
                scope: props.__scopeMenu,
                children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(Presence, {
                    present: forceMount || context.open,
                    children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(Collection2.Slot, {
                        scope: props.__scopeMenu,
                        children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
                            MenuContentImpl,
                            __spreadProps(__spreadValues({
                                id: subContext.contentId,
                                "aria-labelledby": subContext.triggerId
                            }, subContentProps), {
                                ref: composedRefs,
                                align: "start",
                                side: rootContext.dir === "rtl" ? "left" : "right",
                                disableOutsidePointerEvents: false,
                                disableOutsideScroll: false,
                                trapFocus: false,
                                onOpenAutoFocus: (event) => {
                                    var _a2;
                                    if (rootContext.isUsingKeyboardRef.current)(_a2 = ref.current) == null ? void 0 : _a2.focus();
                                    event.preventDefault();
                                },
                                onCloseAutoFocus: (event) => event.preventDefault(),
                                onFocusOutside: composeEventHandlers(props.onFocusOutside, (event) => {
                                    if (event.target !== subContext.trigger) context.onOpenChange(false);
                                }),
                                onEscapeKeyDown: composeEventHandlers(props.onEscapeKeyDown, (event) => {
                                    rootContext.onClose();
                                    event.preventDefault();
                                }),
                                onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
                                    var _a2;
                                    const isKeyDownInside = event.currentTarget.contains(event.target);
                                    const isCloseKey = SUB_CLOSE_KEYS[rootContext.dir].includes(event.key);
                                    if (isKeyDownInside && isCloseKey) {
                                        context.onOpenChange(false);
                                        (_a2 = subContext.trigger) == null ? void 0 : _a2.focus();
                                        event.preventDefault();
                                    }
                                })
                            })
                        )
                    })
                })
            });
        }
    );
    MenuSubContent.displayName = SUB_CONTENT_NAME;

    function getOpenState(open) {
        return open ? "open" : "closed";
    }

    function isIndeterminate(checked) {
        return checked === "indeterminate";
    }

    function getCheckedState(checked) {
        return isIndeterminate(checked) ? "indeterminate" : checked ? "checked" : "unchecked";
    }

    function focusFirst3(candidates) {
        const PREVIOUSLY_FOCUSED_ELEMENT = document.activeElement;
        for (const candidate of candidates) {
            if (candidate === PREVIOUSLY_FOCUSED_ELEMENT) return;
            candidate.focus();
            if (document.activeElement !== PREVIOUSLY_FOCUSED_ELEMENT) return;
        }
    }

    function wrapArray2(array, startIndex) {
        return array.map((_, index2) => array[(startIndex + index2) % array.length]);
    }

    function getNextMatch(values, search, currentMatch) {
        const isRepeated = search.length > 1 && Array.from(search).every((char) => char === search[0]);
        const normalizedSearch = isRepeated ? search[0] : search;
        const currentMatchIndex = currentMatch ? values.indexOf(currentMatch) : -1;
        let wrappedValues = wrapArray2(values, Math.max(currentMatchIndex, 0));
        const excludeCurrentMatch = normalizedSearch.length === 1;
        if (excludeCurrentMatch) wrappedValues = wrappedValues.filter((v) => v !== currentMatch);
        const nextMatch = wrappedValues.find(
            (value) => value.toLowerCase().startsWith(normalizedSearch.toLowerCase())
        );
        return nextMatch !== currentMatch ? nextMatch : void 0;
    }

    function isPointInPolygon(point, polygon) {
        const { x, y } = point;
        let inside = false;
        for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
            const ii = polygon[i];
            const jj = polygon[j];
            const xi = ii.x;
            const yi = ii.y;
            const xj = jj.x;
            const yj = jj.y;
            const intersect = yi > y !== yj > y && x < (xj - xi) * (y - yi) / (yj - yi) + xi;
            if (intersect) inside = !inside;
        }
        return inside;
    }

    function isPointerInGraceArea(event, area) {
        if (!area) return false;
        const cursorPos = { x: event.clientX, y: event.clientY };
        return isPointInPolygon(cursorPos, area);
    }

    function whenMouse(handler) {
        return (event) => event.pointerType === "mouse" ? handler(event) : void 0;
    }
    var Root32 = Menu;
    var Anchor2 = MenuAnchor;
    var Portal2 = MenuPortal;
    var Content2 = MenuContent;
    var Group = MenuGroup;
    var Label = MenuLabel;
    var Item2 = MenuItem;
    var CheckboxItem = MenuCheckboxItem;
    var RadioGroup = MenuRadioGroup;
    var RadioItem = MenuRadioItem;
    var ItemIndicator = MenuItemIndicator;
    var Separator = MenuSeparator;
    var Arrow22 = MenuArrow;
    var SubTrigger = MenuSubTrigger;
    var SubContent = MenuSubContent;

    // node_modules/@radix-ui/react-dropdown-menu/dist/index.mjs
    var import_jsx_runtime14 = require("react/jsx-runtime");
    var DROPDOWN_MENU_NAME = "DropdownMenu";
    var [createDropdownMenuContext, createDropdownMenuScope] = createContextScope(
        DROPDOWN_MENU_NAME, [createMenuScope]
    );
    var useMenuScope = createMenuScope();
    var [DropdownMenuProvider, useDropdownMenuContext] = createDropdownMenuContext(DROPDOWN_MENU_NAME);
    var DropdownMenu = (props) => {
        const {
            __scopeDropdownMenu,
            children,
            dir,
            open: openProp,
            defaultOpen,
            onOpenChange,
            modal = true
        } = props;
        const menuScope = useMenuScope(__scopeDropdownMenu);
        const triggerRef = React33.useRef(null);
        const [open, setOpen] = useControllableState({
            prop: openProp,
            defaultProp: defaultOpen != null ? defaultOpen : false,
            onChange: onOpenChange,
            caller: DROPDOWN_MENU_NAME
        });
        return /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
            DropdownMenuProvider, {
                scope: __scopeDropdownMenu,
                triggerId: useId(),
                triggerRef,
                contentId: useId(),
                open,
                onOpenChange: setOpen,
                onOpenToggle: React33.useCallback(() => setOpen((prevOpen) => !prevOpen), [setOpen]),
                modal,
                children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(Root32, __spreadProps(__spreadValues({}, menuScope), { open, onOpenChange: setOpen, dir, modal, children }))
            }
        );
    };
    DropdownMenu.displayName = DROPDOWN_MENU_NAME;
    var TRIGGER_NAME = "DropdownMenuTrigger";
    var DropdownMenuTrigger = React33.forwardRef(
        (props, forwardedRef) => {
            const _a = props,
                { __scopeDropdownMenu, disabled = false } = _a,
                triggerProps = __objRest(_a, ["__scopeDropdownMenu", "disabled"]);
            const context = useDropdownMenuContext(TRIGGER_NAME, __scopeDropdownMenu);
            const menuScope = useMenuScope(__scopeDropdownMenu);
            return /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(Anchor2, __spreadProps(__spreadValues({ asChild: true }, menuScope), {
                children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
                    Primitive.button,
                    __spreadProps(__spreadValues({
                        type: "button",
                        id: context.triggerId,
                        "aria-haspopup": "menu",
                        "aria-expanded": context.open,
                        "aria-controls": context.open ? context.contentId : void 0,
                        "data-state": context.open ? "open" : "closed",
                        "data-disabled": disabled ? "" : void 0,
                        disabled
                    }, triggerProps), {
                        ref: composeRefs(forwardedRef, context.triggerRef),
                        onPointerDown: composeEventHandlers(props.onPointerDown, (event) => {
                            if (!disabled && event.button === 0 && event.ctrlKey === false) {
                                context.onOpenToggle();
                                if (!context.open) event.preventDefault();
                            }
                        }),
                        onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
                            if (disabled) return;
                            if (["Enter", " "].includes(event.key)) context.onOpenToggle();
                            if (event.key === "ArrowDown") context.onOpenChange(true);
                            if (["Enter", " ", "ArrowDown"].includes(event.key)) event.preventDefault();
                        })
                    })
                )
            }));
        }
    );
    DropdownMenuTrigger.displayName = TRIGGER_NAME;
    var PORTAL_NAME3 = "DropdownMenuPortal";
    var DropdownMenuPortal = (props) => {
        const _a = props,
            { __scopeDropdownMenu } = _a,
            portalProps = __objRest(_a, ["__scopeDropdownMenu"]);
        const menuScope = useMenuScope(__scopeDropdownMenu);
        return /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(Portal2, __spreadValues(__spreadValues({}, menuScope), portalProps));
    };
    DropdownMenuPortal.displayName = PORTAL_NAME3;
    var CONTENT_NAME3 = "DropdownMenuContent";
    var DropdownMenuContent = React33.forwardRef(
        (props, forwardedRef) => {
            const _a = props,
                { __scopeDropdownMenu } = _a,
                contentProps = __objRest(_a, ["__scopeDropdownMenu"]);
            const context = useDropdownMenuContext(CONTENT_NAME3, __scopeDropdownMenu);
            const menuScope = useMenuScope(__scopeDropdownMenu);
            const hasInteractedOutsideRef = React33.useRef(false);
            return /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
                Content2,
                __spreadProps(__spreadValues(__spreadValues({
                    id: context.contentId,
                    "aria-labelledby": context.triggerId
                }, menuScope), contentProps), {
                    ref: forwardedRef,
                    onCloseAutoFocus: composeEventHandlers(props.onCloseAutoFocus, (event) => {
                        var _a2;
                        if (!hasInteractedOutsideRef.current)(_a2 = context.triggerRef.current) == null ? void 0 : _a2.focus();
                        hasInteractedOutsideRef.current = false;
                        event.preventDefault();
                    }),
                    onInteractOutside: composeEventHandlers(props.onInteractOutside, (event) => {
                        const originalEvent = event.detail.originalEvent;
                        const ctrlLeftClick = originalEvent.button === 0 && originalEvent.ctrlKey === true;
                        const isRightClick = originalEvent.button === 2 || ctrlLeftClick;
                        if (!context.modal || isRightClick) hasInteractedOutsideRef.current = true;
                    }),
                    style: __spreadValues(__spreadValues({}, props.style), {
                        "--radix-dropdown-menu-content-transform-origin": "var(--radix-popper-transform-origin)",
                        "--radix-dropdown-menu-content-available-width": "var(--radix-popper-available-width)",
                        "--radix-dropdown-menu-content-available-height": "var(--radix-popper-available-height)",
                        "--radix-dropdown-menu-trigger-width": "var(--radix-popper-anchor-width)",
                        "--radix-dropdown-menu-trigger-height": "var(--radix-popper-anchor-height)"
                    })
                })
            );
        }
    );
    DropdownMenuContent.displayName = CONTENT_NAME3;
    var GROUP_NAME3 = "DropdownMenuGroup";
    var DropdownMenuGroup = React33.forwardRef(
        (props, forwardedRef) => {
            const _a = props,
                { __scopeDropdownMenu } = _a,
                groupProps = __objRest(_a, ["__scopeDropdownMenu"]);
            const menuScope = useMenuScope(__scopeDropdownMenu);
            return /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(Group, __spreadProps(__spreadValues(__spreadValues({}, menuScope), groupProps), { ref: forwardedRef }));
        }
    );
    DropdownMenuGroup.displayName = GROUP_NAME3;
    var LABEL_NAME2 = "DropdownMenuLabel";
    var DropdownMenuLabel = React33.forwardRef(
        (props, forwardedRef) => {
            const _a = props,
                { __scopeDropdownMenu } = _a,
                labelProps = __objRest(_a, ["__scopeDropdownMenu"]);
            const menuScope = useMenuScope(__scopeDropdownMenu);
            return /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(Label, __spreadProps(__spreadValues(__spreadValues({}, menuScope), labelProps), { ref: forwardedRef }));
        }
    );
    DropdownMenuLabel.displayName = LABEL_NAME2;
    var ITEM_NAME3 = "DropdownMenuItem";
    var DropdownMenuItem = React33.forwardRef(
        (props, forwardedRef) => {
            const _a = props,
                { __scopeDropdownMenu } = _a,
                itemProps = __objRest(_a, ["__scopeDropdownMenu"]);
            const menuScope = useMenuScope(__scopeDropdownMenu);
            return /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(Item2, __spreadProps(__spreadValues(__spreadValues({}, menuScope), itemProps), { ref: forwardedRef }));
        }
    );
    DropdownMenuItem.displayName = ITEM_NAME3;
    var CHECKBOX_ITEM_NAME2 = "DropdownMenuCheckboxItem";
    var DropdownMenuCheckboxItem = React33.forwardRef((props, forwardedRef) => {
        const _a = props,
            { __scopeDropdownMenu } = _a,
            checkboxItemProps = __objRest(_a, ["__scopeDropdownMenu"]);
        const menuScope = useMenuScope(__scopeDropdownMenu);
        return /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(CheckboxItem, __spreadProps(__spreadValues(__spreadValues({}, menuScope), checkboxItemProps), { ref: forwardedRef }));
    });
    DropdownMenuCheckboxItem.displayName = CHECKBOX_ITEM_NAME2;
    var RADIO_GROUP_NAME2 = "DropdownMenuRadioGroup";
    var DropdownMenuRadioGroup = React33.forwardRef((props, forwardedRef) => {
        const _a = props,
            { __scopeDropdownMenu } = _a,
            radioGroupProps = __objRest(_a, ["__scopeDropdownMenu"]);
        const menuScope = useMenuScope(__scopeDropdownMenu);
        return /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(RadioGroup, __spreadProps(__spreadValues(__spreadValues({}, menuScope), radioGroupProps), { ref: forwardedRef }));
    });
    DropdownMenuRadioGroup.displayName = RADIO_GROUP_NAME2;
    var RADIO_ITEM_NAME2 = "DropdownMenuRadioItem";
    var DropdownMenuRadioItem = React33.forwardRef((props, forwardedRef) => {
        const _a = props,
            { __scopeDropdownMenu } = _a,
            radioItemProps = __objRest(_a, ["__scopeDropdownMenu"]);
        const menuScope = useMenuScope(__scopeDropdownMenu);
        return /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(RadioItem, __spreadProps(__spreadValues(__spreadValues({}, menuScope), radioItemProps), { ref: forwardedRef }));
    });
    DropdownMenuRadioItem.displayName = RADIO_ITEM_NAME2;
    var INDICATOR_NAME = "DropdownMenuItemIndicator";
    var DropdownMenuItemIndicator = React33.forwardRef((props, forwardedRef) => {
        const _a = props,
            { __scopeDropdownMenu } = _a,
            itemIndicatorProps = __objRest(_a, ["__scopeDropdownMenu"]);
        const menuScope = useMenuScope(__scopeDropdownMenu);
        return /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(ItemIndicator, __spreadProps(__spreadValues(__spreadValues({}, menuScope), itemIndicatorProps), { ref: forwardedRef }));
    });
    DropdownMenuItemIndicator.displayName = INDICATOR_NAME;
    var SEPARATOR_NAME2 = "DropdownMenuSeparator";
    var DropdownMenuSeparator = React33.forwardRef((props, forwardedRef) => {
        const _a = props,
            { __scopeDropdownMenu } = _a,
            separatorProps = __objRest(_a, ["__scopeDropdownMenu"]);
        const menuScope = useMenuScope(__scopeDropdownMenu);
        return /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(Separator, __spreadProps(__spreadValues(__spreadValues({}, menuScope), separatorProps), { ref: forwardedRef }));
    });
    DropdownMenuSeparator.displayName = SEPARATOR_NAME2;
    var ARROW_NAME3 = "DropdownMenuArrow";
    var DropdownMenuArrow = React33.forwardRef(
        (props, forwardedRef) => {
            const _a = props,
                { __scopeDropdownMenu } = _a,
                arrowProps = __objRest(_a, ["__scopeDropdownMenu"]);
            const menuScope = useMenuScope(__scopeDropdownMenu);
            return /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(Arrow22, __spreadProps(__spreadValues(__spreadValues({}, menuScope), arrowProps), { ref: forwardedRef }));
        }
    );
    DropdownMenuArrow.displayName = ARROW_NAME3;
    var SUB_TRIGGER_NAME2 = "DropdownMenuSubTrigger";
    var DropdownMenuSubTrigger = React33.forwardRef((props, forwardedRef) => {
        const _a = props,
            { __scopeDropdownMenu } = _a,
            subTriggerProps = __objRest(_a, ["__scopeDropdownMenu"]);
        const menuScope = useMenuScope(__scopeDropdownMenu);
        return /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(SubTrigger, __spreadProps(__spreadValues(__spreadValues({}, menuScope), subTriggerProps), { ref: forwardedRef }));
    });
    DropdownMenuSubTrigger.displayName = SUB_TRIGGER_NAME2;
    var SUB_CONTENT_NAME2 = "DropdownMenuSubContent";
    var DropdownMenuSubContent = React33.forwardRef((props, forwardedRef) => {
        const _a = props,
            { __scopeDropdownMenu } = _a,
            subContentProps = __objRest(_a, ["__scopeDropdownMenu"]);
        const menuScope = useMenuScope(__scopeDropdownMenu);
        return /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
            SubContent,
            __spreadProps(__spreadValues(__spreadValues({}, menuScope), subContentProps), {
                ref: forwardedRef,
                style: __spreadValues(__spreadValues({}, props.style), {
                    "--radix-dropdown-menu-content-transform-origin": "var(--radix-popper-transform-origin)",
                    "--radix-dropdown-menu-content-available-width": "var(--radix-popper-available-width)",
                    "--radix-dropdown-menu-content-available-height": "var(--radix-popper-available-height)",
                    "--radix-dropdown-menu-trigger-width": "var(--radix-popper-anchor-width)",
                    "--radix-dropdown-menu-trigger-height": "var(--radix-popper-anchor-height)"
                })
            })
        );
    });
    DropdownMenuSubContent.displayName = SUB_CONTENT_NAME2;
    var Root22 = DropdownMenu;
    var Trigger = DropdownMenuTrigger;
    var Portal22 = DropdownMenuPortal;
    var Content22 = DropdownMenuContent;
    var Label2 = DropdownMenuLabel;
    var Item22 = DropdownMenuItem;
    var CheckboxItem2 = DropdownMenuCheckboxItem;
    var RadioItem2 = DropdownMenuRadioItem;
    var ItemIndicator2 = DropdownMenuItemIndicator;
    var Separator2 = DropdownMenuSeparator;
    var SubTrigger2 = DropdownMenuSubTrigger;
    var SubContent2 = DropdownMenuSubContent;

    // node_modules/lucide-react/dist/esm/createLucideIcon.js
    var import_react6 = require("react");

    // node_modules/lucide-react/dist/esm/shared/src/utils.js
    var toKebabCase = (string) => string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
    var toCamelCase = (string) => string.replace(
        /^([A-Z])|[\s-_]+(\w)/g,
        (match, p1, p2) => p2 ? p2.toUpperCase() : p1.toLowerCase()
    );
    var toPascalCase = (string) => {
        const camelCase = toCamelCase(string);
        return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
    };
    var mergeClasses = (...classes) => classes.filter((className, index2, array) => {
        return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index2;
    }).join(" ").trim();
    var hasA11yProp = (props) => {
        for (const prop in props) {
            if (prop.startsWith("aria-") || prop === "role" || prop === "title") {
                return true;
            }
        }
    };

    // node_modules/lucide-react/dist/esm/Icon.js
    var import_react5 = require("react");

    // node_modules/lucide-react/dist/esm/defaultAttributes.js
    var defaultAttributes = {
        xmlns: "http://www.w3.org/2000/svg",
        width: 24,
        height: 24,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: 2,
        strokeLinecap: "round",
        strokeLinejoin: "round"
    };

    // node_modules/lucide-react/dist/esm/Icon.js
    var Icon = (0, import_react5.forwardRef)(
        (_a, ref) => {
            var _b = _a,
                {
                    color = "currentColor",
                    size: size4 = 24,
                    strokeWidth = 2,
                    absoluteStrokeWidth,
                    className = "",
                    children,
                    iconNode
                } = _b,
                rest = __objRest(_b, [
                    "color",
                    "size",
                    "strokeWidth",
                    "absoluteStrokeWidth",
                    "className",
                    "children",
                    "iconNode"
                ]);
            return (0, import_react5.createElement)(
                "svg",
                __spreadValues(__spreadValues(__spreadProps(__spreadValues({
                    ref
                }, defaultAttributes), {
                    width: size4,
                    height: size4,
                    stroke: color,
                    strokeWidth: absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size4) : strokeWidth,
                    className: mergeClasses("lucide", className)
                }), !children && !hasA11yProp(rest) && { "aria-hidden": "true" }), rest), [
                    ...iconNode.map(([tag, attrs]) => (0, import_react5.createElement)(tag, attrs)),
                    ...Array.isArray(children) ? children : [children]
                ]
            );
        }
    );

    // node_modules/lucide-react/dist/esm/createLucideIcon.js
    var createLucideIcon = (iconName, iconNode) => {
        const Component = (0, import_react6.forwardRef)(
            (_a, ref) => {
                var _b = _a,
                    { className } = _b,
                    props = __objRest(_b, ["className"]);
                return (0, import_react6.createElement)(Icon, __spreadValues({
                    ref,
                    iconNode,
                    className: mergeClasses(
                        `lucide-${toKebabCase(toPascalCase(iconName))}`,
                        `lucide-${iconName}`,
                        className
                    )
                }, props));
            }
        );
        Component.displayName = toPascalCase(iconName);
        return Component;
    };

    // node_modules/lucide-react/dist/esm/icons/check.js
    var __iconNode = [
        ["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]
    ];
    var Check = createLucideIcon("check", __iconNode);

    // node_modules/lucide-react/dist/esm/icons/chevron-right.js
    var __iconNode2 = [
        ["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]
    ];
    var ChevronRight = createLucideIcon("chevron-right", __iconNode2);

    // node_modules/lucide-react/dist/esm/icons/circle.js
    var __iconNode3 = [
        ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]
    ];
    var Circle = createLucideIcon("circle", __iconNode3);

    // node_modules/lucide-react/dist/esm/icons/grip.js
    var __iconNode4 = [
        ["circle", { cx: "12", cy: "5", r: "1", key: "gxeob9" }],
        ["circle", { cx: "19", cy: "5", r: "1", key: "w8mnmm" }],
        ["circle", { cx: "5", cy: "5", r: "1", key: "lttvr7" }],
        ["circle", { cx: "12", cy: "12", r: "1", key: "41hilf" }],
        ["circle", { cx: "19", cy: "12", r: "1", key: "1wjl8i" }],
        ["circle", { cx: "5", cy: "12", r: "1", key: "1pcz8c" }],
        ["circle", { cx: "12", cy: "19", r: "1", key: "lyex9k" }],
        ["circle", { cx: "19", cy: "19", r: "1", key: "shf9b7" }],
        ["circle", { cx: "5", cy: "19", r: "1", key: "bfqh0e" }]
    ];
    var Grip = createLucideIcon("grip", __iconNode4);

    // node_modules/clsx/dist/clsx.mjs
    function r(e) {
        var t, f, n = "";
        if ("string" == typeof e || "number" == typeof e) n += e;
        else if ("object" == typeof e)
            if (Array.isArray(e)) {
                var o = e.length;
                for (t = 0; t < o; t++) e[t] && (f = r(e[t])) && (n && (n += " "), n += f);
            } else
                for (f in e) e[f] && (n && (n += " "), n += f);
        return n;
    }

    function clsx() {
        for (var e, t, f = 0, n = "", o = arguments.length; f < o; f++)(e = arguments[f]) && (t = r(e)) && (n && (n += " "), n += t);
        return n;
    }

    // node_modules/tailwind-merge/dist/bundle-mjs.mjs
    var CLASS_PART_SEPARATOR = "-";
    var createClassGroupUtils = (config) => {
        const classMap = createClassMap(config);
        const {
            conflictingClassGroups,
            conflictingClassGroupModifiers
        } = config;
        const getClassGroupId = (className) => {
            const classParts = className.split(CLASS_PART_SEPARATOR);
            if (classParts[0] === "" && classParts.length !== 1) {
                classParts.shift();
            }
            return getGroupRecursive(classParts, classMap) || getGroupIdForArbitraryProperty(className);
        };
        const getConflictingClassGroupIds = (classGroupId, hasPostfixModifier) => {
            const conflicts = conflictingClassGroups[classGroupId] || [];
            if (hasPostfixModifier && conflictingClassGroupModifiers[classGroupId]) {
                return [...conflicts, ...conflictingClassGroupModifiers[classGroupId]];
            }
            return conflicts;
        };
        return {
            getClassGroupId,
            getConflictingClassGroupIds
        };
    };
    var getGroupRecursive = (classParts, classPartObject) => {
        var _a;
        if (classParts.length === 0) {
            return classPartObject.classGroupId;
        }
        const currentClassPart = classParts[0];
        const nextClassPartObject = classPartObject.nextPart.get(currentClassPart);
        const classGroupFromNextClassPart = nextClassPartObject ? getGroupRecursive(classParts.slice(1), nextClassPartObject) : void 0;
        if (classGroupFromNextClassPart) {
            return classGroupFromNextClassPart;
        }
        if (classPartObject.validators.length === 0) {
            return void 0;
        }
        const classRest = classParts.join(CLASS_PART_SEPARATOR);
        return (_a = classPartObject.validators.find(({
            validator
        }) => validator(classRest))) == null ? void 0 : _a.classGroupId;
    };
    var arbitraryPropertyRegex = /^\[(.+)\]$/;
    var getGroupIdForArbitraryProperty = (className) => {
        if (arbitraryPropertyRegex.test(className)) {
            const arbitraryPropertyClassName = arbitraryPropertyRegex.exec(className)[1];
            const property = arbitraryPropertyClassName == null ? void 0 : arbitraryPropertyClassName.substring(0, arbitraryPropertyClassName.indexOf(":"));
            if (property) {
                return "arbitrary.." + property;
            }
        }
    };
    var createClassMap = (config) => {
        const {
            theme,
            classGroups
        } = config;
        const classMap = {
            nextPart: /* @__PURE__ */ new Map(),
            validators: []
        };
        for (const classGroupId in classGroups) {
            processClassesRecursively(classGroups[classGroupId], classMap, classGroupId, theme);
        }
        return classMap;
    };
    var processClassesRecursively = (classGroup, classPartObject, classGroupId, theme) => {
        classGroup.forEach((classDefinition) => {
            if (typeof classDefinition === "string") {
                const classPartObjectToEdit = classDefinition === "" ? classPartObject : getPart(classPartObject, classDefinition);
                classPartObjectToEdit.classGroupId = classGroupId;
                return;
            }
            if (typeof classDefinition === "function") {
                if (isThemeGetter(classDefinition)) {
                    processClassesRecursively(classDefinition(theme), classPartObject, classGroupId, theme);
                    return;
                }
                classPartObject.validators.push({
                    validator: classDefinition,
                    classGroupId
                });
                return;
            }
            Object.entries(classDefinition).forEach(([key, classGroup2]) => {
                processClassesRecursively(classGroup2, getPart(classPartObject, key), classGroupId, theme);
            });
        });
    };
    var getPart = (classPartObject, path) => {
        let currentClassPartObject = classPartObject;
        path.split(CLASS_PART_SEPARATOR).forEach((pathPart) => {
            if (!currentClassPartObject.nextPart.has(pathPart)) {
                currentClassPartObject.nextPart.set(pathPart, {
                    nextPart: /* @__PURE__ */ new Map(),
                    validators: []
                });
            }
            currentClassPartObject = currentClassPartObject.nextPart.get(pathPart);
        });
        return currentClassPartObject;
    };
    var isThemeGetter = (func) => func.isThemeGetter;
    var createLruCache = (maxCacheSize) => {
        if (maxCacheSize < 1) {
            return {
                get: () => void 0,
                set: () => {}
            };
        }
        let cacheSize = 0;
        let cache = /* @__PURE__ */ new Map();
        let previousCache = /* @__PURE__ */ new Map();
        const update = (key, value) => {
            cache.set(key, value);
            cacheSize++;
            if (cacheSize > maxCacheSize) {
                cacheSize = 0;
                previousCache = cache;
                cache = /* @__PURE__ */ new Map();
            }
        };
        return {
            get(key) {
                let value = cache.get(key);
                if (value !== void 0) {
                    return value;
                }
                if ((value = previousCache.get(key)) !== void 0) {
                    update(key, value);
                    return value;
                }
            },
            set(key, value) {
                if (cache.has(key)) {
                    cache.set(key, value);
                } else {
                    update(key, value);
                }
            }
        };
    };
    var IMPORTANT_MODIFIER = "!";
    var MODIFIER_SEPARATOR = ":";
    var MODIFIER_SEPARATOR_LENGTH = MODIFIER_SEPARATOR.length;
    var createParseClassName = (config) => {
        const {
            prefix,
            experimentalParseClassName
        } = config;
        let parseClassName = (className) => {
            const modifiers = [];
            let bracketDepth = 0;
            let parenDepth = 0;
            let modifierStart = 0;
            let postfixModifierPosition;
            for (let index2 = 0; index2 < className.length; index2++) {
                let currentCharacter = className[index2];
                if (bracketDepth === 0 && parenDepth === 0) {
                    if (currentCharacter === MODIFIER_SEPARATOR) {
                        modifiers.push(className.slice(modifierStart, index2));
                        modifierStart = index2 + MODIFIER_SEPARATOR_LENGTH;
                        continue;
                    }
                    if (currentCharacter === "/") {
                        postfixModifierPosition = index2;
                        continue;
                    }
                }
                if (currentCharacter === "[") {
                    bracketDepth++;
                } else if (currentCharacter === "]") {
                    bracketDepth--;
                } else if (currentCharacter === "(") {
                    parenDepth++;
                } else if (currentCharacter === ")") {
                    parenDepth--;
                }
            }
            const baseClassNameWithImportantModifier = modifiers.length === 0 ? className : className.substring(modifierStart);
            const baseClassName = stripImportantModifier(baseClassNameWithImportantModifier);
            const hasImportantModifier = baseClassName !== baseClassNameWithImportantModifier;
            const maybePostfixModifierPosition = postfixModifierPosition && postfixModifierPosition > modifierStart ? postfixModifierPosition - modifierStart : void 0;
            return {
                modifiers,
                hasImportantModifier,
                baseClassName,
                maybePostfixModifierPosition
            };
        };
        if (prefix) {
            const fullPrefix = prefix + MODIFIER_SEPARATOR;
            const parseClassNameOriginal = parseClassName;
            parseClassName = (className) => className.startsWith(fullPrefix) ? parseClassNameOriginal(className.substring(fullPrefix.length)) : {
                isExternal: true,
                modifiers: [],
                hasImportantModifier: false,
                baseClassName: className,
                maybePostfixModifierPosition: void 0
            };
        }
        if (experimentalParseClassName) {
            const parseClassNameOriginal = parseClassName;
            parseClassName = (className) => experimentalParseClassName({
                className,
                parseClassName: parseClassNameOriginal
            });
        }
        return parseClassName;
    };
    var stripImportantModifier = (baseClassName) => {
        if (baseClassName.endsWith(IMPORTANT_MODIFIER)) {
            return baseClassName.substring(0, baseClassName.length - 1);
        }
        if (baseClassName.startsWith(IMPORTANT_MODIFIER)) {
            return baseClassName.substring(1);
        }
        return baseClassName;
    };
    var createSortModifiers = (config) => {
        const orderSensitiveModifiers = Object.fromEntries(config.orderSensitiveModifiers.map((modifier) => [modifier, true]));
        const sortModifiers = (modifiers) => {
            if (modifiers.length <= 1) {
                return modifiers;
            }
            const sortedModifiers = [];
            let unsortedModifiers = [];
            modifiers.forEach((modifier) => {
                const isPositionSensitive = modifier[0] === "[" || orderSensitiveModifiers[modifier];
                if (isPositionSensitive) {
                    sortedModifiers.push(...unsortedModifiers.sort(), modifier);
                    unsortedModifiers = [];
                } else {
                    unsortedModifiers.push(modifier);
                }
            });
            sortedModifiers.push(...unsortedModifiers.sort());
            return sortedModifiers;
        };
        return sortModifiers;
    };
    var createConfigUtils = (config) => __spreadValues({
        cache: createLruCache(config.cacheSize),
        parseClassName: createParseClassName(config),
        sortModifiers: createSortModifiers(config)
    }, createClassGroupUtils(config));
    var SPLIT_CLASSES_REGEX = /\s+/;
    var mergeClassList = (classList, configUtils) => {
        const {
            parseClassName,
            getClassGroupId,
            getConflictingClassGroupIds,
            sortModifiers
        } = configUtils;
        const classGroupsInConflict = [];
        const classNames = classList.trim().split(SPLIT_CLASSES_REGEX);
        let result = "";
        for (let index2 = classNames.length - 1; index2 >= 0; index2 -= 1) {
            const originalClassName = classNames[index2];
            const {
                isExternal,
                modifiers,
                hasImportantModifier,
                baseClassName,
                maybePostfixModifierPosition
            } = parseClassName(originalClassName);
            if (isExternal) {
                result = originalClassName + (result.length > 0 ? " " + result : result);
                continue;
            }
            let hasPostfixModifier = !!maybePostfixModifierPosition;
            let classGroupId = getClassGroupId(hasPostfixModifier ? baseClassName.substring(0, maybePostfixModifierPosition) : baseClassName);
            if (!classGroupId) {
                if (!hasPostfixModifier) {
                    result = originalClassName + (result.length > 0 ? " " + result : result);
                    continue;
                }
                classGroupId = getClassGroupId(baseClassName);
                if (!classGroupId) {
                    result = originalClassName + (result.length > 0 ? " " + result : result);
                    continue;
                }
                hasPostfixModifier = false;
            }
            const variantModifier = sortModifiers(modifiers).join(":");
            const modifierId = hasImportantModifier ? variantModifier + IMPORTANT_MODIFIER : variantModifier;
            const classId = modifierId + classGroupId;
            if (classGroupsInConflict.includes(classId)) {
                continue;
            }
            classGroupsInConflict.push(classId);
            const conflictGroups = getConflictingClassGroupIds(classGroupId, hasPostfixModifier);
            for (let i = 0; i < conflictGroups.length; ++i) {
                const group = conflictGroups[i];
                classGroupsInConflict.push(modifierId + group);
            }
            result = originalClassName + (result.length > 0 ? " " + result : result);
        }
        return result;
    };

    function twJoin() {
        let index2 = 0;
        let argument;
        let resolvedValue;
        let string = "";
        while (index2 < arguments.length) {
            if (argument = arguments[index2++]) {
                if (resolvedValue = toValue(argument)) {
                    string && (string += " ");
                    string += resolvedValue;
                }
            }
        }
        return string;
    }
    var toValue = (mix) => {
        if (typeof mix === "string") {
            return mix;
        }
        let resolvedValue;
        let string = "";
        for (let k = 0; k < mix.length; k++) {
            if (mix[k]) {
                if (resolvedValue = toValue(mix[k])) {
                    string && (string += " ");
                    string += resolvedValue;
                }
            }
        }
        return string;
    };

    function createTailwindMerge(createConfigFirst, ...createConfigRest) {
        let configUtils;
        let cacheGet;
        let cacheSet;
        let functionToCall = initTailwindMerge;

        function initTailwindMerge(classList) {
            const config = createConfigRest.reduce((previousConfig, createConfigCurrent) => createConfigCurrent(previousConfig), createConfigFirst());
            configUtils = createConfigUtils(config);
            cacheGet = configUtils.cache.get;
            cacheSet = configUtils.cache.set;
            functionToCall = tailwindMerge;
            return tailwindMerge(classList);
        }

        function tailwindMerge(classList) {
            const cachedResult = cacheGet(classList);
            if (cachedResult) {
                return cachedResult;
            }
            const result = mergeClassList(classList, configUtils);
            cacheSet(classList, result);
            return result;
        }
        return function callTailwindMerge() {
            return functionToCall(twJoin.apply(null, arguments));
        };
    }
    var fromTheme = (key) => {
        const themeGetter = (theme) => theme[key] || [];
        themeGetter.isThemeGetter = true;
        return themeGetter;
    };
    var arbitraryValueRegex = /^\[(?:(\w[\w-]*):)?(.+)\]$/i;
    var arbitraryVariableRegex = /^\((?:(\w[\w-]*):)?(.+)\)$/i;
    var fractionRegex = /^\d+\/\d+$/;
    var tshirtUnitRegex = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/;
    var lengthUnitRegex = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/;
    var colorFunctionRegex = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/;
    var shadowRegex = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/;
    var imageRegex = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/;
    var isFraction = (value) => fractionRegex.test(value);
    var isNumber = (value) => !!value && !Number.isNaN(Number(value));
    var isInteger = (value) => !!value && Number.isInteger(Number(value));
    var isPercent = (value) => value.endsWith("%") && isNumber(value.slice(0, -1));
    var isTshirtSize = (value) => tshirtUnitRegex.test(value);
    var isAny = () => true;
    var isLengthOnly = (value) => (
        // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
        // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
        // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
        lengthUnitRegex.test(value) && !colorFunctionRegex.test(value)
    );
    var isNever = () => false;
    var isShadow = (value) => shadowRegex.test(value);
    var isImage = (value) => imageRegex.test(value);
    var isAnyNonArbitrary = (value) => !isArbitraryValue(value) && !isArbitraryVariable(value);
    var isArbitrarySize = (value) => getIsArbitraryValue(value, isLabelSize, isNever);
    var isArbitraryValue = (value) => arbitraryValueRegex.test(value);
    var isArbitraryLength = (value) => getIsArbitraryValue(value, isLabelLength, isLengthOnly);
    var isArbitraryNumber = (value) => getIsArbitraryValue(value, isLabelNumber, isNumber);
    var isArbitraryPosition = (value) => getIsArbitraryValue(value, isLabelPosition, isNever);
    var isArbitraryImage = (value) => getIsArbitraryValue(value, isLabelImage, isImage);
    var isArbitraryShadow = (value) => getIsArbitraryValue(value, isLabelShadow, isShadow);
    var isArbitraryVariable = (value) => arbitraryVariableRegex.test(value);
    var isArbitraryVariableLength = (value) => getIsArbitraryVariable(value, isLabelLength);
    var isArbitraryVariableFamilyName = (value) => getIsArbitraryVariable(value, isLabelFamilyName);
    var isArbitraryVariablePosition = (value) => getIsArbitraryVariable(value, isLabelPosition);
    var isArbitraryVariableSize = (value) => getIsArbitraryVariable(value, isLabelSize);
    var isArbitraryVariableImage = (value) => getIsArbitraryVariable(value, isLabelImage);
    var isArbitraryVariableShadow = (value) => getIsArbitraryVariable(value, isLabelShadow, true);
    var getIsArbitraryValue = (value, testLabel, testValue) => {
        const result = arbitraryValueRegex.exec(value);
        if (result) {
            if (result[1]) {
                return testLabel(result[1]);
            }
            return testValue(result[2]);
        }
        return false;
    };
    var getIsArbitraryVariable = (value, testLabel, shouldMatchNoLabel = false) => {
        const result = arbitraryVariableRegex.exec(value);
        if (result) {
            if (result[1]) {
                return testLabel(result[1]);
            }
            return shouldMatchNoLabel;
        }
        return false;
    };
    var isLabelPosition = (label) => label === "position" || label === "percentage";
    var isLabelImage = (label) => label === "image" || label === "url";
    var isLabelSize = (label) => label === "length" || label === "size" || label === "bg-size";
    var isLabelLength = (label) => label === "length";
    var isLabelNumber = (label) => label === "number";
    var isLabelFamilyName = (label) => label === "family-name";
    var isLabelShadow = (label) => label === "shadow";
    var getDefaultConfig = () => {
        const themeColor = fromTheme("color");
        const themeFont = fromTheme("font");
        const themeText = fromTheme("text");
        const themeFontWeight = fromTheme("font-weight");
        const themeTracking = fromTheme("tracking");
        const themeLeading = fromTheme("leading");
        const themeBreakpoint = fromTheme("breakpoint");
        const themeContainer = fromTheme("container");
        const themeSpacing = fromTheme("spacing");
        const themeRadius = fromTheme("radius");
        const themeShadow = fromTheme("shadow");
        const themeInsetShadow = fromTheme("inset-shadow");
        const themeTextShadow = fromTheme("text-shadow");
        const themeDropShadow = fromTheme("drop-shadow");
        const themeBlur = fromTheme("blur");
        const themePerspective = fromTheme("perspective");
        const themeAspect = fromTheme("aspect");
        const themeEase = fromTheme("ease");
        const themeAnimate = fromTheme("animate");
        const scaleBreak = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"];
        const scalePosition = () => [
            "center",
            "top",
            "bottom",
            "left",
            "right",
            "top-left",
            // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
            "left-top",
            "top-right",
            // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
            "right-top",
            "bottom-right",
            // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
            "right-bottom",
            "bottom-left",
            // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
            "left-bottom"
        ];
        const scalePositionWithArbitrary = () => [...scalePosition(), isArbitraryVariable, isArbitraryValue];
        const scaleOverflow = () => ["auto", "hidden", "clip", "visible", "scroll"];
        const scaleOverscroll = () => ["auto", "contain", "none"];
        const scaleUnambiguousSpacing = () => [isArbitraryVariable, isArbitraryValue, themeSpacing];
        const scaleInset = () => [isFraction, "full", "auto", ...scaleUnambiguousSpacing()];
        const scaleGridTemplateColsRows = () => [isInteger, "none", "subgrid", isArbitraryVariable, isArbitraryValue];
        const scaleGridColRowStartAndEnd = () => ["auto", {
            span: ["full", isInteger, isArbitraryVariable, isArbitraryValue]
        }, isInteger, isArbitraryVariable, isArbitraryValue];
        const scaleGridColRowStartOrEnd = () => [isInteger, "auto", isArbitraryVariable, isArbitraryValue];
        const scaleGridAutoColsRows = () => ["auto", "min", "max", "fr", isArbitraryVariable, isArbitraryValue];
        const scaleAlignPrimaryAxis = () => ["start", "end", "center", "between", "around", "evenly", "stretch", "baseline", "center-safe", "end-safe"];
        const scaleAlignSecondaryAxis = () => ["start", "end", "center", "stretch", "center-safe", "end-safe"];
        const scaleMargin = () => ["auto", ...scaleUnambiguousSpacing()];
        const scaleSizing = () => [isFraction, "auto", "full", "dvw", "dvh", "lvw", "lvh", "svw", "svh", "min", "max", "fit", ...scaleUnambiguousSpacing()];
        const scaleColor = () => [themeColor, isArbitraryVariable, isArbitraryValue];
        const scaleBgPosition = () => [...scalePosition(), isArbitraryVariablePosition, isArbitraryPosition, {
            position: [isArbitraryVariable, isArbitraryValue]
        }];
        const scaleBgRepeat = () => ["no-repeat", {
            repeat: ["", "x", "y", "space", "round"]
        }];
        const scaleBgSize = () => ["auto", "cover", "contain", isArbitraryVariableSize, isArbitrarySize, {
            size: [isArbitraryVariable, isArbitraryValue]
        }];
        const scaleGradientStopPosition = () => [isPercent, isArbitraryVariableLength, isArbitraryLength];
        const scaleRadius = () => [
            // Deprecated since Tailwind CSS v4.0.0
            "",
            "none",
            "full",
            themeRadius,
            isArbitraryVariable,
            isArbitraryValue
        ];
        const scaleBorderWidth = () => ["", isNumber, isArbitraryVariableLength, isArbitraryLength];
        const scaleLineStyle = () => ["solid", "dashed", "dotted", "double"];
        const scaleBlendMode = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"];
        const scaleMaskImagePosition = () => [isNumber, isPercent, isArbitraryVariablePosition, isArbitraryPosition];
        const scaleBlur = () => [
            // Deprecated since Tailwind CSS v4.0.0
            "",
            "none",
            themeBlur,
            isArbitraryVariable,
            isArbitraryValue
        ];
        const scaleRotate = () => ["none", isNumber, isArbitraryVariable, isArbitraryValue];
        const scaleScale = () => ["none", isNumber, isArbitraryVariable, isArbitraryValue];
        const scaleSkew = () => [isNumber, isArbitraryVariable, isArbitraryValue];
        const scaleTranslate = () => [isFraction, "full", ...scaleUnambiguousSpacing()];
        return {
            cacheSize: 500,
            theme: {
                animate: ["spin", "ping", "pulse", "bounce"],
                aspect: ["video"],
                blur: [isTshirtSize],
                breakpoint: [isTshirtSize],
                color: [isAny],
                container: [isTshirtSize],
                "drop-shadow": [isTshirtSize],
                ease: ["in", "out", "in-out"],
                font: [isAnyNonArbitrary],
                "font-weight": ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"],
                "inset-shadow": [isTshirtSize],
                leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
                perspective: ["dramatic", "near", "normal", "midrange", "distant", "none"],
                radius: [isTshirtSize],
                shadow: [isTshirtSize],
                spacing: ["px", isNumber],
                text: [isTshirtSize],
                "text-shadow": [isTshirtSize],
                tracking: ["tighter", "tight", "normal", "wide", "wider", "widest"]
            },
            classGroups: {
                // --------------
                // --- Layout ---
                // --------------
                /**
                 * Aspect Ratio
                 * @see https://tailwindcss.com/docs/aspect-ratio
                 */
                aspect: [{
                    aspect: ["auto", "square", isFraction, isArbitraryValue, isArbitraryVariable, themeAspect]
                }],
                /**
                 * Container
                 * @see https://tailwindcss.com/docs/container
                 * @deprecated since Tailwind CSS v4.0.0
                 */
                container: ["container"],
                /**
                 * Columns
                 * @see https://tailwindcss.com/docs/columns
                 */
                columns: [{
                    columns: [isNumber, isArbitraryValue, isArbitraryVariable, themeContainer]
                }],
                /**
                 * Break After
                 * @see https://tailwindcss.com/docs/break-after
                 */
                "break-after": [{
                    "break-after": scaleBreak()
                }],
                /**
                 * Break Before
                 * @see https://tailwindcss.com/docs/break-before
                 */
                "break-before": [{
                    "break-before": scaleBreak()
                }],
                /**
                 * Break Inside
                 * @see https://tailwindcss.com/docs/break-inside
                 */
                "break-inside": [{
                    "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"]
                }],
                /**
                 * Box Decoration Break
                 * @see https://tailwindcss.com/docs/box-decoration-break
                 */
                "box-decoration": [{
                    "box-decoration": ["slice", "clone"]
                }],
                /**
                 * Box Sizing
                 * @see https://tailwindcss.com/docs/box-sizing
                 */
                box: [{
                    box: ["border", "content"]
                }],
                /**
                 * Display
                 * @see https://tailwindcss.com/docs/display
                 */
                display: ["block", "inline-block", "inline", "flex", "inline-flex", "table", "inline-table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row-group", "table-row", "flow-root", "grid", "inline-grid", "contents", "list-item", "hidden"],
                /**
                 * Screen Reader Only
                 * @see https://tailwindcss.com/docs/display#screen-reader-only
                 */
                sr: ["sr-only", "not-sr-only"],
                /**
                 * Floats
                 * @see https://tailwindcss.com/docs/float
                 */
                float: [{
                    float: ["right", "left", "none", "start", "end"]
                }],
                /**
                 * Clear
                 * @see https://tailwindcss.com/docs/clear
                 */
                clear: [{
                    clear: ["left", "right", "both", "none", "start", "end"]
                }],
                /**
                 * Isolation
                 * @see https://tailwindcss.com/docs/isolation
                 */
                isolation: ["isolate", "isolation-auto"],
                /**
                 * Object Fit
                 * @see https://tailwindcss.com/docs/object-fit
                 */
                "object-fit": [{
                    object: ["contain", "cover", "fill", "none", "scale-down"]
                }],
                /**
                 * Object Position
                 * @see https://tailwindcss.com/docs/object-position
                 */
                "object-position": [{
                    object: scalePositionWithArbitrary()
                }],
                /**
                 * Overflow
                 * @see https://tailwindcss.com/docs/overflow
                 */
                overflow: [{
                    overflow: scaleOverflow()
                }],
                /**
                 * Overflow X
                 * @see https://tailwindcss.com/docs/overflow
                 */
                "overflow-x": [{
                    "overflow-x": scaleOverflow()
                }],
                /**
                 * Overflow Y
                 * @see https://tailwindcss.com/docs/overflow
                 */
                "overflow-y": [{
                    "overflow-y": scaleOverflow()
                }],
                /**
                 * Overscroll Behavior
                 * @see https://tailwindcss.com/docs/overscroll-behavior
                 */
                overscroll: [{
                    overscroll: scaleOverscroll()
                }],
                /**
                 * Overscroll Behavior X
                 * @see https://tailwindcss.com/docs/overscroll-behavior
                 */
                "overscroll-x": [{
                    "overscroll-x": scaleOverscroll()
                }],
                /**
                 * Overscroll Behavior Y
                 * @see https://tailwindcss.com/docs/overscroll-behavior
                 */
                "overscroll-y": [{
                    "overscroll-y": scaleOverscroll()
                }],
                /**
                 * Position
                 * @see https://tailwindcss.com/docs/position
                 */
                position: ["static", "fixed", "absolute", "relative", "sticky"],
                /**
                 * Top / Right / Bottom / Left
                 * @see https://tailwindcss.com/docs/top-right-bottom-left
                 */
                inset: [{
                    inset: scaleInset()
                }],
                /**
                 * Right / Left
                 * @see https://tailwindcss.com/docs/top-right-bottom-left
                 */
                "inset-x": [{
                    "inset-x": scaleInset()
                }],
                /**
                 * Top / Bottom
                 * @see https://tailwindcss.com/docs/top-right-bottom-left
                 */
                "inset-y": [{
                    "inset-y": scaleInset()
                }],
                /**
                 * Start
                 * @see https://tailwindcss.com/docs/top-right-bottom-left
                 */
                start: [{
                    start: scaleInset()
                }],
                /**
                 * End
                 * @see https://tailwindcss.com/docs/top-right-bottom-left
                 */
                end: [{
                    end: scaleInset()
                }],
                /**
                 * Top
                 * @see https://tailwindcss.com/docs/top-right-bottom-left
                 */
                top: [{
                    top: scaleInset()
                }],
                /**
                 * Right
                 * @see https://tailwindcss.com/docs/top-right-bottom-left
                 */
                right: [{
                    right: scaleInset()
                }],
                /**
                 * Bottom
                 * @see https://tailwindcss.com/docs/top-right-bottom-left
                 */
                bottom: [{
                    bottom: scaleInset()
                }],
                /**
                 * Left
                 * @see https://tailwindcss.com/docs/top-right-bottom-left
                 */
                left: [{
                    left: scaleInset()
                }],
                /**
                 * Visibility
                 * @see https://tailwindcss.com/docs/visibility
                 */
                visibility: ["visible", "invisible", "collapse"],
                /**
                 * Z-Index
                 * @see https://tailwindcss.com/docs/z-index
                 */
                z: [{
                    z: [isInteger, "auto", isArbitraryVariable, isArbitraryValue]
                }],
                // ------------------------
                // --- Flexbox and Grid ---
                // ------------------------
                /**
                 * Flex Basis
                 * @see https://tailwindcss.com/docs/flex-basis
                 */
                basis: [{
                    basis: [isFraction, "full", "auto", themeContainer, ...scaleUnambiguousSpacing()]
                }],
                /**
                 * Flex Direction
                 * @see https://tailwindcss.com/docs/flex-direction
                 */
                "flex-direction": [{
                    flex: ["row", "row-reverse", "col", "col-reverse"]
                }],
                /**
                 * Flex Wrap
                 * @see https://tailwindcss.com/docs/flex-wrap
                 */
                "flex-wrap": [{
                    flex: ["nowrap", "wrap", "wrap-reverse"]
                }],
                /**
                 * Flex
                 * @see https://tailwindcss.com/docs/flex
                 */
                flex: [{
                    flex: [isNumber, isFraction, "auto", "initial", "none", isArbitraryValue]
                }],
                /**
                 * Flex Grow
                 * @see https://tailwindcss.com/docs/flex-grow
                 */
                grow: [{
                    grow: ["", isNumber, isArbitraryVariable, isArbitraryValue]
                }],
                /**
                 * Flex Shrink
                 * @see https://tailwindcss.com/docs/flex-shrink
                 */
                shrink: [{
                    shrink: ["", isNumber, isArbitraryVariable, isArbitraryValue]
                }],
                /**
                 * Order
                 * @see https://tailwindcss.com/docs/order
                 */
                order: [{
                    order: [isInteger, "first", "last", "none", isArbitraryVariable, isArbitraryValue]
                }],
                /**
                 * Grid Template Columns
                 * @see https://tailwindcss.com/docs/grid-template-columns
                 */
                "grid-cols": [{
                    "grid-cols": scaleGridTemplateColsRows()
                }],
                /**
                 * Grid Column Start / End
                 * @see https://tailwindcss.com/docs/grid-column
                 */
                "col-start-end": [{
                    col: scaleGridColRowStartAndEnd()
                }],
                /**
                 * Grid Column Start
                 * @see https://tailwindcss.com/docs/grid-column
                 */
                "col-start": [{
                    "col-start": scaleGridColRowStartOrEnd()
                }],
                /**
                 * Grid Column End
                 * @see https://tailwindcss.com/docs/grid-column
                 */
                "col-end": [{
                    "col-end": scaleGridColRowStartOrEnd()
                }],
                /**
                 * Grid Template Rows
                 * @see https://tailwindcss.com/docs/grid-template-rows
                 */
                "grid-rows": [{
                    "grid-rows": scaleGridTemplateColsRows()
                }],
                /**
                 * Grid Row Start / End
                 * @see https://tailwindcss.com/docs/grid-row
                 */
                "row-start-end": [{
                    row: scaleGridColRowStartAndEnd()
                }],
                /**
                 * Grid Row Start
                 * @see https://tailwindcss.com/docs/grid-row
                 */
                "row-start": [{
                    "row-start": scaleGridColRowStartOrEnd()
                }],
                /**
                 * Grid Row End
                 * @see https://tailwindcss.com/docs/grid-row
                 */
                "row-end": [{
                    "row-end": scaleGridColRowStartOrEnd()
                }],
                /**
                 * Grid Auto Flow
                 * @see https://tailwindcss.com/docs/grid-auto-flow
                 */
                "grid-flow": [{
                    "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"]
                }],
                /**
                 * Grid Auto Columns
                 * @see https://tailwindcss.com/docs/grid-auto-columns
                 */
                "auto-cols": [{
                    "auto-cols": scaleGridAutoColsRows()
                }],
                /**
                 * Grid Auto Rows
                 * @see https://tailwindcss.com/docs/grid-auto-rows
                 */
                "auto-rows": [{
                    "auto-rows": scaleGridAutoColsRows()
                }],
                /**
                 * Gap
                 * @see https://tailwindcss.com/docs/gap
                 */
                gap: [{
                    gap: scaleUnambiguousSpacing()
                }],
                /**
                 * Gap X
                 * @see https://tailwindcss.com/docs/gap
                 */
                "gap-x": [{
                    "gap-x": scaleUnambiguousSpacing()
                }],
                /**
                 * Gap Y
                 * @see https://tailwindcss.com/docs/gap
                 */
                "gap-y": [{
                    "gap-y": scaleUnambiguousSpacing()
                }],
                /**
                 * Justify Content
                 * @see https://tailwindcss.com/docs/justify-content
                 */
                "justify-content": [{
                    justify: [...scaleAlignPrimaryAxis(), "normal"]
                }],
                /**
                 * Justify Items
                 * @see https://tailwindcss.com/docs/justify-items
                 */
                "justify-items": [{
                    "justify-items": [...scaleAlignSecondaryAxis(), "normal"]
                }],
                /**
                 * Justify Self
                 * @see https://tailwindcss.com/docs/justify-self
                 */
                "justify-self": [{
                    "justify-self": ["auto", ...scaleAlignSecondaryAxis()]
                }],
                /**
                 * Align Content
                 * @see https://tailwindcss.com/docs/align-content
                 */
                "align-content": [{
                    content: ["normal", ...scaleAlignPrimaryAxis()]
                }],
                /**
                 * Align Items
                 * @see https://tailwindcss.com/docs/align-items
                 */
                "align-items": [{
                    items: [...scaleAlignSecondaryAxis(), {
                        baseline: ["", "last"]
                    }]
                }],
                /**
                 * Align Self
                 * @see https://tailwindcss.com/docs/align-self
                 */
                "align-self": [{
                    self: ["auto", ...scaleAlignSecondaryAxis(), {
                        baseline: ["", "last"]
                    }]
                }],
                /**
                 * Place Content
                 * @see https://tailwindcss.com/docs/place-content
                 */
                "place-content": [{
                    "place-content": scaleAlignPrimaryAxis()
                }],
                /**
                 * Place Items
                 * @see https://tailwindcss.com/docs/place-items
                 */
                "place-items": [{
                    "place-items": [...scaleAlignSecondaryAxis(), "baseline"]
                }],
                /**
                 * Place Self
                 * @see https://tailwindcss.com/docs/place-self
                 */
                "place-self": [{
                    "place-self": ["auto", ...scaleAlignSecondaryAxis()]
                }],
                // Spacing
                /**
                 * Padding
                 * @see https://tailwindcss.com/docs/padding
                 */
                p: [{
                    p: scaleUnambiguousSpacing()
                }],
                /**
                 * Padding X
                 * @see https://tailwindcss.com/docs/padding
                 */
                px: [{
                    px: scaleUnambiguousSpacing()
                }],
                /**
                 * Padding Y
                 * @see https://tailwindcss.com/docs/padding
                 */
                py: [{
                    py: scaleUnambiguousSpacing()
                }],
                /**
                 * Padding Start
                 * @see https://tailwindcss.com/docs/padding
                 */
                ps: [{
                    ps: scaleUnambiguousSpacing()
                }],
                /**
                 * Padding End
                 * @see https://tailwindcss.com/docs/padding
                 */
                pe: [{
                    pe: scaleUnambiguousSpacing()
                }],
                /**
                 * Padding Top
                 * @see https://tailwindcss.com/docs/padding
                 */
                pt: [{
                    pt: scaleUnambiguousSpacing()
                }],
                /**
                 * Padding Right
                 * @see https://tailwindcss.com/docs/padding
                 */
                pr: [{
                    pr: scaleUnambiguousSpacing()
                }],
                /**
                 * Padding Bottom
                 * @see https://tailwindcss.com/docs/padding
                 */
                pb: [{
                    pb: scaleUnambiguousSpacing()
                }],
                /**
                 * Padding Left
                 * @see https://tailwindcss.com/docs/padding
                 */
                pl: [{
                    pl: scaleUnambiguousSpacing()
                }],
                /**
                 * Margin
                 * @see https://tailwindcss.com/docs/margin
                 */
                m: [{
                    m: scaleMargin()
                }],
                /**
                 * Margin X
                 * @see https://tailwindcss.com/docs/margin
                 */
                mx: [{
                    mx: scaleMargin()
                }],
                /**
                 * Margin Y
                 * @see https://tailwindcss.com/docs/margin
                 */
                my: [{
                    my: scaleMargin()
                }],
                /**
                 * Margin Start
                 * @see https://tailwindcss.com/docs/margin
                 */
                ms: [{
                    ms: scaleMargin()
                }],
                /**
                 * Margin End
                 * @see https://tailwindcss.com/docs/margin
                 */
                me: [{
                    me: scaleMargin()
                }],
                /**
                 * Margin Top
                 * @see https://tailwindcss.com/docs/margin
                 */
                mt: [{
                    mt: scaleMargin()
                }],
                /**
                 * Margin Right
                 * @see https://tailwindcss.com/docs/margin
                 */
                mr: [{
                    mr: scaleMargin()
                }],
                /**
                 * Margin Bottom
                 * @see https://tailwindcss.com/docs/margin
                 */
                mb: [{
                    mb: scaleMargin()
                }],
                /**
                 * Margin Left
                 * @see https://tailwindcss.com/docs/margin
                 */
                ml: [{
                    ml: scaleMargin()
                }],
                /**
                 * Space Between X
                 * @see https://tailwindcss.com/docs/margin#adding-space-between-children
                 */
                "space-x": [{
                    "space-x": scaleUnambiguousSpacing()
                }],
                /**
                 * Space Between X Reverse
                 * @see https://tailwindcss.com/docs/margin#adding-space-between-children
                 */
                "space-x-reverse": ["space-x-reverse"],
                /**
                 * Space Between Y
                 * @see https://tailwindcss.com/docs/margin#adding-space-between-children
                 */
                "space-y": [{
                    "space-y": scaleUnambiguousSpacing()
                }],
                /**
                 * Space Between Y Reverse
                 * @see https://tailwindcss.com/docs/margin#adding-space-between-children
                 */
                "space-y-reverse": ["space-y-reverse"],
                // --------------
                // --- Sizing ---
                // --------------
                /**
                 * Size
                 * @see https://tailwindcss.com/docs/width#setting-both-width-and-height
                 */
                size: [{
                    size: scaleSizing()
                }],
                /**
                 * Width
                 * @see https://tailwindcss.com/docs/width
                 */
                w: [{
                    w: [themeContainer, "screen", ...scaleSizing()]
                }],
                /**
                 * Min-Width
                 * @see https://tailwindcss.com/docs/min-width
                 */
                "min-w": [{
                    "min-w": [
                        themeContainer,
                        "screen",
                        /** Deprecated. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
                        "none",
                        ...scaleSizing()
                    ]
                }],
                /**
                 * Max-Width
                 * @see https://tailwindcss.com/docs/max-width
                 */
                "max-w": [{
                    "max-w": [
                        themeContainer,
                        "screen",
                        "none",
                        /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
                        "prose",
                        /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
                        {
                            screen: [themeBreakpoint]
                        },
                        ...scaleSizing()
                    ]
                }],
                /**
                 * Height
                 * @see https://tailwindcss.com/docs/height
                 */
                h: [{
                    h: ["screen", "lh", ...scaleSizing()]
                }],
                /**
                 * Min-Height
                 * @see https://tailwindcss.com/docs/min-height
                 */
                "min-h": [{
                    "min-h": ["screen", "lh", "none", ...scaleSizing()]
                }],
                /**
                 * Max-Height
                 * @see https://tailwindcss.com/docs/max-height
                 */
                "max-h": [{
                    "max-h": ["screen", "lh", ...scaleSizing()]
                }],
                // ------------------
                // --- Typography ---
                // ------------------
                /**
                 * Font Size
                 * @see https://tailwindcss.com/docs/font-size
                 */
                "font-size": [{
                    text: ["base", themeText, isArbitraryVariableLength, isArbitraryLength]
                }],
                /**
                 * Font Smoothing
                 * @see https://tailwindcss.com/docs/font-smoothing
                 */
                "font-smoothing": ["antialiased", "subpixel-antialiased"],
                /**
                 * Font Style
                 * @see https://tailwindcss.com/docs/font-style
                 */
                "font-style": ["italic", "not-italic"],
                /**
                 * Font Weight
                 * @see https://tailwindcss.com/docs/font-weight
                 */
                "font-weight": [{
                    font: [themeFontWeight, isArbitraryVariable, isArbitraryNumber]
                }],
                /**
                 * Font Stretch
                 * @see https://tailwindcss.com/docs/font-stretch
                 */
                "font-stretch": [{
                    "font-stretch": ["ultra-condensed", "extra-condensed", "condensed", "semi-condensed", "normal", "semi-expanded", "expanded", "extra-expanded", "ultra-expanded", isPercent, isArbitraryValue]
                }],
                /**
                 * Font Family
                 * @see https://tailwindcss.com/docs/font-family
                 */
                "font-family": [{
                    font: [isArbitraryVariableFamilyName, isArbitraryValue, themeFont]
                }],
                /**
                 * Font Variant Numeric
                 * @see https://tailwindcss.com/docs/font-variant-numeric
                 */
                "fvn-normal": ["normal-nums"],
                /**
                 * Font Variant Numeric
                 * @see https://tailwindcss.com/docs/font-variant-numeric
                 */
                "fvn-ordinal": ["ordinal"],
                /**
                 * Font Variant Numeric
                 * @see https://tailwindcss.com/docs/font-variant-numeric
                 */
                "fvn-slashed-zero": ["slashed-zero"],
                /**
                 * Font Variant Numeric
                 * @see https://tailwindcss.com/docs/font-variant-numeric
                 */
                "fvn-figure": ["lining-nums", "oldstyle-nums"],
                /**
                 * Font Variant Numeric
                 * @see https://tailwindcss.com/docs/font-variant-numeric
                 */
                "fvn-spacing": ["proportional-nums", "tabular-nums"],
                /**
                 * Font Variant Numeric
                 * @see https://tailwindcss.com/docs/font-variant-numeric
                 */
                "fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
                /**
                 * Letter Spacing
                 * @see https://tailwindcss.com/docs/letter-spacing
                 */
                tracking: [{
                    tracking: [themeTracking, isArbitraryVariable, isArbitraryValue]
                }],
                /**
                 * Line Clamp
                 * @see https://tailwindcss.com/docs/line-clamp
                 */
                "line-clamp": [{
                    "line-clamp": [isNumber, "none", isArbitraryVariable, isArbitraryNumber]
                }],
                /**
                 * Line Height
                 * @see https://tailwindcss.com/docs/line-height
                 */
                leading: [{
                    leading: [
                        /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
                        themeLeading,
                        ...scaleUnambiguousSpacing()
                    ]
                }],
                /**
                 * List Style Image
                 * @see https://tailwindcss.com/docs/list-style-image
                 */
                "list-image": [{
                    "list-image": ["none", isArbitraryVariable, isArbitraryValue]
                }],
                /**
                 * List Style Position
                 * @see https://tailwindcss.com/docs/list-style-position
                 */
                "list-style-position": [{
                    list: ["inside", "outside"]
                }],
                /**
                 * List Style Type
                 * @see https://tailwindcss.com/docs/list-style-type
                 */
                "list-style-type": [{
                    list: ["disc", "decimal", "none", isArbitraryVariable, isArbitraryValue]
                }],
                /**
                 * Text Alignment
                 * @see https://tailwindcss.com/docs/text-align
                 */
                "text-alignment": [{
                    text: ["left", "center", "right", "justify", "start", "end"]
                }],
                /**
                 * Placeholder Color
                 * @deprecated since Tailwind CSS v3.0.0
                 * @see https://v3.tailwindcss.com/docs/placeholder-color
                 */
                "placeholder-color": [{
                    placeholder: scaleColor()
                }],
                /**
                 * Text Color
                 * @see https://tailwindcss.com/docs/text-color
                 */
                "text-color": [{
                    text: scaleColor()
                }],
                /**
                 * Text Decoration
                 * @see https://tailwindcss.com/docs/text-decoration
                 */
                "text-decoration": ["underline", "overline", "line-through", "no-underline"],
                /**
                 * Text Decoration Style
                 * @see https://tailwindcss.com/docs/text-decoration-style
                 */
                "text-decoration-style": [{
                    decoration: [...scaleLineStyle(), "wavy"]
                }],
                /**
                 * Text Decoration Thickness
                 * @see https://tailwindcss.com/docs/text-decoration-thickness
                 */
                "text-decoration-thickness": [{
                    decoration: [isNumber, "from-font", "auto", isArbitraryVariable, isArbitraryLength]
                }],
                /**
                 * Text Decoration Color
                 * @see https://tailwindcss.com/docs/text-decoration-color
                 */
                "text-decoration-color": [{
                    decoration: scaleColor()
                }],
                /**
                 * Text Underline Offset
                 * @see https://tailwindcss.com/docs/text-underline-offset
                 */
                "underline-offset": [{
                    "underline-offset": [isNumber, "auto", isArbitraryVariable, isArbitraryValue]
                }],
                /**
                 * Text Transform
                 * @see https://tailwindcss.com/docs/text-transform
                 */
                "text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
                /**
                 * Text Overflow
                 * @see https://tailwindcss.com/docs/text-overflow
                 */
                "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
                /**
                 * Text Wrap
                 * @see https://tailwindcss.com/docs/text-wrap
                 */
                "text-wrap": [{
                    text: ["wrap", "nowrap", "balance", "pretty"]
                }],
                /**
                 * Text Indent
                 * @see https://tailwindcss.com/docs/text-indent
                 */
                indent: [{
                    indent: scaleUnambiguousSpacing()
                }],
                /**
                 * Vertical Alignment
                 * @see https://tailwindcss.com/docs/vertical-align
                 */
                "vertical-align": [{
                    align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", isArbitraryVariable, isArbitraryValue]
                }],
                /**
                 * Whitespace
                 * @see https://tailwindcss.com/docs/whitespace
                 */
                whitespace: [{
                    whitespace: ["normal", "nowrap", "pre", "pre-line", "pre-wrap", "break-spaces"]
                }],
                /**
                 * Word Break
                 * @see https://tailwindcss.com/docs/word-break
                 */
                break: [{
                    break: ["normal", "words", "all", "keep"]
                }],
                /**
                 * Overflow Wrap
                 * @see https://tailwindcss.com/docs/overflow-wrap
                 */
                wrap: [{
                    wrap: ["break-word", "anywhere", "normal"]
                }],
                /**
                 * Hyphens
                 * @see https://tailwindcss.com/docs/hyphens
                 */
                hyphens: [{
                    hyphens: ["none", "manual", "auto"]
                }],
                /**
                 * Content
                 * @see https://tailwindcss.com/docs/content
                 */
                content: [{
                    content: ["none", isArbitraryVariable, isArbitraryValue]
                }],
                // -------------------
                // --- Backgrounds ---
                // -------------------
                /**
                 * Background Attachment
                 * @see https://tailwindcss.com/docs/background-attachment
                 */
                "bg-attachment": [{
                    bg: ["fixed", "local", "scroll"]
                }],
                /**
                 * Background Clip
                 * @see https://tailwindcss.com/docs/background-clip
                 */
                "bg-clip": [{
                    "bg-clip": ["border", "padding", "content", "text"]
                }],
                /**
                 * Background Origin
                 * @see https://tailwindcss.com/docs/background-origin
                 */
                "bg-origin": [{
                    "bg-origin": ["border", "padding", "content"]
                }],
                /**
                 * Background Position
                 * @see https://tailwindcss.com/docs/background-position
                 */
                "bg-position": [{
                    bg: scaleBgPosition()
                }],
                /**
                 * Background Repeat
                 * @see https://tailwindcss.com/docs/background-repeat
                 */
                "bg-repeat": [{
                    bg: scaleBgRepeat()
                }],
                /**
                 * Background Size
                 * @see https://tailwindcss.com/docs/background-size
                 */
                "bg-size": [{
                    bg: scaleBgSize()
                }],
                /**
                 * Background Image
                 * @see https://tailwindcss.com/docs/background-image
                 */
                "bg-image": [{
                    bg: ["none", {
                        linear: [{
                            to: ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
                        }, isInteger, isArbitraryVariable, isArbitraryValue],
                        radial: ["", isArbitraryVariable, isArbitraryValue],
                        conic: [isInteger, isArbitraryVariable, isArbitraryValue]
                    }, isArbitraryVariableImage, isArbitraryImage]
                }],
                /**
                 * Background Color
                 * @see https://tailwindcss.com/docs/background-color
                 */
                "bg-color": [{
                    bg: scaleColor()
                }],
                /**
                 * Gradient Color Stops From Position
                 * @see https://tailwindcss.com/docs/gradient-color-stops
                 */
                "gradient-from-pos": [{
                    from: scaleGradientStopPosition()
                }],
                /**
                 * Gradient Color Stops Via Position
                 * @see https://tailwindcss.com/docs/gradient-color-stops
                 */
                "gradient-via-pos": [{
                    via: scaleGradientStopPosition()
                }],
                /**
                 * Gradient Color Stops To Position
                 * @see https://tailwindcss.com/docs/gradient-color-stops
                 */
                "gradient-to-pos": [{
                    to: scaleGradientStopPosition()
                }],
                /**
                 * Gradient Color Stops From
                 * @see https://tailwindcss.com/docs/gradient-color-stops
                 */
                "gradient-from": [{
                    from: scaleColor()
                }],
                /**
                 * Gradient Color Stops Via
                 * @see https://tailwindcss.com/docs/gradient-color-stops
                 */
                "gradient-via": [{
                    via: scaleColor()
                }],
                /**
                 * Gradient Color Stops To
                 * @see https://tailwindcss.com/docs/gradient-color-stops
                 */
                "gradient-to": [{
                    to: scaleColor()
                }],
                // ---------------
                // --- Borders ---
                // ---------------
                /**
                 * Border Radius
                 * @see https://tailwindcss.com/docs/border-radius
                 */
                rounded: [{
                    rounded: scaleRadius()
                }],
                /**
                 * Border Radius Start
                 * @see https://tailwindcss.com/docs/border-radius
                 */
                "rounded-s": [{
                    "rounded-s": scaleRadius()
                }],
                /**
                 * Border Radius End
                 * @see https://tailwindcss.com/docs/border-radius
                 */
                "rounded-e": [{
                    "rounded-e": scaleRadius()
                }],
                /**
                 * Border Radius Top
                 * @see https://tailwindcss.com/docs/border-radius
                 */
                "rounded-t": [{
                    "rounded-t": scaleRadius()
                }],
                /**
                 * Border Radius Right
                 * @see https://tailwindcss.com/docs/border-radius
                 */
                "rounded-r": [{
                    "rounded-r": scaleRadius()
                }],
                /**
                 * Border Radius Bottom
                 * @see https://tailwindcss.com/docs/border-radius
                 */
                "rounded-b": [{
                    "rounded-b": scaleRadius()
                }],
                /**
                 * Border Radius Left
                 * @see https://tailwindcss.com/docs/border-radius
                 */
                "rounded-l": [{
                    "rounded-l": scaleRadius()
                }],
                /**
                 * Border Radius Start Start
                 * @see https://tailwindcss.com/docs/border-radius
                 */
                "rounded-ss": [{
                    "rounded-ss": scaleRadius()
                }],
                /**
                 * Border Radius Start End
                 * @see https://tailwindcss.com/docs/border-radius
                 */
                "rounded-se": [{
                    "rounded-se": scaleRadius()
                }],
                /**
                 * Border Radius End End
                 * @see https://tailwindcss.com/docs/border-radius
                 */
                "rounded-ee": [{
                    "rounded-ee": scaleRadius()
                }],
                /**
                 * Border Radius End Start
                 * @see https://tailwindcss.com/docs/border-radius
                 */
                "rounded-es": [{
                    "rounded-es": scaleRadius()
                }],
                /**
                 * Border Radius Top Left
                 * @see https://tailwindcss.com/docs/border-radius
                 */
                "rounded-tl": [{
                    "rounded-tl": scaleRadius()
                }],
                /**
                 * Border Radius Top Right
                 * @see https://tailwindcss.com/docs/border-radius
                 */
                "rounded-tr": [{
                    "rounded-tr": scaleRadius()
                }],
                /**
                 * Border Radius Bottom Right
                 * @see https://tailwindcss.com/docs/border-radius
                 */
                "rounded-br": [{
                    "rounded-br": scaleRadius()
                }],
                /**
                 * Border Radius Bottom Left
                 * @see https://tailwindcss.com/docs/border-radius
                 */
                "rounded-bl": [{
                    "rounded-bl": scaleRadius()
                }],
                /**
                 * Border Width
                 * @see https://tailwindcss.com/docs/border-width
                 */
                "border-w": [{
                    border: scaleBorderWidth()
                }],
                /**
                 * Border Width X
                 * @see https://tailwindcss.com/docs/border-width
                 */
                "border-w-x": [{
                    "border-x": scaleBorderWidth()
                }],
                /**
                 * Border Width Y
                 * @see https://tailwindcss.com/docs/border-width
                 */
                "border-w-y": [{
                    "border-y": scaleBorderWidth()
                }],
                /**
                 * Border Width Start
                 * @see https://tailwindcss.com/docs/border-width
                 */
                "border-w-s": [{
                    "border-s": scaleBorderWidth()
                }],
                /**
                 * Border Width End
                 * @see https://tailwindcss.com/docs/border-width
                 */
                "border-w-e": [{
                    "border-e": scaleBorderWidth()
                }],
                /**
                 * Border Width Top
                 * @see https://tailwindcss.com/docs/border-width
                 */
                "border-w-t": [{
                    "border-t": scaleBorderWidth()
                }],
                /**
                 * Border Width Right
                 * @see https://tailwindcss.com/docs/border-width
                 */
                "border-w-r": [{
                    "border-r": scaleBorderWidth()
                }],
                /**
                 * Border Width Bottom
                 * @see https://tailwindcss.com/docs/border-width
                 */
                "border-w-b": [{
                    "border-b": scaleBorderWidth()
                }],
                /**
                 * Border Width Left
                 * @see https://tailwindcss.com/docs/border-width
                 */
                "border-w-l": [{
                    "border-l": scaleBorderWidth()
                }],
                /**
                 * Divide Width X
                 * @see https://tailwindcss.com/docs/border-width#between-children
                 */
                "divide-x": [{
                    "divide-x": scaleBorderWidth()
                }],
                /**
                 * Divide Width X Reverse
                 * @see https://tailwindcss.com/docs/border-width#between-children
                 */
                "divide-x-reverse": ["divide-x-reverse"],
                /**
                 * Divide Width Y
                 * @see https://tailwindcss.com/docs/border-width#between-children
                 */
                "divide-y": [{
                    "divide-y": scaleBorderWidth()
                }],
                /**
                 * Divide Width Y Reverse
                 * @see https://tailwindcss.com/docs/border-width#between-children
                 */
                "divide-y-reverse": ["divide-y-reverse"],
                /**
                 * Border Style
                 * @see https://tailwindcss.com/docs/border-style
                 */
                "border-style": [{
                    border: [...scaleLineStyle(), "hidden", "none"]
                }],
                /**
                 * Divide Style
                 * @see https://tailwindcss.com/docs/border-style#setting-the-divider-style
                 */
                "divide-style": [{
                    divide: [...scaleLineStyle(), "hidden", "none"]
                }],
                /**
                 * Border Color
                 * @see https://tailwindcss.com/docs/border-color
                 */
                "border-color": [{
                    border: scaleColor()
                }],
                /**
                 * Border Color X
                 * @see https://tailwindcss.com/docs/border-color
                 */
                "border-color-x": [{
                    "border-x": scaleColor()
                }],
                /**
                 * Border Color Y
                 * @see https://tailwindcss.com/docs/border-color
                 */
                "border-color-y": [{
                    "border-y": scaleColor()
                }],
                /**
                 * Border Color S
                 * @see https://tailwindcss.com/docs/border-color
                 */
                "border-color-s": [{
                    "border-s": scaleColor()
                }],
                /**
                 * Border Color E
                 * @see https://tailwindcss.com/docs/border-color
                 */
                "border-color-e": [{
                    "border-e": scaleColor()
                }],
                /**
                 * Border Color Top
                 * @see https://tailwindcss.com/docs/border-color
                 */
                "border-color-t": [{
                    "border-t": scaleColor()
                }],
                /**
                 * Border Color Right
                 * @see https://tailwindcss.com/docs/border-color
                 */
                "border-color-r": [{
                    "border-r": scaleColor()
                }],
                /**
                 * Border Color Bottom
                 * @see https://tailwindcss.com/docs/border-color
                 */
                "border-color-b": [{
                    "border-b": scaleColor()
                }],
                /**
                 * Border Color Left
                 * @see https://tailwindcss.com/docs/border-color
                 */
                "border-color-l": [{
                    "border-l": scaleColor()
                }],
                /**
                 * Divide Color
                 * @see https://tailwindcss.com/docs/divide-color
                 */
                "divide-color": [{
                    divide: scaleColor()
                }],
                /**
                 * Outline Style
                 * @see https://tailwindcss.com/docs/outline-style
                 */
                "outline-style": [{
                    outline: [...scaleLineStyle(), "none", "hidden"]
                }],
                /**
                 * Outline Offset
                 * @see https://tailwindcss.com/docs/outline-offset
                 */
                "outline-offset": [{
                    "outline-offset": [isNumber, isArbitraryVariable, isArbitraryValue]
                }],
                /**
                 * Outline Width
                 * @see https://tailwindcss.com/docs/outline-width
                 */
                "outline-w": [{
                    outline: ["", isNumber, isArbitraryVariableLength, isArbitraryLength]
                }],
                /**
                 * Outline Color
                 * @see https://tailwindcss.com/docs/outline-color
                 */
                "outline-color": [{
                    outline: scaleColor()
                }],
                // ---------------
                // --- Effects ---
                // ---------------
                /**
                 * Box Shadow
                 * @see https://tailwindcss.com/docs/box-shadow
                 */
                shadow: [{
                    shadow: [
                        // Deprecated since Tailwind CSS v4.0.0
                        "",
                        "none",
                        themeShadow,
                        isArbitraryVariableShadow,
                        isArbitraryShadow
                    ]
                }],
                /**
                 * Box Shadow Color
                 * @see https://tailwindcss.com/docs/box-shadow#setting-the-shadow-color
                 */
                "shadow-color": [{
                    shadow: scaleColor()
                }],
                /**
                 * Inset Box Shadow
                 * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-shadow
                 */
                "inset-shadow": [{
                    "inset-shadow": ["none", themeInsetShadow, isArbitraryVariableShadow, isArbitraryShadow]
                }],
                /**
                 * Inset Box Shadow Color
                 * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-shadow-color
                 */
                "inset-shadow-color": [{
                    "inset-shadow": scaleColor()
                }],
                /**
                 * Ring Width
                 * @see https://tailwindcss.com/docs/box-shadow#adding-a-ring
                 */
                "ring-w": [{
                    ring: scaleBorderWidth()
                }],
                /**
                 * Ring Width Inset
                 * @see https://v3.tailwindcss.com/docs/ring-width#inset-rings
                 * @deprecated since Tailwind CSS v4.0.0
                 * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
                 */
                "ring-w-inset": ["ring-inset"],
                /**
                 * Ring Color
                 * @see https://tailwindcss.com/docs/box-shadow#setting-the-ring-color
                 */
                "ring-color": [{
                    ring: scaleColor()
                }],
                /**
                 * Ring Offset Width
                 * @see https://v3.tailwindcss.com/docs/ring-offset-width
                 * @deprecated since Tailwind CSS v4.0.0
                 * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
                 */
                "ring-offset-w": [{
                    "ring-offset": [isNumber, isArbitraryLength]
                }],
                /**
                 * Ring Offset Color
                 * @see https://v3.tailwindcss.com/docs/ring-offset-color
                 * @deprecated since Tailwind CSS v4.0.0
                 * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
                 */
                "ring-offset-color": [{
                    "ring-offset": scaleColor()
                }],
                /**
                 * Inset Ring Width
                 * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-ring
                 */
                "inset-ring-w": [{
                    "inset-ring": scaleBorderWidth()
                }],
                /**
                 * Inset Ring Color
                 * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-ring-color
                 */
                "inset-ring-color": [{
                    "inset-ring": scaleColor()
                }],
                /**
                 * Text Shadow
                 * @see https://tailwindcss.com/docs/text-shadow
                 */
                "text-shadow": [{
                    "text-shadow": ["none", themeTextShadow, isArbitraryVariableShadow, isArbitraryShadow]
                }],
                /**
                 * Text Shadow Color
                 * @see https://tailwindcss.com/docs/text-shadow#setting-the-shadow-color
                 */
                "text-shadow-color": [{
                    "text-shadow": scaleColor()
                }],
                /**
                 * Opacity
                 * @see https://tailwindcss.com/docs/opacity
                 */
                opacity: [{
                    opacity: [isNumber, isArbitraryVariable, isArbitraryValue]
                }],
                /**
                 * Mix Blend Mode
                 * @see https://tailwindcss.com/docs/mix-blend-mode
                 */
                "mix-blend": [{
                    "mix-blend": [...scaleBlendMode(), "plus-darker", "plus-lighter"]
                }],
                /**
                 * Background Blend Mode
                 * @see https://tailwindcss.com/docs/background-blend-mode
                 */
                "bg-blend": [{
                    "bg-blend": scaleBlendMode()
                }],
                /**
                 * Mask Clip
                 * @see https://tailwindcss.com/docs/mask-clip
                 */
                "mask-clip": [{
                    "mask-clip": ["border", "padding", "content", "fill", "stroke", "view"]
                }, "mask-no-clip"],
                /**
                 * Mask Composite
                 * @see https://tailwindcss.com/docs/mask-composite
                 */
                "mask-composite": [{
                    mask: ["add", "subtract", "intersect", "exclude"]
                }],
                /**
                 * Mask Image
                 * @see https://tailwindcss.com/docs/mask-image
                 */
                "mask-image-linear-pos": [{
                    "mask-linear": [isNumber]
                }],
                "mask-image-linear-from-pos": [{
                    "mask-linear-from": scaleMaskImagePosition()
                }],
                "mask-image-linear-to-pos": [{
                    "mask-linear-to": scaleMaskImagePosition()
                }],
                "mask-image-linear-from-color": [{
                    "mask-linear-from": scaleColor()
                }],
                "mask-image-linear-to-color": [{
                    "mask-linear-to": scaleColor()
                }],
                "mask-image-t-from-pos": [{
                    "mask-t-from": scaleMaskImagePosition()
                }],
                "mask-image-t-to-pos": [{
                    "mask-t-to": scaleMaskImagePosition()
                }],
                "mask-image-t-from-color": [{
                    "mask-t-from": scaleColor()
                }],
                "mask-image-t-to-color": [{
                    "mask-t-to": scaleColor()
                }],
                "mask-image-r-from-pos": [{
                    "mask-r-from": scaleMaskImagePosition()
                }],
                "mask-image-r-to-pos": [{
                    "mask-r-to": scaleMaskImagePosition()
                }],
                "mask-image-r-from-color": [{
                    "mask-r-from": scaleColor()
                }],
                "mask-image-r-to-color": [{
                    "mask-r-to": scaleColor()
                }],
                "mask-image-b-from-pos": [{
                    "mask-b-from": scaleMaskImagePosition()
                }],
                "mask-image-b-to-pos": [{
                    "mask-b-to": scaleMaskImagePosition()
                }],
                "mask-image-b-from-color": [{
                    "mask-b-from": scaleColor()
                }],
                "mask-image-b-to-color": [{
                    "mask-b-to": scaleColor()
                }],
                "mask-image-l-from-pos": [{
                    "mask-l-from": scaleMaskImagePosition()
                }],
                "mask-image-l-to-pos": [{
                    "mask-l-to": scaleMaskImagePosition()
                }],
                "mask-image-l-from-color": [{
                    "mask-l-from": scaleColor()
                }],
                "mask-image-l-to-color": [{
                    "mask-l-to": scaleColor()
                }],
                "mask-image-x-from-pos": [{
                    "mask-x-from": scaleMaskImagePosition()
                }],
                "mask-image-x-to-pos": [{
                    "mask-x-to": scaleMaskImagePosition()
                }],
                "mask-image-x-from-color": [{
                    "mask-x-from": scaleColor()
                }],
                "mask-image-x-to-color": [{
                    "mask-x-to": scaleColor()
                }],
                "mask-image-y-from-pos": [{
                    "mask-y-from": scaleMaskImagePosition()
                }],
                "mask-image-y-to-pos": [{
                    "mask-y-to": scaleMaskImagePosition()
                }],
                "mask-image-y-from-color": [{
                    "mask-y-from": scaleColor()
                }],
                "mask-image-y-to-color": [{
                    "mask-y-to": scaleColor()
                }],
                "mask-image-radial": [{
                    "mask-radial": [isArbitraryVariable, isArbitraryValue]
                }],
                "mask-image-radial-from-pos": [{
                    "mask-radial-from": scaleMaskImagePosition()
                }],
                "mask-image-radial-to-pos": [{
                    "mask-radial-to": scaleMaskImagePosition()
                }],
                "mask-image-radial-from-color": [{
                    "mask-radial-from": scaleColor()
                }],
                "mask-image-radial-to-color": [{
                    "mask-radial-to": scaleColor()
                }],
                "mask-image-radial-shape": [{
                    "mask-radial": ["circle", "ellipse"]
                }],
                "mask-image-radial-size": [{
                    "mask-radial": [{
                        closest: ["side", "corner"],
                        farthest: ["side", "corner"]
                    }]
                }],
                "mask-image-radial-pos": [{
                    "mask-radial-at": scalePosition()
                }],
                "mask-image-conic-pos": [{
                    "mask-conic": [isNumber]
                }],
                "mask-image-conic-from-pos": [{
                    "mask-conic-from": scaleMaskImagePosition()
                }],
                "mask-image-conic-to-pos": [{
                    "mask-conic-to": scaleMaskImagePosition()
                }],
                "mask-image-conic-from-color": [{
                    "mask-conic-from": scaleColor()
                }],
                "mask-image-conic-to-color": [{
                    "mask-conic-to": scaleColor()
                }],
                /**
                 * Mask Mode
                 * @see https://tailwindcss.com/docs/mask-mode
                 */
                "mask-mode": [{
                    mask: ["alpha", "luminance", "match"]
                }],
                /**
                 * Mask Origin
                 * @see https://tailwindcss.com/docs/mask-origin
                 */
                "mask-origin": [{
                    "mask-origin": ["border", "padding", "content", "fill", "stroke", "view"]
                }],
                /**
                 * Mask Position
                 * @see https://tailwindcss.com/docs/mask-position
                 */
                "mask-position": [{
                    mask: scaleBgPosition()
                }],
                /**
                 * Mask Repeat
                 * @see https://tailwindcss.com/docs/mask-repeat
                 */
                "mask-repeat": [{
                    mask: scaleBgRepeat()
                }],
                /**
                 * Mask Size
                 * @see https://tailwindcss.com/docs/mask-size
                 */
                "mask-size": [{
                    mask: scaleBgSize()
                }],
                /**
                 * Mask Type
                 * @see https://tailwindcss.com/docs/mask-type
                 */
                "mask-type": [{
                    "mask-type": ["alpha", "luminance"]
                }],
                /**
                 * Mask Image
                 * @see https://tailwindcss.com/docs/mask-image
                 */
                "mask-image": [{
                    mask: ["none", isArbitraryVariable, isArbitraryValue]
                }],
                // ---------------
                // --- Filters ---
                // ---------------
                /**
                 * Filter
                 * @see https://tailwindcss.com/docs/filter
                 */
                filter: [{
                    filter: [
                        // Deprecated since Tailwind CSS v3.0.0
                        "",
                        "none",
                        isArbitraryVariable,
                        isArbitraryValue
                    ]
                }],
                /**
                 * Blur
                 * @see https://tailwindcss.com/docs/blur
                 */
                blur: [{
                    blur: scaleBlur()
                }],
                /**
                 * Brightness
                 * @see https://tailwindcss.com/docs/brightness
                 */
                brightness: [{
                    brightness: [isNumber, isArbitraryVariable, isArbitraryValue]
                }],
                /**
                 * Contrast
                 * @see https://tailwindcss.com/docs/contrast
                 */
                contrast: [{
                    contrast: [isNumber, isArbitraryVariable, isArbitraryValue]
                }],
                /**
                 * Drop Shadow
                 * @see https://tailwindcss.com/docs/drop-shadow
                 */
                "drop-shadow": [{
                    "drop-shadow": [
                        // Deprecated since Tailwind CSS v4.0.0
                        "",
                        "none",
                        themeDropShadow,
                        isArbitraryVariableShadow,
                        isArbitraryShadow
                    ]
                }],
                /**
                 * Drop Shadow Color
                 * @see https://tailwindcss.com/docs/filter-drop-shadow#setting-the-shadow-color
                 */
                "drop-shadow-color": [{
                    "drop-shadow": scaleColor()
                }],
                /**
                 * Grayscale
                 * @see https://tailwindcss.com/docs/grayscale
                 */
                grayscale: [{
                    grayscale: ["", isNumber, isArbitraryVariable, isArbitraryValue]
                }],
                /**
                 * Hue Rotate
                 * @see https://tailwindcss.com/docs/hue-rotate
                 */
                "hue-rotate": [{
                    "hue-rotate": [isNumber, isArbitraryVariable, isArbitraryValue]
                }],
                /**
                 * Invert
                 * @see https://tailwindcss.com/docs/invert
                 */
                invert: [{
                    invert: ["", isNumber, isArbitraryVariable, isArbitraryValue]
                }],
                /**
                 * Saturate
                 * @see https://tailwindcss.com/docs/saturate
                 */
                saturate: [{
                    saturate: [isNumber, isArbitraryVariable, isArbitraryValue]
                }],
                /**
                 * Sepia
                 * @see https://tailwindcss.com/docs/sepia
                 */
                sepia: [{
                    sepia: ["", isNumber, isArbitraryVariable, isArbitraryValue]
                }],
                /**
                 * Backdrop Filter
                 * @see https://tailwindcss.com/docs/backdrop-filter
                 */
                "backdrop-filter": [{
                    "backdrop-filter": [
                        // Deprecated since Tailwind CSS v3.0.0
                        "",
                        "none",
                        isArbitraryVariable,
                        isArbitraryValue
                    ]
                }],
                /**
                 * Backdrop Blur
                 * @see https://tailwindcss.com/docs/backdrop-blur
                 */
                "backdrop-blur": [{
                    "backdrop-blur": scaleBlur()
                }],
                /**
                 * Backdrop Brightness
                 * @see https://tailwindcss.com/docs/backdrop-brightness
                 */
                "backdrop-brightness": [{
                    "backdrop-brightness": [isNumber, isArbitraryVariable, isArbitraryValue]
                }],
                /**
                 * Backdrop Contrast
                 * @see https://tailwindcss.com/docs/backdrop-contrast
                 */
                "backdrop-contrast": [{
                    "backdrop-contrast": [isNumber, isArbitraryVariable, isArbitraryValue]
                }],
                /**
                 * Backdrop Grayscale
                 * @see https://tailwindcss.com/docs/backdrop-grayscale
                 */
                "backdrop-grayscale": [{
                    "backdrop-grayscale": ["", isNumber, isArbitraryVariable, isArbitraryValue]
                }],
                /**
                 * Backdrop Hue Rotate
                 * @see https://tailwindcss.com/docs/backdrop-hue-rotate
                 */
                "backdrop-hue-rotate": [{
                    "backdrop-hue-rotate": [isNumber, isArbitraryVariable, isArbitraryValue]
                }],
                /**
                 * Backdrop Invert
                 * @see https://tailwindcss.com/docs/backdrop-invert
                 */
                "backdrop-invert": [{
                    "backdrop-invert": ["", isNumber, isArbitraryVariable, isArbitraryValue]
                }],
                /**
                 * Backdrop Opacity
                 * @see https://tailwindcss.com/docs/backdrop-opacity
                 */
                "backdrop-opacity": [{
                    "backdrop-opacity": [isNumber, isArbitraryVariable, isArbitraryValue]
                }],
                /**
                 * Backdrop Saturate
                 * @see https://tailwindcss.com/docs/backdrop-saturate
                 */
                "backdrop-saturate": [{
                    "backdrop-saturate": [isNumber, isArbitraryVariable, isArbitraryValue]
                }],
                /**
                 * Backdrop Sepia
                 * @see https://tailwindcss.com/docs/backdrop-sepia
                 */
                "backdrop-sepia": [{
                    "backdrop-sepia": ["", isNumber, isArbitraryVariable, isArbitraryValue]
                }],
                // --------------
                // --- Tables ---
                // --------------
                /**
                 * Border Collapse
                 * @see https://tailwindcss.com/docs/border-collapse
                 */
                "border-collapse": [{
                    border: ["collapse", "separate"]
                }],
                /**
                 * Border Spacing
                 * @see https://tailwindcss.com/docs/border-spacing
                 */
                "border-spacing": [{
                    "border-spacing": scaleUnambiguousSpacing()
                }],
                /**
                 * Border Spacing X
                 * @see https://tailwindcss.com/docs/border-spacing
                 */
                "border-spacing-x": [{
                    "border-spacing-x": scaleUnambiguousSpacing()
                }],
                /**
                 * Border Spacing Y
                 * @see https://tailwindcss.com/docs/border-spacing
                 */
                "border-spacing-y": [{
                    "border-spacing-y": scaleUnambiguousSpacing()
                }],
                /**
                 * Table Layout
                 * @see https://tailwindcss.com/docs/table-layout
                 */
                "table-layout": [{
                    table: ["auto", "fixed"]
                }],
                /**
                 * Caption Side
                 * @see https://tailwindcss.com/docs/caption-side
                 */
                caption: [{
                    caption: ["top", "bottom"]
                }],
                // ---------------------------------
                // --- Transitions and Animation ---
                // ---------------------------------
                /**
                 * Transition Property
                 * @see https://tailwindcss.com/docs/transition-property
                 */
                transition: [{
                    transition: ["", "all", "colors", "opacity", "shadow", "transform", "none", isArbitraryVariable, isArbitraryValue]
                }],
                /**
                 * Transition Behavior
                 * @see https://tailwindcss.com/docs/transition-behavior
                 */
                "transition-behavior": [{
                    transition: ["normal", "discrete"]
                }],
                /**
                 * Transition Duration
                 * @see https://tailwindcss.com/docs/transition-duration
                 */
                duration: [{
                    duration: [isNumber, "initial", isArbitraryVariable, isArbitraryValue]
                }],
                /**
                 * Transition Timing Function
                 * @see https://tailwindcss.com/docs/transition-timing-function
                 */
                ease: [{
                    ease: ["linear", "initial", themeEase, isArbitraryVariable, isArbitraryValue]
                }],
                /**
                 * Transition Delay
                 * @see https://tailwindcss.com/docs/transition-delay
                 */
                delay: [{
                    delay: [isNumber, isArbitraryVariable, isArbitraryValue]
                }],
                /**
                 * Animation
                 * @see https://tailwindcss.com/docs/animation
                 */
                animate: [{
                    animate: ["none", themeAnimate, isArbitraryVariable, isArbitraryValue]
                }],
                // ------------------
                // --- Transforms ---
                // ------------------
                /**
                 * Backface Visibility
                 * @see https://tailwindcss.com/docs/backface-visibility
                 */
                backface: [{
                    backface: ["hidden", "visible"]
                }],
                /**
                 * Perspective
                 * @see https://tailwindcss.com/docs/perspective
                 */
                perspective: [{
                    perspective: [themePerspective, isArbitraryVariable, isArbitraryValue]
                }],
                /**
                 * Perspective Origin
                 * @see https://tailwindcss.com/docs/perspective-origin
                 */
                "perspective-origin": [{
                    "perspective-origin": scalePositionWithArbitrary()
                }],
                /**
                 * Rotate
                 * @see https://tailwindcss.com/docs/rotate
                 */
                rotate: [{
                    rotate: scaleRotate()
                }],
                /**
                 * Rotate X
                 * @see https://tailwindcss.com/docs/rotate
                 */
                "rotate-x": [{
                    "rotate-x": scaleRotate()
                }],
                /**
                 * Rotate Y
                 * @see https://tailwindcss.com/docs/rotate
                 */
                "rotate-y": [{
                    "rotate-y": scaleRotate()
                }],
                /**
                 * Rotate Z
                 * @see https://tailwindcss.com/docs/rotate
                 */
                "rotate-z": [{
                    "rotate-z": scaleRotate()
                }],
                /**
                 * Scale
                 * @see https://tailwindcss.com/docs/scale
                 */
                scale: [{
                    scale: scaleScale()
                }],
                /**
                 * Scale X
                 * @see https://tailwindcss.com/docs/scale
                 */
                "scale-x": [{
                    "scale-x": scaleScale()
                }],
                /**
                 * Scale Y
                 * @see https://tailwindcss.com/docs/scale
                 */
                "scale-y": [{
                    "scale-y": scaleScale()
                }],
                /**
                 * Scale Z
                 * @see https://tailwindcss.com/docs/scale
                 */
                "scale-z": [{
                    "scale-z": scaleScale()
                }],
                /**
                 * Scale 3D
                 * @see https://tailwindcss.com/docs/scale
                 */
                "scale-3d": ["scale-3d"],
                /**
                 * Skew
                 * @see https://tailwindcss.com/docs/skew
                 */
                skew: [{
                    skew: scaleSkew()
                }],
                /**
                 * Skew X
                 * @see https://tailwindcss.com/docs/skew
                 */
                "skew-x": [{
                    "skew-x": scaleSkew()
                }],
                /**
                 * Skew Y
                 * @see https://tailwindcss.com/docs/skew
                 */
                "skew-y": [{
                    "skew-y": scaleSkew()
                }],
                /**
                 * Transform
                 * @see https://tailwindcss.com/docs/transform
                 */
                transform: [{
                    transform: [isArbitraryVariable, isArbitraryValue, "", "none", "gpu", "cpu"]
                }],
                /**
                 * Transform Origin
                 * @see https://tailwindcss.com/docs/transform-origin
                 */
                "transform-origin": [{
                    origin: scalePositionWithArbitrary()
                }],
                /**
                 * Transform Style
                 * @see https://tailwindcss.com/docs/transform-style
                 */
                "transform-style": [{
                    transform: ["3d", "flat"]
                }],
                /**
                 * Translate
                 * @see https://tailwindcss.com/docs/translate
                 */
                translate: [{
                    translate: scaleTranslate()
                }],
                /**
                 * Translate X
                 * @see https://tailwindcss.com/docs/translate
                 */
                "translate-x": [{
                    "translate-x": scaleTranslate()
                }],
                /**
                 * Translate Y
                 * @see https://tailwindcss.com/docs/translate
                 */
                "translate-y": [{
                    "translate-y": scaleTranslate()
                }],
                /**
                 * Translate Z
                 * @see https://tailwindcss.com/docs/translate
                 */
                "translate-z": [{
                    "translate-z": scaleTranslate()
                }],
                /**
                 * Translate None
                 * @see https://tailwindcss.com/docs/translate
                 */
                "translate-none": ["translate-none"],
                // ---------------------
                // --- Interactivity ---
                // ---------------------
                /**
                 * Accent Color
                 * @see https://tailwindcss.com/docs/accent-color
                 */
                accent: [{
                    accent: scaleColor()
                }],
                /**
                 * Appearance
                 * @see https://tailwindcss.com/docs/appearance
                 */
                appearance: [{
                    appearance: ["none", "auto"]
                }],
                /**
                 * Caret Color
                 * @see https://tailwindcss.com/docs/just-in-time-mode#caret-color-utilities
                 */
                "caret-color": [{
                    caret: scaleColor()
                }],
                /**
                 * Color Scheme
                 * @see https://tailwindcss.com/docs/color-scheme
                 */
                "color-scheme": [{
                    scheme: ["normal", "dark", "light", "light-dark", "only-dark", "only-light"]
                }],
                /**
                 * Cursor
                 * @see https://tailwindcss.com/docs/cursor
                 */
                cursor: [{
                    cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", isArbitraryVariable, isArbitraryValue]
                }],
                /**
                 * Field Sizing
                 * @see https://tailwindcss.com/docs/field-sizing
                 */
                "field-sizing": [{
                    "field-sizing": ["fixed", "content"]
                }],
                /**
                 * Pointer Events
                 * @see https://tailwindcss.com/docs/pointer-events
                 */
                "pointer-events": [{
                    "pointer-events": ["auto", "none"]
                }],
                /**
                 * Resize
                 * @see https://tailwindcss.com/docs/resize
                 */
                resize: [{
                    resize: ["none", "", "y", "x"]
                }],
                /**
                 * Scroll Behavior
                 * @see https://tailwindcss.com/docs/scroll-behavior
                 */
                "scroll-behavior": [{
                    scroll: ["auto", "smooth"]
                }],
                /**
                 * Scroll Margin
                 * @see https://tailwindcss.com/docs/scroll-margin
                 */
                "scroll-m": [{
                    "scroll-m": scaleUnambiguousSpacing()
                }],
                /**
                 * Scroll Margin X
                 * @see https://tailwindcss.com/docs/scroll-margin
                 */
                "scroll-mx": [{
                    "scroll-mx": scaleUnambiguousSpacing()
                }],
                /**
                 * Scroll Margin Y
                 * @see https://tailwindcss.com/docs/scroll-margin
                 */
                "scroll-my": [{
                    "scroll-my": scaleUnambiguousSpacing()
                }],
                /**
                 * Scroll Margin Start
                 * @see https://tailwindcss.com/docs/scroll-margin
                 */
                "scroll-ms": [{
                    "scroll-ms": scaleUnambiguousSpacing()
                }],
                /**
                 * Scroll Margin End
                 * @see https://tailwindcss.com/docs/scroll-margin
                 */
                "scroll-me": [{
                    "scroll-me": scaleUnambiguousSpacing()
                }],
                /**
                 * Scroll Margin Top
                 * @see https://tailwindcss.com/docs/scroll-margin
                 */
                "scroll-mt": [{
                    "scroll-mt": scaleUnambiguousSpacing()
                }],
                /**
                 * Scroll Margin Right
                 * @see https://tailwindcss.com/docs/scroll-margin
                 */
                "scroll-mr": [{
                    "scroll-mr": scaleUnambiguousSpacing()
                }],
                /**
                 * Scroll Margin Bottom
                 * @see https://tailwindcss.com/docs/scroll-margin
                 */
                "scroll-mb": [{
                    "scroll-mb": scaleUnambiguousSpacing()
                }],
                /**
                 * Scroll Margin Left
                 * @see https://tailwindcss.com/docs/scroll-margin
                 */
                "scroll-ml": [{
                    "scroll-ml": scaleUnambiguousSpacing()
                }],
                /**
                 * Scroll Padding
                 * @see https://tailwindcss.com/docs/scroll-padding
                 */
                "scroll-p": [{
                    "scroll-p": scaleUnambiguousSpacing()
                }],
                /**
                 * Scroll Padding X
                 * @see https://tailwindcss.com/docs/scroll-padding
                 */
                "scroll-px": [{
                    "scroll-px": scaleUnambiguousSpacing()
                }],
                /**
                 * Scroll Padding Y
                 * @see https://tailwindcss.com/docs/scroll-padding
                 */
                "scroll-py": [{
                    "scroll-py": scaleUnambiguousSpacing()
                }],
                /**
                 * Scroll Padding Start
                 * @see https://tailwindcss.com/docs/scroll-padding
                 */
                "scroll-ps": [{
                    "scroll-ps": scaleUnambiguousSpacing()
                }],
                /**
                 * Scroll Padding End
                 * @see https://tailwindcss.com/docs/scroll-padding
                 */
                "scroll-pe": [{
                    "scroll-pe": scaleUnambiguousSpacing()
                }],
                /**
                 * Scroll Padding Top
                 * @see https://tailwindcss.com/docs/scroll-padding
                 */
                "scroll-pt": [{
                    "scroll-pt": scaleUnambiguousSpacing()
                }],
                /**
                 * Scroll Padding Right
                 * @see https://tailwindcss.com/docs/scroll-padding
                 */
                "scroll-pr": [{
                    "scroll-pr": scaleUnambiguousSpacing()
                }],
                /**
                 * Scroll Padding Bottom
                 * @see https://tailwindcss.com/docs/scroll-padding
                 */
                "scroll-pb": [{
                    "scroll-pb": scaleUnambiguousSpacing()
                }],
                /**
                 * Scroll Padding Left
                 * @see https://tailwindcss.com/docs/scroll-padding
                 */
                "scroll-pl": [{
                    "scroll-pl": scaleUnambiguousSpacing()
                }],
                /**
                 * Scroll Snap Align
                 * @see https://tailwindcss.com/docs/scroll-snap-align
                 */
                "snap-align": [{
                    snap: ["start", "end", "center", "align-none"]
                }],
                /**
                 * Scroll Snap Stop
                 * @see https://tailwindcss.com/docs/scroll-snap-stop
                 */
                "snap-stop": [{
                    snap: ["normal", "always"]
                }],
                /**
                 * Scroll Snap Type
                 * @see https://tailwindcss.com/docs/scroll-snap-type
                 */
                "snap-type": [{
                    snap: ["none", "x", "y", "both"]
                }],
                /**
                 * Scroll Snap Type Strictness
                 * @see https://tailwindcss.com/docs/scroll-snap-type
                 */
                "snap-strictness": [{
                    snap: ["mandatory", "proximity"]
                }],
                /**
                 * Touch Action
                 * @see https://tailwindcss.com/docs/touch-action
                 */
                touch: [{
                    touch: ["auto", "none", "manipulation"]
                }],
                /**
                 * Touch Action X
                 * @see https://tailwindcss.com/docs/touch-action
                 */
                "touch-x": [{
                    "touch-pan": ["x", "left", "right"]
                }],
                /**
                 * Touch Action Y
                 * @see https://tailwindcss.com/docs/touch-action
                 */
                "touch-y": [{
                    "touch-pan": ["y", "up", "down"]
                }],
                /**
                 * Touch Action Pinch Zoom
                 * @see https://tailwindcss.com/docs/touch-action
                 */
                "touch-pz": ["touch-pinch-zoom"],
                /**
                 * User Select
                 * @see https://tailwindcss.com/docs/user-select
                 */
                select: [{
                    select: ["none", "text", "all", "auto"]
                }],
                /**
                 * Will Change
                 * @see https://tailwindcss.com/docs/will-change
                 */
                "will-change": [{
                    "will-change": ["auto", "scroll", "contents", "transform", isArbitraryVariable, isArbitraryValue]
                }],
                // -----------
                // --- SVG ---
                // -----------
                /**
                 * Fill
                 * @see https://tailwindcss.com/docs/fill
                 */
                fill: [{
                    fill: ["none", ...scaleColor()]
                }],
                /**
                 * Stroke Width
                 * @see https://tailwindcss.com/docs/stroke-width
                 */
                "stroke-w": [{
                    stroke: [isNumber, isArbitraryVariableLength, isArbitraryLength, isArbitraryNumber]
                }],
                /**
                 * Stroke
                 * @see https://tailwindcss.com/docs/stroke
                 */
                stroke: [{
                    stroke: ["none", ...scaleColor()]
                }],
                // ---------------------
                // --- Accessibility ---
                // ---------------------
                /**
                 * Forced Color Adjust
                 * @see https://tailwindcss.com/docs/forced-color-adjust
                 */
                "forced-color-adjust": [{
                    "forced-color-adjust": ["auto", "none"]
                }]
            },
            conflictingClassGroups: {
                overflow: ["overflow-x", "overflow-y"],
                overscroll: ["overscroll-x", "overscroll-y"],
                inset: ["inset-x", "inset-y", "start", "end", "top", "right", "bottom", "left"],
                "inset-x": ["right", "left"],
                "inset-y": ["top", "bottom"],
                flex: ["basis", "grow", "shrink"],
                gap: ["gap-x", "gap-y"],
                p: ["px", "py", "ps", "pe", "pt", "pr", "pb", "pl"],
                px: ["pr", "pl"],
                py: ["pt", "pb"],
                m: ["mx", "my", "ms", "me", "mt", "mr", "mb", "ml"],
                mx: ["mr", "ml"],
                my: ["mt", "mb"],
                size: ["w", "h"],
                "font-size": ["leading"],
                "fvn-normal": ["fvn-ordinal", "fvn-slashed-zero", "fvn-figure", "fvn-spacing", "fvn-fraction"],
                "fvn-ordinal": ["fvn-normal"],
                "fvn-slashed-zero": ["fvn-normal"],
                "fvn-figure": ["fvn-normal"],
                "fvn-spacing": ["fvn-normal"],
                "fvn-fraction": ["fvn-normal"],
                "line-clamp": ["display", "overflow"],
                rounded: ["rounded-s", "rounded-e", "rounded-t", "rounded-r", "rounded-b", "rounded-l", "rounded-ss", "rounded-se", "rounded-ee", "rounded-es", "rounded-tl", "rounded-tr", "rounded-br", "rounded-bl"],
                "rounded-s": ["rounded-ss", "rounded-es"],
                "rounded-e": ["rounded-se", "rounded-ee"],
                "rounded-t": ["rounded-tl", "rounded-tr"],
                "rounded-r": ["rounded-tr", "rounded-br"],
                "rounded-b": ["rounded-br", "rounded-bl"],
                "rounded-l": ["rounded-tl", "rounded-bl"],
                "border-spacing": ["border-spacing-x", "border-spacing-y"],
                "border-w": ["border-w-x", "border-w-y", "border-w-s", "border-w-e", "border-w-t", "border-w-r", "border-w-b", "border-w-l"],
                "border-w-x": ["border-w-r", "border-w-l"],
                "border-w-y": ["border-w-t", "border-w-b"],
                "border-color": ["border-color-x", "border-color-y", "border-color-s", "border-color-e", "border-color-t", "border-color-r", "border-color-b", "border-color-l"],
                "border-color-x": ["border-color-r", "border-color-l"],
                "border-color-y": ["border-color-t", "border-color-b"],
                translate: ["translate-x", "translate-y", "translate-none"],
                "translate-none": ["translate", "translate-x", "translate-y", "translate-z"],
                "scroll-m": ["scroll-mx", "scroll-my", "scroll-ms", "scroll-me", "scroll-mt", "scroll-mr", "scroll-mb", "scroll-ml"],
                "scroll-mx": ["scroll-mr", "scroll-ml"],
                "scroll-my": ["scroll-mt", "scroll-mb"],
                "scroll-p": ["scroll-px", "scroll-py", "scroll-ps", "scroll-pe", "scroll-pt", "scroll-pr", "scroll-pb", "scroll-pl"],
                "scroll-px": ["scroll-pr", "scroll-pl"],
                "scroll-py": ["scroll-pt", "scroll-pb"],
                touch: ["touch-x", "touch-y", "touch-pz"],
                "touch-x": ["touch"],
                "touch-y": ["touch"],
                "touch-pz": ["touch"]
            },
            conflictingClassGroupModifiers: {
                "font-size": ["leading"]
            },
            orderSensitiveModifiers: ["*", "**", "after", "backdrop", "before", "details-content", "file", "first-letter", "first-line", "marker", "placeholder", "selection"]
        };
    };
    var twMerge = /* @__PURE__ */ createTailwindMerge(getDefaultConfig);

    // src/lib/utils.ts
    function cn(...inputs) {
        return twMerge(clsx(inputs));
    }

    // src/components/ui/dropdown-menu.tsx
    var import_jsx_runtime15 = require("react/jsx-runtime");
    var DropdownMenu2 = Root22;
    var DropdownMenuTrigger2 = Trigger;
    var DropdownMenuSubTrigger2 = React34.forwardRef((_a, ref) => {
        var _b = _a,
            { className, inset, children } = _b,
            props = __objRest(_b, ["className", "inset", "children"]);
        return /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)(
            SubTrigger2,
            __spreadProps(__spreadValues({
                ref,
                className: cn(
                    "flex cursor-default gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
                    inset && "pl-8",
                    className
                )
            }, props), {
                children: [
                    children,
                    /* @__PURE__ */
                    (0, import_jsx_runtime15.jsx)(ChevronRight, { className: "ml-auto" })
                ]
            })
        );
    });
    DropdownMenuSubTrigger2.displayName = SubTrigger2.displayName;
    var DropdownMenuSubContent2 = React34.forwardRef((_a, ref) => {
        var _b = _a,
            { className } = _b,
            props = __objRest(_b, ["className"]);
        return /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
            SubContent2,
            __spreadValues({
                ref,
                className: cn(
                    "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
                    className
                )
            }, props)
        );
    });
    DropdownMenuSubContent2.displayName = SubContent2.displayName;
    var DropdownMenuContent2 = React34.forwardRef((_a, ref) => {
        var _b = _a,
            { className, sideOffset = 4 } = _b,
            props = __objRest(_b, ["className", "sideOffset"]);
        return /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(Portal22, {
            children: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
                Content22,
                __spreadValues({
                    ref,
                    sideOffset,
                    className: cn(
                        "z-50 w-full min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg shadow-zinc-200/50 border-zinc-300/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
                        className
                    )
                }, props)
            )
        });
    });
    DropdownMenuContent2.displayName = Content22.displayName;
    var DropdownMenuItem2 = React34.forwardRef((_a, ref) => {
        var _b = _a,
            { className, inset } = _b,
            props = __objRest(_b, ["className", "inset"]);
        return /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
            Item22,
            __spreadValues({
                ref,
                className: cn(
                    "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
                    inset && "pl-8",
                    className
                )
            }, props)
        );
    });
    DropdownMenuItem2.displayName = Item22.displayName;
    var DropdownMenuCheckboxItem2 = React34.forwardRef((_a, ref) => {
        var _b = _a,
            { className, children, checked } = _b,
            props = __objRest(_b, ["className", "children", "checked"]);
        return /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)(
            CheckboxItem2,
            __spreadProps(__spreadValues({
                ref,
                className: cn(
                    "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
                    className
                ),
                checked
            }, props), {
                children: [
                    /* @__PURE__ */
                    (0, import_jsx_runtime15.jsx)("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(ItemIndicator2, { children: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(Check, { className: "h-4 w-4" }) }) }),
                    children
                ]
            })
        );
    });
    DropdownMenuCheckboxItem2.displayName = CheckboxItem2.displayName;
    var DropdownMenuRadioItem2 = React34.forwardRef((_a, ref) => {
        var _b = _a,
            { className, children } = _b,
            props = __objRest(_b, ["className", "children"]);
        return /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)(
            RadioItem2,
            __spreadProps(__spreadValues({
                ref,
                className: cn(
                    "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
                    className
                )
            }, props), {
                children: [
                    /* @__PURE__ */
                    (0, import_jsx_runtime15.jsx)("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(ItemIndicator2, { children: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(Circle, { className: "h-2 w-2 fill-current" }) }) }),
                    children
                ]
            })
        );
    });
    DropdownMenuRadioItem2.displayName = RadioItem2.displayName;
    var DropdownMenuLabel2 = React34.forwardRef((_a, ref) => {
        var _b = _a,
            { className, inset } = _b,
            props = __objRest(_b, ["className", "inset"]);
        return /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
            Label2,
            __spreadValues({
                ref,
                className: cn(
                    "px-2 py-1.5 text-sm font-semibold",
                    inset && "pl-8",
                    className
                )
            }, props)
        );
    });
    DropdownMenuLabel2.displayName = Label2.displayName;
    var DropdownMenuSeparator2 = React34.forwardRef((_a, ref) => {
        var _b = _a,
            { className } = _b,
            props = __objRest(_b, ["className"]);
        return /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
            Separator2,
            __spreadValues({
                ref,
                className: cn("-mx-1 my-1 h-px bg-muted", className)
            }, props)
        );
    });
    DropdownMenuSeparator2.displayName = Separator2.displayName;
    var DropdownMenuShortcut = (_a) => {
        var _b = _a,
            {
                className
            } = _b,
            props = __objRest(_b, [
                "className"
            ]);
        return /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
            "span",
            __spreadValues({
                className: cn("ml-auto text-xs tracking-widest opacity-60", className)
            }, props)
        );
    };
    DropdownMenuShortcut.displayName = "DropdownMenuShortcut";

    // src/components/ui/button.tsx
    var React35 = __toESM(require("react"));

    // node_modules/class-variance-authority/dist/index.mjs
    var falsyToString = (value) => typeof value === "boolean" ? `${value}` : value === 0 ? "0" : value;
    var cx = clsx;
    var cva = (base, config) => (props) => {
        var _config_compoundVariants;
        if ((config === null || config === void 0 ? void 0 : config.variants) == null) return cx(base, props === null || props === void 0 ? void 0 : props.class, props === null || props === void 0 ? void 0 : props.className);
        const { variants, defaultVariants } = config;
        const getVariantClassNames = Object.keys(variants).map((variant) => {
            const variantProp = props === null || props === void 0 ? void 0 : props[variant];
            const defaultVariantProp = defaultVariants === null || defaultVariants === void 0 ? void 0 : defaultVariants[variant];
            if (variantProp === null) return null;
            const variantKey = falsyToString(variantProp) || falsyToString(defaultVariantProp);
            return variants[variant][variantKey];
        });
        const propsWithoutUndefined = props && Object.entries(props).reduce((acc, param) => {
            let [key, value] = param;
            if (value === void 0) {
                return acc;
            }
            acc[key] = value;
            return acc;
        }, {});
        const getCompoundVariantClassNames = config === null || config === void 0 ? void 0 : (_config_compoundVariants = config.compoundVariants) === null || _config_compoundVariants === void 0 ? void 0 : _config_compoundVariants.reduce((acc, param) => {
            let _a = param,
                { class: cvClass, className: cvClassName } = _a,
                compoundVariantOptions = __objRest(_a, ["class", "className"]);
            return Object.entries(compoundVariantOptions).every((param2) => {
                let [key, value] = param2;
                return Array.isArray(value) ? value.includes(__spreadValues(__spreadValues({}, defaultVariants), propsWithoutUndefined)[key]) : __spreadValues(__spreadValues({}, defaultVariants), propsWithoutUndefined)[key] === value;
            }) ? [
                ...acc,
                cvClass,
                cvClassName
            ] : acc;
        }, []);
        return cx(base, getVariantClassNames, getCompoundVariantClassNames, props === null || props === void 0 ? void 0 : props.class, props === null || props === void 0 ? void 0 : props.className);
    };

    // src/components/ui/button.tsx
    var import_jsx_runtime16 = require("react/jsx-runtime");
    var buttonVariants = cva(
        "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
            variants: {
                variant: {
                    default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
                    destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
                    outline: "border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground",
                    secondary: "bg-zinc-100 text-secondary-foreground shadow-sm hover:bg-zinc-100/80 border border-zinc-200/50",
                    ghost: "hover:bg-accent hover:text-accent-foreground",
                    link: "text-primary underline-offset-4 hover:underline"
                },
                size: {
                    default: "h-10 px-4 py-2",
                    sm: "h-8 rounded-md px-3 text-xs",
                    lg: "h-12 rounded-[10px] px-8",
                    icon: "h-10 w-10 rounded-[10px]"
                }
            },
            defaultVariants: {
                variant: "default",
                size: "default"
            }
        }
    );
    var Button = React35.forwardRef(
        (_a, ref) => {
            var _b = _a,
                { className, variant, size: size4, asChild = false } = _b,
                props = __objRest(_b, ["className", "variant", "size", "asChild"]);
            const Comp = asChild ? Slot : "button";
            return /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
                Comp,
                __spreadValues({
                    className: cn(buttonVariants({ variant, size: size4, className })),
                    ref
                }, props)
            );
        }
    );
    Button.displayName = "Button";

    // src/components/product-switcher/product-icon.tsx
    var import_image = __toESM(require_image());
    var import_link = __toESM(require_link2());
    var import_jsx_runtime17 = require("react/jsx-runtime");
    var ProductIcon = ({
        image,
        title,
        url,
        className = ""
    }) => {
        return /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)(
            import_link.default, {
                href: url,
                target: "_blank",
                rel: "noopener noreferrer",
                className: `flex items-center w-full p-3 rounded-xl border hover:bg-gray-50 transition ${className}`,
                children: [
                    /* @__PURE__ */
                    (0, import_jsx_runtime17.jsx)(import_image.default, { width: 28, height: 28, src: image, alt: title, className: "mr-3" }),
                    /* @__PURE__ */
                    (0, import_jsx_runtime17.jsx)("span", { className: "font-medium text-sm", children: title })
                ]
            }
        );
    };
    var product_icon_default = ProductIcon;

    // src/assets/ads-logo.svg
    <<
    << << < HEAD
    var ads_logo_default = "./ads-logo-T3W3EQOF.svg";

    // src/assets/signage-icon.svg
    var signage_icon_default = "./signage-icon-Y3AVAB37.svg";

    // src/assets/publisher-logo.svg
    var publisher_logo_default = "./publisher-logo-CDQW4NR4.svg";

    // src/assets/studio-logo.svg
    var studio_logo_default = "./studio-logo-UA7JT6UG.svg"; ===
    === =
    var ads_logo_default = "./ads-logo-KU3MWH64.svg";

    // src/assets/signage-icon.svg
    var signage_icon_default = "./signage-icon-ZMVV6S3T.svg";

    // src/assets/publisher-logo.svg
    var publisher_logo_default = "./publisher-logo-RRVYVYLW.svg";

    // src/assets/studio-logo.svg
    var studio_logo_default = "./studio-logo-WT6UAQSQ.svg"; >>>
    >>> > fc2972cdfea83c8168f72c39dcaf168d2d56269f

    // src/components/product-switcher/product-switcher.tsx
    var import_jsx_runtime18 = require("react/jsx-runtime");
    var profileIcon = "https://ui-avatars.com/api/?name=SALT&background=000&color=fff&rounded=true";
    var ProductSwitcher = () => {
        const profile = {
            name: "Manage My Account",
            icon: profileIcon,
            url: "#"
                // Replace with actual profile/account URL if needed
        };
        const mediaOwner = [{
                title: "Nitx Signage",
                image: signage_icon_default,
                url: "#"
            },
            {
                title: "Nitx Publisher",
                image: publisher_logo_default,
                url: "#"
            }
            // {
            //   title: "Nitx Nexus",
            //   image: nexusLogo,
            //   url: "#",
            // },
        ];
        const advertiser = [{
                title: "Nitx Ads",
                image: ads_logo_default,
                url: "#"
            },
            {
                title: "Nitx Studio",
                image: studio_logo_default,
                url: "#"
            }
        ];
        return /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)(DropdownMenu2, {
            children: [
                /* @__PURE__ */
                (0, import_jsx_runtime18.jsx)(DropdownMenuTrigger2, { asChild: true, children: /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(Button, { size: "icon", variant: "outline", className: "shadow-none", children: /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(Grip, { className: "w-6 h-6" }) }) }),
                /* @__PURE__ */
                (0, import_jsx_runtime18.jsxs)(DropdownMenuContent2, {
                    align: "end",
                    className: "w-80 p-4 rounded-2xl",
                    children: [
                        /* @__PURE__ */
                        (0, import_jsx_runtime18.jsxs)(
                            "a", {
                                href: profile.url,
                                target: "_blank",
                                className: "flex items-center w-full p-3 rounded-xl border mb-4 hover:bg-gray-50 transition",
                                children: [
                                    /* @__PURE__ */
                                    (0, import_jsx_runtime18.jsx)(
                                        "img", {
                                            src: profile.icon,
                                            alt: "Profile",
                                            className: "w-8 h-8 rounded-full mr-3"
                                        }
                                    ),
                                    /* @__PURE__ */
                                    (0, import_jsx_runtime18.jsx)("span", { className: "flex-1 text-left font-medium", children: profile.name }),
                                    /* @__PURE__ */
                                    (0, import_jsx_runtime18.jsx)(ChevronRight, { className: "size-4" })
                                ]
                            }
                        ),
                        /* @__PURE__ */
                        (0, import_jsx_runtime18.jsx)("div", { className: "mb-2 text-sm font-semibold text-gray-700", children: "Media Owner" }),
                        /* @__PURE__ */
                        (0, import_jsx_runtime18.jsx)("div", { className: "grid grid-cols-2 gap-3 mb-4", children: mediaOwner.map((product) => /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(product_icon_default, __spreadValues({}, product), product.title)) }),
                        /* @__PURE__ */
                        (0, import_jsx_runtime18.jsx)("div", { className: "mb-2 mt-10 text-sm font-semibold text-gray-700", children: "Advertiser" }),
                        /* @__PURE__ */
                        (0, import_jsx_runtime18.jsx)("div", { className: "grid grid-cols-2 gap-3", children: advertiser.map((product) => /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(product_icon_default, __spreadValues({}, product), product.title)) })
                    ]
                })
            ]
        });
    }; <<
    << << < HEAD
    // Annotate the CommonJS export names for ESM import in node:
    0 && (module.exports = {
        Button,
        ProductSwitcher,
        buttonVariants
    });
    /*! Bundled license information:

    =======

    // src/components/user-account/account.tsx
    var import_react7 = require("react");

    // src/components/ui/avatar.tsx
    var React37 = __toESM(require("react"));

    // node_modules/@radix-ui/react-avatar/dist/index.mjs
    var React36 = __toESM(require("react"), 1);

    // node_modules/@radix-ui/react-use-is-hydrated/dist/index.mjs
    var import_shim = __toESM(require_shim(), 1);
    function useIsHydrated() {
      return (0, import_shim.useSyncExternalStore)(
        subscribe,
        () => true,
        () => false
      );
    }
    function subscribe() {
      return () => {
      };
    }

    // node_modules/@radix-ui/react-avatar/dist/index.mjs
    var import_jsx_runtime19 = require("react/jsx-runtime");
    var AVATAR_NAME = "Avatar";
    var [createAvatarContext, createAvatarScope] = createContextScope(AVATAR_NAME);
    var [AvatarProvider, useAvatarContext] = createAvatarContext(AVATAR_NAME);
    var Avatar = React36.forwardRef(
      (props, forwardedRef) => {
        const _a = props, { __scopeAvatar } = _a, avatarProps = __objRest(_a, ["__scopeAvatar"]);
        const [imageLoadingStatus, setImageLoadingStatus] = React36.useState("idle");
        return /* @__PURE__ */
    (0, import_jsx_runtime19.jsx)(
        AvatarProvider, {
            scope: __scopeAvatar,
            imageLoadingStatus,
            onImageLoadingStatusChange: setImageLoadingStatus,
            children: /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(Primitive.span, __spreadProps(__spreadValues({}, avatarProps), { ref: forwardedRef }))
        }
    );
});
Avatar.displayName = AVATAR_NAME;
var IMAGE_NAME = "AvatarImage";
var AvatarImage = React36.forwardRef(
    (props, forwardedRef) => {
        const _a = props,
            {
                __scopeAvatar,
                src,
                onLoadingStatusChange = () => {}
            } = _a,
            imageProps = __objRest(_a, ["__scopeAvatar", "src", "onLoadingStatusChange"]);
        const context = useAvatarContext(IMAGE_NAME, __scopeAvatar);
        const imageLoadingStatus = useImageLoadingStatus(src, imageProps);
        const handleLoadingStatusChange = useCallbackRef((status) => {
            onLoadingStatusChange(status);
            context.onImageLoadingStatusChange(status);
        });
        useLayoutEffect2(() => {
            if (imageLoadingStatus !== "idle") {
                handleLoadingStatusChange(imageLoadingStatus);
            }
        }, [imageLoadingStatus, handleLoadingStatusChange]);
        return imageLoadingStatus === "loaded" ? /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(Primitive.img, __spreadProps(__spreadValues({}, imageProps), { ref: forwardedRef, src })) : null;
    }
);
AvatarImage.displayName = IMAGE_NAME;
var FALLBACK_NAME = "AvatarFallback";
var AvatarFallback = React36.forwardRef(
    (props, forwardedRef) => {
        const _a = props,
            { __scopeAvatar, delayMs } = _a,
            fallbackProps = __objRest(_a, ["__scopeAvatar", "delayMs"]);
        const context = useAvatarContext(FALLBACK_NAME, __scopeAvatar);
        const [canRender, setCanRender] = React36.useState(delayMs === void 0);
        React36.useEffect(() => {
            if (delayMs !== void 0) {
                const timerId = window.setTimeout(() => setCanRender(true), delayMs);
                return () => window.clearTimeout(timerId);
            }
        }, [delayMs]);
        return canRender && context.imageLoadingStatus !== "loaded" ? /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(Primitive.span, __spreadProps(__spreadValues({}, fallbackProps), { ref: forwardedRef })) : null;
    }
);
AvatarFallback.displayName = FALLBACK_NAME;

function resolveLoadingStatus(image, src) {
    if (!image) {
        return "idle";
    }
    if (!src) {
        return "error";
    }
    if (image.src !== src) {
        image.src = src;
    }
    return image.complete && image.naturalWidth > 0 ? "loaded" : "loading";
}

function useImageLoadingStatus(src, { referrerPolicy, crossOrigin }) {
    const isHydrated = useIsHydrated();
    const imageRef = React36.useRef(null);
    const image = (() => {
        if (!isHydrated) return null;
        if (!imageRef.current) {
            imageRef.current = new window.Image();
        }
        return imageRef.current;
    })();
    const [loadingStatus, setLoadingStatus] = React36.useState(
        () => resolveLoadingStatus(image, src)
    );
    useLayoutEffect2(() => {
        setLoadingStatus(resolveLoadingStatus(image, src));
    }, [image, src]);
    useLayoutEffect2(() => {
        const updateStatus = (status) => () => {
            setLoadingStatus(status);
        };
        if (!image) return;
        const handleLoad = updateStatus("loaded");
        const handleError = updateStatus("error");
        image.addEventListener("load", handleLoad);
        image.addEventListener("error", handleError);
        if (referrerPolicy) {
            image.referrerPolicy = referrerPolicy;
        }
        if (typeof crossOrigin === "string") {
            image.crossOrigin = crossOrigin;
        }
        return () => {
            image.removeEventListener("load", handleLoad);
            image.removeEventListener("error", handleError);
        };
    }, [image, crossOrigin, referrerPolicy]);
    return loadingStatus;
}
var Root4 = Avatar;
var Image2 = AvatarImage;
var Fallback = AvatarFallback;

// src/components/ui/avatar.tsx
var import_jsx_runtime20 = require("react/jsx-runtime");
var Avatar2 = React37.forwardRef((_a, ref) => {
    var _b = _a,
        { className } = _b,
        props = __objRest(_b, ["className"]);
    return /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(
        Root4,
        __spreadValues({
            ref,
            className: cn(
                "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
                className
            )
        }, props)
    );
});
Avatar2.displayName = Root4.displayName;
var AvatarImage2 = React37.forwardRef((_a, ref) => {
    var _b = _a,
        { className } = _b,
        props = __objRest(_b, ["className"]);
    return /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(
        Image2,
        __spreadValues({
            ref,
            className: cn("aspect-square h-full w-full", className)
        }, props)
    );
});
AvatarImage2.displayName = Image2.displayName;
var AvatarFallback2 = React37.forwardRef((_a, ref) => {
    var _b = _a,
        { className } = _b,
        props = __objRest(_b, ["className"]);
    return /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(
        Fallback,
        __spreadValues({
            ref,
            className: cn(
                "flex h-full w-full items-center justify-center rounded-full bg-muted",
                className
            )
        }, props)
    );
});
AvatarFallback2.displayName = Fallback.displayName;

// src/components/user-account/account.tsx
var import_jsx_runtime21 = require("react/jsx-runtime");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
    ProductSwitcher
});
/*! Bundled license information:

use-sync-external-store/cjs/use-sync-external-store-shim.production.js:
  (**
   * @license React
   * use-sync-external-store-shim.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

use-sync-external-store/cjs/use-sync-external-store-shim.development.js:
  (**
   * @license React
   * use-sync-external-store-shim.development.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

>>>>>>> fc2972cdfea83c8168f72c39dcaf168d2d56269f
lucide-react/dist/esm/shared/src/utils.js:
lucide-react/dist/esm/defaultAttributes.js:
lucide-react/dist/esm/Icon.js:
lucide-react/dist/esm/createLucideIcon.js:
lucide-react/dist/esm/icons/check.js:
lucide-react/dist/esm/icons/chevron-right.js:
lucide-react/dist/esm/icons/circle.js:
lucide-react/dist/esm/icons/grip.js:
lucide-react/dist/esm/lucide-react.js:
  (**
   * @license lucide-react v0.525.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)
*/