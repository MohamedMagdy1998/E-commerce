import { Pipe, PipeTransform } from '@angular/core';
import { Iproducts } from '../../interfaces/iproducts';

@Pipe({
  name: 'searchInput'
})
export class SearchInputPipe implements PipeTransform {

  transform(productsArray:Iproducts[],text:string): Iproducts[] {
    return productsArray.filter((product)=>product.title.toLowerCase().includes(text.toLowerCase()));
  }

}
