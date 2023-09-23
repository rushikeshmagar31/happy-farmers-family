import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormsModule,ReactiveFormsModule } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthenticationService } from '../services/authentication.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { IonLoaderService } from '../ion-loader.service';





@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  validations_form: FormGroup;
check=true
username:string
email:any

  constructor(
    private navCtrl: NavController,
    private authservice: AuthenticationService,
    private formBuilder: FormBuilder,
    private ionLoaderService: IonLoaderService,
    private afAuth: AngularFireAuth
    ) { }
    errorMessage: string = '';
    

  ngOnInit() {
    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
    });
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
  Opentoastdanger(message:any){
    this.ionLoaderService.openToastDanger(message)
  }
  validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please enter a valid email.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 5 characters long.' }
    ]
  };
  back(){
    this.navCtrl.navigateBack('/login')
  }
  
 
  loginUser(value:any) {

     this.email = 'admin@admin.com'

    if(value.email == this.email){
      this.customizeLoader('Getting In')

      console.log(value.email)
      console.log(this.email)

      this.check=false

      this.authservice.loginUser(value)
      .then(res => {
        console.log(res);
        this.hideLoader()

        this.navCtrl.navigateForward('/admindash');
        console.log("LoggedIN")


      }, err => {
        this.Opentoastdanger('Wrong Password')
        // this.errorMessage = err.message;

        this.hideLoader()

      })

    }else{

      console.log(value.email)
      console.log(this.email)
      this.authservice.presentToast('Only Admin can login here');

      this.hideLoader()


    }
    
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
}
