/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Directive, ElementRef, Input, Output, EventEmitter, Inject, PLATFORM_ID, Optional } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { DfpService, } from '../service/dfp.service';
import { DfpIDGeneratorService, } from '../service/dfp-id-generator.service';
import { DfpRefreshService } from '../service/dfp-refresh.service';
import { DFPIncompleteError, DfpConfig } from '../class';
import { DFP_CONFIG } from '../service/injection_token';
export class DfpRefreshEvent {
}
if (false) {
    /** @type {?} */
    DfpRefreshEvent.prototype.type;
    /** @type {?} */
    DfpRefreshEvent.prototype.slot;
    /** @type {?} */
    DfpRefreshEvent.prototype.data;
}
export class DfpAdDirective {
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
if (false) {
    /** @type {?} */
    DfpAdDirective.prototype.adUnit;
    /** @type {?} */
    DfpAdDirective.prototype.clickUrl;
    /** @type {?} */
    DfpAdDirective.prototype.forceSafeFrame;
    /** @type {?} */
    DfpAdDirective.prototype.safeFrameConfig;
    /** @type {?} */
    DfpAdDirective.prototype.refresh;
    /** @type {?} */
    DfpAdDirective.prototype.collapseIfEmpty;
    /** @type {?} */
    DfpAdDirective.prototype.afterRefresh;
    /** @type {?} */
    DfpAdDirective.prototype.sizes;
    /** @type {?} */
    DfpAdDirective.prototype.responsiveMapping;
    /** @type {?} */
    DfpAdDirective.prototype.targetings;
    /** @type {?} */
    DfpAdDirective.prototype.exclusions;
    /** @type {?} */
    DfpAdDirective.prototype.scripts;
    /** @type {?} */
    DfpAdDirective.prototype.slot;
    /** @type {?} */
    DfpAdDirective.prototype.onSameNavigation;
    /** @type {?} */
    DfpAdDirective.prototype.platformId;
    /** @type {?} */
    DfpAdDirective.prototype.elementRef;
    /** @type {?} */
    DfpAdDirective.prototype.dfp;
    /** @type {?} */
    DfpAdDirective.prototype.dfpIDGenerator;
    /** @type {?} */
    DfpAdDirective.prototype.dfpRefresh;
    /** @type {?} */
    DfpAdDirective.prototype.config;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGZwLWFkLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1kZnAvIiwic291cmNlcyI6WyJkaXJlY3RpdmUvZGZwLWFkLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFBRSxVQUFVLEVBQ3JCLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUNPLE1BQU0sRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUNoRSxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNwRCxPQUFPLEVBQUUsTUFBTSxFQUFFLGFBQWEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBR3hELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUV4QyxPQUFPLEVBQUUsVUFBVSxHQUFHLE1BQU0sd0JBQXdCLENBQUM7QUFDckQsT0FBTyxFQUFFLHFCQUFxQixHQUFHLE1BQU0scUNBQXFDLENBQUM7QUFDN0UsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFFbkUsT0FBTyxFQUFFLGtCQUFrQixFQUFjLFNBQVMsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUNyRSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFJeEQsTUFBTTtDQUlMOzs7Ozs7Ozs7QUFLRCxNQUFNOzs7Ozs7Ozs7O0lBeUJKLFlBQytCLFVBQWtCLEVBQ3ZDLFlBQ0EsS0FDQSxnQkFDQSxZQUNvQixNQUFpQixFQUNqQyxNQUFjO1FBTkcsZUFBVSxHQUFWLFVBQVUsQ0FBUTtRQUN2QyxlQUFVLEdBQVYsVUFBVTtRQUNWLFFBQUcsR0FBSCxHQUFHO1FBQ0gsbUJBQWMsR0FBZCxjQUFjO1FBQ2QsZUFBVSxHQUFWLFVBQVU7UUFDVSxXQUFNLEdBQU4sTUFBTSxDQUFXOzRCQXRCUyxJQUFJLFlBQVksRUFBRTtxQkFFMUQsRUFBRTtpQ0FF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SyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUN2Qjs7Ozs7SUFFRCxvQkFBb0IsQ0FBQyxPQUFPO1FBQzFCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDdEM7Ozs7O0lBRUQsWUFBWSxDQUFDLFNBQVM7UUFDcEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7S0FDakM7Ozs7O0lBRUQsWUFBWSxDQUFDLFNBQVM7UUFDcEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7S0FDakM7Ozs7O0lBRUQsU0FBUyxDQUFDLE1BQU07UUFDZCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUMzQjs7O1lBcE1GLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsUUFBUTthQUNuQjs7OztZQTJCNEMsTUFBTSx1QkFBOUMsTUFBTSxTQUFDLFdBQVc7WUF0RFYsVUFBVTtZQVVkLFVBQVU7WUFDVixxQkFBcUI7WUFDckIsaUJBQWlCO1lBRWUsU0FBUyx1QkE2QzdDLE1BQU0sU0FBQyxVQUFVO1lBdERiLE1BQU0sdUJBdURWLFFBQVE7OztxQkE5QlYsS0FBSzt1QkFDTCxLQUFLOzZCQUNMLEtBQUs7OEJBQ0wsS0FBSztzQkFDTCxLQUFLOzhCQUNMLEtBQUs7MkJBRUwsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgRGlyZWN0aXZlLCBFbGVtZW50UmVmLFxyXG4gIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlcixcclxuICBPbkluaXQsIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSwgSW5qZWN0LCBQTEFURk9STV9JRCwgT3B0aW9uYWxcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgaXNQbGF0Zm9ybUJyb3dzZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBSb3V0ZXIsIE5hdmlnYXRpb25FbmQgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5cclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IGZpbHRlciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuXHJcbmltcG9ydCB7IERmcFNlcnZpY2UsIH0gZnJvbSAnLi4vc2VydmljZS9kZnAuc2VydmljZSc7XHJcbmltcG9ydCB7IERmcElER2VuZXJhdG9yU2VydmljZSwgfSBmcm9tICcuLi9zZXJ2aWNlL2RmcC1pZC1nZW5lcmF0b3Iuc2VydmljZSc7XHJcbmltcG9ydCB7IERmcFJlZnJlc2hTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZS9kZnAtcmVmcmVzaC5zZXJ2aWNlJztcclxuXHJcbmltcG9ydCB7IERGUEluY29tcGxldGVFcnJvciwgR29vZ2xlU2xvdCwgRGZwQ29uZmlnIH0gZnJvbSAnLi4vY2xhc3MnO1xyXG5pbXBvcnQgeyBERlBfQ09ORklHIH0gZnJvbSAnLi4vc2VydmljZS9pbmplY3Rpb25fdG9rZW4nO1xyXG5cclxuZGVjbGFyZSB2YXIgZ29vZ2xldGFnO1xyXG5cclxuZXhwb3J0IGNsYXNzIERmcFJlZnJlc2hFdmVudCB7XHJcbiAgdHlwZTogc3RyaW5nO1xyXG4gIHNsb3Q6IGFueTtcclxuICBkYXRhPzogYW55O1xyXG59XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ2RmcC1hZCdcclxufSlcclxuZXhwb3J0IGNsYXNzIERmcEFkRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xyXG5cclxuICBASW5wdXQoKSBhZFVuaXQ6IHN0cmluZztcclxuICBASW5wdXQoKSBjbGlja1VybDogc3RyaW5nO1xyXG4gIEBJbnB1dCgpIGZvcmNlU2FmZUZyYW1lOiBib29sZWFuO1xyXG4gIEBJbnB1dCgpIHNhZmVGcmFtZUNvbmZpZzogc3RyaW5nO1xyXG4gIEBJbnB1dCgpIHJlZnJlc2g6IHN0cmluZztcclxuICBASW5wdXQoKSBjb2xsYXBzZUlmRW1wdHk6IGJvb2xlYW47XHJcblxyXG4gIEBPdXRwdXQoKSBhZnRlclJlZnJlc2g6IEV2ZW50RW1pdHRlcjxEZnBSZWZyZXNoRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICBwcml2YXRlIHNpemVzID0gW107XHJcblxyXG4gIHByaXZhdGUgcmVzcG9uc2l2ZU1hcHBpbmcgPSBbXTtcclxuXHJcbiAgcHJpdmF0ZSB0YXJnZXRpbmdzID0gW107XHJcblxyXG4gIHByaXZhdGUgZXhjbHVzaW9ucyA9IFtdO1xyXG5cclxuICBwcml2YXRlIHNjcmlwdHMgPSBbXTtcclxuXHJcbiAgcHJpdmF0ZSBzbG90OiBHb29nbGVTbG90O1xyXG5cclxuICBwcml2YXRlIG9uU2FtZU5hdmlnYXRpb246IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBASW5qZWN0KFBMQVRGT1JNX0lEKSBwcml2YXRlIHBsYXRmb3JtSWQ6IE9iamVjdCxcclxuICAgIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZixcclxuICAgIHByaXZhdGUgZGZwOiBEZnBTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBkZnBJREdlbmVyYXRvcjogRGZwSURHZW5lcmF0b3JTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBkZnBSZWZyZXNoOiBEZnBSZWZyZXNoU2VydmljZSxcclxuICAgIEBJbmplY3QoREZQX0NPTkZJRykgcHJpdmF0ZSBjb25maWc6IERmcENvbmZpZyxcclxuICAgIEBPcHRpb25hbCgpIHJvdXRlcjogUm91dGVyXHJcbiAgKSB7XHJcbiAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xyXG4gICAgICB0aGlzLmRmcFJlZnJlc2gucmVmcmVzaEV2ZW50LnN1YnNjcmliZShzbG90ID0+IHtcclxuICAgICAgICBpZiAoc2xvdCA9PT0gdGhpcy5zbG90KSB7XHJcbiAgICAgICAgICB0aGlzLmFmdGVyUmVmcmVzaC5lbWl0KHsgdHlwZTogJ3JlZnJlc2gnLCBzbG90OiBzbG90IH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICAgIGlmIChyb3V0ZXIpIHtcclxuICAgICAgICB0aGlzLm9uU2FtZU5hdmlnYXRpb24gPSByb3V0ZXIuZXZlbnRzLnBpcGUoZmlsdGVyKGV2ZW50ID0+IGV2ZW50IGluc3RhbmNlb2YgTmF2aWdhdGlvbkVuZCkpXHJcbiAgICAgICAgICAuc3Vic2NyaWJlKChldmVudDogTmF2aWdhdGlvbkVuZCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zbG90ICYmICF0aGlzLnJlZnJlc2ggJiYgdGhpcy5jb25maWcub25TYW1lTmF2aWdhdGlvbiA9PT0gJ3JlZnJlc2gnKSB7XHJcbiAgICAgICAgICAgICAgdGhpcy5yZWZyZXNoQ29udGVudC5jYWxsKHRoaXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xyXG4gICAgICB0aGlzLmRmcElER2VuZXJhdG9yLmRmcElER2VuZXJhdG9yKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcclxuICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XHJcbiAgICAgIHRoaXMuZGZwLmRlZmluZVRhc2soKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuZGVmaW5lU2xvdCgpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgaWYgKHRoaXMuc2xvdCkge1xyXG4gICAgICBnb29nbGV0YWcuZGVzdHJveVNsb3RzKFt0aGlzLnNsb3RdKTtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLm9uU2FtZU5hdmlnYXRpb24pIHtcclxuICAgICAgdGhpcy5vblNhbWVOYXZpZ2F0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHNldFJlc3BvbnNpdmVNYXBwaW5nKHNsb3QpIHtcclxuICAgIGNvbnN0IGFkID0gdGhpcy5nZXRTdGF0ZSgpO1xyXG5cclxuICAgIGlmIChhZC5yZXNwb25zaXZlTWFwcGluZy5sZW5ndGggPT09IDApIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHNpemVNYXBwaW5nID0gZ29vZ2xldGFnLnNpemVNYXBwaW5nKCk7XHJcblxyXG4gICAgYWQucmVzcG9uc2l2ZU1hcHBpbmcuZm9yRWFjaChtYXBwaW5nID0+IHtcclxuICAgICAgc2l6ZU1hcHBpbmcuYWRkU2l6ZShtYXBwaW5nLnZpZXdwb3J0U2l6ZSwgbWFwcGluZy5hZFNpemVzKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHNsb3QuZGVmaW5lU2l6ZU1hcHBpbmcoc2l6ZU1hcHBpbmcuYnVpbGQoKSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGRlZmluZVNsb3QoKSB7XHJcbiAgICBjb25zdCBhZCA9IHRoaXMuZ2V0U3RhdGUoKSxcclxuICAgICAgZWxlbWVudCA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xyXG5cclxuICAgIHRoaXMuc2xvdCA9IGdvb2dsZXRhZy5kZWZpbmVTbG90KGFkLmFkVW5pdCwgYWQuc2l6ZXMsIGVsZW1lbnQuaWQpO1xyXG5cclxuICAgIGlmICh0aGlzLmZvcmNlU2FmZUZyYW1lICE9PSB1bmRlZmluZWQgJiYgYWQuZm9yY2VTYWZlRnJhbWUgPT09ICF0aGlzLmNvbmZpZy5mb3JjZVNhZmVGcmFtZSkge1xyXG4gICAgICB0aGlzLnNsb3Quc2V0Rm9yY2VTYWZlRnJhbWUoYWQuZm9yY2VTYWZlRnJhbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChhZC5jbGlja1VybCkge1xyXG4gICAgICB0aGlzLnNsb3Quc2V0Q2xpY2tVcmwoYWQuY2xpY2tVcmwpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChhZC5jb2xsYXBzZUlmRW1wdHkpIHtcclxuICAgICAgdGhpcy5zbG90LnNldENvbGxhcHNlRW1wdHlEaXYodHJ1ZSwgdHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGFkLnNhZmVGcmFtZUNvbmZpZykge1xyXG4gICAgICB0aGlzLnNsb3Quc2V0U2FmZUZyYW1lQ29uZmlnKFxyXG4gICAgICAgIChKU09OLnBhcnNlKGFkLnNhZmVGcmFtZUNvbmZpZykpXHJcbiAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5zbG90LnJlbmRlckVuZGVkID0gKGdvb2dsZVNsb3RFdmVudDogSUFyZ3VtZW50cykgPT4ge1xyXG4gICAgICB0aGlzLmFmdGVyUmVmcmVzaC5lbWl0KHsgdHlwZTogJ3JlbmRlckVuZGVkJywgc2xvdDogdGhpcy5zbG90LCBkYXRhOiBnb29nbGVTbG90RXZlbnQgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMuc2V0UmVzcG9uc2l2ZU1hcHBpbmcodGhpcy5zbG90KTtcclxuXHJcbiAgICBhZC50YXJnZXRpbmdzLmZvckVhY2godGFyZ2V0aW5nID0+IHtcclxuICAgICAgdGhpcy5zbG90LnNldFRhcmdldGluZyh0YXJnZXRpbmcua2V5LCB0YXJnZXRpbmcudmFsdWVzKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGFkLmV4Y2x1c2lvbnMuZm9yRWFjaChleGNsdXNpb24gPT4ge1xyXG4gICAgICB0aGlzLnNsb3Quc2V0Q2F0ZWdvcnlFeGNsdXNpb24oZXhjbHVzaW9uKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGFkLnNjcmlwdHMuZm9yRWFjaChzY3JpcHQgPT4geyBzY3JpcHQodGhpcy5zbG90KTsgfSk7XHJcblxyXG4gICAgaWYgKHRoaXMuY29uZmlnLmVuYWJsZVZpZGVvQWRzKSB7XHJcbiAgICAgIHRoaXMuc2xvdC5hZGRTZXJ2aWNlKGdvb2dsZXRhZy5jb21wYW5pb25BZHMoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5zbG90LmFkZFNlcnZpY2UoZ29vZ2xldGFnLnB1YmFkcygpKTtcclxuXHJcbiAgICB0aGlzLnJlZnJlc2hDb250ZW50KCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHJlZnJlc2hDb250ZW50KCkge1xyXG4gICAgdGhpcy5kZnBSZWZyZXNoLnNsb3RSZWZyZXNoKHRoaXMuc2xvdCwgdGhpcy5yZWZyZXNoLCB0cnVlKS50aGVuKHNsb3QgPT4ge1xyXG4gICAgICB0aGlzLmFmdGVyUmVmcmVzaC5lbWl0KHsgdHlwZTogJ2luaXQnLCBzbG90OiBzbG90IH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBjaGVja1ZhbGlkKCkge1xyXG4gICAgaWYgKHRoaXMuc2l6ZXMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIHRocm93IG5ldyBERlBJbmNvbXBsZXRlRXJyb3IoJ2RmcC1hZCcsICdkZnAtc2l6ZScpO1xyXG4gICAgfVxyXG4gICAgaWYgKCF0aGlzLmFkVW5pdCkge1xyXG4gICAgICB0aHJvdyBuZXcgREZQSW5jb21wbGV0ZUVycm9yKCdkZnAtYWQnLCAnYWQtdW5pdCcsIHRydWUpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0IGlzSGlkZGVuKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZGZwUmVmcmVzaC5oaWRkZW5DaGVjayh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCk7XHJcbiAgfVxyXG5cclxuICBnZXRTdGF0ZSgpIHtcclxuICAgIHRoaXMuY2hlY2tWYWxpZCgpO1xyXG4gICAgcmV0dXJuIE9iamVjdC5mcmVlemUoe1xyXG4gICAgICBzaXplczogdGhpcy5zaXplcyxcclxuICAgICAgcmVzcG9uc2l2ZU1hcHBpbmc6IHRoaXMucmVzcG9uc2l2ZU1hcHBpbmcsXHJcbiAgICAgIHRhcmdldGluZ3M6IHRoaXMudGFyZ2V0aW5ncyxcclxuICAgICAgZXhjbHVzaW9uczogdGhpcy5leGNsdXNpb25zLFxyXG4gICAgICBhZFVuaXQ6IHRoaXMuYWRVbml0LFxyXG4gICAgICBmb3JjZVNhZmVGcmFtZTogdGhpcy5mb3JjZVNhZmVGcmFtZSA9PT0gdHJ1ZSxcclxuICAgICAgc2FmZUZyYW1lQ29uZmlnOiB0aGlzLnNhZmVGcmFtZUNvbmZpZyxcclxuICAgICAgY2xpY2tVcmw6IHRoaXMuY2xpY2tVcmwsXHJcbiAgICAgIHJlZnJlc2g6IHRoaXMucmVmcmVzaCxcclxuICAgICAgc2NyaXB0czogdGhpcy5zY3JpcHRzLFxyXG4gICAgICBjb2xsYXBzZUlmRW1wdHk6IHRoaXMuY29sbGFwc2VJZkVtcHR5ID09PSB0cnVlXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGFkZFNpemUoc2l6ZSkge1xyXG4gICAgdGhpcy5zaXplcy5wdXNoKHNpemUpO1xyXG4gIH1cclxuXHJcbiAgYWRkUmVzcG9uc2l2ZU1hcHBpbmcobWFwcGluZykge1xyXG4gICAgdGhpcy5yZXNwb25zaXZlTWFwcGluZy5wdXNoKG1hcHBpbmcpO1xyXG4gIH1cclxuXHJcbiAgYWRkVGFyZ2V0aW5nKHRhcmdldGluZykge1xyXG4gICAgdGhpcy50YXJnZXRpbmdzLnB1c2godGFyZ2V0aW5nKTtcclxuICB9XHJcblxyXG4gIGFkZEV4Y2x1c2lvbihleGNsdXNpb24pIHtcclxuICAgIHRoaXMuZXhjbHVzaW9ucy5wdXNoKGV4Y2x1c2lvbik7XHJcbiAgfVxyXG5cclxuICBhZGRTY3JpcHQoc2NyaXB0KSB7XHJcbiAgICB0aGlzLnNjcmlwdHMucHVzaChzY3JpcHQpO1xyXG4gIH1cclxuXHJcbn1cclxuIl19