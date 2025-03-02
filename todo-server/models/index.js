"use strict";


var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");
var basename = path.basename(__filename);
var db = {};
let sequelize = new Sequelize(
    CONFIG.db_name,
    CONFIG.db_user,
    CONFIG.db_password,
    {
        host: CONFIG.db_host,
        dialect: CONFIG.db_dialect,
        port: CONFIG.db_port,
        logging: false,
        define: {
            timestamps: false,
            underscored: true,
        },
        pool: {
            max: 100,
            min: 0,
        },
        dialectOptions: {
            useUTC: true,
        },
    }
);

const schemaCreate = async function () {
    const test = [];
    var schemas = await sequelize.showAllSchemas().then(
        (s) => {
            CONSTANTS.SCHEMAS.forEach((item) => {
                if (s.indexOf(item) < 0) {
                    sequelize.createSchema(item).then((res) => { });
                }
            });
        },
        (err) => {
            console.log("in err", err);
        }
    );
    return schemas;
};
CONSTANTS.SCHEMAS.forEach((item) => {
    fs.readdirSync(__dirname + "/" + item)
        .filter((file) => {
            return (
                file.indexOf(".") !== 0 &&
                file !== basename &&
                file.slice(-3) === ".js"
            );
        })
        .forEach((file) => {

            var model = require(path.join(__dirname + "/" + item, file))(
                sequelize,
                Sequelize.DataTypes
            );
            db[file.slice(0, -3)] = model;
        });
});
Object.keys(db).forEach((modelName) => {
    if (db[modelName].association) {
        db[modelName].association(db);
    }
});
db.schemaCreate = schemaCreate();
db.sequelize = sequelize;
db.Sequelize = Sequelize;


sequelize
    .authenticate()
    .then(() => {
        console.log("Connected to SQL database:", CONFIG.db_name);
        db.schemaCreate.then(() => {
            db.sequelize.sync().then(async () => {
                console.log("Database Sync..!");
            });
        });
    })
    .catch((err) => {
        console.error(
            "Unable to connect to Postgres database:",
            CONFIG.db_name,
            err.message
        );
    });

module.exports = db;
