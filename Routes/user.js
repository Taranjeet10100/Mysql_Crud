const express = require("express");
const router = express.Router();
const { upload } = require('multer');
const {
    getUserSignup,
    postUserSignup,
    getUpdateUser,
    postUpdateUser,
    getUser,
    postDeleteUser,
} = require("../Controllers/user");

const { protect, authorize } = require("../middleware/auth");


router.post("/", postUserSignup);
router.get("/", getUserSignup);

router.get("/update", getUpdateUser);
router.post("/update", postUpdateUser);

router.get('/user', getUser);
router.post("/delete", postDeleteUser);

module.exports = router;
