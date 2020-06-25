import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.page.html',
  styleUrls: ['./agenda.page.scss'],
})
export class AgendaPage {
  public pgAgenda : boolean = false; 

  public horarios: any[] = [
    {HH_MM:'09:00 - 10:30', color:'light' , ocupado : false},
    {HH_MM:'10:30 - 12:00', color:'' , ocupado : true},
    {HH_MM:'13:00 - 14:30', color:'light' , ocupado : false},
    {HH_MM:'14:30 - 15:30', color:'' , ocupado : false}, 
    {HH_MM:'15:30 - 17:00', color:'light' , ocupado : true},
    {HH_MM:'17:00 - 18:30', color:'' , ocupado : false},
    {HH_MM:'18:30 - 20:0' , color:'light' , ocupado : false}
  ];

  constructor(private menuCtrl: MenuController) {
    this.menuCtrl.enable(true);
   }

  segmentChanged(ev: boolean) {
    console.log('Segment changed');
    this.pgAgenda = !this.pgAgenda;
  }

  

}
