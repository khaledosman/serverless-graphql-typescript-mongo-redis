export function isWarmupRequest (event: any, context: any): boolean {
  if (
    event.source === 'serverless-plugin-warmup' ||
    (context.custom && context.custom.source === 'serverless-plugin-warmup')
  ) {
    console.log('WarmUp - Lambda is warm!')
    return true
  }
  return false
}
