require("dotenv").config();
const express = require("express");
const bcrypt = require("bcryptjs")
const { body, validationResult } = require("express-validator");
const Users = require("../models/Users");
const router = express.Router()
const jwt = require('jsonwebtoken');
const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const loginStatus = require("../middleware/loginstatus");
const JWT_SECRET = process.env.JWT_SECRET
const saltRounds = 10;

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "https://quizro-quiz-backend.vercel.app/api/auth/google/callback",
            scope: ["profile", "email"],
        },
        function (accessToken, refreshToken, profile, cb) {
            Users.findOrCreate({ googleId: profile.id, "first name": profile.name.givenName, "last name": profile.name.familyName, email: profile._json.email }, function (err, user) {
                return cb(err && "This email is already taken, try to login", user);
            })
        }
    )
);
passport.serializeUser(function (user, done) { done(null, user); });
passport.deserializeUser(function (user, done) { done(null, user); });

router.post("/signup",
    body("email", "Enter a valid Email").isEmail(),
    body("password", "Password must be at least 5 characters").isLength({ min: 5 }),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(500).json({ errors: errors.array() });
        }
        try {
            bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
                const user = Users.create({ ...req.body, password: hash })
                user.then(user => {
                    const authToken = jwt.sign(user.id, JWT_SECRET);
                    res.json({ authToken })
                }).catch((err) => {
                    res.json({ err: err })
                });

            });
        } catch (error) {
            res.status(500).send("Internal Server Error")
        }
    })

router.post("/signin",
    body("email", "Enter a valid Email").isEmail(),
    body("password", "Password must be at least 5 characters").isLength({ min: 5 }),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(500).json({ errors: errors.array() });
        }
        const { email, password } = req.body;
        try {
            Users.findOne({ email: email }, function (err, findUser) {
                if (err) {
                    res.status(500).json({ error: "Email or Password is wrong" });
                }
                else {
                    if (findUser) {
                        bcrypt.compare(password, findUser.password, function (err, result) {
                            if (result) {
                                const authToken = jwt.sign(findUser.id, JWT_SECRET);
                                res.status(200).json({ authToken })
                            }
                            else {
                                res.status(500).json({ error: "Email or Password is wrong" })
                            }
                        });
                    }
                    else {
                        res.status(500).json({ error: "Email or Password is wrong" })
                    }
                }
            });
        } catch (error) {
            res.status(500).send("Internal Server Error")
        }
    }
)

router.get("/login/success", (req, res) => {
    if (req.user) {
        const authToken = jwt.sign(req.user._id, JWT_SECRET)
        res.status(200).json({
            error: false,
            message: "Successfully Loged In",
            userId: authToken,
        });
    } else {
        res.status(403).json({ error: true, message: "Not Authorized" });
    }
});

router.get("/login/failed", (req, res) => {
    res.status(401).json({
        error: true,
        message: "Log in failure",
    });
});

router.get("/google", passport.authenticate("google", ["profile", "email"]));

router.get(
    "/google/callback",
    passport.authenticate("google", {
        successRedirect: "https://quizro-quiz.vercel.app/register",
        failureRedirect: "/login/failed",
    })
);

router.get("/logout", (req, res) => {
    if (req.user !== undefined) {
        req.logout(() => {
            return res.status(200).redirect("https://quizro-quiz.vercel.app/");
        });
    }
    else {
        res.status(200).redirect("https://quizro-quiz.vercel.app/")
    }
});

router.post("/getuser", loginStatus, async (req, res) => {
    try {
        UserId = req.userId;
        const userData = await Users.findById(UserId).select("-password")
        res.status(200).json({ userData })
    } catch (error) {
        res.status(500).send("Internal Server Error")
    }
})
module.exports = router;