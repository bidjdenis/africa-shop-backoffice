import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEventType,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class ProgressInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.reportProgress) {
      return this.handleProgress(req, next);
    }
    return next.handle(req);
  }

  private handleProgress(req: HttpRequest<any>, next: HttpHandler):
   Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap((event) => {
        console.log(`Progress: ${event}%`);
        if (event.type === HttpEventType.DownloadProgress) {
          // Handle progress here, e.g., update a progress bar
          const progress = Math.round((100 * event.loaded) / event.total!);
          console.log(`Progress: ${progress}%`);
        }
      })
    );
  }
}
