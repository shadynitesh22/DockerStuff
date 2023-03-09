"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const project_controller_1 = require("./project.controller");
const express = require('express');
const route = express.Router();
const projectctrl = new project_controller_1.ProjectController();
route.post('/addproject', projectctrl.addProject);
route.get('/getprojects', projectctrl.getProjects);
route.get('/getproject/:id', projectctrl.getProject);
route.delete('/deleteproject/:id', projectctrl.deleteProject);
route.put('/editproject/:id', projectctrl.editproject);
route.get('/clientprojects/:id', projectctrl.projectforClient);
module.exports = route;
//# sourceMappingURL=index.js.map