import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { AuthenticationService } from '../../../core/services/auth/authentication.service';
import { Router, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {


 
  private readonly authenticationService = inject(AuthenticationService)
  private readonly router = inject (Router);
  invalidFormMessage:WritableSignal<string> = signal('');
  validFormMessage: WritableSignal<string> = signal('');
  isLoading: WritableSignal<boolean> = signal(false);


    submitData():void
     {

      this.authenticationService.confirmSignIn(this.logInForm.value).subscribe(
      
        {
          next:(response)=>{  
           
            

            if(response.message==='success')
              {
                console.log(response);    //response which has encode token 

                localStorage.setItem('token',response.token);
               
                this.authenticationService.getUserData();
                

                this.validFormMessage = response.message;
                this.isLoading.set(true);

              setTimeout(() => {
               
               this.router.navigate(['/home']);
               
               
              }, 500);
           
            }

      },
      error:(error:HttpErrorResponse)=>
        {
        this.invalidFormMessage  = error.error.message;
        this.isLoading .set(false);
                },






              }
     )


    
    
    

    }


  logInForm:FormGroup = new FormGroup
 (
  {
    email: new FormControl(null, [Validators.required]),
    password:new FormControl(null, [Validators.required, Validators.pattern(/^\w{6,}$/)])

  }
 )


}
