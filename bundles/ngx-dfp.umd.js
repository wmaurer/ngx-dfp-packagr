(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('rxjs'), require('@angular/router'), require('rxjs/operators'), require('@alugha/ima')) :
    typeof define === 'function' && define.amd ? define('ngx-dfp', ['exports', '@angular/core', '@angular/common', 'rxjs', '@angular/router', 'rxjs/operators', '@alugha/ima'], factory) :
    (factory((global['ngx-dfp'] = {}),global.ng.core,global.ng.common,global.rxjs,global.ng.router,global.rxjs.operators,null));
}(this, (function (exports,core,common,rxjs,router,operators,ima) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var HttpErrorService = (function () {
        function HttpErrorService() {
            this.isErrorCode = function (code) {
                if (typeof code === 'number') {
                    return !(code >= 200 && code < 300);
                }
                return code[0] !== '2';
            };
        }
        /**
         * @param {?} response
         * @param {?} message
         * @return {?}
         */
        HttpErrorService.prototype.httpError = /**
         * @param {?} response
         * @param {?} message
         * @return {?}
         */
            function (response, message) {
                console.log("Error (" + response.status + ") " + (message ? message : ''));
            };
        HttpErrorService.decorators = [
            { type: core.Injectable },
        ];
        return HttpErrorService;
    }());

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (b.hasOwnProperty(p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var DFPDurationError = (function (_super) {
        __extends(DFPDurationError, _super);
        function DFPDurationError(interval) {
            return _super.call(this, "Invalid interval: '" + interval + "'ls") || this;
        }
        return DFPDurationError;
    }(Error));
    var ParseDurationService = (function () {
        function ParseDurationService() {
        }
        /**
         * @param {?} time
         * @param {?} unit
         * @return {?}
         */
        ParseDurationService.prototype.convertToMilliseconds = /**
         * @param {?} time
         * @param {?} unit
         * @return {?}
         */
            function (time, unit) {
                console.assert(/^(m?s|min|h)$/g.test(unit));
                if (unit === 'ms') {
                    return time;
                }
                if (unit === 's') {
                    return time * 1000;
                }
                if (unit === 'min') {
                    return time * 60 * 1000;
                }
                return time * 60 * 60 * 1000;
            };
        /**
         * @param {?} match
         * @return {?}
         */
        ParseDurationService.prototype.convert = /**
         * @param {?} match
         * @return {?}
         */
            function (match) {
                /** @type {?} */
                var time = parseFloat(match[1]);
                if (match.length === 2) {
                    return time;
                }
                return this.convertToMilliseconds(time, match[2]);
            };
        /**
         * @param {?} interval
         * @return {?}
         */
        ParseDurationService.prototype.parseDuration = /**
         * @param {?} interval
         * @return {?}
         */
            function (interval) {
                if (interval === undefined || interval === null) {
                    throw new DFPDurationError(interval);
                }
                if (typeof interval === 'number') {
                    return interval;
                }
                if (typeof interval !== 'string') {
                    throw new TypeError("'" + interval + "' must be of number or string type");
                }
                /** @type {?} */
                var match = interval.match(/((?:\d+)?.?\d+)(m?s|min|h)?/);
                if (!match) {
                    throw new DFPDurationError(interval);
                }
                return this.convert(match);
            };
        ParseDurationService.decorators = [
            { type: core.Injectable },
        ];
        return ParseDurationService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var ScriptInjectorService = (function () {
        function ScriptInjectorService(httpError) {
            this.httpError = httpError;
        }
        /**
         * @param {?} url
         * @return {?}
         */
        ScriptInjectorService.prototype.completeURL = /**
         * @param {?} url
         * @return {?}
         */
            function (url) {
                /** @type {?} */
                var ssl = document.location.protocol === 'https:';
                return (ssl ? 'https:' : 'http:') + url;
            };
        /**
         * @param {?} url
         * @return {?}
         */
        ScriptInjectorService.prototype.createScript = /**
         * @param {?} url
         * @return {?}
         */
            function (url) {
                /** @type {?} */
                var script = document.createElement('script');
                script.async = true;
                script.type = 'text/javascript';
                script.src = this.completeURL(url);
                return script;
            };
        /**
         * @param {?} script
         * @param {?} url
         * @return {?}
         */
        ScriptInjectorService.prototype.promiseScript = /**
         * @param {?} script
         * @param {?} url
         * @return {?}
         */
            function (script, url) {
                var _this = this;
                /** @type {?} */
                var promise = new Promise(function (resolve, reject) {
                    script.onload = function () {
                        resolve(script);
                    };
                    script.onerror = function () {
                        reject({
                            path: url,
                            loaded: false
                        });
                    };
                });
                promise.catch(function (response) {
                    _this.httpError.httpError({ status: 400 }, "loading script \"" + url + "\"");
                });
                return promise;
            };
        /**
         * @param {?} script
         * @return {?}
         */
        ScriptInjectorService.prototype.injectScript = /**
         * @param {?} script
         * @return {?}
         */
            function (script) {
                /** @type {?} */
                var head = document.head || document.querySelector('head');
                head.appendChild(script);
            };
        /**
         * @param {?} url
         * @return {?}
         */
        ScriptInjectorService.prototype.scriptInjector = /**
         * @param {?} url
         * @return {?}
         */
            function (url) {
                /** @type {?} */
                var script = this.createScript(url);
                this.injectScript(script);
                return this.promiseScript(script, url);
            };
        ScriptInjectorService.decorators = [
            { type: core.Injectable },
        ];
        /** @nocollapse */
        ScriptInjectorService.ctorParameters = function () {
            return [
                { type: HttpErrorService }
            ];
        };
        return ScriptInjectorService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var IdleService = (function () {
        function IdleService(platformId, zone) {
            /** @type {?} */
            var win = common.isPlatformBrowser(platformId) ? window : {};
            if (win.requestIdleCallback) {
                this.requestIdleCallback = function (fun) {
                    return win.requestIdleCallback(fun);
                };
            }
            else {
                this.requestIdleCallback = function (fun) {
                    return zone.runOutsideAngular(function () { return win.setTimeout(fun, 50); });
                };
            }
        }
        /**
         * @param {?} fun
         * @return {?}
         */
        IdleService.prototype.request = /**
         * @param {?} fun
         * @return {?}
         */
            function (fun) {
                this.requestIdleCallback(fun);
            };
        IdleService.decorators = [
            { type: core.Injectable },
        ];
        /** @nocollapse */
        IdleService.ctorParameters = function () {
            return [
                { type: Object, decorators: [{ type: core.Inject, args: [core.PLATFORM_ID,] }] },
                { type: core.NgZone }
            ];
        };
        return IdleService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var DFPIncompleteError = (function (_super) {
        __extends(DFPIncompleteError, _super);
        function DFPIncompleteError(directiveName, missingName, isAttribute) {
            return _super.call(this, "Incomplete definition of '" + directiveName + "': " +
                ("Missing " + (isAttribute ? 'attribute' : 'child directive') + " ") +
                ("'" + missingName + "'.")) || this;
        }
        return DFPIncompleteError;
    }(Error));
    var DFPTypeError = (function (_super) {
        __extends(DFPTypeError, _super);
        function DFPTypeError(directiveName, attributeName, wrongValue, expectedType) {
            return _super.call(this, "Wrong type for attribute '" + attributeName + "' on " +
                ("directive '" + directiveName + "': Expected " + expectedType) +
                (", got " + typeof wrongValue)) || this;
        }
        return DFPTypeError;
    }(Error));
    var DFPMissingParentError = (function (_super) {
        __extends(DFPMissingParentError, _super);
        function DFPMissingParentError(directiveName) {
            var parents = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                parents[_i - 1] = arguments[_i];
            }
            var _this = this;
            console.assert(parents && parents.length > 0);
            if (Array.isArray(parents[0])) {
                parents = parents[0];
            }
            /** @type {?} */
            var parentMessage;
            if (parents.length > 1) {
                parents = parents.map(function (p) { return "'" + p + "'"; });
                parentMessage = ', which must be ';
                parentMessage += parents.slice(0, -1).join(', ');
                parentMessage += " or " + parents[parents.length - 1];
            }
            else {
                parentMessage = " '" + parents[0] + "'";
            }
            _this = _super.call(this, "Invalid use of '" + directiveName + "' directive. " +
                ("Missing parent directive" + parentMessage + ".")) || this;
            return _this;
        }
        return DFPMissingParentError;
    }(Error));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var DfpConfig = (function () {
        function DfpConfig() {
        }
        return DfpConfig;
    }());
    /** @type {?} */
    var DFP_CONFIG = new core.InjectionToken('dfpConfig', {
        factory: function () { return new DfpConfig(); }
    });

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    /** @type {?} */
    var GPT_LIBRARY_URL = '//www.googletagservices.com/tag/js/gpt.js';
    var DFPConfigurationError = (function (_super) {
        __extends(DFPConfigurationError, _super);
        function DFPConfigurationError() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return DFPConfigurationError;
    }(Error));
    var DfpService = (function () {
        function DfpService(platformId, idleLoad, config, scriptInjector) {
            var _this = this;
            this.platformId = platformId;
            this.config = config;
            this.scriptInjector = scriptInjector;
            this.enableVideoAds = false;
            this.personalizedAds = true;
            this.collapseIfEmpty = true;
            this.centering = false;
            this.location = null;
            this.ppid = null;
            this.globalTargeting = null;
            this.forceSafeFrame = false;
            this.safeFrameConfig = null;
            this.loadGPT = true;
            this.loaded = false;
            if (common.isPlatformBrowser(this.platformId)) {
                /** @type {?} */
                var win = window;
                /** @type {?} */
                var googletag = win.googletag || {};
                this.dfpConfig();
                googletag.cmd = googletag.cmd || [];
                googletag.cmd.push(function () {
                    _this.setup();
                });
                win.googletag = googletag;
                if (this.loadGPT) {
                    /** @type {?} */
                    var loadScript = function () {
                        _this.scriptInjector.scriptInjector(GPT_LIBRARY_URL).then(function (script) {
                            _this.loaded = true;
                        });
                    };
                    if (idleLoad) {
                        idleLoad.request(loadScript);
                    }
                    else {
                        loadScript();
                    }
                }
            }
        }
        /**
         * @return {?}
         */
        DfpService.prototype.dfpConfig = /**
         * @return {?}
         */
            function () {
                for (var key in this.config) {
                    if (this.hasOwnProperty(key)) {
                        this[key] = this.config[key];
                    }
                }
            };
        /**
         * @param {?} pubads
         * @return {?}
         */
        DfpService.prototype.addSafeFrameConfig = /**
         * @param {?} pubads
         * @return {?}
         */
            function (pubads) {
                if (!this.safeFrameConfig) {
                    return false;
                }
                if (typeof this.safeFrameConfig !== 'object') {
                    throw new DFPConfigurationError('FrameConfig must be an object');
                }
                pubads.setSafeFrameConfig(this.safeFrameConfig);
            };
        /**
         * @param {?} pubads
         * @return {?}
         */
        DfpService.prototype.addTargeting = /**
         * @param {?} pubads
         * @return {?}
         */
            function (pubads) {
                if (!this.globalTargeting) {
                    return false;
                }
                if (typeof this.globalTargeting !== 'object') {
                    throw new DFPConfigurationError('Targeting must be an object');
                }
                for (var key in this.globalTargeting) {
                    if (this.globalTargeting.hasOwnProperty(key)) {
                        pubads.setTargeting(key, this.globalTargeting[key]);
                    }
                }
            };
        /**
         * @param {?} pubads
         * @return {?}
         */
        DfpService.prototype.addLocation = /**
         * @param {?} pubads
         * @return {?}
         */
            function (pubads) {
                if (!this.location) {
                    return false;
                }
                if (typeof this.location === 'string') {
                    pubads.setLocation(this.location);
                    return;
                }
                if (!Array.isArray(this.location)) {
                    throw new DFPConfigurationError('Location must be an ' +
                        'array or string');
                }
                pubads.setLocation.apply(pubads, this.location);
            };
        /**
         * @param {?} pubads
         * @return {?}
         */
        DfpService.prototype.addPPID = /**
         * @param {?} pubads
         * @return {?}
         */
            function (pubads) {
                if (!this.ppid) {
                    return false;
                }
                if (typeof this.ppid !== 'string') {
                    throw new DFPConfigurationError('PPID must be a string');
                }
                pubads.setPublisherProvidedId(this.ppid);
            };
        /**
         * @return {?}
         */
        DfpService.prototype.setup = /**
         * @return {?}
         */
            function () {
                /** @type {?} */
                var win = window;
                /** @type {?} */
                var googletag = win.googletag;
                /** @type {?} */
                var pubads = googletag.pubads();
                if (this.enableVideoAds) {
                    pubads.enableVideoAds();
                }
                // personalizedAds is default
                if (this.personalizedAds === false) {
                    pubads.setRequestNonPersonalizedAds(1);
                }
                if (this.collapseIfEmpty) {
                    pubads.collapseEmptyDivs();
                }
                // We always refresh ourselves
                pubads.disableInitialLoad();
                pubads.setForceSafeFrame(this.forceSafeFrame);
                pubads.setCentering(this.centering);
                this.addLocation(pubads);
                this.addPPID(pubads);
                this.addTargeting(pubads);
                this.addSafeFrameConfig(pubads);
                // pubads.enableSyncRendering();
                pubads.enableAsyncRendering();
                if (this.config.singleRequestMode !== true) {
                    if (this.config.enableVideoAds) {
                        pubads.enableVideoAds();
                    }
                    googletag.enableServices();
                }
            };
        /**
         * @return {?}
         */
        DfpService.prototype.hasLoaded = /**
         * @return {?}
         */
            function () {
                return this.loaded;
            };
        /**
         * @param {?} task
         * @return {?}
         */
        DfpService.prototype.defineTask = /**
         * @param {?} task
         * @return {?}
         */
            function (task) {
                if (common.isPlatformBrowser(this.platformId)) {
                    /** @type {?} */
                    var win = window;
                    /** @type {?} */
                    var googletag = win.googletag;
                    googletag.cmd.push(task);
                }
            };
        DfpService.decorators = [
            { type: core.Injectable },
        ];
        /** @nocollapse */
        DfpService.ctorParameters = function () {
            return [
                { type: Object, decorators: [{ type: core.Inject, args: [core.PLATFORM_ID,] }] },
                { type: IdleService, decorators: [{ type: core.Optional }] },
                { type: DfpConfig, decorators: [{ type: core.Inject, args: [DFP_CONFIG,] }] },
                { type: ScriptInjectorService }
            ];
        };
        return DfpService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var DfpIDGeneratorService = (function () {
        function DfpIDGeneratorService() {
            this.generatedIDs = {};
        }
        /**
         * @return {?}
         */
        DfpIDGeneratorService.prototype.generateID = /**
         * @return {?}
         */
            function () {
                /** @type {?} */
                var id = null;
                do {
                    /** @type {?} */
                    var number = Math.random().toString().slice(2);
                    id = 'gpt-ad-' + number;
                } while (id in this.generatedIDs);
                this.generatedIDs[id] = true;
                return id;
            };
        /**
         * @param {?} element
         * @return {?}
         */
        DfpIDGeneratorService.prototype.dfpIDGenerator = /**
         * @param {?} element
         * @return {?}
         */
            function (element) {
                if (element && element.id && !(element.id in this.generatedIDs)) {
                    return element.id;
                }
                /** @type {?} */
                var id = this.generateID();
                if (element) {
                    element.id = id;
                }
                return id;
            };
        /**
         * @param {?} id
         * @return {?}
         */
        DfpIDGeneratorService.prototype.isTaken = /**
         * @param {?} id
         * @return {?}
         */
            function (id) {
                return id in this.generatedIDs;
            };
        /**
         * @param {?} id
         * @return {?}
         */
        DfpIDGeneratorService.prototype.isUnique = /**
         * @param {?} id
         * @return {?}
         */
            function (id) {
                return !this.isTaken(id);
            };
        DfpIDGeneratorService.decorators = [
            { type: core.Injectable },
        ];
        return DfpIDGeneratorService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var DFPRefreshError = (function (_super) {
        __extends(DFPRefreshError, _super);
        function DFPRefreshError() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return DFPRefreshError;
    }(Error));
    var DfpRefreshService = (function () {
        function DfpRefreshService(config, inject, parseDuration) {
            this.config = config;
            this.inject = inject;
            this.parseDuration = parseDuration;
            this.refreshEvent = new core.EventEmitter();
            this.refreshSlots = [];
            this.intervals = {};
        }
        /**
         * @param {?} slot
         * @param {?=} refreshInterval
         * @param {?=} initRefresh
         * @return {?}
         */
        DfpRefreshService.prototype.slotRefresh = /**
         * @param {?} slot
         * @param {?=} refreshInterval
         * @param {?=} initRefresh
         * @return {?}
         */
            function (slot, refreshInterval, initRefresh) {
                var _this = this;
                if (initRefresh === void 0) {
                    initRefresh = false;
                }
                /** @type {?} */
                var deferred = rxjs.from([slot]).toPromise();
                /** @type {?} */
                var task = { slot: slot, deferred: deferred };
                deferred.then(function () {
                    if (_this.hasSlotInterval(slot)) {
                        _this.cancelInterval(slot);
                    }
                    if (refreshInterval) {
                        _this.addSlotInterval(task, refreshInterval);
                    }
                });
                if (this.config.singleRequestMode === true && initRefresh) {
                    // Use a timer to handle refresh of a single request mode
                    this.refreshSlots.push(slot);
                    if (this.singleRequest && !this.singleRequest.closed) {
                        this.singleRequest.unsubscribe();
                    }
                    this.singleRequest = rxjs.timer(100).subscribe(function () {
                        /** @type {?} */
                        var pubads = googletag.pubads();
                        pubads.enableSingleRequest();
                        googletag.enableServices();
                        _this.refreshSlots.forEach(function (s) {
                            googletag.display(s.getSlotElementId());
                        });
                        pubads.refresh(_this.refreshSlots);
                        _this.refreshSlots = [];
                    });
                }
                else {
                    googletag.display(slot.getSlotElementId());
                    this.refresh([task]);
                }
                return deferred;
            };
        /**
         * @param {?} slot
         * @return {?}
         */
        DfpRefreshService.prototype.cancelInterval = /**
         * @param {?} slot
         * @return {?}
         */
            function (slot) {
                if (!this.hasSlotInterval(slot)) {
                    throw new DFPRefreshError('No interval for given slot');
                }
                /** @type {?} */
                var interval = this.intervals[this.slotIntervalKey(slot)];
                interval.unsubscribe();
                delete this.intervals[slot];
                return this;
            };
        /**
         * @param {?} slot
         * @return {?}
         */
        DfpRefreshService.prototype.hasSlotInterval = /**
         * @param {?} slot
         * @return {?}
         */
            function (slot) {
                return this.slotIntervalKey(slot) in this.intervals;
            };
        /**
         * @param {?=} tasks
         * @return {?}
         */
        DfpRefreshService.prototype.refresh = /**
         * @param {?=} tasks
         * @return {?}
         */
            function (tasks) {
                if (tasks === undefined) {
                    googletag.cmd.push(function () {
                        googletag.pubads().refresh();
                    });
                    return;
                }
                if (tasks.length === 0) {
                    return false;
                }
                googletag.cmd.push(function () {
                    googletag.pubads().refresh(tasks.map(function (task) { return task.slot; }));
                    tasks.forEach(function (task) {
                        Promise.resolve(task.slot);
                    });
                });
            };
        /**
         * @param {?} task
         * @param {?} interval
         * @return {?}
         */
        DfpRefreshService.prototype.addSlotInterval = /**
         * @param {?} task
         * @param {?} interval
         * @return {?}
         */
            function (task, interval) {
                var _this = this;
                /** @type {?} */
                var parsedInterval = this.parseDuration.parseDuration(interval);
                this.validateInterval(parsedInterval, interval);
                /** @type {?} */
                var refresh = rxjs.timer(parsedInterval, parsedInterval).subscribe(function () {
                    /** @type {?} */
                    var doc = _this.inject.get(common.DOCUMENT);
                    if (!_this.hiddenCheck(doc.getElementById(task.slot.getSlotElementId()))) {
                        _this.refresh([task]);
                        _this.refreshEvent.emit(task.slot);
                    }
                });
                this.intervals[this.slotIntervalKey(task.slot)] = refresh;
                return refresh;
            };
        /**
         * @param {?} slot
         * @return {?}
         */
        DfpRefreshService.prototype.slotIntervalKey = /**
         * @param {?} slot
         * @return {?}
         */
            function (slot) {
                return slot.getSlotId().getDomId();
            };
        /**
         * @param {?} milliseconds
         * @param {?} beforeParsing
         * @return {?}
         */
        DfpRefreshService.prototype.validateInterval = /**
         * @param {?} milliseconds
         * @param {?} beforeParsing
         * @return {?}
         */
            function (milliseconds, beforeParsing) {
                if (milliseconds < 1000) {
                    console.warn('Careful: ${beforeParsing} is quite a low interval!');
                }
            };
        /**
         * @param {?} element
         * @return {?}
         */
        DfpRefreshService.prototype.hiddenCheck = /**
         * @param {?} element
         * @return {?}
         */
            function (element) {
                if (typeof (window) !== 'undefined') {
                    /** @type {?} */
                    var css = window.getComputedStyle(element);
                    if (css.display === 'none') {
                        return true;
                    }
                    else if (element.parentElement) {
                        return this.hiddenCheck(element.parentElement);
                    }
                }
                return false;
            };
        DfpRefreshService.decorators = [
            { type: core.Injectable },
        ];
        /** @nocollapse */
        DfpRefreshService.ctorParameters = function () {
            return [
                { type: DfpConfig, decorators: [{ type: core.Optional }, { type: core.Inject, args: [DFP_CONFIG,] }] },
                { type: core.Injector },
                { type: ParseDurationService }
            ];
        };
        return DfpRefreshService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var DfpAdDirective = (function () {
        function DfpAdDirective(platformId, elementRef, dfp, dfpIDGenerator, dfpRefresh, config, router$$1) {
            var _this = this;
            this.platformId = platformId;
            this.elementRef = elementRef;
            this.dfp = dfp;
            this.dfpIDGenerator = dfpIDGenerator;
            this.dfpRefresh = dfpRefresh;
            this.config = config;
            this.afterRefresh = new core.EventEmitter();
            this.sizes = [];
            this.responsiveMapping = [];
            this.targetings = [];
            this.exclusions = [];
            this.scripts = [];
            if (common.isPlatformBrowser(this.platformId)) {
                this.dfpRefresh.refreshEvent.subscribe(function (slot) {
                    if (slot === _this.slot) {
                        _this.afterRefresh.emit({ type: 'refresh', slot: slot });
                    }
                });
                if (router$$1) {
                    this.onSameNavigation = router$$1.events.pipe(operators.filter(function (event) { return event instanceof router.NavigationEnd; }))
                        .subscribe(function (event) {
                        if (_this.slot && !_this.refresh && _this.config.onSameNavigation === 'refresh') {
                            _this.refreshContent.call(_this);
                        }
                    });
                }
            }
        }
        /**
         * @return {?}
         */
        DfpAdDirective.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
                if (common.isPlatformBrowser(this.platformId)) {
                    this.dfpIDGenerator.dfpIDGenerator(this.elementRef.nativeElement);
                }
            };
        /**
         * @return {?}
         */
        DfpAdDirective.prototype.ngAfterViewInit = /**
         * @return {?}
         */
            function () {
                var _this = this;
                if (common.isPlatformBrowser(this.platformId)) {
                    this.dfp.defineTask(function () {
                        _this.defineSlot();
                    });
                }
            };
        /**
         * @return {?}
         */
        DfpAdDirective.prototype.ngOnDestroy = /**
         * @return {?}
         */
            function () {
                if (this.slot) {
                    googletag.destroySlots([this.slot]);
                }
                if (this.onSameNavigation) {
                    this.onSameNavigation.unsubscribe();
                }
            };
        /**
         * @param {?} slot
         * @return {?}
         */
        DfpAdDirective.prototype.setResponsiveMapping = /**
         * @param {?} slot
         * @return {?}
         */
            function (slot) {
                /** @type {?} */
                var ad = this.getState();
                if (ad.responsiveMapping.length === 0) {
                    return;
                }
                /** @type {?} */
                var sizeMapping = googletag.sizeMapping();
                ad.responsiveMapping.forEach(function (mapping) {
                    sizeMapping.addSize(mapping.viewportSize, mapping.adSizes);
                });
                slot.defineSizeMapping(sizeMapping.build());
            };
        /**
         * @return {?}
         */
        DfpAdDirective.prototype.defineSlot = /**
         * @return {?}
         */
            function () {
                var _this = this;
                /** @type {?} */
                var ad = this.getState();
                /** @type {?} */
                var element = this.elementRef.nativeElement;
                this.slot = googletag.defineSlot(ad.adUnit, ad.sizes, element.id);
                if (this.forceSafeFrame !== undefined && ad.forceSafeFrame === !this.config.forceSafeFrame) {
                    this.slot.setForceSafeFrame(ad.forceSafeFrame);
                }
                if (ad.clickUrl) {
                    this.slot.setClickUrl(ad.clickUrl);
                }
                if (ad.collapseIfEmpty) {
                    this.slot.setCollapseEmptyDiv(true, true);
                }
                if (ad.safeFrameConfig) {
                    this.slot.setSafeFrameConfig((JSON.parse(ad.safeFrameConfig)));
                }
                this.slot.renderEnded = function (googleSlotEvent) {
                    _this.afterRefresh.emit({ type: 'renderEnded', slot: _this.slot, data: googleSlotEvent });
                };
                this.setResponsiveMapping(this.slot);
                ad.targetings.forEach(function (targeting) {
                    _this.slot.setTargeting(targeting.key, targeting.values);
                });
                ad.exclusions.forEach(function (exclusion) {
                    _this.slot.setCategoryExclusion(exclusion);
                });
                ad.scripts.forEach(function (script) { script(_this.slot); });
                if (this.config.enableVideoAds) {
                    this.slot.addService(googletag.companionAds());
                }
                this.slot.addService(googletag.pubads());
                this.refreshContent();
            };
        /**
         * @return {?}
         */
        DfpAdDirective.prototype.refreshContent = /**
         * @return {?}
         */
            function () {
                var _this = this;
                this.dfpRefresh.slotRefresh(this.slot, this.refresh, true).then(function (slot) {
                    _this.afterRefresh.emit({ type: 'init', slot: slot });
                });
            };
        /**
         * @return {?}
         */
        DfpAdDirective.prototype.checkValid = /**
         * @return {?}
         */
            function () {
                if (this.sizes.length === 0) {
                    throw new DFPIncompleteError('dfp-ad', 'dfp-size');
                }
                if (!this.adUnit) {
                    throw new DFPIncompleteError('dfp-ad', 'ad-unit', true);
                }
            };
        Object.defineProperty(DfpAdDirective.prototype, "isHidden", {
            get: /**
             * @return {?}
             */ function () {
                return this.dfpRefresh.hiddenCheck(this.elementRef.nativeElement);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        DfpAdDirective.prototype.getState = /**
         * @return {?}
         */
            function () {
                this.checkValid();
                return Object.freeze({
                    sizes: this.sizes,
                    responsiveMapping: this.responsiveMapping,
                    targetings: this.targetings,
                    exclusions: this.exclusions,
                    adUnit: this.adUnit,
                    forceSafeFrame: this.forceSafeFrame === true,
                    safeFrameConfig: this.safeFrameConfig,
                    clickUrl: this.clickUrl,
                    refresh: this.refresh,
                    scripts: this.scripts,
                    collapseIfEmpty: this.collapseIfEmpty === true
                });
            };
        /**
         * @param {?} size
         * @return {?}
         */
        DfpAdDirective.prototype.addSize = /**
         * @param {?} size
         * @return {?}
         */
            function (size) {
                this.sizes.push(size);
            };
        /**
         * @param {?} mapping
         * @return {?}
         */
        DfpAdDirective.prototype.addResponsiveMapping = /**
         * @param {?} mapping
         * @return {?}
         */
            function (mapping) {
                this.responsiveMapping.push(mapping);
            };
        /**
         * @param {?} targeting
         * @return {?}
         */
        DfpAdDirective.prototype.addTargeting = /**
         * @param {?} targeting
         * @return {?}
         */
            function (targeting) {
                this.targetings.push(targeting);
            };
        /**
         * @param {?} exclusion
         * @return {?}
         */
        DfpAdDirective.prototype.addExclusion = /**
         * @param {?} exclusion
         * @return {?}
         */
            function (exclusion) {
                this.exclusions.push(exclusion);
            };
        /**
         * @param {?} script
         * @return {?}
         */
        DfpAdDirective.prototype.addScript = /**
         * @param {?} script
         * @return {?}
         */
            function (script) {
                this.scripts.push(script);
            };
        DfpAdDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: 'dfp-ad'
                    },] },
        ];
        /** @nocollapse */
        DfpAdDirective.ctorParameters = function () {
            return [
                { type: Object, decorators: [{ type: core.Inject, args: [core.PLATFORM_ID,] }] },
                { type: core.ElementRef },
                { type: DfpService },
                { type: DfpIDGeneratorService },
                { type: DfpRefreshService },
                { type: DfpConfig, decorators: [{ type: core.Inject, args: [DFP_CONFIG,] }] },
                { type: router.Router, decorators: [{ type: core.Optional }] }
            ];
        };
        DfpAdDirective.propDecorators = {
            adUnit: [{ type: core.Input }],
            clickUrl: [{ type: core.Input }],
            forceSafeFrame: [{ type: core.Input }],
            safeFrameConfig: [{ type: core.Input }],
            refresh: [{ type: core.Input }],
            collapseIfEmpty: [{ type: core.Input }],
            afterRefresh: [{ type: core.Output }]
        };
        return DfpAdDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var DfpAdResponsiveDirective = (function () {
        function DfpAdResponsiveDirective(elementRef, ad, dfpRefresh) {
            var _this = this;
            this.elementRef = elementRef;
            this.ad = ad;
            this.dfpRefresh = dfpRefresh;
            this.ad.afterRefresh.subscribe(function (event) {
                _this.slot = event.slot;
            });
        }
        /**
         * @return {?}
         */
        DfpAdResponsiveDirective.prototype.normalizeIframe = /**
         * @return {?}
         */
            function () {
                var _this = this;
                if (this.ad.isHidden) {
                    return false;
                }
                this.iframe = this.iframe || this.getIframe();
                if (!this.iframe) {
                    return false;
                }
                this.iframeWidth = this.iframeWidth || +this.iframe.width;
                /** @type {?} */
                var winWidth = window.innerWidth;
                /** @type {?} */
                var state = this.ad.getState();
                /** @type {?} */
                var width = 0;
                state.sizes.forEach(function (size) {
                    if (size[0] < winWidth) {
                        width = Math.max(width, size[0]);
                    }
                });
                if (state.sizes.length > 1 && width !== this.iframeWidth) {
                    state = this.ad.getState();
                    this.iframeWidth = width;
                    this.iframe.setAttribute('width', width + '');
                    this.dfpRefresh.slotRefresh(this.slot, state.refresh).then(function (slot) {
                        _this.ad.afterRefresh.emit({ type: 'resize', slot: slot });
                        _this.iframe = _this.getIframe();
                    });
                }
            };
        /**
         * @return {?}
         */
        DfpAdResponsiveDirective.prototype.getIframe = /**
         * @return {?}
         */
            function () {
                /** @type {?} */
                var ad = this.elementRef.nativeElement;
                /** @type {?} */
                var iframe = ad.querySelector('iframe');
                if (iframe && +iframe.width > 0) {
                    return iframe;
                }
            };
        DfpAdResponsiveDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: 'dfp-ad[responsive]'
                    },] },
        ];
        /** @nocollapse */
        DfpAdResponsiveDirective.ctorParameters = function () {
            return [
                { type: core.ElementRef },
                { type: DfpAdDirective, decorators: [{ type: core.Inject, args: [core.forwardRef(function () { return DfpAdDirective; }),] }] },
                { type: DfpRefreshService }
            ];
        };
        DfpAdResponsiveDirective.propDecorators = {
            normalizeIframe: [{ type: core.HostListener, args: ['window:resize',] }]
        };
        return DfpAdResponsiveDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var DfpResponsiveDirective = (function () {
        function DfpResponsiveDirective(ad) {
            this.ad = ad;
            this.viewport = [0, 0];
            this.adSizes = [];
        }
        /**
         * @return {?}
         */
        DfpResponsiveDirective.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
                this.ad.addResponsiveMapping(this.getState());
            };
        Object.defineProperty(DfpResponsiveDirective.prototype, "viewWidth", {
            set: /**
             * @param {?} val
             * @return {?}
             */ function (val) {
                if (val > 0) {
                    this.viewport[0] = val;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DfpResponsiveDirective.prototype, "viewHeight", {
            set: /**
             * @param {?} val
             * @return {?}
             */ function (val) {
                if (val > 0) {
                    this.viewport[1] = val;
                }
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @param {?} size
         * @return {?}
         */
        DfpResponsiveDirective.prototype.addSize = /**
         * @param {?} size
         * @return {?}
         */
            function (size) {
                this.adSizes.push(size);
            };
        /**
         * @return {?}
         */
        DfpResponsiveDirective.prototype.getState = /**
         * @return {?}
         */
            function () {
                return Object.freeze({
                    viewportSize: this.viewport,
                    adSizes: this.adSizes
                });
            };
        DfpResponsiveDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: 'dfp-responsive'
                    },] },
        ];
        /** @nocollapse */
        DfpResponsiveDirective.ctorParameters = function () {
            return [
                { type: DfpAdDirective, decorators: [{ type: core.Inject, args: [core.forwardRef(function () { return DfpAdDirective; }),] }] }
            ];
        };
        DfpResponsiveDirective.propDecorators = {
            viewport: [{ type: core.Input }],
            adSizes: [{ type: core.Input }],
            viewWidth: [{ type: core.Input }],
            viewHeight: [{ type: core.Input }]
        };
        return DfpResponsiveDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var DfpSizeDirective = (function () {
        function DfpSizeDirective(elementRef, ad, resp) {
            this.elementRef = elementRef;
            this.ad = ad;
            this.resp = resp;
        }
        /**
         * @return {?}
         */
        DfpSizeDirective.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
                /** @type {?} */
                var target = this.resp || this.ad;
                /** @type {?} */
                var innerText = this.elementRef.nativeElement.innerText;
                if (this.width && this.height) {
                    target.addSize([this.width, this.height]);
                }
                else if (innerText.trim() !== '') {
                    target.addSize(innerText);
                }
            };
        DfpSizeDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: 'dfp-size'
                    },] },
        ];
        /** @nocollapse */
        DfpSizeDirective.ctorParameters = function () {
            return [
                { type: core.ElementRef },
                { type: DfpAdDirective, decorators: [{ type: core.Inject, args: [core.forwardRef(function () { return DfpAdDirective; }),] }] },
                { type: DfpResponsiveDirective, decorators: [{ type: core.Optional }, { type: core.Inject, args: [core.forwardRef(function () { return DfpResponsiveDirective; }),] }] }
            ];
        };
        DfpSizeDirective.propDecorators = {
            width: [{ type: core.Input }],
            height: [{ type: core.Input }]
        };
        return DfpSizeDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var DfpTargetingDirective = (function () {
        function DfpTargetingDirective(ad) {
            this.ad = ad;
            this.values = [];
        }
        Object.defineProperty(DfpTargetingDirective.prototype, "value", {
            set: /**
             * @param {?} val
             * @return {?}
             */ function (val) {
                var _this = this;
                if (val instanceof Array) {
                    val.forEach(function (v) { return _this.addValue(v); });
                }
                else {
                    this.addValue(val);
                }
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        DfpTargetingDirective.prototype.ngAfterContentInit = /**
         * @return {?}
         */
            function () {
                /** @type {?} */
                var targeting = this.getState();
                this.ad.addTargeting(targeting);
            };
        /**
         * @return {?}
         */
        DfpTargetingDirective.prototype.checkValid = /**
         * @return {?}
         */
            function () {
                if (this.key === undefined) {
                    throw new DFPIncompleteError('dfp-targeting', 'key', true);
                }
                if (this.values.length === 0) {
                    throw new DFPIncompleteError('dfp-targeting', 'value', true);
                }
            };
        /**
         * @return {?}
         */
        DfpTargetingDirective.prototype.getState = /**
         * @return {?}
         */
            function () {
                this.checkValid();
                return Object.freeze({
                    key: this.key,
                    values: this.values
                });
            };
        /**
         * @param {?} value
         * @return {?}
         */
        DfpTargetingDirective.prototype.addValue = /**
         * @param {?} value
         * @return {?}
         */
            function (value) {
                if (value && !this.values.find(function (item) { return item === value; })) {
                    this.values.push(value);
                }
            };
        DfpTargetingDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: 'dfp-targeting'
                    },] },
        ];
        /** @nocollapse */
        DfpTargetingDirective.ctorParameters = function () {
            return [
                { type: DfpAdDirective, decorators: [{ type: core.Inject, args: [core.forwardRef(function () { return DfpAdDirective; }),] }] }
            ];
        };
        DfpTargetingDirective.propDecorators = {
            key: [{ type: core.Input }],
            value: [{ type: core.Input }]
        };
        return DfpTargetingDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var DfpExclusionDirective = (function () {
        function DfpExclusionDirective(elementRef, ad) {
            this.elementRef = elementRef;
            this.ad = ad;
        }
        /**
         * @return {?}
         */
        DfpExclusionDirective.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
                this.ad.addExclusion(this.elementRef.nativeElement.innerText);
            };
        DfpExclusionDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: 'dfp-exclusion'
                    },] },
        ];
        /** @nocollapse */
        DfpExclusionDirective.ctorParameters = function () {
            return [
                { type: core.ElementRef },
                { type: DfpAdDirective, decorators: [{ type: core.Inject, args: [core.forwardRef(function () { return DfpAdDirective; }),] }] }
            ];
        };
        return DfpExclusionDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var DfpValueDirective = (function () {
        function DfpValueDirective(elementRef, targeting) {
            this.elementRef = elementRef;
            this.targeting = targeting;
        }
        /**
         * @return {?}
         */
        DfpValueDirective.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
                this.targeting.addValue(this.elementRef.nativeElement.innerText);
            };
        DfpValueDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: 'dfp-value'
                    },] },
        ];
        /** @nocollapse */
        DfpValueDirective.ctorParameters = function () {
            return [
                { type: core.ElementRef },
                { type: DfpTargetingDirective, decorators: [{ type: core.Inject, args: [core.forwardRef(function () { return DfpTargetingDirective; }),] }] }
            ];
        };
        return DfpValueDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var DfpVideoDirective = (function () {
        function DfpVideoDirective(platformId, elementRef, renderer, dfpIDGenerator) {
            this.platformId = platformId;
            this.elementRef = elementRef;
            this.renderer = renderer;
            this.dfpIDGenerator = dfpIDGenerator;
            this.adEvents = new core.EventEmitter();
            this.adsDone = false;
        }
        /**
         * @return {?}
         */
        DfpVideoDirective.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
                var _this = this;
                if (common.isPlatformBrowser(this.platformId)) {
                    /** @type {?} */
                    var el = this.elementRef.nativeElement;
                    this.dfpIDGenerator.dfpIDGenerator(el);
                    this.contentPlayer = el.querySelector('video');
                    this.renderer.setAttribute(this.contentPlayer, 'width', this.width.toString());
                    this.renderer.setAttribute(this.contentPlayer, 'height', this.height.toString());
                    this.adContainer = el.querySelector('.ad-container');
                    if (!this.adContainer) {
                        this.adContainer = this.renderer.createElement('div');
                        this.renderer.addClass(this.adContainer, 'ad-container');
                        this.renderer.appendChild(el, this.adContainer);
                    }
                    // ima setup
                    ima.loadImaSdk().then(function () { return _this.setUpIMA(); });
                    // simple control
                    this.adActions.subscribe(function (act) {
                        switch (act) {
                            case 'play':
                                _this.play();
                                break;
                            case 'pause':
                                _this.pause();
                                break;
                            case 'resume':
                                _this.resume();
                                break;
                        }
                    });
                }
            };
        /**
         * @return {?}
         */
        DfpVideoDirective.prototype.play = /**
         * @return {?}
         */
            function () {
                if (!this.adsDone) {
                    this.initialUserAction();
                    this.loadAds();
                    this.adsDone = true;
                }
            };
        /**
         * @return {?}
         */
        DfpVideoDirective.prototype.pause = /**
         * @return {?}
         */
            function () {
                if (this.adsManager) {
                    this.adsManager.pause();
                }
            };
        /**
         * @return {?}
         */
        DfpVideoDirective.prototype.resume = /**
         * @return {?}
         */
            function () {
                if (this.adsManager) {
                    this.adsManager.resume();
                }
            };
        /**
         * @return {?}
         */
        DfpVideoDirective.prototype.setUpIMA = /**
         * @return {?}
         */
            function () {
                var _this = this;
                // Create the ad display container.
                this.adDisplayContainer = new google.ima.AdDisplayContainer(this.adContainer, this.contentPlayer);
                // Create ads loader.
                this.adsLoader = new google.ima.AdsLoader(this.adDisplayContainer);
                // Listen and respond to ads loaded and error events.
                this.adsLoader.addEventListener(google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED, function (event) { return _this.onAdsManagerLoaded(event); }, false);
                this.adsLoader.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, function (event) { return _this.onAdError(event); }, false);
                // An event listener to tell the SDK that our content video
                // is completed so the SDK can play any post-roll ads.
                this.contentPlayer.onended = function () {
                    _this.contentEnded();
                };
            };
        /**
         * @return {?}
         */
        DfpVideoDirective.prototype.initialUserAction = /**
         * @return {?}
         */
            function () {
                this.adDisplayContainer.initialize();
                this.contentPlayer.load();
            };
        /**
         * @param {?} adTagUrl
         * @return {?}
         */
        DfpVideoDirective.prototype.requestAds = /**
         * @param {?} adTagUrl
         * @return {?}
         */
            function (adTagUrl) {
                /** @type {?} */
                var adsRequest = new google.ima.AdsRequest();
                adsRequest.adTagUrl = adTagUrl;
                adsRequest.linearAdSlotWidth = this.width;
                adsRequest.linearAdSlotHeight = this.height;
                adsRequest.nonLinearAdSlotWidth = this.width;
                adsRequest.nonLinearAdSlotHeight = this.height;
                this.adsLoader.requestAds(adsRequest);
            };
        /**
         * @return {?}
         */
        DfpVideoDirective.prototype.contentEnded = /**
         * @return {?}
         */
            function () {
                this.contentCompleteCalled = true;
                this.adsLoader.contentComplete();
            };
        /**
         * @param {?} adsManagerLoadedEvent
         * @return {?}
         */
        DfpVideoDirective.prototype.onAdsManagerLoaded = /**
         * @param {?} adsManagerLoadedEvent
         * @return {?}
         */
            function (adsManagerLoadedEvent) {
                /** @type {?} */
                var adsRenderingSettings = new google.ima.AdsRenderingSettings();
                adsRenderingSettings.restoreCustomPlaybackStateOnAdBreakComplete = true;
                this.adsManager = adsManagerLoadedEvent.getAdsManager(this.contentPlayer, adsRenderingSettings);
                this.startAdsManager(this.adsManager);
            };
        /**
         * @param {?} adsManager
         * @return {?}
         */
        DfpVideoDirective.prototype.startAdsManager = /**
         * @param {?} adsManager
         * @return {?}
         */
            function (adsManager) {
                var _this = this;
                // Attach the pause/resume events.
                adsManager.addEventListener(google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED, function () { return _this.onContentPauseRequested(); }, false, this);
                adsManager.addEventListener(google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED, function () { return _this.onContentResumeRequested(); }, false, this);
                // Handle errors.
                adsManager.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, function (event) { return _this.onAdError(event); }, false, this);
                /** @type {?} */
                var events = [google.ima.AdEvent.Type.ALL_ADS_COMPLETED,
                    google.ima.AdEvent.Type.CLICK,
                    google.ima.AdEvent.Type.COMPLETE,
                    google.ima.AdEvent.Type.FIRST_QUARTILE,
                    google.ima.AdEvent.Type.LOADED,
                    google.ima.AdEvent.Type.MIDPOINT,
                    google.ima.AdEvent.Type.PAUSED,
                    google.ima.AdEvent.Type.STARTED,
                    google.ima.AdEvent.Type.THIRD_QUARTILE];
                events.forEach(function (event) {
                    return adsManager.addEventListener(event, function (adEvent) { return _this.onAdEvent(adEvent); }, false);
                });
                adsManager.init(this.width, this.height, google.ima.ViewMode.NORMAL);
                adsManager.start();
            };
        /**
         * @return {?}
         */
        DfpVideoDirective.prototype.onContentPauseRequested = /**
         * @return {?}
         */
            function () {
                this.pauseForAd();
            };
        /**
         * @return {?}
         */
        DfpVideoDirective.prototype.onContentResumeRequested = /**
         * @return {?}
         */
            function () {
                // Without this check the video starts over from the beginning on a
                // post-roll's CONTENT_RESUME_REQUESTED
                if (!this.contentCompleteCalled) {
                    this.resumeAfterAd();
                }
            };
        /**
         * @param {?} adEvent
         * @return {?}
         */
        DfpVideoDirective.prototype.onAdEvent = /**
         * @param {?} adEvent
         * @return {?}
         */
            function (adEvent) {
                if (adEvent.type === google.ima.AdEvent.Type.LOADED) {
                    /** @type {?} */
                    var ad = adEvent.getAd();
                    if (!ad.isLinear()) {
                        this.onContentResumeRequested();
                    }
                }
                this.adEvents.emit(adEvent);
            };
        /**
         * @param {?} adErrorEvent
         * @return {?}
         */
        DfpVideoDirective.prototype.onAdError = /**
         * @param {?} adErrorEvent
         * @return {?}
         */
            function (adErrorEvent) {
                if (this.adsManager) {
                    this.adsManager.destroy();
                }
                this.resumeAfterAd();
                this.adEvents.emit(adErrorEvent);
            };
        // application functions
        /**
         * @return {?}
         */
        DfpVideoDirective.prototype.resumeAfterAd = /**
         * @return {?}
         */
            function () {
                this.contentPlayer.play();
            };
        /**
         * @return {?}
         */
        DfpVideoDirective.prototype.pauseForAd = /**
         * @return {?}
         */
            function () {
                this.contentPlayer.pause();
            };
        /**
         * @return {?}
         */
        DfpVideoDirective.prototype.loadAds = /**
         * @return {?}
         */
            function () {
                this.requestAds(this.adTag);
            };
        DfpVideoDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: 'dfp-video'
                    },] },
        ];
        /** @nocollapse */
        DfpVideoDirective.ctorParameters = function () {
            return [
                { type: Object, decorators: [{ type: core.Inject, args: [core.PLATFORM_ID,] }] },
                { type: core.ElementRef },
                { type: core.Renderer2 },
                { type: DfpIDGeneratorService }
            ];
        };
        DfpVideoDirective.propDecorators = {
            width: [{ type: core.Input }],
            height: [{ type: core.Input }],
            adTag: [{ type: core.Input }],
            adActions: [{ type: core.Input }],
            adEvents: [{ type: core.Output }]
        };
        return DfpVideoDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var DfpAudiencePixelDirective = (function () {
        function DfpAudiencePixelDirective(platformId, elementRef) {
            this.platformId = platformId;
            this.elementRef = elementRef;
        }
        /**
         * @return {?}
         */
        DfpAudiencePixelDirective.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
                if (common.isPlatformBrowser(this.platformId)) {
                    /** @type {?} */
                    var axel = Math.random();
                    /** @type {?} */
                    var random = axel * 10000000000000;
                    /** @type {?} */
                    var adUnit = '';
                    if (this.adUnit) {
                        adUnit = "dc_iu=" + this.adUnit;
                    }
                    /** @type {?} */
                    var ppid = '';
                    if (this.ppid) {
                        ppid = "ppid=" + this.ppid;
                    }
                    /** @type {?} */
                    var pixel = document.createElement('img');
                    pixel.src = 'https://pubads.g.doubleclick.net/activity;ord=';
                    pixel.src += random + ";dc_seg=" + this.segmentId + ";" + adUnit + ppid;
                    pixel.width = 1;
                    pixel.height = 1;
                    pixel.border = '0';
                    pixel.style.visibility = 'hidden';
                    this.elementRef.nativeElement.append(pixel);
                }
            };
        DfpAudiencePixelDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: 'dfp-audience-pixel'
                    },] },
        ];
        /** @nocollapse */
        DfpAudiencePixelDirective.ctorParameters = function () {
            return [
                { type: Object, decorators: [{ type: core.Inject, args: [core.PLATFORM_ID,] }] },
                { type: core.ElementRef }
            ];
        };
        DfpAudiencePixelDirective.propDecorators = {
            adUnit: [{ type: core.Input }],
            segmentId: [{ type: core.Input }],
            ppid: [{ type: core.Input }]
        };
        return DfpAudiencePixelDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    /** @type {?} */
    var DIRECTIVES = [
        DfpAdDirective, DfpAdResponsiveDirective,
        DfpSizeDirective,
        DfpResponsiveDirective,
        DfpTargetingDirective, DfpExclusionDirective, DfpValueDirective,
        DfpVideoDirective,
        DfpAudiencePixelDirective
    ];
    /** @type {?} */
    var SERVICES = [
        HttpErrorService,
        ParseDurationService,
        ScriptInjectorService,
        DfpService, DfpIDGeneratorService, DfpRefreshService
    ];
    var DfpModule = (function () {
        function DfpModule() {
        }
        /**
         * @param {?=} config
         * @return {?}
         */
        DfpModule.forRoot = /**
         * @param {?=} config
         * @return {?}
         */
            function (config) {
                return {
                    ngModule: DfpModule,
                    providers: __spread((config && config.idleLoad === true ? [IdleService] : []), [
                        { provide: DFP_CONFIG, useValue: config || {} }
                    ])
                };
            };
        DfpModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [],
                        declarations: __spread(DIRECTIVES),
                        providers: __spread(SERVICES),
                        exports: __spread(DIRECTIVES)
                    },] },
        ];
        return DfpModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */

    exports.DfpModule = DfpModule;
    exports.HttpErrorService = HttpErrorService;
    exports.ParseDurationService = ParseDurationService;
    exports.ScriptInjectorService = ScriptInjectorService;
    exports.IdleLoad = IdleService;
    exports.DfpService = DfpService;
    exports.DfpIDGeneratorService = DfpIDGeneratorService;
    exports.DfpRefreshService = DfpRefreshService;
    exports.DfpAdDirective = DfpAdDirective;
    exports.DfpAdResponsiveDirective = DfpAdResponsiveDirective;
    exports.DfpResponsiveDirective = DfpResponsiveDirective;
    exports.DfpSizeDirective = DfpSizeDirective;
    exports.DfpTargetingDirective = DfpTargetingDirective;
    exports.DfpExclusionDirective = DfpExclusionDirective;
    exports.DfpValueDirective = DfpValueDirective;
    exports.DfpVideoDirective = DfpVideoDirective;
    exports.DfpAudiencePixelDirective = DfpAudiencePixelDirective;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWRmcC51bWQuanMubWFwIiwic291cmNlcyI6WyJuZzovL25neC1kZnAvc3JjL3NlcnZpY2UvaHR0cC1lcnJvci5zZXJ2aWNlLnRzIixudWxsLCJuZzovL25neC1kZnAvc3JjL3NlcnZpY2UvcGFyc2UtZHVyYXRpb24uc2VydmljZS50cyIsIm5nOi8vbmd4LWRmcC9zcmMvc2VydmljZS9zY3JpcHQtaW5qZWN0b3Iuc2VydmljZS50cyIsIm5nOi8vbmd4LWRmcC9zcmMvc2VydmljZS9pZGxlLnNlcnZpY2UudHMiLCJuZzovL25neC1kZnAvc3JjL2NsYXNzL2RmcC1lcnJvcnMuY2xhc3MudHMiLCJuZzovL25neC1kZnAvc3JjL2NsYXNzL2RmcC1jb25maWcuY2xhc3MudHMiLCJuZzovL25neC1kZnAvc3JjL3NlcnZpY2UvZGZwLnNlcnZpY2UudHMiLCJuZzovL25neC1kZnAvc3JjL3NlcnZpY2UvZGZwLWlkLWdlbmVyYXRvci5zZXJ2aWNlLnRzIiwibmc6Ly9uZ3gtZGZwL3NyYy9zZXJ2aWNlL2RmcC1yZWZyZXNoLnNlcnZpY2UudHMiLCJuZzovL25neC1kZnAvc3JjL2RpcmVjdGl2ZS9kZnAtYWQuZGlyZWN0aXZlLnRzIiwibmc6Ly9uZ3gtZGZwL3NyYy9kaXJlY3RpdmUvZGZwLWFkLXJlc3BvbnNpdmUuZGlyZWN0aXZlLnRzIiwibmc6Ly9uZ3gtZGZwL3NyYy9kaXJlY3RpdmUvZGZwLXJlc3BvbnNpdmUuZGlyZWN0aXZlLnRzIiwibmc6Ly9uZ3gtZGZwL3NyYy9kaXJlY3RpdmUvZGZwLXNpemUuZGlyZWN0aXZlLnRzIiwibmc6Ly9uZ3gtZGZwL3NyYy9kaXJlY3RpdmUvZGZwLXRhcmdldGluZy5kaXJlY3RpdmUudHMiLCJuZzovL25neC1kZnAvc3JjL2RpcmVjdGl2ZS9kZnAtZXhjbHVzaW9uLmRpcmVjdGl2ZS50cyIsIm5nOi8vbmd4LWRmcC9zcmMvZGlyZWN0aXZlL2RmcC12YWx1ZS5kaXJlY3RpdmUudHMiLCJuZzovL25neC1kZnAvc3JjL2RpcmVjdGl2ZS9kZnAtdmlkZW8uZGlyZWN0aXZlLnRzIiwibmc6Ly9uZ3gtZGZwL3NyYy9kaXJlY3RpdmUvZGZwLWF1ZGllbmNlLXBpeGVsLmRpcmVjdGl2ZS50cyIsIm5nOi8vbmd4LWRmcC9zcmMvZGZwLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBIdHRwRXJyb3JTZXJ2aWNlIHtcclxuXHJcbiAgaHR0cEVycm9yKHJlc3BvbnNlLCBtZXNzYWdlKSB7XHJcbiAgICBjb25zb2xlLmxvZyhgRXJyb3IgKCR7cmVzcG9uc2Uuc3RhdHVzfSkgJHttZXNzYWdlID8gbWVzc2FnZSA6ICcnfWApO1xyXG4gIH1cclxuXHJcbiAgaXNFcnJvckNvZGUgPSBmdW5jdGlvbiAoY29kZSkge1xyXG4gICAgaWYgKHR5cGVvZiBjb2RlID09PSAnbnVtYmVyJykge1xyXG4gICAgICByZXR1cm4gIShjb2RlID49IDIwMCAmJiBjb2RlIDwgMzAwKTtcclxuICAgIH1cclxuICAgIHJldHVybiBjb2RlWzBdICE9PSAnMic7XHJcbiAgfTtcclxuXHJcbn1cclxuIiwiLyohICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2VcclxudGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGVcclxuTGljZW5zZSBhdCBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuXHJcblRISVMgQ09ERSBJUyBQUk9WSURFRCBPTiBBTiAqQVMgSVMqIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTllcclxuS0lORCwgRUlUSEVSIEVYUFJFU1MgT1IgSU1QTElFRCwgSU5DTFVESU5HIFdJVEhPVVQgTElNSVRBVElPTiBBTlkgSU1QTElFRFxyXG5XQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgVElUTEUsIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLFxyXG5NRVJDSEFOVEFCTElUWSBPUiBOT04tSU5GUklOR0VNRU5ULlxyXG5cclxuU2VlIHRoZSBBcGFjaGUgVmVyc2lvbiAyLjAgTGljZW5zZSBmb3Igc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zXHJcbmFuZCBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuLyogZ2xvYmFsIFJlZmxlY3QsIFByb21pc2UgKi9cclxuXHJcbnZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24oZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXh0ZW5kcyhkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgX19hc3NpZ24gPSBmdW5jdGlvbigpIHtcclxuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7XHJcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3Jlc3QocywgZSkge1xyXG4gICAgdmFyIHQgPSB7fTtcclxuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxyXG4gICAgICAgIHRbcF0gPSBzW3BdO1xyXG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIGlmIChlLmluZGV4T2YocFtpXSkgPCAwKVxyXG4gICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcclxuICAgIHJldHVybiB0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xyXG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XHJcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xyXG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcGFyYW0ocGFyYW1JbmRleCwgZGVjb3JhdG9yKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwga2V5KSB7IGRlY29yYXRvcih0YXJnZXQsIGtleSwgcGFyYW1JbmRleCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpIHtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5tZXRhZGF0YSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gUmVmbGVjdC5tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0ZXIodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHJlc3VsdC52YWx1ZSk7IH0pLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZ2VuZXJhdG9yKHRoaXNBcmcsIGJvZHkpIHtcclxuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XHJcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xyXG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcclxuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xyXG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XHJcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxyXG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHBvcnRTdGFyKG0sIGV4cG9ydHMpIHtcclxuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKCFleHBvcnRzLmhhc093blByb3BlcnR5KHApKSBleHBvcnRzW3BdID0gbVtwXTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fdmFsdWVzKG8pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXSwgaSA9IDA7XHJcbiAgICBpZiAobSkgcmV0dXJuIG0uY2FsbChvKTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xyXG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVhZChvLCBuKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XHJcbiAgICBpZiAoIW0pIHJldHVybiBvO1xyXG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XHJcbiAgICBmaW5hbGx5IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZCgpIHtcclxuICAgIGZvciAodmFyIGFyID0gW10sIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIGFyID0gYXIuY29uY2F0KF9fcmVhZChhcmd1bWVudHNbaV0pKTtcclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXQodikge1xyXG4gICAgcmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBfX2F3YWl0ID8gKHRoaXMudiA9IHYsIHRoaXMpIDogbmV3IF9fYXdhaXQodik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jR2VuZXJhdG9yKHRoaXNBcmcsIF9hcmd1bWVudHMsIGdlbmVyYXRvcikge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBnID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pLCBpLCBxID0gW107XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaWYgKGdbbl0pIGlbbl0gPSBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKGEsIGIpIHsgcS5wdXNoKFtuLCB2LCBhLCBiXSkgPiAxIHx8IHJlc3VtZShuLCB2KTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHJlc3VtZShuLCB2KSB7IHRyeSB7IHN0ZXAoZ1tuXSh2KSk7IH0gY2F0Y2ggKGUpIHsgc2V0dGxlKHFbMF1bM10sIGUpOyB9IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAocikgeyByLnZhbHVlIGluc3RhbmNlb2YgX19hd2FpdCA/IFByb21pc2UucmVzb2x2ZShyLnZhbHVlLnYpLnRoZW4oZnVsZmlsbCwgcmVqZWN0KSA6IHNldHRsZShxWzBdWzJdLCByKTsgfVxyXG4gICAgZnVuY3Rpb24gZnVsZmlsbCh2YWx1ZSkgeyByZXN1bWUoXCJuZXh0XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gcmVqZWN0KHZhbHVlKSB7IHJlc3VtZShcInRocm93XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKGYsIHYpIHsgaWYgKGYodiksIHEuc2hpZnQoKSwgcS5sZW5ndGgpIHJlc3VtZShxWzBdWzBdLCBxWzBdWzFdKTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0RlbGVnYXRvcihvKSB7XHJcbiAgICB2YXIgaSwgcDtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiwgZnVuY3Rpb24gKGUpIHsgdGhyb3cgZTsgfSksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4sIGYpIHsgaVtuXSA9IG9bbl0gPyBmdW5jdGlvbiAodikgeyByZXR1cm4gKHAgPSAhcCkgPyB7IHZhbHVlOiBfX2F3YWl0KG9bbl0odikpLCBkb25lOiBuID09PSBcInJldHVyblwiIH0gOiBmID8gZih2KSA6IHY7IH0gOiBmOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jVmFsdWVzKG8pIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgbSA9IG9bU3ltYm9sLmFzeW5jSXRlcmF0b3JdLCBpO1xyXG4gICAgcmV0dXJuIG0gPyBtLmNhbGwobykgOiAobyA9IHR5cGVvZiBfX3ZhbHVlcyA9PT0gXCJmdW5jdGlvblwiID8gX192YWx1ZXMobykgOiBvW1N5bWJvbC5pdGVyYXRvcl0oKSwgaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGkpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlbbl0gPSBvW25dICYmIGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7IHYgPSBvW25dKHYpLCBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCB2LmRvbmUsIHYudmFsdWUpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgZCwgdikgeyBQcm9taXNlLnJlc29sdmUodikudGhlbihmdW5jdGlvbih2KSB7IHJlc29sdmUoeyB2YWx1ZTogdiwgZG9uZTogZCB9KTsgfSwgcmVqZWN0KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tYWtlVGVtcGxhdGVPYmplY3QoY29va2VkLCByYXcpIHtcclxuICAgIGlmIChPYmplY3QuZGVmaW5lUHJvcGVydHkpIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvb2tlZCwgXCJyYXdcIiwgeyB2YWx1ZTogcmF3IH0pOyB9IGVsc2UgeyBjb29rZWQucmF3ID0gcmF3OyB9XHJcbiAgICByZXR1cm4gY29va2VkO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0U3Rhcihtb2QpIHtcclxuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XHJcbiAgICB2YXIgcmVzdWx0ID0ge307XHJcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgcmVzdWx0W2tdID0gbW9kW2tdO1xyXG4gICAgcmVzdWx0LmRlZmF1bHQgPSBtb2Q7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnREZWZhdWx0KG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBkZWZhdWx0OiBtb2QgfTtcclxufVxyXG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5jbGFzcyBERlBEdXJhdGlvbkVycm9yIGV4dGVuZHMgRXJyb3Ige1xyXG4gIGNvbnN0cnVjdG9yKGludGVydmFsKSB7XHJcbiAgICBzdXBlcihgSW52YWxpZCBpbnRlcnZhbDogJyR7aW50ZXJ2YWx9J2xzYCk7XHJcbiAgfVxyXG59XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBQYXJzZUR1cmF0aW9uU2VydmljZSB7XHJcblxyXG4gIGNvbnZlcnRUb01pbGxpc2Vjb25kcyh0aW1lLCB1bml0KSB7XHJcbiAgICBjb25zb2xlLmFzc2VydCgvXihtP3N8bWlufGgpJC9nLnRlc3QodW5pdCkpO1xyXG5cclxuICAgIGlmICh1bml0ID09PSAnbXMnKSB7IHJldHVybiB0aW1lOyB9XHJcbiAgICBpZiAodW5pdCA9PT0gJ3MnKSB7IHJldHVybiB0aW1lICogMTAwMDsgfVxyXG4gICAgaWYgKHVuaXQgPT09ICdtaW4nKSB7IHJldHVybiB0aW1lICogNjAgKiAxMDAwOyB9XHJcblxyXG4gICAgcmV0dXJuIHRpbWUgKiA2MCAqIDYwICogMTAwMDtcclxuICB9XHJcblxyXG4gIGNvbnZlcnQobWF0Y2gpIHtcclxuICAgIGNvbnN0IHRpbWUgPSBwYXJzZUZsb2F0KG1hdGNoWzFdKTtcclxuXHJcbiAgICBpZiAobWF0Y2gubGVuZ3RoID09PSAyKSB7IHJldHVybiB0aW1lOyB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuY29udmVydFRvTWlsbGlzZWNvbmRzKHRpbWUsIG1hdGNoWzJdKTtcclxuICB9XHJcblxyXG4gIHBhcnNlRHVyYXRpb24oaW50ZXJ2YWwpIHtcclxuXHJcbiAgICBpZiAoaW50ZXJ2YWwgPT09IHVuZGVmaW5lZCB8fCBpbnRlcnZhbCA9PT0gbnVsbCkge1xyXG4gICAgICB0aHJvdyBuZXcgREZQRHVyYXRpb25FcnJvcihpbnRlcnZhbCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHR5cGVvZiBpbnRlcnZhbCA9PT0gJ251bWJlcicpIHtcclxuICAgICAgcmV0dXJuIGludGVydmFsO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0eXBlb2YgaW50ZXJ2YWwgIT09ICdzdHJpbmcnKSB7XHJcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYCcke2ludGVydmFsfScgbXVzdCBiZSBvZiBudW1iZXIgb3Igc3RyaW5nIHR5cGVgKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBtYXRjaCA9IGludGVydmFsLm1hdGNoKC8oKD86XFxkKyk/Lj9cXGQrKShtP3N8bWlufGgpPy8pO1xyXG5cclxuICAgIGlmICghbWF0Y2gpIHtcclxuICAgICAgdGhyb3cgbmV3IERGUER1cmF0aW9uRXJyb3IoaW50ZXJ2YWwpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzLmNvbnZlcnQobWF0Y2gpO1xyXG4gIH1cclxuXHJcbn1cclxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgSHR0cEVycm9yU2VydmljZSB9IGZyb20gJy4vaHR0cC1lcnJvci5zZXJ2aWNlJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIFNjcmlwdEluamVjdG9yU2VydmljZSB7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cEVycm9yOiBIdHRwRXJyb3JTZXJ2aWNlKSB7IH1cclxuXHJcbiAgcHJpdmF0ZSBjb21wbGV0ZVVSTCh1cmwpIHtcclxuICAgIGNvbnN0IHNzbCA9IGRvY3VtZW50LmxvY2F0aW9uLnByb3RvY29sID09PSAnaHR0cHM6JztcclxuICAgIHJldHVybiAoc3NsID8gJ2h0dHBzOicgOiAnaHR0cDonKSArIHVybDtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY3JlYXRlU2NyaXB0KHVybCkge1xyXG4gICAgY29uc3Qgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XHJcblxyXG4gICAgc2NyaXB0LmFzeW5jID0gdHJ1ZTtcclxuICAgIHNjcmlwdC50eXBlID0gJ3RleHQvamF2YXNjcmlwdCc7XHJcbiAgICBzY3JpcHQuc3JjID0gdGhpcy5jb21wbGV0ZVVSTCh1cmwpO1xyXG5cclxuICAgIHJldHVybiBzY3JpcHQ7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHByb21pc2VTY3JpcHQoc2NyaXB0LCB1cmwpIHtcclxuICAgIGNvbnN0IHByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIHNjcmlwdC5vbmxvYWQgPSAoKSA9PiB7XHJcbiAgICAgICAgcmVzb2x2ZShzY3JpcHQpO1xyXG4gICAgICB9O1xyXG4gICAgICBzY3JpcHQub25lcnJvciA9ICgpID0+IHtcclxuICAgICAgICByZWplY3Qoe1xyXG4gICAgICAgICAgcGF0aDogdXJsLFxyXG4gICAgICAgICAgbG9hZGVkOiBmYWxzZVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9O1xyXG4gICAgfSk7XHJcblxyXG4gICAgcHJvbWlzZS5jYXRjaChyZXNwb25zZSA9PiB7XHJcbiAgICAgIHRoaXMuaHR0cEVycm9yLmh0dHBFcnJvcih7IHN0YXR1czogNDAwIH0sIGBsb2FkaW5nIHNjcmlwdCBcIiR7dXJsfVwiYCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gcHJvbWlzZTtcclxuICB9XHJcblxyXG4gIGluamVjdFNjcmlwdChzY3JpcHQpIHtcclxuICAgIGNvbnN0IGhlYWQgPSBkb2N1bWVudC5oZWFkIHx8IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2hlYWQnKTtcclxuICAgIGhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcclxuICB9XHJcblxyXG4gIHNjcmlwdEluamVjdG9yKHVybCkge1xyXG4gICAgY29uc3Qgc2NyaXB0ID0gdGhpcy5jcmVhdGVTY3JpcHQodXJsKTtcclxuICAgIHRoaXMuaW5qZWN0U2NyaXB0KHNjcmlwdCk7XHJcbiAgICByZXR1cm4gdGhpcy5wcm9taXNlU2NyaXB0KHNjcmlwdCwgdXJsKTtcclxuICB9XHJcblxyXG59XHJcbiIsImltcG9ydCB7IEluamVjdGFibGUsIE5nWm9uZSwgSW5qZWN0LCBQTEFURk9STV9JRCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBJZGxlU2VydmljZSB7XHJcblxyXG4gIHByaXZhdGUgcmVxdWVzdElkbGVDYWxsYmFjazogYW55O1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIEBJbmplY3QoUExBVEZPUk1fSUQpIHBsYXRmb3JtSWQ6IE9iamVjdCxcclxuICAgIHpvbmU6IE5nWm9uZVxyXG4gICkge1xyXG4gICAgY29uc3Qgd2luOiBhbnkgPSBpc1BsYXRmb3JtQnJvd3NlcihwbGF0Zm9ybUlkKSA/IHdpbmRvdyA6IHt9O1xyXG4gICAgaWYgKHdpbi5yZXF1ZXN0SWRsZUNhbGxiYWNrKSB7XHJcbiAgICAgIHRoaXMucmVxdWVzdElkbGVDYWxsYmFjayA9IChmdW4pID0+IHtcclxuICAgICAgICByZXR1cm4gd2luLnJlcXVlc3RJZGxlQ2FsbGJhY2soZnVuKTtcclxuICAgICAgfTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMucmVxdWVzdElkbGVDYWxsYmFjayA9IChmdW4pID0+IHtcclxuICAgICAgICByZXR1cm4gem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB3aW4uc2V0VGltZW91dChmdW4sIDUwKSk7XHJcbiAgICAgIH07XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXF1ZXN0KGZ1bikge1xyXG4gICAgdGhpcy5yZXF1ZXN0SWRsZUNhbGxiYWNrKGZ1bik7XHJcbiAgfVxyXG5cclxufVxyXG4iLCJcclxuXHJcbmV4cG9ydCBjbGFzcyBERlBJbmNvbXBsZXRlRXJyb3IgZXh0ZW5kcyBFcnJvciB7XHJcbiAgICBjb25zdHJ1Y3RvcihkaXJlY3RpdmVOYW1lLCBtaXNzaW5nTmFtZSwgaXNBdHRyaWJ1dGU/KSB7XHJcbiAgICAgICAgc3VwZXIoYEluY29tcGxldGUgZGVmaW5pdGlvbiBvZiAnJHtkaXJlY3RpdmVOYW1lfSc6IGAgK1xyXG4gICAgICAgICAgICBgTWlzc2luZyAke2lzQXR0cmlidXRlID8gJ2F0dHJpYnV0ZScgOiAnY2hpbGQgZGlyZWN0aXZlJ30gYCArXHJcbiAgICAgICAgICAgIGAnJHttaXNzaW5nTmFtZX0nLmApO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgREZQVHlwZUVycm9yIGV4dGVuZHMgRXJyb3Ige1xyXG4gICAgY29uc3RydWN0b3IoZGlyZWN0aXZlTmFtZSwgYXR0cmlidXRlTmFtZSwgd3JvbmdWYWx1ZSwgZXhwZWN0ZWRUeXBlKSB7XHJcbiAgICAgICAgc3VwZXIoXHJcbiAgICAgICAgICAgIGBXcm9uZyB0eXBlIGZvciBhdHRyaWJ1dGUgJyR7YXR0cmlidXRlTmFtZX0nIG9uIGAgK1xyXG4gICAgICAgICAgICBgZGlyZWN0aXZlICcke2RpcmVjdGl2ZU5hbWV9JzogRXhwZWN0ZWQgJHtleHBlY3RlZFR5cGV9YCArXHJcbiAgICAgICAgICAgIGAsIGdvdCAke3R5cGVvZiB3cm9uZ1ZhbHVlfWBcclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgREZQTWlzc2luZ1BhcmVudEVycm9yIGV4dGVuZHMgRXJyb3Ige1xyXG4gICAgY29uc3RydWN0b3IoZGlyZWN0aXZlTmFtZSwgLi4ucGFyZW50cykge1xyXG4gICAgICAgIGNvbnNvbGUuYXNzZXJ0KHBhcmVudHMgJiYgcGFyZW50cy5sZW5ndGggPiAwKTtcclxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShwYXJlbnRzWzBdKSkge1xyXG4gICAgICAgICAgICBwYXJlbnRzID0gcGFyZW50c1swXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBwYXJlbnRNZXNzYWdlO1xyXG4gICAgICAgIGlmIChwYXJlbnRzLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICAgICAgcGFyZW50cyA9IHBhcmVudHMubWFwKHAgPT4gYCcke3B9J2ApO1xyXG4gICAgICAgICAgICBwYXJlbnRNZXNzYWdlID0gJywgd2hpY2ggbXVzdCBiZSAnO1xyXG4gICAgICAgICAgICBwYXJlbnRNZXNzYWdlICs9IHBhcmVudHMuc2xpY2UoMCwgLTEpLmpvaW4oJywgJyk7XHJcbiAgICAgICAgICAgIHBhcmVudE1lc3NhZ2UgKz0gYCBvciAke3BhcmVudHNbcGFyZW50cy5sZW5ndGggLSAxXX1gO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHBhcmVudE1lc3NhZ2UgPSBgICcke3BhcmVudHNbMF19J2A7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdXBlcihcclxuICAgICAgICAgICAgYEludmFsaWQgdXNlIG9mICcke2RpcmVjdGl2ZU5hbWV9JyBkaXJlY3RpdmUuIGAgK1xyXG4gICAgICAgICAgICBgTWlzc2luZyBwYXJlbnQgZGlyZWN0aXZlJHtwYXJlbnRNZXNzYWdlfS5gXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgeyBJbmplY3Rpb25Ub2tlbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuZXhwb3J0IGNsYXNzIERmcFRhcmdldGluZyB7XHJcbiAgW2tleTogc3RyaW5nXTogQXJyYXk8c3RyaW5nPjtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIERmcENvbmZpZyB7XHJcbiAgaWRsZUxvYWQ/OiBib29sZWFuO1xyXG4gIG9uU2FtZU5hdmlnYXRpb24/OiAncmVmcmVzaCcgfCAnaWdub3JlJztcclxuICBzaW5nbGVSZXF1ZXN0TW9kZT86IGJvb2xlYW47XHJcbiAgZW5hYmxlVmlkZW9BZHM/OiBib29sZWFuO1xyXG4gIHBlcnNvbmFsaXplZEFkcz86IGJvb2xlYW47XHJcbiAgY29sbGFwc2VJZkVtcHR5PzogYm9vbGVhbjtcclxuICBjZW50ZXJpbmc/OiBib29sZWFuO1xyXG4gIGxvY2F0aW9uPzogc3RyaW5nIHwgQXJyYXk8c3RyaW5nPjtcclxuICBwcGlkPzogc3RyaW5nO1xyXG4gIGdsb2JhbFRhcmdldGluZz86IERmcFRhcmdldGluZztcclxuICBmb3JjZVNhZmVGcmFtZT86IGJvb2xlYW47XHJcbiAgc2FmZUZyYW1lQ29uZmlnPzogb2JqZWN0O1xyXG4gIGxvYWRHUFQ/OiBib29sZWFuO1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgREZQX0NPTkZJRyA9IG5ldyBJbmplY3Rpb25Ub2tlbjxEZnBDb25maWc+KCdkZnBDb25maWcnLCB7XHJcbiAgZmFjdG9yeTogKCkgPT4gbmV3IERmcENvbmZpZygpXHJcbn0pO1xyXG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlLCBPcHRpb25hbCwgUExBVEZPUk1fSUQsIEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcblxyXG5pbXBvcnQgeyBEZnBDb25maWcsIERGUF9DT05GSUcgfSBmcm9tICcuLi9jbGFzcyc7XHJcbmltcG9ydCB7IElkbGVTZXJ2aWNlIH0gZnJvbSAnLi9pZGxlLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBTY3JpcHRJbmplY3RvclNlcnZpY2UgfSBmcm9tICcuL3NjcmlwdC1pbmplY3Rvci5zZXJ2aWNlJztcclxuXHJcbmV4cG9ydCBjb25zdCBHUFRfTElCUkFSWV9VUkwgPSAnLy93d3cuZ29vZ2xldGFnc2VydmljZXMuY29tL3RhZy9qcy9ncHQuanMnO1xyXG5cclxuY2xhc3MgREZQQ29uZmlndXJhdGlvbkVycm9yIGV4dGVuZHMgRXJyb3IgeyB9XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBEZnBTZXJ2aWNlIHtcclxuXHJcbiAgcHJpdmF0ZSBlbmFibGVWaWRlb0FkcyA9IGZhbHNlO1xyXG5cclxuICBwcml2YXRlIHBlcnNvbmFsaXplZEFkcyA9IHRydWU7XHJcblxyXG4gIHByaXZhdGUgY29sbGFwc2VJZkVtcHR5ID0gdHJ1ZTtcclxuXHJcbiAgcHJpdmF0ZSBjZW50ZXJpbmcgPSBmYWxzZTtcclxuXHJcbiAgcHJpdmF0ZSBsb2NhdGlvbiA9IG51bGw7XHJcblxyXG4gIHByaXZhdGUgcHBpZCA9IG51bGw7XHJcblxyXG4gIHByaXZhdGUgZ2xvYmFsVGFyZ2V0aW5nID0gbnVsbDtcclxuXHJcbiAgcHJpdmF0ZSBmb3JjZVNhZmVGcmFtZSA9IGZhbHNlO1xyXG5cclxuICBwcml2YXRlIHNhZmVGcmFtZUNvbmZpZyA9IG51bGw7XHJcblxyXG4gIHByaXZhdGUgbG9hZEdQVCA9IHRydWU7XHJcblxyXG4gIHByaXZhdGUgbG9hZGVkID0gZmFsc2U7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgQEluamVjdChQTEFURk9STV9JRCkgcHJpdmF0ZSBwbGF0Zm9ybUlkOiBPYmplY3QsXHJcbiAgICBAT3B0aW9uYWwoKSBpZGxlTG9hZDogSWRsZVNlcnZpY2UsXHJcbiAgICBASW5qZWN0KERGUF9DT05GSUcpIHByaXZhdGUgY29uZmlnOiBEZnBDb25maWcsXHJcbiAgICBwcml2YXRlIHNjcmlwdEluamVjdG9yOiBTY3JpcHRJbmplY3RvclNlcnZpY2VcclxuICApIHtcclxuICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XHJcbiAgICAgIGNvbnN0IHdpbjogYW55ID0gd2luZG93LFxyXG4gICAgICAgIGdvb2dsZXRhZyA9IHdpbi5nb29nbGV0YWcgfHwge307XHJcblxyXG4gICAgICB0aGlzLmRmcENvbmZpZygpO1xyXG5cclxuICAgICAgZ29vZ2xldGFnLmNtZCA9IGdvb2dsZXRhZy5jbWQgfHwgW107XHJcbiAgICAgIGdvb2dsZXRhZy5jbWQucHVzaCgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5zZXR1cCgpO1xyXG4gICAgICB9KTtcclxuICAgICAgd2luLmdvb2dsZXRhZyA9IGdvb2dsZXRhZztcclxuXHJcbiAgICAgIGlmICh0aGlzLmxvYWRHUFQpIHtcclxuICAgICAgICBjb25zdCBsb2FkU2NyaXB0ID0gKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5zY3JpcHRJbmplY3Rvci5zY3JpcHRJbmplY3RvcihHUFRfTElCUkFSWV9VUkwpLnRoZW4oKHNjcmlwdCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRlZCA9IHRydWU7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIGlmIChpZGxlTG9hZCkge1xyXG4gICAgICAgICAgaWRsZUxvYWQucmVxdWVzdChsb2FkU2NyaXB0KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgbG9hZFNjcmlwdCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBkZnBDb25maWcoKSB7XHJcbiAgICBmb3IgKGNvbnN0IGtleSBpbiB0aGlzLmNvbmZpZykge1xyXG4gICAgICBpZiAodGhpcy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XHJcbiAgICAgICAgdGhpc1trZXldID0gdGhpcy5jb25maWdba2V5XTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBhZGRTYWZlRnJhbWVDb25maWcocHViYWRzKSB7XHJcbiAgICBpZiAoIXRoaXMuc2FmZUZyYW1lQ29uZmlnKSB7IHJldHVybiBmYWxzZTsgfVxyXG4gICAgaWYgKHR5cGVvZiB0aGlzLnNhZmVGcmFtZUNvbmZpZyAhPT0gJ29iamVjdCcpIHtcclxuICAgICAgdGhyb3cgbmV3IERGUENvbmZpZ3VyYXRpb25FcnJvcignRnJhbWVDb25maWcgbXVzdCBiZSBhbiBvYmplY3QnKTtcclxuICAgIH1cclxuICAgIHB1YmFkcy5zZXRTYWZlRnJhbWVDb25maWcodGhpcy5zYWZlRnJhbWVDb25maWcpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBhZGRUYXJnZXRpbmcocHViYWRzKSB7XHJcbiAgICBpZiAoIXRoaXMuZ2xvYmFsVGFyZ2V0aW5nKSB7IHJldHVybiBmYWxzZTsgfVxyXG4gICAgaWYgKHR5cGVvZiB0aGlzLmdsb2JhbFRhcmdldGluZyAhPT0gJ29iamVjdCcpIHtcclxuICAgICAgdGhyb3cgbmV3IERGUENvbmZpZ3VyYXRpb25FcnJvcignVGFyZ2V0aW5nIG11c3QgYmUgYW4gb2JqZWN0Jyk7XHJcbiAgICB9XHJcblxyXG4gICAgZm9yIChjb25zdCBrZXkgaW4gdGhpcy5nbG9iYWxUYXJnZXRpbmcpIHtcclxuICAgICAgaWYgKHRoaXMuZ2xvYmFsVGFyZ2V0aW5nLmhhc093blByb3BlcnR5KGtleSkpIHtcclxuICAgICAgICBwdWJhZHMuc2V0VGFyZ2V0aW5nKGtleSwgdGhpcy5nbG9iYWxUYXJnZXRpbmdba2V5XSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgYWRkTG9jYXRpb24ocHViYWRzKSB7XHJcbiAgICBpZiAoIXRoaXMubG9jYXRpb24pIHsgcmV0dXJuIGZhbHNlOyB9XHJcblxyXG4gICAgaWYgKHR5cGVvZiB0aGlzLmxvY2F0aW9uID09PSAnc3RyaW5nJykge1xyXG4gICAgICBwdWJhZHMuc2V0TG9jYXRpb24odGhpcy5sb2NhdGlvbik7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkodGhpcy5sb2NhdGlvbikpIHtcclxuICAgICAgdGhyb3cgbmV3IERGUENvbmZpZ3VyYXRpb25FcnJvcignTG9jYXRpb24gbXVzdCBiZSBhbiAnICtcclxuICAgICAgICAnYXJyYXkgb3Igc3RyaW5nJyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHViYWRzLnNldExvY2F0aW9uLmFwcGx5KHB1YmFkcywgdGhpcy5sb2NhdGlvbik7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGFkZFBQSUQocHViYWRzKSB7XHJcbiAgICBpZiAoIXRoaXMucHBpZCkgeyByZXR1cm4gZmFsc2U7IH1cclxuICAgIGlmICh0eXBlb2YgdGhpcy5wcGlkICE9PSAnc3RyaW5nJykge1xyXG4gICAgICB0aHJvdyBuZXcgREZQQ29uZmlndXJhdGlvbkVycm9yKCdQUElEIG11c3QgYmUgYSBzdHJpbmcnKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJhZHMuc2V0UHVibGlzaGVyUHJvdmlkZWRJZCh0aGlzLnBwaWQpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBzZXR1cCgpIHtcclxuICAgIGNvbnN0IHdpbjogYW55ID0gd2luZG93LFxyXG4gICAgICBnb29nbGV0YWcgPSB3aW4uZ29vZ2xldGFnLFxyXG4gICAgICBwdWJhZHMgPSBnb29nbGV0YWcucHViYWRzKCk7XHJcblxyXG4gICAgaWYgKHRoaXMuZW5hYmxlVmlkZW9BZHMpIHtcclxuICAgICAgcHViYWRzLmVuYWJsZVZpZGVvQWRzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gcGVyc29uYWxpemVkQWRzIGlzIGRlZmF1bHRcclxuICAgIGlmICh0aGlzLnBlcnNvbmFsaXplZEFkcyA9PT0gZmFsc2UpIHtcclxuICAgICAgcHViYWRzLnNldFJlcXVlc3ROb25QZXJzb25hbGl6ZWRBZHMoMSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuY29sbGFwc2VJZkVtcHR5KSB7XHJcbiAgICAgIHB1YmFkcy5jb2xsYXBzZUVtcHR5RGl2cygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFdlIGFsd2F5cyByZWZyZXNoIG91cnNlbHZlc1xyXG4gICAgcHViYWRzLmRpc2FibGVJbml0aWFsTG9hZCgpO1xyXG5cclxuICAgIHB1YmFkcy5zZXRGb3JjZVNhZmVGcmFtZSh0aGlzLmZvcmNlU2FmZUZyYW1lKTtcclxuICAgIHB1YmFkcy5zZXRDZW50ZXJpbmcodGhpcy5jZW50ZXJpbmcpO1xyXG5cclxuICAgIHRoaXMuYWRkTG9jYXRpb24ocHViYWRzKTtcclxuICAgIHRoaXMuYWRkUFBJRChwdWJhZHMpO1xyXG4gICAgdGhpcy5hZGRUYXJnZXRpbmcocHViYWRzKTtcclxuICAgIHRoaXMuYWRkU2FmZUZyYW1lQ29uZmlnKHB1YmFkcyk7XHJcblxyXG4gICAgLy8gcHViYWRzLmVuYWJsZVN5bmNSZW5kZXJpbmcoKTtcclxuICAgIHB1YmFkcy5lbmFibGVBc3luY1JlbmRlcmluZygpO1xyXG5cclxuICAgIGlmICh0aGlzLmNvbmZpZy5zaW5nbGVSZXF1ZXN0TW9kZSAhPT0gdHJ1ZSkge1xyXG4gICAgICBpZiAodGhpcy5jb25maWcuZW5hYmxlVmlkZW9BZHMpIHtcclxuICAgICAgICBwdWJhZHMuZW5hYmxlVmlkZW9BZHMoKTtcclxuICAgICAgfVxyXG4gICAgICBnb29nbGV0YWcuZW5hYmxlU2VydmljZXMoKTtcclxuICAgIH1cclxuXHJcbiAgfVxyXG5cclxuICBoYXNMb2FkZWQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5sb2FkZWQ7XHJcbiAgfVxyXG5cclxuICBkZWZpbmVUYXNrKHRhc2spIHtcclxuICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XHJcbiAgICAgIGNvbnN0IHdpbjogYW55ID0gd2luZG93LFxyXG4gICAgICAgIGdvb2dsZXRhZyA9IHdpbi5nb29nbGV0YWc7XHJcbiAgICAgIGdvb2dsZXRhZy5jbWQucHVzaCh0YXNrKTtcclxuICAgIH1cclxuICB9XHJcblxyXG59XHJcbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIERmcElER2VuZXJhdG9yU2VydmljZSB7XHJcblxyXG4gIHByaXZhdGUgZ2VuZXJhdGVkSURzID0ge307XHJcblxyXG4gIGdlbmVyYXRlSUQoKSB7XHJcbiAgICBsZXQgaWQgPSBudWxsO1xyXG5cclxuICAgIGRvIHtcclxuICAgICAgY29uc3QgbnVtYmVyID0gTWF0aC5yYW5kb20oKS50b1N0cmluZygpLnNsaWNlKDIpO1xyXG4gICAgICBpZCA9ICdncHQtYWQtJyArIG51bWJlcjtcclxuICAgIH0gd2hpbGUgKGlkIGluIHRoaXMuZ2VuZXJhdGVkSURzKTtcclxuXHJcbiAgICB0aGlzLmdlbmVyYXRlZElEc1tpZF0gPSB0cnVlO1xyXG5cclxuICAgIHJldHVybiBpZDtcclxuICB9XHJcblxyXG4gIGRmcElER2VuZXJhdG9yKGVsZW1lbnQpIHtcclxuICAgIGlmIChlbGVtZW50ICYmIGVsZW1lbnQuaWQgJiYgIShlbGVtZW50LmlkIGluIHRoaXMuZ2VuZXJhdGVkSURzKSkge1xyXG4gICAgICByZXR1cm4gZWxlbWVudC5pZDtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBpZCA9IHRoaXMuZ2VuZXJhdGVJRCgpO1xyXG4gICAgaWYgKGVsZW1lbnQpIHsgZWxlbWVudC5pZCA9IGlkOyB9XHJcblxyXG4gICAgcmV0dXJuIGlkO1xyXG4gIH1cclxuXHJcbiAgaXNUYWtlbihpZCkge1xyXG4gICAgcmV0dXJuIGlkIGluIHRoaXMuZ2VuZXJhdGVkSURzO1xyXG4gIH1cclxuXHJcbiAgaXNVbmlxdWUoaWQpIHtcclxuICAgIHJldHVybiAhdGhpcy5pc1Rha2VuKGlkKTtcclxuICB9XHJcblxyXG59XHJcbiIsImltcG9ydCB7IEluamVjdGFibGUsIEV2ZW50RW1pdHRlciwgT3B0aW9uYWwsIEluamVjdG9yLCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5cclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uLCB0aW1lciwgZnJvbSB9IGZyb20gJ3J4anMnO1xyXG5cclxuaW1wb3J0IHsgRGZwQ29uZmlnLCBERlBfQ09ORklHIH0gZnJvbSAnLi4vY2xhc3MnO1xyXG5pbXBvcnQgeyBQYXJzZUR1cmF0aW9uU2VydmljZSB9IGZyb20gJy4vcGFyc2UtZHVyYXRpb24uc2VydmljZSc7XHJcblxyXG5jbGFzcyBERlBSZWZyZXNoRXJyb3IgZXh0ZW5kcyBFcnJvciB7IH1cclxuXHJcbmRlY2xhcmUgdmFyIGdvb2dsZXRhZztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIERmcFJlZnJlc2hTZXJ2aWNlIHtcclxuXHJcbiAgcmVmcmVzaEV2ZW50OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICBwcml2YXRlIHJlZnJlc2hTbG90cyA9IFtdO1xyXG4gIHByaXZhdGUgc2luZ2xlUmVxdWVzdDogU3Vic2NyaXB0aW9uO1xyXG4gIHByaXZhdGUgaW50ZXJ2YWxzID0ge307XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdChERlBfQ09ORklHKVxyXG4gICAgcHJpdmF0ZSBjb25maWc6IERmcENvbmZpZyxcclxuICAgIHByaXZhdGUgaW5qZWN0OiBJbmplY3RvcixcclxuICAgIHByaXZhdGUgcGFyc2VEdXJhdGlvbjogUGFyc2VEdXJhdGlvblNlcnZpY2VcclxuICApIHsgfVxyXG5cclxuICBzbG90UmVmcmVzaChzbG90LCByZWZyZXNoSW50ZXJ2YWw/LCBpbml0UmVmcmVzaCA9IGZhbHNlKSB7XHJcbiAgICBjb25zdCBkZWZlcnJlZDogUHJvbWlzZTxhbnk+ID0gZnJvbShbc2xvdF0pLnRvUHJvbWlzZSgpLFxyXG4gICAgICB0YXNrID0geyBzbG90OiBzbG90LCBkZWZlcnJlZDogZGVmZXJyZWQgfTtcclxuXHJcbiAgICBkZWZlcnJlZC50aGVuKCgpID0+IHtcclxuICAgICAgaWYgKHRoaXMuaGFzU2xvdEludGVydmFsKHNsb3QpKSB7XHJcbiAgICAgICAgdGhpcy5jYW5jZWxJbnRlcnZhbChzbG90KTtcclxuICAgICAgfVxyXG4gICAgICBpZiAocmVmcmVzaEludGVydmFsKSB7XHJcbiAgICAgICAgdGhpcy5hZGRTbG90SW50ZXJ2YWwodGFzaywgcmVmcmVzaEludGVydmFsKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKHRoaXMuY29uZmlnLnNpbmdsZVJlcXVlc3RNb2RlID09PSB0cnVlICYmIGluaXRSZWZyZXNoKSB7XHJcbiAgICAgIC8vIFVzZSBhIHRpbWVyIHRvIGhhbmRsZSByZWZyZXNoIG9mIGEgc2luZ2xlIHJlcXVlc3QgbW9kZVxyXG4gICAgICB0aGlzLnJlZnJlc2hTbG90cy5wdXNoKHNsb3QpO1xyXG4gICAgICBpZiAodGhpcy5zaW5nbGVSZXF1ZXN0ICYmICF0aGlzLnNpbmdsZVJlcXVlc3QuY2xvc2VkKSB7XHJcbiAgICAgICAgdGhpcy5zaW5nbGVSZXF1ZXN0LnVuc3Vic2NyaWJlKCk7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5zaW5nbGVSZXF1ZXN0ID0gdGltZXIoMTAwKS5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHB1YmFkcyA9IGdvb2dsZXRhZy5wdWJhZHMoKTtcclxuICAgICAgICBwdWJhZHMuZW5hYmxlU2luZ2xlUmVxdWVzdCgpO1xyXG4gICAgICAgIGdvb2dsZXRhZy5lbmFibGVTZXJ2aWNlcygpO1xyXG4gICAgICAgIHRoaXMucmVmcmVzaFNsb3RzLmZvckVhY2gocyA9PiB7XHJcbiAgICAgICAgICBnb29nbGV0YWcuZGlzcGxheShzLmdldFNsb3RFbGVtZW50SWQoKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcHViYWRzLnJlZnJlc2godGhpcy5yZWZyZXNoU2xvdHMpO1xyXG4gICAgICAgIHRoaXMucmVmcmVzaFNsb3RzID0gW107XHJcbiAgICAgIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZ29vZ2xldGFnLmRpc3BsYXkoc2xvdC5nZXRTbG90RWxlbWVudElkKCkpO1xyXG4gICAgICB0aGlzLnJlZnJlc2goW3Rhc2tdKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZGVmZXJyZWQ7XHJcbiAgfVxyXG5cclxuICBjYW5jZWxJbnRlcnZhbChzbG90KSB7XHJcbiAgICBpZiAoIXRoaXMuaGFzU2xvdEludGVydmFsKHNsb3QpKSB7XHJcbiAgICAgIHRocm93IG5ldyBERlBSZWZyZXNoRXJyb3IoJ05vIGludGVydmFsIGZvciBnaXZlbiBzbG90Jyk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgaW50ZXJ2YWw6IFN1YnNjcmlwdGlvbiA9IHRoaXMuaW50ZXJ2YWxzW3RoaXMuc2xvdEludGVydmFsS2V5KHNsb3QpXTtcclxuICAgIGludGVydmFsLnVuc3Vic2NyaWJlKCk7XHJcbiAgICBkZWxldGUgdGhpcy5pbnRlcnZhbHNbc2xvdF07XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGhhc1Nsb3RJbnRlcnZhbChzbG90KSB7XHJcbiAgICByZXR1cm4gdGhpcy5zbG90SW50ZXJ2YWxLZXkoc2xvdCkgaW4gdGhpcy5pbnRlcnZhbHM7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHJlZnJlc2godGFza3M/KSB7XHJcbiAgICBpZiAodGFza3MgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICBnb29nbGV0YWcuY21kLnB1c2goKCkgPT4ge1xyXG4gICAgICAgIGdvb2dsZXRhZy5wdWJhZHMoKS5yZWZyZXNoKCk7XHJcbiAgICAgIH0pO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRhc2tzLmxlbmd0aCA9PT0gMCkgeyByZXR1cm4gZmFsc2U7IH1cclxuXHJcbiAgICBnb29nbGV0YWcuY21kLnB1c2goKCkgPT4ge1xyXG4gICAgICBnb29nbGV0YWcucHViYWRzKCkucmVmcmVzaCh0YXNrcy5tYXAodGFzayA9PiB0YXNrLnNsb3QpKTtcclxuICAgICAgdGFza3MuZm9yRWFjaCh0YXNrID0+IHtcclxuICAgICAgICBQcm9taXNlLnJlc29sdmUodGFzay5zbG90KTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgYWRkU2xvdEludGVydmFsKHRhc2ssIGludGVydmFsKSB7XHJcbiAgICBjb25zdCBwYXJzZWRJbnRlcnZhbCA9IHRoaXMucGFyc2VEdXJhdGlvbi5wYXJzZUR1cmF0aW9uKGludGVydmFsKTtcclxuICAgIHRoaXMudmFsaWRhdGVJbnRlcnZhbChwYXJzZWRJbnRlcnZhbCwgaW50ZXJ2YWwpO1xyXG5cclxuICAgIGNvbnN0IHJlZnJlc2ggPSB0aW1lcihwYXJzZWRJbnRlcnZhbCwgcGFyc2VkSW50ZXJ2YWwpLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgIGNvbnN0IGRvYyA9IHRoaXMuaW5qZWN0LmdldChET0NVTUVOVCk7XHJcbiAgICAgIGlmICghdGhpcy5oaWRkZW5DaGVjayhkb2MuZ2V0RWxlbWVudEJ5SWQodGFzay5zbG90LmdldFNsb3RFbGVtZW50SWQoKSkpKSB7XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoKFt0YXNrXSk7XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoRXZlbnQuZW1pdCh0YXNrLnNsb3QpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLmludGVydmFsc1t0aGlzLnNsb3RJbnRlcnZhbEtleSh0YXNrLnNsb3QpXSA9IHJlZnJlc2g7XHJcblxyXG4gICAgcmV0dXJuIHJlZnJlc2g7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHNsb3RJbnRlcnZhbEtleShzbG90KSB7XHJcbiAgICByZXR1cm4gc2xvdC5nZXRTbG90SWQoKS5nZXREb21JZCgpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSB2YWxpZGF0ZUludGVydmFsKG1pbGxpc2Vjb25kcywgYmVmb3JlUGFyc2luZykge1xyXG4gICAgaWYgKG1pbGxpc2Vjb25kcyA8IDEwMDApIHtcclxuICAgICAgY29uc29sZS53YXJuKCdDYXJlZnVsOiAke2JlZm9yZVBhcnNpbmd9IGlzIHF1aXRlIGEgbG93IGludGVydmFsIScpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaGlkZGVuQ2hlY2soZWxlbWVudDogRWxlbWVudCkge1xyXG4gICAgaWYgKHR5cGVvZiAod2luZG93KSAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgY29uc3QgY3NzID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWxlbWVudCk7XHJcbiAgICAgIGlmIChjc3MuZGlzcGxheSA9PT0gJ25vbmUnKSB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIH0gZWxzZSBpZiAoZWxlbWVudC5wYXJlbnRFbGVtZW50KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaGlkZGVuQ2hlY2soZWxlbWVudC5wYXJlbnRFbGVtZW50KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQge1xyXG4gIERpcmVjdGl2ZSwgRWxlbWVudFJlZixcclxuICBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsXHJcbiAgT25Jbml0LCBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3ksIEluamVjdCwgUExBVEZPUk1fSUQsIE9wdGlvbmFsXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgUm91dGVyLCBOYXZpZ2F0aW9uRW5kIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuXHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBmaWx0ZXIgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG5pbXBvcnQgeyBEZnBTZXJ2aWNlLCBEZnBJREdlbmVyYXRvclNlcnZpY2UsIERmcFJlZnJlc2hTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZSc7XHJcblxyXG5pbXBvcnQgeyBERlBJbmNvbXBsZXRlRXJyb3IsIEdvb2dsZVNsb3QsIERmcENvbmZpZywgREZQX0NPTkZJRyB9IGZyb20gJy4uL2NsYXNzJztcclxuXHJcbmRlY2xhcmUgdmFyIGdvb2dsZXRhZztcclxuXHJcbmV4cG9ydCBjbGFzcyBEZnBSZWZyZXNoRXZlbnQge1xyXG4gIHR5cGU6IHN0cmluZztcclxuICBzbG90OiBhbnk7XHJcbiAgZGF0YT86IGFueTtcclxufVxyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdkZnAtYWQnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBEZnBBZERpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcclxuXHJcbiAgQElucHV0KCkgYWRVbml0OiBzdHJpbmc7XHJcbiAgQElucHV0KCkgY2xpY2tVcmw6IHN0cmluZztcclxuICBASW5wdXQoKSBmb3JjZVNhZmVGcmFtZTogYm9vbGVhbjtcclxuICBASW5wdXQoKSBzYWZlRnJhbWVDb25maWc6IHN0cmluZztcclxuICBASW5wdXQoKSByZWZyZXNoOiBzdHJpbmc7XHJcbiAgQElucHV0KCkgY29sbGFwc2VJZkVtcHR5OiBib29sZWFuO1xyXG5cclxuICBAT3V0cHV0KCkgYWZ0ZXJSZWZyZXNoOiBFdmVudEVtaXR0ZXI8RGZwUmVmcmVzaEV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgcHJpdmF0ZSBzaXplcyA9IFtdO1xyXG5cclxuICBwcml2YXRlIHJlc3BvbnNpdmVNYXBwaW5nID0gW107XHJcblxyXG4gIHByaXZhdGUgdGFyZ2V0aW5ncyA9IFtdO1xyXG5cclxuICBwcml2YXRlIGV4Y2x1c2lvbnMgPSBbXTtcclxuXHJcbiAgcHJpdmF0ZSBzY3JpcHRzID0gW107XHJcblxyXG4gIHByaXZhdGUgc2xvdDogR29vZ2xlU2xvdDtcclxuXHJcbiAgcHJpdmF0ZSBvblNhbWVOYXZpZ2F0aW9uOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgQEluamVjdChQTEFURk9STV9JRCkgcHJpdmF0ZSBwbGF0Zm9ybUlkOiBPYmplY3QsXHJcbiAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXHJcbiAgICBwcml2YXRlIGRmcDogRGZwU2VydmljZSxcclxuICAgIHByaXZhdGUgZGZwSURHZW5lcmF0b3I6IERmcElER2VuZXJhdG9yU2VydmljZSxcclxuICAgIHByaXZhdGUgZGZwUmVmcmVzaDogRGZwUmVmcmVzaFNlcnZpY2UsXHJcbiAgICBASW5qZWN0KERGUF9DT05GSUcpIHByaXZhdGUgY29uZmlnOiBEZnBDb25maWcsXHJcbiAgICBAT3B0aW9uYWwoKSByb3V0ZXI6IFJvdXRlclxyXG4gICkge1xyXG4gICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcclxuICAgICAgdGhpcy5kZnBSZWZyZXNoLnJlZnJlc2hFdmVudC5zdWJzY3JpYmUoc2xvdCA9PiB7XHJcbiAgICAgICAgaWYgKHNsb3QgPT09IHRoaXMuc2xvdCkge1xyXG4gICAgICAgICAgdGhpcy5hZnRlclJlZnJlc2guZW1pdCh7IHR5cGU6ICdyZWZyZXNoJywgc2xvdDogc2xvdCB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgICBpZiAocm91dGVyKSB7XHJcbiAgICAgICAgdGhpcy5vblNhbWVOYXZpZ2F0aW9uID0gcm91dGVyLmV2ZW50cy5waXBlKGZpbHRlcihldmVudCA9PiBldmVudCBpbnN0YW5jZW9mIE5hdmlnYXRpb25FbmQpKVxyXG4gICAgICAgICAgLnN1YnNjcmliZSgoZXZlbnQ6IE5hdmlnYXRpb25FbmQpID0+IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2xvdCAmJiAhdGhpcy5yZWZyZXNoICYmIHRoaXMuY29uZmlnLm9uU2FtZU5hdmlnYXRpb24gPT09ICdyZWZyZXNoJykge1xyXG4gICAgICAgICAgICAgIHRoaXMucmVmcmVzaENvbnRlbnQuY2FsbCh0aGlzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcclxuICAgICAgdGhpcy5kZnBJREdlbmVyYXRvci5kZnBJREdlbmVyYXRvcih0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZ0FmdGVyVmlld0luaXQoKSB7XHJcbiAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xyXG4gICAgICB0aGlzLmRmcC5kZWZpbmVUYXNrKCgpID0+IHtcclxuICAgICAgICB0aGlzLmRlZmluZVNsb3QoKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIGlmICh0aGlzLnNsb3QpIHtcclxuICAgICAgZ29vZ2xldGFnLmRlc3Ryb3lTbG90cyhbdGhpcy5zbG90XSk7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5vblNhbWVOYXZpZ2F0aW9uKSB7XHJcbiAgICAgIHRoaXMub25TYW1lTmF2aWdhdGlvbi51bnN1YnNjcmliZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBzZXRSZXNwb25zaXZlTWFwcGluZyhzbG90KSB7XHJcbiAgICBjb25zdCBhZCA9IHRoaXMuZ2V0U3RhdGUoKTtcclxuXHJcbiAgICBpZiAoYWQucmVzcG9uc2l2ZU1hcHBpbmcubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBzaXplTWFwcGluZyA9IGdvb2dsZXRhZy5zaXplTWFwcGluZygpO1xyXG5cclxuICAgIGFkLnJlc3BvbnNpdmVNYXBwaW5nLmZvckVhY2gobWFwcGluZyA9PiB7XHJcbiAgICAgIHNpemVNYXBwaW5nLmFkZFNpemUobWFwcGluZy52aWV3cG9ydFNpemUsIG1hcHBpbmcuYWRTaXplcyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBzbG90LmRlZmluZVNpemVNYXBwaW5nKHNpemVNYXBwaW5nLmJ1aWxkKCkpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBkZWZpbmVTbG90KCkge1xyXG4gICAgY29uc3QgYWQgPSB0aGlzLmdldFN0YXRlKCksXHJcbiAgICAgIGVsZW1lbnQgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcclxuXHJcbiAgICB0aGlzLnNsb3QgPSBnb29nbGV0YWcuZGVmaW5lU2xvdChhZC5hZFVuaXQsIGFkLnNpemVzLCBlbGVtZW50LmlkKTtcclxuXHJcbiAgICBpZiAodGhpcy5mb3JjZVNhZmVGcmFtZSAhPT0gdW5kZWZpbmVkICYmIGFkLmZvcmNlU2FmZUZyYW1lID09PSAhdGhpcy5jb25maWcuZm9yY2VTYWZlRnJhbWUpIHtcclxuICAgICAgdGhpcy5zbG90LnNldEZvcmNlU2FmZUZyYW1lKGFkLmZvcmNlU2FmZUZyYW1lKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoYWQuY2xpY2tVcmwpIHtcclxuICAgICAgdGhpcy5zbG90LnNldENsaWNrVXJsKGFkLmNsaWNrVXJsKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoYWQuY29sbGFwc2VJZkVtcHR5KSB7XHJcbiAgICAgIHRoaXMuc2xvdC5zZXRDb2xsYXBzZUVtcHR5RGl2KHRydWUsIHRydWUpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChhZC5zYWZlRnJhbWVDb25maWcpIHtcclxuICAgICAgdGhpcy5zbG90LnNldFNhZmVGcmFtZUNvbmZpZyhcclxuICAgICAgICAoSlNPTi5wYXJzZShhZC5zYWZlRnJhbWVDb25maWcpKVxyXG4gICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuc2xvdC5yZW5kZXJFbmRlZCA9IChnb29nbGVTbG90RXZlbnQ6IElBcmd1bWVudHMpID0+IHtcclxuICAgICAgdGhpcy5hZnRlclJlZnJlc2guZW1pdCh7IHR5cGU6ICdyZW5kZXJFbmRlZCcsIHNsb3Q6IHRoaXMuc2xvdCwgZGF0YTogZ29vZ2xlU2xvdEV2ZW50IH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLnNldFJlc3BvbnNpdmVNYXBwaW5nKHRoaXMuc2xvdCk7XHJcblxyXG4gICAgYWQudGFyZ2V0aW5ncy5mb3JFYWNoKHRhcmdldGluZyA9PiB7XHJcbiAgICAgIHRoaXMuc2xvdC5zZXRUYXJnZXRpbmcodGFyZ2V0aW5nLmtleSwgdGFyZ2V0aW5nLnZhbHVlcyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBhZC5leGNsdXNpb25zLmZvckVhY2goZXhjbHVzaW9uID0+IHtcclxuICAgICAgdGhpcy5zbG90LnNldENhdGVnb3J5RXhjbHVzaW9uKGV4Y2x1c2lvbik7XHJcbiAgICB9KTtcclxuXHJcbiAgICBhZC5zY3JpcHRzLmZvckVhY2goc2NyaXB0ID0+IHsgc2NyaXB0KHRoaXMuc2xvdCk7IH0pO1xyXG5cclxuICAgIGlmICh0aGlzLmNvbmZpZy5lbmFibGVWaWRlb0Fkcykge1xyXG4gICAgICB0aGlzLnNsb3QuYWRkU2VydmljZShnb29nbGV0YWcuY29tcGFuaW9uQWRzKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuc2xvdC5hZGRTZXJ2aWNlKGdvb2dsZXRhZy5wdWJhZHMoKSk7XHJcblxyXG4gICAgdGhpcy5yZWZyZXNoQ29udGVudCgpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSByZWZyZXNoQ29udGVudCgpIHtcclxuICAgIHRoaXMuZGZwUmVmcmVzaC5zbG90UmVmcmVzaCh0aGlzLnNsb3QsIHRoaXMucmVmcmVzaCwgdHJ1ZSkudGhlbihzbG90ID0+IHtcclxuICAgICAgdGhpcy5hZnRlclJlZnJlc2guZW1pdCh7IHR5cGU6ICdpbml0Jywgc2xvdDogc2xvdCB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgY2hlY2tWYWxpZCgpIHtcclxuICAgIGlmICh0aGlzLnNpemVzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICB0aHJvdyBuZXcgREZQSW5jb21wbGV0ZUVycm9yKCdkZnAtYWQnLCAnZGZwLXNpemUnKTtcclxuICAgIH1cclxuICAgIGlmICghdGhpcy5hZFVuaXQpIHtcclxuICAgICAgdGhyb3cgbmV3IERGUEluY29tcGxldGVFcnJvcignZGZwLWFkJywgJ2FkLXVuaXQnLCB0cnVlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldCBpc0hpZGRlbigpIHtcclxuICAgIHJldHVybiB0aGlzLmRmcFJlZnJlc2guaGlkZGVuQ2hlY2sodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpO1xyXG4gIH1cclxuXHJcbiAgZ2V0U3RhdGUoKSB7XHJcbiAgICB0aGlzLmNoZWNrVmFsaWQoKTtcclxuICAgIHJldHVybiBPYmplY3QuZnJlZXplKHtcclxuICAgICAgc2l6ZXM6IHRoaXMuc2l6ZXMsXHJcbiAgICAgIHJlc3BvbnNpdmVNYXBwaW5nOiB0aGlzLnJlc3BvbnNpdmVNYXBwaW5nLFxyXG4gICAgICB0YXJnZXRpbmdzOiB0aGlzLnRhcmdldGluZ3MsXHJcbiAgICAgIGV4Y2x1c2lvbnM6IHRoaXMuZXhjbHVzaW9ucyxcclxuICAgICAgYWRVbml0OiB0aGlzLmFkVW5pdCxcclxuICAgICAgZm9yY2VTYWZlRnJhbWU6IHRoaXMuZm9yY2VTYWZlRnJhbWUgPT09IHRydWUsXHJcbiAgICAgIHNhZmVGcmFtZUNvbmZpZzogdGhpcy5zYWZlRnJhbWVDb25maWcsXHJcbiAgICAgIGNsaWNrVXJsOiB0aGlzLmNsaWNrVXJsLFxyXG4gICAgICByZWZyZXNoOiB0aGlzLnJlZnJlc2gsXHJcbiAgICAgIHNjcmlwdHM6IHRoaXMuc2NyaXB0cyxcclxuICAgICAgY29sbGFwc2VJZkVtcHR5OiB0aGlzLmNvbGxhcHNlSWZFbXB0eSA9PT0gdHJ1ZVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBhZGRTaXplKHNpemUpIHtcclxuICAgIHRoaXMuc2l6ZXMucHVzaChzaXplKTtcclxuICB9XHJcblxyXG4gIGFkZFJlc3BvbnNpdmVNYXBwaW5nKG1hcHBpbmcpIHtcclxuICAgIHRoaXMucmVzcG9uc2l2ZU1hcHBpbmcucHVzaChtYXBwaW5nKTtcclxuICB9XHJcblxyXG4gIGFkZFRhcmdldGluZyh0YXJnZXRpbmcpIHtcclxuICAgIHRoaXMudGFyZ2V0aW5ncy5wdXNoKHRhcmdldGluZyk7XHJcbiAgfVxyXG5cclxuICBhZGRFeGNsdXNpb24oZXhjbHVzaW9uKSB7XHJcbiAgICB0aGlzLmV4Y2x1c2lvbnMucHVzaChleGNsdXNpb24pO1xyXG4gIH1cclxuXHJcbiAgYWRkU2NyaXB0KHNjcmlwdCkge1xyXG4gICAgdGhpcy5zY3JpcHRzLnB1c2goc2NyaXB0KTtcclxuICB9XHJcblxyXG59XHJcbiIsImltcG9ydCB7XHJcbiAgICBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsXHJcbiAgICBJbmplY3QsIGZvcndhcmRSZWYsXHJcbiAgICBIb3N0TGlzdGVuZXJcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IERmcEFkRGlyZWN0aXZlIH0gZnJvbSAnLi9kZnAtYWQuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgRGZwUmVmcmVzaFNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlJztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gICAgc2VsZWN0b3I6ICdkZnAtYWRbcmVzcG9uc2l2ZV0nXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBEZnBBZFJlc3BvbnNpdmVEaXJlY3RpdmUge1xyXG5cclxuICAgIHByaXZhdGUgaWZyYW1lOiBIVE1MSUZyYW1lRWxlbWVudDtcclxuICAgIHByaXZhdGUgaWZyYW1lV2lkdGg6IG51bWJlcjtcclxuICAgIHByaXZhdGUgc2xvdDogYW55O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZixcclxuICAgICAgICBASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gRGZwQWREaXJlY3RpdmUpKVxyXG4gICAgICAgIHByaXZhdGUgYWQ6IERmcEFkRGlyZWN0aXZlLFxyXG4gICAgICAgIHByaXZhdGUgZGZwUmVmcmVzaDogRGZwUmVmcmVzaFNlcnZpY2VcclxuICAgICkge1xyXG4gICAgICAgIHRoaXMuYWQuYWZ0ZXJSZWZyZXNoLnN1YnNjcmliZShldmVudCA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc2xvdCA9IGV2ZW50LnNsb3Q7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgQEhvc3RMaXN0ZW5lcignd2luZG93OnJlc2l6ZScpXHJcbiAgICBub3JtYWxpemVJZnJhbWUoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuYWQuaXNIaWRkZW4pIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmlmcmFtZSA9IHRoaXMuaWZyYW1lIHx8IHRoaXMuZ2V0SWZyYW1lKCk7XHJcbiAgICAgICAgaWYgKCF0aGlzLmlmcmFtZSkgeyByZXR1cm4gZmFsc2U7IH1cclxuXHJcbiAgICAgICAgdGhpcy5pZnJhbWVXaWR0aCA9IHRoaXMuaWZyYW1lV2lkdGggfHwgK3RoaXMuaWZyYW1lLndpZHRoO1xyXG5cclxuICAgICAgICBjb25zdCB3aW5XaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xyXG5cclxuICAgICAgICBsZXQgc3RhdGUgPSB0aGlzLmFkLmdldFN0YXRlKCksXHJcbiAgICAgICAgICAgIHdpZHRoID0gMDtcclxuXHJcbiAgICAgICAgc3RhdGUuc2l6ZXMuZm9yRWFjaChzaXplID0+IHtcclxuICAgICAgICAgICAgaWYgKHNpemVbMF0gPCB3aW5XaWR0aCkge1xyXG4gICAgICAgICAgICAgICAgd2lkdGggPSBNYXRoLm1heCh3aWR0aCwgc2l6ZVswXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKHN0YXRlLnNpemVzLmxlbmd0aCA+IDEgJiYgd2lkdGggIT09IHRoaXMuaWZyYW1lV2lkdGgpIHtcclxuICAgICAgICAgICAgc3RhdGUgPSB0aGlzLmFkLmdldFN0YXRlKCk7XHJcbiAgICAgICAgICAgIHRoaXMuaWZyYW1lV2lkdGggPSB3aWR0aDtcclxuICAgICAgICAgICAgdGhpcy5pZnJhbWUuc2V0QXR0cmlidXRlKCd3aWR0aCcsIHdpZHRoICsgJycpO1xyXG4gICAgICAgICAgICB0aGlzLmRmcFJlZnJlc2guc2xvdFJlZnJlc2godGhpcy5zbG90LCBzdGF0ZS5yZWZyZXNoKS50aGVuKHNsb3QgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hZC5hZnRlclJlZnJlc2guZW1pdCh7IHR5cGU6ICdyZXNpemUnLCBzbG90OiBzbG90IH0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pZnJhbWUgPSB0aGlzLmdldElmcmFtZSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0SWZyYW1lKCkge1xyXG4gICAgICAgIGNvbnN0IGFkOiBFbGVtZW50ID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsXHJcbiAgICAgICAgICAgIGlmcmFtZSA9IGFkLnF1ZXJ5U2VsZWN0b3IoJ2lmcmFtZScpO1xyXG4gICAgICAgIGlmIChpZnJhbWUgJiYgK2lmcmFtZS53aWR0aCA+IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIGlmcmFtZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbmplY3QsIGZvcndhcmRSZWYsIElucHV0LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IERmcEFkRGlyZWN0aXZlIH0gZnJvbSAnLi9kZnAtYWQuZGlyZWN0aXZlJztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnZGZwLXJlc3BvbnNpdmUnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBEZnBSZXNwb25zaXZlRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0IHtcclxuXHJcbiAgQElucHV0KCkgdmlld3BvcnQgPSBbMCwgMF07XHJcbiAgQElucHV0KCkgYWRTaXplcyA9IFtdO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIEBJbmplY3QoZm9yd2FyZFJlZigoKSA9PiBEZnBBZERpcmVjdGl2ZSkpXHJcbiAgICBwcml2YXRlIGFkOiBEZnBBZERpcmVjdGl2ZVxyXG4gICkgeyB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy5hZC5hZGRSZXNwb25zaXZlTWFwcGluZyh0aGlzLmdldFN0YXRlKCkpO1xyXG4gIH1cclxuXHJcbiAgQElucHV0KClcclxuICBzZXQgdmlld1dpZHRoKHZhbDogbnVtYmVyKSB7XHJcbiAgICBpZiAodmFsID4gMCkge1xyXG4gICAgICB0aGlzLnZpZXdwb3J0WzBdID0gdmFsO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgQElucHV0KClcclxuICBzZXQgdmlld0hlaWdodCh2YWw6IG51bWJlcikge1xyXG4gICAgaWYgKHZhbCA+IDApIHtcclxuICAgICAgdGhpcy52aWV3cG9ydFsxXSA9IHZhbDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGFkZFNpemUoc2l6ZSkge1xyXG4gICAgdGhpcy5hZFNpemVzLnB1c2goc2l6ZSk7XHJcbiAgfVxyXG5cclxuICBnZXRTdGF0ZSgpIHtcclxuICAgIHJldHVybiBPYmplY3QuZnJlZXplKHtcclxuICAgICAgdmlld3BvcnRTaXplOiB0aGlzLnZpZXdwb3J0LFxyXG4gICAgICBhZFNpemVzOiB0aGlzLmFkU2l6ZXNcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIElucHV0LCBJbmplY3QsIGZvcndhcmRSZWYsIE9uSW5pdCwgT3B0aW9uYWwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IERmcEFkRGlyZWN0aXZlIH0gZnJvbSAnLi9kZnAtYWQuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgRGZwUmVzcG9uc2l2ZURpcmVjdGl2ZSB9IGZyb20gJy4vZGZwLXJlc3BvbnNpdmUuZGlyZWN0aXZlJztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnZGZwLXNpemUnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBEZnBTaXplRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0IHtcclxuXHJcbiAgQElucHV0KCkgd2lkdGg6IG51bWJlcjtcclxuICBASW5wdXQoKSBoZWlnaHQ6IG51bWJlcjtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXHJcbiAgICBASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gRGZwQWREaXJlY3RpdmUpKVxyXG4gICAgcHJpdmF0ZSBhZDogRGZwQWREaXJlY3RpdmUsXHJcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gRGZwUmVzcG9uc2l2ZURpcmVjdGl2ZSkpXHJcbiAgICBwcml2YXRlIHJlc3A6IERmcFJlc3BvbnNpdmVEaXJlY3RpdmVcclxuICApIHsgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIGNvbnN0IHRhcmdldCA9IHRoaXMucmVzcCB8fCB0aGlzLmFkLFxyXG4gICAgICBpbm5lclRleHQ6IHN0cmluZyA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmlubmVyVGV4dDtcclxuXHJcbiAgICBpZiAodGhpcy53aWR0aCAmJiB0aGlzLmhlaWdodCkge1xyXG4gICAgICB0YXJnZXQuYWRkU2l6ZShbdGhpcy53aWR0aCwgdGhpcy5oZWlnaHRdKTtcclxuICAgIH0gZWxzZSBpZiAoaW5uZXJUZXh0LnRyaW0oKSAhPT0gJycpIHtcclxuICAgICAgdGFyZ2V0LmFkZFNpemUoaW5uZXJUZXh0KTtcclxuICAgIH1cclxuICB9XHJcblxyXG59XHJcbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgQWZ0ZXJDb250ZW50SW5pdCwgSW5wdXQsIEluamVjdCwgZm9yd2FyZFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgREZQSW5jb21wbGV0ZUVycm9yIH0gZnJvbSAnLi4vY2xhc3MnO1xyXG5pbXBvcnQgeyBEZnBBZERpcmVjdGl2ZSB9IGZyb20gJy4vZGZwLWFkLmRpcmVjdGl2ZSc7XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ2RmcC10YXJnZXRpbmcnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBEZnBUYXJnZXRpbmdEaXJlY3RpdmUgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0IHtcclxuXHJcbiAgQElucHV0KCkga2V5OiBzdHJpbmc7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgc2V0IHZhbHVlKHZhbDogc3RyaW5nIHwgQXJyYXk8c3RyaW5nPikge1xyXG4gICAgaWYgKHZhbCBpbnN0YW5jZW9mIEFycmF5KSB7XHJcbiAgICAgIHZhbC5mb3JFYWNoKHYgPT4gdGhpcy5hZGRWYWx1ZSh2KSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmFkZFZhbHVlKHZhbCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHZhbHVlcyA9IFtdO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIEBJbmplY3QoZm9yd2FyZFJlZigoKSA9PiBEZnBBZERpcmVjdGl2ZSkpXHJcbiAgICBwcml2YXRlIGFkOiBEZnBBZERpcmVjdGl2ZVxyXG4gICkgeyB9XHJcblxyXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcclxuICAgIGNvbnN0IHRhcmdldGluZyA9IHRoaXMuZ2V0U3RhdGUoKTtcclxuICAgIHRoaXMuYWQuYWRkVGFyZ2V0aW5nKHRhcmdldGluZyk7XHJcbiAgfVxyXG5cclxuICBjaGVja1ZhbGlkKCkge1xyXG4gICAgaWYgKHRoaXMua2V5ID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhyb3cgbmV3IERGUEluY29tcGxldGVFcnJvcignZGZwLXRhcmdldGluZycsICdrZXknLCB0cnVlKTtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLnZhbHVlcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgdGhyb3cgbmV3IERGUEluY29tcGxldGVFcnJvcignZGZwLXRhcmdldGluZycsICd2YWx1ZScsIHRydWUpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0U3RhdGUoKSB7XHJcbiAgICB0aGlzLmNoZWNrVmFsaWQoKTtcclxuICAgIHJldHVybiBPYmplY3QuZnJlZXplKHtcclxuICAgICAga2V5OiB0aGlzLmtleSxcclxuICAgICAgdmFsdWVzOiB0aGlzLnZhbHVlc1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBhZGRWYWx1ZSh2YWx1ZSkge1xyXG4gICAgaWYgKHZhbHVlICYmICF0aGlzLnZhbHVlcy5maW5kKGl0ZW0gPT4gaXRlbSA9PT0gdmFsdWUpKSB7XHJcbiAgICAgIHRoaXMudmFsdWVzLnB1c2godmFsdWUpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbn1cclxuIiwiaW1wb3J0IHtcclxuICBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsXHJcbiAgSW5qZWN0LCBmb3J3YXJkUmVmLFxyXG4gIE9uSW5pdFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgRGZwQWREaXJlY3RpdmUgfSBmcm9tICcuL2RmcC1hZC5kaXJlY3RpdmUnO1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdkZnAtZXhjbHVzaW9uJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgRGZwRXhjbHVzaW9uRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0IHtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXHJcbiAgICBASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gRGZwQWREaXJlY3RpdmUpKVxyXG4gICAgcHJpdmF0ZSBhZDogRGZwQWREaXJlY3RpdmVcclxuICApIHt9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy5hZC5hZGRFeGNsdXNpb24odGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuaW5uZXJUZXh0KTtcclxuICB9XHJcblxyXG59XHJcbiIsImltcG9ydCB7XHJcbiAgRGlyZWN0aXZlLCBFbGVtZW50UmVmLFxyXG4gIEluamVjdCwgZm9yd2FyZFJlZixcclxuICBPbkluaXRcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IERmcFRhcmdldGluZ0RpcmVjdGl2ZSB9IGZyb20gJy4vZGZwLXRhcmdldGluZy5kaXJlY3RpdmUnO1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdkZnAtdmFsdWUnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBEZnBWYWx1ZURpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxyXG4gICAgQEluamVjdChmb3J3YXJkUmVmKCgpID0+IERmcFRhcmdldGluZ0RpcmVjdGl2ZSkpXHJcbiAgICBwcml2YXRlIHRhcmdldGluZzogRGZwVGFyZ2V0aW5nRGlyZWN0aXZlXHJcbiAgKSB7IH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLnRhcmdldGluZy5hZGRWYWx1ZSh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5pbm5lclRleHQpO1xyXG4gIH1cclxuXHJcbn1cclxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbmplY3QsIFBMQVRGT1JNX0lELCBFbGVtZW50UmVmLCBPbkluaXQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgUmVuZGVyZXIyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuXHJcbmltcG9ydCB7IGxvYWRJbWFTZGsgfSBmcm9tICdAYWx1Z2hhL2ltYSc7XHJcblxyXG5pbXBvcnQgeyBEZnBJREdlbmVyYXRvclNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlJztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnZGZwLXZpZGVvJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgRGZwVmlkZW9EaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQge1xyXG5cclxuICBASW5wdXQoKSB3aWR0aDogbnVtYmVyO1xyXG4gIEBJbnB1dCgpIGhlaWdodDogbnVtYmVyO1xyXG5cclxuICBASW5wdXQoKSBhZFRhZzogc3RyaW5nO1xyXG4gIEBJbnB1dCgpIGFkQWN0aW9uczogRXZlbnRFbWl0dGVyPCdwbGF5JyB8ICdwYXVzZScgfCAncmVzdW1lJz47XHJcblxyXG4gIEBPdXRwdXQoKSBhZEV2ZW50cyA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG5cclxuICBjb250ZW50UGxheWVyOiBIVE1MVmlkZW9FbGVtZW50O1xyXG4gIGFkQ29udGFpbmVyOiBIVE1MRWxlbWVudDtcclxuXHJcbiAgcHJpdmF0ZSBjb250ZW50Q29tcGxldGVDYWxsZWQ6IGJvb2xlYW47XHJcbiAgcHJpdmF0ZSBhZERpc3BsYXlDb250YWluZXI6IGdvb2dsZS5pbWEuQWREaXNwbGF5Q29udGFpbmVyO1xyXG4gIHByaXZhdGUgYWRzTG9hZGVyOiBnb29nbGUuaW1hLkFkc0xvYWRlcjtcclxuICBwcml2YXRlIGFkc01hbmFnZXI6IGdvb2dsZS5pbWEuQWRzTWFuYWdlcjtcclxuICBwcml2YXRlIGFkc0RvbmUgPSBmYWxzZTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBASW5qZWN0KFBMQVRGT1JNX0lEKSBwcml2YXRlIHBsYXRmb3JtSWQ6IE9iamVjdCxcclxuICAgIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZixcclxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcclxuICAgIHByaXZhdGUgZGZwSURHZW5lcmF0b3I6IERmcElER2VuZXJhdG9yU2VydmljZVxyXG4gICkgeyB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcclxuXHJcbiAgICAgIGNvbnN0IGVsID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XHJcblxyXG4gICAgICB0aGlzLmRmcElER2VuZXJhdG9yLmRmcElER2VuZXJhdG9yKGVsKTtcclxuXHJcbiAgICAgIHRoaXMuY29udGVudFBsYXllciA9IGVsLnF1ZXJ5U2VsZWN0b3IoJ3ZpZGVvJyk7XHJcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0QXR0cmlidXRlKHRoaXMuY29udGVudFBsYXllciwgJ3dpZHRoJywgdGhpcy53aWR0aC50b1N0cmluZygpKTtcclxuICAgICAgdGhpcy5yZW5kZXJlci5zZXRBdHRyaWJ1dGUodGhpcy5jb250ZW50UGxheWVyLCAnaGVpZ2h0JywgdGhpcy5oZWlnaHQudG9TdHJpbmcoKSk7XHJcblxyXG4gICAgICB0aGlzLmFkQ29udGFpbmVyID0gZWwucXVlcnlTZWxlY3RvcignLmFkLWNvbnRhaW5lcicpO1xyXG4gICAgICBpZiAoIXRoaXMuYWRDb250YWluZXIpIHtcclxuICAgICAgICB0aGlzLmFkQ29udGFpbmVyID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMuYWRDb250YWluZXIsICdhZC1jb250YWluZXInKTtcclxuICAgICAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKGVsLCB0aGlzLmFkQ29udGFpbmVyKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gaW1hIHNldHVwXHJcbiAgICAgIGxvYWRJbWFTZGsoKS50aGVuKCgpID0+IHRoaXMuc2V0VXBJTUEoKSk7XHJcblxyXG4gICAgICAvLyBzaW1wbGUgY29udHJvbFxyXG4gICAgICB0aGlzLmFkQWN0aW9ucy5zdWJzY3JpYmUoYWN0ID0+IHtcclxuICAgICAgICBzd2l0Y2ggKGFjdCkge1xyXG4gICAgICAgICAgY2FzZSAncGxheSc6XHJcbiAgICAgICAgICAgIHRoaXMucGxheSgpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIGNhc2UgJ3BhdXNlJzpcclxuICAgICAgICAgICAgdGhpcy5wYXVzZSgpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIGNhc2UgJ3Jlc3VtZSc6XHJcbiAgICAgICAgICAgIHRoaXMucmVzdW1lKCk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwbGF5KCkge1xyXG4gICAgaWYgKCF0aGlzLmFkc0RvbmUpIHtcclxuICAgICAgdGhpcy5pbml0aWFsVXNlckFjdGlvbigpO1xyXG4gICAgICB0aGlzLmxvYWRBZHMoKTtcclxuICAgICAgdGhpcy5hZHNEb25lID0gdHJ1ZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHBhdXNlKCkge1xyXG4gICAgaWYgKHRoaXMuYWRzTWFuYWdlcikge1xyXG4gICAgICB0aGlzLmFkc01hbmFnZXIucGF1c2UoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJlc3VtZSgpIHtcclxuICAgIGlmICh0aGlzLmFkc01hbmFnZXIpIHtcclxuICAgICAgdGhpcy5hZHNNYW5hZ2VyLnJlc3VtZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc2V0VXBJTUEoKSB7XHJcbiAgICAvLyBDcmVhdGUgdGhlIGFkIGRpc3BsYXkgY29udGFpbmVyLlxyXG4gICAgdGhpcy5hZERpc3BsYXlDb250YWluZXIgPSBuZXcgZ29vZ2xlLmltYS5BZERpc3BsYXlDb250YWluZXIodGhpcy5hZENvbnRhaW5lciwgdGhpcy5jb250ZW50UGxheWVyKTtcclxuICAgIC8vIENyZWF0ZSBhZHMgbG9hZGVyLlxyXG4gICAgdGhpcy5hZHNMb2FkZXIgPSBuZXcgZ29vZ2xlLmltYS5BZHNMb2FkZXIodGhpcy5hZERpc3BsYXlDb250YWluZXIpO1xyXG4gICAgLy8gTGlzdGVuIGFuZCByZXNwb25kIHRvIGFkcyBsb2FkZWQgYW5kIGVycm9yIGV2ZW50cy5cclxuICAgIHRoaXMuYWRzTG9hZGVyLmFkZEV2ZW50TGlzdGVuZXIoXHJcbiAgICAgIGdvb2dsZS5pbWEuQWRzTWFuYWdlckxvYWRlZEV2ZW50LlR5cGUuQURTX01BTkFHRVJfTE9BREVELFxyXG4gICAgICBldmVudCA9PiB0aGlzLm9uQWRzTWFuYWdlckxvYWRlZChldmVudCksXHJcbiAgICAgIGZhbHNlKTtcclxuICAgIHRoaXMuYWRzTG9hZGVyLmFkZEV2ZW50TGlzdGVuZXIoXHJcbiAgICAgIGdvb2dsZS5pbWEuQWRFcnJvckV2ZW50LlR5cGUuQURfRVJST1IsXHJcbiAgICAgIGV2ZW50ID0+IHRoaXMub25BZEVycm9yKGV2ZW50KSxcclxuICAgICAgZmFsc2UpO1xyXG5cclxuICAgIC8vIEFuIGV2ZW50IGxpc3RlbmVyIHRvIHRlbGwgdGhlIFNESyB0aGF0IG91ciBjb250ZW50IHZpZGVvXHJcbiAgICAvLyBpcyBjb21wbGV0ZWQgc28gdGhlIFNESyBjYW4gcGxheSBhbnkgcG9zdC1yb2xsIGFkcy5cclxuICAgIHRoaXMuY29udGVudFBsYXllci5vbmVuZGVkID0gKCkgPT4ge1xyXG4gICAgICB0aGlzLmNvbnRlbnRFbmRlZCgpO1xyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIGluaXRpYWxVc2VyQWN0aW9uKCkge1xyXG4gICAgdGhpcy5hZERpc3BsYXlDb250YWluZXIuaW5pdGlhbGl6ZSgpO1xyXG4gICAgdGhpcy5jb250ZW50UGxheWVyLmxvYWQoKTtcclxuICB9XHJcblxyXG4gIHJlcXVlc3RBZHMoYWRUYWdVcmwpIHtcclxuICAgIGNvbnN0IGFkc1JlcXVlc3QgPSBuZXcgZ29vZ2xlLmltYS5BZHNSZXF1ZXN0KCk7XHJcbiAgICBhZHNSZXF1ZXN0LmFkVGFnVXJsID0gYWRUYWdVcmw7XHJcbiAgICBhZHNSZXF1ZXN0LmxpbmVhckFkU2xvdFdpZHRoID0gdGhpcy53aWR0aDtcclxuICAgIGFkc1JlcXVlc3QubGluZWFyQWRTbG90SGVpZ2h0ID0gdGhpcy5oZWlnaHQ7XHJcbiAgICBhZHNSZXF1ZXN0Lm5vbkxpbmVhckFkU2xvdFdpZHRoID0gdGhpcy53aWR0aDtcclxuICAgIGFkc1JlcXVlc3Qubm9uTGluZWFyQWRTbG90SGVpZ2h0ID0gdGhpcy5oZWlnaHQ7XHJcbiAgICB0aGlzLmFkc0xvYWRlci5yZXF1ZXN0QWRzKGFkc1JlcXVlc3QpO1xyXG4gIH1cclxuXHJcbiAgY29udGVudEVuZGVkKCkge1xyXG4gICAgdGhpcy5jb250ZW50Q29tcGxldGVDYWxsZWQgPSB0cnVlO1xyXG4gICAgdGhpcy5hZHNMb2FkZXIuY29udGVudENvbXBsZXRlKCk7XHJcbiAgfVxyXG5cclxuICBvbkFkc01hbmFnZXJMb2FkZWQoYWRzTWFuYWdlckxvYWRlZEV2ZW50KSB7XHJcbiAgICBjb25zdCBhZHNSZW5kZXJpbmdTZXR0aW5ncyA9IG5ldyBnb29nbGUuaW1hLkFkc1JlbmRlcmluZ1NldHRpbmdzKCk7XHJcbiAgICBhZHNSZW5kZXJpbmdTZXR0aW5ncy5yZXN0b3JlQ3VzdG9tUGxheWJhY2tTdGF0ZU9uQWRCcmVha0NvbXBsZXRlID0gdHJ1ZTtcclxuICAgIHRoaXMuYWRzTWFuYWdlciA9IGFkc01hbmFnZXJMb2FkZWRFdmVudC5nZXRBZHNNYW5hZ2VyKFxyXG4gICAgICB0aGlzLmNvbnRlbnRQbGF5ZXIsIGFkc1JlbmRlcmluZ1NldHRpbmdzKTtcclxuICAgIHRoaXMuc3RhcnRBZHNNYW5hZ2VyKHRoaXMuYWRzTWFuYWdlcik7XHJcbiAgfVxyXG5cclxuICBzdGFydEFkc01hbmFnZXIoYWRzTWFuYWdlcikge1xyXG4gICAgLy8gQXR0YWNoIHRoZSBwYXVzZS9yZXN1bWUgZXZlbnRzLlxyXG4gICAgYWRzTWFuYWdlci5hZGRFdmVudExpc3RlbmVyKFxyXG4gICAgICBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5DT05URU5UX1BBVVNFX1JFUVVFU1RFRCxcclxuICAgICAgKCkgPT4gdGhpcy5vbkNvbnRlbnRQYXVzZVJlcXVlc3RlZCgpLFxyXG4gICAgICBmYWxzZSxcclxuICAgICAgdGhpcyk7XHJcbiAgICBhZHNNYW5hZ2VyLmFkZEV2ZW50TGlzdGVuZXIoXHJcbiAgICAgIGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLkNPTlRFTlRfUkVTVU1FX1JFUVVFU1RFRCxcclxuICAgICAgKCkgPT4gdGhpcy5vbkNvbnRlbnRSZXN1bWVSZXF1ZXN0ZWQoKSxcclxuICAgICAgZmFsc2UsXHJcbiAgICAgIHRoaXMpO1xyXG4gICAgLy8gSGFuZGxlIGVycm9ycy5cclxuICAgIGFkc01hbmFnZXIuYWRkRXZlbnRMaXN0ZW5lcihcclxuICAgICAgZ29vZ2xlLmltYS5BZEVycm9yRXZlbnQuVHlwZS5BRF9FUlJPUixcclxuICAgICAgZXZlbnQgPT4gdGhpcy5vbkFkRXJyb3IoZXZlbnQpLFxyXG4gICAgICBmYWxzZSxcclxuICAgICAgdGhpcyk7XHJcbiAgICBjb25zdCBldmVudHMgPSBbZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuQUxMX0FEU19DT01QTEVURUQsXHJcbiAgICBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5DTElDSyxcclxuICAgIGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLkNPTVBMRVRFLFxyXG4gICAgZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuRklSU1RfUVVBUlRJTEUsXHJcbiAgICBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5MT0FERUQsXHJcbiAgICBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5NSURQT0lOVCxcclxuICAgIGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLlBBVVNFRCxcclxuICAgIGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLlNUQVJURUQsXHJcbiAgICBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5USElSRF9RVUFSVElMRV07XHJcbiAgICBldmVudHMuZm9yRWFjaChldmVudCA9PlxyXG4gICAgICBhZHNNYW5hZ2VyLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGFkRXZlbnQgPT4gdGhpcy5vbkFkRXZlbnQoYWRFdmVudCksIGZhbHNlKVxyXG4gICAgKTtcclxuXHJcbiAgICBhZHNNYW5hZ2VyLmluaXQoXHJcbiAgICAgIHRoaXMud2lkdGgsXHJcbiAgICAgIHRoaXMuaGVpZ2h0LFxyXG4gICAgICBnb29nbGUuaW1hLlZpZXdNb2RlLk5PUk1BTCk7XHJcblxyXG4gICAgYWRzTWFuYWdlci5zdGFydCgpO1xyXG4gIH1cclxuXHJcbiAgb25Db250ZW50UGF1c2VSZXF1ZXN0ZWQoKSB7XHJcbiAgICB0aGlzLnBhdXNlRm9yQWQoKTtcclxuICB9XHJcblxyXG4gIG9uQ29udGVudFJlc3VtZVJlcXVlc3RlZCgpIHtcclxuICAgIC8vIFdpdGhvdXQgdGhpcyBjaGVjayB0aGUgdmlkZW8gc3RhcnRzIG92ZXIgZnJvbSB0aGUgYmVnaW5uaW5nIG9uIGFcclxuICAgIC8vIHBvc3Qtcm9sbCdzIENPTlRFTlRfUkVTVU1FX1JFUVVFU1RFRFxyXG4gICAgaWYgKCF0aGlzLmNvbnRlbnRDb21wbGV0ZUNhbGxlZCkge1xyXG4gICAgICB0aGlzLnJlc3VtZUFmdGVyQWQoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG9uQWRFdmVudChhZEV2ZW50KSB7XHJcbiAgICBpZiAoYWRFdmVudC50eXBlID09PSBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5MT0FERUQpIHtcclxuICAgICAgY29uc3QgYWQgPSBhZEV2ZW50LmdldEFkKCk7XHJcbiAgICAgIGlmICghYWQuaXNMaW5lYXIoKSkge1xyXG4gICAgICAgIHRoaXMub25Db250ZW50UmVzdW1lUmVxdWVzdGVkKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHRoaXMuYWRFdmVudHMuZW1pdChhZEV2ZW50KTtcclxuICB9XHJcblxyXG4gIG9uQWRFcnJvcihhZEVycm9yRXZlbnQpIHtcclxuICAgIGlmICh0aGlzLmFkc01hbmFnZXIpIHtcclxuICAgICAgdGhpcy5hZHNNYW5hZ2VyLmRlc3Ryb3koKTtcclxuICAgIH1cclxuICAgIHRoaXMucmVzdW1lQWZ0ZXJBZCgpO1xyXG4gICAgdGhpcy5hZEV2ZW50cy5lbWl0KGFkRXJyb3JFdmVudCk7XHJcbiAgfVxyXG5cclxuICAvLyBhcHBsaWNhdGlvbiBmdW5jdGlvbnNcclxuXHJcbiAgcmVzdW1lQWZ0ZXJBZCgpIHtcclxuICAgIHRoaXMuY29udGVudFBsYXllci5wbGF5KCk7XHJcbiAgfVxyXG5cclxuICBwYXVzZUZvckFkKCkge1xyXG4gICAgdGhpcy5jb250ZW50UGxheWVyLnBhdXNlKCk7XHJcbiAgfVxyXG5cclxuICBsb2FkQWRzKCkge1xyXG4gICAgdGhpcy5yZXF1ZXN0QWRzKHRoaXMuYWRUYWcpO1xyXG4gIH1cclxuXHJcbn1cclxuIiwiaW1wb3J0IHtcclxuICBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsXHJcbiAgSW5wdXQsXHJcbiAgT25Jbml0LFxyXG4gIEluamVjdCxcclxuICBQTEFURk9STV9JRFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ2RmcC1hdWRpZW5jZS1waXhlbCdcclxufSlcclxuZXhwb3J0IGNsYXNzIERmcEF1ZGllbmNlUGl4ZWxEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQge1xyXG5cclxuICBASW5wdXQoKSBhZFVuaXQ6IHN0cmluZztcclxuICBASW5wdXQoKSBzZWdtZW50SWQ6IG51bWJlcjtcclxuICBASW5wdXQoKSBwcGlkOiBudW1iZXI7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgQEluamVjdChQTEFURk9STV9JRCkgcHJpdmF0ZSBwbGF0Zm9ybUlkOiBPYmplY3QsXHJcbiAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWZcclxuICApIHsgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XHJcbiAgICAgIGNvbnN0IGF4ZWwgPSBNYXRoLnJhbmRvbSgpLFxyXG4gICAgICAgIHJhbmRvbSA9IGF4ZWwgKiAxMDAwMDAwMDAwMDAwMDtcclxuXHJcbiAgICAgIGxldCBhZFVuaXQgPSAnJztcclxuICAgICAgaWYgKHRoaXMuYWRVbml0KSB7XHJcbiAgICAgICAgYWRVbml0ID0gYGRjX2l1PSR7dGhpcy5hZFVuaXR9YDtcclxuICAgICAgfVxyXG5cclxuICAgICAgbGV0IHBwaWQgPSAnJztcclxuICAgICAgaWYgKHRoaXMucHBpZCkge1xyXG4gICAgICAgIHBwaWQgPSBgcHBpZD0ke3RoaXMucHBpZH1gO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBwaXhlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xyXG5cclxuICAgICAgcGl4ZWwuc3JjID0gJ2h0dHBzOi8vcHViYWRzLmcuZG91YmxlY2xpY2submV0L2FjdGl2aXR5O29yZD0nO1xyXG4gICAgICBwaXhlbC5zcmMgKz0gYCR7cmFuZG9tfTtkY19zZWc9JHt0aGlzLnNlZ21lbnRJZH07JHthZFVuaXR9JHtwcGlkfWA7XHJcblxyXG4gICAgICBwaXhlbC53aWR0aCA9IDE7XHJcbiAgICAgIHBpeGVsLmhlaWdodCA9IDE7XHJcbiAgICAgIHBpeGVsLmJvcmRlciA9ICcwJztcclxuXHJcbiAgICAgIHBpeGVsLnN0eWxlLnZpc2liaWxpdHkgPSAnaGlkZGVuJztcclxuXHJcbiAgICAgIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmFwcGVuZChwaXhlbCk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE1vZHVsZVdpdGhQcm92aWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IERGUF9DT05GSUcsIERmcENvbmZpZyB9IGZyb20gJy4vY2xhc3MnO1xyXG5cclxuaW1wb3J0IHtcclxuICBJZGxlTG9hZCxcclxuICBIdHRwRXJyb3JTZXJ2aWNlLFxyXG4gIFBhcnNlRHVyYXRpb25TZXJ2aWNlLFxyXG4gIFNjcmlwdEluamVjdG9yU2VydmljZSxcclxuICBEZnBTZXJ2aWNlLCBEZnBJREdlbmVyYXRvclNlcnZpY2UsIERmcFJlZnJlc2hTZXJ2aWNlXHJcbn0gZnJvbSAnLi9zZXJ2aWNlJztcclxuXHJcbmltcG9ydCB7XHJcbiAgRGZwQWREaXJlY3RpdmUsIERmcEFkUmVzcG9uc2l2ZURpcmVjdGl2ZSxcclxuICBEZnBTaXplRGlyZWN0aXZlLFxyXG4gIERmcFJlc3BvbnNpdmVEaXJlY3RpdmUsXHJcbiAgRGZwVGFyZ2V0aW5nRGlyZWN0aXZlLCBEZnBFeGNsdXNpb25EaXJlY3RpdmUsIERmcFZhbHVlRGlyZWN0aXZlLFxyXG4gIERmcFZpZGVvRGlyZWN0aXZlLFxyXG4gIERmcEF1ZGllbmNlUGl4ZWxEaXJlY3RpdmVcclxufSBmcm9tICcuL2RpcmVjdGl2ZSc7XHJcblxyXG5jb25zdCBESVJFQ1RJVkVTID0gW1xyXG4gIERmcEFkRGlyZWN0aXZlLCBEZnBBZFJlc3BvbnNpdmVEaXJlY3RpdmUsXHJcbiAgRGZwU2l6ZURpcmVjdGl2ZSxcclxuICBEZnBSZXNwb25zaXZlRGlyZWN0aXZlLFxyXG4gIERmcFRhcmdldGluZ0RpcmVjdGl2ZSwgRGZwRXhjbHVzaW9uRGlyZWN0aXZlLCBEZnBWYWx1ZURpcmVjdGl2ZSxcclxuICBEZnBWaWRlb0RpcmVjdGl2ZSxcclxuICBEZnBBdWRpZW5jZVBpeGVsRGlyZWN0aXZlXHJcbl07XHJcblxyXG5jb25zdCBTRVJWSUNFUyA9IFtcclxuICBIdHRwRXJyb3JTZXJ2aWNlLFxyXG4gIFBhcnNlRHVyYXRpb25TZXJ2aWNlLFxyXG4gIFNjcmlwdEluamVjdG9yU2VydmljZSxcclxuICBEZnBTZXJ2aWNlLCBEZnBJREdlbmVyYXRvclNlcnZpY2UsIERmcFJlZnJlc2hTZXJ2aWNlXHJcbl07XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtcclxuXHJcbiAgXSxcclxuICBkZWNsYXJhdGlvbnM6IFtcclxuICAgIC4uLkRJUkVDVElWRVNcclxuICBdLFxyXG4gIHByb3ZpZGVyczogW1xyXG4gICAgLi4uU0VSVklDRVNcclxuICBdLFxyXG4gIGV4cG9ydHM6IFtcclxuICAgIC4uLkRJUkVDVElWRVNcclxuICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBEZnBNb2R1bGUge1xyXG4gIHN0YXRpYyBmb3JSb290KGNvbmZpZz86IERmcENvbmZpZyk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgbmdNb2R1bGU6IERmcE1vZHVsZSxcclxuICAgICAgcHJvdmlkZXJzOiBbXHJcbiAgICAgICAgLi4uKGNvbmZpZyAmJiBjb25maWcuaWRsZUxvYWQgPT09IHRydWUgPyBbSWRsZUxvYWRdIDogW10pLFxyXG4gICAgICAgIHsgcHJvdmlkZTogREZQX0NPTkZJRywgdXNlVmFsdWU6IGNvbmZpZyB8fCB7fSB9XHJcbiAgICAgIF1cclxuICAgIH07XHJcbiAgfVxyXG59XHJcbiJdLCJuYW1lcyI6WyJJbmplY3RhYmxlIiwidHNsaWJfMS5fX2V4dGVuZHMiLCJpc1BsYXRmb3JtQnJvd3NlciIsIkluamVjdCIsIlBMQVRGT1JNX0lEIiwiTmdab25lIiwiSW5qZWN0aW9uVG9rZW4iLCJPcHRpb25hbCIsIkV2ZW50RW1pdHRlciIsImZyb20iLCJ0aW1lciIsIkRPQ1VNRU5UIiwiSW5qZWN0b3IiLCJyb3V0ZXIiLCJmaWx0ZXIiLCJOYXZpZ2F0aW9uRW5kIiwiRGlyZWN0aXZlIiwiRWxlbWVudFJlZiIsIlJvdXRlciIsIklucHV0IiwiT3V0cHV0IiwiZm9yd2FyZFJlZiIsIkhvc3RMaXN0ZW5lciIsImxvYWRJbWFTZGsiLCJSZW5kZXJlcjIiLCJJZGxlTG9hZCIsIk5nTW9kdWxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7OytCQVNnQixVQUFVLElBQUk7Z0JBQzFCLElBQUksT0FBTyxJQUFJLEtBQUssUUFBUSxFQUFFO29CQUM1QixPQUFPLEVBQUUsSUFBSSxJQUFJLEdBQUcsSUFBSSxJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUM7aUJBQ3JDO2dCQUNELE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQzth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