const express = require('express')
const app = express()
const path=require("path")
const ejs=require("ejs")
const collection=require("./mongodb")

const templatePath=path.join(__dirname,'../templates')

app.use(express.json())
app.use(express.static('public'))
app.use(express.urlencoded({extended:false}))

app.set("view engine","ejs")
app.set("views", templatePath)



app.get("/", (req, res)=>{
    res.render("login")
})
app.get("/signup", (req, res)=>{
    res.render("signup")
})
app.get("/characters", (req, res)=>{
    res.render("characters")
})
app.get("/startgame", (req, res)=>{
    res.render("startgame")
})

app.post("/signup", async (req,res)=>{
    const data={
        name: req.body.name,
        password: req.body.password,
        email: req.body.email
    }

    const checking = await collection.findOne({ name: req.body.name })

    try{
        if (checking) {
            res.send("user details already exists")
        }
        else{
            await collection.insertMany([data])
            res.status(201).render("home", {
                naming: req.body.name
            });
        }
        }
    catch{
        res.send("wrong inputs")
    }

    
})

app.post("/login",async (req,res)=>{

    try {
        const check = await collection.findOne({ name: req.body.name })

        if (check.password === req.body.password) {
            res.status(201).render("home", { naming: `${req.body.password}+${req.body.name}` })
        }else {
            res.send("incorrect password")
        }
    } 
    catch {
        res.send("wrong details")
    }
})

app.post("/characters",async (req,res)=>{

    const id="648399ff5872200eb4f17e4b"
    await collection.updateMany({_id: id}, { $set: { speed: req.body.speed } }); // Ažuriranje svih dokumenata koji odgovaraju filteru
    await collection.updateMany({_id: id}, { $set: { control: req.body.control } });
    res.render("home")
  
})

app.post("/startgame",async (req,res)=>{

    const id="648399ff5872200eb4f17e4b"
    await collection.updateOne({_id: id}, { $set: { status:true} }); // Ažuriranje svih dokumenata koji odgovaraju filteru
   
    res.render("home")
  
})


app.listen(3000, ()=>{
    console.log("port connected");
})