import { Component } from '@angular/core';

import { ManifestationService } from '../services/manifestation.service';

@Component({
  selector: 'app-liste-manifestation',
  templateUrl: './liste-manifestation.component.html',
  styleUrls: ['./liste-manifestation.component.css']
})
export class ListeManifestationComponent {

  choix = '';
  isChoix = false;

  constructor(private manifestationService: ManifestationService) { }

  choixFait () {
    this.isChoix = true;
    console.log(this.choix);
    this.manifestationService.publishManifestations();
  }
}
