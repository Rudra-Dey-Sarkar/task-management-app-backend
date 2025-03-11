require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
  }
const app = express();
app.use(cors(corsOptions));
app.use(express.json());

app.get("/", async (req, res)=>{
    res.json("working");
})


app.listen(process.env.PORT, ()=>{
    console.log("App is listening on PORT :-", process.env.PORT);
})