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
//import DataSource from 'devextreme/data/data_source';
import { Service } from '../../../../../app2.service';

import { Pessoa } from '../../../models/pessoa/pessoa.model';
import { PessoaService } from 'src/app/services/pessoa.service';

// if (!/localhost/.test(document.location.host)) {
//   enableProdMode();
// }

@Component({
  selector: 'demo-app',
  templateUrl: 'lista.component.html',
  styleUrls: ['./lista.component.scss'],
  providers: [Service],
})
export class ListComponent {
  //dataSource: DataSource;
  pessoaData: Pessoa;
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

  constructor(private service: PessoaService) {
    this.pessoaData = this.service.getPessoa();
    Object.assign(this.pessoaData);
    this.service.getPessoaData(this.pessoaData).subscribe((result: any) => {
      console.log('Result: ', result);
      this.pessoaData = result.result.pessoa;
    });
    //this.dataSource = this.service.getPessoaData();
  }
}

@NgModule({
  imports: [BrowserModule, DxDataGridModule, DxTemplateModule, DxBulletModule],
})
export class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
