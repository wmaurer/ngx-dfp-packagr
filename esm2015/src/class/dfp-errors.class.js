/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGZwLWVycm9ycy5jbGFzcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1kZnAvIiwic291cmNlcyI6WyJzcmMvY2xhc3MvZGZwLWVycm9ycy5jbGFzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBRUEsTUFBTSx5QkFBMEIsU0FBUSxLQUFLOzs7Ozs7SUFDekMsWUFBWSxhQUFhLEVBQUUsV0FBVyxFQUFFLFdBQVk7UUFDaEQsS0FBSyxDQUFDLDZCQUE2QixhQUFhLEtBQUs7WUFDakQsV0FBVyxXQUFXLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsaUJBQWlCLEdBQUc7WUFDM0QsSUFBSSxXQUFXLElBQUksQ0FBQyxDQUFDO0tBQzVCO0NBQ0o7QUFFRCxNQUFNLG1CQUFvQixTQUFRLEtBQUs7Ozs7Ozs7SUFDbkMsWUFBWSxhQUFhLEVBQUUsYUFBYSxFQUFFLFVBQVUsRUFBRSxZQUFZO1FBQzlELEtBQUssQ0FDRCw2QkFBNkIsYUFBYSxPQUFPO1lBQ2pELGNBQWMsYUFBYSxlQUFlLFlBQVksRUFBRTtZQUN4RCxTQUFTLE9BQU8sVUFBVSxFQUFFLENBQy9CLENBQUM7S0FDTDtDQUNKO0FBRUQsTUFBTSw0QkFBNkIsU0FBUSxLQUFLOzs7OztJQUM1QyxZQUFZLGFBQWEsRUFBRSxHQUFHLE9BQU87UUFDakMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLElBQUksT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztRQUM5QyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM1QixPQUFPLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3hCOztRQUVELElBQUksYUFBYSxDQUFDO1FBQ2xCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNyQixPQUFPLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNyQyxhQUFhLEdBQUcsa0JBQWtCLENBQUM7WUFDbkMsYUFBYSxJQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2pELGFBQWEsSUFBSSxPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUM7U0FDekQ7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLGFBQWEsR0FBRyxLQUFLLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO1NBQ3RDO1FBRUQsS0FBSyxDQUNELG1CQUFtQixhQUFhLGVBQWU7WUFDL0MsMkJBQTJCLGFBQWEsR0FBRyxDQUM5QyxDQUFDO0tBQ0w7Q0FDSiIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5cclxuZXhwb3J0IGNsYXNzIERGUEluY29tcGxldGVFcnJvciBleHRlbmRzIEVycm9yIHtcclxuICAgIGNvbnN0cnVjdG9yKGRpcmVjdGl2ZU5hbWUsIG1pc3NpbmdOYW1lLCBpc0F0dHJpYnV0ZT8pIHtcclxuICAgICAgICBzdXBlcihgSW5jb21wbGV0ZSBkZWZpbml0aW9uIG9mICcke2RpcmVjdGl2ZU5hbWV9JzogYCArXHJcbiAgICAgICAgICAgIGBNaXNzaW5nICR7aXNBdHRyaWJ1dGUgPyAnYXR0cmlidXRlJyA6ICdjaGlsZCBkaXJlY3RpdmUnfSBgICtcclxuICAgICAgICAgICAgYCcke21pc3NpbmdOYW1lfScuYCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBERlBUeXBlRXJyb3IgZXh0ZW5kcyBFcnJvciB7XHJcbiAgICBjb25zdHJ1Y3RvcihkaXJlY3RpdmVOYW1lLCBhdHRyaWJ1dGVOYW1lLCB3cm9uZ1ZhbHVlLCBleHBlY3RlZFR5cGUpIHtcclxuICAgICAgICBzdXBlcihcclxuICAgICAgICAgICAgYFdyb25nIHR5cGUgZm9yIGF0dHJpYnV0ZSAnJHthdHRyaWJ1dGVOYW1lfScgb24gYCArXHJcbiAgICAgICAgICAgIGBkaXJlY3RpdmUgJyR7ZGlyZWN0aXZlTmFtZX0nOiBFeHBlY3RlZCAke2V4cGVjdGVkVHlwZX1gICtcclxuICAgICAgICAgICAgYCwgZ290ICR7dHlwZW9mIHdyb25nVmFsdWV9YFxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBERlBNaXNzaW5nUGFyZW50RXJyb3IgZXh0ZW5kcyBFcnJvciB7XHJcbiAgICBjb25zdHJ1Y3RvcihkaXJlY3RpdmVOYW1lLCAuLi5wYXJlbnRzKSB7XHJcbiAgICAgICAgY29uc29sZS5hc3NlcnQocGFyZW50cyAmJiBwYXJlbnRzLmxlbmd0aCA+IDApO1xyXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHBhcmVudHNbMF0pKSB7XHJcbiAgICAgICAgICAgIHBhcmVudHMgPSBwYXJlbnRzWzBdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHBhcmVudE1lc3NhZ2U7XHJcbiAgICAgICAgaWYgKHBhcmVudHMubGVuZ3RoID4gMSkge1xyXG4gICAgICAgICAgICBwYXJlbnRzID0gcGFyZW50cy5tYXAocCA9PiBgJyR7cH0nYCk7XHJcbiAgICAgICAgICAgIHBhcmVudE1lc3NhZ2UgPSAnLCB3aGljaCBtdXN0IGJlICc7XHJcbiAgICAgICAgICAgIHBhcmVudE1lc3NhZ2UgKz0gcGFyZW50cy5zbGljZSgwLCAtMSkuam9pbignLCAnKTtcclxuICAgICAgICAgICAgcGFyZW50TWVzc2FnZSArPSBgIG9yICR7cGFyZW50c1twYXJlbnRzLmxlbmd0aCAtIDFdfWA7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcGFyZW50TWVzc2FnZSA9IGAgJyR7cGFyZW50c1swXX0nYDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN1cGVyKFxyXG4gICAgICAgICAgICBgSW52YWxpZCB1c2Ugb2YgJyR7ZGlyZWN0aXZlTmFtZX0nIGRpcmVjdGl2ZS4gYCArXHJcbiAgICAgICAgICAgIGBNaXNzaW5nIHBhcmVudCBkaXJlY3RpdmUke3BhcmVudE1lc3NhZ2V9LmBcclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==