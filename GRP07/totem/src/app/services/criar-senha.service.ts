import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CriarSenhaService {
  vetorSenhas: any[] = [];
  senhasChamadas: any[] = [];
  ultimasSenhasChamadas: any[] = [];
  senhasAtendidas: any[] = [];
  SenhasChamadasSubject: Subject<any[]> = new Subject<any[]>();
  vetorSenhasSubject: Subject<any[]> = new Subject<any[]>();
  SenhasAtendidasSubject: Subject<any[]> = new Subject<any[]>(); 

  contadorSenhas = 0;
  totalSenhasEmitidas: number = 0;
  totalSenhasAtendidas: number = 0;
  senhasEmitidasPorTipo: { [tipo: string]: number } = {};
  senhasAtendidasPorTipo: { [tipo: string]: number } = {};

  private emitirEventoAtualizacao() {
    this.vetorSenhasSubject.next(this.vetorSenhas);
    console.log("Array vetorSenhas atualizado:", this.vetorSenhas);
  }

  private formatarNumero(numero: number): string {
    return numero < 10 ? '0' + numero : numero.toString();
  }

  constructor() { }

  private gerarNumeroSenha(): string {
    const dataAtual = new Date();
    const ano = dataAtual.getFullYear().toString().slice(-2);
    const mes = this.formatarNumero(dataAtual.getMonth() + 1);
    const dia = this.formatarNumero(dataAtual.getDate());
    const numero = this.formatarNumero(this.contadorSenhas);
    return `${ano}${mes}${dia}-${numero}`;
  }

  chamarProximaSenha() {
    console.log("Botão 'Chamar Próxima Senha' acionado.");
  
    const prioridades = ['SP', 'SE', 'SG'];
  
    // Iterar pelas prioridades
    for (const tipo of prioridades) {
      // Encontrar a próxima senha na fila de prioridade atual
      const proximaSenhaIndex = this.vetorSenhas.findIndex(senha => senha.tipo === tipo);
      if (proximaSenhaIndex !== -1) {
        // Verificar se a senha já foi chamada anteriormente
        const senhaJaChamada = this.senhasChamadas.some(senha => senha.numero === this.vetorSenhas[proximaSenhaIndex].numero);
        if (!senhaJaChamada) {
          // Se a senha ainda não foi chamada, movê-la do vetor de senhas para o vetor de senhas chamadas
          const proximaSenha = { ...this.vetorSenhas[proximaSenhaIndex], horarioChamada: new Date() };
          console.log(`Chamando próxima senha: ${proximaSenha.numero}`);
  
          // Criar uma cópia do array de senhas chamadas
          const novasSenhasChamadas = [...this.senhasChamadas];
          // Adicionar a senha chamada ao vetor de senhas chamadas
          novasSenhasChamadas.push({ ...proximaSenha });
          // Atualizar o vetor de senhas chamadas com a cópia modificada
          this.senhasChamadas = novasSenhasChamadas;
  
          // Criar uma cópia do array de senhas
          const novasSenhas = [...this.vetorSenhas];
          // Remover a senha chamada do vetor de senhas
          novasSenhas.splice(proximaSenhaIndex, 1);
          // Atualizar o vetor de senhas com a cópia modificada
          this.vetorSenhas = novasSenhas;
  
          console.log("Senha chamada com sucesso.");
          this.emitirEventoAtualizacao();
          return;
        }
      }
    }
  
    console.log("Não há mais senhas na fila.");
  }
  
    
  
  
  atenderChamadoAtual() {
    console.log("Botão 'Atender Chamado Atual' acionado.");
    
    if (this.senhasChamadas.length > 0) {
      const senhaAtual = this.senhasChamadas[0];
      console.log("Atendendo chamado atual:", senhaAtual);
      
      // Definir o horário de atendimento
      const horarioAtendimento = new Date();
      
      // Criar uma cópia do array de senhas atendidas
      const novasSenhasAtendidas = [...this.senhasAtendidas];
      // Adicionar a senha atual ao vetor de senhas atendidas com o horário de atendimento definido
      novasSenhasAtendidas.push({
        ...senhaAtual,
        guiche: 1,
        horarioAtendimento: horarioAtendimento // Definir o horário de atendimento
      });
      
      // Atualizar o vetor de senhas atendidas com a cópia modificada
      this.senhasAtendidas = novasSenhasAtendidas;
      
      // Incrementar o contador de senhas atendidas por tipo
      this.totalSenhasAtendidas++;
      this.senhasAtendidasPorTipo[senhaAtual.tipo] = (this.senhasAtendidasPorTipo[senhaAtual.tipo] || 0) + 1;
      
      this.senhasChamadas.shift();
      console.log("Senha atual atendida com sucesso.");
      console.log("Tamanho do array senhasAtendidas: " + this.senhasAtendidas.length);
  
      this.SenhasAtendidasSubject.next(this.senhasAtendidas.slice()); // Emitir uma cópia do array
    } else {
      console.log("Não há chamados atuais para serem atendidos.");
    }
  }
  
  

  
  adicionarSenhaSP() {
    if (this.vetorSenhas.length < 100) {
      this.contadorSenhas++;
      const numeroSenha = this.gerarNumeroSenha();
      const horarioCriacao = new Date();
      this.vetorSenhas.push({
        tipo: 'SP',
        numero: numeroSenha,
        tm: 5,
        horario: horarioCriacao
      });
  
      // Incrementar o total de senhas emitidas
      this.totalSenhasEmitidas++;
      // Incrementar o total de senhas emitidas do tipo SP
      this.senhasEmitidasPorTipo['SP'] = (this.senhasEmitidasPorTipo['SP'] || 0) + 1;
  
      this.emitirEventoAtualizacao();
      console.log("Senha SP adicionada");
      console.log("Adicionada a senha de número:" + numeroSenha);
      console.log("Tamanho atual do array: " + this.vetorSenhas.length);
      console.log("Senha:", JSON.stringify(this.vetorSenhas[this.contadorSenhas]));
    } else {
      console.log("Limite máximo de senhas atingido");
    }
  }
  
  adicionarSenhaSG() {
    if (this.vetorSenhas.length < 100) {
      this.contadorSenhas++;
      const numeroSenha = this.gerarNumeroSenha();
      const horarioCriacao = new Date();
      this.vetorSenhas.push({
        tipo: 'SG',
        numero: numeroSenha,
        tm: 15,
        horario: horarioCriacao
      });
  
      // Incrementar o total de senhas emitidas
      this.totalSenhasEmitidas++;
      // Incrementar o total de senhas emitidas do tipo SG
      this.senhasEmitidasPorTipo['SG'] = (this.senhasEmitidasPorTipo['SG'] || 0) + 1;
  
      this.emitirEventoAtualizacao();
      console.log("Senha SG adicionada");
      console.log("Adicionada a senha de número:" + numeroSenha);
      console.log("Tamanho atual do array: " + this.vetorSenhas.length);
      console.log("Senha:", JSON.stringify(this.vetorSenhas[this.contadorSenhas]));
    } else {
      console.log("Limite máximo de senhas atingido");
    }
  }
  
  adicionarSenhaSE() {
    if (this.vetorSenhas.length < 100) {
      this.contadorSenhas++;
      const numeroSenha = this.gerarNumeroSenha();
      const horarioCriacao = new Date();
      this.vetorSenhas.push({
        tipo: 'SE',
        numero: numeroSenha,
        tm: 1,
        horario: horarioCriacao
      });
  
      // Incrementar o total de senhas emitidas
      this.totalSenhasEmitidas++;
      // Incrementar o total de senhas emitidas do tipo SE
      this.senhasEmitidasPorTipo['SE'] = (this.senhasEmitidasPorTipo['SE'] || 0) + 1;
  
      this.emitirEventoAtualizacao();
      console.log("Senha SE adicionada");
      console.log("Adicionada a senha de número:" + numeroSenha);
      console.log("Tamanho atual do array: " + this.vetorSenhas.length);
      console.log("Senha:", JSON.stringify(this.vetorSenhas[this.contadorSenhas]));
    } else {
      console.log("Limite máximo de senhas atingido");
    }
  }
}