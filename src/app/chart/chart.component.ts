import { Component, OnInit, Input, OnChanges } from '@angular/core';
import * as Highcharts from 'highcharts';
import { HttpClient } from '@angular/common/http';
declare const require;
require('highcharts/modules/exporting')(Highcharts);
require('highcharts/modules/funnel')(Highcharts);

@Component({
  selector: 'chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, OnChanges {
  @Input() options: any;
  Highcharts: typeof Highcharts | any = Highcharts; // required.
  chartConstructor: string = 'chart'; // optional string, defaults to 'chart'
  data: any;
  chartOptions: Highcharts.Options;  // required
  chartCallback: Highcharts.ChartCallbackFunction = function (chart) { }; // optional function, defaults to null
  updateFlag: boolean = false; // optional boolean
  oneToOneFlag: boolean = true; // optional boolean, defaults to false
  runOutsideAngular: boolean = false; // optional boolean, defaults to false
  constructor(private http: HttpClient) { }
  ngOnInit() {

    this.http.get('https://cdn.jsdelivr.net/gh/highcharts/highcharts@v7.0.0/samples/data/usdeur.json').subscribe(
      (data: any) => {
        // (<any>this.chartOptions.series[0]).data = data;
        // this.updateFlag = true;
      })
  }
  ngOnChanges() {
    this.chartOptions =  {
      chart: {
        zoomType: 'x',
        backgroundColor: '#f9f9f9'
      },
      title: {
        text: 'USD to EUR exchange rate over time'
      },
      subtitle: {
        text: document.ontouchstart === undefined ?
          'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
      },
      xAxis: {
        type: 'datetime',
      },
      yAxis: {
        title: {
          text: 'Exchange rate'
        }
      },
      legend: {
        enabled: false
      },
      plotOptions: {
        area: {
          fillColor: {
            linearGradient: {
              x1: 0,
              y1: 0,
              x2: 0,
              y2: 1
            },
            stops: [
              [0, this.Highcharts.getOptions().colors[0]],
              [1, this.Highcharts.Color(this.Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
            ]
          },
          marker: {
            radius: 2
          },
          lineWidth: 1,
          states: {
            hover: {
              lineWidth: 1
            }
          },
          threshold: null
        }
      },
  
      series: [{
        data: [100, 2, 3, 10, 4, 1],
        type: "pie",
        name: 'USD to EUR'
      }]
    };
  }

}
