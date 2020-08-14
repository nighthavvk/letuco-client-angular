import { TestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

import { OrdersService } from './orders.service';
import { LocalStorageService } from '../../../../services/local-storage/local-storage.service';

describe('OrdersService', () => {
  let http: HttpTestingController;
  let service: OrdersService;
  let localStorageService: LocalStorageService;
  const localStorageServiceStub = {
    getItem: (key) => {
      if (key === 'accountId') {
        return accountId;
      }
    }
  };
  const accountId = 1;
  const shopId = 1;
  const dataStub = [
    {
      id: 1,
      customer_id: 1,
      status: 'new',
      seller_id: 1
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        OrdersService,
        { provide: LocalStorageService, useValue: localStorageServiceStub }
      ]
    });
    service = TestBed.inject(OrdersService);
    localStorageService = TestBed.inject(LocalStorageService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    http.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get orders', () => {

    service.getOrders(shopId)
      .subscribe((data) => {
        expect(data).toEqual(dataStub);
      });

    const req = http.expectOne(`/api/v1/accounts/${accountId}/shops/${shopId}/orders`);
    expect(req.request.method).toEqual('GET');
    req.flush(dataStub);
  });
});
