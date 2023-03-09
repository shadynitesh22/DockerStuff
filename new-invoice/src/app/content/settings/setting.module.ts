import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SettingComponent } from './setting/setting.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SettingService } from './setting.service';
import { TokenInterceptor } from 'src/app/core/token.interceptor';

const route : Routes = [{
  path:'', component:SettingComponent
}]


@NgModule({
  declarations: [
    SettingComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    FormsModule,
    HttpClientModule,
  ],
  providers:[
    SettingService,{
      provide:HTTP_INTERCEPTORS, useClass:TokenInterceptor, multi:true
    }
  ]
})
export class SettingModule { }
