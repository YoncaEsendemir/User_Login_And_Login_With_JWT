const express =require("express");
const dotenv =require("dotenv");
const authRoutes =require("./routes/authRoutes")

dotenv.config();  //.env dosyasındaki değişkenleri process.env üzerinden kullanılabilir hale getirir.
//.env dosyasını okur ve içindeki değişkenleri `process.env` nesnesine ekler
const app = express();

//Middleware: gelen JSON veriyi parse et 
app.use(express.json());// gelen JSON veriyi parse et
//Gelen HTTP isteklerinin gövdesindeki JSON verilerini otomatik olarak JavaScript nesnelerine dönüştürür

//Routes
//Bu satırda gelen istekler /api/auth ile başlıyorsa, onları authRoutes modülüne yönlendiriyoruz.
app.use("/api/auth", authRoutes);

//Başlat 
//Burada amaç, .env dosyasında tanımlı bir PORT değeri varsa onu, yoksa varsayılan bir değer kullanmaktır
const  PORT = process.env.PORT || 3000  // .env'den PORT varsa onu, yoksa 3306 kullan

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);  // Başarılı şekilde sunucu başladı mesajı
  });