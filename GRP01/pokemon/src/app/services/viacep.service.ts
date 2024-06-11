import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ViacepService {

  constructor(private httpClient: HttpClient) {}
  getViacepService (cep: string = '52081123'){
    return this.httpClient.get(`https://viacep.com.br/ws/${cep}/json/`);
  }
}
