import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { UsecasesModule } from './domain/usecases/usecases.module';
import { HomeRoutingModule } from './home-routing.module';
import { PagesModule } from './ui/pages/pages.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, CoreModule, HttpClientModule, HomeRoutingModule, PagesModule, UsecasesModule],
  providers: [],
})
export class HomeModule {
  static route = 'home';
}
