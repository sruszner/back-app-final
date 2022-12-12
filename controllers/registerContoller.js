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

                const email = user;
                let data = {
                    email: email,
                    plan: "Basic"
                }

                
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
                        <h1>New registered user</h1>
                        <p>Thank you so much for your registration, ${data.email} </p>
        
                        <p>It means a lot to us. We really appreciate you taking a moment of your time today.</p>
                        <p style="margin-bottom: 50px;"><i>Sincerely:</i><br>SPA Circuit</p>
        
                        <!-- Botón -->
                        <a style="color: #ffffff" class="claseBoton" href="https://front-app-final.netlify.app/login">Login</a>
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
            to: data.email,
            subject: 'Registered',
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
        
                transporter.verify(function (error, success) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log("Server is ready to take our messages");
                    }
                });

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
