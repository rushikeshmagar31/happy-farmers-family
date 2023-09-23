import { Component, OnInit } from '@angular/core';
import { GooglePlus } from '@ionic-native/google-plus/ngx/index';
import { LoadingController, Platform } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import * as firebase from 'firebase/compat/app';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { IonLoaderService } from '../ion-loader.service';





@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss']
})
export class LoginPage implements OnInit {
  public loading: any;
  public isGoogleLogin = false;
  public user: any;
  photourl:any;
  userEmail!: string | null;
  public islogin:any
  url:any

  constructor(
    private navCtrl: NavController,
    private google: GooglePlus,
    public loadingController: LoadingController,
    private fireAuth: AngularFireAuth,
    private platform: Platform,
    private translateService: TranslateService,
    private ionLoaderService: IonLoaderService,
    private router:Router,


  ) {}
  language: string = this.translateService.currentLang;

  customizeLoader(message:any) {
    this.ionLoaderService.customLoader(message);
  }
  showLoader() {
    this.ionLoaderService.simpleLoader();
  }
  hideLoader() {
    this.ionLoaderService.dismissLoader();
  }
  opentoastred(message:any){
    this.ionLoaderService.openToastDanger(message);
  }
  opentoast(message:any){
    this.ionLoaderService.openToast(message);
  }

  async ngOnInit() {
    this.loading = await this.loadingController.create({
      message: 'Connecting ...'
    });

     
  }
  languageChange() {  
    this.translateService.use(this.language);
  }
  handleRefresh(event:any) {
    setTimeout(() => {
      event.target.complete();
      
    }, 2000);
  }
  slidesOptions = {
    slidesPerView: 1.7
  }


  slideOpts = {
    initialSlide: 1,
    speed: 800,
    loop:true,
    autoplay: {
      delay: 1500,
      disableOnInteraction: false,
}
  }
  
  
  doLogin(){
      this.customizeLoader('Getting In')
    
    const authToken = 'generated-auth-token';
          localStorage.setItem('token', authToken);
    let params: any;
    if (this.platform.is('cordova')) {
      if (this.platform.is('android')) {
        params = {
          webClientId: '126136180249-cp321v2jri6nagqa7043m8f6od7vhf6h.apps.googleusercontent.com', //  webclientID 'string'
          offline: true
        };
      } else {
        params = {};
      }
      this.google.login(params)
      .then((response: { idToken: any; accessToken: any; }) => {
        const { idToken, accessToken } = response;
        this.onLoginSuccess(idToken, accessToken);

      }).catch((error: any) => {
        console.log(error);
        this.opentoastred(error)

        alert('error:' + JSON.stringify(error));
      });
    } else{
      console.log('else...');
      this.fireAuth.signInWithPopup(new firebase.default.auth.GoogleAuthProvider()).then(success => {
        this.isGoogleLogin = true;
        this.islogin = true;
        this.user =  success.user;
        if (success) {
          this.router.navigate(['/tabs/tab1/']);
          this.hideLoader() 
        } else {
          this.router.navigate(['/login']);
          this.hideLoader() 

        }
      }).catch(err => {
        console.log(err.message, 'error in google login');
        this.islogin=false
        this.opentoastred(err.message)
        this.hideLoader()
        return false

      });
    }
  }
  onLoginSuccess(accessToken: any, accessSecret: any) {
    const credential = accessSecret ? firebase.default.auth.GoogleAuthProvider
        .credential(accessToken, accessSecret) : firebase.default.auth.GoogleAuthProvider
            .credential(accessToken);
    this.fireAuth.signInWithCredential(credential)
      .then((success) => {
        /*alert('successfully');*/
        this.isGoogleLogin = true;
        this.user =  success.user;
        this.navCtrl.navigateForward('/tabs/tab1');
        this.hideLoader()
        return true

        
      });

  }
  onLoginError(err: any) {
    console.log(err);
    this.opentoastred(err)

  }
  logout() {
    this.fireAuth.signOut().then(() => {
      this.isGoogleLogin = false;
      
    });
  }
  loginapmc(){
    this.router.navigate(['/loginapmc'])
  }
  loginadmin(){
    this.router.navigate(['/admin'])
  }
  
  

}