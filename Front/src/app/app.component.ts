import { Component, OnInit } from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {LoginService} from './Services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'USM volley';

  isConnecte: boolean;
  isLicencie: boolean;
  isCapitaine: boolean;
  isBureau: boolean;
  formulaire: String;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver, private loginService: LoginService) {
  }

  ngOnInit() {
    this.isConnecte = this.loginService.isConnecte;
    if (this.isConnecte) {
      this.formulaire = 'Renouvellement';
    } else {
      this.formulaire = 'Inscription';
    }
    this.loginService.userRoles.subscribe(userRoles => {
      this.isLicencie = userRoles.includes('ROLE_LICENCIE');
      this.isCapitaine = userRoles.includes('ROLE_CAPITAINE');
      this.isBureau = userRoles.includes('ROLE_BUREAU');
    });
  }
}
