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
            let updatedDoc = await populationSchema.findOneAndUpdate({_id:args.id},
                {year : args.year,population:args.population})
            .then((err,doc)=>{
                if(err){
                    console.log(err);
                    return err;
                }else{
                    return doc;
                }
            })
            return updatedDoc;
        },
        async delete (_,args) {
            let deletedDoc = await populationSchema.findOneAndDelete({_id:args.id}).then(
                (err,doc)=>{
                if(err){
                    return err
                }else{
                    return doc
                }
            })
            return deletedDoc;
        }
    },
    //Document Queries
    Query: {

        countrybyID: async (_, args) => {
            let data = await populationSchema.findById({_id:args.id}).then((err,data)=>{
                if(err){
                    return err;
                }else{
                    return data;
                }
            })

            return data;
        },
        allCountries : async (_,args) =>{
            let allCountries = await populationSchema.find().then((err,data)=>{
                if(err){
                    return err;
                }else{
                    return data
                }
            })

            return allCountries;
        }
      
    }
}