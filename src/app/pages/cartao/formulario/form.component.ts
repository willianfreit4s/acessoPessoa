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

import { CartaoService } from '../../../services/cartao.service';
import { Cartao } from '../../../models/cartao/cartao.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'demo-app',
  templateUrl: 'form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormuCarComponent {
  @ViewChild(DxFormComponent, { static: false }) form: DxFormComponent;
  cartao: Cartao;
  // codGestaoPattern: any = /^\+\s*1\s*\(\s*[02-9]\d{2}\)\s*\d{3}\s*-\s*\d{4}$/;
  // codGestaoRules: any = {
  //   X: /[02-9]/,
  // };
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

  constructor(private service: CartaoService) {
    this.cartao = this.service.getCartao();
  }

  onFormSubmit = function (e) {
    Object.assign(this.cartao, { operation: 'insert' });
    this.service.insertCartao(this.cartao).subscribe((result: any) => {
      //resposta do DB
      //console.log(`Result: ${result}`);
      this.message();
    });

    e.preventDefault();
  };

  message(){
    notify(
      {
        message: 'Cartão cadastrado com sucesso',
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
