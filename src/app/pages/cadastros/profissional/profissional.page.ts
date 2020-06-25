import { Component, OnInit } from '@angular/core';
import { Profissional } from '../../../models/profissional.interface';
import { ProfissionalService } from '../../../services/profissional/profissional.service';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController, ToastController, AlertController } from '@ionic/angular';
import { FormBuilder, Validators } from '@angular/forms';
import { ConsCepService } from 'src/app/services/consCEP/cons-cep.service';
import { IonicSelectableComponent } from 'ionic-selectable';
import { ServicosService } from 'src/app/services/servicos/servicos.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-profissional',
  templateUrl: './profissional.page.html',
  styleUrls: ['./profissional.page.scss'],
})
export class ProfissionalPage implements OnInit {

  endAtv : boolean = false;

  public profissionalLoginForm: any;
 
  //utilizado na ao salvar ou atualizar o profissional
  public profissionalLogin: {
    email: '',
    senha: ''
  }

  profissional: Profissional = {
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
    longitude: '',
    latitude: '',
    nivel: '',
    funcao: {id:'',nome:''}[0]
  };

  //validação do formulário
  public profissionalForm: any;

  //id passada por parametro na url para quando for necessario realizar a alteração / consulta
  profissionalID = null;

  //relação de funções no sistema para o funcionário
  public funcoesCadastradas: any[] = [
    {id: '1', nome: 'Cabelereiro'},
    {id: '2', nome: 'Manicure'},
    {id: '3', nome: 'Pedicuri'},
    {id: '4', nome: 'Atendente'},
    {id: '5', nome: 'Gerente'},
    {id: '5', nome: 'Massagista'},
  ];

  //para abrir a caixa de seleção de função
  async onClick(event: { 
    component: IonicSelectableComponent 
  }) {
    const loading = await this.loading.create({
      message: 'Carregando...'
    });
    await loading.present();
  }
//para abrir a caixa de seleção de função
  async onOpen(event: { 
    component: IonicSelectableComponent 
  }) {
    this.loading.dismiss();
  }

  //para caixa de seleção da função do profissional
  tipoChange(event: {
    component: IonicSelectableComponent,
    value: any 
  }) {
    let funcoesCadastradasAux : {id:string,nome:string}[];
    let funcoesCadastradasAux2 : {id:string,nome:string}[];
    funcoesCadastradasAux = event.value;
    funcoesCadastradasAux2 = funcoesCadastradasAux.filter(function(e){
        return e.id != "";
    });
    funcoesCadastradasAux = funcoesCadastradasAux2.map(e => {
      return {
        id: e.id,
        nome: e.nome
      };
    });
    this.profissional.funcao = funcoesCadastradasAux;
  }

  public genero: any[] = [
    { sexo: 'Feminino' },
    { sexo: 'Masculino' }
  ];

