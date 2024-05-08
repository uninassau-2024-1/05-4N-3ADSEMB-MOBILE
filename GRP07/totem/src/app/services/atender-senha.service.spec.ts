import { TestBed } from '@angular/core/testing';

import { AtenderSenhaService } from './atender-senha.service';

describe('AtenderSenhaService', () => {
  let service: AtenderSenhaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AtenderSenhaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
