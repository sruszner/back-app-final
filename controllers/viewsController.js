
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
            return await Contact.findByIdAndDelete(contact)
        } catch (error) {
            throw error;
        }
    }

    async update(contact){
        try {
            return await Contact.findOneAndUpdate(contact._id, {
                firstName: contact.firstName,
                lastName: contact.lastName,
                email: contact.email
            })
        } catch (error) {
            throw error;
        }
    } 
}

module.exports = new ContactControllers;