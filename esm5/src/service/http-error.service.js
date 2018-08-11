/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
var HttpErrorService = /** @class */ (function () {
    function HttpErrorService() {
        this.isErrorCode = function (code) {
            if (typeof code === 'number') {
                return !(code >= 200 && code < 300);
            }
            return code[0] !== '2';
        };
    }
    /**
     * @param {?} response
     * @param {?} message
     * @return {?}
     */
    HttpErrorService.prototype.httpError = /**
     * @param {?} response
     * @param {?} message
     * @return {?}
     */
    function (response, message) {
        console.log("Error (" + response.status + ") " + (message ? message : ''));
    };
    HttpErrorService.decorators = [
        { type: Injectable },
    ];
    return HttpErrorService;
}());
export { HttpErrorService };
function HttpErrorService_tsickle_Closure_declarations() {
    /** @type {?} */
    HttpErrorService.prototype.isErrorCode;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC1lcnJvci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWRmcC8iLCJzb3VyY2VzIjpbInNyYy9zZXJ2aWNlL2h0dHAtZXJyb3Iuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7OzJCQVMzQixVQUFVLElBQUk7WUFDMUIsRUFBRSxDQUFDLENBQUMsT0FBTyxJQUFJLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDN0IsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksR0FBRyxJQUFJLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQzthQUNyQztZQUNELE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDO1NBQ3hCOzs7Ozs7O0lBVEQsb0NBQVM7Ozs7O0lBQVQsVUFBVSxRQUFRLEVBQUUsT0FBTztRQUN6QixPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVUsUUFBUSxDQUFDLE1BQU0sV0FBSyxPQUFPLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFFLENBQUMsQ0FBQztLQUNyRTs7Z0JBTEYsVUFBVTs7MkJBRlg7O1NBR2EsZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgSHR0cEVycm9yU2VydmljZSB7XHJcblxyXG4gIGh0dHBFcnJvcihyZXNwb25zZSwgbWVzc2FnZSkge1xyXG4gICAgY29uc29sZS5sb2coYEVycm9yICgke3Jlc3BvbnNlLnN0YXR1c30pICR7bWVzc2FnZSA/IG1lc3NhZ2UgOiAnJ31gKTtcclxuICB9XHJcblxyXG4gIGlzRXJyb3JDb2RlID0gZnVuY3Rpb24gKGNvZGUpIHtcclxuICAgIGlmICh0eXBlb2YgY29kZSA9PT0gJ251bWJlcicpIHtcclxuICAgICAgcmV0dXJuICEoY29kZSA+PSAyMDAgJiYgY29kZSA8IDMwMCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gY29kZVswXSAhPT0gJzInO1xyXG4gIH07XHJcblxyXG59XHJcbiJdfQ==