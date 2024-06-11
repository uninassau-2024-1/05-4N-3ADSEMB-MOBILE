import { Component } from '@angular/core';
import { PokeAPIService } from '../services/poke-api.service';
import { ViacepService } from '../services/viacep.service';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  areaBuscarPokemon: string = '52081123';
  areaBusca: any = {
    bairro: '',
    localidade: '0',
    logradouro: '',
    uf: ''
  };
  pokemon: any = null;

  constructor(
    private pokeAPIService: PokeAPIService,
    private viaCEPservice: ViacepService,
    private sharedService: SharedService
  ) {}


  buscarPokemon() {
    this.viaCEPservice.getViacepService(this.areaBuscarPokemon)
      .subscribe((value) => {
        this.areaBusca.logradouro = JSON.parse(JSON.stringify(value))['logradouro'];
        this.areaBusca.bairro = ', ' + JSON.parse(JSON.stringify(value))["bairro"];
        this.areaBusca.localidade = ' - ' + JSON.parse(JSON.stringify(value))["localidade"];
        this.areaBusca.uf = '-' + JSON.parse(JSON.stringify(value))["uf"];
      });
      this.pokeAPIService.getRandomPokemon().subscribe((pokemon) => {
        this.pokemon = pokemon;
        this.sharedService.setPokemonTab1(pokemon);
        
      });
    };
}

