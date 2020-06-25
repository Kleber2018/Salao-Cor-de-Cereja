import { Component, OnInit } from '@angular/core';
import { ProfissionalService } from '../../../services/profissional/profissional.service';

@Component({
  selector: 'app-profissionais',
  templateUrl: './profissionais.page.html',
  styleUrls: ['./profissionais.page.scss'],
})
export class ProfissionaisPage implements OnInit {

  Profissionais: any;
  Profissionais2: any;

  constructor(private profissionalService: ProfissionalService) {}
 
  ngOnInit() {
    console.log('lendo os profissionais');
    this.profissionalService.getProfissionais().subscribe(res => {
      this.Profissionais = res.map(e => {
        return {
          id: e.payload.doc.id,
          nome: e.payload.doc.data()['nome']
        };
      });
      this.Profissionais2 = this.Profissionais;
    });
  }

  setFilteredItems(ev: any) {
    this.inicializaItems();
    const val = ev.target.value;
    if (val && val.trim() != '') {
      this.Profissionais = this.Profissionais.filter((vProfissional) => {
        return (vProfissional['nome'].toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    }
  }
  
  inicializaItems() {
    this.Profissionais = this.Profissionais2;
  }

  

}
