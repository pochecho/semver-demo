import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload-component-success',
  templateUrl: './upload-component-success.component.html',
  styleUrls: ['./upload-component-success.component.css']
})
export class UploadComponentSuccessComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    

  }
  goHome(){
    this.router.navigateByUrl('/');
  }
  goToAddAnotherComponent(){
   this.router.navigateByUrl('component-catalogue/upload-component'); 
  }

}
