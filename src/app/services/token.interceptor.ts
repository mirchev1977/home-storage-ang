import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
} from '@angular/common/http';
import {Observable} from "rxjs";
import {UserStoreService} from "./user-store.service";
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(public auth: UserStoreService) {
    }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const loginToken = this.auth.createLoginToken();
        const cloned = request.clone({
            setHeaders: {
                'ContentType': 'application/json',
                'Authorization': loginToken,
            },
        });
        return next.handle(cloned);
    }
}
