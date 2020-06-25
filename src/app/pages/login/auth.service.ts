import { Router } from '@angular/router';
import { Injectable, EventEmitter } from '@angular/core';
import { ToastController, MenuController } from '@ionic/angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { ProfissionalService } from '../../services/profissional/profissional.service';



//import { Usuario } from './usuario';


@Injectable()
export class AuthService {

  // private usuarioAutenticado: boolean = false;

  // mostrarMenuEmitter = new EventEmitter<boolean>();
  public loginForm: any;
  public usuario: any;
  messageEmail = "";
  messageSenha = "";
  erroEmail = false;
  erroSenha = false;
  Profissionais: any;
  
  constructor(private router: Router,
              public firebaseauth:AngularFireAuth,
              public menuCtrl:MenuController,
              private profissionalService: ProfissionalService,
              private toastController:ToastController) {
                this.menuCtrl.enable(false);
     
      firebaseauth.user.subscribe((data => {
        this.usuario = data;
      }));
      this.usuarioAutenticado = false;
      console.log('lendo os profissionais');
    this.profissionalService.getProfissionais().subscribe(res => {
      this.Profissionais = res.map(e => {
        return {
          id: e.payload.doc.id,
          nome: e.payload.doc.data()['nome'],
          email: e.payload.doc.data()['email'],
          nivel: e.payload.doc.data()['nivel']
        };
      });
      //this.Profissionais2 = this.Profissionais;
    });

      }

  
  
  usuarioAutenticado: boolean;

  fazerLogin(login: any){
      
      this.firebaseauth.auth.signInWithEmailAndPassword(login.email,login.senha).
      then(()=> {
        this.usuarioAutenticado = true;
        
        this.router.navigate(['/agenda']);
        
       //para verificar os privilegios do cliente
       
        //this.router.navigate(['/agenda']);
      }).
      catch((erro:any)=>{
        this.usuarioAutenticado = false;
        alert("Email ou Senha Incorretos autenticação");
      });
      //this.buscandoTipoProfissional(login.email);  
      //console.log(this.profissionalTipoValidacao); 
    }
    Profissionais22: any;
    profissionalTipoValidacao: any;

    ProfissionalNivelNumero: number;
    ProfissionalNivel: string;
    
    vr: any;

    buscandoTipoProfissional(emailLogin: string){

      // this.Profissionais22 = this.Profissionais.filter((vProfissional) => {
      //   return (vProfissional['email'].toLowerCase().indexOf(emailLogin.toLowerCase()) > -1);
      // });
  
      this.Profissionais.forEach((value) => {
        if(value.email == emailLogin){
          console.log('Nivel do Profissional: ' + value.nivel);
          this.ProfissionalNivel = value.nivel;
        }
      });

      if(this.ProfissionalNivel == 'visualizacao'){
        this.ProfissionalNivelNumero = 1;
      } else if(this.ProfissionalNivel == 'atendente'){
        this.ProfissionalNivelNumero = 2;
        console.log(this.ProfissionalNivelNumero);
      } else if (this.ProfissionalNivel == 'administrador'){
        this.ProfissionalNivelNumero = 3;
      } else {
        this.ProfissionalNivelNumero = 3;//se não tiver nenhum nivel cadastrado ele entra como adm
      }
    }

  usuarioEstaAutenticado(){
    return this.usuarioAutenticado;
  }

}