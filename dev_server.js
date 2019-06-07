const express = require('express')
const path = require('path')
const app = express()
const PORT = process.env.PORT || 3000

// body parsing middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// static middleware
app.use(express.static(path.join(__dirname, './')))

app.get('*', (err, thing)=>{

})

// error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(err.status || 500).send(err.message || 'Internal server error')
})

app.listen(PORT, () => console.log(`content dev server serving on port ${PORT}`))
