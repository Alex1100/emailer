let Sequelize = require('sequelize');
let bcrypt = require('bcrypt');
let crypto = require('crypto');
const saltRounds = 10;
let User = require('../models/user').User;
let mailgun = require('mailgun-js')({ apiKey: process.env.MAILGUN_API_KEY, domain: process.env.MAILGUN_SANDBOX_DOMAIN });
let axios  = require('axios');


generateUserToken = (email, fullName, password) => {
  let prehashString = (email + password + fullName);
  let BufferInitializer = process.env.DATABASE_URL + process.env.DATABASE_PASSWORD
  let key = Buffer(BufferInitializer, 'base64');
  let hmac = crypto.createHmac('sha256', key);
  let signature = hmac.update(prehashString).digest('base64');
  return signature;
}

async function signUp(req, res){
  try{
    let user_token = generateUserToken(req.body.email, req.body.fullName, req.body.password);
    let salt = await bcrypt.genSalt(saltRounds);
    let hash = await bcrypt.hash(req.body.password, salt);
    let person = await User.findOne({where: { user_token: user_token }});
    if(person){
      res.status(404).send(err);
    } else {
      let newUser = await User.create({ fullName: req.body.fullName, email: req.body.email, password: hash, user_token: user_token })
      res.status(201).send(newUser);
    }
  } catch(e) {
    res.status(404).send(e);
  }
};


async function login(req, res){
  try{
    let request = JSON.parse(new Buffer(req.params.user, 'base64').toString('ascii'));
    let user = await User.findOne({ where: { email: request.params.email } });
    let actualUser = await bcrypt.compare(request.params.password, user.password);
    let result = {fullName: user.fullName, email: user.email, user_token: user.user_token};
    res.status(200).send(result);
  } catch(e){
    res.status(404).send(e);
  }
}


async function sendEmail(req, res){
  try{
    const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
    let temp = req.body.message.split(' ');
    let formattedMessage = [];

    temp.forEach((word, i) => {
      formattedMessage.push(`<span style="color: ${colors[Math.floor(Math.random() * ((colors.length - 1) - 0) + 1)]}">` + word + `</span>`)
    });

    formattedMessage = formattedMessage.join(' ');

    let axiosBod = {
      "personalizations": [
        {
          "to": [
            {
              "email": req.body.recipientEmail,
              "name": req.body.recipientName
            }
          ]
        }
      ],
      "to": [
        {
          "email": req.body.recipientEmail,
          "name": req.body.recipientName
        }
      ],
      "subject": req.body.subject,
      "from": {
        "email": req.body.sender,
        "name": req.body.fullName
      },
      "content": [
        {
          "type": "text/html",
          "value": '<div style="display: inline-block; position: absolute; background-color: black; border: solid 2px gold; border-radius: 2px; color: white;">' + req.body.subject + '</div><hr/><h1>' + formattedMessage + '</h1>'
        }
      ]
    };

    let config = {
      headers: {
        "Authorization": `Bearer ${process.env.SENDGRID_API_KEY}`,
        "Content-Type": "application/json"
      }
    };

    axios.post("https://api.sendgrid.com/v3/mail/send", axiosBod, config)
      .then(response => {
        res.status(200).send(axiosBod);
      })
      .catch(err => {
        console.log("ERROR SENDING EMAIL WITH SENDGRID: ", err.message);
        res.sendStatus(400);
      })
  } catch(e) {
    console.log("ERROR SENDING EMAIL WITH SENDGRID TRYING MAILGUN: ", e);
    const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
    let temp = req.body.message.split(' ');
    let formattedMessage = [];

    temp.forEach((word, i) => {
      formattedMessage.push(`<span style="color: ${colors[Math.floor(Math.random() * ((colors.length - 1) - 0) + 1)]}">` + word + `</span>`)
    });

    formattedMessage = formattedMessage.join(' ');
    let data = {
      from: req.body.sender,
      to: req.body.recipientEmail,
      subject: req.body.subject,
      html: `<div style="display: inline-block; position: absolute; background-color: black; border: solid 2px gold; border-radius: 2px; color: white;">` + req.body.subject + `</div><hr/><h1>${formattedMessage}</h1>`
    };

    mailgun.messages().send(data, (error, body) => {
      res.sendStatus(200);
    });
  }
}


module.exports = {
  signUp,
  login,
  sendEmail
}
