import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorsInterceptor: HttpInterceptorFn = (req, next) => {

  const   toastrService  = inject(ToastrService);


  return next(req).pipe(catchError((error) => {

    console.log('interceptor',error.error.message);

    toastrService.error(error.error.message,'Fresh Cart');


    



    return throwError(()=> error);
  }
  
  
))
  
  
  ;
};
