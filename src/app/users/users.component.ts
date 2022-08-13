import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/services/users.service';
import { User } from '../Models/User';

@Component({
	selector: 'app-users',
	templateUrl: './users.component.html',
	styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

	listUsers		:	any 		= [];
	user			: 	User 		= new User("", "", "");
	updatedId 		?: 	Number;
	updatedUser		: 	User 		= new User();
	addUserForm		!: 	FormGroup;
	updateUserForm	!: 	FormGroup;
	firstname		: 	String 		= "";

	constructor(
		private userService	:	UsersService, 
		private formBuilder	: 	FormBuilder, 
		private router		: 	Router
	) { }

	public async ngOnInit(): Promise<void> {
		this.loadAllUsers();
		this.initAddForm();
		this.initEditForm();
	}

	public async loadAllUsers() {
		await this.userService.getAllUsers()
		.subscribe({
			next: (data: any) => {
				this.listUsers = data;
			},
			error: (error) => {
				console.log(error);
			}
		}
		);
	}

	public initAddForm() {
		this.addUserForm = this.formBuilder.group({
			firstname : ['', Validators.required],
			lastname  : ['', Validators.required],
			address   : ['', Validators.required]
		})
	}

	public initEditForm() {
		this.updateUserForm = this.formBuilder.group({
			firstname : [this.user.firstname, Validators.required],
			lastname  : [this.user.lastname, Validators.required],
			address   : [this.user.address, Validators.required]
		})
	}

	public onSubmitAdd() {
		let firstName	=	this.addUserForm.get('firstname')?.value;
		let lastName 	=	this.addUserForm.get('lastname')?.value;
		let address 	= 	this.addUserForm.get('address')?.value;

		let user = new User(firstName, lastName, address);

		this.userService.registerUser(user)
			.subscribe({
				next: (data: User) => {
					console.log(data);
				},
				error: (error) => {
					console.log(error);
				}
			});
		window.location.reload();
	}

	public async onUpdateUser(id: Number) {
		await this.userService.getUserById(id)
		.subscribe({
			next: (data: any) => {
				this.user = data;
				console.log(this.user.firstname);
				sessionStorage.setItem('firstNameSession', this.user.firstname+"");
				sessionStorage.setItem('lastNameSession', this.user.lastname+"");
				sessionStorage.setItem('addressSession', this.user.address+"");
				this.initEditForm();
				// console.log(this.user);
			},
			error: (error) => {
				console.log(error);
			}
		});
		console.log(sessionStorage.getItem('firstNameSession'));
	}

	public onSubmitUpdate() {
		if (this.updateUserForm) {
			this.updatedUser.firstname = this.updateUserForm.get('firstname')?.value;
			this.updatedUser.firstname = this.updateUserForm.get('lastname')?.value;
			this.updatedUser.firstname = this.updateUserForm.get('address')?.value;
		}

		if (this.updatedId) {
			this.userService.updateUser(this.updatedId, this.updatedUser)
				.subscribe(
					(data: User) => {
						this.ngOnInit();
					}
				)
		}
		window.location.reload();
	}

	public onDeleteUser(id: Number) {
		if(window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
			this.userService.removeUser(id)
				.subscribe(data => this.ngOnInit())
			window.location.reload();
		}
	}

}
