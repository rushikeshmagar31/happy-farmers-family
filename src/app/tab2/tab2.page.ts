import { Component } from '@angular/core';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { Camera } from '@ionic-native/Camera/ngx';
import { ImagePickerOptions } from '@ionic-native/image-picker/ngx';
import { File } from '@ionic-native/file/ngx';
import { environment } from 'src/environments/environment';
import firebase1 from 'firebase/compat/app';
import { AuthenticationService } from '../services/authentication.service';
import { IonLoaderService } from '../ion-loader.service';




const API_URL = environment.PLANTAPI;
const API_KEY = environment.PLATURL;




@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page {
  isModalOpen = false;
  sche1 =false;
  sche2 =false;
  sche3 =false;


  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
  opensche1(isOpen: boolean) {
    this.sche1 = isOpen;
  }
  opensche2(isOpen: boolean) {
    this.sche2 = isOpen;
  }
  opensche3(isOpen: boolean) {
    this.sche3 = isOpen;
  }
 
  imagePickerOptions: ImagePickerOptions = {
    maximumImagesCount: 1,
    quality: 50,
  }
 
  result:any
  language: string = this.translateService.currentLang;
  crop: any;
  fruit:any
  type: any;
  coriander: any;
  fenugreek:any
  form=true
  mango:any
  apple:any
  croppedImagePath: string;
  image: string;

  

  constructor(private translateService: TranslateService,
    public httpClient:HttpClient,
    private alertController: AlertController,
    private authservice:AuthenticationService,
    private camera: Camera,
    public actionSheetController: ActionSheetController,
    private file: File,
    private ionLoaderService: IonLoaderService

) {
     
    }
  languageChange() { 
    this.translateService.use(this.language);
  }
  slidesOptions = {
    initialSlide: 0,
    speed: 500,
    loop: false,
    
}
  // ionViewWillEnter(){
  //   this.getblog()
  // }
  
  handleRefresh(event:any) {
    setTimeout(() => {
      event.target.complete();

      this.form=true
      this.type=null
      this.fruit=null
      this.crop=null
      this.crop=null



      this.coriander=null
      this.fenugreek=null



      this.apple=null
      this.mango=null
      
      
    }, 2000);
  }

  clear() {
    this.type = null

  }
  clear2() {
    this.crop = null
    this.crop = null

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
  opentoastred(message:any){
    this.ionLoaderService.openToastDanger(message);
  }
  opentoast(message:any){
    this.ionLoaderService.openToast(message);
  }
  private base64textString:String="";
  
  handleFileSelect(evt:any){
      var files = evt.target.files;
      var file = files[0];
    
    if (files && file) {
        var reader = new FileReader();

        reader.onload =this._handleReaderLoaded.bind(this);

        reader.readAsBinaryString(file);
    }
  }
  
  _handleReaderLoaded(readerEvt:any) {
     var binaryString = readerEvt.target.result;
            this.base64textString= btoa(binaryString);
            this.image = 'data:image/jpg;base64,' + this.base64textString;
            console.log(this.image)
  }
 
  pickImage() {
    
    this.camera.getPicture(this.imagePickerOptions).then((imageData) => {
      this.base64textString= btoa(imageData);
      this.croppedImagePath = 'data:image/jpeg;base64,' + this.base64textString;
      console.log(this.croppedImagePath)
    }, (err) => {
      //error
    });
  }

  
  
  fetchData(crop: any){
    this.form=false
    
      if(crop == "Mango"){
        this.mango=true
      }
      else if(crop =="Apple"){
        this.apple=true
      }
    
      if(crop == "Coriander"){
        this.coriander=true
      }
      else if(crop =="Fenugreek"){
        this.fenugreek=true
      }
       
    }
    blogs: any[] = [];
    blogs1: any[] = [];


    getblog(){
      this.customizeLoader('Getting Newest Content')
      this.blogs=[]
      firebase1.database().ref('posts').on('value',snapshot=>{
        this.result = snapshot.val();
        console.log(this.result)
        this.hideLoader()

        for (let i in this.result){
          var element = this.result[i]
          let post={
            date:element.date,
            description:element.description,
            tag:element.tag,
            title:element.title
          }
          this.blogs.push(post)
        }
        if (this.result == null){
          this.opentoastred('No Blogs');
          this.hideLoader()

        }
      })
      
    }
    postdetails(blogs:any){
      this.setOpen(true)
      var element = blogs
      let post1={
        date:element.date,
        description:element.description,
        tag:element.tag,
        title:element.title
      }
      this.blogs1.push(post1)
    }
}