  public nivelAcesso: any[] = [
    { nivel: 'visualizacao' },
    { nivel: 'administrativo' },
    { nivel: 'atendente' }
  ];

  
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
              public firebaseauth:AngularFireAuth,
              private profissionalService: ProfissionalService,
              private servicoService: ServicosService,
              private loading: LoadingController,
              private consCEP: ConsCepService,
              public toastCtrl: ToastController,
              private geolocation: Geolocation,
              private formBuilder: FormBuilder,
              public toastController: ToastController,
              private alertController: AlertController) {
      this.profissionalForm = formBuilder.group({
        nome  : ['',Validators.compose([Validators.required])],
        tel1  : ['',Validators.compose([Validators.required])],
        funcao : [{id:'',nome:''}[0],Validators.compose([Validators.required])],
        email: ['',Validators.compose([Validators.required,Validators.email])]
      });
      this.profissionalLoginForm = formBuilder.group({
        senha: ['',Validators.compose([Validators.minLength(6),Validators.maxLength(20),Validators.required])]
      });
  }

  ProfissionaisF: any;
  ProfissionaisF2: any;

  public listaProfFuncoes: [{nome : string , tipo : string}];//um array de funções do funcionario

  ngOnInit() {
    this.getLocation();//para pegar as coordenadas da pessoa como log de local
    this.profissionalID = this.router.snapshot.params['id'];
    if (this.profissionalID) {
      this.carregaProfissional();
    }

    console.log('lendo a função dos profissionais');
    this.profissionalService.getProfissionais().subscribe(res => {
      this.ProfissionaisF = res.map(e => {
        return {
          nome: e.payload.doc.id,
          tipo: e.payload.doc.data()['nome']
        };
      });
      this.ProfissionaisF2 = this.ProfissionaisF;
    });
  }
  
  async carregaProfissional() {
    const loading = await this.loading.create({
      message: 'Carregando...'
    });
    await loading.present();
    this.profissionalService.getProfissional(this.profissionalID).subscribe(res => {
      loading.dismiss();
      this.profissional = res;
      console.log(this.profissional);
    });
  }

  async salvarProfissional() {
    let { nome, tel1, email} = this.profissionalForm.controls;
    let {senha} = this.profissionalLoginForm.controls;

    if (this.profissionalID) {//UPDATE
      if (!this.profissionalForm.valid) {
        if (!nome.valid) this.presentToast("Cliente é obrigatório");
        if (!tel1.valid) this.presentToast("Telefone 1 é obrigatório");
        if (!email.valid) this.presentToast("E-mail é obrigatório");
      } else {     
        const loading = await this.loading.create({
          message: 'Gravando...'
        });
        await loading.present();

       

        this.profissionalService.updtProfissional(this.profissional, this.profissionalID).then(() => {
          loading.dismiss();
          this.nav.navigateRoot('/profissionais');
        });      
      }
    } else {//INSERT
      if (!this.profissionalForm.valid || !this.profissionalLoginForm.valid) {
        if (!nome.valid) this.presentToast("Cliente é obrigatório");
        if (!tel1.valid) this.presentToast("Telefone 1 é obrigatório");
        if (!email.valid) this.presentToast("E-mail é obrigatório");
          if (!senha.valid) this.presentToast("Senha é obrigatória");
      } else {    
        const loading = await this.loading.create({
          message: 'Gravando...'
        });
        await loading.present();

        //criando o login de autenticação      
        const loginsenha =  this.profissionalLoginForm.value;
        const loginemail =  this.profissionalForm.value;
        this.firebaseauth.auth.createUserWithEmailAndPassword(loginemail.email, loginsenha.senha)
        .then(() => {
          this.presentToast('Usuário criado com sucesso');
          return true;
        }).
        catch((erro: any) => {
        this.presentToast(erro);
        return false;
        });
        //criando o profissional
        this.profissionalService.addProfissional(this.profissional).then(() => {
          loading.dismiss();
          this.nav.navigateRoot('/profissionais');
        });
      } 
    }
  }

  //ENVIA UM E-MAIL PAR AA PESSOA ATUALIZAR A SENHA 
  redefinirSenha(){  
       const loginsenha =  this.profissionalLoginForm.value;
       const loginemail =  this.profissionalForm.value;
       this.firebaseauth.auth.sendPasswordResetEmail(loginemail.email)//ENVIA UM E-MAIL DE AUTENTICAÇÃO
       .then(() => {
         this.presentToast('Enviado e-mail de verificação');
         return true; 
       }).
       catch((erro: any) => {
       this.presentToast(erro);
       return false;
       });
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
    this.profissional.logradouro = dados.logradouro;
    this.profissional.complemento = dados.complemento;
    this.profissional.bairro = dados.bairro;
    this.profissional.cidade = dados.localidade;
    this.estados.forEach(estado => {
      if (dados.uf == estado.uf.substring(0,2)) {
        console.log(dados.uf == estado.uf.substring(0,2));
        this.profissional.uf = estado.uf;  
      }
    });
  }

  //para mensagem de validação
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
      message: `Confirma a exclusão do(a) profissional <strong>${this.profissional.nome}</strong>!!!`,
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
            this.profissionalService.delProfissional(this.profissionalID); 
            // loading.dismiss();
            this.nav.navigateRoot('/profissionais');
          }
        }
      ]
    });
    await alert.present();
  }


  // getLocation() {
  //   navigator.geolocation.getCurrentPosition.then((res) => {
  //     res.coords.latitude
  //     res.coords.longitude
  //   }).catch((error) => {
  //     console.log("erro");
  //   });
  // } 

  public coordenadas = {latitude:0, longitude:0};


  // getCoordenadas(){
  //      let stream = navigator.geolocation.getCurrentPosition().
  //      stream.subscribe(data=>{
  //         this.coordenadas.latitude = data.coords.latitude;
  //         this.coordenadas.longitude = data.coords.longitude;
  //         //da um cosole.log aqui e testa
  //      });
  //     }

public latitude: any;
public longitude: any;
      
  getLocation() {
    this.geolocation.getCurrentPosition().then((resp) => {
    this.latitude = resp.coords.latitude;
    this.longitude = resp.coords.longitude;
    this.profissional.latitude = resp.coords.latitude;
    this.profissional.longitude = resp.coords.longitude;
    }).catch((error) => {
      console.log('Erro buscando a sua localização', error);
    });
  }

}
