(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('rxjs'), require('@angular/router'), require('rxjs/operators'), require('@alugha/ima')) :
    typeof define === 'function' && define.amd ? define('ngx-dfp', ['exports', '@angular/core', '@angular/common', 'rxjs', '@angular/router', 'rxjs/operators', '@alugha/ima'], factory) :
    (factory((global['ngx-dfp'] = {}),global.ng.core,global.ng.common,global.rxjs,global.ng.router,global.rxjs.operators,null));
}(this, (function (exports,core,common,rxjs,router,operators,ima) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /** @type {?} */
    var DFP_CONFIG = new core.InjectionToken('dfpConfig');

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var DfpConfig = (function () {
        function DfpConfig() {
        }
        return DfpConfig;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /** @type {?} */
    var DIRECTIVES = [
        DfpAdDirective,
        DfpSizeDirective,
        DfpResponsiveDirective,
        DfpAdResponsiveDirective,
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
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */

    exports.DFP_CONFIG = DFP_CONFIG;
    exports.IdleService = IdleService;
    exports.HttpErrorService = HttpErrorService;
    exports.ParseDurationService = ParseDurationService;
    exports.ScriptInjectorService = ScriptInjectorService;
    exports.DfpService = DfpService;
    exports.DfpIDGeneratorService = DfpIDGeneratorService;
    exports.DfpRefreshService = DfpRefreshService;
    exports.DfpModule = DfpModule;
    exports.DfpAdDirective = DfpAdDirective;
    exports.DfpAdResponsiveDirective = DfpAdResponsiveDirective;
    exports.DfpResponsiveDirective = DfpResponsiveDirective;
    exports.DfpSizeDirective = DfpSizeDirective;
    exports.DfpTargetingDirective = DfpTargetingDirective;
    exports.DfpExclusionDirective = DfpExclusionDirective;
    exports.DfpValueDirective = DfpValueDirective;
    exports.DfpVideoDirective = DfpVideoDirective;
    exports.DfpAudiencePixelDirective = DfpAudiencePixelDirective;
    exports.ɵa = DfpConfig;
    exports.ɵe = DfpAdResponsiveDirective;
    exports.ɵb = DfpAdDirective;
    exports.ɵj = DfpAudiencePixelDirective;
    exports.ɵg = DfpExclusionDirective;
    exports.ɵd = DfpResponsiveDirective;
    exports.ɵc = DfpSizeDirective;
    exports.ɵf = DfpTargetingDirective;
    exports.ɵh = DfpValueDirective;
    exports.ɵi = DfpVideoDirective;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWRmcC51bWQuanMubWFwIiwic291cmNlcyI6WyJuZzovL25neC1kZnAvc2VydmljZS9pbmplY3Rpb25fdG9rZW4udHMiLCJuZzovL25neC1kZnAvc2VydmljZS9pZGxlLnNlcnZpY2UudHMiLCJuZzovL25neC1kZnAvc2VydmljZS9odHRwLWVycm9yLnNlcnZpY2UudHMiLG51bGwsIm5nOi8vbmd4LWRmcC9zZXJ2aWNlL3BhcnNlLWR1cmF0aW9uLnNlcnZpY2UudHMiLCJuZzovL25neC1kZnAvc2VydmljZS9zY3JpcHQtaW5qZWN0b3Iuc2VydmljZS50cyIsIm5nOi8vbmd4LWRmcC9jbGFzcy9kZnAtZXJyb3JzLmNsYXNzLnRzIiwibmc6Ly9uZ3gtZGZwL2NsYXNzL2RmcC1jb25maWcuY2xhc3MudHMiLCJuZzovL25neC1kZnAvc2VydmljZS9kZnAuc2VydmljZS50cyIsIm5nOi8vbmd4LWRmcC9zZXJ2aWNlL2RmcC1pZC1nZW5lcmF0b3Iuc2VydmljZS50cyIsIm5nOi8vbmd4LWRmcC9zZXJ2aWNlL2RmcC1yZWZyZXNoLnNlcnZpY2UudHMiLCJuZzovL25neC1kZnAvZGlyZWN0aXZlL2RmcC1hZC5kaXJlY3RpdmUudHMiLCJuZzovL25neC1kZnAvZGlyZWN0aXZlL2RmcC1hZC1yZXNwb25zaXZlLmRpcmVjdGl2ZS50cyIsIm5nOi8vbmd4LWRmcC9kaXJlY3RpdmUvZGZwLXJlc3BvbnNpdmUuZGlyZWN0aXZlLnRzIiwibmc6Ly9uZ3gtZGZwL2RpcmVjdGl2ZS9kZnAtc2l6ZS5kaXJlY3RpdmUudHMiLCJuZzovL25neC1kZnAvZGlyZWN0aXZlL2RmcC10YXJnZXRpbmcuZGlyZWN0aXZlLnRzIiwibmc6Ly9uZ3gtZGZwL2RpcmVjdGl2ZS9kZnAtZXhjbHVzaW9uLmRpcmVjdGl2ZS50cyIsIm5nOi8vbmd4LWRmcC9kaXJlY3RpdmUvZGZwLXZhbHVlLmRpcmVjdGl2ZS50cyIsIm5nOi8vbmd4LWRmcC9kaXJlY3RpdmUvZGZwLXZpZGVvLmRpcmVjdGl2ZS50cyIsIm5nOi8vbmd4LWRmcC9kaXJlY3RpdmUvZGZwLWF1ZGllbmNlLXBpeGVsLmRpcmVjdGl2ZS50cyIsIm5nOi8vbmd4LWRmcC9kZnAubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGlvblRva2VuIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBEZnBDb25maWcgIH0gZnJvbSAnLi4vY2xhc3MnO1xyXG5cclxuZXhwb3J0IGNvbnN0IERGUF9DT05GSUcgPSBuZXcgSW5qZWN0aW9uVG9rZW48RGZwQ29uZmlnPignZGZwQ29uZmlnJyk7XHJcbiIsImltcG9ydCB7IEluamVjdGFibGUsIE5nWm9uZSwgSW5qZWN0LCBQTEFURk9STV9JRCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBJZGxlU2VydmljZSB7XHJcblxyXG4gIHByaXZhdGUgcmVxdWVzdElkbGVDYWxsYmFjazogYW55O1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIEBJbmplY3QoUExBVEZPUk1fSUQpIHBsYXRmb3JtSWQ6IE9iamVjdCxcclxuICAgIHpvbmU6IE5nWm9uZVxyXG4gICkge1xyXG4gICAgY29uc3Qgd2luOiBhbnkgPSBpc1BsYXRmb3JtQnJvd3NlcihwbGF0Zm9ybUlkKSA/IHdpbmRvdyA6IHt9O1xyXG4gICAgaWYgKHdpbi5yZXF1ZXN0SWRsZUNhbGxiYWNrKSB7XHJcbiAgICAgIHRoaXMucmVxdWVzdElkbGVDYWxsYmFjayA9IChmdW4pID0+IHtcclxuICAgICAgICByZXR1cm4gd2luLnJlcXVlc3RJZGxlQ2FsbGJhY2soZnVuKTtcclxuICAgICAgfTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMucmVxdWVzdElkbGVDYWxsYmFjayA9IChmdW4pID0+IHtcclxuICAgICAgICByZXR1cm4gem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB3aW4uc2V0VGltZW91dChmdW4sIDUwKSk7XHJcbiAgICAgIH07XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXF1ZXN0KGZ1bikge1xyXG4gICAgdGhpcy5yZXF1ZXN0SWRsZUNhbGxiYWNrKGZ1bik7XHJcbiAgfVxyXG5cclxufVxyXG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBIdHRwRXJyb3JTZXJ2aWNlIHtcclxuXHJcbiAgaHR0cEVycm9yKHJlc3BvbnNlLCBtZXNzYWdlKSB7XHJcbiAgICBjb25zb2xlLmxvZyhgRXJyb3IgKCR7cmVzcG9uc2Uuc3RhdHVzfSkgJHttZXNzYWdlID8gbWVzc2FnZSA6ICcnfWApO1xyXG4gIH1cclxuXHJcbiAgaXNFcnJvckNvZGUgPSBmdW5jdGlvbiAoY29kZSkge1xyXG4gICAgaWYgKHR5cGVvZiBjb2RlID09PSAnbnVtYmVyJykge1xyXG4gICAgICByZXR1cm4gIShjb2RlID49IDIwMCAmJiBjb2RlIDwgMzAwKTtcclxuICAgIH1cclxuICAgIHJldHVybiBjb2RlWzBdICE9PSAnMic7XHJcbiAgfTtcclxuXHJcbn1cclxuIiwiLyohICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2VcclxudGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGVcclxuTGljZW5zZSBhdCBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuXHJcblRISVMgQ09ERSBJUyBQUk9WSURFRCBPTiBBTiAqQVMgSVMqIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTllcclxuS0lORCwgRUlUSEVSIEVYUFJFU1MgT1IgSU1QTElFRCwgSU5DTFVESU5HIFdJVEhPVVQgTElNSVRBVElPTiBBTlkgSU1QTElFRFxyXG5XQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgVElUTEUsIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLFxyXG5NRVJDSEFOVEFCTElUWSBPUiBOT04tSU5GUklOR0VNRU5ULlxyXG5cclxuU2VlIHRoZSBBcGFjaGUgVmVyc2lvbiAyLjAgTGljZW5zZSBmb3Igc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zXHJcbmFuZCBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuLyogZ2xvYmFsIFJlZmxlY3QsIFByb21pc2UgKi9cclxuXHJcbnZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24oZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXh0ZW5kcyhkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgX19hc3NpZ24gPSBmdW5jdGlvbigpIHtcclxuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7XHJcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3Jlc3QocywgZSkge1xyXG4gICAgdmFyIHQgPSB7fTtcclxuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxyXG4gICAgICAgIHRbcF0gPSBzW3BdO1xyXG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIGlmIChlLmluZGV4T2YocFtpXSkgPCAwKVxyXG4gICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcclxuICAgIHJldHVybiB0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xyXG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XHJcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xyXG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcGFyYW0ocGFyYW1JbmRleCwgZGVjb3JhdG9yKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwga2V5KSB7IGRlY29yYXRvcih0YXJnZXQsIGtleSwgcGFyYW1JbmRleCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpIHtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5tZXRhZGF0YSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gUmVmbGVjdC5tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0ZXIodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHJlc3VsdC52YWx1ZSk7IH0pLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZ2VuZXJhdG9yKHRoaXNBcmcsIGJvZHkpIHtcclxuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XHJcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xyXG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcclxuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xyXG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XHJcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxyXG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHBvcnRTdGFyKG0sIGV4cG9ydHMpIHtcclxuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKCFleHBvcnRzLmhhc093blByb3BlcnR5KHApKSBleHBvcnRzW3BdID0gbVtwXTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fdmFsdWVzKG8pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXSwgaSA9IDA7XHJcbiAgICBpZiAobSkgcmV0dXJuIG0uY2FsbChvKTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xyXG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVhZChvLCBuKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XHJcbiAgICBpZiAoIW0pIHJldHVybiBvO1xyXG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XHJcbiAgICBmaW5hbGx5IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZCgpIHtcclxuICAgIGZvciAodmFyIGFyID0gW10sIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIGFyID0gYXIuY29uY2F0KF9fcmVhZChhcmd1bWVudHNbaV0pKTtcclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXQodikge1xyXG4gICAgcmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBfX2F3YWl0ID8gKHRoaXMudiA9IHYsIHRoaXMpIDogbmV3IF9fYXdhaXQodik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jR2VuZXJhdG9yKHRoaXNBcmcsIF9hcmd1bWVudHMsIGdlbmVyYXRvcikge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBnID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pLCBpLCBxID0gW107XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaWYgKGdbbl0pIGlbbl0gPSBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKGEsIGIpIHsgcS5wdXNoKFtuLCB2LCBhLCBiXSkgPiAxIHx8IHJlc3VtZShuLCB2KTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHJlc3VtZShuLCB2KSB7IHRyeSB7IHN0ZXAoZ1tuXSh2KSk7IH0gY2F0Y2ggKGUpIHsgc2V0dGxlKHFbMF1bM10sIGUpOyB9IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAocikgeyByLnZhbHVlIGluc3RhbmNlb2YgX19hd2FpdCA/IFByb21pc2UucmVzb2x2ZShyLnZhbHVlLnYpLnRoZW4oZnVsZmlsbCwgcmVqZWN0KSA6IHNldHRsZShxWzBdWzJdLCByKTsgfVxyXG4gICAgZnVuY3Rpb24gZnVsZmlsbCh2YWx1ZSkgeyByZXN1bWUoXCJuZXh0XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gcmVqZWN0KHZhbHVlKSB7IHJlc3VtZShcInRocm93XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKGYsIHYpIHsgaWYgKGYodiksIHEuc2hpZnQoKSwgcS5sZW5ndGgpIHJlc3VtZShxWzBdWzBdLCBxWzBdWzFdKTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0RlbGVnYXRvcihvKSB7XHJcbiAgICB2YXIgaSwgcDtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiwgZnVuY3Rpb24gKGUpIHsgdGhyb3cgZTsgfSksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4sIGYpIHsgaVtuXSA9IG9bbl0gPyBmdW5jdGlvbiAodikgeyByZXR1cm4gKHAgPSAhcCkgPyB7IHZhbHVlOiBfX2F3YWl0KG9bbl0odikpLCBkb25lOiBuID09PSBcInJldHVyblwiIH0gOiBmID8gZih2KSA6IHY7IH0gOiBmOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jVmFsdWVzKG8pIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgbSA9IG9bU3ltYm9sLmFzeW5jSXRlcmF0b3JdLCBpO1xyXG4gICAgcmV0dXJuIG0gPyBtLmNhbGwobykgOiAobyA9IHR5cGVvZiBfX3ZhbHVlcyA9PT0gXCJmdW5jdGlvblwiID8gX192YWx1ZXMobykgOiBvW1N5bWJvbC5pdGVyYXRvcl0oKSwgaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGkpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlbbl0gPSBvW25dICYmIGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7IHYgPSBvW25dKHYpLCBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCB2LmRvbmUsIHYudmFsdWUpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgZCwgdikgeyBQcm9taXNlLnJlc29sdmUodikudGhlbihmdW5jdGlvbih2KSB7IHJlc29sdmUoeyB2YWx1ZTogdiwgZG9uZTogZCB9KTsgfSwgcmVqZWN0KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tYWtlVGVtcGxhdGVPYmplY3QoY29va2VkLCByYXcpIHtcclxuICAgIGlmIChPYmplY3QuZGVmaW5lUHJvcGVydHkpIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvb2tlZCwgXCJyYXdcIiwgeyB2YWx1ZTogcmF3IH0pOyB9IGVsc2UgeyBjb29rZWQucmF3ID0gcmF3OyB9XHJcbiAgICByZXR1cm4gY29va2VkO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0U3Rhcihtb2QpIHtcclxuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XHJcbiAgICB2YXIgcmVzdWx0ID0ge307XHJcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgcmVzdWx0W2tdID0gbW9kW2tdO1xyXG4gICAgcmVzdWx0LmRlZmF1bHQgPSBtb2Q7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnREZWZhdWx0KG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBkZWZhdWx0OiBtb2QgfTtcclxufVxyXG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5jbGFzcyBERlBEdXJhdGlvbkVycm9yIGV4dGVuZHMgRXJyb3Ige1xyXG4gIGNvbnN0cnVjdG9yKGludGVydmFsKSB7XHJcbiAgICBzdXBlcihgSW52YWxpZCBpbnRlcnZhbDogJyR7aW50ZXJ2YWx9J2xzYCk7XHJcbiAgfVxyXG59XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBQYXJzZUR1cmF0aW9uU2VydmljZSB7XHJcblxyXG4gIGNvbnZlcnRUb01pbGxpc2Vjb25kcyh0aW1lLCB1bml0KSB7XHJcbiAgICBjb25zb2xlLmFzc2VydCgvXihtP3N8bWlufGgpJC9nLnRlc3QodW5pdCkpO1xyXG5cclxuICAgIGlmICh1bml0ID09PSAnbXMnKSB7IHJldHVybiB0aW1lOyB9XHJcbiAgICBpZiAodW5pdCA9PT0gJ3MnKSB7IHJldHVybiB0aW1lICogMTAwMDsgfVxyXG4gICAgaWYgKHVuaXQgPT09ICdtaW4nKSB7IHJldHVybiB0aW1lICogNjAgKiAxMDAwOyB9XHJcblxyXG4gICAgcmV0dXJuIHRpbWUgKiA2MCAqIDYwICogMTAwMDtcclxuICB9XHJcblxyXG4gIGNvbnZlcnQobWF0Y2gpIHtcclxuICAgIGNvbnN0IHRpbWUgPSBwYXJzZUZsb2F0KG1hdGNoWzFdKTtcclxuXHJcbiAgICBpZiAobWF0Y2gubGVuZ3RoID09PSAyKSB7IHJldHVybiB0aW1lOyB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuY29udmVydFRvTWlsbGlzZWNvbmRzKHRpbWUsIG1hdGNoWzJdKTtcclxuICB9XHJcblxyXG4gIHBhcnNlRHVyYXRpb24oaW50ZXJ2YWwpIHtcclxuXHJcbiAgICBpZiAoaW50ZXJ2YWwgPT09IHVuZGVmaW5lZCB8fCBpbnRlcnZhbCA9PT0gbnVsbCkge1xyXG4gICAgICB0aHJvdyBuZXcgREZQRHVyYXRpb25FcnJvcihpbnRlcnZhbCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHR5cGVvZiBpbnRlcnZhbCA9PT0gJ251bWJlcicpIHtcclxuICAgICAgcmV0dXJuIGludGVydmFsO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0eXBlb2YgaW50ZXJ2YWwgIT09ICdzdHJpbmcnKSB7XHJcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYCcke2ludGVydmFsfScgbXVzdCBiZSBvZiBudW1iZXIgb3Igc3RyaW5nIHR5cGVgKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBtYXRjaCA9IGludGVydmFsLm1hdGNoKC8oKD86XFxkKyk/Lj9cXGQrKShtP3N8bWlufGgpPy8pO1xyXG5cclxuICAgIGlmICghbWF0Y2gpIHtcclxuICAgICAgdGhyb3cgbmV3IERGUER1cmF0aW9uRXJyb3IoaW50ZXJ2YWwpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzLmNvbnZlcnQobWF0Y2gpO1xyXG4gIH1cclxuXHJcbn1cclxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgSHR0cEVycm9yU2VydmljZSB9IGZyb20gJy4vaHR0cC1lcnJvci5zZXJ2aWNlJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIFNjcmlwdEluamVjdG9yU2VydmljZSB7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cEVycm9yOiBIdHRwRXJyb3JTZXJ2aWNlKSB7IH1cclxuXHJcbiAgcHJpdmF0ZSBjb21wbGV0ZVVSTCh1cmwpIHtcclxuICAgIGNvbnN0IHNzbCA9IGRvY3VtZW50LmxvY2F0aW9uLnByb3RvY29sID09PSAnaHR0cHM6JztcclxuICAgIHJldHVybiAoc3NsID8gJ2h0dHBzOicgOiAnaHR0cDonKSArIHVybDtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY3JlYXRlU2NyaXB0KHVybCkge1xyXG4gICAgY29uc3Qgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XHJcblxyXG4gICAgc2NyaXB0LmFzeW5jID0gdHJ1ZTtcclxuICAgIHNjcmlwdC50eXBlID0gJ3RleHQvamF2YXNjcmlwdCc7XHJcbiAgICBzY3JpcHQuc3JjID0gdGhpcy5jb21wbGV0ZVVSTCh1cmwpO1xyXG5cclxuICAgIHJldHVybiBzY3JpcHQ7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHByb21pc2VTY3JpcHQoc2NyaXB0LCB1cmwpIHtcclxuICAgIGNvbnN0IHByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIHNjcmlwdC5vbmxvYWQgPSAoKSA9PiB7XHJcbiAgICAgICAgcmVzb2x2ZShzY3JpcHQpO1xyXG4gICAgICB9O1xyXG4gICAgICBzY3JpcHQub25lcnJvciA9ICgpID0+IHtcclxuICAgICAgICByZWplY3Qoe1xyXG4gICAgICAgICAgcGF0aDogdXJsLFxyXG4gICAgICAgICAgbG9hZGVkOiBmYWxzZVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9O1xyXG4gICAgfSk7XHJcblxyXG4gICAgcHJvbWlzZS5jYXRjaChyZXNwb25zZSA9PiB7XHJcbiAgICAgIHRoaXMuaHR0cEVycm9yLmh0dHBFcnJvcih7IHN0YXR1czogNDAwIH0sIGBsb2FkaW5nIHNjcmlwdCBcIiR7dXJsfVwiYCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gcHJvbWlzZTtcclxuICB9XHJcblxyXG4gIGluamVjdFNjcmlwdChzY3JpcHQpIHtcclxuICAgIGNvbnN0IGhlYWQgPSBkb2N1bWVudC5oZWFkIHx8IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2hlYWQnKTtcclxuICAgIGhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcclxuICB9XHJcblxyXG4gIHNjcmlwdEluamVjdG9yKHVybCkge1xyXG4gICAgY29uc3Qgc2NyaXB0ID0gdGhpcy5jcmVhdGVTY3JpcHQodXJsKTtcclxuICAgIHRoaXMuaW5qZWN0U2NyaXB0KHNjcmlwdCk7XHJcbiAgICByZXR1cm4gdGhpcy5wcm9taXNlU2NyaXB0KHNjcmlwdCwgdXJsKTtcclxuICB9XHJcblxyXG59XHJcbiIsIlxyXG5cclxuZXhwb3J0IGNsYXNzIERGUEluY29tcGxldGVFcnJvciBleHRlbmRzIEVycm9yIHtcclxuICAgIGNvbnN0cnVjdG9yKGRpcmVjdGl2ZU5hbWUsIG1pc3NpbmdOYW1lLCBpc0F0dHJpYnV0ZT8pIHtcclxuICAgICAgICBzdXBlcihgSW5jb21wbGV0ZSBkZWZpbml0aW9uIG9mICcke2RpcmVjdGl2ZU5hbWV9JzogYCArXHJcbiAgICAgICAgICAgIGBNaXNzaW5nICR7aXNBdHRyaWJ1dGUgPyAnYXR0cmlidXRlJyA6ICdjaGlsZCBkaXJlY3RpdmUnfSBgICtcclxuICAgICAgICAgICAgYCcke21pc3NpbmdOYW1lfScuYCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBERlBUeXBlRXJyb3IgZXh0ZW5kcyBFcnJvciB7XHJcbiAgICBjb25zdHJ1Y3RvcihkaXJlY3RpdmVOYW1lLCBhdHRyaWJ1dGVOYW1lLCB3cm9uZ1ZhbHVlLCBleHBlY3RlZFR5cGUpIHtcclxuICAgICAgICBzdXBlcihcclxuICAgICAgICAgICAgYFdyb25nIHR5cGUgZm9yIGF0dHJpYnV0ZSAnJHthdHRyaWJ1dGVOYW1lfScgb24gYCArXHJcbiAgICAgICAgICAgIGBkaXJlY3RpdmUgJyR7ZGlyZWN0aXZlTmFtZX0nOiBFeHBlY3RlZCAke2V4cGVjdGVkVHlwZX1gICtcclxuICAgICAgICAgICAgYCwgZ290ICR7dHlwZW9mIHdyb25nVmFsdWV9YFxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBERlBNaXNzaW5nUGFyZW50RXJyb3IgZXh0ZW5kcyBFcnJvciB7XHJcbiAgICBjb25zdHJ1Y3RvcihkaXJlY3RpdmVOYW1lLCAuLi5wYXJlbnRzKSB7XHJcbiAgICAgICAgY29uc29sZS5hc3NlcnQocGFyZW50cyAmJiBwYXJlbnRzLmxlbmd0aCA+IDApO1xyXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHBhcmVudHNbMF0pKSB7XHJcbiAgICAgICAgICAgIHBhcmVudHMgPSBwYXJlbnRzWzBdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHBhcmVudE1lc3NhZ2U7XHJcbiAgICAgICAgaWYgKHBhcmVudHMubGVuZ3RoID4gMSkge1xyXG4gICAgICAgICAgICBwYXJlbnRzID0gcGFyZW50cy5tYXAocCA9PiBgJyR7cH0nYCk7XHJcbiAgICAgICAgICAgIHBhcmVudE1lc3NhZ2UgPSAnLCB3aGljaCBtdXN0IGJlICc7XHJcbiAgICAgICAgICAgIHBhcmVudE1lc3NhZ2UgKz0gcGFyZW50cy5zbGljZSgwLCAtMSkuam9pbignLCAnKTtcclxuICAgICAgICAgICAgcGFyZW50TWVzc2FnZSArPSBgIG9yICR7cGFyZW50c1twYXJlbnRzLmxlbmd0aCAtIDFdfWA7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcGFyZW50TWVzc2FnZSA9IGAgJyR7cGFyZW50c1swXX0nYDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN1cGVyKFxyXG4gICAgICAgICAgICBgSW52YWxpZCB1c2Ugb2YgJyR7ZGlyZWN0aXZlTmFtZX0nIGRpcmVjdGl2ZS4gYCArXHJcbiAgICAgICAgICAgIGBNaXNzaW5nIHBhcmVudCBkaXJlY3RpdmUke3BhcmVudE1lc3NhZ2V9LmBcclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcbiIsImV4cG9ydCBjbGFzcyBEZnBUYXJnZXRpbmcge1xyXG4gIFtrZXk6IHN0cmluZ106IEFycmF5PHN0cmluZz47XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBEZnBDb25maWcge1xyXG4gIGlkbGVMb2FkPzogYm9vbGVhbjtcclxuICBvblNhbWVOYXZpZ2F0aW9uPzogJ3JlZnJlc2gnIHwgJ2lnbm9yZSc7XHJcbiAgc2luZ2xlUmVxdWVzdE1vZGU/OiBib29sZWFuO1xyXG4gIGVuYWJsZVZpZGVvQWRzPzogYm9vbGVhbjtcclxuICBwZXJzb25hbGl6ZWRBZHM/OiBib29sZWFuO1xyXG4gIGNvbGxhcHNlSWZFbXB0eT86IGJvb2xlYW47XHJcbiAgY2VudGVyaW5nPzogYm9vbGVhbjtcclxuICBsb2NhdGlvbj86IHN0cmluZyB8IEFycmF5PHN0cmluZz47XHJcbiAgcHBpZD86IHN0cmluZztcclxuICBnbG9iYWxUYXJnZXRpbmc/OiBEZnBUYXJnZXRpbmc7XHJcbiAgZm9yY2VTYWZlRnJhbWU/OiBib29sZWFuO1xyXG4gIHNhZmVGcmFtZUNvbmZpZz86IG9iamVjdDtcclxuICBsb2FkR1BUPzogYm9vbGVhbjtcclxufVxyXG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlLCBPcHRpb25hbCwgUExBVEZPUk1fSUQsIEluamVjdCwgSW5qZWN0aW9uVG9rZW4gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgaXNQbGF0Zm9ybUJyb3dzZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5cclxuaW1wb3J0IHsgREZQX0NPTkZJRyB9IGZyb20gJy4vaW5qZWN0aW9uX3Rva2VuJztcclxuaW1wb3J0IHsgRGZwQ29uZmlnIH0gZnJvbSAnLi4vY2xhc3MnO1xyXG5pbXBvcnQgeyBJZGxlU2VydmljZSB9IGZyb20gJy4vaWRsZS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgU2NyaXB0SW5qZWN0b3JTZXJ2aWNlIH0gZnJvbSAnLi9zY3JpcHQtaW5qZWN0b3Iuc2VydmljZSc7XHJcblxyXG5leHBvcnQgY29uc3QgR1BUX0xJQlJBUllfVVJMID0gJy8vd3d3Lmdvb2dsZXRhZ3NlcnZpY2VzLmNvbS90YWcvanMvZ3B0LmpzJztcclxuXHJcbmNsYXNzIERGUENvbmZpZ3VyYXRpb25FcnJvciBleHRlbmRzIEVycm9yIHsgfVxyXG5cclxuLy8gZXhwb3J0IGNvbnN0IERGUF9DT05GSUcgPSBuZXcgSW5qZWN0aW9uVG9rZW48RGZwQ29uZmlnPignZGZwQ29uZmlnJyk7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBEZnBTZXJ2aWNlIHtcclxuXHJcbiAgcHJpdmF0ZSBlbmFibGVWaWRlb0FkcyA9IGZhbHNlO1xyXG5cclxuICBwcml2YXRlIHBlcnNvbmFsaXplZEFkcyA9IHRydWU7XHJcblxyXG4gIHByaXZhdGUgY29sbGFwc2VJZkVtcHR5ID0gdHJ1ZTtcclxuXHJcbiAgcHJpdmF0ZSBjZW50ZXJpbmcgPSBmYWxzZTtcclxuXHJcbiAgcHJpdmF0ZSBsb2NhdGlvbiA9IG51bGw7XHJcblxyXG4gIHByaXZhdGUgcHBpZCA9IG51bGw7XHJcblxyXG4gIHByaXZhdGUgZ2xvYmFsVGFyZ2V0aW5nID0gbnVsbDtcclxuXHJcbiAgcHJpdmF0ZSBmb3JjZVNhZmVGcmFtZSA9IGZhbHNlO1xyXG5cclxuICBwcml2YXRlIHNhZmVGcmFtZUNvbmZpZyA9IG51bGw7XHJcblxyXG4gIHByaXZhdGUgbG9hZEdQVCA9IHRydWU7XHJcblxyXG4gIHByaXZhdGUgbG9hZGVkID0gZmFsc2U7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgQEluamVjdChQTEFURk9STV9JRCkgcHJpdmF0ZSBwbGF0Zm9ybUlkOiBPYmplY3QsXHJcbiAgICBAT3B0aW9uYWwoKSBpZGxlTG9hZDogSWRsZVNlcnZpY2UsXHJcbiAgICBASW5qZWN0KERGUF9DT05GSUcpIHByaXZhdGUgY29uZmlnOiBEZnBDb25maWcsXHJcbiAgICBwcml2YXRlIHNjcmlwdEluamVjdG9yOiBTY3JpcHRJbmplY3RvclNlcnZpY2VcclxuICApIHtcclxuICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XHJcbiAgICAgIGNvbnN0IHdpbjogYW55ID0gd2luZG93LFxyXG4gICAgICAgIGdvb2dsZXRhZyA9IHdpbi5nb29nbGV0YWcgfHwge307XHJcblxyXG4gICAgICB0aGlzLmRmcENvbmZpZygpO1xyXG5cclxuICAgICAgZ29vZ2xldGFnLmNtZCA9IGdvb2dsZXRhZy5jbWQgfHwgW107XHJcbiAgICAgIGdvb2dsZXRhZy5jbWQucHVzaCgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5zZXR1cCgpO1xyXG4gICAgICB9KTtcclxuICAgICAgd2luLmdvb2dsZXRhZyA9IGdvb2dsZXRhZztcclxuXHJcbiAgICAgIGlmICh0aGlzLmxvYWRHUFQpIHtcclxuICAgICAgICBjb25zdCBsb2FkU2NyaXB0ID0gKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5zY3JpcHRJbmplY3Rvci5zY3JpcHRJbmplY3RvcihHUFRfTElCUkFSWV9VUkwpLnRoZW4oKHNjcmlwdCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRlZCA9IHRydWU7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIGlmIChpZGxlTG9hZCkge1xyXG4gICAgICAgICAgaWRsZUxvYWQucmVxdWVzdChsb2FkU2NyaXB0KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgbG9hZFNjcmlwdCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBkZnBDb25maWcoKSB7XHJcbiAgICBmb3IgKGNvbnN0IGtleSBpbiB0aGlzLmNvbmZpZykge1xyXG4gICAgICBpZiAodGhpcy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XHJcbiAgICAgICAgdGhpc1trZXldID0gdGhpcy5jb25maWdba2V5XTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBhZGRTYWZlRnJhbWVDb25maWcocHViYWRzKSB7XHJcbiAgICBpZiAoIXRoaXMuc2FmZUZyYW1lQ29uZmlnKSB7IHJldHVybiBmYWxzZTsgfVxyXG4gICAgaWYgKHR5cGVvZiB0aGlzLnNhZmVGcmFtZUNvbmZpZyAhPT0gJ29iamVjdCcpIHtcclxuICAgICAgdGhyb3cgbmV3IERGUENvbmZpZ3VyYXRpb25FcnJvcignRnJhbWVDb25maWcgbXVzdCBiZSBhbiBvYmplY3QnKTtcclxuICAgIH1cclxuICAgIHB1YmFkcy5zZXRTYWZlRnJhbWVDb25maWcodGhpcy5zYWZlRnJhbWVDb25maWcpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBhZGRUYXJnZXRpbmcocHViYWRzKSB7XHJcbiAgICBpZiAoIXRoaXMuZ2xvYmFsVGFyZ2V0aW5nKSB7IHJldHVybiBmYWxzZTsgfVxyXG4gICAgaWYgKHR5cGVvZiB0aGlzLmdsb2JhbFRhcmdldGluZyAhPT0gJ29iamVjdCcpIHtcclxuICAgICAgdGhyb3cgbmV3IERGUENvbmZpZ3VyYXRpb25FcnJvcignVGFyZ2V0aW5nIG11c3QgYmUgYW4gb2JqZWN0Jyk7XHJcbiAgICB9XHJcblxyXG4gICAgZm9yIChjb25zdCBrZXkgaW4gdGhpcy5nbG9iYWxUYXJnZXRpbmcpIHtcclxuICAgICAgaWYgKHRoaXMuZ2xvYmFsVGFyZ2V0aW5nLmhhc093blByb3BlcnR5KGtleSkpIHtcclxuICAgICAgICBwdWJhZHMuc2V0VGFyZ2V0aW5nKGtleSwgdGhpcy5nbG9iYWxUYXJnZXRpbmdba2V5XSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgYWRkTG9jYXRpb24ocHViYWRzKSB7XHJcbiAgICBpZiAoIXRoaXMubG9jYXRpb24pIHsgcmV0dXJuIGZhbHNlOyB9XHJcblxyXG4gICAgaWYgKHR5cGVvZiB0aGlzLmxvY2F0aW9uID09PSAnc3RyaW5nJykge1xyXG4gICAgICBwdWJhZHMuc2V0TG9jYXRpb24odGhpcy5sb2NhdGlvbik7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkodGhpcy5sb2NhdGlvbikpIHtcclxuICAgICAgdGhyb3cgbmV3IERGUENvbmZpZ3VyYXRpb25FcnJvcignTG9jYXRpb24gbXVzdCBiZSBhbiAnICtcclxuICAgICAgICAnYXJyYXkgb3Igc3RyaW5nJyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHViYWRzLnNldExvY2F0aW9uLmFwcGx5KHB1YmFkcywgdGhpcy5sb2NhdGlvbik7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGFkZFBQSUQocHViYWRzKSB7XHJcbiAgICBpZiAoIXRoaXMucHBpZCkgeyByZXR1cm4gZmFsc2U7IH1cclxuICAgIGlmICh0eXBlb2YgdGhpcy5wcGlkICE9PSAnc3RyaW5nJykge1xyXG4gICAgICB0aHJvdyBuZXcgREZQQ29uZmlndXJhdGlvbkVycm9yKCdQUElEIG11c3QgYmUgYSBzdHJpbmcnKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJhZHMuc2V0UHVibGlzaGVyUHJvdmlkZWRJZCh0aGlzLnBwaWQpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBzZXR1cCgpIHtcclxuICAgIGNvbnN0IHdpbjogYW55ID0gd2luZG93LFxyXG4gICAgICBnb29nbGV0YWcgPSB3aW4uZ29vZ2xldGFnLFxyXG4gICAgICBwdWJhZHMgPSBnb29nbGV0YWcucHViYWRzKCk7XHJcblxyXG4gICAgaWYgKHRoaXMuZW5hYmxlVmlkZW9BZHMpIHtcclxuICAgICAgcHViYWRzLmVuYWJsZVZpZGVvQWRzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gcGVyc29uYWxpemVkQWRzIGlzIGRlZmF1bHRcclxuICAgIGlmICh0aGlzLnBlcnNvbmFsaXplZEFkcyA9PT0gZmFsc2UpIHtcclxuICAgICAgcHViYWRzLnNldFJlcXVlc3ROb25QZXJzb25hbGl6ZWRBZHMoMSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuY29sbGFwc2VJZkVtcHR5KSB7XHJcbiAgICAgIHB1YmFkcy5jb2xsYXBzZUVtcHR5RGl2cygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFdlIGFsd2F5cyByZWZyZXNoIG91cnNlbHZlc1xyXG4gICAgcHViYWRzLmRpc2FibGVJbml0aWFsTG9hZCgpO1xyXG5cclxuICAgIHB1YmFkcy5zZXRGb3JjZVNhZmVGcmFtZSh0aGlzLmZvcmNlU2FmZUZyYW1lKTtcclxuICAgIHB1YmFkcy5zZXRDZW50ZXJpbmcodGhpcy5jZW50ZXJpbmcpO1xyXG5cclxuICAgIHRoaXMuYWRkTG9jYXRpb24ocHViYWRzKTtcclxuICAgIHRoaXMuYWRkUFBJRChwdWJhZHMpO1xyXG4gICAgdGhpcy5hZGRUYXJnZXRpbmcocHViYWRzKTtcclxuICAgIHRoaXMuYWRkU2FmZUZyYW1lQ29uZmlnKHB1YmFkcyk7XHJcblxyXG4gICAgLy8gcHViYWRzLmVuYWJsZVN5bmNSZW5kZXJpbmcoKTtcclxuICAgIHB1YmFkcy5lbmFibGVBc3luY1JlbmRlcmluZygpO1xyXG5cclxuICAgIGlmICh0aGlzLmNvbmZpZy5zaW5nbGVSZXF1ZXN0TW9kZSAhPT0gdHJ1ZSkge1xyXG4gICAgICBpZiAodGhpcy5jb25maWcuZW5hYmxlVmlkZW9BZHMpIHtcclxuICAgICAgICBwdWJhZHMuZW5hYmxlVmlkZW9BZHMoKTtcclxuICAgICAgfVxyXG4gICAgICBnb29nbGV0YWcuZW5hYmxlU2VydmljZXMoKTtcclxuICAgIH1cclxuXHJcbiAgfVxyXG5cclxuICBoYXNMb2FkZWQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5sb2FkZWQ7XHJcbiAgfVxyXG5cclxuICBkZWZpbmVUYXNrKHRhc2spIHtcclxuICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XHJcbiAgICAgIGNvbnN0IHdpbjogYW55ID0gd2luZG93LFxyXG4gICAgICAgIGdvb2dsZXRhZyA9IHdpbi5nb29nbGV0YWc7XHJcbiAgICAgIGdvb2dsZXRhZy5jbWQucHVzaCh0YXNrKTtcclxuICAgIH1cclxuICB9XHJcblxyXG59XHJcbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIERmcElER2VuZXJhdG9yU2VydmljZSB7XHJcblxyXG4gIHByaXZhdGUgZ2VuZXJhdGVkSURzID0ge307XHJcblxyXG4gIGdlbmVyYXRlSUQoKSB7XHJcbiAgICBsZXQgaWQgPSBudWxsO1xyXG5cclxuICAgIGRvIHtcclxuICAgICAgY29uc3QgbnVtYmVyID0gTWF0aC5yYW5kb20oKS50b1N0cmluZygpLnNsaWNlKDIpO1xyXG4gICAgICBpZCA9ICdncHQtYWQtJyArIG51bWJlcjtcclxuICAgIH0gd2hpbGUgKGlkIGluIHRoaXMuZ2VuZXJhdGVkSURzKTtcclxuXHJcbiAgICB0aGlzLmdlbmVyYXRlZElEc1tpZF0gPSB0cnVlO1xyXG5cclxuICAgIHJldHVybiBpZDtcclxuICB9XHJcblxyXG4gIGRmcElER2VuZXJhdG9yKGVsZW1lbnQpIHtcclxuICAgIGlmIChlbGVtZW50ICYmIGVsZW1lbnQuaWQgJiYgIShlbGVtZW50LmlkIGluIHRoaXMuZ2VuZXJhdGVkSURzKSkge1xyXG4gICAgICByZXR1cm4gZWxlbWVudC5pZDtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBpZCA9IHRoaXMuZ2VuZXJhdGVJRCgpO1xyXG4gICAgaWYgKGVsZW1lbnQpIHsgZWxlbWVudC5pZCA9IGlkOyB9XHJcblxyXG4gICAgcmV0dXJuIGlkO1xyXG4gIH1cclxuXHJcbiAgaXNUYWtlbihpZCkge1xyXG4gICAgcmV0dXJuIGlkIGluIHRoaXMuZ2VuZXJhdGVkSURzO1xyXG4gIH1cclxuXHJcbiAgaXNVbmlxdWUoaWQpIHtcclxuICAgIHJldHVybiAhdGhpcy5pc1Rha2VuKGlkKTtcclxuICB9XHJcblxyXG59XHJcbiIsImltcG9ydCB7IEluamVjdGFibGUsIEV2ZW50RW1pdHRlciwgT3B0aW9uYWwsIEluamVjdG9yLCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5cclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uLCB0aW1lciwgZnJvbSB9IGZyb20gJ3J4anMnO1xyXG5cclxuaW1wb3J0IHsgRGZwQ29uZmlnIH0gZnJvbSAnLi4vY2xhc3MnO1xyXG5pbXBvcnQgeyBERlBfQ09ORklHIH0gZnJvbSAnLi9pbmplY3Rpb25fdG9rZW4nO1xyXG5pbXBvcnQgeyBQYXJzZUR1cmF0aW9uU2VydmljZSB9IGZyb20gJy4vcGFyc2UtZHVyYXRpb24uc2VydmljZSc7XHJcblxyXG5jbGFzcyBERlBSZWZyZXNoRXJyb3IgZXh0ZW5kcyBFcnJvciB7IH1cclxuXHJcbmRlY2xhcmUgdmFyIGdvb2dsZXRhZztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIERmcFJlZnJlc2hTZXJ2aWNlIHtcclxuXHJcbiAgcmVmcmVzaEV2ZW50OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICBwcml2YXRlIHJlZnJlc2hTbG90cyA9IFtdO1xyXG4gIHByaXZhdGUgc2luZ2xlUmVxdWVzdDogU3Vic2NyaXB0aW9uO1xyXG4gIHByaXZhdGUgaW50ZXJ2YWxzID0ge307XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdChERlBfQ09ORklHKVxyXG4gICAgcHJpdmF0ZSBjb25maWc6IERmcENvbmZpZyxcclxuICAgIHByaXZhdGUgaW5qZWN0OiBJbmplY3RvcixcclxuICAgIHByaXZhdGUgcGFyc2VEdXJhdGlvbjogUGFyc2VEdXJhdGlvblNlcnZpY2VcclxuICApIHsgfVxyXG5cclxuICBzbG90UmVmcmVzaChzbG90LCByZWZyZXNoSW50ZXJ2YWw/LCBpbml0UmVmcmVzaCA9IGZhbHNlKSB7XHJcbiAgICBjb25zdCBkZWZlcnJlZDogUHJvbWlzZTxhbnk+ID0gZnJvbShbc2xvdF0pLnRvUHJvbWlzZSgpLFxyXG4gICAgICB0YXNrID0geyBzbG90OiBzbG90LCBkZWZlcnJlZDogZGVmZXJyZWQgfTtcclxuXHJcbiAgICBkZWZlcnJlZC50aGVuKCgpID0+IHtcclxuICAgICAgaWYgKHRoaXMuaGFzU2xvdEludGVydmFsKHNsb3QpKSB7XHJcbiAgICAgICAgdGhpcy5jYW5jZWxJbnRlcnZhbChzbG90KTtcclxuICAgICAgfVxyXG4gICAgICBpZiAocmVmcmVzaEludGVydmFsKSB7XHJcbiAgICAgICAgdGhpcy5hZGRTbG90SW50ZXJ2YWwodGFzaywgcmVmcmVzaEludGVydmFsKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKHRoaXMuY29uZmlnLnNpbmdsZVJlcXVlc3RNb2RlID09PSB0cnVlICYmIGluaXRSZWZyZXNoKSB7XHJcbiAgICAgIC8vIFVzZSBhIHRpbWVyIHRvIGhhbmRsZSByZWZyZXNoIG9mIGEgc2luZ2xlIHJlcXVlc3QgbW9kZVxyXG4gICAgICB0aGlzLnJlZnJlc2hTbG90cy5wdXNoKHNsb3QpO1xyXG4gICAgICBpZiAodGhpcy5zaW5nbGVSZXF1ZXN0ICYmICF0aGlzLnNpbmdsZVJlcXVlc3QuY2xvc2VkKSB7XHJcbiAgICAgICAgdGhpcy5zaW5nbGVSZXF1ZXN0LnVuc3Vic2NyaWJlKCk7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5zaW5nbGVSZXF1ZXN0ID0gdGltZXIoMTAwKS5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHB1YmFkcyA9IGdvb2dsZXRhZy5wdWJhZHMoKTtcclxuICAgICAgICBwdWJhZHMuZW5hYmxlU2luZ2xlUmVxdWVzdCgpO1xyXG4gICAgICAgIGdvb2dsZXRhZy5lbmFibGVTZXJ2aWNlcygpO1xyXG4gICAgICAgIHRoaXMucmVmcmVzaFNsb3RzLmZvckVhY2gocyA9PiB7XHJcbiAgICAgICAgICBnb29nbGV0YWcuZGlzcGxheShzLmdldFNsb3RFbGVtZW50SWQoKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcHViYWRzLnJlZnJlc2godGhpcy5yZWZyZXNoU2xvdHMpO1xyXG4gICAgICAgIHRoaXMucmVmcmVzaFNsb3RzID0gW107XHJcbiAgICAgIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZ29vZ2xldGFnLmRpc3BsYXkoc2xvdC5nZXRTbG90RWxlbWVudElkKCkpO1xyXG4gICAgICB0aGlzLnJlZnJlc2goW3Rhc2tdKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZGVmZXJyZWQ7XHJcbiAgfVxyXG5cclxuICBjYW5jZWxJbnRlcnZhbChzbG90KSB7XHJcbiAgICBpZiAoIXRoaXMuaGFzU2xvdEludGVydmFsKHNsb3QpKSB7XHJcbiAgICAgIHRocm93IG5ldyBERlBSZWZyZXNoRXJyb3IoJ05vIGludGVydmFsIGZvciBnaXZlbiBzbG90Jyk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgaW50ZXJ2YWw6IFN1YnNjcmlwdGlvbiA9IHRoaXMuaW50ZXJ2YWxzW3RoaXMuc2xvdEludGVydmFsS2V5KHNsb3QpXTtcclxuICAgIGludGVydmFsLnVuc3Vic2NyaWJlKCk7XHJcbiAgICBkZWxldGUgdGhpcy5pbnRlcnZhbHNbc2xvdF07XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGhhc1Nsb3RJbnRlcnZhbChzbG90KSB7XHJcbiAgICByZXR1cm4gdGhpcy5zbG90SW50ZXJ2YWxLZXkoc2xvdCkgaW4gdGhpcy5pbnRlcnZhbHM7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHJlZnJlc2godGFza3M/KSB7XHJcbiAgICBpZiAodGFza3MgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICBnb29nbGV0YWcuY21kLnB1c2goKCkgPT4ge1xyXG4gICAgICAgIGdvb2dsZXRhZy5wdWJhZHMoKS5yZWZyZXNoKCk7XHJcbiAgICAgIH0pO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRhc2tzLmxlbmd0aCA9PT0gMCkgeyByZXR1cm4gZmFsc2U7IH1cclxuXHJcbiAgICBnb29nbGV0YWcuY21kLnB1c2goKCkgPT4ge1xyXG4gICAgICBnb29nbGV0YWcucHViYWRzKCkucmVmcmVzaCh0YXNrcy5tYXAodGFzayA9PiB0YXNrLnNsb3QpKTtcclxuICAgICAgdGFza3MuZm9yRWFjaCh0YXNrID0+IHtcclxuICAgICAgICBQcm9taXNlLnJlc29sdmUodGFzay5zbG90KTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgYWRkU2xvdEludGVydmFsKHRhc2ssIGludGVydmFsKSB7XHJcbiAgICBjb25zdCBwYXJzZWRJbnRlcnZhbCA9IHRoaXMucGFyc2VEdXJhdGlvbi5wYXJzZUR1cmF0aW9uKGludGVydmFsKTtcclxuICAgIHRoaXMudmFsaWRhdGVJbnRlcnZhbChwYXJzZWRJbnRlcnZhbCwgaW50ZXJ2YWwpO1xyXG5cclxuICAgIGNvbnN0IHJlZnJlc2ggPSB0aW1lcihwYXJzZWRJbnRlcnZhbCwgcGFyc2VkSW50ZXJ2YWwpLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgIGNvbnN0IGRvYyA9IHRoaXMuaW5qZWN0LmdldChET0NVTUVOVCk7XHJcbiAgICAgIGlmICghdGhpcy5oaWRkZW5DaGVjayhkb2MuZ2V0RWxlbWVudEJ5SWQodGFzay5zbG90LmdldFNsb3RFbGVtZW50SWQoKSkpKSB7XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoKFt0YXNrXSk7XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoRXZlbnQuZW1pdCh0YXNrLnNsb3QpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLmludGVydmFsc1t0aGlzLnNsb3RJbnRlcnZhbEtleSh0YXNrLnNsb3QpXSA9IHJlZnJlc2g7XHJcblxyXG4gICAgcmV0dXJuIHJlZnJlc2g7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHNsb3RJbnRlcnZhbEtleShzbG90KSB7XHJcbiAgICByZXR1cm4gc2xvdC5nZXRTbG90SWQoKS5nZXREb21JZCgpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSB2YWxpZGF0ZUludGVydmFsKG1pbGxpc2Vjb25kcywgYmVmb3JlUGFyc2luZykge1xyXG4gICAgaWYgKG1pbGxpc2Vjb25kcyA8IDEwMDApIHtcclxuICAgICAgY29uc29sZS53YXJuKCdDYXJlZnVsOiAke2JlZm9yZVBhcnNpbmd9IGlzIHF1aXRlIGEgbG93IGludGVydmFsIScpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaGlkZGVuQ2hlY2soZWxlbWVudDogRWxlbWVudCkge1xyXG4gICAgaWYgKHR5cGVvZiAod2luZG93KSAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgY29uc3QgY3NzID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWxlbWVudCk7XHJcbiAgICAgIGlmIChjc3MuZGlzcGxheSA9PT0gJ25vbmUnKSB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIH0gZWxzZSBpZiAoZWxlbWVudC5wYXJlbnRFbGVtZW50KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaGlkZGVuQ2hlY2soZWxlbWVudC5wYXJlbnRFbGVtZW50KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQge1xyXG4gIERpcmVjdGl2ZSwgRWxlbWVudFJlZixcclxuICBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsXHJcbiAgT25Jbml0LCBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3ksIEluamVjdCwgUExBVEZPUk1fSUQsIE9wdGlvbmFsXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgUm91dGVyLCBOYXZpZ2F0aW9uRW5kIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuXHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBmaWx0ZXIgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG5pbXBvcnQgeyBEZnBTZXJ2aWNlLCB9IGZyb20gJy4uL3NlcnZpY2UvZGZwLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBEZnBJREdlbmVyYXRvclNlcnZpY2UsIH0gZnJvbSAnLi4vc2VydmljZS9kZnAtaWQtZ2VuZXJhdG9yLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBEZnBSZWZyZXNoU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2UvZGZwLXJlZnJlc2guc2VydmljZSc7XHJcblxyXG5pbXBvcnQgeyBERlBJbmNvbXBsZXRlRXJyb3IsIEdvb2dsZVNsb3QsIERmcENvbmZpZyB9IGZyb20gJy4uL2NsYXNzJztcclxuaW1wb3J0IHsgREZQX0NPTkZJRyB9IGZyb20gJy4uL3NlcnZpY2UvaW5qZWN0aW9uX3Rva2VuJztcclxuXHJcbmRlY2xhcmUgdmFyIGdvb2dsZXRhZztcclxuXHJcbmV4cG9ydCBjbGFzcyBEZnBSZWZyZXNoRXZlbnQge1xyXG4gIHR5cGU6IHN0cmluZztcclxuICBzbG90OiBhbnk7XHJcbiAgZGF0YT86IGFueTtcclxufVxyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdkZnAtYWQnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBEZnBBZERpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcclxuXHJcbiAgQElucHV0KCkgYWRVbml0OiBzdHJpbmc7XHJcbiAgQElucHV0KCkgY2xpY2tVcmw6IHN0cmluZztcclxuICBASW5wdXQoKSBmb3JjZVNhZmVGcmFtZTogYm9vbGVhbjtcclxuICBASW5wdXQoKSBzYWZlRnJhbWVDb25maWc6IHN0cmluZztcclxuICBASW5wdXQoKSByZWZyZXNoOiBzdHJpbmc7XHJcbiAgQElucHV0KCkgY29sbGFwc2VJZkVtcHR5OiBib29sZWFuO1xyXG5cclxuICBAT3V0cHV0KCkgYWZ0ZXJSZWZyZXNoOiBFdmVudEVtaXR0ZXI8RGZwUmVmcmVzaEV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgcHJpdmF0ZSBzaXplcyA9IFtdO1xyXG5cclxuICBwcml2YXRlIHJlc3BvbnNpdmVNYXBwaW5nID0gW107XHJcblxyXG4gIHByaXZhdGUgdGFyZ2V0aW5ncyA9IFtdO1xyXG5cclxuICBwcml2YXRlIGV4Y2x1c2lvbnMgPSBbXTtcclxuXHJcbiAgcHJpdmF0ZSBzY3JpcHRzID0gW107XHJcblxyXG4gIHByaXZhdGUgc2xvdDogR29vZ2xlU2xvdDtcclxuXHJcbiAgcHJpdmF0ZSBvblNhbWVOYXZpZ2F0aW9uOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgQEluamVjdChQTEFURk9STV9JRCkgcHJpdmF0ZSBwbGF0Zm9ybUlkOiBPYmplY3QsXHJcbiAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXHJcbiAgICBwcml2YXRlIGRmcDogRGZwU2VydmljZSxcclxuICAgIHByaXZhdGUgZGZwSURHZW5lcmF0b3I6IERmcElER2VuZXJhdG9yU2VydmljZSxcclxuICAgIHByaXZhdGUgZGZwUmVmcmVzaDogRGZwUmVmcmVzaFNlcnZpY2UsXHJcbiAgICBASW5qZWN0KERGUF9DT05GSUcpIHByaXZhdGUgY29uZmlnOiBEZnBDb25maWcsXHJcbiAgICBAT3B0aW9uYWwoKSByb3V0ZXI6IFJvdXRlclxyXG4gICkge1xyXG4gICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcclxuICAgICAgdGhpcy5kZnBSZWZyZXNoLnJlZnJlc2hFdmVudC5zdWJzY3JpYmUoc2xvdCA9PiB7XHJcbiAgICAgICAgaWYgKHNsb3QgPT09IHRoaXMuc2xvdCkge1xyXG4gICAgICAgICAgdGhpcy5hZnRlclJlZnJlc2guZW1pdCh7IHR5cGU6ICdyZWZyZXNoJywgc2xvdDogc2xvdCB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgICBpZiAocm91dGVyKSB7XHJcbiAgICAgICAgdGhpcy5vblNhbWVOYXZpZ2F0aW9uID0gcm91dGVyLmV2ZW50cy5waXBlKGZpbHRlcihldmVudCA9PiBldmVudCBpbnN0YW5jZW9mIE5hdmlnYXRpb25FbmQpKVxyXG4gICAgICAgICAgLnN1YnNjcmliZSgoZXZlbnQ6IE5hdmlnYXRpb25FbmQpID0+IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2xvdCAmJiAhdGhpcy5yZWZyZXNoICYmIHRoaXMuY29uZmlnLm9uU2FtZU5hdmlnYXRpb24gPT09ICdyZWZyZXNoJykge1xyXG4gICAgICAgICAgICAgIHRoaXMucmVmcmVzaENvbnRlbnQuY2FsbCh0aGlzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcclxuICAgICAgdGhpcy5kZnBJREdlbmVyYXRvci5kZnBJREdlbmVyYXRvcih0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZ0FmdGVyVmlld0luaXQoKSB7XHJcbiAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xyXG4gICAgICB0aGlzLmRmcC5kZWZpbmVUYXNrKCgpID0+IHtcclxuICAgICAgICB0aGlzLmRlZmluZVNsb3QoKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIGlmICh0aGlzLnNsb3QpIHtcclxuICAgICAgZ29vZ2xldGFnLmRlc3Ryb3lTbG90cyhbdGhpcy5zbG90XSk7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5vblNhbWVOYXZpZ2F0aW9uKSB7XHJcbiAgICAgIHRoaXMub25TYW1lTmF2aWdhdGlvbi51bnN1YnNjcmliZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBzZXRSZXNwb25zaXZlTWFwcGluZyhzbG90KSB7XHJcbiAgICBjb25zdCBhZCA9IHRoaXMuZ2V0U3RhdGUoKTtcclxuXHJcbiAgICBpZiAoYWQucmVzcG9uc2l2ZU1hcHBpbmcubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBzaXplTWFwcGluZyA9IGdvb2dsZXRhZy5zaXplTWFwcGluZygpO1xyXG5cclxuICAgIGFkLnJlc3BvbnNpdmVNYXBwaW5nLmZvckVhY2gobWFwcGluZyA9PiB7XHJcbiAgICAgIHNpemVNYXBwaW5nLmFkZFNpemUobWFwcGluZy52aWV3cG9ydFNpemUsIG1hcHBpbmcuYWRTaXplcyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBzbG90LmRlZmluZVNpemVNYXBwaW5nKHNpemVNYXBwaW5nLmJ1aWxkKCkpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBkZWZpbmVTbG90KCkge1xyXG4gICAgY29uc3QgYWQgPSB0aGlzLmdldFN0YXRlKCksXHJcbiAgICAgIGVsZW1lbnQgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcclxuXHJcbiAgICB0aGlzLnNsb3QgPSBnb29nbGV0YWcuZGVmaW5lU2xvdChhZC5hZFVuaXQsIGFkLnNpemVzLCBlbGVtZW50LmlkKTtcclxuXHJcbiAgICBpZiAodGhpcy5mb3JjZVNhZmVGcmFtZSAhPT0gdW5kZWZpbmVkICYmIGFkLmZvcmNlU2FmZUZyYW1lID09PSAhdGhpcy5jb25maWcuZm9yY2VTYWZlRnJhbWUpIHtcclxuICAgICAgdGhpcy5zbG90LnNldEZvcmNlU2FmZUZyYW1lKGFkLmZvcmNlU2FmZUZyYW1lKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoYWQuY2xpY2tVcmwpIHtcclxuICAgICAgdGhpcy5zbG90LnNldENsaWNrVXJsKGFkLmNsaWNrVXJsKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoYWQuY29sbGFwc2VJZkVtcHR5KSB7XHJcbiAgICAgIHRoaXMuc2xvdC5zZXRDb2xsYXBzZUVtcHR5RGl2KHRydWUsIHRydWUpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChhZC5zYWZlRnJhbWVDb25maWcpIHtcclxuICAgICAgdGhpcy5zbG90LnNldFNhZmVGcmFtZUNvbmZpZyhcclxuICAgICAgICAoSlNPTi5wYXJzZShhZC5zYWZlRnJhbWVDb25maWcpKVxyXG4gICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuc2xvdC5yZW5kZXJFbmRlZCA9IChnb29nbGVTbG90RXZlbnQ6IElBcmd1bWVudHMpID0+IHtcclxuICAgICAgdGhpcy5hZnRlclJlZnJlc2guZW1pdCh7IHR5cGU6ICdyZW5kZXJFbmRlZCcsIHNsb3Q6IHRoaXMuc2xvdCwgZGF0YTogZ29vZ2xlU2xvdEV2ZW50IH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLnNldFJlc3BvbnNpdmVNYXBwaW5nKHRoaXMuc2xvdCk7XHJcblxyXG4gICAgYWQudGFyZ2V0aW5ncy5mb3JFYWNoKHRhcmdldGluZyA9PiB7XHJcbiAgICAgIHRoaXMuc2xvdC5zZXRUYXJnZXRpbmcodGFyZ2V0aW5nLmtleSwgdGFyZ2V0aW5nLnZhbHVlcyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBhZC5leGNsdXNpb25zLmZvckVhY2goZXhjbHVzaW9uID0+IHtcclxuICAgICAgdGhpcy5zbG90LnNldENhdGVnb3J5RXhjbHVzaW9uKGV4Y2x1c2lvbik7XHJcbiAgICB9KTtcclxuXHJcbiAgICBhZC5zY3JpcHRzLmZvckVhY2goc2NyaXB0ID0+IHsgc2NyaXB0KHRoaXMuc2xvdCk7IH0pO1xyXG5cclxuICAgIGlmICh0aGlzLmNvbmZpZy5lbmFibGVWaWRlb0Fkcykge1xyXG4gICAgICB0aGlzLnNsb3QuYWRkU2VydmljZShnb29nbGV0YWcuY29tcGFuaW9uQWRzKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuc2xvdC5hZGRTZXJ2aWNlKGdvb2dsZXRhZy5wdWJhZHMoKSk7XHJcblxyXG4gICAgdGhpcy5yZWZyZXNoQ29udGVudCgpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSByZWZyZXNoQ29udGVudCgpIHtcclxuICAgIHRoaXMuZGZwUmVmcmVzaC5zbG90UmVmcmVzaCh0aGlzLnNsb3QsIHRoaXMucmVmcmVzaCwgdHJ1ZSkudGhlbihzbG90ID0+IHtcclxuICAgICAgdGhpcy5hZnRlclJlZnJlc2guZW1pdCh7IHR5cGU6ICdpbml0Jywgc2xvdDogc2xvdCB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgY2hlY2tWYWxpZCgpIHtcclxuICAgIGlmICh0aGlzLnNpemVzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICB0aHJvdyBuZXcgREZQSW5jb21wbGV0ZUVycm9yKCdkZnAtYWQnLCAnZGZwLXNpemUnKTtcclxuICAgIH1cclxuICAgIGlmICghdGhpcy5hZFVuaXQpIHtcclxuICAgICAgdGhyb3cgbmV3IERGUEluY29tcGxldGVFcnJvcignZGZwLWFkJywgJ2FkLXVuaXQnLCB0cnVlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldCBpc0hpZGRlbigpIHtcclxuICAgIHJldHVybiB0aGlzLmRmcFJlZnJlc2guaGlkZGVuQ2hlY2sodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpO1xyXG4gIH1cclxuXHJcbiAgZ2V0U3RhdGUoKSB7XHJcbiAgICB0aGlzLmNoZWNrVmFsaWQoKTtcclxuICAgIHJldHVybiBPYmplY3QuZnJlZXplKHtcclxuICAgICAgc2l6ZXM6IHRoaXMuc2l6ZXMsXHJcbiAgICAgIHJlc3BvbnNpdmVNYXBwaW5nOiB0aGlzLnJlc3BvbnNpdmVNYXBwaW5nLFxyXG4gICAgICB0YXJnZXRpbmdzOiB0aGlzLnRhcmdldGluZ3MsXHJcbiAgICAgIGV4Y2x1c2lvbnM6IHRoaXMuZXhjbHVzaW9ucyxcclxuICAgICAgYWRVbml0OiB0aGlzLmFkVW5pdCxcclxuICAgICAgZm9yY2VTYWZlRnJhbWU6IHRoaXMuZm9yY2VTYWZlRnJhbWUgPT09IHRydWUsXHJcbiAgICAgIHNhZmVGcmFtZUNvbmZpZzogdGhpcy5zYWZlRnJhbWVDb25maWcsXHJcbiAgICAgIGNsaWNrVXJsOiB0aGlzLmNsaWNrVXJsLFxyXG4gICAgICByZWZyZXNoOiB0aGlzLnJlZnJlc2gsXHJcbiAgICAgIHNjcmlwdHM6IHRoaXMuc2NyaXB0cyxcclxuICAgICAgY29sbGFwc2VJZkVtcHR5OiB0aGlzLmNvbGxhcHNlSWZFbXB0eSA9PT0gdHJ1ZVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBhZGRTaXplKHNpemUpIHtcclxuICAgIHRoaXMuc2l6ZXMucHVzaChzaXplKTtcclxuICB9XHJcblxyXG4gIGFkZFJlc3BvbnNpdmVNYXBwaW5nKG1hcHBpbmcpIHtcclxuICAgIHRoaXMucmVzcG9uc2l2ZU1hcHBpbmcucHVzaChtYXBwaW5nKTtcclxuICB9XHJcblxyXG4gIGFkZFRhcmdldGluZyh0YXJnZXRpbmcpIHtcclxuICAgIHRoaXMudGFyZ2V0aW5ncy5wdXNoKHRhcmdldGluZyk7XHJcbiAgfVxyXG5cclxuICBhZGRFeGNsdXNpb24oZXhjbHVzaW9uKSB7XHJcbiAgICB0aGlzLmV4Y2x1c2lvbnMucHVzaChleGNsdXNpb24pO1xyXG4gIH1cclxuXHJcbiAgYWRkU2NyaXB0KHNjcmlwdCkge1xyXG4gICAgdGhpcy5zY3JpcHRzLnB1c2goc2NyaXB0KTtcclxuICB9XHJcblxyXG59XHJcbiIsImltcG9ydCB7XHJcbiAgICBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsXHJcbiAgICBJbmplY3QsIGZvcndhcmRSZWYsXHJcbiAgICBIb3N0TGlzdGVuZXJcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IERmcEFkRGlyZWN0aXZlIH0gZnJvbSAnLi9kZnAtYWQuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgRGZwUmVmcmVzaFNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlL2RmcC1yZWZyZXNoLnNlcnZpY2UnO1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgICBzZWxlY3RvcjogJ2RmcC1hZFtyZXNwb25zaXZlXSdcclxufSlcclxuZXhwb3J0IGNsYXNzIERmcEFkUmVzcG9uc2l2ZURpcmVjdGl2ZSB7XHJcblxyXG4gICAgcHJpdmF0ZSBpZnJhbWU6IEhUTUxJRnJhbWVFbGVtZW50O1xyXG4gICAgcHJpdmF0ZSBpZnJhbWVXaWR0aDogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBzbG90OiBhbnk7XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxyXG4gICAgICAgIEBJbmplY3QoZm9yd2FyZFJlZigoKSA9PiBEZnBBZERpcmVjdGl2ZSkpXHJcbiAgICAgICAgcHJpdmF0ZSBhZDogRGZwQWREaXJlY3RpdmUsXHJcbiAgICAgICAgcHJpdmF0ZSBkZnBSZWZyZXNoOiBEZnBSZWZyZXNoU2VydmljZVxyXG4gICAgKSB7XHJcbiAgICAgICAgdGhpcy5hZC5hZnRlclJlZnJlc2guc3Vic2NyaWJlKGV2ZW50ID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zbG90ID0gZXZlbnQuc2xvdDtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBASG9zdExpc3RlbmVyKCd3aW5kb3c6cmVzaXplJylcclxuICAgIG5vcm1hbGl6ZUlmcmFtZSgpIHtcclxuICAgICAgICBpZiAodGhpcy5hZC5pc0hpZGRlbikge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuaWZyYW1lID0gdGhpcy5pZnJhbWUgfHwgdGhpcy5nZXRJZnJhbWUoKTtcclxuICAgICAgICBpZiAoIXRoaXMuaWZyYW1lKSB7IHJldHVybiBmYWxzZTsgfVxyXG5cclxuICAgICAgICB0aGlzLmlmcmFtZVdpZHRoID0gdGhpcy5pZnJhbWVXaWR0aCB8fCArdGhpcy5pZnJhbWUud2lkdGg7XHJcblxyXG4gICAgICAgIGNvbnN0IHdpbldpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XHJcblxyXG4gICAgICAgIGxldCBzdGF0ZSA9IHRoaXMuYWQuZ2V0U3RhdGUoKSxcclxuICAgICAgICAgICAgd2lkdGggPSAwO1xyXG5cclxuICAgICAgICBzdGF0ZS5zaXplcy5mb3JFYWNoKHNpemUgPT4ge1xyXG4gICAgICAgICAgICBpZiAoc2l6ZVswXSA8IHdpbldpZHRoKSB7XHJcbiAgICAgICAgICAgICAgICB3aWR0aCA9IE1hdGgubWF4KHdpZHRoLCBzaXplWzBdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAoc3RhdGUuc2l6ZXMubGVuZ3RoID4gMSAmJiB3aWR0aCAhPT0gdGhpcy5pZnJhbWVXaWR0aCkge1xyXG4gICAgICAgICAgICBzdGF0ZSA9IHRoaXMuYWQuZ2V0U3RhdGUoKTtcclxuICAgICAgICAgICAgdGhpcy5pZnJhbWVXaWR0aCA9IHdpZHRoO1xyXG4gICAgICAgICAgICB0aGlzLmlmcmFtZS5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgd2lkdGggKyAnJyk7XHJcbiAgICAgICAgICAgIHRoaXMuZGZwUmVmcmVzaC5zbG90UmVmcmVzaCh0aGlzLnNsb3QsIHN0YXRlLnJlZnJlc2gpLnRoZW4oc2xvdCA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkLmFmdGVyUmVmcmVzaC5lbWl0KHsgdHlwZTogJ3Jlc2l6ZScsIHNsb3Q6IHNsb3QgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlmcmFtZSA9IHRoaXMuZ2V0SWZyYW1lKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRJZnJhbWUoKSB7XHJcbiAgICAgICAgY29uc3QgYWQ6IEVsZW1lbnQgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCxcclxuICAgICAgICAgICAgaWZyYW1lID0gYWQucXVlcnlTZWxlY3RvcignaWZyYW1lJyk7XHJcbiAgICAgICAgaWYgKGlmcmFtZSAmJiAraWZyYW1lLndpZHRoID4gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gaWZyYW1lO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIEluamVjdCwgZm9yd2FyZFJlZiwgSW5wdXQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgRGZwQWREaXJlY3RpdmUgfSBmcm9tICcuL2RmcC1hZC5kaXJlY3RpdmUnO1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdkZnAtcmVzcG9uc2l2ZSdcclxufSlcclxuZXhwb3J0IGNsYXNzIERmcFJlc3BvbnNpdmVEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQge1xyXG5cclxuICBASW5wdXQoKSB2aWV3cG9ydCA9IFswLCAwXTtcclxuICBASW5wdXQoKSBhZFNpemVzID0gW107XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgQEluamVjdChmb3J3YXJkUmVmKCgpID0+IERmcEFkRGlyZWN0aXZlKSlcclxuICAgIHByaXZhdGUgYWQ6IERmcEFkRGlyZWN0aXZlXHJcbiAgKSB7IH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLmFkLmFkZFJlc3BvbnNpdmVNYXBwaW5nKHRoaXMuZ2V0U3RhdGUoKSk7XHJcbiAgfVxyXG5cclxuICBASW5wdXQoKVxyXG4gIHNldCB2aWV3V2lkdGgodmFsOiBudW1iZXIpIHtcclxuICAgIGlmICh2YWwgPiAwKSB7XHJcbiAgICAgIHRoaXMudmlld3BvcnRbMF0gPSB2YWw7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBASW5wdXQoKVxyXG4gIHNldCB2aWV3SGVpZ2h0KHZhbDogbnVtYmVyKSB7XHJcbiAgICBpZiAodmFsID4gMCkge1xyXG4gICAgICB0aGlzLnZpZXdwb3J0WzFdID0gdmFsO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYWRkU2l6ZShzaXplKSB7XHJcbiAgICB0aGlzLmFkU2l6ZXMucHVzaChzaXplKTtcclxuICB9XHJcblxyXG4gIGdldFN0YXRlKCkge1xyXG4gICAgcmV0dXJuIE9iamVjdC5mcmVlemUoe1xyXG4gICAgICB2aWV3cG9ydFNpemU6IHRoaXMudmlld3BvcnQsXHJcbiAgICAgIGFkU2l6ZXM6IHRoaXMuYWRTaXplc1xyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSW5wdXQsIEluamVjdCwgZm9yd2FyZFJlZiwgT25Jbml0LCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgRGZwQWREaXJlY3RpdmUgfSBmcm9tICcuL2RmcC1hZC5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBEZnBSZXNwb25zaXZlRGlyZWN0aXZlIH0gZnJvbSAnLi9kZnAtcmVzcG9uc2l2ZS5kaXJlY3RpdmUnO1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdkZnAtc2l6ZSdcclxufSlcclxuZXhwb3J0IGNsYXNzIERmcFNpemVEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQge1xyXG5cclxuICBASW5wdXQoKSB3aWR0aDogbnVtYmVyO1xyXG4gIEBJbnB1dCgpIGhlaWdodDogbnVtYmVyO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZixcclxuICAgIEBJbmplY3QoZm9yd2FyZFJlZigoKSA9PiBEZnBBZERpcmVjdGl2ZSkpXHJcbiAgICBwcml2YXRlIGFkOiBEZnBBZERpcmVjdGl2ZSxcclxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoZm9yd2FyZFJlZigoKSA9PiBEZnBSZXNwb25zaXZlRGlyZWN0aXZlKSlcclxuICAgIHByaXZhdGUgcmVzcDogRGZwUmVzcG9uc2l2ZURpcmVjdGl2ZVxyXG4gICkgeyB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgY29uc3QgdGFyZ2V0ID0gdGhpcy5yZXNwIHx8IHRoaXMuYWQsXHJcbiAgICAgIGlubmVyVGV4dDogc3RyaW5nID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuaW5uZXJUZXh0O1xyXG5cclxuICAgIGlmICh0aGlzLndpZHRoICYmIHRoaXMuaGVpZ2h0KSB7XHJcbiAgICAgIHRhcmdldC5hZGRTaXplKFt0aGlzLndpZHRoLCB0aGlzLmhlaWdodF0pO1xyXG4gICAgfSBlbHNlIGlmIChpbm5lclRleHQudHJpbSgpICE9PSAnJykge1xyXG4gICAgICB0YXJnZXQuYWRkU2l6ZShpbm5lclRleHQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbn1cclxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBBZnRlckNvbnRlbnRJbml0LCBJbnB1dCwgSW5qZWN0LCBmb3J3YXJkUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBERlBJbmNvbXBsZXRlRXJyb3IgfSBmcm9tICcuLi9jbGFzcyc7XHJcbmltcG9ydCB7IERmcEFkRGlyZWN0aXZlIH0gZnJvbSAnLi9kZnAtYWQuZGlyZWN0aXZlJztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnZGZwLXRhcmdldGluZydcclxufSlcclxuZXhwb3J0IGNsYXNzIERmcFRhcmdldGluZ0RpcmVjdGl2ZSBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQge1xyXG5cclxuICBASW5wdXQoKSBrZXk6IHN0cmluZztcclxuXHJcbiAgQElucHV0KClcclxuICBzZXQgdmFsdWUodmFsOiBzdHJpbmcgfCBBcnJheTxzdHJpbmc+KSB7XHJcbiAgICBpZiAodmFsIGluc3RhbmNlb2YgQXJyYXkpIHtcclxuICAgICAgdmFsLmZvckVhY2godiA9PiB0aGlzLmFkZFZhbHVlKHYpKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuYWRkVmFsdWUodmFsKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgdmFsdWVzID0gW107XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgQEluamVjdChmb3J3YXJkUmVmKCgpID0+IERmcEFkRGlyZWN0aXZlKSlcclxuICAgIHByaXZhdGUgYWQ6IERmcEFkRGlyZWN0aXZlXHJcbiAgKSB7IH1cclxuXHJcbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xyXG4gICAgY29uc3QgdGFyZ2V0aW5nID0gdGhpcy5nZXRTdGF0ZSgpO1xyXG4gICAgdGhpcy5hZC5hZGRUYXJnZXRpbmcodGFyZ2V0aW5nKTtcclxuICB9XHJcblxyXG4gIGNoZWNrVmFsaWQoKSB7XHJcbiAgICBpZiAodGhpcy5rZXkgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aHJvdyBuZXcgREZQSW5jb21wbGV0ZUVycm9yKCdkZnAtdGFyZ2V0aW5nJywgJ2tleScsIHRydWUpO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMudmFsdWVzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICB0aHJvdyBuZXcgREZQSW5jb21wbGV0ZUVycm9yKCdkZnAtdGFyZ2V0aW5nJywgJ3ZhbHVlJywgdHJ1ZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZXRTdGF0ZSgpIHtcclxuICAgIHRoaXMuY2hlY2tWYWxpZCgpO1xyXG4gICAgcmV0dXJuIE9iamVjdC5mcmVlemUoe1xyXG4gICAgICBrZXk6IHRoaXMua2V5LFxyXG4gICAgICB2YWx1ZXM6IHRoaXMudmFsdWVzXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGFkZFZhbHVlKHZhbHVlKSB7XHJcbiAgICBpZiAodmFsdWUgJiYgIXRoaXMudmFsdWVzLmZpbmQoaXRlbSA9PiBpdGVtID09PSB2YWx1ZSkpIHtcclxuICAgICAgdGhpcy52YWx1ZXMucHVzaCh2YWx1ZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxufVxyXG4iLCJpbXBvcnQge1xyXG4gIERpcmVjdGl2ZSwgRWxlbWVudFJlZixcclxuICBJbmplY3QsIGZvcndhcmRSZWYsXHJcbiAgT25Jbml0XHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBEZnBBZERpcmVjdGl2ZSB9IGZyb20gJy4vZGZwLWFkLmRpcmVjdGl2ZSc7XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ2RmcC1leGNsdXNpb24nXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBEZnBFeGNsdXNpb25EaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQge1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZixcclxuICAgIEBJbmplY3QoZm9yd2FyZFJlZigoKSA9PiBEZnBBZERpcmVjdGl2ZSkpXHJcbiAgICBwcml2YXRlIGFkOiBEZnBBZERpcmVjdGl2ZVxyXG4gICkge31cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLmFkLmFkZEV4Y2x1c2lvbih0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5pbm5lclRleHQpO1xyXG4gIH1cclxuXHJcbn1cclxuIiwiaW1wb3J0IHtcclxuICBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsXHJcbiAgSW5qZWN0LCBmb3J3YXJkUmVmLFxyXG4gIE9uSW5pdFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgRGZwVGFyZ2V0aW5nRGlyZWN0aXZlIH0gZnJvbSAnLi9kZnAtdGFyZ2V0aW5nLmRpcmVjdGl2ZSc7XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ2RmcC12YWx1ZSdcclxufSlcclxuZXhwb3J0IGNsYXNzIERmcFZhbHVlRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0IHtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXHJcbiAgICBASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gRGZwVGFyZ2V0aW5nRGlyZWN0aXZlKSlcclxuICAgIHByaXZhdGUgdGFyZ2V0aW5nOiBEZnBUYXJnZXRpbmdEaXJlY3RpdmVcclxuICApIHsgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMudGFyZ2V0aW5nLmFkZFZhbHVlKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmlubmVyVGV4dCk7XHJcbiAgfVxyXG5cclxufVxyXG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIEluamVjdCwgUExBVEZPUk1fSUQsIEVsZW1lbnRSZWYsIE9uSW5pdCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBSZW5kZXJlcjIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgaXNQbGF0Zm9ybUJyb3dzZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5cclxuaW1wb3J0IHsgbG9hZEltYVNkayB9IGZyb20gJ0BhbHVnaGEvaW1hJztcclxuXHJcbmltcG9ydCB7IERmcElER2VuZXJhdG9yU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2UvZGZwLWlkLWdlbmVyYXRvci5zZXJ2aWNlJztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnZGZwLXZpZGVvJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgRGZwVmlkZW9EaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQge1xyXG5cclxuICBASW5wdXQoKSB3aWR0aDogbnVtYmVyO1xyXG4gIEBJbnB1dCgpIGhlaWdodDogbnVtYmVyO1xyXG5cclxuICBASW5wdXQoKSBhZFRhZzogc3RyaW5nO1xyXG4gIEBJbnB1dCgpIGFkQWN0aW9uczogRXZlbnRFbWl0dGVyPCdwbGF5JyB8ICdwYXVzZScgfCAncmVzdW1lJz47XHJcblxyXG4gIEBPdXRwdXQoKSBhZEV2ZW50cyA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG5cclxuICBjb250ZW50UGxheWVyOiBIVE1MVmlkZW9FbGVtZW50O1xyXG4gIGFkQ29udGFpbmVyOiBIVE1MRWxlbWVudDtcclxuXHJcbiAgcHJpdmF0ZSBjb250ZW50Q29tcGxldGVDYWxsZWQ6IGJvb2xlYW47XHJcbiAgcHJpdmF0ZSBhZERpc3BsYXlDb250YWluZXI6IGdvb2dsZS5pbWEuQWREaXNwbGF5Q29udGFpbmVyO1xyXG4gIHByaXZhdGUgYWRzTG9hZGVyOiBnb29nbGUuaW1hLkFkc0xvYWRlcjtcclxuICBwcml2YXRlIGFkc01hbmFnZXI6IGdvb2dsZS5pbWEuQWRzTWFuYWdlcjtcclxuICBwcml2YXRlIGFkc0RvbmUgPSBmYWxzZTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBASW5qZWN0KFBMQVRGT1JNX0lEKSBwcml2YXRlIHBsYXRmb3JtSWQ6IE9iamVjdCxcclxuICAgIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZixcclxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcclxuICAgIHByaXZhdGUgZGZwSURHZW5lcmF0b3I6IERmcElER2VuZXJhdG9yU2VydmljZVxyXG4gICkgeyB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcclxuXHJcbiAgICAgIGNvbnN0IGVsID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XHJcblxyXG4gICAgICB0aGlzLmRmcElER2VuZXJhdG9yLmRmcElER2VuZXJhdG9yKGVsKTtcclxuXHJcbiAgICAgIHRoaXMuY29udGVudFBsYXllciA9IGVsLnF1ZXJ5U2VsZWN0b3IoJ3ZpZGVvJyk7XHJcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0QXR0cmlidXRlKHRoaXMuY29udGVudFBsYXllciwgJ3dpZHRoJywgdGhpcy53aWR0aC50b1N0cmluZygpKTtcclxuICAgICAgdGhpcy5yZW5kZXJlci5zZXRBdHRyaWJ1dGUodGhpcy5jb250ZW50UGxheWVyLCAnaGVpZ2h0JywgdGhpcy5oZWlnaHQudG9TdHJpbmcoKSk7XHJcblxyXG4gICAgICB0aGlzLmFkQ29udGFpbmVyID0gZWwucXVlcnlTZWxlY3RvcignLmFkLWNvbnRhaW5lcicpO1xyXG4gICAgICBpZiAoIXRoaXMuYWRDb250YWluZXIpIHtcclxuICAgICAgICB0aGlzLmFkQ29udGFpbmVyID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMuYWRDb250YWluZXIsICdhZC1jb250YWluZXInKTtcclxuICAgICAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKGVsLCB0aGlzLmFkQ29udGFpbmVyKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gaW1hIHNldHVwXHJcbiAgICAgIGxvYWRJbWFTZGsoKS50aGVuKCgpID0+IHRoaXMuc2V0VXBJTUEoKSk7XHJcblxyXG4gICAgICAvLyBzaW1wbGUgY29udHJvbFxyXG4gICAgICB0aGlzLmFkQWN0aW9ucy5zdWJzY3JpYmUoYWN0ID0+IHtcclxuICAgICAgICBzd2l0Y2ggKGFjdCkge1xyXG4gICAgICAgICAgY2FzZSAncGxheSc6XHJcbiAgICAgICAgICAgIHRoaXMucGxheSgpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIGNhc2UgJ3BhdXNlJzpcclxuICAgICAgICAgICAgdGhpcy5wYXVzZSgpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIGNhc2UgJ3Jlc3VtZSc6XHJcbiAgICAgICAgICAgIHRoaXMucmVzdW1lKCk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwbGF5KCkge1xyXG4gICAgaWYgKCF0aGlzLmFkc0RvbmUpIHtcclxuICAgICAgdGhpcy5pbml0aWFsVXNlckFjdGlvbigpO1xyXG4gICAgICB0aGlzLmxvYWRBZHMoKTtcclxuICAgICAgdGhpcy5hZHNEb25lID0gdHJ1ZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHBhdXNlKCkge1xyXG4gICAgaWYgKHRoaXMuYWRzTWFuYWdlcikge1xyXG4gICAgICB0aGlzLmFkc01hbmFnZXIucGF1c2UoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJlc3VtZSgpIHtcclxuICAgIGlmICh0aGlzLmFkc01hbmFnZXIpIHtcclxuICAgICAgdGhpcy5hZHNNYW5hZ2VyLnJlc3VtZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc2V0VXBJTUEoKSB7XHJcbiAgICAvLyBDcmVhdGUgdGhlIGFkIGRpc3BsYXkgY29udGFpbmVyLlxyXG4gICAgdGhpcy5hZERpc3BsYXlDb250YWluZXIgPSBuZXcgZ29vZ2xlLmltYS5BZERpc3BsYXlDb250YWluZXIodGhpcy5hZENvbnRhaW5lciwgdGhpcy5jb250ZW50UGxheWVyKTtcclxuICAgIC8vIENyZWF0ZSBhZHMgbG9hZGVyLlxyXG4gICAgdGhpcy5hZHNMb2FkZXIgPSBuZXcgZ29vZ2xlLmltYS5BZHNMb2FkZXIodGhpcy5hZERpc3BsYXlDb250YWluZXIpO1xyXG4gICAgLy8gTGlzdGVuIGFuZCByZXNwb25kIHRvIGFkcyBsb2FkZWQgYW5kIGVycm9yIGV2ZW50cy5cclxuICAgIHRoaXMuYWRzTG9hZGVyLmFkZEV2ZW50TGlzdGVuZXIoXHJcbiAgICAgIGdvb2dsZS5pbWEuQWRzTWFuYWdlckxvYWRlZEV2ZW50LlR5cGUuQURTX01BTkFHRVJfTE9BREVELFxyXG4gICAgICBldmVudCA9PiB0aGlzLm9uQWRzTWFuYWdlckxvYWRlZChldmVudCksXHJcbiAgICAgIGZhbHNlKTtcclxuICAgIHRoaXMuYWRzTG9hZGVyLmFkZEV2ZW50TGlzdGVuZXIoXHJcbiAgICAgIGdvb2dsZS5pbWEuQWRFcnJvckV2ZW50LlR5cGUuQURfRVJST1IsXHJcbiAgICAgIGV2ZW50ID0+IHRoaXMub25BZEVycm9yKGV2ZW50KSxcclxuICAgICAgZmFsc2UpO1xyXG5cclxuICAgIC8vIEFuIGV2ZW50IGxpc3RlbmVyIHRvIHRlbGwgdGhlIFNESyB0aGF0IG91ciBjb250ZW50IHZpZGVvXHJcbiAgICAvLyBpcyBjb21wbGV0ZWQgc28gdGhlIFNESyBjYW4gcGxheSBhbnkgcG9zdC1yb2xsIGFkcy5cclxuICAgIHRoaXMuY29udGVudFBsYXllci5vbmVuZGVkID0gKCkgPT4ge1xyXG4gICAgICB0aGlzLmNvbnRlbnRFbmRlZCgpO1xyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIGluaXRpYWxVc2VyQWN0aW9uKCkge1xyXG4gICAgdGhpcy5hZERpc3BsYXlDb250YWluZXIuaW5pdGlhbGl6ZSgpO1xyXG4gICAgdGhpcy5jb250ZW50UGxheWVyLmxvYWQoKTtcclxuICB9XHJcblxyXG4gIHJlcXVlc3RBZHMoYWRUYWdVcmwpIHtcclxuICAgIGNvbnN0IGFkc1JlcXVlc3QgPSBuZXcgZ29vZ2xlLmltYS5BZHNSZXF1ZXN0KCk7XHJcbiAgICBhZHNSZXF1ZXN0LmFkVGFnVXJsID0gYWRUYWdVcmw7XHJcbiAgICBhZHNSZXF1ZXN0LmxpbmVhckFkU2xvdFdpZHRoID0gdGhpcy53aWR0aDtcclxuICAgIGFkc1JlcXVlc3QubGluZWFyQWRTbG90SGVpZ2h0ID0gdGhpcy5oZWlnaHQ7XHJcbiAgICBhZHNSZXF1ZXN0Lm5vbkxpbmVhckFkU2xvdFdpZHRoID0gdGhpcy53aWR0aDtcclxuICAgIGFkc1JlcXVlc3Qubm9uTGluZWFyQWRTbG90SGVpZ2h0ID0gdGhpcy5oZWlnaHQ7XHJcbiAgICB0aGlzLmFkc0xvYWRlci5yZXF1ZXN0QWRzKGFkc1JlcXVlc3QpO1xyXG4gIH1cclxuXHJcbiAgY29udGVudEVuZGVkKCkge1xyXG4gICAgdGhpcy5jb250ZW50Q29tcGxldGVDYWxsZWQgPSB0cnVlO1xyXG4gICAgdGhpcy5hZHNMb2FkZXIuY29udGVudENvbXBsZXRlKCk7XHJcbiAgfVxyXG5cclxuICBvbkFkc01hbmFnZXJMb2FkZWQoYWRzTWFuYWdlckxvYWRlZEV2ZW50KSB7XHJcbiAgICBjb25zdCBhZHNSZW5kZXJpbmdTZXR0aW5ncyA9IG5ldyBnb29nbGUuaW1hLkFkc1JlbmRlcmluZ1NldHRpbmdzKCk7XHJcbiAgICBhZHNSZW5kZXJpbmdTZXR0aW5ncy5yZXN0b3JlQ3VzdG9tUGxheWJhY2tTdGF0ZU9uQWRCcmVha0NvbXBsZXRlID0gdHJ1ZTtcclxuICAgIHRoaXMuYWRzTWFuYWdlciA9IGFkc01hbmFnZXJMb2FkZWRFdmVudC5nZXRBZHNNYW5hZ2VyKFxyXG4gICAgICB0aGlzLmNvbnRlbnRQbGF5ZXIsIGFkc1JlbmRlcmluZ1NldHRpbmdzKTtcclxuICAgIHRoaXMuc3RhcnRBZHNNYW5hZ2VyKHRoaXMuYWRzTWFuYWdlcik7XHJcbiAgfVxyXG5cclxuICBzdGFydEFkc01hbmFnZXIoYWRzTWFuYWdlcikge1xyXG4gICAgLy8gQXR0YWNoIHRoZSBwYXVzZS9yZXN1bWUgZXZlbnRzLlxyXG4gICAgYWRzTWFuYWdlci5hZGRFdmVudExpc3RlbmVyKFxyXG4gICAgICBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5DT05URU5UX1BBVVNFX1JFUVVFU1RFRCxcclxuICAgICAgKCkgPT4gdGhpcy5vbkNvbnRlbnRQYXVzZVJlcXVlc3RlZCgpLFxyXG4gICAgICBmYWxzZSxcclxuICAgICAgdGhpcyk7XHJcbiAgICBhZHNNYW5hZ2VyLmFkZEV2ZW50TGlzdGVuZXIoXHJcbiAgICAgIGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLkNPTlRFTlRfUkVTVU1FX1JFUVVFU1RFRCxcclxuICAgICAgKCkgPT4gdGhpcy5vbkNvbnRlbnRSZXN1bWVSZXF1ZXN0ZWQoKSxcclxuICAgICAgZmFsc2UsXHJcbiAgICAgIHRoaXMpO1xyXG4gICAgLy8gSGFuZGxlIGVycm9ycy5cclxuICAgIGFkc01hbmFnZXIuYWRkRXZlbnRMaXN0ZW5lcihcclxuICAgICAgZ29vZ2xlLmltYS5BZEVycm9yRXZlbnQuVHlwZS5BRF9FUlJPUixcclxuICAgICAgZXZlbnQgPT4gdGhpcy5vbkFkRXJyb3IoZXZlbnQpLFxyXG4gICAgICBmYWxzZSxcclxuICAgICAgdGhpcyk7XHJcbiAgICBjb25zdCBldmVudHMgPSBbZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuQUxMX0FEU19DT01QTEVURUQsXHJcbiAgICBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5DTElDSyxcclxuICAgIGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLkNPTVBMRVRFLFxyXG4gICAgZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuRklSU1RfUVVBUlRJTEUsXHJcbiAgICBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5MT0FERUQsXHJcbiAgICBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5NSURQT0lOVCxcclxuICAgIGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLlBBVVNFRCxcclxuICAgIGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLlNUQVJURUQsXHJcbiAgICBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5USElSRF9RVUFSVElMRV07XHJcbiAgICBldmVudHMuZm9yRWFjaChldmVudCA9PlxyXG4gICAgICBhZHNNYW5hZ2VyLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGFkRXZlbnQgPT4gdGhpcy5vbkFkRXZlbnQoYWRFdmVudCksIGZhbHNlKVxyXG4gICAgKTtcclxuXHJcbiAgICBhZHNNYW5hZ2VyLmluaXQoXHJcbiAgICAgIHRoaXMud2lkdGgsXHJcbiAgICAgIHRoaXMuaGVpZ2h0LFxyXG4gICAgICBnb29nbGUuaW1hLlZpZXdNb2RlLk5PUk1BTCk7XHJcblxyXG4gICAgYWRzTWFuYWdlci5zdGFydCgpO1xyXG4gIH1cclxuXHJcbiAgb25Db250ZW50UGF1c2VSZXF1ZXN0ZWQoKSB7XHJcbiAgICB0aGlzLnBhdXNlRm9yQWQoKTtcclxuICB9XHJcblxyXG4gIG9uQ29udGVudFJlc3VtZVJlcXVlc3RlZCgpIHtcclxuICAgIC8vIFdpdGhvdXQgdGhpcyBjaGVjayB0aGUgdmlkZW8gc3RhcnRzIG92ZXIgZnJvbSB0aGUgYmVnaW5uaW5nIG9uIGFcclxuICAgIC8vIHBvc3Qtcm9sbCdzIENPTlRFTlRfUkVTVU1FX1JFUVVFU1RFRFxyXG4gICAgaWYgKCF0aGlzLmNvbnRlbnRDb21wbGV0ZUNhbGxlZCkge1xyXG4gICAgICB0aGlzLnJlc3VtZUFmdGVyQWQoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG9uQWRFdmVudChhZEV2ZW50KSB7XHJcbiAgICBpZiAoYWRFdmVudC50eXBlID09PSBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5MT0FERUQpIHtcclxuICAgICAgY29uc3QgYWQgPSBhZEV2ZW50LmdldEFkKCk7XHJcbiAgICAgIGlmICghYWQuaXNMaW5lYXIoKSkge1xyXG4gICAgICAgIHRoaXMub25Db250ZW50UmVzdW1lUmVxdWVzdGVkKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHRoaXMuYWRFdmVudHMuZW1pdChhZEV2ZW50KTtcclxuICB9XHJcblxyXG4gIG9uQWRFcnJvcihhZEVycm9yRXZlbnQpIHtcclxuICAgIGlmICh0aGlzLmFkc01hbmFnZXIpIHtcclxuICAgICAgdGhpcy5hZHNNYW5hZ2VyLmRlc3Ryb3koKTtcclxuICAgIH1cclxuICAgIHRoaXMucmVzdW1lQWZ0ZXJBZCgpO1xyXG4gICAgdGhpcy5hZEV2ZW50cy5lbWl0KGFkRXJyb3JFdmVudCk7XHJcbiAgfVxyXG5cclxuICAvLyBhcHBsaWNhdGlvbiBmdW5jdGlvbnNcclxuXHJcbiAgcmVzdW1lQWZ0ZXJBZCgpIHtcclxuICAgIHRoaXMuY29udGVudFBsYXllci5wbGF5KCk7XHJcbiAgfVxyXG5cclxuICBwYXVzZUZvckFkKCkge1xyXG4gICAgdGhpcy5jb250ZW50UGxheWVyLnBhdXNlKCk7XHJcbiAgfVxyXG5cclxuICBsb2FkQWRzKCkge1xyXG4gICAgdGhpcy5yZXF1ZXN0QWRzKHRoaXMuYWRUYWcpO1xyXG4gIH1cclxuXHJcbn1cclxuIiwiaW1wb3J0IHtcclxuICBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsXHJcbiAgSW5wdXQsXHJcbiAgT25Jbml0LFxyXG4gIEluamVjdCxcclxuICBQTEFURk9STV9JRFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ2RmcC1hdWRpZW5jZS1waXhlbCdcclxufSlcclxuZXhwb3J0IGNsYXNzIERmcEF1ZGllbmNlUGl4ZWxEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQge1xyXG5cclxuICBASW5wdXQoKSBhZFVuaXQ6IHN0cmluZztcclxuICBASW5wdXQoKSBzZWdtZW50SWQ6IG51bWJlcjtcclxuICBASW5wdXQoKSBwcGlkOiBudW1iZXI7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgQEluamVjdChQTEFURk9STV9JRCkgcHJpdmF0ZSBwbGF0Zm9ybUlkOiBPYmplY3QsXHJcbiAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWZcclxuICApIHsgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XHJcbiAgICAgIGNvbnN0IGF4ZWwgPSBNYXRoLnJhbmRvbSgpLFxyXG4gICAgICAgIHJhbmRvbSA9IGF4ZWwgKiAxMDAwMDAwMDAwMDAwMDtcclxuXHJcbiAgICAgIGxldCBhZFVuaXQgPSAnJztcclxuICAgICAgaWYgKHRoaXMuYWRVbml0KSB7XHJcbiAgICAgICAgYWRVbml0ID0gYGRjX2l1PSR7dGhpcy5hZFVuaXR9YDtcclxuICAgICAgfVxyXG5cclxuICAgICAgbGV0IHBwaWQgPSAnJztcclxuICAgICAgaWYgKHRoaXMucHBpZCkge1xyXG4gICAgICAgIHBwaWQgPSBgcHBpZD0ke3RoaXMucHBpZH1gO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBwaXhlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xyXG5cclxuICAgICAgcGl4ZWwuc3JjID0gJ2h0dHBzOi8vcHViYWRzLmcuZG91YmxlY2xpY2submV0L2FjdGl2aXR5O29yZD0nO1xyXG4gICAgICBwaXhlbC5zcmMgKz0gYCR7cmFuZG9tfTtkY19zZWc9JHt0aGlzLnNlZ21lbnRJZH07JHthZFVuaXR9JHtwcGlkfWA7XHJcblxyXG4gICAgICBwaXhlbC53aWR0aCA9IDE7XHJcbiAgICAgIHBpeGVsLmhlaWdodCA9IDE7XHJcbiAgICAgIHBpeGVsLmJvcmRlciA9ICcwJztcclxuXHJcbiAgICAgIHBpeGVsLnN0eWxlLnZpc2liaWxpdHkgPSAnaGlkZGVuJztcclxuXHJcbiAgICAgIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmFwcGVuZChwaXhlbCk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IE5nTW9kdWxlLCBJbmplY3Rpb25Ub2tlbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBNb2R1bGVXaXRoUHJvdmlkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBEZnBDb25maWcsIH0gZnJvbSAnLi9jbGFzcyc7XHJcbmltcG9ydCB7IERGUF9DT05GSUcgfSBmcm9tICcuL3NlcnZpY2UvaW5qZWN0aW9uX3Rva2VuJztcclxuXHJcbmltcG9ydCB7IElkbGVTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlL2lkbGUuc2VydmljZSc7XHJcbmltcG9ydCB7IEh0dHBFcnJvclNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2UvaHR0cC1lcnJvci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgUGFyc2VEdXJhdGlvblNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2UvcGFyc2UtZHVyYXRpb24uc2VydmljZSc7XHJcbmltcG9ydCB7IFNjcmlwdEluamVjdG9yU2VydmljZSB9IGZyb20gJy4vc2VydmljZS9zY3JpcHQtaW5qZWN0b3Iuc2VydmljZSc7XHJcbmltcG9ydCB7IERmcFNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2UvZGZwLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBEZnBJREdlbmVyYXRvclNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2UvZGZwLWlkLWdlbmVyYXRvci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgRGZwUmVmcmVzaFNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2UvZGZwLXJlZnJlc2guc2VydmljZSc7XHJcblxyXG5pbXBvcnQgeyBEZnBBZERpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlL2RmcC1hZC5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBEZnBTaXplRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmUvZGZwLXNpemUuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgRGZwUmVzcG9uc2l2ZURpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlL2RmcC1yZXNwb25zaXZlLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IERmcEFkUmVzcG9uc2l2ZURpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlL2RmcC1hZC1yZXNwb25zaXZlLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IERmcFRhcmdldGluZ0RpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlL2RmcC10YXJnZXRpbmcuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgRGZwRXhjbHVzaW9uRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmUvZGZwLWV4Y2x1c2lvbi5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBEZnBWYWx1ZURpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlL2RmcC12YWx1ZS5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBEZnBWaWRlb0RpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlL2RmcC12aWRlby5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBEZnBBdWRpZW5jZVBpeGVsRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmUvZGZwLWF1ZGllbmNlLXBpeGVsLmRpcmVjdGl2ZSc7XHJcblxyXG5jb25zdCBESVJFQ1RJVkVTID0gW1xyXG4gIERmcEFkRGlyZWN0aXZlLFxyXG4gIERmcFNpemVEaXJlY3RpdmUsXHJcbiAgRGZwUmVzcG9uc2l2ZURpcmVjdGl2ZSxcclxuICBEZnBBZFJlc3BvbnNpdmVEaXJlY3RpdmUsXHJcbiAgRGZwVGFyZ2V0aW5nRGlyZWN0aXZlLCBEZnBFeGNsdXNpb25EaXJlY3RpdmUsIERmcFZhbHVlRGlyZWN0aXZlLFxyXG4gIERmcFZpZGVvRGlyZWN0aXZlLFxyXG4gIERmcEF1ZGllbmNlUGl4ZWxEaXJlY3RpdmVcclxuXTtcclxuXHJcbmNvbnN0IFNFUlZJQ0VTID0gW1xyXG4gIEh0dHBFcnJvclNlcnZpY2UsXHJcbiAgUGFyc2VEdXJhdGlvblNlcnZpY2UsXHJcbiAgU2NyaXB0SW5qZWN0b3JTZXJ2aWNlLFxyXG4gIERmcFNlcnZpY2UsIERmcElER2VuZXJhdG9yU2VydmljZSwgRGZwUmVmcmVzaFNlcnZpY2VcclxuXTtcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1xyXG5cclxuICBdLFxyXG4gIGRlY2xhcmF0aW9uczogW1xyXG4gICAgLi4uRElSRUNUSVZFU1xyXG4gIF0sXHJcbiAgcHJvdmlkZXJzOiBbXHJcbiAgICAuLi5TRVJWSUNFU1xyXG4gIF0sXHJcbiAgZXhwb3J0czogW1xyXG4gICAgLi4uRElSRUNUSVZFU1xyXG4gIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIERmcE1vZHVsZSB7XHJcbiAgc3RhdGljIGZvclJvb3QoY29uZmlnPzogRGZwQ29uZmlnKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBuZ01vZHVsZTogRGZwTW9kdWxlLFxyXG4gICAgICBwcm92aWRlcnM6IFtcclxuICAgICAgICAuLi4oY29uZmlnICYmIGNvbmZpZy5pZGxlTG9hZCA9PT0gdHJ1ZSA/IFtJZGxlU2VydmljZV0gOiBbXSksXHJcbiAgICAgICAgeyBwcm92aWRlOiBERlBfQ09ORklHLCB1c2VWYWx1ZTogY29uZmlnIHx8IHt9IH1cclxuICAgICAgXVxyXG4gICAgfTtcclxuICB9XHJcbn1cclxuIl0sIm5hbWVzIjpbIkluamVjdGlvblRva2VuIiwiaXNQbGF0Zm9ybUJyb3dzZXIiLCJJbmplY3RhYmxlIiwiSW5qZWN0IiwiUExBVEZPUk1fSUQiLCJOZ1pvbmUiLCJ0c2xpYl8xLl9fZXh0ZW5kcyIsIk9wdGlvbmFsIiwiRXZlbnRFbWl0dGVyIiwiZnJvbSIsInRpbWVyIiwiRE9DVU1FTlQiLCJJbmplY3RvciIsInJvdXRlciIsImZpbHRlciIsIk5hdmlnYXRpb25FbmQiLCJEaXJlY3RpdmUiLCJFbGVtZW50UmVmIiwiUm91dGVyIiwiSW5wdXQiLCJPdXRwdXQiLCJmb3J3YXJkUmVm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