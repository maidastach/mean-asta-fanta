import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { AppService } from "../../app.service";

@Injectable({ providedIn: 'root' })

export class HttpErrorInterceptorService implements HttpInterceptor
{
    constructor(private appService: AppService) {}
    
    intercept(req: HttpRequest<any>, next: HttpHandler)
    {
        console.log('request started')
        return next.handle(req)
            .pipe(
                catchError((error: HttpErrorResponse) => 
                {
                    this.appService.loadingSource.next(false)
                    console.log('interceptor caught an error')
                    //error.status for the code, error.error is my error
                    return throwError(error);  
                })
            )
    }
}