const populations = require('./population');
//Spread the populations object
module.exports = {
    Query: {
        ...populations.Query
    },
    Mutation: {
        ...populations.Mutation
    }
}