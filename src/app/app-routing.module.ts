import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeBodyComponent } from './recipe-body/recipe-body.component';
import { State } from './recipe';

const routes: Routes = [
  { path: '', component: RecipeBodyComponent},
  { path: '**', component: RecipeBodyComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
