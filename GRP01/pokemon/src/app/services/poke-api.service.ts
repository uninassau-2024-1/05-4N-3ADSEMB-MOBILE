
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokeAPIService {
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private http: HttpClient) {}

  getPokemon(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  getRandomPokemon(): Observable<any> {
    const randomId = Math.floor(Math.random() * 1302) + 1; 
    return this.getPokemon(randomId);
  }
}
