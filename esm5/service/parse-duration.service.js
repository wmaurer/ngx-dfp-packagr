/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
var DFPDurationError = /** @class */ (function (_super) {
    tslib_1.__extends(DFPDurationError, _super);
    function DFPDurationError(interval) {
        return _super.call(this, "Invalid interval: '" + interval + "'ls") || this;
    }
    return DFPDurationError;
}(Error));
var ParseDurationService = /** @class */ (function () {
    function ParseDurationService() {
    }
    /**
     * @param {?} time
     * @param {?} unit
     * @return {?}
     */
    ParseDurationService.prototype.convertToMilliseconds = /**
     * @param {?} time
     * @param {?} unit
     * @return {?}
     */
    function (time, unit) {
        console.assert(/^(m?s|min|h)$/g.test(unit));
        if (unit === 'ms') {
            return time;
        }
        if (unit === 's') {
            return time * 1000;
        }
        if (unit === 'min') {
            return time * 60 * 1000;
        }
        return time * 60 * 60 * 1000;
    };
    /**
     * @param {?} match
     * @return {?}
     */
    ParseDurationService.prototype.convert = /**
     * @param {?} match
     * @return {?}
     */
    function (match) {
        /** @type {?} */
        var time = parseFloat(match[1]);
        if (match.length === 2) {
            return time;
        }
        return this.convertToMilliseconds(time, match[2]);
    };
    /**
     * @param {?} interval
     * @return {?}
     */
    ParseDurationService.prototype.parseDuration = /**
     * @param {?} interval
     * @return {?}
     */
    function (interval) {
        if (interval === undefined || interval === null) {
            throw new DFPDurationError(interval);
        }
        if (typeof interval === 'number') {
            return interval;
        }
        if (typeof interval !== 'string') {
            throw new TypeError("'" + interval + "' must be of number or string type");
        }
        /** @type {?} */
        var match = interval.match(/((?:\d+)?.?\d+)(m?s|min|h)?/);
        if (!match) {
            throw new DFPDurationError(interval);
        }
        return this.convert(match);
    };
    ParseDurationService.decorators = [
        { type: Injectable },
    ];
    return ParseDurationService;
}());
export { ParseDurationService };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2UtZHVyYXRpb24uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1kZnAvIiwic291cmNlcyI6WyJzZXJ2aWNlL3BhcnNlLWR1cmF0aW9uLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLElBQUE7SUFBK0IsNENBQUs7SUFDbEMsMEJBQVksUUFBUTtlQUNsQixrQkFBTSx3QkFBc0IsUUFBUSxRQUFLLENBQUM7S0FDM0M7MkJBTEg7RUFFK0IsS0FBSyxFQUluQyxDQUFBOzs7Ozs7Ozs7SUFLQyxvREFBcUI7Ozs7O0lBQXJCLFVBQXNCLElBQUksRUFBRSxJQUFJO1FBQzlCLE9BQU8sQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFFNUMsRUFBRSxDQUFDLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7WUFBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1NBQUU7UUFDbkMsRUFBRSxDQUFDLENBQUMsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFBQyxNQUFNLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztTQUFFO1FBQ3pDLEVBQUUsQ0FBQyxDQUFDLElBQUksS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQUMsTUFBTSxDQUFDLElBQUksR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDO1NBQUU7UUFFaEQsTUFBTSxDQUFDLElBQUksR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQztLQUM5Qjs7Ozs7SUFFRCxzQ0FBTzs7OztJQUFQLFVBQVEsS0FBSzs7UUFDWCxJQUFNLElBQUksR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFbEMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztTQUFFO1FBRXhDLE1BQU0sQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ25EOzs7OztJQUVELDRDQUFhOzs7O0lBQWIsVUFBYyxRQUFRO1FBRXBCLEVBQUUsQ0FBQyxDQUFDLFFBQVEsS0FBSyxTQUFTLElBQUksUUFBUSxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDaEQsTUFBTSxJQUFJLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ3RDO1FBRUQsRUFBRSxDQUFDLENBQUMsT0FBTyxRQUFRLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNqQyxNQUFNLENBQUMsUUFBUSxDQUFDO1NBQ2pCO1FBRUQsRUFBRSxDQUFDLENBQUMsT0FBTyxRQUFRLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNqQyxNQUFNLElBQUksU0FBUyxDQUFDLE1BQUksUUFBUSx1Q0FBb0MsQ0FBQyxDQUFDO1NBQ3ZFOztRQUVELElBQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsNkJBQTZCLENBQUMsQ0FBQztRQUU1RCxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDWCxNQUFNLElBQUksZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDdEM7UUFFRCxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUM1Qjs7Z0JBMUNGLFVBQVU7OytCQVJYOztTQVNhLG9CQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmNsYXNzIERGUER1cmF0aW9uRXJyb3IgZXh0ZW5kcyBFcnJvciB7XHJcbiAgY29uc3RydWN0b3IoaW50ZXJ2YWwpIHtcclxuICAgIHN1cGVyKGBJbnZhbGlkIGludGVydmFsOiAnJHtpbnRlcnZhbH0nbHNgKTtcclxuICB9XHJcbn1cclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIFBhcnNlRHVyYXRpb25TZXJ2aWNlIHtcclxuXHJcbiAgY29udmVydFRvTWlsbGlzZWNvbmRzKHRpbWUsIHVuaXQpIHtcclxuICAgIGNvbnNvbGUuYXNzZXJ0KC9eKG0/c3xtaW58aCkkL2cudGVzdCh1bml0KSk7XHJcblxyXG4gICAgaWYgKHVuaXQgPT09ICdtcycpIHsgcmV0dXJuIHRpbWU7IH1cclxuICAgIGlmICh1bml0ID09PSAncycpIHsgcmV0dXJuIHRpbWUgKiAxMDAwOyB9XHJcbiAgICBpZiAodW5pdCA9PT0gJ21pbicpIHsgcmV0dXJuIHRpbWUgKiA2MCAqIDEwMDA7IH1cclxuXHJcbiAgICByZXR1cm4gdGltZSAqIDYwICogNjAgKiAxMDAwO1xyXG4gIH1cclxuXHJcbiAgY29udmVydChtYXRjaCkge1xyXG4gICAgY29uc3QgdGltZSA9IHBhcnNlRmxvYXQobWF0Y2hbMV0pO1xyXG5cclxuICAgIGlmIChtYXRjaC5sZW5ndGggPT09IDIpIHsgcmV0dXJuIHRpbWU7IH1cclxuXHJcbiAgICByZXR1cm4gdGhpcy5jb252ZXJ0VG9NaWxsaXNlY29uZHModGltZSwgbWF0Y2hbMl0pO1xyXG4gIH1cclxuXHJcbiAgcGFyc2VEdXJhdGlvbihpbnRlcnZhbCkge1xyXG5cclxuICAgIGlmIChpbnRlcnZhbCA9PT0gdW5kZWZpbmVkIHx8IGludGVydmFsID09PSBudWxsKSB7XHJcbiAgICAgIHRocm93IG5ldyBERlBEdXJhdGlvbkVycm9yKGludGVydmFsKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodHlwZW9mIGludGVydmFsID09PSAnbnVtYmVyJykge1xyXG4gICAgICByZXR1cm4gaW50ZXJ2YWw7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHR5cGVvZiBpbnRlcnZhbCAhPT0gJ3N0cmluZycpIHtcclxuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgJyR7aW50ZXJ2YWx9JyBtdXN0IGJlIG9mIG51bWJlciBvciBzdHJpbmcgdHlwZWApO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG1hdGNoID0gaW50ZXJ2YWwubWF0Y2goLygoPzpcXGQrKT8uP1xcZCspKG0/c3xtaW58aCk/Lyk7XHJcblxyXG4gICAgaWYgKCFtYXRjaCkge1xyXG4gICAgICB0aHJvdyBuZXcgREZQRHVyYXRpb25FcnJvcihpbnRlcnZhbCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuY29udmVydChtYXRjaCk7XHJcbiAgfVxyXG5cclxufVxyXG4iXX0=