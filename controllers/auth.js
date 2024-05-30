const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require("../models/user");
const register=async(req,res)=>{
    const { name, dateOfBirth, email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }
  
      user = new User({
        name,
        dateOfBirth,
        email,
        password,
      });
      await user.save();
  
      const payload = {
        user: {
          id: user.id,
        },
      };
  
      jwt.sign(payload, 'nancy', { expiresIn: '1h' }, (err, token) => {
        if (err) throw err;
        res.json({ token, user: { id: user.id, name: user.name, email: user.email, dateOfBirth: user.dateOfBirth ,password:user.password} });
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
}

const login=async(req,res)=>{
    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }
  
      if (user.password!==password) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }
  
      const payload = {
        user: {
          id: user.id,
        },
      };
  
      jwt.sign(payload, 'nancy', { expiresIn: '1h' }, (err, token) => {
        if (err) throw err;
        res.json({ token, user: { id: user.id, name: user.name, email: user.email, dateOfBirth: user.dateOfBirth, password:user.password } });
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
}
module.exports={register,login};