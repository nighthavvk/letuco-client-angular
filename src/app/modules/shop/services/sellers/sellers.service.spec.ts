import { TestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

import { SellersService } from './sellers.service';

describe('SellersService', () => {
  let http: HttpTestingController;
  let service: SellersService;
  const dataStub = [
    { id: 1, email: 'test@email.com' },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        SellersService
      ]
    });
    service = TestBed.inject(SellersService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    http.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send invite', () => {

    service.invite({ email: dataStub[0].email })
      .subscribe((data) => {
        expect(data).toEqual(dataStub);
      });

    const req = http.expectOne('/api/v1/sellers/invite');
    expect(req.request.method).toEqual('POST');
    req.flush(dataStub);
  });
});
