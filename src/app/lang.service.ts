import { Injectable } from '@angular/core';
import { Lang } from './recipe';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LangService {

  constructor() { }
  private lang_state = new BehaviorSubject<number>(Lang.de);

  setLang(lang: string) {
    const langMap = new Map<string, number>([["de", Lang.de], ["en", Lang.en], ["fr", Lang.fr]]);
    if( langMap.get(lang) !== undefined) {
      this.lang_state.next(langMap.get(lang) as number)
    }
    else {
      alert('Unknown language. Defaulting to English.');
      this.lang_state.next(Lang.en);
    }
  }

  getLang(): Observable<number> {
    return this.lang_state.asObservable();
  }
}
