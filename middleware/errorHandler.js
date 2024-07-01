const {constant, constants} = require("../constants")
const errorHandler = (err, req, res, next) => {
    const  statusCode = res.statusCode ? res.statusCode : 500;
    switch(statusCode){
        case constants.VALIDATION_ERROR:
            res.json({title:"Validation_failed",message : err.message, stackTrace : err.stack});
            break;
        case constants.UNAUTHORIZED:
            res.json({title:"Unauthorized" ,message : err.message, stackTrace : err.stack});
            break;
        case constants.FORBIDDEND:
            res.json({title:"FORBIDDEN" ,message : err.message, stackTrace : err.stack});
            break;
        case constants.NOT_FOUND:
            res.json({title:"NOT_FOUND" ,message : err.message, stackTrace : err.stack});
            break;
        case constants.SERVER_ERROR:
            res.json({title:"SERVER_ERROR" ,message : err.message, stackTrace : err.stack});
            break;
        default:
            console.log("No error ! All good");
            break;
        };
    };
    
   

module.exports = errorHandler;
