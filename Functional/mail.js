
const authCheck=function(email,number){
const nodemailer=require('nodemailer')

const mail=nodemailer.createTransport({
    host: "smtp.gmail.com",
    auth:{
        user: `${require('../config/keys').email}`,
        pass: `${require('../config/keys').emailPass}`
    },
    tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false
      }
})
const mes={
    from: `${require('../config/keys').email}`,
    to: email,
    subject: 'Account verification',
    html: `<h3>Thank you for registering in my new app.Click to the button below to verify your email.</h3><br>
    <button><a href="https://lookregandlog.herokuapp.com/users/${number}">Verify my email.</a></button>`
}
mail.sendMail(mes,err=>{
    if(err){
        console.log(err)
    }
})
}
module.exports=authCheck