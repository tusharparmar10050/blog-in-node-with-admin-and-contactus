const con = require('../../config/database.js')
const contactusModule = require('../../modules/contactus.js')

const ContactUs = () => {
    return {

        createcontactus: async (req, res) => {
            const email = req.body.email
            const value = [req.body.name, req.body.email, req.body.phone, req.body.message]
            const response = await contactusModule.createContactus(value, email)
            console.log("response", response)
            return res.status(200).json(response);

        },

        allcontactus: (req, res) => {
            contactusModule.getcontactUs(function(error, data) {
                if (error) {
                    return res.status(500).json({
                        message: 'Error getting contact information',
                        error: error
                    });
                }
                console.log(data)
                return res.status(200).json(data);
            })
        },
    }
}

module.exports = ContactUs