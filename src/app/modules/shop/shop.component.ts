import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent {

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) { }

  public signOut() {
    this.authService.signOut().subscribe(
      res => {
        this.router.navigate(['']);
      },
      error => console.log(error)
    );
  }
}
