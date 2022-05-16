const express = require("express");
const app = express();
const routes = require("./route/index");
app.use(express.json());
const dotenv = require("dotenv");
const routes = require("./route");
dotenv.config();
const PORT = process.env.PORT || 8080;
routes(app);
app.listen(PORT, () => {
    console.log(`Server stated on port ${PORT}`);
})