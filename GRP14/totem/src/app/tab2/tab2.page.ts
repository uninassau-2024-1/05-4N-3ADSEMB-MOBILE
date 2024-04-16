import { Component } from '@angular/core';
import { SenhasService } from '../services/senhas.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  constructor(public senhasService: SenhasService) {}

  public senhasAtendidas = 0;
  atenderSenha() {
    if (this.senhasService.senhasArray.SP.length > 0) {
      const seSenhaSP = this.senhasService.senhasArray.SP.shift();
      this.senhasAtendidas++;
    } else {
      if (this.senhasService.senhasArray.SE.length > 0) {
        const seSenhaSE = this.senhasService.senhasArray.SE.shift();
        this.senhasAtendidas++;
      } else {
        if (this.senhasService.senhasArray.SG.length > 0) {
          const seSenhaSG = this.senhasService.senhasArray.SG.shift();
          this.senhasAtendidas++;
        }
      }
    }
  }
}
