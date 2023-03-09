import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TestComponent } from './test/test.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from 'src/app/core/token.interceptor';
import { TestService } from './test.service';
import { FormsModule } from '@angular/forms';
import { TestResolver } from './test.resolver';

const route:Routes=[
  {
    path:':id', component:TestComponent, resolve:{test:TestResolver}
  }
]

@NgModule({
  declarations: [
    TestComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    HttpClientModule,
    FormsModule
  ],
  providers:[
    TestService,TestResolver,{
      provide:HTTP_INTERCEPTORS, useClass:TokenInterceptor, multi:true
    }
  ]
})
export class TestModule { }
