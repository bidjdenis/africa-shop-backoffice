import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../auth/service/token-storage.service';
import { Country } from '../models/country.model';


@Injectable({
  providedIn: 'root'
})
export class CountryService {

  url: string = 'country';

  constructor(private http: HttpClient, private tokenService: TokenStorageService) { }

  getAllCountry(): Observable<any> {
    return this.http.get(`${this.url}/all`)
  }

  addCountry(unite: Country): Observable<any> {

    console.log("Dataset : ", unite)

    const token = this.tokenService.getToken();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });

    return this.http.post(`${this.url}/save`, unite, { headers: headers });
  }


  updateCountry(id: number, unit: any): Observable<any> {

    const token = this.tokenService.getToken();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.put(`${this.url}/update/${id}`, unit, { headers: headers });
  }

  deleteCountry(id: number): Observable<any> {

    const token = this.tokenService.getToken();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.delete(`${this.url}/delete/${id}`, { headers: headers });
  }

  searchCountry(name: string): Observable<any> {

    const token = this.tokenService.getToken();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get(`${this.url}/search/${name}`, { headers: headers });
  }
}
