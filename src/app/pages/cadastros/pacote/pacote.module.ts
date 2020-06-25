import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PacotePage } from './pacote.page';

import { IonicSelectableModule } from 'ionic-selectable';
import { BrMaskerModule } from 'br-mask';

const routes: Routes = [
  {
    path: '',
    component: PacotePage
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
  declarations: [PacotePage]
})
export class PacotePageModule {}
