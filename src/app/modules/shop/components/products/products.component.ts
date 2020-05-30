import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AlertsService } from 'src/app/services/alerts/alerts.service';
import { ProductsService } from '../../services/products/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  public products$: Observable<any>;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
  ) { }

  ngOnInit(): void {
    this.route.parent.params.subscribe((params) => {
      this.products$ = this.productsService.getProducts(+params['id'])
    })
  }
}
