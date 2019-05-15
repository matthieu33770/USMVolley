import { Component, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import frLocale from '@fullcalendar/core/locales/fr';

import { EventService } from '../services/event.service';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit {

  events: any[];
  options: any;
  header: any;

  constructor(private eventService: EventService) { }

  ngOnInit() {

    this.eventService.getEvents().then(events => {this.events = events; });

    this.options = {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      defaultDate: new Date(),
      locale: frLocale,
      header: {
        left: 'prev, next',
        center: 'title',
        right: 'month, agendaWeek, agendaDay'
      },
      editable: true
    };
  }
}
