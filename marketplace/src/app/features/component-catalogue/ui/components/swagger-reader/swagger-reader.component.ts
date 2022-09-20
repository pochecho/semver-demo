import { Component, Input, OnInit } from '@angular/core';
import SwaggerUI from 'swagger-ui';

@Component({
  selector: 'swagger-reader',
  templateUrl: './swagger-reader.component.html',
  styleUrls: ['./swagger-reader.component.css']
})
export class SwaggerReaderComponent implements OnInit {

  @Input()
  urlSwagger;
  ngOnInit() {
    SwaggerUI({
      domNode: document.getElementById('swagger-ui-item'),
      url: this.urlSwagger
    });
  }

}
