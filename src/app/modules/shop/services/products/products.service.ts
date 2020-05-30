import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from '../../../../services/local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private accountId = parseInt(this.localStorage.getItem('accountId'))

  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService
  ) { }

  getProducts(shopId) {
    return this.http.get(`/api/v1/accounts/${this.accountId}/shops/${shopId}/products`);
  }

  createProduct(shopId, data: any) {
    return this.http.post(`/api/v1/accounts/${this.accountId}/shops/${shopId}/products`, data);
  }

  updateProduct(shopId, productId, data: any) {
    return this.http.put(`/api/v1/accounts/${this.accountId}/shops/${shopId}/products/${productId}`, data);
  }
}
