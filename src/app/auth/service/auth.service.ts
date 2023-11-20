import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  

  getToken() {
    const token = localStorage.getItem('token');
    return token;
  }

  login(login: Login): Observable<any> {
    return this.http.post(`login`, login);
  }

  getUser(): Observable<any> {

    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get(`user-details`, { headers: headers });

  }
}
