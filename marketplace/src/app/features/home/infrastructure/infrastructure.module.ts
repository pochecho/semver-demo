import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IPhotoMicrosoftGateway } from '../domain/models/photo-microsoft/gateway/photo-microsoft.gateway';
import { IProfileMicrosoftGateway } from '../domain/models/profile-microsoft/gateway/profile-microsoft.gateway';
import { PhotoMicrosoftService } from './driven-adapter/photo-microsoft/photo-microsoft.service';
import { ProfileMicrosoftService } from './driven-adapter/profile-microsoft/profile-microsoft.service';



@NgModule({
  providers: [
    {
      provide: IPhotoMicrosoftGateway,
      useClass: PhotoMicrosoftService,
    },
    {
      provide: IProfileMicrosoftGateway,
      useClass: ProfileMicrosoftService,
    },
  ],
  imports: [
    CommonModule
  ]
})
export class InfrastructureModule { }
