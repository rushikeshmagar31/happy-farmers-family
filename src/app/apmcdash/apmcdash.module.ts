import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ApmcdashPageRoutingModule } from './apmcdash-routing.module';

import { ApmcdashPage } from './apmcdash.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApmcdashPageRoutingModule
  ],
  declarations: [ApmcdashPage]
})
export class ApmcdashPageModule {}
