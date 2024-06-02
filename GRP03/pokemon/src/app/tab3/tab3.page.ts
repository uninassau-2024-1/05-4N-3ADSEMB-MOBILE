import { Component, OnInit } from '@angular/core';
import { PokemonDataService } from '../services/pokemon-data-service.service';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  capturedPokemons: any[] = [];
  selectedPokemonMessage: string = '';
  showMessage: boolean = false;

  searchTerm: string = '';
  filteredPokemons: any[] = [];

  constructor(private pokemonDataService: PokemonDataService) {}

  ngOnInit() {
    this.loadCapturedPokemons();
   
  }

  loadCapturedPokemons() {
    this.capturedPokemons = this.pokemonDataService.getCapturedPokemons();
    this.filteredPokemons = [...this.capturedPokemons];
  }

  getBadgeColor(value: number): string {


    if (value > 0) {
      return 'success'; 
    } else if (value > 0) {
      return 'danger'; 
    } else {
      return 'warning'; 
    }
  }

  filterPokemons(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    if (searchTerm && searchTerm.trim() !== '') {
      this.filteredPokemons = this.capturedPokemons.filter(pokemon =>
        pokemon.name.toLowerCase().includes(searchTerm)
      );
    } else {
      this.filteredPokemons = [];
    }
  }

  selectPokemon(pokemon: any) {
    this.pokemonDataService.selectPokemonForBattle(pokemon);
    this.selectedPokemonMessage = `Você selecionou ${pokemon.name} para a batalha!`;
    this.showMessage = true;

    setTimeout(() => {
      this.showMessage = false;
    }, 3000); 
  }

  removePokemon(pokemon: any) {
    console.log(`Removendo o Pokémon: ${pokemon.name}`);
    this.pokemonDataService.removeCapturedPokemon(pokemon);
    this.loadCapturedPokemons();
  }
  
}
