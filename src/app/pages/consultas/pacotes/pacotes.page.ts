import { Component, OnInit } from '@angular/core';
import { PacotesService } from 'src/app/services/pacotes/pacotes.service';

@Component({
  selector: 'app-pacotes',
  templateUrl: './pacotes.page.html',
  styleUrls: ['./pacotes.page.scss'],
})
export class PacotesPage implements OnInit {

  Pacotes: any;
  Pacotes2: any;

  constructor(private pacoteService: PacotesService) {}
 
  ngOnInit() {
    console.log('lendo os pacotes');
    this.pacoteService.getPacotes().subscribe(res => {
      this.Pacotes = res.map(e => {
        return {
          id: e.payload.doc.id,
          nome: e.payload.doc.data()['nome']
        };
      });
      this.Pacotes2 = this.Pacotes;
    });
  }

  setFilteredItems(ev: any) {
    this.inicializaItems();
    const val = ev.target.value;
    if (val && val.trim() != '') {
      this.Pacotes = this.Pacotes.filter((vPacote) => {
        return (vPacote['nome'].toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    }
  }
  
  inicializaItems() {
    this.Pacotes = this.Pacotes2;
  }


}
