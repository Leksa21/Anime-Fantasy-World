const mongoose=require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/AnimeFantasyWorld")
.then(()=>{
    console.log("mongodb connected")
})
.catch(()=>{
    console.log("failed to connect")
})

const UserSchema=new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    status: Boolean,
    avatar: String,
    rank: String,
    clan: Number,
    camp: Number,
    gold: Number,
    crystal: Number,
    health: Number,
    energy: Number,
    mana: Number,
    abilityPoints: Number,
    speed: Number,
    strength: Number,
    control: Number,
    skillPoints: Number,
    skills: Number,
    cards: Array
})


const collection=new mongoose.model("Users",UserSchema)

module.exports=collection