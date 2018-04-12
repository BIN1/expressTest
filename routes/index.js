var express=require('express');
var router=express.Router();

const { getBanner, addAddress } = require("../controllers/post.js");

router.get("/get/banner", getBanner);

router.post("/post/address", addAddress);
module.exports = router;