import { TestBed } from '@angular/core/testing';

import { Epreuve } from './epreuve';

describe('Epreuve', () => {
  let service: Epreuve;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Epreuve);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
