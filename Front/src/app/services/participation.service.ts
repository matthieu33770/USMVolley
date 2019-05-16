import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ParticipationPK } from '../modeles/participationPK';
import { Participation } from '../modeles/participation';
import { Manifestation } from '../modeles/manifestation';

@Injectable({
  providedIn: 'root'
})
export class ParticipationService {

  // La liste des manifestations
  public availableParticipation: Participation [];

  // La liste observable que l'on rend visible partout dans l'application
  availableParticipation$: BehaviorSubject<Participation[]> = new BehaviorSubject(this.availableParticipation);

  constructor(private httpClient: HttpClient) { }

  public getParticipations(): Observable<Participation[]> {
    return this.httpClient.get<Participation[]>('http://localhost:8080/participation/get/participation');
  }

  public publishParticipations() {
    this.getParticipations().subscribe(
     manifestationList => {
        this.availableParticipation = manifestationList;
        this.availableParticipation$.next(this.availableParticipation);
      });
  }

  /**
    * Cette fonction permet de trouver une manifestation dans la liste des manifestations chargées par l'application
    * grâce à son ID.
    * @param idManifestation l'id qu'il faut rechercher dans la liste.
    */
   public findParticipationParManifestation(idManifestation: number): Observable<Participation> {
    if (idManifestation) {
      if (!this.availableParticipation) {
        return this.getParticipations().pipe(map(participations => participations.find(participation => participation.participationPK.idManifestation === idManifestation)));
      }
      return of(this.availableParticipation.find(participation => participation.participationPK.idManifestation === idManifestation));
    } else {
      return of(new Participation(new ParticipationPK(0, 0, 0)));
    }
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
