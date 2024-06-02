import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../services/photo.service';
import { PokeAPIService } from '../services/http-poke-api.service';
import { PokemonDataService } from '../services/pokemon-data-service.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  pokemon: any;
  resultadoBatalha: string = '';
  resultadoCor: string = '';
  pokemonTab1: any;

  constructor(
    public photoService: PhotoService,
    private pokeAPIService: PokeAPIService,
    private pokemonDataService: PokemonDataService
  ) {}


  ngOnInit() {
    this.pokemon = this.pokemonDataService.currentPokemon;
    if (!this.pokemon) {
      this.buscarPokemonAleatorio();
    } else {
      this.sistemaDeBatalha();
    }

    this.pokemonTab1 = this.pokemonDataService.getSelectedPokemonForBattle();
  }

  adicionarFotoNaGaleria() {
    this.photoService.adicionarNovaFoto();
  }

  buscarPokemonAleatorio() {
    this.pokeAPIService.getRandomPokemon().subscribe((data) => {
      this.pokemon = data;
      this.sistemaDeBatalha();
    });
  }

  sistemaDeBatalha() {
    this.pokemonTab1 = this.pokemonDataService.getSelectedPokemonForBattle(); // Atualiza o Pokémon Tab1 antes da batalha

    if (!this.pokemonTab1) {
      this.resultadoBatalha = 'Nenhum Pokémon para comparar.';
      this.resultadoCor = 'gray';
      return;
    }

    const habilidadesTab1 = this.pokemonTab1.abilities.length || 0;
    const habilidadesTab2 = this.pokemon.abilities.length;

    if (habilidadesTab2 === habilidadesTab1) {
      this.resultadoBatalha = 'Deu Empate';
      this.pokemonDataService.updatePokemonStatus(this.pokemonTab1.name, 'Empate'); // Atualiza o status do Pokémon na service
      this.resultadoCor = 'warning';
    } else if (habilidadesTab2 < habilidadesTab1) {
      this.resultadoBatalha = ' Você Ganhou';
      this.pokemonDataService.updatePokemonStatus(this.pokemonTab1.name, 'Vitória'); // Atualiza o status do Pokémon na service
      this.resultadoCor = 'success';
    } else {
      this.resultadoBatalha = 'Você Perdeu';
      this.pokemonDataService.updatePokemonStatus(this.pokemonTab1.name, 'Derrota'); // Atualiza o status do Pokémon na service
      this.resultadoCor = 'danger';
    }
  }

  updateSelectedPokemonStatus(result: string) {
    if (this.pokemonTab1) {
      this.pokemonDataService.updatePokemonStatus(this.pokemonTab1.name, result);
    }
  }
}
