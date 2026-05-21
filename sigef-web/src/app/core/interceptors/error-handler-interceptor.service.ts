import { Injectable } from '@angular/core';
import { AuthService } from '../../data/modules/auth/services/auth.service';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerInterceptorService implements HttpInterceptor {

  constructor(
    private authService: AuthService,
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        if(err) {
          const isAuthRequest = req.url.includes('/auth/login');
          switch (err.status) {
            case 0:
              // this.authService.logout()
              console.log("Error connection refued")
              // this.router.navigateByUrl("/error")

              Swal.fire({ 
                title: '<h5 class="modal-title">Service non disponible</h5>',
                html: '<div>Patientez et réessayez plus tard ! Si le problème persiste, contactez l\'administrateur</div>',
                icon: 'error',
                showCloseButton: true,
                showCancelButton: true,
                confirmButtonText: 'Recharger',
                cancelButtonText: 'Fermer',
                customClass: {
                  htmlContainer: "text-muted fs-6",
                  confirmButton: "btn btn-primary",
                  cancelButton: "btn btn-light",
                }
              })
                .then((result) => {
                  if(result.isConfirmed) {
                    window.location.reload()
                  }
                });
              break;

            case HttpStatusCode.Unauthorized:
              if (!isAuthRequest) {
                this.authService.logout()
              }
              break;
            
            case HttpStatusCode.Forbidden:
              break;
              
            // case HttpStatusCode.InternalServerError:
            //   const navigationExtrasData: NavigationExtras = { state: {error: err.error} }
            //   this.router.navigateByUrl("/server-error", navigationExtrasData)
            //   break;

            default:
              break;
          }
        }

        return throwError(err);
      })
    )
  }
}
