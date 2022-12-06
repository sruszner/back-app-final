require('dotenv').config();
const User = require('../db/User');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const crypto = require('crypto');


const handleForgotPassword = async (req, res) => {

    const userFront = req.body.email;

    if (!req.body.email) return res.status(400).json({ 'message': 'Username is required.' });

    try {
        const foundUser = await User.findOne({ username: userFront }).exec();
        if (!foundUser) {
            return res.status(403).send({
                message: 'User email doesn´t exist'
            })
        }

        const token = crypto.randomBytes(29).toString('hex');
        const resetToken = jwt.sign({ username: foundUser.username }, token, { expiresIn: '1h'});

        foundUser.resetToken = resetToken;
        const result = await foundUser.save();

        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: 'spafrancorchampsapp@gmail.com',
                pass: 'quodedvuvzpzcrqw'
            }
        });

        var mailOptions = {
            from: 'spafrancorchapsapp@gmail.com',
            to: foundUser.username,
            subject: 'SPA Circuit - Forgot PASS',
            html: (`Follow next link to refresh your pass: https://front-app-final.netlify.app/resetpass/${resetToken}`)
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        res.status(201).json({ 'success': `FORGOT PASS DATA SENT ${foundUser.username} ` });

    } catch (error) {
        res.status(500).send({
            message: 'Error has ocurred',
            error
        })
    }

}

module.exports = { handleForgotPassword } 