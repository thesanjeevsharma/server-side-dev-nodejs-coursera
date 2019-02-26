const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user.model');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken');
const FacebookTokenStrategy = require('passport-facebook-token');

const keys = require('./config/keys');

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


exports.getToken = function(user) {
    console.log(user);
    return jwt.sign(user, keys.secretKey,
        {expiresIn: 3600});
};

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretKey;

exports.jwtPassport = passport.use(new JwtStrategy(opts,
    (jwt_payload, done) => {
        console.log("JWT payload: ", jwt_payload);
        User.findOne({_id: jwt_payload._id}, (err, user) => {
            if (err) {
                return done(err, false);
            }
            else if (user) {
                return done(null, user);
            }
            else {
                return done(null, false);
            }
        });
    }));

exports.verifyUser = passport.authenticate('jwt', {session: false});

exports.verifyAdmin = function(req, res, next) {
    User.findOne({_id: req.user._id})
    .then((user) => {
        if (user.admin) {
            next();
        }
        else {
            err = new Error('You\'re not authorized to perform this action!');
            err.status = 403;
            return next(err);
        } 
    }, (err) => next(err))
    .catch((err) => next(err))
}

exports.facebookPassport = passport.use(new FacebookTokenStrategy({
        clientID: require('./config/keys').facebook.clientId,
        clientSecret: require('./config/keys').facebook.clientSecret,
    }, (accessToken, refreshToken, profile, done) => {
        User.findOne({ facebookId: profileId }, (err, user) => {
            if(err){
                return done(err, false);
            }
            if(!err && user !== null){
                return done(null, user);
            }
            else {
                user = new User({
                    username : profile.displayName });
                    user.facebookId = profile.id;
                    user.firstname = profile.name.givenName;
                    user.lastname = profile.name.familyName;
                    user.save((err, save) => {
                        if(err) return done(err, false);
                        else return done(null, user);
                    })
                }
        })
    }
));