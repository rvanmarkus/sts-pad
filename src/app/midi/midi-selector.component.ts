import {Component, OnInit} from '@angular/core';
import {MidiSelectorDialog} from "./midi-selector-dialog";
import {MdDialog} from "@angular/material";
import {MIDIService, LaunchPadMIDIOutputMessage} from "./midi-service";
import MIDIInput = WebMidi.MIDIInput;

@Component({
  selector: 'midi-selector',
  templateUrl: 'midi-selector.component.html',
  viewProviders:[MidiSelectorDialog]
})
export class MidiSelectorComponent implements OnInit {
  private selectedOption: string;
  private selectedInput: MIDIInput;
  constructor(public dialog: MdDialog, public midi: MIDIService) {

  }

  ngOnInit() {
  }
  openDialog() {
    let dialogRef = this.dialog.open(MidiSelectorDialog);

    dialogRef.afterClosed().subscribe(result => {
      this.selectedInput = result;
      this.midi.setCurrentMIDIInput(result.input);
      this.midi.setCurrentMIDIOutput(result.output);
      let test = new LaunchPadMIDIOutputMessage();
      test.setColumn(1);
      test.setRow(1);
      this.midi.$outputMessages.next([test])
    });
  }
}
