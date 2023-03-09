import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTachometer } from '@fortawesome/free-solid-svg-icons';

@NgModule({
  declarations: [
    SidemenuComponent,
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    RouterModule,
    CommonModule,
    FontAwesomeModule
  ]
})
export class LayoutModule {
  constructor(){
    library.add(faTachometer)
  }
}
