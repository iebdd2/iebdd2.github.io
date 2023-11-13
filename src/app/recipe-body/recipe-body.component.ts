import { Component, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { Router} from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Recipe, Config, Names, State, Lang } from '../recipe';
import { LoadDataService  } from '../Services/load-data.service';
import { SearchService } from '../Services/search.service';
import { LangService } from '../Services/lang.service';
import { ReplacementService } from '../Services/replacement.service';
import { HistoryService } from '../Services/history.service';
import { BreakpointService } from '../Services/breakpoint.service';

@Component({
  selector: 'app-recipe-body',
  templateUrl: './recipe-body.component.html',
  styleUrls: ['./recipe-body.component.css'],
})

export class RecipeBodyComponent implements OnDestroy {
  
  constructor(private LoadDataService: LoadDataService, 
              private SearchService: SearchService,
              private LangService: LangService,
              private ReplacementService: ReplacementService,
              private HistoryService: HistoryService,
              private Router: Router,
              private Location: Location,
              private BreakpointService: BreakpointService)
              { 
                this.lang = Lang.de;
                this.is_handheld = 0;
              }
  
  destroyed = new Subject<void>();
  is_handheld: number;
  lang: number;
  states: Array<boolean> = Array(4).fill(false);
  langMap = new Map<number, string>([[Lang.de,"de"], [Lang.en, "en"], [Lang.fr, "fr"]]);
  results: Array<number> = [];
  history: Array<number> = [];
  route: string = '';
  search: string = '';
  recipe: Recipe = {
    names: [],
    overview: [],
    ingredients: [],
    preparation: []
  };
  config: Config = {
    phrases: [],
    config: [],
    alphabet: [],
    tags: [],
    tag_names: []
  };
  names: Names = {
    name: []
  };

  mobileView(left = 0, right = 0, top = 0, width = 0, max_width = 0): Object {
    if(this.is_handheld) {
    }
    return {};
  }

  searchView(search: string): void {
    console.log(search);
    if(search.length) {
      this.Router.navigate([this.langMap.get(this.lang)], {queryParams: {s: search}});
      this.search = search;
      this.setState(State.search);
      this.filterSearch(search, false);
    }
  }

  mainView(): void {
    this.Router.navigate([this.langMap.get(this.lang), '']);
    this.setState(2);
  }

  setState(state: number): void {
    this.states = this.states.fill(false);
    this.states[state] = true;
  }

  recipeView(recipe: number) {
    this.Router.navigate([this.langMap.get(this.lang)], {queryParams: {r: recipe}});
    this.addRecord(recipe);
    this.setState(State.recipe);
    this.getRecipe(recipe);
  }

  allView() {
    this.setState(State.all);
    this.Router.navigate([this.langMap.get(this.lang), 'all'], );
  }

  isNotEmpty(string: string): boolean {
    if(this.SearchService.filterSearch(string, this.lang, true).length) {
      return true;
    }
    else {
      return false;
    }
  }

  replaceTag(id: number): string {
    return this.ReplacementService.replaceTag(id, this.lang);
  }

  replaceId(id: number): string {
    console.log('replace called');
    return this.ReplacementService.replaceId(id, this.lang);
  }

  replaceElement(element: string) {
    return this.ReplacementService.replaceElement(element, this.lang);
  }

  getConfig(): void {
    this.LoadDataService.getConfig()
      .pipe(takeUntil(this.destroyed))
      .subscribe(config => this.config = config);
  }

  getRecipe(id: number): void {
    this.LoadDataService.getRecipe(id)
      .pipe(takeUntil(this.destroyed))
      .subscribe(recipe => this.recipe = recipe);
  }

  getNames(): void {
    this.LoadDataService.getNames()
      .pipe(takeUntil(this.destroyed))
      .subscribe(names => this.names = names);
  }

  getLang(): void {
    this.LangService.getLang()
    .pipe(takeUntil(this.destroyed))
    .subscribe(lang => {
        this.lang = lang;
        if (this.results.length != 0 && this.search.length != 0) {
          this.filterSearch(this.search, false)
        }
        this.Router.navigate([this.langMap.get(this.lang)], {queryParamsHandling: 'merge'});
      })
  }

  getHistory(): void {
    this.HistoryService.getHistory()
      .pipe(takeUntil(this.destroyed))
      .subscribe(history => this.history = history);
  }

  addRecord(id: number): void {
    this.HistoryService.addRecord(id);
  }

  deleteRecords(): void {
    this.HistoryService.deleteRecords();
  }

  filterSearch(search: string, start: boolean = false): void {
    this.results = this.SearchService.filterSearch(search, this.lang, start);
  }

  getRoute(): void {
    const route: string = this.Location.path();
    const result = new RegExp(/[/?]?([sralSRAL]{1,3})(?:=(\w+|[0-9]{1,3}))?/).exec(route);
    if (result === null) {
      this.defaultRoute();
      return;
    }
    switch(result![1]) {
      case 'r':
        (!isNaN(+result![2])) ? this.recipeView(+result[2]) : this.defaultRoute();
        break;
      case 's':
        (this.SearchService.isLetter(result![2])) ? this.searchView(result[2]) :  this.defaultRoute();
        break;
      case 'all': 
        this.allView();
      break;
      default:
        this.defaultRoute();
        break;
    }
  }

  defaultRoute(): void {
    this.Router.navigate([this.langMap.get(this.lang)]);
    this.setState(State.main);
  }

  getSize(): void {
    this.BreakpointService.getSize()
    .pipe(takeUntil(this.destroyed))
    .subscribe(is_handheld => this.is_handheld = is_handheld);
  }

  ngOnInit(): void {
    this.getHistory();
    this.getConfig();
    this.getLang();
    this.getRoute();
    this.getNames();
    this.getSize()
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }
}