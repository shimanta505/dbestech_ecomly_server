const express = require('express');
const router = express.Router();

router.get('/login',(req,res)=>{
    return res.status[201];
});

router.get('/info',(req,res)=>
res.status(201).json({'name': 'shimanta','age': 20})
);
//router.get()

module.exports = router;