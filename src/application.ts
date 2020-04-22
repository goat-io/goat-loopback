import { BootMixin } from "@loopback/boot";
import { ApplicationConfig } from "@loopback/core";
import { RepositoryMixin } from "@loopback/repository";
import { RestApplication } from "@loopback/rest";
import { ServiceMixin } from "@loopback/service-proxy";
import { modules } from "./modules";
import { join } from "path";

export class GoatApp extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication))
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    this.projectRoot = __dirname;

    const loadedModules =
      String(process.env.WORKER_ONLY) === "true" ? [] : modules;

    this.bootOptions = {
      controllers: {
        dirs: [...loadedModules],
        extensions: [".controller.js"],
        nested: true
      },
      repositories: {
        dirs: [...loadedModules],
        extensions: [".repository.js"],
        nested: true
      },
      datasources: {
        dirs: [...loadedModules],
        extensions: [".datasource.js"],
        nested: true
      }
    };
  }
}
