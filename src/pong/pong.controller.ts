import { inject } from "@loopback/context";
import { get, Request, ResponseObject, RestBindings } from "@loopback/rest";
import {
  Auth,
  using,
  roles,
  security
} from "@goatlab/fluent/dist/core/Loopback/Auth/Auth";

/**
 * OpenAPI response for ping()
 */
const PING_RESPONSE: ResponseObject = {
  content: {
    "application/json": {
      schema: {
        type: "object",
        properties: {
          greeting: { type: "string" },
          date: { type: "string" },
          url: { type: "string" },
          headers: {
            type: "object",
            properties: {
              "Content-Type": { type: "string" }
            },
            additionalProperties: true
          }
        }
      }
    }
  },
  description: "Ping Response"
};

export class pong {
  constructor(@inject(RestBindings.Http.REQUEST) private req: Request) {}
  @get("/pong", {
    responses: {
      "200": PING_RESPONSE
    },
    security
  })
  /*
  @Auth.authenticate(using.jwt)
  @Auth.authorize({
    allowedRoles: [roles.Administrator]
  })
  */
  public pong(): object {
    return {
      status: "ok",
      date: new Date(),
      url: this.req.url,
      headers: Object.assign({}, this.req.headers)
    };
  }
}
