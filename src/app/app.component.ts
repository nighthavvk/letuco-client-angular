import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

declare let gtag: (key, id, options) => void;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        gtag('config', 'UA-177097302-1', {
            page_path: event.urlAfterRedirects
          }
        );
      }
    });
  }
}
