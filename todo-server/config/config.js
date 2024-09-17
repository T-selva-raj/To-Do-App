require('dotenv').config();

CONFIG = {};
CONFIG.secret_key = process.env.secret_key;
CONFIG.PORT = process.env.PORT;
CONFIG.FIREBASE_APIKEY = process.env.FIREBASE_APIKEY;
CONFIG.FIREBASE_AUTHDOMAIN = process.env.FIREBASE_AUTHDOMAIN;
CONFIG.FIREBASE_DATABASEURL = process.env.FIREBASE_DATABASEURL;
CONFIG.FIREBASE_PROJECTID = process.env.FIREBASE_PROJECTID;
CONFIG.FIREBASE_STORAGEBUCKET = process.env.FIREBASE_STORAGEBUCKET;
CONFIG.FIREBASE_MESSAGINGSENDERID = process.env.FIREBASE_MESSAGINGSENDERID
CONFIG.FIREBASE_APPID = process.env.FIREBASE_APPID;
CONFIG.FIREBASE_MEASUREMENTID = process.env.FIREBASE_MEASUREMENTID;

CONFIG.db_name = process.env.db_name;
CONFIG.db_user = process.env.db_user;
CONFIG.db_password = process.env.db_password;
CONFIG.db_host = process.env.db_host;
CONFIG.db_dialect = process.env.db_dialect;
CONFIG.db_port = process.env.db_port;
CONFIG.jwt_encryption = process.env.jwt_encryption;
CONFIG.jwt_expiration = process.env.jwt_expiration;
CONFIG.DB_URL = "postgresql://postgres.aiczeffyladcjnuqtpft:eJ20jPOSD58ODIfg@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres"

module.exports = CONFIG;
