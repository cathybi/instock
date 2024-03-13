const express = require("express");
const app = express();
const cors = require("cors");
const inventoriesRouter = require("./routes/inventoriesRouter");
const warehouseRouter = require("./routes/wareHouseRoutes");

require("dotenv").config()
const PORT = process.env.PORT || 5050;

// Middleware section
// sets the req.body
app.use(express.json());
// make resources from the "public" folder available from the client
app.use(express.static("public")); 
// avoid CORS errors: allow clients from different domains to access server
app.use(cors());


// all warehouse routers
app.use('/warehouse', warehouseRouter);
app.use("/api/inventories", inventoriesRouter);


app.listen(PORT, () => {
    console.log(`Server starting on PORT:${PORT}`);
});