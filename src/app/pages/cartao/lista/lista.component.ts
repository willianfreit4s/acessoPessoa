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
import { CartaoService } from 'src/app/services/cartao.service';
import { Cartao } from 'src/app/models/cartao/cartao.model';

@Component({
  selector: 'demo-app',
  templateUrl: 'lista.component.html',
  styleUrls: ['./lista.component.scss'],
})
export class ListCarComponent {
  //dataSource: DataSource;
  cartaoData: Cartao;
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

  constructor(private service: CartaoService) {
    this.cartaoData = this.service.getCartao();
    Object.assign(this.cartaoData);
    this.service.getCartaoData(this.cartaoData).subscribe((result: any) => {
      console.log(result);

      this.cartaoData = result.result.cartao;
    });
  }
}

@NgModule({
  imports: [BrowserModule, DxDataGridModule, DxTemplateModule, DxBulletModule],
  //declarations: [ListComponent],
  //bootstrap: [ListComponent]
})
export class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
