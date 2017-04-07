import {Script} from "./script";
export class PadGrid {
  rows: PadRow[];
}

export interface PadRow {
  cells: PadCell[];
  index: number;
}

export interface PadCell {
  script: Script;
  index: number;
}
