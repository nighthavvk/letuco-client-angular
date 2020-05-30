import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from '../../../../services/local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ShopsService {

  private accountId = parseInt(this.localStorage.getItem('accountId'))

  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService
  ) { }

  getShops() {
    return this.http.get(`/api/v1/accounts/${this.accountId}/shops`);
  }

  createShop(data: any) {
    return this.http.post(`/api/v1/accounts/${this.accountId}/shops`, data);
  }
}
