import { Component, OnInit } from '@angular/core';
import { ServicosService } from 'src/app/services/servicos/servicos.service';

@Component({
  selector: 'app-servicos',
  templateUrl: './servicos.page.html',
  styleUrls: ['./servicos.page.scss'],
})
export class ServicosPage implements OnInit {

  Servicos: any;
  Servicos2: any;

  constructor(private servicoService: ServicosService) {}
 
  ngOnInit() {
    console.log('lendo os servicos');
    this.servicoService.getServicos().subscribe(res => {
      this.Servicos = res.map(e => {
        return {
          id: e.payload.doc.id,
          nome: e.payload.doc.data()['tipo']['nome']+" - "+e.payload.doc.data()['nome']

        };
      });
      this.Servicos2 = this.Servicos;
    });
  }

  setFilteredItems(ev: any) {
    this.inicializaItems();
    const val = ev.target.value;
    if (val && val.trim() != '') {
      this.Servicos = this.Servicos.filter((vServico) => {
        return (vServico['nome'].toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    }
  }
  
  inicializaItems() {
    this.Servicos = this.Servicos2;
  }

} 
