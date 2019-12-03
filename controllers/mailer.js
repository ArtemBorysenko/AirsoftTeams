const nodemailer = require('nodemailer');
const config = require('../config');


  async function mailer(req, res, next) {

      let mailOptions = {};
      if (req.originalUrl === `/player/team/out/${req.params.id}` || req.originalUrl === `/player/team/add/${req.params.id}` || req.originalUrl === `/player/team/switch/${req.params.id}`) {
          mailOptions = {
              from: '"Tetta App" <artemborysenco@gmail.com>',
              to: config.mailManager,
              subject: 'player add/out/switch',
              text: 'This is the email sent through Gmail SMTP Server.'
          }
      }

      if(req.originalUrl ===  `/admin/manager/approve/${req.params.id}`){
          mailOptions = {
              from: '"Tetta App" <artemborysenco@gmail.com>',
              to: config.mailManager,
              subject: 'manager approve',
              text: 'This is the email sent through Gmail SMTP Server.'
          }
      }


      if (req.baseUrl === '/registration' && req.body.user_role === 'Manager') {
          mailOptions = {
              from: '"Tetta App" <artemborysenco@gmail.com>',
              to: config.mailAdmin,
              subject: `Manager reg name: ${req.body.username}`,
              text: 'This is the email sent through Gmail SMTP Server.'
          }
      }

      if (req.originalUrl === `/manager/player/approve_team/${req.params.id}`) {
          mailOptions = {
              from: '"Tetta App" <artemborysenco@gmail.com>',
              to: config.mailPlayer,
              subject: 'player approve',
              text: 'This is the email sent through Gmail SMTP Server.'
          }
      }

     nodemailer.createTestAccount(pageSend(req, res));

      function pageSend(req, res) {
          const transporter = nodemailer.createTransport({
              host: 'smtp.googlemail.com',
              port: 465,
              secure: true,
              auth: {
                  user: config.BOT_EMAIL,
                  pass: config.BOT_PASSWORD
              }
          });

          transporter.sendMail(mailOptions, function(error, request=req, respons=res) {
              if (error) {
                  respons.status(400).json('При отправке письма произошла ошибка!');
                  return console.log(`При отправке письма произошла ошибка!: ${error}`);
              }
              console.log('Письмо успешно отправлено!');
              respons.status(200).json('Письмо успешно отправлено!');
          });
      }
 }

module.exports = {
    mailer
};

