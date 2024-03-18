const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/public/fooldal.html")
})

app.listen(port, () => {
  console.log(`Express app listening on port ${port}`)
})