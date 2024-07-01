import { DataSource } from "typeorm";

export default new DataSource({
  type: "sqlite",
  database: "./fixtures.sqlite",
  entities: ["src/Entities/*.ts"],
  synchronize: true, //à ne pas utiliser en production
  logging: ["error", "query"], //à ne pas utiliser en production
});
