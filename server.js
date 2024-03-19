const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  try {
    res.sendFile(__dirname + "/public/index.html")
  } catch (error) {
    res.statusCode(500).send('Internal Server Error (500)')
    console.log(error)
  }
})

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

app.listen(port, () => {
  console.log(`Express app listening on port ${port}`)
})