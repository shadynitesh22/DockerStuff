import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { InvoiceComponent } from './invoice/invoice.component';
import { RouterModule, ROUTER_INITIALIZER, Routes } from '@angular/router';
import { NewInvoiceComponent } from './new-invoice/new-invoice.component';
import { InvoiceDetailComponent } from './invoice-detail/invoice-detail.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from 'src/app/core/token.interceptor';
import { InvoiceService } from './invoice.service';
import { GenerateInvoiceComponent } from './generate-invoice/generate-invoice.component';
import { InvoiceResolverResolver } from './invoiceResolver/invoice-resolver.resolver';



const route: Routes=[
  {
    path:'', component: InvoiceComponent
  },
  {
    path:'new-invoice', component: NewInvoiceComponent
  },
  {
    path:'invoice-detail', component:InvoiceDetailComponent
  },
  // {
  //   path:'generated-invoice', component:GenerateInvoiceComponent
  // },
  {
    path:'generated-invoice/:id', resolve:{invoice:InvoiceResolverResolver}, component:GenerateInvoiceComponent
  }
]

@NgModule({
  declarations: [
    InvoiceComponent,
    NewInvoiceComponent,
    InvoiceDetailComponent,
    GenerateInvoiceComponent,

  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule.forChild(route),
    FormsModule,
    HttpClientModule,
  ],
  providers:[
    InvoiceService,InvoiceResolverResolver,{
      provide:HTTP_INTERCEPTORS, useClass:TokenInterceptor, multi:true
    }
  ]
})
export class InvoiceModule { }
