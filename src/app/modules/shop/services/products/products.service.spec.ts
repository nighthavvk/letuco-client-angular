import { TestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

import { ProductsService } from './products.service';
import { LocalStorageService } from '../../../../services/local-storage/local-storage.service';

describe('ProductsService', () => {
  let http: HttpTestingController;
  let service: ProductsService;
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
    { id: 1, name: 'Product 1'},
    { id: 2, name: 'Product 2'},
    { id: 3, name: 'Product 3'},
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        ProductsService,
        { provide: LocalStorageService, useValue: localStorageServiceStub }
      ]
    });
    service = TestBed.inject(ProductsService);
    localStorageService = TestBed.inject(LocalStorageService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    http.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get products', () => {

    service.getProducts(shopId)
      .subscribe((data) => {
        expect(data).toEqual(dataStub);
      });

    const req = http.expectOne(`/api/v1/accounts/${accountId}/shops/${shopId}/products`);
    expect(req.request.method).toEqual('GET');
    req.flush(dataStub);
  });

  it('should create product', () => {
    const product = dataStub[0];

    service.createProduct(shopId, { name: product.name })
      .subscribe((data) => {
        expect(data).toEqual(product);
      });

    const req = http.expectOne(`/api/v1/accounts/${accountId}/shops/${shopId}/products`);
    expect(req.request.method).toEqual('POST');
    req.flush(product);
  });

  it('should update product', () => {
    const product = dataStub[0];

    service.updateProduct(shopId, product.id, { name: product.name })
      .subscribe((data) => {
        expect(data).toEqual(product);
      });

    const req = http.expectOne(`/api/v1/accounts/${accountId}/shops/${shopId}/products/${product.id}`);
    expect(req.request.method).toEqual('PUT');
    req.flush(product);
  });
});
