import { Injectable } from '@angular/core';
import { CriarSenhaService } from './criar-senha.service';

@Injectable({
  providedIn: 'root'
})
export class RelatorioSimplesDiarioService {

  constructor(private criarSenhaService: CriarSenhaService) {}

  public coletarInformacoesDiarias(): any {
    // Data atual
    const hoje = new Date();

    // Contagem total de senhas emitidas
    const totalSenhasEmitidas = this.criarSenhaService.totalSenhasEmitidas;

    // Contagem total de senhas atendidas
    const totalSenhasAtendidas = this.criarSenhaService.totalSenhasAtendidas;

    // Contagem de senhas emitidas por prioridade
    const senhasEmitidasPorPrioridade = {
      SP: this.criarSenhaService.senhasEmitidasPorTipo['SP'] || 0,
      SG: this.criarSenhaService.senhasEmitidasPorTipo['SG'] || 0,
      SE: this.criarSenhaService.senhasEmitidasPorTipo['SE'] || 0
    };

    // Contagem de senhas atendidas por prioridade
    const senhasAtendidasPorPrioridade = {
      SP: this.criarSenhaService.senhasAtendidasPorTipo['SP'] || 0,
      SG: this.criarSenhaService.senhasAtendidasPorTipo['SG'] || 0,
      SE: this.criarSenhaService.senhasAtendidasPorTipo['SE'] || 0
    };

    // Retornar todas as informações coletadas
    return {
      totalSenhasEmitidas,
      totalSenhasAtendidas,
      senhasEmitidasPorPrioridade,
      senhasAtendidasPorPrioridade
    };
  }
}
