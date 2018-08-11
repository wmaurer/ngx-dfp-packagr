/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
var DFPIncompleteError = /** @class */ (function (_super) {
    tslib_1.__extends(DFPIncompleteError, _super);
    function DFPIncompleteError(directiveName, missingName, isAttribute) {
        return _super.call(this, "Incomplete definition of '" + directiveName + "': " +
            ("Missing " + (isAttribute ? 'attribute' : 'child directive') + " ") +
            ("'" + missingName + "'.")) || this;
    }
    return DFPIncompleteError;
}(Error));
export { DFPIncompleteError };
var DFPTypeError = /** @class */ (function (_super) {
    tslib_1.__extends(DFPTypeError, _super);
    function DFPTypeError(directiveName, attributeName, wrongValue, expectedType) {
        return _super.call(this, "Wrong type for attribute '" + attributeName + "' on " +
            ("directive '" + directiveName + "': Expected " + expectedType) +
            (", got " + typeof wrongValue)) || this;
    }
    return DFPTypeError;
}(Error));
export { DFPTypeError };
var DFPMissingParentError = /** @class */ (function (_super) {
    tslib_1.__extends(DFPMissingParentError, _super);
    function DFPMissingParentError(directiveName) {
        var parents = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            parents[_i - 1] = arguments[_i];
        }
        var _this = this;
        console.assert(parents && parents.length > 0);
        if (Array.isArray(parents[0])) {
            parents = parents[0];
        }
        /** @type {?} */
        var parentMessage;
        if (parents.length > 1) {
            parents = parents.map(function (p) { return "'" + p + "'"; });
            parentMessage = ', which must be ';
            parentMessage += parents.slice(0, -1).join(', ');
            parentMessage += " or " + parents[parents.length - 1];
        }
        else {
            parentMessage = " '" + parents[0] + "'";
        }
        _this = _super.call(this, "Invalid use of '" + directiveName + "' directive. " +
            ("Missing parent directive" + parentMessage + ".")) || this;
        return _this;
    }
    return DFPMissingParentError;
}(Error));
export { DFPMissingParentError };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGZwLWVycm9ycy5jbGFzcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1kZnAvIiwic291cmNlcyI6WyJzcmMvY2xhc3MvZGZwLWVycm9ycy5jbGFzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUVBLElBQUE7SUFBd0MsOENBQUs7SUFDekMsNEJBQVksYUFBYSxFQUFFLFdBQVcsRUFBRSxXQUFZO2VBQ2hELGtCQUFNLCtCQUE2QixhQUFhLFFBQUs7YUFDakQsY0FBVyxXQUFXLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsaUJBQWlCLE9BQUcsQ0FBQTthQUMzRCxNQUFJLFdBQVcsT0FBSSxDQUFBLENBQUM7S0FDM0I7NkJBUEw7RUFFd0MsS0FBSyxFQU01QyxDQUFBO0FBTkQsOEJBTUM7QUFFRCxJQUFBO0lBQWtDLHdDQUFLO0lBQ25DLHNCQUFZLGFBQWEsRUFBRSxhQUFhLEVBQUUsVUFBVSxFQUFFLFlBQVk7ZUFDOUQsa0JBQ0ksK0JBQTZCLGFBQWEsVUFBTzthQUNqRCxnQkFBYyxhQUFhLG9CQUFlLFlBQWMsQ0FBQTthQUN4RCxXQUFTLE9BQU8sVUFBWSxDQUFBLENBQy9CO0tBQ0o7dUJBakJMO0VBVWtDLEtBQUssRUFRdEMsQ0FBQTtBQVJELHdCQVFDO0FBRUQsSUFBQTtJQUEyQyxpREFBSztJQUM1QywrQkFBWSxhQUFhO1FBQUUsaUJBQVU7YUFBVixVQUFVLEVBQVYscUJBQVUsRUFBVixJQUFVO1lBQVYsZ0NBQVU7O1FBQXJDLGlCQW9CQztRQW5CRyxPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sSUFBSSxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQzlDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzVCLE9BQU8sR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDeEI7O1FBRUQsSUFBSSxhQUFhLENBQUM7UUFDbEIsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3JCLE9BQU8sR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsTUFBSSxDQUFDLE1BQUcsRUFBUixDQUFRLENBQUMsQ0FBQztZQUNyQyxhQUFhLEdBQUcsa0JBQWtCLENBQUM7WUFDbkMsYUFBYSxJQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2pELGFBQWEsSUFBSSxTQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBRyxDQUFDO1NBQ3pEO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixhQUFhLEdBQUcsT0FBSyxPQUFPLENBQUMsQ0FBQyxDQUFDLE1BQUcsQ0FBQztTQUN0QztRQUVELFFBQUEsa0JBQ0kscUJBQW1CLGFBQWEsa0JBQWU7YUFDL0MsNkJBQTJCLGFBQWEsTUFBRyxDQUFBLENBQzlDLFNBQUM7O0tBQ0w7Z0NBekNMO0VBb0IyQyxLQUFLLEVBc0IvQyxDQUFBO0FBdEJELGlDQXNCQyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5cclxuZXhwb3J0IGNsYXNzIERGUEluY29tcGxldGVFcnJvciBleHRlbmRzIEVycm9yIHtcclxuICAgIGNvbnN0cnVjdG9yKGRpcmVjdGl2ZU5hbWUsIG1pc3NpbmdOYW1lLCBpc0F0dHJpYnV0ZT8pIHtcclxuICAgICAgICBzdXBlcihgSW5jb21wbGV0ZSBkZWZpbml0aW9uIG9mICcke2RpcmVjdGl2ZU5hbWV9JzogYCArXHJcbiAgICAgICAgICAgIGBNaXNzaW5nICR7aXNBdHRyaWJ1dGUgPyAnYXR0cmlidXRlJyA6ICdjaGlsZCBkaXJlY3RpdmUnfSBgICtcclxuICAgICAgICAgICAgYCcke21pc3NpbmdOYW1lfScuYCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBERlBUeXBlRXJyb3IgZXh0ZW5kcyBFcnJvciB7XHJcbiAgICBjb25zdHJ1Y3RvcihkaXJlY3RpdmVOYW1lLCBhdHRyaWJ1dGVOYW1lLCB3cm9uZ1ZhbHVlLCBleHBlY3RlZFR5cGUpIHtcclxuICAgICAgICBzdXBlcihcclxuICAgICAgICAgICAgYFdyb25nIHR5cGUgZm9yIGF0dHJpYnV0ZSAnJHthdHRyaWJ1dGVOYW1lfScgb24gYCArXHJcbiAgICAgICAgICAgIGBkaXJlY3RpdmUgJyR7ZGlyZWN0aXZlTmFtZX0nOiBFeHBlY3RlZCAke2V4cGVjdGVkVHlwZX1gICtcclxuICAgICAgICAgICAgYCwgZ290ICR7dHlwZW9mIHdyb25nVmFsdWV9YFxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBERlBNaXNzaW5nUGFyZW50RXJyb3IgZXh0ZW5kcyBFcnJvciB7XHJcbiAgICBjb25zdHJ1Y3RvcihkaXJlY3RpdmVOYW1lLCAuLi5wYXJlbnRzKSB7XHJcbiAgICAgICAgY29uc29sZS5hc3NlcnQocGFyZW50cyAmJiBwYXJlbnRzLmxlbmd0aCA+IDApO1xyXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHBhcmVudHNbMF0pKSB7XHJcbiAgICAgICAgICAgIHBhcmVudHMgPSBwYXJlbnRzWzBdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHBhcmVudE1lc3NhZ2U7XHJcbiAgICAgICAgaWYgKHBhcmVudHMubGVuZ3RoID4gMSkge1xyXG4gICAgICAgICAgICBwYXJlbnRzID0gcGFyZW50cy5tYXAocCA9PiBgJyR7cH0nYCk7XHJcbiAgICAgICAgICAgIHBhcmVudE1lc3NhZ2UgPSAnLCB3aGljaCBtdXN0IGJlICc7XHJcbiAgICAgICAgICAgIHBhcmVudE1lc3NhZ2UgKz0gcGFyZW50cy5zbGljZSgwLCAtMSkuam9pbignLCAnKTtcclxuICAgICAgICAgICAgcGFyZW50TWVzc2FnZSArPSBgIG9yICR7cGFyZW50c1twYXJlbnRzLmxlbmd0aCAtIDFdfWA7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcGFyZW50TWVzc2FnZSA9IGAgJyR7cGFyZW50c1swXX0nYDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN1cGVyKFxyXG4gICAgICAgICAgICBgSW52YWxpZCB1c2Ugb2YgJyR7ZGlyZWN0aXZlTmFtZX0nIGRpcmVjdGl2ZS4gYCArXHJcbiAgICAgICAgICAgIGBNaXNzaW5nIHBhcmVudCBkaXJlY3RpdmUke3BhcmVudE1lc3NhZ2V9LmBcclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==