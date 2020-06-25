import { Component, OnInit, ViewChild } from '@angular/core';
import { Servico } from 'src/app/models/servicos.interface';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, ToastController, NavController, AlertController } from '@ionic/angular';
import { ServicosService } from 'src/app/services/servicos/servicos.service';
import { FormBuilder, Validators } from '@angular/forms';
import { IonicSelectableComponent } from 'ionic-selectable';

@Component({
  selector: 'app-servico',
  templateUrl: './servico.page.html',
  styleUrls: ['./servico.page.scss'],
})

export class ServicosPage implements OnInit {

  protected servico: Servico = {
    id: '',
    nome: '',
    descricao: '',
    tempo_medio: '',
    materiais: '',
    tipo: '',
    preco: ''
  }; 
 
  public tipos: any[] = [
    { id :  '1', nome: 'Matização dos Fios' },
    { id :  '2', nome: 'Descoloração' },
    { id :  '3', nome: 'Luzes' },
    { id :  '4', nome: 'Decapagem' },
    { id :  '5', nome: 'Corte Feminino' },
    { id :  '6', nome: 'Escova Tradicional' },
    { id :  '7', nome: 'Escova Progressiva' },
    { id :  '8', nome: 'Escova Definitiva' },
    { id :  '9', nome: 'Hidratação Capilar' },
    { id : '10', nome: 'Reconstrução Capilar' },
    { id : '11', nome: 'Mega Hair' },
    { id : '12', nome: 'Apliques' },
    { id : '13', nome: 'Mechas' },
    { id : '14', nome: 'Mechas Californianas' },
    { id : '15', nome: 'Reflexos' },
    { id : '16', nome: 'Coloração' },
    { id : '17', nome: 'Balayagem' },
    { id : '18', nome: 'Tonalização com henna' },
    { id : '19', nome: 'Fio a fio com highlight' },
    { id : '20', nome: 'Micropigmentação hiperrealista' },
    { id : '21', nome: 'Micropigmentação fio a fio 3D' },
    { id : '22', nome: 'Alisamento de sobrancelhas' },
    { id : '23', nome: 'Manicure' },
    { id : '24', nome: 'Pedicure' },
    { id : '25', nome: 'Maquiagens' },
    { id : '26', nome: 'Cílios Postiços' },
    { id : '27', nome: 'Mãos' },
    { id : '28', nome: 'Pés' },
    { id : '29', nome: 'Limpeza de Pele' },
    { id : '30', nome: 'Peeling de Diamante' },
    { id : '31', nome: 'Máscara de Ouro' },
    { id : '32', nome: 'Hidratação Facial' },
    { id : '33', nome: 'Tratamento Para Manchas' },
    { id : '34', nome: 'Tratamento Para Acne' },
    { id : '35', nome: 'Aplicação de Vitamina C' },
    { id : '36', nome: 'Radiofrequência' },
    { id : '37', nome: 'Massagem Modeladora' },
    { id : '38', nome: 'Massagem Relaxante' },
    { id : '39', nome: 'Drenagem Linfática' },
    { id : '40', nome: 'Radiofrequência' },
    { id : '41', nome: 'Endermologia' },
    { id : '42', nome: 'Pump up Glúteo' },
    { id : '43', nome: 'Criofrequência' },
    { id : '44', nome: 'Fotodepilação' },
    { id : '45', nome: 'Depilação Feminina' },
    { id : '46', nome: 'Drenagem Linfática para Gestantes' },
    { id : '47', nome: 'Dia da Noiva' },
    { id : '48', nome: 'Dia de Formanda' }
  ];

  protected servicoForm: any;
  protected servicoID = null;
  protected servicoUsado: boolean = false;

  constructor(private router: ActivatedRoute,
              private loading: LoadingController,
              private servicoService: ServicosService,
              public toastCtrl: ToastController,
              public toastController: ToastController,
              private nav: NavController,
              private formBuilder: FormBuilder,
              private alertController: AlertController) {

    this.servicoForm = formBuilder.group({
      nome: ['', Validators.compose([Validators.required])],
      descricao: ['', Validators.compose([Validators.required])],
      tempo_medio: ['', Validators.compose([Validators.required])],
      materiais: ['', Validators.compose([Validators.required])],
      tipo: ['', Validators.compose([Validators.required])],
      preco: ['', Validators.compose([Validators.required])],
    })
  }

  ngOnInit() {
    this.servicoID = this.router.snapshot.params['id'];
    if (this.servicoID) {
      this.carregaServico();
    }
  }

  async carregaServico() {
    const loading = await this.loading.create({
      message: 'Carregando...'
    });
    await loading.present();
    this.servicoService.getServico(this.servicoID).subscribe(res => {
      loading.dismiss();
      this.servico = res;
      console.log(this.servico);
    });
  }

  async salvarServico() {
    let { nome, descricao, tempo_medio, materiais, tipo, preco } = this.servicoForm.controls;

    if (!this.servicoForm.valid) {
      if (!nome.valid) this.presentToast("Nome é obrigatório");
      if (!descricao.valid) this.presentToast("A descrição é obrigatória");
      if (!tempo_medio.valid) this.presentToast("O tempo médio é obrigatório");
      if (!materiais.valid) this.presentToast("Os Materiais utilizados são obrigatórios");
      if (!tipo.valid) this.presentToast("O tipo é obrigatório");
      if (!preco.valid) this.presentToast("O preço é obrigatório");
    }
    else {
      const loading = await this.loading.create({
        message: 'Gravando...'
      });
      await loading.present();
      if (this.servicoID) { //UPDATE
        this.servicoService.updtServicos(this.servico, this.servicoID).then(() => {
          loading.dismiss();
          this.nav.navigateRoot('/servicos');
        });
      } else {//INSERT
        this.servicoService.addServicos(this.servico).then(() => {
          loading.dismiss();
          this.nav.navigateRoot('/servicos');
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

  async deletar() {
    console.log('exclusão iniciando');
    const alert = await this.alertController.create({
      header: 'Atenção',
      message: `Confirma a exclusão do(a) serviço <strong>${this.servico.nome}</strong>!!!`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('cancelou a exclusão');
          }
        }, {
          text: 'Sim',
          handler: () => {
            console.log('confirmou exclusão');
            this.servicoService.delServico(this.servicoID); 
            this.nav.navigateRoot('/servicos');
          }
        }
      ]                   
    });
    await alert.present();
  }

  tipoChange(event: {
    component: IonicSelectableComponent,
    value: any 
  }) {
    console.log('tipo:', event.value);
  }

  async onOpen(event: { 
    component: IonicSelectableComponent 
  }) {
    this.loading.dismiss();
  }

  async onClick(event: { 
    component: IonicSelectableComponent 
  }) {
    const loading = await this.loading.create({
      message: 'Carregando...'
    });
    await loading.present();
  }

}