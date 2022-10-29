import { container } from "tsyringe";

import { IDateProvider } from "./DateProvider/IDateProvider";

import { DayJSDateProvider } from "./DateProvider/impls/DayJSDateProvider";
import { IMailProvider } from "./MailProvider/IMailProvider";
import { EtherealMailProvider } from "./MailProvider/impls/EtherealMailProvider";
import { SESMailProvider } from "./MailProvider/impls/SESMailProvider";
import { LocalStorageProvider } from "./StorageProvider/impls/LocalStorageProvider";
import { S3StorageProvider } from "./StorageProvider/impls/S3StorageProvider";
import { IStorageProvider } from "./StorageProvider/IStorageProvider";

container.registerSingleton<IDateProvider>(
  "DayJSDateProvider",
  DayJSDateProvider
);

const getMailProvider = (where: string) => {
  return {
    ethereal: container.resolve(EtherealMailProvider),
    ses: container.resolve(SESMailProvider),
  }[where]!;
}

container.registerInstance<IMailProvider>(
  "MailProvider",
  getMailProvider(process.env.EMAIL!)
);

const getProvider = (where: string) => {
  return {
    s3: S3StorageProvider,
    local: LocalStorageProvider
  }[where]!;
}

container.registerSingleton<IStorageProvider>(
  "StorageProvider",
  getProvider(process.env.DISK!)
);
