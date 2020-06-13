import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SellersService {

  constructor(
    private http: HttpClient
  ) { }

  getShops(data) {
    return this.http.post(`/api/v1/sellers/invite`, data);
  }
}
