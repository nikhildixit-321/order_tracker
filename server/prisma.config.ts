// Prisma v7 config — loads .env and passes DATABASE_URL for migrations
import * as dotenv from "dotenv";
dotenv.config();
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: process.env["DATABASE_URL"],
  },
});
