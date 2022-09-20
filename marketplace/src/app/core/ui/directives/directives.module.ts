import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidatePermissionDirective } from './validate-permission/validate-permission.directive';
import { AdDirective } from './ad-host-directive/ad-host';

@NgModule({
  declarations: [AdDirective, ValidatePermissionDirective],
  exports: [ValidatePermissionDirective, AdDirective],
  imports: [CommonModule],
})
export class DirectivesModule {}
