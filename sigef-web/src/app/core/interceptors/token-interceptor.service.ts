import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../data/modules/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(
    private authService: AuthService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token: string | null = this.authService.getAuthToken()

    if(token != null) {
      let request = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      })

      return next.handle(request)
    }
    
    return next.handle(req)
  }

}
