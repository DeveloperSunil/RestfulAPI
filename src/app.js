const express = require('express');
require('./db/conn');
const Student = require('./models/students');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// create a new students using promise
// app.post("/students",(req,res)=>{
//     console.log(req.body);
//     const user  = new Student(req.body);
//     user.save().then(()=>{
//       res.status(201).send(user)  
//     }).catch((e)=>{
//         res.status(400).send(e);
//     });
// })

// create a new students using async await
app.post("/students",async (req, res) =>{
    try{
        const user = new Student(req.body);
        const createUser = await user.save();
        res.status(201).send(createUser);
    }catch(e){
        res.status(400).send(e);
    }
      
})

// read the data from register students 
app.get("/students",async(req,res)=>{
    try{
          const studentsData = await Student.find();
          res.status(201).send(studentsData);
    }catch(e){
          res.status(400).send(e);
    }
})

// get the individual student data using id
app.get("/students/:id",async(req,res)=>{
     try{
        //  console.log(req.params.id);
        const _id = req.params.id;
        // // const studentData = await Student.findById({_id:_id})
        const studentData = await Student.findById(_id); // object destructing bolta hai key or value{_id:_id} same hai to ek bar likh do {_id}
        res.status(201).send(studentData);

     }catch(e){
        res.status(400).send(e);
     }
})

// update student data by id
app.patch("/students/:id",async(req, res)=>{
    try{
        const _id = req.params.id;
        const studentData = await Student.findByIdAndUpdate(_id,req.body,{new:true});
        res.status(201).send(studentData);
    }catch(e){
        res.status(400).send(e);
    }
})
 
// delete student data by id
app.delete("/students/:id",async(req, res)=>{
    try{
        // const _id = req.params.id;
        // const studentData = await Student.findByIdAndDelete(_id);
        // you can also pass (req.params.id) 
        const deleteStudent = await Student.findByIdAndDelete(req.params.id);
        if(!req.params.id){
            res.status(404).send();
        }else{
            res.status(201).send(deleteStudent);
        }
        
    }catch(e){
        res.status(500).send(e);
    }
})

app.listen(port,()=>{
    console.log(`server listening at ${port} `)
})