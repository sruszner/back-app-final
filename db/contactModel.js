const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const contactSchema = new Schema({
    firstName: {
        type: 'string',
        required: true
    },
    lastName: {
        type: 'string',
        required: true
    },
    username: {
        type: 'string',
        required: true
    },
    email: {
        type: 'string',
        required: true
    },
    address: {
        type: 'string',
        required: true
    },
    country: {
        type: 'string',
        required: true
    },
    zip: {
        type: 'string',
        required: true
    },
    plan: {
        type: 'string',
        required: true
    },
    message: {
        type: 'string',
        required: true
    },
    metOn: {
        type: 'string',
        required: true
    }
});

const Contact = mongoose.model('contact', contactSchema);

module.exports = Contact;    
