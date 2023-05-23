import "reflect-metadata";
import { DataSource } from "typeorm";
import WorldEntity from "./entity/worldEntity";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "database.sqlite",
  synchronize: true,
  logging: false,
  entities: [WorldEntity],
  migrations: [],
  subscribers: [],
});
