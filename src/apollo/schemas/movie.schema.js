const { gql } = require('apollo-server-express');

module.exports = gql`
    type Movie {
        id: ID
        title: String
        description: String
        link: String
        director:String
        distributor:String
        duration:String
        age:Int,
        video:String,
        rating:String,
        releaseDate: String,
        categorie:[Category]
    }
     type Query {
        getMovie:[Movie]
        getMovieId(id:ID):Movie!
        filterCategory(categorie:String): [Movie]
    }
      
    type Mutation {
        createMovie(title:String!,description: String,link:String,director:String,distributor:String,duration:String,age:Int,video:String,categorie:[ID],rating:String,releaseDate:String):Movie
        updateMovie(id:ID!,title:String!,description: String,link:String,director:String,distributor:String,duration:String,age:Int):Movie
    }
`
