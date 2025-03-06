import { Component, inject, OnInit } from '@angular/core';
import {  FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../../core/services/auth/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  imports: [ReactiveFormsModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent implements OnInit {

  private readonly formBuilder = inject(FormBuilder);
  private readonly authenticationService = inject(AuthenticationService);
  private readonly router = inject(Router);

  isLoading:boolean = false;

  step: number = 1;

  verifyEmail! : FormGroup ;
  verifyCode !: FormGroup ;
  resetPassword !: FormGroup ;

  validEmail():void
  {
    this.verifyEmail = this.formBuilder.group({

      email:[null,[Validators.required,Validators.email]],
  
  
     })
  }


  validCode():void
  {

    this.verifyCode = this.formBuilder.group({

      resetCode:[null,[Validators.required,Validators.pattern(/^[0-9]{6}$/)]]
    })

  }


  validPassword():void
  {

    this.resetPassword = this.formBuilder.group({

      email:[null,[Validators.required,Validators.email]],

      newPassword:[null,Validators.required,Validators.pattern(/^\w{6,}$/)],
      
    })

  }


  ngOnInit(): void
   {

    this.validEmail();
    this.validCode();
    this.validPassword();




   

  }


  submitEmail():void
  {

    let emailValue = this.verifyEmail.get('email')?.value;
    
    this.resetPassword.get('email')?.patchValue(emailValue);

    this.authenticationService.forgetPasswordApi(this.verifyEmail.value).subscribe(
      {

        next:(response)=>{

            console.log(response);

            if(response.statusMsg==='success')
            {
              this.isLoading = true;
              this.step = 2;
            }
            this.isLoading = false;
            
        },
        error:(err)=> {

          console.log(err);
          
          
        },

         



    }
  
  
  
  
  
  
  
  
  
  );
    








  }

  submitCode():void
  {
    
    this.authenticationService.resetCodeApi(this.verifyCode.value).subscribe({
     
      next:(response)=>
      {
        console.log(response);
        if (response.status=='Success') {
          this.isLoading = true;
          this.step = 3;
          
        }
        this.isLoading = false;
        
      },
      error:(err)=> {
      console.log(err);


    }
    })
  }

  submitAccount():void
  {
    
    this.authenticationService.resetPasswordApi(this.resetPassword.value).subscribe({
      next:(response)=>
      {
        console.log(response);
        if (response.statusMsg==='Success') {
          this.isLoading = true;
          localStorage.setItem('token',response.token);
          this.authenticationService.getUserData();

          this.router.navigate(['/home']);
          
        }
        
      },
      error:(err)=> {
      console.log(err);


    }
    })
  }







}
