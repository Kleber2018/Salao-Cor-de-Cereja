import { TestBed } from '@angular/core/testing';

import { ConsCepService } from './cons-cep.service';

describe('ConsCepService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConsCepService = TestBed.get(ConsCepService);
    expect(service).toBeTruthy();
  });
});
