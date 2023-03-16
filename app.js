const express=require("express");
const bodyParser=require("body-parser")
const app=express();
const morgan=require("morgan");
const mongoose=require("mongoose");
const cors=require("cors");
const autJwt=require("./helpers/jwt")

require("dotenv").config();
const api=process.env.API_URL;

app.use(cors());
app.options('*',cors());




//middleware
app.use(bodyParser.json());
app.use(morgan('tiny'));//morgan ms calculator
//app.use(autJwt)

//routes
const categoriesRoutes=require("./routes/categories");
const productsRoutes=require("./routes/products");
const usersRoutes=require("./routes/users");
const ordersRoutes=require("./routes/orders");



app.use(`${api}/categories`,categoriesRoutes)
app.use(`${api}/products`,productsRoutes)
app.use(`${api}/users`,usersRoutes)
app.use(`${api}/orders`,ordersRoutes)









//http://localhost:3000/api/v1/products

mongoose.connect(process.env.CONNECTION_STRING,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    dbName:"eshop-database"
})
.then(()=>{
    console.log("Database Connection is ready...");
})
.catch((err)=>{
    console.log("Database connection is failed:"+err)
})
app.listen(3000,()=>{
    
   console.log("server is running http://localhost:3000") 
})