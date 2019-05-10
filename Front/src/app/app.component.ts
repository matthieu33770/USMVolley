import { Component, OnInit } from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from './../environments/environment';
import {LoginService} from './Services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'USM volley';

  isLoggedin = false;
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
    this.getConnection();
  }

  getConnection() {
    this.loginService.userRole.subscribe(userRole => {
      console.log(userRole);
      this.isLicencie = userRole.includes('Licencie');
      this.isCapitaine = userRole.includes('Capitaine');
      this.isBureau = userRole.includes('Bureau');
      this.isLoggedin = userRole.length > 0;
    });
    if (this.isLoggedin) {
      this.formulaire = 'Renouvellement';
    } else if (!this.isLoggedin) {
      this.formulaire = 'Inscription';
    }
  }

  onDeconnect() {
    this.loginService.signOut();
    this.isLoggedin = false;
    if (this.isLoggedin) {
      this.formulaire = 'Renouvellement';
    } else if (!this.isLoggedin) {
      this.formulaire = 'Inscription';
    }
  }
}
