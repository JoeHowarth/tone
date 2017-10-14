var express = require('express');
var router = express.Router();

// POST route for receiving text from front-end
router.get('/send', function(req, res) {
    res.render(JSON.stringify((req)));
});

module.exports = router;