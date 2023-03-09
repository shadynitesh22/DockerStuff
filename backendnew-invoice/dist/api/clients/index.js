"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authentication_1 = require("../authentication/authentication");
const clients_controller_1 = require("./clients.controller");
const express = require("express");
const route = express.Router();
const clientctl = new clients_controller_1.CLientController();
const auth = new authentication_1.Authentication();
const multer = require("multer");
var filename;
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        console.log('called');
        console.log(req, "inside destination");
        callback(null, 'uploads/');
    },
    filename: function (req, file, callback) {
        console.log('called2');
        console.log(filename);
        console.log(req);
        console.log(file);
        // console.log(req.body);
        callback(null, file.originalname);
    }
});
const upload = multer({ storage: storage }).single("image");
route.get("/getclients", clientctl.getClients);
// auth.isAuthenticated,
route.get("/getclient/:id", clientctl.getClient);
route.post("/addclient", clientctl.postClient);
route.put("/editclient/:id", clientctl.editclient);
route.delete("/deleteclient/:id", clientctl.deleteClient);
route.get("/client/:id", clientctl.clientwithprojects);
route.post("/imagedemo", (req, res, done) => {
    console.log('helllasdf');
    // console.log(file);
    // console.log(req.body);
    console.log(req.client);
    console.log(req.client.values);
    console.log(req.body.client, "line 57");
    // console.log(JSON.parse(req.body.client).firstname);
    filename = "hello";
    upload(req, res, (err) => {
        // console.log(req.body);
        console.log(req.file);
        if (err) {
            console.log(req.body);
            console.log(err);
            res.status(400).send('something went wrong');
        }
        console.log('outside error');
        // console.log(req.body);
        // console.log(req.image);
        // console.log(req.client);
        // console.log(req.image.name);
        console.log(req.body.client.firstname);
        // res.send(req.image)
        done();
    });
}, clientctl.postClient);
module.exports = route;
//# sourceMappingURL=index.js.map