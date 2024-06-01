import { Component } from '@angular/core';
import { PokeApiService } from '../services/poke-api.service';
import { PokedexService } from '../services/pokedex.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  seuPokemon = this.pokeDex.ultimoPokemon
  colorSeuPOkemon = ''
  seuPokemonResult = ''

  pokemonInimigo = {
    img: '',
    nome: '',
    nHabilidades: 0,
    peso: 0,
    altura: 0
  }
  i:number = 0

  restam = this.seuPokemon.length-(this.i+1)
  mensagemErro=""


  constructor(private pokeApi:PokeApiService,private pokeDex:PokedexService) {}

  ngOnInit(){
    this.pokeApi.getPokemon().subscribe(value=>{
      this.pokemonInimigo.img =   JSON.parse(JSON.stringify(value)).sprites.front_default
      this.pokemonInimigo.nome = JSON.parse(JSON.stringify(value)).name
      this.pokemonInimigo.nHabilidades = JSON.parse(JSON.stringify(value)).abilities.length
      this.pokemonInimigo.altura = JSON.parse(JSON.stringify(value)).weight
      this.pokemonInimigo.peso = JSON.parse(JSON.stringify(value)).height})
      console.log(this.pokemonInimigo.nome)
  }

  batalhar(value:number = this.i){
   if (this.i >= this.seuPokemon.length){
    this.i = 0
   }else{
    
    if(this.pokemonInimigo.nHabilidades > this.seuPokemon[value].nHabilidades ){
      this.seuPokemonResult = "PERDEU!"
      this.colorSeuPOkemon = "danger" 
      this.pokeDex.ultimoPokemon[value].der++
      this.i++
    }else if(this.pokemonInimigo.nHabilidades < this.seuPokemon[value].nHabilidades ) {
      this.seuPokemonResult = "GANHOU!"
      this.colorSeuPOkemon = "success" 
      this.pokeDex.ultimoPokemon[value].vit++
      this.pokeApi.getPokemon().subscribe(value=>{
        this.pokemonInimigo.img =   JSON.parse(JSON.stringify(value)).sprites.front_default
        this.pokemonInimigo.nome = JSON.parse(JSON.stringify(value)).name
        this.pokemonInimigo.nHabilidades = JSON.parse(JSON.stringify(value)).abilities.length
        this.pokemonInimigo.altura = JSON.parse(JSON.stringify(value)).weight
        this.pokemonInimigo.peso = JSON.parse(JSON.stringify(value)).height})
    }else{
      this.seuPokemonResult = "EMPATOU!"
      this.colorSeuPOkemon = "warning" 
      this.pokeDex.ultimoPokemon[value].emp++
      this.i++
      this.pokeApi.getPokemon().subscribe(value=>{
        this.pokemonInimigo.img =   JSON.parse(JSON.stringify(value)).sprites.front_default
        this.pokemonInimigo.nome = JSON.parse(JSON.stringify(value)).name
        this.pokemonInimigo.nHabilidades = JSON.parse(JSON.stringify(value)).abilities.length
        this.pokemonInimigo.altura = JSON.parse(JSON.stringify(value)).weight
        this.pokemonInimigo.peso = JSON.parse(JSON.stringify(value)).height})
    }
  
  }

  setTimeout(()=>{
    this.seuPokemonResult = ""
  },3000)
}
}
