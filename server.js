// Load environment variables from .env file
require("dotenv").config();
// Import required libraries
const express = require("express");
const cors = require("cors");

// Import custom modules
const ConnectDB = require("./src/config/db");
const tasksSchemaModel = require("./src/models/tasks");

// Define CORS options to allow cross-origin requests
const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}
// Initialize express app
const app = express();
// Middleware configuration
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Establish database connection
ConnectDB();

//Route to check if the server is working
app.get("/", (req, res) => {
    res.json("Working");
})

// Route to view all tasks
app.get("/tasks", async (req, res) => {
    try {
        const response = await tasksSchemaModel.find();
        if (response?.length > 0) {
            res.status(200).json(response);
        } else {
            res.status(404).json("No Task Available");
        }
    } catch (error) {
        console.log("Internal server error due to :-", error);
        res.status(500).json("Internal server error");
    }
})
// Route to add new task
app.post("/tasks", async (req, res) => {
    const { name, status } = req.body;
    const datas = {
        name: name,
        status: status
    }

    try {
        const response = await tasksSchemaModel.insertMany([datas]);
        if (response !== null) {
            res.status(200).json(response);
        } else {
            res.status(400).json("Task could not add");
        }
    } catch (error) {
        console.log("Internal server error due to :-", error);
        res.status(500).json("Internal server error");
    }
})
// Route to edit a specific task
app.put("/tasks/:id", async (req, res) => {
    const {id} = req.params;
    const {...allData } = req.body;

    try {
        const response = await tasksSchemaModel.findOneAndUpdate(
            {_id:id},
            {$set:allData},
            {new:true}
        );

        if (response !== null) {
            res.status(200).json(response);
        } else {
            res.status(400).json("Task could not edit");
        }
    } catch (error) {
        console.log("Internal server error due to :-", error);
        res.status(500).json("Internal server error");
    }
})
// Route to remove a specific task
app.delete("/tasks/:id", async (req, res)=>{
    const { id } = req.params;

    try {
        const response = await tasksSchemaModel.findOneAndDelete({_id:id});

        if (response !== null) {
            res.status(200).json(response);
        } else {
            res.status(400).json("Task could not remove");
        }
    } catch (error) {
        console.log("Internal server error due to :-", error);
        res.status(500).json("Internal server error");
    }
})

// Start the server and listen on the specified port
app.listen(process.env.PORT, () => {
    console.log("App is listening on the Port :-", process.env.PORT);
})