import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcceptedTermsGuard } from './core/commons/guards/accepted-terms/accepted-terms.guard';
// import { UserIsLoggedInGuard } from './core/commons/guards/active-directory/active-directory.guard';
import { HasPermissionGuard } from './core/commons/guards/has-permission/has-permission.guard';
import { NotAcceptedTermsGuard } from './core/commons/guards/not-accepted-terms/not-accepted-terms.guard';
import { NotAllowedComponent } from './core/ui/general-components/not-allowed/not-allowed.component';
// import { DefaultLoginComponent } from './core/ui/pages/default-login/default-login.component';
// import { CommunityModule } from './features/community/community.module';
import { ComponentCatalogueModule } from './features/component-catalogue/component-catalogue.module';
import { DocumentationModule } from './features/documentation/documentation.module';
import { HomeModule } from './features/home/home.module';
// import { NewspaperModule } from './features/newspaper/newspaper.module';
// import { TermsAndConditionsModule } from './features/terms-and-conditions/terms-and-conditions.module';
// import { TermsModalComponent } from './features/terms-and-conditions/ui/pages/terms-modal/terms-modal.component';
// import { VersioningModule } from './features/versioning/versioning.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: HomeModule.route,
    pathMatch: 'full',
  },
  // {
  //   path: TermsModalComponent.route,
  //   component: TermsModalComponent,
  // },
  // {
  //   path: DefaultLoginComponent.route,
  //   component: DefaultLoginComponent,
  // },

  // {
  //   path: VersioningModule.route,
  //   loadChildren: () => import('./features/versioning/versioning.module').then((m) => m.VersioningModule),
  // },

  // {
  //   path: TermsAndConditionsModule.route,
  //   loadChildren: () =>
  //     import('./features/terms-and-conditions/terms-and-conditions.module').then((m) => m.TermsAndConditionsModule),
  //   canActivate: [UserIsLoggedInGuard],
  //   canLoad: [HasPermissionGuard],
  //   data: {
  //     identifier: TermsAndConditionsModule.identifier,
  //   },
  // },

  {
    path: HomeModule.route,
    loadChildren: () => import('./features/home/home.module').then((m) => m.HomeModule),
    canLoad: [AcceptedTermsGuard],
  },
  // {
  //   path: DocumentationModule.route,
  //   loadChildren: () => import('./features/documentation/documentation.module').then((m) => m.DocumentationModule),
  //   canLoad: [AcceptedTermsGuard],
  // },

  {
    path: ComponentCatalogueModule.route,
    loadChildren: () =>
      import('./features/component-catalogue/component-catalogue.module').then((m) => m.ComponentCatalogueModule),

    // canLoad: [HasPermissionGuard],
    data: {
      identifier: ComponentCatalogueModule.identifier,
      breadcrumbs: {
        path: 'main/component-catalogue',
        text: 'Componentes',
      },
    },
  },

  // {
  //   path: CommunityModule.route,
  //   loadChildren: () => import('./features/community/community.module').then((m) => m.CommunityModule),
  // },
  // {
  //   path: NewspaperModule.route,
  //   loadChildren: () => import('./features/newspaper/newspaper.module').then((m) => m.NewspaperModule),
  //   canActivate: [UserIsLoggedInGuard],
  //   canLoad: [HasPermissionGuard],

  //   data: {
  //     identifier: NewspaperModule.identifier,
  //   },
  // },
  {
    path: NotAllowedComponent.route,
    pathMatch: 'full',
    component: NotAllowedComponent,
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      enableTracing: true,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
