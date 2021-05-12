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

import { Pessoa } from '../../../models/pessoa/pessoa.model';
import { FormsModule } from '@angular/forms';
import { PessoaService } from 'src/app/services/pessoa.service';

const verifyCpf = function (value: any) {
  let soma: number;
  let resto: number;
  soma = 0;
  if (typeof value !== 'string') return false;
  return new Promise((resolve) => {
    setTimeout(function () {
      value = value.replace(/\D/g, '');
      if (
        value.length !== 11 ||
        value === '00000000000' ||
        value === '11111111111' ||
        value === '22222222222' ||
        value === '33333333333' ||
        value === '44444444444' ||
        value === '55555555555' ||
        value === '66666666666' ||
        value === '77777777777' ||
        value === '88888888888' ||
        value === '99999999999'
      ) {
        return resolve(false);
      }

      for (let i = 1; i <= 9; i++) {
        soma = soma + parseInt(value.substring(i - 1, i)) * (11 - i);
      }
      resto = (soma * 10) % 11;

      if (resto == 10 || resto == 11) resto = 0;
      if (resto != parseInt(value.substring(9, 10))) return resolve(false);

      soma = 0;
      for (let i = 1; i <= 10; i++)
        soma = soma + parseInt(value.substring(i - 1, i)) * (12 - i);
      resto = (soma * 10) % 11;

      if (resto == 10 || resto == 11) resto = 0;
      if (resto != parseInt(value.substring(10, 11))) return resolve(false);
      return resolve(true);
    }, 1000);
  });
};

@Component({
  selector: 'demo-app',
  templateUrl: 'form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormuComponent {
  @ViewChild(DxFormComponent, { static: false }) form: DxFormComponent;
  pessoa: Pessoa;
  nomePattern: any = /^[a-zA-Z][a-zA-Z-_\.]{3,20}$/;
  nomeRules: any = {
    X: /^[a-zA-Z][a-zA-Z-_\.]{3,20}$/,
  };
  cpfPattern: any = /^\+\s*1\s*\(\s*[02-9]\d{2}\)\s*\d{3}\s*-\s*\d{4}$/;
  cpfRules: any = {
    X: /[02-9]/,
  };
  buttonOptions: any = {
    text: 'Registrar',
    type: 'success',
    useSubmitBehavior: true,
  };

  constructor(private service: PessoaService) {
    this.pessoa = this.service.getPessoa();
  }

  checkComparison() {
    return true;
  }

  asyncValidation(params) {
    return verifyCpf(params.value);
  }

  onFormSubmit = function (e) {
    Object.assign(this.pessoa, { operation: 'insert' });
    this.service.insertPessoa(this.pessoa).subscribe((result: any) => {
      // resposta do DB
      //console.log('Result:', result);
      this.message();
    });

    e.preventDefault();
  };

  message() {
    notify(
      {
        message: 'Pessoa cadastrada com sucesso!',
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
