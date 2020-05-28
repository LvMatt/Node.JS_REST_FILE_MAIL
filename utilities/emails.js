const sgMail = require('@sendgrid/mail')
const fs = require("fs");
const sendgridAPIKey = "SENDGRID_API_CODE"

sgMail.setApiKey(sendgridAPIKey)

const pathToAttachment = `${__dirname}/pics/mailPic.jpg`;
const attachment = fs.readFileSync(pathToAttachment).toString("base64");

    
const sendWelcomeEmail = (email, type, color, year) => {
    sgMail.send({
        to: email,
        from: 'menoo2@centrum.sk',
        subject: 'Your order was successful!',
        html: ` Thanks for ordering ${type} in ${color} color, in year of manifacturing ${year}. Let us know if you need something <br> <strong>I created this mail with SendGrid and Node.js </strong>`,
        attachments: [
            {
              content: attachment,
              filename: "mailPic.jpg",
              content_id: 'Logo',
              type: "image/jpg",
              disposition: "inline"
            }
          ]

    })
}
//         text: `Thanks for ordering ${type} in ${color} color, in year of manifacturing ${year}. Let us know if you need something`,

//         html: `<strong>I created this mail with SendGrid and Node.js </strong> <img src="../pics/mailPic.jpg>`


 module.exports = {
    sendWelcomeEmail,
} 