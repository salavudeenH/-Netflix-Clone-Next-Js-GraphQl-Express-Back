const express = require('express');
const bodyParser = require('body-parser');
const config = require("../configs");
const port = config.server.port;
const cors = require('cors')
const apiRouter = require("../routes");
const app = express();
const { ApolloServer, gql } = require("apollo-server-express");
const {ApolloServerPluginLandingPageGraphQLPlayground} = require("apollo-server-core");


const MovieSchema = require("../apollo/schemas/movie.schema");
const CategorySchema = require("../apollo/schemas/category.schema");


const MovieResolvers = require("../apollo/resolvers/movie.resolver");
const CategoryResolvers = require("../apollo/resolvers/category.resolver");


let graphQlServer = null;
 
async function startServer() {
  graphQlServer = new ApolloServer({
    typeDefs: [MovieSchema,CategorySchema],
    resolvers: [MovieResolvers,CategoryResolvers],
    plugins: [
      ApolloServerPluginLandingPageGraphQLPlayground(),
    ],
  })
  await graphQlServer.start();
  graphQlServer.applyMiddleware({ app,path: "/graphql" });
}
startServer();

// graphQlServer.applyMiddleware({ app, path: "/graphql" });
app.use(cors());
app.use(express.json());

//app.use(bodyParser.json());
app.use("/api/v1/", apiRouter);

exports.start = () => {
  app.listen(port, (err) => {
    if (err) {
      console.log(`Errors: ${err}`);
      process.exit(-1);
    }
    console.log(`app is runnning on port ${port}`);
  });
};

