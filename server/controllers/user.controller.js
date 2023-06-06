import mongoose from 'mongoose';
import User from '../models/user.model';
import passport from 'passport';
import _ from 'lodash';
import { ObjectId } from 'mongodb';

export async function register(req, res, next) {
    var user = new User({
        name : req.body.name,
        email : req.body.email,
        password : req.body.password,
        createdAt: new Date()
    });
    try {
        var response = await user.save();
        if(response && response._id)
            return res.status(200).json({ status: true, message: 'User registered successfully' });
        else
            return res.status(500).json({ status: false, message: 'Unable to register user' });
    }
    catch(err) {
        if(err.code == 11000)
            return res.status(422).json({ status: false, message: 'Duplicate email found' });
        else
            return res.status(400).json(err);
    }
    
}

export function authenticate(req, res, next) {
    passport.authenticate('local', async (err, user, info) => {
        if(err)
            return res.status(400).json(err);          
        else if(user)
            return res.status(200).json({ "token": await user.generateToken() });
        else
            return res.status(404).json(info);
    })(req, res);
}

export async function userProfile(req, res, next) {
    try {
        const user = await User.findOne({ _id: req._id });
        if(!user)
            return res.status(404).json({ status: false, message: 'User not found' });
        else
            return res.status(200).json({ status: true, user: _.pick(user, ['_id', 'name', 'following']) });        
    }
    catch(err) {
        return res.status(400).json(err);
    }
}

export async function fetchUserPhotos(req, res, next) {
    try {
        const user = await User.findOne({ _id: req._id });
        if(!user)
            return res.status(404).json({ status: false, message: 'User not found' });
        else
            return res.status(200).json({ status: true, user: _.pick(user, ['_id', 'name', 'email', 'photos', 'createdAt']) });        
    }
    catch(err) {
        return res.status(400).json(err);
    }
}

export async function fetchUsersToFollow(req, res, next) {
    try {
        const id = new ObjectId(req._id);
        const users = await User.find({ _id: {$exists: true, $ne: id} } );
        if(!users)
            return res.status(404).json({ status: false, message: 'No users found' });
        else
            return res.status(200).json({ status: true, users: _.map(users, _.partialRight(_.pick, ['_id', 'name'])) });    
    }
    catch(err) {
        return res.status(400).json(err);
    }
}

export async function fetchSharedPhotos(req, res, next) {
    try {
        if(req._id) {
            const user = await User.findOne({ _id: req._id });
            if(!user || !user.following)
                return res.status(500).json({ status: false, message: 'You are not following anyone' });
            else{
                const users = await User.find({'_id': { $in: user.following }});
                if(!users)
                    return res.status(200).json({ status: false, message: 'Nothing to display' });
                else
                    return res.status(200).json({ status: true, users: _.map(users, _.partialRight(_.pick, ['name', 'photos'])) });
            }            
        }
        else 
            return res.status(500).json({ status: false, message: 'Invalid user' });
    }
    catch(err) {
        return res.status(400).json(err);
    }
}

export async function follow(req, res, next) {
    try {
        if(req.body && req.body.id){
            const id = req.body.id;
            const user = await User.findOne({ _id: id });
            if(!user)
                return res.status(500).json({ status: false, message: 'User does not exist' });

            const follow = req.body.follow;
            if(follow) {
                await User.updateOne({ _id: req._id }, { $addToSet: { following: id } });
                return res.status(200).json({ status: true, message: 'Followed succesfully' });
            }
            else {
                await User.updateOne({ _id: req._id }, { $pull: { following: id } });
                return res.status(200).json({ status: true, message: 'Unfollowed succesfully' });
            }
        }
        else 
            return res.status(500).json({ status: false, message: 'Invalid request' });
    }
    catch(err) {
        return res.status(400).json(err);
    }
}

export async function upload(req, res, next) {
    try{
        if(req['files']) {
            let file = req['files'].thumbnail;
            const user = await User.findOne({ _id: req._id });
            if(!user)
                return res.status(500).json({ status: false, message: 'User does not exist' });
            else {
                await User.updateOne({ _id: req._id }, { $addToSet: { photos: file } });
                return res.status(200).json({ status: true, message: 'Uploaded succesfully' });
            }            
        }
        else{
            return res.status(500).json({ status: false, message: 'No file to upload' }); 
        }
                   
    }
    catch(err) {
        return res.status(400).json(err);
    }
}

export async function deletePhoto(req, res, next) {
    try{
        if(req._id) {
            const user = await User.findOne({ _id: req._id });
            const photoId = new ObjectId(req.body.id);
            if(!user)
                return res.status(500).json({ status: false, message: 'User does not exist' });
            else {
                await User.updateOne({ _id: req._id }, { $pull: { photos: {_id: photoId} } });
                return res.status(200).json({ status: true, message: 'Deleted succesfully' });
            }            
        }
        else
            return res.status(500).json({ status: false, message: 'Unable to delete' });        
    }
    catch(err) {
        return res.status(400).json(err);
    }
}