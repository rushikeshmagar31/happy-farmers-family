import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  isLoggedIn() {
    const authToken = localStorage.getItem('token');
    return authToken

  }

  constructor(private afAuth: AngularFireAuth,
    private toastCtrl:ToastController
    ) { }

    myemail:any
    mypassword:any
    
    
  loginUser(value: { email: any; password: any; }) {
    return new Promise<any>((resolve, reject) => {
      this.myemail=value.email
      this.mypassword=value.password

      console.log(this.myemail)
      this.afAuth.signInWithEmailAndPassword(value.email, value.password)
        .then(
          res => resolve(res),
          err => reject(err))
    })
  }

  logoutUser() {
    return new Promise(async (resolve, reject) => {
      if (await this.afAuth.currentUser) {
        this.afAuth.signOut()
          .then(() => {
            console.log("LOG Out");
          }).catch((error) => {
            reject();
          });
      }
    })
  }

  userDetails() {
    return this.afAuth.user
  }

toast:any
  async presentToast(message:any){
    this.toast=true
    return await this.toastCtrl.create({
      message:message,
      duration:3000,
      position:'bottom',
      color:'danger'
    }).then(a=>{
      a.present().then(() =>{
        console.log('presented');
        if(!this.toast){
          a.dismiss().then(() => console.log('abort'))
        }
      })
    })
  }
}


