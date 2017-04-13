import {Script} from "../script";
import {LaunchPadMIDIOutputMessage, GRID_LED_COLORS} from "../midi/midi-service";
import {Observable} from "rxjs";

export interface PadRow {
  cells: IPadCell[];
  index: number;
}

export interface IPadCell {
  index: number;
  running?: Observable<any>;
  script?: Script;
  onCellPressed(e : Event);
}

export class ScriptPadCell implements IPadCell {
  running?: Observable<any>;
  constructor(public index: number, public script?: Script) {
  }
  onCellPressed(e){
    console.log('cell pressed', e);
  }
}

export class PadGrid {
  constructor(public rows: PadRow[] = []) {

  }

  static createEmptyLaunchpadGrid(numberOfRows, numberOfCols) {
    let rows: PadRow[] = [];
    for (let i = 0; i < numberOfRows; i++) {
      rows.push(<PadRow>{
        index: i,
        cells: Array.from(new Array(numberOfCols).keys())
          .map((cell, i) => new ScriptPadCell(i))
      })
    }
    return new PadGrid(rows);
  }

  addRow(row: PadRow){
    this.rows.push(row);
  }

  toLaunchPadMIDIOutputMessages(): LaunchPadMIDIOutputMessage[] {
    let outputMessages = [];
    this.rows.forEach(row => {
      outputMessages.concat(... row.cells.map(cell => this.transformCellToLaunchPadOutputMessage(cell, row)))
    });
    return outputMessages;
  }

  private transformCellToLaunchPadOutputMessage(cell: ScriptPadCell, row: PadRow): LaunchPadMIDIOutputMessage {
    let midi = new LaunchPadMIDIOutputMessage();
    midi.setRow(row.index);
    midi.setColumn(cell.index);
    if (cell.running) {
      midi.setColor(GRID_LED_COLORS.RED)
    }
    return midi;
  }

}
