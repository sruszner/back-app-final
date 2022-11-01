
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
}

module.exports = new ContactControllers;