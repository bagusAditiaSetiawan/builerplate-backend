const nodeMailjet = require("node-mailjet");
class Mailjet{
    mailjet;
    constructor(){
        this.mailjet = nodeMailjet.connect(process.env.MJ_APIKEY_PUBLIC, process.env.MJ_APIKEY_PRIVET);
    }
    static async sendMail(receive={name:"", email:""}, message={subject, body}){
        try{
            const request = await this.mailjet.post("send", {'version': 'v3.1'})
                .request({
                    "Messages":[{
                        "From": {
                            "Email": process.env.MJ_SENDER_EMAIL,
                            "Name": process.env.MJ_SENDER_NAME
                        },
                        "To": [{
                            "Email": receive.email,
                            "Name": receive.name
                        }],
                        "Subject": message.subject,
                        // "TextPart": "Dear passenger 1, welcome to Mailjet! May the delivery force be with you!",
                        "HTMLPart": message.body
                    }]
                })
            return request.body;
        }catch(error){
            return error;
        }
       
    }
}

module.exports = Mailjet;