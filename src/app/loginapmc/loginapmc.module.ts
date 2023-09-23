import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginapmcPageRoutingModule } from './loginapmc-routing.module';

import { LoginapmcPage } from './loginapmc.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginapmcPageRoutingModule,
    ReactiveFormsModule

  ],
  declarations: [LoginapmcPage]
})
export class LoginapmcPageModule {}
