import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import {  Router, RouterModule, Routes } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SettingService } from '../settings/setting.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from 'src/app/core/token.interceptor';

const route : Routes=[
{
  path:'', component:DashboardComponent
}
]

@NgModule({
  declarations: [
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule.forChild(route),
    HttpClientModule
  ],
  providers:[
    SettingService,{
      provide:HTTP_INTERCEPTORS, useClass:TokenInterceptor,multi:true
    }
  ]
})
export class DashboardModule { }
