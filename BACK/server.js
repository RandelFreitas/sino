const express = require("express");
const requireDir = require("require-dir");

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const { bindCurrentNamespace } = require("./src/middleware/Storage");
app.use(bindCurrentNamespace);

requireDir("./src/models");

//Rotas
app.use("/api", require("./src/routes/ManagerRouter"))
app.use("/api", require("./src/routes/PatientRouter"));
require("./src/routes/AuthRouter")(app);

app.listen(3001);