const express = require("express");
const requireDir = require("require-dir");

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const { bindCurrentNamespace } = require("./src/middleware/Storage");
app.use(bindCurrentNamespace);

requireDir("./src/models");

//Config routes
app.use("/api/level1", require("./src/routes/config/AuthLevel1"));
app.use("/api/level2", require("./src/routes/config/AuthLevel2"));

app.use("/api/public", require("./src/routes/ManagerRouter"))
app.use("/api/level1", require("./src/routes/ClinicRouter"));
app.use("/api/level2", require("./src/routes/PatientRouter"));
app.use("/api/auth", require("./src/routes/AuthRouter"));

app.listen(3001);