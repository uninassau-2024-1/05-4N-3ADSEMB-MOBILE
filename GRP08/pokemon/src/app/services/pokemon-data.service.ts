import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PokemonDataService {

  private pokemonsCapturados: any[] = [];

  constructor() { }

  // Método para adicionar um Pokémon à lista de pokémons capturados
  adicionarPokemonCapturado(pokemon: any): void {
    pokemon.victories = 0;
    pokemon.defeats = 0;
    pokemon.draws = 0;
    this.pokemonsCapturados.push(pokemon);
  }

  // Método para obter todos os pokémons capturados
  getPokemonsCapturados(): any[] {
    return this.pokemonsCapturados;
  }

  // Método para definir a lista de pokémons capturados
  setPokemonsCapturados(pokemons: any[]): void {
    this.pokemonsCapturados = pokemons;
  }

  // Método para limpar a lista de pokémons capturados
  limparPokemonsCapturados(): void {
    this.pokemonsCapturados = [];
  }

  // Método para incrementar vitórias de um Pokémon
  incrementarVitoria(pokemon: any): void {
    pokemon.victories = (pokemon.victories || 0) + 1;
  }

  // Método para incrementar derrotas de um Pokémon
  incrementarDerrota(pokemon: any): void {
    pokemon.defeats = (pokemon.defeats || 0) + 1;
  }

  // Método para incrementar empates de um Pokémon
  incrementarEmpate(pokemon: any): void {
    pokemon.draws = (pokemon.draws || 0) + 1;
  }
}
