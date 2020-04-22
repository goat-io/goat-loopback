import {
  Client,
  createRestAppClient,
  givenHttpServerConfig
} from "@loopback/testlab";
import { GoatApp } from "../application";
import { Goat, PackageInfo } from "@goatlab/fluent/dist/core/Loopback/goat";

const pkg: PackageInfo = require("../../package.json");

export interface AppWithClient {
  app: GoatApp;
  client: Client;
}

export async function setupApplication(): Promise<AppWithClient> {
  const app = new GoatApp({
    rest: givenHttpServerConfig()
  });

  Goat.boot(app, pkg);

  await app.boot();
  await app.start();

  const client = createRestAppClient(app);

  return {
    app,
    client
  };
}
