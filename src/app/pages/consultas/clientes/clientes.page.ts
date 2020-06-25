import { Component, OnInit } from '@angular/core';
import { ClientesService } from '../../../services/clientes/clientes.service';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
})
export class ClientesPage implements OnInit {

  Clientes: any;
  Clientes2: any;

  constructor(private clienteService: ClientesService) {}
 
  ngOnInit() {
    console.log('lendo os clientes');
    this.clienteService.getClientes().subscribe(res => {
      this.Clientes = res.map(e => {
        return {
          id: e.payload.doc.id,
          nome: e.payload.doc.data()['nome']
        };
      });
      this.Clientes2 = this.Clientes;
    });
  }

  setFilteredItems(ev: any) {
    this.inicializaItems();
    const val = ev.target.value;
    if (val && val.trim() != '') {
      this.Clientes = this.Clientes.filter((vCliente) => {
        return (vCliente['nome'].toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    }
  }
  
  inicializaItems() {
    this.Clientes = this.Clientes2;
  }

  
}
