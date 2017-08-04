import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { ApiService } from '../api.service';
import { environment } from '../../environments/environment';
import { Router, ActivatedRoute, Params } from '@angular/router';

declare var Plotly: any;

@Component({
  selector: 'app-ode',
  templateUrl: './ode.component.html',
  styleUrls: ['./ode.component.css'],
  providers: [ApiService]
})
export class OdeComponent implements OnInit {

  constructor(
    public http: Http,
    public ApiService: ApiService,
    public route: ActivatedRoute,
    public router: Router
  ) { }

  public apiUrl = environment.apiBaseURL;
  public showAPIField = !environment.production;
  public serverAwake = false;
  public waitingOnServer = false;
  public serverError = '';

  // Initial values
  public settings = {

    heatLight: "",
    moistureGain: "",
    volume: "",
    surfaceArea: "",
    co2Use: "",
    buildingConductance: "",

    setTemp: "",
    setRH: "",
    setCO2: "",

    costHeat: "0.0170",
    costMechcool: "0.0333",
    costMist: "0.0047",
    costDehumid: "0.0752",
    costCO2: "0.339",
    costVent: "0.0137",

    parameters: "",
    timeSpan: [0.0, 10.0],
    initialConditions: "1.0, 1.0",
    vars: "[:x, :y]",
    title: 'Greenhouse optimization'
  };

  public model: any;

public Location = [
    {name: 'Madison' , desc:  'TMY data for Madison, WI'},
    {name: 'Toledo', desc:  'TMY data for Toledo, OH'},
    {name: 'Tucson' , desc:  "TMY data for Tucson, AZ"},
    {name: 'Sacramento' , desc:  "TMY data for Sacramento, CA"},
    {name: 'San Francisco' , desc:  "TMY data for San Francisco, CA"}
  ];

  public resultsObj: any;

  ngOnInit() {
    this.wakeUp();
    var payload = this.route.snapshot.params['settings'];
    if (payload) {
      console.log('Payload is: ' + payload);
      try {
        this.settings = JSON.parse(atob(payload));
        this.solve();
      } catch(e) {
        console.log('Invalid settings in url, using default ones.  Error: ' + e);
      }
    }
    this.updateSettingsInURL();
  }

  // Take the current settings and bake them into the URL
  updateSettingsInURL() {
    return this.router.navigate(['/ode/', {
      settings: btoa(JSON.stringify(this.settings))
    }]);
  }

  solve() {
    this.updateSettingsInURL();
    // Build a model to pass to the back end -- this is mostly the same as the settings object but with some tweaks to make it better understandable to the api
    this.model = Object.assign({}, {

      heatLight: this.settings.heatLight,
      moistureGain: this.settings.moistureGain,
      volume: this.settings.volume,
      surfaceArea: this.settings.surfaceArea,
      co2Use: this.settings.co2Use,
      buildingConductance: this.settings.buildingConductance,

      setTemp: this.settings.setTemp,
      setRH: this.settings.setRH,
      setCO2: this.settings.setCO2,

      costHeat: this.settings.costHeat,
      costMechcool: this.settings.costMechcool,
      costMist: this.settings.costMist,
      costDehumid: this.settings.costDehumid,
      costCO2: this.settings.costCO2,
      costVent: this.settings.costVent,


      vars: this.settings.vars,
    });
    console.log(this.model);
    this.waitingOnServer = true;
    this.sendDiffEq();
  }

  sendDiffEq() {
    return this.ApiService.passDiffEq(this.apiUrl, this.model).subscribe(
      data => this.resultsObj = data,
      error => this.handleServerError(error),
      () => this.plot()
    );
  }

  wakeUp() {
    return this.ApiService.wakeUp(this.apiUrl).subscribe(
      data => this.serverAwake = data.awake,
      error => this.serverError = error
    );
  }


  plot() {
    var self = this;
    self.waitingOnServer = false;
    console.log(self.resultsObj);
    var series = JSON.parse(this.resultsObj.series);
    var layout = JSON.parse(this.resultsObj.layout);
    layout.title = this.resultsObj.title;
    layout.margin.b = 40;
    layout.margin.l = 40;
    layout.margin.t = 50;
    console.log(layout);
    Plotly.newPlot('results-plot',series,layout);

    var self2 = this;
    self2.waitingOnServer = false;
    console.log(self2.resultsObj);
    var series2 = JSON.parse(this.resultsObj.series2);
    var layout2 = JSON.parse(this.resultsObj.layout2);
    layout2.title = this.resultsObj.title2;
    layout2.margin.b = 40;
    layout2.margin.l = 40;
    layout2.margin.t = 50;
    console.log(layout2);
    Plotly.newPlot('results-plot1',series2,layout2);

    var self3 = this;
    self3.waitingOnServer = false;
    console.log(self3.resultsObj);
    var series3 = JSON.parse(this.resultsObj.series3);
    var layout3 = JSON.parse(this.resultsObj.layout3);
    layout3.title = this.resultsObj.title3;
    layout3.margin.b = 40;
    layout3.margin.l = 40;
    layout3.margin.t = 50;
    console.log(layout3);
    Plotly.newPlot('results-plot2', series3, layout3);

    var self4 = this;
    self4.waitingOnServer = false;
    console.log(self4.resultsObj);
    var series4 = JSON.parse(this.resultsObj.series4);
    var layout4 = JSON.parse(this.resultsObj.layout4);
    layout4.title = this.resultsObj.title4;
    layout4.margin.b = 40;
    layout4.margin.l = 40;
    layout4.margin.t = 50;
    console.log(layout4);
    Plotly.newPlot('results-plot3', series4, layout4);

    var self5 = this;
    self5.waitingOnServer = false;
    console.log(self5.resultsObj);
    var series5 = JSON.parse(this.resultsObj.series5);
    var layout5 = JSON.parse(this.resultsObj.layout5);
    layout5.title = this.resultsObj.title5;
    layout5.margin.b = 40;
    layout5.margin.l = 40;
    layout5.margin.t = 50;
    console.log(layout4);
    Plotly.newPlot('results-plot4', series5, layout5);

    var self6 = this;
    self6.waitingOnServer = false;
    console.log(self6.resultsObj);
    var series6 = JSON.parse(this.resultsObj.series6);
    var layout6 = JSON.parse(this.resultsObj.layout6);
    layout6.title = this.resultsObj.title6;
    layout6.margin.b = 40;
    layout6.margin.l = 40;
    layout6.margin.t = 50;
    console.log(layout6);
    Plotly.newPlot('results-plot5', series6, layout6);

    var self7 = this;
    self7.waitingOnServer = false;
    console.log(self7.resultsObj);
    var series7 = JSON.parse(this.resultsObj.series7);
    var layout7 = JSON.parse(this.resultsObj.layout7);
    layout7.title = this.resultsObj.title7;
    layout7.margin.b = 40;
    layout7.margin.l = 40;
    layout7.margin.t = 50;
    console.log(layout7);
    Plotly.newPlot('results-plot6', series7, layout7);


  }

  serverErrorClose() {
    this.serverError='';
  }

  handleServerError(error) {
    this.waitingOnServer = false;
    this.serverError = error;
  }

}
