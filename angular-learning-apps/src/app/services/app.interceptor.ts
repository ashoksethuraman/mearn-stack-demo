import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

export const appInterceptor: HttpInterceptorFn = (req, next) => {
    const appName = 'Webserver';

    const clonedReq = req.clone({
        setHeaders: {
            appName: appName
        }
    });

    console.log('request ::', clonedReq);

    return next(clonedReq).pipe(
        switchMap((event) => {
            // its converting the  object from array responses. 
            // if (event instanceof HttpResponse) {
            //     let modifiedBody: any;

            //     if (event.body && typeof event.body === 'object') {
            //         modifiedBody = {
            //             ...event.body,
            //             processedAt: new Date().toISOString()
            //         };
            //     } else {
            //         // fallback if body is null / string / something else
            //         modifiedBody = { data: event.body, processedAt: new Date().toISOString() };
            //     }
            //     console.log('Modified response ::', modifiedBody);
            //     return of(event.clone({ body: modifiedBody }));
            // }
            return of(event);
        })
    );
};
