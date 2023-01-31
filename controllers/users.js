import User from '../models/user.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

export const getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    sendToken(res, user, 201, `Welcome back ${user.name}`);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const signup = async (req, res) => {
    const auth = req.currentUser;

    const newUser = new User({
        uid: auth.uid,
        email: auth.email,
        username: auth.name,
        photoURL: auth.picture,
        goal: 500,
        count: { date: new Date().toISOString().slice(0,10), count: 0 },
        plan: 'free'
    });

    try {
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const getUser = async (req, res) => {
    const auth = req.currentUser;
    
    try {
        const user = await User.findOne({uid: auth.uid});
        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
}

export const findByName = async (req, res) => {
  const queryName = req.query.name;

  try {
    const name = new RegExp(queryName, "i");

    const users = await User.find({ name });

    res.json(users);
  } catch (error) {    
    res.status(404).json({ message: error.message });
  }
}

export const updateProfile = async (req, res) => {
  const auth = req.currentUser;
  const { photoURL, name, profession } = req.body;

  try {
    const user = User.findOneAndUpdate({id: auth.uid}, { photoURL:photoURL, name: name, profession: profession }).exec();
    //res.json(user[0].count);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
}
}

export const getCount = async (req, res) => {
    const auth = req.currentUser;
    
    try {
        const user = await User.findOne({uid: auth.uid});
        res.json(user.count);
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
}

export const postGoal = async (req, res) => {
    const auth = req.currentUser;
    const goal = req.body.goal;
    try {
        await User.findOneAndUpdate({uid:auth.uid}, {goal:goal});
        res.status(201);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getGoal = async (req, res) => {
    const auth = req.currentUser;
    try {
        const user = await User.findOne({uid:auth.uid});
        res.status(201).json(user.goal);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}