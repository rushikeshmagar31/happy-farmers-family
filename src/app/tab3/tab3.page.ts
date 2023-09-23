import { Component, NgModule} from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { IonLoaderService } from '../ion-loader.service';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

const API_URL = environment.API_URL;
const API_KEY = environment.API_KEY;

export interface Data {
  

  records: string;
}

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})

export class Tab3Page {
  
  language: string = this.translateService.currentLang;
  latitude: any = 0;
  longitude: any = 0;
  weatherTemp: any
  weatherIcon: any
  loading = true
  results: any = [];
  weathericon: any
  icon: any
  localtime: any
  region: any
  country: any
  day1: any
  cityname: any
  cityname2: any
  forecast: any
  location: any
  address:any


  constructor(public httpClient: HttpClient,
    private translateService: TranslateService,
    private geolocation: Geolocation,
    private androidPermissions: AndroidPermissions,
    private locationAccuracy: LocationAccuracy,
    private ionLoaderService: IonLoaderService,
    private angularfire: AngularFireAuthModule,
    

  ) { }

 
  
  options = {
    timeout: 10000,
    enableHighAccuracy: true,
    maximumAge: 3600
  };
  slidesOptions = {
    
    initialSlide: 0,
    speed: 500,
    loop: false,
    autoplay: {
      delay: 1500,
      disableOnInteraction: false,
}
  }


  
  handleRefresh(event: any) {
    setTimeout(() => {
      this.loading = true
      this.cityname = null
      this.cityname2 = null
      this.latitude = null
      this.longitude = null


      event.target.complete();
    }, 2000);
  }
 

  customizeLoader(message:any) {
    this.ionLoaderService.customLoader(message);
  }
  showLoader() {
    this.ionLoaderService.simpleLoader();
  }
  hideLoader() {
    this.ionLoaderService.dismissLoader();
  }
  
  getCurrentCoordinates() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
      console.log(this.latitude)
      console.log(this.longitude)
      this.loadData()
      

    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  loadData() {
    if(this.results){
      this.hideLoader()
    }else{
      this.customizeLoader('Loading')
    }
    
    if (this.latitude && this.longitude) {
      this.httpClient.get(`${API_URL}forecast.json?key=${API_KEY}&q=${this.latitude},${this.longitude}&days=10`).subscribe(results => {
        console.log(results);
        this.weatherTemp = results
        this.weatherIcon = this.weatherTemp.current
        this.forecast = this.weatherTemp.forecast.forecastday
        this.location = this.weatherTemp.location
        this.weathericon = this.weatherIcon.condition.icon
        this.icon = `http:${this.weathericon}`
        this.cityname2 = this.weatherTemp.location.name
        this.region = this.weatherTemp.location.region
        this.country = this.weatherTemp.location.country
        this.localtime = this.weatherTemp.location.localtime
        this.day1 = this.weatherTemp.forecast.forecastday[0]
        this.loading = false
        this.latitude = null
        this.longitude = null
      })

    } else {
      this.httpClient.get(`${API_URL}forecast.json?key=${API_KEY}&q=${this.cityname}&days=10`).subscribe(results => {
        console.log(results);
        this.weatherTemp = results
        this.weatherIcon = this.weatherTemp.current
        this.forecast = this.weatherTemp.forecast.forecastday
        this.weathericon = this.weatherIcon.condition.icon
        this.icon = `http:${this.weathericon}`
        this.cityname2 = this.weatherTemp.location.name
        this.region = this.weatherTemp.location.region
        this.country = this.weatherTemp.location.country
        this.localtime = this.weatherTemp.location.localtime
        this.day1 = this.weatherTemp.forecast.forecastday[0]
        this.loading = false

      })
    }

  }
  languageChange() {
    this.translateService.use(this.language);
  }



  checkGPSPermission() {
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION).then(
      result => {
        if (result.hasPermission) {

          this.askToTurnOnGPS();
        } else {

          this.requestGPSPermission();
        }
      },
      err => {
        alert(err);
      }
    );
  }

  requestGPSPermission() {
    this.locationAccuracy.canRequest().then((canRequest: boolean) => {
      if (canRequest) {
        console.log("4");
      } else {
        this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION)
          .then(
            () => {
              this.askToTurnOnGPS();
            },
            error => {
              alert('requestPermission Error requesting location permissions ' + error)
            }
          );
      }
    });
  }

  askToTurnOnGPS() {
    this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
      () => {
        this.getLocationCoordinates()
      },
      error => alert('Error requesting location permissions ' + JSON.stringify(error))
    );
  }

  getLocationCoordinates() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
      this.loadData()


    }).catch((error) => {
      alert('Error getting location' + error);
    });
  }








}

