import { TestBed } from '@angular/core/testing';

import { ChamaSenhaService } from './chama-senha.service';

describe('ChamaSenhaService', () => {
  let service: ChamaSenhaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChamaSenhaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
