const logTransaction = require("../utils/logTransaction");
const postToTargets = require("../utils/postToTargets");

const crmSync = (req, res) => {
    try {
        const { email, source, targets } = req.body;
        if(!email || !source || !targets || !Array.isArray(targets) || targets.length === 0) {
            return res.status(400).json({ message: 'Invalid request data' });
        }
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }
        
        const transaction = {
            email,
            source,
            targets,
            date: new Date().toISOString()
        }

        logTransaction(transaction)
        postToTargets(targets, email);
        res.status(200).json({ message: 'CRM sync complete', transaction });

    } catch (error) {
        res.status(400).json({message : `Error: ${error}`});
    }

};



module.exports = {
    crmSync
};   