import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Dashboard1Component } from './dashboard1.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule, Routes } from '@angular/router';

const route : Routes=[{
path:'', component:Dashboard1Component
}]

@NgModule({
  declarations: [
    Dashboard1Component
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule.forChild(route)
  ]
})
export class Dashboard1Module { }
