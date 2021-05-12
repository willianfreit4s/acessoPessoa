import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PessoaCartao } from '../models/pessoa_cartao/pessoa_cartao.model';

// Ao realizar o login pegar o token e salvar no local storage
let token =
  'eyJpYXQiOjE2MjA2Nzc0MzksImp0aSI6Ik16RTROalUzTXc9PSIsImlzcyI6Im8wMmIwNi5rbW0uY29tLmJyIiwibmJmIjoxNjIwNjc3NDQ0LCJleHAiOjE2MzYyMjk0NDQsImRhdGEiOnsidXNlcm5hbWUiOiJrbW1fZGVzZW52IiwicGFzc3dvcmQiOiJYNStIWU9ZaXRNUTRLc0lKNUxqY3ZRPT0iLCJjb2RfZ2VzdGFvIjo5MzgyNCwiZmlsaWFpcyI6bnVsbH19.NTBiYWJkMWU5ZDBiYzk0MWI4YmMxZWIzMTc2MWJiMmZkYjdkZjE2MjljMWE4MWQ4YmZkNzZmOTQ4NWViNWE3MQ==';

// variavel de ambiente
const url = 'http://o02b06.kmm.com.br/_remote/gateway.php';

@Injectable()
export class PessoaCartaoService {
  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `${token}`,
    }),
  };

  insertPessoaCartao(params: PessoaCartao): Observable<any> {
    //debugger
    return this.http.post(
      url,
      {
        module: 'M5000_ADMINCORP',
        operation: 'cadPesCar',
        parameters: params,
      },
      this.httpOptions
    );
  }

  getPessoaCartaoData(params: PessoaCartao): Observable<any> {
    return this.http.post(
      url,
      {
        module: 'M5000_ADMINCORP',
        operation: 'getPesCar',
        parameters: params,
      },
      this.httpOptions
    );
  }

  getPessoaCartao(): PessoaCartao {
    return new PessoaCartao();
  }
}
