import { Component, OnInit } from '@angular/core';
import { AlertsService } from 'src/app/services/alerts/alerts.service';

@Component({
  selector: 'app-static',
  templateUrl: './static.component.html',
  styleUrls: ['./static.component.scss']
})
export class StaticComponent implements OnInit {

  constructor(
    private alertService: AlertsService
  ) { }

  ngOnInit(): void {
    if (history.state.data && history.state.data.alertMessage) {
      this.alertService.showAlertSuccess(history.state.data.alertMessage)
    }
  }
}
