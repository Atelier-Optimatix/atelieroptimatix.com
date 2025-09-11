globalThis.process ??= {}; globalThis.process.env ??= {};
import { a8 as bold, a9 as red, y as yellow, aa as dim, ab as blue } from './chunks/astro_C6DN7fAn.mjs';

const dateTimeFormat = new Intl.DateTimeFormat([], {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false
});
const levels = {
  debug: 20,
  info: 30,
  warn: 40,
  error: 50,
  silent: 90
};
function log(opts, level, label, message, newLine = true) {
  const logLevel = opts.level;
  const dest = opts.dest;
  const event = {
    label,
    level,
    message,
    newLine
  };
  if (!isLogLevelEnabled(logLevel, level)) {
    return;
  }
  dest.write(event);
}
function isLogLevelEnabled(configuredLogLevel, level) {
  return levels[configuredLogLevel] <= levels[level];
}
function info(opts, label, message, newLine = true) {
  return log(opts, "info", label, message, newLine);
}
function warn(opts, label, message, newLine = true) {
  return log(opts, "warn", label, message, newLine);
}
function error(opts, label, message, newLine = true) {
  return log(opts, "error", label, message, newLine);
}
function debug(...args) {
  if ("_astroGlobalDebug" in globalThis) {
    globalThis._astroGlobalDebug(...args);
  }
}
function getEventPrefix({ level, label }) {
  const timestamp = `${dateTimeFormat.format(/* @__PURE__ */ new Date())}`;
  const prefix = [];
  if (level === "error" || level === "warn") {
    prefix.push(bold(timestamp));
    prefix.push(`[${level.toUpperCase()}]`);
  } else {
    prefix.push(timestamp);
  }
  if (label) {
    prefix.push(`[${label}]`);
  }
  if (level === "error") {
    return red(prefix.join(" "));
  }
  if (level === "warn") {
    return yellow(prefix.join(" "));
  }
  if (prefix.length === 1) {
    return dim(prefix[0]);
  }
  return dim(prefix[0]) + " " + blue(prefix.splice(1).join(" "));
}
if (typeof process !== "undefined") {
  let proc = process;
  if ("argv" in proc && Array.isArray(proc.argv)) {
    if (proc.argv.includes("--verbose")) ; else if (proc.argv.includes("--silent")) ; else ;
  }
}
class Logger {
  options;
  constructor(options) {
    this.options = options;
  }
  info(label, message, newLine = true) {
    info(this.options, label, message, newLine);
  }
  warn(label, message, newLine = true) {
    warn(this.options, label, message, newLine);
  }
  error(label, message, newLine = true) {
    error(this.options, label, message, newLine);
  }
  debug(label, ...messages) {
    debug(label, ...messages);
  }
  level() {
    return this.options.level;
  }
  forkIntegrationLogger(label) {
    return new AstroIntegrationLogger(this.options, label);
  }
}
class AstroIntegrationLogger {
  options;
  label;
  constructor(logging, label) {
    this.options = logging;
    this.label = label;
  }
  /**
   * Creates a new logger instance with a new label, but the same log options.
   */
  fork(label) {
    return new AstroIntegrationLogger(this.options, label);
  }
  info(message) {
    info(this.options, this.label, message);
  }
  warn(message) {
    warn(this.options, this.label, message);
  }
  error(message) {
    error(this.options, this.label, message);
  }
  debug(message) {
    debug(this.label, message);
  }
}

/**
 * Tokenize input string.
 */
function lexer(str) {
    var tokens = [];
    var i = 0;
    while (i < str.length) {
        var char = str[i];
        if (char === "*" || char === "+" || char === "?") {
            tokens.push({ type: "MODIFIER", index: i, value: str[i++] });
            continue;
        }
        if (char === "\\") {
            tokens.push({ type: "ESCAPED_CHAR", index: i++, value: str[i++] });
            continue;
        }
        if (char === "{") {
            tokens.push({ type: "OPEN", index: i, value: str[i++] });
            continue;
        }
        if (char === "}") {
            tokens.push({ type: "CLOSE", index: i, value: str[i++] });
            continue;
        }
        if (char === ":") {
            var name = "";
            var j = i + 1;
            while (j < str.length) {
                var code = str.charCodeAt(j);
                if (
                // `0-9`
                (code >= 48 && code <= 57) ||
                    // `A-Z`
                    (code >= 65 && code <= 90) ||
                    // `a-z`
                    (code >= 97 && code <= 122) ||
                    // `_`
                    code === 95) {
                    name += str[j++];
                    continue;
                }
                break;
            }
            if (!name)
                throw new TypeError("Missing parameter name at ".concat(i));
            tokens.push({ type: "NAME", index: i, value: name });
            i = j;
            continue;
        }
        if (char === "(") {
            var count = 1;
            var pattern = "";
            var j = i + 1;
            if (str[j] === "?") {
                throw new TypeError("Pattern cannot start with \"?\" at ".concat(j));
            }
            while (j < str.length) {
                if (str[j] === "\\") {
                    pattern += str[j++] + str[j++];
                    continue;
                }
                if (str[j] === ")") {
                    count--;
                    if (count === 0) {
                        j++;
                        break;
                    }
                }
                else if (str[j] === "(") {
                    count++;
                    if (str[j + 1] !== "?") {
                        throw new TypeError("Capturing groups are not allowed at ".concat(j));
                    }
                }
                pattern += str[j++];
            }
            if (count)
                throw new TypeError("Unbalanced pattern at ".concat(i));
            if (!pattern)
                throw new TypeError("Missing pattern at ".concat(i));
            tokens.push({ type: "PATTERN", index: i, value: pattern });
            i = j;
            continue;
        }
        tokens.push({ type: "CHAR", index: i, value: str[i++] });
    }
    tokens.push({ type: "END", index: i, value: "" });
    return tokens;
}
/**
 * Parse a string for the raw tokens.
 */
