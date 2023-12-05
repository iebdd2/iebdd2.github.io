import { Injectable } from '@angular/core';
import { LoadDataService } from './load-data.service';
import { Names } from '../recipe';

@Injectable({
  providedIn: 'root'
})


/*               Search Service                          */
/* Find and replace strings with corresponding           */
/* IDs or vice versa                                     */

export class SearchService {

  constructor(private LoadDataService: LoadDataService) { }

  names: Names = {
    name: []
  };

  regexEscape(str: string) {
    return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  }

  filterSearch(search: string, lang: number, start: boolean, search_list: string[] = []): Array<number> {
    (this.names.name) ? this.getNames() : null;
    let results: Array<number> = [];
    let start_str: string = '';
    let bound: number;
    let test_arr: string[];
    (start) ? start_str = '^' : null;
    if (search) {
      if(search_list.length) {
        bound = search_list.length;
        test_arr = search_list;
      }
      else {
        bound = this.names.name[lang].length;
        test_arr = this.names.name[lang];
      }
      const regexp = new RegExp(start_str + this.regexEscape(search), 'i');
      for(var index = 0 ; index < bound ; index++) {    
        if (regexp.test(test_arr[index])){
          (results.includes(index)) ? null : results.push(index);
        } 
      }
    }
    return results;
  }

  isLetter(string: string): boolean {
    return new RegExp(/\p{L}+/v).test(this.regexEscape(string));
  }

  getNames(): void {
    this.LoadDataService.getNames()
      .subscribe(names => this.names = names);
  }
}
