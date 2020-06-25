import { FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { ToastController, MenuController } from '@ionic/angular';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  public loginForm: any;
  public usuario: any;
  messageEmail = "";
  messageSenha = "";
  erroEmail = false;
  erroSenha = false;

  constructor(FormBuilder:FormBuilder, 
              public firebaseauth:AngularFireAuth, 
              public menuCtrl:MenuController,
              private router:Router,
              private authService: AuthService,
              private toastController:ToastController) {
      this.menuCtrl.enable(false);
      this.loginForm = FormBuilder.group({
        email: ['',Validators.compose([Validators.required,Validators.email])],
        senha: ['',Validators.compose([Validators.minLength(6),Validators.maxLength(20),Validators.required])]
      })
   }

  async presentToast(mensagem : string) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 2700,
      position: 'top'
    });
    toast.present();
  }
  
  // usuarioAutenticado: boolean;


  login(){
     let { email, senha } = this.loginForm.controls;
    if (!this.loginForm.valid) {
      // this.usuarioAutenticado = false;
      if (!email.valid) this.presentToast("Ops! Email inválido");
      if (!senha.valid) this.presentToast("A senha precisa ter de 6 a 20 caracteres")
    } else {
      this.authService.buscandoTipoProfissional(email.value);//buscando p profissional

      const login = this.loginForm.value;
      this.authService.fazerLogin(login);//faz a busca de autenticação em auth.service.ts
      

        console.log(this.authService.ProfissionalNivel);
  
    }
  }

}
