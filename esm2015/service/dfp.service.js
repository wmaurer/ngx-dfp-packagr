/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable, Optional, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { DFP_CONFIG } from './injection_token';
import { DfpConfig } from '../class';
import { IdleService } from './idle.service';
import { ScriptInjectorService } from './script-injector.service';
/** @type {?} */
export const GPT_LIBRARY_URL = '//www.googletagservices.com/tag/js/gpt.js';
class DFPConfigurationError extends Error {
}
export class DfpService {
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
if (false) {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGZwLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZGZwLyIsInNvdXJjZXMiOlsic2VydmljZS9kZnAuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFFLE1BQU0sRUFBa0IsTUFBTSxlQUFlLENBQUM7QUFDMUYsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFcEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDckMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDJCQUEyQixDQUFDOztBQUVsRSxhQUFhLGVBQWUsR0FBRywyQ0FBMkMsQ0FBQztBQUUzRSwyQkFBNEIsU0FBUSxLQUFLO0NBQUk7QUFLN0MsTUFBTTs7Ozs7OztJQXdCSixZQUMrQixVQUFrQixFQUNuQyxRQUFxQixFQUNMLE1BQWlCLEVBQ3JDO1FBSHFCLGVBQVUsR0FBVixVQUFVLENBQVE7UUFFbkIsV0FBTSxHQUFOLE1BQU0sQ0FBVztRQUNyQyxtQkFBYyxHQUFkLGNBQWM7OEJBMUJDLEtBQUs7K0JBRUosSUFBSTsrQkFFSixJQUFJO3lCQUVWLEtBQUs7d0JBRU4sSUFBSTtvQkFFUixJQUFJOytCQUVPLElBQUk7OEJBRUwsS0FBSzsrQkFFSixJQUFJO3VCQUVaLElBQUk7c0JBRUwsS0FBSztRQVFwQixFQUFFLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDOztZQUN2QyxNQUFNLEdBQUcsR0FBUSxNQUFNLENBQ1c7O1lBRGxDLE1BQ0UsU0FBUyxHQUFHLEdBQUcsQ0FBQyxTQUFTLElBQUksRUFBRSxDQUFDO1lBRWxDLElB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ZCxXQUFXLHVCQW9DZixRQUFRO1lBckNKLFNBQVMsdUJBc0NiLE1BQU0sU0FBQyxVQUFVO1lBcENiLHFCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIE9wdGlvbmFsLCBQTEFURk9STV9JRCwgSW5qZWN0LCBJbmplY3Rpb25Ub2tlbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcblxyXG5pbXBvcnQgeyBERlBfQ09ORklHIH0gZnJvbSAnLi9pbmplY3Rpb25fdG9rZW4nO1xyXG5pbXBvcnQgeyBEZnBDb25maWcgfSBmcm9tICcuLi9jbGFzcyc7XHJcbmltcG9ydCB7IElkbGVTZXJ2aWNlIH0gZnJvbSAnLi9pZGxlLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBTY3JpcHRJbmplY3RvclNlcnZpY2UgfSBmcm9tICcuL3NjcmlwdC1pbmplY3Rvci5zZXJ2aWNlJztcclxuXHJcbmV4cG9ydCBjb25zdCBHUFRfTElCUkFSWV9VUkwgPSAnLy93d3cuZ29vZ2xldGFnc2VydmljZXMuY29tL3RhZy9qcy9ncHQuanMnO1xyXG5cclxuY2xhc3MgREZQQ29uZmlndXJhdGlvbkVycm9yIGV4dGVuZHMgRXJyb3IgeyB9XHJcblxyXG4vLyBleHBvcnQgY29uc3QgREZQX0NPTkZJRyA9IG5ldyBJbmplY3Rpb25Ub2tlbjxEZnBDb25maWc+KCdkZnBDb25maWcnKTtcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIERmcFNlcnZpY2Uge1xyXG5cclxuICBwcml2YXRlIGVuYWJsZVZpZGVvQWRzID0gZmFsc2U7XHJcblxyXG4gIHByaXZhdGUgcGVyc29uYWxpemVkQWRzID0gdHJ1ZTtcclxuXHJcbiAgcHJpdmF0ZSBjb2xsYXBzZUlmRW1wdHkgPSB0cnVlO1xyXG5cclxuICBwcml2YXRlIGNlbnRlcmluZyA9IGZhbHNlO1xyXG5cclxuICBwcml2YXRlIGxvY2F0aW9uID0gbnVsbDtcclxuXHJcbiAgcHJpdmF0ZSBwcGlkID0gbnVsbDtcclxuXHJcbiAgcHJpdmF0ZSBnbG9iYWxUYXJnZXRpbmcgPSBudWxsO1xyXG5cclxuICBwcml2YXRlIGZvcmNlU2FmZUZyYW1lID0gZmFsc2U7XHJcblxyXG4gIHByaXZhdGUgc2FmZUZyYW1lQ29uZmlnID0gbnVsbDtcclxuXHJcbiAgcHJpdmF0ZSBsb2FkR1BUID0gdHJ1ZTtcclxuXHJcbiAgcHJpdmF0ZSBsb2FkZWQgPSBmYWxzZTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBASW5qZWN0KFBMQVRGT1JNX0lEKSBwcml2YXRlIHBsYXRmb3JtSWQ6IE9iamVjdCxcclxuICAgIEBPcHRpb25hbCgpIGlkbGVMb2FkOiBJZGxlU2VydmljZSxcclxuICAgIEBJbmplY3QoREZQX0NPTkZJRykgcHJpdmF0ZSBjb25maWc6IERmcENvbmZpZyxcclxuICAgIHByaXZhdGUgc2NyaXB0SW5qZWN0b3I6IFNjcmlwdEluamVjdG9yU2VydmljZVxyXG4gICkge1xyXG4gICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcclxuICAgICAgY29uc3Qgd2luOiBhbnkgPSB3aW5kb3csXHJcbiAgICAgICAgZ29vZ2xldGFnID0gd2luLmdvb2dsZXRhZyB8fCB7fTtcclxuXHJcbiAgICAgIHRoaXMuZGZwQ29uZmlnKCk7XHJcblxyXG4gICAgICBnb29nbGV0YWcuY21kID0gZ29vZ2xldGFnLmNtZCB8fCBbXTtcclxuICAgICAgZ29vZ2xldGFnLmNtZC5wdXNoKCgpID0+IHtcclxuICAgICAgICB0aGlzLnNldHVwKCk7XHJcbiAgICAgIH0pO1xyXG4gICAgICB3aW4uZ29vZ2xldGFnID0gZ29vZ2xldGFnO1xyXG5cclxuICAgICAgaWYgKHRoaXMubG9hZEdQVCkge1xyXG4gICAgICAgIGNvbnN0IGxvYWRTY3JpcHQgPSAoKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLnNjcmlwdEluamVjdG9yLnNjcmlwdEluamVjdG9yKEdQVF9MSUJSQVJZX1VSTCkudGhlbigoc2NyaXB0KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZGVkID0gdHJ1ZTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgaWYgKGlkbGVMb2FkKSB7XHJcbiAgICAgICAgICBpZGxlTG9hZC5yZXF1ZXN0KGxvYWRTY3JpcHQpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBsb2FkU2NyaXB0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGRmcENvbmZpZygpIHtcclxuICAgIGZvciAoY29uc3Qga2V5IGluIHRoaXMuY29uZmlnKSB7XHJcbiAgICAgIGlmICh0aGlzLmhhc093blByb3BlcnR5KGtleSkpIHtcclxuICAgICAgICB0aGlzW2tleV0gPSB0aGlzLmNvbmZpZ1trZXldO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGFkZFNhZmVGcmFtZUNvbmZpZyhwdWJhZHMpIHtcclxuICAgIGlmICghdGhpcy5zYWZlRnJhbWVDb25maWcpIHsgcmV0dXJuIGZhbHNlOyB9XHJcbiAgICBpZiAodHlwZW9mIHRoaXMuc2FmZUZyYW1lQ29uZmlnICE9PSAnb2JqZWN0Jykge1xyXG4gICAgICB0aHJvdyBuZXcgREZQQ29uZmlndXJhdGlvbkVycm9yKCdGcmFtZUNvbmZpZyBtdXN0IGJlIGFuIG9iamVjdCcpO1xyXG4gICAgfVxyXG4gICAgcHViYWRzLnNldFNhZmVGcmFtZUNvbmZpZyh0aGlzLnNhZmVGcmFtZUNvbmZpZyk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGFkZFRhcmdldGluZyhwdWJhZHMpIHtcclxuICAgIGlmICghdGhpcy5nbG9iYWxUYXJnZXRpbmcpIHsgcmV0dXJuIGZhbHNlOyB9XHJcbiAgICBpZiAodHlwZW9mIHRoaXMuZ2xvYmFsVGFyZ2V0aW5nICE9PSAnb2JqZWN0Jykge1xyXG4gICAgICB0aHJvdyBuZXcgREZQQ29uZmlndXJhdGlvbkVycm9yKCdUYXJnZXRpbmcgbXVzdCBiZSBhbiBvYmplY3QnKTtcclxuICAgIH1cclxuXHJcbiAgICBmb3IgKGNvbnN0IGtleSBpbiB0aGlzLmdsb2JhbFRhcmdldGluZykge1xyXG4gICAgICBpZiAodGhpcy5nbG9iYWxUYXJnZXRpbmcuaGFzT3duUHJvcGVydHkoa2V5KSkge1xyXG4gICAgICAgIHB1YmFkcy5zZXRUYXJnZXRpbmcoa2V5LCB0aGlzLmdsb2JhbFRhcmdldGluZ1trZXldKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBhZGRMb2NhdGlvbihwdWJhZHMpIHtcclxuICAgIGlmICghdGhpcy5sb2NhdGlvbikgeyByZXR1cm4gZmFsc2U7IH1cclxuXHJcbiAgICBpZiAodHlwZW9mIHRoaXMubG9jYXRpb24gPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgIHB1YmFkcy5zZXRMb2NhdGlvbih0aGlzLmxvY2F0aW9uKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghQXJyYXkuaXNBcnJheSh0aGlzLmxvY2F0aW9uKSkge1xyXG4gICAgICB0aHJvdyBuZXcgREZQQ29uZmlndXJhdGlvbkVycm9yKCdMb2NhdGlvbiBtdXN0IGJlIGFuICcgK1xyXG4gICAgICAgICdhcnJheSBvciBzdHJpbmcnKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJhZHMuc2V0TG9jYXRpb24uYXBwbHkocHViYWRzLCB0aGlzLmxvY2F0aW9uKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgYWRkUFBJRChwdWJhZHMpIHtcclxuICAgIGlmICghdGhpcy5wcGlkKSB7IHJldHVybiBmYWxzZTsgfVxyXG4gICAgaWYgKHR5cGVvZiB0aGlzLnBwaWQgIT09ICdzdHJpbmcnKSB7XHJcbiAgICAgIHRocm93IG5ldyBERlBDb25maWd1cmF0aW9uRXJyb3IoJ1BQSUQgbXVzdCBiZSBhIHN0cmluZycpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmFkcy5zZXRQdWJsaXNoZXJQcm92aWRlZElkKHRoaXMucHBpZCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHNldHVwKCkge1xyXG4gICAgY29uc3Qgd2luOiBhbnkgPSB3aW5kb3csXHJcbiAgICAgIGdvb2dsZXRhZyA9IHdpbi5nb29nbGV0YWcsXHJcbiAgICAgIHB1YmFkcyA9IGdvb2dsZXRhZy5wdWJhZHMoKTtcclxuXHJcbiAgICBpZiAodGhpcy5lbmFibGVWaWRlb0Fkcykge1xyXG4gICAgICBwdWJhZHMuZW5hYmxlVmlkZW9BZHMoKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBwZXJzb25hbGl6ZWRBZHMgaXMgZGVmYXVsdFxyXG4gICAgaWYgKHRoaXMucGVyc29uYWxpemVkQWRzID09PSBmYWxzZSkge1xyXG4gICAgICBwdWJhZHMuc2V0UmVxdWVzdE5vblBlcnNvbmFsaXplZEFkcygxKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5jb2xsYXBzZUlmRW1wdHkpIHtcclxuICAgICAgcHViYWRzLmNvbGxhcHNlRW1wdHlEaXZzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gV2UgYWx3YXlzIHJlZnJlc2ggb3Vyc2VsdmVzXHJcbiAgICBwdWJhZHMuZGlzYWJsZUluaXRpYWxMb2FkKCk7XHJcblxyXG4gICAgcHViYWRzLnNldEZvcmNlU2FmZUZyYW1lKHRoaXMuZm9yY2VTYWZlRnJhbWUpO1xyXG4gICAgcHViYWRzLnNldENlbnRlcmluZyh0aGlzLmNlbnRlcmluZyk7XHJcblxyXG4gICAgdGhpcy5hZGRMb2NhdGlvbihwdWJhZHMpO1xyXG4gICAgdGhpcy5hZGRQUElEKHB1YmFkcyk7XHJcbiAgICB0aGlzLmFkZFRhcmdldGluZyhwdWJhZHMpO1xyXG4gICAgdGhpcy5hZGRTYWZlRnJhbWVDb25maWcocHViYWRzKTtcclxuXHJcbiAgICAvLyBwdWJhZHMuZW5hYmxlU3luY1JlbmRlcmluZygpO1xyXG4gICAgcHViYWRzLmVuYWJsZUFzeW5jUmVuZGVyaW5nKCk7XHJcblxyXG4gICAgaWYgKHRoaXMuY29uZmlnLnNpbmdsZVJlcXVlc3RNb2RlICE9PSB0cnVlKSB7XHJcbiAgICAgIGlmICh0aGlzLmNvbmZpZy5lbmFibGVWaWRlb0Fkcykge1xyXG4gICAgICAgIHB1YmFkcy5lbmFibGVWaWRlb0FkcygpO1xyXG4gICAgICB9XHJcbiAgICAgIGdvb2dsZXRhZy5lbmFibGVTZXJ2aWNlcygpO1xyXG4gICAgfVxyXG5cclxuICB9XHJcblxyXG4gIGhhc0xvYWRlZCgpIHtcclxuICAgIHJldHVybiB0aGlzLmxvYWRlZDtcclxuICB9XHJcblxyXG4gIGRlZmluZVRhc2sodGFzaykge1xyXG4gICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcclxuICAgICAgY29uc3Qgd2luOiBhbnkgPSB3aW5kb3csXHJcbiAgICAgICAgZ29vZ2xldGFnID0gd2luLmdvb2dsZXRhZztcclxuICAgICAgZ29vZ2xldGFnLmNtZC5wdXNoKHRhc2spO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbn1cclxuIl19