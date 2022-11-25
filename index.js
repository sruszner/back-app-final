const express = require('express');
const dotenv = require('dotenv').config();
const nodemailer = require('nodemailer');
const cors = require('cors');
require('./db/connection')
const credentials = require('./middleware/credentials');
const corsOptions = require('./config/corsOptions');
const ROLES_LIST = require('./config/roles_list');
const verifyRoles = require('./middleware/verifyRoles');

const PORT = process.env.PORT || 3001;
const app = express();
const ContactControllers = require('./controllers/viewsController');
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(credentials);
app.use(cors(corsOptions));

app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));
app.use('/refresh', require('./routes/refresh'));
app.use('/logout', require('./routes/logout'));

app.post('/subscribed', async (req, res) => {
    console.log(req.body);
    await ContactControllers.subscribed(req.body);
    res.json('Subscribed! Check your email')
});

app.post('/register', async (req, res) => {
    console.log(req.body);
    await ContactControllers.auth(req.body);
    res.json('auth')
});

app.post('/create', async (req, res) => {
    console.log(req.body);
    await ContactControllers.create(req.body);
    res.json('Contact created')
});
app.use(verifyJWT);

app.get('/', async (req, res) => {
        res.json({
            contact: await ContactControllers.findAll()
        });
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

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el Puerto: ${PORT}`);
})