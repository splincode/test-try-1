import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { tuiCreateTokenFromFactory } from '@taiga-ui/cdk/utils';
/**
 * SSR safe default empty Range
 */
export const TUI_RANGE = tuiCreateTokenFromFactory(() => isPlatformBrowser(inject(PLATFORM_ID)) ? new Range() : {});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFuZ2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jZGsvdG9rZW5zL3JhbmdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ2xELE9BQU8sRUFBQyxNQUFNLEVBQUUsV0FBVyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ2xELE9BQU8sRUFBQyx5QkFBeUIsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBRTlEOztHQUVHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sU0FBUyxHQUFHLHlCQUF5QixDQUFDLEdBQUcsRUFBRSxDQUNwRCxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUUsRUFBdUIsQ0FDbEYsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7aXNQbGF0Zm9ybUJyb3dzZXJ9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge2luamVjdCwgUExBVEZPUk1fSUR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHt0dWlDcmVhdGVUb2tlbkZyb21GYWN0b3J5fSBmcm9tICdAdGFpZ2EtdWkvY2RrL3V0aWxzJztcblxuLyoqXG4gKiBTU1Igc2FmZSBkZWZhdWx0IGVtcHR5IFJhbmdlXG4gKi9cbmV4cG9ydCBjb25zdCBUVUlfUkFOR0UgPSB0dWlDcmVhdGVUb2tlbkZyb21GYWN0b3J5KCgpID0+XG4gICAgaXNQbGF0Zm9ybUJyb3dzZXIoaW5qZWN0KFBMQVRGT1JNX0lEKSkgPyBuZXcgUmFuZ2UoKSA6ICh7fSBhcyB1bmtub3duIGFzIFJhbmdlKSxcbik7XG4iXX0=