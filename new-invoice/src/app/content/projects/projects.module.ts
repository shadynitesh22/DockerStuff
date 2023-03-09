import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsComponent } from './projects/projects.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule, Routes } from '@angular/router';
import { NewProjectComponent } from './new-project/new-project.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from 'src/app/core/token.interceptor';
import { ProjectService } from './project.service';
import { ClientService } from '../clients/client.service';
import { ProjectResolver } from './projectResolver/project.resolver';

const route:Routes=[
  {
    path:'new-project', component:NewProjectComponent
  },{
  path:':id',  component: ProjectsComponent, resolve:{test:ProjectResolver}
}
]

@NgModule({
  declarations: [
    ProjectsComponent,
    NewProjectComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    FontAwesomeModule,
    FormsModule,
    HttpClientModule
  ],
  providers:[
    ProjectService,ClientService,
    {
      provide:HTTP_INTERCEPTORS, useClass:TokenInterceptor, multi:true
    }
  ]
})
export class ProjectsModule { }
