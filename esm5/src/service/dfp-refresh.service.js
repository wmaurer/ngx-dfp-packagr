/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable, EventEmitter, Optional, Injector, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { timer, from } from 'rxjs';
import { DfpConfig, DFP_CONFIG } from '../class';
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGZwLXJlZnJlc2guc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1kZnAvIiwic291cmNlcyI6WyJzcmMvc2VydmljZS9kZnAtcmVmcmVzaC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDckYsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRTNDLE9BQU8sRUFBZ0IsS0FBSyxFQUFFLElBQUksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUVqRCxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUNqRCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUVoRSxJQUFBO0lBQThCLDJDQUFLOzs7OzBCQVJuQztFQVE4QixLQUFLLEVBQUksQ0FBQTs7SUFZckMsMkJBRVUsTUFBaUIsRUFDakIsUUFDQTtRQUZBLFdBQU0sR0FBTixNQUFNLENBQVc7UUFDakIsV0FBTSxHQUFOLE1BQU07UUFDTixrQkFBYSxHQUFiLGFBQWE7NEJBVFcsSUFBSSxZQUFZLEVBQUU7NEJBQzdCLEVBQUU7eUJBRUwsRUFBRTtLQU9qQjs7Ozs7OztJQUVMLHVDQUFXOzs7Ozs7SUFBWCxVQUFZLElBQUksRUFBRSxlQUFnQixFQUFFLFdBQW1CO1FBQXZELGlCQW1DQztRQW5DbUMsNEJBQUEsRUFBQSxtQkFBbUI7O1FBQ3JELElBQU0sUUFBUSxHQUFpQixJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUNYOztRQUQ1QyxJQUNFLElBQUksR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxDQUFDO1FBRTVDLFFBQVEsQ0FBQyxJQUFJLENBQUM7WUFDWixFQUFF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QUM7UUFFMUQsTUFBTSxDQUFDLE9BQU8sQ0FBQzs7Ozs7O0lBR1QsMkNBQWU7Ozs7Y0FBQyxJQUFJO1FBQzFCLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUM7Ozs7Ozs7SUFHN0IsNENBQWdCOzs7OztjQUFDLFlBQVksRUFBRSxhQUFhO1FBQ2xELEVBQUUsQ0FBQyxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLE9BQU8sQ0FBQyxJQUFJLENBQUMsb0RBQW9ELENBQUMsQ0FBQztTQUNwRTs7Ozs7O0lBR0gsdUNBQVc7Ozs7SUFBWCxVQUFZLE9BQWdCO1FBQzFCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDOztZQUNwQyxJQUFNLEdBQUcsR0FBRyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDN0MsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sS0FBSyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUMzQixNQUFNLENBQUMsSUFBSSxDQUFDO2FBQ2I7WUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pDLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQzthQUNoRDtTQUNGO1FBQ0QsTUFBTSxDQUFDLEtBQUssQ0FBQztLQUNkOztnQkEzSEYsVUFBVTs7OztnQkFQRixTQUFTLHVCQWdCYixRQUFRLFlBQUksTUFBTSxTQUFDLFVBQVU7Z0JBckJXLFFBQVE7Z0JBTTVDLG9CQUFvQjs7NEJBTjdCOztTQWFhLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIEV2ZW50RW1pdHRlciwgT3B0aW9uYWwsIEluamVjdG9yLCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5cclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uLCB0aW1lciwgZnJvbSB9IGZyb20gJ3J4anMnO1xyXG5cclxuaW1wb3J0IHsgRGZwQ29uZmlnLCBERlBfQ09ORklHIH0gZnJvbSAnLi4vY2xhc3MnO1xyXG5pbXBvcnQgeyBQYXJzZUR1cmF0aW9uU2VydmljZSB9IGZyb20gJy4vcGFyc2UtZHVyYXRpb24uc2VydmljZSc7XHJcblxyXG5jbGFzcyBERlBSZWZyZXNoRXJyb3IgZXh0ZW5kcyBFcnJvciB7IH1cclxuXHJcbmRlY2xhcmUgdmFyIGdvb2dsZXRhZztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIERmcFJlZnJlc2hTZXJ2aWNlIHtcclxuXHJcbiAgcmVmcmVzaEV2ZW50OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICBwcml2YXRlIHJlZnJlc2hTbG90cyA9IFtdO1xyXG4gIHByaXZhdGUgc2luZ2xlUmVxdWVzdDogU3Vic2NyaXB0aW9uO1xyXG4gIHByaXZhdGUgaW50ZXJ2YWxzID0ge307XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdChERlBfQ09ORklHKVxyXG4gICAgcHJpdmF0ZSBjb25maWc6IERmcENvbmZpZyxcclxuICAgIHByaXZhdGUgaW5qZWN0OiBJbmplY3RvcixcclxuICAgIHByaXZhdGUgcGFyc2VEdXJhdGlvbjogUGFyc2VEdXJhdGlvblNlcnZpY2VcclxuICApIHsgfVxyXG5cclxuICBzbG90UmVmcmVzaChzbG90LCByZWZyZXNoSW50ZXJ2YWw/LCBpbml0UmVmcmVzaCA9IGZhbHNlKSB7XHJcbiAgICBjb25zdCBkZWZlcnJlZDogUHJvbWlzZTxhbnk+ID0gZnJvbShbc2xvdF0pLnRvUHJvbWlzZSgpLFxyXG4gICAgICB0YXNrID0geyBzbG90OiBzbG90LCBkZWZlcnJlZDogZGVmZXJyZWQgfTtcclxuXHJcbiAgICBkZWZlcnJlZC50aGVuKCgpID0+IHtcclxuICAgICAgaWYgKHRoaXMuaGFzU2xvdEludGVydmFsKHNsb3QpKSB7XHJcbiAgICAgICAgdGhpcy5jYW5jZWxJbnRlcnZhbChzbG90KTtcclxuICAgICAgfVxyXG4gICAgICBpZiAocmVmcmVzaEludGVydmFsKSB7XHJcbiAgICAgICAgdGhpcy5hZGRTbG90SW50ZXJ2YWwodGFzaywgcmVmcmVzaEludGVydmFsKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKHRoaXMuY29uZmlnLnNpbmdsZVJlcXVlc3RNb2RlID09PSB0cnVlICYmIGluaXRSZWZyZXNoKSB7XHJcbiAgICAgIC8vIFVzZSBhIHRpbWVyIHRvIGhhbmRsZSByZWZyZXNoIG9mIGEgc2luZ2xlIHJlcXVlc3QgbW9kZVxyXG4gICAgICB0aGlzLnJlZnJlc2hTbG90cy5wdXNoKHNsb3QpO1xyXG4gICAgICBpZiAodGhpcy5zaW5nbGVSZXF1ZXN0ICYmICF0aGlzLnNpbmdsZVJlcXVlc3QuY2xvc2VkKSB7XHJcbiAgICAgICAgdGhpcy5zaW5nbGVSZXF1ZXN0LnVuc3Vic2NyaWJlKCk7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5zaW5nbGVSZXF1ZXN0ID0gdGltZXIoMTAwKS5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHB1YmFkcyA9IGdvb2dsZXRhZy5wdWJhZHMoKTtcclxuICAgICAgICBwdWJhZHMuZW5hYmxlU2luZ2xlUmVxdWVzdCgpO1xyXG4gICAgICAgIGdvb2dsZXRhZy5lbmFibGVTZXJ2aWNlcygpO1xyXG4gICAgICAgIHRoaXMucmVmcmVzaFNsb3RzLmZvckVhY2gocyA9PiB7XHJcbiAgICAgICAgICBnb29nbGV0YWcuZGlzcGxheShzLmdldFNsb3RFbGVtZW50SWQoKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcHViYWRzLnJlZnJlc2godGhpcy5yZWZyZXNoU2xvdHMpO1xyXG4gICAgICAgIHRoaXMucmVmcmVzaFNsb3RzID0gW107XHJcbiAgICAgIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZ29vZ2xldGFnLmRpc3BsYXkoc2xvdC5nZXRTbG90RWxlbWVudElkKCkpO1xyXG4gICAgICB0aGlzLnJlZnJlc2goW3Rhc2tdKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZGVmZXJyZWQ7XHJcbiAgfVxyXG5cclxuICBjYW5jZWxJbnRlcnZhbChzbG90KSB7XHJcbiAgICBpZiAoIXRoaXMuaGFzU2xvdEludGVydmFsKHNsb3QpKSB7XHJcbiAgICAgIHRocm93IG5ldyBERlBSZWZyZXNoRXJyb3IoJ05vIGludGVydmFsIGZvciBnaXZlbiBzbG90Jyk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgaW50ZXJ2YWw6IFN1YnNjcmlwdGlvbiA9IHRoaXMuaW50ZXJ2YWxzW3RoaXMuc2xvdEludGVydmFsS2V5KHNsb3QpXTtcclxuICAgIGludGVydmFsLnVuc3Vic2NyaWJlKCk7XHJcbiAgICBkZWxldGUgdGhpcy5pbnRlcnZhbHNbc2xvdF07XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGhhc1Nsb3RJbnRlcnZhbChzbG90KSB7XHJcbiAgICByZXR1cm4gdGhpcy5zbG90SW50ZXJ2YWxLZXkoc2xvdCkgaW4gdGhpcy5pbnRlcnZhbHM7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHJlZnJlc2godGFza3M/KSB7XHJcbiAgICBpZiAodGFza3MgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICBnb29nbGV0YWcuY21kLnB1c2goKCkgPT4ge1xyXG4gICAgICAgIGdvb2dsZXRhZy5wdWJhZHMoKS5yZWZyZXNoKCk7XHJcbiAgICAgIH0pO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRhc2tzLmxlbmd0aCA9PT0gMCkgeyByZXR1cm4gZmFsc2U7IH1cclxuXHJcbiAgICBnb29nbGV0YWcuY21kLnB1c2goKCkgPT4ge1xyXG4gICAgICBnb29nbGV0YWcucHViYWRzKCkucmVmcmVzaCh0YXNrcy5tYXAodGFzayA9PiB0YXNrLnNsb3QpKTtcclxuICAgICAgdGFza3MuZm9yRWFjaCh0YXNrID0+IHtcclxuICAgICAgICBQcm9taXNlLnJlc29sdmUodGFzay5zbG90KTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgYWRkU2xvdEludGVydmFsKHRhc2ssIGludGVydmFsKSB7XHJcbiAgICBjb25zdCBwYXJzZWRJbnRlcnZhbCA9IHRoaXMucGFyc2VEdXJhdGlvbi5wYXJzZUR1cmF0aW9uKGludGVydmFsKTtcclxuICAgIHRoaXMudmFsaWRhdGVJbnRlcnZhbChwYXJzZWRJbnRlcnZhbCwgaW50ZXJ2YWwpO1xyXG5cclxuICAgIGNvbnN0IHJlZnJlc2ggPSB0aW1lcihwYXJzZWRJbnRlcnZhbCwgcGFyc2VkSW50ZXJ2YWwpLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgIGNvbnN0IGRvYyA9IHRoaXMuaW5qZWN0LmdldChET0NVTUVOVCk7XHJcbiAgICAgIGlmICghdGhpcy5oaWRkZW5DaGVjayhkb2MuZ2V0RWxlbWVudEJ5SWQodGFzay5zbG90LmdldFNsb3RFbGVtZW50SWQoKSkpKSB7XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoKFt0YXNrXSk7XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoRXZlbnQuZW1pdCh0YXNrLnNsb3QpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLmludGVydmFsc1t0aGlzLnNsb3RJbnRlcnZhbEtleSh0YXNrLnNsb3QpXSA9IHJlZnJlc2g7XHJcblxyXG4gICAgcmV0dXJuIHJlZnJlc2g7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHNsb3RJbnRlcnZhbEtleShzbG90KSB7XHJcbiAgICByZXR1cm4gc2xvdC5nZXRTbG90SWQoKS5nZXREb21JZCgpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSB2YWxpZGF0ZUludGVydmFsKG1pbGxpc2Vjb25kcywgYmVmb3JlUGFyc2luZykge1xyXG4gICAgaWYgKG1pbGxpc2Vjb25kcyA8IDEwMDApIHtcclxuICAgICAgY29uc29sZS53YXJuKCdDYXJlZnVsOiAke2JlZm9yZVBhcnNpbmd9IGlzIHF1aXRlIGEgbG93IGludGVydmFsIScpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaGlkZGVuQ2hlY2soZWxlbWVudDogRWxlbWVudCkge1xyXG4gICAgaWYgKHR5cGVvZiAod2luZG93KSAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgY29uc3QgY3NzID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWxlbWVudCk7XHJcbiAgICAgIGlmIChjc3MuZGlzcGxheSA9PT0gJ25vbmUnKSB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIH0gZWxzZSBpZiAoZWxlbWVudC5wYXJlbnRFbGVtZW50KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaGlkZGVuQ2hlY2soZWxlbWVudC5wYXJlbnRFbGVtZW50KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxufVxyXG4iXX0=