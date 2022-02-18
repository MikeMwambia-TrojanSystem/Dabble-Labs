const { resetWatchers } = require('nodemon/lib/monitor/watch');
const populationSchema = require('../../models/population');
//CRUD applications
module.exports = {
    //Document modifications
    Mutation: {
        async post(_, args) {
            
            const newPopulationData = new populationSchema({
                country: args.country,
                year: args.year,
                area: args.area,
                population : args.population
            });

            const res = await newPopulationData.save();
            
            return {
                id: res.id,
                ...res._doc
            };

        },
        async update(_,args) {
   
            try {

            return await populationSchema.findOneAndUpdate({_id:args.id},{year : args.year,population:args.population})

            }catch(err){

            return err

            }
        },
        async delete (_,args) {

            try {

                return await populationSchema.findOneAndDelete({_id:args.id})

            }catch(err){

                return err

            }

        }
    },
    //Document Queries
    Query: {

        countrybyID: async (_, args) => {
            try{
                return await populationSchema.findById({_id:args.id})
            }catch(err){
                return err
            }
        },
        
        allCountries : async (_,args) =>{

            try {
                return await populationSchema.find()
            }catch(err){
                return err 
            }
        }
      
    }
}