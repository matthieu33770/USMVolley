import {
    CalendarEvent
  } from 'angular-calendar';
import { Equipe } from '../Model/Equipe';
import { Lieu } from '../Model/Lieu';
import { Statut } from '../Model/Statut';

export interface MyEvent extends CalendarEvent {
    // libelleManifestation: String;
    equipe: Equipe;
    lieu: Lieu;
    statut: Statut;
}
