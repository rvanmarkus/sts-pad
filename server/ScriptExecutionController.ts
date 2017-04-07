import {JsonController, Param, Body, Get, Post, Put, Delete} from "routing-controllers";
import {ScriptExecutionService} from "./ScriptExecutionService";
import {Service} from "typedi";
import {Script} from "../src/app/script";

export interface ConfigInterface {
  scripts: Script[];
}

@Service()
@JsonController()
export class ScriptExecutionController {
  config: ConfigInterface;
  private executeService: ScriptExecutionService;

  constructor(executeService: ScriptExecutionService){
    this.config = require('../config/scripts.json');
    this.executeService = executeService;
  }

  @Get("/scripts")
  getAllScripts() {
    return this.config.scripts;
  }

  @Post("/execute")
  executeScript(@Body() script: Script) {
    let scriptFromConfig = this.getScriptFromConfigByName(script.name);
    if(! scriptFromConfig) {
      return {error: `Script with name ${script.name} not found in config.json`, execution: false};
    }
    this.executeService.runScript(scriptFromConfig);
    return {execution: true}
  }

  @Get("/scripts/:name")
  get(@Param('name') name: string) {
    return this.getScriptFromConfigByName(name)
  }

  private getScriptFromConfigByName(name: string): Script | null {
    let scriptsFromConfig = this.config.scripts.filter(s => s.name === name);
    if(scriptsFromConfig.length && scriptsFromConfig.length > 0) {
      return scriptsFromConfig[0];
    }
    return null
  }
}
