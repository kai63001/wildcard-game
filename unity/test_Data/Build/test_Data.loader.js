function createUnityInstance(canvas, config, onProgress) {
  onProgress = onProgress || function () {};

  function showBanner(msg, type) {
    // Only ever show one error at most - other banner messages after that should get ignored
    // to avoid noise.
    if (!showBanner.aborted && config.showBanner) {
      if (type == 'error') showBanner.aborted = true;
      return config.showBanner(msg, type);
    }

    // Fallback to console logging if visible banners have been suppressed
    // from the main page.
    switch(type) {
      case 'error': console.error(msg); break;
      case 'warning': console.warn(msg); break;
      default: console.log(msg); break;
    }
  }

  function errorListener(e) {
    var error = e.reason || e.error;
    var message = error ? error.toString() : (e.message || e.reason || '');
    var stack = (error && error.stack) ? error.stack.toString() : '';

    // Do not repeat the error message if it's present in the stack trace.
    if (stack.startsWith(message)) {
      stack = stack.substring(message.length);
    }

    message += '\n' + stack.trim();

    if (!message || !Module.stackTraceRegExp || !Module.stackTraceRegExp.test(message))
      return;

    var filename = e.filename || (error && (error.fileName || error.sourceURL)) || '';
    var lineno = e.lineno || (error && (error.lineNumber || error.line)) || 0;

    errorHandler(message, filename, lineno);
  }

  var Module = {
    canvas: canvas,
    webglContextAttributes: {
      preserveDrawingBuffer: false,
    },
    cacheControl: function (url) {
      return url == Module.dataUrl ? "must-revalidate" : "no-store";
    },
    streamingAssetsUrl: "StreamingAssets",
    downloadProgress: {},
    deinitializers: [],
    intervals: {},
    setInterval: function (func, ms) {
      var id = window.setInterval(func, ms);
      this.intervals[id] = true;
      return id;
    },
    clearInterval: function(id) {
      delete this.intervals[id];
      window.clearInterval(id);
    },
    preRun: [],
    postRun: [],
    print: function (message) {
      console.log(message);
    },
    printErr: function (message) {
      console.error(message);

      if (typeof message === 'string' && message.indexOf('wasm streaming compile failed') != -1) {
        if (message.toLowerCase().indexOf('mime') != -1) {
          showBanner('HTTP Response Header "Content-Type" configured incorrectly on the server for file ' + Module.codeUrl + ' , should be "application/wasm". Startup time performance will suffer.', 'warning');
        } else {
          showBanner('WebAssembly streaming compilation failed! This can happen for example if "Content-Encoding" HTTP header is incorrectly enabled on the server for file ' + Module.codeUrl + ', but the file is not pre-compressed on disk (or vice versa). Check the Network tab in browser Devtools to debug server header configuration.', 'warning');
        }
      }
    },
    locateFile: function (url) {
      return (
        url == "build.wasm" ? this.codeUrl :
        url
      );
    },
    disabledCanvasEvents: [
      "contextmenu",
      "dragstart",
    ],
  };

  for (var parameter in config)
    Module[parameter] = config[parameter];

  Module.streamingAssetsUrl = new URL(Module.streamingAssetsUrl, document.URL).href;

  // Operate on a clone of Module.disabledCanvasEvents field so that at Quit time
  // we will ensure we'll remove the events that we created (in case user has
  // modified/cleared Module.disabledCanvasEvents in between)
  var disabledCanvasEvents = Module.disabledCanvasEvents.slice();

  function preventDefault(e) {
    e.preventDefault();
  }

  disabledCanvasEvents.forEach(function (disabledCanvasEvent) {
    canvas.addEventListener(disabledCanvasEvent, preventDefault);
  });

  window.addEventListener("error", errorListener);
  window.addEventListener("unhandledrejection", errorListener);

  // Safari does not automatically stretch the fullscreen element to fill the screen.
  // The CSS width/height of the canvas causes it to remain the same size in the full screen
  // window on Safari, resulting in it being a small canvas with black borders filling the
  // rest of the screen.
  var _savedElementWidth = "";
  var _savedElementHeight = "";
  // Safari uses webkitfullscreenchange event and not fullscreenchange
  document.addEventListener("webkitfullscreenchange", function(e) {
    // Safari uses webkitCurrentFullScreenElement and not fullscreenElement.
    var fullscreenElement = document.webkitCurrentFullScreenElement;
    if (fullscreenElement === canvas) {
      if (canvas.style.width) {
        _savedElementWidth = canvas.style.width;
        _savedElementHeight = canvas.style.height;
        canvas.style.width = "100%";
        canvas.style.height = "100%";
      }
    } else {
      if (_savedElementWidth) {
        canvas.style.width = _savedElementWidth;
        canvas.style.height = _savedElementHeight;
        _savedElementWidth = "";
        _savedElementHeight = "";
      }
    }
  });

  var unityInstance = {
    Module: Module,
    SetFullscreen: function () {
      if (Module.SetFullscreen)
        return Module.SetFullscreen.apply(Module, arguments);
      Module.print("Failed to set Fullscreen mode: Player not loaded yet.");
    },
    SendMessage: function () {
      if (Module.SendMessage)
        return Module.SendMessage.apply(Module, arguments);
      Module.print("Failed to execute SendMessage: Player not loaded yet.");
    },
    Quit: function () {
      return new Promise(function (resolve, reject) {
        Module.shouldQuit = true;
        Module.onQuit = resolve;

        // Clear the event handlers we added above, so that the event handler
        // functions will not hold references to this JS function scope after
        // exit, to allow JS garbage collection to take place.
        disabledCanvasEvents.forEach(function (disabledCanvasEvent) {
          canvas.removeEventListener(disabledCanvasEvent, preventDefault);
        });
        window.removeEventListener("error", errorListener);
        window.removeEventListener("unhandledrejection", errorListener);
      });
    },
  };

  Module.SystemInfo = (function () {

    var browser, browserVersion, os, osVersion, canvas, gpu;

    var ua = navigator.userAgent + ' ';
    var browsers = [
      ['Firefox', 'Firefox'],
      ['OPR', 'Opera'],
      ['Edg', 'Edge'],
      ['SamsungBrowser', 'Samsung Browser'],
      ['Trident', 'Internet Explorer'],
      ['MSIE', 'Internet Explorer'],
      ['Chrome', 'Chrome'],
      ['CriOS', 'Chrome on iOS Safari'],
      ['FxiOS', 'Firefox on iOS Safari'],
      ['Safari', 'Safari'],
    ];

    function extractRe(re, str, idx) {
      re = RegExp(re, 'i').exec(str);
      return re && re[idx];
    }
    for(var b = 0; b < browsers.length; ++b) {
      browserVersion = extractRe(browsers[b][0] + '[\/ ](.*?)[ \\)]', ua, 1);
      if (browserVersion) {
        browser = browsers[b][1];
        break;
      }
    }
    if (browser == 'Safari') browserVersion = extractRe('Version\/(.*?) ', ua, 1);
    if (browser == 'Internet Explorer') browserVersion = extractRe('rv:(.*?)\\)? ', ua, 1) || browserVersion;

    var oses = [
      ['Windows (.*?)[;\)]', 'Windows'],
      ['Android ([0-9_\.]+)', 'Android'],
      ['iPhone OS ([0-9_\.]+)', 'iPhoneOS'],
      ['iPad.*? OS ([0-9_\.]+)', 'iPadOS'],
      ['FreeBSD( )', 'FreeBSD'],
      ['OpenBSD( )', 'OpenBSD'],
      ['Linux|X11()', 'Linux'],
      ['Mac OS X ([0-9_\.]+)', 'macOS'],
      ['bot|google|baidu|bing|msn|teoma|slurp|yandex', 'Search Bot']
    ];
    for(var o = 0; o < oses.length; ++o) {
      osVersion = extractRe(oses[o][0], ua, 1);
      if (osVersion) {
        os = oses[o][1];
        osVersion = osVersion.replace(/_/g, '.');
        break;
      }
    }
    var versionMappings = {
      'NT 5.0': '2000',
      'NT 5.1': 'XP',
      'NT 5.2': 'Server 2003',
      'NT 6.0': 'Vista',
      'NT 6.1': '7',
      'NT 6.2': '8',
      'NT 6.3': '8.1',
      'NT 10.0': '10'
    };
    osVersion = versionMappings[osVersion] || osVersion;

    // TODO: Add mobile device identifier, e.g. SM-G960U

    canvas = document.createElement("canvas");
    if (canvas) {
      gl = canvas.getContext("webgl2");
      glVersion = gl ? 2 : 0;
      if (!gl) {
        if (gl = canvas && canvas.getContext("webgl")) glVersion = 1;
      }

      if (gl) {
        gpu = (gl.getExtension("WEBGL_debug_renderer_info") && gl.getParameter(0x9246 /*debugRendererInfo.UNMASKED_RENDERER_WEBGL*/)) || gl.getParameter(0x1F01 /*gl.RENDERER*/);
      }
    }

    var hasThreads = typeof SharedArrayBuffer !== 'undefined';
    var hasWasm = typeof WebAssembly === "object" && typeof WebAssembly.compile === "function";
    return {
      width: screen.width,
      height: screen.height,
      userAgent: ua.trim(),
      browser: browser || 'Unknown browser',
      browserVersion: browserVersion || 'Unknown version',
      mobile: /Mobile|Android|iP(ad|hone)/.test(navigator.appVersion),
      os: os || 'Unknown OS',
      osVersion: osVersion || 'Unknown OS Version',
      gpu: gpu || 'Unknown GPU',
      language: navigator.userLanguage || navigator.language,
      hasWebGL: glVersion,
      hasCursorLock: !!document.body.requestPointerLock,
      hasFullscreen: !!document.body.requestFullscreen || !!document.body.webkitRequestFullscreen,
      hasThreads: hasThreads,
      hasWasm: hasWasm,
      // This should be updated when we re-enable wasm threads. Previously it checked for WASM thread
      // support with: var wasmMemory = hasWasm && hasThreads && new WebAssembly.Memory({"initial": 1, "maximum": 1, "shared": true});
      // which caused Chrome to have a warning that SharedArrayBuffer requires cross origin isolation.
      hasWasmThreads: false,
    };
  })();

  function errorHandler(message, filename, lineno) {
    if (Module.startupErrorHandler) {
      Module.startupErrorHandler(message, filename, lineno);
      return;
    }
    if (Module.errorHandler && Module.errorHandler(message, filename, lineno))
      return;
    console.log("Invoking error handler due to\n" + message);
    if (typeof dump == "function")
      dump("Invoking error handler due to\n" + message);
    // Firefox has a bug where it's IndexedDB implementation will throw UnknownErrors, which are harmless, and should not be shown.
    if (message.indexOf("UnknownError") != -1)
      return;
    // Ignore error when application terminated with return code 0
    if (message.indexOf("Program terminated with exit(0)") != -1)
      return;
    if (errorHandler.didShowErrorMessage)
      return;
    var message = "An error occurred running the Unity content on this page. See your browser JavaScript console for more info. The error was:\n" + message;
    if (message.indexOf("DISABLE_EXCEPTION_CATCHING") != -1) {
      message = "An exception has occurred, but exception handling has been disabled in this build. If you are the developer of this content, enable exceptions in your project WebGL player settings to be able to catch the exception or see the stack trace.";
    } else if (message.indexOf("Cannot enlarge memory arrays") != -1) {
      message = "Out of memory. If you are the developer of this content, try allocating more memory to your WebGL build in the WebGL player settings.";
    } else if (message.indexOf("Invalid array buffer length") != -1  || message.indexOf("Invalid typed array length") != -1 || message.indexOf("out of memory") != -1 || message.indexOf("could not allocate memory") != -1) {
      message = "The browser could not allocate enough memory for the WebGL content. If you are the developer of this content, try allocating less memory to your WebGL build in the WebGL player settings.";
    }
    alert(message);
    errorHandler.didShowErrorMessage = true;
  }


  Module.abortHandler = function (message) {
    errorHandler(message, "", 0);
    return true;
  };

  Error.stackTraceLimit = Math.max(Error.stackTraceLimit || 0, 50);

  function progressUpdate(id, e) {
    if (id == "symbolsUrl")
      return;
    var progress = Module.downloadProgress[id];
    if (!progress)
      progress = Module.downloadProgress[id] = {
        started: false,
        finished: false,
        lengthComputable: false,
        total: 0,
        loaded: 0,
      };
    if (typeof e == "object" && (e.type == "progress" || e.type == "load")) {
      if (!progress.started) {
        progress.started = true;
        progress.lengthComputable = e.lengthComputable;
        progress.total = e.total;
      }
      progress.loaded = e.loaded;
      if (e.type == "load")
        progress.finished = true;
    }
    var loaded = 0, total = 0, started = 0, computable = 0, unfinishedNonComputable = 0;
    for (var id in Module.downloadProgress) {
      var progress = Module.downloadProgress[id];
      if (!progress.started)
        return 0;
      started++;
      if (progress.lengthComputable) {
        loaded += progress.loaded;
        total += progress.total;
        computable++;
      } else if (!progress.finished) {
        unfinishedNonComputable++;
      }
    }
    var totalProgress = started ? (started - unfinishedNonComputable - (total ? computable * (total - loaded) / total : 0)) / started : 0;
    onProgress(0.9 * totalProgress);
  }

    Module.XMLHttpRequest = function () {
    var UnityCacheDatabase = { name: "UnityCache", version: 2 };
    var XMLHttpRequestStore = { name: "XMLHttpRequest", version: 1 };
    var WebAssemblyStore = { name: "WebAssembly", version: 1 };
    
    function log(message) {
      console.log("[UnityCache] " + message);
    }
    
    function resolveURL(url) {
      resolveURL.link = resolveURL.link || document.createElement("a");
      resolveURL.link.href = url;
      return resolveURL.link.href;
    }
    
    function isCrossOriginURL(url) {
      var originMatch = window.location.href.match(/^[a-z]+:\/\/[^\/]+/);
      return !originMatch || url.lastIndexOf(originMatch[0], 0);
    }

    function UnityCache() {
      var cache = this;
      cache.queue = [];

      function initDatabase(database) {
        if (typeof cache.database != "undefined")
          return;
        cache.database = database;
        if (!cache.database)
          log("indexedDB database could not be opened");
        while (cache.queue.length) {
          var queued = cache.queue.shift();
          if (cache.database) {
            cache.execute.apply(cache, queued.arguments);
          } else if (typeof queued.onerror == "function") {
            queued.onerror(new Error("operation cancelled"));
          }
        }
      }
      
      try {
        var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
        function upgradeDatabase() {
          var openRequest = indexedDB.open(UnityCacheDatabase.name, UnityCacheDatabase.version);
          openRequest.onupgradeneeded = function (e) {
            var database = e.target.result;
            if (!database.objectStoreNames.contains(WebAssemblyStore.name))
              database.createObjectStore(WebAssemblyStore.name);
          };
          openRequest.onsuccess = function (e) { initDatabase(e.target.result); };
          openRequest.onerror = function () { initDatabase(null); };
        }

        // Workaround for WebKit bug 226547:
        // On very first page load opening a connection to IndexedDB hangs without triggering onerror.
        // Add a timeout that triggers the error handling code.
        var indexedDBTimeout = setTimeout(function () {
          if (typeof cache.database != "undefined")
            return;
          
          initDatabase(null);  
        }, 2000);

        var openRequest = indexedDB.open(UnityCacheDatabase.name);
        openRequest.onupgradeneeded = function (e) {
          var objectStore = e.target.result.createObjectStore(XMLHttpRequestStore.name, { keyPath: "url" });
          ["version", "company", "product", "updated", "revalidated", "accessed"].forEach(function (index) { objectStore.createIndex(index, index); });
        };
        openRequest.onsuccess = function (e) {
          clearTimeout(indexedDBTimeout);

          var database = e.target.result;
          if (database.version < UnityCacheDatabase.version) {
            database.close();
            upgradeDatabase();
          } else {
            initDatabase(database);
          }
        };
        openRequest.onerror = function () {
          clearTimeout(indexedDBTimeout);
          initDatabase(null);
        };
      } catch (e) {
        clearTimeout(indexedDBTimeout);
        initDatabase(null);
      }
    };
    
    UnityCache.prototype.execute = function (store, operation, parameters, onsuccess, onerror) {
      if (this.database) {
        try {
          var target = this.database.transaction([store], ["put", "delete", "clear"].indexOf(operation) != -1 ? "readwrite" : "readonly").objectStore(store);
          if (operation == "openKeyCursor") {
            target = target.index(parameters[0]);
            parameters = parameters.slice(1);
          }
          var request = target[operation].apply(target, parameters);
          if (typeof onsuccess == "function")
            request.onsuccess = function (e) { onsuccess(e.target.result); };
          request.onerror = onerror;
        } catch (e) {
          if (typeof onerror == "function")
            onerror(e);
        }
      } else if (typeof this.database == "undefined") {
        this.queue.push({
          arguments: arguments,
          onerror: onerror
        });
      } else if (typeof onerror == "function") {
        onerror(new Error("indexedDB access denied"));
      }
    };
    
    var unityCache = new UnityCache();
    
    function createXMLHttpRequestResult(url, company, product, timestamp, xhr) {
      var result = { url: url, version: XMLHttpRequestStore.version, company: company, product: product, updated: timestamp, revalidated: timestamp, accessed: timestamp, responseHeaders: {}, xhr: {} };
      if (xhr) {
        ["Last-Modified", "ETag"].forEach(function (header) { result.responseHeaders[header] = xhr.getResponseHeader(header); });
        ["responseURL", "status", "statusText", "response"].forEach(function (property) { result.xhr[property] = xhr[property]; });
      }
      return result;
    }

    function CachedXMLHttpRequest(objParameters) {
      this.cache = { enabled: false };
      if (objParameters) {
        this.cache.control = objParameters.cacheControl;
        this.cache.company = objParameters.companyName;
        this.cache.product = objParameters.productName;
      }
      this.xhr = new XMLHttpRequest(objParameters);
      this.xhr.addEventListener("load", function () {
        var xhr = this.xhr, cache = this.cache;
        if (!cache.enabled || cache.revalidated)
          return;
        if (xhr.status == 304) {
          cache.result.revalidated = cache.result.accessed;
          cache.revalidated = true;
          unityCache.execute(XMLHttpRequestStore.name, "put", [cache.result]);
          log("'" + cache.result.url + "' successfully revalidated and served from the indexedDB cache");
        } else if (xhr.status == 200) {
          cache.result = createXMLHttpRequestResult(cache.result.url, cache.company, cache.product, cache.result.accessed, xhr);
          cache.revalidated = true;
          unityCache.execute(XMLHttpRequestStore.name, "put", [cache.result], function (result) {
            log("'" + cache.result.url + "' successfully downloaded and stored in the indexedDB cache");
          }, function (error) {
            log("'" + cache.result.url + "' successfully downloaded but not stored in the indexedDB cache due to the error: " + error);
          });
        } else {
          log("'" + cache.result.url + "' request failed with status: " + xhr.status + " " + xhr.statusText);
        }
      }.bind(this));
    };
    
    CachedXMLHttpRequest.prototype.send = function (data) {
      var xhr = this.xhr, cache = this.cache;
      var sendArguments = arguments;
      cache.enabled = cache.enabled && xhr.responseType == "arraybuffer" && !data;
      if (!cache.enabled)
        return xhr.send.apply(xhr, sendArguments);
      unityCache.execute(XMLHttpRequestStore.name, "get", [cache.result.url], function (result) {
        if (!result || result.version != XMLHttpRequestStore.version) {
          xhr.send.apply(xhr, sendArguments);
          return;
        }
        cache.result = result;
        cache.result.accessed = Date.now();
        if (cache.control == "immutable") {
          cache.revalidated = true;
          unityCache.execute(XMLHttpRequestStore.name, "put", [cache.result]);
          xhr.dispatchEvent(new Event('load'));
          log("'" + cache.result.url + "' served from the indexedDB cache without revalidation");
        } else if (isCrossOriginURL(cache.result.url) && (cache.result.responseHeaders["Last-Modified"] || cache.result.responseHeaders["ETag"])) {
          var headXHR = new XMLHttpRequest();
          headXHR.open("HEAD", cache.result.url);
          headXHR.onload = function () {
            cache.revalidated = ["Last-Modified", "ETag"].every(function (header) {
              return !cache.result.responseHeaders[header] || cache.result.responseHeaders[header] == headXHR.getResponseHeader(header);
            });
            if (cache.revalidated) {
              cache.result.revalidated = cache.result.accessed;
              unityCache.execute(XMLHttpRequestStore.name, "put", [cache.result]);
              xhr.dispatchEvent(new Event('load'));
              log("'" + cache.result.url + "' successfully revalidated and served from the indexedDB cache");
            } else {
              xhr.send.apply(xhr, sendArguments);
            }
          }
          headXHR.send();
        } else {
          if (cache.result.responseHeaders["Last-Modified"]) {
            xhr.setRequestHeader("If-Modified-Since", cache.result.responseHeaders["Last-Modified"]);
            xhr.setRequestHeader("Cache-Control", "no-cache");
          } else if (cache.result.responseHeaders["ETag"]) {
            xhr.setRequestHeader("If-None-Match", cache.result.responseHeaders["ETag"]);
            xhr.setRequestHeader("Cache-Control", "no-cache");
          }
          xhr.send.apply(xhr, sendArguments);
        }
      }, function (error) {
        xhr.send.apply(xhr, sendArguments);
      });
    };
    
    CachedXMLHttpRequest.prototype.open = function (method, url, async, user, password) {
      this.cache.result = createXMLHttpRequestResult(resolveURL(url), this.cache.company, this.cache.product, Date.now());
      this.cache.enabled = ["must-revalidate", "immutable"].indexOf(this.cache.control) != -1 && method == "GET" && this.cache.result.url.match("^https?:\/\/")
        && (typeof async == "undefined" || async) && typeof user == "undefined" && typeof password == "undefined";
      this.cache.revalidated = false;
      return this.xhr.open.apply(this.xhr, arguments);
    };
    
    CachedXMLHttpRequest.prototype.setRequestHeader = function (header, value) {
      this.cache.enabled = false;
      return this.xhr.setRequestHeader.apply(this.xhr, arguments);
    };
    
    var xhr = new XMLHttpRequest();
    for (var property in xhr) {
      if (!CachedXMLHttpRequest.prototype.hasOwnProperty(property)) {
        (function (property) {
          Object.defineProperty(CachedXMLHttpRequest.prototype, property, typeof xhr[property] == "function" ? {
            value: function () { return this.xhr[property].apply(this.xhr, arguments); },
          } : {
            get: function () { return this.cache.revalidated && this.cache.result.xhr.hasOwnProperty(property) ? this.cache.result.xhr[property] : this.xhr[property]; },
            set: function (value) { this.xhr[property] = value; },
          });
        })(property);
      }
    }
    
    return CachedXMLHttpRequest;
  } ();



  function downloadBinary(urlId) {
    return new Promise(function (resolve, reject) {
      progressUpdate(urlId);
      var xhr = Module.companyName && Module.productName ? new Module.XMLHttpRequest({
        companyName: Module.companyName,
        productName: Module.productName,
        cacheControl: Module.cacheControl(Module[urlId]),
      }) : new XMLHttpRequest();
      xhr.open("GET", Module[urlId]);
      xhr.responseType = "arraybuffer";
      xhr.addEventListener("progress", function (e) {
        progressUpdate(urlId, e);
      });
      xhr.addEventListener("load", function(e) {
        progressUpdate(urlId, e);
        resolve(new Uint8Array(xhr.response));
      });

      xhr.addEventListener("error", function(e) {
        var error = 'Failed to download file ' + Module[urlId]
        if (location.protocol == 'file:') {
          showBanner(error + '. Loading web pages via a file:// URL without a web server is not supported by this browser. Please use a local development web server to host Unity content, or use the Unity Build and Run option.', 'error');
        } else {
          console.error(error);
        }
      });

      xhr.send();
    });
  }

  function downloadFramework() {
      return new Promise(function (resolve, reject) {
        var script = document.createElement("script");
        script.src = Module.frameworkUrl;
        script.onload = function () {
          // Adding the framework.js script to DOM created a global
          // 'unityFramework' variable that should be considered internal.
          // If not, then we have received a malformed file.
          if (typeof unityFramework === 'undefined' || !unityFramework) {
            var compressions = [['br', 'br'], ['gz', 'gzip']];
            for(var i in compressions) {
              var compression = compressions[i];
              if (Module.frameworkUrl.endsWith('.' + compression[0])) {
                var error = 'Unable to parse ' + Module.frameworkUrl + '!';
                if (location.protocol == 'file:') {
                  showBanner(error + ' Loading pre-compressed (brotli or gzip) content via a file:// URL without a web server is not supported by this browser. Please use a local development web server to host compressed Unity content, or use the Unity Build and Run option.', 'error');
                  return;
                }
                error += ' This can happen if build compression was enabled but web server hosting the content was misconfigured to not serve the file with HTTP Response Header "Content-Encoding: ' + compression[1] + '" present. Check browser Console and Devtools Network tab to debug.';
                if (compression[0] == 'br') {
                  if (location.protocol == 'http:') {
                    var migrationHelp = ['localhost', '127.0.0.1'].indexOf(location.hostname) != -1 ? '' : 'Migrate your server to use HTTPS.'
                    if (/Firefox/.test(navigator.userAgent)) error = 'Unable to parse ' + Module.frameworkUrl + '!<br>If using custom web server, verify that web server is sending .br files with HTTP Response Header "Content-Encoding: br". Brotli compression may not be supported in Firefox over HTTP connections. ' + migrationHelp + ' See <a href="https://bugzilla.mozilla.org/show_bug.cgi?id=1670675">https://bugzilla.mozilla.org/show_bug.cgi?id=1670675</a> for more information.';
                    else error = 'Unable to parse ' + Module.frameworkUrl + '!<br>If using custom web server, verify that web server is sending .br files with HTTP Response Header "Content-Encoding: br". Brotli compression may not be supported over HTTP connections. Migrate your server to use HTTPS.';
                  }
                }
                showBanner(error, 'error');
                return;
              }
            };
            showBanner('Unable to parse ' + Module.frameworkUrl + '! The file is corrupt, or compression was misconfigured? (check Content-Encoding HTTP Response Header on web server)', 'error');
          }

          // Capture the variable to local scope and clear it from global
          // scope so that JS garbage collection can take place on
          // application quit.
          var fw = unityFramework;
          unityFramework = null;
          // Also ensure this function will not hold any JS scope
          // references to prevent JS garbage collection.
          script.onload = null;
          resolve(fw);
        }
        script.onerror = function(e) {
          showBanner('Unable to load file ' + Module.frameworkUrl + '! Check that the file exists on the remote server. (also check browser Console and Devtools Network tab to debug)', 'error');
        }
        document.body.appendChild(script);
        Module.deinitializers.push(function() {
          document.body.removeChild(script);
        });
      });
  }

  function loadBuild() {
    downloadFramework().then(function (unityFramework) {
      unityFramework(Module);
    });

    var dataPromise = downloadBinary("dataUrl");
    Module.preRun.push(function () {
      Module.addRunDependency("dataUrl");
      dataPromise.then(function (data) {
        var view = new DataView(data.buffer, data.byteOffset, data.byteLength);
        var pos = 0;
        var prefix = "UnityWebData1.0\0";
        if (!String.fromCharCode.apply(null, data.subarray(pos, pos + prefix.length)) == prefix)
          throw "unknown data format";
        pos += prefix.length;
        var headerSize = view.getUint32(pos, true); pos += 4;
        while (pos < headerSize) {
          var offset = view.getUint32(pos, true); pos += 4;
          var size = view.getUint32(pos, true); pos += 4;
          var pathLength = view.getUint32(pos, true); pos += 4;
          var path = String.fromCharCode.apply(null, data.subarray(pos, pos + pathLength)); pos += pathLength;
          for (var folder = 0, folderNext = path.indexOf("/", folder) + 1 ; folderNext > 0; folder = folderNext, folderNext = path.indexOf("/", folder) + 1)
            Module.FS_createPath(path.substring(0, folder), path.substring(folder, folderNext - 1), true, true);
          Module.FS_createDataFile(path, null, data.subarray(offset, offset + size), true, true, true);
        }
        Module.removeRunDependency("dataUrl");
      });
    });
  }

  return new Promise(function (resolve, reject) {
    if (!Module.SystemInfo.hasWebGL) {
      reject("Your browser does not support WebGL.");
    } else if (!Module.SystemInfo.hasWasm) {
      reject("Your browser does not support WebAssembly.");
    } else {
      if (Module.SystemInfo.hasWebGL == 1)
        Module.print("Warning: Your browser does not support \"WebGL 2.0\" Graphics API, switching to \"WebGL 1.0\"");
      Module.startupErrorHandler = reject;
      onProgress(0);
      Module.postRun.push(function () {
        onProgress(1);
        delete Module.startupErrorHandler;
        resolve(unityInstance);
      });
      loadBuild();
    }
  });
}
