import {Component, OnInit} from '@angular/core';
import {MdToolbar} from "@angular/material";
import {MidiSelectorComponent} from "./midi/midi-selector.component";
import {MIDIService} from "./midi/midi-service";
import {GridsterConfig} from "angular-gridster2/dist/gridsterConfig.interface";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app works!';
  options: GridsterConfig;
  dashboard: Array<Object>;

  constructor(midiService: MIDIService){
    console.log('service', midiService);
  }
  static eventStop(item, scope) {
    console.info('eventStop', item, scope);
  }

  static itemChange(item, scope) {
    console.info('itemChanged', item, scope);
  }

  static itemResize(item, scope) {
    console.info('itemResized', item, scope);
  }

  static itemInit(item) {
    console.info('itemInitialized', item);
  }

  ngOnInit() {
    this.options = {
      gridType: 'fit',
      compactUp: false,
      compactLeft: false,
      itemChangeCallback: AppComponent.itemChange,
      itemResizeCallback: AppComponent.itemResize,
      margin: 10,
      outerMargin: true,
      maxItemCols: 50,
      minItemCols: 1,
      maxItemRows: 50,
      minItemRows: 1,
      defaultItemCols: 1,
      defaultItemRows: 1,
      fixedColWidth: 250,
      fixedRowHeight: 250,
      draggable: {
        enabled: true,
        stop: AppComponent.eventStop
      },
      resizable: {
        enabled: true,
        stop: AppComponent.eventStop
      },
      swap: false
    };
    this.dashboard = [
      {cols: 2, rows: 1, y: 0, x: 0},
      {cols: 2, rows: 2, y: 0, x: 2},
      {cols: 1, rows: 1, y: 0, x: 4},
      {cols: 1, rows: 1, y: 0, x: 5},
      {cols: undefined, rows: undefined, y: 1, x: 0},
      {cols: 1, rows: 1, y: undefined, x: undefined},
      {cols: 2, rows: 2, y: 1, x: 5, minItemRows: 2, minItemCols: 2, label: 'Min rows & cols = 2'},
      {cols: 2, rows: 2, y: 2, x: 0, maxItemRows: 2, maxItemCols: 2, label: 'Max rows & cols = 2'},
      {cols: 2, rows: 1, y: 2, x: 2, dragEnabled: true, resizeEnabled: true, label: 'Drag&Resize Enabled'},
      {cols: 1, rows: 1, y: 2, x: 4, dragEnabled: false, resizeEnabled: false, label: 'Drag&Resize Disabled'},
      {cols: 1, rows: 1, y: 0, x: 6, initCallback: AppComponent.itemInit}
    ];
  }
  changedOptions() {
    this.options.optionsChanged();
  }

  removeItem(item) {
    this.dashboard.splice(this.dashboard.indexOf(item), 1);
  };

  addItem() {
    this.dashboard.push({});
  };
}
