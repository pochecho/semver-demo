import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { RouterModule } from '@angular/router';
import { DirectivesModule } from './ui/directives/directives.module';
import { GeneralComponentsModule } from './ui/general-components/general-components.module';
import { PagesModule } from './ui/pages/pages.module';

@NgModule({
  declarations: [MainComponent],
  exports: [MainComponent, DirectivesModule, PagesModule, GeneralComponentsModule],
  imports: [CommonModule, RouterModule, DirectivesModule, GeneralComponentsModule, PagesModule],
  schemas: [],
})
export class CoreModule {}
