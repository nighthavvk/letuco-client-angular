import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../../../../services/local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  private accountId = parseInt(this.localStorage.getItem('accountId'))

  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService,
  ) { }

  getCustomers(): Observable<any> {
    return this.http.get(`/api/v1/accounts/${this.accountId}/customers`);
  }

  createCustomer(data: { name: string }): Observable<any> {
    return this.http.post(`/api/v1/accounts/${this.accountId}/customers`, data);
  }
}
