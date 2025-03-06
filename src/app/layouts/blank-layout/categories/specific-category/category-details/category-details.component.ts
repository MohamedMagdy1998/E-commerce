import { Component, inject, OnInit } from '@angular/core';
import { AllCategoriesService } from '../../../../../core/services/categories/all-categories.service';
import { ActivatedRoute } from '@angular/router';
import { Icategories } from '../../../../../shared/interfaces/icategories';



@Component({
  selector: 'app-category-details',
  imports: [],
  templateUrl: './category-details.component.html',
  styleUrl: './category-details.component.scss'
})
export class CategoryDetailsComponent implements OnInit {

  private readonly allCategoriesService = inject(AllCategoriesService);
  private readonly activatedRoute = inject(ActivatedRoute);

  categoryId:string = '';
  specificCategoryInfo!:Icategories


  ngOnInit(): void {

    this.getSpecificCategoryId();
    this.getSpecificCategoryData();
    
  }

  getSpecificCategoryId():void
  {
    this.activatedRoute.paramMap.subscribe({
      next:(response)=>
      {
        this.categoryId = response.get('id')!;
        console.log('category id',this.categoryId);
      }
    })
  }


  getSpecificCategoryData():void
  {
    this.allCategoriesService.getSpecificCategory(this.categoryId).subscribe({

      next:(response)=>
      {

        console.log(response.data);

        this.specificCategoryInfo = response.data;
        
        
      }

    })
  }

}
