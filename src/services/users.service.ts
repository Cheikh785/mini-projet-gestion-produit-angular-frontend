import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/Models/User';

@Injectable({
	providedIn: 'root'
})
export class UsersService {

	apiUrl = "http://127.0.0.1:3000/users/";

	constructor(private http: HttpClient) { }

	public getAllUsers(): Observable<User[]> {
		return this.http.get<User[]>(this.apiUrl);
	}

	public getUserById(id: Number): Observable<User[]> {
		return this.http.get<User[]>(this.apiUrl + id);
	}

	public registerUser(user: User): Observable<User> {
		return this.http.post<User>(this.apiUrl, user);
	}

	updateUser(id: Number, user: User): Observable<User> {
		return this.http.patch<User>(this.apiUrl + id, user);
	}

	removeUser(id: Number) {
		return this.http.delete<User>(this.apiUrl + id);
	}

}
