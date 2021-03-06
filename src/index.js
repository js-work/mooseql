import { GraphQLSchema, GraphQLObjectType } from 'graphql'
import { modelsToTypes } from './type'
import { buildSchema } from './schema'

const mooseql = (models, customFields, opt) => {
  const typeMap = modelsToTypes(models)
  const {query, mutation} = buildSchema(models, typeMap)
  const customQuery = customFields && customFields.query
  const customMutation = customFields && customFields.mutation
  return new GraphQLSchema({
    query: new GraphQLObjectType({
      name: 'Query',
      fields: Object.assign({}, query, customQuery)
    }),
    mutation: new GraphQLObjectType({
      name: 'Mutation',
      fields: Object.assign({}, mutation, customMutation)
    })
  })
}

mooseql.buildTypes = modelsToTypes

module.exports = mooseql
