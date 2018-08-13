/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
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
var DIRECTIVES = [
    DfpAdDirective,
    DfpSizeDirective,
    DfpResponsiveDirective,
    DfpAdResponsiveDirective,
    DfpTargetingDirective, DfpExclusionDirective, DfpValueDirective,
    DfpVideoDirective,
    DfpAudiencePixelDirective
];
/** @type {?} */
var SERVICES = [
    HttpErrorService,
    ParseDurationService,
    ScriptInjectorService,
    DfpService, DfpIDGeneratorService, DfpRefreshService
];
var DfpModule = /** @class */ (function () {
    function DfpModule() {
    }
    /**
     * @param {?=} config
     * @return {?}
     */
    DfpModule.forRoot = /**
     * @param {?=} config
     * @return {?}
     */
    function (config) {
        return {
            ngModule: DfpModule,
            providers: tslib_1.__spread((config && config.idleLoad === true ? [IdleService] : []), [
                { provide: DFP_CONFIG, useValue: config || {} }
            ])
        };
    };
    DfpModule.decorators = [
        { type: NgModule, args: [{
                    imports: [],
                    declarations: tslib_1.__spread(DIRECTIVES),
                    providers: tslib_1.__spread(SERVICES),
                    exports: tslib_1.__spread(DIRECTIVES)
                },] },
    ];
    return DfpModule;
}());
export { DfpModule };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGZwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1kZnAvIiwic291cmNlcyI6WyJkZnAubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBa0IsTUFBTSxlQUFlLENBQUM7QUFJekQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBRXZELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUNoRSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUN4RSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUMxRSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDbkQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDM0UsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFFbEUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQzlELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ2xFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQzlFLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQ25GLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQzVFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQzVFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLDBDQUEwQyxDQUFDOztBQUVyRixJQUFNLFVBQVUsR0FBRztJQUNqQixjQUFjO0lBQ2QsZ0JBQWdCO0lBQ2hCLHNCQUFzQjtJQUN0Qix3QkFBd0I7SUFDeEIscUJBQXFCLEVBQUUscUJBQXFCLEVBQUUsaUJBQWlCO0lBQy9ELGlCQUFpQjtJQUNqQix5QkFBeUI7Q0FDMUIsQ0FBQzs7QUFFRixJQUFNLFFBQVEsR0FBRztJQUNmLGdCQUFnQjtJQUNoQixvQkFBb0I7SUFDcEIscUJBQXFCO0lBQ3JCLFVBQVUsRUFBRSxxQkFBcUIsRUFBRSxpQkFBaUI7Q0FDckQsQ0FBQzs7Ozs7Ozs7SUFpQk8saUJBQU87Ozs7SUFBZCxVQUFlLE1BQWtCO1FBQy9CLE1BQU0sQ0FBQztZQUNMLFFBQVEsRUFBRSxTQUFTO1lBQ25CLFNBQVMsbUJBQ0osQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDLFFBQVEsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztnQkFDNUQsRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxNQUFNLElBQUksRUFBRSxFQUFFO2NBQ2hEO1NBQ0YsQ0FBQztLQUNIOztnQkF2QkYsUUFBUSxTQUFDO29CQUNSLE9BQU8sRUFBRSxFQUVSO29CQUNELFlBQVksbUJBQ1AsVUFBVSxDQUNkO29CQUNELFNBQVMsbUJBQ0osUUFBUSxDQUNaO29CQUNELE9BQU8sbUJBQ0YsVUFBVSxDQUNkO2lCQUNGOztvQkF0REQ7O1NBdURhLFNBQVMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgSW5qZWN0aW9uVG9rZW4gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTW9kdWxlV2l0aFByb3ZpZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgRGZwQ29uZmlnLCB9IGZyb20gJy4vY2xhc3MnO1xyXG5pbXBvcnQgeyBERlBfQ09ORklHIH0gZnJvbSAnLi9zZXJ2aWNlL2luamVjdGlvbl90b2tlbic7XHJcblxyXG5pbXBvcnQgeyBJZGxlU2VydmljZSB9IGZyb20gJy4vc2VydmljZS9pZGxlLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBIdHRwRXJyb3JTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlL2h0dHAtZXJyb3Iuc2VydmljZSc7XHJcbmltcG9ydCB7IFBhcnNlRHVyYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlL3BhcnNlLWR1cmF0aW9uLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBTY3JpcHRJbmplY3RvclNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2Uvc2NyaXB0LWluamVjdG9yLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBEZnBTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlL2RmcC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgRGZwSURHZW5lcmF0b3JTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlL2RmcC1pZC1nZW5lcmF0b3Iuc2VydmljZSc7XHJcbmltcG9ydCB7IERmcFJlZnJlc2hTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlL2RmcC1yZWZyZXNoLnNlcnZpY2UnO1xyXG5cclxuaW1wb3J0IHsgRGZwQWREaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZS9kZnAtYWQuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgRGZwU2l6ZURpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlL2RmcC1zaXplLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IERmcFJlc3BvbnNpdmVEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZS9kZnAtcmVzcG9uc2l2ZS5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBEZnBBZFJlc3BvbnNpdmVEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZS9kZnAtYWQtcmVzcG9uc2l2ZS5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBEZnBUYXJnZXRpbmdEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZS9kZnAtdGFyZ2V0aW5nLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IERmcEV4Y2x1c2lvbkRpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlL2RmcC1leGNsdXNpb24uZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgRGZwVmFsdWVEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZS9kZnAtdmFsdWUuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgRGZwVmlkZW9EaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZS9kZnAtdmlkZW8uZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgRGZwQXVkaWVuY2VQaXhlbERpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlL2RmcC1hdWRpZW5jZS1waXhlbC5kaXJlY3RpdmUnO1xyXG5cclxuY29uc3QgRElSRUNUSVZFUyA9IFtcclxuICBEZnBBZERpcmVjdGl2ZSxcclxuICBEZnBTaXplRGlyZWN0aXZlLFxyXG4gIERmcFJlc3BvbnNpdmVEaXJlY3RpdmUsXHJcbiAgRGZwQWRSZXNwb25zaXZlRGlyZWN0aXZlLFxyXG4gIERmcFRhcmdldGluZ0RpcmVjdGl2ZSwgRGZwRXhjbHVzaW9uRGlyZWN0aXZlLCBEZnBWYWx1ZURpcmVjdGl2ZSxcclxuICBEZnBWaWRlb0RpcmVjdGl2ZSxcclxuICBEZnBBdWRpZW5jZVBpeGVsRGlyZWN0aXZlXHJcbl07XHJcblxyXG5jb25zdCBTRVJWSUNFUyA9IFtcclxuICBIdHRwRXJyb3JTZXJ2aWNlLFxyXG4gIFBhcnNlRHVyYXRpb25TZXJ2aWNlLFxyXG4gIFNjcmlwdEluamVjdG9yU2VydmljZSxcclxuICBEZnBTZXJ2aWNlLCBEZnBJREdlbmVyYXRvclNlcnZpY2UsIERmcFJlZnJlc2hTZXJ2aWNlXHJcbl07XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtcclxuXHJcbiAgXSxcclxuICBkZWNsYXJhdGlvbnM6IFtcclxuICAgIC4uLkRJUkVDVElWRVNcclxuICBdLFxyXG4gIHByb3ZpZGVyczogW1xyXG4gICAgLi4uU0VSVklDRVNcclxuICBdLFxyXG4gIGV4cG9ydHM6IFtcclxuICAgIC4uLkRJUkVDVElWRVNcclxuICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBEZnBNb2R1bGUge1xyXG4gIHN0YXRpYyBmb3JSb290KGNvbmZpZz86IERmcENvbmZpZyk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgbmdNb2R1bGU6IERmcE1vZHVsZSxcclxuICAgICAgcHJvdmlkZXJzOiBbXHJcbiAgICAgICAgLi4uKGNvbmZpZyAmJiBjb25maWcuaWRsZUxvYWQgPT09IHRydWUgPyBbSWRsZVNlcnZpY2VdIDogW10pLFxyXG4gICAgICAgIHsgcHJvdmlkZTogREZQX0NPTkZJRywgdXNlVmFsdWU6IGNvbmZpZyB8fCB7fSB9XHJcbiAgICAgIF1cclxuICAgIH07XHJcbiAgfVxyXG59XHJcbiJdfQ==