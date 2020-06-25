import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PacotesPage } from './pacotes.page';

describe('PacotesPage', () => {
  let component: PacotesPage;
  let fixture: ComponentFixture<PacotesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PacotesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PacotesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
