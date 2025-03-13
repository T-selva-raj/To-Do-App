const pe = require('parse-error');

to = function (promise) {
    return promise
        .then(data => {
            return [null, data];
        }).catch(err =>
            [pe(err)]
        );
}



TE = (error) => { throw new Error(error) }
process.on('unhandledRejection', error => {
    console.error('Uncaught Error', pe(error));
});