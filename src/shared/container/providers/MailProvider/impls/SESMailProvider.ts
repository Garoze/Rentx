import fs from "fs";
import aws from "aws-sdk";
import handlebars from "handlebars";
import { injectable } from "tsyringe";
import nodemailer, { Transporter } from "nodemailer";

import { IMailProvider } from "../IMailProvider";

@injectable()
export class SESMailProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
    this.client = nodemailer.createTransport({
      SES: new aws.SES({
        apiVersion: "2010-12-01",
        region: process.env.AWS_REGION,
      })
    })
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

    await this.client.sendMail({
      to,
      from: "Rentx <noreply@garoze.com>",
      subject,
      html: templateHTML,
    })
  }
}

