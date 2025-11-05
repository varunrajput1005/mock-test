import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {

  constructor(private tostr: ToastrService, private router: Router) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request)
      .pipe(
        // retry(1),
        map((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            if (event.body) {
              const body = event.body;
              if (body.message && body.message !== 'Success') {
                this.tostr.success(body.message)
              }
            }
          }
          return event;
        }),
        catchError((error: HttpErrorResponse) => {
          let errorMessage = '';
          if (error.error instanceof ErrorEvent) {
            // client-side error
            errorMessage = `Error: ${error.error.message}`;
          } else {
            // server-side error
            if (error.status === 422) {
              if (error.error.hasOwnProperty('errors')) {
                const errors = error.error.errors;
                for (const e of errors) {
                  this.showError(e.field + ' - ' + e.message)
                }
              }
            } else if (error.status === 401) {
              localStorage.clear()
              this.showError(error?.error?.message || "Unauthorized User")

              this.router.navigate(['/auth/login']).then()
            } else if (error.status === 400) {
              if (error.error.hasOwnProperty('message')) {
                this.showError(error.error.message)
              }
            } else if (error.status === 403) {
              this.showError(error?.error?.message || "Unauthorized User")
              localStorage.clear()
              this.router.navigate(['/auth/login']).then()
            } else if (error.status === 500) {
              if (error.error.hasOwnProperty('message')) {
                this.showError(error?.error.message || "Unauthorized User")

              }
            }
          }
          return throwError(() => errorMessage);
        })
      )
  }

  private showError(error: string) {
    this.tostr.error(error)
  }
}
