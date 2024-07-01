const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler( async (req, res, next) => {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer"))  { // taken the field which has token
        token = authHeader.split(" ")[1]; // Token taken by split the field value and using value stored and index 1 
        jwt.verify(token, process.env.ACCESS_TOKEN_SECERT, (err, decoded) =>{
            if (err){
                res.status(401);
                throw new Error("User is not authorized ");
            }
            req.user = decoded.user; // verfied the token and extract the information
            next(); // middelware  call next() to pass control to the 
                    //next middleware or route handler if the token is valid.
        });
        if (!token){
            res.status(401);
            throw new Error("User is not authorized or token is missing  ");
        }
    }
});

module.exports = validateToken;