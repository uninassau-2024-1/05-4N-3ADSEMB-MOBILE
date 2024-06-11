import { Component } from '@angular/core';
import { PokeAPIService } from '../services/poke-api.service';
import { ViaCEPService } from '../services/via-cep.service';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  areaBuscarPokemon: string = '52011210';
  areaBusca: any = {
    bairro: '',
    localidade: '',
    logradouro: '',
    uf: ''
  };

  pokemon: any = {
    id: '',
    name: '',
    img: '',
    abilities: '',
    height: '',
    weight: ''
  }

  battleResult: string = '';

  constructor(private pokeAPIService: PokeAPIService, private viaCepService: ViaCEPService, private sharedService: SharedService) {
  }

  buscarPokemon() {
    this.viaCepService.getViaCEPService(this.areaBuscarPokemon)
      .subscribe((value) => {
        this.areaBusca.logradouro = JSON.parse(JSON.stringify(value))['logradouro'];
        this.areaBusca.bairro = ', ' + JSON.parse(JSON.stringify(value))['bairro'];
        this.areaBusca.localidade = ' - ' + JSON.parse(JSON.stringify(value))['localidade'];
        this.areaBusca.uf = ' - ' + JSON.parse(JSON.stringify(value))['uf'];
      });

    const randomId = Math.floor(Math.random() * 100) + 1;
    this.pokeAPIService.getPokeAPIService(randomId)
      .subscribe((value) => {
        this.pokemon.id = JSON.parse(JSON.stringify(value))['id'];
        this.pokemon.name = JSON.parse(JSON.stringify(value))['name']
        this.pokemon.abilities = JSON.parse(JSON.stringify(value))['abilities']
        this.pokemon.height = JSON.parse(JSON.stringify(value))['height']
        this.pokemon.weight = JSON.parse(JSON.stringify(value))['weight']

        let idString = randomId.toString();

        if (idString.length === 1) {
          idString = '00' + idString;
        } else if (idString.length === 2) {
          idString = '0' + idString;
        }
        this.pokemon.id = idString;
        this.pokemon.img = `https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/${this.pokemon.id}.png`;

        this.sharedService.setPokemon1(this.pokemon);

        // Comparar os Pokémon e obter o resultado da batalha
        this.sharedService.comparePokemons();
      });
  }
}
