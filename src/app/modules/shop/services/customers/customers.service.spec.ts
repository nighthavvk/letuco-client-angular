import { TestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

import { CustomersService } from './customers.service';
import { LocalStorageService } from '../../../../services/local-storage/local-storage.service';

describe('CustomersService', () => {
  let http: HttpTestingController;
  let service: CustomersService;
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
      id: 174,
      name: 'Customer 1',
      account_id: 2,
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        CustomersService,
        { provide: LocalStorageService, useValue: localStorageServiceStub }
      ]
    });
    service = TestBed.inject(CustomersService);
    localStorageService = TestBed.inject(LocalStorageService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    http.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get customers', () => {

    service.getCustomers(shopId)
      .subscribe((data) => {
        expect(data).toEqual(dataStub);
      });

    const req = http.expectOne(`/api/v1/accounts/${accountId}/customers`);
    expect(req.request.method).toEqual('GET');
    req.flush(dataStub);
  });

  it('should create customer', () => {
    const customer = dataStub[0];

    service.createCustomer({ name: customer.name })
      .subscribe((data) => {
        expect(data).toEqual(customer);
      });

    const req = http.expectOne(`/api/v1/accounts/${accountId}/customers`);
    expect(req.request.method).toEqual('POST');
    req.flush(customer);
  });
});
