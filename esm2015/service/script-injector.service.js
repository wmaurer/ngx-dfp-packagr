/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { HttpErrorService } from './http-error.service';
export class ScriptInjectorService {
    /**
     * @param {?} httpError
     */
    constructor(httpError) {
        this.httpError = httpError;
    }
    /**
     * @param {?} url
     * @return {?}
     */
    completeURL(url) {
        /** @type {?} */
        const ssl = document.location.protocol === 'https:';
        return (ssl ? 'https:' : 'http:') + url;
    }
    /**
     * @param {?} url
     * @return {?}
     */
    createScript(url) {
        /** @type {?} */
        const script = document.createElement('script');
        script.async = true;
        script.type = 'text/javascript';
        script.src = this.completeURL(url);
        return script;
    }
    /**
     * @param {?} script
     * @param {?} url
     * @return {?}
     */
    promiseScript(script, url) {
        /** @type {?} */
        const promise = new Promise((resolve, reject) => {
            script.onload = () => {
                resolve(script);
            };
            script.onerror = () => {
                reject({
                    path: url,
                    loaded: false
                });
            };
        });
        promise.catch(response => {
            this.httpError.httpError({ status: 400 }, `loading script "${url}"`);
        });
        return promise;
    }
    /**
     * @param {?} script
     * @return {?}
     */
    injectScript(script) {
        /** @type {?} */
        const head = document.head || document.querySelector('head');
        head.appendChild(script);
    }
    /**
     * @param {?} url
     * @return {?}
     */
    scriptInjector(url) {
        /** @type {?} */
        const script = this.createScript(url);
        this.injectScript(script);
        return this.promiseScript(script, url);
    }
}
ScriptInjectorService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
ScriptInjectorService.ctorParameters = () => [
    { type: HttpErrorService }
];
if (false) {
    /** @type {?} */
    ScriptInjectorService.prototype.httpError;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NyaXB0LWluamVjdG9yLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZGZwLyIsInNvdXJjZXMiOlsic2VydmljZS9zY3JpcHQtaW5qZWN0b3Iuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUd4RCxNQUFNOzs7O0lBRUosWUFBb0IsU0FBMkI7UUFBM0IsY0FBUyxHQUFULFNBQVMsQ0FBa0I7S0FBSzs7Ozs7SUFFNUMsV0FBVyxDQUFDLEdBQUc7O1FBQ3JCLE1BQU0sR0FBRyxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxLQUFLLFFBQVEsQ0FBQztRQUNwRCxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsR0FBRyxDQUFDOzs7Ozs7SUFHbEMsWUFBWSxDQUFDLEdBQUc7O1FBQ3RCLE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFaEQsTUFBTSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDcEIsTUFBTSxDQUFDLElBQUksR0FBRyxpQkFBaUIsQ0FBQztRQUNoQyxNQUFNLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFbkMsTUFBTSxDQUFDLE1BQU0sQ0FBQzs7Ozs7OztJQUdSLGFBQWEsQ0FBQyxNQUFNLEVBQUUsR0FBRzs7UUFDL0IsTUFBTSxPQUFPLEdBQUcsSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDOUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxHQUFHLEVBQUU7Z0JBQ25CLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUNqQixDQUFDO1lBQ0YsTUFBTSxDQUFDLE9BQU8sR0FBRyxHQUFHLEVBQUU7Z0JBQ3BCLE1BQU0sQ0FBQztvQkFDTCxJQUFJLEVBQUUsR0FBRztvQkFDVCxNQUFNLEVBQUUsS0FBSztpQkFDZCxDQUFDLENBQUM7YUFDSixDQUFDO1NBQ0gsQ0FBQyxDQUFDO1FBRUgsT0FBTyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUN2QixJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsRUFBRSxtQkFBbUIsR0FBRyxHQUFHLENBQUMsQ0FBQztTQUN0RSxDQUFDLENBQUM7UUFFSCxNQUFNLENBQUMsT0FBTyxDQUFDOzs7Ozs7SUFHakIsWUFBWSxDQUFDLE1BQU07O1FBQ2pCLE1BQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxJQUFJLElBQUksUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM3RCxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQzFCOzs7OztJQUVELGNBQWMsQ0FBQyxHQUFHOztRQUNoQixNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3RDLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDMUIsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0tBQ3hDOzs7WUFqREYsVUFBVTs7OztZQUZGLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IEh0dHBFcnJvclNlcnZpY2UgfSBmcm9tICcuL2h0dHAtZXJyb3Iuc2VydmljZSc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBTY3JpcHRJbmplY3RvclNlcnZpY2Uge1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHBFcnJvcjogSHR0cEVycm9yU2VydmljZSkgeyB9XHJcblxyXG4gIHByaXZhdGUgY29tcGxldGVVUkwodXJsKSB7XHJcbiAgICBjb25zdCBzc2wgPSBkb2N1bWVudC5sb2NhdGlvbi5wcm90b2NvbCA9PT0gJ2h0dHBzOic7XHJcbiAgICByZXR1cm4gKHNzbCA/ICdodHRwczonIDogJ2h0dHA6JykgKyB1cmw7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNyZWF0ZVNjcmlwdCh1cmwpIHtcclxuICAgIGNvbnN0IHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xyXG5cclxuICAgIHNjcmlwdC5hc3luYyA9IHRydWU7XHJcbiAgICBzY3JpcHQudHlwZSA9ICd0ZXh0L2phdmFzY3JpcHQnO1xyXG4gICAgc2NyaXB0LnNyYyA9IHRoaXMuY29tcGxldGVVUkwodXJsKTtcclxuXHJcbiAgICByZXR1cm4gc2NyaXB0O1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBwcm9taXNlU2NyaXB0KHNjcmlwdCwgdXJsKSB7XHJcbiAgICBjb25zdCBwcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICBzY3JpcHQub25sb2FkID0gKCkgPT4ge1xyXG4gICAgICAgIHJlc29sdmUoc2NyaXB0KTtcclxuICAgICAgfTtcclxuICAgICAgc2NyaXB0Lm9uZXJyb3IgPSAoKSA9PiB7XHJcbiAgICAgICAgcmVqZWN0KHtcclxuICAgICAgICAgIHBhdGg6IHVybCxcclxuICAgICAgICAgIGxvYWRlZDogZmFsc2VcclxuICAgICAgICB9KTtcclxuICAgICAgfTtcclxuICAgIH0pO1xyXG5cclxuICAgIHByb21pc2UuY2F0Y2gocmVzcG9uc2UgPT4ge1xyXG4gICAgICB0aGlzLmh0dHBFcnJvci5odHRwRXJyb3IoeyBzdGF0dXM6IDQwMCB9LCBgbG9hZGluZyBzY3JpcHQgXCIke3VybH1cImApO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIHByb21pc2U7XHJcbiAgfVxyXG5cclxuICBpbmplY3RTY3JpcHQoc2NyaXB0KSB7XHJcbiAgICBjb25zdCBoZWFkID0gZG9jdW1lbnQuaGVhZCB8fCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdoZWFkJyk7XHJcbiAgICBoZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XHJcbiAgfVxyXG5cclxuICBzY3JpcHRJbmplY3Rvcih1cmwpIHtcclxuICAgIGNvbnN0IHNjcmlwdCA9IHRoaXMuY3JlYXRlU2NyaXB0KHVybCk7XHJcbiAgICB0aGlzLmluamVjdFNjcmlwdChzY3JpcHQpO1xyXG4gICAgcmV0dXJuIHRoaXMucHJvbWlzZVNjcmlwdChzY3JpcHQsIHVybCk7XHJcbiAgfVxyXG5cclxufVxyXG4iXX0=