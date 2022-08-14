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

	listProducts		: 	any 		= [];
	addProductForm		!: 	FormGroup;
	updateProductForm	!: 	FormGroup;
	product				 :	Product		= new Product();
	idProduct			?:	Number;
	image				 : 	String		= "../../assets/images/Products_images/image_template.png"
	url					?: 	string 		= '';
	msg					: 	any 		= '';

	constructor(
		private productService	:	ProductsService,
		private formBuilder		: 	FormBuilder,
		private router			: 	Router
		) { }

	ngOnInit() {
		this.loadAllProducts();
		this.initAddForm();
  	}

	public loadAllProducts() {
		this.productService.getAllProducts()
		.subscribe({
			next: (data: Product[]) => {
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
			image	 :	['']
		});
	}
	
	public initUpdateForm(product: Product) {
		this.updateProductForm = this.formBuilder.group({
			name		:	[product.getName()],
			price		: 	[product.getPrice()],
			quantity	: 	[product.getQuantity()],
			image		:	['']
		});
	}

	public onSubmitAdd() {
		let name 		=	this.addProductForm.get('name')?.value;
		let price		=	this.addProductForm.get('price')?.value;
		let quantity	=	this.addProductForm.get('quantity')?.value;
		// this.imagePath	 =	"../../assets/images/Products_images/image_template.png";
		let product = new Product(name, price, quantity, this.image);
		console.log(product);
		
		this.productService.registerProduct(product)
			.subscribe({
				next: (data: Product) => {
					console.log("Produit ajouté avec succès");
				},
				error: (error) => {
					console.log(error);
				}
			});
		window.location.reload();
	}

	public onSubmitUpdate() {
		let name		= this.updateProductForm.get('name')?.value;
		let price		=	this.updateProductForm.get('price')?.value;
		let quantity	=	this.updateProductForm.get('quantity')?.value;
		// this.imagePath	 	=	'../../assets/images/Products_images/image_template.png';

		let product = new Product(name, price, quantity, this.image);
		console.log(product);

		if (this.idProduct) {
			this.productService.updateProduct(this.idProduct, product)
				.subscribe({
					next: (data: Product) => {
						console.log("Modification réussie" + data);
						this.ngOnInit();
					},
					error: (error) => {
						console.log(error);
					}
				});
			// window.location.reload();
		}
	}

	public onUpdateProduct(id: Number) {
		this.idProduct = id;
		this.productService.getProductById(id)
			.subscribe({
				next: (data: Product[]) => {
					this.product.setName(data[0].name);
					this.product.setPrice(data[0].price);
					this.product.setQuantity(data[0].quantity);

					this.initUpdateForm(this.product);
				},
				error: (error) => {
					console.log(error);
				}
			});
	}

	public onDeleteProduct(id: Number) {
		if(window.confirm("Êtes-vous sûr de vouloir supprimer ce produit ?")) {
			this.productService.removeProduct(id)
				.subscribe(data => "Produit supprimé avec succès")
			window.location.reload();
		}
	}

	public selectFile(event: any) { 
		if(event.target.files[0] || event.target.files[0].length !== 0) {
			var mimeType = event.target.files[0].type;
			if (mimeType.match(/image\/*/) == null) {
				this.msg = 'Seules les images sont supportées !';
				return;
			}
			var reader = new FileReader();
			reader.readAsDataURL(event.target.files[0]);
			reader.onload = (_event) => {
				this.msg = "";
				this.url = reader.result?.toString();
			}
			console.log(this.url);
		}
	}

}
