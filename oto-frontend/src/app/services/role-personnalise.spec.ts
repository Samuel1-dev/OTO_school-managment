import { TestBed } from '@angular/core/testing';

import { RolePersonnalise } from './role-personnalise';

describe('RolePersonnalise', () => {
  let service: RolePersonnalise;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RolePersonnalise);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
