import { Injectable } from '@angular/core';

import { Manifestation } from '../model/manifestation';
import { Event } from '../model/event';

import { ManifestationService } from './manifestation.service';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private manifestationService: ManifestationService) { }

  static manifestationsToEvents(manifestation: Manifestation): Event {
    const evt = new Event(0, '', '', '', '');

    evt.idEvent = manifestation.idManifestation;
    evt.title = `${manifestation.title}:${manifestation.equipe.libelleEquipe}`;
    // evt.title = manifestation.title;
    evt.start = manifestation.start + '';
    evt.color = manifestation.equipe.couleur;
    evt.url = `http://localhost:4200/manifestations/${manifestation.idManifestation}`;
console.log(evt);
    return evt;
  }

  getEvents() {
    return this.manifestationService.getManifestations()
      .toPromise()
      .then(
      manifestations => {
        console.log(manifestations);
        return manifestations.map(EventService.manifestationsToEvents);
      }
    );
  }
}
