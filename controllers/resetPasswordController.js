const User = require('../db/User');
const bcrypt = require('bcrypt');



const handleResetPassword = async (req, res) => {
        try {
            req.body.userPassword = await bcrypt.hash(req.body.userPassword, 10);
            const foundUser = await User.findOne({ resetToken: req.body.params }).exec();
            if (!foundUser) {
                return res.status(403).send({
                    message: 'Error'
                })
            }
            foundUser.password = req.body.userPassword;
            const result = await foundUser.save();

            res.status(201).send({
                message: 'Password updated'
            })
            
        } catch (error) {
            res.status(500).send({
                message: 'error',
                error
            })
        }
    }

module.exports = {handleResetPassword}