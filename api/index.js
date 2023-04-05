const express=  require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const fs = require('fs');

const uploadMiddleware = multer({ dest: 'uploads' })
const startConnection  = require('./dbConnect');

const UserModal = require('./Schema/UserSchema');
const PostModel =  require('./Schema/PostSchema');

const salt = bcrypt.genSaltSync(12);
const secretKey = 'secret123';

const app = express();
startConnection();

app.use(cors({credentials:true, origin:"http://localhost:5173"}));
app.use(express.json());
app.use(cookieParser());
app.use("/uploads",express.static(__dirname +"/uploads"));

app.get("/",(req,res)=>{
    res.send("hii")
});

//check if email Id is available
// app.get("/uniqueUser", (req,res)=>{
// })

app.get("/userProfile", async(req,res)=>{
    const { token } = req.cookies;
    if(token){
        jwt.verify(token, secretKey,{},(err,info)=>{
            if(err){
                throw err;
            }
            res.json(info);
        })
    }else{
        res.json({message:'unknown User'})
    }
})

app.post("/logout",async(req,res)=>{
    res.cookie('token','').json("ok");
})

app.post("/register",async (req,res)=>{
    const {email, password} = req.body;
    const hashedPassword = bcrypt.hashSync(password,salt);

    try{
        const userDoc = await UserModal.create({email, password: hashedPassword});
        res.json(userDoc);
    }
    catch(e){
        res.status(400).json({message:e})
    }

});

app.post("/login",async (req,res)=>{
    const { email, password } = req.body;
    if(password === ""){
        res.json("enter Password")
    }
    const userDoc = await UserModal.findOne({email});
    if(userDoc){
        const isSame = bcrypt.compareSync(password, userDoc.password);
        if(isSame){
            const jwtResopnse = jwt.sign({email, id:userDoc._id},secretKey);
            res.cookie("token",jwtResopnse).json({message:"ok"}).status(200);
        }else{
            res.status(400).json({message:'Incorrect Password'})
        }
    }else{
        res.json('User not Found');
    }
});

app.post("/post",uploadMiddleware.single('file'), async(req,res)=>{
    try{
        const{ originalname, path } = req.file;

        const parts = originalname.split(".");
        const ext = parts[parts.length-1];
        const newPath = path+'.'+ext;
        fs.renameSync(path, newPath);

        const {title, content, summary} = req.body;
        console.log(title);
        const postDoc = await PostModel.create({title, content, summary,cover:newPath});
        res.status(200).json(postDoc);

        // jwt.verify(token,secretKey,{},async (err,info)=>{
        //     if(err) throw err;
        // })

    }catch(e){
        res.json(e);
    }
   
});

app.get("/getPost",async (req,res)=>{
    const posts = await PostModel.find();
    res.json(posts);
})

app.listen(4000,()=>console.log("Sever is running"))

//I9diIH4kNos4tHyp
//mongodb+srv://rahulrawatwork:<password>@cluster0.bfdqy4c.mongodb.net/?retryWrites=true&w=majority