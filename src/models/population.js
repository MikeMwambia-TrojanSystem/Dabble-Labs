const { model, Schema } = require('mongoose');

const populationSchema = new Schema({
    country: String,
    year: String,
    area: Number,
    population : Number
});

module.exports = model('Population', populationSchema);