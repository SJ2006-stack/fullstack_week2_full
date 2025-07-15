const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { 
        type: String,
         required: true },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true },
    password: { 
        type: String,
        required: true, 
        minlength: 8, 
        trim: true,
        match: /@/
    },
    createdAt: { 
        type: Date, 
        default: Date.now },
    updatedAt: { 
        type: Date, 
        default: Date.now }
});

const User = mongoose.model("User", userSchema);
module.exports = User;
