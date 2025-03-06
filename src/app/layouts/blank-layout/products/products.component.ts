import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { AllProductsService } from '../../../core/services/products/all-products.service';
import { Iproducts } from '../../../shared/interfaces/iproducts';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products',
  imports: [RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  private readonly allProductsService = inject(AllProductsService);
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);

  searchWord:WritableSignal<string>  = signal('');

  allProducts:WritableSignal<Iproducts[]> = signal([]);
  

 
  AllProducts(): void {
    this.allProductsService.getAllProducts().subscribe({
      next: (response) => {


        this.allProducts.set(response.data);

        console.log(this.allProducts);
      },
     
    }
    );
  }

  addToCart(id:string):void
  {
    this.cartService.addProductToCart(id).subscribe({
      next:(response)=>{
        console.log(response);
        if(response.status === 'success')
        {
          this.toastrService.success(response.message,'freshcart');
          this.cartService.cartCounter.set(response.numOfCartItems) ;

          console.log(this.cartService.cartCounter);
        }
      },
     
    })

  }
 


  ngOnInit(): void {
    this.AllProducts();

  }

}
