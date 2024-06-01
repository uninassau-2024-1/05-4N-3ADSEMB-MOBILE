import { Component } from '@angular/core';
import { PokeAPIService } from '../services/poke-api.service';
import { PokemonDataService } from '../services/pokemon-data.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  areaBuscarPokemon: string = '';
  pokemon: any = {}; // Defina a variável pokemon aqui

  constructor(
    private pokeAPIService: PokeAPIService,
    private pokemonDataService: PokemonDataService
  ) { }

  buscarPokemon() {
    this.pokeAPIService.getPokeAPIService(this.gerarIdAleatorio())
      .subscribe((pokemonData) => {
        const pokemon = JSON.parse(JSON.stringify(pokemonData));
        this.pokemonDataService.adicionarPokemonCapturado(pokemon); // Salvando o pokemon no serviço de dados
        this.pokemon = pokemon; // Atualize a variável pokemon aqui
      });
  }

  gerarIdAleatorio(): number {
    return Math.floor(Math.random() * 100) + 1;
  }
}
