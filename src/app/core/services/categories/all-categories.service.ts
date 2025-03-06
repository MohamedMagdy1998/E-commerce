import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Environment } from '../../Enviroment/Environment';

@Injectable({
  providedIn: 'root'
})
export class AllCategoriesService implements OnInit {

  constructor( private httpClient: HttpClient) { }

  getAllCategories():Observable<any>
  {
    return this.httpClient.get(`${Environment.baseUrl}/api/v1/categories`);
  }

  getSpecificCategory(id:string):Observable<any>
  {
    return this.httpClient.get(`${Environment.baseUrl}/api/v1/categories/${id}`);
  }

  ngOnInit(): void {
      this.getAllCategories();
     
  }

}
