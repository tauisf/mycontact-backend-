const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true ,
        ref: "User",
    },
    name: {
        type: String,
        require: [true, "Please enter the contact name "],
    },
    email: {
        type: String,
        require: [true, "Please enter the contact email address "],
    },
    phone: {
        type: String,
        require: [true, "Please enter the contact phone number "],
    },
}, {
    timestamp: true,

});

module.exports = mongoose.model("Contact",contactSchema);