import fs from "fs";
import handlebars from "handlebars";
import { injectable } from "tsyringe";
import nodemailer, { Transporter } from "nodemailer";

import { IMailProvider } from "../IMailProvider";

@injectable()
export class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
    nodemailer
      .createTestAccount()
      .then((account) => {
        const transporter = nodemailer.createTransport({
          host: account.smtp.host,
          port: account.smtp.port,
          secure: account.smtp.secure,
          auth: {
            user: account.user,
            pass: account.pass
          }
        })

        this.client = transporter;
      }).catch((err) => console.log(err));
  } 

  async sendMail(
    to: string, 
    subject: string, 
    variables: any, 
    path: string
  ): Promise<void> {
    const templateFileContent = fs.readFileSync(path).toString("utf-8");

    const templateParsed = handlebars.compile(templateFileContent);

    const templateHTML  = templateParsed(variables);

    const message = await this.client.sendMail({
      to,
      from: "Rentx <noreply@rentx.com>",
      subject,
      html: templateHTML,
    })

    console.log('Message sent: %s', message.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}

