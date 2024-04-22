const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config/config')
const User = require('../models/user');


//Signup / registrasi
exports.signup = async (req, res) => {
    try{
        const { email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ email, password: hashedPassword});
        await user.save();
        res.status(200).json({ message: 'User created' })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

//Login/ masuk

exports.Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user){
            return res.status(401).jso({ message: 'Authentication Failed'})
        }
        const ifPasswordValid = await bcrypt.compare(password, user.password);
        if (!ifPasswordValid) {
            return res.status(401).json({ message: 'Authentication Failed'})
        }
        const token = jwt.sign({ userId: user._id, email: user.email }, config.secretKey, { expiresIn: '1h'});
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}