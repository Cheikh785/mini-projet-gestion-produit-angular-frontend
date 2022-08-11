import { Component, OnInit } from '@angular/core';
import { Product } from 'src/Models/product.model';
import { ProductsService } from 'src/services/products.service';

@Component({
	selector: 'app-products',
	templateUrl: './products.component.html',
	styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

	listProducts: any = [];

	constructor(private productService: ProductsService) { }

	ngOnInit() {
		this.productService.getAllProducts()
			.subscribe({
				next: (data: Product) => {
					this.listProducts = data;
					console.log(this.listProducts);
				},
				error: (error) => {
					console.log(error);
				}
			});
  	}

}
