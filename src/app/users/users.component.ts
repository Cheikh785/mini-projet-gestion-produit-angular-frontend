import { Component, OnInit } from '@angular/core';
import { User } from 'src/Models/user.model';
import { UsersService } from 'src/services/users.service';

@Component({
	selector: 'app-users',
	templateUrl: './users.component.html',
	styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

	listUsers: any = [];

	constructor(private userService: UsersService) { }

	ngOnInit() {
		this.userService.getAllUsers()
		.subscribe({
			next: (data: User) => {
				this.listUsers = data;
				console.log(this.listUsers);
			},
			error: (error) => {
				console.log(error);
			}
		}
		);
	}

}
