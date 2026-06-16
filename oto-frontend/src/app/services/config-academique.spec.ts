import { TestBed } from '@angular/core/testing';

import { ConfigAcademique } from './config-academique';

describe('ConfigAcademique', () => {
  let service: ConfigAcademique;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfigAcademique);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
