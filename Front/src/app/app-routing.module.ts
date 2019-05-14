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
import { DetailArticleComponent } from './detail-article/detail-article.component';
import { ListeArticlesComponent } from './liste-articles/liste-articles.component';
import { ConsultationArticleComponent } from './consultation-article/consultation-article.component';
import { ListeStatutComponent } from './liste-statut/liste-statut.component';
import { DetailStatutComponent } from './detail-statut/detail-statut.component';
import { ListeDisponibilitesComponent } from './liste-disponibilites/liste-disponibilites.component';
import { DetailDisponibilitesComponent } from './detail-disponibilites/detail-disponibilites.component';
import { ListeLieuxComponent } from './liste-lieux/liste-lieux.component';
import { DetailLieuxComponent } from './detail-lieux/detail-lieux.component';
import { ListeCreneauxComponent } from './liste-creneaux/liste-creneaux.component';
import { DetailCreneauxComponent } from './detail-creneaux/detail-creneaux.component';
import { ListeCategoriesComponent } from './liste-categories/liste-categories.component';
import { DetailCategorieComponent } from './detail-categorie/detail-categorie.component';
import { ChangementMdpComponent } from './changement-mdp/changement-mdp.component';
import { EnvoyerMailComponent } from './envoyer-mail/envoyer-mail.component';
import { DetailManifestationComponent } from './detail-manifestation/detail-manifestation.component';
import { InscriptionManifestationComponent } from './inscription-manifestation/inscription-manifestation.component';

const routes: Routes = [
  {path: 'equipes', component: EquipesComponent},
  {path: 'agenda', component: AgendaComponent},
  {path: 'lieux', component: LieuxComponent},
  {path: 'saisie', component: SaisieComponent},
  {path: 'partenaires', component: PartenairesComponent},
  {path: 'connexion', component: ConnexionComponent},
  {path: 'connexion/chgtMdp/:idUser', component: ChangementMdpComponent},
  {path: 'gestion/manifestations', component: ListeManifestationComponent},
  {path: 'gestion/manifestations/detailmanifestation/:idManifestation', component: DetailManifestationComponent},
  {path: 'gestion/manifestations/detailmanifestation/newManifestation', component: DetailManifestationComponent},
  {path: 'inscriptionmanifestation/:idManifestation', component: InscriptionManifestationComponent},
  {path: 'gestion', component: GestionComponent},
  {path: 'envoyerMail', component: EnvoyerMailComponent},
  {path: 'gestion/joueurs', component: ListeJoueursComponent},
  {path: 'gestion/joueurs/detailjoueur/:idJoueur', component: DetailJoueurComponent},
  {path: 'gestion/joueurs/detailjoueur/newJoueur', component: SaisieComponent},
  {path: 'gestion/equipes', component: ListeEquipesComponent},
  {path: 'gestion/equipes/detailequipe/:idEquipe', component: DetailEquipeComponent},
  {path: 'gestion/equipes/detailequipe/newEquipe', component: DetailEquipeComponent},
  {path: 'gestion/articles', component: ListeArticlesComponent},
  {path: 'gestion/articles/redactionArticle/:idArticle', component: DetailArticleComponent},
  {path: 'gestion/articles/redactionArticle/newArticle', component: DetailArticleComponent},
  {path: 'article/:idArticle', component: ConsultationArticleComponent},
  {path: 'gestion/statuts', component: ListeStatutComponent},
  {path: 'gestion/statuts/detailstatut/:idStatut', component: DetailStatutComponent},
  {path: 'gestion/statuts/detailstatut/newStatut', component: DetailStatutComponent},
  {path: 'gestion/lieux', component: ListeLieuxComponent},
  {path: 'gestion/lieux/detaillieu/:idLieu', component: DetailLieuxComponent},
  {path: 'gestion/lieux/detaillieu/newLieu', component: DetailLieuxComponent},
  {path: 'gestion/disponibilites', component: ListeDisponibilitesComponent},
  {path: 'gestion/disponibilites/detaildisponibilite/:idDisponibilite', component: DetailDisponibilitesComponent},
  {path: 'gestion/disponibilites/detaildisponibilite/newDisponibilite', component: DetailDisponibilitesComponent},
  {path: 'gestion/creneaux', component: ListeCreneauxComponent},
  {path: 'gestion/creneaux/detailcreneau/:idCreneau', component: DetailCreneauxComponent},
  {path: 'gestion/creneaux/detailcreneau/newCreneau', component: DetailCreneauxComponent},
  {path: 'gestion/categories', component: ListeCategoriesComponent},
  {path: 'gestion/categories/detailcategorie/:idCategorie', component: DetailCategorieComponent},
  {path: 'gestion/categories/detailcategorie/newCategorie', component: DetailCategorieComponent},
  {path: 'accueil', component: AccueilComponent},
  {path: 'accueil/logout', component: AccueilComponent},
  {path: '', component: AccueilComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
