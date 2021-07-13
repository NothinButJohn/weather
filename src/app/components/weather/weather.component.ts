import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import {filter, map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {
  openWeatherAPIkey= '0d3c85d44caec6a146dac4eb25c14e73';

  weatherInputControl = new FormControl('London, UK')

  filteredOptions: Observable<any> = new Observable();
  location: string = ''
  weather: Observable<{
    current: {
        desc: any;
        temp: any;
    };
    daily: any[];
    hourly: any[];
}>;
  constructor(private http: HttpClient) {
    this.weather = this.getWeatherData(51.5074, -0.1278);
    // this.assignGridProp(index: number);
  }

  ngOnInit(): void {

  }

  assignGridProp(index: number){
    let ele  = document.getElementsByName(`weatherInfo-${index}`).forEach(x=>x.style.gridArea = `${index+1} / 1 / ${index+2} / 5;`)
  }

  handleAddressChange(event: any){
    console.log(event)

    let locationLat = event.geometry.location.lat();
    let locationLng = event.geometry.location.lng();
    this.location = event.formatted_address;
    this.weather = this.getWeatherData(locationLat, locationLng)

  }

  getWeatherData(lat:number, lon:number){
    return this.http.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${this.openWeatherAPIkey}`).pipe(
      map((res: any) => {
        let weather = {
          current: {
            desc: res.current.weather[0].description,
            temp: res.current.temp
          },
          daily: [...res.daily],
          hourly: [...res.hourly]
        }
        console.log('weather: ', weather)
        return weather;
        // return res
      })
    )
  }

}
