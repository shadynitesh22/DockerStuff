import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ClientsComponent } from './clients/clients.component';
import { RouterModule, Routes } from '@angular/router';
import { NewClientComponent } from './new-client/new-client.component';
import { ClientProfileComponent } from './client-profile/client-profile.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from 'src/app/core/token.interceptor';
import { ClientService } from './client.service';
import { ClientResolver, TestResolver } from './client-resolver/client-resolver.resolver';
import { NgxPaginationModule } from 'ngx-pagination';

const route : Routes=[
  {
    path:'new-client', component:NewClientComponent
  },{

  path:':id', component:ClientsComponent, resolve:{test:TestResolver}
},

{
  path:'client-info/:id', component:ClientProfileComponent, resolve:{client:ClientResolver}

}]

@NgModule({
  declarations: [
    ClientsComponent,
    NewClientComponent,
    ClientProfileComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule.forChild(route),
    FormsModule,
    HttpClientModule,
    NgxPaginationModule
  ],
  providers:[
    ClientService,ClientResolver,TestResolver,
    {
      provide:HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi:true
    }
  ]
})
export class ClientsModule { }
