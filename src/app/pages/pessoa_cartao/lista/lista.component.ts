import {
  NgModule,
  Component,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {
  DxDataGridModule,
  DxBulletModule,
  DxTemplateModule,
} from 'devextreme-angular';

import { PessoaCartao } from 'src/app/models/pessoa_cartao/pessoa_cartao.model';
import { PessoaCartaoService } from 'src/app/services/pessoa_cartao.service';

@Component({
  selector: 'demo-app',
  templateUrl: 'lista.component.html',
  styleUrls: ['./lista.component.scss'],
})
export class ListPesCarComponent {
  pessoaCartaoData: PessoaCartao;
  collapsed = false;
  contentReady = (e) => {
    if (!this.collapsed) {
      this.collapsed = true;
      e.component.expandRow(['EnviroCare']);
    }
  };

  customizeTooltip = (pointsInfo) => {
    return { text: parseInt(pointsInfo.originalValue) + '%' };
  };

  constructor(private service: PessoaCartaoService) {
    this.pessoaCartaoData = this.service.getPessoaCartao();
    Object.assign(this.pessoaCartaoData);
    this.service
      .getPessoaCartaoData(this.pessoaCartaoData)
      .subscribe((result) => {
        this.pessoaCartaoData = result.result.pessoa_cartao;
        console.log(this.pessoaCartaoData);        
      });
  }
}

@NgModule({
  imports: [BrowserModule, DxDataGridModule, DxTemplateModule, DxBulletModule],
})
export class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
