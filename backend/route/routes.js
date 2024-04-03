const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const FileEncryption = require('../files/crypt');
const { body, validationResult } = require('express-validator');
const db = require('../db/db')
// const fileEncryptor = new FileEncryption(process.env.KEY);
// const saltRounds = 10; // Number of salt rounds for bcrypt hashing
require('dotenv').config();

// const key = '12345678123456781234567812345678'; // Ensure this is a 32-byte key
const fileEncryptor = new FileEncryption(process.env.KEY);

router.post('/signup', async (req, res) => {
    try {
        let { username, password, email } = req.body;
        if (username === undefined || password === undefined) {
            return res.status(400).json({ status: false, message: 'undefined Value' });
        }
        const _username = username.trim().toLowerCase()
        const _password = password.trim().toLowerCase()
        const _email = password.trim()
        if (!_username || !_password) {
            return res.status(400).json({ status: false, message: 'Username and password are required' });
        }

        // Encrypt the password before sending the response
        password = fileEncryptor.encrypt(password);
        result = await db.insertUser({ name: _username, password: _password, email: _email })
        res.json({ result: result });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
// router.post('/login',(req,res)=>{
// let {username,password} = req.body
// username = username
// password = fileEncryptor.encrypt(password);
// res.json({data:[username,password]})
// try {
//     // Assuming you have a UserModel
//     const user = await UserModel.findOne({ username: req.body.username });

//     // Check if user exists
//     if (!user) {
//         return res.status(401).json({ message: 'Invalid username or password' });
//     }

//     // Check if password matches
//     const passwordMatch = await bcrypt.compare(req.body.password, user.password);
//     if (!passwordMatch) {
//         return res.status(401).json({ message: 'Invalid username or password' });
//     }

//     // If everything is correct, return success response
//     res.json({ message: 'Login successful' });
// } catch (error) {
//     console.error('Error during login:', error);
//     res.status(500).json({ message: 'Internal server error' });
// }
// });


module.exports = router;
