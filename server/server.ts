import "es6-shim"; // this shim is optional if you are using old version of node
import "reflect-metadata"; // this shim is required
import {createExpressServer, useContainer} from "routing-controllers";
import {Container} from "typedi";
useContainer(Container);

import "./ExecuteController";  // we need to "load" our controller before call createServer. this is required
import "./ScriptController";  // we need to "load" our controller before call createServer. this is required
let app = createExpressServer(); // creates express app, registers all controller routes and returns you express app instance
app.listen(3000); // run express application

console.log('Shell script API started');
