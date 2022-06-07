"use strict";
const config = require(__dirname + '/index.js');
console.log(config);
const db = config.db;
const username = db.username;
const password = db.password;
const database = db.database;
const host = db.host;
module.exports = {
    test: {
        username,
        password,
        database,
        host,
        dialect: 'postgres',
        seederStorage: 'sequelize',
    },
    development: {
        username,
        password,
        database,
        host,
        dialect: 'postgres',
        seederStorage: 'sequelize',
    },
    production: {
        use_env_variable: 'DATABASE_URL',
        dialect: 'postgres',
        seederStorage: 'sequelize',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false,
            },
        },
    },
};
//# sourceMappingURL=database.js.map