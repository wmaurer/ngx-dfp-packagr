/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Directive, Inject, PLATFORM_ID, ElementRef, Input, Output, EventEmitter, Renderer2 } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { loadImaSdk } from '@alugha/ima';
import { DfpIDGeneratorService } from '../service/dfp-id-generator.service';
export class DfpVideoDirective {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGZwLXZpZGVvLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1kZnAvIiwic291cmNlcyI6WyJkaXJlY3RpdmUvZGZwLXZpZGVvLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBVSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0gsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFcEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUV6QyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUs1RSxNQUFNOzs7Ozs7O0lBbUJKLFlBQytCLFVBQWtCLEVBQ3ZDLFlBQ0EsVUFDQTtRQUhxQixlQUFVLEdBQVYsVUFBVSxDQUFRO1FBQ3ZDLGVBQVUsR0FBVixVQUFVO1FBQ1YsYUFBUSxHQUFSLFFBQVE7UUFDUixtQkFBYyxHQUFkLGNBQWM7d0JBZkgsSUFBSSxZQUFZLEVBQU87dUJBUzFCLEtBQUs7S0FPbEI7Ozs7SUFFTCxRQUFRO1FBQ04sRUFBRSxDQUFDLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7WUFFdkMsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUM7WUFFekMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFDLENBQUM7WUFFdkMsSUFBSSxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQy9DLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFB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QyxPQUFPLENBQUMsQ0FBQztLQUM3Qjs7Ozs7SUFFRCxTQUFTLENBQUMsWUFBWTtRQUNwQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUNwQixJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQzNCO1FBQ0QsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0tBQ2xDOzs7O0lBSUQsYUFBYTtRQUNYLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLENBQUM7S0FDM0I7Ozs7SUFFRCxVQUFVO1FBQ1IsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztLQUM1Qjs7OztJQUVELE9BQU87UUFDTCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUM3Qjs7O1lBMU5GLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsV0FBVzthQUN0Qjs7OztZQXFCNEMsTUFBTSx1QkFBOUMsTUFBTSxTQUFDLFdBQVc7WUE5QmtCLFVBQVU7WUFBdUMsU0FBUztZQUsxRixxQkFBcUI7OztvQkFPM0IsS0FBSztxQkFDTCxLQUFLO29CQUVMLEtBQUs7d0JBQ0wsS0FBSzt1QkFFTCxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbmplY3QsIFBMQVRGT1JNX0lELCBFbGVtZW50UmVmLCBPbkluaXQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgUmVuZGVyZXIyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuXHJcbmltcG9ydCB7IGxvYWRJbWFTZGsgfSBmcm9tICdAYWx1Z2hhL2ltYSc7XHJcblxyXG5pbXBvcnQgeyBEZnBJREdlbmVyYXRvclNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlL2RmcC1pZC1nZW5lcmF0b3Iuc2VydmljZSc7XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ2RmcC12aWRlbydcclxufSlcclxuZXhwb3J0IGNsYXNzIERmcFZpZGVvRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0IHtcclxuXHJcbiAgQElucHV0KCkgd2lkdGg6IG51bWJlcjtcclxuICBASW5wdXQoKSBoZWlnaHQ6IG51bWJlcjtcclxuXHJcbiAgQElucHV0KCkgYWRUYWc6IHN0cmluZztcclxuICBASW5wdXQoKSBhZEFjdGlvbnM6IEV2ZW50RW1pdHRlcjwncGxheScgfCAncGF1c2UnIHwgJ3Jlc3VtZSc+O1xyXG5cclxuICBAT3V0cHV0KCkgYWRFdmVudHMgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuXHJcbiAgY29udGVudFBsYXllcjogSFRNTFZpZGVvRWxlbWVudDtcclxuICBhZENvbnRhaW5lcjogSFRNTEVsZW1lbnQ7XHJcblxyXG4gIHByaXZhdGUgY29udGVudENvbXBsZXRlQ2FsbGVkOiBib29sZWFuO1xyXG4gIHByaXZhdGUgYWREaXNwbGF5Q29udGFpbmVyOiBnb29nbGUuaW1hLkFkRGlzcGxheUNvbnRhaW5lcjtcclxuICBwcml2YXRlIGFkc0xvYWRlcjogZ29vZ2xlLmltYS5BZHNMb2FkZXI7XHJcbiAgcHJpdmF0ZSBhZHNNYW5hZ2VyOiBnb29nbGUuaW1hLkFkc01hbmFnZXI7XHJcbiAgcHJpdmF0ZSBhZHNEb25lID0gZmFsc2U7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgQEluamVjdChQTEFURk9STV9JRCkgcHJpdmF0ZSBwbGF0Zm9ybUlkOiBPYmplY3QsXHJcbiAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXHJcbiAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXHJcbiAgICBwcml2YXRlIGRmcElER2VuZXJhdG9yOiBEZnBJREdlbmVyYXRvclNlcnZpY2VcclxuICApIHsgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XHJcblxyXG4gICAgICBjb25zdCBlbCA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xyXG5cclxuICAgICAgdGhpcy5kZnBJREdlbmVyYXRvci5kZnBJREdlbmVyYXRvcihlbCk7XHJcblxyXG4gICAgICB0aGlzLmNvbnRlbnRQbGF5ZXIgPSBlbC5xdWVyeVNlbGVjdG9yKCd2aWRlbycpO1xyXG4gICAgICB0aGlzLnJlbmRlcmVyLnNldEF0dHJpYnV0ZSh0aGlzLmNvbnRlbnRQbGF5ZXIsICd3aWR0aCcsIHRoaXMud2lkdGgudG9TdHJpbmcoKSk7XHJcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0QXR0cmlidXRlKHRoaXMuY29udGVudFBsYXllciwgJ2hlaWdodCcsIHRoaXMuaGVpZ2h0LnRvU3RyaW5nKCkpO1xyXG5cclxuICAgICAgdGhpcy5hZENvbnRhaW5lciA9IGVsLnF1ZXJ5U2VsZWN0b3IoJy5hZC1jb250YWluZXInKTtcclxuICAgICAgaWYgKCF0aGlzLmFkQ29udGFpbmVyKSB7XHJcbiAgICAgICAgdGhpcy5hZENvbnRhaW5lciA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLmFkQ29udGFpbmVyLCAnYWQtY29udGFpbmVyJyk7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZChlbCwgdGhpcy5hZENvbnRhaW5lcik7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIGltYSBzZXR1cFxyXG4gICAgICBsb2FkSW1hU2RrKCkudGhlbigoKSA9PiB0aGlzLnNldFVwSU1BKCkpO1xyXG5cclxuICAgICAgLy8gc2ltcGxlIGNvbnRyb2xcclxuICAgICAgdGhpcy5hZEFjdGlvbnMuc3Vic2NyaWJlKGFjdCA9PiB7XHJcbiAgICAgICAgc3dpdGNoIChhY3QpIHtcclxuICAgICAgICAgIGNhc2UgJ3BsYXknOlxyXG4gICAgICAgICAgICB0aGlzLnBsYXkoKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICBjYXNlICdwYXVzZSc6XHJcbiAgICAgICAgICAgIHRoaXMucGF1c2UoKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICBjYXNlICdyZXN1bWUnOlxyXG4gICAgICAgICAgICB0aGlzLnJlc3VtZSgpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcGxheSgpIHtcclxuICAgIGlmICghdGhpcy5hZHNEb25lKSB7XHJcbiAgICAgIHRoaXMuaW5pdGlhbFVzZXJBY3Rpb24oKTtcclxuICAgICAgdGhpcy5sb2FkQWRzKCk7XHJcbiAgICAgIHRoaXMuYWRzRG9uZSA9IHRydWU7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwYXVzZSgpIHtcclxuICAgIGlmICh0aGlzLmFkc01hbmFnZXIpIHtcclxuICAgICAgdGhpcy5hZHNNYW5hZ2VyLnBhdXNlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXN1bWUoKSB7XHJcbiAgICBpZiAodGhpcy5hZHNNYW5hZ2VyKSB7XHJcbiAgICAgIHRoaXMuYWRzTWFuYWdlci5yZXN1bWUoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNldFVwSU1BKCkge1xyXG4gICAgLy8gQ3JlYXRlIHRoZSBhZCBkaXNwbGF5IGNvbnRhaW5lci5cclxuICAgIHRoaXMuYWREaXNwbGF5Q29udGFpbmVyID0gbmV3IGdvb2dsZS5pbWEuQWREaXNwbGF5Q29udGFpbmVyKHRoaXMuYWRDb250YWluZXIsIHRoaXMuY29udGVudFBsYXllcik7XHJcbiAgICAvLyBDcmVhdGUgYWRzIGxvYWRlci5cclxuICAgIHRoaXMuYWRzTG9hZGVyID0gbmV3IGdvb2dsZS5pbWEuQWRzTG9hZGVyKHRoaXMuYWREaXNwbGF5Q29udGFpbmVyKTtcclxuICAgIC8vIExpc3RlbiBhbmQgcmVzcG9uZCB0byBhZHMgbG9hZGVkIGFuZCBlcnJvciBldmVudHMuXHJcbiAgICB0aGlzLmFkc0xvYWRlci5hZGRFdmVudExpc3RlbmVyKFxyXG4gICAgICBnb29nbGUuaW1hLkFkc01hbmFnZXJMb2FkZWRFdmVudC5UeXBlLkFEU19NQU5BR0VSX0xPQURFRCxcclxuICAgICAgZXZlbnQgPT4gdGhpcy5vbkFkc01hbmFnZXJMb2FkZWQoZXZlbnQpLFxyXG4gICAgICBmYWxzZSk7XHJcbiAgICB0aGlzLmFkc0xvYWRlci5hZGRFdmVudExpc3RlbmVyKFxyXG4gICAgICBnb29nbGUuaW1hLkFkRXJyb3JFdmVudC5UeXBlLkFEX0VSUk9SLFxyXG4gICAgICBldmVudCA9PiB0aGlzLm9uQWRFcnJvcihldmVudCksXHJcbiAgICAgIGZhbHNlKTtcclxuXHJcbiAgICAvLyBBbiBldmVudCBsaXN0ZW5lciB0byB0ZWxsIHRoZSBTREsgdGhhdCBvdXIgY29udGVudCB2aWRlb1xyXG4gICAgLy8gaXMgY29tcGxldGVkIHNvIHRoZSBTREsgY2FuIHBsYXkgYW55IHBvc3Qtcm9sbCBhZHMuXHJcbiAgICB0aGlzLmNvbnRlbnRQbGF5ZXIub25lbmRlZCA9ICgpID0+IHtcclxuICAgICAgdGhpcy5jb250ZW50RW5kZWQoKTtcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBpbml0aWFsVXNlckFjdGlvbigpIHtcclxuICAgIHRoaXMuYWREaXNwbGF5Q29udGFpbmVyLmluaXRpYWxpemUoKTtcclxuICAgIHRoaXMuY29udGVudFBsYXllci5sb2FkKCk7XHJcbiAgfVxyXG5cclxuICByZXF1ZXN0QWRzKGFkVGFnVXJsKSB7XHJcbiAgICBjb25zdCBhZHNSZXF1ZXN0ID0gbmV3IGdvb2dsZS5pbWEuQWRzUmVxdWVzdCgpO1xyXG4gICAgYWRzUmVxdWVzdC5hZFRhZ1VybCA9IGFkVGFnVXJsO1xyXG4gICAgYWRzUmVxdWVzdC5saW5lYXJBZFNsb3RXaWR0aCA9IHRoaXMud2lkdGg7XHJcbiAgICBhZHNSZXF1ZXN0LmxpbmVhckFkU2xvdEhlaWdodCA9IHRoaXMuaGVpZ2h0O1xyXG4gICAgYWRzUmVxdWVzdC5ub25MaW5lYXJBZFNsb3RXaWR0aCA9IHRoaXMud2lkdGg7XHJcbiAgICBhZHNSZXF1ZXN0Lm5vbkxpbmVhckFkU2xvdEhlaWdodCA9IHRoaXMuaGVpZ2h0O1xyXG4gICAgdGhpcy5hZHNMb2FkZXIucmVxdWVzdEFkcyhhZHNSZXF1ZXN0KTtcclxuICB9XHJcblxyXG4gIGNvbnRlbnRFbmRlZCgpIHtcclxuICAgIHRoaXMuY29udGVudENvbXBsZXRlQ2FsbGVkID0gdHJ1ZTtcclxuICAgIHRoaXMuYWRzTG9hZGVyLmNvbnRlbnRDb21wbGV0ZSgpO1xyXG4gIH1cclxuXHJcbiAgb25BZHNNYW5hZ2VyTG9hZGVkKGFkc01hbmFnZXJMb2FkZWRFdmVudCkge1xyXG4gICAgY29uc3QgYWRzUmVuZGVyaW5nU2V0dGluZ3MgPSBuZXcgZ29vZ2xlLmltYS5BZHNSZW5kZXJpbmdTZXR0aW5ncygpO1xyXG4gICAgYWRzUmVuZGVyaW5nU2V0dGluZ3MucmVzdG9yZUN1c3RvbVBsYXliYWNrU3RhdGVPbkFkQnJlYWtDb21wbGV0ZSA9IHRydWU7XHJcbiAgICB0aGlzLmFkc01hbmFnZXIgPSBhZHNNYW5hZ2VyTG9hZGVkRXZlbnQuZ2V0QWRzTWFuYWdlcihcclxuICAgICAgdGhpcy5jb250ZW50UGxheWVyLCBhZHNSZW5kZXJpbmdTZXR0aW5ncyk7XHJcbiAgICB0aGlzLnN0YXJ0QWRzTWFuYWdlcih0aGlzLmFkc01hbmFnZXIpO1xyXG4gIH1cclxuXHJcbiAgc3RhcnRBZHNNYW5hZ2VyKGFkc01hbmFnZXIpIHtcclxuICAgIC8vIEF0dGFjaCB0aGUgcGF1c2UvcmVzdW1lIGV2ZW50cy5cclxuICAgIGFkc01hbmFnZXIuYWRkRXZlbnRMaXN0ZW5lcihcclxuICAgICAgZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuQ09OVEVOVF9QQVVTRV9SRVFVRVNURUQsXHJcbiAgICAgICgpID0+IHRoaXMub25Db250ZW50UGF1c2VSZXF1ZXN0ZWQoKSxcclxuICAgICAgZmFsc2UsXHJcbiAgICAgIHRoaXMpO1xyXG4gICAgYWRzTWFuYWdlci5hZGRFdmVudExpc3RlbmVyKFxyXG4gICAgICBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5DT05URU5UX1JFU1VNRV9SRVFVRVNURUQsXHJcbiAgICAgICgpID0+IHRoaXMub25Db250ZW50UmVzdW1lUmVxdWVzdGVkKCksXHJcbiAgICAgIGZhbHNlLFxyXG4gICAgICB0aGlzKTtcclxuICAgIC8vIEhhbmRsZSBlcnJvcnMuXHJcbiAgICBhZHNNYW5hZ2VyLmFkZEV2ZW50TGlzdGVuZXIoXHJcbiAgICAgIGdvb2dsZS5pbWEuQWRFcnJvckV2ZW50LlR5cGUuQURfRVJST1IsXHJcbiAgICAgIGV2ZW50ID0+IHRoaXMub25BZEVycm9yKGV2ZW50KSxcclxuICAgICAgZmFsc2UsXHJcbiAgICAgIHRoaXMpO1xyXG4gICAgY29uc3QgZXZlbnRzID0gW2dvb2dsZS5pbWEuQWRFdmVudC5UeXBlLkFMTF9BRFNfQ09NUExFVEVELFxyXG4gICAgZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuQ0xJQ0ssXHJcbiAgICBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5DT01QTEVURSxcclxuICAgIGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLkZJUlNUX1FVQVJUSUxFLFxyXG4gICAgZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuTE9BREVELFxyXG4gICAgZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuTUlEUE9JTlQsXHJcbiAgICBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5QQVVTRUQsXHJcbiAgICBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5TVEFSVEVELFxyXG4gICAgZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuVEhJUkRfUVVBUlRJTEVdO1xyXG4gICAgZXZlbnRzLmZvckVhY2goZXZlbnQgPT5cclxuICAgICAgYWRzTWFuYWdlci5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBhZEV2ZW50ID0+IHRoaXMub25BZEV2ZW50KGFkRXZlbnQpLCBmYWxzZSlcclxuICAgICk7XHJcblxyXG4gICAgYWRzTWFuYWdlci5pbml0KFxyXG4gICAgICB0aGlzLndpZHRoLFxyXG4gICAgICB0aGlzLmhlaWdodCxcclxuICAgICAgZ29vZ2xlLmltYS5WaWV3TW9kZS5OT1JNQUwpO1xyXG5cclxuICAgIGFkc01hbmFnZXIuc3RhcnQoKTtcclxuICB9XHJcblxyXG4gIG9uQ29udGVudFBhdXNlUmVxdWVzdGVkKCkge1xyXG4gICAgdGhpcy5wYXVzZUZvckFkKCk7XHJcbiAgfVxyXG5cclxuICBvbkNvbnRlbnRSZXN1bWVSZXF1ZXN0ZWQoKSB7XHJcbiAgICAvLyBXaXRob3V0IHRoaXMgY2hlY2sgdGhlIHZpZGVvIHN0YXJ0cyBvdmVyIGZyb20gdGhlIGJlZ2lubmluZyBvbiBhXHJcbiAgICAvLyBwb3N0LXJvbGwncyBDT05URU5UX1JFU1VNRV9SRVFVRVNURURcclxuICAgIGlmICghdGhpcy5jb250ZW50Q29tcGxldGVDYWxsZWQpIHtcclxuICAgICAgdGhpcy5yZXN1bWVBZnRlckFkKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBvbkFkRXZlbnQoYWRFdmVudCkge1xyXG4gICAgaWYgKGFkRXZlbnQudHlwZSA9PT0gZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuTE9BREVEKSB7XHJcbiAgICAgIGNvbnN0IGFkID0gYWRFdmVudC5nZXRBZCgpO1xyXG4gICAgICBpZiAoIWFkLmlzTGluZWFyKCkpIHtcclxuICAgICAgICB0aGlzLm9uQ29udGVudFJlc3VtZVJlcXVlc3RlZCgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICB0aGlzLmFkRXZlbnRzLmVtaXQoYWRFdmVudCk7XHJcbiAgfVxyXG5cclxuICBvbkFkRXJyb3IoYWRFcnJvckV2ZW50KSB7XHJcbiAgICBpZiAodGhpcy5hZHNNYW5hZ2VyKSB7XHJcbiAgICAgIHRoaXMuYWRzTWFuYWdlci5kZXN0cm95KCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLnJlc3VtZUFmdGVyQWQoKTtcclxuICAgIHRoaXMuYWRFdmVudHMuZW1pdChhZEVycm9yRXZlbnQpO1xyXG4gIH1cclxuXHJcbiAgLy8gYXBwbGljYXRpb24gZnVuY3Rpb25zXHJcblxyXG4gIHJlc3VtZUFmdGVyQWQoKSB7XHJcbiAgICB0aGlzLmNvbnRlbnRQbGF5ZXIucGxheSgpO1xyXG4gIH1cclxuXHJcbiAgcGF1c2VGb3JBZCgpIHtcclxuICAgIHRoaXMuY29udGVudFBsYXllci5wYXVzZSgpO1xyXG4gIH1cclxuXHJcbiAgbG9hZEFkcygpIHtcclxuICAgIHRoaXMucmVxdWVzdEFkcyh0aGlzLmFkVGFnKTtcclxuICB9XHJcblxyXG59XHJcbiJdfQ==