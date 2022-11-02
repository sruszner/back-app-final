const express = require('express');
const dotenv = require('dotenv').config();
const nodemailer = require('nodemailer');
const cors = require('cors');
require('./db/connection')

const PORT = process.env.PORT || 3001;

const app = express();
const ContactControllers = require('./controllers/viewsController');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
/*     origin: 'https://front-app-final.netlify.app/' */
/* origin: 'http://localhost:3000' */
}));

app.get('/', async (req, res) => {
    res.json({
        contact: await ContactControllers.findAll()
    }); 
});

app.post('/create', async (req, res) => {
    console.log(req.body);
        await ContactControllers.create(req.body);
    res.json('Contact created')
});

app.post('/delete', async (req, res) => {
    console.log(req.body);
        await ContactControllers.delete(req.body);
    res.json('Contact deleted')
});

app.post('/update', async (req, res) => {
    console.log(req.body);
        await ContactControllers.update(req.body);
    res.json('Contact updated')
});

app.post('/subscribed', async (req, res) => {
    console.log(req.body);
        await ContactControllers.subscribed(req.body);
    res.json('Subscribed! Check your email')
});

app.listen(PORT, ()=>{
    console.log(`Servidor corriendo en el Puerto: ${PORT}`);
})