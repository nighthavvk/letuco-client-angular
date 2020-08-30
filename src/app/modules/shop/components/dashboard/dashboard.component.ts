import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Label, Color, BaseChartDirective } from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import * as moment from 'moment';
import { OrdersService } from '../../services/orders/orders.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

  private days: moment.Moment[] = this.getWeekDays();
  private orders: [];

  public orders$: Observable<any>;
  public lineChartData: ChartDataSets[];
  public lineChartLabels: Label[] = this.getLabels('week');
  public lineChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
        },
        {
          id: 'y-axis-1',
          position: 'right',
          gridLines: {
            color: 'rgba(255,0,0,0.3)',
          },
          ticks: {
            fontColor: 'red',
          }
        }
      ]
    }
  };
  public lineChartColors: Color[] = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [pluginAnnotations];

  constructor(
    private route: ActivatedRoute,
    private ordersService: OrdersService
  ) { }

  ngOnInit() {
    this.route.parent.params.subscribe((params) => {
      this.orders$ = this.ordersService.getOrders(+params.id);
    });

    this.orders$.subscribe(orders => {
      this.orders = orders;
      this.lineChartData = this.getData(orders);
    });
  }

  onDateRangeChange(value): void {
    if (value === 'week') {
      this.getWeekDays();
      this.lineChartLabels = this.getLabels(value);
      this.lineChartData = this.getData(this.orders);
    } else if (value === 'month') {
      this.getMonthDays();
      this.lineChartLabels = this.getLabels(value);
      this.lineChartData = this.getData(this.orders);
    }
  }

  getWeekDays(): moment.Moment[] {
    this.days = [];

    for (let i = 0; i <= 6; i++) {
      this.days.push(moment().weekday(i));
    }

    return this.days;
  }

  getMonthDays(): moment.Moment[] {
    const year = moment().get('year');
    const month = moment().get('month');
    this.days = [];

    for (let i = 1; i <= moment().daysInMonth(); i++) {
      this.days.push(moment([year, month, i]));
    }

    return this.days;
  }

  getLabels(type): Label[] {
    if (type === 'week') {
      return  this.days.map(day => day.format('dddd'));
    } else if (type === 'month') {
      return this.days.map(day => day.format('DD'));
    }
  }

  getData(orders): ChartDataSets[] {
    const chartData = [];
    this.days.map((day) => {
      let counter = 0;
      orders.map((order) => {
        if (moment(order.created_at).isSame(day, 'day')) {
          counter++;
        }
      });
      chartData.push(counter);
    });
    return [{ data: chartData, label: 'Orders' }];
  }
}
