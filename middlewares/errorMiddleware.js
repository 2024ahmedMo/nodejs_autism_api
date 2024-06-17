const globalError=(err,req,res,next)=>{
    err.statusCode=err.statusCode || 500;
    err.statusCode=err.statusCode || 'error';

    if (process.env.NODE_ENV === 'development') {
        sendErrorForDev(err, res);
        } 
        else {
        // if (err.name === 'JsonWebTokenError') err = handleJwtInvalidSignature();
        // if (err.name === 'TokenExpiredError') err = handleJwtExpired();
        sendErrorForProd(err, res);
        }
};

const sendErrorForDev = (err, res) =>{
    return res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
    });
};

const sendErrorForProd = (err, res) =>{
    return res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    
    });
};

module.exports=globalError;