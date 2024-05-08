import { TestBed } from '@angular/core/testing';

import { CriarSenhaService } from './criar-senha.service';

describe('CriarSenhaService', () => {
  let service: CriarSenhaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CriarSenhaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
