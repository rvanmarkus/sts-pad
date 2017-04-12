import {Script} from "../script";
import {LaunchPadMIDIOutputMessage, GRID_LED_COLORS} from "../midi/midi-service";

export interface PadRow {
  cells: IPadCell[];
  index: number;
}

export interface IPadCell {
  index: number;
  running?: boolean;
  script: Script;
}

export class ScriptPadCell implements IPadCell {
  running?: boolean = false;

  constructor(public index: number, public script: Script) {
  }
}

export class PadGrid {
  numberOfRows: number = 8;
  numberOfCols: number = 8;

  constructor(public rows: PadRow[] = []) {

  }

  createEmptyLaunchpadGrid() {
    for (let i = 0; i < this.numberOfRows; i++) {
      this.rows.push(<PadRow>{
        index: i,
        cells: Array.from(new Array(this.numberOfCols).keys())
          .map((cell, i) => new ScriptPadCell(i, {
            name: '-',
            path: 'step1.sh'
          }))
      })
    }
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
