const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
require('./db/connection')

const PORT = process.env.PORT || 3001;

const app = express();
const ContactControllers = require('./controllers/viewsController');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
/* app.use(cors({
    origin: 'https://front-app-final.netlify.app/'
})); */

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

app.listen(PORT, ()=>{
    console.log(`Servidor corriendo en el Puerto: ${PORT}`);
})