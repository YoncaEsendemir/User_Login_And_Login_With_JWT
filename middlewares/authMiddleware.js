const authService = require("../services/authService");
const bodyParser= require("body-parser");


const register =  async (req,res)=>{
  const {name,email,password} = req.body;

  try{
    const result = await authService.registerUser(name,email,password);
    res.status(200).json(result);
  }
  catch(error){
    res.status(400).json({message:error.message});
  }
};


const login= async (req,res)=>{
    const {email,password}=req.body;
     try{
        const result = await authService.loginUser(email,password);
        res.status(200).json(result);
     }
     catch(error){
        res.status(400).json({message:error.message});
     }
}