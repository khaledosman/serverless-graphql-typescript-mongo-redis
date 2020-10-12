import * as SES from 'aws-sdk/clients/ses'
const ses = new SES({
  region: 'us-east-1'
})
export function sendEmail ({ subject = 'Test', message, from, to = [] }): Promise<SES.SendEmailResponse> {
  const params = {
    Destination: {
      ToAddresses: to // Email address/addresses that you want to send your email
    },
    // ConfigurationSetName: 'email-configuration-set',
    Message: {
      Body: {
        // Html: {
        // // HTML Format of the email
        //   Charset: 'UTF-8',
        //   Data:
        //   "<html><body><h1>Hello  Charith</h1><p style='color:red'>Sample description</p> <p>Time 1517831318946</p></body></html>"
        // },
        Text: {
          Charset: 'UTF-8',
          Data: message
        }
      },
      Subject: {
        Charset: 'UTF-8',
        Data: subject
      }
    },
    Source: from
  }

  return ses.sendEmail(params).promise()
}
