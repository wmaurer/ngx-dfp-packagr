/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
export class HttpErrorService {
    constructor() {
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
    httpError(response, message) {
        console.log(`Error (${response.status}) ${message ? message : ''}`);
    }
}
HttpErrorService.decorators = [
    { type: Injectable },
];
if (false) {
    /** @type {?} */
    HttpErrorService.prototype.isErrorCode;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC1lcnJvci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWRmcC8iLCJzb3VyY2VzIjpbInNlcnZpY2UvaHR0cC1lcnJvci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRzNDLE1BQU07OzJCQU1VLFVBQVUsSUFBSTtZQUMxQixFQUFFLENBQUMsQ0FBQyxPQUFPLElBQUksS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUM3QixNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxHQUFHLElBQUksSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDO2FBQ3JDO1lBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUM7U0FDeEI7Ozs7Ozs7SUFURCxTQUFTLENBQUMsUUFBUSxFQUFFLE9BQU87UUFDekIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLFFBQVEsQ0FBQyxNQUFNLEtBQUssT0FBTyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7S0FDckU7OztZQUxGLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBIdHRwRXJyb3JTZXJ2aWNlIHtcclxuXHJcbiAgaHR0cEVycm9yKHJlc3BvbnNlLCBtZXNzYWdlKSB7XHJcbiAgICBjb25zb2xlLmxvZyhgRXJyb3IgKCR7cmVzcG9uc2Uuc3RhdHVzfSkgJHttZXNzYWdlID8gbWVzc2FnZSA6ICcnfWApO1xyXG4gIH1cclxuXHJcbiAgaXNFcnJvckNvZGUgPSBmdW5jdGlvbiAoY29kZSkge1xyXG4gICAgaWYgKHR5cGVvZiBjb2RlID09PSAnbnVtYmVyJykge1xyXG4gICAgICByZXR1cm4gIShjb2RlID49IDIwMCAmJiBjb2RlIDwgMzAwKTtcclxuICAgIH1cclxuICAgIHJldHVybiBjb2RlWzBdICE9PSAnMic7XHJcbiAgfTtcclxuXHJcbn1cclxuIl19