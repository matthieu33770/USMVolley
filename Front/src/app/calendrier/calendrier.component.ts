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

import {LoginService} from '../Services/login.service';

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

  // Liste des évènements
//   interface MyEvent extends CalendarEvent {
//     team: string;
//   }

//   events: MyEvent[] = [{
//     title: 'title',
//     start: new Date(),
//     team: 'bar',
//     actions : this.actions
//   },
// ];
  events: MyEvent[] = [
    {
      start: startOfDay(new Date()),
      title: 'Match',
      team: 'Loisir 1',
      actions: this.actions
    },
  ];

  activeDayIsOpen: Boolean = false;

  constructor(private modal: NgbModal, private loginService: LoginService) {}

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
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map(iEvent => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
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
      ...this.events,
      {
        title: 'Match',
        team: 'Loisir 2',
        start: startOfDay(new Date()),
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
    this.loginService.userRole.subscribe(userRole => {
      this.isLicencie = userRole.includes('ROLE_LICENCIE');
      this.isCapitaine = userRole.includes('ROLE_CAPITAINE');
      this.isBureau = userRole.includes('ROLE_BUREAU');
    });
  }
}
