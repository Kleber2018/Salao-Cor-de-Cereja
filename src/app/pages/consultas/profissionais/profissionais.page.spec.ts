import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfissionaisPage } from './profissionais.page';

describe('ProfissionaisPage', () => {
  let component: ProfissionaisPage;
  let fixture: ComponentFixture<ProfissionaisPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfissionaisPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfissionaisPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
