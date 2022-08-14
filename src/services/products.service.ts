import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/Models/Product';

@Injectable({
  	providedIn: 'root'
})
export class ProductsService {

	apiUrl = "http://127.0.0.1:3000/products/";

	constructor(private http: HttpClient) { }

	public getAllProducts(): Observable<Product[]> {
		return this.http.get<Product[]>(this.apiUrl);
	}

	public getProductById(id: Number): Observable<Product[]> {
		return this.http.get<Product[]>(this.apiUrl + id);
	}

	public registerProduct(product: Product): Observable<Product> {
		return this.http.post<Product>(this.apiUrl, product);
	}

	public updateProduct(id: Number, product: Product): Observable<Product> {
		return this.http.patch<Product>(this.apiUrl + id, product);
	}

	public removeProduct(id: Number) {
		return this.http.delete<Product>(this.apiUrl + id);
	}
}
