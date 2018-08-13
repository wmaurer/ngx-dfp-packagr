/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Directive, ElementRef, Inject, forwardRef } from '@angular/core';
import { DfpTargetingDirective } from './dfp-targeting.directive';
var DfpValueDirective = /** @class */ (function () {
    function DfpValueDirective(elementRef, targeting) {
        this.elementRef = elementRef;
        this.targeting = targeting;
    }
    /**
     * @return {?}
     */
    DfpValueDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.targeting.addValue(this.elementRef.nativeElement.innerText);
    };
    DfpValueDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'dfp-value'
                },] },
    ];
    /** @nocollapse */
    DfpValueDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: DfpTargetingDirective, decorators: [{ type: Inject, args: [forwardRef(function () { return DfpTargetingDirective; }),] }] }
    ]; };
    return DfpValueDirective;
}());
export { DfpValueDirective };
if (false) {
    /** @type {?} */
    DfpValueDirective.prototype.elementRef;
    /** @type {?} */
    DfpValueDirective.prototype.targeting;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGZwLXZhbHVlLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1kZnAvIiwic291cmNlcyI6WyJkaXJlY3RpdmUvZGZwLXZhbHVlLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFBRSxVQUFVLEVBQ3JCLE1BQU0sRUFBRSxVQUFVLEVBRW5CLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDJCQUEyQixDQUFDOztJQU9oRSwyQkFDVSxZQUVBLFNBQWdDO1FBRmhDLGVBQVUsR0FBVixVQUFVO1FBRVYsY0FBUyxHQUFULFNBQVMsQ0FBdUI7S0FDckM7Ozs7SUFFTCxvQ0FBUTs7O0lBQVI7UUFDRSxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQztLQUNsRTs7Z0JBYkYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxXQUFXO2lCQUN0Qjs7OztnQkFUWSxVQUFVO2dCQUtkLHFCQUFxQix1QkFTekIsTUFBTSxTQUFDLFVBQVUsQ0FBQyxjQUFNLE9BQUEscUJBQXFCLEVBQXJCLENBQXFCLENBQUM7OzRCQWZuRDs7U0FXYSxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIERpcmVjdGl2ZSwgRWxlbWVudFJlZixcclxuICBJbmplY3QsIGZvcndhcmRSZWYsXHJcbiAgT25Jbml0XHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBEZnBUYXJnZXRpbmdEaXJlY3RpdmUgfSBmcm9tICcuL2RmcC10YXJnZXRpbmcuZGlyZWN0aXZlJztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnZGZwLXZhbHVlJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgRGZwVmFsdWVEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQge1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZixcclxuICAgIEBJbmplY3QoZm9yd2FyZFJlZigoKSA9PiBEZnBUYXJnZXRpbmdEaXJlY3RpdmUpKVxyXG4gICAgcHJpdmF0ZSB0YXJnZXRpbmc6IERmcFRhcmdldGluZ0RpcmVjdGl2ZVxyXG4gICkgeyB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy50YXJnZXRpbmcuYWRkVmFsdWUodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuaW5uZXJUZXh0KTtcclxuICB9XHJcblxyXG59XHJcbiJdfQ==