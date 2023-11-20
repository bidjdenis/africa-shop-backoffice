import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../auth/service/token-storage.service';
import { Product } from '../models/product.model';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url: string = 'product';

  constructor(private http: HttpClient, private tokenService: TokenStorageService) { }

  getAllProduct(): Observable<any> {
    return this.http.get(`${this.url}/not-publish/all`)
  }

  addProduct(unite: Product): Observable<any> {

    console.log("Dataset : ", unite)

    const token = this.tokenService.getToken();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });

    return this.http.post(`${this.url}/save`, unite, { headers: headers });
  }




  updateProduct(id: number, unit: any): Observable<any> {

    const token = this.tokenService.getToken();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.put(`${this.url}/update/${id}`, unit, { headers: headers });
  }

  publishProduct(id: number): Observable<any> {

    const token = this.tokenService.getToken();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get(`${this.url}/${id}/publish`, { headers: headers });
  }

  deleteProduct(id: number): Observable<any> {

    const token = this.tokenService.getToken();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.delete(`${this.url}/delete/${id}`, { headers: headers });
  }

  uploadProduct(id: number, file: File): Observable<any> {

    const formData = new FormData();
    formData.append('files', file);
    const token = this.tokenService.getToken();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.post(`${this.url}/upload/${id}`, formData, { headers: headers });
  }

  searchProduct(name: string): Observable<any> {

    const token = this.tokenService.getToken();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get(`${this.url}/search/${name}`, { headers: headers });
  }
}
