import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductsService } from 'src/services/products.service';
import { Product } from '../Models/Product';

@Component({
	selector: 'app-products',
	templateUrl: './products.component.html',
	styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

	listProducts: any = [];
	addProductForm!: FormGroup;

	constructor(
		private productService: ProductsService,
		private formBuilder: FormBuilder,
		private router: Router
		) { }

	ngOnInit() {
		this.loadAllProducts();
		this.initAddForm();	
  	}

	public loadAllProducts() {
		this.productService.getAllProducts()
		.subscribe({
			next: (data: Product) => {
				this.listProducts = data;
				// console.log(this.listProducts);
			},
			error: (error) => {
				console.log(error);
			}
		});
	}

	public initAddForm() {
		this.addProductForm = this.formBuilder.group({
			name	 :	['', Validators.required],
			price 	 :	['', Validators.required],
			quantity : 	['', Validators.required],
			Image	 :	['']
		});
	}

	public onSubmitAdd() {
		let name 		=	this.addProductForm.get('name')?.value;
		let price		=	this.addProductForm.get('price')?.value;
		let quantity	=	this.addProductForm.get('quantity')?.value;
		let image	 	=	this.addProductForm.get('image')?.value;

		let product = new Product(name, price, quantity, image);
		console.log(product);
	}
	
	public submitFileSelected(event?: Event) {
		if (event?.target) {
			let file: any = event.target;
			console.log(file);
			// console.log(file.name);
		}
	}

}
