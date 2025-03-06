import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from '../../../core/services/orders/orders.service';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {

  private readonly formBuilder = inject(FormBuilder);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly ordersService = inject(OrdersService);

  cartId:string = '';

  checkOutForm !:FormGroup;

  initiateForm():void
  {
    this.checkOutForm = this.formBuilder.group({
      details:[null,[Validators.required,Validators.minLength(3)]],
      phone:[null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]],
      city:[null,[Validators.required,Validators.minLength(3)]]
    })
  }

  ngOnInit(): void {

   this.initiateForm();
   this.getCartId();
    
  }

  getCartId():void
  {

   this.activatedRoute.paramMap.subscribe({
    next:(response)=>
    {
    this.cartId = response.get('cartId') !;
      
    },
    


  }

  )

  }


      submitForm():void
      {
        console.log(this.checkOutForm.value);
        
        this.ordersService.checkOutPayment(this.cartId,this.checkOutForm.value).subscribe({
          next(value) {
            console.log(value);
            
        if(value.status==='success')
          open(value.session.url,'_self') 
          },
          
        })

      }

}
