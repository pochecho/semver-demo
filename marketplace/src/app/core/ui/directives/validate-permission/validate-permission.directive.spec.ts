import { ElementRef, ViewContainerRef } from '@angular/core';
import { ValidatePermissionDirective } from './validate-permission.directive';

describe('ValidatePermissionDirective', () => {
  it('should create an instance', () => {
    let viewContainerRef:ViewContainerRef;
    let elementRef: ElementRef;
    const directive = new ValidatePermissionDirective(viewContainerRef, elementRef);
    expect(directive).toBeTruthy();
  });
});
