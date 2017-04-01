import { Component } from '@angular/core';
import {MdToolbar} from "@angular/material";
import {MidiSelectorComponent} from "./midi/midi-selector.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
}
