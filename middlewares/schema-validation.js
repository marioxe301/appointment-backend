const schema = require('../schemas/appointment');

const validateSchema = async (req,res,next) =>{
    try{
        await schema.validateAsync(req.body);
        next();
    }catch(error){
        res.status(422);
        res.json(error);
    }
}

module.exports = validateSchema;