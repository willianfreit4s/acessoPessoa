import { Injectable } from '@angular/core';
import { Pessoa } from '../models/pessoa/pessoa.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// Ao realizar o login pegar o token e salvar no local storage
let token =
  'eyJpYXQiOjE2MjA2Nzc0MzksImp0aSI6Ik16RTROalUzTXc9PSIsImlzcyI6Im8wMmIwNi5rbW0uY29tLmJyIiwibmJmIjoxNjIwNjc3NDQ0LCJleHAiOjE2MzYyMjk0NDQsImRhdGEiOnsidXNlcm5hbWUiOiJrbW1fZGVzZW52IiwicGFzc3dvcmQiOiJYNStIWU9ZaXRNUTRLc0lKNUxqY3ZRPT0iLCJjb2RfZ2VzdGFvIjo5MzgyNCwiZmlsaWFpcyI6bnVsbH19.NTBiYWJkMWU5ZDBiYzk0MWI4YmMxZWIzMTc2MWJiMmZkYjdkZjE2MjljMWE4MWQ4YmZkNzZmOTQ4NWViNWE3MQ==';

// variavel de ambiente
const url = 'http://o02b06.kmm.com.br/_remote/gateway.php';

@Injectable()
export class PessoaService {
  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `${token}`,
    }),
  };

  // Terminar de configurar
  insertPessoa(params: Pessoa): Observable<any> {
    //debugger
    return this.http.post(
      url,
      {
        module: 'M5000_ADMINCORP',
        operation: 'cadPes',
        parameters: params,
      },
      this.httpOptions
    );
  }

  getPessoaData(params: Pessoa): Observable<any> {
    return this.http.post(
      url,
      {
        module: 'M5000_ADMINCORP',
        operation: 'getPes',
        parameters: params,
      },
      this.httpOptions
    );
  }

  getPessoa(): Pessoa {
    return new Pessoa();
  }
}
