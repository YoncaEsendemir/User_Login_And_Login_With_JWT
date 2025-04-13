const express = require("express");
const {register,login} = require("../controllers/authController.js");
const {authenticateToken } = require("../middlewares/authMiddleware.js");

const router = express.Router();

router.post("/register",register);
router.post("/login",login)

//örnek korunan route
/*
`/profile` GET rotası: Kullanıcı profili için
`authenticateToken`: Bu rotaya erişmek için token gerektirir
Callback fonksiyonu: Token doğrulandıktan sonra çalışır ve kullanıcı bilgisini döner
 */
router.get("/profile",authenticateToken,(req,res)=>{
  res.json({message:"Profile erişildi", user:req.user});
});

export default router;