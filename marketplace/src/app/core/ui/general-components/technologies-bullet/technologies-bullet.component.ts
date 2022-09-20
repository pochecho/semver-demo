import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-technologies-bullet',
  templateUrl: './technologies-bullet.component.html',
  styleUrls: ['./technologies-bullet.component.css'],
})
export class TechnologiesBulletComponent implements OnInit {
  @Input() technologies;
  selectedTechnology;

  @Output() onSelectTech = new EventEmitter<string>();

  technologyMapper =  {
    angular: 'Angular',
    flutter: 'Flutter',
    native: 'Nativo',
    java: 'Java',
    elixir: 'Elixir'
  }
   

  ngOnInit(): void {}

  selectBullet(bullet){
    this.onSelectTech.emit(bullet);
    this.selectedTechnology = bullet;
  }
}
