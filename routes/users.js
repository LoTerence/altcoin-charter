const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');

// Register
router.post('/register', (req, res, next) => {
    let newUser = new User({
        email: req.body.email,
        password: req.body.password,
        watchList: []
    });

    User.addUser(newUser, (err, user) => {
        if(err){
            res.json({success: false, msg:"Email already registered"});
        } else {
            res.json({success: true, msg:"User registered"});
        }
    });
});

// Authenticate
router.post('/authenticate', (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    User.getUserByEmail(email, (err, user) => {
        if(err)throw err;
        if(!user){
            return res.json({success:false, msg:"User not found"});
        }

        User.comparePassword(password, user.password, (err, isMatch) => {
            if(err) throw err;
            if(isMatch){
                const token = jwt.sign({data:user}, config.secret, {
                    expiresIn: 604800 //1 week
                });

                res.json({
                    success: true,
                    token: 'JWT ' +token,
                    user: {
                        id: user._id,
                        email: user.email
                    } 
                });
            } else {
                return res.json({success:false, msg: 'Wrong password'});
            }
        });
    });
});

// Profile
router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res) => {
    res.json({user: req.user});
});

// testing router.put
router.put('/profile/changeEmail', passport.authenticate('jwt', {session:false}), (req, res) => {
    User.getUserByEmail(req.user.email, (err, user) => {
        if(err)throw err;
        if(!user){
            console.log('error in server/routes/users.js -- router.put(\'/watchlist/addcoin\')');
            return res.json({success:false, msg:"User not found"});
        }
        
        user.email = req.body.newEmail;

        user.save((err)=>{
            if (err) res.send(err);
            res.send('email updated');
        });

    });
});

// ----------------- watchlist related functions ----------------------------------///

// function that gets an array of coins (watchlist) saved by the user
router.get('/watchlist', passport.authenticate('jwt', {session:false}), (req, res) => {
    res.send(req.user.watchList);
});

// function that adds a new coin to watchlist
router.put('/watchlist/addcoin', passport.authenticate('jwt', {session:false}), (req, res) => {
    User.getUserByEmail(req.user.email, (err, user) => {
        //handle errors
        if(err)throw err;
        if(!user){
            console.log('error in server/routes/users.js -- router.put(\'/watchlist/addcoin\')');
            return res.json({success:false, msg:"User not found"});
        }
        for(let i=0; i<user.watchList.length; i++){
            if(user.watchList[i].Symbol == req.body.newCoin.Symbol){
                return res.json({success:false, msg:"That coin is already on the list"});
            }
        }

        // update watchlist with the new coin obj from req.body, then res.json the new watchlist
        user.watchList.push(req.body.newCoin);
        user.save((err)=>{
            if(err) res.json({success:false, msg:"error saving new coin in server/routes/users.js -- router.put(\'/watchlist/addcoin\')"});
            res.json({success:true, newWatchList:user.watchList});
        });

    });
});

// function that deletes a coin from watchlist
router.put('/watchlist/delcoin', passport.authenticate('jwt', {session:false}), (req, res) => {
    User.getUserByEmail(req.user.email, (err, user) => {
        //handle errors
        if(err)throw err;
        if(!user){
            console.log('error in server/routes/users.js -- router.put(\'/watchlist/addcoin\')');
            return res.json({success:false, msg:"User not found"});
        }

        //update watchlist by removing the requested coin from watchlist, then res.json the new watchlist
        let index=0;
        for(let i=0;i<user.watchList.length; i++){
            if(user.watchList[i].Symbol == req.body.Symbol){
                index=i;
                break;
            }
        }
        user.watchList.splice(index, 1);
        user.save((err)=>{
            if(err) res.json({success:false, msg:"error deleting coin in routes/users.js - put(watchlist/delcoin)"});
            res.json({success:true, newWatchList:user.watchList});
        });

    });
});

// ------------------- export router ---------------------///
module.exports = router;