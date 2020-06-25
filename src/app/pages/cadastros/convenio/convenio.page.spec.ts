import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvenioPage } from './convenio.page';

describe('ConvenioPage', () => {
  let component: ConvenioPage;
  let fixture: ComponentFixture<ConvenioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConvenioPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConvenioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
