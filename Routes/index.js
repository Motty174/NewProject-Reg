const express=require('express')
const {ensureAuth}=require('../config/auth')
const route=express.Router()

route.get('/',(req,res)=>{
    res.render('mainPage')
})
route.get('/dashboard',ensureAuth,(req,res)=>{
    res.render('dashboard',{name: req.user.name})
})


module.exports=route