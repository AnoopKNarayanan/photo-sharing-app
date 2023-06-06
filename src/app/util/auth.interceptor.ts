import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, finalize, tap } from 'rxjs';
import { SharedService } from '../services/shared.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private sharedService: SharedService, private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.sharedService.show();
    if(request.headers.get('noauth'))
      return next.handle(request.clone());
    else{
      const reqClone = request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + this.sharedService.getToken())
      });
      return next.handle(reqClone).pipe(
        tap({
          next: (event: HttpEvent<any>) => {}, 
          error: (err) => {
            if(err.error.auth == false)
              this.router.navigateByUrl('/login');
          }
        }),
        finalize(() => {
          this.sharedService.hide();
        })
      );
    }
  }
}
