import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Environment } from '../../Enviroment/Environment';

@Injectable({
  providedIn: 'root'
})
export class AllProductsService {


  // get all products and specific product by id  together


  constructor(private httpClient: HttpClient) {
  }

  getAllProducts(): Observable<any> {

    return this.httpClient.get(`${Environment.baseUrl}/api/v1/products`);


  }

  getSpecificProduct(id: string): Observable<any> {
    return this.httpClient.get(`${Environment.baseUrl}/api/v1/products/${id}`);
  }



}
