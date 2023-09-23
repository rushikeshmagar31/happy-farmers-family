import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router,ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { TranslateService } from '@ngx-translate/core';



@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  language: string = this.translateService.currentLang;
  userEmail:any;
  photo:any;
  name:any;
  islogin:any
  data:any
  


  constructor(
    private afAuth: AngularFireAuth,
    private navCtrl: NavController,
    private fireAuth: AngularFireAuth,
    private translateService: TranslateService,
    public router: Router,
    private activatedroute:ActivatedRoute




  ) {
    this.activatedroute.paramMap.subscribe(para=>{
      this.islogin=para
      if (this.islogin) {
        this.data=true
        
      }
    else{
      this.data=false
      this.navCtrl.navigateBack('');


    }
      
    })
 }
  handleRefresh(event:any) {
    setTimeout(() => {
      this.ngOnInit()
      
      event.target.complete();
    }, 2000);
  }

  navigate(pass:any){
    if(pass == 'weather'){
      this.navCtrl.navigateForward('/tabs/tab3')
    }else if(pass == 'crop'){
      this.navCtrl.navigateForward('/tabs/tab2')
    }else if(pass == 'market'){
      this.navCtrl.navigateForward('/tabs/tab4')
    }
  }
  userDetails(){
    return this.afAuth.user;
  }
  ngOnInit(){
    this.userDetails().subscribe(res => {
      console.log('res', res);
      if (res !== null) {
        this.userEmail = res.email;
        this.photo=res.photoURL;
        this.name=res.displayName;
        
        //this.demo=res.


      } else {
        this.navCtrl.navigateBack('');
      }
    }, err => {
      console.log('err', err);
    })
   

  }
  logout() {
    this.fireAuth.signOut().then(() => {
      this.navCtrl.navigateBack('/login');
      this.data=false

    });
  }
  languageChange() {  
    this.translateService.use(this.language);
  }
  slidesOptions = {
    slidesPerView: 1.5
  }

  slideOpts = {
    initialSlide: 1,
    speed: 500,
    loop:true,    
    autoplay: {
      delay: 1500,
      disableOnInteraction: false,
}
  };

}
