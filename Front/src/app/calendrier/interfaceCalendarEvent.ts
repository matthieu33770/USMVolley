import {
    CalendarEvent
  } from 'angular-calendar';

export interface MyEvent extends CalendarEvent {
    team: string;
}
