
const authCheck=function(email,number){
const nodemailer=require('nodemailer')

const mail=nodemailer.createTransport({
    host: "smtp.gmail.com",
    auth:{
        user: `${require('../config/auth').email}`,
        pass: `${require('../config/auth').emailPass}`
    },
    tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false
      }
})
const mes={
    from: `${require('../config/auth').email}`,
    to: email,
    subject: 'Account verification',
    text: `http://localhost:8080/users/${number}`
}
mail.sendMail(mes,err=>{
    if(err){
        console.log(err)
    }
})
}
module.exports=authCheck