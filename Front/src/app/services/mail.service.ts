import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  constructor(private httpClient: HttpClient,
              private snackBar: MatSnackBar) { }

  public sendMailMdP(username: string, lien: string) {
    this.httpClient.post<string>('http://localhost:5000/email/changeMdp?username=' + username + '&lien=' + lien, '').subscribe(
                  (res) => {console.log('send email ok');
                            // pop-up ok
                            this.snackBar.open('Mail envoyé', 'Ok', {
                            duration: environment.durationSnackBar
                            });
                   },
                  (error) => {console.log('send email pb', error);
                              console.log(username);
                });
  }

  public sendMailEquipe(username: String, sujetMail: string, contenuMail: string) {
    this.httpClient.post<string>('http://localhost:5000/email/sendMailEquipe?username=' + username + '&sujetMail=' + sujetMail + '&contenuMail=' + contenuMail, '').subscribe(
                  (res) => {console.log('send email ok');
                            // pop-up ok
                            this.snackBar.open('Mail envoyé à la team', 'Ok', {
                            duration: environment.durationSnackBar
                            });
                   },
                  (error) => {console.log('send email pb', error);
                              console.log(username);
                });
  }

  public sendMailSelectionne(idJoueur: number, idManifestation: number) {
    this.httpClient.post<string>('http://localhost:5000/email/selection?idJoueur=' + idJoueur + '&idManifestation=' + idManifestation, '').subscribe(
                  (res) => {console.log('send email ok');
                            // pop-up ok
                            this.snackBar.open('Mail de sélection envoyé', 'Ok', {
                            duration: environment.durationSnackBar
                            });
                   },
                  (error) => {console.log('send email pb', error);
                });

  }
}
