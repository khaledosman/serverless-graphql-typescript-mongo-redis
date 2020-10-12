import { IGraphQLToolsResolveInfo } from 'graphql-tools'
import graphqlFields from 'graphql-fields'

export function getMongooseSelectionFromSelectedFields (info: IGraphQLToolsResolveInfo, fieldPath = null): any {
  const selections = graphqlFields(info)
  const mongooseSelection = Object.keys(fieldPath ? selections[fieldPath] : selections).reduce((a, b) => ({ ...a, [b]: 1 }), {})
  return mongooseSelection
}
