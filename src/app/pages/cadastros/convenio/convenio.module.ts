import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ConvenioPage } from './convenio.page';
import { NgxMaskIonicModule } from 'ngx-mask-ionic';

const routes: Routes = [
  {
    path: '',
    component: ConvenioPage
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
  declarations: [ConvenioPage]
})
export class ConvenioPageModule {}
