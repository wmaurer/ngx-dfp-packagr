/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
export class DFPIncompleteError extends Error {
    /**
     * @param {?} directiveName
     * @param {?} missingName
     * @param {?=} isAttribute
     */
    constructor(directiveName, missingName, isAttribute) {
        super(`Incomplete definition of '${directiveName}': ` +
            `Missing ${isAttribute ? 'attribute' : 'child directive'} ` +
            `'${missingName}'.`);
    }
}
export class DFPTypeError extends Error {
    /**
     * @param {?} directiveName
     * @param {?} attributeName
     * @param {?} wrongValue
     * @param {?} expectedType
     */
    constructor(directiveName, attributeName, wrongValue, expectedType) {
        super(`Wrong type for attribute '${attributeName}' on ` +
            `directive '${directiveName}': Expected ${expectedType}` +
            `, got ${typeof wrongValue}`);
    }
}
export class DFPMissingParentError extends Error {
    /**
     * @param {?} directiveName
     * @param {...?} parents
     */
    constructor(directiveName, ...parents) {
        console.assert(parents && parents.length > 0);
        if (Array.isArray(parents[0])) {
            parents = parents[0];
        }
        /** @type {?} */
        let parentMessage;
        if (parents.length > 1) {
            parents = parents.map(p => `'${p}'`);
            parentMessage = ', which must be ';
            parentMessage += parents.slice(0, -1).join(', ');
            parentMessage += ` or ${parents[parents.length - 1]}`;
        }
        else {
            parentMessage = ` '${parents[0]}'`;
        }
        super(`Invalid use of '${directiveName}' directive. ` +
            `Missing parent directive${parentMessage}.`);
    }
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGZwLWVycm9ycy5jbGFzcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1kZnAvIiwic291cmNlcyI6WyJjbGFzcy9kZnAtZXJyb3JzLmNsYXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFFQSxNQUFNLHlCQUEwQixTQUFRLEtBQUs7Ozs7OztJQUN6QyxZQUFZLGFBQWEsRUFBRSxXQUFXLEVBQUUsV0FBWTtRQUNoRCxLQUFLLENBQUMsNkJBQTZCLGFBQWEsS0FBSztZQUNqRCxXQUFXLFdBQVcsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxpQkFBaUIsR0FBRztZQUMzRCxJQUFJLFdBQVcsSUFBSSxDQUFDLENBQUM7S0FDNUI7Q0FDSjtBQUVELE1BQU0sbUJBQW9CLFNBQVEsS0FBSzs7Ozs7OztJQUNuQyxZQUFZLGFBQWEsRUFBRSxhQUFhLEVBQUUsVUFBVSxFQUFFLFlBQVk7UUFDOUQsS0FBSyxDQUNELDZCQUE2QixhQUFhLE9BQU87WUFDakQsY0FBYyxhQUFhLGVBQWUsWUFBWSxFQUFFO1lBQ3hELFNBQVMsT0FBTyxVQUFVLEVBQUUsQ0FDL0IsQ0FBQztLQUNMO0NBQ0o7QUFFRCxNQUFNLDRCQUE2QixTQUFRLEtBQUs7Ozs7O0lBQzVDLFlBQVksYUFBYSxFQUFFLEdBQUcsT0FBTztRQUNqQyxPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sSUFBSSxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQzlDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzVCLE9BQU8sR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDeEI7O1FBRUQsSUFBSSxhQUFhLENBQUM7UUFDbEIsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3JCLE9BQU8sR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3JDLGFBQWEsR0FBRyxrQkFBa0IsQ0FBQztZQUNuQyxhQUFhLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDakQsYUFBYSxJQUFJLE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQztTQUN6RDtRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osYUFBYSxHQUFHLEtBQUssT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7U0FDdEM7UUFFRCxLQUFLLENBQ0QsbUJBQW1CLGFBQWEsZUFBZTtZQUMvQywyQkFBMkIsYUFBYSxHQUFHLENBQzlDLENBQUM7S0FDTDtDQUNKIiwic291cmNlc0NvbnRlbnQiOlsiXHJcblxyXG5leHBvcnQgY2xhc3MgREZQSW5jb21wbGV0ZUVycm9yIGV4dGVuZHMgRXJyb3Ige1xyXG4gICAgY29uc3RydWN0b3IoZGlyZWN0aXZlTmFtZSwgbWlzc2luZ05hbWUsIGlzQXR0cmlidXRlPykge1xyXG4gICAgICAgIHN1cGVyKGBJbmNvbXBsZXRlIGRlZmluaXRpb24gb2YgJyR7ZGlyZWN0aXZlTmFtZX0nOiBgICtcclxuICAgICAgICAgICAgYE1pc3NpbmcgJHtpc0F0dHJpYnV0ZSA/ICdhdHRyaWJ1dGUnIDogJ2NoaWxkIGRpcmVjdGl2ZSd9IGAgK1xyXG4gICAgICAgICAgICBgJyR7bWlzc2luZ05hbWV9Jy5gKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIERGUFR5cGVFcnJvciBleHRlbmRzIEVycm9yIHtcclxuICAgIGNvbnN0cnVjdG9yKGRpcmVjdGl2ZU5hbWUsIGF0dHJpYnV0ZU5hbWUsIHdyb25nVmFsdWUsIGV4cGVjdGVkVHlwZSkge1xyXG4gICAgICAgIHN1cGVyKFxyXG4gICAgICAgICAgICBgV3JvbmcgdHlwZSBmb3IgYXR0cmlidXRlICcke2F0dHJpYnV0ZU5hbWV9JyBvbiBgICtcclxuICAgICAgICAgICAgYGRpcmVjdGl2ZSAnJHtkaXJlY3RpdmVOYW1lfSc6IEV4cGVjdGVkICR7ZXhwZWN0ZWRUeXBlfWAgK1xyXG4gICAgICAgICAgICBgLCBnb3QgJHt0eXBlb2Ygd3JvbmdWYWx1ZX1gXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIERGUE1pc3NpbmdQYXJlbnRFcnJvciBleHRlbmRzIEVycm9yIHtcclxuICAgIGNvbnN0cnVjdG9yKGRpcmVjdGl2ZU5hbWUsIC4uLnBhcmVudHMpIHtcclxuICAgICAgICBjb25zb2xlLmFzc2VydChwYXJlbnRzICYmIHBhcmVudHMubGVuZ3RoID4gMCk7XHJcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkocGFyZW50c1swXSkpIHtcclxuICAgICAgICAgICAgcGFyZW50cyA9IHBhcmVudHNbMF07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgcGFyZW50TWVzc2FnZTtcclxuICAgICAgICBpZiAocGFyZW50cy5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgICAgIHBhcmVudHMgPSBwYXJlbnRzLm1hcChwID0+IGAnJHtwfSdgKTtcclxuICAgICAgICAgICAgcGFyZW50TWVzc2FnZSA9ICcsIHdoaWNoIG11c3QgYmUgJztcclxuICAgICAgICAgICAgcGFyZW50TWVzc2FnZSArPSBwYXJlbnRzLnNsaWNlKDAsIC0xKS5qb2luKCcsICcpO1xyXG4gICAgICAgICAgICBwYXJlbnRNZXNzYWdlICs9IGAgb3IgJHtwYXJlbnRzW3BhcmVudHMubGVuZ3RoIC0gMV19YDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBwYXJlbnRNZXNzYWdlID0gYCAnJHtwYXJlbnRzWzBdfSdgO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3VwZXIoXHJcbiAgICAgICAgICAgIGBJbnZhbGlkIHVzZSBvZiAnJHtkaXJlY3RpdmVOYW1lfScgZGlyZWN0aXZlLiBgICtcclxuICAgICAgICAgICAgYE1pc3NpbmcgcGFyZW50IGRpcmVjdGl2ZSR7cGFyZW50TWVzc2FnZX0uYFxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuIl19