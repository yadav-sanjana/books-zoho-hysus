import express from 'express'
import { db } from './src/config/db'
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome' });
});

try {
    db.sync({ force: false, alter: true })
    db
        .authenticate()
        .then(() => {
            console.log('Connection has been established successfully.');
        })
        .catch(err => {
            console.log('Unable to connect to the database:', err);
        });
} catch (error) {
    console.log('Unable to connect to the database:', error);
}

afterAll(async () => {
    await db.close();
    console.log('Database connection closed.');
});
export default app
