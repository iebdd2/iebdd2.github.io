import { Component, Output, EventEmitter, OnDestroy } from '@angular/core';
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';
import { Names, Lang, Config } from '../recipe';
import { LoadDataService  } from '../Services/load-data.service';
import { SearchService } from '../Services/search.service';
import { LangService } from '../Services/lang.service';
import { Subject, takeUntil } from 'rxjs';
import { BreakpointService } from '../Services/breakpoint.service';
import { MatMenuTrigger } from '@angular/material/menu'


@Component({
  selector: 'app-main-bar',
  templateUrl: './main-bar.component.html',
  styleUrls: ['./main-bar.component.css'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('500ms', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
      transition(':leave', [
        animate('500ms', style({ opacity: 0, transform: 'translateY(10px)' })),
      ]),
    ])    
  ]
})
export class MainBarComponent implements OnDestroy {

constructor(private LoadDataService: LoadDataService, 
            private SearchService: SearchService,
            private LangService: LangService,
            private BreakpointService: BreakpointService) 
            {
              this.lang = Lang.de;
            }

search: string = '';
menu_open: boolean = false;
lang: number;
results: number[] = [];
destroyed = new Subject<void>();
screenSize: number = 0;

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

@Output() recipeEvent = new EventEmitter<number>();
@Output() searchEvent = new EventEmitter<string>();
@Output() mainEvent = new EventEmitter<void>();

recipeView(recipe: number) {
  console.log(this.screenSize);
  (this.screenSize) ? (this.results.length = 0, this.search = '') : null;
  this.recipeEvent.emit(recipe);
}

searchView(search: string) {
  (this.screenSize) ? (this.results.length = 0, this.search = '') : null;
  this.searchEvent.emit(search);
}

mainView() {
  (this.screenSize) ? (this.results.length = 0, this.search = '') : null;
  this.mainEvent.emit();
}

clearSearch() {
  this.results.length = 0;
  this.search = '';
}

expandMenu() {
  this.menu_open = !this.menu_open;
}

getNames(): void {
  this.LoadDataService.getNames()
    .pipe(takeUntil(this.destroyed))
    .subscribe(names => this.names = names);
}

getConfig(): void {
  this.LoadDataService.getConfig()
    .pipe(takeUntil(this.destroyed))
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
    .pipe(takeUntil(this.destroyed))
    .subscribe(lang => {
      this.lang = lang;
      (this.results) ? this.filterSearch(this.search, false) : null;
    });
}

getSize(): void {
  this.BreakpointService.getSize()
  .pipe(takeUntil(this.destroyed))
  .subscribe(screenSize => this.screenSize = screenSize);
}

printRecipe() {
  window.print();
}

ngOnInit(): void {
  this.getNames();
  this.getConfig();
  this.getLang();
  this.getSize();
}

ngOnDestroy() {
  this.destroyed.next();
  this.destroyed.complete();
}

}
