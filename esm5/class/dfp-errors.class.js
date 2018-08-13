/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGZwLWVycm9ycy5jbGFzcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1kZnAvIiwic291cmNlcyI6WyJjbGFzcy9kZnAtZXJyb3JzLmNsYXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBRUEsSUFBQTtJQUF3Qyw4Q0FBSztJQUN6Qyw0QkFBWSxhQUFhLEVBQUUsV0FBVyxFQUFFLFdBQVk7ZUFDaEQsa0JBQU0sK0JBQTZCLGFBQWEsUUFBSzthQUNqRCxjQUFXLFdBQVcsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxpQkFBaUIsT0FBRyxDQUFBO2FBQzNELE1BQUksV0FBVyxPQUFJLENBQUEsQ0FBQztLQUMzQjs2QkFQTDtFQUV3QyxLQUFLLEVBTTVDLENBQUE7QUFORCw4QkFNQztBQUVELElBQUE7SUFBa0Msd0NBQUs7SUFDbkMsc0JBQVksYUFBYSxFQUFFLGFBQWEsRUFBRSxVQUFVLEVBQUUsWUFBWTtlQUM5RCxrQkFDSSwrQkFBNkIsYUFBYSxVQUFPO2FBQ2pELGdCQUFjLGFBQWEsb0JBQWUsWUFBYyxDQUFBO2FBQ3hELFdBQVMsT0FBTyxVQUFZLENBQUEsQ0FDL0I7S0FDSjt1QkFqQkw7RUFVa0MsS0FBSyxFQVF0QyxDQUFBO0FBUkQsd0JBUUM7QUFFRCxJQUFBO0lBQTJDLGlEQUFLO0lBQzVDLCtCQUFZLGFBQWE7UUFBRSxpQkFBVTthQUFWLFVBQVUsRUFBVixxQkFBVSxFQUFWLElBQVU7WUFBVixnQ0FBVTs7UUFBckMsaUJBb0JDO1FBbkJHLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDOUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDNUIsT0FBTyxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUN4Qjs7UUFFRCxJQUFJLGFBQWEsQ0FBQztRQUNsQixFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDckIsT0FBTyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxNQUFJLENBQUMsTUFBRyxFQUFSLENBQVEsQ0FBQyxDQUFDO1lBQ3JDLGFBQWEsR0FBRyxrQkFBa0IsQ0FBQztZQUNuQyxhQUFhLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDakQsYUFBYSxJQUFJLFNBQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFHLENBQUM7U0FDekQ7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLGFBQWEsR0FBRyxPQUFLLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBRyxDQUFDO1NBQ3RDO1FBRUQsUUFBQSxrQkFDSSxxQkFBbUIsYUFBYSxrQkFBZTthQUMvQyw2QkFBMkIsYUFBYSxNQUFHLENBQUEsQ0FDOUMsU0FBQzs7S0FDTDtnQ0F6Q0w7RUFvQjJDLEtBQUssRUFzQi9DLENBQUE7QUF0QkQsaUNBc0JDIiwic291cmNlc0NvbnRlbnQiOlsiXHJcblxyXG5leHBvcnQgY2xhc3MgREZQSW5jb21wbGV0ZUVycm9yIGV4dGVuZHMgRXJyb3Ige1xyXG4gICAgY29uc3RydWN0b3IoZGlyZWN0aXZlTmFtZSwgbWlzc2luZ05hbWUsIGlzQXR0cmlidXRlPykge1xyXG4gICAgICAgIHN1cGVyKGBJbmNvbXBsZXRlIGRlZmluaXRpb24gb2YgJyR7ZGlyZWN0aXZlTmFtZX0nOiBgICtcclxuICAgICAgICAgICAgYE1pc3NpbmcgJHtpc0F0dHJpYnV0ZSA/ICdhdHRyaWJ1dGUnIDogJ2NoaWxkIGRpcmVjdGl2ZSd9IGAgK1xyXG4gICAgICAgICAgICBgJyR7bWlzc2luZ05hbWV9Jy5gKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIERGUFR5cGVFcnJvciBleHRlbmRzIEVycm9yIHtcclxuICAgIGNvbnN0cnVjdG9yKGRpcmVjdGl2ZU5hbWUsIGF0dHJpYnV0ZU5hbWUsIHdyb25nVmFsdWUsIGV4cGVjdGVkVHlwZSkge1xyXG4gICAgICAgIHN1cGVyKFxyXG4gICAgICAgICAgICBgV3JvbmcgdHlwZSBmb3IgYXR0cmlidXRlICcke2F0dHJpYnV0ZU5hbWV9JyBvbiBgICtcclxuICAgICAgICAgICAgYGRpcmVjdGl2ZSAnJHtkaXJlY3RpdmVOYW1lfSc6IEV4cGVjdGVkICR7ZXhwZWN0ZWRUeXBlfWAgK1xyXG4gICAgICAgICAgICBgLCBnb3QgJHt0eXBlb2Ygd3JvbmdWYWx1ZX1gXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIERGUE1pc3NpbmdQYXJlbnRFcnJvciBleHRlbmRzIEVycm9yIHtcclxuICAgIGNvbnN0cnVjdG9yKGRpcmVjdGl2ZU5hbWUsIC4uLnBhcmVudHMpIHtcclxuICAgICAgICBjb25zb2xlLmFzc2VydChwYXJlbnRzICYmIHBhcmVudHMubGVuZ3RoID4gMCk7XHJcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkocGFyZW50c1swXSkpIHtcclxuICAgICAgICAgICAgcGFyZW50cyA9IHBhcmVudHNbMF07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgcGFyZW50TWVzc2FnZTtcclxuICAgICAgICBpZiAocGFyZW50cy5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgICAgIHBhcmVudHMgPSBwYXJlbnRzLm1hcChwID0+IGAnJHtwfSdgKTtcclxuICAgICAgICAgICAgcGFyZW50TWVzc2FnZSA9ICcsIHdoaWNoIG11c3QgYmUgJztcclxuICAgICAgICAgICAgcGFyZW50TWVzc2FnZSArPSBwYXJlbnRzLnNsaWNlKDAsIC0xKS5qb2luKCcsICcpO1xyXG4gICAgICAgICAgICBwYXJlbnRNZXNzYWdlICs9IGAgb3IgJHtwYXJlbnRzW3BhcmVudHMubGVuZ3RoIC0gMV19YDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBwYXJlbnRNZXNzYWdlID0gYCAnJHtwYXJlbnRzWzBdfSdgO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3VwZXIoXHJcbiAgICAgICAgICAgIGBJbnZhbGlkIHVzZSBvZiAnJHtkaXJlY3RpdmVOYW1lfScgZGlyZWN0aXZlLiBgICtcclxuICAgICAgICAgICAgYE1pc3NpbmcgcGFyZW50IGRpcmVjdGl2ZSR7cGFyZW50TWVzc2FnZX0uYFxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuIl19