import { v4 as uuid } from "uuid";
import request from "supertest";
import { hash } from "bcrypt";

import { app } from "@shared/infra/http/app";
import { DataSource } from "typeorm";
import { createConnection } from "@shared/infra/typeorm";

let connection: DataSource;

describe("Create Category Controller", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const id = uuid();
    const password = await hash("admin", 8);
    await connection.query(
      `INSERT INTO USERS( id, name, email, password, driver_license, "isAdmin", created_at )
      values( '${id}', 'admin', 'admin@rentx.com', '${password}', '12345678', true, NOW() ) `
    )
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.destroy();
  })

  it("should be able to create a new category", async () => {
    const responseToken = await request(app)
      .post("/sessions")
      .send({ 
        email: "admin@rentx.com",
        password: "admin"
      })

    const { token } = responseToken.body;

    const response = await request(app)
      .post("/categories")
      .send({ 
        name: "Supertest Category", 
        description: "Supertest Category description"
      })
      .set({
        Authorization: `Bearer ${token}` 
    })

    expect(response.status).toBe(201);
  });

  it("should not be able to create a category that already exists", async () => {
    const responseToken = await request(app)
      .post("/sessions")
      .send({ 
        email: "admin@rentx.com",
        password: "admin"
      })

    const { token } = responseToken.body;

    const response = await request(app)
      .post("/categories")
      .send({ 
        name: "Supertest Category", 
        description: "Supertest Category description"
      })
      .set({
        Authorization: `Bearer ${token}` 
      })

      expect(response.status).toBe(400);
  });
})
