import { Component, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

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

    this.fr = {
      firstDayOfWeek: 1,
      dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
      dayNamesShort: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
      dayNamesMin: ['Di', 'Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa'],
      monthNames: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
      monthNamesShort: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sept', 'Oct', 'Nov', 'Déc'],
      today: 'Jour J',
      clear: 'Désélectionner',
      dateFormat: 'jj/mm/aa'
    };

    this.options = {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      defaultDate: '2018-05-01',
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
