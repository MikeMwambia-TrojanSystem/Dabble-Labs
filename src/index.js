const { ApolloServer }  = require('apollo-server');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
require('dotenv').config();
const MONGODB = process.env.MONGO_DB;
const PORT  = process.env.PORT;


const resolvers = require('./graphQL/resolvers');
const server = new ApolloServer({
    typeDefs:fs.readFileSync(
        path.join(__dirname,'./graphQL/typeDefs.graphql'),
        'utf8'
      ),
    resolvers
});

mongoose.connect(MONGODB, {useNewUrlParser: true})
.then(() => {
    console.log("MongoDB Connected");
    return server.listen({port: PORT});
})
.then((res) => {
    console.log(`Server running at ${res.url}`)
});