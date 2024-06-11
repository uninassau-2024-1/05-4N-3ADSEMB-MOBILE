import { Component } from '@angular/core';
import { PokeApiService } from '../services/poke-api.service';
import { ViaCepService } from '../services/via-cep.service';
import { PokedexService } from '../services/pokedex.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  cepShow =""
  buscarCep:number = 0
  pokemonAtual = {
    img: '',
    nome: '',
    nHabilidades: 0,
    peso: 0,
    altura: 0,
    cep:''
  }

  cepAtual = {
    cep: '',
    logradouro:'',
    bairro:'',
    localidade:'',
    uf:''
  }


  constructor(private pokeApi:PokeApiService, private viaCep:ViaCepService, private pokeDex:PokedexService) {}

  getCepViaApi(cep:number = this.buscarCep){
    if (cep.toString().length != 8){
      this.cepShow = 'CEP INVÁLIDO'
    }else{
      this.viaCep.getCep(cep).subscribe(value =>{
        this.cepAtual.logradouro = JSON.parse(JSON.stringify(value)).logradouro;
        this.cepAtual.bairro = JSON.parse(JSON.stringify(value)).bairro;
        this.cepAtual.localidade = JSON.parse(JSON.stringify(value)).localidade;
        this.cepAtual.uf = JSON.parse(JSON.stringify(value)).uf;
        this.cepAtual.cep = JSON.parse(JSON.stringify(value)).cep;

        if (this.cepAtual.cep === undefined){
          this.cepShow = 'CEP NÃO ENCONTRADO'
        }else{
          this.cepShow = this.cepAtual.logradouro+ ' ,'+ this.cepAtual.bairro+', '+this.cepAtual.localidade+' - '+this.cepAtual.uf
          this.pokeApi.getPokemon().subscribe(value=>{
            this.pokemonAtual.img =   JSON.parse(JSON.stringify(value)).sprites.front_default
            this.pokemonAtual.nome = JSON.parse(JSON.stringify(value)).name
            this.pokemonAtual.nHabilidades = JSON.parse(JSON.stringify(value)).abilities.length
            this.pokemonAtual.altura = JSON.parse(JSON.stringify(value)).weight
            this.pokemonAtual.peso = JSON.parse(JSON.stringify(value)).height
            this.pokemonAtual.cep = this.cepAtual.cep

            this.pokeDex.ultimoPokemon.push({
              img: this.pokemonAtual.img,
              nome: this.pokemonAtual.nome,
              nHabilidades: this.pokemonAtual.nHabilidades,
              altura: this.pokemonAtual.altura,
              peso: this.pokemonAtual.peso,
              cep: this.pokemonAtual.cep,
              vit:0,
              der:0,
              emp:0
            })
          })

        }


      })

    }
  }
}
