/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Directive, ElementRef, Input, Inject, forwardRef, Optional } from '@angular/core';
import { DfpAdDirective } from './dfp-ad.directive';
import { DfpResponsiveDirective } from './dfp-responsive.directive';
var DfpSizeDirective = /** @class */ (function () {
    function DfpSizeDirective(elementRef, ad, resp) {
        this.elementRef = elementRef;
        this.ad = ad;
        this.resp = resp;
    }
    /**
     * @return {?}
     */
    DfpSizeDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var target = this.resp || this.ad;
        /** @type {?} */
        var innerText = this.elementRef.nativeElement.innerText;
        if (this.width && this.height) {
            target.addSize([this.width, this.height]);
        }
        else if (innerText.trim() !== '') {
            target.addSize(innerText);
        }
    };
    DfpSizeDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'dfp-size'
                },] },
    ];
    /** @nocollapse */
    DfpSizeDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: DfpAdDirective, decorators: [{ type: Inject, args: [forwardRef(function () { return DfpAdDirective; }),] }] },
        { type: DfpResponsiveDirective, decorators: [{ type: Optional }, { type: Inject, args: [forwardRef(function () { return DfpResponsiveDirective; }),] }] }
    ]; };
    DfpSizeDirective.propDecorators = {
        width: [{ type: Input }],
        height: [{ type: Input }]
    };
    return DfpSizeDirective;
}());
export { DfpSizeDirective };
if (false) {
    /** @type {?} */
    DfpSizeDirective.prototype.width;
    /** @type {?} */
    DfpSizeDirective.prototype.height;
    /** @type {?} */
    DfpSizeDirective.prototype.elementRef;
    /** @type {?} */
    DfpSizeDirective.prototype.ad;
    /** @type {?} */
    DfpSizeDirective.prototype.resp;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGZwLXNpemUuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWRmcC8iLCJzb3VyY2VzIjpbImRpcmVjdGl2ZS9kZnAtc2l6ZS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFVLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVuRyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDcEQsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7O0lBVWxFLDBCQUNVLFlBRUEsRUFBa0IsRUFFbEIsSUFBNEI7UUFKNUIsZUFBVSxHQUFWLFVBQVU7UUFFVixPQUFFLEdBQUYsRUFBRSxDQUFnQjtRQUVsQixTQUFJLEdBQUosSUFBSSxDQUF3QjtLQUNqQzs7OztJQUVMLG1DQUFROzs7SUFBUjs7UUFDRSxJQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxFQUFFLENBQzJCOztRQUQ5RCxJQUNFLFNBQVMsR0FBVyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUM7UUFFOUQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUM5QixNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztTQUMzQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNuQyxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQzNCO0tBQ0Y7O2dCQXpCRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLFVBQVU7aUJBQ3JCOzs7O2dCQVBtQixVQUFVO2dCQUVyQixjQUFjLHVCQWFsQixNQUFNLFNBQUMsVUFBVSxDQUFDLGNBQU0sT0FBQSxjQUFjLEVBQWQsQ0FBYyxDQUFDO2dCQVpuQyxzQkFBc0IsdUJBYzFCLFFBQVEsWUFBSSxNQUFNLFNBQUMsVUFBVSxDQUFDLGNBQU0sT0FBQSxzQkFBc0IsRUFBdEIsQ0FBc0IsQ0FBQzs7O3dCQVA3RCxLQUFLO3lCQUNMLEtBQUs7OzJCQVhSOztTQVFhLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSW5wdXQsIEluamVjdCwgZm9yd2FyZFJlZiwgT25Jbml0LCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgRGZwQWREaXJlY3RpdmUgfSBmcm9tICcuL2RmcC1hZC5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBEZnBSZXNwb25zaXZlRGlyZWN0aXZlIH0gZnJvbSAnLi9kZnAtcmVzcG9uc2l2ZS5kaXJlY3RpdmUnO1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdkZnAtc2l6ZSdcclxufSlcclxuZXhwb3J0IGNsYXNzIERmcFNpemVEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQge1xyXG5cclxuICBASW5wdXQoKSB3aWR0aDogbnVtYmVyO1xyXG4gIEBJbnB1dCgpIGhlaWdodDogbnVtYmVyO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZixcclxuICAgIEBJbmplY3QoZm9yd2FyZFJlZigoKSA9PiBEZnBBZERpcmVjdGl2ZSkpXHJcbiAgICBwcml2YXRlIGFkOiBEZnBBZERpcmVjdGl2ZSxcclxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoZm9yd2FyZFJlZigoKSA9PiBEZnBSZXNwb25zaXZlRGlyZWN0aXZlKSlcclxuICAgIHByaXZhdGUgcmVzcDogRGZwUmVzcG9uc2l2ZURpcmVjdGl2ZVxyXG4gICkgeyB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgY29uc3QgdGFyZ2V0ID0gdGhpcy5yZXNwIHx8IHRoaXMuYWQsXHJcbiAgICAgIGlubmVyVGV4dDogc3RyaW5nID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuaW5uZXJUZXh0O1xyXG5cclxuICAgIGlmICh0aGlzLndpZHRoICYmIHRoaXMuaGVpZ2h0KSB7XHJcbiAgICAgIHRhcmdldC5hZGRTaXplKFt0aGlzLndpZHRoLCB0aGlzLmhlaWdodF0pO1xyXG4gICAgfSBlbHNlIGlmIChpbm5lclRleHQudHJpbSgpICE9PSAnJykge1xyXG4gICAgICB0YXJnZXQuYWRkU2l6ZShpbm5lclRleHQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbn1cclxuIl19