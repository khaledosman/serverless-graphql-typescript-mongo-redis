import { APIGatewayEvent, Context } from 'aws-lambda'

export function isWarmupRequest (event: APIGatewayEvent & any, context: Context & any): boolean {
  if (
    event.source === 'serverless-plugin-warmup' ||
    (context.custom && context.custom.source === 'serverless-plugin-warmup')
  ) {
    console.log('WarmUp - Lambda is warm!')
    return true
  }
  return false
}
