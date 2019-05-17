import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { LoginService } from '../services/login.service';

import { User } from '../modeles/user';

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
              private loginService: LoginService) { }

  onSubmit() {
    const user = new User(0, '', '', null);
    user.username = this.loginForm.value.username;
    user.mdp = this.loginForm.value.mdp;
    this.loginService.signIn(user);
    console.log(user);
  }
}
