module.exports = {
  client: {
    service: 'my-engine-service-graph@dev',
    // service: { //option 2
    //   name: 'my-engine-service-graph',
    //   url: 'https://devapi.omniviewsports.com/graphql',
    //   // optional disable SSL validation check
    //   skipSSLValidation: true
    // },
    // service: { //option 3
    //   name: 'my-engine-service-graph',
    //   localSchemaFile: './path/to/schema.graphql'
    // }
    includes: ['./graphql/**/*.ts']
  },
  service: {
    endpoint: {
      // localSchemaFile: './path/to/schema.graphql',
      url: 'https://my-endpoint', // defaults to http://localhost:4000
      // headers: {
      //   // optional
      //   authorization:
      //     'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGEwYTg1N2NjMWU5MzAwMDcxNTAwNWUiLCJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJjcmVhdGVkQXQiOjE1NzEzMDU1MDMxMDUsImlhdCI6MTU3MTMwNTUwMywiZXhwIjoxNTcxMzA5MTAzfQ.JdX5cGqSMrynpiU8axZLGkfru469J1pVUMliBw_VfqM'
      // },
      skipSSLValidation: true // optional, disables SSL validation check
    }
  }
}
