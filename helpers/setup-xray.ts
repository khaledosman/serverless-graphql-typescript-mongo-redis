import AWSXRay from 'aws-xray-sdk-core'
import * as AWS from 'aws-sdk'
import http from 'http'
import https from 'https'

export function setupXRay (): void {
  if (!process.env.IS_OFFLINE) {
    AWSXRay.captureAWS(AWS)
    AWSXRay.capturePromise()
    AWSXRay.captureHTTPsGlobal(http, true)
    AWSXRay.captureHTTPsGlobal(https, true)
  }
}
