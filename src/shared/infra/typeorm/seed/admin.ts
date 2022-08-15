import { v4 as uuid } from "uuid";
import { hash } from 'bcrypt';

import { AppDataSource, createConnection } from '../index';

createConnection().then(async () => {
  const id = uuid();
  const password = await hash("admin", 8);

  await AppDataSource.query(
    `INSERT INTO USERS( id, name, email, password, driver_license, "isAdmin", created_at )
    values( '${id}', 'admin', 'admin@rentx.com', '${password}', '12345678', true, NOW() ) `
  )
}).then(() => console.log("Admin user created"));

