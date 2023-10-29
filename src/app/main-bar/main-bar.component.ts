import { Component, Output, EventEmitter } from '@angular/core';
import { Names, Lang, Config } from '../recipe';
import { LoadDataService  } from '../load-data.service';
import { SearchService } from '../search.service';
import { LangService } from '../lang.service';
import { ReplacementService } from '../replacement.service';



@Component({
  selector: 'app-main-bar',
  templateUrl: './main-bar.component.html',
  styleUrls: ['./main-bar.component.css']
})
export class MainBarComponent {

constructor(private LoadDataService: LoadDataService, 
            private SearchService: SearchService,
            private LangService: LangService,
            private ReplacementService: ReplacementService) 
            {
              this.lang = Lang.de;
            }

title = 'Recipe Book';
search: string = '';
lang: number;
results: number[] = [];

names: Names = {
  name: []
};
config: Config = {
  phrases: [],
  config: [],
  alphabet: [],
  tags: [],
  tag_names: []
};

@Output() changeRecipe = new EventEmitter<any>;
@Output() searchView = new EventEmitter<any>;
@Output() mainView = new EventEmitter<any>;

clearSearch() {
  this.results.length = 0;
  this.search = '';
}

replaceId(id: number): string {
  return this.ReplacementService.replaceId(id, this.lang);
}

getNames(): void {
  this.LoadDataService.getNames()
    .subscribe(names => this.names = names);
}

getConfig(): void {
  this.LoadDataService.getConfig()
    .subscribe(config => this.config = config);
}

filterSearch(search: string, start: boolean = false): void {
  this.results = this.SearchService.filterSearch(search, this.lang, start);
}

setLang(lang: string): void {
  this.LangService.setLang(lang);
}

getLang(): void {
  this.LangService.getLang()
    .subscribe(lang => {
      this.lang = lang;
      (this.results) ? this.filterSearch(this.search, false) : null;
    });
}

ngOnInit(): void {
  this.getNames();
  this.getConfig();
  this.getLang();
}

}
