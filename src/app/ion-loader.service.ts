import { Injectable } from '@angular/core';
import { LoadingController,ToastController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class IonLoaderService {
  constructor(
    public loadingController: LoadingController,
    public toastCtrl: ToastController,

  ) { }
simpleLoader() {
  this.loadingController.create({
      message: 'Loading'
  }).then((response) => {
      response.present();
  });
}
dismissLoader() {
  this.loadingController.dismiss().then((response) => {
      console.log('Loader closed', response);
  }).catch((err) => {
      console.log('Error occured : ', err);
  });
}
customLoader(message:any) {
  this.loadingController.create({
    message: message,
    cssClass:'loader-css-class',
    backdropDismiss:true
  }).then((res) => {
    res.present();
  });
}
async openToastDanger(message:any) {  
  const toast = await this.toastCtrl.create({  
    message: message,  
    duration: 3000,
    color:'danger'      
    
  });  
  toast.present();

}
async openToast(message:any) {  
  const toast = await this.toastCtrl.create({  
    message: message,  
    duration: 3000,
    cssClass: 'custom-toast'      

    
  });  
  toast.present();

}
}