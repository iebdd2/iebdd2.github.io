import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RecipeBodyComponent } from './recipe-body/recipe-body.component';
import { MainBarComponent } from './main-bar/main-bar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { IdPipe } from './Pipes/id.pipe';
import { ConfigPipe } from './Pipes/config.pipe';
import { ElementPipe } from './Pipes/element.pipe';
import { TagPipe } from './Pipes/tag.pipe';
import { IconPipe } from './Pipes/icon.pipe';
import { SearchPipe } from './Pipes/search.pipe';



@NgModule({
  declarations: [
    AppComponent,
    RecipeBodyComponent,
    MainBarComponent,
    IdPipe,
    ElementPipe,
    TagPipe,
    ConfigPipe,
    IconPipe,
    SearchPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    LayoutModule,
    BrowserAnimationsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
