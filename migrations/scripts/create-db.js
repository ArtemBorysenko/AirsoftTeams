const { Client } = require('pg');

const config = require('../../config');

const dbUser = config.database.user;
const dbPassword = config.database.password;
const dbHost = config.database.host;
const dbPort = config.database.port;
const dbName = config.database.name;
//postgres://postgres:q1w2e3r4@postgresql:5432/airsoftteams
console.log(`postgres://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/postgres`);

const CONNECTION_STRING = `postgres://postgres:q1w2e3r4@postgresql:5432/airsoftteams`;
const client = new Client(CONNECTION_STRING);

client.connect();
client.query(`CREATE DATABASE ${dbName}`, () => {
    client.end();
});