import {Component, OnInit} from '@angular/core';
import {MidiSelectorDialog} from "./midi-selector-dialog";
import {MdDialog} from "@angular/material";

@Component({
  selector: 'midi-selector',
  templateUrl: 'midi-selector.component.html',
  viewProviders:[MidiSelectorDialog]
})
export class MidiSelectorComponent implements OnInit {
  private selectedOption: string;
  constructor(public dialog: MdDialog) {}

  ngOnInit() {
  }
  openDialog() {
    let dialogRef = this.dialog.open(MidiSelectorDialog);
    dialogRef.afterClosed().subscribe(result => {
      this.selectedOption = result;
    });
  }
}
