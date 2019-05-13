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
    evt.titre = manifestation.title;
    evt.debut = manifestation.start + '';
    evt.color = '#F9E63A';
    // switch (manifestation.equipe) {
    //   case manifestation.equipe.libelleEquipe === 'Open': {
    //     evt.color = '#F9E63A';
    //     break;
    //   }
    //   case 2: {
    //     evt.color = '';
    //     break;
    //   }
    // }
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
