import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private pokemonTab1: any;
  private pokemonTab1Updated: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  private capturedPokemons: Array<any> = [];
  private capturedPokemonsUpdated: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  setPokemonTab1(pokemon: any) {
    this.pokemonTab1 = pokemon;
    this.pokemonTab1Updated.next(pokemon);
    this.updateCapturedPokemons(pokemon);
  }

  getPokemonTab1(): any {
    return this.pokemonTab1;
  }

  getPokemonTab1Updates(): Observable<any> {
    return this.pokemonTab1Updated.asObservable();
  }

  updateCapturedPokemons(pokemon: any) {
    let existingPokemon = this.capturedPokemons.find(p => p.name === pokemon.name);
    if (existingPokemon) {
      Object.assign(existingPokemon, pokemon);
    } else {
      this.capturedPokemons.push({
        ...pokemon,
        wins: 0,
        ties: 0,
        losses: 0
      });
    }
    this.capturedPokemonsUpdated.next([...this.capturedPokemons]);
  }

  updatePokemonStats(pokemonTab1Name: string, pokemonTab2Name: string, result: 'win' | 'tie' | 'loss') {
    let pokemonTab1 = this.capturedPokemons.find(p => p.name === pokemonTab1Name);
    let pokemonTab2 = this.capturedPokemons.find(p => p.name === pokemonTab2Name);

    if (result === 'win') {
      if (pokemonTab1) pokemonTab1.wins += 1;
      if (pokemonTab2) pokemonTab2.losses += 1;
    } else if (result === 'tie') {
      if (pokemonTab1) pokemonTab1.ties += 1;
      if (pokemonTab2) pokemonTab2.ties += 1;
    } else if (result === 'loss') {
      if (pokemonTab1) pokemonTab1.losses += 1;
      if (pokemonTab2) pokemonTab2.wins += 1;
    }

    this.capturedPokemonsUpdated.next([...this.capturedPokemons]);
  }

  getCapturedPokemonsUpdates(): Observable<any[]> {
    return this.capturedPokemonsUpdated.asObservable();
  }
}
