const express = require('express')
const path = require('path')
const workouts = require('./controllers/workouts')
const app = express()

const hostname = '127.0.0.1';
const port = process.env.PORT || 3000;

app
    .use(express.json())
    .use(express.static(path.join(__dirname, '../client/dist')))

app
    .get('/api/v1/', (req, res) => {
        res.send('Hello World! From Express')
    })
    .use('/api/v1/products', workouts)
    
app.listen(port, () => 
    console.log(`Server running at http://${hostname}:${port}/`)
);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'))
})