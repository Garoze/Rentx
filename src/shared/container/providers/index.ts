import { container } from "tsyringe";

import { IDateProvider } from "./DateProvider/IDateProvider";

import { DayJSDateProvider } from "./DateProvider/impls/DayJSDateProvider";
import { IMailProvider } from "./MailProvider/IMailProvider";
import { EtherealMailProvider } from "./MailProvider/impls/EtherealMailProvider";

container.registerSingleton<IDateProvider>(
  "DayJSDateProvider",
  DayJSDateProvider
);

container.registerInstance<IMailProvider>(
  "EtherealMailProvider",
  new EtherealMailProvider(),
);
