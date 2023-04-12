import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { OrlandoWeather, Main, Weather, Wind, Sys } from '../models/orlando-weather';

@Component({
  selector: 'app-orlando-weather',
  templateUrl: './orlando-weather.component.html',
  styleUrls: ['./orlando-weather.component.scss']
})
export class OrlandoWeatherComponent implements OnInit {

  constructor(private data: DataService) { }
  public orlandoWeather: OrlandoWeather = {} as OrlandoWeather;
   public weather: Main = {} as Main;
   public skies: Weather[] = [];
   public iconImg: string ='';
   public feelsLikeTemp: number = 0;
   public min_temp: number = 0;
   public max_temp: number = 0;
   public weatherIcon: object = { tag: '', color: '' };
   public iconType: string = '';
   public iconColor: string='';
   public time: Sys= {} as Sys;
   public wind: Wind = {} as Wind;

  ngOnInit(): void {
    this.getWeather();
  }

  getWeather() {
    this.data.getOrlandoWeather()
        .subscribe({
          next: () => {
            this.orlandoWeather = this.data.orlandoWeather;
            this.weather = this.data.orlandoWeather.main;
            this.skies = this.data.orlandoWeather.weather;
            this.time = this.data.orlandoWeather.sys;
            this.wind = this.orlandoWeather.wind

            this.feelsLikeTemp = this.convertFromKelvins(this.weather.temp);
            this.min_temp = this.convertFromKelvins(this.weather.temp_min);
            this.max_temp = this.convertFromKelvins(this.weather.temp_max);
         
            this.parseWeatherIconObject(this.skies[0].description, this.time);
          },
          error: (err: any) => {
            console.log("failed to get weather info", err);
          },
          complete: () => console.log('login complete')
         })
  }

  setWeatherIcon(sky: string): object  {
    switch (sky) {
      case 'clear sky':
        if(this.isNightTime()){
          this.weatherIcon = {tag:'clear_night', color:'rgb(235 230 230)'};
        }else {
        this.weatherIcon = {tag:'clear_day', color:'yellow'};
        } 
        break;
      case 'thunder storm':
        this.weatherIcon = {tag:'thunderstorm', color: '#333'};
        break;
      case 'scattered clouds': 
      case 'broken clouds':
      case 'few clouds':
        if (this.isNightTime()) {
          this.weatherIcon = {tag: 'partly_cloudy_night' , color: '#FBFCFC'}
        }else {
          this.weatherIcon = {tag: 'partly_cloudy_day', color: '#FBFCFC'};
        }
      break;
      case 'overcast clouds':
      this.weatherIcon = {tag:'cloudy', color:'#FBFCFC '};
      break;
      case 'mist':
      case 'light rain':
      this.weatherIcon = {tag:'rainy', color:'#FBFCFC '};
      break;
      default:
        this.weatherIcon = {tag:'thermostat', color: 'red'};
    } 

    return this.weatherIcon;
  }

  parseWeatherIconObject(sky: string, time: object ) {
    let weather = this.setWeatherIcon(sky);
    let iconObject = Object.values(weather);
     this.iconType = iconObject[0];
     this.iconColor = iconObject[1];
  }

  convertFromKelvins(x: number): number {
    var result = (x - 273.15 ) * 9/5 + 32;
    return result;
  }

 unixTimestampToDateTime(unixTimestamp: number) {
    // Multiply by 1000 to convert from Unix timestamp to JavaScript timestamp
    let dateTime = new Date(unixTimestamp * 1000);
    // Get the human-readable date and time in local timezone
    let date = dateTime.toLocaleDateString();
    let time = dateTime.toLocaleTimeString();
    // Return the formatted date and time string
    return `${date} ${time}`;
  }

   isAfterSunset(sunsetTimestamp: number): boolean {
    let currentTime = new Date().getTime();
    return currentTime > sunsetTimestamp;
  }

  isBeforeSunrise(sunriseTimestamp: number): boolean {
    let currentTime = new Date().getTime();
    console.log(currentTime);
    return currentTime < sunriseTimestamp;
  }

  isNightTime(): boolean {
    const currentUnixTime = Math.floor(Date.now() / 1000); // get current Unix time in seconds
    const localTime = new Date(currentUnixTime * 1000); // convert Unix time to local time
    if (localTime.getHours() >= 20 || localTime.getHours() < 6) {
      console.log("It's nighttime.");
      return true;
    } else {
      console.log("It's daytime.");
      return false;
    }
  }
  
}
