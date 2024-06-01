// tab1.page.ts
import { Component } from '@angular/core';
import { PokeAPIService } from './../services/poke-api.service';
import { ViaCEPService } from './../services/via-cep.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
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
    name: '',
    abilities: 0,
    height: 0,
    weight: 0,
    sprite: ''
  };

  constructor(
    private pokeAPIService: PokeAPIService,
    private viaCEPService: ViaCEPService
  ) {}

  buscarPokemon() {
    this.viaCEPService.getViaCEPService(this.areaBuscarPokemon)
      .subscribe((value: any) => {
        this.areaBusca.logradouro = value.logradouro;
        this.areaBusca.bairro = value.bairro;
        this.areaBusca.localidade = value.localidade;
        this.areaBusca.uf = value.uf;
      });

    this.pokeAPIService.getPokeAPIService()
      .subscribe((pokemon: any) => {
        this.pokemon.name = pokemon.name;
        this.pokemon.abilities = pokemon.abilities.length;
        this.pokemon.height = pokemon.height;
        this.pokemon.weight = pokemon.weight;
        this.pokemon.sprite = pokemon.sprites.other['dream_world'].front_default;

        localStorage.setItem('pokemonTab1', JSON.stringify(this.pokemon));
      });
  }
}
