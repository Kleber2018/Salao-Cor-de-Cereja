import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PacotePage } from './pacote.page';

describe('PacotePage', () => {
  let component: PacotePage;
  let fixture: ComponentFixture<PacotePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PacotePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PacotePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
