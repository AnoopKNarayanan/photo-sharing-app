import passport from "passport";
import { Strategy as localStrategy } from "passport-local";
import mongoose from 'mongoose';
import User from '../models/user.model'

passport.use(
    new localStrategy({ usernameField: 'email' },
    async (username, password, done) => {
        try {
            const user = await User.findOne({ email: username });
            if(!user)
                return done(null, false, { message: 'User is not registered' });

            const pwdVerified = await user.verifyPassword(password);
            if(!pwdVerified){
                return done(null, false, { message: 'Incorrect password' });
            }                 
            return done(null, user);
        }
        catch(err) {
            return done(err);
        }        
    })
);