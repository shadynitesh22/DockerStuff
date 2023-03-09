import { ProjectController } from "./project.controller";

const express = require('express');
const route = express.Router();
const projectctrl = new ProjectController();

route.post('/addproject', projectctrl.addProject)
route.get('/getprojects', projectctrl.getProjects)
route.get('/getproject/:id', projectctrl.getProject)
route.delete('/deleteproject/:id', projectctrl.deleteProject)
route.put('/editproject/:id', projectctrl.editproject)


route.get('/clientprojects/:id',projectctrl.projectforClient)
module.exports = route