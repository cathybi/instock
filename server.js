const express = require("express");
const app = express();
const cors = require("cors");

require("dotenv").config()
const { PORT } = process.env;

// Middleware
app.use(express.json()); // sets the req.body
app.use(express.static("public")); // make resources from the "public" folder available from the client
app.use(cors()); // avoid CORS errors: allow clients from different domains to access server

app.get("/", (req, res) => {
    res.send("Welcome to Instock server!");
});

app.listen(PORT, () => {
    console.log(`Server starting on PORT:${PORT}`);
});