import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from '../services/authentication.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NavController } from '@ionic/angular';
import { IonLoaderService } from '../ion-loader.service';
import firebase1 from 'firebase/compat/app';
import 'summernote';
import * as $ from 'jquery';
declare global {
  interface Window {
    $: any;
  }
}
@Component({
  selector: 'app-addpost',
  templateUrl: './addpost.page.html',
  styleUrls: ['./addpost.page.scss'],
})
export class AddpostPage implements OnInit {
  today: any
  editor: any;

  constructor(private translateService: TranslateService,
    private afAuth: AngularFireAuth,
    private navCtrl: NavController,
    private authservice: AuthenticationService,
    private ionLoaderService: IonLoaderService

  ) { }
  ngOnInit() {
    this.today = new Date();

    this.post.date = this.today
  }
  handleRefresh(event: any) {
      setTimeout(() => {
      event.target.complete();
    }, 2000);
  }
  back() {
    this.navCtrl.navigateBack('/admindash')
  }
  post = {
    title: '',
    tag: '',
    description: '',
    date: ''
  }
  showLoader() {
    this.ionLoaderService.simpleLoader();
  }
  hideLoader() {
    this.ionLoaderService.dismissLoader();
  }
  customizeLoader(message: any) {
    this.ionLoaderService.customLoader(message);
  }
  opentoastred(message: any) {
    this.ionLoaderService.openToastDanger(message);
  }
  opentoast(message: any) {
    this.ionLoaderService.openToast(message);
  }
  submitpost() {
    
    if (this.post.title == '') {
      this.authservice.presentToast('Enter Title');
    } else {
      if (this.post.tag == '') {
        this.authservice.presentToast('Enter Tag');
      } else {
        if (this.post.description == '') {
          this.authservice.presentToast('Enter Description');
        } else {
          this.customizeLoader('Submitting Data')
          console.log("all")
          console.log(this.post.date)
          firebase1.database().ref('posts').push(this.post).then(res => {
            console.log((res))
            this.hideLoader()
            this.ionLoaderService.openToast('Submiited')
            this.navCtrl.navigateBack('/admindash')
          })
        }
      }
    }
  }
}
