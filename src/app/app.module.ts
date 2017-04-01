import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';

import { AppComponent } from './app.component';
import {MidiSelectorComponent} from "./midi/midi-selector.component";
import {MidiSelectorDialog} from "./midi/midi-selector-dialog";

@NgModule({
  declarations: [
    AppComponent,
    MidiSelectorDialog,
    MidiSelectorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule
  ],
  entryComponents: [
    AppComponent,
    MidiSelectorDialog
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
