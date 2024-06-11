import { Component } from '@angular/core';
import { PhotoService } from '../services/photo.service';
import { PokeAPIService } from '../services/poke-api.service';
import { SharePokemonService } from '../services/share-pokemon.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  pokemonData: any = null;
  pokemon1Data: any = null;
  resultado: string = '';

  constructor(
    public photoService: PhotoService,
    private pokeAPIService: PokeAPIService,
    private sharePokemonService: SharePokemonService
  ) {}

  addPhotoToGallery() {
    this.photoService.addNewToGallery();
  }

  ngOnInit() {
    this.sharePokemonService.pokemon1$.subscribe(pokemonData => {
      this.pokemon1Data = pokemonData;
      this.fetchRandomPokemon();
    });
  }

  fetchRandomPokemon() {
    const pokemonId = Math.floor(Math.random() * 100) + 1;
    this.pokeAPIService.getPokeAPIService(pokemonId).subscribe(pokemonData => {
      this.pokemonData = pokemonData;
      this.sharePokemonService.setPokemon2(pokemonData);
      this.comparePokemons();
    });
  }

  comparePokemons() {
    if (this.pokemon1Data && this.pokemonData) {
      const abilities1 = this.pokemon1Data.abilities.length;
      const abilities2 = this.pokemonData.abilities.length;

      if (abilities1 === abilities2) {
        this.resultado = 'Empate';
        this.sharePokemonService.incrementDraw(this.pokemon1Data.id);
      } else if (abilities1 > abilities2) {
        this.resultado = 'Ganhou';
        this.sharePokemonService.incrementVictory(this.pokemon1Data.id);
      } else {
        this.resultado = 'Perdeu';
        this.sharePokemonService.incrementDefeat(this.pokemon1Data.id);
      }
    }
  }

  get resultadoColor() {
    switch (this.resultado) {
      case 'Empate':
        return 'yellow';
      case 'Ganhou':
        return 'red';
      case 'Perdeu':
        return 'green';
      default:
        return '';
    }
  }

  get pokemonImageUrl() {
    if (this.pokemonData) {
      return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.pokemonData.id}.png`;
    }
    return ''; 
  }

}