const authService = require("../services/authService");

// 401 (yetkisiz) 401 Yetkisiz " durum kodu, isteğin geçerli kimlik doğrulama kimlik bilgilerinden yoksun olduğunu gösterir
//403 (yasak) 403 Yasak " durum kodu, sunucunun isteği anladığını ancak yerine getirmeyi reddettiğini gösterir
/*
403 durum kodunun farklı bir anlamı vardır. İstemciye, " Kim olduğunuzu biliyorum, ancak buraya girmenize izin verilmiyor. " der. İstemci geçerli kimlik doğrulama bilgileri sağlasa bile, istemcinin istenen kaynağa erişim izni yoksa sunucu yine de 403 döndürebilir.

403 durum kodunun farklı bir anlamı vardır. İstemciye, " Kim olduğunuzu biliyorum, ancak buraya girmenize izin verilmiyor. 
" der. İstemci geçerli kimlik doğrulama bilgileri sağlasa bile, istemcinin istenen kaynağa erişim izni yoksa sunucu yine de 403 döndürebilir.
Örneğin, bir kullanıcı bir web sitesine erişmek için kimlik doğrulaması yapmış olabilir ancak bir yönetici sayfasını görüntülemek için gerekli 
izinlere sahip olmayabilir. Bu gibi durumlarda, 403 durumu uygun olacaktır.
*/
 const register =  async (req,res)=>{
  const {name,email,password} = req.body; //İstek gövdesinden email ve password değerlerini alır

  try{
    const result = await authService.registerUser(name,email,password);
    res.status(201).json(result);  // 201 tekili başarılı bir şekide giriş yaptı 
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
        res.status(401).json({message:error.message});
     }
}


module.exports={
    register,
    login
}