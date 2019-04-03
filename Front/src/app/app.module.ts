import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FileSelectDirective } from 'ng2-file-upload';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material-module';
import { JwtModule } from '@auth0/angular-jwt';

import { CalendarModule, DateAdapter } from 'angular-calendar';
import { FlatpickrModule } from 'angularx-flatpickr';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AgendaComponent } from './agenda/agenda.component';
import { AccueilComponent } from './accueil/accueil.component';
import { SaisieComponent } from './saisie/saisie.component';
import { LieuxComponent } from './lieux/lieux.component';
import { EquipesComponent } from './equipes/equipes.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { PartenairesComponent } from './partenaires/partenaires.component';
import { ListeManifestationComponent } from './liste-manifestation/liste-manifestation.component';
import { DetailManifestationComponent } from './detail-manifestation/detail-manifestation.component';
import { GestionComponent } from './gestion/gestion.component';
import { ListeJoueursComponent } from './liste-joueurs/liste-joueurs.component';
import { DetailJoueurComponent } from './detail-joueur/detail-joueur.component';
import { DetailEquipeComponent } from './detail-equipe/detail-equipe.component';
import { ListeEquipesComponent } from './liste-equipes/liste-equipes.component';
import { DetailArticleComponent } from './detail-article/detail-article.component';
import { ListeArticlesComponent } from './liste-articles/liste-articles.component';
import { DetailStatutComponent } from './detail-statut/detail-statut.component';
import { ListeStatutComponent } from './liste-statut/liste-statut.component';
import { ListeLieuxComponent } from './liste-lieux/liste-lieux.component';
import { ListeDisponibilitesComponent } from './liste-disponibilites/liste-disponibilites.component';
import { ListeCreneauxComponent } from './liste-creneaux/liste-creneaux.component';
import { DetailLieuxComponent } from './detail-lieux/detail-lieux.component';
import { DetailCreneauxComponent } from './detail-creneaux/detail-creneaux.component';
import { DetailDisponibilitesComponent } from './detail-disponibilites/detail-disponibilites.component';
import { CalendrierComponent } from './calendrier/calendrier.component';
import { ListeManifestationsComponent } from './liste-manifestations/liste-manifestations.component';

registerLocaleData(localeFr);

@NgModule({
  declarations: [
    AppComponent,
    AgendaComponent,
    AccueilComponent,
    SaisieComponent,
    LieuxComponent,
    EquipesComponent,
    ConnexionComponent,
    PartenairesComponent,
    ListeManifestationComponent,
    DetailManifestationComponent,
    GestionComponent,
    ListeJoueursComponent,
    DetailJoueurComponent,
    DetailEquipeComponent,
    ListeEquipesComponent,
    FileSelectDirective,
    DetailArticleComponent,
    ListeArticlesComponent,
    DetailStatutComponent,
    ListeStatutComponent,
    ListeLieuxComponent,
    ListeDisponibilitesComponent,
    ListeCreneauxComponent,
    DetailLieuxComponent,
    DetailCreneauxComponent,
    DetailDisponibilitesComponent,
    CalendrierComponent,
    ListeManifestationsComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MaterialModule,
    NgbModalModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: function tokenGetter() {
          return localStorage.getItem('access_token');
        },
        whitelistedDomains: ['localhost:8080'],
        blacklistedRoutes: ['http://localhost:4200/auth/login']
      }
    }),
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
