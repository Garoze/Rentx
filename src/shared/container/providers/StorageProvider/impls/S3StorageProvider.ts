import fs from "fs";
import mime from "mime";
import { S3 } from "aws-sdk";
import { resolve } from "path";

import upload from "@config/upload";

import { IStorageProvider } from "../IStorageProvider";

export class S3StorageProvider implements IStorageProvider {
  private client: S3;

  constructor() {
    this.client = new S3({
      region: process.env.AWS_REGION,

    });
  }
  async save(file: string, folder: string): Promise<string> {
    const original = resolve(upload.tmpFolder, file);

    const fileContent = await fs.promises.readFile(original);
    const ContentType = mime.getType(original);

    this.client.putObject({
      Bucket: `${process.env.AWS_BUCKET}/${folder}`, Key: file,
      ACL: "public-read",
      Body: fileContent,
      ContentType: String(ContentType)
    }).promise();

    await fs.promises.unlink(original);

    return file;
  }

  async delete(file: string, folder: string): Promise<void> {
    await this.client.deleteObject({
      Bucket: `${process.env.AWS_BUCKET}/${folder}`, 
      Key: file,
    }).promise(); 
  }
}
