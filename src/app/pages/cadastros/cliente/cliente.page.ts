import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../../models/cliente.interface';
import { ClientesService } from '../../../services/clientes/clientes.service';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController, ToastController, AlertController } from '@ionic/angular';
import { FormBuilder, Validators } from '@angular/forms';
import { ConsCepService } from 'src/app/services/consCEP/cons-cep.service';
import { ConvenioService } from 'src/app/services/convenios/convenio.service';


@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.page.html',
  styleUrls: ['./cliente.page.scss'],
})

export class ClientePage implements OnInit {
  endAtv : boolean = false;
  
  cliente: Cliente = {
    nome: '',
    cpf: '',
    email: '',
    tel1: '',
    tel2: '',
    genero: '',
    logradouro: '',
    nr: '',
    bairro: '',
    complemento: '',
    cidade: '',
    uf: '',
    cep: '',
    convenio: ''
  };

  //validação do formulário
  public clienteForm: any;

  //id passada por parametro na url para quando for necessario realizar a alteração / consulta
  clienteID = null;


  public genero: any[] = [
    { sexo: 'Feminino' },
    { sexo: 'Masculino' }
  ];

  public convenios: any;

  public estados: any[] = [
    { uf: 'AC - Acre' },
    { uf: 'AL - Alagoas' },
    { uf: 'AP - Amapá' },
    { uf: 'AM - Amazonas' },
    { uf: 'BA - Bahia' },
    { uf: 'CE - Ceará' },
    { uf: 'DF - Distrito Federal' },
    { uf: 'ES - Espírito Santo' },
    { uf: 'GO - Goiás' },
    { uf: 'MA - Maranhão' },
    { uf: 'MT - Mato Grosso' },
    { uf: 'MS - Mato Grosso do Sul' },
    { uf: 'MG - Minas Gerais' },
    { uf: 'PA - Pará' },
    { uf: 'PB - Paraíba' },
    { uf: 'PR - Paraná' },
    { uf: 'PE - Pernambuco' },
    { uf: 'PI - Piauí' },
    { uf: 'RJ - Rio de Janeiro' },
    { uf: 'RN - Rio Grande do Norte' },
    { uf: 'RS - Rio Grande do Sul' },
    { uf: 'RO - Rondônia' },
    { uf: 'RR - Roraima' },
    { uf: 'SC - Santa Catarina' },
    { uf: 'SP - São Paulo' },
    { uf: 'SE - Sergipe' },
    { uf: 'TO - Tocantins' }
  ];

  constructor(private router: ActivatedRoute,
              private nav: NavController,
              private clienteService: ClientesService,
              private convenioService: ConvenioService,
              private loading: LoadingController,
              private consCEP: ConsCepService,
              public toastCtrl: ToastController,
              private formBuilder: FormBuilder,
              public toastController: ToastController,
              private alertController: AlertController) {
      this.clienteForm = formBuilder.group({
        nome  : ['',Validators.compose([Validators.required])],
        email : ['',Validators.compose([Validators.required,Validators.email])],
        tel1  : ['',Validators.compose([Validators.required])],
      });
      this.convenioService.getConvenios().subscribe(res => {
        this.convenios = res;
        console.log(this.convenios);
      });
      this.convenioService.getConvenios().subscribe(res => {
        this.convenios = res.map(e => {
          return {
            id: e.payload.doc.id,
            nome: e.payload.doc.data()['nome']
          };
        });
      });
  }

  ngOnInit() {
    this.clienteID = this.router.snapshot.params['id'];
    if (this.clienteID) {
      this.carregaCliente();
    }
  }

  async carregaCliente() {
    const loading = await this.loading.create({
      message: 'Carregando...'
    });
    await loading.present();
    this.clienteService.getCliente(this.clienteID).subscribe(res => {
      loading.dismiss();
      this.cliente = res;
      console.log(this.cliente);
    });
  }

  async salvarCliente() {
       
    let { nome, email, tel1 } = this.clienteForm.controls;

    if (!this.clienteForm.valid) {
      if (!email.valid) this.presentToast("Email inválido");
      if (!nome.valid) this.presentToast("Nome é obrigatório");
      if (!tel1.valid) this.presentToast("Telefone 1 é obrigatório");
    }
    else {
      const loading = await this.loading.create({
        message: 'Gravando...'
      });
      await loading.present();
      if (this.clienteID) { //UPDATE
        this.clienteService.updtCliente(this.cliente, this.clienteID).then(() => {
          loading.dismiss();
          this.nav.navigateRoot('/clientes');
        });
      } else {//INSERT
        this.clienteService.addCliente(this.cliente).then(() => {
          loading.dismiss();
          this.nav.navigateRoot('/clientes');
        });
      }
    }
  }

  buscaCEP(vCep : String) {
		this.consCEP.callService(vCep)
		.subscribe( dados => {
      this.populaDadosForm(dados);
      console.log(dados);
    });
  }

  populaDadosForm(dados) {
    console.log(dados);
    this.cliente.logradouro = dados.logradouro;
    this.cliente.complemento = dados.complemento;
    this.cliente.bairro = dados.bairro;
    this.cliente.cidade = dados.localidade;
    this.estados.forEach(estado => {
      if (dados.uf == estado.uf.substring(0,2)) {
        console.log(dados.uf == estado.uf.substring(0,2));
        this.cliente.uf = estado.uf;  
      }
    });
  }

  async presentToast(mensagem : string) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 2700,
      position: 'top'
    });
    toast.present();
  }

  end(){
    this.endAtv = !this.endAtv;
    if (this.endAtv) {} //não sei como fazer
  }

  async deletar() {
    console.log('exclusão iniciando');
    const alert = await this.alertController.create({
      header: 'Atenção',
      message: `Confirma a exclusão do(a) cliente <strong>${this.cliente.nome}</strong>!!!`,
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
            this.clienteService.delCliente(this.clienteID); 
            this.nav.navigateRoot('/clientes');
          }
        }
      ]
    });
    await alert.present();
  }
  
}