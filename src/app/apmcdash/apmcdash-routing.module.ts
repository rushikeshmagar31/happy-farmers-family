import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApmcdashPage } from './apmcdash.page';

const routes: Routes = [
  {
    path: '',
    component: ApmcdashPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApmcdashPageRoutingModule {}
