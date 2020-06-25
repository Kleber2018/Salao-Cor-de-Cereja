import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConsCepService {
  constructor(public http: HttpClient) {}
  callService(cep:String):any {return this.http.get(`http://viacep.com.br/ws/` + cep + `/json/`)}

}
