import { DataSource } from "typeorm";

export default new DataSource({
  type: "sqlite",
  database: "./demo.sqlite",
  synchronize: true,
  entities: ["src/Entities/*.ts"],
  logging: ["query", "error"],
});
