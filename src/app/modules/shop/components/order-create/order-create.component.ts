import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertsService } from '../../../../services/alerts/alerts.service';
import { OrdersService } from '../../services/orders/orders.service';
import { GoogleAnalyticsService } from '../../../../services/google-analytics/google-analytics.service';

@Component({
  selector: 'app-order-create',
  templateUrl: './order-create.component.html',
  styleUrls: ['./order-create.component.scss']
})
export class OrderCreateComponent implements OnInit {

  private shopId: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertsService,
    private ordersService: OrdersService,
    private googleAnalyticsService: GoogleAnalyticsService
  ) { }

  ngOnInit(): void {
    this.route.parent.params.subscribe((params) => {
      this.shopId = +params.id;
    });
  }

  onSubmit(data) {
    this.ordersService.createOrder(this.shopId, {
      order: {
        status: data.status,
        customer_id: data.customerId,
        products: data.products
      }
    })
    .subscribe(
      res => {
        this.googleAnalyticsService.eventEmitter('order_create', 'order', 'create', 'click', 10);
        this.router.navigate(['shops', this.shopId, 'orders']);
      },
      err => {
        this.alertService.showAlertDanger(err.error.errors[0]);
      }
    );
  }
}
