import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Manifestation } from '../modeles/manifestation';
import { ParticipationPK } from '../modeles/participationPK';
import { Participation } from '../modeles/participation';
import { LoginService } from './login.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ManifestationService {

   // La liste des manifestations
   public availableManifestation: Manifestation [];

   // La liste observable que l'on rend visible partout dans l'application
   availableManifestation$: BehaviorSubject<Manifestation[]> = new BehaviorSubject(this.availableManifestation);

   constructor(private httpClient: HttpClient,
              private loginService: LoginService,
              private router: Router) { }

   public getManifestations(): Observable<Manifestation[]> {
      return this.httpClient.get<Manifestation[]>('http://localhost:5000/manifestations/get/manifestations');
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
       return of(new Manifestation(0, '', '', new Date(), null, null, null));
     }
   }

   /**
    * Fonction de création d'une nouvelle manifestation.
    * Elle met à jour notre liste de manifestations et notre liste observable.
    * @param newManifestation la nouvelle manifestation à créer
    */
   public createManifestation(newManifestation: Manifestation) {
    if (this.loginService.logged) {
     this.httpClient.post<Manifestation>('http://localhost:5000/manifestations/create', newManifestation).subscribe(
       createManifestation => {
         this.availableManifestation.push(createManifestation);
         this.availableManifestation$.next(this.availableManifestation);
       }
     );
    } else {
      this.router.navigate(['connexion']);
    }
   }

   /**
    * Fonction de mise à jour d'une manifestation
    * @param manifestation la manifestation à mettre à jour
    */
   public updateManifestation(manifestation: Manifestation) {
    if (this.loginService.logged) {
     this.httpClient.put<Manifestation>(`http://localhost:5000/manifestations/update/${manifestation.idManifestation}`, manifestation).subscribe(
       updateManifestation => {
         this.availableManifestation$.next(this.availableManifestation);
       }
     );
    } else {
      this.router.navigate(['connexion']);
    }
   }

   /**
    * Fonction de suppression d'une Manifestation.
    * Elle met à jour notre liste de Manifestations et notre liste observable.
    * @param idManifestation de la Manifestation à supprimer
    */
   supprimerManifestation(idManifestation: number): Manifestation[] {
    if (this.loginService.logged) {
      this.httpClient.delete('http://localhost:5000/manifestations/delete/' + idManifestation).subscribe(
        () => { console.log('suppression manifestation OK : ', idManifestation);
            },
        (error) => console.log('suppression manifestation pb : ', error)
      );
      this.availableManifestation = this.availableManifestation.filter( manifestation => manifestation.idManifestation !== idManifestation ).slice();
      this.availableManifestation$.next(this.availableManifestation);
      return this.availableManifestation;
    } else {
      this.router.navigate(['connexion']);
    }
   }

    /**
    * Fonction d'enregistrement à une manifestation.
    * Elle met à jour notre liste des participants.
    * @param newParticipation contient idJoueur, idManifestation et idDisponibilite
    */
   public createParticipation(newParticipation: ParticipationPK) {
    if (this.loginService.logged) {
      console.log('départ' + newParticipation.idJoueur);
      const participation = new Participation(newParticipation);
      this.httpClient.post<Manifestation>('http://localhost:5000/participation/create', participation).subscribe();
    } else {
      this.router.navigate(['connexion']);
    }
  }

  public getParticipations(): Observable<Participation[]> {
    return this.httpClient.get<Participation[]>('http://localhost:5000/participation/get/participation');
  }

   /**
    * Cette fonction permet de trouver une manifestation dans la liste des manifestations chargées par l'application
    * grâce à son ID.
    * @param idManifestation l'id qu'il faut rechercher dans la liste.
    */
   public findParticipation(idManifestation: number) {
    if (this.loginService.logged) {
      this.httpClient.get<Manifestation>('http://localhost:5000/participation/get/participation').subscribe();
    } else {
      this.router.navigate(['connexion']);
    }
  }
}
