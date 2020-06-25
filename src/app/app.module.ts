import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, RouterModule } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { IonicStorageModule } from '@ionic/storage';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { HttpClientModule } from '@angular/common/http';
import { NgxMaskIonicModule } from 'ngx-mask-ionic';
import { IonicSelectableModule } from 'ionic-selectable';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import {AuthService} from 'src/app/pages/login/auth.service';
import { AuthGuard } from './guards/auth.guard';

 //kleber
const firebaseConfig = {
  apiKey: "AIzaSyChsZ7x0myLgLhtK9tf7Fa2uC5so839iLA",
  authDomain: "salao-ecd98.firebaseapp.com",
  databaseURL: "https://salao-ecd98.firebaseio.com",
  projectId: "salao-ecd98",
  storageBucket: "salao-ecd98.appspot.com",
  messagingSenderId: "801589616617",
  appId: "1:801589616617:web:449240e1e85a334b"
};

//Cris
// export const firebaseConfig = {
//   apiKey: "AIzaSyD30CazSPYhXv9_0hJoUUbCcOoR8Dd-aVM",
//   authDomain: "salao-cereja.firebaseapp.com",
//   databaseURL: "https://salao-cereja.firebaseio.com",
//   projectId: "salao-cereja",
//   storageBucket: "salao-cereja.appspot.com",
//   messagingSenderId: "995091383111",
//   appId: "1:995091383111:web:3e3fe4312ac67559"
// };

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    HttpClientModule,
    RouterModule,
    NgxMaskIonicModule.forRoot(),
    IonicSelectableModule
  ],  
  providers: [
    Geolocation,
    StatusBar,
    AuthGuard,//para guardar as rotas
    //LoginPage,//deixei o login como global para o guards
    AuthService,
    SplashScreen,
    AngularFireAuth,

    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
