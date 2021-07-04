const mongoose = require('mongoose');
const connectionUrl = 'mongodb+srv://admin:urkRapQ6xQ8Zs21G@cluster0.lew8o.mongodb.net/student-api?retryWrites=true&w=majority';
const connection = mongoose.connect(connectionUrl,{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify:false,
}).then(()=>{
    console.log("Database Connected");
}).catch(()=>{
    console.log("Not Connected");
});