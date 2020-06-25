import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PagamentoPage } from './pagamento.page';
import { IonicSelectableModule } from 'ionic-selectable';
import { BrMaskerModule } from 'br-mask';

const routes: Routes = [
  {
    path: '',
    component: PagamentoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BrMaskerModule,
    ReactiveFormsModule,
    IonicSelectableModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PagamentoPage]
})
export class PagamentoPageModule {}
