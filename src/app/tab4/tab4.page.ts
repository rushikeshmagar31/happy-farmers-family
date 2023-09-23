import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { IonLoaderService } from '../ion-loader.service';
import firebase1 from 'firebase/compat/app'
import { environment } from 'src/environments/environment';




@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  

  clear() {
    this.state = null
  }
  clear2() {
    this.district = null
  }
  clear3() {
    this.commodity = null
  }
  
  language: string = this.translateService.currentLang;
  state:any
  district:any
  commodity:any
  API_KEY_RATE="579b464db66ec23bdd0000014bf23e07b05946a77491e67b3ea743e7"
  check=true
  data_get:any
  public data:any
  public columns: any;
  public rows: any;
  sort='multi';
  error=false
  nodata=false
  shopdist:any
  row:any
  shopdata:any
  results:any
  rates : any[] = [];
  fcheck = false
  resultapmc:any
  element:any
  apmcdata=false
  govtdata=true

  constructor(
    public httpClient:HttpClient,
    private translateService: TranslateService,
    private navCtrl: NavController,
    private router:Router,
    public toastCtrl: ToastController,
    private ionLoaderService: IonLoaderService) {}

  ngOnInit() {
    this.nodata=true
      this.check=true
      firebase1.initializeApp(environment.firebase);

  }
  fetchData(){
  this.marketData()

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
openloaderred(message:any){
  this.ionLoaderService.openToastDanger(message)
}
marketData(){
  this.govtdata=true

console.log(this.district)
console.log(this.state)
console.log(this.commodity)
this.customizeLoader('Getting Data')
this.rates=[];
this.resultapmc=null

firebase1.database().ref('rates').on('value',snapshot=>{
  this.resultapmc=snapshot.val()
  console.log(this.resultapmc)
  for (let i in this.resultapmc){
    this.element = this.resultapmc[i];
    if(this.element.district == this.district){
      this.apmcdata=true
      
      let frates = {
        fdistrict:this.element.district,
        fmarket:this.element.market,
        fcommodity:this.element.commodity,
        fprice:this.element.price,
        fdate:this.element.date
      }
      console.log(this.district)
      this.rates.push(frates)
    }
     if(this.rates.length == 0){
      this.apmcdata=false
console.log('No apmc data')
      
    }
    if(this.data_get.records.length == 0){
      this.govtdata=false
    }
}
  this.hideLoader()
})
if (this.commodity && this.state  && this.district) {
  this.data_get=null

  this.httpClient.get(`https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=${this.API_KEY_RATE}&format=json&limit=1000&filters%5Bstate%5D=${this.state}&filters%5Bdistrict%5D=${this.district}&filters%5Bcommodity%5D=${this.commodity}`).subscribe(results =>{
    this.hideLoader()
    console.log(results);
    this.check=false
    this.nodata=false
    this.data_get=results
    this.rows=this.data_get.records
    console.log("in")
    this.hideLoader()

    
    // if (this.data_get.records.length == 0 && this.element.district != this.district && this.rates.length==0) {
    //   console.log("No data")
    //   this.nodata=true
    //   this.check=true
    //   this.openToast()     
    // } else {
    //   this.nodata=false   
    // }    
  },err=>{
    console.log(err)
    this.error=true
    this.openToasterr()
  })  
} else if(this.state  && this.district ) {
  this.data_get=null
  this.httpClient.get(`https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=${this.API_KEY_RATE}&format=json&limit=1000&filters%5Bstate%5D=${this.state}&filters%5Bdistrict%5D=${this.district}`).subscribe(results =>{
  
  this.hideLoader()
  console.log(results);
  this.nodata=false
    this.check=false
    this.data_get=results
    this.rows=this.data_get.records
    console.log("in")
    
    // if (this.data_get.records.length == 0) {
    //   console.log("No data")
    //   this.nodata=true
    //   this.check=true

    //   this.openToast()     
    // } else {
    //   this.nodata=false   
    //   this.check=false
    // }    
  },err=>{
    console.log(err)
    this.error=true
    this.openToasterr()
    this.hideLoader()

  })  
} 
else{
  this.openToasterstate()

}
  }
  async openToasterstate() {
    const toast = await this.toastCtrl.create({  
      message: 'Enter State or District',  
      duration: 5000,
      color:'danger'
      
      
    });  
    toast.present(); 
    this.hideLoader()

  }
  languageChange() {  
    this.translateService.use(this.language);
  }
  handleRefresh(event:any) {
    setTimeout(() => {
      event.target.complete();
      console.log(this.nodata)
      this.nodata=true
      this.check=true
      this.district=null
      this.commodity=null
      this.state=null
      this.fcheck=false
      

    }, 2000);
  }
  async openToast() {  
    const toast = await this.toastCtrl.create({  
      message: 'No Data Available',  
      duration: 5000,
      color:'danger'      
      
    });  
    toast.present();
    this.hideLoader()
  
  } 
  async openToasterr() {  
    const toast = await this.toastCtrl.create({  
      message: 'An Error Occured',  
      duration: 5000,
      
      
    });  
    toast.present();  
    this.hideLoader()

  }
  

  fetchshop(){
    this.httpClient.get('./assets/i18n/solapur_north.json').subscribe(json =>{
      this.data = json;
      console.log(json)
      this.data=Array.of(this.data)
      this.shopdist=this.data.dealer_name
      this.shopdata=Array.of(this.data[0])


      console.log("test")

    })
      

    
  }
 
  }

