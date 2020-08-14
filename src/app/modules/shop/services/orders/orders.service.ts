import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../../../../services/local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private accountId: number = parseInt(this.localStorage.getItem('accountId'))

  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService,
  ) { }

  getOrders(shopId: number): Observable<any> {
    return this.http.get(`/api/v1/accounts/${this.accountId}/shops/${shopId}/orders`);
  }
}
