import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pacote } from 'src/app/models/pacote.interface';
import { NavController, LoadingController, ToastController, AlertController, IonRange } from '@ionic/angular';
import { ServicosService } from 'src/app/services/servicos/servicos.service';
import { FormBuilder, Validators } from '@angular/forms';
import { PacotesService } from 'src/app/services/pacotes/pacotes.service';
import { IonicSelectableComponent } from 'ionic-selectable';

@Component({
  selector: 'app-pacote',
  templateUrl: './pacote.page.html',
  styleUrls: ['./pacote.page.scss'],
})
export class PacotePage implements OnInit {
  endAtv : boolean = false;
  
  pacote: Pacote = {
    nome: '',
    validade: '',
    servicos: {id:'',nome:'',preco:''}[0],
    valor_pacote: '',
    percentual_de_desconto: '',
    valor_pacote_com_desconto: ''
  };

  //validação do formulário
  public pacoteForm: any;

  //id passada por parametro na url para quando for necessario realizar a alteração / consulta
  pacoteID = null;

  public servs: any;

  constructor(private router: ActivatedRoute,
              private nav: NavController,
              private servicoService: ServicosService,
              private pacoteService: PacotesService,
              private loading: LoadingController,
              public toastCtrl: ToastController,
              private formBuilder: FormBuilder,
              public toastController: ToastController,
              private alertController: AlertController) {
      this.pacoteForm = formBuilder.group({
        nome  : ['',Validators.compose([Validators.required])],
        validade : ['',Validators.compose([Validators.required])],
        servicos : [{id:'',nome:'',preco:''}[0],Validators.compose([Validators.required])]
      });
      this.servicoService.getServicos().subscribe(res => {
        this.servs = res.map(e => {
          return {
            id: e.payload.doc.id,
            nome:  'R$ '+e.payload.doc.data()['preco']+' - '+e.payload.doc.data()['tipo']['nome']+' '+e.payload.doc.data()['nome'],
            preco: e.payload.doc.data()['preco']
            //descricao: 'R$ '+e.payload.doc.data()['preco']+' - '+e.payload.doc.data()['tipo']['nome']+' '+e.payload.doc.data()['nome']
          };
        });
      });
  }

  ngOnInit() {
    this.pacoteID = this.router.snapshot.params['id'];
    if (this.pacoteID) {
      this.carregaPacote();
    }
  }

  async carregaPacote() {
    const loading = await this.loading.create({
      message: 'Carregando...'
    });
    await loading.present();
    this.pacoteService.getPacote(this.pacoteID).subscribe(res => {
      loading.dismiss();
      this.pacote = res;
      console.log(this.pacote);
    });
  }

  async salvarPacote() {
       
    let { nome, 
          validade, 
          servicos } = this.pacoteForm.controls;
    if (!this.pacoteForm.valid) {
      if (!nome.valid) this.presentToast("Nome é obrigatório");
      if (!validade.valid) this.presentToast("Informe a validade do pacote");
      if (!servicos.valid) this.presentToast("Informe o(s) serviço(s) do pacote");
    } else {
      const loading = await this.loading.create({
        message: 'Gravando...'
      });
      await loading.present();
      if (this.pacoteID) { //UPDATE
        this.pacoteService.updtPacote(this.pacote, this.pacoteID).then(() => {
          loading.dismiss();
          this.nav.navigateRoot('/pacotes');
        });
      } else {//INSERT
        this.pacoteService.addPacote(this.pacote).then(() => {
          loading.dismiss();
          this.nav.navigateRoot('/pacotes');
        });
      }
    }
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
      message: `Confirma a exclusão do(a) pacote <strong>${this.pacote.nome}</strong>!!!`,
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
            this.pacoteService.delPacote(this.pacoteID); 
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
    let servsAux : {id:string,nome:string,preco:string}[];
    let servsAux2 : {id:string,nome:string,preco:string}[];
    servsAux = event.value;
    servsAux2 = servsAux.filter(function(e){
        return e.id != "";
    });
    let vTotal = 0.00;
    servsAux.forEach(e => { vTotal =+ e.preco.replace(',','.') + vTotal });
    this.pacote.valor_pacote = this.formatMoney(String(vTotal));
    servsAux = servsAux2.map(e => {
      return {
        id: e.id,
        nome: e.nome,
        preco: e.preco
      };
    });
    this.pacote.servicos = servsAux;
    this.desconto(Number(this.pacote.percentual_de_desconto));
  }

  formatMoney(amount: string, decimalCount = 2, decimal = ",", thousands = ".") {
    try {
      decimalCount = Math.abs(decimalCount);
      decimalCount = isNaN(decimalCount) ? 2 : decimalCount;
  
      const negativeSign = Number(amount) < 0 ? "-" : "";
  
      let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
      let j = (i.length > 3) ? i.length % 3 : 0;
  
      return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(Number(amount) - Number(i)).toFixed(decimalCount).slice(2) : "");
    } catch (e) {
      //console.log(e)
    }
  };
  
  async onOpen(event: { 
    component: IonicSelectableComponent 
  }) {
    this.loading.dismiss();
  }

  async aplicaDesconto(event) {
    this.desconto(event.detail.value);
  }

  desconto(val:Number) {
    if (val > 0) {
      let perc, valo : any;
      perc = val;
      valo = Number(this.pacote.valor_pacote.replace(',','.')); 
      this.pacote.valor_pacote_com_desconto = this.formatMoney(String(valo-((valo*perc)/100)));
    }
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
 