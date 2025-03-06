import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AllProductsService } from '../../../../core/services/products/all-products.service';
import { Iproducts } from '../../../../shared/interfaces/iproducts';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-details-product',
  imports: [CarouselModule],
  templateUrl: './details-product.component.html',
  styleUrl: './details-product.component.scss'
})
export class DetailsProductComponent implements OnInit {

  private readonly  activatedRoute = inject(ActivatedRoute);
  private readonly  allProductsService = inject(AllProductsService);

  productId!:string ;

  productDetails:Iproducts = {} as Iproducts ;

  getProductId():void
  {
    this.activatedRoute.paramMap.subscribe({

      next:(response)=>{
        this.productId = response.get("id")!;

          console.log(response.get("id"));
          

      },
     




    });
  }

  specificProductDetails():void{
    this.allProductsService.getSpecificProduct(this.productId).subscribe({
      next:(response) =>{
 
       console.log(response.data);
       
       this.productDetails = response.data;
       
        
      },
    })
  }



  ngOnInit(): void {

   this.getProductId();

   this.specificProductDetails();

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
  

}
