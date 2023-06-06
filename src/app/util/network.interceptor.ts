import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { SharedService } from '../services/shared.service';

@Injectable()
export class NetworkInterceptor implements HttpInterceptor {

  constructor(private sharedService: SharedService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log('intercept');
    this.sharedService.show();
    return next.handle(request).pipe(
      finalize(() => {
        this.sharedService.hide();
      })
    );
  }
}
