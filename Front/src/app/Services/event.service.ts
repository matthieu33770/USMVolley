import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) {}

    getEvents() {
      return this.http.get('assets/documents/data.json')
        .toPromise()
        // .then(res => <any[]> res.data)
        .then(data => data );
    }
}
