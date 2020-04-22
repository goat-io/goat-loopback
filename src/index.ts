import { GoatApp } from "./application";
import { ApplicationConfig } from "@loopback/core";
import { watch } from "chokidar";
import { Log } from "@goatlab/fluent/dist/Log/Logger";
import { Goat, PackageInfo } from "@goatlab/fluent/dist/core/Loopback/goat";
import { Scheduler } from "./scheduler/Scheduler";
import { Bash } from "@goatlab/fluent/dist/Helpers/Bash";
import { join } from "path";

export const pkg: PackageInfo = require("../package.json");

export let app: GoatApp;

const restartServer = async () => {
  Log.info("Server Stopped");
  await app.stop();
  const path = join(__dirname, "../");
  Bash.execute(`npm start --prefix ${path}`);
  Log.info("Server Started");
};

watch("./src/forms.json").on("all", (event: string) => {
  if (event === "change") {
    restartServer();
  }
});

export async function main(options: ApplicationConfig = {}) {
  app = new GoatApp(options);
  Goat.boot(app, pkg);

  if (
    String(process.env.WORKER_NODE) === "true" ||
    String(process.env.WORKER_ONLY) === "true"
  ) {
    Scheduler.process();
  }

  await app.boot();
  await app.start();

  app.static("/", join(__dirname, "../.goat/manager"));

  const url = `http://localhost:${process.env.APP_PORT}`;

  Log.info(`Server is running at ${url}`);
  Log.info(`Try ${url}/health`);

  return app;
}
