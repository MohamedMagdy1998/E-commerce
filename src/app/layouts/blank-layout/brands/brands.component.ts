import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { BrandsService } from '../../../core/services/brands/brands.service';
import { Brands } from '../../../shared/interfaces/ibrands';



@Component({
  selector: 'app-brands',
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit {

    private readonly brandsService = inject(BrandsService);

    brandsData:WritableSignal<Brands[]> = signal([]);

  ngOnInit(): void {
    this.getBrands();
  }

  getBrands():void
  {
    this.brandsService.getAllBrands().subscribe({

     next:(response)=> {
      console.log(response.data);

      this.brandsData.set(response.data);


     },
   


    })


}





}