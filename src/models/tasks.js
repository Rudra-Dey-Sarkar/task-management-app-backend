// Users Schema and Model Creation
const mongoose = require("mongoose");

const tasksSchemaModel = new mongoose.Schema({
    name:String,
    status:{type:Boolean, default:false},
});

module.exports = mongoose.model("tasks", tasksSchemaModel);