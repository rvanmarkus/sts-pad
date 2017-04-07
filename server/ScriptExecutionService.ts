import * as cp from 'child_process';
import {Script} from "./ScriptExecutionController";
import {Service} from "typedi";

@Service()
export class ScriptExecutionService {
  constructor() { }

  runScript(script: Script) {
    cp.exec(`${script.path}`,
      (error, stdout, stderr) => {
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
        if (error !== null) {
          console.log('exec error: ' + error);
        }
      });
  }
}
