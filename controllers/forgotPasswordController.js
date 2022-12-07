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

        let mensajeHtml = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
        
            <style>
                p, a, h1, h2, h3, h4, h5, h6 {font-family: 'Roboto', sans-serif !important;}
                h1{ font-size: 30px !important;}
                h2{ font-size: 25px !important;}
                h3{ font-size: 18px !important;}
                h4{ font-size: 16px !important;}
                p, a{font-size: 15px !important;}
        
                .claseBoton{
                    width: 10%;
                        background-color: #ff0000;
                        color: #ffffff; 
                        padding: 16px 32px;
                        text-align: center;
                        text-decoration: none;
                        font-weight: bold;
                        display: inline-block;
                        font-size: 16px;
                        margin: 4px 2px;
                        transition-duration: 0.4s;
                        cursor: pointer;
                }
                .claseBoton:hover{
                    background-color: #000000;
                    color: #ffffff;
                }
                .imag{
                    width: 20px;
                    height: 20px;
                }
                .contA{
                    margin: 0px 5px 0 5px;
                }
                .afooter{
                    color: #ffffff !important; 
                    text-decoration: none;
                    font-size: 13px !important;
                }
            </style>
        </head>
        <body>
            <div style="width: 100%; background-color: #e3e3e3;">
                <div style="padding: 20px 10px 20px 10px;">
                    <!-- Imagen inicial -->
                    <div style="background-color: #000000; padding: 10px 0px 10px 0px; width: 100%; text-align: center;">
                        <img src="cid:pretwor" alt="" style="width: 200px; height: 60px;">
                    </div>
                    <!-- Imagen inicial -->
        
                    <!-- Contenido principal -->
                    <div style="background-color: #ffffff; padding: 20px 0px 5px 0px; width: 100%; text-align: center;">
                        <h1>Reset Password</h1>
                        <p>To change your password, click on the button below.</p>
        
                        <!-- Gracias -->
                        <p>If you have not requested a change of password, please ignore this email</p>
                        <p style="margin-bottom: 50px;"><i>Sincerely:</i><br>SPA Circuit</p>
        
                        <!-- Botón -->
                        <a style="color: #ffffff" class="claseBoton" href="https://front-app-final.netlify.app/resetpass/${resetToken}">Reset Password</a>
                    </div>
                    <!-- Contenido principal -->
        
                    <!-- Footer -->
                    <div style="background-color: #282828; color: #ffffff; padding: 5px 0px 0px 0px; width: 100%; text-align: center;">
                        <!-- Redes sociales -->
                        <a href="https://es-la.facebook.com/circuitspa" class="contA"><img src="cid:fb" class="imag" /></a>
                        <a href="https://www.instagram.com/circuit_spa_francorchamps" class="contA"><img src="cid:ig" class="imag" /></a>
                        <a href="https://wa.me/1137759112" class="contA"><img src="cid:wapp" class="imag" /></a>
                        <a href="mailto:spafrancorchampsapp@gmail.com" class="contA"><img src="cid:em" class="imag" /></a>
                        <!-- Redes sociales -->
        
                        <h4>Support</h4>
                        <p style="font-size: 13px; padding: 0px 20px 0px 20px;">
                            Contact us through the following channels:<br>
                            Mail: <a class="afooter" href="mailto:spafrancorchampsapp@gmail.com">spafrancorchampsapp@gmail.com</a><br>
                            Whatsapp: <a class="afooter" href="https://wa.me/5491137759112">+54 9 11 3775 9112</a><br>
                        </p>
                        <p style="background-color: black; padding: 10px 0px 10px 0px; font-size: 12px !important;">
                            © 2022 SPA Francor-champs, all rights reserved.
                        </p>
                    </div>
                    <!-- Footer -->
                </div>
            </div>
        </body>
        </html>`;
        // Plantilla de correo

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
            from: '"SPA Circuit" spafrancorchapsapp@gmail.com',
            to: foundUser.username,
            subject: 'SPA Circuit - Forgot PASS',
            html: mensajeHtml,
            attachments: [
                {
                    filename: 'fb.png',
                    path: './assets/fb.png',
                    cid: 'fb' //same cid value as in the html img src
                },
                {
                    filename: 'ig.png',
                    path: './assets/ig.png',
                    cid: 'ig' //same cid value as in the html img src
                },
                {
                    filename: 'wapp.png',
                    path: './assets/wapp.png',
                    cid: 'wapp' //same cid value as in the html img src
                },
                {
                    filename: 'em.png',
                    path: './assets/em.png',
                    cid: 'em' //same cid value as in the html img src
                },
                {
                    filename: 'pretwor.png',
                    path: './assets/pretwor.png',
                    cid: 'pretwor' //same cid value as in the html img src
                    }
                ],
        };
  /*       (`Follow next link to refresh your pass: http://localhost:3000/resetpass/${resetToken}`) */

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