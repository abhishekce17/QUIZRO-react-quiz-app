const jwt = require("jsonwebtoken")
const JWT_SECRET = "thisisquizrowebsitesecret"


const loginStatus = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) {
        res.status(401).send({ error: "Session Expired" })
    }
    try {
        const decryptToken = jwt.verify(token, JWT_SECRET)
        req.userId = decryptToken;
        next()
    } catch (error) {
        console.log(error)
        res.status(401).send({ error: "Session Expired" })
    }
}
module.exports = loginStatus;
