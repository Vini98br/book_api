import { DataSource } from "typeorm";

const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.TYPEORM_HOST,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  port: Number(process.env.TYPEORM_PORT),
  logging: false,
  entities: ["src/modules/**/entities/*.entity.ts"],
  migrations: ["src/database/migrations/*.ts"],
});

export default AppDataSource;