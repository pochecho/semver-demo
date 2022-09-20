import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-lost-content',
  templateUrl: './lost-content.component.html',
})
export class LostContentComponent implements OnInit {
  @Input() message = 'Este contenido no está disponible por el momento.';
  @Input() icon = 'il-networking';

   

  ngOnInit(): void {}
}
