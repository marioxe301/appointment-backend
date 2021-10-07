const express = require('express');
const app = express();
const cors = require('cors');
const appointmentRouter = require('./routes/appointments');


//Port Define
app.set('port',process.env.PORT || 3001);



//General Middlewares  Define
app.use(cors());
app.use(express.json());



//Routes
app.use('/appointment',appointmentRouter);



//Main
app.get('/',(req,res)=>{
    res.json({
        name: 'Appointments REST API',
        httpVersion: req.httpVersion
    });
});



const server = app.listen(app.get('port'), ()=>{
    console.log(`REST API Running on port ${app.get('port')}`);
});


module.exports = {
    app,
    server
};