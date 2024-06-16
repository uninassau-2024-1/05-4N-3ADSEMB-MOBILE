import { Injectable } from '@angular/core';


// Alunos(a) Contribuintes: João Gabriel Ferreira Mendes | Scrum Master
// Julia de Andrade Leal
// Luigi Vinicius Mendes de Albuquerque
// Regina Rayssa Cordoville
// Paulo Dion Soares



@Injectable({
  providedIn: 'root'
})
export class SenhasService {

  public senhasGeral: number = 0;
  public senhasPrior: number = 0;
  public senhasExame: number = 0;
  public senhasTotal: number = 0;
  public inputNovaSenha2: string = '';
  public senhasArray: { [key: string]: string[] } = { 'SG': [], 'SP': [], 'SE': [] }; 
  public tempoRestante: number = 0;
  public senhasDiarias: { data: string, total: number, prioritarias: number }[] = [];
  public senhasMensais: { data: string, total: number, prioritarias: number }[] = [];

  somaGeral() { this.senhasGeral++; this.senhasTotal++; }
  somaPrior() { this.senhasPrior++; this.senhasTotal++; }
  somaExame() { this.senhasExame++; this.senhasTotal++; }

  novaSenha(tipoSenha: string = '') {
    let novaSenha: string;
    if (tipoSenha === 'SG' || tipoSenha === 'SP' || tipoSenha === 'SE') {
      if (tipoSenha == 'SG') {
        this.somaGeral();
      } else if (tipoSenha == 'SP') {
        this.somaPrior();
      } else if (tipoSenha == 'SE') {
        this.somaExame();
      }
      novaSenha =
        new Date().getFullYear().toString().substring(2, 4) +
        '/' +
        new Date().getMonth().toString().padStart(2, '0') +
        '/' +
        new Date().getDate().toString().padStart(2, '0') +
        '-' +
        tipoSenha +
        (this.senhasArray[tipoSenha].length + 1).toString().padStart(2, '0');
      this.senhasArray[tipoSenha].push(novaSenha);
    } else {
      return;
    }

    const dataAtual = new Date().toLocaleDateString();
    const hoje = this.senhasDiarias.find(item => item.data === dataAtual);
    if (hoje) {
      hoje.total++;
      if (tipoSenha === 'SP') {
        hoje.prioritarias++;
      }
    } else {
      this.senhasDiarias.push({ data: dataAtual, total: 1, prioritarias: tipoSenha === 'SP' ? 1 : 0 });
    }
    
    if (!this.inputNovaSenha2) {
      this.atenderSenha();
    }
  }
  
  atenderSenha() {

    if (!this.senhasArray['SP'].length && !this.senhasArray['SE'].length && !this.senhasArray['SG'].length) {
      return;
    }


    let senha: string | undefined;
    let tipoSenha: string | null = null;
  
    if (this.senhasArray['SP'].length > 0) {
      tipoSenha = 'SP';
    } else if (this.senhasArray['SE'].length > 0) {
      tipoSenha = 'SE';
    } else if (this.senhasArray['SG'].length > 0) {
      tipoSenha = 'SG';
    }
  
    if (tipoSenha) {
      senha = this.senhasArray[tipoSenha].shift();
    }
 
    if (senha !== undefined) {
      this.inputNovaSenha2 = senha;
   

    const tempoLimite = tipoSenha === 'SP' ? 15 : 5; 
    this.tempoRestante = tempoLimite * 60;

    this.contadorRegressivo();
  }
}

  contadorRegressivo() {
    setInterval(() => {
      if (this.tempoRestante > 0) {
        this.tempoRestante--;
      }
    }, 1000); 
  }

  limparGuiche() {
    this.inputNovaSenha2 = '';
    this.tempoRestante = 0;
    if (this.senhasArray['SP'].length || this.senhasArray['SE'].length || this.senhasArray['SG'].length) {
      this.atenderSenha();

      const dataAtual = new Date().toLocaleDateString();
      const hoje = this.senhasDiarias.find(item => item.data === dataAtual);
      if (hoje) {
        hoje.total--;
        if (this.inputNovaSenha2.startsWith('SP')) {
          hoje.prioritarias--;
        }
      }
      
    }
  }

  fichaAtendida(senha: string): boolean {
    return this.inputNovaSenha2 === senha;
  }
  
  constructor() { }
}
