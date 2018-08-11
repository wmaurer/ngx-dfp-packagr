/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable, Optional, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { DfpConfig, DFP_CONFIG } from '../class';
import { IdleService } from './idle.service';
import { ScriptInjectorService } from './script-injector.service';
/** @type {?} */
export var GPT_LIBRARY_URL = '//www.googletagservices.com/tag/js/gpt.js';
var DFPConfigurationError = /** @class */ (function (_super) {
    tslib_1.__extends(DFPConfigurationError, _super);
    function DFPConfigurationError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return DFPConfigurationError;
}(Error));
var DfpService = /** @class */ (function () {
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
        if (isPlatformBrowser(this.platformId)) {
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
        if (isPlatformBrowser(this.platformId)) {
            /** @type {?} */
            var win = window;
            /** @type {?} */
            var googletag = win.googletag;
            googletag.cmd.push(task);
        }
    };
    DfpService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    DfpService.ctorParameters = function () { return [
        { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] },
        { type: IdleService, decorators: [{ type: Optional }] },
        { type: DfpConfig, decorators: [{ type: Inject, args: [DFP_CONFIG,] }] },
        { type: ScriptInjectorService }
    ]; };
    return DfpService;
}());
export { DfpService };
function DfpService_tsickle_Closure_declarations() {
    /** @type {?} */
    DfpService.prototype.enableVideoAds;
    /** @type {?} */
    DfpService.prototype.personalizedAds;
    /** @type {?} */
    DfpService.prototype.collapseIfEmpty;
    /** @type {?} */
    DfpService.prototype.centering;
    /** @type {?} */
    DfpService.prototype.location;
    /** @type {?} */
    DfpService.prototype.ppid;
    /** @type {?} */
    DfpService.prototype.globalTargeting;
    /** @type {?} */
    DfpService.prototype.forceSafeFrame;
    /** @type {?} */
    DfpService.prototype.safeFrameConfig;
    /** @type {?} */
    DfpService.prototype.loadGPT;
    /** @type {?} */
    DfpService.prototype.loaded;
    /** @type {?} */
    DfpService.prototype.platformId;
    /** @type {?} */
    DfpService.prototype.config;
    /** @type {?} */
    DfpService.prototype.scriptInjector;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGZwLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZGZwLyIsInNvdXJjZXMiOlsic3JjL3NlcnZpY2UvZGZwLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxXQUFXLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRXBELE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQ2pELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQzs7QUFFbEUsV0FBYSxlQUFlLEdBQUcsMkNBQTJDLENBQUM7QUFFM0UsSUFBQTtJQUFvQyxpREFBSzs7OztnQ0FUekM7RUFTb0MsS0FBSyxFQUFJLENBQUE7O0lBMkIzQyxvQkFDK0IsVUFBa0IsRUFDbkMsUUFBcUIsRUFDTCxNQUFpQixFQUNyQztRQUpWLGlCQStCQztRQTlCOEIsZUFBVSxHQUFWLFVBQVUsQ0FBUTtRQUVuQixXQUFNLEdBQU4sTUFBTSxDQUFXO1FBQ3JDLG1CQUFjLEdBQWQsY0FBYzs4QkExQkMsS0FBSzsrQkFFSixJQUFJOytCQUVKLElBQUk7eUJBRVYsS0FBSzt3QkFFTixJQUFJO29CQUVSLElBQUk7K0JBRU8sSUFBSTs4QkFFTCxLQUFLOytCQUVKLElBQUk7dUJBRVosSUFBSTtzQkFFTCxLQUFLO1FBUXBCLEVBQUUsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7O1lBQ3ZDLElBQU0sR0FBRyxHQUFRLE1BQU0sQ0FDVzs7WUFEbEMsSUFDRSxTQUFTLEdBQUcsR0FBRyxDQUFDLFNBQVMsSUFBSSxFQUFFLENBQUM7WUFFbEMsSUFBSSxD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QVc7Z0JBakNkLFdBQVcsdUJBa0NmLFFBQVE7Z0JBbkNKLFNBQVMsdUJBb0NiLE1BQU0sU0FBQyxVQUFVO2dCQWxDYixxQkFBcUI7O3FCQUw5Qjs7U0FZYSxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgT3B0aW9uYWwsIFBMQVRGT1JNX0lELCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgaXNQbGF0Zm9ybUJyb3dzZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5cclxuaW1wb3J0IHsgRGZwQ29uZmlnLCBERlBfQ09ORklHIH0gZnJvbSAnLi4vY2xhc3MnO1xyXG5pbXBvcnQgeyBJZGxlU2VydmljZSB9IGZyb20gJy4vaWRsZS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgU2NyaXB0SW5qZWN0b3JTZXJ2aWNlIH0gZnJvbSAnLi9zY3JpcHQtaW5qZWN0b3Iuc2VydmljZSc7XHJcblxyXG5leHBvcnQgY29uc3QgR1BUX0xJQlJBUllfVVJMID0gJy8vd3d3Lmdvb2dsZXRhZ3NlcnZpY2VzLmNvbS90YWcvanMvZ3B0LmpzJztcclxuXHJcbmNsYXNzIERGUENvbmZpZ3VyYXRpb25FcnJvciBleHRlbmRzIEVycm9yIHsgfVxyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgRGZwU2VydmljZSB7XHJcblxyXG4gIHByaXZhdGUgZW5hYmxlVmlkZW9BZHMgPSBmYWxzZTtcclxuXHJcbiAgcHJpdmF0ZSBwZXJzb25hbGl6ZWRBZHMgPSB0cnVlO1xyXG5cclxuICBwcml2YXRlIGNvbGxhcHNlSWZFbXB0eSA9IHRydWU7XHJcblxyXG4gIHByaXZhdGUgY2VudGVyaW5nID0gZmFsc2U7XHJcblxyXG4gIHByaXZhdGUgbG9jYXRpb24gPSBudWxsO1xyXG5cclxuICBwcml2YXRlIHBwaWQgPSBudWxsO1xyXG5cclxuICBwcml2YXRlIGdsb2JhbFRhcmdldGluZyA9IG51bGw7XHJcblxyXG4gIHByaXZhdGUgZm9yY2VTYWZlRnJhbWUgPSBmYWxzZTtcclxuXHJcbiAgcHJpdmF0ZSBzYWZlRnJhbWVDb25maWcgPSBudWxsO1xyXG5cclxuICBwcml2YXRlIGxvYWRHUFQgPSB0cnVlO1xyXG5cclxuICBwcml2YXRlIGxvYWRlZCA9IGZhbHNlO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIEBJbmplY3QoUExBVEZPUk1fSUQpIHByaXZhdGUgcGxhdGZvcm1JZDogT2JqZWN0LFxyXG4gICAgQE9wdGlvbmFsKCkgaWRsZUxvYWQ6IElkbGVTZXJ2aWNlLFxyXG4gICAgQEluamVjdChERlBfQ09ORklHKSBwcml2YXRlIGNvbmZpZzogRGZwQ29uZmlnLFxyXG4gICAgcHJpdmF0ZSBzY3JpcHRJbmplY3RvcjogU2NyaXB0SW5qZWN0b3JTZXJ2aWNlXHJcbiAgKSB7XHJcbiAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xyXG4gICAgICBjb25zdCB3aW46IGFueSA9IHdpbmRvdyxcclxuICAgICAgICBnb29nbGV0YWcgPSB3aW4uZ29vZ2xldGFnIHx8IHt9O1xyXG5cclxuICAgICAgdGhpcy5kZnBDb25maWcoKTtcclxuXHJcbiAgICAgIGdvb2dsZXRhZy5jbWQgPSBnb29nbGV0YWcuY21kIHx8IFtdO1xyXG4gICAgICBnb29nbGV0YWcuY21kLnB1c2goKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuc2V0dXAoKTtcclxuICAgICAgfSk7XHJcbiAgICAgIHdpbi5nb29nbGV0YWcgPSBnb29nbGV0YWc7XHJcblxyXG4gICAgICBpZiAodGhpcy5sb2FkR1BUKSB7XHJcbiAgICAgICAgY29uc3QgbG9hZFNjcmlwdCA9ICgpID0+IHtcclxuICAgICAgICAgIHRoaXMuc2NyaXB0SW5qZWN0b3Iuc2NyaXB0SW5qZWN0b3IoR1BUX0xJQlJBUllfVVJMKS50aGVuKChzY3JpcHQpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5sb2FkZWQgPSB0cnVlO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBpZiAoaWRsZUxvYWQpIHtcclxuICAgICAgICAgIGlkbGVMb2FkLnJlcXVlc3QobG9hZFNjcmlwdCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGxvYWRTY3JpcHQoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgZGZwQ29uZmlnKCkge1xyXG4gICAgZm9yIChjb25zdCBrZXkgaW4gdGhpcy5jb25maWcpIHtcclxuICAgICAgaWYgKHRoaXMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xyXG4gICAgICAgIHRoaXNba2V5XSA9IHRoaXMuY29uZmlnW2tleV07XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgYWRkU2FmZUZyYW1lQ29uZmlnKHB1YmFkcykge1xyXG4gICAgaWYgKCF0aGlzLnNhZmVGcmFtZUNvbmZpZykgeyByZXR1cm4gZmFsc2U7IH1cclxuICAgIGlmICh0eXBlb2YgdGhpcy5zYWZlRnJhbWVDb25maWcgIT09ICdvYmplY3QnKSB7XHJcbiAgICAgIHRocm93IG5ldyBERlBDb25maWd1cmF0aW9uRXJyb3IoJ0ZyYW1lQ29uZmlnIG11c3QgYmUgYW4gb2JqZWN0Jyk7XHJcbiAgICB9XHJcbiAgICBwdWJhZHMuc2V0U2FmZUZyYW1lQ29uZmlnKHRoaXMuc2FmZUZyYW1lQ29uZmlnKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgYWRkVGFyZ2V0aW5nKHB1YmFkcykge1xyXG4gICAgaWYgKCF0aGlzLmdsb2JhbFRhcmdldGluZykgeyByZXR1cm4gZmFsc2U7IH1cclxuICAgIGlmICh0eXBlb2YgdGhpcy5nbG9iYWxUYXJnZXRpbmcgIT09ICdvYmplY3QnKSB7XHJcbiAgICAgIHRocm93IG5ldyBERlBDb25maWd1cmF0aW9uRXJyb3IoJ1RhcmdldGluZyBtdXN0IGJlIGFuIG9iamVjdCcpO1xyXG4gICAgfVxyXG5cclxuICAgIGZvciAoY29uc3Qga2V5IGluIHRoaXMuZ2xvYmFsVGFyZ2V0aW5nKSB7XHJcbiAgICAgIGlmICh0aGlzLmdsb2JhbFRhcmdldGluZy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XHJcbiAgICAgICAgcHViYWRzLnNldFRhcmdldGluZyhrZXksIHRoaXMuZ2xvYmFsVGFyZ2V0aW5nW2tleV0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGFkZExvY2F0aW9uKHB1YmFkcykge1xyXG4gICAgaWYgKCF0aGlzLmxvY2F0aW9uKSB7IHJldHVybiBmYWxzZTsgfVxyXG5cclxuICAgIGlmICh0eXBlb2YgdGhpcy5sb2NhdGlvbiA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgcHViYWRzLnNldExvY2F0aW9uKHRoaXMubG9jYXRpb24pO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFBcnJheS5pc0FycmF5KHRoaXMubG9jYXRpb24pKSB7XHJcbiAgICAgIHRocm93IG5ldyBERlBDb25maWd1cmF0aW9uRXJyb3IoJ0xvY2F0aW9uIG11c3QgYmUgYW4gJyArXHJcbiAgICAgICAgJ2FycmF5IG9yIHN0cmluZycpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmFkcy5zZXRMb2NhdGlvbi5hcHBseShwdWJhZHMsIHRoaXMubG9jYXRpb24pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBhZGRQUElEKHB1YmFkcykge1xyXG4gICAgaWYgKCF0aGlzLnBwaWQpIHsgcmV0dXJuIGZhbHNlOyB9XHJcbiAgICBpZiAodHlwZW9mIHRoaXMucHBpZCAhPT0gJ3N0cmluZycpIHtcclxuICAgICAgdGhyb3cgbmV3IERGUENvbmZpZ3VyYXRpb25FcnJvcignUFBJRCBtdXN0IGJlIGEgc3RyaW5nJyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHViYWRzLnNldFB1Ymxpc2hlclByb3ZpZGVkSWQodGhpcy5wcGlkKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgc2V0dXAoKSB7XHJcbiAgICBjb25zdCB3aW46IGFueSA9IHdpbmRvdyxcclxuICAgICAgZ29vZ2xldGFnID0gd2luLmdvb2dsZXRhZyxcclxuICAgICAgcHViYWRzID0gZ29vZ2xldGFnLnB1YmFkcygpO1xyXG5cclxuICAgIGlmICh0aGlzLmVuYWJsZVZpZGVvQWRzKSB7XHJcbiAgICAgIHB1YmFkcy5lbmFibGVWaWRlb0FkcygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHBlcnNvbmFsaXplZEFkcyBpcyBkZWZhdWx0XHJcbiAgICBpZiAodGhpcy5wZXJzb25hbGl6ZWRBZHMgPT09IGZhbHNlKSB7XHJcbiAgICAgIHB1YmFkcy5zZXRSZXF1ZXN0Tm9uUGVyc29uYWxpemVkQWRzKDEpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLmNvbGxhcHNlSWZFbXB0eSkge1xyXG4gICAgICBwdWJhZHMuY29sbGFwc2VFbXB0eURpdnMoKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBXZSBhbHdheXMgcmVmcmVzaCBvdXJzZWx2ZXNcclxuICAgIHB1YmFkcy5kaXNhYmxlSW5pdGlhbExvYWQoKTtcclxuXHJcbiAgICBwdWJhZHMuc2V0Rm9yY2VTYWZlRnJhbWUodGhpcy5mb3JjZVNhZmVGcmFtZSk7XHJcbiAgICBwdWJhZHMuc2V0Q2VudGVyaW5nKHRoaXMuY2VudGVyaW5nKTtcclxuXHJcbiAgICB0aGlzLmFkZExvY2F0aW9uKHB1YmFkcyk7XHJcbiAgICB0aGlzLmFkZFBQSUQocHViYWRzKTtcclxuICAgIHRoaXMuYWRkVGFyZ2V0aW5nKHB1YmFkcyk7XHJcbiAgICB0aGlzLmFkZFNhZmVGcmFtZUNvbmZpZyhwdWJhZHMpO1xyXG5cclxuICAgIC8vIHB1YmFkcy5lbmFibGVTeW5jUmVuZGVyaW5nKCk7XHJcbiAgICBwdWJhZHMuZW5hYmxlQXN5bmNSZW5kZXJpbmcoKTtcclxuXHJcbiAgICBpZiAodGhpcy5jb25maWcuc2luZ2xlUmVxdWVzdE1vZGUgIT09IHRydWUpIHtcclxuICAgICAgaWYgKHRoaXMuY29uZmlnLmVuYWJsZVZpZGVvQWRzKSB7XHJcbiAgICAgICAgcHViYWRzLmVuYWJsZVZpZGVvQWRzKCk7XHJcbiAgICAgIH1cclxuICAgICAgZ29vZ2xldGFnLmVuYWJsZVNlcnZpY2VzKCk7XHJcbiAgICB9XHJcblxyXG4gIH1cclxuXHJcbiAgaGFzTG9hZGVkKCkge1xyXG4gICAgcmV0dXJuIHRoaXMubG9hZGVkO1xyXG4gIH1cclxuXHJcbiAgZGVmaW5lVGFzayh0YXNrKSB7XHJcbiAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xyXG4gICAgICBjb25zdCB3aW46IGFueSA9IHdpbmRvdyxcclxuICAgICAgICBnb29nbGV0YWcgPSB3aW4uZ29vZ2xldGFnO1xyXG4gICAgICBnb29nbGV0YWcuY21kLnB1c2godGFzayk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxufVxyXG4iXX0=