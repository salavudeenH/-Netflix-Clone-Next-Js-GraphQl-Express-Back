const { gql } = require('apollo-server-express');

module.exports = gql`
    type Category {
        id: ID
        title: String
    }
    type Query {
        getCategory:[Category]
        getCategory2(id:ID):Category!
    }
    type Mutation {
        createCategory(title:String!):Category
        updateCategory(id:ID!,title:String!):Category
    }
`