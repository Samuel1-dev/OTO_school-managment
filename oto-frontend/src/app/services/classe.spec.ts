import { TestBed } from '@angular/core/testing';

import { Classe } from './classe';

describe('Classe', () => {
  let service: Classe;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Classe);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
