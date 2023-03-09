const nodemailer =require('nodemailer')


export class emailController{
    transporter = nodemailer.createTransport({
        service:"Gmail",
        auth: {
            user: 'aayushshrestha8888@gmail.com',
            pass: 'aayushhi5'
        }
    });
    
    sendmail=async()=>{
        console.log("from this");
        
    //     let info = await this.transporter.sendMail({
    //         from: '"Fred Foo 👻" <foo@example.com>', // sender address
    //         to: "aayushshrestha999@gmail.com", // list of receivers
    //         subject: "Hello ✔", // Subject line
    //         text: "Hello world?", // plain text body
    //         html: "<b>Hello world?</b>", // html body
    //       });
    //       console.log("Message sent: %s", info.messageId);

    //       console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    }


}