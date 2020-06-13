import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AlertsService } from '../../../../services/alerts/alerts.service';
import { CustomersService } from '../../services/customers/customers.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class СustomersComponent implements OnInit {

  public customers$: Observable<any>;

  constructor(
    private route: ActivatedRoute,
    private customersService: CustomersService,
    private alertsService: AlertsService
  ) { }

  ngOnInit(): void {
    this.route.parent.params.subscribe((params) => {
      this.customers$ = this.customersService.getCustomers(+params['id'])
    })
  }
}
