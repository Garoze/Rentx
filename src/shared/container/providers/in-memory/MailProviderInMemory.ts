import { IMailProvider } from "../MailProvider/IMailProvider";

type Mail = {
  to: string;
  subject: string;
  variables: any,
  path: string;
}

export class MailProviderInMemory implements IMailProvider {
  private mails: Mail[] = [];

  async sendMail(
    to: string, 
    subject: string, 
    variables: any, 
    path: string
  ): Promise<void> {
    this.mails.push({
      to,
      subject,
      variables,
      path
    }) 
  }
}
