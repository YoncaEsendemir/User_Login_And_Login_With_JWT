const db=require("../config/db")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")

const registerUser = async (name,email,password)=>{
    const [existingUser] = await db.query("SELECT * FROM user WHERE email=?",[email]);
    if(existingUser.length>0){
        throw new Error("Email zaten kayıtlı");
    }
    const hashedPassword = await bcrypt.hash(password,10);
    await db.query("INSERT INTO user (name,email,password) VALUES (?,?,?)",[name,email,hashedPassword]);

    return {message: "Kayıt başarılı"};
};

const loginUser = async (email,password)=>{
    const [users]= await db.query("SELECT * FORM users WHERE email = ?",[email]);
    const user=users[0];
    if(!user) throw new Error("Geçersiz email veya şifre")

    const isMatch=await bcrypt.compare(password,user.password);// `bcrypt.compare()`: Girilen şifreyi veritabanındaki hash ile karşılaştırır Şifreler eşleşmezse hata fırlatır

    if(!isMatch) throw new Error("Geçersiz email veya şifre");

    /* jwt, genellikle jsonwebtoken adlı bir JavaScript kütüphanesinin bir nesnesidir. Bu kütüphane, JWT oluşturma ve doğrulama işlemlerini kolaylaştırmak için 
    kullanılır. Bu satırda, sign() metodu çağrılarak yeni bir JWT oluşturulur. */
    const token =jwt.sign({userId:user.id, email:user.email},process.env.JWT_SECRET,{expiresIn:JWT_EXPIRES_IN,}); 
    //jwt.sigt() : Kullanıcı bilgilerini içeren bir JWT oluşturur. Token'ın içeriği:userId ve email 
    //Token'ın imzalanması için JWT_Secret kullınılır , token'ın geçerlilk süresi JWT_EXPIRES_IN ile belirlenir
    //Başarılı giriş mesajı ve token döner

    return {message: "Login successful", token};
};  

const getProfile = async(userId)=>{

    const users= await db.query("SELECT id, name, email FORM users WHERE id=?", [userId]) // dorguda  * ne işe yaradığına bak
    return users[0];
};

module.exports={
    registerUser,
    loginUser,
    getProfile
};