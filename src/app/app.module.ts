import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RecipeBodyComponent } from './recipe-body/recipe-body.component';
import { MainBarComponent } from './main-bar/main-bar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { IdPipe } from './Pipes/id.pipe';
import { ElementPipe } from './Pipes/element.pipe';
import { TagPipe } from './Pipes/tag.pipe';
import { MatMenuModule } from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [
    AppComponent,
    RecipeBodyComponent,
    MainBarComponent,
    IdPipe,
    ElementPipe,
    TagPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    LayoutModule,
    MatButtonModule,
    MatMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
