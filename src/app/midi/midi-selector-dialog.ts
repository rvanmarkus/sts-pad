import {MdDialogRef} from "@angular/material";
import {Component} from "@angular/core";
@Component({
  selector: 'midi-selector-dialog',
  templateUrl: 'midi-selector-dialog.html'
})
export class MidiSelectorDialog {
  constructor(public dialogRef: MdDialogRef<MidiSelectorDialog>) {}
}
