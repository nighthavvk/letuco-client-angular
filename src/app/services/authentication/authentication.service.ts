import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';
import { AngularTokenService } from 'angular-token';
import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private tokenService: AngularTokenService,
    private localStorage: LocalStorageService
  ) { }

  signIn(data: { email: string, password: string }): Observable<any> {
    const signIn$ = this.tokenService.signIn({
      login: data.email,
      password: data.password
    });

    signIn$.subscribe((response) => {
      this.localStorage.setItem('accountId', response.body.data.account_id);
    });

    return signIn$;
  }

  signOut(): Observable<any> {
    const signOut$ = this.tokenService.signOut().pipe(share());

    signOut$.subscribe(() => {
      this.localStorage.removeItem('accountId');
    });

    return signOut$;
  }
}
