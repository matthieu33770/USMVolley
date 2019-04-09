import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView
} from 'angular-calendar';
import { MyEvent } from './interfaceCalendarEvent';
import { BehaviorSubject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import { Manifestation } from '../Model/Manifestation';
import { Equipe } from '../Model/Equipe';
import { Lieu } from '../Model/Lieu';
import { Statut } from '../Model/Statut';

import { ManifestationService } from '../Services/manifestation.service';
import { LoginService } from '../Services/login.service';
import { EquipesService } from '../Services/equipes.service';
import { LieuxService } from '../Services/lieux.service';
import { StatutService } from '../Services/statut.service';

@Component({
  selector: 'app-calendrier',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendrier.component.html',
  styleUrls: ['./calendrier.component.css']
})
export class CalendrierComponent implements OnInit {

  @ViewChild('modalContent') modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  locale: String = 'fr';

  isLicencie: boolean;
  isCapitaine: boolean;
  isBureau: boolean;

  idManifestation: number;
  manifestations: Manifestation [];
  manifestationList: BehaviorSubject<Manifestation[]>;
  editionManifestation: Manifestation = new Manifestation(0, '', '' , null, null, null, null, null, new Date());
  equipeList: Equipe [];
  lieuList: Lieu [];
  statutList: Statut [];
  teams: any = [];

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  // Affichage de la manifestation pour s'inscrire
  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
        this.handleEvent('Deleted', event);
      }
    }
  ];

  refresh: Subject<any> = new Subject();

  events: MyEvent[] = this.manifestations;

  activeDayIsOpen: Boolean = false;

  constructor(private modal: NgbModal, private loginService: LoginService, private route: ActivatedRoute,
    private manifestationService: ManifestationService, private equipeService: EquipesService,
    private lieuxService: LieuxService, private statutService: StatutService) {}

  // Développe le jour cliqué
  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      this.viewDate = date;
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
    }
  }

  // Modification d'un évènement ?
  eventTimesChanged({
    event,
    newStart,
    newEquipe,
    newLieu,
    newStatut,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map(iEvent => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          equipe: newEquipe,
          lieu: newLieu,
          statut: newStatut,
          end: newEnd
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  // Ajout d'un évènement
  addEvent(): void {
    this.events = [
      ...this.events, //push
      {
        title: '',
        equipe: null,
        start: null,  //startOfDay(new Date()),
        lieu: null,
        statut: null,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true
        }
      }
    ];
  }

  // Suppression d'un évènement
  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter(event => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  ngOnInit() {
    console.log(this.manifestations);
    this.loginService.userRole.subscribe(userRole => {
      this.isLicencie = userRole.includes('ROLE_LICENCIE');
      this.isCapitaine = userRole.includes('ROLE_CAPITAINE');
      this.isBureau = userRole.includes('ROLE_BUREAU');
    });
    this.manifestationList = this.manifestationService.availableManifestation$;
    console.log(this.manifestationList);
    this.getManifestation();
    console.log(this.manifestations);
    this.getEquipe();
    this.getLieu();
    this.getStatut();
  }

  getManifestation(): void {
    this.manifestationService.getManifestations().subscribe(Manifestations => {
      this.manifestations = [];
      Manifestations.forEach(manif => {
        this.manifestations.push(manif);
        // this.events.push(manif);
      });
      console.log(this.manifestations);
    });
  }

  getEquipe(): void {
    this.equipeService.getEquipes().subscribe(Equipes => this.equipeList = Equipes);
  }
  getLieu(): void {
    this.lieuxService.getLieux().subscribe(Lieux => this.lieuList = Lieux);
  }
  getStatut(): void {
    this.statutService.getStatuts().subscribe(Statuts => this.statutList = Statuts);
  }
}
