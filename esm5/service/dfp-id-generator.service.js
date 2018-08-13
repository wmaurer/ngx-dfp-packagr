/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
if (false) {
    /** @type {?} */
    DfpIDGeneratorService.prototype.generatedIDs;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGZwLWlkLWdlbmVyYXRvci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWRmcC8iLCJzb3VyY2VzIjpbInNlcnZpY2UvZGZwLWlkLWdlbmVyYXRvci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7NEJBS2xCLEVBQUU7Ozs7O0lBRXpCLDBDQUFVOzs7SUFBVjs7UUFDRSxJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUM7UUFFZCxHQUFHLENBQUM7O1lBQ0YsSUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNqRCxFQUFFLEdBQUcsU0FBUyxHQUFHLE1BQU0sQ0FBQztTQUN6QixRQUFRLEVBQUUsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO1FBRWxDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDO1FBRTdCLE1BQU0sQ0FBQyxFQUFFLENBQUM7S0FDWDs7Ozs7SUFFRCw4Q0FBYzs7OztJQUFkLFVBQWUsT0FBTztRQUNwQixFQUFFLENBQUMsQ0FBQyxPQUFPLElBQUksT0FBTyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2hFLE1BQU0sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDO1NBQ25COztRQUVELElBQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUM3QixFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7U0FBRTtRQUVqQyxNQUFNLENBQUMsRUFBRSxDQUFDO0tBQ1g7Ozs7O0lBRUQsdUNBQU87Ozs7SUFBUCxVQUFRLEVBQUU7UUFDUixNQUFNLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUM7S0FDaEM7Ozs7O0lBRUQsd0NBQVE7Ozs7SUFBUixVQUFTLEVBQUU7UUFDVCxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0tBQzFCOztnQkFuQ0YsVUFBVTs7Z0NBRlg7O1NBR2EscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgRGZwSURHZW5lcmF0b3JTZXJ2aWNlIHtcclxuXHJcbiAgcHJpdmF0ZSBnZW5lcmF0ZWRJRHMgPSB7fTtcclxuXHJcbiAgZ2VuZXJhdGVJRCgpIHtcclxuICAgIGxldCBpZCA9IG51bGw7XHJcblxyXG4gICAgZG8ge1xyXG4gICAgICBjb25zdCBudW1iZXIgPSBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKCkuc2xpY2UoMik7XHJcbiAgICAgIGlkID0gJ2dwdC1hZC0nICsgbnVtYmVyO1xyXG4gICAgfSB3aGlsZSAoaWQgaW4gdGhpcy5nZW5lcmF0ZWRJRHMpO1xyXG5cclxuICAgIHRoaXMuZ2VuZXJhdGVkSURzW2lkXSA9IHRydWU7XHJcblxyXG4gICAgcmV0dXJuIGlkO1xyXG4gIH1cclxuXHJcbiAgZGZwSURHZW5lcmF0b3IoZWxlbWVudCkge1xyXG4gICAgaWYgKGVsZW1lbnQgJiYgZWxlbWVudC5pZCAmJiAhKGVsZW1lbnQuaWQgaW4gdGhpcy5nZW5lcmF0ZWRJRHMpKSB7XHJcbiAgICAgIHJldHVybiBlbGVtZW50LmlkO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGlkID0gdGhpcy5nZW5lcmF0ZUlEKCk7XHJcbiAgICBpZiAoZWxlbWVudCkgeyBlbGVtZW50LmlkID0gaWQ7IH1cclxuXHJcbiAgICByZXR1cm4gaWQ7XHJcbiAgfVxyXG5cclxuICBpc1Rha2VuKGlkKSB7XHJcbiAgICByZXR1cm4gaWQgaW4gdGhpcy5nZW5lcmF0ZWRJRHM7XHJcbiAgfVxyXG5cclxuICBpc1VuaXF1ZShpZCkge1xyXG4gICAgcmV0dXJuICF0aGlzLmlzVGFrZW4oaWQpO1xyXG4gIH1cclxuXHJcbn1cclxuIl19