import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NotificationService } from '../app/services/notification.service';

@Injectable({
  providedIn: 'root',
})
export class WebInterceptor implements HttpInterceptor {
  constructor(private router: Router, private ns: NotificationService) {}

  showError(err: any): Observable<any> {
    const str = JSON.stringify(err);
    const msg = err.error ? err.error.error || str : str;
    this.ns.notify(msg, 5000);
    throw err;
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: any) => {
        if (error) {
          switch (error.status) {
            case 401:
              this.showError(error);
              break;
            case 404:
              this.router.navigateByUrl('/not-found');
              break;
            default:
              this.showError(error);
              console.log(error);
              break;
          }
        }
        return Observable.throw(error);
      })
    );
  }
}
