import { Component, OnInit } from '@angular/core';
import { PokeAPIService } from '../services/poke-api.service';
import { SharePokemonService } from '../services/share-pokemon.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  pokemon: any = {};
  constructor(private sharePokemonService: SharePokemonService) {}

    ngOnInit() {
      this.sharePokemonService.pokemonList$.subscribe(pokemons => {
        console.log(pokemons);
        this.pokemon = pokemons;
      });
    }
}
