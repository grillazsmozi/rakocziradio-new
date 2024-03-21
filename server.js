const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const app = express()
const port = 3000

mongoose.connect('mongodb+srv://admin:admin@rakocziradio.4wm3zxb.mongodb.net/?retryWrites=true&w=majority&appName=RakocziRadio/musorlista')
const db = mongoose.connection

db.on('error', console.error.bind(console, 'MongoDB connection error.'))

db.once('open', () => {
    console.log('Sikeresen csatlakozva adatbázishoz!')
})

const musicSchema = new mongoose.Schema({
    name: String,
    date: Date,
    bonus: Boolean,
})

const Music = mongoose.model('Music', musicSchema)

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})

// START OF ENDPOINTS

app.get("/musorlista", (req, res) => {
    res.sendFile(__dirname + '/public/musorlista.html')
  });
  
  app.get("/rolunk", (req, res) => {
    res.sendFile(__dirname + '/public/rolunk.html')
  });
  
  app.get("/kapcsolat", (req, res) => {
    res.sendFile(__dirname + '/public/kapcsolat.html')
  });
  
  app.get("/fooldal", (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
  });

  app.get("/admin/dashboard-login", (req, res) => {
    res.sendFile(__dirname + '/public/admin/login.html')
  });

// 404 ROUTE || DONT GO BELOW

app.get('*', function(req, res){
    res.status(404).sendFile(__dirname + '/public/404.html');
});

// END OF ENDPOINTS

app.listen(port, () => {
    console.log(`App listening at localhost:${port}`)
})