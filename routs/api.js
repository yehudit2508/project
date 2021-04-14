const router = require('express').Router()
const user = require("../controllers/userC");
const address = require("../controllers/addressesC");


router.post('/createUser', user.createUser)
router.get('/findUser/:id', user.getUser);
router.put('/updUser/:id', user.updUser);
router.delete('/deleteUser/:id', user.deleteUser);

router.post('/createUrl/:name',address.createUrl);
router.delete('/deleteUrl/:id', address.deleteUrl);
router.get('/shortUrl/:newUrl', address.findUrl);
router.get('/hello', function (req, res) {
    console.log("hello world!");
    return "hello world!11111";
});



module.exports = router