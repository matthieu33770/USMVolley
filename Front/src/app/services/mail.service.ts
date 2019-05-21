import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  constructor(private httpClient: HttpClient) { }

  public sendMailMdP(username: string, lien: string) {
    this.httpClient.post<string>('http://localhost:8080/email/changeMdp?username=' + username + '&lien=' + lien, '').subscribe(
                  (res) => {console.log('send email ok');
                            console.log(username);
                   },
                  (error) => {console.log('send email pb', error);
                              console.log(username);
                });
  }

  public sendMailEquipe(username: String, sujetMail: string, contenuMail: string) {
    console.log('je suis dans la fonction du service');
    this.httpClient.post<string>('http://localhost:8080/email/sendMailEquipe?username=' + username + '&sujetMail=' + sujetMail + '&contenuMail=' + contenuMail, '').subscribe(
                  (res) => {console.log('send email ok');
                            console.log(username);
                   },
                  (error) => {console.log('send email pb', error);
                              console.log(username);
                });
  }
}
