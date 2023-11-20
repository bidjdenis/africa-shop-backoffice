import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenStorageService } from '../auth/service/token-storage.service';
import { Observable } from 'rxjs';
import { UnitMeseare } from '../models/uit-meseare.model';

@Injectable({
  providedIn: 'root'
})
export class UnitMerseareService {

  url: string = 'unite_mesure';

  constructor(private http: HttpClient, private tokenService: TokenStorageService) { }

  getAllUnitMeseare(): Observable<any> {
    return this.http.get(`${this.url}/all`)
  }

  addUnitMeseare(unite: UnitMeseare): Observable<any> {

    console.log("Dataset : ", unite)

    const token = this.tokenService.getToken();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });

    return this.http.post(`${this.url}/save`, unite, { headers: headers });
  }


  updateUnitMeseare(id: number, unit: any): Observable<any> {

    const token = this.tokenService.getToken();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.put(`${this.url}/update/${id}`, unit, { headers: headers });
  }

  deleteUnitMeseare(id: number): Observable<any> {

    const token = this.tokenService.getToken();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.delete(`${this.url}/delete/${id}`, { headers: headers });
  }

  searchUnitMeseare(name: string): Observable<any> {

    const token = this.tokenService.getToken();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get(`${this.url}/search/${name}`, { headers: headers });
  }

}
