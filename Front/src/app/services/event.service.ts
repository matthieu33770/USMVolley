import { Injectable } from '@angular/core';

import { Manifestation } from '../modeles/manifestation';
import { Event } from '../modeles/event';

import { ManifestationService } from './manifestation.service';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private manifestationService: ManifestationService) { }

  static manifestationsToEvents(manifestation: Manifestation): Event {
    const evt = new Event(0, '', '', '', '');

    evt.idEvent = manifestation.idManifestation;

    if (manifestation.title === 'Match' || manifestation.title === 'match') {
      evt.title = 'M : ' + `${manifestation.equipe.libelleEquipe}`;
      evt.color = manifestation.equipe.couleur;
    } else {
      evt.title = 'Entrainement';
      evt.color = '#989392';
    }
    evt.start = manifestation.start + '';
    evt.url = `/inscriptionmanifestation/${manifestation.idManifestation}`;
    return evt;
  }

  getEvents() {
    return this.manifestationService.getManifestations()
      .toPromise()
      .then(
      manifestations => {
        return manifestations.map(EventService.manifestationsToEvents);
      }
    );
  }
}
