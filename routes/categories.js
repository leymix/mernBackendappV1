const {Category}=require("../models/category")
const express=require("express");
const router=express.Router();
router.get("/", async (req,res)=>{
    const categoryList=await Category.find();
    if(!categoryList){
        res.status(500).json({succes:false})

    }
    res.send(categoryList);

})
router.post("/",async(req,res)=>{
    let category=new Category({
        name:req.body.name,
        icon:req.body.icon,
        color:req.body.color,
    })
    category =await category.save();
    if(!category)
    {return res.status(404).send('the category cannot be created!')}

    res.status(200).send(category);
})



router.get("/:id",async (req,res)=>{
 const category=await Category.findById(req.params.id);
 if(!category){
    res.status(500).json({message:"The category with the given ID was not found."})
 }
 res.status(200).send(category);
})
router.put("/:id", async (req,res)=>{
    const category= await Category.findByIdAndUpdate(
        req.params.id,
        {
            name:req.body.name,
            icon:req.body.icon,
            color:req.body.color,
        },
        {new:true}
        )
        if(!category)
    {return res.status(404).send('the category cannot be updated!')}
    res.status(200).send(category)
        
    
})
router.delete("/:id",async (req,res)=>{
    Category.findByIdAndRemove(req.params.id).then(category=>{
        if(category){
            return res.status(200).json({succes:true,message:"the category is deleted"})
        }else{
            return res.status(404).json({succes:false,message:"category not found!"})
        }
    }).catch(err=>{
        return res.status(400).json({succes:false ,error:err})
    })
})
module.exports=router;