import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { OrdersService } from '../../services/orders/orders.service';
import { AlertsService } from '../../../../services/alerts/alerts.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  public orders$: Observable<any>;

  constructor(
    private route: ActivatedRoute,
    private ordersService: OrdersService,
    private alertsService: AlertsService
  ) { }

  ngOnInit(): void {
    this.route.parent.params.subscribe((params) => {
      this.orders$ = this.ordersService.getOrders(+params['id'])
    });
  }
}
