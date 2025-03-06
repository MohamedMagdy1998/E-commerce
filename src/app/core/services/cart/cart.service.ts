import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { effect, Injectable, signal, WritableSignal } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private httpClient: HttpClient) {

    effect(()=>
    {

      localStorage.setItem('Cart Items',this.cartCounter.toString() ); //  side effect (clean up () ----->search)



    }
    )

   }


  cartCounter:WritableSignal<number> = signal(0);

 


  addProductToCart(id:string):Observable<any>
  {
    return this.httpClient.post('https://ecommerce.routemisr.com/api/v1/cart',
      {
        "productId": id
    },
    

    )

  }

  getLoggedUser():Observable<any>
  {
    return this.httpClient.get('https://ecommerce.routemisr.com/api/v1/cart',

     

    )
  }
  

  RemoveSpecificCartItem(id:string):Observable<any>
  {

    return this.httpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
      
    )
  }



  updateCartProductQuantity(id:string,newCount:number):Observable<any>
  {
     return this.httpClient.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,


      {
        "count": newCount
      },
      
    )
  }


  clearUserCart():Observable<any>
  {
    return this.httpClient.delete('https://ecommerce.routemisr.com/api/v1/cart',
     
    );
  }
  

}