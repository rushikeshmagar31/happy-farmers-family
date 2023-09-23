import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import firebase1 from 'firebase/compat/app';
import { IonLoaderService } from '../ion-loader.service';
import { LoginapmcPage } from '../loginapmc/loginapmc.page';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NavController } from '@ionic/angular';
import { event } from 'jquery';






@Component({
  selector: 'app-apmcdash',
  templateUrl: './apmcdash.page.html',
  styleUrls: ['./apmcdash.page.scss'],
})
export class ApmcdashPage implements OnInit {
  username: any;

  constructor(
    private authservice:AuthenticationService,
    private ionLoaderService: IonLoaderService,
    private loginapmc:LoginapmcPage,
    private afAuth: AngularFireAuth,
    private navCtrl: NavController


    ) { 
      
    }
  rate={
    district:'',
    market:'',
    commodity:'',
    price:'',
    date:''

  }
  handleRefresh(event: any) {
    setTimeout(() => {
    event.target.complete();
    this.rate.commodity='';
    this.rate.market='';
    this.rate.price='';
    this.rate.date='';


  }, 2000);
}
  ngOnInit(){
    var email = this.authservice.myemail
    console.log(email)
    var usernamee = email.substring(0,email.indexOf('apmc@'))
    this.username = usernamee[0].toUpperCase() + usernamee.slice(1);
    console.log(this.username) 
    this.rate.district=this.username 
  }
  showLoader() {
    this.ionLoaderService.simpleLoader();
  }
  hideLoader() {
    this.ionLoaderService.dismissLoader();
  }
  customizeLoader(message:any) {
    this.ionLoaderService.customLoader(message);
  }
  opentoastred(message: any) {
    this.ionLoaderService.openToastDanger(message);
  }
  opentoast(message: any) {
    this.ionLoaderService.openToast(message);
  }
  back(){
    return new Promise(async (resolve, reject) => {
      if (await this.afAuth.currentUser) {
        this.afAuth.signOut()
          .then(() => {
            console.log("LOG Out");
            this.navCtrl.navigateForward('/loginapmc');
          }).catch((error) => {
            reject();
          });
      }
    })
  }
  rates : any[] = [];
  submitrate(){

        
    if(this.rate.district == ''){
      this.authservice.presentToast('Enter District');
    }else{
      if(this.rate.market == ''){
        this.authservice.presentToast('Enter Market');
      }else{
        if(this.rate.commodity == ''){
          this.authservice.presentToast('Enter Commodity');
        }else{
          if(this.rate.price == ''){
            this.authservice.presentToast('Enter Price');
          }else{
            if(this.rate.date == ''){
              this.authservice.presentToast('Enter Date');
            }else{
              this.customizeLoader('Submitting Data')

              
              firebase1.database().ref('rates').push(this.rate).then(res=>{
                console.log((res))
                console.log((this.rate))
                this.hideLoader()
                this.opentoast('Submitted')

              })
            }
          }
        }

      }
    }
    
  }
 

}
