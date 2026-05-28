import { TestBed } from '@angular/core/testing';

import { Ecole } from './ecole';

describe('Ecole', () => {
  let service: Ecole;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Ecole);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
