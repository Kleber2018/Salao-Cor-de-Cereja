import { TestBed } from '@angular/core/testing';

import { PacotesService } from './pacotes.service';

describe('PacotesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PacotesService = TestBed.get(PacotesService);
    expect(service).toBeTruthy();
  });
});
