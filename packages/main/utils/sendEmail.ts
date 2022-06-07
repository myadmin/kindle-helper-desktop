const fs = require('fs');
const path = require('path');
const nodemailer = require("nodemailer");
const dayjs = require("dayjs");
const { sendOptions, emailSetting } = require('./config');

const defaultType = '163';

function readFileList() {
    const fileList = fs.readdirSync(path.join(__dirname, './dist'));
    const formatList: Record<string, any> = [];
    fileList.forEach((item: string) => {
        formatList.push({
            filename: item,
            path: `./dist/${item}`
        });
    });
    return formatList;
}

// async..await is not allowed in global scope, must use a wrapper
async function main() {
    const optionDefault = sendOptions().get(defaultType);
    const sendSetting = emailSetting().get(defaultType);

    const sendDefault = {
        host: optionDefault[0],
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: optionDefault[1], // generated ethereal user
            pass: optionDefault[2], // generated ethereal password
        },
        tls: { rejectUnauthorized: false },
    }
    
    const transporter = nodemailer.createTransport(sendDefault);
    const startTime = dayjs().format('YYYY-MM-DD HH:mm:ss');

    // send mail with defined transport object
    const mailOptions = {
        from: `"Fred Foo 👻" <${sendSetting[0]}>`, // sender address
        to: `${sendSetting[1]}`, // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: `<b>发送时间：${startTime}</b>`, // html body
        // attachments: [
        //     {
        //         filename: '《凡人修仙传》电子书下载 (校对版全本+番外) 忘语.epub',
        //         path: './dist/《凡人修仙传》电子书下载 (校对版全本+番外) 忘语.epub'
        //     }
        // ],
        attachments: readFileList()
    };

    console.time('sendTime');
    const info = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", info.messageId);
    console.log('send success');
    console.timeEnd('sendTime');
}

main().catch(console.error);

// https://www.jianshu.com/p/1be807735914