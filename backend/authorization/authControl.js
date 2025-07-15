const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10); // here, the 10 is for salt, we could increase more, but it will take much time to make this a bigger , so, with great security comes great time to sacrifice
        const user = await User.create({ name, email, password: hashedPassword });
        res.status(201).json({ message: "User registered", user });
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ error: 'invalid email! try again with a different one' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ error: 'invalit password! try again' });

        const accessToken = jwt.sign(
            { name: user.name, email: user.email },
            process.env.ACCESS_TOKEN_SECRET
        ); // copy this JWT, will be useful to bypass the authorisation as it always changes to keep it difficult to crack
        // Friends reference ;>
        res.json({
            message: `How u doin ${user.name}!!`,
            accessToken
        });
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
};


exports.getProfile = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.user.email }).select('-password'); // one thing we need to do is, like copying the JWTs and then nmaking an auth. bearea header to pass the authorisation test and see the profile and you do updation,deletion or something else (if we want to scale up)
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};




exports.updateProfile = async (req, res) => {
    try {
        const { name, password } = req.body;
        const user = await User.findOne({ email: req.user.email });// we can only change pasword and name, not the email , cause something nees to be constant to update the details
        if (!user) return res.status(404).json({ message: 'User not found' });

        if (name) user.name = name;
        if (password) user.password = await bcrypt.hash(password, 10); // crypting and decrypting
        user.updatedAt = Date.now();
        await user.save();
        res.json({ message: 'User profile updated', user });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

exports.deleteProfile = async (req, res) => {
    try {
        const user = await User.findOneAndDelete({ email: req.user.email }); // account gets finded through the email we provided in the body
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json({ message: 'User account deleted' });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};
