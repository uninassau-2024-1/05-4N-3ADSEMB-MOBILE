import { Component, OnInit, OnDestroy } from '@angular/core';
import { PokeAPIService } from '../services/poke-api.service';
import { SharedService } from '../services/shared.service';
import { Subscription } from 'rxjs';
import { PhotoService } from '../services/photo.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page implements OnInit, OnDestroy {
  pokemonTab2: any = null;
  pokemonTab1: any = null;
  comparisonResult: string = '';
  comparisonColor: string = '';
  subscription: Subscription | null = null;
  pokemonTab1Subscription: Subscription | null = null;

  constructor(
    
    private pokeAPIService: PokeAPIService,
    private sharedService: SharedService,
    public photoService: PhotoService) {}

    ngOnInit() {
      this.pokemonTab1Subscription = this.sharedService.getPokemonTab1Updates().subscribe(pokemon => {
        this.pokemonTab1 = pokemon;
        this.fetchAndComparePokemon();
      });
    }
  
    ionViewWillEnter() {
      this.fetchAndComparePokemon();
    }
  
    ngOnDestroy() {
      this.subscription?.unsubscribe();
      this.pokemonTab1Subscription?.unsubscribe();
    }
  
    fetchAndComparePokemon() {
      if (this.pokemonTab1) {
        this.pokeAPIService.getRandomPokemon().subscribe((pokemon) => {
          this.pokemonTab2 = pokemon;
          this.comparePokemons();
        });
      }
    }
  
    comparePokemons() {
      if (!this.pokemonTab1 || !this.pokemonTab2) {
        return;
      }
  
      const abilitiesTab1 = this.pokemonTab1.abilities.length;
      const abilitiesTab2 = this.pokemonTab2.abilities.length;
  
      if (abilitiesTab1 === abilitiesTab2) {
        this.comparisonResult = 'Empate';
        this.comparisonColor = 'yellow';
        this.sharedService.updatePokemonStats(this.pokemonTab1.name, this.pokemonTab2.name, 'tie');
      } else if (abilitiesTab2 > abilitiesTab1) {
        this.comparisonResult = 'Ganhou';
        this.comparisonColor = 'red';
        this.sharedService.updatePokemonStats(this.pokemonTab1.name, this.pokemonTab2.name, 'loss');
      } else {
        this.comparisonResult = 'Perdeu';
        this.comparisonColor = 'green';
        this.sharedService.updatePokemonStats(this.pokemonTab1.name, this.pokemonTab2.name, 'win');
      }
    }
  
  addPhotoToGallery(){
    this.photoService.addNewToGallery();
  }
}
