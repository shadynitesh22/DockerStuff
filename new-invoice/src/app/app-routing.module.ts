import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { faFontAwesomeLogoFull } from '@fortawesome/free-solid-svg-icons';
import { LayoutComponent } from './layout/layout.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {
    path:'', redirectTo:'login', pathMatch:'full'
  },
  {
    path:'login', loadChildren:()=>import('./authentication/login/login.module').then(m=>m.LoginModule)
  },
  {
    path:'content', component:LayoutComponent, canActivate:[AuthGuard],
    children:[{
      path:'', loadChildren:()=>import('./layout/layout.module').then(m=>m.LayoutModule),

    },
    {
      path:'clients', loadChildren:()=>import('./content/clients/clients.module').then(m=>m.ClientsModule)

    },
    {
      path:'dashboard', loadChildren:()=>import('./content/dashboard/dashboard.module').then(m=>m.DashboardModule)

    },
    {
      path:'dashboard1', loadChildren:()=>import('./content/dashboard1/dashboard1.module').then(m=>m.Dashboard1Module)

    },
    {
      path:'invoice', loadChildren:()=>import('./content/invoice/invoice.module').then(m=>m.InvoiceModule)

    },
    {
      path:'profile', loadChildren:()=>import('./content/profile/profile.module').then(m=>m.ProfileModule)

    },
    {
      path:'projects', loadChildren:()=>import('./content/projects/projects.module').then(m=>m.ProjectsModule)

    },
    {
      path:'reports', loadChildren:()=>import('./content/reports/reports.module').then(m=>m.ReportsModule)

    },
    {
      path:'test', loadChildren:()=>import('./content/test/test.module').then(m=>m.TestModule)

    },
    {
      path:'setting', loadChildren:()=>import('./content/settings/setting.module').then(m=>m.SettingModule)

    },
  ]
  },
  {
    path:'**', redirectTo:'content/dashboard', pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
