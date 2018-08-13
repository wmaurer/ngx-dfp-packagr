/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { DFP_CONFIG } from './service/injection_token';
import { IdleService } from './service/idle.service';
import { HttpErrorService } from './service/http-error.service';
import { ParseDurationService } from './service/parse-duration.service';
import { ScriptInjectorService } from './service/script-injector.service';
import { DfpService } from './service/dfp.service';
import { DfpIDGeneratorService } from './service/dfp-id-generator.service';
import { DfpRefreshService } from './service/dfp-refresh.service';
import { DfpAdDirective } from './directive/dfp-ad.directive';
import { DfpSizeDirective } from './directive/dfp-size.directive';
import { DfpResponsiveDirective } from './directive/dfp-responsive.directive';
import { DfpAdResponsiveDirective } from './directive/dfp-ad-responsive.directive';
import { DfpTargetingDirective } from './directive/dfp-targeting.directive';
import { DfpExclusionDirective } from './directive/dfp-exclusion.directive';
import { DfpValueDirective } from './directive/dfp-value.directive';
import { DfpVideoDirective } from './directive/dfp-video.directive';
import { DfpAudiencePixelDirective } from './directive/dfp-audience-pixel.directive';
/** @type {?} */
const DIRECTIVES = [
    DfpAdDirective,
    DfpSizeDirective,
    DfpResponsiveDirective,
    DfpAdResponsiveDirective,
    DfpTargetingDirective, DfpExclusionDirective, DfpValueDirective,
    DfpVideoDirective,
    DfpAudiencePixelDirective
];
/** @type {?} */
const SERVICES = [
    HttpErrorService,
    ParseDurationService,
    ScriptInjectorService,
    DfpService, DfpIDGeneratorService, DfpRefreshService
];
export class DfpModule {
    /**
     * @param {?=} config
     * @return {?}
     */
    static forRoot(config) {
        return {
            ngModule: DfpModule,
            providers: [
                ...(config && config.idleLoad === true ? [IdleService] : []),
                { provide: DFP_CONFIG, useValue: config || {} }
            ]
        };
    }
}
DfpModule.decorators = [
    { type: NgModule, args: [{
                imports: [],
                declarations: [
                    ...DIRECTIVES
                ],
                providers: [
                    ...SERVICES
                ],
                exports: [
                    ...DIRECTIVES
                ]
            },] },
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGZwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1kZnAvIiwic291cmNlcyI6WyJkZnAubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFrQixNQUFNLGVBQWUsQ0FBQztBQUl6RCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFFdkQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3JELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQzFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUMzRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUVsRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDOUQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDbEUsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDOUUsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDbkYsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDNUUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDNUUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDcEUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDcEUsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sMENBQTBDLENBQUM7O0FBRXJGLE1BQU0sVUFBVSxHQUFHO0lBQ2pCLGNBQWM7SUFDZCxnQkFBZ0I7SUFDaEIsc0JBQXNCO0lBQ3RCLHdCQUF3QjtJQUN4QixxQkFBcUIsRUFBRSxxQkFBcUIsRUFBRSxpQkFBaUI7SUFDL0QsaUJBQWlCO0lBQ2pCLHlCQUF5QjtDQUMxQixDQUFDOztBQUVGLE1BQU0sUUFBUSxHQUFHO0lBQ2YsZ0JBQWdCO0lBQ2hCLG9CQUFvQjtJQUNwQixxQkFBcUI7SUFDckIsVUFBVSxFQUFFLHFCQUFxQixFQUFFLGlCQUFpQjtDQUNyRCxDQUFDO0FBZ0JGLE1BQU07Ozs7O0lBQ0osTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFrQjtRQUMvQixNQUFNLENBQUM7WUFDTCxRQUFRLEVBQUUsU0FBUztZQUNuQixTQUFTLEVBQUU7Z0JBQ1QsR0FBRyxDQUFDLE1BQU0sSUFBSSxNQUFNLENBQUMsUUFBUSxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO2dCQUM1RCxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLE1BQU0sSUFBSSxFQUFFLEVBQUU7YUFDaEQ7U0FDRixDQUFDO0tBQ0g7OztZQXZCRixRQUFRLFNBQUM7Z0JBQ1IsT0FBTyxFQUFFLEVBRVI7Z0JBQ0QsWUFBWSxFQUFFO29CQUNaLEdBQUcsVUFBVTtpQkFDZDtnQkFDRCxTQUFTLEVBQUU7b0JBQ1QsR0FBRyxRQUFRO2lCQUNaO2dCQUNELE9BQU8sRUFBRTtvQkFDUCxHQUFHLFVBQVU7aUJBQ2Q7YUFDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBJbmplY3Rpb25Ub2tlbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBNb2R1bGVXaXRoUHJvdmlkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBEZnBDb25maWcsIH0gZnJvbSAnLi9jbGFzcyc7XHJcbmltcG9ydCB7IERGUF9DT05GSUcgfSBmcm9tICcuL3NlcnZpY2UvaW5qZWN0aW9uX3Rva2VuJztcclxuXHJcbmltcG9ydCB7IElkbGVTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlL2lkbGUuc2VydmljZSc7XHJcbmltcG9ydCB7IEh0dHBFcnJvclNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2UvaHR0cC1lcnJvci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgUGFyc2VEdXJhdGlvblNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2UvcGFyc2UtZHVyYXRpb24uc2VydmljZSc7XHJcbmltcG9ydCB7IFNjcmlwdEluamVjdG9yU2VydmljZSB9IGZyb20gJy4vc2VydmljZS9zY3JpcHQtaW5qZWN0b3Iuc2VydmljZSc7XHJcbmltcG9ydCB7IERmcFNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2UvZGZwLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBEZnBJREdlbmVyYXRvclNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2UvZGZwLWlkLWdlbmVyYXRvci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgRGZwUmVmcmVzaFNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2UvZGZwLXJlZnJlc2guc2VydmljZSc7XHJcblxyXG5pbXBvcnQgeyBEZnBBZERpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlL2RmcC1hZC5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBEZnBTaXplRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmUvZGZwLXNpemUuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgRGZwUmVzcG9uc2l2ZURpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlL2RmcC1yZXNwb25zaXZlLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IERmcEFkUmVzcG9uc2l2ZURpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlL2RmcC1hZC1yZXNwb25zaXZlLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IERmcFRhcmdldGluZ0RpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlL2RmcC10YXJnZXRpbmcuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgRGZwRXhjbHVzaW9uRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmUvZGZwLWV4Y2x1c2lvbi5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBEZnBWYWx1ZURpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlL2RmcC12YWx1ZS5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBEZnBWaWRlb0RpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlL2RmcC12aWRlby5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBEZnBBdWRpZW5jZVBpeGVsRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmUvZGZwLWF1ZGllbmNlLXBpeGVsLmRpcmVjdGl2ZSc7XHJcblxyXG5jb25zdCBESVJFQ1RJVkVTID0gW1xyXG4gIERmcEFkRGlyZWN0aXZlLFxyXG4gIERmcFNpemVEaXJlY3RpdmUsXHJcbiAgRGZwUmVzcG9uc2l2ZURpcmVjdGl2ZSxcclxuICBEZnBBZFJlc3BvbnNpdmVEaXJlY3RpdmUsXHJcbiAgRGZwVGFyZ2V0aW5nRGlyZWN0aXZlLCBEZnBFeGNsdXNpb25EaXJlY3RpdmUsIERmcFZhbHVlRGlyZWN0aXZlLFxyXG4gIERmcFZpZGVvRGlyZWN0aXZlLFxyXG4gIERmcEF1ZGllbmNlUGl4ZWxEaXJlY3RpdmVcclxuXTtcclxuXHJcbmNvbnN0IFNFUlZJQ0VTID0gW1xyXG4gIEh0dHBFcnJvclNlcnZpY2UsXHJcbiAgUGFyc2VEdXJhdGlvblNlcnZpY2UsXHJcbiAgU2NyaXB0SW5qZWN0b3JTZXJ2aWNlLFxyXG4gIERmcFNlcnZpY2UsIERmcElER2VuZXJhdG9yU2VydmljZSwgRGZwUmVmcmVzaFNlcnZpY2VcclxuXTtcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1xyXG5cclxuICBdLFxyXG4gIGRlY2xhcmF0aW9uczogW1xyXG4gICAgLi4uRElSRUNUSVZFU1xyXG4gIF0sXHJcbiAgcHJvdmlkZXJzOiBbXHJcbiAgICAuLi5TRVJWSUNFU1xyXG4gIF0sXHJcbiAgZXhwb3J0czogW1xyXG4gICAgLi4uRElSRUNUSVZFU1xyXG4gIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIERmcE1vZHVsZSB7XHJcbiAgc3RhdGljIGZvclJvb3QoY29uZmlnPzogRGZwQ29uZmlnKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBuZ01vZHVsZTogRGZwTW9kdWxlLFxyXG4gICAgICBwcm92aWRlcnM6IFtcclxuICAgICAgICAuLi4oY29uZmlnICYmIGNvbmZpZy5pZGxlTG9hZCA9PT0gdHJ1ZSA/IFtJZGxlU2VydmljZV0gOiBbXSksXHJcbiAgICAgICAgeyBwcm92aWRlOiBERlBfQ09ORklHLCB1c2VWYWx1ZTogY29uZmlnIHx8IHt9IH1cclxuICAgICAgXVxyXG4gICAgfTtcclxuICB9XHJcbn1cclxuIl19