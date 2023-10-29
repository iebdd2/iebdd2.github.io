import { Injectable } from '@angular/core';
import { LoadDataService } from './load-data.service';
import { Names } from './recipe';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private LoadDataService: LoadDataService) { }

  names: Names = {
    name: []
  };

  regexEscape(str: string) {
    return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  }

  filterSearch(search: string, lang: number, start: boolean): Array<number> {
    (this.names.name) ? this.getNames() : null;
    let results: Array<number> = [];
    let start_str: string = '';
    (start) ? start_str = '^' : null;
    if (search.length) {
      let bound: number = this.names.name[lang].length;
      const regexp = new RegExp(start_str + this.regexEscape(search), 'i');
      for(var index = 0 ; index < bound ; index++) {    
        if (regexp.test(this.names.name[lang][index])){
          (results.includes(index)) ? null : results.push(index);
        } 
      }
    }
    return results;
  }

  getNames(): void {
    this.LoadDataService.getNames()
      .subscribe(names => this.names = names);
  }
}
