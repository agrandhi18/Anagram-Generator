import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { InputTextboxComponent } from './input-textbox/input-textbox.component';
import { DisplayGridComponent } from './display-grid/display-grid.component';
import { AnagramDataService } from './shared/anagramData.service';

@NgModule({
  declarations: [
    AppComponent,
    InputTextboxComponent,
    DisplayGridComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [AnagramDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
