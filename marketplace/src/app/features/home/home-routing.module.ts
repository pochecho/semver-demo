import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from "./ui/pages/home/home.component";
import { DevHomeComponent } from "./ui/pages/dev-home/dev-home.component";
import { DesignHomeComponent } from "./ui/pages/design-home/design-home.component";
import { FigmaDesignComponent } from './ui/pages/figma-design/figma-design.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },

  {
    path: HomeComponent.route,
    component: HomeComponent
  },
  {
    path: DevHomeComponent.route,
    component: DevHomeComponent
  },
  {
    path: DesignHomeComponent.route,
    component: DesignHomeComponent
  },
  {
    path: FigmaDesignComponent.route,
    component: FigmaDesignComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}
