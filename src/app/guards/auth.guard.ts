import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../pages/login/auth.service';
import { NavController, LoadingController, ToastController, AlertController } from '@ionic/angular';

//import {CanActivate} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private nav: NavController,
    private router: Router
  ) { }
canActivate(
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) : Observable<boolean> | boolean {

  if(this.authService.usuarioEstaAutenticado()){
    return true;
  } 
  this.router.navigate(['/login']);
     //this.nav.navigateRoot('/login');
    return false;//retorna true se o usuário estiver conectado
 
  
}

}
