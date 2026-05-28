import { TestBed } from '@angular/core/testing';

import { EmploiTemps } from './emploi-temps';

describe('EmploiTemps', () => {
  let service: EmploiTemps;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmploiTemps);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
