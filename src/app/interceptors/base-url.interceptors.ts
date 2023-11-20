import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {




  private baseUrl = 'http://localhost:8081/api/v1/'; 
 




  intercept(request: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<unknown>> {
    const apiRequest = request.clone({
      url: `${this.baseUrl}${request.url}`
    });
    return next.handle(apiRequest);
  }
}
