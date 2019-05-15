import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Manifestation } from '../model/Manifestation';
import { ParticipationPK } from '../model/ParticipationPK';
import { Participation } from '../model/Participation';

@Injectable({
  providedIn: 'root'
})
export class ManifestationService {

   // La liste des manifestations
   public availableManifestation: Manifestation [];

   // La liste observable que l'on rend visible partout dans l'application
   availableManifestation$: BehaviorSubject<Manifestation[]> = new BehaviorSubject(this.availableManifestation);

   constructor(private httpClient: HttpClient) { }

   public getManifestations(): Observable<Manifestation[]> {
     return this.httpClient.get<Manifestation[]>('http://localhost:8080/manifestations/get/manifestations');
   }

   public publishManifestations() {
     this.getManifestations().subscribe(
      manifestationList => {
         this.availableManifestation = manifestationList;
         this.availableManifestation$.next(this.availableManifestation);
       });
   }

   /**
    * Cette fonction permet de trouver une manifestation dans la liste des manifestations chargées par l'application
    * grâce à son ID.
    * @param idManifestation l'id qu'il faut rechercher dans la liste.
    */
   public findManifestation(idManifestation: number): Observable<Manifestation> {
     if (idManifestation) {
       if (!this.availableManifestation) {
         return this.getManifestations().pipe(map(manifestations => manifestations.find(manifestation => manifestation.idManifestation === idManifestation)));
       }
       return of(this.availableManifestation.find(manifestation => manifestation.idManifestation === idManifestation));
     } else {
       return of(new Manifestation(0, '', new Date(), null, null, null));
     }
   }

   /**
    * Fonction de création d'une nouvelle manifestation.
    * Elle met à jour notre liste de manifestations et notre liste observable.
    * @param newManifestation la nouvelle manifestation à créer
    */
   public createManifestation(newManifestation: Manifestation) {
     this.httpClient.post<Manifestation>('http://localhost:8080/manifestations/create', newManifestation).subscribe(
       createManifestation => {
         this.availableManifestation.push(createManifestation);
         this.availableManifestation$.next(this.availableManifestation);
       }
     );
   }

   /**
    * Fonction de mise à jour d'une manifestation
    * @param manifestation la manifestation à mettre à jour
    */
   public updateManifestation(manifestation: Manifestation) {
     this.httpClient.put<Manifestation>(`http://localhost:8080/manifestations/update/${manifestation.idManifestation}`, manifestation).subscribe(
       updateManifestation => {
         this.availableManifestation$.next(this.availableManifestation);
       }
     );
   }

   /**
    * Fonction de suppression d'une Manifestation.
    * Elle met à jour notre liste de Manifestations et notre liste observable.
    * @param idManifestation de la Manifestation à supprimer
    */
   supprimerManifestation(idManifestation: number): Manifestation[] {
     this.availableManifestation = this.availableManifestation.filter( manifestation => manifestation.idManifestation !== idManifestation ).slice();
     return this.availableManifestation;
   }

    /**
    * Fonction d'enregistrement à une manifestation.
    * Elle met à jour notre liste des participants.
    * @param newParticipation contient idJoueur, idManifestation et idDisponibilite
    */
   public createParticipation(newParticipation: ParticipationPK) {
    console.log('départ' + newParticipation.idJoueur);
    const participation = new Participation(newParticipation);
    this.httpClient.post<Manifestation>('http://localhost:8080/participation/create', participation).subscribe();
  }
}