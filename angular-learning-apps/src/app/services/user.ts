import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  file: Object;
  dateOfBirth?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {
  }

  getUsers(): Observable<any[]> {
    return this.http.get<User[]>('http://localhost:3010/user');
  }

  registerUser(user: any): Observable<any> {
    for (const pair of Object.entries(user)) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }
    return this.http.post('http://localhost:3010/user/create', user);
  }

}
