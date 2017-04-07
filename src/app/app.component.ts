import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MdToolbar} from "@angular/material";
import {MidiSelectorComponent} from "./midi/midi-selector.component";
import {MIDIService} from "./midi/midi-service";
import {GridsterConfig} from "angular-gridster2/dist/gridsterConfig.interface";
import {ExecuteService} from "./execute.service";
import {PadGrid, PadRow, PadCell} from "./pad-grid";
import {Script} from "./script";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css','./main.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit{
  title = 'app works!';
  padGrid: PadGrid = {
    rows: [
      <PadRow> {
        cells: [
          <PadCell> {
            script: <Script> {
              name: 'step1',
              path: 'step1.sh'
            },
            index:0
          }
        ],
        index: 0
      }
    ]
  };
  constructor(midiService: MIDIService,
              execute: ExecuteService) {
    console.log('service', midiService);
  }

  ngOnInit() {

  };
}
