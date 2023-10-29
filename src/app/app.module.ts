import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RecipeBodyComponent } from './recipe-body/recipe-body.component';
import { MainBarComponent } from './main-bar/main-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    RecipeBodyComponent,
    MainBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
