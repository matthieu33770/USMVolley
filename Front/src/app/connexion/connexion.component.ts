import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { LoginService } from '../Services/login.service';
import { MailService } from '../services/mail.service';

import { User } from '../model/User';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent {

  loginForm = this.fb.group({
    username: [null, Validators.required],
    mdp: [null, Validators.compose([
      Validators.required, Validators.minLength(1), Validators.maxLength(255)])
    ]
  });

  constructor(private fb: FormBuilder,
              private loginService: LoginService,
              private mailService: MailService) { }

  onSubmit() {
    const user = new User(0, '', '', false, [], null);
    user.username = this.loginForm.value.username;
    user.mdp = this.loginForm.value.mdp;
    this.loginService.signIn(user);
    console.log(user);
    console.log(user.roleList);
  }

  oubli() {
    const username = this.loginForm.value.username;
    const lien = 'http://localhost:4200/connexion/chgtMdp/';
    this.mailService.sendMailMdP(username, lien);
  }

}
