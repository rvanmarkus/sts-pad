import {Injectable} from '@angular/core';
import {Subject, Observable, BehaviorSubject} from "rxjs";
import MIDIInput = WebMidi.MIDIInput;
import MIDIInputMap = WebMidi.MIDIInputMap;
import MIDIPortConnectionState = WebMidi.MIDIPortConnectionState;
import MIDIAccess = WebMidi.MIDIAccess;
import MIDIConnectionEvent = WebMidi.MIDIConnectionEvent;
import MIDIMessageEvent = WebMidi.MIDIMessageEvent;
import MIDIOutput = WebMidi.MIDIOutput;
import MIDIOutputMap = WebMidi.MIDIOutputMap;
export interface MidiOutputMessage {
  key: number;
  note:number;
  velocity:number;
  getKeyMessage() : number[];
}

export enum GRID_LED_COLORS { RED = 15, GREEN = 60, YELLOW = 62}
enum GRID_LED_COLORS_FLASHING { RED = 11, GREEN = 56, YELLOW = 58}

@Injectable()
export class MIDIService {
  _navigator: any = window.navigator;
  $connectionState: Subject<"pending"|"connected"|"closed"> = new Subject();
  $connectedOutputs: Subject<MIDIOutputMap> = new BehaviorSubject(null);
  $connectedInputs: Subject<MIDIInputMap> = new BehaviorSubject(null);
  $inputMessages: Subject<any>= new Subject();
  $outputMessages: Subject<LaunchPadMIDIOutputMessage[]> = new Subject();
  constructor() {
    let $midiAccess = this.requestMIDIAccess()
      .subscribe((access) => {
        this.$connectedInputs.next(access.inputs);
        this.$connectedOutputs.next(access.outputs);
        // access.onstatechange = (event: MIDIConnectionEvent) => this.onDeviceChange(event);
    });

    this.$inputMessages.subscribe((e) => {
      console.log('inputttasdfadfasd', e);
    })
  }

  requestMIDIAccess(): Observable<MIDIAccess>{
    return Observable.fromPromise(this._navigator.requestMIDIAccess({}))
      .retry(3);
  }

  setCurrentMIDIInput(input: MIDIInput) {
    if(!!input && input.state == "connected"){
      input.onmidimessage = (e) => this.$inputMessages.next(e);
    }
  }
  setCurrentMIDIOutput(output: MIDIOutput) {
    this.$outputMessages.subscribe((msgs: LaunchPadMIDIOutputMessage[]) => {
      output.send([176, 0, 0]);
      msgs.map((key) => output.send(key.getKeyMessage()));
    });
  }
}
export class LaunchPadMIDIOutputMessage implements MidiOutputMessage {
  key: number = 144;

  _color: GRID_LED_COLORS = GRID_LED_COLORS.GREEN;
  _column: number;
  _row: number;

  private _flashingColor;
  id;

  get note() {
    return ((16 * this._row) + this._column);
  }

  get velocity() {
    return this._color;
  }

  getKeyMessage() {
    return [this.key, this.note, this.velocity];
  }

  setColor(color: GRID_LED_COLORS) {
    this._color = color;
  }

  setColumn(column: number): void {
    this._column = column;
  }

  setRow(row: number): void {
    this._row = row;
  }
}
