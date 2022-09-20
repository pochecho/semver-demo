import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'community-banner-component',
  templateUrl: './community-banner.component.html',
  styleUrls: ['./community-banner.component.css']
})
export class CommunityBannerComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navigate() {
    this.router.navigateByUrl('/community');
  }

}
