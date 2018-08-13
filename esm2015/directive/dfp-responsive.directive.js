/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Directive, Inject, forwardRef, Input } from '@angular/core';
import { DfpAdDirective } from './dfp-ad.directive';
export class DfpResponsiveDirective {
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
if (false) {
    /** @type {?} */
    DfpResponsiveDirective.prototype.viewport;
    /** @type {?} */
    DfpResponsiveDirective.prototype.adSizes;
    /** @type {?} */
    DfpResponsiveDirective.prototype.ad;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGZwLXJlc3BvbnNpdmUuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWRmcC8iLCJzb3VyY2VzIjpbImRpcmVjdGl2ZS9kZnAtcmVzcG9uc2l2ZS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFFN0UsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBS3BELE1BQU07Ozs7SUFLSixZQUVVLEVBQWtCO1FBQWxCLE9BQUUsR0FBRixFQUFFLENBQWdCO3dCQUxSLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQzt1QkFDUCxFQUFFO0tBS2hCOzs7O0lBRUwsUUFBUTtRQUNOLElBQUksQ0FBQyxFQUFFLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7S0FDL0M7Ozs7O0lBRUQsSUFDSSxTQUFTLENBQUMsR0FBVztRQUN2QixFQUFFLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNaLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO1NBQ3hCO0tBQ0Y7Ozs7O0lBRUQsSUFDSSxVQUFVLENBQUMsR0FBVztRQUN4QixFQUFFLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNaLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO1NBQ3hCO0tBQ0Y7Ozs7O0lBRUQsT0FBTyxDQUFDLElBQUk7UUFDVixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUN6Qjs7OztJQUVELFFBQVE7UUFDTixNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQztZQUNuQixZQUFZLEVBQUUsSUFBSSxDQUFDLFFBQVE7WUFDM0IsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPO1NBQ3RCLENBQUMsQ0FBQztLQUNKOzs7WUF4Q0YsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxnQkFBZ0I7YUFDM0I7Ozs7WUFKUSxjQUFjLHVCQVdsQixNQUFNLFNBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLGNBQWMsQ0FBQzs7O3VCQUp6QyxLQUFLO3NCQUNMLEtBQUs7d0JBV0wsS0FBSzt5QkFPTCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbmplY3QsIGZvcndhcmRSZWYsIElucHV0LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IERmcEFkRGlyZWN0aXZlIH0gZnJvbSAnLi9kZnAtYWQuZGlyZWN0aXZlJztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnZGZwLXJlc3BvbnNpdmUnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBEZnBSZXNwb25zaXZlRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0IHtcclxuXHJcbiAgQElucHV0KCkgdmlld3BvcnQgPSBbMCwgMF07XHJcbiAgQElucHV0KCkgYWRTaXplcyA9IFtdO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIEBJbmplY3QoZm9yd2FyZFJlZigoKSA9PiBEZnBBZERpcmVjdGl2ZSkpXHJcbiAgICBwcml2YXRlIGFkOiBEZnBBZERpcmVjdGl2ZVxyXG4gICkgeyB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy5hZC5hZGRSZXNwb25zaXZlTWFwcGluZyh0aGlzLmdldFN0YXRlKCkpO1xyXG4gIH1cclxuXHJcbiAgQElucHV0KClcclxuICBzZXQgdmlld1dpZHRoKHZhbDogbnVtYmVyKSB7XHJcbiAgICBpZiAodmFsID4gMCkge1xyXG4gICAgICB0aGlzLnZpZXdwb3J0WzBdID0gdmFsO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgQElucHV0KClcclxuICBzZXQgdmlld0hlaWdodCh2YWw6IG51bWJlcikge1xyXG4gICAgaWYgKHZhbCA+IDApIHtcclxuICAgICAgdGhpcy52aWV3cG9ydFsxXSA9IHZhbDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGFkZFNpemUoc2l6ZSkge1xyXG4gICAgdGhpcy5hZFNpemVzLnB1c2goc2l6ZSk7XHJcbiAgfVxyXG5cclxuICBnZXRTdGF0ZSgpIHtcclxuICAgIHJldHVybiBPYmplY3QuZnJlZXplKHtcclxuICAgICAgdmlld3BvcnRTaXplOiB0aGlzLnZpZXdwb3J0LFxyXG4gICAgICBhZFNpemVzOiB0aGlzLmFkU2l6ZXNcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iXX0=