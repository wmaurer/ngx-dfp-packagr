/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Directive, ElementRef, Input, Inject, forwardRef, Optional } from '@angular/core';
import { DfpAdDirective } from './dfp-ad.directive';
import { DfpResponsiveDirective } from './dfp-responsive.directive';
export class DfpSizeDirective {
    /**
     * @param {?} elementRef
     * @param {?} ad
     * @param {?} resp
     */
    constructor(elementRef, ad, resp) {
        this.elementRef = elementRef;
        this.ad = ad;
        this.resp = resp;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        /** @type {?} */
        const target = this.resp || this.ad;
        /** @type {?} */
        const innerText = this.elementRef.nativeElement.innerText;
        if (this.width && this.height) {
            target.addSize([this.width, this.height]);
        }
        else if (innerText.trim() !== '') {
            target.addSize(innerText);
        }
    }
}
DfpSizeDirective.decorators = [
    { type: Directive, args: [{
                selector: 'dfp-size'
            },] },
];
/** @nocollapse */
DfpSizeDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: DfpAdDirective, decorators: [{ type: Inject, args: [forwardRef(() => DfpAdDirective),] }] },
    { type: DfpResponsiveDirective, decorators: [{ type: Optional }, { type: Inject, args: [forwardRef(() => DfpResponsiveDirective),] }] }
];
DfpSizeDirective.propDecorators = {
    width: [{ type: Input }],
    height: [{ type: Input }]
};
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGZwLXNpemUuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWRmcC8iLCJzb3VyY2VzIjpbImRpcmVjdGl2ZS9kZnAtc2l6ZS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFVLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVuRyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDcEQsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFLcEUsTUFBTTs7Ozs7O0lBS0osWUFDVSxZQUVBLEVBQWtCLEVBRWxCLElBQTRCO1FBSjVCLGVBQVUsR0FBVixVQUFVO1FBRVYsT0FBRSxHQUFGLEVBQUUsQ0FBZ0I7UUFFbEIsU0FBSSxHQUFKLElBQUksQ0FBd0I7S0FDakM7Ozs7SUFFTCxRQUFROztRQUNOLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLEVBQUUsQ0FDMkI7O1FBRDlELE1BQ0UsU0FBUyxHQUFXLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQztRQUU5RCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQzlCLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1NBQzNDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ25DLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDM0I7S0FDRjs7O1lBekJGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsVUFBVTthQUNyQjs7OztZQVBtQixVQUFVO1lBRXJCLGNBQWMsdUJBYWxCLE1BQU0sU0FBQyxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsY0FBYyxDQUFDO1lBWm5DLHNCQUFzQix1QkFjMUIsUUFBUSxZQUFJLE1BQU0sU0FBQyxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsc0JBQXNCLENBQUM7OztvQkFQN0QsS0FBSztxQkFDTCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBJbnB1dCwgSW5qZWN0LCBmb3J3YXJkUmVmLCBPbkluaXQsIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBEZnBBZERpcmVjdGl2ZSB9IGZyb20gJy4vZGZwLWFkLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IERmcFJlc3BvbnNpdmVEaXJlY3RpdmUgfSBmcm9tICcuL2RmcC1yZXNwb25zaXZlLmRpcmVjdGl2ZSc7XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ2RmcC1zaXplJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgRGZwU2l6ZURpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcblxyXG4gIEBJbnB1dCgpIHdpZHRoOiBudW1iZXI7XHJcbiAgQElucHV0KCkgaGVpZ2h0OiBudW1iZXI7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxyXG4gICAgQEluamVjdChmb3J3YXJkUmVmKCgpID0+IERmcEFkRGlyZWN0aXZlKSlcclxuICAgIHByaXZhdGUgYWQ6IERmcEFkRGlyZWN0aXZlLFxyXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdChmb3J3YXJkUmVmKCgpID0+IERmcFJlc3BvbnNpdmVEaXJlY3RpdmUpKVxyXG4gICAgcHJpdmF0ZSByZXNwOiBEZnBSZXNwb25zaXZlRGlyZWN0aXZlXHJcbiAgKSB7IH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICBjb25zdCB0YXJnZXQgPSB0aGlzLnJlc3AgfHwgdGhpcy5hZCxcclxuICAgICAgaW5uZXJUZXh0OiBzdHJpbmcgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5pbm5lclRleHQ7XHJcblxyXG4gICAgaWYgKHRoaXMud2lkdGggJiYgdGhpcy5oZWlnaHQpIHtcclxuICAgICAgdGFyZ2V0LmFkZFNpemUoW3RoaXMud2lkdGgsIHRoaXMuaGVpZ2h0XSk7XHJcbiAgICB9IGVsc2UgaWYgKGlubmVyVGV4dC50cmltKCkgIT09ICcnKSB7XHJcbiAgICAgIHRhcmdldC5hZGRTaXplKGlubmVyVGV4dCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxufVxyXG4iXX0=