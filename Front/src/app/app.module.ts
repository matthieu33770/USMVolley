import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material-module';
import { JwtModule } from '@auth0/angular-jwt';

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
    ListeEquipesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MaterialModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: function tokenGetter() {
          return localStorage.getItem('access_token');
        },
        whitelistedDomains: ['localhost:8080'],
        blacklistedRoutes: ['http://localhost:4200/auth/login']
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
