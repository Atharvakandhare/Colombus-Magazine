const mongoose = require('mongoose');
const mongoURI =
  "mongodb+srv://atharvakandhare101:atharvakandhare101@cluster0.61wqx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"; 


const connectmongo = () =>{
    mongoose.connect(mongoURI , {  
        // useNewUrlParser: true, 
        // useUnifiedTopology: true,
        family: 4,})
}
console.log("Connected")

module.exports = connectmongo;