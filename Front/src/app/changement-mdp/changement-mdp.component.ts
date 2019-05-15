import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import {environment} from '../../environments/environment';

import { UsersService } from '../Services/users.service';

import { User } from '../Model/User';

@Component({
  selector: 'app-changement-mdp',
  templateUrl: './changement-mdp.component.html',
  styleUrls: ['./changement-mdp.component.css']
})
export class ChangementMdpComponent implements OnInit {

  idUser: number;
  editionUser: User = new User(0, '', '', null);

  loginForm = this.fb.group({
    username: [null, Validators.required],
    newMdp: [null, Validators.compose([
      Validators.required, Validators.minLength(1), Validators.maxLength(255)])
    ]
  });

  constructor(private route: ActivatedRoute,
              private fb: FormBuilder,
              private userService: UsersService,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.idUser = Number(this.route.snapshot.params.idUser);
    console.log(this.idUser);
    this.userService.findUser(this.idUser).subscribe(user => {
      this.editionUser = user; });
    console.log('init');
  }

  onSubmit() {
    this.editionUser.mdp = this.loginForm.value.newMdp;
    console.log(this.editionUser);
    this.userService.updateUser(this.editionUser).subscribe();
    this.snackBar.open('Votre mot de passe a été modifié !', 'Info', {
      duration: environment.durationSnackBar
    });
  }
}
