import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  LoginFormComponent,
  ResetPasswordFormComponent,
  CreateAccountFormComponent,
  ChangePasswordFormComponent,
} from './shared/components';
import { AuthGuardService } from './shared/services';
import { ListComponent } from './pages/pessoa/lista/lista.component';
import { LogsComponent } from './pages/logs/logs.component';
import { FormuComponent } from './pages/pessoa/formulario/form.component';
import { FormuCarComponent } from './pages/cartao/formulario/form.component';
import { ListCarComponent } from './pages/cartao/lista/lista.component';
import { FormuPesCarComponent } from './pages/pessoa_cartao/formulario/form.component';
import { ListPesCarComponent } from './pages/pessoa_cartao/lista/lista.component';
import {
  DevExtremeModule,
  DxBulletModule,
  DxCheckBoxModule,
  DxDataGridModule,
  DxFormModule,
  DxSelectBoxModule,
  DxTemplateModule,
} from 'devextreme-angular';
import { PessoaService } from './services/pessoa.service';
import { CartaoService } from './services/cartao.service';
import { PessoaCartaoService } from './services/pessoa_cartao.service';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  {
    path: 'formulario_cartao',
    component: FormuCarComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'lista_cartao',
    component: ListCarComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'lista_pessoa',
    component: ListComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'formulario_pessoa',
    component: FormuComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'formulario_pessoa_cartao',
    component: FormuPesCarComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'lista_pessoa_cartao',
    component: ListPesCarComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'logs',
    component: LogsComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'login-form',
    component: LoginFormComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'reset-password',
    component: ResetPasswordFormComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'create-account',
    component: CreateAccountFormComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'change-password/:recoveryCode',
    component: ChangePasswordFormComponent,
    canActivate: [AuthGuardService],
  },
];

@NgModule({
  declarations: [
    FormuCarComponent,
    ListCarComponent,
    ListComponent,
    LogsComponent,
    FormuComponent,
    FormuPesCarComponent,
    ListPesCarComponent,
  ],
  imports: [
    RouterModule.forRoot(routes, { useHash: true }),
    DxDataGridModule,
    DxFormModule,
    DevExtremeModule,
    DxCheckBoxModule,
    DxSelectBoxModule,
    DxFormModule,
    DxTemplateModule,
    DxBulletModule,
    HttpClientModule
  ],
  exports: [RouterModule],
  providers: [AuthGuardService, PessoaService, CartaoService, PessoaCartaoService],

})
export class AppRoutingModule {}
