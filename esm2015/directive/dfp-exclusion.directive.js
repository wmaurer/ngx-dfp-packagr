/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Directive, ElementRef, Inject, forwardRef } from '@angular/core';
import { DfpAdDirective } from './dfp-ad.directive';
export class DfpExclusionDirective {
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
if (false) {
    /** @type {?} */
    DfpExclusionDirective.prototype.elementRef;
    /** @type {?} */
    DfpExclusionDirective.prototype.ad;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGZwLWV4Y2x1c2lvbi5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZGZwLyIsInNvdXJjZXMiOlsiZGlyZWN0aXZlL2RmcC1leGNsdXNpb24uZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUFFLFVBQVUsRUFDckIsTUFBTSxFQUFFLFVBQVUsRUFFbkIsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBS3BELE1BQU07Ozs7O0lBRUosWUFDVSxZQUVBLEVBQWtCO1FBRmxCLGVBQVUsR0FBVixVQUFVO1FBRVYsT0FBRSxHQUFGLEVBQUUsQ0FBZ0I7S0FDeEI7Ozs7SUFFSixRQUFRO1FBQ04sSUFBSSxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUM7S0FDL0Q7OztZQWJGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsZUFBZTthQUMxQjs7OztZQVRZLFVBQVU7WUFLZCxjQUFjLHVCQVNsQixNQUFNLFNBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLGNBQWMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgRGlyZWN0aXZlLCBFbGVtZW50UmVmLFxyXG4gIEluamVjdCwgZm9yd2FyZFJlZixcclxuICBPbkluaXRcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IERmcEFkRGlyZWN0aXZlIH0gZnJvbSAnLi9kZnAtYWQuZGlyZWN0aXZlJztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnZGZwLWV4Y2x1c2lvbidcclxufSlcclxuZXhwb3J0IGNsYXNzIERmcEV4Y2x1c2lvbkRpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxyXG4gICAgQEluamVjdChmb3J3YXJkUmVmKCgpID0+IERmcEFkRGlyZWN0aXZlKSlcclxuICAgIHByaXZhdGUgYWQ6IERmcEFkRGlyZWN0aXZlXHJcbiAgKSB7fVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMuYWQuYWRkRXhjbHVzaW9uKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmlubmVyVGV4dCk7XHJcbiAgfVxyXG5cclxufVxyXG4iXX0=