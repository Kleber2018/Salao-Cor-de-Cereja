import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import {NgxMaskIonicModule} from 'ngx-mask-ionic';

import { IonicModule } from '@ionic/angular';

import { ClientePage } from './cliente.page';

const routes: Routes = [
  {
    path: '',
    component: ClientePage
  }
];

@NgModule({
  imports: [
    CommonModule, 
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    NgxMaskIonicModule, 
    RouterModule.forChild(routes)
  ],
  declarations: [ClientePage]

})
export class ClientePageModule {}
