import { InjectionToken, Injectable, NgZone, Inject, PLATFORM_ID, Optional, EventEmitter, Injector, Directive, ElementRef, Input, Output, forwardRef, HostListener, Renderer2, NgModule } from '@angular/core';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';
import { timer, from } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { loadImaSdk } from '@alugha/ima';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
const DFP_CONFIG = new InjectionToken('dfpConfig');

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class IdleService {
    /**
     * @param {?} platformId
     * @param {?} zone
     */
    constructor(platformId, zone) {
        /** @type {?} */
        const win = isPlatformBrowser(platformId) ? window : {};
        if (win.requestIdleCallback) {
            this.requestIdleCallback = (fun) => {
                return win.requestIdleCallback(fun);
            };
        }
        else {
            this.requestIdleCallback = (fun) => {
                return zone.runOutsideAngular(() => win.setTimeout(fun, 50));
            };
        }
    }
    /**
     * @param {?} fun
     * @return {?}
     */
    request(fun) {
        this.requestIdleCallback(fun);
    }
}
IdleService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
IdleService.ctorParameters = () => [
    { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] },
    { type: NgZone }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class HttpErrorService {
    constructor() {
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
    httpError(response, message) {
        console.log(`Error (${response.status}) ${message ? message : ''}`);
    }
}
HttpErrorService.decorators = [
    { type: Injectable },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class DFPDurationError extends Error {
    /**
     * @param {?} interval
     */
    constructor(interval) {
        super(`Invalid interval: '${interval}'ls`);
    }
}
class ParseDurationService {
    /**
     * @param {?} time
     * @param {?} unit
     * @return {?}
     */
    convertToMilliseconds(time, unit) {
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
    }
    /**
     * @param {?} match
     * @return {?}
     */
    convert(match) {
        /** @type {?} */
        const time = parseFloat(match[1]);
        if (match.length === 2) {
            return time;
        }
        return this.convertToMilliseconds(time, match[2]);
    }
    /**
     * @param {?} interval
     * @return {?}
     */
    parseDuration(interval) {
        if (interval === undefined || interval === null) {
            throw new DFPDurationError(interval);
        }
        if (typeof interval === 'number') {
            return interval;
        }
        if (typeof interval !== 'string') {
            throw new TypeError(`'${interval}' must be of number or string type`);
        }
        /** @type {?} */
        const match = interval.match(/((?:\d+)?.?\d+)(m?s|min|h)?/);
        if (!match) {
            throw new DFPDurationError(interval);
        }
        return this.convert(match);
    }
}
ParseDurationService.decorators = [
    { type: Injectable },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class ScriptInjectorService {
    /**
     * @param {?} httpError
     */
    constructor(httpError) {
        this.httpError = httpError;
    }
    /**
     * @param {?} url
     * @return {?}
     */
    completeURL(url) {
        /** @type {?} */
        const ssl = document.location.protocol === 'https:';
        return (ssl ? 'https:' : 'http:') + url;
    }
    /**
     * @param {?} url
     * @return {?}
     */
    createScript(url) {
        /** @type {?} */
        const script = document.createElement('script');
        script.async = true;
        script.type = 'text/javascript';
        script.src = this.completeURL(url);
        return script;
    }
    /**
     * @param {?} script
     * @param {?} url
     * @return {?}
     */
    promiseScript(script, url) {
        /** @type {?} */
        const promise = new Promise((resolve, reject) => {
            script.onload = () => {
                resolve(script);
            };
            script.onerror = () => {
                reject({
                    path: url,
                    loaded: false
                });
            };
        });
        promise.catch(response => {
            this.httpError.httpError({ status: 400 }, `loading script "${url}"`);
        });
        return promise;
    }
    /**
     * @param {?} script
     * @return {?}
     */
    injectScript(script) {
        /** @type {?} */
        const head = document.head || document.querySelector('head');
        head.appendChild(script);
    }
    /**
     * @param {?} url
     * @return {?}
     */
    scriptInjector(url) {
        /** @type {?} */
        const script = this.createScript(url);
        this.injectScript(script);
        return this.promiseScript(script, url);
    }
}
ScriptInjectorService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
ScriptInjectorService.ctorParameters = () => [
    { type: HttpErrorService }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class DFPIncompleteError extends Error {
    /**
     * @param {?} directiveName
     * @param {?} missingName
     * @param {?=} isAttribute
     */
    constructor(directiveName, missingName, isAttribute) {
        super(`Incomplete definition of '${directiveName}': ` +
            `Missing ${isAttribute ? 'attribute' : 'child directive'} ` +
            `'${missingName}'.`);
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class DfpConfig {
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
const GPT_LIBRARY_URL = '//www.googletagservices.com/tag/js/gpt.js';
class DFPConfigurationError extends Error {
}
class DfpService {
    /**
     * @param {?} platformId
     * @param {?} idleLoad
     * @param {?} config
     * @param {?} scriptInjector
     */
    constructor(platformId, idleLoad, config, scriptInjector) {
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
        if (isPlatformBrowser(this.platformId)) {
            /** @type {?} */
            const win = window;
            /** @type {?} */
            const googletag = win.googletag || {};
            this.dfpConfig();
            googletag.cmd = googletag.cmd || [];
            googletag.cmd.push(() => {
                this.setup();
            });
            win.googletag = googletag;
            if (this.loadGPT) {
                /** @type {?} */
                const loadScript = () => {
                    this.scriptInjector.scriptInjector(GPT_LIBRARY_URL).then((script) => {
                        this.loaded = true;
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
    dfpConfig() {
        for (const key in this.config) {
            if (this.hasOwnProperty(key)) {
                this[key] = this.config[key];
            }
        }
    }
    /**
     * @param {?} pubads
     * @return {?}
     */
    addSafeFrameConfig(pubads) {
        if (!this.safeFrameConfig) {
            return false;
        }
        if (typeof this.safeFrameConfig !== 'object') {
            throw new DFPConfigurationError('FrameConfig must be an object');
        }
        pubads.setSafeFrameConfig(this.safeFrameConfig);
    }
    /**
     * @param {?} pubads
     * @return {?}
     */
    addTargeting(pubads) {
        if (!this.globalTargeting) {
            return false;
        }
        if (typeof this.globalTargeting !== 'object') {
            throw new DFPConfigurationError('Targeting must be an object');
        }
        for (const key in this.globalTargeting) {
            if (this.globalTargeting.hasOwnProperty(key)) {
                pubads.setTargeting(key, this.globalTargeting[key]);
            }
        }
    }
    /**
     * @param {?} pubads
     * @return {?}
     */
    addLocation(pubads) {
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
    }
    /**
     * @param {?} pubads
     * @return {?}
     */
    addPPID(pubads) {
        if (!this.ppid) {
            return false;
        }
        if (typeof this.ppid !== 'string') {
            throw new DFPConfigurationError('PPID must be a string');
        }
        pubads.setPublisherProvidedId(this.ppid);
    }
    /**
     * @return {?}
     */
    setup() {
        /** @type {?} */
        const win = window;
        /** @type {?} */
        const googletag = win.googletag;
        /** @type {?} */
        const pubads = googletag.pubads();
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
    }
    /**
     * @return {?}
     */
    hasLoaded() {
        return this.loaded;
    }
    /**
     * @param {?} task
     * @return {?}
     */
    defineTask(task) {
        if (isPlatformBrowser(this.platformId)) {
            /** @type {?} */
            const win = window;
            /** @type {?} */
            const googletag = win.googletag;
            googletag.cmd.push(task);
        }
    }
}
DfpService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
DfpService.ctorParameters = () => [
    { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] },
    { type: IdleService, decorators: [{ type: Optional }] },
    { type: DfpConfig, decorators: [{ type: Inject, args: [DFP_CONFIG,] }] },
    { type: ScriptInjectorService }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class DfpIDGeneratorService {
    constructor() {
        this.generatedIDs = {};
    }
    /**
     * @return {?}
     */
    generateID() {
        /** @type {?} */
        let id = null;
        do {
            /** @type {?} */
            const number = Math.random().toString().slice(2);
            id = 'gpt-ad-' + number;
        } while (id in this.generatedIDs);
        this.generatedIDs[id] = true;
        return id;
    }
    /**
     * @param {?} element
     * @return {?}
     */
    dfpIDGenerator(element) {
        if (element && element.id && !(element.id in this.generatedIDs)) {
            return element.id;
        }
        /** @type {?} */
        const id = this.generateID();
        if (element) {
            element.id = id;
        }
        return id;
    }
    /**
     * @param {?} id
     * @return {?}
     */
    isTaken(id) {
        return id in this.generatedIDs;
    }
    /**
     * @param {?} id
     * @return {?}
     */
    isUnique(id) {
        return !this.isTaken(id);
    }
}
DfpIDGeneratorService.decorators = [
    { type: Injectable },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class DFPRefreshError extends Error {
}
class DfpRefreshService {
    /**
     * @param {?} config
     * @param {?} inject
     * @param {?} parseDuration
     */
    constructor(config, inject, parseDuration) {
        this.config = config;
        this.inject = inject;
        this.parseDuration = parseDuration;
        this.refreshEvent = new EventEmitter();
        this.refreshSlots = [];
        this.intervals = {};
    }
    /**
     * @param {?} slot
     * @param {?=} refreshInterval
     * @param {?=} initRefresh
     * @return {?}
     */
    slotRefresh(slot, refreshInterval, initRefresh = false) {
        /** @type {?} */
        const deferred = from([slot]).toPromise();
        /** @type {?} */
        const task = { slot: slot, deferred: deferred };
        deferred.then(() => {
            if (this.hasSlotInterval(slot)) {
                this.cancelInterval(slot);
            }
            if (refreshInterval) {
                this.addSlotInterval(task, refreshInterval);
            }
        });
        if (this.config.singleRequestMode === true && initRefresh) {
            // Use a timer to handle refresh of a single request mode
            this.refreshSlots.push(slot);
            if (this.singleRequest && !this.singleRequest.closed) {
                this.singleRequest.unsubscribe();
            }
            this.singleRequest = timer(100).subscribe(() => {
                /** @type {?} */
                const pubads = googletag.pubads();
                pubads.enableSingleRequest();
                googletag.enableServices();
                this.refreshSlots.forEach(s => {
                    googletag.display(s.getSlotElementId());
                });
                pubads.refresh(this.refreshSlots);
                this.refreshSlots = [];
            });
        }
        else {
            googletag.display(slot.getSlotElementId());
            this.refresh([task]);
        }
        return deferred;
    }
    /**
     * @param {?} slot
     * @return {?}
     */
    cancelInterval(slot) {
        if (!this.hasSlotInterval(slot)) {
            throw new DFPRefreshError('No interval for given slot');
        }
        /** @type {?} */
        const interval = this.intervals[this.slotIntervalKey(slot)];
        interval.unsubscribe();
        delete this.intervals[slot];
        return this;
    }
    /**
     * @param {?} slot
     * @return {?}
     */
    hasSlotInterval(slot) {
        return this.slotIntervalKey(slot) in this.intervals;
    }
    /**
     * @param {?=} tasks
     * @return {?}
     */
    refresh(tasks) {
        if (tasks === undefined) {
            googletag.cmd.push(() => {
                googletag.pubads().refresh();
            });
            return;
        }
        if (tasks.length === 0) {
            return false;
        }
        googletag.cmd.push(() => {
            googletag.pubads().refresh(tasks.map(task => task.slot));
            tasks.forEach(task => {
                Promise.resolve(task.slot);
            });
        });
    }
    /**
     * @param {?} task
     * @param {?} interval
     * @return {?}
     */
    addSlotInterval(task, interval) {
        /** @type {?} */
        const parsedInterval = this.parseDuration.parseDuration(interval);
        this.validateInterval(parsedInterval, interval);
        /** @type {?} */
        const refresh = timer(parsedInterval, parsedInterval).subscribe(() => {
            /** @type {?} */
            const doc = this.inject.get(DOCUMENT);
            if (!this.hiddenCheck(doc.getElementById(task.slot.getSlotElementId()))) {
                this.refresh([task]);
                this.refreshEvent.emit(task.slot);
            }
        });
        this.intervals[this.slotIntervalKey(task.slot)] = refresh;
        return refresh;
    }
    /**
     * @param {?} slot
     * @return {?}
     */
    slotIntervalKey(slot) {
        return slot.getSlotId().getDomId();
    }
    /**
     * @param {?} milliseconds
     * @param {?} beforeParsing
     * @return {?}
     */
    validateInterval(milliseconds, beforeParsing) {
        if (milliseconds < 1000) {
            console.warn('Careful: ${beforeParsing} is quite a low interval!');
        }
    }
    /**
     * @param {?} element
     * @return {?}
     */
    hiddenCheck(element) {
        if (typeof (window) !== 'undefined') {
            /** @type {?} */
            const css = window.getComputedStyle(element);
            if (css.display === 'none') {
                return true;
            }
            else if (element.parentElement) {
                return this.hiddenCheck(element.parentElement);
            }
        }
        return false;
    }
}
DfpRefreshService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
DfpRefreshService.ctorParameters = () => [
    { type: DfpConfig, decorators: [{ type: Optional }, { type: Inject, args: [DFP_CONFIG,] }] },
    { type: Injector },
    { type: ParseDurationService }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class DfpAdDirective {
    /**
     * @param {?} platformId
     * @param {?} elementRef
     * @param {?} dfp
     * @param {?} dfpIDGenerator
     * @param {?} dfpRefresh
     * @param {?} config
     * @param {?} router
     */
    constructor(platformId, elementRef, dfp, dfpIDGenerator, dfpRefresh, config, router) {
        this.platformId = platformId;
        this.elementRef = elementRef;
        this.dfp = dfp;
        this.dfpIDGenerator = dfpIDGenerator;
        this.dfpRefresh = dfpRefresh;
        this.config = config;
        this.afterRefresh = new EventEmitter();
        this.sizes = [];
        this.responsiveMapping = [];
        this.targetings = [];
        this.exclusions = [];
        this.scripts = [];
        if (isPlatformBrowser(this.platformId)) {
            this.dfpRefresh.refreshEvent.subscribe(slot => {
                if (slot === this.slot) {
                    this.afterRefresh.emit({ type: 'refresh', slot: slot });
                }
            });
            if (router) {
                this.onSameNavigation = router.events.pipe(filter(event => event instanceof NavigationEnd))
                    .subscribe((event) => {
                    if (this.slot && !this.refresh && this.config.onSameNavigation === 'refresh') {
                        this.refreshContent.call(this);
                    }
                });
            }
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (isPlatformBrowser(this.platformId)) {
            this.dfpIDGenerator.dfpIDGenerator(this.elementRef.nativeElement);
        }
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        if (isPlatformBrowser(this.platformId)) {
            this.dfp.defineTask(() => {
                this.defineSlot();
            });
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this.slot) {
            googletag.destroySlots([this.slot]);
        }
        if (this.onSameNavigation) {
            this.onSameNavigation.unsubscribe();
        }
    }
    /**
     * @param {?} slot
     * @return {?}
     */
    setResponsiveMapping(slot) {
        /** @type {?} */
        const ad = this.getState();
        if (ad.responsiveMapping.length === 0) {
            return;
        }
        /** @type {?} */
        const sizeMapping = googletag.sizeMapping();
        ad.responsiveMapping.forEach(mapping => {
            sizeMapping.addSize(mapping.viewportSize, mapping.adSizes);
        });
        slot.defineSizeMapping(sizeMapping.build());
    }
    /**
     * @return {?}
     */
    defineSlot() {
        /** @type {?} */
        const ad = this.getState();
        /** @type {?} */
        const element = this.elementRef.nativeElement;
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
        this.slot.renderEnded = (googleSlotEvent) => {
            this.afterRefresh.emit({ type: 'renderEnded', slot: this.slot, data: googleSlotEvent });
        };
        this.setResponsiveMapping(this.slot);
        ad.targetings.forEach(targeting => {
            this.slot.setTargeting(targeting.key, targeting.values);
        });
        ad.exclusions.forEach(exclusion => {
            this.slot.setCategoryExclusion(exclusion);
        });
        ad.scripts.forEach(script => { script(this.slot); });
        if (this.config.enableVideoAds) {
            this.slot.addService(googletag.companionAds());
        }
        this.slot.addService(googletag.pubads());
        this.refreshContent();
    }
    /**
     * @return {?}
     */
    refreshContent() {
        this.dfpRefresh.slotRefresh(this.slot, this.refresh, true).then(slot => {
            this.afterRefresh.emit({ type: 'init', slot: slot });
        });
    }
    /**
     * @return {?}
     */
    checkValid() {
        if (this.sizes.length === 0) {
            throw new DFPIncompleteError('dfp-ad', 'dfp-size');
        }
        if (!this.adUnit) {
            throw new DFPIncompleteError('dfp-ad', 'ad-unit', true);
        }
    }
    /**
     * @return {?}
     */
    get isHidden() {
        return this.dfpRefresh.hiddenCheck(this.elementRef.nativeElement);
    }
    /**
     * @return {?}
     */
    getState() {
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
    }
    /**
     * @param {?} size
     * @return {?}
     */
    addSize(size) {
        this.sizes.push(size);
    }
    /**
     * @param {?} mapping
     * @return {?}
     */
    addResponsiveMapping(mapping) {
        this.responsiveMapping.push(mapping);
    }
    /**
     * @param {?} targeting
     * @return {?}
     */
    addTargeting(targeting) {
        this.targetings.push(targeting);
    }
    /**
     * @param {?} exclusion
     * @return {?}
     */
    addExclusion(exclusion) {
        this.exclusions.push(exclusion);
    }
    /**
     * @param {?} script
     * @return {?}
     */
    addScript(script) {
        this.scripts.push(script);
    }
}
DfpAdDirective.decorators = [
    { type: Directive, args: [{
                selector: 'dfp-ad'
            },] },
];
/** @nocollapse */
DfpAdDirective.ctorParameters = () => [
    { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] },
    { type: ElementRef },
    { type: DfpService },
    { type: DfpIDGeneratorService },
    { type: DfpRefreshService },
    { type: DfpConfig, decorators: [{ type: Inject, args: [DFP_CONFIG,] }] },
    { type: Router, decorators: [{ type: Optional }] }
];
DfpAdDirective.propDecorators = {
    adUnit: [{ type: Input }],
    clickUrl: [{ type: Input }],
    forceSafeFrame: [{ type: Input }],
    safeFrameConfig: [{ type: Input }],
    refresh: [{ type: Input }],
    collapseIfEmpty: [{ type: Input }],
    afterRefresh: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class DfpAdResponsiveDirective {
    /**
     * @param {?} elementRef
     * @param {?} ad
     * @param {?} dfpRefresh
     */
    constructor(elementRef, ad, dfpRefresh) {
        this.elementRef = elementRef;
        this.ad = ad;
        this.dfpRefresh = dfpRefresh;
        this.ad.afterRefresh.subscribe(event => {
            this.slot = event.slot;
        });
    }
    /**
     * @return {?}
     */
    normalizeIframe() {
        if (this.ad.isHidden) {
            return false;
        }
        this.iframe = this.iframe || this.getIframe();
        if (!this.iframe) {
            return false;
        }
        this.iframeWidth = this.iframeWidth || +this.iframe.width;
        /** @type {?} */
        const winWidth = window.innerWidth;
        /** @type {?} */
        let state = this.ad.getState();
        /** @type {?} */
        let width = 0;
        state.sizes.forEach(size => {
            if (size[0] < winWidth) {
                width = Math.max(width, size[0]);
            }
        });
        if (state.sizes.length > 1 && width !== this.iframeWidth) {
            state = this.ad.getState();
            this.iframeWidth = width;
            this.iframe.setAttribute('width', width + '');
            this.dfpRefresh.slotRefresh(this.slot, state.refresh).then(slot => {
                this.ad.afterRefresh.emit({ type: 'resize', slot: slot });
                this.iframe = this.getIframe();
            });
        }
    }
    /**
     * @return {?}
     */
    getIframe() {
        /** @type {?} */
        const ad = this.elementRef.nativeElement;
        /** @type {?} */
        const iframe = ad.querySelector('iframe');
        if (iframe && +iframe.width > 0) {
            return iframe;
        }
    }
}
DfpAdResponsiveDirective.decorators = [
    { type: Directive, args: [{
                selector: 'dfp-ad[responsive]'
            },] },
];
/** @nocollapse */
DfpAdResponsiveDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: DfpAdDirective, decorators: [{ type: Inject, args: [forwardRef(() => DfpAdDirective),] }] },
    { type: DfpRefreshService }
];
DfpAdResponsiveDirective.propDecorators = {
    normalizeIframe: [{ type: HostListener, args: ['window:resize',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class DfpResponsiveDirective {
    /**
     * @param {?} ad
     */
    constructor(ad) {
        this.ad = ad;
        this.viewport = [0, 0];
        this.adSizes = [];
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.ad.addResponsiveMapping(this.getState());
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set viewWidth(val) {
        if (val > 0) {
            this.viewport[0] = val;
        }
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set viewHeight(val) {
        if (val > 0) {
            this.viewport[1] = val;
        }
    }
    /**
     * @param {?} size
     * @return {?}
     */
    addSize(size) {
        this.adSizes.push(size);
    }
    /**
     * @return {?}
     */
    getState() {
        return Object.freeze({
            viewportSize: this.viewport,
            adSizes: this.adSizes
        });
    }
}
DfpResponsiveDirective.decorators = [
    { type: Directive, args: [{
                selector: 'dfp-responsive'
            },] },
];
/** @nocollapse */
DfpResponsiveDirective.ctorParameters = () => [
    { type: DfpAdDirective, decorators: [{ type: Inject, args: [forwardRef(() => DfpAdDirective),] }] }
];
DfpResponsiveDirective.propDecorators = {
    viewport: [{ type: Input }],
    adSizes: [{ type: Input }],
    viewWidth: [{ type: Input }],
    viewHeight: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class DfpSizeDirective {
    /**
     * @param {?} elementRef
     * @param {?} ad
     * @param {?} resp
     */
    constructor(elementRef, ad, resp) {
        this.elementRef = elementRef;
        this.ad = ad;
        this.resp = resp;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        /** @type {?} */
        const target = this.resp || this.ad;
        /** @type {?} */
        const innerText = this.elementRef.nativeElement.innerText;
        if (this.width && this.height) {
            target.addSize([this.width, this.height]);
        }
        else if (innerText.trim() !== '') {
            target.addSize(innerText);
        }
    }
}
DfpSizeDirective.decorators = [
    { type: Directive, args: [{
                selector: 'dfp-size'
            },] },
];
/** @nocollapse */
DfpSizeDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: DfpAdDirective, decorators: [{ type: Inject, args: [forwardRef(() => DfpAdDirective),] }] },
    { type: DfpResponsiveDirective, decorators: [{ type: Optional }, { type: Inject, args: [forwardRef(() => DfpResponsiveDirective),] }] }
];
DfpSizeDirective.propDecorators = {
    width: [{ type: Input }],
    height: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class DfpTargetingDirective {
    /**
     * @param {?} ad
     */
    constructor(ad) {
        this.ad = ad;
        this.values = [];
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set value(val) {
        if (val instanceof Array) {
            val.forEach(v => this.addValue(v));
        }
        else {
            this.addValue(val);
        }
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        /** @type {?} */
        const targeting = this.getState();
        this.ad.addTargeting(targeting);
    }
    /**
     * @return {?}
     */
    checkValid() {
        if (this.key === undefined) {
            throw new DFPIncompleteError('dfp-targeting', 'key', true);
        }
        if (this.values.length === 0) {
            throw new DFPIncompleteError('dfp-targeting', 'value', true);
        }
    }
    /**
     * @return {?}
     */
    getState() {
        this.checkValid();
        return Object.freeze({
            key: this.key,
            values: this.values
        });
    }
    /**
     * @param {?} value
     * @return {?}
     */
    addValue(value) {
        if (value && !this.values.find(item => item === value)) {
            this.values.push(value);
        }
    }
}
DfpTargetingDirective.decorators = [
    { type: Directive, args: [{
                selector: 'dfp-targeting'
            },] },
];
/** @nocollapse */
DfpTargetingDirective.ctorParameters = () => [
    { type: DfpAdDirective, decorators: [{ type: Inject, args: [forwardRef(() => DfpAdDirective),] }] }
];
DfpTargetingDirective.propDecorators = {
    key: [{ type: Input }],
    value: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class DfpExclusionDirective {
    /**
     * @param {?} elementRef
     * @param {?} ad
     */
    constructor(elementRef, ad) {
        this.elementRef = elementRef;
        this.ad = ad;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.ad.addExclusion(this.elementRef.nativeElement.innerText);
    }
}
DfpExclusionDirective.decorators = [
    { type: Directive, args: [{
                selector: 'dfp-exclusion'
            },] },
];
/** @nocollapse */
DfpExclusionDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: DfpAdDirective, decorators: [{ type: Inject, args: [forwardRef(() => DfpAdDirective),] }] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class DfpValueDirective {
    /**
     * @param {?} elementRef
     * @param {?} targeting
     */
    constructor(elementRef, targeting) {
        this.elementRef = elementRef;
        this.targeting = targeting;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.targeting.addValue(this.elementRef.nativeElement.innerText);
    }
}
DfpValueDirective.decorators = [
    { type: Directive, args: [{
                selector: 'dfp-value'
            },] },
];
/** @nocollapse */
DfpValueDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: DfpTargetingDirective, decorators: [{ type: Inject, args: [forwardRef(() => DfpTargetingDirective),] }] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class DfpVideoDirective {
    /**
     * @param {?} platformId
     * @param {?} elementRef
     * @param {?} renderer
     * @param {?} dfpIDGenerator
     */
    constructor(platformId, elementRef, renderer, dfpIDGenerator) {
        this.platformId = platformId;
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.dfpIDGenerator = dfpIDGenerator;
        this.adEvents = new EventEmitter();
        this.adsDone = false;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (isPlatformBrowser(this.platformId)) {
            /** @type {?} */
            const el = this.elementRef.nativeElement;
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
            loadImaSdk().then(() => this.setUpIMA());
            // simple control
            this.adActions.subscribe(act => {
                switch (act) {
                    case 'play':
                        this.play();
                        break;
                    case 'pause':
                        this.pause();
                        break;
                    case 'resume':
                        this.resume();
                        break;
                }
            });
        }
    }
    /**
     * @return {?}
     */
    play() {
        if (!this.adsDone) {
            this.initialUserAction();
            this.loadAds();
            this.adsDone = true;
        }
    }
    /**
     * @return {?}
     */
    pause() {
        if (this.adsManager) {
            this.adsManager.pause();
        }
    }
    /**
     * @return {?}
     */
    resume() {
        if (this.adsManager) {
            this.adsManager.resume();
        }
    }
    /**
     * @return {?}
     */
    setUpIMA() {
        // Create the ad display container.
        this.adDisplayContainer = new google.ima.AdDisplayContainer(this.adContainer, this.contentPlayer);
        // Create ads loader.
        this.adsLoader = new google.ima.AdsLoader(this.adDisplayContainer);
        // Listen and respond to ads loaded and error events.
        this.adsLoader.addEventListener(google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED, event => this.onAdsManagerLoaded(event), false);
        this.adsLoader.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, event => this.onAdError(event), false);
        // An event listener to tell the SDK that our content video
        // is completed so the SDK can play any post-roll ads.
        this.contentPlayer.onended = () => {
            this.contentEnded();
        };
    }
    /**
     * @return {?}
     */
    initialUserAction() {
        this.adDisplayContainer.initialize();
        this.contentPlayer.load();
    }
    /**
     * @param {?} adTagUrl
     * @return {?}
     */
    requestAds(adTagUrl) {
        /** @type {?} */
        const adsRequest = new google.ima.AdsRequest();
        adsRequest.adTagUrl = adTagUrl;
        adsRequest.linearAdSlotWidth = this.width;
        adsRequest.linearAdSlotHeight = this.height;
        adsRequest.nonLinearAdSlotWidth = this.width;
        adsRequest.nonLinearAdSlotHeight = this.height;
        this.adsLoader.requestAds(adsRequest);
    }
    /**
     * @return {?}
     */
    contentEnded() {
        this.contentCompleteCalled = true;
        this.adsLoader.contentComplete();
    }
    /**
     * @param {?} adsManagerLoadedEvent
     * @return {?}
     */
    onAdsManagerLoaded(adsManagerLoadedEvent) {
        /** @type {?} */
        const adsRenderingSettings = new google.ima.AdsRenderingSettings();
        adsRenderingSettings.restoreCustomPlaybackStateOnAdBreakComplete = true;
        this.adsManager = adsManagerLoadedEvent.getAdsManager(this.contentPlayer, adsRenderingSettings);
        this.startAdsManager(this.adsManager);
    }
    /**
     * @param {?} adsManager
     * @return {?}
     */
    startAdsManager(adsManager) {
        // Attach the pause/resume events.
        adsManager.addEventListener(google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED, () => this.onContentPauseRequested(), false, this);
        adsManager.addEventListener(google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED, () => this.onContentResumeRequested(), false, this);
        // Handle errors.
        adsManager.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, event => this.onAdError(event), false, this);
        /** @type {?} */
        const events = [google.ima.AdEvent.Type.ALL_ADS_COMPLETED,
            google.ima.AdEvent.Type.CLICK,
            google.ima.AdEvent.Type.COMPLETE,
            google.ima.AdEvent.Type.FIRST_QUARTILE,
            google.ima.AdEvent.Type.LOADED,
            google.ima.AdEvent.Type.MIDPOINT,
            google.ima.AdEvent.Type.PAUSED,
            google.ima.AdEvent.Type.STARTED,
            google.ima.AdEvent.Type.THIRD_QUARTILE];
        events.forEach(event => adsManager.addEventListener(event, adEvent => this.onAdEvent(adEvent), false));
        adsManager.init(this.width, this.height, google.ima.ViewMode.NORMAL);
        adsManager.start();
    }
    /**
     * @return {?}
     */
    onContentPauseRequested() {
        this.pauseForAd();
    }
    /**
     * @return {?}
     */
    onContentResumeRequested() {
        // Without this check the video starts over from the beginning on a
        // post-roll's CONTENT_RESUME_REQUESTED
        if (!this.contentCompleteCalled) {
            this.resumeAfterAd();
        }
    }
    /**
     * @param {?} adEvent
     * @return {?}
     */
    onAdEvent(adEvent) {
        if (adEvent.type === google.ima.AdEvent.Type.LOADED) {
            /** @type {?} */
            const ad = adEvent.getAd();
            if (!ad.isLinear()) {
                this.onContentResumeRequested();
            }
        }
        this.adEvents.emit(adEvent);
    }
    /**
     * @param {?} adErrorEvent
     * @return {?}
     */
    onAdError(adErrorEvent) {
        if (this.adsManager) {
            this.adsManager.destroy();
        }
        this.resumeAfterAd();
        this.adEvents.emit(adErrorEvent);
    }
    /**
     * @return {?}
     */
    resumeAfterAd() {
        this.contentPlayer.play();
    }
    /**
     * @return {?}
     */
    pauseForAd() {
        this.contentPlayer.pause();
    }
    /**
     * @return {?}
     */
    loadAds() {
        this.requestAds(this.adTag);
    }
}
DfpVideoDirective.decorators = [
    { type: Directive, args: [{
                selector: 'dfp-video'
            },] },
];
/** @nocollapse */
DfpVideoDirective.ctorParameters = () => [
    { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] },
    { type: ElementRef },
    { type: Renderer2 },
    { type: DfpIDGeneratorService }
];
DfpVideoDirective.propDecorators = {
    width: [{ type: Input }],
    height: [{ type: Input }],
    adTag: [{ type: Input }],
    adActions: [{ type: Input }],
    adEvents: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class DfpAudiencePixelDirective {
    /**
     * @param {?} platformId
     * @param {?} elementRef
     */
    constructor(platformId, elementRef) {
        this.platformId = platformId;
        this.elementRef = elementRef;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (isPlatformBrowser(this.platformId)) {
            /** @type {?} */
            const axel = Math.random();
            /** @type {?} */
            const random = axel * 10000000000000;
            /** @type {?} */
            let adUnit = '';
            if (this.adUnit) {
                adUnit = `dc_iu=${this.adUnit}`;
            }
            /** @type {?} */
            let ppid = '';
            if (this.ppid) {
                ppid = `ppid=${this.ppid}`;
            }
            /** @type {?} */
            const pixel = document.createElement('img');
            pixel.src = 'https://pubads.g.doubleclick.net/activity;ord=';
            pixel.src += `${random};dc_seg=${this.segmentId};${adUnit}${ppid}`;
            pixel.width = 1;
            pixel.height = 1;
            pixel.border = '0';
            pixel.style.visibility = 'hidden';
            this.elementRef.nativeElement.append(pixel);
        }
    }
}
DfpAudiencePixelDirective.decorators = [
    { type: Directive, args: [{
                selector: 'dfp-audience-pixel'
            },] },
];
/** @nocollapse */
DfpAudiencePixelDirective.ctorParameters = () => [
    { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] },
    { type: ElementRef }
];
DfpAudiencePixelDirective.propDecorators = {
    adUnit: [{ type: Input }],
    segmentId: [{ type: Input }],
    ppid: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
const DIRECTIVES = [
    DfpAdDirective,
    DfpSizeDirective,
    DfpResponsiveDirective,
    DfpAdResponsiveDirective,
    DfpTargetingDirective, DfpExclusionDirective, DfpValueDirective,
    DfpVideoDirective,
    DfpAudiencePixelDirective
];
/** @type {?} */
const SERVICES = [
    HttpErrorService,
    ParseDurationService,
    ScriptInjectorService,
    DfpService, DfpIDGeneratorService, DfpRefreshService
];
class DfpModule {
    /**
     * @param {?=} config
     * @return {?}
     */
    static forRoot(config) {
        return {
            ngModule: DfpModule,
            providers: [
                ...(config && config.idleLoad === true ? [IdleService] : []),
                { provide: DFP_CONFIG, useValue: config || {} }
            ]
        };
    }
}
DfpModule.decorators = [
    { type: NgModule, args: [{
                imports: [],
                declarations: [
                    ...DIRECTIVES
                ],
                providers: [
                    ...SERVICES
                ],
                exports: [
                    ...DIRECTIVES
                ]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

export { DFP_CONFIG, IdleService, HttpErrorService, ParseDurationService, ScriptInjectorService, DfpService, DfpIDGeneratorService, DfpRefreshService, DfpModule, DfpAdDirective, DfpAdResponsiveDirective, DfpResponsiveDirective, DfpSizeDirective, DfpTargetingDirective, DfpExclusionDirective, DfpValueDirective, DfpVideoDirective, DfpAudiencePixelDirective, DfpConfig as ɵa, DfpAdResponsiveDirective as ɵe, DfpAdDirective as ɵb, DfpAudiencePixelDirective as ɵj, DfpExclusionDirective as ɵg, DfpResponsiveDirective as ɵd, DfpSizeDirective as ɵc, DfpTargetingDirective as ɵf, DfpValueDirective as ɵh, DfpVideoDirective as ɵi };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWRmcC5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vbmd4LWRmcC9zZXJ2aWNlL2luamVjdGlvbl90b2tlbi50cyIsIm5nOi8vbmd4LWRmcC9zZXJ2aWNlL2lkbGUuc2VydmljZS50cyIsIm5nOi8vbmd4LWRmcC9zZXJ2aWNlL2h0dHAtZXJyb3Iuc2VydmljZS50cyIsIm5nOi8vbmd4LWRmcC9zZXJ2aWNlL3BhcnNlLWR1cmF0aW9uLnNlcnZpY2UudHMiLCJuZzovL25neC1kZnAvc2VydmljZS9zY3JpcHQtaW5qZWN0b3Iuc2VydmljZS50cyIsIm5nOi8vbmd4LWRmcC9jbGFzcy9kZnAtZXJyb3JzLmNsYXNzLnRzIiwibmc6Ly9uZ3gtZGZwL2NsYXNzL2RmcC1jb25maWcuY2xhc3MudHMiLCJuZzovL25neC1kZnAvc2VydmljZS9kZnAuc2VydmljZS50cyIsIm5nOi8vbmd4LWRmcC9zZXJ2aWNlL2RmcC1pZC1nZW5lcmF0b3Iuc2VydmljZS50cyIsIm5nOi8vbmd4LWRmcC9zZXJ2aWNlL2RmcC1yZWZyZXNoLnNlcnZpY2UudHMiLCJuZzovL25neC1kZnAvZGlyZWN0aXZlL2RmcC1hZC5kaXJlY3RpdmUudHMiLCJuZzovL25neC1kZnAvZGlyZWN0aXZlL2RmcC1hZC1yZXNwb25zaXZlLmRpcmVjdGl2ZS50cyIsIm5nOi8vbmd4LWRmcC9kaXJlY3RpdmUvZGZwLXJlc3BvbnNpdmUuZGlyZWN0aXZlLnRzIiwibmc6Ly9uZ3gtZGZwL2RpcmVjdGl2ZS9kZnAtc2l6ZS5kaXJlY3RpdmUudHMiLCJuZzovL25neC1kZnAvZGlyZWN0aXZlL2RmcC10YXJnZXRpbmcuZGlyZWN0aXZlLnRzIiwibmc6Ly9uZ3gtZGZwL2RpcmVjdGl2ZS9kZnAtZXhjbHVzaW9uLmRpcmVjdGl2ZS50cyIsIm5nOi8vbmd4LWRmcC9kaXJlY3RpdmUvZGZwLXZhbHVlLmRpcmVjdGl2ZS50cyIsIm5nOi8vbmd4LWRmcC9kaXJlY3RpdmUvZGZwLXZpZGVvLmRpcmVjdGl2ZS50cyIsIm5nOi8vbmd4LWRmcC9kaXJlY3RpdmUvZGZwLWF1ZGllbmNlLXBpeGVsLmRpcmVjdGl2ZS50cyIsIm5nOi8vbmd4LWRmcC9kZnAubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGlvblRva2VuIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBEZnBDb25maWcgIH0gZnJvbSAnLi4vY2xhc3MnO1xyXG5cclxuZXhwb3J0IGNvbnN0IERGUF9DT05GSUcgPSBuZXcgSW5qZWN0aW9uVG9rZW48RGZwQ29uZmlnPignZGZwQ29uZmlnJyk7XHJcbiIsImltcG9ydCB7IEluamVjdGFibGUsIE5nWm9uZSwgSW5qZWN0LCBQTEFURk9STV9JRCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBJZGxlU2VydmljZSB7XHJcblxyXG4gIHByaXZhdGUgcmVxdWVzdElkbGVDYWxsYmFjazogYW55O1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIEBJbmplY3QoUExBVEZPUk1fSUQpIHBsYXRmb3JtSWQ6IE9iamVjdCxcclxuICAgIHpvbmU6IE5nWm9uZVxyXG4gICkge1xyXG4gICAgY29uc3Qgd2luOiBhbnkgPSBpc1BsYXRmb3JtQnJvd3NlcihwbGF0Zm9ybUlkKSA/IHdpbmRvdyA6IHt9O1xyXG4gICAgaWYgKHdpbi5yZXF1ZXN0SWRsZUNhbGxiYWNrKSB7XHJcbiAgICAgIHRoaXMucmVxdWVzdElkbGVDYWxsYmFjayA9IChmdW4pID0+IHtcclxuICAgICAgICByZXR1cm4gd2luLnJlcXVlc3RJZGxlQ2FsbGJhY2soZnVuKTtcclxuICAgICAgfTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMucmVxdWVzdElkbGVDYWxsYmFjayA9IChmdW4pID0+IHtcclxuICAgICAgICByZXR1cm4gem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB3aW4uc2V0VGltZW91dChmdW4sIDUwKSk7XHJcbiAgICAgIH07XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXF1ZXN0KGZ1bikge1xyXG4gICAgdGhpcy5yZXF1ZXN0SWRsZUNhbGxiYWNrKGZ1bik7XHJcbiAgfVxyXG5cclxufVxyXG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBIdHRwRXJyb3JTZXJ2aWNlIHtcclxuXHJcbiAgaHR0cEVycm9yKHJlc3BvbnNlLCBtZXNzYWdlKSB7XHJcbiAgICBjb25zb2xlLmxvZyhgRXJyb3IgKCR7cmVzcG9uc2Uuc3RhdHVzfSkgJHttZXNzYWdlID8gbWVzc2FnZSA6ICcnfWApO1xyXG4gIH1cclxuXHJcbiAgaXNFcnJvckNvZGUgPSBmdW5jdGlvbiAoY29kZSkge1xyXG4gICAgaWYgKHR5cGVvZiBjb2RlID09PSAnbnVtYmVyJykge1xyXG4gICAgICByZXR1cm4gIShjb2RlID49IDIwMCAmJiBjb2RlIDwgMzAwKTtcclxuICAgIH1cclxuICAgIHJldHVybiBjb2RlWzBdICE9PSAnMic7XHJcbiAgfTtcclxuXHJcbn1cclxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuY2xhc3MgREZQRHVyYXRpb25FcnJvciBleHRlbmRzIEVycm9yIHtcclxuICBjb25zdHJ1Y3RvcihpbnRlcnZhbCkge1xyXG4gICAgc3VwZXIoYEludmFsaWQgaW50ZXJ2YWw6ICcke2ludGVydmFsfSdsc2ApO1xyXG4gIH1cclxufVxyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgUGFyc2VEdXJhdGlvblNlcnZpY2Uge1xyXG5cclxuICBjb252ZXJ0VG9NaWxsaXNlY29uZHModGltZSwgdW5pdCkge1xyXG4gICAgY29uc29sZS5hc3NlcnQoL14obT9zfG1pbnxoKSQvZy50ZXN0KHVuaXQpKTtcclxuXHJcbiAgICBpZiAodW5pdCA9PT0gJ21zJykgeyByZXR1cm4gdGltZTsgfVxyXG4gICAgaWYgKHVuaXQgPT09ICdzJykgeyByZXR1cm4gdGltZSAqIDEwMDA7IH1cclxuICAgIGlmICh1bml0ID09PSAnbWluJykgeyByZXR1cm4gdGltZSAqIDYwICogMTAwMDsgfVxyXG5cclxuICAgIHJldHVybiB0aW1lICogNjAgKiA2MCAqIDEwMDA7XHJcbiAgfVxyXG5cclxuICBjb252ZXJ0KG1hdGNoKSB7XHJcbiAgICBjb25zdCB0aW1lID0gcGFyc2VGbG9hdChtYXRjaFsxXSk7XHJcblxyXG4gICAgaWYgKG1hdGNoLmxlbmd0aCA9PT0gMikgeyByZXR1cm4gdGltZTsgfVxyXG5cclxuICAgIHJldHVybiB0aGlzLmNvbnZlcnRUb01pbGxpc2Vjb25kcyh0aW1lLCBtYXRjaFsyXSk7XHJcbiAgfVxyXG5cclxuICBwYXJzZUR1cmF0aW9uKGludGVydmFsKSB7XHJcblxyXG4gICAgaWYgKGludGVydmFsID09PSB1bmRlZmluZWQgfHwgaW50ZXJ2YWwgPT09IG51bGwpIHtcclxuICAgICAgdGhyb3cgbmV3IERGUER1cmF0aW9uRXJyb3IoaW50ZXJ2YWwpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0eXBlb2YgaW50ZXJ2YWwgPT09ICdudW1iZXInKSB7XHJcbiAgICAgIHJldHVybiBpbnRlcnZhbDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodHlwZW9mIGludGVydmFsICE9PSAnc3RyaW5nJykge1xyXG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGAnJHtpbnRlcnZhbH0nIG11c3QgYmUgb2YgbnVtYmVyIG9yIHN0cmluZyB0eXBlYCk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgbWF0Y2ggPSBpbnRlcnZhbC5tYXRjaCgvKCg/OlxcZCspPy4/XFxkKykobT9zfG1pbnxoKT8vKTtcclxuXHJcbiAgICBpZiAoIW1hdGNoKSB7XHJcbiAgICAgIHRocm93IG5ldyBERlBEdXJhdGlvbkVycm9yKGludGVydmFsKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcy5jb252ZXJ0KG1hdGNoKTtcclxuICB9XHJcblxyXG59XHJcbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IEh0dHBFcnJvclNlcnZpY2UgfSBmcm9tICcuL2h0dHAtZXJyb3Iuc2VydmljZSc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBTY3JpcHRJbmplY3RvclNlcnZpY2Uge1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHBFcnJvcjogSHR0cEVycm9yU2VydmljZSkgeyB9XHJcblxyXG4gIHByaXZhdGUgY29tcGxldGVVUkwodXJsKSB7XHJcbiAgICBjb25zdCBzc2wgPSBkb2N1bWVudC5sb2NhdGlvbi5wcm90b2NvbCA9PT0gJ2h0dHBzOic7XHJcbiAgICByZXR1cm4gKHNzbCA/ICdodHRwczonIDogJ2h0dHA6JykgKyB1cmw7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNyZWF0ZVNjcmlwdCh1cmwpIHtcclxuICAgIGNvbnN0IHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xyXG5cclxuICAgIHNjcmlwdC5hc3luYyA9IHRydWU7XHJcbiAgICBzY3JpcHQudHlwZSA9ICd0ZXh0L2phdmFzY3JpcHQnO1xyXG4gICAgc2NyaXB0LnNyYyA9IHRoaXMuY29tcGxldGVVUkwodXJsKTtcclxuXHJcbiAgICByZXR1cm4gc2NyaXB0O1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBwcm9taXNlU2NyaXB0KHNjcmlwdCwgdXJsKSB7XHJcbiAgICBjb25zdCBwcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICBzY3JpcHQub25sb2FkID0gKCkgPT4ge1xyXG4gICAgICAgIHJlc29sdmUoc2NyaXB0KTtcclxuICAgICAgfTtcclxuICAgICAgc2NyaXB0Lm9uZXJyb3IgPSAoKSA9PiB7XHJcbiAgICAgICAgcmVqZWN0KHtcclxuICAgICAgICAgIHBhdGg6IHVybCxcclxuICAgICAgICAgIGxvYWRlZDogZmFsc2VcclxuICAgICAgICB9KTtcclxuICAgICAgfTtcclxuICAgIH0pO1xyXG5cclxuICAgIHByb21pc2UuY2F0Y2gocmVzcG9uc2UgPT4ge1xyXG4gICAgICB0aGlzLmh0dHBFcnJvci5odHRwRXJyb3IoeyBzdGF0dXM6IDQwMCB9LCBgbG9hZGluZyBzY3JpcHQgXCIke3VybH1cImApO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIHByb21pc2U7XHJcbiAgfVxyXG5cclxuICBpbmplY3RTY3JpcHQoc2NyaXB0KSB7XHJcbiAgICBjb25zdCBoZWFkID0gZG9jdW1lbnQuaGVhZCB8fCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdoZWFkJyk7XHJcbiAgICBoZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XHJcbiAgfVxyXG5cclxuICBzY3JpcHRJbmplY3Rvcih1cmwpIHtcclxuICAgIGNvbnN0IHNjcmlwdCA9IHRoaXMuY3JlYXRlU2NyaXB0KHVybCk7XHJcbiAgICB0aGlzLmluamVjdFNjcmlwdChzY3JpcHQpO1xyXG4gICAgcmV0dXJuIHRoaXMucHJvbWlzZVNjcmlwdChzY3JpcHQsIHVybCk7XHJcbiAgfVxyXG5cclxufVxyXG4iLCJcclxuXHJcbmV4cG9ydCBjbGFzcyBERlBJbmNvbXBsZXRlRXJyb3IgZXh0ZW5kcyBFcnJvciB7XHJcbiAgICBjb25zdHJ1Y3RvcihkaXJlY3RpdmVOYW1lLCBtaXNzaW5nTmFtZSwgaXNBdHRyaWJ1dGU/KSB7XHJcbiAgICAgICAgc3VwZXIoYEluY29tcGxldGUgZGVmaW5pdGlvbiBvZiAnJHtkaXJlY3RpdmVOYW1lfSc6IGAgK1xyXG4gICAgICAgICAgICBgTWlzc2luZyAke2lzQXR0cmlidXRlID8gJ2F0dHJpYnV0ZScgOiAnY2hpbGQgZGlyZWN0aXZlJ30gYCArXHJcbiAgICAgICAgICAgIGAnJHttaXNzaW5nTmFtZX0nLmApO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgREZQVHlwZUVycm9yIGV4dGVuZHMgRXJyb3Ige1xyXG4gICAgY29uc3RydWN0b3IoZGlyZWN0aXZlTmFtZSwgYXR0cmlidXRlTmFtZSwgd3JvbmdWYWx1ZSwgZXhwZWN0ZWRUeXBlKSB7XHJcbiAgICAgICAgc3VwZXIoXHJcbiAgICAgICAgICAgIGBXcm9uZyB0eXBlIGZvciBhdHRyaWJ1dGUgJyR7YXR0cmlidXRlTmFtZX0nIG9uIGAgK1xyXG4gICAgICAgICAgICBgZGlyZWN0aXZlICcke2RpcmVjdGl2ZU5hbWV9JzogRXhwZWN0ZWQgJHtleHBlY3RlZFR5cGV9YCArXHJcbiAgICAgICAgICAgIGAsIGdvdCAke3R5cGVvZiB3cm9uZ1ZhbHVlfWBcclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgREZQTWlzc2luZ1BhcmVudEVycm9yIGV4dGVuZHMgRXJyb3Ige1xyXG4gICAgY29uc3RydWN0b3IoZGlyZWN0aXZlTmFtZSwgLi4ucGFyZW50cykge1xyXG4gICAgICAgIGNvbnNvbGUuYXNzZXJ0KHBhcmVudHMgJiYgcGFyZW50cy5sZW5ndGggPiAwKTtcclxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShwYXJlbnRzWzBdKSkge1xyXG4gICAgICAgICAgICBwYXJlbnRzID0gcGFyZW50c1swXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBwYXJlbnRNZXNzYWdlO1xyXG4gICAgICAgIGlmIChwYXJlbnRzLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICAgICAgcGFyZW50cyA9IHBhcmVudHMubWFwKHAgPT4gYCcke3B9J2ApO1xyXG4gICAgICAgICAgICBwYXJlbnRNZXNzYWdlID0gJywgd2hpY2ggbXVzdCBiZSAnO1xyXG4gICAgICAgICAgICBwYXJlbnRNZXNzYWdlICs9IHBhcmVudHMuc2xpY2UoMCwgLTEpLmpvaW4oJywgJyk7XHJcbiAgICAgICAgICAgIHBhcmVudE1lc3NhZ2UgKz0gYCBvciAke3BhcmVudHNbcGFyZW50cy5sZW5ndGggLSAxXX1gO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHBhcmVudE1lc3NhZ2UgPSBgICcke3BhcmVudHNbMF19J2A7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdXBlcihcclxuICAgICAgICAgICAgYEludmFsaWQgdXNlIG9mICcke2RpcmVjdGl2ZU5hbWV9JyBkaXJlY3RpdmUuIGAgK1xyXG4gICAgICAgICAgICBgTWlzc2luZyBwYXJlbnQgZGlyZWN0aXZlJHtwYXJlbnRNZXNzYWdlfS5gXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG4iLCJleHBvcnQgY2xhc3MgRGZwVGFyZ2V0aW5nIHtcclxuICBba2V5OiBzdHJpbmddOiBBcnJheTxzdHJpbmc+O1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgRGZwQ29uZmlnIHtcclxuICBpZGxlTG9hZD86IGJvb2xlYW47XHJcbiAgb25TYW1lTmF2aWdhdGlvbj86ICdyZWZyZXNoJyB8ICdpZ25vcmUnO1xyXG4gIHNpbmdsZVJlcXVlc3RNb2RlPzogYm9vbGVhbjtcclxuICBlbmFibGVWaWRlb0Fkcz86IGJvb2xlYW47XHJcbiAgcGVyc29uYWxpemVkQWRzPzogYm9vbGVhbjtcclxuICBjb2xsYXBzZUlmRW1wdHk/OiBib29sZWFuO1xyXG4gIGNlbnRlcmluZz86IGJvb2xlYW47XHJcbiAgbG9jYXRpb24/OiBzdHJpbmcgfCBBcnJheTxzdHJpbmc+O1xyXG4gIHBwaWQ/OiBzdHJpbmc7XHJcbiAgZ2xvYmFsVGFyZ2V0aW5nPzogRGZwVGFyZ2V0aW5nO1xyXG4gIGZvcmNlU2FmZUZyYW1lPzogYm9vbGVhbjtcclxuICBzYWZlRnJhbWVDb25maWc/OiBvYmplY3Q7XHJcbiAgbG9hZEdQVD86IGJvb2xlYW47XHJcbn1cclxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSwgT3B0aW9uYWwsIFBMQVRGT1JNX0lELCBJbmplY3QsIEluamVjdGlvblRva2VuIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuXHJcbmltcG9ydCB7IERGUF9DT05GSUcgfSBmcm9tICcuL2luamVjdGlvbl90b2tlbic7XHJcbmltcG9ydCB7IERmcENvbmZpZyB9IGZyb20gJy4uL2NsYXNzJztcclxuaW1wb3J0IHsgSWRsZVNlcnZpY2UgfSBmcm9tICcuL2lkbGUuc2VydmljZSc7XHJcbmltcG9ydCB7IFNjcmlwdEluamVjdG9yU2VydmljZSB9IGZyb20gJy4vc2NyaXB0LWluamVjdG9yLnNlcnZpY2UnO1xyXG5cclxuZXhwb3J0IGNvbnN0IEdQVF9MSUJSQVJZX1VSTCA9ICcvL3d3dy5nb29nbGV0YWdzZXJ2aWNlcy5jb20vdGFnL2pzL2dwdC5qcyc7XHJcblxyXG5jbGFzcyBERlBDb25maWd1cmF0aW9uRXJyb3IgZXh0ZW5kcyBFcnJvciB7IH1cclxuXHJcbi8vIGV4cG9ydCBjb25zdCBERlBfQ09ORklHID0gbmV3IEluamVjdGlvblRva2VuPERmcENvbmZpZz4oJ2RmcENvbmZpZycpO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgRGZwU2VydmljZSB7XHJcblxyXG4gIHByaXZhdGUgZW5hYmxlVmlkZW9BZHMgPSBmYWxzZTtcclxuXHJcbiAgcHJpdmF0ZSBwZXJzb25hbGl6ZWRBZHMgPSB0cnVlO1xyXG5cclxuICBwcml2YXRlIGNvbGxhcHNlSWZFbXB0eSA9IHRydWU7XHJcblxyXG4gIHByaXZhdGUgY2VudGVyaW5nID0gZmFsc2U7XHJcblxyXG4gIHByaXZhdGUgbG9jYXRpb24gPSBudWxsO1xyXG5cclxuICBwcml2YXRlIHBwaWQgPSBudWxsO1xyXG5cclxuICBwcml2YXRlIGdsb2JhbFRhcmdldGluZyA9IG51bGw7XHJcblxyXG4gIHByaXZhdGUgZm9yY2VTYWZlRnJhbWUgPSBmYWxzZTtcclxuXHJcbiAgcHJpdmF0ZSBzYWZlRnJhbWVDb25maWcgPSBudWxsO1xyXG5cclxuICBwcml2YXRlIGxvYWRHUFQgPSB0cnVlO1xyXG5cclxuICBwcml2YXRlIGxvYWRlZCA9IGZhbHNlO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIEBJbmplY3QoUExBVEZPUk1fSUQpIHByaXZhdGUgcGxhdGZvcm1JZDogT2JqZWN0LFxyXG4gICAgQE9wdGlvbmFsKCkgaWRsZUxvYWQ6IElkbGVTZXJ2aWNlLFxyXG4gICAgQEluamVjdChERlBfQ09ORklHKSBwcml2YXRlIGNvbmZpZzogRGZwQ29uZmlnLFxyXG4gICAgcHJpdmF0ZSBzY3JpcHRJbmplY3RvcjogU2NyaXB0SW5qZWN0b3JTZXJ2aWNlXHJcbiAgKSB7XHJcbiAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xyXG4gICAgICBjb25zdCB3aW46IGFueSA9IHdpbmRvdyxcclxuICAgICAgICBnb29nbGV0YWcgPSB3aW4uZ29vZ2xldGFnIHx8IHt9O1xyXG5cclxuICAgICAgdGhpcy5kZnBDb25maWcoKTtcclxuXHJcbiAgICAgIGdvb2dsZXRhZy5jbWQgPSBnb29nbGV0YWcuY21kIHx8IFtdO1xyXG4gICAgICBnb29nbGV0YWcuY21kLnB1c2goKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuc2V0dXAoKTtcclxuICAgICAgfSk7XHJcbiAgICAgIHdpbi5nb29nbGV0YWcgPSBnb29nbGV0YWc7XHJcblxyXG4gICAgICBpZiAodGhpcy5sb2FkR1BUKSB7XHJcbiAgICAgICAgY29uc3QgbG9hZFNjcmlwdCA9ICgpID0+IHtcclxuICAgICAgICAgIHRoaXMuc2NyaXB0SW5qZWN0b3Iuc2NyaXB0SW5qZWN0b3IoR1BUX0xJQlJBUllfVVJMKS50aGVuKChzY3JpcHQpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5sb2FkZWQgPSB0cnVlO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBpZiAoaWRsZUxvYWQpIHtcclxuICAgICAgICAgIGlkbGVMb2FkLnJlcXVlc3QobG9hZFNjcmlwdCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGxvYWRTY3JpcHQoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgZGZwQ29uZmlnKCkge1xyXG4gICAgZm9yIChjb25zdCBrZXkgaW4gdGhpcy5jb25maWcpIHtcclxuICAgICAgaWYgKHRoaXMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xyXG4gICAgICAgIHRoaXNba2V5XSA9IHRoaXMuY29uZmlnW2tleV07XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgYWRkU2FmZUZyYW1lQ29uZmlnKHB1YmFkcykge1xyXG4gICAgaWYgKCF0aGlzLnNhZmVGcmFtZUNvbmZpZykgeyByZXR1cm4gZmFsc2U7IH1cclxuICAgIGlmICh0eXBlb2YgdGhpcy5zYWZlRnJhbWVDb25maWcgIT09ICdvYmplY3QnKSB7XHJcbiAgICAgIHRocm93IG5ldyBERlBDb25maWd1cmF0aW9uRXJyb3IoJ0ZyYW1lQ29uZmlnIG11c3QgYmUgYW4gb2JqZWN0Jyk7XHJcbiAgICB9XHJcbiAgICBwdWJhZHMuc2V0U2FmZUZyYW1lQ29uZmlnKHRoaXMuc2FmZUZyYW1lQ29uZmlnKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgYWRkVGFyZ2V0aW5nKHB1YmFkcykge1xyXG4gICAgaWYgKCF0aGlzLmdsb2JhbFRhcmdldGluZykgeyByZXR1cm4gZmFsc2U7IH1cclxuICAgIGlmICh0eXBlb2YgdGhpcy5nbG9iYWxUYXJnZXRpbmcgIT09ICdvYmplY3QnKSB7XHJcbiAgICAgIHRocm93IG5ldyBERlBDb25maWd1cmF0aW9uRXJyb3IoJ1RhcmdldGluZyBtdXN0IGJlIGFuIG9iamVjdCcpO1xyXG4gICAgfVxyXG5cclxuICAgIGZvciAoY29uc3Qga2V5IGluIHRoaXMuZ2xvYmFsVGFyZ2V0aW5nKSB7XHJcbiAgICAgIGlmICh0aGlzLmdsb2JhbFRhcmdldGluZy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XHJcbiAgICAgICAgcHViYWRzLnNldFRhcmdldGluZyhrZXksIHRoaXMuZ2xvYmFsVGFyZ2V0aW5nW2tleV0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGFkZExvY2F0aW9uKHB1YmFkcykge1xyXG4gICAgaWYgKCF0aGlzLmxvY2F0aW9uKSB7IHJldHVybiBmYWxzZTsgfVxyXG5cclxuICAgIGlmICh0eXBlb2YgdGhpcy5sb2NhdGlvbiA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgcHViYWRzLnNldExvY2F0aW9uKHRoaXMubG9jYXRpb24pO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFBcnJheS5pc0FycmF5KHRoaXMubG9jYXRpb24pKSB7XHJcbiAgICAgIHRocm93IG5ldyBERlBDb25maWd1cmF0aW9uRXJyb3IoJ0xvY2F0aW9uIG11c3QgYmUgYW4gJyArXHJcbiAgICAgICAgJ2FycmF5IG9yIHN0cmluZycpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmFkcy5zZXRMb2NhdGlvbi5hcHBseShwdWJhZHMsIHRoaXMubG9jYXRpb24pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBhZGRQUElEKHB1YmFkcykge1xyXG4gICAgaWYgKCF0aGlzLnBwaWQpIHsgcmV0dXJuIGZhbHNlOyB9XHJcbiAgICBpZiAodHlwZW9mIHRoaXMucHBpZCAhPT0gJ3N0cmluZycpIHtcclxuICAgICAgdGhyb3cgbmV3IERGUENvbmZpZ3VyYXRpb25FcnJvcignUFBJRCBtdXN0IGJlIGEgc3RyaW5nJyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHViYWRzLnNldFB1Ymxpc2hlclByb3ZpZGVkSWQodGhpcy5wcGlkKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgc2V0dXAoKSB7XHJcbiAgICBjb25zdCB3aW46IGFueSA9IHdpbmRvdyxcclxuICAgICAgZ29vZ2xldGFnID0gd2luLmdvb2dsZXRhZyxcclxuICAgICAgcHViYWRzID0gZ29vZ2xldGFnLnB1YmFkcygpO1xyXG5cclxuICAgIGlmICh0aGlzLmVuYWJsZVZpZGVvQWRzKSB7XHJcbiAgICAgIHB1YmFkcy5lbmFibGVWaWRlb0FkcygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHBlcnNvbmFsaXplZEFkcyBpcyBkZWZhdWx0XHJcbiAgICBpZiAodGhpcy5wZXJzb25hbGl6ZWRBZHMgPT09IGZhbHNlKSB7XHJcbiAgICAgIHB1YmFkcy5zZXRSZXF1ZXN0Tm9uUGVyc29uYWxpemVkQWRzKDEpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLmNvbGxhcHNlSWZFbXB0eSkge1xyXG4gICAgICBwdWJhZHMuY29sbGFwc2VFbXB0eURpdnMoKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBXZSBhbHdheXMgcmVmcmVzaCBvdXJzZWx2ZXNcclxuICAgIHB1YmFkcy5kaXNhYmxlSW5pdGlhbExvYWQoKTtcclxuXHJcbiAgICBwdWJhZHMuc2V0Rm9yY2VTYWZlRnJhbWUodGhpcy5mb3JjZVNhZmVGcmFtZSk7XHJcbiAgICBwdWJhZHMuc2V0Q2VudGVyaW5nKHRoaXMuY2VudGVyaW5nKTtcclxuXHJcbiAgICB0aGlzLmFkZExvY2F0aW9uKHB1YmFkcyk7XHJcbiAgICB0aGlzLmFkZFBQSUQocHViYWRzKTtcclxuICAgIHRoaXMuYWRkVGFyZ2V0aW5nKHB1YmFkcyk7XHJcbiAgICB0aGlzLmFkZFNhZmVGcmFtZUNvbmZpZyhwdWJhZHMpO1xyXG5cclxuICAgIC8vIHB1YmFkcy5lbmFibGVTeW5jUmVuZGVyaW5nKCk7XHJcbiAgICBwdWJhZHMuZW5hYmxlQXN5bmNSZW5kZXJpbmcoKTtcclxuXHJcbiAgICBpZiAodGhpcy5jb25maWcuc2luZ2xlUmVxdWVzdE1vZGUgIT09IHRydWUpIHtcclxuICAgICAgaWYgKHRoaXMuY29uZmlnLmVuYWJsZVZpZGVvQWRzKSB7XHJcbiAgICAgICAgcHViYWRzLmVuYWJsZVZpZGVvQWRzKCk7XHJcbiAgICAgIH1cclxuICAgICAgZ29vZ2xldGFnLmVuYWJsZVNlcnZpY2VzKCk7XHJcbiAgICB9XHJcblxyXG4gIH1cclxuXHJcbiAgaGFzTG9hZGVkKCkge1xyXG4gICAgcmV0dXJuIHRoaXMubG9hZGVkO1xyXG4gIH1cclxuXHJcbiAgZGVmaW5lVGFzayh0YXNrKSB7XHJcbiAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xyXG4gICAgICBjb25zdCB3aW46IGFueSA9IHdpbmRvdyxcclxuICAgICAgICBnb29nbGV0YWcgPSB3aW4uZ29vZ2xldGFnO1xyXG4gICAgICBnb29nbGV0YWcuY21kLnB1c2godGFzayk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxufVxyXG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBEZnBJREdlbmVyYXRvclNlcnZpY2Uge1xyXG5cclxuICBwcml2YXRlIGdlbmVyYXRlZElEcyA9IHt9O1xyXG5cclxuICBnZW5lcmF0ZUlEKCkge1xyXG4gICAgbGV0IGlkID0gbnVsbDtcclxuXHJcbiAgICBkbyB7XHJcbiAgICAgIGNvbnN0IG51bWJlciA9IE1hdGgucmFuZG9tKCkudG9TdHJpbmcoKS5zbGljZSgyKTtcclxuICAgICAgaWQgPSAnZ3B0LWFkLScgKyBudW1iZXI7XHJcbiAgICB9IHdoaWxlIChpZCBpbiB0aGlzLmdlbmVyYXRlZElEcyk7XHJcblxyXG4gICAgdGhpcy5nZW5lcmF0ZWRJRHNbaWRdID0gdHJ1ZTtcclxuXHJcbiAgICByZXR1cm4gaWQ7XHJcbiAgfVxyXG5cclxuICBkZnBJREdlbmVyYXRvcihlbGVtZW50KSB7XHJcbiAgICBpZiAoZWxlbWVudCAmJiBlbGVtZW50LmlkICYmICEoZWxlbWVudC5pZCBpbiB0aGlzLmdlbmVyYXRlZElEcykpIHtcclxuICAgICAgcmV0dXJuIGVsZW1lbnQuaWQ7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgaWQgPSB0aGlzLmdlbmVyYXRlSUQoKTtcclxuICAgIGlmIChlbGVtZW50KSB7IGVsZW1lbnQuaWQgPSBpZDsgfVxyXG5cclxuICAgIHJldHVybiBpZDtcclxuICB9XHJcblxyXG4gIGlzVGFrZW4oaWQpIHtcclxuICAgIHJldHVybiBpZCBpbiB0aGlzLmdlbmVyYXRlZElEcztcclxuICB9XHJcblxyXG4gIGlzVW5pcXVlKGlkKSB7XHJcbiAgICByZXR1cm4gIXRoaXMuaXNUYWtlbihpZCk7XHJcbiAgfVxyXG5cclxufVxyXG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlLCBFdmVudEVtaXR0ZXIsIE9wdGlvbmFsLCBJbmplY3RvciwgSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuXHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiwgdGltZXIsIGZyb20gfSBmcm9tICdyeGpzJztcclxuXHJcbmltcG9ydCB7IERmcENvbmZpZyB9IGZyb20gJy4uL2NsYXNzJztcclxuaW1wb3J0IHsgREZQX0NPTkZJRyB9IGZyb20gJy4vaW5qZWN0aW9uX3Rva2VuJztcclxuaW1wb3J0IHsgUGFyc2VEdXJhdGlvblNlcnZpY2UgfSBmcm9tICcuL3BhcnNlLWR1cmF0aW9uLnNlcnZpY2UnO1xyXG5cclxuY2xhc3MgREZQUmVmcmVzaEVycm9yIGV4dGVuZHMgRXJyb3IgeyB9XHJcblxyXG5kZWNsYXJlIHZhciBnb29nbGV0YWc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBEZnBSZWZyZXNoU2VydmljZSB7XHJcblxyXG4gIHJlZnJlc2hFdmVudDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgcHJpdmF0ZSByZWZyZXNoU2xvdHMgPSBbXTtcclxuICBwcml2YXRlIHNpbmdsZVJlcXVlc3Q6IFN1YnNjcmlwdGlvbjtcclxuICBwcml2YXRlIGludGVydmFscyA9IHt9O1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoREZQX0NPTkZJRylcclxuICAgIHByaXZhdGUgY29uZmlnOiBEZnBDb25maWcsXHJcbiAgICBwcml2YXRlIGluamVjdDogSW5qZWN0b3IsXHJcbiAgICBwcml2YXRlIHBhcnNlRHVyYXRpb246IFBhcnNlRHVyYXRpb25TZXJ2aWNlXHJcbiAgKSB7IH1cclxuXHJcbiAgc2xvdFJlZnJlc2goc2xvdCwgcmVmcmVzaEludGVydmFsPywgaW5pdFJlZnJlc2ggPSBmYWxzZSkge1xyXG4gICAgY29uc3QgZGVmZXJyZWQ6IFByb21pc2U8YW55PiA9IGZyb20oW3Nsb3RdKS50b1Byb21pc2UoKSxcclxuICAgICAgdGFzayA9IHsgc2xvdDogc2xvdCwgZGVmZXJyZWQ6IGRlZmVycmVkIH07XHJcblxyXG4gICAgZGVmZXJyZWQudGhlbigoKSA9PiB7XHJcbiAgICAgIGlmICh0aGlzLmhhc1Nsb3RJbnRlcnZhbChzbG90KSkge1xyXG4gICAgICAgIHRoaXMuY2FuY2VsSW50ZXJ2YWwoc2xvdCk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHJlZnJlc2hJbnRlcnZhbCkge1xyXG4gICAgICAgIHRoaXMuYWRkU2xvdEludGVydmFsKHRhc2ssIHJlZnJlc2hJbnRlcnZhbCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGlmICh0aGlzLmNvbmZpZy5zaW5nbGVSZXF1ZXN0TW9kZSA9PT0gdHJ1ZSAmJiBpbml0UmVmcmVzaCkge1xyXG4gICAgICAvLyBVc2UgYSB0aW1lciB0byBoYW5kbGUgcmVmcmVzaCBvZiBhIHNpbmdsZSByZXF1ZXN0IG1vZGVcclxuICAgICAgdGhpcy5yZWZyZXNoU2xvdHMucHVzaChzbG90KTtcclxuICAgICAgaWYgKHRoaXMuc2luZ2xlUmVxdWVzdCAmJiAhdGhpcy5zaW5nbGVSZXF1ZXN0LmNsb3NlZCkge1xyXG4gICAgICAgIHRoaXMuc2luZ2xlUmVxdWVzdC51bnN1YnNjcmliZSgpO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuc2luZ2xlUmVxdWVzdCA9IHRpbWVyKDEwMCkuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgICBjb25zdCBwdWJhZHMgPSBnb29nbGV0YWcucHViYWRzKCk7XHJcbiAgICAgICAgcHViYWRzLmVuYWJsZVNpbmdsZVJlcXVlc3QoKTtcclxuICAgICAgICBnb29nbGV0YWcuZW5hYmxlU2VydmljZXMoKTtcclxuICAgICAgICB0aGlzLnJlZnJlc2hTbG90cy5mb3JFYWNoKHMgPT4ge1xyXG4gICAgICAgICAgZ29vZ2xldGFnLmRpc3BsYXkocy5nZXRTbG90RWxlbWVudElkKCkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHB1YmFkcy5yZWZyZXNoKHRoaXMucmVmcmVzaFNsb3RzKTtcclxuICAgICAgICB0aGlzLnJlZnJlc2hTbG90cyA9IFtdO1xyXG4gICAgICB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGdvb2dsZXRhZy5kaXNwbGF5KHNsb3QuZ2V0U2xvdEVsZW1lbnRJZCgpKTtcclxuICAgICAgdGhpcy5yZWZyZXNoKFt0YXNrXSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGRlZmVycmVkO1xyXG4gIH1cclxuXHJcbiAgY2FuY2VsSW50ZXJ2YWwoc2xvdCkge1xyXG4gICAgaWYgKCF0aGlzLmhhc1Nsb3RJbnRlcnZhbChzbG90KSkge1xyXG4gICAgICB0aHJvdyBuZXcgREZQUmVmcmVzaEVycm9yKCdObyBpbnRlcnZhbCBmb3IgZ2l2ZW4gc2xvdCcpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGludGVydmFsOiBTdWJzY3JpcHRpb24gPSB0aGlzLmludGVydmFsc1t0aGlzLnNsb3RJbnRlcnZhbEtleShzbG90KV07XHJcbiAgICBpbnRlcnZhbC51bnN1YnNjcmliZSgpO1xyXG4gICAgZGVsZXRlIHRoaXMuaW50ZXJ2YWxzW3Nsb3RdO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBoYXNTbG90SW50ZXJ2YWwoc2xvdCkge1xyXG4gICAgcmV0dXJuIHRoaXMuc2xvdEludGVydmFsS2V5KHNsb3QpIGluIHRoaXMuaW50ZXJ2YWxzO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSByZWZyZXNoKHRhc2tzPykge1xyXG4gICAgaWYgKHRhc2tzID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgZ29vZ2xldGFnLmNtZC5wdXNoKCgpID0+IHtcclxuICAgICAgICBnb29nbGV0YWcucHViYWRzKCkucmVmcmVzaCgpO1xyXG4gICAgICB9KTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0YXNrcy5sZW5ndGggPT09IDApIHsgcmV0dXJuIGZhbHNlOyB9XHJcblxyXG4gICAgZ29vZ2xldGFnLmNtZC5wdXNoKCgpID0+IHtcclxuICAgICAgZ29vZ2xldGFnLnB1YmFkcygpLnJlZnJlc2godGFza3MubWFwKHRhc2sgPT4gdGFzay5zbG90KSk7XHJcbiAgICAgIHRhc2tzLmZvckVhY2godGFzayA9PiB7XHJcbiAgICAgICAgUHJvbWlzZS5yZXNvbHZlKHRhc2suc2xvdCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGFkZFNsb3RJbnRlcnZhbCh0YXNrLCBpbnRlcnZhbCkge1xyXG4gICAgY29uc3QgcGFyc2VkSW50ZXJ2YWwgPSB0aGlzLnBhcnNlRHVyYXRpb24ucGFyc2VEdXJhdGlvbihpbnRlcnZhbCk7XHJcbiAgICB0aGlzLnZhbGlkYXRlSW50ZXJ2YWwocGFyc2VkSW50ZXJ2YWwsIGludGVydmFsKTtcclxuXHJcbiAgICBjb25zdCByZWZyZXNoID0gdGltZXIocGFyc2VkSW50ZXJ2YWwsIHBhcnNlZEludGVydmFsKS5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICBjb25zdCBkb2MgPSB0aGlzLmluamVjdC5nZXQoRE9DVU1FTlQpO1xyXG4gICAgICBpZiAoIXRoaXMuaGlkZGVuQ2hlY2soZG9jLmdldEVsZW1lbnRCeUlkKHRhc2suc2xvdC5nZXRTbG90RWxlbWVudElkKCkpKSkge1xyXG4gICAgICAgIHRoaXMucmVmcmVzaChbdGFza10pO1xyXG4gICAgICAgIHRoaXMucmVmcmVzaEV2ZW50LmVtaXQodGFzay5zbG90KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5pbnRlcnZhbHNbdGhpcy5zbG90SW50ZXJ2YWxLZXkodGFzay5zbG90KV0gPSByZWZyZXNoO1xyXG5cclxuICAgIHJldHVybiByZWZyZXNoO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBzbG90SW50ZXJ2YWxLZXkoc2xvdCkge1xyXG4gICAgcmV0dXJuIHNsb3QuZ2V0U2xvdElkKCkuZ2V0RG9tSWQoKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgdmFsaWRhdGVJbnRlcnZhbChtaWxsaXNlY29uZHMsIGJlZm9yZVBhcnNpbmcpIHtcclxuICAgIGlmIChtaWxsaXNlY29uZHMgPCAxMDAwKSB7XHJcbiAgICAgIGNvbnNvbGUud2FybignQ2FyZWZ1bDogJHtiZWZvcmVQYXJzaW5nfSBpcyBxdWl0ZSBhIGxvdyBpbnRlcnZhbCEnKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGhpZGRlbkNoZWNrKGVsZW1lbnQ6IEVsZW1lbnQpIHtcclxuICAgIGlmICh0eXBlb2YgKHdpbmRvdykgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgIGNvbnN0IGNzcyA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpO1xyXG4gICAgICBpZiAoY3NzLmRpc3BsYXkgPT09ICdub25lJykge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9IGVsc2UgaWYgKGVsZW1lbnQucGFyZW50RWxlbWVudCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmhpZGRlbkNoZWNrKGVsZW1lbnQucGFyZW50RWxlbWVudCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHtcclxuICBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsXHJcbiAgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLFxyXG4gIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95LCBJbmplY3QsIFBMQVRGT1JNX0lELCBPcHRpb25hbFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IFJvdXRlciwgTmF2aWdhdGlvbkVuZCB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcblxyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgZmlsdGVyIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5cclxuaW1wb3J0IHsgRGZwU2VydmljZSwgfSBmcm9tICcuLi9zZXJ2aWNlL2RmcC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgRGZwSURHZW5lcmF0b3JTZXJ2aWNlLCB9IGZyb20gJy4uL3NlcnZpY2UvZGZwLWlkLWdlbmVyYXRvci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgRGZwUmVmcmVzaFNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlL2RmcC1yZWZyZXNoLnNlcnZpY2UnO1xyXG5cclxuaW1wb3J0IHsgREZQSW5jb21wbGV0ZUVycm9yLCBHb29nbGVTbG90LCBEZnBDb25maWcgfSBmcm9tICcuLi9jbGFzcyc7XHJcbmltcG9ydCB7IERGUF9DT05GSUcgfSBmcm9tICcuLi9zZXJ2aWNlL2luamVjdGlvbl90b2tlbic7XHJcblxyXG5kZWNsYXJlIHZhciBnb29nbGV0YWc7XHJcblxyXG5leHBvcnQgY2xhc3MgRGZwUmVmcmVzaEV2ZW50IHtcclxuICB0eXBlOiBzdHJpbmc7XHJcbiAgc2xvdDogYW55O1xyXG4gIGRhdGE/OiBhbnk7XHJcbn1cclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnZGZwLWFkJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgRGZwQWREaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XHJcblxyXG4gIEBJbnB1dCgpIGFkVW5pdDogc3RyaW5nO1xyXG4gIEBJbnB1dCgpIGNsaWNrVXJsOiBzdHJpbmc7XHJcbiAgQElucHV0KCkgZm9yY2VTYWZlRnJhbWU6IGJvb2xlYW47XHJcbiAgQElucHV0KCkgc2FmZUZyYW1lQ29uZmlnOiBzdHJpbmc7XHJcbiAgQElucHV0KCkgcmVmcmVzaDogc3RyaW5nO1xyXG4gIEBJbnB1dCgpIGNvbGxhcHNlSWZFbXB0eTogYm9vbGVhbjtcclxuXHJcbiAgQE91dHB1dCgpIGFmdGVyUmVmcmVzaDogRXZlbnRFbWl0dGVyPERmcFJlZnJlc2hFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIHByaXZhdGUgc2l6ZXMgPSBbXTtcclxuXHJcbiAgcHJpdmF0ZSByZXNwb25zaXZlTWFwcGluZyA9IFtdO1xyXG5cclxuICBwcml2YXRlIHRhcmdldGluZ3MgPSBbXTtcclxuXHJcbiAgcHJpdmF0ZSBleGNsdXNpb25zID0gW107XHJcblxyXG4gIHByaXZhdGUgc2NyaXB0cyA9IFtdO1xyXG5cclxuICBwcml2YXRlIHNsb3Q6IEdvb2dsZVNsb3Q7XHJcblxyXG4gIHByaXZhdGUgb25TYW1lTmF2aWdhdGlvbjogU3Vic2NyaXB0aW9uO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIEBJbmplY3QoUExBVEZPUk1fSUQpIHByaXZhdGUgcGxhdGZvcm1JZDogT2JqZWN0LFxyXG4gICAgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxyXG4gICAgcHJpdmF0ZSBkZnA6IERmcFNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGRmcElER2VuZXJhdG9yOiBEZnBJREdlbmVyYXRvclNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGRmcFJlZnJlc2g6IERmcFJlZnJlc2hTZXJ2aWNlLFxyXG4gICAgQEluamVjdChERlBfQ09ORklHKSBwcml2YXRlIGNvbmZpZzogRGZwQ29uZmlnLFxyXG4gICAgQE9wdGlvbmFsKCkgcm91dGVyOiBSb3V0ZXJcclxuICApIHtcclxuICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XHJcbiAgICAgIHRoaXMuZGZwUmVmcmVzaC5yZWZyZXNoRXZlbnQuc3Vic2NyaWJlKHNsb3QgPT4ge1xyXG4gICAgICAgIGlmIChzbG90ID09PSB0aGlzLnNsb3QpIHtcclxuICAgICAgICAgIHRoaXMuYWZ0ZXJSZWZyZXNoLmVtaXQoeyB0eXBlOiAncmVmcmVzaCcsIHNsb3Q6IHNsb3QgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgICAgaWYgKHJvdXRlcikge1xyXG4gICAgICAgIHRoaXMub25TYW1lTmF2aWdhdGlvbiA9IHJvdXRlci5ldmVudHMucGlwZShmaWx0ZXIoZXZlbnQgPT4gZXZlbnQgaW5zdGFuY2VvZiBOYXZpZ2F0aW9uRW5kKSlcclxuICAgICAgICAgIC5zdWJzY3JpYmUoKGV2ZW50OiBOYXZpZ2F0aW9uRW5kKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNsb3QgJiYgIXRoaXMucmVmcmVzaCAmJiB0aGlzLmNvbmZpZy5vblNhbWVOYXZpZ2F0aW9uID09PSAncmVmcmVzaCcpIHtcclxuICAgICAgICAgICAgICB0aGlzLnJlZnJlc2hDb250ZW50LmNhbGwodGhpcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XHJcbiAgICAgIHRoaXMuZGZwSURHZW5lcmF0b3IuZGZwSURHZW5lcmF0b3IodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbmdBZnRlclZpZXdJbml0KCkge1xyXG4gICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcclxuICAgICAgdGhpcy5kZnAuZGVmaW5lVGFzaygoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5kZWZpbmVTbG90KCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICBpZiAodGhpcy5zbG90KSB7XHJcbiAgICAgIGdvb2dsZXRhZy5kZXN0cm95U2xvdHMoW3RoaXMuc2xvdF0pO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMub25TYW1lTmF2aWdhdGlvbikge1xyXG4gICAgICB0aGlzLm9uU2FtZU5hdmlnYXRpb24udW5zdWJzY3JpYmUoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgc2V0UmVzcG9uc2l2ZU1hcHBpbmcoc2xvdCkge1xyXG4gICAgY29uc3QgYWQgPSB0aGlzLmdldFN0YXRlKCk7XHJcblxyXG4gICAgaWYgKGFkLnJlc3BvbnNpdmVNYXBwaW5nLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgc2l6ZU1hcHBpbmcgPSBnb29nbGV0YWcuc2l6ZU1hcHBpbmcoKTtcclxuXHJcbiAgICBhZC5yZXNwb25zaXZlTWFwcGluZy5mb3JFYWNoKG1hcHBpbmcgPT4ge1xyXG4gICAgICBzaXplTWFwcGluZy5hZGRTaXplKG1hcHBpbmcudmlld3BvcnRTaXplLCBtYXBwaW5nLmFkU2l6ZXMpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgc2xvdC5kZWZpbmVTaXplTWFwcGluZyhzaXplTWFwcGluZy5idWlsZCgpKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZGVmaW5lU2xvdCgpIHtcclxuICAgIGNvbnN0IGFkID0gdGhpcy5nZXRTdGF0ZSgpLFxyXG4gICAgICBlbGVtZW50ID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XHJcblxyXG4gICAgdGhpcy5zbG90ID0gZ29vZ2xldGFnLmRlZmluZVNsb3QoYWQuYWRVbml0LCBhZC5zaXplcywgZWxlbWVudC5pZCk7XHJcblxyXG4gICAgaWYgKHRoaXMuZm9yY2VTYWZlRnJhbWUgIT09IHVuZGVmaW5lZCAmJiBhZC5mb3JjZVNhZmVGcmFtZSA9PT0gIXRoaXMuY29uZmlnLmZvcmNlU2FmZUZyYW1lKSB7XHJcbiAgICAgIHRoaXMuc2xvdC5zZXRGb3JjZVNhZmVGcmFtZShhZC5mb3JjZVNhZmVGcmFtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGFkLmNsaWNrVXJsKSB7XHJcbiAgICAgIHRoaXMuc2xvdC5zZXRDbGlja1VybChhZC5jbGlja1VybCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGFkLmNvbGxhcHNlSWZFbXB0eSkge1xyXG4gICAgICB0aGlzLnNsb3Quc2V0Q29sbGFwc2VFbXB0eURpdih0cnVlLCB0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoYWQuc2FmZUZyYW1lQ29uZmlnKSB7XHJcbiAgICAgIHRoaXMuc2xvdC5zZXRTYWZlRnJhbWVDb25maWcoXHJcbiAgICAgICAgKEpTT04ucGFyc2UoYWQuc2FmZUZyYW1lQ29uZmlnKSlcclxuICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnNsb3QucmVuZGVyRW5kZWQgPSAoZ29vZ2xlU2xvdEV2ZW50OiBJQXJndW1lbnRzKSA9PiB7XHJcbiAgICAgIHRoaXMuYWZ0ZXJSZWZyZXNoLmVtaXQoeyB0eXBlOiAncmVuZGVyRW5kZWQnLCBzbG90OiB0aGlzLnNsb3QsIGRhdGE6IGdvb2dsZVNsb3RFdmVudCB9KTtcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5zZXRSZXNwb25zaXZlTWFwcGluZyh0aGlzLnNsb3QpO1xyXG5cclxuICAgIGFkLnRhcmdldGluZ3MuZm9yRWFjaCh0YXJnZXRpbmcgPT4ge1xyXG4gICAgICB0aGlzLnNsb3Quc2V0VGFyZ2V0aW5nKHRhcmdldGluZy5rZXksIHRhcmdldGluZy52YWx1ZXMpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgYWQuZXhjbHVzaW9ucy5mb3JFYWNoKGV4Y2x1c2lvbiA9PiB7XHJcbiAgICAgIHRoaXMuc2xvdC5zZXRDYXRlZ29yeUV4Y2x1c2lvbihleGNsdXNpb24pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgYWQuc2NyaXB0cy5mb3JFYWNoKHNjcmlwdCA9PiB7IHNjcmlwdCh0aGlzLnNsb3QpOyB9KTtcclxuXHJcbiAgICBpZiAodGhpcy5jb25maWcuZW5hYmxlVmlkZW9BZHMpIHtcclxuICAgICAgdGhpcy5zbG90LmFkZFNlcnZpY2UoZ29vZ2xldGFnLmNvbXBhbmlvbkFkcygpKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnNsb3QuYWRkU2VydmljZShnb29nbGV0YWcucHViYWRzKCkpO1xyXG5cclxuICAgIHRoaXMucmVmcmVzaENvbnRlbnQoKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgcmVmcmVzaENvbnRlbnQoKSB7XHJcbiAgICB0aGlzLmRmcFJlZnJlc2guc2xvdFJlZnJlc2godGhpcy5zbG90LCB0aGlzLnJlZnJlc2gsIHRydWUpLnRoZW4oc2xvdCA9PiB7XHJcbiAgICAgIHRoaXMuYWZ0ZXJSZWZyZXNoLmVtaXQoeyB0eXBlOiAnaW5pdCcsIHNsb3Q6IHNsb3QgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGNoZWNrVmFsaWQoKSB7XHJcbiAgICBpZiAodGhpcy5zaXplcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgdGhyb3cgbmV3IERGUEluY29tcGxldGVFcnJvcignZGZwLWFkJywgJ2RmcC1zaXplJyk7XHJcbiAgICB9XHJcbiAgICBpZiAoIXRoaXMuYWRVbml0KSB7XHJcbiAgICAgIHRocm93IG5ldyBERlBJbmNvbXBsZXRlRXJyb3IoJ2RmcC1hZCcsICdhZC11bml0JywgdHJ1ZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZXQgaXNIaWRkZW4oKSB7XHJcbiAgICByZXR1cm4gdGhpcy5kZnBSZWZyZXNoLmhpZGRlbkNoZWNrKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KTtcclxuICB9XHJcblxyXG4gIGdldFN0YXRlKCkge1xyXG4gICAgdGhpcy5jaGVja1ZhbGlkKCk7XHJcbiAgICByZXR1cm4gT2JqZWN0LmZyZWV6ZSh7XHJcbiAgICAgIHNpemVzOiB0aGlzLnNpemVzLFxyXG4gICAgICByZXNwb25zaXZlTWFwcGluZzogdGhpcy5yZXNwb25zaXZlTWFwcGluZyxcclxuICAgICAgdGFyZ2V0aW5nczogdGhpcy50YXJnZXRpbmdzLFxyXG4gICAgICBleGNsdXNpb25zOiB0aGlzLmV4Y2x1c2lvbnMsXHJcbiAgICAgIGFkVW5pdDogdGhpcy5hZFVuaXQsXHJcbiAgICAgIGZvcmNlU2FmZUZyYW1lOiB0aGlzLmZvcmNlU2FmZUZyYW1lID09PSB0cnVlLFxyXG4gICAgICBzYWZlRnJhbWVDb25maWc6IHRoaXMuc2FmZUZyYW1lQ29uZmlnLFxyXG4gICAgICBjbGlja1VybDogdGhpcy5jbGlja1VybCxcclxuICAgICAgcmVmcmVzaDogdGhpcy5yZWZyZXNoLFxyXG4gICAgICBzY3JpcHRzOiB0aGlzLnNjcmlwdHMsXHJcbiAgICAgIGNvbGxhcHNlSWZFbXB0eTogdGhpcy5jb2xsYXBzZUlmRW1wdHkgPT09IHRydWVcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgYWRkU2l6ZShzaXplKSB7XHJcbiAgICB0aGlzLnNpemVzLnB1c2goc2l6ZSk7XHJcbiAgfVxyXG5cclxuICBhZGRSZXNwb25zaXZlTWFwcGluZyhtYXBwaW5nKSB7XHJcbiAgICB0aGlzLnJlc3BvbnNpdmVNYXBwaW5nLnB1c2gobWFwcGluZyk7XHJcbiAgfVxyXG5cclxuICBhZGRUYXJnZXRpbmcodGFyZ2V0aW5nKSB7XHJcbiAgICB0aGlzLnRhcmdldGluZ3MucHVzaCh0YXJnZXRpbmcpO1xyXG4gIH1cclxuXHJcbiAgYWRkRXhjbHVzaW9uKGV4Y2x1c2lvbikge1xyXG4gICAgdGhpcy5leGNsdXNpb25zLnB1c2goZXhjbHVzaW9uKTtcclxuICB9XHJcblxyXG4gIGFkZFNjcmlwdChzY3JpcHQpIHtcclxuICAgIHRoaXMuc2NyaXB0cy5wdXNoKHNjcmlwdCk7XHJcbiAgfVxyXG5cclxufVxyXG4iLCJpbXBvcnQge1xyXG4gICAgRGlyZWN0aXZlLCBFbGVtZW50UmVmLFxyXG4gICAgSW5qZWN0LCBmb3J3YXJkUmVmLFxyXG4gICAgSG9zdExpc3RlbmVyXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBEZnBBZERpcmVjdGl2ZSB9IGZyb20gJy4vZGZwLWFkLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IERmcFJlZnJlc2hTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZS9kZnAtcmVmcmVzaC5zZXJ2aWNlJztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gICAgc2VsZWN0b3I6ICdkZnAtYWRbcmVzcG9uc2l2ZV0nXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBEZnBBZFJlc3BvbnNpdmVEaXJlY3RpdmUge1xyXG5cclxuICAgIHByaXZhdGUgaWZyYW1lOiBIVE1MSUZyYW1lRWxlbWVudDtcclxuICAgIHByaXZhdGUgaWZyYW1lV2lkdGg6IG51bWJlcjtcclxuICAgIHByaXZhdGUgc2xvdDogYW55O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZixcclxuICAgICAgICBASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gRGZwQWREaXJlY3RpdmUpKVxyXG4gICAgICAgIHByaXZhdGUgYWQ6IERmcEFkRGlyZWN0aXZlLFxyXG4gICAgICAgIHByaXZhdGUgZGZwUmVmcmVzaDogRGZwUmVmcmVzaFNlcnZpY2VcclxuICAgICkge1xyXG4gICAgICAgIHRoaXMuYWQuYWZ0ZXJSZWZyZXNoLnN1YnNjcmliZShldmVudCA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc2xvdCA9IGV2ZW50LnNsb3Q7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgQEhvc3RMaXN0ZW5lcignd2luZG93OnJlc2l6ZScpXHJcbiAgICBub3JtYWxpemVJZnJhbWUoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuYWQuaXNIaWRkZW4pIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmlmcmFtZSA9IHRoaXMuaWZyYW1lIHx8IHRoaXMuZ2V0SWZyYW1lKCk7XHJcbiAgICAgICAgaWYgKCF0aGlzLmlmcmFtZSkgeyByZXR1cm4gZmFsc2U7IH1cclxuXHJcbiAgICAgICAgdGhpcy5pZnJhbWVXaWR0aCA9IHRoaXMuaWZyYW1lV2lkdGggfHwgK3RoaXMuaWZyYW1lLndpZHRoO1xyXG5cclxuICAgICAgICBjb25zdCB3aW5XaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xyXG5cclxuICAgICAgICBsZXQgc3RhdGUgPSB0aGlzLmFkLmdldFN0YXRlKCksXHJcbiAgICAgICAgICAgIHdpZHRoID0gMDtcclxuXHJcbiAgICAgICAgc3RhdGUuc2l6ZXMuZm9yRWFjaChzaXplID0+IHtcclxuICAgICAgICAgICAgaWYgKHNpemVbMF0gPCB3aW5XaWR0aCkge1xyXG4gICAgICAgICAgICAgICAgd2lkdGggPSBNYXRoLm1heCh3aWR0aCwgc2l6ZVswXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKHN0YXRlLnNpemVzLmxlbmd0aCA+IDEgJiYgd2lkdGggIT09IHRoaXMuaWZyYW1lV2lkdGgpIHtcclxuICAgICAgICAgICAgc3RhdGUgPSB0aGlzLmFkLmdldFN0YXRlKCk7XHJcbiAgICAgICAgICAgIHRoaXMuaWZyYW1lV2lkdGggPSB3aWR0aDtcclxuICAgICAgICAgICAgdGhpcy5pZnJhbWUuc2V0QXR0cmlidXRlKCd3aWR0aCcsIHdpZHRoICsgJycpO1xyXG4gICAgICAgICAgICB0aGlzLmRmcFJlZnJlc2guc2xvdFJlZnJlc2godGhpcy5zbG90LCBzdGF0ZS5yZWZyZXNoKS50aGVuKHNsb3QgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hZC5hZnRlclJlZnJlc2guZW1pdCh7IHR5cGU6ICdyZXNpemUnLCBzbG90OiBzbG90IH0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pZnJhbWUgPSB0aGlzLmdldElmcmFtZSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0SWZyYW1lKCkge1xyXG4gICAgICAgIGNvbnN0IGFkOiBFbGVtZW50ID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsXHJcbiAgICAgICAgICAgIGlmcmFtZSA9IGFkLnF1ZXJ5U2VsZWN0b3IoJ2lmcmFtZScpO1xyXG4gICAgICAgIGlmIChpZnJhbWUgJiYgK2lmcmFtZS53aWR0aCA+IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIGlmcmFtZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbmplY3QsIGZvcndhcmRSZWYsIElucHV0LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IERmcEFkRGlyZWN0aXZlIH0gZnJvbSAnLi9kZnAtYWQuZGlyZWN0aXZlJztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnZGZwLXJlc3BvbnNpdmUnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBEZnBSZXNwb25zaXZlRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0IHtcclxuXHJcbiAgQElucHV0KCkgdmlld3BvcnQgPSBbMCwgMF07XHJcbiAgQElucHV0KCkgYWRTaXplcyA9IFtdO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIEBJbmplY3QoZm9yd2FyZFJlZigoKSA9PiBEZnBBZERpcmVjdGl2ZSkpXHJcbiAgICBwcml2YXRlIGFkOiBEZnBBZERpcmVjdGl2ZVxyXG4gICkgeyB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy5hZC5hZGRSZXNwb25zaXZlTWFwcGluZyh0aGlzLmdldFN0YXRlKCkpO1xyXG4gIH1cclxuXHJcbiAgQElucHV0KClcclxuICBzZXQgdmlld1dpZHRoKHZhbDogbnVtYmVyKSB7XHJcbiAgICBpZiAodmFsID4gMCkge1xyXG4gICAgICB0aGlzLnZpZXdwb3J0WzBdID0gdmFsO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgQElucHV0KClcclxuICBzZXQgdmlld0hlaWdodCh2YWw6IG51bWJlcikge1xyXG4gICAgaWYgKHZhbCA+IDApIHtcclxuICAgICAgdGhpcy52aWV3cG9ydFsxXSA9IHZhbDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGFkZFNpemUoc2l6ZSkge1xyXG4gICAgdGhpcy5hZFNpemVzLnB1c2goc2l6ZSk7XHJcbiAgfVxyXG5cclxuICBnZXRTdGF0ZSgpIHtcclxuICAgIHJldHVybiBPYmplY3QuZnJlZXplKHtcclxuICAgICAgdmlld3BvcnRTaXplOiB0aGlzLnZpZXdwb3J0LFxyXG4gICAgICBhZFNpemVzOiB0aGlzLmFkU2l6ZXNcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIElucHV0LCBJbmplY3QsIGZvcndhcmRSZWYsIE9uSW5pdCwgT3B0aW9uYWwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IERmcEFkRGlyZWN0aXZlIH0gZnJvbSAnLi9kZnAtYWQuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgRGZwUmVzcG9uc2l2ZURpcmVjdGl2ZSB9IGZyb20gJy4vZGZwLXJlc3BvbnNpdmUuZGlyZWN0aXZlJztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnZGZwLXNpemUnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBEZnBTaXplRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0IHtcclxuXHJcbiAgQElucHV0KCkgd2lkdGg6IG51bWJlcjtcclxuICBASW5wdXQoKSBoZWlnaHQ6IG51bWJlcjtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXHJcbiAgICBASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gRGZwQWREaXJlY3RpdmUpKVxyXG4gICAgcHJpdmF0ZSBhZDogRGZwQWREaXJlY3RpdmUsXHJcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gRGZwUmVzcG9uc2l2ZURpcmVjdGl2ZSkpXHJcbiAgICBwcml2YXRlIHJlc3A6IERmcFJlc3BvbnNpdmVEaXJlY3RpdmVcclxuICApIHsgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIGNvbnN0IHRhcmdldCA9IHRoaXMucmVzcCB8fCB0aGlzLmFkLFxyXG4gICAgICBpbm5lclRleHQ6IHN0cmluZyA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmlubmVyVGV4dDtcclxuXHJcbiAgICBpZiAodGhpcy53aWR0aCAmJiB0aGlzLmhlaWdodCkge1xyXG4gICAgICB0YXJnZXQuYWRkU2l6ZShbdGhpcy53aWR0aCwgdGhpcy5oZWlnaHRdKTtcclxuICAgIH0gZWxzZSBpZiAoaW5uZXJUZXh0LnRyaW0oKSAhPT0gJycpIHtcclxuICAgICAgdGFyZ2V0LmFkZFNpemUoaW5uZXJUZXh0KTtcclxuICAgIH1cclxuICB9XHJcblxyXG59XHJcbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgQWZ0ZXJDb250ZW50SW5pdCwgSW5wdXQsIEluamVjdCwgZm9yd2FyZFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgREZQSW5jb21wbGV0ZUVycm9yIH0gZnJvbSAnLi4vY2xhc3MnO1xyXG5pbXBvcnQgeyBEZnBBZERpcmVjdGl2ZSB9IGZyb20gJy4vZGZwLWFkLmRpcmVjdGl2ZSc7XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ2RmcC10YXJnZXRpbmcnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBEZnBUYXJnZXRpbmdEaXJlY3RpdmUgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0IHtcclxuXHJcbiAgQElucHV0KCkga2V5OiBzdHJpbmc7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgc2V0IHZhbHVlKHZhbDogc3RyaW5nIHwgQXJyYXk8c3RyaW5nPikge1xyXG4gICAgaWYgKHZhbCBpbnN0YW5jZW9mIEFycmF5KSB7XHJcbiAgICAgIHZhbC5mb3JFYWNoKHYgPT4gdGhpcy5hZGRWYWx1ZSh2KSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmFkZFZhbHVlKHZhbCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHZhbHVlcyA9IFtdO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIEBJbmplY3QoZm9yd2FyZFJlZigoKSA9PiBEZnBBZERpcmVjdGl2ZSkpXHJcbiAgICBwcml2YXRlIGFkOiBEZnBBZERpcmVjdGl2ZVxyXG4gICkgeyB9XHJcblxyXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcclxuICAgIGNvbnN0IHRhcmdldGluZyA9IHRoaXMuZ2V0U3RhdGUoKTtcclxuICAgIHRoaXMuYWQuYWRkVGFyZ2V0aW5nKHRhcmdldGluZyk7XHJcbiAgfVxyXG5cclxuICBjaGVja1ZhbGlkKCkge1xyXG4gICAgaWYgKHRoaXMua2V5ID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhyb3cgbmV3IERGUEluY29tcGxldGVFcnJvcignZGZwLXRhcmdldGluZycsICdrZXknLCB0cnVlKTtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLnZhbHVlcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgdGhyb3cgbmV3IERGUEluY29tcGxldGVFcnJvcignZGZwLXRhcmdldGluZycsICd2YWx1ZScsIHRydWUpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0U3RhdGUoKSB7XHJcbiAgICB0aGlzLmNoZWNrVmFsaWQoKTtcclxuICAgIHJldHVybiBPYmplY3QuZnJlZXplKHtcclxuICAgICAga2V5OiB0aGlzLmtleSxcclxuICAgICAgdmFsdWVzOiB0aGlzLnZhbHVlc1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBhZGRWYWx1ZSh2YWx1ZSkge1xyXG4gICAgaWYgKHZhbHVlICYmICF0aGlzLnZhbHVlcy5maW5kKGl0ZW0gPT4gaXRlbSA9PT0gdmFsdWUpKSB7XHJcbiAgICAgIHRoaXMudmFsdWVzLnB1c2godmFsdWUpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbn1cclxuIiwiaW1wb3J0IHtcclxuICBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsXHJcbiAgSW5qZWN0LCBmb3J3YXJkUmVmLFxyXG4gIE9uSW5pdFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgRGZwQWREaXJlY3RpdmUgfSBmcm9tICcuL2RmcC1hZC5kaXJlY3RpdmUnO1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdkZnAtZXhjbHVzaW9uJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgRGZwRXhjbHVzaW9uRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0IHtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXHJcbiAgICBASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gRGZwQWREaXJlY3RpdmUpKVxyXG4gICAgcHJpdmF0ZSBhZDogRGZwQWREaXJlY3RpdmVcclxuICApIHt9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy5hZC5hZGRFeGNsdXNpb24odGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuaW5uZXJUZXh0KTtcclxuICB9XHJcblxyXG59XHJcbiIsImltcG9ydCB7XHJcbiAgRGlyZWN0aXZlLCBFbGVtZW50UmVmLFxyXG4gIEluamVjdCwgZm9yd2FyZFJlZixcclxuICBPbkluaXRcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IERmcFRhcmdldGluZ0RpcmVjdGl2ZSB9IGZyb20gJy4vZGZwLXRhcmdldGluZy5kaXJlY3RpdmUnO1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdkZnAtdmFsdWUnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBEZnBWYWx1ZURpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxyXG4gICAgQEluamVjdChmb3J3YXJkUmVmKCgpID0+IERmcFRhcmdldGluZ0RpcmVjdGl2ZSkpXHJcbiAgICBwcml2YXRlIHRhcmdldGluZzogRGZwVGFyZ2V0aW5nRGlyZWN0aXZlXHJcbiAgKSB7IH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLnRhcmdldGluZy5hZGRWYWx1ZSh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5pbm5lclRleHQpO1xyXG4gIH1cclxuXHJcbn1cclxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbmplY3QsIFBMQVRGT1JNX0lELCBFbGVtZW50UmVmLCBPbkluaXQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgUmVuZGVyZXIyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuXHJcbmltcG9ydCB7IGxvYWRJbWFTZGsgfSBmcm9tICdAYWx1Z2hhL2ltYSc7XHJcblxyXG5pbXBvcnQgeyBEZnBJREdlbmVyYXRvclNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlL2RmcC1pZC1nZW5lcmF0b3Iuc2VydmljZSc7XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ2RmcC12aWRlbydcclxufSlcclxuZXhwb3J0IGNsYXNzIERmcFZpZGVvRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0IHtcclxuXHJcbiAgQElucHV0KCkgd2lkdGg6IG51bWJlcjtcclxuICBASW5wdXQoKSBoZWlnaHQ6IG51bWJlcjtcclxuXHJcbiAgQElucHV0KCkgYWRUYWc6IHN0cmluZztcclxuICBASW5wdXQoKSBhZEFjdGlvbnM6IEV2ZW50RW1pdHRlcjwncGxheScgfCAncGF1c2UnIHwgJ3Jlc3VtZSc+O1xyXG5cclxuICBAT3V0cHV0KCkgYWRFdmVudHMgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuXHJcbiAgY29udGVudFBsYXllcjogSFRNTFZpZGVvRWxlbWVudDtcclxuICBhZENvbnRhaW5lcjogSFRNTEVsZW1lbnQ7XHJcblxyXG4gIHByaXZhdGUgY29udGVudENvbXBsZXRlQ2FsbGVkOiBib29sZWFuO1xyXG4gIHByaXZhdGUgYWREaXNwbGF5Q29udGFpbmVyOiBnb29nbGUuaW1hLkFkRGlzcGxheUNvbnRhaW5lcjtcclxuICBwcml2YXRlIGFkc0xvYWRlcjogZ29vZ2xlLmltYS5BZHNMb2FkZXI7XHJcbiAgcHJpdmF0ZSBhZHNNYW5hZ2VyOiBnb29nbGUuaW1hLkFkc01hbmFnZXI7XHJcbiAgcHJpdmF0ZSBhZHNEb25lID0gZmFsc2U7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgQEluamVjdChQTEFURk9STV9JRCkgcHJpdmF0ZSBwbGF0Zm9ybUlkOiBPYmplY3QsXHJcbiAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXHJcbiAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXHJcbiAgICBwcml2YXRlIGRmcElER2VuZXJhdG9yOiBEZnBJREdlbmVyYXRvclNlcnZpY2VcclxuICApIHsgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XHJcblxyXG4gICAgICBjb25zdCBlbCA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xyXG5cclxuICAgICAgdGhpcy5kZnBJREdlbmVyYXRvci5kZnBJREdlbmVyYXRvcihlbCk7XHJcblxyXG4gICAgICB0aGlzLmNvbnRlbnRQbGF5ZXIgPSBlbC5xdWVyeVNlbGVjdG9yKCd2aWRlbycpO1xyXG4gICAgICB0aGlzLnJlbmRlcmVyLnNldEF0dHJpYnV0ZSh0aGlzLmNvbnRlbnRQbGF5ZXIsICd3aWR0aCcsIHRoaXMud2lkdGgudG9TdHJpbmcoKSk7XHJcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0QXR0cmlidXRlKHRoaXMuY29udGVudFBsYXllciwgJ2hlaWdodCcsIHRoaXMuaGVpZ2h0LnRvU3RyaW5nKCkpO1xyXG5cclxuICAgICAgdGhpcy5hZENvbnRhaW5lciA9IGVsLnF1ZXJ5U2VsZWN0b3IoJy5hZC1jb250YWluZXInKTtcclxuICAgICAgaWYgKCF0aGlzLmFkQ29udGFpbmVyKSB7XHJcbiAgICAgICAgdGhpcy5hZENvbnRhaW5lciA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLmFkQ29udGFpbmVyLCAnYWQtY29udGFpbmVyJyk7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZChlbCwgdGhpcy5hZENvbnRhaW5lcik7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIGltYSBzZXR1cFxyXG4gICAgICBsb2FkSW1hU2RrKCkudGhlbigoKSA9PiB0aGlzLnNldFVwSU1BKCkpO1xyXG5cclxuICAgICAgLy8gc2ltcGxlIGNvbnRyb2xcclxuICAgICAgdGhpcy5hZEFjdGlvbnMuc3Vic2NyaWJlKGFjdCA9PiB7XHJcbiAgICAgICAgc3dpdGNoIChhY3QpIHtcclxuICAgICAgICAgIGNhc2UgJ3BsYXknOlxyXG4gICAgICAgICAgICB0aGlzLnBsYXkoKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICBjYXNlICdwYXVzZSc6XHJcbiAgICAgICAgICAgIHRoaXMucGF1c2UoKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICBjYXNlICdyZXN1bWUnOlxyXG4gICAgICAgICAgICB0aGlzLnJlc3VtZSgpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcGxheSgpIHtcclxuICAgIGlmICghdGhpcy5hZHNEb25lKSB7XHJcbiAgICAgIHRoaXMuaW5pdGlhbFVzZXJBY3Rpb24oKTtcclxuICAgICAgdGhpcy5sb2FkQWRzKCk7XHJcbiAgICAgIHRoaXMuYWRzRG9uZSA9IHRydWU7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwYXVzZSgpIHtcclxuICAgIGlmICh0aGlzLmFkc01hbmFnZXIpIHtcclxuICAgICAgdGhpcy5hZHNNYW5hZ2VyLnBhdXNlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXN1bWUoKSB7XHJcbiAgICBpZiAodGhpcy5hZHNNYW5hZ2VyKSB7XHJcbiAgICAgIHRoaXMuYWRzTWFuYWdlci5yZXN1bWUoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNldFVwSU1BKCkge1xyXG4gICAgLy8gQ3JlYXRlIHRoZSBhZCBkaXNwbGF5IGNvbnRhaW5lci5cclxuICAgIHRoaXMuYWREaXNwbGF5Q29udGFpbmVyID0gbmV3IGdvb2dsZS5pbWEuQWREaXNwbGF5Q29udGFpbmVyKHRoaXMuYWRDb250YWluZXIsIHRoaXMuY29udGVudFBsYXllcik7XHJcbiAgICAvLyBDcmVhdGUgYWRzIGxvYWRlci5cclxuICAgIHRoaXMuYWRzTG9hZGVyID0gbmV3IGdvb2dsZS5pbWEuQWRzTG9hZGVyKHRoaXMuYWREaXNwbGF5Q29udGFpbmVyKTtcclxuICAgIC8vIExpc3RlbiBhbmQgcmVzcG9uZCB0byBhZHMgbG9hZGVkIGFuZCBlcnJvciBldmVudHMuXHJcbiAgICB0aGlzLmFkc0xvYWRlci5hZGRFdmVudExpc3RlbmVyKFxyXG4gICAgICBnb29nbGUuaW1hLkFkc01hbmFnZXJMb2FkZWRFdmVudC5UeXBlLkFEU19NQU5BR0VSX0xPQURFRCxcclxuICAgICAgZXZlbnQgPT4gdGhpcy5vbkFkc01hbmFnZXJMb2FkZWQoZXZlbnQpLFxyXG4gICAgICBmYWxzZSk7XHJcbiAgICB0aGlzLmFkc0xvYWRlci5hZGRFdmVudExpc3RlbmVyKFxyXG4gICAgICBnb29nbGUuaW1hLkFkRXJyb3JFdmVudC5UeXBlLkFEX0VSUk9SLFxyXG4gICAgICBldmVudCA9PiB0aGlzLm9uQWRFcnJvcihldmVudCksXHJcbiAgICAgIGZhbHNlKTtcclxuXHJcbiAgICAvLyBBbiBldmVudCBsaXN0ZW5lciB0byB0ZWxsIHRoZSBTREsgdGhhdCBvdXIgY29udGVudCB2aWRlb1xyXG4gICAgLy8gaXMgY29tcGxldGVkIHNvIHRoZSBTREsgY2FuIHBsYXkgYW55IHBvc3Qtcm9sbCBhZHMuXHJcbiAgICB0aGlzLmNvbnRlbnRQbGF5ZXIub25lbmRlZCA9ICgpID0+IHtcclxuICAgICAgdGhpcy5jb250ZW50RW5kZWQoKTtcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBpbml0aWFsVXNlckFjdGlvbigpIHtcclxuICAgIHRoaXMuYWREaXNwbGF5Q29udGFpbmVyLmluaXRpYWxpemUoKTtcclxuICAgIHRoaXMuY29udGVudFBsYXllci5sb2FkKCk7XHJcbiAgfVxyXG5cclxuICByZXF1ZXN0QWRzKGFkVGFnVXJsKSB7XHJcbiAgICBjb25zdCBhZHNSZXF1ZXN0ID0gbmV3IGdvb2dsZS5pbWEuQWRzUmVxdWVzdCgpO1xyXG4gICAgYWRzUmVxdWVzdC5hZFRhZ1VybCA9IGFkVGFnVXJsO1xyXG4gICAgYWRzUmVxdWVzdC5saW5lYXJBZFNsb3RXaWR0aCA9IHRoaXMud2lkdGg7XHJcbiAgICBhZHNSZXF1ZXN0LmxpbmVhckFkU2xvdEhlaWdodCA9IHRoaXMuaGVpZ2h0O1xyXG4gICAgYWRzUmVxdWVzdC5ub25MaW5lYXJBZFNsb3RXaWR0aCA9IHRoaXMud2lkdGg7XHJcbiAgICBhZHNSZXF1ZXN0Lm5vbkxpbmVhckFkU2xvdEhlaWdodCA9IHRoaXMuaGVpZ2h0O1xyXG4gICAgdGhpcy5hZHNMb2FkZXIucmVxdWVzdEFkcyhhZHNSZXF1ZXN0KTtcclxuICB9XHJcblxyXG4gIGNvbnRlbnRFbmRlZCgpIHtcclxuICAgIHRoaXMuY29udGVudENvbXBsZXRlQ2FsbGVkID0gdHJ1ZTtcclxuICAgIHRoaXMuYWRzTG9hZGVyLmNvbnRlbnRDb21wbGV0ZSgpO1xyXG4gIH1cclxuXHJcbiAgb25BZHNNYW5hZ2VyTG9hZGVkKGFkc01hbmFnZXJMb2FkZWRFdmVudCkge1xyXG4gICAgY29uc3QgYWRzUmVuZGVyaW5nU2V0dGluZ3MgPSBuZXcgZ29vZ2xlLmltYS5BZHNSZW5kZXJpbmdTZXR0aW5ncygpO1xyXG4gICAgYWRzUmVuZGVyaW5nU2V0dGluZ3MucmVzdG9yZUN1c3RvbVBsYXliYWNrU3RhdGVPbkFkQnJlYWtDb21wbGV0ZSA9IHRydWU7XHJcbiAgICB0aGlzLmFkc01hbmFnZXIgPSBhZHNNYW5hZ2VyTG9hZGVkRXZlbnQuZ2V0QWRzTWFuYWdlcihcclxuICAgICAgdGhpcy5jb250ZW50UGxheWVyLCBhZHNSZW5kZXJpbmdTZXR0aW5ncyk7XHJcbiAgICB0aGlzLnN0YXJ0QWRzTWFuYWdlcih0aGlzLmFkc01hbmFnZXIpO1xyXG4gIH1cclxuXHJcbiAgc3RhcnRBZHNNYW5hZ2VyKGFkc01hbmFnZXIpIHtcclxuICAgIC8vIEF0dGFjaCB0aGUgcGF1c2UvcmVzdW1lIGV2ZW50cy5cclxuICAgIGFkc01hbmFnZXIuYWRkRXZlbnRMaXN0ZW5lcihcclxuICAgICAgZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuQ09OVEVOVF9QQVVTRV9SRVFVRVNURUQsXHJcbiAgICAgICgpID0+IHRoaXMub25Db250ZW50UGF1c2VSZXF1ZXN0ZWQoKSxcclxuICAgICAgZmFsc2UsXHJcbiAgICAgIHRoaXMpO1xyXG4gICAgYWRzTWFuYWdlci5hZGRFdmVudExpc3RlbmVyKFxyXG4gICAgICBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5DT05URU5UX1JFU1VNRV9SRVFVRVNURUQsXHJcbiAgICAgICgpID0+IHRoaXMub25Db250ZW50UmVzdW1lUmVxdWVzdGVkKCksXHJcbiAgICAgIGZhbHNlLFxyXG4gICAgICB0aGlzKTtcclxuICAgIC8vIEhhbmRsZSBlcnJvcnMuXHJcbiAgICBhZHNNYW5hZ2VyLmFkZEV2ZW50TGlzdGVuZXIoXHJcbiAgICAgIGdvb2dsZS5pbWEuQWRFcnJvckV2ZW50LlR5cGUuQURfRVJST1IsXHJcbiAgICAgIGV2ZW50ID0+IHRoaXMub25BZEVycm9yKGV2ZW50KSxcclxuICAgICAgZmFsc2UsXHJcbiAgICAgIHRoaXMpO1xyXG4gICAgY29uc3QgZXZlbnRzID0gW2dvb2dsZS5pbWEuQWRFdmVudC5UeXBlLkFMTF9BRFNfQ09NUExFVEVELFxyXG4gICAgZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuQ0xJQ0ssXHJcbiAgICBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5DT01QTEVURSxcclxuICAgIGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLkZJUlNUX1FVQVJUSUxFLFxyXG4gICAgZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuTE9BREVELFxyXG4gICAgZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuTUlEUE9JTlQsXHJcbiAgICBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5QQVVTRUQsXHJcbiAgICBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5TVEFSVEVELFxyXG4gICAgZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuVEhJUkRfUVVBUlRJTEVdO1xyXG4gICAgZXZlbnRzLmZvckVhY2goZXZlbnQgPT5cclxuICAgICAgYWRzTWFuYWdlci5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBhZEV2ZW50ID0+IHRoaXMub25BZEV2ZW50KGFkRXZlbnQpLCBmYWxzZSlcclxuICAgICk7XHJcblxyXG4gICAgYWRzTWFuYWdlci5pbml0KFxyXG4gICAgICB0aGlzLndpZHRoLFxyXG4gICAgICB0aGlzLmhlaWdodCxcclxuICAgICAgZ29vZ2xlLmltYS5WaWV3TW9kZS5OT1JNQUwpO1xyXG5cclxuICAgIGFkc01hbmFnZXIuc3RhcnQoKTtcclxuICB9XHJcblxyXG4gIG9uQ29udGVudFBhdXNlUmVxdWVzdGVkKCkge1xyXG4gICAgdGhpcy5wYXVzZUZvckFkKCk7XHJcbiAgfVxyXG5cclxuICBvbkNvbnRlbnRSZXN1bWVSZXF1ZXN0ZWQoKSB7XHJcbiAgICAvLyBXaXRob3V0IHRoaXMgY2hlY2sgdGhlIHZpZGVvIHN0YXJ0cyBvdmVyIGZyb20gdGhlIGJlZ2lubmluZyBvbiBhXHJcbiAgICAvLyBwb3N0LXJvbGwncyBDT05URU5UX1JFU1VNRV9SRVFVRVNURURcclxuICAgIGlmICghdGhpcy5jb250ZW50Q29tcGxldGVDYWxsZWQpIHtcclxuICAgICAgdGhpcy5yZXN1bWVBZnRlckFkKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBvbkFkRXZlbnQoYWRFdmVudCkge1xyXG4gICAgaWYgKGFkRXZlbnQudHlwZSA9PT0gZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuTE9BREVEKSB7XHJcbiAgICAgIGNvbnN0IGFkID0gYWRFdmVudC5nZXRBZCgpO1xyXG4gICAgICBpZiAoIWFkLmlzTGluZWFyKCkpIHtcclxuICAgICAgICB0aGlzLm9uQ29udGVudFJlc3VtZVJlcXVlc3RlZCgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICB0aGlzLmFkRXZlbnRzLmVtaXQoYWRFdmVudCk7XHJcbiAgfVxyXG5cclxuICBvbkFkRXJyb3IoYWRFcnJvckV2ZW50KSB7XHJcbiAgICBpZiAodGhpcy5hZHNNYW5hZ2VyKSB7XHJcbiAgICAgIHRoaXMuYWRzTWFuYWdlci5kZXN0cm95KCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLnJlc3VtZUFmdGVyQWQoKTtcclxuICAgIHRoaXMuYWRFdmVudHMuZW1pdChhZEVycm9yRXZlbnQpO1xyXG4gIH1cclxuXHJcbiAgLy8gYXBwbGljYXRpb24gZnVuY3Rpb25zXHJcblxyXG4gIHJlc3VtZUFmdGVyQWQoKSB7XHJcbiAgICB0aGlzLmNvbnRlbnRQbGF5ZXIucGxheSgpO1xyXG4gIH1cclxuXHJcbiAgcGF1c2VGb3JBZCgpIHtcclxuICAgIHRoaXMuY29udGVudFBsYXllci5wYXVzZSgpO1xyXG4gIH1cclxuXHJcbiAgbG9hZEFkcygpIHtcclxuICAgIHRoaXMucmVxdWVzdEFkcyh0aGlzLmFkVGFnKTtcclxuICB9XHJcblxyXG59XHJcbiIsImltcG9ydCB7XHJcbiAgRGlyZWN0aXZlLCBFbGVtZW50UmVmLFxyXG4gIElucHV0LFxyXG4gIE9uSW5pdCxcclxuICBJbmplY3QsXHJcbiAgUExBVEZPUk1fSURcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgaXNQbGF0Zm9ybUJyb3dzZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdkZnAtYXVkaWVuY2UtcGl4ZWwnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBEZnBBdWRpZW5jZVBpeGVsRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0IHtcclxuXHJcbiAgQElucHV0KCkgYWRVbml0OiBzdHJpbmc7XHJcbiAgQElucHV0KCkgc2VnbWVudElkOiBudW1iZXI7XHJcbiAgQElucHV0KCkgcHBpZDogbnVtYmVyO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIEBJbmplY3QoUExBVEZPUk1fSUQpIHByaXZhdGUgcGxhdGZvcm1JZDogT2JqZWN0LFxyXG4gICAgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmXHJcbiAgKSB7IH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xyXG4gICAgICBjb25zdCBheGVsID0gTWF0aC5yYW5kb20oKSxcclxuICAgICAgICByYW5kb20gPSBheGVsICogMTAwMDAwMDAwMDAwMDA7XHJcblxyXG4gICAgICBsZXQgYWRVbml0ID0gJyc7XHJcbiAgICAgIGlmICh0aGlzLmFkVW5pdCkge1xyXG4gICAgICAgIGFkVW5pdCA9IGBkY19pdT0ke3RoaXMuYWRVbml0fWA7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGxldCBwcGlkID0gJyc7XHJcbiAgICAgIGlmICh0aGlzLnBwaWQpIHtcclxuICAgICAgICBwcGlkID0gYHBwaWQ9JHt0aGlzLnBwaWR9YDtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgcGl4ZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcclxuXHJcbiAgICAgIHBpeGVsLnNyYyA9ICdodHRwczovL3B1YmFkcy5nLmRvdWJsZWNsaWNrLm5ldC9hY3Rpdml0eTtvcmQ9JztcclxuICAgICAgcGl4ZWwuc3JjICs9IGAke3JhbmRvbX07ZGNfc2VnPSR7dGhpcy5zZWdtZW50SWR9OyR7YWRVbml0fSR7cHBpZH1gO1xyXG5cclxuICAgICAgcGl4ZWwud2lkdGggPSAxO1xyXG4gICAgICBwaXhlbC5oZWlnaHQgPSAxO1xyXG4gICAgICBwaXhlbC5ib3JkZXIgPSAnMCc7XHJcblxyXG4gICAgICBwaXhlbC5zdHlsZS52aXNpYmlsaXR5ID0gJ2hpZGRlbic7XHJcblxyXG4gICAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5hcHBlbmQocGl4ZWwpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBOZ01vZHVsZSwgSW5qZWN0aW9uVG9rZW4gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTW9kdWxlV2l0aFByb3ZpZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgRGZwQ29uZmlnLCB9IGZyb20gJy4vY2xhc3MnO1xyXG5pbXBvcnQgeyBERlBfQ09ORklHIH0gZnJvbSAnLi9zZXJ2aWNlL2luamVjdGlvbl90b2tlbic7XHJcblxyXG5pbXBvcnQgeyBJZGxlU2VydmljZSB9IGZyb20gJy4vc2VydmljZS9pZGxlLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBIdHRwRXJyb3JTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlL2h0dHAtZXJyb3Iuc2VydmljZSc7XHJcbmltcG9ydCB7IFBhcnNlRHVyYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlL3BhcnNlLWR1cmF0aW9uLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBTY3JpcHRJbmplY3RvclNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2Uvc2NyaXB0LWluamVjdG9yLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBEZnBTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlL2RmcC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgRGZwSURHZW5lcmF0b3JTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlL2RmcC1pZC1nZW5lcmF0b3Iuc2VydmljZSc7XHJcbmltcG9ydCB7IERmcFJlZnJlc2hTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlL2RmcC1yZWZyZXNoLnNlcnZpY2UnO1xyXG5cclxuaW1wb3J0IHsgRGZwQWREaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZS9kZnAtYWQuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgRGZwU2l6ZURpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlL2RmcC1zaXplLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IERmcFJlc3BvbnNpdmVEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZS9kZnAtcmVzcG9uc2l2ZS5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBEZnBBZFJlc3BvbnNpdmVEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZS9kZnAtYWQtcmVzcG9uc2l2ZS5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBEZnBUYXJnZXRpbmdEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZS9kZnAtdGFyZ2V0aW5nLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IERmcEV4Y2x1c2lvbkRpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlL2RmcC1leGNsdXNpb24uZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgRGZwVmFsdWVEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZS9kZnAtdmFsdWUuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgRGZwVmlkZW9EaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZS9kZnAtdmlkZW8uZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgRGZwQXVkaWVuY2VQaXhlbERpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlL2RmcC1hdWRpZW5jZS1waXhlbC5kaXJlY3RpdmUnO1xyXG5cclxuY29uc3QgRElSRUNUSVZFUyA9IFtcclxuICBEZnBBZERpcmVjdGl2ZSxcclxuICBEZnBTaXplRGlyZWN0aXZlLFxyXG4gIERmcFJlc3BvbnNpdmVEaXJlY3RpdmUsXHJcbiAgRGZwQWRSZXNwb25zaXZlRGlyZWN0aXZlLFxyXG4gIERmcFRhcmdldGluZ0RpcmVjdGl2ZSwgRGZwRXhjbHVzaW9uRGlyZWN0aXZlLCBEZnBWYWx1ZURpcmVjdGl2ZSxcclxuICBEZnBWaWRlb0RpcmVjdGl2ZSxcclxuICBEZnBBdWRpZW5jZVBpeGVsRGlyZWN0aXZlXHJcbl07XHJcblxyXG5jb25zdCBTRVJWSUNFUyA9IFtcclxuICBIdHRwRXJyb3JTZXJ2aWNlLFxyXG4gIFBhcnNlRHVyYXRpb25TZXJ2aWNlLFxyXG4gIFNjcmlwdEluamVjdG9yU2VydmljZSxcclxuICBEZnBTZXJ2aWNlLCBEZnBJREdlbmVyYXRvclNlcnZpY2UsIERmcFJlZnJlc2hTZXJ2aWNlXHJcbl07XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtcclxuXHJcbiAgXSxcclxuICBkZWNsYXJhdGlvbnM6IFtcclxuICAgIC4uLkRJUkVDVElWRVNcclxuICBdLFxyXG4gIHByb3ZpZGVyczogW1xyXG4gICAgLi4uU0VSVklDRVNcclxuICBdLFxyXG4gIGV4cG9ydHM6IFtcclxuICAgIC4uLkRJUkVDVElWRVNcclxuICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBEZnBNb2R1bGUge1xyXG4gIHN0YXRpYyBmb3JSb290KGNvbmZpZz86IERmcENvbmZpZyk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgbmdNb2R1bGU6IERmcE1vZHVsZSxcclxuICAgICAgcHJvdmlkZXJzOiBbXHJcbiAgICAgICAgLi4uKGNvbmZpZyAmJiBjb25maWcuaWRsZUxvYWQgPT09IHRydWUgPyBbSWRsZVNlcnZpY2VdIDogW10pLFxyXG4gICAgICAgIHsgcHJvdmlkZTogREZQX0NPTkZJRywgdXNlVmFsdWU6IGNvbmZpZyB8fCB7fSB9XHJcbiAgICAgIF1cclxuICAgIH07XHJcbiAgfVxyXG59XHJcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBO0FBSUEsTUFBYSxVQUFVLEdBQUcsSUFBSSxjQUFjLENBQVksV0FBVyxDQUFDOzs7Ozs7QUNKcEU7Ozs7O0lBUUUsWUFDdUIsVUFBa0IsRUFDdkMsSUFBWTs7UUFFWixNQUFNLEdBQUcsR0FBUSxpQkFBaUIsQ0FBQyxVQUFVLENBQUMsR0FBRyxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQzdELElBQUksR0FBRyxDQUFDLG1CQUFtQixFQUFFO1lBQzNCLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxDQUFDLEdBQUc7Z0JBQzdCLE9BQU8sR0FBRyxDQUFDLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ3JDLENBQUM7U0FDSDthQUFNO1lBQ0wsSUFBSSxDQUFDLG1CQUFtQixHQUFHLENBQUMsR0FBRztnQkFDN0IsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxHQUFHLENBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO2FBQzlELENBQUM7U0FDSDtLQUNGOzs7OztJQUVELE9BQU8sQ0FBQyxHQUFHO1FBQ1QsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQy9COzs7WUF2QkYsVUFBVTs7OztZQU0wQixNQUFNLHVCQUF0QyxNQUFNLFNBQUMsV0FBVztZQVRGLE1BQU07Ozs7Ozs7QUNBM0I7OzJCQVNnQixVQUFVLElBQUk7WUFDMUIsSUFBSSxPQUFPLElBQUksS0FBSyxRQUFRLEVBQUU7Z0JBQzVCLE9BQU8sRUFBRSxJQUFJLElBQUksR0FBRyxJQUFJLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQzthQUNyQztZQUNELE9BQU8sSUFBSSxDQUFD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