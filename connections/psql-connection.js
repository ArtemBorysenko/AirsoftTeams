const config = require("../config")
const sequelize = require("./database")

let retries = config.database.retries
async function connection() {
    while (retries) {
        try {
            await sequelize.sync()
            await sequelize
                .authenticate()
                .then(() => {
                    console.log("Соединение установлено")
                })
                .catch((err) => {
                    console.error("Ошибка соединения" + err)
                })
            break
        } catch (err) {
            console.log(err)
            retries--
            console.log(`retries left: ${retries}`)
            await new Promise((res) => setTimeout(res, 5000))
        }
    }
}
connection()

const modelNames = ["users", "users_creds", "users_tokens", "comments"]
for (const modelName of modelNames) {
    sequelize.import(`../models/database/${modelName}.js`)
}

for (const modelName of Object.keys(sequelize.models)) {
    if ("associate" in sequelize.models[modelName]) {
        sequelize.models[modelName].associate(sequelize.models)
    }
}
