import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { loadStyle } from 'src/app/core/commons/helpers/change-theme-helpers';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent {
  currentUrl = true;
  changeIcon = 'bancolombia-horizontal';
  themeList: any[] = [
    { text: 'Bancolombia Light' },
    { text: 'Bancolombia Dark' },
    { text: 'Sufi' }
  ];
  themes = {
    'Bancolombia Light': 'light.css',
    'Bancolombia Dark': 'black.css',
    'Sufi': 'sufi.css',
  };
  constructor(private router: Router, private ref: ChangeDetectorRef) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe( value =>
      {
        this.currentUrl = router.url.toString() === '/home';
        this.ref.detectChanges();
      }
    )
    ;
  }

  ngOnInit(): void {}

  onChangeTheme(res) {
    const theme = this.themes[res.text] || 'light.css';
      loadStyle(theme);
    if (res.text === 'Sufi') {
      this.changeIcon = 'Sufi';
    }else{
      this.changeIcon = 'bancolombia-horizontal';
    }
  }
}
