import {Post, Body, Controller} from "routing-controllers";
import {Script} from "../src/app/script";
import {ScriptExecutionService} from "./ScriptExecutionService";

@Controller()
export class ExecuteController {
  constructor(public executeService: ScriptExecutionService) {
  }

  @Post("/execute")
  executeScript(@Body() script: Script) {
    let scriptFromConfig = this.executeService.getScriptFromConfigByName(script.name);
    if(! scriptFromConfig) {
      return {error: `Script with name ${script.name} not found in config.json`, execution: false};
    }
    this.executeService.runScript(scriptFromConfig);
    return {execution: true}
  }
}
