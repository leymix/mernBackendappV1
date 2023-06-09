const {User}=require("../models/user")
const express=require("express");
const router=express.Router();
const bcrypt=require("bcrypt")
const jwt=require('jsonwebtoken')
require("dotenv").config();
const secret=process.env.secret;
router.get("/", async (req,res)=>{
    const userList=await User.find().select("-passwordHash");
    if(!userList){
        res.status(500).json({succes:false})

    }
    res.send(userList);

})
router.get("/:id", async (req,res)=>{
    const user= await User.findById(req.params.id).select("-passwordHash");
    if(!user){
       return res.status(500).json({message:"the user with the given ID was not"})
    }
    res.status(200).send(user);
})

router.post("/",async(req,res)=>{
    let user=new User({
        name:req.body.name,
        email:req.body.email,
        color:req.body.color,
        passwordHash:bcrypt.hashSync(req.body.password,10),
        phone:req.body.phone,
        isAdmin:req.body.isAdmin,
        apartment:req.body.apartment,
        street:req.body.street,
        zip:req.body.zip,
        city:req.body.city,
        country:req.body.country,
    })
    user =await user.save();
    if(!user)
    {return res.status(404).send('the user cannot be created!')}

    res.status(200).send(user);
})
router.post("/login",async(req,res)=>{
    const user=await User.findOne({email:req.body.email})
    if(!user){
        return res.status(400).send('The user not found');
    }
    if(user && bcrypt.compareSync(req.body.password,user.passwordHash)){
        const token=jwt.sign(
            {
                userId:user.id
            },
            secret,{expiresIn:"1d"}
        )
        res.status(200).send({user:user.email,token:token})
    }else{
         res.status(400).send("password is wrong")
    }
   
})
module.exports=router;