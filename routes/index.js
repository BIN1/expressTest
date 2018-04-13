var express=require('express');
var router=express.Router();

const { getBanner, addAddress, indexData,userData,userRegister } = require("../controllers/post.js");


// 设置接口路径
router.get("/get/banner", getBanner);
router.post("/post/address", addAddress);
router.post("/post/indexData", indexData);
router.post("/post/userData", userData);
router.post("/post/userRegister", userRegister);

module.exports = router;