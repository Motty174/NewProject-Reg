const passport=require('passport')
const LocalStrategy=require('passport-local').Strategy
const mongoose=require('mongoose')
const bcrypt = require('bcryptjs')
const User=require('../models/user')

module.exports=function(passport){
passport.use(
    new LocalStrategy({usernameField: 'email'},(email,password,done)=>{
//Match user
User.findOne({email: email})
.then(user=>{
    if(!user){
        done(null,false,{message: 'That email is not registered.'})
    }
    //Match password
    bcrypt.compare(password,user.password,(err,isMatch)=>{
        if(err)throw err
        if(isMatch){
            done(null,user)
        }else{
            done(null,false,{message: 'Password incorrect.'})
        }
    })
})
.catch(e=>console.log(e))
})
)
passport.serializeUser((user, done)=>{
    done(null, user.id);
  });
  
  passport.deserializeUser((id, done)=> {
    User.findById(id, (err, user)=> {
      done(err, user);
    });
  });
}