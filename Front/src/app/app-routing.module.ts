import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgendaComponent } from './agenda/agenda.component';
import { AccueilComponent } from './accueil/accueil.component';
import { SaisieComponent } from './saisie/saisie.component';
import { LieuxComponent } from './lieux/lieux.component';
import { EquipesComponent } from './equipes/equipes.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { PartenairesComponent } from './partenaires/partenaires.component';
import { ListeManifestationComponent } from './liste-manifestation/liste-manifestation.component';
import { GestionComponent } from './gestion/gestion.component';
import { ListeJoueursComponent } from './liste-joueurs/liste-joueurs.component';
import { DetailJoueurComponent } from './detail-joueur/detail-joueur.component';
import { ListeEquipesComponent } from './liste-equipes/liste-equipes.component';
import { DetailEquipeComponent } from './detail-equipe/detail-equipe.component';

const routes: Routes = [
  {path: 'equipes', component: EquipesComponent},
  {path: 'agenda', component: AgendaComponent},
  {path: 'lieux', component: LieuxComponent},
  {path: 'saisie', component: SaisieComponent},
  {path: 'partenaires', component: PartenairesComponent},
  {path: 'connexion', component: ConnexionComponent},
  {path: 'manifestations', component: ListeManifestationComponent},
  {path: 'gestion', component: GestionComponent},
  {path: 'gestion/joueurs', component: ListeJoueursComponent},
  {path: 'gestion/joueurs/detailjoueur/:idJoueur', component: DetailJoueurComponent},
  {path: 'gestion/equipes', component: ListeEquipesComponent},
  {path: 'gestion/equipes/detailequipe/:idEquipe', component: DetailEquipeComponent},
  {path: 'accueil', component: AccueilComponent},
  {path: 'accueil/logout', component: AccueilComponent},
  {path: '', component: AccueilComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
