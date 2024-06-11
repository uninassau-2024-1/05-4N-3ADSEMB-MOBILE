import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ViaCepService {

  constructor(private httpClient: HttpClient) { }

  getCep(cep:number){
    return(this.httpClient.get(`https://viacep.com.br/ws/${cep}/json/`))
  }
}
