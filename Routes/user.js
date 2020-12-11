const express=require('express')
const User=require('../models/user')
const bcrypt=require('bcryptjs')
const route=express.Router()
const passport=require('passport')
const verify=require('../Functional/mail')
const {EventEmitter}=require('events')

const event=new EventEmitter()

let adress=''
event.on('adress',(obj)=>{
name=obj.name
email=obj.email
password=obj.password
  route.get(`/${adress}`,(req,res)=>{
    const user=new User({
        name,email,password
        })
        //Hashing password
        bcrypt.genSalt(10,(err,salt)=>{
            bcrypt.hash(user.password,salt,(err,hash)=>{
                if(err) throw err
                user.password=hash
                user.save()
                .then(user=>{
                    req.flash('sucess_msg','Now you are registered and can log in');
                    res.redirect('/users/login')
                })  
                .catch(e=>console.log(e))
            })})    
  })  
})


//Routes GET
route.get('/login',(req,res)=>{
    res.render('login')
})
route.get('/register',(req,res)=>{
    res.render('register')
})

//Register POST
route.post('/register',(req,res)=>{
    const {name,email,password,password2}=req.body
    let errors=[]
    if(!name || !email || !password || !password2 ){
    errors.push({msg: 'Please fill in all fields.'})
    }
    if(password!==password2){
        errors.push({msg: "Passwords don't match."})
    }
    if(!/[a-zA-Z]/g.test(password)){
        errors.push({msg: "Should contain at least 1 letter."})
    }
    if(password.length<6){
        errors.push({msg: "Password is too short.At list 6 length."})
    }
    if(errors.length>0){
    res.render('register',{errors,name,email,password,password2 })
    }else{
         User.findOne({email: email})
         .then(async user=>{
             if(user){
                 errors.push({msg: "Email already exists"})
                res.render('register',{errors,name,email,password,password2 })
             }else{
                 
                  //Sending email verification  
                  adress=Math.round(Math.random()*100000)
                  event.emit('adress',{name:name,password:password,email:email})
                  verify(email,adress)
                  req.flash('sucess_msg','Email verification has been sent.');
                  res.redirect('/')
                  res.end()
                 } 
                }
         )
    }
})

//Log in
route.post('/login',(req,res,next)=>{
passport.authenticate('local',{
    successRedirect: '/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true
})(req,res,next)
})

//LogOut 
route.get('/logout',(req,res)=>{
    req.logOut()
    req.flash('sucess_msg','You successfully logged out')
    res.redirect('/users/login')
})


module.exports=route