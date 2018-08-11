/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { DFP_CONFIG } from './class';
import { IdleLoad, HttpErrorService, ParseDurationService, ScriptInjectorService, DfpService, DfpIDGeneratorService, DfpRefreshService } from './service';
import { DfpAdDirective, DfpAdResponsiveDirective, DfpSizeDirective, DfpResponsiveDirective, DfpTargetingDirective, DfpExclusionDirective, DfpValueDirective, DfpVideoDirective, DfpAudiencePixelDirective } from './directive';
/** @type {?} */
var DIRECTIVES = [
    DfpAdDirective, DfpAdResponsiveDirective,
    DfpSizeDirective,
    DfpResponsiveDirective,
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
            providers: tslib_1.__spread((config && config.idleLoad === true ? [IdleLoad] : []), [
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGZwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1kZnAvIiwic291cmNlcyI6WyJzcmMvZGZwLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHekMsT0FBTyxFQUFFLFVBQVUsRUFBYSxNQUFNLFNBQVMsQ0FBQztBQUVoRCxPQUFPLEVBQ0wsUUFBUSxFQUNSLGdCQUFnQixFQUNoQixvQkFBb0IsRUFDcEIscUJBQXFCLEVBQ3JCLFVBQVUsRUFBRSxxQkFBcUIsRUFBRSxpQkFBaUIsRUFDckQsTUFBTSxXQUFXLENBQUM7QUFFbkIsT0FBTyxFQUNMLGNBQWMsRUFBRSx3QkFBd0IsRUFDeEMsZ0JBQWdCLEVBQ2hCLHNCQUFzQixFQUN0QixxQkFBcUIsRUFBRSxxQkFBcUIsRUFBRSxpQkFBaUIsRUFDL0QsaUJBQWlCLEVBQ2pCLHlCQUF5QixFQUMxQixNQUFNLGFBQWEsQ0FBQzs7QUFFckIsSUFBTSxVQUFVLEdBQUc7SUFDakIsY0FBYyxFQUFFLHdCQUF3QjtJQUN4QyxnQkFBZ0I7SUFDaEIsc0JBQXNCO0lBQ3RCLHFCQUFxQixFQUFFLHFCQUFxQixFQUFFLGlCQUFpQjtJQUMvRCxpQkFBaUI7SUFDakIseUJBQXlCO0NBQzFCLENBQUM7O0FBRUYsSUFBTSxRQUFRLEdBQUc7SUFDZixnQkFBZ0I7SUFDaEIsb0JBQW9CO0lBQ3BCLHFCQUFxQjtJQUNyQixVQUFVLEVBQUUscUJBQXFCLEVBQUUsaUJBQWlCO0NBQ3JELENBQUM7Ozs7Ozs7O0lBaUJPLGlCQUFPOzs7O0lBQWQsVUFBZSxNQUFrQjtRQUMvQixNQUFNLENBQUM7WUFDTCxRQUFRLEVBQUUsU0FBUztZQUNuQixTQUFTLG1CQUNKLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQyxRQUFRLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7Z0JBQ3pELEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsTUFBTSxJQUFJLEVBQUUsRUFBRTtjQUNoRDtTQUNGLENBQUM7S0FDSDs7Z0JBdkJGLFFBQVEsU0FBQztvQkFDUixPQUFPLEVBQUUsRUFFUjtvQkFDRCxZQUFZLG1CQUNQLFVBQVUsQ0FDZDtvQkFDRCxTQUFTLG1CQUNKLFFBQVEsQ0FDWjtvQkFDRCxPQUFPLG1CQUNGLFVBQVUsQ0FDZDtpQkFDRjs7b0JBbkREOztTQW9EYSxTQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTW9kdWxlV2l0aFByb3ZpZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgREZQX0NPTkZJRywgRGZwQ29uZmlnIH0gZnJvbSAnLi9jbGFzcyc7XHJcblxyXG5pbXBvcnQge1xyXG4gIElkbGVMb2FkLFxyXG4gIEh0dHBFcnJvclNlcnZpY2UsXHJcbiAgUGFyc2VEdXJhdGlvblNlcnZpY2UsXHJcbiAgU2NyaXB0SW5qZWN0b3JTZXJ2aWNlLFxyXG4gIERmcFNlcnZpY2UsIERmcElER2VuZXJhdG9yU2VydmljZSwgRGZwUmVmcmVzaFNlcnZpY2VcclxufSBmcm9tICcuL3NlcnZpY2UnO1xyXG5cclxuaW1wb3J0IHtcclxuICBEZnBBZERpcmVjdGl2ZSwgRGZwQWRSZXNwb25zaXZlRGlyZWN0aXZlLFxyXG4gIERmcFNpemVEaXJlY3RpdmUsXHJcbiAgRGZwUmVzcG9uc2l2ZURpcmVjdGl2ZSxcclxuICBEZnBUYXJnZXRpbmdEaXJlY3RpdmUsIERmcEV4Y2x1c2lvbkRpcmVjdGl2ZSwgRGZwVmFsdWVEaXJlY3RpdmUsXHJcbiAgRGZwVmlkZW9EaXJlY3RpdmUsXHJcbiAgRGZwQXVkaWVuY2VQaXhlbERpcmVjdGl2ZVxyXG59IGZyb20gJy4vZGlyZWN0aXZlJztcclxuXHJcbmNvbnN0IERJUkVDVElWRVMgPSBbXHJcbiAgRGZwQWREaXJlY3RpdmUsIERmcEFkUmVzcG9uc2l2ZURpcmVjdGl2ZSxcclxuICBEZnBTaXplRGlyZWN0aXZlLFxyXG4gIERmcFJlc3BvbnNpdmVEaXJlY3RpdmUsXHJcbiAgRGZwVGFyZ2V0aW5nRGlyZWN0aXZlLCBEZnBFeGNsdXNpb25EaXJlY3RpdmUsIERmcFZhbHVlRGlyZWN0aXZlLFxyXG4gIERmcFZpZGVvRGlyZWN0aXZlLFxyXG4gIERmcEF1ZGllbmNlUGl4ZWxEaXJlY3RpdmVcclxuXTtcclxuXHJcbmNvbnN0IFNFUlZJQ0VTID0gW1xyXG4gIEh0dHBFcnJvclNlcnZpY2UsXHJcbiAgUGFyc2VEdXJhdGlvblNlcnZpY2UsXHJcbiAgU2NyaXB0SW5qZWN0b3JTZXJ2aWNlLFxyXG4gIERmcFNlcnZpY2UsIERmcElER2VuZXJhdG9yU2VydmljZSwgRGZwUmVmcmVzaFNlcnZpY2VcclxuXTtcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1xyXG5cclxuICBdLFxyXG4gIGRlY2xhcmF0aW9uczogW1xyXG4gICAgLi4uRElSRUNUSVZFU1xyXG4gIF0sXHJcbiAgcHJvdmlkZXJzOiBbXHJcbiAgICAuLi5TRVJWSUNFU1xyXG4gIF0sXHJcbiAgZXhwb3J0czogW1xyXG4gICAgLi4uRElSRUNUSVZFU1xyXG4gIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIERmcE1vZHVsZSB7XHJcbiAgc3RhdGljIGZvclJvb3QoY29uZmlnPzogRGZwQ29uZmlnKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBuZ01vZHVsZTogRGZwTW9kdWxlLFxyXG4gICAgICBwcm92aWRlcnM6IFtcclxuICAgICAgICAuLi4oY29uZmlnICYmIGNvbmZpZy5pZGxlTG9hZCA9PT0gdHJ1ZSA/IFtJZGxlTG9hZF0gOiBbXSksXHJcbiAgICAgICAgeyBwcm92aWRlOiBERlBfQ09ORklHLCB1c2VWYWx1ZTogY29uZmlnIHx8IHt9IH1cclxuICAgICAgXVxyXG4gICAgfTtcclxuICB9XHJcbn1cclxuIl19