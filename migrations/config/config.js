const config = require('../../config')

module.exports = {
  "development": {
    "username": "postgres",
    "password": "q1w2e3r4",
    "database": "airsoftteams",
    "host":  config.database.host || "localhost",
    "dialect": "postgres",
    "operatorsAliases": 0
  },
  "test": {
    "username": "postgres",
    "password": "q1w2e3r4",
    "database": "airsoftteams",
    "host": "localhost",
    "dialect": "postgres",
    "operatorsAliases": 0
  },
  "production": {
    "username": "postgres",
    "password": "q1w2e3r4",
    "database": "airsoftteams",
    "host": "localhost",
    "dialect": "postgres",
    "operatorsAliases": 0
  }
}
