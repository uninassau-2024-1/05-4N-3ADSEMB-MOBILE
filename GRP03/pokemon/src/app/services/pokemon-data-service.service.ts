import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PokemonDataService {
  private capturedPokemons: any[] = [];
  currentPokemon: any;
  private selectedPokemon: any = null;

  constructor() {
    this.loadCapturedPokemons();
  }

  getCapturedPokemons() {
    return this.capturedPokemons;
  }

  changePokemon(pokemon: any) {
    this.currentPokemon = pokemon;
  }

  capturePokemon(pokemon: any) {
    this.capturedPokemons.push({
      ...pokemon,
      victories: 0,
      defeats: 0,
      draws: 0
    });
    this.saveCapturedPokemons();
  }

  updatePokemonStatus(pokemonName: string, result: string) {
    const pokemon = this.capturedPokemons.find(p => p.name === pokemonName);
    if (pokemon) {
      if (result === 'Vitória') {
        pokemon.victories += 1;
      } else if (result === 'Derrota') {
        pokemon.defeats += 1;
      } else if (result === 'Empate') {
        pokemon.draws += 1;
      }
    }
    this.saveCapturedPokemons();
  }

  selectPokemonForBattle(pokemon: any) {
    this.selectedPokemon = pokemon;
  }

  getSelectedPokemonForBattle() {
    return this.selectedPokemon;
  }


  private saveCapturedPokemons() {
    localStorage.setItem('capturedPokemons', JSON.stringify(this.capturedPokemons));
  }

  private loadCapturedPokemons() {
    const storedPokemons = localStorage.getItem('capturedPokemons');
    if (storedPokemons) {
      this.capturedPokemons = JSON.parse(storedPokemons);
    }
  }

 
  removeCapturedPokemon(pokemon: any) {
    this.capturedPokemons = this.capturedPokemons.filter(p => p.name !== pokemon.name);
    this.saveCapturedPokemons();
  }
}
