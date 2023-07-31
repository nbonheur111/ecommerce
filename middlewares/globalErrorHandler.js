
//npm i express-async-handler
export const globalErrorHandler = (err, req, res, next) => {
    //build error object
    //stack
    //message

    const stack = err?.stack;
    const statusCode = err?.stausCode?err?.statusCode:500;
    const message = err?.message;
    res.status(statusCode).json({
        stack,
        message,
    });
}

//404 handler - catches all 404 and shows user usable information
export const notFound = (req, res, next) => {
    const err = new Error(`404 - route ${req.originalUrl} not found`); //originalUrl is what user is trying to access
    next(err);
}