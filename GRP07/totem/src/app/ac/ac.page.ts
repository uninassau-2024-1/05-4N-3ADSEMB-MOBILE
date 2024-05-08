import { Component, OnInit, OnDestroy } from '@angular/core';
import { CriarSenhaService } from '../services/criar-senha.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ac',
  templateUrl: './ac.page.html',
  styleUrls: ['./ac.page.scss'],
})
export class ACPage implements OnInit, OnDestroy {
  ultimasSenhasChamadas: any[] = [];
  private senhaSubscription: Subscription = new Subscription(); // Inicializa a variável

  constructor(public criarSenhaService: CriarSenhaService) { }

  ngOnInit() {
    // Inscrever-se para receber atualizações das últimas senhas chamadas
    this.senhaSubscription = this.criarSenhaService.SenhasChamadasSubject.subscribe((ultimasSenhas: any[]) => {
      this.ultimasSenhasChamadas = ultimasSenhas.slice(-5); // Atualiza as últimas 5 senhas chamadas
    });
  }

  ngOnDestroy() {
    // Cancelar a inscrição ao sair do componente para evitar vazamentos de memória
    this.senhaSubscription.unsubscribe();
  }

  // Método para chamar a próxima senha
  chamarProximaSenha() {
    this.criarSenhaService.chamarProximaSenha();
  }

  // Método para atualizar as últimas senhas chamadas ao receber o evento de atualização
  atualizarUltimasSenhasChamadas(ultimasSenhas: any[]) {
    this.ultimasSenhasChamadas = ultimasSenhas.slice(-5);
  }
}
