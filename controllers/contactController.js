// Contain logic for Request and Respones conection to Database 

const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");
const userModel = require("../models/userModel");

//@desc Get all Contact
//@route GET /api/contacts
//@access private
const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find( {user_id: req.user.id});
    res.status(200).json(contacts);
});

//@desc Create  Contact
//@route POST /api/contacts/
//@access private
const createContact = asyncHandler(async (req, res) => {
    console.log("The request body ",req.body);
    const {name, email, phone} = req.body; // Destructing the req fro error handling
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All fields are mandatory !");
    }
    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id: req.user.id
    });
    res.status(201).json(contact);
});

//@desc Update Contact
//@route PUT /api/contacts/:id
//@access private
const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found ");
    }
    if (contact.user_id.toString() !== req.user.id ){  // checking if user id is not same  
        res.status(403);
        throw new Error("Users don't permission to update another user contacts ");
    } 
    const updateContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}     
    );
    res.status(200).json(updateContact);
});



//@desc Get Contact
//@route GET /api/contacts/:id
//@access private
const getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found ");
    }
    res.status(200).json(contact);
});


//@desc Delete Contact
//@route DELETE /api/contacts/:id
//@access private
const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    if (contact.user_id.toString() !== req.user.id ){  // checking if user id is not same  
        res.status(403);
        throw new Error("Users don't permission to update another user contacts ");
    } 
    await Contact.deleteOne({_id: req.params.id}); // Call deleteOne  on the Contact instance
    res.status(200).json(contact);
});




module.exports = {
    getContacts, 
    getContact, 
    createContact, 
    updateContact,
    deleteContact
};

