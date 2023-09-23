import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormBuilder, Validators, FormControl, FormsModule } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthenticationService } from '../services/authentication.service';
import { IonLoaderService } from '../ion-loader.service';



@Component({
  selector: 'app-loginapmc',
  templateUrl: './loginapmc.page.html',
  styleUrls: ['./loginapmc.page.scss'],
})
export class LoginapmcPage implements OnInit {
  validations_form: FormGroup;
check=true
username:string
email:any
apmc:any

  constructor(
    private navCtrl: NavController,
    private authservice: AuthenticationService,
    private formBuilder: FormBuilder,
    private ionLoaderService: IonLoaderService
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
  back(){
    this.navCtrl.navigateBack('/login')
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
 
  loginUser(value:any) {
      this.apmc='apmc@gmail.com'
      this.email = value.email
      console.log(this.email)
      var usernamee = this.email.substring(this.email.indexOf('apmc@'))
      console.log(usernamee) 

    if(this.apmc == usernamee){
      this.customizeLoader('Getting In')

    
    this.authservice.loginUser(value)
      .then(res => {
        console.log(res);
        this.navCtrl.navigateForward('/apmcdash');
        this.hideLoader()
        console.log("LoggedIN")


      }, err => {
        this.errorMessage = err.message;
        this.hideLoader()
      })
    }else{
      this.authservice.presentToast('Only APMC can login here');
      this.hideLoader()


    }
  }
}
