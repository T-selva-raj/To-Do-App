const CryptoJS = require('crypto-js');
require('../config/config');

const encryptDetails = (data) => {
    if (data) {
        const text = CryptoJS.AES.encrypt(data.toString(), CONFIG.secret_key).toString();
        return text.replace(/\\/g, '|');
    } else {
        return null;
    }
}
module.exports.encryptDetails = encryptDetails;

const decryptDetails = (data) => {
    if (data) {
        const bytes = CryptoJS.AES.decrypt(data.toString(), CONFIG.secret_key);
        const result = bytes.toString(CryptoJS.enc.Utf8).replace('|', /\\/g);
        return result;
    } else {
        return null;
    }
}
module.exports.decryptDetails = decryptDetails;
