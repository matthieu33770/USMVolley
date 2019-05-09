import { Component, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import frLocale from '@fullcalendar/core/locales/fr';

import { EventService } from '../Services/event.service';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit {

  events: any[];
  options: any;
  header: any;
  fr: any;

  // locale: String = 'fr';

  minDate: Date;
  maxDate: Date;
  invalidDates: Array<Date>;

  constructor(private eventService: EventService) { }

  ngOnInit() {

    this.options = {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      defaultDate: '2018-05-01',
      locale: frLocale,
      header: {
        left: 'prev, next',
        center: 'title',
        right: 'month, agendaWeek, agendaDay'
      },
      editable: true
    };

    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();
    const prevMonth = (month === 0) ? 11 : month - 1;
    const prevYear = (prevMonth === 11) ? year : year;
    const nextMonth = (month === 11) ? 0 : month + 1;
    const nextYear = (nextMonth === 0) ? year + 1 : year;
    this.minDate = new Date();
    this.minDate.getDay();
    this.minDate.setMonth(prevMonth);
    this.minDate.setFullYear(prevYear);
    this.maxDate = new Date();
    this.maxDate.setMonth(nextMonth);
    this.maxDate.setFullYear(nextYear);

    const invalidDate = new Date();
    invalidDate.setDate(today.getDay() - 1);

    this.invalidDates = [];
    let deb = 3;
    const fin = 20;

    for (; deb < fin; deb ++) {
      const autreDate = new Date();
      autreDate.setDate(deb);
      this.invalidDates.push(autreDate);
    }

    // this.eventService.getEvents().then(events => {this.events = events;});

    // this.options = {
    //   plugins:[ dayGridPlugin, timeGridPlugin, interactionPlugin ],
    //   defaultDate: '2017-02-01',
    //   header: {
    //     left: 'prev,next',
    //     center: 'title',
    //     right: 'dayGridMonth,timeGridWeek,timeGridDay'
    //   },
    //   editable: true
    //   };
    // }

  }
}
