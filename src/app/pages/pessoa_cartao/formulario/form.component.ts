import { NgModule, Component, ViewChild } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {
  DxCheckBoxModule,
  DxSelectBoxModule,
  DxNumberBoxModule,
  DxButtonModule,
  DxFormModule,
  DxAutocompleteModule,
  DxFormComponent,
} from 'devextreme-angular';
import notify from 'devextreme/ui/notify';

import { PessoaCartaoService } from '../../../services/pessoa_cartao.service';
import { PessoaCartao } from '../../../models/pessoa_cartao/pessoa_cartao.model';
import { FormsModule } from '@angular/forms';
import { Pessoa } from '../../../models/pessoa/pessoa.model';
import { PessoaService } from 'src/app/services/pessoa.service';
import { Cartao } from '../../../models/cartao/cartao.model';
import { CartaoService } from 'src/app/services/cartao.service';

@Component({
  selector: 'demo-app',
  templateUrl: 'form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormuPesCarComponent {
  @ViewChild(DxFormComponent, { static: false }) form: DxFormComponent;
  pessoaCartao: PessoaCartao;
  pessoaData: Pessoa;
  pessoaData2: Pessoa[] = [];
  cartaoData: Cartao;
  cartaoData2: Cartao[] = [];
  codGestaoPattern: any = /^\+\s*1\s*\(\s*[02-9]\d{2}\)\s*\d{3}\s*-\s*\d{4}$/;
  codGestaoRules: any = {
    X: /[02-9]/,
  };
  codigoPattern: any = /^\+\s*1\s*\(\s*[02-9]\d{2}\)\s*\d{3}\s*-\s*\d{4}$/;
  codigoRules: any = {
    X: /[02-9]/,
  };
  buttonOptions: any = {
    text: 'Registrar',
    type: 'success',
    useSubmitBehavior: true,
  };
  checkComparison() {
    return true;
  }
  constructor(
    private service: PessoaCartaoService,
    private service2: PessoaService,
    private service3: CartaoService
  ) {
    this.pessoaCartao = this.service.getPessoaCartao();
    this.pessoaData = this.service2.getPessoa();
    this.cartaoData = this.service3.getCartao();

    Object.assign(this.pessoaData);
    this.service2.getPessoaData(this.pessoaData).subscribe((result: any) => {
      result.result.pessoa.map((pessoa: Pessoa) => {
        this.pessoaData2.push(pessoa);
      });
      //console.log(this.pessoaData2);
    });

    Object.assign(this.cartaoData);
    this.service3.getCartaoData(this.cartaoData).subscribe((result: any) => {
      result.result.cartao.map((cartao: Cartao) => {
        this.cartaoData2.push(cartao);
      });
    });
  }

  onFormSubmit = function (e) {
    Object.assign(this.pessoaCartao, { operation: 'insert' });
    this.service
      .insertPessoaCartao(this.pessoaCartao)
      .subscribe((result: any) => {
        //console.log(`Result: ${result}`);
        this.message();
      });
    // console.log(this.pessoaCartao);
    // console.log(this.pessoaCartao.validade);
    

    e.preventDefault();
  };

  message() {
    notify(
      {
        message: 'Pessoa Cartão cadastrada com sucesso',
        position: {
          my: 'center top',
          at: 'center top',
        },
      },
      'success',
      3000
    );
  }
}

@NgModule({
  imports: [
    BrowserModule,
    DxCheckBoxModule,
    DxSelectBoxModule,
    DxNumberBoxModule,
    DxButtonModule,
    DxAutocompleteModule,
    DxFormModule,
    FormsModule,
  ],
})
export class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
