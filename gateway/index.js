const express = require("express");
const cors = require("cors");
const proxy = require("express-http-proxy");

const app = express();

app.use("/identity-management-service", proxy("http://localhost:8001"));
app.use("/organization-management-service", proxy("http://localhost:8002"));
app.use(
  "/subscription-catalog-management-service",
  proxy("http://localhost:8003")
);

app.listen(8000, () => {
  console.log("Gateway is Listening to Port 8000");
});
