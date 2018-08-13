/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable, EventEmitter, Optional, Injector, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { timer, from } from 'rxjs';
import { DfpConfig } from '../class';
import { DFP_CONFIG } from './injection_token';
import { ParseDurationService } from './parse-duration.service';
var DFPRefreshError = /** @class */ (function (_super) {
    tslib_1.__extends(DFPRefreshError, _super);
    function DFPRefreshError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return DFPRefreshError;
}(Error));
var DfpRefreshService = /** @class */ (function () {
    function DfpRefreshService(config, inject, parseDuration) {
        this.config = config;
        this.inject = inject;
        this.parseDuration = parseDuration;
        this.refreshEvent = new EventEmitter();
        this.refreshSlots = [];
        this.intervals = {};
    }
    /**
     * @param {?} slot
     * @param {?=} refreshInterval
     * @param {?=} initRefresh
     * @return {?}
     */
    DfpRefreshService.prototype.slotRefresh = /**
     * @param {?} slot
     * @param {?=} refreshInterval
     * @param {?=} initRefresh
     * @return {?}
     */
    function (slot, refreshInterval, initRefresh) {
        var _this = this;
        if (initRefresh === void 0) { initRefresh = false; }
        /** @type {?} */
        var deferred = from([slot]).toPromise();
        /** @type {?} */
        var task = { slot: slot, deferred: deferred };
        deferred.then(function () {
            if (_this.hasSlotInterval(slot)) {
                _this.cancelInterval(slot);
            }
            if (refreshInterval) {
                _this.addSlotInterval(task, refreshInterval);
            }
        });
        if (this.config.singleRequestMode === true && initRefresh) {
            // Use a timer to handle refresh of a single request mode
            this.refreshSlots.push(slot);
            if (this.singleRequest && !this.singleRequest.closed) {
                this.singleRequest.unsubscribe();
            }
            this.singleRequest = timer(100).subscribe(function () {
                /** @type {?} */
                var pubads = googletag.pubads();
                pubads.enableSingleRequest();
                googletag.enableServices();
                _this.refreshSlots.forEach(function (s) {
                    googletag.display(s.getSlotElementId());
                });
                pubads.refresh(_this.refreshSlots);
                _this.refreshSlots = [];
            });
        }
        else {
            googletag.display(slot.getSlotElementId());
            this.refresh([task]);
        }
        return deferred;
    };
    /**
     * @param {?} slot
     * @return {?}
     */
    DfpRefreshService.prototype.cancelInterval = /**
     * @param {?} slot
     * @return {?}
     */
    function (slot) {
        if (!this.hasSlotInterval(slot)) {
            throw new DFPRefreshError('No interval for given slot');
        }
        /** @type {?} */
        var interval = this.intervals[this.slotIntervalKey(slot)];
        interval.unsubscribe();
        delete this.intervals[slot];
        return this;
    };
    /**
     * @param {?} slot
     * @return {?}
     */
    DfpRefreshService.prototype.hasSlotInterval = /**
     * @param {?} slot
     * @return {?}
     */
    function (slot) {
        return this.slotIntervalKey(slot) in this.intervals;
    };
    /**
     * @param {?=} tasks
     * @return {?}
     */
    DfpRefreshService.prototype.refresh = /**
     * @param {?=} tasks
     * @return {?}
     */
    function (tasks) {
        if (tasks === undefined) {
            googletag.cmd.push(function () {
                googletag.pubads().refresh();
            });
            return;
        }
        if (tasks.length === 0) {
            return false;
        }
        googletag.cmd.push(function () {
            googletag.pubads().refresh(tasks.map(function (task) { return task.slot; }));
            tasks.forEach(function (task) {
                Promise.resolve(task.slot);
            });
        });
    };
    /**
     * @param {?} task
     * @param {?} interval
     * @return {?}
     */
    DfpRefreshService.prototype.addSlotInterval = /**
     * @param {?} task
     * @param {?} interval
     * @return {?}
     */
    function (task, interval) {
        var _this = this;
        /** @type {?} */
        var parsedInterval = this.parseDuration.parseDuration(interval);
        this.validateInterval(parsedInterval, interval);
        /** @type {?} */
        var refresh = timer(parsedInterval, parsedInterval).subscribe(function () {
            /** @type {?} */
            var doc = _this.inject.get(DOCUMENT);
            if (!_this.hiddenCheck(doc.getElementById(task.slot.getSlotElementId()))) {
                _this.refresh([task]);
                _this.refreshEvent.emit(task.slot);
            }
        });
        this.intervals[this.slotIntervalKey(task.slot)] = refresh;
        return refresh;
    };
    /**
     * @param {?} slot
     * @return {?}
     */
    DfpRefreshService.prototype.slotIntervalKey = /**
     * @param {?} slot
     * @return {?}
     */
    function (slot) {
        return slot.getSlotId().getDomId();
    };
    /**
     * @param {?} milliseconds
     * @param {?} beforeParsing
     * @return {?}
     */
    DfpRefreshService.prototype.validateInterval = /**
     * @param {?} milliseconds
     * @param {?} beforeParsing
     * @return {?}
     */
    function (milliseconds, beforeParsing) {
        if (milliseconds < 1000) {
            console.warn('Careful: ${beforeParsing} is quite a low interval!');
        }
    };
    /**
     * @param {?} element
     * @return {?}
     */
    DfpRefreshService.prototype.hiddenCheck = /**
     * @param {?} element
     * @return {?}
     */
    function (element) {
        if (typeof (window) !== 'undefined') {
            /** @type {?} */
            var css = window.getComputedStyle(element);
            if (css.display === 'none') {
                return true;
            }
            else if (element.parentElement) {
                return this.hiddenCheck(element.parentElement);
            }
        }
        return false;
    };
    DfpRefreshService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    DfpRefreshService.ctorParameters = function () { return [
        { type: DfpConfig, decorators: [{ type: Optional }, { type: Inject, args: [DFP_CONFIG,] }] },
        { type: Injector },
        { type: ParseDurationService }
    ]; };
    return DfpRefreshService;
}());
export { DfpRefreshService };
if (false) {
    /** @type {?} */
    DfpRefreshService.prototype.refreshEvent;
    /** @type {?} */
    DfpRefreshService.prototype.refreshSlots;
    /** @type {?} */
    DfpRefreshService.prototype.singleRequest;
    /** @type {?} */
    DfpRefreshService.prototype.intervals;
    /** @type {?} */
    DfpRefreshService.prototype.config;
    /** @type {?} */
    DfpRefreshService.prototype.inject;
    /** @type {?} */
    DfpRefreshService.prototype.parseDuration;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGZwLXJlZnJlc2guc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1kZnAvIiwic291cmNlcyI6WyJzZXJ2aWNlL2RmcC1yZWZyZXNoLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNyRixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFM0MsT0FBTyxFQUFnQixLQUFLLEVBQUUsSUFBSSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRWpELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDckMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBRWhFLElBQUE7SUFBOEIsMkNBQUs7Ozs7MEJBVG5DO0VBUzhCLEtBQUssRUFBSSxDQUFBOztJQVlyQywyQkFFVSxNQUFpQixFQUNqQixRQUNBO1FBRkEsV0FBTSxHQUFOLE1BQU0sQ0FBVztRQUNqQixXQUFNLEdBQU4sTUFBTTtRQUNOLGtCQUFhLEdBQWIsYUFBYTs0QkFUVyxJQUFJLFlBQVksRUFBRTs0QkFDN0IsRUFBRTt5QkFFTCxFQUFFO0tBT2pCOzs7Ozs7O0lBRUwsdUNBQVc7Ozs7OztJQUFYLFVBQVksSUFBSSxFQUFFLGVBQWdCLEVBQUUsV0FBbUI7UUFBdkQsaUJBbUNDO1FBbkNtQyw0QkFBQSxFQUFBLG1CQUFtQjs7UUFDckQsSUFBTSxRQUFRLEdBQWlCLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQ1g7O1FBRDVDLElBQ0UsSUFBSSxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLENBQUM7UUFFNUMs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QyxJQUFJLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQztRQUUxRCxNQUFNLENBQUMsT0FBTyxDQUFDOzs7Ozs7SUFHVCwyQ0FBZTs7OztjQUFDLElBQUk7UUFDMUIsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQzs7Ozs7OztJQUc3Qiw0Q0FBZ0I7Ozs7O2NBQUMsWUFBWSxFQUFFLGFBQWE7UUFDbEQsRUFBRSxDQUFDLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDeEIsT0FBTyxDQUFDLElBQUksQ0FBQyxvREFBb0QsQ0FBQyxDQUFDO1NBQ3BFOzs7Ozs7SUFHSCx1Q0FBVzs7OztJQUFYLFVBQVksT0FBZ0I7UUFDMUIsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUM7O1lBQ3BDLElBQU0sR0FBRyxHQUFHLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUM3QyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsT0FBTyxLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQzNCLE1BQU0sQ0FBQyxJQUFJLENBQUM7YUFDYjtZQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztnQkFDakMsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO2FBQ2hEO1NBQ0Y7UUFDRCxNQUFNLENBQUMsS0FBSyxDQUFDO0tBQ2Q7O2dCQTNIRixVQUFVOzs7O2dCQVJGLFNBQVMsdUJBaUJiLFFBQVEsWUFBSSxNQUFNLFNBQUMsVUFBVTtnQkF0QlcsUUFBUTtnQkFPNUMsb0JBQW9COzs0QkFQN0I7O1NBY2EsaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgRXZlbnRFbWl0dGVyLCBPcHRpb25hbCwgSW5qZWN0b3IsIEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcblxyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24sIHRpbWVyLCBmcm9tIH0gZnJvbSAncnhqcyc7XHJcblxyXG5pbXBvcnQgeyBEZnBDb25maWcgfSBmcm9tICcuLi9jbGFzcyc7XHJcbmltcG9ydCB7IERGUF9DT05GSUcgfSBmcm9tICcuL2luamVjdGlvbl90b2tlbic7XHJcbmltcG9ydCB7IFBhcnNlRHVyYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi9wYXJzZS1kdXJhdGlvbi5zZXJ2aWNlJztcclxuXHJcbmNsYXNzIERGUFJlZnJlc2hFcnJvciBleHRlbmRzIEVycm9yIHsgfVxyXG5cclxuZGVjbGFyZSB2YXIgZ29vZ2xldGFnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgRGZwUmVmcmVzaFNlcnZpY2Uge1xyXG5cclxuICByZWZyZXNoRXZlbnQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIHByaXZhdGUgcmVmcmVzaFNsb3RzID0gW107XHJcbiAgcHJpdmF0ZSBzaW5nbGVSZXF1ZXN0OiBTdWJzY3JpcHRpb247XHJcbiAgcHJpdmF0ZSBpbnRlcnZhbHMgPSB7fTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KERGUF9DT05GSUcpXHJcbiAgICBwcml2YXRlIGNvbmZpZzogRGZwQ29uZmlnLFxyXG4gICAgcHJpdmF0ZSBpbmplY3Q6IEluamVjdG9yLFxyXG4gICAgcHJpdmF0ZSBwYXJzZUR1cmF0aW9uOiBQYXJzZUR1cmF0aW9uU2VydmljZVxyXG4gICkgeyB9XHJcblxyXG4gIHNsb3RSZWZyZXNoKHNsb3QsIHJlZnJlc2hJbnRlcnZhbD8sIGluaXRSZWZyZXNoID0gZmFsc2UpIHtcclxuICAgIGNvbnN0IGRlZmVycmVkOiBQcm9taXNlPGFueT4gPSBmcm9tKFtzbG90XSkudG9Qcm9taXNlKCksXHJcbiAgICAgIHRhc2sgPSB7IHNsb3Q6IHNsb3QsIGRlZmVycmVkOiBkZWZlcnJlZCB9O1xyXG5cclxuICAgIGRlZmVycmVkLnRoZW4oKCkgPT4ge1xyXG4gICAgICBpZiAodGhpcy5oYXNTbG90SW50ZXJ2YWwoc2xvdCkpIHtcclxuICAgICAgICB0aGlzLmNhbmNlbEludGVydmFsKHNsb3QpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChyZWZyZXNoSW50ZXJ2YWwpIHtcclxuICAgICAgICB0aGlzLmFkZFNsb3RJbnRlcnZhbCh0YXNrLCByZWZyZXNoSW50ZXJ2YWwpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAodGhpcy5jb25maWcuc2luZ2xlUmVxdWVzdE1vZGUgPT09IHRydWUgJiYgaW5pdFJlZnJlc2gpIHtcclxuICAgICAgLy8gVXNlIGEgdGltZXIgdG8gaGFuZGxlIHJlZnJlc2ggb2YgYSBzaW5nbGUgcmVxdWVzdCBtb2RlXHJcbiAgICAgIHRoaXMucmVmcmVzaFNsb3RzLnB1c2goc2xvdCk7XHJcbiAgICAgIGlmICh0aGlzLnNpbmdsZVJlcXVlc3QgJiYgIXRoaXMuc2luZ2xlUmVxdWVzdC5jbG9zZWQpIHtcclxuICAgICAgICB0aGlzLnNpbmdsZVJlcXVlc3QudW5zdWJzY3JpYmUoKTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLnNpbmdsZVJlcXVlc3QgPSB0aW1lcigxMDApLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgcHViYWRzID0gZ29vZ2xldGFnLnB1YmFkcygpO1xyXG4gICAgICAgIHB1YmFkcy5lbmFibGVTaW5nbGVSZXF1ZXN0KCk7XHJcbiAgICAgICAgZ29vZ2xldGFnLmVuYWJsZVNlcnZpY2VzKCk7XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoU2xvdHMuZm9yRWFjaChzID0+IHtcclxuICAgICAgICAgIGdvb2dsZXRhZy5kaXNwbGF5KHMuZ2V0U2xvdEVsZW1lbnRJZCgpKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBwdWJhZHMucmVmcmVzaCh0aGlzLnJlZnJlc2hTbG90cyk7XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoU2xvdHMgPSBbXTtcclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBnb29nbGV0YWcuZGlzcGxheShzbG90LmdldFNsb3RFbGVtZW50SWQoKSk7XHJcbiAgICAgIHRoaXMucmVmcmVzaChbdGFza10pO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBkZWZlcnJlZDtcclxuICB9XHJcblxyXG4gIGNhbmNlbEludGVydmFsKHNsb3QpIHtcclxuICAgIGlmICghdGhpcy5oYXNTbG90SW50ZXJ2YWwoc2xvdCkpIHtcclxuICAgICAgdGhyb3cgbmV3IERGUFJlZnJlc2hFcnJvcignTm8gaW50ZXJ2YWwgZm9yIGdpdmVuIHNsb3QnKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBpbnRlcnZhbDogU3Vic2NyaXB0aW9uID0gdGhpcy5pbnRlcnZhbHNbdGhpcy5zbG90SW50ZXJ2YWxLZXkoc2xvdCldO1xyXG4gICAgaW50ZXJ2YWwudW5zdWJzY3JpYmUoKTtcclxuICAgIGRlbGV0ZSB0aGlzLmludGVydmFsc1tzbG90XTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaGFzU2xvdEludGVydmFsKHNsb3QpIHtcclxuICAgIHJldHVybiB0aGlzLnNsb3RJbnRlcnZhbEtleShzbG90KSBpbiB0aGlzLmludGVydmFscztcclxuICB9XHJcblxyXG4gIHByaXZhdGUgcmVmcmVzaCh0YXNrcz8pIHtcclxuICAgIGlmICh0YXNrcyA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIGdvb2dsZXRhZy5jbWQucHVzaCgoKSA9PiB7XHJcbiAgICAgICAgZ29vZ2xldGFnLnB1YmFkcygpLnJlZnJlc2goKTtcclxuICAgICAgfSk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGFza3MubGVuZ3RoID09PSAwKSB7IHJldHVybiBmYWxzZTsgfVxyXG5cclxuICAgIGdvb2dsZXRhZy5jbWQucHVzaCgoKSA9PiB7XHJcbiAgICAgIGdvb2dsZXRhZy5wdWJhZHMoKS5yZWZyZXNoKHRhc2tzLm1hcCh0YXNrID0+IHRhc2suc2xvdCkpO1xyXG4gICAgICB0YXNrcy5mb3JFYWNoKHRhc2sgPT4ge1xyXG4gICAgICAgIFByb21pc2UucmVzb2x2ZSh0YXNrLnNsb3QpO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBhZGRTbG90SW50ZXJ2YWwodGFzaywgaW50ZXJ2YWwpIHtcclxuICAgIGNvbnN0IHBhcnNlZEludGVydmFsID0gdGhpcy5wYXJzZUR1cmF0aW9uLnBhcnNlRHVyYXRpb24oaW50ZXJ2YWwpO1xyXG4gICAgdGhpcy52YWxpZGF0ZUludGVydmFsKHBhcnNlZEludGVydmFsLCBpbnRlcnZhbCk7XHJcblxyXG4gICAgY29uc3QgcmVmcmVzaCA9IHRpbWVyKHBhcnNlZEludGVydmFsLCBwYXJzZWRJbnRlcnZhbCkuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgY29uc3QgZG9jID0gdGhpcy5pbmplY3QuZ2V0KERPQ1VNRU5UKTtcclxuICAgICAgaWYgKCF0aGlzLmhpZGRlbkNoZWNrKGRvYy5nZXRFbGVtZW50QnlJZCh0YXNrLnNsb3QuZ2V0U2xvdEVsZW1lbnRJZCgpKSkpIHtcclxuICAgICAgICB0aGlzLnJlZnJlc2goW3Rhc2tdKTtcclxuICAgICAgICB0aGlzLnJlZnJlc2hFdmVudC5lbWl0KHRhc2suc2xvdCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMuaW50ZXJ2YWxzW3RoaXMuc2xvdEludGVydmFsS2V5KHRhc2suc2xvdCldID0gcmVmcmVzaDtcclxuXHJcbiAgICByZXR1cm4gcmVmcmVzaDtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgc2xvdEludGVydmFsS2V5KHNsb3QpIHtcclxuICAgIHJldHVybiBzbG90LmdldFNsb3RJZCgpLmdldERvbUlkKCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHZhbGlkYXRlSW50ZXJ2YWwobWlsbGlzZWNvbmRzLCBiZWZvcmVQYXJzaW5nKSB7XHJcbiAgICBpZiAobWlsbGlzZWNvbmRzIDwgMTAwMCkge1xyXG4gICAgICBjb25zb2xlLndhcm4oJ0NhcmVmdWw6ICR7YmVmb3JlUGFyc2luZ30gaXMgcXVpdGUgYSBsb3cgaW50ZXJ2YWwhJyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBoaWRkZW5DaGVjayhlbGVtZW50OiBFbGVtZW50KSB7XHJcbiAgICBpZiAodHlwZW9mICh3aW5kb3cpICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICBjb25zdCBjc3MgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KTtcclxuICAgICAgaWYgKGNzcy5kaXNwbGF5ID09PSAnbm9uZScpIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgfSBlbHNlIGlmIChlbGVtZW50LnBhcmVudEVsZW1lbnQpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5oaWRkZW5DaGVjayhlbGVtZW50LnBhcmVudEVsZW1lbnQpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG59XHJcbiJdfQ==