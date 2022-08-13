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
	user			: 	User 		= new User();
	updatedId 	   ?: 	Number;
	updatedUser		: 	User 		= new User();
	addUserForm	   !: 	FormGroup;
	updateUserForm !: 	FormGroup;
	firstname		: 	String 		= "";

	constructor(
		private userService	:	UsersService, 
		private formBuilder	: 	FormBuilder, 
		private router		: 	Router
	) { }

	public ngOnInit() {
		this.loadAllUsers();
		this.initAddForm();
	}

	public loadAllUsers() {
		this.userService.getAllUsers()
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

	public initUpdateForm(user: User) {
		this.updateUserForm = this.formBuilder.group({
			firstname : [user.getFirstName()],
			lastname  : [user.getLastName()],
			address   : [user.getAddress()]
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
			// window.location.reload();
			this.loadAllUsers();
			this.ngOnInit();
	}

	public onUpdateUser(id: Number) {
		this.updatedId = id;
		this.userService.getUserById(id)
		.subscribe({
			next: (data: User[]) => {
				this.user.setFirstName(data[0].firstname);
				this.user.setLastName(data[0].lastname);
				this.user.setAddress(data[0].address);

				this.initUpdateForm(this.user);
			},
			error: (error) => {
				console.log(error);
			}
		});
	}

	public onSubmitUpdate() {
		if (this.updateUserForm) {
			this.updatedUser.firstname = this.updateUserForm.get('firstname')?.value;
			this.updatedUser.lastname = this.updateUserForm.get('lastname')?.value;
			this.updatedUser.address = this.updateUserForm.get('address')?.value;
		}

		console.log(this.updateUserForm);
		if (this.updatedId) {
			this.userService.updateUser(this.updatedId, this.updatedUser)
				.subscribe({
					next: (data: User) => {
						console.log("Modification réussie" + data);
					},
					error: (error) => {
						console.log(error);
					}
				});
		}
		window.location.reload();
	}

	public onDeleteUser(id: Number) {
		if(window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
			this.userService.removeUser(id)
				.subscribe(data => this.ngOnInit())
			// window.location.reload();
			this.loadAllUsers();
			this.ngOnInit();
		}
	}

}
