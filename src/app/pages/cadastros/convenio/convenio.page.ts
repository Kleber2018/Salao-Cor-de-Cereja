import { Component, OnInit } from '@angular/core';
import { Convenio } from '../../../models/convenio.interface';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController, ToastController, AlertController } from '@ionic/angular';
import { FormBuilder, Validators } from '@angular/forms';
import { ConvenioService } from 'src/app/services/convenios/convenio.service';
import { ClientesService } from 'src/app/services/clientes/clientes.service';

@Component({
  selector: 'app-convenio',
  templateUrl: './convenio.page.html',
  styleUrls: ['./convenio.page.scss'],
})
export class ConvenioPage implements OnInit {

  private convenio: Convenio = {
    nome: '',
    desconto: '',
    cnpj: '',
    dia_pagamento: '',
    dia_vencimento: ''
  };

  public convenioForm: any;
  public clientes: [{id : string , nome : string}];

  convenioID = null;
  convenioUsado: boolean = false;

  constructor(private router: ActivatedRoute,
    private loading: LoadingController,
    private convenioService: ConvenioService,
    public toastCtrl: ToastController,
    public toastController: ToastController,
    private nav: NavController,
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    private clienteService: ClientesService) {
    this.convenioForm = formBuilder.group({
      nome: ['', Validators.compose([Validators.required])],
      cnpj: ['', Validators.compose([Validators.required])],
      desconto: ['', Validators.compose([Validators.required])],
      dia_pagamento: ['', Validators.compose([Validators.required])],
      dia_vencimento: ['', Validators.compose([Validators.required])],
    })
  }  

  ngOnInit() {
    this.convenioID = this.router.snapshot.params['id'];
    if (this.convenioID) {
      this.carregaConvenio();
    }
  }

  async carregaConvenio() {
    const loading = await this.loading.create({
      message: 'Carregando...'
    });
    await loading.present();
    this.convenioService.getConvenio(this.convenioID).subscribe(res => {
      loading.dismiss();
      this.convenio = res;
    });
    this.clienteService.getClientesWhere('convenio', '==', this.convenioID).subscribe(res => {
      this.clientes = res.map(e => {
        return {
          id: e.payload.doc.id,
          nome: e.payload.doc.data()['nome']
        };
      });
      this.convenioUsado = (this.clientes.length > 0) ? true : false;
    });
  }

  async salvarConvenio() {

    let { cnpj, desconto, nome, dia_pagamento, dia_vencimento } = this.convenioForm.controls;

    if (!this.convenioForm.valid) {
      if (!cnpj.valid) this.presentToast("CNPJ é Obrigatório");
      if (!nome.valid) this.presentToast("Nome é obrigatório");
      if (!desconto.valid) this.presentToast("Desconto é obrigatório");
      if (!dia_pagamento.valid) this.presentToast("Dia de Pagamento é Obrigatório");
      if (!dia_vencimento.valid) this.presentToast("Dia de Vencimento é Obrigatório");
    }
    else {
      const loading = await this.loading.create({
        message: 'Gravando...'
      });
      await loading.present();
      if (this.convenioID) { //UPDATE
        this.convenioService.updtConvenios(this.convenio, this.convenioID).then(() => {
          loading.dismiss();
          this.nav.navigateRoot(['/convenios']);
        });
      } else {//INSERT
        this.convenioService.addConvenios(this.convenio).then(() => {
          loading.dismiss();
          this.nav.navigateRoot(['/convenios']);
        });
      }
    }
  }

  async presentToast(mensagem: string) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 2700,
      position: 'top'
    });
    toast.present();
  }

  deletar() {
    if (this.convenioUsado) {
      this.mensagem('O convênio não pode ser excluido, pois está vinculado a outro cadastro.')
    } else {
      if (this.convenioID != "") {
        if (this.pergunta(`Confirma a exclusão do convênio ${this.convenio.nome}?`)) {
          this.convenioService.delConvenio(this.convenioID);
        }
      }
    }
  }

  async mensagem(mensagem: string) {
    const alert = await this.alertController.create({
      header: 'Aviso',
      message: mensagem,
      buttons: ['OK']
    });
    await alert.present();
  }

  async pergunta(pergunta: string) {
    const alert = await this.alertController.create({
      header: 'Atenção',
      message: pergunta,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            return false;
          }
        }, {
          text: 'Sim',
          handler: () => {
            return true;
          }
        }
      ]
    });
    await alert.present();
  }
 
}
