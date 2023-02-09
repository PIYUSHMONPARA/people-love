// require("dotenv").config();
const cors = require("cors");
// const passport = require("passport");
// const cookieSession = require("cookie-session");
const PORT = process.env.PORT || 8000
const express = require('express')
const { MongoClient } = require('mongodb')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const uri = 'mongodb+srv://People-Love:xU6yUbTmYsJnTWB7@cluster0.gjcbjqc.mongodb.net/Cluster0?retryWrites=true&w=majority'
const {v1:uuidv1} = require('uuid')
// const passportSetup = require("./passport.js");
// const authRoute = require("./routes/auth");
// const uri = "mongodb+srv://People-Love:BStar@951@cluster0.gjcbjqc.mongodb.net/?retryWrites=true&w=majority";


//Google Auth
// app.use(passport.initialize());
// app.use(passport.session());
// app.use(
//     cookieSession({
//         name:"session",
//         keys:["cyberwolve"],
//         maxAge:24*60*60*100,
//     })
// );

// app.use(passport.initialize());
// app.use(passport.session());

// app.use(
//     cors({
//         origin:"http:localhost:3000",
//         methods:"GET,POST,PUT,DELETE",
//         credentials:true,
//     })
// );
// app.use("/auth",authRoute);
// app.listen(port,() => console.log(`Listenting on ${PORT}...`));

//Google Auth Ends

const app = express()
app.use(cors())
app.use(express.json())
app.get('/',(req,res)=> {
    res.json('Peope Love')
})

app.post('/login',async(req,res)=>{
    const client = new MongoClient(uri)
    const {Student_email, password} = req.body
    try{
        await client.connect()
        const database = client.db('app-data') 
        const users = database.collection('users')
        const find_email = await users.findOne({Student_email})
        if(find_email && (await bcrypt.compare(password,find_email.hashed_password))){
            const SecureKeyToekn = jwt.sign(find_email,Student_email,{
                expiresIn:60*3
            })
            res.status(201).json({SecureKeyToekn,userid: find_email.user_id,Student_email:find_email.Student_email})
        }
        res.status(400).send('Wrong Email or password')

    }catch(error){
        console.log(error)
    }
})

app.put('/updateuser',async(req,res)=>{
    const client = new MongoClient(uri)
    const forminputdata = req.body.forminputdata
    console.log(forminputdata.firstname)
    try{
        await client.connect()
        const database = client.db('app-data') 
        const users = database.collection('users')

        const find_user = {user_id: forminputdata.user_id}
        const updateexistingUser = {
            $set:{
                user_id : forminputdata.user_id,
                firstname : forminputdata.firstname,
                lastname : forminputdata.LastName,
                date_of_birth_day : forminputdata.date_of_birth_day,
                date_of_birth_month : forminputdata.date_of_birth_month,
                date_of_birth_year : forminputdata.date_of_birth_year,
                show_gender : forminputdata.display_Gender,
                gender_identity : forminputdata.user_Gender,
                gender_interest : forminputdata.Gender_Interested,
                // email : cookie,
                url : forminputdata.image_url,
                about : forminputdata.about,
                matches :forminputdata.matches
            }
        }
        const updateddate = await users.updateOne(find_user,updateexistingUser)
        //res.status(201).json({SecureKeyToekn,userid : uuid ,Student_email: LcaseEmail})
        res.send(updateddate)
    }catch(error){
        console.log(error)
    }finally{
        await client.close()
    }
})

app.post('/signup',async(req,res)=> {
    const client = new MongoClient(uri)
    const {Student_email, password} = req.body
    const uuid = uuidv1()
    const Hpassword = await bcrypt.hash(password,10)
    try{
        await client.connect()
        const database = client.db('app-data') 
        const users = database.collection('users')
        const isexist =await users.findOne({Student_email})
        if(isexist){
            return res.status(409).send('Already registered')
        }
        else{
            // console.log(Student_email)
            // console.log(password)
            const LcaseEmail = Student_email.toLowerCase()
            const data = {
                user_id : uuid,
                Student_email : LcaseEmail,
                hashed_password : Hpassword

            }
            const DataInserted =  await users.insertOne(data)
            const SecureKeyToekn = jwt.sign(DataInserted,LcaseEmail,{
                expiresIn:60*3  
            })
            res.status(201).json({SecureKeyToekn,userid : uuid ,Student_email: LcaseEmail})

        }
    }catch(error){
        console.log(error)
    }
})
app.get('/users',async (req,res)=> {
    const client = new MongoClient(uri)
    try{
        await client.connect()
        const database = client.db('app-data') 
        const users = database.collection('users')
        const returnusers = await users.find().toArray()
        res.send(returnusers)
    }finally{
        await client.close()
    }
})

app.listen(PORT,() => console.log('Server running on',PORT))