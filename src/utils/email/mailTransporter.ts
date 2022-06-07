import nodemailer from 'nodemailer'
import { google } from 'googleapis'
import SMTPTransport from 'nodemailer/lib/smtp-transport'

const OAuth2 = google.auth.OAuth2

const createTransporter = async () => {
  const oauth2Client = new OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, 'https://developers.google.com/oauthplayground')

  oauth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN,
  })

  const accessToken = await new Promise((resolve, reject) => {
    oauth2Client.getAccessToken((err, token) => {
      if (err) {
        console.error('err', err)
        reject()
      }
      resolve(token)
    })
  })

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      type: 'OAuth2',
      user: process.env.EMAIL,
      accessToken,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN,
    },
  } as SMTPTransport.Options)

  return transporter
}

export default createTransporter
