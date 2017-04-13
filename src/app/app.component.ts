import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MdToolbar, MdDialog} from "@angular/material";
import {MidiSelectorComponent} from "./midi/midi-selector.component";
import {MIDIService} from "./midi/midi-service";
import {GridsterConfig} from "angular-gridster2/dist/gridsterConfig.interface";
import {ExecuteService} from "./execute.service";
import {PadGrid, PadRow, IPadCell, ScriptPadCell, SCRIPT_STATES} from "./pad-grid/pad-grid";
import {Script} from "./script";
import {ScriptSelectDialog} from "./script/script-select-dialog";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', './main.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  title = 'app works!';
  padGrid: PadGrid = PadGrid.createEmptyLaunchpadGrid(8, 8);

  constructor(private midiService: MIDIService,
              private executeService: ExecuteService,
              public dialog: MdDialog) {
  }

  ngOnInit() {
    console.log('hoi', JSON.parse(localStorage.getItem('grid')));
    localStorage.setItem('grid', JSON.stringify(this.padGrid));
  };

  onCellPressed(cell: ScriptPadCell, e) {
    console.log('cell preseed:', cell, e);
    if (!cell.script) {
      let dialogRef = this.dialog.open(ScriptSelectDialog);
      dialogRef.afterClosed()
        .subscribe(e => {
          cell.script = e;
        });
    } else {
      cell.state = SCRIPT_STATES.SCRIPT_STARTED;
      cell.running = this.executeService.execute(cell.script);
      cell.running
        .do(()=> cell.state = SCRIPT_STATES.SCRIPT_STARTED)
        .catch((e) => {
          cell.state = SCRIPT_STATES.SCRIPT_FAILED;
          return e;
        })
        .map((e)=> this.padGrid.toLaunchPadMIDIOutputMessages()).subscribe(e => {
        this.midiService.$outputMessages.next(e)
      })
    }
  }

  private sendMidiOutput(e) {
    console.log('send output', e)
  }
}
