import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import {NgxMaskIonicModule} from 'ngx-mask-ionic';
import { Geolocation } from '@ionic-native/geolocation/ngx';

import { IonicModule } from '@ionic/angular';

import { ProfissionalPage } from './profissional.page';
import { IonicSelectableModule } from 'ionic-selectable';

const routes: Routes = [
  {
    path: '',
    component: ProfissionalPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IonicSelectableModule,
    ReactiveFormsModule,
    NgxMaskIonicModule, 
    RouterModule.forChild(routes)
  ],
  declarations: [ProfissionalPage]
})
export class ProfissionalPageModule {}
