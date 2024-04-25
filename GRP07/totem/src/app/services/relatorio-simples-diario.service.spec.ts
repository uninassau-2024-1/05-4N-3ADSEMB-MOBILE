import { TestBed } from '@angular/core/testing';

import { RelatorioSimplesDiarioService } from './relatorio-simples-diario.service';

describe('RelatorioSimplesDiarioService', () => {
  let service: RelatorioSimplesDiarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RelatorioSimplesDiarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
