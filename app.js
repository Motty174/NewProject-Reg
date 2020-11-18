const express=require('express')
const PORT=process.env.PORT || 8080
const expressLayouts=require('express-ejs-layouts')
const ejs=require('ejs')
const mongoose=require('mongoose')
const config=require('./config/keys')
const bodyParser=require('body-parser')
const flash=require('connect-flash')
const session=require('express-session')
const passport=require('passport')


const app=express()
//Passport
require('./config/passport')(passport)
//EJS
app.use(expressLayouts)
app.set('view engine','ejs')

//Body-Parser
app.use(express.urlencoded({extended: false}))

//Session Middleware
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
   }))

//Passport middlewar
app.use(passport.initialize());
app.use(passport.session());


//COnnect flas
app.use(flash())

//Global vars
app.use((req,res,next)=>{
res.locals.sucess_msg=req.flash('sucess_msg')
res.locals.error_msg=req.flash('error_msg')
res.locals.error=req.flash('error')
next()
})

//Connect MongoDb
mongoose.connect(config.MongoURI,{useNewUrlParser: true, useUnifiedTopology: true})
.then(console.log('MongoDB connected'))
.catch(e=>console.log(e))
//Connect Routes
app.use('/users',require('./Routes/user'))
app.use('/',require('./Routes/index'))


//Listen to port
app.listen(PORT,()=>{console.log(`[Server started on port: ${PORT}]`)})