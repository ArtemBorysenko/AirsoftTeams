const { Client } = require('pg');

const config = require('../../config');

const dbUser = config.database.user;
const dbPassword = config.database.password;
const dbHost = config.database.host;
const dbPort = config.database.port;
const dbName = config.database.name;

console.log(`postgres://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/postgres`);

const CONNECTION_STRING = `postgres://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/postgres`;
const client = new Client(CONNECTION_STRING);

client.connect();
client.query(`CREATE DATABASE ${dbName}`, () => {
    client.end();
});