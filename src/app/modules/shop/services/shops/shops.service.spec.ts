import { TestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

import { ShopsService } from './shops.service';
import { LocalStorageService } from '../../../../services/local-storage/local-storage.service';

describe('ShopsService', () => {
  let http: HttpTestingController;
  let service: ShopsService;
  let localStorageService: LocalStorageService;
  const localStorageServiceStub = {
    getItem: (key) => {
      if (key === 'accountId') {
        return accountId;
      }
    }
  };
  const accountId = 1;
  const dataStub = [
    { id: 1, name: 'Shop 1'}
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        ShopsService,
        { provide: LocalStorageService, useValue: localStorageServiceStub }
      ]
    });
    service = TestBed.inject(ShopsService);
    localStorageService = TestBed.inject(LocalStorageService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    http.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get shops', () => {

    service.getShops()
      .subscribe((data) => {
        expect(data).toEqual(dataStub);
      });

    const req = http.expectOne(`/api/v1/accounts/${accountId}/shops`);
    expect(req.request.method).toEqual('GET');
    req.flush(dataStub);
  });

  it('should create shop', () => {
    const shop = dataStub[0];

    service.createShop({ name: shop.name })
      .subscribe((data) => {
        expect(data).toEqual(shop);
      });

    const req = http.expectOne(`/api/v1/accounts/${accountId}/shops`);
    expect(req.request.method).toEqual('POST');
    req.flush(shop);
  });
});
