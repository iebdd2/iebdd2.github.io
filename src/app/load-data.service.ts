import { Injectable } from '@angular/core';
import data from './Data/recipe.json';
import { Recipe, Config, Names } from './recipe';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadDataService {
  constructor(
    ) { }
  json_data = JSON.parse(JSON.stringify(data));
  
  getRecipe(id: number): Observable<Recipe> {
    let recipe_name: string = this.json_data['names'][1][id];
    const recipe = of(this.json_data['Recipes'][recipe_name]);
    return recipe;
  }

  getConfig(): Observable<Config> {
    let config: Config = {
      phrases: this.json_data['phrases'],
      config: this.json_data['config'],
      tags: this.json_data['tags'],
      tag_names: this.json_data['tag_names'],
      alphabet: this.json_data['alphabet']
    }
    return of(config);
  }

  getNames(): Observable<Names> {
    let names: Names = {
      name: this.json_data['names']
    }
    return of(names);
  }
}
