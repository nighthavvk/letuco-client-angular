import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { combineLatest, Subject } from 'rxjs';
import { AlertsService } from '../../../../services/alerts/alerts.service';
import { ProductsService } from '../../services/products/products.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {

  private shopId: number;
  private productId: number;

  public product$: any = new Subject();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertsService,
    private productsService: ProductsService
  ) { }

  ngOnInit(): void {
    const params$ = this.route.params;
    const parentParams$ =  this.route.parent.params;

    combineLatest([params$, parentParams$])
      .subscribe(([params, parentParams]) => {
        if (params.id && parentParams.id) {
          this.shopId = +parentParams.id;
          this.productId = +params.id;

          this.productsService.getProducts(this.shopId)
            .subscribe(
              (res: any) => {
                const product = res.find(prod => prod.id === this.productId);
                this.product$.next(product);
              },
              err => {
                this.alertService.showAlertDanger(err.error.errors[0]);
              });
        }
      });
  }

  onSubmit(data) {
    this.productsService.updateProduct(this.shopId, this.productId, {
      name: data.name
    })
    .subscribe(
      res => {
        this.router.navigate(['shops', this.shopId, 'products']);
      },
      err => {
        this.alertService.showAlertDanger(err.error.errors[0]);
      }
    );
  }
}
