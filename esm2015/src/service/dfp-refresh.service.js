/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable, EventEmitter, Optional, Injector, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { timer, from } from 'rxjs';
import { DfpConfig, DFP_CONFIG } from '../class';
import { ParseDurationService } from './parse-duration.service';
class DFPRefreshError extends Error {
}
export class DfpRefreshService {
    /**
     * @param {?} config
     * @param {?} inject
     * @param {?} parseDuration
     */
    constructor(config, inject, parseDuration) {
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
    slotRefresh(slot, refreshInterval, initRefresh = false) {
        /** @type {?} */
        const deferred = from([slot]).toPromise();
        /** @type {?} */
        const task = { slot: slot, deferred: deferred };
        deferred.then(() => {
            if (this.hasSlotInterval(slot)) {
                this.cancelInterval(slot);
            }
            if (refreshInterval) {
                this.addSlotInterval(task, refreshInterval);
            }
        });
        if (this.config.singleRequestMode === true && initRefresh) {
            // Use a timer to handle refresh of a single request mode
            this.refreshSlots.push(slot);
            if (this.singleRequest && !this.singleRequest.closed) {
                this.singleRequest.unsubscribe();
            }
            this.singleRequest = timer(100).subscribe(() => {
                /** @type {?} */
                const pubads = googletag.pubads();
                pubads.enableSingleRequest();
                googletag.enableServices();
                this.refreshSlots.forEach(s => {
                    googletag.display(s.getSlotElementId());
                });
                pubads.refresh(this.refreshSlots);
                this.refreshSlots = [];
            });
        }
        else {
            googletag.display(slot.getSlotElementId());
            this.refresh([task]);
        }
        return deferred;
    }
    /**
     * @param {?} slot
     * @return {?}
     */
    cancelInterval(slot) {
        if (!this.hasSlotInterval(slot)) {
            throw new DFPRefreshError('No interval for given slot');
        }
        /** @type {?} */
        const interval = this.intervals[this.slotIntervalKey(slot)];
        interval.unsubscribe();
        delete this.intervals[slot];
        return this;
    }
    /**
     * @param {?} slot
     * @return {?}
     */
    hasSlotInterval(slot) {
        return this.slotIntervalKey(slot) in this.intervals;
    }
    /**
     * @param {?=} tasks
     * @return {?}
     */
    refresh(tasks) {
        if (tasks === undefined) {
            googletag.cmd.push(() => {
                googletag.pubads().refresh();
            });
            return;
        }
        if (tasks.length === 0) {
            return false;
        }
        googletag.cmd.push(() => {
            googletag.pubads().refresh(tasks.map(task => task.slot));
            tasks.forEach(task => {
                Promise.resolve(task.slot);
            });
        });
    }
    /**
     * @param {?} task
     * @param {?} interval
     * @return {?}
     */
    addSlotInterval(task, interval) {
        /** @type {?} */
        const parsedInterval = this.parseDuration.parseDuration(interval);
        this.validateInterval(parsedInterval, interval);
        /** @type {?} */
        const refresh = timer(parsedInterval, parsedInterval).subscribe(() => {
            /** @type {?} */
            const doc = this.inject.get(DOCUMENT);
            if (!this.hiddenCheck(doc.getElementById(task.slot.getSlotElementId()))) {
                this.refresh([task]);
                this.refreshEvent.emit(task.slot);
            }
        });
        this.intervals[this.slotIntervalKey(task.slot)] = refresh;
        return refresh;
    }
    /**
     * @param {?} slot
     * @return {?}
     */
    slotIntervalKey(slot) {
        return slot.getSlotId().getDomId();
    }
    /**
     * @param {?} milliseconds
     * @param {?} beforeParsing
     * @return {?}
     */
    validateInterval(milliseconds, beforeParsing) {
        if (milliseconds < 1000) {
            console.warn('Careful: ${beforeParsing} is quite a low interval!');
        }
    }
    /**
     * @param {?} element
     * @return {?}
     */
    hiddenCheck(element) {
        if (typeof (window) !== 'undefined') {
            /** @type {?} */
            const css = window.getComputedStyle(element);
            if (css.display === 'none') {
                return true;
            }
            else if (element.parentElement) {
                return this.hiddenCheck(element.parentElement);
            }
        }
        return false;
    }
}
DfpRefreshService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
DfpRefreshService.ctorParameters = () => [
    { type: DfpConfig, decorators: [{ type: Optional }, { type: Inject, args: [DFP_CONFIG,] }] },
    { type: Injector },
    { type: ParseDurationService }
];
function DfpRefreshService_tsickle_Closure_declarations() {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGZwLXJlZnJlc2guc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1kZnAvIiwic291cmNlcyI6WyJzcmMvc2VydmljZS9kZnAtcmVmcmVzaC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNyRixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFM0MsT0FBTyxFQUFnQixLQUFLLEVBQUUsSUFBSSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRWpELE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQ2pELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBRWhFLHFCQUFzQixTQUFRLEtBQUs7Q0FBSTtBQUt2QyxNQUFNOzs7Ozs7SUFPSixZQUVVLE1BQWlCLEVBQ2pCLFFBQ0E7UUFGQSxXQUFNLEdBQU4sTUFBTSxDQUFXO1FBQ2pCLFdBQU0sR0FBTixNQUFNO1FBQ04sa0JBQWEsR0FBYixhQUFhOzRCQVRXLElBQUksWUFBWSxFQUFFOzRCQUM3QixFQUFFO3lCQUVMLEVBQUU7S0FPakI7Ozs7Ozs7SUFFTCxXQUFXLENBQUMsSUFBSSxFQUFFLGVBQWdCLEVBQUUsV0FBVyxHQUFHLEtBQUs7O1FBQ3JELE1BQU0sUUFBUSxHQUFpQixJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUNYOztRQUQ1QyxNQUNFLElBQUksR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxDQUFDO1FBRTVDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFO1lBQ2pCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENB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QUM7Ozs7OztJQUdULGVBQWUsQ0FBQyxJQUFJO1FBQzFCLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUM7Ozs7Ozs7SUFHN0IsZ0JBQWdCLENBQUMsWUFBWSxFQUFFLGFBQWE7UUFDbEQsRUFBRSxDQUFDLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDeEIsT0FBTyxDQUFDLElBQUksQ0FBQyxvREFBb0QsQ0FBQyxDQUFDO1NBQ3BFOzs7Ozs7SUFHSCxXQUFXLENBQUMsT0FBZ0I7UUFDMUIsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUM7O1lBQ3BDLE1BQU0sR0FBRyxHQUFHLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUM3QyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsT0FBTyxLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQzNCLE1BQU0sQ0FBQyxJQUFJLENBQUM7YUFDYjtZQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztnQkFDakMsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO2FBQ2hEO1NBQ0Y7UUFDRCxNQUFNLENBQUMsS0FBSyxDQUFDO0tBQ2Q7OztZQTNIRixVQUFVOzs7O1lBUEYsU0FBUyx1QkFnQmIsUUFBUSxZQUFJLE1BQU0sU0FBQyxVQUFVO1lBckJXLFFBQVE7WUFNNUMsb0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgRXZlbnRFbWl0dGVyLCBPcHRpb25hbCwgSW5qZWN0b3IsIEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcblxyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24sIHRpbWVyLCBmcm9tIH0gZnJvbSAncnhqcyc7XHJcblxyXG5pbXBvcnQgeyBEZnBDb25maWcsIERGUF9DT05GSUcgfSBmcm9tICcuLi9jbGFzcyc7XHJcbmltcG9ydCB7IFBhcnNlRHVyYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi9wYXJzZS1kdXJhdGlvbi5zZXJ2aWNlJztcclxuXHJcbmNsYXNzIERGUFJlZnJlc2hFcnJvciBleHRlbmRzIEVycm9yIHsgfVxyXG5cclxuZGVjbGFyZSB2YXIgZ29vZ2xldGFnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgRGZwUmVmcmVzaFNlcnZpY2Uge1xyXG5cclxuICByZWZyZXNoRXZlbnQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIHByaXZhdGUgcmVmcmVzaFNsb3RzID0gW107XHJcbiAgcHJpdmF0ZSBzaW5nbGVSZXF1ZXN0OiBTdWJzY3JpcHRpb247XHJcbiAgcHJpdmF0ZSBpbnRlcnZhbHMgPSB7fTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KERGUF9DT05GSUcpXHJcbiAgICBwcml2YXRlIGNvbmZpZzogRGZwQ29uZmlnLFxyXG4gICAgcHJpdmF0ZSBpbmplY3Q6IEluamVjdG9yLFxyXG4gICAgcHJpdmF0ZSBwYXJzZUR1cmF0aW9uOiBQYXJzZUR1cmF0aW9uU2VydmljZVxyXG4gICkgeyB9XHJcblxyXG4gIHNsb3RSZWZyZXNoKHNsb3QsIHJlZnJlc2hJbnRlcnZhbD8sIGluaXRSZWZyZXNoID0gZmFsc2UpIHtcclxuICAgIGNvbnN0IGRlZmVycmVkOiBQcm9taXNlPGFueT4gPSBmcm9tKFtzbG90XSkudG9Qcm9taXNlKCksXHJcbiAgICAgIHRhc2sgPSB7IHNsb3Q6IHNsb3QsIGRlZmVycmVkOiBkZWZlcnJlZCB9O1xyXG5cclxuICAgIGRlZmVycmVkLnRoZW4oKCkgPT4ge1xyXG4gICAgICBpZiAodGhpcy5oYXNTbG90SW50ZXJ2YWwoc2xvdCkpIHtcclxuICAgICAgICB0aGlzLmNhbmNlbEludGVydmFsKHNsb3QpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChyZWZyZXNoSW50ZXJ2YWwpIHtcclxuICAgICAgICB0aGlzLmFkZFNsb3RJbnRlcnZhbCh0YXNrLCByZWZyZXNoSW50ZXJ2YWwpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAodGhpcy5jb25maWcuc2luZ2xlUmVxdWVzdE1vZGUgPT09IHRydWUgJiYgaW5pdFJlZnJlc2gpIHtcclxuICAgICAgLy8gVXNlIGEgdGltZXIgdG8gaGFuZGxlIHJlZnJlc2ggb2YgYSBzaW5nbGUgcmVxdWVzdCBtb2RlXHJcbiAgICAgIHRoaXMucmVmcmVzaFNsb3RzLnB1c2goc2xvdCk7XHJcbiAgICAgIGlmICh0aGlzLnNpbmdsZVJlcXVlc3QgJiYgIXRoaXMuc2luZ2xlUmVxdWVzdC5jbG9zZWQpIHtcclxuICAgICAgICB0aGlzLnNpbmdsZVJlcXVlc3QudW5zdWJzY3JpYmUoKTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLnNpbmdsZVJlcXVlc3QgPSB0aW1lcigxMDApLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgcHViYWRzID0gZ29vZ2xldGFnLnB1YmFkcygpO1xyXG4gICAgICAgIHB1YmFkcy5lbmFibGVTaW5nbGVSZXF1ZXN0KCk7XHJcbiAgICAgICAgZ29vZ2xldGFnLmVuYWJsZVNlcnZpY2VzKCk7XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoU2xvdHMuZm9yRWFjaChzID0+IHtcclxuICAgICAgICAgIGdvb2dsZXRhZy5kaXNwbGF5KHMuZ2V0U2xvdEVsZW1lbnRJZCgpKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBwdWJhZHMucmVmcmVzaCh0aGlzLnJlZnJlc2hTbG90cyk7XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoU2xvdHMgPSBbXTtcclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBnb29nbGV0YWcuZGlzcGxheShzbG90LmdldFNsb3RFbGVtZW50SWQoKSk7XHJcbiAgICAgIHRoaXMucmVmcmVzaChbdGFza10pO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBkZWZlcnJlZDtcclxuICB9XHJcblxyXG4gIGNhbmNlbEludGVydmFsKHNsb3QpIHtcclxuICAgIGlmICghdGhpcy5oYXNTbG90SW50ZXJ2YWwoc2xvdCkpIHtcclxuICAgICAgdGhyb3cgbmV3IERGUFJlZnJlc2hFcnJvcignTm8gaW50ZXJ2YWwgZm9yIGdpdmVuIHNsb3QnKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBpbnRlcnZhbDogU3Vic2NyaXB0aW9uID0gdGhpcy5pbnRlcnZhbHNbdGhpcy5zbG90SW50ZXJ2YWxLZXkoc2xvdCldO1xyXG4gICAgaW50ZXJ2YWwudW5zdWJzY3JpYmUoKTtcclxuICAgIGRlbGV0ZSB0aGlzLmludGVydmFsc1tzbG90XTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaGFzU2xvdEludGVydmFsKHNsb3QpIHtcclxuICAgIHJldHVybiB0aGlzLnNsb3RJbnRlcnZhbEtleShzbG90KSBpbiB0aGlzLmludGVydmFscztcclxuICB9XHJcblxyXG4gIHByaXZhdGUgcmVmcmVzaCh0YXNrcz8pIHtcclxuICAgIGlmICh0YXNrcyA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIGdvb2dsZXRhZy5jbWQucHVzaCgoKSA9PiB7XHJcbiAgICAgICAgZ29vZ2xldGFnLnB1YmFkcygpLnJlZnJlc2goKTtcclxuICAgICAgfSk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGFza3MubGVuZ3RoID09PSAwKSB7IHJldHVybiBmYWxzZTsgfVxyXG5cclxuICAgIGdvb2dsZXRhZy5jbWQucHVzaCgoKSA9PiB7XHJcbiAgICAgIGdvb2dsZXRhZy5wdWJhZHMoKS5yZWZyZXNoKHRhc2tzLm1hcCh0YXNrID0+IHRhc2suc2xvdCkpO1xyXG4gICAgICB0YXNrcy5mb3JFYWNoKHRhc2sgPT4ge1xyXG4gICAgICAgIFByb21pc2UucmVzb2x2ZSh0YXNrLnNsb3QpO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBhZGRTbG90SW50ZXJ2YWwodGFzaywgaW50ZXJ2YWwpIHtcclxuICAgIGNvbnN0IHBhcnNlZEludGVydmFsID0gdGhpcy5wYXJzZUR1cmF0aW9uLnBhcnNlRHVyYXRpb24oaW50ZXJ2YWwpO1xyXG4gICAgdGhpcy52YWxpZGF0ZUludGVydmFsKHBhcnNlZEludGVydmFsLCBpbnRlcnZhbCk7XHJcblxyXG4gICAgY29uc3QgcmVmcmVzaCA9IHRpbWVyKHBhcnNlZEludGVydmFsLCBwYXJzZWRJbnRlcnZhbCkuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgY29uc3QgZG9jID0gdGhpcy5pbmplY3QuZ2V0KERPQ1VNRU5UKTtcclxuICAgICAgaWYgKCF0aGlzLmhpZGRlbkNoZWNrKGRvYy5nZXRFbGVtZW50QnlJZCh0YXNrLnNsb3QuZ2V0U2xvdEVsZW1lbnRJZCgpKSkpIHtcclxuICAgICAgICB0aGlzLnJlZnJlc2goW3Rhc2tdKTtcclxuICAgICAgICB0aGlzLnJlZnJlc2hFdmVudC5lbWl0KHRhc2suc2xvdCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMuaW50ZXJ2YWxzW3RoaXMuc2xvdEludGVydmFsS2V5KHRhc2suc2xvdCldID0gcmVmcmVzaDtcclxuXHJcbiAgICByZXR1cm4gcmVmcmVzaDtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgc2xvdEludGVydmFsS2V5KHNsb3QpIHtcclxuICAgIHJldHVybiBzbG90LmdldFNsb3RJZCgpLmdldERvbUlkKCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHZhbGlkYXRlSW50ZXJ2YWwobWlsbGlzZWNvbmRzLCBiZWZvcmVQYXJzaW5nKSB7XHJcbiAgICBpZiAobWlsbGlzZWNvbmRzIDwgMTAwMCkge1xyXG4gICAgICBjb25zb2xlLndhcm4oJ0NhcmVmdWw6ICR7YmVmb3JlUGFyc2luZ30gaXMgcXVpdGUgYSBsb3cgaW50ZXJ2YWwhJyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBoaWRkZW5DaGVjayhlbGVtZW50OiBFbGVtZW50KSB7XHJcbiAgICBpZiAodHlwZW9mICh3aW5kb3cpICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICBjb25zdCBjc3MgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KTtcclxuICAgICAgaWYgKGNzcy5kaXNwbGF5ID09PSAnbm9uZScpIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgfSBlbHNlIGlmIChlbGVtZW50LnBhcmVudEVsZW1lbnQpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5oaWRkZW5DaGVjayhlbGVtZW50LnBhcmVudEVsZW1lbnQpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG59XHJcbiJdfQ==