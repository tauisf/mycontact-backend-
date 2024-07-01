const asyncHandler = require("express-async-handler");//  to hanlde try and catch of async Fn
const User = require("../models/userModel");
const bcrypt = require("bcrypt");// for hashing the raw user password 
const jwt = require("jsonwebtoken"); // library of creating accessToken

//@desc Register a User 
//@route GET /api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body; // checking if all thing are filled if 
    if(!username || !email || !password){           // Not throw Error
        res.status(400);
        throw new Error("All field are mandotary");
    } 
    const userAvailable = await User.findOne({email}); // else find the user by Email object
    if(userAvailable){  // if user email is alresdy register
        res.status(400);
        throw new Error("User Already Register");
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed Password: ", hashedPassword);
    const user = await User.create({
        username,
        email,
        password: hashedPassword,
    });
    console.log(`User created ${user}`);
    if(user){// do not send hashed password
        res.status(201).json({ _id: user.id, email: user.email });
    }else{
        res.status(400);
        throw new Error("User data not valid ");
    }
    res.json({message: "user is register"});
});
//@desc Login a User 
//@route GET /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body; // email and password field form request body
    if ( !email || !password ){ // if no email or no password
        res.status(400);
        throw new Error("All field ae mandatory");
    }
    const user = await User.findOne({ email });// Find user by email
    if (user && ( await bcrypt.compare(password, user.password))){ // user password match
        const accessToken = jwt.sign({ // for craeting token
            user: {
                username: user.username,
                email: user.email,
                id: user.id,
            },
        }, process.env.ACCESS_TOKEN_SECERT, //sign taken payload , secert token ,expireTime
        { expiresIn : "15m"}  // for expiring the token
       );
        res.status(200).json({ accessToken});// giving the accessToken to user
    }else{ //if there is error ie password is not match
        res.status(401);
        throw new Error("email or  password is not valid ");
    }
});
//@desc Current User information 
//@route GET /api/users/current
//@access private
const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user);// get User information
});

module.exports = { registerUser, loginUser,currentUser };