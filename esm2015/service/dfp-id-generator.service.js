/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
export class DfpIDGeneratorService {
    constructor() {
        this.generatedIDs = {};
    }
    /**
     * @return {?}
     */
    generateID() {
        /** @type {?} */
        let id = null;
        do {
            /** @type {?} */
            const number = Math.random().toString().slice(2);
            id = 'gpt-ad-' + number;
        } while (id in this.generatedIDs);
        this.generatedIDs[id] = true;
        return id;
    }
    /**
     * @param {?} element
     * @return {?}
     */
    dfpIDGenerator(element) {
        if (element && element.id && !(element.id in this.generatedIDs)) {
            return element.id;
        }
        /** @type {?} */
        const id = this.generateID();
        if (element) {
            element.id = id;
        }
        return id;
    }
    /**
     * @param {?} id
     * @return {?}
     */
    isTaken(id) {
        return id in this.generatedIDs;
    }
    /**
     * @param {?} id
     * @return {?}
     */
    isUnique(id) {
        return !this.isTaken(id);
    }
}
DfpIDGeneratorService.decorators = [
    { type: Injectable },
];
if (false) {
    /** @type {?} */
    DfpIDGeneratorService.prototype.generatedIDs;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGZwLWlkLWdlbmVyYXRvci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWRmcC8iLCJzb3VyY2VzIjpbInNlcnZpY2UvZGZwLWlkLWdlbmVyYXRvci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRzNDLE1BQU07OzRCQUVtQixFQUFFOzs7OztJQUV6QixVQUFVOztRQUNSLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQztRQUVkLEdBQUcsQ0FBQzs7WUFDRixNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2pELEVBQUUsR0FBRyxTQUFTLEdBQUcsTUFBTSxDQUFDO1NBQ3pCLFFBQVEsRUFBRSxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7UUFFbEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUM7UUFFN0IsTUFBTSxDQUFDLEVBQUUsQ0FBQztLQUNYOzs7OztJQUVELGNBQWMsQ0FBQyxPQUFPO1FBQ3BCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sSUFBSSxPQUFPLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDaEUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7U0FDbkI7O1FBRUQsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQzdCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFBQyxPQUFPLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztTQUFFO1FBRWpDLE1BQU0sQ0FBQyxFQUFFLENBQUM7S0FDWDs7Ozs7SUFFRCxPQUFPLENBQUMsRUFBRTtRQUNSLE1BQU0sQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQztLQUNoQzs7Ozs7SUFFRCxRQUFRLENBQUMsRUFBRTtRQUNULE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7S0FDMUI7OztZQW5DRixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgRGZwSURHZW5lcmF0b3JTZXJ2aWNlIHtcclxuXHJcbiAgcHJpdmF0ZSBnZW5lcmF0ZWRJRHMgPSB7fTtcclxuXHJcbiAgZ2VuZXJhdGVJRCgpIHtcclxuICAgIGxldCBpZCA9IG51bGw7XHJcblxyXG4gICAgZG8ge1xyXG4gICAgICBjb25zdCBudW1iZXIgPSBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKCkuc2xpY2UoMik7XHJcbiAgICAgIGlkID0gJ2dwdC1hZC0nICsgbnVtYmVyO1xyXG4gICAgfSB3aGlsZSAoaWQgaW4gdGhpcy5nZW5lcmF0ZWRJRHMpO1xyXG5cclxuICAgIHRoaXMuZ2VuZXJhdGVkSURzW2lkXSA9IHRydWU7XHJcblxyXG4gICAgcmV0dXJuIGlkO1xyXG4gIH1cclxuXHJcbiAgZGZwSURHZW5lcmF0b3IoZWxlbWVudCkge1xyXG4gICAgaWYgKGVsZW1lbnQgJiYgZWxlbWVudC5pZCAmJiAhKGVsZW1lbnQuaWQgaW4gdGhpcy5nZW5lcmF0ZWRJRHMpKSB7XHJcbiAgICAgIHJldHVybiBlbGVtZW50LmlkO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGlkID0gdGhpcy5nZW5lcmF0ZUlEKCk7XHJcbiAgICBpZiAoZWxlbWVudCkgeyBlbGVtZW50LmlkID0gaWQ7IH1cclxuXHJcbiAgICByZXR1cm4gaWQ7XHJcbiAgfVxyXG5cclxuICBpc1Rha2VuKGlkKSB7XHJcbiAgICByZXR1cm4gaWQgaW4gdGhpcy5nZW5lcmF0ZWRJRHM7XHJcbiAgfVxyXG5cclxuICBpc1VuaXF1ZShpZCkge1xyXG4gICAgcmV0dXJuICF0aGlzLmlzVGFrZW4oaWQpO1xyXG4gIH1cclxuXHJcbn1cclxuIl19