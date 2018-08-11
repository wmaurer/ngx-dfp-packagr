/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @record
 */
export function GoogleSlot() { }
function GoogleSlot_tsickle_Closure_declarations() {
    /** @type {?} */
    GoogleSlot.prototype.renderEnded;
    /** @type {?} */
    GoogleSlot.prototype.addService;
    /** @type {?} */
    GoogleSlot.prototype.clearCategoryExclusions;
    /** @type {?} */
    GoogleSlot.prototype.clearTargeting;
    /** @type {?} */
    GoogleSlot.prototype.defineSizeMapping;
    /** @type {?} */
    GoogleSlot.prototype.get;
    /** @type {?} */
    GoogleSlot.prototype.getAdUnitPath;
    /** @type {?} */
    GoogleSlot.prototype.getAttributeKeys;
    /** @type {?} */
    GoogleSlot.prototype.getCategoryExclusions;
    /** @type {?} */
    GoogleSlot.prototype.getResponseInformation;
    /** @type {?} */
    GoogleSlot.prototype.getSlotElementId;
    /** @type {?} */
    GoogleSlot.prototype.getTargeting;
    /** @type {?} */
    GoogleSlot.prototype.getTargetingKeys;
    /** @type {?} */
    GoogleSlot.prototype.set;
    /** @type {?} */
    GoogleSlot.prototype.setCategoryExclusion;
    /** @type {?} */
    GoogleSlot.prototype.setClickUrl;
    /** @type {?} */
    GoogleSlot.prototype.setCollapseEmptyDiv;
    /** @type {?} */
    GoogleSlot.prototype.setForceSafeFrame;
    /** @type {?} */
    GoogleSlot.prototype.setSafeFrameConfig;
    /** @type {?} */
    GoogleSlot.prototype.setTargeting;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29vZ2xlLXNsb3QuY2xhc3MuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZGZwLyIsInNvdXJjZXMiOlsic3JjL2NsYXNzL2dvb2dsZS1zbG90LmNsYXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiIiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgaW50ZXJmYWNlIEdvb2dsZVNsb3Qge1xyXG4gICAgLy8gY2FsbGJhY2sgZm9yIGdvb2dsZXRhZy5ldmVudHMuU2xvdFJlbmRlckVuZGVkRXZlbnQ7XHJcbiAgICByZW5kZXJFbmRlZDogRnVuY3Rpb247XHJcblxyXG4gICAgLy8gQWRkcyBhIHNlcnZpY2UgdG8gdGhpcyBzbG90LlxyXG4gICAgYWRkU2VydmljZShzZXJ2aWNlKTtcclxuXHJcbiAgICAvLyBDbGVhcnMgYWxsIHNsb3QtbGV2ZWwgYWQgY2F0ZWdvcnkgZXhjbHVzaW9uIGxhYmVscyBmb3IgdGhpcyBzbG90LlxyXG4gICAgY2xlYXJDYXRlZ29yeUV4Y2x1c2lvbnMoKTtcclxuXHJcbiAgICAvLyBDbGVhcnMgc3BlY2lmaWMgb3IgYWxsIGN1c3RvbSBzbG90LWxldmVsIHRhcmdldGluZyBwYXJhbWV0ZXJzIGZvciB0aGlzIHNsb3QuXHJcbiAgICBjbGVhclRhcmdldGluZyhvcHRfa2V5KTtcclxuXHJcbiAgICAvLyBTZXRzIGFuIGFycmF5IG9mIG1hcHBpbmdzIGZyb20gYSBtaW5pbXVtIHZpZXdwb3J0IHNpemUgdG8gc2xvdCBzaXplIGZvciB0aGlzIHNsb3QuXHJcbiAgICBkZWZpbmVTaXplTWFwcGluZyhzaXplTWFwcGluZyk7XHJcblxyXG4gICAgLy8gUmV0dXJucyB0aGUgdmFsdWUgZm9yIHRoZSBBZFNlbnNlIGF0dHJpYnV0ZSBhc3NvY2lhdGVkIHdpdGggdGhlIGdpdmVuIGtleS5cclxuICAgIGdldChrZXkpO1xyXG5cclxuICAgIC8vIFJldHVybnMgdGhlIGZ1bGwgcGF0aCBvZiB0aGUgYWQgdW5pdCwgd2l0aCB0aGUgbmV0d29yayBjb2RlIGFuZCBhZCB1bml0IHBhdGguXHJcbiAgICBnZXRBZFVuaXRQYXRoKCk7XHJcblxyXG4gICAgLy8gUmV0dXJucyB0aGUgbGlzdCBvZiBhdHRyaWJ1dGUga2V5cyBzZXQgb24gdGhpcyBzbG90LlxyXG4gICAgZ2V0QXR0cmlidXRlS2V5cygpO1xyXG5cclxuICAgIC8vIFJldHVybnMgdGhlIGFkIGNhdGVnb3J5IGV4Y2x1c2lvbiBsYWJlbHMgZm9yIHRoaXMgc2xvdC5cclxuICAgIGdldENhdGVnb3J5RXhjbHVzaW9ucygpO1xyXG5cclxuICAgIC8vIFJldHVybnMgdGhlIGFkIHJlc3BvbnNlIGluZm9ybWF0aW9uLlxyXG4gICAgZ2V0UmVzcG9uc2VJbmZvcm1hdGlvbigpO1xyXG5cclxuICAgIC8vIFJldHVybnMgdGhlIGlkIG9mIHRoZSBzbG90IGVsZW1lbnQgcHJvdmlkZWQgd2hlbiB0aGUgc2xvdCB3YXMgZGVmaW5lZC5cclxuICAgIGdldFNsb3RFbGVtZW50SWQoKTtcclxuXHJcbiAgICAvLyBSZXR1cm5zIGEgc3BlY2lmaWMgY3VzdG9tIHRhcmdldGluZyBwYXJhbWV0ZXIgc2V0IG9uIHRoaXMgc2xvdC5cclxuICAgIGdldFRhcmdldGluZyhrZXkpO1xyXG5cclxuICAgIC8vIFJldHVybnMgdGhlIGxpc3Qgb2YgYWxsIGN1c3RvbSB0YXJnZXRpbmcga2V5cyBzZXQgb24gdGhpcyBzbG90LlxyXG4gICAgZ2V0VGFyZ2V0aW5nS2V5cygpO1xyXG5cclxuICAgIC8vIFNldHMgYSB2YWx1ZSBmb3IgYW4gQWRTZW5zZSBhdHRyaWJ1dGUgb24gYSBwYXJ0aWN1bGFyIGFkIHNsb3QuXHJcbiAgICBzZXQoa2V5LCB2YWx1ZSk7XHJcblxyXG4gICAgLy8gU2V0cyBhIHNsb3QtbGV2ZWwgYWQgY2F0ZWdvcnkgZXhjbHVzaW9uIGxhYmVsIG9uIHRoaXMgc2xvdC5cclxuICAgIHNldENhdGVnb3J5RXhjbHVzaW9uKGNhdGVnb3J5RXhjbHVzaW9uKTtcclxuXHJcbiAgICAvLyBTZXRzIHRoZSBjbGljayBVUkwgdG8gd2hpY2ggdXNlcnMgd2lsbCBiZSByZWRpcmVjdGVkIGFmdGVyIGNsaWNraW5nIG9uIHRoZSBhZC5cclxuICAgIHNldENsaWNrVXJsKHZhbHVlKTtcclxuXHJcbiAgICAvLyBTZXRzIHdoZXRoZXIgdGhlIHNsb3QgZGl2IHNob3VsZCBiZSBoaWRkZW4gd2hlbiB0aGVyZSBpcyBubyBhZCBpbiB0aGUgc2xvdC5cclxuICAgIHNldENvbGxhcHNlRW1wdHlEaXYoY29sbGFwc2UsIG9wdF9jb2xsYXBzZUJlZm9yZUFkRmV0Y2gpO1xyXG5cclxuICAgIC8vIENvbmZpZ3VyZXMgd2hldGhlciBhZHMgaW4gdGhpcyBzbG90IHNob3VsZCBiZSBmb3JjZWQgdG8gYmUgcmVuZGVyZWQgdXNpbmcgYSBTYWZlRnJhbWUgY29udGFpbmVyLlxyXG4gICAgc2V0Rm9yY2VTYWZlRnJhbWUoZm9yY2VTYWZlRnJhbWUpO1xyXG5cclxuICAgIC8vIFNldHMgdGhlIHNsb3QtbGV2ZWwgcHJlZmVyZW5jZXMgZm9yIFNhZmVGcmFtZSBjb25maWd1cmF0aW9uLlxyXG4gICAgc2V0U2FmZUZyYW1lQ29uZmlnKGNvbmZpZyk7XHJcblxyXG4gICAgLy8gU2V0cyBhIGN1c3RvbSB0YXJnZXRpbmcgcGFyYW1ldGVyIGZvciB0aGlzIHNsb3QuXHJcbiAgICBzZXRUYXJnZXRpbmcoa2V5LCB2YWx1ZSk7XHJcbn1cclxuIl19