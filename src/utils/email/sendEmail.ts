import nodemailer from 'nodemailer'
import hbs from 'nodemailer-express-handlebars'
require('dotenv').config()

const sendEmail = async (res: any, user: any, code: String) => {
  const subject = 'Reset password'
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })
  const options = {
    viewEngine: {
      extname: '.hbs',
      layoutsDir: 'src/utils/email/templates/',
      defaultLayout: 'resetPassword',
      partialsDir: 'src/utils/email/templates/',
    },
    viewPath: 'src/utils/email/templates/',
    extName: '.hbs',
  }
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: `${user.email}`,
    subject: `${subject}`,
    attachments: [
      {
        filename: 'logo.png',
        path: 'assets/logo.png',
        cid: 'logo',
      },
    ],
    template: 'resetPassword',
    context: {
      name: user[user.role].firstName,
      code,
    },
  }
  transporter.use('compile', hbs(options))
  transporter.sendMail(mailOptions, function (err: any, result: any) {
    if (err) {
      console.error(err)
      return res.send({ err })
    } else {
      console.log(result)
      return res.send({ result })
    }
  })
}

export default sendEmail
