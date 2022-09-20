import { Directive, ElementRef, Input, ViewContainerRef, OnInit } from '@angular/core';
import { USER_PERMISSIONS_DATA } from 'src/app/app.permission';
import { isPossibleToPerform } from 'src/app/core/commons/helpers/permission/permission.helpers';

@Directive({
  selector: '[appValidatePermission]',
})
export class ValidatePermissionDirective implements OnInit {
  @Input() identifier;
  @Input() action;

  constructor(private viewContainerRef: ViewContainerRef, private el: ElementRef) {}
  ngOnInit(): void {
    const isAllowed = isPossibleToPerform(this.identifier, USER_PERMISSIONS_DATA['flat-permissions']);

    if (!isAllowed) {
      this.el.nativeElement.classList.add('disabled-feature');
    } else {
      this.el.nativeElement.classList.remove('disabled-feature');
    }
  }
}
