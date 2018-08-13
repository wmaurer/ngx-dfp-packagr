/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Directive, Inject, PLATFORM_ID, ElementRef, Input, Output, EventEmitter, Renderer2 } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { loadImaSdk } from '@alugha/ima';
import { DfpIDGeneratorService } from '../service/dfp-id-generator.service';
var DfpVideoDirective = /** @class */ (function () {
    function DfpVideoDirective(platformId, elementRef, renderer, dfpIDGenerator) {
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
    DfpVideoDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (isPlatformBrowser(this.platformId)) {
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
            loadImaSdk().then(function () { return _this.setUpIMA(); });
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
        { type: Directive, args: [{
                    selector: 'dfp-video'
                },] },
    ];
    /** @nocollapse */
    DfpVideoDirective.ctorParameters = function () { return [
        { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] },
        { type: ElementRef },
        { type: Renderer2 },
        { type: DfpIDGeneratorService }
    ]; };
    DfpVideoDirective.propDecorators = {
        width: [{ type: Input }],
        height: [{ type: Input }],
        adTag: [{ type: Input }],
        adActions: [{ type: Input }],
        adEvents: [{ type: Output }]
    };
    return DfpVideoDirective;
}());
export { DfpVideoDirective };
if (false) {
    /** @type {?} */
    DfpVideoDirective.prototype.width;
    /** @type {?} */
    DfpVideoDirective.prototype.height;
    /** @type {?} */
    DfpVideoDirective.prototype.adTag;
    /** @type {?} */
    DfpVideoDirective.prototype.adActions;
    /** @type {?} */
    DfpVideoDirective.prototype.adEvents;
    /** @type {?} */
    DfpVideoDirective.prototype.contentPlayer;
    /** @type {?} */
    DfpVideoDirective.prototype.adContainer;
    /** @type {?} */
    DfpVideoDirective.prototype.contentCompleteCalled;
    /** @type {?} */
    DfpVideoDirective.prototype.adDisplayContainer;
    /** @type {?} */
    DfpVideoDirective.prototype.adsLoader;
    /** @type {?} */
    DfpVideoDirective.prototype.adsManager;
    /** @type {?} */
    DfpVideoDirective.prototype.adsDone;
    /** @type {?} */
    DfpVideoDirective.prototype.platformId;
    /** @type {?} */
    DfpVideoDirective.prototype.elementRef;
    /** @type {?} */
    DfpVideoDirective.prototype.renderer;
    /** @type {?} */
    DfpVideoDirective.prototype.dfpIDGenerator;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGZwLXZpZGVvLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1kZnAvIiwic291cmNlcyI6WyJkaXJlY3RpdmUvZGZwLXZpZGVvLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBVSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0gsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFcEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUV6QyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQzs7SUF3QjFFLDJCQUMrQixVQUFrQixFQUN2QyxZQUNBLFVBQ0E7UUFIcUIsZUFBVSxHQUFWLFVBQVUsQ0FBUTtRQUN2QyxlQUFVLEdBQVYsVUFBVTtRQUNWLGFBQVEsR0FBUixRQUFRO1FBQ1IsbUJBQWMsR0FBZCxjQUFjO3dCQWZILElBQUksWUFBWSxFQUFPO3VCQVMxQixLQUFLO0tBT2xCOzs7O0lBRUwsb0NBQVE7OztJQUFSO1FBQUEsaUJBb0NDO1FBbkNDLEVBQUUsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7O1lBRXZDLElBQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDO1lBRXpDLElBQUksQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBRXZDLElBQUksQ0FBQyxhQUFhLEdBQUcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUMvQyxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxD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dmUsIEluamVjdCwgUExBVEZPUk1fSUQsIEVsZW1lbnRSZWYsIE9uSW5pdCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBSZW5kZXJlcjIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgaXNQbGF0Zm9ybUJyb3dzZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5cclxuaW1wb3J0IHsgbG9hZEltYVNkayB9IGZyb20gJ0BhbHVnaGEvaW1hJztcclxuXHJcbmltcG9ydCB7IERmcElER2VuZXJhdG9yU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2UvZGZwLWlkLWdlbmVyYXRvci5zZXJ2aWNlJztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnZGZwLXZpZGVvJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgRGZwVmlkZW9EaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQge1xyXG5cclxuICBASW5wdXQoKSB3aWR0aDogbnVtYmVyO1xyXG4gIEBJbnB1dCgpIGhlaWdodDogbnVtYmVyO1xyXG5cclxuICBASW5wdXQoKSBhZFRhZzogc3RyaW5nO1xyXG4gIEBJbnB1dCgpIGFkQWN0aW9uczogRXZlbnRFbWl0dGVyPCdwbGF5JyB8ICdwYXVzZScgfCAncmVzdW1lJz47XHJcblxyXG4gIEBPdXRwdXQoKSBhZEV2ZW50cyA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG5cclxuICBjb250ZW50UGxheWVyOiBIVE1MVmlkZW9FbGVtZW50O1xyXG4gIGFkQ29udGFpbmVyOiBIVE1MRWxlbWVudDtcclxuXHJcbiAgcHJpdmF0ZSBjb250ZW50Q29tcGxldGVDYWxsZWQ6IGJvb2xlYW47XHJcbiAgcHJpdmF0ZSBhZERpc3BsYXlDb250YWluZXI6IGdvb2dsZS5pbWEuQWREaXNwbGF5Q29udGFpbmVyO1xyXG4gIHByaXZhdGUgYWRzTG9hZGVyOiBnb29nbGUuaW1hLkFkc0xvYWRlcjtcclxuICBwcml2YXRlIGFkc01hbmFnZXI6IGdvb2dsZS5pbWEuQWRzTWFuYWdlcjtcclxuICBwcml2YXRlIGFkc0RvbmUgPSBmYWxzZTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBASW5qZWN0KFBMQVRGT1JNX0lEKSBwcml2YXRlIHBsYXRmb3JtSWQ6IE9iamVjdCxcclxuICAgIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZixcclxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcclxuICAgIHByaXZhdGUgZGZwSURHZW5lcmF0b3I6IERmcElER2VuZXJhdG9yU2VydmljZVxyXG4gICkgeyB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcclxuXHJcbiAgICAgIGNvbnN0IGVsID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XHJcblxyXG4gICAgICB0aGlzLmRmcElER2VuZXJhdG9yLmRmcElER2VuZXJhdG9yKGVsKTtcclxuXHJcbiAgICAgIHRoaXMuY29udGVudFBsYXllciA9IGVsLnF1ZXJ5U2VsZWN0b3IoJ3ZpZGVvJyk7XHJcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0QXR0cmlidXRlKHRoaXMuY29udGVudFBsYXllciwgJ3dpZHRoJywgdGhpcy53aWR0aC50b1N0cmluZygpKTtcclxuICAgICAgdGhpcy5yZW5kZXJlci5zZXRBdHRyaWJ1dGUodGhpcy5jb250ZW50UGxheWVyLCAnaGVpZ2h0JywgdGhpcy5oZWlnaHQudG9TdHJpbmcoKSk7XHJcblxyXG4gICAgICB0aGlzLmFkQ29udGFpbmVyID0gZWwucXVlcnlTZWxlY3RvcignLmFkLWNvbnRhaW5lcicpO1xyXG4gICAgICBpZiAoIXRoaXMuYWRDb250YWluZXIpIHtcclxuICAgICAgICB0aGlzLmFkQ29udGFpbmVyID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMuYWRDb250YWluZXIsICdhZC1jb250YWluZXInKTtcclxuICAgICAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKGVsLCB0aGlzLmFkQ29udGFpbmVyKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gaW1hIHNldHVwXHJcbiAgICAgIGxvYWRJbWFTZGsoKS50aGVuKCgpID0+IHRoaXMuc2V0VXBJTUEoKSk7XHJcblxyXG4gICAgICAvLyBzaW1wbGUgY29udHJvbFxyXG4gICAgICB0aGlzLmFkQWN0aW9ucy5zdWJzY3JpYmUoYWN0ID0+IHtcclxuICAgICAgICBzd2l0Y2ggKGFjdCkge1xyXG4gICAgICAgICAgY2FzZSAncGxheSc6XHJcbiAgICAgICAgICAgIHRoaXMucGxheSgpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIGNhc2UgJ3BhdXNlJzpcclxuICAgICAgICAgICAgdGhpcy5wYXVzZSgpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIGNhc2UgJ3Jlc3VtZSc6XHJcbiAgICAgICAgICAgIHRoaXMucmVzdW1lKCk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwbGF5KCkge1xyXG4gICAgaWYgKCF0aGlzLmFkc0RvbmUpIHtcclxuICAgICAgdGhpcy5pbml0aWFsVXNlckFjdGlvbigpO1xyXG4gICAgICB0aGlzLmxvYWRBZHMoKTtcclxuICAgICAgdGhpcy5hZHNEb25lID0gdHJ1ZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHBhdXNlKCkge1xyXG4gICAgaWYgKHRoaXMuYWRzTWFuYWdlcikge1xyXG4gICAgICB0aGlzLmFkc01hbmFnZXIucGF1c2UoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJlc3VtZSgpIHtcclxuICAgIGlmICh0aGlzLmFkc01hbmFnZXIpIHtcclxuICAgICAgdGhpcy5hZHNNYW5hZ2VyLnJlc3VtZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc2V0VXBJTUEoKSB7XHJcbiAgICAvLyBDcmVhdGUgdGhlIGFkIGRpc3BsYXkgY29udGFpbmVyLlxyXG4gICAgdGhpcy5hZERpc3BsYXlDb250YWluZXIgPSBuZXcgZ29vZ2xlLmltYS5BZERpc3BsYXlDb250YWluZXIodGhpcy5hZENvbnRhaW5lciwgdGhpcy5jb250ZW50UGxheWVyKTtcclxuICAgIC8vIENyZWF0ZSBhZHMgbG9hZGVyLlxyXG4gICAgdGhpcy5hZHNMb2FkZXIgPSBuZXcgZ29vZ2xlLmltYS5BZHNMb2FkZXIodGhpcy5hZERpc3BsYXlDb250YWluZXIpO1xyXG4gICAgLy8gTGlzdGVuIGFuZCByZXNwb25kIHRvIGFkcyBsb2FkZWQgYW5kIGVycm9yIGV2ZW50cy5cclxuICAgIHRoaXMuYWRzTG9hZGVyLmFkZEV2ZW50TGlzdGVuZXIoXHJcbiAgICAgIGdvb2dsZS5pbWEuQWRzTWFuYWdlckxvYWRlZEV2ZW50LlR5cGUuQURTX01BTkFHRVJfTE9BREVELFxyXG4gICAgICBldmVudCA9PiB0aGlzLm9uQWRzTWFuYWdlckxvYWRlZChldmVudCksXHJcbiAgICAgIGZhbHNlKTtcclxuICAgIHRoaXMuYWRzTG9hZGVyLmFkZEV2ZW50TGlzdGVuZXIoXHJcbiAgICAgIGdvb2dsZS5pbWEuQWRFcnJvckV2ZW50LlR5cGUuQURfRVJST1IsXHJcbiAgICAgIGV2ZW50ID0+IHRoaXMub25BZEVycm9yKGV2ZW50KSxcclxuICAgICAgZmFsc2UpO1xyXG5cclxuICAgIC8vIEFuIGV2ZW50IGxpc3RlbmVyIHRvIHRlbGwgdGhlIFNESyB0aGF0IG91ciBjb250ZW50IHZpZGVvXHJcbiAgICAvLyBpcyBjb21wbGV0ZWQgc28gdGhlIFNESyBjYW4gcGxheSBhbnkgcG9zdC1yb2xsIGFkcy5cclxuICAgIHRoaXMuY29udGVudFBsYXllci5vbmVuZGVkID0gKCkgPT4ge1xyXG4gICAgICB0aGlzLmNvbnRlbnRFbmRlZCgpO1xyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIGluaXRpYWxVc2VyQWN0aW9uKCkge1xyXG4gICAgdGhpcy5hZERpc3BsYXlDb250YWluZXIuaW5pdGlhbGl6ZSgpO1xyXG4gICAgdGhpcy5jb250ZW50UGxheWVyLmxvYWQoKTtcclxuICB9XHJcblxyXG4gIHJlcXVlc3RBZHMoYWRUYWdVcmwpIHtcclxuICAgIGNvbnN0IGFkc1JlcXVlc3QgPSBuZXcgZ29vZ2xlLmltYS5BZHNSZXF1ZXN0KCk7XHJcbiAgICBhZHNSZXF1ZXN0LmFkVGFnVXJsID0gYWRUYWdVcmw7XHJcbiAgICBhZHNSZXF1ZXN0LmxpbmVhckFkU2xvdFdpZHRoID0gdGhpcy53aWR0aDtcclxuICAgIGFkc1JlcXVlc3QubGluZWFyQWRTbG90SGVpZ2h0ID0gdGhpcy5oZWlnaHQ7XHJcbiAgICBhZHNSZXF1ZXN0Lm5vbkxpbmVhckFkU2xvdFdpZHRoID0gdGhpcy53aWR0aDtcclxuICAgIGFkc1JlcXVlc3Qubm9uTGluZWFyQWRTbG90SGVpZ2h0ID0gdGhpcy5oZWlnaHQ7XHJcbiAgICB0aGlzLmFkc0xvYWRlci5yZXF1ZXN0QWRzKGFkc1JlcXVlc3QpO1xyXG4gIH1cclxuXHJcbiAgY29udGVudEVuZGVkKCkge1xyXG4gICAgdGhpcy5jb250ZW50Q29tcGxldGVDYWxsZWQgPSB0cnVlO1xyXG4gICAgdGhpcy5hZHNMb2FkZXIuY29udGVudENvbXBsZXRlKCk7XHJcbiAgfVxyXG5cclxuICBvbkFkc01hbmFnZXJMb2FkZWQoYWRzTWFuYWdlckxvYWRlZEV2ZW50KSB7XHJcbiAgICBjb25zdCBhZHNSZW5kZXJpbmdTZXR0aW5ncyA9IG5ldyBnb29nbGUuaW1hLkFkc1JlbmRlcmluZ1NldHRpbmdzKCk7XHJcbiAgICBhZHNSZW5kZXJpbmdTZXR0aW5ncy5yZXN0b3JlQ3VzdG9tUGxheWJhY2tTdGF0ZU9uQWRCcmVha0NvbXBsZXRlID0gdHJ1ZTtcclxuICAgIHRoaXMuYWRzTWFuYWdlciA9IGFkc01hbmFnZXJMb2FkZWRFdmVudC5nZXRBZHNNYW5hZ2VyKFxyXG4gICAgICB0aGlzLmNvbnRlbnRQbGF5ZXIsIGFkc1JlbmRlcmluZ1NldHRpbmdzKTtcclxuICAgIHRoaXMuc3RhcnRBZHNNYW5hZ2VyKHRoaXMuYWRzTWFuYWdlcik7XHJcbiAgfVxyXG5cclxuICBzdGFydEFkc01hbmFnZXIoYWRzTWFuYWdlcikge1xyXG4gICAgLy8gQXR0YWNoIHRoZSBwYXVzZS9yZXN1bWUgZXZlbnRzLlxyXG4gICAgYWRzTWFuYWdlci5hZGRFdmVudExpc3RlbmVyKFxyXG4gICAgICBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5DT05URU5UX1BBVVNFX1JFUVVFU1RFRCxcclxuICAgICAgKCkgPT4gdGhpcy5vbkNvbnRlbnRQYXVzZVJlcXVlc3RlZCgpLFxyXG4gICAgICBmYWxzZSxcclxuICAgICAgdGhpcyk7XHJcbiAgICBhZHNNYW5hZ2VyLmFkZEV2ZW50TGlzdGVuZXIoXHJcbiAgICAgIGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLkNPTlRFTlRfUkVTVU1FX1JFUVVFU1RFRCxcclxuICAgICAgKCkgPT4gdGhpcy5vbkNvbnRlbnRSZXN1bWVSZXF1ZXN0ZWQoKSxcclxuICAgICAgZmFsc2UsXHJcbiAgICAgIHRoaXMpO1xyXG4gICAgLy8gSGFuZGxlIGVycm9ycy5cclxuICAgIGFkc01hbmFnZXIuYWRkRXZlbnRMaXN0ZW5lcihcclxuICAgICAgZ29vZ2xlLmltYS5BZEVycm9yRXZlbnQuVHlwZS5BRF9FUlJPUixcclxuICAgICAgZXZlbnQgPT4gdGhpcy5vbkFkRXJyb3IoZXZlbnQpLFxyXG4gICAgICBmYWxzZSxcclxuICAgICAgdGhpcyk7XHJcbiAgICBjb25zdCBldmVudHMgPSBbZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuQUxMX0FEU19DT01QTEVURUQsXHJcbiAgICBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5DTElDSyxcclxuICAgIGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLkNPTVBMRVRFLFxyXG4gICAgZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuRklSU1RfUVVBUlRJTEUsXHJcbiAgICBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5MT0FERUQsXHJcbiAgICBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5NSURQT0lOVCxcclxuICAgIGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLlBBVVNFRCxcclxuICAgIGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLlNUQVJURUQsXHJcbiAgICBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5USElSRF9RVUFSVElMRV07XHJcbiAgICBldmVudHMuZm9yRWFjaChldmVudCA9PlxyXG4gICAgICBhZHNNYW5hZ2VyLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGFkRXZlbnQgPT4gdGhpcy5vbkFkRXZlbnQoYWRFdmVudCksIGZhbHNlKVxyXG4gICAgKTtcclxuXHJcbiAgICBhZHNNYW5hZ2VyLmluaXQoXHJcbiAgICAgIHRoaXMud2lkdGgsXHJcbiAgICAgIHRoaXMuaGVpZ2h0LFxyXG4gICAgICBnb29nbGUuaW1hLlZpZXdNb2RlLk5PUk1BTCk7XHJcblxyXG4gICAgYWRzTWFuYWdlci5zdGFydCgpO1xyXG4gIH1cclxuXHJcbiAgb25Db250ZW50UGF1c2VSZXF1ZXN0ZWQoKSB7XHJcbiAgICB0aGlzLnBhdXNlRm9yQWQoKTtcclxuICB9XHJcblxyXG4gIG9uQ29udGVudFJlc3VtZVJlcXVlc3RlZCgpIHtcclxuICAgIC8vIFdpdGhvdXQgdGhpcyBjaGVjayB0aGUgdmlkZW8gc3RhcnRzIG92ZXIgZnJvbSB0aGUgYmVnaW5uaW5nIG9uIGFcclxuICAgIC8vIHBvc3Qtcm9sbCdzIENPTlRFTlRfUkVTVU1FX1JFUVVFU1RFRFxyXG4gICAgaWYgKCF0aGlzLmNvbnRlbnRDb21wbGV0ZUNhbGxlZCkge1xyXG4gICAgICB0aGlzLnJlc3VtZUFmdGVyQWQoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG9uQWRFdmVudChhZEV2ZW50KSB7XHJcbiAgICBpZiAoYWRFdmVudC50eXBlID09PSBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5MT0FERUQpIHtcclxuICAgICAgY29uc3QgYWQgPSBhZEV2ZW50LmdldEFkKCk7XHJcbiAgICAgIGlmICghYWQuaXNMaW5lYXIoKSkge1xyXG4gICAgICAgIHRoaXMub25Db250ZW50UmVzdW1lUmVxdWVzdGVkKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHRoaXMuYWRFdmVudHMuZW1pdChhZEV2ZW50KTtcclxuICB9XHJcblxyXG4gIG9uQWRFcnJvcihhZEVycm9yRXZlbnQpIHtcclxuICAgIGlmICh0aGlzLmFkc01hbmFnZXIpIHtcclxuICAgICAgdGhpcy5hZHNNYW5hZ2VyLmRlc3Ryb3koKTtcclxuICAgIH1cclxuICAgIHRoaXMucmVzdW1lQWZ0ZXJBZCgpO1xyXG4gICAgdGhpcy5hZEV2ZW50cy5lbWl0KGFkRXJyb3JFdmVudCk7XHJcbiAgfVxyXG5cclxuICAvLyBhcHBsaWNhdGlvbiBmdW5jdGlvbnNcclxuXHJcbiAgcmVzdW1lQWZ0ZXJBZCgpIHtcclxuICAgIHRoaXMuY29udGVudFBsYXllci5wbGF5KCk7XHJcbiAgfVxyXG5cclxuICBwYXVzZUZvckFkKCkge1xyXG4gICAgdGhpcy5jb250ZW50UGxheWVyLnBhdXNlKCk7XHJcbiAgfVxyXG5cclxuICBsb2FkQWRzKCkge1xyXG4gICAgdGhpcy5yZXF1ZXN0QWRzKHRoaXMuYWRUYWcpO1xyXG4gIH1cclxuXHJcbn1cclxuIl19