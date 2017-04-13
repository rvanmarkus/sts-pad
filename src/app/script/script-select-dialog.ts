import {Component, OnInit} from '@angular/core';
import {ExecuteService} from "../execute.service";
import {Observable} from "rxjs";
import {Script} from "../script";
import {MdDialogRef} from "@angular/material";

@Component({
  moduleId: module.id,
  selector: 'script-select-dialog',
  templateUrl: 'script-select-dialog.html'
})
export class ScriptSelectDialog implements OnInit {
  private $availableScripts: Observable<Script[]>;
  selectedScript: Script;
  constructor(private execute: ExecuteService, public dialogRef: MdDialogRef<ScriptSelectDialog>) {
    this.$availableScripts = this.execute.getAllScripts();

    this.$availableScripts.subscribe(e => console.log('aaaa', e));
  }

  ngOnInit() {

  }
}
