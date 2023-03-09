const express = require('express');
const route = express.Router();

export default app => {
    app.use("/new-invoice/v1/client", require('./api/clients'));
    app.use("/new-invoice/v1/invoice", require('./api/invoice'));
    app.use("/new-invoice/v1/project", require('./api/projects'));
    app.use("/new-invoice/v1/login", require('./api/User'));
    app.use("/new-invoice/v1", require('./api/authentication'));
    app.use("/new-invoice/v1/sendmail", require('./api/email'));
    app.use("/images", express.static("uploads"))
}