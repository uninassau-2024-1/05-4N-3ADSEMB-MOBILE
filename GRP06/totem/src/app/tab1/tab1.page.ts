import { Component } from '@angular/core';
import { AlertButton, AlertController } from '@ionic/angular';
import { SenhasService } from '../services/senhas.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  inputNovaSenha: string = '';

  constructor(
    private alertController: AlertController,
    public senhasService: SenhasService
  ) {}

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Aluno',
      message: 'Diego Silva - 000333',
      buttons: ['OK']
    })

    await alert.present();
  }

  incrementarGeral() {
    this.senhasService.somaGeral();
  }

  incrementarPrior() {
    this.senhasService.somaPrior();
  }

  incrementarExame() {
    this.senhasService.somaExame();
  }
}
