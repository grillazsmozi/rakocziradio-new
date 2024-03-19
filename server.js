const express = require('express')
const app = express()
const mongoose = require('mongoose')
const port = 3000

app.get('/', (req, res) => {
  try {
    res.sendFile(__dirname + "/public/index.html")
  } catch (error) {
    res.statusCode(500).send('Internal Server Error (500)')
    console.log(error)
  }
})

mongoose.connect('mongodb+srv://admin:admin@rakocziradio.4wm3zxb.mongodb.net/?retryWrites=true&w=majority&appName=RakocziRadio')
.then(() => {
  console.log('Csatlakozva az adatbázishoz!')
})

const uzenetSchema = new mongoose.Schema({
  from: String,
  to: { type: String, default: '*' },
  message: String,
  date: { type: Date, default: Date.now },
})

const Uzenet = mongoose.model('Üzenet', uzenetSchema, 'messages')


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

app.post("/sendMessage", async (req, res) => {
  try {
    const { to, from, msg } = req.body
    const date = Date.now()
    const newMsg = new Uzenet({ from, to, msg, date })
    await newMsg.save()
    res.redirect('/')
  } catch (error) {
    console.error(error)
    res.status(500).send('Internal Server Error')
  }
})

app.get("/messages", async (req, res) => {
    try {
      const msgs = await Uzenet.find()
      res.json(msgs)
    } catch (error) {
      console.error(error)
      res.status(500).send('Internal Server Error')
    }
})
app.listen(port, () => {
  console.log(`Szerver online a ${port}-es porton.`)
})