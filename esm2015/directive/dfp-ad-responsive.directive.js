/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Directive, ElementRef, Inject, forwardRef, HostListener } from '@angular/core';
import { DfpAdDirective } from './dfp-ad.directive';
import { DfpRefreshService } from '../service/dfp-refresh.service';
export class DfpAdResponsiveDirective {
    /**
     * @param {?} elementRef
     * @param {?} ad
     * @param {?} dfpRefresh
     */
    constructor(elementRef, ad, dfpRefresh) {
        this.elementRef = elementRef;
        this.ad = ad;
        this.dfpRefresh = dfpRefresh;
        this.ad.afterRefresh.subscribe(event => {
            this.slot = event.slot;
        });
    }
    /**
     * @return {?}
     */
    normalizeIframe() {
        if (this.ad.isHidden) {
            return false;
        }
        this.iframe = this.iframe || this.getIframe();
        if (!this.iframe) {
            return false;
        }
        this.iframeWidth = this.iframeWidth || +this.iframe.width;
        /** @type {?} */
        const winWidth = window.innerWidth;
        /** @type {?} */
        let state = this.ad.getState();
        /** @type {?} */
        let width = 0;
        state.sizes.forEach(size => {
            if (size[0] < winWidth) {
                width = Math.max(width, size[0]);
            }
        });
        if (state.sizes.length > 1 && width !== this.iframeWidth) {
            state = this.ad.getState();
            this.iframeWidth = width;
            this.iframe.setAttribute('width', width + '');
            this.dfpRefresh.slotRefresh(this.slot, state.refresh).then(slot => {
                this.ad.afterRefresh.emit({ type: 'resize', slot: slot });
                this.iframe = this.getIframe();
            });
        }
    }
    /**
     * @return {?}
     */
    getIframe() {
        /** @type {?} */
        const ad = this.elementRef.nativeElement;
        /** @type {?} */
        const iframe = ad.querySelector('iframe');
        if (iframe && +iframe.width > 0) {
            return iframe;
        }
    }
}
DfpAdResponsiveDirective.decorators = [
    { type: Directive, args: [{
                selector: 'dfp-ad[responsive]'
            },] },
];
/** @nocollapse */
DfpAdResponsiveDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: DfpAdDirective, decorators: [{ type: Inject, args: [forwardRef(() => DfpAdDirective),] }] },
    { type: DfpRefreshService }
];
DfpAdResponsiveDirective.propDecorators = {
    normalizeIframe: [{ type: HostListener, args: ['window:resize',] }]
};
if (false) {
    /** @type {?} */
    DfpAdResponsiveDirective.prototype.iframe;
    /** @type {?} */
    DfpAdResponsiveDirective.prototype.iframeWidth;
    /** @type {?} */
    DfpAdResponsiveDirective.prototype.slot;
    /** @type {?} */
    DfpAdResponsiveDirective.prototype.elementRef;
    /** @type {?} */
    DfpAdResponsiveDirective.prototype.ad;
    /** @type {?} */
    DfpAdResponsiveDirective.prototype.dfpRefresh;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGZwLWFkLXJlc3BvbnNpdmUuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWRmcC8iLCJzb3VyY2VzIjpbImRpcmVjdGl2ZS9kZnAtYWQtcmVzcG9uc2l2ZS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDSCxTQUFTLEVBQUUsVUFBVSxFQUNyQixNQUFNLEVBQUUsVUFBVSxFQUNsQixZQUFZLEVBQ2YsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBS25FLE1BQU07Ozs7OztJQU1GLFlBQ1ksWUFFQSxFQUFrQixFQUNsQjtRQUhBLGVBQVUsR0FBVixVQUFVO1FBRVYsT0FBRSxHQUFGLEVBQUUsQ0FBZ0I7UUFDbEIsZUFBVSxHQUFWLFVBQVU7UUFFbEIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ25DLElBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQztTQUMxQixDQUFDLENBQUM7S0FDTjs7OztJQUdELGVBQWU7UUFDWCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDbkIsTUFBTSxDQUFDLEtBQUssQ0FBQztTQUNoQjtRQUNELElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDOUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7U0FBRTtRQUVuQyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQzs7UUFFMUQsTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQzs7UUFFbkMsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FDaEI7O1FBRGQsSUFDSSxLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBRWQsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDdkIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQ3JCLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNwQztTQUNKLENBQUMsQ0FBQztRQUVILEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxLQUFLLEtBQUssSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDdkQsS0FBSyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDM0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7WUFDekIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLEtBQUssR0FBRyxFQUFFLENBQUMsQ0FBQztZQUM5QyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQzlELElBQUksQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7Z0JBQzFELElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO2FBQ2xDLENBQUMsQ0FBQztTQUNOO0tBQ0o7Ozs7SUFFRCxTQUFTOztRQUNMLE1BQU0sRUFBRSxHQUFZLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUNUOztRQUR4QyxNQUNJLE1BQU0sR0FBRyxFQUFFLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3hDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM5QixNQUFNLENBQUMsTUFBTSxDQUFDO1NBQ2pCO0tBQ0o7OztZQTFESixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLG9CQUFvQjthQUNqQzs7OztZQVZjLFVBQVU7WUFLaEIsY0FBYyx1QkFjZCxNQUFNLFNBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLGNBQWMsQ0FBQztZQWJ2QyxpQkFBaUI7Ozs4QkFzQnJCLFlBQVksU0FBQyxlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICAgIERpcmVjdGl2ZSwgRWxlbWVudFJlZixcclxuICAgIEluamVjdCwgZm9yd2FyZFJlZixcclxuICAgIEhvc3RMaXN0ZW5lclxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgRGZwQWREaXJlY3RpdmUgfSBmcm9tICcuL2RmcC1hZC5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBEZnBSZWZyZXNoU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2UvZGZwLXJlZnJlc2guc2VydmljZSc7XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICAgIHNlbGVjdG9yOiAnZGZwLWFkW3Jlc3BvbnNpdmVdJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgRGZwQWRSZXNwb25zaXZlRGlyZWN0aXZlIHtcclxuXHJcbiAgICBwcml2YXRlIGlmcmFtZTogSFRNTElGcmFtZUVsZW1lbnQ7XHJcbiAgICBwcml2YXRlIGlmcmFtZVdpZHRoOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIHNsb3Q6IGFueTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXHJcbiAgICAgICAgQEluamVjdChmb3J3YXJkUmVmKCgpID0+IERmcEFkRGlyZWN0aXZlKSlcclxuICAgICAgICBwcml2YXRlIGFkOiBEZnBBZERpcmVjdGl2ZSxcclxuICAgICAgICBwcml2YXRlIGRmcFJlZnJlc2g6IERmcFJlZnJlc2hTZXJ2aWNlXHJcbiAgICApIHtcclxuICAgICAgICB0aGlzLmFkLmFmdGVyUmVmcmVzaC5zdWJzY3JpYmUoZXZlbnQgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnNsb3QgPSBldmVudC5zbG90O1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIEBIb3N0TGlzdGVuZXIoJ3dpbmRvdzpyZXNpemUnKVxyXG4gICAgbm9ybWFsaXplSWZyYW1lKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmFkLmlzSGlkZGVuKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5pZnJhbWUgPSB0aGlzLmlmcmFtZSB8fCB0aGlzLmdldElmcmFtZSgpO1xyXG4gICAgICAgIGlmICghdGhpcy5pZnJhbWUpIHsgcmV0dXJuIGZhbHNlOyB9XHJcblxyXG4gICAgICAgIHRoaXMuaWZyYW1lV2lkdGggPSB0aGlzLmlmcmFtZVdpZHRoIHx8ICt0aGlzLmlmcmFtZS53aWR0aDtcclxuXHJcbiAgICAgICAgY29uc3Qgd2luV2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcclxuXHJcbiAgICAgICAgbGV0IHN0YXRlID0gdGhpcy5hZC5nZXRTdGF0ZSgpLFxyXG4gICAgICAgICAgICB3aWR0aCA9IDA7XHJcblxyXG4gICAgICAgIHN0YXRlLnNpemVzLmZvckVhY2goc2l6ZSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChzaXplWzBdIDwgd2luV2lkdGgpIHtcclxuICAgICAgICAgICAgICAgIHdpZHRoID0gTWF0aC5tYXgod2lkdGgsIHNpemVbMF0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGlmIChzdGF0ZS5zaXplcy5sZW5ndGggPiAxICYmIHdpZHRoICE9PSB0aGlzLmlmcmFtZVdpZHRoKSB7XHJcbiAgICAgICAgICAgIHN0YXRlID0gdGhpcy5hZC5nZXRTdGF0ZSgpO1xyXG4gICAgICAgICAgICB0aGlzLmlmcmFtZVdpZHRoID0gd2lkdGg7XHJcbiAgICAgICAgICAgIHRoaXMuaWZyYW1lLnNldEF0dHJpYnV0ZSgnd2lkdGgnLCB3aWR0aCArICcnKTtcclxuICAgICAgICAgICAgdGhpcy5kZnBSZWZyZXNoLnNsb3RSZWZyZXNoKHRoaXMuc2xvdCwgc3RhdGUucmVmcmVzaCkudGhlbihzbG90ID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWQuYWZ0ZXJSZWZyZXNoLmVtaXQoeyB0eXBlOiAncmVzaXplJywgc2xvdDogc2xvdCB9KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaWZyYW1lID0gdGhpcy5nZXRJZnJhbWUoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldElmcmFtZSgpIHtcclxuICAgICAgICBjb25zdCBhZDogRWxlbWVudCA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LFxyXG4gICAgICAgICAgICBpZnJhbWUgPSBhZC5xdWVyeVNlbGVjdG9yKCdpZnJhbWUnKTtcclxuICAgICAgICBpZiAoaWZyYW1lICYmICtpZnJhbWUud2lkdGggPiAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBpZnJhbWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==