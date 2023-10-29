import { Component } from '@angular/core';
import { Recipe, Config, Names, State, Lang } from '../recipe';
import { LoadDataService  } from '../load-data.service';
import { SearchService } from '../search.service';
import { LangService } from '../lang.service';
import { ReplacementService } from '../replacement.service';
import { HistoryService } from '../history.service';

@Component({
  selector: 'app-recipe-body',
  templateUrl: './recipe-body.component.html',
  styleUrls: ['./recipe-body.component.css'],
})

export class RecipeBodyComponent {
  
  constructor(private LoadDataService: LoadDataService, 
              private SearchService: SearchService,
              private LangService: LangService,
              private ReplacementService: ReplacementService,
              private HistoryService: HistoryService)
              { 
                this.lang = Lang.de;
              }

  lang: number;
  states: Array<boolean> = Array(4).fill(false);
  results: Array<number> = [];
  history: Array<number> = [];
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

  searchView(search: string): void {
    if(search.length) {
      this.search = search;
      this.setState(State.search);
      this.filterSearch(search, false);
    }
  }

  mainView(): void {
    this.setState(2);
  }

  setState(state: number): void {
    this.states = this.states.fill(false);
    this.states[state] = true;
  }

  changeRecipe(recipe: number) {
    this.addRecord(recipe);
    this.setState(State.recipe);
    this.getRecipe(recipe);
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
    return this.ReplacementService.replaceId(id, this.lang);
  }

  replaceElement(element: string) {
    return this.ReplacementService.replaceElement(element, this.lang);
  }

  getConfig(): void {
    this.LoadDataService.getConfig()
      .subscribe(config => this.config = config);
  }

  getRecipe(id: number): void {
    this.LoadDataService.getRecipe(id)
      .subscribe(recipe => this.recipe = recipe);
  }

  getNames(): void {
    this.LoadDataService.getNames()
      .subscribe(names => this.names = names);
  }

  getLang(): void {
    this.LangService.getLang().subscribe(lang => {
        this.lang = lang;
        if (this.results.length != 0 && this.search.length != 0) {
          this.filterSearch(this.search, false)
        }
      })
  }

  getHistory(): void {
    this.HistoryService.getHistory()
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

  ngOnInit(): void {
    this.getConfig();
    this.setState(2);
    this.getNames();
    this.getLang();
    this.getHistory();
  }
}