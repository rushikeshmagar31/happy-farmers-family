import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginapmcPage } from './loginapmc.page';

const routes: Routes = [
  {
    path: '',
    component: LoginapmcPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginapmcPageRoutingModule {}
