import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { AllCategoriesService } from '../../../core/services/categories/all-categories.service';
import { Icategories } from '../../../shared/interfaces/icategories';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-categories',
  imports: [RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {
  private readonly allCategoriesService = inject(AllCategoriesService);

  allcategories:WritableSignal<Icategories[]> = signal([]) ;

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories():void
  {
    this.allCategoriesService.getAllCategories().subscribe({

      next:(response)=>
      {
        console.log(response);
        this.allcategories.set(response.data);
      }

    })
  }

}
