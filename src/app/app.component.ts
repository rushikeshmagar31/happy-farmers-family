import { Component, ViewChild } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import {Platform, AlertController, IonRouterOutlet } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { App as CapacitorApp } from '@capacitor/app';







@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  @ViewChild(IonRouterOutlet, { static : true }) routerOutlet!: IonRouterOutlet;  
  constructor(
    private platform:Platform,
    private splashScreen:SplashScreen,
    private translate: TranslateService,
    private alertController:AlertController,
    private statusBar:StatusBar,
    private location:Location,
    private router:Router
  ) {
    this.initializeApp();
    this.backButtonEvent();
  }
  
  initializeApp() {
    this.platform.ready().then(()=>{
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    this.translate.setDefaultLang('en');
  }
  backButtonEvent() {
    
    this.platform.backButton.subscribeWithPriority(10, async () =>{
      if(this.routerOutlet.canGoBack() && this.router.url == "/tabs/tab1" || this.router.url == "/apmcdash" || this.router.url == "/admindash"){
        const alert=await this.alertController.create({
          message:'Exit App?',
          buttons:[{
            text:'Cancel',
            role:'cancel'
          },{
            text:'Close App',
            handler:()=>{
    
              window.close();
    
              
    
    
            }
          }
        ]
        });
        await alert.present();
      }else if(this.router.url == "/login"){
        const alert=await this.alertController.create({
          message:'Exit App?',
          buttons:[{
            text:'Cancel',
            role:'cancel'
          },{
            text:'Close App',
            handler:()=>{
              window.close();
            }
          }
        ]
        });
        await alert.present();
      } 
      else {
        this.location.back();
      }
    });
  }

  rootPage:any = "login-page";
}

