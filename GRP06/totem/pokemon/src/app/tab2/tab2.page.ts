import { Component, OnInit } from '@angular/core';
import { PokeAPIService } from './../services/poke-api.service';
import { PhotoService } from './../services/photo.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  pokemon: any = {
    name: '',
    abilities: 0,
    height: 0,
    weight: 0,
    sprite: ''
  };

  pokemonTab1: any = {};

  constructor(
    private pokeAPIService: PokeAPIService,
    public photoService: PhotoService
  ) {}

  ngOnInit() {
    const pokemonTab1String = localStorage.getItem('pokemonTab1');
    if (pokemonTab1String) {
      this.pokemonTab1 = JSON.parse(pokemonTab1String);
    }
    this.loadRandomPokemon();
  }

  loadRandomPokemon() {
    this.pokeAPIService.getPokeAPIService().subscribe((pokemon: any) => {
      this.pokemon.name = pokemon.name.toUpperCase();
      this.pokemon.abilities = pokemon.abilities.length;
      this.pokemon.height = pokemon.height;
      this.pokemon.weight = pokemon.weight;
      this.pokemon.sprite = pokemon.sprites.other['dream_world'].front_default;

      this.compareAbilities();
    });
  }

  compareAbilities() {
    if (this.pokemon.abilities === this.pokemonTab1.abilities) {
      this.pokemon.name += ' (Empate)';
    } else if (this.pokemon.abilities > this.pokemonTab1.abilities) {
      this.pokemon.name += ' (Ganhou)';
    } else {
      this.pokemon.name += ' (Perdeu)';
    }
  }

  addPhotoToGallery() {
    this.photoService.addNewToGallery();
  }
}
