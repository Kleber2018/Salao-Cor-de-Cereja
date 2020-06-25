import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';

describe('AppComponent', () => {

  let statusBarSpy, splashScreenSpy, platformReadySpy, platformSpy;

  beforeEach(async(() => {
    statusBarSpy = jasmine.createSpyObj('StatusBar', ['styleDefault']);
    splashScreenSpy = jasmine.createSpyObj('SplashScreen', ['hide']);
    platformReadySpy = Promise.resolve();
    platformSpy = jasmine.createSpyObj('Platform', { ready: platformReadySpy });

    TestBed.configureTestingModule({
      declarations: [AppComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: StatusBar, useValue: statusBarSpy },
        { provide: SplashScreen, useValue: splashScreenSpy },
        { provide: Platform, useValue: platformSpy },
      ],
      imports: [ RouterTestingModule.withRoutes([])],
    }).compileComponents();
  }));

  it('should create the app', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should initialize the app', async () => {
    TestBed.createComponent(AppComponent);
    expect(platformSpy.ready).toHaveBeenCalled();
    await platformReadySpy;
    expect(statusBarSpy.styleDefault).toHaveBeenCalled();
    expect(splashScreenSpy.hide).toHaveBeenCalled();
  });

  //kleber - não entendi pra que usa esse it?
  // it('should have menu labels', async () => {
  //   const fixture = await TestBed.createComponent(AppComponent);
  //   await fixture.detectChanges();
  //   const app = fixture.nativeElement;
  //   const menuItems = app.querySelectorAll('ion-label');
  //   expect(menuItems.length).toEqual(4);
  //   expect(menuItems[0].textContent).toContain('Home');
  //   expect(menuItems[1].textContent).toContain('List');
  //   expect(menuItems[2].textContent).toContain('Crud Agenda');
  //   expect(menuItems[3].textContent).toContain('Crud Area');
  //   expect(menuItems[4].textContent).toContain('Crud Cliente');
  //   expect(menuItems[5].textContent).toContain('Crud Pagamento');
  //   expect(menuItems[6].textContent).toContain('Crud Profissional?');
  //   expect(menuItems[7].textContent).toContain('Crud Promoção');
  // });

  // //kleber - para os links do menu lateral
  // it('should have urls', async () => {
  //   const fixture = await TestBed.createComponent(AppComponent);
  //   await fixture.detectChanges();
  //   const app = fixture.nativeElement;
  //   const menuItems = app.querySelectorAll('ion-item');
  //   expect(menuItems.length).toEqual(8);
  //   expect(menuItems[0].getAttribute('ng-reflect-router-link')).toEqual('/home');
  //   expect(menuItems[1].getAttribute('ng-reflect-router-link')).toEqual('/list');
  //   expect(menuItems[2].getAttribute('ng-reflect-router-link')).toEqual('/cruds/crudagenda');
  //   expect(menuItems[3].getAttribute('ng-reflect-router-link')).toEqual('/cruds/crudarea');
  //   expect(menuItems[4].getAttribute('ng-reflect-router-link')).toEqual('/cruds/crudcliente');
  //   expect(menuItems[5].getAttribute('ng-reflect-router-link')).toEqual('/cruds/crudpagamento');
  //   expect(menuItems[6].getAttribute('ng-reflect-router-link')).toEqual('/cruds/crudprofissional');
  //   expect(menuItems[7].getAttribute('ng-reflect-router-link')).toEqual('/cruds/crudpromo');
  //   expect(menuItems[8].getAttribute('ng-reflect-router-link')).toEqual('/home');
  // });

});
