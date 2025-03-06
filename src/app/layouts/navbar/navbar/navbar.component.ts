import { CartService } from './../../../core/services/cart/cart.service';
import { Component, computed, inject, input, OnInit, Signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthenticationService } from '../../../core/services/auth/authentication.service';


@Component({
  selector: 'app-navbar',
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {

  public readonly authenticationService = inject(AuthenticationService);
  public readonly cartService = inject(CartService);

  cartItems:Signal<number> = computed(()=>  this.cartService.cartCounter()    );

  isuserLoggedIn = input<boolean>(true);

  ngOnInit(): void {

      this.cartService.getLoggedUser().subscribe({

        next:(data) =>{
          console.log('cart items',data);
          this.cartService.cartCounter.set(data.numOfCartItems);
          
        },
      })



    this.cartService.cartCounter()

   
    
  }
}
