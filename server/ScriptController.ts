import {JsonController, Param, Body, Get, Post, Put, Delete} from "routing-controllers";
import {ScriptExecutionService} from "./ScriptExecutionService";
import {Service} from "typedi";
import {Script} from "../src/app/script";



@Service()
@JsonController()
export class ScriptExecutionController {
  private executeService: ScriptExecutionService;

  constructor(executeService: ScriptExecutionService){
    this.executeService = executeService;
  }

  @Get("/scripts")
  getAllScripts() {
    return this.executeService.getAllScripts();
  }

  @Get("/scripts/:name")
  get(@Param('name') name: string) {
    return this.executeService.getScriptFromConfigByName(name)
  }
}
