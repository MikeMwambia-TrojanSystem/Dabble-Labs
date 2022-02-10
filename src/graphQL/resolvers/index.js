const populations = require('./population');

module.exports = {
    Query: {
        ...populations.Query
    },
    Mutation: {
        ...populations.Mutation
    }
}