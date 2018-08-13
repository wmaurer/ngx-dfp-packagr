/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { HttpErrorService } from './http-error.service';
var ScriptInjectorService = /** @class */ (function () {
    function ScriptInjectorService(httpError) {
        this.httpError = httpError;
    }
    /**
     * @param {?} url
     * @return {?}
     */
    ScriptInjectorService.prototype.completeURL = /**
     * @param {?} url
     * @return {?}
     */
    function (url) {
        /** @type {?} */
        var ssl = document.location.protocol === 'https:';
        return (ssl ? 'https:' : 'http:') + url;
    };
    /**
     * @param {?} url
     * @return {?}
     */
    ScriptInjectorService.prototype.createScript = /**
     * @param {?} url
     * @return {?}
     */
    function (url) {
        /** @type {?} */
        var script = document.createElement('script');
        script.async = true;
        script.type = 'text/javascript';
        script.src = this.completeURL(url);
        return script;
    };
    /**
     * @param {?} script
     * @param {?} url
     * @return {?}
     */
    ScriptInjectorService.prototype.promiseScript = /**
     * @param {?} script
     * @param {?} url
     * @return {?}
     */
    function (script, url) {
        var _this = this;
        /** @type {?} */
        var promise = new Promise(function (resolve, reject) {
            script.onload = function () {
                resolve(script);
            };
            script.onerror = function () {
                reject({
                    path: url,
                    loaded: false
                });
            };
        });
        promise.catch(function (response) {
            _this.httpError.httpError({ status: 400 }, "loading script \"" + url + "\"");
        });
        return promise;
    };
    /**
     * @param {?} script
     * @return {?}
     */
    ScriptInjectorService.prototype.injectScript = /**
     * @param {?} script
     * @return {?}
     */
    function (script) {
        /** @type {?} */
        var head = document.head || document.querySelector('head');
        head.appendChild(script);
    };
    /**
     * @param {?} url
     * @return {?}
     */
    ScriptInjectorService.prototype.scriptInjector = /**
     * @param {?} url
     * @return {?}
     */
    function (url) {
        /** @type {?} */
        var script = this.createScript(url);
        this.injectScript(script);
        return this.promiseScript(script, url);
    };
    ScriptInjectorService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    ScriptInjectorService.ctorParameters = function () { return [
        { type: HttpErrorService }
    ]; };
    return ScriptInjectorService;
}());
export { ScriptInjectorService };
if (false) {
    /** @type {?} */
    ScriptInjectorService.prototype.httpError;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NyaXB0LWluamVjdG9yLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZGZwLyIsInNvdXJjZXMiOlsic2VydmljZS9zY3JpcHQtaW5qZWN0b3Iuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQzs7SUFLdEQsK0JBQW9CLFNBQTJCO1FBQTNCLGNBQVMsR0FBVCxTQUFTLENBQWtCO0tBQUs7Ozs7O0lBRTVDLDJDQUFXOzs7O2NBQUMsR0FBRzs7UUFDckIsSUFBTSxHQUFHLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEtBQUssUUFBUSxDQUFDO1FBQ3BELE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxHQUFHLENBQUM7Ozs7OztJQUdsQyw0Q0FBWTs7OztjQUFDLEdBQUc7O1FBQ3RCLElBQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFaEQsTUFBTSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDcEIsTUFBTSxDQUFDLElBQUksR0FBRyxpQkFBaUIsQ0FBQztRQUNoQyxNQUFNLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFbkMsTUFBTSxDQUFDLE1BQU0sQ0FBQzs7Ozs7OztJQUdSLDZDQUFhOzs7OztjQUFDLE1BQU0sRUFBRSxHQUFHOzs7UUFDL0IsSUFBTSxPQUFPLEdBQUcsSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFPLEVBQUUsTUFBTTtZQUMxQyxNQUFNLENBQUMsTUFBTSxHQUFHO2dCQUNkLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUNqQixDQUFDO1lBQ0YsTUFBTSxDQUFDLE9BQU8sR0FBRztnQkFDZixNQUFNLENBQUM7b0JBQ0wsSUFBSSxFQUFFLEdBQUc7b0JBQ1QsTUFBTSxFQUFFLEtBQUs7aUJBQ2QsQ0FBQyxDQUFDO2FBQ0osQ0FBQztTQUNILENBQUMsQ0FBQztRQUVILE9BQU8sQ0FBQyxLQUFLLENBQUMsVUFBQSxRQUFRO1lBQ3BCLEtBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxFQUFFLHNCQUFtQixHQUFHLE9BQUcsQ0FBQyxDQUFDO1NBQ3RFLENBQUMsQ0FBQztRQUVILE1BQU0sQ0FBQyxPQUFPLENBQUM7Ozs7OztJQUdqQiw0Q0FBWTs7OztJQUFaLFVBQWEsTUFBTTs7UUFDakIsSUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLElBQUksSUFBSSxRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzdELElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDMUI7Ozs7O0lBRUQsOENBQWM7Ozs7SUFBZCxVQUFlLEdBQUc7O1FBQ2hCLElBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDdEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMxQixNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUM7S0FDeEM7O2dCQWpERixVQUFVOzs7O2dCQUZGLGdCQUFnQjs7Z0NBRnpCOztTQUthLHFCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IEh0dHBFcnJvclNlcnZpY2UgfSBmcm9tICcuL2h0dHAtZXJyb3Iuc2VydmljZSc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBTY3JpcHRJbmplY3RvclNlcnZpY2Uge1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHBFcnJvcjogSHR0cEVycm9yU2VydmljZSkgeyB9XHJcblxyXG4gIHByaXZhdGUgY29tcGxldGVVUkwodXJsKSB7XHJcbiAgICBjb25zdCBzc2wgPSBkb2N1bWVudC5sb2NhdGlvbi5wcm90b2NvbCA9PT0gJ2h0dHBzOic7XHJcbiAgICByZXR1cm4gKHNzbCA/ICdodHRwczonIDogJ2h0dHA6JykgKyB1cmw7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNyZWF0ZVNjcmlwdCh1cmwpIHtcclxuICAgIGNvbnN0IHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xyXG5cclxuICAgIHNjcmlwdC5hc3luYyA9IHRydWU7XHJcbiAgICBzY3JpcHQudHlwZSA9ICd0ZXh0L2phdmFzY3JpcHQnO1xyXG4gICAgc2NyaXB0LnNyYyA9IHRoaXMuY29tcGxldGVVUkwodXJsKTtcclxuXHJcbiAgICByZXR1cm4gc2NyaXB0O1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBwcm9taXNlU2NyaXB0KHNjcmlwdCwgdXJsKSB7XHJcbiAgICBjb25zdCBwcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICBzY3JpcHQub25sb2FkID0gKCkgPT4ge1xyXG4gICAgICAgIHJlc29sdmUoc2NyaXB0KTtcclxuICAgICAgfTtcclxuICAgICAgc2NyaXB0Lm9uZXJyb3IgPSAoKSA9PiB7XHJcbiAgICAgICAgcmVqZWN0KHtcclxuICAgICAgICAgIHBhdGg6IHVybCxcclxuICAgICAgICAgIGxvYWRlZDogZmFsc2VcclxuICAgICAgICB9KTtcclxuICAgICAgfTtcclxuICAgIH0pO1xyXG5cclxuICAgIHByb21pc2UuY2F0Y2gocmVzcG9uc2UgPT4ge1xyXG4gICAgICB0aGlzLmh0dHBFcnJvci5odHRwRXJyb3IoeyBzdGF0dXM6IDQwMCB9LCBgbG9hZGluZyBzY3JpcHQgXCIke3VybH1cImApO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIHByb21pc2U7XHJcbiAgfVxyXG5cclxuICBpbmplY3RTY3JpcHQoc2NyaXB0KSB7XHJcbiAgICBjb25zdCBoZWFkID0gZG9jdW1lbnQuaGVhZCB8fCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdoZWFkJyk7XHJcbiAgICBoZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XHJcbiAgfVxyXG5cclxuICBzY3JpcHRJbmplY3Rvcih1cmwpIHtcclxuICAgIGNvbnN0IHNjcmlwdCA9IHRoaXMuY3JlYXRlU2NyaXB0KHVybCk7XHJcbiAgICB0aGlzLmluamVjdFNjcmlwdChzY3JpcHQpO1xyXG4gICAgcmV0dXJuIHRoaXMucHJvbWlzZVNjcmlwdChzY3JpcHQsIHVybCk7XHJcbiAgfVxyXG5cclxufVxyXG4iXX0=