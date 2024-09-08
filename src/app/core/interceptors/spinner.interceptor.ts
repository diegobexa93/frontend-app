import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, finalize } from 'rxjs/operators';
import { SpinnerService } from '../../shared/services/spinner.service';

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {
  private reqCount: number = 0;

  constructor(private spinnerService: SpinnerService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.showSpinner();

    return next.handle(req).pipe(
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          this.decrementRequestCount();
        }
      }),
      finalize(() => {
        this.decrementRequestCount();
      })
    );
  }

  private showSpinner(): void {
    this.reqCount++;
    if (this.reqCount === 1) {
      this.spinnerService.show();
    }
  }

  private hideSpinner(): void {
    if (this.reqCount <= 0) {
      this.spinnerService.hide();
    }
  }

  private decrementRequestCount(): void {
    this.reqCount--;
    if (this.reqCount <= 0) {
      this.hideSpinner();
      this.reqCount = 0; // Reset to avoid negative values
    }
  }
}
