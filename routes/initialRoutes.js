const express = require('express')
const router = express.Router()

router.route('/').get(function(req, res, next) {
    console.log(req.session);
    if(req.session.user) {
        if(req.session.user.type) {
            res.redirect("/portal/professor")
        } else {
            res.redirect("/portal/student");
        }
    } else {
        res.redirect("/login");
    }
});

module.exports = router