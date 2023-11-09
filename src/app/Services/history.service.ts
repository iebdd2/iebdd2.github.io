import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})



/*               History Service                         */
/* Maintains the history of accessed recipes             */
/* and adds deletes and saves them per session           */


export class HistoryService{

  constructor() { }

  history: Array<number> = [];
  loaded_history: Array<number> = [];

  saveRecord() {
    localStorage.setItem('history', JSON.stringify(this.history));
  }

  deleteRecords(): void {
    this.history.length = 0;
    localStorage.removeItem('history');
  }

  addRecord(id: number): void {
    (!this.history.includes(id)) ? this.history.push(id) : null;
  }
  
  getHistory(): Observable<Array<number>> {
    if(this.history.length) {
      (!localStorage.getItem('histoy')) ? this.history = JSON.parse(localStorage.getItem('history') as string) as Array<number> : null;
    }
    return of(this.history);
  }
}
