import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pacote } from 'src/app/models/pacote.interface';
import { NavController, LoadingController, ToastController, AlertController, IonRange } from '@ionic/angular';
import { ServicosService } from 'src/app/services/servicos/servicos.service';
import { ClientesService } from 'src/app/services/clientes/clientes.service';
import { FormBuilder, Validators } from '@angular/forms';
//import { PacotesService } from 'src/app/services/pacotes/pacotes.service';
import { PagamentoService } from 'src/app/services/pagamento/pagamento.service';
import { IonicSelectableComponent } from 'ionic-selectable';
import { Pagamento } from 'src/app/models/pagamento.interface';

@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.page.html',
  styleUrls: ['./pagamento.page.scss'],
})
export class PagamentoPage implements OnInit {

  //não está usando
  public parcelas: any[] = [
    {parcela:'1',vencimento:'15/05/2019',vlrParc:'R$ 100,00',cor:'light'},
    {parcela:'2',vencimento:'15/06/2019',vlrParc:'R$ 100,00',cor:''},
    {parcela:'3',vencimento:'15/07/2019',vlrParc:'R$ 100,00',cor:'light'}
  ];

  endAtv : boolean = false;
  
  // pacote: Pacote = {
  //   nome: '',
  //   validade: '',
  //   servicos: {id:'',nome:'',preco:''}[0],
  //   valor_servicos: '',
  //   percentual_de_desconto: '',
  //   valor_servicos_com_desconto: ''
  // };

  pagamento: Pagamento = {
    cliente: {id:'',nome:''}[0],
    data: '',
    servicos: {id:'',nome:'',preco:''}[0],
    valor_servicos: '',
    percentual_de_desconto: '',
    valor_pago: ''
  };

  //validação do formulário
  public pagamentoForm: any;

  //id passada por parametro na url para quando for necessario realizar a alteração / consulta
  pagamentoID = null;

  public servs: any;
  public clients: any;//Populado com os clientes cadastrados no BD

  constructor(private router: ActivatedRoute,
              private nav: NavController,
              private servicoService: ServicosService,
              private clientesService: ClientesService,
              private pagamentoService: PagamentoService,
              private loading: LoadingController,
              public toastCtrl: ToastController,
              private formBuilder: FormBuilder,
              public toastController: ToastController,
              private alertController: AlertController) {
      this.pagamentoForm = formBuilder.group({
        //nome  : ['',Validators.compose([Validators.required])],
        data : ['',Validators.compose([Validators.required])],
        servicos : [{id:'',nome:'',preco:''}[0],Validators.compose([Validators.required])],
        cliente : [{id:'',nome:''}[0],Validators.compose([Validators.required])]
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
    //para listar os clientes
      this.clientesService.getClientes().subscribe(res => {
        this.clients = res.map(e => {
          return {
            id: e.payload.doc.id,
            nome: e.payload.doc.data()['nome']
          };
        });
      });
  }

  //PARA UPDATE
  ngOnInit() {
    this.pagamentoID = this.router.snapshot.params['id'];
    if (this.pagamentoID) {
      this.carregaPagamento();
    }
    this.desconto(2);
  }

  //para UPDATE
  async carregaPagamento() {
    const loading = await this.loading.create({
      message: 'Carregando...'
    });
    await loading.present();
    this.pagamentoService.getPagamento(this.pagamentoID).subscribe(res => {
      loading.dismiss();
      this.pagamento = res;
      console.log(this.pagamento);
    });
  }

  //PARA INSERT
  async salvarPagamento() {
       
    let { nome, 
          data, 
          servicos } = this.pagamentoForm.controls;
    if (!this.pagamentoForm.valid) {
      if (!nome.valid) this.presentToast("Nome é obrigatório");
      if (!data.valid) this.presentToast("Informe a data do pagamento");
      if (!servicos.valid) this.presentToast("Informe o(s) serviço(s) do pagamento");
    } else {
      const loading = await this.loading.create({
        message: 'Gravando...'
      });
      await loading.present();
      if (this.pagamentoID) { //UPDATE
        this.pagamentoService.updtPagamento(this.pagamento, this.pagamentoID).then(() => {
          loading.dismiss();
          this.nav.navigateRoot('/pagamento');
        });
      } else {//INSERT
        this.pagamentoService.addPagamento(this.pagamento).then(() => {
          loading.dismiss();
          this.nav.navigateRoot('/pagamento');
        });
      }
    }
  }

  //UTILIZADO AO SALVAR
  async presentToast(mensagem : string) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 2700,
      position: 'top'
    });
    toast.present();
  }

  // end(){
  //   this.endAtv = !this.endAtv;
  //   if (this.endAtv) {} //não sei como fazer
  // }

  async deletar() {
    console.log('exclusão iniciando');
    const alert = await this.alertController.create({
      header: 'Atenção',
      message: `Confirma a exclusão do(a) pagamento <strong>${this.pagamento.cliente}</strong>!!!`,
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
            this.pagamentoService.delPagamento(this.pagamentoID); 
          }
        }
      ]
    });
    await alert.present();
  }

  //para abrir caixa de seleção dos servicos
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
    this.pagamento.valor_servicos = this.formatMoney(String(vTotal));
    servsAux = servsAux2.map(e => {
      return {
        id: e.id,
        nome: e.nome,
        preco: e.preco
      };
    });
    this.pagamento.servicos = servsAux;
    this.desconto(Number(this.pagamento.percentual_de_desconto));
  }

  tipoChangeCliente(event: {
    component: IonicSelectableComponent,
    value: any 
  }) {
    let clientsAux : {id:string,nome:string}[];
    let clientsAux2 : {id:string,nome:string}[];
    clientsAux = event.value;
    clientsAux2 = clientsAux.filter(function(e){
        return e.id != "";
    });
    //let vTotal = 0.00;
    // clientsAux.forEach(e => { vTotal =+ e.preco.replace(',','.') + vTotal });
    // this.pagamento.valor_servicos = this.formatMoney(String(vTotal));
    clientsAux = clientsAux2.map(e => {
      return {
        id: e.id,
        nome: e.nome
      };
    });

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
      valo = Number(this.pagamento.valor_servicos.replace(',','.')); 
      this.pagamento.valor_pago = this.formatMoney(String(valo-((valo*perc)/100)));
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
