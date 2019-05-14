import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FileSelectDirective } from 'ng2-file-upload';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material-module';
import { JwtModule } from '@auth0/angular-jwt';
import { NgxPayPalModule } from 'ngx-paypal';
import { FullCalendarModule } from 'primeng/fullcalendar';
import { CalendarModule } from 'primeng/primeng';

import { FlatpickrModule } from 'angularx-flatpickr';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
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
import { ListeCategoriesComponent } from './liste-categories/liste-categories.component';
import { DetailCategorieComponent } from './detail-categorie/detail-categorie.component';
import { LicencieGuard } from './guards/licencie.guards';
import { CapitaineGuard } from './guards/capitaine.guards';
import { BureauGuard } from './guards/bureau.guards';
import { JwtInterceptor } from './http-interceptor/jwt.interceptor';
import { ConsultationArticleComponent } from './consultation-article/consultation-article.component';
import { ChangementMdpComponent } from './changement-mdp/changement-mdp.component';
import { EnvoyerMailComponent } from './envoyer-mail/envoyer-mail.component';
import { InscriptionManifestationComponent } from './inscription-manifestation/inscription-manifestation.component';

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
    ListeCategoriesComponent,
    DetailCategorieComponent,
    ConsultationArticleComponent,
    ChangementMdpComponent,
    EnvoyerMailComponent,
    InscriptionManifestationComponent
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
    NgxPayPalModule,
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
    FullCalendarModule,
    CalendarModule
  ],
  providers: [LicencieGuard, CapitaineGuard, BureauGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
