const jwt = require("jsonwebtoken");

const secrets = require("../api/secrets.js");

module.exports = (req, res, next) => {
    const token = req.headers.authorization;

    const secret = secrets.jwtSecret;
    // console.log(token);
    if (token) {
        jwt.verify(token, secret, (error, decodedToken) => {
            if (error) {
                console.log(error.message);
                res.status(401).json({ you: "cannot pass!" });
            } else {
                req.decodedToken = decodedToken;
                next();
            }
        });
    } else {
        res.status(400).json({ message: "Please provide credentials" });
    }
};