import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertsService } from '../../../../services/alerts/alerts.service';
import { CustomersService } from '../../services/customers/customers.service';

@Component({
  selector: 'app-customer-create',
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.scss']
})
export class CustomerCreateComponent implements OnInit {

  private shopId: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertsService,
    private customersService: CustomersService
  ) { }

  ngOnInit(): void {
    this.route.parent.params.subscribe((params) => {
      this.shopId = +params.id;
    });
  }

  onSubmit(data) {
    this.customersService.createCustomer({
      name: data.name
    })
    .subscribe(
      res => {
        this.router.navigate(['shops', this.shopId, 'customers']);
      },
      err => {
        this.alertService.showAlertDanger(err.error.errors[0]);
      }
    );
  }
}
