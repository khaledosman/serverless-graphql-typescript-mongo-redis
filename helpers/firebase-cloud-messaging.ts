import { google } from 'googleapis'
import axios from 'axios'
import firebaseServiceAccount from '../firebase-service-account.json'

function sendFcmMessage (subscription, token, { body, title }): Promise<any> {
  const message = {
    notification: {
      body,
      title
    },
    data: {
      body,
      title
      // ... anything else we need to send to the app
    },
    token: subscription
  }

  return axios.post(`https://fcm.googleapis.com/v1/projects/${firebaseServiceAccount.project_id}/messages:send`, {
    message
  }, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => {
      return res.data
    })
}

function getAccessToken (): Promise<string> {
  return new Promise((resolve, reject) => {
    const jwtClient = new google.auth.JWT(
      firebaseServiceAccount.client_email,
      null,
      firebaseServiceAccount.private_key,
      ['https://www.googleapis.com/auth/firebase.messaging'],
      null
    )
    jwtClient.authorize(function (err, tokens) {
      if (err) {
        reject(err)
        return
      }
      resolve(tokens.access_token)
    })
  })
}

export { sendFcmMessage, getAccessToken }
