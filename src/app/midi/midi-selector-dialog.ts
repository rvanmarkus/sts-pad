import {MdDialogRef} from "@angular/material";
import {Component} from "@angular/core";
import {MIDIService} from "./midi-service";
import MIDIInput = WebMidi.MIDIInput;
import MIDIInputMap = WebMidi.MIDIInputMap;
import MIDIAccess = WebMidi.MIDIAccess;
import {Observable} from "rxjs";
import MIDIOutput = WebMidi.MIDIOutput;
import MIDIOutputMap = WebMidi.MIDIOutputMap;
@Component({
  selector: 'midi-selector-dialog',
  templateUrl: 'midi-selector-dialog.html'
})
export class MidiSelectorDialog {
  $inputs: Observable<MIDIInput[] >;
  private $outputs: Observable<MIDIOutput[]>;
  selectedInput:MIDIInput;
  selectedOutput:MIDIOutput;

  constructor(public dialogRef: MdDialogRef<MidiSelectorDialog>, midiService: MIDIService) {
    this.$inputs = midiService.$connectedInputs
      .map((inputMap : MIDIInputMap) => Array.from(inputMap.values()));

    this.$outputs = midiService.$connectedOutputs
      .map((outputMap : MIDIOutputMap) => Array.from(outputMap.values()));

    this.$inputs.subscribe((e) => {
      console.log('eeee',e);
    });
      console.log('inputsss243', this.$inputs);
  }
}
