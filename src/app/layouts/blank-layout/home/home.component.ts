import { CarouselModule } from 'ngx-owl-carousel-o';
import { AllCategoriesService } from './../../../core/services/categories/all-categories.service';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { AllProductsService } from '../../../core/services/products/all-products.service';
import { Iproducts } from '../../../shared/interfaces/iproducts';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Icategories } from '../../../shared/interfaces/icategories';
import { SearchInputPipe } from '../../../shared/pipes/search-product-input/search-input.pipe';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-home',
  imports: [CarouselModule,SearchInputPipe,FormsModule,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  private readonly allProductsService = inject(AllProductsService);
  private readonly allCategoriesService = inject(AllCategoriesService);
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);


  

  searchWord:WritableSignal<string>  = signal('');

  allProducts:WritableSignal<Iproducts[]> = signal([]);
  allCategories :WritableSignal<Icategories[]> = signal([]);


 

  mainSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    autoplay:true,
    autoplayTimeout:3000,
  autoplayHoverPause:true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    nav: true
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    autoplay:true,
    autoplayTimeout:3000,
  autoplayHoverPause:true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['<i class="fa-solid text-gray-950 fa-arrow-left"></i>', '<i class="fa-solid text-gray-950 fa-arrow-right"></i>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }

  AllProducts(): void {
    this.allProductsService.getAllProducts().subscribe({
      next: (response) => {


        this.allProducts.set(response.data);

        console.log(this.allProducts);
      },
     
    }
    );
  }


  AllCategories(): void {
    this.allCategoriesService.getAllCategories().subscribe({
      next: (response) => {

        console.log(response.data);
        this.allCategories.set(response.data);




      },
     
    })
  }


  ngOnInit(): void {
    this.AllProducts();



    this.AllCategories();
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





}





