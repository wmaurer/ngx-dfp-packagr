/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Directive, ElementRef, Input, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
export class DfpAudiencePixelDirective {
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
if (false) {
    /** @type {?} */
    DfpAudiencePixelDirective.prototype.adUnit;
    /** @type {?} */
    DfpAudiencePixelDirective.prototype.segmentId;
    /** @type {?} */
    DfpAudiencePixelDirective.prototype.ppid;
    /** @type {?} */
    DfpAudiencePixelDirective.prototype.platformId;
    /** @type {?} */
    DfpAudiencePixelDirective.prototype.elementRef;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGZwLWF1ZGllbmNlLXBpeGVsLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1kZnAvIiwic291cmNlcyI6WyJkaXJlY3RpdmUvZGZwLWF1ZGllbmNlLXBpeGVsLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFBRSxVQUFVLEVBQ3JCLEtBQUssRUFFTCxNQUFNLEVBQ04sV0FBVyxFQUNaLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBS3BELE1BQU07Ozs7O0lBTUosWUFDK0IsVUFBa0IsRUFDdkM7UUFEcUIsZUFBVSxHQUFWLFVBQVUsQ0FBUTtRQUN2QyxlQUFVLEdBQVYsVUFBVTtLQUNmOzs7O0lBRUwsUUFBUTtRQUNOLEVBQUUsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7O1lBQ3ZDLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FDTzs7WUFEakMsTUFDRSxNQUFNLEdBQUcsSUFBSSxHQUFHLGNBQWMsQ0FBQzs7WUFFakMsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO1lBQ2hCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUNoQixNQUFNLEdBQUcsU0FBUyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7YUFDakM7O1lBRUQsSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDO1lBQ2QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ2QsSUFBSSxHQUFHLFFBQVEsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO2FBQzVCOztZQUVELE1BQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7WUFFNUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxnREFBZ0QsQ0FBQztZQUM3RCxLQUFLLENBQUMsR0FBRyxJQUFJLEdBQUcsTUFBTSxXQUFXLElBQUksQ0FBQyxTQUFTLElBQUksTUFBTSxHQUFHLElBQUksRUFBRSxDQUFDO1lBRW5FLEtBQUssQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1lBQ2hCLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1lBQ2pCLEtBQUssQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDO1lBRW5CLEtBQUssQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLFFBQVEsQ0FBQztZQUVsQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDN0M7S0FDRjs7O1lBMUNGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsb0JBQW9CO2FBQy9COzs7O1lBUTRDLE1BQU0sdUJBQTlDLE1BQU0sU0FBQyxXQUFXO1lBbEJWLFVBQVU7OztxQkFhcEIsS0FBSzt3QkFDTCxLQUFLO21CQUNMLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIERpcmVjdGl2ZSwgRWxlbWVudFJlZixcclxuICBJbnB1dCxcclxuICBPbkluaXQsXHJcbiAgSW5qZWN0LFxyXG4gIFBMQVRGT1JNX0lEXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnZGZwLWF1ZGllbmNlLXBpeGVsJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgRGZwQXVkaWVuY2VQaXhlbERpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcblxyXG4gIEBJbnB1dCgpIGFkVW5pdDogc3RyaW5nO1xyXG4gIEBJbnB1dCgpIHNlZ21lbnRJZDogbnVtYmVyO1xyXG4gIEBJbnB1dCgpIHBwaWQ6IG51bWJlcjtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBASW5qZWN0KFBMQVRGT1JNX0lEKSBwcml2YXRlIHBsYXRmb3JtSWQ6IE9iamVjdCxcclxuICAgIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZlxyXG4gICkgeyB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcclxuICAgICAgY29uc3QgYXhlbCA9IE1hdGgucmFuZG9tKCksXHJcbiAgICAgICAgcmFuZG9tID0gYXhlbCAqIDEwMDAwMDAwMDAwMDAwO1xyXG5cclxuICAgICAgbGV0IGFkVW5pdCA9ICcnO1xyXG4gICAgICBpZiAodGhpcy5hZFVuaXQpIHtcclxuICAgICAgICBhZFVuaXQgPSBgZGNfaXU9JHt0aGlzLmFkVW5pdH1gO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBsZXQgcHBpZCA9ICcnO1xyXG4gICAgICBpZiAodGhpcy5wcGlkKSB7XHJcbiAgICAgICAgcHBpZCA9IGBwcGlkPSR7dGhpcy5wcGlkfWA7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IHBpeGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XHJcblxyXG4gICAgICBwaXhlbC5zcmMgPSAnaHR0cHM6Ly9wdWJhZHMuZy5kb3VibGVjbGljay5uZXQvYWN0aXZpdHk7b3JkPSc7XHJcbiAgICAgIHBpeGVsLnNyYyArPSBgJHtyYW5kb219O2RjX3NlZz0ke3RoaXMuc2VnbWVudElkfTske2FkVW5pdH0ke3BwaWR9YDtcclxuXHJcbiAgICAgIHBpeGVsLndpZHRoID0gMTtcclxuICAgICAgcGl4ZWwuaGVpZ2h0ID0gMTtcclxuICAgICAgcGl4ZWwuYm9yZGVyID0gJzAnO1xyXG5cclxuICAgICAgcGl4ZWwuc3R5bGUudmlzaWJpbGl0eSA9ICdoaWRkZW4nO1xyXG5cclxuICAgICAgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuYXBwZW5kKHBpeGVsKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19