import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { PhotoMicrosoftUseCase } from '../../../domain/usecases/photo-microsoft/photo-microsoft.usecase';
import { ProfileMicrosoftUseCase } from '../../../domain/usecases/profile-microsoft/profile-microsoft.usecase';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  static route = 'home';
  @ViewChild('modalComponent') modalVideo;
  @ViewChild('modalComponent') modalVideoCustom;

  constructor(
    private photoMicrosoftHomeUseCase: PhotoMicrosoftUseCase,
    private profileMicrosoftUseCase: ProfileMicrosoftUseCase,
    private sanitizer: DomSanitizer
  ) {}

  response;
  imageToShow: any;
  imageUrl: any;
  isImageLoading: boolean = true;
  nameInitial: string = 'J';
  action = false;
  typeIcon = '';
  customWidth = 'large';
  titleAlign = '';
  buttonAlignment = 'horizontal';
  selectedValue = '';
  subTitle = '';

  ngOnInit(): void {}

  onPressButton(event: any) {}
}
