import { Component } from '@angular/core';
import { SenhasService } from '../services/senhas.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  
  inputNovaSenha2: string = '';


  
  constructor(public senhasService: SenhasService) {}

  get tempoRestante(): number {
    return this.senhasService.tempoRestante;
  }
  
  formatarTempoRestante(tempoRestante: number): string {
    const minutos = Math.floor(tempoRestante / 60);
    const segundos = tempoRestante % 60;
    return `${minutos}:${segundos < 10 ? '0' : ''}${segundos}`;
  }

  limparGuiche() {
    this.senhasService.limparGuiche();
  }
  
}


// Alunos(a) Contribuintes: João Gabriel Ferreira Mendes | Scrum Master
// Julia de Andrade Leal
// Luigi Vinicius Mendes de Albuquerque
// Regina Rayssa Cordoville
// Paulo Dion Soares