import { Component, inject, signal, WritableSignal } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'
import { AuthenticationService } from '../../../core/services/auth/authentication.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
selector: 'app-register',
imports: [ReactiveFormsModule],
templateUrl: './register.component.html',
styleUrl: './register.component.scss'
})
export class RegisterComponent {

  private readonly authenticationService = inject(AuthenticationService);
  private readonly router = inject (Router);
  invalidFormMessage:WritableSignal<string> = signal('');
  validFormMessage: WritableSignal<string> = signal('');
  isLoading: WritableSignal<boolean> = signal(false);


registerForm :FormGroup = new FormGroup(
  {

name:new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(20)]),
email:new FormControl(null,[Validators.required,Validators.email]),
password:new FormControl(null,[Validators.required,Validators.pattern(/^\w{6,}$/)]),
rePassword:new FormControl(null,[Validators.required]),
phone:new FormControl(null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]),

  },{validators:this.confirmPassword}
  
);

submitData():void
{
  if(this.registerForm.valid)
  {
    this.isLoading .set(true);
    this.authenticationService.confirmSignUp(this.registerForm.value).subscribe({
      next:(response)=>{
       if(response.message==='success')
       {
       setTimeout(() => {
        
        this.router.navigate(['/login']);
        
        
       }, 500);

       this.isLoading.set(false);
       this.validFormMessage =response.message;

       }
        
      },
      error:(error:HttpErrorResponse)=>{
     this.invalidFormMessage  = error.error.message;
        this.isLoading.set(false);
        
      }
  
  
  
    })
  }
  else
  {
    this.registerForm.setErrors({mismatch:true});
    this.registerForm.markAllAsTouched();
  }
  
}

confirmPassword(formGroup :AbstractControl)
{

  const password = formGroup.get('password')?.value ;
  const rePssword = formGroup.get('rePassword')?.value ;

 return  password===rePssword? null : {mismatch:true} ;


       
}

}






