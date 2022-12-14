import { Component, OnInit } from '@angular/core';
import { environment } from '../environments/environment';
import { loadStyle } from './core/commons/helpers/change-theme-helpers';
import { TokenService } from './core/infraestructure/driven-adapter/token.service';

const TOKEN_KEY = 'msal.idtoken';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  env = environment;
  constructor(public tokenService: TokenService) {
    loadStyle('light.css');
  }
}
