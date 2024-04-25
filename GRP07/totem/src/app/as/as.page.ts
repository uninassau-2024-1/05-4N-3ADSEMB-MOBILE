import { Component, ViewChild, ElementRef } from '@angular/core';
import { RelatorioSimplesDiarioService } from '../services/relatorio-simples-diario.service';
import { CriarSenhaService } from '../services/criar-senha.service';

@Component({
  selector: 'app-as',
  templateUrl: './as.page.html',
  styleUrls: ['./as.page.scss'],
})
export class ASPage {

  constructor(private relatorioService: RelatorioSimplesDiarioService, private criarSenhaService: CriarSenhaService) {}

  gerarRelatorio1(): void {
    // Coletar informações do relatório
    const relatorio = this.relatorioService.coletarInformacoesDiarias();
  
    // Criar o conteúdo do relatório com quebras de linha entre cada label
    const relatorioContent = `
      <ion-label>Quantidade total de senhas emitidas: ${relatorio.totalSenhasEmitidas}</ion-label><br>
      <ion-label>Quantidade total de senhas atendidas: ${relatorio.totalSenhasAtendidas}</ion-label><br>
      <ion-label>Quantidade de senhas SP emitidas: ${relatorio.senhasEmitidasPorPrioridade.SP}</ion-label><br>
      <ion-label>Quantidade de senhas SG emitidas: ${relatorio.senhasEmitidasPorPrioridade.SG}</ion-label><br>
      <ion-label>Quantidade de senhas SE emitidas: ${relatorio.senhasEmitidasPorPrioridade.SE}</ion-label><br>
      <ion-label>Quantidade de senhas SP atendidas: ${relatorio.senhasAtendidasPorPrioridade.SP}</ion-label><br>
      <ion-label>Quantidade de senhas SG atendidas: ${relatorio.senhasAtendidasPorPrioridade.SG}</ion-label><br>
      <ion-label>Quantidade de senhas SE atendidas: ${relatorio.senhasAtendidasPorPrioridade.SE}</ion-label><br>
    `;
  
    // Verificar se o elemento existe antes de tentar acessá-lo
    const relatorioElement = document.getElementById('relatorio1-content');
    if (relatorioElement) {
      // Atualizar o conteúdo do card "Relatório 1"
      relatorioElement.innerHTML = relatorioContent;
    } else {
      console.error("Elemento 'relatorio1-content' não encontrado.");
    }

    
  }
  gerarRelatorioDetalhadoComDetalhes(): void {
    // Obter todas as senhas atendidas
    const senhasAtendidas = this.criarSenhaService.senhasAtendidas;

    // Criar o conteúdo do relatório com detalhes de cada senha atendida
    let relatorioContent = '';
    senhasAtendidas.forEach(senha => {
      relatorioContent += `
        <ion-label>Número da senha: ${senha.numero}</ion-label><br>
        <ion-label>Tipo da senha: ${senha.tipo}</ion-label><br>
        <ion-label>Hora da criação: ${senha.horario}</ion-label><br>
        <ion-label>Hora da chamada: ${senha.horarioChamada}</ion-label><br>
        <ion-label>Hora do atendimento: ${senha.horarioAtendimento}</ion-label><br>
        <ion-label>Guichê de atendimento: ${senha.guiche}</ion-label><br>
        <br>
      `;
    });

    // Verificar se o elemento existe antes de tentar acessá-lo
    const relatorioElement = document.getElementById('relatorio-detalhado-content');
    if (relatorioElement) {
      // Atualizar o conteúdo do elemento HTML com os detalhes das senhas atendidas
      relatorioElement.innerHTML = relatorioContent;
    } else {
      console.error("Elemento 'relatorio-detalhado-content' não encontrado.");
    }
  }
}