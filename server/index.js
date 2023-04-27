const express = require('express')
const path = require('path')
const workouts = require('./controllers/workouts')
const app = express()

const hostname = '127.0.0.1';
const port = process.env.PORT || 3000;

app
    .use(express.json())
    .use(express.static(path.join(__dirname, '../client/dist')))

    .use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
        next()
    })

app
    .get('/api/v1/', (req, res) => {
        res.send('Hello World! From Express')
    })
    .use('/api/v1/workouts', workouts)
    
app.listen(port, () => 
    console.log(`Server running at http://${hostname}:${port}/`)
);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'))
})

app
    .use((err, req, res, next) => {
        console.error(err);
        const msg = {
            status: err.code || 500,
            error: err.message || 'Internal Server Error',
            isSuccess: false
        }
        res.status(msg.status).json(msg)
    })
