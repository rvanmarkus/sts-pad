import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';

import { AppComponent } from './app.component';
import {MidiSelectorComponent} from "./midi/midi-selector.component";
import {MidiSelectorDialog} from "./midi/midi-selector-dialog";
import {MIDIService} from "./midi/midi-service";
import {GridsterModule} from "angular-gridster2";
import { HttpModule, JsonpModule } from '@angular/http';
import {ExecuteService} from "./execute.service";
import {FlexLayoutModule} from "@angular/flex-layout";

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
    JsonpModule,
    MaterialModule,
    GridsterModule,
    FlexLayoutModule
  ],
  entryComponents: [
    AppComponent,
    MidiSelectorDialog
  ],
  providers: [
    MIDIService,
    ExecuteService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
