import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { QuillModule } from 'ngx-quill';
// import { LocalMsalServiceService } from 'src/app/core/infraestructure/driven-adapter/local-msal-service.service';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp } from './app.initializer';
import { CoreModule } from './core/core.module';
import { TokenService } from './core/infraestructure/driven-adapter/token.service';
// import { AuthorizationModule } from './features/authorization/authorization.module';
// import { GetUserInformationUsecase } from './features/authorization/domain/usecases/get-user-information/get-user-information.usecase';
// import { UsecasesModule as TermsAndConditionsUsecasesModule } from './features/terms-and-conditions/domain/usecases/usecases.module';
// import { TermsAndConditionsModule } from './features/terms-and-conditions/terms-and-conditions.module';
// import { TermsModalComponent } from './features/terms-and-conditions/ui/pages/terms-modal/terms-modal.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    // BcModalModule,
    // BcIconModule.forRoot({
    //   path: '',
    // }),
    // TermsAndConditionsUsecasesModule,
    // AuthorizationUsecasesModule,
    // BcPreloaderModule,
    HttpClientModule,
    CoreModule,
    // TermsAndConditionsModule,
    // NewspaperModule,
    // AuthorizationModule,
    // VersioningModule,
    // HomeModule,

    // BcServicesModule.forRoot(),
    AppRoutingModule,
    BrowserModule,
    QuillModule.forRoot(),
  ],
  providers: [
    TokenService,
    // GetUserInformationUsecase,
    // GetTermsConditionsUseCase,
    // RegisterTermsConditionsUseCase,
    // TermsAndConditionsMapper,
    // {
    //   provide: GetTermsConditionsGateway,
    //   useClass: TermsAndConditionsService,
    // },

    // {
    //   provide: ValidateOAuthTermsGateway,
    //   useClass: OauthTermsService,
    // },
    // {
    //   provide: RegisterTermsAndConditionsGateway,
    //   useClass: RegisterTermsAndConditionsService,
    // },
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: MsalInterceptor,
    //   multi: true,
    // },
    // // InitAppService,
    // LocalMsalServiceService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
