import express from 'express'
import router from './src/routes/index'
import { db } from './src/config/db'

const app = express()

const port = 3007

app.use(express.json())

app.use('/api', router)

app.get('/', (req, res) => {
    res.send({
        message: "Welcome"
    })
})


app.listen(port, () => {
    console.log(`Serving at ${port}`)
})


try {
    db.sync({ force: true , alter: true})
    db
        .authenticate()
        .then(() => {
            console.log('Connection has been established successfully.');
        })
        .catch(err => {
            console.error('Unable to connect to the database:', err);
        });
} catch (error) {
    console.error('Unable to connect to the database:', error);
}


export default app