function parse(str, options) {
    if (options === void 0) { options = {}; }
    var tokens = lexer(str);
    var _a = options.prefixes, prefixes = _a === void 0 ? "./" : _a, _b = options.delimiter, delimiter = _b === void 0 ? "/#?" : _b;
    var result = [];
    var key = 0;
    var i = 0;
    var path = "";
    var tryConsume = function (type) {
        if (i < tokens.length && tokens[i].type === type)
            return tokens[i++].value;
    };
    var mustConsume = function (type) {
        var value = tryConsume(type);
        if (value !== undefined)
            return value;
        var _a = tokens[i], nextType = _a.type, index = _a.index;
        throw new TypeError("Unexpected ".concat(nextType, " at ").concat(index, ", expected ").concat(type));
    };
    var consumeText = function () {
        var result = "";
        var value;
        while ((value = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR"))) {
            result += value;
        }
        return result;
    };
    var isSafe = function (value) {
        for (var _i = 0, delimiter_1 = delimiter; _i < delimiter_1.length; _i++) {
            var char = delimiter_1[_i];
            if (value.indexOf(char) > -1)
                return true;
        }
        return false;
    };
    var safePattern = function (prefix) {
        var prev = result[result.length - 1];
        var prevText = prefix || (prev && typeof prev === "string" ? prev : "");
        if (prev && !prevText) {
            throw new TypeError("Must have text between two parameters, missing text after \"".concat(prev.name, "\""));
        }
        if (!prevText || isSafe(prevText))
            return "[^".concat(escapeString(delimiter), "]+?");
        return "(?:(?!".concat(escapeString(prevText), ")[^").concat(escapeString(delimiter), "])+?");
    };
    while (i < tokens.length) {
        var char = tryConsume("CHAR");
        var name = tryConsume("NAME");
        var pattern = tryConsume("PATTERN");
        if (name || pattern) {
            var prefix = char || "";
            if (prefixes.indexOf(prefix) === -1) {
                path += prefix;
                prefix = "";
            }
            if (path) {
                result.push(path);
                path = "";
            }
            result.push({
                name: name || key++,
                prefix: prefix,
                suffix: "",
                pattern: pattern || safePattern(prefix),
                modifier: tryConsume("MODIFIER") || "",
            });
            continue;
        }
        var value = char || tryConsume("ESCAPED_CHAR");
        if (value) {
            path += value;
            continue;
        }
        if (path) {
            result.push(path);
            path = "";
        }
        var open = tryConsume("OPEN");
        if (open) {
            var prefix = consumeText();
            var name_1 = tryConsume("NAME") || "";
            var pattern_1 = tryConsume("PATTERN") || "";
            var suffix = consumeText();
            mustConsume("CLOSE");
            result.push({
                name: name_1 || (pattern_1 ? key++ : ""),
                pattern: name_1 && !pattern_1 ? safePattern(prefix) : pattern_1,
                prefix: prefix,
                suffix: suffix,
                modifier: tryConsume("MODIFIER") || "",
            });
            continue;
        }
        mustConsume("END");
    }
    return result;
}
/**
 * Compile a string to a template function for the path.
 */
function compile(str, options) {
    return tokensToFunction(parse(str, options), options);
}
/**
 * Expose a method for transforming tokens into the path function.
 */
function tokensToFunction(tokens, options) {
    if (options === void 0) { options = {}; }
    var reFlags = flags(options);
    var _a = options.encode, encode = _a === void 0 ? function (x) { return x; } : _a, _b = options.validate, validate = _b === void 0 ? true : _b;
    // Compile all the tokens into regexps.
    var matches = tokens.map(function (token) {
        if (typeof token === "object") {
            return new RegExp("^(?:".concat(token.pattern, ")$"), reFlags);
        }
    });
    return function (data) {
        var path = "";
        for (var i = 0; i < tokens.length; i++) {
            var token = tokens[i];
            if (typeof token === "string") {
                path += token;
                continue;
            }
            var value = data ? data[token.name] : undefined;
            var optional = token.modifier === "?" || token.modifier === "*";
            var repeat = token.modifier === "*" || token.modifier === "+";
            if (Array.isArray(value)) {
                if (!repeat) {
                    throw new TypeError("Expected \"".concat(token.name, "\" to not repeat, but got an array"));
                }
                if (value.length === 0) {
                    if (optional)
                        continue;
                    throw new TypeError("Expected \"".concat(token.name, "\" to not be empty"));
                }
                for (var j = 0; j < value.length; j++) {
                    var segment = encode(value[j], token);
                    if (validate && !matches[i].test(segment)) {
                        throw new TypeError("Expected all \"".concat(token.name, "\" to match \"").concat(token.pattern, "\", but got \"").concat(segment, "\""));
                    }
                    path += token.prefix + segment + token.suffix;
                }
                continue;
            }
            if (typeof value === "string" || typeof value === "number") {
                var segment = encode(String(value), token);
                if (validate && !matches[i].test(segment)) {
                    throw new TypeError("Expected \"".concat(token.name, "\" to match \"").concat(token.pattern, "\", but got \"").concat(segment, "\""));
                }
                path += token.prefix + segment + token.suffix;
                continue;
            }
            if (optional)
                continue;
            var typeOfMessage = repeat ? "an array" : "a string";
            throw new TypeError("Expected \"".concat(token.name, "\" to be ").concat(typeOfMessage));
        }
        return path;
    };
}
/**
 * Escape a regular expression string.
 */
function escapeString(str) {
    return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
/**
 * Get the flags for a regexp from the options.
 */
function flags(options) {
    return options && options.sensitive ? "" : "i";
}

function getRouteGenerator(segments, addTrailingSlash) {
  const template = segments.map((segment) => {
    return "/" + segment.map((part) => {
      if (part.spread) {
        return `:${part.content.slice(3)}(.*)?`;
      } else if (part.dynamic) {
        return `:${part.content}`;
      } else {
        return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }
    }).join("");
  }).join("");
  let trailing = "";
  if (addTrailingSlash === "always" && segments.length) {
    trailing = "/";
  }
  const toPath = compile(template + trailing);
  return (params) => {
    const path = toPath(params);
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware(_, next) {
      return next();
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes
  };
}

const manifest = deserializeManifest({"adapterName":"@astrojs/cloudflare","routes":[{"file":"404.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/404","isIndex":false,"type":"page","pattern":"^\\/404\\/?$","segments":[[{"content":"404","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/404.astro","pathname":"/404","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"rss.xml","links":[],"scripts":[],"styles":[],"routeData":{"route":"/rss.xml","isIndex":false,"type":"endpoint","pattern":"^\\/rss\\.xml\\/?$","segments":[[{"content":"rss.xml","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/rss.xml.js","pathname":"/rss.xml","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/page.BvKxy2Uc.js"}],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/@astrojs/cloudflare/dist/entrypoints/image-endpoint.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/page.BvKxy2Uc.js"}],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/api/keystatic/[...params]","pattern":"^\\/api\\/keystatic(?:\\/(.*?))?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"keystatic","dynamic":false,"spread":false}],[{"content":"...params","dynamic":true,"spread":true}]],"params":["...params"],"component":"node_modules/@keystatic/astro/internal/keystatic-api.js","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/page.BvKxy2Uc.js"}],"styles":[],"routeData":{"type":"page","isIndex":false,"route":"/keystatic/[...params]","pattern":"^\\/keystatic(?:\\/(.*?))?\\/?$","segments":[[{"content":"keystatic","dynamic":false,"spread":false}],[{"content":"...params","dynamic":true,"spread":true}]],"params":["...params"],"component":"node_modules/@keystatic/astro/internal/keystatic-astro-page.astro","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/page.BvKxy2Uc.js"}],"styles":[],"routeData":{"type":"redirect","isIndex":false,"route":"/admin","pattern":"^\\/admin\\/?$","segments":[[{"content":"admin","dynamic":false,"spread":false}]],"params":[],"component":"/admin","pathname":"/admin","prerender":false,"redirect":"/keystatic","fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"site":"https://atelieroptimatix.com","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/Users/shamil/Workspace/atelieroptimatix.com/mld/src/pages/[...slug]/index.astro",{"propagation":"in-tree","containsHead":true}],["/Users/shamil/Workspace/atelieroptimatix.com/mld/src/pages/it/post/[...slug]/index.astro",{"propagation":"in-tree","containsHead":true}],["/Users/shamil/Workspace/atelieroptimatix.com/mld/src/pages/post/[...slug]/index.astro",{"propagation":"in-tree","containsHead":true}],["/Users/shamil/Workspace/atelieroptimatix.com/mld/src/pages/it/work/[...slug]/index.astro",{"propagation":"in-tree","containsHead":true}],["/Users/shamil/Workspace/atelieroptimatix.com/mld/src/pages/work/[...slug]/index.astro",{"propagation":"in-tree","containsHead":true}],["/Users/shamil/Workspace/atelieroptimatix.com/mld/src/pages/404.astro",{"propagation":"in-tree","containsHead":true}],["\u0000astro:content",{"propagation":"in-tree","containsHead":false}],["/Users/shamil/Workspace/atelieroptimatix.com/mld/src/components/footers/Footer.astro",{"propagation":"in-tree","containsHead":false}],["/Users/shamil/Workspace/atelieroptimatix.com/mld/src/layouts/BaseLayout.astro",{"propagation":"in-tree","containsHead":false}],["/Users/shamil/Workspace/atelieroptimatix.com/mld/src/layouts/PageLayout.astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/[...slug]/index@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}],["/Users/shamil/Workspace/atelieroptimatix.com/mld/src/layouts/PostLayout.astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/it/post/[...slug]/index@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/post/[...slug]/index@_@astro",{"propagation":"in-tree","containsHead":false}],["/Users/shamil/Workspace/atelieroptimatix.com/mld/src/layouts/WorkLayout.astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/it/work/[...slug]/index@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/work/[...slug]/index@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/404@_@astro",{"propagation":"in-tree","containsHead":false}],["/Users/shamil/Workspace/atelieroptimatix.com/mld/src/components/sections/BlogLatest.astro",{"propagation":"in-tree","containsHead":false}],["/Users/shamil/Workspace/atelieroptimatix.com/mld/src/content/pages/en/homepage.mdoc",{"propagation":"in-tree","containsHead":false}],["/Users/shamil/Workspace/atelieroptimatix.com/mld/src/content/pages/en/homepage.mdoc?astroPropagatedAssets",{"propagation":"in-tree","containsHead":false}],["/Users/shamil/Workspace/atelieroptimatix.com/mld/src/content/pages/it/homepage.mdoc",{"propagation":"in-tree","containsHead":false}],["/Users/shamil/Workspace/atelieroptimatix.com/mld/src/content/pages/it/homepage.mdoc?astroPropagatedAssets",{"propagation":"in-tree","containsHead":false}],["/Users/shamil/Workspace/atelieroptimatix.com/mld/src/components/sections/News.astro",{"propagation":"in-tree","containsHead":false}],["/Users/shamil/Workspace/atelieroptimatix.com/mld/src/content/pages/en/news.mdoc",{"propagation":"in-tree","containsHead":false}],["/Users/shamil/Workspace/atelieroptimatix.com/mld/src/content/pages/en/news.mdoc?astroPropagatedAssets",{"propagation":"in-tree","containsHead":false}],["/Users/shamil/Workspace/atelieroptimatix.com/mld/src/content/pages/it/news.mdoc",{"propagation":"in-tree","containsHead":false}],["/Users/shamil/Workspace/atelieroptimatix.com/mld/src/content/pages/it/news.mdoc?astroPropagatedAssets",{"propagation":"in-tree","containsHead":false}],["/Users/shamil/Workspace/atelieroptimatix.com/mld/src/components/sections/OurProducts.astro",{"propagation":"in-tree","containsHead":false}],["/Users/shamil/Workspace/atelieroptimatix.com/mld/src/components/sections/Works.astro",{"propagation":"in-tree","containsHead":false}],["/Users/shamil/Workspace/atelieroptimatix.com/mld/src/content/pages/en/works.mdoc",{"propagation":"in-tree","containsHead":false}],["/Users/shamil/Workspace/atelieroptimatix.com/mld/src/content/pages/en/works.mdoc?astroPropagatedAssets",{"propagation":"in-tree","containsHead":false}],["/Users/shamil/Workspace/atelieroptimatix.com/mld/src/content/pages/it/works.mdoc",{"propagation":"in-tree","containsHead":false}],["/Users/shamil/Workspace/atelieroptimatix.com/mld/src/content/pages/it/works.mdoc?astroPropagatedAssets",{"propagation":"in-tree","containsHead":false}],["/Users/shamil/Workspace/atelieroptimatix.com/mld/src/lib/collection-helpers.ts",{"propagation":"in-tree","containsHead":false}],["/Users/shamil/Workspace/atelieroptimatix.com/mld/src/pages/[...slug]/og.png.ts",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/[...slug]/og.png@_@ts",{"propagation":"in-tree","containsHead":false}],["/Users/shamil/Workspace/atelieroptimatix.com/mld/src/pages/rss.xml.js",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/rss.xml@_@js",{"propagation":"in-tree","containsHead":false}],["/Users/shamil/Workspace/atelieroptimatix.com/mld/src/components/primitives/LoadingIndicator.astro",{"propagation":"in-tree","containsHead":false}],["/Users/shamil/Workspace/atelieroptimatix.com/mld/src/components/primitives/Widget.astro",{"propagation":"in-tree","containsHead":false}],["/Users/shamil/Workspace/atelieroptimatix.com/mld/node_modules/@astrojs/markdoc/components/Renderer.astro",{"propagation":"in-tree","containsHead":false}],["/Users/shamil/Workspace/atelieroptimatix.com/mld/node_modules/@astrojs/markdoc/components/index.ts",{"propagation":"in-tree","containsHead":false}],["/Users/shamil/Workspace/atelieroptimatix.com/mld/src/content/authors/en/shamil-kuruppu.mdoc",{"propagation":"in-tree","containsHead":false}],["/Users/shamil/Workspace/atelieroptimatix.com/mld/src/content/authors/en/shamil-kuruppu.mdoc?astroPropagatedAssets",{"propagation":"in-tree","containsHead":false}],["/Users/shamil/Workspace/atelieroptimatix.com/mld/src/content/authors/it/shamil-kuruppu.mdoc",{"propagation":"in-tree","containsHead":false}],["/Users/shamil/Workspace/atelieroptimatix.com/mld/src/content/authors/it/shamil-kuruppu.mdoc?astroPropagatedAssets",{"propagation":"in-tree","containsHead":false}],["/Users/shamil/Workspace/atelieroptimatix.com/mld/src/content/pages/en/about.mdoc",{"propagation":"in-tree","containsHead":false}],["/Users/shamil/Workspace/atelieroptimatix.com/mld/src/content/pages/en/about.mdoc?astroPropagatedAssets",{"propagation":"in-tree","containsHead":false}],["/Users/shamil/Workspace/atelieroptimatix.com/mld/src/content/pages/en/contact.mdoc",{"propagation":"in-tree","containsHead":false}],["/Users/shamil/Workspace/atelieroptimatix.com/mld/src/content/pages/en/contact.mdoc?astroPropagatedAssets",{"propagation":"in-tree","containsHead":false}],["/Users/shamil/Workspace/atelieroptimatix.com/mld/src/content/pages/it/about.mdoc",{"propagation":"in-tree","containsHead":false}],["/Users/shamil/Workspace/atelieroptimatix.com/mld/src/content/pages/it/about.mdoc?astroPropagatedAssets",{"propagation":"in-tree","containsHead":false}],["/Users/shamil/Workspace/atelieroptimatix.com/mld/src/content/pages/it/contact.mdoc",{"propagation":"in-tree","containsHead":false}],["/Users/shamil/Workspace/atelieroptimatix.com/mld/src/content/pages/it/contact.mdoc?astroPropagatedAssets",{"propagation":"in-tree","containsHead":false}],["/Users/shamil/Workspace/atelieroptimatix.com/mld/src/content/posts/en/django-developer.mdoc",{"propagation":"in-tree","containsHead":false}],["/Users/shamil/Workspace/atelieroptimatix.com/mld/src/content/posts/en/django-developer.mdoc?astroPropagatedAssets",{"propagation":"in-tree","containsHead":false}],["/Users/shamil/Workspace/atelieroptimatix.com/mld/src/content/posts/en/future-of-edutech.mdoc",{"propagation":"in-tree","containsHead":false}],["/Users/shamil/Workspace/atelieroptimatix.com/mld/src/content/posts/en/future-of-edutech.mdoc?astroPropagatedAssets",{"propagation":"in-tree","containsHead":false}],["/Users/shamil/Workspace/atelieroptimatix.com/mld/src/content/posts/it/mastering-email-marketing-campaigns-for-ecommerce-success.mdoc",{"propagation":"in-tree","containsHead":false}],["/Users/shamil/Workspace/atelieroptimatix.com/mld/src/content/posts/it/mastering-email-marketing-campaigns-for-ecommerce-success.mdoc?astroPropagatedAssets",{"propagation":"in-tree","containsHead":false}],["/Users/shamil/Workspace/atelieroptimatix.com/mld/src/content/posts/it/revolutionizing-urban-farming-with-smart-technology.mdoc",{"propagation":"in-tree","containsHead":false}],["/Users/shamil/Workspace/atelieroptimatix.com/mld/src/content/posts/it/revolutionizing-urban-farming-with-smart-technology.mdoc?astroPropagatedAssets",{"propagation":"in-tree","containsHead":false}],["/Users/shamil/Workspace/atelieroptimatix.com/mld/src/content/posts/it/revolutionizing-virtual-reality-gaming-development.mdoc",{"propagation":"in-tree","containsHead":false}],["/Users/shamil/Workspace/atelieroptimatix.com/mld/src/content/posts/it/revolutionizing-virtual-reality-gaming-development.mdoc?astroPropagatedAssets",{"propagation":"in-tree","containsHead":false}],["/Users/shamil/Workspace/atelieroptimatix.com/mld/src/content/works/en/duesautomata.mdoc",{"propagation":"in-tree","containsHead":false}],["/Users/shamil/Workspace/atelieroptimatix.com/mld/src/content/works/en/duesautomata.mdoc?astroPropagatedAssets",{"propagation":"in-tree","containsHead":false}],["/Users/shamil/Workspace/atelieroptimatix.com/mld/src/content/works/en/educonnect.mdoc",{"propagation":"in-tree","containsHead":false}],["/Users/shamil/Workspace/atelieroptimatix.com/mld/src/content/works/en/educonnect.mdoc?astroPropagatedAssets",{"propagation":"in-tree","containsHead":false}],["/Users/shamil/Workspace/atelieroptimatix.com/mld/src/content/works/en/simmeringerp.mdoc",{"propagation":"in-tree","containsHead":false}],["/Users/shamil/Workspace/atelieroptimatix.com/mld/src/content/works/en/simmeringerp.mdoc?astroPropagatedAssets",{"propagation":"in-tree","containsHead":false}],["/Users/shamil/Workspace/atelieroptimatix.com/mld/src/content/works/it/duesautomata.mdoc",{"propagation":"in-tree","containsHead":false}],["/Users/shamil/Workspace/atelieroptimatix.com/mld/src/content/works/it/duesautomata.mdoc?astroPropagatedAssets",{"propagation":"in-tree","containsHead":false}],["/Users/shamil/Workspace/atelieroptimatix.com/mld/src/content/works/it/educonnect.mdoc",{"propagation":"in-tree","containsHead":false}],["/Users/shamil/Workspace/atelieroptimatix.com/mld/src/content/works/it/educonnect.mdoc?astroPropagatedAssets",{"propagation":"in-tree","containsHead":false}],["/Users/shamil/Workspace/atelieroptimatix.com/mld/src/content/works/it/simmeringerp.mdoc",{"propagation":"in-tree","containsHead":false}],["/Users/shamil/Workspace/atelieroptimatix.com/mld/src/content/works/it/simmeringerp.mdoc?astroPropagatedAssets",{"propagation":"in-tree","containsHead":false}]],"renderers":[],"clientDirectives":[["idle","(()=>{var i=t=>{let e=async()=>{await(await t())()};\"requestIdleCallback\"in window?window.requestIdleCallback(e):setTimeout(e,200)};(self.Astro||(self.Astro={})).idle=i;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-virtual-entry":"index.js","\u0000@astro-renderers":"renderers.mjs","\u0000noop-middleware":"_noop-middleware.mjs","/Users/shamil/Workspace/atelieroptimatix.com/mld/node_modules/astro/dist/assets/services/sharp.js":"chunks/nm_sharp_BcYj-6Wc.mjs","/node_modules/@astrojs/cloudflare/dist/entrypoints/image-endpoint.js":"chunks/pages/image-endpoint_nxDOIah1.mjs","/node_modules/@keystatic/astro/internal/keystatic-astro-page.astro":"chunks/pages/keystatic-astro-page_D1KlaDTl.mjs","\u0000@astrojs-manifest":"manifest_Bor5lznA.mjs","\u0000@astro-page:node_modules/@astrojs/cloudflare/dist/entrypoints/image-endpoint@_@js":"chunks/image-endpoint_RvDj3-CK.mjs","\u0000@astro-page:node_modules/@keystatic/astro/internal/keystatic-api@_@js":"chunks/keystatic-api_BQI6R6FJ.mjs","\u0000@astro-page:node_modules/@keystatic/astro/internal/keystatic-astro-page@_@astro":"chunks/keystatic-astro-page_CtzgoLe3.mjs","\u0000@astro-page:src/pages/404@_@astro":"chunks/404_DcUxVt_R.mjs","\u0000@astro-page:src/pages/it/post/[...slug]/index@_@astro":"chunks/index_DeiP9ArA.mjs","\u0000@astro-page:src/pages/it/work/[...slug]/index@_@astro":"chunks/index_Bq1eK5wM.mjs","\u0000@astro-page:src/pages/post/[...slug]/index@_@astro":"chunks/index_CL25-1sJ.mjs","\u0000@astro-page:src/pages/rss.xml@_@js":"chunks/rss_y2ibURJA.mjs","\u0000@astro-page:src/pages/work/[...slug]/index@_@astro":"chunks/index_gMhGJmTP.mjs","\u0000@astro-page:src/pages/[...slug]/og.png@_@ts":"chunks/og_gak4lhni.mjs","\u0000@astro-page:src/pages/[...slug]/index@_@astro":"chunks/index_CqjPoNBl.mjs","/Users/shamil/Workspace/atelieroptimatix.com/mld/src/content/authors/en/shamil-kuruppu.mdoc?astroContentCollectionEntry=true":"chunks/shamil-kuruppu_OMEIdaKp.mjs","/Users/shamil/Workspace/atelieroptimatix.com/mld/src/content/authors/it/shamil-kuruppu.mdoc?astroContentCollectionEntry=true":"chunks/shamil-kuruppu_CjdjIfSH.mjs","/Users/shamil/Workspace/atelieroptimatix.com/mld/src/content/pages/en/about.mdoc?astroContentCollectionEntry=true":"chunks/about_ACw7Pi7a.mjs","/Users/shamil/Workspace/atelieroptimatix.com/mld/src/content/pages/en/contact.mdoc?astroContentCollectionEntry=true":"chunks/contact_DrssH49U.mjs","/Users/shamil/Workspace/atelieroptimatix.com/mld/src/content/pages/en/homepage.mdoc?astroContentCollectionEntry=true":"chunks/homepage_CiXCGFaF.mjs","/Users/shamil/Workspace/atelieroptimatix.com/mld/src/content/pages/en/news.mdoc?astroContentCollectionEntry=true":"chunks/news_DJih7s53.mjs","/Users/shamil/Workspace/atelieroptimatix.com/mld/src/content/pages/en/works.mdoc?astroContentCollectionEntry=true":"chunks/works_BRCouc_f.mjs","/Users/shamil/Workspace/atelieroptimatix.com/mld/src/content/pages/it/about.mdoc?astroContentCollectionEntry=true":"chunks/about_DVRTdwUD.mjs","/Users/shamil/Workspace/atelieroptimatix.com/mld/src/content/pages/it/contact.mdoc?astroContentCollectionEntry=true":"chunks/contact_B_t3ctgf.mjs","/Users/shamil/Workspace/atelieroptimatix.com/mld/src/content/pages/it/homepage.mdoc?astroContentCollectionEntry=true":"chunks/homepage_CAsZzzx5.mjs","/Users/shamil/Workspace/atelieroptimatix.com/mld/src/content/pages/it/news.mdoc?astroContentCollectionEntry=true":"chunks/news_DDysclwC.mjs","/Users/shamil/Workspace/atelieroptimatix.com/mld/src/content/pages/it/works.mdoc?astroContentCollectionEntry=true":"chunks/works_Cg1T6DrL.mjs","/Users/shamil/Workspace/atelieroptimatix.com/mld/src/content/posts/en/django-developer.mdoc?astroContentCollectionEntry=true":"chunks/django-developer_Dz4XF6JD.mjs","/Users/shamil/Workspace/atelieroptimatix.com/mld/src/content/posts/en/future-of-edutech.mdoc?astroContentCollectionEntry=true":"chunks/future-of-edutech_B9INRfzX.mjs","/Users/shamil/Workspace/atelieroptimatix.com/mld/src/content/posts/it/mastering-email-marketing-campaigns-for-ecommerce-success.mdoc?astroContentCollectionEntry=true":"chunks/mastering-email-marketing-campaigns-for-ecommerce-success_B0MH0xga.mjs","/Users/shamil/Workspace/atelieroptimatix.com/mld/src/content/posts/it/revolutionizing-urban-farming-with-smart-technology.mdoc?astroContentCollectionEntry=true":"chunks/revolutionizing-urban-farming-with-smart-technology_CxEQwgyA.mjs","/Users/shamil/Workspace/atelieroptimatix.com/mld/src/content/posts/it/revolutionizing-virtual-reality-gaming-development.mdoc?astroContentCollectionEntry=true":"chunks/revolutionizing-virtual-reality-gaming-development_BRPUD8MJ.mjs","/Users/shamil/Workspace/atelieroptimatix.com/mld/src/content/works/en/duesautomata.mdoc?astroContentCollectionEntry=true":"chunks/duesautomata_WSHykhc1.mjs","/Users/shamil/Workspace/atelieroptimatix.com/mld/src/content/works/en/educonnect.mdoc?astroContentCollectionEntry=true":"chunks/educonnect_D0M3Mx9d.mjs","/Users/shamil/Workspace/atelieroptimatix.com/mld/src/content/works/en/simmeringerp.mdoc?astroContentCollectionEntry=true":"chunks/simmeringerp_C9otk9ta.mjs","/Users/shamil/Workspace/atelieroptimatix.com/mld/src/content/works/it/duesautomata.mdoc?astroContentCollectionEntry=true":"chunks/duesautomata_BvX2A4Kc.mjs","/Users/shamil/Workspace/atelieroptimatix.com/mld/src/content/works/it/educonnect.mdoc?astroContentCollectionEntry=true":"chunks/educonnect_BJ3LjGDO.mjs","/Users/shamil/Workspace/atelieroptimatix.com/mld/src/content/works/it/simmeringerp.mdoc?astroContentCollectionEntry=true":"chunks/simmeringerp_Du4wT891.mjs","/Users/shamil/Workspace/atelieroptimatix.com/mld/src/content/global/contacts.json?astroDataCollectionEntry=true":"chunks/contacts_ztJmN9CC.mjs","/Users/shamil/Workspace/atelieroptimatix.com/mld/src/content/global/en/footer.json?astroDataCollectionEntry=true":"chunks/footer_CLKckfX5.mjs","/Users/shamil/Workspace/atelieroptimatix.com/mld/src/content/global/en/header.json?astroDataCollectionEntry=true":"chunks/header_B_4SK2Ey.mjs","/Users/shamil/Workspace/atelieroptimatix.com/mld/src/content/global/en/seo.json?astroDataCollectionEntry=true":"chunks/seo_zg488jsj.mjs","/Users/shamil/Workspace/atelieroptimatix.com/mld/src/content/global/it/footer.json?astroDataCollectionEntry=true":"chunks/footer_ldcDpszR.mjs","/Users/shamil/Workspace/atelieroptimatix.com/mld/src/content/global/it/header.json?astroDataCollectionEntry=true":"chunks/header_CTjZsUlA.mjs","/Users/shamil/Workspace/atelieroptimatix.com/mld/src/content/global/it/seo.json?astroDataCollectionEntry=true":"chunks/seo_BiJt6Yfn.mjs","/Users/shamil/Workspace/atelieroptimatix.com/mld/src/content/global/style.json?astroDataCollectionEntry=true":"chunks/style_B16XVo__.mjs","/Users/shamil/Workspace/atelieroptimatix.com/mld/src/content/global/widget.json?astroDataCollectionEntry=true":"chunks/widget_CWw9-hAl.mjs","/Users/shamil/Workspace/atelieroptimatix.com/mld/src/content/authors/en/shamil-kuruppu.mdoc?astroPropagatedAssets":"chunks/shamil-kuruppu_xiDbbgxc.mjs","/Users/shamil/Workspace/atelieroptimatix.com/mld/src/content/authors/it/shamil-kuruppu.mdoc?astroPropagatedAssets":"chunks/shamil-kuruppu_CqZpO8U9.mjs","/Users/shamil/Workspace/atelieroptimatix.com/mld/src/content/pages/en/about.mdoc?astroPropagatedAssets":"chunks/about_BdKD25XP.mjs","/Users/shamil/Workspace/atelieroptimatix.com/mld/src/content/pages/en/contact.mdoc?astroPropagatedAssets":"chunks/contact_BPmebaP_.mjs","/Users/shamil/Workspace/atelieroptimatix.com/mld/src/content/pages/en/homepage.mdoc?astroPropagatedAssets":"chunks/homepage_CJOtYNeP.mjs","/Users/shamil/Workspace/atelieroptimatix.com/mld/src/content/pages/en/news.mdoc?astroPropagatedAssets":"chunks/news_BHWut25q.mjs","/Users/shamil/Workspace/atelieroptimatix.com/mld/src/content/pages/en/works.mdoc?astroPropagatedAssets":"chunks/works_93_4bF5N.mjs","/Users/shamil/Workspace/atelieroptimatix.com/mld/src/content/pages/it/about.mdoc?astroPropagatedAssets":"chunks/about_BdwgENS1.mjs","/Users/shamil/Workspace/atelieroptimatix.com/mld/src/content/pages/it/contact.mdoc?astroPropagatedAssets":"chunks/contact_9dp850V_.mjs","/Users/shamil/Workspace/atelieroptimatix.com/mld/src/content/pages/it/homepage.mdoc?astroPropagatedAssets":"chunks/homepage_BfIwe37h.mjs","/Users/shamil/Workspace/atelieroptimatix.com/mld/src/content/pages/it/news.mdoc?astroPropagatedAssets":"chunks/news_PC9Dr9FE.mjs","/Users/shamil/Workspace/atelieroptimatix.com/mld/src/content/pages/it/works.mdoc?astroPropagatedAssets":"chunks/works_DGP80ZtR.mjs","/Users/shamil/Workspace/atelieroptimatix.com/mld/src/content/posts/en/django-developer.mdoc?astroPropagatedAssets":"chunks/django-developer_fDrGWcQn.mjs","/Users/shamil/Workspace/atelieroptimatix.com/mld/src/content/posts/en/future-of-edutech.mdoc?astroPropagatedAssets":"chunks/future-of-edutech_82pgpiEK.mjs","/Users/shamil/Workspace/atelieroptimatix.com/mld/src/content/posts/it/mastering-email-marketing-campaigns-for-ecommerce-success.mdoc?astroPropagatedAssets":"chunks/mastering-email-marketing-campaigns-for-ecommerce-success_Dnj6nrki.mjs","/Users/shamil/Workspace/atelieroptimatix.com/mld/src/content/posts/it/revolutionizing-urban-farming-with-smart-technology.mdoc?astroPropagatedAssets":"chunks/revolutionizing-urban-farming-with-smart-technology_DIL9qWcv.mjs","/Users/shamil/Workspace/atelieroptimatix.com/mld/src/content/posts/it/revolutionizing-virtual-reality-gaming-development.mdoc?astroPropagatedAssets":"chunks/revolutionizing-virtual-reality-gaming-development_Ct6WNnD9.mjs","/Users/shamil/Workspace/atelieroptimatix.com/mld/src/content/works/en/duesautomata.mdoc?astroPropagatedAssets":"chunks/duesautomata_D3ag8Erb.mjs","/Users/shamil/Workspace/atelieroptimatix.com/mld/src/content/works/en/educonnect.mdoc?astroPropagatedAssets":"chunks/educonnect_wNIU3DNI.mjs","/Users/shamil/Workspace/atelieroptimatix.com/mld/src/content/works/en/simmeringerp.mdoc?astroPropagatedAssets":"chunks/simmeringerp_DZrh6Y4I.mjs","/Users/shamil/Workspace/atelieroptimatix.com/mld/src/content/works/it/duesautomata.mdoc?astroPropagatedAssets":"chunks/duesautomata_C7_emJC1.mjs","/Users/shamil/Workspace/atelieroptimatix.com/mld/src/content/works/it/educonnect.mdoc?astroPropagatedAssets":"chunks/educonnect_CEhA7XCP.mjs","/Users/shamil/Workspace/atelieroptimatix.com/mld/src/content/works/it/simmeringerp.mdoc?astroPropagatedAssets":"chunks/simmeringerp_DkI2ZIg4.mjs","/Users/shamil/Workspace/atelieroptimatix.com/mld/node_modules/yoga-wasm-web/dist/asm.js":"chunks/asm_CG2Xu2zF.mjs","/Users/shamil/Workspace/atelieroptimatix.com/mld/src/content/authors/en/shamil-kuruppu.mdoc":"chunks/shamil-kuruppu_DurD7DGk.mjs","/Users/shamil/Workspace/atelieroptimatix.com/mld/src/content/authors/it/shamil-kuruppu.mdoc":"chunks/shamil-kuruppu_aLE1byL3.mjs","/Users/shamil/Workspace/atelieroptimatix.com/mld/src/content/pages/en/about.mdoc":"chunks/about_CYzoxl68.mjs","/Users/shamil/Workspace/atelieroptimatix.com/mld/src/assets/pages/about/about.png":"chunks/about_DnIBAvoc.mjs","/Users/shamil/Workspace/atelieroptimatix.com/mld/src/content/pages/en/contact.mdoc":"chunks/contact_C2qusRmV.mjs","/Users/shamil/Workspace/atelieroptimatix.com/mld/src/content/pages/en/homepage.mdoc":"chunks/homepage_G9HHjCpV.mjs","/Users/shamil/Workspace/atelieroptimatix.com/mld/src/content/pages/en/news.mdoc":"chunks/news_D7n5iWKg.mjs","/Users/shamil/Workspace/atelieroptimatix.com/mld/src/content/pages/en/works.mdoc":"chunks/works_Bam5ZaSo.mjs","/Users/shamil/Workspace/atelieroptimatix.com/mld/src/content/pages/it/about.mdoc":"chunks/about_tkESBwbY.mjs","/Users/shamil/Workspace/atelieroptimatix.com/mld/src/content/pages/it/contact.mdoc":"chunks/contact_BcRdPX3V.mjs","/Users/shamil/Workspace/atelieroptimatix.com/mld/src/content/pages/it/homepage.mdoc":"chunks/homepage_CVLsa8iT.mjs","/Users/shamil/Workspace/atelieroptimatix.com/mld/src/assets/pages/homepage/google-white.png":"chunks/google-white_B6EMIV7Z.mjs","/Users/shamil/Workspace/atelieroptimatix.com/mld/src/content/pages/it/news.mdoc":"chunks/news_DxzLZ_zP.mjs","/Users/shamil/Workspace/atelieroptimatix.com/mld/src/content/pages/it/works.mdoc":"chunks/works_Gz-9wr8j.mjs","/Users/shamil/Workspace/atelieroptimatix.com/mld/src/content/posts/en/django-developer.mdoc":"chunks/django-developer_DYwDsicB.mjs","/Users/shamil/Workspace/atelieroptimatix.com/mld/src/content/posts/en/future-of-edutech.mdoc":"chunks/future-of-edutech_T4YtmRjG.mjs","/Users/shamil/Workspace/atelieroptimatix.com/mld/src/content/posts/it/mastering-email-marketing-campaigns-for-ecommerce-success.mdoc":"chunks/mastering-email-marketing-campaigns-for-ecommerce-success_O_3Z-7c5.mjs","/Users/shamil/Workspace/atelieroptimatix.com/mld/src/content/posts/it/revolutionizing-urban-farming-with-smart-technology.mdoc":"chunks/revolutionizing-urban-farming-with-smart-technology_D5IgjbfC.mjs","/Users/shamil/Workspace/atelieroptimatix.com/mld/src/content/posts/it/revolutionizing-virtual-reality-gaming-development.mdoc":"chunks/revolutionizing-virtual-reality-gaming-development_oAOkUBfL.mjs","/Users/shamil/Workspace/atelieroptimatix.com/mld/src/content/works/en/duesautomata.mdoc":"chunks/duesautomata_Bh2hjy6E.mjs","/Users/shamil/Workspace/atelieroptimatix.com/mld/src/content/works/en/educonnect.mdoc":"chunks/educonnect_TBTOPOJQ.mjs","/Users/shamil/Workspace/atelieroptimatix.com/mld/src/content/works/en/simmeringerp.mdoc":"chunks/simmeringerp_CmTZtI3q.mjs","/Users/shamil/Workspace/atelieroptimatix.com/mld/src/content/works/it/duesautomata.mdoc":"chunks/duesautomata_HUzdxe7N.mjs","/Users/shamil/Workspace/atelieroptimatix.com/mld/src/content/works/it/educonnect.mdoc":"chunks/educonnect_DioFMk_R.mjs","/Users/shamil/Workspace/atelieroptimatix.com/mld/src/content/works/it/simmeringerp.mdoc":"chunks/simmeringerp_B7jR5ZZz.mjs","/Users/shamil/Workspace/atelieroptimatix.com/mld/src/assets/pages/blog/cover.svg":"chunks/cover_BQ7H3V8y.mjs","/Users/shamil/Workspace/atelieroptimatix.com/mld/src/assets/pages/homepage/cactus.svg":"chunks/cactus_CozvbKi1.mjs","/Users/shamil/Workspace/atelieroptimatix.com/mld/src/assets/pages/homepage/clean-teeth.svg":"chunks/clean-teeth_C4KXWboe.mjs","/Users/shamil/Workspace/atelieroptimatix.com/mld/src/assets/pages/homepage/dental-check-up-schedule.svg":"chunks/dental-check-up-schedule_BJQYejbt.mjs","/Users/shamil/Workspace/atelieroptimatix.com/mld/src/assets/pages/homepage/dental-filling.svg":"chunks/dental-filling_QNpQpPgw.mjs","/Users/shamil/Workspace/atelieroptimatix.com/mld/src/assets/pages/homepage/dental-implant.svg":"chunks/dental-implant_BzDmUBYw.mjs","/Users/shamil/Workspace/atelieroptimatix.com/mld/src/assets/pages/homepage/dental.svg":"chunks/dental_BW2HCGM9.mjs","/Users/shamil/Workspace/atelieroptimatix.com/mld/src/assets/pages/homepage/education.png":"chunks/education_DDUv0_3A.mjs","/Users/shamil/Workspace/atelieroptimatix.com/mld/src/assets/pages/homepage/education.svg":"chunks/education_BXgXaBM_.mjs","/Users/shamil/Workspace/atelieroptimatix.com/mld/src/assets/pages/homepage/hitech.svg":"chunks/hitech_BDvKGEBo.mjs","/Users/shamil/Workspace/atelieroptimatix.com/mld/src/assets/pages/homepage/industrial.png":"chunks/industrial_BsmB07B2.mjs","/Users/shamil/Workspace/atelieroptimatix.com/mld/src/assets/pages/homepage/industrial.svg":"chunks/industrial_CXd_zMCx.mjs","/Users/shamil/Workspace/atelieroptimatix.com/mld/src/assets/pages/homepage/integration.png":"chunks/integration_BdGAntAx.mjs","/Users/shamil/Workspace/atelieroptimatix.com/mld/src/assets/pages/homepage/integration.svg":"chunks/integration__UgPG2ZW.mjs","/Users/shamil/Workspace/atelieroptimatix.com/mld/src/assets/pages/homepage/marketing-service.png":"chunks/marketing-service_DsTJa62o.mjs","/Users/shamil/Workspace/atelieroptimatix.com/mld/src/assets/pages/homepage/orthodontics.svg":"chunks/orthodontics_D7GMLgKk.mjs","/Users/shamil/Workspace/atelieroptimatix.com/mld/src/assets/pages/homepage/paidmedia-service.png":"chunks/paidmedia-service_CoKAE7Cq.mjs","/Users/shamil/Workspace/atelieroptimatix.com/mld/src/assets/pages/homepage/plaque.svg":"chunks/plaque_CuT7MUK5.mjs","/Users/shamil/Workspace/atelieroptimatix.com/mld/src/assets/pages/homepage/play.svg":"chunks/play_C30WqH6E.mjs","/Users/shamil/Workspace/atelieroptimatix.com/mld/src/assets/pages/homepage/rise.svg":"chunks/rise_C6IcIVod.mjs","/Users/shamil/Workspace/atelieroptimatix.com/mld/src/assets/pages/homepage/socialmedia-service.png":"chunks/socialmedia-service_DCvECF9T.mjs","/Users/shamil/Workspace/atelieroptimatix.com/mld/src/assets/pages/homepage/teeth-whitening.svg":"chunks/teeth-whitening_L8TXBeqq.mjs","/Users/shamil/Workspace/atelieroptimatix.com/mld/src/assets/pages/homepage/terra.svg":"chunks/terra_Cgbr9WIz.mjs","/Users/shamil/Workspace/atelieroptimatix.com/mld/src/assets/pages/homepage/vision.svg":"chunks/vision_ZOQLBM7N.mjs","/astro/hoisted.js?q=2":"_astro/hoisted.l0sNRNKZ.js","/Users/shamil/Workspace/atelieroptimatix.com/mld/src/components/sections/Blob.astro?astro&type=script&index=0&lang.ts":"_astro/Blob.astro_astro_type_script_index_0_lang.DBkltbLO.js","/astro/hoisted.js?q=1":"_astro/hoisted.C4vZ2vhD.js","/Users/shamil/Workspace/atelieroptimatix.com/mld/node_modules/workbox-window/build/workbox-window.prod.es5.mjs":"_astro/workbox-window.prod.es5.B9K5rw8f.js","/Users/shamil/Workspace/atelieroptimatix.com/mld/src/components/sections/Hero.astro?astro&type=script&index=0&lang.ts":"_astro/Hero.astro_astro_type_script_index_0_lang.D7TIqd5B.js","astro:scripts/page.js":"_astro/page.BvKxy2Uc.js","@astrojs/react/client.js":"_astro/client.Cuyrj2uf.js","/Users/shamil/Workspace/atelieroptimatix.com/mld/node_modules/@keystatic/astro/internal/keystatic-page.js":"_astro/keystatic-page.DXHrp2-p.js","/astro/hoisted.js?q=0":"_astro/hoisted.LewpzxV1.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/cover.CAofn85-.jpg","/_astro/cover.GzGtB9Vp.jpg","/_astro/cover.CRnTnJHi.jpg","/_astro/cover.BXS4cjWA.jpg","/_astro/cover.DRo88hYF.jpg","/_astro/cover.D_pAC8Fx.jpg","/_astro/cover.BZ5o4vAQ.jpg","/_astro/cover.CpMCnsuV.svg","/_astro/cactus.D_jKg2Ry.svg","/_astro/clean-teeth.CLb1VonB.svg","/_astro/dental-check-up-schedule.vMcSbxAk.svg","/_astro/dental-implant.DvuLcDqE.svg","/_astro/dental-filling.Bm25Bgv8.svg","/_astro/dental.CrW35zZ6.svg","/_astro/education.CRT0BOCt.svg","/_astro/education.QEjJfogT.png","/_astro/google-white.Jo_8AMLF.png","/_astro/hitech.D8q_zAmu.svg","/_astro/industrial.Bg4PtTAQ.svg","/_astro/industrial.x83RdodJ.png","/_astro/integration.d4OAHKeq.png","/_astro/integration.CQl8Kya8.svg","/_astro/marketing-service.C59SZwBD.png","/_astro/orthodontics.DpWIZPwb.svg","/_astro/paidmedia-service.DMHLmxRd.png","/_astro/about.D3UQkeX3.png","/_astro/plaque.CZJFxiHW.svg","/_astro/play.YDuNbX8e.svg","/_astro/rise.Bn5naVcu.svg","/_astro/socialmedia-service.DzVhx38z.png","/_astro/teeth-whitening.3SxMHWM4.svg","/_astro/terra.B5vdeVVe.svg","/_astro/vision.Cm3kP3kk.svg","/_astro/promo.8ev6z6da.webm","/_astro/logo_1.DV2oamOE.svg","/_astro/logo.r8iytF9e.svg","/_astro/index.Bt-HQG5V.css","/CNAME","/apple-splash-landscape-dark-2048x1536.png","/apple-splash-landscape-light-2048x1536.png","/apple-splash-portrait-dark-1536x2048.png","/apple-splash-portrait-light-1536x2048.png","/apple-touch-icon-180x180.png","/favicon.ico","/favicon.svg","/favicon_1.svg","/manifest.webmanifest","/maskable-icon-512x512.png","/pwa-192x192.png","/pwa-512x512.png","/pwa-64x64.png","/sw.js","/workbox-e3490c72.js","/_astro/Blob.astro_astro_type_script_index_0_lang.DBkltbLO.js","/_astro/Hero.astro_astro_type_script_index_0_lang.D7TIqd5B.js","/_astro/client.Cuyrj2uf.js","/_astro/gsap-blur.D4ZTb8iO.js","/_astro/hoisted.C4vZ2vhD.js","/_astro/hoisted.LewpzxV1.js","/_astro/index.B8TIwkLO.js","/_astro/keystatic-page.DXHrp2-p.js","/_astro/lifecycle-manager.B4AsVc_v.js","/_astro/page.BvKxy2Uc.js","/_astro/workbox-window.prod.es5.B9K5rw8f.js","/_worker.js/_noop-middleware.mjs","/_worker.js/index.js","/_worker.js/manifest.webmanifest","/_worker.js/renderers.mjs","/_worker.js/_astro/about.D3UQkeX3.png","/_worker.js/_astro/cactus.D_jKg2Ry.svg","/_worker.js/_astro/clean-teeth.CLb1VonB.svg","/_worker.js/_astro/cover.BXS4cjWA.jpg","/_worker.js/_astro/cover.BZ5o4vAQ.jpg","/_worker.js/_astro/cover.CAofn85-.jpg","/_worker.js/_astro/cover.CRnTnJHi.jpg","/_worker.js/_astro/cover.CpMCnsuV.svg","/_worker.js/_astro/cover.DRo88hYF.jpg","/_worker.js/_astro/cover.D_pAC8Fx.jpg","/_worker.js/_astro/cover.GzGtB9Vp.jpg","/_worker.js/_astro/dental-check-up-schedule.vMcSbxAk.svg","/_worker.js/_astro/dental-filling.Bm25Bgv8.svg","/_worker.js/_astro/dental-implant.DvuLcDqE.svg","/_worker.js/_astro/dental.CrW35zZ6.svg","/_worker.js/_astro/education.CRT0BOCt.svg","/_worker.js/_astro/education.QEjJfogT.png","/_worker.js/_astro/google-white.Jo_8AMLF.png","/_worker.js/_astro/hitech.D8q_zAmu.svg","/_worker.js/_astro/index.Bt-HQG5V.css","/_worker.js/_astro/industrial.Bg4PtTAQ.svg","/_worker.js/_astro/industrial.x83RdodJ.png","/_worker.js/_astro/integration.CQl8Kya8.svg","/_worker.js/_astro/integration.d4OAHKeq.png","/_worker.js/_astro/logo.r8iytF9e.svg","/_worker.js/_astro/logo_1.DV2oamOE.svg","/_worker.js/_astro/marketing-service.C59SZwBD.png","/_worker.js/_astro/orthodontics.DpWIZPwb.svg","/_worker.js/_astro/paidmedia-service.DMHLmxRd.png","/_worker.js/_astro/plaque.CZJFxiHW.svg","/_worker.js/_astro/play.YDuNbX8e.svg","/_worker.js/_astro/promo.8ev6z6da.webm","/_worker.js/_astro/rise.Bn5naVcu.svg","/_worker.js/_astro/socialmedia-service.DzVhx38z.png","/_worker.js/_astro/teeth-whitening.3SxMHWM4.svg","/_worker.js/_astro/terra.B5vdeVVe.svg","/_worker.js/_astro/vision.Cm3kP3kk.svg","/_worker.js/chunks/404_DcUxVt_R.mjs","/_worker.js/chunks/About_paqhu1l9.mjs","/_worker.js/chunks/BlogLatest_5PfQ8VSM.mjs","/_worker.js/chunks/BlogPreview_BBykjWvU.mjs","/_worker.js/chunks/Contact_TU2c5VRv.mjs","/_worker.js/chunks/News_CnTQHO6M.mjs","/_worker.js/chunks/WorkPreview_BbAjyZTb.mjs","/_worker.js/chunks/Works_rhWvqRFi.mjs","/_worker.js/chunks/about_ACw7Pi7a.mjs","/_worker.js/chunks/about_BdKD25XP.mjs","/_worker.js/chunks/about_BdwgENS1.mjs","/_worker.js/chunks/about_CYzoxl68.mjs","/_worker.js/chunks/about_DVRTdwUD.mjs","/_worker.js/chunks/about_DnIBAvoc.mjs","/_worker.js/chunks/about_tkESBwbY.mjs","/_worker.js/chunks/asm_CG2Xu2zF.mjs","/_worker.js/chunks/astro_C6DN7fAn.mjs","/_worker.js/chunks/cactus_CozvbKi1.mjs","/_worker.js/chunks/clean-teeth_C4KXWboe.mjs","/_worker.js/chunks/contact_9dp850V_.mjs","/_worker.js/chunks/contact_BPmebaP_.mjs","/_worker.js/chunks/contact_B_t3ctgf.mjs","/_worker.js/chunks/contact_BcRdPX3V.mjs","/_worker.js/chunks/contact_C2qusRmV.mjs","/_worker.js/chunks/contact_DrssH49U.mjs","/_worker.js/chunks/contacts_ztJmN9CC.mjs","/_worker.js/chunks/cover_BQ7H3V8y.mjs","/_worker.js/chunks/dental-check-up-schedule_BJQYejbt.mjs","/_worker.js/chunks/dental-filling_QNpQpPgw.mjs","/_worker.js/chunks/dental-implant_BzDmUBYw.mjs","/_worker.js/chunks/dental_BW2HCGM9.mjs","/_worker.js/chunks/django-developer_DYwDsicB.mjs","/_worker.js/chunks/django-developer_Dz4XF6JD.mjs","/_worker.js/chunks/django-developer_fDrGWcQn.mjs","/_worker.js/chunks/duesautomata_Bh2hjy6E.mjs","/_worker.js/chunks/duesautomata_BvX2A4Kc.mjs","/_worker.js/chunks/duesautomata_C7_emJC1.mjs","/_worker.js/chunks/duesautomata_D3ag8Erb.mjs","/_worker.js/chunks/duesautomata_HUzdxe7N.mjs","/_worker.js/chunks/duesautomata_WSHykhc1.mjs","/_worker.js/chunks/education_BXgXaBM_.mjs","/_worker.js/chunks/education_DDUv0_3A.mjs","/_worker.js/chunks/educonnect_BJ3LjGDO.mjs","/_worker.js/chunks/educonnect_CEhA7XCP.mjs","/_worker.js/chunks/educonnect_D0M3Mx9d.mjs","/_worker.js/chunks/educonnect_DioFMk_R.mjs","/_worker.js/chunks/educonnect_TBTOPOJQ.mjs","/_worker.js/chunks/educonnect_wNIU3DNI.mjs","/_worker.js/chunks/footer_CLKckfX5.mjs","/_worker.js/chunks/footer_ldcDpszR.mjs","/_worker.js/chunks/future-of-edutech_82pgpiEK.mjs","/_worker.js/chunks/future-of-edutech_B9INRfzX.mjs","/_worker.js/chunks/future-of-edutech_T4YtmRjG.mjs","/_worker.js/chunks/google-white_B6EMIV7Z.mjs","/_worker.js/chunks/header_B_4SK2Ey.mjs","/_worker.js/chunks/header_CTjZsUlA.mjs","/_worker.js/chunks/hitech_BDvKGEBo.mjs","/_worker.js/chunks/homepage_BfIwe37h.mjs","/_worker.js/chunks/homepage_CAsZzzx5.mjs","/_worker.js/chunks/homepage_CJOtYNeP.mjs","/_worker.js/chunks/homepage_CVLsa8iT.mjs","/_worker.js/chunks/homepage_CiXCGFaF.mjs","/_worker.js/chunks/homepage_G9HHjCpV.mjs","/_worker.js/chunks/image-endpoint_RvDj3-CK.mjs","/_worker.js/chunks/index_Bq1eK5wM.mjs","/_worker.js/chunks/index_CL25-1sJ.mjs","/_worker.js/chunks/index_CqjPoNBl.mjs","/_worker.js/chunks/index_DeiP9ArA.mjs","/_worker.js/chunks/index_gMhGJmTP.mjs","/_worker.js/chunks/industrial_BsmB07B2.mjs","/_worker.js/chunks/industrial_CXd_zMCx.mjs","/_worker.js/chunks/integration_BdGAntAx.mjs","/_worker.js/chunks/integration__UgPG2ZW.mjs","/_worker.js/chunks/keystatic-api_BQI6R6FJ.mjs","/_worker.js/chunks/keystatic-astro-page_CtzgoLe3.mjs","/_worker.js/chunks/marketing-service_DsTJa62o.mjs","/_worker.js/chunks/mastering-email-marketing-campaigns-for-ecommerce-success_B0MH0xga.mjs","/_worker.js/chunks/mastering-email-marketing-campaigns-for-ecommerce-success_Dnj6nrki.mjs","/_worker.js/chunks/mastering-email-marketing-campaigns-for-ecommerce-success_O_3Z-7c5.mjs","/_worker.js/chunks/news_BHWut25q.mjs","/_worker.js/chunks/news_D7n5iWKg.mjs","/_worker.js/chunks/news_DDysclwC.mjs","/_worker.js/chunks/news_DJih7s53.mjs","/_worker.js/chunks/news_DxzLZ_zP.mjs","/_worker.js/chunks/news_PC9Dr9FE.mjs","/_worker.js/chunks/nm_react-dom__DxVmAD-U.mjs","/_worker.js/chunks/nm_react__pUKIoK20.mjs","/_worker.js/chunks/nm_sharp_BcYj-6Wc.mjs","/_worker.js/chunks/og_gak4lhni.mjs","/_worker.js/chunks/orthodontics_D7GMLgKk.mjs","/_worker.js/chunks/paidmedia-service_CoKAE7Cq.mjs","/_worker.js/chunks/plaque_CuT7MUK5.mjs","/_worker.js/chunks/play_C30WqH6E.mjs","/_worker.js/chunks/prerender_BgPehNso.mjs","/_worker.js/chunks/revolutionizing-urban-farming-with-smart-technology_CxEQwgyA.mjs","/_worker.js/chunks/revolutionizing-urban-farming-with-smart-technology_D5IgjbfC.mjs","/_worker.js/chunks/revolutionizing-urban-farming-with-smart-technology_DIL9qWcv.mjs","/_worker.js/chunks/revolutionizing-virtual-reality-gaming-development_BRPUD8MJ.mjs","/_worker.js/chunks/revolutionizing-virtual-reality-gaming-development_Ct6WNnD9.mjs","/_worker.js/chunks/revolutionizing-virtual-reality-gaming-development_oAOkUBfL.mjs","/_worker.js/chunks/rise_C6IcIVod.mjs","/_worker.js/chunks/rss_y2ibURJA.mjs","/_worker.js/chunks/runtime-assets-config_C13ZgZ07.mjs","/_worker.js/chunks/seo_BiJt6Yfn.mjs","/_worker.js/chunks/seo_zg488jsj.mjs","/_worker.js/chunks/shamil-kuruppu_CjdjIfSH.mjs","/_worker.js/chunks/shamil-kuruppu_CqZpO8U9.mjs","/_worker.js/chunks/shamil-kuruppu_DurD7DGk.mjs","/_worker.js/chunks/shamil-kuruppu_OMEIdaKp.mjs","/_worker.js/chunks/shamil-kuruppu_aLE1byL3.mjs","/_worker.js/chunks/shamil-kuruppu_xiDbbgxc.mjs","/_worker.js/chunks/simmeringerp_B7jR5ZZz.mjs","/_worker.js/chunks/simmeringerp_C9otk9ta.mjs","/_worker.js/chunks/simmeringerp_CmTZtI3q.mjs","/_worker.js/chunks/simmeringerp_DZrh6Y4I.mjs","/_worker.js/chunks/simmeringerp_DkI2ZIg4.mjs","/_worker.js/chunks/simmeringerp_Du4wT891.mjs","/_worker.js/chunks/socialmedia-service_DCvECF9T.mjs","/_worker.js/chunks/style_B16XVo__.mjs","/_worker.js/chunks/teeth-whitening_L8TXBeqq.mjs","/_worker.js/chunks/terra_Cgbr9WIz.mjs","/_worker.js/chunks/vision_ZOQLBM7N.mjs","/_worker.js/chunks/widget_CWw9-hAl.mjs","/_worker.js/chunks/works_93_4bF5N.mjs","/_worker.js/chunks/works_BRCouc_f.mjs","/_worker.js/chunks/works_Bam5ZaSo.mjs","/_worker.js/chunks/works_Cg1T6DrL.mjs","/_worker.js/chunks/works_DGP80ZtR.mjs","/_worker.js/chunks/works_Gz-9wr8j.mjs","/_worker.js/chunks/astro/assets-service_CHKEoa7m.mjs","/_worker.js/chunks/pages/image-endpoint_nxDOIah1.mjs","/_worker.js/chunks/pages/keystatic-api_KyjvFBv4.mjs","/_worker.js/chunks/pages/keystatic-astro-page_D1KlaDTl.mjs","/_astro/page.BvKxy2Uc.js","/404.html","/rss.xml"],"i18n":{"strategy":"pathname-prefix-other-locales","locales":["en","it"],"defaultLocale":"en","domainLookupTable":{}},"buildFormat":"directory","checkOrigin":false});

export { AstroIntegrationLogger as A, Logger as L, getEventPrefix as g, levels as l, manifest };
