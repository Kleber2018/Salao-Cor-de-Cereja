import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ServicosPage } from './servico.page';
import { IonicSelectableModule } from 'ionic-selectable';
import { BrMaskerModule } from 'br-mask';

const routes: Routes = [
  {
    path: '',
    component: ServicosPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule, 
    ReactiveFormsModule,
    IonicSelectableModule,
    BrMaskerModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ServicosPage]
})
export class ServicosPageModule {}
