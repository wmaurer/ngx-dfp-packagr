/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Directive, ElementRef, Inject, forwardRef } from '@angular/core';
import { DfpTargetingDirective } from './dfp-targeting.directive';
export class DfpValueDirective {
    /**
     * @param {?} elementRef
     * @param {?} targeting
     */
    constructor(elementRef, targeting) {
        this.elementRef = elementRef;
        this.targeting = targeting;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.targeting.addValue(this.elementRef.nativeElement.innerText);
    }
}
DfpValueDirective.decorators = [
    { type: Directive, args: [{
                selector: 'dfp-value'
            },] },
];
/** @nocollapse */
DfpValueDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: DfpTargetingDirective, decorators: [{ type: Inject, args: [forwardRef(() => DfpTargetingDirective),] }] }
];
if (false) {
    /** @type {?} */
    DfpValueDirective.prototype.elementRef;
    /** @type {?} */
    DfpValueDirective.prototype.targeting;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGZwLXZhbHVlLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1kZnAvIiwic291cmNlcyI6WyJkaXJlY3RpdmUvZGZwLXZhbHVlLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFBRSxVQUFVLEVBQ3JCLE1BQU0sRUFBRSxVQUFVLEVBRW5CLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBS2xFLE1BQU07Ozs7O0lBRUosWUFDVSxZQUVBLFNBQWdDO1FBRmhDLGVBQVUsR0FBVixVQUFVO1FBRVYsY0FBUyxHQUFULFNBQVMsQ0FBdUI7S0FDckM7Ozs7SUFFTCxRQUFRO1FBQ04sSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUM7S0FDbEU7OztZQWJGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsV0FBVzthQUN0Qjs7OztZQVRZLFVBQVU7WUFLZCxxQkFBcUIsdUJBU3pCLE1BQU0sU0FBQyxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMscUJBQXFCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIERpcmVjdGl2ZSwgRWxlbWVudFJlZixcclxuICBJbmplY3QsIGZvcndhcmRSZWYsXHJcbiAgT25Jbml0XHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBEZnBUYXJnZXRpbmdEaXJlY3RpdmUgfSBmcm9tICcuL2RmcC10YXJnZXRpbmcuZGlyZWN0aXZlJztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnZGZwLXZhbHVlJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgRGZwVmFsdWVEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQge1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZixcclxuICAgIEBJbmplY3QoZm9yd2FyZFJlZigoKSA9PiBEZnBUYXJnZXRpbmdEaXJlY3RpdmUpKVxyXG4gICAgcHJpdmF0ZSB0YXJnZXRpbmc6IERmcFRhcmdldGluZ0RpcmVjdGl2ZVxyXG4gICkgeyB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy50YXJnZXRpbmcuYWRkVmFsdWUodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuaW5uZXJUZXh0KTtcclxuICB9XHJcblxyXG59XHJcbiJdfQ==