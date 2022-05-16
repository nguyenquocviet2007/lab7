const userRoute = require("./userRoute");
const courseRoute = require("./courseRoute");

function routes(app) {
    app.use("/user", userRoute);
    app.use("/course", courseRoute);
}

module.exports = routes;