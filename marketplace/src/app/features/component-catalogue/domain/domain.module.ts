import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdateComponentUseCase } from './usecases/update-component/update-component.usecase';

@NgModule({
  providers: [UpdateComponentUseCase],
  imports: [CommonModule],
})
export class DomainModule {}
