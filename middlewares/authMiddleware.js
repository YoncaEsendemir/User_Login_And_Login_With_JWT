// middleware 
/* Middleware, Express'te req ve res nesneleri arasına girip işlemler yapar. Örnek: Token kontrolü, loglama, hata yönetimi, erişim kontrolü... */

const jwt = require("jsonwebtoken") //JSON Web Token oluşturmak ve doğrulamak için kullanılan modül
const dotenv = require("dotenv")

dotenv.config();

const authenticateToken = (req,res,next)=>{
    /*`authenticateToken`: Token doğrulama middleware'i
`req.headers["authorization"]`: İstek başlığından Authorization değerini alır
`authHeader.split(" ")[1]`: "Bearer TOKEN" formatındaki değerden sadece TOKEN kısmını alır
Token yoksa 401 (Unauthorized) durum kodu döner
     */

    const authHeader= req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if(!token){
         return res.status(401).json({message:"Erişim rededildi Geçersiz token !"})  
    }

    /*`jwt.verify()`: Token'ı doğrular
Token geçersizse 403 (Forbidden) durum kodu döner
Token geçerliyse, token içindeki kullanıcı bilgisini `req.user` olarak ekler
`next()`: Sonraki middleware veya route handler'a geçers */
    jwt.verify(token, process.env.JWT_SECRET,(err,user)=>{
        if(err){
            return res.status(403).json({message:"Geçersiz token"});
        }
      
 req.user=user // isteğe kullanıcıya ekle
 next();  // Devam et 
    });
};  

module.exports = {authenticateToken};