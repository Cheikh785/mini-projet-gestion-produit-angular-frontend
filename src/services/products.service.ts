import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from 'src/Models/product.model';

@Injectable({
  	providedIn: 'root'
})
export class ProductsService {

	apiUrl = "http://localhost:3000/products";

	constructor(private http: HttpClient) { }

	getAllProducts() {
		return this.http.get<Product>(this.apiUrl);
	}
}
