import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent {
  public forecasts: WeatherForecast[];

  types = [
    { id: 1, name: 'Support' },
    { id: 2, name: 'development' }
  ];
  form: FormGroup;
  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, private formBuilder: FormBuilder) {

    http.get<WeatherForecast[]>(baseUrl + 'api/SampleData/WeatherForecasts').subscribe(result => {
      this.forecasts = result;
    }, error => console.error(error));

    const controls = this.types.map(c => new FormControl(false));
    controls[0].setValue(true);

    this.form = this.formBuilder.group({
      types: new FormArray(controls)
    });
  }

  submit() {
    const selectedOrderIds = this.form.value.types
      .map((v, i) => v ? this.types[i].id : null)
      .filter(v => v !== null);

    console.log(selectedOrderIds);
  }
}

interface WeatherForecast {
  dateFormatted: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}
