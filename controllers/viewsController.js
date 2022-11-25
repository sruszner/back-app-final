const nodemailer = require('nodemailer');
const Contact = require('../db/contactModel');

class ContactControllers {

    async findAll(){
        try {
            return await Contact.find()
        } catch (error) {
            throw error;
        }
    }

    async create(contact){
        try {
            return await Contact.create(contact)
        } catch (error) {
            throw error;
        }
    }

    async delete(contact){
        try {
            const filter = contact._id
            return await Contact.findByIdAndDelete(filter)
        } catch (error) {
            throw error;
        }
    }

    async update(contact){
        try {
            const filter = contact._id
            return await Contact.findByIdAndUpdate(filter, {
                firstName: contact.firstName,
                lastName: contact.lastName,
                email: contact.email
            })
        } catch (error) {
            throw error;
        }
    } 

/*     
    async auth(contact){
        try {
            const filter = contact.email
            return await Contact.findOne({email : filter}, {
                firstName: contact.firstName,
                lastName: contact.lastName,
                email: contact.email
            })
        } catch (error) {
            throw error;
        }
    } 
 */

    async subscribed(contact){
        try {
            console.log(contact.email);
            const email = contact.email;
            let data = {
                email: email,
                plan: "Basic"
            }

            let transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 465,
                secure: true,
                auth: {
                    user: 'spafrancorchampsapp@gmail.com',
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
                subject: 'SPA Circuit - Subscribed',
                html: ('<h3>Thank you so much for your subscription, ' + data.email + '</h3>' + ' <p>it means a lot to us. We really appreciate you taking a moment of your time today.</p>')
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });

        } catch (error) {
            throw error;
        }
    }
}

module.exports = new ContactControllers;