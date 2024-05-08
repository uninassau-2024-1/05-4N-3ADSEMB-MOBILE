import { TestBed } from '@angular/core/testing';

import { RelatorioDiarioService } from './relatorio-diario.service';

describe('RelatorioDiarioService', () => {
  let service: RelatorioDiarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RelatorioDiarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
