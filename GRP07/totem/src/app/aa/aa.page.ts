import { Component, OnInit, OnDestroy } from '@angular/core';
import { CriarSenhaService } from '../services/criar-senha.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-aa',
  templateUrl: './aa.page.html',
  styleUrls: ['./aa.page.scss'],
})
export class AAPage implements OnInit, OnDestroy {
  ultimosAtendimentos: any[] = [];
  private senhaSubscription: Subscription = new Subscription(); // Inicializa a variável

  constructor(public criarSenhaService: CriarSenhaService) { }

  ngOnInit() {
    // Inscrever-se para receber atualizações das últimas senhas atendidas
    this.senhaSubscription = this.criarSenhaService.SenhasAtendidasSubject.subscribe((ultimosAtendimentos: any[]) => {
      this.ultimosAtendimentos = ultimosAtendimentos.slice(-5); // Atualiza os últimos 5 atendimentos
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

  // Método para atender o chamado atual
  atenderChamadoAtual() {
    this.criarSenhaService.atenderChamadoAtual();
    
  }
  
}
