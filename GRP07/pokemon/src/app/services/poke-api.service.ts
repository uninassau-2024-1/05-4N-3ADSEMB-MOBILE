import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PokeAPIService {
  constructor(private httpClient: HttpClient) { }

  getPokeAPIService(id: number) { 
    return this.httpClient.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
  }
}
