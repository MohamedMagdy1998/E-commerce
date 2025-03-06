import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { CartService } from '../../../core/services/cart/cart.service';
import { ICart } from '../../../shared/interfaces/i-cart';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe,RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {

  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);
  

  

  cartDetails:WritableSignal<ICart> = signal({} as ICart);

  

  getCartData():void
  {

    this.cartService.getLoggedUser().subscribe(

      {

        next:(response)=>{
        console.log(response);
        localStorage.setItem('cartOwnerId',response.data.cartOwner);
        
        

        this.cartDetails.set(response.data) ;

        localStorage.setItem('cartOwnerId',response.data.cartOwner);
          
        },
  
      }




    )

  }

  ngOnInit(): void {
    this.getCartData();
    
  }


  removeProduct(id:string)
  {
    this.cartService.RemoveSpecificCartItem(id).subscribe(
      {
        next:(response)=>
        {
          console.log(response);
          if(response.status === 'success')
          this.toastrService.success('Product removed successfully');

         this.cartDetails.set(response.data) ;

    this.cartService.cartCounter.set(response.numOfCartItems); // update items counter when remove 
          
        },

      

      }
    )
  }

  updateProductCount(id:string,newCount:number):void
  {

    this.cartService.updateCartProductQuantity(id,newCount).subscribe(
      {

        next:(response)=>
        {
          this.cartDetails .set(response.data) ;
          
        },

      



      }
    )

  }


    
  clear(): void {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.cartService.clearUserCart().subscribe({
          next: (response) => {
            console.log(response);
            if (response.message === 'success') {
              this.cartDetails.set({} as ICart) ;


              this.cartService.cartCounter.set(response.numOfCartItems); // update when clear all
            }
  
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success"
            });
          },
        
        });
      }
    });
  }



}


