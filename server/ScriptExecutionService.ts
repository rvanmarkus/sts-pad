import * as cp from 'child_process';
import {Service} from "typedi";
import {Script} from "../src/app/script";
export interface ConfigInterface {
  scripts: Script[];
}
@Service()
export class ScriptExecutionService {
  config: ConfigInterface;
  constructor() {
    this.config = require('../config/scripts.json');
  }

  runScript(script: Script) {
    return cp.exec(`${script.path}`,
      (error, stdout, stderr) => {
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
        if (error !== null) {
          console.log('exec error: ' + error);
        }
      });
  }

  getScriptFromConfigByName(name: string): Script | null {
    let scriptsFromConfig = this.config.scripts.filter(s => s.name === name);
    if(scriptsFromConfig.length && scriptsFromConfig.length > 0) {
      return scriptsFromConfig[0];
    }
    return null
  }

  getAllScripts() : Script[]{
    return this.config.scripts;
  }
}
