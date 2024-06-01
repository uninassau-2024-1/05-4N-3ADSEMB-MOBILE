import { Component, OnInit } from '@angular/core';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  pokemons: any[] = [];

  constructor(private sharedService: SharedService) {}

  ngOnInit() {
    this.preparePokemonData();
  }

  preparePokemonData() {
    const battleResults = this.sharedService.getBattleResults();
    const pokemonStatsMap = new Map();

    // Iterar sobre os resultados das batalhas para calcular as estatísticas de cada Pokémon
    battleResults.forEach(battle => {
      this.updatePokemonStats(pokemonStatsMap, battle.contender1, battle.contender1Wins, battle.tie);
      this.updatePokemonStats(pokemonStatsMap, battle.contender2, !battle.contender1Wins, battle.tie);
    });

    // Converter o mapa de estatísticas em um array de Pokémon para exibição na Pokédex
    this.pokemons = Array.from(pokemonStatsMap.values());
  }

  updatePokemonStats(pokemonStatsMap: Map<any, any>, pokemon: any, won: boolean, tie: boolean) {
    if (!pokemonStatsMap.has(pokemon.name)) {
      pokemonStatsMap.set(pokemon.name, { ...pokemon, stats: { wins: 0, loses: 0, ties: 0 } });
    }

    const stats = pokemonStatsMap.get(pokemon.name).stats;

    if (won) {
      stats.wins++;
    } else if (!tie) {
      stats.loses++;
    } else {
      stats.ties++;
    }
  }
}
