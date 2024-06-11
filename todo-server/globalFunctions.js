pe = require('parse-error');

to = function (promise) {//global function that will help use handle promise rejections, this article talks about it http://blog.grossman.io/how-to-write-async-await-without-try-catch-blocks-in-javascript/
    return promise
        .then(data => {
            return [null, data];
        }).catch(err =>
            [pe(err)]
        );
}

ReE = async function (res, err, code) {
    if (typeof err == 'object' && typeof err.message != 'undefined') {
        err = err.message;
    }
    if (typeof code !== 'undefined') res.statusCode = code;
    return res.json({ success: false, error: err });
}


ReS = function (res, data, code) {
    let send_data = { success: true };
    if (typeof data == 'object') {
        send_data = Object.assign(data, send_data);
    }
    if (typeof data == 'object' && code) {
        res.statusCode = code;
    }
    return res.json(send_data)
};

TE = (error) => { return new Error(error) }
//This is here to handle all the uncaught promise rejections
process.on('unhandledRejection', error => {
    console.error('Uncaught Error', pe(error));
});