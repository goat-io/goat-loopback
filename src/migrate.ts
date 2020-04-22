import { GoatApp } from "./application";
import { Goat } from "@goatlab/fluent/dist/core/Loopback/goat";
import { Log } from "@goatlab/fluent/dist/Log/Logger";
import { pkg } from "./index";

export let app: GoatApp;

export async function migrate(args: string[]) {
  const existingSchema = args.includes("--rebuild") ? "drop" : "alter";

  Log.info(`Migrating schemas (${existingSchema} existing schema)`);

  app = new GoatApp();

  Goat.boot(app, pkg);

  await app.boot();
  await app.migrateSchema({ existingSchema });
  if (process.env.NODE_ENV !== "test") {
    process.exit(0);
  }
}

migrate(process.argv).catch(err => {
  Log.error("Cannot migrate database schema");
  Log.error(err);
  process.exit(1);
});
