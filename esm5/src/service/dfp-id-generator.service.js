/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
var DfpIDGeneratorService = /** @class */ (function () {
    function DfpIDGeneratorService() {
        this.generatedIDs = {};
    }
    /**
     * @return {?}
     */
    DfpIDGeneratorService.prototype.generateID = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var id = null;
        do {
            /** @type {?} */
            var number = Math.random().toString().slice(2);
            id = 'gpt-ad-' + number;
        } while (id in this.generatedIDs);
        this.generatedIDs[id] = true;
        return id;
    };
    /**
     * @param {?} element
     * @return {?}
     */
    DfpIDGeneratorService.prototype.dfpIDGenerator = /**
     * @param {?} element
     * @return {?}
     */
    function (element) {
        if (element && element.id && !(element.id in this.generatedIDs)) {
            return element.id;
        }
        /** @type {?} */
        var id = this.generateID();
        if (element) {
            element.id = id;
        }
        return id;
    };
    /**
     * @param {?} id
     * @return {?}
     */
    DfpIDGeneratorService.prototype.isTaken = /**
     * @param {?} id
     * @return {?}
     */
    function (id) {
        return id in this.generatedIDs;
    };
    /**
     * @param {?} id
     * @return {?}
     */
    DfpIDGeneratorService.prototype.isUnique = /**
     * @param {?} id
     * @return {?}
     */
    function (id) {
        return !this.isTaken(id);
    };
    DfpIDGeneratorService.decorators = [
        { type: Injectable },
    ];
    return DfpIDGeneratorService;
}());
export { DfpIDGeneratorService };
function DfpIDGeneratorService_tsickle_Closure_declarations() {
    /** @type {?} */
    DfpIDGeneratorService.prototype.generatedIDs;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGZwLWlkLWdlbmVyYXRvci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWRmcC8iLCJzb3VyY2VzIjpbInNyYy9zZXJ2aWNlL2RmcC1pZC1nZW5lcmF0b3Iuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7OzRCQUtsQixFQUFFOzs7OztJQUV6QiwwQ0FBVTs7O0lBQVY7O1FBQ0UsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDO1FBRWQsR0FBRyxDQUFDOztZQUNGLElBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDakQsRUFBRSxHQUFHLFNBQVMsR0FBRyxNQUFNLENBQUM7U0FDekIsUUFBUSxFQUFFLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRTtRQUVsQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQztRQUU3QixNQUFNLENBQUMsRUFBRSxDQUFDO0tBQ1g7Ozs7O0lBRUQsOENBQWM7Ozs7SUFBZCxVQUFlLE9BQU87UUFDcEIsRUFBRSxDQUFDLENBQUMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNoRSxNQUFNLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztTQUNuQjs7UUFFRCxJQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDN0IsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUFDLE9BQU8sQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO1NBQUU7UUFFakMsTUFBTSxDQUFDLEVBQUUsQ0FBQztLQUNYOzs7OztJQUVELHVDQUFPOzs7O0lBQVAsVUFBUSxFQUFFO1FBQ1IsTUFBTSxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDO0tBQ2hDOzs7OztJQUVELHdDQUFROzs7O0lBQVIsVUFBUyxFQUFFO1FBQ1QsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztLQUMxQjs7Z0JBbkNGLFVBQVU7O2dDQUZYOztTQUdhLHFCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIERmcElER2VuZXJhdG9yU2VydmljZSB7XHJcblxyXG4gIHByaXZhdGUgZ2VuZXJhdGVkSURzID0ge307XHJcblxyXG4gIGdlbmVyYXRlSUQoKSB7XHJcbiAgICBsZXQgaWQgPSBudWxsO1xyXG5cclxuICAgIGRvIHtcclxuICAgICAgY29uc3QgbnVtYmVyID0gTWF0aC5yYW5kb20oKS50b1N0cmluZygpLnNsaWNlKDIpO1xyXG4gICAgICBpZCA9ICdncHQtYWQtJyArIG51bWJlcjtcclxuICAgIH0gd2hpbGUgKGlkIGluIHRoaXMuZ2VuZXJhdGVkSURzKTtcclxuXHJcbiAgICB0aGlzLmdlbmVyYXRlZElEc1tpZF0gPSB0cnVlO1xyXG5cclxuICAgIHJldHVybiBpZDtcclxuICB9XHJcblxyXG4gIGRmcElER2VuZXJhdG9yKGVsZW1lbnQpIHtcclxuICAgIGlmIChlbGVtZW50ICYmIGVsZW1lbnQuaWQgJiYgIShlbGVtZW50LmlkIGluIHRoaXMuZ2VuZXJhdGVkSURzKSkge1xyXG4gICAgICByZXR1cm4gZWxlbWVudC5pZDtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBpZCA9IHRoaXMuZ2VuZXJhdGVJRCgpO1xyXG4gICAgaWYgKGVsZW1lbnQpIHsgZWxlbWVudC5pZCA9IGlkOyB9XHJcblxyXG4gICAgcmV0dXJuIGlkO1xyXG4gIH1cclxuXHJcbiAgaXNUYWtlbihpZCkge1xyXG4gICAgcmV0dXJuIGlkIGluIHRoaXMuZ2VuZXJhdGVkSURzO1xyXG4gIH1cclxuXHJcbiAgaXNVbmlxdWUoaWQpIHtcclxuICAgIHJldHVybiAhdGhpcy5pc1Rha2VuKGlkKTtcclxuICB9XHJcblxyXG59XHJcbiJdfQ==