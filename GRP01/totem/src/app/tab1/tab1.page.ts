import { Component } from '@angular/core';
import { SenhasService } from '../services/senhas.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})



export class Tab1Page {
  public inputNovaSenha2: string = ' '
  constructor(public senhasService: SenhasService) {}
  
  
}

// Alunos(a) Contribuintes: João Gabriel Ferreira Mendes | Scrum Master
// Julia de Andrade Leal
// Luigi Vinicius Mendes de Albuquerque
// Regina Rayssa Cordoville
// Paulo Dion Soares