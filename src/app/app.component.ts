import { Component } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { AuthService } from './pages/login/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  public appPages = [
    { titulo: 'Agenda',        title: 'agenda',        color:'primary', icon: 'calendar', nivel: 1},
    { titulo: 'Clientes',      title: 'clientes',      color:'primary', icon: 'people', nivel: 2 },
    { titulo: 'Profissionais', title: 'profissionais', color:'primary', icon: 'person', nivel: 3},
    { titulo: 'Pacote',        title: 'pacotes',       color:'primary', icon: 'cube', nivel: 2 },
    { titulo: 'Servico',       title: 'servicos',      color:'primary', icon: 'cut', nivel: 2 },
    { titulo: 'Convenio',      title: 'convenios',     color:'primary', icon: 'star', nivel: 2 },
    { titulo: 'Pagamento',    title: 'pagamento',    color:'primary', icon: 'cash', nivel: 2 },
    { titulo: 'Relatorios',    title: 'relatorios',    color:'primary', icon: 'paper', nivel: 3},
    { titulo: 'Sair',    title: 'login',    color:'primary', icon: 'exit', nivel: 1}
  ];

  private showSideMenu : boolean = true;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private navCtrl: NavController,
    private rout: Router,
    private authService: AuthService
  ) {
    this.initializeApp();
    console.log(this.showSideMenu);
  }

  goTo(vTitle:string){
    this.rout.navigate([vTitle]);
    
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
