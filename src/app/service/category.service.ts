import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../auth/service/token-storage.service';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  url: string = 'product_category';

  constructor(private http: HttpClient, private tokenService: TokenStorageService) { }

  getAllCategorie(): Observable<any> {
    return this.http.get(`${this.url}/all`)
  }

  addCategorie(category: any): Observable<any> {

    const token = this.tokenService.getToken();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });

    return this.http.post(`${this.url}/save`, category, { headers: headers });
  }


  updateCategorie(id: number, category: Category): Observable<any> {

    const token = this.tokenService.getToken();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.put(`${this.url}/update/${id}`, category, { headers: headers });
  }

  deleteCategorie(id: number): Observable<any> {

    const token = this.tokenService.getToken();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.delete(`${this.url}/delete/${id}`, { headers: headers });
  }

  searchCategorie(name: string): Observable<any> {

    const token = this.tokenService.getToken();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get(`${this.url}/search/${name}`, { headers: headers });
  }


}
