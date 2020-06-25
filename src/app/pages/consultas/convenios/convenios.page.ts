import { Component, OnInit } from '@angular/core';
import { ConvenioService } from '../../../services/convenios/convenio.service';

@Component({
  selector: 'app-convenios',
  templateUrl: './convenios.page.html',
  styleUrls: ['./convenios.page.scss'],
})
export class ConveniosPage implements OnInit {
  Convenios: any;
  Convenios2: any;

  constructor(private ConvenioService: ConvenioService) {}

  ngOnInit() {
    console.log('lendo od convenios');
    this.ConvenioService.getConvenios().subscribe(res => {
      this.Convenios = res.map(e => {
        return {
          id: e.payload.doc.id,
          nome: e.payload.doc.data()['nome']
        };
      });
      this.Convenios2 = this.Convenios2;
    });
  }

  setFilteredItems(ev: any) {
    this.inicializaItems();
    const val = ev.target.value;
    if (val && val.trim() != '') {
      this.Convenios = this.Convenios.filter((vConvenio) => {
        return (vConvenio['nome'].toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    }
  }

  inicializaItems() {
    this.Convenios = this.Convenios2;
  }
}