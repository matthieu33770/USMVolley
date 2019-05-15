import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import {environment} from '../../environments/environment';

import { MailService } from '../services/mail.service';
import { UsersService } from '../services/users.service';

import { User } from '../model/User';

@Component({
  selector: 'app-envoi-mail',
  templateUrl: './envoi-mail.component.html',
  styleUrls: ['./envoi-mail.component.css']
})
export class EnvoiMailComponent implements OnInit {

  editionUser: User = new User(0, '', '', null);

  loginForm = this.fb.group({
    username: [null, Validators.required],
  });

  constructor(private fb: FormBuilder,
              private mailService: MailService,
              private userService: UsersService,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  oubli() {
    const username = this.loginForm.value.username;
    const lien = 'http://localhost:4200/connexion/chgtMdp/';
    this.mailService.sendMailMdP(username, lien);
    this.snackBar.open('Un mail vous a été envoyé pour réinitialiser votre mot de passe.', 'Info', {
      duration: environment.durationSnackBar
    });
    this.userService.findByUsername(username).subscribe(user => {
      this.editionUser = user; });
    console.log('init');
  }

}
