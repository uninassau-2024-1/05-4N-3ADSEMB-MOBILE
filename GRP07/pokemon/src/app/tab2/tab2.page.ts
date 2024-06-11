import { Component } from '@angular/core';
import { PokeAPIService } from '../services/poke-api.service';
import { SharedService } from "../services/shared.service";

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  pokemon: any = {
    id: '',
    name: '',
    img: '',
    abilities: '',
    height: '',
    weight: ''
  }

  battleResult: string = '';

  constructor(private pokeAPIService: PokeAPIService, private sharedService: SharedService) {}

  capturarNovoPokemon() {
    const randomId = Math.floor(Math.random() * 100) + 1; // Gera um ID aleatório entre 1 e 100
    this.pokeAPIService.getPokeAPIService(randomId)
      .subscribe((value) => {
        this.pokemon.id = JSON.parse(JSON.stringify(value))['id'];
        this.pokemon.name = JSON.parse(JSON.stringify(value))['name']
        this.pokemon.abilities = JSON.parse(JSON.stringify(value))['abilities']
        this.pokemon.height = JSON.parse(JSON.stringify(value))['height']
        this.pokemon.weight = JSON.parse(JSON.stringify(value))['weight']

        let idString = randomId.toString();

        if (idString.length === 1) {
          idString = '00' + idString; // Adiciona dois zeros à frente do ID
        } else if (idString.length === 2) {
          idString = '0' + idString; // Adiciona um zero à frente do ID
        }
        // Atualizar o ID do Pokemon com o novo valor
        this.pokemon.id = idString;
        this.pokemon.img = `https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/${this.pokemon.id}.png`;
        

        // Salvar o Pokémon no serviço compartilhado
        this.sharedService.setPokemon2(this.pokemon);

        // Comparar os Pokémon e obter o resultado da batalha
        this.battleResult = this.sharedService.comparePokemons();
      });
  }
}
