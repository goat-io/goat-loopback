import { Client, expect } from "@loopback/testlab";
import { GoatApp } from "../application";
import { setupApplication } from "./helper";
import { mongoMemory } from "@goatlab/fluent/dist/core/Database/mongo.memory";

// Start the MongoDB database
mongoMemory.start().then(mongo => {
  process.env.MONGO_URL = mongo.url;
  test();
  run();
});

const test = () => {
  describe("Check that the App is running", () => {
    let app: GoatApp;
    let client: Client;

    before("setupApplication", async () => {
      ({ app, client } = await setupApplication());
    });

    after(async () => {
      await app.stop();
    });

    it("invokes GET /health", async () => {
      const res = await client.get("/health").expect(200);
      expect(res.body.status).to.equal("UP");
    });
  });
};
