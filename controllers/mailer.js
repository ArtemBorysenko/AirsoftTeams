const nodemailer = require("nodemailer")
const config = require("../config")

async function mailer(mailOptions) {
    const mailConfig = {
        host: "smtp.googlemail.com",
        port: 465,
        secure: true,
        auth: {
            user: config.BOT_EMAIL,
            pass: config.BOT_PASSWORD,
        },
    }

    const transporter = nodemailer.createTransport(mailConfig)

    transporter.sendMail(mailOptions, function(error) {
        if (error) {
            console.log(`При отправке письма произошла ошибка!: ${error}`)
        }
        console.log("Письмо успешно отправлено!")
    })
}

module.exports = {
    mailer,
}
