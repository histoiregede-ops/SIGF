import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { HttpLoaderService } from "../services/http-loader.service";

@Injectable({
  providedIn: 'root'
})
export class ProgressInterceptorService implements HttpInterceptor {

  constructor(private injector: Injector) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let httpLoaderService = this.injector.get(HttpLoaderService)
    httpLoaderService.show()
    
    return next.handle(req).pipe(
      finalize(() => {
        httpLoaderService.hide()
      })
    )
  }
}
