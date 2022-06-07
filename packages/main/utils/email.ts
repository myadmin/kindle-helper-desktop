const nodemailer = require('nodemailer');
const dayjs = require('dayjs');

const emailHost = new Map([
  ['163', 'smtp.163.com'],
  ['126', 'smtp.126.com'],
  ['qq', 'smtp.qq.com'],
]);

// async..await is not allowed in global scope, must use a wrapper
const sendEmail = ({ bookInfo, emailInfo }: any) => {
    // console.log('bookInfo', bookInfo);
    // console.log('emailInfo', emailInfo);

    const sendDefault = {
        host: emailHost.get(emailInfo?.type),
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: emailInfo?.sendEmail, // generated ethereal user
            pass: emailInfo?.passKey, // generated ethereal password
        },
        tls: { rejectUnauthorized: false },
    };
    // console.log('sendDefault', sendDefault);
    const transporter = nodemailer.createTransport(sendDefault);
    const startTime = dayjs().format('YYYY-MM-DD HH:mm:ss');

    // send mail with defined transport object
    const mailOptions = {
        from: `${emailInfo?.sendEmail}`, // sender address
        to: `${emailInfo?.receiveEmail}`, // list of receivers
        subject: `${bookInfo?.filename} - Kindle文件 ✔`, // Subject line
        text: 'Kindle助手发来的文件', // plain text body
        html: `<b>发送时间：${startTime}</b>`, // html body
        attachments: [
            {
                filename: bookInfo?.filename,
                path: `${bookInfo?.dirPath}/${bookInfo?.filename}`,
            },
        ],
        // attachments: readFileList()
    };
    // console.log('mailOptions', mailOptions);
    return new Promise((resolve, reject) => {
        // console.time('sendTime');
        transporter.sendMail(mailOptions, (error: any, info: any) => {
            if (error) {
                reject({
                  code: -1001,
                  success: false,
                  message: error.message,
                });
            } else {
                console.log('Message sent: %s', info.messageId);
                console.log('send success');
                // console.timeEnd('sendTime');
                resolve({
                  code: 200,
                  success: true,
                });
            }
        });
    });
};

export default sendEmail;
