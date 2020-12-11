
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
    html: `<button>Verify my email.<a href="http://localhost:8080/users/${number}">Go.</a></button>`
}
mail.sendMail(mes,err=>{
    if(err){
        console.log(err)
    }
})
}
module.exports=authCheck