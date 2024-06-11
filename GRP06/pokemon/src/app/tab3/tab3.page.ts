import { Component, OnInit } from '@angular/core';
import { PokeAPIService } from './../services/poke-api.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  pokemon: any = {
    name: '',
    abilities: [],
    height: 0,
    weight: 0,
    sprite: '',
    victories: 0,
    defeats: 0,
    draws: 0
  };

  constructor(private pokeAPIService: PokeAPIService) {}

  ngOnInit() {
    this.loadPokemon();
  }

  loadPokemon() {
    this.pokeAPIService.getPokeAPIService().subscribe((value: any) => {
      this.pokemon.name = value.name.toUpperCase();
      this.pokemon.abilities = value.abilities.length;
      this.pokemon.height = value.height;
      this.pokemon.weight = value.weight;
      this.pokemon.sprite = JSON.parse(JSON.stringify(value))['sprites']['front_default'];
      this.pokemon.victories = Math.floor(Math.random() * 10);
      this.pokemon.defeats = Math.floor(Math.random() * 10);
      this.pokemon.draws = Math.floor(Math.random() * 10);
    });
  }
}
