import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Environment } from '../../Enviroment/Environment';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private httpClient: HttpClient) { };

  private readonly router = inject(Router)

  userData:any;   // must be interface has user data after decode token


  confirmSignUp(registerData:object):Observable<any>
  {
    return this.httpClient.post(`${Environment.baseUrl}/api/v1/auth/signup`,registerData);
  }

  confirmSignIn(loginData:object):Observable<any>
  {
    return this.httpClient.post(`${Environment.baseUrl}/api/v1/auth/signin`,loginData);
  }


  getUserData():void     // login
  {
   this.userData =  jwtDecode(localStorage.getItem('token') !); // to be sure that isn't equal null value
      console.log(this.userData);  // after decode token
      
  }


  RemoveUserData():void     // logout
  {

    localStorage.removeItem('token');

    this.userData = null;

    this.router.navigate(['/login']);


    

  }


    forgetPasswordApi(data:object):Observable<any>
    {
      return this.httpClient.post(`${Environment.baseUrl}/api/v1/auth/forgotPasswords`,data);
    }


    resetCodeApi(data:object):Observable<any>
    {
      return this.httpClient.post(`${Environment.baseUrl}/api/v1/auth/verifyResetCode`,data);
    }


    resetPasswordApi(data:object):Observable<any>
    {

      return this.httpClient.put(`${Environment.baseUrl}/api/v1/auth/resetPassword`,data)

    }


}
