import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConveniosPage } from './convenios.page';

describe('ConveniosPage', () => {
  let component: ConveniosPage;
  let fixture: ComponentFixture<ConveniosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConveniosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConveniosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
