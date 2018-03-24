import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import {LoaderService} from './services/loader.service';
import { ToasterConfig} from 'angular2-toaster';

@Component({
  // tslint:disable-next-line
  selector: 'body',
  template: '<router-outlet><toaster-container [toasterconfig]="config1"></toaster-container><span *ngIf="showLoader" class="loading"></span></router-outlet>'
})
export class AppComponent implements OnInit {
  constructor(private router: Router,private loaderService: LoaderService) { }
  showLoader: boolean;

  public config1 : ToasterConfig = new ToasterConfig({
    positionClass: 'toast-top-center',
    tapToDismiss: false
  });

  ngOnInit() {
    this.loaderService.status.subscribe((val: boolean) => {
      this.showLoader = val;
    });
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0)
    });
  }
}
