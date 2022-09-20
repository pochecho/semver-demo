import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileMicrosoftUseCase } from './profile-microsoft/profile-microsoft.usecase';
import { PhotoMicrosoftUseCase } from './photo-microsoft/photo-microsoft.usecase';
import { InfrastructureModule } from '../../infrastructure/infrastructure.module';

@NgModule({
  providers: [PhotoMicrosoftUseCase, ProfileMicrosoftUseCase],
  imports: [CommonModule, InfrastructureModule],
})
export class UsecasesModule {}
