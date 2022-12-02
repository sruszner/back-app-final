const User = require('../db/User');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

const handleNewUser = async (req, res) => {
    const { user, pwd } = req.body;
    if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password are required.' });

    // check for duplicate usernames in the db
    const duplicate = await User.findOne({ username: user }).exec();
    if (duplicate) return res.sendStatus(409); //Conflict 

    try {
        //encrypt the password
        const hashedPwd = await bcrypt.hash(pwd, 10);

        //create and store the new user
        const result = await User.create({
            "username": user,
            "password": hashedPwd
        }); 

        let data = {
            email: user,
            plan: "Basic"
        }

        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                AdminUser: 'spafrancorchampsapp@gmail.com',
                pass: 'quodedvuvzpzcrqw'
            }
        });

        transporter.verify(function (error, success) {
            if (error) {
                console.log(error);
            } else {
                console.log("Server is ready to take our messages");
            }
        });

        var mailOptions = {
            from: 'spafrancorchapsapp@gmail.com',
            to: data.email,
            subject: 'SPA Circuit - Registered',
            html: ('<h3>Thank you for registering on our website, ' + data.email + '</h3>' + ' <p>it means a lot to us. We really appreciate you taking a moment of your time today.</p>')
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        res.status(201).json({ 'success': `New user ${user} created!` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = { handleNewUser };
