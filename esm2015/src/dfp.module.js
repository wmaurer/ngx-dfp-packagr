/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { NgModule } from '@angular/core';
import { DFP_CONFIG } from './class';
import { IdleLoad, HttpErrorService, ParseDurationService, ScriptInjectorService, DfpService, DfpIDGeneratorService, DfpRefreshService } from './service';
import { DfpAdDirective, DfpAdResponsiveDirective, DfpSizeDirective, DfpResponsiveDirective, DfpTargetingDirective, DfpExclusionDirective, DfpValueDirective, DfpVideoDirective, DfpAudiencePixelDirective } from './directive';
/** @type {?} */
const DIRECTIVES = [
    DfpAdDirective, DfpAdResponsiveDirective,
    DfpSizeDirective,
    DfpResponsiveDirective,
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
                ...(config && config.idleLoad === true ? [IdleLoad] : []),
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGZwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1kZnAvIiwic291cmNlcyI6WyJzcmMvZGZwLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUd6QyxPQUFPLEVBQUUsVUFBVSxFQUFhLE1BQU0sU0FBUyxDQUFDO0FBRWhELE9BQU8sRUFDTCxRQUFRLEVBQ1IsZ0JBQWdCLEVBQ2hCLG9CQUFvQixFQUNwQixxQkFBcUIsRUFDckIsVUFBVSxFQUFFLHFCQUFxQixFQUFFLGlCQUFpQixFQUNyRCxNQUFNLFdBQVcsQ0FBQztBQUVuQixPQUFPLEVBQ0wsY0FBYyxFQUFFLHdCQUF3QixFQUN4QyxnQkFBZ0IsRUFDaEIsc0JBQXNCLEVBQ3RCLHFCQUFxQixFQUFFLHFCQUFxQixFQUFFLGlCQUFpQixFQUMvRCxpQkFBaUIsRUFDakIseUJBQXlCLEVBQzFCLE1BQU0sYUFBYSxDQUFDOztBQUVyQixNQUFNLFVBQVUsR0FBRztJQUNqQixjQUFjLEVBQUUsd0JBQXdCO0lBQ3hDLGdCQUFnQjtJQUNoQixzQkFBc0I7SUFDdEIscUJBQXFCLEVBQUUscUJBQXFCLEVBQUUsaUJBQWlCO0lBQy9ELGlCQUFpQjtJQUNqQix5QkFBeUI7Q0FDMUIsQ0FBQzs7QUFFRixNQUFNLFFBQVEsR0FBRztJQUNmLGdCQUFnQjtJQUNoQixvQkFBb0I7SUFDcEIscUJBQXFCO0lBQ3JCLFVBQVUsRUFBRSxxQkFBcUIsRUFBRSxpQkFBaUI7Q0FDckQsQ0FBQztBQWdCRixNQUFNOzs7OztJQUNKLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBa0I7UUFDL0IsTUFBTSxDQUFDO1lBQ0wsUUFBUSxFQUFFLFNBQVM7WUFDbkIsU0FBUyxFQUFFO2dCQUNULEdBQUcsQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDLFFBQVEsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztnQkFDekQsRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxNQUFNLElBQUksRUFBRSxFQUFFO2FBQ2hEO1NBQ0YsQ0FBQztLQUNIOzs7WUF2QkYsUUFBUSxTQUFDO2dCQUNSLE9BQU8sRUFBRSxFQUVSO2dCQUNELFlBQVksRUFBRTtvQkFDWixHQUFHLFVBQVU7aUJBQ2Q7Z0JBQ0QsU0FBUyxFQUFFO29CQUNULEdBQUcsUUFBUTtpQkFDWjtnQkFDRCxPQUFPLEVBQUU7b0JBQ1AsR0FBRyxVQUFVO2lCQUNkO2FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBNb2R1bGVXaXRoUHJvdmlkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBERlBfQ09ORklHLCBEZnBDb25maWcgfSBmcm9tICcuL2NsYXNzJztcclxuXHJcbmltcG9ydCB7XHJcbiAgSWRsZUxvYWQsXHJcbiAgSHR0cEVycm9yU2VydmljZSxcclxuICBQYXJzZUR1cmF0aW9uU2VydmljZSxcclxuICBTY3JpcHRJbmplY3RvclNlcnZpY2UsXHJcbiAgRGZwU2VydmljZSwgRGZwSURHZW5lcmF0b3JTZXJ2aWNlLCBEZnBSZWZyZXNoU2VydmljZVxyXG59IGZyb20gJy4vc2VydmljZSc7XHJcblxyXG5pbXBvcnQge1xyXG4gIERmcEFkRGlyZWN0aXZlLCBEZnBBZFJlc3BvbnNpdmVEaXJlY3RpdmUsXHJcbiAgRGZwU2l6ZURpcmVjdGl2ZSxcclxuICBEZnBSZXNwb25zaXZlRGlyZWN0aXZlLFxyXG4gIERmcFRhcmdldGluZ0RpcmVjdGl2ZSwgRGZwRXhjbHVzaW9uRGlyZWN0aXZlLCBEZnBWYWx1ZURpcmVjdGl2ZSxcclxuICBEZnBWaWRlb0RpcmVjdGl2ZSxcclxuICBEZnBBdWRpZW5jZVBpeGVsRGlyZWN0aXZlXHJcbn0gZnJvbSAnLi9kaXJlY3RpdmUnO1xyXG5cclxuY29uc3QgRElSRUNUSVZFUyA9IFtcclxuICBEZnBBZERpcmVjdGl2ZSwgRGZwQWRSZXNwb25zaXZlRGlyZWN0aXZlLFxyXG4gIERmcFNpemVEaXJlY3RpdmUsXHJcbiAgRGZwUmVzcG9uc2l2ZURpcmVjdGl2ZSxcclxuICBEZnBUYXJnZXRpbmdEaXJlY3RpdmUsIERmcEV4Y2x1c2lvbkRpcmVjdGl2ZSwgRGZwVmFsdWVEaXJlY3RpdmUsXHJcbiAgRGZwVmlkZW9EaXJlY3RpdmUsXHJcbiAgRGZwQXVkaWVuY2VQaXhlbERpcmVjdGl2ZVxyXG5dO1xyXG5cclxuY29uc3QgU0VSVklDRVMgPSBbXHJcbiAgSHR0cEVycm9yU2VydmljZSxcclxuICBQYXJzZUR1cmF0aW9uU2VydmljZSxcclxuICBTY3JpcHRJbmplY3RvclNlcnZpY2UsXHJcbiAgRGZwU2VydmljZSwgRGZwSURHZW5lcmF0b3JTZXJ2aWNlLCBEZnBSZWZyZXNoU2VydmljZVxyXG5dO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbXHJcblxyXG4gIF0sXHJcbiAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICAuLi5ESVJFQ1RJVkVTXHJcbiAgXSxcclxuICBwcm92aWRlcnM6IFtcclxuICAgIC4uLlNFUlZJQ0VTXHJcbiAgXSxcclxuICBleHBvcnRzOiBbXHJcbiAgICAuLi5ESVJFQ1RJVkVTXHJcbiAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgRGZwTW9kdWxlIHtcclxuICBzdGF0aWMgZm9yUm9vdChjb25maWc/OiBEZnBDb25maWcpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIG5nTW9kdWxlOiBEZnBNb2R1bGUsXHJcbiAgICAgIHByb3ZpZGVyczogW1xyXG4gICAgICAgIC4uLihjb25maWcgJiYgY29uZmlnLmlkbGVMb2FkID09PSB0cnVlID8gW0lkbGVMb2FkXSA6IFtdKSxcclxuICAgICAgICB7IHByb3ZpZGU6IERGUF9DT05GSUcsIHVzZVZhbHVlOiBjb25maWcgfHwge30gfVxyXG4gICAgICBdXHJcbiAgICB9O1xyXG4gIH1cclxufVxyXG4iXX0=