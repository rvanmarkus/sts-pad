import * as cp from 'child_process';
import {Service} from "typedi";
import {Script} from "../src/app/script";

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
