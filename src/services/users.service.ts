import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/Models/user.model';

@Injectable({
	providedIn: 'root'
})
export class UsersService {

	apiUrl = "http://localhost:3000/users";

	constructor(private http: HttpClient) { }

	getAllUsers() {
		return this.http.get<User>(this.apiUrl);
	}

}
