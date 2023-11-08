import { Injectable } from '@angular/core';
import { Lang } from './recipe';
import { Location } from '@angular/common';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


/*               Lang Service                            */
/* Synchronises the language of the website              */
/* between the components.                               */

export class LangService {

  constructor(private Location: Location) { }
  supportedLangs: Array<string> = ['de', 'en', 'fr'];
  langMap = new Map<string, number>([[this.supportedLangs[0], Lang.de], [this.supportedLangs[1], Lang.en], [this.supportedLangs[2], Lang.fr]]);
  private lang_state = new BehaviorSubject<number>(this.LangInit());

  setLang(lang: string) {
    if( this.langMap.get(lang) !== undefined) {
      this.lang_state.next(this.langMap.get(lang) as number)
    }
    else {
      console.log('Unknown language. Defaulting to English.');
      this.lang_state.next(Lang.en);
    }
  }

  getLang(): Observable<number> {
    return this.lang_state.asObservable();
  }

  regexEscape(str: string) {
    return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  }

  URLLang(): number {
    const langs: string = [...new Set(this.supportedLangs.join(''))].join('');      // Join the array, then filter out all duplicates and join the created array to a string
    const result = new RegExp(`\/([${langs}]{2})`, 'i').exec(this.Location.path()); // Retrieve a substring from the url path consisting of two of the supported language's letters
    try {
      return this.langMap.get(result![1]) as number;
    } catch (TypeError) {
      return -1;                                                                      // Otherwise return -1
    }
  }

  LangInit(): number {
    const sys_lang: string = navigator.language;
    const url_lang: number = this.URLLang();
    if (url_lang !== -1){
        return url_lang;
    }
    else if( this.langMap.get(sys_lang) !== undefined) {
      return this.langMap.get(sys_lang) as number;
    }
    return this.langMap.get('en') as number;
  }
}

