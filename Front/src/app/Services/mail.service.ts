import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  constructor(private httpClient: HttpClient) { }

  public sendMailMdP(username: string) {
    this.httpClient.post<string>('http://localhost:8080/emaildd/changePassword/' + username, null).subscribe(
                  (res) => {console.log('send email ok');
                            console.log(username);
                   },
                  (error) => {console.log('send email pb', error);
                              console.log(username);
                });
  }
}
