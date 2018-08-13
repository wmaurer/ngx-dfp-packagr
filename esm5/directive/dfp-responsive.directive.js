/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Directive, Inject, forwardRef, Input } from '@angular/core';
import { DfpAdDirective } from './dfp-ad.directive';
var DfpResponsiveDirective = /** @class */ (function () {
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
         */
        function (val) {
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
         */
        function (val) {
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
        { type: Directive, args: [{
                    selector: 'dfp-responsive'
                },] },
    ];
    /** @nocollapse */
    DfpResponsiveDirective.ctorParameters = function () { return [
        { type: DfpAdDirective, decorators: [{ type: Inject, args: [forwardRef(function () { return DfpAdDirective; }),] }] }
    ]; };
    DfpResponsiveDirective.propDecorators = {
        viewport: [{ type: Input }],
        adSizes: [{ type: Input }],
        viewWidth: [{ type: Input }],
        viewHeight: [{ type: Input }]
    };
    return DfpResponsiveDirective;
}());
export { DfpResponsiveDirective };
if (false) {
    /** @type {?} */
    DfpResponsiveDirective.prototype.viewport;
    /** @type {?} */
    DfpResponsiveDirective.prototype.adSizes;
    /** @type {?} */
    DfpResponsiveDirective.prototype.ad;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGZwLXJlc3BvbnNpdmUuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWRmcC8iLCJzb3VyY2VzIjpbImRpcmVjdGl2ZS9kZnAtcmVzcG9uc2l2ZS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFFN0UsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG9CQUFvQixDQUFDOztJQVVsRCxnQ0FFVSxFQUFrQjtRQUFsQixPQUFFLEdBQUYsRUFBRSxDQUFnQjt3QkFMUixDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7dUJBQ1AsRUFBRTtLQUtoQjs7OztJQUVMLHlDQUFROzs7SUFBUjtRQUNFLElBQUksQ0FBQyxFQUFFLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7S0FDL0M7SUFFRCxzQkFDSSw2Q0FBUzs7Ozs7UUFEYixVQUNjLEdBQVc7WUFDdkIsRUFBRSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ1osSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7YUFDeEI7U0FDRjs7O09BQUE7SUFFRCxzQkFDSSw4Q0FBVTs7Ozs7UUFEZCxVQUNlLEdBQVc7WUFDeEIsRUFBRSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ1osSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7YUFDeEI7U0FDRjs7O09BQUE7Ozs7O0lBRUQsd0NBQU87Ozs7SUFBUCxVQUFRLElBQUk7UUFDVixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUN6Qjs7OztJQUVELHlDQUFROzs7SUFBUjtRQUNFLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDO1lBQ25CLFlBQVksRUFBRSxJQUFJLENBQUMsUUFBUTtZQUMzQixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87U0FDdEIsQ0FBQyxDQUFDO0tBQ0o7O2dCQXhDRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGdCQUFnQjtpQkFDM0I7Ozs7Z0JBSlEsY0FBYyx1QkFXbEIsTUFBTSxTQUFDLFVBQVUsQ0FBQyxjQUFNLE9BQUEsY0FBYyxFQUFkLENBQWMsQ0FBQzs7OzJCQUp6QyxLQUFLOzBCQUNMLEtBQUs7NEJBV0wsS0FBSzs2QkFPTCxLQUFLOztpQ0E1QlI7O1NBT2Esc0JBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbmplY3QsIGZvcndhcmRSZWYsIElucHV0LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IERmcEFkRGlyZWN0aXZlIH0gZnJvbSAnLi9kZnAtYWQuZGlyZWN0aXZlJztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnZGZwLXJlc3BvbnNpdmUnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBEZnBSZXNwb25zaXZlRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0IHtcclxuXHJcbiAgQElucHV0KCkgdmlld3BvcnQgPSBbMCwgMF07XHJcbiAgQElucHV0KCkgYWRTaXplcyA9IFtdO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIEBJbmplY3QoZm9yd2FyZFJlZigoKSA9PiBEZnBBZERpcmVjdGl2ZSkpXHJcbiAgICBwcml2YXRlIGFkOiBEZnBBZERpcmVjdGl2ZVxyXG4gICkgeyB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy5hZC5hZGRSZXNwb25zaXZlTWFwcGluZyh0aGlzLmdldFN0YXRlKCkpO1xyXG4gIH1cclxuXHJcbiAgQElucHV0KClcclxuICBzZXQgdmlld1dpZHRoKHZhbDogbnVtYmVyKSB7XHJcbiAgICBpZiAodmFsID4gMCkge1xyXG4gICAgICB0aGlzLnZpZXdwb3J0WzBdID0gdmFsO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgQElucHV0KClcclxuICBzZXQgdmlld0hlaWdodCh2YWw6IG51bWJlcikge1xyXG4gICAgaWYgKHZhbCA+IDApIHtcclxuICAgICAgdGhpcy52aWV3cG9ydFsxXSA9IHZhbDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGFkZFNpemUoc2l6ZSkge1xyXG4gICAgdGhpcy5hZFNpemVzLnB1c2goc2l6ZSk7XHJcbiAgfVxyXG5cclxuICBnZXRTdGF0ZSgpIHtcclxuICAgIHJldHVybiBPYmplY3QuZnJlZXplKHtcclxuICAgICAgdmlld3BvcnRTaXplOiB0aGlzLnZpZXdwb3J0LFxyXG4gICAgICBhZFNpemVzOiB0aGlzLmFkU2l6ZXNcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iXX0=