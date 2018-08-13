/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Directive, Input, Inject, forwardRef } from '@angular/core';
import { DFPIncompleteError } from '../class';
import { DfpAdDirective } from './dfp-ad.directive';
var DfpTargetingDirective = /** @class */ (function () {
    function DfpTargetingDirective(ad) {
        this.ad = ad;
        this.values = [];
    }
    Object.defineProperty(DfpTargetingDirective.prototype, "value", {
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            var _this = this;
            if (val instanceof Array) {
                val.forEach(function (v) { return _this.addValue(v); });
            }
            else {
                this.addValue(val);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    DfpTargetingDirective.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var targeting = this.getState();
        this.ad.addTargeting(targeting);
    };
    /**
     * @return {?}
     */
    DfpTargetingDirective.prototype.checkValid = /**
     * @return {?}
     */
    function () {
        if (this.key === undefined) {
            throw new DFPIncompleteError('dfp-targeting', 'key', true);
        }
        if (this.values.length === 0) {
            throw new DFPIncompleteError('dfp-targeting', 'value', true);
        }
    };
    /**
     * @return {?}
     */
    DfpTargetingDirective.prototype.getState = /**
     * @return {?}
     */
    function () {
        this.checkValid();
        return Object.freeze({
            key: this.key,
            values: this.values
        });
    };
    /**
     * @param {?} value
     * @return {?}
     */
    DfpTargetingDirective.prototype.addValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (value && !this.values.find(function (item) { return item === value; })) {
            this.values.push(value);
        }
    };
    DfpTargetingDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'dfp-targeting'
                },] },
    ];
    /** @nocollapse */
    DfpTargetingDirective.ctorParameters = function () { return [
        { type: DfpAdDirective, decorators: [{ type: Inject, args: [forwardRef(function () { return DfpAdDirective; }),] }] }
    ]; };
    DfpTargetingDirective.propDecorators = {
        key: [{ type: Input }],
        value: [{ type: Input }]
    };
    return DfpTargetingDirective;
}());
export { DfpTargetingDirective };
if (false) {
    /** @type {?} */
    DfpTargetingDirective.prototype.key;
    /** @type {?} */
    DfpTargetingDirective.prototype.values;
    /** @type {?} */
    DfpTargetingDirective.prototype.ad;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGZwLXRhcmdldGluZy5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZGZwLyIsInNvdXJjZXMiOlsiZGlyZWN0aXZlL2RmcC10YXJnZXRpbmcuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFvQixLQUFLLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV2RixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDOUMsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG9CQUFvQixDQUFDOztJQW9CbEQsK0JBRVUsRUFBa0I7UUFBbEIsT0FBRSxHQUFGLEVBQUUsQ0FBZ0I7c0JBSlgsRUFBRTtLQUtkO0lBZEwsc0JBQ0ksd0NBQUs7Ozs7O1FBRFQsVUFDVSxHQUEyQjtZQURyQyxpQkFPQztZQUxDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsWUFBWSxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUN6QixHQUFHLENBQUMsT0FBTyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsS0FBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBaEIsQ0FBZ0IsQ0FBQyxDQUFDO2FBQ3BDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ04sSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUNwQjtTQUNGOzs7T0FBQTs7OztJQVNELGtEQUFrQjs7O0lBQWxCOztRQUNFLElBQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNsQyxJQUFJLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQztLQUNqQzs7OztJQUVELDBDQUFVOzs7SUFBVjtRQUNFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQztZQUMzQixNQUFNLElBQUksa0JBQWtCLENBQUMsZUFBZSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztTQUM1RDtRQUNELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDN0IsTUFBTSxJQUFJLGtCQUFrQixDQUFDLGVBQWUsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDOUQ7S0FDRjs7OztJQUVELHdDQUFROzs7SUFBUjtRQUNFLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNsQixNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQztZQUNuQixHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUc7WUFDYixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07U0FDcEIsQ0FBQyxDQUFDO0tBQ0o7Ozs7O0lBRUQsd0NBQVE7Ozs7SUFBUixVQUFTLEtBQUs7UUFDWixFQUFFLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFBLElBQUksSUFBSSxPQUFBLElBQUksS0FBSyxLQUFLLEVBQWQsQ0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3ZELElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3pCO0tBQ0Y7O2dCQWpERixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGVBQWU7aUJBQzFCOzs7O2dCQUpRLGNBQWMsdUJBcUJsQixNQUFNLFNBQUMsVUFBVSxDQUFDLGNBQU0sT0FBQSxjQUFjLEVBQWQsQ0FBYyxDQUFDOzs7c0JBZHpDLEtBQUs7d0JBRUwsS0FBSzs7Z0NBWlI7O1NBUWEscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBBZnRlckNvbnRlbnRJbml0LCBJbnB1dCwgSW5qZWN0LCBmb3J3YXJkUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBERlBJbmNvbXBsZXRlRXJyb3IgfSBmcm9tICcuLi9jbGFzcyc7XHJcbmltcG9ydCB7IERmcEFkRGlyZWN0aXZlIH0gZnJvbSAnLi9kZnAtYWQuZGlyZWN0aXZlJztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnZGZwLXRhcmdldGluZydcclxufSlcclxuZXhwb3J0IGNsYXNzIERmcFRhcmdldGluZ0RpcmVjdGl2ZSBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQge1xyXG5cclxuICBASW5wdXQoKSBrZXk6IHN0cmluZztcclxuXHJcbiAgQElucHV0KClcclxuICBzZXQgdmFsdWUodmFsOiBzdHJpbmcgfCBBcnJheTxzdHJpbmc+KSB7XHJcbiAgICBpZiAodmFsIGluc3RhbmNlb2YgQXJyYXkpIHtcclxuICAgICAgdmFsLmZvckVhY2godiA9PiB0aGlzLmFkZFZhbHVlKHYpKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuYWRkVmFsdWUodmFsKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgdmFsdWVzID0gW107XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgQEluamVjdChmb3J3YXJkUmVmKCgpID0+IERmcEFkRGlyZWN0aXZlKSlcclxuICAgIHByaXZhdGUgYWQ6IERmcEFkRGlyZWN0aXZlXHJcbiAgKSB7IH1cclxuXHJcbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xyXG4gICAgY29uc3QgdGFyZ2V0aW5nID0gdGhpcy5nZXRTdGF0ZSgpO1xyXG4gICAgdGhpcy5hZC5hZGRUYXJnZXRpbmcodGFyZ2V0aW5nKTtcclxuICB9XHJcblxyXG4gIGNoZWNrVmFsaWQoKSB7XHJcbiAgICBpZiAodGhpcy5rZXkgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aHJvdyBuZXcgREZQSW5jb21wbGV0ZUVycm9yKCdkZnAtdGFyZ2V0aW5nJywgJ2tleScsIHRydWUpO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMudmFsdWVzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICB0aHJvdyBuZXcgREZQSW5jb21wbGV0ZUVycm9yKCdkZnAtdGFyZ2V0aW5nJywgJ3ZhbHVlJywgdHJ1ZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZXRTdGF0ZSgpIHtcclxuICAgIHRoaXMuY2hlY2tWYWxpZCgpO1xyXG4gICAgcmV0dXJuIE9iamVjdC5mcmVlemUoe1xyXG4gICAgICBrZXk6IHRoaXMua2V5LFxyXG4gICAgICB2YWx1ZXM6IHRoaXMudmFsdWVzXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGFkZFZhbHVlKHZhbHVlKSB7XHJcbiAgICBpZiAodmFsdWUgJiYgIXRoaXMudmFsdWVzLmZpbmQoaXRlbSA9PiBpdGVtID09PSB2YWx1ZSkpIHtcclxuICAgICAgdGhpcy52YWx1ZXMucHVzaCh2YWx1ZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxufVxyXG4iXX0=